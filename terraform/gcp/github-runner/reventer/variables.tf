variable "project_id" {
  description = "The GCP project ID."
  type        = string
}

variable "region" {
  description = "The GCP region for resources."
  type        = string
  default     = "us-west1"
}

variable "zone" {
  description = "The GCP zone for the GCE instance."
  type        = string
  default     = "us-west1-b"
}

variable "github_runner_token" {
  description = "The GitHub Actions runner registration token for reventer repo."
  type        = string
  sensitive   = true
}

variable "ssh_allowed_cidr" {
  description = "The CIDR range allowed for SSH access."
  type        = string
  sensitive   = true
}
