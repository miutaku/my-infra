#!/usr/bin/env python3
"""
インターフェース設定 (4-over-6 Tunnel0.0 含む)
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_INTERFACES_JSON
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def get_interface_block(running: str, iface_name: str) -> str:
    """running-config から特定インターフェースのブロックのみ抽出する。

    全体の文字列で検索すると 'no shutdown' や 'ipv6 enable' が別インターフェースに
    存在するため false-positive が発生する。インターフェース単位で照合することで
    それを防ぐ。
    """
    m = re.search(
        r"^interface " + re.escape(iface_name) + r"\n((?:[ \t]+.*\n)*)",
        running,
        re.MULTILINE,
    )
    return m.group(0) if m else ""


def iface_lines(iface: dict) -> list[str]:
    lines = []

    if iface.get("description"):
        lines.append(f"  description {iface['description']}")
    if iface.get("encapsulation"):
        lines.append(f"  encapsulation {iface['encapsulation']}")
    if iface.get("tunnel_mode"):
        lines.append(f"  tunnel mode {iface['tunnel_mode']}")
    if iface.get("tunnel_destination"):
        lines.append(f"  tunnel destination {iface['tunnel_destination']}")
    if iface.get("tunnel_source"):
        lines.append(f"  tunnel source {iface['tunnel_source']}")
    if iface.get("ip_address"):
        lines.append(f"  ip address {iface['ip_address']}")
    if iface.get("ip_unnumbered"):
        lines.append(f"  ip unnumbered {iface['ip_unnumbered']}")
    if iface.get("ip_dhcp_binding"):
        lines.append(f"  ip dhcp binding {iface['ip_dhcp_binding']}")
    if iface.get("ip_filter_in"):
        f = iface["ip_filter_in"]
        lines.append(f"  ip filter {f['list']} {f['seq']} in")
    if iface.get("ip_tcp_adjust_mss"):
        lines.append(f"  ip tcp adjust-mss {iface['ip_tcp_adjust_mss']}")
    if iface.get("ip_napt_enable"):
        lines.append("  ip napt enable")
    if iface.get("ip_napt_eim_mode"):
        lines.append("  ip napt eim-mode")
    if iface.get("ipv6_enable"):
        lines.append("  ipv6 enable")
    if iface.get("ipv6_interface_identifier"):
        lines.append(f"  ipv6 interface-identifier {iface['ipv6_interface_identifier']}")
    if iface.get("ipv6_dhcp_client"):
        lines.append(f"  ipv6 dhcp client {iface['ipv6_dhcp_client']}")
    if iface.get("ipv6_dhcp_server"):
        lines.append(f"  ipv6 dhcp server {iface['ipv6_dhcp_server']}")
    if iface.get("ipv6_nd_proxy"):
        lines.append(f"  ipv6 nd proxy {iface['ipv6_nd_proxy']}")
    if iface.get("ipv6_nd_ra"):
        lines.append("  ipv6 nd ra enable")
    if iface.get("ipv6_nd_ra_other_config_flag"):
        lines.append("  ipv6 nd ra other-config-flag")
    for f in iface.get("ipv6_filters_in", []):
        lines.append(f"  ipv6 filter {f['list']} {f['seq']} in")
    for f in iface.get("ipv6_filters_out", []):
        lines.append(f"  ipv6 filter {f['list']} {f['seq']} out")
    if iface.get("bridge_group"):
        lines.append(f"  bridge-group {iface['bridge_group']}")
    if iface.get("http_server_ip_enable"):
        lines.append("  http-server ip enable")
    if iface.get("auto_connect"):
        lines.append("  auto-connect")

    if iface.get("shutdown"):
        lines.append("  shutdown")
    else:
        lines.append("  no shutdown")

    return lines


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"
    ifaces = json.loads(os.environ.get("IX_INTERFACES_JSON", "[]"))

    with connect() as conn:
        running = get_running_config(conn)

    missing_blocks: list[tuple[str, list[str]]] = []

    for iface in ifaces:
        lines = iface_lines(iface)
        iface_block = get_interface_block(running, iface["name"])
        missing = [l for l in lines if l.strip() not in iface_block]
        if missing:
            missing_blocks.append((f"interface {iface['name']}", missing))

    if not missing_blocks:
        emit(False, dry_run, "Interfaces already configured")
        return

    diff = []
    for name, lines in missing_blocks:
        diff.append(f"{name}:")
        diff.extend([f"  + {l.strip()}" for l in lines])

    if dry_run:
        emit(True, True, f"Would update {len(missing_blocks)} block(s)", diff)
        return

    # 1インターフェースずつ送信する。一括送信するとNEC IXがBVI/サブインターフェース
    # 作成時に出力するメッセージでNetmikoのプロンプト検出が失敗するため。
    with connect() as conn:
        for iface in ifaces:
            lines = iface_lines(iface)
            iface_block = get_interface_block(running, iface["name"])
            missing = [l for l in lines if l.strip() not in iface_block]
            if missing:
                cmds = [f"interface {iface['name']}"] + missing + ["  exit"]
                conn.send_config_set(cmds, read_timeout=60, cmd_verify=False)

        conn.save_config()

    emit(True, False, f"Updated {len(missing_blocks)} block(s)", diff)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
