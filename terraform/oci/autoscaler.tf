# Cluster Autoscaler runs on OKE worker nodes and uses OCI Instance Principals
# to resize tagged node pools. Keep this scoped to the OKE compartment.
resource "oci_identity_dynamic_group" "cluster_autoscaler_nodes" {
  compartment_id = var.tenancy_ocid
  name           = "my-infra-oke-cluster-autoscaler-nodes"
  description    = "OKE worker instances allowed to resize node pools for my-infra Cluster Autoscaler."
  matching_rule  = "ALL {instance.compartment.id = '${var.compartment_ocid}'} {instance.freeform-tags.autoscaler = 'cluster'}"
}

resource "oci_identity_policy" "cluster_autoscaler" {
  compartment_id = var.tenancy_ocid
  name           = "my-infra-oke-cluster-autoscaler"
  description    = "Allow my-infra OKE Cluster Autoscaler to resize managed node pools."

  statements = [
    "Allow dynamic-group ${oci_identity_dynamic_group.cluster_autoscaler_nodes.name} to manage cluster-node-pools in compartment id ${var.compartment_ocid} where target.cluster.id = '${oci_containerengine_cluster.oke_cluster.id}'",
  ]
}
