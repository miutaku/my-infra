variable "target_node" {
  description = "The Proxmox node to target."
  type        = string
}

variable "hostname" {
  description = "The hostname of the container."
  type        = string
}

variable "ostemplate" {
  description = "The LXC template to use."
  type        = string
}

variable "password" {
  description = "The root password for the container."
  type        = string
  sensitive   = true
}

variable "unprivileged" {
  description = "Whether to create an unprivileged container."
  type        = bool
  default     = true
}

variable "cores" {
  description = "The number of CPU cores."
  type        = number
  default     = 1
}

variable "memory" {
  description = "The amount of RAM in MB."
  type        = number
  default     = 512
}

variable "swap" {
  description = "The amount of swap in MB."
  type        = number
  default     = 512
}

variable "rootfs_storage" {
  description = "The storage for the root filesystem."
  type        = string
}

variable "rootfs_size" {
  description = "The size of the root filesystem."
  type        = string
}

variable "network_name" {
  description = "The name of the network interface."
  type        = string
  default     = "eth0"
}

variable "network_bridge" {
  description = "The network bridge to use."
  type        = string
}

variable "network_ip" {
  description = "The IP address of the container."
  type        = string
  default     = "dhcp"
}

variable "onboot" {
  description = "Whether to start the container on boot."
  type        = bool
  default     = true
}
