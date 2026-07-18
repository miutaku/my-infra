# Device enrollment permissions: without an Access application of type
# "warp", the WARP client login page fails with "Enrollment request is
# invalid" because no policy exists to authorize device enrollment.
resource "cloudflare_zero_trust_access_application" "warp_enrollment" {
  account_id = var.account_id
  name       = "Device enrollment permissions-managed-by-tf"
  type       = "warp"

  policies = [{
    name       = "allow-warp-enrollment-managed-by-tf"
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

resource "cloudflare_zero_trust_device_default_profile" "default_warp" {
  account_id = var.account_id

  service_mode_v2 = {
    mode = "warp"
  }
  tunnel_protocol = "wireguard"

  include = local.warp_split_tunnel_includes

  allow_mode_switch = false
  allow_updates     = true
  allowed_to_leave  = true
  captive_portal    = 180
  switch_locked     = false
}

resource "cloudflare_zero_trust_device_default_profile_local_domain_fallback" "default_warp" {
  account_id = var.account_id

  domains = [
    for _, domain in local.warp_local_fallback_domains : {
      suffix      = domain.suffix
      dns_server  = domain.dns_servers
      description = domain.description
    }
  ]
}

resource "cloudflare_zero_trust_gateway_settings" "account" {
  account_id = var.account_id

  settings = {
    protocol_detection = {
      enabled = true
    }
    tls_decrypt = {
      enabled = false
    }
  }
}

resource "cloudflare_zero_trust_device_settings" "account" {
  account_id = var.account_id

  gateway_proxy_enabled                 = true
  gateway_udp_proxy_enabled             = true
  root_certificate_installation_enabled = false
  use_zt_virtual_ip                     = false
  disable_for_time                      = 0
}
