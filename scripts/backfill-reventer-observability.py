#!/usr/bin/env python3
"""Fill the snapshot-to-collector handover interval over verified SSH, with no local payload files.
Metrics use bounded JSON export; Logs compare complete records before importing missing ones.
Run after queues have drained. Original storage is read only.
"""
import collections
import json
from pathlib import Path
import re
import shlex
import subprocess
import urllib.parse
ROOT=Path(__file__).resolve().parents[1]
SSH=['-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','UserKnownHostsFile=/tmp/reventer-observability-known-hosts','-i',str(Path.home()/'.ssh/id_ed25519')]
KUBE=['kubectl','--kubeconfig',str(Path.home()/'.kube/oke.yaml'),'exec','-n','reventer-monitoring']
START='2026-10-06T05:30:00Z';END='2026-10-06T05:42:00Z'
def local_read(service,path):
 port=8428 if service=='metrics' else 9428
 return subprocess.check_output([*KUBE,'deployment/victoria-'+service,'--','wget','-qO-',f'http://127.0.0.1:{port}'+path])
def remote(host,command,**kw):return subprocess.run(['ssh',*SSH,host,command],check=True,**kw)
def main():
 instances=json.loads(subprocess.check_output(['terraform','output','-json'],cwd=ROOT/'terraform/oci-observability',text=True))['instances']['value']
 query='* _time:['+START+','+END+')'
 path='/select/logsql/query?'+urllib.parse.urlencode({'query':query})
 source=[json.loads(x) for x in local_read('logs',path).splitlines() if x]
 def key(row):return json.dumps({k:v for k,v in row.items() if k!='_stream_id'},sort_keys=True,separators=(',',':'))
 # Source cardinality is small for this fixed 12-minute migration interval.
 assert len(source)<100000,'Unexpected backfill size; review before continuing'
 label=re.compile(r'([A-Za-z_][A-Za-z0-9_]*)=("(?:[^"\\]|\\.)*")')
 def prepare(row):
  row=dict(row);stream=row.pop('_stream');row.pop('_stream_id',None)
  assert stream.startswith('{') and stream.endswith('}')
  assert not label.sub('',stream[1:-1]).replace(',','').strip(),'Unrecognized stream label syntax'
  labels={k:json.loads(v) for k,v in label.findall(stream)}
  assert labels or stream=='{}','Cannot parse source stream labels'
  row.update(labels)
  return row,set(labels)
 for name,vm in sorted(instances.items()):
  host='ubuntu@'+vm['public_ip']
  current=remote(host,'curl -fsS --max-time 120 '+shlex.quote('http://127.0.0.1:19428'+path),capture_output=True).stdout
  counts=collections.Counter(key(json.loads(x)) for x in current.splitlines() if x)
  missing=[];fields=set()
  for row in source:
   k=key(row)
   if counts[k]:counts[k]-=1
   else:
    prepared,labels=prepare(row);missing.append(prepared);fields.update(labels)
  if missing:
   url='http://127.0.0.1:19428/insert/jsonline?'+urllib.parse.urlencode({'_stream_fields':','.join(sorted(fields))})
   payload=b''.join((json.dumps(x,separators=(',',':'))+'\n').encode() for x in missing)
   remote(host,'curl -fsS --max-time 120 --data-binary @- '+shlex.quote(url),input=payload,capture_output=True)
  print(name,'Logs missing records restored:',len(missing),'from',len(source),'source records',flush=True)
  export='/api/v1/export?'+urllib.parse.urlencode({'match[]':'{__name__!=""}','start':START,'end':END})
  # Pipe raw Metrics export directly to destination; no local payload persistence.
  target=subprocess.Popen(['ssh',*SSH,host,"curl -fsS --max-time 180 --data-binary @- http://127.0.0.1:18428/api/v1/import"],stdin=subprocess.PIPE,stdout=subprocess.DEVNULL)
  original=subprocess.Popen([*KUBE,'deployment/victoria-metrics','--','wget','-qO-','http://127.0.0.1:8428'+export],stdout=target.stdin)
  target.stdin.close()
  if original.wait() or target.wait():raise RuntimeError('Metrics backfill stream failed')
  print(name,'Metrics handover interval imported',flush=True)
if __name__=='__main__':main()
