locals {
  talos_version = "v1.14.1"
  schematic_id  = "ce4c980550dd2ab1b17bbf2b08801c7eb59418eafe8f279833297925d67c7515"
  iso_url       = "https://factory.talos.dev/image/${local.schematic_id}/${local.talos_version}/metal-amd64.iso"
  iso_file_name = "home-k8s-${local.talos_version}-${substr(local.schematic_id, 0, 12)}-metal-amd64.iso"

  existing_nodes = {
    controlplane_01 = {
      name        = "controlplane-01-talos-home-pve-amd64", node_name = "pve-x570", vm_id = 13001
      mac_address = "02:54:00:13:00:01", ipv4_address = "192.168.20.137"
      cpu_cores   = 2, memory_mb = 4096
    }
    controlplane_02 = {
      name        = "controlplane-02-talos-home-pve-amd64", node_name = "pve-b550m", vm_id = 13002
      mac_address = "02:54:00:13:00:02", ipv4_address = "192.168.20.138"
      cpu_cores   = 2, memory_mb = 4096
    }
    controlplane_03 = {
      name        = "controlplane-03-talos-home-pve-amd64", node_name = "pve-b550m", vm_id = 13003
      mac_address = "02:54:00:13:00:03", ipv4_address = "192.168.20.139"
      cpu_cores   = 2, memory_mb = 4096
    }
    worker_01 = {
      name        = "worker-01-talos-home-pve-amd64", node_name = "pve-x570", vm_id = 13004
      mac_address = "02:54:00:13:00:04", ipv4_address = "192.168.20.140"
      cpu_cores   = 16, memory_mb = 20480, disk_gb = 96
    }
    worker_02 = {
      name        = "worker-02-talos-home-pve-amd64", node_name = "pve-b550m", vm_id = 13005
      mac_address = "02:54:00:13:00:05", ipv4_address = "192.168.20.141"
      cpu_cores   = 8, memory_mb = 20480, disk_gb = 96
    }
  }

  nodes = merge(local.existing_nodes, {
    worker_05 = {
      name          = "worker-05-talos-home-pve-amd64"
      node_name     = "pve-b550m"
      vm_id         = 13006
      mac_address   = "02:54:00:13:00:06"
      ipv4_address  = "192.168.20.143"
      cpu_cores     = 4
      memory_mb     = 6144
      disk_gb       = 96
      started       = true
      boot_from_iso = true
    }
  })

  iso_hosts = toset([for node in values(local.nodes) : node.node_name])
}

resource "proxmox_download_file" "talos_iso" {
  provider = bpg
  for_each = local.iso_hosts

  content_type        = "iso"
  datastore_id        = "local"
  node_name           = each.value
  file_name           = local.iso_file_name
  url                 = local.iso_url
  overwrite           = false
  overwrite_unmanaged = false

  lifecycle {
    prevent_destroy = true
    # Import exposes the pinned volume ID, but no download settings.
    ignore_changes = [url]
  }
}

resource "proxmox_virtual_environment_vm" "talos" {
  provider = bpg
  for_each = local.nodes

  name        = each.value.name
  description = "Talos home-k8s production; owner=my-infra"
  tags        = ["home-k8s", "kubernetes", "production", "talos"]
  node_name   = each.value.node_name
  vm_id       = each.value.vm_id

  started                              = lookup(each.value, "started", true)
  on_boot                              = lookup(each.value, "started", true)
  protection                           = true
  stop_on_destroy                      = true
  reboot_after_update                  = false
  delete_unreferenced_disks_on_destroy = true

  bios          = "ovmf"
  machine       = "q35"
  boot_order    = lookup(each.value, "boot_from_iso", false) ? ["ide2", "scsi0"] : ["scsi0", "ide2"]
  scsi_hardware = "virtio-scsi-single"

  agent {
    enabled = true
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
    size         = lookup(each.value, "disk_gb", 24)
    discard      = "on"
    iothread     = true
    ssd          = true
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

  operating_system { type = "l26" }
  serial_device { device = "socket" }
  vga { type = "serial0" }

  lifecycle {
    prevent_destroy = true
    # The importer checks ide3 and cannot read an existing ide2 ISO. The other
    # two settings are provider-only and are not stored by Proxmox.
    ignore_changes = [cdrom, reboot_after_update, stop_on_destroy]
  }
}
