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
PVEは毎日18時台にパッケージを自動更新し、OS再起動が必要なら19時に通知する。
OS再起動だけがDiscordでの日時指定・承認と事前確認を必要とする。
一般の稼働中VM/CTがあっても承認済みOS再起動を許可し、guestの停止・起動はPVE標準処理に任せる。
可用性の保護対象はLoockitとCloudflare Tunnelとする。監視基盤は対象外。Kubernetes・NASを含むVMの退避やNFSの到達性は要求しない。
再起動前に相手ホストのLoockitがreadyであることを確認し、相手が待機系のまま・異常・到達不能なら保留する。
稼働中のLoockitを自動停止して切り替える処理は行わない。
`files/availability-policy.json`を`/etc/host-maintenance/availability-policy.json`へ配備する。
`--probe`で`rebootSafe`とLoockitを含む具体的な`rebootBlockReason`を確認できる。
再起動後は両Loockitプロセスの健全性とreadyなleaderが1台であることを確認する。
実行条件はcontroller READMEの可用性保護を参照。
クラスタの健全性・両ノードのactive task・パッケージ状態の確認と、PVE同士の排他は維持する。
再起動を保留していてもパッケージの自動更新は継続する。

Tunnelは配置固定せず物理ホスト単位に分散する。再起動前は対象PVE以外のworkerで `/ready` が200の接続を最低1つ要求する。
workerのIP・PVE所属を変更する場合はavailability-policy.jsonも更新する。externalTrafficPolicy: LocalのNodePort 32000番を内部LANから確認し、Kubernetes APIには依存しない。
