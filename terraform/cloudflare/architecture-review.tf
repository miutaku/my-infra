# Separate from infrastructure administrator SSO: this report is for one reviewer.
resource "cloudflare_zero_trust_access_application" "architecture_review" {
  account_id                = var.account_id
  name                      = "ReVenter architecture PR review"
  domain                    = "architecture-review.${var.domain}"
  type                      = "self_hosted"
  session_duration          = "24h"
  allowed_idps              = ["168a9fe5-118c-47e5-9b5a-43493b880190"]
  auto_redirect_to_identity = true
  policies = [{
    name       = "Architecture reviewer email code"
    precedence = 1
    decision   = "allow"
    include    = [{ email = { email = "mtakumi.0925@gmail.com" } }]
  }]
}
