variable "os_update_prepared" {
  type    = bool
  default = false
}
variable "monitoring_defined_tags" {
  type    = map(map(string))
  default = {}
}
variable "tenancy_id" {
  type        = string
  description = "OCI tenancy OCID; required to isolate monitoring from OKE permissions"
}
resource "oci_identity_compartment" "os_recovery" {
  count          = 1
  compartment_id = var.tenancy_id
  name           = "reventer-observability"
  description    = "Isolated monitoring VMs and OS recovery; no OKE resources"
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
  maintenance_principal = var.os_update_prepared ? "Allow dynamic-group id ${oci_identity_dynamic_group.os_update[0].id} to" : ""
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
      "${local.maintenance_principal} read instances in compartment id ${oci_identity_compartment.os_recovery[0].id}",
      "${local.maintenance_principal} {INSTANCE_IMAGE_READ} in tenancy where target.image.id='${var.image_id}'",
      "${local.maintenance_principal} {INSTANCE_UPDATE, INSTANCE_BOOT_VOLUME_REPLACE, INSTANCE_POWER_ACTIONS, INSTANCE_ATTACH_VOLUME, INSTANCE_DETACH_VOLUME} in compartment id ${oci_identity_compartment.os_recovery[0].id}",
      "${local.maintenance_principal} manage volume-family in compartment id ${oci_identity_compartment.os_recovery[0].id}",
      "${local.maintenance_principal} use tag-namespaces in tenancy where any {target.tag-namespace.name='ReVenterMaintenance', target.tag-namespace.name='Oracle-Tags'}",
    ],
    flatten([for compartment in [oci_identity_compartment.os_recovery[0].id] : [
      "${local.maintenance_principal} {BOOT_VOLUME_BACKUP_CREATE} in compartment id ${compartment}",
      # Restore also checks reading the source backup as a secondary resource.
      "${local.maintenance_principal} read boot-volume-backups in compartment id ${compartment}",
      "${local.maintenance_principal} {BOOT_VOLUME_BACKUP_UPDATE, BOOT_VOLUME_BACKUP_DELETE} in compartment id ${compartment} ${local.maintenance_tag}",
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
    compartment_id          = oci_identity_compartment.os_recovery[0].id
    source_compartment_id   = var.compartment_id
    availability_domain     = var.availability_domain
    region                  = "ap-tokyo-1"
  } : null
}
