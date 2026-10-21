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

PVEのguest停止やVM移行をこのplaybookから実行することはない。
PVEは毎日18時台にパッケージを自動更新し、OS再起動が必要なら19時に通知する。
OS再起動だけがDiscordでの日時指定・承認と事前確認を必要とする。
一般の稼働中VM/CTがあっても承認済みOS再起動を許可し、guestの停止・起動はPVE標準処理に任せる。
ただしKubernetes VM・共有NFSのNAS VMは再起動対象ホストに残っていれば保留する。
`files/availability-policy.json`を`/etc/host-maintenance/availability-policy.json`へ配備する。
`--probe`で`rebootSafe`と具体的なVM番号・名前を含む`rebootBlockReason`を確認できる。
退避・NAS切替は自動実行しない。実行条件はcontroller READMEの可用性保護を参照。
クラスタの健全性・両ノードのactive task・パッケージ状態の確認と、PVE同士の排他は維持する。
再起動を保留していてもパッケージの自動更新は継続する。
