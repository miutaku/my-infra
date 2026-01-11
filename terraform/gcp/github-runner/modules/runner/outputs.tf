output "runner_instance_name" {
  description = "The name of the GCE runner instance."
  value       = google_compute_instance.github_runner.name
}

output "runner_instance_zone" {
  description = "The zone of the GCE runner instance."
  value       = google_compute_instance.github_runner.zone
}

output "runner_internal_ip" {
  description = "The internal IP address of the runner."
  value       = google_compute_instance.github_runner.network_interface[0].network_ip
}

output "runner_service_account" {
  description = "The service account email used by the runner."
  value       = google_service_account.runner_sa.email
}

output "network_name" {
  description = "The name of the VPC network."
  value       = google_compute_network.runner_network.name
}

output "nat_external_ip" {
  description = "The static external IP address for outbound traffic (for whitelisting)."
  value       = google_compute_address.nat_ip.address
}
