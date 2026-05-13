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
- UniFi OS Server Linux x64 installer を用意していること

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
ansible-playbook site.yml \
  -e uos_installer_src=/path/to/uos-server-installer
```

installer を URL から取得したい場合は、代わりに `uos_installer_url` を指定できます。

```bash
ansible-playbook site.yml \
  -e uos_installer_url=https://example.invalid/path/to/uos-server-installer
```

## installer の実行

installer 実行は明示的に `uos_run_installer=true` を指定した場合だけ行います。

```bash
ansible-playbook site.yml \
  -e uos_installer_src=/path/to/uos-server-installer \
  -e uos_run_installer=true
```

実行後は以下にアクセスします。

```text
https://192.168.0.132:11443
```


## 変数

| 変数 | デフォルト | 説明 |
|---|---|---|
| `uos_installer_src` | `""` | control host 上の installer パス |
| `uos_installer_url` | `""` | installer のダウンロード URL |
| `uos_installer_dest` | `/opt/uosserver/uos-server-installer` | VM 上の installer 配置先 |
| `uos_run_installer` | `false` | `true` の場合だけ installer を実行 |
| `uos_install_marker` | `/opt/uosserver/.installer-ran` | installer 再実行防止 marker |
