locals {
  runbook = "https://github.com/miutaku/my-infra/blob/main/terraform/grafana-cloud/README.md"
  rules = concat([
    for rule in var.catalog : rule
    if rule.feature == "" || contains(var.features, rule.feature)
    ], [
    for target in var.targets : {
      id             = "missing-${target.id}"
      title          = "Required telemetry missing: ${target.id}"
      expression     = "absent_over_time(${target.selector}[${target.service == "power" ? "1m" : "3m"}]) or vector(0)"
      duration       = target.service == "power" ? "1m" : "2m"
      severity       = target.severity
      service        = target.service
      group          = target.service == "power" ? "power" : "observability"
      feature        = target.feature
      description    = "必須の監視データが途絶しています。対象のcollector稼働、scrapeと接続を確認してください。データ欠落中はサービスの正常性を保証できません。"
      display_target = target.id
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
      annotations = merge({
        display_target = try(rule.value.display_target, null) == null ? "" : rule.value.display_target
        summary        = rule.value.title
        description    = rule.value.description
        runbook_url    = local.runbook
      }, try(rule.value.details, null) == null ? {} : { details = rule.value.details })

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

      # Informational instant queries for annotations. A/B remain the condition;
      # snapshot timestamps belong in annotations, never in identity labels.
      dynamic "data" {
        for_each = try(rule.value.context_queries, {})
        iterator = context_query
        content {
          ref_id         = context_query.key
          datasource_uid = var.datasource_uid
          relative_time_range {
            from = 600
            to   = 0
          }
          model = jsonencode({
            refId      = context_query.key, expr = context_query.value, instant = true, range = false,
            datasource = { type = "prometheus", uid = var.datasource_uid },
            intervalMs = each.value.interval * 1000, maxDataPoints = 43200
          })
        }
      }

      # Rule-level routing does not replace unrelated teams' notification policies.
      notification_settings {
        contact_point   = lookup(var.contact_points, rule.value.severity, var.contact_points.warn)
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
