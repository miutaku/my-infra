variable "environments" {
  description = "Existing environment-specific Prometheus/PDC data sources. Features must only be enabled after their collectors are deployed."
  type = map(object({
    datasource_uid = string
    cluster        = string
    profile        = string
    features       = set(string)
    paused         = optional(bool, false)
  }))

  validation {
    condition = alltrue([
      for name, env in var.environments : contains(["home", "stg", "prd"], name) &&
      contains(["home", "oke"], env.profile) &&
      (name == "home" ? env.profile == "home" : env.profile == "oke") &&
      length(env.datasource_uid) > 0 && length(env.cluster) > 0 &&
      length(setsubtract(env.features, toset(["kubernetes", "probes", "backups"]))) == 0 &&
      (!contains(env.features, "backups") || (env.profile == "home" && contains(env.features, "kubernetes")))
    ])
    error_message = "Use home/home or stg|prd/oke, nonempty datasource UID/cluster, and supported features. Home backups require kubernetes."
  }

  validation {
    condition     = length(distinct([for env in values(var.environments) : env.datasource_uid])) == length(var.environments)
    error_message = "Each environment must reference its own data source."
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
