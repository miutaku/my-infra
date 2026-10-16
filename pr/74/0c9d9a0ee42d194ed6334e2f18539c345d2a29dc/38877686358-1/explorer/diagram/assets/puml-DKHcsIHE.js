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
skinparam rectangle<<PremisesHardwareNetwork>>{
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
skinparam rectangle<<PremisesHardwareRpi_workers>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataNas>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesDataPbs>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ExternalGrafana>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalBws>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<ExternalIdrive>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
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
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
    skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
    skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHardware>> dashed

    rectangle "==ネットワーク機器\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<PremisesHardwareNetwork>> as PremisesHardwareNetwork
    rectangle "==pve-x570 / Proxmox\\n\\n192.168.0.115。Talos VM2台・TrueNAS・PBS・UniFi・Loockit/Mirakurunなどを実行。" <<PremisesHardwareX570>> as PremisesHardwareX570
    rectangle "==pve-b550m / Proxmox\\n\\n192.168.0.119。Talos VM3台・TrueNAS・開発VM・kiosk・Loockit/Mirakurunを実行。" <<PremisesHardwareB550m>> as PremisesHardwareB550m
    rectangle "==RPi worker ×2\\n\\nTalos worker。UPS監視用Piとは別機器。" <<PremisesHardwareRpi_workers>> as PremisesHardwareRpi_workers
  }
  rectangle "保存・バックアップ" <<PremisesData>> as PremisesData {
    skinparam RectangleBorderColor<<PremisesData>> #737373
    skinparam RectangleFontColor<<PremisesData>> #737373
    skinparam RectangleBorderStyle<<PremisesData>> dashed

    database "==TrueNAS VM ×2 / ZFS・NFS\\n\\n自宅Proxmoxの各ホストに1台ずつ、VM69001・69002。USB diskをpassthrough。Kubernetes PVCやメディアを保存。マウント・データセットとNFS share、VMバックアップを区別する。" <<PremisesDataNas>> as PremisesDataNas
    database "==Proxmox Backup Server\\n\\nVMバックアップ。NFSのオンライン利用経路とは別。" <<PremisesDataPbs>> as PremisesDataPbs
  }
  rectangle "==Talos / home-k8s\\n\\nTalos CP VM3台・worker VM2台とRPi worker2台で構成。アプリ・クラスタ基盤・監視・運用・DB/バックアップを用途別に表示し、Application全件は一覧へ対応付ける。Pod配置は動的。" <<PremisesHome>> as PremisesHome
}
rectangle "外部サービス / SaaS・公開サービス" <<External>> as External {
  skinparam RectangleBorderColor<<External>> #3b82f6
  skinparam RectangleFontColor<<External>> #3b82f6
  skinparam RectangleBorderStyle<<External>> dashed

  rectangle "==Cloudflare\\n\\n自宅サービスの公開入口は原則Accessで認証してTunnelへ転送。mTLS専用APIとWARP/LAN経路は別に示す。" <<ExternalEdge>> as ExternalEdge
  rectangle "==Grafana Cloud / PDC\\n\\nPDC agentが外向き接続を作り、Grafanaからprivate監視データを照会する。ここでは自宅VictoriaMetricsの照会経路を示す。Re:Venter専用の監視構成は利用側の図で管理。" <<ExternalGrafana>> as ExternalGrafana
  rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<ExternalBws>> as ExternalBws
  database "==IDrive e2 / S3\\n\\nPBS datastore、DB logical dump、NAS restic、録画、VictoriaMetrics snapshotの保存先。用途・prefix・整合性を分ける。" <<ExternalIdrive>> as ExternalIdrive
}
rectangle "基盤の利用側 / 別リポジトリ" <<Consumers>> as Consumers {
  skinparam RectangleBorderColor<<Consumers>> #64748b
  skinparam RectangleFontColor<<Consumers>> #64748b
  skinparam RectangleBorderStyle<<Consumers>> dashed

  rectangle "==Re:Venter\\n\\n基盤を利用するワークロードの一つ。OCI/OKE・監視VM・GitOps/CI/Terraformによる変更経路・専用runner/agent・レビュー配信を含む専用構成はこの境界に集約。my-infraには共有基盤との接点と定義元の参照だけを残し、構成・通信の詳細はreventer側の図へ委ねる。" <<ConsumersReventer>> as ConsumersReventer
}

User .[#15803d,thickness=2].> ExternalEdge : <color:#15803d>HTTPS / 利用時の認証
Operator .[#6366f1,thickness=2].> ExternalEdge : <color:#6366f1>HTTPS / 管理時の認証
Operator .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>照会
PremisesHardwareNetwork .[#8D8D8D,thickness=2].> PremisesHardwareX570 : <color:#8D8D8D>native1管理 / ゲストtag20・30 / 配線ポート未確定
PremisesHardwareNetwork .[#8D8D8D,thickness=2].> PremisesHardwareB550m : <color:#8D8D8D>native1管理 / ゲストtag20・40 / 配線ポート未確定
PremisesHardwareNetwork .[#8D8D8D,thickness=2].> PremisesHardwareRpi_workers : <color:#8D8D8D>VLAN10 / arm64 worker
ExternalEdge .[#15803d,thickness=2].> PremisesHome : <color:#15803d>認証済みHTTP / Access・mTLS → 内部Service
ExternalBws .[#AC4D39,thickness=2].> PremisesHome : <color:#AC4D39>Secret注入
ExternalGrafana .[#0ea5e9,thickness=2].> PremisesHome : <color:#0ea5e9>PDC経由の検索
PremisesHardwareNetwork .[#15803d,thickness=2].> PremisesHome : <color:#15803d>LAN / 内部DNS
PremisesHardwareX570 .[#3b82f6,thickness=2].> PremisesHome : <color:#3b82f6>Talos VM13001・13004 / CP1・worker1
PremisesHardwareB550m .[#3b82f6,thickness=2].> PremisesHome : <color:#3b82f6>Talos VM13002・13003・13005 / CP2・worker1
PremisesHardwareRpi_workers .[#3b82f6,thickness=2].> PremisesHome : <color:#3b82f6>Talos worker03・04 / arm64
PremisesHome .[#0ea5e9,thickness=2].> ExternalGrafana : <color:#0ea5e9>外向きPDC接続
PremisesHardwareX570 .[#3b82f6,thickness=2].> PremisesDataNas : <color:#3b82f6>TrueNAS VM69001 / USB disk passthrough
PremisesHardwareB550m .[#3b82f6,thickness=2].> PremisesDataNas : <color:#3b82f6>TrueNAS VM69002 / USB disk passthrough
PremisesDataNas .[#8D8D8D,thickness=2].> PremisesHome : <color:#8D8D8D>NFSストレージを提供
PremisesHardwareX570 .[#b45309,thickness=2].> PremisesDataPbs : <color:#b45309>VM backup
PremisesHardwareB550m .[#b45309,thickness=2].> PremisesDataPbs : <color:#b45309>VM backup
PremisesDataPbs .[#b45309,thickness=2].> ExternalIdrive : <color:#b45309>S3 datastore / VM backup
PremisesHome .[#8D8D8D,thickness=2].> ConsumersReventer : <color:#8D8D8D>共有ArgoCD・ARCを提供 / 専用構成は利用側へ
PremisesHardware .[#b45309,thickness=2].> PremisesHome : <color:#b45309>exporter収集
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
skinparam rectangle<<PremisesHardwareKiosk>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatform>>{
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
skinparam rectangle<<PremisesHomeAppsLoockit>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeAppsCoupon_manager>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<PremisesHomeAppsWol>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
skinparam rectangle<<PremisesDataDatabases>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalAi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalAnnict>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataNasNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Cloudflare\\n\\n自宅サービスの公開入口は原則Accessで認証してTunnelへ転送。mTLS専用APIとWARP/LAN経路は別に示す。" <<ExternalEdge>> as ExternalEdge
rectangle "==MagicMirror表示 / VM5000\\n\\nVLAN40のDisplayLink kiosk。MagicMirrorのHTTP画面を表示。" <<PremisesHardwareKiosk>> as PremisesHardwareKiosk
rectangle "Talos / home-k8s" <<PremisesHome>> as PremisesHome {
  skinparam RectangleBorderColor<<PremisesHome>> #3b82f6
  skinparam RectangleFontColor<<PremisesHome>> #3b82f6
  skinparam RectangleBorderStyle<<PremisesHome>> dashed

  rectangle "==クラスタ基盤 / Talos\\n\\nArgoCD Application以外のbootstrapも含む。クラスタDNSと宅内DNS、metrics-serverと監視保存基盤は区別する。" <<PremisesHomePlatform>> as PremisesHomePlatform
  rectangle "==Nextcloud\\n\\nファイル共有 / app-nextcloud。MariaDB・Redisとnas-02のNFSを使用。" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
  rectangle "==録画・配信 / EPGStation・TNLaStation\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
  rectangle "生活サービス / Loockit・Coupon・WOL" <<PremisesHomeApps>> as PremisesHomeApps {
    skinparam RectangleBorderColor<<PremisesHomeApps>> #64748b
    skinparam RectangleFontColor<<PremisesHomeApps>> #64748b
    skinparam RectangleBorderStyle<<PremisesHomeApps>> dashed

    rectangle "==Loockit / BLEスマートロック\\n\\nKubernetesのHAProxyが2台のLXCのreadyzを監視しactiveへ転送。APIはmTLS、実機のBLE操作はLXC/BlueZが担当。" <<PremisesHomeAppsLoockit>> as PremisesHomeAppsLoockit
    rectangle "==Coupon Manager\\n\\nWeb → API → PostgreSQL。画像とData Protection keyはnas-02。外部AI APIを利用。" <<PremisesHomeAppsCoupon_manager>> as PremisesHomeAppsCoupon_manager
    rectangle "==Wake-on-LAN\\n\\napp-gptwol。LANにMagic Packetを送信して対象PCを起動する。" <<PremisesHomeAppsWol>> as PremisesHomeAppsWol
    rectangle "==Annict scraper / 番組照合\\n\\nAnnict APIを照会して録画同期CronJobへ番組情報を提供。" <<PremisesHomeAppsAnnict_scraper>> as PremisesHomeAppsAnnict_scraper
    rectangle "==MagicMirror / ダッシュボード\\n\\napp-magic-mirror / HTTP:8080。VLAN40のDisplayLink kiosk VM5000で表示。" <<PremisesHomeAppsMagic_mirror>> as PremisesHomeAppsMagic_mirror
  }
}
rectangle "==DB / アプリ共有基盤" <<PremisesDataDatabases>> as PremisesDataDatabases
rectangle "==Gemini API / OpenAI互換\\n\\nCoupon ManagerのAi設定から利用。認証値は掲載しない。" <<ExternalAi>> as ExternalAi
rectangle "==Annict API" <<ExternalAnnict>> as ExternalAnnict
database "==TrueNAS VM69002 / nas-02\\n\\npve-b550mのVM。USB disk passthrough上のZFS datasetをNFS公開。アプリ・DB・監視のデータを保存。" <<PremisesDataNasNas02>> as PremisesDataNasNas02

ExternalEdge .[#15803d,thickness=2].> PremisesHomeNextcloud : <color:#15803d>nextcloud / 80 / Access
PremisesHomePlatform .[#3b82f6,thickness=2].> PremisesHomeNextcloud : <color:#3b82f6>Nextcloud Pod
ExternalEdge .[#15803d,thickness=2].> PremisesHomeRecording : <color:#15803d>[...]
PremisesHomePlatform .[#3b82f6,thickness=2].> PremisesHomeRecording : <color:#3b82f6>録画・配信Pod
ExternalEdge .[#15803d,thickness=2].> PremisesHomeAppsLoockit : <color:#15803d>loockit-api / 8080 / mTLS
ExternalEdge .[#15803d,thickness=2].> PremisesHomeAppsCoupon_manager : <color:#15803d>coupon-manager / 80 / Access
ExternalEdge .[#15803d,thickness=2].> PremisesHomeAppsWol : <color:#15803d>wol / 5000 / Access
PremisesHomeRecording .[#15803d,thickness=2].> PremisesHomeAppsAnnict_scraper : <color:#15803d>番組照合
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>MYSQL_HOST / MariaDB
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>[...]
PremisesHomeAppsCoupon_manager .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>PostgreSQL
PremisesHomeNextcloud .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>html・data / NFS
PremisesHomeRecording .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>録画・thumbnail・drop / NFS
PremisesHomeAppsCoupon_manager .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>images・Data Protection keys / PVC
PremisesDataDatabases .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>DB用NFS PVC
PremisesHardwareKiosk .[#15803d,thickness=2].> PremisesHomeAppsMagic_mirror : <color:#15803d>表示
PremisesHomeAppsAnnict_scraper .[#15803d,thickness=2].> ExternalAnnict : <color:#15803d>Annict API
PremisesHomeAppsCoupon_manager .[#15803d,thickness=2].> ExternalAi : <color:#15803d>AI API
PremisesHomePlatform .[#3b82f6,thickness=2].> PremisesHomeApps : <color:#3b82f6>アプリPod / HAProxy・Web・API
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
PremisesManagementRunner .[#6366f1,thickness=2].> PremisesHome : <color:#6366f1>runner Podの作成・削除
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
`;case`coupon`:return`@startuml
title "Web・API・DB・AI"
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
skinparam rectangle<<PremisesHomeAppsCoupon_managerResources>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAppsCoupon_managerWeb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeAppsCoupon_managerApi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataDatabasesPostgres>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesDataNasNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<ExternalAi>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Cloudflare\\n\\n自宅サービスの公開入口は原則Accessで認証してTunnelへ転送。mTLS専用APIとWARP/LAN経路は別に示す。" <<ExternalEdge>> as ExternalEdge
rectangle "==リソース定義" <<PremisesHomeAppsCoupon_managerResources>> as PremisesHomeAppsCoupon_managerResources
rectangle "==Web / :80" <<PremisesHomeAppsCoupon_managerWeb>> as PremisesHomeAppsCoupon_managerWeb
rectangle "==API / :8080" <<PremisesHomeAppsCoupon_managerApi>> as PremisesHomeAppsCoupon_managerApi
database "==PostgreSQL / 本番・STG" <<PremisesDataDatabasesPostgres>> as PremisesDataDatabasesPostgres
database "==TrueNAS VM69002 / nas-02\\n\\npve-b550mのVM。USB disk passthrough上のZFS datasetをNFS公開。アプリ・DB・監視のデータを保存。" <<PremisesDataNasNas02>> as PremisesDataNasNas02
rectangle "==Gemini API / OpenAI互換\\n\\nCoupon ManagerのAi設定から利用。認証値は掲載しない。" <<ExternalAi>> as ExternalAi

ExternalEdge .[#15803d,thickness=2].> PremisesHomeAppsCoupon_managerWeb : <color:#15803d>coupon-manager / 80 / Access
PremisesHomeAppsCoupon_managerWeb .[#15803d,thickness=2].> PremisesHomeAppsCoupon_managerApi : <color:#15803d>内部API
PremisesHomeAppsCoupon_managerApi .[#15803d,thickness=2].> PremisesDataDatabasesPostgres : <color:#15803d>PostgreSQL
PremisesHomeAppsCoupon_managerApi .[#15803d,thickness=2].> ExternalAi : <color:#15803d>AI API
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
skinparam rectangle<<PremisesHomeAppsLoockitProxy>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareLoockit_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareLoockit_b>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareBle_a>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHardwareBle_b>>{
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
rectangle "==HAProxy / :8080・:50051" <<PremisesHomeAppsLoockitProxy>> as PremisesHomeAppsLoockitProxy
rectangle "==Loockit 01 / CT12902\\n\\n192.168.20.133:8080 / :50051。x570のUSB Bluetooth・BlueZに接続。Leaseでactiveを選出。" <<PremisesHardwareLoockit_a>> as PremisesHardwareLoockit_a
rectangle "==Loockit 02 / CT12903\\n\\n192.168.20.134:8080 / :50051。b550mのUSB Bluetooth・BlueZに接続。Leaseでactiveを選出。" <<PremisesHardwareLoockit_b>> as PremisesHardwareLoockit_b
rectangle "==x570 BlueZ / Bluetooth" <<PremisesHardwareBle_a>> as PremisesHardwareBle_a
rectangle "==b550m BlueZ / Bluetooth" <<PremisesHardwareBle_b>> as PremisesHardwareBle_b
rectangle "==Kubernetes API / Lease" <<PremisesHomePlatformApi>> as PremisesHomePlatformApi

Client .[#15803d,thickness=2].> ExternalEdgeMtls : <color:#15803d>クライアント証明書
ExternalEdgeMtls .[#6366f1,thickness=2].> ExternalEdgeTunnel : <color:#6366f1>mTLS検証済みのAPIリクエスト
ExternalEdgeTunnel .[#15803d,thickness=2].> PremisesHomeAppsLoockitProxy : <color:#15803d>loockit-api / 8080 / mTLS
PremisesHomeAppsLoockitProxy .[#15803d,thickness=2].> PremisesHardwareLoockit_a : <color:#15803d>readyz / leaderのみ
PremisesHomeAppsLoockitProxy .[#15803d,thickness=2].> PremisesHardwareLoockit_b : <color:#15803d>readyz / leaderのみ
PremisesHardwareLoockit_a .[#15803d,thickness=2].> PremisesHardwareBle_a : <color:#15803d>read-only D-Bus / org.bluez
PremisesHardwareLoockit_b .[#15803d,thickness=2].> PremisesHardwareBle_b : <color:#15803d>read-only D-Bus / org.bluez
PremisesHardwareLoockit_a .[#15803d,thickness=2].> PremisesHomePlatformApi : <color:#15803d>Lease leader election
PremisesHardwareLoockit_b .[#15803d,thickness=2].> PremisesHomePlatformApi : <color:#15803d>Lease leader election
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
skinparam database<<PremisesDataDatabasesMariadb>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<PremisesDataNasNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Cloudflare\\n\\n自宅サービスの公開入口は原則Accessで認証してTunnelへ転送。mTLS専用APIとWARP/LAN経路は別に示す。" <<ExternalEdge>> as ExternalEdge
rectangle "Nextcloud" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud {
  skinparam RectangleBorderColor<<PremisesHomeNextcloud>> #64748b
  skinparam RectangleFontColor<<PremisesHomeNextcloud>> #64748b
  skinparam RectangleBorderStyle<<PremisesHomeNextcloud>> dashed

  rectangle "==リソース定義" <<PremisesHomeNextcloudResources>> as PremisesHomeNextcloudResources
  rectangle "==Nextcloud / PHP・HTTP :80" <<PremisesHomeNextcloudWeb>> as PremisesHomeNextcloudWeb
  database "==Redis / locking・cache" <<PremisesHomeNextcloudRedis>> as PremisesHomeNextcloudRedis
}
database "==MariaDB" <<PremisesDataDatabasesMariadb>> as PremisesDataDatabasesMariadb
database "==TrueNAS VM69002 / nas-02\\n\\npve-b550mのVM。USB disk passthrough上のZFS datasetをNFS公開。アプリ・DB・監視のデータを保存。" <<PremisesDataNasNas02>> as PremisesDataNasNas02

ExternalEdge .[#15803d,thickness=2].> PremisesHomeNextcloudWeb : <color:#15803d>nextcloud / 80 / Access
PremisesHomeNextcloudWeb .[#15803d,thickness=2].> PremisesHomeNextcloudRedis : <color:#15803d>Redis :6379 / locking・cache
PremisesHomeNextcloudWeb .[#15803d,thickness=2].> PremisesDataDatabasesMariadb : <color:#15803d>MYSQL_HOST / MariaDB
PremisesHomeNextcloudWeb .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>html・data / NFS
@enduml
`;case`platform`:return`@startuml
title "Kubernetesの動作と支援サービス"
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
skinparam rectangle<<PremisesHomePlatformWorker>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformCloudflared>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomePlatformCluster_dns>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<ExternalEdge>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesLanServer>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==descheduler" <<PremisesHomePlatformDescheduler>> as PremisesHomePlatformDescheduler
rectangle "==home-k8s control-plane\\n\\nTalos OS上のAPI server・etcd・scheduler・controller-manager。3 VMで構成。" <<PremisesHomePlatformControlplane>> as PremisesHomePlatformControlplane
rectangle "==kubelet-serving-cert-approver\\n\\n稼働確認済み。リポジトリ内の導入宣言は未確認。" <<PremisesHomePlatformCert_approver>> as PremisesHomePlatformCert_approver
rectangle "==Flannel / CNI" <<PremisesHomePlatformFlannel>> as PremisesHomePlatformFlannel
rectangle "==kube-proxy / Service routing" <<PremisesHomePlatformKube_proxy>> as PremisesHomePlatformKube_proxy
rectangle "==metrics-server / Metrics API\\n\\n稼働確認済み。リポジトリ内の導入宣言は未確認。" <<PremisesHomePlatformMetrics_server>> as PremisesHomePlatformMetrics_server
rectangle "==MetalLB / LANのService IP" <<PremisesHomeDnsMetallb>> as PremisesHomeDnsMetallb
rectangle "==Bitwarden Secrets Manager\\n\\nBWS。Terraform・CI・External Secretsから利用する秘密情報の管理先。参照元の定義だけを図示し、秘密値は保持しない。" <<ExternalBws>> as ExternalBws
rectangle "==自宅ArgoCD\\n\\nhome-k8sとRe:Venter STG・PRDを同期する。自宅停止時は同期が止まるがOKEの実行・スケールは継続する。" <<PremisesManagementArgo>> as PremisesManagementArgo
rectangle "==ARC / 共用のrunner制御基盤\\n\\n共用Controllerとmy-infra向け実行環境。Re:Venter専用scale setは利用側の境界へ分ける。" <<PremisesManagementRunner>> as PremisesManagementRunner
rectangle "==CoreDNS / miutaku.internal" <<PremisesHomeDnsCoredns>> as PremisesHomeDnsCoredns
rectangle "==External Secrets Operator\\n\\nClusterSecretStoreを通してBWSからSecretを注入する。秘密値は図・生成一覧へ含めない。" <<PremisesHomeEso>> as PremisesHomeEso
rectangle "==Public DNS / 1.1.1.1・8.8.8.8" <<ExternalPublic_dns>> as ExternalPublic_dns
rectangle "==Kubernetes API / Lease" <<PremisesHomePlatformApi>> as PremisesHomePlatformApi
rectangle "==home-k8s worker\\n\\nTalos OS上のkubelet・containerd。2 VMと2 RPi。アプリPodの固定配置を意味しない。" <<PremisesHomePlatformWorker>> as PremisesHomePlatformWorker
rectangle "==cloudflared / 自宅connector" <<PremisesHomePlatformCloudflared>> as PremisesHomePlatformCloudflared
rectangle "==CoreDNS / cluster.local\\n\\nクラスタDNS。app-corednsのmiutaku.internalとは別。稼働照合で確認。" <<PremisesHomePlatformCluster_dns>> as PremisesHomePlatformCluster_dns
rectangle "==Cloudflare\\n\\n自宅サービスの公開入口は原則Accessで認証してTunnelへ転送。mTLS専用APIとWARP/LAN経路は別に示す。" <<ExternalEdge>> as ExternalEdge
rectangle "==VLAN20 / 192.168.20.0/24" <<PremisesLanServer>> as PremisesLanServer

PremisesHomePlatformDescheduler .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>Podのeviction / 配置再調整
PremisesHomePlatformWorker .[#3b82f6,thickness=2].> PremisesHomePlatformCloudflared : <color:#3b82f6>connector Pod
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
PremisesManagementArgo .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>manifest同期 / Kubernetes API
PremisesManagementRunner .[#6366f1,thickness=2].> PremisesHomePlatformApi : <color:#6366f1>runner Podの作成・削除
PremisesHomePlatformCloudflared .[#0ea5e9,thickness=2].> ExternalEdge : <color:#0ea5e9>外向きTunnel接続
PremisesHomeDnsMetallb .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>L2広告 / Service IP .200-.226
ExternalEdge .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>private CIDR routes / WARP policy
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
skinparam rectangle<<PremisesHomeDns>>{
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
rectangle "自宅" <<Premises>> as Premises {
  skinparam RectangleBorderColor<<Premises>> #3b82f6
  skinparam RectangleFontColor<<Premises>> #3b82f6
  skinparam RectangleBorderStyle<<Premises>> dashed

  rectangle "==US-8-60W / 管理スイッチ\\n\\nUniFi Network DB・PVE側LLDPで確認。Port4はnative VLAN30、Port5/6/7はnative VLAN10でtaggedを遮断。uplinkはnative1とtagged VLANを運ぶ。管理IPは稼働時192.168.0.252。DHCPのVLAN10予約を稼働中IPと混同しない。" <<PremisesHardwareNetworkSwitch>> as PremisesHardwareNetworkSwitch
  rectangle "==IX2215 / ルーター・VLAN間ACL\\n\\nGigaEthernet2: native1、tagged10/20/30/31/40。guestの他VLAN横断は拒否。IoTのIF名はGigaEthernet2.4/BVI4だがタグは40。" <<PremisesHardwareNetworkRouter>> as PremisesHardwareNetworkRouter
  rectangle "==enp7s0 / vmbr0\\n\\nPVE管理はnative1。ゲストNICのtag20/30を確認。vmbr0v20/v30/v40とNIC subinterfaceが存在し、vlan-aware bridge設定とは区別する。" <<PremisesHardwareX570Bridge>> as PremisesHardwareX570Bridge
  rectangle "==enp6s0 / vmbr0\\n\\nPVE管理はnative1。ゲストNICのtag20/40を確認。vmbr0v20/v30/v40とNIC subinterfaceが存在。" <<PremisesHardwareB550mBridge>> as PremisesHardwareB550mBridge
  rectangle "==内部DNS / MetalLB\\n\\nmiutaku.internalはCoreDNS。MetalLBでLAN内Service IPを払い出す。" <<PremisesHomeDns>> as PremisesHomeDns
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
PremisesHomeDns .[#8D8D8D,thickness=2].> PremisesLanServer : <color:#8D8D8D>L2広告 / Service IP .200-.226
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

skinparam rectangle<<HomeSiteB550mBluez>>{
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
skinparam rectangle<<HomeSiteB550mLoockitApp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteB550mTunerApp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteTalos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam database<<HomeSiteB550mNas2>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
skinparam rectangle<<HomeSiteLan>>{
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

    rectangle "==BlueZ / USB Bluetooth" <<HomeSiteB550mBluez>> as HomeSiteB550mBluez
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
    rectangle "Loockit 02 / CT12903" <<HomeSiteB550mLoockit>> as HomeSiteB550mLoockit {
      skinparam RectangleBorderColor<<HomeSiteB550mLoockit>> #64748b
      skinparam RectangleFontColor<<HomeSiteB550mLoockit>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteB550mLoockit>> dashed

      rectangle "==Docker / Loockit REST・gRPC\\n\\n192.168.20.134:8080 / :50051。b550mのUSB Bluetooth・BlueZに接続。Leaseでactiveを選出。" <<HomeSiteB550mLoockitApp>> as HomeSiteB550mLoockitApp
    }
    rectangle "Mirakurun STG / CT12904・PX-S1UD" <<HomeSiteB550mTuner>> as HomeSiteB550mTuner {
      skinparam RectangleBorderColor<<HomeSiteB550mTuner>> #64748b
      skinparam RectangleFontColor<<HomeSiteB550mTuner>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteB550mTuner>> dashed

      rectangle "==Docker / Mirakurun / PX-S1UD\\n\\nGRはlocal tuner、BS/CSは本番Mirakurunへの低優先度TCP fallback。" <<HomeSiteB550mTunerApp>> as HomeSiteB550mTunerApp
    }
    database "==TrueNAS VM69002 / nas-02\\n\\npve-b550mのVM。USB disk passthrough上のZFS datasetをNFS公開。アプリ・DB・監視のデータを保存。" <<HomeSiteB550mNas2>> as HomeSiteB550mNas2
    rectangle "==HAProxy / Keepalived VM10002\\n\\nVM10001・10002。Terraform/PVEとAnsible/load-balancerで管理。" <<HomeSiteB550mLb>> as HomeSiteB550mLb
    rectangle "==開発用Docker / VM40000\\n\\n192.168.20.101 / VLAN20。開発環境用のDocker実行VM。" <<HomeSiteB550mDev>> as HomeSiteB550mDev
    rectangle "==MagicMirror表示 / VM5000\\n\\nVLAN40のDisplayLink kiosk。MagicMirrorのHTTP画面を表示。" <<HomeSiteB550mKiosk>> as HomeSiteB550mKiosk
  }
  rectangle "==home-k8s\\n\\n3 CP VM・2 worker VM・2 RPiで構成。namespace/Podの配置は動的。" <<HomeSiteTalos>> as HomeSiteTalos
  rectangle "==LAN / VLAN・経路" <<HomeSiteLan>> as HomeSiteLan
}

HomeSiteB550mCp2Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>control-plane / home-k8s所属
HomeSiteB550mCp3Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>control-plane / home-k8s所属
HomeSiteB550mWorker2Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>worker / home-k8s所属
HomeSiteTalos .[#8D8D8D,thickness=2].> HomeSiteB550mWorker2Talos : <color:#8D8D8D>[...]
HomeSiteB550mNas2 .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteB550mLb .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteB550mDev .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteB550mKiosk .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 40
HomeSiteTalos .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>L2広告 / Service IP .200-.226
HomeSiteB550mLoockit .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteB550mCp2 .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteB550mCp3 .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteB550mWorker2 .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteB550mTuner .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
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

skinparam rectangle<<HomeSiteX570Bluez>>{
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
skinparam rectangle<<HomeSiteX570LoockitApp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570TunerApp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570UnifiApp>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteTalos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam database<<HomeSiteX570Pbs>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<HomeSiteX570Nas1>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570Lb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteX570Windows>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<HomeSiteLan>>{
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

    rectangle "==BlueZ / USB Bluetooth" <<HomeSiteX570Bluez>> as HomeSiteX570Bluez
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
    rectangle "Loockit 01 / CT12902" <<HomeSiteX570Loockit>> as HomeSiteX570Loockit {
      skinparam RectangleBorderColor<<HomeSiteX570Loockit>> #64748b
      skinparam RectangleFontColor<<HomeSiteX570Loockit>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteX570Loockit>> dashed

      rectangle "==Docker / Loockit REST・gRPC\\n\\n192.168.20.133:8080 / :50051。x570のUSB Bluetooth・BlueZに接続。Leaseでactiveを選出。" <<HomeSiteX570LoockitApp>> as HomeSiteX570LoockitApp
    }
    rectangle "UniFi OS VM13201" <<HomeSiteX570Unifi>> as HomeSiteX570Unifi {
      skinparam RectangleBorderColor<<HomeSiteX570Unifi>> #64748b
      skinparam RectangleFontColor<<HomeSiteX570Unifi>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteX570Unifi>> dashed

      rectangle "==Podman / UniFi OS・Network\\n\\n192.168.0.132:11443 / native1。US-8-60Wの構成・監視を管理。" <<HomeSiteX570UnifiApp>> as HomeSiteX570UnifiApp
    }
    rectangle "Mirakurun本番 / CT12901・PT3" <<HomeSiteX570Tuner>> as HomeSiteX570Tuner {
      skinparam RectangleBorderColor<<HomeSiteX570Tuner>> #64748b
      skinparam RectangleFontColor<<HomeSiteX570Tuner>> #64748b
      skinparam RectangleBorderStyle<<HomeSiteX570Tuner>> dashed

      rectangle "==Docker / Mirakurun / PT3\\n\\n192.168.20.132:40772。x570のPT3を使用。EPGStation/TNLaStationへチューナーAPIを提供。" <<HomeSiteX570TunerApp>> as HomeSiteX570TunerApp
    }
    database "==PBS VM14001\\n\\nVMバックアップ。NFSのオンライン利用経路とは別。" <<HomeSiteX570Pbs>> as HomeSiteX570Pbs
    database "==TrueNAS VM69001 / nas-01\\n\\npve-x570のVM。USB disk passthrough上のZFS datasetをNFS公開。runner cacheを保存。" <<HomeSiteX570Nas1>> as HomeSiteX570Nas1
    rectangle "==HAProxy / Keepalived VM10001\\n\\nVM10001・10002。Terraform/PVEとAnsible/load-balancerで管理。" <<HomeSiteX570Lb>> as HomeSiteX570Lb
    rectangle "==Windows / VM60000 / tag30\\n\\nx570上で稼働確認。VLAN30。Terraformで管理しているVMとは区別する。" <<HomeSiteX570Windows>> as HomeSiteX570Windows
  }
  rectangle "==home-k8s\\n\\n3 CP VM・2 worker VM・2 RPiで構成。namespace/Podの配置は動的。" <<HomeSiteTalos>> as HomeSiteTalos
  rectangle "==LAN / VLAN・経路" <<HomeSiteLan>> as HomeSiteLan
}

HomeSiteX570Cp1Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>control-plane / home-k8s所属
HomeSiteX570Worker1Talos .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>worker / home-k8s所属
HomeSiteTalos .[#8D8D8D,thickness=2].> HomeSiteX570Worker1Talos : <color:#8D8D8D>[...]
HomeSiteX570Pbs .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteX570Nas1 .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteX570Lb .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteX570Windows .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 30
HomeSiteTalos .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>L2広告 / Service IP .200-.226
HomeSiteX570Loockit .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteX570Cp1 .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteX570Worker1 .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
HomeSiteX570Unifi .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / native 1
HomeSiteX570Tuner .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>vmbr0 / tag 20
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
  rectangle "pve-x570 / Proxmox" <<PremisesHardwareX570>> as PremisesHardwareX570 {
    skinparam RectangleBorderColor<<PremisesHardwareX570>> #64748b
    skinparam RectangleFontColor<<PremisesHardwareX570>> #64748b
    skinparam RectangleBorderStyle<<PremisesHardwareX570>> dashed

    rectangle "==enp7s0 / vmbr0\\n\\nPVE管理はnative1。ゲストNICのtag20/30を確認。vmbr0v20/v30/v40とNIC subinterfaceが存在し、vlan-aware bridge設定とは区別する。" <<PremisesHardwareX570Bridge>> as PremisesHardwareX570Bridge
  }
  rectangle "pve-b550m / Proxmox" <<PremisesHardwareB550m>> as PremisesHardwareB550m {
    skinparam RectangleBorderColor<<PremisesHardwareB550m>> #64748b
    skinparam RectangleFontColor<<PremisesHardwareB550m>> #64748b
    skinparam RectangleBorderStyle<<PremisesHardwareB550m>> dashed

    rectangle "==enp6s0 / vmbr0\\n\\nPVE管理はnative1。ゲストNICのtag20/40を確認。vmbr0v20/v30/v40とNIC subinterfaceが存在。" <<PremisesHardwareB550mBridge>> as PremisesHardwareB550mBridge
  }
  rectangle "==UniFi OS / VM13201\\n\\n192.168.0.132:11443 / native1。US-8-60Wの構成・監視を管理。" <<PremisesHardwareUnifi>> as PremisesHardwareUnifi
  rectangle "==LAN / VLAN・経路" <<PremisesLan>> as PremisesLan
}

ExternalInternet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkRouter : <color:#8D8D8D>WAN / GigaEthernet0
PremisesHardwareNetworkRouter .[#8D8D8D,thickness=2].> PremisesHardwareNetworkEthernet : <color:#8D8D8D>GigaEthernet2 / native1 + tag10,20,30,31,40
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkSwitch : <color:#8D8D8D>802.1Q / uplink
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareNetworkAp : <color:#8D8D8D>AP trunk / 接続ポート未確定
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareX570Bridge : <color:#8D8D8D>native1管理 / ゲストtag20・30 / 配線ポート未確定
PremisesHardwareNetworkEthernet .[#8D8D8D,thickness=2].> PremisesHardwareB550mBridge : <color:#8D8D8D>native1管理 / ゲストtag20・40 / 配線ポート未確定
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

    rectangle "==Nextcloud\\n\\nファイル共有 / app-nextcloud。MariaDB・Redisとnas-02のNFSを使用。" <<PremisesHomeNextcloud>> as PremisesHomeNextcloud
    rectangle "==録画・配信 / EPGStation・TNLaStation\\n\\nEPGStation・TNLaStation・Mirakurun。チューナーLXCとKubernetesのアプリは別の実行基盤。" <<PremisesHomeRecording>> as PremisesHomeRecording
    database "==VictoriaMetrics / 自宅\\n\\n自宅のmetricsは自宅VictoriaMetricsに保存。OCI側VMへの送信とは別。" <<PremisesHomeAgentLocal_store>> as PremisesHomeAgentLocal_store
  }
  rectangle "物理・ネットワーク" <<PremisesHardware>> as PremisesHardware {
    skinparam RectangleBorderColor<<PremisesHardware>> #3b82f6
    skinparam RectangleFontColor<<PremisesHardware>> #3b82f6
    skinparam RectangleBorderStyle<<PremisesHardware>> dashed

    rectangle "==pve-x570 / Proxmox\\n\\n192.168.0.115。Talos VM2台・TrueNAS・PBS・UniFi・Loockit/Mirakurunなどを実行。" <<PremisesHardwareX570>> as PremisesHardwareX570
    rectangle "==pve-b550m / Proxmox\\n\\n192.168.0.119。Talos VM3台・TrueNAS・開発VM・kiosk・Loockit/Mirakurunを実行。" <<PremisesHardwareB550m>> as PremisesHardwareB550m
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
skinparam rectangle<<HomeSiteNetwork>>{
  BackgroundColor #737373
  FontColor #fafafa
  BorderColor #525252
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
skinparam rectangle<<HomeSiteTalos>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<HomeSiteLan>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
rectangle "自宅 / Proxmox2ホスト・RPi" <<HomeSite>> as HomeSite {
  skinparam RectangleBorderColor<<HomeSite>> #737373
  skinparam RectangleFontColor<<HomeSite>> #737373
  skinparam RectangleBorderStyle<<HomeSite>> dashed

  rectangle "==RPi / worker03 / VLAN10\\n\\nTalos OS上のkubelet・containerd。2 VMと2 RPi。アプリPodの固定配置を意味しない。" <<HomeSiteWorker_pi1>> as HomeSiteWorker_pi1
  rectangle "==RPi / worker04 / VLAN10\\n\\nTalos OS上のkubelet・containerd。2 VMと2 RPi。アプリPodの固定配置を意味しない。" <<HomeSiteWorker_pi2>> as HomeSiteWorker_pi2
  rectangle "==ネットワーク機器 / IX2215・SW・AP\\n\\nIX2215・US-8-60W・FS AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。" <<HomeSiteNetwork>> as HomeSiteNetwork
  rectangle "==pve-x570\\n\\n192.168.0.115 / native1。Talos VM2・TrueNAS・PBS・UniFi・Windows・LXC2。" <<HomeSiteX570>> as HomeSiteX570
  rectangle "==pve-b550m\\n\\n192.168.0.119 / native1。Talos VM3・TrueNAS・Docker開発・表示VM・LXC2。" <<HomeSiteB550m>> as HomeSiteB550m
  rectangle "==home-k8s\\n\\n3 CP VM・2 worker VM・2 RPiで構成。namespace/Podの配置は動的。" <<HomeSiteTalos>> as HomeSiteTalos
  rectangle "==LAN / VLAN・経路" <<HomeSiteLan>> as HomeSiteLan
}

HomeSiteX570 .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>[...]
HomeSiteB550m .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>[...]
HomeSiteWorker_pi1 .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>worker / home-k8s所属
HomeSiteWorker_pi2 .[#3b82f6,thickness=2].> HomeSiteTalos : <color:#3b82f6>worker / home-k8s所属
HomeSiteTalos .[#8D8D8D,thickness=2].> HomeSiteWorker_pi1 : <color:#8D8D8D>[...]
HomeSiteTalos .[#8D8D8D,thickness=2].> HomeSiteWorker_pi2 : <color:#8D8D8D>[...]
HomeSiteNetwork .[#8D8D8D,thickness=2].> HomeSiteX570 : <color:#8D8D8D>native1管理 / ゲストtag20・30 / 配線ポート未確定
HomeSiteNetwork .[#8D8D8D,thickness=2].> HomeSiteB550m : <color:#8D8D8D>native1管理 / ゲストtag20・40 / 配線ポート未確定
HomeSiteX570 .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>[...]
HomeSiteB550m .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>[...]
HomeSiteTalos .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>L2広告 / Service IP .200-.226
HomeSiteNetwork .[#8D8D8D,thickness=2].> HomeSiteLan : <color:#8D8D8D>[...]
@enduml
`;case`recording`:return`@startuml
title "チューナー・制御・エンコード・保存"
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
skinparam rectangle<<PremisesHomeRecordingEpgstation>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
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
skinparam rectangle<<PremisesHomeRecordingMirakurun>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam rectangle<<PremisesHomeRecordingMirakurun_staging>>{
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
skinparam rectangle<<PremisesHardwareTuner_stg>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
skinparam database<<PremisesDataNasNas02>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<PremisesHardwareTuner_prod>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Cloudflare\\n\\n自宅サービスの公開入口は原則Accessで認証してTunnelへ転送。mTLS専用APIとWARP/LAN経路は別に示す。" <<ExternalEdge>> as ExternalEdge
rectangle "==EPGStation" <<PremisesHomeRecordingEpgstation>> as PremisesHomeRecordingEpgstation
rectangle "TNLaStation / 共通モデル" <<PremisesHomeRecordingTnlastation>> as PremisesHomeRecordingTnlastation {
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
rectangle "==Mirakurun Service / 本番LXCへの中継" <<PremisesHomeRecordingMirakurun>> as PremisesHomeRecordingMirakurun
rectangle "==Mirakurun Service / STG LXCへの中継" <<PremisesHomeRecordingMirakurun_staging>> as PremisesHomeRecordingMirakurun_staging
rectangle "==DB / アプリ共有基盤" <<PremisesDataDatabases>> as PremisesDataDatabases
rectangle "==Mirakurun STG / CT12904・PX-S1UD\\n\\nGRはlocal tuner、BS/CSは本番Mirakurunへの低優先度TCP fallback。" <<PremisesHardwareTuner_stg>> as PremisesHardwareTuner_stg
database "==TrueNAS VM69002 / nas-02\\n\\npve-b550mのVM。USB disk passthrough上のZFS datasetをNFS公開。アプリ・DB・監視のデータを保存。" <<PremisesDataNasNas02>> as PremisesDataNasNas02
rectangle "==Mirakurun本番 / CT12901・PT3\\n\\n192.168.20.132:40772。x570のPT3を使用。EPGStation/TNLaStationへチューナーAPIを提供。" <<PremisesHardwareTuner_prod>> as PremisesHardwareTuner_prod

ExternalEdge .[#15803d,thickness=2].> PremisesHomeRecordingEpgstation : <color:#15803d>epgstation / 8888 / Access
ExternalEdge .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationGateway : <color:#15803d>[...]
PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationFrontend : <color:#15803d>Web
PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationBackend : <color:#15803d>API
PremisesHomeRecordingTnlastationGateway .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationMediamtx : <color:#15803d>HLS
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationEncode : <color:#15803d>encode制御
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationStreaming : <color:#15803d>streaming制御
PremisesHomeRecordingTnlastationStreaming .[#15803d,thickness=2].> PremisesHomeRecordingTnlastationMediamtx : <color:#15803d>配信
PremisesHomeRecordingEpgstation .[#15803d,thickness=2].> PremisesHomeRecordingMirakurun : <color:#15803d>tuner API
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingMirakurun : <color:#15803d>tuner API
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesHomeRecordingMirakurun_staging : <color:#15803d>STG環境のチューナーAPI
PremisesHomeRecordingMirakurun .[#15803d,thickness=2].> PremisesHardwareTuner_prod : <color:#15803d>EndpointSlice / 外部LXC
PremisesHomeRecordingMirakurun_staging .[#15803d,thickness=2].> PremisesHardwareTuner_stg : <color:#15803d>EndpointSlice / 外部LXC
PremisesHardwareTuner_stg .[#15803d,thickness=2].> PremisesHardwareTuner_prod : <color:#15803d>BS/CS TCP fallback
PremisesHomeRecordingEpgstation .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>EPGStation DB
PremisesHomeRecordingTnlastationBackend .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>PostgreSQL
PremisesHomeRecordingTnlastationEncode .[#15803d,thickness=2].> PremisesDataDatabases : <color:#15803d>encode状態
PremisesDataDatabases .[#15803d,thickness=2].> PremisesDataNasNas02 : <color:#15803d>DB用NFS PVC
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
rectangle "==pve-x570 / Proxmox\\n\\n192.168.0.115。Talos VM2台・TrueNAS・PBS・UniFi・Loockit/Mirakurunなどを実行。" <<PremisesHardwareX570>> as PremisesHardwareX570
rectangle "==pve-b550m / Proxmox\\n\\n192.168.0.119。Talos VM3台・TrueNAS・開発VM・kiosk・Loockit/Mirakurunを実行。" <<PremisesHardwareB550m>> as PremisesHardwareB550m

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