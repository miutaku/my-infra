# TinyTuya exporter

Tuya 16AスマートプラグをLAN経由で15秒ごとに読み、Prometheus形式で公開する。
vmagentがこのServiceをscrapeし、既存のVictoriaMetricsへremote_writeする。

前提:

- Tuya 16AはSmart Lifeアプリへ登録済みである
- スマートプラグには固定IP `192.168.40.232` を割り当てる
- PodネットワークからスマートプラグのTCP 6668へ到達できるようにする

## Device IDとLocal Keyの取得

### 1. TinyTuyaを一時環境へインストール

```sh
python3 -m venv /tmp/tinytuya-venv
/tmp/tinytuya-venv/bin/pip install tinytuya
```

### 2. LAN APIの疎通確認

```sh
nc -vz -w 3 192.168.40.232 6668
ip neigh show 192.168.40.232
```

TCP 6668への接続が成功すれば、UDP scanで発見できなくても次へ進める。
`python -m tinytuya scan`はUDP 6666、6667、7000の広告に依存するため、
端末が広告を送信しない場合は同一セグメント上でも0台になる。

### 3. Tuya IoT PlatformとSmart Lifeを連携

1. [Tuya IoT Platform](https://iot.tuya.com/)でDeveloperアカウントを作成する。
2. `Cloud`からCloud Projectを作成し、利用地域に対応するData Centerを選択する。
3. Projectの`Devices`から`Link Tuya App Account`を開く。
4. 表示されたQRコードをSmart Lifeアプリで読み取り、Tuya 16AをProjectへ追加する。
5. `Service API`で`IoT Core`と`Authorization`を有効化する。
6. ProjectのOverviewからAccess ID、Access Secret、API Regionを確認する。

### 4. TinyTuya wizardを実行

```sh
cd ~
/tmp/tinytuya-venv/bin/python -m tinytuya wizard
```

wizardへAccess ID、Access Secret、API Region、対象のDevice IDを入力する。
完了すると`devices.json`へDevice ID、Local Key、プロトコル版が保存される。
対象機器を秘密値なしで一覧表示するには次を実行する。

```sh
python3 -c '
import json
for d in json.load(open("devices.json")):
    print({"name": d.get("name"), "id": d.get("id"),
           "ip": d.get("ip"), "version": d.get("version")})
'
```

`devices.json`と`tuya-raw.json`には秘密情報が含まれるため、Gitへ追加しない。
Smart Lifeで端末を削除・再登録するとLocal Keyが変わるので、wizardを再実行する。

### 5. 固定IPへ直接問い合わせる

Smart Lifeアプリを終了してから、wizardで得た値を指定する。

```sh
/tmp/tinytuya-venv/bin/python -m tinytuya get \
  --id 'DEVICE_ID' \
  --key 'LOCAL_KEY' \
  --ip 192.168.40.232 \
  --version 3.3
```

`Err 914`ならLocal Keyまたはプロトコル版が一致していない。
wizardの結果に従い、必要なら`--version 3.4`または`--version 3.5`を試す。
成功時は、例えば次のDPSが返る。

```json
{"dps":{"1":true,"18":142,"19":81,"20":998}}
```

- `1`: リレー状態
- `18`: 電流（mA）
- `19`: 有効電力（0.1 W）
- `20`: 電圧（0.1 V）

## BSMとExternal Secretsの設定

Device IDとLocal KeyはGitへ保存せず、Bitwarden Secrets Manager（BSM）へ登録する。
`BWS_ACCESS_TOKEN`に対象Projectへの書き込み権限を持つMachine Account Tokenを設定してから
次を実行する。`DEVICE_ID`と`LOCAL_KEY`は実際の値へ置き換える。

```sh
export BWS_ACCESS_TOKEN='<machine-account-access-token>'
bws secret create TINYTUYA_TUYA16A_DEVICE_ID 'DEVICE_ID'
bws secret create TINYTUYA_TUYA16A_LOCAL_KEY 'LOCAL_KEY'
```

値をコマンド履歴へ残したくない場合は、先頭に空白を付けて実行する設定
（`HISTCONTROL=ignorespace`）を利用するか、BSMのWeb UIから同名のSecretを作成する。

`secret.yaml`の`ExternalSecret`がBSMの次の名前を参照し、Kubernetes Secret
`monitoring/tinytuya-device`を生成する。

- `TINYTUYA_TUYA16A_DEVICE_ID` → `device-id`
- `TINYTUYA_TUYA16A_LOCAL_KEY` → `local-key`

IPアドレス`192.168.40.232`は秘密情報ではないため、Deploymentの
`TUYA_DEVICE_IP`へ直接設定する。

Argo CD同期後の状態確認:

```sh
kubectl -n monitoring get externalsecret tinytuya-device
kubectl -n monitoring describe externalsecret tinytuya-device
kubectl -n monitoring get secret tinytuya-device
```

Secret値そのものは表示しない。`SecretSynced=True`になり、Kubernetes Secretが
生成されれば同期成功である。BSMの値を更新した場合は最大24時間で反映される。
即時反映が必要ならExternalSecretを再同期するか、Podを再起動後に確認する。

wizardで確認したプロトコル版が3.3以外なら、`deployment.yaml`の
`TUYA_VERSION`も同じ値へ変更する。

## DPSとメトリクス

既定のDPSは記事と同じ `18=current (mA)`、`19=power (0.1 W)`、
`20=voltage (0.1 V)`。機種のDPSが異なる場合はDeploymentに
`TUYA_CURRENT_DPS`、`TUYA_POWER_DPS`、`TUYA_VOLTAGE_DPS`を追加する。
電力値の更新に `UPDATEDPS` が不要または問題になる機種では、
`TUYA_REQUEST_UPDATEDPS=false` を指定する。

公開する主要メトリクスは次のとおり。

- `tuya_current_amperes`
- `tuya_power_watts`
- `tuya_voltage_volts`
- `tuya_apparent_power_volt_amperes`
- `tuya_switch_on`
- `tuya_up`
- `tuya_last_success_timestamp_seconds`
