locals {
  panels = concat([
    { title = "CPU busy (%)", expression = "100 * (1 - avg by(instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])))", unit = "percent" },
    { title = "Available memory (%)", expression = "100 * node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes", unit = "percent" },
    { title = "Write queue (bytes)", expression = "vmagent_remotewrite_pending_data_bytes", unit = "bytes" },
    { title = "UPS charge (%)", expression = "network_ups_tools_battery_charge{job=\"nut\"}", unit = "percent" },
    { title = "UPS battery operation", expression = "network_ups_tools_ups_status{job=\"nut\",flag=\"OB\"}", unit = "short" },
    { title = "NAS dataset use (%)", expression = "100 * hrStorageUsed{job=\"snmp_truenas\",hrStorageDescr=~\"/mnt/.*\"} / hrStorageSize{job=\"snmp_truenas\",hrStorageDescr=~\"/mnt/.*\"}", unit = "percent" },
    { title = "Service probes (1 = success)", expression = "probe_success", unit = "short" },
    ], contains(var.features, "kubernetes") ? [
    { title = "Nodes Ready", expression = "kube_node_status_condition{condition=\"Ready\",status=\"true\"}", unit = "short" },
    { title = "Deployment replicas available", expression = "kube_deployment_status_replicas_available", unit = "short" },
    ] : [], contains(var.features, "backups") ? [
    { title = "Time since backup success", expression = "time() - kube_cronjob_status_last_successful_time", unit = "s" },
  ] : [])
}

resource "grafana_dashboard" "health" {
  folder    = grafana_folder.monitoring.uid
  overwrite = false
  config_json = jsonencode({
    uid           = "mi-health-${var.environment}"
    title         = "my-infra / ${var.environment} / Health"
    tags          = ["my-infra", "terraform", var.environment]
    schemaVersion = 39
    timezone      = "Asia/Tokyo"
    refresh       = "1m"
    time          = { from = "now-6h", to = "now" }
    panels = [for index, panel in local.panels : {
      id         = index + 1
      title      = panel.title
      type       = "timeseries"
      datasource = { type = "prometheus", uid = var.datasource_uid }
      gridPos    = { h = 8, w = 12, x = (index % 2) * 12, y = floor(index / 2) * 8 }
      fieldConfig = {
        defaults  = { unit = panel.unit }
        overrides = []
      }
      targets = [{ refId = "A", expr = panel.expression, legendFormat = "{{instance}} {{namespace}} {{deployment}} {{cronjob}} {{hrStorageDescr}}", range = true }]
    }]
  })
}
