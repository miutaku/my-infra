# Re:Venter GitOps on Talos

Activated on 2026-10-06 (JST). All six Applications are automated and
Synced/Healthy; the old Re:Venter application controllers, ImageUpdaters and
notification controllers are scaled to zero for rollback. The existing Talos Argo CD
(`argocd-home-k8s.miutaku.work`) will manage Re:Venter STG and PRD. Applications
and ImageUpdater configuration belong to my-infra; application manifests and
image digest write-back remain in miutaku/reventer.

| Application | Destination | Source path in reventer |
| --- | --- | --- |
| reventer-stg | oke-stg | infrastructure/k8s/stg |
| reventer-admin-prd | oke-stg | infrastructure/k8s/admin-prd |
| reventer-monitoring | oke-stg | infrastructure/k8s/monitoring |
| reventer-prd | oke-prd | infrastructure/k8s/prd |
| reventer-monitoring-prd | oke-prd | infrastructure/k8s/monitoring-prd |
| argo-rollouts-prd | oke-prd | argo-rollouts Helm chart |

## Credential bootstrap requiring explicit approval

The bootstrap script creates a dedicated `talos-reventer-argocd` service account
and cluster-admin binding in each OCI cluster. Its persistent service-account
token and CA are registered as Argo CD cluster Secrets in Talos. The script also
copies the existing writable SSH deploy key from STG into Talos in memory.
Secrets are never printed or written into the repository.

The broader permissions cover existing cluster-scoped resources: metrics-server,
Cluster Autoscaler, monitoring RBAC and the Rollouts CRDs/controller. A purely
namespaced deployer cannot reconcile all six current Applications. A narrower
RBAC design requires separating these cluster-scoped resources into another
infrastructure Application before the handover. AppProject destination limits
constrain Re:Venter Applications, but are not a substitute for Kubernetes RBAC.

After explicit approval, run:

```sh
python3 scripts/bootstrap-reventer-talos.py \
  --approve-cluster-admin --approve-deploy-key-transfer
```

These bootstrap credentials are not managed by Git. Repeat the script to restore
them. To rotate tokens, replace the dedicated service-account-token Secret on the
remote cluster and rerun the script. Do not remove the accounts or bindings while
Talos manages these clusters. Revoke obsolete credentials when retiring an old
installation, only after confirming they are not shared by the OCI infrastructure
Argo CD.

External Secrets uses the existing Talos Bitwarden SDK, bootstrap token and CA.
The added `bitwarden-reventer-stg` store selects the Re:Venter project. GHCR and
Discord credentials retain their existing Bitwarden keys. Verify the Talos
bootstrap token can read that project before the controller handover.

## Handover

1. Register remote clusters and repository credentials. Publish the staged
   Applications with `automated.enabled: false`. The new ImageUpdater is
   deliberately excluded from kustomization until cutover.
2. Confirm repository and remote-cluster connectivity. Inspect live diffs and
   save old Application specs/controller replica counts in a private backup.
3. Pause the two old Re:Venter application controllers and ImageUpdaters. Keep
   OCI's shared `argocd` running; it manages unrelated infrastructure.
4. Set the six Applications' `automated.enabled: true`, add `image-updater.yaml`
   to kustomization, then publish. Confirm all six Applications are
   Synced/Healthy, image digest write-back works and workloads remain available.
5. Retire the old Re:Venter installs only after confirmation. Do not cascade-delete
   old Applications, namespaces or storage during this handover.

Rollback: disable Talos automatic sync and ImageUpdater first, then restore old
controllers and Application specs. Never run both ImageUpdaters concurrently.
