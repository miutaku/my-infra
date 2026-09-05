variable "proxmox_endpoint" {
  type    = string
  default = "https://192.168.0.115:8006/"
}

variable "proxmox_api_token" {
  type        = string
  sensitive   = true
  description = "user@realm!token=secret; provide with TF_VAR_proxmox_api_token"
}
