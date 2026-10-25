# Re:Venter の Grafana 管理境界

Re:Venter のアラート、Discord 通知先、Grafana 接続設定は
[miutaku/reventer: infrastructure/grafana/monitoring](https://github.com/miutaku/reventer/tree/main/infrastructure/grafana/monitoring)
で管理する。my-infra の Grafana Terraform は自宅監視だけを管理する。
Re:Venter のルールに my-infra の Discord contact point を指定しない。

## 実際の配置

- OCI の各環境の監視 VM 2台: VictoriaMetrics、VictoriaLogs、読み取り専用 vmauth、PDC。
  [docker-compose.yaml](../docker-compose.yaml) と [RUNBOOK](../RUNBOOK.md) を参照。
- OKE: vmagent、Fluent Bit、Alloy、node-exporter、kube-state-metrics、SQL exporter。
  収集・転送側であり、VictoriaMetrics / VictoriaLogs 本体の保存先ではない。
- Grafana Cloud: ダッシュボード、アラート評価、重要メトリクス・critical ログの副保存先。
  通常の詳細クエリは環境別 PDC から VM 上のストレージを参照する。

## 移管記録

my-infra から追加した Re:Venter 82ルールに自宅用通知先を指定したため、
誤通知を止めるために82ルールを一旦停止し、Re:Venter 管理へ移管する。
旧 Integration 124ルールは停止状態で残し、自宅282ルールは変更しない。

Terraform の `removed` ブロックは旧 `terraform_data.reventer_observability` を
state から除外するだけで、Grafana のルールや接続を削除しない。
PDC 502 の修復（環境別 network ID への接続先修正）は維持する。
今後 my-infra の CI が Re:Venter のルールを再有効化・再設定することはない。
