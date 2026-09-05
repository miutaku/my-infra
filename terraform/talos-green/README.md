# Talos production Green infrastructure

Blue RKE2と並行稼働させる本番Green専用rootであり、PoCおよび`terraform/pve`とstateを共有しない。
VM ID `13001`–`13005`、各VMのdisk、両Proxmox nodeの専用ISOだけを管理する。

初回は`start_vms=false`、`boot_from_iso=true`のままlive planを確認する。BSMの
`PACKER_PROXMOX_TOKEN_ID`と`PACKER_PROXMOX_TOKEN_SECRET`から、値を表示せず
`TF_VAR_proxmox_api_token='<id>=<secret>'`を設定する。作成前に
`../../talos/green/scripts/preflight-reservations`が合格していなければapplyしない。

初回install後は`boot_from_iso=false`、クラスタ合格後は`start_vms=true`をGit外の
`terraform.tfvars`へ記録し、bootstrap後は`protect_vms=true`で削除保護する。既存Blue VM、
VM ID `12900`、PCI/USB mapping、Cloudflare、
TrueNAS datasetはこのrootの管理対象外である。
