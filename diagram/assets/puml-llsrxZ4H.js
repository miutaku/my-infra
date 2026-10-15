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
skinparam rectangle<<Bws>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam person<<User>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<Oke>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<EdgeAccess>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<EdgeTunnel>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeAgent>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<MonitoringVms>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<DataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<MonitoringGrafana>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
person "==管理者" <<Operator>> as Operator
rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<Bws>> as Bws
person "==利用者" <<User>> as User
rectangle "==OCI / STG OKE共通基盤\\n\\n東京リージョン。base workerとburst workerを使用し、AutoscalerはOKE内で動く。Re:VenterアプリとPRD OKE本体はreventerが所有。" <<Oke>> as Oke
rectangle "Cloudflare" <<Edge>> as Edge {
  skinparam RectangleBorderColor<<Edge>> #A35829
  skinparam RectangleFontColor<<Edge>> #A35829
  skinparam RectangleBorderStyle<<Edge>> dashed

  rectangle "==Access / 認証\\n\\n管理サービスをAccessで保護。WARPのprivate CIDR routeとは別の接続経路。" <<EdgeAccess>> as EdgeAccess
  rectangle "==Cloudflare Tunnel\\n\\n自宅とSTG OKEのcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<EdgeTunnel>> as EdgeTunnel
}
rectangle "自宅 / home-k8s" <<Home>> as Home {
  skinparam RectangleBorderColor<<Home>> #3b82f6
  skinparam RectangleFontColor<<Home>> #3b82f6
  skinparam RectangleBorderStyle<<Home>> dashed

  rectangle "==Nextcloud" <<HomeNextcloud>> as HomeNextcloud
  rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<HomeEso>> as HomeEso
  rectangle "==自宅監視基盤\\n\\nvmagent・exporter・自宅VictoriaMetrics・PDC agent。OCI監視VMとは独立。" <<HomeAgent>> as HomeAgent
}
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<ControlArgo>> as ControlArgo
}
rectangle "監視" <<Monitoring>> as Monitoring {
  skinparam RectangleBorderColor<<Monitoring>> #428a4f
  skinparam RectangleFontColor<<Monitoring>> #428a4f
  skinparam RectangleBorderStyle<<Monitoring>> dashed

  database "==OCI監視VM / STG・PRD\\n\\nOKEから独立したVM2台／環境へVictoriaMetrics・VictoriaLogsを配置。STG/PRDの定義ディレクトリとアカウントは分離。" <<MonitoringVms>> as MonitoringVms
  rectangle "==Grafana Cloud / PDC\\n\\nPDC agentが外向き接続を作り、Grafanaからprivate監視データを照会する。保存先は自宅VictoriaMetricsとOCI監視VM。" <<MonitoringGrafana>> as MonitoringGrafana
}
rectangle "保存・バックアップ" <<Data>> as Data {
  skinparam RectangleBorderColor<<Data>> #737373
  skinparam RectangleFontColor<<Data>> #737373
  skinparam RectangleBorderStyle<<Data>> dashed

  database "==TrueNAS / NFS\\n\\nNAS2台。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<DataNas>> as DataNas
}

Operator .[#6366f1,thickness=2].> EdgeAccess : <color:#6366f1>管理認証
EdgeTunnel .[#15803d,thickness=2].> HomeNextcloud : <color:#15803d>公開hostname / 内部HTTP
EdgeAccess .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>Tunnel / 管理UI
EdgeTunnel .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>Access後 / 管理UI
Bws .[#AC4D39,thickness=2].> HomeEso : <color:#AC4D39>Secret注入
Bws .[#AC4D39,thickness=2].> Oke : <color:#AC4D39>Secret注入
Operator .[#0ea5e9,thickness=2].> MonitoringGrafana : <color:#0ea5e9>照会
HomeAgent .[#0ea5e9,thickness=2].> MonitoringGrafana : <color:#0ea5e9>外向きPDC接続
MonitoringVms .[#0ea5e9,thickness=2].> MonitoringGrafana : <color:#0ea5e9>VM側PDC agentから外向き接続
MonitoringGrafana .[#0ea5e9,thickness=2].> HomeAgent : <color:#0ea5e9>PDC経由の検索
MonitoringGrafana .[#0ea5e9,thickness=2].> MonitoringVms : <color:#0ea5e9>PDC経由
HomeNextcloud .[#15803d,thickness=2].> DataNas : <color:#15803d>NFS / PVC
HomeAgent .[#15803d,thickness=2].> DataNas : <color:#15803d>metrics用NFS PVC
User .[#15803d,thickness=2].> Edge : <color:#15803d>HTTPS
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
skinparam rectangle<<Edge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecording>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeAppsCoupon_manager>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeAppsLoockit>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeAppsAnnict_scraper>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeAppsMagic_mirror>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeAppsWol>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeDns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<DataDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<DataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
person "==利用者" <<User>> as User
rectangle "==Cloudflare\\n\\nDNS・Access・TunnelをTerraformで管理。公開経路と管理アクセスを認証ポリシーで分離。" <<Edge>> as Edge
rectangle "自宅 / home-k8s" <<Home>> as Home {
  skinparam RectangleBorderColor<<Home>> #3b82f6
  skinparam RectangleFontColor<<Home>> #3b82f6
  skinparam RectangleBorderStyle<<Home>> dashed

  rectangle "==Nextcloud" <<HomeNextcloud>> as HomeNextcloud
  rectangle "==録画・配信\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<HomeRecording>> as HomeRecording
  rectangle "宅内アプリ" <<HomeApps>> as HomeApps {
    skinparam RectangleBorderColor<<HomeApps>> #64748b
    skinparam RectangleFontColor<<HomeApps>> #64748b
    skinparam RectangleBorderStyle<<HomeApps>> dashed

    rectangle "==Coupon Manager" <<HomeAppsCoupon_manager>> as HomeAppsCoupon_manager
    rectangle "==Loockit" <<HomeAppsLoockit>> as HomeAppsLoockit
    rectangle "==Annict scraper" <<HomeAppsAnnict_scraper>> as HomeAppsAnnict_scraper
    rectangle "==MagicMirror" <<HomeAppsMagic_mirror>> as HomeAppsMagic_mirror
    rectangle "==Wake-on-LAN" <<HomeAppsWol>> as HomeAppsWol
  }
  rectangle "==内部DNS / MetalLB\\n\\nmiutaku.internalはCoreDNS。MetalLBでLAN内Service IPを払い出す。" <<HomeDns>> as HomeDns
}
rectangle "保存・バックアップ" <<Data>> as Data {
  skinparam RectangleBorderColor<<Data>> #737373
  skinparam RectangleFontColor<<Data>> #737373
  skinparam RectangleBorderStyle<<Data>> dashed

  rectangle "==DB / アプリ共有基盤" <<DataDatabases>> as DataDatabases
  database "==TrueNAS / NFS\\n\\nNAS2台。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<DataNas>> as DataNas
}

User .[#15803d,thickness=2].> Edge : <color:#15803d>HTTPS
Edge .[#15803d,thickness=2].> HomeNextcloud : <color:#15803d>公開hostname / 内部HTTP
Edge .[#15803d,thickness=2].> HomeRecording : <color:#15803d>公開hostname / 内部HTTP
Edge .[#15803d,thickness=2].> HomeAppsCoupon_manager : <color:#15803d>公開hostname / 内部HTTP
Edge .[#15803d,thickness=2].> HomeAppsLoockit : <color:#15803d>内部接続
HomeRecording .[#15803d,thickness=2].> HomeAppsAnnict_scraper : <color:#15803d>番組照合
HomeNextcloud .[#15803d,thickness=2].> DataNas : <color:#15803d>NFS / PVC
HomeRecording .[#15803d,thickness=2].> DataNas : <color:#15803d>メディア保存
HomeAppsCoupon_manager .[#15803d,thickness=2].> DataNas : <color:#15803d>images・Data Protection keys / PVC
HomeNextcloud .[#15803d,thickness=2].> DataDatabases : <color:#15803d>MYSQL_HOST / MariaDB
HomeRecording .[#15803d,thickness=2].> DataDatabases : <color:#15803d>[...]
HomeAppsCoupon_manager .[#15803d,thickness=2].> DataDatabases : <color:#15803d>PostgreSQL
DataDatabases .[#15803d,thickness=2].> DataNas : <color:#15803d>DB用NFS PVC
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
skinparam rectangle<<ControlGit>>{
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
skinparam rectangle<<ControlRunner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlTfc>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<Hardware>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<Edge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<Home>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<Reventer>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
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
skinparam rectangle<<OkeApi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==Re:Venterの一時レビュー\\n\\nreventerだけTalosから非公開配信。my-infraの本番・レビューはGitHub Pages。" <<ControlReviews>> as ControlReviews
  rectangle "==Image Updater" <<ControlImages>> as ControlImages
  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ControlGit>> as ControlGit
  rectangle "==Packer / VM template" <<ControlPacker>> as ControlPacker
  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<ControlAnsible>> as ControlAnsible
  rectangle "==ARC / 専用runner\\n\\n実行目的ごとにrunnerを分離。構成モデルAIはPlusログイン専用Pod、公開・比較のビルドはGitHub-hosted runner。" <<ControlRunner>> as ControlRunner
  rectangle "==Terraform Cloud\\n\\nworkspaceごとにplan/apply。Proxmox・Talos・OCI・Cloudflareを管理する。" <<ControlTfc>> as ControlTfc
  rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<ControlArgo>> as ControlArgo
}
rectangle "==物理・ネットワーク" <<Hardware>> as Hardware
rectangle "==Cloudflare\\n\\nDNS・Access・TunnelをTerraformで管理。公開経路と管理アクセスを認証ポリシーで分離。" <<Edge>> as Edge
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
rectangle "==自宅 / home-k8s\\n\\nTalos。CP VM3台・worker VM2台をProxmox2ホストへ配置し、RPi worker2台を追加。Podの配置は動的。" <<Home>> as Home
rectangle "==Re:Venter / STG・PRD\\n\\nアプリ・PRD OKE・アプリ用ネットワークは別リポジトリで管理。本図は所有境界と管理関係を示す。" <<Reventer>> as Reventer

ControlGit .[#6366f1,thickness=2].> ControlRunner : <color:#6366f1>Actions job
ControlGit .[#6366f1,thickness=2].> ControlTfc : <color:#6366f1>Terraform実行
ControlGit .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>GitOps
ControlArgo .[#6366f1,thickness=2].> Home : <color:#6366f1>manifest同期
ControlGit .[#6366f1,thickness=2].> OkeArgo : <color:#6366f1>GitOps
OkeArgo .[#6366f1,thickness=2].> OkeApi : <color:#6366f1>共通基盤同期
OkeScale .[#6366f1,thickness=2].> OkeApi : <color:#6366f1>burst pool増減
ControlArgo .[#6366f1,thickness=2].> Reventer : <color:#6366f1>STG・PRDアプリ同期
ControlTfc .[#6366f1,thickness=2].> Hardware : <color:#6366f1>VM / ネットワーク
ControlPacker .[#6366f1,thickness=2].> Hardware : <color:#6366f1>VM template
ControlAnsible .[#6366f1,thickness=2].> Hardware : <color:#6366f1>機器設定
ControlTfc .[#6366f1,thickness=2].> Edge : <color:#6366f1>DNS / Access / Tunnel
ControlTfc .[#6366f1,thickness=2].> MonitoringVms : <color:#6366f1>監視VM
ControlTfc .[#6366f1,thickness=2].> Oke : <color:#6366f1>OCI / OKE
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

skinparam rectangle<<Bws>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HomeEso>>{
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
skinparam rectangle<<ControlGit>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlTfc>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlAnsible>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<DataBackups>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<Bws>> as Bws
rectangle "自宅 / home-k8s" <<Home>> as Home {
  skinparam RectangleBorderColor<<Home>> #3b82f6
  skinparam RectangleFontColor<<Home>> #3b82f6
  skinparam RectangleBorderStyle<<Home>> dashed

  rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<HomeEso>> as HomeEso
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

  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ControlGit>> as ControlGit
  rectangle "==Terraform Cloud\\n\\nworkspaceごとにplan/apply。Proxmox・Talos・OCI・Cloudflareを管理する。" <<ControlTfc>> as ControlTfc
  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<ControlAnsible>> as ControlAnsible
}
rectangle "保存・バックアップ" <<Data>> as Data {
  skinparam RectangleBorderColor<<Data>> #737373
  skinparam RectangleFontColor<<Data>> #737373
  skinparam RectangleBorderStyle<<Data>> dashed

  rectangle "==バックアップ処理" <<DataBackups>> as DataBackups
}

Bws .[#AC4D39,thickness=2].> HomeEso : <color:#AC4D39>Secret注入
Bws .[#AC4D39,thickness=2].> OkeEso : <color:#AC4D39>Secret注入
Bws .[#AC4D39,thickness=2].> ReventerPlatformExternal_secrets : <color:#AC4D39>ESO / PRD Secret注入
Bws .[#AC4D39,thickness=2].> ControlGit : <color:#AC4D39>CI credential
Bws .[#AC4D39,thickness=2].> ControlTfc : <color:#AC4D39>Terraform変数
Bws .[#AC4D39,thickness=2].> ControlAnsible : <color:#AC4D39>機器・PBS用credential
Bws .[#AC4D39,thickness=2].> DataBackups : <color:#AC4D39>ESO経由 / backup credential
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

skinparam rectangle<<Hardware>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
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
skinparam rectangle<<HomeAgentPdc>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeAgentExporters>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<MonitoringVms>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<MonitoringGrafana>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeAgentCollector>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeAgentLocal_store>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==物理・ネットワーク" <<Hardware>> as Hardware
person "==管理者" <<Operator>> as Operator
rectangle "Re:Venter / STG・PRD" <<Reventer>> as Reventer {
  skinparam RectangleBorderColor<<Reventer>> #3b82f6
  skinparam RectangleFontColor<<Reventer>> #3b82f6
  skinparam RectangleBorderStyle<<Reventer>> dashed

  rectangle "==STG・PRD監視collector\\n\\nreventer側monitoring manifestsを自宅ArgoCDが同期する。" <<ReventerCollectors>> as ReventerCollectors
}
rectangle "自宅 / home-k8s" <<Home>> as Home {
  skinparam RectangleBorderColor<<Home>> #3b82f6
  skinparam RectangleFontColor<<Home>> #3b82f6
  skinparam RectangleBorderStyle<<Home>> dashed

  rectangle "自宅監視基盤" <<HomeAgent>> as HomeAgent {
    skinparam RectangleBorderColor<<HomeAgent>> #64748b
    skinparam RectangleFontColor<<HomeAgent>> #64748b
    skinparam RectangleBorderStyle<<HomeAgent>> dashed

    rectangle "==PDC agent / 自宅" <<HomeAgentPdc>> as HomeAgentPdc
    rectangle "==exporter群\\n\\nnode・PVE・SNMP・NUT・TinyTuya・blackbox・speedtest。個別Applicationを内部に保持。" <<HomeAgentExporters>> as HomeAgentExporters
    rectangle "==vmagent / scrape・remoteWrite" <<HomeAgentCollector>> as HomeAgentCollector
    database "==VictoriaMetrics / 自宅\\n\\n自宅のmetricsは自宅VictoriaMetricsに保存。OCI側VMへの送信とは別。" <<HomeAgentLocal_store>> as HomeAgentLocal_store
  }
}
rectangle "監視" <<Monitoring>> as Monitoring {
  skinparam RectangleBorderColor<<Monitoring>> #428a4f
  skinparam RectangleFontColor<<Monitoring>> #428a4f
  skinparam RectangleBorderStyle<<Monitoring>> dashed

  database "==OCI監視VM / STG・PRD\\n\\nOKEから独立したVM2台／環境へVictoriaMetrics・VictoriaLogsを配置。STG/PRDの定義ディレクトリとアカウントは分離。" <<MonitoringVms>> as MonitoringVms
  rectangle "==Grafana Cloud / PDC\\n\\nPDC agentが外向き接続を作り、Grafanaからprivate監視データを照会する。保存先は自宅VictoriaMetricsとOCI監視VM。" <<MonitoringGrafana>> as MonitoringGrafana
}

Hardware .[#b45309,thickness=2].> HomeAgentCollector : <color:#b45309>exporter収集
HomeAgentCollector .[#b45309,thickness=2].> HomeAgentLocal_store : <color:#b45309>remoteWrite / :8428
HomeAgentPdc .[#0ea5e9,thickness=2].> HomeAgentLocal_store : <color:#0ea5e9>private query / :8428
HomeAgentExporters .[#b45309,thickness=2].> HomeAgentCollector : <color:#b45309>scrape
Operator .[#0ea5e9,thickness=2].> MonitoringGrafana : <color:#0ea5e9>照会
HomeAgentPdc .[#0ea5e9,thickness=2].> MonitoringGrafana : <color:#0ea5e9>外向きPDC接続
ReventerCollectors .[#b45309,thickness=2].> MonitoringVms : <color:#b45309>[...]
MonitoringGrafana .[#0ea5e9,thickness=2].> HomeAgentPdc : <color:#0ea5e9>PDC経由の検索
MonitoringVms .[#0ea5e9,thickness=2].> MonitoringGrafana : <color:#0ea5e9>VM側PDC agentから外向き接続
MonitoringGrafana .[#0ea5e9,thickness=2].> MonitoringVms : <color:#0ea5e9>PDC経由
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
skinparam rectangle<<HardwareLb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeDnsCoredns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeDnsMetallb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomePlatformCloudflared>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeWorkers>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<EdgeAccess>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<EdgeTunnel>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<EdgeWarp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<OkeNetworkPrivate_workers>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<EdgeRoutes>>{
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
skinparam rectangle<<HardwareRouter>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareWifi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareUnifi>>{
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
skinparam rectangle<<LanServer>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<LanNative>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<LanManagement>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<LanClient>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<LanGuest>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<LanIot>>{
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
rectangle "物理・ネットワーク" <<Hardware>> as Hardware {
  skinparam RectangleBorderColor<<Hardware>> #3b82f6
  skinparam RectangleFontColor<<Hardware>> #3b82f6
  skinparam RectangleBorderStyle<<Hardware>> dashed

  rectangle "==HAProxy / Keepalived ×2\\n\\nVM10001・10002。Terraform/PVEとAnsible/load-balancerで管理。" <<HardwareLb>> as HardwareLb
  rectangle "==IX2215 / VLAN\\n\\nnative・管理・server・client・guest・IoTを分離。guest VLANから他VLANは到達不可。" <<HardwareRouter>> as HardwareRouter
  rectangle "==Wi-Fi AP" <<HardwareWifi>> as HardwareWifi
  rectangle "==UniFi OS Server" <<HardwareUnifi>> as HardwareUnifi
}
rectangle "自宅 / home-k8s" <<Home>> as Home {
  skinparam RectangleBorderColor<<Home>> #3b82f6
  skinparam RectangleFontColor<<Home>> #3b82f6
  skinparam RectangleBorderStyle<<Home>> dashed

  rectangle "内部DNS / MetalLB" <<HomeDns>> as HomeDns {
    skinparam RectangleBorderColor<<HomeDns>> #64748b
    skinparam RectangleFontColor<<HomeDns>> #64748b
    skinparam RectangleBorderStyle<<HomeDns>> dashed

    rectangle "==CoreDNS / miutaku.internal" <<HomeDnsCoredns>> as HomeDnsCoredns
    rectangle "==MetalLB / LANのService IP" <<HomeDnsMetallb>> as HomeDnsMetallb
  }
  rectangle "==cloudflared / 自宅connector" <<HomePlatformCloudflared>> as HomePlatformCloudflared
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
rectangle "Cloudflare" <<Edge>> as Edge {
  skinparam RectangleBorderColor<<Edge>> #A35829
  skinparam RectangleFontColor<<Edge>> #A35829
  skinparam RectangleBorderStyle<<Edge>> dashed

  rectangle "==Access / 認証\\n\\n管理サービスをAccessで保護。WARPのprivate CIDR routeとは別の接続経路。" <<EdgeAccess>> as EdgeAccess
  rectangle "==Cloudflare Tunnel\\n\\n自宅とSTG OKEのcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<EdgeTunnel>> as EdgeTunnel
  rectangle "==WARP / private CIDR routes\\n\\nCloudflare One Clientからprivate CIDRへ。公開hostnameのTunnel/Accessとは別。" <<EdgeWarp>> as EdgeWarp
  rectangle "==公開hostname / 設定から抽出" <<EdgeRoutes>> as EdgeRoutes
}
rectangle "外部サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==Internet" <<ExternalInternet>> as ExternalInternet
  rectangle "==Oracle Services Network" <<ExternalOracle>> as ExternalOracle
}
rectangle "LAN / VLAN・経路" <<Lan>> as Lan {
  skinparam RectangleBorderColor<<Lan>> #3b82f6
  skinparam RectangleFontColor<<Lan>> #3b82f6
  skinparam RectangleBorderStyle<<Lan>> dashed

  rectangle "==VLAN20 / 192.168.20.0/24" <<LanServer>> as LanServer
  rectangle "==native / 192.168.0.0/24" <<LanNative>> as LanNative
  rectangle "==VLAN10 / 192.168.10.0/24" <<LanManagement>> as LanManagement
  rectangle "==VLAN30 / 192.168.30.0/24" <<LanClient>> as LanClient
  rectangle "==VLAN31 / guest\\n\\n他VLANへの通信は不可。全VLAN間を到達可能として描かない。" <<LanGuest>> as LanGuest
  rectangle "==VLAN40 / 192.168.40.0/24" <<LanIot>> as LanIot
}

Operator .[#6366f1,thickness=2].> EdgeAccess : <color:#6366f1>管理認証
EdgeTunnel .[#8D8D8D,thickness=2].> EdgeRoutes : <color:#8D8D8D>hostname転送
EdgeAccess .[#6366f1,thickness=2].> EdgeRoutes : <color:#6366f1>Access policy
EdgeWarp .[#8D8D8D,thickness=2].> LanServer : <color:#8D8D8D>private CIDR routes / WARP policy
EdgeRoutes .[#6366f1,thickness=2].> HardwareRouter : <color:#6366f1>認証後の内部接続
HardwareRouter .[#8D8D8D,thickness=2].> LanNative : <color:#8D8D8D>native IF
HardwareRouter .[#8D8D8D,thickness=2].> LanManagement : <color:#8D8D8D>BVI10
HardwareRouter .[#8D8D8D,thickness=2].> LanServer : <color:#8D8D8D>BVI20
HardwareRouter .[#8D8D8D,thickness=2].> LanClient : <color:#8D8D8D>BVI30
HardwareRouter .[#8D8D8D,thickness=2].> LanGuest : <color:#8D8D8D>BVI31 / 他VLAN拒否
HardwareRouter .[#8D8D8D,thickness=2].> LanIot : <color:#8D8D8D>BVI40
EdgeRoutes .[#6366f1,thickness=2].> HardwareWifi : <color:#6366f1>認証後の内部接続
EdgeRoutes .[#6366f1,thickness=2].> HardwareUnifi : <color:#6366f1>認証後の内部接続
HomePlatformCloudflared .[#0ea5e9,thickness=2].> EdgeTunnel : <color:#0ea5e9>外向きTunnel接続
OkeWorkers .[#8D8D8D,thickness=2].> OkeNetworkPrivate_workers : <color:#8D8D8D>private subnet / 10.0.2.0/24
OkeNetworkIgw .[#8D8D8D,thickness=2].> OkeNetworkPublic_api : <color:#8D8D8D>public route table
OkeNetworkPrivate_workers .[#8D8D8D,thickness=2].> OkeNetworkNat : <color:#8D8D8D>default route
OkeNetworkPrivate_workers .[#8D8D8D,thickness=2].> OkeNetworkService_gateway : <color:#8D8D8D>Oracle service CIDR route
OkeNetworkNat .[#8D8D8D,thickness=2].> ExternalInternet : <color:#8D8D8D>NAT / reserved IPv4
ExternalInternet .[#8D8D8D,thickness=2].> OkeNetworkIgw : <color:#8D8D8D>公開API・LBへの到達
OkeNetworkService_gateway .[#8D8D8D,thickness=2].> ExternalOracle : <color:#8D8D8D>Oracle Services Network
HardwareRouter .[#15803d,thickness=2].> HomeDns : <color:#15803d>LAN / 内部DNS
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

skinparam database<<DataNasNas01>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<DataShared>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecording>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeAgentLocal_store>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HardwareX570>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareB550m>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<DataBackupsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<DataDatabasesMariadb>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<DataDatabasesPostgres>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<DataBackupsRecordings>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<DataBackupsMetrics>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<DataPbs>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<DataNasNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<DataBackupsNas>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<ExternalIdrive>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "自宅 / home-k8s" <<Home>> as Home {
  skinparam RectangleBorderColor<<Home>> #3b82f6
  skinparam RectangleFontColor<<Home>> #3b82f6
  skinparam RectangleBorderStyle<<Home>> dashed

  rectangle "==録画・配信\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<HomeRecording>> as HomeRecording
  rectangle "==Nextcloud" <<HomeNextcloud>> as HomeNextcloud
  database "==VictoriaMetrics / 自宅\\n\\n自宅のmetricsは自宅VictoriaMetricsに保存。OCI側VMへの送信とは別。" <<HomeAgentLocal_store>> as HomeAgentLocal_store
}
rectangle "保存・バックアップ" <<Data>> as Data {
  skinparam RectangleBorderColor<<Data>> #737373
  skinparam RectangleFontColor<<Data>> #737373
  skinparam RectangleBorderStyle<<Data>> dashed

  rectangle "TrueNAS / NFS" <<DataNas>> as DataNas {
    skinparam RectangleBorderColor<<DataNas>> #A35829
    skinparam RectangleFontColor<<DataNas>> #A35829
    skinparam RectangleBorderStyle<<DataNas>> dashed

    database "==nas-01 / ZFS・NFS" <<DataNasNas01>> as DataNasNas01
    database "==nas-02 / ZFS・NFS" <<DataNasNas02>> as DataNasNas02
  }
  rectangle "==共有PV / runner cache・状態" <<DataShared>> as DataShared
  rectangle "DB / アプリ共有基盤" <<DataDatabases>> as DataDatabases {
    skinparam RectangleBorderColor<<DataDatabases>> #64748b
    skinparam RectangleFontColor<<DataDatabases>> #64748b
    skinparam RectangleBorderStyle<<DataDatabases>> dashed

    database "==MariaDB" <<DataDatabasesMariadb>> as DataDatabasesMariadb
    database "==PostgreSQL / 本番・STG" <<DataDatabasesPostgres>> as DataDatabasesPostgres
  }
  rectangle "バックアップ処理" <<DataBackups>> as DataBackups {
    skinparam RectangleBorderColor<<DataBackups>> #64748b
    skinparam RectangleFontColor<<DataBackups>> #64748b
    skinparam RectangleBorderStyle<<DataBackups>> dashed

    rectangle "==MariaDB・PostgreSQL / logical dump" <<DataBackupsDb>> as DataBackupsDb
    rectangle "==録画ファイル用 / 別job" <<DataBackupsRecordings>> as DataBackupsRecordings
    rectangle "==VictoriaMetrics / consistent snapshot" <<DataBackupsMetrics>> as DataBackupsMetrics
    rectangle "==NAS restic / CronJob" <<DataBackupsNas>> as DataBackupsNas
  }
  database "==Proxmox Backup Server\\n\\nVMバックアップ。NFSのオンライン利用経路とは別。" <<DataPbs>> as DataPbs
}
rectangle "物理・ネットワーク" <<Hardware>> as Hardware {
  skinparam RectangleBorderColor<<Hardware>> #3b82f6
  skinparam RectangleFontColor<<Hardware>> #3b82f6
  skinparam RectangleBorderStyle<<Hardware>> dashed

  rectangle "==Proxmox / x570" <<HardwareX570>> as HardwareX570
  rectangle "==Proxmox / b550m" <<HardwareB550m>> as HardwareB550m
}
rectangle "外部サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  database "==IDrive e2 / S3\\n\\nPBS datastore、DB logical dump、NAS restic、録画、VictoriaMetrics snapshotの保存先。用途・prefix・整合性を分ける。" <<ExternalIdrive>> as ExternalIdrive
}

HomeRecording .[#15803d,thickness=2].> DataNasNas02 : <color:#15803d>録画・thumbnail・drop / NFS
HomeNextcloud .[#15803d,thickness=2].> DataDatabasesMariadb : <color:#15803d>MYSQL_HOST / MariaDB
HomeRecording .[#15803d,thickness=2].> DataDatabasesMariadb : <color:#15803d>EPGStation DB
HomeRecording .[#15803d,thickness=2].> DataDatabasesPostgres : <color:#15803d>[...]
HomeRecording .[#b45309,thickness=2].> DataBackupsRecordings : <color:#b45309>録画ファイル専用job
HomeAgentLocal_store .[#b45309,thickness=2].> DataBackupsMetrics : <color:#b45309>snapshot / vmbackup
DataPbs .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>S3 datastore / VM backup
HardwareX570 .[#b45309,thickness=2].> DataPbs : <color:#b45309>VM backup
HardwareB550m .[#b45309,thickness=2].> DataPbs : <color:#b45309>VM backup
HomeNextcloud .[#15803d,thickness=2].> DataNas : <color:#15803d>NFS / PVC
HomeAgentLocal_store .[#15803d,thickness=2].> DataNas : <color:#15803d>metrics用NFS PVC
DataDatabases .[#15803d,thickness=2].> DataNas : <color:#15803d>DB用NFS PVC
DataNas .[#b45309,thickness=2].> DataBackupsNas : <color:#b45309>対象dataset / restic
DataDatabases .[#b45309,thickness=2].> DataBackupsDb : <color:#b45309>整合性あるlogical dump
DataBackups .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>用途別prefix / 暗号化・retention
@enduml
`;case`placement`:return`@startuml
title "所有境界"
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

skinparam rectangle<<HomeSite>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
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
rectangle "==自宅 / Proxmox2ホスト・RPi\\n\\nCP VM3台とworker VM2台はPVE2ホストへ配置。Podの配置は動的。配置詳細はホスト・クラスタをクリックして辿る。" <<HomeSite>> as HomeSite
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

skinparam rectangle<<HomeRecordingEpgstation>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingAnnict_sync>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingMirakurun_staging>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeAppsAnnict_scraper>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareTuner_stg>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingTnlastationGateway>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalAnnict>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingTnlastationFrontend>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingTnlastationBackend>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingMirakurun>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingTnlastationEncode>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingTnlastationStreaming>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareTuner_prod>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<DataDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeRecordingTnlastationMediamtx>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<DataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "録画・配信" <<HomeRecording>> as HomeRecording {
  skinparam RectangleBorderColor<<HomeRecording>> #64748b
  skinparam RectangleFontColor<<HomeRecording>> #64748b
  skinparam RectangleBorderStyle<<HomeRecording>> dashed

  rectangle "==EPGStation" <<HomeRecordingEpgstation>> as HomeRecordingEpgstation
  rectangle "==Annict録画同期 / CronJob" <<HomeRecordingAnnict_sync>> as HomeRecordingAnnict_sync
  rectangle "==Mirakurun Service / STG LXCへの中継" <<HomeRecordingMirakurun_staging>> as HomeRecordingMirakurun_staging
  rectangle "TNLaStation / 共通モデル" <<HomeRecordingTnlastation>> as HomeRecordingTnlastation {
    skinparam RectangleBorderColor<<HomeRecordingTnlastation>> #3b82f6
    skinparam RectangleFontColor<<HomeRecordingTnlastation>> #3b82f6
    skinparam RectangleBorderStyle<<HomeRecordingTnlastation>> dashed

    rectangle "==Gateway" <<HomeRecordingTnlastationGateway>> as HomeRecordingTnlastationGateway
    rectangle "==Frontend" <<HomeRecordingTnlastationFrontend>> as HomeRecordingTnlastationFrontend
    rectangle "==Backend / API・録画制御" <<HomeRecordingTnlastationBackend>> as HomeRecordingTnlastationBackend
    rectangle "==ffmpeg encode worker" <<HomeRecordingTnlastationEncode>> as HomeRecordingTnlastationEncode
    rectangle "==ffmpeg streaming worker" <<HomeRecordingTnlastationStreaming>> as HomeRecordingTnlastationStreaming
    rectangle "==MediaMTX / HLS配信" <<HomeRecordingTnlastationMediamtx>> as HomeRecordingTnlastationMediamtx
  }
  rectangle "==Mirakurun Service / 本番LXCへの中継" <<HomeRecordingMirakurun>> as HomeRecordingMirakurun
}
rectangle "==Annict scraper" <<HomeAppsAnnict_scraper>> as HomeAppsAnnict_scraper
rectangle "==Mirakurun STG LXC / CT12904・PX-S1UD\\n\\nGRはlocal tuner、BS/CSは本番Mirakurunへの低優先度TCP fallback。" <<HardwareTuner_stg>> as HardwareTuner_stg
rectangle "==Annict API" <<ExternalAnnict>> as ExternalAnnict
rectangle "==Mirakurun LXC / CT12901・PT3" <<HardwareTuner_prod>> as HardwareTuner_prod
rectangle "==DB / アプリ共有基盤" <<DataDatabases>> as DataDatabases
database "==TrueNAS / NFS\\n\\nNAS2台。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<DataNas>> as DataNas

HomeRecordingEpgstation .[#15803d,thickness=2].> HomeRecordingMirakurun : <color:#15803d>tuner API
HomeRecordingAnnict_sync .[#15803d,thickness=2].> HomeRecordingTnlastationBackend : <color:#15803d>録画登録API
HomeRecordingTnlastationBackend .[#15803d,thickness=2].> HomeRecordingMirakurun : <color:#15803d>tuner API
HomeRecordingTnlastationGateway .[#15803d,thickness=2].> HomeRecordingTnlastationFrontend : <color:#15803d>Web
HomeRecordingTnlastationGateway .[#15803d,thickness=2].> HomeRecordingTnlastationBackend : <color:#15803d>API
HomeRecordingTnlastationGateway .[#15803d,thickness=2].> HomeRecordingTnlastationMediamtx : <color:#15803d>HLS
HomeRecordingTnlastationBackend .[#15803d,thickness=2].> HomeRecordingTnlastationEncode : <color:#15803d>encode制御
HomeRecordingTnlastationBackend .[#15803d,thickness=2].> HomeRecordingTnlastationStreaming : <color:#15803d>streaming制御
HomeRecordingTnlastationStreaming .[#15803d,thickness=2].> HomeRecordingTnlastationMediamtx : <color:#15803d>配信
HomeRecordingMirakurun .[#15803d,thickness=2].> HardwareTuner_prod : <color:#15803d>EndpointSlice / 外部LXC
HomeRecordingMirakurun_staging .[#15803d,thickness=2].> HardwareTuner_stg : <color:#15803d>EndpointSlice / 外部LXC
HardwareTuner_stg .[#15803d,thickness=2].> HardwareTuner_prod : <color:#15803d>BS/CS TCP fallback
HomeRecordingAnnict_sync .[#15803d,thickness=2].> HomeAppsAnnict_scraper : <color:#15803d>番組照合
HomeAppsAnnict_scraper .[#15803d,thickness=2].> ExternalAnnict : <color:#15803d>Annict API
HomeRecordingEpgstation .[#15803d,thickness=2].> DataDatabases : <color:#15803d>EPGStation DB
HomeRecordingTnlastationBackend .[#15803d,thickness=2].> DataDatabases : <color:#15803d>PostgreSQL
HomeRecordingTnlastationEncode .[#15803d,thickness=2].> DataDatabases : <color:#15803d>encode状態
DataDatabases .[#15803d,thickness=2].> DataNas : <color:#15803d>DB用NFS PVC
HomeRecording .[#15803d,thickness=2].> DataNas : <color:#15803d>メディア保存
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

skinparam rectangle<<HardwareUpsMains>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareUpsSurge_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareUpsUps_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareUpsUps_b>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareX570>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareB550m>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareUpsPi_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HardwareUpsPi_b>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "UPS / NUT" <<HardwareUps>> as HardwareUps {
  skinparam RectangleBorderColor<<HardwareUps>> #64748b
  skinparam RectangleFontColor<<HardwareUps>> #64748b
  skinparam RectangleBorderStyle<<HardwareUps>> dashed

  rectangle "==商用AC" <<HardwareUpsMains>> as HardwareUpsMains
  rectangle "==UPS A / サージのみ口・非backup" <<HardwareUpsSurge_a>> as HardwareUpsSurge_a
  rectangle "==UPS A / APC RS550S 2020" <<HardwareUpsUps_a>> as HardwareUpsUps_a
  rectangle "==UPS B / APC RS550S 2025" <<HardwareUpsUps_b>> as HardwareUpsUps_b
  rectangle "==NUT Pi .112 / 監視A・給電B" <<HardwareUpsPi_a>> as HardwareUpsPi_a
  rectangle "==NUT Pi .113 / 監視B・給電A" <<HardwareUpsPi_b>> as HardwareUpsPi_b
}
rectangle "==Proxmox / x570" <<HardwareX570>> as HardwareX570
rectangle "==Proxmox / b550m" <<HardwareB550m>> as HardwareB550m

HardwareUpsMains .[#AC4D39,thickness=2].> HardwareUpsSurge_a : <color:#AC4D39>非バックアップ出力
HardwareUpsMains .[#AC4D39,thickness=2].> HardwareUpsUps_a : <color:#AC4D39>AC入力
HardwareUpsSurge_a .[#AC4D39,thickness=2].> HardwareUpsUps_b : <color:#AC4D39>UPS BのAC入力
HardwareUpsUps_a .[#8D8D8D,thickness=2].> HardwareUpsPi_a : <color:#8D8D8D>USB監視 / ups-a
HardwareUpsUps_a .[#AC4D39,thickness=2].> HardwareUpsPi_b : <color:#AC4D39>cross-power / PiBの給電元
HardwareUpsUps_b .[#AC4D39,thickness=2].> HardwareUpsPi_a : <color:#AC4D39>cross-power / PiAの給電元
HardwareUpsUps_b .[#8D8D8D,thickness=2].> HardwareUpsPi_b : <color:#8D8D8D>USB監視 / ups-b
HardwareUpsPi_a .[#0ea5e9,thickness=2].> HardwareUpsPi_b : <color:#0ea5e9>ups-b監視 / LOWBATT10%で自身停止
HardwareUpsPi_b .[#0ea5e9,thickness=2].> HardwareUpsPi_a : <color:#0ea5e9>ups-a監視 / LOWBATT10%で自身停止
HardwareUpsUps_a .[#AC4D39,thickness=2].> HardwareX570 : <color:#AC4D39>バッテリー給電
HardwareX570 .[#0ea5e9,thickness=2].> HardwareUpsPi_a : <color:#0ea5e9>charge-guard監視 / 80%で自身停止
HardwareUpsUps_b .[#AC4D39,thickness=2].> HardwareB550m : <color:#AC4D39>バッテリー給電
HardwareB550m .[#0ea5e9,thickness=2].> HardwareUpsPi_b : <color:#0ea5e9>charge-guard監視 / 80%で自身停止
@enduml
`;default:throw Error(`Unknown viewId: `+e)}};export{e as pumlSource};