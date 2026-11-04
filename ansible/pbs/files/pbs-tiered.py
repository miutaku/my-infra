#!/usr/bin/env python3
"""Verify HDD backups, copy verified snapshots, and retain a recoverable local pin."""
import argparse
import fcntl
import json
import os
from pathlib import Path
import subprocess
import time

CONFIG = Path('/etc/proxmox-backup/tiered.json')
STATE = Path('/var/lib/pbs-tiered/state.json')


def command(args, json_output=False):
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError('Command failed: ' + ' '.join(args[:4]) + '\n' +
                           '\n'.join((result.stdout + result.stderr).splitlines()[-20:]))
    return json.loads(result.stdout) if json_output else result.stdout


def manager(*args, json_output=False):
    return command(['proxmox-backup-manager', *args], json_output)


def api(method, path, *args):
    output = command(['proxmox-backup-debug', 'api', method, path, *args,
                      '--output-format', 'json'])
    return json.loads(output) if output.strip() else None


def snapshots(store):
    return api('get', f'/admin/datastore/{store}/snapshots')


def identity(snapshot):
    return [snapshot['backup-type'], str(snapshot['backup-id']), snapshot['backup-time']]


def group(snapshot):
    return f"{snapshot['backup-type']}/{snapshot['backup-id']}"


def complete(snapshot):
    return any(f.get('filename') == 'index.json.blob' for f in snapshot.get('files', []))


def select_verified(rows, groups, now):
    chosen = []
    for name in groups:
        candidates = [s for s in rows if group(s) == name and complete(s)
                      and (s.get('verification') or {}).get('state') == 'ok']
        latest = max(candidates, key=lambda s: s['backup-time'], default=None)
        if latest is None or now - latest['backup-time'] > 26 * 3600:
            raise RuntimeError(f'No recent verified backup for {name}; retaining local snapshots')
        chosen.append(latest)
    return chosen


def require_copies(chosen, archive):
    present = {tuple(identity(s)) for s in archive if complete(s)}
    if any(tuple(identity(s)) not in present for s in chosen):
        raise RuntimeError('Archive is missing a selected snapshot; retaining existing pins')


def validate_sync(config, job):
    if (job.get('store') != config['archive'] or job.get('remote-store') != config['local']
            or job.get('remote') or job.get('sync-direction', 'pull') != 'pull'
            or job.get('owner') != 'admin@pbs' or not job.get('verified-only')
            or job.get('remove-vanished', False)):
        raise RuntimeError('Unsafe or unexpected local-to-archive sync configuration')


def save_state(state):
    STATE.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    temporary = STATE.with_suffix('.tmp')
    temporary.write_text(json.dumps(state) + '\n')
    temporary.chmod(0o600)
    temporary.replace(STATE)


def set_protected(store, key, protected, timeout=15 * 60):
    deadline = time.monotonic() + timeout
    while True:
        try:
            api('set', f'/admin/datastore/{store}/protected',
                '--backup-type', key[0], '--backup-id', key[1], '--backup-time', str(key[2]),
                '--protected', str(protected).lower())
            return
        except RuntimeError as error:
            # PBS can report only this context when an incremental backup holds the base snapshot.
            message = str(error).lower()
            busy = any(text in message for text in (
                'while updating the protection status of snapshot',
                'unable to acquire lock', 'already locked', 'possibly running or in use',
            ))
            remaining = deadline - time.monotonic()
            if not busy or remaining <= 0:
                raise
            print(f'Protection update for {store}/{key[0]}/{key[1]}/{key[2]} is busy; retrying',
                  flush=True)
            time.sleep(min(10, remaining))


def update_pins(config, state, chosen, rows):
    desired = {tuple(identity(s)) for s in chosen}
    existing = {tuple(identity(s)): s for s in rows}
    owned = {tuple(key) for key in state.get('pins', [])}
    # Never take ownership of snapshots protected separately by an operator.
    for key in sorted(desired):
        if not existing[key].get('protected'):
            set_protected(config['local'], key, True)
            owned.add(key)
            state['pins'] = [list(k) for k in sorted(owned)]
            save_state(state)
    for key in sorted(owned - desired):
        if key in existing:
            set_protected(config['local'], key, False)
        owned.remove(key)
        state['pins'] = [list(k) for k in sorted(owned)]
        save_state(state)


def check_mount(config):
    mount = config['mountpoint']
    if not os.path.ismount(mount):
        raise RuntimeError('HDD is not mounted; refusing to use the OS disk')
    label = command(['findmnt', '-n', '-o', 'LABEL', '--mountpoint', mount]).strip()
    if label != config['label']:
        raise RuntimeError('Unexpected filesystem at the HDD mountpoint')


def housekeeping(config, state):
    # Prior to the first confirmed archive copy, there is nothing safe to prune.
    if not state.get('last_sync'):
        print('No confirmed archive copy yet; skipping prune and GC', flush=True)
        return
    rows = snapshots(config['local'])
    known = {tuple(identity(s)): s for s in rows}
    for key in state.get('synced', []):
        row = known.get(tuple(key))
        if row is None or not row.get('protected'):
            raise RuntimeError('A managed recovery pin is missing; refusing to prune')
    manager('prune-job', 'run', config['prune_job'])
    manager('garbage-collection', 'start', config['local'])


def daily(config, state):
    jobs = manager('sync-job', 'list', '--output-format', 'json', json_output=True)
    job = next(j for j in jobs if j['id'] == config['sync_job'])
    validate_sync(config, job)
    print('Verifying HDD snapshots', flush=True)
    manager('verify', config['local'], '--ignore-verified', 'true', '--outdated-after', '7',
            '--read-threads', '1', '--verify-threads', '2')
    rows = snapshots(config['local'])
    chosen = select_verified(rows, config['groups'], time.time())
    print('Synchronizing verified HDD snapshots to IDrive', flush=True)
    manager('sync-job', 'run', config['sync_job'])
    require_copies(chosen, snapshots(config['archive']))
    update_pins(config, state, chosen, snapshots(config['local']))
    state['last_sync'] = int(time.time())
    state['synced'] = [identity(s) for s in chosen]
    save_state(state)
    print(f'Confirmed {len(chosen)} recent archive copies; recovery pins updated', flush=True)
    housekeeping(config, state)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['daily', 'housekeeping'])
    args = parser.parse_args()
    config = json.loads(CONFIG.read_text())
    with open('/run/lock/pbs-tiered.lock', 'w') as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            print('Another tiered backup operation is running; skipping', flush=True)
            return
        check_mount(config)
        state = json.loads(STATE.read_text()) if STATE.exists() else {}
        if args.action == 'daily':
            daily(config, state)
        else:
            housekeeping(config, state)


if __name__ == '__main__':
    main()
