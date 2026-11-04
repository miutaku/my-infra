import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

FILES = Path(__file__).resolve().parents[1] / 'files'


def load(name):
    spec = importlib.util.spec_from_file_location(name, FILES / (name + '.py'))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


tiered = load('pbs-tiered')
capacity = load('pbs-capacity-hook')


def snapshot(at=100, verified=True, protected=False, complete=True):
    return {'backup-type': 'vm', 'backup-id': '100', 'backup-time': at,
            'files': [{'filename': 'index.json.blob'}] if complete else [],
            'verification': {'state': 'ok' if verified else 'failed'}, 'protected': protected}


class SafetyTests(unittest.TestCase):
    def setUp(self):
        self.config = {'local': 'hdd', 'archive': 's3', 'sync_job': 'copy',
                       'prune_job': 'hdd-prune', 'groups': ['vm/100']}

    def test_missing_failed_stale_and_incomplete_backups_cannot_be_selected(self):
        for rows, now in [([], 100), ([snapshot(verified=False)], 100),
                          ([snapshot(complete=False)], 100), ([snapshot()], 100000)]:
            with self.subTest(rows=rows, now=now), self.assertRaises(RuntimeError):
                tiered.select_verified(rows, ['vm/100'], now)

    def test_new_unverified_generation_keeps_recent_verified_generation(self):
        self.assertEqual(tiered.select_verified([snapshot(110, verified=False), snapshot()],
                                               ['vm/100'], 120)[0]['backup-time'], 100)

    def test_incomplete_archive_copy_cannot_replace_pin(self):
        with self.assertRaises(RuntimeError):
            tiered.require_copies([snapshot()], [snapshot(complete=False)])

    def test_reverse_remote_or_deleting_sync_is_rejected(self):
        job = {'store': 's3', 'remote-store': 'hdd', 'owner': 'admin@pbs', 'verified-only': True}
        tiered.validate_sync(self.config, job)
        for change in ({'store': 'hdd'}, {'remote': 'external'}, {'remove-vanished': True},
                       {'verified-only': False}, {'sync-direction': 'push'}):
            with self.subTest(change=change), self.assertRaises(RuntimeError):
                tiered.validate_sync(self.config, job | change)

    def test_operator_protection_is_never_removed(self):
        old, new = snapshot(90, protected=True), snapshot()
        state = {'pins': []}
        with patch.object(tiered, 'set_protected') as protect, patch.object(tiered, 'save_state'):
            tiered.update_pins(self.config, state, [new], [old, new])
        self.assertEqual(protect.call_args_list, [unittest.mock.call('hdd', ('vm', '100', 100), True)])

    def test_failed_new_pin_leaves_old_pin_protected(self):
        old, new = snapshot(90, protected=True), snapshot()
        state = {'pins': [['vm', '100', 90]]}
        with patch.object(tiered, 'set_protected', side_effect=RuntimeError('failed')) as protect:
            with self.assertRaises(RuntimeError):
                tiered.update_pins(self.config, state, [new], [old, new])
        self.assertEqual(protect.call_count, 1)
        self.assertEqual(state['pins'], [['vm', '100', 90]])

    def test_snapshot_lock_conflict_is_retried_before_old_pin_is_released(self):
        old, new = snapshot(90, protected=True), snapshot()
        state = {'pins': [['vm', '100', 90]]}
        conflict = RuntimeError('while updating the protection status of snapshot')
        with patch.object(tiered, 'api', side_effect=[conflict, None, None]) as api, \
                patch.object(tiered.time, 'sleep') as sleep, \
                patch.object(tiered, 'save_state'):
            tiered.update_pins(self.config, state, [new], [old, new])
        self.assertEqual([call.args[-1] for call in api.call_args_list], ['true', 'true', 'false'])
        self.assertEqual(state['pins'], [['vm', '100', 100]])
        sleep.assert_called_once()

    def test_protection_retry_expires_with_old_pin_and_sync_state_intact(self):
        old, new = snapshot(90, protected=True), snapshot()
        state = {'pins': [['vm', '100', 90]], 'last_sync': 95, 'synced': [['vm', '100', 90]]}
        conflict = RuntimeError('while updating the protection status of snapshot')
        with patch.object(tiered, 'api', side_effect=conflict) as api, \
                patch.object(tiered.time, 'monotonic', side_effect=[0, 1, 900]), \
                patch.object(tiered.time, 'sleep') as sleep, \
                patch.object(tiered, 'save_state') as save:
            with self.assertRaisesRegex(RuntimeError, 'protection status'):
                tiered.update_pins(self.config, state, [new], [old, new])
        self.assertEqual([call.args[-1] for call in api.call_args_list], ['true', 'true'])
        self.assertEqual(state, {'pins': [['vm', '100', 90]], 'last_sync': 95,
                                 'synced': [['vm', '100', 90]]})
        sleep.assert_called_once_with(10)
        save.assert_not_called()

    def test_permission_error_is_not_retried(self):
        with patch.object(tiered, 'api', side_effect=RuntimeError('permission denied')) as api, \
                patch.object(tiered.time, 'sleep') as sleep:
            with self.assertRaisesRegex(RuntimeError, 'permission denied'):
                tiered.set_protected('hdd', ('vm', '100', 100), True)
        api.assert_called_once()
        sleep.assert_not_called()

    def test_housekeeping_requires_confirmed_copy_and_intact_protection(self):
        with patch.object(tiered, 'manager') as manager:
            tiered.housekeeping(self.config, {})
            manager.assert_not_called()
        with patch.object(tiered, 'snapshots', return_value=[snapshot()]), patch.object(tiered, 'manager') as manager:
            with self.assertRaises(RuntimeError):
                tiered.housekeeping(self.config, {'last_sync': 1, 'synced': [['vm', '100', 100]]})
            manager.assert_not_called()

    def test_verification_failure_never_starts_sync(self):
        job = {'id': 'copy', 'store': 's3', 'remote-store': 'hdd', 'owner': 'admin@pbs', 'verified-only': True}
        with patch.object(tiered, 'manager', side_effect=[[job], RuntimeError('verify failed')]) as manager:
            with self.assertRaises(RuntimeError):
                tiered.daily(self.config, {})
        self.assertEqual(manager.call_count, 2)

    def test_state_is_written_atomically_with_private_permissions(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'state.json'
            with patch.object(tiered, 'STATE', path):
                tiered.save_state({'pins': []})
            self.assertEqual(path.stat().st_mode & 0o777, 0o600)
            self.assertFalse(path.with_suffix('.tmp').exists())

    def test_capacity_hook_rejects_unavailable_full_or_host_constrained_storage(self):
        local = {'active': 1, 'enabled': 1, 'used': 205 * capacity.GIB, 'avail': 60 * capacity.GIB}
        host = {'avail': 40 * capacity.GIB}
        capacity.check(local, host)
        for change in ({'active': 0}, {'used': 330 * capacity.GIB}, {'avail': 15 * capacity.GIB}):
            with self.subTest(change=change), self.assertRaises(RuntimeError):
                capacity.check(local | change, host)
        with self.assertRaises(RuntimeError):
            capacity.check(local, {'avail': 19 * capacity.GIB})


if __name__ == '__main__':
    unittest.main()
