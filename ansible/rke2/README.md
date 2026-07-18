# RKE2 クラスタ構成 (Ansible)

Terraform (terraform/pve) で作成した Proxmox VM に RKE2 をインストールし、
HA クラスタを構成するプレイブック。

## 構成

| グループ | 役割 | 台数 |
|---|---|---|
| rke2-lb | HAProxy + Keepalived (VIP) | 2 |
| rke2-server-primary | コントロールプレーン #1 (クラスタ初期化) | 1 |
| rke2-server-secondary | コントロールプレーン #2〜#3 (join) | 2 |
| rke2-agent | ワーカーノード | 1〜 |

LB → Server (9345/6443) → Agent の順で起動する。

## 前提条件

- Python 3 / Pipenv がインストール済みであること
- `~/.ssh/id_rsa.pub` が存在すること (対象 VM への SSH 公開鍵として投入される)
- `BWS_ACCESS_TOKEN` 環境変数に BSM Machine Account Access Token がセットされていること
- 対象 VM に SSH パスワードログインできる状態であること (初回のみ)

## セットアップ

```bash
# 依存パッケージインストール (初回のみ)
pipenv install
pipenv run ansible-galaxy install -r requirements.yml
```

## 実行前の手動作業

### Step 1: BSM にシークレットを登録する

Bitwarden Secrets Manager (BSM) のプロジェクト `my-infra` に以下のシークレットを登録する:

| BSM シークレット名 | 値 |
|---|---|
| `KEEPALIVED_AUTH_PASS` | keepalived ノード間認証パスワード (任意の文字列) |

登録後、そのシークレット ID (UUID) を控えておく。

### Step 2: ファイルを実際の環境に合わせて更新する

| ファイル | 更新箇所 |
|---|---|
| `hosts/prd` | 全ノードの IP アドレスと hostname (`# CHANGE_ME` 箇所) |
| `group_vars/prd-all.yml` | `lb.vip`、`haproxy.servers` 各ノードの IP (`# CHANGE_ME` 箇所) |
| `group_vars/rke2-lb.yml` | `bsm_keepalived_auth_pass_id` を Step 1 で控えた UUID に変更 |
| `group_vars/all` | `ssh_public_key_path` (デフォルト `~/.ssh/id_rsa.pub` で問題なければ変更不要) |

## 実行

```bash
export BWS_ACCESS_TOKEN=<bws_machine_account_access_token>

# syntax check
pipenv run ansible-playbook -i hosts/prd site.yml --syntax-check

# dry-run
pipenv run ansible-playbook -i hosts/prd site.yml --ask-become-pass --check

# 実行
pipenv run ansible-playbook -i hosts/prd site.yml --ask-become-pass
```

## kubeconfig の取得

プレイブック完了後、サーバーノードから取得する:

```bash
ssh miutaku@<server_primary_ip> sudo cat /etc/rancher/rke2/rke2.yaml \
  | sed 's/127.0.0.1/<lb_vip>/g' \
  > ~/.kube/config-rke2
```

## ワーカーノードへの role ラベル付与

```bash
kubectl label nodes $(kubectl get nodes --no-headers | awk '$3 == "<none>" { print $1 }') \
  kubernetes.io/role=agent --overwrite=true
```

## 次のステップ

RKE2 クラスタ起動後、`k8s/pve/argocd/README.md` の手順で ArgoCD を Bootstrap する。

## アップグレード

既存クラスタのローリングアップグレードは
[`docs/rke2-upgrade.md`](../../docs/rke2-upgrade.md) を参照する。
現在のroleは新規インストール用であり、既存RKE2のversion更新には使用しない。

version検知、PR検証、production gateの設計は
[`docs/rke2-devops-strategy.md`](../../docs/rke2-devops-strategy.md) を参照する。
