# OCI Site-to-Site VPN: IX2215 (home) <-> OCI VCN
# IKEv2 IPSec — IX2215 が NATの内側 (v6plus) のため IX2215 側から接続を起動する。
# NAT-T (UDP 4500) を使用。OCI DRG にスタティックルートで自宅 LAN を広報。

# Dynamic Routing Gateway (VCN <-> VPN の接続点)
resource "oci_core_drg" "home_vpn" {
  compartment_id = var.compartment_ocid
  display_name   = "home-vpn-drg"
  freeform_tags  = local.common_tags
}

resource "oci_core_drg_attachment" "oke_vcn" {
  drg_id       = oci_core_drg.home_vpn.id
  display_name = "oke-vcn-attachment"
  network_details {
    id   = oci_core_vcn.oke_vcn.id
    type = "VCN"
  }
}

# CPE = IX2215 の WAN IP (v6plus 固定 IPv4)
resource "oci_core_cpe" "ix2215" {
  compartment_id = var.compartment_ocid
  ip_address     = var.ix2215_wan_ip
  display_name   = "ix2215-home"
  freeform_tags  = local.common_tags
}

# IPSec 接続 (スタティックルーティング)
resource "oci_core_ipsec" "home_vpn" {
  compartment_id = var.compartment_ocid
  cpe_id         = oci_core_cpe.ix2215.id
  drg_id         = oci_core_drg.home_vpn.id
  display_name   = "ix2215-ipsec"
  static_routes  = [var.home_lan_cidr]
  freeform_tags  = local.common_tags
}

data "oci_core_ipsec_connection_tunnels" "home_vpn" {
  ipsec_id = oci_core_ipsec.home_vpn.id
}

# Tunnel 1 (primary) — IKEv2 + PSK
resource "oci_core_ipsec_connection_tunnel_management" "tunnel1" {
  ipsec_id  = oci_core_ipsec.home_vpn.id
  tunnel_id = data.oci_core_ipsec_connection_tunnels.home_vpn.ip_sec_connection_tunnels[0].id

  routing      = "STATIC"
  ike_version  = "V2"
  display_name = "tunnel-1-primary"

  shared_secret = var.vpn_psk

  phase_one_details {
    is_custom_phase_one_config      = true
    custom_authentication_algorithm = "SHA2_384"
    custom_encryption_algorithm     = "AES_256_CBC"
    custom_dh_group                 = "GROUP5"
    lifetime                        = 28800
  }

  phase_two_details {
    is_custom_phase_two_config      = true
    custom_authentication_algorithm = "HMAC_SHA2_256_128"
    custom_encryption_algorithm     = "AES_256_CBC"
    dh_group                        = "GROUP5"
    is_pfs_enabled                  = true
    lifetime                        = 3600
  }

  dpd_config {
    dpd_mode           = "INITIATE_AND_RESPOND"
    dpd_timeout_in_sec = 20
  }
}

# ── Outputs (IX2215 Ansible の group_vars に設定する値) ──────────────────────

output "vpn_tunnel1_ip" {
  description = "OCI VPN headend IP — IX2215 Tunnel2.0 の ikev2 peer に設定する"
  value       = data.oci_core_ipsec_connection_tunnels.home_vpn.ip_sec_connection_tunnels[0].vpn_ip
}

output "vpn_tunnel1_cpe_inside_ip" {
  description = "IX2215 側トンネル内部 IP (/30) — Tunnel2.0 の ip address に設定する。group_vars の ix_vpn_oci.cpe_inside_ip に転記すること"
  value       = try(data.oci_core_ipsec_connection_tunnels.home_vpn.ip_sec_connection_tunnels[0].bgp_session_info[0].customer_interface_ip, "OCI コンソールで確認してください")
}
