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

OCIの2プロファイルは既存の`OCI_*`、`PRD_OCI_*` BSM secretsを使う。
個人・セッション単位の認証キャッシュ（Azure、GitHub、Docker registry、
Cloudflare、Terraform）、kubeconfig、各プロジェクトの`.env`は再生成できないため
管理対象外。`talosconfig`もこのplaybookでは配布しない。

バージョン更新時は`group_vars/all.yml`のバージョンと公式release assetの
SHA-256を同時に更新する。
