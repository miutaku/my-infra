# MetalLB (LoadBalancer for RKE2)

RKE2 クラスタに L2 モードの LoadBalancer 機能を提供する。  
ArgoCD App-of-Apps (`k8s/pve/argocd-apps/metallb.yaml`) で管理される。

## 構成

| 項目 | 値 |
|---|---|
| モード | L2 (ARP アナウンス) |
| IP プール | `192.168.0.200-192.168.0.220` |
| インストール方法 | ArgoCD HelmRelease (grafana/helm-charts) |

IP プールは宅内 LAN の DHCP 割り当て範囲外に設定すること。  
DHCP サーバー (IX2215) の `ip dhcp profile main` の `default-gateway` 設定と重複しないこと。

## ArgoCD での管理

このディレクトリのマニフェストは ArgoCD が自動で同期する。  
**手動で `kubectl apply` や `helm install` は不要。**

同期順序: sync-wave `1` (external-secrets, bitwarden-sdk-server より後)

## IP プールの変更

[values.yaml](./values.yaml) の `configInline.address-pools[0].addresses` を変更して  
git push → main マージ → ArgoCD が自動反映。

## 確認コマンド

```bash
# MetalLB Pod が起動しているか確認
kubectl get pods -n metallb-system

# IP プールの確認
kubectl get ipaddresspool -n metallb-system

# LoadBalancer Service に IP が割り当てられているか確認
kubectl get svc -A --field-selector spec.type=LoadBalancer
```
