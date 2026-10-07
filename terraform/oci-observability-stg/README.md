# STG Re:Venter monitoring

Dedicated STG OCI tenancy deployment; encrypted state in
`miutaku/reventer-observability-stg` with local execution and the `STG` OCI profile.
Two E2 Micro VMs, different fault domains, 50GB boot each, isolated maintenance
compartment and instance-principal rollback permissions. Existing OKE networking
is referenced, not managed here. Workers use 50GB boot each after sequential
replacement, so total tenancy storage is 200GB. Temporary recovery charges are
authorized; do not permanently leave retired or detached volumes behind.

Private `*.auto.tfvars.json` inputs must never be committed. Review saved plans
before apply. Use deployment/maintenance scripts with `--environment stg`.
Images, retention and memory bounds are shared in `observability/reventer`.
STG ingest uses `metrics-stg-ha-{01,02}.re-venter.com` and
`logs-stg-ha-{01,02}.re-venter.com`, with a separate Access service token and the
`monitoring-stg-ha-access-token` collector Secret.

Only STG data is stored here. The second environment query gateway forwards
read-only Grafana requests directly to PRD; it does not persist PRD data.
The existing PDC network may choose any agent, so every agent resolves both
sets of DNS aliases consistently. STG Grafana URLs:

- `http://victoria-metrics-stg.reventer-monitoring.svc.cluster.local:8428`
- `http://victoria-logs-stg.reventer-monitoring.svc.cluster.local:9428`

Each environment retains its own two storage replicas and independent peer
OS maintenance, freshness checks, boot rollback and history catch-up.
