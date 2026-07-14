# Enable Email Routing for the zone and let Cloudflare manage the required MX
# and SPF records. Existing conflicting mail-provider MX records must be removed
# before this resource can become ready.
resource "cloudflare_email_routing_dns" "main" {
  zone_id = var.zone_id
}
