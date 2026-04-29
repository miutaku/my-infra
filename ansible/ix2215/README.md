# Ansible: NEC IX2215 DHCP 静的リース管理

NEC IX2215 ルーターの `ip dhcp profile main` に対して  
RKE2 クラスタノードの DHCP 静的リース (`fixed-assignment`) を自動設定する。

## なぜ Ansible network_cli / cisco.ios を使わないのか

NEC IX シリーズには Ansible 公式の `network_os` プラグインが存在しない。  
`cisco.ios` も IX のプロンプト (`Router(config)#`) に対応しておらず、  
privilege escalation でエラーとなる (ansible.netcommon#315, cisco.ios#372)。

**Netmiko 4.6.0+ では `nec_ix` デバイスタイプが正式サポートされた**ため、  
本 Playbook は Netmiko Python ライブラリを経由して IX2215 に SSH 接続する。

## 構成

| 項目 | 値 |
|---|---|
| ルーター管理 IP | `192.168.0.254` (GigaEthernet2.0) |
| 接続方式 | Netmiko SSH (`nec_ix` デバイスタイプ) |
| DHCPプロファイル | `ip dhcp profile main` |
| シークレット管理 | Bitwarden Secrets Manager (BSM) |

## セットアップ (初回)

### 1. BSM にシークレットを登録する

Bitwarden Secrets Manager (BSM) のプロジェクト `my-infra` に以下を登録:

| BSM シークレット名 | 値 |
|---|---|
| `IX2215_SSH_PASSWORD` | IX2215 の SSH パスワード (`miutaku` ユーザー) |

### 2. group_vars/all.yml を更新する

`bsm_ix2215_ssh_password_id` を実際の BSM シークレット ID に更新する:

```bash
# BSM シークレット一覧でIDを確認
BWS_ACCESS_TOKEN=<token> bws secret list | jq '.[] | {id, key}'
```

`group_vars/all.yml` を編集:
```yaml
bsm_ix2215_ssh_password_id: "取得したUUID"
```

### 3. MAC アドレスを Terraform output から取得して更新する

```bash
cd terraform/pve
terraform output -json rke2_lb_mac_addresses
terraform output -json rke2_server_mac_addresses
terraform output -json rke2_worker_mac_addresses
```

出力された MAC アドレスを **NEC IX 形式 (`xxxx.xxxx.xxxx`)** に変換して  
`group_vars/all.yml` の `dhcp_assignments` を更新する。

**変換例**: `BC:24:11:AB:CD:EF` → `bc24.11ab.cdef`

### 4. 依存ライブラリをインストールする

```bash
cd ansible/ix2215
pipenv install
pipenv run ansible-galaxy collection install -r requirements.yml
```

## 実行方法

```bash
cd ansible/ix2215

# BWS_ACCESS_TOKEN を環境変数に設定してから実行
export BWS_ACCESS_TOKEN="<bwsのアクセストークン>"

# ドライラン (実際には変更しない — 現状確認のみ)
pipenv run ansible-playbook site.yml --check

# 適用
pipenv run ansible-playbook site.yml
```

## 静的リースを追加・変更したいとき

`group_vars/all.yml` の `dhcp_assignments` を編集する:

```yaml
dhcp_assignments:
  - name: new-host
    ip: "192.168.0.140"
    mac: "aabb.ccdd.eeff"  # NEC IX 形式
```

- MAC は `xxxx.xxxx.xxxx` 形式で記載 (スクリプトが自動変換もするので `aa:bb:cc:dd:ee:ff` でも可)
- 既存エントリは変更しない (IP が一致する場合は MAC が変わっていれば上書き)
- 変更後は `ansible-playbook site.yml` を実行すれば IX2215 に反映される

## 設定を確認したいとき

```bash
# IX2215 に SSH して running-config を確認
ssh miutaku@192.168.0.254
Router# show running-config
```

`ip dhcp profile main` セクションに `fixed-assignment` 行が追加されていることを確認する。

## トラブルシューティング

```bash
# 接続確認 (ssh-keyscan は不要、パスワード認証)
ssh miutaku@192.168.0.254 show version

# スクリプト単体実行でデバッグ
export IX2215_HOST=192.168.0.254
export IX2215_USER=miutaku
export IX2215_PASSWORD=<password>
export DHCP_PROFILE=main
export DHCP_ASSIGNMENTS_JSON='[{"name":"test","ip":"192.168.0.126","mac":"aabb.ccdd.eeff"}]'
python3 scripts/configure_dhcp_leases.py
```
