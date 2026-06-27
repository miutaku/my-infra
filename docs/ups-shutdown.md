# UPS 連動 安全シャットダウン構成

APC UPS 2台 + Raspberry Pi 2台(DietPi / NUT)で、UPS バックアップ下の機器を
停電時に安全にシャットダウンするための構成。実装は [`ansible/nut/`](../ansible/nut/)。

## 1. 物理構成

各 Pi は USB 接続された UPS のドライバホストになる。Pi 自身の給電元は反対側 UPS にしている
(cross-power 構成)ため、「監視している UPS」と「自分を給電している UPS」は別。
また、UPS B の AC 入力は UPS A のサージのみ(非バックアップ)コンセントから取っている。

| UPS | 機種 (製造年) | NUT デバイス | ドライバ/監視ホスト | AC入力/上流 | バックアップ給電先 |
|-----|---------------|--------------|---------------------|-------------|--------------------|
| **UPS A** | APC RS 550S (2020) | `ups-a@192.168.10.112` | RPi#1 (192.168.10.112) | 商用AC | pve-x570(192.168.0.115), RPi#2(.113) |
| **UPS B** | APC RS 550S (2025) | `ups-b@192.168.10.113` | RPi#2 (192.168.10.113) | UPS A のサージのみ(非バックアップ) | pve-b550m(192.168.0.119), RPi#1(.112), NW機器類 |

そのほか NW 機器類もぶら下がっているが、突然落ちても壊れないため対象外。
UPS A のサージのみ出力はバッテリーバックアップされないため、商用 AC が落ちると UPS B も
入力断を検知して自分のバッテリーへ切り替わる。UPS B 配下の負荷は UPS A のバッテリーを消費しない。

`port = auto`(シリアル非固定)にしているため、各 Pi は接続中の APC を自動で掴む。

### ホスト名(任意)

分かりやすさのため、ホスト名は「USB 監視対象」と「給電元」の両方を入れる
(`.112 → nut-pi-01-mon-ups-a-pwr-ups-b` / `.113 → nut-pi-02-mon-ups-b-pwr-ups-a`)。
host_vars の `nut_hostname` を有効化して playbook を流す。

## 2. シャットダウンの段取り (例: UPS A 上流停電)

```
時刻 →
 UPS A: OL ──上流停電──▶ OB(放電開始) ───────────────▶ OB+LB(残10%)
                          │                             │
 UPS Aサージのみ ─────────┴── 出力断                    │
                          │                             │
 UPS B: OL ───────────────┴── OB(UPS B電池へ切替) ─────▶ OB+LB(残10%)
                          │
 pve-x570 ────────────────┼── UPS A 残80%でクリーン停止
 (UPS A給電)              │
 pve-b550m ───────────────┼── UPS B 残80%でクリーン停止
 (UPS B給電)              │
 RPi#2 (.113) ────────────┴── UPS A LB で自分ごと停止
 (UPS A給電/UPS Bドライバ)

 RPi#1 (.112) ────────────── UPS B が生きている限り稼働し、UPS A の状態を公開
 (UPS B給電/UPS Aドライバ)
```

1. **UPS A 上流停電 → UPS A が `OB`**。UPS A のサージのみ出力も切れるため、
   そこに AC 入力を取っている **UPS B も `OB`** になる。
2. **UPS B 配下の負荷は UPS B のバッテリーで動く**。UPS A のサージのみ口は
   バックアップされないので、UPS B 配下が UPS A のバッテリーを消費することはない。
3. **各 UPS が残 80%** になると `nut-charge-guard`(systemd timer / 20s 間隔)が
   **pve-x570**(UPS A) / **pve-b550m**(UPS B) を `shutdown -h now`。
   残量が半分以上あるうちに VM 停止を始めるので安全。
4. **UPS A が残 10%(`LOWBATT`)** になると、UPS A から給電されている **RPi#2(.113)** が
   `ups-a@192.168.10.112` を secondary として見て自分を停止する。
   RPi#2 は UPS B のドライバホストだが、給電元は UPS A。
5. **UPS B が残 10%(`LOWBATT`)** になると、UPS B から給電されている **RPi#1(.112)** が
   `ups-b@192.168.10.113` を secondary として見て自分を停止する。
   RPi#1 は UPS A のドライバホストだが、給電元は UPS B。
6. cross-power 構成では Pi 側の `POWERDOWNFLAG` は無効化している。
   Pi が給電元 UPS の都合で停止するときに、ローカル USB 接続側 UPS を誤って
   `killpower` しないため。UPS 出力の自動遮断が必要なら、別途ガード付きの
   手動/自動 `upscmd load.off.delay` を設計する。

UPS B の AC 入力だけを抜いた場合は UPS B 側(pve-b550m / RPi#1 / NW機器類)だけが
`OB` になる。NW機器類は突然落ちても壊れないためシャットダウン対象外。

## 3. しきい値・タイミング (group_vars/all.yml)

| 変数 | 値 | 意味 |
|------|----|----|
| `nut_pve_charge_threshold` | **80** | PVE を落とす残量(%)。停電が2〜3分続くと到達する実質デバウンス。 |
| `nut_lowbatt_charge` | **10** | `LOWBATT` 残量(%)。給電される Pi/PVE が最終停止するライン。 |
| `nut_offdelay` | **150** | 手動/明示的な killpower 発行〜UPS 出力遮断の猶予(秒)。 |
| `nut_ondelay` | **180** | 復電後の出力再投入遅延(秒)。`ondelay > offdelay` は usbhid-ups 必須。 |
| `nut_charge_guard_interval` | **20** | 残量ガードのポーリング間隔(秒)。 |

> **設計上の注意**
> - `nut_offdelay`(150s)は UPS に `load.off.delay` を送った場合の猶予。
>   cross-power の Pi では `POWERDOWNFLAG` を無効化しているため、自動 killpower には使わない。
> - **PVE の停止時間を守るのは `nut_pve_charge_threshold`(80%→10% のバッテリ猶予=数分)**。
>   `offdelay` とは役割が違う。
> - しきい値は `battery.charge%` 依存。
>   `LOWBATT 10%` と `runtime.low 120s` のバックストップは必ず残し、定期的に
>   バッテリーテスト(`upscmd -u upsadmin -p <pw> <ups> test.battery.start.deep`)で実残量を確認すること。
> - もっと粘りたい場合は `nut_pve_charge_threshold` を 50〜60% に下げてよい(安全)。

## 4. NUT トポロジ

```
商用AC
  │
  ▼
UPS A
  ├─ バックアップ出力 → pve-x570, RPi#2
  └─ サージのみ出力   → UPS B の AC 入力
                         └─ UPS B バックアップ出力 → pve-b550m, RPi#1, NW機器類

┌─ RPi#1 (.112) ───────────────┐        ┌─ RPi#2 (.113) ───────────────┐
│ usbhid-ups → UPS A           │        │ usbhid-ups → UPS B           │
│ upsd  LISTEN .112:3493        │        │ upsd  LISTEN .113:3493        │
│ upsmon primary ups-a@localhost│        │ upsmon primary ups-b@localhost│
│   powervalue 0               │        │   powervalue 0               │
│ upsmon secondary ups-b@.113   │        │ upsmon secondary ups-a@.112   │
│   powervalue 1 = 自分の給電元 │        │   powervalue 1 = 自分の給電元 │
└───────────────▲───────────────┘        └───────────────▲───────────────┘
                │ secondary (LAN)                          │ secondary (LAN)
        ┌───────┴────────┐                         ┌───────┴────────┐
        │ pve-x570(.115) │                         │ pve-b550m(.119)│
        │ ups-a@.112     │                         │ ups-b@.113     │
        │ charge-guard80%│                         │ charge-guard80%│
        └────────────────┘                         └────────────────┘
```

- **upsmon の役割**: USB ドライバを持つ Pi がその UPS の `primary`。その Pi 自身の
  給電元は反対側 UPS なので、リモート UPS を `secondary` として追加監視する。
- **powervalue**: ローカル USB UPS は `0`(この Pi の給電源ではない)。給電元 UPS は
  `1`(この Pi を生かしている電源)。
- **UPS B の上流**: UPS B の AC 入力は UPS A のサージのみ口。商用 AC 停電では
  UPS A と UPS B が同時に `OB` になるが、UPS B 配下の負荷は UPS A のバッテリーに乗らない。
- **80% 早期停止**は NUT 標準では表現できない(UPS ごとに LB は1つだけ)ため、PVE 上で
  `upsc` をポーリングする `nut-charge-guard`(systemd timer)で実現。upsmon の OB+LB は
  最終保険として併用。
- **killpower**: cross-power の Pi では `POWERDOWNFLAG` を出さない。UPS 出力遮断が必要な
  停電ドリルでは、給電関係を確認してから `upsadmin` で手動実行する。
- 認証ユーザー: `monmaster`(USB 接続 UPS の primary)/ `monslave`(給電されるホストの secondary)/ `upsadmin`
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
upsc ups-a@192.168.10.112      # RPi#1 / UPS A
upsc ups-b@192.168.10.113      # RPi#2 / UPS B

# (b) PVE から給電元 UPS が見えるか
ssh root@192.168.0.115 'upsc ups-a@192.168.10.112 ups.status'   # pve-x570
ssh root@192.168.0.119 'upsc ups-b@192.168.10.113 ups.status'   # pve-b550m

# (c) Pi から自分の給電元 UPS が見えるか
ssh 192.168.10.112 'upsc ups-b@192.168.10.113 ups.status'        # RPi#1 の給電元 UPS B
ssh 192.168.10.113 'upsc ups-a@192.168.10.112 ups.status'        # RPi#2 の給電元 UPS A

# (d) offdelay/ondelay/charge.low が反映されたか
upsc ups-a@192.168.10.112 | grep -E 'ups.delay|battery.charge.low'

# (e) upsmon の FSD テスト
#     primary 側(Pi)で。本当に停止するので“テスト本番”時のみ。通常は使わない。
sudo upsmon -c fsd

# (f) charge-guard のロジック確認(残量しきい値を一時的に高くしてドライ確認)
#     ※ 実機では timer を止めてから手動実行する等、慎重に。
ssh root@192.168.0.115 '/usr/local/sbin/nut-charge-guard ups-a@192.168.10.112 0'  # 0% なので何も起きない
```

実停電試験を行う場合は、どの入力を抜くかで挙動が変わる。
UPS A の上流 AC を抜くと UPS A のサージのみ出力も切れるため、UPS A と UPS B が
どちらも `OB` になる。UPS B の AC 入力だけを抜いた場合は UPS B だけが `OB` になる。
いずれも `ups.status` が `OB`→`OB LB` と遷移し、80% で PVE、10% で Pi が順に落ちることを確認する。
復電後の各ホスト起動は手動(KVM 等)。**必ず業務時間外・バックアップ取得後に実施すること。**

## 7. 既知の注意点 / トラブルシュート

- **`upsc -l` が空 / `Error: Data stale`**: ドライバが UPS を掴めていない。`port = auto`
  にした上で `sudo systemctl restart nut-driver-enumerator nut-server`(または再起動)。
  ups.conf に古い `serial=` 等が残っていると auto でも掴めないので、本 role の
  `port = auto` 設定を適用すること。
- **PVE から `:3493` が CLOSED**: upsd の LISTEN が localhost だけになっていないか
  (本構成の `upsd.conf` は `127.0.0.1` と LAN IP の両方を LISTEN する)。
- **自動 killpower が走らない**: cross-power の Pi では意図通り。host_vars で
  `nut_powerdownflag_enabled: false` にしている。UPS 出力を切りたい停電ドリルでは、
  給電関係と停止済みホストを確認してから `upscmd -u upsadmin -p <pw> <ups> load.off.delay`
  を手動実行する。`upscmd -l <ups>` に `load.off.delay` があることも確認。

## 8. メトリクス監視 (VictoriaMetrics)

UPS の負荷・推定消費電力・バッテリ残量等は `nut-exporter`(k8s)で収集する。
構成は [`k8s/pve/nut-exporter/`](../k8s/pve/nut-exporter/)。
scrape する側は `/ups_metrics?server=<Pi IP>&ups=<name>` を指定する。
推定消費電力(W) = `network_ups_tools_ups_load / 100 * network_ups_tools_ups_realpower_nominal`。
