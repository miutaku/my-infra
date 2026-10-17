#!/usr/bin/env python3
"""Read-only service checks. Secrets and response bodies are never logged/exported.

Each target has its own polling thread and atomic snapshot. A failed poll drops
old functional values and emits success=0; a blocked poll becomes stale. Scrapes
never initiate requests or accept arbitrary target URLs from clients.
"""
import argparse
import datetime
import hashlib
import http.client
import json
import math
import re
import ssl
import socket
import struct
import threading
import time
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

TIMEOUT = 8
MAX_BODY = 16 * 1024 * 1024


def secret(name):
    value = (Path('/credentials') / name).read_text().strip()
    if not value:
        raise ValueError('empty credential')
    return value


def timestamp(value):
    if isinstance(value, dict):
        return float(value['$date']) / 1000
    if isinstance(value, (int, float)):
        return float(value)
    return datetime.datetime.fromisoformat(value.replace('Z', '+00:00')).timestamp()


def pinned_context(ca):
    context = ssl.create_default_context(cafile=ca)
    # Appliances use self-signed certificates with factory hostnames. Verify
    # lifetime/chain with that certificate, then require the exact reviewed leaf
    # before sending credentials. Public probes retain normal hostname checks.
    context.check_hostname = False
    # Some appliance factory certificates have legacy CA extensions. The exact
    # leaf pin below remains mandatory; retain lifetime/signature verification.
    context.verify_flags &= ~ssl.VERIFY_X509_STRICT
    return context


def verify_leaf(sock, ca):
    expected = ssl.PEM_cert_to_DER_cert(Path(ca).read_text())
    if hashlib.sha256(expected).digest() != hashlib.sha256(sock.getpeercert(binary_form=True)).digest():
        raise ssl.SSLError('server certificate changed')


def request(url, headers=None, ca=None, pinned=False):
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme == 'https':
        connection = http.client.HTTPSConnection(parsed.hostname, parsed.port,
            context=pinned_context(ca) if pinned else ssl.create_default_context(cafile=ca), timeout=TIMEOUT)
    elif parsed.scheme == 'http' and not headers:
        connection = http.client.HTTPConnection(parsed.hostname, parsed.port, timeout=TIMEOUT)
    else:
        raise ValueError('credentials require HTTPS')
    try:
        connection.connect()
        if pinned:
            verify_leaf(connection.sock, ca)
        expires = ssl.cert_time_to_seconds(connection.sock.getpeercert()['notAfter']) if parsed.scheme == 'https' else None
        connection.request('GET', urllib.parse.urlunsplit(('', '', parsed.path or '/', parsed.query, '')), headers=headers or {})
        response = connection.getresponse()
        body = response.read(MAX_BODY + 1)
        if len(body) > MAX_BODY:
            raise ValueError('response too large')
        return response.status, dict((k.lower(), v) for k, v in response.getheaders()), body, expires
    finally:
        connection.close()


def get_json(url, headers=None, ca=None, pinned=False):
    status, _, body, _ = request(url, headers, ca, pinned)
    if status != 200:
        raise ValueError('unexpected HTTP status')
    return json.loads(body)


class Metrics:
    def __init__(self, target):
        self.labels = {'target': target['name'], 'kind': target['kind']}
        self.samples = []

    def add(self, name, value, **labels):
        value = float(value)
        if not math.isfinite(value):
            raise ValueError('non-finite metric')
        self.samples.append((name, value, self.labels | labels))

    def render(self):
        def quote(value):
            return '"' + str(value).replace('\\', '\\\\').replace('\n', '\\n').replace('"', '\\"') + '"'
        return ''.join(name + '{' + ','.join(k + '=' + quote(v)
                    for k, v in sorted(labels.items())) + '} ' + str(value) + '\n'
                    for name, value, labels in self.samples)


def access(target, metrics):
    headers = {'CF-Access-Client-Id': secret('access-client-id'),
               'CF-Access-Client-Secret': secret('access-client-secret')}
    # Never follow redirects: the Access login page must not become a false
    # success, and service credentials must not reach another origin.
    status, _, body, expires = request(target['url'], headers)
    metrics.add('home_access_tls_expiry_seconds', expires)
    metrics.add('home_access_http_status', status)
    text = body.decode('utf-8', 'replace')
    login_page = re.search(r'<title>\s*Cloudflare Access|cloudflareaccess\.com/cdn-cgi/access', text, re.I)
    # Without credentials the same URL must require Access. Otherwise an
    # accidentally bypassed URL would falsely prove service-token authentication.
    negative_status, negative_headers, _, _ = request(target['url'])
    location = urllib.parse.urlsplit(negative_headers.get('location', ''))
    guarded = negative_status in (302, 303) and location.scheme == 'https' and bool(
        location.hostname and location.hostname.endswith('.cloudflareaccess.com')
        and location.path.startswith('/cdn-cgi/access/login'))
    metrics.add('home_access_success', status == 200 and not login_page and guarded and bool(re.search(target['expect'], text, re.I)))


def mirakurun(target, metrics):
    tuners = get_json(target['url'] + '/api/tuners')
    if not isinstance(tuners, list) or not tuners:
        raise ValueError('missing tuner inventory')
    for tuner in tuners:
        metrics.add('home_tuner_available', tuner['isAvailable'] and not tuner['isFault'], tuner=tuner['name'])
    # Mirakurun exposes per-service EPG freshness directly. Avoid downloading
    # the full multi-day guide (tens of MB) or letting a healthy channel hide
    # another channel whose guide has stopped updating.
    services = get_json(target['url'] + '/api/services')
    if not isinstance(services, list) or not services:
        raise ValueError('missing service inventory')
    television = [s for s in services if s['type'] == 1]
    if not television:
        raise ValueError('missing television service inventory')
    for service in television:
        labels = {'service_id': str(service['id'])}
        metrics.add('home_epg_ready', service['epgReady'], **labels)
        metrics.add('home_epg_last_update_seconds', service['epgUpdatedAt'] / 1000, **labels)


def pages(url, key):
    result = []
    for offset in range(0, 100000, 100):
        data = get_json(url + ('&' if '?' in url else '?') + f'offset={offset}&limit=100')
        items = data[key]
        if not isinstance(items, list):
            raise ValueError('invalid collection')
        result.extend(items)
        if len(result) >= int(data['total']):
            return result
        if not items:
            raise ValueError('truncated collection')
    raise ValueError('collection exceeds limit')


def recorder_values(reserves, recordings, recorded, encodes, now, metrics):
    # Match channel + start time, not programId: manual reservations can lack it.
    def key(item):
        return (item['channelId'], int(item['startAt']))
    active = {key(item) for item in recordings}
    completed = {key(item) for item in recorded}
    overdue = [r for r in reserves if not r['isSkip'] and r['startAt'] / 1000 + 120 < now
               and r['endAt'] / 1000 > now and key(r) not in active and key(r) not in completed]
    conflicts = [r for r in reserves if not r['isSkip'] and r['isConflict'] and r['startAt'] / 1000 < now + 86400]
    metrics.add('home_recording_not_started', len(overdue))
    metrics.add('home_recording_conflicts', len(conflicts))
    # A recording disappearing early is observable while its reservation remains.
    interrupted = [r for r in recorded if now - 3600 < r['endAt'] / 1000 < now
                   and not r['isRecording'] and not r.get('videoFiles')]
    metrics.add('home_recording_missing_video', len(interrupted))
    stopped = [r for r in recorded if not r['isRecording'] and r['startAt'] / 1000 + 120 < now < r['endAt'] / 1000 - 120]
    metrics.add('home_recording_interrupted', len(stopped))
    waiting = encodes['waitItems']
    running = encodes['runningItems']
    metrics.add('home_encode_waiting', len(waiting))
    metrics.add('home_encode_running', len(running))
    # API has no enqueue timestamp. This is time since recording ended, and is
    # deliberately named as such; do not present it as precise queue age.
    metrics.add('home_encode_oldest_recording_age_seconds', max(
        [max(0, now - item['recorded']['endAt'] / 1000) for item in waiting] or [0]))


def recorder(target, metrics):
    base = target['url'] + '/api/'
    reserves = pages(base + 'reserves?isHalfWidth=true', 'reserves')
    recordings = pages(base + 'recording?isHalfWidth=true', 'records')
    # Restrict result inspection to a bounded recent page; recording content is
    # never downloaded. Newest-first is the API's default ordering.
    recorded = get_json(base + 'recorded?isHalfWidth=true&offset=0&limit=100')['records']
    encodes = get_json(base + 'encode?isHalfWidth=true')
    recorder_values(reserves, recordings, recorded, encodes, time.time(), metrics)


def truenas(target, metrics):
    import websocket
    connection = websocket.create_connection(target['url'], timeout=TIMEOUT,
        sslopt={'ca_certs': target['ca'], 'check_hostname': False}, suppress_origin=True)
    deadline = time.monotonic() + 40
    index = 0

    def rpc(method, params):
        nonlocal index
        index += 1
        connection.send(json.dumps({'jsonrpc': '2.0', 'id': index, 'method': method, 'params': params}))
        while time.monotonic() < deadline:
            response = json.loads(connection.recv())
            if response.get('id') != index:
                continue
            if 'error' in response:
                raise ValueError('TrueNAS API method failed')
            return response['result']
        raise TimeoutError('TrueNAS request deadline')

    try:
        verify_leaf(connection.sock, target['ca'])
        metrics.add('home_api_tls_expiry_seconds', ssl.cert_time_to_seconds(connection.sock.getpeercert()['notAfter']))
        if rpc('auth.login_with_api_key', [secret(target['credential'])]) is not True:
            raise ValueError('TrueNAS authentication failed')
        pools = rpc('pool.query', [])
        if not pools:
            raise ValueError('empty pool inventory')
        for pool in pools:
            name = pool['name']
            metrics.add('home_nas_pool_healthy', pool['healthy'] and pool['status'] == 'ONLINE', pool=name)
            metrics.add('home_nas_pool_used_ratio', pool['allocated'] / pool['size'], pool=name)
            scan = pool['scan'] or {}
            # No completed scrub is explicitly represented by zero, not now().
            completed = scan.get('function') == 'SCRUB' and scan.get('state') == 'FINISHED'
            metrics.add('home_nas_scrub_last_success_seconds', timestamp(scan['end_time']) if completed and not scan['errors'] else 0, pool=name)
            metrics.add('home_nas_scrub_errors', scan.get('errors') or 0, pool=name)
        alerts = rpc('alert.list', [])
        # 25.10 removed smart.test.results. Consume TrueNAS's disk/SMART alerts
        # rather than claiming a nonexistent raw SMART endpoint was collected.
        smart = [a for a in alerts if not a.get('dismissed', False)
                 and re.search('smart|disk', a['klass'], re.I) and a['level'] in ('CRITICAL', 'ALERT', 'EMERGENCY', 'ERROR')]
        metrics.add('home_nas_disk_alerts', len(smart))
    finally:
        connection.close()


def pbs_values(snapshots, expected, metrics):
    for vm in expected:
        # An in-progress snapshot can already appear in this API. Its timestamp
        # is not a successful backup until the manifest has been written.
        candidates = [s for s in snapshots if s['backup-type'] == 'vm' and str(s['backup-id']) == str(vm)
                      and any(f.get('filename') == 'index.json.blob' for f in s.get('files', []))]
        latest = max(candidates, key=lambda item: item['backup-time'], default=None)
        metrics.add('home_pbs_backup_last_success_seconds', latest['backup-time'] if latest else 0, vm=str(vm))
        verification = (latest or {}).get('verification') or {}
        metrics.add('home_pbs_verification_ok', verification.get('state') == 'ok', vm=str(vm))
        metrics.add('home_pbs_verification_failed', any((s.get('verification') or {}).get('state') == 'failed' for s in candidates), vm=str(vm))
        verified = [s['backup-time'] for s in candidates if (s.get('verification') or {}).get('state') == 'ok']
        metrics.add('home_pbs_last_verified_backup_seconds', max(verified or [0]), vm=str(vm))


def pbs(target, metrics):
    status, _, body, expires = request(target['url'] + '/api2/json/admin/datastore/' + target['store'] + '/snapshots',
        {'Authorization': 'PBSAPIToken=' + secret('pbs-token-id') + ':' + secret('pbs-token-secret')}, target['ca'], True)
    if status != 200:
        raise ValueError('PBS API request failed')
    metrics.add('home_api_tls_expiry_seconds', expires)
    data = json.loads(body)
    pbs_values(data['data'], target['vms'], metrics)


def database(target, metrics):
    password = secret(target['credential'])
    if target['engine'] == 'mysql':
        import pymysql
        with pymysql.connect(host=target['host'], user='monitoring', password=password,
                connect_timeout=TIMEOUT, read_timeout=TIMEOUT, write_timeout=TIMEOUT) as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT 1')
                if cursor.fetchone()[0] != 1:
                    raise ValueError('SQL probe failed')
                cursor.execute("SHOW GLOBAL STATUS WHERE Variable_name IN ('Threads_connected','Slow_queries')")
                status = dict(cursor.fetchall())
                cursor.execute('SELECT @@max_connections')
                maximum = cursor.fetchone()[0]
                cursor.execute('SELECT COUNT(*) FROM information_schema.INNODB_LOCK_WAITS')
                locks = cursor.fetchone()[0]
                cursor.execute("SELECT COUNT(*) FROM information_schema.PROCESSLIST WHERE COMMAND != 'Sleep' AND TIME > 60")
                slow_active = cursor.fetchone()[0]
        metrics.add('home_db_connections_ratio', float(status['Threads_connected']) / maximum)
        metrics.add('home_db_lock_waits', locks)
        metrics.add('home_db_long_queries', slow_active)
        metrics.add('home_db_slow_queries_total', status['Slow_queries'])
    else:
        import psycopg
        with psycopg.connect(host=target['host'], dbname='postgres', user='monitoring', password=password,
                connect_timeout=TIMEOUT, options='-c statement_timeout=8000 -c default_transaction_read_only=on') as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT 1')
                if cursor.fetchone()[0] != 1:
                    raise ValueError('SQL probe failed')
                cursor.execute("SELECT count(*)::float / current_setting('max_connections')::float FROM pg_stat_activity")
                metrics.add('home_db_connections_ratio', cursor.fetchone()[0])
                cursor.execute("SELECT count(*) FROM pg_stat_activity WHERE wait_event_type = 'Lock'")
                metrics.add('home_db_lock_waits', cursor.fetchone()[0])
                cursor.execute("SELECT count(*) FROM pg_stat_activity WHERE state = 'active' AND pid != pg_backend_pid() AND query_start < now() - interval '60 seconds'")
                metrics.add('home_db_long_queries', cursor.fetchone()[0])
    metrics.add('home_db_query_success', 1)


def kubernetes(target, metrics):
    base = 'https://kubernetes.default.svc'
    ca = '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'
    headers = {'Authorization': 'Bearer ' + Path('/var/run/secrets/kubernetes.io/serviceaccount/token').read_text().strip()}
    for namespace in target['namespaces']:
        path = f'/apis/external-secrets.io/v1beta1/namespaces/{namespace}/externalsecrets'
        discovered = {item['metadata']['name']: item for item in get_json(base + path, headers, ca)['items']}
        expected = set(target['expected'].get(namespace, []))
        names = expected if namespace in ('arc-runners', 'monitoring') else expected | discovered.keys()
        for name in sorted(names):
            item = discovered.get(name, {'metadata': {'name': name}})
            conditions = item.get('status', {}).get('conditions', [])
            ready = any(c['type'] == 'Ready' and c['status'] == 'True' for c in conditions)
            status = item.get('status', {})
            labels = {'namespace': namespace, 'name': item['metadata']['name']}
            metrics.add('home_secret_ready', ready, **labels)
            metrics.add('home_secret_last_refresh_seconds', timestamp(status['refreshTime']) if status.get('refreshTime') else 0, **labels)
            # The interval is per-object, frequently 24h. Do not page all objects
            # after a hard-coded one-hour freshness threshold.
            interval = item.get('spec', {}).get('refreshInterval', '1h')
            seconds = sum(float(n) * {'s': 1, 'm': 60, 'h': 3600}[unit] for n, unit in re.findall(r'([\d.]+)([smh])', interval))
            metrics.add('home_secret_refresh_interval_seconds', seconds, **labels)
    requests = get_json(base + '/apis/certificates.k8s.io/v1/certificatesigningrequests', headers, ca)['items']
    pending, denied = [], 0
    for csr in requests:
        if not csr['spec']['username'].startswith('system:node:'):
            continue
        if csr.get('status', {}).get('certificate'):
            continue
        conditions = csr.get('status', {}).get('conditions', [])
        if any(c['type'] in ('Denied', 'Failed') and c['status'] == 'True' for c in conditions):
            denied += 1
        else:
            pending.append(max(0, time.time() - timestamp(csr['metadata']['creationTimestamp'])))
    metrics.add('home_csr_denied', denied)
    metrics.add('home_csr_oldest_pending_seconds', max(pending or [0]))


def ipv4_addresses():
    # RTM_GETADDR is read-only and needs no NET_ADMIN capability. Enumerate all
    # addresses, including the second address that Talos's L2 VIP adds to ens18.
    with socket.socket(socket.AF_NETLINK, socket.SOCK_RAW, socket.NETLINK_ROUTE) as sock:
        sock.settimeout(TIMEOUT)
        sock.bind((0, 0))
        payload = struct.pack('BBBBI', socket.AF_INET, 0, 0, 0, 0)
        sock.send(struct.pack('IHHII', 16 + len(payload), 22, 0x301, 1, 0) + payload)
        addresses = set()
        while True:
            data = sock.recv(65536)
            offset = 0
            while offset + 16 <= len(data):
                length, kind, _, sequence, _ = struct.unpack_from('IHHII', data, offset)
                if length < 16 or offset + length > len(data):
                    raise ValueError('invalid netlink message')
                if kind == 3:
                    return addresses
                if kind == 2:
                    raise ValueError('netlink error')
                if kind == 20 and sequence == 1:
                    attribute = offset + 24
                    while attribute + 4 <= offset + length:
                        size, attr_kind = struct.unpack_from('HH', data, attribute)
                        if size < 4:
                            raise ValueError('invalid address attribute')
                        if attr_kind == 2 and size == 8:
                            addresses.add(socket.inet_ntoa(data[attribute+4:attribute+8]))
                        attribute += (size + 3) & ~3
                offset += (length + 3) & ~3


def vip(target, metrics):
    metrics.add('home_vip_owned', target['address'] in ipv4_addresses(), vip=target['address'])


def unifi(target, metrics):
    headers = {'X-API-KEY': secret('unifi-api-key')}
    base = target['url'] + '/proxy/network/integration/v1/'
    # Explicitly enumerate expected devices/ports: an unused switch port being
    # down is normal, and a device removed from discovery must not recover.
    status, _, body, expires = request(base + 'sites?limit=1000', headers, target['ca'], True)
    if status != 200:
        raise ValueError('UniFi API request failed')
    metrics.add('home_api_tls_expiry_seconds', expires)
    sites = json.loads(body)['data']
    seen = {}
    for site in sites:
        devices = get_json(base + 'sites/' + site['id'] + '/devices?limit=1000', headers, target['ca'], True)['data']
        for device in devices:
            mac = device['macAddress'].lower()
            if mac not in target['devices']:
                continue
            detail = get_json(base + 'sites/' + site['id'] + '/devices/' + device['id'], headers, target['ca'], True)
            seen[mac] = detail
    if not target['devices']:
        raise ValueError('expected device inventory required')
    metrics.add('home_network_required_port_count', sum(len(d['ports']) for d in target['devices'].values()))
    for mac, expected in target['devices'].items():
        device = seen.get(mac)
        metrics.add('home_network_device_connected', bool(device and device['state'] == 'ONLINE'), device=expected['name'])
        ports = {int(p['idx']): p for p in (device or {}).get('interfaces', {}).get('ports', [])}
        for port in expected['ports']:
            metrics.add('home_network_port_up', ports.get(port, {}).get('state') == 'UP', device=expected['name'], port=str(port))


def s3(target, metrics):
    import boto3
    from botocore.config import Config
    client = boto3.client('s3', endpoint_url=target['url'], region_name='ap-northeast-1',
        aws_access_key_id=secret('s3-access-key'), aws_secret_access_key=secret('s3-secret-key'),
        config=Config(connect_timeout=TIMEOUT, read_timeout=TIMEOUT,
                      retries={'max_attempts': 1}, s3={'addressing_style': 'path'}))
    count = 0
    total = 0
    for page in client.get_paginator('list_objects_v2').paginate(Bucket=target['bucket'], Prefix=target['prefix']):
        objects = page.get('Contents', [])
        count += len(objects)
        total += sum(obj['Size'] for obj in objects)
    if not count:
        raise ValueError('backup repository missing')
    # Actual object bytes include encrypted/compressed packs and repository
    # metadata. restic stats raw-data is logical data size, not S3 usage.
    metrics.add('home_restic_repository_bytes', total, repository='nas')


COLLECTORS = {'access': access, 'mirakurun': mirakurun, 'recorder': recorder,
              'truenas': truenas, 'pbs': pbs, 'database': database, 'secrets': kubernetes,
              'vip': vip, 'unifi': unifi, 's3': s3}


def collect_once(target):
    metrics = Metrics(target)
    try:
        COLLECTORS[target['kind']](target, metrics)
        metrics.add('home_monitor_success', 1)
    except Exception:
        # Never log exceptions: drivers can include passwords/SQL/URLs.
        metrics = Metrics(target)
        metrics.add('home_monitor_success', 0)
    metrics.add('home_monitor_completed_seconds', time.time())
    return metrics.render()


def poll(target, snapshots, lock):
    while True:
        started = time.monotonic()
        rendered = collect_once(target)
        with lock:
            snapshots[target['name']] = rendered
        time.sleep(max(1, target.get('interval', 60) - (time.monotonic() - started)))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', default='/config/targets.json')
    parser.add_argument('--port', type=int, default=9810)
    args = parser.parse_args()
    targets = json.loads(Path(args.config).read_text())
    names = [t['name'] for t in targets]
    if len(names) != len(set(names)):
        raise ValueError('duplicate target names')
    snapshots, lock = {}, threading.Lock()
    for target in targets:
        threading.Thread(target=poll, args=(target, snapshots, lock), daemon=True).start()

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.path not in ('/metrics', '/healthz'):
                self.send_error(404)
                return
            with lock:
                body = (''.join(snapshots.values()) if self.path == '/metrics' else 'ok\n').encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_args):
            pass

    ThreadingHTTPServer(('0.0.0.0', args.port), Handler).serve_forever()


if __name__ == '__main__':
    main()
