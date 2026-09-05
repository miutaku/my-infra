locals {
  dvb_devices = flatten([
    for adapter in range(4) : [
      for node in ["demux0", "dvr0", "frontend0"] :
      "/dev/dvb/adapter${adapter}/${node}"
    ]
  ])
}

resource "proxmox_virtual_environment_container" "mirakurun" {
  node_name     = "pve-x570"
  vm_id         = 12901
  description   = "Mirakurun LXC; PT3 is owned by the Proxmox earth_pt3 driver. Managed by Terraform and Ansible."
  tags          = ["dvb", "managed", "mirakurun"]
  protection    = true
  started       = true
  start_on_boot = true
  unprivileged  = true

  cpu {
    cores = 2
  }

  memory {
    dedicated = 2048
    swap      = 512
  }

  console {
    enabled   = true
    tty_count = 2
    type      = "tty"
  }

  disk {
    datastore_id = "local-zfs"
    size         = 12
  }

  features {
    keyctl  = true
    nesting = true
  }

  initialization {
    hostname = "mirakurun-lxc"
    ip_config {
      ipv4 {
        address = "192.168.20.132/24"
        gateway = "192.168.20.254"
      }
    }
  }

  network_interface {
    name        = "eth0"
    bridge      = "vmbr0"
    mac_address = "BC:24:11:BE:A0:30"
    vlan_id     = 20
  }

  operating_system {
    template_file_id = "local:vztmpl/ubuntu-26.04-standard_26.04-1_amd64.tar.zst"
    type             = "ubuntu"
  }

  dynamic "device_passthrough" {
    for_each = toset(local.dvb_devices)
    content {
      path = device_passthrough.value
      mode = "0660"
      uid  = 0
      gid  = 0
    }
  }

  startup {
    order      = "20"
    up_delay   = "30"
  }

  # template_file_id is creation-only. After import, PVE does not retain the
  # source template in CT config; planning it again would replace the CT.
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [operating_system]
  }
}
