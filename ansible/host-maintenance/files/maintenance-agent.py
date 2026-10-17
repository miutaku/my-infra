#!/usr/bin/python3
"""Fixed maintenance actions; all execution requires a live controller claim."""
import argparse
import fcntl
import hashlib
import json
import os
from pathlib import Path
import subprocess
import urllib.error
import urllib.request

STATE = Path('/var/lib/host-maintenance/execution.json')
UPDATE_STATE = Path('/var/lib/host-maintenance/update.json')
BOOT = Path('/proc/sys/kernel/random/boot_id')
REQUIRED = Path('/run/reboot-required')


def run(*args):
    return subprocess.run(args, check=True, text=True, stdout=subprocess.PIPE,
                          stderr=subprocess.PIPE, timeout=120).stdout


def updates():
    simulation = run('apt-get', '-s', 'dist-upgrade')
    changes = sorted(line for line in simulation.splitlines()
                     if line.startswith(('Inst ', 'Remv ')))
    return sum(line.startswith('Inst ') for line in changes), hashlib.sha256(
        '\n'.join(changes).encode()).hexdigest()


def reboot_required(pve):
    if REQUIRED.exists():
        return True
    if pve:
        current = run('uname', '-r').strip()
        for kernel in Path('/boot').glob('vmlinuz-*-pve'):
            version = kernel.name.removeprefix('vmlinuz-')
            if subprocess.run(['dpkg', '--compare-versions', version, 'gt', current]).returncode == 0:
                return True
    return False


def package_idle():
    try:
        for name in ['/var/lib/dpkg/lock-frontend', '/var/lib/dpkg/lock']:
            with open(name, 'a') as lock:
                fcntl.lockf(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        return False
    return not run('dpkg', '--audit').strip()


def pve_healthy():
    cluster = json.loads(run('pvesh', 'get', '/cluster/status', '--output-format', 'json'))
    nodes = [item for item in cluster if item.get('type') == 'node']
    services = run('systemctl', 'is-active', 'pve-cluster', 'pvedaemon', 'pveproxy', 'pvestatd', 'pvescheduler')
    return (all(line == 'active' for line in services.splitlines())
            and len(nodes) == 2 and all(item.get('online') == 1 for item in nodes)
            and any(item.get('type') == 'cluster' and item.get('quorate') == 1 for item in cluster)
            and package_idle())


def pve_preflight(host):
    if not pve_healthy():
        raise RuntimeError('PVE cluster or package state is unhealthy')
    guests = json.loads(run('pvesh', 'get', '/cluster/resources', '--type', 'vm',
                            '--output-format', 'json'))
    if any(item.get('node') == host and item.get('status') != 'stopped' for item in guests):
        raise RuntimeError('Guests must be migrated or stopped before PVE maintenance')
    pve_tasks_idle()


def pve_tasks_idle():
    # Active cluster-wide tasks include backups, replication and migrations.
    for node in ['pve-x570', 'pve-b550m']:
        tasks = json.loads(run('pvesh', 'get', f'/nodes/{node}/tasks', '--source', 'active',
                               '--output-format', 'json'))
        if tasks:
            raise RuntimeError('Active PVE task; maintenance deferred')


def api(config, endpoint, data):
    request = urllib.request.Request(config['controller'].rstrip('/') + '/agent/' + endpoint,
        data=json.dumps(data).encode(), headers={
            'Authorization': 'Bearer ' + config['token'],
            'X-Maintenance-Host': config['host'], 'Content-Type': 'application/json',
            'User-Agent': 'home-maintenance-agent/1.0',
        }, method='POST')
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def save(data, path=None):
    path = STATE if path is None else path
    temporary = path.with_suffix('.tmp')
    temporary.write_text(json.dumps(data) + '\n')
    temporary.replace(path)


def update_packages(config):
    """Automatic package installation; deliberately has no reboot call."""
    host = config['host']
    if not host.startswith('pve-'):
        raise RuntimeError('Automatic updater is for PVE hosts only')
    if STATE.exists() or UPDATE_STATE.exists():
        print('Pending execution journal; investigate before another update')
        return
    if not pve_healthy():
        print('Cluster or package manager not ready; update skipped')
        return
    run('apt-get', 'update')
    count, fingerprint = updates()
    api(config, 'report', {'bootId': BOOT.read_text().strip(), 'required': reboot_required(True),
                          'updates': count, 'fingerprint': fingerprint, 'healthy': pve_healthy()})
    if not count:
        print('No package upgrades available')
        return
    claim = api(config, 'update-claim', {})
    if not claim:
        print('Another PVE maintenance is active; update skipped')
        return
    pending = {'bootId': BOOT.read_text().strip(), 'executionId': claim['executionId']}
    save(pending, UPDATE_STATE)
    try:
        if not pve_healthy():
            raise RuntimeError('PVE cluster or package manager changed state')
        pve_tasks_idle()
    except (RuntimeError, subprocess.SubprocessError):
        pending['outcome'] = 'blocked'
        save(pending, UPDATE_STATE)
        api(config, 'update-result', {'executionId': pending['executionId'], 'outcome': 'blocked'})
        UPDATE_STATE.unlink()
        print('Active task or unhealthy cluster; update skipped')
        return
    try:
        subprocess.run(['apt-get', '-y', '--no-remove', '-o', 'Dpkg::Options::=--force-confold',
                        'dist-upgrade'], check=True, timeout=7200,
                       env={**os.environ, 'DEBIAN_FRONTEND': 'noninteractive', 'NEEDRESTART_MODE': 'l'})
    except subprocess.SubprocessError:
        pending['outcome'] = 'failed'
        save(pending, UPDATE_STATE)
        api(config, 'update-result', {'executionId': pending['executionId'], 'outcome': 'failed'})
        raise RuntimeError('Package update failed; inspect journal and use --recover') from None
    pending['outcome'] = 'complete'
    save(pending, UPDATE_STATE)
    api(config, 'update-result', {'executionId': pending['executionId'], 'outcome': 'complete'})
    UPDATE_STATE.unlink()
    print('Packages updated; OS reboot requires separate explicit approval')


def process(config):
    host = config['host']
    pve = host.startswith('pve-')
    boot_id = BOOT.read_text().strip()
    if UPDATE_STATE.exists():
        update = json.loads(UPDATE_STATE.read_text())
        if update.get('outcome'):
            api(config, 'update-result', {'executionId': update['executionId'], 'outcome': update['outcome']})
            if update['outcome'] != 'failed':
                UPDATE_STATE.unlink()
        if UPDATE_STATE.exists():
            print('Package update interrupted or failed; investigate and use --recover')
            return
    if STATE.exists():
        pending = json.loads(STATE.read_text())
        if pending['bootId'] == boot_id:
            # A process interruption is never treated as permission to retry an upgrade.
            if pending.get('outcome'):
                api(config, 'result', {'executionId': pending['executionId'], 'outcome': pending['outcome']})
                STATE.unlink()
            else:
                print('Execution is awaiting reboot or manual investigation')
            return
        if pve and not pve_healthy():
            print('Rebooted; waiting for healthy PVE cluster before releasing maintenance lock')
            return
    count, fingerprint = updates()
    healthy = pve_healthy() if pve else package_idle()
    api(config, 'report', {'bootId': boot_id, 'required': reboot_required(pve),
                          'updates': count, 'fingerprint': fingerprint, 'healthy': healthy})
    if STATE.exists():
        STATE.unlink()
    claim = api(config, 'claim', {})
    if not claim:
        return
    pending = {'bootId': boot_id, 'executionId': claim['executionId']}
    save(pending)
    try:
        if not package_idle():
            raise RuntimeError('Another package manager is active')
        if pve:
            pve_preflight(host)
        elif not REQUIRED.exists():
            raise RuntimeError('Reboot no longer required')
    except (RuntimeError, subprocess.SubprocessError):
        pending['outcome'] = 'blocked'
        save(pending)
        api(config, 'result', {'executionId': pending['executionId'], 'outcome': 'blocked'})
        STATE.unlink()
        print('Maintenance blocked by preflight; see cluster state and active guests/tasks')
        return
    try:
        if reboot_required(pve):
            subprocess.run(['systemctl', 'reboot'], check=True, timeout=30)
        else:
            pending['outcome'] = 'complete'
            save(pending)
            api(config, 'result', {'executionId': pending['executionId'], 'outcome': 'complete'})
            STATE.unlink()
    except (subprocess.SubprocessError, RuntimeError):
        pending['outcome'] = 'failed'
        save(pending)
        api(config, 'result', {'executionId': pending['executionId'], 'outcome': 'failed'})
        STATE.unlink()
        raise RuntimeError('Maintenance failed; PVE group remains blocked until investigated') from None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--probe', action='store_true', help='Read-only local readiness report')
    parser.add_argument('--recover', action='store_true', help='After manual inspection, release interrupted execution into hold')
    parser.add_argument('--update', action='store_true', help='Apply PVE package upgrades without rebooting')
    args = parser.parse_args()
    credential_dir = Path(os.environ.get('CREDENTIALS_DIRECTORY', '/etc/host-maintenance'))
    config = json.loads((credential_dir / 'agent-config').read_text())
    if config['host'] not in ['dev-app-server', 'pve-x570', 'pve-b550m']:
        raise RuntimeError('Unknown host')
    if not config['controller'].startswith('https://'):
        raise RuntimeError('HTTPS controller required')
    if args.probe:
        print(json.dumps({'host': config['host'], 'updates': updates()[0],
                          'rebootRequired': reboot_required(config['host'].startswith('pve-')),
                          'healthy': pve_healthy() if config['host'].startswith('pve-') else True}))
        return
    with open('/run/lock/host-maintenance.lock', 'w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        if args.recover:
            with open('/var/lib/dpkg/lock-frontend', 'a') as package_lock:
                fcntl.lockf(package_lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
                if run('dpkg', '--audit').strip():
                    raise RuntimeError('Repair package state before recovery')
                pve = config['host'].startswith('pve-')
                count, fingerprint = updates()
                api(config, 'report', {'bootId': BOOT.read_text().strip(),
                    'required': reboot_required(pve), 'updates': count, 'fingerprint': fingerprint,
                    'healthy': pve_healthy() if pve else True})
                api(config, 'recover', {})
                STATE.unlink(missing_ok=True)
                UPDATE_STATE.unlink(missing_ok=True)
        elif args.update:
            update_packages(config)
        else:
            process(config)


if __name__ == '__main__':
    try:
        main()
    except urllib.error.HTTPError as error:
        raise SystemExit(f'Controller returned HTTP {error.code}; no new execution authorized') from None
    except (urllib.error.URLError, TimeoutError):
        raise SystemExit('Controller unreachable; no maintenance execution authorized') from None
