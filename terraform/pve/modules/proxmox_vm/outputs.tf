output "vms" {
  description = "The created VMs"
  value       = proxmox_vm_qemu.vm
}

output "mac_addresses" {
  description = "VM name → MAC address map. Use for DHCP static lease configuration."
  value       = { for idx, name in local.vm_names : name => local.macaddrs[idx] }
}
