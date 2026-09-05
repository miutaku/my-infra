# Hardware PoC baseline and rollback

2026-08-30にProxmoxからread-only取得したbaseline。これは手順書であり、記載コマンドはHardware
PoCの作業枠まで実行しない。実施直前にも`qm config`とTNLAStation APIを再確認する。

## 現在の割当

| device | Proxmox mapping | 物理位置 | Blue VM | config |
|---|---|---|---:|---|
| Earthsoft PT3 | `earthsoft_pt3` | `pve-x570` / `0000:05:00.0` | 12900 | `hostpci0: mapping=earthsoft_pt3` |
| BLE receiver 1 | `loockit_bluetooth` | `pve-x570` / `0a12:0001` | 12001 | `usb0: mapping=loockit_bluetooth` |
| BLE receiver 2 | `loockit_bluetooth` | `pve-b550m` / `0a12:0001` | 12002 | `usb0: mapping=loockit_bluetooth` |

PT3は1枚だけ、BLE receiverは各Proxmox nodeの1個ずつが両方Blueへ割当済みで、予備はない。
同じmappingをBlueとGreenへ同時割当しない。

## PT3試験の開始条件

- TNLAStationの録画中が0件で、試験開始からBlue復旧確認までの予約が0件。
- `app-mirakurun/mirakurun-data`をcluster外へ退避し、checksumを記録済み。
- `qm config 12900`とGreen対象VMのconfigを保存済み。
- Green VMを停止した状態で割当変更し、PT3が一方のVMだけに存在することを確認する。
- Blueへ戻す時刻と担当者が同じ作業枠で確保されている。

## Blue原状復帰

Green VMを停止してPT3 mappingを外し、`pve-x570`で次のbaselineへ戻す。

```bash
qm set 12900 --hostpci0 mapping=earthsoft_pt3
qm config 12900 | grep '^hostpci0: mapping=earthsoft_pt3$'
qm start 12900
```

復帰後は次をすべて確認する。

1. RKE2のDVB workerが`Ready`。
2. Mirakurun Podが`Ready`で、`/dev/dvb`とtuner一覧を認識。
3. TNLAStationからstreamを開始・停止できる。
4. 次回予約が欠落しておらず、録画エラーが増えていない。
5. Green側にPT3 mappingがなく、退避したMirakurun dataのchecksumと保存先を作業記録へ記載。

Bluetoothは予備がないため、基本PoCでは触らない。専用作業枠を設ける場合も、VM 12001/12002の
`usb0: mapping=loockit_bluetooth`をそれぞれ同じnode上のBlue VMへ戻し、Loockit receiverの復旧を
確認するまで完了扱いにしない。
