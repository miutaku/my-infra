module "rke2_lb" {
  source = "./modules/proxmox_vm"

  vm_count      = var.lb_vm_count
  name_prefix   = "lb"
  name_suffix   = "rke2-haproxy-keepalived-ubuntu-24-04-home-amd64"
  base_macaddr  = var.rke2_base_lb_macaddr
  vmid_start    = 10001
  tags          = ["ubuntu_2404", "rke2", "lb", "haproxy", "keepalived"]
  cpu_cores     = 2
  memory        = 1536
  proxmox_nodes = var.proxmox_nodes
}

module "rke2_server" {
  source = "./modules/proxmox_vm"

  vm_count      = var.server_vm_count
  name_prefix   = "master"
  name_suffix   = "rke2-server-ubuntu-24-04-home-amd64"
  base_macaddr  = var.rke2_base_server_macaddr
  vmid_start    = 11001
  tags          = ["ubuntu_2404", "rke2", "server", "master"]
  cpu_cores     = 2
  memory        = 8192
  proxmox_nodes = var.proxmox_nodes
}

module "rke2_worker" {
  source = "./modules/proxmox_vm"

  vm_count      = var.worker_vm_count
  name_prefix   = "worker"
  name_suffix   = "rke2-agent-ubuntu-24-04-home-amd64"
  base_macaddr  = var.rke2_base_worker_macaddr
  vmid_start    = 12001
  tags          = ["ubuntu_2404", "rke2", "agent", "worker"]
  cpu_cores     = 1
  memory        = 4096
  proxmox_nodes = var.proxmox_nodes
}

module "rec_server" {
  source = "./modules/proxmox_vm"

  vm_count       = var.rec_server_vm_count
  name_prefix    = "prd-rec-server"
  name_suffix    = "docker-ubuntu-24-04-home-amd64"
  base_macaddr   = var.rec_server_macaddr
  vmid_start     = 30000
  tags           = ["prd", "ubuntu_2404", "rec-server", "docker"]
  cpu_cores      = 1
  memory         = 9216
  proxmox_nodes  = ["pve-b550m"] # PCI device is on a specific node
  clone_template = "template-ubuntu-24-04-home-amd64"
  disk_size      = 64
  pcis = {
    pci0 = {
      mapping = {
        mapping_id = "earthsoft_pt3"
        pcie       = true
      }
    }
  }
}
