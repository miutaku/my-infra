# my-infra

自宅ホームラボ + OCI クラウドのインフラ全体を管理するリポジトリ。

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

`miutaku.work` — Cloudflare で管理。Let's Encrypt (DNS01) で証明書取得。  
`miutaku.local` — CoreDNS (RKE2 on MetalLB `192.168.20.201`) で内部名前解決。

## ネットワーク構成

| VLAN | サブネット | 用途 |
|------|-----------|------|
| (native) | 192.168.0.0/24 | レガシー / 移行期間中 |
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
| `rke2-pve` | 宅内 RKE2 (Proxmox) | `scp bastion-01:/etc/rancher/rke2/rke2.yaml ~/.kube/rke2.yaml` |
| `oke-cloud` | OCI OKE | `oci ce cluster create-kubeconfig --cluster-id <id> --file ~/.kube/oke.yaml --region ap-tokyo-1 --kube-endpoint PUBLIC_ENDPOINT` |

### セットアップ手順

```bash
# 1. 各クラスタの kubeconfig を取得して名前変更
scp bastion-01:/etc/rancher/rke2/rke2.yaml ~/.kube/rke2.yaml
oci ce cluster create-kubeconfig --cluster-id <cluster-ocid> --file ~/.kube/oke.yaml \
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

## CI / GitHub Actions

| ワークフロー | トリガーパス | 内容 |
|---|---|---|
| `terraform_pve.yml` | `terraform/pve/**` | plan (PR) / apply (main) + Ansible inventory 自動コミット |
| `terraform_oci.yml` | `terraform/oci/**` | plan (PR) / apply (main) |
| `terraform_cloudflare.yml` | `terraform/cloudflare/**` | plan (PR) / apply (main) |
| `ansible_check_rke2.yml` | `ansible/rke2/**` | lint + syntax-check |
| `ansible_check_ix2215.yml` | `ansible/ix2215/**` | lint + syntax-check |
| `packer.yml` | `packer/**` | packer validate (実ビルドは手動) |
