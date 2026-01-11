# Service Account for the GCE instance
resource "google_service_account" "runner_sa" {
  account_id   = "github-runner-sa"
  display_name = "GitHub Actions Runner Service Account"
  project      = var.project_id
}

# Minimal IAM roles for the runner (add more if needed for your CI/CD)
resource "google_project_iam_member" "runner_log_writer" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.runner_sa.email}"
}

resource "google_project_iam_member" "runner_metric_writer" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = "serviceAccount:${google_service_account.runner_sa.email}"
}

# GCE Instance for GitHub Actions Runner
resource "google_compute_instance" "github_runner" {
  name         = var.runner_name
  machine_type = var.machine_type
  zone         = var.zone
  project      = var.project_id

  tags = ["github-runner"]

  labels = {
    purpose = "github-actions-runner"
    managed = "terraform"
  }

  boot_disk {
    initialize_params {
      image = var.boot_image
      size  = var.disk_size_gb
      type  = "pd-standard"
    }
  }

  network_interface {
    subnetwork = google_compute_subnetwork.runner_subnet.id

    # No external IP - uses Cloud NAT for outbound
    # Uncomment below if you need direct SSH access
    # access_config {
    #   // Ephemeral public IP
    # }
  }

  service_account {
    email  = google_service_account.runner_sa.email
    scopes = ["cloud-platform"]
  }

  metadata_startup_script = templatefile("${path.module}/startup-script.sh", {
    github_org    = var.github_org
    runner_token  = var.github_runner_token
    runner_name   = var.runner_name
    runner_labels = var.runner_labels
  })

  # Ensure network resources are created first
  depends_on = [
    google_compute_router_nat.runner_nat
  ]

  # Allow Terraform to recreate the instance if startup script changes
  lifecycle {
    create_before_destroy = true
  }
}
