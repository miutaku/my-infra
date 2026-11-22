# my-infra

自宅とOCIの共通インフラを管理するリポジトリ。Terraformでリソースを管理し、AnsibleでVM・機器を設定、ArgoCDでKubernetesの状態を同期する。

## 全体構成

[LikeC4で構成を見る](https://miutaku.github.io/my-infra/) — 要素をクリックして、通信・デプロイ・秘密情報・監視・配置を辿れます。[全リソース一覧](https://miutaku.github.io/my-infra/resources.html)は定義から自動抽出します。

| 基盤 | 現在の構成・役割 |
| --- | --- |
| 自宅 | Proxmox VE 2ホスト。Talos VM、TrueNAS、その他のVM/LXCを収容 |
| home-k8s | Talos v1.14.1 / Kubernetes v1.35.7。control plane VM 3台、worker VM 2台、Raspberry Pi worker 2台 |
| STG・PRD OKE | 東京リージョン、環境別OCIアカウント。OKE BASIC / Kubernetes v1.36.4 / Flannel |
| OKE worker | 各環境にbase 1台＋burst 0〜1台。A1 Flex、1台あたり2 OCPU・12GB RAM・boot 50GB |
| OCI監視基盤 | OKEから独立したE2.1.Micro VM 2台／環境 |
| 外部サービス | Cloudflare、Terraform Cloud、GitHub、Bitwarden Secrets Manager、Grafana Cloud |

自宅ではNextcloud、録画・配信、内部DNSなどのサービスと管理用agentを稼働させる。Re:Venterのアプリ構成・デプロイ手順は[Re:Venterリポジトリ](https://github.com/miutaku/reventer)で管理する。

## 管理責務

| 対象 | 管理する場所 |
| --- | --- |
| 自宅VM/LXC・Talos・ネットワーク機器 | 本リポジトリの `terraform/`、`talos/`、`ansible/` |
| STG／PRD OKE・アプリ・証明書・Secrets・NGINX・監視VM | [Re:Venterのinfrastructure/](https://github.com/miutaku/reventer/tree/main/infrastructure) |
| Re:VenterのApplication・AppProject・Image Updater・通知 | [Re:Venterのinfrastructure/gitops/](https://github.com/miutaku/reventer/tree/main/infrastructure/gitops) |
| 自宅Argo CD・汎用runner・Re:Venterの起点Application | `k8s/pve/argocd/`、`k8s/pve/argocd-apps/` |
| 自宅向けCloudflare設定 | `terraform/cloudflare/` |

自宅Argo CDはRe:VenterのSTG／PRDを環境別AppProjectで管理する。本リポジトリはRe:Venterの起点登録だけを持ち、各環境の構成とバージョンはRe:Venterで管理する。STG OKEのArgo CDはSTG内の汎用基盤のみを管理し、PRDの登録資格情報を保持しない。

## 運用上の前提

- OKEは通常worker 1台。burstはCluster Autoscalerで増減する。Podの複数レプリカだけでは常設ノード故障への冗長化にならない。
- OKEのAutoscalerはOKE内で稼働する。自宅の停止時もOKE上のアプリは稼働を続け、HPA・workerの自動スケールは自宅ArgoCDに依存しない。自宅ArgoCDが管理する変更の同期は停止する。
- home-k8sのcontrol plane 3台はProxmox 2ホスト上に配置される。VMの台数と物理ホスト障害への耐性は区別する。
- OKEのKubernetes APIは許可された管理元IPv4に限定。公開LBはCloudflare経由のHTTPSを許可し、自宅との拠点間VPNは使用しない。
- OCI管理は両環境のDefaultドメインを使用し、MFA必須。Oracleが保護する生成資源には環境間の差分が残る。
- 秘密情報はBitwarden Secrets Managerで管理。KubernetesへはExternal Secrets Operator経由で注入し、Gitに保存しない。

## 自宅ネットワーク

| ネットワーク | 用途 |
| --- | --- |
| 192.168.0.0/24 | nativeネットワーク |
| VLAN 10 / 192.168.10.0/24 | 機器管理・Raspberry Pi |
| VLAN 20 / 192.168.20.0/24 | Talos VM・NAS・サーバ |
| VLAN 30 / 192.168.30.0/24 | クライアント |
| VLAN 31 / 192.168.31.0/24 | 来客用、他VLANへ接続不可 |
| VLAN 40 / 192.168.40.0/24 | IoT |

`miutaku.work` はCloudflareで管理し、`miutaku.internal` はhome-k8sのCoreDNSで名前解決する。home-k8sのKubernetes APIはTalos VIP `192.168.20.228:6443`、内部DNSは `192.168.20.201`。

## 変更・確認の入口

変更するリソースの定義を更新し、Terraformのplan・対象ディレクトリの検証を確認する。Kubernetesの通常変更はGitOpsで反映する。操作前に接続先クラスタを確認する。

```bash
kubectl --context home-k8s get nodes
kubectl --context oke-cloud get nodes  # STG OKE
```

PRD OKEのkubeconfigはOCIのPRDプロファイルで取得し、認証のexec設定にも同プロファイルを指定する。

| 詳細 | 参照先 |
| --- | --- |
| Talos・VM定義 | [talos/home-k8s/](talos/home-k8s/)、[terraform/pve/modules/home-k8s/](terraform/pve/modules/home-k8s/) |
| OKE定義 | [Re:Venterのinfrastructure/](https://github.com/miutaku/reventer/tree/main/infrastructure) |
| ArgoCD定義 | [k8s/pve/argocd/](k8s/pve/argocd/)、[Re:VenterのGitOps定義](https://github.com/miutaku/reventer/tree/main/infrastructure/gitops) |
| ネットワーク | [ansible/ix2215/](ansible/ix2215/)、[terraform/cloudflare/](terraform/cloudflare/) |
| 監視 | [Grafana Cloud / Terraform](terraform/grafana-cloud/)、[k8s/pve/vmagent/](k8s/pve/vmagent/)、[Re:Venterの監視定義](https://github.com/miutaku/reventer/tree/main/infrastructure/observability) |
| UPS・ストレージ | [UPSシャットダウン](docs/ups-shutdown.md)、[TrueNAS NFS](docs/truenas-nfs-setup.md) |
| 管理端末セットアップ | [scripts/setup-k8s-tools](scripts/setup-k8s-tools)、[scripts/setup-kubeconfig](scripts/setup-kubeconfig) |

READMEは現在の構成・管理責務・運用の入口を記載する。詳細な手順は対象コンポーネントで管理し、一時的な作業記録・調査ログ・TODOはREADMEに追加しない。
