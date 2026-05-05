#!/usr/bin/env python3
"""
DNS name-server / cache / proxy-dns 設定
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD, DRY_RUN
         IX_DNS_V4_JSON, IX_DNS_V6_JSON, IX_DNS_CACHE_JSON, IX_PROXY_DNS_JSON
"""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config, emit


def desired_lines() -> list[str]:
    lines = []

    for ns in json.loads(os.environ.get("IX_DNS_V4_JSON", "[]")):
        lines.append(f"ip name-server {ns}")
    for ns in json.loads(os.environ.get("IX_DNS_V6_JSON", "[]")):
        lines.append(f"ipv6 name-server {ns}")

    cache = json.loads(os.environ.get("IX_DNS_CACHE_JSON", "{}"))
    if cache.get("enable"):
        lines.append("dns cache enable")
    if "max_records" in cache:
        lines.append(f"dns cache max-records {cache['max_records']}")
    if "lifetime" in cache:
        lines.append(f"dns cache lifetime {cache['lifetime']}")
    if "ncache_lifetime" in cache:
        lines.append(f"dns ncache lifetime {cache['ncache_lifetime']}")

    pdns = json.loads(os.environ.get("IX_PROXY_DNS_JSON", "{}"))
    if pdns.get("ip_enable"):
        lines.append("proxy-dns ip enable")
    if "ip_request" in pdns:
        lines.append(f"proxy-dns ip request {pdns['ip_request']}")
    if pdns.get("ipv6_enable"):
        lines.append("proxy-dns ipv6 enable")

    return lines


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "false").lower() == "true"

    want = desired_lines()

    with connect() as conn:
        running = get_running_config(conn)

    missing = [l for l in want if l not in running]

    if not missing:
        emit(False, dry_run, "DNS already configured")
        return

    if dry_run:
        emit(False, True, f"Would apply {len(missing)} line(s)", [f"+ {l}" for l in missing])
        return

    with connect() as conn:
        conn.send_config_set(missing)
        conn.save_config()

    emit(True, False, f"Applied {len(missing)} DNS line(s)")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"changed=false failed=true msg='{e}'")
        sys.exit(1)
