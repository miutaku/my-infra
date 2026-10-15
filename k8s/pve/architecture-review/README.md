# ReVenter構成図のPR比較

`https://architecture-review.miutaku.work/pr/<number>/<sha>/<run>-<attempt>/` に、GitHub Actionsで生成した変更前後の図を一時配信する。Cloudflare Accessは `mtakumi.0925@gmail.com` のメールコードだけを許可し、TunnelもAccess JWTを検証する。Cloudflare設定は `terraform/cloudflare` で管理する。

1レプリカの非公開静的サーバーで、可用性は保証しない。既存NFS PVCの `architecture-reviews` サブディレクトリだけをread-onlyで公開し、runnerのキャッシュやCodex認証は公開ディレクトリにマウントしない。ServiceはClusterIPのみ、NetworkPolicyはcloudflaredからのHTTPだけを許可する。

専用ARC runner `arc-runner-reventer-review` は0〜1台で、同じサブディレクトリへ比較結果を配置する。KubernetesのServiceAccount token、Docker socket、Codex認証は持たない。ReVenter側のworkflowで更新を直列化し、PR終了時に削除、日次処理で30日を過ぎた比較結果を削除する。
