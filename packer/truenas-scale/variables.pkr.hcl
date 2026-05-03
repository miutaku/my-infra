variable "proxmox_url" {
  description = "Proxmox API URL."
  default     = "https://192.168.0.115:8006/api2/json"
}

variable "proxmox_token_id" {
  description = "Proxmox API token ID (e.g. packer@pve!packer)."
  type        = string
}

variable "proxmox_token_secret" {
  description = "Proxmox API token secret."
  type        = string
  sensitive   = true
}

variable "proxmox_node" {
  description = "Proxmox node to run the Packer build on."
  default     = "pve-x570"
}

variable "proxmox_storage_pool" {
  description = "Storage pool for the template disk."
  default     = "local-zfs"
}

variable "iso_file" {
  description = "Path to the TrueNAS Scale ISO in Proxmox storage format (e.g. local:iso/TrueNAS-SCALE-25.10.3.iso)."
  default     = "local:iso/TrueNAS-SCALE-25.10.3.iso"
}

variable "template_name" {
  description = "Name of the resulting Proxmox template."
  default     = "template-nas-truenas-scale-home-amd64"
}

variable "vmid" {
  description = "VMID for the Packer build VM. Must not conflict with existing VMs."
  default     = 9002
}

variable "cpu_cores" {
  description = "CPU cores for the build VM. Matches truenas module in terraform/pve."
  default     = 4
}

variable "memory" {
  description = "RAM in MB for the build VM. Matches truenas module in terraform/pve."
  default     = 8192
}

variable "disk_size" {
  description = "OS disk size. Matches truenas module in terraform/pve."
  default     = "24G"
}

variable "admin_password" {
  description = "TrueNAS admin account password set during installation."
  type        = string
  sensitive   = true
}
