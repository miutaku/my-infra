#!/usr/bin/env python3
"""Stream immutable source snapshots directly to the two authorized OCI monitoring VMs.
TLS Kubernetes transport and host-key-verified SSH; no local payload files.
The remote boot volumes are encrypted at rest by OCI, staging directories mode 0700.
Does not remove or stop source data. Snapshot names are recorded for cleanup.
"""
import argparse
import json
from pathlib import Path
import re
import subprocess
import tarfile

ROOT = Path(__file__).resolve().parents[1]
SSH = ['-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','UserKnownHostsFile=/tmp/reventer-observability-known-hosts','-i',str(Path.home()/'.ssh/id_ed25519')]
REMOTE = '/opt/reventer-observability/migration'
KUBE = ['kubectl', '--kubeconfig', str(Path.home()/'.kube/oke.yaml'), '--request-timeout=30s', 'exec', '-n', 'reventer-monitoring']

def query(deployment, path):
    port = 8428 if deployment == 'victoria-metrics' else 9428
    return json.loads(subprocess.check_output([*KUBE, 'deployment/'+deployment, '--', 'wget', '-qO-', f'http://127.0.0.1:{port}'+path], text=True))

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--metrics-only",action="store_true")
    options=parser.parse_args()
    snapshot = query('victoria-metrics','/snapshot/list')['snapshots'][-1]
    assert re.fullmatch(r'[A-Za-z0-9-]+',snapshot)
    logs = query('victoria-logs','/internal/partition/snapshot/list')
    by_day = {}
    for path in logs:
        m = re.fullmatch(r'/vlogs/partitions/(\d{8})/snapshots/([A-Za-z0-9-]+)',path)
        if m and (m[1] not in by_day or path > by_day[m[1]]): by_day[m[1]] = path
    metadata = {'metrics_snapshot':snapshot,'log_snapshots':list(by_day.values())}
    instances = json.loads(subprocess.check_output(['terraform','output','-json'],cwd=ROOT/'terraform/oci-observability',text=True))['instances']['value']
    def receive(host,name):
        # Refuse overwriting an earlier snapshot; only the newly provisioned destination is written.
        command = "sudo sh -ec 'umask 077; mkdir -p "+REMOTE+"; test ! -e "+REMOTE+"/"+name+"; cat > "+REMOTE+"/"+name+"'"
        return subprocess.Popen(['ssh',*SSH,host,command],stdin=subprocess.PIPE)
    for name,instance in sorted(instances.items()):
        host='ubuntu@'+instance['public_ip']
        target=receive(host,'metrics-full.tar')
        source=subprocess.Popen([*KUBE,'deployment/victoria-metrics','--','tar','-C','/storage/snapshots/'+snapshot,'-hcf','-','.'],stdout=target.stdin)
        target.stdin.close()
        if source.wait() or target.wait(): raise RuntimeError('Metrics stream failed')
        print(name+': metrics snapshot transferred directly over SSH',flush=True)
        if options.metrics_only:
            subprocess.run(['ssh',*SSH,host,"sudo sha256sum "+REMOTE+"/metrics-full.tar"],check=True)
            continue
        target=receive(host,'logs.tar')
        paths=[path.removeprefix('/vlogs/partitions/') for path in by_day.values()]
        source=subprocess.Popen([*KUBE,'deployment/victoria-logs','--','tar','-C','/vlogs/partitions','-cf','-',*paths],stdout=subprocess.PIPE)
        def map_name(value):
            m=re.fullmatch(r'(\d{8})/snapshots/[A-Za-z0-9-]+(?:/(.*))?',value.rstrip('/'))
            if not m: raise RuntimeError('Unexpected snapshot archive path')
            return 'partitions/'+m[1]+('/'+m[2] if m[2] else '')
        with tarfile.open(fileobj=source.stdout,mode='r|') as archive,tarfile.open(fileobj=target.stdin,mode='w|') as output:
            for member in archive:
                member.name=map_name(member.name)
                if member.islnk():member.linkname=map_name(member.linkname)
                if member.issym():raise RuntimeError('Unexpected symlink')
                output.addfile(member,archive.extractfile(member) if member.isfile() else None)
        target.stdin.close()
        if source.wait() or target.wait():raise RuntimeError('Logs stream failed')
        subprocess.run(['ssh',*SSH,host,"sudo sh -c 'cd "+REMOTE+" && sha256sum metrics-full.tar logs.tar && du -h metrics-full.tar logs.tar'"],check=True)
        print(name+': log snapshots transferred; archives retained on encrypted destination',flush=True)
    print('Source snapshots retained; original services and PVCs unchanged',flush=True)

if __name__=='__main__':main()
