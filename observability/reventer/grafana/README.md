# Re:Venter の Grafana 管理

アラート、Discord 通知先、Grafana データソース接続は
[miutaku/reventer: infrastructure/grafana/monitoring](https://github.com/miutaku/reventer/tree/main/infrastructure/grafana/monitoring)
で管理する。my-infra の Grafana Terraform は自宅監視を管理する。

## 配置

- 各環境の OCI 監視 VM 2台: VictoriaMetrics、VictoriaLogs、読み取り専用 vmauth、PDC。
  [docker-compose.yaml](../docker-compose.yaml) と [RUNBOOK](../RUNBOOK.md) を参照。
- OKE: vmagent、Fluent Bit、Alloy、node-exporter、kube-state-metrics、SQL exporter。
- Grafana Cloud: ダッシュボード、アラート評価、重要メトリクス・critical ログの副保存。

Grafana の詳細クエリは環境別 PDC から VM 上のストレージを参照する。
