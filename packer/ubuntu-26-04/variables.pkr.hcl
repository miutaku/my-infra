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
  description = "Path to the Ubuntu ISO in Proxmox storage format (e.g. oci-omv:iso/ubuntu-26.04-live-server-amd64.iso)."
  default     = "oci-omv:iso/ubuntu-26.04-live-server-amd64.iso"
}

variable "template_name" {
  description = "Name of the resulting Proxmox template."
  default     = "template-ubuntu-26-04-home-amd64"
}

variable "vmid" {
  description = "VMID for the Packer build VM. Must not conflict with existing VMs."
  default     = 9001
}

variable "cpu_cores" {
  description = "CPU cores for the build VM."
  default     = 2
}

variable "memory" {
  description = "RAM in MB for the build VM."
  default     = 2048
}

variable "disk_size" {
  description = "Disk size for the template (e.g. 20G)."
  default     = "20G"
}

variable "ssh_password" {
  description = "Temporary SSH password for the packer user during the build. Not used after template creation."
  type        = string
  sensitive   = true
}

variable "ssh_password_hash" {
  description = "SHA-512 hashed form of ssh_password for Ubuntu autoinstall user-data. Generate with: mkpasswd -m sha-512 YOUR_PASSWORD"
  type        = string
  sensitive   = true
}

variable "ssh_public_key" {
  description = "SSH public key set in the template."
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDx2oR3JvoJxlQ8Kjf/Ro7V0KMQrV6FDMwTNWgHb8q+XJ4z4dK/6nf+Q/o0aoSWaOOqHPnDDBVVamK8Yup3Fl+y7lwcc55Sb4YbBuj4SuNbiTsE1n5oszftNy0qZZtq6O62Wn3ezGa1vH/9gx5inpYEjxPUd9veTlv8mpKcBxNs4h0DdCo/eq36teXSu90EY3qX61CI9NOSleuP1MF+vDEw4I7OAvkuvWlttCDRA5cC+AaoXjig20PycwIEoAuCwILE3xucX0hZwUJGfLTBaEdqBggLO+YgbeDyqMruDIRhnPBnWPIl3RIpqTqqSS6Ef70Qao0CO1YtPo+Sk8dB+Tlv miutaku"
}
