import copy
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('monitoring', Path(__file__).parents[1] / 'library/truenas_monitoring.py')
monitoring = importlib.util.module_from_spec(spec)
spec.loader.exec_module(monitoring)


class API:
    def __init__(self):
        self.group = self.user = self.privilege = self.key = None
        self.mutations = []

    def call(self, method, *args):
        kind, operation = method.split('.')
        if operation == 'query':
            value = getattr(self, 'key' if kind == 'api_key' else kind)
            return [copy.deepcopy(value)] if value else []
        self.mutations.append((method, args))
        if method == 'group.create':
            self.group = {'id': 41, 'gid': 3041, 'name': 'home-monitoring', 'users': []}
            return 41
        if method == 'privilege.create':
            self.privilege = dict(args[0], id=51, builtin_name=None,
                                  local_groups=[copy.deepcopy(self.group)], ds_groups=[])
            return copy.deepcopy(self.privilege)
        if method == 'user.create':
            self.user = dict(args[0], id=61, local=True, groups=[],
                             group=copy.deepcopy(self.group))
            self.group['users'] = [61]
            return copy.deepcopy(self.user)
        if method == 'user.update':
            self.user.update(args[1])
            return copy.deepcopy(self.user)
        if method == 'api_key.create':
            self.key = dict(args[0], id=71, revoked=False, expires_at=None)
            return dict(self.key, key='71-not-a-real-secret')
        raise AssertionError(method)


class ProvisionTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.output = Path(self.directory.name) / 'private/key.json'
        self.api = API()
        self.secret = 'HOME_MONITORING_NAS_01_API_KEY'

    def run_setup(self, check=False):
        return monitoring.provision(self.api, self.output, self.secret, check)

    def test_check_mode_does_not_create_accounts_or_credentials(self):
        self.assertTrue(self.run_setup(check=True))
        self.assertEqual(self.api.mutations, [])
        self.assertFalse(self.output.parent.exists())

    def test_gid_and_record_id_are_not_interchanged(self):
        self.run_setup()
        privilege = next(a[0] for m, a in self.api.mutations if m == 'privilege.create')
        user = next(a[0] for m, a in self.api.mutations if m == 'user.create')
        self.assertEqual(privilege['local_groups'], [3041])
        self.assertEqual(privilege['roles'], ['READONLY_ADMIN'])
        self.assertFalse(privilege['web_shell'])
        self.assertEqual(user['group'], 41)
        self.assertTrue(user['password_disabled'])

    def test_rerun_preserves_key_and_private_files(self):
        self.assertTrue(self.run_setup())
        original = self.output.read_text()
        self.api.mutations.clear()
        self.assertFalse(self.run_setup())
        self.assertEqual(self.api.mutations, [])
        self.assertEqual(self.output.read_text(), original)
        self.assertEqual(self.output.stat().st_mode & 0o777, 0o600)
        self.assertEqual(self.output.parent.stat().st_mode & 0o777, 0o700)

    def test_lost_secret_is_not_silently_rotated(self):
        self.run_setup()
        self.output.unlink()
        Path(str(self.output) + '.metadata.json').unlink()
        self.api.mutations.clear()
        with self.assertRaises(monitoring.SetupError):
            self.run_setup()
        self.assertEqual(self.api.mutations, [])

    def test_revoked_key_is_not_silently_replaced(self):
        self.run_setup()
        self.api.key['revoked'] = True
        self.api.mutations.clear()
        with self.assertRaises(monitoring.SetupError):
            self.run_setup()
        self.assertEqual(self.api.mutations, [])

    def test_shared_group_is_not_given_monitoring_access(self):
        self.api.group = {'id': 41, 'gid': 3041, 'users': [99]}
        with self.assertRaises(monitoring.SetupError):
            self.run_setup()
        self.assertEqual(self.api.mutations, [])

    def test_existing_privileged_account_is_not_adopted(self):
        self.run_setup()
        self.api.user['sudo_commands'] = ['ALL']
        self.api.mutations.clear()
        with self.assertRaises(monitoring.SetupError):
            self.run_setup()
        self.assertEqual(self.api.mutations, [])

    def test_another_privilege_assignment_is_rejected(self):
        self.run_setup()
        self.api.privilege['name'] = 'existing-admin-assignment'
        self.api.mutations.clear()
        with self.assertRaises(monitoring.SetupError):
            self.run_setup()
        self.assertEqual(self.api.mutations, [])


class LegacyTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.output = Path(self.directory.name) / 'private/key.json'
        self.api = API()
        self.secret = 'HOME_MONITORING_NAS_01_API_KEY'

    def setup_key(self, check=False):
        return monitoring.provision_legacy(self.api, self.output, self.secret, check)

    def test_only_two_read_methods_are_allowed(self):
        self.assertTrue(self.setup_key())
        self.assertEqual([m for m, _ in self.api.mutations], ['api_key.create'])
        self.assertEqual(self.api.key['allowlist'], [
            {'method': 'CALL', 'resource': 'pool.query'},
            {'method': 'CALL', 'resource': 'alert.list'},
        ])
        self.api.mutations.clear()
        self.assertFalse(self.setup_key())
        self.assertEqual(self.api.mutations, [])
        self.assertEqual(self.output.stat().st_mode & 0o777, 0o600)

    def test_check_mode_never_issues_a_key(self):
        self.assertTrue(self.setup_key(check=True))
        self.assertEqual(self.api.mutations, [])
        self.assertFalse(self.output.parent.exists())

    def test_existing_full_access_key_is_not_adopted(self):
        self.api.key = {'id': 71, 'allowlist': [{'method': '*', 'resource': '*'}]}
        with self.assertRaises(monitoring.SetupError):
            self.setup_key()
        self.assertEqual(self.api.mutations, [])

    def test_missing_saved_secret_is_not_rotated(self):
        self.setup_key()
        self.output.unlink()
        self.api.mutations.clear()
        with self.assertRaises(monitoring.SetupError):
            self.setup_key()
        self.assertEqual(self.api.mutations, [])


if __name__ == '__main__':
    unittest.main()
