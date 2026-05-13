# UniFi OS Server VM

Proxmox 上に専用 VM として UniFi OS Server を構築するための Ansible playbook です。

Kubernetes 上の UniFi OS Server が不安定だったため、移行先として VM 版を用意します。  
移行が完了するまでは、既存の k8s 版 UniFi OS Server は削除しません。

## 構成

| 項目 | 値 |
|---|---|
| VM 名 | `unifi-os-01-server-ubuntu-26-04-home-amd64` |
| IP アドレス | `192.168.0.132` |
| ネットワーク | native VLAN / `192.168.0.0/24` |
| MAC アドレス | `BC:24:11:10:20:01` |
| Web UI | `https://192.168.0.132:11443` |
| 内部 DNS | `unifi-vm.miutaku.internal` |

VM 自体は `terraform/pve` で作成します。  
この playbook は、VM 作成後に UniFi OS Server の前提パッケージを入れ、必要に応じて公式 installer を配置・実行します。

## 前提

- `terraform/pve` で VM が作成済みであること
- `ansible/ix2215` で DHCP 静的リースが反映済みであること
- VM が `192.168.0.132` で SSH 可能であること
- UniFi OS Server Linux x64 installer をダウンロードできること

UniFi OS Server の Linux 版は Podman を利用します。  
この playbook では以下を準備します。

- `podman`
- `slirp4netns`
- `uidmap`
- `fuse-overlayfs`
- `iptables`
- `macvlan` kernel module
- UOS 向け sysctl 設定

## 初回セットアップ

依存 collection を入れます。

```bash
cd ansible/uos
ansible-galaxy collection install -r requirements.yml
```

VM を準備し、installer を VM にコピーします。

```bash
pipenv run ansible-playbook site.yml
```

デフォルトでは以下の URL から installer を取得します。

```text
https://fw-download.ubnt.com/data/unifi-os-server/1856-linux-x64-5.0.6-33f4990f-6c68-4e72-9d9c-477496c22450.6-x64
```

手元に installer を置いて使う場合は、`uos_installer_src` を指定してください。

## installer の実行

installer 実行は明示的に `uos_run_installer=true` を指定した場合だけ行います。
実行時は `--non-interactive --force-install --web-port 11443` を付けて起動します。

```bash
pipenv run ansible-playbook site.yml \
  -e uos_run_installer=true
```

実行後は以下にアクセスします。

```text
https://192.168.0.132:11443
```

Terraform にて Cloudflare ZeroTrust の構成ができたら、以下でアクセスできるか確認します。

```text
https://unifi.miutaku.work
```


## 変数

| 変数 | デフォルト | 説明 |
|---|---|---|
| `uos_installer_src` | `""` | control host 上の installer パス |
| `uos_installer_url` | UniFi OS Server 5.0.6 Linux x64 installer URL | installer のダウンロード URL |
| `uos_installer_dest` | `/opt/uosserver/uos-server-installer` | VM 上の installer 配置先 |
| `uos_run_installer` | `false` | `true` の場合だけ installer を実行 |
| `uos_install_marker` | `/opt/uosserver/.installer-ran` | installer 再実行防止 marker |
| `uos_web_port` | `11443` | UniFi OS Server の Web UI port |
| `uos_installer_args` | 非対話 installer 引数 | installer に渡す引数 |
