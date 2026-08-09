resource "cloudflare_client_certificate" "loockit_android" {
  count = var.loockit_android_client_csr == "" ? 0 : 1

  zone_id       = var.zone_id
  csr           = var.loockit_android_client_csr
  validity_days = 365
}

resource "cloudflare_certificate_authorities_hostname_associations" "loockit_api" {
  zone_id   = var.zone_id
  hostnames = [local.loockit_api_hostname]
}

resource "terraform_data" "loockit_api_edge_rules" {
  triggers_replace = [
    local.loockit_api_hostname,
    local.loockit_android_fingerprint,
    filesha256("${path.module}/scripts/upsert-loockit-api-rules.sh"),
  ]

  provisioner "local-exec" {
    command = "${path.module}/scripts/upsert-loockit-api-rules.sh '${local.loockit_api_hostname}' '${local.loockit_android_fingerprint}'"
    environment = {
      CLOUDFLARE_API_TOKEN = var.cloudflare_api_token
      CLOUDFLARE_ZONE_ID   = var.zone_id
    }
  }

  depends_on = [
    cloudflare_client_certificate.loockit_android,
    cloudflare_certificate_authorities_hostname_associations.loockit_api,
  ]
}

locals {
  loockit_android_fingerprint = try(
    cloudflare_client_certificate.loockit_android[0].fingerprint_sha256,
    "CLIENT_CERTIFICATE_NOT_PROVISIONED",
  )
}

output "loockit_android_client_certificate_pem" {
  description = "Cloudflare-issued client certificate to combine with the locally held private key into a PKCS#12 bundle."
  value       = try(cloudflare_client_certificate.loockit_android[0].certificate, null)
  sensitive   = true
}

output "loockit_android_client_certificate_fingerprint_sha256" {
  value = try(cloudflare_client_certificate.loockit_android[0].fingerprint_sha256, null)
}
