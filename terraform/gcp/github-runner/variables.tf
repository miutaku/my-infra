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

variable "github_org" {
  description = "The GitHub organization name to register the runner."
  type        = string
}

variable "github_runner_token" {
  description = "The GitHub Actions runner registration token. Get it from GitHub Org Settings > Actions > Runners > New self-hosted runner."
  type        = string
  sensitive   = true
}

variable "runner_name" {
  description = "The name for the self-hosted runner."
  type        = string
  default     = "gce-runner"
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
  default     = "ubuntu-os-cloud/ubuntu-2404-lts"
}

variable "network_name" {
  description = "The name of the VPC network."
  type        = string
  default     = "github-runner-network"
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
