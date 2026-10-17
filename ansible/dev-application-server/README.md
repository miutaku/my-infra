# Development application server

`dev-app-server` (`192.168.20.101`) の追加パッケージとホスト設定を管理する
Ansible playbook。

管理対象は次のとおり。

- Docker、Kubernetes、Azure、HashiCorp、ChromeのAPTリポジトリ
- 開発・ブラウザ・動画・Kubernetes関連のAPTパッケージ
- Helm snap
- Packer、D2、uv/uvx、BWS、kubectx/kubens、talosctl（バージョンとSHA-256を固定）
- Pipenv、virtualenv、OCI CLI、Mermaid CLI、Bitwarden CLI
- Docker/node exporterサービス、unattended-upgrades、bash環境、OCI CLI設定
- `scripts/setup-kubeconfig`の配布

秘密値はBitwarden Secrets Manager (BSM)から実行時に取得し、リポジトリには
保存しない。実行端末には`bws`と`BWS_ACCESS_TOKEN`が必要。

```bash
cd ansible/dev-application-server
export BWS_ACCESS_TOKEN='...'
ansible-playbook site.yml --check --diff
ansible-playbook site.yml
```

## 自動更新と再起動

Discordからの延期・日時指定・保留、およびPVEの承認付き更新は
[host-maintenance](../host-maintenance/README.md)で管理する。
`dev_reboot_controller_enabled: true`の場合は、以下の旧ローカル通知・再起動timerを無効にする。
パッケージの18時台の自動更新はこのplaybookで継続する。

APTパッケージは毎日18:00〜18:15（サーバーのAsia/Tokyo時刻）に自動更新を開始する。
Ubuntuの標準セキュリティ更新に加え、通常の`-updates`と、設定済みのDocker、
Kubernetes、Azure CLI、HashiCorp、Googleのリポジトリも対象とする。
`-proposed`や`-backports`は自動更新の対象へ追加しない。

19:00に`/run/reboot-required`を確認し、必要な場合だけDiscordへ翌朝05:00の
再起動予定を通知する。送信成功後に予定を保存し、翌朝05:00に同じ起動セッションで
再起動が引き続き必要な場合だけ再起動する。
ログイン中のユーザーがいても再起動するため、実行中の開発作業は中断される。

更新が19:00を過ぎた場合は次の19:00の通知へ持ち越す。
通知に失敗した場合（最大3回試行）も自動再起動を許可せず、次の19:00に再試行する。
手動再起動した場合は古い通知を無効化する。停止中に逃した通知・再起動は後追い実行しない。
`unattended-upgrades`自体の自動再起動は無効にし、通知と連動したsystemd timerで実行する。
時刻と対象リポジトリは`group_vars/all.yml`で管理する。
OSのリリースアップグレード、およびAnsibleでバージョン固定した手動導入CLIは対象外。

自動更新設定だけを反映する場合も、Discord WebhookをBSMから取得するため
`bws`と`BWS_ACCESS_TOKEN`が必要。通知先はBSMの`REBOOT_NOTIFY_WEBHOOK`を使い、
シークレット名は`dev_reboot_webhook_secret`で指定する。
Webhookはroot専用ファイルに保存し、systemdの`LoadCredential`で通知処理へ渡す。
再起動予定は`/var/lib/dev-app-maintenance/reboot-plan.json`で管理する。

```bash
ansible-playbook maintenance.yml --check --diff
ansible-playbook maintenance.yml
```

確認には`systemctl list-timers 'apt-daily*' 'dev-app-reboot*'`、`apt-config dump`、
`sudo unattended-upgrade --dry-run --debug`を使う。
更新履歴は`/var/log/unattended-upgrades/unattended-upgrades.log`へ記録される。
通知結果は`journalctl -u dev-app-reboot-notify.service`、再起動判定は
`journalctl -u dev-app-reboot.service`で確認できる。

ガード処理のテストはリポジトリルートから実行する。

```bash
python3 -B -m unittest discover -s ansible/dev-application-server/tests -v
```

OCIの2プロファイルは既存の`OCI_*`、`PRD_OCI_*` BSM secretsを使う。
個人・セッション単位の認証キャッシュ（Azure、GitHub、Docker registry、
Cloudflare、Terraform）、kubeconfig、各プロジェクトの`.env`は再生成できないため
管理対象外。`talosconfig`もこのplaybookでは配布しない。

バージョン更新時は`group_vars/all.yml`のバージョンと公式release assetの
SHA-256を同時に更新する。
