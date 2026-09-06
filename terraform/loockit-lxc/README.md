# Loockit LXC

LoockitをTalos kernelから分離し、各Proxmox hostのBluetooth adapterを使うHA LXC。

| host | CT | IP | role |
|---|---:|---|---|
| pve-x570 | 12902 | 192.168.20.133 | Lease leaderまたはstandby |
| pve-b550m | 12903 | 192.168.20.134 | Lease leaderまたはstandby |

Bluetooth HCIとBlueZはProxmox hostが所有する。`xdg-dbus-proxy`で`org.bluez`だけを許可した
D-Bus socketを非特権LXCへread-only bindし、Loockit OCIから利用する。LXCへraw USB device、
host network、特権を渡さない。

```bash
terraform init
terraform plan
terraform apply
```

APIはLANへ無制限公開せず、Green内の2 replica HAProxy Serviceから、`/readyz`が200の
Lease leaderだけへ転送する。
