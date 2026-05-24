# pve-tfc-agent

`pve-home` workspace 用の Terraform Cloud agent。

この agent は OKE 上で動作し、Site-to-Site VPN 経由で自宅 Proxmox API
(`https://192.168.0.115:8006`) に接続する。PVE 上の RKE2 に agent を置くと、
同じ Terraform 実行で worker / control-plane VM を変更した際に agent 自身が
停止し得るため、PVE とは別基盤の OKE に配置する。

## 前提

- OKE から `192.168.0.115:8006` へ到達できること。
- Bitwarden Secrets Manager に `TFC_HOME_AGENT_TOKEN` と
  `TFC_HOME_AGENT_NAME` が登録されていること。
- PVE 側の `k8s/pve/tfc-agent` Deployment は `replicas: 0` にしておくこと。

## 注意

Terraform Cloud 側で同じ agent token を使う Pod は 1 本だけ起動する。
PVE 側と OKE 側を同時に起動しない。
