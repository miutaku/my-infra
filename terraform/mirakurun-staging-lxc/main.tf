locals {
  dvb_devices = [
    "/dev/dvb/adapter0/demux0",
    "/dev/dvb/adapter0/dvr0",
    "/dev/dvb/adapter0/frontend0",
  ]
}

resource "proxmox_virtual_environment_container" "mirakurun_staging" {
  node_name     = "pve-b550m"
  vm_id         = 12904
  description   = "Staging Mirakurun LXC; local PX-S1UD for GR and lowest-priority TCP fallback to production Mirakurun for BS/CS."
  tags          = ["dvb", "managed", "mirakurun", "staging"]
  protection    = true
  started       = true
  start_on_boot = true
  unprivileged  = true

  cpu { cores = 1 }
  console {
    enabled   = true
    tty_count = 2
    type      = "tty"
  }
  memory {
    dedicated = 1024
    swap      = 256
  }
  disk {
    datastore_id = "local-zfs"
    size         = 8
  }
  features {
    keyctl  = true
    nesting = true
  }
  initialization {
    hostname = "mirakurun-staging-01-ubuntu-26-04-home-lxc-amd64"
    ip_config {
      ipv4 {
        address = "192.168.20.142/24"
        gateway = "192.168.20.254"
      }
    }
  }
  network_interface {
    name        = "eth0"
    bridge      = "vmbr0"
    mac_address = "BC:24:11:BE:A0:33"
    vlan_id     = 20
    firewall    = true
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
    order    = "22"
    up_delay = "20"
  }
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [operating_system]
  }
}
