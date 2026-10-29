import contextlib
import datetime
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('queued_agent', Path(__file__).parents[1] / 'files/maintenance-agent.py')
agent = importlib.util.module_from_spec(spec)
spec.loader.exec_module(agent)


class UpdateQueueTests(unittest.TestCase):
    def setUp(self):
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)
        root = Path(self.folder.name)
        self.stack = contextlib.ExitStack()
        self.addCleanup(self.stack.close)
        for name in ['STATE', 'UPDATE_STATE', 'BOOT']:
            self.stack.enter_context(patch.object(agent, name, root / name))
        agent.BOOT.write_text('boot')
        for name, result in [('pve_healthy', True), ('pve_recovered', True), ('package_idle', True),
                             ('reboot_required', True), ('pve_reboot_window_open', True),
                             ('updates', (2, 'a' * 64))]:
            self.stack.enter_context(patch.object(agent, name, return_value=result))
        for name in ['pve_tasks_idle', 'pve_preflight', 'replay_backups', 'prepare_backups', 'backup_release']:
            self.stack.enter_context(patch.object(agent, name))
        self.commands = self.stack.enter_context(patch.object(agent, 'run', return_value=''))
        self.execute = self.stack.enter_context(patch.object(agent.subprocess, 'run'))
        self.ready, self.allow_reboot, self.endpoints = False, False, []
        self.stack.enter_context(patch.object(agent, 'api', side_effect=self.api))
        self.config = {'host': 'pve-b550m'}

    def api(self, _config, endpoint, _data):
        self.endpoints.append(endpoint)
        if endpoint == 'update-claim':
            return {'executionId': 'update'} if self.ready else None
        if endpoint == 'claim':
            return {'executionId': 'reboot'} if self.allow_reboot else None
        return {}

    def test_denied_update_persists_and_retries_without_refreshing_or_rebooting(self):
        agent.update_packages(self.config)
        self.assertTrue(agent.update_request().exists())
        self.execute.assert_not_called()
        self.ready = True
        agent.update_packages(self.config, refresh=False)
        self.execute.assert_called_once()
        self.assertEqual(self.execute.call_args.args[0][0], 'apt-get')
        self.assertNotIn('reboot', self.execute.call_args.args[0])
        self.commands.assert_called_once_with('apt-get', 'update')
        self.assertFalse(agent.update_request().exists())
        self.assertFalse(agent.UPDATE_STATE.exists())

    def test_pending_request_is_resumed_by_the_minute_agent_when_no_reboot_is_approved(self):
        agent.save({'queuedAt': 1}, agent.update_request())
        with patch.object(agent, 'update_packages') as update:
            agent.process(self.config)
        update.assert_called_once_with(self.config, refresh=False)
        self.assertIn('claim', self.endpoints)
        self.execute.assert_not_called()

    def test_busy_tasks_keep_the_request_and_do_not_request_execution(self):
        with patch.object(agent, 'pve_tasks_idle', side_effect=RuntimeError('vzdump')):
            agent.update_packages(self.config)
        self.assertTrue(agent.update_request().exists())
        self.assertNotIn('update-claim', self.endpoints)
        self.execute.assert_not_called()

    def test_no_upgrades_clears_the_request_without_claiming(self):
        with patch.object(agent, 'updates', return_value=(0, 'a' * 64)):
            agent.update_packages(self.config)
        self.assertFalse(agent.update_request().exists())
        self.assertNotIn('update-claim', self.endpoints)
        self.execute.assert_not_called()

    def test_failed_update_journal_prevents_automatic_reexecution(self):
        agent.save({'executionId': 'failed', 'outcome': 'failed'}, agent.UPDATE_STATE)
        agent.save({'queuedAt': 1}, agent.update_request())
        agent.process(self.config)
        self.assertTrue(agent.UPDATE_STATE.exists())
        self.assertNotIn('update-claim', self.endpoints)
        self.execute.assert_not_called()

    def test_crossing_midnight_during_preflight_holds_without_reboot(self):
        self.allow_reboot = True
        with patch.object(agent, 'pve_reboot_window_open', side_effect=[True, False]):
            agent.process(self.config)
        self.assertIn('result', self.endpoints)
        self.execute.assert_not_called()
        agent.backup_release.assert_called_once_with('reboot')


class RebootWindowTests(unittest.TestCase):
    def test_evening_window_is_enforced_in_japan_time(self):
        for hour, allowed in [(0, False), (5, False), (19, False), (20, True), (23, True)]:
            instant = datetime.datetime(2026, 10, 29, hour, tzinfo=datetime.timezone(datetime.timedelta(hours=9))).timestamp()
            with self.subTest(hour=hour), patch.object(agent.time, 'time', return_value=instant):
                self.assertEqual(agent.pve_reboot_window_open(), allowed)
