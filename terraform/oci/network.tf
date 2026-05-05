resource "oci_core_vcn" "oke_vcn" {
  compartment_id = var.compartment_ocid
  display_name   = "oke-vcn"
  cidr_block     = var.vcn_cidr
  dns_label      = "okevcn"
  freeform_tags  = local.common_tags
}

resource "oci_core_internet_gateway" "oke_igw" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-igw"
  freeform_tags  = local.common_tags
}

resource "oci_core_public_ip" "nat_ip" {
  compartment_id = var.compartment_ocid
  lifetime       = "RESERVED"
  display_name   = "oke-nat-ip"
  freeform_tags  = local.common_tags
}

resource "oci_core_nat_gateway" "oke_ngw" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-ngw"
  public_ip_id   = oci_core_public_ip.nat_ip.id
  freeform_tags  = local.common_tags
}

# Public Subnet — API endpoint + Flex LB (ingress-nginx)
resource "oci_core_subnet" "oke_lb_subnet" {
  compartment_id             = var.compartment_ocid
  vcn_id                     = oci_core_vcn.oke_vcn.id
  cidr_block                 = cidrsubnet(var.vcn_cidr, 8, 0) # 10.0.0.0/24
  display_name               = "oke-lb-subnet"
  dns_label                  = "okelb"
  prohibit_public_ip_on_vnic = false
  route_table_id             = oci_core_route_table.public_rt.id
  security_list_ids          = [oci_core_security_list.lb_sl.id]
  freeform_tags              = local.common_tags
}

# Private Subnet — Worker Nodes
resource "oci_core_subnet" "oke_worker_subnet" {
  compartment_id             = var.compartment_ocid
  vcn_id                     = oci_core_vcn.oke_vcn.id
  cidr_block                 = cidrsubnet(var.vcn_cidr, 8, 1) # 10.0.1.0/24
  display_name               = "oke-worker-subnet"
  dns_label                  = "okeworker"
  prohibit_public_ip_on_vnic = true
  route_table_id             = oci_core_route_table.private_rt.id
  security_list_ids          = [oci_core_security_list.worker_sl.id]
  freeform_tags              = local.common_tags
}

# Route Tables
resource "oci_core_route_table" "public_rt" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-public-rt"
  freeform_tags  = local.common_tags
  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = oci_core_internet_gateway.oke_igw.id
  }
}

resource "oci_core_route_table" "private_rt" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-private-rt"
  freeform_tags  = local.common_tags
  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = oci_core_nat_gateway.oke_ngw.id
  }
}

# Security List for public subnet (API endpoint + Flex LB)
resource "oci_core_security_list" "lb_sl" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-lb-sl"
  freeform_tags  = local.common_tags

  # OKE API server (kubectl)
  ingress_security_rules {
    protocol  = "6" # TCP
    source    = "0.0.0.0/0"
    stateless = false
    tcp_options {
      min = 6443
      max = 6443
    }
  }

  # HTTPS — Flex LB (ingress-nginx) + API server fallback
  ingress_security_rules {
    protocol  = "6" # TCP
    source    = "0.0.0.0/0"
    stateless = false
    tcp_options {
      min = 443
      max = 443
    }
  }

  # HTTP — Flex LB (ingress-nginx, redirects to HTTPS)
  ingress_security_rules {
    protocol  = "6" # TCP
    source    = "0.0.0.0/0"
    stateless = false
    tcp_options {
      min = 80
      max = 80
    }
  }

  # VCN internal (node→LB health checks, OKE control plane)
  ingress_security_rules {
    protocol  = "all"
    source    = var.vcn_cidr
    stateless = false
  }

  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
    stateless   = false
  }
}

# Security List for private worker subnet
resource "oci_core_security_list" "worker_sl" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-worker-sl"
  freeform_tags  = local.common_tags

  # Node-to-node and LB→node communication within VCN
  ingress_security_rules {
    protocol  = "all"
    source    = var.vcn_cidr
    stateless = false
  }

  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
    stateless   = false
  }
}
