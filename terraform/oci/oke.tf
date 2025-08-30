data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}

resource "oci_containerengine_cluster" "oke_cluster" {
  compartment_id     = var.compartment_ocid
  kubernetes_version = "v1.33.1" # update latest version if needed
  name               = var.cluster_name
  vcn_id             = oci_core_vcn.oke_vcn.id
  options {
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

  node_shape_config {
    ocpus = var.node_pool_ocpus
    memory_in_gbs = var.node_pool_memory_gbs
  }

  node_source_details {
    image_id    = data.oci_core_images.node_image.images[0].id
    source_type = "image"
  }

  node_config_details {
    placement_configs {
      availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
      subnet_id           = oci_core_subnet.oke_worker_subnet.id
    }
    size = 1
  }

  ssh_public_key      = var.ssh_public_key
}

data "oci_core_images" "node_image" {
  compartment_id           = var.compartment_ocid
  operating_system         = "Oracle Linux"
  operating_system_version = "8"
  shape                    = var.node_pool_shape
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}

data "oci_containerengine_cluster_kube_config" "kube_config" {
  cluster_id = oci_containerengine_cluster.oke_cluster.id
}

output "kubeconfig" {
  value     = data.oci_containerengine_cluster_kube_config.kube_config.content
  sensitive = true
}
