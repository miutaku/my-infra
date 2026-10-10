variable "environment" {
  type = string
  validation {
    condition     = contains(["stg", "prd"], var.environment)
    error_message = "environment must be stg or prd."
  }
}
variable "tenancy_ocid" { type = string }
variable "cluster_id" { type = string }
variable "vcn_id" { type = string }
variable "vcn_cidr" { type = string }
variable "vcn_dns_domain" { type = string }
variable "shared_network_compartment_id" { type = string }
variable "nat_gateway_id" { type = string }
variable "service_gateway_id" { type = string }
variable "service_cidr" { type = string }
variable "worker_subnet_cidr" {
  type        = string
  description = "Candidate 10.0.2.0/24; must check overlap before applying."
}
variable "availability_domains" {
  type = set(string)
  validation {
    condition     = length(var.availability_domains) > 0
    error_message = "At least one availability domain is required."
  }
}
variable "image_id" {
  type        = string
  description = "Verified aarch64 OKE image matching kubernetes_version."
}
variable "kubernetes_version" {
  type    = string
  default = "v1.36.4"
}
variable "ssh_public_key" {
  type    = string
  default = ""
}

variable "additional_reviewed_statements" {
  type        = list(string)
  default     = []
  description = "Only add individually reviewed cross-compartment exceptions after STG verification."
}
