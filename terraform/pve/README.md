# terraform/pve

Proxmox VE 2 ノードクラスタ (`pve-x570` / `pve-b550m`) に VM を作成する Terraform workspace。  
TFC workspace: `pve-home` (organization: `miutaku`)

## 作成される VM

| モジュール | 台数 | 役割 | ノード配置 |
|---|---|---|---|
| `rke2_lb` | 2 | HAProxy + Keepalived (RKE2 LB) | 両ノード分散 |
| `rke2_server` | 3 | RKE2 コントロールプレーン (etcd) | 両ノード分散 |
| `rke2_worker` | 2 | RKE2 ワーカー | 両ノード分散 |
| `prd_rec_server` | 1 | 録画サーバー (pve-x570, PCI passthrough) | pve-x570 固定 |
| `dev_rec_server` | 1 | 開発用録画サーバー (USB passthrough) | pve-b550m 固定 |
| `dev_application_server` | 1 | 開発用アプリサーバー | pve-b550m 固定 |
| `truenas` | 2 | TrueNAS Scale NAS | 両ノード分散 |
| `unifi_os_server` | 1 | UniFi OS Server 専用 VM | pve-x570 固定 |
| `magic_mirror_server` | 0 | 旧 MagicMirror² 表示 VM (k8s へ移行済み) | 作成しない |
| `pbs` | 1 | Proxmox Backup Server (S3 datastore) | pve-x570 平常時 / 障害時 pve-b550m 手動移行 |

Ubuntu VM は `template-ubuntu-26-04-home-amd64`、TrueNAS VM は `template-truenas-scale-home-amd64`、
PBS VM は `template-debian-13-home-amd64` から clone して作成する。
テンプレートは事前に `packer/` 配下の手順でビルドしておく必要がある。

## PBS の HA (ZFS レプリケーション + 手動フェイルオーバ)

PBS VM は「片ノード停止時に対向ノードへ数十秒で移せる」ことを目標にしているが、
**HA マネージャ (自動フェイルオーバ) は使わない**。理由と設計は以下のとおり。

- 2 ノードクラスタはクォーラム (3 票目) がなく、片ノード停止時に survivor が
  quorum を失うため HA の fencing/自動再起動が成立しない (QDevice 未導入の方針)。
- バックアップ実体は **S3 互換オブジェクトストレージ datastore** に置くため、PBS VM は
  ほぼステートレス (OS + PBS 設定のみ)。OS ディスクは小容量 (32G) で `local-zfs` に置く。
- そのため **pvesr による ZFS レプリケーション**で OS ディスクを対向ノードへ定期複製し、
  ノード障害時は **手動で対向ノードから起動**する (数十秒のダウンタイム)。
- アクティブ-アクティブ (両ノード同時稼働) は PBS が同一 datastore の同時マウントを
  許さないため不可。単一 VM + レプリケーション + 手動マイグレーションが安定解。

> レプリケーションジョブは telmate provider では表現できないため Terraform 管理外。
> `terraform apply` で VM 作成後、以下を一度だけ設定する。

### レプリケーションジョブの設定 (apply 後に一度)

PVE Web UI: 対象 VM → `Replication` → `Add` でも可。CLI なら稼働ノード (pve-x570) で:

```bash
# 1. S3 キャッシュ (scsi1) はレプリ除外 (S3 から再生成可能・churn が大きいため)。
#    現在の scsi1 ボリューム指定を確認してから replicate=0 を付与する。
qm config 14001 | grep '^scsi1:'
qm set 14001 --scsi1 <上で確認した volume>,replicate=0

# 2. OS ディスク (scsi0) のみを pve-b550m へ 5 分間隔でレプリケーション
pvesr create-local-job 14001-0 pve-b550m --schedule '*/5' --rate 50
pvesr list
pvesr status
```

### ノード障害時の手動フェイルオーバ手順

平常時の稼働ノード (pve-x570) がダウンしたら、生存ノード (pve-b550m) で:

```bash
# 1. レプリカから VM を生存ノードへ移管 (停止中ノードからの移動を許可)
qm migrate 14001 pve-b550m --online 0   # 平常時の計画移行はこちら

# --- 稼働ノードが死んでいて上記が使えない場合 ---
# 2. レプリケーション済みディスクを使って生存ノード側に構成を引き受けさせる
#    (PVE のドキュメント "Recovery from replicated state" の手順に従う)
ha-manager / pvesr の状態を確認のうえ、生存ノードで `qm start 14001` する
```

> 計画的なメンテナンス時は `qm migrate 14001 <node>` でライブ/オフライン移行できる。
> 突発障害時はレプリカ (最後の複製時点) から起動するため、最大でレプリケーション間隔
> (上記設定なら 5 分) 分の差分が失われうるが、バックアップ実体は S3 にあるため影響は軽微。

### PBS 本体の構成

PBS のインストールと S3 datastore の設定は `ansible/pbs` で行う (apply 後)。
PVE クラスタからバックアップ先として使うには、PBS 構築後に PVE `Datacenter` の
storage として `pbs-home` を追加する。手順と入力値は
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

`variables.tf` の `rke2_lb_ips` / `rke2_server_ips` / `rke2_worker_ips` には  
DHCP 静的リースで割り当てる予定の IP を設定する。これらは Ansible inventory 生成に使われる。

## Ansible inventory の自動生成

`terraform apply` 後、`ansible.tf` が以下のファイルを自動生成する:

| 生成先ファイル | 内容 |
|---|---|
| `ansible/rke2/hosts/prd` | RKE2 Ansible インベントリ (INI 形式) |
| `ansible/rke2/group_vars/prd-all.yml` | LB VIP・HAProxy サーバー一覧 |

生成後は GitHub Actions が変更を自動コミット (`chore(ansible): auto-update RKE2 inventory from terraform output`)。  
**これらのファイルは直接編集しないこと。**

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
  RKE2[ansible/rke2<br/>RKE2構成]
  UOS[ansible/uos<br/>UniFi OS Server構成]

  Packer --> Vars --> Terraform --> Outputs --> IX
  IX --> RKE2
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

### 旧 magic_mirror_server を再作成する場合

MagicMirror² は `k8s/pve/magic-mirror` で動かすため、既定では `mm_server_vm_count = 0`。  
検証などで旧 `magic_mirror_server` VM を一時的に再作成する場合は
`scripts/apply-pve.sh -target=module.magic_mirror_server` を使う。  
詳細は [packer/mm-server/README.md](../../packer/mm-server/README.md) を参照。

## apply 後: MAC アドレスの確認

```bash
terraform output -json rke2_lb_mac_addresses
terraform output -json rke2_server_mac_addresses
terraform output -json rke2_worker_mac_addresses
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
