locals {
  runbook = "https://github.com/miutaku/my-infra/blob/main/terraform/grafana-cloud/README.md"
  rules = concat([
    for rule in var.catalog : merge(rule, {
      # STG availability loss does not page; data/observability risks still do.
      severity = var.environment == "stg" && contains(["availability", "kubernetes"], rule.group) ? "warn" : rule.severity
    })
    if contains(["all", var.profile], rule.profile) && (rule.feature == "" || contains(var.features, rule.feature))
    ], [
    for target in var.targets : {
      id          = "missing-${target.id}"
      title       = "Required telemetry missing: ${target.id}"
      expression  = "absent_over_time(${target.selector}[${target.service == "power" ? "1m" : "3m"}]) or vector(0)"
      duration    = target.service == "power" ? "1m" : "2m"
      severity    = target.severity
      service     = target.service
      group       = target.service == "power" ? "power" : "observability"
      profile     = var.profile
      feature     = target.feature
      description = "Required series ${target.selector} has disappeared or stopped updating. Check collector and target before treating any apparent recovery as real."
    } if target.feature == "" || contains(var.features, target.feature)
  ])
  groups = {
    for group, seconds in {
      # Grafana's scheduler uses 10-second multiples; UPS collection is 15s.
      power      = 10, availability = 60, capacity = 60,
      kubernetes = 60, backups = 60, observability = 60
      } : group => {
      interval = seconds
      rules    = { for rule in local.rules : rule.id => rule if rule.group == group }
    } if length([for rule in local.rules : rule.id if rule.group == group]) > 0
  }
}

resource "grafana_folder" "monitoring" {
  uid   = "my-infra-${var.environment}"
  title = "my-infra / ${var.environment}"
}

resource "grafana_rule_group" "monitoring" {
  for_each         = local.groups
  name             = each.key
  folder_uid       = grafana_folder.monitoring.uid
  interval_seconds = each.value.interval

  dynamic "rule" {
    for_each = each.value.rules
    content {
      uid            = "mi-${var.environment}-${substr(sha1(rule.key), 0, 24)}"
      name           = rule.value.title
      condition      = "B"
      for            = rule.value.duration
      is_paused      = var.paused
      no_data_state  = "OK"
      exec_err_state = "Error"
      labels = {
        managed_by  = "terraform"
        scope       = "my-infra"
        environment = var.environment
        cluster     = var.cluster
        service     = rule.value.service
        severity    = rule.value.severity
        rule_id     = rule.key
      }
      annotations = {
        summary     = rule.value.title
        description = rule.value.description
        runbook_url = local.runbook
      }

      data {
        ref_id         = "A"
        datasource_uid = var.datasource_uid
        relative_time_range {
          from = 600
          to   = 0
        }
        model = jsonencode({
          refId      = "A", expr = rule.value.expression, instant = true, range = false,
          datasource = { type = "prometheus", uid = var.datasource_uid },
          intervalMs = each.value.interval * 1000, maxDataPoints = 43200
        })
      }

      data {
        ref_id         = "B"
        datasource_uid = "__expr__"
        relative_time_range {
          from = 0
          to   = 0
        }
        model = jsonencode({ refId = "B", type = "math", expression = "$A > 0" })
      }

      # Rule-level routing does not replace unrelated teams' notification policies.
      notification_settings {
        contact_point   = var.contact_points[rule.value.severity]
        group_by        = ["grafana_folder", "alertname", "environment", "service"]
        group_wait      = each.key == "power" && rule.value.severity == "critical" ? "0s" : (rule.value.severity == "critical" ? "30s" : "2m")
        group_interval  = "5m"
        repeat_interval = rule.value.severity == "critical" ? "1h" : "12h"
      }
    }
  }
}

output "rule_uids" {
  value = { for rule in local.rules : rule.id => "mi-${var.environment}-${substr(sha1(rule.id), 0, 24)}" }
}

output "rule_settings" {
  value = merge([
    for group in grafana_rule_group.monitoring : {
      for rule in group.rule : rule.labels.rule_id => {
        severity = rule.labels.severity
        paused   = rule.is_paused
        receiver = rule.notification_settings[0].contact_point
        interval = group.interval_seconds
      }
    }
  ]...)
}
