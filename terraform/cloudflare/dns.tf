resource "cloudflare_dns_record" "rke2" {
  for_each = local.rke2_services

  zone_id = var.zone_id
  name    = "${each.key}.${var.domain}"
  content = "${cloudflare_zero_trust_tunnel_cloudflared.rke2.id}.cfargotunnel.com"
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
