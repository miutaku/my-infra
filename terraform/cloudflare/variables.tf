variable "cloudflare_api_token" {
  description = "Cloudflare API token. Required permissions: Zone:DNS:Edit, Access:Apps:Edit, Argo Tunnel:Edit."
  type        = string
  sensitive   = true
}

variable "account_id" {
  description = "Cloudflare Account ID (found in the right sidebar of the Cloudflare dashboard)."
  type        = string
}

variable "zone_id" {
  description = "Cloudflare Zone ID for the managed domain."
  type        = string
}

variable "domain" {
  description = "Root domain managed in Cloudflare (e.g. example.com). Used to construct FQDNs for DNS records and Access Applications."
  type        = string
}

variable "tunnel_secret_rke2" {
  description = "Base64-encoded 32-byte secret for the RKE2 (home) tunnel. Generate with: openssl rand -base64 32"
  type        = string
  sensitive   = true
}

variable "tunnel_secret_oke" {
  description = "Base64-encoded 32-byte secret for the OKE (cloud) tunnel. Generate with: openssl rand -base64 32"
  type        = string
  sensitive   = true
}

variable "access_allowed_emails" {
  description = "List of email addresses allowed through Cloudflare Access for protected services."
  type        = list(string)
}
