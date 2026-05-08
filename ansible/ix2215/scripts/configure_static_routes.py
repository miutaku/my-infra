#!/usr/bin/env python3
"""
ip static route / UFS cache 設定
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_ROUTES_JSON, IX_UFS_MAX, IX_IPV6_UFS_MAX
"""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def desired_lines() -> list[str]:
    lines = [
        f"ip ufs-cache max-entries {os.environ.get('IX_UFS_MAX', '100000')}",
        "ip ufs-cache enable",
        f"ipv6 ufs-cache max-entries {os.environ.get('IX_IPV6_UFS_MAX', '65535')}",
        "ipv6 ufs-cache enable",
        "arp auto-refresh",
    ]

    for r in json.loads(os.environ.get("IX_ROUTES_JSON", "[]")):
        line = f"ip route {r['dest']} {r['gw']}"
        if r.get("metric"):
            line += f" metric {r['metric']}"
        lines.append(line)

    return lines


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"

    want = desired_lines()

    with connect() as conn:
        running = get_running_config(conn)

    missing = [l for l in want if l not in running]

    if not missing:
        emit(False, dry_run, "Static routes already configured")
        return

    diff = [f"+ {l}" for l in missing]

    if dry_run:
        emit(True, True, f"Would apply {len(missing)} line(s)", diff)
        return

    with connect() as conn:
        conn.send_config_set(missing)
        conn.save_config()

    emit(True, False, f"Applied {len(missing)} route/cache line(s)", diff)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
