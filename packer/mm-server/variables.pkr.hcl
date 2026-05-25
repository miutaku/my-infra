variable "proxmox_url" {
  description = "Proxmox API URL."
  default     = "https://192.168.0.119:8006/api2/json"
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
  default     = "pve-b550m"
}

variable "proxmox_storage_pool" {
  description = "Storage pool for the template disk."
  default     = "local-zfs"
}

variable "clone_template" {
  description = "Source template to clone from."
  default     = "template-ubuntu-26-04-home-amd64"
}

variable "template_name" {
  description = "Name of the resulting Proxmox template."
  default     = "template-mm-server-ubuntu-26-04-amd64"
}

variable "vmid" {
  description = "VMID for the Packer build VM. Must not conflict with existing VMs."
  default     = 9003
}

variable "cpu_cores" {
  description = "CPU cores for the build VM."
  default     = 2
}

variable "memory" {
  description = "RAM in MB (ubuntu-desktop-minimal requires ~2GB minimum)."
  default     = 4096
}

variable "ssh_private_key_file" {
  description = "SSH private key to connect to the cloned VM during provisioning."
  default     = "~/.ssh/id_rsa"
}

# DisplayLinkドライバーのインストール後、Proxmox VGAをnoneに変更する
variable "set_vga_none_after_build" {
  description = "If true, post-processor will set VGA to none via Proxmox API after the template is created."
  default     = true
}
