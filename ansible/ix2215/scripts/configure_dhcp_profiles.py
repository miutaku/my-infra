#!/usr/bin/env python3
"""
DHCP プロファイル (assignable-range / dns-server / gateway / lease-time) および
DHCPv6 client/server プロファイル設定
fixed-assignment は dhcp_static_lease ロールで管理するため対象外
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_DHCP_PROFILES_JSON, IX_DHCPV6_CLIENT_PROFILES_JSON, IX_DHCPV6_SERVER_PROFILES_JSON
"""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def dhcp_profile_lines(profile: dict) -> list[str]:
    """プロファイル設定行を返す (fixed-assignment は除く)"""
    lines = []
    if "assignable_range" in profile:
        lines.append(f"  assignable-range {profile['assignable_range']}")
    if "default_gateway" in profile:
        lines.append(f"  default-gateway {profile['default_gateway']}")
    if "dns_server" in profile:
        lines.append(f"  dns-server {profile['dns_server']}")
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

    # IPv4 DHCP profiles
    for p in profiles:
        setting_lines = dhcp_profile_lines(p)
        missing = [l for l in setting_lines if l.strip() not in running]
        if missing:
            missing_cmds.append(f"ip dhcp profile {p['name']}")
            missing_cmds.extend(missing)
            missing_cmds.append("  exit")

    # DHCPv6 client profiles
    for p in v6_client_profiles:
        setting_lines = dhcpv6_client_lines(p)
        missing = [l for l in setting_lines if l.strip() not in running]
        if missing:
            missing_cmds.append(f"ipv6 dhcp client-profile {p['name']}")
            missing_cmds.extend(missing)
            missing_cmds.append("  exit")

    # DHCPv6 server profiles
    for p in v6_server_profiles:
        setting_lines = dhcpv6_server_lines(p)
        missing = [l for l in setting_lines if l.strip() not in running]
        if missing:
            missing_cmds.append(f"ipv6 dhcp server-profile {p['name']}")
            missing_cmds.extend(missing)
            missing_cmds.append("  exit")

    if not missing_cmds:
        emit(False, dry_run, "DHCP/DHCPv6 profiles already configured")
        return

    if dry_run:
        emit(False, True, "Would apply DHCP/DHCPv6 profile settings", [f"+ {c}" for c in missing_cmds])
        return

    with connect() as conn:
        conn.send_config_set(missing_cmds)
        conn.save_config()

    emit(True, False, "Applied DHCP/DHCPv6 profile settings")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
