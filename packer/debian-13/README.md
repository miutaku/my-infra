# Debian 13 (trixie) Packer Template

Proxmox テンプレートを Packer で自動構築します。Debian 13 の最小構成。
**主用途は Proxmox Backup Server (PBS) 4.x の OS ベース** です。

PBS は Debian 専用パッケージのため Ubuntu ではなく Debian を使います。
さらに **S3 互換オブジェクトストレージ datastore は PBS 4.x (4.2 で正式サポート) の機能**で、
PBS 4.x は **Debian 13 trixie ベース**のため、bookworm (12) ではなく trixie (13) を使います。

`ansible/pbs` がこのテンプレートから作られた VM 上に PBS を導入します。

## 事前準備

### 1. Proxmox API トークンの作成

[packer/ubuntu-26-04/README.md](../ubuntu-26-04/README.md) と同じ手順で `packer@pve!packer`
トークンを作成します (`Privilege Separation` は無効)。

### 2. ISO の入手と配置

Debian 13 (trixie) の netinst ISO を取得し、両ノードから参照できる共有ストレージ
(`oci-omv:iso/...`) に配置します。

```bash
wget https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-13.5.0-amd64-netinst.iso
# 共有 ISO ストレージへ配置 (例: TrueNAS NFS / oci-omv)
```

> `iso_file` のデフォルトは `oci-omv:iso/debian-13.5.0-amd64-netinst.iso`。
> ポイントリリースが異なる場合は `pve-*.pkrvars.hcl` または `-var iso_file=...` で上書きする。

### 3. パスワードハッシュの生成

```bash
mkpasswd --method=SHA-512 'yourpassword'   # whois パッケージに含まれる
```

## 実行方法

シークレット (Proxmox API トークン / ビルド用 SSH パスワード) は `packer/build.sh` が
BSM (Bitwarden Secrets Manager) から取得する。`BWS_ACCESS_TOKEN` を環境変数にセットし、
`bws` / `jq` / `mkpasswd` (whois) が必要。

```bash
export BWS_ACCESS_TOKEN=<machine_account_access_token>

cd packer
./build.sh debian-13 --node pve-x570               # PBS 稼働ノード
./build.sh debian-13 --node pve-b550m --vmid 9004  # 手動フェイルオーバ先 (vmid 重複回避)
```

`build.sh` は `PACKER_PROXMOX_TOKEN_ID` / `PACKER_PROXMOX_TOKEN_SECRET` / `PACKER_SSH_PASSWORD`
を BSM から引き、`--node` で接続先 URL を切り替える。ISO は `iso_file` のデフォルト
(`oci-omv:iso/debian-13.5.0-amd64-netinst.iso`) を使う。

> 手動で個別変数を渡してビルドしたい場合は `pve-x570.pkrvars.hcl` / `pve-b550m.pkrvars.hcl`
> を `packer build -var-file=...` で使う方法もある。
>
> **テンプレートは両ノードに存在させること。** PBS VM は通常 pve-x570 で稼働するが、
> ノード障害時に pve-b550m へ手動マイグレーションするため、両ノードに同名テンプレートが必要。

## ビルド内容

| 項目 | 内容 |
|------|------|
| OS | Debian 13 (trixie) |
| インストーラ | preseed (`http/preseed.pkrtpl.hcl`) |
| ディスク | virtio-scsi, 20G (クローン後に拡張可), local-zfs |
| ネットワーク | virtio, vmbr0, DHCP |
| ユーザー | miutaku (NOPASSWD sudo, SSH 公開鍵 + パスワード) |
| 同梱パッケージ | qemu-guest-agent, cloud-init, cloud-guest-utils, sudo, openssh-server, vim |
| 追加サービス | node_exporter, grow-rootfs-if-needed, sync-hostname-from-pve |

ubuntu-26-04 テンプレートと同じく以下を備えます (共有ファイルは同一):

- **root ディスク自動拡張** (`grow-rootfs-if-needed.service`)
- **PVE VM 名 → ホスト名 自動同期** (`sync-hostname-from-pve.service`, cidata ドライブを直接読む)
- **node_exporter** (`:9100`)

詳細は [packer/ubuntu-26-04/README.md](../ubuntu-26-04/README.md) を参照。

## preseed の boot_command について

Debian netinst の自動インストールは isolinux の `boot:` プロンプトへ
`install auto=true priority=critical preseed/url=...` を流し込みます。
ISO のバージョンやブートローダ (BIOS isolinux / UEFI grub) によってキー入力が
変わる場合があります。インストーラが自動進行しない場合は
`debian-13.pkr.hcl` の `boot_command` を調整してください。

## CI / GitHub Actions

`packer/**` の変更で `.github/workflows/packer.yml` の `validate` が走ります
(構文チェックのみ。実ビルドは宅内ネットワークが必要なため手元で行う)。
