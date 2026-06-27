# snmp-exporter

IX2215 ルーターを SNMP v2c で監視する。[prometheus-community/prometheus-snmp-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-snmp-exporter) Helm chart を ArgoCD で管理。

## 構成

| 項目 | 値 |
|------|-----|
| コミュニティ名 | `monitor` |
| SNMP バージョン | v2c |
| ポート | 9116 (ClusterIP) |
| モジュール名 | `ix2215` |
| 認証名 | `ix2215_v2` |

IX2215 側の SNMP 設定は `ansible/ix2215/group_vars/all.yml` の `snmp_community` / `snmp_allowed_host` で管理。

## MIB ライセンス表記

NEC enterprise MIB 由来のメトリクス名（`picoCelsius`, `picoFahrenheit`, `picoVoltage`, `picoSchedRtUtl*`, `picoHeapSize`, `picoHeapUtil` 等）は、NEC Corporation が公開する **PICO-SMI-MIB** から派生しています。

> © NEC Corporation 2001-2021. All rights reserved.  
> MIB ファイルは [NEC UNIVERGE IX サポートページ](https://jpn.nec.com/univerge/ix/Manual/MIB) にて公開されています。

MIB ファイル自体はライセンス順守のためリポジトリに含めていません（`.gitignore` で除外）。

---

## 収集メトリクス

### IF-MIB（標準インタフェース統計）

| メトリクス名 | OID | 説明 |
|-------------|-----|------|
| `sysUpTime` | 1.3.6.1.2.1.1.3.0 | 起動時間 (1/100 秒単位) |
| `ifOperStatus` | 1.3.6.1.2.1.2.2.1.8 | インタフェース状態 (1=up, 2=down) |
| `ifInOctets` | 1.3.6.1.2.1.2.2.1.10 | 受信オクテット数 (32-bit counter) |
| `ifOutOctets` | 1.3.6.1.2.1.2.2.1.16 | 送信オクテット数 (32-bit counter) |
| `ifInErrors` | 1.3.6.1.2.1.2.2.1.14 | 受信エラーパケット数 |
| `ifOutErrors` | 1.3.6.1.2.1.2.2.1.20 | 送信エラーパケット数 |
| `ifHCInOctets` | 1.3.6.1.2.1.31.1.1.1.6 | 受信オクテット数 (64-bit counter) |
| `ifHCOutOctets` | 1.3.6.1.2.1.31.1.1.1.10 | 送信オクテット数 (64-bit counter) |

`ifDescr` / `ifAlias` ラベルでインタフェース名を付与。

### NEC enterprise MIB — picoSched（CPU 使用率）

OID prefix: `1.3.6.1.4.1.119.2.3.84.2.5` (PICO-SMI-MIB)

| メトリクス名 | OID | 説明 |
|-------------|-----|------|
| `nec_ix_cpu_utilization_1sec` | ...2.5.1.0 | CPU 使用率 直近1秒 (%) |
| `nec_ix_cpu_utilization_5sec` | ...2.5.2.0 | CPU 使用率 直近5秒 (%) |
| `nec_ix_cpu_utilization_1min` | ...2.5.3.0 | CPU 使用率 直近1分 (%) |
| `nec_ix_cpu_utilization_1hour` | ...2.5.4.0 | CPU 使用率 直近1時間 (%) |

### NEC enterprise MIB — picoHeap（メモリ使用率）

OID prefix: `1.3.6.1.4.1.119.2.3.84.2.6` (PICO-SMI-MIB)

| メトリクス名 | OID | 説明 |
|-------------|-----|------|
| `nec_ix_memory_total_bytes` | ...2.6.1.0 | 総ヒープメモリ (bytes) |
| `nec_ix_memory_utilization` | ...2.6.2.0 | メモリ使用率 (%) |

### NEC enterprise MIB — 筐体温度（picoCelsius / picoFahrenheit）

OID prefix: `1.3.6.1.4.1.119.2.3.84.2.1` (PICO-SMI-MIB)

| メトリクス名 | OID | 説明 | 実測値例 |
|-------------|-----|------|---------|
| `picoCelsius` | ...2.1.1 | 筐体内温度 (℃) | 53 |
| `picoFahrenheit` | ...2.1.2 | 筐体内温度 (°F) | 127 |

### NEC enterprise MIB — 電源電圧（picoVoltage）

OID: `1.3.6.1.4.1.119.2.3.84.2.2` (PICO-SMI-MIB)

| メトリクス名 | OID | 説明 | 実測値例 |
|-------------|-----|------|---------|
| `picoVoltage` | ...2.2 | 電圧 (mV) | 3250 (= 3.25V) |

### IP-MIB（転送・廃棄統計）

| メトリクス名 | OID | 説明 |
|-------------|-----|------|
| `ip_in_receives` | 1.3.6.1.2.1.4.3.0 | 受信 IP パケット数 |
| `ip_forw_datagrams` | 1.3.6.1.2.1.4.6.0 | 転送 IP パケット数 |
| `ip_in_discards` | 1.3.6.1.2.1.4.8.0 | 受信廃棄パケット数 (リソース不足) |
| `ip_out_discards` | 1.3.6.1.2.1.4.11.0 | 送信廃棄パケット数 (リソース不足) |
| `ip_out_no_routes` | 1.3.6.1.2.1.4.12.0 | ルートなし廃棄パケット数 |

### TCP-MIB（コネクション統計）

| メトリクス名 | OID | 説明 |
|-------------|-----|------|
| `tcp_curr_estab` | 1.3.6.1.2.1.6.9.0 | 現在の ESTABLISHED コネクション数 |
| `tcp_retrans_segs` | 1.3.6.1.2.1.6.12.0 | TCP 再送セグメント数 |
| `tcp_attempt_fails` | 1.3.6.1.2.1.6.7.0 | TCP 接続試行失敗数 |
| `tcp_estab_resets` | 1.3.6.1.2.1.6.8.0 | 確立済みコネクションのリセット数 |

### IF-MIB（インタフェース廃棄）

| メトリクス名 | OID | 説明 |
|-------------|-----|------|
| `ifInDiscards` | 1.3.6.1.2.1.2.2.1.13 | 受信廃棄パケット数 (バッファ溢れ等) |
| `ifOutDiscards` | 1.3.6.1.2.1.2.2.1.19 | 送信廃棄パケット数 (バッファ溢れ等) |

### NEC enterprise MIB — picoNapt（NAPT セッション数 / MAP-E ポート枯渇監視）

MAP-E はユーザーごとに使用可能なポート範囲が限定される。セッション枯渇によって新規接続が失敗する前にアラートできるよう監視する。固定 IP 契約後もゲスト VLAN の MAP-E トンネルは継続するため監視継続が必要。

| メトリクス名 | OID | 説明 |
|-------------|-----|------|
| `nec_ix_napt_tcp_current_sessions` | ...3.1.2.1.1.0 | 現在の TCP NAPT セッション数 |
| `nec_ix_napt_udp_current_sessions` | ...3.1.3.1.1.0 | 現在の UDP NAPT セッション数 |
| `nec_ix_napt_tcp_create_failures` | ...3.1.2.1.14.0 | TCP NAPT 割り当て失敗数 (ポートプール枯渇) |
| `nec_ix_napt_udp_create_failures` | ...3.1.3.1.22.0 | UDP NAPT 割り当て失敗数 (ポートプール枯渇) |

> **注意**: NAPT failure カウンタの index は MIB ファイルなしでは確定不可。generator 実行後に要再確認。

---

## generator による config 再生成

### なぜ generator を使うか

手書き OID では NAPT failure counter など各 index の意味が MIB ファイルなしでは確定できない。  
NEC 公式 MIB ファイルを使って generator を回せばすべてのメトリクスが正式な名前で自動生成される。

### 手順

1. NEC サポートページから以下の MIB ファイルをダウンロードして `generator/mibs/` に配置（txtファイルなので、拡張子をmibにリネームすること）

   - `PICO-SMI-MIB.mib`
   - `PICO-SMI-ID-MIB.mib`
   - `PICO-IPSEC-FLOW-MONITOR-MIB.mib` (IPsec 監視する場合)

2. generator を実行

   ```bash
   cd k8s/pve/snmp-exporter/generator
   ./generate.sh
   ```

3. 生成された `generator/snmp.yml` の `ix2215` モジュール部分を `values.yaml` の `snmpConfig.modules.ix2215` に反映

### generator.yml の構成

`generator/generator.yml` は以下の subtree を walk する設定:
- IF-MIB / ifXTable
- IP-MIB / TCP-MIB
- picoUfs / picoRoute / picoSched / picoHeap / picoNapt (全 NEC enterprise MIB)

高 cardinality なテーブル (ipAddrTable, tcpConnTable 等) は `overrides` で除外済み。

---

## scrape endpoint

IX2215 は `/snmp?target=192.168.0.254&module=ix2215&auth=ix2215_v2` で scrape する。
scrape 設定自体はこのディレクトリでは管理しない。

## 動作確認

```bash
# port-forward
kubectl -n monitoring port-forward svc/snmp-exporter-prometheus-snmp-exporter 9116:9116

# メトリクス取得テスト
curl 'localhost:9116/snmp?target=192.168.0.254&module=ix2215&auth=ix2215_v2' | grep nec_ix

# 再起動（values 変更後）
kubectl -n monitoring rollout restart deployment snmp-exporter-prometheus-snmp-exporter
```

## 推奨 Grafana ダッシュボード

| ダッシュボード | ID |
|---|---|
| SNMP Interface Stats | 11169 |
