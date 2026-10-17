# Token issuance and Client ID/Secret storage in BSM remain manual. This lookup
# manages neither the token lifecycle nor its secret; only app authorization.
data "cloudflare_zero_trust_access_service_tokens" "home_monitoring" {
  account_id = var.account_id
  name       = "home-monitoring"

  lifecycle {
    postcondition {
      condition     = length([for token in self.result : token if token.name == "home-monitoring"]) == 1
      error_message = "Exactly one home-monitoring Service Token must exist. Register its Client ID/Secret in the home monitoring BSM keys."
    }
  }
}

locals {
  # Keep this allowlist aligned with the collector's Access targets. Other
  # applications must not inherit machine access when they are added later.
  home_monitoring_access_subdomains = toset([
    "argocd-home-k8s", "wol", "epgstation", "tnlastation", "tnlastation-staging",
    "nextcloud", "coupon-manager", "unifi", "wifi-ap", "ix2215",
    "nas-01", "nas-02", "pve-x570", "pve-b550m", "nanokvm-1", "nanokvm-2",
  ])
  home_monitoring_service_token_id = try(one([
    for token in data.cloudflare_zero_trust_access_service_tokens.home_monitoring.result : token.id
    if token.name == "home-monitoring"
  ]), null)
}

resource "cloudflare_zero_trust_access_application" "protected" {
  for_each = local.access_protected_subdomains

  account_id       = var.account_id
  name             = "${each.key}-managed-by-tf"
  domain           = "${each.key}.${var.domain}"
  type             = "self_hosted"
  session_duration = "24h"

  policies = concat([{
    # Preserve the existing policy name from before the Argo CD hostname move.
    name       = "allow-${each.key == "argocd-home-k8s" ? "argocd-rke2" : each.key}-managed-by-tf"
    precedence = 1
    decision   = "allow"
    include = [
      for email in var.access_allowed_emails : {
        email = {
          email = email
        }
      }
    ]
    }], contains(local.home_monitoring_access_subdomains, each.key) ? [{
    name       = "home-monitoring-managed-by-tf"
    precedence = 2
    decision   = "non_identity"
    include = [{
      service_token = {
        token_id = local.home_monitoring_service_token_id
      }
    }]
  }] : [])

  # Policies are authoritative here, including both human and machine access.
  lifecycle {
    precondition {
      condition     = length(setsubtract(local.home_monitoring_access_subdomains, setintersection(local.access_protected_subdomains, toset(keys(local.home_k8s_services))))) == 0
      error_message = "Monitoring access must be restricted to Access-protected home services."
    }
  }
}
