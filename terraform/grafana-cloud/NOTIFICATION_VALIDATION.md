# 通知改善の検証結果

検証日: 2026-10-18（Asia/Tokyo）。本番Apply・設定APIのPUT・実通知送信は未実施。
コード変更とread-only Plan、合成データのtemplate previewまでを実施した。

## 変更ファイル

| ファイル | 変更 |
| --- | --- |
| `notifications.tf` | 共通message template、既存UIDへの書式更新を実行するterraform_data |
| `templates/notifications.tmpl` | 個別状態・重要度・環境・対象・説明・リンク・時刻、上限処理 |
| `variables.tf` | 既存integration UIDの入力と検証 |
| `environments.tfvars` | 実環境の公開UIDを固定 |
| `terraform.tfvars.example` | 新入力の例 |
| `modules/monitoring/main.tf` | 欠測説明・display_target、INFO/WARNINGのwarn routing fallback |
| `modules/monitoring/variables.tf` | 任意display_targetのスキーマ |
| `rules.json` | 165件中119件のdescriptionを具体化。残り46件の既存説明は維持 |
| `tests/monitoring.tftest.hcl` | 通知スキーマと共通template参照のmock検証 |
| `../../scripts/grafana-monitoring.py` | 秘密値を除く通知先UID/type inventory、レビュー用Plan保存 |
| `../../scripts/grafana-notifications.py` | read-only既定の既存UID限定更新・実engineプレビュー |
| `../../scripts/test-grafana-notifications.py` | 更新安全性・全ルールと各表示パターンの実engineテスト |
| `../../scripts/check-grafana-notification-plan.py` | Planから評価式・UID・Labels・routing不変を機械照合 |
| `../../.github/workflows/grafana_monitoring.yml` | 通知変更をCI対象へ追加、安全性テスト追加 |
| `README.md` | 書式、schema、追加方法、適用、テスト、rollback、制約 |
| `ALERT_INVENTORY.md` | 281ルールの監視対象・内容・severity・通知経路の台帳 |
| `NOTIFICATION_VALIDATION.md` | 本検証結果 |

## 実施結果

| 検証 | 結果 |
| --- | --- |
| terraform fmt -check -recursive | 成功 |
| terraform validate | 成功。lockのGrafana Provider 4.46.0を使用 |
| terraform test | 9 passed、0 failed。本番APIはmock |
| 通知更新の安全性 | 5 passed。既定GETのみ、同UIDのPUT、全設定保持、冪等性、誤ったidentity/復旧無効/secret redaction拒否 |
| 実Grafana template preview API | 303ケース成功。全281ルール単独+22の表示パターン。通知送信APIは未使用 |
| 表示パターン | CRITICAL/WARN/WARNING/INFO、RESOLVED、複数、混在、疎なLabels、管理Labels過多、instance/job fallback、tuner、Annotationsなし、summary fallback、No Data/Errorの発生・解消、長文、最大長URL、大量発生、critical優先 |
| Discord制限 | 全ケースで本文<=2,000文字・title<=256文字。上限時の表示数と省略警告を確認 |
| 既存PromQL / pending behavior | 281ルール構文、98挙動ケース、UPSのpending期間テスト成功 |
| Catalog差分 | description以外の全フィールドが変更前と一致 |
| Plan照合 | 281ルール全件のUID・式・継続時間・pause・NoData/Error状態・Labels・通知先・grouping・通知間隔が一致 |
| 実receiverのread-only検査 | warning/criticalとも既存name/UID/type一致、復旧有効、format_change=true、applied=false |
| Terragrunt | リポジトリに構成なし。Terraform rootで検証 |
| CI | ローカルで変更対象の検証を実施。push後のCIは別途結果確認 |

最大長URLのテストはGrafanaプレビューAPIが付加するquery parameterも考慮する。
Discordの実クライアント表示・クリック・配送・色の受信試験は、通知送信が未承認のため未実施。

## Terraform Plan

`python3 scripts/grafana-monitoring.py plan --var-file terraform/grafana-cloud/environments.tfvars`
で実環境をrefreshして作成。保存先はGit対象外の`.state/notifications.tfplan`。

```text
Plan: 3 to add, 6 to change, 0 to destroy.

create: grafana_message_template.monitoring
create: terraform_data.discord_format["warn"]
create: terraform_data.discord_format["critical"]
update: module.monitoring["home"].grafana_rule_group.monitoring
        availability / backups / capacity / kubernetes / observability / power
no-op: folder / dashboard
```

ルールグループ内の差分はAnnotationsのみ。116件の欠測説明から生のselectorを外し、display_targetで対象IDを示す。
Notification Policy、Contact Pointの削除・再作成、評価停止、rule UID変更は計画しない。
2つのterraform_dataは承認後のApplyで書式の同UID PUTを実行するためのローカルリソースで、新しい通知先ではない。

## Provider検証と適用前の確認事項

4.46.0のgrafana_contact_pointでは、Discord Setのtitle/message変更時にcomputed UIDがunknownになる。
隔離した一時Terraform stateと127.0.0.1の偽APIに対してのみApplyし、既存UIDのPUTではなくPOSTが呼ばれることを実測した。
このため、実環境でgrafana_contact_pointによる移管は実施せず、TerraformからUID限定スクリプトを呼ぶ。
この方式の設定保持・冪等性は偽APIで検証済み。本番PUTの権限・実配送は承認後の確認が必要。

適用前にREADMEの手順で再Planし、専用stateのバックアップ、サービスアカウントのexport secret/write権限、Python/bwsの実行環境を確認する。
本番への適用・受信試験は明示承認後のみ。適用時はGUI/他プロセスによる同時編集を避ける。

## 残る制約

- 2,000文字を超える大量の対象は1通に全詳細を表示できない。件数・省略表示・Grafanaリンクで補う。
- terraform_dataはGUIの書式driftをrefresh検出しない。READMEのread-only configureと承認後の-replaceで復元する。
- 管理外の旧124ルールとemail/OnCall、root policyは変更しない。別途移管する場合は管理主体と重複を調査する。
- NoData=OK、既存grouping/timingを維持する。データ消失は必須系列監視で検知し、PDC全断時のDatasourceErrorの件数削減は別変更とする。
- Annotationsのみの変更はGrafana公式仕様では評価状態resetの対象外。適用後に評価・受信書式を確認する。

通知の変更前後の例とrollbackは[README](README.md#共通通知の設計と運用)を参照。
