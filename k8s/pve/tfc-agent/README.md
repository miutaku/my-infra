# tfc-agent

`pve-home` workspaceのTerraform agentはTalosの`tfc-agent` namespaceで稼働する。

既存ExternalSecretの`TFC_HOME_AGENT_TOKEN`と`TFC_HOME_AGENT_NAME`を継続使用する。control planeノードのラベル存在を使って配置し、agent imageは1.28.8を使用する。

Talos自身のVMを変更するapplyはagentも停止し得るため、対象ノードとagent配置を確認して実行する。agent復旧後に残るrun/stateを確認し、重複applyを行わない。
