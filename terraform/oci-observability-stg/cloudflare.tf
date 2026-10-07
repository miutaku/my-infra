variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}
variable "cloudflare_account_id" { type = string }
variable "cloudflare_zone_id" { type = string }
provider "cloudflare" { api_token = var.cloudflare_api_token }

locals {
  replicas = { "01" = "01", "02" = "02" }
  endpoints = merge(
    { for id in keys(local.replicas) : "metrics-${id}" => { replica = id, hostname = "metrics-stg-ha-${id}.re-venter.com" } },
    { for id in keys(local.replicas) : "logs-${id}" => { replica = id, hostname = "logs-stg-ha-${id}.re-venter.com" } }
  )
}

resource "cloudflare_zero_trust_tunnel_cloudflared" "monitoring" {
  for_each   = local.replicas
  account_id = var.cloudflare_account_id
  name       = "reventer-observability-stg-${each.key}"
  config_src = "cloudflare"
}

resource "cloudflare_zero_trust_tunnel_cloudflared_config" "monitoring" {
  for_each   = local.replicas
  account_id = var.cloudflare_account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.monitoring[each.key].id
  config = {
    ingress = [
      {
        hostname = "metrics-stg-ha-${each.key}.re-venter.com"
        path     = "^/(api/v1/(write|query|query_range|labels|label/[^/]+/values|series|metadata|status/(buildinfo|tsdb)|format_query)|health|metrics)$"
        service  = "http://127.0.0.1:18428"
      },
      {
        hostname = "logs-stg-ha-${each.key}.re-venter.com"
        path     = "^/(insert/(native|loki/api/v1/push)|select/.*|health|metrics)$"
        service  = "http://127.0.0.1:19428"
      },
      { service = "http_status:404" }
    ]
  }
}

data "cloudflare_zero_trust_tunnel_cloudflared_token" "monitoring" {
  for_each   = local.replicas
  account_id = var.cloudflare_account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.monitoring[each.key].id
}

resource "cloudflare_zero_trust_access_service_token" "monitoring" {
  account_id = var.cloudflare_account_id
  name       = "reventer-observability-stg-collectors"
  duration   = "8760h"
}

resource "cloudflare_zero_trust_access_application" "monitoring" {
  for_each   = local.endpoints
  account_id = var.cloudflare_account_id
  name       = "reventer-observability-stg-${each.key}"
  domain     = each.value.hostname
  type       = "self_hosted"
  policies = [{
    decision = "non_identity"
    include = [{
      service_token = { token_id = cloudflare_zero_trust_access_service_token.monitoring.id }
    }]
  }]
}

resource "cloudflare_dns_record" "monitoring" {
  for_each = local.endpoints
  zone_id  = var.cloudflare_zone_id
  name     = each.value.hostname
  type     = "CNAME"
  content  = "${cloudflare_zero_trust_tunnel_cloudflared.monitoring[each.value.replica].id}.cfargotunnel.com"
  proxied  = true
  ttl      = 1
  # Authenticate endpoints before making them discoverable through DNS.
  depends_on = [cloudflare_zero_trust_access_application.monitoring]
}

output "monitoring_credentials" {
  sensitive = true
  value = {
    client_id     = cloudflare_zero_trust_access_service_token.monitoring.client_id
    client_secret = cloudflare_zero_trust_access_service_token.monitoring.client_secret
    tunnel_tokens = { for id, token in data.cloudflare_zero_trust_tunnel_cloudflared_token.monitoring : id => token.token }
  }
}
