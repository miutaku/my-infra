# tfc-agent

`pve-home` workspace 用 Terraform Cloud agent の旧配置。

現在、実際の agent は OKE 側の `k8s/oci/apps/pve-tfc-agent` で稼働させる。
この PVE 側 Deployment は、同じ Proxmox/RKE2 基盤を変更する Terraform 実行中に
agent 自身が巻き込まれないよう、`replicas: 0` で停止しておく。

## 移設理由

- Terraform Cloud agent が `pve-home` workspace の Terraform を実行する。
- `pve-home` は Proxmox VM、RKE2 server / worker、関連 VM のディスクや構成を変更する。
- agent を PVE 上の RKE2 に置くと、worker だけでなく control-plane 変更時にも
  agent 自身が停止する可能性がある。
- OKE 側に置くことで、PVE クラスタ全体の変更から agent を切り離せる。

## 運用メモ

- Terraform Cloud 側で `TFC_HOME_AGENT_TOKEN` を使う agent は 1 本だけ起動する。
- PVE 側を再利用する場合は、先に OKE 側の `pve-tfc-agent` を止める。
- 通常運用では、この Deployment は `replicas: 0` のままにする。
