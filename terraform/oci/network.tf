resource "oci_core_vcn" "oke_vcn" {
  compartment_id = var.compartment_ocid
  display_name   = "oke-vcn"
  cidr_block     = var.vcn_cidr
  dns_label      = "okevcn"
}

resource "oci_core_internet_gateway" "oke_igw" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-igw"
}

resource "oci_core_nat_gateway" "oke_ngw" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-ngw"
}

# Public Subnet for LB
resource "oci_core_subnet" "oke_lb_subnet" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  cidr_block     = cidrsubnet(var.vcn_cidr, 8, 0) # 10.0.0.0/24
  display_name   = "oke-lb-subnet"
  dns_label      = "okelb"
  prohibit_public_ip_on_vnic = false
  route_table_id = oci_core_route_table.public_rt.id
  security_list_ids = [oci_core_security_list.lb_sl.id]
}

# Private Subnet for Worker Nodes
resource "oci_core_subnet" "oke_worker_subnet" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  cidr_block     = cidrsubnet(var.vcn_cidr, 8, 1) # 10.0.1.0/24
  display_name   = "oke-worker-subnet"
  dns_label      = "okeworker"
  prohibit_public_ip_on_vnic = true
  route_table_id = oci_core_route_table.private_rt.id
  security_list_ids = [oci_core_security_list.worker_sl.id]
}

# Route Tables
resource "oci_core_route_table" "public_rt" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-public-rt"
  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = oci_core_internet_gateway.oke_igw.id
  }
}

resource "oci_core_route_table" "private_rt" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-private-rt"
  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = oci_core_nat_gateway.oke_ngw.id
  }
}

# Security Lists
resource "oci_core_security_list" "lb_sl" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-lb-sl"
  ingress_security_rules {
    protocol  = "6" # TCP
    source    = "192.168.0.0/24"
    stateless = false
    tcp_options {
      max = 53
      min = 53
    }
  }
  ingress_security_rules {
    protocol  = "17" # UDP
    source    = "192.168.0.0/24"
    stateless = false
    udp_options {
      max = 53
      min = 53
    }
  }
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
    stateless   = false
  }
}

resource "oci_core_security_list" "worker_sl" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-worker-sl"
  # Ingress for node-to-node communication
  ingress_security_rules {
    protocol  = "all"
    source    = var.vcn_cidr
    stateless = false
  }
  # Ingress for SSH
  ingress_security_rules {
    protocol  = "6" # TCP
    source    = "192.168.0.0/24" # For simplicity, can be restricted to your home IP
    stateless = false
    tcp_options {
      max = 22
      min = 22
    }
  }
  # Egress for all traffic
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
    stateless   = false
  }
}
