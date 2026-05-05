packer {
  required_plugins {
    proxmox = {
      version = ">= 1.2.3"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

source "proxmox-iso" "ubuntu" {
  proxmox_url              = var.proxmox_url
  username                 = var.proxmox_token_id
  token                    = var.proxmox_token_secret
  insecure_skip_tls_verify = true
  node                     = var.proxmox_node

  vm_name  = var.template_name
  vm_id    = var.vmid
  cores    = var.cpu_cores
  memory   = var.memory
  cpu_type = "host"
  os       = "l26"

  network_adapters {
    model    = "virtio"
    bridge   = "vmbr0"
    firewall = false
  }

  disks {
    type         = "scsi"
    disk_size    = var.disk_size
    storage_pool = var.proxmox_storage_pool
  }

  boot_iso {
    type    = "ide"
    iso_file = var.iso_file
    unmount = true
  }

  http_content = {
    "/user-data" = templatefile("${path.root}/http/user-data.pkrtpl.hcl", {
      ssh_password_hash = var.ssh_password_hash
      ssh_public_key    = var.ssh_public_key
    })
    "/meta-data" = "instance-id: packer-build\nlocal-hostname: template-ubuntu-26-04-home-amd64\n"
  }

  boot_wait = "20s"
  boot_command = [
    "c<wait3>",
    "<leftShiftOff><rightShiftOff>linux /casper/vmlinuz autoinstall ds=nocloud-net\\;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ ---<enter><wait5>",
    "initrd /casper/initrd<enter><wait5>",
    "boot<enter>"
  ]

  communicator           = "ssh"
  ssh_username           = "miutaku"
  ssh_password           = var.ssh_password
  ssh_timeout            = "60m"
  ssh_handshake_attempts = 50

  qemu_agent = true

  template_name        = var.template_name
  template_description = "Ubuntu 26.04 LTS minimal template. Built by Packer on {{ isotime \"2006-01-02\" }}."
}

build {
  sources = ["source.proxmox-iso.ubuntu"]

  provisioner "file" {
    source      = "${path.root}/files/sync-hostname-from-pve.sh"
    destination = "/tmp/sync-hostname-from-pve.sh"
  }

  provisioner "file" {
    source      = "${path.root}/files/sync-hostname-from-pve.service"
    destination = "/tmp/sync-hostname-from-pve.service"
  }

  provisioner "file" {
    source      = "${path.root}/files/node_exporter.service"
    destination = "/tmp/node_exporter.service"
  }

  provisioner "shell" {
    environment_vars = ["DEBIAN_FRONTEND=noninteractive", "NEEDRESTART_MODE=l"]
    inline = [
      "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do echo 'Waiting for cloud-init...'; sleep 5; done",
      "echo 'debconf debconf/frontend select Noninteractive' | sudo debconf-set-selections",
      "sudo apt-get update -qq",
      "sudo apt-get upgrade -y",
      "sudo apt-get install -y vim",
      "sudo apt-get remove -y --purge nano || true",
      # Install PVE hostname sync service
      "sudo install -m 0755 /tmp/sync-hostname-from-pve.sh /usr/local/bin/sync-hostname-from-pve",
      "sudo install -m 0644 /tmp/sync-hostname-from-pve.service /etc/systemd/system/sync-hostname-from-pve.service",
      "sudo systemctl enable sync-hostname-from-pve.service",
      # Install node_exporter
      "sudo useradd --system --shell /sbin/nologin --no-create-home node_exporter || true",
      "curl -fsSL https://github.com/prometheus/node_exporter/releases/download/v1.8.2/node_exporter-1.8.2.linux-amd64.tar.gz -o /tmp/node_exporter.tar.gz",
      "tar -xzf /tmp/node_exporter.tar.gz -C /tmp/",
      "sudo install -m 0755 /tmp/node_exporter-1.8.2.linux-amd64/node_exporter /usr/local/bin/node_exporter",
      "sudo install -m 0644 /tmp/node_exporter.service /etc/systemd/system/node_exporter.service",
      "sudo systemctl enable node_exporter.service",
      "rm -rf /tmp/node_exporter*",
      # Configure cloud-init for Proxmox NoCloud datasource
      "echo 'datasource_list: [NoCloud, ConfigDrive]' | sudo tee /etc/cloud/cloud.cfg.d/99-pve.cfg",
      "sudo cloud-init clean --logs",
      "sudo rm -rf /var/lib/cloud/",
      "sudo truncate -s 0 /etc/machine-id",
      "sudo rm -f /var/lib/dbus/machine-id",
      "sudo rm -f /etc/ssh/ssh_host_*",
      "sudo apt-get autoremove -y",
      "sudo apt-get clean",
    ]
  }
}
