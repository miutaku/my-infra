# LikeC4で構成を読む

READMEと、そこから参照するTerraform・Kubernetes・workflow・実装を読み直して作った構成モデル。同じ論理要素・関係から観点別ビューを宣言し、環境ごとの実配置は `instanceOf` で表す。

## ブラウザで開く

Node.js 24を使用する。

```bash
cd docs/architecture
npm ci
npm run dev
```

表示されたURLを開く。最初はビュー一覧。「01 概要」の要素をhoverして `Navigate to view` を押すと責務別の詳細へ移動できる。要素や関係の詳細、全モデルのrelationship browser、パン・ズーム、検索も使用できる。各要素の「構成の根拠」リンクから対応する定義へ移動する。

## モデルとビュー

| ファイル | 内容 |
| --- | --- |
| `specification.c4` | actor・system・service・storeなどの要素kind、関係kind・タグ、deployment nodeの種類 |
| `logical.c4` | 論理サービスの階層、責務、依存関係、所有者・定義へのリンク |
| `predicates.c4` | runtime・delivery・secrets・observability・storage・network・hardwareごとの共有filter |
| `views.c4` | `view of`、`include/exclude`、共有predicate、`navigateTo`で宣言する観点別ビュー |
| `deployment.c4` | 物理ホスト・VM・クラスタ・namespaceと論理要素の `instanceOf` |
| `deployment-views.c4` | 環境・物理配置・障害範囲を読むdeployment view |
| `scenarios.c4` | 処理順を読むdynamic view。sequence表示も切り替え可能 |

利用者の通信、デプロイ制御、secret取得、監視、storage、ネットワーク、電源を関係kindとタグで区別する。通常ビューでは共有predicateで観点を絞る。概要から詳細へ段階的に展開し、省略した要素もモデルと関係ブラウザには残る。物理収容を論理サービスの入れ子で代用せず、deployment modelで表す。環境の全配置と自宅の物理／workload配置は `placementStg`・`placementPrd`・`placementPhysical`・`placementHome` タグで選択し、空VM・node pool・孤立したサービスも表示する。deploymentのタグは親から継承されないため、新しいnode/instanceにも対応タグを付ける。

矢印はラベルに記載した要求・操作・データの向き。Tunnel/PDCの要求転送はTCP接続開始の向きと異なる。connector/agentは外向き接続する。deploymentの配置ビューは線を省略し、配置と経路を混ぜない。

| view ID | 観点 |
| --- | --- |
| `index` | 01 概要 / 責務から詳細へ |
| `home_apps` | 02 論理構成 / homeサービス |
| `access` | 03 アクセス / 公開・Access・mTLS |
| `admin_access` | 03 アクセス / 管理hostname |
| `media` | 03 アクセス / 録画・encoder・streaming |
| `loockit` | 03 アクセス / proxyとBLE LXC |
| `delivery` | 04 運用 / CI・TFC agent・GitOps |
| `gitops_apps` | 04 運用 / 全Applicationへの同期 |
| `secrets` | 04 運用 / bootstrap・BWS・SDK・ESO |
| `oke_platform` | 04 運用 / OKE共通基盤と所有境界 |
| `observability` | 05 監視 / homeとOCIの収集・query |
| `exporter_targets` | 05 監視 / exporterの対象 |
| `storage` | 05 保存 / NFS・restic・PBS |
| `network_topology` | 06 ネットワーク / VLANと管理経路 |
| `power` | 06 電源 / UPSとNUTの別責務 |
| `placement` | 07 実配置 / home・STG・PRD |
| `home_hardware` | 07 実配置 / VM・LXCと物理ホスト |
| `home_workloads` | 07 実配置 / Talosの論理workload配置 |
| `deployment_stg` | 07 実配置 / STG共通基盤と監視VM |
| `deployment_prd` | 07 実配置 / PRD共通基盤と監視VM |
| `monitoring_placement` | 05 監視 / 保存の障害範囲 |
| `gitops_release` | 08 処理順 / Git更新からhome同期 |
| `secret_sync` | 08 処理順 / BWSからhome Podへ |
| `record_encode` | 08 処理順 / 録画とSQL queue |

## 更新する

サービス・依存関係を変更したら `logical.c4` を更新する。共通サービスは一度定義し、配置の追加は `deployment.c4` の `instanceOf` で行う。見せ方の追加はビューの宣言だけで行う。モデルから削除することと、特定ビューで省略することを区別する。新しい関係には実行時通信・運用・secretなどのkindを指定する。所有者、定義へのリンク、説明も更新する。

```bash
npm run validate
npm run build
npm run preview
npm run build:standalone
```

`dist/` はHTTPサーバーで配信する対話サイト。`standalone/index.html` はダウンロードしてブラウザで開ける単一HTML。生成物はGit管理しない。モデル変更後は再buildする。

[CIテンプレート](architecture-workflow.yml)はvalidateと両buildを実行する。現在のpush認証にworkflow追加権限がないため、テンプレートを同梱している。自動実行は未設定。

## 構成の根拠と読み方

自宅のApplication登録を個別にモデルへ残す。ArgoCD・TFC agent・ARC・ESO/SDK、Nextcloud、DB、TNLAStationとそのworker、EPGStation、Mirakurun、Loockit、exporter、DNS・MetalLBなどを辿れる。配置はApplicationのdestination namespaceに基づく。config Applicationは設定要素で、架空の実行Podとして配置しない。

Loockitはクラスタ内HAProxyから2台のBLE LXCへ接続する。MirakurunはService/EndpointSliceの先のtuner LXC。TNLAStationのencode queueはPostgreSQL、録画・HLSはNFS。NAS restic、DB dump、VictoriaMetrics snapshot、PBS VM/LXC backupは別の責務。

物理配置はProxmox2台、Talos CP VM3・worker VM2、独立RPi worker2、NAS、LXC、一般VMを表す。CP2台がb550m上にあるので、そのホスト停止でetcd quorumを失う。Talos worker RPiとNUT Piは別機器。UPSの電源経路、VLAN/native/guest、WARP routesはそれぞれ独立ビューで確認する。Podの現在のworker配置を固定して描かず、TNLAStationの優先配置・退避方針は説明に記載する。

STG/PRDは別OCIアカウント。公開LBと監視VMはOKE外。STG ArgoCDは共通基盤、自宅ArgoCDはRe:Venterアプリを管理する。PRD OKEとアプリはreventer所有。[Re:Venterモデル](https://github.com/miutaku/reventer/tree/docs/likec4-architecture/docs/architecture)へ詳細を分担する。旧OKE内pve-tfc-agent、廃止VPNやOCI encoderを現行配置に復活させない。

このモデルはmain `e2e83070ce85` のREADMEと参照定義を基準にした設計上の構成。稼働環境の自動検出ではない。各要素のmetadataに所有者・source・確認時commitを持たせ、参照先は確認時commitへ固定している。今後の構成変更では該当要素の根拠も更新する。Secret値は含めない。IAMルール・DNSレコード・Pod全件の詳細はリンク先の定義で確認する。
