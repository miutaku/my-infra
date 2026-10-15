# nas-02 IDrive e2 backup

nas-02のうち再構築に必要なfile dataを、IDrive e2の`miutaku-my-infra-backup` bucket内
`nas-restic` prefixへresticで暗号化・差分backupする。

## 対象

- `home-k8s-nextcloud-html`
- `tnlastation` / `tnlastation-staging`
- `thumbnail` / `drop`

`recorded` / `recorded-staging`は既存の録画専用IDrive jobで別に保護する。VictoriaMetricsとDB raw dataは
稼働中のfile copyでは整合性を保証できないため対象外である。DBは`infra-db/mariadb-backup`のlogical dumpを
復元元とし、VictoriaMetricsは専用の整合性のあるsnapshot backupで保護する。

## 運用

- 毎日04:00 JST（DB logical backupの1時間後）
- 日次7、週次4、月次3 snapshotを保持
- restic repositoryが14 GB以上でDiscord警告、17 GB以上では新規backupを停止
- 容量閾値はNASの既存予算であり、IDriveの無料枠ではない
- backup後に`restic check`を実行

資格情報はBSMの`MY_INFRA_IDRIVE_S3_ACCESS_KEY` / `MY_INFRA_IDRIVE_S3_SECRET_KEY`と`NAS_BACKUP_RESTIC_PASSWORD`からExternal Secrets Operatorが生成する。
restic passwordを失うとrepositoryは復元不能なので、BSMから削除してはならない。

手動実行:

```bash
kubectl create job -n infra-backup --from=cronjob/nas-backup nas-backup-manual-$(date +%s)
kubectl logs -n infra-backup -f job/<job-name>
```

復元試験では同じSecretとrepositoryを使う一時Podを作り、空の`emptyDir`へ
`restic restore latest --verify --exclude-xattr security.selinux --target`を実行する。元のownerとtimestampを
復元するPodにはrootと`CHOWN`/`FOWNER` capabilityが必要である。本番NFSへ直接restoreせず、ファイル数・
内容を確認してから別手順で戻す。

