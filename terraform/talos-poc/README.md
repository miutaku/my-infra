# Talos PoC infrastructure

このTerraform rootは、現行`terraform/pve`のTerraform Cloud workspaceとstateを共有しない。
作成対象はVM ID `13001`/`13002`、各node上のTalos ISO、PoC VMのdiskだけである。

初期値では`start_vms=false`のため、`apply`してもVMは停止状態で作成される。`boot_from_iso=true`で
ISOを有効化し、初回起動時だけ`ide2`を優先する。Gate 0合格とIX2215の固定DHCP lease反映後だけ
`-var=start_vms=true`を使用する。

## 予約値

| role | Proxmox | VM ID | MAC | IPv4 |
|---|---|---:|---|---|
| control plane | `pve-x570` | 13001 | `02:54:00:13:00:01` | `192.168.20.137` |
| worker | `pve-b550m` | 13002 | `02:54:00:13:00:02` | `192.168.20.138` |
| MetalLB test | - | - | - | `192.168.20.228` |

2026-08-30にGit、Proxmox cluster、VLAN 20のARPで未使用を確認した。作成直前にも再確認する。

```bash
../../talos/poc/scripts/preflight-reservations
```

## 認証

`proxmox_api_token`はtfvarsやGitへ保存しない。既存BSMの`PACKER_PROXMOX_TOKEN_ID`と
`PACKER_PROXMOX_TOKEN_SECRET`から次の形式で環境変数へ渡す。

```bash
export TF_VAR_proxmox_api_token='<user@realm!token>=<secret>'
```

## Plan

```bash
cd terraform/talos-poc
terraform init
terraform validate
terraform plan -out=talos-poc.tfplan
terraform show talos-poc.tfplan
```

初回install後は、停止または安全なreboot条件を確認してdisk優先へ変更する。

```bash
terraform plan -var=boot_from_iso=false -out=boot-from-disk.tfplan
terraform apply boot-from-disk.tfplan
```

install完了後のローカル作業環境では、Git管理外の`terraform.tfvars`へ現在のlifecycle stateを保存する。
これにより引数なしの次回planがVM停止/ISO優先への巻き戻しを提案しない。新規checkoutでは安全な初期値
`start_vms=false`、`boot_from_iso=true`が維持される。

```hcl
start_vms     = true
boot_from_iso = false
```

実API planには有効なBSM Machine Accountから取得したProxmox API tokenを使う。root権限の一時tokenを
自動生成してはならない。認証が利用できない場合はdummy tokenと`-refresh=false`を使うことで構文上の
作成対象だけを確認できるが、live planの代用にはならない。

planの対象が次だけであることを確認する。

- Talos ISO 2個
- 停止状態のPoC VM 2台
- 既存VM、RKE2、network、storageのupdate/replace/deleteが0

## Cleanup

不要になった時点または本移行後に、先にTalos試験結果をプロジェクト文書へ保存してから実行する。

```bash
terraform destroy
```

VM、disk、ISOがProxmoxから消えたことを確認した後、`.state`、`.terraform`、plan fileを削除し、
移行文書のPoC資源台帳へ削除証跡を記録する。固定DHCP leaseとMetalLB予約も同時に削除する。
