# annict-rec-sync

Annict の**今期放送作品**（annict.com/works/{season} の一覧）のうち、契約済みの配信
サービス（dアニメストア / Amazon プライム・ビデオ / Netflix 等）で**配信されていない
作品だけ**を TV から録画するよう、EPGStation に番組単位の予約を投入する同期ジョブ。

## 仕組み

1. Annict GraphQL `searchWorks(seasons: [<season>])` から今期放送の全作品と各放送
   （`startedAt` / `channel` / `episode`）を取得（個人の視聴リストには依存しない）。
2. 作品ごとに [annict-subscription-scraper](https://github.com/miutaku/annict-subscription-scraper)
   `GET /?id={annictId}` を呼び、契約済み配信で配信中の作品を除外。
3. 残った作品の各放送について、Annict の **channel 名 → EPGStation channelId** を
   静的マッピング（`/config/channel-map.json`）で変換。
4. EPGStation `GET /api/schedules/{channelId}`（startAt + days で取得）から放送開始時刻が
   ±許容誤差で最も近い番組を特定。その**番組名に作品名コアが含まれるか検証**
   （`title_matches`、最長共通部分文字列）し、別番組なら破棄する。検証を通った
   `programId` を、既存予約と重複しなければ `POST /api/reserves` で予約。
   channel ごとに番組表は 1 回だけ取得してキャッシュする。

**1 作品 1 局のみ予約**: 同じ作品が複数局（GR/BS/CS）で放送される場合、地上波 GR > BS > CS
の優先順で、タイトル検証を通る放送が 1 件でもある最優先局を採用し、その局の該当放送のみ予約。

**配信可否が判定不能なら録画しない**: scraper が 5xx 等で失敗した作品はリトライ後もスキップ
（配信中作品の誤録画を防ぐ）。

**タイトル文字列での照合は一切行わない。** TV 番組名と Annict/配信の作品名・話タイトルは
表記が一致しないため、同一放送を指す「放送局 + 放送開始時刻」で突合する。

## 環境変数

| 変数 | 既定 | 説明 |
| --- | --- | --- |
| `ANNICT_TOKEN` | （必須） | Annict 個人アクセストークン（read 権限） |
| `ANNICT_GRAPHQL_URL` | `https://api.annict.com/graphql` | Annict GraphQL エンドポイント |
| `SCRAPER_BASE_URL` | `http://annict-scraper.app-annict-scraper.svc.cluster.local:8080` | scraper |
| `EPGSTATION_BASE_URL` | `http://epgstation.app-epgstation.svc.cluster.local:8888` | EPGStation API |
| `SUBSCRIBED_SERVICES` | `dアニメストア,Amazon プライム・ビデオ,Netflix` | 録画除外する契約配信（正規化部分一致） |
| `SEASON` | 空（現在シーズン自動算出） | 例: `2026-spring` |
| `MATCH_TOLERANCE_SEC` | `300` | 放送開始時刻の突合許容誤差（秒） |
| `LOOKAHEAD_DAYS` | `8` | 現在から何日先までの放送を突合対象にするか（EPGの範囲に合わせる。遠未来は日次cronで順次拾う） |
| `TITLE_MATCH_MIN_CHARS` | `4` | タイトル検証で「同一作品」とみなす最長共通部分文字列の最小文字数 |
| `SCRAPER_RETRIES` | `3` | scraper 失敗時のリトライ回数（尽きたらその作品は今回スキップ） |
| `ALLOW_END_LACK` | `true` | 予約時の末尾切れ許容 |
| `ENCODE_MODE` | 空（エンコードなし） | 予約に付与するエンコードモード名。EPGStation config の `encode[].name` と一致させる（例: `H.265 (OCI Remote)`） |
| `ENCODE_DELETE_ORIGINAL` | `false` | エンコード完了後に元 TS を削除するか（`ENCODE_MODE` 指定時のみ有効） |
| `SKIP_REBROADCAST` | `true` | Annict で再放送扱いの放送を録画対象から除外 |
| `CHANNEL_MAP_FILE` | `/config/channel-map.json` | channel 名 → channelId マッピング |
| `DRY_RUN` | `true` | true の間は予約せずログのみ |

## ローカル実行

```bash
pip install -r requirements.txt
export ANNICT_TOKEN=... SCRAPER_BASE_URL=... EPGSTATION_BASE_URL=... CHANNEL_MAP_FILE=./channel-map.json
python sync.py   # 既定 DRY_RUN=true
```

`channel-map.json` は EPGStation `GET /api/channels` の出力と Annict の channel 名を
突き合わせて作成する（例 `{"TOKYO MX": 3273601024, "BS11イレブン": 211}`）。
キーは正規化（NFKC + 空白除去 + 小文字化）して比較するため多少の表記揺れは吸収される。
