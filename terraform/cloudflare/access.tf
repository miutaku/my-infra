resource "cloudflare_zero_trust_access_application" "protected" {
  for_each = local.access_protected_subdomains

  account_id       = var.account_id
  name             = each.key
  domain           = "${each.key}.${var.domain}"
  type             = "self_hosted"
  session_duration = "24h"
}

resource "cloudflare_zero_trust_access_policy" "allow_emails" {
  for_each = cloudflare_zero_trust_access_application.protected

  account_id     = var.account_id
  application_id = each.value.id
  name           = "allow-${each.key}"
  precedence     = 1
  decision       = "allow"

  include {
    email = var.access_allowed_emails
  }
}
