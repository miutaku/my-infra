#!/usr/bin/python
"""Provision restricted TrueNAS monitoring access; never return secrets to Ansible."""
import json
import os
from pathlib import Path
import tempfile


class SetupError(Exception):
    pass


class Client:
    def __init__(self, module):
        self.module = module

    def call(self, method, *params):
        rc, stdout, _ = self.module.run_command(
            ['midclt', 'call', method] + [json.dumps(p) for p in params])
        if rc:
            raise SetupError('TrueNAS method failed: ' + method)
        # midclt prints scalar strings without JSON quoting on older releases.
        if method == 'system.version':
            return stdout.strip().strip('"')
        try:
            return json.loads(stdout)
        except json.JSONDecodeError:
            raise SetupError('Invalid TrueNAS response format: ' + method) from None


def unique(items, label):
    if len(items) > 1:
        raise SetupError('Ambiguous ' + label)
    return items[0] if items else None


def atomic_json(path, value):
    fd, temporary = tempfile.mkstemp(dir=path.parent, prefix='.monitoring-')
    try:
        with os.fdopen(fd, 'w') as stream:
            json.dump(value, stream)
            stream.write('\n')
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


LEGACY_ALLOWLIST = [{'method': 'CALL', 'resource': name} for name in ('pool.query', 'alert.list')]


def provision_legacy(client, output, secret_name, check=False):
    """23.10 keys are not user-linked. Grant exactly the two collector methods."""
    key = unique(client.call('api_key.query', [['name', '=', 'home-monitoring']]), 'monitoring API key')
    metadata = Path(str(output) + '.metadata.json')
    if key and sorted(key.get('allowlist', []), key=lambda x: (x['method'], x['resource'])) != sorted(LEGACY_ALLOWLIST, key=lambda x: (x['method'], x['resource'])):
        raise SetupError('Existing key is not restricted to pool.query and alert.list; no changes made')
    if output.exists() or metadata.exists():
        if not output.is_file() or not metadata.is_file() or output.is_symlink() or metadata.is_symlink():
            raise SetupError('Incomplete or unsafe local API key files; do not reissue automatically')
        saved = json.loads(output.read_text()).get(secret_name)
        state = json.loads(metadata.read_text())
        if not saved or not key or key['id'] != state.get('id') or state.get('secret_name') != secret_name:
            raise SetupError('Local API key files differ from NAS; do not reissue automatically')
    elif key:
        raise SetupError('API key already exists but its local secret is missing; recover it from BWS, do not rotate automatically')
    if check:
        return key is None
    output.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    if output.parent.is_symlink():
        raise SetupError('Output directory must not be a symbolic link')
    os.chmod(output.parent, 0o700)
    if not key:
        key = client.call('api_key.create', {'name': 'home-monitoring', 'allowlist': LEGACY_ALLOWLIST})
        atomic_json(output, {secret_name: key['key']})
        atomic_json(metadata, {'id': key['id'], 'secret_name': secret_name})
        changed = True
    else:
        changed = False
    os.chmod(output, 0o600)
    os.chmod(metadata, 0o600)
    return changed


def provision(client, output, secret_name, check=False):
    """Use a dedicated group. GID is for privilege; record ID is for user.group."""
    name = 'home-monitoring'
    privilege_name = 'home-monitoring-readonly'
    group = unique(client.call('group.query', [['name', '=', name]]), 'monitoring group')
    user = unique(client.call('user.query', [['username', '=', name]]), 'monitoring user')
    privileges = client.call('privilege.query')
    privilege = unique([p for p in privileges if p['name'] == privilege_name], 'monitoring privilege')
    key = unique(client.call('api_key.query', [['name', '=', name]]), 'monitoring API key')
    metadata = Path(str(output) + '.metadata.json')

    # Do not adopt an unrelated account/group or silently widen existing access.
    if group:
        if group.get('builtin') or group.get('sudo_commands') or group.get('sudo_commands_nopasswd'):
            raise SetupError('Existing monitoring group has unexpected privileges')
        if set(group.get('users', [])) - ({user['id']} if user else set()):
            raise SetupError('Monitoring group contains another user')
        for p in privileges:
            gids = [g['gid'] for g in p.get('local_groups', [])]
            if group['gid'] in gids and p['name'] != privilege_name:
                raise SetupError('Monitoring group has another privilege assignment')
    if user:
        if (not group or user.get('local') is False or user.get('builtin')
                or user['group']['id'] != group['id'] or user.get('groups')
                or user.get('sudo_commands') or user.get('sudo_commands_nopasswd')
                or user.get('sshpubkey')):
            raise SetupError('Existing monitoring user is not an isolated monitoring account')
    if privilege:
        if (not group or privilege.get('builtin_name')
                or [g['gid'] for g in privilege['local_groups']] != [group['gid']]
                or privilege.get('ds_groups') or privilege['roles'] != ['READONLY_ADMIN']
                or privilege['web_shell']):
            raise SetupError('Existing monitoring privilege differs from read-only access')

    saved = None
    if output.exists() or metadata.exists():
        if not output.is_file() or not metadata.is_file() or output.is_symlink() or metadata.is_symlink():
            raise SetupError('Incomplete or unsafe local API key files; do not reissue automatically')
        saved = json.loads(output.read_text()).get(secret_name)
        state = json.loads(metadata.read_text())
        if (not saved or not key or key['id'] != state.get('id')
                or state.get('secret_name') != secret_name):
            raise SetupError('Local API key files differ from NAS; do not reissue automatically')
    if key:
        if key['username'] != name or key.get('revoked') or key.get('expires_at'):
            raise SetupError('Existing monitoring API key has an unexpected owner or validity')
        if not saved:
            raise SetupError('API key already exists but its local secret is missing; recover it from BWS, do not rotate automatically')
    elif saved:
        raise SetupError('Saved API key is absent from NAS')

    user_settings = {'password_disabled': True, 'ssh_password_enabled': False,
                     'smb': False, 'locked': False, 'shell': '/usr/sbin/nologin'}
    update = {k: v for k, v in user_settings.items() if user and user.get(k) != v}
    changed = not all([group, user, privilege, key]) or bool(update)
    if check:
        return changed

    output.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    if output.parent.is_symlink():
        raise SetupError('Output directory must not be a symbolic link')
    os.chmod(output.parent, 0o700)
    if not group:
        client.call('group.create', {'name': name, 'smb': False})
        group = unique(client.call('group.query', [['name', '=', name]]), 'monitoring group')
    if not privilege:
        client.call('privilege.create', {'name': privilege_name, 'local_groups': [group['gid']],
                                       'roles': ['READONLY_ADMIN'], 'web_shell': False})
    if not user:
        client.call('user.create', dict(user_settings, username=name,
                    full_name='Home monitoring', group_create=False, group=group['id'], home='/var/empty'))
    elif update:
        client.call('user.update', user['id'], update)
    if not key:
        key = client.call('api_key.create', {'name': name, 'username': name})
        # Save before any further network request: TrueNAS only returns this once.
        atomic_json(output, {secret_name: key['key']})
        atomic_json(metadata, {'id': key['id'], 'secret_name': secret_name})
    os.chmod(output, 0o600)
    os.chmod(metadata, 0o600)
    return changed


def main():
    from ansible.module_utils.basic import AnsibleModule
    module = AnsibleModule(argument_spec={
        'output_file': {'type': 'path', 'required': True},
        'secret_name': {'type': 'str', 'required': True},
    }, supports_check_mode=True)
    try:
        client = Client(module)
        version = client.call('system.version')
        if version.startswith('TrueNAS-SCALE-25.10.'):
            configure = provision
        elif version.startswith('TrueNAS-SCALE-23.10.'):
            configure = provision_legacy
        else:
            raise SetupError('Supported versions are TrueNAS SCALE 23.10 and 25.10; found ' + version)
        changed = configure(client, Path(module.params['output_file']), module.params['secret_name'], module.check_mode)
    except Exception as error:
        message = str(error) if isinstance(error, SetupError) else 'TrueNAS provisioning failed (' + type(error).__name__ + '); no secret or response body logged'
        module.fail_json(msg=message)
    module.exit_json(changed=changed, credential_file=module.params['output_file'])



if __name__ == '__main__':
    main()
