# Grafana Cloud alert inventory

2026-10-18調査。Terraform rootは`terraform/grafana-cloud`、backendはHCPの専用workspace `miutaku/grafana-cloud`（2026-10-19にローカルstateから移行、CIで自動Apply）。Terragrunt定義なし。

実機は405ルール。`my-infra-home`の281件（共通165 + 必須系列116）をこのrootで管理する。別folder `alerting-3sdsb6hvpfhxg`の124件はこのstateに含まれず、移管・編集・削除しない。

既存Contact PointはDiscord warning/critical、OnCall、grafana-default-email。管理下281件はseverityごとのDiscordへdirect routing。管理外124件にdirect routing設定はなく、既存root policyはgrafana-default-email、group_by= grafana_folder/alertname。root policyとOnCall/emailは維持する。

調査時のNotification Templateは0件、Discordはdiscord.default.title/message、復旧有効。今回共通templateを1件追加する。

共通Labelsはenvironment=home、cluster=home-k8s、service、severity、managed_by=terraform、scope=my-infra、rule_id。評価式由来のtarget/instance/node/pod等も保持する。

summaryは各title、runbook_urlは[README](README.md)のGitHub main URL。以下のdescriptionは改善後。個別のPromQL・継続時間・featureは[rules.json](rules.json)を正とする。

group_by= grafana_folder/alertname/environment/service。group_interval=5m、warn group_wait=2m/repeat=12h、critical=30s/1h、power criticalだけ0s。重要度は異なるreceiverへ分離する。

## 共通ルール（165件）

| rule_id | アラート名 / summary | severity → Discord | service / feature | description |
| --- | --- | --- | --- | --- |
| cpu-busy | Host CPU busy | warn → warning | hosts / base | CPU >85% for 15m. Identify sustained consumers; CPU alone does not page. |
| memory-warn | Host memory warn | warn → warning | hosts / base | 利用可能メモリが5%以上15%未満の状態です。メモリ余力が低下しています。対象ホストのプロセス別使用量と増加傾向を確認してください。 |
| memory-critical | Host memory critical | critical → critical | hosts / base | 利用可能メモリが5%未満です。メモリ不足による処理失敗のリスクがあります。対象ホストの使用量、OOM記録、影響サービスを確認してください。 |
| oom | Host OOM kill | critical → critical | hosts / base | OOM kills occurred; inspect memory consumers and affected services. |
| disk-warn | Persistent filesystem capacity warn | warn → warning | storage / base | 永続ファイルシステムの容量使用率が80%超90%以下です。書き込み余力を確認し、対象mountpointの使用量・増加元を調べてください。 |
| inode-warn | Persistent filesystem inode capacity warn | warn → warning | storage / base | 永続ファイルシステムのinode使用率が80%超90%以下です。書き込み余力を確認し、対象mountpointの使用量・増加元を調べてください。 |
| disk-critical | Persistent filesystem capacity critical | critical → critical | storage / base | 永続ファイルシステムの容量使用率が90%超です。書き込み余力を確認し、対象mountpointの使用量・増加元を調べてください。 |
| inode-critical | Persistent filesystem inode capacity critical | critical → critical | storage / base | 永続ファイルシステムのinode使用率が90%超です。書き込み余力を確認し、対象mountpointの使用量・増加元を調べてください。 |
| filesystem-readonly | Persistent filesystem read-only | critical → critical | storage / base | 永続ファイルシステムが読み取り専用になっています。書き込み処理への影響を確認し、対象mountpointのマウント状態とカーネルログを調べてください。 |
| zpool-state | PVE ZFS pool unhealthy | critical → critical | storage / base | ZFS poolがdegraded/faulted/offline等の異常状態です。対象poolのzpool statusとデバイス状態を確認してください。 |
| ups-on-battery | UPS on battery | warn → warning | power / base | UPSがバッテリー運転中です（残量85%超）。停電の継続と対象UPSの残量を確認してください。80%でのホスト停止に先行する通知です。 |
| ups-shutdown-near | UPS approaching host shutdown | critical → critical | power / base | Hosts shut down at 80% charge. Check mains power and the cross-power UPS topology immediately. |
| ups-unsafe | UPS unsafe state | critical → critical | power / base | UPSがLB/FSD/SD/OFF/OVERのいずれかを報告しています。給電継続に影響する状態です。対象UPSの状態フラグと接続ホストの停止状況を確認してください。 |
| ups-replace | UPS battery replacement required | warn → warning | power / base | UPSがバッテリー交換要求（RB）を報告しています。停電時の保護能力を確認し、対象UPSのバッテリー点検・交換を計画してください。 |
| ups-load-warn | UPS load warning | warn → warning | power / base | UPS負荷が70%超90%以下です。給電の余力が低下しています。対象UPSの接続機器と負荷推移を確認してください。 |
| ups-load-critical | UPS load critical | critical → critical | power / base | UPS負荷が90%を超えています。接続機器への給電余力を確認し、対象UPSの負荷と状態フラグを調べてください。 |
| ups-telemetry | UPS telemetry unavailable | critical → critical | power / base | UPS exporterのscrapeまたはNUTの取得が失敗しています。停電・残量の監視を保証できません。対象instanceへの接続とNUT/exporterのログを確認してください。 |
| host-unreachable | Critical host unreachable | critical → critical | infrastructure / base | 主要ホストへのICMP probeが失敗しています。ホスト停止か通信経路の問題かは未判定です。対象instanceの電源、経路、他のサービス監視を確認してください。 |
| management-unreachable | Management host unreachable | warn → warning | management / base | 管理ホストへのICMP probeが失敗しています。対象instanceの電源とネットワーク経路を確認してください。 |
| lb-degraded | Load balancer redundancy lost | warn → warning | load-balancer / base | lb-01/02の2台中1台だけがICMPに応答しています。冗長性が低下しています。両ホストの死活とHAProxy/Keepalivedの状態を確認してください。 |
| lb-down | Both load balancers unreachable | critical → critical | load-balancer / base | lb-01/02のICMP応答の合計が0です。ロードバランサ経路への影響を確認し、両ホストの電源・ネットワークを調べてください。 |
| http-service | Home application unavailable | critical → critical | applications / base | HTTP probeの失敗が3分継続しています。対象instanceの応答・アプリケーションと転送先を確認してください。HTTP 503では稼働中でもリクエストを処理できない場合があります。 |
| http-management | Management UI unavailable | warn → warning | management / base | 管理UIのHTTP probeが失敗しています。対象instanceのHTTP応答、プロセス、接続経路を確認してください。 |
| probe-critical | DNS, API or database transport unavailable | critical → critical | connectivity / probes | DNS/API/transport probe failed. TCP success alone does not prove authenticated DB queries or NFS writes work. |
| exporter-down | Exporter scrape failed | warn → warning | observability / base | exporterのscrapeが失敗しています。対象instanceのメトリクスが更新されません。exporterの稼働状態と収集側からの到達性を確認してください。 |
| optional-scrape | IoT or speedtest collection failed | warn → warning | optional-devices / base | IoTまたはspeedtestのscrapeが失敗しています。対象job/instanceのデータが更新されません。収集プロセスと接続を確認してください。 |
| vmagent-backlog | Metrics write queue growing | warn → warning | observability / base | vmagentの送信待ちデータが1 MiBを超え、10分間の傾向が増加しています。監視データの転送遅延を確認し、転送先の到達性とエラーを調べてください。 |
| vmagent-drop | Metrics samples dropped | critical → critical | observability / base | 過去5分にvmagentの破棄サンプルが増加しました。監視データの欠落が発生しています。送信先・キュー制限とvmagentログを確認してください。 |
| vmagent-blocked | Metrics write queue blocked | critical → critical | observability / base | vmagentのremote-writeキューがblockedを報告しています。メトリクス転送への影響を確認し、送信先とキューの状態を調べてください。 |
| freshness | Collection heartbeat stale | critical → critical | observability / base | Collector self-scrape is stale or missing. A query returning old stored samples is not a recovery. |
| node-not-ready | Kubernetes node not ready | warn → warning | kubernetes / kubernetes | Kubernetes NodeのReady=trueが0です。対象nodeのCondition、kubelet、ネットワークを確認し、Pod配置への影響を調べてください。 |
| node-pressure | Kubernetes node pressure | warn → warning | kubernetes / kubernetes | NodeがMemoryPressure/DiskPressure/PIDPressureを報告しています。対象nodeとconditionを確認し、リソース使用量・evictionイベントを調べてください。 |
| control-plane-quorum | Home control plane quorum at risk | critical → critical | kubernetes / kubernetes | Readyなcontrolplane Nodeが2台未満、またはその系列がありません。制御系の冗長性を確認し、Node状態とetcd/APIの独立監視を調べてください。Node Readyだけでetcd quorumは断定できません。 |
| home-workers-down | All home Kubernetes workers unavailable | critical → critical | kubernetes / kubernetes | Readyなworker Nodeの合計が0、またはworkerの系列がありません。ワークロード稼働への影響を確認し、Node状態と収集の欠落を調べてください。 |
| deployment-degraded | Deployment replicas unavailable | warn → warning | workloads / kubernetes | Deploymentのavailable replicaが1以上かつdesired未満です。冗長性・処理余力が低下しています。対象namespace/deploymentのPodとrolloutイベントを確認してください。 |
| deployment-down | Required deployment has no ready replicas | critical → critical | workloads / kubernetes | 稼働を要求する重要Deploymentのavailable replicaが0です。対象サービスへの影響を確認し、Pod状態、rollout、イベントを調べてください。 |
| statefulset-degraded | StatefulSet replicas unavailable | warn → warning | workloads / kubernetes | StatefulSetのready replicaが1以上かつdesired未満です。冗長性が低下しています。対象namespace/statefulsetのPod・volume・イベントを確認してください。 |
| statefulset-down | Required StatefulSet unavailable | critical → critical | databases / kubernetes | 稼働を要求する重要StatefulSetのready replicaが0です。対象サービスへの影響を確認し、Pod・volume・イベントを調べてください。 |
| daemonset-degraded | DaemonSet scheduling incomplete | warn → warning | workloads / kubernetes | DaemonSetにunavailable Podがあります。対象namespace/daemonsetの配置、Node状態、Podイベントを確認してください。 |
| pvc-pending | Persistent volume claim pending | warn → warning | storage / kubernetes | PVCがPendingです。ストレージの確保待ちでPodを起動できない可能性があります。対象namespace/PVCのイベントとStorageClass・provisionerを確認してください。 |
| pv-lost | Persistent volume claim lost | critical → critical | storage / kubernetes | PVCがLostを報告しています。永続データへのアクセスに影響する可能性があります。対象PVCと対応PVの状態・ストレージ到達性を確認してください。 |
| pod-restarts | Container repeatedly restarting | warn → warning | workloads / kubernetes | コンテナの再起動回数が過去15分に3回を超えています。対象namespace/pod/containerの終了理由、直前ログ、イベントを確認してください。 |
| pod-pending | Pod pending | warn → warning | workloads / kubernetes | PodがPendingのままです。配置または起動準備が完了していません。対象namespace/podのイベント、リソース要求、volumeを確認してください。 |
| ksm-missing | Kubernetes state collection missing | critical → critical | observability / kubernetes | Node Readyの状態系列が3分間ありません。Kubernetes状態監視を保証できません。kube-state-metricsの稼働、scrape、API参照権限を確認してください。 |
| backup-db-warn | Backup freshness mariadb-backup: warn | warn → warning | backups / backups | Last successful mariadb-backup is overdue. Check job logs and destination verification; job success does not prove an actual restore works. |
| backup-db-critical | Backup freshness mariadb-backup: critical | critical → critical | backups / backups | Last successful mariadb-backup is overdue. Check job logs and destination verification; job success does not prove an actual restore works. |
| backup-db-deleted | Required backup job missing: mariadb-backup | critical → critical | backups / backups | 必須のbackup CronJobが5分間見つからないかsuspendされています。対象CronJob（mariadb-backup）の存在・suspend設定とGitOps同期を確認してください。定期backupの実行に影響します。 |
| backup-nas-warn | Backup freshness nas-backup: warn | warn → warning | backups / backups | Last successful nas-backup is overdue. Check job logs and destination verification; job success does not prove an actual restore works. |
| backup-nas-critical | Backup freshness nas-backup: critical | critical → critical | backups / backups | Last successful nas-backup is overdue. Check job logs and destination verification; job success does not prove an actual restore works. |
| backup-nas-deleted | Required backup job missing: nas-backup | critical → critical | backups / backups | 必須のbackup CronJobが5分間見つからないかsuspendされています。対象CronJob（nas-backup）の存在・suspend設定とGitOps同期を確認してください。定期backupの実行に影響します。 |
| backup-metrics-warn | Backup freshness victoria-metrics-backup: warn | warn → warning | backups / backups | Last successful victoria-metrics-backup is overdue. Check job logs and destination verification; job success does not prove an actual restore works. |
| backup-metrics-critical | Backup freshness victoria-metrics-backup: critical | critical → critical | backups / backups | Last successful victoria-metrics-backup is overdue. Check job logs and destination verification; job success does not prove an actual restore works. |
| backup-metrics-deleted | Required backup job missing: victoria-metrics-backup | critical → critical | backups / backups | 必須のbackup CronJobが5分間見つからないかsuspendされています。対象CronJob（victoria-metrics-backup）の存在・suspend設定とGitOps同期を確認してください。定期backupの実行に影響します。 |
| backup-recorded-warn | Backup freshness tnlastation-recorded-backup: warn | warn → warning | backups / backups | Last successful tnlastation-recorded-backup is overdue. Check job logs and destination verification; job success does not prove an actual restore works. |
| backup-recorded-critical | Backup freshness tnlastation-recorded-backup: critical | critical → critical | backups / backups | Last successful tnlastation-recorded-backup is overdue. Check job logs and destination verification; job success does not prove an actual restore works. |
| backup-recorded-deleted | Required backup job missing: tnlastation-recorded-backup | critical → critical | backups / backups | 必須のbackup CronJobが5分間見つからないかsuspendされています。対象CronJob（tnlastation-recorded-backup）の存在・suspend設定とGitOps同期を確認してください。定期backupの実行に影響します。 |
| nas-capacity-warn | NAS dataset capacity warn | warn → warning | storage / base | SNMP mounted dataset use. Pool physical allocation and health require the TrueNAS API; snapshot pressure may not be visible here. |
| nas-capacity-critical | NAS dataset capacity critical | critical → critical | storage / base | SNMP mounted dataset use. Pool physical allocation and health require the TrueNAS API; snapshot pressure may not be visible here. |
| router-cpu | IX2215 CPU busy | warn → warning | network / base | IX2215の1分CPU使用率が80%を超えています。ルータの処理余力を確認し、トラフィックとCPU推移を調べてください。 |
| router-napt | IX2215 NAPT allocation failures | warn → warning | network / base | 過去5分にTCPまたはUDPのNAPT作成失敗が増加しています。新規接続への影響を確認し、NAPT使用量とルータログを調べてください。 |
| systemd-failed | Host systemd service failed | warn → warning | management / base | Explicitly monitored host services failed. Boot-only and unrelated units are not paged. |
| lb-service | Load balancer service redundancy lost | warn → warning | load-balancer / base | ロードバランサのHAProxyまたはKeepalivedがactiveでないホストがあります。冗長性を確認し、対象instance/nameのsystemd状態とログを調べてください。 |
| lb-service-all | No active load balancer service | critical → critical | load-balancer / base | lb-01/02で対象サービスのactive状態の合計が0です。ロードバランサ経路への影響を確認し、両系の対象nameとログを調べてください。 |
| charge-guard | UPS host shutdown guard inactive | critical → critical | power / base | PVEのnut-charge-guard.timerがactiveではありません。残量に基づく停止保護を確認し、対象instanceのtimerと実行ログを調べてください。 |
| pve-guest | Required PVE guest stopped | critical → critical | infrastructure / base | 常時稼働対象のPVE guestがup=0です。対象node/id/nameの稼働状態とホストログを確認し、提供サービスへの影響を調べてください。 |
| cronjob-failed | Latest scheduled job failed | warn → warning | scheduled-jobs / kubernetes | The most recently created Job of a CronJob reached its terminal Failed condition. Earlier failed Jobs and recovered Pod retries do not alert; backup freshness is monitored separately. |
| deployment-stopped-warn | Management or optional deployment stopped | warn → warning | workloads / kubernetes | A noncritical controller with desired replicas is unavailable. Zero desired replicas is normal. |
| statefulset-stopped-warn | Noncritical StatefulSet stopped | warn → warning | workloads / kubernetes | A noncritical controller with desired replicas is unavailable. Zero desired replicas is normal. |
| nic-receive-errors | Host NIC receive errors | warn → warning | network / base | Per active interface: 5-minute error rate >1% and >1 error/second for 5m. Excludes loopback and transient container interfaces. Inspect link, NIC and switch counters. |
| nic-transmit-errors | Host NIC transmit errors | warn → warning | network / base | Per active interface: 5-minute error rate >1% and >1 error/second for 5m. Excludes loopback and transient container interfaces. Inspect link, NIC and switch counters. |
| router-receive-errors | IX2215 receive errors | warn → warning | network / base | Per active LAN/WAN/VLAN interface: >1 events/second for 5m. Check physical errors, congestion and interface counters; unused interfaces are excluded. |
| router-transmit-errors | IX2215 transmit errors | warn → warning | network / base | Per active LAN/WAN/VLAN interface: >1 events/second for 5m. Check physical errors, congestion and interface counters; unused interfaces are excluded. |
| router-receive-drops | IX2215 receive drops | warn → warning | network / base | Per active LAN/WAN/VLAN interface: >10 events/second for 5m. Check physical errors, congestion and interface counters; unused interfaces are excluded. |
| router-transmit-drops | IX2215 transmit drops | warn → warning | network / base | Per active LAN/WAN/VLAN interface: >10 events/second for 5m. Check physical errors, congestion and interface counters; unused interfaces are excluded. |
| load-average | Host load average high | warn → warning | hosts / base | Five-minute load average per CPU core >1.5 for 15m. Check runnable tasks and uninterruptible I/O waits alongside CPU and storage metrics. |
| speedtest-download-slow | Internet download speed low | warn → warning | network / base | At least 3 measurements in 15m are all below 25 Mbps, with the latest sample less than 10m old. Check concurrent transfers and test server before diagnosing the WAN. |
| speedtest-upload-slow | Internet upload speed low | warn → warning | network / base | At least 3 measurements in 15m are all below 20 Mbps, with the latest sample less than 10m old. Check concurrent transfers and test server before diagnosing the WAN. |
| functional-collection-access | access functional check unavailable | critical → critical | connectivity / access | accessのcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-access | access check stopped updating | critical → critical | observability / access | accessの収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| functional-collection-truenas | truenas functional check unavailable | critical → critical | observability / storage_api | truenasのcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-truenas | truenas check stopped updating | critical → critical | observability / storage_api | truenasの収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| functional-collection-database | database functional check unavailable | critical → critical | observability / database | databaseのcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-database | database check stopped updating | critical → critical | observability / database | databaseの収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| functional-collection-recorder | recorder functional check unavailable | critical → critical | observability / recording | recorderのcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-recorder | recorder check stopped updating | critical → critical | observability / recording | recorderの収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| functional-collection-mirakurun | mirakurun functional check unavailable | critical → critical | observability / recording | mirakurunのcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-mirakurun | mirakurun check stopped updating | critical → critical | observability / recording | mirakurunの収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| functional-collection-pbs | pbs functional check unavailable | critical → critical | observability / backup_integrity | pbsのcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-pbs | pbs check stopped updating | critical → critical | observability / backup_integrity | pbsの収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| functional-collection-secrets | secrets functional check unavailable | critical → critical | observability / operations | secretsのcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-secrets | secrets check stopped updating | critical → critical | observability / operations | secretsの収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| functional-collection-unifi | unifi functional check unavailable | critical → critical | observability / network | unifiのcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-unifi | unifi check stopped updating | critical → critical | observability / network | unifiの収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| access-service-failed | Public service unavailable through Cloudflare Access | critical → critical | connectivity / access | 認証付き公開HTTP probeで期待する応答を確認できません。公開経路の利用に影響する可能性があります。対象targetのAccess認証、HTTP応答、backendを確認してください。 |
| access-tls-warn | Public TLS certificate expires soon | warn → warning | connectivity / access | TLS証明書が残り3日以上14日未満です。期限切れ時の接続失敗を防ぐため、対象instance/targetの証明書期限と更新状態を確認してください。 |
| access-tls-critical | Public TLS certificate expiry imminent | critical → critical | connectivity / access | TLS証明書が残り3日未満です。期限切れ時の接続失敗を防ぐため、対象instance/targetの証明書期限と更新状態を確認してください。 |
| nas-pool-capacity-warn | TrueNAS physical pool usage warn | warn → warning | storage / storage_api | TrueNAS poolの物理使用率が80%超85%以下です。対象target/poolの空き容量、snapshot、増加傾向を確認してください。dataset使用率とは別の指標です。 |
| nas-pool-capacity-critical | TrueNAS physical pool usage critical | critical → critical | storage / storage_api | TrueNAS poolの物理使用率が85%超です。対象target/poolの空き容量、snapshot、増加傾向を確認してください。dataset使用率とは別の指標です。 |
| nas-pool-health | TrueNAS pool unhealthy | critical → critical | storage / storage_api | TrueNAS APIがpoolを健全でないと報告しています。対象target/poolの状態とストレージalertを確認してください。 |
| nas-smart-alert | TrueNAS disk or SMART fault | critical → critical | storage / storage_api | TrueNAS APIでdisk/SMARTの重大alertが検出されています。対象ストレージのalert詳細とディスク状態を確認してください。 |
| nas-scrub-errors | TrueNAS scrub errors | critical → critical | storage / storage_api | TrueNAS scrubでエラーが報告されています。対象poolのscrub結果、zpool status、デバイス状態を確認してください。 |
| nas-scrub-age-warn | TrueNAS completed scrub age warn | warn → warning | storage / storage_api | 最終成功scrubから35日超60日以下です。ストレージ検査が遅延しています。対象poolのscrubスケジュールと実行結果を確認してください。 |
| nas-scrub-age-critical | TrueNAS completed scrub age critical | critical → critical | storage / storage_api | 最終成功scrubから60日超です。ストレージ検査が遅延しています。対象poolのscrubスケジュールと実行結果を確認してください。 |
| db-connections-warn | Database connections used warn | warn → warning | database / database | DB接続数の使用率が80%超95%以下です。新規接続の余力を確認し、対象targetの接続元・接続上限を調べてください。 |
| db-connections-critical | Database connections used critical | critical → critical | database / database | DB接続数の使用率が95%超です。新規接続の余力を確認し、対象targetの接続元・接続上限を調べてください。 |
| db-lock-waits | Database lock waits persist | warn → warning | database / database | DBがlock待ちを報告しています。処理遅延への影響を確認し、対象targetの待機queryとblocking transactionを調べてください。 |
| db-long-queries | Database queries running longer than 60 seconds | warn → warning | database / database | DBに60秒を超えるqueryがあります。対象targetの実行中query、待機理由、サービスの応答時間を確認してください。 |
| db-query-failed | Database SQL check failed | critical → critical | database / database | DBの監視queryが失敗しています。接続またはSQL実行を確認できません。対象targetのDB稼働、監視ユーザー、collectorログを確認してください。 |
| recording-not-started | Scheduled recording did not start | critical → critical | recording / recording | 開始予定を過ぎても録画開始を確認できない予約があります。対象targetの予約・録画状態とAPI/録画ログを確認してください。 |
| recording-interrupted | Recording stopped before its scheduled end | critical → critical | recording / recording | 終了予定前に停止した録画が検出されています。録画の欠落を確認し、対象targetの録画状態とログを調べてください。 |
| recording-missing-video | Completed recording has no video file | critical → critical | recording / recording | 完了済み録画のvideoを確認できません。対象targetの録画情報、保存先、録画ログを確認してください。 |
| recording-conflicts | Recording conflict in the next 24 hours | warn → warning | recording / recording | 24時間以内の予約に競合があります。録画できない予約がないか、対象targetの予約内容とチューナー割当を確認してください。 |
| tuner-unavailable | Recording tuner unavailable | critical → critical | recording / recording | チューナーが利用不可と報告されています。録画・EPG取得への影響を確認し、対象target/tunerのAPI状態とMirakurunログを調べてください。 |
| epg-update-warn | Television EPG not updated in 24 hours | warn → warning | recording / recording | テレビserviceのEPG更新が24時間超48時間以下ありません。番組情報の鮮度を確認し、対象target/service_idのEPG取得状態とログを調べてください。 |
| epg-update-critical | Television EPG not updated in 48 hours | critical → critical | recording / recording | テレビserviceのEPG更新が48時間超ありません。番組情報の鮮度を確認し、対象target/service_idのEPG取得状態とログを調べてください。 |
| encode-backlog-warn | Encoding backlog warn | warn → warning | recording / recording | encode待ちが10件超30件以下です。録画後処理が滞留しています。対象targetのqueueとworker状態・ログを確認してください。 |
| encode-backlog-critical | Encoding backlog critical | critical → critical | recording / recording | encode待ちが30件超です。録画後処理が滞留しています。対象targetのqueueとworker状態・ログを確認してください。 |
| encode-recording-age-warn | Oldest recording waiting for encoding warn | warn → warning | recording / recording | encode待ちの最古録画が終了から1日超3日以下経過しています。対象targetのqueue、該当録画とworkerログを確認してください。 |
| encode-recording-age-critical | Oldest recording waiting for encoding critical | critical → critical | recording / recording | encode待ちの最古録画が終了から3日超経過しています。対象targetのqueue、該当録画とworkerログを確認してください。 |
| pbs-backup-age-warn | PBS VM backup age warn | warn → warning | backups / backup_integrity | PBS backupの最終成功から4時間超8時間以下です。対象backupのスケジュール、Job結果と保存先を確認してください。 |
| pbs-backup-age-critical | PBS VM backup age critical | critical → critical | backups / backup_integrity | PBS backupの最終成功から8時間超です。対象backupのスケジュール、Job結果と保存先を確認してください。 |
| pbs-verification-failed | PBS snapshot verification failed | critical → critical | backups / backup_integrity | 保持snapshotにverify失敗があります。下記は最新・検証成功世代の参考情報です。失敗した世代はPBSのverifyログで確認してください。 |
| pbs-unverified | PBS has no verified snapshot in 7 days | warn → warning | backups / backup_integrity | 7日以内のverify成功snapshotが保持されていません。最新backupの欠落とは限りません。verify Job・結果と世代削除履歴を確認してください。 |
| backup-verified-database | database backup read-back verification stale | critical → critical | backups / backup_integrity | DB backupのread-back検証成功が48時間以上ありません。backup Jobと検証ログを確認してください。backup完了だけでは保存内容や復元可能性を保証できません。 |
| backup-verified-nas | NAS repository metadata validation stale | critical → critical | backups / backup_integrity | restic check verifies repository references; full data reads and recovery are separate checks. |
| backup-verified-recorded | Recorded media destination check stale | critical → critical | backups / backup_integrity | Destination names and sizes must match selected completed recordings. This is not a full content checksum or playback test. |
| restic-budget-warn | NAS restic repository storage budget warn | warn → warning | backups / backup_integrity | NAS repositoryの実object容量が14 GB超17 GB以下です。容量予算への影響を確認し、S3 inventoryと保持・pruneの状態を調べてください。 |
| restic-budget-critical | NAS restic repository storage budget critical | critical → critical | backups / backup_integrity | NAS repositoryの実object容量が17 GB超です。容量予算への影響を確認し、S3 inventoryと保持・pruneの状態を調べてください。 |
| backup-restore-failed | Backup restore validation failed | critical → critical | backups / backup_integrity | 最後に報告されたbackup復元検証が失敗しています。対象backupの復元テスト結果とログを確認してください。backup/verify成功は実復元の成功を保証しません。 |
| etcd-member-unavailable | An etcd member is unavailable | warn → warning | kubernetes / control_plane | etcd memberのscrapeが失敗しています。対象instanceの稼働・metrics到達性と他memberの状態を確認してください。 |
| etcd-quorum-lost | Fewer than two etcd members report a leader | critical → critical | kubernetes / control_plane | scrapeに成功しleaderを認識するetcd memberが2台未満です。制御系の継続性を確認し、全memberのhealthと通信・API応答を調べてください。 |
| etcd-leader-count | Etcd leader count is not one | critical → critical | kubernetes / control_plane | scrape可能なetcd memberのleader数が1ではありません。etcd/APIの稼働への影響を確認し、各memberのhealthとleader選出ログを調べてください。 |
| api-vip-ownership | API VIP must be owned by exactly one control-plane node | critical → critical | kubernetes / control_plane | API VIPを所有するNode数が1ではありません。API接続への影響を確認し、VIP所有状態と関連Pod・ネットワークを調べてください。 |
| network-device-down | Managed network device disconnected | critical → critical | connectivity / network | 管理APIがネットワーク機器を未接続と報告しています。対象device/targetの電源、接続経路、管理API上の状態を確認してください。 |
| network-required-port-down | Required network port link down | critical → critical | connectivity / network | 台帳で必須としたネットワークportのリンクがdownです。対象device/portの配線、対向機器、管理API上のリンク状態を確認してください。 |
| secret-refresh-failed | ExternalSecret is not Ready | critical → critical | operations / operations | ExternalSecretがReadyではありません。必要なSecretを更新できない可能性があります。対象namespace/nameのCondition、ESOログ、参照先への接続を確認してください。 |
| secret-refresh-stale | ExternalSecret refresh overdue | warn → warning | operations / operations | ExternalSecretの最終更新がrefreshIntervalの2倍+15分を超えています。対象namespace/nameの更新状態、ESOログと参照先への接続を確認してください。 |
| argocd-out-of-sync | Home application remains OutOfSync | warn → warning | operations / operations | Argo CD ApplicationがSyncedではありません。宣言と実環境に差分があります。対象nameのdiff、同期状態とイベントを確認してください。 |
| argocd-degraded | Home application unhealthy | critical → critical | operations / operations | Argo CD ApplicationがDegraded/Missing/Unknownです。対象nameのresource health、同期結果、Kubernetesイベントを確認してください。 |
| arc-job-waiting | Home runner jobs remain queued | warn → warning | operations / operations | 割当済みJob数がbusy runner数を上回っています。CI開始待ちへの影響を確認し、対象scale_setのrunner起動とlistenerログを調べてください。 |
| api-certificate-warn | Kubernetes API certificate expiry warn | warn → warning | kubernetes / control_plane | TLS証明書が残り3日以上14日未満です。期限切れ時の接続失敗を防ぐため、対象instance/targetの証明書期限と更新状態を確認してください。 |
| api-certificate-critical | Kubernetes API certificate expiry critical | critical → critical | kubernetes / control_plane | TLS証明書が残り3日未満です。期限切れ時の接続失敗を防ぐため、対象instance/targetの証明書期限と更新状態を確認してください。 |
| functional-collection-s3 | Backup repository inventory unavailable | critical → critical | backups / backup_integrity | s3のcollectorが取得失敗を報告しています。対象targetのAPI到達性、認証設定とcollectorログを確認してください。機能監視の状態を保証できません。 |
| functional-stale-s3 | Backup repository inventory stale | warn → warning | backups / backup_integrity | s3の収集完了時刻が許容時間を超えています。対象targetのcollector実行・タイムアウト・ログを確認してください。古い測定値を正常と判断しないでください。 |
| backup-restore-job-failed | Backup restore validation Job failed | critical → critical | backups / backup_integrity | Restore test failed. Inspect the isolated test Job; successful backup completion is not evidence of recoverability. |
| recording-failure-event | Recording preparation or capture failed | critical → critical | recording / recording | An actual recording failure hook ran within the last hour. EPGStation emits this event; API polling also checks currently overdue or prematurely stopped recordings. |
| network-ap-unreachable | Wi-Fi AP or managed switch unreachable | critical → critical | connectivity / network | FS AP 192.168.0.253 and US-8-60W 192.168.0.252 must respond. Port-state alerts apply only to explicitly required ports in the inventory. |
| backup-restore-stale-nas | nas restore validation overdue | warn → warning | backups / backup_integrity | No successful restore validation in 28 days. NAS and DB isolated tests run weekly. PBS VM recovery is performed separately and its actual result is reported explicitly; backup or verify success does not substitute. |
| backup-restore-stale-database | database restore validation overdue | warn → warning | backups / backup_integrity | No successful restore validation in 28 days. NAS and DB isolated tests run weekly. PBS VM recovery is performed separately and its actual result is reported explicitly; backup or verify success does not substitute. |
| backup-restore-stale-pbs-vm-13201 | pbs-vm-13201 restore validation overdue | warn → warning | backups / backup_integrity | No successful restore validation in 28 days. NAS and DB isolated tests run weekly. PBS VM recovery is performed separately and its actual result is reported explicitly; backup or verify success does not substitute. |
| backup-restore-stale-pbs-vm-60000 | pbs-vm-60000 restore validation overdue | warn → warning | backups / backup_integrity | No successful restore validation in 28 days. NAS and DB isolated tests run weekly. PBS VM recovery is performed separately and its actual result is reported explicitly; backup or verify success does not substitute. |
| backup-restore-stale-pbs-vm-40000 | pbs-vm-40000 restore validation overdue | warn → warning | backups / backup_integrity | No successful restore validation in 28 days. NAS and DB isolated tests run weekly. PBS VM recovery is performed separately and its actual result is reported explicitly; backup or verify success does not substitute. |
| node-certificate-request-denied | Node certificate request denied or failed | critical → critical | operations / operations | Node証明書のCSRが拒否または失敗しています。証明書発行への影響を確認し、対象CSRのConditionと承認・署名側のイベントを調べてください。 |
| node-certificate-request-stuck | Node certificate request pending over 10 minutes | warn → warning | operations / operations | Node証明書のCSRが10分を超えて承認待ちです。対象CSRの内容、承認処理と証明書更新への影響を確認してください。 |
| kubelet-certificate-warn | Kubelet serving certificate expiry warn | warn → warning | operations / control_plane | TLS証明書が残り3日以上14日未満です。期限切れ時の接続失敗を防ぐため、対象instance/targetの証明書期限と更新状態を確認してください。 |
| kubelet-certificate-critical | Kubelet serving certificate expiry critical | critical → critical | operations / control_plane | TLS証明書が残り3日未満です。期限切れ時の接続失敗を防ぐため、対象instance/targetの証明書期限と更新状態を確認してください。 |
| kubelet-tls-unavailable | Kubelet TLS handshake unavailable | critical → critical | operations / control_plane | kubeletへのTLS handshake probeが失敗しています。対象instanceの接続、kubelet稼働、証明書を確認してください。 |
| network-port-inventory-missing | Required switch port inventory is empty | warn → warning | connectivity / network | Device liveness is collected, but no mandatory switch ports are configured. Fill devices[].ports in the collector inventory; unused/client ports must not be treated as permanently up. |
| epg-not-ready | Television EPG remains unavailable | critical → critical | recording / recording | Mirakurun reports epgReady=false for a television service for 30 minutes. |
| internal-api-cert-truenas-warn | truenas internal API certificate expiry warn | warn → warning | connectivity / storage_api | Pinned internal API certificate approaches expiration. Renew it and update the reviewed public leaf certificate in the collector configuration. |
| internal-api-cert-truenas-critical | truenas internal API certificate expiry critical | critical → critical | connectivity / storage_api | Pinned internal API certificate approaches expiration. Renew it and update the reviewed public leaf certificate in the collector configuration. |
| internal-api-cert-pbs-warn | pbs internal API certificate expiry warn | warn → warning | connectivity / backup_integrity | Pinned internal API certificate approaches expiration. Renew it and update the reviewed public leaf certificate in the collector configuration. |
| internal-api-cert-pbs-critical | pbs internal API certificate expiry critical | critical → critical | connectivity / backup_integrity | Pinned internal API certificate approaches expiration. Renew it and update the reviewed public leaf certificate in the collector configuration. |
| internal-api-cert-unifi-warn | unifi internal API certificate expiry warn | warn → warning | connectivity / network | Pinned internal API certificate approaches expiration. Renew it and update the reviewed public leaf certificate in the collector configuration. |
| internal-api-cert-unifi-critical | unifi internal API certificate expiry critical | critical → critical | connectivity / network | Pinned internal API certificate approaches expiration. Renew it and update the reviewed public leaf certificate in the collector configuration. |

## 必須系列（116件）

rule_id=`missing-<id>`、summary=`Required telemetry missing: <id>`。対象はdisplay_targetに台帳IDを設定する。
descriptionは「必須の監視データが途絶しています。対象のcollector稼働、scrapeと接続を確認してください。データ欠落中はサービスの正常性を保証できません。」。
selectorは調査用にここへ記載し、通常通知には列挙しない。UPS系は1m欠測+1m継続、その他は3m欠測+2m継続。

| 対象ID | severity → Discord | service / feature | 必須selector |
| --- | --- | --- | --- |
| ping-pve-x570 | critical → critical | infrastructure / base | `probe_success{job="blackbox_icmp",instance="pve-x570"}` |
| ping-pve-b550m | critical → critical | infrastructure / base | `probe_success{job="blackbox_icmp",instance="pve-b550m"}` |
| ping-nas-01 | critical → critical | infrastructure / base | `probe_success{job="blackbox_icmp",instance="nas-01"}` |
| ping-nas-02 | critical → critical | infrastructure / base | `probe_success{job="blackbox_icmp",instance="nas-02"}` |
| ping-ix2215 | critical → critical | infrastructure / base | `probe_success{job="blackbox_icmp",instance="ix2215"}` |
| ping-lb-01 | critical → critical | infrastructure / base | `probe_success{job="blackbox_icmp",instance="lb-01"}` |
| ping-lb-02 | critical → critical | infrastructure / base | `probe_success{job="blackbox_icmp",instance="lb-02"}` |
| node-dev-app-server | warn → warning | observability / base | `node_uname_info{job="node_vm",instance="dev-app-server"}` |
| node-lb-01 | warn → warning | observability / base | `node_uname_info{job="node_vm",instance="lb-01"}` |
| node-lb-02 | warn → warning | observability / base | `node_uname_info{job="node_vm",instance="lb-02"}` |
| node-unifi-os-server | warn → warning | observability / base | `node_uname_info{job="node_vm",instance="unifi-os-server"}` |
| node-nut-pi-01 | critical → critical | observability / base | `node_uname_info{job="node_vm",instance="nut-pi-01"}` |
| node-nut-pi-02 | critical → critical | observability / base | `node_uname_info{job="node_vm",instance="nut-pi-02"}` |
| node-pve-x570 | warn → warning | observability / base | `node_uname_info{job="node_vm",instance="pve-x570"}` |
| node-pve-b550m | warn → warning | observability / base | `node_uname_info{job="node_vm",instance="pve-b550m"}` |
| node-pbs-01 | warn → warning | observability / base | `node_uname_info{job="node_vm",instance="pbs-01"}` |
| node-smart-display | warn → warning | observability / base | `node_uname_info{job="node_vm",instance="smart-display"}` |
| ups-a-charge | critical → critical | power / base | `network_ups_tools_battery_charge{job="nut",instance="ups-a"}` |
| ups-a-status | critical → critical | power / base | `network_ups_tools_ups_status{job="nut",instance="ups-a",flag="OB"}` |
| ups-b-charge | critical → critical | power / base | `network_ups_tools_battery_charge{job="nut",instance="ups-b"}` |
| ups-b-status | critical → critical | power / base | `network_ups_tools_ups_status{job="nut",instance="ups-b",flag="OB"}` |
| http-nextcloud | critical → critical | applications / base | `probe_success{job="blackbox_http",instance="nextcloud"}` |
| http-mirakurun | critical → critical | applications / base | `probe_success{job="blackbox_http",instance="mirakurun"}` |
| http-epgstation | critical → critical | applications / base | `probe_success{job="blackbox_http",instance="epgstation"}` |
| http-tnlastation | critical → critical | applications / probes | `probe_success{job="blackbox_http",instance="tnlastation"}` |
| http-coupon-manager | critical → critical | applications / probes | `probe_success{job="blackbox_http",instance="coupon-manager"}` |
| http-loockit | critical → critical | applications / probes | `probe_success{job="blackbox_http",instance="loockit"}` |
| internal-dns | critical → critical | connectivity / probes | `probe_success{job="blackbox_dns",instance="internal-dns"}` |
| external-dns | critical → critical | connectivity / probes | `probe_success{job="blackbox_dns",instance="external-dns"}` |
| mariadb | critical → critical | connectivity / probes | `probe_success{job="blackbox_tcp",instance="mariadb"}` |
| postgres | critical → critical | connectivity / probes | `probe_success{job="blackbox_tcp",instance="postgres"}` |
| redis | critical → critical | connectivity / probes | `probe_success{job="blackbox_tcp",instance="redis"}` |
| nas-01-nfs | critical → critical | connectivity / probes | `probe_success{job="blackbox_tcp",instance="nas-01-nfs"}` |
| nas-02-nfs | critical → critical | connectivity / probes | `probe_success{job="blackbox_tcp",instance="nas-02-nfs"}` |
| home-k8s-api | critical → critical | connectivity / probes | `probe_success{job="blackbox_api",instance="home-k8s-api"}` |
| exporter-controlplane-01-talos | warn → warning | observability / base | `node_uname_info{job="node_kubernetes",instance="controlplane-01-talos"}` |
| exporter-controlplane-02-talos | warn → warning | observability / base | `node_uname_info{job="node_kubernetes",instance="controlplane-02-talos"}` |
| exporter-controlplane-03-talos | warn → warning | observability / base | `node_uname_info{job="node_kubernetes",instance="controlplane-03-talos"}` |
| exporter-worker-01-talos | warn → warning | observability / base | `node_uname_info{job="node_kubernetes",instance="worker-01-talos"}` |
| exporter-worker-02-talos | warn → warning | observability / base | `node_uname_info{job="node_kubernetes",instance="worker-02-talos"}` |
| exporter-worker-03-talos-home-rpi4-arm64 | warn → warning | observability / base | `node_uname_info{job="node_kubernetes",instance="worker-03-talos-home-rpi4-arm64"}` |
| exporter-worker-04-talos-home-rpi4-arm64 | warn → warning | observability / base | `node_uname_info{job="node_kubernetes",instance="worker-04-talos-home-rpi4-arm64"}` |
| capacity-nas-01 | warn → warning | storage / base | `hrStorageUsed{job="snmp_truenas",instance="nas-01",hrStorageDescr=~"/mnt/.*"}` |
| capacity-nas-02 | warn → warning | storage / base | `hrStorageUsed{job="snmp_truenas",instance="nas-02",hrStorageDescr=~"/mnt/.*"}` |
| pool-pve-x570 | critical → critical | storage / base | `node_zfs_zpool_state{instance="pve-x570",zpool="rpool",state="online"}` |
| pool-pve-b550m | critical → critical | storage / base | `node_zfs_zpool_state{instance="pve-b550m",zpool="rpool",state="online"}` |
| charge-guard-pve-x570 | critical → critical | power / base | `node_systemd_unit_state{instance="pve-x570",name="nut-charge-guard.timer",state="active"}` |
| charge-guard-pve-b550m | critical → critical | power / base | `node_systemd_unit_state{instance="pve-b550m",name="nut-charge-guard.timer",state="active"}` |
| deploy-app-nextcloud-nextcloud | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="app-nextcloud",deployment="nextcloud"}` |
| deploy-app-nextcloud-nextcloud-redis | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="app-nextcloud",deployment="nextcloud-redis"}` |
| deploy-app-coredns-coredns-deployment | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="app-coredns",deployment="coredns-deployment"}` |
| deploy-app-epgstation-epgstation | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="app-epgstation",deployment="epgstation"}` |
| deploy-app-tnlastation-backend | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="app-tnlastation",deployment="backend"}` |
| deploy-app-tnlastation-gateway | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="app-tnlastation",deployment="gateway"}` |
| deploy-app-loockit-loockit-proxy | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="app-loockit",deployment="loockit-proxy"}` |
| deploy-app-coupon-manager-coupon-manager-api | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="app-coupon-manager",deployment="coupon-manager-api"}` |
| deploy-cloudflared-cloudflared | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="cloudflared",deployment="cloudflared"}` |
| deploy-monitoring-pdc-agent | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="monitoring",deployment="pdc-agent"}` |
| deploy-monitoring-vmagent-victoria-metrics-agent | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="monitoring",deployment="vmagent-victoria-metrics-agent"}` |
| deploy-monitoring-nut-exporter | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="monitoring",deployment="nut-exporter"}` |
| deploy-monitoring-blackbox-exporter-prometheus-blackbox-exporter | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="monitoring",deployment="blackbox-exporter-prometheus-blackbox-exporter"}` |
| deploy-monitoring-kube-state-metrics | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="monitoring",deployment="kube-state-metrics"}` |
| deploy-kube-system-coredns | critical → critical | workloads / kubernetes | `kube_deployment_spec_replicas{namespace="kube-system",deployment="coredns"}` |
| sts-infra-db-mariadb | critical → critical | workloads / kubernetes | `kube_statefulset_replicas{namespace="infra-db",statefulset="mariadb"}` |
| sts-infra-db-postgres | critical → critical | workloads / kubernetes | `kube_statefulset_replicas{namespace="infra-db",statefulset="postgres"}` |
| sts-monitoring-victoria-metrics | critical → critical | workloads / kubernetes | `kube_statefulset_replicas{namespace="monitoring",statefulset="victoria-metrics"}` |
| functional-access-argocd-home-k8s | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-argocd-home-k8s",kind="access"}` |
| functional-access-wol | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-wol",kind="access"}` |
| functional-access-epgstation | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-epgstation",kind="access"}` |
| functional-access-tnlastation | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-tnlastation",kind="access"}` |
| functional-access-nextcloud | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-nextcloud",kind="access"}` |
| functional-access-coupon-manager | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-coupon-manager",kind="access"}` |
| functional-access-unifi | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-unifi",kind="access"}` |
| functional-access-wifi-ap | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-wifi-ap",kind="access"}` |
| functional-access-ix2215 | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-ix2215",kind="access"}` |
| functional-access-nas-01 | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-nas-01",kind="access"}` |
| functional-access-nas-02 | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-nas-02",kind="access"}` |
| functional-access-pve-x570 | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-pve-x570",kind="access"}` |
| functional-access-pve-b550m | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-pve-b550m",kind="access"}` |
| functional-access-nanokvm-1 | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-nanokvm-1",kind="access"}` |
| functional-access-nanokvm-2 | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-nanokvm-2",kind="access"}` |
| functional-nas-01 | critical → critical | observability / storage_api | `home_monitor_success{job="home-service-monitor",target="nas-01",kind="truenas"}` |
| functional-nas-02 | critical → critical | observability / storage_api | `home_monitor_success{job="home-service-monitor",target="nas-02",kind="truenas"}` |
| functional-pbs | critical → critical | observability / backup_integrity | `home_monitor_success{job="home-service-monitor",target="pbs",kind="pbs"}` |
| functional-mariadb | critical → critical | observability / database | `home_monitor_success{job="home-service-monitor",target="mariadb",kind="database"}` |
| functional-postgres | critical → critical | observability / database | `home_monitor_success{job="home-service-monitor",target="postgres",kind="database"}` |
| functional-postgres-staging | critical → critical | observability / database | `home_monitor_success{job="home-service-monitor",target="postgres-staging",kind="database"}` |
| functional-epgstation | critical → critical | observability / recording | `home_monitor_success{job="home-service-monitor",target="epgstation",kind="recorder"}` |
| functional-tnlastation | critical → critical | observability / recording | `home_monitor_success{job="home-service-monitor",target="tnlastation",kind="recorder"}` |
| functional-mirakurun | critical → critical | observability / recording | `home_monitor_success{job="home-service-monitor",target="mirakurun",kind="mirakurun"}` |
| functional-home-secrets | critical → critical | observability / operations | `home_monitor_success{job="home-service-monitor",target="home-secrets",kind="secrets"}` |
| functional-unifi-network | critical → critical | observability / network | `home_monitor_success{job="home-service-monitor",target="unifi-network",kind="unifi"}` |
| etcd-controlplane-01-talos | critical → critical | kubernetes / control_plane | `up{job="etcd",instance="controlplane-01-talos"}` |
| etcd-controlplane-02-talos | critical → critical | kubernetes / control_plane | `up{job="etcd",instance="controlplane-02-talos"}` |
| etcd-controlplane-03-talos | critical → critical | kubernetes / control_plane | `up{job="etcd",instance="controlplane-03-talos"}` |
| vip-controlplane-01-talos-home-pve-amd64 | critical → critical | kubernetes / control_plane | `home_vip_owned{job="home-vip-monitor",instance="controlplane-01-talos-home-pve-amd64"}` |
| vip-controlplane-02-talos-home-pve-amd64 | critical → critical | kubernetes / control_plane | `home_vip_owned{job="home-vip-monitor",instance="controlplane-02-talos-home-pve-amd64"}` |
| vip-controlplane-03-talos-home-pve-amd64 | critical → critical | kubernetes / control_plane | `home_vip_owned{job="home-vip-monitor",instance="controlplane-03-talos-home-pve-amd64"}` |
| functional-nas-repository | critical → critical | backups / backup_integrity | `home_monitor_success{job="home-service-monitor",target="nas-repository",kind="s3"}` |
| ping-wifi-ap | critical → critical | connectivity / network | `probe_success{job="blackbox_icmp",instance="wifi-ap"}` |
| ping-us-8-60w | critical → critical | connectivity / network | `probe_success{job="blackbox_icmp",instance="us-8-60w"}` |
| argocd-home-state | warn → warning | operations / operations | `argocd_app_info{job="argocd-home"}` |
| arc-listener-talos-infra-admin | warn → warning | operations / operations | `gha_assigned_jobs{job="arc-home",scale_set="talos-infra-admin"}` |
| arc-listener-architecture-automation-reader | warn → warning | operations / operations | `gha_assigned_jobs{job="arc-home",scale_set="architecture-automation-reader"}` |
| arc-listener-architecture-automation-codex | warn → warning | operations / operations | `gha_assigned_jobs{job="arc-home",scale_set="architecture-automation-codex"}` |
| tls-kubelet-controlplane-01 | critical → critical | kubernetes / control_plane | `probe_success{job="blackbox_tls",instance="kubelet-controlplane-01"}` |
| tls-kubelet-controlplane-02 | critical → critical | kubernetes / control_plane | `probe_success{job="blackbox_tls",instance="kubelet-controlplane-02"}` |
| tls-kubelet-controlplane-03 | critical → critical | kubernetes / control_plane | `probe_success{job="blackbox_tls",instance="kubelet-controlplane-03"}` |
| tls-kubelet-worker-01 | critical → critical | kubernetes / control_plane | `probe_success{job="blackbox_tls",instance="kubelet-worker-01"}` |
| tls-kubelet-worker-02 | critical → critical | kubernetes / control_plane | `probe_success{job="blackbox_tls",instance="kubelet-worker-02"}` |
| tls-kubelet-worker-03 | critical → critical | kubernetes / control_plane | `probe_success{job="blackbox_tls",instance="kubelet-worker-03"}` |
| tls-kubelet-worker-04 | critical → critical | kubernetes / control_plane | `probe_success{job="blackbox_tls",instance="kubelet-worker-04"}` |
| functional-access-tnlastation-staging | critical → critical | connectivity / access | `home_monitor_success{job="home-service-monitor",target="access-tnlastation-staging",kind="access"}` |
| deploy-tfc-agent | critical → critical | workloads / kubernetes | `kube_deployment_status_replicas_available{namespace="tfc-agent",deployment="tfc-agent"}` |
| kubernetes-job-owner | warn → warning | observability / kubernetes | `kube_job_owner{owner_kind="CronJob",owner_is_controller="true"}` |
| kubernetes-job-created | warn → warning | observability / kubernetes | `kube_job_created` |

台帳更新時はrules.json/targets.jsonとこの一覧を合わせて更新する。secret/API response全体を貼り付けない。
