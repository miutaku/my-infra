terraform {
    required_providers {
        proxmox = {
            source = "telmate/proxmox"
            version = "3.0.2-rc04"
        }
    }
}
provider "proxmox" {
  pm_api_url = "https://192.168.0.140:8006/api2/json"
  pm_api_token_id = var.pm_api_token_id # https://registry.terraform.io/providers/Telmate/proxmox/latest/docs#creating-the-connection-via-username-and-api-token
  pm_api_token_secret = var.pm_api_token_secret # https://registry.terraform.io/providers/Telmate/proxmox/latest/docs#creating-the-connection-via-username-and-api-token
  pm_tls_insecure = true # default Proxmox Virtual Environment uses self-signed certificates.
}
