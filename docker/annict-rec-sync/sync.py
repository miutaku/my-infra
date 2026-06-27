"""Annict 視聴リスト連動 EPGStation 自動録画同期ジョブ.

今期(現在シーズン)の Annict 視聴リストにある作品のうち、契約済みの配信サービス
(dアニメストア / Amazon プライム・ビデオ / Netflix 等) で配信されていない作品だけを
TV から録画するよう EPGStation に番組単位の予約を投入する。

タイトル文字列の表記揺れを避けるため、Annict の各放送(Program)が持つ
「放送局(channel) + 放送開始時刻(startedAt)」を EPGStation の番組表と突合し、
programId 単位で予約する (文字列照合は一切しない)。

CronJob から一発実行される想定。設定はすべて環境変数。
"""

from __future__ import annotations

import json
import logging
import os
import sys
import unicodedata
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

import httpx

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    stream=sys.stdout,
)
log = logging.getLogger("annict-rec-sync")


# --------------------------------------------------------------------------- #
# 設定 (環境変数)
# --------------------------------------------------------------------------- #
def _env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


ANNICT_TOKEN = _env("ANNICT_TOKEN")
ANNICT_GRAPHQL_URL = _env("ANNICT_GRAPHQL_URL", "https://api.annict.com/graphql")
SCRAPER_BASE_URL = _env("SCRAPER_BASE_URL", "http://annict-scraper.app-annict-scraper.svc.cluster.local:8080")
EPGSTATION_BASE_URL = _env("EPGSTATION_BASE_URL", "http://epgstation.app-epgstation.svc.cluster.local:8888")

# 契約済み (= 配信で見れるので録画しない) サービス。正規化部分一致で判定する。
SUBSCRIBED_SERVICES = [
    s for s in (_env("SUBSCRIBED_SERVICES", "dアニメストア,Amazon プライム・ビデオ,Netflix")).split(",") if s.strip()
]

# Annict ライブラリ状態フィルタ (空 = 全ステータス)。例: "WATCHING,WANNA_WATCH"
LIBRARY_STATES = [s.strip() for s in _env("LIBRARY_STATES").split(",") if s.strip()]

# シーズン文字列 (空 = 現在シーズンを自動算出)。例: "2026-spring"
SEASON = _env("SEASON")

# 放送開始時刻の突合許容誤差 (秒)
MATCH_TOLERANCE_SEC = int(_env("MATCH_TOLERANCE_SEC", "300"))

# 末尾切れを許すか
ALLOW_END_LACK = _env("ALLOW_END_LACK", "true").lower() == "true"

# 再放送 (rebroadcast) を録画対象から除外するか
SKIP_REBROADCAST = _env("SKIP_REBROADCAST", "true").lower() == "true"

# channel 名 -> EPGStation channelId の静的マッピング (JSON ファイル)
CHANNEL_MAP_FILE = _env("CHANNEL_MAP_FILE", "/config/channel-map.json")

# True の間は予約を投入せずログのみ
DRY_RUN = _env("DRY_RUN", "true").lower() == "true"

HTTP_TIMEOUT = httpx.Timeout(30.0)


# --------------------------------------------------------------------------- #
# データモデル
# --------------------------------------------------------------------------- #
@dataclass
class Program:
    started_at: datetime
    channel_name: str
    episode_label: str
    rebroadcast: bool = False


@dataclass
class Work:
    annict_id: int
    title: str
    programs: list[Program] = field(default_factory=list)


# --------------------------------------------------------------------------- #
# ユーティリティ
# --------------------------------------------------------------------------- #
def normalize(s: str) -> str:
    """NFKC 正規化 + 空白除去 (全半角/区切りの表記揺れを吸収)."""
    return unicodedata.normalize("NFKC", s).replace(" ", "").replace("　", "").lower()


def current_season() -> str:
    now = datetime.now(timezone.utc).astimezone()
    season = {1: "winter", 2: "winter", 3: "winter",
              4: "spring", 5: "spring", 6: "spring",
              7: "summer", 8: "summer", 9: "summer",
              10: "autumn", 11: "autumn", 12: "autumn"}[now.month]
    return f"{now.year}-{season}"


# --------------------------------------------------------------------------- #
# Annict GraphQL
# --------------------------------------------------------------------------- #
LIBRARY_QUERY = """
query($seasons: [String!], $states: [StatusState!], $after: String) {
  viewer {
    libraryEntries(seasons: $seasons, states: $states, first: 50, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes {
        work {
          annictId
          title
          programs(first: 100) {
            nodes {
              startedAt
              rebroadcast
              channel { name annictId }
              episode { number numberText title }
            }
          }
        }
      }
    }
  }
}
"""


def fetch_library(client: httpx.Client, season: str) -> list[Work]:
    """今期ライブラリの work とその放送予定を取得する."""
    works: list[Work] = []
    after: str | None = None
    while True:
        variables: dict = {"seasons": [season], "after": after}
        if LIBRARY_STATES:
            variables["states"] = LIBRARY_STATES
        resp = client.post(
            ANNICT_GRAPHQL_URL,
            headers={"Authorization": f"Bearer {ANNICT_TOKEN}"},
            json={"query": LIBRARY_QUERY, "variables": variables},
        )
        resp.raise_for_status()
        payload = resp.json()
        if payload.get("errors"):
            raise RuntimeError(f"Annict GraphQL errors: {payload['errors']}")
        entries = payload["data"]["viewer"]["libraryEntries"]
        for node in entries["nodes"]:
            w = node["work"]
            programs: list[Program] = []
            for p in w["programs"]["nodes"]:
                ch = p.get("channel") or {}
                ep = p.get("episode") or {}
                ep_label = ep.get("numberText") or (f"#{ep['number']}" if ep.get("number") else "") or (ep.get("title") or "")
                programs.append(
                    Program(
                        started_at=datetime.fromisoformat(p["startedAt"]),
                        channel_name=ch.get("name", ""),
                        episode_label=ep_label,
                        rebroadcast=bool(p.get("rebroadcast", False)),
                    )
                )
            works.append(Work(annict_id=w["annictId"], title=w["title"], programs=programs))
        page = entries["pageInfo"]
        if not page["hasNextPage"]:
            break
        after = page["endCursor"]
    return works


# --------------------------------------------------------------------------- #
# scraper (配信可否判定)
# --------------------------------------------------------------------------- #
def is_streamable_on_subscription(client: httpx.Client, annict_id: int) -> bool | None:
    """契約済み配信サービスのいずれかで配信中なら True (= 録画不要)。

    判定不能 (scraper エラー等) の場合は None を返し、呼び出し側で録画寄りに倒す。
    """
    try:
        resp = client.get(f"{SCRAPER_BASE_URL}/", params={"id": annict_id})
        resp.raise_for_status()
        services = resp.json().get("services", [])
    except Exception as e:  # noqa: BLE001 - scraper 障害時は判定不能扱い
        log.warning("scraper 呼び出し失敗 (annictId=%s): %s", annict_id, e)
        return None

    subscribed_norm = [normalize(s) for s in SUBSCRIBED_SERVICES]
    for svc in services:
        if not svc.get("available"):
            continue
        name_norm = normalize(svc.get("name", ""))
        if any(sub in name_norm for sub in subscribed_norm):
            return True
    return False


# --------------------------------------------------------------------------- #
# EPGStation
# --------------------------------------------------------------------------- #
def load_channel_map() -> dict[str, int]:
    path = Path(CHANNEL_MAP_FILE)
    if not path.is_file():
        log.warning("channel-map ファイルが見つかりません: %s (全 channel 未マップ扱い)", path)
        return {}
    raw = json.loads(path.read_text(encoding="utf-8"))
    # 正規化キーで引けるようにする
    return {normalize(k): int(v) for k, v in raw.items()}


def fetch_existing_reserve_program_ids(client: httpx.Client) -> set[int]:
    program_ids: set[int] = set()
    offset = 0
    limit = 100
    while True:
        resp = client.get(
            f"{EPGSTATION_BASE_URL}/api/reserves",
            params={"type": "all", "offset": offset, "limit": limit, "isHalfWidth": "true"},
        )
        resp.raise_for_status()
        data = resp.json()
        reserves = data.get("reserves", [])
        for r in reserves:
            if r.get("programId") is not None:
                program_ids.add(int(r["programId"]))
        total = data.get("total", 0)
        offset += limit
        if offset >= total or not reserves:
            break
    return program_ids


def resolve_program_id(client: httpx.Client, channel_id: int, started_at: datetime) -> int | None:
    """channelId + 放送開始時刻(±許容誤差) で EPGStation の番組を探し programId を返す."""
    target = int(started_at.timestamp())
    start_ms = (target - MATCH_TOLERANCE_SEC) * 1000
    end_ms = (target + MATCH_TOLERANCE_SEC) * 1000
    resp = client.get(
        f"{EPGSTATION_BASE_URL}/api/schedule",
        params={
            "startAt": start_ms,
            "endAt": end_ms,
            "isHalfWidth": "true",
            "channelId": channel_id,
        },
    )
    resp.raise_for_status()
    schedules = resp.json()

    best_id: int | None = None
    best_delta = MATCH_TOLERANCE_SEC + 1
    for sched in schedules:
        for prog in sched.get("programs", []):
            if int(prog.get("channelId", -1)) != channel_id:
                continue
            prog_start = int(prog["startAt"]) // 1000
            delta = abs(prog_start - target)
            if delta <= MATCH_TOLERANCE_SEC and delta < best_delta:
                best_delta = delta
                best_id = int(prog["id"])
    return best_id


def add_reserve(client: httpx.Client, program_id: int) -> None:
    body = {"programId": program_id, "allowEndLack": ALLOW_END_LACK}
    resp = client.post(f"{EPGSTATION_BASE_URL}/api/reserves", json=body)
    resp.raise_for_status()


# --------------------------------------------------------------------------- #
# メイン
# --------------------------------------------------------------------------- #
def main() -> int:
    if not ANNICT_TOKEN:
        log.error("ANNICT_TOKEN が未設定です")
        return 2

    season = SEASON or current_season()
    log.info("=== annict-rec-sync 開始 (season=%s, DRY_RUN=%s) ===", season, DRY_RUN)
    log.info("契約済み配信サービス (録画除外): %s", ", ".join(SUBSCRIBED_SERVICES))

    channel_map = load_channel_map()
    log.info("channel-map: %d 局", len(channel_map))

    stats = {"works": 0, "excluded_streaming": 0, "programs": 0, "rebroadcast": 0,
             "reserved": 0, "already": 0, "unmapped": 0, "no_match": 0}
    unmapped_channels: set[str] = set()

    with httpx.Client(timeout=HTTP_TIMEOUT) as client:
        works = fetch_library(client, season)
        stats["works"] = len(works)
        log.info("今期ライブラリ: %d 作品", len(works))

        existing = fetch_existing_reserve_program_ids(client)
        log.info("既存予約 programId: %d 件", len(existing))

        for work in works:
            streamable = is_streamable_on_subscription(client, work.annict_id)
            if streamable is True:
                stats["excluded_streaming"] += 1
                log.info("除外 (配信あり): %s (annictId=%s)", work.title, work.annict_id)
                continue
            reason = "判定不能→録画" if streamable is None else "配信なし→録画"
            log.info("対象 (%s): %s (annictId=%s, %d 放送)",
                     reason, work.title, work.annict_id, len(work.programs))

            for prog in work.programs:
                stats["programs"] += 1
                if SKIP_REBROADCAST and prog.rebroadcast:
                    stats["rebroadcast"] += 1
                    log.info("  再放送スキップ: %s %s ch=%s %s",
                             work.title, prog.episode_label, prog.channel_name,
                             prog.started_at.isoformat())
                    continue
                ch_id = channel_map.get(normalize(prog.channel_name))
                if ch_id is None:
                    stats["unmapped"] += 1
                    unmapped_channels.add(prog.channel_name)
                    log.warning("  未マップ channel: %r (%s %s)",
                                prog.channel_name, work.title, prog.episode_label)
                    continue

                program_id = resolve_program_id(client, ch_id, prog.started_at)
                if program_id is None:
                    stats["no_match"] += 1
                    log.warning("  番組表に一致なし: %s %s ch=%s %s",
                                work.title, prog.episode_label, prog.channel_name,
                                prog.started_at.isoformat())
                    continue

                if program_id in existing:
                    stats["already"] += 1
                    log.info("  予約済み: %s %s (programId=%s)",
                             work.title, prog.episode_label, program_id)
                    continue

                if DRY_RUN:
                    log.info("  [DRY_RUN] 予約予定: %s %s ch=%s %s (programId=%s)",
                             work.title, prog.episode_label, prog.channel_name,
                             prog.started_at.isoformat(), program_id)
                else:
                    add_reserve(client, program_id)
                    existing.add(program_id)
                    log.info("  予約作成: %s %s (programId=%s)",
                             work.title, prog.episode_label, program_id)
                stats["reserved"] += 1

    if unmapped_channels:
        log.warning("未マップ channel 一覧 (channel-map に追記してください): %s",
                    ", ".join(sorted(unmapped_channels)))
    log.info("=== 完了 %s ===", stats)
    return 0


if __name__ == "__main__":
    sys.exit(main())
