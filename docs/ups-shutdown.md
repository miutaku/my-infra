# UPS 連動 安全シャットダウン構成

APC UPS 2台 + Raspberry Pi 2台(DietPi / NUT)で、UPS バックアップ下の機器を
停電時に安全にシャットダウンするための構成。実装は [`ansible/nut/`](../ansible/nut/)。

## 1. 物理構成

各 Pi は自分を給電している UPS を USB で監視する(= その UPS のドライバホスト)。

| UPS | 機種 (製造年) | NUT デバイス | ドライバ/監視ホスト | 給電先(シャットダウン対象) |
|-----|---------------|--------------|---------------------|-----------------------------|
| **UPS A** | APC RS 550S (2025) | `ups-a@192.168.10.113` | RPi#2 (192.168.10.113) | pve-x570(192.168.0.115), RPi#2(.113) |
| **UPS B** | APC RS 550S (2020) | `ups-b@192.168.10.112` | RPi#1 (192.168.10.112) | pve-b550m(192.168.0.119), RPi#1(.112) |

そのほか NW 機器類もぶら下がっているが、突然落ちても壊れないため対象外。

`port = auto`(シリアル非固定)にしているため、各 Pi は接続中の APC を自動で掴む。

### ホスト名(任意)

分かりやすさのため、ホスト名を担当 UPS に揃えてもよい
(`.112 → nut-pi-01-ups-b` / `.113 → nut-pi-02-ups-a`)。
host_vars の `nut_hostname` を有効化して playbook を流す。

## 2. シャットダウンの段取り (例: UPS A 停電)

```
時刻 →
 UPS A: OL ──停電──▶ OB(放電開始) ───────────────────▶ OB+LB(残10%) ─▶ 出力遮断
                      │                                  │                │
 pve-x570 ────────────┼── 残80%でクリーン停止 ───────────┘(とっくに停止) │
 (UPS A給電)          │   (VM 停止に時間がかかるので早め)               │
                      │                                                  │
 RPi#2 (.113) ────────┴── 残10%まで粘る ──────────▶ OB+LB で自分ごと停止 ┤
 (UPS A給電/ドライバ)                                  ＋ killpower 発行 ─┘
                                                       (offdelay=150s 後に
                                                        UPS A が出力を切る)
```

1. **UPS A 停電 → `OB`**。給電先の全 upsmon に通知。
2. **残 80%** で `nut-charge-guard`(systemd timer / 20s 間隔)が **pve-x570** を
   `shutdown -h now`。残量が半分以上あるうちに VM 停止を始めるので安全。
3. **残 10%(`LOWBATT`)** で **RPi#2(.113)** の upsmon(primary)が自分を停止。
   省電力なのでここまで粘る。SD カード保護のためクリーン停止する。
4. 同じく LB のタイミングで .113 が `killpower` を発行。`offdelay=150s` 後に
   **UPS A が出力を遮断**。残っているのは Pi 本体だけなので 150s で十分。
5. **復電**すると UPS A は `ondelay=180s` 後に出力を再投入する。各ホストの起動は
   **手動**(KVM 等で電源 ON)。BIOS の「AC 復電で自動 ON」は使わない運用。

UPS B 側(pve-b550m / RPi#1)は左右対称の同じ動作。

## 3. しきい値・タイミング (group_vars/all.yml)

| 変数 | 値 | 意味 |
|------|----|----|
| `nut_pve_charge_threshold` | **80** | PVE を落とす残量(%)。停電が2〜3分続くと到達する実質デバウンス。 |
| `nut_lowbatt_charge` | **10** | `LOWBATT` 残量(%)。Pi が自分ごと停止＋出力遮断する最終ライン。 |
| `nut_offdelay` | **150** | killpower 発行〜UPS 出力遮断の猶予(秒)。残るのは Pi のみなので十分。 |
| `nut_ondelay` | **180** | 復電後の出力再投入遅延(秒)。`ondelay > offdelay` は usbhid-ups 必須。 |
| `nut_charge_guard_interval` | **20** | 残量ガードのポーリング間隔(秒)。 |

> **設計上の注意**
> - `nut_offdelay`(150s)は「最後に残る Pi」を守る猶予。**PVE の停止時間を守るのは
>   `nut_pve_charge_threshold`(80%→10% のバッテリ猶予=数分)** の方。役割が違う。
> - しきい値は `battery.charge%` 依存。
>   `LOWBATT 10%` と `runtime.low 120s` のバックストップは必ず残し、定期的に
>   バッテリーテスト(`upscmd -u upsadmin -p <pw> <ups> test.battery.start.deep`)で実残量を確認すること。
> - もっと粘りたい場合は `nut_pve_charge_threshold` を 50〜60% に下げてよい(安全)。

## 4. NUT トポロジ

```
┌─ RPi#1 (.112) ───────────────┐        ┌─ RPi#2 (.113) ───────────────┐
│ usbhid-ups → UPS B           │        │ usbhid-ups → UPS A           │
│ upsd  LISTEN .112:3493        │        │ upsd  LISTEN .113:3493        │
│ upsmon primary ups-b@localhost│        │ upsmon primary ups-a@localhost│
│   powervalue 1 → LBで自停止    │        │   powervalue 1 → LBで自停止    │
│   ＋ killpower(UPS B 遮断)     │        │   ＋ killpower(UPS A 遮断)     │
└───────────────▲───────────────┘        └───────────────▲───────────────┘
                │ secondary (LAN)                          │ secondary (LAN)
        ┌───────┴────────┐                         ┌───────┴────────┐
        │ pve-b550m(.119)│                         │ pve-x570(.115) │
        │ upsmon 2ndary  │                         │ upsmon 2ndary  │
        │ charge-guard80%│                         │ charge-guard80%│
        └────────────────┘                         └────────────────┘
```

- **upsmon の役割**: ドライバを持つ Pi が `primary`、給電される側(PVE)が `secondary`。
- **80% 早期停止**は NUT 標準では表現できない(UPS ごとに LB は1つだけ)ため、PVE 上で
  `upsc` をポーリングする `nut-charge-guard`(systemd timer)で実現。upsmon の OB+LB は
  最終保険として併用。
- 認証ユーザー: `monmaster`(Pi 自身の upsmon)/ `monslave`(PVE の upsmon)/ `upsadmin`
  (手動管理 instcmd 用)。いずれも同じ共有パスワードで、Bitwarden Secrets Manager から取得。

## 5. 適用手順

```bash
cd ansible/nut

# 1) 監視ユーザーのパスワードを BSM に作成し、ID を group_vars/all.yml にセット
bws secret create nut-monitor-password "$(openssl rand -base64 24)"
#   → 出力された id を bsm_nut_monitor_password_id へ

# 2) 依存コレクション
ansible-galaxy collection install -r requirements.yml

# 3) 制御ホストに BWS トークンを export(jq も必要)
export BWS_ACCESS_TOKEN=...

# 4) ドライ実行で差分確認
ansible-playbook site.yml --check --diff --ask-become-pass

# 5) 適用 (Pi は sudo パスワード、PVE は root 鍵ログイン)
ansible-playbook site.yml --ask-become-pass
```

> 事前準備: PVE 2台(192.168.0.115 / .119)の `root` に制御ホストの公開鍵を登録済み。
> Pi 2台は `miutaku` ユーザー + sudo パスワード。

## 6. 動作確認 (本番停電を起こさずにテスト)

```bash
# (a) 各 UPS が読めるか
upsc ups-a@192.168.10.113      # RPi#2 / UPS A
upsc ups-b@192.168.10.112      # RPi#1 / UPS B

# (b) PVE から給電元 UPS が見えるか
ssh root@192.168.0.115 'upsc ups-a@192.168.10.113 ups.status'   # pve-x570
ssh root@192.168.0.119 'upsc ups-b@192.168.10.112 ups.status'   # pve-b550m

# (c) offdelay/ondelay/charge.low が反映されたか
upsc ups-a@192.168.10.113 | grep -E 'ups.delay|battery.charge.low'

# (d) upsmon の擬似イベント(通知のみ。実停止はしない)
#     primary 側(Pi)で:
sudo upsmon -c fsd      # ← 本当に停止するので“テスト本番”時のみ。通常は使わない

# (e) charge-guard のロジック確認(残量しきい値を一時的に高くしてドライ確認)
#     ※ 実機では timer を止めてから手動実行する等、慎重に。
ssh root@192.168.0.115 '/usr/local/sbin/nut-charge-guard ups-a@192.168.10.113 0'  # 0% なので何も起きない
```

実停電試験を行う場合は、片方の UPS の AC 入力を抜き、`ups.status` が `OB`→`OB LB`
と遷移し、80% で PVE、10% で Pi が順に落ちることを確認する。復電後の各ホスト起動は
手動(KVM 等)。**必ず業務時間外・バックアップ取得後に実施すること。**

## 7. 既知の注意点 / トラブルシュート

- **`upsc -l` が空 / `Error: Data stale`**: ドライバが UPS を掴めていない。`port = auto`
  にした上で `sudo systemctl restart nut-driver-enumerator nut-server`(または再起動)。
  ups.conf に古い `serial=` 等が残っていると auto でも掴めないので、本 role の
  `port = auto` 設定を適用すること。
- **PVE から `:3493` が CLOSED**: upsd の LISTEN が localhost だけになっていないか
  (本構成の `upsd.conf` は `127.0.0.1` と LAN IP の両方を LISTEN する)。
- **killpower が効かない**: `nut.conf` の `MODE=netserver`(Pi)、`POWERDOWNFLAG` の
  パス、`offdelay/ondelay` の値を確認。`upscmd -l <ups>` に `load.off.delay` があること。

## 8. メトリクス監視 (VictoriaMetrics)

UPS の負荷・推定消費電力・バッテリ残量等は `nut-exporter`(k8s)で収集する。
構成は [`k8s/pve/nut-exporter/`](../k8s/pve/nut-exporter/)、scrape は Grafana Alloy
(`k8s/pve/grafana-alloy/values.yaml` の `nut_ups_a`/`nut_ups_b`)→ VictoriaMetrics。
推定消費電力(W) = `network_ups_tools_ups_load / 100 * network_ups_tools_ups_realpower_nominal`。
