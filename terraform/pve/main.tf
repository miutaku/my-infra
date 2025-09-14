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

#resource "proxmox_vm_qemu" "tuner" {
#  # options
#  vmid        = 30000
#  protection  = false
#  name        = var.tuner_vm_name
#  agent       = 1 # qemu-guest-agent
#  automatic_reboot = true
#  onboot      = true
#
#  # hardware
#  ## boot
#  scsihw      = "virtio-scsi-single"
#  bios        = "seabios"
#  boot        = "order=scsi0"
#  target_node = "pve-x570"
#  clone       = "docker-ubuntu-24-04-home-amd64"
#  full_clone  = false
#
#  ## cpu
#  vcpus = 0 # this is set automatically by Proxmox to sockets * cores. https://registry.terraform.io/providers/Telmate/proxmox/latest/docs/resources/vm_qemu
#  cores = 1
#  sockets = 1
#  cpu_type = "host"
#
#  ## memory
#  memory = 9216
#  balloon = 1
#
#  # network
#  network {
#    id = 0
#    model  = "virtio"
#    bridge = "vmbr0"
#    firewall = false
#    macaddr = "52:54:00:23:98:fc"
#  }
#
#  # disk
#  disks {
#    scsi {
#      scsi0 {
#        disk {
#          backup = true
#          emulatessd = false
#          size = "20G"
#          storage = "local-zfs"
#          iothread = true
#          replicate = true
#        }
#      }
#    }
#  }
#  # PCI device
#  pcis {
#    pci0 {
#      mapping {
#        mapping_id = "tuner_earthsoft"
#        pcie = false
#        primary_gpu = false
#        rombar = false
#        sub_device_id = ""
#        sub_vendor_id = ""
#      }
#    }
#  }
#
#}
