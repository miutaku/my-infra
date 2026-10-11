# アーキテクチャをLikeC4で見る

構成の正本は `model.c4`、見方の宣言は `views.c4`。同じモデルを、アクセス・デプロイ・秘密情報・監視・配置の各ビューに投影し、LikeC4の対話UIで切り替えて読む。

## 起動

Node.js 24を使用する。リポジトリのルートから実行する。

```bash
cd docs/architecture
npm ci
npm run dev
```

ターミナルに表示されるURLをブラウザで開く。最初はビュー一覧が表示される。「構成の入口」の要素にマウスを重ね、`Navigate to view` ボタンを押すと環境や役割ごとの詳細へ移動できる。パン・ズーム、ビュー切替、要素・関係の詳細表示を使って構成を確認する。ソースを変更すると対話UIにも反映される。

| ビュー | 見るもの |
| --- | --- |
| 構成の入口 | モデルの主要要素から詳細へのナビゲーション |
| アクセス / 全体・環境別 | 利用者・管理者の要求と実行時の通信 |
| 運用 / デプロイ | GitOps、イメージ配布、Terraformの制御経路 |
| 運用 / BWSと秘密情報 | BWSの取得、ESOの同期、bootstrap認証情報 |
| 運用 / 監視 | scrape、ログ・メトリクス、Grafanaのquery |
| 配置 / 全体 | 実行場所と管理基盤。入れ子の枠は収容関係 |

入口には関係線を表示しない。アクセス・デプロイ・秘密情報・監視のビューでは関係kindを絞り、同じ要素でも異なる意味の矢印を混ぜない。関係ブラウザではモデル全体の関係も確認できる。STG/PRDの枠はOCI環境の境界で、LBはOKEクラスタ外、GatewayとアプリはOKE内。矢印は論理的な要求・操作の向きで、TCP接続開始の向きとは異なる。TunnelやPDCは外向きに接続する。

## モデルとビューの更新

リソースや関係を追加・変更する場合は `model.c4` を編集する。ビューは `include`・`exclude`・`view of`・`navigateTo` で宣言する。特定のビューで省略してもモデルには残るため、別の観点から参照できる。`specification.c4` は要素・関係の種類と表示スタイルを定義する。READMEには図のコピーを置かない。

```bash
npm run validate         # モデル・参照・レイアウトを検証
npm run build            # 対話サイトを dist/ に生成
npm run preview          # buildしたサイトをローカルで確認
npm run build:standalone # 単一HTMLの対話サイトを standalone/ に生成
```

通常のbuild成果物はHTTPサーバーで配信する。standaloneの `index.html` はダウンロードしてブラウザで開き、ホスティングなしで対話ビューを試せる。生成物はGit管理せず、モデルとビューを管理する。

[CIテンプレート](architecture-workflow.yml)は検証と対話サイトのbuildを行い、通常サイトと単一HTMLをActions artifactに保存する。push認証にworkflow追加権限がないため、自動実行は未設定。利用する場合は権限を持つ認証で `.github/workflows/architecture.yml` に配置する。

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
