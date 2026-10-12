# Environment isolation

STG and PRD have matching independent monitoring topologies. Each OKE sends metrics
and logs over its local VCN to its own two monitoring VMs. There is no environment
forwarding, shared collector, remote query gateway or Cloudflare monitoring ingress.
SQL exporters and retention jobs run in their matching OKE only. Same-environment
query failover and coordinated OS maintenance use peer private IPs.

Grafana requires separate STG/PRD PDC networks. Use the corresponding BSM tokens
`STG_REVENTER_GRAFANA_PDC_TOKEN` and `PRD_REVENTER_GRAFANA_PDC_TOKEN`, and assign each
environment's two data sources to its network. Each agent resolves and permits only
its environment's Metrics/Logs aliases. The deployment script will not fall back
to the old shared PDC token. If no environment token is configured, PDC stays stopped.

Validate both replicas' private health, collector freshness, log canaries,
`vmagent`/Fluent Bit queues, query failover and the OS maintenance `--check`.
Check that neither VM has remote-query/tunnel containers, no collector references
Cloudflare credentials, and neither OKE holds another environment's SQL DSN.
Preserve storage history when changing the monitoring topology.

OS maintenance: [os-update/README.md](os-update/README.md).
