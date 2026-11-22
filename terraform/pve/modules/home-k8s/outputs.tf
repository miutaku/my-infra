output "nodes" {
  value = {
    for role, node in local.nodes : role => {
      name        = node.name, node_name = node.node_name, vm_id = node.vm_id
      mac_address = node.mac_address, ipv4_address = node.ipv4_address
    }
  }
}

output "iso_import_ids" {
  value = { for host in local.iso_hosts : host => "${host}/local:iso/${local.iso_file_name}" }
}

output "existing_vm_import_ids" {
  value = { for role, node in local.existing_nodes : role => "${node.node_name}/${node.vm_id}" }
}
