# ansible/pbs

Proxmox Backup Server (PBS) を Debian 12 (bookworm) 上に構築する Ansible playbook。

対象ホスト: `192.168.0.117` (J4125 ミニ PC)  
到達目標: `https://192.168.0.117:8007` で PBS が稼働し、datastore と admin@pbs ユーザが登録済みの状態。

## 前提条件

- Python 3 / Pipenv がインストール済みであること
- `~/.ssh/id_rsa.pub` が存在すること (対象ホストへの SSH 公開鍵として投入される)
- `bws` CLI (Bitwarden Secrets Manager CLI) がインストール済みであること
- `BWS_ACCESS_TOKEN` 環境変数に BSM Machine Account Access Token がセットされていること

## 全体の流れ

```
[0] Debian 12 を J4125 に手動インストール
[1] J4125 側: miutaku ユーザ作成・sudo 付与・SSH パスワード認証を一時有効化
[2] 実行ホスト側: ZFS ディスク ID 確認 (J4125 に SSH してコマンド実行)
[3] BSM にシークレットを登録し、シークレット ID を取得
[4] group_vars/pbs.yml の CHANGE_ME 箇所を書き換え
[5] pipenv install / ansible-galaxy install (初回のみ)
[6] ansible-playbook 実行
[7] J4125 側: SSH パスワード認証が無効化されている (playbook が鍵認証に切り替える)
[8] PVE Web UI で datastore 追加・バックアップジョブ作成
```

## 事前準備

### [0] Debian 12 手動インストール

PBS 公式 ISO は使わない。Debian 12 (bookworm) の netinst ISO を使う理由は、OS 層を Ansible で管理できるようにするため。

インストール時の設定:

| 項目 | 設定値 |
|---|---|
| ディスク構成 | M.2 → OS 用 `/` (ext4)、2.5" SATA → 未フォーマットのまま残す |
| パッケージ | "SSH server" と "standard system utilities" のみ選択 |
| ホスト名 | 任意 (playbook で `pbs-01-proxmox-backup-server-debian-12-home-amd64` に上書きされる) |

### [1] J4125 側: 初期ユーザ設定と SSH 準備

インストール完了後、コンソールまたは root SSH でログインして実施する。

```bash
# miutaku ユーザ作成と sudo 付与
adduser miutaku
usermod -aG sudo miutaku

# playbook 初回実行時は SSH パスワード認証が必要なので有効化しておく
# (playbook の common ロールが鍵認証に切り替え、パスワード認証を無効化する)
sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
systemctl restart ssh
```

> **補足**: playbook 実行後は `PasswordAuthentication no` に変更される。以降の SSH 接続はローカルの `~/.ssh/id_rsa.pub` に対応する秘密鍵で認証される。

### [2] ZFS 用ディスク ID の確認

J4125 に SSH して `/dev/disk/by-id/` 形式のディスク ID を確認する。  
`/dev/sda` などのカーネル名は再起動でずれるため使わない。

```bash
ssh miutaku@192.168.0.117
ls -la /dev/disk/by-id/ | grep -v part
```

出力例:
```
lrwxrwxrwx ... ata-WDC_WD20SPZX-22UA7T0_WD-XXXXXXXXXXXX -> ../../sda
lrwxrwxrwx ... ata-CT240BX500SSD1_12345ABCDEF -> ../../sdb
```

OS ディスク (M.2) ではなく ZFS に使う 2.5" SATA ディスクの ID をメモしておく。

### [3] BSM にシークレットを登録する

Bitwarden Secrets Manager (BSM) のプロジェクト `my-infra` に以下を登録:

| BSM シークレット名 | 値 |
|---|---|
| `PBS_ADMIN_PASSWORD` | PBS の `admin@pbs` ユーザに設定するパスワード (任意の文字列) |

登録後、そのシークレット ID (UUID) を控えておく。

```bash
# シークレット一覧で ID を確認
export BWS_ACCESS_TOKEN=<machine_account_access_token>
bws secret list | jq '.[] | {id, key}'
```

### [4] group_vars/pbs.yml の設定

`group_vars/pbs.yml` を開き、以下の **2 箇所** を書き換える。

```yaml
zfs:
  devices:
    - CHANGE_ME_TO_ACTUAL_DISK_ID  # ← [2] で確認したディスク ID に変更
                                   #   例: /dev/disk/by-id/ata-WDC_WD20SPZX-...

bsm_pbs_admin_password_id: "CHANGE_ME"  # ← [3] で取得した UUID に変更
```

**変更チェックリスト**:
- [ ] `zfs.devices[0]` を実際のディスク ID に変更
- [ ] `bsm_pbs_admin_password_id` を BSM シークレット ID に変更
- [ ] `zfs.pool_name` を変えた場合は `zfs.mountpoint` も `/mnt/datastore/<pool_name>` に変更

### [5] 実行ホストの要件確認

```bash
bws --version   # Bitwarden Secrets Manager CLI
jq --version    # JSON パーサ
pipenv --version
```

## セットアップ (初回のみ)

```bash
cd ansible/pbs
pipenv install
pipenv run ansible-galaxy install -r requirements.yml
```

## 実行

```bash
export BWS_ACCESS_TOKEN=<bws_machine_account_access_token>

# 構文チェック
pipenv run ansible-playbook -i hosts/prd site.yml --syntax-check

# dry-run (初回は SSH パスワード認証が必要)
pipenv run ansible-playbook -i hosts/prd site.yml \
  --ask-pass --ask-become-pass --check

# 本実行 (初回)
pipenv run ansible-playbook -i hosts/prd site.yml \
  --ask-pass --ask-become-pass

# 2 回目以降 (SSH 鍵認証に切り替わっているため --ask-pass 不要)
pipenv run ansible-playbook -i hosts/prd site.yml --ask-become-pass
```

### タグを使った部分実行

```bash
# common ロールのみ
pipenv run ansible-playbook -i hosts/prd site.yml --ask-become-pass --tags common

# ZFS のみ
pipenv run ansible-playbook -i hosts/prd site.yml --ask-become-pass --tags zfs

# PBS 本体のみ
pipenv run ansible-playbook -i hosts/prd site.yml --ask-become-pass --tags proxmox_backup_server
```

## playbook の動作内容

### common ロール

1. ホスト名を `pbs-01-proxmox-backup-server-debian-12-home-amd64` に変更
2. タイムゾーンを `Asia/Tokyo` に設定
3. `APT::Install-Recommends 0` を設定
4. apt upgrade (全パッケージを最新化)
5. `~/.ssh/id_rsa.pub` (ローカル) を `~/.ssh/authorized_keys` に追加
6. SSH パスワード認証を無効化・鍵認証のみに変更

### zfs ロール

1. `linux-headers-$(uname -r)` をインストール (DKMS ビルド用)
2. `zfs-dkms`, `zfsutils-linux` をインストール
3. ZFS カーネルモジュールをロード
4. マウントポイント `/mnt/datastore/pbs-data` を作成
5. ZFS pool を作成 (既存の場合はスキップ)
6. pool のプロパティ (compression / atime / xattr) を設定

### proxmox_backup_server ロール

1. Postfix の debconf preseed
2. Proxmox GPG 鍵を配置 (SHA-512 検証付き)
3. PBS no-subscription リポジトリを追加
4. `proxmox-backup-server` をインストール
5. enterprise リポジトリを無効化
6. `proxmox-backup` サービスを起動・自動起動設定
7. BSM から `admin@pbs` パスワードを取得 (`bws secret get`)
8. `admin@pbs` ユーザを作成 (既存の場合はスキップ)
9. datastore `main` を作成 (既存の場合はスキップ)
10. `admin@pbs` に `DatastoreAdmin` ロールを付与
11. GC スケジュール・prune ジョブを設定

## 完了確認

```bash
ssh miutaku@192.168.0.117

# ZFS pool
sudo zpool status pbs-data
sudo zfs get compression,atime,xattr pbs-data

# PBS サービス
sudo systemctl status proxmox-backup

# datastore / user / prune job
sudo proxmox-backup-manager datastore list
sudo proxmox-backup-manager user list
sudo proxmox-backup-manager prune-job list
```

Web UI: `https://192.168.0.117:8007` / ログイン: `admin@pbs` / BSM に登録したパスワード

## 完了後の手作業

### PVE 側での datastore 追加 (各 PVE ノードで実施)

```bash
# Fingerprint の取得
ssh miutaku@192.168.0.117
sudo proxmox-backup-manager cert info | grep Fingerprint
```

PVE Web UI (`https://192.168.0.1XX:8006`) → `Datacenter` → `Storage` → `Add` → `Proxmox Backup Server`

| フィールド | 値 |
|---|---|
| ID | `pbs-home` |
| Server | `192.168.0.117` |
| Datastore | `main` |
| Username | `admin@pbs` |
| Password | BSM に登録したパスワード |
| Fingerprint | 上記コマンドで取得した値 |

## トラブルシューティング

### apt 401 エラー (enterprise リポジトリ)

```bash
sudo truncate -s 0 /etc/apt/sources.list.d/pbs-enterprise.list
sudo apt update
```

### ZFS カーネルモジュールのロード失敗

```bash
dkms status          # zfs, X.X.X, ...: installed が表示されれば OK
sudo modprobe zfs
sudo dkms autoinstall  # ビルド失敗時
```

### PBS サービスが起動しない

```bash
sudo systemctl status proxmox-backup
sudo journalctl -u proxmox-backup -n 50 --no-pager
```
