# OKE worker compartment module

STG/PRD共通のworker専用compartment、private subnet、DHCP、route table、security list、base/burst poolとAutoscaler IAMを管理する。既存cluster/VCN/NAT/Service Gatewayを入力として維持する。

初回poolは両方0台。稼働VMの追加と旧poolからの移行は別途行い、sizeはTerraformのignore_changesで維持する。base定常1台、burstはAutoscaler 0〜1台を想定。instance principalの対象は専用compartmentのoke.autoscaler=clusterタグ付きworker。Compute/VNIC/subnetの管理範囲は専用compartment内、pool UpdateNodePool/DeleteNodeはburstだけ。

VCNのDNSドメインを入力し、DHCP設定もworker compartment内に作る。NAT/Service Gatewayは既存VCNのものを参照する。OCIが自動付与するOracle-Tags.CreatedBy/CreatedOnはTerraformが除去しない。

既存のroot nodepoolや旧Autoscaler IAMは、このmoduleを作成しただけでは撤去されない。移行成功後に明示的に撤去する。IAM権限は加算なので旧主体の広いgrantを残した状態を権限限定の完了とは扱わない。

2026-10-10時点：STGの新base作成とネットワークは成功。Instance PrincipalでnodeConfigDetailsを含むUpdateNodePoolは認可エラーが残っており、実スケールは未検証。既存workerの移行は認可・実スケール確認後に行う。


### 追加診断（2026-10-10）

- 承認済みshape参照＋共有VCN/NAT/SG参照＋Oracle-Tags使用の比較は2回とも400。全追加を現行9statementへ復元。
- 管理者の同一burst size0・不正ETagリクエストは412。新workerでは参照元image/subnet/VCN/DHCP/route/SLは取得可能、親clusterは404。
- 親cluster 1件のCLUSTER_READ単独・上記メタデータとの組み合わせでも400。いずれも全追加を復元。検証用Podは削除。
- STG既存2worker、PRD2workerともv1.36.4 Ready。STG新baseはReady/cordon、burst0。新CA切替・既存worker移行は未実施。
- PRD最新plan-only run-XC73thxZZbUsoS9Hは専用DHCPを含む新規11件だけ。既存資源変更・削除なし。実適用なし。
- 次の比較候補はプールID条件。新worker1台・固定最大5分・新worker compartment内UpdateNodePoolだけの一時検証をユーザーに確認中。承認前には実行しない。


### burst専用IAM境界（2026-10-10）

固定最大5分・新base worker 1台限定で、CLUSTER_NODE_POOL_UPDATE / UpdateNodePoolだけの一時statementを追加した。target.nodepool.id条件を外すと同じnodeConfigDetails.size=0・不正ETagリクエストは412 NoEtagMatchとなった。全追加は復元済み。内部認可の変数伝播そのものは未観測だが、プールID条件の有無による認可の差は確認できた。

恒久設計ではworker compartment配下にburst専用子compartmentを追加し、0台の新burst-v3プールだけを配置する。主権限はこの子compartmentのUpdateNodePool/DeleteNodeへ限定し、baseプールには与えない。プール作成・削除APIは許可しない。VM/VNICの補助権限は元のworker compartment内（子を含む）のままで、rootのVM操作権限を追加しない。今後もこの子compartmentには別プールや下位compartmentを追加しないこと。

既存base-v2と0台のburst-v2は準備時に維持する。旧burst-v2はreadのみとなり、移行成功後に別planで撤去する。Dynamic Groupはokeタグがある親worker compartmentとburst子compartmentのinstanceだけを対象にする。node_pool_ids出力のburstは新v3を指す。

STG run-kwqu3YD74UHikQAZのplanはcompartment/pool各1追加、DG/policy各1更新。新pool size0、既存worker/network/LB等は全てno-op。まだ実スケール/DeleteNodeの成功は証明していない。
