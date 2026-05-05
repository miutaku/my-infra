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

[k8s/oci/infrastructure/external-secrets/cluster-secret-store.yaml](../infrastructure/external-secrets/cluster-secret-store.yaml) の
`organizationID` と `projectID` が正しい値であることを確認してから git push → main へマージする。

## Step 5: GitRepository と Kustomization の適用

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
| `TFC_OKE_AGENT_TOKEN` | Terraform Cloud → Settings → Agents → Token |
| `TFC_OKE_AGENT_NAME` | エージェント表示名 (例: `oci-oke-agent-01`) |
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

## Notes

- `bitwarden-sdk-server` は `external-secrets` Helm チャートの sub-chart として提供される。
  `external-secrets` の values に `bitwarden-sdk-server.enabled: true` を設定して有効化する。
- `ClusterSecretStore` の provider フィールド名は `bitwardensecretsmanager`（`bitwarden` ではない）。
  `bitwardenServerSDKURL` は `https://` が必須 (bitwarden-sdk-server は TLS のみ)。
- `grafana-alloy` の hostPath volume は `controller.volumes.extra` / `alloy.mounts.extra` で設定すること
  (ルートの `extraVolumes` は alloy chart v0.12.x 以降では機能しない)。
