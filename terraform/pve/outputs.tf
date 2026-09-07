output "load_balancer_vm_names" {
  value = [for vm in values(module.load_balancer.vms) : vm.name]
}
output "load_balancer_vm_ids" {
  value = [for vm in values(module.load_balancer.vms) : vm.id]
}
output "load_balancer_mac_addresses" {
  description = "LB VM の MAC アドレス。ルーターの DHCP 静的リース設定に使用する。"
  value       = module.load_balancer.mac_addresses
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
