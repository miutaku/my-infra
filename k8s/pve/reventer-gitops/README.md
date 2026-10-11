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
