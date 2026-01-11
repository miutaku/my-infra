output "runner_instance_name" {
  description = "The name of the GCE runner instance."
  value       = module.reventer_runner.runner_instance_name
}

output "runner_instance_zone" {
  description = "The zone of the GCE runner instance."
  value       = module.reventer_runner.runner_instance_zone
}

output "runner_internal_ip" {
  description = "The internal IP address of the runner."
  value       = module.reventer_runner.runner_internal_ip
}

output "nat_external_ip" {
  description = "The static external IP for outbound traffic (for whitelisting)."
  value       = module.reventer_runner.nat_external_ip
}
