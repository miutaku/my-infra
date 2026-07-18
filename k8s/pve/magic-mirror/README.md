# MagicMirror² on RKE2

MagicMirror² の表示サーバを宅内 RKE2 上で動かす。
表示端末は専用 VM ではなく、タブレットのブラウザを kiosk モードで使う。

## Endpoint

- `http://magic-mirror.miutaku.internal:8080/`
- LoadBalancer IP: `192.168.20.204`

## Secrets

`magic-mirror-config` は External Secrets Operator で Bitwarden Secrets Manager から生成する。

| BSM secret | 用途 |
|---|---|
| `MM_OW_API_KEY` | OpenWeatherMap API key |
| `MM_CALENDAR_URL` | Google Calendar iCal URL |
