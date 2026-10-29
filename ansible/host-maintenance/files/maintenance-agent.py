#!/usr/bin/python3
"""Fixed maintenance actions; all execution requires a live controller claim."""
import argparse
import fcntl
import hashlib
import json
import os
import shlex
import time
from pathlib import Path
import subprocess
import urllib.error
import urllib.request

STATE = Path('/var/lib/host-maintenance/execution.json')
UPDATE_STATE = Path('/var/lib/host-maintenance/update.json')
BACKUP_STATE = Path('/var/lib/host-maintenance/backup-replay.json')
BACKUP_LAST = Path('/var/lib/host-maintenance/backup-replay-last.json')
BOOT = Path('/proc/sys/kernel/random/boot_id')
REQUIRED = Path('/run/reboot-required')
AVAILABILITY_POLICY = Path('/etc/host-maintenance/availability-policy.json')
LOOCKIT_CTIDS = {'pve-x570': '12902', 'pve-b550m': '12903'}
HANDOFF_TIMEOUT = 480


class AvailabilityBlocked(RuntimeError):
    pass


def availability_policy(host):
    try:
        policy = json.loads(AVAILABILITY_POLICY.read_text())
        if (policy['availability_scope'] != 'loockit-and-tunnel' or
                set(policy['tunnel_endpoints']) != {'pve-x570', 'pve-b550m', 'rpi-107', 'rpi-109'} or
                any(not isinstance(url, str) or not url.endswith('/ready')
                    for url in policy['tunnel_endpoints'].values()) or
                set(policy['loockit_endpoints']) != {'pve-x570', 'pve-b550m'} or
                host not in policy['loockit_endpoints'] or
                any(not isinstance(url, str) or not url.endswith('/readyz')
                    for url in policy['loockit_endpoints'].values())):
            raise ValueError('Incomplete availability policy')
        return policy
    except (OSError, ValueError, KeyError, TypeError):
        raise AvailabilityBlocked('Loockit/Tunnelの保護設定を読み取れないか、設定が不完全です。') from None


def availability_check(host, reboot=False):
    """Loockit must serve from the peer and a Tunnel on another physical host must be ready."""
    try:
        policy = availability_policy(host)
        # A standby normally returns 503 from /readyz. Before reboot the peer
        # must already serve; after reboot require two live processes and one
        # serving leader, rather than falsely waiting for two active leaders.
        ready = 0
        for node, url in policy['loockit_endpoints'].items():
            if reboot and node == host:
                continue
            if not reboot:
                with urllib.request.urlopen(url.removesuffix('/readyz') + '/healthz', timeout=5) as response:
                    if response.status != 200:
                        raise AvailabilityBlocked(f'Loockit process health failed on {node}')
            try:
                with urllib.request.urlopen(url, timeout=5) as response:
                    if response.status != 200:
                        raise AvailabilityBlocked(f'Loockit readiness failed on {node}')
                    ready += 1
            except urllib.error.HTTPError as error:
                if reboot or error.code != 503 or json.loads(error.read(1024)).get('detail') != 'standby replica':
                    raise AvailabilityBlocked(f'Loockit readiness failed on {node} (HTTP {error.code}); peer must be ready before reboot') from None
        if ready != 1:
            raise AvailabilityBlocked('Exactly one serving Loockit leader required')
        tunnel_ready = 0
        for domain, url in policy['tunnel_endpoints'].items():
            if reboot and domain == host:
                continue
            try:
                with urllib.request.urlopen(url, timeout=5) as response:
                    if response.status == 200:
                        tunnel_ready += 1
            except (OSError, ValueError):
                # Unused or failed nodes are allowed; one surviving connector is required.
                pass
        if not tunnel_ready:
            raise AvailabilityBlocked('No connected Cloudflare Tunnel on a surviving physical host')
    except AvailabilityBlocked:
        raise
    except (OSError, ValueError, KeyError, TypeError, subprocess.SubprocessError):
        raise AvailabilityBlocked('Loockit/Tunnel policy or service check failed; reboot denied') from None



def loockit_state(host, url):
    try:
        with urllib.request.urlopen(url, timeout=5) as response:
            if response.status == 200:
                return 'ready'
            raise AvailabilityBlocked(f'{host}: LoockitがHTTP {response.status}を返しました。')
    except urllib.error.HTTPError as error:
        if error.code == 503:
            try:
                if json.loads(error.read(1024)).get('detail') == 'standby replica':
                    return 'standby'
            except (ValueError, AttributeError):
                pass
        raise AvailabilityBlocked(f'{host}: LoockitがHTTP {error.code}を返し、操作を受け付けられません。') from None
    except OSError:
        raise AvailabilityBlocked(f'{host}: Loockitに応答がありません（接続失敗またはタイムアウト）。') from None


def restore_loockit(host, pending):
    if not pending.get('loockitStopped'):
        return
    try:
        run('pct', 'exec', LOOCKIT_CTIDS[host], '--', 'docker', 'start', 'loockit')
    except subprocess.SubprocessError:
        raise AvailabilityBlocked(f'{host}: 切替後のローカルLoockit再起動に失敗しました。LXCのdocker状態を確認してください。') from None
    pending.pop('loockitStopped')
    save(pending)


def handoff_loockit(host, pending):
    """Only an approved execution may stop the local BLE leader; always restore it."""
    policy = availability_policy(host)
    peer = next(node for node in LOOCKIT_CTIDS if node != host)
    peer_url = policy['loockit_endpoints'][peer]
    if loockit_state(peer, peer_url) == 'ready':
        availability_check(host, reboot=True)
        return
    # Validate peer process health and an independent Tunnel before disrupting BLE.
    loockit_state(peer, peer_url.removesuffix('/readyz') + '/healthz')
    if loockit_state(host, policy['loockit_endpoints'][host]) != 'ready':
        raise AvailabilityBlocked(f'{host}: ローカルLoockitも待機系のため、安全な切替元を確認できません。')
    surviving = False
    for node, url in policy['tunnel_endpoints'].items():
        if node == host:
            continue
        try:
            with urllib.request.urlopen(url, timeout=5) as response:
                surviving = surviving or response.status == 200
        except OSError:
            pass
    if not surviving:
        raise AvailabilityBlocked('再起動対象以外のホストでCloudflare Tunnelの正常接続を確認できません。')
    pending['loockitStopped'] = True
    save(pending)  # docker uses unless-stopped; interruption recovery must restart it explicitly.
    try:
        run('pct', 'exec', LOOCKIT_CTIDS[host], '--', 'docker', 'stop', '--time', '30', 'loockit')
        deadline = time.monotonic() + HANDOFF_TIMEOUT
        last_reason = f'{peer}: Loockitは待機系です。'
        while time.monotonic() < deadline:
            try:
                if loockit_state(peer, peer_url) == 'ready':
                    print(f'Loockit handoff ready: {host} -> {peer}')
                    break
                last_reason = f'{peer}: Loockitはまだ待機系です。'
            except AvailabilityBlocked as error:
                last_reason = str(error)
            time.sleep(5)
        else:
            raise AvailabilityBlocked(f'Loockitの{peer}への切替が{HANDOFF_TIMEOUT}秒以内に完了しませんでした。{last_reason} ローカルを再起動し、ホスト再起動は保留します。')
    except subprocess.SubprocessError:
        raise AvailabilityBlocked(f'{host}: ローカルLoockitを停止できず、切替を中止しました。') from None
    finally:
        restore_loockit(host, pending)
    # Restarted local replica must remain standby while the peer continues serving.
    availability_check(host, reboot=True)


def failure_detail(error):
    if isinstance(error, subprocess.SubprocessError):
        return '事前確認コマンドが失敗またはタイムアウトしました。ホストのjournalを確認してください。'
    return str(error)[:600]


def pve_recovered(host):
    if not pve_healthy():
        return False
    try:
        availability_check(host)
        return True
    except AvailabilityBlocked:
        return False


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


def pve_preflight(host, pending=None):
    if not pve_healthy():
        raise RuntimeError('PVE cluster or package state is unhealthy')
    # Running Kubernetes/storage guests are allowed to stop with the host.
    # Loockit and a Tunnel connector must survive; no guests are migrated.
    pve_tasks_idle(allow_backups=True)
    if pending is not None and reboot_required(True):
        handoff_loockit(host, pending)
    availability_check(host, reboot=True)


def pve_tasks_idle(allow_backups=False):
    backups = []
    for node in ['pve-x570', 'pve-b550m']:
        tasks = json.loads(run('pvesh', 'get', f'/nodes/{node}/tasks', '--source', 'active',
                               '--limit', '1000', '--output-format', 'json'))
        if len(tasks) >= 1000:
            raise RuntimeError('PVE task inventory is incomplete')
        for task in tasks:
            if not allow_backups or task.get('type') != 'vzdump':
                raise RuntimeError(f"Active PVE task on {node}: {task.get('type', 'unknown')}; maintenance deferred")
            backups.append({**task, 'node': node})
    return backups


# Options printed by vzdump's own task log, with explicit values. Do not execute
# log text in a shell. stdout/stop backups cannot be replayed as background jobs.
BACKUP_OPTIONS = set(('all bwlimit compress dumpdir exclude exclude-path fleecing '
    'ionice job-id lockwait mailnotification mailto mode notes-template notification-mode '
    'pbs-change-detection-mode performance pigz pool protected prune-backups quiet '
    'remove script stdexcludes stopwait storage tmpdir zstd').split())


def backup_arguments(node, upid):
    if node not in ['pve-x570', 'pve-b550m'] or not upid.startswith(f'UPID:{node}:') or ':vzdump:' not in upid:
        raise RuntimeError('Invalid backup task identity')
    log = json.loads(run('pvesh', 'get', f'/nodes/{node}/tasks/{upid}/log',
                         '--start', '0', '--limit', '1', '--output-format', 'json'))
    prefix = 'INFO: starting new backup job: vzdump '
    if not log or not log[0].get('t', '').startswith(prefix):
        raise RuntimeError('Cannot preserve backup arguments; reboot denied')
    words = shlex.split(log[0]['t'][len(prefix):])
    guests, arguments = [], []
    while words and words[0].isdigit():
        guests.append(words.pop(0))
    if guests:
        arguments += ['--vmid', ','.join(guests)]
    while words:
        option = words.pop(0)
        if not option.startswith('--') or option[2:] not in BACKUP_OPTIONS or not words:
            raise RuntimeError('Unsupported backup arguments; reboot denied')
        arguments += [option, words.pop(0)]
    if not guests and '--all' not in arguments and '--pool' not in arguments:
        raise RuntimeError('Backup has no replayable guest selection')
    return arguments


def backup_status(item, upid):
    return json.loads(run('pvesh', 'get', f"/nodes/{item['node']}/tasks/{upid}/status",
                          '--output-format', 'json'))


def backup_save(queue):
    save(queue, BACKUP_STATE)
    BACKUP_STATE.chmod(0o600)


def backup_release(execution_id):
    if BACKUP_STATE.exists():
        queue = json.loads(BACKUP_STATE.read_text())
        if queue['executionId'] == execution_id:
            queue['resumeAllowed'] = True
            backup_save(queue)


def prepare_backups(host, pending):
    """Called only after an approved claim and availability checks; never by probe."""
    queue = json.loads(BACKUP_STATE.read_text()) if BACKUP_STATE.exists() else {'items': {}}
    if queue.get('executionId') != pending['executionId']:
        for item in queue['items'].values():
            item.pop('stopRequested', None)
    queue.update(bootId=pending['bootId'], executionId=pending['executionId'], resumeAllowed=False)
    deadline = time.monotonic() + 120
    while True:
        active = pve_tasks_idle(allow_backups=True)
        # Preserve every new task before stopping any of this batch.
        fresh = [task for task in active if task['upid'] not in queue['items']]
        captured = {task['upid']: {'node': task['node'], 'originalUpid': task['upid'],
                    'arguments': backup_arguments(task['node'], task['upid']), 'state': 'pending'}
                    for task in fresh}
        for upid in captured:
            # A later reboot may interrupt our own replay. The newest owner now
            # handles that task; do not keep two replay requests for the same run.
            queue['items'] = {key: item for key, item in queue['items'].items()
                              if item.get('replayUpid') != upid}
        queue['items'].update(captured)
        if queue['items']:
            backup_save(queue)
        if not active:
            return
        for task in active:
            item = queue['items'][task['upid']]
            if item.get('stopRequested'):
                continue
            item['stopRequested'] = True
            backup_save(queue)
            try:
                run('pvesh', 'delete', f"/nodes/{task['node']}/tasks/{task['upid']}")
            except subprocess.SubprocessError:
                if backup_status(item, task['upid'])['status'] != 'stopped':
                    raise
            print(f"Backup stop requested for approved reboot: {task['node']} {task['upid']}")
        if time.monotonic() >= deadline:
            raise RuntimeError('Backup did not stop cleanly within 120s; reboot denied')
        time.sleep(2)


def replay_backups():
    """Durable, asynchronous replay after reboot, or after a blocked reboot."""
    if not BACKUP_STATE.exists():
        return
    queue = json.loads(BACKUP_STATE.read_text())
    if queue['bootId'] == BOOT.read_text().strip() and not queue['resumeAllowed']:
        return
    if not pve_healthy():
        return
    try:
        pve_tasks_idle(allow_backups=True)
    except RuntimeError:
        return  # Wait for guest startup, migration or restore to finish.
    for item in queue['items'].values():
        try:
            replay_backup_item(queue, item)
        except (OSError, ValueError, RuntimeError, subprocess.SubprocessError):
            print(f"Backup replay deferred on {item['node']}; durable journal retained")
    if all(item['state'] in ['done', 'failed'] for item in queue['items'].values()):
        save(queue, BACKUP_LAST)
        BACKUP_STATE.unlink()


def replay_backup_item(queue, item):
    if item['state'] in ['done', 'failed']:
        return
    if item.get('replayUpid'):
        status = backup_status(item, item['replayUpid'])
        if status['status'] == 'stopped':
            item['state'] = 'done' if status.get('exitstatus') == 'OK' else 'failed'
            item['exitstatus'] = status.get('exitstatus', 'unknown')
            print(f"Backup replay {item['state']}: {item['node']} {item['replayUpid']}")
            backup_save(queue)
        return
    if item['state'] == 'submitting':
        # A crash/timeout may lose the response after PVE accepted the job.
        # Reconcile by the actual arguments in task history; never blind retry.
        tasks = json.loads(run('pvesh', 'get', f"/nodes/{item['node']}/tasks",
            '--source', 'all', '--since', str(item['submittedAt']), '--limit', '1000',
            '--output-format', 'json'))
        for task in tasks:
            if task.get('type') == 'vzdump' and task['upid'] != item['originalUpid'] and \
                    backup_arguments(item['node'], task['upid']) == item['arguments']:
                item.update(replayUpid=task['upid'], state='running')
                backup_save(queue)
                break
        else:
            print(f"Backup submission unresolved on {item['node']}; inspect backup-replay.json before retrying")
        return
    original = backup_status(item, item['originalUpid'])
    if original['status'] != 'stopped':
        return
    if original.get('exitstatus') == 'OK':
        item['state'] = 'done'  # It finished between inspection and cancellation.
        backup_save(queue)
        return
    # Do not stack two backup jobs on the same node, including a scheduled run.
    active = json.loads(run('pvesh', 'get', f"/nodes/{item['node']}/tasks",
        '--source', 'active', '--limit', '1000', '--output-format', 'json'))
    if any(task.get('type') == 'vzdump' for task in active):
        return
    if '--storage' in item['arguments']:
        storage = item['arguments'][item['arguments'].index('--storage') + 1]
        status = json.loads(run('pvesh', 'get', f"/nodes/{item['node']}/storage/{storage}/status",
                                '--output-format', 'json'))
        if not status.get('active'):
            return  # PBS/NAS guests can take longer than the PVE services.
    item.update(state='submitting', submittedAt=int(time.time()))
    backup_save(queue)
    # Bind values with '=' so a note such as '--stop=1' stays a note, not a CLI option.
    options = [f'{option}={value}' for option, value in zip(item['arguments'][::2], item['arguments'][1::2])]
    upid = json.loads(run('pvesh', 'create', f"/nodes/{item['node']}/vzdump",
                         *options, '--output-format', 'json'))
    if not isinstance(upid, str) or not upid.startswith(f"UPID:{item['node']}:"):
        raise RuntimeError('Backup submission response invalid; replay journal retained')
    item.update(replayUpid=upid, state='running')
    backup_save(queue)
    print(f"Backup replay started: {item['node']} {upid}")


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


API_OPENER = urllib.request.build_opener(NoRedirect())


def api(config, endpoint, data):
    if not config.get('access_client_id') or not config.get('access_client_secret'):
        raise RuntimeError('Cloudflare Access credentials are required')
    request = urllib.request.Request(config['controller'].rstrip('/') + '/agent/' + endpoint,
        data=json.dumps(data).encode(), headers={
            'Authorization': 'Bearer ' + config['token'],
            'X-Maintenance-Host': config['host'], 'Content-Type': 'application/json',
            'CF-Access-Client-Id': config['access_client_id'],
            'CF-Access-Client-Secret': config['access_client_secret'],
            'User-Agent': 'home-maintenance-agent/1.0',
        }, method='POST')
    with API_OPENER.open(request, timeout=30) as response:
        return json.load(response)


def save(data, path=None):
    path = STATE if path is None else path
    temporary = path.with_suffix('.tmp')
    temporary.write_text(json.dumps(data) + '\n')
    temporary.replace(path)


def update_request():
    return UPDATE_STATE.with_name('update-request.json')


def pve_reboot_window_open():
    return time.gmtime(time.time() + 9 * 3600).tm_hour >= 20


def update_packages(config, refresh=True):
    """Automatic package installation; deliberately has no reboot call."""
    host = config['host']
    if not host.startswith('pve-'):
        raise RuntimeError('Automatic updater is for PVE hosts only')
    if refresh:
        save({'queuedAt': time.time()}, update_request())
    if STATE.exists() or UPDATE_STATE.exists():
        print('Pending execution journal; investigate before another update')
        return
    if not pve_healthy():
        print('Cluster or package manager not ready; update skipped')
        return
    request = json.loads(update_request().read_text()) if update_request().exists() else {}
    if not request.get('refreshed'):
        run('apt-get', 'update')
        request['refreshed'] = True
        save(request, update_request())
    try:
        pve_tasks_idle()
    except (RuntimeError, subprocess.SubprocessError):
        print('Active PVE tasks; package update remains queued')
        return
    count, fingerprint = updates()
    api(config, 'report', {'bootId': BOOT.read_text().strip(), 'required': reboot_required(True),
                          'updates': count, 'fingerprint': fingerprint, 'healthy': pve_healthy()})
    if not count:
        update_request().unlink(missing_ok=True)
        print('No package upgrades available')
        return
    claim = api(config, 'update-claim', {})
    if not claim:
        print('PVE execution or environment verification pending; package update remains queued')
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
    update_request().unlink(missing_ok=True)
    print('Packages updated; OS reboot requires separate explicit approval')


def process(config):
    host = config['host']
    pve = host.startswith('pve-')
    boot_id = BOOT.read_text().strip()
    if pve:
        replay_backups()
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
        if pve and pending.get('loockitStopped'):
            restore_loockit(host, pending)
            if pending['bootId'] == boot_id and not pending.get('outcome'):
                pending.update(outcome='blocked', reason='availability',
                    detail='Loockitの切替処理が中断したためローカルを起動しました。ホスト再起動は行わず保留します。')
                save(pending)
        if pending['bootId'] == boot_id:
            # A process interruption is never treated as permission to retry an upgrade.
            if pending.get('outcome'):
                api(config, 'result', {'executionId': pending['executionId'], 'outcome': pending['outcome'],
                                      'reason': pending.get('reason', 'preflight'), 'detail': pending.get('detail', '')})
                STATE.unlink()
            else:
                print('Execution is awaiting reboot or manual investigation')
            return
        if pve and not pve_recovered(host):
            print('Rebooted; waiting for PVE, Loockit and Tunnel before releasing maintenance lock')
            return
    count, fingerprint = updates()
    healthy = pve_recovered(host) if pve else package_idle()
    api(config, 'report', {'bootId': boot_id, 'required': reboot_required(pve),
                          'updates': count, 'fingerprint': fingerprint, 'healthy': healthy})
    if STATE.exists():
        STATE.unlink()
    claim = api(config, 'claim', {})
    if not claim:
        if pve and update_request().exists():
            update_packages(config, refresh=False)
        return
    pending = {'bootId': boot_id, 'executionId': claim['executionId']}
    save(pending)
    try:
        if not package_idle():
            raise RuntimeError('Another package manager is active')
        if pve:
            pve_preflight(host, pending=pending)
        elif not REQUIRED.exists():
            raise RuntimeError('Reboot no longer required')
        will_reboot = reboot_required(pve)
        if pve and will_reboot:
            if not pve_reboot_window_open():
                raise AvailabilityBlocked('PVEの再起動は日本時間20:00〜23:59だけ実行できます。日時を指定し直してください。')
            prepare_backups(host, pending)
            # Cleanup can take time; recheck safety and reject any new task.
            pve_preflight(host)
            pve_tasks_idle()
            if not pve_reboot_window_open():
                raise AvailabilityBlocked('事前確認中にPVEの夜間実行枠を過ぎました。ホストは再起動せず保留します。')
    except (RuntimeError, subprocess.SubprocessError) as error:
        if pve:
            backup_release(pending['executionId'])
        pending['outcome'] = 'blocked'
        pending['reason'] = 'availability' if isinstance(error, AvailabilityBlocked) else 'preflight'
        pending['detail'] = failure_detail(error)
        save(pending)
        api(config, 'result', {'executionId': pending['executionId'], 'outcome': 'blocked', 'reason': pending['reason'], 'detail': pending['detail']})
        if not pending.get('loockitStopped'):
            STATE.unlink()
        print(str(error))
        print('Maintenance blocked by preflight; see cluster/package state and active tasks')
        return
    try:
        if will_reboot:
            subprocess.run(['systemctl', 'reboot'], check=True, timeout=30)
        else:
            pending['outcome'] = 'complete'
            save(pending)
            api(config, 'result', {'executionId': pending['executionId'], 'outcome': 'complete'})
            STATE.unlink()
    except (subprocess.SubprocessError, RuntimeError) as error:
        if pve:
            backup_release(pending['executionId'])
        print(str(error))
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
        result = {'host': config['host'], 'updates': updates()[0],
                          'rebootRequired': reboot_required(config['host'].startswith('pve-')),
                          'healthy': pve_recovered(config['host']) if config['host'].startswith('pve-') else True}
        if config['host'].startswith('pve-'):
            try:
                pve_preflight(config['host'])
                result['rebootSafe'] = True
            except (RuntimeError, subprocess.SubprocessError) as error:
                result.update(rebootSafe=False, rebootBlockReason=str(error))
        print(json.dumps(result))
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
                if pve and STATE.exists():
                    backup_release(json.loads(STATE.read_text())['executionId'])
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
