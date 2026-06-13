module "rke2_lb" {
  source = "./modules/proxmox_vm"

  vm_count          = var.lb_vm_count
  name_prefix       = "lb"
  name_suffix       = "rke2-haproxy-keepalived-ubuntu-26-04-home-amd64"
  base_macaddr      = var.rke2_base_lb_macaddr
  vmid_start        = 10001
  tags              = ["ubuntu_2604", "rke2", "lb", "haproxy", "keepalived"]
  cpu_cores         = 1
  memory            = 1536
  clone_template    = local.ubuntu_template
  proxmox_nodes     = var.proxmox_nodes
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

module "rke2_server" {
  source = "./modules/proxmox_vm"

  vm_count          = var.server_vm_count
  name_prefix       = "master"
  name_suffix       = "rke2-server-ubuntu-26-04-home-amd64"
  base_macaddr      = var.rke2_base_server_macaddr
  vmid_start        = 11001
  tags              = ["ubuntu_2604", "rke2", "server", "master"]
  cpu_cores         = 2
  memory            = 8192
  clone_template    = local.ubuntu_template
  disk_size         = 48
  proxmox_nodes     = ["pve-x570", "pve-b550m", "pve-b550m"]
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

module "rke2_worker" {
  source = "./modules/proxmox_vm"

  vm_count     = var.worker_vm_count
  name_prefix  = "worker"
  name_suffix  = "rke2-agent-ubuntu-26-04-home-amd64"
  base_macaddr = var.rke2_base_worker_macaddr
  vmid_start   = 12001
  tags         = ["ubuntu_2604", "rke2", "agent", "worker"]
  cpu_cores    = 4
  cpu_cores_by_proxmox_node = {
    pve-x570 = 12
  }
  memory            = 8192
  clone_template    = local.ubuntu_template
  disk_size         = 96
  proxmox_nodes     = var.proxmox_nodes
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
}

# DVB 専用 RKE2 worker — PT3 PCI パススルー付き。pve-x570 に固定。
# Mirakurun Pod がこのノードで動く。
# terraform apply でこのノードが生成された後、ansible/rke2 で RKE2 agent をインストールすること。
module "rke2_dvb_worker" {
  source = "./modules/proxmox_vm"

  vm_count          = 1
  name_prefix       = "dvb-worker"
  name_suffix       = "rke2-agent-ubuntu-26-04-home-amd64"
  macaddrs_override = [var.rke2_dvb_worker_macaddr]
  vmid_start        = 12900
  tags              = ["ubuntu_2604", "rke2", "agent", "worker", "dvb"]
  cpu_cores         = 1
  memory            = 3072
  clone_template    = local.ubuntu_template
  disk_size         = 32
  proxmox_nodes     = ["pve-x570"] # PT3 PCI device is on this node
  vlan_tag          = 20
  cloudinit_storage = "local-zfs"
  pcis = {
    pci0 = {
      mapping = {
        mapping_id = "earthsoft_pt3"
        pcie       = false
      }
    }
  }
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
  disk_size         = 64
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

# Proxmox Backup Server — バックアップ実体は S3 互換オブジェクトストレージ (iDrive e2)
# datastore に置くため VM はほぼステートレス。
#   - scsi0 (OS, 20G): Debian + PBS + /etc/proxmox-backup の設定。レプリケーション対象。
#   - scsi1 (cache, 64G): S3 datastore のローカル永続キャッシュ。S3 から再生成可能なため
#     レプリケーション除外 (apply 後 `qm set 14001 --scsi1 <vol>,replicate=0`、README 参照)。
#
# HA 方針: 2 ノードクラスタはクォーラム不足で HA マネージャ (fencing) を使えないため、
# hastate は設定しない。代わりに pvesr で OS ディスクを対向ノードへ定期レプリケーションし、
# ノード障害時は手動マイグレーションで対向ノードから起動する (数十秒のダウンタイム)。
# レプリケーションジョブは telmate provider で表現できないため pve/README.md の手順で設定する。
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
  memory            = 8192 # S3 datastore の in-memory キャッシュ拡大 + proxy のメモリ逼迫(実測 3.3G/3.8G)解消のため増設
  clone_template    = local.debian_template
  proxmox_nodes     = ["pve-x570"] # 平常時の稼働ノード。障害時は手動で pve-b550m へ移行する
  disk_size         = 20           # OS ディスク (lean)。datastore 実体は S3 なので小容量で足りる
  data_disk_size    = 64           # scsi1: S3 datastore ローカルキャッシュ (レプリ除外運用)
  vlan_tag          = 20           # VLAN 20 (192.168.20.0/24, infra)。PVE から PBS:8007 へ到達させる
  cloudinit_storage = "local-zfs"
}

module "magic_mirror_server" {
  source = "./modules/proxmox_vm"

  vm_count          = var.mm_server_vm_count
  name_prefix       = "smart-display"
  name_suffix       = "ubuntu-26-04-home-amd64"
  base_macaddr      = var.mm_server_macaddr
  vmid_start        = 5000
  tags              = ["ubuntu_2604", "mm-server", "docker", "iot"]
  cpu_cores         = 1
  memory            = 2048
  kvm_vga_type      = "none"
  kvm_vga_memory    = null
  proxmox_nodes     = ["pve-b550m"] # USB DisplayLink device is on this node
  clone_template    = local.ubuntu_template
  disk_size         = 32
  vlan_tag          = 40
  cloudinit_storage = "local-zfs"
  cicustom          = "user=local:snippets/${local.mm_server_snippet_name}"
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
