output "id" {
  description = "The ID of the container."
  value       = proxmox_lxc.lxc.id
}

output "network" {
  description = "The network configuration of the container."
  value       = proxmox_lxc.lxc.network
}
