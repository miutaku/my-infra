# nas-02 OCI backup

nas-02のうち再構築に必要なfile dataを、OCI Object Storageの既存`db-backup` bucket内
`nas-restic` prefixへresticで暗号化・差分backupする。

## 対象

- `home-k8s-nextcloud-html`
- `tnlastation` / `tnlastation-staging`
- `thumbnail` / `drop`

`recorded` / `recorded-staging`はOCI Always Free容量を守るため対象外とする。VictoriaMetricsとDB raw dataは
稼働中のfile copyでは整合性を保証できないため対象外である。DBは`infra-db/mariadb-backup`のlogical dumpを
復元元とし、VictoriaMetricsは再収集可能な監視履歴として扱う。

## 運用

- 毎日04:00 JST（DB logical backupの1時間後）
- 日次7、週次4、月次3 snapshotを保持
- restic repositoryが14 GB以上でDiscord警告、17 GB以上では新規backupを停止
- OCI全体20 GBのうち、DB logical dump用に約1 GB以上を予約
- backup後に`restic check`を実行

資格情報はBSMの既存OCI S3 keyと`NAS_BACKUP_RESTIC_PASSWORD`からExternal Secrets Operatorが生成する。
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
