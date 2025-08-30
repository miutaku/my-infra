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
  description = "The SSH public key to use for the bastion and worker nodes."
  type        = string
  sensitive   = true
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
  description = "The total number of OCPUs for each worker node."
  default     = 4
}

variable "node_pool_memory_gbs" {
  description = "The total amount of memory in GBs for each worker node."
  default     = 24
}