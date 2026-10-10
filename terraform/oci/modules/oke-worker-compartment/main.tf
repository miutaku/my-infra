terraform {
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "~> 8.19"
    }
  }
}

locals {
  shared_network_scope = var.shared_network_compartment_id == var.tenancy_ocid ? "tenancy" : "compartment id ${var.shared_network_compartment_id}"
  tags                 = { "managed-by" = "terraform", "environment" = var.environment }
  worker_tags          = { "oke.autoscaler" = "cluster" }
  scope                = "compartment id ${oci_identity_compartment.workers.id}"
  subject              = "dynamic-group id ${oci_identity_dynamic_group.autoscaler.id}"
}

# Standalone design module. It must not replace existing resource addresses.
resource "oci_identity_compartment" "workers" {
  compartment_id = var.tenancy_ocid
  name           = "reventer-oke-workers"
  description    = "OKE workers and worker network resources"
  enable_delete  = false
  freeform_tags  = local.tags
  lifecycle { prevent_destroy = true }
}

# This compartment contains only the Autoscaler-managed burst pool.
# OKE nodeConfigDetails authorization does not accept target.nodepool.id here.
resource "oci_identity_compartment" "burst" {
  compartment_id = oci_identity_compartment.workers.id
  name           = "reventer-oke-burst"
  description    = "Exclusive IAM boundary for the Autoscaler-managed burst pool"
  enable_delete  = false
  freeform_tags  = local.tags
  lifecycle { prevent_destroy = true }
}

resource "oci_core_route_table" "workers" {
  compartment_id = oci_identity_compartment.workers.id
  vcn_id         = var.vcn_id
  display_name   = "reventer-oke-worker-private-rt"
  freeform_tags  = local.tags
  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = var.nat_gateway_id
  }
  route_rules {
    destination_type  = "SERVICE_CIDR_BLOCK"
    destination       = var.service_cidr
    network_entity_id = var.service_gateway_id
  }

}

resource "oci_core_security_list" "workers" {
  compartment_id = oci_identity_compartment.workers.id
  vcn_id         = var.vcn_id
  display_name   = "reventer-oke-worker-sl"
  freeform_tags  = local.tags
  ingress_security_rules {
    protocol = "all"
    source   = var.vcn_cidr
  }
  ingress_security_rules {
    protocol = "1"
    source   = "0.0.0.0/0"
    icmp_options {
      type = 3
      code = 4
    }
  }
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }
  # OCI CCM owns additional LoadBalancer/NodePort rules after initial creation.
  lifecycle {
    ignore_changes = [ingress_security_rules, egress_security_rules]
  }
}

# Keep DHCP within the same IAM boundary as the worker subnet.
resource "oci_core_dhcp_options" "workers" {
  compartment_id = oci_identity_compartment.workers.id
  vcn_id         = var.vcn_id
  display_name   = "reventer-oke-worker-dhcp"
  freeform_tags  = local.tags
  options {
    type        = "DomainNameServer"
    server_type = "VcnLocalPlusInternet"
  }
  options {
    type                = "SearchDomain"
    search_domain_names = [var.vcn_dns_domain]
  }
}

resource "oci_core_subnet" "workers" {
  compartment_id             = oci_identity_compartment.workers.id
  vcn_id                     = var.vcn_id
  cidr_block                 = var.worker_subnet_cidr
  display_name               = "reventer-oke-worker-subnet"
  dns_label                  = "okeworkerv2"
  dhcp_options_id            = oci_core_dhcp_options.workers.id
  prohibit_public_ip_on_vnic = true
  route_table_id             = oci_core_route_table.workers.id
  security_list_ids          = [oci_core_security_list.workers.id]
  freeform_tags              = local.tags
}

resource "oci_containerengine_node_pool" "workers" {
  for_each           = toset(["base", "burst"])
  cluster_id         = var.cluster_id
  compartment_id     = oci_identity_compartment.workers.id
  kubernetes_version = var.kubernetes_version
  name               = "oke-${var.environment}-${each.key}-v2"
  node_shape         = "VM.Standard.A1.Flex"
  freeform_tags      = merge(local.tags, { "capacity" = each.key })
  defined_tags       = local.worker_tags
  node_shape_config {
    ocpus         = 2
    memory_in_gbs = 12
  }
  node_source_details {
    image_id                = var.image_id
    source_type             = "image"
    boot_volume_size_in_gbs = 50
  }
  node_config_details {
    # Provisioning phase creates no worker VMs in either pool.
    size          = 0
    defined_tags  = local.worker_tags
    freeform_tags = merge(local.tags, { "capacity" = each.key })
    dynamic "placement_configs" {
      for_each = var.availability_domains
      content {
        availability_domain = placement_configs.value
        subnet_id           = oci_core_subnet.workers.id
      }
    }
  }
  initial_node_labels {
    key   = "reventer.io/capacity"
    value = each.key
  }
  ssh_public_key = var.ssh_public_key
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [node_config_details[0].size, defined_tags["Oracle-Tags.CreatedBy"], defined_tags["Oracle-Tags.CreatedOn"]]
  }
}

# Preserve the existing zero-sized v2 burst pool during preparation.
# Retire it separately after successful authorization and migration.
resource "oci_containerengine_node_pool" "autoscaled" {
  for_each           = toset(["burst"])
  cluster_id         = var.cluster_id
  compartment_id     = oci_identity_compartment.burst.id
  kubernetes_version = var.kubernetes_version
  name               = "oke-${var.environment}-${each.key}-v3"
  node_shape         = "VM.Standard.A1.Flex"
  freeform_tags      = merge(local.tags, { "capacity" = each.key })
  defined_tags       = local.worker_tags
  node_shape_config {
    ocpus         = 2
    memory_in_gbs = 12
  }
  node_source_details {
    image_id                = var.image_id
    source_type             = "image"
    boot_volume_size_in_gbs = 50
  }
  node_config_details {
    # Provisioning phase creates no worker VMs in either pool.
    size          = 0
    defined_tags  = local.worker_tags
    freeform_tags = merge(local.tags, { "capacity" = each.key })
    dynamic "placement_configs" {
      for_each = var.availability_domains
      content {
        availability_domain = placement_configs.value
        subnet_id           = oci_core_subnet.workers.id
      }
    }
  }
  initial_node_labels {
    key   = "reventer.io/capacity"
    value = each.key
  }
  ssh_public_key = var.ssh_public_key
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [node_config_details[0].size, defined_tags["Oracle-Tags.CreatedBy"], defined_tags["Oracle-Tags.CreatedOn"]]
  }
}

# New group and policy coexist with the legacy group during migration.
# Base workers also need membership: Autoscaler normally runs on a base node.
resource "oci_identity_dynamic_group" "autoscaler" {
  compartment_id = var.tenancy_ocid
  name           = "reventer-oke-autoscaler-v2"
  description    = "Tagged OKE workers in the dedicated worker compartment"
  matching_rule  = "ALL {tag.oke.autoscaler.value='cluster', ANY {instance.compartment.id='${oci_identity_compartment.workers.id}', instance.compartment.id='${oci_identity_compartment.burst.id}'}}"
  freeform_tags  = local.tags
}

resource "oci_identity_policy" "autoscaler" {
  compartment_id = var.tenancy_ocid
  name           = "reventer-oke-autoscaler-v2"
  description    = "Autoscaler writes limited to the exclusive burst compartment"
  freeform_tags  = local.tags
  statements = concat([
    "Allow ${local.subject} to read cluster-node-pools in ${local.scope}",
    "Allow ${local.subject} to manage cluster-node-pools in compartment id ${oci_identity_compartment.burst.id} where any {request.operation = 'UpdateNodePool', request.operation = 'DeleteNode'}",
    "Allow ${local.subject} to manage instance-family in ${local.scope}",
    "Allow ${local.subject} to use subnets in ${local.scope}",
    "Allow ${local.subject} to read virtual-network-family in ${local.scope}",
    "Allow ${local.subject} to use vnics in ${local.scope}",
    # Metadata only. Compartment discovery can involve the tenancy parent.
    "Allow ${local.subject} to inspect compartments in tenancy",
    "Allow ${local.subject} to use tag-namespaces in tenancy where target.tag-namespace.name = 'oke'",
    # Exact read APIs for shared root VCN/gateways: no root network writes.
    # Actual necessity and OKE internal authorization must be verified on STG.
    "Allow ${local.subject} to read virtual-network-family in ${local.shared_network_scope} where any {request.operation = 'GetVcn', request.operation = 'GetNatGateway', request.operation = 'GetServiceGateway'}",
  ], var.additional_reviewed_statements)
}

output "worker_compartment_id" { value = oci_identity_compartment.workers.id }
output "node_pool_ids" {
  value = {
    base  = oci_containerengine_node_pool.workers["base"].id
    burst = oci_containerengine_node_pool.autoscaled["burst"].id
  }
}
output "burst_compartment_id" { value = oci_identity_compartment.burst.id }
output "legacy_zero_burst_pool_id" { value = oci_containerengine_node_pool.workers["burst"].id }
output "policy_statements" { value = oci_identity_policy.autoscaler.statements }
