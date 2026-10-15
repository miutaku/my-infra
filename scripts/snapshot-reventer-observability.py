#!/usr/bin/env python3
"""Seed authorized encrypted OCI monitoring disks from immutable original snapshots.
TLS + host-key-verified SSH, bounded archives, SHA256 verification; no local payload files.
Existing destination data directories are never changed by this staging command.
"""
import argparse
import json
from pathlib import Path
import re
import shlex
import subprocess
import tarfile
ROOT=Path(__file__).resolve().parents[1]
SSH=['-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','UserKnownHostsFile=/tmp/reventer-observability-known-hosts','-i',str(Path.home()/'.ssh/id_ed25519')]
KUBE=['kubectl','--kubeconfig',str(Path.home()/'.kube/oke.yaml'),'exec','-n','reventer-monitoring']
REMOTE='/opt/reventer-observability/migration'
def original(service,*command):
 return subprocess.check_output([*KUBE,'deployment/victoria-'+service,'--',*command],text=True)
def remote(host,command,**kw):return subprocess.run(['ssh',*SSH,host,command],check=True,**kw)
def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--replica',choices=['01','02'],required=True);parser.add_argument('--metrics-only',action='store_true');args=parser.parse_args()
 snapshot=json.loads(original('metrics','wget','-qO-','http://127.0.0.1:8428/snapshot/list'))['snapshots'][-1]
 assert re.fullmatch('[A-Za-z0-9-]+',snapshot)
 base='/storage/snapshots/'+snapshot
 manifest={}
 for line in original('metrics','sh','-c','find -L '+base+' -type f -exec sha256sum {} +').splitlines():
  digest,path=line.split('  ',1);name=path.removeprefix(base+'/')
  assert path.startswith(base+'/') and '..' not in Path(name).parts and re.fullmatch('[a-f0-9]{64}',digest)
  manifest[name]=digest
 sizes={}
 for line in original('metrics','sh','-c','find -L '+base+" -type f -exec stat -c '%s %n' {} +").splitlines():
  size,path=line.split(' ',1);sizes[path.removeprefix(base+'/')]=int(size)
 assert manifest and set(manifest)==set(sizes)
 outputs=json.loads(subprocess.check_output(['terraform','output','-json'],cwd=ROOT/'terraform/oci-observability',text=True))
 host='ubuntu@'+outputs['instances']['value']['reventer-observability-'+args.replica]['public_ip']
 scan=r'''
import hashlib,json
from pathlib import Path
root=Path('/opt/reventer-observability/migration');root.mkdir(mode=0o700,exist_ok=True)
assert not (root/'restored').exists(),'Replica already live; refusing to stage a replacement'
seed=root/'metrics-seed';seed.mkdir(mode=0o700,exist_ok=True)
result={}
for f in seed.rglob('*'):
 if f.is_file():
  h=hashlib.sha256()
  with f.open('rb') as src:
   while block:=src.read(1024*1024):h.update(block)
  result[str(f.relative_to(seed))]=h.hexdigest()
print(json.dumps(result))
'''
 current=json.loads(remote(host,'sudo python3 -',input=scan,text=True,capture_output=True).stdout)
 missing=[name for name,h in manifest.items() if current.get(name)!=h]
 groups=[];group=[];size=0
 for name in missing:
  if group and (size+sizes[name]>128*1024*1024 or len(group)>=50):groups.append(group);group=[];size=0
  group.append(name);size+=sizes[name]
 if group:groups.append(group)
 for number,group in enumerate(groups,1):
  target=subprocess.Popen(['ssh',*SSH,host,'sudo tar --no-same-owner -xf - -C '+REMOTE+'/metrics-seed'],stdin=subprocess.PIPE)
  source=subprocess.Popen([*KUBE,'deployment/victoria-metrics','--','tar','-h','-C',base,'-cf','-',*group],stdout=target.stdin)
  target.stdin.close()
  if source.wait() or target.wait():raise RuntimeError('Snapshot group transfer failed; rerun to retry mismatched files')
  print('Metrics snapshot group',number,'of',len(groups),'transferred',flush=True)
 verify=r'''
import hashlib,json,sys
from pathlib import Path
manifest=json.load(sys.stdin);root=Path('/opt/reventer-observability/migration')
for name,expected in manifest.items():
 h=hashlib.sha256()
 with (root/'metrics-seed'/name).open('rb') as src:
  while block:=src.read(1024*1024):h.update(block)
 assert h.hexdigest()==expected,'Snapshot checksum mismatch'
(root/'metrics-manifest.json').write_text(json.dumps(manifest))
(root/'metrics-seed-verified').write_text('Every file matches original snapshot SHA256\n')
print('Metrics snapshot SHA256 verified:',len(manifest),'files')
'''
 remote(host,'sudo python3 -c '+shlex.quote(verify),input=json.dumps(manifest),text=True)
 metadata={'metrics_snapshot':snapshot}
 if not args.metrics_only:
  snapshots=json.loads(original('logs','wget','-qO-','http://127.0.0.1:9428/internal/partition/snapshot/list'))
  days={}
  for path in snapshots:
   match=re.fullmatch(r'/vlogs/partitions/(\d{8})/snapshots/[A-Za-z0-9-]+',path)
   if match and path>days.get(match[1],''):days[match[1]]=path
  assert days;metadata['log_snapshots']=list(days.values())
  target=subprocess.Popen(['ssh',*SSH,host,"sudo sh -ec 'umask 077; test ! -e "+REMOTE+"/logs.tar; cat > "+REMOTE+"/logs.tar'"],stdin=subprocess.PIPE)
  source=subprocess.Popen([*KUBE,'deployment/victoria-logs','--','tar','-C','/vlogs/partitions','-cf','-',*[p.removeprefix('/vlogs/partitions/') for p in days.values()]],stdout=subprocess.PIPE)
  def mapped(name):
   match=re.fullmatch(r'(\d{8})/snapshots/[A-Za-z0-9-]+(?:/(.*))?',name.rstrip('/'))
   assert match and '..' not in Path(name).parts
   return 'partitions/'+match[1]+('/'+match[2] if match[2] else '')
  with tarfile.open(fileobj=source.stdout,mode='r|') as archive,tarfile.open(fileobj=target.stdin,mode='w|') as output:
   for entry in archive:
    entry.name=mapped(entry.name)
    assert not entry.issym()
    if entry.islnk():entry.linkname=mapped(entry.linkname)
    output.addfile(entry,archive.extractfile(entry) if entry.isfile() else None)
  target.stdin.close()
  if source.wait() or target.wait():raise RuntimeError('Logs snapshot transfer incomplete; retain staging for diagnosis')
 remote(host,"sudo sh -ec 'umask 077; cat > "+REMOTE+"/snapshot-metadata.json'",input=json.dumps(metadata),text=True)
 print('Snapshot staging complete; original services/PVCs unchanged; restore separately')
if __name__=='__main__':main()
