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

from netmiko import ConnectHandler


def to_ix_mac(mac: str) -> str:
    """任意形式のMAC -> NEC IX形式 (xxxx.xxxx.xxxx) に変換"""
    clean = mac.replace(":", "").replace("-", "").replace(".", "").lower()
    if len(clean) != 12:
        raise ValueError(f"Invalid MAC address: {mac}")
    return f"{clean[0:4]}.{clean[4:8]}.{clean[8:12]}"


def parse_existing_assignments(config_output: str) -> dict[str, str]:
    """show ip dhcp profile の Fixed assignments テーブルから ip -> mac (IX形式) の辞書で返す"""
    result: dict[str, str] = {}
    in_fixed = False
    ip_mac_pattern = re.compile(
        r"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([0-9a-fA-F]{2}(?::[0-9a-fA-F]{2}){5})"
    )
    for line in config_output.splitlines():
        if "Fixed assignments" in line:
            in_fixed = True
            continue
        if "Dynamic assignments" in line:
            in_fixed = False
            continue
        if in_fixed:
            m = ip_mac_pattern.search(line)
            if m:
                result[m.group(1)] = to_ix_mac(m.group(2))
    return result


def main() -> None:
    host = os.environ["IX2215_HOST"]
    username = os.environ["IX2215_USER"]
    password = os.environ["IX2215_PASSWORD"]
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

    device = {
        "device_type": "nec_ix",
        "host": host,
        "username": username,
        "password": password,
    }

    with ConnectHandler(**device) as conn:
        conn.config_mode()
        output = conn.send_command(f"show ip dhcp profile {dhcp_profile}", read_timeout=60)
        conn.exit_config_mode()
        existing = parse_existing_assignments(output)

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
