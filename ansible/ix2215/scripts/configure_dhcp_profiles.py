#!/usr/bin/env python3
"""
DHCP プロファイル (assignable-range / dns-server / gateway / lease-time /
fixed-assignment) および DHCPv6 client/server プロファイル設定
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_DHCP_PROFILES_JSON, IX_DHCPV6_CLIENT_PROFILES_JSON, IX_DHCPV6_SERVER_PROFILES_JSON
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def to_ix_mac(mac: str) -> str:
    """任意形式のMAC -> NEC IX形式 (xxxx.xxxx.xxxx) に変換"""
    clean = mac.replace(":", "").replace("-", "").replace(".", "").lower()
    if len(clean) != 12:
        raise ValueError(f"Invalid MAC address: {mac}")
    return f"{clean[0:4]}.{clean[4:8]}.{clean[8:12]}"


def parse_existing_fixed_assignments(running: str, profile_name: str) -> dict[str, str]:
    """running-config から profile の fixed-assignment を ip -> mac (IX形式) で返す"""
    block_match = re.search(
        r"^ip dhcp profile " + re.escape(profile_name) + r"\n((?:[ \t]+.*\n)*)",
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


def dhcp_profile_setting_lines(profile: dict) -> list[str]:
    """fixed-assignment 以外の設定行を返す"""
    lines = []
    if "assignable_range" in profile:
        lines.append(f"  assignable-range {profile['assignable_range']}")
    if "domain_name" in profile:
        lines.append(f"  domain-name {profile['domain_name']}")
    if "default_gateway" in profile:
        lines.append(f"  default-gateway {profile['default_gateway']}")
    if "dns_server" in profile:
        servers = profile["dns_server"]
        if isinstance(servers, list):
            lines.append(f"  dns-server {' '.join(servers)}")
        else:
            lines.append(f"  dns-server {servers}")
    if "lease_time" in profile:
        lines.append(f"  lease-time {profile['lease_time']}")
    return lines


def dhcpv6_client_lines(profile: dict) -> list[str]:
    lines = []
    if profile.get("information_request"):
        lines.append("  information-request")
    if "option_request" in profile:
        lines.append(f"  option-request {profile['option_request']}")
    return lines


def dhcpv6_server_lines(profile: dict) -> list[str]:
    lines = []
    if "dns_server" in profile:
        lines.append(f"  dns-server {profile['dns_server']}")
    return lines


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"
    profiles = json.loads(os.environ.get("IX_DHCP_PROFILES_JSON", "[]"))
    v6_client_profiles = json.loads(os.environ.get("IX_DHCPV6_CLIENT_PROFILES_JSON", "[]"))
    v6_server_profiles = json.loads(os.environ.get("IX_DHCPV6_SERVER_PROFILES_JSON", "[]"))

    with connect() as conn:
        running = get_running_config(conn)

    missing_cmds: list[str] = []
    diff: list[str] = []

    # IPv4 DHCP profiles
    for p in profiles:
        setting_lines = dhcp_profile_setting_lines(p)
        missing_settings = [l for l in setting_lines if l.strip() not in running]

        existing_fas = parse_existing_fixed_assignments(running, p["name"])
        desired_ips = {fa["ip"] for fa in p.get("fixed_assignments", [])}

        add_fas: list[str] = []
        for fa in p.get("fixed_assignments", []):
            ix_mac = to_ix_mac(fa["mac"])
            if existing_fas.get(fa["ip"]) != ix_mac:
                add_fas.append(f"  fixed-assignment {fa['ip']} {ix_mac}")

        # running-config にあるが desired にないエントリを削除
        remove_fas: list[tuple[str, str]] = [
            (ip, mac) for ip, mac in existing_fas.items() if ip not in desired_ips
        ]

        profile_changes = missing_settings + add_fas + [
            f"  no fixed-assignment {ip} {mac}" for ip, mac in remove_fas
        ]
        if profile_changes:
            missing_cmds += [f"ip dhcp profile {p['name']}"] + profile_changes + ["  exit"]
            diff.append(f"ip dhcp profile {p['name']}:")
            diff += [f"  + {l.strip()}" for l in missing_settings + add_fas]
            diff += [f"  - fixed-assignment {ip} {mac}" for ip, mac in remove_fas]

    # DHCPv6 client profiles
    for p in v6_client_profiles:
        setting_lines = dhcpv6_client_lines(p)
        missing = [l for l in setting_lines if l.strip() not in running]
        if missing:
            missing_cmds += [f"ipv6 dhcp client-profile {p['name']}"] + missing + ["  exit"]
            diff += [f"+ {l.strip()}" for l in missing]

    # DHCPv6 server profiles
    for p in v6_server_profiles:
        setting_lines = dhcpv6_server_lines(p)
        missing = [l for l in setting_lines if l.strip() not in running]
        if missing:
            missing_cmds += [f"ipv6 dhcp server-profile {p['name']}"] + missing + ["  exit"]
            diff += [f"+ {l.strip()}" for l in missing]

    if not missing_cmds:
        emit(False, dry_run, "DHCP/DHCPv6 profiles already configured")
        return

    if dry_run:
        emit(True, True, "Would apply DHCP/DHCPv6 profile settings", diff)
        return

    with connect() as conn:
        conn.send_config_set(missing_cmds)
        conn.save_config()

    emit(True, False, "Applied DHCP/DHCPv6 profile settings", diff)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
