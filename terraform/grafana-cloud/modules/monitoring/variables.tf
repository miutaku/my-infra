variable "environment" { type = string }
variable "cluster" { type = string }
variable "datasource_uid" { type = string }
variable "features" { type = set(string) }
variable "paused" { type = bool }
variable "contact_points" {
  type = object({ warn = string, critical = string })
}
variable "catalog" {
  type = list(object({
    id               = string
    title            = string
    expression       = string
    duration         = string
    severity         = string
    service          = string
    group            = string
    feature          = string
    description      = string
    display_target   = optional(string)
    details          = optional(string)
    maintenance_gate = optional(string)
    context_queries  = optional(map(string), {})
  }))
  validation {
    condition     = alltrue([for rule in var.catalog : rule.maintenance_gate == null ? true : contains(["advisory", "blocking"], rule.maintenance_gate)])
    error_message = "maintenance_gate must be advisory or blocking; omitted rules block maintenance."
  }
  validation {
    condition = alltrue(flatten([
      for rule in var.catalog : [for ref in keys(rule.context_queries) : can(regex("^[C-Z]$", ref))]
    ]))
    error_message = "Informational queries must use C-Z; A and B are reserved for the alert condition."
  }
}
variable "targets" {
  type = list(object({
    id       = string
    selector = string
    feature  = string
    severity = string
    service  = string
  }))
}
