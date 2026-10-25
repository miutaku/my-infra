# Re:Venter alerting is managed in miutaku/reventer.
# Remove state ownership while retaining the Grafana resources.
removed {
  from = terraform_data.reventer_observability
  lifecycle {
    destroy = false
  }
}
