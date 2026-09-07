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

variable "load_balancer_vm_count" {
  description = "The number of virtual machines"
  type        = number
  default     = 2
}

variable "load_balancer_base_macaddr" {
  description = "The base MAC address of the virtual machines"
  type        = string
  default     = "BC:24:11:AD:44:00"
}

variable "truenas_macaddr" {
  description = "The base MAC address of the truenas virtual machine"
  type        = string
  default     = "52:54:00:24:99:01"
}

variable "proxmox_nodes" {
  description = "A list of Proxmox nodes to distribute VMs across."
  type        = list(string)
  default     = ["pve-x570", "pve-b550m"]
}

variable "dev_application_server_vm_count" {
  description = "The number of dev application server virtual machines"
  type        = number
  default     = 1
}

variable "dev_application_server_macaddr" {
  description = "The MAC address of the dev application server virtual machine"
  type        = string
  default     = "52:54:00:25:01:01"
}

variable "displaylink_kiosk_vm_count" {
  description = "The number of DisplayLink kiosk virtual machines"
  type        = number
  default     = 1
}

variable "displaylink_kiosk_macaddr" {
  description = "The base MAC address of the DisplayLink kiosk virtual machine"
  type        = string
  default     = "52:54:00:99:00:01"
}

variable "displaylink_kiosk_ips" {
  description = "DisplayLink kiosk VM IP addresses (must match the DHCP static leases)"
  type        = list(string)
  default     = ["192.168.40.110"]

  validation {
    condition     = length(var.displaylink_kiosk_ips) == var.displaylink_kiosk_vm_count
    error_message = "displaylink_kiosk_ips must contain exactly displaylink_kiosk_vm_count addresses."
  }
}

variable "unifi_os_server_macaddr" {
  description = "The MAC address of the dedicated UniFi OS Server VM (untagged main LAN)"
  type        = string
  default     = "BC:24:11:10:20:01"
}

variable "pbs_macaddr" {
  description = "Proxmox Backup Server VM の MAC アドレス (VLAN 20, DHCP 静的リースと一致させること)"
  type        = string
  default     = "BC:24:11:B5:00:01"
}
