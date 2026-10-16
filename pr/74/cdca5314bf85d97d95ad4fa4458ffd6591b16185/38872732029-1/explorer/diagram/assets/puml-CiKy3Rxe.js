var e=e=>{switch(e){case`index`:return`@startuml
title "インフラ基盤の全体"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<User>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam person<<Operator>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<ExternalEdgeAccess>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalBws>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ExternalEdgeTunnel>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementRunner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesManagementArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHome>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<ConsumersReventer>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
person "==利用者" <<User>> as User
person "==管理者" <<Operator>> as Operator
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "Cloudflare" <<ExternalEdge>> as ExternalEdge {
    skinparam RectangleBorderColor<<ExternalEdge>> #A35829
    skinparam RectangleFontColor<<ExternalEdge>> #A35829
    skinparam RectangleBorderStyle<<ExternalEdge>> dashed

    rectangle "==Cloudflare Access / 共通の認証入口\\n\\n利用・管理の公開UIを原則Accessで保護。mTLS専用API、WARPのprivate CIDR routeとは区別する。" <<ExternalEdgeAccess>> as ExternalEdgeAccess
    rectangle "==Cloudflare Tunnel\\n\\n自宅基盤のcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
  }
  rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<ExternalBws>> as ExternalBws
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "保存・バックアップ" <<PremisesData>> as PremisesData {
    skinparam RectangleBorderColor<<PremisesData>> #737373
    skinparam RectangleFontColor<<PremisesData>> #737373
    skinparam RectangleBorderStyle<<PremisesData>> dashed

    database "==TrueNAS VM ×2 / ZFS・NFS\\n\\n自宅Proxmoxの各ホストに1台ずつ、VM69001・69002。USB diskをpassthrough。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<PremisesDataNas>> as PremisesDataNas
  }
  rectangle "自宅基盤の構成管理" <<PremisesManagement>> as PremisesManagement {
    skinparam RectangleBorderColor<<PremisesManagement>> #A35829
    skinparam RectangleFontColor<<PremisesManagement>> #A35829
    skinparam RectangleBorderStyle<<PremisesManagement>> dashed

    rectangle "==ARC / 共用のrunner制御基盤\\n\\n共用Controllerとmy-infra向け実行環境。Re:Venter専用scale setは利用側の境界へ分ける。" <<PremisesManagementRunner>> as PremisesManagementRunner
    rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<PremisesManagementArgo>> as PremisesManagementArgo
  }
  rectangle "==Talos / home-k8s\\n\\nTalos CP VM3台・worker VM2台とRPi worker2台で構成。アプリ・クラスタ基盤・監視・運用・DB/バックアップを用途別に表示し、Application全件は一覧へ対応付ける。Pod配置は動的。" <<PremisesHome>> as PremisesHome
}
rectangle "基盤の利用側 / 別リポジトリ" <<Consumers>> as Consumers {
  skinparam RectangleBorderColor<<Consumers>> #64748b
  skinparam RectangleFontColor<<Consumers>> #64748b
  skinparam RectangleBorderStyle<<Consumers>> dashed

  rectangle "==Re:Venter\\n\\n基盤を利用するワークロードの一つ。OCI/OKE・監視VM・GitOps/CI/Terraformによる変更経路・専用runner/agent・レビュー配信を含む専用構成はこの境界に集約。my-infraには共有基盤との接点と定義元の参照だけを残し、構成・通信の詳細はreventer側の図へ委ねる。" <<ConsumersReventer>> as ConsumersReventer
}

User .[#15803d,thickness=2].> ExternalEdgeAccess : <color:#15803d>HTTPS / 利用時の認証
Operator .[#6366f1,thickness=2].> ExternalEdgeAccess : <color:#6366f1>HTTPS / 管理時の認証
ExternalEdgeAccess .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>Access認証後の転送
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHome : <color:#15803d>Access認証後 / 公開UI・サービス
ExternalBws .[#AC4D39,thickness=2].> PremisesHome : <color:#AC4D39>Secret注入
ExternalEdgeTunnel .[#6366f1,thickness=2].> PremisesDataNas : <color:#6366f1>Access認証後 / NAS管理UI
PremisesDataNas .[#8D8D8D,thickness=2].> PremisesHome : <color:#8D8D8D>NFSストレージを提供
ExternalEdgeTunnel .[#6366f1,thickness=2].> PremisesManagementArgo : <color:#6366f1>Access認証後 / 管理UI
PremisesManagementArgo .[#8D8D8D,thickness=2].> ConsumersReventer : <color:#8D8D8D>共用ArgoCDの同期インターフェース
PremisesManagementRunner .[#8D8D8D,thickness=2].> ConsumersReventer : <color:#8D8D8D>専用runner向けの共用制御基盤
@enduml
`;case`home_apps`:return`@startuml
title "自宅基盤・サービスの分類"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<PremisesHomeAgent>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<PremisesHomePlatform>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecording>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeApps>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesDataDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesDataBackups>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagement>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==自宅監視基盤\\n\\nvmagent・exporter・自宅VictoriaMetrics・PDC agent。OCI監視VMとは独立。" <<PremisesHomeAgent>> as PremisesHomeAgent
rectangle "==クラスタ基盤 / Talos\\n\\nArgoCD Application以外のbootstrapも含む。クラスタDNSと宅内DNS、metrics-serverと監視保存基盤は区別する。" <<PremisesHomePlatform>> as PremisesHomePlatform
rectangle "==録画・配信\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
rectangle "==自宅ワークロード / 基盤の利用側\\n\\nLoockit・Coupon Manager・Wake-on-LAN・Annict連携など。全Applicationとリソースは自動抽出一覧から確認できる。" <<PremisesHomeApps>> as PremisesHomeApps
rectangle "==内部DNS / MetalLB\\n\\nmiutaku.internalはCoreDNS。MetalLBでLAN内Service IPを払い出す。" <<PremisesHomeDns>> as PremisesHomeDns
rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
rectangle "==Nextcloud" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
rectangle "==DB / アプリ共有基盤" <<PremisesDataDatabases>> as PremisesDataDatabases
rectangle "==バックアップ処理" <<PremisesDataBackups>> as PremisesDataBackups
rectangle "==自宅基盤の構成管理" <<PremisesManagement>> as PremisesManagement
@enduml
`;case`delivery`:return`@startuml
title "自宅基盤の変更・同期"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<PremisesManagementImages>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementAnsible>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementPacker>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalGithub>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalTerraform_cloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalGithub_pages>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesManagementArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementRunner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementTfc_agents>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHome>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHardwareNetwork>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "自宅基盤の構成管理" <<PremisesManagement>> as PremisesManagement {
    skinparam RectangleBorderColor<<PremisesManagement>> #A35829
    skinparam RectangleFontColor<<PremisesManagement>> #A35829
    skinparam RectangleBorderStyle<<PremisesManagement>> dashed

    rectangle "==Image Updater" <<PremisesManagementImages>> as PremisesManagementImages
    rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<PremisesManagementAnsible>> as PremisesManagementAnsible
    rectangle "==Packer / VM template" <<PremisesManagementPacker>> as PremisesManagementPacker
    rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<PremisesManagementArgo>> as PremisesManagementArgo
    rectangle "==ARC / 共用のrunner制御基盤\\n\\n共用Controllerとmy-infra向け実行環境。Re:Venter専用scale setは利用側の境界へ分ける。" <<PremisesManagementRunner>> as PremisesManagementRunner
    rectangle "==Terraform Cloud agents / 自宅\\n\\n共用・my-infra向けworkspaceを実行するagent。Re:Venter専用agentは利用側の境界へ分ける。" <<PremisesManagementTfc_agents>> as PremisesManagementTfc_agents
  }
  rectangle "==Talos / home-k8s\\n\\nTalos CP VM3台・worker VM2台とRPi worker2台で構成。アプリ・クラスタ基盤・監視・運用・DB/バックアップを用途別に表示し、Application全件は一覧へ対応付ける。Pod配置は動的。" <<PremisesHome>> as PremisesHome
  rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
    skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
    skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHardware>> dashed

    rectangle "==ネットワーク機器\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<PremisesHardwareNetwork>> as PremisesHardwareNetwork
  }
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ExternalGithub>> as ExternalGithub
  rectangle "==Terraform Cloud\\n\\nmy-infraのworkspaceで自宅基盤のplan/applyを実行する。Re:Venter向けの変更経路は利用側の図で管理。" <<ExternalTerraform_cloud>> as ExternalTerraform_cloud
  rectangle "==GitHub Pages / my-infra図・レビュー" <<ExternalGithub_pages>> as ExternalGithub_pages
  rectangle "==Cloudflare\\n\\n自宅サービスの公開入口は原則Accessで認証してTunnelへ転送。mTLS専用APIとWARP/LAN経路は別に示す。" <<ExternalEdge>> as ExternalEdge
}

ExternalGithub .[#6366f1,thickness=2].> PremisesManagementArgo : <color:#6366f1>GitOps
ExternalGithub .[#6366f1,thickness=2].> PremisesManagementRunner : <color:#6366f1>Actions job
ExternalGithub .[#6366f1,thickness=2].> ExternalTerraform_cloud : <color:#6366f1>Terraform実行
ExternalTerraform_cloud .[#6366f1,thickness=2].> PremisesManagementTfc_agents : <color:#6366f1>workspace runを自宅agentで実行
ExternalGithub .[#6366f1,thickness=2].> ExternalGithub_pages : <color:#6366f1>構成図・PR比較を公開
PremisesManagementArgo .[#6366f1,thickness=2].> PremisesHome : <color:#6366f1>manifest同期
ExternalTerraform_cloud .[#6366f1,thickness=2].> ExternalEdge : <color:#6366f1>DNS / Access / Tunnel
PremisesManagementTfc_agents .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>VM / ネットワーク
PremisesManagementAnsible .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>機器設定
PremisesManagementPacker .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>VM template
@enduml
`;case`secrets`:return`@startuml
title "秘密情報の管理・注入"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<ExternalBws>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ExternalGithub>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalTerraform_cloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementAnsible>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesDataBackups>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<ExternalBws>> as ExternalBws
  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ExternalGithub>> as ExternalGithub
  rectangle "==Terraform Cloud\\n\\nmy-infraのworkspaceで自宅基盤のplan/applyを実行する。Re:Venter向けの変更経路は利用側の図で管理。" <<ExternalTerraform_cloud>> as ExternalTerraform_cloud
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<PremisesManagementAnsible>> as PremisesManagementAnsible
  rectangle "==バックアップ処理" <<PremisesDataBackups>> as PremisesDataBackups
}

ExternalBws .[#AC4D39,thickness=2].> PremisesHomeEso : <color:#AC4D39>Secret注入
ExternalBws .[#AC4D39,thickness=2].> ExternalGithub : <color:#AC4D39>CI credential
ExternalBws .[#AC4D39,thickness=2].> ExternalTerraform_cloud : <color:#AC4D39>Terraform変数
ExternalBws .[#AC4D39,thickness=2].> PremisesManagementAnsible : <color:#AC4D39>機器・PBS用credential
ExternalBws .[#AC4D39,thickness=2].> PremisesDataBackups : <color:#AC4D39>ESO経由 / backup credential
@enduml
`;case`observability`:return`@startuml
title "監視の収集・保存・照会"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Operator>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<ExternalGrafana>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardware>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeAgentExporters>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAgentPdc>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAgentCollector>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesHomeAgentLocal_store>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
person "==管理者" <<Operator>> as Operator
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==Grafana Cloud / PDC\\n\\nPDC agentが外向き接続を作り、Grafanaからprivate監視データを照会する。ここでは自宅VictoriaMetricsの照会経路を示す。Re:Venter専用の監視構成は利用側の図で管理。" <<ExternalGrafana>> as ExternalGrafana
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "==物理・ネットワーク" <<PremisesHardware>> as PremisesHardware
  rectangle "Talos / home-k8s" <<PremisesHome>> as PremisesHome {
    skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
    skinparam RectangleFontColor<<PremisesHome>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHome>> dashed

    rectangle "自宅監視基盤" <<PremisesHomeAgent>> as PremisesHomeAgent {
      skinparam RectangleBorderColor<<PremisesHomeAgent>> #428a4f
      skinparam RectangleFontColor<<PremisesHomeAgent>> #428a4f
      skinparam RectangleBorderStyle<<PremisesHomeAgent>> dashed

      rectangle "==exporter群\\n\\nnode・PVE・SNMP・NUT・TinyTuya・blackbox・speedtest。個別Applicationを内部に保持。" <<PremisesHomeAgentExporters>> as PremisesHomeAgentExporters
      rectangle "==PDC agent / 自宅" <<PremisesHomeAgentPdc>> as PremisesHomeAgentPdc
      rectangle "==vmagent / scrape・remoteWrite" <<PremisesHomeAgentCollector>> as PremisesHomeAgentCollector
      database "==VictoriaMetrics / 自宅\\n\\n自宅のmetricsは自宅VictoriaMetricsに保存。OCI側VMへの送信とは別。" <<PremisesHomeAgentLocal_store>> as PremisesHomeAgentLocal_store
    }
  }
}

Operator .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>照会
PremisesHardware .[#b45309,thickness=2].> PremisesHomeAgentCollector : <color:#b45309>exporter収集
PremisesHomeAgentCollector .[#b45309,thickness=2].> PremisesHomeAgentLocal_store : <color:#b45309>remoteWrite / :8428
ExternalGrafana .[#0ea5e9,thickness=2].> PremisesHomeAgentPdc : <color:#0ea5e9>PDC経由の検索
PremisesHomeAgentPdc .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>外向きPDC接続
PremisesHomeAgentPdc .[#0ea5e9,thickness=2].> PremisesHomeAgentLocal_store : <color:#0ea5e9>private query / :8428
PremisesHomeAgentExporters .[#b45309,thickness=2].> PremisesHomeAgentCollector : <color:#b45309>scrape
@enduml
`;case`vlans`:return`@startuml
title "native・タグ・経路"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<PremisesHardwareNetworkSwitch>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeWarp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareNetworkRouter>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareX570Bridge>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareB550mBridge>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLanNative>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLanManagement>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLanServer>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLanClient>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLanGuest>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLanIot>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "==US-8-60W / 管理スイッチ\\n\\nUniFi Network DB・PVE側LLDPで確認。Port4はnative VLAN30、Port5/6/7はnative VLAN10でtaggedを遮断。uplinkはnative1とtagged VLANを運ぶ。管理IPは稼働時192.168.0.252。DHCPのVLAN10予約を稼働中IPと混同しない。" <<PremisesHardwareNetworkSwitch>> as PremisesHardwareNetworkSwitch
  rectangle "==IX2215 / ルーター・VLAN間ACL\\n\\nGigaEthernet2: native1、tagged10/20/30/31/40。guestの他VLAN横断は拒否。IoTのIF名はGigaEthernet2.4/BVI4だがタグは40。" <<PremisesHardwareNetworkRouter>> as PremisesHardwareNetworkRouter
  rectangle "==enp7s0 / vmbr0\\n\\nPVE管理はnative1。ゲストNICのtag20/30を確認。vmbr0v20/v30/v40とNIC subinterfaceが存在し、vlan-aware bridge設定とは区別する。" <<PremisesHardwareX570Bridge>> as PremisesHardwareX570Bridge
  rectangle "==enp6s0 / vmbr0\\n\\nPVE管理はnative1。ゲストNICのtag20/40を確認。vmbr0v20/v30/v40とNIC subinterfaceが存在。" <<PremisesHardwareB550mBridge>> as PremisesHardwareB550mBridge
  rectangle "LAN / VLAN・経路" <<PremisesLan>> as PremisesLan {
    skinparam RectangleBorderColor<<PremisesLan>> #3b82f6
    skinparam RectangleFontColor<<PremisesLan>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesLan>> dashed

    rectangle "==native / 192.168.0.0/24" <<PremisesLanNative>> as PremisesLanNative
    rectangle "==VLAN10 / 192.168.10.0/24" <<PremisesLanManagement>> as PremisesLanManagement
    rectangle "==VLAN20 / 192.168.20.0/24" <<PremisesLanServer>> as PremisesLanServer
    rectangle "==VLAN30 / 192.168.30.0/24" <<PremisesLanClient>> as PremisesLanClient
    rectangle "==VLAN31 / guest\\n\\n他VLANへの通信は不可。全VLAN間を到達可能として描かない。" <<PremisesLanGuest>> as PremisesLanGuest
    rectangle "==VLAN40 / 192.168.40.0/24" <<PremisesLanIot>> as PremisesLanIot
  }
  rectangle "==内部DNS / MetalLB\\n\\nmiutaku.internalはCoreDNS。MetalLBでLAN内Service IPを払い出す。" <<PremisesHomeDns>> as PremisesHomeDns
}
rectangle "==WARP / private CIDR routes\\n\\nCloudflare One Clientからprivate CIDRへ。公開hostnameのTunnel/Accessとは別。" <<ExternalEdgeWarp>> as ExternalEdgeWarp

PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesLanNative : <color:#8D8D8D>native IF
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesLanManagement : <color:#8D8D8D>BVI10
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>BVI20
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesLanClient : <color:#8D8D8D>BVI30
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesLanGuest : <color:#8D8D8D>BVI31 / 他VLAN拒否
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesLanIot : <color:#8D8D8D>BVI4 / tag40
PremisesHardwareX570Bridge .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>VM・LXC tag20
PremisesHardwareX570Bridge .[#8D8D8D,thickness=2].> PremisesLanClient : <color:#8D8D8D>Windows VM tag30
PremisesHardwareB550mBridge .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>VM・LXC tag20
PremisesHardwareB550mBridge .[#8D8D8D,thickness=2].> PremisesLanIot : <color:#8D8D8D>kiosk VM tag40
ExternalEdgeWarp .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>private CIDR routes / WARP policy
@enduml
`;case`pve_b550m`:return`@startuml
title "VM・LXC・Talos OS"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HomeSiteB550mLb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteB550mDev>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteB550mKiosk>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteB550mLoockit>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteB550mTuner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSiteB550mNas2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteB550mCp2Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteB550mCp3Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteB550mWorker2Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteTalos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "自宅 / Proxmox2ホスト・RPi" <<HomeSite>> as HomeSite {
  skinparam RectangleBorderColor<<HomeSite>> #737373
  skinparam RectangleFontColor<<HomeSite>> #737373
  skinparam RectangleBorderStyle<<HomeSite>> dashed

  rectangle "pve-b550m" <<HomeSiteB550m>> as HomeSiteB550m {
    skinparam RectangleBorderColor<<HomeSiteB550m>> #428a4f
    skinparam RectangleFontColor<<HomeSiteB550m>> #428a4f
    skinparam RectangleBorderStyle<<HomeSiteB550m>> dashed

    rectangle "Talos controlplane02 / VM13002" <<HomeSiteB550mCp2>> as HomeSiteB550mCp2 {
      skinparam RectangleBorderColor<<HomeSiteB550mCp2>> #64748b
      skinparam RectangleFontColor<<HomeSiteB550mCp2>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteB550mCp2>> dashed

      rectangle "==Talos OS / VLAN20\\n\\nTalos OS上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<HomeSiteB550mCp2Talos>> as HomeSiteB550mCp2Talos
    }
    rectangle "Talos controlplane03 / VM13003" <<HomeSiteB550mCp3>> as HomeSiteB550mCp3 {
      skinparam RectangleBorderColor<<HomeSiteB550mCp3>> #64748b
      skinparam RectangleFontColor<<HomeSiteB550mCp3>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteB550mCp3>> dashed

      rectangle "==Talos OS / VLAN20\\n\\nTalos OS上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<HomeSiteB550mCp3Talos>> as HomeSiteB550mCp3Talos
    }
    rectangle "Talos worker02 / VM13005" <<HomeSiteB550mWorker2>> as HomeSiteB550mWorker2 {
      skinparam RectangleBorderColor<<HomeSiteB550mWorker2>> #64748b
      skinparam RectangleFontColor<<HomeSiteB550mWorker2>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteB550mWorker2>> dashed

      rectangle "==Talos OS / VLAN20\\n\\nTalos OS上のkubelet・containerd。2 VMと2 RPi。アプリPodの固定配置を意味しない。" <<HomeSiteB550mWorker2Talos>> as HomeSiteB550mWorker2Talos
    }
    rectangle "==HAProxy / Keepalived VM10002\\n\\nVM10001・10002。Terraform/PVEとAnsible/load-balancerで管理。" <<HomeSiteB550mLb>> as HomeSiteB550mLb
    rectangle "==開発アプリVM40000" <<HomeSiteB550mDev>> as HomeSiteB550mDev
    rectangle "==DisplayLink kiosk VM5000" <<HomeSiteB550mKiosk>> as HomeSiteB550mKiosk
    rectangle "==LXC CT12903" <<HomeSiteB550mLoockit>> as HomeSiteB550mLoockit
    rectangle "==Mirakurun STG LXC CT12904\\n\\nGRはlocal tuner、BS/CSは本番Mirakurunへの低優先度TCP fallback。" <<HomeSiteB550mTuner>> as HomeSiteB550mTuner
    database "==TrueNAS VM69002 / nas-02\\n\\npve-b550mのVM。USB disk passthrough上のZFS datasetをNFS公開。アプリ・DB・監視のデータを保存。" <<HomeSiteB550mNas2>> as HomeSiteB550mNas2
  }
  rectangle "==home-k8s\\n\\n左のPVE → VM → Talos OSとRPi上のTalos OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。" <<HomeSiteTalos>> as HomeSiteTalos
}

HomeSiteB550mCp2Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>control-plane / home-k8s所属
HomeSiteB550mCp3Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>control-plane / home-k8s所属
HomeSiteB550mWorker2Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>worker / home-k8s所属
@enduml
`;case`pve_x570`:return`@startuml
title "VM・LXC・Talos OS"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam database<<HomeSiteX570Pbs>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570Lb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570Unifi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570Loockit>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570Tuner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570Windows>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSiteX570Nas1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570Cp1Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteX570Worker1Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteTalos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "自宅 / Proxmox2ホスト・RPi" <<HomeSite>> as HomeSite {
  skinparam RectangleBorderColor<<HomeSite>> #737373
  skinparam RectangleFontColor<<HomeSite>> #737373
  skinparam RectangleBorderStyle<<HomeSite>> dashed

  rectangle "pve-x570" <<HomeSiteX570>> as HomeSiteX570 {
    skinparam RectangleBorderColor<<HomeSiteX570>> #428a4f
    skinparam RectangleFontColor<<HomeSiteX570>> #428a4f
    skinparam RectangleBorderStyle<<HomeSiteX570>> dashed

    database "==PBS VM14001\\n\\nVMバックアップ。NFSのオンライン利用経路とは別。" <<HomeSiteX570Pbs>> as HomeSiteX570Pbs
    rectangle "Talos controlplane01 / VM13001" <<HomeSiteX570Cp1>> as HomeSiteX570Cp1 {
      skinparam RectangleBorderColor<<HomeSiteX570Cp1>> #64748b
      skinparam RectangleFontColor<<HomeSiteX570Cp1>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteX570Cp1>> dashed

      rectangle "==Talos OS / VLAN20\\n\\nTalos OS上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<HomeSiteX570Cp1Talos>> as HomeSiteX570Cp1Talos
    }
    rectangle "Talos worker01 / VM13004" <<HomeSiteX570Worker1>> as HomeSiteX570Worker1 {
      skinparam RectangleBorderColor<<HomeSiteX570Worker1>> #64748b
      skinparam RectangleFontColor<<HomeSiteX570Worker1>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteX570Worker1>> dashed

      rectangle "==Talos OS / VLAN20\\n\\nTalos OS上のkubelet・containerd。2 VMと2 RPi。アプリPodの固定配置を意味しない。" <<HomeSiteX570Worker1Talos>> as HomeSiteX570Worker1Talos
    }
    rectangle "==HAProxy / Keepalived VM10001\\n\\nVM10001・10002。Terraform/PVEとAnsible/load-balancerで管理。" <<HomeSiteX570Lb>> as HomeSiteX570Lb
    rectangle "==UniFi OS VM13201" <<HomeSiteX570Unifi>> as HomeSiteX570Unifi
    rectangle "==LXC CT12902" <<HomeSiteX570Loockit>> as HomeSiteX570Loockit
    rectangle "==Mirakurun LXC CT12901" <<HomeSiteX570Tuner>> as HomeSiteX570Tuner
    rectangle "==Windows / VM60000 / tag30\\n\\nx570上で稼働確認。VLAN30。Terraformで管理しているVMとは区別する。" <<HomeSiteX570Windows>> as HomeSiteX570Windows
    database "==TrueNAS VM69001 / nas-01\\n\\npve-x570のVM。USB disk passthrough上のZFS datasetをNFS公開。runner cacheを保存。" <<HomeSiteX570Nas1>> as HomeSiteX570Nas1
  }
  rectangle "==home-k8s\\n\\n左のPVE → VM → Talos OSとRPi上のTalos OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。" <<HomeSiteTalos>> as HomeSiteTalos
}

HomeSiteX570Cp1Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>control-plane / home-k8s所属
HomeSiteX570Worker1Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>worker / home-k8s所属
@enduml
`;case`platform`:return`@startuml
title "bootstrap・DNS・Secret・運用"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<PremisesHomePlatformDescheduler>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformCloudflared>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformApi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformControlplane>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformWorker>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformCluster_dns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformFlannel>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformKube_proxy>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformMetrics_server>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformCert_approver>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDnsCoredns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDnsMetallb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementRunner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesManagementTfc_agents>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==descheduler" <<PremisesHomePlatformDescheduler>> as PremisesHomePlatformDescheduler
rectangle "==cloudflared / 自宅connector" <<PremisesHomePlatformCloudflared>> as PremisesHomePlatformCloudflared
rectangle "==Kubernetes API / Lease" <<PremisesHomePlatformApi>> as PremisesHomePlatformApi
rectangle "==home-k8s control-plane\\n\\nTalos OS上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<PremisesHomePlatformControlplane>> as PremisesHomePlatformControlplane
rectangle "==home-k8s worker\\n\\nTalos OS上のkubelet・containerd。2 VMと2 RPi。アプリPodの固定配置を意味しない。" <<PremisesHomePlatformWorker>> as PremisesHomePlatformWorker
rectangle "==CoreDNS / cluster.local\\n\\nクラスタDNS。app-corednsのmiutaku.internalとは別。稼働照合で確認。" <<PremisesHomePlatformCluster_dns>> as PremisesHomePlatformCluster_dns
rectangle "==Flannel / CNI" <<PremisesHomePlatformFlannel>> as PremisesHomePlatformFlannel
rectangle "==kube-proxy / Service routing" <<PremisesHomePlatformKube_proxy>> as PremisesHomePlatformKube_proxy
rectangle "==metrics-server / Metrics API\\n\\n稼働確認済み。リポジトリ内の導入宣言は未確認。" <<PremisesHomePlatformMetrics_server>> as PremisesHomePlatformMetrics_server
rectangle "==kubelet-serving-cert-approver\\n\\n稼働確認済み。リポジトリ内の導入宣言は未確認。" <<PremisesHomePlatformCert_approver>> as PremisesHomePlatformCert_approver
rectangle "内部DNS / MetalLB" <<PremisesHomeDns>> as PremisesHomeDns {
  skinparam RectangleBorderColor<<PremisesHomeDns>> #64748b
  skinparam RectangleFontColor<<PremisesHomeDns>> #64748b
  skinparam RectangleBorderStyle<<PremisesHomeDns>> dashed

  rectangle "==CoreDNS / miutaku.internal" <<PremisesHomeDnsCoredns>> as PremisesHomeDnsCoredns
  rectangle "==MetalLB / LANのService IP" <<PremisesHomeDnsMetallb>> as PremisesHomeDnsMetallb
}
rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<PremisesManagementArgo>> as PremisesManagementArgo
rectangle "==ARC / 共用のrunner制御基盤\\n\\n共用Controllerとmy-infra向け実行環境。Re:Venter専用scale setは利用側の境界へ分ける。" <<PremisesManagementRunner>> as PremisesManagementRunner
rectangle "==Terraform Cloud agents / 自宅\\n\\n共用・my-infra向けworkspaceを実行するagent。Re:Venter専用agentは利用側の境界へ分ける。" <<PremisesManagementTfc_agents>> as PremisesManagementTfc_agents
@enduml
`;case`network`:return`@startuml
title "ルーター・SW・AP"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<ExternalInternet>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareNetworkRouter>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareNetworkEthernet>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareNetworkSwitch>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareNetworkAp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareUnifi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareX570Bridge>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareB550mBridge>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLan>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "==Internet" <<ExternalInternet>> as ExternalInternet
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "ネットワーク機器" <<PremisesHardwareNetwork>> as PremisesHardwareNetwork {
    skinparam RectangleBorderColor<<PremisesHardwareNetwork>> #64748b
    skinparam RectangleFontColor<<PremisesHardwareNetwork>> #64748b
    skinparam RectangleBorderStyle<<PremisesHardwareNetwork>> dashed

    rectangle "==IX2215 / ルーター・VLAN間ACL\\n\\nGigaEthernet2: native1、tagged10/20/30/31/40。guestの他VLAN横断は拒否。IoTのIF名はGigaEthernet2.4/BVI4だがタグは40。" <<PremisesHardwareNetworkRouter>> as PremisesHardwareNetworkRouter
    rectangle "==宅内Ethernet / VLAN trunk\\n\\n同一LANの接続を表す。PVE2台で同じSW Port1のLLDPを受信するため、LLDPだけを根拠にPVEをSWの別ポートへ直結とは描かない。個別配線ポートは未確定。" <<PremisesHardwareNetworkEthernet>> as PremisesHardwareNetworkEthernet
    rectangle "==US-8-60W / 管理スイッチ\\n\\nUniFi Network DB・PVE側LLDPで確認。Port4はnative VLAN30、Port5/6/7はnative VLAN10でtaggedを遮断。uplinkはnative1とtagged VLANを運ぶ。管理IPは稼働時192.168.0.252。DHCPのVLAN10予約を稼働中IPと混同しない。" <<PremisesHardwareNetworkSwitch>> as PremisesHardwareNetworkSwitch
    rectangle "==FS Wi-Fi AP\\n\\n管理はnative VLAN1 / 192.168.0.253。SSIDの名前・各SSIDとVLANの対応、ケーブルの接続ポートは未確認。" <<PremisesHardwareNetworkAp>> as PremisesHardwareNetworkAp
  }
  rectangle "Proxmox / x570" <<PremisesHardwareX570>> as PremisesHardwareX570 {
    skinparam RectangleBorderColor<<PremisesHardwareX570>> #64748b
    skinparam RectangleFontColor<<PremisesHardwareX570>> #64748b
    skinparam RectangleBorderStyle<<PremisesHardwareX570>> dashed

    rectangle "==enp7s0 / vmbr0\\n\\nPVE管理はnative1。ゲストNICのtag20/30を確認。vmbr0v20/v30/v40とNIC subinterfaceが存在し、vlan-aware bridge設定とは区別する。" <<PremisesHardwareX570Bridge>> as PremisesHardwareX570Bridge
  }
  rectangle "Proxmox / b550m" <<PremisesHardwareB550m>> as PremisesHardwareB550m {
    skinparam RectangleBorderColor<<PremisesHardwareB550m>> #64748b
    skinparam RectangleFontColor<<PremisesHardwareB550m>> #64748b
    skinparam RectangleBorderStyle<<PremisesHardwareB550m>> dashed

    rectangle "==enp6s0 / vmbr0\\n\\nPVE管理はnative1。ゲストNICのtag20/40を確認。vmbr0v20/v30/v40とNIC subinterfaceが存在。" <<PremisesHardwareB550mBridge>> as PremisesHardwareB550mBridge
  }
  rectangle "==UniFi OS Server" <<PremisesHardwareUnifi>> as PremisesHardwareUnifi
  rectangle "==LAN / VLAN・経路" <<PremisesLan>> as PremisesLan
}

ExternalInternet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkRouter : <color:#8D8D8D>WAN / GigaEthernet0
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesHardwareNetworkEthernet : <color:#8D8D8D>GigaEthernet2 / native1 + tag10,20,30,31,40
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkSwitch : <color:#8D8D8D>802.1Q / uplink
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkAp : <color:#8D8D8D>AP trunk / 接続ポート未確定
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareX570Bridge : <color:#8D8D8D>native1 + taggedゲスト / 配線ポート未確定
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareB550mBridge : <color:#8D8D8D>native1 + taggedゲスト / 配線ポート未確定
PremisesHardwareNetworkSwitch .[#6366f1,thickness=2].> PremisesHardwareUnifi : <color:#6366f1>UniFiで管理
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesLan : <color:#8D8D8D>[...]
PremisesHardwareX570Bridge .[#8D8D8D,thickness=2].> PremisesLan : <color:#8D8D8D>[...]
PremisesHardwareB550mBridge .[#8D8D8D,thickness=2].> PremisesLan : <color:#8D8D8D>[...]
@enduml
`;case`storage`:return`@startuml
title "復元元の区別"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<PremisesHomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecording>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesHomeAgentLocal_store>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHardwareX570>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareB550m>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesDataBackupsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataDatabasesMariadb>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesDataDatabasesPostgres>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesDataShared>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataPbs>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesDataNasNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesDataNasNas01>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesDataBackupsRecordings>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesDataBackupsMetrics>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesDataBackupsNas>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<ExternalIdrive>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "Talos / home-k8s" <<PremisesHome>> as PremisesHome {
    skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
    skinparam RectangleFontColor<<PremisesHome>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHome>> dashed

    rectangle "==Nextcloud" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
    rectangle "==録画・配信\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
    database "==VictoriaMetrics / 自宅\\n\\n自宅のmetricsは自宅VictoriaMetricsに保存。OCI側VMへの送信とは別。" <<PremisesHomeAgentLocal_store>> as PremisesHomeAgentLocal_store
  }
  rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
    skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
    skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHardware>> dashed

    rectangle "==Proxmox / x570" <<PremisesHardwareX570>> as PremisesHardwareX570
    rectangle "==Proxmox / b550m" <<PremisesHardwareB550m>> as PremisesHardwareB550m
  }
  rectangle "保存・バックアップ" <<PremisesData>> as PremisesData {
    skinparam RectangleBorderColor<<PremisesData>> #737373
    skinparam RectangleFontColor<<PremisesData>> #737373
    skinparam RectangleBorderStyle<<PremisesData>> dashed

    rectangle "DB / アプリ共有基盤" <<PremisesDataDatabases>> as PremisesDataDatabases {
      skinparam RectangleBorderColor<<PremisesDataDatabases>> #64748b
      skinparam RectangleFontColor<<PremisesDataDatabases>> #64748b
      skinparam RectangleBorderStyle<<PremisesDataDatabases>> dashed

      database "==MariaDB" <<PremisesDataDatabasesMariadb>> as PremisesDataDatabasesMariadb
      database "==PostgreSQL / 本番・STG" <<PremisesDataDatabasesPostgres>> as PremisesDataDatabasesPostgres
    }
    rectangle "バックアップ処理" <<PremisesDataBackups>> as PremisesDataBackups {
      skinparam RectangleBorderColor<<PremisesDataBackups>> #64748b
      skinparam RectangleFontColor<<PremisesDataBackups>> #64748b
      skinparam RectangleBorderStyle<<PremisesDataBackups>> dashed

      rectangle "==DB logical dump / 自宅Talos CronJob" <<PremisesDataBackupsDb>> as PremisesDataBackupsDb
      rectangle "==録画 / 自宅Talos CronJob" <<PremisesDataBackupsRecordings>> as PremisesDataBackupsRecordings
      rectangle "==metrics snapshot / 自宅Talos CronJob" <<PremisesDataBackupsMetrics>> as PremisesDataBackupsMetrics
      rectangle "==NAS restic / 自宅Talos CronJob" <<PremisesDataBackupsNas>> as PremisesDataBackupsNas
    }
    rectangle "==共有PV / runner cache・状態" <<PremisesDataShared>> as PremisesDataShared
    database "==Proxmox Backup Server\\n\\nVMバックアップ。NFSのオンライン利用経路とは別。" <<PremisesDataPbs>> as PremisesDataPbs
    rectangle "TrueNAS VM ×2 / ZFS・NFS" <<PremisesDataNas>> as PremisesDataNas {
      skinparam RectangleBorderColor<<PremisesDataNas>> #A35829
      skinparam RectangleFontColor<<PremisesDataNas>> #A35829
      skinparam RectangleBorderStyle<<PremisesDataNas>> dashed

      database "==TrueNAS VM69002 / nas-02\\n\\npve-b550mのVM。USB disk passthrough上のZFS datasetをNFS公開。アプリ・DB・監視のデータを保存。" <<PremisesDataNasNas02>> as PremisesDataNasNas02
      database "==TrueNAS VM69001 / nas-01\\n\\npve-x570のVM。USB disk passthrough上のZFS datasetをNFS公開。runner cacheを保存。" <<PremisesDataNasNas01>> as PremisesDataNasNas01
    }
  }
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  database "==IDrive e2 / S3\\n\\nPBS datastore、DB logical dump、NAS restic、録画、VictoriaMetrics snapshotの保存先。用途・prefix・整合性を分ける。" <<ExternalIdrive>> as ExternalIdrive
}

PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>html・data / NFS
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>録画・thumbnail・drop / NFS
PremisesHomeAgentLocal_store .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>metrics用NFS PVC
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataDatabasesMariadb : <color:#15803d>MYSQL_HOST / MariaDB
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataDatabasesMariadb : <color:#15803d>EPGStation DB
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataDatabasesPostgres : <color:#15803d>[...]
PremisesDataShared .[#15803d,thickness=2].> PremisesDataNasNas01 : <color:#15803d>runner cache / NFS
PremisesHomeRecording .[#b45309,thickness=2].> PremisesDataBackupsRecordings : <color:#b45309>録画ファイル専用job
PremisesHomeAgentLocal_store .[#b45309,thickness=2].> PremisesDataBackupsMetrics : <color:#b45309>snapshot / vmbackup
PremisesDataNasNas02 .[#b45309,thickness=2].> PremisesDataBackupsNas : <color:#b45309>対象dataset / restic
PremisesDataPbs .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>S3 datastore / VM backup
PremisesHardwareX570 .[#b45309,thickness=2].> PremisesDataPbs : <color:#b45309>VM backup
PremisesHardwareB550m .[#b45309,thickness=2].> PremisesDataPbs : <color:#b45309>VM backup
PremisesDataDatabases .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>DB用NFS PVC
PremisesDataDatabases .[#b45309,thickness=2].> PremisesDataBackupsDb : <color:#b45309>整合性あるlogical dump
PremisesDataBackups .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>用途別prefix / 暗号化・retention
@enduml
`;case`access`:return`@startuml
title "原則Access・例外mTLS"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<User>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam person<<Operator>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam person<<Client>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<ExternalEdgeAccess>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeMtls>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeTunnel>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeRoutesProtected>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeRoutesExceptions>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ConsumersReventer>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHome>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam database<<PremisesDataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesManagementArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareNetwork>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
person "==利用者" <<User>> as User
person "==管理者" <<Operator>> as Operator
person "==専用クライアント" <<Client>> as Client
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "Cloudflare" <<ExternalEdge>> as ExternalEdge {
    skinparam RectangleBorderColor<<ExternalEdge>> #A35829
    skinparam RectangleFontColor<<ExternalEdge>> #A35829
    skinparam RectangleBorderStyle<<ExternalEdge>> dashed

    rectangle "==Cloudflare Access / 共通の認証入口\\n\\n利用・管理の公開UIを原則Accessで保護。mTLS専用API、WARPのprivate CIDR routeとは区別する。" <<ExternalEdgeAccess>> as ExternalEdgeAccess
    rectangle "==mTLS / 専用APIの例外\\n\\nloockit-apiのみ。指定クライアント証明書・操作パスの制限。Accessによるブラウザ認証とは別。" <<ExternalEdgeMtls>> as ExternalEdgeMtls
    rectangle "==Cloudflare Tunnel\\n\\n自宅基盤のcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
    rectangle "公開hostname / 設定から抽出" <<ExternalEdgeRoutes>> as ExternalEdgeRoutes {
      skinparam RectangleBorderColor<<ExternalEdgeRoutes>> #64748b
      skinparam RectangleFontColor<<ExternalEdgeRoutes>> #64748b
      skinparam RectangleBorderStyle<<ExternalEdgeRoutes>> dashed

      rectangle "==Access保護のhostname" <<ExternalEdgeRoutesProtected>> as ExternalEdgeRoutesProtected
      rectangle "==例外 / mTLS専用API" <<ExternalEdgeRoutesExceptions>> as ExternalEdgeRoutesExceptions
    }
  }
}
rectangle "基盤の利用側 / 別リポジトリ" <<Consumers>> as Consumers {
  skinparam RectangleBorderColor<<Consumers>> #64748b
  skinparam RectangleFontColor<<Consumers>> #64748b
  skinparam RectangleBorderStyle<<Consumers>> dashed

  rectangle "==Re:Venter\\n\\n基盤を利用するワークロードの一つ。OCI/OKE・監視VM・GitOps/CI/Terraformによる変更経路・専用runner/agent・レビュー配信を含む専用構成はこの境界に集約。my-infraには共有基盤との接点と定義元の参照だけを残し、構成・通信の詳細はreventer側の図へ委ねる。" <<ConsumersReventer>> as ConsumersReventer
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "保存・バックアップ" <<PremisesData>> as PremisesData {
    skinparam RectangleBorderColor<<PremisesData>> #737373
    skinparam RectangleFontColor<<PremisesData>> #737373
    skinparam RectangleBorderStyle<<PremisesData>> dashed

    database "==TrueNAS VM ×2 / ZFS・NFS\\n\\n自宅Proxmoxの各ホストに1台ずつ、VM69001・69002。USB diskをpassthrough。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<PremisesDataNas>> as PremisesDataNas
  }
  rectangle "自宅基盤の構成管理" <<PremisesManagement>> as PremisesManagement {
    skinparam RectangleBorderColor<<PremisesManagement>> #A35829
    skinparam RectangleFontColor<<PremisesManagement>> #A35829
    skinparam RectangleBorderStyle<<PremisesManagement>> dashed

    rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<PremisesManagementArgo>> as PremisesManagementArgo
  }
  rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
    skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
    skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHardware>> dashed

    rectangle "==ネットワーク機器\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<PremisesHardwareNetwork>> as PremisesHardwareNetwork
  }
  rectangle "==Talos / home-k8s\\n\\nTalos CP VM3台・worker VM2台とRPi worker2台で構成。アプリ・クラスタ基盤・監視・運用・DB/バックアップを用途別に表示し、Application全件は一覧へ対応付ける。Pod配置は動的。" <<PremisesHome>> as PremisesHome
}

User .[#15803d,thickness=2].> ExternalEdgeAccess : <color:#15803d>HTTPS / 利用時の認証
Operator .[#6366f1,thickness=2].> ExternalEdgeAccess : <color:#6366f1>HTTPS / 管理時の認証
Client .[#15803d,thickness=2].> ExternalEdgeMtls : <color:#15803d>クライアント証明書
ExternalEdgeAccess .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>Access認証後の転送
ExternalEdgeMtls .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>mTLS検証済みのAPIリクエスト
ExternalEdgeTunnel .[#8D8D8D,thickness=2].> ExternalEdgeRoutesProtected : <color:#8D8D8D>hostname転送
ExternalEdgeTunnel .[#15803d,thickness=2].> ExternalEdgeRoutesExceptions : <color:#15803d>hostname転送
ExternalEdgeRoutesProtected .[#15803d,thickness=2].> PremisesHome : <color:#15803d>内部接続
ExternalEdgeRoutesExceptions .[#15803d,thickness=2].> PremisesHome : <color:#15803d>内部接続
PremisesHome .[#0ea5e9,thickness=2].> ExternalEdgeTunnel : <color:#0ea5e9>外向きTunnel接続
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> PremisesDataNas : <color:#6366f1>認証後の内部接続
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> PremisesManagementArgo : <color:#6366f1>認証後の内部接続
ExternalEdgeTunnel .[#6366f1,thickness=2].> ConsumersReventer : <color:#6366f1>hostname転送
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> PremisesHardwareNetwork : <color:#6366f1>認証後の内部接続
@enduml
`;case`placement`:return`@startuml
title "PVE → VM → Talos"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<HomeSiteX570>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<HomeSiteB550m>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<HomeSiteWorker_pi1>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
}
skinparam rectangle<<HomeSiteWorker_pi2>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
}
skinparam rectangle<<HomeSiteTalos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteNetwork>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
}
rectangle "自宅 / Proxmox2ホスト・RPi" <<HomeSite>> as HomeSite {
  skinparam RectangleBorderColor<<HomeSite>> #737373
  skinparam RectangleFontColor<<HomeSite>> #737373
  skinparam RectangleBorderStyle<<HomeSite>> dashed

  rectangle "==pve-x570" <<HomeSiteX570>> as HomeSiteX570
  rectangle "==pve-b550m" <<HomeSiteB550m>> as HomeSiteB550m
  rectangle "==RPi / worker03 / VLAN10\\n\\nTalos OS上のkubelet・containerd。2 VMと2 RPi。アプリPodの固定配置を意味しない。" <<HomeSiteWorker_pi1>> as HomeSiteWorker_pi1
  rectangle "==RPi / worker04 / VLAN10\\n\\nTalos OS上のkubelet・containerd。2 VMと2 RPi。アプリPodの固定配置を意味しない。" <<HomeSiteWorker_pi2>> as HomeSiteWorker_pi2
  rectangle "==home-k8s\\n\\n左のPVE → VM → Talos OSとRPi上のTalos OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。" <<HomeSiteTalos>> as HomeSiteTalos
  rectangle "==ネットワーク機器 / IX2215・SW・AP\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<HomeSiteNetwork>> as HomeSiteNetwork
}

HomeSiteX570 .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>[...]
HomeSiteB550m .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>[...]
HomeSiteWorker_pi1 .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>worker / home-k8s所属
HomeSiteWorker_pi2 .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>worker / home-k8s所属
@enduml
`;case`home_workloads`:return`@startuml
title "Application全件から分類"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<PremisesHomeAppsCoupon_manager>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeAppsLoockit>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeAppsMagic_mirror>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAppsWol>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeAccess>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeTunnel>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecording>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAppsAnnict_scraper>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Coupon Manager" <<PremisesHomeAppsCoupon_manager>> as PremisesHomeAppsCoupon_manager
rectangle "==Loockit" <<PremisesHomeAppsLoockit>> as PremisesHomeAppsLoockit
rectangle "==MagicMirror" <<PremisesHomeAppsMagic_mirror>> as PremisesHomeAppsMagic_mirror
rectangle "==Wake-on-LAN" <<PremisesHomeAppsWol>> as PremisesHomeAppsWol
rectangle "==Cloudflare Access / 共通の認証入口\\n\\n利用・管理の公開UIを原則Accessで保護。mTLS専用API、WARPのprivate CIDR routeとは区別する。" <<ExternalEdgeAccess>> as ExternalEdgeAccess
rectangle "==Cloudflare Tunnel\\n\\n自宅基盤のcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
rectangle "==Nextcloud" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
rectangle "==録画・配信\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
rectangle "==Annict scraper" <<PremisesHomeAppsAnnict_scraper>> as PremisesHomeAppsAnnict_scraper

PremisesHomeRecording .[#15803d,thickness=2].> PremisesHomeAppsAnnict_scraper : <color:#15803d>番組照合
ExternalEdgeAccess .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>Access認証後の転送
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHomeNextcloud : <color:#15803d>Access認証後 / 公開UI・サービス
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHomeRecording : <color:#15803d>Access認証後 / 公開UI・サービス
@enduml
`;case`power`:return`@startuml
title "UPS・NUTのcross-power"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<PremisesHardwareUpsMains>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareUpsSurge_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareUpsUps_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareUpsUps_b>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareX570>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareB550m>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareUpsPi_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareUpsPi_b>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "UPS / NUT" <<PremisesHardwareUps>> as PremisesHardwareUps {
  skinparam RectangleBorderColor<<PremisesHardwareUps>> #64748b
  skinparam RectangleFontColor<<PremisesHardwareUps>> #64748b
  skinparam RectangleBorderStyle<<PremisesHardwareUps>> dashed

  rectangle "==商用AC" <<PremisesHardwareUpsMains>> as PremisesHardwareUpsMains
  rectangle "==UPS A / サージのみ口・非backup" <<PremisesHardwareUpsSurge_a>> as PremisesHardwareUpsSurge_a
  rectangle "==UPS A / APC RS550S 2020" <<PremisesHardwareUpsUps_a>> as PremisesHardwareUpsUps_a
  rectangle "==UPS B / APC RS550S 2025" <<PremisesHardwareUpsUps_b>> as PremisesHardwareUpsUps_b
  rectangle "==NUT Pi .112 / 監視A・給電B" <<PremisesHardwareUpsPi_a>> as PremisesHardwareUpsPi_a
  rectangle "==NUT Pi .113 / 監視B・給電A" <<PremisesHardwareUpsPi_b>> as PremisesHardwareUpsPi_b
}
rectangle "==Proxmox / x570" <<PremisesHardwareX570>> as PremisesHardwareX570
rectangle "==Proxmox / b550m" <<PremisesHardwareB550m>> as PremisesHardwareB550m

PremisesHardwareUpsMains .[#AC4D39,thickness=2].> PremisesHardwareUpsSurge_a : <color:#AC4D39>非バックアップ出力
PremisesHardwareUpsMains .[#AC4D39,thickness=2].> PremisesHardwareUpsUps_a : <color:#AC4D39>AC入力
PremisesHardwareUpsSurge_a .[#AC4D39,thickness=2].> PremisesHardwareUpsUps_b : <color:#AC4D39>UPS BのAC入力
PremisesHardwareUpsUps_a .[#8D8D8D,thickness=2].> PremisesHardwareUpsPi_a : <color:#8D8D8D>USB監視 / ups-a
PremisesHardwareUpsUps_a .[#AC4D39,thickness=2].> PremisesHardwareUpsPi_b : <color:#AC4D39>cross-power / PiBの給電元
PremisesHardwareUpsUps_b .[#AC4D39,thickness=2].> PremisesHardwareUpsPi_a : <color:#AC4D39>cross-power / PiAの給電元
PremisesHardwareUpsUps_b .[#8D8D8D,thickness=2].> PremisesHardwareUpsPi_b : <color:#8D8D8D>USB監視 / ups-b
PremisesHardwareUpsPi_a .[#0ea5e9,thickness=2].> PremisesHardwareUpsPi_b : <color:#0ea5e9>ups-b監視 / LOWBATT10%で自身停止
PremisesHardwareUpsPi_b .[#0ea5e9,thickness=2].> PremisesHardwareUpsPi_a : <color:#0ea5e9>ups-a監視 / LOWBATT10%で自身停止
PremisesHardwareUpsUps_a .[#AC4D39,thickness=2].> PremisesHardwareX570 : <color:#AC4D39>バッテリー給電
PremisesHardwareX570 .[#0ea5e9,thickness=2].> PremisesHardwareUpsPi_a : <color:#0ea5e9>charge-guard監視 / 80%で自身停止
PremisesHardwareUpsUps_b .[#AC4D39,thickness=2].> PremisesHardwareB550m : <color:#AC4D39>バッテリー給電
PremisesHardwareB550m .[#0ea5e9,thickness=2].> PremisesHardwareUpsPi_b : <color:#0ea5e9>charge-guard監視 / 80%で自身停止
@enduml
`;default:throw Error(`Unknown viewId: `+e)}};export{e as pumlSource};