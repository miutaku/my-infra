# Host maintenance agents

Discord操作付きのdev-app-server再起動と、PVEの承認付き更新・再起動を配備する。
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
agentの導入だけではPVEの更新・再起動は発生せず、Discordでの承認と事前確認を必要とする。
