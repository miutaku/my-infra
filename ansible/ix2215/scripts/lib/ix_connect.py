"""NEC IX2215 netmiko 接続ヘルパー"""

import os
import sys

from netmiko import ConnectHandler


def connect() -> "ConnectHandler":
    return ConnectHandler(
        device_type="nec_ix",
        host=os.environ["IX2215_HOST"],
        username=os.environ["IX2215_USER"],
        password=os.environ["IX2215_PASSWORD"],
    )


def get_running_config(conn: "ConnectHandler") -> str:
    """config モードで sh run を実行して running-config テキストを返す"""
    conn.config_mode()
    output = conn.send_command("sh run", read_timeout=60)
    conn.exit_config_mode()
    return output


def emit(changed: bool, dry_run: bool, msg: str, diff_lines: list[str] | None = None) -> None:
    flag = "true" if changed else "false"
    dry = " dry_run=true" if dry_run else ""
    print(f"changed={flag}{dry} msg='{msg}'")
    if diff_lines:
        for line in diff_lines:
            print(f"  {line}")
    sys.stdout.flush()


def get_device_env() -> dict:
    return {
        "device_type": "nec_ix",
        "host": os.environ["IX2215_HOST"],
        "username": os.environ["IX2215_USER"],
        "password": os.environ["IX2215_PASSWORD"],
    }
