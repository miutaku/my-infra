locals {
  instances = {
    x570 = {
      node_name   = "pve-x570"
      vm_id       = 12902
      hostname    = "loockit-01-ubuntu-26-04-home-lxc-amd64"
      address     = "192.168.20.133/24"
      mac_address = "BC:24:11:BE:A0:31"
    }
    b550m = {
      node_name   = "pve-b550m"
      vm_id       = 12903
      hostname    = "loockit-02-ubuntu-26-04-home-lxc-amd64"
      address     = "192.168.20.134/24"
      mac_address = "BC:24:11:BE:A0:32"
    }
  }
}

moved {
  from = proxmox_virtual_environment_container.loockit
  to   = proxmox_virtual_environment_container.loockit["x570"]
}

resource "proxmox_virtual_environment_container" "loockit" {
  for_each = local.instances

  node_name     = each.value.node_name
  vm_id         = each.value.vm_id
  description   = "Loockit HA LXC; BlueZ on ${each.value.node_name} owns the local USB Bluetooth adapter."
  tags          = ["bluetooth", "loockit", "managed", "ha"]
  protection    = true
  started       = true
  start_on_boot = true
  unprivileged  = true

  cpu { cores = 1 }

  memory {
    dedicated = 1024
    swap      = 256
  }

  disk {
    datastore_id = "local-zfs"
    size         = 8
  }

  features {
    nesting = true
  }

  initialization {
    hostname = each.value.hostname
    ip_config {
      ipv4 {
        address = each.value.address
        gateway = "192.168.20.254"
      }
    }
  }

  network_interface {
    name        = "eth0"
    bridge      = "vmbr0"
    mac_address = each.value.mac_address
    vlan_id     = 20
    firewall    = true
  }

  operating_system {
    template_file_id = "local:vztmpl/ubuntu-26.04-standard_26.04-1_amd64.tar.zst"
    type             = "ubuntu"
  }

  startup {
    order    = "21"
    up_delay = "10"
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [operating_system, mount_point]
  }
}
