# Service Account for the GCE instance
resource "google_service_account" "runner_sa" {
  account_id   = "${var.prefix}-runner-sa"
  display_name = "${var.prefix} GitHub Actions Runner Service Account"
  project      = var.project_id
}

# Minimal IAM roles for the runner
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

# IAM role to access Secret Manager
resource "google_project_iam_member" "runner_secret_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.runner_sa.email}"
}

# Secret Manager secret for GitHub runner token
resource "google_secret_manager_secret" "runner_token" {
  secret_id = "${var.prefix}-runner-token"
  project   = var.project_id

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "runner_token" {
  secret      = google_secret_manager_secret.runner_token.id
  secret_data = var.github_runner_token
}

# GCE Instance for GitHub Actions Runner
resource "google_compute_instance" "github_runner" {
  name         = "${var.prefix}-runner"
  machine_type = var.machine_type
  zone         = var.zone
  project      = var.project_id

  tags = ["${var.prefix}-runner"]

  labels = {
    purpose = "github-actions-runner"
    app     = var.prefix
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
  }

  service_account {
    email = google_service_account.runner_sa.email
    scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  metadata_startup_script = templatefile("${path.module}/startup-script.sh", {
    project_id     = var.project_id
    github_repo    = var.github_repo
    secret_name    = google_secret_manager_secret.runner_token.secret_id
    runner_name    = "${var.prefix}-runner"
    runner_labels  = var.runner_labels
    runner_version = var.runner_version
  })

  depends_on = [
    google_compute_router_nat.runner_nat,
    google_secret_manager_secret_version.runner_token
  ]

  lifecycle {
    create_before_destroy = true
  }
}
