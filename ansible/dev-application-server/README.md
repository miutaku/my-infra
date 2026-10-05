# Development application server

`dev-app-server` (`192.168.20.101`) のホスト構成を管理するAnsible playbook。

現在は、home-k8sと同じ固定バージョンの`talosctl`をSHA-256検証付きで
`/usr/local/bin/talosctl`へインストールする。クラスタ管理資格情報を含む
`talosconfig`は配布しない。

```bash
cd ansible/dev-application-server
ansible-playbook site.yml --check --diff
ansible-playbook site.yml
```

バージョン更新時は`group_vars/all.yml`の`talosctl_version`と、公式release assetの
architecture別SHA-256を同時に更新する。
