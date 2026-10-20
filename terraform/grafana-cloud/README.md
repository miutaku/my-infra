# Grafana Cloud monitoring

自宅のVictoriaMetricsをGrafana CloudのPrometheusデータソース/PDC経由で参照し、Grafana-managed alertsとdashboardをTerraformで管理する。
対象は自宅インフラとhome-k8s上のサービス。KSMでは対象namespaceを明示し、ノード情報・クラスタ共通情報と併せて収集する。
既存データソース、PDC network/token、通知先、stack全体の通知ポリシーは作り直さない。通知先の書式は既存UIDを保持してTerraformから更新する。

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
5. mainへpushすると、検証成功後に下記のCIからPlan/Applyする。`paused=true`が初期値で、新規導入時のアラート通知はまだ有効にならない。
6. 収集側のGitOps同期、Grafana経由のquery、通知先の受信を確認した後に`paused=false`で再plan/applyする。通知テストは別途許可された範囲で実施する。

stateはHCP Terraformの`miutaku/grafana-cloud`へ保存する。workspaceのexecution modeは`local`で、GitHub Actions runnerがPlan/Applyを実行し、HCPは共有state・履歴・lockを管理する。旧ローカルstateは移行済み。空のworkspaceで新規作成し直さず、既存stateを継続する。
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


`environments.tfvars`は検証済みの全機能を有効化した現行入力（`paused=false`）。新規導入では例のとおり`paused=true`で始める。通知を有効化する前に、未収集・認証未設定のfeatureを外し、対象機能のquery/必須系列が揃っていることを確認する。
必要なBSMキー名は`k8s/pve/home-service-monitor/external-secret.yaml`を参照。秘密値はBSM→ExternalSecret→投影volumeへ渡し、Terraform state/ConfigMap/ログへ入れない。
内部APIの公開leaf証明書は`k8s/pve/home-service-monitor/certificates`へ固定し、期限・署名と証明書自体の一致を認証情報送信前に確認する。工場設定のhostnameを持つためhostname照合だけは使わない。証明書更新時はこの公開ファイルも更新する。公開Access probeは通常のCA/hostname検証を使う。
Nextcloudのstatus probeは内部Serviceへ接続し、`Host: nextcloud.miutaku.work`を送る。Nextcloudのtrusted domain検証に合わせ、HTTP 200とinstalled/maintenance/needsDbUpgradeの本文を確認する。
home用`targets.json`の必須系列は3分欠測+2分継続、UPS/停止guardは1分欠測+1分継続で通知する。Pod IPの変化や系列の部分消失を正常復旧と見なさず、固定instanceごとに検知する。
通常ルールの条件なしは0を返す。datasource接続・queryエラーは`Error`として通知する。PDC全断では複数のDatasourceErrorが出る可能性があり、初回受信試験で件数・集約を確認する。

### 通知

`contact_points.warn`と`contact_points.critical`に既存の通知先名、`discord_receiver_uids`にそのintegration UIDを指定する。
ルールの`notification_settings`で直接routingし、stack全体のpolicy treeを置き換えない。
warnはgroup_wait=2分/repeat=12時間、criticalは30秒/1時間。電源criticalだけgroup_wait=0秒。
group_intervalは5分、group_byは`grafana_folder, alertname, environment, service`を維持する。
重要度ごとに異なるreceiverへ送るため、criticalがwarnに混ざらず、異なる障害名・環境・serviceも分離される。同じ障害の複数対象は一括表示する。
将来`info`/`warning`を追加した場合はwarn receiverへ送る。INFOも書式側で対応済み。
復旧通知は既存2 receiverで有効であることを確認済み。無効化されていた場合、更新処理は停止して設定見直しを要求する。
計画停止にはGrafanaの対象を絞った終了時刻付きsilenceを使う。

## 共通通知の設計と運用

`notifications.tf`の`grafana_message_template.monitoring`が、[共通テンプレート](templates/notifications.tmpl)を登録する。
`my-infra.title`と`my-infra.message`を2つのDiscord receiverで再利用し、個別表示を`my-infra.alert`に共通化する。
新しいルールにも同じreceiverを使うだけで適用され、監視対象名による分岐は不要。
Go templateとGrafana標準の`tmpl.Exec`、`reReplaceAll`等を使用する。対象別の外部通知サーバーは不要。

表示例（リンクは説明用）：

```text
変更前: Value: A=1, B=1 / Labels: managed_by, rule_id, job, ... / Annotations: ...

変更後:
発生 1件 / 復旧 0件（本文表示 1/1件）
🔴 FIRING | CRITICAL | Recording tuner unavailable
環境: cluster=home-k8s environment=home
対象: service=recording target=mirakurun tuner=PT3-S0
概要: チューナーが利用不可と報告されています。録画・EPG取得への影響を確認し、
   対象target/tunerのAPI状態とMirakurunログを調べてください。
Grafanaで詳細を確認 / 対処手順
発生: 2026-10-18 00:00:00 UTC

🟢 RESOLVED | CRITICAL | Recording tuner unavailable
環境: cluster=home-k8s environment=home
対象: service=recording target=mirakurun tuner=PT3-S0
アラート条件が解消しました。必要に応じて実サービスを確認してください。
復旧: 2026-10-18 00:10:00 UTC
```

FIRINGはCRITICAL赤・WARNING橙・INFO青、RESOLVEDは緑の丸い状態アイコンで区別し、本文の各アラートにも状態・重要度を付ける。環境・対象・概要は文字の見出しだけにし、装飾アイコンは付けない。
発生と復旧が混在しても個別の状態を保持し、critical発生→他の発生→復旧の順に表示する。
復旧時は障害時のdescriptionを再掲せず、「条件解消」と表示する。MissingSeriesによる解消などもあり、実サービスの復旧と断定しない。

### Labels / Annotations

| 項目 | 方針 |
| --- | --- |
| `environment`, `cluster` | 環境を識別。任意の`region/site/datacenter/zone`も存在時に表示 |
| `severity`, `service` | 既存値を保持。表示だけ`warn`/`warning`をWARNINGへ正規化。未指定はUNKNOWN |
| 対象Labels | `target`, `namespace`, `node`, `pod`, controller, PVC, `cronjob`, `job_name`, `owner_name`, `tuner`, pool, device, mountpoint, SNMP IF, UPS, `name/id/vm/vmid`, backup, repository, port, `service_id`, `scale_set`, VIP, condition/flagを存在時だけ表示 |
| `instance` | 実対象を示すtarget/node/pod等がなければ表示。共通collectorのアドレスを無条件に併記しない |
| `job` | 他の実対象・instanceがないときのfallback。通常の内部scrape情報は非表示 |
| `managed_by/rule_id/scope/grafana_folder`等 | 評価・検索・routing用に保持し、通知には列挙しない。生の評価値も非表示 |
| `summary` | 短い障害名。現行は安定したrule titleを使用し、名前/UIDを変更しない |
| `description` | 条件、影響の可能性、確認先を式・collectorの実装に基づいて記述。対象は通知の識別欄と併読。原因を断定せずsummaryを繰り返さない |
| `display_target` | 任意の人間向け対象表記。標準Labelsで識別できない新しい対象/集約式で指定する。欠測ルールでは対象台帳のIDを表示し、生のselectorを通知しない |
| `details` | 任意の補足情報。HTTP応答コードやsnapshotパスなど、現在の評価で得た具体的な対象を最大380文字で表示。未指定なら省略 |
| `runbook_url` | 任意のHTTPS URL。現行は本READMEの初動一覧へリンク。存在しなければ項目ごと省略 |

名前とLabelsの改行・Markdown制御文字・mention文字を除去する。名前100文字、環境120文字、対象250文字、説明250文字までの概要を表示し、全文はGrafanaで確認する。
Grafanaリンクは個別ルールのGeneratorURL、なければDashboardURL。長大なURLは省略し、末尾のアラート一覧リンクを利用する。
外部URLを本文へ生で列挙せずDiscordのMarkdownリンクにする。個別リンク350文字・runbook 300文字まで、HTTP(S)形式だけを許可する。

新規追加時は`rules.json`へ既存スキーマで定義し、短いtitle、意味のあるdescription、severity、serviceを指定する。
namespace/target等を評価式のLabelsとして残す。集約で対象が失われる場合は`display_target`を付ける。テンプレートへサービス名の条件分岐を追加しない。
Labelsの追加・変更はアラートの識別やsilenceに影響するため、通知上の表記だけで済む場合はAnnotationsを使う。

#### HTTPとPBSの具体的な対象情報

`rules.json`の任意項目`context_queries`は、Annotationsに使う瞬時クエリを追加する。
Ref ID `A/B` は既存の発火条件専用、補足は`C-Z`を使用する。
`details`はGrafanaのルール評価時に`$labels`と`$values.C.Value`等を使って展開され、
共通通知テンプレートは展開済みの文字列を表示する。補足クエリは条件に含めず、
元のinstanceと同じLabelsで値を返す式にする。クエリ障害は通常どおり評価エラーになり得る。
日時をLabelsへ入れると毎回別instanceになるため、snapshot時刻はAnnotationsだけに入れる。

PBSの4ルールはVM名（VM番号）、最新の完了snapshot、保持されている最新のverify成功snapshotを表示する。
VM名は`home_pbs_vm_info`の補足クエリ`E`からAnnotationsへ取り込む。
collectorは最新の完了snapshotの注記の先頭行を使う（PVEジョブの`notes-template={{guestname}}`）。
注記またはsnapshotがない場合は`home-service-monitor/targets.json`の`vm_names`を使う。
VM追加・改名時はこの補助台帳も更新する。名前が得られなくてもVM番号は残す。
名前は既存の条件メトリクスに付けず独立したinfoメトリクスへ保持し、改名でアラートinstanceを変えない。
パス例は`vm/13201/2026-10-18T23:04:30Z`。日時は**backup作成時刻（UTC）**で、verify実行時刻ではない。
0は1970年と表示せず「完了snapshotなし」「検証済みsnapshotなし」とする。
`pbs-unverified`は7日以内のverify成功世代がないことを示し、最新backup自体がないとは限らない。
verify失敗ルールの最新/検証成功パスは参考情報であり、失敗世代の特定にはPBSのverifyログを使う。
保持ポリシーは[PBS運用手順](../../ansible/pbs/README.md)を参照する。

`http-service`はHTTPコードも表示し、0は「HTTP応答なし」と区別する。
Loockitは待機系の`/readyz`が503を返す設計だが、blackboxは個々の待機系ではなく
HAProxy経由のServiceを監視する。Serviceの503が3分続く場合はCRITICALを維持する。
2026-10-21の調査では約13分の503と、両LXCのBLE接続エラー・leader交代が重なっていた。
BLE不安定は利用者が既知・許容としている制約で、電波干渉が疑われている。
今回のVM名表示の変更ではLoockitの条件・しきい値は変更しない。

### No Data / Error・上限

現行281ルールは`no_data_state=OK`, `exec_err_state=Error`を維持する。
データ欠落は主に116件の必須系列監視で明示的に検出する。クエリ失敗時は別インスタンス`DatasourceError`になり、通常の障害判定と区別して「評価エラー・判定不能」と表示する。
将来NoData設定を使う場合の`DatasourceNoData`も「データなし・判定不能」と表示する。
これらは元のLabelsが欠けることがあるため、`datasource_uid/ref_id`とalertnameで識別し、severityがなければUNKNOWNとする。復旧も「評価エラー/データなし状態が解消」と表示する。
既存のdirect routingと待機時間は変更しない。PDC全断時は複数ルールのDatasourceErrorが集まる可能性が残る。

GrafanaのDiscord notifierは本文2,000文字・title 256文字で切り詰める。
本文の個別表示を1,650文字以内へ収め、残りを件数・省略警告・Grafana一覧リンクに確保する。
通常の複数通知は各対象・説明・リンクを表示する。大量発生時に全詳細を1通へ無制限に詰めることはできないため、表示件数/総件数と「一部省略」を明示する。
同じ重要度内はGrafanaから受け取った順で、criticalを優先する。隠れた対象の全文は一覧で確認する。
通知嵐を増やす全Labels別groupingや、待機・repeatの変更は行わない。実Discordクライアントでの見え方・リンククリックは別途承認済みの受信試験で確認する。

### 既存UIDを保持するTerraform適用

Providerはlock済みの`grafana/grafana=4.46.0`。Grafana Cloud実機は2026-10-18の調査時13.3.0系。
このProviderの`grafana_contact_point.discord`はSetでUIDがcomputed-only。
本文/title変更時にUIDがunknownとなり、ローカル偽APIでもPOSTによる再作成を確認したため、この移管には使用しない。
代わりに`terraform_data.discord_format`が、承認済みApply時だけ[限定更新スクリプト](../../scripts/grafana-notifications.py)を呼ぶ。
既存name/UID/typeと復旧通知設定を照合し、`contact-points/export?format=json&decrypt=true`で直前の設定をメモリ内へ取得してtitle/messageだけを置き換え、**同じUIDへPUT**する。
Webhook・avatar・username・その他設定を保持し、POSTによる作成、DELETE、テスト通知は実装しない。destroy provisionerもない。
更新後にUIDと書式を再照合し、適用済みならPUTしない。WebhookはTerraform変数・state・plan・Gitへ渡さない。

サービスアカウントには既存のread権限に加え、承認後の適用時に通知先のsecret exportとwrite権限が必要。調査時にread/export可能であることを確認済み。
認証は`GRAFANA_URL/GRAFANA_AUTH`、またはBSMの`GRAFANA_URL/GRAFANA_SERVICE_ACCOUNT_TOKEN`を使用する。値を端末へ表示しない。
適用中にGUIや他のプロセスで同じ通知先を編集しない。APIに設定の比較交換保証がないため、並行編集を避ける。

```bash
# ここまでは本番設定を変更せず通知も送らない
python3 scripts/grafana-monitoring.py inventory
python3 scripts/test-grafana-notifications.py
python3 scripts/test-grafana-notifications.py --live
python3 scripts/grafana-monitoring.py plan --var-file terraform/grafana-cloud/environments.tfvars
terraform -chdir=terraform/grafana-cloud show -json .state/notifications.tfplan \
  | python3 scripts/check-grafana-notification-plan.py
```

`.state/notifications.tfplan`はGit対象外。`show -json`の全出力は秘密情報を含み得るため共有しない。
既存281ルールではAnnotations以外の差分なし、削除なし、共通テンプレート1件と書式更新処理2件の作成だけであることを確認する。
**2026-10-19にmain push後の自動Applyと今回の本番反映をユーザー承認済み。** 通常は下記CIで反映する。緊急の手動反映は同じ共有state・認証環境でレビュー済みplanを`terraform -chdir=terraform/grafana-cloud apply .state/notifications.tfplan`へ渡す。Python 3と必要時の`bws`も同じ実行環境で必要。合成通知の実送信テストは自動Applyに含めない。
Annotationsだけの変更は[公式仕様](https://grafana.com/docs/grafana-cloud/observe-and-act/alert-and-measure-reliability/alerting/fundamentals/alert-rule-evaluation/)で状態リセットの対象外。
補足クエリの追加はquery定義の変更なので、対象5ルールの評価状態がリセットされる可能性がある。
発火条件・継続時間は維持するが、適用直後はHTTPの3分、PBSの15分の再判定期間に注意する。
適用後も評価状態と次回の通知書式を確認する。

`terraform_data`は任意のGUI編集をrefreshで検出しない。通知先の書式driftを調査する場合は、次のread-only検査をreceiverごとに実行する（環境変数は公開UIDとテンプレート参照のみ）。

```bash
GRAFANA_NOTIFICATION_CONFIG='{"name":"Discord - grafana-warning","uid":"afl6jwnytrjeoa","title":"{{ template \"my-infra.title\" . }}","message":"{{ template \"my-infra.message\" . }}"}' \
  python3 scripts/grafana-notifications.py configure
```

`format_change=true`なら、対応する`terraform_data.discord_format["warn"]`または`["critical"]`を`terraform plan -replace='terraform_data.discord_format["warn"]'`で再計画し、承認後にApplyする。このterraform_dataの置換はローカルの更新処理の再実行だけで、通知先の削除ではない。テンプレート内容の変更は通常のresource更新で反映される。
手動でContact Pointを作り直してUIDが変わった場合は更新処理が停止する。新UIDをinventoryで確認し、tfvarsへ反映して再planする。

### 通知の検証とロールバック

`test-grafana-notifications.py`は秘密値なしの偽APIで、read-only既定、同UIDのPUT、全設定保持、冪等性、誤ったUID/type・復旧無効・redacted secretの拒否を検証する。
`--live`は実Grafanaの**template preview APIだけ**へ合成アラートを送り、全281ルールとCRITICAL/WARNING/INFO、復旧、複数、欠損Labels/Annotations、任意Labels過多、No Data/Error、発生復旧混在、上限・優先順を検証する。
`--live`では非保存の`/api/v1/rule/test/grafana`も使用し、snapshotなし・未検証・旧検証済み世代・HTTP 503/応答なしのAnnotations展開と、実クエリへの補足追加前後のinstance Labels一致を検証する。
実ユーザーの通知や実アラートを作成しない。CIではTerraform mock、更新処理の安全性、既存PromQLテストを実行し、実エンジンの検証は認証を持つ環境でApply前に実行する。

mainへpushすると自動反映される。変更を戻す場合も同じCIでPlan/Applyする。次の順序で戻す。

1. Annotations/テンプレートのみの問題なら該当変更をGitでrevertし、通常のplan/検証/承認済みApplyを行う。受信先名・UID・評価式は変更しない。
2. 標準書式へ戻す場合は`notifications.tf`のtitleを`{{ template "discord.default.title" . }}`、messageを`{{ template "discord.default.message" . }}`へ戻してplanし、書式更新処理が再実行される承認済みApplyを行う。
3. 2つのreceiverの参照が標準へ戻った後、不要な共通テンプレートとterraform_dataを削除する。先にテンプレートだけ削除すると未定義参照になるため避ける。
4. stateを破棄したりContact Pointを削除・再作成したりしない。新規変更でroutingやpauseを操作しない。

[全ルール・必須系列の調査台帳](ALERT_INVENTORY.md)、[変更ファイル一覧・検証結果・Plan](NOTIFICATION_VALIDATION.md)も参照。
公式仕様: [通知データと関数](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/template-notifications/reference/)、[No Data/Error](https://grafana.com/docs/grafana/latest/alerting/fundamentals/alert-rule-evaluation/nodata-and-error-states/)、[Discord notifier実装](https://github.com/grafana/alerting/blob/main/receivers/discord/v1/discord.go)、[固定ProviderのContact Point実装](https://github.com/grafana/terraform-provider-grafana/blob/v4.46.0/internal/resources/grafana/resource_alerting_contact_point.go)。

## main push後の自動Apply

[Grafana monitoring CI/CD](../../.github/workflows/grafana_monitoring.yml)は関連pathのmain pushを受け、次の順序で実行する。

1. `validate`: Terraform fmt/validate/mock test、更新処理・デプロイ検証の単体テスト、collector、PromQL、復元テスト、Kustomize build。
2. `apply`: validate成功時かつmain push時だけ起動する。GitHubのconcurrencyとHCPのstate lockで同時Applyを防止し、実行中Applyをcancelしない。Apply内も`-parallelism=1`でGrafanaへの書き込みを直列化し、同じAlertmanager設定を更新する2 receiverの競合を避ける。
3. `scripts/deploy-grafana-monitoring.py --apply`が既存共有stateと専用backendを確認する。stateが空・不完全・別folderなら停止し、281ルールを重複作成しない。
4. 実Grafanaの303ケースのtemplate previewを実行し、Planをrunnerの非公開`.state/deployment.tfplan`へ保存して、その同じPlanをApplyする。
5. APIで共通template、既存2 receiverのUID/書式、全管理ルールのAnnotations/Labels/pauseを照合し、追加Planが差分ゼロであることを確認する。

既存GitHub Secretsの`TF_API_TOKEN`（HCP state）と`GH_MY_INFRA_BWS_ACCESS_TOKEN`（BSM認証）を利用する。
Grafana URL/tokenはBSMの既存キーからメモリ内に読み込み、ログをmaskする。WebhookはGitHub Secretsへコピーせず、既存通知先から限定更新時だけメモリ内へ取得する。
PR・forkにこれらのSecretsを渡さない。bwsは公式2.0.0のSHA256固定archive、Terraformは1.15.8を使用する。
state・Plan・`terraform show -json`はArtifactへアップロードしない。HCP workspaceのexecution modeをremote/agentへ変えるとrunnerの認証・local-execと一致しなくなるため、`local`を維持する。

Planだけ確認する場合は、HCPのCLI認証を設定した端末で次を実行する。Grafana認証は既存環境変数またはBSMを使う。

```bash
python3 scripts/deploy-grafana-monitoring.py
```

失敗した場合は該当GitHub Actions runを確認する。Apply途中の失敗でもstateはHCPへ保存されるため、古いローカルstateを戻さない。
原因を修正してmainへpushするか、同じrunを再実行する。terraform_dataがtaintedなら再実行され、同UIDのPUTは冪等に処理する。
receiverを書式だけGUI編集していた場合はread-only検証で失敗するため、前述の-replace手順で修復する。
初回bootstrapやstate移行はCIで自動実行しない。専用workspaceの作成・空の移行先確認・バックアップ・`terraform init -migrate-state`・全リソース/outputsの一致検査を行ってからCIを有効化する。

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

CIのvalidate jobは認証不要のmock plan、PromQL構文と閾値/欠測/scale-to-zero等の回帰テスト、Kustomize buildを実行する。mainのpushでは成功後にapply jobが続く。PRでは本番認証を渡さず、Applyしない。
read-only検査で表示される「condition true」は継続時間未判定で、通知を送信しない。

## アラート受信時の入口

- **電源**: `upsc`でOB/残量を確認し、[給電先・cross-power構成](../../docs/ups-shutdown.md)を確認する。Grafanaから停止操作はしない。
- **ホスト/ストレージ**: 同じinstanceのICMP・exporter・ZFS状態・使用率を照合する。NASとPVE停止を先に確認してからアプリを調べる。
- **サービス**: namespaceのDeployment/StatefulSet/Pod・イベントを確認し、DB/NFS/DNSの障害を切り分ける。TCP成功だけで機能正常と判断しない。
- **backup**: CronJobの直近Jobとログ、保存先の検証結果を確認する。最終成功なしはCronJob作成時からの経過で判定する。DB jobはMariaDBとPostgreSQL両系統を含む。
- **定期Job失敗**: CronJobごとに作成時刻が最新のJobだけを対象とし、終端のFailed状態を判定する。後続Jobが成功・実行中なら過去の失敗は通知しない。成功したJob内のPod再試行も失敗扱いしない。owner/作成時刻の収集欠落は別途検知する。
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
