# DisplayLink Kiosk

Proxmox VE上のUbuntu VMを、DisplayLink USBアダプターから任意のWebページを表示する
Firefox Kiosk端末として構成するplaybookです。表示するWebアプリケーション自体は構築しません。

## 管理範囲

| 層 | 管理内容 |
|---|---|
| Terraform (`terraform/pve`) | VM、CPU/メモリ、VLAN 40、DisplayLink USB mapping、VGA無効化 |
| Ansible (このディレクトリ) | Ubuntu GUI、DisplayLink/EVDI、X11、GDM自動ログイン、GNOME Kiosk、省電力無効化 |

VMの既定値は次の通りです。

| 項目 | 値 |
|---|---|
| VM名 | `smart-display-01-ubuntu-26-04-home-amd64` |
| IP | `192.168.40.110` (DHCP静的リース) |
| MAC | `52:54:00:99:00:01` |
| Proxmox node | `pve-b550m` |
| USB mapping | `displaylink` |
| VLAN | 40 |

## 事前準備

Proxmoxの `Datacenter` → `Resource Mappings` → `USB Devices` に
`displaylink` というmappingを作成し、`pve-b550m` に接続したDisplayLinkデバイスを登録します。
ベースとなる `template-ubuntu-26-04-home-amd64` には、SSH接続可能な `miutaku` ユーザーが
必要です。

BSMに次のSecretを登録し、実行環境へ `BWS_ACCESS_TOKEN` を設定してください。

| Secret名 | 内容 |
|---|---|
| `KIOSK_USER` | 作成してKioskセッションへ自動ログインするUbuntuユーザー名 |
| `KIOSK_URL` | Firefoxで全画面表示するURL |

Secret IDは [group_vars/all.yml](group_vars/all.yml) で管理します。Secret値はリポジトリ内へ
保存せず、playbookの `pre_tasks` がAnsible制御ホスト上で `bws secret get <ID>` を実行して
取得します。`KIOSK_USER` がVMに存在しない場合は、同名グループとホームディレクトリを含めて
playbookがパスワードなしの非sudoユーザーとして作成します。既存ユーザーのパスワードは変更しません。

## Tuya照度センサー連動

照度センサーをTinyTuyaで15秒ごとに取得し、暗くなったらMutterのDisplayLink出力をDPMS off、明るくなったらonへ戻せます。
DisplayLinkが唯一の画面であるため、論理モニターを削除するのではなくMutterの`PowerSaveMode`を使います。初期値では無効です。

まずTinyTuya wizardを再実行し、新しいセンサーのDevice ID、Local Key、IP、protocol versionを確認します。
```bash
/tmp/tinytuya-venv/bin/python -m tinytuya get \
  --id 'DEVICE_ID' --key 'LOCAL_KEY' --ip SENSOR_IP --version 3.3
```

返された`dps`から照度の数値が変化する番号を確認します。値が10倍などの整数なら`tuya_light_sensor_lux_scale`で実際のluxへ換算します。

[group_vars/all.yml](group_vars/all.yml)への設定は以下。

```yaml
bsm_tuya_light_sensor_device_id_id: "<BSM Secret ID>"
bsm_tuya_light_sensor_local_key_id: "<BSM Secret ID>"
tuya_light_sensor_enabled: true
tuya_light_sensor_ip: "192.168.40.x"
tuya_light_sensor_version: "3.3"
tuya_light_sensor_lux_dps: "1"
tuya_light_sensor_lux_scale: 1.0
tuya_light_sensor_display_off_below_lux: 20
tuya_light_sensor_display_on_above_lux: 30
```

20 lx以下が2回続くと画面を停止し、30 lx以上が2回続くと再開します。
20–30 lxでは現在状態を維持するため、閾値付近での頻繁な切り替えを防ぎます。
センサー通信が失敗した場合も画面状態は変更しません。

適用後の確認:
```bash
sudo -u KIOSK_USER XDG_RUNTIME_DIR=/run/user/$(id -u KIOSK_USER) \
  systemctl --user status tuya-light-display.service
sudo -u KIOSK_USER XDG_RUNTIME_DIR=/run/user/$(id -u KIOSK_USER) \
  journalctl --user -u tuya-light-display.service -f
```

## 適用

まずVMとDHCP静的リースを作成します。

```bash
cd terraform/pve
terraform init
terraform plan
terraform apply
```

Terraform applyにより `hosts/prd` も生成されます。VMがSSH可能になったらKiosk設定を適用します。

```bash
cd ansible/displaylink-kiosk
pipenv install
pipenv run ansible-galaxy collection install -r requirements.yml
export BWS_ACCESS_TOKEN=<machine_account_access_token>
pipenv run ansible-playbook site.yml
```

チェックモードで確認する場合は次のように実行します。BSM取得タスクはチェックモードでも実行されます。

```bash
pipenv run ansible-playbook site.yml --check --diff
```

DisplayLinkドライバーを初めて導入した場合は、playbookの最後にVMを再起動します。
再起動後、GDMが `gnome-kiosk-script-x11` セッションへ自動ログインし、Firefoxが
`kiosk_url` を全画面表示します。

## 確認

VMへSSH接続し、次を確認します。`xrandr` はログイン済みのKioskセッション内で実行してください。

```bash
systemctl status displaylink-driver.service
lsmod | grep evdi
sudo /usr/local/src/displaylink-debian/displaylink-debian.sh --debug
xrandr --listproviders
```

DisplayLink側に映像が出ない場合は、ProxmoxのUSB mapping、`evdi` のロード、
`/etc/X11/xorg.conf.d/20-displaylink.conf` の順に確認します。一時的に仮想KVMを使う場合は、
Terraformの `kvm_vga_type` を `std` に戻して調査してください。
