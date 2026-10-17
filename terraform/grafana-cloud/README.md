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
| lb-01/02 | 片系停止/HAProxy・Keepalived停止5分 | 両系停止/どちらかの必須サービスが全系停止2分 |
| Nextcloud/Mirakurun/EPGStation/TNLaStation/Loockit/coupon-manager | replica不足10分 | HTTP probe失敗3分、重要Deployment/StatefulSetのReady=0が2分 |
| DNS/API/DB・NFS transport | — | DNS応答/答えの検証、API readyz、TCP接続失敗2分 |
| UniFi/MagicMirror/開発VM | UI停止5分、開発VM疎通断10分、指定systemd service失敗15分 | 原則warn。データ危険は容量等の共通ルール |
| Kubernetes | Node NotReady/Pressure5分、Pod Pending10分、再起動増加、PVC Pending | home control plane Ready<2が1分、home worker全停止2分、PVC Lost |
| 日次DB/NAS backup | 最終成功から26時間超5分 | 48時間超5分、必須CronJob削除/停止5分 |
| 毎時VMetrics/録画backup | 最終成功から2時間超5分 | 6時間超5分、必須CronJob削除/停止5分 |
| vmagent | write queue増加継続 | sample drop、queue blocked、self-scrapeの鮮度喪失 |
| TinyTuya/speedtest | scrape失敗30分 | 設定しない |

同じ数値のwarn/critical条件は排他的にする。desired replicasが0のcontrollerは異常としない。
UPSは[既存の80%停止](../../docs/ups-shutdown.md)に先行して通知するため収集15秒、評価10秒。Grafana schedulerの10秒刻みに合わせる。Grafanaが利用不能でもNUTの自動停止は動作する。

## 設定と初回移管

1. 対象stackのサービスアカウントを用意し、BSMに`GRAFANA_URL`と`GRAFANA_SERVICE_ACCOUNT_TOKEN`を登録する。APIにはdatasource read、folder/dashboard/alert provisioningの権限が必要。
2. `python3 scripts/grafana-monitoring.py inventory` で既存のPrometheus UID、PDC network、通知先名を確認する。BSMのPDC tokenやCloud Metrics書込tokenは設定APIの認証には使えない。
3. 確認済みの自宅UID・通知先を記載した`environments.tfvars`を利用する。接続先設定を変える場合は`terraform.tfvars.example`を参考に別の変数ファイルを用意する。既存の試作ルールは移管せず、新規folder `my-infra-home`へルールを作成する。
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

未収集のfeatureを有効化しない。
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

## この変更だけでは検知できない項目

以下は合意した監視範囲のうち、収集・認証・機能APIの追加が必要な項目。今回のルールに含まれると見なさない。

| 項目 | 残る実装条件 |
| --- | --- |
| TrueNAS pool物理使用量・ZFS/SMART・scrub | TrueNAS read-only API/exporter。現状のSNMP容量やPVEのZFS状態で代用しない |
| NFS read/write、DB query・lock/connection、WebDAV操作 | 専用の最小権限アカウント/テスト領域。今回はTCP・Pod状態・HTTP statusまで |
| 録画開始失敗・中断、チューナー/EPG/encode queue | Mirakurun/EPGStation/TNLaStationの機能メトリクス。version API成功だけで録画成功としない |
| PBS VM別backup/verify/restore・S3・restic容量予算 | PBS API、保存先検証結果の永続export。KSM Job成功は復元可能性の保証ではない |
| etcd quorum、VIP重複、switch/AP、WAN外部probe、公開Access/TLS | 認証・対象機器/公開URLの台帳と専用probe。API readyz/内部probeだけでは不足 |
| ESO/BSM更新・証明書期限、ArgoCD/TFC/ARC job遅延 | 各controllerのmetrics/API scrape。既存Pod/replica監視とは別 |
| 拠点外heartbeat・metric/log canary | 独立した外部受信先/評価系。Grafanaからのdatasourceエラーは拠点heartbeatの代わりではない |

有効化前には自宅のPDC接続、追加collectorの同期、通知先を確認する。既存試作ルールは今回変更しないため、新ルールと同じ障害の通知が重複しうる。旧ルールの停止・削除は切替時に別途行う。

参照: [Grafana Terraform provisioning](https://grafana.com/docs/grafana/latest/alerting/set-up/provision-alerting-resources/terraform-provisioning/)、[欠測の扱い](https://grafana.com/docs/grafana/latest/alerting/guides/missing-data/)、[Provider rule schema](https://registry.terraform.io/providers/grafana/grafana/4.46.0/docs/resources/rule_group)。
