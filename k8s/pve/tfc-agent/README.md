# tfc-agent

`pve-home` workspace 用 Terraform Cloud agent（旧配置）についての運用メモです。

概要:
- 実稼働の agent は OKE 上の `k8s/oci/apps/pve-tfc-agent` で稼働させています。
- PVE クラスタ内の `k8s/pve/tfc-agent` Deployment はデフォルトで `replicas: 0` にして停止しています。

TFC_HOME_AGENT_TOKEN の扱い:
- `TFC_HOME_AGENT_TOKEN` は **自宅の PVE（pve-home ワークスペース）向けの Terraform Cloud agent トークン** です。
- このトークンを使う agent は Terraform Cloud 側で `pve-home` ワークスペースに紐づけられます。
- 現在は OKE 上の `pve-tfc-agent` がこのトークンで登録・稼働しているため、PVE 側の agent は停止しておきます。

切り替え手順（OKE -> PVE に戻す場合）:
1. OKE 側の `pve-tfc-agent` を停止（ArgoCD の該当 Application を pause または replicas を 0 にする）。
2. PVE 側の `k8s/pve/tfc-agent` Deployment を `replicas: 1` に戻す。
3. BSM（Bitwarden SDK / ExternalSecrets）に格納されている `TFC_HOME_AGENT_TOKEN` / `TFC_HOME_AGENT_NAME` を確認する。
4. Terraform Cloud の Agents 設定を確認し、重複登録がないことを確認する。

注意点:
- Terraform 実行中に PVE クラスタの VM（特に worker/control-plane）を再構築すると、同クラスタ上で動く agent 自身が再起動・停止され、Terraform 実行が失敗する可能性があります。
- そのため、通常運用では agent を OKE に配置して PVE の変更から切り離すことを推奨します。

確認項目:
- `k8s/pve/tfc-agent/tfc-agent-secret.yaml` が `TFC_HOME_AGENT_TOKEN` を参照していること（PVE 側の ExternalSecret）。
- OKE 側の `k8s/oci/apps/pve-tfc-agent/tfc-agent-secret.yaml` は `TFC_HOME_AGENT_TOKEN` を参照していること。

問題がなければ、この README を基に BSM のシークレット名と ArgoCD の同期状態を合わせてください。
