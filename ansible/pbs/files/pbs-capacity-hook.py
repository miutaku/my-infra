#!/usr/bin/env python3
"""Fail a PVE backup before starting a guest when the HDD reserve is exhausted."""
import json
import subprocess
import sys

GIB = 1024 ** 3


def check(local, host):
    if not local.get('active') or not local.get('enabled'):
        raise RuntimeError('PBS HDD storage is unavailable')
    if local['used'] >= 280 * GIB or local['avail'] < 16 * GIB:
        raise RuntimeError('PBS HDD capacity reserve reached; backup stopped before guest start')
    if host['avail'] < 20 * GIB:
        raise RuntimeError('PVE HDD free-space reserve reached; backup stopped before guest start')
    if local['used'] >= 260 * GIB:
        print('WARNING: PBS HDD usage exceeds 260 GiB', file=sys.stderr)


def status(storage):
    result = subprocess.run(['pvesh', 'get', f'/nodes/pve-x570/storage/{storage}/status',
                             '--output-format', 'json'], capture_output=True, text=True,
                            timeout=30, check=True)
    return json.loads(result.stdout)


def main():
    if len(sys.argv) > 1 and sys.argv[1] in ('job-start', 'backup-start'):
        check(status('pbs-local'), status('hdd'))


if __name__ == '__main__':
    main()
