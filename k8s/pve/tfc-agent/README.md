# tfc-agent

`pve-home` workspaceのTerraform agentはTalosの`tfc-agent` namespaceで稼働する。OKEの旧agentはreplicas 0にし、OCIと家とのSite-to-Site VPNは撤去する。

既存ExternalSecretの`TFC_HOME_AGENT_TOKEN`と`TFC_HOME_AGENT_NAME`を継続使用する。control planeノードのラベル存在を使って配置し、agent imageは旧OKE側と同じ1.28.8に揃える。

Talos自身のVMを変更するapplyはagentも停止し得るため、対象ノードとagent配置を確認して実行する。agent復旧後に残るrun/stateを確認し、重複applyを行わない。

移行確認：Talos Deploymentが1/1 Ready、TFC home agent poolに接続、OKE旧Deploymentが0/0。
