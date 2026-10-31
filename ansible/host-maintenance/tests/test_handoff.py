import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import MagicMock, patch

spec = importlib.util.spec_from_file_location('handoff_agent', Path(__file__).parents[1] / 'files/maintenance-agent.py')
agent = importlib.util.module_from_spec(spec)
spec.loader.exec_module(agent)


class HandoffTests(unittest.TestCase):
    def setUp(self):
        window = patch.object(agent, 'pve_reboot_window_open', return_value=True)
        window.start()
        self.addCleanup(window.stop)
        directory = tempfile.TemporaryDirectory()
        self.addCleanup(directory.cleanup)
        self.root = Path(directory.name)
        for key, name in [('STATE', 'execution'), ('BOOT', 'boot'), ('AVAILABILITY_POLICY', 'policy')]:
            stub = patch.object(agent, key, self.root / name)
            stub.start()
            self.addCleanup(stub.stop)
        agent.BOOT.write_text('boot')
        agent.AVAILABILITY_POLICY.write_text((Path(__file__).parents[1] / 'files/availability-policy.json').read_text())
        self.pending = {'bootId': 'boot', 'executionId': 'approved'}
        agent.save(self.pending)
        response = MagicMock()
        response.__enter__.return_value.status = 200
        stub = patch.object(agent.urllib.request, 'urlopen', return_value=response)
        self.http = stub.start()
        self.addCleanup(stub.stop)

    def test_already_ready_peer_does_not_stop_local(self):
        with patch.object(agent, 'loockit_state', return_value='ready'), \
             patch.object(agent, 'availability_check') as check, patch.object(agent, 'run') as run:
            agent.handoff_loockit('pve-b550m', self.pending)
            run.assert_not_called()
            check.assert_called_once_with('pve-b550m', reboot=True)

    def test_handoff_restores_local_after_peer_ready_for_both_hosts(self):
        for host, ctid in agent.LOOCKIT_CTIDS.items():
            self.pending = {'bootId': 'boot', 'executionId': 'approved'}
            def control(*args):
                self.assertTrue(json.loads(agent.STATE.read_text())['loockitStopped'])
                return ''
            with self.subTest(host=host), patch.object(agent, 'loockit_state', side_effect=['standby', 'ready', 'ready', 'standby', 'ready']), \
                 patch.object(agent.time, 'sleep'), patch.object(agent, 'availability_check') as check, \
                 patch.object(agent, 'run', side_effect=control) as run:
                agent.handoff_loockit(host, self.pending)
                self.assertEqual(run.call_args_list[0].args, ('pct', 'exec', ctid, '--', 'docker', 'stop', '--time', '30', 'loockit'))
                self.assertEqual(run.call_args_list[1].args, ('pct', 'exec', ctid, '--', 'docker', 'start', 'loockit'))
                self.assertNotIn('loockitStopped', json.loads(agent.STATE.read_text()))
                check.assert_called_once_with(host, reboot=True)

    def test_peer_unhealthy_never_stops_local(self):
        with patch.object(agent, 'loockit_state', side_effect=['standby', agent.AvailabilityBlocked('peer offline')]), \
             patch.object(agent, 'run') as run:
            with self.assertRaisesRegex(agent.AvailabilityBlocked, 'offline'):
                agent.handoff_loockit('pve-b550m', self.pending)
            run.assert_not_called()

    def test_no_surviving_tunnel_never_stops_local(self):
        self.http.side_effect = TimeoutError
        with patch.object(agent, 'loockit_state', side_effect=['standby', 'ready', 'ready']), \
             patch.object(agent, 'run') as run:
            with self.assertRaisesRegex(agent.AvailabilityBlocked, 'Tunnel'):
                agent.handoff_loockit('pve-b550m', self.pending)
            run.assert_not_called()

    def test_timeout_restores_local_and_blocks_reboot(self):
        with patch.object(agent, 'loockit_state', side_effect=['standby', 'ready', 'ready']), \
             patch.object(agent.time, 'monotonic', side_effect=[0, 481]), patch.object(agent, 'run') as run:
            with self.assertRaisesRegex(agent.AvailabilityBlocked, '480秒'):
                agent.handoff_loockit('pve-b550m', self.pending)
            self.assertEqual(run.call_args_list[-1].args[-2:], ('start', 'loockit'))
            self.assertNotIn('loockitStopped', json.loads(agent.STATE.read_text()))

    def test_failed_stop_still_restores_local(self):
        with patch.object(agent, 'loockit_state', side_effect=['standby', 'ready', 'ready']), \
             patch.object(agent, 'run', side_effect=[subprocess.TimeoutExpired('pct', 120), '']) as run:
            with self.assertRaisesRegex(agent.AvailabilityBlocked, '停止できず'):
                agent.handoff_loockit('pve-b550m', self.pending)
            self.assertEqual(run.call_args_list[-1].args[-2:], ('start', 'loockit'))

    def test_failed_restore_keeps_marker_for_next_tick(self):
        self.pending['loockitStopped'] = True
        agent.save(self.pending)
        with patch.object(agent, 'run', side_effect=subprocess.CalledProcessError(1, 'pct')):
            with self.assertRaises(agent.AvailabilityBlocked):
                agent.restore_loockit('pve-b550m', self.pending)
        self.assertTrue(json.loads(agent.STATE.read_text())['loockitStopped'])
        with patch.object(agent, 'run'):
            agent.restore_loockit('pve-b550m', self.pending)
        self.assertNotIn('loockitStopped', json.loads(agent.STATE.read_text()))

    def test_interrupted_execution_restores_local_without_reboot_retry(self):
        self.pending['loockitStopped'] = True
        agent.save(self.pending)
        with patch.object(agent, 'replay_backups'), patch.object(agent, 'run') as run, \
             patch.object(agent, 'api') as api, patch.object(agent.subprocess, 'run') as reboot:
            agent.process({'host': 'pve-b550m'})
            self.assertEqual(run.call_args.args[-2:], ('start', 'loockit'))
            self.assertEqual(api.call_args.args[1], 'result')
            self.assertEqual(api.call_args.args[2]['outcome'], 'blocked')
            self.assertIn('中断', api.call_args.args[2]['detail'])
            reboot.assert_not_called()

    def test_read_only_preflight_never_initiates_handoff(self):
        with patch.object(agent, 'pve_healthy', return_value=True), patch.object(agent, 'pve_tasks_idle'), \
             patch.object(agent, 'availability_check'), patch.object(agent, 'handoff_loockit') as handoff:
            agent.pve_preflight('pve-b550m')
            handoff.assert_not_called()

    def test_only_approved_preflight_initiates_handoff(self):
        with patch.object(agent, 'pve_healthy', return_value=True), patch.object(agent, 'pve_tasks_idle'), \
             patch.object(agent, 'availability_check'), patch.object(agent, 'reboot_required', return_value=True), \
             patch.object(agent, 'handoff_loockit') as handoff:
            agent.pve_preflight('pve-b550m', pending=self.pending)
            handoff.assert_called_once_with('pve-b550m', self.pending)

    def test_no_claim_never_initiates_handoff(self):
        agent.STATE.unlink()
        with patch.object(agent, 'UPDATE_STATE', self.root / 'update'), patch.object(agent, 'replay_backups'), \
             patch.object(agent, 'pve_recovered', return_value=True), patch.object(agent, 'updates', return_value=(0, 'a' * 64)), \
             patch.object(agent, 'reboot_required', return_value=True), patch.object(agent, 'api', return_value=None), \
             patch.object(agent, 'handoff_loockit') as handoff, patch.object(agent, 'run') as run:
            agent.process({'host': 'pve-b550m'})
            handoff.assert_not_called()
            run.assert_not_called()

    def test_failed_handoff_reports_detail_and_never_reboots(self):
        agent.STATE.unlink()
        with patch.object(agent, 'UPDATE_STATE', self.root / 'update'), patch.object(agent, 'replay_backups'), \
             patch.object(agent, 'backup_release'), patch.object(agent, 'pve_recovered', return_value=True), \
             patch.object(agent, 'updates', return_value=(0, 'a' * 64)), \
             patch.object(agent, 'reboot_required', return_value=True), patch.object(agent, 'package_idle', return_value=True), \
             patch.object(agent, 'pve_healthy', return_value=True), patch.object(agent, 'pve_tasks_idle'), \
             patch.object(agent, 'handoff_loockit', side_effect=agent.AvailabilityBlocked('pve-x570: handoff timed out')), \
             patch.object(agent, 'api', side_effect=[{}, {'executionId': 'approved'}, {}]) as api, \
             patch.object(agent.subprocess, 'run') as reboot:
            agent.process({'host': 'pve-b550m'})
            reboot.assert_not_called()
            body = api.call_args.args[2]
            self.assertEqual(body['reason'], 'availability')
            self.assertEqual(body['detail'], 'pve-x570: handoff timed out')
            self.assertFalse(agent.STATE.exists())

    def test_no_reboot_needed_never_initiates_handoff(self):
        with patch.object(agent, 'pve_healthy', return_value=True), patch.object(agent, 'pve_tasks_idle'), \
             patch.object(agent, 'availability_check'), patch.object(agent, 'reboot_required', return_value=False), \
             patch.object(agent, 'handoff_loockit') as handoff:
            agent.pve_preflight('pve-b550m', pending=self.pending)
            handoff.assert_not_called()
