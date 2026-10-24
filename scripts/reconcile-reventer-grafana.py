#!/usr/bin/env python3
"""Reconcile only the catalogued Re:Venter PDC routes and alert rules.

plan/check are read-only. stage creates paused replacements. apply validates all
queries, activates replacements, then pauses (never deletes) original rules.
restore-legacy reverses the handover without deleting either generation.
"""
import argparse
from collections import defaultdict
import copy
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import urllib.parse
import urllib.request
import urllib.error

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'terraform/grafana-cloud/reventer-catalog.json'
spec = importlib.util.spec_from_file_location('notifications', ROOT / 'scripts/grafana-notifications.py')
notifications = importlib.util.module_from_spec(spec)
spec.loader.exec_module(notifications)
RULES = '/api/v1/provisioning/alert-rules'


def fingerprint(rule):
    payload = {k: rule.get(k) for k in ['uid', 'title', 'folderUID', 'ruleGroup', 'condition',
                                      'for', 'record', 'labels', 'annotations']}
    # The App Platform normalizes recording-only condition/error fields away.
    # Recording execution uses record.from; protect that semantic identity.
    if rule.get('record'):
        payload['condition'] = rule['record']['from']
    payload['queries'] = [{
        'refId': q['refId'], 'datasourceUid': q['datasourceUid'],
        'expr': q.get('model', {}).get('expr'),
        'expression': q.get('model', {}).get('expression'),
        'conditions': q.get('model', {}).get('conditions'),
    } for q in sorted(rule['data'], key=lambda item: item['refId'])]
    return hashlib.sha256(json.dumps(payload, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def build_rules(catalog, paused=False):
    rules = []
    for env, config in catalog['environments'].items():
        for template in catalog['rules']:
            cloud = template['scope'] == 'cloud'
            uid = catalog['cloud_metrics_uid'] if cloud else config['metrics_uid']
            expr = template['expression'].replace('__CLUSTER__', config['cluster'])
            if cloud and '__CLUSTER__' not in template['expression']:
                # Do not change zero-valued results: Prometheus comparisons
                # filter firing series, then Grafana checks their presence.
                expr = '(' + expr + ') and on(cluster) (max by(cluster) (up{job="kube-state-metrics",cluster="' + config['cluster'] + '"} == 1))'
            data = []
            models = [
                ('query', uid, {'expr': expr, 'instant': True, 'range': False}, 'prometheus'),
                ('prometheus_math', '__expr__', {'expression': 'is_number($query) || is_nan($query) || is_inf($query)', 'type': 'math'}, 'math'),
                ('threshold', '__expr__', {'expression': 'prometheus_math', 'type': 'threshold',
                 'conditions': [{'evaluator': {'params': [0], 'type': 'gt'}}]}, 'threshold'),
            ]
            for ref, source, model, query_type in models:
                model.update(refId=ref, intervalMs=1000, maxDataPoints=43200,
                             datasource={'type': 'prometheus' if source != '__expr__' else '__expr__', 'uid': source})
                data.append({'refId': ref, 'datasourceUid': source, 'queryType': query_type,
                             'relativeTimeRange': {'from': 600 if ref == 'query' else 0, 'to': 0}, 'model': model})
            rules.append({
                'uid': 'rv-' + env + '-' + hashlib.sha256(template['id'].encode()).hexdigest()[:24],
                'folderUID': 'reventer-' + env, 'ruleGroup': template['group'],
                'title': template['title'], 'condition': 'threshold', 'data': data,
                'noDataState': 'OK', 'execErrState': 'Error', 'for': template['for'],
                'annotations': template['annotations'], 'isPaused': paused,
                'labels': {'scope': 'reventer', 'managed_by': 'terraform', 'environment': env,
                           'cluster': config['cluster'], 'service': 'kubernetes', 'severity': template['severity']},
                'notification_settings': {'receiver': catalog['receivers'][template['severity']],
                                          'group_by': ['grafana_folder', 'alertname', 'cluster'],
                                          'group_wait': '30s', 'group_interval': '5m', 'repeat_interval': '4h'},
            })
    return rules


def equivalent(actual, desired):
    if any(actual.get(k) != desired[k] for k in ['uid', 'folderUID', 'ruleGroup', 'title', 'condition',
            'noDataState', 'execErrState', 'for', 'annotations', 'isPaused', 'labels']):
        return False
    settings = actual.get('notification_settings') or {}
    if any(settings.get(k) != v for k, v in desired['notification_settings'].items()):
        return False
    queries = {q['refId']: q for q in actual.get('data', [])}
    if queries.keys() != {q['refId'] for q in desired['data']}:
        return False
    for query in desired['data']:
        other = queries[query['refId']]
        if any(other.get(k) != query[k] for k in ['datasourceUid', 'relativeTimeRange']):
            return False
        if any(other.get('model', {}).get(k) != v for k, v in query['model'].items()):
            return False
    return True


def legacy_rules(client, catalog):
    live = {r['uid']: r for r in client.request('GET', RULES)}
    originals = []
    for entry in catalog['legacy']:
        rule = live.get(entry['uid'])
        if rule is None or fingerprint(rule) != entry['fingerprint']:
            raise RuntimeError('Original rule missing or edited; refusing handover: ' + entry['uid'])
        originals.append(rule)
    return originals, live


def backup(directory, name, payload):
    directory.mkdir(mode=0o700, parents=True, exist_ok=True)
    path = directory / name
    if not path.exists():
        with open(path, 'x', opener=lambda name, flags: os.open(name, flags, 0o600)) as stream:
            json.dump(payload, stream, indent=2)


def routes(client, catalog, apply=False, backup_dir=None):
    changed = 0
    for env, config in catalog['environments'].items():
        for kind, port, expected_type in [('metrics', 8428, 'prometheus'), ('logs', 9428, 'victoriametrics-logs-datasource')]:
            uid = config[kind + '_uid']
            path = '/api/datasources/uid/' + uid
            source = client.request('GET', path)
            expected_url = f'http://victoria-{kind}-{env}.reventer-monitoring.svc.cluster.local:{port}'
            if source['uid'] != uid or source['type'] != expected_type or source['url'].rstrip('/') != expected_url:
                raise RuntimeError('Data source identity/type/URL mismatch: ' + uid)
            if source.get('jsonData', {}).get('secureSocksProxyUsername') == config['pdc_network']:
                continue
            changed += 1
            if apply:
                backup(backup_dir, 'datasource-' + uid + '.json', source)
                payload = copy.deepcopy(source)
                payload.setdefault('jsonData', {})['secureSocksProxyUsername'] = config['pdc_network']
                # secureJsonFields flags are not credentials. Omitting secureJsonData
                # preserves Grafana's stored secrets; never set empty secret values.
                payload.pop('secureJsonData', None)
                client.request('PUT', path, payload)
    return changed


def query(client, uid, expression):
    response = client.request('GET', '/api/datasources/proxy/uid/' + uid + '/api/v1/query?' +
                              urllib.parse.urlencode({'query': expression}))
    if response.get('status') != 'success':
        raise RuntimeError('Prometheus query unsuccessful: ' + uid)
    return response['data']['result']


def validate_queries(client, catalog, desired):
    for env, config in catalog['environments'].items():
        rows = query(client, config['metrics_uid'], 'count by(env,cluster) (up)')
        if not rows or any(r['metric'] != {'env': env, 'cluster': config['cluster']} for r in rows):
            raise RuntimeError('PDC metrics environment mismatch: ' + env)
        response = client.request('GET', '/api/datasources/proxy/uid/' + config['logs_uid'] +
                                  '/select/logsql/stats_query?' + urllib.parse.urlencode({
                                      'query': '* | stats by (env) count() as lines', 'start': '-1h'}))
        log_rows = response.get('data', {}).get('result', [])
        if response.get('status') != 'success' or not log_rows or any(
                r['metric'].get('env') != env or float(r['value'][1]) <= 0 for r in log_rows):
            raise RuntimeError('PDC logs environment mismatch or no recent logs: ' + env)
    firing = []
    for rule in desired:
        raw = rule['data'][0]
        rows = query(client, raw['datasourceUid'], raw['model']['expr'])
        if rows:
            firing.append({'environment': rule['labels']['environment'], 'title': rule['title'], 'series': len(rows)})
    print(json.dumps({'queries_validated': len(desired), 'currently_matching_conditions': firing}), flush=True)


def write_groups(client, desired, live):
    grouped = defaultdict(list)
    for rule in desired:
        grouped[(rule['folderUID'], rule['ruleGroup'])].append(rule)
    changes = 0
    for (folder, group), rules in grouped.items():
        if all(r['uid'] in live and equivalent(live[r['uid']], r) for r in rules):
            continue
        owned = {r['uid'] for r in rules}
        # Group PUT replaces its entire contents. Never erase unexpected rules.
        if any(r['folderUID'] == folder and r['ruleGroup'] == group and r['uid'] not in owned for r in live.values()):
            raise RuntimeError('Unexpected rule in managed group: ' + folder + '/' + group)
        client.request('PUT', '/api/v1/provisioning/folder/' + folder + '/rule-groups/' + urllib.parse.quote(group, safe=''),
                       {'title': group, 'folderUid': folder, 'interval': 60, 'rules': rules})
        changes += 1
    return changes


class Grafana(notifications.Grafana):
    def patch_pause(self, path, version, paused):
        # Keep converted_prometheus management. Provisioning PUT changes the
        # provenance and returns 409; this patch changes only spec.paused.
        body = [{'op': 'test', 'path': '/metadata/resourceVersion', 'value': version},
                {'op': 'add', 'path': '/spec/paused', 'value': paused}]
        request = urllib.request.Request(self.url + path, method='PATCH',
            headers={'Authorization': 'Bearer ' + self.token, 'Content-Type': 'application/json-patch+json'},
            data=json.dumps(body).encode())
        try:
            with self.opener.open(request, timeout=45) as response:
                result = json.load(response)
        except urllib.error.HTTPError as error:
            raise RuntimeError(f'Pause patch failed: HTTP {error.code}; originals may have changed.') from None
        except urllib.error.URLError:
            raise RuntimeError('Pause patch connection failed; retry after checking state.') from None
        if result.get('spec', {}).get('paused', False) != paused or result.get('metadata', {}).get('annotations', {}).get('grafana.app/managedBy') != 'classic-converted-prometheus':
            raise RuntimeError('Pause patch verification failed.')


def pause_originals(client, catalog, paused):
    namespace = catalog['api_namespace']
    base = '/apis/rules.alerting.grafana.app/v0alpha1/namespaces/' + namespace + '/'
    objects = {}
    for kind in ['recordingrules', 'alertrules']:
        response = client.request('GET', base + kind)
        for item in response.get('items', []):
            objects[item['metadata']['name']] = (base + kind + '/' + item['metadata']['name'], item)
        if response.get('metadata', {}).get('continue'):
            raise RuntimeError('Unexpected paginated rule list; refusing partial handover.')
    # Validate fingerprints after taking versioned snapshots. A concurrent edit
    # after either snapshot is rejected by the patch resourceVersion test.
    originals, _ = legacy_rules(client, catalog)
    entries = {e['uid']: e for e in catalog['legacy']}
    changes = 0
    for rule in originals:
        target = paused if paused else entries[rule['uid']]['was_paused']
        if rule.get('isPaused', False) == target:
            continue
        path, item = objects[rule['uid']]
        metadata = item['metadata']
        if metadata['namespace'] != namespace or metadata.get('annotations', {}).get('grafana.app/managedBy') != 'classic-converted-prometheus' or metadata.get('labels', {}).get('grafana.app/folder') != catalog['legacy_folder_uid']:
            raise RuntimeError('Legacy management identity mismatch: ' + rule['uid'])
        client.patch_pause(path, metadata['resourceVersion'], target)
        changes += 1
    return changes


def reconcile(client, catalog, command, backup_dir):
    originals, live = legacy_rules(client, catalog)
    desired = build_rules(catalog)
    if command == 'plan':
        return {'pdc_route_changes': routes(client, catalog), 'desired_alerts': len(desired),
                'replacement_rule_changes': sum(r['uid'] not in live or not equivalent(live[r['uid']], r) for r in desired),
                'originals_to_pause': sum(not r.get('isPaused', False) for r in originals)}
    if command == 'check':
        if routes(client, catalog) or any(not r.get('isPaused') for r in originals):
            raise RuntimeError('PDC or legacy pause drift detected.')
        if any(r['uid'] not in live or not equivalent(live[r['uid']], r) for r in desired):
            raise RuntimeError('Replacement rule drift detected.')
        validate_queries(client, catalog, desired)
        return {'verified_active_rules': len(desired), 'verified_paused_originals': len(originals), 'pdc_routes': 4}
    backup(backup_dir, 'legacy-rules.json', originals)
    if command == 'restore-legacy':
        # Restore original generation first; pause replacements only afterwards.
        restored = pause_originals(client, catalog, False)
        replacements = [r | {'isPaused': True} for r in desired if r['uid'] in live]
        write_groups(client, replacements, live)
        return {'restored_originals': restored, 'paused_replacements': len(replacements)}
    route_changes = routes(client, catalog, True, backup_dir)
    validate_queries(client, catalog, desired)
    folders = {f['uid']: f for f in client.request('GET', '/api/folders?limit=1000')}
    for env in catalog['environments']:
        uid, title = 'reventer-' + env, 'Re:Venter / ' + env.upper()
        if uid not in folders:
            client.request('POST', '/api/folders', {'uid': uid, 'title': title})
        elif folders[uid]['title'] != title:
            raise RuntimeError('Managed folder title mismatch: ' + uid)
    if command == 'stage':
        # Never accidentally pause already active replacements on a repeated stage.
        staged = [r | {'isPaused': live.get(r['uid'], {}).get('isPaused', True)} for r in desired]
        changed = write_groups(client, staged, live)
        return {'staged_rules': len(staged), 'changed_groups': changed, 'pdc_route_changes': route_changes}
    # Stage missing rules first; existing active replacements stay active.
    staged = [r | {'isPaused': live.get(r['uid'], {}).get('isPaused', True)} for r in desired]
    write_groups(client, staged, live)
    _, staged_live = legacy_rules(client, catalog)
    if any(r['uid'] not in staged_live or not equivalent(staged_live[r['uid']], r) for r in staged):
        raise RuntimeError('Staged configuration verification failed; originals remain active.')
    write_groups(client, desired, staged_live)
    _, active_live = legacy_rules(client, catalog)
    if any(r['uid'] not in active_live or not equivalent(active_live[r['uid']], r) for r in desired):
        raise RuntimeError('Activation verification failed; originals remain active.')
    paused = pause_originals(client, catalog, True)
    return {'active_rules': len(desired), 'originals_paused': paused, 'pdc_route_changes': route_changes}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['plan', 'stage', 'apply', 'check', 'restore-legacy'])
    parser.add_argument('--backup-dir', type=Path, default=ROOT / 'terraform/grafana-cloud/.state/reventer-backup')
    args = parser.parse_args()
    print(json.dumps(reconcile(Grafana(), json.loads(CATALOG.read_text()), args.command, args.backup_dir)))


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, ValueError, KeyError) as error:
        raise SystemExit(str(error)) from None
