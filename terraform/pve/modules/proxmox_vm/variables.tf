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
  description = "Base MAC address for the VMs"
  type        = string
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

variable "proxmox_nodes" {
  description = "List of Proxmox nodes to distribute VMs across"
  type        = list(string)
}

variable "clone_template" {
  description = "The template to clone for the VM"
  type        = string
  default     = "template-ubuntu-24-04-home-amd64"
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

variable "disk_size" {
  description = "The size of the primary disk in GB."
  type        = number
  default     = 32
}

variable "machine" {
  description = "The machine type (e.g., i440fx or q35)."
  type        = string
  default     = null
}
