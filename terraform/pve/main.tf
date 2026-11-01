module "load_balancer" {
  source = "./modules/proxmox_vm"

  vm_count          = var.load_balancer_vm_count
  name_prefix       = "lb"
  name_suffix       = "haproxy-keepalived-ubuntu-26-04-home-amd64"
  base_macaddr      = var.load_balancer_base_macaddr
  vmid_start        = 10001
  tags              = ["ubuntu_2604", "lb", "haproxy", "keepalived"]
  cpu_cores         = 1
  memory            = 1 * 1024
  clone_template    = local.ubuntu_template
  proxmox_nodes     = var.proxmox_nodes
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

module "dev_application_server" {
  source = "./modules/proxmox_vm"

  vm_count          = var.dev_application_server_vm_count
  name_prefix       = "dev-application-server"
  name_suffix       = "docker-ubuntu-26-04-home-amd64"
  base_macaddr      = var.dev_application_server_macaddr
  vmid_start        = 40000
  tags              = ["dev", "ubuntu_2604", "application-server", "docker"]
  cpu_cores         = 4
  memory            = 10 * 1024
  proxmox_nodes     = ["pve-b550m"]
  clone_template    = local.ubuntu_template
  disk_size         = 128
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

module "truenas" {
  source = "./modules/proxmox_vm"

  vm_count         = 2
  name_prefix      = "nas"
  name_suffix      = "truenas-scale-home-amd64"
  base_macaddr     = var.truenas_macaddr
  vmid_start       = 69001
  tags             = ["truenas", "nas"]
  cpu_cores        = 2
  memory           = 8192
  proxmox_nodes    = local.all_nodes # one VM per node
  clone_template   = local.truenas_template
  bios             = "ovmf"
  efi_storage_pool = "local-zfs"
  machine          = "q35"
  disk_size        = 24
  vlan_tag         = 20
  usbs = {
    usb0 = {
      mapping = {
        mapping_id = "nas_disk"
      }
    }
  }
}

module "unifi_os_server" {
  source = "./modules/proxmox_vm"

  vm_count          = 1
  name_prefix       = "unifi-os"
  name_suffix       = "server-ubuntu-26-04-home-amd64"
  macaddrs_override = [var.unifi_os_server_macaddr]
  vmid_start        = 13201
  tags              = ["ubuntu_2604", "unifi", "uos-server"]
  cpu_cores         = 1
  memory            = 4096
  clone_template    = local.ubuntu_template
  proxmox_nodes     = ["pve-x570"]
  disk_size         = 64
  cloudinit_storage = "local-zfs"
}

# Proxmox Backup Server — HDD の短期バックアップを検証し、iDrive e2 に長期保存する。
#   - scsi0 (OS, 20G): Debian + PBS + /etc/proxmox-backup の設定。
#   - scsi1 (cache, 64G): S3 datastore のローカル永続キャッシュ。S3 から再生成可能なため
#     レプリケーション除外 (apply 後 `qm set 14001 --scsi1 <vol>,replicate=0`、README 参照)。
#   - scsi2 (HDD, 280G): 検証前の世代と直近の同期済み世代。pve-x570 のローカルディスク。
#
# HDD はホストローカルなので PBS は pve-x570 に固定する。
# ホスト障害時は単一の復旧用 PBS で IDrive の既存 datastore を引き継ぐ。
#
# apply 後: PBS 本体の導入と S3 datastore 設定は ansible/pbs で行う。
module "pbs" {
  source = "./modules/proxmox_vm"

  vm_count          = 1
  name_prefix       = "pbs"
  name_suffix       = "debian-13-home-amd64"
  macaddrs_override = [var.pbs_macaddr]
  vmid_start        = 14001
  tags              = ["debian_13", "pbs", "backup"]
  cpu_cores         = 2
  memory            = 4 * 1024 # PBS 推奨要件 (4GiB + バックアップストレージ 1TiB毎に1GiB) を踏まえて調整。
  clone_template    = local.debian_template
  proxmox_nodes     = ["pve-x570"] # HDD が接続されたホストに固定する
  disk_size         = 20           # OS と PBS 設定。バックアップとキャッシュは別ディスク
  data_disk_size    = 64           # scsi1: S3 datastore ローカルキャッシュ (レプリ除外運用)
  backup_disk = {
    storage = "hdd"
    size    = 280
    serial  = "pbs-hdd-backup"
  }
  # Limit S3 cache writes to avoid contention with control-plane disks.
  data_disk_write_mbps = 8
  vlan_tag             = 20 # VLAN 20 (192.168.20.0/24, infra)。PVE から PBS:8007 へ到達させる
  cloudinit_storage    = "local-zfs"
}


module "displaylink_kiosk" {
  source = "./modules/proxmox_vm"

  vm_count          = var.displaylink_kiosk_vm_count
  name_prefix       = "smart-display"
  name_suffix       = "ubuntu-26-04-home-amd64"
  base_macaddr      = var.displaylink_kiosk_macaddr
  vmid_start        = 5000
  tags              = ["ubuntu_2604", "displaylink", "kiosk", "iot"]
  cpu_cores         = 1
  memory            = 4096
  kvm_vga_type      = "none"
  kvm_vga_memory    = null
  proxmox_nodes     = ["pve-b550m"] # USB DisplayLink device is on this node
  clone_template    = local.ubuntu_template
  disk_size         = 32
  vlan_tag          = 40
  cloudinit_storage = "local-zfs"
  usbs = {
    usb0 = {
      mapping = {
        mapping_id = "displaylink"
      }
    }
  }
}

# module "batocera" {
#   source = "./modules/proxmox_vm"
#
#   vm_count          = 1
#   name_prefix       = "retro"
#   name_suffix       = "batocera-home-amd64"
#   macaddrs_override = ["BC:24:11:F5:C5:06"]
#   vmid_start        = 50001
#   tags              = ["batocera", "gaming", "retro"]
#   cpu_cores         = 4
#   memory            = 4096
#   proxmox_nodes     = ["pve-x570"] # GT1030 is on this node
#   clone_template    = "template-batocera-home-amd64"
#   bios              = "ovmf"
#   efi_storage_pool  = "local-lvm"
#   machine           = "q35"
#   disk_size         = 64
#   data_disk_size    = 16 # game storage (scsi1)
#   vlan_tag          = 40
#   kvm_vga_type      = "none"
#   kvm_vga_memory    = null
#   usbs = {
#     usb0 = {
#       mapping = {
#         mapping_id = "mayflash"
#       }
#     }
#   }
#   pcis = {
#     pci0 = {
#       mapping = {
#         mapping_id = "gt1030"
#         pcie       = true # q35 + OVMF enables PCIe passthrough
#       }
#     }
#   }
# }
