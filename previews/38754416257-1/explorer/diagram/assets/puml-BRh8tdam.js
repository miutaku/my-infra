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
skinparam database<<MonitoringVms>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
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
skinparam rectangle<<Oke>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<Shared_prd>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
}
skinparam rectangle<<Control>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesDataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
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
person "==利用者" <<User>> as User
person "==管理者" <<Operator>> as Operator
rectangle "監視" <<Monitoring>> as Monitoring {
  skinparam RectangleBorderColor<<Monitoring>> #428a4f
  skinparam RectangleFontColor<<Monitoring>> #428a4f
  skinparam RectangleBorderStyle<<Monitoring>> dashed

  database "==OCI監視VM / STG・PRD\\n\\nOKEから独立したVM2台／環境へVictoriaMetrics・VictoriaLogsを配置。STG/PRDの定義ディレクトリとアカウントは分離。" <<MonitoringVms>> as MonitoringVms
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "Cloudflare" <<ExternalEdge>> as ExternalEdge {
    skinparam RectangleBorderColor<<ExternalEdge>> #A35829
    skinparam RectangleFontColor<<ExternalEdge>> #A35829
    skinparam RectangleBorderStyle<<ExternalEdge>> dashed

    rectangle "==Cloudflare Access / 共通の認証入口\\n\\n利用・管理の公開UIを原則Accessで保護。mTLS専用API、WARPのprivate CIDR routeとは区別する。" <<ExternalEdgeAccess>> as ExternalEdgeAccess
    rectangle "==Cloudflare Tunnel\\n\\n自宅とSTG OKEのcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
  }
  rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<ExternalBws>> as ExternalBws
}
rectangle "==OCI / STG OKE共通基盤\\n\\n東京リージョン。base workerとburst workerを使用し、AutoscalerはOKE内で動く。Re:VenterアプリとPRD OKE本体はreventerが所有。" <<Oke>> as Oke
rectangle "==PRDクラスタへ提供する共通アドオン\\n\\n外部所有クラスタに提供するControllerと共通設定。クラスタ本体や利用側のアプリ構成をmy-infraの所有として扱わない。" <<Shared_prd>> as Shared_prd
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
  rectangle "==Talos / home-k8s\\n\\nTalos。CP VM3台・worker VM2台をProxmox2ホストへ配置し、RPi worker2台を追加。Podの配置は動的。" <<PremisesHome>> as PremisesHome
}
rectangle "==変更・運用" <<Control>> as Control
rectangle "基盤の利用側 / 別リポジトリ" <<Consumers>> as Consumers {
  skinparam RectangleBorderColor<<Consumers>> #64748b
  skinparam RectangleFontColor<<Consumers>> #64748b
  skinparam RectangleBorderStyle<<Consumers>> dashed

  rectangle "==Re:Venter\\n\\n基盤を利用するワークロードの一つ。アプリ内部・PRDクラスタ本体・アプリ固有のGateway/HTTPRouteはreventerで管理する。" <<ConsumersReventer>> as ConsumersReventer
}

User .[#15803d,thickness=2].> ExternalEdgeAccess : <color:#15803d>HTTPS / 利用時の認証
Operator .[#6366f1,thickness=2].> ExternalEdgeAccess : <color:#6366f1>HTTPS / 管理時の認証
ExternalEdgeAccess .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>Access認証後の転送
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHome : <color:#15803d>Access認証後 / 公開UI・サービス
ExternalBws .[#AC4D39,thickness=2].> PremisesHome : <color:#AC4D39>Secret注入
ExternalEdgeTunnel .[#6366f1,thickness=2].> PremisesDataNas : <color:#6366f1>Access認証後 / NAS管理UI
PremisesDataNas .[#8D8D8D,thickness=2].> PremisesHome : <color:#8D8D8D>NFSストレージを提供
ExternalBws .[#AC4D39,thickness=2].> Oke : <color:#AC4D39>Secret注入
ExternalBws .[#AC4D39,thickness=2].> Shared_prd : <color:#AC4D39>ESO / PRD Secret注入
ExternalEdgeTunnel .[#6366f1,thickness=2].> Control : <color:#6366f1>Access認証後 / 管理UI
ExternalBws .[#AC4D39,thickness=2].> Control : <color:#AC4D39>機器・PBS用credential
Oke .[#8D8D8D,thickness=2].> ConsumersReventer : <color:#8D8D8D>STGの実行基盤を提供
Shared_prd .[#8D8D8D,thickness=2].> ConsumersReventer : <color:#8D8D8D>共有Gateway Controllerを提供
MonitoringVms .[#8D8D8D,thickness=2].> ConsumersReventer : <color:#8D8D8D>監視データの保存先を提供
Control .[#8D8D8D,thickness=2].> ConsumersReventer : <color:#8D8D8D>GitOps・CI・Terraformの実行基盤を提供
@enduml
`;case`home_apps`:return`@startuml
title "自宅基盤・利用するサービス"
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
skinparam rectangle<<PremisesHomeDns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
person "==管理者" <<Operator>> as Operator
rectangle "==Cloudflare Access / 共通の認証入口\\n\\n利用・管理の公開UIを原則Accessで保護。mTLS専用API、WARPのprivate CIDR routeとは区別する。" <<ExternalEdgeAccess>> as ExternalEdgeAccess
rectangle "==Cloudflare Tunnel\\n\\n自宅とSTG OKEのcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
rectangle "Talos / home-k8s" <<PremisesHome>> as PremisesHome {
  skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
  skinparam RectangleFontColor<<PremisesHome>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHome>> dashed

  rectangle "==内部DNS / MetalLB\\n\\nmiutaku.internalはCoreDNS。MetalLBでLAN内Service IPを払い出す。" <<PremisesHomeDns>> as PremisesHomeDns
  rectangle "==Nextcloud" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
  rectangle "==録画・配信\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
  rectangle "==自宅ワークロード / 基盤の利用側\\n\\nLoockit・Coupon Manager・Wake-on-LAN・Annict連携など。全Applicationとリソースは自動抽出一覧から確認できる。" <<PremisesHomeApps>> as PremisesHomeApps
}
rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<ControlArgo>> as ControlArgo
rectangle "==DB / アプリ共有基盤" <<PremisesDataDatabases>> as PremisesDataDatabases
database "==TrueNAS VM ×2 / ZFS・NFS\\n\\n自宅Proxmoxの各ホストに1台ずつ、VM69001・69002。USB diskをpassthrough。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<PremisesDataNas>> as PremisesDataNas

User .[#15803d,thickness=2].> ExternalEdgeAccess : <color:#15803d>HTTPS / 利用時の認証
Operator .[#6366f1,thickness=2].> ExternalEdgeAccess : <color:#6366f1>HTTPS / 管理時の認証
ExternalEdgeAccess .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>Access認証後の転送
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHomeNextcloud : <color:#15803d>Access認証後 / 公開UI・サービス
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHomeRecording : <color:#15803d>Access認証後 / 公開UI・サービス
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHomeApps : <color:#15803d>Access認証後 / 公開UI・サービス
ExternalEdgeTunnel .[#6366f1,thickness=2].> PremisesDataNas : <color:#6366f1>Access認証後 / NAS管理UI
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>html・data / NFS
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>録画・thumbnail・drop / NFS
PremisesHomeApps .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>images・Data Protection keys / PVC
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>MYSQL_HOST / MariaDB
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>[...]
PremisesHomeApps .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>PostgreSQL
PremisesDataDatabases .[#15803d,thickness=2].> PremisesDataNas : <color:#15803d>DB用NFS PVC
ExternalEdgeTunnel .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>Access認証後 / 管理UI
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
skinparam rectangle<<ExternalGithub_pages>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Shared_prd>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
}
skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ControlArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlRunner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlTfc_agents>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlAnsible>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlPacker>>{
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
skinparam rectangle<<OkeApi>>{
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
skinparam rectangle<<PremisesHardware>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==Image Updater" <<ControlImages>> as ControlImages
  rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<ControlArgo>> as ControlArgo
  rectangle "==ARC / 専用runner\\n\\n実行目的ごとにrunnerを分離。構成モデルAIはPlusログイン専用Pod、公開・比較のビルドはGitHub-hosted runner。" <<ControlRunner>> as ControlRunner
  rectangle "==Terraform Cloud agents / 自宅\\n\\nクラウドのworkspaceから処理を受け取る自宅のagent。Terraform Cloudサービスとは配置を分ける。" <<ControlTfc_agents>> as ControlTfc_agents
  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<ControlAnsible>> as ControlAnsible
  rectangle "==Packer / VM template" <<ControlPacker>> as ControlPacker
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ExternalGithub>> as ExternalGithub
  rectangle "==Terraform Cloud\\n\\nworkspaceごとにplan/apply。Proxmox・Talos・OCI・Cloudflareを管理する。" <<ExternalTerraform_cloud>> as ExternalTerraform_cloud
  rectangle "==GitHub Pages / my-infra図・レビュー" <<ExternalGithub_pages>> as ExternalGithub_pages
  rectangle "==Cloudflare\\n\\n自宅サービスの公開入口は原則Accessで認証してTunnelへ転送。mTLS専用APIとWARP/LAN経路は別に示す。" <<ExternalEdge>> as ExternalEdge
}
rectangle "==PRDクラスタへ提供する共通アドオン\\n\\n外部所有クラスタに提供するControllerと共通設定。クラスタ本体や利用側のアプリ構成をmy-infraの所有として扱わない。" <<Shared_prd>> as Shared_prd
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
  rectangle "==OKE API / Node pools" <<OkeApi>> as OkeApi
}
rectangle "基盤の利用側 / 別リポジトリ" <<Consumers>> as Consumers {
  skinparam RectangleBorderColor<<Consumers>> #64748b
  skinparam RectangleFontColor<<Consumers>> #64748b
  skinparam RectangleBorderStyle<<Consumers>> dashed

  rectangle "==Re:Venter\\n\\n基盤を利用するワークロードの一つ。アプリ内部・PRDクラスタ本体・アプリ固有のGateway/HTTPRouteはreventerで管理する。" <<ConsumersReventer>> as ConsumersReventer
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "==Talos / home-k8s\\n\\nTalos。CP VM3台・worker VM2台をProxmox2ホストへ配置し、RPi worker2台を追加。Podの配置は動的。" <<PremisesHome>> as PremisesHome
  rectangle "==物理・ネットワーク" <<PremisesHardware>> as PremisesHardware
}

ExternalGithub .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>GitOps
ExternalGithub .[#6366f1,thickness=2].> ControlRunner : <color:#6366f1>Actions job
ExternalGithub .[#6366f1,thickness=2].> ExternalTerraform_cloud : <color:#6366f1>Terraform実行
ExternalTerraform_cloud .[#6366f1,thickness=2].> ControlTfc_agents : <color:#6366f1>workspace runを自宅agentで実行
ExternalGithub .[#6366f1,thickness=2].> ExternalGithub_pages : <color:#6366f1>構成図・PR比較を公開
ControlArgo .[#6366f1,thickness=2].> PremisesHome : <color:#6366f1>manifest同期
ExternalGithub .[#6366f1,thickness=2].> OkeArgo : <color:#6366f1>GitOps
OkeArgo .[#6366f1,thickness=2].> OkeApi : <color:#6366f1>共通基盤同期
ControlArgo .[#6366f1,thickness=2].> ConsumersReventer : <color:#6366f1>STG・PRDアプリ同期
ControlRunner .[#6366f1,thickness=2].> ConsumersReventer : <color:#6366f1>利用側のCI jobを実行
ControlTfc_agents .[#6366f1,thickness=2].> ConsumersReventer : <color:#6366f1>利用側workspaceの実行を受託
ControlTfc_agents .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>VM / ネットワーク
ControlAnsible .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>機器設定
ControlPacker .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>VM template
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
skinparam rectangle<<PremisesDataBackups>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Shared_prdEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlAnsible>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ConsumersReventer>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
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

  rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
  rectangle "==バックアップ処理" <<PremisesDataBackups>> as PremisesDataBackups
}
rectangle "OCI / STG OKE共通基盤" <<Oke>> as Oke {
  skinparam RectangleBorderColor<<Oke>> #3b82f6
  skinparam RectangleFontColor<<Oke>> #3b82f6
  skinparam RectangleBorderStyle<<Oke>> dashed

  rectangle "==External Secrets Operator" <<OkeEso>> as OkeEso
}
rectangle "PRDクラスタへ提供する共通アドオン" <<Shared_prd>> as Shared_prd {
  skinparam RectangleBorderColor<<Shared_prd>> #737373
  skinparam RectangleFontColor<<Shared_prd>> #737373
  skinparam RectangleBorderStyle<<Shared_prd>> dashed

  rectangle "==External Secrets Operator" <<Shared_prdEso>> as Shared_prdEso
}
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<ControlAnsible>> as ControlAnsible
}
rectangle "基盤の利用側 / 別リポジトリ" <<Consumers>> as Consumers {
  skinparam RectangleBorderColor<<Consumers>> #64748b
  skinparam RectangleFontColor<<Consumers>> #64748b
  skinparam RectangleBorderStyle<<Consumers>> dashed

  rectangle "==Re:Venter\\n\\n基盤を利用するワークロードの一つ。アプリ内部・PRDクラスタ本体・アプリ固有のGateway/HTTPRouteはreventerで管理する。" <<ConsumersReventer>> as ConsumersReventer
}

ExternalBws .[#AC4D39,thickness=2].> PremisesHomeEso : <color:#AC4D39>Secret注入
ExternalBws .[#AC4D39,thickness=2].> OkeEso : <color:#AC4D39>Secret注入
ExternalBws .[#AC4D39,thickness=2].> Shared_prdEso : <color:#AC4D39>ESO / PRD Secret注入
OkeEso .[#AC4D39,thickness=2].> ConsumersReventer : <color:#AC4D39>利用側Secretへ注入 / STG
Shared_prdEso .[#AC4D39,thickness=2].> ConsumersReventer : <color:#AC4D39>利用側Secretへ注入 / PRD
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
skinparam rectangle<<ConsumersReventer>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
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
rectangle "基盤の利用側 / 別リポジトリ" <<Consumers>> as Consumers {
  skinparam RectangleBorderColor<<Consumers>> #64748b
  skinparam RectangleFontColor<<Consumers>> #64748b
  skinparam RectangleBorderStyle<<Consumers>> dashed

  rectangle "==Re:Venter\\n\\n基盤を利用するワークロードの一つ。アプリ内部・PRDクラスタ本体・アプリ固有のGateway/HTTPRouteはreventerで管理する。" <<ConsumersReventer>> as ConsumersReventer
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
ConsumersReventer .[#b45309,thickness=2].> MonitoringVms : <color:#b45309>metrics / logs / 環境別
MonitoringVms .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>VM側PDC agentから外向き接続
@enduml
`;case`network`:return`@startuml
title "LAN・WARP・OCI"
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
skinparam rectangle<<PremisesHardwareRouter>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeWorkers>>{
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
skinparam rectangle<<ExternalEdgeWarp>>{
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
skinparam rectangle<<OkeNetworkIgw>>{
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
skinparam rectangle<<PremisesLanServer>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeNetworkPublic_api>>{
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

    rectangle "==Wi-Fi AP" <<PremisesHardwareWifi>> as PremisesHardwareWifi
    rectangle "==UniFi OS Server" <<PremisesHardwareUnifi>> as PremisesHardwareUnifi
    rectangle "==HAProxy / Keepalived ×2\\n\\nVM10001・10002。Terraform/PVEとAnsible/load-balancerで管理。" <<PremisesHardwareLb>> as PremisesHardwareLb
    rectangle "==IX2215 / VLAN\\n\\nnative・管理・server・client・guest・IoTを分離。guest VLANから他VLANは到達不可。" <<PremisesHardwareRouter>> as PremisesHardwareRouter
  }
  rectangle "内部DNS / MetalLB" <<PremisesHomeDns>> as PremisesHomeDns {
    skinparam RectangleBorderColor<<PremisesHomeDns>> #64748b
    skinparam RectangleFontColor<<PremisesHomeDns>> #64748b
    skinparam RectangleBorderStyle<<PremisesHomeDns>> dashed

    rectangle "==CoreDNS / miutaku.internal" <<PremisesHomeDnsCoredns>> as PremisesHomeDnsCoredns
    rectangle "==MetalLB / LANのService IP" <<PremisesHomeDnsMetallb>> as PremisesHomeDnsMetallb
  }
  rectangle "LAN / VLAN・経路" <<PremisesLan>> as PremisesLan {
    skinparam RectangleBorderColor<<PremisesLan>> #3b82f6
    skinparam RectangleFontColor<<PremisesLan>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesLan>> dashed

    rectangle "==native / 192.168.0.0/24" <<PremisesLanNative>> as PremisesLanNative
    rectangle "==VLAN10 / 192.168.10.0/24" <<PremisesLanManagement>> as PremisesLanManagement
    rectangle "==VLAN30 / 192.168.30.0/24" <<PremisesLanClient>> as PremisesLanClient
    rectangle "==VLAN31 / guest\\n\\n他VLANへの通信は不可。全VLAN間を到達可能として描かない。" <<PremisesLanGuest>> as PremisesLanGuest
    rectangle "==VLAN40 / 192.168.40.0/24" <<PremisesLanIot>> as PremisesLanIot
    rectangle "==VLAN20 / 192.168.20.0/24" <<PremisesLanServer>> as PremisesLanServer
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

  rectangle "==WARP / private CIDR routes\\n\\nCloudflare One Clientからprivate CIDRへ。公開hostnameのTunnel/Accessとは別。" <<ExternalEdgeWarp>> as ExternalEdgeWarp
  rectangle "==Internet" <<ExternalInternet>> as ExternalInternet
  rectangle "==Oracle Services Network" <<ExternalOracle>> as ExternalOracle
}

ExternalEdgeWarp .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>private CIDR routes / WARP policy
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanNative : <color:#8D8D8D>native IF
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanManagement : <color:#8D8D8D>BVI10
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>BVI20
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanClient : <color:#8D8D8D>BVI30
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanGuest : <color:#8D8D8D>BVI31 / 他VLAN拒否
PremisesHardwareRouter .[#8D8D8D,thickness=2].> PremisesLanIot : <color:#8D8D8D>BVI40
OkeWorkers .[#8D8D8D,thickness=2].> OkeNetworkPrivate_workers : <color:#8D8D8D>private subnet / 10.0.2.0/24
OkeNetworkIgw .[#8D8D8D,thickness=2].> OkeNetworkPublic_api : <color:#8D8D8D>public route table
OkeNetworkPrivate_workers .[#8D8D8D,thickness=2].> OkeNetworkNat : <color:#8D8D8D>default route
OkeNetworkPrivate_workers .[#8D8D8D,thickness=2].> OkeNetworkService_gateway : <color:#8D8D8D>Oracle service CIDR route
OkeNetworkNat .[#8D8D8D,thickness=2].> ExternalInternet : <color:#8D8D8D>NAT / reserved IPv4
ExternalInternet .[#8D8D8D,thickness=2].> OkeNetworkIgw : <color:#8D8D8D>公開API・LBへの到達
OkeNetworkService_gateway .[#8D8D8D,thickness=2].> ExternalOracle : <color:#8D8D8D>Oracle Services Network
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
skinparam rectangle<<ControlArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlReviews>>{
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
skinparam database<<PremisesDataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
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
    rectangle "==Cloudflare Tunnel\\n\\n自宅とSTG OKEのcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
    rectangle "公開hostname / 設定から抽出" <<ExternalEdgeRoutes>> as ExternalEdgeRoutes {
      skinparam RectangleBorderColor<<ExternalEdgeRoutes>> #64748b
      skinparam RectangleFontColor<<ExternalEdgeRoutes>> #64748b
      skinparam RectangleBorderStyle<<ExternalEdgeRoutes>> dashed

      rectangle "==Access保護のhostname" <<ExternalEdgeRoutesProtected>> as ExternalEdgeRoutesProtected
      rectangle "==例外 / mTLS専用API" <<ExternalEdgeRoutesExceptions>> as ExternalEdgeRoutesExceptions
    }
  }
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
  rectangle "==Talos / home-k8s\\n\\nTalos。CP VM3台・worker VM2台をProxmox2ホストへ配置し、RPi worker2台を追加。Podの配置は動的。" <<PremisesHome>> as PremisesHome
  rectangle "==物理・ネットワーク" <<PremisesHardware>> as PremisesHardware
}
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<ControlArgo>> as ControlArgo
  rectangle "==Re:Venterの一時レビュー\\n\\nreventerだけTalosから非公開配信。my-infraの本番・レビューはGitHub Pages。" <<ControlReviews>> as ControlReviews
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
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>認証後の内部接続
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> PremisesDataNas : <color:#6366f1>認証後の内部接続
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>認証後の内部接続
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> ControlReviews : <color:#6366f1>認証後の内部接続
@enduml
`;case`placement`:return`@startuml
title "管理範囲"
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
rectangle "==外部所有PRDクラスタ / 共通アドオンの配置先\\n\\nこの図が管理対象として示すのは共通アドオンとApplication登録。クラスタ本体・アプリ実装はreventerが所有。" <<Prd>> as Prd
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