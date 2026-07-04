resource "cloudflare_zero_trust_device_profiles" "default_warp" {
  account_id  = var.account_id
  name        = "default-warp-managed-by-tf"
  description = "Default WARP client profile for home private routes, managed by Terraform."
  default     = true

  service_mode_v2_mode = "warp"
  tunnel_protocol      = "wireguard"

  allow_mode_switch = false
  allow_updates     = true
  allowed_to_leave  = true
  captive_portal    = 180
  switch_locked     = false
}

resource "cloudflare_zero_trust_split_tunnel" "default_warp_include" {
  account_id = var.account_id
  policy_id  = cloudflare_zero_trust_device_profiles.default_warp.id
  mode       = "include"

  dynamic "tunnels" {
    for_each = {
      for idx, route in local.warp_split_tunnel_includes : idx => route
    }
    content {
      address     = tunnels.value.address
      host        = tunnels.value.host
      description = tunnels.value.description
    }
  }
}

resource "cloudflare_zero_trust_local_fallback_domain" "default_warp" {
  account_id = var.account_id
  policy_id  = cloudflare_zero_trust_device_profiles.default_warp.id

  dynamic "domains" {
    for_each = local.warp_local_fallback_domains
    content {
      suffix      = domains.value.suffix
      dns_server  = domains.value.dns_servers
      description = domains.value.description
    }
  }
}

resource "cloudflare_zero_trust_gateway_settings" "account" {
  account_id = var.account_id

  protocol_detection_enabled = true
  tls_decrypt_enabled        = false

  proxy {
    tcp              = true
    udp              = true
    root_ca          = false
    virtual_ip       = false
    disable_for_time = 0
  }
}
