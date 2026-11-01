# terraform/pve

Proxmox VE 2 ノードクラスタ (`pve-x570` / `pve-b550m`) に VM を作成する Terraform workspace。  
TFC workspace: `pve-home` (organization: `miutaku`)

## 作成される VM

| モジュール | 台数 | 役割 | ノード配置 |
|---|---|---|---|
| `load_balancer` | 2 | 汎用HAProxy + Keepalived LB | 両ノード分散 |
| `prd_rec_server` | 1 | 録画サーバー (pve-x570, PCI passthrough) | pve-x570 固定 |
| `dev_rec_server` | 1 | 開発用録画サーバー (USB passthrough) | pve-b550m 固定 |
| `dev_application_server` | 1 | 開発用アプリサーバー | pve-b550m 固定 |
| `truenas` | 2 | TrueNAS Scale NAS | 両ノード分散 |
| `unifi_os_server` | 1 | UniFi OS Server 専用 VM | pve-x570 固定 |
| `displaylink_kiosk` | 1 | DisplayLink接続のFirefox Kiosk | pve-b550m固定 |
| `pbs` | 1 | Proxmox Backup Server (S3 datastore) | pve-x570 平常時 / 障害時 pve-b550m 手動移行 |

Ubuntu VM は `template-ubuntu-26-04-home-amd64`、TrueNAS VM は `template-truenas-scale-home-amd64`、
PBS VM は `template-debian-13-home-amd64` から clone して作成する。
テンプレートは事前に `packer/` 配下の手順でビルドしておく必要がある。

## PBSの保存先とホスト障害時の復旧

PBSは `pve-x570` に配置する。`scsi0` はOS、`scsi1` は再生成できるS3キャッシュ、
`scsi2` は `hdd` ストレージ上の300GiBの短期バックアップである。
HDDはVMバックアップとZFSレプリケーションから除外する。
`hdd` ストレージは `images` を許可する必要がある。

HDDはホストローカルなので、PBSをそのまま別ノードへ移行することはできない。
HAマネージャによる自動フェイルオーバは設定しない。
ホストを失った場合は、単一の復旧用PBSでIDriveの既存datastoreを引き継いで復元する。
元のPBSが同じS3 datastoreへ接続しないことを保証してから引き継ぐ。
通常のクラウドコピーは日次のため、復旧点は直近の成功した日次同期までとなる。

### PBS 本体の構成

PBS のインストールと S3 datastore の設定は `ansible/pbs` で行う (apply 後)。
PVE クラスタからバックアップ先として使うには、PBS 構築後に PVE `Datacenter` の
storage としてHDD用の `pbs-local` とIDrive復元用の `pbs-home` を使う。手順と入力値は
[ansible/pbs/README.md](../../ansible/pbs/README.md) の「PVE クラスタへの PBS storage 追加」を参照。

## DHCP と IP アドレスの関係

VM は DHCP で IP を取得する (cloud-init による静的 IP 設定はしない)。  
以下の流れで IP を固定する:

```mermaid
flowchart LR
  Apply[terraform apply<br/>VM作成 / MAC確定]
  Output[terraform output<br/>MAC確認]
  IX[ansible/ix2215<br/>DHCP静的リース反映]
  Reboot[VM再起動<br/>固定IP取得]

  Apply --> Output --> IX --> Reboot
```

home-k8s VMのIP/MACは`terraform/home-k8s`で管理する。LB 2台はKubernetes専用ではない
汎用インフラとして`load_balancer` moduleで管理する。

## Ansible inventory

以下は手動管理の静的ファイル (旧 `ansible.tf` の `local_file` による自動生成をやめた):

| ファイル | 内容 |
|---|---|
| `ansible/load-balancer/hosts/prd` | 汎用LB 2台のinventory |
| `ansible/displaylink-kiosk/hosts/prd` | DisplayLink kiosk インベントリ |

VM を追加・変更した場合は `terraform apply` 後に `terraform output` で MAC/IP を確認し、
上記ファイルを手動で編集すること
(HCP Terraform のリモート実行では `local_file` の書き込み先がリモートのサンドボックスになり、
ローカルの作業ディレクトリ/リポジトリには反映されないため、自動生成をやめた)。

## 前提条件

### Proxmox 側

- 2 ノード Proxmox VE クラスタが構築済み (`pve-x570`, `pve-b550m`)
- 各ノードに Proxmox API トークンが作成済み

**API トークン作成手順** (各 PVE ノードの Web UI で実施):
1. `Datacenter` → `Permissions` → `API Tokens` → `Add`
2. User: `root@pam` / Token ID: `terraform` / Privilege Separation: **無効**
3. Secret を控えておく (一度しか表示されない)

- `template-ubuntu-26-04-home-amd64` テンプレートが両ノードに存在すること  
  → 存在しない場合は `packer/ubuntu-26-04/` を参照してビルドする

### TFC 側

TFC workspace `pve-home` に以下の Variables を登録する。

| Variable | Sensitive | 値 |
|---|---|---|
| `pm_api_token_id` | **yes** | `root@pam!terraform` (ノード名は省略) |
| `pm_api_token_secret` | **yes** | API トークン Secret |

> MAC アドレス・VM 台数・IP アドレスは `variables.tf` のデフォルト値を使用。  
> 変更が必要な場合は `variables.tf` を直接編集してコミットする。

## 全体の流れ

```mermaid
flowchart LR
  Packer[packer<br/>テンプレート作成]
  Vars[TFC workspace<br/>Variables登録]
  Terraform[terraform init / plan / apply]
  Outputs[terraform output<br/>MAC確認]
  IX[ansible/ix2215<br/>DHCP静的リース]
  HomeK8s[terraform/home-k8s + talos/home-k8s<br/>home-k8s構成]
  UOS[ansible/uos<br/>UniFi OS Server構成]

  Packer --> Vars --> Terraform --> Outputs --> IX
  IX --> HomeK8s
  IX --> UOS
```

## セットアップ

```bash
cd terraform/pve
terraform login  # TFC トークンを対話入力 (初回のみ)
terraform init
```

## plan / apply

```bash
terraform fmt
terraform validate
terraform plan
terraform apply
```

> `terraform apply` は TFC 上で実行される。TFC UI で `Confirm & Apply` する。

### DisplayLink Kiosk

`displaylink_kiosk` は `pve-b550m` に接続した Proxmox USB mapping `displaylink` を
VMへパススルーする。OS内のGUI、DisplayLinkドライバー、自動ログイン、Firefox Kioskは
Terraform適用後に [ansible/displaylink-kiosk/README.md](../../ansible/displaylink-kiosk/README.md)
のplaybookで設定する。

## apply 後: MAC アドレスの確認

```bash
terraform -chdir=../home-k8s output -json nodes
terraform output -json unifi_os_server_mac_addresses
```

出力された MAC アドレスを `ansible/ix2215/group_vars/all.yml` の
`ix_dhcp_profiles[].fixed_assignments` に記載する。

## VM を追加・変更したいとき

1. `variables.tf` で VM 台数や MAC アドレスを変更する
2. `main.tf` でモジュール設定を変更する
3. `terraform plan` で差分を確認してから `terraform apply`

新しい VM 用の DHCP 静的リースも `ansible/ix2215/group_vars/all.yml` に追加すること。

## トラブルシューティング

### テンプレートが見つからない

```
Error: ... clone: template "template-ubuntu-26-04-home-amd64" not found
```

`packer/ubuntu-26-04/` の手順でテンプレートをビルドする。  
テンプレートは両 Proxmox ノードに存在する必要がある (片方だけでは分散配置時にエラー)。

### VM が起動しない / IP が取得できない

1. `ansible/ix2215/` の DHCP 静的リースが正しく設定されているか確認
2. IX2215 コンソールで `show ip dhcp binding` を実行してリースが有効か確認
3. PVE Web UI でコンソール接続し、DHCP リクエストのログを確認

### PCI passthrough エラー (prd_rec_server)

録画サーバーは `pve-x570` に固定で PCI デバイス (PT3 チューナー) をパススルーしている。  
PCI passthrough には IOMMU の設定が必要。設定済みでない場合は `pve-x570` の BIOS で  
VT-d または AMD-V + IOMMU を有効にし、カーネルパラメータを設定する。
