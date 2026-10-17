import json
from pathlib import Path
import ssl
from types import SimpleNamespace
import unittest
from unittest.mock import patch, MagicMock

import monitor


class AccessTests(unittest.TestCase):
    target = {'kind': 'access', 'name': 'public', 'url': 'https://service.example/health', 'expect': '^healthy$'}
    denied = (302, {'location': 'https://team.cloudflareaccess.com/cdn-cgi/access/login/aud'}, b'', 12345)

    def probe(self, response, denied=None):
        metrics = monitor.Metrics(self.target)
        with patch.object(monitor, 'secret', return_value='secret'), patch.object(monitor, 'request', side_effect=[response, denied or self.denied]) as requests:
            monitor.access(self.target, metrics)
        # Credentials are attached only to the authenticated request. Neither
        # redirects nor the unauthenticated control can receive those secrets.
        self.assertEqual(len(requests.call_args_list[0].args), 2)
        self.assertEqual(len(requests.call_args_list[1].args), 1)
        return {name: value for name, value, _ in metrics.samples}

    def test_authenticated_application_response(self):
        self.assertEqual(self.probe((200, {}, b'healthy', 12345))['home_access_success'], 1)

    def test_access_redirect_is_not_success(self):
        self.assertEqual(self.probe(self.denied)['home_access_success'], 0)

    def test_login_page_http_200_is_not_success(self):
        with patch.dict(self.target, {'expect': '<html'}):
            result = self.probe((200, {}, b'<html><title>Cloudflare Access</title>', 12345))
        self.assertEqual(result['home_access_success'], 0)

    def test_backend_500_is_not_success(self):
        self.assertEqual(self.probe((500, {}, b'healthy', 12345))['home_access_success'], 0)

    def test_bypassed_access_policy_is_not_success(self):
        self.assertEqual(self.probe((200, {}, b'healthy', 12345), (200, {}, b'healthy', 12345))['home_access_success'], 0)

    def test_unrelated_login_redirect_is_not_access(self):
        self.assertEqual(self.probe((200, {}, b'healthy', 12345), (302, {'location':'https://evilcloudflareaccess.com/cdn-cgi/access/login/x'}, b'', 12345))['home_access_success'], 0)

    def test_partial_failed_poll_drops_functional_samples(self):
        def failed(target, metrics):
            metrics.add('home_access_success', 1)
            raise ValueError('sensitive response must not escape')
        with patch.dict(monitor.COLLECTORS, {'access': failed}):
            rendered = monitor.collect_once(self.target)
        self.assertNotIn('home_access_success', rendered)
        self.assertNotIn('sensitive', rendered)
        self.assertIn(' 0.0', rendered)


class RecordingTests(unittest.TestCase):
    def evaluate(self, reserves=None, recordings=None, recorded=None, waiting=None):
        metrics = monitor.Metrics({'kind':'recorder', 'name':'test'})
        monitor.recorder_values(reserves or [], recordings or [], recorded or [],
                               {'waitItems': waiting or [], 'runningItems': []}, 1000, metrics)
        return {name: value for name, value, _ in metrics.samples}

    def reserve(self, **values):
        return {'channelId':1,'startAt':800000,'endAt':2000000,'isSkip':False,'isConflict':False} | values

    def test_overdue_start(self):
        self.assertEqual(self.evaluate([self.reserve()])['home_recording_not_started'], 1)

    def test_manual_recording_matches_without_program_id(self):
        self.assertEqual(self.evaluate([self.reserve()], [self.reserve()])['home_recording_not_started'], 0)

    def test_skipped_and_future_reservations_are_normal(self):
        self.assertEqual(self.evaluate([self.reserve(isSkip=True),self.reserve(startAt=1200000)])['home_recording_not_started'], 0)

    def test_recording_stopped_early(self):
        record = self.reserve(isRecording=False,videoFiles=[{'size':1000}])
        self.assertEqual(self.evaluate(recorded=[record])['home_recording_interrupted'], 1)

    def test_encoding_wait_age_uses_recording_end(self):
        self.assertEqual(self.evaluate(waiting=[{'recorded':{'endAt':600000}}])['home_encode_oldest_recording_age_seconds'], 400)

    def test_empty_queue_is_normal(self):
        self.assertEqual(self.evaluate()['home_encode_oldest_recording_age_seconds'], 0)

    def test_pagination_does_not_drop_reservations(self):
        with patch.object(monitor, 'get_json', side_effect=[{'reserves':[{'id':1}],'total':2},{'reserves':[{'id':2}],'total':2}]):
            self.assertEqual(len(monitor.pages('http://service/api/reserves', 'reserves')), 2)

    def test_truncated_api_response_fails(self):
        with patch.object(monitor, 'get_json', return_value={'reserves':[],'total':5}):
            with self.assertRaises(ValueError):
                monitor.pages('http://service/api/reserves', 'reserves')


class KubernetesTests(unittest.TestCase):
    def test_transient_read_failure_retries_once_without_changing_inventory(self):
        inventory = {'items': [{'status': {'conditions': [{'type': 'Ready', 'status': 'False'}]}}]}
        for error in [TimeoutError(), ConnectionResetError(), monitor.HTTPStatusError(503), monitor.HTTPStatusError(429)]:
            with self.subTest(error=type(error).__name__), \
                    patch.object(monitor, 'get_json', side_effect=[error, inventory]) as get, \
                    patch.object(monitor.time, 'sleep') as sleep:
                self.assertEqual(monitor.kubernetes_get_json('https://kubernetes.default.svc/api', {}, 'ca.pem'), inventory)
                self.assertEqual(get.call_count, 2)
                sleep.assert_called_once_with(0.25)

    def test_persistent_timeout_fails_after_two_attempts(self):
        with patch.object(monitor, 'get_json', side_effect=TimeoutError()) as get, \
                patch.object(monitor.time, 'sleep'):
            with self.assertRaises(TimeoutError):
                monitor.kubernetes_get_json('https://kubernetes.default.svc/api', {}, 'ca.pem')
            self.assertEqual(get.call_count, 2)

    def test_auth_tls_and_invalid_data_fail_without_retry(self):
        for error in [monitor.HTTPStatusError(401), monitor.HTTPStatusError(403),
                      ssl.SSLCertVerificationError(), json.JSONDecodeError('invalid', '', 0)]:
            with self.subTest(error=type(error).__name__), \
                    patch.object(monitor, 'get_json', side_effect=error) as get, \
                    patch.object(monitor.time, 'sleep') as sleep:
                with self.assertRaises(type(error)):
                    monitor.kubernetes_get_json('https://kubernetes.default.svc/api', {}, 'ca.pem')
                get.assert_called_once()
                sleep.assert_not_called()

    def evaluate(self, items):
        target = {'kind':'secrets','name':'home-secrets','namespaces':['monitoring'],
                  'expected':{'monitoring':['db-credentials']}}
        metrics = monitor.Metrics(target)
        with patch.object(monitor.Path,'read_text',return_value='test-token'), \
                patch.object(monitor,'get_json',side_effect=[{'items':items},{'items':[]}]):
            monitor.kubernetes(target,metrics)
        return metrics.samples

    def test_secret_name_label_and_daily_refresh_interval(self):
        samples = self.evaluate([{'metadata':{'name':'db-credentials'},
            'spec':{'refreshInterval':'24h'},
            'status':{'conditions':[{'type':'Ready','status':'True'}],
                      'refreshTime':'2026-10-18T00:00:00Z'}}])
        ready = next((v,l) for n,v,l in samples if n=='home_secret_ready')
        self.assertEqual(ready[0],1)
        self.assertEqual(ready[1]['name'],'db-credentials')
        self.assertEqual(next(v for n,v,_ in samples if n=='home_secret_refresh_interval_seconds'),86400)

    def test_missing_expected_secret_stays_not_ready(self):
        samples = self.evaluate([])
        self.assertEqual(next(v for n,v,_ in samples if n=='home_secret_ready'),0)
        self.assertEqual(next(l['name'] for n,_,l in samples if n=='home_secret_ready'),'db-credentials')


class TrueNASTests(unittest.TestCase):
    def target(self, protocol='ddp'):
        return {'name':'nas', 'kind':'truenas', 'url':'wss://nas/websocket',
                'ca':'leaf.pem', 'credential':'nas-key', 'protocol':protocol}

    def connection(self):
        connection = MagicMock()
        connection.handshake_response.status = 101
        connection.sock.getpeercert.return_value = {'notAfter':'Oct 18 00:00:00 2027 GMT'}
        return connection

    def test_both_protocols_collect_only_allowed_methods(self):
        pool = {'name':'data','healthy':True,'status':'ONLINE','allocated':10,'size':100,
                'scan':{'function':'SCRUB','state':'FINISHED','end_time':1000,'errors':0}}
        for protocol in ['ddp','jsonrpc']:
            with self.subTest(protocol=protocol):
                connection = self.connection()
                replies = [{'id':str(i) if protocol=='ddp' else i,'result':v}
                           for i,v in enumerate([True,[pool],[]],1)]
                if protocol=='ddp':replies.insert(0,{'msg':'connected'})
                connection.recv.side_effect = [json.dumps(r) for r in replies]
                websocket = SimpleNamespace(create_connection=MagicMock(return_value=connection))
                target = self.target(protocol)
                metrics = monitor.Metrics(target)
                with patch.dict('sys.modules', {'websocket':websocket}), patch.object(monitor,'verify_leaf'), patch.object(monitor,'secret',return_value='test-key'):
                    monitor.truenas(target,metrics)
                messages = [json.loads(c.args[0]) for c in connection.send.call_args_list]
                self.assertEqual([m['method'] for m in messages if 'method' in m],
                                 ['auth.login_with_api_key','pool.query','alert.list'])
                values = {n:v for n,v,_ in metrics.samples}
                self.assertEqual(values['home_nas_pool_healthy'],1)
                self.assertEqual(values['home_nas_pool_used_ratio'],0.1)
                connection.close.assert_called_once()

    def test_redirect_never_receives_api_key(self):
        connection = self.connection()
        connection.handshake_response.status = 302
        websocket = SimpleNamespace(create_connection=MagicMock(return_value=connection))
        with patch.dict('sys.modules', {'websocket':websocket}), patch.object(monitor,'verify_leaf'), patch.object(monitor,'secret') as secret:
            with self.assertRaises(ValueError):
                monitor.truenas(self.target(),monitor.Metrics(self.target()))
        secret.assert_not_called()
        connection.send.assert_not_called()
        connection.close.assert_called_once()

    def test_changed_certificate_never_receives_api_key(self):
        connection = self.connection()
        websocket = SimpleNamespace(create_connection=MagicMock(return_value=connection))
        with patch.dict('sys.modules', {'websocket':websocket}), patch.object(monitor,'verify_leaf',side_effect=ssl.SSLError()), patch.object(monitor,'secret') as secret:
            with self.assertRaises(ssl.SSLError):
                monitor.truenas(self.target(),monitor.Metrics(self.target()))
        secret.assert_not_called()
        connection.send.assert_not_called()


class BackupTests(unittest.TestCase):
    def test_expected_vm_missing_is_explicit_zero(self):
        metrics = monitor.Metrics({'kind':'pbs','name':'pbs'})
        monitor.pbs_values([], ['100'], metrics)
        values = {name: value for name, value, _ in metrics.samples}
        self.assertEqual(values['home_pbs_backup_last_success_seconds'], 0)
        self.assertEqual(values['home_pbs_last_verified_backup_seconds'], 0)

    def test_new_unverified_snapshot_retains_last_verified_backup(self):
        metrics = monitor.Metrics({'kind':'pbs','name':'pbs'})
        monitor.pbs_values([
            {'backup-type':'vm','backup-id':'100','backup-time':100,'files':[{'filename':'index.json.blob'}],'verification':{'state':'ok'}},
            {'backup-type':'vm','backup-id':'100','backup-time':200,'files':[{'filename':'index.json.blob'}]},
        ], ['100'], metrics)
        values = {name: value for name, value, _ in metrics.samples}
        self.assertEqual(values['home_pbs_backup_last_success_seconds'], 200)
        self.assertEqual(values['home_pbs_last_verified_backup_seconds'], 100)

    def test_corrupt_retained_snapshot_is_not_hidden_by_new_backup(self):
        metrics = monitor.Metrics({'kind':'pbs','name':'pbs'})
        monitor.pbs_values([
            {'backup-type':'vm','backup-id':'100','backup-time':100,'files':[{'filename':'index.json.blob'}],'verification':{'state':'failed'}},
            {'backup-type':'vm','backup-id':'100','backup-time':200,'files':[{'filename':'index.json.blob'}],'verification':{'state':'ok'}},
        ], ['100'], metrics)
        values = {name: value for name, value, _ in metrics.samples}
        self.assertEqual(values['home_pbs_verification_failed'], 1)

    def test_unfinished_snapshot_does_not_refresh_success(self):
        metrics = monitor.Metrics({'kind':'pbs','name':'pbs'})
        monitor.pbs_values([
            {'backup-type':'vm','backup-id':'100','backup-time':100,'files':[{'filename':'index.json.blob'}]},
            {'backup-type':'vm','backup-id':'100','backup-time':200,'files':[{'filename':'drive-scsi0.img.fidx'}]},
        ], ['100'], metrics)
        values = {name: value for name, value, _ in metrics.samples}
        self.assertEqual(values['home_pbs_backup_last_success_seconds'], 100)


class CertificateTests(unittest.TestCase):
    def test_wrong_pinned_leaf_never_receives_credentials(self):
        connection = MagicMock()
        connection.sock.getpeercert.return_value = b'wrong leaf'
        with patch.object(monitor, 'pinned_context'), patch.object(monitor.http.client, 'HTTPSConnection', return_value=connection), \
                patch.object(monitor.Path, 'read_text', return_value='certificate'), patch.object(monitor.ssl, 'PEM_cert_to_DER_cert', return_value=b'expected leaf'):
            with self.assertRaises(ssl.SSLError):
                monitor.request('https://appliance/', {'Authorization':'secret'}, 'leaf.pem', True)
        connection.request.assert_not_called()
        connection.close.assert_called_once()

    def test_plaintext_credentials_are_rejected(self):
        with self.assertRaises(ValueError):
            monitor.request('http://appliance/', {'Authorization':'secret'})


class MirakurunTests(unittest.TestCase):
    def test_each_tv_service_keeps_its_own_freshness(self):
        target = {'kind':'mirakurun','name':'mirakurun','url':'http://mirakurun'}
        metrics = monitor.Metrics(target)
        with patch.object(monitor, 'get_json', side_effect=[
            [{'name':'tuner','isAvailable':True,'isFault':False}],
            [{'id':1,'type':1,'epgReady':True,'epgUpdatedAt':1000000},
             {'id':2,'type':1,'epgReady':False,'epgUpdatedAt':1000},
             {'id':3,'type':192}],
        ]) as get:
            monitor.mirakurun(target, metrics)
        self.assertEqual(get.call_count, 2)
        updates = [(value, labels['service_id']) for name, value, labels in metrics.samples if name == 'home_epg_last_update_seconds']
        self.assertEqual(updates, [(1000, '1'), (1, '2')])


class NetworkTests(unittest.TestCase):
    def test_only_required_ports_are_checked_and_removed_port_fails(self):
        target = {'kind':'unifi','name':'network','url':'https://unifi','ca':'leaf.pem',
                  'devices': {'aa:bb': {'name':'switch','ports':[1,7,8]}}}
        metrics = monitor.Metrics(target)
        with patch.object(monitor, 'secret', return_value='secret'), patch.object(monitor, 'request', return_value=(200,{},b'{"data":[{"id":"site"}]}',999999)), \
                patch.object(monitor, 'get_json', side_effect=[
                    {'data':[{'id':'device','macAddress':'aa:bb'}]},
                    {'state':'ONLINE','interfaces':{'ports':[{'idx':1,'state':'UP'},{'idx':2,'state':'DOWN'},{'idx':7,'state':'UP'}]}},
                ]):
            monitor.unifi(target, metrics)
        ports = [(labels['port'],value) for name,value,labels in metrics.samples if name=='home_network_port_up']
        self.assertEqual(ports, [('1',1),('7',1),('8',0)])


if __name__ == '__main__':
    unittest.main()
