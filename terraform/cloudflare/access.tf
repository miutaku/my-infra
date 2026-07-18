resource "cloudflare_zero_trust_access_application" "protected" {
  for_each = local.access_protected_subdomains

  account_id       = var.account_id
  name             = "${each.key}-managed-by-tf"
  domain           = "${each.key}.${var.domain}"
  type             = "self_hosted"
  session_duration = "24h"

  policies = [{
    name       = "allow-${each.key}-managed-by-tf"
    precedence = 1
    decision   = "allow"
    include = [
      for email in var.access_allowed_emails : {
        email = {
          email = email
        }
      }
    ]
  }]
}
