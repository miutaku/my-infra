import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('verification', Path(__file__).parents[1] / 'scripts/verify-loockit-independence.py')
verification = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verification)


class IsolationCleanupTests(unittest.TestCase):
    def test_partial_route_install_failure_removes_only_its_own_routes(self):
        calls = []
        def remote(_host, args):
            calls.append(args)
            if '{{.State.Pid}}' in args:
                return '1234'
            if 'show' in args:
                return ''
            if 'add' in args and args[-1] == verification.CIDRS[1]:
                raise RuntimeError('injection failed')
            return ''
        with patch('sys.argv', ['verification', '--isolate']), \
             patch.object(verification.migration, 'status', return_value={'origin': verification.migration.ORIGIN}), \
             patch.object(verification.migration, 'ready', side_effect=[True, False]), \
             patch.object(verification, 'lease', return_value={}), \
             patch.object(verification.migration, 'remote', side_effect=remote):
            with self.assertRaisesRegex(RuntimeError, 'injection failed'):
                verification.main()
        removed = [args for args in calls if 'del' in args]
        self.assertEqual(len(removed), 1)
        self.assertEqual(removed[0][-1], verification.CIDRS[0])

    def test_existing_route_is_never_replaced_or_deleted(self):
        calls = []
        def remote(_host, args):
            calls.append(args)
            return '1234' if '{{.State.Pid}}' in args else 'prohibit existing route'
        with patch('sys.argv', ['verification', '--isolate']), \
             patch.object(verification.migration, 'status', return_value={'origin': verification.migration.ORIGIN}), \
             patch.object(verification.migration, 'ready', side_effect=[True, False]), \
             patch.object(verification, 'lease', return_value={}), \
             patch.object(verification.migration, 'remote', side_effect=remote):
            with self.assertRaisesRegex(RuntimeError, 'already exists'):
                verification.main()
        self.assertFalse(any('add' in args or 'del' in args for args in calls))


if __name__ == '__main__':
    unittest.main()
