variable "os_update_prepared" {
  type    = bool
  default = false
}
variable "monitoring_defined_tags" {
  type    = map(map(string))
  default = {}
}
variable "tenancy_id" {
  type    = string
  default = null
}
resource "oci_identity_compartment" "os_recovery" {
  count          = var.os_update_prepared ? 1 : 0
  compartment_id = var.tenancy_id
  name           = "reventer-os-recovery"
  description    = "Isolated recovery boot volumes for monitoring"
  enable_delete  = false
  freeform_tags  = local.tags
  lifecycle { prevent_destroy = true }
}
resource "oci_identity_tag_namespace" "os_update" {
  count          = var.os_update_prepared ? 1 : 0
  compartment_id = var.tenancy_id
  name           = "ReVenterMaintenance"
  description    = "Scope maintenance to observability resources"
}
resource "oci_identity_tag" "os_update_role" {
  count            = var.os_update_prepared ? 1 : 0
  tag_namespace_id = oci_identity_tag_namespace.os_update[0].id
  name             = "Role"
  description      = "Observability resource role"
}
resource "oci_identity_dynamic_group" "os_update" {
  count          = var.os_update_prepared ? 1 : 0
  compartment_id = var.tenancy_id
  name           = "reventer-observability-os-update"
  description    = "Only the two VMs; instance principals, no API keys"
  matching_rule  = "ANY {${join(", ", [for vm in oci_core_instance.monitoring : "instance.id = '${vm.id}'"])}}"
}
locals {
  maintenance_principal = var.os_update_prepared ? "Allow dynamic-group ${oci_identity_dynamic_group.os_update[0].name} to" : ""
  maintenance_tag       = "where target.resource.tag.ReVenterMaintenance.Role='observability'"
}
resource "oci_identity_policy" "os_update" {
  count          = var.os_update_prepared ? 1 : 0
  compartment_id = var.tenancy_id
  name           = "reventer-observability-os-update"
  description    = "Peer updates; no instance create/delete or OKE volume write"
  statements = concat(
    [for type in ["compartments", "volumes", "boot-volume-backups", "volume-backups"] : "${local.maintenance_principal} inspect ${type} in tenancy"],
    [
      "${local.maintenance_principal} read instances in compartment id ${var.compartment_id}",
      "${local.maintenance_principal} {INSTANCE_UPDATE, INSTANCE_BOOT_VOLUME_REPLACE} in compartment id ${var.compartment_id} ${local.maintenance_tag}",
      "${local.maintenance_principal} {VOLUME_WRITE} in compartment id ${var.compartment_id} ${local.maintenance_tag}",
      "${local.maintenance_principal} {VOLUME_CREATE, VOLUME_UPDATE, VOLUME_WRITE, VOLUME_DELETE} in compartment id ${oci_identity_compartment.os_recovery[0].id}",
      "${local.maintenance_principal} use tag-namespaces in tenancy where target.tag-namespace.name='ReVenterMaintenance'",
    ],
    flatten([for compartment in [var.compartment_id, oci_identity_compartment.os_recovery[0].id] : [
      "${local.maintenance_principal} {BOOT_VOLUME_BACKUP_CREATE} in compartment id ${compartment}",
      "${local.maintenance_principal} {BOOT_VOLUME_BACKUP_READ, BOOT_VOLUME_BACKUP_UPDATE, BOOT_VOLUME_BACKUP_DELETE} in compartment id ${compartment} ${local.maintenance_tag}",
    ]])
  )
}
resource "oci_core_network_security_group_security_rule" "os_update_peer" {
  count                     = var.os_update_prepared ? 1 : 0
  network_security_group_id = oci_core_network_security_group.monitoring.id
  direction                 = "INGRESS"
  protocol                  = "6"
  source                    = oci_core_network_security_group.monitoring.id
  source_type               = "NETWORK_SECURITY_GROUP"
  description               = "Private peer maintenance with forced-command SSH keys"
  tcp_options {
    destination_port_range {
      min = 22
      max = 22
    }
  }
}
output "os_update" {
  value = var.os_update_prepared ? {
    tenancy_id              = var.tenancy_id
    recovery_compartment_id = oci_identity_compartment.os_recovery[0].id
    compartment_id          = var.compartment_id
    availability_domain     = var.availability_domain
    region                  = "ap-tokyo-1"
  } : null
}
