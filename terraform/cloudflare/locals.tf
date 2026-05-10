locals {
  # Services exposed through the RKE2 (home) tunnel.
  # key           = subdomain prefix (e.g. "argocd" → argocd.<domain>)
  # backend       = internal URL reachable by cloudflared (k8s DNS or LAN IP)
  # no_tls_verify = skip TLS verification for self-signed certs
  rke2_services = {
    # ── k8s services ──────────────────────────────────────────────────────────
    argocd = {
      backend       = "http://argocd-server.argocd.svc.cluster.local:80"
      no_tls_verify = false
    }
    wol = {
      backend       = "http://gptwol-service.app-gptwol.svc.cluster.local:5000"
      no_tls_verify = false
    }
    unifi = {
      backend       = "https://unifi-gui.unifi.svc.cluster.local:8443"
      no_tls_verify = true
    }

    # ── LAN appliances (reachable via routing through BVI20/IX2215) ───────────
    ix2215 = {
      # NEC IX2215 HTTP console: BVI10 (192.168.10.254) or GE2.0 (192.168.0.254)
      backend       = "http://192.168.10.254"
      no_tls_verify = false
    }
    "nas-01" = {
      # TrueNAS Scale nas-01 (192.168.20.191)
      backend       = "https://192.168.20.191"
      no_tls_verify = true
    }
    "nas-02" = {
      # TrueNAS Scale nas-02 (192.168.20.192)
      backend       = "https://192.168.20.192"
      no_tls_verify = true
    }
    "pve-x570" = {
      # Proxmox VE pve-x570 (192.168.10.115), web UI on 8006
      backend       = "https://192.168.10.115:8006"
      no_tls_verify = true
    }
    "pve-b550m" = {
      # Proxmox VE pve-b550m (192.168.10.119), web UI on 8006
      backend       = "https://192.168.10.119:8006"
      no_tls_verify = true
    }
    "nanokvm-1" = {
      # NanoKVM #1 (192.168.10.240)
      backend       = "http://192.168.10.240"
      no_tls_verify = false
    }
    "nanokvm-2" = {
      # NanoKVM #2 (192.168.10.241)
      backend       = "http://192.168.10.241"
      no_tls_verify = false
    }
  }

  # Services exposed through the OKE (cloud) tunnel.
  oke_services = {}

  # All known services merged for validation.
  _all_services = merge(local.rke2_services, local.oke_services)

  # Subdomains that require Cloudflare Access (SSO) protection.
  # Every entry here must exist as a key in rke2_services or oke_services.
  access_protected_subdomains = toset([
    "argocd", "wol",
    "unifi",
    "ix2215",
    "nas-01", "nas-02",
    "pve-x570", "pve-b550m",
    "nanokvm-1", "nanokvm-2",
  ])

  # Validate: all protected subdomains must be declared in a service map.
  # terraform plan/apply will fail with an index error if a key is missing.
  _validate_protected = {
    for s in local.access_protected_subdomains : s => local._all_services[s]
  }
}
