# packer/mm-server — MagicMirror² サーバー VM

> Legacy: MagicMirror² の通常運用は `k8s/pve/magic-mirror` に移行済み。
> ここは DisplayLink 接続の旧 `magic_mirror_server` VM を再作成する場合のロールバック用手順。

Proxmox 上に MagicMirror² 専用 VM を作成・セットアップする。

VM は `template-ubuntu-26-04-home-amd64` から clone し、cloud-init `runcmd` で  
初回起動時にすべてのセットアップを自動実行する。

## VM 仕様

| 項目 | 値 |
|---|---|
| ベーステンプレート | `template-ubuntu-26-04-home-amd64` |
| Proxmox ノード | `pve-b550m` |
| VMID | 5000 |
| VLAN | 40 (IoT / スマートホーム) |
| CPU | 1 コア |
| メモリ | 2 GB |
| ディスク | 32 GB |
| USB パススルー | `displaylink` (USB マッピング) |
| VGA | none (DisplayLink が唯一のディスプレイ) |

## cloud-init で行われること

`terraform/pve/templates/mm-server-user-data.tftpl` で定義されている。  
VM 初回起動時に以下を順番に実行し、最後に自動リブートする。

```text
1. ubuntu-desktop-minimal + git インストール
2. libreoffice / thunderbird の削除
3. DisplayLink ドライバー (AdnanHodzic/displaylink-debian) をheadlessインストール
4. Docker インストール (get.docker.com)
5. gnome-kiosk + gnome-kiosk-script-session インストール
6. dconf 設定反映 (スリープ・ロック無効化)
7. gnome-kiosk-script 配置 (firefox --kiosk localhost:8080)
8. magic-mirror リポジトリ clone & config.js 配置
9. magic-mirror.service 有効化 (docker compose up -d)
10. 再起動 (DisplayLink カーネルモジュールロードのため)
```

### write_files で配置されるファイル

| パス | 内容 |
|---|---|
| `/etc/X11/xorg.conf.d/20-displaylink.conf` | DisplayLink modesetting ドライバー設定 |
| `/usr/share/X11/xorg.conf.d/10-monitor.conf` | モニタースタンバイ・ブランク無効化 |
| `/etc/gdm3/custom.conf` | 自動ログイン (miutaku)、Wayland 無効 |
| `/etc/dconf/db/local.d/00-mm-dconf` | スリープ・スクリーンセーバー・ロック無効化 |
| `/etc/dconf/db/local.d/locks/00-mm-dconf` | dconf ロック (ユーザー変更不可) |
| `/var/lib/AccountsService/users/miutaku` | gnome-kiosk-script-x11 セッション指定 |
| `/etc/systemd/system/magic-mirror.service` | Docker Compose 起動 systemd サービス |

## デプロイ手順

`magic_mirror_server` VM の作成・再作成は `scripts/apply-pve.sh` で行う。  
cloud-init スニペット（API キー等のシークレットを含む）をローカルで生成・アップロードしてから  
`terraform apply` を実行するためである。

### 必要な BWS シークレット

| BWS キー | 用途 |
|---|---|
| `PACKER_PROXMOX_TOKEN_ID` | Proxmox API トークン ID |
| `PACKER_PROXMOX_TOKEN_SECRET` | Proxmox API トークン Secret |
| `MM_OW_API_KEY` | OpenWeatherMap API キー (天気モジュール) |
| `MM_CALENDAR_URL` | Google カレンダー iCal URL (カレンダーモジュール) |

### 実行

```bash
# プロジェクトルートから
BWS_ACCESS_TOKEN=<トークン> ./scripts/apply-pve.sh -target=module.magic_mirror_server
```

`apply-pve.sh` が行うこと:

1. BWS からシークレットを取得
2. `mm-server-user-data.tftpl` を `envsubst` でレンダリング
3. `curl` で pve-b550m の `local:snippets` にアップロード
4. `terraform apply -auto-approve -target=module.magic_mirror_server`

VM 作成後、cloud-init が完了するまで **15〜30 分程度**かかる（GUI パッケージのダウンロード含む）。  
PVE Web UI のコンソールで進捗を確認できる。

## トラブルシューティング

### cloud-init の進捗確認

```bash
# VM コンソール (または SSH) で実行
cloud-init status
journalctl -u cloud-final -f
sudo tail -f /var/log/cloud-init-output.log
```

### スニペットが pve-b550m に存在するか確認

PVE Web UI: `pve-b550m` → `local` → `Snippets` → `mm-server-user-data.yaml`

または API で確認:

```bash
curl -k -s \
  -H "Authorization: PVEAPIToken=<TOKEN_ID>=<TOKEN_SECRET>" \
  "https://192.168.0.119:8006/api2/json/nodes/pve-b550m/storage/local/content?content=snippets"
```

### DisplayLink が認識されない

再起動後も認識されない場合、カーネルモジュールのロードを確認する:

```bash
lsmod | grep evdi
dmesg | grep evdi
```

`evdi` モジュールが見つからない場合は DisplayLink ドライバーの再インストールが必要。
