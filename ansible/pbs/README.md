# ansible/pbs

Proxmox Backup Server (PBS) 4.x を **Debian 13 (trixie) VM** 上に構築する Ansible playbook。
バックアップはローカルHDDの `pbs-hdd` に取得し、日次検証後に **IDrive e2** の `pbs-s3` へ同期する。

対象ホスト: `192.168.20.250` (PVE VM `pbs-01-debian-13-home-amd64`、`terraform/pve` の `module.pbs` で作成)
到達目標: `https://192.168.20.250:8007` で PBS が稼働し、S3 datastore・admin@pbs ユーザ・
GC/prune ジョブが登録済みの状態。

## アーキテクチャ

- VM は `terraform/pve` の `module.pbs` が `template-debian-13-home-amd64` から clone して作成
  (テンプレートは `packer/debian-13` でビルド)。
- PBS が自己署名証明書を生成する際の ASN.1 CN 長制限を避けるため、VM 名 / hostname は
  `pbs-01-debian-13-home-amd64` のように短めに保つ。
- ディスク: `scsi0` = OS (20G)、`scsi1` = S3キャッシュ (64G、SSD)、`scsi2` = 短期バックアップ (350GiB、HDD)。
- HDDは `pve-x570` のローカルストレージ。PBSを別ノードへそのまま移動できない。
  ホスト障害時は、IDriveの既存datastoreを単一の復旧用PBSへ引き継いで復元する。

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
| ID | `pbs-local` |
| Server | `192.168.20.250` |
| Datastore | `pbs-hdd` |
| Username | `admin@pbs` |
| Password | BSM に登録したパスワード |
| Fingerprint | 上記コマンドで取得した値 |
| Content | `VZDump backup file` |
| Nodes | 空欄 (クラスタ全ノードで利用) |

`Datacenter` 配下に追加するため、PVE クラスタ内の `pve-x570` / `pve-b550m` の両方から
同じ storage ID `pbs-local` として使える。`pbs-home` はIDrive上の過去世代の復元用に残す。

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
| `pbs-home-x570` | ノード制限なし | 運用中13 VM/CT (`9001,9002`を除く) | `*/4:00` | `bwlimit=20480`, `performance=max-workers=1`, `zstd=1` |

PVE Web UI で作る場合の基本値:

| フィールド | 値 |
|---|---|
| Storage | `pbs-local` |
| Mode | `Snapshot` |
| Node | 対象ノードを指定 (`pve-x570` / `pve-b550m`) |
| Schedule | ノード間でずらす (`*/2:05`, `*/2:35` など) |
| Selection mode | 対象ノード上の VM/CT のみ選択 |
| Bandwidth limit | `20480` KiB/s から開始 |
| Performance / Max workers | `1` から開始 |
| Zstd threads | `1` から開始 |
| Retention | `keep-all=1` (PVE では削除せず、PBS 側で prune) |

> PVE の `zstd` は圧縮レベルではなく **zstd スレッド数**。大きくすると圧縮率が上がる
> という意味ではなく、バックアップ元ノードとPBSへの投入並列度が上がる。

PVEでは `prune-backups=keep-all=1` を明示し、世代削除はPBS側で管理する。
HDDは最新3世代に加え、検証・同期済みの復元用世代を保護して保持する。
IDrive側は日曜03:00に直近3・日次7・週次4・月次6のポリシーでpruneする。
ローカルの削除をIDriveへ伝播させる `remove-vanished` は無効にする。

`pve-tiered.yml` は保存先と容量フックを管理する。既存ジョブの対象・4時間周期・負荷制限を確認する:

```bash
pvesh get /cluster/backup/pbs-home-x570 --output-format json
```

verify のアラートは「現在保持されている snapshot のうち、backup 時刻が7日以内で
verify 成功済みのものがあるか」を評価する。未検証の最新 backup があっても、
条件を満たす検証済み世代が残っていれば発火しない。設定変更だけでは未検証世代に
検証結果は付かないため、次の verify と監視メトリクス更新後に復旧を確認する。

Packer template VM (`9001`, `9002`) は4時間周期の定期ジョブには含めず、
Packerによる再生成後に下記の方法でPBSへ取得し、verifyまで確認する。
`qmpstatus=prelaunch`は停止VMのバックアップで使う通常の状態で、これだけではハングとは判断しない。

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

ローカル S3 キャッシュディスクの fsync I/O が飽和すると、バックアップ処理が停止することがある。
PBS の datastore は default で sync-level が高く chunk ごとに頻繁に fsync する。キャッシュ
ディスク (scsi1) は local-zfs ZVOL のため fsync が ZIL 同期書き込みになり 1 回ずつ遅い。
同時バックアップで fsync が競合すると I/O が飽和し、`proxmox-backup-proxy` が I/O 待ちで
固まって `:8007` が無反応になる (SSH は別プロセスなので生存する)。

ハング中、または負荷の高いバックアップ中に PSI を確認する:

```bash
ssh miutaku@192.168.20.250
cat /proc/pressure/io /proc/pressure/cpu /proc/pressure/memory
#   io   full avg10 が高い (数十%〜) → ローカル I/O 飽和
#   cpu  full が高い              → CPU 不足
#   memory full が高い           → メモリ不足 / swap
top -b -n1 | head -15
free -h                          # メモリ・swap
df -h /mnt/datastore/s3-cache    # キャッシュ空き
sudo proxmox-backup-manager task list --all --output-format text | tail -n 40
```

**対策 (効く順):**

1. **datastore の sync-level を下げる**。データ本体は S3 にあり再生成可能なので `none` で可:
   ```bash
   sudo proxmox-backup-manager datastore update pbs-s3 --tuning sync-level=none
   ```
   ※ `group_vars/pbs.yml` の `pbs.sync_level` で管理。`proxmox_backup_server` ロールが冪等に適用する。
2. **バックアップを直列化**。ノード別ジョブ + 時刻ずらし + `max-workers=1` は
   fsync 同時競合を避けるので有効。
3. (任意) ホスト側 local-zfs の ZVOL `sync` 緩和 / SLOG 追加。

`bwlimit` / `zstd` / `put-rate-limit` は fsync が律速の場合には効きにくい (帯域・PUT が
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

### PackerテンプレートのPBSバックアップ

テンプレートは9001が`pve-x570`、9002が`pve-b550m`にある。
停止・`template=1`・既存backup/lockなしを確認し、ノード側で1台ずつ実行する。
下記は9001の例で、9002は対応ノードとIDに置き換える。

```bash
systemd-run --unit=pbs-template-backup-9001 --collect \
  --property=Nice=10 --property=RuntimeMaxSec=2h \
  --property=KillSignal=SIGINT --property=TimeoutStopSec=120 \
  /usr/bin/vzdump 9001 --storage pbs-home --mode snapshot \
  --bwlimit 20480 --performance max-workers=1 --zstd 1 \
  --prune-backups keep-all=1 --notes-template '{{guestname}}' --lockwait 1
journalctl -u pbs-template-backup-9001 --no-pager -n 20
```

接続側の短いtimeout付き`pvesh create .../vzdump`で長時間ジョブを実行しない。
CLI実行は完了まで接続を使い、切断で`broken pipe`になってQEMU側の転送が残る場合がある。
`systemd-run`によりSSH切断から独立させ、nativeタスクの`OK`と元の停止状態への復帰を確認する。
停止テンプレートはバックアップ用QEMUを`prelaunch`で動かし、ゲストOSは再開しない。
進捗率・転送量が増えているかを見る。`prelaunch`だけを根拠に停止しない。

PBSのsnapshot一覧で、取得した**正確な時刻**に`index.json.blob`とディスクの`.fidx`があることを確認し、
PBSホストでその1世代だけをverifyする（`BACKUP_EPOCH`はsnapshotの`backup-time`）。

```bash
proxmox-backup-debug api create /admin/datastore/pbs-s3/verify \
  --backup-type vm --backup-id 9001 --backup-time "$BACKUP_EPOCH" \
  --read-threads 1 --verify-threads 2 --ignore-verified true --outdated-after 7 \
  --output-format json
```

verifyのタスク結果`OK`とsnapshotの`verification.state=ok`を両方確認する。
この確認はデータ整合性検査で、別VMへの実復元・起動試験の代用にはならない。
設定・認証情報をログや一時ファイルへ書き出さない。

古いmanifest欠落世代は、新しい正常世代のbackup・verify成功後に整理する。
backup IDだけで一括削除せず、対象時刻、未完了（manifestなし）、非protected、
他のbackup/verifyが対象へアクセスしていないことを再確認して、その世代だけ削除する。
新しい正常世代と元テンプレートVMは削除しない。

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

## HDDとIDriveの二段構成

| 処理 | 保存先・頻度 |
|---|---|
| PVEバックアップ | `pbs-local` → `pbs-hdd`、4時間ごと |
| HDD検証・同期 | 毎日06:00 JST。検証成功後、検証済み世代だけを `pbs-s3` へローカル同期 |
| HDD保持整理 | 毎時45分。最新3世代と保護された同期済み世代を保持し、GCを実行 |
| IDrive検証 | 毎月1日06:00 JST。保持中の全世代を一つのジョブで再検証 |

日次処理は `pbs-hdd-daily.service`、保持整理は `pbs-hdd-housekeeping.service` が行う。
最初の同期を確認するまではHDD側のpruneとGCを行わない。同期後は各VM/CTについて
最新の検証・同期済み世代を保護してから、以前この処理が保護した世代の保護を解除する。
手動で保護した世代は解除しない。検証・同期・コピー存在確認の失敗時は既存の保護を維持する。
バックアップが参照中の世代と保護変更が競合した場合は10秒間隔で最大15分再試行する。
新しい保護の設定が完了するまで古い復元用世代の保護を解除しない。
通常のGCには24時間5分の猶予があり、snapshot削除直後に空きが増えるとは限らない。

HDD使用量310GiBで警告し、330GiB以上または空き16GiB未満で、PVEフックが次のVM/CTの
バックアップ開始を抑止する。PVEホストのHDD空き20GiB未満でも抑止する。
容量が回復すれば次の定期ジョブで再試行する。HDDがマウントされていないときは
日次処理・保持整理を拒否し、OSディスクへの書き込みを防ぐ。

IDriveへの同期は1日1回のため、ローカル全損時の復旧点は通常最大約24時間前になる。
検証や同期に失敗するとさらに古くなる。S3側の検証はキャッシュを回避して実データを取得するため、
毎日の検証はHDDだけで行う。同期時の照合・監視はメタデータを読む。

`hdd-to-idrive` の同期ログに出る `downloaded` は、同期元HDDからの読み出しを表す。
IDriveからのダウンロード量は、S3 datastoreのRRDにある `s3/downloaded` と
累積値 `s3/total/downloaded` で確認する。

### 設定と初回切り替え

`hdd` ストレージが `images` を許可していることを確認し、TerraformでPBSに350GiBの
`scsi2` を追加する。既存ディスクはフォーマットしない。Ansibleはスロットの識別子、
ディスクシリアル、既存ファイルシステムを照合し、空の専用ディスクだけを初期化する。

```bash
cd ansible/pbs
ansible-playbook -i hosts/prd tiered.yml --syntax-check
ansible-playbook -i hosts/prd tiered.yml
ansible-playbook -i hosts/prd pve-tiered.yml
```

初回は定期ジョブを停止したまま、対象VM/CTを所属する各PVEノードから `pbs-local` へ
新しくバックアップする。IDrive上の過去世代をローカルへ取り寄せない。
全対象の初回バックアップ完了後、PBSで以下を実行する。

```bash
sudo systemctl start pbs-hdd-daily.service
sudo systemctl status pbs-hdd-daily.service
sudo journalctl -u pbs-hdd-daily.service --no-pager -n 30
sudo cat /var/lib/pbs-tiered/state.json
```

検証成功、IDriveへの全対象コピー、復元用世代の保護を確認して定期バックアップを有効にする。

```bash
ansible-playbook -i hosts/prd pve-tiered.yml -e pbs_tiered_activate=true
```

`pbs-home` はIDriveの既存世代の復元に利用できる。ローカルHDDの故障・ホスト停止時には
このコピーから復元する。HDD上のバックアップを別ノードにもレプリケーションする構成ではない。

### 監視

機能監視の `pbs` は `pbs-hdd` の4時間周期と日次検証を確認する。
IDriveのコピーは36時間、実際のS3検証ジョブの成功は35日を超えると通知する。
同期元の検証結果をS3側の検証成功として扱わない。
