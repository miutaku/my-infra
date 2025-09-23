output "rke2_server_vm_names" {
  value = [for vm in values(module.rke2_server.vms) : vm.name]
}
output "rke2_server_vm_ids" {
  value = [for vm in values(module.rke2_server.vms) : vm.id]
}

output "rke2_lb_vm_names" {
  value = [for vm in values(module.rke2_lb.vms) : vm.name]
}
output "rke2_lb_vm_ids" {
  value = [for vm in values(module.rke2_lb.vms) : vm.id]
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
