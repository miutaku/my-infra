variable "proxmox_endpoint" {
  description = "Proxmox API endpoint. Authentication is read from proxmox_api_token."
  type        = string
  default     = "https://192.168.0.115:8006/"
}

variable "proxmox_api_token" {
  description = "Proxmox API token in user@realm!token=secret form. Set with TF_VAR_proxmox_api_token; never store it in tfvars."
  type        = string
  sensitive   = true
}

variable "talos_version" {
  description = "Pinned Talos release used by the PoC ISO and machine configuration."
  type        = string
  default     = "v1.13.9"

  validation {
    condition     = can(regex("^v1\\.13\\.[0-9]+$", var.talos_version))
    error_message = "talos_version must be a stable v1.13.x release."
  }
}

variable "schematic_id" {
  description = "Talos Image Factory schematic. The vanilla schematic avoids leaving a custom PoC schematic behind."
  type        = string
  default     = "376567988ad370138ad8b2698212367b8edcb69b5fd68c80be1f2ec7d603b4ba"

  validation {
    condition     = can(regex("^[0-9a-f]{64}$", var.schematic_id))
    error_message = "schematic_id must be a 64-character lowercase hex digest."
  }
}

variable "start_vms" {
  description = "Start PoC VMs. Keep false until Gate 0 and DHCP reservations are applied."
  type        = bool
  default     = false
}

variable "boot_from_iso" {
  description = "Boot from the Talos ISO for initial install. Set false after Talos is installed to prefer scsi0."
  type        = bool
  default     = true
}
