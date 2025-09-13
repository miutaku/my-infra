locals {
  rke2_lb_vm_names = [for i in range(var.lb_vm_count) : format("lb-%02d-rke2-haproxy-keepalived-ubuntu-24-04-home-amd64", i + 1)]
  rke2_lb_macaddrs = [for i in range(var.lb_vm_count) : format("%s%02X", substr(var.rke2_base_lb_macaddr, 0, length(var.rke2_base_lb_macaddr) - 2), i + 1)]
  rke2_lb_vmids    = [for i in range(var.lb_vm_count) : 10001 + i]
}

resource "proxmox_vm_qemu" "rke2_lb" {
  for_each = { for idx, name in local.rke2_lb_vm_names : name => { macaddr = local.rke2_lb_macaddrs[idx], vmid = local.rke2_lb_vmids[idx] } }

  # options
  vmid             = each.value.vmid
  protection       = false
  name             = each.key
  tags             = "ubuntu_2404;rke2;lb;haproxy;keepalived"
  agent            = 1 # qemu-guest-agent
  onboot           = true
  automatic_reboot = true

  # hardware
  ## boot
  bios        = "seabios"
  boot        = "order=scsi0"
  target_node = "pve-x570"
  clone       = "template-ubuntu-24-04-home-amd64"
  full_clone  = false
  scsihw      = "virtio-scsi-single"

  # cpu
  cpu {
    vcores = 0 # this is set automatically by Proxmox to sockets * cores. https://registry.terraform.io/providers/Telmate/proxmox/latest/docs/resources/vm_qemu
    cores = 2
    sockets = 1
    type = "host"
  }

  ## memory
  memory = 2048
  balloon = 1

  # network
  network {
    id = 0
    model  = "virtio"
    bridge = "vmbr0"
    firewall = false
    macaddr = each.value.macaddr
  }
  # disk
  disks {
    scsi {
        scsi0 {
            disk {
                backup = true
                emulatessd = true
                size = "20G"
                storage = "local-zfs"
            }
        }
    }
  }
}


locals {
  rke2_server_vm_names = [for i in range(var.server_vm_count) : format("master-%02d-rke2-server-ubuntu-24-04-home-amd64", i + 1)]
  rke2_server_macaddrs = [for i in range(var.server_vm_count) : format("%s%02X", substr(var.rke2_base_server_macaddr, 0, length(var.rke2_base_server_macaddr) - 2), i + 1)]
  rke2_server_vmids    = [for i in range(var.server_vm_count) : 11001 + i]
}

resource "proxmox_vm_qemu" "rke2_server" {
  for_each = { for idx, name in local.rke2_server_vm_names : name => { macaddr = local.rke2_server_macaddrs[idx], vmid = local.rke2_server_vmids[idx] } }

  # options
  vmid             = each.value.vmid
  protection       = false
  name             = each.key
  tags             = "ubuntu_2404;rke2;server"
  agent            = 1 # qemu-guest-agent
  onboot           = true
  automatic_reboot = true

  # hardware
  ## boot
  bios        = "seabios"
  boot        = "order=scsi0"
  target_node = "pve-x570"
  clone       = "template-ubuntu-24-04-home-amd64"
  full_clone  = false
  scsihw      = "virtio-scsi-single"

  # cpu
  cpu {
    vcores = 0 # this is set automatically by Proxmox to sockets * cores. https://registry.terraform.io/providers/Telmate/proxmox/latest/docs/resources/vm_qemu
    cores = 2
    sockets = 1
    type = "host"
  }

  ## memory
  memory = 5120
  balloon = 1

  # network
  network {
    id = 0
    model  = "virtio"
    bridge = "vmbr0"
    firewall = false
    macaddr = each.value.macaddr
  }
  # disk
  disks {
    scsi {
        scsi0 {
            disk {
                backup = true
                emulatessd = true
                size = "20G"
                storage = "local-zfs"
            }
        }
    }
  }
}

locals {
  rke2_worker_vm_names = [for i in range(var.worker_vm_count) : format("worker-%02d-rke2-agent-ubuntu-24-04-home-amd64", i + 1)]
  rke2_worker_macaddrs = [for i in range(var.worker_vm_count) : format("%s%02X", substr(var.rke2_base_worker_macaddr, 0, length(var.rke2_base_worker_macaddr) - 2), i + 1)]
  rke2_worker_vmids    = [for i in range(var.worker_vm_count) : 12001 + i]
}

resource "proxmox_vm_qemu" "rke2_worker" {
  for_each = { for idx, name in local.rke2_worker_vm_names : name => { macaddr = local.rke2_worker_macaddrs[idx], vmid = local.rke2_worker_vmids[idx] } }
  # options
  vmid             = each.value.vmid
  protection       = false
  name             = each.key
  tags             = "ubuntu_2404;rke2;worker"
  agent            = 1 # qemu-guest-agent
  onboot           = true
  automatic_reboot = true

  # hardware
  ## boot
  bios        = "seabios"
  boot        = "order=scsi0"
  target_node = "pve-x570"
  clone       = "template-ubuntu-24-04-home-amd64"
  full_clone  = false
  scsihw      = "virtio-scsi-single"

  # cpu
  cpu {
    vcores = 0 # this is set automatically by Proxmox to sockets * cores. https://registry.terraform.io/providers/Telmate/proxmox/latest/docs/resources/vm_qemu
    cores = 1
    sockets = 1
    type = "host"
  }

  # memory
  memory = 2048
  balloon = 1

  # network
  network {
    id = 0
    model  = "virtio"
    bridge = "vmbr0"
    firewall = false
    macaddr = each.value.macaddr
  }

  # disk
  disks {
    scsi {
        scsi0 {
            disk {
                backup = true
                emulatessd = true
                size = "20G"
                storage = "local-zfs"
            }
        }
    }
  }
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