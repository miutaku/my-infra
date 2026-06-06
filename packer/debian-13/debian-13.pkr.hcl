packer {
  required_plugins {
    proxmox = {
      version = ">= 1.2.3"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

source "proxmox-iso" "debian" {
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
    type     = "ide"
    iso_file = var.iso_file
    unmount  = true
  }

  http_content = {
    "/preseed.cfg" = templatefile("${path.root}/http/preseed.pkrtpl.hcl", {
      ssh_password_hash = var.ssh_password_hash
      ssh_public_key    = var.ssh_public_key
    })
  }

  # Debian netinst (BIOS / isolinux): <esc> drops to the boot: prompt, then we
  # launch a fully-automated preseed install. May need tuning per ISO version.
  boot_wait = "10s"
  boot_command = [
    "<esc><wait>",
    "install auto=true priority=critical netcfg/choose_interface=auto preseed/url=http://{{ .HTTPIP }}:{{ .HTTPPort }}/preseed.cfg<enter>"
  ]

  communicator           = "ssh"
  ssh_username           = "miutaku"
  ssh_password           = var.ssh_password
  ssh_timeout            = "60m"
  ssh_handshake_attempts = 50

  qemu_agent = true

  template_name        = var.template_name
  template_description = "Debian 13 (trixie) minimal template. Built by Packer on {{ isotime \"2006-01-02\" }}."
}

build {
  sources = ["source.proxmox-iso.debian"]

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

  provisioner "file" {
    source      = "${path.root}/files/grow-rootfs-if-needed"
    destination = "/tmp/grow-rootfs-if-needed"
  }

  provisioner "file" {
    source      = "${path.root}/files/grow-rootfs-if-needed.service"
    destination = "/tmp/grow-rootfs-if-needed.service"
  }

  provisioner "file" {
    source      = "${path.root}/files/regenerate-ssh-host-keys.service"
    destination = "/tmp/regenerate-ssh-host-keys.service"
  }

  provisioner "shell" {
    environment_vars = ["DEBIAN_FRONTEND=noninteractive", "NEEDRESTART_MODE=l"]
    inline = [
      # Wait for cloud-init if it is active; do not block forever on Debian.
      "for i in $(seq 1 60); do [ -f /var/lib/cloud/instance/boot-finished ] && break; echo 'Waiting for cloud-init...'; sleep 5; done",
      "echo 'debconf debconf/frontend select Noninteractive' | sudo debconf-set-selections",
      "sudo apt-get update -qq",
      "sudo apt-get upgrade -y",
      "sudo apt-get install -y vim cloud-guest-utils e2fsprogs parted",
      "sudo apt-get remove -y --purge nano || true",
      # Install root filesystem auto-grow service
      "sudo install -m 0755 /tmp/grow-rootfs-if-needed /usr/local/sbin/grow-rootfs-if-needed",
      "sudo install -m 0644 /tmp/grow-rootfs-if-needed.service /etc/systemd/system/grow-rootfs-if-needed.service",
      "sudo systemctl enable grow-rootfs-if-needed.service",
      # Install PVE hostname sync service
      "sudo install -m 0755 /tmp/sync-hostname-from-pve.sh /usr/local/bin/sync-hostname-from-pve",
      "sudo install -m 0644 /tmp/sync-hostname-from-pve.service /etc/systemd/system/sync-hostname-from-pve.service",
      "sudo systemctl enable sync-hostname-from-pve.service",
      # Install SSH host key regeneration service — clones boot without host keys
      # (build removes them); generate before sshd starts so SSH always comes up.
      "sudo install -m 0644 /tmp/regenerate-ssh-host-keys.service /etc/systemd/system/regenerate-ssh-host-keys.service",
      "sudo systemctl enable regenerate-ssh-host-keys.service",
      # Install node_exporter
      "sudo useradd --system --shell /sbin/nologin --no-create-home node_exporter || true",
      "curl -fsSL https://github.com/prometheus/node_exporter/releases/download/v1.8.2/node_exporter-1.8.2.linux-amd64.tar.gz -o /tmp/node_exporter.tar.gz",
      "tar -xzf /tmp/node_exporter.tar.gz -C /tmp/",
      "sudo install -m 0755 /tmp/node_exporter-1.8.2.linux-amd64/node_exporter /usr/local/bin/node_exporter",
      "sudo install -m 0644 /tmp/node_exporter.service /etc/systemd/system/node_exporter.service",
      "sudo systemctl enable node_exporter.service",
      "rm -rf /tmp/node_exporter*",
      # Configure cloud-init for Proxmox NoCloud datasource. Networking is handled
      # by the installer's ifupdown (DHCP); let cloud-init NOT manage the network,
      # otherwise it conflicts with ifupdown and the network stage hangs on Debian
      # (which also blocks cc_ssh host key generation and set_hostname).
      "printf 'datasource_list: [NoCloud, ConfigDrive]\\nnetwork:\\n  config: disabled\\n' | sudo tee /etc/cloud/cloud.cfg.d/99-pve.cfg",
      "sudo cloud-init clean --logs || true",
      "sudo rm -rf /var/lib/cloud/",
      "sudo truncate -s 0 /etc/machine-id",
      "sudo rm -f /var/lib/dbus/machine-id",
      "sudo rm -f /etc/ssh/ssh_host_*",
      "sudo apt-get autoremove -y",
      "sudo apt-get clean",
    ]
  }
}
