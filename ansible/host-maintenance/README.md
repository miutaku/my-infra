# Host maintenance agents

Discord操作付きのdev-app-server再起動と、PVEの自動パッケージ更新・承認付き再起動を配備する。
全体の仕様・Discord設定・Cloudflare配備・復旧方法は
[maintenance-control](../../workers/maintenance-control/README.md)を参照。

```bash
export BWS_ACCESS_TOKEN='...'
ansible-playbook site.yml --check --diff
ansible-playbook site.yml
```

controllerを配備し、DiscordのInteractions endpointを検証してから実行する。
`group_vars/all.yml`にcontroller originを設定する。ホストごとの認証トークンは
BSMの`REBOOT_AGENT_TOKENS_JSON`から取得し、root専用ファイルに保存する。
controllerは`https://maintenance.miutaku.work`を使い、追加のAccess資格情報は
`MAINTENANCE_CF_ACCESS_TOKENS_JSON`からホスト別に取得する。秘密値を出さず、
Accessと既存Bearerの両方を送信する。認証付きリクエストはリダイレクトしない。

PVEのguest停止やVM移行をこのplaybookから実行することはない。
PVEの更新時刻はinventoryの`host_maintenance_update_hour`でホストごとに管理する。
pve-x570は毎日17時台、pve-b550mは18時台にパッケージを自動更新し、OS再起動が必要なら19時に通知する。
各タイマーには最大15分のランダム遅延を付け、PVE間の排他は維持する。
再起動候補はVMが翌朝05:00、pve-x570が06:00、pve-b550mが07:00とし、
手動指定を含む時刻の分離はcontrollerで検証する。いずれも日本時間。
OS再起動だけがDiscordでの日時指定・承認と事前確認を必要とする。
一般の稼働中VM/CTがあっても承認済みOS再起動を許可し、guestの停止・起動はPVE標準処理に任せる。
可用性の保護対象はLoockitとCloudflare Tunnelとする。監視基盤は対象外。Kubernetes・NASを含むVMの退避やNFSの到達性は要求しない。
承認済みの実行時だけLoockitを相手へ切り替える。相手が既にreadyなら停止操作は不要。
相手が正常な待機系で、再起動対象以外のTunnelが利用可能なら、ローカルLXC内の`loockit`コンテナだけを停止する。
相手の`/readyz`が200になるまで最大480秒待ち、ローカルを起動して待機系へ戻してから相手のreadyを再確認する。
切替中はBLEの再接続・認証により操作できない時間が発生する。失敗時はローカルを起動し、ホスト再起動を保留する。
停止前にexecution journalへ復旧用フラグを保存し、agent中断後も次回実行でローカルを起動する。
`--probe`は読み取り専用で、Loockitの停止・切替は行わない。
`files/availability-policy.json`を`/etc/host-maintenance/availability-policy.json`へ配備する。
`--probe`で`rebootSafe`とLoockitを含む具体的な`rebootBlockReason`を確認できる。
再起動後は両Loockitプロセスの健全性とreadyなleaderが1台であることを確認する。
実行条件はcontroller READMEの可用性保護を参照。
クラスタ・パッケージの健全性とPVE同士の排他を維持する。バックアップ以外のactive taskは保留条件とする。
保留通知は予定日時、対象ホストを含む具体的な理由、未再起動であること、再実行に必要な操作を表示する。毎日のリマインダーにも理由を記載する。
再起動を保留していてもパッケージの自動更新は継続する。

Tunnelは配置固定せず物理ホスト単位に分散する。再起動前は対象PVE以外のworkerで `/ready` が200の接続を最低1つ要求する。
workerのIP・PVE所属を変更する場合はavailability-policy.jsonも更新する。externalTrafficPolicy: LocalのNodePort 32000番を内部LANから確認し、Kubernetes APIには依存しない。

承認済み再起動は実行中バックアップより優先する。Loockit/Tunnelの確認後に両PVEの`vzdump`を
Proxmoxのタスク停止APIで止め、正常に終了したことを確認してから再起動する。
対象とオプションは停止前に`/var/lib/host-maintenance/backup-replay.json`へ保存し、
再起動後にPVEとPBS/NASの復帰を待って同じ内容で最初から再実行する。
再起動が事前確認で取り止めになった場合は、同じ起動のままバックアップを再実行する。
`--probe`は読み取り専用で、バックアップの停止・再実行をしない。
履歴は`backup-replay-last.json`とjournalで確認できる。
再実行の受付結果が不明な記録はタスク履歴と照合し、解決しない場合は手動調査する。
`--recover`で中断した再起動を保留へ戻す場合、残っているバックアップ記録も再実行対象へ戻す。
