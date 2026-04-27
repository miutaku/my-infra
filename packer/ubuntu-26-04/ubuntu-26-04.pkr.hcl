packer {
  required_plugins {
    proxmox = {
      version = ">= 1.2.0"
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
    type         = "virtio"
    disk_size    = var.disk_size
    storage_pool = var.proxmox_storage_pool
  }

  boot_iso {
    type             = "ide"
    iso_url          = var.iso_url
    iso_checksum     = "sha256:${var.iso_checksum}"
    iso_storage_pool = var.iso_storage_pool
    unmount          = true
  }

  http_content = {
    "/user-data" = templatefile("${path.root}/http/user-data.pkrtpl.hcl", {
      ssh_password_hash = var.ssh_password_hash
      ssh_public_key    = var.ssh_public_key
    })
    "/meta-data" = ""
  }

  boot_wait = "5s"
  boot_command = [
    "c<wait>",
    "linux /casper/vmlinuz quiet autoinstall ds=nocloud-net;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ ---<enter><wait5>",
    "initrd /casper/initrd<enter><wait5>",
    "boot<enter>"
  ]

  communicator           = "ssh"
  ssh_username           = "packer"
  ssh_password           = var.ssh_password
  ssh_timeout            = "40m"
  ssh_handshake_attempts = 50

  qemu_agent = true

  template_name        = var.template_name
  template_description = "Ubuntu 26.04 LTS minimal template. Built by Packer on {{ isotime \"2006-01-02\" }}."
}

build {
  sources = ["source.proxmox-iso.ubuntu"]

  provisioner "shell" {
    inline = [
      # Wait for cloud-init to finish
      "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do echo 'Waiting for cloud-init...'; sleep 5; done",
      # cloud-init cleanup so cloned VMs get a fresh run
      "sudo cloud-init clean --logs",
      "sudo rm -rf /var/lib/cloud/",
      # Ensure machine-id is cleared so clones get unique IDs
      "sudo truncate -s 0 /etc/machine-id",
      "sudo rm -f /var/lib/dbus/machine-id",
      # Remove SSH host keys so each clone generates its own
      "sudo rm -f /etc/ssh/ssh_host_*",
      # Remove APT cache
      "sudo apt-get clean",
    ]
  }
}
