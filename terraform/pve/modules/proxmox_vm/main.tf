locals {
  vm_names = [for i in range(var.vm_count) : var.vm_count > 1 ? format("%s-%02d-%s", var.name_prefix, i + 1, var.name_suffix) : format("%s-%s", var.name_prefix, var.name_suffix)]
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
  os_type          = var.os_type
  onboot           = true
  automatic_reboot = true

  # hardware
  ## boot
  bios        = "seabios"
  boot        = "order=scsi0"
  machine     = var.machine
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
  balloon = substr(var.os_type, 0, 1) == "w" ? 1 : 0

  # TPM
  dynamic "tpm" {
    for_each = var.tpm ? [1] : []
    content {
      storage = "local-zfs"
      version = "v2.0"
    }
  }

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
          size       = "${var.disk_size}G"
          storage    = "local-zfs"
        }
      }
    }
  }

  # PCI passthrough (optional)
  dynamic "pcis" {
    for_each = var.pcis != null ? [var.pcis] : []
    content {
      dynamic "pci0" {
        for_each = lookup(pcis.value, "pci0", null) != null ? [lookup(pcis.value, "pci0", null)] : []
        content {
          dynamic "mapping" {
            for_each = lookup(pci0.value, "mapping", null) != null ? [lookup(pci0.value, "mapping", null)] : []
            content {
              mapping_id = lookup(mapping.value, "mapping_id", null)
              pcie       = lookup(mapping.value, "pcie", null)
            }
          }
        }
      }
      dynamic "pci1" {
        for_each = lookup(pcis.value, "pci1", null) != null ? [lookup(pcis.value, "pci1", null)] : []
        content {
          dynamic "mapping" {
            for_each = lookup(pci1.value, "mapping", null) != null ? [lookup(pci1.value, "mapping", null)] : []
            content {
              mapping_id = lookup(mapping.value, "mapping_id", null)
              pcie       = lookup(mapping.value, "pcie", null)
            }
          }
        }
      }
    }
  }

  # USB passthrough (optional)
  dynamic "usbs" {
    for_each = var.usbs != null ? [var.usbs] : []
    content {
      dynamic "usb0" {
        for_each = lookup(usbs.value, "usb0", null) != null ? [lookup(usbs.value, "usb0", null)] : []
        content {
          dynamic "mapping" {
            for_each = lookup(usb0.value, "mapping", null) != null ? [lookup(usb0.value, "mapping", null)] : []
            content {
              mapping_id = lookup(mapping.value, "mapping_id", null)
              usb3       = lookup(mapping.value, "usb3", false)
            }
          }
          dynamic "device" {
            for_each = lookup(usb0.value, "device", null) != null ? [lookup(usb0.value, "device", null)] : []
            content {
              device_id = lookup(device.value, "device_id", null)
              usb3      = lookup(device.value, "usb3", false)
            }
          }
        }
      }
    }
  }
}
