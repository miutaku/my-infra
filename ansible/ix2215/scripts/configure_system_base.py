#!/usr/bin/env python3
"""
timezone / logging / NTP / SNMP / SSH / HTTP / VRRP / bridge IRB / DHCP enable/binding /
prefix-list / utm group / nm account 設定
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_TIMEZONE, IX_LOGGING_JSON, IX_NTP_SERVERS_JSON
         IX_SNMP_COMMUNITIES_JSON, IX_SYSTEM_SERVICES_JSON
         IX_DHCP_GLOBAL_BINDINGS_JSON
         IX_UTM_GROUPS_JSON
         IX_NM_ACCOUNT_JSON, IX_NM_ACCOUNT_PASSWORD
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def get_block(running: str, header: str) -> str:
    m = re.search(
        r"^" + re.escape(header) + r"\n((?:[ \t]+.*\n)*)",
        running,
        re.MULTILINE,
    )
    return m.group(0) if m else ""


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

    for binding in json.loads(os.environ.get("IX_DHCP_GLOBAL_BINDINGS_JSON", "[]")):
        lines.append(f"ip dhcp binding {binding}")

    nm_acct = json.loads(os.environ.get("IX_NM_ACCOUNT_JSON", "null") or "null")
    nm_password = os.environ.get("IX_NM_ACCOUNT_PASSWORD", "").strip()
    if nm_acct and nm_password:
        lines.append(f"nm account {nm_acct['name']} password secret {nm_password}")

    return lines


def desired_utm_blocks() -> list[tuple[str, list[str]]]:
    groups = json.loads(os.environ.get("IX_UTM_GROUPS_JSON", "[]"))
    result = []
    for g in groups:
        header = f"utm group {g['id']}"
        block_lines = []
        if "description" in g:
            block_lines.append(f"  description ascii {g['description']}")
        result.append((header, block_lines))
    return result


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"

    want = desired_lines()
    utm_blocks = desired_utm_blocks()

    with connect() as conn:
        running = get_running_config(conn)

    missing_global = [l for l in want if l not in running]

    missing_blocks: list[tuple[str, list[str]]] = []
    for header, block_lines in utm_blocks:
        block = get_block(running, header)
        missing = [l for l in block_lines if l.strip() not in block]
        if missing:
            missing_blocks.append((header, missing))

    if not missing_global and not missing_blocks:
        emit(False, dry_run, "System base already configured")
        return

    diff = [f"+ {l}" for l in missing_global]
    for header, lines in missing_blocks:
        diff.append(f"{header}:")
        diff.extend([f"  + {l.strip()}" for l in lines])

    total = len(missing_global) + len(missing_blocks)

    if dry_run:
        emit(True, True, f"Would apply {total} change(s)", diff)
        return

    cmds = list(missing_global)
    for header, lines in missing_blocks:
        cmds += [header] + lines + ["  exit"]

    with connect() as conn:
        conn.send_config_set(cmds)
        conn.save_config()

    emit(True, False, f"Applied {total} system base change(s)", diff)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
