# nut-exporter

NUT(UPS)のメトリクスを Prometheus 形式で公開する exporter
([druggeri/nut_exporter](https://github.com/DRuggeri/nut_exporter))。
UPS の構成自体は [`ansible/nut/`](../../../ansible/nut/) / [`docs/ups-shutdown.md`](../../../docs/ups-shutdown.md)。

## 仕組み

- upsd は各 Raspberry Pi で稼働(`ups-a@192.168.10.112` / `ups-b@192.168.10.113`)。
- NUT の変数 read は**匿名で可**なので、exporter は 1 インスタンスで両 Pi を担当。
  接続先は scrape 側のクエリパラメータ `?server=<Pi IP>&ups=<name>` で切り替える。

```
scraper --(/ups_metrics?server=192.168.10.112&ups=ups-a)--> nut-exporter --3493--> upsd@Pi
```

## 主なメトリクス(`network_ups_tools_*`、ラベル `ups`, `instance`, `job="nut"`)

| メトリクス | 意味 |
|---|---|
| `network_ups_tools_ups_load` | 負荷率 (%) |
| `network_ups_tools_ups_realpower_nominal` | 定格実電力 (W, RS 550S=330) |
| `network_ups_tools_battery_charge` | バッテリ残量 (%) |
| `network_ups_tools_battery_runtime` | 推定ランタイム (秒) |
| `network_ups_tools_battery_voltage` | バッテリ電圧 (V) |
| `network_ups_tools_input_voltage` | 入力電圧 (V) |
| `network_ups_tools_ups_status` | 状態 (OL/OB/LB 等を value で表現) |

## 消費電力(推定 W)の PromQL

RS 550S は 消費電力 (W) を直接出さないので、負荷率 × 定格で推定する:

```promql
# UPS ごとの推定消費電力 (W)
network_ups_tools_ups_load / 100 * network_ups_tools_ups_realpower_nominal

# 例: UPS A のみ
network_ups_tools_ups_load{instance="ups-a"} / 100
  * network_ups_tools_ups_realpower_nominal{instance="ups-a"}
```

> 注意: `ups.load` はバッテリーバックアップ側出力のみの計測。サージのみ(非バックアップ)
> 出力にぶら下がる機器は含まれない。UPS B の AC 入力は UPS A のサージのみ口にあるため、
> UPS B 配下の負荷も UPS A の `ups.load` には含まれない。詳細は `docs/ups-shutdown.md`。

## メモ

- exporter 自身のメトリクスは `/metrics`、UPS メトリクスは `/ups_metrics`。
- 既定の `--nut.vars_enable` には `ups.realpower.nominal` / `battery.runtime` が
  含まれず推定 W を計算できないため、Deployment の args で公開変数を明示している
  (このフラグは既定リストを**置き換える**ので、必要な変数は全て列挙する)。
  追加したい変数があれば `deployment.yaml` の `--nut.vars_enable` に足す。
