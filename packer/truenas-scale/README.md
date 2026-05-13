# TrueNAS Scale Packer Template

Proxmox テンプレートを Packer で自動構築します。TrueNAS Scale 25.10.x の ncurses TUI インストーラを VNC 経由で自動操作します。

## 制約事項

- TrueNAS Scale はインストール直後に SSH が有効でないため `communicator = "none"` です。
- インストールの自動化は `boot_command` によるキーシーケンス送信のみです（cloud-init 非対応）。
- ビルド中は Proxmox の VNC コンソールで進行状況を確認できます。

## 事前準備

### 1. ISO の配置

TrueNAS Scale の ISO を **pve-x570 の local ストレージ** にアップロードします。

```
配置先: pve-x570 → local → ISO Images
ファイル名: TrueNAS-SCALE-25.10.3.iso
Proxmox パス: local:iso/TrueNAS-SCALE-25.10.3.iso
```

Proxmox Web UI → pve-x570 → local → ISO Images → Upload からアップロードするか、
直接 SCP で転送します:

```bash
scp TrueNAS-SCALE-25.10.3.iso root@192.168.0.115:/var/lib/vz/template/iso/
```

ISO は [TrueNAS 公式](https://www.truenas.com/download-truenas-scale/) からダウンロードしてください。

### 2. Proxmox API トークンの作成

Ubuntu テンプレートと同じトークンを共有できます（権限が同一のため）。
詳細は `packer/ubuntu-26-04/README.md` の「Proxmox API トークンの作成」を参照。

### 3. UEFI / OVMF について

このテンプレートは BIOS を `ovmf` (UEFI) に設定します。
Proxmox の `local-lvm` ストレージに EFI ディスク (4MB) を作成します。
TrueNAS Scale インストーラがデフォルトで UEFI ブートを選択します。

## 実行方法

```bash
cd packer/truenas-scale

# 初期化 (初回のみ)
packer init .

# ビルド
packer build \
  -var "proxmox_token_id=packer@pve!packer" \
  -var "proxmox_token_secret=<トークンシークレット>" \
  -var "admin_password=<TrueNAS adminパスワード>" \
  .
```

環境変数で渡す場合（推奨）:

```bash
export PKR_VAR_proxmox_token_secret="xxxxx"
export PKR_VAR_admin_password="yourpassword"

packer build \
  -var "proxmox_token_id=packer@pve!packer" \
  .
```

## ビルド所要時間

| フェーズ | 目安 |
|---------|------|
| GRUB 起動待機 | 1分30秒 |
| インストーラ読み込み | 10秒 |
| インストール実行 | 10分 |
| 再起動後の起動待機 | 3分 |
| **合計** | **約15分** |

ハードウェアの速度により前後します。タイムアウトが発生する場合は
`truenas-scale.pkr.hcl` の `boot_command` 内の `<wait>` 値を調整してください。

## ビルド内容

| 項目 | 内容 |
|------|------|
| OS | TrueNAS Scale 25.10.x |
| アーキテクチャ | amd64 |
| インストーラ | ncurses TUI (boot_command 自動化) |
| BIOS | UEFI (ovmf) |
| EFI ディスク | 4MB, local-lvm |
| OS ディスク | virtio, 24G, local-lvm |
| ネットワーク | virtio, vmbr0 |
| 管理ユーザー | admin (TrueNAS Scale 24.x+ の新形式) |
| communicator | none (SSH なし) |

## boot_command の流れ

```
<enter><wait1m30s>          # GRUB でそのまま Enter → インストーラ起動待機
<enter><wait10s>            # メインメニュー: "1 Install/Upgrade" (選択済み) を Enter
" "<tab><enter><wait5s>     # ディスク選択: Space で最初のディスクを選択 → Tab → Enter
<tab><enter><wait5s>        # ディスク消去確認: Tab で "Yes" → Enter
<password><tab>             # admin パスワード入力 (1回目)
<password><tab><enter>      # admin パスワード入力 (2回目) → Enter
<enter><wait5s>             # ブート方式: UEFI (デフォルト) を Enter で確定
<wait10m>                   # インストール完了待機
<enter><wait3m>             # 再起動
```

## テンプレート利用上の注意

このテンプレートから VM をクローンした後:

1. Proxmox Web UI → VM → Cloud-Init タブは**使用不可**（TrueNAS は cloud-init 非対応）
2. 初回起動後、TrueNAS Web UI (`http://<IP>:80`) にアクセスして設定を行う
3. IP アドレスは DHCP で取得されます（コンソールで確認可能）
4. Terraform で管理する場合は `truenas` プロバイダを使用

## CI / GitHub Actions

`packer/**` 以下に変更が入ると `.github/workflows/packer.yml` が自動実行される。

| ジョブ | トリガー | 内容 |
|---|---|---|
| `validate` | push / PR | `packer validate` で HCL 構文チェック (ダミー変数使用、実ビルドなし) |

**実際の `packer build` は GitHub Actions からは実行できない。**  
Proxmox は宅内ネットワーク (`192.168.0.x`) にあり GitHub-hosted runner から到達不可のため、
ビルドは手元の端末から上記「実行方法」コマンドで行う。

## 変数一覧

| 変数 | デフォルト | 必須 | 説明 |
|------|-----------|------|------|
| `proxmox_url` | `https://192.168.0.115:8006/api2/json` | | Proxmox API URL |
| `proxmox_token_id` | | ✓ | API トークン ID |
| `proxmox_token_secret` | | ✓ | API トークンシークレット |
| `proxmox_node` | `pve-x570` | | ビルドを実行する Proxmox ノード |
| `proxmox_storage_pool` | `local-lvm` | | ディスク・EFI 用ストレージプール |
| `iso_file` | `local:iso/TrueNAS-SCALE-25.10.3.iso` | | Proxmox 上の ISO パス |
| `template_name` | `template-nas-truenas-scale-home-amd64` | | 作成するテンプレート名 |
| `vmid` | `9002` | | ビルド VM の VMID |
| `cpu_cores` | `4` | | CPU コア数 |
| `memory` | `8192` | | RAM (MB) |
| `disk_size` | `24G` | | OS ディスクサイズ |
| `admin_password` | | ✓ | TrueNAS admin アカウントのパスワード |
