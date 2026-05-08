#!/usr/bin/env python3
"""
running-config を取得して stdout に出力する
環境変数: IX2215_HOST, IX2215_USER, IX2215_PASSWORD
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "lib"))
from ix_connect import connect, get_running_config


def main() -> None:
    with connect() as conn:
        running = get_running_config(conn)
    print(running)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"failed=true msg='{e}'", file=sys.stderr)
        sys.exit(1)
