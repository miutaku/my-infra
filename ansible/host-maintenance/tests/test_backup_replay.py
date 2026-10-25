import importlib.util
import json
from pathlib import Path
import shlex
import subprocess
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('backup_agent', Path(__file__).parents[1] / 'files/maintenance-agent.py')
agent = importlib.util.module_from_spec(spec)
spec.loader.exec_module(agent)


class BackupReplayTests(unittest.TestCase):
    def setUp(self):
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        self.root = Path(folder.name)
        for name, filename in [('STATE', 'execution'), ('UPDATE_STATE', 'update'),
                               ('BACKUP_STATE', 'backups'), ('BACKUP_LAST', 'last'), ('BOOT', 'boot')]:
            stub = patch.object(agent, name, self.root / filename)
            stub.start()
            self.addCleanup(stub.stop)
        agent.BOOT.write_text('before')
        self.pending = {'bootId': 'before', 'executionId': 'approved-reboot'}
        self.logs, self.statuses, self.active = {}, {}, {'pve-x570': [], 'pve-b550m': []}
        self.stopped, self.created = [], []
        self.storage_ready, self.ignore_stop, self.lose_submission = True, False, False
        self.events = []
        for node in self.active:
            upid = f'UPID:{node}:00000001:00000002:00000003:vzdump::root@pam:'
            self.active[node].append({'type': 'vzdump', 'upid': upid})
            self.logs[upid] = "INFO: starting new backup job: vzdump 100 101 --storage pbs-home --mode snapshot --notes-template '{{guestname}} backup' --prune-backups 'keep-all=1'"
            self.statuses[upid] = {'status': 'running'}
        for name, value in [('run', self.pve_run), ('pve_healthy', lambda: True),
                            ('availability_check', lambda *a, **kw: self.events.append('availability')),
                            ('updates', lambda: (0, 'fingerprint')), ('package_idle', lambda: True),
                            ('reboot_required', lambda pve: True)]:
            stub = patch.object(agent, name, value)
            stub.start()
            self.addCleanup(stub.stop)
        sleeper = patch.object(agent.time, 'sleep')
        sleeper.start()
        self.addCleanup(sleeper.stop)

    def pve_run(self, *args):
        _, method, path, *options = args
        node = path.split('/')[2]
        if path.endswith('/tasks'):
            source = options[options.index('--source') + 1]
            tasks = self.active[node] if source == 'active' else [
                {'type': 'vzdump', 'upid': upid} for upid in self.created if upid.startswith(f'UPID:{node}:')]
            return json.dumps(tasks)
        if path.endswith('/log'):
            upid = path.split('/')[4]
            return json.dumps([{'t': self.logs[upid]}])
        if '/tasks/' in path:
            upid = path.split('/')[4]
            if method == 'get':
                return json.dumps(self.statuses[upid])
            self.assertTrue(agent.BACKUP_STATE.exists(), 'write intent before DELETE')
            saved = json.loads(agent.BACKUP_STATE.read_text())
            self.assertTrue(all(item['arguments'] for item in saved['items'].values()))
            self.events.append('stop')
            self.stopped.append(upid)
            if not self.ignore_stop:
                self.active[node] = [task for task in self.active[node] if task['upid'] != upid]
                self.statuses[upid] = {'status': 'stopped', 'exitstatus': 'interrupted by signal'}
            return 'null'
        if '/storage/' in path:
            return json.dumps({'active': int(self.storage_ready)})
        if method == 'create' and path.endswith('/vzdump'):
            self.events.append('start')
            upid = f'UPID:{node}:{len(self.created) + 4:08X}:00000005:00000006:vzdump::root@pam:'
            self.created.append(upid)
            self.active[node].append({'type': 'vzdump', 'upid': upid})
            args = [part for option in options[:-2] for part in option.split('=', 1)]
            guests = args[args.index('--vmid') + 1].split(',')
            args = [part for i, part in enumerate(args) if i not in [args.index('--vmid'), args.index('--vmid') + 1]]
            self.logs[upid] = 'INFO: starting new backup job: vzdump ' + shlex.join(guests + args)
            self.statuses[upid] = {'status': 'running'}
            if self.lose_submission:
                raise subprocess.TimeoutExpired('pvesh', 120)
            return json.dumps(upid)
        raise AssertionError(args)

    def prepare(self):
        agent.prepare_backups('pve-x570', self.pending)

    def test_cancel_both_nodes_then_replay_once_after_boot_and_archive_completion(self):
        self.prepare()
        self.assertEqual(len(self.stopped), 2)
        self.assertEqual(agent.BACKUP_STATE.stat().st_mode & 0o777, 0o600)
        agent.replay_backups()
        self.assertEqual(self.created, [], 'do not restart while reboot is pending')
        agent.BOOT.write_text('after')
        agent.replay_backups()
        self.assertEqual(len(self.created), 2)
        agent.replay_backups()
        self.assertEqual(len(self.created), 2, 'timer retry must not duplicate running jobs')
        for upid in self.created:
            self.statuses[upid] = {'status': 'stopped', 'exitstatus': 'OK'}
        agent.replay_backups()
        self.assertFalse(agent.BACKUP_STATE.exists())
        self.assertTrue(agent.BACKUP_LAST.exists())
        self.assertEqual({i['state'] for i in json.loads(agent.BACKUP_LAST.read_text())['items'].values()}, {'done'})

    def test_original_arguments_are_preserved_without_shell_execution(self):
        upid = self.active['pve-x570'][0]['upid']
        self.logs[upid] = "INFO: starting new backup job: vzdump 100 --storage pbs-home --notes-template 'literal $(touch /tmp/should-not-exist); `id`'"
        args = agent.backup_arguments('pve-x570', upid)
        self.assertEqual(args, ['--vmid', '100', '--storage', 'pbs-home', '--notes-template', 'literal $(touch /tmp/should-not-exist); `id`'])

    def test_note_that_looks_like_a_cli_option_cannot_stop_other_jobs(self):
        upid = self.active['pve-x570'][0]['upid']
        self.logs[upid] = "INFO: starting new backup job: vzdump 100 --storage pbs-home --notes-template '--stop=1'"
        self.prepare()
        agent.BOOT.write_text('after')
        real_run = self.pve_run
        with patch.object(agent, 'run', side_effect=real_run) as calls:
            agent.replay_backups()
        commands = [call.args for call in calls.call_args_list if call.args[1] == 'create']
        self.assertTrue(any('--notes-template=--stop=1' in command for command in commands))
        self.assertTrue(all('--stop=1' not in command for command in commands))

    def test_migration_or_unreplayable_backup_prevents_any_cancellation(self):
        self.active['pve-b550m'].append({'type': 'qmigrate', 'upid': 'migration'})
        with self.assertRaisesRegex(RuntimeError, 'qmigrate'):
            self.prepare()
        self.assertEqual(self.stopped, [])
        self.active['pve-b550m'].pop()
        self.logs[self.active['pve-b550m'][0]['upid']] = 'INFO: no command available'
        with self.assertRaisesRegex(RuntimeError, 'preserve'):
            self.prepare()
        self.assertEqual(self.stopped, [])

    def test_wait_for_clean_stop_and_never_force_kill(self):
        self.ignore_stop = True
        with patch.object(agent.time, 'monotonic', side_effect=[0, 121]):
            with self.assertRaisesRegex(RuntimeError, 'did not stop cleanly'):
                self.prepare()
        self.assertEqual(len(self.stopped), 2)
        self.assertEqual(self.created, [])

    def test_storage_and_existing_backups_delay_replay_without_losing_queue(self):
        self.prepare()
        agent.BOOT.write_text('after')
        self.storage_ready = False
        agent.replay_backups()
        self.assertEqual(self.created, [])
        self.assertTrue(agent.BACKUP_STATE.exists())
        self.storage_ready = True
        self.active['pve-x570'].append({'type': 'vzdump', 'upid': 'scheduled-new-backup'})
        agent.replay_backups()
        self.assertEqual(len(self.created), 1)
        self.assertTrue(self.created[0].startswith('UPID:pve-b550m:'))

    def test_replay_waits_for_cluster_and_migrations(self):
        self.prepare()
        agent.BOOT.write_text('after')
        with patch.object(agent, 'pve_healthy', return_value=False):
            agent.replay_backups()
        self.assertEqual(self.created, [])
        self.active['pve-b550m'].append({'type': 'qmigrate', 'upid': 'migration'})
        agent.replay_backups()
        self.assertEqual(self.created, [])
        self.active['pve-b550m'].clear()
        agent.replay_backups()
        self.assertEqual(len(self.created), 2)

    def test_completed_original_is_not_run_again(self):
        self.prepare()
        first = self.stopped[0]
        self.statuses[first] = {'status': 'stopped', 'exitstatus': 'OK'}
        agent.BOOT.write_text('after')
        agent.replay_backups()
        self.assertEqual(len(self.created), 1)

    def test_lost_create_response_reconciles_history_without_duplicate_submission(self):
        self.prepare()
        agent.BOOT.write_text('after')
        self.lose_submission = True
        agent.replay_backups()
        self.assertEqual(len(self.created), 2)
        agent.replay_backups()
        self.assertEqual(len(self.created), 2)
        items = json.loads(agent.BACKUP_STATE.read_text())['items']
        self.assertTrue(all(item.get('replayUpid') for item in items.values()))

    def test_ambiguous_submission_is_not_blindly_retried(self):
        self.prepare()
        queue = json.loads(agent.BACKUP_STATE.read_text())
        for item in queue['items'].values():
            item.update(state='submitting', submittedAt=100)
        agent.backup_save(queue)
        agent.BOOT.write_text('after')
        agent.replay_backups()
        self.assertEqual(self.created, [])
        self.assertTrue(agent.BACKUP_STATE.exists())

    def test_blocked_reboot_releases_backups_on_same_boot(self):
        self.prepare()
        agent.backup_release(self.pending['executionId'])
        agent.replay_backups()
        self.assertEqual(len(self.created), 2)

    def test_failed_replay_is_recorded_without_a_retry_loop(self):
        self.prepare()
        agent.BOOT.write_text('after')
        agent.replay_backups()
        for upid in self.created:
            self.statuses[upid] = {'status': 'stopped', 'exitstatus': 'storage failure'}
        agent.replay_backups()
        agent.replay_backups()
        self.assertEqual(len(self.created), 2)
        self.assertEqual({i['state'] for i in json.loads(agent.BACKUP_LAST.read_text())['items'].values()}, {'failed'})

    @patch.object(agent, 'handoff_loockit')
    def test_claim_and_service_safety_precede_cancellation_and_reboot(self, handoff):
        def control(config, endpoint, body):
            self.events.append(endpoint)
            return {'executionId': 'approved-reboot'} if endpoint == 'claim' else None
        with patch.object(agent, 'api', side_effect=control), patch.object(agent.subprocess, 'run') as execute:
            agent.process({'host': 'pve-x570'})
        self.assertLess(self.events.index('claim'), self.events.index('stop'))
        self.assertLess(self.events.index('availability'), self.events.index('stop'))
        execute.assert_called_once_with(['systemctl', 'reboot'], check=True, timeout=30)
        self.assertTrue(agent.STATE.exists())

    def test_a_second_reboot_requeues_the_replay_without_duplicate_work(self):
        self.prepare()
        agent.BOOT.write_text('after')
        agent.replay_backups()
        first_replays = set(self.created)
        agent.prepare_backups('pve-x570', {'bootId': 'after', 'executionId': 'second-reboot'})
        queue = json.loads(agent.BACKUP_STATE.read_text())
        self.assertEqual(set(queue['items']), first_replays)
        self.assertEqual(len(queue['items']), 2)
        agent.BOOT.write_text('after-second-reboot')
        agent.replay_backups()
        agent.replay_backups()
        self.assertEqual(len(self.created), 4)

    def test_probe_is_read_only_even_while_both_nodes_are_backing_up(self):
        (self.root / 'agent-config').write_text(json.dumps({'host': 'pve-x570', 'controller': 'https://controller.example'}))
        with patch.dict(agent.os.environ, {'CREDENTIALS_DIRECTORY': str(self.root)}), \
             patch('sys.argv', ['host-maintenance-agent', '--probe']):
            agent.main()
        self.assertEqual(self.stopped, [])
        self.assertEqual(self.created, [])
        self.assertFalse(agent.STATE.exists())
        self.assertFalse(agent.BACKUP_STATE.exists())

    @patch.object(agent, 'handoff_loockit')
    def test_no_claim_or_failed_availability_cannot_cancel_backups(self, handoff):
        with patch.object(agent, 'api', return_value=None), patch.object(agent.subprocess, 'run') as execute:
            agent.process({'host': 'pve-x570'})
            execute.assert_not_called()
        self.assertEqual(self.stopped, [])
        with patch.object(agent, 'availability_check', side_effect=agent.AvailabilityBlocked('peer unavailable')), \
             patch.object(agent, 'api', side_effect=[None, {'executionId': 'approved-reboot'}, None]), \
             patch.object(agent.subprocess, 'run') as execute:
            agent.process({'host': 'pve-x570'})
            execute.assert_not_called()
        self.assertEqual(self.stopped, [])

    @patch.object(agent, 'handoff_loockit')
    def test_failed_post_cancel_check_holds_reboot_and_releases_backup_queue(self, handoff):
        with patch.object(agent, 'availability_check', side_effect=[None, None, agent.AvailabilityBlocked('peer lost')]), \
             patch.object(agent, 'api', side_effect=[None, {'executionId': 'approved-reboot'}, None]), \
             patch.object(agent.subprocess, 'run') as execute:
            agent.process({'host': 'pve-x570'})
            execute.assert_not_called()
        self.assertEqual(len(self.stopped), 2)
        self.assertTrue(json.loads(agent.BACKUP_STATE.read_text())['resumeAllowed'])
        self.assertFalse(agent.STATE.exists())
