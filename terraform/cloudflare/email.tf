locals {
  grafana_email_address = "my-infra-read@${var.domain}"
}

# Cloudflare Email Routing is forwarding rather than a hosted mailbox. This
# account-level destination receives the Grafana Labs verification emails.
resource "cloudflare_email_routing_address" "grafana" {
  account_id = var.account_id
  email      = var.grafana_email_forward_to
}

# Enable Email Routing for the zone and let Cloudflare manage the required MX
# and SPF records. Existing conflicting mail-provider MX records must be removed
# before this resource can become ready.
resource "cloudflare_email_routing_dns" "main" {
  zone_id = var.zone_id
  name    = var.domain
}

resource "cloudflare_email_routing_rule" "grafana" {
  zone_id = var.zone_id
  name    = "Forward Grafana kiosk account mail"
  enabled = true

  matchers = [{
    type  = "literal"
    field = "to"
    value = local.grafana_email_address
  }]

  actions = [{
    type  = "forward"
    value = [cloudflare_email_routing_address.grafana.email]
  }]

  depends_on = [cloudflare_email_routing_dns.main]
}

output "grafana_email_address" {
  description = "Email address to use for the Grafana Labs kiosk account."
  value       = local.grafana_email_address
}

output "grafana_email_destination_verified_at" {
  description = "Cloudflare verification timestamp for the forwarding destination; null until verified."
  value       = cloudflare_email_routing_address.grafana.verified
}
