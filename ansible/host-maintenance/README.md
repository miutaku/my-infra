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
再起動を保留していてもパッケージの自動更新は継続する。
