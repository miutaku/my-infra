# Discord maintenance control

Discordのボタンで、dev-app-serverの再起動予定とPVEの再起動枠を管理する。
操作・予定はCloudflare WorkersとSQLite-backed Durable Objectに保存し、PVE停止中も
操作を受け付ける。3ホストを一つのmaintenance groupとして扱い、PVE同士の実行を排他する。

## 動作

- dev-app-server: 18時台に従来のunattended-upgradesで更新。19時に再起動が必要なら
  翌朝05:00の予定をDiscordへ送信する。通知成功済みの最新版だけが実行可能。
- PVE: 18時台にパッケージを自動更新する。VM/CTの稼働中でも更新できる。
  19時に再起動が必要な場合だけ通知し、**OS再起動は指定・承認した日時にだけ実行する**。
  保留・延期の操作はOS再起動だけに適用し、パッケージ更新は継続する。
- `翌日に延期`: 実行日時を翌日へ移す。PVEは再承認が必要。
- `日時を指定`: `YYYY-MM-DD HH:mm`（日本時間）。10分以上先・90日以内。
  保留からの再開にも使う。PVEは日時指定後に別途承認する。
- `保留`: 自動実行を停止する。未完了の予定には毎日19時にリマインドを送る。
- `この日時で承認`: PVEのOS再起動日時だけを承認する。
  その後のパッケージ更新は承認済みの日時や保留状態を変更しない。
- 予定の変更後にDiscordメッセージを更新する。古いボタンは拒否する。
- 実行権を取得した後は延期できない。ボタンと実行権取得の順序はDOで直列化される。
- ホストは毎分、HTTPSで状態報告と実行権の取得を行う。通信断、通知失敗、
  古い起動セッション、実行枠から5分以上経過した予定では新しい処理を開始しない。
- 承認された再起動の実行後、起動IDの変更と健全性を確認すると、Discordに
  `【再起動完了】ホスト名`と正常復帰の確認日時（日本時間）を新規投稿し、元の予定も更新する。
  PVEでは両ノードonline・quorum・管理サービス・dpkgを確認する。
  VMやアプリケーション個別の正常性まで確認したという意味ではない。
  起動IDが同じ場合や健全性確認中には完了通知を出さない。
  再起動不要・実行前の起動セッション変更による予定解除とは表示を分ける。
- 完了通知は予定の終了と同時にSQLiteへ保存し、Discordへの送信に失敗しても
  次の毎分のホスト報告で再試行する。19時の定期処理でも再試行する。
  送信成功後は削除し、同じ報告の再受信で二重送信しない。
  POSTには固定nonceと`enforce_nonce`を付け、応答喪失時の直近の重複を抑える。
  Discordのnonce重複判定期間を超える応答喪失では重複し得る。
- 19時を過ぎて更新が完了した場合は次の19時の通知まで待つ。
- 操作はDiscord署名・5分以内のtimestamp・サーバー/チャンネル・許可ユーザーIDで検証する。
  ホストのAPI資格情報はホストごとに分離する。BotにAdministrator権限は不要。

## PVEの事前確認と限界

PVEは両ノードがonlineでquorumがあること、PVE管理サービスとdpkgの健全性、
他のパッケージマネージャが動いていないことを確認する。ユーザーの運用方針として、
**稼働中のVM/CTがあっても、Discordで承認した日時のOS再起動を許可する**。
guestの停止・起動はPVEの通常のホスト再起動処理に任せる。
パッケージ更新・OS再起動とも、両ノードのいずれかでバックアップ・移行等のタスクが
実行中なら見送る。guestの強制停止、手動の一括停止・移行、バックアップ削除は行わない。
更新は`apt-get dist-upgrade --no-remove`で行い、削除が必要な更新は手動対応にする。
更新処理にはOS再起動処理を含めず、needrestartは一覧表示モードとする。
パッケージ自身のフックによる管理サービス再起動は発生し得る。
自動更新もPVE groupで排他し、別のPVE更新・承認済みOS再起動と重ならないようにする。
カーネルはインストール済みの`/boot/vmlinuz-*-pve`と実行中versionを比較して再起動を判定する。

現在の2ノードPVEでは片ノード停止時にPVEのquorumが失われ、Talos control planeも
pve-b550mへ2台集中している。VMを退避できない場合には停止時間を伴うため、
承認前にVMの配置と停止の影響を手動確認する。これらの制約を無視して自動退避したり、
`pvecm expected`の変更でquorumを強制的に成立させたりしない。

PVEの処理が中断・失敗した場合、時間経過だけで排他を解除せず、他方のPVEも停止する。
再起動後は両ノード・quorum・管理サービス・dpkgの健全性を確認してから解除する。
OSのメジャーバージョン更新やVMの退避自動化は対象外。

## セットアップ

1. Discord Developer Portalで専用アプリ/Botを作る。通知先サーバーへBotを追加し、
   対象チャンネルのView Channel / Send Messages / Read Message Historyを許可する。
2. BSMへ`REBOOT_DISCORD_BOT_TOKEN`と`REBOOT_DISCORD_OPERATOR_IDS`（カンマ区切り）を保存する。
   通知先は既存の`REBOOT_NOTIFY_WEBHOOK`のチャンネルを使う。
3. `npm ci`し、`.dev.vars.example`を`.dev.vars`へコピーしてローカルテスト用のダミー値を用意する。
4. `npm run types && npm run check && npm test`で検証する。
5. `BWS_ACCESS_TOKEN`を設定し、`python3 setup.py`で公開IDとBotのチャンネルアクセスを確認。
6. `python3 setup.py --deploy`で配備する。BSMに`REBOOT_AGENT_TOKENS_JSON`がない場合は
   3ホスト専用の乱数トークンを作り、Webhookと同じBSM projectへ保存する。
   `TF_CLOUDFLARE_API_TOKEN`をデプロイ時だけ環境へ渡し、Bot/agent secretsは
   `wrangler secret bulk`の標準入力で登録する。
7. setupはDiscordアプリのInteractions endpointをWorkerの`/discord/interactions`へ登録する。
   Discordからの署名付きPING検証に成功して初めて登録が完了する。
8. `ansible/host-maintenance/group_vars/all.yml`へ出力されたcontroller originを設定し、
   `ansible/dev-application-server/group_vars/all.yml`の`dev_reboot_controller_enabled`をtrueにする。
9. `ansible/host-maintenance`で`ansible-playbook site.yml --check --diff`、`ansible-playbook site.yml`を実行する。
   このplaybookは旧VM通知・再起動timerとPVEの独立した標準自動更新を止め、
   排他制御付きのPVEパッケージ更新timerを有効にする。

Bot/agent tokenをGit、ログ、URLクエリへ保存しない。公開IDだけをwrangler.jsoncへ保存する。
Discord tokenの先頭の`Bot `はsetupが除去する。Cloudflare用トークンには対象accountの
Workers Scripts / Durable Objectsに必要な権限を付ける。

## 確認と手動復旧

ホストで`systemctl list-timers 'host-maintenance*'`、
`journalctl -u host-maintenance-agent.service`を確認する。
`sudo /usr/local/sbin/host-maintenance-agent --probe`はcontrollerへ接続せず、ローカル状態だけを確認する。

再起動処理のjournalは`/var/lib/host-maintenance/execution.json`、
自動パッケージ更新のjournalは`/var/lib/host-maintenance/update.json`。
rootでAPT/dpkg状態・実行プロセス・VM/CT・クラスタ状態を手動調査し、必要な修復を完了してから、
`sudo /usr/local/sbin/host-maintenance-agent --recover`を実行する。
これは健全性を再確認して予定を**保留**へ戻し、PVE groupの排他を解除する。
保留解除はDiscordの日時指定で行い、PVEは再承認する。journalの削除だけでは排他解除にならない。

Worker側の操作監査はWorkers Logsへ、実行の詳細はホストのjournalへ記録する。
Botを削除・チャンネル権限を変更した場合は通知更新に失敗し、変更した再起動予定の実行は止まる。
すでに通知・承認済みの予定を止めるには、実行前に保留操作を行う。

## テスト

```bash
npm run check
npm test
python3 -B -m unittest discover -s ../../ansible/host-maintenance/tests -v
```

延期と実行の競合、古い通知、通知失敗、PVEの同時実行、再起動承認の独立性、
署名・許可ユーザー検証、自動更新がOS再起動しないこと、および
稼働中guestが再起動を妨げないこと、再起動時のtask確認と更新・再起動の排他を検証する。
完了通知はCloudflareのローカル実行環境でDiscordを模擬し、起動ID不変・不健全な復帰・
正常復帰・同じ報告の再送・送信失敗からの再試行・予定解除との区別を検証する。
本番ホストの再起動や実際のテスト通知は自動テストには含めない。

既存環境へのコード更新は検証・mainへのpush後、BSMの`TF_CLOUDFLARE_API_TOKEN`を
プロセス環境へ渡して`npx wrangler deploy`する。既存のBot/agent secrets・DOデータ・
予約は維持する。初期セットアップやsecretの再登録は不要。
ロールバックは直前のWorkerバージョンへ`npx wrangler rollback <VERSION_ID>`する。
追加した`notifications`テーブルは残るため、未送信通知がある状態では先に配送状況を確認する。

### 2026-10-21の予約確認

10月20日19時のPVE通知から承認された10月21日05:00の再起動は、
pve-x570が05:00:03、pve-b550mが05:01:03に事前確認で保留へ戻っていた。
両ホストと稼働中guestは10月17日から起動したままで、再起動は実施されていない。
稼働中VM/CTがあると停止する既存の安全制御に該当する。
確認時点で両ホストの健全性は正常、再起動要否はtrue。
この調査後、ユーザー承認により稼働中guestによる再起動の保留条件を撤廃した。
既存の保留はそのまま維持する。次回実行するにはDiscordで将来日時を指定し、再承認する。
