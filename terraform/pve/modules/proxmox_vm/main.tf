locals {
  vm_names = [for i in range(var.vm_count) : format("%s-%02d-%s", var.name_prefix, i + 1, var.name_suffix)]
  macaddrs = [for i in range(var.vm_count) : format("%s%02X", substr(var.base_macaddr, 0, length(var.base_macaddr) - 2), i + 1)]
  vmids    = [for i in range(var.vm_count) : var.vmid_start + i]
}

resource "proxmox_vm_qemu" "vm" {
  for_each = { for idx, name in local.vm_names : name => { macaddr = local.macaddrs[idx], vmid = local.vmids[idx], idx = idx } }

  # options
  vmid             = each.value.vmid
  protection       = false
  name             = each.key
  tags             = join(";", var.tags)
  agent            = 1 # qemu-guest-agent
  onboot           = true
  automatic_reboot = true

  # hardware
  ## boot
  bios        = "seabios"
  boot        = "order=scsi0"
  target_node = var.proxmox_nodes[each.value.idx % length(var.proxmox_nodes)]
  clone       = var.clone_template
  full_clone  = false
  scsihw      = "virtio-scsi-single"

  # cpu
  cpu {
    vcores  = 0 # this is set automatically by Proxmox to sockets * cores. https://registry.terraform.io/providers/Telmate/proxmox/latest/docs/resources/vm_qemu
    cores   = var.cpu_cores
    sockets = 1
    type    = "host"
  }

  ## memory
  memory  = var.memory
  balloon = 1

  # network
  network {
    id       = 0
    model    = "virtio"
    bridge   = "vmbr0"
    firewall = false
    macaddr  = each.value.macaddr
  }
  # disk
  disks {
    scsi {
      scsi0 {
        disk {
          backup     = true
          emulatessd = true
          size       = "20G"
          storage    = "local-zfs"
        }
      }
    }
  }
}
