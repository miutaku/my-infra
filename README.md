# my-infra

自宅ホームラボ + クラウドサービス等、インフラ全体を管理するリポジトリ。

## アーキテクチャ概要

```mermaid
flowchart TB
  Internet((Internet))
  Grafana[Grafana Cloud<br/>managed metrics / dashboards]
  Cloudflare[Cloudflare<br/>DNS / Tunnel / Zero Trust Access]

  subgraph Home[宅内 / Proxmox VE]
    IX[IX2215<br/>VLAN / DHCP / v6プラス固定IP]
    PVE[Proxmox nodes<br/>pve-x570 / pve-b550m]
    UOS[UniFi OS Server VM<br/>192.168.0.132:11443]

    subgraph RKE2[RKE2 HA cluster]
      LB[2x HAProxy + Keepalived<br/>VIP 192.168.20.227]
      Servers[3x RKE2 server / etcd<br/>192.168.20.126-128]
      Workers[2x RKE2 agent<br/>192.168.20.129-130]
      Argo[ArgoCD App-of-Apps]
      HomeApps[ESO + Bitwarden BSM<br/>VictoriaMetrics / Alloy / PDC agent<br/>cloudflared / tfc-agent / Tailscale<br/>MetalLB / CoreDNS / WoL<br/>blackbox / snmp / pve / speedtest exporters]
    end

    PVE --> RKE2
    PVE --> UOS
    IX --> PVE
    Argo --> HomeApps
  end

  subgraph OCI[OCI OKE / Always Free]
    OKE[OKE Basic cluster<br/>2x A1.Flex ARM64]
    Flux[Flux v2 GitOps]
    OCIApps[ESO + Bitwarden BSM<br/>cert-manager / ingress-nginx<br/>Longhorn / cloudflared<br/>tfc-agent / actions-runner / Alloy]
    OKE --> Flux --> OCIApps
  end

  Internet --> Cloudflare
  Cloudflare -->|rke2-home tunnel| RKE2
  RKE2 -->|LAN backend / monitoring| UOS
  Cloudflare --> OCI
  RKE2 -->|remote_write| Grafana
  OCI -->|remote_write| Grafana
  Grafana -->|PDC tunnel| RKE2
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
│   ├── uos/            UniFi OS Server 専用 VM 構成
│   ├── monitoring/     既存 VM 向け node_exporter 補助 playbook
│   └── pbs/            Proxmox Backup Server 構築
├── k8s/
│   ├── pve/            宅内 RKE2 (ArgoCD App-of-Apps)
│   └── oci/            OCI OKE (Flux v2 GitOps)
└── packer/
    ├── ubuntu-26-04/   Proxmox テンプレート (Ubuntu 26.04 LTS)
    └── truenas-scale/  Proxmox テンプレート (TrueNAS Scale)
```

## 作業フロー: 宅内クラスタを新規構築する順序

```mermaid
flowchart LR
  Packer[packer/ubuntu-26-04<br/>VM template]
  Terraform[terraform/pve<br/>Proxmox VM作成]
  IX[ansible/ix2215<br/>DHCP静的リース反映]
  RKE2[ansible/rke2<br/>RKE2 HA構成]
  UOS[ansible/uos<br/>UniFi OS Server VM構成]
  Argo[k8s/pve/argocd<br/>ArgoCD Bootstrap]
  Apps[k8s/pve/argocd-apps<br/>App-of-Apps同期]

  Packer --> Terraform --> IX
  IX --> RKE2 --> Argo --> Apps
  IX --> UOS
```

## 作業フロー: OKE クラスタを新規構築する順序

```mermaid
flowchart LR
  Terraform[terraform/oci<br/>OKEクラスタ作成]
  Flux[k8s/oci/flux<br/>Flux v2 Bootstrap]
  Sources[k8s/oci/infrastructure/sources<br/>HelmRepository等]
  Infra[k8s/oci/infrastructure<br/>ESO / cert-manager / ingress-nginx / Longhorn]
  Apps[k8s/oci/apps<br/>cloudflared / tfc-agent / actions-runner / Alloy]

  Terraform --> Flux --> Sources --> Infra --> Apps
```

## kubectl 操作環境

2 つの k8s クラスタを管理するために、kubeconfig を統合して使う。

### コンテキスト一覧

| コンテキスト名 | クラスタ | 接続先 |
|---|---|---|
| `rke2-pve` | 宅内 RKE2 (Proxmox) | LB VIP `192.168.20.227:6443` |
| `oke-cloud` | OCI OKE | 以下のセットアップ手順で設定すると構成される |

### セットアップ手順 (新規マシン)

セットアップ用スクリプトを `scripts/` に用意している。

**Step 1: ツール一式をインストール**

`BWS_ACCESS_TOKEN` は BSMから取得しておく。

```bash
echo 'export BWS_ACCESS_TOKEN="<ACCESS_TOKEN>"' >> ~/.bashrc
bash scripts/setup-k8s-tools
source ~/.bashrc
```

インストールされるもの: `kubectl`, `kubectx`, `kubens`, `oci` (OCI CLI), `bws` (Bitwarden SM CLI)  
OCI 認証情報 (`~/.oci/config`, `~/.oci/oci_api_key.pem`) は BSM の `OCI_*` シークレットから自動生成される。

**Step 2: kubeconfig を取得・統合**

```bash
bash scripts/setup-kubeconfig   # RKE2 + OKE 両方取得して ~/.kube/config に統合
# 個別に設定も可能:
bash scripts/setup-kubeconfig --rke2-only
bash scripts/setup-kubeconfig --oke-only
```

> **RKE2 の注意点**
> - `/etc/rancher/rke2/rke2.yaml` は root 所有のため、スクリプトでは `sudo cat` 経由で取得される
> - kubeconfig 内の `server` が `127.0.0.1:6443` になっているため、スクリプトで LB VIP (`192.168.20.227`) に自動書き換え
> - SSH 接続先は `master-01` (IP: `192.168.20.126`)

> **OKE の注意点**
> - kubeconfig の認証に `oci` コマンドを使う exec plugin が埋め込まれる
> - `oci` が PATH 上にある必要があるため `/usr/local/bin/oci -> ~/bin/oci` のシンボリックリンクを作成する

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
| UniFi OS Server Ansible | [ansible/uos/README.md](./ansible/uos/README.md) | 専用 VM 上の UniFi OS Server 構成 |
| PBS Ansible | [ansible/pbs/README.md](./ansible/pbs/README.md) | Proxmox Backup Server |
| ArgoCD Bootstrap (RKE2) | [k8s/pve/argocd/README.md](./k8s/pve/argocd/README.md) | BSM シークレット一覧, App-of-Apps |
| Flux Bootstrap (OKE) | [k8s/oci/flux/README.md](./k8s/oci/flux/README.md) | BSM シークレット一覧, TLS cert 手順, Kustomization 順序 |
| PDC Agent | [k8s/pve/pdc-agent/README.md](./k8s/pve/pdc-agent/README.md) | Grafana PDC トンネル |
| Packer Ubuntu | [packer/ubuntu-26-04/README.md](./packer/ubuntu-26-04/README.md) | テンプレートビルド |
| Packer TrueNAS | [packer/truenas-scale/README.md](./packer/truenas-scale/README.md) | テンプレートビルド |
| Actions Runner (OKE) | [k8s/oci/apps/actions-runner/README.md](./k8s/oci/apps/actions-runner/README.md) | OKE 上の GitHub runner |

## 監視アーキテクチャ

```mermaid
flowchart TB
  Hosts[VM / NAS / ネットワーク機器]
  Node[node_exporter :9100<br/>Ubuntu VMはPackerテンプレートに同梱]
  SNMP[snmp-exporter :9116<br/>IX2215 / TrueNAS]
  PVE[pve-exporter :9221<br/>Proxmox API]
  Blackbox[blackbox-exporter :9115<br/>HTTP / ICMP]
  Alloy[Grafana Alloy<br/>RKE2 DaemonSet]
  VM[VictoriaMetrics<br/>RKE2内]
  Cloud[Grafana Cloud<br/>remote_write]
  PDC[Grafana PDC agent<br/>VictoriaMetrics query tunnel]

  Hosts --> Node
  Hosts --> SNMP
  Hosts --> PVE
  Hosts --> Blackbox
  Node --> Alloy
  SNMP --> Alloy
  PVE --> Alloy
  Blackbox --> Alloy
  Alloy --> VM
  Alloy --> Cloud
  Cloud --> PDC --> VM
```

### メトリクス収集対象

| ホスト / 機器 | IP | 収集方法 | 状態 |
|---|---|---|---|
| IX2215 | 192.168.0.254 | snmp-exporter (IF-MIB) | ✅ |
| IX2215 | 192.168.0.254 | blackbox HTTP/ICMP | ✅ |
| pve-x570 | 192.168.0.115 | pve-exporter | BSM 要設定 |
| pve-b550m | 192.168.0.119 | pve-exporter | BSM 要設定 |
| RKE2 nodes ×5 | 192.168.20.126-130 | Alloy DaemonSet (node) | ✅ |
| UniFi OS Server VM | 192.168.0.132 | node_exporter :9100 + blackbox HTTP/ICMP | ✅ |
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

既存 VM（テンプレート再ビルド前に作成済み）は、必要に応じて Ansible で一括導入する。

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
