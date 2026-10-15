var e=e=>{switch(e){case`index`:return`@startuml
title "全体構成"
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

skinparam person<<Operator>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<PremisesHomeAgent>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataPbs>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam person<<User>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam database<<MonitoringVms>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ExternalEdgeTunnel>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
skinparam rectangle<<ExternalGrafana>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Oke>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<ControlArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesDataBackups>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<ExternalIdrive>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
person "==管理者" <<Operator>> as Operator
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "Talos / home-k8s" <<PremisesHome>> as PremisesHome {
    skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
    skinparam RectangleFontColor<<PremisesHome>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHome>> dashed

    rectangle "==自宅監視基盤\\n\\nvmagent・exporter・自宅VictoriaMetrics・PDC agent。OCI監視VMとは独立。" <<PremisesHomeAgent>> as PremisesHomeAgent
    rectangle "==Nextcloud" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
    rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
  }
  rectangle "保存・バックアップ" <<PremisesData>> as PremisesData {
    skinparam RectangleBorderColor<<PremisesData>> #737373
    skinparam RectangleFontColor<<PremisesData>> #737373
    skinparam RectangleBorderStyle<<PremisesData>> dashed

    database "==Proxmox Backup Server\\n\\nVMバックアップ。NFSのオンライン利用経路とは別。" <<PremisesDataPbs>> as PremisesDataPbs
    database "==TrueNAS VM ×2 / ZFS・NFS\\n\\n自宅Proxmoxの各ホストに1台ずつ、VM69001・69002。USB diskをpassthrough。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<PremisesDataNas>> as PremisesDataNas
    rectangle "==バックアップ処理" <<PremisesDataBackups>> as PremisesDataBackups
  }
}
rectangle "監視" <<Monitoring>> as Monitoring {
  skinparam RectangleBorderColor<<Monitoring>> #428a4f
  skinparam RectangleFontColor<<Monitoring>> #428a4f
  skinparam RectangleBorderStyle<<Monitoring>> dashed

  database "==OCI監視VM / STG・PRD\\n\\nOKEから独立したVM2台／環境へVictoriaMetrics・VictoriaLogsを配置。STG/PRDの定義ディレクトリとアカウントは分離。" <<MonitoringVms>> as MonitoringVms
}
person "==利用者" <<User>> as User
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "Cloudflare" <<ExternalEdge>> as ExternalEdge {
    skinparam RectangleBorderColor<<ExternalEdge>> #A35829
    skinparam RectangleFontColor<<ExternalEdge>> #A35829
    skinparam RectangleBorderStyle<<ExternalEdge>> dashed

    rectangle "==Cloudflare Tunnel\\n\\n自宅とSTG OKEのcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
    rectangle "==Access / 認証\\n\\n管理サービスをAccessで保護。WARPのprivate CIDR routeとは別の接続経路。" <<ExternalEdgeAccess>> as ExternalEdgeAccess
  }
  rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<ExternalBws>> as ExternalBws
  rectangle "==Grafana Cloud / PDC\\n\\nPDC agentが外向き接続を作り、Grafanaからprivate監視データを照会する。保存先は自宅VictoriaMetricsとOCI監視VM。" <<ExternalGrafana>> as ExternalGrafana
  database "==IDrive e2 / S3\\n\\nPBS datastore、DB logical dump、NAS restic、録画、VictoriaMetrics snapshotの保存先。用途・prefix・整合性を分ける。" <<ExternalIdrive>> as ExternalIdrive
}
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<ControlArgo>> as ControlArgo
}
rectangle "==OCI / STG OKE共通基盤\\n\\n東京リージョン。base workerとburst workerを使用し、AutoscalerはOKE内で動く。Re:VenterアプリとPRD OKE本体はreventerが所有。" <<Oke>> as Oke

Operator .[#6366f1,thickness=2].> ExternalEdgeAccess : <color:#6366f1>管理認証
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHomeNextcloud : <color:#15803d>公開hostname / 内部HTTP
ExternalEdgeAccess .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>Tunnel / 管理UI
ExternalEdgeTunnel .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>Access後 / 管理UI
ExternalBws .[#AC4D39,thickness=2].> PremisesHomeEso : <color:#AC4D39>Secret注入
ExternalBws .[#AC4D39,thickness=2].> Oke : <color:#AC4D39>Secret注入
Operator .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>照会
PremisesHomeAgent .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>外向きPDC接続
MonitoringVms .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>VM側PDC agentから外向き接続
ExternalGrafana .[#0ea5e9,thickness=2].> PremisesHomeAgent : <color:#0ea5e9>PDC経由の検索
ExternalGrafana .[#0ea5e9,thickness=2].> MonitoringVms : <color:#0ea5e9>PDC経由
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>html・data / NFS
PremisesHomeAgent .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>metrics用NFS PVC
PremisesHomeAgent .[#b45309,thickness=2].> PremisesDataBackups : <color:#b45309>snapshot / vmbackup
ExternalBws .[#AC4D39,thickness=2].> PremisesDataBackups : <color:#AC4D39>ESO経由 / backup credential
PremisesDataNas .[#b45309,thickness=2].> PremisesDataBackups : <color:#b45309>対象dataset / restic
PremisesDataPbs .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>S3 datastore / VM backup
PremisesDataBackups .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>用途別prefix / 暗号化・retention
User .[#15803d,thickness=2].> ExternalEdge : <color:#15803d>HTTPS
@enduml
`;case`home_apps`:return`@startuml
title "自宅のサービス・保存"
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
skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
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
skinparam rectangle<<PremisesHomeAppsAnnict_scraper>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
skinparam rectangle<<PremisesHomeDns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesDataDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
person "==利用者" <<User>> as User
rectangle "==Cloudflare\\n\\nDNS・Access・TunnelをTerraformで管理。公開経路と管理アクセスを認証ポリシーで分離。" <<ExternalEdge>> as ExternalEdge
rectangle "Talos / home-k8s" <<PremisesHome>> as PremisesHome {
  skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
  skinparam RectangleFontColor<<PremisesHome>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHome>> dashed

  rectangle "==Nextcloud" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
  rectangle "==録画・配信\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
  rectangle "宅内アプリ" <<PremisesHomeApps>> as PremisesHomeApps {
    skinparam RectangleBorderColor<<PremisesHomeApps>> #64748b
    skinparam RectangleFontColor<<PremisesHomeApps>> #64748b
    skinparam RectangleBorderStyle<<PremisesHomeApps>> dashed

    rectangle "==Coupon Manager" <<PremisesHomeAppsCoupon_manager>> as PremisesHomeAppsCoupon_manager
    rectangle "==Loockit" <<PremisesHomeAppsLoockit>> as PremisesHomeAppsLoockit
    rectangle "==Annict scraper" <<PremisesHomeAppsAnnict_scraper>> as PremisesHomeAppsAnnict_scraper
    rectangle "==MagicMirror" <<PremisesHomeAppsMagic_mirror>> as PremisesHomeAppsMagic_mirror
    rectangle "==Wake-on-LAN" <<PremisesHomeAppsWol>> as PremisesHomeAppsWol
  }
  rectangle "==内部DNS / MetalLB\\n\\nmiutaku.internalはCoreDNS。MetalLBでLAN内Service IPを払い出す。" <<PremisesHomeDns>> as PremisesHomeDns
}
rectangle "保存・バックアップ" <<PremisesData>> as PremisesData {
  skinparam RectangleBorderColor<<PremisesData>> #737373
  skinparam RectangleFontColor<<PremisesData>> #737373
  skinparam RectangleBorderStyle<<PremisesData>> dashed

  rectangle "==DB / アプリ共有基盤" <<PremisesDataDatabases>> as PremisesDataDatabases
  database "==TrueNAS VM ×2 / ZFS・NFS\\n\\n自宅Proxmoxの各ホストに1台ずつ、VM69001・69002。USB diskをpassthrough。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<PremisesDataNas>> as PremisesDataNas
}

User .[#15803d,thickness=2].> ExternalEdge : <color:#15803d>HTTPS
ExternalEdge .[#15803d,thickness=2].> PremisesHomeNextcloud : <color:#15803d>公開hostname / 内部HTTP
ExternalEdge .[#15803d,thickness=2].> PremisesHomeRecording : <color:#15803d>公開hostname / 内部HTTP
ExternalEdge .[#15803d,thickness=2].> PremisesHomeAppsCoupon_manager : <color:#15803d>公開hostname / 内部HTTP
ExternalEdge .[#15803d,thickness=2].> PremisesHomeAppsLoockit : <color:#15803d>内部接続
PremisesHomeRecording .[#15803d,thickness=2].> PremisesHomeAppsAnnict_scraper : <color:#15803d>番組照合
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>html・data / NFS
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>録画・thumbnail・drop / NFS
PremisesHomeAppsCoupon_manager .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>images・Data Protection keys / PVC
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>MYSQL_HOST / MariaDB
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>[...]
PremisesHomeAppsCoupon_manager .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>PostgreSQL
PremisesDataDatabases .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>DB用NFS PVC
@enduml
`;case`delivery`:return`@startuml
title "変更・デプロイ"
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

skinparam rectangle<<ControlReviews>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlImages>>{
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
skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ControlRunner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlTfc_agents>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlPacker>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlAnsible>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<MonitoringVms>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<OkeArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeScale>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Reventer>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<OkeApi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHome>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHardware>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==Re:Venterの一時レビュー\\n\\nreventerだけTalosから非公開配信。my-infraの本番・レビューはGitHub Pages。" <<ControlReviews>> as ControlReviews
  rectangle "==Image Updater" <<ControlImages>> as ControlImages
  rectangle "==ARC / 専用runner\\n\\n実行目的ごとにrunnerを分離。構成モデルAIはPlusログイン専用Pod、公開・比較のビルドはGitHub-hosted runner。" <<ControlRunner>> as ControlRunner
  rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<ControlArgo>> as ControlArgo
  rectangle "==Terraform Cloud agents / 自宅\\n\\nクラウドのworkspaceから処理を受け取る自宅のagent。Terraform Cloudサービスとは配置を分ける。" <<ControlTfc_agents>> as ControlTfc_agents
  rectangle "==Packer / VM template" <<ControlPacker>> as ControlPacker
  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<ControlAnsible>> as ControlAnsible
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ExternalGithub>> as ExternalGithub
  rectangle "==Terraform Cloud\\n\\nworkspaceごとにplan/apply。Proxmox・Talos・OCI・Cloudflareを管理する。" <<ExternalTerraform_cloud>> as ExternalTerraform_cloud
  rectangle "==Cloudflare\\n\\nDNS・Access・TunnelをTerraformで管理。公開経路と管理アクセスを認証ポリシーで分離。" <<ExternalEdge>> as ExternalEdge
}
rectangle "監視" <<Monitoring>> as Monitoring {
  skinparam RectangleBorderColor<<Monitoring>> #428a4f
  skinparam RectangleFontColor<<Monitoring>> #428a4f
  skinparam RectangleBorderStyle<<Monitoring>> dashed

  database "==OCI監視VM / STG・PRD\\n\\nOKEから独立したVM2台／環境へVictoriaMetrics・VictoriaLogsを配置。STG/PRDの定義ディレクトリとアカウントは分離。" <<MonitoringVms>> as MonitoringVms
}
rectangle "OCI / STG OKE共通基盤" <<Oke>> as Oke {
  skinparam RectangleBorderColor<<Oke>> #3b82f6
  skinparam RectangleFontColor<<Oke>> #3b82f6
  skinparam RectangleBorderStyle<<Oke>> dashed

  rectangle "==OKE ArgoCD\\n\\nSTG OKE共通インフラを同期。Re:Venterアプリは自宅ArgoCDが同期。" <<OkeArgo>> as OkeArgo
  rectangle "==Cluster Autoscaler\\n\\nburst poolを需要で増減。自宅Talos停止に依存しない。" <<OkeScale>> as OkeScale
  rectangle "==OKE API / Node pools" <<OkeApi>> as OkeApi
}
rectangle "==Re:Venter / STG・PRD\\n\\nアプリ・PRD OKE・アプリ用ネットワークは別リポジトリで管理。本図は所有境界と管理関係を示す。" <<Reventer>> as Reventer
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "==Talos / home-k8s\\n\\nTalos。CP VM3台・worker VM2台をProxmox2ホストへ配置し、RPi worker2台を追加。Podの配置は動的。" <<PremisesHome>> as PremisesHome
  rectangle "==物理・ネットワーク" <<PremisesHardware>> as PremisesHardware
}

ExternalGithub .[#6366f1,thickness=2].> ControlRunner : <color:#6366f1>Actions job
ExternalGithub .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>GitOps
ExternalGithub .[#6366f1,thickness=2].> ExternalTerraform_cloud : <color:#6366f1>Terraform実行
ExternalTerraform_cloud .[#6366f1,thickness=2].> ControlTfc_agents : <color:#6366f1>workspace runを自宅agentで実行
ControlArgo .[#6366f1,thickness=2].> PremisesHome : <color:#6366f1>manifest同期
ExternalGithub .[#6366f1,thickness=2].> OkeArgo : <color:#6366f1>GitOps
OkeArgo .[#6366f1,thickness=2].> OkeApi : <color:#6366f1>共通基盤同期
OkeScale .[#6366f1,thickness=2].> OkeApi : <color:#6366f1>burst pool増減
ControlArgo .[#6366f1,thickness=2].> Reventer : <color:#6366f1>STG・PRDアプリ同期
ControlTfc_agents .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>VM / ネットワーク
ControlPacker .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>VM template
ControlAnsible .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>機器設定
ExternalTerraform_cloud .[#6366f1,thickness=2].> ExternalEdge : <color:#6366f1>DNS / Access / Tunnel
ExternalTerraform_cloud .[#6366f1,thickness=2].> MonitoringVms : <color:#6366f1>監視VM
ExternalTerraform_cloud .[#6366f1,thickness=2].> Oke : <color:#6366f1>OCI / OKE
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
skinparam rectangle<<OkeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ReventerPlatformExternal_secrets>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlAnsible>>{
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
  rectangle "==Terraform Cloud\\n\\nworkspaceごとにplan/apply。Proxmox・Talos・OCI・Cloudflareを管理する。" <<ExternalTerraform_cloud>> as ExternalTerraform_cloud
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "Talos / home-k8s" <<PremisesHome>> as PremisesHome {
    skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
    skinparam RectangleFontColor<<PremisesHome>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHome>> dashed

    rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
  }
  rectangle "保存・バックアップ" <<PremisesData>> as PremisesData {
    skinparam RectangleBorderColor<<PremisesData>> #737373
    skinparam RectangleFontColor<<PremisesData>> #737373
    skinparam RectangleBorderStyle<<PremisesData>> dashed

    rectangle "==バックアップ処理" <<PremisesDataBackups>> as PremisesDataBackups
  }
}
rectangle "OCI / STG OKE共通基盤" <<Oke>> as Oke {
  skinparam RectangleBorderColor<<Oke>> #3b82f6
  skinparam RectangleFontColor<<Oke>> #3b82f6
  skinparam RectangleBorderStyle<<Oke>> dashed

  rectangle "==External Secrets Operator" <<OkeEso>> as OkeEso
}
rectangle "Re:Venter / STG・PRD" <<Reventer>> as Reventer {
  skinparam RectangleBorderColor<<Reventer>> #3b82f6
  skinparam RectangleFontColor<<Reventer>> #3b82f6
  skinparam RectangleBorderStyle<<Reventer>> dashed

  rectangle "==ESO / PRD共通基盤" <<ReventerPlatformExternal_secrets>> as ReventerPlatformExternal_secrets
}
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<ControlAnsible>> as ControlAnsible
}

ExternalBws .[#AC4D39,thickness=2].> PremisesHomeEso : <color:#AC4D39>Secret注入
ExternalBws .[#AC4D39,thickness=2].> OkeEso : <color:#AC4D39>Secret注入
ExternalBws .[#AC4D39,thickness=2].> ReventerPlatformExternal_secrets : <color:#AC4D39>ESO / PRD Secret注入
ExternalBws .[#AC4D39,thickness=2].> ExternalGithub : <color:#AC4D39>CI credential
ExternalBws .[#AC4D39,thickness=2].> ExternalTerraform_cloud : <color:#AC4D39>Terraform変数
ExternalBws .[#AC4D39,thickness=2].> ControlAnsible : <color:#AC4D39>機器・PBS用credential
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
skinparam rectangle<<ReventerCollectors>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
skinparam database<<MonitoringVms>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
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
rectangle "Re:Venter / STG・PRD" <<Reventer>> as Reventer {
  skinparam RectangleBorderColor<<Reventer>> #3b82f6
  skinparam RectangleFontColor<<Reventer>> #3b82f6
  skinparam RectangleBorderStyle<<Reventer>> dashed

  rectangle "==STG・PRD監視collector\\n\\nreventer側monitoring manifestsを自宅ArgoCDが同期する。" <<ReventerCollectors>> as ReventerCollectors
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==Grafana Cloud / PDC\\n\\nPDC agentが外向き接続を作り、Grafanaからprivate監視データを照会する。保存先は自宅VictoriaMetricsとOCI監視VM。" <<ExternalGrafana>> as ExternalGrafana
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
      skinparam RectangleBorderColor<<PremisesHomeAgent>> #64748b
      skinparam RectangleFontColor<<PremisesHomeAgent>> #64748b
      skinparam RectangleBorderStyle<<PremisesHomeAgent>> dashed

      rectangle "==exporter群\\n\\nnode・PVE・SNMP・NUT・TinyTuya・blackbox・speedtest。個別Applicationを内部に保持。" <<PremisesHomeAgentExporters>> as PremisesHomeAgentExporters
      rectangle "==PDC agent / 自宅" <<PremisesHomeAgentPdc>> as PremisesHomeAgentPdc
      rectangle "==vmagent / scrape・remoteWrite" <<PremisesHomeAgentCollector>> as PremisesHomeAgentCollector
      database "==VictoriaMetrics / 自宅\\n\\n自宅のmetricsは自宅VictoriaMetricsに保存。OCI側VMへの送信とは別。" <<PremisesHomeAgentLocal_store>> as PremisesHomeAgentLocal_store
    }
  }
}
rectangle "監視" <<Monitoring>> as Monitoring {
  skinparam RectangleBorderColor<<Monitoring>> #428a4f
  skinparam RectangleFontColor<<Monitoring>> #428a4f
  skinparam RectangleBorderStyle<<Monitoring>> dashed

  database "==OCI監視VM / STG・PRD\\n\\nOKEから独立したVM2台／環境へVictoriaMetrics・VictoriaLogsを配置。STG/PRDの定義ディレクトリとアカウントは分離。" <<MonitoringVms>> as MonitoringVms
}

Operator .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>照会
PremisesHardware .[#b45309,thickness=2].> PremisesHomeAgentCollector : <color:#b45309>exporter収集
PremisesHomeAgentCollector .[#b45309,thickness=2].> PremisesHomeAgentLocal_store : <color:#b45309>remoteWrite / :8428
ExternalGrafana .[#0ea5e9,thickness=2].> PremisesHomeAgentPdc : <color:#0ea5e9>PDC経由の検索
PremisesHomeAgentPdc .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>外向きPDC接続
PremisesHomeAgentPdc .[#0ea5e9,thickness=2].> PremisesHomeAgentLocal_store : <color:#0ea5e9>private query / :8428
PremisesHomeAgentExporters .[#b45309,thickness=2].> PremisesHomeAgentCollector : <color:#b45309>scrape
ExternalGrafana .[#0ea5e9,thickness=2].> MonitoringVms : <color:#0ea5e9>PDC経由
ReventerCollectors .[#b45309,thickness=2].> MonitoringVms : <color:#b45309>[...]
MonitoringVms .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>VM側PDC agentから外向き接続
@enduml
`;case`network`:return`@startuml
title "LAN・Tunnel・WARP・OCI"
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
skinparam rectangle<<PremisesHardwareLb>>{
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
skinparam rectangle<<PremisesHomePlatformCloudflared>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeWorkers>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeWarp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeNetworkPrivate_workers>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeNetworkNat>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeNetworkService_gateway>>{
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
skinparam rectangle<<ExternalInternet>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalOracle>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdgeRoutes>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeNetworkIgw>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeNetworkPublic_api>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareRouter>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareWifi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareUnifi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLanServer>>{
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
person "==管理者" <<Operator>> as Operator
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
    skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
    skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHardware>> dashed

    rectangle "==HAProxy / Keepalived ×2\\n\\nVM10001・10002。Terraform/PVEとAnsible/load-balancerで管理。" <<PremisesHardwareLb>> as PremisesHardwareLb
    rectangle "==IX2215 / VLAN\\n\\nnative・管理・server・client・guest・IoTを分離。guest VLANから他VLANは到達不可。" <<PremisesHardwareRouter>> as PremisesHardwareRouter
    rectangle "==Wi-Fi AP" <<PremisesHardwareWifi>> as PremisesHardwareWifi
    rectangle "==UniFi OS Server" <<PremisesHardwareUnifi>> as PremisesHardwareUnifi
  }
  rectangle "Talos / home-k8s" <<PremisesHome>> as PremisesHome {
    skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
    skinparam RectangleFontColor<<PremisesHome>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHome>> dashed

    rectangle "内部DNS / MetalLB" <<PremisesHomeDns>> as PremisesHomeDns {
      skinparam RectangleBorderColor<<PremisesHomeDns>> #64748b
      skinparam RectangleFontColor<<PremisesHomeDns>> #64748b
      skinparam RectangleBorderStyle<<PremisesHomeDns>> dashed

      rectangle "==CoreDNS / miutaku.internal" <<PremisesHomeDnsCoredns>> as PremisesHomeDnsCoredns
      rectangle "==MetalLB / LANのService IP" <<PremisesHomeDnsMetallb>> as PremisesHomeDnsMetallb
    }
    rectangle "==cloudflared / 自宅connector" <<PremisesHomePlatformCloudflared>> as PremisesHomePlatformCloudflared
  }
  rectangle "LAN / VLAN・経路" <<PremisesLan>> as PremisesLan {
    skinparam RectangleBorderColor<<PremisesLan>> #3b82f6
    skinparam RectangleFontColor<<PremisesLan>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesLan>> dashed

    rectangle "==VLAN20 / 192.168.20.0/24" <<PremisesLanServer>> as PremisesLanServer
    rectangle "==native / 192.168.0.0/24" <<PremisesLanNative>> as PremisesLanNative
    rectangle "==VLAN10 / 192.168.10.0/24" <<PremisesLanManagement>> as PremisesLanManagement
    rectangle "==VLAN30 / 192.168.30.0/24" <<PremisesLanClient>> as PremisesLanClient
    rectangle "==VLAN31 / guest\\n\\n他VLANへの通信は不可。全VLAN間を到達可能として描かない。" <<PremisesLanGuest>> as PremisesLanGuest
    rectangle "==VLAN40 / 192.168.40.0/24" <<PremisesLanIot>> as PremisesLanIot
  }
}
rectangle "OCI / STG OKE共通基盤" <<Oke>> as Oke {
  skinparam RectangleBorderColor<<Oke>> #3b82f6
  skinparam RectangleFontColor<<Oke>> #3b82f6
  skinparam RectangleBorderStyle<<Oke>> dashed

  rectangle "==base / burst node pool\\n\\nworker compartmentの権限はAutoscalerへ限定。control plane・公開APIと区別する。" <<OkeWorkers>> as OkeWorkers
  rectangle "OCI network" <<OkeNetwork>> as OkeNetwork {
    skinparam RectangleBorderColor<<OkeNetwork>> #64748b
    skinparam RectangleFontColor<<OkeNetwork>> #64748b
    skinparam RectangleBorderStyle<<OkeNetwork>> dashed

    rectangle "==private worker subnet" <<OkeNetworkPrivate_workers>> as OkeNetworkPrivate_workers
    rectangle "==NAT gateway / reserved IP" <<OkeNetworkNat>> as OkeNetworkNat
    rectangle "==Service Gateway / Oracle Services" <<OkeNetworkService_gateway>> as OkeNetworkService_gateway
    rectangle "==Internet gateway" <<OkeNetworkIgw>> as OkeNetworkIgw
    rectangle "==公開API・LB subnet" <<OkeNetworkPublic_api>> as OkeNetworkPublic_api
  }
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "Cloudflare" <<ExternalEdge>> as ExternalEdge {
    skinparam RectangleBorderColor<<ExternalEdge>> #A35829
    skinparam RectangleFontColor<<ExternalEdge>> #A35829
    skinparam RectangleBorderStyle<<ExternalEdge>> dashed

    rectangle "==WARP / private CIDR routes\\n\\nCloudflare One Clientからprivate CIDRへ。公開hostnameのTunnel/Accessとは別。" <<ExternalEdgeWarp>> as ExternalEdgeWarp
    rectangle "==Access / 認証\\n\\n管理サービスをAccessで保護。WARPのprivate CIDR routeとは別の接続経路。" <<ExternalEdgeAccess>> as ExternalEdgeAccess
    rectangle "==Cloudflare Tunnel\\n\\n自宅とSTG OKEのcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
    rectangle "==公開hostname / 設定から抽出" <<ExternalEdgeRoutes>> as ExternalEdgeRoutes
  }
  rectangle "==Internet" <<ExternalInternet>> as ExternalInternet
  rectangle "==Oracle Services Network" <<ExternalOracle>> as ExternalOracle
}

Operator .[#6366f1,thickness=2].> ExternalEdgeAccess : <color:#6366f1>管理認証
ExternalEdgeTunnel .[#8D8D8D,thickness=2].> ExternalEdgeRoutes : <color:#8D8D8D>hostname転送
ExternalEdgeAccess .[#6366f1,thickness=2].> ExternalEdgeRoutes : <color:#6366f1>Access policy
ExternalEdgeWarp .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>private CIDR routes / WARP policy
ExternalEdgeRoutes .[#6366f1,thickness=2].> PremisesHardwareRouter : <color:#6366f1>認証後の内部接続
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanNative : <color:#8D8D8D>native IF
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanManagement : <color:#8D8D8D>BVI10
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>BVI20
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanClient : <color:#8D8D8D>BVI30
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanGuest : <color:#8D8D8D>BVI31 / 他VLAN拒否
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanIot : <color:#8D8D8D>BVI40
ExternalEdgeRoutes .[#6366f1,thickness=2].> PremisesHardwareWifi : <color:#6366f1>認証後の内部接続
ExternalEdgeRoutes .[#6366f1,thickness=2].> PremisesHardwareUnifi : <color:#6366f1>認証後の内部接続
PremisesHomePlatformCloudflared .[#0ea5e9,thickness=2].> ExternalEdgeTunnel : <color:#0ea5e9>外向きTunnel接続
OkeWorkers .[#8D8D8D,thickness=2].> OkeNetworkPrivate_workers : <color:#8D8D8D>private subnet / 10.0.2.0/24
OkeNetworkIgw .[#8D8D8D,thickness=2].> OkeNetworkPublic_api : <color:#8D8D8D>public route table
OkeNetworkPrivate_workers .[#8D8D8D,thickness=2].> OkeNetworkNat : <color:#8D8D8D>default route
OkeNetworkPrivate_workers .[#8D8D8D,thickness=2].> OkeNetworkService_gateway : <color:#8D8D8D>Oracle service CIDR route
OkeNetworkNat .[#8D8D8D,thickness=2].> ExternalInternet : <color:#8D8D8D>NAT / reserved IPv4
ExternalInternet .[#8D8D8D,thickness=2].> OkeNetworkIgw : <color:#8D8D8D>公開API・LBへの到達
OkeNetworkService_gateway .[#8D8D8D,thickness=2].> ExternalOracle : <color:#8D8D8D>Oracle Services Network
PremisesHardwareRouter .[#15803d,thickness=2].> PremisesHomeDns : <color:#15803d>LAN / 内部DNS
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
`;case`placement`:return`@startuml
title "所有境界"
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

skinparam database<<HomeSiteX570Nas1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSiteX570Pbs>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSiteB550mNas2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteTalos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<Stg>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<Prd>>{
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

    database "==TrueNAS VM69001 / nas-01\\n\\npve-x570のVM。USB disk passthrough上のZFS datasetをNFS公開。runner cacheを保存。" <<HomeSiteX570Nas1>> as HomeSiteX570Nas1
    database "==PBS VM14001 / 手動退避\\n\\nVMバックアップ。NFSのオンライン利用経路とは別。" <<HomeSiteX570Pbs>> as HomeSiteX570Pbs
  }
  rectangle "pve-b550m" <<HomeSiteB550m>> as HomeSiteB550m {
    skinparam RectangleBorderColor<<HomeSiteB550m>> #428a4f
    skinparam RectangleFontColor<<HomeSiteB550m>> #428a4f
    skinparam RectangleBorderStyle<<HomeSiteB550m>> dashed

    database "==TrueNAS VM69002 / nas-02\\n\\npve-b550mのVM。USB disk passthrough上のZFS datasetをNFS公開。アプリ・DB・監視のデータを保存。" <<HomeSiteB550mNas2>> as HomeSiteB550mNas2
  }
  rectangle "==home-k8s\\n\\nVMとRPiにまたがるクラスタ。PVEホストとクラスタを入れ子にしてPod配置を固定しない。" <<HomeSiteTalos>> as HomeSiteTalos
}
rectangle "==OCI / STG OKE共通基盤" <<Stg>> as Stg
rectangle "==PRD OKE / 本体reventer所有・共通アドオンmy-infra\\n\\n別リポジトリ管理。モデルで所有境界を維持する。" <<Prd>> as Prd
@enduml
`;case`media`:return`@startuml
title "制御・変換・保存"
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

skinparam rectangle<<PremisesHomeRecordingEpgstation>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingAnnict_sync>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingMirakurun_staging>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAppsAnnict_scraper>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareTuner_stg>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastationGateway>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalAnnict>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastationFrontend>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastationBackend>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingMirakurun>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastationEncode>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastationStreaming>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareTuner_prod>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesDataDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastationMediamtx>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "録画・配信" <<PremisesHomeRecording>> as PremisesHomeRecording {
  skinparam RectangleBorderColor<<PremisesHomeRecording>> #64748b
  skinparam RectangleFontColor<<PremisesHomeRecording>> #64748b
  skinparam RectangleBorderStyle<<PremisesHomeRecording>> dashed

  rectangle "==EPGStation" <<PremisesHomeRecordingEpgstation>> as PremisesHomeRecordingEpgstation
  rectangle "==Annict録画同期 / CronJob" <<PremisesHomeRecordingAnnict_sync>> as PremisesHomeRecordingAnnict_sync
  rectangle "==Mirakurun Service / STG LXCへの中継" <<PremisesHomeRecordingMirakurun_staging>> as PremisesHomeRecordingMirakurun_staging
  rectangle "TNLaStation / 共通モデル" <<PremisesHomeRecordingTnlastation>> as PremisesHomeRecordingTnlastation {
    skinparam RectangleBorderColor<<PremisesHomeRecordingTnlastation>> #3b82f6
    skinparam RectangleFontColor<<PremisesHomeRecordingTnlastation>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHomeRecordingTnlastation>> dashed

    rectangle "==Gateway" <<PremisesHomeRecordingTnlastationGateway>> as PremisesHomeRecordingTnlastationGateway
    rectangle "==Frontend" <<PremisesHomeRecordingTnlastationFrontend>> as PremisesHomeRecordingTnlastationFrontend
    rectangle "==Backend / API・録画制御" <<PremisesHomeRecordingTnlastationBackend>> as PremisesHomeRecordingTnlastationBackend
    rectangle "==ffmpeg encode worker" <<PremisesHomeRecordingTnlastationEncode>> as PremisesHomeRecordingTnlastationEncode
    rectangle "==ffmpeg streaming worker" <<PremisesHomeRecordingTnlastationStreaming>> as PremisesHomeRecordingTnlastationStreaming
    rectangle "==MediaMTX / HLS配信" <<PremisesHomeRecordingTnlastationMediamtx>> as PremisesHomeRecordingTnlastationMediamtx
  }
  rectangle "==Mirakurun Service / 本番LXCへの中継" <<PremisesHomeRecordingMirakurun>> as PremisesHomeRecordingMirakurun
}
rectangle "==Annict scraper" <<PremisesHomeAppsAnnict_scraper>> as PremisesHomeAppsAnnict_scraper
rectangle "==Mirakurun STG LXC / CT12904・PX-S1UD\\n\\nGRはlocal tuner、BS/CSは本番Mirakurunへの低優先度TCP fallback。" <<PremisesHardwareTuner_stg>> as PremisesHardwareTuner_stg
rectangle "==Annict API" <<ExternalAnnict>> as ExternalAnnict
rectangle "==Mirakurun LXC / CT12901・PT3" <<PremisesHardwareTuner_prod>> as PremisesHardwareTuner_prod
rectangle "==DB / アプリ共有基盤" <<PremisesDataDatabases>> as PremisesDataDatabases
database "==TrueNAS VM ×2 / ZFS・NFS\\n\\n自宅Proxmoxの各ホストに1台ずつ、VM69001・69002。USB diskをpassthrough。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<PremisesDataNas>> as PremisesDataNas

PremisesHomeRecordingEpgstation .[#15803d,thickness=2].> PremisesHomeRecordingMirakurun : <color:#15803d>tuner API
PremisesHomeRecordingAnnict_sync .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationBackend : <color:#15803d>録画登録API
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingMirakurun : <color:#15803d>tuner API
PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationFrontend : <color:#15803d>Web
PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationBackend : <color:#15803d>API
PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationMediamtx : <color:#15803d>HLS
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationEncode : <color:#15803d>encode制御
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationStreaming : <color:#15803d>streaming制御
PremisesHomeRecordingTnlastationStreaming .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationMediamtx : <color:#15803d>配信
PremisesHomeRecordingMirakurun .[#15803d,thickness=2].> PremisesHardwareTuner_prod : <color:#15803d>EndpointSlice / 外部LXC
PremisesHomeRecordingMirakurun_staging .[#15803d,thickness=2].> PremisesHardwareTuner_stg : <color:#15803d>EndpointSlice / 外部LXC
PremisesHardwareTuner_stg .[#15803d,thickness=2].> PremisesHardwareTuner_prod : <color:#15803d>BS/CS TCP fallback
PremisesHomeRecordingAnnict_sync .[#15803d,thickness=2].> PremisesHomeAppsAnnict_scraper : <color:#15803d>番組照合
PremisesHomeAppsAnnict_scraper .[#15803d,thickness=2].> ExternalAnnict : <color:#15803d>Annict API
PremisesHomeRecordingEpgstation .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>EPGStation DB
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>PostgreSQL
PremisesHomeRecordingTnlastationEncode .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>encode状態
PremisesDataDatabases .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>DB用NFS PVC
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>録画・thumbnail・drop / NFS
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