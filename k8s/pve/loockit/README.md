# loockit

loockit runs on RKE2 nodes labeled `hardware.miutaku/bluetooth=true` and
`loockit.miutaku/receiver=true`. In production these are worker-01 on pve-x570
and worker-02 on pve-b550m, each with the Proxmox USB mapping
`loockit_bluetooth` passed through.
The Ansible `bluetooth_node` role installs and enables BlueZ on every host with
`bluetooth_controller=true`.

The REST and gRPC APIs have no built-in authentication. The Service is therefore
`ClusterIP` only, and the pod does not use `hostNetwork` (Bluetooth works through
the mounted host D-Bus socket). Do not expose it with a LoadBalancer or Ingress
without adding an authenticated proxy.

The deployment reads these entries from Bitwarden Secrets Manager through an
ExternalSecret:

- `LOOCKIT_INTERCOM_BOT_SECRET_KEY`
- `LOOCKIT_INTERCOM_BOT_PUBLIC_KEY`

They are materialized as the `loockit-keys` Kubernetes Secret and injected as
environment variables. Never store their values in Git.
