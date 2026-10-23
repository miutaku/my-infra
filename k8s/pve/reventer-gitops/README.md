# TalosのRe:Venter GitOps管理

Re:VenterのApplication、Image Updater、通知を自宅TalosのArgoCDで管理する。
UIは `argocd-home-k8s.miutaku.work`。Applicationの登録とクラスタ接続はmy-infra、アプリmanifestとimage digestはreventerで管理する。

Applicationは `oke-stg` と `oke-prd` をdestinationとして使う。STG OKEの共有ArgoCDは共通基盤用であり、Re:VenterのGitOps管理元ではない。

## 認証情報の管理

各OKEの `kube-system` に専用ServiceAccount `talos-reventer-argocd` とcluster-admin bindingを用意し、永続ServiceAccount tokenとCAをTalosのcluster Secretへ登録する。
クラスタ全体のRBAC・CRD等も同期対象のため、namespace内の権限だけでは管理できない。管理中はこのServiceAccountとbindingを削除しない。

接続情報を再登録する場合は、kubeconfig `~/.kube/{home-k8s,oke,oke-prd}.yaml` を確認して実行する。

```sh
python3 scripts/bootstrap-reventer-talos.py --approve-cluster-admin
```

書き込み可能なRe:VenterのSSH deploy keyは、Talosの `argocd/argocd-repo-reventer` Secretで管理する。bootstrapはこのSecretの存在を確認し、OKEの旧インストールから認証情報をコピーしない。Talos復旧時は、repository Secretを別途復元してから実行する。bootstrapはSecretの値を表示しない。

GHCRとDiscordの認証情報は既存のBitwarden Secrets ManagerキーからExternal Secretsで取得する。旧ArgoCDと共用していたキーを削除しない。

監視agentのApplicationは両環境ともreventerの `main` を追従する。PRDのアプリリリースタグとは独立して反映する。

## STGのイメージ切り替え通知

STGはArgo CD Notificationsの `on-stg-image-deployed` を購読する。イメージのbuild・push完了ではなく、現在の同期が成功し、Applicationが `Synced / Healthy` になった時点で既存のDiscord Webhookへ通知する。

通知にはGitOps revisionとbackend・frontend・adminのイメージdigestを含める。同期実行中・失敗・古い同期結果・旧新イメージ混在中は送らない。重複判定はこの3イメージの集合で行うため、無関係なGit更新や周辺イメージ変更、Healthyへの復帰だけでは再送しない。同じ集合へのロールバックも通知済み履歴がある間は再送しない。各同期対象への反映完了を通知する仕組みであり、別のbuildで公開された全サービスのlatestとの一致までは判定しない。

PRDの既存 `on-deployed` 通知は維持する。Webhook URLを新しく登録する必要はない。

稼働バージョンと同じArgo CD CLIで、送信せず条件・本文を検証できる。

```sh
ARGOCD_CLI=/path/to/argocd python3 tests/test_reventer_notifications.py
kubectl kustomize k8s/pve/reventer-gitops >/tmp/reventer-gitops.yaml
```
