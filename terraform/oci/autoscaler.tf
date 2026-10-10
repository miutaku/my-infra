# Shared tag definitions remain after legacy root-worker IAM retirement.
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
