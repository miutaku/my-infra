import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from datetime import datetime, timedelta


spec = importlib.util.spec_from_file_location(
    'maintenance', Path(__file__).parents[1] / 'files/dev-app-maintenance.py')
maintenance = importlib.util.module_from_spec(spec)
spec.loader.exec_module(maintenance)


class RebootGuardTests(unittest.TestCase):
    def setUp(self):
        self.target = datetime(2026, 10, 18, 5, tzinfo=maintenance.JST)
        self.plan = {'target': self.target.isoformat(), 'boot_id': 'boot-a'}

    def test_notification_targets_next_morning_across_year_boundary(self):
        evening = datetime(2026, 12, 31, 19, tzinfo=maintenance.JST)
        self.assertEqual(maintenance.target_time(evening, '05:00'),
                         datetime(2027, 1, 1, 5, tzinfo=maintenance.JST))

    def test_reboot_only_in_announced_window(self):
        for offset, expected in [(-1, False), (0, True), (14, True), (15, False),
                                 (1440, False)]:
            with self.subTest(offset=offset):
                self.assertEqual(maintenance.may_reboot(
                    self.plan, self.target + timedelta(minutes=offset),
                    'boot-a', True), expected)

    def test_no_reboot_without_notification_or_requirement(self):
        self.assertFalse(maintenance.may_reboot(None, self.target, 'boot-a', True))
        self.assertFalse(maintenance.may_reboot(self.plan, self.target, 'boot-a', False))

    def test_manual_reboot_invalidates_previous_notification(self):
        self.assertFalse(maintenance.may_reboot(self.plan, self.target, 'boot-b', True))

    def test_failed_notification_cannot_authorize_reboot(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'required').touch()
            (root / 'boot').write_text('boot-a')
            (root / 'discord-webhook').write_text('https://discord.com/api/webhooks/1/test')
            with patch.object(maintenance, 'STATE', root / 'plan'), \
                 patch.object(maintenance, 'REQUIRED', root / 'required'), \
                 patch.object(maintenance, 'BOOT_ID', root / 'boot'), \
                 patch.dict('os.environ', {'CREDENTIALS_DIRECTORY': directory}), \
                 patch('sys.argv', ['maintenance', 'notify']), \
                 patch.object(maintenance, 'send_discord', side_effect=RuntimeError):
                with self.assertRaises(RuntimeError):
                    maintenance.main()
                self.assertFalse((root / 'plan').exists())

    def test_no_required_reboot_sends_nothing_and_clears_stale_plan(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'boot').write_text('boot-a')
            (root / 'plan').write_text(json.dumps(self.plan))
            with patch.object(maintenance, 'STATE', root / 'plan'), \
                 patch.object(maintenance, 'REQUIRED', root / 'required'), \
                 patch.object(maintenance, 'BOOT_ID', root / 'boot'), \
                 patch('sys.argv', ['maintenance', 'notify']), \
                 patch.object(maintenance, 'send_discord') as send:
                maintenance.main()
                send.assert_not_called()
                self.assertFalse((root / 'plan').exists())

    def test_successful_notification_persists_plan_and_deduplicates(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'boot').write_text('boot-a')
            (root / 'required').touch()
            (root / 'discord-webhook').write_text('https://discord.com/api/webhooks/1/test')
            with patch.object(maintenance, 'STATE', root / 'plan'), \
                 patch.object(maintenance, 'REQUIRED', root / 'required'), \
                 patch.object(maintenance, 'BOOT_ID', root / 'boot'), \
                 patch.dict('os.environ', {'CREDENTIALS_DIRECTORY': directory}), \
                 patch('sys.argv', ['maintenance', 'notify']), \
                 patch.object(maintenance, 'send_discord') as send:
                maintenance.main()
                plan = json.loads((root / 'plan').read_text())
                self.assertEqual(plan['boot_id'], 'boot-a')
                self.assertIn('T05:00:00+09:00', plan['target'])
                maintenance.main()
                send.assert_called_once()

    def test_discord_failure_retries_without_exposing_secret(self):
        with patch.object(maintenance.urllib.request, 'urlopen',
                          side_effect=maintenance.urllib.error.URLError('secret-url')), \
             patch.object(maintenance.time, 'sleep'):
            with self.assertRaisesRegex(RuntimeError, '^Discord delivery failed'):
                maintenance.send_discord('https://discord.com/api/webhooks/1/test', 'test')


if __name__ == '__main__':
    unittest.main()
