# PRD Re:Venter monitoring VMs

Two independent storage VMs in the PRD OKE VCN, on a dedicated monitoring subnet.
Metrics and logs are duplicated across both replicas in this environment only.
Storage binds to loopback and the VM private IP, never its public IP. The NSG
permits TCP 18428/19428 only from the OKE worker subnet and the monitoring peer NSG.
The public IP remains for administrator SSH; it is not an ingestion endpoint.
No peering, remote environment query gateway, Cloudflare Tunnel, Access service
token or public monitoring DNS is used.

Terraform preserves instances and boot volumes. Review a saved plan before apply;
network changes must not replace VMs or storage. Existing OS-update IAM, peer SSH,
coordinated maintenance and fault-domain separation remain in effect.
Deployment input files and state/plan exports contain sensitive data and must
remain untracked. Use `scripts/deploy-reventer-observability.py --environment prd`.

Grafana uses the environment-specific PDC network. Store its agent token in BSM as
`PRD_REVENTER_GRAFANA_PDC_TOKEN`, then deploy with `--enable-pdc`. Configure both
of this environment's Grafana data sources to use that network. Agents permit only
`victoria-metrics-prd.reventer-monitoring.svc.cluster.local:8428` and
`victoria-logs-prd.reventer-monitoring.svc.cluster.local:9428`.
