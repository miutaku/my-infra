module "rke2_lb" {
  source = "./modules/proxmox_vm"

  vm_count          = var.lb_vm_count
  name_prefix       = "lb"
  name_suffix       = "rke2-haproxy-keepalived-ubuntu-26-04-home-amd64"
  base_macaddr      = var.rke2_base_lb_macaddr
  vmid_start        = 10001
  tags              = ["ubuntu_2604", "rke2", "lb", "haproxy", "keepalived"]
  cpu_cores         = 2
  memory            = 1536
  clone_template    = local.ubuntu_template
  proxmox_nodes     = var.proxmox_nodes
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

module "rke2_server" {
  source = "./modules/proxmox_vm"

  vm_count          = var.server_vm_count
  name_prefix       = "master"
  name_suffix       = "rke2-server-ubuntu-26-04-home-amd64"
  base_macaddr      = var.rke2_base_server_macaddr
  vmid_start        = 11001
  tags              = ["ubuntu_2604", "rke2", "server", "master"]
  cpu_cores         = 2
  memory            = 8192
  clone_template    = local.ubuntu_template
  proxmox_nodes     = ["pve-x570", "pve-b550m", "pve-b550m"]
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

module "rke2_worker" {
  source = "./modules/proxmox_vm"

  vm_count          = var.worker_vm_count
  name_prefix       = "worker"
  name_suffix       = "rke2-agent-ubuntu-26-04-home-amd64"
  base_macaddr      = var.rke2_base_worker_macaddr
  vmid_start        = 12001
  tags              = ["ubuntu_2604", "rke2", "agent", "worker"]
  cpu_cores         = 1
  memory            = 4096
  clone_template    = local.ubuntu_template
  proxmox_nodes     = var.proxmox_nodes
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

module "prd_rec_server" {
  source = "./modules/proxmox_vm"

  vm_count          = var.prd_rec_server_vm_count
  name_prefix       = "prd-rec-server"
  name_suffix       = "docker-ubuntu-26-04-home-amd64"
  base_macaddr      = var.prd_rec_server_macaddr
  vmid_start        = 30000
  tags              = ["prd", "ubuntu_2604", "rec-server", "docker"]
  cpu_cores         = 6
  memory            = 8192
  proxmox_nodes     = ["pve-x570"] # PCI device is on this node
  clone_template    = local.ubuntu_template
  disk_size         = 64
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
  pcis = {
    pci0 = {
      mapping = {
        mapping_id = "earthsoft_pt3"
        pcie       = false
      }
    }
  }
}

module "dev_rec_server" {
  source = "./modules/proxmox_vm"

  vm_count          = var.dev_rec_server_vm_count
  name_prefix       = "dev-rec-server"
  name_suffix       = "docker-ubuntu-26-04-home-amd64"
  base_macaddr      = var.dev_rec_server_macaddr
  vmid_start        = 31000
  tags              = ["dev", "ubuntu_2604", "rec-server", "docker"]
  cpu_cores         = 4
  memory            = 4096
  proxmox_nodes     = ["pve-b550m"] # USB device is on this node
  clone_template    = local.ubuntu_template
  disk_size         = 32
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
  usbs = {
    usb0 = {
      mapping = {
        mapping_id = "plex_s1ud"
      }
    }
  }
}

module "dev_application_server" {
  source = "./modules/proxmox_vm"

  vm_count          = var.dev_application_server_vm_count
  name_prefix       = "dev-application-server"
  name_suffix       = "docker-ubuntu-26-04-home-amd64"
  base_macaddr      = var.dev_application_server_macaddr
  vmid_start        = 40000
  tags              = ["dev", "ubuntu_2604", "application-server", "docker"]
  cpu_cores         = 8
  memory            = 10 * 1024
  proxmox_nodes     = ["pve-b550m"]
  clone_template    = local.ubuntu_template
  disk_size         = 64
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

module "truenas" {
  source = "./modules/proxmox_vm"

  vm_count         = 2
  name_prefix      = "nas"
  name_suffix      = "truenas-scale-home-amd64"
  base_macaddr     = var.truenas_macaddr
  vmid_start       = 69001
  tags             = ["truenas", "nas"]
  cpu_cores        = 4
  memory           = 8192
  proxmox_nodes    = local.all_nodes # one VM per node
  clone_template   = local.truenas_template
  bios             = "ovmf"
  efi_storage_pool = "local-zfs"
  machine          = "q35"
  disk_size        = 24
  vlan_tag         = 20
  usbs = {
    usb0 = {
      mapping = {
        mapping_id = "nas_disk"
      }
    }
  }
}

module "rke2_unifi_worker" {
  source = "./modules/proxmox_vm"

  vm_count          = 1
  name_prefix       = "worker-nw"
  name_suffix       = "rke2-agent-ubuntu-26-04-home-amd64"
  base_macaddr      = var.rke2_unifi_worker_macaddr
  vmid_start        = 13001
  tags              = ["ubuntu_2604", "rke2", "agent", "worker", "unifi"]
  cpu_cores         = 2
  memory            = 8192
  clone_template    = local.ubuntu_template
  proxmox_nodes     = ["pve-x570"]
  cloudinit_storage = "local-zfs"
}

module "magic_mirror_server" {
  source = "./modules/proxmox_vm"

  vm_count          = var.mm_server_vm_count
  name_prefix       = "mm-server"
  name_suffix       = "ubuntu-26-04-home-amd64"
  base_macaddr      = var.mm_server_macaddr
  vmid_start        = 5000
  tags              = ["ubuntu_2604", "mm-server", "docker", "iot"]
  cpu_cores         = 1
  memory            = 4096
  kvm_vga_type      = "none"
  kvm_vga_memory    = null
  proxmox_nodes     = ["pve-b550m"] # USB device is on this node
  clone_template    = local.ubuntu_template
  disk_size         = 32
  vlan_tag          = 40
  cloudinit_storage = "local-zfs"
  usbs = {
    usb0 = {
      mapping = {
        mapping_id = "displaylink"
      }
    }
  }
}

# module "batocera" {
#   source = "./modules/proxmox_vm"
#
#   vm_count          = 1
#   name_prefix       = "retro"
#   name_suffix       = "batocera-home-amd64"
#   macaddrs_override = ["BC:24:11:F5:C5:06"]
#   vmid_start        = 50001
#   tags              = ["batocera", "gaming", "retro"]
#   cpu_cores         = 4
#   memory            = 4096
#   proxmox_nodes     = ["pve-x570"] # GT1030 is on this node
#   clone_template    = "template-batocera-home-amd64"
#   bios              = "ovmf"
#   efi_storage_pool  = "local-lvm"
#   machine           = "q35"
#   disk_size         = 64
#   data_disk_size    = 16 # game storage (scsi1)
#   vlan_tag          = 40
#   kvm_vga_type      = "none"
#   kvm_vga_memory    = null
#   usbs = {
#     usb0 = {
#       mapping = {
#         mapping_id = "mayflash"
#       }
#     }
#   }
#   pcis = {
#     pci0 = {
#       mapping = {
#         mapping_id = "gt1030"
#         pcie       = true # q35 + OVMF enables PCIe passthrough
#       }
#     }
#   }
# }
