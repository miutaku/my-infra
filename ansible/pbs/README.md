# ansible/pbs

Proxmox Backup Server (PBS) を Debian 12 (bookworm) 上に構築する Ansible playbook。

対象ホスト: `192.168.0.117` (J4125 ミニ PC)  
到達目標: `https://192.168.0.117:8007` で PBS が稼働し、datastore と admin@pbs ユーザが登録済みの状態。

---

## 全体の流れ

```
[0] Debian 12 を J4125 に手動インストール
[1] J4125 側: miutaku ユーザ作成・sudo 付与・SSH パスワード認証を一時有効化
[2] 実行ホスト側: ZFS ディスク ID 確認 (J4125 に SSH してコマンド実行)
[3] 実行ホスト側: Bitwarden に PBS admin パスワードを登録しアイテム ID を取得
[4] 実行ホスト側: group_vars/pbs.yml の CHANGE_ME 箇所を書き換え
[5] 実行ホスト側: pipenv install / ansible-galaxy install (初回のみ)
[6] 実行ホスト側: ansible-playbook 実行
[7] J4125 側: SSH パスワード認証が無効化されている (playbook が鍵認証に切り替える)
[8] 実行ホスト側: PVE Web UI で datastore 追加・バックアップジョブ作成
```

---

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

> **補足**: playbook 実行後は `PasswordAuthentication no` に変更される。
> 以降の SSH 接続は Bitwarden に登録した鍵 (ID: `18bb5920-fef9-4a47-ad66-b2bc013c6002`) が使われる。

### [2] ZFS 用ディスク ID の確認

J4125 に SSH して `/dev/disk/by-id/` 形式のディスク ID を確認する。  
`/dev/sda` などのカーネル名は再起動でずれるため使わない。

```bash
ssh miutaku@192.168.0.117
ls -la /dev/disk/by-id/ | grep -v part
```

出力例:
```
lrwxrwxrwx 1 root root 9 Apr 27 00:00 ata-WDC_WD20SPZX-22UA7T0_WD-XXXXXXXXXXXX -> ../../sda
lrwxrwxrwx 1 root root 9 Apr 27 00:00 ata-CT240BX500SSD1_12345ABCDEF -> ../../sdb
```

OS ディスク (M.2) ではなく ZFS に使う 2.5" SATA ディスクの ID をメモしておく。

### [3] Bitwarden への PBS admin パスワード登録

PBS の `admin@pbs` ユーザに設定するパスワードを Bitwarden に登録し、アイテム ID を取得する。

```bash
# Bitwarden にログインしていない場合
bw login

# アイテム作成 (YOUR_PASSWORD を実際のパスワードに変える)
bw sync
bw create item '{
  "type": 1,
  "name": "PBS admin@pbs",
  "login": {
    "username": "admin@pbs",
    "password": "YOUR_PASSWORD"
  }
}' | jq -r '.id'
```

出力される UUID (例: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) をメモしておく。

アイテムが正しく登録されたか確認:
```bash
bw get item xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx | jq '{name: .name, password: .login.password}'
```

### [4] group_vars/pbs.yml の設定

`group_vars/pbs.yml` を開き、以下の **2 箇所** を書き換える。他はデフォルトのまま使える。

```yaml
zfs:
  pool_name: pbs-data                     # ZFS pool 名。mountpoint と一致させること
  devices:
    - CHANGE_ME_TO_ACTUAL_DISK_ID         # ← [2] で確認したディスク ID に変更
                                          #   例: /dev/disk/by-id/ata-WDC_WD20SPZX-22UA7T0_WD-XXXX
  ashift: 12                              # ディスクのセクタサイズに対応 (4K セクタ = 12)
  compression: lz4                        # ZFS 圧縮 (lz4 は CPU 負荷低・効果高)
  atime: "off"                            # アクセス時刻更新を無効化 (バックアップ用途では不要)
  xattr: sa                               # 拡張属性を inode に保存 (PBS が使用)
  mountpoint: /mnt/datastore/pbs-data     # pool_name を変えた場合はここも変える

pbs:
  datastore_name: main                    # PBS UI に表示される datastore 名
  admin_user: admin@pbs                   # PBS 内部認証の管理ユーザ
  gc_schedule: "sat 02:30"               # ガベージコレクション: 毎週土曜 02:30
  prune_schedule: "sun 03:00"            # 世代管理 (prune): 毎週日曜 03:00
  keep_last: 3                            # 直近 N 世代を保持
  keep_daily: 7                           # 日次: 7 日分
  keep_weekly: 4                          # 週次: 4 週分
  keep_monthly: 6                         # 月次: 6 ヶ月分

bw_cred_pbs_admin_password: CHANGE_ME_TO_ACTUAL_BW_ITEM_ID  # ← [3] で取得した UUID に変更
```

**変更チェックリスト**:
- [ ] `zfs.devices[0]` を実際のディスク ID に変更
- [ ] `bw_cred_pbs_admin_password` を Bitwarden アイテム ID に変更
- [ ] `zfs.pool_name` を変えた場合は `zfs.mountpoint` も `/mnt/datastore/<pool_name>` に変更

### [5] 実行ホストの要件確認

```bash
bw --version    # Bitwarden CLI
jq --version    # JSON パーサ
pipenv --version
```

---

## playbook の動作内容

実行すると以下の順序でホストが構成される。

### common ロール

1. ホスト名を `pbs-01-proxmox-backup-server-debian-12-home-amd64` に変更
2. タイムゾーンを `Asia/Tokyo` に設定
3. `APT::Install-Recommends 0` を設定
4. apt upgrade (全パッケージを最新化)
5. Bitwarden の vault を sync・unlock し、セッションキーを取得
6. Bitwarden から SSH 公開鍵 (ID: `18bb5920-...`) を取得して `~/.ssh/authorized_keys` に追加
7. SSH パスワード認証を無効化・鍵認証のみに変更

### zfs ロール

1. `/etc/apt/sources.list` の `main` に `contrib` を追加 (ZFS DKMS のビルドに必要)
2. `linux-headers-$(uname -r)` をインストール (DKMS カーネルモジュールビルド用)
3. `zfs-dkms`, `zfsutils-linux` をインストール (DKMS ビルドに数分かかる)
4. ZFS カーネルモジュールをロード
5. マウントポイントディレクトリ `/mnt/datastore/pbs-data` を作成
6. `zpool list` で既存 pool を確認し、存在しない場合のみ pool を作成
7. pool のプロパティ (compression / atime / xattr) を設定

### proxmox_backup_server ロール

1. `python3-pexpect` をインストール (expect モジュールの依存)
2. Postfix の debconf preseed (インストール中の対話プロンプトを事前に回答)
3. Proxmox GPG 鍵を `/usr/share/keyrings/proxmox-archive-keyring.gpg` に配置 (SHA-512 検証付き)
4. PBS no-subscription リポジトリを deb822 形式で追加
5. `proxmox-backup-server` をインストール
6. パッケージが生成する enterprise リポジトリ (`pbs-enterprise.list`) を空ファイルで無効化
7. `proxmox-backup` サービスを起動・自動起動設定
8. Bitwarden から PBS admin パスワードを取得
9. `admin@pbs` ユーザを作成 (既存の場合はスキップ)
10. datastore `main` を `/mnt/datastore/pbs-data` に作成 (既存の場合はスキップ)
11. `admin@pbs` に `DatastoreAdmin` ロールを付与
12. GC スケジュールを `sat 02:30` に設定
13. prune ジョブを作成 (既存の場合はスキップ)

---

## 実行

### 初回のみ

```bash
cd ansible/pbs
pipenv install
pipenv run ansible-galaxy install -r requirements.yml
```

### 実行手順

```bash
# 1. 構文チェック
pipenv run ansible-playbook -i hosts/prd site.yml --syntax-check

# 2. dry-run (実際には変更しない)
#    初回実行時は SSH パスワードが必要なため --ask-pass を付ける
pipenv run ansible-playbook -i hosts/prd site.yml \
  -e bw_passwd='YOUR_BW_MASTER_PASSWORD' \
  --ask-pass \
  --ask-become-pass \
  --check

# 3. 本実行
pipenv run ansible-playbook -i hosts/prd site.yml \
  -e bw_passwd='YOUR_BW_MASTER_PASSWORD' \
  --ask-pass \
  --ask-become-pass
```

> **bw_passwd**: Bitwarden のマスターパスワード (ログイン時のパスワード)。  
> **--ask-pass**: SSH 接続パスワード。`miutaku` ユーザのパスワードを入力する。  
> **--ask-become-pass**: sudo パスワード。通常は SSH パスワードと同一。

> **2 回目以降**: common ロールが SSH 鍵認証に切り替えるため `--ask-pass` は不要になる。
> ```bash
> pipenv run ansible-playbook -i hosts/prd site.yml \
>   -e bw_passwd='YOUR_BW_MASTER_PASSWORD' \
>   --ask-become-pass
> ```

### タグを使った部分実行

特定ロールだけ再実行したい場合:

```bash
# ZFS のみ
pipenv run ansible-playbook -i hosts/prd site.yml \
  -e bw_passwd='YOUR_BW_MASTER_PASSWORD' --ask-become-pass --tags zfs

# PBS 本体のみ
pipenv run ansible-playbook -i hosts/prd site.yml \
  -e bw_passwd='YOUR_BW_MASTER_PASSWORD' --ask-become-pass --tags proxmox_backup_server
```

---

## 完了確認

playbook 実行後、以下で各コンポーネントの状態を確認する。

```bash
ssh miutaku@192.168.0.117

# ZFS pool が作成されているか
sudo zpool status pbs-data
sudo zfs get compression,atime,xattr pbs-data

# PBS サービスが起動しているか
sudo systemctl status proxmox-backup

# PBS datastore が作成されているか
sudo proxmox-backup-manager datastore list

# admin@pbs ユーザが作成されているか
sudo proxmox-backup-manager user list

# prune ジョブが登録されているか
sudo proxmox-backup-manager prune-job list

# GC スケジュールの確認
sudo proxmox-backup-manager datastore config main | grep gc-schedule
```

Web UI でも確認できる: `https://192.168.0.117:8007`  
ログイン: `admin@pbs` / Bitwarden に登録したパスワード

---

## 完了後の手作業

### 1. PVE 側での datastore 追加 (各 PVE ノードで実施)

Proxmox VE の Web UI (`https://192.168.0.1XX:8006`) で以下を実施する。

**Fingerprint の取得** (先に実施):
```bash
ssh miutaku@192.168.0.117
sudo proxmox-backup-manager cert info | grep Fingerprint
```

**PVE Web UI での追加手順**:
1. `Datacenter` → `Storage` → `Add` → `Proxmox Backup Server`
2. 以下を入力:

| フィールド | 値 |
|---|---|
| ID | `pbs-home` (任意) |
| Server | `192.168.0.117` |
| Datastore | `main` |
| Username | `admin@pbs` |
| Password | Bitwarden に登録したパスワード |
| Fingerprint | 上記コマンドで取得した値 |

3. `Add` をクリックし、左ペインに `pbs-home` が表示されれば成功。

### 2. バックアップジョブ作成

1. `Datacenter` → `Backup` → `Add`
2. `Storage` に `pbs-home` を選択
3. スケジュール・対象 VM/CT・保持ポリシーを設定

### 3. 初回バックアップ確認

1. 対象 VM を選択 → `Backup` → `Backup Now`
2. `https://192.168.0.117:8007` → `Datastore` → `main` → `Content` でバックアップが作成されているか確認

---

## トラブルシューティング

### apt 401 エラー (enterprise リポジトリ)

`proxmox-backup-server` のインストール時に `/etc/apt/sources.list.d/pbs-enterprise.list` が作成される。
このファイルが有効なままだと次回の `apt update` で 401 エラーが発生する。
playbook はこのファイルを空ファイルで上書きして無効化するが、手動確認する場合:

```bash
cat /etc/apt/sources.list.d/pbs-enterprise.list
# 空であれば問題なし
# 内容がある場合:
sudo truncate -s 0 /etc/apt/sources.list.d/pbs-enterprise.list
sudo apt update
```

### ZFS カーネルモジュールのロード失敗

`zfs-dkms` のビルドに失敗している可能性がある。`zfs-dkms` はインストール時にカーネルモジュールを
ソースからビルドするため、`linux-headers` が正しく入っていないとビルドエラーになる。

```bash
# DKMS ビルド状態の確認
dkms status
# → 例: zfs, 2.2.x, 6.1.0-xx-amd64: installed が表示されれば OK

# カーネルヘッダの確認
dpkg -l "linux-headers-$(uname -r)"

# 手動でモジュールロードを試みる
sudo modprobe zfs
lsmod | grep zfs

# ビルドに失敗している場合は手動でリビルド
sudo dkms autoinstall
```

### ZFS pool 作成時のディスク ID エラー

`group_vars/pbs.yml` の `zfs.devices` に誤ったパスを指定すると pool 作成が失敗する。

```bash
# J4125 上でディスク ID を再確認
ls -la /dev/disk/by-id/ | grep -v part

# zpool create を手動で試す (実際のコマンドを確認する)
sudo zpool create -n pbs-data /dev/disk/by-id/ata-XXX  # -n はドライラン
```

### PBS サービスが起動しない

```bash
sudo systemctl status proxmox-backup
sudo journalctl -u proxmox-backup -n 50 --no-pager
```

### expect タイムアウト (admin@pbs 作成失敗)

`admin@pbs` 作成タスクが 30 秒でタイムアウトする場合、PBS の `user create` コマンドが
対話プロンプトを出さずに終了している可能性がある。手動で確認する:

```bash
# PBS が起動しているか確認
sudo systemctl status proxmox-backup

# 手動でユーザ作成を試みる
sudo proxmox-backup-manager user create admin@pbs
# → プロンプトが出ない場合は以下で対応:
sudo proxmox-backup-manager user update admin@pbs --password 'YOUR_PASSWORD'
```

手動で対応した場合、次回 playbook 実行時は `admin@pbs` が既存として検出されスキップされる。
