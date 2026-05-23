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

variable "rke2_dvb_worker_macaddr" {
  description = "The MAC address of the DVB worker VM (Mirakurun / PT3)"
  type        = string
  default     = "BC:24:11:23:32:90"
}

variable "rke2_dvb_worker_ip" {
  description = "DVB worker VM の IP アドレス (DHCP 静的リースと一致させること)"
  type        = string
  default     = "192.168.20.131"
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

variable "mm_server_vm_count" {
  description = "The number of Magic Mirror² server virtual machines"
  type        = number
  default     = 1
}

variable "mm_server_macaddr" {
  description = "The MAC address of the Magic Mirror² server virtual machine"
  type        = string
  default     = "52:54:00:99:00:01"
}

# RKE2 ネットワーク設定
# ルーターの DHCP 静的リースで MAC → IP を固定した後、ここの値と一致させること。
# `terraform output rke2_*_mac_addresses` で各 VM の MAC を確認できる。
variable "rke2_lb_ips" {
  description = "LB VMs に割り当てる IP アドレス (DHCP 静的リースと一致させること)"
  type        = list(string)
  default     = ["192.168.20.135", "192.168.20.136"]
}

variable "rke2_server_ips" {
  description = "Server VMs に割り当てる IP アドレス (DHCP 静的リースと一致させること)"
  type        = list(string)
  default     = ["192.168.20.126", "192.168.20.127", "192.168.20.128"]
}

variable "rke2_worker_ips" {
  description = "Worker VMs に割り当てる IP アドレス (DHCP 静的リースと一致させること)"
  type        = list(string)
  default     = ["192.168.20.129", "192.168.20.130"]
}

variable "unifi_os_server_macaddr" {
  description = "The MAC address of the dedicated UniFi OS Server VM (untagged main LAN)"
  type        = string
  default     = "BC:24:11:10:20:01"
}

variable "unifi_os_server_ip" {
  description = "IP address for the dedicated UniFi OS Server VM (untagged main LAN, DHCP 静的リースと一致させること)"
  type        = string
  default     = "192.168.0.132"
}

variable "rke2_lb_vip" {
  description = "Keepalived の Virtual IP (任意の未使用 IP)"
  type        = string
  default     = "192.168.20.227"
}
