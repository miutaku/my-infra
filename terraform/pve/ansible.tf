locals {
  lb_hostnames         = sort(keys(module.rke2_lb.mac_addresses))
  server_hostnames     = sort(keys(module.rke2_server.mac_addresses))
  agent_hostnames      = sort(keys(module.rke2_worker.mac_addresses))
  dvb_worker_hostname  = keys(module.rke2_dvb_worker.mac_addresses)[0]
}

resource "local_file" "ansible_hosts_prd" {
  filename = "${path.root}/../../ansible/rke2/hosts/prd"
  content = templatefile("${path.root}/templates/ansible_hosts_prd.tpl", {
    lb_hosts = [
      for i, hostname in local.lb_hostnames : {
        ip       = var.rke2_lb_ips[i]
        hostname = hostname
        priority = i == 0 ? 100 : 90
      }
    ]
    server_primary = [
      for i, hostname in local.server_hostnames : {
        ip       = var.rke2_server_ips[i]
        hostname = hostname
      } if i == 0
    ]
    server_secondary = [
      for i, hostname in local.server_hostnames : {
        ip       = var.rke2_server_ips[i]
        hostname = hostname
      } if i > 0
    ]
    agent_hosts = [
      for i, hostname in local.agent_hostnames : {
        ip       = var.rke2_worker_ips[i]
        hostname = hostname
      }
    ]
    dvb_worker = {
      ip       = var.rke2_dvb_worker_ip
      hostname = local.dvb_worker_hostname
    }
  })
}

resource "local_file" "ansible_prd_all" {
  filename = "${path.root}/../../ansible/rke2/group_vars/prd-all.yml"
  content = templatefile("${path.root}/templates/ansible_prd_all.tpl", {
    lb_vip = var.rke2_lb_vip
    server_hosts = [
      for i, hostname in local.server_hostnames : {
        ip       = var.rke2_server_ips[i]
        hostname = hostname
      }
    ]
  })
}
