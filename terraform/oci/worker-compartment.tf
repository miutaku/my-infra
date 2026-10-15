data "oci_core_services" "all_oci_services" {
  filter {
    name   = "name"
    values = ["All .* Services In Oracle Services Network"]
    regex  = true
  }
}
resource "oci_core_service_gateway" "oke_sgw" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.oke_vcn.id
  display_name   = "oke-stg-sgw"
  services {
    service_id = data.oci_core_services.all_oci_services.services[0].id
  }
}

# Preserve existing worker resources during the first migration stage.
module "oke_workers_v2" {
  source                        = "./modules/oke-worker-compartment"
  environment                   = "stg"
  tenancy_ocid                  = var.tenancy_ocid
  cluster_id                    = oci_containerengine_cluster.oke_cluster.id
  vcn_id                        = oci_core_vcn.oke_vcn.id
  vcn_cidr                      = var.vcn_cidr
  vcn_dns_domain                = oci_core_vcn.oke_vcn.vcn_domain_name
  shared_network_compartment_id = var.compartment_ocid
  nat_gateway_id                = oci_core_nat_gateway.oke_ngw.id
  service_gateway_id            = oci_core_service_gateway.oke_sgw.id
  service_cidr                  = data.oci_core_services.all_oci_services.services[0].cidr_block
  worker_subnet_cidr            = "10.0.2.0/24"
  availability_domains          = toset(data.oci_identity_availability_domains.ads.availability_domains[*].name)
  image_id                      = local.oke_node_image_id
  ssh_public_key                = var.ssh_public_key
  depends_on                    = [oci_identity_tag.autoscaler]
}
