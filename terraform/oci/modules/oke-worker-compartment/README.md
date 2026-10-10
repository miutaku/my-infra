# OKE worker compartment module

STG/PRD共通のworker専用compartment、private subnet、DHCP、route table、security list、base/burst poolとAutoscaler IAMを管理する。既存cluster/VCN/NAT/Service Gatewayを維持する。

base poolは親worker compartment、burst poolはその配下の専用子compartmentに配置する。子compartmentにはburst pool以外のpoolや下位compartmentを追加しない。初回は両poolとも0台で、VM追加と旧poolからの移行を段階的に実施する。sizeはignore_changesで保持する。通常はbase 1台、burst 0〜1台（各2 OCPU/12 GB/boot 50 GB）。

Dynamic Groupはoke.autoscaler=clusterタグ付きの親worker/子burst compartmentのinstanceだけ。UpdateNodePool/DeleteNodeはburst子compartmentだけに許可し、pool作成・削除とbase pool更新は許可しない。補助Compute/VNIC/subnet権限はworker compartment内（子を含む）。rootにはVM操作を付与せず、共有VCN/NAT/Service Gatewayの指定された読み取りAPIだけを許可する。IAM権限は加算なので、移行後は旧root workerのDynamic Group/policyも明示的に撤去する。

VCNのDNSドメインを入力し、DHCPもworker compartment内に作る。CCMが管理するNodePort/healthCheckルールとOCI標準Oracle-Tags.CreatedBy/CreatedOnはTerraformが除去しない。

## 認可・実動作の検証（2026-10-10）

固定最大5分・STG新worker 1台限定の比較で、target.nodepool.idを外したUpdateNodePoolは不正ETagに対して412 NoEtagMatchとなった。追加はすべて復元済み。内部のIAM変数伝播自体は未観測なので、条件依存の差として扱う。

恒久対応はID条件を広げず、burst専用子compartmentをIAM境界とする。STG/PRDとも実際のAutoscaler 0→1増設、Pod Ready、1→0縮小・DeleteNode成功、Compute/boot volumeのTERMINATEDを確認済み。baseの更新は拒否され、旧root poolと旧Autoscaler Dynamic Group/policyはworkerの退避とVM/boot削除確認後に撤去済み。shape参照・Oracle-Tags使用・親cluster読み取り等の診断追加は採用していない。

旧workerはPDBを遵守して1Podずつ退避し、代替Readyを確認する。vmagentの旧ディスクキューは新規収集なしの送信専用Podでpending_data_bytes=0（STG 4送信先、PRD 2送信先）を確認してから旧VMを削除する。PRDではGatewayの実Podの移設要求からも0→1の自動増設を確認済み。
