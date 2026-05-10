# ntopng

IX2215 で発生するネットワークエラーの原因調査を目的とした、フローベースのトラフィック可視化スタック。

## 構成

```
IX2215
  └─ NetFlow v9 (UDP 2055) → 192.168.20.210 (MetalLB)
                                    │
                              ntopng (monitoring ns)
                                    │
                        ntopng REST API v2 (port 3000)
                                    │
                         ntopng-exporter (monitoring ns)
                                    │
                         Grafana Alloy scrape :3001
                                    │
                    VictoriaMetrics / Grafana Cloud
```

## namespace

`monitoring` — victoria-metrics / snmp-exporter など他の監視コンポーネントと統一。

## リソース

| リソース | 説明 |
|---|---|
| Deployment `ntopng` | `ntop/ntopng:stable`。`-i nf://@2055` で NetFlow v9 を直接受信 |
| PVC `ntopng-data` | 5Gi (local-path)。フロー統計 RRD を永続化 |
| Service `ntopng-netflow` | LoadBalancer `192.168.20.210:2055/UDP`。IX2215 のエクスポート先 |
| Service `ntopng-web` | ClusterIP `:3000/TCP`。Cloudflare Tunnel 経由で Web UI を公開 |

## Web UI アクセス

Cloudflare Zero Trust Access で保護。`ntopng.miutaku.work` からアクセス。

## IX2215 NetFlow 設定

`ansible/ix2215/` で管理。`group_vars/all.yml` の `ix_netflow` セクションを参照。

```yaml
ix_netflow:
  version: 9
  destination_ip: "192.168.20.210"   # ntopng-netflow Service の MetalLB IP
  destination_port: 2055
  interfaces:
    - "GigaEthernet0.0"              # WAN 側
    - "Tunnel0.0"                    # MAP-E トンネル (実インターネットトラフィック)
```

適用:

```bash
cd ansible/ix2215
ansible-playbook site.yml
```

## ntopng-exporter (Prometheus メトリクス)

`k8s/pve/ntopng-exporter/` で管理。ntopng REST API v2 をスクレイプして
hosts / interfaces / l7protocols のメトリクスを `:3001/metrics` で公開する。

### interfacesToMonitor の確認手順

ntopng が NetFlow を受信し始めると、Web UI の **Interfaces** 画面にインターフェースが表示される。
そのインターフェース名を `k8s/pve/ntopng-exporter/ntopng-exporter.yaml` の
`interfacesToMonitor` に設定する（空リストの場合は全 IF を対象にする）。

## 関連ファイル

| ファイル | 内容 |
|---|---|
| [k8s/pve/argocd-apps/ntopng.yaml](../argocd-apps/ntopng.yaml) | ArgoCD Application |
| [k8s/pve/ntopng-exporter/](../ntopng-exporter/) | ntopng-exporter マニフェスト |
| [k8s/pve/argocd-apps/ntopng-exporter.yaml](../argocd-apps/ntopng-exporter.yaml) | ntopng-exporter ArgoCD Application |
| [ansible/ix2215/roles/netflow/](../../../ansible/ix2215/roles/netflow/) | IX2215 NetFlow 設定ロール |
| [ansible/ix2215/group_vars/all.yml](../../../ansible/ix2215/group_vars/all.yml) | `ix_netflow` 変数 |
