module "home_k8s" {
  source    = "./modules/home-k8s"
  providers = { bpg = bpg }
}

import {
  for_each = module.home_k8s.nodes
  to       = module.home_k8s.proxmox_virtual_environment_vm.talos[each.key]
  id       = "${each.value.node_name}/${each.value.vm_id}"
}

import {
  for_each = module.home_k8s.iso_import_ids
  to       = module.home_k8s.proxmox_download_file.talos_iso[each.key]
  id       = each.value
}

output "home_k8s_nodes" {
  description = "Home-k8s VM identifiers and DHCP reservations."
  value       = module.home_k8s.nodes
}
