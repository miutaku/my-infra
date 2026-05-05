#!/usr/bin/env python3
"""
NEC IX2215 DHCP 静的リース設定スクリプト (netmiko nec_ix 使用)
Ansible の roles/dhcp_static_lease から呼び出される。

環境変数:
  IX2215_HOST           - ルーター管理 IP
  IX2215_USER           - SSHユーザー名
  IX2215_PASSWORD       - SSHパスワード (BSMから取得)
  DHCP_PROFILE          - DHCPプロファイル名 (デフォルト: main)
  DHCP_ASSIGNMENTS_JSON - JSON配列 [{name, ip, mac}, ...]
  DRY_RUN               - "true" の場合は変更せず差分のみ表示 (デフォルト: false)
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config


def to_ix_mac(mac: str) -> str:
    """任意形式のMAC -> NEC IX形式 (xxxx.xxxx.xxxx) に変換"""
    clean = mac.replace(":", "").replace("-", "").replace(".", "").lower()
    if len(clean) != 12:
        raise ValueError(f"Invalid MAC address: {mac}")
    return f"{clean[0:4]}.{clean[4:8]}.{clean[8:12]}"


def parse_existing_assignments(running: str, dhcp_profile: str) -> dict[str, str]:
    """running-config の ip dhcp profile ブロックから fixed-assignment を ip -> mac (IX形式) の辞書で返す。

    show ip dhcp profile コマンドは fixed-assignment を表示しないため running-config をパースする。
    """
    block_match = re.search(
        r"^ip dhcp profile " + re.escape(dhcp_profile) + r"\n((?:[ \t]+.*\n)*)",
        running,
        re.MULTILINE,
    )
    if not block_match:
        return {}

    fixed_pattern = re.compile(
        r"fixed-assignment\s+"
        r"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+"
        r"([0-9a-fA-F]{4}\.[0-9a-fA-F]{4}\.[0-9a-fA-F]{4}"
        r"|[0-9a-fA-F]{2}(?::[0-9a-fA-F]{2}){5})"
    )
    result: dict[str, str] = {}
    for line in block_match.group(1).splitlines():
        m = fixed_pattern.search(line)
        if m:
            result[m.group(1)] = to_ix_mac(m.group(2))
    return result


def main() -> None:
    dhcp_profile = os.environ.get("DHCP_PROFILE", "main")
    assignments_raw = json.loads(os.environ["DHCP_ASSIGNMENTS_JSON"])
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"

    # MAC を NEC IX 形式に正規化 (無効な値はスキップして警告)
    assignments = []
    for a in assignments_raw:
        try:
            assignments.append({"name": a["name"], "ip": a["ip"], "mac": to_ix_mac(a["mac"])})
        except ValueError:
            print(f"SKIP {a['name']}: invalid MAC '{a['mac']}' (update group_vars/all.yml)", flush=True)

    with connect() as conn:
        running = get_running_config(conn)

    existing = parse_existing_assignments(running, dhcp_profile)

    missing = [
        a for a in assignments
        if existing.get(a["ip"]) != a["mac"]
    ]

    if not missing:
        dry = " dry_run=true" if dry_run else ""
        print(f"changed=false{dry} msg='All DHCP static leases already configured'")
        return

    names = [a["name"] for a in missing]

    if dry_run:
        print(f"changed=false dry_run=true msg='Would add {len(missing)} DHCP lease(s): {names}'")
        for a in missing:
            print(f"  + fixed-assignment {a['ip']} {a['mac']}  # {a['name']}")
        return

    config_commands = [f"ip dhcp profile {dhcp_profile}"]
    for a in missing:
        config_commands.append(f"  fixed-assignment {a['ip']} {a['mac']}")
    config_commands.append("  exit")

    with connect() as conn:
        conn.send_config_set(config_commands)
        conn.save_config()

    print(f"changed=true msg='Added {len(missing)} DHCP lease(s): {names}'")


if __name__ == "__main__":
    try:
        main()
    except KeyError as e:
        print(f"changed=false failed=true msg='Missing environment variable: {e}'")
        sys.exit(1)
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
