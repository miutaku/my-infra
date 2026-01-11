# VPC Network
resource "google_compute_network" "runner_network" {
  name                    = var.network_name
  auto_create_subnetworks = false
  project                 = var.project_id
}

# Subnet
resource "google_compute_subnetwork" "runner_subnet" {
  name          = "${var.network_name}-subnet"
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  network       = google_compute_network.runner_network.id
  project       = var.project_id
}

# Firewall - Allow SSH (optional, for debugging)
resource "google_compute_firewall" "allow_ssh" {
  name    = "${var.network_name}-allow-ssh"
  network = google_compute_network.runner_network.name
  project = var.project_id

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["106.72.56.1/32"]
  target_tags   = ["github-runner"]
}

# Firewall - Allow outbound (required for GitHub communication)
resource "google_compute_firewall" "allow_egress" {
  name      = "${var.network_name}-allow-egress"
  network   = google_compute_network.runner_network.name
  project   = var.project_id
  direction = "EGRESS"

  allow {
    protocol = "all"
  }

  destination_ranges = ["0.0.0.0/0"]
}

# Cloud NAT for outbound internet access (needed for instances without external IP)
resource "google_compute_router" "runner_router" {
  name    = "${var.network_name}-router"
  region  = var.region
  network = google_compute_network.runner_network.id
  project = var.project_id
}

resource "google_compute_router_nat" "runner_nat" {
  name                               = "${var.network_name}-nat"
  router                             = google_compute_router.runner_router.name
  region                             = var.region
  project                            = var.project_id
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}
