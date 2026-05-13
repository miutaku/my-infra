# MetalLB (LoadBalancer for RKE2)

RKE2 クラスタに L2 モードの LoadBalancer 機能を提供する。  
ArgoCD App-of-Apps (`k8s/pve/argocd-apps/metallb.yaml`) で管理される。

## 構成

| 項目 | 値 |
|---|---|
| モード | L2 (ARP アナウンス) |
| IP プール | `192.168.20.200-192.168.20.226` |
| インストール方法 | ArgoCD Application (MetalLB Helm chart + repo内manifest) |

IP プールは VLAN 20 の DHCP 割り当て範囲外に設定すること。  
DHCP サーバー (IX2215) の `ip dhcp profile vlan20` と重複しないこと。

## ArgoCD での管理

このディレクトリのマニフェストは ArgoCD が自動で同期する。  
**手動で `kubectl apply` や `helm install` は不要。**

同期順序: sync-wave `1`

## IP プールの変更

[metallb.yaml](./metallb.yaml) の `IPAddressPool.spec.addresses` を変更して  
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
