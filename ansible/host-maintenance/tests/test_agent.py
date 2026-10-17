import importlib.util
import io
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('agent', Path(__file__).parents[1] / 'files/maintenance-agent.py')
agent = importlib.util.module_from_spec(spec)
spec.loader.exec_module(agent)


class AgentTests(unittest.TestCase):
    def test_controller_requests_identify_the_agent(self):
        with patch.object(agent.urllib.request, 'urlopen', return_value=io.BytesIO(b'null')) as request:
            self.assertIsNone(agent.api({'controller': 'https://controller.example',
                'host': 'dev-app-server', 'token': 'test-token'}, 'claim', {}))
            self.assertEqual(request.call_args.args[0].get_header('User-agent'), 'home-maintenance-agent/1.0')

    def test_simulation_fingerprint_includes_removals(self):
        with patch.object(agent, 'run', return_value='Inst package-a (2)\nRemv old-package [1]\n'):
            count, before = agent.updates()
        with patch.object(agent, 'run', return_value='Inst package-a (2)\n'):
            _, after = agent.updates()
        self.assertEqual(count, 1)
        self.assertNotEqual(before, after)

    def test_active_guest_prevents_hypervisor_reboot(self):
        with patch.object(agent, 'pve_healthy', return_value=True), \
             patch.object(agent, 'run', return_value=json.dumps([{'node': 'pve-x570', 'status': 'running'}])):
            with self.assertRaisesRegex(RuntimeError, 'Guests'):
                agent.pve_preflight('pve-x570')

    def test_backups_on_either_node_prevent_reboot(self):
        responses = ['[]', '[]', '[{"type":"vzdump"}]']
        with patch.object(agent, 'pve_healthy', return_value=True), \
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
                 patch.object(agent, 'pve_preflight', side_effect=RuntimeError('guests active')), \
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


if __name__ == '__main__':
    unittest.main()
