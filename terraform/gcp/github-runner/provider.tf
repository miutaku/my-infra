terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # Terraform Cloud backend
  # Set TF_CLOUD_ORGANIZATION env var or replace with your org name
  cloud {
    workspaces {
      name = "gcp-github-runner"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}
