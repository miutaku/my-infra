locals {
  iso_url       = "https://factory.talos.dev/image/${var.schematic_id}/${var.talos_version}/metal-amd64.iso"
  iso_file_name = "talos-${var.talos_version}-${substr(var.schematic_id, 0, 12)}-metal-amd64.iso"

  nodes = {
    controlplane = {
      name           = "talos-poc-controlplane-01"
      node_name      = "pve-x570"
      vm_id          = 13001
      mac_address    = "02:54:00:13:00:01"
      ipv4_address   = "192.168.20.137"
      cpu_cores      = 2
      memory_mb      = 4096
      data_disk_size = null
    }
    worker = {
      name           = "talos-poc-worker-01"
      node_name      = "pve-b550m"
      vm_id          = 13002
      mac_address    = "02:54:00:13:00:02"
      ipv4_address   = "192.168.20.138"
      cpu_cores      = 4
      memory_mb      = 6144
      data_disk_size = 16
    }
  }
}

resource "proxmox_download_file" "talos_iso" {
  for_each = toset([for node in values(local.nodes) : node.node_name])

  content_type        = "iso"
  datastore_id        = "local"
  node_name           = each.value
  file_name           = local.iso_file_name
  url                 = local.iso_url
  overwrite           = false
  overwrite_unmanaged = false
}

resource "proxmox_virtual_environment_vm" "talos" {
  for_each = local.nodes

  name        = each.value.name
  description = "Disposable Talos Green PoC; owner=my-infra; expires=30d; see docs/talos-migration-project.md"
  tags        = ["talos", "poc", "disposable"]

  node_name = each.value.node_name
  vm_id     = each.value.vm_id

  started                              = var.start_vms
  on_boot                              = false
  protection                           = false
  stop_on_destroy                      = true
  reboot_after_update                  = false
  delete_unreferenced_disks_on_destroy = true

  bios          = "ovmf"
  machine       = "q35"
  boot_order    = var.boot_from_iso ? ["ide2", "scsi0"] : ["scsi0", "ide2"]
  scsi_hardware = "virtio-scsi-single"

  agent {
    enabled = false
  }

  cpu {
    cores = each.value.cpu_cores
    type  = "host"
  }

  memory {
    dedicated = each.value.memory_mb
    floating  = 0
  }

  efi_disk {
    datastore_id = "local-zfs"
    file_format  = "raw"
    type         = "4m"
  }

  disk {
    datastore_id = "local-zfs"
    interface    = "scsi0"
    size         = 32
    discard      = "on"
    iothread     = true
    ssd          = true
  }

  dynamic "disk" {
    for_each = each.value.data_disk_size == null ? [] : [each.value.data_disk_size]
    content {
      datastore_id = "local-zfs"
      interface    = "scsi1"
      size         = disk.value
      discard      = "on"
      iothread     = true
      ssd          = true
    }
  }

  cdrom {
    file_id   = proxmox_download_file.talos_iso[each.value.node_name].id
    interface = "ide2"
  }

  network_device {
    bridge      = "vmbr0"
    mac_address = each.value.mac_address
    model       = "virtio"
    vlan_id     = 20
  }

  operating_system {
    type = "l26"
  }

  serial_device {
    device = "socket"
  }

  vga {
    type = "serial0"
  }
}
