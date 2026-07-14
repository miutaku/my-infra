variable "cloudflare_api_token" {
  description = "Cloudflare API token. Required permissions: Zone:DNS:Edit, Zero Trust:Edit, Zone Settings:Edit, Email Routing Rules:Edit, and Email Routing Addresses:Edit."
  type        = string
  sensitive   = true
}

variable "grafana_email_forward_to" {
  description = "Verified destination mailbox that receives messages sent to my-infra-read@miutaku.work. Cloudflare sends a one-time verification message here."
  type        = string
  sensitive   = true

  validation {
    condition     = can(regex("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", var.grafana_email_forward_to))
    error_message = "grafana_email_forward_to must be a valid email address."
  }
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

variable "zero_trust_team_name" {
  description = "Cloudflare Zero Trust team name used by WARP enrollment. The team domain is <team>.cloudflareaccess.com."
  type        = string
  default     = "miutaku"
}

variable "warp_split_tunnel_include_hosts" {
  description = "Additional domains to include in the default WARP Split Tunnel include profile, such as external IdP hostnames."
  type = map(object({
    host        = string
    description = string
  }))
  default = {}
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
