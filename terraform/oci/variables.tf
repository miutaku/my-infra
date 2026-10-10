variable "tenancy_ocid" {
  description = "The OCID of the tenancy."
  type        = string
}

variable "compartment_ocid" {
  description = "The OCID of the compartment where resources will be created."
  type        = string
}

variable "user_ocid" {
  description = "The OCID of the user for API authentication."
  type        = string
}

variable "fingerprint" {
  description = "The fingerprint of the API key."
  type        = string
}

variable "private_key_base64" {
  description = "The base64-encoded private key for API authentication."
  type        = string
  sensitive   = true
}

variable "ssh_public_key" {
  description = "The SSH public key to use for worker nodes."
  type        = string
  sensitive   = true
}

variable "alert_email" {
  description = "Email address to receive Budget Alert notifications."
  type        = string
}

variable "region" {
  description = "The OCI region where resources will be created."
  default     = "ap-tokyo-1"
}

variable "cluster_name" {
  description = "The name of the OKE cluster."
  default     = "oke-free-cluster"
}

variable "vcn_cidr" {
  description = "The CIDR block for the VCN."
  default     = "10.0.0.0/16"
}

variable "node_pool_shape" {
  description = "The shape for the worker nodes."
  default     = "VM.Standard.A1.Flex"
}

variable "node_pool_ocpus" {
  description = "OCPUs per worker node. 1 node x 2 OCPU = 2 OCPU total for the STG free-tier budget."
  default     = 2
}

variable "node_pool_memory_gbs" {
  description = "Memory GBs per worker node. 1 node x 12 GB = 12 GB total for the STG free-tier budget."
  default     = 12
}

variable "api_management_ipv4_cidrs" {
  description = "Trusted public IPv4 /32 sources for Kubernetes API management: fixed home IPv4 and STG NAT IPv4. Configure identically in both TFC workspaces."
  type        = set(string)
  sensitive   = true

  validation {
    condition = length(var.api_management_ipv4_cidrs) > 0 && alltrue([
      for cidr in var.api_management_ipv4_cidrs : can(cidrnetmask(cidr)) && endswith(cidr, "/32")
    ])
    error_message = "Kubernetes API management sources must be individual IPv4 /32 CIDRs."
  }
}
