import json
from pathlib import Path
import ssl
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


class TerraformCloudTests(unittest.TestCase):
    def test_apply_queue_age_does_not_include_time_waiting_for_approval(self):
        target = {'kind':'tfc','name':'tfc','workspaces':['pve-home']}
        metrics = monitor.Metrics(target)
        with patch.object(monitor, 'secret', return_value='secret'), patch.object(monitor.time, 'time', return_value=3600), \
                patch.object(monitor, 'get_json', side_effect=[
                    {'data':{'id':'ws-1'}},
                    {'data':[{'attributes':{'status':'apply_queued','created-at':'1970-01-01T00:00:00Z',
                                           'status-timestamps':{'confirmed-at':'1970-01-01T00:50:00Z'}}}], 'links':{'next':None}},
                ]):
            monitor.tfc(target, metrics)
        value = next(v for n,v,_ in metrics.samples if n=='home_tfc_oldest_queued_seconds')
        self.assertEqual(value, 600)

    def test_pagination_cannot_forward_token_to_another_host(self):
        target = {'kind':'tfc','name':'tfc','workspaces':['pve-home']}
        metrics = monitor.Metrics(target)
        with patch.object(monitor, 'secret', return_value='secret'), patch.object(monitor, 'get_json', side_effect=[
            {'data':{'id':'ws-1'}}, {'data':[], 'links':{'next':'https://untrusted.example/steal'}},
        ]) as get:
            with self.assertRaises(ValueError):
                monitor.tfc(target, metrics)
        self.assertEqual(get.call_count, 2)


if __name__ == '__main__':
    unittest.main()
