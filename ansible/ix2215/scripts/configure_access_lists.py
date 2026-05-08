#!/usr/bin/env python3
"""
ip/ipv6 access-list 設定
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_ACL_JSON, IX_IPV6_ACL_JSON
"""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def desired_lines() -> list[str]:
    lines = []

    for acl in json.loads(os.environ.get("IX_ACL_JSON", "[]")):
        for entry in acl["entries"]:
            lines.append(f"ip access-list {acl['name']} {entry}")

    for acl in json.loads(os.environ.get("IX_IPV6_ACL_JSON", "[]")):
        for entry in acl.get("entries", []):
            lines.append(f"ipv6 access-list {acl['name']} {entry}")
        for s in acl.get("special", []):
            lines.append(f"ipv6 access-list {acl['name']} {s}")

    return lines


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"

    want = desired_lines()

    with connect() as conn:
        running = get_running_config(conn)

    missing = [l for l in want if l not in running]

    if not missing:
        emit(False, dry_run, "Access lists already configured")
        return

    diff = [f"+ {l}" for l in missing]

    if dry_run:
        emit(True, True, f"Would apply {len(missing)} line(s)", diff)
        return

    with connect() as conn:
        conn.send_config_set(missing)
        conn.save_config()

    emit(True, False, f"Applied {len(missing)} access-list line(s)", diff)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
