# アーキテクチャモデル

LikeC4の試作。`model.c4`にリソースと関係を一度だけ定義し、`views.c4`で目的ごとの図を選ぶ。入れ子の枠は稼働・収容場所を表す。配置図では枠と収容関係を使い、通常の通信矢印を表示しない。図の矢印は論理的な要求・操作の向きで、TCP接続を開始する向きではない。TunnelやPDCは外向きに接続する。

| 関係 | 意味 |
| --- | --- |
| access / 青・実線 | 利用者・管理者の要求、実行時のサービス通信 |
| deploy / 橙・破線 | Git取得、image配布、API操作、構成の同期 |
| secret / 赤・点線 | 秘密情報の取得・注入。値は記載しない |
| observe / 緑・点線 | scrape、ログ・メトリクス送信、query |
| placement / 灰・破線 | 稼働場所・収容関係。通信を意味しない |

色・線種はLikeC4の対話ビューで確認する。Mermaid出力ではLikeC4の線種・色が保持されないため、READMEではviewの目的と矢印の操作名で意味を区別する。

## 編集・確認

Node.js 24を使用する。

```bash
cd docs/architecture
npm ci
npm run dev       # 対話的に各viewを閲覧
npm run validate # DSL・参照・layoutを検証
npm run generate # MermaidとREADMEの図を再生成
npm run check    # 生成物の更新漏れを検査
npm run build    # dist/ に対話的な静的サイトを生成
```

正本は `.c4`。`generated/*.mmd`、このREADMEの図、ルートREADMEの図は生成物で、直接編集しない。配置や関係を変えたらモデルを更新し、既存viewに出す必要があるかを確認する。新しい関係種別は `specification.c4` に追加する。各viewは関係のkindも絞るため、同じリソースを含めても異なる意味の線が混入しない。

[CIテンプレート](architecture-workflow.yml)は検証、生成差分の確認、対話サイトのbuildを行い、サイトをActions artifactとして保存する。GitHubのpush認証に `workflow` scopeがないため、試作では自動実行を有効にしていない。権限を持つ認証で `.github/workflows/architecture.yml` に配置すると利用できる。公開ホスティングは設定していない。

既定の `index` は利用者アクセス図。すべての関係を混ぜた全体図は自動生成しない。STG/PRDの枠はOCI環境の境界で、LBはOKEクラスタ外、GatewayとアプリはOKE内。`ESO + SDK` 等は役割をまとめた論理要素で、単一Podを意味しない。

## 範囲と構成の根拠

これは定義ファイルから整理した論理構成で、稼働環境の自動検出ではない。Pod・Secret・IAM・DNSレコードの全件一覧は対象定義を参照する。リソース追加はモデルに反映し、特定viewで省略することとモデルから削除することを区別する。STG/PRDやリポジトリ間で共有する基盤は各モデルの境界要素として明記し、詳細の正本は所有リポジトリに置く。

| 構成 | 定義・所有者 |
| --- | --- |
| Proxmox / Talos / NAS / VLAN | [Terraform](../../terraform/)、[Talos](../../talos/home-k8s/)、[Ansible](../../ansible/) |
| 自宅のhostname / Access / Tunnel | [Cloudflare Terraform](../../terraform/cloudflare/locals.tf)、[cloudflared](../../k8s/pve/cloudflared/) |
| home-k8sアプリ / agents / ESO SDK | [App-of-Apps](../../k8s/pve/argocd-apps/)、[SecretStore](../../k8s/pve/external-secrets/cluster-secret-store.yaml) |
| 自宅ArgoCD / Image Updater / Re:Venter destination | [GitOps](../../k8s/pve/reventer-gitops/README.md) |
| STG / PRD共通基盤 | [STG ArgoCD](../../k8s/oci/argocd/)、[STG基盤](../../k8s/oci/infrastructure/)、[PRD基盤](../../k8s/oci-prd/) |
| Terraform実行モード / agent | [workflows](../../.github/workflows/)、[tfc-agent](../../k8s/pve/tfc-agent/)、[監視VM local実行](../../terraform/oci-observability/README.md) |
| 監視 | [home vmagent](../../k8s/pve/vmagent/values.yaml)、[監視VM](../../observability/reventer/) |
| PRD OKE・アプリ・TiDB・メール・公開edge | [reventerモデル](https://github.com/miutaku/reventer/tree/docs/likec4-architecture/docs/architecture) |

自宅アプリは代表サービスをまとめて表示する。全ApplicationはApp-of-Apps、公開hostnameの全件はCloudflare localsが正本。RPi workerはProxmox VMではない。Re:Venterのユーザーアクセスは公開LB、GitOpsはKubernetes APIを使い、拠点間VPNは使わない。Accessはhostnameごとに適用され、全サービスへの一律認証を意味しない。

BWS access token・SDK TLS・ArgoCD deploy key/クラスタ接続情報にはbootstrap投入が必要。ESOだけでbootstrapが完結するわけではない。監視VMはOKE外で稼働し、Terraform stateをCloudに置いても実行はlocal。CI→TFC、agent→Proxmox、管理端末→監視VMを分けて表す。

## 図

<!-- likec4:all:start -->

### 利用者・管理者のアクセス

```mermaid
---
title: "利用者・管理者のアクセス"
---
graph LR
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者 / Ansible / Talos CLI" }
  Network@{ shape: rectangle, label: "IX2215 / switch / AP / VLAN" }
  Edge@{ shape: rectangle, label: "Cloudflare DNS / Access / Tunnel" }
  subgraph Home["`home-k8s / Talos`"]
    Home.Tunnel@{ shape: rectangle, label: "cloudflared" }
    Home.Dns@{ shape: rectangle, label: "CoreDNS / MetalLB" }
    Home.Apps@{ shape: rectangle, label: "Nextcloud / 録画・配信 / WoL / その他アプリ" }
    Home.Argo@{ shape: rectangle, label: "ArgoCD + Image Updater" }
  end
  subgraph Stg["`STG OCI / OKE`"]
    Stg.Lb@{ shape: rectangle, label: "OCI LB / NGINX Gateway" }
    Stg.Apps@{ shape: rectangle, label: "Re:Venterアプリ / reventer所有" }
  end
  subgraph Prd["`PRD OCI / OKE / reventer所有`"]
    Prd.Lb@{ shape: rectangle, label: "OCI LB / NGINX Gateway" }
    Prd.Apps@{ shape: rectangle, label: "Re:Venterアプリ / reventer所有" }
  end
  Nas@{ shape: disk, label: "TrueNAS" }
  User -. "`公開hostname HTTPS`" .-> Edge
  Operator -. "`管理hostname / Access`" .-> Edge
  User -. "`LANアクセス`" .-> Network
  Edge -. "`Access対象は認証後 / Tunnel`" .-> Home.Tunnel
  Home.Tunnel -. "`内部serviceへ転送`" .-> Home.Apps
  Home.Tunnel -. "`管理UI`" .-> Home.Argo
  Network -. "`内部DNS問い合わせ`" .-> Home.Dns
  Home.Apps -. "`録画保存 / NFS`" .-> Nas
  Edge -. "`Re:Venter STG / Access`" .-> Stg.Lb
  Edge -. "`Re:Venter PRD / 公開`" .-> Prd.Lb
  Stg.Lb -. "`HTTPRoute`" .-> Stg.Apps
  Prd.Lb -. "`HTTPRoute`" .-> Prd.Apps
```

### GitOps・Terraform・構成管理

```mermaid
---
title: "GitOps・Terraform・構成管理"
---
graph LR
  Ci@{ shape: rectangle, label: "GitHub Actions" }
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者 / Ansible / Talos CLI" }
  Monitorstg@{ shape: rectangle, label: "STG OCI監視VM 2台" }
  Monitorprd@{ shape: rectangle, label: "PRD OCI監視VM 2台" }
  Network@{ shape: rectangle, label: "IX2215 / switch / AP / VLAN" }
  subgraph Home["`home-k8s / Talos`"]
    Home.Argo@{ shape: rectangle, label: "ArgoCD + Image Updater" }
    Home.Agent@{ shape: rectangle, label: "Terraform Cloud agent" }
    Home.Runner@{ shape: rectangle, label: "ARC GitHub Actions runners" }
    Home.Apps@{ shape: rectangle, label: "Nextcloud / 録画・配信 / WoL / その他アプリ" }
    Home.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
  end
  Tfc@{ shape: rectangle, label: "Terraform Cloud" }
  Pve@{ shape: rectangle, label: "Proxmox VE 2ホスト" }
  subgraph Stg["`STG OCI / OKE`"]
    Stg.Argo@{ shape: rectangle, label: "共通基盤用ArgoCD" }
    Stg.Apps@{ shape: rectangle, label: "Re:Venterアプリ / reventer所有" }
    Stg.Admin@{ shape: rectangle, label: "STG / PRD管理画面 / reventer所有" }
    Stg.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
  end
  Git@{ shape: disk, label: "GitHub my-infra / reventer" }
  subgraph Prd["`PRD OCI / OKE / reventer所有`"]
    Prd.Apps@{ shape: rectangle, label: "Re:Venterアプリ / reventer所有" }
    Prd.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
  end
  Ci -. "`plan / apply run`" .-> Tfc
  Home.Argo -. "`desired state取得`" .-> Git
  Home.Agent -. "`job取得 / 実行結果`" .-> Tfc
  Ci -. "`job配布`" .-> Home.Runner
  Home.Argo -. "`Kubernetes APIへ同期`" .-> Home.Apps
  Home.Argo -. "`共通基盤同期`" .-> Home.Eso
  Home.Agent -. "`Proxmox API / VM作成`" .-> Pve
  Stg.Argo -. "`共通基盤定義取得`" .-> Git
  Home.Argo -. "`Kubernetes APIへ同期`" .-> Stg.Apps
  Home.Argo -. "`Kubernetes APIへ同期`" .-> Prd.Apps
  Stg.Argo -. "`共通基盤同期`" .-> Stg.Eso
  Stg.Argo -. "`PRD共通基盤同期`" .-> Prd.Eso
  Home.Argo -. "`STG OKEへ同期`" .-> Stg.Admin
  Operator -. "`Terraform local / Ansible`" .-> Monitorstg
  Operator -. "`Terraform local / Ansible`" .-> Monitorprd
  Operator -. "`Ansible設定`" .-> Network
  Tfc -. "`OCI API / STG作成`" .-> Stg
  Operator -. "`Talos設定 / bootstrap`" .-> Home
```

### 収集・保存・Grafana query

```mermaid
---
title: "収集・保存・Grafana query"
---
graph LR
  Grafana@{ shape: rectangle, label: "Grafana Cloud" }
  subgraph Stg["`STG OCI / OKE`"]
    Stg.Collect@{ shape: rectangle, label: "vmagent / Fluent Bit" }
  end
  subgraph Prd["`PRD OCI / OKE / reventer所有`"]
    Prd.Collect@{ shape: rectangle, label: "vmagent / Fluent Bit" }
  end
  subgraph Home["`home-k8s / Talos`"]
    Home.Scrape@{ shape: rectangle, label: "vmagent / exporters" }
    Home.Pdc@{ shape: rectangle, label: "Grafana PDC" }
    Home.Metrics@{ shape: disk, label: "VictoriaMetrics" }
  end
  Monitorstg@{ shape: rectangle, label: "STG OCI監視VM 2台" }
  Monitorprd@{ shape: rectangle, label: "PRD OCI監視VM 2台" }
  Pve@{ shape: rectangle, label: "Proxmox VE 2ホスト" }
  Network@{ shape: rectangle, label: "IX2215 / switch / AP / VLAN" }
  Nas@{ shape: disk, label: "TrueNAS" }
  Home.Scrape -. "`remote_write`" .-> Home.Metrics
  Home.Pdc -. "`query`" .-> Home.Metrics
  Home.Scrape -. "`API scrape`" .-> Pve
  Home.Scrape -. "`SNMP / probes`" .-> Network
  Home.Scrape -. "`exporter scrape`" .-> Nas
  Grafana -. "`PDC経由query`" .-> Home.Pdc
  Grafana -. "`PDC経由query`" .-> Monitorstg
  Stg.Collect -. "`metrics / logs`" .-> Monitorstg
  Grafana -. "`PDC経由query`" .-> Monitorprd
  Prd.Collect -. "`metrics / logs`" .-> Monitorprd
```

### 稼働場所と管理基盤

```mermaid
---
title: "稼働場所と管理基盤"
---
graph LR
  Pve@{ shape: rectangle, label: "Proxmox VE 2ホスト" }
  Nas@{ shape: disk, label: "TrueNAS" }
  subgraph Home["`home-k8s / Talos`"]
    Home.Argo@{ shape: rectangle, label: "ArgoCD + Image Updater" }
    Home.Tunnel@{ shape: rectangle, label: "cloudflared" }
    Home.Agent@{ shape: rectangle, label: "Terraform Cloud agent" }
    Home.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
    Home.Secrets@{ shape: disk, label: "Kubernetes Secrets" }
    Home.Apps@{ shape: rectangle, label: "Nextcloud / 録画・配信 / WoL / その他アプリ" }
    Home.Dns@{ shape: rectangle, label: "CoreDNS / MetalLB" }
    Home.Metrics@{ shape: disk, label: "VictoriaMetrics" }
    Home.Scrape@{ shape: rectangle, label: "vmagent / exporters" }
    Home.Pdc@{ shape: rectangle, label: "Grafana PDC" }
    Home.Runner@{ shape: rectangle, label: "ARC GitHub Actions runners" }
  end
  subgraph Stg["`STG OCI / OKE`"]
    Stg.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
    Stg.Secrets@{ shape: disk, label: "Kubernetes Secrets" }
    Stg.Apps@{ shape: rectangle, label: "Re:Venterアプリ / reventer所有" }
    Stg.Lb@{ shape: rectangle, label: "OCI LB / NGINX Gateway" }
    Stg.Collect@{ shape: rectangle, label: "vmagent / Fluent Bit" }
    Stg.Argo@{ shape: rectangle, label: "共通基盤用ArgoCD" }
    Stg.Admin@{ shape: rectangle, label: "STG / PRD管理画面 / reventer所有" }
  end
  subgraph Prd["`PRD OCI / OKE / reventer所有`"]
    Prd.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
    Prd.Secrets@{ shape: disk, label: "Kubernetes Secrets" }
    Prd.Apps@{ shape: rectangle, label: "Re:Venterアプリ / reventer所有" }
    Prd.Lb@{ shape: rectangle, label: "OCI LB / NGINX Gateway" }
    Prd.Collect@{ shape: rectangle, label: "vmagent / Fluent Bit" }
  end
  Pve -. "`NAS VM収容`" .-> Nas
```

### BWS・SDK・ESO・bootstrap

```mermaid
---
title: "BWS・SDK・ESO・bootstrap"
---
graph LR
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者 / Ansible / Talos CLI" }
  subgraph Home["`home-k8s / Talos`"]
    Home.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
    Home.Secrets@{ shape: disk, label: "Kubernetes Secrets" }
    Home.Apps@{ shape: rectangle, label: "Nextcloud / 録画・配信 / WoL / その他アプリ" }
    Home.Argo@{ shape: rectangle, label: "ArgoCD + Image Updater" }
    Home.Agent@{ shape: rectangle, label: "Terraform Cloud agent" }
    Home.Tunnel@{ shape: rectangle, label: "cloudflared" }
    Home.Runner@{ shape: rectangle, label: "ARC GitHub Actions runners" }
  end
  subgraph Stg["`STG OCI / OKE`"]
    Stg.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
    Stg.Secrets@{ shape: disk, label: "Kubernetes Secrets" }
    Stg.Apps@{ shape: rectangle, label: "Re:Venterアプリ / reventer所有" }
    Stg.Admin@{ shape: rectangle, label: "STG / PRD管理画面 / reventer所有" }
  end
  subgraph Prd["`PRD OCI / OKE / reventer所有`"]
    Prd.Eso@{ shape: rectangle, label: "ESO + Bitwarden SDK server" }
    Prd.Secrets@{ shape: disk, label: "Kubernetes Secrets" }
    Prd.Apps@{ shape: rectangle, label: "Re:Venterアプリ / reventer所有" }
  end
  Bws@{ shape: disk, label: "Bitwarden Secrets Manager" }
  Operator -. "`bws CLI / bootstrap`" .-> Bws
  Home.Eso -. "`SDK経由取得`" .-> Bws
  Stg.Eso -. "`SDK経由取得`" .-> Bws
  Prd.Eso -. "`SDK経由取得`" .-> Bws
  Home.Eso -. "`同期`" .-> Home.Secrets
  Stg.Eso -. "`同期`" .-> Stg.Secrets
  Prd.Eso -. "`同期`" .-> Prd.Secrets
  Home.Secrets -. "`注入`" .-> Home.Apps
  Stg.Secrets -. "`注入`" .-> Stg.Apps
  Prd.Secrets -. "`注入`" .-> Prd.Apps
  Home.Secrets -. "`GHCR / 通知認証情報`" .-> Home.Argo
  Home.Secrets -. "`agent token`" .-> Home.Agent
  Home.Secrets -. "`tunnel token`" .-> Home.Tunnel
  Home.Secrets -. "`runner認証`" .-> Home.Runner
  Stg.Secrets -. "`環境別注入`" .-> Stg.Admin
```

<!-- likec4:all:end -->
