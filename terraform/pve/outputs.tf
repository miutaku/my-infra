output "rke2_lb_vm_names" {
  value = [for vm in values(module.rke2_lb.vms) : vm.name]
}
output "rke2_lb_vm_ids" {
  value = [for vm in values(module.rke2_lb.vms) : vm.id]
}
output "rke2_lb_mac_addresses" {
  description = "LB VM の MAC アドレス。ルーターの DHCP 静的リース設定に使用する。"
  value       = module.rke2_lb.mac_addresses
}
output "rke2_server_mac_addresses" {
  description = "Server VM の MAC アドレス。ルーターの DHCP 静的リース設定に使用する。"
  value       = module.rke2_server.mac_addresses
}
output "rke2_worker_mac_addresses" {
  description = "Worker VM の MAC アドレス。ルーターの DHCP 静的リース設定に使用する。"
  value       = module.rke2_worker.mac_addresses
}
output "unifi_os_server_mac_addresses" {
  description = "Dedicated UniFi OS Server VM の MAC アドレス。main LAN DHCP 静的リース設定に使用する。"
  value       = module.unifi_os_server.mac_addresses
}

output "unifi_os_server_vm_names" {
  value = [for vm in values(module.unifi_os_server.vms) : vm.name]
}

output "unifi_os_server_vm_ids" {
  value = [for vm in values(module.unifi_os_server.vms) : vm.id]
}

output "prd_rec_server_vm_names" {
  value = [for vm in values(module.prd_rec_server.vms) : vm.name]
}
output "prd_rec_server_vm_ids" {
  value = [for vm in values(module.prd_rec_server.vms) : vm.id]
}

output "dev_rec_server_vm_names" {
  value = [for vm in values(module.dev_rec_server.vms) : vm.name]
}

output "dev_rec_server_vm_ids" {
  value = [for vm in values(module.dev_rec_server.vms) : vm.id]
}

output "rke2_worker_vm_names" {
  value = [for vm in values(module.rke2_worker.vms) : vm.name]
}
output "rke2_worker_vm_ids" {
  value = [for vm in values(module.rke2_worker.vms) : vm.id]
}

# output "batocera_vm_name" {
#   value = [for vm in values(module.batocera.vms) : vm.name]
# }
# output "batocera_vm_id" {
#   value = [for vm in values(module.batocera.vms) : vm.id]
# }
