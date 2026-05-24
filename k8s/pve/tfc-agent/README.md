# tfc-agent

Terraform Cloud agent for the `pve-home` workspace.

This agent executes Terraform against Proxmox, so it must not run on the
regular RKE2 worker nodes that are likely to be resized or rebooted by that
same workspace.

## Placement policy

- Run a single agent replica, because the Terraform Cloud organization allows
  only one registered agent.
- Require scheduling on RKE2 control-plane nodes.
- Tolerate the `CriticalAddonsOnly=true:NoExecute` taint used by the
  control-plane nodes.
- Keep a PodDisruptionBudget with `minAvailable: 1` to block voluntary
  disruption while the agent is healthy.

When applying Proxmox changes that may disrupt RKE2 control-plane nodes, apply
one VM at a time and avoid changing the node currently running `tfc-agent`.
