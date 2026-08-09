# loockit

loockit runs on any RKE2 node labeled `hardware.miutaku/bluetooth=true`.
The Ansible `bluetooth_node` role installs and enables BlueZ on every host with
`bluetooth_controller=true`; the deployment is not pinned to a hostname or CPU
architecture.

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
