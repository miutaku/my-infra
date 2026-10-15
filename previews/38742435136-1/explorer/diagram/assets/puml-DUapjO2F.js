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
skinparam rectangle<<EdgeTunnel>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
skinparam rectangle<<HomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<MonitoringGrafana>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<DataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<MonitoringVms>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
person "==管理者" <<Operator>> as Operator
rectangle "Cloudflare" <<Edge>> as Edge {
  skinparam RectangleBorderColor<<Edge>> #A35829
  skinparam RectangleFontColor<<Edge>> #A35829
  skinparam RectangleBorderStyle<<Edge>> dashed

  rectangle "==Cloudflare Tunnel\\n\\n自宅とSTG OKEのcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<EdgeTunnel>> as EdgeTunnel
  rectangle "==Access / 認証\\n\\n管理サービスをAccessで保護。WARPのprivate CIDR routeとは別の接続経路。" <<EdgeAccess>> as EdgeAccess
}
rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<Bws>> as Bws
person "==利用者" <<User>> as User
rectangle "==OCI / STG OKE共通基盤\\n\\n東京リージョン。base workerとburst workerを使用し、AutoscalerはOKE内で動く。Re:VenterアプリとPRD OKE本体はreventerが所有。" <<Oke>> as Oke
rectangle "自宅 / home-k8s" <<Home>> as Home {
  skinparam RectangleBorderColor<<Home>> #3b82f6
  skinparam RectangleFontColor<<Home>> #3b82f6
  skinparam RectangleBorderStyle<<Home>> dashed

  rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<HomeEso>> as HomeEso
  rectangle "==収集agent\\n\\nvmagent・exporter・PDC agent。監視保存先とは分離。" <<HomeAgent>> as HomeAgent
  rectangle "==Nextcloud" <<HomeNextcloud>> as HomeNextcloud
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

  rectangle "==Grafana Cloud / PDC\\n\\nPDC agentが外向き接続を作り、Grafanaからprivate監視データを照会する。保存はOCI VM側。" <<MonitoringGrafana>> as MonitoringGrafana
  database "==OCI監視VM / STG・PRD\\n\\nOKEから独立したVM2台／環境へVictoriaMetrics・VictoriaLogsを配置。STG/PRDの定義ディレクトリとアカウントは分離。" <<MonitoringVms>> as MonitoringVms
}
rectangle "保存・バックアップ" <<Data>> as Data {
  skinparam RectangleBorderColor<<Data>> #737373
  skinparam RectangleFontColor<<Data>> #737373
  skinparam RectangleBorderStyle<<Data>> dashed

  database "==TrueNAS / NFS\\n\\nNAS2台。Kubernetes PVCやメディアを保存。マウント・snapshot・レプリケーションとVMバックアップを区別する。" <<DataNas>> as DataNas
}

Operator .[#6366f1,thickness=2].> EdgeAccess : <color:#6366f1>管理認証
EdgeAccess .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>Tunnel / 管理UI
Bws .[#AC4D39,thickness=2].> HomeEso : <color:#AC4D39>Secret注入
Bws .[#AC4D39,thickness=2].> Oke : <color:#AC4D39>Secret注入
HomeAgent .[#b45309,thickness=2].> MonitoringVms : <color:#b45309>metrics / logs
Oke .[#b45309,thickness=2].> MonitoringVms : <color:#b45309>metrics / logs
Operator .[#0ea5e9,thickness=2].> MonitoringGrafana : <color:#0ea5e9>照会
MonitoringGrafana .[#0ea5e9,thickness=2].> MonitoringVms : <color:#0ea5e9>PDC経由
HomeNextcloud .[#15803d,thickness=2].> DataNas : <color:#15803d>NFS / PVC
User .[#15803d,thickness=2].> Edge : <color:#15803d>HTTPS
Edge .[#15803d,thickness=2].> Home : <color:#15803d>Tunnel / 内部HTTP
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
skinparam rectangle<<HomeApps>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeDns>>{
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
  rectangle "==宅内アプリ\\n\\nLoockit・Coupon Manager・Wake-on-LAN・Annict連携など。全Applicationとリソースは自動抽出一覧から確認できる。" <<HomeApps>> as HomeApps
  rectangle "==内部DNS / MetalLB\\n\\nmiutaku.internalはCoreDNS。MetalLBでLAN内Service IPを払い出す。" <<HomeDns>> as HomeDns
}
rectangle "保存・バックアップ" <<Data>> as Data {
  skinparam RectangleBorderColor<<Data>> #737373
  skinparam RectangleFontColor<<Data>> #737373
  skinparam RectangleBorderStyle<<Data>> dashed

  database "==TrueNAS / NFS\\n\\nNAS2台。Kubernetes PVCやメディアを保存。マウント・snapshot・レプリケーションとVMバックアップを区別する。" <<DataNas>> as DataNas
}

User .[#15803d,thickness=2].> Edge : <color:#15803d>HTTPS
HomeNextcloud .[#15803d,thickness=2].> DataNas : <color:#15803d>NFS / PVC
HomeRecording .[#15803d,thickness=2].> DataNas : <color:#15803d>メディア保存
Edge .[#15803d,thickness=2].> Home : <color:#15803d>Tunnel / 内部HTTP
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

skinparam rectangle<<ControlGit>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ControlAnsible>>{
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
skinparam rectangle<<ControlRunner>>{
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

  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ControlGit>> as ControlGit
  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<ControlAnsible>> as ControlAnsible
  rectangle "==Terraform Cloud\\n\\nworkspaceごとにplan/apply。Proxmox・Talos・OCI・Cloudflareを管理する。" <<ControlTfc>> as ControlTfc
  rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<ControlArgo>> as ControlArgo
  rectangle "==ARC / 専用runner\\n\\n実行目的ごとにrunnerを分離。構成モデルAIはPlusログイン専用Pod、公開・比較のビルドはGitHub-hosted runner。" <<ControlRunner>> as ControlRunner
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

ControlGit .[#6366f1,thickness=2].> ControlTfc : <color:#6366f1>Terraform実行
ControlGit .[#6366f1,thickness=2].> ControlArgo : <color:#6366f1>GitOps
ControlGit .[#6366f1,thickness=2].> ControlRunner : <color:#6366f1>Actions job
ControlArgo .[#6366f1,thickness=2].> Home : <color:#6366f1>manifest同期
ControlGit .[#6366f1,thickness=2].> OkeArgo : <color:#6366f1>GitOps
OkeArgo .[#6366f1,thickness=2].> OkeApi : <color:#6366f1>共通基盤同期
OkeScale .[#6366f1,thickness=2].> OkeApi : <color:#6366f1>burst pool増減
ControlArgo .[#6366f1,thickness=2].> Reventer : <color:#6366f1>STG・PRDアプリ同期
ControlTfc .[#6366f1,thickness=2].> Hardware : <color:#6366f1>VM / ネットワーク
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
rectangle "変更・運用" <<Control>> as Control {
  skinparam RectangleBorderColor<<Control>> #A35829
  skinparam RectangleFontColor<<Control>> #A35829
  skinparam RectangleBorderStyle<<Control>> dashed

  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ControlGit>> as ControlGit
  rectangle "==Terraform Cloud\\n\\nworkspaceごとにplan/apply。Proxmox・Talos・OCI・Cloudflareを管理する。" <<ControlTfc>> as ControlTfc
}

Bws .[#AC4D39,thickness=2].> HomeEso : <color:#AC4D39>Secret注入
Bws .[#AC4D39,thickness=2].> OkeEso : <color:#AC4D39>Secret注入
Bws .[#AC4D39,thickness=2].> ControlGit : <color:#AC4D39>CI credential
Bws .[#AC4D39,thickness=2].> ControlTfc : <color:#AC4D39>Terraform変数
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
skinparam rectangle<<Oke>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeAgent>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<MonitoringGrafana>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<MonitoringVms>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==物理・ネットワーク" <<Hardware>> as Hardware
person "==管理者" <<Operator>> as Operator
rectangle "==OCI / STG OKE共通基盤\\n\\n東京リージョン。base workerとburst workerを使用し、AutoscalerはOKE内で動く。Re:VenterアプリとPRD OKE本体はreventerが所有。" <<Oke>> as Oke
rectangle "自宅 / home-k8s" <<Home>> as Home {
  skinparam RectangleBorderColor<<Home>> #3b82f6
  skinparam RectangleFontColor<<Home>> #3b82f6
  skinparam RectangleBorderStyle<<Home>> dashed

  rectangle "==収集agent\\n\\nvmagent・exporter・PDC agent。監視保存先とは分離。" <<HomeAgent>> as HomeAgent
}
rectangle "監視" <<Monitoring>> as Monitoring {
  skinparam RectangleBorderColor<<Monitoring>> #428a4f
  skinparam RectangleFontColor<<Monitoring>> #428a4f
  skinparam RectangleBorderStyle<<Monitoring>> dashed

  rectangle "==Grafana Cloud / PDC\\n\\nPDC agentが外向き接続を作り、Grafanaからprivate監視データを照会する。保存はOCI VM側。" <<MonitoringGrafana>> as MonitoringGrafana
  database "==OCI監視VM / STG・PRD\\n\\nOKEから独立したVM2台／環境へVictoriaMetrics・VictoriaLogsを配置。STG/PRDの定義ディレクトリとアカウントは分離。" <<MonitoringVms>> as MonitoringVms
}

Hardware .[#b45309,thickness=2].> HomeAgent : <color:#b45309>exporter収集
Operator .[#0ea5e9,thickness=2].> MonitoringGrafana : <color:#0ea5e9>照会
HomeAgent .[#b45309,thickness=2].> MonitoringVms : <color:#b45309>metrics / logs
Oke .[#b45309,thickness=2].> MonitoringVms : <color:#b45309>metrics / logs
MonitoringGrafana .[#0ea5e9,thickness=2].> MonitoringVms : <color:#0ea5e9>PDC経由
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
skinparam rectangle<<Application>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
}
rectangle "==自宅 / Proxmox2ホスト・RPi\\n\\nCP VM3台とworker VM2台はPVE2ホストへ配置。Podの配置は動的。配置詳細はホスト・クラスタをクリックして辿る。" <<HomeSite>> as HomeSite
rectangle "==OCI / STG OKE共通基盤" <<Stg>> as Stg
rectangle "==reventer所有 / STG・PRDアプリ・PRD OKE\\n\\n別リポジトリ管理。モデルで所有境界を維持する。" <<Application>> as Application
@enduml
`;default:throw Error(`Unknown viewId: `+e)}};export{e as pumlSource};