#!/usr/bin/env python3
"""Safety tests for the Re:Venter alert handover, without network access."""
import copy
import importlib.util
import json
import io
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('reconcile', Path(__file__).with_name('reconcile-reventer-grafana.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
CAT = json.loads(m.CATALOG.read_text())


class Fake:
    def __init__(self, sources=None, rules=None):
        self.sources = sources or {}
        self.rules = rules or []
        self.writes = []

    def request(self, method, path, body=None):
        if method == 'GET':
            if path == m.RULES:
                return copy.deepcopy(self.rules)
            return copy.deepcopy(self.sources[path.rsplit('/', 1)[-1]])
        self.writes.append((method, path, copy.deepcopy(body)))
        return body


class Safety(unittest.TestCase):
    def test_catalog_routes_and_source_coverage(self):
        rules = m.build_rules(CAT)
        self.assertEqual(len(rules), 82)
        self.assertEqual(len({r['uid'] for r in rules}), 82)
        self.assertEqual(sum(r['data'][0]['datasourceUid'] == 'grafanacloud-prom' for r in rules), 14)
        for rule in rules:
            env = rule['labels']['environment']
            source = rule['data'][0]['datasourceUid']
            self.assertIn(source, ['grafanacloud-prom', CAT['environments'][env]['metrics_uid']])
            self.assertEqual(rule['execErrState'], 'Error')
            self.assertEqual(rule['notification_settings']['receiver'], CAT['receivers'][rule['labels']['severity']])
            expression = rule['data'][0]['model']['expr']
            self.assertNotIn('__CLUSTER__', expression)
            self.assertNotIn('namespace_cpu:kube_pod', expression)
            self.assertNotIn('namespace_memory:kube_pod', expression)
            self.assertNotIn('node_quantile:', expression)
        self.assertEqual(sum(e['decision'] == 'unsupported' for e in CAT['legacy']), 17)
        self.assertEqual(sum(e['kind'] == 'recording' for e in CAT['legacy']), 69)

    def test_zero_valued_firing_series_keeps_presence_semantics(self):
        rule = next(r for r in m.build_rules(CAT) if r['title'] == 'KubeNodeNotReady')
        self.assertIn('== 0', rule['data'][0]['model']['expr'])
        self.assertIn('and on(cluster)', rule['data'][0]['model']['expr'])
        self.assertEqual(rule['data'][1]['model']['expression'], 'is_number($query) || is_nan($query) || is_inf($query)')
        self.assertEqual(rule['data'][2]['model']['conditions'][0]['evaluator'], {'params': [0], 'type': 'gt'})

    def test_pdc_patch_preserves_other_options_and_secret_flags(self):
        sources = {}
        for env, config in CAT['environments'].items():
            for kind, port, typ in [('metrics',8428,'prometheus'), ('logs',9428,'victoriametrics-logs-datasource')]:
                uid = config[kind+'_uid']
                sources[uid] = {'uid': uid, 'type': typ,
                    'url': f'http://victoria-{kind}-{env}.reventer-monitoring.svc.cluster.local:{port}',
                    'basicAuth': True, 'basicAuthUser': 'existing-user',
                    'secureJsonFields': {'basicAuthPassword': True},
                    'jsonData': {'secureSocksProxyUsername': 'old', 'httpMethod': 'POST'}}
        client = Fake(sources)
        with tempfile.TemporaryDirectory() as directory:
            self.assertEqual(m.routes(client, CAT, True, Path(directory)), 4)
            for _, _, payload in client.writes:
                self.assertEqual(payload['basicAuthUser'], 'existing-user')
                self.assertEqual(payload['secureJsonFields'], {'basicAuthPassword': True})
                self.assertNotIn('secureJsonData', payload)
                self.assertEqual(payload['jsonData']['httpMethod'], 'POST')
            self.assertTrue(all(p.stat().st_mode & 0o777 == 0o600 for p in Path(directory).iterdir()))
        sources[next(iter(sources))]['url'] = 'http://wrong-host'
        with self.assertRaisesRegex(RuntimeError, 'mismatch'):
            m.routes(Fake(sources), CAT, True, Path('/unused'))

    def test_concurrent_legacy_edit_blocks_all_writes(self):
        rule = m.build_rules(CAT)[0]
        entry = {'uid':rule['uid'], 'fingerprint':m.fingerprint(rule)}
        changed = copy.deepcopy(rule)
        changed['data'][0]['model']['expr'] = 'vector(1)'
        client = Fake(rules=[changed])
        with self.assertRaisesRegex(RuntimeError, 'edited'):
            m.legacy_rules(client, {'legacy':[entry]})
        self.assertFalse(client.writes)
        rule['isPaused'] = True
        self.assertEqual(m.fingerprint(rule), entry['fingerprint'])

    def test_group_write_refuses_unrelated_rules(self):
        desired = m.build_rules(CAT)[:1]
        unrelated = desired[0] | {'uid':'user-rule'}
        client = Fake()
        with self.assertRaisesRegex(RuntimeError, 'Unexpected rule'):
            m.write_groups(client, desired, {'user-rule':unrelated})
        self.assertFalse(client.writes)

    def test_recording_condition_normalization_is_semantically_unchanged(self):
        rule = m.build_rules(CAT)[0] | {'condition':'query', 'record':{'from':'query', 'metric':'recorded'}}
        normalized = rule | {'condition':'', 'noDataState':'', 'execErrState':''}
        self.assertEqual(m.fingerprint(rule), m.fingerprint(normalized))
        normalized['record'] = {'from':'different', 'metric':'recorded'}
        self.assertNotEqual(m.fingerprint(rule), m.fingerprint(normalized))

    def test_query_order_normalization_preserves_identity_but_not_expression_edits(self):
        rule = m.build_rules(CAT)[0]
        reordered = copy.deepcopy(rule)
        reordered['data'].reverse()
        self.assertEqual(m.fingerprint(rule), m.fingerprint(reordered))
        reordered['data'][0]['model']['expression'] = 'query'
        self.assertNotEqual(m.fingerprint(rule), m.fingerprint(reordered))

    def test_alert_text_reports_measured_values_and_overcommit_excess(self):
        import re
        for template in CAT['rules']:
            for text in template['annotations'].values():
                self.assertIsNone(re.search(r'\$value\b', text))
            if template['title'] in ['KubeCPUOvercommit','KubeMemoryOvercommit']:
                self.assertIn(' - sum by', template['expression'])
                self.assertTrue(template['expression'].endswith(') > 0'))
                self.assertNotIn('control-plane', template['expression'])

    def test_pause_patch_preserves_manager_and_checks_resource_version(self):
        captured = []
        class Opener:
            def open(self, request, timeout):
                captured.append(request)
                return io.BytesIO(json.dumps({'spec':{'paused':True}, 'metadata':{'annotations':{
                    'grafana.app/managedBy':'classic-converted-prometheus'}}}).encode())
        client = m.Grafana.__new__(m.Grafana)
        client.url, client.token, client.opener = 'https://example.invalid', 'test-token', Opener()
        client.patch_pause('/owned-rule', '7', True)
        self.assertEqual(captured[0].method, 'PATCH')
        self.assertIsNone(captured[0].get_header('X-disable-provenance'))
        self.assertEqual(json.loads(captured[0].data), [
            {'op':'test', 'path':'/metadata/resourceVersion', 'value':'7'},
            {'op':'add', 'path':'/spec/paused', 'value':True}])

    def test_api_default_fields_do_not_cause_repeated_writes(self):
        rule = m.build_rules(CAT)[0]
        actual = copy.deepcopy(rule)
        actual.update(id=123, updated='server-time')
        actual['data'][0]['model']['editorMode'] = 'code'
        client = Fake()
        self.assertEqual(m.write_groups(client, [rule], {rule['uid']:actual}), 0)
        self.assertFalse(client.writes)
        actual['isPaused'] = True
        self.assertFalse(m.equivalent(actual,rule))


if __name__ == '__main__':
    unittest.main()
