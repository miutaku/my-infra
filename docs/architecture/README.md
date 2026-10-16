# my-infraの構成モデル

公開サイト: https://miutaku.github.io/my-infra/

reventerと同じ濃色ヘッダー・LikeC4標準viewerを使い、全体から要素をクリックして、自宅サービス、変更・デプロイ、BWSからの秘密注入、監視、配置へ進む。「自宅」の内側にTalos・TrueNAS VM・PBS・バックアップ処理を置き、Cloudflare・Bitwarden・Grafana Cloud・GitHub・Terraform Cloud・IDriveなどは「外部サービス」にまとめる。TrueNASはProxmoxの各ホスト上のVM69001・69002で、保存先とバックアップ処理の実行場所は区別する。Re:Venterは基盤の利用側の1要素とし、アプリ内部はreventerの図へ委ねる。OCI/OKE・監視VM・Re:Venter向け変更経路・専用runner/agent・レビュー配信などは、定義がmy-infraにあってもRe:Venter専用の境界へ集約する。自宅側の共有ArgoCD・ARC制御基盤との接点だけを描き、専用側の詳細はreventerの図に委ねる。10の観点は同じモデルを使い、概要を膨らませずに説明・参照元リンク・関係・配置詳細を使う。配置では標準viewerの要素詳細・内部構造・関係表示からホストやクラスタを辿る。Terraform/Kubernetes・NAS dataset・Tunnel hostnameの全宣言を内部要素として保持し、「リソース一覧」から関連する図にも進める。全ApplicationとバックアップCronJobは宣言されたクラスタ・namespaceへのinstanceOf配置を自動生成する。

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
