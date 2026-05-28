# GitHub Actions Self-Hosted Runner (OCI OKE)

`miutaku/reventer` リポジトリ専用の GitHub Actions self-hosted runner。
OCI OKE (A1.Flex / ARM64) 上で動作し、OKE ノードの public IP が egress IP として固定される。

## 移行経緯

元々は GCP (e2-micro + Cloud NAT) で動かしていたが、以下の理由で OKE に移行:
- GCP のコスト・VM 管理を排除
- OCI Always Free 枠内で完結
- OKE ノードの public IP で egress IP が固定される (Cloud NAT と同等)

GCP リソース (`terraform/gcp/`) は削除済み。TFC workspace `gcp-reventer-github-runner` の
リソースは `terraform destroy` で手動削除すること。

## 構成

| 項目 | 値 |
|---|---|
| イメージ | `myoung34/github-runner:ubuntu-jammy` (multi-arch / ARM64 対応) |
| 対象リポジトリ | `https://github.com/miutaku/reventer` |
| runner ラベル | `oci,oke,linux,arm64,reventer` |
| レプリカ数 | 4 |
| アーキテクチャ | ARM64 (OKE A1.Flex ノード) |
| Docker | `docker:27.5.1-dind` サイドカー + `docker:27.5.1-cli` |

Docker を使う CI のため、runner Pod 内に DinD サイドカーを同居させている。
runner コンテナには initContainer で Docker CLI を配置し、`DOCKER_HOST=tcp://localhost:2375`
経由でサイドカーの Docker daemon に接続する。

## runner を使うワークフロー側の設定

`miutaku/reventer` リポジトリのワークフローで以下のように指定する:

```yaml
jobs:
  build:
    runs-on: [self-hosted, reventer]
```

## セットアップ (初回)

### 1. BSM にシークレットを登録する

Bitwarden Secrets Manager (BSM) のプロジェクト `my-infra` に以下を登録:

| BSM シークレット名 | 値 | 取得方法 |
|---|---|---|
| `GITHUB_REVENTER_RUNNER_PAT` | GitHub Personal Access Token | GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens または Classic tokens (`repo` スコープ) |

### 2. Flux が自動的にデプロイする

`k8s/oci/flux/` の `oci-apps` Kustomization が `k8s/oci/apps/` 以下を同期するため、
main ブランチにマージされれば Flux が自動でデプロイする。

### 3. runner の登録を確認する

```bash
# GitHub の Settings → miutaku/reventer → Settings → Actions → Runners で確認
# または
kubectl -n actions-runner get pods
kubectl -n actions-runner logs deploy/actions-runner-reventer
```

## runner ラベルを変更したいとき

[deployment.yaml](./deployment.yaml) の `LABELS` 環境変数を編集する:

```yaml
- name: LABELS
  value: "oci,oke,linux,arm64,reventer,新しいラベル"
```

変更後は git push → main マージ → Flux が自動反映。

## 対象リポジトリを変更したいとき

[deployment.yaml](./deployment.yaml) の `REPO_URL` を変更する:

```yaml
- name: REPO_URL
  value: "https://github.com/miutaku/別のリポジトリ"
```

BSM のシークレット (`GITHUB_REVENTER_RUNNER_PAT`) も、新しいリポジトリに対して
`repo` スコープを持つ PAT に更新すること。

## レプリカ数を増やしたいとき (並列実行)

[deployment.yaml](./deployment.yaml) の `replicas` を変更する:

```yaml
spec:
  replicas: 4  # 並列で 4 ジョブまで実行可能
```

現在は `Waiting for a runner to pick up this job...` の待ち時間を減らすため、warm runner を 4 台にしている。
OKE は 2 OCPU x 2 node のため、4 台がスケジュールされるよう runner / DinD の CPU request は各 `250m`
にしている。CPU limit は各 `2000m` のままなので、空き CPU があるときは burst できる。
ただし OCI Always Free の CPU/メモリ上限に注意 (4 OCPU / 24GB まで)。

## egress IP の確認

OKE ノードの public IP が runner の egress IP になる。
ホワイトリスト登録が必要な場合は以下で確認:

```bash
kubectl get nodes -o wide  # EXTERNAL-IP 列を確認
```

## トラブルシューティング

### CI で Docker インストール処理が失敗する

runner は Kubernetes Pod として動くため、runner コンテナ内では systemd が PID 1 ではない。
そのため `get.docker.com` などで Docker daemon を systemd サービスとしてインストール・起動しようとすると
`System has not been booted with systemd as init system` で失敗する。

この runner では Docker CLI と DinD サイドカーをあらかじめ用意しているため、workflow 側では Docker の
インストール処理を実行せず、必要なら `docker version` や `docker info` で利用可能か確認する。

```bash
# runner ログ確認
kubectl -n actions-runner logs deploy/actions-runner-reventer -f

# ExternalSecret の同期状態確認
kubectl -n actions-runner get externalsecret actions-runner-credentials

# Pod を再起動して runner を再登録
kubectl -n actions-runner rollout restart deploy/actions-runner-reventer
```
