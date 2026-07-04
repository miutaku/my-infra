resource "cloudflare_zero_trust_tunnel_cloudflared" "rke2" {
  account_id = var.account_id
  name       = "rke2-home-managed-by-tf"
  secret     = var.tunnel_secret_rke2
}

resource "cloudflare_zero_trust_tunnel_cloudflared_config" "rke2" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.rke2.id

  config {
    dynamic "ingress_rule" {
      for_each = local.rke2_services
      content {
        hostname = "${ingress_rule.key}.${var.domain}"
        service  = ingress_rule.value.backend
        origin_request {
          no_tls_verify = ingress_rule.value.no_tls_verify
        }
      }
    }
    # Catch-all rule — must be last
    ingress_rule {
      service = "http_status:404"
    }
  }
}

resource "cloudflare_zero_trust_tunnel_route" "rke2_private" {
  for_each = local.rke2_private_routes

  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.rke2.id
  network    = each.value.network
  comment    = each.value.comment
}

resource "cloudflare_zero_trust_tunnel_cloudflared" "oke" {
  account_id = var.account_id
  name       = "oke-cloud-managed-by-tf"
  secret     = var.tunnel_secret_oke
}

resource "cloudflare_zero_trust_tunnel_cloudflared_config" "oke" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.oke.id

  config {
    dynamic "ingress_rule" {
      for_each = local.oke_services
      content {
        hostname = "${ingress_rule.key}.${var.domain}"
        service  = ingress_rule.value.backend
        origin_request {
          no_tls_verify = ingress_rule.value.no_tls_verify
        }
      }
    }
    ingress_rule {
      service = "http_status:404"
    }
  }
}

output "rke2_tunnel_token" {
  value     = cloudflare_zero_trust_tunnel_cloudflared.rke2.tunnel_token
  sensitive = true
}

output "oke_tunnel_token" {
  value     = cloudflare_zero_trust_tunnel_cloudflared.oke.tunnel_token
  sensitive = true
}
