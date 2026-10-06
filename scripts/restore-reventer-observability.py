#!/usr/bin/env python3
"""Restore transferred snapshots into new replicas, keeping bootstrap data for rollback.
Original Kubernetes stores are unchanged. Run only while destination storage is stopped.
"""
import argparse
import json
from pathlib import Path
import subprocess

ROOT=Path(__file__).resolve().parents[1]
SSH=['-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','UserKnownHostsFile=/tmp/reventer-observability-known-hosts','-i',str(Path.home()/'.ssh/id_ed25519')]
REMOTE=r'''
import os, subprocess, tarfile
from pathlib import Path
root=Path('/opt/reventer-observability');os.chdir(root)
assert not (root/'migration/restored').exists(), 'Already restored; refusing to overwrite live data'
for service,name in [('metrics','metrics-full.tar'),('logs','logs.tar')]:
    archive=root/'migration'/name
    assert archive.stat().st_size>1000000,'Incomplete archive'
    status=subprocess.check_output(['docker-compose','ps','-q',service],text=True).strip()
    if status:
        assert subprocess.check_output(['docker','inspect','--format','{{.State.Running}}',status],text=True).strip()=='false','Destination still running'
    with tarfile.open(archive) as tar:
        for entry in tar:
            assert not entry.name.startswith('/') and '..' not in Path(entry.name).parts,'Unsafe archive path'
            assert not entry.issym(),'Unexpected symbolic link'
            if entry.islnk():assert not entry.linkname.startswith('/') and '..' not in Path(entry.linkname).parts
    current=root/'data'/service;backup=root/'data'/(service+'-bootstrap')
    assert not backup.exists(), 'Bootstrap backup exists'
    current.rename(backup);current.mkdir()
    subprocess.run(['tar','--no-same-owner','-xf',str(archive),'-C',str(current)],check=True)
    subprocess.run(['chown','-R','1000:1000',str(current)],check=True)
subprocess.run(['docker-compose','up','-d','metrics','logs'],check=True)
(root/'migration/restored').write_text('Snapshot restore completed; source preserved\n')
subprocess.run(['du','-sh',str(root/'data/metrics'),str(root/'data/logs')],check=True)
'''
def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--replica',choices=['01','02'],required=True);args=parser.parse_args()
    outputs=json.loads(subprocess.check_output(['terraform','output','-json'],cwd=ROOT/'terraform/oci-observability',text=True))
    vm=outputs['instances']['value']['reventer-observability-'+args.replica]
    subprocess.run(['ssh',*SSH,'ubuntu@'+vm['public_ip'],'sudo python3 -'],input=REMOTE,text=True,check=True)
    print('Replica '+args.replica+' restored; PDC remains withheld pending parity tests')
if __name__=='__main__':main()
