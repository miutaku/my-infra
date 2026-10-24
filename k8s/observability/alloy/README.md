# Grafana Cloud minimal secondary copy

VictoriaMetrics/VictoriaLogs remain the primary archive. Alloy runs in both OKE
environments and sends only the following secondary copy to Grafana Cloud:

| Class | Cloud copy | Primary archive |
| --- | --- | --- |
| Critical metrics | target availability, CPU/memory/disk/network health, reconcile errors/queue depth, certificate status, autoscaler failures, HTTP traffic/SLO | Existing vmagent plus the controller collection below |
| Short-retention diagnostics | process memory/CPU/start time, goroutine count, scrape and forwarding health | Existing application vmagent; controller metrics retained by Alloy |
| Controller histograms/runtime detail | Not sent | Alloy to both environment-local VictoriaMetrics replicas |
| HTTP histogram | Only `le=0.1,0.5,1,5,+Inf`, plus sum/count | Full histogram via existing vmagent |
| Application logs | Explicit critical/fatal/panic/emerg/emergency/alert only | Existing Fluent Bit continues sending **all application** logs to both VictoriaLogs replicas |
| System logs | Same critical subset | Alloy sends critical events to both local replicas; no duplicate application copy |

Cloud retention follows the Cloud plan; this configuration does not create a
per-metric TTL. No dashboards, alert rules, recording rules, PDC configuration or
primary collectors are deleted or repointed by this rollout.

## Ownership and routing

- `k8s/oci/argocd-apps/grafana-alloy.yaml`: STG Argo CD Application.
- `k8s/oci-prd/argocd-apps/grafana-alloy.yaml`: PRD Application, managed by STG Argo CD.
- `base/config.alloy`: common policy, loaded from the generated ConfigMap.
- `overlays/{stg,prd}`: independent VCN endpoints and `cluster`/`env` labels.
- `values.yaml`: pinned existing chart/image, resource limits, no privileged mode
  or host mounts. The existing host-network node-exporter supplies host metrics.

Each DaemonSet member discovers only Pods on its own node using an API field
selector. Adding nodes does not make every Alloy scrape every cluster target.
Annotation discovery selects a declared metrics port (or a port-less autoscaler),
and copies namespace/Pod/node metadata for diagnosis. These labels distinguish
environment and replicas; they must not be removed to merge unrelated series.

The local controller branch is limited to `nginx-gateway`, `cert-manager`, and
`kube-system`. Application metrics are already archived by vmagent, so Alloy does
not create a second application job in VictoriaMetrics. Both local writers have
independent WAL queues and do not share the Cloud filter. Self-health is also
retained in both local replicas.

## Credentials and log classification

ExternalSecret `monitoring/grafana-cloud-credentials` reads connection information
from BSM. `GRAFANA_CLOUD_LOGS_URL` and `GRAFANA_CLOUD_LOGS_USERNAME` are taken from
the existing hosted Logs data source. The existing ingestion password was verified
to permit a harmless Logs write; both password environment variables reference
`GRAFANA_CLOUD_METRICS_PASSWORD`. Token rotation must retain metrics:write and
logs:write scopes. Credentials never belong in Git or diagnostic output.

Log classification uses structured `severity`, `severity_text`, or `level`,
case-insensitively. Re:Venter's exact `msg="panic recovered"` event is critical;
`Fatal`/`Fatalf` preserve `level=error` and add `severity=fatal`. Native `panic:`
and explicit `CRITICAL:`/`FATAL:`-style prefixes are also recognized. Ordinary
errors, warnings, access logs, unclassified lines, and words merely appearing in
message text are excluded. JSON stack fields stay on their event; subsequent
unstructured stack lines remain only in the full VictoriaLogs archive.

No request/user IDs or arbitrary message fields become Loki index labels. The
Cloud log labels are job, cluster, env, namespace, Pod, container, and severity.
The file-reader test fixture may add a filename label; production uses the Pod API.

## Validation and rollout

```sh
python3 scripts/test-grafana-alloy.py
kubectl kustomize k8s/observability/alloy/overlays/stg
kubectl kustomize k8s/observability/alloy/overlays/prd
```

The integration test runs the pinned real Alloy image against local Prometheus
and Loki receivers. It verifies actual remote-write payloads, local full-fidelity
controller copies, Cloud exclusions/SLO buckets, and positive/negative severity
fixtures. It requires Docker and libsnappy, and never uses production credentials.

Roll out STG first and verify controller buckets in **both** VictoriaMetrics
replicas, then PRD. Existing metrics history and the Fluent Bit pipeline stay in
place. Confirm `up` for all intended targets and zero writer failures/pending
backlog before considering this complete. Preserve old Git revision/config for a
revert if a primary copy fails. Alloy storage remains the chart's ephemeral WAL:
Pod replacement can lose an unsent secondary copy; the independent primary
collectors continue archiving applications/logs.

Use `grafanacloud-usage` for actual quota monitoring:

```promql
grafanacloud_instance_active_series
max_over_time(grafanacloud_instance_active_series[7d])
60 * grafanacloud_instance_samples_per_second
```

Aim for normal usage below 5,000 and rollout peaks below 7,000 across **both**
environments. Old/new label sets coexist during transition; allow at least the
Cloud active-series window (20 minutes) before interpreting the reduction. Monthly
billable usage retains prior high-water history and does not immediately reset.

PDC recovery and the 69 Cloud recording rules/55 integration alerts are separate
follow-up work. Repointing recording-rule inputs alone does not change their Cloud
output destination. Do not use those currently incomplete integration rules as
evidence that the primary monitoring path is healthy.
