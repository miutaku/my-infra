# Re:Venter 分割先の検証ランナー

自宅Talosの既存ARC controllerに、分割先リポジトリごとの検証用scale setを追加する。
対象は `reventer-infrastructure`、`reventer-backend`、`reventer-frontend`、`reventer-admin`、`reventer-workers`。
元リポジトリのscale setは自身のリポジトリ登録を維持する。

各scale setは `arc-reventer-<component>-verify` とする。最大同時実行はInfrastructureの基本検証が2、共通設定は1。
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

Infrastructureの基本検証には `values.yaml` に `infrastructure-verify.values.yaml` を重ねる。
既存の `arc-reventer-infrastructure-verify` をHelmで更新するときは、登録先とscale set名を維持し、
`--reuse-values` で上書き用valuesを適用する。同時実行を1へ戻す場合は同じreleaseの `maxRunners` を1に設定する。

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

## Infrastructureの実TiKV検証

`arc-reventer-infrastructure-tikv` をInfrastructureリポジトリに登録する。
`tikv-fixture.yaml` を同じnamespaceへ適用し、`values.yaml` に `infrastructure-tikv.values.yaml` を重ねる。
固定digestのPD・TiKV・TiDBをamd64の非特権Podにまとめ、通信は同じPodのloopbackに閉じる。
PDのWALとメタデータはメモリ上のemptyDirに置く。TiKVとTiDBのデータもPodの終了時に破棄する。
CIは専用ランナーで実GCを待ち、保持したスナップショットの読み取りと、解放後に失効することを確認する。

## BackendのSTG OIDC

`arc-reventer-backend-oidc` をBackendリポジトリへ登録する。共通の `values.yaml` に
`backend-oidc.values.yaml` を重ね、`https://github.com/miutaku/reventer-backend` を指定する。
専用Talos buildノードで非特権・ユーザー名前空間付きのランナーを動かす。
コンテナビルド用のsidecarやストレージは持たせない。

管理側が `AutoscalingRunnerSet` のUIDとノードを取得し、Re:VenterのSTG認証サービスに許可対象として設定する。
署名鍵とTLS秘密鍵はRe:Venterの管理側で保管する。登録の再作成でUIDが変わった場合は再照合する。
PRとプローブが署名付きの配置権限を得ないことを含め、Re:Venter側のSTG有効化手順で確認する。

## 実行範囲と復旧

FrontendとAdminのSTG API検証には、それぞれ `arc-reventer-frontend-contract` と
`arc-reventer-admin-contract` を共通の `values.yaml` で対応するGitHubリポジトリへ登録する。
登録UIDと許可する通常workerのノード名はRe:Venter側の認証サービスで固定する。

基本検証用のscale setは対応するPrivateリポジトリ内のpushと同一repoをheadとするPRに使う。
fork由来の変更はこれらのscale setへ割り当てない。
Dockerを使うintegration、コンテナ候補生成、配置を認可するOIDCは
それぞれの実行条件を満たすrunnerで引き続き検証する。
GitHub Actionsのworkflowには各jobのrunnerの条件を明示する。

戻すときは切り替え変数を外し、実行を排出して対象の検証用Helm releaseを削除する。
どのscale setからも参照されなくなった登録資格情報は失効させる。

[ARC scale set の構成](https://docs.github.com/en/actions/how-tos/manage-runners/use-actions-runner-controller/deploy-runner-scale-sets)

## コンテナ候補のビルド

`arc-reventer-{backend,frontend,admin}-candidate` は専用TalosノードでQEMUの
ソフトウェア仮想化を使い、ゲスト内のBuildKitでamd64・arm64のOCIアーカイブを作る。
ゲストは読み取り専用の入力ディレクトリと専用の成果物ディレクトリをマウントする。
FrontendとAdminのスナップショットはゲスト内のext4上でOverlayFSを使う。
接続先はゲストのHTTPSプロキシが許可する公開依存先に限定する。
ゲストとビルドにはレジストリ認証、GitHubトークン、Kubernetes APIトークンを渡さない。

1. `builder/` のファイルを `arc-reventer-validation/reventer-qemu-build-scripts`
   ConfigMapへ登録する。ゲストの起動スクリプトは各ジョブのゲスト起動時に取り込む。
2. 共通の `values.yaml` に `candidate.values.yaml` を重ね、
   scale set名に対応するリポジトリURLを指定する。
3. リスナーのReadyを確認し、移行用featureブランチではBackendに
   `REVENTER_ARC_CANDIDATE_PROBE_ENABLED`、FrontendとAdminに
   `REVENTER_ARC_CANDIDATE_ENABLED` を設定する。
4. ジョブは `qemu-inbox/input/` に対象コミットのGitアーカイブとSHAを置く。
   BackendはDockerfileと同じGo版で作ったamd64・arm64実行ファイルを置く。
   FrontendとAdminは対象環境でNext.jsをネイティブにビルドし、standalone出力と、
   ロックファイルが指定する両CPU用のSharpライブラリを分けて渡す。
   ゲストではアーカイブのハッシュを確認し、各イメージに対象アーキテクチャのライブラリを選ぶ。
   Frontendは対応する公開Stripeの設定も渡す。両イメージのUIDとSharpの読み込みをネットワークなしで検証する。
5. `qemu-inbox/complete` と `output/candidate.sha256` を照合して
   対応するCI artifactを保存する。失敗の詳細はPodの `builder` コンテナのログで確認する。
6. BackendでSTGのビルドを切り替える場合は `REVENTER_STG_ARC_CANDIDATE_ENABLED`
   を設定する。FrontendとAdminのTalos経路は移行用featureに適用する。
   実際の配置はリリースワークフローの認可と検証が揃った場合だけ進む。

## InfrastructureのAdmission検証

`arc-reventer-infrastructure-admission` をInfrastructureリポジトリに登録し、共通の
`values.yaml` に `candidate.values.yaml` を重ねる。builderのmemoryはDocker統合と同じ
request 4600Mi、limit 5500Miを指定する。ゲスト内だけでDockerとkindを動かし、
構成の検証と一時クラスタの削除を行う。ホスト上のDocker、クラスタの資格情報、
GitHubトークンはゲストに渡さない。固定入力の取得はランナー側、Dockerの公開イメージ取得は
ゲストの許可済みHTTPSプロキシ経由で行う。

専用リスナーのReady確認後、移行用featureだけに適用される
`REVENTER_ARC_ADMISSION_ENABLED` を設定する。

## Infrastructureの管理ランタイム検証

`arc-reventer-infrastructure-management` には共通の `values.yaml` と
`infrastructure-management.values.yaml` を適用する。Pythonの固定OCIを同じPodの非特権
sidecarで起動し、CIが置いたコミットのアーカイブを一時領域で検証する。
管理資格情報は不要で、ランナーとsidecarの間ではアーカイブと試験ログを渡す。
リスナーのReady確認後、移行用featureで `REVENTER_ARC_MANAGEMENT_ENABLED` を設定する。

## InfrastructureのDocker統合検証

`arc-reventer-infrastructure-docker` には共通の `values.yaml` と
`candidate.values.yaml` を適用し、Docker統合用builderのmemory requestを4600Mi、
limitを5500Miに設定する。Helmでは `candidate.values.yaml` を読み込んだ上で
`--set-string 'template.spec.initContainers[0].resources.requests.memory=4600Mi'` と
`--set-string 'template.spec.initContainers[0].resources.limits.memory=5500Mi'` を指定する。
ゲストにはGitアーカイブ、固定kubectl、ランナーで
同じソースからビルドしたGoの試験バイナリを渡す。Docker APIはゲストのUnix socketで受け付ける。
公開イメージとPython wheelにはゲストのHTTPSプロキシを使う。

専用リスナーのReady確認後、移行用featureで `REVENTER_ARC_DOCKER_ENABLED` を設定する。
