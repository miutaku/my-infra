# ArgoCD Operations (RKE2)

Application の追加・撤去、既知のトラブルシューティング。ブートストラップ手順は [README.md](README.md) を参照。

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

6. Application が `Terminating` のまま進まない場合、原因は主に2種類ある
   (2026-08-16、ingress-nginx/Longhorn 撤去で両方発生)。

   - **ArgoCD 側の既知バグ**: chart が Helm hook (`helm.sh/hook: pre-install` 等)
     で作る Job/ServiceAccount/ClusterRole 等は、Application ごと削除すると
     `argocd.argoproj.io/hook-finalizer` が正しく外れず残ることがある
     ([argoproj/argo-cd#24187](https://github.com/argoproj/argo-cd/issues/24187))。
     恒久修正はない。`kubectl -n argocd get app <name> -o jsonpath='{.status.resources}'`
     で `"hook":true` なリソースを洗い出し、1つずつ finalizer を外す:

     ```bash
     kubectl patch <kind> <name> [-n <ns>] --type=merge -p '{"metadata":{"finalizers":[]}}'
     ```

   - **chart 自身の削除防止ガード**: Longhorn の `longhorn-uninstall` フックJob等、
     chart によっては誤削除防止のため明示的な確認フラグを要求し、
     無ければ意図的に失敗する。`kubectl logs -n <ns> <uninstall-job-pod>` で
     実際の失敗理由を確認すること (ArgoCD 側の不具合と早合点しない)。
     Longhorn の場合は実ボリューム0件を確認した上で
     `kubectl -n longhorn-system patch settings.longhorn.io deleting-confirmation-flag --type=merge -p '{"value":"true"}'`
     が必要だった。

## Troubleshooting: tfc-agent "Cannot register more than 1 agents"

Terraform Cloud の Agent 登録上限に達している場合、同じ token を使う agent が
複数起動している。`pve-home` 用 agent は OKE 側の
`k8s/oci/apps/pve-tfc-agent` で稼働させ、PVE 側の `k8s/pve/tfc-agent`
Deployment は `replicas: 0` のままにする。
