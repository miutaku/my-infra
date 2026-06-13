# ArgoCD Bootstrap (OKE)

OCI OKE クラスタへの ArgoCD インストールと App-of-Apps の初期化手順。

## 前提条件

- `kubectl` が OKE クラスタに向いていること
- `bws` CLI (Bitwarden Secrets Manager CLI) がインストール済みであること

## Step 1: ArgoCD インストール

```bash
# argocd namespace 作成 + ArgoCD インストール
kubectl create namespace argocd
kubectl apply -k k8s/oci/argocd/

# argocd-server が Ready になるまで待機
kubectl wait -n argocd deploy/argocd-server --for=condition=Available --timeout=300s
```

## Step 2: Bitwarden bootstrap Secret の手動投入

ESO が BSM にアクセスするための Secret だけ手動で作成する (1回のみ)。

```bash
kubectl create namespace external-secrets

kubectl create secret generic bitwarden-access-token \
  -n external-secrets \
  --from-literal=token=<bws_machine_account_access_token>
```

## Step 3: bitwarden-sdk-server の TLS Secret 手動作成

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

## Step 4: ClusterSecretStore の Organization ID 設定

[k8s/oci/infrastructure/external-secrets-config/cluster-secret-store.yaml](../infrastructure/external-secrets-config/cluster-secret-store.yaml) の
`organizationID` と `projectID` が正しい値であることを確認してから git push → main へマージする。

## Step 5: Root Application の適用

main ブランチにマージ済みであることを確認してから実行する。

```bash
kubectl apply -f k8s/oci/argocd/root-app.yaml
```

これで ArgoCD が `k8s/oci/argocd-apps/` 以下の全 Application を自動で同期し始める。

## アプリの同期順序 (sync-wave)

| wave | アプリ | 内容 |
|------|--------|------|
| -2 | oci-external-secrets | ESO operator + bitwarden-sdk-server サブチャート |
| 0 | oci-external-secrets-config | ClusterSecretStore |
| 1 | oci-cert-manager | cert-manager (CRD 含む) |
| 1 | oci-longhorn | Longhorn |
| 2 | oci-cert-manager-config | ClusterIssuer (Let's Encrypt) |
| 3 | oci-ingress-nginx | ingress-nginx |
| 4 | oci-cloudflared | Cloudflare Tunnel |
| 4 | oci-grafana-alloy | Grafana Alloy DaemonSet |
| 4 | oci-actions-runner | GitHub Actions self-hosted runner |
| 4 | oci-pve-tfc-agent | Terraform Cloud agent (pve-home workspace) |
| 4 | oci-reventer-tfc-agent | Terraform Cloud agent (reventer workspace) |
| 4 | oci-encode-worker | OCI エンコードワーカー |

## BSM シークレット一覧

| BSM シークレット名 | 説明 |
|---|---|
| `TFC_HOME_AGENT_TOKEN` | Terraform Cloud → Settings → Agents → Token (pve-home) |
| `TFC_HOME_AGENT_NAME` | エージェント表示名 (例: `pve-home-agent-01`) |
| `CLOUDFLARE_OKE_TUNNEL_TOKEN` | `terraform output -raw oke_tunnel_token` で取得 |
| `CLOUDFLARE_DNS_API_TOKEN` | Cloudflare API token (DNS:Edit, miutaku.work のみ) |
| `GRAFANA_CLOUD_METRICS_URL` | Grafana Cloud Prometheus push URL |
| `GRAFANA_CLOUD_METRICS_USERNAME` | Grafana Cloud instance ID |
| `GRAFANA_CLOUD_METRICS_PASSWORD` | Grafana Cloud API key |
| `GITHUB_REVENTER_RUNNER_PAT` | GitHub PAT (`repo` スコープ) — miutaku/reventer 用 self-hosted runner |

## ArgoCD UI へのアクセス

Cloudflare Tunnel 経由でアクセスする (cloudflared が同期された後)。

### ログイン情報

| 項目 | 値 |
|------|----|
| ユーザー名 | `admin` |
| 初期パスワード | 下記コマンドで取得 |

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d && echo
```

初回ログイン後は UI の **User Info → Update Password** からパスワードを変更すること。
変更後は `argocd-initial-admin-secret` を削除して構わない:

```bash
kubectl -n argocd delete secret argocd-initial-admin-secret
```

## 同期状態の確認

```bash
kubectl -n argocd get applications
kubectl -n argocd get app root-app
```

## Notes

- `bitwarden-sdk-server` は `external-secrets` Helm チャートの sub-chart として提供される。
  `external-secrets` の values に `bitwarden-sdk-server.enabled: true` を設定して有効化する。
- `ClusterSecretStore` の provider フィールド名は `bitwardensecretsmanager`（`bitwarden` ではない）。
  `bitwardenServerSDKURL` は `https://` が必須 (bitwarden-sdk-server は TLS のみ)。
- `grafana-alloy` の hostPath volume は `controller.volumes.extra` / `alloy.mounts.extra` で設定すること
  (ルートの `extraVolumes` は alloy chart v0.12.x 以降では機能しない)。
