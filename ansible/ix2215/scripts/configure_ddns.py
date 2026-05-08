#!/usr/bin/env python3
"""
DDNS 設定 (ddns enable + ddns profile ブロック)
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_DDNS_ENABLE, IX_DDNS_PROFILES_JSON, IX_DDNS_QUERY
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def get_ddns_profile_block(running: str, name: str) -> str:
    m = re.search(
        r"^ddns profile " + re.escape(name) + r"\n((?:[ \t]+.*\n)*)",
        running,
        re.MULTILINE,
    )
    return m.group(0) if m else ""


def profile_lines(p: dict, query: str) -> list[str]:
    lines = []
    if p.get("url"):
        lines.append(f"  url {p['url']}")
    if query:
        lines.append(f"  query {query}")
    if p.get("transport"):
        lines.append(f"  transport {p['transport']}")
    if p.get("source_interface"):
        lines.append(f"  source-interface {p['source_interface']}")
    if p.get("update_interval") is not None:
        lines.append(f"  update-interval {p['update_interval']}")
    return lines


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"
    ddns_enable = os.environ.get("IX_DDNS_ENABLE", "false").lower() == "true"
    profiles = json.loads(os.environ.get("IX_DDNS_PROFILES_JSON", "[]"))
    query = os.environ.get("IX_DDNS_QUERY", "").strip()

    with connect() as conn:
        running = get_running_config(conn)

    missing_global: list[str] = []
    missing_blocks: list[tuple[str, list[str]]] = []

    if ddns_enable and "ddns enable" not in running:
        missing_global.append("ddns enable")

    for p in profiles:
        lines = profile_lines(p, query)
        block = get_ddns_profile_block(running, p["name"])
        missing = [l for l in lines if l.strip() not in block]
        if missing:
            missing_blocks.append((f"ddns profile {p['name']}", missing))

    if not missing_global and not missing_blocks:
        emit(False, dry_run, "DDNS already configured")
        return

    diff = [f"+ {l}" for l in missing_global]
    for name, lines in missing_blocks:
        diff.append(f"{name}:")
        diff.extend([f"  + {l.strip()}" for l in lines])

    total = len(missing_global) + len(missing_blocks)

    if dry_run:
        emit(False, True, f"Would apply {total} DDNS change(s)", diff)
        return

    cmds = list(missing_global)
    for name, lines in missing_blocks:
        cmds += [name] + lines + ["  exit"]

    with connect() as conn:
        conn.send_config_set(cmds)
        conn.save_config()

    emit(True, False, f"Applied {total} DDNS change(s)")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
