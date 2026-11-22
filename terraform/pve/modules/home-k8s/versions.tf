terraform {
  required_version = ">= 1.8.0"

  required_providers {
    bpg = {
      source  = "bpg/proxmox"
      version = "= 0.111.1"
    }
  }
}
