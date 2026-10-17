environments = {
  home = {
    datasource_uid = "cfkolv57kzn5sd"
    cluster        = "home-k8s"
    profile        = "home"
    features       = ["kubernetes", "probes", "backups"]
  }
  stg = {
    datasource_uid = "cg0m1h98bpedcb"
    cluster        = "oke-stg"
    profile        = "oke"
    features       = ["kubernetes"]
    paused         = true # Existing PDC path must be fixed before enabling.
  }
  prd = {
    datasource_uid = "cfp1pqo5zixa8e"
    cluster        = "oke-prd"
    profile        = "oke"
    features       = ["kubernetes"]
    paused         = true # Existing PDC path must be fixed before enabling.
  }
}

contact_points = {
  warn     = "Discord - grafana-warning"
  critical = "Discord - grafana-critical"
}

# Enable only after GitOps collection, PDC queries and receiver checks pass.
paused = true
