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

```bash
cd packer/ubuntu-26-04

# 初期化 (初回のみ)
packer init .

# ビルド
packer build \
  -var "proxmox_token_id=packer@pve!packer" \
  -var "proxmox_token_secret=<トークンシークレット>" \
  -var "iso_url=https://releases.ubuntu.com/26.04/ubuntu-26.04-live-server-amd64.iso" \
  -var "iso_checksum=<sha256ハッシュ>" \
  -var "ssh_password=<パッカービルド用パスワード>" \
  -var "ssh_password_hash=<mkpasswd生成ハッシュ>" \
  .
```

シークレットを環境変数で渡す場合（推奨）:

```bash
export PKR_VAR_proxmox_token_secret="xxxxx"
export PKR_VAR_ssh_password="yourpassword"
export PKR_VAR_ssh_password_hash="$( mkpasswd --method=SHA-512 yourpassword )"

packer build \
  -var "proxmox_token_id=packer@pve!packer" \
  -var "iso_url=https://releases.ubuntu.com/26.04/ubuntu-26.04-live-server-amd64.iso" \
  -var "iso_checksum=<sha256ハッシュ>" \
  .
```

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
2. `cloud-init clean --logs` — クローン VM が初回起動時に再実行できるよう初期化
3. `/etc/machine-id` を空にトランケート — クローンごとに一意 ID を生成
4. SSH ホストキー削除 — クローンごとに再生成
5. APT キャッシュ削除

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
