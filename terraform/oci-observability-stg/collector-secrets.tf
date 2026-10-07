provider "kubernetes" {
  alias       = "stg"
  config_path = pathexpand("~/.kube/oke.yaml")
}

locals {
  collector_credentials = {
    client_id     = cloudflare_zero_trust_access_service_token.monitoring.client_id
    client_secret = cloudflare_zero_trust_access_service_token.monitoring.client_secret
  }
}

resource "kubernetes_secret_v1" "collector_stg" {
  provider = kubernetes.stg
  metadata {
    name      = "monitoring-stg-ha-access-token"
    namespace = "reventer-monitoring"
    labels    = { "app.kubernetes.io/managed-by" = "terraform", "app.kubernetes.io/part-of" = "reventer-observability" }
  }
  data = local.collector_credentials
  type = "Opaque"
}
