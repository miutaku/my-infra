#!/usr/bin/env python3
"""Prove Lease and REST proxy survive Kubernetes isolation; never operate a lock.

With --isolate, add temporary prohibit routes only inside the BLE containers'
network namespaces. Always remove exactly the added routes, including on signals.
Does not stop Kubernetes, a host, an LXC or a container.
"""
import argparse
import importlib.util
import json
from pathlib import Path
import signal
import subprocess
import time
import urllib.request

spec = importlib.util.spec_from_file_location('migration', Path(__file__).with_name('migrate-loockit-coordinator.py'))
migration = importlib.util.module_from_spec(spec)
spec.loader.exec_module(migration)
CIDRS = ['192.168.20.228/32', '192.168.20.137/32', '192.168.20.138/32', '192.168.20.139/32',
         '10.244.0.0/16', '10.96.0.0/12']


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def lease():
    result = subprocess.run(['bws', 'secret', 'list', '--output', 'json'], capture_output=True)
    if result.returncode:
        raise RuntimeError('BSM read failed')
    values = {x['key']: x['value'] for x in json.loads(result.stdout)}
    token = json.loads(values['LOOCKIT_COORDINATOR_TOKENS_JSON'])['loockit-x570']
    access = json.loads(values['MAINTENANCE_CF_ACCESS_TOKENS_JSON'])['loockit-x570']
    request = urllib.request.Request('https://' + migration.ORIGIN +
        '/apis/coordination.k8s.io/v1/namespaces/app-loockit/leases/loockit-ble-leader',
        headers={'Authorization': 'Bearer ' + token, 'CF-Access-Client-Id': access['client_id'],
                 'CF-Access-Client-Secret': access['client_secret']})
    with urllib.request.build_opener(NoRedirect()).open(request, timeout=10) as response:
        return json.load(response)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--isolate', action='store_true')
    args = parser.parse_args()
    for host in migration.HOSTS:
        if migration.status(host)['origin'] != migration.ORIGIN:
            raise RuntimeError('Migrate both instances before testing independence')
    if sum(migration.ready(host) for host in migration.HOSTS) != 1:
        raise RuntimeError('Exactly one ready leader is required before testing')
    before = lease()
    if not args.isolate:
        print('Independent pair is ready; --isolate is required for network-namespace testing')
        return
    changed = []
    def interrupted(_signum, _frame):
        raise SystemExit('Interrupted; restoring temporary routes')
    for signum in [signal.SIGINT, signal.SIGTERM]:
        signal.signal(signum, interrupted)
    try:
        for host in migration.HOSTS:
            pid = migration.remote(host, ['pct', 'exec', host[1], '--', 'docker', 'inspect', '--format', '{{.State.Pid}}', 'loockit']).strip()
            if not pid.isdigit() or int(pid) <= 1:
                raise RuntimeError('Invalid container PID')
            for cidr in CIDRS:
                base = ['pct', 'exec', host[1], '--', 'nsenter', '-t', pid, '-n', 'ip', 'route']
                if migration.remote(host, base + ['show', 'exact', cidr]).strip():
                    raise RuntimeError('Test route already exists; refusing to replace it')
                migration.remote(host, base + ['add', 'prohibit', cidr])
                changed.append((host, base, cidr))
            blocked = migration.remote(host, ['pct', 'exec', host[1], '--', 'docker', 'exec', 'loockit', 'python3', '-c',
                "import socket; s=socket.socket(); s.settimeout(2); print(s.connect_ex(('192.168.20.228',6443)) != 0)"]).strip()
            if blocked != 'True':
                raise RuntimeError('Kubernetes isolation was not effective')
        deadline = time.monotonic() + 40
        samples = 0
        while time.monotonic() < deadline:
            if sum(migration.ready(host) for host in migration.HOSTS) != 1:
                raise RuntimeError('BLE leader readiness changed during Kubernetes isolation')
            for host in migration.HOSTS:
                migration.remote(host, ['pct', 'exec', host[1], '--', 'curl', '-fsS', '--max-time', '5',
                                        '-o', '/dev/null', 'http://127.0.0.1:18080/readyz'])
            samples += 1
            time.sleep(5)
        after = lease()
        if int(after['metadata']['resourceVersion']) <= int(before['metadata']['resourceVersion']) + 2:
            raise RuntimeError('Lease did not keep renewing beyond its 15-second TTL')
        print(json.dumps({'kubernetes_access_blocked': True, 'observed_seconds': 40,
                          'ready_samples': samples, 'both_proxies_ready': True, 'lease_renewals_continued': True}))
    finally:
        failed = []
        for host, base, cidr in reversed(changed):
            try:
                migration.remote(host, base + ['del', 'prohibit', cidr])
            except (RuntimeError, subprocess.SubprocessError):
                failed.append((host[3], cidr))
        if failed:
            raise RuntimeError('Temporary route cleanup needs manual inspection: ' + str(failed))
        if changed:
            print('All temporary namespace routes removed')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, subprocess.SubprocessError) as error:
        raise SystemExit(str(error)) from None
