# バックアップアラート調査（2026-10-21）

時刻は特記しない限りJST。Grafana状態履歴Lokiを直近7日間で検索し、
取得したバックアップ関連225イベント（Alertingへの遷移31件）を、PBSタスク履歴と
VictoriaMetricsの実測値へ照合した。状態履歴は2026-10-18以降の記録だった。
通知先への実送信履歴そのものではないため、遷移件数と受信通知数は一致するとは限らない。

## 調査結果

| アラート | 確認できた事象・原因 | 対応 |
| --- | --- | --- |
| PBS VM backup age warn | 10/18〜21に8回の発火。うち7回はWindows VM、1回は開発VM。各1〜6分で通常状態へ戻った。4時間周期と4時間超の警告が重なり、正常な処理中に15分の継続条件を超えた | 警告のみ5時間超へ変更。継続15分、8時間超のcriticalは維持 |
| PBS has no verified snapshot in 7 days | verifyの未完了・定期schedule欠落に加え、PVEの`keep-last=1`が検証済み世代を次のbackupで削除。10/19の手動verify後も再発した | 既に承認・実施済みの毎日06:00 verifyと、PVE `keep-all=1` / PBS側pruneの保持管理を維持。10/20 07:06〜09:06に3VMとも解消し、その後の再発なし |
| DB/NAS/録画の検証結果stale | 10/18 04:31に発火し、録画04:41、DB04:52、NAS04:53に解消。初回の検証成功指標が得られるまで正常性を確認できなかった | 閾値を維持。現在もbatch指標を履歴窓から評価し、瞬時系列の消失を失敗扱いしない |
| PBS VM restore validation overdue | 10/18 04:31に3VMで発火し、各VMの復元成功報告後に05:26、07:16、09:17に解消 | 28日期限を維持。backup/verify成功を復元テスト成功の代わりにしない |
| MissingSeriesによる終了 | `pbs-unverified`などにデータ欠測による`Normal (MissingSeries)`があり、直後に再発。通常復旧とは区別が必要 | 共通通知で「監視データ欠測による終了・復旧未確認」と明示。終了時刻を「復旧」と表記しない |

上表の期限超過以外のbackup critical・verify失敗ルールについて、この履歴検索では
実際のAlerting遷移はなかった。全期間・すべての外部通知で異常がなかったことの保証ではない。

## 鮮度警告の根拠

監視対象は以下の3VM。

| VM | VM名 | 直近36時間の最大観測経過時間 |
| --- | --- | --- |
| 13201 | unifi-os-01-server-ubuntu-26-04-home-amd64 | 4時間7分47秒 |
| 40000 | dev-application-server-01-docker-ubuntu-26-04-home-amd64 | 4時間14分12秒 |
| 60000 | work-windows-home-amd64 | 4時間20分13秒 |

PBSの`backup-time`はsnapshotの作成時刻で、処理完了時刻ではない。
collectorはmanifest `index.json.blob`が書かれた完了snapshotだけを最終成功として採用する。
Windows VMの直近12回はすべて成功し、所要時間は約5〜19分だった。
2026-10-21の処理は08:09:26開始、08:23:09成功。collectorは5分周期のため、
08:20の警告は08:26に解消した。前の成功snapshotは04:04台のものだった。

警告5時間超は4時間周期に1時間の猶予を加え、処理時間・開始ずれ・収集待ちを吸収する。
backupが止まれば約5時間15分でwarning、約8時間15分でcriticalになる。
criticalの条件と継続時間、未完了snapshotを成功扱いしない判定、VM名・snapshotパス表示は維持する。
過去8回のAlerting遷移時刻の実測値で新旧の式を再評価し、旧式は8回とも1、
新式は8回とも0になることを確認した。発火していない時点や将来の遅延を保証する検証ではない。

## 定期verifyジョブ全体に残る問題

10/20 06:00〜09:14のverifyジョブは、次の2snapshotでmanifestがなく失敗していた。

- `vm/9001/2026-06-05T11:56:50Z`
- `vm/9002/2026-06-05T11:56:50Z`

どちらもPVEでは`template-ubuntu-26-04-home-amd64`のテンプレート。
PBSのファイル一覧には`qemu-server.conf.blob`しかなく、`index.json.blob`がない。
監視3VMの保持snapshotについてverify失敗はなく、調査時の全148snapshot中127件がverify成功、
21件は未検証だった。当該2件にはverification state自体も付いていなかった。
したがって、監視VMの`home_pbs_verification_failed=0`はverifyジョブ全体の成功を意味しない。

再検証だけではこのmanifest欠落は解消しない。古い未完了snapshotの削除は別途確認して扱う。
今回、snapshot削除・verify対象除外・保持ポリシー変更・追加のbackup/verify実行は行っていない。
実データ破損のアラートを抑止する変更も行っていない。

## 再確認用の読み取り

Grafanaの履歴データソース: `grafanacloud-alert-state-history`。

```logql
{from="state-history"} | json | labels_service="backups"
```

```promql
max_over_time((time() - home_pbs_backup_last_success_seconds{job="home-service-monitor"})[36h:1m])
```

PBSホストで`proxmox-backup-manager task list --all true --limit 500 --output-format json`と
`proxmox-backup-debug api get /nodes/localhost/tasks/<UPID>/log --start 0 --limit 2000 --output-format json`
を使ってタスク・ログを読み取れる。`task log`は終了まで追従するため、調査には上限付きAPIを使う。
認証情報・Webhook・生のstateやAPIレスポンス全体を調査メモへ保存しない。
