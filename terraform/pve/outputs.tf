output "rke2_lb_vm_names" {
  value = [for rke2_lb in proxmox_vm_qemu.rke2_lb : rke2_lb.name]
}
output "rke2_lb_vm_ids" {
  value = [for rke2_lb in proxmox_vm_qemu.rke2_lb : rke2_lb.id]
}

output "rke2_server_vm_names" {
  value = [for rke2_server in proxmox_vm_qemu.rke2_server : rke2_server.name]
}
output "rke2_server_vm_ids" {
  value = [for rke2_server in proxmox_vm_qemu.rke2_server : rke2_server.id]
}

output "rke2_worker_vm_names" {
  value = [for rke2_worker in proxmox_vm_qemu.rke2_worker : rke2_worker.name]
}
output "rke2_worker_vm_ids" {
  value = [for rke2_worker in proxmox_vm_qemu.rke2_worker : rke2_worker.id]
}

#output "tuner_vm_name" {
#  value = proxmox_vm_qemu.tuner.name
#}
#output "tuner_vm_id" {
#  value = proxmox_vm_qemu.tuner.id
#}
