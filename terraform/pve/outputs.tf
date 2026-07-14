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

output "rke2_dvb_worker_vm_name" {
  description = "DVB worker VM 名 (PT3 パススルー付き)"
  value       = keys(module.rke2_dvb_worker.mac_addresses)[0]
}

output "rke2_dvb_worker_mac_address" {
  description = "DVB worker VM の MAC アドレス"
  value       = values(module.rke2_dvb_worker.mac_addresses)[0]
}

output "rke2_worker_vm_names" {
  value = [for vm in values(module.rke2_worker.vms) : vm.name]
}
output "rke2_worker_vm_ids" {
  value = [for vm in values(module.rke2_worker.vms) : vm.id]
}

output "pbs_mac_address" {
  description = "PBS VM の MAC アドレス。main LAN DHCP 静的リース設定に使用する。"
  value       = values(module.pbs.mac_addresses)[0]
}
output "pbs_vm_name" {
  value = keys(module.pbs.mac_addresses)[0]
}
output "pbs_vm_id" {
  value = [for vm in values(module.pbs.vms) : vm.id][0]
}

output "displaylink_kiosk_mac_addresses" {
  description = "DisplayLink kiosk VM MAC addresses for DHCP static leases."
  value       = module.displaylink_kiosk.mac_addresses
}

output "displaylink_kiosk_vm_names" {
  value = [for vm in values(module.displaylink_kiosk.vms) : vm.name]
}

# output "batocera_vm_name" {
#   value = [for vm in values(module.batocera.vms) : vm.name]
# }
# output "batocera_vm_id" {
#   value = [for vm in values(module.batocera.vms) : vm.id]
# }
