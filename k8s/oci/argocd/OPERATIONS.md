# ArgoCD Operations (OKE)

クラスタの共有状況、Application の追加規約。ブートストラップ手順は [README.md](README.md) を参照。
撤去手順・トラブルシューティングは [k8s/pve/argocd/OPERATIONS.md](../../pve/argocd/OPERATIONS.md) を参照
(手順は cluster 非依存)。

## ⚠️ このクラスタ(STG・PRD双方)は `my-infra` 専用ではない

本番 Re:Venter アプリ(別リポジトリ `reventer`、別 ArgoCD インスタンス
`argocd-reventer` / `argocd-reventer-prd`)が同じクラスタに同居しており、
`ingress-nginx` 等クラスタ全体で共有するコンポーネントは Re:Venter 側にも
実際に使われている(2026-08-16、ingress-nginx 撤去で `re-venter.com` を
誤って本番停止させた)。

**ingress controller / StorageClass / CNI などクラスタ共有コンポーネントを
変更・撤去する前に、必ず `kubectl get ingress,httproute -A` をクラスタ全体に
対して実行し、`my-infra` の git 上のリソースだけでなく実クラスタの使用状況を
確認すること。** `grep` で `my-infra` リポジトリ内だけ調べて「未使用」と判断しない。

## Application を追加するときの規約

`argocd-apps/` 配下と `root-app.yaml` の全 Application に例外なく finalizer を付ける。

```yaml
metadata:
  finalizers:
    - resources-finalizer.argocd.argoproj.io
```

無いと Application を git から消しても配下リソースがクラスタに残る。
`root-app` にも付いているため、`root-app` の削除は全アプリの連鎖削除になる。

Namespace と、状態を持つ PVC / PV には `argocd.argoproj.io/sync-options: Delete=false` を
付けて cascade delete から除外する。`namespace.yaml` は git から消さない
(消すと prune で live namespace ごと削除される)。

この規約により namespace と PVC は Application 削除では消えないので、アプリを完全撤去する
ときは `kubectl delete ns <ns>` などの手作業が要る。理由・撤去手順とも
[k8s/pve/argocd/OPERATIONS.md](../../pve/argocd/OPERATIONS.md) の「Application を撤去するとき」を参照。
