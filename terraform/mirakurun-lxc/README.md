# Mirakurun LXC

PT3をTalosへPCI passthroughせず、`pve-x570`の標準`earth_pt3` driverで動かすMirakurun専用LXC。
VM 12900とCT 12901を同時にPT3へ接続してはならない。

既存CTを初回だけimportする。

```bash
terraform init
terraform import proxmox_virtual_environment_container.mirakurun pve-x570/12901
terraform plan
```

`TF_VAR_proxmox_api_token`はBWSから実行時に設定し、ファイルへ保存しない。

OS/CTはTerraform、DHCP予約は`ansible/ix2215/dhcp-only.yml`、Mirakurun imageは
`.github/workflows/mirakurun.yml`で管理する。Kubernetes内の
`mirakurun.app-mirakurun.svc.cluster.local`はEndpointSlice経由でこのCTへ接続する。

ホスト再起動後はCT起動前に `/dev/dvb/adapter{0..3}` が揃っている必要がある。
旧VM 12900は`onboot=0`、CT 12901は`onboot=1`とする。
