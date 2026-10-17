#!/usr/bin/python3
"""Prepare public IDs and deploy using BSM; never print secret values."""
import argparse
import json
import os
from pathlib import Path
import re
import secrets
import subprocess
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parent
HOSTS = ['dev-app-server', 'pve-x570', 'pve-b550m']


def get(url, headers):
    request = urllib.request.Request(url, headers={'User-Agent': 'DiscordBot (https://github.com/miutaku/my-infra, 1.0)', **headers})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--deploy', action='store_true')
    args = parser.parse_args()
    entries = json.loads(subprocess.check_output(['bws', 'secret', 'list', '--output', 'json']))
    values = {item['key']: item['value'].strip() for item in entries}
    required = ['REBOOT_DISCORD_BOT_TOKEN', 'REBOOT_DISCORD_OPERATOR_IDS', 'REBOOT_NOTIFY_WEBHOOK', 'TF_CLOUDFLARE_API_TOKEN']
    missing = [key for key in required if not values.get(key)]
    if missing:
        raise SystemExit('Missing BSM keys: ' + ', '.join(missing))
    bot = values['REBOOT_DISCORD_BOT_TOKEN'].removeprefix('Bot ')
    headers = {'Authorization': 'Bot ' + bot}
    app = get('https://discord.com/api/v10/oauth2/applications/@me', headers)
    webhook = get(values['REBOOT_NOTIFY_WEBHOOK'], {})
    channel = get('https://discord.com/api/v10/channels/' + webhook['channel_id'], headers)
    if channel.get('guild_id') != webhook.get('guild_id'):
        raise SystemExit('Notification channel guild mismatch')
    operator_ids = values['REBOOT_DISCORD_OPERATOR_IDS']
    if not re.fullmatch(r'\d{17,20}(\s*,\s*\d{17,20})*', operator_ids):
        raise SystemExit('REBOOT_DISCORD_OPERATOR_IDS must contain comma-separated Discord user IDs')
    config_path = ROOT / 'wrangler.jsonc'
    config = json.loads(config_path.read_text())
    config['account_id'] = 'd1221137443d7862cbdd136bdffb2dc5'
    config['vars'].update({
        'DISCORD_PUBLIC_KEY': app['verify_key'],
        'DISCORD_CHANNEL_ID': channel['id'], 'DISCORD_GUILD_ID': channel['guild_id'],
        'DISCORD_OPERATOR_IDS': operator_ids,
    })
    config_path.write_text(json.dumps(config, indent=2) + '\n')
    print('Discord application and channel verified; public Worker configuration prepared')
    if not args.deploy:
        return
    if 'REBOOT_AGENT_TOKENS_JSON' in values:
        tokens = json.loads(values['REBOOT_AGENT_TOKENS_JSON'])
    else:
        tokens = {host: secrets.token_urlsafe(48) for host in HOSTS}
        project_id = next(item['projectId'] for item in entries if item['key'] == 'REBOOT_NOTIFY_WEBHOOK')
        subprocess.run(['bws', 'secret', 'create', 'REBOOT_AGENT_TOKENS_JSON', json.dumps(tokens), project_id,
                        '--note', 'Per-host outbound maintenance agent credentials', '--output', 'none'], check=True,
                       stdout=subprocess.DEVNULL)
        print('Created per-host credentials in BSM')
    if set(tokens) != set(HOSTS) or any(not isinstance(value, str) or len(value) < 32 for value in tokens.values()):
        raise SystemExit('Invalid agent token set')
    env = {**os.environ, 'CLOUDFLARE_API_TOKEN': values['TF_CLOUDFLARE_API_TOKEN'],
           'WRANGLER_LOG_PATH': '/tmp/maintenance-wrangler.log'}
    subprocess.run(['npx', 'wrangler', 'deploy'], cwd=ROOT, env=env, check=True)
    subprocess.run(['npx', 'wrangler', 'secret', 'bulk'], cwd=ROOT, env=env, check=True,
                   input=json.dumps({'DISCORD_BOT_TOKEN': bot, 'AGENT_TOKENS_JSON': json.dumps(tokens)}).encode())
    subdomain = get(f"https://api.cloudflare.com/client/v4/accounts/{config['account_id']}/workers/subdomain",
                    {'Authorization': 'Bearer ' + values['TF_CLOUDFLARE_API_TOKEN']})['result']['subdomain']
    origin = f"https://{config['name']}.{subdomain}.workers.dev"
    request = urllib.request.Request('https://discord.com/api/v10/applications/@me',
        headers={**headers, 'Content-Type': 'application/json', 'User-Agent': 'DiscordBot (https://github.com/miutaku/my-infra, 1.0)'},
        method='PATCH', data=json.dumps({'interactions_endpoint_url': origin + '/discord/interactions'}).encode())
    with urllib.request.urlopen(request, timeout=30) as response:
        updated = json.load(response)
    if updated.get('interactions_endpoint_url') != origin + '/discord/interactions':
        raise SystemExit('Discord endpoint registration did not succeed; do not activate agents')
    print('Discord validated the signed interaction endpoint: ' + origin + '/discord/interactions')
    print('Controller origin for host_maintenance_controller_url: ' + origin)


if __name__ == '__main__':
    try:
        main()
    except urllib.error.HTTPError as error:
        raise SystemExit(f'Discord setup check failed (HTTP {error.code}); verify Bot installation and channel permissions') from None
