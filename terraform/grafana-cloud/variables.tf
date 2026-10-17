variable "environments" {
  description = "Home Prometheus/PDC data source. Enable features only after their collectors are deployed."
  type = map(object({
    datasource_uid = string
    cluster        = string
    features       = set(string)
  }))

  validation {
    condition = length(var.environments) == 1 && contains(keys(var.environments), "home") && alltrue([
      for env in values(var.environments) :
      length(env.datasource_uid) > 0 && length(env.cluster) > 0 &&
      length(setsubtract(env.features, toset(["kubernetes", "probes", "backups"]))) == 0 &&
      (!contains(env.features, "backups") || contains(env.features, "kubernetes"))
    ])
    error_message = "Only the home environment is managed. Specify nonempty datasource UID/cluster and supported features. Backups require kubernetes."
  }
}

variable "contact_points" {
  description = "Existing Grafana contact point names. Direct routing preserves the stack's existing notification policy tree."
  type = object({
    warn     = string
    critical = string
  })
  validation {
    condition     = length(var.contact_points.warn) > 0 && length(var.contact_points.critical) > 0
    error_message = "Both severity levels need a notification receiver."
  }
}

variable "paused" {
  description = "Pause new rules until Grafana query/receiver checks pass; set false explicitly when enabling notifications."
  type        = bool
  default     = true
}
