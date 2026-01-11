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

variable "prefix" {
  description = "Prefix for all resource names (e.g., 'reventer')."
  type        = string
}

variable "github_repo" {
  description = "The GitHub repository (owner/repo format, e.g. miutaku/reventer) to register the runner."
  type        = string
}

variable "github_runner_token" {
  description = "The GitHub Actions runner registration token."
  type        = string
  sensitive   = true
}

variable "runner_labels" {
  description = "Comma-separated labels for the runner."
  type        = string
  default     = "gce,linux,x64"
}

variable "runner_version" {
  description = "The GitHub Actions runner version to install."
  type        = string
  default     = "2.321.0"
}

variable "machine_type" {
  description = "The GCE machine type. (free tier)"
  type        = string
  default     = "e2-micro"
}

variable "disk_size_gb" {
  description = "The boot disk size in GB."
  type        = number
  default     = 30
}

variable "boot_image" {
  description = "The boot disk image for the GCE instance."
  type        = string
  default     = "ubuntu-os-cloud/ubuntu-2404-lts-amd64"
}

variable "subnet_cidr" {
  description = "The CIDR range for the subnet."
  type        = string
  default     = "10.0.1.0/24"
}

variable "ssh_allowed_cidr" {
  description = "The CIDR range allowed for SSH access."
  type        = string
  sensitive   = true
}
