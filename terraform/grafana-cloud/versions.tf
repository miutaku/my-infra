terraform {
  required_version = ">= 1.9.0"

  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "= 4.46.0"
    }
  }

  # HCP holds shared state/locks; execution stays on the CI runner so the
  # notification updater can use the checked-out scripts and BSM credentials.
  backend "remote" {
    organization = "miutaku"
    workspaces {
      name = "grafana-cloud"
    }
  }
}

# GRAFANA_URL / GRAFANA_AUTH are supplied by the execution environment.
provider "grafana" {}
