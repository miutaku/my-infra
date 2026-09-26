moved {
  from = cloudflare_record.oke
  to   = cloudflare_dns_record.oke
}

moved {
  from = cloudflare_zero_trust_device_profiles.default_warp
  to   = cloudflare_zero_trust_device_default_profile.default_warp
}

removed {
  from = cloudflare_zero_trust_access_policy.allow_emails

  lifecycle {
    destroy = false
  }
}

removed {
  from = cloudflare_zero_trust_split_tunnel.default_warp_include

  lifecycle {
    destroy = false
  }
}
