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

locals {
  loockit_android_fingerprint = try(
    cloudflare_client_certificate.loockit_android[0].fingerprint_sha256,
    "CLIENT_CERTIFICATE_NOT_PROVISIONED",
  )
}

resource "cloudflare_ruleset" "loockit_api_firewall" {
  zone_id     = var.zone_id
  name        = "loockit API mTLS and method policy"
  description = "Fail-closed mTLS and single-operation policy for MacroDroid"
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules = [
    {
      ref         = "loockit_api_require_exact_client_certificate"
      description = "Require active Cloudflare client certificate issued to the Android device"
      expression = join("", [
        "(http.host eq \"${local.loockit_api_hostname}\" and ",
        "(not cf.tls_client_auth.cert_verified or ",
        "cf.tls_client_auth.cert_revoked or ",
        "cf.tls_client_auth.cert_fingerprint_sha256 ne \"${local.loockit_android_fingerprint}\"))",
      ])
      action  = "block"
      enabled = true
    },
    {
      ref         = "loockit_api_allow_click_only"
      description = "Expose only the intercom Bot click operation"
      expression = join("", [
        "(http.host eq \"${local.loockit_api_hostname}\" and not ",
        "(http.request.method eq \"POST\" and ",
        "http.request.uri.path eq \"/devices/intercom-bot/click\"))",
      ])
      action  = "block"
      enabled = true
    },
  ]
}

resource "cloudflare_ruleset" "loockit_api_rate_limit" {
  zone_id     = var.zone_id
  name        = "loockit API rate limit"
  description = "Limit intercom click requests at the Cloudflare edge"
  kind        = "zone"
  phase       = "http_ratelimit"

  rules = [{
    ref         = "loockit_api_click_rate_limit"
    description = "Allow at most five click requests per client IP per minute"
    expression  = "(http.host eq \"${local.loockit_api_hostname}\" and http.request.method eq \"POST\" and http.request.uri.path eq \"/devices/intercom-bot/click\")"
    action      = "block"
    enabled     = true
    ratelimit = {
      characteristics     = ["cf.colo.id", "ip.src"]
      period              = 60
      requests_per_period = 5
      mitigation_timeout  = 60
    }
  }]
}

output "loockit_android_client_certificate_pem" {
  description = "Cloudflare-issued client certificate to combine with the locally held private key into a PKCS#12 bundle."
  value       = try(cloudflare_client_certificate.loockit_android[0].certificate, null)
  sensitive   = true
}

output "loockit_android_client_certificate_fingerprint_sha256" {
  value = try(cloudflare_client_certificate.loockit_android[0].fingerprint_sha256, null)
}
