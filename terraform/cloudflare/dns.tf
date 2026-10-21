resource "cloudflare_dns_record" "home_k8s" {
  for_each   = local.home_k8s_services
  depends_on = [cloudflare_zero_trust_access_application.architecture_review]

  zone_id = var.zone_id
  name    = "${each.key}.${var.domain}"
  content = "${each.key == "loockit-api" && var.loockit_independent_tunnel_enabled ? cloudflare_zero_trust_tunnel_cloudflared.loockit.id : cloudflare_zero_trust_tunnel_cloudflared.home_k8s.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "oke" {
  for_each = local.oke_services

  zone_id = var.zone_id
  name    = "${each.key}.${var.domain}"
  content = "${cloudflare_zero_trust_tunnel_cloudflared.oke.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}
