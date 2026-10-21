#!/usr/bin/env python3
"""One-time coordinated cutover; never run old and new lease owners together.

Provision independent.yml first. Does not operate locks or reboot hosts.
--execute stops the old standby, switches the active, verifies its coordinator,
then starts the former standby against the same independent coordinator.
"""
import argparse
import json
from pathlib import Path
import shlex
import subprocess
import time
import urllib.error
import urllib.request

ORIGIN = 'loockit-lease.miutaku.work'
HOSTS = [('192.168.0.115', '12902', '192.168.20.133', 'loockit-x570'),
         ('192.168.0.119', '12903', '192.168.20.134', 'loockit-b550m')]


def remote(host, args):
    result = subprocess.run(['ssh', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes',
                             'root@' + host[0], shlex.join(args)], capture_output=True, text=True, timeout=240)
    if result.returncode:
        raise RuntimeError('Remote action failed on ' + host[3] + '; details suppressed')
    return result.stdout


def status(host):
    script = """import json,subprocess
c=json.loads(subprocess.check_output(['docker','inspect','loockit']))[0]
e=dict(v.split('=',1) for v in c['Config']['Env'] if '=' in v)
print(json.dumps({'running':c['State']['Running'],'origin':e.get('KUBERNETES_SERVICE_HOST')}))
"""
    return json.loads(remote(host, ['pct', 'exec', host[1], '--', 'python3', '-c', script]))


def ready(host):
    try:
        with urllib.request.urlopen('http://' + host[2] + ':8080/readyz', timeout=5) as response:
            return response.status == 200
    except (OSError, urllib.error.HTTPError):
        return False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--execute', action='store_true')
    args = parser.parse_args()
    state = [status(host) for host in HOSTS]
    serving = [ready(host) for host in HOSTS]
    print(json.dumps([{'identity': h[3], **s, 'ready': r} for h, s, r in zip(HOSTS, state, serving)]))
    if all(s['origin'] == ORIGIN for s in state):
        if sum(serving) != 1:
            raise RuntimeError('Both use the new coordinator, but exactly one serving leader is required')
        print('Already migrated; no action')
        return
    if any(s['origin'] == ORIGIN for s in state) or not all(s['running'] for s in state) or sum(serving) != 1:
        raise RuntimeError('Expected two old-coordinator instances and one serving leader; inspect manually')
    if not args.execute:
        print('Cutover is ready; --execute is required for runtime changes')
        return
    active_index = serving.index(True)
    active, standby = HOSTS[active_index], HOSTS[1 - active_index]
    remote(standby, ['pct', 'exec', standby[1], '--', 'docker', 'stop', '-t', '30', 'loockit'])
    if status(standby)['running']:
        raise RuntimeError('Old standby is still running; cutover aborted')
    image = (Path(__file__).resolve().parents[1] / 'ansible/loockit-lxc/image.env').read_text().strip().split('=', 1)[1]
    for host in [active, standby]:
        remote(host, ['env', 'LOOCKIT_CT_ID=' + host[1], 'LOOCKIT_ADDRESS=' + host[2],
                      'LOOCKIT_IDENTITY=' + host[3], 'LOOCKIT_IMAGE=' + image, '/usr/local/sbin/deploy-loockit-lxc'])
        current = status(host)
        if not current['running'] or current['origin'] != ORIGIN:
            raise RuntimeError('Deployment rolled back or has wrong coordinator; do not start another coordinator')
    deadline = time.monotonic() + 480
    while time.monotonic() < deadline:
        serving = [ready(host) for host in HOSTS]
        if sum(serving) == 1:
            print('Migration complete; exactly one independent BLE leader is ready')
            return
        time.sleep(5)
    raise RuntimeError('Independent pair did not reach one ready leader; inspect BLE connectivity; do not mix coordinators')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, subprocess.SubprocessError) as error:
        raise SystemExit(str(error)) from None
