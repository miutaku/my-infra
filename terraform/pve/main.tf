module "rke2_lb" {
  source = "./modules/proxmox_vm"

  vm_count      = var.lb_vm_count
  name_prefix   = "lb"
  name_suffix   = "rke2-haproxy-keepalived-ubuntu-24-04-home-amd64"
  base_macaddr  = var.rke2_base_lb_macaddr
  vmid_start    = 10001
  tags          = ["ubuntu_2404", "rke2", "lb", "haproxy", "keepalived"]
  cpu_cores     = 2
  memory        = 1536
  proxmox_nodes = var.proxmox_nodes
}

module "rke2_server" {
  source = "./modules/proxmox_vm"

  vm_count      = var.server_vm_count
  name_prefix   = "master"
  name_suffix   = "rke2-server-ubuntu-24-04-home-amd64"
  base_macaddr  = var.rke2_base_server_macaddr
  vmid_start    = 11001
  tags          = ["ubuntu_2404", "rke2", "server", "master"]
  cpu_cores     = 2
  memory        = 8192
  proxmox_nodes = var.proxmox_nodes
}

module "rke2_worker" {
  source = "./modules/proxmox_vm"

  vm_count      = var.worker_vm_count
  name_prefix   = "worker"
  name_suffix   = "rke2-agent-ubuntu-24-04-home-amd64"
  base_macaddr  = var.rke2_base_worker_macaddr
  vmid_start    = 12001
  tags          = ["ubuntu_2404", "rke2", "agent", "worker"]
  cpu_cores     = 1
  memory        = 4096
  proxmox_nodes = var.proxmox_nodes
}

module "prd_rec_server" {
  source = "./modules/proxmox_vm"

  vm_count       = var.prd_rec_server_vm_count
  name_prefix    = "prd-rec-server"
  name_suffix    = "docker-ubuntu-24-04-home-amd64"
  base_macaddr   = var.prd_rec_server_macaddr
  vmid_start     = 30000
  tags           = ["prd", "ubuntu_2404", "rec-server", "docker"]
  cpu_cores      = 6
  memory         = 8192
  proxmox_nodes  = ["pve-b550m"] # PCI device is on a specific node
  clone_template = "template-ubuntu-24-04-home-amd64"
  disk_size      = 64
  pcis = {
    pci0 = {
      mapping = {
        mapping_id = "earthsoft_pt3"
        pcie       = false # trueだとq35じゃないと起動しない
      }
    }
  }
}

module "dev_rec_server" {
  source = "./modules/proxmox_vm"

  vm_count       = var.dev_rec_server_vm_count
  name_prefix    = "dev-rec-server"
  name_suffix    = "docker-ubuntu-24-04-home-amd64"
  base_macaddr   = var.dev_rec_server_macaddr
  vmid_start     = 31000
  tags           = ["dev", "ubuntu_2404", "rec-server", "docker"]
  cpu_cores      = 4
  memory         = 4096
  proxmox_nodes  = ["pve-x570"] # USB device is on a specific node
  clone_template = "template-ubuntu-24-04-home-amd64"
  disk_size      = 32
  usbs = {
    usb0 = {
      mapping = {
        mapping_id = "plex_s1ud"
      }
    }
  }
}

module "truenas" {
  source = "./modules/proxmox_vm"

  vm_count       = 2
  name_prefix    = "nas"
  name_suffix    = "truenas-23-10-home-amd64"
  base_macaddr   = var.truenas_macaddr
  vmid_start     = 69001
  tags           = ["truenas", "nas"]
  cpu_cores      = 4
  memory         = 8192
  proxmox_nodes  = ["pve-b550m", "pve-x570"]
  clone_template = "template-nas-truenas-23-10-home-amd64"
  disk_size      = 24
  usbs = {
    usb0 = {
      mapping = {
        mapping_id = "nas_disk"
      }
    }
  }
}

module "windows" {
  source = "./modules/proxmox_vm"

  vm_count       = 1
  name_prefix    = "work-windows-home"
  name_suffix    = "amd664"
  base_macaddr   = "52:54:00:8c:83:18"
  vmid_start     = 60000
  tags           = ["windows", "work", "win11"]
  cpu_cores      = 12
  memory         = 16384
  proxmox_nodes  = ["pve-x570"]
  clone_template = "template-win11-home-amd64" # TODO: Set Correct Template
  disk_size      = 120
  os_type        = "win11"
  tpm            = true
  pcis = {
    pci0 = {
      mapping = {
        mapping_id = "gt1030"
        pcie       = true
      }
    }
    pci1 = {
      mapping = {
        mapping_id = "jmicron_scsi_controller"
        pcie       = true
      }
    }
  }
}