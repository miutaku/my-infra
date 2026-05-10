# my-infra

自宅ホームラボ + クラウドサービス等、インフラ全体を管理するリポジトリ。

## アーキテクチャ概要

```
                        ┌─────────────────────────────────────┐
                        │        Grafana Labs (Managed)        │
                        │  Grafana Cloud ← metrics (remote_write)│
                        │  Grafana UI    ← PDC tunnel (VictoriaMetrics) │
                        └──────────────┬──────────────────────┘
                                       │
                     ┌─────────────────┼──────────────────────┐
                     │ Cloudflare      │                        │
                     │ - Tunnel (rke2-home / oke-cloud)        │
                     │ - Zero Trust Access                     │
                     │ - DNS (miutaku.work)                    │
                     └────┬──────────────────────┬────────────┘
                          │                      │
         ┌────────────────▼──────┐    ┌──────────▼──────────────┐
         │   宅内 (Proxmox VE)   │    │   OCI OKE (Always Free) │
         │                       │    │                          │
         │  RKE2 HA クラスタ      │    │  OKE Basic クラスタ      │
         │  - 2x LB (Keepalived) │    │  - 2x A1.Flex (ARM64)   │
         │  - 3x Server (etcd)   │    │  Flux v2 (GitOps)       │
         │  - 2x Worker          │    │  - ESO + Bitwarden BSM  │
         │  ArgoCD (App-of-Apps) │    │  - cert-manager         │
         │  - ESO + Bitwarden BSM│    │  - ingress-nginx (OCI LB)│
         │  - VictoriaMetrics    │    │  - Longhorn             │
         │  - Grafana Alloy      │    │  - cloudflared          │
         │  - Grafana PDC agent  │    │  - tfc-agent            │
         │  - cloudflared        │    │  - grafana-alloy        │
         │  - MetalLB / Tailscale│    │  - actions-runner       │
         │  - blackbox-exporter  │    │                          │
         │  - ntopng             │    │                          │
         │  - ntopng-exporter    │    │                          │
         │  - CoreDNS            │    │                          │
         │  - WoL (gptwol)       │    │                          │
         │  - tfc-agent          │    │                          │
         │                       │    │                          │
         │  IX2215 (ルーター)     │    │                          │
         │  - VLAN 10/20/30/40   │    │                          │
         │  - DHCP 静的リース     │    │                          │
         │  - map-e (IPv6)       │    │                          │
         │                       │    │                          │
         └───────────────────────┘    └──────────────────────────┘
```

## ドメイン

`miutaku.work` — Cloudflare で管理。
`miutaku.internal` — CoreDNS (RKE2 on MetalLB `192.168.20.201`) で内部名前解決。

## ネットワーク構成

| VLAN | サブネット | 用途 |
|------|-----------|------|
| (native) | 192.168.0.0/24 | |
| VLAN 10 | 192.168.10.0/24 | 管理 (PVE / RPi / nanokvm / スイッチ / AP) |
| VLAN 20 | 192.168.20.0/24 | サーバ (RKE2 / NAS / MetalLB pool: .200-.226) |
| VLAN 30 | 192.168.30.0/24 | クライアント (PC / ゲーム機) |
| VLAN 40 | 192.168.40.0/24 | IoT / スマートホーム |

## シークレット管理

すべてのシークレットは **Bitwarden Secrets Manager (BSM)** で管理する。  
k8s への注入は **External Secrets Operator (ESO)** + bitwarden-sdk-server 経由。  
Ansible は `bws` CLI + `BWS_ACCESS_TOKEN` 環境変数で取得する。

## リポジトリ構成

```
my-infra/
├── terraform/
│   ├── oci/            OCI OKE クラスタ (TFC workspace: my-infra)
│   ├── pve/            Proxmox VM 全台 (TFC workspace: pve-home)
│   └── cloudflare/     Cloudflare Tunnel / DNS / Zero Trust (TFC workspace: cloudflare)
├── ansible/
│   ├── rke2/           RKE2 クラスタ構成 (HAProxy + Keepalived + RKE2)
│   ├── ix2215/         IX2215 VLAN・DHCP 静的リース管理
│   └── pbs/            Proxmox Backup Server 構築
├── k8s/
│   ├── pve/            宅内 RKE2 (ArgoCD App-of-Apps)
│   └── oci/            OCI OKE (Flux v2 GitOps)
└── packer/
    ├── ubuntu-26-04/   Proxmox テンプレート (Ubuntu 26.04 LTS)
    └── truenas-scale/  Proxmox テンプレート (TrueNAS Scale)
```

## 作業フロー: 宅内クラスタを新規構築する順序

```
[1] terraform/pve/        → Proxmox VM を作成
[2] ansible/ix2215/       → IX2215 に DHCP 静的リースを設定 (MAC → IP 固定)
[3] ansible/rke2/         → RKE2 クラスタを構成
[4] k8s/pve/argocd/       → ArgoCD Bootstrap → App-of-Apps 起動
```

## 作業フロー: OKE クラスタを新規構築する順序

```
[1] terraform/oci/        → OKE クラスタを作成
[2] k8s/oci/flux/         → Flux v2 Bootstrap → GitOps 開始
```

## kubectl 操作環境

2 つの k8s クラスタを管理するために、kubeconfig を統合して使う。

### コンテキスト一覧

| コンテキスト名 | クラスタ | 取得方法 |
|---|---|---|
| `rke2-pve` | 宅内 RKE2 (Proxmox) | `scp master-01:/etc/rancher/rke2/rke2.yaml ~/.kube/rke2.yaml` |
| `oke-cloud` | OCI OKE | `oci ce cluster create-kubeconfig --cluster-id <id> --file ~/.kube/oke.yaml --region ap-tokyo-1 --kube-endpoint PUBLIC_ENDPOINT` |

### セットアップ手順

```bash
# 1. 各クラスタの kubeconfig を取得して名前変更
scp master-01:/etc/rancher/rke2/rke2.yaml ~/.kube/config-rke2.yaml
oci ce cluster create-kubeconfig --cluster-id <cluster-ocid> --file ~/.kube/config-oke.yaml \
  --region ap-tokyo-1 --kube-endpoint PUBLIC_ENDPOINT

# 2. context 名を変更 (rke2.yaml)
kubectl --kubeconfig ~/.kube/rke2.yaml config rename-context default rke2-pve

# 3. 統合
KUBECONFIG=~/.kube/rke2.yaml:~/.kube/oke.yaml kubectl config view --flatten > ~/.kube/config

# 4. kubectx / kubens インストール (~/bin/ へ)
curl -sLo ~/bin/kubectx https://raw.githubusercontent.com/ahmetb/kubectx/master/kubectx && chmod +x ~/bin/kubectx
curl -sLo ~/bin/kubens  https://raw.githubusercontent.com/ahmetb/kubectx/master/kubens  && chmod +x ~/bin/kubens
```

### 日常操作

```bash
kubectx              # コンテキスト一覧
kubectx rke2-pve     # 宅内 RKE2 に切り替え
kubectx oke-cloud    # OCI OKE  に切り替え
kubens               # namespace 一覧
```

---

## 各コンポーネントの README

作業前に必ず該当 README を読むこと。

| コンポーネント | README | 主な内容 |
|---|---|---|
| OCI Terraform | [terraform/oci/README.md](./terraform/oci/README.md) | OKE 構築, TFC Variables |
| PVE Terraform | [terraform/pve/README.md](./terraform/pve/README.md) | VM 作成, MAC/IP 管理, Ansible 自動生成 |
| Cloudflare Terraform | [terraform/cloudflare/README.md](./terraform/cloudflare/README.md) | Tunnel, DNS, Zero Trust |
| RKE2 Ansible | [ansible/rke2/README.md](./ansible/rke2/README.md) | RKE2 HA クラスタ構成 |
| IX2215 Ansible | [ansible/ix2215/README.md](./ansible/ix2215/README.md) | VLAN・DHCP 静的リース |
| PBS Ansible | [ansible/pbs/README.md](./ansible/pbs/README.md) | Proxmox Backup Server |
| ArgoCD Bootstrap (RKE2) | [k8s/pve/argocd/README.md](./k8s/pve/argocd/README.md) | BSM シークレット一覧, App-of-Apps |
| Flux Bootstrap (OKE) | [k8s/oci/flux/README.md](./k8s/oci/flux/README.md) | BSM シークレット一覧, TLS cert 手順, Kustomization 順序 |
| PDC Agent | [k8s/pve/pdc-agent/README.md](./k8s/pve/pdc-agent/README.md) | Grafana PDC トンネル |
| Packer Ubuntu | [packer/ubuntu-26-04/README.md](./packer/ubuntu-26-04/README.md) | テンプレートビルド |
| Packer TrueNAS | [packer/truenas-scale/README.md](./packer/truenas-scale/README.md) | テンプレートビルド |
| Actions Runner (OKE) | [k8s/oci/apps/actions-runner/README.md](./k8s/oci/apps/actions-runner/README.md) | OKE 上の GitHub runner |
| ntopng | [k8s/pve/ntopng/README.md](./k8s/pve/ntopng/README.md) | NetFlow 受信・フロー可視化・ntopng-exporter |

## 監視アーキテクチャ

```
各ホスト/機器
  ├─ node_exporter :9100    (VM: ansible/monitoring で導入)
  ├─ snmp-exporter :9116    (IX2215 SNMP v2c, community: monitor)
  └─ pve-exporter  :9221    (Proxmox API)
         │
         ▼
  Grafana Alloy (RKE2 DaemonSet)
  ├─ scrape: node / pods / SNMP / PVE / static VMs / blackbox / ntopng
  ├─ remote_write → VictoriaMetrics (クラスタ内 :8428)
  └─ remote_write → Grafana Cloud (remote_write endpoint)
         │
         ▼
  Grafana Cloud ← PDC Tunnel (VictoriaMetrics経由)
```

### メトリクス収集対象

| ホスト / 機器 | IP | 収集方法 | 状態 |
|---|---|---|---|
| IX2215 | 192.168.0.254 | snmp-exporter (IF-MIB) | ✅ |
| IX2215 | 192.168.0.254 | blackbox HTTP/ICMP | ✅ |
| IX2215 | 192.168.0.254 | ntopng (NetFlow v9 → 192.168.20.210) | ✅ |
| pve-x570 | 192.168.10.115 | pve-exporter | BSM 要設定 |
| pve-b550m | 192.168.10.119 | pve-exporter | BSM 要設定 |
| RKE2 nodes ×5 | 192.168.20.126-130 | Alloy DaemonSet (node) | ✅ |
| LB ×2 | 192.168.20.135-136 | node_exporter :9100 + blackbox ICMP | ✅ |
| dev-app-server | 192.168.20.101 | node_exporter :9100 | ✅ |
| dev-rec-server | 192.168.20.150 | node_exporter :9100 | ✅ |
| prd-rec-server | 192.168.20.151 | node_exporter :9100 | ✅ |
| mm-server-01 (MagicMirror²) | 192.168.40.1 | node_exporter :9100 | ✅ (VLAN40) |
| nas-01/02 (TrueNAS) | 192.168.20.191-192 | node_exporter :9100 | 要手動インストール |
| OKE nodes ×2 | 10.0.1.x | Alloy DaemonSet (node) | ✅ |

### node_exporter について

node_exporter は **Packer テンプレート** (`packer/ubuntu-26-04/`) にベイク済み。  
テンプレートから作成した VM は起動時点で `:9100` でメトリクスを公開する。

既存 VM（テンプレート再ビルド前に作成済み）は Ansible で一括導入:

```bash
cd ansible/monitoring
ansible-playbook site.yml
```

### PVE exporter の有効化（BSM シークレット登録後）

Proxmox Web UI で API トークンを発行し BSM に登録:
- `PVE_MONITORING_TOKEN_ID` — 例: `root@pam!monitoring`
- `PVE_MONITORING_TOKEN_SECRET` — トークンシークレット

### Grafana Cloud 推奨ダッシュボード

| ダッシュボード | ID |
|---|---|
| Node Exporter Full | 1860 |
| SNMP Interface Stats | 11169 |
| Proxmox VE | 10347 |
| Blackbox Exporter | 7587 |
| ntopng Flow Analysis | (ntopng-exporter で収集、Grafana で可視化) |

---

## 開発環境セットアップ

クローン後に一度だけ実行する:

```bash
git config core.hooksPath .githooks
```

push 前に変更があったディレクトリのみ自動で lint が走る:

| 変更パス | 実行内容 |
|---|---|
| `ansible/ix2215/**` | `pipenv run ansible-lint site.yml` |
| `packer/ubuntu-26-04/**` | `packer validate` |
| `packer/truenas-scale/**` | `packer validate` |

---

## CI / GitHub Actions

| ワークフロー | トリガーパス | 内容 |
|---|---|---|
| `terraform_pve.yml` | `terraform/pve/**` | plan (PR) / apply (main) + Ansible inventory 自動コミット |
| `terraform_oci.yml` | `terraform/oci/**` | plan (PR) / apply (main) |
| `terraform_cloudflare.yml` | `terraform/cloudflare/**` | plan (PR) / apply (main) |
| `ansible_check_rke2.yml` | `ansible/rke2/**` | lint + syntax-check |
| `ansible_check_ix2215.yml` | `ansible/ix2215/**` | lint + syntax-check |
| `packer.yml` | `packer/**` | packer validate (実ビルドは手動) |
