#!/usr/bin/env python3
"""
timezone / logging / NTP / SNMP / SSH / HTTP / VRRP / bridge IRB / DHCP enable 設定
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_TIMEZONE, IX_LOGGING_JSON, IX_NTP_SERVERS_JSON
         IX_SNMP_COMMUNITIES_JSON, IX_SYSTEM_SERVICES_JSON
"""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def desired_lines() -> list[str]:
    lines = []

    tz = os.environ.get("IX_TIMEZONE", "+09 00")
    lines.append(f"timezone {tz}")

    for entry in json.loads(os.environ.get("IX_LOGGING_JSON", "[]")):
        lines.append(f"logging {entry}")

    ntp_servers = json.loads(os.environ.get("IX_NTP_SERVERS_JSON", "[]"))
    if ntp_servers:
        lines.append("ntp ip enable")
        for s in ntp_servers:
            lines.append(f"ntp server {s}")

    communities = json.loads(os.environ.get("IX_SNMP_COMMUNITIES_JSON", "[]"))
    if communities:
        lines.append("snmp-agent ip enable")
        for c in communities:
            lines.append(f"snmp-agent ip community {c}")

    svc = json.loads(os.environ.get("IX_SYSTEM_SERVICES_JSON", "{}"))
    if svc.get("bridge_irb"):
        lines.append("bridge irb enable")
    if svc.get("ip_dhcp"):
        lines.append("ip dhcp enable")
    if svc.get("ipv6_dhcp"):
        lines.append("ipv6 dhcp enable")
    if svc.get("vrrp"):
        lines.append("vrrp enable")
    if svc.get("ssh_server_ip"):
        lines.append("ssh-server ip enable")
    if svc.get("http_server_username"):
        lines.append(f"http-server username {svc['http_server_username']}")
    if svc.get("http_server_ip"):
        lines.append("http-server ip enable")
    if svc.get("nm_ip"):
        lines.append("nm ip enable")

    return lines


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"

    want = desired_lines()

    with connect() as conn:
        running = get_running_config(conn)

    missing = [l for l in want if l not in running]

    if not missing:
        emit(False, dry_run, "System base already configured")
        return

    diff = [f"+ {l}" for l in missing]

    if dry_run:
        emit(True, True, f"Would apply {len(missing)} line(s)", diff)
        return

    with connect() as conn:
        conn.send_config_set(missing)
        conn.save_config()

    emit(True, False, f"Applied {len(missing)} system base line(s)", diff)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
