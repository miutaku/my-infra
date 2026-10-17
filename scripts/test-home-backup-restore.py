#!/usr/bin/env python3
"""Exercise actual restore scripts against disposable databases and a local repo.

Uses Docker, no production credentials, no production endpoints or host data.
Database and restore containers have --network none and ephemeral storage only.
"""
import gzip
import json
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def configmap(path):
    result = subprocess.run(['ruby', '-rjson', '-ryaml', '-e',
        'puts JSON.generate(YAML.load_stream(File.read(ARGV[0])).find { |x| x["kind"] == "ConfigMap" }["data"])',
        str(ROOT / path)], check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


def run(image, script, mounts, uid='999', expected=0):
    command = ['docker', 'run', '--rm', '--network', 'none', '--read-only', '--user', uid + ':' + uid,
               '--cap-drop', 'ALL', '--security-opt', 'no-new-privileges',
               '--tmpfs', '/scratch:rw,uid=' + uid + ',gid=' + uid,
               '--tmpfs', '/tmp:rw,uid=' + uid + ',gid=' + uid]
    for src, dest in mounts:
        command += ['--mount', f'type=bind,src={src},dst={dest},readonly']
    if 'postgres' in image:
        command += ['--tmpfs', '/downloads:rw,uid=999,gid=999']
    if 'home-backup-tools' in image:
        command += ['--tmpfs', '/source:rw,uid=65534,gid=65534', '--tmpfs', '/restore:rw,uid=65534,gid=65534',
                    '-e', 'RESTIC_REPOSITORY=/tmp/repo', '-e', 'RESTIC_PASSWORD=local-test-only', '-e', 'RESTIC_CACHE_DIR=/tmp/cache']
    command += ['--entrypoint', '/bin/sh' if 'home-backup-tools' in image else '/bin/bash', image, '-ec', script]
    result = subprocess.run(command, capture_output=True, text=True)
    if (result.returncode == 0) != (expected == 0):
        print(result.stdout[-2000:])
        print(result.stderr[-2000:])
        raise SystemExit('Isolated restore test failed for ' + image)


def main():
    with tempfile.TemporaryDirectory(prefix='my-infra-restore-tests-') as directory:
        folder = Path(directory)
        folder.chmod(0o755)
        for name, content in configmap('k8s/pve/nas-backup/database-restore-check.yaml').items():
            (folder / name).write_text(content)
        for name, content in configmap('k8s/pve/nas-backup/restore-check.yaml').items():
            (folder / name).write_text(content)
        for bad in (False, True):
            downloads = folder / ('bad' if bad else 'good')
            downloads.mkdir(mode=0o755)
            sql = b'invalid SQL;' if bad else b'CREATE DATABASE restore_smoke; USE restore_smoke; CREATE TABLE t(id INT); INSERT INTO t VALUES (1);'
            (downloads / 'mariadb.sql.gz').write_bytes(gzip.compress(sql))
            run('mariadb:11.8', '/bin/bash /scripts/mariadb.sh', [(folder, '/scripts'), (downloads, '/downloads')], expected=1 if bad else 0)
            seed = '''
                initdb -D /tmp/seed --auth=trust >/dev/null
                pg_ctl -D /tmp/seed -o "-c listen_addresses='' -c unix_socket_directories=/tmp" -l /tmp/seed.log start >/dev/null
                export PGHOST=/tmp PGUSER=postgres
                psql -v ON_ERROR_STOP=1 -c 'CREATE TABLE restore_smoke(id INT); INSERT INTO restore_smoke VALUES (1);' >/dev/null
                pg_dump --format=custom --file=/downloads/1.dump postgres
                for n in 2 3 4 5; do cp /downloads/1.dump /downloads/$n.dump; done
                pg_ctl -D /tmp/seed -m immediate stop >/dev/null
            '''
            if bad:
                seed += "printf 'corrupt dump' > /downloads/1.dump\n"
            run('postgres:18-bookworm', seed + '\n/bin/bash /scripts/postgres.sh', [(folder, '/scripts')], expected=1 if bad else 0)
        run('my-infra-home-backup-tools:check', '''
            mkdir -p /source/sample
            printf 'restore fixture' > '/source/sample/字幕 [literal]*?.txt'
            restic init >/dev/null
            restic backup /source/sample >/dev/null
            /bin/sh /scripts/nas.sh
            cmp '/source/sample/字幕 [literal]*?.txt' '/restore/source/sample/字幕 [literal]*?.txt'
        ''', [(folder, '/scripts')], uid='65534')
    print('Passed MariaDB/PostgreSQL successful and corrupt restore cases, and an actual restic sample restore')


if __name__ == '__main__':
    main()
