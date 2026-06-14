# Cluster Autoscaler runs on OKE worker nodes and uses OCI Instance Principals
# to resize tagged node pools. Keep this scoped to the OKE compartment.
resource "oci_identity_tag_namespace" "oke" {
  compartment_id = var.tenancy_ocid
  name           = "oke"
  description    = "Tag namespace for OKE autoscaler eligibility."
  is_retired     = false
}

resource "oci_identity_tag" "autoscaler" {
  tag_namespace_id = oci_identity_tag_namespace.oke.id
  name             = "autoscaler"
  description      = "Marks OKE instances eligible for Cluster Autoscaler."
  is_retired       = false
}

resource "oci_identity_dynamic_group" "cluster_autoscaler_nodes" {
  compartment_id = var.tenancy_ocid
  name           = "my-infra-oke-cluster-autoscaler-nodes"
  description    = "OKE worker instances allowed to resize node pools for my-infra Cluster Autoscaler."
  matching_rule  = "ALL {instance.compartment.id='${var.compartment_ocid}', tag.${oci_identity_tag_namespace.oke.name}.${oci_identity_tag.autoscaler.name}.value='cluster'}"
}

resource "oci_identity_policy" "cluster_autoscaler" {
  compartment_id = var.tenancy_ocid
  name           = "my-infra-oke-cluster-autoscaler"
  description    = "Allow my-infra OKE Cluster Autoscaler to resize managed node pools."

  statements = [
    "Allow dynamic-group ${oci_identity_dynamic_group.cluster_autoscaler_nodes.name} to manage cluster-node-pools in compartment id ${var.compartment_ocid} where target.cluster.id = '${oci_containerengine_cluster.oke_cluster.id}'",
  ]
}
