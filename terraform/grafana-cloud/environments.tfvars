environments = {
  home = {
    datasource_uid = "cfkolv57kzn5sd"
    cluster        = "home-k8s"
    features       = ["kubernetes", "probes", "backups", "access", "storage_api", "database", "recording", "backup_integrity", "control_plane", "network", "operations"]
  }
}

contact_points = {
  warn     = "Discord - grafana-warning"
  critical = "Discord - grafana-critical"
}

# Collection and PDC queries validated before enabling notifications.
paused = false

# Public identifiers, verified with the read-only provisioning API.
discord_receiver_uids = {
  warn     = "afl6jwnytrjeoa"
  critical = "efl6k3pt6sni8f"
}
