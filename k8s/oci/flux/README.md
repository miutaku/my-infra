# Flux v2 Bootstrap (OKE)

OCI OKE クラスタへの Flux v2 インストールと GitOps 初期化手順。

## 前提条件

- `kubectl` が OKE クラスタに向いていること
- `flux` CLI がインストール済みであること (`brew install fluxcd/tap/flux` など)
- `bws` CLI (Bitwarden Secrets Manager CLI) がインストール済みであること

## Step 1: Flux インストール

```bash
flux install
```

## Step 2: Bitwarden bootstrap Secret の手動投入

ESO が BSM にアクセスするための Secret だけ手動で作成する (1回のみ)。

```bash
kubectl create namespace external-secrets

kubectl create secret generic bitwarden-access-token \
  -n external-secrets \
  --from-literal=token=<bws_machine_account_access_token>
```

## Step 3: ClusterSecretStore の Organization ID 設定

[k8s/oci/infrastructure/external-secrets/cluster-secret-store.yaml](../infrastructure/external-secrets/cluster-secret-store.yaml) の
`organizationID` と `projectID` を BSM の値に更新してから git push → main へマージする。

## Step 4: GitRepository と Kustomization の適用

main ブランチにマージ済みであることを確認してから実行する。

```bash
kubectl apply -k k8s/oci/flux/
```

これで Flux が以下の順序でリソースを同期し始める:

| 順序 | Kustomization | パス |
|------|---------------|------|
| 1 | oci-sources | k8s/oci/infrastructure/sources |
| 2 | oci-external-secrets | k8s/oci/infrastructure/external-secrets |
| 3 | oci-cert-manager | k8s/oci/infrastructure/cert-manager |
| 3 | oci-longhorn | k8s/oci/infrastructure/longhorn |
| 4 | oci-ingress-nginx | k8s/oci/infrastructure/ingress-nginx |
| 5 | oci-apps | k8s/oci/apps |

## BSM シークレット一覧

| BSM シークレット名 | 説明 |
|---|---|
| `TFC_AGENT_TOKEN` | Terraform Cloud → Settings → Agents → Token |
| `TFC_AGENT_NAME` | エージェント表示名 (例: `oci-oke-agent-01`) |
| `CLOUDFLARE_OKE_TUNNEL_TOKEN` | `terraform output -raw oke_tunnel_token` で取得 |
| `CLOUDFLARE_DNS_API_TOKEN` | Cloudflare API token (DNS:Edit, miutaku.work のみ) |
| `GRAFANA_CLOUD_METRICS_URL` | Grafana Cloud Prometheus push URL |
| `GRAFANA_CLOUD_METRICS_USERNAME` | Grafana Cloud instance ID |
| `GRAFANA_CLOUD_METRICS_PASSWORD` | Grafana Cloud API key |
| `GITHUB_REVENTER_RUNNER_PAT` | GitHub PAT (`repo` スコープ) — miutaku/reventer 用 self-hosted runner |

## 同期状態の確認

```bash
flux get kustomizations
flux get helmreleases -A
```
