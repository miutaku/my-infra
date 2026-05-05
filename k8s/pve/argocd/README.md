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

## Step 2: local-path-provisioner の手動インストール

RKE2 はデフォルトで local-path-provisioner を含まない。StorageClass `local-path` が必要なため、
ArgoCD の同期前に手動でインストールする (1回のみ)。

```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.30/deploy/local-path-storage.yaml
kubectl patch storageclass local-path -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

## Step 3: Bitwarden Secrets Manager の準備

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

## Step 4: ESO Bootstrap Secret の手動投入

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

## Step 5: bitwarden-sdk-server の TLS Secret 手動作成

ESO の cert-controller は `bitwarden-sdk-server` の TLS 証明書を自動生成しない。
手動で自己署名証明書を作成して Secret に投入する (1回のみ)。

```bash
# CA 鍵・証明書の生成
openssl genrsa -out /tmp/bitwarden-ca.key 2048
openssl req -new -x509 -key /tmp/bitwarden-ca.key -out /tmp/bitwarden-ca.crt \
  -days 3650 -subj "/CN=bitwarden-sdk-server-ca"

# サーバー証明書の生成 (SAN に全 DNS 名を含める)
openssl genrsa -out /tmp/bitwarden-server.key 2048
openssl req -new -key /tmp/bitwarden-server.key -out /tmp/bitwarden-server.csr \
  -subj "/CN=bitwarden-sdk-server.external-secrets.svc"
cat > /tmp/bitwarden-server-ext.cnf <<'EOF'
[SAN]
subjectAltName=DNS:bitwarden-sdk-server,DNS:bitwarden-sdk-server.external-secrets,DNS:bitwarden-sdk-server.external-secrets.svc,DNS:bitwarden-sdk-server.external-secrets.svc.cluster.local
EOF
openssl x509 -req -in /tmp/bitwarden-server.csr \
  -CA /tmp/bitwarden-ca.crt -CAkey /tmp/bitwarden-ca.key -CAcreateserial \
  -out /tmp/bitwarden-server.crt -days 3650 \
  -extfile /tmp/bitwarden-server-ext.cnf -extensions SAN

# Secret 作成
kubectl create secret generic bitwarden-tls-certs \
  -n external-secrets \
  --from-file=tls.crt=/tmp/bitwarden-server.crt \
  --from-file=tls.key=/tmp/bitwarden-server.key \
  --from-file=ca.crt=/tmp/bitwarden-ca.crt
```

## Step 6: ClusterSecretStore の Organization ID 設定

[k8s/pve/external-secrets/cluster-secret-store.yaml](../external-secrets/cluster-secret-store.yaml) の
`organizationID` を BSM の Organization ID に更新してから、git push → main へマージする。

## Step 7: Root Application の適用

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
| -2 | external-secrets (ESO operator + bitwarden-sdk-server サブチャート) |
| 0 | external-secrets-config (ClusterSecretStore) |
| 1 | coredns, metallb, local-path-provisioner, tailscale, wol |
| 2 | victoria-metrics, grafana-alloy, blackbox-exporter, cloudflared |

## Trouleshooting: tfc-agent "Cannot register more than 1 agents"

Terraform Cloud の組織で Agent 登録上限 (1) に達している場合、既存の dedicated tfc-agent VM
を停止してから k8s の tfc-agent pod を再起動する。

## Notes

- `bitwarden-sdk-server` は `external-secrets` Helm チャートの sub-chart として提供される。
  独立した Helm chart (`https://charts.external-secrets.io bitwarden-sdk-server`) は存在しないため、
  `external-secrets` の values に `bitwarden-sdk-server.enabled: true` を設定して有効化すること。
- `ClusterSecretStore` の provider フィールド名は `bitwarden` ではなく `bitwardensecretsmanager`。
  `bitwardenServerSDKURL` は `https://` が必須 (bitwarden-sdk-server は TLS のみ)。
- `grafana-alloy` の hostPath volume は `controller.volumes.extra` / `alloy.extraVolumeMounts`
  で設定すること (root の `extraVolumes` は alloy chart では機能しない)。
