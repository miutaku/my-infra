resource "proxmox_virtual_environment_container" "loockit" {
  node_name     = "pve-x570"
  vm_id         = 12902
  description   = "Loockit LXC; BlueZ on pve-x570 owns the USB Bluetooth adapter. Managed by Terraform and Ansible."
  tags          = ["bluetooth", "loockit", "managed"]
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
    hostname = "loockit-lxc"
    ip_config {
      ipv4 {
        address = "192.168.20.133/24"
        gateway = "192.168.20.254"
      }
    }
  }

  network_interface {
    name        = "eth0"
    bridge      = "vmbr0"
    mac_address = "BC:24:11:BE:A0:31"
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
    # The host D-Bus bind mount is installed with root-only `pct set`; the
    # API-token provider must preserve it on subsequent applies.
    ignore_changes = [operating_system, mount_point]
  }
}
