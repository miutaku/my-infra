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

APTパッケージは毎日04:00〜04:15（サーバーのAsia/Tokyo時刻）に自動更新する。
Ubuntuの標準セキュリティ更新に加え、通常の`-updates`と、設定済みのDocker、
Kubernetes、Azure CLI、HashiCorp、Googleのリポジトリも対象とする。
`-proposed`や`-backports`は自動更新の対象へ追加しない。

更新後に`/var/run/reboot-required`がある場合だけ05:00に自動再起動する。
ログイン中のユーザーがいても再起動するため、実行中の開発作業は中断される。
更新が05:00を過ぎて完了した場合は、次の05:00が再起動時刻となる。
時刻と対象リポジトリは`group_vars/all.yml`で管理する。
OSのリリースアップグレード、およびAnsibleでバージョン固定した手動導入CLIは対象外。

自動更新設定だけを反映する場合は、BSMの資格情報なしで実行できる。

```bash
ansible-playbook maintenance.yml --check --diff
ansible-playbook maintenance.yml
```

確認には`systemctl list-timers 'apt-daily*'`、`apt-config dump`、
`sudo unattended-upgrade --dry-run --debug`を使う。
更新履歴は`/var/log/unattended-upgrades/unattended-upgrades.log`へ記録される。

OCIの2プロファイルは既存の`OCI_*`、`PRD_OCI_*` BSM secretsを使う。
個人・セッション単位の認証キャッシュ（Azure、GitHub、Docker registry、
Cloudflare、Terraform）、kubeconfig、各プロジェクトの`.env`は再生成できないため
管理対象外。`talosconfig`もこのplaybookでは配布しない。

バージョン更新時は`group_vars/all.yml`のバージョンと公式release assetの
SHA-256を同時に更新する。
