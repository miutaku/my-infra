data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}

resource "oci_containerengine_cluster" "oke_cluster" {
  compartment_id     = var.compartment_ocid
  kubernetes_version = "v1.36.0"
  name               = var.cluster_name
  type               = "BASIC_CLUSTER"
  vcn_id             = oci_core_vcn.oke_vcn.id
  freeform_tags      = local.common_tags

  endpoint_config {
    is_public_ip_enabled = true
    subnet_id            = oci_core_subnet.oke_lb_subnet.id
  }

  options {
    service_lb_subnet_ids = [oci_core_subnet.oke_lb_subnet.id]
    add_ons {
      is_kubernetes_dashboard_enabled = false
      is_tiller_enabled               = false
    }
    kubernetes_network_config {
      pods_cidr     = "10.244.0.0/16"
      services_cidr = "10.96.0.0/16"
    }
  }
}

resource "oci_containerengine_node_pool" "oke_node_pool" {
  cluster_id         = oci_containerengine_cluster.oke_cluster.id
  compartment_id     = var.compartment_ocid
  kubernetes_version = oci_containerengine_cluster.oke_cluster.kubernetes_version
  name               = "oke-free-node-pool"
  node_shape         = var.node_pool_shape
  freeform_tags = merge(local.common_tags, {
    autoscaler = "cluster"
  })
  defined_tags = {
    "${oci_identity_tag_namespace.oke.name}.${oci_identity_tag.autoscaler.name}" = "cluster"
  }

  node_shape_config {
    ocpus         = var.node_pool_ocpus
    memory_in_gbs = var.node_pool_memory_gbs
  }

  node_source_details {
    image_id    = local.oke_node_image_id
    source_type = "image"
  }

  node_config_details {
    size = var.node_pool_size

    # Spread across ADs when region has multiple; fall back to AD-1 for single-AD regions
    placement_configs {
      availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
      subnet_id           = oci_core_subnet.oke_worker_subnet.id
    }
    placement_configs {
      availability_domain = data.oci_identity_availability_domains.ads.availability_domains[min(1, length(data.oci_identity_availability_domains.ads.availability_domains) - 1)].name
      subnet_id           = oci_core_subnet.oke_worker_subnet.id
    }
  }

  ssh_public_key = var.ssh_public_key

  lifecycle {
    ignore_changes = [
      node_config_details[0].size,
    ]
  }
}

# OKE requires images built specifically for the target Kubernetes version
# (they ship a matching kubelet build / cgroup config); generic Oracle Linux
# OS images are not guaranteed to work (e.g. v1.36.0 kubelet refuses to start
# on a generic OL8 image's default cgroup v1 setup).
data "oci_containerengine_node_pool_option" "oke_node_pool_option" {
  compartment_id      = var.compartment_ocid
  node_pool_option_id = "all"
}

locals {
  oke_node_image_sources = [
    for s in data.oci_containerengine_node_pool_option.oke_node_pool_option.sources :
    s if s.source_type == "IMAGE" &&
    strcontains(s.source_name, "OKE-${trimprefix(oci_containerengine_cluster.oke_cluster.kubernetes_version, "v")}-") &&
    strcontains(s.source_name, "aarch64") &&
    !strcontains(s.source_name, "GPU")
  ]

  oke_node_image_id = local.oke_node_image_sources[0].image_id
}

data "oci_containerengine_cluster_kube_config" "kube_config" {
  cluster_id = oci_containerengine_cluster.oke_cluster.id
}

output "kubeconfig" {
  value     = data.oci_containerengine_cluster_kube_config.kube_config.content
  sensitive = true
}

output "cluster_id" {
  description = "OKE Cluster OCID"
  value       = oci_containerengine_cluster.oke_cluster.id
}

output "node_pool_id" {
  description = "OKE worker node pool OCID"
  value       = oci_containerengine_node_pool.oke_node_pool.id
}

output "nat_ip" {
  description = "Static NAT egress IP for worker nodes"
  value       = oci_core_public_ip.nat_ip.ip_address
}
