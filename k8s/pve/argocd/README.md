# ArgoCD Bootstrap

RKE2 クラスタへの ArgoCD インストールと App-of-Apps の初期化手順。

## 前提条件

- `kubectl` が RKE2 クラスタに向いていること (`/etc/rancher/rke2/rke2.yaml`)
- `bws` CLI (Bitwarden Secrets Manager CLI) がインストール済みであること
- Bitwarden Secrets Manager でプロジェクト `my-infra` と Machine Account が作成済みであること

## Step 1: ArgoCD インストール

```bash
# argocd namespace 作成 + ArgoCD インストール
kubectl create namespace argocd
kubectl apply -k k8s/pve/argocd/

# argocd-server が Ready になるまで待機
kubectl wait -n argocd deploy/argocd-server --for=condition=Available --timeout=300s
```

## Step 2: Bitwarden Secrets Manager の準備

Bitwarden Secrets Manager (https://bitwarden.com/products/secrets-manager/) でセットアップ:

1. **プロジェクト作成**: `my-infra`
2. **シークレット作成** (BSM に登録する名前と値):

   | BSM シークレット名 | 値 | 説明 |
   |---|---|---|
   | `GRAFANA_CLOUD_METRICS_URL` | `https://prometheus-prod-XX-XX.grafana.net/api/prom/push` | Grafana Cloud Metrics URL |
   | `GRAFANA_CLOUD_METRICS_USERNAME` | `123456` | Grafana Cloud Metrics instance ID |
   | `GRAFANA_CLOUD_METRICS_PASSWORD` | `glc_xxx...` | Grafana Cloud API key |
   | `GRAFANA_PDC_TOKEN` | Grafana Cloud → Connections → Private data source connect で生成 | PDC agent 認証トークン |
   | `GRAFANA_PDC_HOSTED_GRAFANA_ID` | Grafana Cloud の Hosted Grafana ID (数値) | PDC agent 設定値 |
   | `GRAFANA_PDC_CLUSTER` | Grafana Cloud の PDC クラスタ識別子 (文字列) | PDC agent 設定値 |
   | `CLOUDFLARE_RKE2_TUNNEL_TOKEN` | `terraform output -raw rke2_tunnel_token` で取得 | Cloudflare Tunnel token |
   | `TAILSCALE_AUTH_KEY` | Tailscale Admin Console → Settings → Keys | Tailscale auth key |

3. **Machine Account 作成** → Access Token を発行 (一度しか表示されない)
4. BSM Organization ID を控えておく (Settings → Organization → ID)

## Step 3: ESO Bootstrap Secret の手動投入

ESO が BSM にアクセスするための Secret だけ手動で作成する (1回のみ)。
この Secret 自体は ExternalSecret で管理できないため、直接投入する。

```bash
# external-secrets namespace を先に作成
kubectl create namespace external-secrets

# BSM Machine Account Access Token を投入
kubectl create secret generic bitwarden-access-token \
  -n external-secrets \
  --from-literal=token=<bws_machine_account_access_token>
```

## Step 4: ClusterSecretStore の Organization ID 設定

[k8s/pve/external-secrets/cluster-secret-store.yaml](../external-secrets/cluster-secret-store.yaml) の
`organizationID` を BSM の Organization ID に更新してから、git push → main へマージする。

## Step 5: Root Application の適用

```bash
# main ブランチにマージ済みであることを確認してから実行
kubectl apply -f k8s/pve/argocd/root-app.yaml
```

これで ArgoCD が `k8s/pve/argocd-apps/` 以下の全 Application を自動で同期し始める。

## ArgoCD UI へのアクセス

Cloudflare Tunnel 経由でアクセスする (cloudflared が同期された後):
```
https://argocd.<your-domain>
```

初期パスワードの取得:
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d
```

## アプリの同期順序 (sync-wave)

| wave | アプリ |
|------|--------|
| -2 | external-secrets (ESO operator) |
| -1 | bitwarden-sdk-server |
| 0 | external-secrets-config (ClusterSecretStore) |
| 1 | coredns, metallb, tailscale, wol |
| 2 | victoria-metrics, grafana-alloy, blackbox-exporter, cloudflared |
