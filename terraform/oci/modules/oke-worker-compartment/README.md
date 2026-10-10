# OKE worker compartment module

STG/PRD共通のworker専用compartment、private subnet、DHCP、route table、security list、base/burst poolとAutoscaler IAMを管理する。既存cluster/VCN/NAT/Service Gatewayを維持する。

base poolは親worker compartment、burst poolはその配下の専用子compartmentに配置する。子compartmentにはburst pool以外のpoolや下位compartmentを追加しない。sizeはignore_changesで保持する。通常はbase 1台、burst 0〜1台（各2 OCPU/12 GB/boot 50 GB）。

Dynamic Groupはoke.autoscaler=clusterタグ付きの親worker/子burst compartmentのinstanceだけ。UpdateNodePool/DeleteNodeはburst子compartmentだけに許可し、pool作成・削除とbase pool更新は許可しない。補助Compute/VNIC/subnet権限はworker compartment内（子を含む）。rootにはVM操作を付与せず、共有VCN/NAT/Service Gatewayの指定された読み取りAPIだけを許可する。IAM権限は加算なので、移行後は旧root workerのDynamic Group/policyも明示的に撤去する。

VCNのDNSドメインを入力し、DHCPもworker compartment内に作る。CCMが管理するNodePort/healthCheckルールとOCI標準Oracle-Tags.CreatedBy/CreatedOnはTerraformが除去しない。
