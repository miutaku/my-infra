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
`ansible/mirakurun-lxc/bootstrap.yml`がPVEへ`ensure-earth-pt3.service`を
導入し、CT 12901より前にPCI `0000:05:00.0`を`earth_pt3`へbindして全12 nodeを検証する。

LXC内ではMirakurunをDockerで動かすため、ProxmoxからCTへの`device_passthrough`
だけでなく、Dockerコンテナにも`/dev/dvb`を明示的に渡す。APIの
`isAvailable`はアイドル時のdevice openを保証しないため、デプロイ後の合格条件は
GR/BS双方のstream endpointからTS packetを受信できることとする。

初回だけProxmoxホストから次を実行し、強制コマンド付きの専用アカウントをCTへ
投入する。公開鍵はBWSの`MIRAKURUN_LXC_ADMIN_SSH_PUBLIC_KEY`から渡し、以後の
状態確認とDVB修復は`Mirakurun LXC manage` workflowを使う。

```bash
MIRAKURUN_ADMIN_PUBLIC_KEY="$(bws secret list | jq -er '.[] | select(.key == "MIRAKURUN_LXC_ADMIN_SSH_PUBLIC_KEY") | .value')" \
  ansible-playbook -i ansible/mirakurun-lxc/hosts.yml ansible/mirakurun-lxc/bootstrap.yml
```
