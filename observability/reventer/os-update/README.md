# 監視VMのOS自動更新

2026-10-06: 実収集canary・限定IAM・両VMの制御配置と読み取り確認まで完了。
更新タイマーはまだ有効化していない。
完全なOS復旧用50GB volumeの一時課金について、ユーザー回答を待つ。
現在194GBのため、復旧volumeを追加すると244GBになる。故障volumeは検証・
調査が終わるまで残すので、削除までの期間は超過料金が発生し得る。

## 更新と判定

Ubuntu 22.04 LTSのsecurity / updatesを毎日適用し、必要なサービス再起動と
OS再起動を含めて検証する。LTSのメジャー移行は別途行う。保存ソフトとPDCの
イメージdigestは、OS更新とは独立して管理する。

VM01のcontrollerがVM02を04:00 JST、VM02がVM01を10:00 JSTに更新する。
各timerに最大5分のjitterがあり、停止中に逃した実行は起動時にまとめて走らせない。
更新制御は更新対象の外で動き、SSHやOSが壊れてもOCI APIで復旧できる。

1. 両VMにSTG/PRDのMetricsとLogs canaryが180秒以内に届いていることを確認。
   canaryはアプリnamespaceからFluent Bit・vmagentの実収集経路を通る。
2. OCI instanceの`extended_metadata.reventer_os_maintenance`をETag付きで更新し、
   排他制御する。同一VM内ではflockも使う。実行途中のjournalを時間だけで解放しない。
3. 対象VMのPDCと保存プロセスを止め、boot時のPDC自動起動も除外する。
   もう一方の保存・収集は継続する。整合したboot backupがAVAILABLEになってから
   初めてOS更新する。バックアップ枠や健康確認が失敗したら更新しない。
4. 現在のLTS内で`apt-get full-upgrade --no-remove`を実施し、再起動する。
   package削除が必要な更新は自動処理せず、失敗として扱う。
5. 保存サービスを起動し、canaryの新着と書き込み・queryを確認。
   退避区間は正常側から5分ずつMetricsをstream転送し、Logsは不足する同一recordの
   件数だけ追加する。Metricsのsample数とLogsの内容・件数も確認する。
6. 30秒間隔で3分間、両方の実収集を確認してから、対象PDCを元の状態へ戻す。

## 失敗と切り戻し

更新・boot・実収集・query・catch-upのいずれかが失敗したら、次のVMは更新しない。
正常側controllerが更新前backupからboot volumeを復元し、OCIのboot replacementで
OS・kernel・Docker・設定・保存データを一緒に戻す。aptのpackage downgradeだけを
OS全体のrollbackとは扱わない。

復元boot後もPDCを除外し、正常側の履歴を補完してcanary / parityを再確認する。
成功したrollbackも`phase=blocked`とし、不具合のある更新を翌日再適用しない。
制御プロセスの中断はjournalから同じ対象の復旧だけを再開する。更新前の中断なら
元の保存サービスを戻す。両方が不健康なら他方のOSには手を加えない。

queueには容量上限があり、全障害時の無欠損やゼロ秒切り替えを保証しない。
catch-upが4時間超・5分のLogs windowが10MB超になる場合は自動復帰を止め、
operatorが生存replicaから再seedする。staleな保存先をPDCへ戻さない。

故障した元boot volumeは自動削除しない。復旧検証後、対象OCIDとbackupを確認して
整理する。OKE volumeや無関係なbackupを削除しない。復旧後にboot sourceが変わる
ためTerraformは意図したboot sourceとjournalを再作成理由にしない。

## 権限と依存

- OCIは2 instance OCIDだけのdynamic group / instance principalを使う。
  管理者のOCI API keyやSSH秘密鍵をVMへ配らない。
- 変更権限はdefined tagで監視instance / boot / backupへ限定する。
  `VOLUME_CREATE/DELETE`は独立した復旧compartmentだけに付与する。
  OKE volumeの変更やinstanceの作成・削除権限を与えない。
- backup / volume / compartmentの一覧は、tenancy全体の無料backup枠確認のため
  read-onlyで確認する。検証済みbackupを各VMで最新1個ずつ残し、今回のcontrollerが
  作成した古い検証済みbackupだけを整理する。手動backupは触らない。
- peer専用鍵は各VM自身で生成し、秘密鍵は外へ出さない。相手の公開鍵だけを登録する。
  private IPからのSSHで、port forwarding / PTYを禁じ、固定のmaintenance helperだけを
  実行できるforced commandにする。host keyも固定し、未知のkeyを自動受け入れしない。
- OCI SDKと全依存はPython 3.10 amd64用のversion / SHA256を固定する。
  package managerと分離した`/opt/reventer-os-update/deps`を使う。

## 準備と有効化

1. 通常のPRD OCI CLI認証で`prepare-reventer-os-update.py`を実行し、既存defined tagを
   非公開tfvarsへ保存する。`terraform plan`を確認してIAM / NSGをapplyする。
   VMの作り直しや、課金される復旧volume作成を含めない。
2. 同scriptの`--tag-boot-volumes`で、対象2 boot volumeの既存tagを保持してRoleを追加。
3. `requirements.lock`に従いPython 3.10 amd64のwheelsを取得する。
   `deploy-reventer-os-update.py`はデフォルトではinstall / read-only checkだけを行う。
4. 課金方針の承認後、実backupからのboot replacement・catch-up・実収集の復旧を
   片側で検証し、他方を稼働させたまま動くことを確認する。
5. `deploy-reventer-os-update.py --enable --allow-paid-recovery`で有効化する。
   独立したUbuntu unattended upgradeは、この段階で初めて無効化し、同時更新を防ぐ。

運用は`systemctl list-timers reventer-os-update.timer`、
`journalctl -u reventer-os-update.service -u reventer-os-upgrade.service`とOCI journalを確認。
`blocked`を解放する前に、両VMの履歴・freshness・queueと失敗原因を確認する。
Terraformからjournalを上書きしない。故障volumeの整理とbackup数も確認する。
bundle / credentialsの変更はjournalがidleの間に行い、更新との重複を避ける。

## 今回の検証範囲

実STG/PRD collector経由で、両VMのcanary Metrics / Logsが新着になることを確認。
制御の15テスト（収集停止、backup失敗、rollback後の次系抑止、中断再開、排他、
未来時刻の拒否など）とTerraform validationを実施した。
両VMで実収集・forced SSH・OCI readの`--check`も成功。controllerの最大RSSは
約70MiB（read-only check時）。既存のUbuntu security update timerは維持した。
実OS更新・課金volumeからのboot復旧・タイマー有効化は、課金方針の回答後に実施する。

公式仕様:
- [Ubuntu automatic updates](https://documentation.ubuntu.com/security/security-updates/)
- [OCI boot replacement](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/replacingbootvolume.htm)
- [OCI boot restoration](https://docs.oracle.com/en-us/iaas/Content/Block/Tasks/create-restore-bv-boot-volume-backup.htm)
- [Always Free storage and backup quota](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
