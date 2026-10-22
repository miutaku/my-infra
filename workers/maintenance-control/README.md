# Discord maintenance control

Discordのボタンで、dev-app-serverの再起動予定とPVEの再起動枠を管理する。
操作・予定はCloudflare WorkersとSQLite-backed Durable Objectに保存し、PVE停止中も
操作を受け付ける。3ホストを一つのmaintenance groupとして扱い、PVE同士の実行を排他する。

## Cloudflare Accessの境界

| 接続先 | 公開範囲・認証 |
|---|---|
| `maintenance-discord.miutaku.work/discord/interactions` | Discord署名・時刻・許可ユーザーを検証。Accessログインは要求しない |
| `maintenance.miutaku.work/agent/*` | 各ホスト専用のAccessサービス認証と、既存のホスト別Bearer tokenの両方が必須 |
| `loockit-lease.miutaku.work` | Loockit専用のAccessサービス認証と、既存のインスタンス別Bearer tokenの両方が必須 |

Workerはホスト名とAPIパスの組み合わせも限定する。公開DiscordドメインやLoockitの
ドメインから再起動APIへアクセスできない。`workers.dev`とpreview URLは無効にする。
Accessポリシーは`terraform/cloudflare/maintenance-access.tf`で管理し、人間用のAllowや
Bypassを機械用ドメインに設けない。監視用の`home-monitoring`資格情報も許可しない。

Access資格情報5組は`MAINTENANCE_CF_ACCESS_TOKENS_JSON`としてBSMに保存する。
`python3 scripts/maintenance-access.py provision`で初回登録し、Terraformには公開token IDだけを渡す。
サービスのClient SecretはTerraform state・Git・イメージに保存しない。
有効期間は1年。期限前にCloudflareで更新し、secretをローテーションした場合はBSMも更新して
Ansibleを再配備する。ホストのagent-configとLoockitのaccess-headers.jsonはroot専用にする。
Loockit v0.1.20以降は`LOOCKIT_LEASE_ACCESS_FILE`でこのJSONを読み、既存Bearerと併用する。
認証付きクライアントはHTTPリダイレクトを拒否して資格情報の他宛先への転送を防ぐ。

移行時は新ドメインとAccess資格情報を作成→全ホスト・Loockitのクライアントへ配備→
Discord受付先を変更→LoockitのAccessを有効化→`workers.dev`無効化の順に行う。
`python3 scripts/maintenance-access.py register-discord`はDiscord自身の署名付きPING検証を伴う。
`python3 scripts/maintenance-access.py verify`で、全クライアントの認証成功、資格情報の不足・
用途違いの拒否、公開ドメイン経由の迂回拒否、旧URLの無効化を状態変更なしで確認する。
確認用`POST /agent/auth-check`は認証結果だけを返し、予定作成・実行権取得・再起動を行わない。

## 動作

- dev-app-server: 18時台に従来のunattended-upgradesで更新。19時に再起動が必要なら
  翌朝05:00の予定をDiscordへ送信する。通知成功済みの最新版だけが実行可能。
- PVE: 18時台にパッケージを自動更新する。VM/CTの稼働中でも更新できる。
  19時に再起動が必要な場合だけ通知し、**OS再起動は指定・承認した日時にだけ実行する**。
  保留・延期の操作はOS再起動だけに適用し、パッケージ更新は継続する。
- `翌日に延期`: 実行日時を翌日へ移す。PVEは再承認が必要。
- `日時を指定`: 自分だけに見える日付・時・分の選択メニュー（日本時間）。文字列入力は不要。
  分は5分刻み、日付は「前の日付」「先の日付」で90日先まで選べる。
  10分以上先・90日以内を選んで「この日時に設定」を押す。
  初期値は15分以上先にする。保留からの再開にも使う。PVEは設定後に別途承認する。
  時間が近すぎる場合は指定できる最短時刻を表示し、日時設定・承認時にも再確認する。
- `保留`: 自動実行を停止する。未完了の予定には毎日19時にリマインドを送る。
- `この日時で承認`: PVEのOS再起動日時だけを承認する。
  その後のパッケージ更新は承認済みの日時や保留状態を変更しない。
- 予定の変更後にDiscordメッセージを更新する。古いボタンは拒否する。
- 操作直後の自分だけに見える返信にも最新の操作ボタンを表示する。
  PVEの日時指定・延期後は、その返信の「この日時で承認」から続けて承認できる。
  承認完了時はホスト名・承認日時とともに「OS再起動を承認しました」と表示する。
- 実行権を取得した後は延期できない。ボタンと実行権取得の順序はDOで直列化される。
- ホストは毎分、HTTPSで状態報告と実行権の取得を行う。通信断、通知失敗、
  古い起動セッション、実行枠から5分以上経過した予定では新しい処理を開始しない。
- 実行予定のPVE・VMは予定時刻の5分前から、Discordへ`【再起動5分前】`を新規投稿する。
  毎分の定期処理とホスト報告で確認するため、通常は5〜4分前に届く。
  ホスト名・予定日時と、変更・保留用のボタンを表示する。
  PVEの未承認・保留・実行中・終了した予定には送らず、同じ予定時刻には一度だけ通知する。
  日時を変更した場合は変更後の5分前に通知する。
  送信失敗は予定時刻まで毎分再試行し、固定nonceで応答喪失時の重複を抑える。
  この追加通知の失敗だけでは、承認済みの実行予定や既存の実行条件を変更しない。
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
**一般の稼働中VM/CTがあっても、Discordで承認した日時のOS再起動を許可する**。
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

### Kubernetes・Loockitの可用性保護

PVE再起動は、以下の読み取り確認をすべて満たす場合だけ許可する。
実行権取得後の事前確認で失敗すれば保留へ戻し、可用性確認が理由の場合はDiscordの予定にも明記する。
通常報告時のサービス健全性が不足する場合も実行権を渡さない。

- `home-k8s`タグのVM、および明示したKubernetes VM `13001`–`13005`、
  共有NFSのNAS VM `69001/69002`がすべて存在・稼働し、配置を特定できること。
- これらの保護VMが再起動対象ホストに1台も残っていないこと。
  control planeの過半数を失う再起動や、worker上のPodの突然停止、NFSの停止を避ける。
  タグ付きの新しいKubernetes VMも自動的に保護する。
- 残存ホストのLoockit `/readyz`がHTTP 200、共有NFS `.191/.192`のTCP 2049へ到達できること。
  再起動後の完了判定では両Loockitの`/healthz`が200で、`/readyz`が200のleaderが1台、
  もう1台は503の`standby replica`であることと、保護VMの稼働・NFS到達を再確認する。
  通常の待機系503を障害と誤認しない。対象ホストが現在のleaderの場合は、
  peerがreadyになるまで再起動を許可せず、自動的にleaderを停止・切替することはない。
  これはKubernetes Node ReadyやNFS上の全アプリケーションの動作、BLE機器操作成功の検証とは異なる。

方針はAnsibleの`files/availability-policy.json`で管理し、未配備・読取失敗・対象VM欠落・
状態不明・接続失敗では再起動を許可しない。通常のパッケージ更新には退避を要求しない。
`host-maintenance-agent --probe`は読み取りだけで`rebootSafe`と保留理由を返す。

**現在の配置では両PVEの再起動は保留になる。** b550mにはcontrol planeが2台あり、
x570のNAS VMはUSBディスクmappingを使うため、VMを一律にライブ移行する方式は採用していない。
安全な再起動には、保護VMの移行先容量・CPU互換性・ローカルディスクとISOを確認し、
NASの停止を伴わない切替方法を別途用意する必要がある。自動退避・drain・ストレージ変更や
quorumの強制変更は行わない。退避した場合はKubernetesのNode Ready、etcd、Loockit経路、
NFSと必要なアプリの動作を確認してから、`--probe`とDiscordでの日時指定・再承認を行う。
退避中はTerraformの固定配置やKubernetesの物理ホストlabelにも差分が生じるため、
未確認のTerraform Applyやlabelの流用は避ける。

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
一般の稼働中guestを許可し、保護VMの残存・欠落・停止・配置不明、Loockit不健全、
NFS切断・policy欠落では再起動を止めること、およびtask確認と更新・再起動の排他を検証する。
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


## Loockitの独立BLE Lease

同じWorkerに`LoockitLease`を追加するが、`MaintenanceFleet`と別のSQLite DOで管理する。
固定した1 LeaseのGET/POST/PUTのみ提供し、Kubernetesには接続しない。
認証はBSMの`LOOCKIT_COORDINATOR_TOKENS_JSON`からWorker secret
`LOOCKIT_LEASE_TOKENS_JSON`へ登録する。`setup-loockit.py --deploy`を使用する。
手順・安全な初回切替・独立Tunnel・ロールバックは
[Loockit LXC README](../../ansible/loockit-lxc/README.md)を参照。

競合create/CAS、期限前の横取り拒否、期限後の交代、旧ownerの更新拒否、server時刻、
認証identity、過大body、永続化をCloudflareのローカル実行環境で検証する。
DOを追加したmigration v2より前のWorkerへ戻す場合は、稼働中BLE Leaseの移行も必要になる。
Loockitが利用中のDO class/bindingを通常のメンテナンス修正で削除しない。

mainへのpush時は`Maintenance control Worker`のCIがcheck/test後に配備する。
このCIはGitHub hosted runnerで実行し、home-k8sの停止に依存しない。
