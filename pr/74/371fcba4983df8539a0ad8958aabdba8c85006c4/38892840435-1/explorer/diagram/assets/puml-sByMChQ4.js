var e=e=>{switch(e){case`index`:return`@startuml
title "自宅インフラの全体"
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

skinparam rectangle<<HomeSitePveControlplanesCp1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveWorkersWorker1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveControlplanesCp2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveControlplanesCp3>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveWorkersWorker2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStorageNas1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStorageNas2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStoragePbs>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ProvidersCloudflare>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<ProvidersBitwarden>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteNetwork>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
}
skinparam database<<ProvidersIdrive>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<HomeSiteWorkers>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "自宅" <<HomeSite>> as HomeSite {
  skinparam RectangleBorderColor<<HomeSite>> #737373
  skinparam RectangleFontColor<<HomeSite>> #737373
  skinparam RectangleBorderStyle<<HomeSite>> dashed

  rectangle "Proxmox VEクラスタ（2ノード構成）" <<HomeSitePve>> as HomeSitePve {
    skinparam RectangleBorderColor<<HomeSitePve>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePve>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePve>> dashed

    rectangle "==コントロールプレーン01 / VM13001 / VLAN20\\n\\npve-x570" <<HomeSitePveControlplanesCp1>> as HomeSitePveControlplanesCp1
    rectangle "==home-k8s worker01 / VM13004 / VLAN20\\n\\npve-x570" <<HomeSitePveWorkersWorker1>> as HomeSitePveWorkersWorker1
    rectangle "==コントロールプレーン02 / VM13002 / VLAN20\\n\\npve-b550m" <<HomeSitePveControlplanesCp2>> as HomeSitePveControlplanesCp2
    rectangle "==コントロールプレーン03 / VM13003 / VLAN20\\n\\npve-b550m" <<HomeSitePveControlplanesCp3>> as HomeSitePveControlplanesCp3
    rectangle "==home-k8s worker02 / VM13005 / VLAN20\\n\\npve-b550m" <<HomeSitePveWorkersWorker2>> as HomeSitePveWorkersWorker2
    database "==nas-01 / TrueNAS VM69001 / VLAN20\\n\\nrunner cache用NFS / pve-x570" <<HomeSitePveStorageNas1>> as HomeSitePveStorageNas1
    database "==nas-02 / TrueNAS VM69002 / VLAN20\\n\\nアプリ・DB・録画データ用NFS / pve-b550m" <<HomeSitePveStorageNas2>> as HomeSitePveStorageNas2
    database "==PBS VM14001 / VLAN20\\n\\npve-x570" <<HomeSitePveStoragePbs>> as HomeSitePveStoragePbs
  }
  rectangle "==ネットワーク機器 / IX2215・SW・AP\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<HomeSiteNetwork>> as HomeSiteNetwork
  rectangle "==Raspberry Pi / home-k8s worker03・04 / VLAN10\\n\\nTalos Linux（arm64）/ 2台" <<HomeSiteWorkers>> as HomeSiteWorkers
}
rectangle "外部サービス" <<Providers>> as Providers {
  skinparam RectangleBorderColor<<Providers>> #737373
  skinparam RectangleFontColor<<Providers>> #737373
  skinparam RectangleBorderStyle<<Providers>> dashed

  rectangle "==Cloudflare\\n\\nCloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS APIとWARPも提供。" <<ProvidersCloudflare>> as ProvidersCloudflare
  rectangle "==Bitwarden Secrets Manager\\n\\nTerraform・GitHub Actions・External Secretsへ秘密情報を配布。" <<ProvidersBitwarden>> as ProvidersBitwarden
  database "==IDrive e2（S3互換）\\n\\nS3互換の保存先。PBS・DB・NAS・録画・監視のバックアップを保存。" <<ProvidersIdrive>> as ProvidersIdrive
}

HomeSiteNetwork .[#8D8D8D,thickness=2].> HomeSiteWorkers : <color:#8D8D8D>VLAN10
HomeSiteNetwork .[#8D8D8D,thickness=2].> HomeSitePve : <color:#8D8D8D>宅内LAN
HomeSite .[#b45309,thickness=2].> ProvidersIdrive : <color:#b45309>バックアップ
ProvidersCloudflare .[#15803d,thickness=2].> HomeSite : <color:#15803d>Access・Tunnel
ProvidersBitwarden .[#AC4D39,thickness=2].> HomeSite : <color:#AC4D39>Secret同期
@enduml
`;case`home_apps`:return`@startuml
title "home-k8sのサービスと接続"
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

skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHomePlatform>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAgent>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<PremisesHomeManagement>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDns>>{
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
skinparam rectangle<<PremisesHomeLoockit>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeCoupon_manager>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeWol>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesPveNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesPveKiosk>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeMagic_mirror>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAnnict_scraper>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalAnnict>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
  skinparam RectangleBorderColor<<PremisesPve>> #428a4f
  skinparam RectangleFontColor<<PremisesPve>> #428a4f
  skinparam RectangleBorderStyle<<PremisesPve>> dashed

  database "==nas-02 / TrueNAS VM69002\\n\\npve-b550m。192.168.20.192。録画・Nextcloud・DB・監視のNFS。USB disk passthrough上のZFS。" <<PremisesPveNas02>> as PremisesPveNas02
  rectangle "==MagicMirror表示 / VM5000\\n\\nVLAN40のDisplayLink kiosk。MagicMirrorのHTTP画面を表示。" <<PremisesPveKiosk>> as PremisesPveKiosk
}
rectangle "==Cloudflare\\n\\nCloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS APIとWARPも提供。" <<ExternalEdge>> as ExternalEdge
rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
  skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
  skinparam RectangleFontColor<<PremisesHome>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHome>> dashed

  rectangle "==home-k8s クラスタ基盤\\n\\nArgoCD Application以外のbootstrapも含む。クラスタDNSと宅内DNS、metrics-serverと監視保存基盤は区別する。" <<PremisesHomePlatform>> as PremisesHomePlatform
  rectangle "==自宅監視基盤\\n\\nvmagent・exporter・自宅VictoriaMetrics・PDC agent。OCI監視VMとは独立。" <<PremisesHomeAgent>> as PremisesHomeAgent
  rectangle "==クラスタ運用" <<PremisesHomeManagement>> as PremisesHomeManagement
  rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
  rectangle "==内部DNS / MetalLB\\n\\nmiutaku.internalはCoreDNS。MetalLBでLAN内Service IPを払い出す。" <<PremisesHomeDns>> as PremisesHomeDns
  rectangle "==Nextcloud\\n\\nファイル共有 / app-nextcloud。MariaDB・Redisとnas-02のNFSを使用。" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
  rectangle "==録画・配信 / EPGStation・TNLaStation\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
  rectangle "==Loockit / BLEスマートロック\\n\\nKubernetesのHAProxyが2台のLXCのreadyzを監視しactiveへ転送。APIはmTLS、実機のBLE操作はLXC/BlueZが担当。" <<PremisesHomeLoockit>> as PremisesHomeLoockit
  rectangle "==Coupon Manager\\n\\nWeb → API → PostgreSQL。画像とData Protection keyはnas-02。外部AI APIを利用。" <<PremisesHomeCoupon_manager>> as PremisesHomeCoupon_manager
  rectangle "==Wake-on-LAN\\n\\napp-gptwol。LANにMagic Packetを送信して対象PCを起動する。" <<PremisesHomeWol>> as PremisesHomeWol
  rectangle "==DB / アプリ共有基盤" <<PremisesHomeDatabases>> as PremisesHomeDatabases
  rectangle "==MagicMirror / ダッシュボード\\n\\napp-magic-mirror / HTTP:8080。VLAN40のDisplayLink kiosk VM5000で表示。" <<PremisesHomeMagic_mirror>> as PremisesHomeMagic_mirror
  rectangle "==Annict scraper / 番組照合\\n\\nAnnict APIを照会して録画同期CronJobへ番組情報を提供。" <<PremisesHomeAnnict_scraper>> as PremisesHomeAnnict_scraper
}
rectangle "==Annict API" <<ExternalAnnict>> as ExternalAnnict

PremisesPveKiosk .[#15803d,thickness=2].> PremisesHomeMagic_mirror : <color:#15803d>表示
PremisesHomeAnnict_scraper .[#15803d,thickness=2].> ExternalAnnict : <color:#15803d>Annict API
ExternalEdge .[#15803d,thickness=2].> PremisesHome : <color:#15803d>認証済みHTTP / Access・mTLS → 内部Service
PremisesPveNas02 .[#8D8D8D,thickness=2].> PremisesHome : <color:#8D8D8D>アプリ・DB・監視のNFS
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

skinparam rectangle<<PremisesHomeManagementImages>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalGithub>>{
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
skinparam rectangle<<PremisesHomeManagementArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeManagementRunner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeManagementTfc_agents>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesPve>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
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

  rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
    skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
    skinparam RectangleFontColor<<PremisesHome>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHome>> dashed

    rectangle "==Image Updater" <<PremisesHomeManagementImages>> as PremisesHomeManagementImages
    rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<PremisesHomeManagementArgo>> as PremisesHomeManagementArgo
    rectangle "==ARC / 共用のrunner制御基盤\\n\\n共用Controllerとmy-infra向け実行環境。Re:Venter専用scale setは利用側の境界へ分ける。" <<PremisesHomeManagementRunner>> as PremisesHomeManagementRunner
    rectangle "==Terraform Cloud agents / 自宅\\n\\n共用・my-infra向けworkspaceを実行するagent。Re:Venter専用agentは利用側の境界へ分ける。" <<PremisesHomeManagementTfc_agents>> as PremisesHomeManagementTfc_agents
  }
  rectangle "自宅基盤の構成管理" <<PremisesManagement>> as PremisesManagement {
    skinparam RectangleBorderColor<<PremisesManagement>> #A35829
    skinparam RectangleFontColor<<PremisesManagement>> #A35829
    skinparam RectangleBorderStyle<<PremisesManagement>> dashed

    rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<PremisesManagementAnsible>> as PremisesManagementAnsible
    rectangle "==Packer / VM template" <<PremisesManagementPacker>> as PremisesManagementPacker
  }
  rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
    skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
    skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHardware>> dashed

    rectangle "==ネットワーク機器\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<PremisesHardwareNetwork>> as PremisesHardwareNetwork
  }
  rectangle "==Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ExternalGithub>> as ExternalGithub
  rectangle "==Terraform Cloud\\n\\nmy-infraのworkspaceで自宅基盤のplan/applyを実行する。Re:Venter向けの変更経路は利用側の図で管理。" <<ExternalTerraform_cloud>> as ExternalTerraform_cloud
  rectangle "==GitHub Pages / my-infra図・レビュー" <<ExternalGithub_pages>> as ExternalGithub_pages
  rectangle "==Cloudflare\\n\\nCloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS APIとWARPも提供。" <<ExternalEdge>> as ExternalEdge
}

ExternalGithub .[#6366f1,thickness=2].> PremisesHomeManagementArgo : <color:#6366f1>GitOps
ExternalGithub .[#6366f1,thickness=2].> PremisesHomeManagementRunner : <color:#6366f1>Actions job
ExternalGithub .[#6366f1,thickness=2].> ExternalTerraform_cloud : <color:#6366f1>Terraform実行
ExternalTerraform_cloud .[#6366f1,thickness=2].> PremisesHomeManagementTfc_agents : <color:#6366f1>workspace runを自宅agentで実行
ExternalGithub .[#6366f1,thickness=2].> ExternalGithub_pages : <color:#6366f1>構成図・PR比較を公開
PremisesHomeManagementTfc_agents .[#6366f1,thickness=2].> PremisesPve : <color:#6366f1>VM / ネットワーク
PremisesManagementAnsible .[#6366f1,thickness=2].> PremisesPve : <color:#6366f1>VM・NAS・LXC設定
PremisesManagementPacker .[#6366f1,thickness=2].> PremisesPve : <color:#6366f1>VM template
ExternalTerraform_cloud .[#6366f1,thickness=2].> ExternalEdge : <color:#6366f1>DNS / Access / Tunnel
PremisesManagementAnsible .[#6366f1,thickness=2].> PremisesHardware : <color:#6366f1>NW・UPS機器設定
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
skinparam rectangle<<PremisesHomeBackups>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==Bitwarden Secrets Manager\\n\\nTerraform・GitHub Actions・External Secretsへ秘密情報を配布。" <<ExternalBws>> as ExternalBws
  rectangle "==GitHub / コード・Actions\\n\\nTerraform・Ansible・Kubernetes定義。Actionsは検証・imageビルド・モデル更新を実行。" <<ExternalGithub>> as ExternalGithub
  rectangle "==Terraform Cloud\\n\\nmy-infraのworkspaceで自宅基盤のplan/applyを実行する。Re:Venter向けの変更経路は利用側の図で管理。" <<ExternalTerraform_cloud>> as ExternalTerraform_cloud
}
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
  rectangle "==Ansible\\n\\nIX2215・NAS・VM・LXC・UPSなどを構成する。" <<PremisesManagementAnsible>> as PremisesManagementAnsible
  rectangle "==バックアップ処理" <<PremisesHomeBackups>> as PremisesHomeBackups
}

ExternalBws .[#AC4D39,thickness=2].> PremisesHomeEso : <color:#AC4D39>Secret注入
ExternalBws .[#AC4D39,thickness=2].> ExternalGithub : <color:#AC4D39>CI credential
ExternalBws .[#AC4D39,thickness=2].> ExternalTerraform_cloud : <color:#AC4D39>Terraform変数
ExternalBws .[#AC4D39,thickness=2].> PremisesManagementAnsible : <color:#AC4D39>機器・PBS用credential
ExternalBws .[#AC4D39,thickness=2].> PremisesHomeBackups : <color:#AC4D39>ESO経由 / backup credential
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
  rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
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
PremisesHomeAgentPdc .[#0ea5e9,thickness=2].> PremisesHomeAgentLocal_store : <color:#0ea5e9>private query / :8428
PremisesHomeAgentExporters .[#b45309,thickness=2].> PremisesHomeAgentCollector : <color:#b45309>scrape
@enduml
`;case`loockit`:return`@startuml
title "HAProxy → LXC → Bluetooth"
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

skinparam person<<Client>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
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
skinparam rectangle<<PremisesHomeLoockitProxy>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesPveLoockit_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesPveLoockit_b>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesPveBluez>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformApi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
person "==専用クライアント" <<Client>> as Client
rectangle "==mTLS / 専用APIの例外\\n\\nloockit-apiのみ。指定クライアント証明書・操作パスの制限。Accessによるブラウザ認証とは別。" <<ExternalEdgeMtls>> as ExternalEdgeMtls
rectangle "==Cloudflare Tunnel\\n\\n自宅基盤のcloudflaredが外向き接続を確立。公開hostnameのHTTPを内部Serviceへ転送する。" <<ExternalEdgeTunnel>> as ExternalEdgeTunnel
rectangle "==HAProxy / :8080・:50051" <<PremisesHomeLoockitProxy>> as PremisesHomeLoockitProxy
rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
  skinparam RectangleBorderColor<<PremisesPve>> #428a4f
  skinparam RectangleFontColor<<PremisesPve>> #428a4f
  skinparam RectangleBorderStyle<<PremisesPve>> dashed

  rectangle "==Loockit 01 / CT12902\\n\\n192.168.20.133:8080 / :50051。x570のUSB Bluetooth・BlueZに接続。Leaseでactiveを選出。" <<PremisesPveLoockit_a>> as PremisesPveLoockit_a
  rectangle "==Loockit 02 / CT12903\\n\\n192.168.20.134:8080 / :50051。b550mのUSB Bluetooth・BlueZに接続。Leaseでactiveを選出。" <<PremisesPveLoockit_b>> as PremisesPveLoockit_b
  rectangle "==BlueZ / Bluetooth（2ノード）\\n\\n各ノードのUSB BluetoothをLoockit LXCからread-only D-Busで利用。" <<PremisesPveBluez>> as PremisesPveBluez
}
rectangle "==Kubernetes API / Lease" <<PremisesHomePlatformApi>> as PremisesHomePlatformApi

Client .[#15803d,thickness=2].> ExternalEdgeMtls : <color:#15803d>クライアント証明書
ExternalEdgeMtls .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>mTLS検証済みのAPIリクエスト
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHomeLoockitProxy : <color:#15803d>loockit-api / 8080 / mTLS
PremisesHomeLoockitProxy .[#15803d,thickness=2].> PremisesPveLoockit_a : <color:#15803d>readyz / leaderのみ
PremisesHomeLoockitProxy .[#15803d,thickness=2].> PremisesPveLoockit_b : <color:#15803d>readyz / leaderのみ
PremisesPveLoockit_a .[#15803d,thickness=2].> PremisesPveBluez : <color:#15803d>pve-x570 / read-only D-Bus
PremisesPveLoockit_b .[#15803d,thickness=2].> PremisesPveBluez : <color:#15803d>pve-b550m / read-only D-Bus
PremisesPveLoockit_a .[#15803d,thickness=2].> PremisesHomePlatformApi : <color:#15803d>Lease leader election
PremisesPveLoockit_b .[#15803d,thickness=2].> PremisesHomePlatformApi : <color:#15803d>Lease leader election
@enduml
`;case`nfs`:return`@startuml
title "nas-01・nas-02"
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

skinparam rectangle<<PremisesHomeShared>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeNextcloud>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesHomeAgentLocal_store>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHomeCoupon_manager>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeRecordingEpgstation>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastation>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeRecordingTnlastation_staging>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam database<<PremisesPveNas01>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesPveNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
  skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
  skinparam RectangleFontColor<<PremisesHome>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHome>> dashed

  rectangle "録画・配信 / EPGStation・TNLaStation" <<PremisesHomeRecording>> as PremisesHomeRecording {
    skinparam RectangleBorderColor<<PremisesHomeRecording>> #64748b
    skinparam RectangleFontColor<<PremisesHomeRecording>> #64748b
    skinparam RectangleBorderStyle<<PremisesHomeRecording>> dashed

    rectangle "==EPGStation" <<PremisesHomeRecordingEpgstation>> as PremisesHomeRecordingEpgstation
    rectangle "==TNLaStation PRD\\n\\napp-tnlastation。PRDのMirakurun・PostgreSQLと録画領域を使用。" <<PremisesHomeRecordingTnlastation>> as PremisesHomeRecordingTnlastation
    rectangle "==TNLaStation STG\\n\\napp-tnlastation-staging。STGのMirakurun・PostgreSQLと録画領域を使用。" <<PremisesHomeRecordingTnlastation_staging>> as PremisesHomeRecordingTnlastation_staging
  }
  rectangle "==共有PV / runner cache・状態" <<PremisesHomeShared>> as PremisesHomeShared
  rectangle "==Nextcloud\\n\\nファイル共有 / app-nextcloud。MariaDB・Redisとnas-02のNFSを使用。" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
  rectangle "==DB / アプリ共有基盤" <<PremisesHomeDatabases>> as PremisesHomeDatabases
  database "==VictoriaMetrics / 自宅\\n\\n自宅のmetricsは自宅VictoriaMetricsに保存。OCI側VMへの送信とは別。" <<PremisesHomeAgentLocal_store>> as PremisesHomeAgentLocal_store
  rectangle "==Coupon Manager\\n\\nWeb → API → PostgreSQL。画像とData Protection keyはnas-02。外部AI APIを利用。" <<PremisesHomeCoupon_manager>> as PremisesHomeCoupon_manager
}
rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
  skinparam RectangleBorderColor<<PremisesPve>> #428a4f
  skinparam RectangleFontColor<<PremisesPve>> #428a4f
  skinparam RectangleBorderStyle<<PremisesPve>> dashed

  database "==nas-01 / TrueNAS VM69001\\n\\npve-x570。192.168.20.191。runner cache用NFS。USB disk passthrough上のZFS。" <<PremisesPveNas01>> as PremisesPveNas01
  database "==nas-02 / TrueNAS VM69002\\n\\npve-b550m。192.168.20.192。録画・Nextcloud・DB・監視のNFS。USB disk passthrough上のZFS。" <<PremisesPveNas02>> as PremisesPveNas02
}

PremisesHomeShared .[#15803d,thickness=2].> PremisesPveNas01 : <color:#15803d>runner cache / NFS
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>html・data / NFS
PremisesHomeRecordingEpgstation .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>recorded・thumbnail・drop / NFS
PremisesHomeRecordingTnlastation .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>recorded・tnlastation / NFS
PremisesHomeRecordingTnlastation_staging .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>recorded-staging・tnlastation-staging / NFS
PremisesHomeDatabases .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>DB用NFS PVC
PremisesHomeAgentLocal_store .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>metrics用NFS PVC
PremisesHomeCoupon_manager .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>images・Data Protection keys / PVC
@enduml
`;case`nextcloud`:return`@startuml
title "DB・ロック・ファイル保存"
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

skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHomeNextcloudResources>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeNextcloudWeb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesHomeNextcloudRedis>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesHomeDatabasesMariadb>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesPveNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Cloudflare\\n\\nCloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS APIとWARPも提供。" <<ExternalEdge>> as ExternalEdge
rectangle "Nextcloud" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud {
  skinparam RectangleBorderColor<<PremisesHomeNextcloud>> #64748b
  skinparam RectangleFontColor<<PremisesHomeNextcloud>> #64748b
  skinparam RectangleBorderStyle<<PremisesHomeNextcloud>> dashed

  rectangle "==リソース定義" <<PremisesHomeNextcloudResources>> as PremisesHomeNextcloudResources
  rectangle "==Nextcloud / PHP・HTTP :80" <<PremisesHomeNextcloudWeb>> as PremisesHomeNextcloudWeb
  database "==Redis / locking・cache" <<PremisesHomeNextcloudRedis>> as PremisesHomeNextcloudRedis
}
database "==MariaDB" <<PremisesHomeDatabasesMariadb>> as PremisesHomeDatabasesMariadb
rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
  skinparam RectangleBorderColor<<PremisesPve>> #428a4f
  skinparam RectangleFontColor<<PremisesPve>> #428a4f
  skinparam RectangleBorderStyle<<PremisesPve>> dashed

  database "==nas-02 / TrueNAS VM69002\\n\\npve-b550m。192.168.20.192。録画・Nextcloud・DB・監視のNFS。USB disk passthrough上のZFS。" <<PremisesPveNas02>> as PremisesPveNas02
}

ExternalEdge .[#15803d,thickness=2].> PremisesHomeNextcloudWeb : <color:#15803d>nextcloud / 80 / Access
PremisesHomeNextcloudWeb .[#15803d,thickness=2].> PremisesHomeNextcloudRedis : <color:#15803d>Redis :6379 / locking・cache
PremisesHomeNextcloudWeb .[#15803d,thickness=2].> PremisesHomeDatabasesMariadb : <color:#15803d>MYSQL_HOST / MariaDB
PremisesHomeNextcloudWeb .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>html・data / NFS
@enduml
`;case`placement`:return`@startuml
title "全VM・LXC"
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

skinparam rectangle<<HomeSitePveLoadbalancersLb1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveLoadbalancersLb2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStorageNas1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStorageNas2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStoragePbs>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveDevelopmentDev>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveDesktopWindows>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveDisplayKiosk>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveControlplanesCp1Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSitePveControlplanesCp2Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSitePveControlplanesCp3Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSitePveWorkersWorker1Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSitePveWorkersWorker2Talos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSitePveSmartlocksLoockit1App>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveSmartlocksLoockit2App>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveTunersTuner_prodApp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveTunersTuner_stgApp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveNetwork_managementUnifiApp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "Proxmox VEクラスタ（2ノード構成）" <<HomeSitePve>> as HomeSitePve {
  skinparam RectangleBorderColor<<HomeSitePve>> #3b82f6
  skinparam RectangleFontColor<<HomeSitePve>> #3b82f6
  skinparam RectangleBorderStyle<<HomeSitePve>> dashed

  rectangle "home-k8s コントロールプレーン" <<HomeSitePveControlplanes>> as HomeSitePveControlplanes {
    skinparam RectangleBorderColor<<HomeSitePveControlplanes>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveControlplanes>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveControlplanes>> dashed

    rectangle "コントロールプレーン01 / VM13001 / VLAN20" <<HomeSitePveControlplanesCp1>> as HomeSitePveControlplanesCp1 {
      skinparam RectangleBorderColor<<HomeSitePveControlplanesCp1>> #64748b
      skinparam RectangleFontColor<<HomeSitePveControlplanesCp1>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveControlplanesCp1>> dashed

      rectangle "==Talos Linux\\n\\nTalos Linux上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<HomeSitePveControlplanesCp1Talos>> as HomeSitePveControlplanesCp1Talos
    }
    rectangle "コントロールプレーン02 / VM13002 / VLAN20" <<HomeSitePveControlplanesCp2>> as HomeSitePveControlplanesCp2 {
      skinparam RectangleBorderColor<<HomeSitePveControlplanesCp2>> #64748b
      skinparam RectangleFontColor<<HomeSitePveControlplanesCp2>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveControlplanesCp2>> dashed

      rectangle "==Talos Linux\\n\\nTalos Linux上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<HomeSitePveControlplanesCp2Talos>> as HomeSitePveControlplanesCp2Talos
    }
    rectangle "コントロールプレーン03 / VM13003 / VLAN20" <<HomeSitePveControlplanesCp3>> as HomeSitePveControlplanesCp3 {
      skinparam RectangleBorderColor<<HomeSitePveControlplanesCp3>> #64748b
      skinparam RectangleFontColor<<HomeSitePveControlplanesCp3>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveControlplanesCp3>> dashed

      rectangle "==Talos Linux\\n\\nTalos Linux上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<HomeSitePveControlplanesCp3Talos>> as HomeSitePveControlplanesCp3Talos
    }
  }
  rectangle "home-k8s ワーカー" <<HomeSitePveWorkers>> as HomeSitePveWorkers {
    skinparam RectangleBorderColor<<HomeSitePveWorkers>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveWorkers>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveWorkers>> dashed

    rectangle "home-k8s worker01 / VM13004 / VLAN20" <<HomeSitePveWorkersWorker1>> as HomeSitePveWorkersWorker1 {
      skinparam RectangleBorderColor<<HomeSitePveWorkersWorker1>> #64748b
      skinparam RectangleFontColor<<HomeSitePveWorkersWorker1>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveWorkersWorker1>> dashed

      rectangle "==Talos Linux\\n\\nTalos Linux上のkubelet・containerd。2 VMと2 RPi。" <<HomeSitePveWorkersWorker1Talos>> as HomeSitePveWorkersWorker1Talos
    }
    rectangle "home-k8s worker02 / VM13005 / VLAN20" <<HomeSitePveWorkersWorker2>> as HomeSitePveWorkersWorker2 {
      skinparam RectangleBorderColor<<HomeSitePveWorkersWorker2>> #64748b
      skinparam RectangleFontColor<<HomeSitePveWorkersWorker2>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveWorkersWorker2>> dashed

      rectangle "==Talos Linux\\n\\nTalos Linux上のkubelet・containerd。2 VMと2 RPi。" <<HomeSitePveWorkersWorker2Talos>> as HomeSitePveWorkersWorker2Talos
    }
  }
  rectangle "ロードバランサー" <<HomeSitePveLoadbalancers>> as HomeSitePveLoadbalancers {
    skinparam RectangleBorderColor<<HomeSitePveLoadbalancers>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveLoadbalancers>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveLoadbalancers>> dashed

    rectangle "==HAProxy / Keepalived VM10001 / VLAN20\\n\\npve-x570" <<HomeSitePveLoadbalancersLb1>> as HomeSitePveLoadbalancersLb1
    rectangle "==HAProxy / Keepalived VM10002 / VLAN20\\n\\npve-b550m" <<HomeSitePveLoadbalancersLb2>> as HomeSitePveLoadbalancersLb2
  }
  rectangle "ストレージ・バックアップ" <<HomeSitePveStorage>> as HomeSitePveStorage {
    skinparam RectangleBorderColor<<HomeSitePveStorage>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveStorage>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveStorage>> dashed

    database "==nas-01 / TrueNAS VM69001 / VLAN20\\n\\nrunner cache用NFS / pve-x570" <<HomeSitePveStorageNas1>> as HomeSitePveStorageNas1
    database "==nas-02 / TrueNAS VM69002 / VLAN20\\n\\nアプリ・DB・録画データ用NFS / pve-b550m" <<HomeSitePveStorageNas2>> as HomeSitePveStorageNas2
    database "==PBS VM14001 / VLAN20\\n\\npve-x570" <<HomeSitePveStoragePbs>> as HomeSitePveStoragePbs
  }
  rectangle "Loockit / Bluetooth制御" <<HomeSitePveSmartlocks>> as HomeSitePveSmartlocks {
    skinparam RectangleBorderColor<<HomeSitePveSmartlocks>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveSmartlocks>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveSmartlocks>> dashed

    rectangle "Loockit 01 / CT12902 / VLAN20" <<HomeSitePveSmartlocksLoockit1>> as HomeSitePveSmartlocksLoockit1 {
      skinparam RectangleBorderColor<<HomeSitePveSmartlocksLoockit1>> #64748b
      skinparam RectangleFontColor<<HomeSitePveSmartlocksLoockit1>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveSmartlocksLoockit1>> dashed

      rectangle "==Docker / Loockit REST・gRPC\\n\\n192.168.20.133:8080 / :50051。x570のUSB Bluetooth・BlueZに接続。Leaseでactiveを選出。" <<HomeSitePveSmartlocksLoockit1App>> as HomeSitePveSmartlocksLoockit1App
    }
    rectangle "Loockit 02 / CT12903 / VLAN20" <<HomeSitePveSmartlocksLoockit2>> as HomeSitePveSmartlocksLoockit2 {
      skinparam RectangleBorderColor<<HomeSitePveSmartlocksLoockit2>> #64748b
      skinparam RectangleFontColor<<HomeSitePveSmartlocksLoockit2>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveSmartlocksLoockit2>> dashed

      rectangle "==Docker / Loockit REST・gRPC\\n\\n192.168.20.134:8080 / :50051。b550mのUSB Bluetooth・BlueZに接続。Leaseでactiveを選出。" <<HomeSitePveSmartlocksLoockit2App>> as HomeSitePveSmartlocksLoockit2App
    }
  }
  rectangle "Mirakurun / チューナー" <<HomeSitePveTuners>> as HomeSitePveTuners {
    skinparam RectangleBorderColor<<HomeSitePveTuners>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveTuners>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveTuners>> dashed

    rectangle "Mirakurun本番 / CT12901・PT3 / VLAN20" <<HomeSitePveTunersTuner_prod>> as HomeSitePveTunersTuner_prod {
      skinparam RectangleBorderColor<<HomeSitePveTunersTuner_prod>> #64748b
      skinparam RectangleFontColor<<HomeSitePveTunersTuner_prod>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveTunersTuner_prod>> dashed

      rectangle "==Docker / Mirakurun / PT3\\n\\n192.168.20.132:40772。x570のPT3を使用。EPGStation/TNLaStationへチューナーAPIを提供。" <<HomeSitePveTunersTuner_prodApp>> as HomeSitePveTunersTuner_prodApp
    }
    rectangle "Mirakurun STG / CT12904・PX-S1UD / VLAN20" <<HomeSitePveTunersTuner_stg>> as HomeSitePveTunersTuner_stg {
      skinparam RectangleBorderColor<<HomeSitePveTunersTuner_stg>> #64748b
      skinparam RectangleFontColor<<HomeSitePveTunersTuner_stg>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveTunersTuner_stg>> dashed

      rectangle "==Docker / Mirakurun / PX-S1UD\\n\\n192.168.20.142:40772 / PX-S1UD。GRはlocal tuner、BS/CSは本番Mirakurunへの低優先度TCP fallback。" <<HomeSitePveTunersTuner_stgApp>> as HomeSitePveTunersTuner_stgApp
    }
  }
  rectangle "ネットワーク管理" <<HomeSitePveNetwork_management>> as HomeSitePveNetwork_management {
    skinparam RectangleBorderColor<<HomeSitePveNetwork_management>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveNetwork_management>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveNetwork_management>> dashed

    rectangle "UniFi OS VM13201 / native1" <<HomeSitePveNetwork_managementUnifi>> as HomeSitePveNetwork_managementUnifi {
      skinparam RectangleBorderColor<<HomeSitePveNetwork_managementUnifi>> #64748b
      skinparam RectangleFontColor<<HomeSitePveNetwork_managementUnifi>> #64748b
      skinparam RectangleBorderStyle<<HomeSitePveNetwork_managementUnifi>> dashed

      rectangle "==Podman / UniFi OS・Network\\n\\n192.168.0.132:11443 / native1。US-8-60Wの構成・監視を管理。" <<HomeSitePveNetwork_managementUnifiApp>> as HomeSitePveNetwork_managementUnifiApp
    }
  }
  rectangle "開発環境" <<HomeSitePveDevelopment>> as HomeSitePveDevelopment {
    skinparam RectangleBorderColor<<HomeSitePveDevelopment>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveDevelopment>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveDevelopment>> dashed

    rectangle "==開発用Docker / VM40000 / VLAN20\\n\\npve-b550m" <<HomeSitePveDevelopmentDev>> as HomeSitePveDevelopmentDev
  }
  rectangle "デスクトップ" <<HomeSitePveDesktop>> as HomeSitePveDesktop {
    skinparam RectangleBorderColor<<HomeSitePveDesktop>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveDesktop>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveDesktop>> dashed

    rectangle "==Windows / VM60000 / VLAN30\\n\\npve-x570" <<HomeSitePveDesktopWindows>> as HomeSitePveDesktopWindows
  }
  rectangle "表示端末" <<HomeSitePveDisplay>> as HomeSitePveDisplay {
    skinparam RectangleBorderColor<<HomeSitePveDisplay>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePveDisplay>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePveDisplay>> dashed

    rectangle "==MagicMirror表示 / VM5000 / VLAN40\\n\\npve-b550m" <<HomeSitePveDisplayKiosk>> as HomeSitePveDisplayKiosk
  }
}
@enduml
`;case`recording_prd`:return`@startuml
title "制御・エンコード・配信"
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

skinparam rectangle<<PremisesHomeRecordingTnlastationResources>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastationGateway>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesPveNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
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
skinparam database<<PremisesHomeDatabasesPostgres>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHomeRecordingTnlastationMediamtx>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesPveTuner_prod>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
  skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
  skinparam RectangleFontColor<<PremisesHome>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHome>> dashed

  rectangle "TNLaStation PRD" <<PremisesHomeRecordingTnlastation>> as PremisesHomeRecordingTnlastation {
    skinparam RectangleBorderColor<<PremisesHomeRecordingTnlastation>> #3b82f6
    skinparam RectangleFontColor<<PremisesHomeRecordingTnlastation>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHomeRecordingTnlastation>> dashed

    rectangle "==リソース定義" <<PremisesHomeRecordingTnlastationResources>> as PremisesHomeRecordingTnlastationResources
    rectangle "==Gateway" <<PremisesHomeRecordingTnlastationGateway>> as PremisesHomeRecordingTnlastationGateway
    rectangle "==Frontend" <<PremisesHomeRecordingTnlastationFrontend>> as PremisesHomeRecordingTnlastationFrontend
    rectangle "==Backend / API・録画制御" <<PremisesHomeRecordingTnlastationBackend>> as PremisesHomeRecordingTnlastationBackend
    rectangle "==ffmpeg encode worker" <<PremisesHomeRecordingTnlastationEncode>> as PremisesHomeRecordingTnlastationEncode
    rectangle "==ffmpeg streaming worker" <<PremisesHomeRecordingTnlastationStreaming>> as PremisesHomeRecordingTnlastationStreaming
    rectangle "==MediaMTX / HLS配信" <<PremisesHomeRecordingTnlastationMediamtx>> as PremisesHomeRecordingTnlastationMediamtx
  }
  database "==PostgreSQL PRD" <<PremisesHomeDatabasesPostgres>> as PremisesHomeDatabasesPostgres
}
rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
  skinparam RectangleBorderColor<<PremisesPve>> #428a4f
  skinparam RectangleFontColor<<PremisesPve>> #428a4f
  skinparam RectangleBorderStyle<<PremisesPve>> dashed

  database "==nas-02 / TrueNAS VM69002\\n\\npve-b550m。192.168.20.192。録画・Nextcloud・DB・監視のNFS。USB disk passthrough上のZFS。" <<PremisesPveNas02>> as PremisesPveNas02
  rectangle "==Mirakurun PRD / LXC12901\\n\\n192.168.20.132:40772。x570のPT3を使用。EPGStation/TNLaStationへチューナーAPIを提供。" <<PremisesPveTuner_prod>> as PremisesPveTuner_prod
}

PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationFrontend : <color:#15803d>Web
PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationBackend : <color:#15803d>API
PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationMediamtx : <color:#15803d>HLS
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationEncode : <color:#15803d>encode制御
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationStreaming : <color:#15803d>streaming制御
PremisesHomeRecordingTnlastationStreaming .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationMediamtx : <color:#15803d>配信
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesPveTuner_prod : <color:#15803d>Service名で接続 / PRD :40772
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeDatabasesPostgres : <color:#15803d>PostgreSQL
PremisesHomeRecordingTnlastationEncode .[#15803d,thickness=2].> PremisesHomeDatabasesPostgres : <color:#15803d>encode状態
PremisesHomeRecordingTnlastation .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>recorded・tnlastation / NFS
@enduml
`;case`recording_stg`:return`@startuml
title "制御・エンコード・配信"
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

skinparam rectangle<<PremisesHomeRecordingTnlastation_stagingResources>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastation_stagingGateway>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesPveNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHomeRecordingTnlastation_stagingFrontend>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastation_stagingBackend>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastation_stagingEncode>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingTnlastation_stagingStreaming>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesHomeDatabasesPostgres_staging>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHomeRecordingTnlastation_stagingMediamtx>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesPveTuner_stg>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
  skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
  skinparam RectangleFontColor<<PremisesHome>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHome>> dashed

  rectangle "TNLaStation STG" <<PremisesHomeRecordingTnlastation_staging>> as PremisesHomeRecordingTnlastation_staging {
    skinparam RectangleBorderColor<<PremisesHomeRecordingTnlastation_staging>> #3b82f6
    skinparam RectangleFontColor<<PremisesHomeRecordingTnlastation_staging>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHomeRecordingTnlastation_staging>> dashed

    rectangle "==リソース定義" <<PremisesHomeRecordingTnlastation_stagingResources>> as PremisesHomeRecordingTnlastation_stagingResources
    rectangle "==Gateway" <<PremisesHomeRecordingTnlastation_stagingGateway>> as PremisesHomeRecordingTnlastation_stagingGateway
    rectangle "==Frontend" <<PremisesHomeRecordingTnlastation_stagingFrontend>> as PremisesHomeRecordingTnlastation_stagingFrontend
    rectangle "==Backend / API・録画制御" <<PremisesHomeRecordingTnlastation_stagingBackend>> as PremisesHomeRecordingTnlastation_stagingBackend
    rectangle "==ffmpeg encode worker" <<PremisesHomeRecordingTnlastation_stagingEncode>> as PremisesHomeRecordingTnlastation_stagingEncode
    rectangle "==ffmpeg streaming worker" <<PremisesHomeRecordingTnlastation_stagingStreaming>> as PremisesHomeRecordingTnlastation_stagingStreaming
    rectangle "==MediaMTX / HLS配信" <<PremisesHomeRecordingTnlastation_stagingMediamtx>> as PremisesHomeRecordingTnlastation_stagingMediamtx
  }
  database "==PostgreSQL STG" <<PremisesHomeDatabasesPostgres_staging>> as PremisesHomeDatabasesPostgres_staging
}
rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
  skinparam RectangleBorderColor<<PremisesPve>> #428a4f
  skinparam RectangleFontColor<<PremisesPve>> #428a4f
  skinparam RectangleBorderStyle<<PremisesPve>> dashed

  database "==nas-02 / TrueNAS VM69002\\n\\npve-b550m。192.168.20.192。録画・Nextcloud・DB・監視のNFS。USB disk passthrough上のZFS。" <<PremisesPveNas02>> as PremisesPveNas02
  rectangle "==Mirakurun STG / LXC12904\\n\\n192.168.20.142:40772 / PX-S1UD。GRはlocal tuner、BS/CSは本番Mirakurunへの低優先度TCP fallback。" <<PremisesPveTuner_stg>> as PremisesPveTuner_stg
}

PremisesHomeRecordingTnlastation_stagingGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastation_stagingFrontend : <color:#15803d>Web
PremisesHomeRecordingTnlastation_stagingGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastation_stagingBackend : <color:#15803d>API
PremisesHomeRecordingTnlastation_stagingGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastation_stagingMediamtx : <color:#15803d>HLS
PremisesHomeRecordingTnlastation_stagingBackend .[#15803d,thickness=2].> PremisesHomeRecordingTnlastation_stagingEncode : <color:#15803d>encode制御
PremisesHomeRecordingTnlastation_stagingBackend .[#15803d,thickness=2].> PremisesHomeRecordingTnlastation_stagingStreaming : <color:#15803d>streaming制御
PremisesHomeRecordingTnlastation_stagingStreaming .[#15803d,thickness=2].> PremisesHomeRecordingTnlastation_stagingMediamtx : <color:#15803d>配信
PremisesHomeRecordingTnlastation_stagingBackend .[#15803d,thickness=2].> PremisesPveTuner_stg : <color:#15803d>Service名で接続 / STG :40772
PremisesHomeRecordingTnlastation_stagingBackend .[#15803d,thickness=2].> PremisesHomeDatabasesPostgres_staging : <color:#15803d>PostgreSQL
PremisesHomeRecordingTnlastation_stagingEncode .[#15803d,thickness=2].> PremisesHomeDatabasesPostgres_staging : <color:#15803d>encode状態
PremisesHomeRecordingTnlastation_staging .[#15803d,thickness=2].> PremisesPveNas02 : <color:#15803d>recorded-staging・tnlastation-staging / NFS
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

skinparam rectangle<<HomeSitePveControlplanesCp1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveControlplanesCp2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveControlplanesCp3>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveWorkersWorker1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveWorkersWorker2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveLoadbalancersLb1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveLoadbalancersLb2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStorageNas1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStorageNas2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSitePveStoragePbs>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveSmartlocksLoockit1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveSmartlocksLoockit2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveTunersTuner_stg>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveTunersTuner_prod>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveNetwork_managementUnifi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveDevelopmentDev>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveDesktopWindows>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSitePveDisplayKiosk>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ProvidersCloudflare>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteIx2215>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteLanNative>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteLanServer>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteLanClient>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteLanIot>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteLanManagement>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteLanGuest>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "自宅" <<HomeSite>> as HomeSite {
  skinparam RectangleBorderColor<<HomeSite>> #737373
  skinparam RectangleFontColor<<HomeSite>> #737373
  skinparam RectangleBorderStyle<<HomeSite>> dashed

  rectangle "Proxmox VEクラスタ（2ノード構成）" <<HomeSitePve>> as HomeSitePve {
    skinparam RectangleBorderColor<<HomeSitePve>> #3b82f6
    skinparam RectangleFontColor<<HomeSitePve>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSitePve>> dashed

    rectangle "home-k8s コントロールプレーン" <<HomeSitePveControlplanes>> as HomeSitePveControlplanes {
      skinparam RectangleBorderColor<<HomeSitePveControlplanes>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveControlplanes>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveControlplanes>> dashed

      rectangle "==コントロールプレーン01 / VM13001 / VLAN20\\n\\npve-x570" <<HomeSitePveControlplanesCp1>> as HomeSitePveControlplanesCp1
      rectangle "==コントロールプレーン02 / VM13002 / VLAN20\\n\\npve-b550m" <<HomeSitePveControlplanesCp2>> as HomeSitePveControlplanesCp2
      rectangle "==コントロールプレーン03 / VM13003 / VLAN20\\n\\npve-b550m" <<HomeSitePveControlplanesCp3>> as HomeSitePveControlplanesCp3
    }
    rectangle "home-k8s ワーカー" <<HomeSitePveWorkers>> as HomeSitePveWorkers {
      skinparam RectangleBorderColor<<HomeSitePveWorkers>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveWorkers>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveWorkers>> dashed

      rectangle "==home-k8s worker01 / VM13004 / VLAN20\\n\\npve-x570" <<HomeSitePveWorkersWorker1>> as HomeSitePveWorkersWorker1
      rectangle "==home-k8s worker02 / VM13005 / VLAN20\\n\\npve-b550m" <<HomeSitePveWorkersWorker2>> as HomeSitePveWorkersWorker2
    }
    rectangle "ロードバランサー" <<HomeSitePveLoadbalancers>> as HomeSitePveLoadbalancers {
      skinparam RectangleBorderColor<<HomeSitePveLoadbalancers>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveLoadbalancers>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveLoadbalancers>> dashed

      rectangle "==HAProxy / Keepalived VM10001 / VLAN20\\n\\npve-x570" <<HomeSitePveLoadbalancersLb1>> as HomeSitePveLoadbalancersLb1
      rectangle "==HAProxy / Keepalived VM10002 / VLAN20\\n\\npve-b550m" <<HomeSitePveLoadbalancersLb2>> as HomeSitePveLoadbalancersLb2
    }
    rectangle "ストレージ・バックアップ" <<HomeSitePveStorage>> as HomeSitePveStorage {
      skinparam RectangleBorderColor<<HomeSitePveStorage>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveStorage>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveStorage>> dashed

      database "==nas-01 / TrueNAS VM69001 / VLAN20\\n\\nrunner cache用NFS / pve-x570" <<HomeSitePveStorageNas1>> as HomeSitePveStorageNas1
      database "==nas-02 / TrueNAS VM69002 / VLAN20\\n\\nアプリ・DB・録画データ用NFS / pve-b550m" <<HomeSitePveStorageNas2>> as HomeSitePveStorageNas2
      database "==PBS VM14001 / VLAN20\\n\\npve-x570" <<HomeSitePveStoragePbs>> as HomeSitePveStoragePbs
    }
    rectangle "Loockit / Bluetooth制御" <<HomeSitePveSmartlocks>> as HomeSitePveSmartlocks {
      skinparam RectangleBorderColor<<HomeSitePveSmartlocks>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveSmartlocks>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveSmartlocks>> dashed

      rectangle "==Loockit 01 / CT12902 / VLAN20\\n\\npve-x570" <<HomeSitePveSmartlocksLoockit1>> as HomeSitePveSmartlocksLoockit1
      rectangle "==Loockit 02 / CT12903 / VLAN20\\n\\npve-b550m" <<HomeSitePveSmartlocksLoockit2>> as HomeSitePveSmartlocksLoockit2
    }
    rectangle "Mirakurun / チューナー" <<HomeSitePveTuners>> as HomeSitePveTuners {
      skinparam RectangleBorderColor<<HomeSitePveTuners>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveTuners>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveTuners>> dashed

      rectangle "==Mirakurun STG / CT12904・PX-S1UD / VLAN20\\n\\npve-b550m" <<HomeSitePveTunersTuner_stg>> as HomeSitePveTunersTuner_stg
      rectangle "==Mirakurun本番 / CT12901・PT3 / VLAN20\\n\\npve-x570" <<HomeSitePveTunersTuner_prod>> as HomeSitePveTunersTuner_prod
    }
    rectangle "ネットワーク管理" <<HomeSitePveNetwork_management>> as HomeSitePveNetwork_management {
      skinparam RectangleBorderColor<<HomeSitePveNetwork_management>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveNetwork_management>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveNetwork_management>> dashed

      rectangle "==UniFi OS VM13201 / native1\\n\\npve-x570" <<HomeSitePveNetwork_managementUnifi>> as HomeSitePveNetwork_managementUnifi
    }
    rectangle "開発環境" <<HomeSitePveDevelopment>> as HomeSitePveDevelopment {
      skinparam RectangleBorderColor<<HomeSitePveDevelopment>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveDevelopment>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveDevelopment>> dashed

      rectangle "==開発用Docker / VM40000 / VLAN20\\n\\npve-b550m" <<HomeSitePveDevelopmentDev>> as HomeSitePveDevelopmentDev
    }
    rectangle "デスクトップ" <<HomeSitePveDesktop>> as HomeSitePveDesktop {
      skinparam RectangleBorderColor<<HomeSitePveDesktop>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveDesktop>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveDesktop>> dashed

      rectangle "==Windows / VM60000 / VLAN30\\n\\npve-x570" <<HomeSitePveDesktopWindows>> as HomeSitePveDesktopWindows
    }
    rectangle "表示端末" <<HomeSitePveDisplay>> as HomeSitePveDisplay {
      skinparam RectangleBorderColor<<HomeSitePveDisplay>> #3b82f6
      skinparam RectangleFontColor<<HomeSitePveDisplay>> #3b82f6
      skinparam RectangleBorderStyle<<HomeSitePveDisplay>> dashed

      rectangle "==MagicMirror表示 / VM5000 / VLAN40\\n\\npve-b550m" <<HomeSitePveDisplayKiosk>> as HomeSitePveDisplayKiosk
    }
  }
  rectangle "==IX2215 / ルーター・VLAN間ACL\\n\\nGigaEthernet2: native1、tagged10/20/30/31/40。guestの他VLAN横断は拒否。IoTのIF名はGigaEthernet2.4/BVI4だがタグは40。" <<HomeSiteIx2215>> as HomeSiteIx2215
  rectangle "VLANセグメント" <<HomeSiteLan>> as HomeSiteLan {
    skinparam RectangleBorderColor<<HomeSiteLan>> #3b82f6
    skinparam RectangleFontColor<<HomeSiteLan>> #3b82f6
    skinparam RectangleBorderStyle<<HomeSiteLan>> dashed

    rectangle "==native / 192.168.0.0/24" <<HomeSiteLanNative>> as HomeSiteLanNative
    rectangle "==VLAN20 / 192.168.20.0/24" <<HomeSiteLanServer>> as HomeSiteLanServer
    rectangle "==VLAN30 / 192.168.30.0/24" <<HomeSiteLanClient>> as HomeSiteLanClient
    rectangle "==VLAN40 / 192.168.40.0/24" <<HomeSiteLanIot>> as HomeSiteLanIot
    rectangle "==VLAN10 / 192.168.10.0/24" <<HomeSiteLanManagement>> as HomeSiteLanManagement
    rectangle "==VLAN31 / guest\\n\\n他VLANへの通信は不可。全VLAN間を到達可能として描かない。" <<HomeSiteLanGuest>> as HomeSiteLanGuest
  }
}
rectangle "外部サービス" <<Providers>> as Providers {
  skinparam RectangleBorderColor<<Providers>> #737373
  skinparam RectangleFontColor<<Providers>> #737373
  skinparam RectangleBorderStyle<<Providers>> dashed

  rectangle "==Cloudflare\\n\\nCloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS APIとWARPも提供。" <<ProvidersCloudflare>> as ProvidersCloudflare
}

HomeSiteIx2215 .[#8D8D8D,thickness=2].> HomeSiteLanNative : <color:#8D8D8D>native IF
HomeSiteIx2215 .[#8D8D8D,thickness=2].> HomeSiteLanServer : <color:#8D8D8D>BVI20
HomeSiteIx2215 .[#8D8D8D,thickness=2].> HomeSiteLanClient : <color:#8D8D8D>BVI30
HomeSiteIx2215 .[#8D8D8D,thickness=2].> HomeSiteLanIot : <color:#8D8D8D>BVI4 / tag40
HomeSiteIx2215 .[#8D8D8D,thickness=2].> HomeSiteLanManagement : <color:#8D8D8D>BVI10
HomeSiteIx2215 .[#8D8D8D,thickness=2].> HomeSiteLanGuest : <color:#8D8D8D>BVI31
ProvidersCloudflare .[#8D8D8D,thickness=2].> HomeSiteLanServer : <color:#8D8D8D>WARP / private CIDR routes・policy
HomeSitePveControlplanes .[#8D8D8D,thickness=2].> HomeSiteLanServer
HomeSitePveWorkers .[#8D8D8D,thickness=2].> HomeSiteLanServer
HomeSitePveLoadbalancers .[#8D8D8D,thickness=2].> HomeSiteLanServer
HomeSitePveStorage .[#8D8D8D,thickness=2].> HomeSiteLanServer
HomeSitePveSmartlocks .[#8D8D8D,thickness=2].> HomeSiteLanServer
HomeSitePveTuners .[#8D8D8D,thickness=2].> HomeSiteLanServer
HomeSitePveNetwork_management .[#8D8D8D,thickness=2].> HomeSiteLanNative
HomeSitePveDevelopment .[#8D8D8D,thickness=2].> HomeSiteLanServer
HomeSitePveDesktop .[#8D8D8D,thickness=2].> HomeSiteLanClient
HomeSitePveDisplay .[#8D8D8D,thickness=2].> HomeSiteLanIot
@enduml
`;case`platform`:return`@startuml
title "クラスタ基盤"
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

skinparam rectangle<<PremisesHomePlatformDescheduler>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformControlplane>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformCert_approver>>{
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
skinparam rectangle<<PremisesHomeDnsMetallb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalBws>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHomeManagementArgo>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeManagementRunner>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformCloudflared>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDnsCoredns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeEso>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ExternalPublic_dns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformApi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesLanServer>>{
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
rectangle "==descheduler" <<PremisesHomePlatformDescheduler>> as PremisesHomePlatformDescheduler
rectangle "==home-k8s control-plane\\n\\nTalos Linux上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<PremisesHomePlatformControlplane>> as PremisesHomePlatformControlplane
rectangle "==kubelet-serving-cert-approver\\n\\nkubelet serving証明書のCSRを承認する。" <<PremisesHomePlatformCert_approver>> as PremisesHomePlatformCert_approver
rectangle "==Flannel / CNI" <<PremisesHomePlatformFlannel>> as PremisesHomePlatformFlannel
rectangle "==kube-proxy / Service routing" <<PremisesHomePlatformKube_proxy>> as PremisesHomePlatformKube_proxy
rectangle "==metrics-server / Metrics API\\n\\nkubeletのmetricsをMetrics APIとして提供する。" <<PremisesHomePlatformMetrics_server>> as PremisesHomePlatformMetrics_server
rectangle "==MetalLB / LANのService IP" <<PremisesHomeDnsMetallb>> as PremisesHomeDnsMetallb
rectangle "==Bitwarden Secrets Manager\\n\\nTerraform・GitHub Actions・External Secretsへ秘密情報を配布。" <<ExternalBws>> as ExternalBws
rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<PremisesHomeManagementArgo>> as PremisesHomeManagementArgo
rectangle "==ARC / 共用のrunner制御基盤\\n\\n共用Controllerとmy-infra向け実行環境。Re:Venter専用scale setは利用側の境界へ分ける。" <<PremisesHomeManagementRunner>> as PremisesHomeManagementRunner
rectangle "==cloudflared / 自宅connector" <<PremisesHomePlatformCloudflared>> as PremisesHomePlatformCloudflared
rectangle "==CoreDNS / miutaku.internal" <<PremisesHomeDnsCoredns>> as PremisesHomeDnsCoredns
rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
rectangle "==Cloudflare\\n\\nCloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS APIとWARPも提供。" <<ExternalEdge>> as ExternalEdge
rectangle "==Public DNS / 1.1.1.1・8.8.8.8" <<ExternalPublic_dns>> as ExternalPublic_dns
rectangle "==Kubernetes API / Lease" <<PremisesHomePlatformApi>> as PremisesHomePlatformApi
rectangle "==VLAN20 / 192.168.20.0/24" <<PremisesLanServer>> as PremisesLanServer
rectangle "==home-k8s worker\\n\\nTalos Linux上のkubelet・containerd。2 VMと2 RPi。" <<PremisesHomePlatformWorker>> as PremisesHomePlatformWorker
rectangle "==CoreDNS / cluster.local\\n\\nクラスタDNS。app-corednsのmiutaku.internalとは別。" <<PremisesHomePlatformCluster_dns>> as PremisesHomePlatformCluster_dns

PremisesHomePlatformDescheduler .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>Podのeviction / 配置再調整
PremisesHomePlatformApi .[#6366f1,thickness=2].> PremisesHomePlatformWorker : <color:#6366f1>Podの実行を制御
PremisesHomePlatformControlplane .[#8D8D8D,thickness=2].> PremisesHomePlatformApi : <color:#8D8D8D>API server :6443 / etcd
PremisesHomePlatformWorker .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>kubelet / Pod・Serviceのwatch
PremisesHomePlatformCert_approver .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>kubelet serving CSRの承認
PremisesHomePlatformWorker .[#15803d,thickness=2].> PremisesHomePlatformCluster_dns : <color:#15803d>Podの名前解決 / :53
PremisesHomePlatformFlannel .[#8D8D8D,thickness=2].> PremisesHomePlatformWorker : <color:#8D8D8D>CNI / Podネットワーク
PremisesHomePlatformKube_proxy .[#8D8D8D,thickness=2].> PremisesHomePlatformWorker : <color:#8D8D8D>Service / ClusterIP転送
PremisesHomePlatformMetrics_server .[#0ea5e9,thickness=2].> PremisesHomePlatformWorker : <color:#0ea5e9>kubelet metrics / :10250
PremisesHomeDnsMetallb .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>ServiceのIP割当 / controller
PremisesHomeDnsMetallb .[#8D8D8D,thickness=2].> PremisesHomeDnsCoredns : <color:#8D8D8D>LAN向けDNS / LoadBalancer IP .201
PremisesHomeDnsCoredns .[#15803d,thickness=2].> ExternalPublic_dns : <color:#15803d>非internal名をforward / DNS :53
PremisesHomeEso .[#AC4D39,thickness=2].> PremisesHomePlatformApi : <color:#AC4D39>Kubernetes Secretを同期
ExternalBws .[#AC4D39,thickness=2].> PremisesHomeEso : <color:#AC4D39>Secret注入
PremisesHomeManagementArgo .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>manifest同期 / Kubernetes API
PremisesHomeManagementRunner .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>runner Podの作成・削除
PremisesHomePlatformCloudflared .[#0ea5e9,thickness=2].> ExternalEdge : <color:#0ea5e9>外向きTunnel接続
PremisesHomeDnsMetallb .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>L2広告 / Service IP .200-.226
ExternalEdge .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>private CIDR routes / WARP policy
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
skinparam rectangle<<PremisesPveUnifi>>{
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
rectangle "==Internet" <<ExternalInternet>> as ExternalInternet
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
    skinparam RectangleBorderColor<<PremisesPve>> #428a4f
    skinparam RectangleFontColor<<PremisesPve>> #428a4f
    skinparam RectangleBorderStyle<<PremisesPve>> dashed

    rectangle "==UniFi OS / VM13201\\n\\n192.168.0.132:11443 / native1。US-8-60Wの構成・監視を管理。" <<PremisesPveUnifi>> as PremisesPveUnifi
  }
  rectangle "ネットワーク機器" <<PremisesHardwareNetwork>> as PremisesHardwareNetwork {
    skinparam RectangleBorderColor<<PremisesHardwareNetwork>> #64748b
    skinparam RectangleFontColor<<PremisesHardwareNetwork>> #64748b
    skinparam RectangleBorderStyle<<PremisesHardwareNetwork>> dashed

    rectangle "==IX2215 / ルーター・VLAN間ACL\\n\\nGigaEthernet2: native1、tagged10/20/30/31/40。guestの他VLAN横断は拒否。IoTのIF名はGigaEthernet2.4/BVI4だがタグは40。" <<PremisesHardwareNetworkRouter>> as PremisesHardwareNetworkRouter
    rectangle "==宅内Ethernet / VLAN trunk\\n\\nnative VLAN1と802.1QタグVLANを運ぶ宅内LAN。" <<PremisesHardwareNetworkEthernet>> as PremisesHardwareNetworkEthernet
    rectangle "==US-8-60W / 管理スイッチ\\n\\nPort4はnative VLAN30、Port5/6/7はnative VLAN10でtaggedを遮断。uplinkはnative1とtagged VLANを運ぶ。管理IPは192.168.0.252。" <<PremisesHardwareNetworkSwitch>> as PremisesHardwareNetworkSwitch
    rectangle "==FS Wi-Fi AP\\n\\n管理はnative VLAN1 / 192.168.0.253。" <<PremisesHardwareNetworkAp>> as PremisesHardwareNetworkAp
  }
}

ExternalInternet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkRouter : <color:#8D8D8D>WAN / GigaEthernet0
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesHardwareNetworkEthernet : <color:#8D8D8D>GigaEthernet2 / native1 + tag10,20,30,31,40
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkSwitch : <color:#8D8D8D>802.1Q / uplink
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkAp : <color:#8D8D8D>AP trunk
PremisesPveUnifi .[#6366f1,thickness=2].> PremisesHardwareNetworkSwitch : <color:#6366f1>構成・監視を管理
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesPve : <color:#8D8D8D>native1 / tag20・30・40
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

skinparam rectangle<<PremisesPveBackup_sources>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesPveNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesHomeAgentLocal_store>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesPvePbs>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHomeRecording>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeBackupsNas>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeBackupsRecordings>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeBackupsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeBackupsMetrics>>{
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

  rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
    skinparam RectangleBorderColor<<PremisesPve>> #428a4f
    skinparam RectangleFontColor<<PremisesPve>> #428a4f
    skinparam RectangleBorderStyle<<PremisesPve>> dashed

    rectangle "==VMバックアップ対象 / 2ノード" <<PremisesPveBackup_sources>> as PremisesPveBackup_sources
    database "==nas-02 / TrueNAS VM69002\\n\\npve-b550m。192.168.20.192。録画・Nextcloud・DB・監視のNFS。USB disk passthrough上のZFS。" <<PremisesPveNas02>> as PremisesPveNas02
    database "==PBS / VM14001\\n\\npve-x570。VMバックアップをIDrive e2のS3互換datastoreへ保存。" <<PremisesPvePbs>> as PremisesPvePbs
  }
  rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
    skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
    skinparam RectangleFontColor<<PremisesHome>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHome>> dashed

    rectangle "自宅監視基盤" <<PremisesHomeAgent>> as PremisesHomeAgent {
      skinparam RectangleBorderColor<<PremisesHomeAgent>> #428a4f
      skinparam RectangleFontColor<<PremisesHomeAgent>> #428a4f
      skinparam RectangleBorderStyle<<PremisesHomeAgent>> dashed

      database "==VictoriaMetrics / 自宅\\n\\n自宅のmetricsは自宅VictoriaMetricsに保存。OCI側VMへの送信とは別。" <<PremisesHomeAgentLocal_store>> as PremisesHomeAgentLocal_store
    }
    rectangle "==録画・配信 / EPGStation・TNLaStation\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
    rectangle "==DB / アプリ共有基盤" <<PremisesHomeDatabases>> as PremisesHomeDatabases
    rectangle "バックアップ処理" <<PremisesHomeBackups>> as PremisesHomeBackups {
      skinparam RectangleBorderColor<<PremisesHomeBackups>> #64748b
      skinparam RectangleFontColor<<PremisesHomeBackups>> #64748b
      skinparam RectangleBorderStyle<<PremisesHomeBackups>> dashed

      rectangle "==NAS restic / home-k8s CronJob" <<PremisesHomeBackupsNas>> as PremisesHomeBackupsNas
      rectangle "==録画 / home-k8s CronJob" <<PremisesHomeBackupsRecordings>> as PremisesHomeBackupsRecordings
      rectangle "==DB logical dump / home-k8s CronJob" <<PremisesHomeBackupsDb>> as PremisesHomeBackupsDb
      rectangle "==metrics snapshot / home-k8s CronJob" <<PremisesHomeBackupsMetrics>> as PremisesHomeBackupsMetrics
    }
  }
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  database "==IDrive e2（S3互換）\\n\\nS3互換の保存先。PBS・DB・NAS・録画・監視のバックアップを保存。" <<ExternalIdrive>> as ExternalIdrive
}

PremisesPveBackup_sources .[#b45309,thickness=2].> PremisesPvePbs : <color:#b45309>VM backup / 2ノード
PremisesPveNas02 .[#b45309,thickness=2].> PremisesHomeBackupsNas : <color:#b45309>対象dataset / restic
PremisesHomeRecording .[#b45309,thickness=2].> PremisesHomeBackupsRecordings : <color:#b45309>録画ファイル専用job
PremisesHomeDatabases .[#b45309,thickness=2].> PremisesHomeBackupsDb : <color:#b45309>整合性あるlogical dump
PremisesHomeAgentLocal_store .[#b45309,thickness=2].> PremisesHomeBackupsMetrics : <color:#b45309>snapshot / vmbackup
PremisesPvePbs .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>S3 datastore / VM backup
PremisesHomeBackups .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>用途別prefix / 暗号化・retention
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
skinparam rectangle<<PremisesPve>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<PremisesHomeManagementArgo>>{
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

  rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
    skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
    skinparam RectangleFontColor<<PremisesHome>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHome>> dashed

    rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<PremisesHomeManagementArgo>> as PremisesHomeManagementArgo
  }
  rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
    skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
    skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHardware>> dashed

    rectangle "==ネットワーク機器\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<PremisesHardwareNetwork>> as PremisesHardwareNetwork
  }
  rectangle "==Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve
}

User .[#15803d,thickness=2].> ExternalEdgeAccess : <color:#15803d>HTTPS / 利用時の認証
Operator .[#6366f1,thickness=2].> ExternalEdgeAccess : <color:#6366f1>HTTPS / 管理時の認証
Client .[#15803d,thickness=2].> ExternalEdgeMtls : <color:#15803d>クライアント証明書
ExternalEdgeAccess .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>Access認証後の転送
ExternalEdgeMtls .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>mTLS検証済みのAPIリクエスト
ExternalEdgeTunnel .[#8D8D8D,thickness=2].> ExternalEdgeRoutesProtected : <color:#8D8D8D>hostname転送
ExternalEdgeTunnel .[#15803d,thickness=2].> ExternalEdgeRoutesExceptions : <color:#15803d>hostname転送
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> PremisesPve : <color:#6366f1>認証後の内部接続
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> PremisesHomeManagementArgo : <color:#6366f1>認証後の内部接続
ExternalEdgeTunnel .[#6366f1,thickness=2].> ConsumersReventer : <color:#6366f1>hostname転送
ExternalEdgeRoutesProtected .[#6366f1,thickness=2].> PremisesHardwareNetwork : <color:#6366f1>認証後の内部接続
@enduml
`;case`recording`:return`@startuml
title "PRD・STG"
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
skinparam rectangle<<PremisesHomeRecordingTnlastation>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeRecordingTnlastation_staging>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesPveTuner_stg>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesPveTuner_prod>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "home-k8s（Talos Linux）" <<PremisesHome>> as PremisesHome {
  skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
  skinparam RectangleFontColor<<PremisesHome>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHome>> dashed

  rectangle "録画・配信 / EPGStation・TNLaStation" <<PremisesHomeRecording>> as PremisesHomeRecording {
    skinparam RectangleBorderColor<<PremisesHomeRecording>> #64748b
    skinparam RectangleFontColor<<PremisesHomeRecording>> #64748b
    skinparam RectangleBorderStyle<<PremisesHomeRecording>> dashed

    rectangle "==EPGStation" <<PremisesHomeRecordingEpgstation>> as PremisesHomeRecordingEpgstation
    rectangle "==TNLaStation PRD\\n\\napp-tnlastation。PRDのMirakurun・PostgreSQLと録画領域を使用。" <<PremisesHomeRecordingTnlastation>> as PremisesHomeRecordingTnlastation
    rectangle "==TNLaStation STG\\n\\napp-tnlastation-staging。STGのMirakurun・PostgreSQLと録画領域を使用。" <<PremisesHomeRecordingTnlastation_staging>> as PremisesHomeRecordingTnlastation_staging
  }
}
rectangle "Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve {
  skinparam RectangleBorderColor<<PremisesPve>> #428a4f
  skinparam RectangleFontColor<<PremisesPve>> #428a4f
  skinparam RectangleBorderStyle<<PremisesPve>> dashed

  rectangle "==Mirakurun STG / LXC12904\\n\\n192.168.20.142:40772 / PX-S1UD。GRはlocal tuner、BS/CSは本番Mirakurunへの低優先度TCP fallback。" <<PremisesPveTuner_stg>> as PremisesPveTuner_stg
  rectangle "==Mirakurun PRD / LXC12901\\n\\n192.168.20.132:40772。x570のPT3を使用。EPGStation/TNLaStationへチューナーAPIを提供。" <<PremisesPveTuner_prod>> as PremisesPveTuner_prod
}

PremisesHomeRecordingEpgstation .[#15803d,thickness=2].> PremisesPveTuner_prod : <color:#15803d>Service名で接続 / PRD :40772
PremisesHomeRecordingTnlastation .[#15803d,thickness=2].> PremisesPveTuner_prod : <color:#15803d>Service名で接続 / PRD :40772
PremisesHomeRecordingTnlastation_staging .[#15803d,thickness=2].> PremisesPveTuner_stg : <color:#15803d>Service名で接続 / STG :40772
PremisesPveTuner_stg .[#15803d,thickness=2].> PremisesPveTuner_prod : <color:#15803d>BS/CS TCP fallback
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
skinparam rectangle<<PremisesPve>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<PremisesHardwareNetwork>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
  skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
  skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHardware>> dashed

  rectangle "UPS / NUT" <<PremisesHardwareUps>> as PremisesHardwareUps {
    skinparam RectangleBorderColor<<PremisesHardwareUps>> #64748b
    skinparam RectangleFontColor<<PremisesHardwareUps>> #64748b
    skinparam RectangleBorderStyle<<PremisesHardwareUps>> dashed

    rectangle "==UPS A / APC RS550S 2020" <<PremisesHardwareUpsUps_a>> as PremisesHardwareUpsUps_a
    rectangle "==UPS B / APC RS550S 2025" <<PremisesHardwareUpsUps_b>> as PremisesHardwareUpsUps_b
    rectangle "==商用AC" <<PremisesHardwareUpsMains>> as PremisesHardwareUpsMains
    rectangle "==UPS A / サージのみ口・非backup" <<PremisesHardwareUpsSurge_a>> as PremisesHardwareUpsSurge_a
    rectangle "==NUT Pi 01 / 192.168.10.112\\n\\nupsd・usbhid-ups・upsmon。USB接続のUPS Aをprimary監視し、給電元UPS B（ups-b@192.168.10.113）をsecondary監視。UPS Bの残量10%で停止。" <<PremisesHardwareUpsPi_a>> as PremisesHardwareUpsPi_a
    rectangle "==NUT Pi 02 / 192.168.10.113\\n\\nupsd・usbhid-ups・upsmon。USB接続のUPS Bをprimary監視し、給電元UPS A（ups-a@192.168.10.112）をsecondary監視。UPS Aの残量10%で停止。" <<PremisesHardwareUpsPi_b>> as PremisesHardwareUpsPi_b
  }
  rectangle "==ネットワーク機器\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<PremisesHardwareNetwork>> as PremisesHardwareNetwork
}
rectangle "==Proxmox VEクラスタ（2ノード構成）" <<PremisesPve>> as PremisesPve

PremisesPve .[#0ea5e9,thickness=2].> PremisesHardwareUpsPi_a : <color:#0ea5e9>pve-x570 / 残量80%で停止
PremisesPve .[#0ea5e9,thickness=2].> PremisesHardwareUpsPi_b : <color:#0ea5e9>pve-b550m / 残量80%で停止
PremisesHardwareUpsUps_a .[#AC4D39,thickness=2].> PremisesPve : <color:#AC4D39>pve-x570へ給電
PremisesHardwareUpsUps_b .[#AC4D39,thickness=2].> PremisesPve : <color:#AC4D39>pve-b550mへ給電
PremisesHardwareUpsMains .[#AC4D39,thickness=2].> PremisesHardwareUpsSurge_a : <color:#AC4D39>非バックアップ出力
PremisesHardwareUpsMains .[#AC4D39,thickness=2].> PremisesHardwareUpsUps_a : <color:#AC4D39>AC入力
PremisesHardwareUpsSurge_a .[#AC4D39,thickness=2].> PremisesHardwareUpsUps_b : <color:#AC4D39>UPS BのAC入力
PremisesHardwareUpsUps_a .[#8D8D8D,thickness=2].> PremisesHardwareUpsPi_a : <color:#8D8D8D>USB / ups-a
PremisesHardwareUpsUps_a .[#AC4D39,thickness=2].> PremisesHardwareUpsPi_b : <color:#AC4D39>Pi 02へ給電
PremisesHardwareUpsUps_b .[#AC4D39,thickness=2].> PremisesHardwareUpsPi_a : <color:#AC4D39>Pi 01へ給電
PremisesHardwareUpsUps_b .[#8D8D8D,thickness=2].> PremisesHardwareUpsPi_b : <color:#8D8D8D>USB / ups-b
PremisesHardwareUpsPi_a .[#0ea5e9,thickness=2].> PremisesHardwareUpsPi_b : <color:#0ea5e9>ups-b@192.168.10.113 / 給電元Bを監視
PremisesHardwareUpsPi_b .[#0ea5e9,thickness=2].> PremisesHardwareUpsPi_a : <color:#0ea5e9>ups-a@192.168.10.112 / 給電元Aを監視
PremisesHardwareUpsUps_b .[#AC4D39,thickness=2].> PremisesHardwareNetwork : <color:#AC4D39>NW機器へ給電
@enduml
`;default:throw Error(`Unknown viewId: `+e)}};export{e as pumlSource};