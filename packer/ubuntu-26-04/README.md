# Ubuntu 26.04 LTS Packer Template

Proxmox テンプレートを Packer で自動構築します。Ubuntu 26.04 LTS (Noble Numbat) の最小構成。

## 事前準備

### 1. Proxmox API トークンの作成

Proxmox Web UI → Datacenter → API Tokens で Packer 用トークンを作成します。

```
ユーザー: packer@pve
トークン名: packer
権限: VM.Allocate, VM.Clone, VM.Config.CDROM, VM.Config.CPU,
      VM.Config.Disk, VM.Config.HWType, VM.Config.Memory,
      VM.Config.Network, VM.Config.Options, VM.Monitor,
      VM.PowerMgmt, Datastore.AllocateSpace, Datastore.AllocateTemplate,
      Sys.Modify
```

`Privilege Separation` は **無効** にすること（有効にすると一部権限が継承されない）。

### 2. ISO の入手と配置

Ubuntu 26.04 LTS の Server ISO を取得します。

```bash
# ISO ダウンロード (sha256 を記録しておく)
wget https://releases.ubuntu.com/26.04/ubuntu-26.04-live-server-amd64.iso

# Proxmox に転送 (pve-x570 の local ストレージ)
scp ubuntu-26.04-live-server-amd64.iso root@192.168.0.115:/var/lib/vz/template/iso/
```

### 3. パスワードハッシュの生成

```bash
# mkpasswd を使用 (whois パッケージに含まれる)
mkpasswd --method=SHA-512 'yourpassword'
```

生成された文字列を `ssh_password_hash` 変数に渡します。

### 4. SSH 公開鍵

`variables.pkr.hcl` の `ssh_public_key` にデフォルト値として設定済みです。
別のキーを使う場合は `-var` で上書きしてください。

## 実行方法

シークレットを環境変数で渡す（推奨）:

```bash
export PKR_VAR_proxmox_token_id="packer@pve!packer"
export PKR_VAR_proxmox_token_secret="<トークンシークレット>"
export PKR_VAR_ssh_password="<ビルド用パスワード>"
export PKR_VAR_ssh_password_hash="$(mkpasswd --method=SHA-512 '<ビルド用パスワード>')"
```

### pve-x570 でビルド

```bash
cd packer/ubuntu-26-04
packer init .
packer build -var-file=pve-x570.pkrvars.hcl .
```

### pve-b550m でビルド

```bash
cd packer/ubuntu-26-04
packer build -var-file=pve-b550m.pkrvars.hcl .
```

> **注意**: `oci-omv:iso/ubuntu-26.04-live-server-amd64.iso` が両ノードから参照できる共有ストレージにあることを確認すること。  
> pve-b550m からアクセスできない場合は `iso_file` を変数で上書きする。

## ビルド内容

| 項目 | 内容 |
|------|------|
| OS | Ubuntu 26.04 LTS (Noble Numbat) |
| アーキテクチャ | amd64 |
| インストーラ | autoinstall (cloud-init) |
| ディスク | virtio, 24G, local-lvm |
| ネットワーク | virtio, vmbr0, DHCP |
| BIOS | デフォルト (UEFI なし) |
| ユーザー | packer (ビルド用、テンプレートには残る) |
| SSH | 公開鍵 + パスワード認証 |
| インストール済みパッケージ | qemu-guest-agent, vim, cloud-init, cloud-initramfs-growroot |
| 削除済みパッケージ | nano |
| QEMU Guest Agent | 有効 |

## テンプレート後処理 (shell provisioner)

ビルド完了後に以下を自動実行します:

1. cloud-init の完了待機
2. `/etc/cloud/cloud.cfg.d/99-pve.cfg` に `datasource_list: [NoCloud, ConfigDrive]` を書き込み
3. `cloud-init clean --logs` — クローン VM が初回起動時に再実行できるよう初期化
4. `/etc/machine-id` を空にトランケート — クローンごとに一意 ID を生成
5. SSH ホストキー削除 — クローンごとに再生成
6. APT キャッシュ削除

## PVE ノード名のホスト名同期

このテンプレートをクローンして作成した VM は、**起動するたびに** Proxmox の VM 名をホスト名として自動同期します。  
PVE 上で VM 名を変更しても、次回再起動時に自動で反映されます。

### 仕組み

```mermaid
flowchart TB
  subgraph Build[Packer ビルド時]
    Script[/usr/local/bin/sync-hostname-from-pve を配置]
    Service[sync-hostname-from-pve.service を有効化]
    Datasource[/etc/cloud/cloud.cfg.d/99-pve.cfg<br/>NoCloud datasource を設定]
  end

  subgraph Clone[Terraform でクローン時]
    CloudInit[ide2 に cloud-init ドライブを追加]
    Metadata[Proxmox が VM 名を<br/>cloud-init meta-data に反映]
  end

  subgraph Boot[VM 起動ごと]
    RunService[sync-hostname-from-pve.service が起動]
    Mount[cidata ラベルの cloud-init ドライブをマウント]
    Read[meta-data の local-hostname を読み込み]
    Update[必要なら hostnamectl と /etc/hosts を更新]
  end

  Script --> Service --> Datasource
  Datasource --> CloudInit --> Metadata
  Metadata --> RunService --> Mount --> Read --> Update
```

### Terraform での有効化

`terraform/pve/modules/proxmox_vm` の `cloudinit_storage` 変数で制御します:

```hcl
module "my_vm" {
  source = "./modules/proxmox_vm"
  ...
  cloudinit_storage = "local-zfs"  # cloud-init ドライブを追加してホスト名同期を有効化
}
```

TrueNAS や Batocera など cloud-init を使わない VM は `cloudinit_storage` を省略 (null) してください。

### ホスト名更新の確認

```bash
# 動作確認 (VM 内)
sudo systemctl status sync-hostname-from-pve
journalctl -t sync-hostname-from-pve
```

## CI / GitHub Actions

`packer/**` 以下に変更が入ると `.github/workflows/packer.yml` が自動実行される。

| ジョブ | トリガー | 内容 |
|---|---|---|
| `validate` | push / PR | `packer validate` で HCL 構文チェック (ダミー変数使用、実ビルドなし) |

**実際の `packer build` は GitHub Actions からは実行できない。**  
Proxmox は宅内ネットワーク (`192.168.0.x`) にあり GitHub-hosted runner から到達不可のため、
ビルドは手元の端末から上記「実行方法」コマンドで行う。

## 変数一覧

| 変数 | デフォルト | 必須 | 説明 |
|------|-----------|------|------|
| `proxmox_url` | `https://192.168.0.115:8006/api2/json` | | Proxmox API URL |
| `proxmox_token_id` | | ✓ | API トークン ID |
| `proxmox_token_secret` | | ✓ | API トークンシークレット |
| `proxmox_node` | `pve-x570` | | ビルドを実行する Proxmox ノード |
| `proxmox_storage_pool` | `local-lvm` | | ディスク用ストレージプール |
| `iso_storage_pool` | `local` | | ISO 保存先ストレージプール |
| `iso_url` | | ✓ | Ubuntu ISO の URL |
| `iso_checksum` | | ✓ | ISO の SHA256 チェックサム |
| `template_name` | `template-ubuntu-26-04-home-amd64` | | 作成するテンプレート名 |
| `vmid` | `9001` | | ビルド VM の VMID |
| `cpu_cores` | `2` | | CPU コア数 |
| `memory` | `2048` | | RAM (MB) |
| `disk_size` | `24G` | | OS ディスクサイズ |
| `ssh_password` | | ✓ | SSH パスワード (ビルド用) |
| `ssh_password_hash` | | ✓ | SHA-512 ハッシュ |
| `ssh_public_key` | (設定済み) | | テンプレートに登録する SSH 公開鍵 |
