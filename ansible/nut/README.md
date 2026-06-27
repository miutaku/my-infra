# ansible/nut

APC UPS 連動の安全シャットダウンを構成する Ansible。設計と段取りの詳細は
[`docs/ups-shutdown.md`](../../docs/ups-shutdown.md) を参照。

## 構成

| 対象グループ | ホスト | ロール | 役割 |
|--------------|--------|--------|------|
| `nut_pi`  | 192.168.10.112 / .113 | `nut_server` | upsd + usbhid-ups + 自分用 upsmon(primary)、LB で自停止＋killpower |
| `nut_pve` | 192.168.0.115 / .119 | `nut_client` | upsmon(secondary) + 残量80%で早期停止する charge-guard |

- UPS A = `ups-a@192.168.10.113`(給電: pve-x570, RPi#2)
- UPS B = `ups-b@192.168.10.112`(給電: pve-b550m, RPi#1)

## 前提

- 制御ホスト: `ansible-galaxy collection install -r requirements.yml`、`jq`、`bws` CLI
- `export BWS_ACCESS_TOKEN=...`(監視ユーザーのパスワードを BSM から取得)
- `bsm_nut_monitor_password_id`(group_vars/all.yml)に BSM シークレット ID をセット
- Pi: `miutaku` + sudo パスワード / PVE: `root` 鍵ログイン
- Pi に python3 と python3-apt を手動導入(DietPi 最小構成には無い。apt モジュールが python3-apt 必須):
  `ansible nut_pi -m raw -a 'apt-get update && apt-get install -y python3 python3-apt' --become --ask-become-pass`

## 実行

```bash
ansible-galaxy collection install -r requirements.yml
export BWS_ACCESS_TOKEN=...
ansible-playbook site.yml --check --diff --ask-become-pass   # 差分確認
ansible-playbook site.yml --ask-become-pass                  # 適用

# 片側だけ流す
ansible-playbook site.yml --tags nut_server --ask-become-pass
ansible-playbook site.yml --tags nut_client
```

## しきい値 (group_vars/all.yml)

`nut_pve_charge_threshold=80`(PVE 早期停止%) / `nut_lowbatt_charge=10`(Pi 最終ライン%) /
`nut_offdelay=150`(遮断猶予s) / `nut_ondelay=180`(復電再投入s)。
