# Grafana Cloud monitoring

自宅のVictoriaMetricsをGrafana CloudのPrometheusデータソース/PDC経由で参照し、Grafana-managed alertsとdashboardをTerraformで管理する。
対象は自宅インフラとhome-k8s上のサービス。KSMでは対象namespaceを明示し、ノード情報・クラスタ共通情報と併せて収集する。
既存データソース、PDC network/token、通知先、stack全体の通知ポリシーは作り直さない。

## 管理対象

`rules.json` が共通のアラート定義、`targets.json` が自宅の必須系列の台帳。閾値・継続時間を変更したら同じ式を使うpromtoolテストも確認する。
`warn` は余力・冗長性の低下、`critical` は重要サービスの停止・データ危険・監視喪失を表す。

| 対象 | warn | critical |
| --- | --- | --- |
| UPS A/B | OBかつ残量85%超が30秒、負荷70%超が10分、交換要求5分 | OBかつ残量85%以下、LB/FSD/OFF/OVER。負荷90%超2分。NUT取得失敗2分 |
| PVE/各VM・home-k8sノード | CPU85%超15分、メモリ空き15%未満10分 | メモリ空き5%未満5分、OOM kill |
| 永続filesystem | 容量/inode80%超15分 | 90%超5分、read-only化。Talosの意図したrootfs read-onlyは除外 |
| PVE・NAS・IX2215 | exporter取得失敗3分 | ICMP失敗2分、常時稼働の主要PVE guest停止3分 |
| PVE ZFS | — | poolがdegraded/faulted/offline等 |
| NAS mounted dataset | 使用率75%超15分 | 85%超5分。SNMPのdataset使用量で、pool全体の物理使用量とは異なる |
| IX2215 | CPU80%超15分、NAPT割当失敗増加5分 | 死活ルールで検出 |
| ホストNIC品質 | 稼働IFの受信/送信エラー率1%超かつ1件/秒超が5分 | — |
| IX2215 IF品質 | 稼働中の主要IFの受信/送信エラー1件/秒超、ドロップ10件/秒超が5分 | — |
| ホストload average | 5分loadのCPUコア数あたり値が1.5超で15分 | — |
| 回線速度 | 15分内の3回以上の測定がすべてdownload 25 Mbps未満/upload 20 Mbps未満 | — |
| lb-01/02 | 片系停止/HAProxy・Keepalived停止5分 | 両系停止/どちらかの必須サービスが全系停止2分 |
| Nextcloud/Mirakurun/EPGStation/TNLaStation/Loockit/coupon-manager | replica不足10分 | HTTP probe失敗3分、重要Deployment/StatefulSetのReady=0が2分 |
| DNS/API/DB・NFS transport | — | DNS応答/答えの検証、API readyz、TCP接続失敗2分 |
| UniFi/MagicMirror/開発VM | UI停止5分、開発VM疎通断10分、指定systemd service失敗15分 | 原則warn。データ危険は容量等の共通ルール |
| Kubernetes | Node NotReady/Pressure5分、Pod Pending10分、再起動増加、PVC Pending | home control plane Ready<2が1分、home worker全停止2分、PVC Lost |
| 日次DB/NAS backup | 最終成功から26時間超5分 | 48時間超5分、必須CronJob削除/停止5分 |
| 毎時VMetrics/録画backup | 最終成功から2時間超5分 | 6時間超5分、必須CronJob削除/停止5分 |
| vmagent | write queue増加継続 | sample drop、queue blocked、self-scrapeの鮮度喪失 |
| TinyTuya/speedtest収集 | scrape失敗30分 | 設定しない |

同じ数値のwarn/critical条件は排他的にする。desired replicasが0のcontrollerは異常としない。
NIC品質は5分間のrateをIF別に比較し、loopback・一時的なコンテナIFを除く。IX2215はGigaEthernet0/2とそのサブIF、BVI、Tunnelインターフェースを対象とする。SNMPにpacket counterがないため、routerの判定は毎秒件数を使う。
回線速度は5分間隔の測定を使い、直近結果が10分以上古い場合や15分内に3回未満しか結果がない場合は低速通知を出さない。
UPSは[既存の80%停止](../../docs/ups-shutdown.md)に先行して通知するため収集15秒、評価10秒。Grafana schedulerの10秒刻みに合わせる。Grafanaが利用不能でもNUTの自動停止は動作する。

追加する機能監視は以下。HTTP/TCPの死活と別に評価する。

| 対象 | warn | critical |
| --- | --- | --- |
| Cloudflare Access公開経路 | 公開TLS証明書の残り14日未満 | 専用Service Tokenで認証し、期待するHTTP 200/本文に到達できない状態2分。TLS残り3日未満 |
| TrueNAS | pool物理使用率80%超、最終成功scrubから35日超 | pool物理使用率85%超、pool異常、disk/SMARTの重大alert、scrubエラー、最終成功から60日超 |
| DB | 接続数80%超5分、lock待ち5分、60秒超queryが10分継続 | SELECT 1/統計取得失敗2分、接続数95%超5分 |
| 録画 | 24時間内の予約競合、EPG更新24時間超、encode待ち10件超・録画終了から1日超 | 録画開始遅延/途中停止/完了後video欠落、tuner異常、EPG更新48時間超/未準備30分、encode待ち30件超・3日超 |
| PBS | VM別backup鮮度4時間超、7日以内のverify済みsnapshotなし | backup鮮度8時間超、保持snapshotのverify失敗 |
| S3/restic・復元 | NAS repository実object容量14 GB超、復元成功が28日以上なし | 17 GB超、DB read-back/NAS repository/録画保存先の確認が期限超過、復元Job失敗 |
| 制御系 | etcd片系取得不可、CSR滞留10分超 | leaderを認識するetcdが2台未満、leader数が1以外、API VIP所有数が1以外、CSR拒否/失敗、API/kubelet証明書残り3日未満 |
| switch/AP | 必須port台帳未設定 | US-8-60W/FS APの死活、必須portリンク断2分 |
| 運用系 | ESO更新が各refreshIntervalの2倍+15分を超過、Argo OutOfSync 15分、ARC待ち15分 | ESO Ready=false 5分、Argo unhealthy 5分 |


## 設定と初回移管

1. 対象stackのサービスアカウントを用意し、BSMに`GRAFANA_URL`と`GRAFANA_SERVICE_ACCOUNT_TOKEN`を登録する。APIにはdatasource read、folder/dashboard/alert provisioningの権限が必要。
2. `python3 scripts/grafana-monitoring.py inventory` で既存のPrometheus UID、PDC network、通知先名を確認する。BSMのPDC tokenやCloud Metrics書込tokenは設定APIの認証には使えない。
3. 確認済みの自宅UID・通知先を記載した`environments.tfvars`を利用する。接続先設定を変える場合は`terraform.tfvars.example`を参考に別の変数ファイルを用意する。新規folder `my-infra-home`へルールを作成する。
4. `python3 scripts/grafana-monitoring.py plan --var-file terraform/grafana-cloud/environments.tfvars` を実行する。無関係な削除・既存通知先の変更がないことを確認する。
5. applyする実行環境にも`GRAFANA_URL`/`GRAFANA_AUTH`を設定し、確認したplanに従って反映する。`paused=true`が初期値で、アラート通知はまだ有効にならない。
6. 収集側のGitOps同期、Grafana経由のquery、通知先の受信を確認した後に`paused=false`で再plan/applyする。通知テストは別途許可された範囲で実施する。

stateは他のroot moduleと分離した`.state/terraform.tfstate`。初回apply前に永続保存先を決め、stateを紛失・複製しない。共有運用でHCP Terraformを使う場合は専用workspaceのbackendへ移行し、このstateだけを管理する。
state・実入力・planはGit管理しない。Provider認証は環境変数から渡し、APIレスポンスの受信先設定や秘密値をログへ出さない。

### 収集機能の切替

`environments.home.features`で追加収集が必要なルールを切り替える。入力は`home`だけを受け付ける。

| feature | 必要な収集 | この変更で追加するもの |
| --- | --- | --- |
| `kubernetes` | kube-state-metrics | home用Deployment/RBAC/ServiceとArgoCD登録、vmagent scrape。Secret値の取得権限は与えない |
| `probes` | 新しいblackbox modulesとtarget | DNSの内部名/外部名、API readyz、DB/NFS TCP、TNLaStation・Loockit・coupon-manager、Nextcloud本文検証 |
| `backups` | CronJob状態（`kubernetes`も必須） | KSMのlastSuccessfulTimeによる日次/毎時の鮮度・削除・suspend検知 |
| `access` | home-service-monitor + Access Service Token | 自宅のAccess保護URL16件に認証付き/認証なしで接続し、期待本文・保護有無・公開TLS期限を確認 |
| `storage_api` | TrueNAS read-only API key | 実機23.10のDDP WebSocket APIによるpool物理使用量・健全性・scrub・disk/SMART alert |
| `database` | DBの専用monitoring user | MariaDB / PostgreSQL両系統へのSQL・接続数・lock/長時間query |
| `recording` | Mirakurun/EPGStation/TNLaStation API | TV service別EPG更新時刻、tuner、予約と録画状態の照合、encode待ち。EPGStationの録画失敗hookも永続化 |
| `backup_integrity` | PBS read-only API、S3、復元Job（`kubernetes`必須） | VM別backup/verify、S3 object実容量、保存先検証結果、隔離DB復元とresticサンプル復元、PBS実復元結果の受付 |
| `control_plane` | etcd metrics patch、VIP DaemonSet、追加TLS probe（`probes`必須） | etcd member/leader、Talos API VIP所有数、API/kubelet証明書 |
| `network` | ICMP + UniFi API key | FS AP・US-8-60Wの死活、台帳の必須port状態 |
| `operations` | Argo metrics、ARC listener metrics、ESO/CSR read-only API | 同期/health、待ちJob、Secret更新、ノード証明書発行停止 |


`environments.tfvars`は全機能を含めた計画を`paused=true`で確認するための入力。通知を有効化する前に、未収集・認証未設定のfeatureを外し、対象機能のquery/必須系列が揃っていることを確認する。
必要なBSMキー名は`k8s/pve/home-service-monitor/external-secret.yaml`を参照。秘密値はBSM→ExternalSecret→投影volumeへ渡し、Terraform state/ConfigMap/ログへ入れない。
内部APIの公開leaf証明書は`k8s/pve/home-service-monitor/certificates`へ固定し、期限・署名と証明書自体の一致を認証情報送信前に確認する。工場設定のhostnameを持つためhostname照合だけは使わない。証明書更新時はこの公開ファイルも更新する。公開Access probeは通常のCA/hostname検証を使う。
Nextcloudのstatus probeは内部Serviceへ接続し、`Host: nextcloud.miutaku.work`を送る。Nextcloudのtrusted domain検証に合わせ、HTTP 200とinstalled/maintenance/needsDbUpgradeの本文を確認する。
home用`targets.json`の必須系列は3分欠測+2分継続、UPS/停止guardは1分欠測+1分継続で通知する。Pod IPの変化や系列の部分消失を正常復旧と見なさず、固定instanceごとに検知する。
通常ルールの条件なしは0を返す。datasource接続・queryエラーは`Error`として通知する。PDC全断では複数のDatasourceErrorが出る可能性があり、初回受信試験で件数・集約を確認する。

### 通知

`contact_points.warn`と`contact_points.critical`に既存の通知先名を指定する。ルールの`notification_settings`で直接routingし、stack全体のpolicy treeを置き換えない。
warnはgroup_wait=2分/repeat=12時間、criticalは30秒/1時間。電源criticalだけgroup_wait=0秒。
復旧通知の有効/無効は既存contact pointの設定に従う。UIでruleを編集せずTerraformへ反映する。
計画停止にはGrafanaの対象を絞った終了時刻付きsilenceを使う。

## 確認方法

```bash
terraform -chdir=terraform/grafana-cloud init -backend=false
terraform -chdir=terraform/grafana-cloud fmt -check -recursive
terraform -chdir=terraform/grafana-cloud validate
terraform -chdir=terraform/grafana-cloud test
python3 scripts/test-grafana-monitoring.py --promtool /path/to/promtool
kubectl kustomize k8s/pve/kube-state-metrics

# 既存collectorで取得できる式・必須系列をread-only検査
python3 scripts/check-grafana-monitoring.py
# GitOpsで追加collectorを反映した後
python3 scripts/check-grafana-monitoring.py --features kubernetes,probes,backups
# 実際のGrafana Cloud → PDC経路でも検証
python3 scripts/check-grafana-monitoring.py --grafana-uid cfkolv57kzn5sd
```

CIは認証不要のmock plan、PromQL構文と閾値/欠測/scale-to-zero等の回帰テスト、Kustomize buildを実行する。CIからのapplyは行わない。
read-only検査で表示される「condition true」は継続時間未判定で、通知を送信しない。

## アラート受信時の入口

- **電源**: `upsc`でOB/残量を確認し、[給電先・cross-power構成](../../docs/ups-shutdown.md)を確認する。Grafanaから停止操作はしない。
- **ホスト/ストレージ**: 同じinstanceのICMP・exporter・ZFS状態・使用率を照合する。NASとPVE停止を先に確認してからアプリを調べる。
- **サービス**: namespaceのDeployment/StatefulSet/Pod・イベントを確認し、DB/NFS/DNSの障害を切り分ける。TCP成功だけで機能正常と判断しない。
- **backup**: CronJobの直近Jobとログ、保存先の検証結果を確認する。最終成功なしはCronJob作成時からの経過で判定する。DB jobはMariaDBとPostgreSQL両系統を含む。
- **監視喪失**: vmagent targets/queue、保存先、PDCを順に確認する。古いサンプルの表示やMissingSeriesによる解消は実復旧ではない。

## 収集・検証の前提と範囲

- NFSの実read/write、NextcloudのWebDAV操作、拠点外heartbeat・metric/log canaryは追加対象外。既存のTCP/HTTP・収集欠測監視は維持する。
- AccessはService Tokenによる機械認証を確認する。人間のIdPログイン/MFA操作や、接続先アプリ内のログイン・業務操作までは実行しない。ログイン画面へのredirectやHTTP 200のAccessログインHTMLは成功にしない。
- switchの必須portは2026-10-17の実機`swctrl port show`のUP状態を基準に**1,2,3,4,7,8**へ固定した。5,6はDOWNで除外。再起動や一時的なリンク断から自動学習し直さない。FS APはICMP/TLS公開経路までで、SSID別の通信試験はしない。
- TrueNAS実機23.10ではDDP WebSocket API（`/websocket`）を使い、`pool.query`と`alert.list`だけを許可したキーで収集する。TrueNAS自身のdisk/SMART alertを使用する。SMART生属性を独自採点するcollectorではない。scrubは成功時刻を90日窓で照会するが、現行VictoriaMetricsの保存期間は30日。直近scanが進行中でも保存中の前回成功を参照する。30日以上収集できなかった場合や前回成功を観測していない場合は、成功時刻不明として異常を出す。
- EPGはTV serviceごとの`epgUpdatedAt`を使う。encode APIにenqueue時刻がないため、待ち時間は「待機中録画の終了時刻からの経過」として扱う。録画APIから消えた過去の失敗を完全に復元する監査ではなく、現在の予約/録画状態とEPGStationの失敗hookを確認する。
- DBはSQLの実行・接続/lock状況まで。自動書き込みテストは実行しない。
- DB backupの検証指標は全dumpのS3読み戻しchecksum一致後、NASは`restic check`後、録画実体は保存先の名前/size一致後に送信する。それぞれ検証の強さが異なる。S3容量は`restic stats`の論理量ではなくrepository prefix配下の実object byte合計。
- 毎週の復元Jobは本番DBへ接続せず、S3のdumpを一時領域のMariaDB 11.8/PostgreSQL 18へ実復元する。PostgreSQLのowner/grantの復元は対象外。NASは最大1 MiBのファイルをresticから一時領域へ復元・検証するサンプル試験で、全ファイル/全アプリの復旧保証ではない。
- PBS VMの実復元・起動確認は別途隔離環境で実施し、実施結果だけを`scripts/report-backup-restore.py`で登録する。自動でVMを作成/起動しない。VMごとに28日間成功報告がない場合warnとし、PBS backup/verify成功で代用しない。
- HCP Terraform APIのRun待ち監視は対象外。TFC agentのDeployment停止・欠測と関連Secretの更新はクラスタ側で監視する。agent稼働中のRun滞留は検知しない。
- Talosのetcd metrics patchは既存3ノードへ別途順次反映が必要。collector/Argo同期・API認証・Grafana queryが揃うまでは通知を有効にしない。

参照: [Grafana Terraform provisioning](https://grafana.com/docs/grafana/latest/alerting/set-up/provision-alerting-resources/terraform-provisioning/)、[欠測の扱い](https://grafana.com/docs/grafana/latest/alerting/guides/missing-data/)、[Provider rule schema](https://registry.terraform.io/providers/grafana/grafana/4.46.0/docs/resources/rule_group)。
