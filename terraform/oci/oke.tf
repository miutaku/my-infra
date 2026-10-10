data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}

resource "oci_containerengine_cluster" "oke_cluster" {
  compartment_id     = var.compartment_ocid
  kubernetes_version = "v1.36.4"
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
  value       = module.oke_workers_v2.node_pool_ids.base
}

output "nat_ip" {
  description = "Static NAT egress IP for worker nodes"
  value       = oci_core_public_ip.nat_ip.ip_address
}
