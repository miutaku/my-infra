moved {
  from = cloudflare_record.rke2
  to   = cloudflare_dns_record.rke2
}

moved {
  from = cloudflare_record.oke
  to   = cloudflare_dns_record.oke
}

moved {
  from = cloudflare_zero_trust_tunnel_route.rke2_private
  to   = cloudflare_zero_trust_tunnel_cloudflared_route.rke2_private
}

moved {
  from = cloudflare_dns_record.rke2
  to   = cloudflare_dns_record.home_k8s
}

moved {
  from = cloudflare_zero_trust_tunnel_cloudflared.rke2
  to   = cloudflare_zero_trust_tunnel_cloudflared.home_k8s
}

moved {
  from = cloudflare_zero_trust_tunnel_cloudflared_config.rke2
  to   = cloudflare_zero_trust_tunnel_cloudflared_config.home_k8s
}

moved {
  from = cloudflare_zero_trust_tunnel_cloudflared_route.rke2_private
  to   = cloudflare_zero_trust_tunnel_cloudflared_route.home_k8s_private
}

moved {
  from = data.cloudflare_zero_trust_tunnel_cloudflared_token.rke2
  to   = data.cloudflare_zero_trust_tunnel_cloudflared_token.home_k8s
}

moved {
  from = cloudflare_dns_record.home_k8s["argocd-rke2"]
  to   = cloudflare_dns_record.home_k8s["argocd-home-k8s"]
}

moved {
  from = cloudflare_zero_trust_access_application.protected["argocd-rke2"]
  to   = cloudflare_zero_trust_access_application.protected["argocd-home-k8s"]
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
