# Talos home-k8s production infrastructure

home-k8s本番クラスタ専用rootであり、`terraform/pve`とstateを共有しない。
VM ID `13001`–`13005`、各VMのdisk、両Proxmox nodeの専用ISOだけを管理する。

PVE workerは常駐workloadと最大10台のRe:Venter Actions runnerを収容する。
worker-01は16 vCPU / 20GiB、worker-02は8 vCPU / 20GiBとし、両workerのdiskは
並列Docker buildの一時layer用に96GiBを確保する。control planeのdiskは24GiBとする。
CPU・memoryの変更はVMを1台ずつ正常停止・起動して反映し、各nodeのReady復帰と
Node Allocatableを確認してから次のVMを変更する。Proxmox上のpending設定だけでは
稼働中のTalos・Kubernetesの容量は増えない。

初回は`start_vms=false`、`boot_from_iso=true`のままlive planを確認する。BSMの
`PACKER_PROXMOX_TOKEN_ID`と`PACKER_PROXMOX_TOKEN_SECRET`から、値を表示せず
`TF_VAR_proxmox_api_token='<id>=<secret>'`を設定する。作成前にIX2215のDHCP予約と
VM ID、MAC address、IP addressが`main.tf`と一致することを確認する。

初回install後は`boot_from_iso=false`、クラスタ合格後は`start_vms=true`をGit外の
`terraform.tfvars`へ記録し、bootstrap後は`protect_vms=true`で削除保護する。VM ID `12900`、
PCI/USB mapping、Cloudflare、
TrueNAS datasetはこのrootの管理対象外である。
