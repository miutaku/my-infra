#!/usr/bin/env python3
"""Peer-controlled, journaled Ubuntu patching. OCI rollback works without SSH.
No package or container upgrade is allowed until a consistent boot backup is
AVAILABLE. A failed update blocks all subsequent updates pending operator review.
"""
import argparse
import fcntl
import collections
from datetime import datetime, timezone, timedelta
import json
import math
import os
from pathlib import Path
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
import uuid
import oci
STATE_KEY='reventer_os_maintenance'
TAG={'ReVenterMaintenance':{'Role':'observability'}}
SERVICES={'metrics','logs','metrics-query','logs-query','metrics-remote-query','logs-remote-query','tunnel'}
class Unsafe(RuntimeError):pass
class FailedUpdate(Unsafe):pass

def utc():return datetime.now(timezone.utc)
def stamp(t):return t.isoformat(timespec='microseconds').replace('+00:00','Z')
def poll(fn,timeout=900):
 end=time.monotonic()+timeout
 while time.monotonic()<end:
  try:
   value=fn()
   if value:return value
  except FailedUpdate:raise
  except Exception:pass
  time.sleep(10)
 raise Unsafe('readiness deadline exceeded')

def prepare_log(row):
 row=dict(row);stream=row.pop('_stream');row.pop('_stream_id',None)
 label=re.compile(r'([A-Za-z_][A-Za-z0-9_]*)=("(?:[^"\\]|\\.)*")')
 if not stream.startswith('{') or not stream.endswith('}') or label.sub('',stream[1:-1]).replace(',','').strip():raise Unsafe('unknown stream label syntax')
 labels={k:json.loads(v) for k,v in label.findall(stream)}
 if any(k in row and row[k]!=v for k,v in labels.items()):raise Unsafe('stream label conflicts with log field')
 row.update(labels);return row,set(labels)
def record_key(row):return json.dumps({k:v for k,v in row.items() if k!='_stream_id'},sort_keys=True,separators=(',',':'))

def missing_logs(source,destination):
 counts=collections.Counter(record_key(x) for x in destination);missing=[]
 for row in source:
  key=record_key(row)
  if counts[key]:counts[key]-=1
  else:missing.append(row)
 return missing

def log_batches(rows,max_bytes=1024*1024):
 # Different Loki streams may share ordinary fields that must not be promoted
 # into stream labels. Batch only records with identical stream-field names.
 groups=collections.defaultdict(list)
 for original in rows:
  row,fields=prepare_log(original);groups[tuple(sorted(fields))].append(row)
 for fields,records in groups.items():
  batch=[];size=0
  for row in records:
   n=len(json.dumps(row))+1
   if n>max_bytes:raise Unsafe('individual log exceeds import memory budget')
   if batch and (size+n>max_bytes or len(batch)>=10000):
    yield batch,list(fields);batch=[];size=0
   batch.append(row);size+=n
  if batch:yield batch,list(fields)

class Controller:
 def __init__(self,cfg):
  self.cfg=cfg;self.me=cfg['self'];self.peer=cfg['peer'];self.run_id=str(uuid.uuid4())
  signer=oci.auth.signers.InstancePrincipalsSecurityTokenSigner()
  self.compute=oci.core.ComputeClient({'region':cfg['region']},signer=signer)
  self.block=oci.core.BlockstorageClient({'region':cfg['region']},signer=signer)
  self.identity=oci.identity.IdentityClient({'region':cfg['region']},signer=signer)
  self.state={};self.version=None
  # Read the already-authorized local credentials, never controller credentials.
  env={}
  for line in Path('/opt/reventer-observability/.env').read_text().splitlines():
   if '=' in line:
    k,v=line.split('=',1);env[k]=v.strip("'")
  self.headers={'User-Agent':'ReVenter-OS-Maintenance/1.0','CF-Access-Client-Id':env['CF_ACCESS_CLIENT_ID'],'CF-Access-Client-Secret':env['CF_ACCESS_CLIENT_SECRET']}

 def http(self,replica,service,path):
  port=18428 if service=='metrics' else 19428
  url=f'http://127.0.0.1:{port}' if replica==self.me else f'https://{service}{self.cfg.get("endpoint_suffix", "")}-ha-{replica}.re-venter.com'
  return urllib.request.urlopen(urllib.request.Request(url+path,headers=self.headers),timeout=90)

 def health(self,replica):
  for service in ['metrics','logs']:
   with self.http(replica,service,'/health') as r:
    if r.status!=200:raise Unsafe('storage is unhealthy')
  # Require real collector freshness only for this account's environment.
  q='/api/v1/query?'+urllib.parse.urlencode({'query':'max by (env) (reventer_observability_canary_timestamp_seconds)'})
  with self.http(replica,'metrics',q) as r:d=json.load(r)
  fresh={x['metric'].get('env'):float(x['value'][1]) for x in d['data']['result']}
  if any(not math.isfinite(fresh.get(env,0)) or not -30<=utc().timestamp()-fresh.get(env,0)<=180 for env in self.cfg.get('environments', ['stg','prd'])):raise Unsafe('metrics collector canary is stale')
  q='/select/logsql/query?'+urllib.parse.urlencode({'query':'_msg:="reventer-observability-canary" _time:3m | stats by (env) count() as logs'})
  with self.http(replica,'logs',q) as r:rows=[json.loads(x) for x in r if x.strip()]
  if not set(self.cfg.get('environments', ['stg','prd'])).issubset({x.get('env') for x in rows if int(x['logs'])>0}):raise Unsafe('logs collector canary is stale')
  return True

 def guest(self,action,**kw):
  args=['ssh','-T','-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','ConnectTimeout=15','-o','UserKnownHostsFile=/etc/reventer-os-update/known_hosts','-i','/etc/reventer-os-update/peer-key','ubuntu@'+self.cfg['nodes'][self.peer]['private_ip'],'maintenance']
  request=json.dumps({'action':action,**kw})+'\n'
  if action=='export-logs':
   # Enforce the limit while receiving, before allocating an unbounded reply.
   p=subprocess.Popen(args,stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL)
   try:
    p.stdin.write(request.encode());p.stdin.close()
    data=p.stdout.read(10*1024*1024+1)
    if len(data)>10*1024*1024:raise Unsafe('logs window exceeds memory budget')
    if p.wait(timeout=210):raise Unsafe('peer logs export failed')
    return [json.loads(x) for x in data.splitlines() if x.strip()]
   finally:
    if p.poll() is None:p.kill();p.wait()
  r=subprocess.run(args,input=request,text=True,capture_output=True,timeout=210)
  if r.returncode:raise Unsafe('peer maintenance request failed; sensitive response omitted')
  return json.loads(r.stdout)

 def load(self):
  r=self.compute.get_instance(self.cfg['lock_instance_id']);self.version=r.headers['etag']
  self.metadata=dict(r.data.extended_metadata or {})
  self.state=self.metadata.get(STATE_KEY,{'phase':'idle'})
  return self.state

 def save(self,**changes):
  # Reboots and unrelated instance changes also advance OCI's ETag. Refresh it
  # only if the persistent maintenance journal still matches our last write.
  r=self.compute.get_instance(self.cfg['lock_instance_id'])
  metadata=dict(r.data.extended_metadata or {})
  if metadata.get(STATE_KEY,{'phase':'idle'})!=self.state:raise Unsafe('maintenance journal ownership changed')
  updated={**self.state,**changes,'updated_at':stamp(utc())}
  metadata[STATE_KEY]=updated
  self.compute.update_instance(self.cfg['lock_instance_id'],oci.core.models.UpdateInstanceDetails(extended_metadata=metadata),if_match=r.headers['etag'])
  self.state=updated;self.metadata=metadata

 def acquire(self):
  if self.load()['phase']!='idle':raise Unsafe('unfinished or failed maintenance blocks updates')
  self.save(phase='checking',owner=self.run_id,target=self.peer,backup_id=None,recovery_volume_id=None,boot_volume_id=None,gap_start=None,pdc=False)

 def boot(self):
  node=self.cfg['nodes'][self.peer]
  rows=self.compute.list_boot_volume_attachments(self.cfg['availability_domain'],self.cfg['compartment_id'],instance_id=node['id']).data
  rows=[x for x in rows if x.lifecycle_state=='ATTACHED']
  if len(rows)!=1:raise Unsafe('ambiguous boot volume attachment')
  return rows[0].boot_volume_id

 def backup_rows(self):
  compartments={self.cfg['tenancy_id']}
  compartments.update(x.id for x in oci.pagination.list_call_get_all_results(self.identity.list_compartments,self.cfg['tenancy_id'],compartment_id_in_subtree=True,access_level='ACCESSIBLE').data if x.lifecycle_state=='ACTIVE')
  rows=[]
  for compartment in compartments:
   rows+=oci.pagination.list_call_get_all_results(self.block.list_boot_volume_backups,compartment).data
   rows+=oci.pagination.list_call_get_all_results(self.block.list_volume_backups,compartment).data
  return [x for x in rows if x.lifecycle_state!='TERMINATED']

 def ensure_backup_budget(self):
  if len(self.backup_rows())>=5:raise Unsafe('five free backup slots exhausted; no update')

 def prune_backups(self):
  # Keep the latest verified boot backup for each VM. Never delete unrelated or
  # unfinished backups, or the journal's currently selected recovery point.
  groups=collections.defaultdict(list)
  for x in self.backup_rows():
   tags=x.freeform_tags or {}
   if tags.get('managed_by')=='reventer-os-update' and tags.get('verified')=='true' and x.lifecycle_state=='AVAILABLE':groups[tags.get('target')].append(x)
  for group in groups.values():
   for x in sorted(group,key=lambda b:b.time_created,reverse=True)[1:]:
    if x.id!=self.state.get('backup_id'):self.block.delete_boot_volume_backup(x.id)

 def backup(self):
  self.ensure_backup_budget();volume=self.boot()
  self.save(phase='backup',boot_volume_id=volume,gap_start=stamp(utc()-timedelta(seconds=5)))
  self.guest('prepare')
  b=self.block.create_boot_volume_backup(oci.core.models.CreateBootVolumeBackupDetails(boot_volume_id=volume,type='INCREMENTAL',display_name='reventer-os-'+self.peer+'-'+utc().strftime('%Y%m%dT%H%M%S'),defined_tags=TAG,freeform_tags={'managed_by':'reventer-os-update','target':self.peer}),opc_retry_token=self.state['owner']).data
  self.save(backup_id=b.id)
  def ready():
   self.health(self.me)
   return self.block.get_boot_volume_backup(b.id).data.lifecycle_state=='AVAILABLE'
  poll(ready,3600)

 def catch_up(self):
  start=datetime.fromisoformat(self.state['gap_start'].replace('Z','+00:00'));end=utc()-timedelta(seconds=30)
  if end-start>timedelta(hours=4):raise Unsafe('catch-up interval requires operator reseeding')
  while start<end:
   stop=min(start+timedelta(minutes=5),end);a,z=stamp(start),stamp(stop)
   # Bounded streaming transfer over verified private SSH; no payload archives.
   export='/api/v1/export?'+urllib.parse.urlencode({'match[]':'{__name__!=""}','start':a,'end':z})
   args=['ssh','-T','-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','ConnectTimeout=15','-o','UserKnownHostsFile=/etc/reventer-os-update/known_hosts','-i','/etc/reventer-os-update/peer-key','ubuntu@'+self.cfg['nodes'][self.peer]['private_ip'],'maintenance']
   with self.http(self.me,'metrics',export) as source:
    p=subprocess.Popen(args,stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL)
    try:
     p.stdin.write(b'{"action":"import-metrics"}\n')
     while chunk:=source.read(65536):p.stdin.write(chunk)
     p.stdin.close()
     if p.wait(timeout=210):raise Unsafe('metrics catch-up import failed')
    finally:
     if p.poll() is None:p.kill();p.wait()
   query='/select/logsql/query?'+urllib.parse.urlencode({'query':'* _time:['+a+','+z+')'})
   with self.http(self.me,'logs',query) as r:
    data=r.read(10*1024*1024+1)
   if len(data)>10*1024*1024:raise Unsafe('log catch-up window exceeds memory budget')
   source=[json.loads(x) for x in data.splitlines() if x.strip()]
   missing=missing_logs(source,self.guest('export-logs',start=a,end=z))
   for batch,fields in log_batches(missing):self.guest('import-logs',records=batch,fields=fields)
   # Ingestion returns before newly buffered rows become visible to queries.
   poll(lambda:not missing_logs(source,self.guest('export-logs',start=a,end=z)),180)
   duration=(stop-start).total_seconds()
   params=urllib.parse.urlencode({'query':f'sum by (env) (count_over_time({{__name__!=""}}[{duration}s]))','time':z})
   def metrics_match():
    values=[]
    for replica in [self.me,self.peer]:
     with self.http(replica,'metrics','/api/v1/query?'+params) as r:result=json.load(r)['data']['result']
     values.append({json.dumps(x['metric'],sort_keys=True):x['value'][1] for x in result})
    return values[0]==values[1]
   poll(metrics_match,180)
   self.health(self.me);start=stop
   print("Metrics/Logs history parity verified through",z,flush=True)

 def validate(self):
  # Compute RUNNING precedes SSH/Docker readiness after a restored boot.
  def guest_ready():
   self.health(self.me);return self.guest('status')
  poll(guest_ready,600)
  self.guest('start-storage')
  poll(lambda:self.health(self.peer),600)
  self.catch_up()
  # Observe real collections across multiple scrape/log intervals, not a single
  # successful HTTP health response. Keep target PDC disconnected throughout.
  for _ in range(6):
   self.health(self.me);self.health(self.peer)
   status=self.guest('status')
   if not SERVICES.issubset({k for k,v in status['services'].items() if v=='running'}):raise Unsafe('service stopped after update')
   time.sleep(30)
  self.guest('activate',pdc=self.state.get('pdc',False))

 def rollback(self):
  self.health(self.me)
  if not self.state.get('backup_id'):raise Unsafe('no completed backup for rollback')
  if not self.cfg.get('allow_paid_recovery',False):raise Unsafe('paid recovery has not been authorized')
  self.save(phase='restoring')
  node=self.cfg['nodes'][self.peer]
  # Recovery volumes are isolated in a compartment with no OKE volumes. Keep the
  # failed boot volume until restoration/parity has been independently verified.
  volume_id=self.state.get('recovery_volume_id')
  if not volume_id:
   v=self.block.create_boot_volume(oci.core.models.CreateBootVolumeDetails(compartment_id=self.cfg['recovery_compartment_id'],availability_domain=self.cfg['availability_domain'],display_name='reventer-os-rollback-'+self.peer,source_details=oci.core.models.BootVolumeSourceFromBootVolumeBackupDetails(id=self.state['backup_id']),defined_tags=TAG,freeform_tags={'managed_by':'reventer-os-update','target':self.peer}),opc_retry_token=str(uuid.uuid5(uuid.NAMESPACE_URL,self.state['owner']+'/recovery'))).data
   volume_id=v.id;self.save(recovery_volume_id=volume_id)
  poll(lambda:self.block.get_boot_volume(volume_id).data.lifecycle_state=='AVAILABLE',3600)
  poll(lambda:self.compute.get_instance(node['id']).data.lifecycle_state in ['RUNNING','STOPPED'],1800)
  if self.boot()!=volume_id:
   self.compute.update_instance(node['id'],oci.core.models.UpdateInstanceDetails(source_details=oci.core.models.UpdateInstanceSourceViaBootVolumeDetails(boot_volume_id=volume_id,is_preserve_boot_volume_enabled=True),update_operation_constraint='ALLOW_DOWNTIME'))
  poll(lambda:self.boot()==volume_id and self.compute.get_instance(node['id']).data.lifecycle_state=='RUNNING',1800)
  expected=dict(self.state);self.load()
  if self.state!=expected:raise Unsafe('rollback journal changed')
  self.save(phase='rollback-validation');self.validate()
  backup=self.block.get_boot_volume_backup(self.state['backup_id']).data
  self.block.update_boot_volume_backup(backup.id,oci.core.models.UpdateBootVolumeBackupDetails(freeform_tags={**backup.freeform_tags,'verified':'true'}))
  self.save(phase='blocked',result='rolled-back',reason='operator must review failed updates and retained volume before resuming')

 def run(self):
  if not self.cfg.get('allow_paid_recovery',False):raise Unsafe('updates disabled until full OS recovery is authorized')
  state=self.load()
  # A controller crash never frees the lock. Its surviving peer can finish only
  # the recorded rollback, never proceed with another VM.
  if state['phase']!='idle':
   if state.get('target')==self.peer and state['phase'] in ['checking','backup']:
    self.health(self.me)
    self.guest('start-storage')
    poll(lambda:self.health(self.peer),600)
    if state.get('gap_start'):self.catch_up()
    self.guest('activate',pdc=state.get('pdc',False))
    self.save(phase='blocked',result='interrupted-before-upgrade')
    return
   if state.get('target')==self.peer and state.get('backup_id') and state['phase'] not in ['blocked','checking','backup']:
    self.rollback();return
   raise Unsafe('maintenance blocked; inspect OCI journal')
  self.acquire()
  try:
   self.health(self.me);self.health(self.peer);self.prune_backups()
   before=self.guest('status');self.save(pdc=before['pdc_running'],old_boot_id=before['boot_id'])
   self.backup();self.save(phase='upgrading')
   self.guest('upgrade')
   def rebooted():
    self.health(self.me);status=self.guest('status')
    if status['upgrade'].get('state')=='failed':raise FailedUpdate('package update failed')
    return status['boot_id']!=before['boot_id'] and status['upgrade'].get('state')=='succeeded'
   poll(rebooted,1800);self.save(phase='validating');self.validate()
   backup=self.block.get_boot_volume_backup(self.state['backup_id']).data
   self.block.update_boot_volume_backup(backup.id,oci.core.models.UpdateBootVolumeBackupDetails(freeform_tags={**backup.freeform_tags,'verified':'true'}))
   self.save(phase='idle',result='updated',owner='',target='')
   print('Peer OS updated, rebooted and collection/catch-up verified',flush=True)
  except Exception:
   # Recovery never updates the healthy side. A pre-backup failure only restarts
   # the original target; post-backup failures restore the OS, not apt downgrades.
   if self.state.get('backup_id') and self.state['phase'] not in ['checking','backup']:
    try:self.rollback()
    except Exception:self.save(phase='blocked',result='recovery-failed')
   else:
    try:
     self.guest('start-storage')
     poll(lambda:self.health(self.peer),600)
     if self.state.get('gap_start'):self.catch_up()
     self.guest('activate',pdc=self.state.get('pdc',False))
    finally:self.save(phase='blocked',result='pre-update-failed')
   raise Unsafe('maintenance failed; peer remains unchanged, inspect journal')

 def check(self):
  self.health(self.me);self.health(self.peer);self.guest('status');self.load()
  print('Both real collection canaries, storage, forced SSH and OCI read access verified')

def main():
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');args=p.parse_args()
 c=Controller(json.loads(Path('/etc/reventer-os-update/config.json').read_text()))
 if args.check:c.check()
 elif Path('/etc/reventer-os-update/enabled').exists():
  with open('/run/reventer-os-update.lock','w') as lock:
   fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
   c.run()
 else:raise Unsafe('maintenance not enabled')
if __name__=='__main__':
 try:main()
 except Exception as e:
  # OCI/HTTP exceptions may contain signed requests: report only type and known
  # invariant violations, never raw provider exceptions or credentials.
  print(str(e) if isinstance(e,Unsafe) else type(e).__name__,file=sys.stderr);sys.exit(1)
