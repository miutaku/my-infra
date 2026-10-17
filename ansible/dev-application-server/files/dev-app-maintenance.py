#!/usr/bin/python3
"""Notify before rebooting, and reboot only in the announced window."""

import argparse
from datetime import datetime, timedelta
import json
import os
from pathlib import Path
import subprocess
import time
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo


STATE = Path('/var/lib/dev-app-maintenance/reboot-plan.json')
REQUIRED = Path('/run/reboot-required')
BOOT_ID = Path('/proc/sys/kernel/random/boot_id')
JST = ZoneInfo('Asia/Tokyo')


def target_time(now, reboot_time):
    hour, minute = map(int, reboot_time.split(':'))
    return (now + timedelta(days=1)).replace(
        hour=hour, minute=minute, second=0, microsecond=0)


def may_reboot(plan, now, boot_id, required):
    if not required or not plan or plan.get('boot_id') != boot_id:
        return False
    target = datetime.fromisoformat(plan['target'])
    return target <= now < target + timedelta(minutes=15)


def send_discord(webhook, message):
    payload = json.dumps({
        'content': message, 'allowed_mentions': {'parse': []},
    }).encode()
    separator = '&' if '?' in webhook else '?'
    for attempt in range(3):
        request = urllib.request.Request(
            webhook + separator + 'wait=true', data=payload,
            headers={'Content-Type': 'application/json',
                     'User-Agent': 'dev-app-maintenance/1.0'}, method='POST')
        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                if response.status == 200:
                    return
        except (urllib.error.URLError, TimeoutError):
            # Never log exceptions containing the secret webhook URL.
            pass
        if attempt < 2:
            time.sleep(5)
    raise RuntimeError('Discord delivery failed; automatic reboot not approved')


def read_plan():
    try:
        return json.loads(STATE.read_text())
    except FileNotFoundError:
        return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['notify', 'reboot'])
    parser.add_argument('--reboot-time', default='05:00')
    args = parser.parse_args()
    now = datetime.now(JST)
    boot_id = BOOT_ID.read_text().strip()
    plan = read_plan()

    if args.action == 'reboot':
        if may_reboot(plan, now, boot_id, REQUIRED.exists()):
            subprocess.run(['systemctl', 'reboot'], check=True)
        else:
            print('No notified reboot due in this window')
        return

    if not REQUIRED.exists():
        STATE.unlink(missing_ok=True)
        print('No reboot required; no notification sent')
        return
    target = target_time(now, args.reboot_time)
    new_plan = {'target': target.isoformat(), 'boot_id': boot_id}
    if plan == new_plan:
        print('Reboot notification already delivered')
        return
    credentials = Path(os.environ['CREDENTIALS_DIRECTORY'])
    webhook = (credentials / 'discord-webhook').read_text().strip()
    message = (
        '【再起動予定】dev-app-server\n'
        f'パッケージ更新に伴い、{target:%Y-%m-%d %H:%M}（日本時間）に'
        '自動再起動します。\nログイン中でも再起動するため、作業は事前に保存してください。'
    )
    send_discord(webhook, message)
    temporary = STATE.with_suffix('.tmp')
    temporary.write_text(json.dumps(new_plan) + '\n')
    temporary.replace(STATE)
    print(f'Reboot notified for {target.isoformat()}')


if __name__ == '__main__':
    main()
