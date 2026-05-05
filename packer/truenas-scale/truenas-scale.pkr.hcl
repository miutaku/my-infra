packer {
  required_plugins {
    proxmox = {
      version = ">= 1.2.0"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

source "proxmox-iso" "truenas" {
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
  bios     = "ovmf"

  efi_config {
    efi_storage_pool  = var.proxmox_storage_pool
    efi_type          = "4m"
    pre_enrolled_keys = false
  }

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
    type     = "ide"
    iso_file = var.iso_file
    unmount  = true
  }

  # TrueNAS Scale uses an ncurses TUI installer that cannot use cloud-init.
  # Boot commands automate the installer key sequence via VNC.
  # Timing is generous — adjust waits if installation speed differs on your hardware.
  boot_wait = "10s"
  boot_command = [
    # Wait for GRUB and boot the installer
    "<enter><wait1m30s>",
    # Main menu: "1 Install/Upgrade" is pre-selected, press Enter
    "<enter><wait10s>",
    # Disk selection: Space to select first disk, Tab to OK, Enter
    " <wait3s><tab><wait3s><enter><wait5s>",
    # Confirm disk wipe: Tab to Yes, Enter
    "<tab><wait3s><enter><wait5s>",
    # Admin password entry (TrueNAS Scale 24.x+ uses admin account)
    "${var.admin_password}<wait2s>",
    "<tab><wait2s>",
    "${var.admin_password}<wait2s>",
    "<tab><wait3s><enter><wait5s>",
    # Boot environment selection: UEFI is default, Enter to confirm
    "<enter><wait5s>",
    # Wait for installation to complete (10 minutes)
    "<wait10m>",
    # Installation complete — reboot
    "<enter><wait3m>",
  ]

  # No SSH communicator: TrueNAS does not expose SSH by default after fresh install.
  # The template is registered after the installer reboots into TrueNAS.
  communicator = "none"

  template_name        = var.template_name
  template_description = "TrueNAS Scale 25.10.x template. Built by Packer on {{ isotime \"2006-01-02\" }}."
}

build {
  sources = ["source.proxmox-iso.truenas"]
}
