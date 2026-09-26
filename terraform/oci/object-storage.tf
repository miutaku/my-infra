data "oci_objectstorage_namespace" "this" {
  compartment_id = var.compartment_ocid
}

resource "oci_objectstorage_bucket" "db_backup" {
  compartment_id = var.compartment_ocid
  namespace      = data.oci_objectstorage_namespace.this.namespace
  name           = "db-backup"
  access_type    = "NoPublicAccess"
  storage_tier   = "Standard"
  versioning     = "Enabled"
  freeform_tags  = local.common_tags

  lifecycle {
    prevent_destroy = true
  }
}

# DB logical dumps are immutable, uniquely named objects. A locked time-bound
# retention rule protects them even if the backup credential is compromised.
resource "oci_objectstorage_bucket" "db_backup_immutable" {
  compartment_id = var.compartment_ocid
  namespace      = data.oci_objectstorage_namespace.this.namespace
  name           = "db-backup-immutable"
  access_type    = "NoPublicAccess"
  storage_tier   = "Standard"
  versioning     = "Disabled"
  freeform_tags  = local.common_tags

  retention_rules {
    display_name = "protect-db-dumps-30-days"
    duration {
      time_amount = 30
      time_unit   = "DAYS"
    }
    # OCI requires at least 14 days between rule creation and irreversible lock.
    time_rule_locked = "2026-10-11T00:00:00Z"
  }

  lifecycle {
    prevent_destroy = true
  }
}

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

resource "oci_objectstorage_object_lifecycle_policy" "db_backup" {
  namespace = data.oci_objectstorage_namespace.this.namespace
  bucket    = oci_objectstorage_bucket.db_backup.name

  depends_on = [oci_identity_policy.objectstorage_lifecycle]

  rules {
    name        = "delete-old-backups"
    action      = "DELETE"
    is_enabled  = true
    time_amount = var.backup_retention_days
    time_unit   = "DAYS"

    object_name_filter {
      inclusion_patterns = ["*.sql.gz", "*.dump"]
    }
  }

  # Versioning protects restic from an accidental or malicious normal delete.
  # Permanently remove only non-current versions after the recovery window.
  rules {
    name        = "delete-previous-versions-after-30-days"
    action      = "DELETE"
    is_enabled  = true
    target      = "previous-object-versions"
    time_amount = 30
    time_unit   = "DAYS"
  }
}

resource "oci_identity_group" "db_backup" {
  compartment_id = var.tenancy_ocid
  name           = "db-backup"
  description    = "Service accounts for database backups"
  freeform_tags  = local.common_tags
}

resource "oci_identity_user" "db_backup" {
  compartment_id = var.tenancy_ocid
  name           = "db-backup-svc"
  description    = "Service account for database backups"
  freeform_tags  = local.common_tags
}

resource "oci_identity_user_group_membership" "db_backup" {
  group_id = oci_identity_group.db_backup.id
  user_id  = oci_identity_user.db_backup.id
}

resource "oci_identity_policy" "db_backup" {
  compartment_id = var.compartment_ocid
  name           = "db-backup-policy"
  description    = "Allow db-backup group to manage objects in db-backup bucket"
  freeform_tags  = local.common_tags

  statements = [
    # Restic/vmbackup may create, overwrite and normally delete current names,
    # but the service credential must never permanently delete an old version.
    "Allow group id ${oci_identity_group.db_backup.id} to manage objects in compartment id ${var.compartment_ocid} where all {target.bucket.name='db-backup', request.operation!='DeleteObjectVersion'}",
    "Allow group id ${oci_identity_group.db_backup.id} to inspect buckets in compartment id ${var.compartment_ocid} where target.bucket.name='db-backup'",
    "Allow group id ${oci_identity_group.db_backup.id} to manage objects in compartment id ${var.compartment_ocid} where all {target.bucket.name='db-backup-immutable', request.operation!='DeleteObject', request.operation!='DeleteObjectVersion'}",
    "Allow group id ${oci_identity_group.db_backup.id} to inspect buckets in compartment id ${var.compartment_ocid} where target.bucket.name='db-backup-immutable'",
  ]
}

# S3互換APIアクセス用キー (secret は作成時のみ取得可能)
resource "oci_identity_customer_secret_key" "db_backup" {
  display_name = "db-backup-s3-key"
  user_id      = oci_identity_user.db_backup.id
}

output "object_storage_namespace" {
  description = "OCI Object Storage namespace (Bitwarden: DB_BACKUP_OCI_NAMESPACE)"
  value       = data.oci_objectstorage_namespace.this.namespace
}

output "db_backup_s3_access_key_id" {
  description = "S3互換 Access Key ID (Bitwarden: DB_BACKUP_OCI_S3_ACCESS_KEY)"
  value       = oci_identity_customer_secret_key.db_backup.id
}

output "db_backup_s3_secret_key" {
  description = "S3互換 Secret Key — 作成時のみ参照可能 (Bitwarden: DB_BACKUP_OCI_S3_SECRET_KEY)"
  value       = oci_identity_customer_secret_key.db_backup.key
  sensitive   = true
}
