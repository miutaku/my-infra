# Loockit LXC

LoockitをTalos kernelから分離し、pve-x570のBluetooth adapterを排他的に使うLXC。

Bluetooth HCIとBlueZはProxmox hostが所有する。`xdg-dbus-proxy`で`org.bluez`だけを許可した
D-Bus socketを非特権LXCへread-only bindし、Loockit OCIから利用する。LXCへraw USB device、
host network、特権を渡さない。

```bash
terraform init
terraform plan
terraform apply
```

APIはLANへ無制限公開せず、Greenのselectorless Service/EndpointSliceから接続する。
