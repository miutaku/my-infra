# Re:Venter alerting is owned by miutaku/reventer, not by this state.
# Forget only this bookkeeping resource. Its removal must not invoke any API
# operation, unpause old Integration rules, or delete real Grafana resources.
removed {
  from = terraform_data.reventer_observability
  lifecycle {
    destroy = false
  }
}
