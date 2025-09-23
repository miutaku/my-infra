# 既存のDRGを参照
#data "oci_core_drg" "existing_drg" {
#  drg_id = "ocid1.drg.oc1.ap-tokyo-1.aaaaaaaa4z4q3nvmx3g2cdwg6u4bcfbzlhtkzp5ae6kwov7gopi5wuvit2sa"
#}

# CPE (自宅ルーター側)
resource "oci_core_cpe" "home_cpe" {
  compartment_id = "ocid1.tenancy.oc1..aaaaaaaaiplrci236xnoyraexbkwtbhx7k75wuvx32yuqruai2q4i6jouebq"
  ip_address     = "106.72.56.1"
  display_name   = "CPE"
}

# IPSec VPN 接続
#resource "oci_core_ipsec_connection" "home_vpn" {
#  compartment_id = "ocid1.tenancy.oc1..aaaaaaaaiplrci236xnoyraexbkwtbhx7k75wuvx32yuqruai2q4i6jouebq"
#  cpe_id         = "ocid1.cpe.oc1.ap-tokyo-1.aaaaaaaau463er4mb2n5pfgfg36vm7lavmqdk3e5mu4352utpx2s43ozdz2q"
#  drg_id         = "ocid1.drg.oc1.ap-tokyo-1.aaaaaaaa4z4q3nvmx3g2cdwg6u4bcfbzlhtkzp5ae6kwov7gopi5wuvit2sa"
#  display_name   = "VPN-OCI-vcn"
#}

# トンネル1
resource "oci_core_ipsec_connection_tunnel_management" "home_vpn_tunnel1" {
  ipsec_id     = oci_core_ipsec_connection.home_vpn.id
  tunnel_id    = "ocid1.ipsectunnel.oc1.ap-tokyo-1.aaaaaaaakk5hjnjg3qvtfa56u2qglgpfzfjvjfnalsqwoduqulhxvsz25afa"
  display_name = "tunnel1-OCI-vcn"

  routing       = "BGP"
  ike_version   = "V2"
  shared_secret = "83xf42niGkG0sJxyrum2HG51W3bxzsrTihNjwCjZfX6suhhWwKxGgz0txdtDaGeL"

  bgp_session_info {
    customer_bgp_asn      = 64512
    customer_interface_ip = "192.168.1.9/30"
    oracle_bgp_asn        = 31898
    oracle_interface_ip   = "192.168.1.10/30"
  }

  phase_one_details {
    encryption_algorithm     = "AES_GCM_16_256"
    authentication_algorithm = "HMAC_SHA2_512"
    dh_group                 = "GROUP14"
  }

  phase_two_details {
    encryption_algorithm     = "AES_GCM_16_256"
    authentication_algorithm = "NONE"
    dh_group                 = "GROUP5"
    is_pfs_enabled           = true
  }
}
# トンネル2
resource "oci_core_ipsec_connection_tunnel_management" "home_vpn_tunnel2" {
  ipsec_id     = oci_core_ipsec_connection.home_vpn.id
  tunnel_id    = "ocid1.ipsectunnel.oc1.ap-tokyo-1.aaaaaaaatjlkkycho3n7hbmdze4e6axmutpsgqwu6grxo6w7sxlefp5lmoua"
  display_name = "tunnel2-OCI-vcn"

  routing       = "BGP"
  ike_version   = "V2"
  shared_secret = "tg3gOgYV3IU1tx1zPl3QuA0EalTE4IocW83fD1gjLNXU3tZJesGJvt9o8CSNMTuH"

  bgp_session_info {
    customer_bgp_asn      = 64512
    customer_interface_ip = "192.168.1.13/30"
    oracle_bgp_asn        = 31898
    oracle_interface_ip   = "192.168.1.14/30"
  }

  phase_one_details {
    encryption_algorithm     = "AES_CBC_256"      # negotiated
    authentication_algorithm = "HMAC_SHA2_384"   # negotiated
    dh_group                 = "GROUP5"
    custom_encryption_algorithm     = "AES_256_CBC"
    custom_authentication_algorithm = "SHA2_384"
    custom_dh_group                 = "GROUP5"
  }

  phase_two_details {
    encryption_algorithm     = "AES_CBC_256"       # negotiated
    authentication_algorithm = "HMAC_SHA2_256_128" # negotiated
    dh_group                 = "GROUP5"
    is_pfs_enabled           = true
    custom_encryption_algorithm     = "AES_256_CBC"
    custom_authentication_algorithm = "HMAC_SHA2_256_128"
  }
}
