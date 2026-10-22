locals {
  maintenance_access_token_names = {
    dev-app-server = "host-maintenance-dev-app-server"
    pve-x570       = "host-maintenance-pve-x570"
    pve-b550m      = "host-maintenance-pve-b550m"
    loockit-x570   = "loockit-coordinator-x570"
    loockit-b550m  = "loockit-coordinator-b550m"
  }
}

# Provision and store Client ID/Secret in BSM using scripts/maintenance-access.py.
# Terraform stores only public token metadata, as with home-monitoring.
data "cloudflare_zero_trust_access_service_tokens" "maintenance" {
  for_each   = local.maintenance_access_token_names
  account_id = var.account_id
  name       = each.value

  lifecycle {
    postcondition {
      condition     = length([for token in self.result : token.id if token.name == each.value]) == 1
      error_message = "Run scripts/maintenance-access.py provision before applying Access policies."
    }
  }
}

resource "cloudflare_workers_custom_domain" "maintenance" {
  for_each   = toset(["maintenance", "maintenance-discord"])
  account_id = var.account_id
  zone_id    = var.zone_id
  hostname   = "${each.key}.${var.domain}"
  service    = "home-maintenance-control"
}

resource "cloudflare_zero_trust_access_application" "maintenance_agents" {
  account_id                = var.account_id
  name                      = "host-maintenance-agents-managed-by-tf"
  domain                    = "maintenance.${var.domain}"
  type                      = "self_hosted"
  app_launcher_visible      = false
  options_preflight_bypass  = false
  service_auth_401_redirect = false
  policies = [{
    name       = "host-maintenance-machines-only"
    precedence = 1
    decision   = "non_identity"
    include = [for host in ["dev-app-server", "pve-x570", "pve-b550m"] : {
      service_token = { token_id = one([for token in data.cloudflare_zero_trust_access_service_tokens.maintenance[host].result : token.id if token.name == local.maintenance_access_token_names[host]]) }
    }]
  }]
}
