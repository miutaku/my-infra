variable "pm_api_token_id" {
  description = "Proxmox API Token ID"
  type        = string
  sensitive   = true
}

variable "pm_api_token_secret" {
  description = "Proxmox API Token Secret"
  type        = string
  sensitive   = true
}

variable "lb_vm_count" {
    description = "The number of virtual machines"
    type        = number
    default     = 2
}

variable "server_vm_count" {
    description = "The number of virtual machines"
    type        = number
    default     = 3
}

variable "worker_vm_count" {
    description = "The number of virtual machines"
    type        = number
    default     = 2
}

variable "rke2_base_lb_macaddr" {
    description = "The base MAC address of the virtual machines"
    type        = string
    default     = "BC:24:11:AD:44:00"
}

variable "rke2_base_server_macaddr" {
    description = "The base MAC address of the virtual machines"
    type        = string
    default     = "BC:24:11:97:96:00"
}

variable "rke2_base_worker_macaddr" {
    description = "The base MAC address of the virtual machines"
    type        = string
    default     = "BC:24:11:23:32:00"
}

#variable "tuner_vm_name" {
#    description = "The name of the mirakurun virtual machine"
#    type        = string
#    default     = "mirakurun-ubuntu-24-04-home-amd64"
#}