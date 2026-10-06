terraform {
  required_version = ">= 1.10"
  cloud {
    organization = "miutaku"
    workspaces { name = "reventer-observability" }
  }
  required_providers {
    oci        = { source = "oracle/oci", version = "8.19.0" }
    cloudflare = { source = "cloudflare/cloudflare", version = "5.19.1" }
    kubernetes = { source = "hashicorp/kubernetes", version = "3.1.0" }
  }
}

provider "oci" {
  config_file_profile = "PRD"
  region              = "ap-tokyo-1"
}

variable "compartment_id" { type = string }
variable "vcn_id" { type = string }
variable "public_route_table_id" { type = string }
variable "availability_domain" { type = string }
variable "image_id" { type = string }
variable "ssh_public_key" { type = string }
variable "admin_cidr" {
  type = string
  validation {
    condition     = can(cidrhost(var.admin_cidr, 0)) && endswith(var.admin_cidr, "/32")
    error_message = "SSH must be restricted to a single administrator IPv4 /32."
  }
}

locals {
  tags = { managed_by = "terraform", repository = "my-infra", application = "reventer-observability" }
}

resource "oci_core_security_list" "monitoring" {
  compartment_id = var.compartment_id
  vcn_id         = var.vcn_id
  display_name   = "reventer-observability-egress"
  freeform_tags  = local.tags
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }
}

resource "oci_core_subnet" "monitoring" {
  compartment_id    = var.compartment_id
  vcn_id            = var.vcn_id
  display_name      = "reventer-observability-subnet"
  cidr_block        = "10.0.3.0/24"
  dns_label         = "reventermon"
  route_table_id    = var.public_route_table_id
  security_list_ids = [oci_core_security_list.monitoring.id]
  freeform_tags     = local.tags
}

resource "oci_core_network_security_group" "monitoring" {
  compartment_id = var.compartment_id
  vcn_id         = var.vcn_id
  display_name   = "reventer-observability-ssh"
  freeform_tags  = local.tags
}

resource "oci_core_network_security_group_security_rule" "ssh" {
  network_security_group_id = oci_core_network_security_group.monitoring.id
  direction                 = "INGRESS"
  protocol                  = "6"
  source                    = var.admin_cidr
  source_type               = "CIDR_BLOCK"
  description               = "Administrator SSH only; monitoring traffic uses outbound Tunnel/PDC"
  tcp_options {
    destination_port_range {
      min = 22
      max = 22
    }
  }
}

resource "oci_core_instance" "monitoring" {
  count                = 2
  compartment_id       = var.compartment_id
  availability_domain  = var.availability_domain
  fault_domain         = "FAULT-DOMAIN-${count.index + 1}"
  display_name         = "reventer-observability-${format("%02d", count.index + 1)}"
  shape                = "VM.Standard.E2.1.Micro"
  freeform_tags        = local.tags
  preserve_boot_volume = true
  create_vnic_details {
    subnet_id        = oci_core_subnet.monitoring.id
    assign_public_ip = true
    nsg_ids          = [oci_core_network_security_group.monitoring.id]
    hostname_label   = "reventermon${count.index + 1}"
  }
  source_details {
    source_type             = "image"
    source_id               = var.image_id
    boot_volume_size_in_gbs = 50
    boot_volume_vpus_per_gb = 10
  }
  instance_options { are_legacy_imds_endpoints_disabled = true }
  agent_config {
    is_monitoring_disabled = true
    is_management_disabled = true
  }
  metadata = {
    ssh_authorized_keys = var.ssh_public_key
    user_data           = base64encode(file("${path.module}/cloud-init.yaml"))
  }
  lifecycle {
    prevent_destroy = true
    # OCI user_data changes force replacement. Roll out live configuration with
    # the deployment script; updated bootstrap recipes apply only to new VMs.
    ignore_changes = [metadata["user_data"]]
  }
}

output "instances" {
  value = { for vm in oci_core_instance.monitoring : vm.display_name => {
    id = vm.id, public_ip = vm.public_ip, private_ip = vm.private_ip, fault_domain = vm.fault_domain
  } }
}
