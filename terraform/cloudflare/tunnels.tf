resource "cloudflare_zero_trust_tunnel_cloudflared" "rke2" {
  account_id    = var.account_id
  name          = "rke2-home-managed-by-tf"
  tunnel_secret = var.tunnel_secret_rke2
}

resource "cloudflare_zero_trust_tunnel_cloudflared_config" "rke2" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.rke2.id

  config = {
    ingress = concat(
      [
        for hostname, service in local.rke2_services : {
          hostname = "${hostname}.${var.domain}"
          service  = service.backend
          origin_request = {
            no_tls_verify = service.no_tls_verify
          }
        }
      ],
      [
        {
          service = "http_status:404"
        }
      ],
    )
  }
}

resource "cloudflare_zero_trust_tunnel_cloudflared_route" "rke2_private" {
  for_each = local.rke2_private_routes

  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.rke2.id
  network    = each.value.network
  comment    = each.value.comment
}

resource "cloudflare_zero_trust_tunnel_cloudflared" "oke" {
  account_id    = var.account_id
  name          = "oke-cloud-managed-by-tf"
  tunnel_secret = var.tunnel_secret_oke
}

resource "cloudflare_zero_trust_tunnel_cloudflared_config" "oke" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.oke.id

  config = {
    ingress = concat(
      [
        for hostname, service in local.oke_services : {
          hostname = "${hostname}.${var.domain}"
          service  = service.backend
          origin_request = {
            no_tls_verify = service.no_tls_verify
          }
        }
      ],
      [
        {
          service = "http_status:404"
        }
      ],
    )
  }
}

data "cloudflare_zero_trust_tunnel_cloudflared_token" "rke2" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.rke2.id
}

data "cloudflare_zero_trust_tunnel_cloudflared_token" "oke" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.oke.id
}

output "rke2_tunnel_token" {
  value     = data.cloudflare_zero_trust_tunnel_cloudflared_token.rke2.token
  sensitive = true
}

output "oke_tunnel_token" {
  value     = data.cloudflare_zero_trust_tunnel_cloudflared_token.oke.token
  sensitive = true
}
