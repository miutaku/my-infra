"""Annict 今期放送作品連動 EPGStation 自動録画同期ジョブ.

今期(現在シーズン)に放送される Annict 掲載の全作品 (annict.com/works/{season}) の
うち、契約済みの配信サービス (dアニメストア / Amazon プライム・ビデオ / Netflix 等) で
配信されていない作品だけを TV から録画するよう EPGStation に番組単位の予約を投入する。

タイトル文字列の表記揺れを避けるため、Annict の各放送(Program)が持つ
「放送局(channel) + 放送開始時刻(startedAt)」を EPGStation の番組表と突合し、
programId 単位で予約する (文字列照合は一切しない)。

CronJob から一発実行される想定。設定はすべて環境変数。
"""

from __future__ import annotations

import json
import logging
import math
import os
import sys
import time
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

# シーズン文字列 (空 = 現在シーズンを自動算出)。例: "2026-spring"
SEASON = _env("SEASON")

# 放送開始時刻の突合許容誤差 (秒)
MATCH_TOLERANCE_SEC = int(_env("MATCH_TOLERANCE_SEC", "300"))

# EPGStation の EPG が持つ範囲 (約8日) に合わせ、現在から何日先までの放送を突合対象に
# するか。遠い未来の放送はまだ EPG に存在せず突合不能なので、日次 cron で順次拾う。
LOOKAHEAD_DAYS = float(_env("LOOKAHEAD_DAYS", "8"))

# scraper が 5xx 等で失敗したときのリトライ回数。尽きたらその作品は今回スキップ
# (配信可否が判定不能なものは録画しない。日次 cron で次回拾う)。
SCRAPER_RETRIES = int(_env("SCRAPER_RETRIES", "3"))

# タイトル検証ガード: 時刻+局で見つけた EPG 番組名と作品名の最長共通部分文字列が
# この文字数以上なら「同じ作品」とみなす。Annict の放送スケジュールが実 EPG と
# ずれて別番組を掴むのを防ぐ。
TITLE_MATCH_MIN_CHARS = int(_env("TITLE_MATCH_MIN_CHARS", "4"))

# 末尾切れを許すか
ALLOW_END_LACK = _env("ALLOW_END_LACK", "true").lower() == "true"

# 予約時に付与するエンコードモード名 (EPGStation config の encode[].name と一致させる。
# 例: "H.265 (OCI Remote)")。空 = エンコードなし (TS のまま保存)。
ENCODE_MODE = _env("ENCODE_MODE")

# エンコード完了後に元 TS を削除するか (ENCODE_MODE 指定時のみ有効)
ENCODE_DELETE_ORIGINAL = _env("ENCODE_DELETE_ORIGINAL", "false").lower() == "true"

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
    slot_label: str
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


def _longest_common_substring_len(a: str, b: str) -> int:
    """2 文字列の最長共通部分文字列の長さ (DP)."""
    if not a or not b:
        return 0
    prev = [0] * (len(b) + 1)
    best = 0
    for ca in a:
        cur = [0] * (len(b) + 1)
        for j, cb in enumerate(b, 1):
            if ca == cb:
                cur[j] = prev[j - 1] + 1
                if cur[j] > best:
                    best = cur[j]
        prev = cur
    return best


def title_matches(work_title: str, program_name: str) -> bool:
    """EPG 番組名が Annict 作品と同一作品か検証する (ファジー).

    時刻+局で見つけた番組が本当にその作品かを、作品名と番組名の最長共通部分文字列で
    判定する。話タイトルや末尾の付加表記の違いは吸収しつつ、全く別番組 (近接時刻の
    別作品) を弾く。短い作品名は丸ごと含有を要求する。
    """
    w = normalize(work_title)
    p = normalize(program_name)
    if not w or not p:
        return False
    if len(w) <= TITLE_MATCH_MIN_CHARS:
        return w in p
    return _longest_common_substring_len(w, p) >= TITLE_MATCH_MIN_CHARS


def channel_priority(ch_id: int) -> int:
    """録画局の優先度 (小さいほど優先): 地上波 GR < BS < CS.

    EPGStation の channelId の値域で判別する (GR は ~32 億台、BS は 40 万台、
    CS は 60〜70 万台)。
    """
    if ch_id >= 1_000_000_000:
        return 0  # GR (地上波)
    if 400_000 <= ch_id < 500_000:
        return 1  # BS
    return 2  # CS


# --------------------------------------------------------------------------- #
# Annict GraphQL
# --------------------------------------------------------------------------- #
SEASON_WORKS_QUERY = """
query($seasons: [String!], $after: String) {
  searchWorks(seasons: $seasons, first: 50, after: $after) {
    pageInfo { hasNextPage endCursor }
    nodes {
      annictId
      title
      programs(first: 100) {
        nodes {
          startedAt
          rebroadcast
          channel { name annictId }
        }
      }
    }
  }
}
"""


def fetch_season_works(client: httpx.Client, season: str) -> list[Work]:
    """今期 (指定シーズン) に放送される全作品とその放送予定を取得する.

    annict.com/works/{season} の一覧と同じく、個人の視聴リストに依存しない公開データ。
    """
    works: list[Work] = []
    after: str | None = None
    while True:
        variables: dict = {"seasons": [season], "after": after}
        resp = client.post(
            ANNICT_GRAPHQL_URL,
            headers={"Authorization": f"Bearer {ANNICT_TOKEN}"},
            json={"query": SEASON_WORKS_QUERY, "variables": variables},
        )
        resp.raise_for_status()
        payload = resp.json()
        if payload.get("errors"):
            raise RuntimeError(f"Annict GraphQL errors: {payload['errors']}")
        entries = payload["data"]["searchWorks"]
        for w in entries["nodes"]:
            programs: list[Program] = []
            for p in w["programs"]["nodes"]:
                ch = p.get("channel") or {}
                started_at = datetime.fromisoformat(p["startedAt"])
                programs.append(
                    Program(
                        started_at=started_at,
                        channel_name=ch.get("name", ""),
                        # episode は Annict 上 null のことがある (非nullableだが実データに欠落)
                        # ため取得せず、ログ用ラベルは放送時刻から生成する
                        slot_label=started_at.strftime("%m/%d %H:%M"),
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

    scraper が 5xx 等で失敗した場合は SCRAPER_RETRIES 回までリトライし、それでも
    判定できなければ None を返す。呼び出し側は None を「今回スキップ (録画しない)」
    として扱う (配信中の作品を誤録画しないため)。
    """
    services = None
    for attempt in range(1, SCRAPER_RETRIES + 1):
        try:
            resp = client.get(f"{SCRAPER_BASE_URL}/", params={"id": annict_id})
            resp.raise_for_status()
            services = resp.json().get("services", [])
            break
        except Exception as e:  # noqa: BLE001 - 一過性の scraper 障害をリトライ
            if attempt < SCRAPER_RETRIES:
                time.sleep(0.5 * attempt)
                continue
            log.warning("scraper 判定不能 (annictId=%s, %d回失敗): %s",
                        annict_id, SCRAPER_RETRIES, e)
            return None

    subscribed_norm = [normalize(s) for s in SUBSCRIBED_SERVICES]
    for svc in services or []:
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


def fetch_channel_schedule(client: httpx.Client, channel_id: int,
                           start_ms: int, days: int) -> list[tuple[int, int, str]]:
    """指定 channel の EPGStation 番組表を取得し [(開始秒, programId, 番組名)] を返す.

    EPGStation v2 の `GET /api/schedules/{channelId}` は startAt(ms) + days(日数) 必須で、
    startAt から days 日分の番組を返す (任意の時間窓指定や channelId クエリは不可)。
    番組名はタイトル検証ガード (title_matches) に使う。
    """
    resp = client.get(
        f"{EPGSTATION_BASE_URL}/api/schedules/{channel_id}",
        params={"startAt": start_ms, "days": days, "isHalfWidth": "true"},
    )
    resp.raise_for_status()
    programs: list[tuple[int, int, str]] = []
    for sched in resp.json():
        for prog in sched.get("programs", []):
            programs.append(
                (int(prog["startAt"]) // 1000, int(prog["id"]), prog.get("name") or "")
            )
    return programs


def match_program(programs: list[tuple[int, int, str]],
                  target_sec: int) -> tuple[int, str] | None:
    """番組表から target_sec に最も近い (±許容誤差内) 番組 (programId, 番組名) を返す."""
    best: tuple[int, str] | None = None
    best_delta = MATCH_TOLERANCE_SEC + 1
    for prog_start, pid, name in programs:
        delta = abs(prog_start - target_sec)
        if delta <= MATCH_TOLERANCE_SEC and delta < best_delta:
            best_delta = delta
            best = (pid, name)
    return best


def add_reserve(client: httpx.Client, program_id: int) -> None:
    body: dict = {"programId": program_id, "allowEndLack": ALLOW_END_LACK}
    if ENCODE_MODE:
        body["encodeOption"] = {
            "mode1": ENCODE_MODE,
            "isDeleteOriginalAfterEncode": ENCODE_DELETE_ORIGINAL,
        }
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
    if ENCODE_MODE:
        log.info("エンコード設定: mode=%s, 元TS削除=%s", ENCODE_MODE, ENCODE_DELETE_ORIGINAL)
    else:
        log.info("エンコード設定: なし (TS のまま保存)")

    channel_map = load_channel_map()
    log.info("channel-map: %d 局", len(channel_map))

    stats = {"works": 0, "excluded_streaming": 0, "scraper_skip": 0, "programs": 0,
             "rebroadcast": 0, "out_of_window": 0, "unmapped": 0, "no_match": 0,
             "title_mismatch": 0, "reserved": 0, "already": 0}
    unmapped_channels: set[str] = set()
    now = datetime.now(timezone.utc)
    # EPGStation 番組表の取得範囲。channel ごとに 1 回だけ取得してキャッシュする。
    schedule_start_ms = int(now.timestamp() * 1000)
    schedule_days = math.ceil(LOOKAHEAD_DAYS) + 1
    schedule_cache: dict[int, list[tuple[int, int, str]]] = {}

    with httpx.Client(timeout=HTTP_TIMEOUT) as client:
        def get_schedule(ch_id: int) -> list[tuple[int, int, str]]:
            if ch_id not in schedule_cache:
                schedule_cache[ch_id] = fetch_channel_schedule(
                    client, ch_id, schedule_start_ms, schedule_days)
            return schedule_cache[ch_id]

        works = fetch_season_works(client, season)
        stats["works"] = len(works)
        log.info("今期作品 (%s): %d 作品", season, len(works))

        existing = fetch_existing_reserve_program_ids(client)
        log.info("既存予約 programId: %d 件", len(existing))

        for work in works:
            stats["programs"] += len(work.programs)
            # 予約しうる放送 (再放送除外・EPG 範囲内・受信可能局) を局ごとにまとめる。
            # 1 件も無ければ scraper を呼ばずスキップ = 直近に放送がある作品にだけ当てる。
            by_channel: dict[int, list[Program]] = {}
            for prog in work.programs:
                if SKIP_REBROADCAST and prog.rebroadcast:
                    stats["rebroadcast"] += 1
                    continue
                # EPG 範囲外 (過去 or 遠い未来) はまだ突合できない。日次 cron で順次拾う。
                if prog.started_at < now or (prog.started_at - now).days >= LOOKAHEAD_DAYS:
                    stats["out_of_window"] += 1
                    continue
                ch_id = channel_map.get(normalize(prog.channel_name))
                if ch_id is None:
                    # 受信不可局や Web 配信 (YouTube 等) は未マップ = 実質スキップ。
                    # 逐一ログせず末尾の一覧に集約する。
                    stats["unmapped"] += 1
                    unmapped_channels.add(prog.channel_name)
                    continue
                by_channel.setdefault(ch_id, []).append(prog)
            if not by_channel:
                continue

            # 配信可否を判定 (録画候補がある作品にだけ scraper を当てる)
            streamable = is_streamable_on_subscription(client, work.annict_id)
            if streamable is True:
                stats["excluded_streaming"] += 1
                log.info("除外 (配信あり): %s (annictId=%s)", work.title, work.annict_id)
                continue
            if streamable is None:
                # 配信可否が判定不能なものは録画しない (配信中作品の誤録画を防ぐ)
                stats["scraper_skip"] += 1
                log.info("スキップ (配信可否 判定不能): %s (annictId=%s)",
                         work.title, work.annict_id)
                continue
            log.info("対象 (配信なし→録画): %s (annictId=%s)", work.title, work.annict_id)

            # 同一作品は 1 局のみ予約。地上波 GR > BS > CS の優先順で、タイトル検証を
            # 通る放送が 1 件でもある最優先局を採用し、その局の該当放送だけ予約する。
            for ch_id in sorted(by_channel, key=lambda c: (channel_priority(c), c)):
                schedule = get_schedule(ch_id)
                matched: list[tuple[Program, int]] = []
                for prog in by_channel[ch_id]:
                    m = match_program(schedule, int(prog.started_at.timestamp()))
                    if m is None:
                        stats["no_match"] += 1
                        continue
                    program_id, program_name = m
                    if not title_matches(work.title, program_name):
                        # 時刻は近いが別番組 (Annict のスケジュールが実 EPG とずれている)
                        stats["title_mismatch"] += 1
                        log.info("  タイトル不一致で除外: %s %s ch=%s → EPG「%s」",
                                 work.title, prog.slot_label, prog.channel_name, program_name)
                        continue
                    matched.append((prog, program_id))
                if not matched:
                    continue  # この局では確証マッチ無し → 次の優先局へ

                for prog, program_id in matched:
                    if program_id in existing:
                        stats["already"] += 1
                        continue
                    if DRY_RUN:
                        log.info("  [DRY_RUN] 予約予定: %s %s ch=%s (programId=%s)",
                                 work.title, prog.slot_label, prog.channel_name, program_id)
                    else:
                        add_reserve(client, program_id)
                        log.info("  予約作成: %s %s ch=%s (programId=%s)",
                                 work.title, prog.slot_label, prog.channel_name, program_id)
                    existing.add(program_id)
                    stats["reserved"] += 1
                break  # 1 局のみ採用

    if unmapped_channels:
        log.warning("未マップ channel 一覧 (channel-map に追記してください): %s",
                    ", ".join(sorted(unmapped_channels)))
    log.info("=== 完了 %s ===", stats)
    return 0


if __name__ == "__main__":
    sys.exit(main())
