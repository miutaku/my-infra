output "rke2_lb_vm_names" {
  value = [for vm in values(module.rke2_lb.vms) : vm.name]
}
output "rke2_lb_vm_ids" {
  value = [for vm in values(module.rke2_lb.vms) : vm.id]
}

output "rec_server_vm_names" {
  value = [for vm in values(module.rec_server.vms) : vm.name]
}
output "rec_server_vm_ids" {
  value = [for vm in values(module.rec_server.vms) : vm.id]
}

output "rke2_worker_vm_names" {
  value = [for vm in values(module.rke2_worker.vms) : vm.name]
}
output "rke2_worker_vm_ids" {
  value = [for vm in values(module.rke2_worker.vms) : vm.id]
}
