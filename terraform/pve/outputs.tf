output "rke2_lb_vm_names" {
  value = [for vm in values(module.rke2_lb.vms) : vm.name]
}
output "rke2_lb_vm_ids" {
  value = [for vm in values(module.rke2_lb.vms) : vm.id]
}

output "rke2_server_vm_names" {
  value = [for vm in values(module.rke2_server.vms) : vm.name]
}
output "rke2_server_vm_ids" {
  value = [for vm in values(module.rke2_server.vms) : vm.id]
}

output "rke2_worker_vm_names" {
  value = [for vm in values(module.rke2_worker.vms) : vm.name]
}
output "rke2_worker_vm_ids" {
  value = [for vm in values(module.rke2_worker.vms) : vm.id]
}

#output "tuner_vm_name" {
#  value = proxmox_vm_qemu.tuner.name
#}
#output "tuner_vm_id" {
#  value = proxmox_vm_qemu.tuner.id
#}
