#!/usr/bin/env python3
"""Provision independent Loockit Lease credentials through BSM; never print values."""
import argparse
import json
import os
from pathlib import Path
import secrets
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parent
KEY = 'LOOCKIT_COORDINATOR_TOKENS_JSON'
IDENTITIES = ['loockit-x570', 'loockit-b550m']


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--deploy', action='store_true')
    args = parser.parse_args()
    listed = subprocess.run(['bws', 'secret', 'list', '--output', 'json'], capture_output=True)
    if listed.returncode:
        raise SystemExit('BSM read failed; details suppressed')
    entries = json.loads(listed.stdout)
    values = {item['key']: item['value'].strip() for item in entries}
    if KEY not in values:
        if not args.deploy:
            print('Deployment will create per-instance coordinator tokens in BSM')
            return
        tokens = {name: secrets.token_urlsafe(48) for name in IDENTITIES}
        project = next(item['projectId'] for item in entries if item['key'] == 'REBOOT_NOTIFY_WEBHOOK')
        created = subprocess.run(['bws', 'secret', 'create', KEY, json.dumps(tokens), project, '--output', 'none'], capture_output=True)
        if created.returncode:
            raise SystemExit('BSM credential creation failed; details suppressed')
    else:
        tokens = json.loads(values[KEY])
    if set(tokens) != set(IDENTITIES) or any(not isinstance(token, str) or len(token) < 32 for token in tokens.values()):
        raise SystemExit('Invalid coordinator token set')
    if args.deploy:
        with tempfile.TemporaryDirectory(prefix='loockit-wrangler-') as logdir:
            env = {**os.environ, 'CLOUDFLARE_API_TOKEN': values['TF_CLOUDFLARE_API_TOKEN'],
                   'WRANGLER_LOG_PATH': logdir + '/wrangler.log', 'WRANGLER_SEND_METRICS': 'false'}
            subprocess.run(['npx', 'wrangler', 'deploy', '--keep-vars'], cwd=ROOT, env=env, check=True)
            subprocess.run(['npx', 'wrangler', 'secret', 'bulk'], cwd=ROOT, env=env, check=True,
                           input=json.dumps({'LOOCKIT_LEASE_TOKENS_JSON': json.dumps(tokens)}).encode())
    print('Loockit coordinator credentials validated; secret values omitted')


if __name__ == '__main__':
    main()
