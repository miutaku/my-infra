locals {
  # Services exposed through the RKE2 (home) tunnel.
  # key         = subdomain prefix (e.g. "argocd" → argocd.<domain>)
  # backend     = internal k8s service URL reachable by cloudflared
  # no_tls_verify = skip TLS verification for self-signed certs (e.g. ArgoCD)
  rke2_services = {
    argocd = {
      backend       = "http://argocd-server.argocd.svc.cluster.local:80"
      no_tls_verify = false
    }
    wol = {
      backend       = "http://gptwol-service.app-gptwol.svc.cluster.local:5000"
      no_tls_verify = false
    }
  }

  # Services exposed through the OKE (cloud) tunnel.
  # Add entries here when OKE services need external exposure via Cloudflare Tunnel.
  oke_services = {}

  # Subdomains that require Cloudflare Access (SSO) protection.
  # Must be keys present in rke2_services or oke_services.
  access_protected_subdomains = toset(["argocd", "wol"])
}
