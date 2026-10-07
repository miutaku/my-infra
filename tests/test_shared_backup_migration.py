"""Verify streaming migration detects corrupt or truncated backups and aborts failed uploads."""
import importlib.util
import io
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('migration', Path(__file__).parents[1] / 'scripts/migrate-shared-backups-idrive.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

class Source:
    def __init__(self, data): self.data = data
    def get_object(self, **kw): return {'Body': io.BytesIO(self.data), 'ContentLength': len(self.data)}

class Destination(Source):
    def __init__(self, corrupt=False, fail_part=False):
        super().__init__(b''); self.corrupt = corrupt; self.fail_part = fail_part; self.aborted = False
    def put_object(self, **kw): self.data = kw['Body'] + (b'x' if self.corrupt else b'')
    def create_multipart_upload(self, **kw): return {'UploadId': 'synthetic'}
    def upload_part(self, **kw):
        if self.fail_part: raise RuntimeError('simulated network failure')
        self.data += kw['Body']; return {'ETag': 'synthetic'}
    def complete_multipart_upload(self, **kw): pass
    def abort_multipart_upload(self, **kw): self.aborted = True

class MigrationChecks(unittest.TestCase):
    def copy(self, data, target, size=None):
        m.transfer(Source(data), target, 'db-backup', 'synthetic-key',
                   {'Size': len(data) if size is None else size, 'ETag': 'synthetic'})
    def test_roundtrip_bytes(self):
        t = Destination(); self.copy(b'encrypted synthetic backup\x00', t)
        self.assertEqual(t.data, b'encrypted synthetic backup\x00')
    def test_corruption_is_rejected(self):
        with self.assertRaises(AssertionError): self.copy(b'synthetic', Destination(corrupt=True))
    def test_truncated_source_is_rejected(self):
        with self.assertRaises(AssertionError): self.copy(b'short', Destination(), size=8)
    def test_failed_multipart_is_aborted(self):
        t = Destination(fail_part=True)
        with self.assertRaises(RuntimeError): self.copy(b'x' * (17 * 1024 * 1024), t)
        self.assertTrue(t.aborted)

if __name__ == '__main__': unittest.main()
