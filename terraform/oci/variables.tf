
variable "tenancy_ocid" {
  description = "The OCID of the tenancy."
  default     = "ocid1.tenancy.oc1..aaaaaaaaiplrci236xnoyraexbkwtbhx7k75wuvx32yuqruai2q4i6jouebq"
}

variable "compartment_ocid" {
  description = "The OCID of the compartment where resources will be created."
  default     = "ocid1.tenancy.oc1..aaaaaaaaiplrci236xnoyraexbkwtbhx7k75wuvx32yuqruai2q4i6jouebq"
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
