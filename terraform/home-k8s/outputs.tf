output "nodes" {
  value = {
    for role, node in local.nodes : role => {
      name        = node.name, node_name = node.node_name, vm_id = node.vm_id
      mac_address = node.mac_address, ipv4_address = node.ipv4_address
    }
  }
}

output "kubernetes_api_vip" { value = "192.168.20.228" }
output "talos_iso_url" { value = local.iso_url }
