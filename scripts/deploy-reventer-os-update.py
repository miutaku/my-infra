#!/usr/bin/env python3
"""Install peer maintenance without copying OCI or administrator private keys.
Default: prepare and check only. --enable --allow-paid-recovery is an explicit
activation decision, after paid-recovery authorization and rollback validation.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import tempfile
ROOT=Path(__file__).resolve().parents[1]
BUNDLE=ROOT/'observability/reventer/os-update'
TF=ROOT/'terraform/oci-observability'
SSH=['-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','ConnectTimeout=15','-o','UserKnownHostsFile=/tmp/reventer-observability-known-hosts','-i',str(Path.home()/'.ssh/id_ed25519')]
def run(args,**kw):
 p=subprocess.run(args,text=True,capture_output=True,**kw)
 if p.returncode:raise RuntimeError(f'{args[0]} failed; sensitive output omitted')
 return p.stdout

def ssh(host,cmd,**kw):return run(['ssh',*SSH,'ubuntu@'+host,cmd],**kw)
def main():
 p=argparse.ArgumentParser(description=__doc__)
 p.add_argument('--enable',action='store_true')
 p.add_argument('--allow-paid-recovery',action='store_true')
 p.add_argument('--wheels',type=Path,default=Path('/tmp/reventer-os-update-wheels'))
 args=p.parse_args()
 if args.enable and not args.allow_paid_recovery:p.error('activation requires authorized recovery storage')
 outputs=json.loads(run(['terraform','output','-json'],cwd=TF))
 settings=outputs.get('os_update',{}).get('value')
 if not settings:raise RuntimeError('Prepare and validate the Terraform OS-update resources first')
 nodes={name[-2:]:v for name,v in outputs['instances']['value'].items()}
 expected={}
 for line in (BUNDLE/'requirements.lock').read_text().splitlines():
  if line and not line.startswith('#'):
   package,h=line.split(' --hash=sha256:');expected[package]=h
 wheels=list(args.wheels.glob('*.whl'))
 if not wheels:raise RuntimeError('Download the requirements.lock wheels for Python 3.10 amd64 first')
 for wheel in wheels:
  name,version=wheel.name.split('-')[:2]
  if expected.pop(name+'=='+version,None)!=hashlib.sha256(wheel.read_bytes()).hexdigest():raise RuntimeError('SDK wheel hash mismatch')
 if expected:raise RuntimeError('Incomplete dependency wheel set')
 public={};hostkeys={}
 for replica,node in nodes.items():
  host=node['public_ip']
  ssh(host,'sudo flock --nonblock /run/reventer-os-update.lock true')
  ssh(host,"state=$(systemctl show -p ActiveState --value reventer-os-update.service 2>/dev/null || true); case \"$state\" in activating|active|reloading) exit 42;; esac")
  if not args.enable:
   ssh(host,'test ! -e /etc/reventer-os-update/enabled')
  ssh(host,'install -d -m 700 /tmp/reventer-os-update-stage/wheels')
  run(['scp',*SSH,*map(str,[BUNDLE/'controller.py',BUNDLE/'guest.py',BUNDLE/'upgrade.sh',BUNDLE/'reventer-os-update.service',BUNDLE/'reventer-os-update.timer',BUNDLE/'99-reventer-coordinated-updates']), 'ubuntu@'+host+':/tmp/reventer-os-update-stage/'])
  run(['scp',*SSH,*map(str,wheels),'ubuntu@'+host+':/tmp/reventer-os-update-stage/wheels/'])
  installer=r'''set -eu
sudo install -d -m 700 /etc/reventer-os-update /opt/reventer-os-update
sudo install -m 755 /tmp/reventer-os-update-stage/guest.py /usr/local/sbin/reventer-update-guest
sudo install -m 755 /tmp/reventer-os-update-stage/upgrade.sh /usr/local/sbin/reventer-os-upgrade
sudo install -m 644 /tmp/reventer-os-update-stage/controller.py /opt/reventer-os-update/controller.py
sudo install -m 644 /tmp/reventer-os-update-stage/reventer-os-update.service /etc/systemd/system/
sudo install -m 644 /tmp/reventer-os-update-stage/reventer-os-update.timer /etc/systemd/system/
sudo python3 - <<'INSTALL'
from pathlib import Path
import zipfile
import shutil
import tempfile
root=Path('/opt/reventer-os-update/deps')
stage=Path(tempfile.mkdtemp(prefix='.deps-',dir=root.parent))
try:
 for wheel in Path('/tmp/reventer-os-update-stage/wheels').glob('*.whl'):
  with zipfile.ZipFile(wheel) as z:
   assert all(not n.startswith('/') and '..' not in Path(n).parts for n in z.namelist())
   z.extractall(stage)
 # Never truncate a shared library already mapped by an OCI read/check process.
 previous=root.with_name('deps-previous')
 if previous.exists():shutil.rmtree(previous)
 if root.exists():root.rename(previous)
 stage.rename(root)
finally:
 if stage.exists():shutil.rmtree(stage)
INSTALL
sudo sh -c 'test -f /etc/reventer-os-update/peer-key || ssh-keygen -q -t ed25519 -N "" -C reventer-peer-os-update -f /etc/reventer-os-update/peer-key'
sudo env PYTHONPATH=/opt/reventer-os-update/deps python3 -c 'import oci; print("SDK",oci.__version__)'
sudo systemctl daemon-reload
'''
  ssh(host,installer)
  public[replica]=ssh(host,'sudo cat /etc/reventer-os-update/peer-key.pub').strip()
  hostkeys[replica]=ssh(host,'cat /etc/ssh/ssh_host_ed25519_key.pub').split()[:2]
 for replica,node in nodes.items():
  peer='02' if replica=='01' else '01';host=node['public_ip']
  config={**settings,'self':replica,'peer':peer,'nodes':nodes,'lock_instance_id':nodes['01']['id'],'allow_paid_recovery':args.allow_paid_recovery}
  with tempfile.TemporaryDirectory(prefix='reventer-os-config-') as tmp:
   path=Path(tmp)/'config.json';path.write_text(json.dumps(config));path.chmod(0o600)
   known=Path(tmp)/'known_hosts';known.write_text(nodes[peer]['private_ip']+' '+' '.join(hostkeys[peer])+'\n')
   run(['scp',*SSH,str(path),str(known),'ubuntu@'+host+':/tmp/reventer-os-update-stage/'])
  ssh(host,'sudo install -m 600 /tmp/reventer-os-update-stage/config.json /etc/reventer-os-update/config.json && sudo install -m 600 /tmp/reventer-os-update-stage/known_hosts /etc/reventer-os-update/known_hosts')
  line='restrict,from="'+nodes[peer]['private_ip']+'",command="sudo -n /usr/local/sbin/reventer-update-guest" '+public[peer]
  # Idempotent replacement of only the tagged maintenance key; retain all
  # existing administrator keys. The private key never leaves its own VM.
  code=r'''from pathlib import Path
import sys
p=Path('/home/ubuntu/.ssh/authorized_keys')
lines=[x for x in p.read_text().splitlines() if not x.endswith(' reventer-peer-os-update')]
p.write_text('\n'.join(lines+[sys.stdin.read().strip()])+'\n');p.chmod(0o600)
'''
  # Send key as data, not shell interpolation.
  with tempfile.TemporaryDirectory() as tmp:
   helper=Path(tmp)/'authorize.py';helper.write_text(code)
   run(['scp',*SSH,str(helper),'ubuntu@'+host+':/tmp/reventer-os-update-stage/'])
  ssh(host,'python3 /tmp/reventer-os-update-stage/authorize.py',input=line+'\n')
  if replica=='02':
   dropin='[Timer]\nOnCalendar=\nOnCalendar=*-*-* 01:00:00 UTC\n'
   ssh(host,'sudo mkdir -p /etc/systemd/system/reventer-os-update.timer.d && sudo tee /etc/systemd/system/reventer-os-update.timer.d/schedule.conf >/dev/null',input=dropin)
 for replica,node in nodes.items():
  host=node['public_ip']
  ssh(host,'sudo env PYTHONPATH=/opt/reventer-os-update/deps python3 /opt/reventer-os-update/controller.py --check')
 # Check both peers before enabling either scheduled updater.
 for replica,node in nodes.items():
  host=node['public_ip']
  if args.enable:
   # Only disable Ubuntu's uncoordinated updates when the coordinated path is
   # fully installed and both collection canaries/readiness checks have passed.
   ssh(host,'sudo install -m 644 /tmp/reventer-os-update-stage/99-reventer-coordinated-updates /etc/apt/apt.conf.d/99-reventer-coordinated-updates && sudo systemctl disable --now apt-daily-upgrade.timer && sudo touch /etc/reventer-os-update/enabled && sudo systemctl daemon-reload && sudo systemctl enable --now reventer-os-update.timer')
  ssh(host,'rm -rf /tmp/reventer-os-update-stage')
  print('VM'+replica+(': daily peer updates enabled' if args.enable else ': prepared and checked; automatic updates NOT enabled'))
if __name__=='__main__':main()
