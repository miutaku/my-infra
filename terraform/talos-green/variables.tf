variable "proxmox_endpoint" {
  description = "Proxmox API endpoint."
  type        = string
  default     = "https://192.168.0.115:8006/"
}

variable "proxmox_api_token" {
  description = "Proxmox API token in user@realm!token=secret form. Supply through TF_VAR_proxmox_api_token."
  type        = string
  sensitive   = true
}

variable "talos_version" {
  description = "Pinned Talos release used by the ISO and installer."
  type        = string
  default     = "v1.13.9"

  validation {
    condition     = can(regex("^v1\\.13\\.[0-9]+$", var.talos_version))
    error_message = "talos_version must be a stable v1.13.x release."
  }
}

variable "schematic_id" {
  description = "Pinned Talos Image Factory schematic."
  type        = string
  default     = "376567988ad370138ad8b2698212367b8edcb69b5fd68c80be1f2ec7d603b4ba"
}

variable "start_vms" {
  description = "Start Green VMs only after DHCP reservations and the live plan pass."
  type        = bool
  default     = false
}

variable "boot_from_iso" {
  description = "Prefer ISO only for first installation/reset."
  type        = bool
  default     = true
}

variable "protect_vms" {
  description = "Enable Proxmox deletion protection after production bootstrap."
  type        = bool
  default     = true
}
