# ansible/pbs

Proxmox Backup Server (PBS) 4.x を **Debian 13 (trixie) VM** 上に構築する Ansible playbook。
バックアップ実体は **iDrive e2 (S3 互換オブジェクトストレージ)** の datastore に置く。

対象ホスト: `192.168.20.250` (PVE VM `pbs-01-debian-13-home-amd64`、`terraform/pve` の `module.pbs` で作成)
到達目標: `https://192.168.20.250:8007` で PBS が稼働し、S3 datastore・admin@pbs ユーザ・
GC/prune ジョブが登録済みの状態。

> **前身からの変更**: 以前はベアメタル J4125 + Debian 12 + ローカル ZFS datastore 構成だったが、
> PVE VM + Debian 13 + S3 datastore へ移行した。S3 datastore は PBS 4.2 で正式サポートの機能で、
> PBS 4.x は Debian 13 trixie ベースのため。

## アーキテクチャ

- VM は `terraform/pve` の `module.pbs` が `template-debian-13-home-amd64` から clone して作成
  (テンプレートは `packer/debian-13` でビルド)。
- PBS が自己署名証明書を生成する際の ASN.1 CN 長制限を避けるため、VM 名 / hostname は
  `pbs-01-debian-13-home-amd64` のように短めに保つ。
- ディスク: `scsi0` = OS (20G)、`scsi1` = **S3 datastore ローカル永続キャッシュ** (64G, `/dev/sdb`)。
- HA: HA マネージャは使わず、`scsi0` を pvesr で対向ノードへレプリケーション + 手動フェイルオーバ。
  詳細は [terraform/pve/README.md](../../terraform/pve/README.md) の「PBS の HA」節。

## 前提条件

- `terraform/pve` で PBS VM が作成済み・起動済みで、SSH 鍵 (`~/.ssh/id_rsa`) で
  `miutaku@192.168.20.250` にログインできること
  (テンプレートに公開鍵が投入済みなので初回から鍵認証で入れる)。
- `bws` CLI (Bitwarden Secrets Manager CLI) がインストール済みで、
  `BWS_ACCESS_TOKEN` 環境変数に Machine Account Access Token がセットされていること。
- iDrive e2 で PBS 用バケットとアクセスキー/シークレットキーを発行済みであること。

## 全体の流れ

```
[0] packer/debian-13 で template-debian-13-home-amd64 を両ノードにビルド
[1] terraform/pve で apply → PBS VM 作成 → DHCP 静的リースで 192.168.20.250 を固定
[2] iDrive e2 でバケット作成・アクセスキー発行、endpoint host / region を控える
[3] BSM にシークレット (PBS admin pw / e2 access key / e2 secret key) を登録し ID を取得
[4] group_vars/pbs.yml の CHANGE_ME 箇所を書き換え
[5] pipenv install / ansible-galaxy install (初回のみ)
[6] ansible-playbook 実行
[7] PVE Web UI で PBS storage 追加・バックアップジョブ作成
[8] terraform/pve/README.md の手順で scsi0 のレプリケーションを設定
```

## 事前準備

### [2] iDrive e2 の情報

e2 ダッシュボードの「Access Key」画面で以下を控える:

| 項目 | 例 |
|---|---|
| Endpoint (host) | `x9q2.la.idrivee2-12.com` (スキーム無し) |
| Region | `us-la` 等 (ダッシュボード記載) |
| Bucket | PBS 用に作成したバケット名 |
| Access Key / Secret Key | BSM に登録する (下記) |

> iDrive e2 は **path-style アドレッシング必須** (`s3.path_style: true`)。

### [3] BSM にシークレットを登録

Bitwarden Secrets Manager (BSM) のプロジェクト `my-infra` に以下を登録し、各 ID (UUID) を控える:

| BSM シークレット名 | 値 |
|---|---|
| `PBS_ADMIN_PASSWORD` | PBS の `admin@pbs` ユーザに設定するパスワード |
| `PBS_S3_ACCESS_KEY` | iDrive e2 のアクセスキー |
| `PBS_S3_SECRET_KEY` | iDrive e2 のシークレットキー |

```bash
export BWS_ACCESS_TOKEN=<machine_account_access_token>
bws secret list | jq '.[] | {id, key}'
```

### [4] group_vars/pbs.yml の設定

以下の **CHANGE_ME** を書き換える:

```yaml
s3:
  endpoint_host: CHANGE_ME_E2_ENDPOINT_HOST   # [2] の Endpoint host
  region:        CHANGE_ME_E2_REGION          # [2] の Region
  bucket:        CHANGE_ME_E2_BUCKET          # [2] の Bucket

pbs:
  datastore_name: pbs-s3  # PBS の datastore 名は 3 文字以上

bsm_pbs_admin_password_id: "..."   # 既存
bsm_s3_access_key_id:      "CHANGE_ME"  # [3] PBS_S3_ACCESS_KEY の ID
bsm_s3_secret_key_id:      "CHANGE_ME"  # [3] PBS_S3_SECRET_KEY の ID
```

**変更チェックリスト**:
- [ ] `s3.endpoint_host` / `s3.region` / `s3.bucket`
- [ ] `pbs.datastore_name` が 3 文字以上
- [ ] `bsm_s3_access_key_id` / `bsm_s3_secret_key_id`
- [ ] (キャッシュディスクが `/dev/sdb` 以外なら) `cache.device`

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

# dry-run (鍵認証なので --ask-pass は不要。sudo は NOPASSWD)
pipenv run ansible-playbook -i hosts/prd site.yml --check

# 本実行
pipenv run ansible-playbook -i hosts/prd site.yml
```

### タグを使った部分実行

```bash
pipenv run ansible-playbook -i hosts/prd site.yml --tags common
pipenv run ansible-playbook -i hosts/prd site.yml --tags cache_disk
pipenv run ansible-playbook -i hosts/prd site.yml --tags proxmox_backup_server
```

## playbook の動作内容

### common ロール

ホスト名設定・タイムゾーン (Asia/Tokyo)・apt upgrade・SSH 鍵投入・パスワード認証無効化。

### cache_disk ロール

1. キャッシュディスク (`/dev/sdb`) の存在確認
2. ラベル `pbs-s3-cache` で ext4 フォーマット (既存ならスキップ)
3. `/mnt/datastore/s3-cache` を作成し `LABEL=` で fstab マウント (`nofail`)

### proxmox_backup_server ロール

1. Postfix preseed / PBS GPG 鍵配置 (trixie 用, SHA-512 検証)
2. PBS no-subscription リポジトリ (trixie) を追加し、enterprise リポジトリ (`.list` / `.sources`) を無効化
3. `proxmox-backup-server` をインストールし、enterprise リポジトリを再確認して `proxmox-backup` サービス起動
4. BSM から admin / S3 アクセスキー / S3 シークレットキーを取得
5. `admin@pbs` ユーザ作成 (既存ならスキップ)
6. **S3 endpoint 作成** (`proxmox-backup-manager s3 endpoint create`, path-style)
7. **S3-backed datastore 作成** (`--backend type=s3,client=...,bucket=...`, キャッシュは `/mnt/datastore/s3-cache`)
8. `admin@pbs` に `/` の `Admin` と datastore の `DatastoreAdmin` を付与
9. GC スケジュール・prune ジョブ設定

## 完了確認

```bash
ssh miutaku@192.168.20.250
sudo systemctl status proxmox-backup
sudo proxmox-backup-manager s3 endpoint list
sudo proxmox-backup-manager datastore list
sudo proxmox-backup-manager user list
sudo proxmox-backup-manager prune-job list
findmnt /mnt/datastore/s3-cache
```

Web UI: `https://192.168.20.250:8007`

| フィールド | 値 |
|---|---|
| User name | `admin` |
| Realm | `Proxmox Backup authentication server` (`pbs`) |
| Password | BSM の `PBS_ADMIN_PASSWORD` |

> User name に `admin@pbs` を入れて Realm も選ぶと `admin@pbs@pbs` のように realm が二重になり、
> Login failed になる。

## 完了後の手作業

### PVE クラスタへの PBS storage 追加

```bash
ssh miutaku@192.168.20.250
sudo proxmox-backup-manager cert info | grep Fingerprint
```

PVE Web UI → `Datacenter` → `Storage` → `Add` → `Proxmox Backup Server`

| フィールド | 値 |
|---|---|
| ID | `pbs-home` |
| Server | `192.168.20.250` |
| Datastore | `pbs-s3` |
| Username | `admin@pbs` |
| Password | BSM に登録したパスワード |
| Fingerprint | 上記コマンドで取得した値 |
| Content | `VZDump backup file` |
| Nodes | 空欄 (クラスタ全ノードで利用) |

`Datacenter` 配下に追加するため、PVE クラスタ内の `pve-x570` / `pve-b550m` の両方から
同じ storage ID `pbs-home` として使える。

### PVE バックアップジョブ作成

PVE Web UI → `Datacenter` → `Backup` → `Add`

S3-backed datastore は、バックアップ開始直後に多数の chunk を S3 へ PUT する。
1 つの Datacenter backup job で複数ノードの VM を対象にすると、PVE はノードごとに
同時に backup task を走らせるため、PBS の `proxmox-backup-proxy` / S3 backend が
詰まりやすい。PBS VM が生きていて SSH は通るのに `:8007` が応答しない場合は、
まず backup job をノード別に分け、スケジュールをずらして直列化する。

現在の運用ジョブ:

| Job ID | Node | VMID | Schedule | 主な負荷制限 |
|---|---|---|---|---|
| `pbs-home-x570` | `pve-x570` | `13201,60000` | `*/2:05` | `bwlimit=20480`, `performance=max-workers=1`, `zstd=1` |
| `pbs-home-b550m` | `pve-b550m` | `40000` | `*/2:35` | `bwlimit=20480`, `performance=max-workers=1`, `zstd=1` |

旧い全ノード同時ジョブ `backup-2836eac5-c20c` は、戻せるように削除せず `enabled=0`
で残している。

PVE Web UI で作る場合の基本値:

| フィールド | 値 |
|---|---|
| Storage | `pbs-home` |
| Mode | `Snapshot` |
| Node | 対象ノードを指定 (`pve-x570` / `pve-b550m`) |
| Schedule | ノード間でずらす (`*/2:05`, `*/2:35` など) |
| Selection mode | 対象ノード上の VM/CT のみ選択 |
| Bandwidth limit | `20480` KiB/s から開始 |
| Performance / Max workers | `1` から開始 |
| Zstd threads | `1` から開始 |

> PVE の `zstd` は圧縮レベルではなく **zstd スレッド数**。大きくすると圧縮率が上がる
> という意味ではなく、バックアップ元ノードとPBSへの投入並列度が上がる。

保持ポリシーは PBS 側の prune job (`pbs-s3-prune`) に寄せる。PVE 側で別の retention を
設定する場合は、PBS 側の `keep_last` / `keep_daily` / `keep_weekly` / `keep_monthly`
と矛盾しないようにする。

Packer で再生成できる template VM (`9001`, `9002` など) はバックアップ対象に含めない。
template を PBS backup に含めると、停止 VM を backup 用 QEMU (`qmpstatus=prelaunch`) で
起動したまま進捗が止まることがある。テンプレートは `packer/` から再ビルドする運用に寄せる。

追加後の確認:

```bash
# PVE ノード側
pvesm status | grep pbs-home
```

### レプリケーション設定

[terraform/pve/README.md](../../terraform/pve/README.md) の「PBS の HA」節に従い、
`scsi1` (キャッシュ) をレプリ除外し `scsi0` (OS) のレプリケーションジョブを設定する。

## トラブルシューティング

### S3 endpoint / datastore 作成エラー

```bash
sudo proxmox-backup-manager s3 endpoint list --output-format text
sudo sed -n '/^datastore:/,/^$/p' /etc/proxmox-backup/datastore.cfg
sudo journalctl -u proxmox-backup -n 50 --no-pager
```

endpoint host / region / bucket / path-style / 認証キーを確認する。
iDrive e2 は path-style 必須。バケットは事前に作成しておくこと。

### バックアップ開始後に Web UI / 8007 が応答しない (PBS ハング)

**真因: ローカル S3 キャッシュディスクの fsync I/O 飽和**(帯域でも CPU でもメモリでもない)。
PBS の datastore は default で sync-level が高く chunk ごとに頻繁に fsync する。キャッシュ
ディスク (scsi1) は local-zfs ZVOL のため fsync が ZIL 同期書き込みになり 1 回ずつ遅い。
同時バックアップで fsync が競合すると I/O が飽和し、`proxmox-backup-proxy` が I/O 待ちで
固まって `:8007` が無反応になる (SSH は別プロセスなので生存する)。

**切り分けは PSI が一発**。ハング中(または重いバックアップ中)に:

```bash
ssh miutaku@192.168.20.250
cat /proc/pressure/io /proc/pressure/cpu /proc/pressure/memory
#   io   full avg10 が高い (数十%〜) → ローカル I/O 飽和 = 本ケース
#   cpu  full が高い              → CPU 不足
#   memory full が高い           → メモリ不足 / swap
top -b -n1 | head -15
free -h                          # メモリ・swap
df -h /mnt/datastore/s3-cache    # キャッシュ空き
sudo proxmox-backup-manager task list --all --output-format text | tail -n 40
```

> 実測例 (単一バックアップ中): `io full avg10≈34%`、CPU 90% idle、mem 3.3Gi available、
> sdb write ≈ 187KB/s。スループットは小さいのに I/O 待ちが高い = fsync レイテンシ律速。

**対策 (効く順):**

1. **datastore の sync-level を下げる (本丸)**。データ本体は S3 にあり再生成可能なので `none` で可:
   ```bash
   sudo proxmox-backup-manager datastore update pbs-s3 --tuning sync-level=none
   ```
   ※ `group_vars/pbs.yml` の `pbs.sync_level` で管理。`proxmox_backup_server` ロールが冪等に適用する。
2. **バックアップを直列化** (実施済み)。ノード別ジョブ + 時刻ずらし + `max-workers=1` は
   fsync 同時競合を避けるので有効。
3. (任意) ホスト側 local-zfs の ZVOL `sync` 緩和 / SLOG 追加。

`bwlimit` / `zstd` / `put-rate-limit` は I/O 律速の今回には効きにくい (帯域・PUT が
ボトルネックと PSI で確認できたときの弁)。それでも不安定なら local datastore を一次保存先にし
別途 S3 へ sync / archive する構成も検討する。

復旧を急ぐ場合は (実行中バックアップ中断を許容して) proxy だけ再起動。VM 全体再起動より軽い:

```bash
sudo systemctl restart proxmox-backup-proxy
```

### Web UI で Login failed になる

`admin@pbs` が存在しても `/etc/proxmox-backup/shadow.json` が無い場合、PBS realm の
パスワードが未設定。`proxmox_backup_server` ロールを再実行すると、未設定状態の
`admin@pbs` を作り直して BSM の `PBS_ADMIN_PASSWORD` を設定する。

### Web UI で Forbidden (403) になる

`admin@pbs` に datastore だけの権限しかないと、Dashboard や Node status などで
`permission check failed` になる。`proxmox_backup_server` ロールを再実行すると
`/` に `Admin` role を付与する。実行直後は Web UI をログアウトして入り直す。

### PVE backup が template VM で止まる

`template-ubuntu-...` などの Packer template VM (`9001`, `9002`) で以下のように止まる場合:

```text
INFO: status = stopped
INFO: backup mode: stop
INFO: starting kvm to execute backup task
INFO: qmpstatus=prelaunch のまま進まない
```

PVE backup job から template VM を除外する。PVE Web UI では
`Datacenter` → `Backup` → 対象ジョブ → `Edit` で `9001`, `9002` を外す。
ハング中の task は PVE Web UI の task viewer から `Stop` する。

停止後、対象 template VM の lock が残る場合は PVE ノードで確認する:

```bash
qm status 9001
qm status 9002
```

### キャッシュディスクが見つからない

`cache_disk` ロールが `/dev/sdb` を見つけられない場合、PBS VM に scsi1
(Terraform `module.pbs` の `data_disk_size`) が付いているか、デバイス名が
`/dev/sdb` か確認し、必要なら `group_vars/pbs.yml` の `cache.device` を修正する。

### apt 401 エラー (enterprise リポジトリ)

```bash
sudo rm -f /etc/apt/sources.list.d/pbs-enterprise.list
sudo rm -f /etc/apt/sources.list.d/pbs-enterprise.sources
sudo apt update
```
