# OKE専用worker compartment：共通Terraform設計

2026-10-10。ユーザーは専用compartmentで権限を限定する設計方針を選択。移行作業中の一時的な無料枠超過を許容し、家との拠点間VPNは不要・撤去対象と明示。
このディレクトリは独立した下書きで、クラウド変更・既存Terraformへの組み込み・pushは行っていない。
`main.tf` / `variables.tf` はOCI provider 8.19.0で`terraform validate`成功、fmt確認済み。
`.tf.example`は親moduleへの組み込み例であり、直接適用するコードではない。実環境のTerraform planは未実施。

## 最終配置

| 項目 | STG・PRD共通 |
|---|---|
| クラスタ/API/LB/VCN/NAT | 既存リソースを維持。クラスタ再作成なし |
| worker compartment | root配下の`reventer-oke-workers` |
| workerネットワーク | 新private subnet、route table、security listをworker compartmentに配置 |
| subnet候補 | `10.0.2.0/24`。両環境の既存VCN subnetとは重複なし。VCN外のネットワーク等は別途確認 |
| ノードプール | base/burst、初回各0台、workerは各2 OCPU / 12 GB、boot 50 GB、aarch64 OKE 1.36.4 image |
| 定常時 | base 1台、burst Autoscaler 0〜1台。移行中の必要台数は別途制御 |
| ノードラベル | `reventer.io/capacity=base/burst` |
| Instance Principal主体 | 専用compartment内かつ`oke.autoscaler=cluster`のworker。baseにもタグを付与 |
| Autoscalerプール操作 | readは専用compartment、UpdateNodePool/DeleteNodeは新burstのみ |
| Compute/VNIC/subnet | 専用compartmentのみ。VM直接操作はこの範囲内で権限上可能 |
| root等の例外 | compartmentメタデータ参照、oke名前空間use、既存ネットワークGet APIのみ。必要性はSTGで検証 |
| 家との拠点間VPN | 両環境ともなし。STGの既存home VPNと関連ルートは撤去 |
| アプリへのアクセス | STGのCloudflare Accessを維持 |

IAMは加算方式なので、新しい限定policyだけ作っても既存の広いgrantが残れば限定は完成しない。
PRD既存DGはrootの監視VMも対象。移行後に既存Autoscaler policyとDGを削除/無効化し、他policyの付与も監査する。
新compartmentに監視VM・無関係なVMを入れない。
新DGの反映やInstance Principalの更新は即時とは限らない。新worker上での認可確認後に切替える。

## 調査で確定した不足

- STGには既存VCNのService Gatewayなし。PRDの既存Service Gatewayを基準にSTGに追加する。
- PRDには`oke`名前空間なし。STGと同じnamespace/tagをPRDに作る。STG側は既存Terraformリソースを再利用する。
- STGのprivate route tableにある`192.168.0.0/16`向けhome VPNルートは撤去対象。新worker subnetにはVPNルートを設けない。
  既存VPNのIPSec/CPE/DRG attachment/DRGと関連IaC・設定を洗い出し、用途外のVPNや他の接続を巻き込まないplanを用意する。家側の機器設定整理はmy-infraの責務として切り分ける。
- 現STG Autoscaler discoveryはroot＋旧タグを参照。PRDもrootを参照。移行後は双方とも新compartment＋`managed-by=terraform&environment=<env>&capacity=burst`、min0/max1へ変更する。
- 現STG live IAMは承認済み11statement、IaCは古い2statement。既存OCI Terraformの全体applyはlive grantを戻す恐れがある。
  移行時のplanでは既存policyを意図せず上書きしないことを確認し、必要なら承認済みlive statementを移行中定義として保全する。
- STGのmy-infra main pushは自動apply。親設定への組み込み前に、worker追加/縮小なしのplanと権限差分をレビューする。

## 段階ごとの完了条件

1. **準備plan**：新規compartment/network/DG/policy/0台poolのみ。既存cluster、既存pool、LB、NAT IPの置換/削除、既存policyの意図しない変更がない。
   STGのService Gateway追加を含む。タグ、subnet、placement、Computeの実配置、Terraform実行主体の権限を確認する。
2. **容量確認**：現在は各環境2台×2 OCPU/12 GB稼働。一時課金は許容済みなので、新旧ノードの並行稼働を優先する。追加A1とboot volumeの利用枠・料金・実際の空き容量を確認する。
   容量不足で旧ノード先行削除が必要な場合は、そのサービス影響と復旧手順を確定してから実行する。
3. **STG新base起動**：新VM上でInstance Principal、DG/tag、ネットワーク、OKE登録を確認。
   新poolを参照する不正ETag付きUpdateNodePoolで412となることを確認。400/404なら切替えない。
   リソースを変更しない検証ではDeleteNode/実スケールの成功は証明できない。
4. **STG実運用検証**：新CA discovery/配置へ変更し、Pending pod→新burst起動→Ready、不要時縮小を管理された負荷で確認。
   singleton Valkeyの再起動影響、LB疎通、DNS/NAT、監視、GitOpsを確認し、旧workerを1台ずつ移す。
5. **PRD**：STG成功後、同一定義を適用。移行前にPDB、Valkey replica同期/Sentinel定足数、master切替、HPA/Blue-Green必要容量を再確認。
   drainはevictionとPDBに従い、force/delete-emptydir等で回避しない。移行中はアプリ疎通を継続観測。
6. **撤去/同一化**：旧workerを空にしてから旧pool/IAM/discoveryと不要boot volumeを撤去。STGのhome VPNと関連ルートも専用planで撤去。全アカウント差分を再監査。
   全アカウント同一化（管理workload、VPN、legacy IAM等）は、このworker moduleだけでは完了しない。

## 復旧

- 初回0台作成の失敗では既存worker/CA/アプリを維持。追加リソースだけ是正する。
- 新worker検証が失敗したらcordonして新側への配置を止め、旧pool・旧CA構成を維持する。
- 移行中に旧workerが残っていれば、旧workerへ戻す。ただし旧VM削除後の再確保はA1空き容量に依存し、即時復旧を保証できない。
- pool/compartmentは下書きでprevent_destroyを付与。削除段階では台数0・workloadなしを確認して個別に外す。
- ignore_changesによりpool sizeはTerraformが戻さない。baseを1台へ増やす操作と定常時の監視は明示的に管理する。

## 検証上の限界

ローカルのschema validationはIAM条件の実際の認可やサービス疎通を証明しない。
専用compartment案のスケール認可はまだ未検証。補助権限のrequest.operation条件を外すだけで解決すると断定しない。
rootのGet API例外が十分かもSTGで確認する。追加が必要ならAPI/対象/用途を特定し、安易にroot管理権限を追加しない。

公式資料：
- https://docs.oracle.com/en-us/iaas/Content/Security/Reference/oke_security.htm
- https://docs.oracle.com/en-us/iaas/Content/Identity/policyreference/contengpolicyreference.htm
- https://docs.oracle.com/en-us/iaas/Content/ContEng/Concepts/contengpolicyconfig.htm

関連：`/tmp/oke-iam-authorization-investigation.md`、`/tmp/oke-worker-compartment-prerequisites.json`

## 無料枠・課金方針

- 移行中のみ一時的な無料枠超過をユーザーが許容。恒久的な有料構成を承認した意味ではない。
- 調査時のboot/block volume合計はSTG 200 GB、PRD 194 GB。新worker 50 GB追加時は200 GB枠を超える。移行後は不要な旧boot volumeも撤去し、各アカウント200 GB以下へ戻す。
- 定常時の新worker2台100 GB＋監視VM2台100 GBで合計200 GBとなる設計。別region、他compartmentの追加volume、backup数・性能設定も確認する。
- A1の最新公開条件はAlways Freeアカウント1,500 OCPU時間/9,000 GB時間、有料tenancyは3,000 OCPU時間/18,000 GB時間。現在の最大4 OCPU/24 GB設計を無料枠内とするには適用契約枠と月内使用量の確認が必要。移行月は一時稼働分で月次Compute無料枠を超える可能性もある。
- subscription APIの読み取りは両環境404で契約種別を確定できていない。移行後に恒久無料となることは未確認で、断定しない。
- 既存BASIC_CLUSTERを維持し、Service Gateway追加自体の料金はなし。

料金の公式資料：
- https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
- https://www.oracle.com/cloud/price-list/
- https://www.oracle.com/cloud/networking/service-gateway/
