#!/usr/bin/env python3
"""
OCI Site-to-Site VPN — IKEv2 グローバル設定
  ikev2 authentication psk + ikev2 default-profile ブロックのみ担当。
  Tunnel2.0 インターフェース → configure_interfaces.py (ix_interfaces に定義)
  ip route 10.0.0.0/16 Tunnel2.0 → configure_static_routes.py (ix_static_routes_v4 に定義)

参考: https://docs.oracle.com/ja-jp/iaas/Content/Network/Reference/necixCPE.htm

環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         VPN_OCI_JSON  {oci_tunnel_ip, psk, outgoing_interface}
"""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def ike_global_lines(cfg: dict) -> list[str]:
    """ikev2 default-profile ブロックを含むフラットなコマンドリストを返す。
    send_config_set でそのまま送信できる形式。
    """
    return [
        # PSK: running-config ではマスクされる可能性があるため別途チェック
        f"ikev2 authentication psk id ipv4 {cfg['oci_tunnel_ip']} key char {cfg['psk']}",
        # default-profile ブロック (sub-mode)
        "ikev2 default-profile",
        "  dpd interval 10",
        f"  source-address {cfg['outgoing_interface']}",
        "  child-pfs 1536-bit",
        "  child-proposal enc aes-cbc-256",
        "  child-proposal integrity sha1",
        "  sa-proposal enc aes-cbc-256",
        "  sa-proposal integrity sha2-384",
        "  sa-proposal dh 1536-bit",
        "  exit",
    ]


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"
    cfg = json.loads(os.environ["VPN_OCI_JSON"])

    with connect() as conn:
        running = get_running_config(conn)

    # default-profile 内のアルゴリズム行でコンフィグ適用済みか判断
    profile_check_lines = [
        "dpd interval 10",
        f"source-address {cfg['outgoing_interface']}",
        "child-pfs 1536-bit",
        "child-proposal enc aes-cbc-256",
        "child-proposal integrity sha1",
        "sa-proposal enc aes-cbc-256",
        "sa-proposal integrity sha2-384",
        "sa-proposal dh 1536-bit",
    ]
    missing_profile = [l for l in profile_check_lines if l.strip() not in running]

    # PSK は running-config でマスクされる ("key ****") ため存在確認のみ
    psk_applied = f"ikev2 authentication psk id ipv4 {cfg['oci_tunnel_ip']}" in running

    if not missing_profile and psk_applied:
        emit(False, dry_run, "VPN OCI IKEv2 global config already applied")
        return

    diff = []
    if not psk_applied:
        diff.append(f"+ ikev2 authentication psk id ipv4 {cfg['oci_tunnel_ip']} key char ****")
    diff += [f"+ {l.strip()}" for l in missing_profile]

    if dry_run:
        emit(True, True, "Would apply IKEv2 global config", diff)
        return

    with connect() as conn:
        conn.send_config_set(ike_global_lines(cfg), read_timeout=60, cmd_verify=False)
        conn.save_config()

    emit(True, False, f"Applied IKEv2 global config ({len(diff)} change(s))", diff)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
