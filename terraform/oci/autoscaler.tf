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

  # Preserve approved live permissions while the legacy workers are in use.
  # Remove this legacy policy after the dedicated-compartment migration.
  statements = [
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to read cluster-node-pools in tenancy",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to manage cluster-node-pools in tenancy where all {target.nodepool.id = 'ocid1.nodepool.oc1.ap-tokyo-1.aaaaaaaa45asmqnfxl46xn2owabqbqfyy74zddkbvpvlt7g66ncqvqdcixnq', any {request.operation = 'UpdateNodePool', request.operation = 'DeleteNode'}}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to manage instance-family in tenancy where any {request.operation = 'UpdateNodePool', request.operation = 'DeleteNode'}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to use subnets in tenancy where any {request.operation = 'UpdateNodePool', request.operation = 'DeleteNode'}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to read virtual-network-family in tenancy where any {request.operation = 'UpdateNodePool', request.operation = 'DeleteNode'}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to use vnics in tenancy where any {request.operation = 'UpdateNodePool', request.operation = 'DeleteNode'}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to inspect compartments in tenancy where any {request.operation = 'UpdateNodePool', request.operation = 'DeleteNode'}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to use tag-namespaces in tenancy where all {target.tag-namespace.name = 'oke', any {request.operation = 'UpdateNodePool', request.operation = 'DeleteNode'}}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to read instance-family in tenancy where any {request.operation = 'ListShapes', request.operation = 'ListInstances', request.operation = 'GetInstance', request.operation = 'GetImage'}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to read virtual-network-family in tenancy where any {request.operation = 'GetSubnet', request.operation = 'GetVcn', request.operation = 'GetVnic'}",
    "Allow dynamic-group id ocid1.dynamicgroup.oc1..aaaaaaaaocfp7bj6pwlg4tuaklxpao54fapra5xxskfmuwjpzcep6cf2czaq to inspect compartments in tenancy where any {request.operation = 'GetCompartment', request.operation = 'ListCompartments'}"
  ]
}
