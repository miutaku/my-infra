module "reventer_runner" {
  source = "../modules/runner"

  project_id          = var.project_id
  region              = var.region
  zone                = var.zone
  prefix              = "reventer"
  github_repo         = "miutaku/reventer"
  github_runner_token = var.github_runner_token
  ssh_allowed_cidr    = var.ssh_allowed_cidr

  # Optional overrides (uncomment to customize)
  # runner_labels  = "gce,linux,x64,reventer"
  # machine_type   = "e2-small"
  # disk_size_gb   = 50
}
