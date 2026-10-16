# my-infraの構成モデル

公開サイト: https://miutaku.github.io/my-infra/

reventerと同じ濃色ヘッダー・LikeC4標準viewerを使い、全体から要素をクリックして、自宅サービス、変更・デプロイ、BWSからの秘密注入、監視、配置へ進む。「自宅」の内側にTalos・TrueNAS VM・PBS・バックアップ処理を置き、Cloudflare・Bitwarden・Grafana Cloud・GitHub・Terraform Cloud・IDriveなどは「外部サービス」にまとめる。TrueNASはProxmoxの各ホスト上のVM69001・69002で、保存先とバックアップ処理の実行場所は区別する。Re:Venterは基盤の利用側の1要素とし、アプリ内部はreventerの図へ委ねる。OCI/OKE・監視VM・Re:Venter向け変更経路・専用runner/agent・レビュー配信などは、定義がmy-infraにあってもRe:Venter専用の境界へ集約する。自宅側の共有ArgoCD・ARC制御基盤との接点だけを描き、専用側の詳細はreventerの図に委ねる。各観点とホスト別の詳細は同じモデルを使い、概要を膨らませずに説明・参照元リンク・関係・配置詳細を使う。配置ではホストをクリックして、PVE → VM/Talos OS、PVE → LXC → Dockerサービスを辿る。クラスタ所属の線は通信経路と分ける。Terraform/Kubernetes・NAS dataset・Tunnel hostnameの全宣言を内部要素として保持し、「リソース一覧」から関連する図にも進める。全ApplicationとバックアップCronJobは宣言されたクラスタ・namespaceへのinstanceOf配置を自動生成する。

| ファイル | 役割 |
| --- | --- |
| logical.c4 / details.c4 | サービス・所有境界・説明・関係・根拠リンク |
| deployment.c4 | 物理ホスト・VM・クラスタ・namespaceとinstanceOf |
| views.c4 | 全体・サービス・入口認証・デプロイ・秘密情報・監視・配置・ネットワーク・保存・電源の観点とクリックナビゲーション |
| specification.c4 | 種類と線の意味 |
| scripts/inventory.mjs / scripts/catalog.mjs | 全宣言を抽出し、Application・内部定義・namespace配置・公開hostnameをモデル化 |
| shell.html / scripts/*navigation.mjs / scripts/line-filters.mjs | reventerと同じ標準viewer・外枠・線フィルター。構成情報のコピーを持たない |

```bash
cd docs/architecture
npm ci
npm run build
npm test
npm run dev
```

Node.js 24。生成物とcatalog.c4・model.json・model-coverage.json・resource-inventory.jsonはGit管理しない。公開一覧は名前・種類・namespace・参照元だけを掲載し、Secretの内容や環境変数は抽出しない。Terraformのfor_eachインスタンス数や稼働状態の検出ではない。Ansible/Talosの実行時設定はモデルの根拠リンクから確認する。

## 自動更新

mainのコード変更で、GitHub-hosted runnerが一覧を抽出しサイトを再構築する。同時にPlusのCodexが現在のソースと変更差分を読んで、モデル更新が必要なら `automation/architecture-model` のPRを作成・更新する。変更不要ならPRは作らない。AIが変更できるのはlogical.c4・details.c4・deployment.c4・views.c4だけ。別のGitHub-hosted runnerが許可範囲・モデル・ビルド・テストを検証してPR化する。AIがインフラ自体を変更することはない。

サイト・PRレビューの配信はすべてGitHub Pages。宣言コードからのモデル・リソース・経路抽出は認証なしでPRごとに実行する。

AIによるモデル修正は独立した非公開リポジトリ [architecture-automation](https://github.com/miutaku/architecture-automation) へ移管。認証は専用namespaceのSecretに保持し、通常runnerのNASキャッシュには残さない。専用runnerは非公開側だけに登録し、この公開リポジトリにはOpenAI認証付きrunnerを登録しない。mainのコード変更をGitHub OIDCで通知し、非公開側が現在のmainを取得してデータだけをAIへ渡す。公開側に操作用tokenは置かない。ビルド検証・モデル更新PR作成は別runnerで行い、自動マージしない。構成図と比較ページの配信先は変わらない。


## PRの図のレビュー

PRで変更前後の正確なコミットから全ビューを画像化し、意味のある要素・関係・配置・ビュー・リソース一覧の差分を計算する。PRコメントの比較URLから左右表示・重ね合わせ・拡大で確認し、同じURL内の `explorer/` で変更後のLikeC4も操作できる。差分0件は「構成図の変更なし」を表示し、比較はボタンを押したときだけ開く。

本番はルート、レビューは `pr/<番号>/<SHA>/<run>-<attempt>/`、手動比較は `previews/<run>-<attempt>/` に公開する。すべて公開で認証不要。本番とレビューを同じデプロイへ含め、PRの公開が本番を置き換えない。生成物の状態は `gh-pages`、ソースはmainで管理する。GitHub PagesはActionsのworkflow方式で配信する。

検証後にmainの公開workflowを明示dispatchし、公開処理はmainのコードだけを使う。PRのコードをwrite権限付きjobで実行せず、artifactのregular file・元コミット・保存先を検証する。同じリポジトリのPRだけを配信し、フォークは公開しない。AIのGITHUB_TOKENが作ったPRはイベントが発火しないため、比較workflowを明示的にdispatchする。

PR終了イベントと日次再照合で終了済みPRを削除し、30日を過ぎたレビューも削除する。古いURLは公開コンテンツとして他者が取得済みである可能性があり、Git履歴からの機密削除機構ではない。公開モデル・一覧に秘密情報を入れない。

初回導入前のcommitにはモデルがないため比較できない。導入後のmainをbaseにして比較する。手動実行はArchitecture explorerのbase_refで指定し、Publish architecture Pagesの実行summaryに比較リンクが載る。

## 網羅性の検証

model-coverage.jsonは宣言ごとのモデル要素と、Applicationの配置先を記録する。テストでコンパイル後の要素・配置が実在すること、Proxmoxの全VM module・LXC宣言に物理配置と根拠があること、参照元リンクが実在することを検証する。宣言が存在することを稼働証明とはしない。未登録・共有の定義は専用グループに保持し、稼働中と推測して配置しない。

自宅のvmagent→自宅VictoriaMetricsと、reventerのcollector→OCI監視VMは独立。NASのファイル、DB logical dump、metrics snapshot、PBSのVM backupは復元単位を区別する。UPSの給電、NUT状態の読み取り、各ホスト自身の停止も異なる関係として保持する。

## 表す責務とアクセス経路

この図はインフラ基盤の提供範囲を表す。用途の専用・共有で境界を決める。Re:Venterのアプリ・OCI/OKE全体・監視VM・GitOps/CI/Terraformによる変更経路・専用runner/agent・レビュー配信は専用側へ集約し、手動の内部構成・通信トポロジーを重複して作らない。my-infraにある専用定義は、名前・定義元・実際のnamespaceとの対応だけを自動抽出し、一覧の関連図からreventerの構成図へ進む。共有PVCは利用実態に合わせて共有側に残す。定義がある場所・実行する場所・専用用途を区別する。

自宅公開hostnameの原則は利用者・管理者 → Cloudflare Access → Tunnel → 内部サービス。公開hostnameの認証方式はTerraformから生成し、用途（利用・管理）と認証（Access・mTLS）を別の属性にする。loockit-apiは専用クライアント証明書と操作制限の例外として表示する。WARP/LANのprivate経路、GitOps/CIによる変更、基盤の提供はそれぞれ別の線種・観点とする。認証方式を判定できないhostnameはビルドを失敗させる。

my-infraの変更ビューは自宅基盤の構成管理に限定する。Re:Venter向けの変更経路、OCI上の管理ワークロードも利用側の図へ委ねる。OCIの名前・定義・配置対応は参照用に保持し、my-infraの配置・ネットワーク図では展開しない。

Pages配信の識別子はmainのSHAではなく生成サイト（gh-pages）のcommitにする。同じmainに複数のPreviewを追加しても別の配信として扱い、artifact名もrun/attemptごとに分ける。配信成功後に本番build-infoと比較changes.jsonのheadをHTTPで照合し、実際のURLが確認できるまで公開リンクを通知しない。

通知経路は `architecture-notify.yml` → Cloudflare OIDC受信Worker → Queue → HTTP非公開consumer → 非公開Actions。通知は署名・固定repo ID・main・固定workflowを検証する。OpenAI認証はこの経路に渡さない。通知失敗時は「Notify architecture automation」を再実行する。通知済みの処理が失敗した場合は非公開Actionsでtargetを選び手動実行する。ドキュメントだけの変更では通知しない。

## 自宅サービスの選定と稼働照合

サービスは公開URLの有無や知名度で選ばない。ArgoCD Application全件を、利用アプリ・録画・DNS・クラスタ基盤・Secret・監視・運用・DB/バックアップの役割へ対応付ける。既知名はcatalog.mjsの対応表、exporter/ARC/TFCなどは分類規則を使う。未分類の新Applicationもアプリ配下へ自動生成し、一覧に残す。Applicationは設定・共有PVCだけの場合もあり、Application数とサービス数は一致しない。Re:Venter専用Applicationは参照だけを保持し、詳細をこの図に重複させない。

ArgoCD本体と、クラスタbootstrapとして稼働するcluster.local用CoreDNS・Flannel・kube-proxy・metrics-server・kubelet-serving-cert-approverは別途対応付ける。宅内miutaku.internal用CoreDNSとは別の要素。metrics-serverと証明書承認は稼働を確認したが、導入宣言はこのrepo内では確認できていない。

2026-10-16にhome-k8sのApplication49件、Deployment/StatefulSet/DaemonSet/CronJob計74件、Readyな7ノードを読み取りで照合した。Application定義の欠落と分類先不明のcontrollerは0件。ownerを持たないPodも0件だった。証跡は `evidence/home-k8s-runtime.json`。これは取得日時の記録で、現在の稼働を常時保証する情報ではない。replica数・一時Job/runner Pod・各アプリの内部実装を個別サービス数として数えない。

`npm run audit:runtime` はkubectlのhome-k8s contextを読み取り、名前・namespace・所属Application・分類先と健康状態だけを記録する。Secret/ConfigMapの内容やコンテナ環境変数は保存しない。通常のPagesビルドでクラスタ認証は使わない。

## PVE・VM・Talosとネットワーク

PVE2ホストの全非templateゲスト18件（VM14 / LXC4）を稼働configと照合し、`evidence/pve-runtime.json` に残す。Windows VM60000はTerraform管理外だが省略しない。`npm run audit:pve` は既存SSH接続を使う読み取り専用の調査で、ゲスト名・ID・状態・bridge/tagのみ保存する。

包含は線ではなく境界で表す。PVEは共通クラスタとして、その中にVM/LXC、さらにTalos LinuxやDockerを入れる。VMの物理ホストはmetadata、VLANは各ゲストの属性に保持し、配置図は全14 VM・4 LXCを一ページにまとめる。home-k8sのサービス・DB・監視・運用基盤もクラスタ内に入れる。全体は要約した接続だけを表示し、通信・保存先の詳細は要素を開いて確認する。調査状況や未確認事項は証跡に残し、図のラベルへ入れない。TrueNASはrunner cache用nas-01とアプリデータ用nas-02を分け、TNLaStationはPRD/STGごとにチューナー・DB・NFSパスを対応させる。

ネットワーク機器からIX2215・US-8-60W・FS APとPVEの接続、VLANを開ける。native1とtag10/20/30/31/40、VMのNIC tag、guest ACLを区別する。PVEはvmbr0とVLAN subinterface/bridgeを使用し、vlan-aware設定があるとは記載しない。設定上のDHCP予約を現在の管理IPと混同しない。正確なケーブルポートとAPのSSID別VLAN割当は未確認として残す。根拠と限界は `evidence/network.md`。

## 全体から接続先・内部構造へ

最初の図はPVEクラスタ内のhome-k8s VM・TrueNAS・PBSと、宅内ネットワーク・RPi・外部サービスを示す。包含は入れ子、線は公開入口・秘密情報・バックアップ・LAN接続だけを表示する。監視の詳細は監視ビュー、VM/LXCの全件は共通の配置ビューから開く。

- PVE → Loockit/MirakurunのLXC → Dockerサービス。CT名には用途を含め、VMIDだけの表示にしない。
- home-k8s → 各サービス → Web/API・DB・NFS・外部API。LoockitはHAProxy→LXC→BlueZ/Lease、録画はAPI/encode/streaming/HLS/チューナーへ。
- home-k8sのクラスタ基盤 → API・worker・CNI・Service・DNSと、CSR承認/metrics/ESO/ArgoCD/ARCの実際の接点。
- ネットワーク機器 → ルーター/SW/AP/トランク → VLAN。配線が未確認の部分は引き続き断定しない。

LikeC4標準の要素詳細と関係ブラウザは置き換えず使用する。明示的なビュー遷移はクリックで行い、ホスト詳細などの補助ビューはトップの観点選択に並べない。比較レポートは変更のある全体/配置/サービスを優先し、`?view=loockit` のような直接選択もできる。

包含だけの配置図は`containment-layout.mjs`で、その時点のモデルをLikeC4標準の`.likec4.snap`へ整列する。全体は5本の接続を保持したままVMを段組みし、PVE詳細ではコントロールプレーン、ワーカー、ロードバランサー、ストレージ、Loockit、Mirakurunなどを役割別の枠にまとめて整列する。どのビューも物理ホスト別の枠は設けず、クラスタに2ノード構成と記載し、配置ホストは各ゲストのmetadataに保持する。生成スナップショットはGit管理せず、毎回のビルドで作り直す。整列のための架空の通信線は追加しない。

録画図の通信先はMirakurun LXCとし、Service名で接続することを線に記す。Kubernetes Serviceはselectorなし・EndpointSliceでLXCを指定する設定であり、中継プロセスを追加した箱にはしない。ネットワーク機器図の`LAN / VLAN・経路`という抽象ノードは表示せず、VLANセグメントとACLはIX2215から開く。

全体図のRaspberry Pi worker03/04は一つに集約し、詳細モデルには2台の実体を保持する。home-k8sのサービスはクラスタ直下に置く。VLAN図はVLANごとの枠内に利用側のまとまりを配置し、所属を表す線と個別VM/LXCの箱は表示しない。ルーターの6 IFとWARP経路の7本だけを表示する。PVE利用側の要約は配置モデルのNIC tagから生成し、クリックすると役割別の全VM/CT配置へ進む。物理機器・端末はIX2215の割当定義、RPi workerはTalos設定を根拠とし、DHCP予約全件とソースをmetadataに保持する。予約を稼働実績と混同しない。SW管理IPは当日の照合結果があるnative側を表示し、VLAN10の重複予約を別の稼働機器として描かない。MetalLBのプールとAPI/LB VIPも実定義から取得する。復元元の図はバックアップ経路のみとし、NFSのオンライン利用は専用ビューに分け、両者を相互リンクする。
