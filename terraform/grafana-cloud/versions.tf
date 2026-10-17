terraform {
  required_version = ">= 1.9.0"

  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "= 4.46.0"
    }
  }

  backend "local" {
    path = ".state/terraform.tfstate"
  }
}

# GRAFANA_URL / GRAFANA_AUTH are supplied by the execution environment.
provider "grafana" {}
