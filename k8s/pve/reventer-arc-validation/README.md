# Re:Venter 分割先の検証ランナー

自宅Talosの既存ARC controllerに、分割先リポジトリごとの検証用scale setを追加する。
対象は `reventer-infrastructure`、`reventer-backend`、`reventer-frontend`、`reventer-admin`、`reventer-workers`。
元リポジトリのscale setは自身のリポジトリ登録を維持する。

各scale setは `arc-reventer-<component>-verify`、最大同時実行はリポジトリごとに1とする。
ランナーは対応するLinux workerで非root・権限昇格なしで動作し、ワーク領域とツールキャッシュをPod内のemptyDirに置く。
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

このscale setは指定されたPrivateリポジトリ内のpushおよび同一repoをheadとするPRの
Docker不要の検証専用とする。fork由来の変更はこのscale setへ割り当てない。
Dockerを使うintegration、ブラウザcontainer、コンテナ候補生成、配置を認可するOIDCは
それぞれの実行条件を満たすrunnerで引き続き検証する。
GitHub Actionsのworkflowには各jobのrunnerの条件を明示する。

戻すときは切り替え変数を外し、実行を排出して対象の検証用Helm releaseを削除する。
どのscale setからも参照されなくなった登録資格情報は失効させる。

[ARC scale set の構成](https://docs.github.com/en/actions/how-tos/manage-runners/use-actions-runner-controller/deploy-runner-scale-sets)
