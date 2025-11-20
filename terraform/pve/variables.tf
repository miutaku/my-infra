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

variable "prd_rec_server_vm_count" {
  description = "The number of prd recording server virtual machines"
  type        = number
  default     = 1
}

variable "dev_rec_server_vm_count" {
  description = "The number of dev recording server virtual machines"
  type        = number
  default     = 1
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

variable "dev_rec_server_macaddr" {
  description = "The MAC address of the dev recording server virtual machine"
  type        = string
  default     = "52:54:00:23:98:01"
}

variable "prd_rec_server_macaddr" {
  description = "The MAC address of the prd recording server virtual machine"
  type        = string
  default     = "52:54:00:23:99:00"
}

variable "truenas_macaddr" {
  description = "The base MAC address of the truenas virtual machine"
  type        = string
  default     = "52:54:00:24:99:01"
}

variable "proxmox_nodes" {
  description = "A list of Proxmox nodes to distribute VMs across."
  type        = list(string)
#  default     = ["pve-x570"]
  default     = ["pve-x570", "pve-b550m"]
}

variable "stg_reventer_server_macaddr" {
  description = "The MAC address of the stg reventer server virtual machine"
  type        = string
  default     = "52:54:00:25:98:01"
}
