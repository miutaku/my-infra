import importlib.util
import io
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
import urllib.error
from unittest.mock import MagicMock
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('agent', Path(__file__).parents[1] / 'files/maintenance-agent.py')
agent = importlib.util.module_from_spec(spec)
spec.loader.exec_module(agent)


class AgentTests(unittest.TestCase):
    def setUp(self):
        availability = patch.object(agent, 'availability_check')
        self.availability = availability.start()
        self.addCleanup(availability.stop)

    def test_controller_requests_identify_the_agent(self):
        with patch.object(agent.API_OPENER, 'open', return_value=io.BytesIO(b'null')) as request:
            self.assertIsNone(agent.api({'controller': 'https://controller.example',
                'host': 'dev-app-server', 'token': 'test-token',
                'access_client_id': 'client-id', 'access_client_secret': 'client-secret'}, 'claim', {}))
            self.assertEqual(request.call_args.args[0].get_header('User-agent'), 'home-maintenance-agent/1.0')
            self.assertEqual(request.call_args.args[0].get_header('Cf-access-client-id'), 'client-id')
            self.assertEqual(request.call_args.args[0].get_header('Cf-access-client-secret'), 'client-secret')
            self.assertEqual(request.call_args.args[0].get_header('Authorization'), 'Bearer test-token')

    def test_access_credentials_are_required_before_sending(self):
        with patch.object(agent.API_OPENER, 'open') as request:
            with self.assertRaisesRegex(RuntimeError, 'Access credentials are required'):
                agent.api({'controller': 'https://controller.example', 'host': 'pve-x570', 'token': 'token'}, 'claim', {})
            request.assert_not_called()

    def test_redirects_cannot_forward_credentials(self):
        self.assertIsNone(agent.NoRedirect().redirect_request(None, None, 302, '', {}, 'https://other.invalid'))

    def test_simulation_fingerprint_includes_removals(self):
        with patch.object(agent, 'run', return_value='Inst package-a (2)\nRemv old-package [1]\n'):
            count, before = agent.updates()
        with patch.object(agent, 'run', return_value='Inst package-a (2)\n'):
            _, after = agent.updates()
        self.assertEqual(count, 1)
        self.assertNotEqual(before, after)

    def test_running_guests_do_not_prevent_hypervisor_reboot(self):
        def pvesh(*args):
            if '/cluster/resources' in args:
                return json.dumps([{'node': 'pve-x570', 'status': 'running'}])
            return '[]'
        with patch.object(agent, 'pve_healthy', return_value=True), \
             patch.object(agent, 'run', side_effect=pvesh):
            agent.pve_preflight('pve-x570')
        self.availability.assert_called_once_with('pve-x570', reboot=True)

    def test_backups_on_either_node_prevent_reboot(self):
        for responses in [['[{"type":"vzdump"}]'], ['[]', '[{"type":"vzdump"}]']]:
            with self.subTest(responses=responses), \
                 patch.object(agent, 'pve_healthy', return_value=True), \
                 patch.object(agent, 'run', side_effect=responses):
                with self.assertRaisesRegex(RuntimeError, 'Active PVE task'):
                    agent.pve_preflight('pve-x570')

    def test_failed_peer_or_quorum_prevents_reboot(self):
        with patch.object(agent, 'pve_healthy', return_value=False):
            with self.assertRaisesRegex(RuntimeError, 'unhealthy'):
                agent.pve_preflight('pve-x570')

    def test_no_claim_never_runs_a_destructive_command(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'boot').write_text('current-boot')
            with patch.object(agent, 'STATE', root / 'state'), patch.object(agent, 'BOOT', root / 'boot'), \
                 patch.object(agent, 'REQUIRED', root / 'required'), \
                 patch.object(agent, 'updates', return_value=(2, 'a' * 64)), \
                 patch.object(agent, 'run', return_value=''), \
                 patch.object(agent, 'package_idle', return_value=True), \
                 patch.object(agent, 'api', side_effect=[{'ok': True}, None]), \
                 patch.object(agent.subprocess, 'run') as execute:
                agent.process({'host': 'dev-app-server'})
                execute.assert_not_called()

    def test_interrupted_execution_is_never_retried(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'boot').write_text('current-boot')
            (root / 'state').write_text(json.dumps({'bootId': 'current-boot', 'executionId': 'test'}))
            with patch.object(agent, 'STATE', root / 'state'), patch.object(agent, 'BOOT', root / 'boot'), \
                 patch.object(agent, 'api') as api, patch.object(agent.subprocess, 'run') as execute:
                agent.process({'host': 'pve-x570'})
                api.assert_not_called()
                execute.assert_not_called()

    def test_blocked_preflight_reports_without_upgrading_or_rebooting(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'boot').write_text('boot')
            with patch.object(agent, 'STATE', root / 'state'), patch.object(agent, 'BOOT', root / 'boot'), \
                 patch.object(agent, 'updates', return_value=(2, 'a' * 64)), \
                 patch.object(agent, 'pve_healthy', return_value=True), \
                 patch.object(agent, 'reboot_required', return_value=True), \
                 patch.object(agent, 'pve_preflight', side_effect=RuntimeError('active backup task')), \
                 patch.object(agent, 'package_idle', return_value=True), \
                 patch.object(agent, 'api', side_effect=[{}, {'executionId': 'test', 'fingerprint': 'a' * 64}, {}]), \
                 patch.object(agent.subprocess, 'run') as execute:
                agent.process({'host': 'pve-x570'})
                execute.assert_not_called()
                self.assertFalse((root / 'state').exists())

    def test_automatic_updates_allow_running_guests_and_never_reboot(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'boot').write_text('boot')
            with patch.object(agent, 'STATE', root / 'state'), \
                 patch.object(agent, 'UPDATE_STATE', root / 'update'), \
                 patch.object(agent, 'BOOT', root / 'boot'), \
                 patch.object(agent, 'updates', return_value=(2, 'a' * 64)), \
                 patch.object(agent, 'pve_healthy', return_value=True), \
                 patch.object(agent, 'pve_tasks_idle'), \
                 patch.object(agent, 'pve_preflight') as reboot_preflight, \
                 patch.object(agent, 'reboot_required', return_value=True), \
                 patch.object(agent, 'run', return_value=''), \
                 patch.object(agent, 'api', side_effect=[{}, {'executionId': 'update'}, {}]), \
                 patch.object(agent.subprocess, 'run') as execute:
                agent.update_packages({'host': 'pve-x570'})
                execute.assert_called_once()
                self.assertEqual(execute.call_args.args[0][0], 'apt-get')
                self.assertNotIn('reboot', execute.call_args.args[0])
                reboot_preflight.assert_not_called()
                self.assertFalse((root / 'update').exists())

    def test_approved_reboot_does_not_install_packages(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'boot').write_text('boot')
            with patch.object(agent, 'STATE', root / 'state'), patch.object(agent, 'BOOT', root / 'boot'), \
                 patch.object(agent, 'updates', return_value=(2, 'a' * 64)), \
                 patch.object(agent, 'pve_healthy', return_value=True), \
                 patch.object(agent, 'package_idle', return_value=True), \
                 patch.object(agent, 'pve_preflight'), \
                 patch.object(agent, 'reboot_required', return_value=True), \
                 patch.object(agent, 'api', side_effect=[{}, {'executionId': 'reboot'}]), \
                 patch.object(agent.subprocess, 'run') as execute:
                agent.process({'host': 'pve-x570'})
                execute.assert_called_once_with(['systemctl', 'reboot'], check=True, timeout=30)


class AvailabilityTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.policy = Path(self.directory.name) / 'policy.json'
        self.policy.write_text(json.dumps({
            'required_vm_ids': [13001, 69001], 'protected_tags': ['home-k8s'],
            'storage_endpoints': ['192.0.2.20'],
            'loockit_endpoints': {'pve-x570': 'http://192.0.2.1/readyz',
                                 'pve-b550m': 'http://192.0.2.2/readyz'},
        }))
        policy = patch.object(agent, 'AVAILABILITY_POLICY', self.policy)
        policy.start()
        self.addCleanup(policy.stop)
        self.guests = [
            {'vmid': 13001, 'node': 'pve-b550m', 'status': 'running', 'tags': 'home-k8s'},
            {'vmid': 69001, 'node': 'pve-b550m', 'status': 'running'},
            {'vmid': 40000, 'node': 'pve-x570', 'status': 'running'},
        ]

    def test_ordinary_running_vm_allowed_with_protected_vms_on_peer_and_services_ready(self):
        with patch.object(agent, 'run', return_value=json.dumps(self.guests)), \
             patch.object(agent.urllib.request, 'urlopen') as http, \
             patch.object(agent.socket, 'create_connection') as tcp:
            http.return_value.__enter__.return_value.status = 200
            agent.availability_check('pve-x570', reboot=True)
            http.assert_called_once_with('http://192.0.2.2/readyz', timeout=5)
            tcp.assert_called_once_with(('192.0.2.20', 2049), timeout=5)

    def test_local_kubernetes_or_storage_vm_blocks_before_any_network_probe(self):
        for vmid in [13001, 69001]:
            guests = [dict(vm, node='pve-x570') if vm['vmid'] == vmid else vm for vm in self.guests]
            with self.subTest(vmid=vmid), patch.object(agent, 'run', return_value=json.dumps(guests)), \
                 patch.object(agent.urllib.request, 'urlopen') as http:
                with self.assertRaisesRegex(agent.AvailabilityBlocked, str(vmid)):
                    agent.availability_check('pve-x570', reboot=True)
                http.assert_not_called()

    def test_new_tagged_kubernetes_vm_is_protected_without_id_list_update(self):
        self.guests.append({'vmid': 13006, 'node': 'pve-x570', 'status': 'running', 'tags': 'home-k8s;talos'})
        with patch.object(agent, 'run', return_value=json.dumps(self.guests)):
            with self.assertRaisesRegex(agent.AvailabilityBlocked, '13006'):
                agent.availability_check('pve-x570', reboot=True)

    def test_missing_stopped_or_unknown_placement_is_denied(self):
        for guests in [self.guests[1:], [dict(self.guests[0], status='stopped'), self.guests[1]],
                       [dict(self.guests[0], node=None), self.guests[1]]]:
            with self.subTest(guests=guests), patch.object(agent, 'run', return_value=json.dumps(guests)):
                with self.assertRaises(agent.AvailabilityBlocked):
                    agent.availability_check('pve-x570', reboot=True)

    def test_peer_loockit_not_ready_or_nfs_unreachable_denies_reboot(self):
        with patch.object(agent, 'run', return_value=json.dumps(self.guests)), \
             patch.object(agent.urllib.request, 'urlopen') as http, \
             patch.object(agent.socket, 'create_connection', side_effect=TimeoutError):
            http.return_value.__enter__.return_value.status = 503
            with self.assertRaises(agent.AvailabilityBlocked):
                agent.availability_check('pve-x570', reboot=True)
            http.return_value.__enter__.return_value.status = 200
            with self.assertRaises(agent.AvailabilityBlocked):
                agent.availability_check('pve-x570', reboot=True)

    def test_missing_policy_denies_reboot(self):
        self.policy.unlink()
        with self.assertRaises(agent.AvailabilityBlocked):
            agent.availability_check('pve-x570', reboot=True)

    def test_recovery_checks_both_loockit_instances_even_with_local_critical_vms(self):
        self.guests[0]['node'] = 'pve-x570'
        with patch.object(agent, 'pve_healthy', return_value=True), \
             patch.object(agent, 'run', return_value=json.dumps(self.guests)), \
             patch.object(agent.urllib.request, 'urlopen') as http, \
             patch.object(agent.socket, 'create_connection'):
            response = MagicMock()
            response.__enter__.return_value.status = 200
            standby = urllib.error.HTTPError('http://standby/readyz', 503, 'standby', {},
                                             io.BytesIO(b'{"detail":"standby replica"}'))
            http.side_effect = [response, standby, response, response]
            self.assertTrue(agent.pve_recovered('pve-x570'))
            self.assertEqual(http.call_count, 4)
            http.side_effect = None
            http.return_value.__enter__.return_value.status = 503
            self.assertFalse(agent.pve_recovered('pve-x570'))

    def test_recovery_does_not_accept_two_active_leaders(self):
        with patch.object(agent, 'pve_healthy', return_value=True), \
             patch.object(agent, 'run', return_value=json.dumps(self.guests)), \
             patch.object(agent.urllib.request, 'urlopen') as http:
            http.return_value.__enter__.return_value.status = 200
            self.assertFalse(agent.pve_recovered('pve-x570'))


if __name__ == '__main__':
    unittest.main()
