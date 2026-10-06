# Re:Venter monitoring VMs (PRD OCI tenancy)

Independent my-infra Terraform root. The PRD OKE VCN and public route table are
referenced by ID; this root neither imports nor changes the OKE resources.

- Two `VM.Standard.E2.1.Micro` instances, separate fault domains, 50GB boot each.
- Instances and boot/recovery assets use the dedicated `reventer-observability`
  compartment; shared OKE network assets stay in the original compartment.
  `tenancy_id` is required even before OS maintenance IAM is prepared.
- No extra block volumes; the previous PRD total of 94GB becomes 194GB.
- Dedicated subnet/security list with outbound traffic, SSH restricted to one /32.
- Monitoring APIs bind to loopback, with outbound Cloudflare Tunnel and PDC.
- IMDSv2 only, SSH keys only, encrypted remote state in HCP Terraform workspace
  `miutaku/reventer-observability` (local execution).
- VM destruction is prevented and boot volumes are preserved. Review storage
  usage before any replacement; retained boot volumes count toward the quota.

Inputs are in a gitignored `deployment.auto.tfvars.json`; it contains resource IDs,
admin CIDR and a public SSH key, not private credentials. OCI provider reads the
local `PRD` profile. Run `terraform init`, `terraform validate`, then save and
review a plan before `terraform apply`. Recheck all active/detached boot and block
volumes across compartments before provisioning. Do not use paid shape fallbacks
if free E2 capacity is unavailable.

The two boot volumes leave only 6GB under the 200GB free allocation. OKE node
replacement/burst activity can exceed it. Resizing a volume down is unsupported;
restructuring the existing storage requires a separate migration.

Cloud-init installs Docker/Compose v2 and enables security updates, bounded Docker
logs, and a 2GB swap file to absorb transient initialization memory pressure.
Swap does not make a workload requiring more than 1GB RAM suitable for a micro VM.

Cloudflare Access protects four per-replica endpoints; management APIs are
excluded. Provider-managed credentials live in encrypted remote state and are
installed as collector Secrets in STG/PRD. The deployment script reads sensitive
outputs without printing them. Reconcile Secrets here; do not create a competing
ExternalSecret for the same name.

After initial deployment, install the coordinated peer OS updater described in
`../../observability/reventer/os-update/README.md`. It replaces independent
unattended upgrades with staggered full-LTS updates and boot-volume rollback.
