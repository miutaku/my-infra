# Re:Venter monitoring HA on two OCI AMD micro VMs

Status: design prepared; not provisioned. Execute after the Talos Argo CD handover.

## Placement and storage

Use two VM.Standard.E2.1.Micro instances in the PRD tenancy's home region,
ap-tokyo-1. Place them in different fault domains if available. Each has a 50GB
boot volume; store monitoring data on that volume, with no additional block
volume. The last OCI inventory was 94GB in PRD, so the projected total is 194GB.
Recheck all active and detached volumes across compartments immediately before
creation. Do not launch if the total would exceed 200GB, if two E2 micro slots
are unavailable, or if only paid shapes are available. Capacity is not reserved.

Existing STG volumes total 300GB. This design adds no STG volumes. It does not
resolve that pre-existing excess. A later OKE node replacement or burst scale-up
can consume the remaining PRD capacity; reserve the new boot volumes in the
storage budget before changing OKE node pools.

## Data path

Both VMs run identical single-node VictoriaMetrics and VictoriaLogs instances,
with independent data directories on their own boot volumes. Preserve the current
Metrics retention of three months and Logs retention of 30 days, subject to
measured disk growth and a free-space reserve. Do not use a shared writable
volume or rely on VM-to-VM automatic storage synchronization.

Metrics: STG/PRD vmagent sends the same samples to both explicitly named VM
endpoints (two remoteWrite URLs, no sharding). STG currently scrapes within the
VictoriaMetrics server, so move that scrape configuration into vmagent first.
Keep SQL exporter jobs, labels, and retention CronJob connectivity intact.

Logs: STG/PRD collectors send into vlagent with two independent remoteWrite URLs.
Preserve the existing structured log fields and stream labels. Give each remote
URL a persistent, bounded disk queue; size it from log rate and the tolerated
outage period. A shared ingress URL that randomly chooses one VM is insufficient:
it would distribute records instead of producing two complete copies.

Provision distinct authenticated ingestion endpoints for VM01 and VM02. Preserve
Cloudflare Access protection and do not publicly expose VictoriaMetrics/Logs
administrative APIs. Each VM has its own Tunnel identity/endpoints, so a request
to VM01 cannot silently land on VM02 through tunnel load balancing. Collectors
must retain data during destination outages within their configured queue budget.

## One logical datasource per service in Grafana

Each VM runs vmauth and an identically configured Grafana PDC agent for the
Re:Venter PDC network. The agents connect independently. Grafana PDC balances
across connected agents and reroutes traffic when an agent disconnects.

Use the same read endpoint address as resolved by each PDC agent, for example:

- Metrics datasource: http://127.0.0.1:8427/metrics/
- Logs datasource: http://127.0.0.1:8427/logs/

The vmauth route strips the first path component and forwards to the corresponding
service. Its backend list contains the local service first and the authenticated
peer endpoint second. Use first_available and retries on 500/502/503/504. Restrict
Grafana routes to read/query APIs; do not expose deletion, reload, import, or
write endpoints through the datasource proxy. Each VM must be able to reach the
peer's endpoint without relying on the STG cluster.

This keeps one datasource UID for Metrics and one for Logs. Existing dashboards
and alerts keep those UIDs; update their URLs/PDC selection once at cutover.
Two PDC agents meet the single-VM failure objective, although Grafana recommends
at least three agents for production.

## Migration and validation

1. Benchmark each micro VM with the current ingestion rate and representative
   dashboards/log searches. Current observed memory was ~323MiB for Metrics and
   ~102MiB for Logs; include OS, vmauth, Tunnel and PDC memory in the 1GB budget.
   Confirm behavior during merges and concurrent queries. Cap query concurrency,
   retention growth and persistent queue usage. Do not claim 1GB suitability
   from idle measurements alone.
2. Enable dual writing while existing storage continues serving Grafana. Backfill
   historical Metrics and Logs into both new replicas using their supported
   export/import or snapshot procedures. Validate label and timestamp parity.
   Future dual writing does not copy existing history automatically.
3. Verify both replicas contain the intended time range and fresh data. Update
   existing Grafana datasource URLs without changing datasource UIDs.
4. Stop VM01: verify read continuity, new writes to VM02, and queued data for
   VM01. Restore VM01 and verify queue drain and record/time-series parity.
5. Repeat for VM02. Also stop only a storage process while leaving PDC running:
   validate vmauth's peer fallback. Verify all-destinations-down behavior and
   clearly measure RPO/RTO; buffering and PDC reconnects are not zero-loss or
   zero-time guarantees.
6. After validation, remove old STG storage from the active data path. Take
   restorable backups before deleting old PVCs/volumes; deletion is a separate
   destructive step. Retention CronJob must use the new logical Logs endpoint.

Recovery after a VM's disk is destroyed requires reseeding its historical data
from a surviving replica or backup; ingestion queues alone cannot restore older
history. Never re-add an empty replica as a preferred query backend before the
history and freshness checks pass. Do not load-balance queries across a stale
replica merely because its health endpoint responds.

## Sources

- OCI free resources: https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
- Metrics HA: https://docs.victoriametrics.com/victoriametrics/#high-availability
- Logs replication: https://docs.victoriametrics.com/victorialogs/vlagent/#replication-and-high-availability
- Read proxy/failover: https://docs.victoriametrics.com/victoriametrics/vmauth/
- PDC HA: https://grafana.com/docs/grafana-cloud/observe-and-act/connect-externally-hosted/private-data-source-connect/configure-pdc/#high-availability
