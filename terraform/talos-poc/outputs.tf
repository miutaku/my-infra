output "nodes" {
  description = "Reserved PoC node identity. IPv4 is provided by IX2215 fixed DHCP assignments."
  value = {
    for role, node in local.nodes : role => {
      name         = node.name
      node_name    = node.node_name
      vm_id        = node.vm_id
      mac_address  = node.mac_address
      ipv4_address = node.ipv4_address
    }
  }
}

output "talos_iso_url" {
  value = local.iso_url
}

output "poc_metallb_ip" {
  value = "192.168.20.228"
}
