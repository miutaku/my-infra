# Re:Venter 分割先の検証ランナー

自宅Talosの既存ARC controllerに、分割先リポジトリごとの検証用scale setを追加する。
対象は `reventer-infrastructure`、`reventer-backend`、`reventer-frontend`、`reventer-admin`、`reventer-workers`。
元リポジトリのscale setは自身のリポジトリ登録を維持する。

各scale setは `arc-reventer-<component>-verify`、最大同時実行はリポジトリごとに1とする。
ランナーは対応するLinux workerで非root・権限昇格なしで動作し、ワーク領域とツールキャッシュをPod内のemptyDirに置く。
Node 26の実行に必要なUbuntuのlibatomicは、同じUbuntuリリースの配布パッケージをSHA-256で照合し、
使い捨てランナー内へ非rootで展開する。
GitHubの登録資格情報はcontrollerからだけ参照できるよう管理する。
ジョブにはKubernetes API token、ホストパス、Docker socket、共有PVC、デプロイ資格情報を渡さない。
自宅クラスタにはFlannelを使用するため、namespaceの分離をネットワーク隔離の保証として扱わない。

## 配置

1. 自宅Talosと `arc-systems/arc-systems-gha-rs-controller` を照合する。
2. このnamespaceを管理者が作成し、5リポジトリだけへ許可したFine-grained PATを
   `arc-reventer-validation/reventer-arc-registration` の `github_token` に配置する。
   GitHubのRepository Administration Read and writeとMetadata Readだけを使う。
3. 各componentに対応するHelm release名とGitHub URLを固定し、既存controllerと同じchart版でrenderする。
   server dry-runで既存scale setと衝突しないことを確認する。
4. 登録とGitHubへの接続を確認してから、分割先の `REVENTER_ARC_VERIFY_ENABLED` を環境に合わせて設定する。
   対象のfeature pushとPRで実ジョブのrunner名・テスト結果を照合する。

```sh
helm template arc-reventer-workers-verify \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set \
  --version 0.9.3 --namespace arc-reventer-validation \
  --values k8s/pve/reventer-arc-validation/values.yaml \
  --set-string githubConfigUrl=https://github.com/miutaku/reventer-workers
```

## Frontendのブラウザー検証

Cookie分離テストは `arc-reventer-frontend-browser` で実行する。
同じ `values.yaml` に `frontend-browser.values.yaml` を重ね、
登録先を `https://github.com/miutaku/reventer-frontend` に指定する。
固定Playwrightイメージにランナーを非rootで配置し、共有メモリはPod内に割り当てる。
配置後に専用リスナーのReadyを確認し、Frontendの `REVENTER_ARC_BROWSER_ENABLED` を設定する。
ランナーイメージを更新するときは共通設定とブラウザー用init containerのdigestを合わせ、
Playwrightイメージの版とdigestはFrontendのCIと合わせる。

## BackendのDB権限検証

DBの実結合テストは `arc-reventer-backend-database` で実行する。
共通の `values.yaml` に `backend-database.values.yaml` を重ね、
登録先を `https://github.com/miutaku/reventer-backend` に指定する。
固定TiDBのSQLポートはPod内の `127.0.0.1:14000` に限定し、データはPodの終了時に破棄する。
TiDBイメージのdigestはBackendのDB権限テストと合わせる。
専用リスナーのReady確認後に、Backendの `REVENTER_ARC_DATABASE_ENABLED` を設定する。

## 実行範囲と復旧

このscale setは指定されたPrivateリポジトリ内のpushおよび同一repoをheadとするPRの
Docker不要の検証専用とする。fork由来の変更はこのscale setへ割り当てない。
Dockerを使うintegration、コンテナ候補生成、配置を認可するOIDCは
それぞれの実行条件を満たすrunnerで引き続き検証する。
GitHub Actionsのworkflowには各jobのrunnerの条件を明示する。

戻すときは切り替え変数を外し、実行を排出して対象の検証用Helm releaseを削除する。
どのscale setからも参照されなくなった登録資格情報は失効させる。

[ARC scale set の構成](https://docs.github.com/en/actions/how-tos/manage-runners/use-actions-runner-controller/deploy-runner-scale-sets)

## Backendのコンテナビルド検証

`arc-reventer-backend-candidate` は、専用TalosノードでQEMUのソフトウェア仮想化を使い、
ゲスト内のBuildKitでamd64・arm64のOCIアーカイブを作る。
ゲストは読み取り専用の入力ディレクトリと専用の成果物ディレクトリをマウントする。
外部への接続はPod内のHTTPSプロキシが許可する公開依存先に限定する。
ゲストとビルドにはレジストリ認証、GitHubトークン、Kubernetes APIトークンを渡さない。

1. `builder/` の3ファイルを `arc-reventer-validation/reventer-qemu-build-scripts`
   ConfigMapへ登録する。
2. 共通の `values.yaml` に `backend-candidate.values.yaml` を重ね、
   登録先に `https://github.com/miutaku/reventer-backend` を指定する。
3. リスナーのReadyを確認し、Backendリポジトリで `REVENTER_ARC_CANDIDATE_PROBE_ENABLED`
   を有効にする。対象featureブランチのpushで `qemu-candidate-probe` を実行する。
4. ジョブはワーク領域の `qemu-inbox/input/` に対象コミットのGitアーカイブ
   `source.tar` と `source.sha`、Dockerfileと同じGoバージョンで作った
   amd64・arm64向け実行ファイルを配置し、`qemu-inbox/start` でビルドを開始する。
   完了時は `qemu-inbox/complete` と `output/candidate.sha256` を照合し、
   検証artifact `backend-qemu-probe` を保存する。失敗の詳細はPodの
   `builder` コンテナのログで確認する。
