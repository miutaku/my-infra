#!/usr/bin/env python3
"""Publish the result of an actually completed, isolated PBS restore test.

Does not initiate a restore or mutate PBS. Do not report verification/backup Job
completion as a successful VM restore. Run after restoring and checking the VM.
"""
import argparse
import time
import urllib.request


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--vm', required=True, choices=['13201', '60000', '40000'])
    parser.add_argument('--result', required=True, choices=['success', 'failure'])
    parser.add_argument('--url', default='http://127.0.0.1:18428/api/v1/import/prometheus',
                        help='VictoriaMetrics import URL; default uses a local port-forward')
    args = parser.parse_args()
    now = int(time.time())
    label = 'backup="pbs-vm-' + args.vm + '"'
    body = 'home_backup_restore_success{' + label + '} ' + str(int(args.result == 'success')) + '\n'
    if args.result == 'success':
        body += 'home_backup_restore_timestamp_seconds{' + label + '} ' + str(now) + '\n'
    request = urllib.request.Request(args.url, data=body.encode(), headers={'Content-Type':'text/plain'}, method='POST')
    # A redirect must not silently deliver the result to another endpoint.
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *_args, **_kwargs):
            return None
    with urllib.request.build_opener(NoRedirect).open(request, timeout=10) as response:
        if response.status not in (200, 204):
            raise SystemExit('Restore result was not accepted')
    print('Restore result accepted')


if __name__ == '__main__':
    main()
