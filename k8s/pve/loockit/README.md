# loockit

loockit runs on any RKE2 node labeled `hardware.miutaku/bluetooth=true`.
The Ansible `bluetooth_node` role installs and enables BlueZ on every host with
`bluetooth_controller=true`; the deployment is not pinned to a hostname or CPU
architecture.

The REST and gRPC APIs have no built-in authentication. The Service is therefore
`ClusterIP` only, and the pod does not use `hostNetwork` (Bluetooth works through
the mounted host D-Bus socket). Do not expose it with a LoadBalancer or Ingress
without adding an authenticated proxy.

Before enabling the deployment, create these two Bitwarden Secrets Manager
entries:

- `LOOCKIT_INTERCOM_BOT_SECRET_KEY`
- `LOOCKIT_INTERCOM_BOT_PUBLIC_KEY`

Then rename `secret.externalsecret.yaml.example` to `secret.yaml`, add it to
`kustomization.yaml`, and change `spec.replicas` in `deployment.yaml` from `0`
to `1`. Keeping the ExternalSecret out of the active resources until both
entries exist prevents a missing credential from degrading the Argo CD app.
