locals {
  catalog = jsondecode(file("${path.module}/rules.json"))
  targets = jsondecode(file("${path.module}/targets.json"))
}

data "grafana_data_source" "metrics" {
  for_each = var.environments
  uid      = each.value.datasource_uid

  lifecycle {
    postcondition {
      condition     = self.type == "prometheus"
      error_message = "Monitoring requires an existing Prometheus-type data source with its environment-specific PDC connection."
    }
  }
}

module "monitoring" {
  source   = "./modules/monitoring"
  for_each = var.environments

  environment    = each.key
  cluster        = each.value.cluster
  datasource_uid = data.grafana_data_source.metrics[each.key].uid
  profile        = each.value.profile
  features       = each.value.features
  catalog        = local.catalog
  targets        = each.value.profile == "home" ? local.targets : []
  contact_points = var.contact_points
  paused         = var.paused || each.value.paused
}

output "rule_uids" {
  description = "Stable rule identifiers for read-only query validation and Grafana links."
  value       = { for name, monitoring in module.monitoring : name => monitoring.rule_uids }
}

output "rule_settings" {
  description = "Severity, receiver and evaluation settings for review before enabling."
  value       = { for name, monitoring in module.monitoring : name => monitoring.rule_settings }
}
