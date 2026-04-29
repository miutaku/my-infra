#!/usr/bin/env python3
"""
NEC IX2215 DHCP 静的リース設定スクリプト (netmiko nec_ix 使用)
Ansible の roles/dhcp_static_lease から呼び出される。

環境変数:
  IX2215_HOST     - ルーター管理 IP
  IX2215_USER     - SSHユーザー名
  IX2215_PASSWORD - SSHパスワード (BSMから取得)
  DHCP_PROFILE    - DHCPプロファイル名 (デフォルト: main)
  DHCP_ASSIGNMENTS_JSON - JSON配列 [{name, ip, mac}, ...]
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
    """running-config から fixed-assignment を ip -> mac の辞書で返す"""
    pattern = r"fixed-assignment\s+(\S+)\s+(\S+)"
    return {ip: mac for ip, mac in re.findall(pattern, config_output)}


def main() -> None:
    host = os.environ["IX2215_HOST"]
    username = os.environ["IX2215_USER"]
    password = os.environ["IX2215_PASSWORD"]
    dhcp_profile = os.environ.get("DHCP_PROFILE", "main")
    assignments_raw = json.loads(os.environ["DHCP_ASSIGNMENTS_JSON"])

    # MAC を NEC IX 形式に正規化
    assignments = [
        {"name": a["name"], "ip": a["ip"], "mac": to_ix_mac(a["mac"])}
        for a in assignments_raw
    ]

    device = {
        "device_type": "nec_ix",
        "host": host,
        "username": username,
        "password": password,
    }

    with ConnectHandler(**device) as conn:
        output = conn.send_command("show running-config")
        existing = parse_existing_assignments(output)

        missing = [
            a for a in assignments
            if existing.get(a["ip"]) != a["mac"]
        ]

        if not missing:
            print("changed=false msg='All DHCP static leases already configured'")
            return

        config_commands = [f"ip dhcp profile {dhcp_profile}"]
        for a in missing:
            config_commands.append(f"  fixed-assignment {a['ip']} {a['mac']}")
        config_commands.append("  exit")

        conn.send_config_set(config_commands)
        conn.save_config()

        names = [a["name"] for a in missing]
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
