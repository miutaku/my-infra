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
   | `GRAFANA_PDC_TOKEN` | Grafana Cloud → Connections → Private data source connect で生成 | PDC agent 認証トークン |
   | `GRAFANA_PDC_HOSTED_GRAFANA_ID` | Grafana Cloud の Hosted Grafana ID (数値) | PDC agent 設定値 |
   | `GRAFANA_PDC_CLUSTER` | Grafana Cloud の PDC クラスタ識別子 (文字列) | PDC agent 設定値 |
   | `CLOUDFLARE_RKE2_TUNNEL_TOKEN` | `terraform output -raw rke2_tunnel_token` で取得 | Cloudflare Tunnel token |
   | `MM_OW_API_KEY` | OpenWeatherMap API キー | MagicMirror² 天気モジュール API key |
   | `MM_CALENDAR_URL` | Google Calendar iCal URL | MagicMirror² カレンダーモジュール |

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
https://argocd-rke2.miutaku.work
```

> **Note**: Cloudflare Access で保護されているため、ArgoCD ログイン画面の前に
> Cloudflare の SSO 認証 (メールアドレス確認) が求められる。

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

## アプリの同期順序 (sync-wave)

| wave | アプリ |
|------|--------|
| -2 | external-secrets (ESO operator + bitwarden-sdk-server サブチャート) |
| 0 | external-secrets-config (ClusterSecretStore) |
| 1 | coredns, metallb, local-path-provisioner, wol |
| 2 | victoria-metrics, blackbox-exporter, cloudflared, magic-mirror |

## Application を追加するときの規約

### 1. finalizer を付ける

`argocd-apps/` 配下と `root-app.yaml` の全 Application に例外なく付ける。

```yaml
metadata:
  finalizers:
    - resources-finalizer.argocd.argoproj.io
```

無いと Application を git から消しても配下リソースがクラスタに残る。
`root-app` にも付いているため、`root-app` の削除は全アプリの連鎖削除になる。

### 2. Namespace は manifest に持ち、Delete=false を付ける

`namespace.yaml` は git に置いたまま、次の annotation で cascade delete から除外する。

```yaml
apiVersion: v1
kind: Namespace
metadata:
  annotations:
    argocd.argoproj.io/sync-options: Delete=false
  name: app-example
```

namespace が消えると中の PVC ごと失われる。とくに `infra-db` は postgres と mariadb で
共有しているため、片方の Application 削除が両方を巻き添えにする。

`namespace.yaml` を git から**消してはいけない**。`CreateNamespace=true` に寄せようとして
manifest を削除すると、`prune: true` により live namespace ごと削除される。

### 3. 状態を持つ PVC / PV にも Delete=false

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-options: Delete=false
```

`local-path` は `reclaimPolicy: Delete` なので、Application 削除で PVC が消えると
中身も失われる。静的 NFS PV とそれを掴む PVC は対で付ける。片方だけ残ると PVC が
`Lost` になり、`kubectl patch pv <name> -p '{"spec":{"claimRef":null}}'` が必要になる。

### 補足: resource tracking

ArgoCD 3.x の既定 tracking は **annotation** 方式 (`argocd.argoproj.io/tracking-id`)。
`argocd-cm` に `application.resourceTrackingMethod` の記述が無くても label 方式ではなく、
namespace に `app.kubernetes.io/instance` label は付かない。

```bash
kubectl get ns <ns> -o jsonpath='{.metadata.annotations}'
```

## Application を撤去するとき

規約 2. と 3. により、namespace と PVC / PV は Application 削除では消えない。
完全撤去には手作業が要る。

1. manifest を消す前に、live Application に finalizer が付いているか確認する。
   規約より前に作られた Application には付いていないことがある。

   ```bash
   kubectl -n argocd get app <name> -o jsonpath='{.metadata.finalizers}'
   # 付いていなければ足す (無いと Application だけ消えて配下が孤児になる)
   kubectl -n argocd patch app <name> --type merge \
     -p '{"metadata":{"finalizers":["resources-finalizer.argocd.argoproj.io"]}}'
   ```

2. `argocd-apps/<name>.yaml` と `k8s/<cluster>/<name>/` を git から消して merge する。
   root-app が prune し、finalizer により配下リソースが cascade delete される。

3. `Delete=false` を付けたリソースは残るので手で消す。

   ```bash
   kubectl delete ns <ns>
   ```

   共有 namespace (`infra-db`, `monitoring`) の場合は namespace ごと消さず、
   対象アプリのリソースだけ個別に消すこと。

4. 静的 NFS PV は `Retain` なので PV オブジェクトも残る。NAS 上の実データを
   残したまま PV だけ消す場合は `kubectl delete pv <name>`。

5. アプリ固有の外部リソース (BSM シークレット、Cloudflare の published app、
   GitHub Actions のイメージビルド workflow) も忘れずに消す。

## Troubleshooting: tfc-agent "Cannot register more than 1 agents"

Terraform Cloud の Agent 登録上限に達している場合、同じ token を使う agent が
複数起動している。`pve-home` 用 agent は OKE 側の
`k8s/oci/apps/pve-tfc-agent` で稼働させ、PVE 側の `k8s/pve/tfc-agent`
Deployment は `replicas: 0` のままにする。

## Notes

- `bitwarden-sdk-server` は `external-secrets` Helm チャートの sub-chart として提供される。
  独立した Helm chart (`https://charts.external-secrets.io bitwarden-sdk-server`) は存在しないため、
  `external-secrets` の values に `bitwarden-sdk-server.enabled: true` を設定して有効化すること。
- `ClusterSecretStore` の provider フィールド名は `bitwarden` ではなく `bitwardensecretsmanager`。
  `bitwardenServerSDKURL` は `https://` が必須 (bitwarden-sdk-server は TLS のみ)。
