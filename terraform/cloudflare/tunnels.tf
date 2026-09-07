resource "cloudflare_zero_trust_tunnel_cloudflared" "home_k8s" {
  account_id    = var.account_id
  name          = "home-k8s-managed-by-tf"
  tunnel_secret = var.tunnel_secret_home_k8s
}

resource "cloudflare_zero_trust_tunnel_cloudflared_config" "home_k8s" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.home_k8s.id

  config = {
    ingress = concat(
      [
        for hostname, service in local.home_k8s_services : {
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

resource "cloudflare_zero_trust_tunnel_cloudflared_route" "home_k8s_private" {
  for_each = local.home_k8s_private_routes

  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.home_k8s.id
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

data "cloudflare_zero_trust_tunnel_cloudflared_token" "home_k8s" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.home_k8s.id
}

data "cloudflare_zero_trust_tunnel_cloudflared_token" "oke" {
  account_id = var.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.oke.id
}

output "home_k8s_tunnel_token" {
  value     = data.cloudflare_zero_trust_tunnel_cloudflared_token.home_k8s.token
  sensitive = true
}

output "oke_tunnel_token" {
  value     = data.cloudflare_zero_trust_tunnel_cloudflared_token.oke.token
  sensitive = true
}
