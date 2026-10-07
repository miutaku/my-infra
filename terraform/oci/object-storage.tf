# Shared Object Storage service policy is retained for other buckets.
# Retired db-backup buckets and their dedicated IAM resources were removed
# after the verified IDrive migration on 2026-10-07.
# ライフサイクルポリシーの実行主体は objectstorage サービスプリンシパルのため、
# バケットへの操作権限を tenancy レベルで付与する必要がある
resource "oci_identity_policy" "objectstorage_lifecycle" {
  compartment_id = var.tenancy_ocid
  name           = "objectstorage-lifecycle-policy"
  description    = "Allow Object Storage service principal to manage objects for lifecycle policies"
  freeform_tags  = local.common_tags

  statements = [
    "Allow service objectstorage-${var.region} to manage object-family in compartment id ${var.compartment_ocid}",
  ]
}
