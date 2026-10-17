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
    id             = string
    title          = string
    expression     = string
    duration       = string
    severity       = string
    service        = string
    group          = string
    feature        = string
    description    = string
    display_target = optional(string)
  }))
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
