import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('migration', Path(__file__).parents[1] / 'scripts/migrate-loockit-coordinator.py')
migration = importlib.util.module_from_spec(spec)
spec.loader.exec_module(migration)
OLD = {'running': True, 'origin': '192.168.20.228'}
NEW = {'running': True, 'origin': migration.ORIGIN}


class MigrationTests(unittest.TestCase):
    def test_read_only_default_does_not_stop_or_deploy(self):
        with patch('sys.argv', ['migration']), patch.object(migration, 'status', return_value=OLD), \
             patch.object(migration, 'ready', side_effect=[True, False]), patch.object(migration, 'remote') as action:
            migration.main()
            action.assert_not_called()

    def test_mixed_coordinators_are_refused(self):
        with patch('sys.argv', ['migration', '--execute']), patch.object(migration, 'status', side_effect=[OLD, NEW]), \
             patch.object(migration, 'ready', side_effect=[True, False]), patch.object(migration, 'remote') as action:
            with self.assertRaisesRegex(RuntimeError, 'Expected two old'):
                migration.main()
            action.assert_not_called()

    def test_old_standby_is_stopped_before_active_and_peer_migrate(self):
        with patch('sys.argv', ['migration', '--execute']), \
             patch.object(migration, 'status', side_effect=[OLD, OLD, dict(OLD, running=False), NEW, NEW]), \
             patch.object(migration, 'ready', side_effect=[True, False, True, False]), \
             patch.object(migration, 'remote') as action:
            migration.main()
            calls = action.call_args_list
            self.assertEqual(calls[0].args[0], migration.HOSTS[1])
            self.assertIn('stop', calls[0].args[1])
            self.assertEqual(calls[1].args[0], migration.HOSTS[0])
            self.assertEqual(calls[2].args[0], migration.HOSTS[1])

    def test_active_rollback_never_starts_new_coordinator_peer(self):
        with patch('sys.argv', ['migration', '--execute']), \
             patch.object(migration, 'status', side_effect=[OLD, OLD, dict(OLD, running=False), OLD]), \
             patch.object(migration, 'ready', side_effect=[True, False]), patch.object(migration, 'remote') as action:
            with self.assertRaisesRegex(RuntimeError, 'rolled back'):
                migration.main()
            self.assertEqual(action.call_count, 2)

    def test_already_migrated_is_noop(self):
        with patch('sys.argv', ['migration', '--execute']), patch.object(migration, 'status', return_value=NEW), \
             patch.object(migration, 'ready', side_effect=[True, False]), patch.object(migration, 'remote') as action:
            migration.main()
            action.assert_not_called()


if __name__ == '__main__':
    unittest.main()
