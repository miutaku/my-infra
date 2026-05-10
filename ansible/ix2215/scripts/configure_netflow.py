#!/usr/bin/env python3
"""
NetFlow v9 エクスポート設定
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_NETFLOW_JSON
  ix_netflow:
    version: 9
    destination_ip: "192.168.20.210"
    destination_port: 2055
    interfaces: ["GigaEthernet0.0", "Tunnel0.0"]
"""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def desired_lines(cfg: dict) -> list[str]:
    lines = []

    version = cfg.get("version", 9)
    dest_ip = cfg["destination_ip"]
    dest_port = cfg.get("destination_port", 2055)

    lines.append("ip route-cache flow")
    lines.append(f"ip flow-export version {version}")
    lines.append(f"ip flow-export destination {dest_ip} {dest_port}")

    return lines


def desired_interface_lines(cfg: dict) -> dict[str, list[str]]:
    """インターフェース名 → 追加すべき行 のマップを返す"""
    result = {}
    for iface in cfg.get("interfaces", []):
        result[iface] = ["ip route-cache flow"]
    return result


def collect_interface_config(running: str) -> dict[str, list[str]]:
    """running-config からインターフェースブロックを解析して { iface: [lines] } を返す"""
    iface_blocks: dict[str, list[str]] = {}
    current = None
    for raw in running.splitlines():
        line = raw.strip()
        if line.startswith("interface "):
            current = line[len("interface "):]
            iface_blocks[current] = []
        elif line in ("!", "exit") and current:
            current = None
        elif current:
            iface_blocks[current].append(line)
    return iface_blocks


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"

    cfg = json.loads(os.environ.get("IX_NETFLOW_JSON", "{}"))
    if not cfg or not cfg.get("destination_ip"):
        emit(False, dry_run, "ix_netflow not configured, skipping")
        return

    want_global = desired_lines(cfg)
    want_iface = desired_interface_lines(cfg)

    with connect() as conn:
        running = get_running_config(conn)

    missing_global = [l for l in want_global if l not in running]
    iface_blocks = collect_interface_config(running)

    missing_iface: list[str] = []
    for iface, lines in want_iface.items():
        existing = iface_blocks.get(iface, [])
        for l in lines:
            if l not in existing:
                missing_iface.append(f"interface {iface}")
                missing_iface.append(f" {l}")
                missing_iface.append("exit")

    all_missing = missing_global + missing_iface

    if not all_missing:
        emit(False, dry_run, "NetFlow already configured")
        return

    diff = [f"+ {l}" for l in all_missing]

    if dry_run:
        emit(True, True, f"Would apply {len(all_missing)} line(s)", diff)
        return

    with connect() as conn:
        conn.send_config_set(all_missing)
        conn.save_config()

    emit(True, False, f"Applied {len(all_missing)} NetFlow line(s)", diff)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
