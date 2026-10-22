#!/usr/bin/env python3
"""Bootstrap scoped Access credentials in BSM and check the deployed boundaries.

Token lifecycle remains outside Terraform, matching home-monitoring. Values stay
in memory and BSM; only identity names and HTTP status codes are printed.
"""
import argparse
import json
import subprocess
import urllib.error
import urllib.request

ACCOUNT = 'd1221137443d7862cbdd136bdffb2dc5'
KEY = 'MAINTENANCE_CF_ACCESS_TOKENS_JSON'
IDENTITIES = {
    'dev-app-server': 'host-maintenance-dev-app-server',
    'pve-x570': 'host-maintenance-pve-x570',
    'pve-b550m': 'host-maintenance-pve-b550m',
    'loockit-x570': 'loockit-coordinator-x570',
    'loockit-b550m': 'loockit-coordinator-b550m',
}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def request(url, headers, method='GET', data=None):
    req = urllib.request.Request(url, headers={'User-Agent': 'my-infra-maintenance-access/1.0', **headers},
                                 method=method, data=json.dumps(data).encode() if data is not None else None)
    with urllib.request.build_opener(NoRedirect()).open(req, timeout=30) as response:
        return json.load(response)


def bws(args):
    result = subprocess.run(['bws', 'secret', *args, '--output', 'json'], capture_output=True)
    if result.returncode:
        raise RuntimeError('BSM operation failed; details suppressed')
    return json.loads(result.stdout)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['provision', 'register-discord', 'verify'])
    args = parser.parse_args()
    entries = bws(['list'])
    values = {entry['key']: entry['value'].strip() for entry in entries}
    headers = {'Authorization': 'Bearer ' + values['TF_CLOUDFLARE_API_TOKEN'], 'Content-Type': 'application/json'}
    api = f'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}'
    if args.command == 'provision':
        tokens = json.loads(values.get(KEY, '{}'))
        entry = next((item for item in entries if item['key'] == KEY), None)
        project = next(item['projectId'] for item in entries if item['key'] == 'REBOOT_NOTIFY_WEBHOOK')
        existing = request(api + '/access/service_tokens?per_page=100', headers)['result']
        for identity, name in IDENTITIES.items():
            if identity in tokens:
                if not any(item['id'] == tokens[identity]['id'] and item['name'] == name for item in existing):
                    raise RuntimeError(f'{identity}: stored Access token is missing or renamed')
                print(identity + ': credentials already registered')
                continue
            if any(item['name'] == name for item in existing):
                raise RuntimeError(f'{identity}: remote token exists without BSM credentials; recover it before retrying')
            created = request(api + '/access/service_tokens', headers, 'POST', {'name': name, 'duration': '8760h'})['result']
            tokens[identity] = {field: created[field] for field in ['id', 'client_id', 'client_secret']}
            if entry:
                bws(['edit', '--value', json.dumps(tokens), entry['id']])
            else:
                entry = bws(['create', KEY, json.dumps(tokens), project])
            print(identity + ': scoped credentials saved to BSM')
        return
    if args.command == 'register-discord':
        bot_headers = {'Authorization': 'Bot ' + values['REBOOT_DISCORD_BOT_TOKEN'].removeprefix('Bot '), 'Content-Type': 'application/json'}
        endpoint = 'https://maintenance-discord.miutaku.work/discord/interactions'
        app = request('https://discord.com/api/v10/applications/@me', bot_headers, 'PATCH', {'interactions_endpoint_url': endpoint})
        if app.get('interactions_endpoint_url') != endpoint:
            raise RuntimeError('Discord endpoint registration was not confirmed')
        print('Discord verified the signature endpoint on the dedicated public hostname')
        return
    tokens = json.loads(values[KEY])
    agent_tokens = json.loads(values['REBOOT_AGENT_TOKENS_JSON'])
    lease_tokens = json.loads(values['LOOCKIT_COORDINATOR_TOKENS_JSON'])
    def denied(label, url, auth=None, method='POST'):
        try:
            request(url, auth or {}, method, {} if method == 'POST' else None)
        except urllib.error.HTTPError as error:
            if error.code not in [401, 403, 404]:
                raise RuntimeError(label + ': unexpected rejection status') from None
            print(f'{label}: HTTP {error.code}')
            return
        raise RuntimeError(label + ': unexpectedly permitted')

    denied('Unsigned Discord interaction', 'https://maintenance-discord.miutaku.work/discord/interactions')
    denied('Discord hostname cannot expose agent API', 'https://maintenance-discord.miutaku.work/agent/auth-check')
    denied('Legacy workers.dev route disabled', 'https://home-maintenance-control.mtakumi-0925.workers.dev/agent/auth-check')
    for identity, credential in tokens.items():
        is_lease = identity.startswith('loockit-')
        url = ('https://loockit-lease.miutaku.work/apis/coordination.k8s.io/v1/namespaces/app-loockit/leases/loockit-ble-leader'
               if is_lease else 'https://maintenance.miutaku.work/agent/auth-check')
        auth = {'CF-Access-Client-Id': credential['client_id'], 'CF-Access-Client-Secret': credential['client_secret'],
                'Authorization': 'Bearer ' + (lease_tokens if is_lease else agent_tokens)[identity]}
        if not is_lease:
            auth['X-Maintenance-Host'] = identity
        denied(identity + ' without Access credentials', url, {key: value for key, value in auth.items() if not key.startswith('CF-Access-')}, 'GET' if is_lease else 'POST')
        denied(identity + ' without application credentials', url, {key: value for key, value in auth.items() if key != 'Authorization'}, 'GET' if is_lease else 'POST')
        other = tokens['pve-x570' if is_lease else 'loockit-x570']
        denied(identity + ' with credentials from another service', url,
               {**auth, 'CF-Access-Client-Id': other['client_id'], 'CF-Access-Client-Secret': other['client_secret']}, 'GET' if is_lease else 'POST')
        request(url, auth, 'GET' if is_lease else 'POST', None if is_lease else {})
        print(identity + ': Access and application authentication succeeded')


if __name__ == '__main__':
    try:
        main()
    except urllib.error.HTTPError as error:
        raise SystemExit(f'Remote request rejected: HTTP {error.code}; response body suppressed') from None
    except (RuntimeError, KeyError, ValueError, OSError) as error:
        raise SystemExit(type(error).__name__ + ': operation failed; credential details suppressed') from None
