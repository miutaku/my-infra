# 分割リポジトリのGitOps切り替え

このディレクトリは既存bootstrapのresourcesへ追加しない。
Applicationの自動同期は無効で、Image Updaterは別の有効化rootに置く。
既存の監視Application・通知先・catch-allは個別の移行が必要である。

## 管理範囲

my-infraは自宅インフラ基盤を管理する。ここで扱うのは、自宅のArgo CD・Image Updaterから
Re:Venterを管理するための接続・同期・書き戻し設定である。
Re:Venter固有のクラウド資格情報をmy-infraのBSM Projectへ集約しない。
自宅基盤との関連がある資格情報は、用途と必要権限を個別に確認する。

- アプリ: `reventer-infrastructure` の `staging` / `main`、各環境のアプリnamespaceだけを許可する。
- 基盤: 同リポジトリの `main`。namespace、metrics-server、autoscalerを管理する。
- Image Updater: 管理側専用 `reventer-release-backend/frontend/admin` packageの `:stg` / `:prd` をdigestで追従する。
  書き戻し先はそれぞれ `staging` / `main`。旧イメージ名はKustomizeの変換元として保持する。

ProjectはGit revisionを制限できない。アプリ用Projectを基盤Applicationに付け替えず、
STGからArgo CDのApplication・Project・repo credentialを変更できないRBACを別途検証する。
ClusterSecretStoreのnamespace制限と環境別資格情報も前提であり、Projectだけで秘密情報の分離は完成しない。

## 切り替え

1. 旧CI・Image Updater・対象Applicationの自動同期を停止し、実行中処理がないことを確認する。
   旧Applicationの設定、配置digest、追従設定を安全な管理用保管先へ退避する。
2. インフラの両branchに必要なoverlayを用意し、Git読み取りと環境別GHCR読み取りを検証する。
   `reventer-image-writeback-stg` / `-prd` は当該インフラrepoだけに書き込める資格情報、
   `reventer-image-pull-stg` / `-prd` は読み取り専用とする。広域runner PATを流用しない。
3. 各環境のバックアップ保管、API検証、成果物公開ゲートを検証する。
   同じpackageのSTG/PRDタグに対する書き込み権限はGitHub側ではタグ単位に限定できないため、
   公開用packageにアプリrepoのActions書込権限を付けず、管理側だけが更新する。
   アプリのビルドjobにはレジストリ公開資格情報を渡さず、成功CIのartifactを管理側で検証する。
   本番用書き込み資格情報をSTG runnerへ渡さない。新追従タグを有効化条件の前に公開しない。
4. 新しい基盤Applicationへnamespace・metrics-server・autoscalerの管理を移す。
   旧Applicationのpruneを無効にしてから所有権を移す。`FailOnSharedResource=true` が拒否する間は
   強制適用しない。旧tracking情報を解除し、Argoのresource treeとrender結果を照合する。
   自動同期を止めずに旧rootから基盤をpruneしない。
5. 本rootをserver-side dry-runし、Projectの同期先と権限を照合する。
   Application設定を切り替え、差分が想定範囲であることを確認して手動同期する。
   旧digestは引き継ぐため、この段階では新packageへの置換を要求しない。
6. STGで基盤とアプリの所有権、認証、API、復旧を確認する。本番操作はレビュー後に行う。
7. 旧Image Updaterから対象Applicationを除外し、二重追従がないことを確認する。
   `activate-updater/` の対象環境の定義だけを適用する。
   初回は旧イメージ名からの変更を許可する `forceUpdate` を使う。
   書き戻されたnewNameとdigest、ソースSHA、対象branchを確認する。
8. 配置とAPI検証が成功してから、対象Applicationの自動同期・prune・selfHealを有効にする。

環境を切り替えるたびに対象環境の定義だけを適用する。両環境一括applyを通常手順にしない。

## 復旧

新旧のImage Updaterを両方停止する。新Applicationの自動同期とpruneを無効にし、
退避したrepo/revision/path/patchと以前のdigestへ戻す。
基盤を既に移管した場合はアプリ側へ再度取り込まず、新基盤Applicationで管理を続ける。
同じリソースを二つのApplicationで同期・pruneしない。
手動同期後に配置とAPIを確認し、選んだ片方の追従経路だけを再開する。
DB復旧はインフラのリリース手順に従って別途判断する。
