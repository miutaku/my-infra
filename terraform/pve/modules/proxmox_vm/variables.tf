variable "vm_count" {
  description = "Number of VMs to create"
  type        = number
}

variable "name_prefix" {
  description = "Prefix for the VM name"
  type        = string
}

variable "name_suffix" {
  description = "Suffix for the VM name"
  type        = string
}

variable "base_macaddr" {
  description = "Base MAC address. Last octet is replaced by sequential index (01, 02, ...). Ignored when macaddrs_override is set."
  type        = string
  default     = "BC:24:11:00:00:00"
}

variable "macaddrs_override" {
  description = "Explicit MAC address list. When set, bypasses base_macaddr calculation. Must have exactly vm_count elements."
  type        = list(string)
  default     = null
}

variable "vmid_start" {
  description = "Starting VM ID"
  type        = number
}

variable "tags" {
  description = "Tags for the VM"
  type        = list(string)
}

variable "cpu_cores" {
  description = "Number of CPU cores"
  type        = number
}

variable "memory" {
  description = "Memory in MB"
  type        = number
}

variable "kvm_vga_type" {
  description = "KVM VGA type (std, virtio, none, etc.)"
  type        = string
  default     = "std"
}

variable "kvm_vga_memory" {
  description = "KVM VRAM size (MiB)"
  type        = number
  default     = 16
}

variable "proxmox_nodes" {
  description = "List of Proxmox nodes to distribute VMs across"
  type        = list(string)
}

variable "clone_template" {
  description = "The template to clone for the VM"
  type        = string
  default     = "template-ubuntu-26-04-home-amd64"
}

variable "bios" {
  description = "BIOS type: seabios or ovmf (UEFI)"
  type        = string
  default     = "seabios"
}

variable "efi_storage_pool" {
  description = "Storage pool for the EFI disk. Required when bios=ovmf. null = no EFI disk."
  type        = string
  default     = null
}

variable "machine" {
  description = "Machine type (e.g., i440fx or q35). null = Proxmox default."
  type        = string
  default     = null
}

variable "os_type" {
  description = "The OS type for the VM."
  type        = string
  default     = "l26"
}

variable "disk_size" {
  description = "The size of the primary disk in GB."
  type        = number
  default     = 32
}

variable "data_disk_size" {
  description = "Size of an optional secondary data disk in GB. null = no secondary disk."
  type        = number
  default     = null
}

variable "data_disk_storage" {
  description = "Storage pool for the secondary data disk."
  type        = string
  default     = "local-zfs"
}

variable "vlan_tag" {
  description = "VLAN tag for the primary network interface. null = untagged."
  type        = number
  default     = null
}

variable "pcis" {
  description = "A map of PCI devices to pass through to the VM."
  type        = any
  default     = null
}

variable "usbs" {
  description = "A map of USB devices to pass through to the VM."
  type        = any
  default     = null
}
