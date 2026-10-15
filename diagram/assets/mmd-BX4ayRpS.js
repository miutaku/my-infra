var e=e=>{switch(e){case`index`:return`---
title: "全体構成"
---
graph TB
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  Bws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  Oke@{ shape: rectangle, label: "OCI / STG OKE共通基盤" }
  subgraph Edge["\`Cloudflare\`"]
    Edge.Access@{ shape: rectangle, label: "Access / 認証" }
    Edge.Tunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
  end
  subgraph Home["\`自宅 / home-k8s\`"]
    Home.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
    Home.Eso@{ shape: rectangle, label: "External Secrets Operator" }
    Home.Agent@{ shape: rectangle, label: "自宅監視基盤" }
  end
  subgraph Control["\`変更・運用\`"]
    Control.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
  end
  subgraph Monitoring["\`監視\`"]
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
    Monitoring.Grafana@{ shape: rectangle, label: "Grafana Cloud / PDC" }
  end
  subgraph Data["\`保存・バックアップ\`"]
    Data.Nas@{ shape: disk, label: "TrueNAS / NFS" }
  end
  Operator -. "\`管理認証\`" .-> Edge.Access
  Edge.Tunnel -. "\`公開hostname / 内部HTTP\`" .-> Home.Nextcloud
  Edge.Access -. "\`Tunnel / 管理UI\`" .-> Control.Argo
  Edge.Tunnel -. "\`Access後 / 管理UI\`" .-> Control.Argo
  Bws -. "\`Secret注入\`" .-> Home.Eso
  Bws -. "\`Secret注入\`" .-> Oke
  Operator -. "\`照会\`" .-> Monitoring.Grafana
  Home.Agent -. "\`外向きPDC接続\`" .-> Monitoring.Grafana
  Monitoring.Vms -. "\`VM側PDC agentから外向き接続\`" .-> Monitoring.Grafana
  Monitoring.Grafana -. "\`PDC経由の検索\`" .-> Home.Agent
  Monitoring.Grafana -. "\`PDC経由\`" .-> Monitoring.Vms
  Home.Nextcloud -. "\`NFS / PVC\`" .-> Data.Nas
  Home.Agent -. "\`metrics用NFS PVC\`" .-> Data.Nas
  User -. "\`HTTPS\`" .-> Edge
`;case`home_apps`:return`---
title: "自宅のサービス・保存"
---
graph LR
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  Edge@{ shape: rectangle, label: "Cloudflare" }
  subgraph Home["\`自宅 / home-k8s\`"]
    Home.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
    Home.Recording@{ shape: rectangle, label: "録画・配信" }
    subgraph Home.Apps["\`宅内アプリ\`"]
      Home.Apps.Coupon_manager@{ shape: rectangle, label: "Coupon Manager" }
      Home.Apps.Loockit@{ shape: rectangle, label: "Loockit" }
      Home.Apps.Annict_scraper@{ shape: rectangle, label: "Annict scraper" }
      Home.Apps.Magic_mirror@{ shape: rectangle, label: "MagicMirror" }
      Home.Apps.Wol@{ shape: rectangle, label: "Wake-on-LAN" }
    end
    Home.Dns@{ shape: rectangle, label: "内部DNS / MetalLB" }
  end
  subgraph Data["\`保存・バックアップ\`"]
    Data.Databases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
    Data.Nas@{ shape: disk, label: "TrueNAS / NFS" }
  end
  User -. "\`HTTPS\`" .-> Edge
  Edge -. "\`公開hostname / 内部HTTP\`" .-> Home.Nextcloud
  Edge -. "\`公開hostname / 内部HTTP\`" .-> Home.Recording
  Edge -. "\`公開hostname / 内部HTTP\`" .-> Home.Apps.Coupon_manager
  Edge -. "\`内部接続\`" .-> Home.Apps.Loockit
  Home.Recording -. "\`番組照合\`" .-> Home.Apps.Annict_scraper
  Home.Nextcloud -. "\`NFS / PVC\`" .-> Data.Nas
  Home.Recording -. "\`メディア保存\`" .-> Data.Nas
  Home.Apps.Coupon_manager -. "\`images・Data Protection keys / PVC\`" .-> Data.Nas
  Home.Nextcloud -. "\`MYSQL_HOST / MariaDB\`" .-> Data.Databases
  Home.Recording -. "\`[...]\`" .-> Data.Databases
  Home.Apps.Coupon_manager -. "\`PostgreSQL\`" .-> Data.Databases
  Data.Databases -. "\`DB用NFS PVC\`" .-> Data.Nas
`;case`delivery`:return`---
title: "変更・デプロイ"
---
graph TB
  subgraph Control["\`変更・運用\`"]
    Control.Reviews@{ shape: rectangle, label: "Re:Venterの一時レビュー" }
    Control.Images@{ shape: rectangle, label: "Image Updater" }
    Control.Git@{ shape: rectangle, label: "GitHub / コード・Actions" }
    Control.Packer@{ shape: rectangle, label: "Packer / VM template" }
    Control.Ansible@{ shape: rectangle, label: "Ansible" }
    Control.Runner@{ shape: rectangle, label: "ARC / 専用runner" }
    Control.Tfc@{ shape: rectangle, label: "Terraform Cloud" }
    Control.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
  end
  Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
  Edge@{ shape: rectangle, label: "Cloudflare" }
  subgraph Monitoring["\`監視\`"]
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
  end
  subgraph Oke["\`OCI / STG OKE共通基盤\`"]
    Oke.Argo@{ shape: rectangle, label: "OKE ArgoCD" }
    Oke.Scale@{ shape: rectangle, label: "Cluster Autoscaler" }
    Oke.Api@{ shape: rectangle, label: "OKE API / Node pools" }
  end
  Home@{ shape: rectangle, label: "自宅 / home-k8s" }
  Reventer@{ shape: rectangle, label: "Re:Venter / STG・PRD" }
  Control.Git -. "\`Actions job\`" .-> Control.Runner
  Control.Git -. "\`Terraform実行\`" .-> Control.Tfc
  Control.Git -. "\`GitOps\`" .-> Control.Argo
  Control.Argo -. "\`manifest同期\`" .-> Home
  Control.Git -. "\`GitOps\`" .-> Oke.Argo
  Oke.Argo -. "\`共通基盤同期\`" .-> Oke.Api
  Oke.Scale -. "\`burst pool増減\`" .-> Oke.Api
  Control.Argo -. "\`STG・PRDアプリ同期\`" .-> Reventer
  Control.Tfc -. "\`VM / ネットワーク\`" .-> Hardware
  Control.Packer -. "\`VM template\`" .-> Hardware
  Control.Ansible -. "\`機器設定\`" .-> Hardware
  Control.Tfc -. "\`DNS / Access / Tunnel\`" .-> Edge
  Control.Tfc -. "\`監視VM\`" .-> Monitoring.Vms
  Control.Tfc -. "\`OCI / OKE\`" .-> Oke
`;case`secrets`:return`---
title: "秘密情報の管理・注入"
---
graph LR
  Bws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
  subgraph Home["\`自宅 / home-k8s\`"]
    Home.Eso@{ shape: rectangle, label: "External Secrets Operator" }
  end
  subgraph Oke["\`OCI / STG OKE共通基盤\`"]
    Oke.Eso@{ shape: rectangle, label: "External Secrets Operator" }
  end
  subgraph Reventer["\`Re:Venter / STG・PRD\`"]
    Reventer.PlatformExternal_secrets@{ shape: rectangle, label: "ESO / PRD共通基盤" }
  end
  subgraph Control["\`変更・運用\`"]
    Control.Git@{ shape: rectangle, label: "GitHub / コード・Actions" }
    Control.Tfc@{ shape: rectangle, label: "Terraform Cloud" }
    Control.Ansible@{ shape: rectangle, label: "Ansible" }
  end
  subgraph Data["\`保存・バックアップ\`"]
    Data.Backups@{ shape: rectangle, label: "バックアップ処理" }
  end
  Bws -. "\`Secret注入\`" .-> Home.Eso
  Bws -. "\`Secret注入\`" .-> Oke.Eso
  Bws -. "\`ESO / PRD Secret注入\`" .-> Reventer.PlatformExternal_secrets
  Bws -. "\`CI credential\`" .-> Control.Git
  Bws -. "\`Terraform変数\`" .-> Control.Tfc
  Bws -. "\`機器・PBS用credential\`" .-> Control.Ansible
  Bws -. "\`ESO経由 / backup credential\`" .-> Data.Backups
`;case`observability`:return`---
title: "監視の収集・保存・照会"
---
graph LR
  Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph Reventer["\`Re:Venter / STG・PRD\`"]
    Reventer.Collectors@{ shape: rectangle, label: "STG・PRD監視collector" }
  end
  subgraph Home["\`自宅 / home-k8s\`"]
    subgraph Home.Agent["\`自宅監視基盤\`"]
      Home.Agent.Pdc@{ shape: rectangle, label: "PDC agent / 自宅" }
      Home.Agent.Exporters@{ shape: rectangle, label: "exporter群" }
      Home.Agent.Collector@{ shape: rectangle, label: "vmagent / scrape・remoteWrite" }
      Home.Agent.Local_store@{ shape: disk, label: "VictoriaMetrics / 自宅" }
    end
  end
  subgraph Monitoring["\`監視\`"]
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
    Monitoring.Grafana@{ shape: rectangle, label: "Grafana Cloud / PDC" }
  end
  Hardware -. "\`exporter収集\`" .-> Home.Agent.Collector
  Home.Agent.Collector -. "\`remoteWrite / :8428\`" .-> Home.Agent.Local_store
  Home.Agent.Pdc -. "\`private query / :8428\`" .-> Home.Agent.Local_store
  Home.Agent.Exporters -. "\`scrape\`" .-> Home.Agent.Collector
  Operator -. "\`照会\`" .-> Monitoring.Grafana
  Home.Agent.Pdc -. "\`外向きPDC接続\`" .-> Monitoring.Grafana
  Reventer.Collectors -. "\`[...]\`" .-> Monitoring.Vms
  Monitoring.Grafana -. "\`PDC経由の検索\`" .-> Home.Agent.Pdc
  Monitoring.Vms -. "\`VM側PDC agentから外向き接続\`" .-> Monitoring.Grafana
  Monitoring.Grafana -. "\`PDC経由\`" .-> Monitoring.Vms
`;case`network`:return`---
title: "LAN・Tunnel・WARP・OCI"
---
graph LR
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph Hardware["\`物理・ネットワーク\`"]
    Hardware.Lb@{ shape: rectangle, label: "HAProxy / Keepalived ×2" }
    Hardware.Router@{ shape: rectangle, label: "IX2215 / VLAN" }
    Hardware.Wifi@{ shape: rectangle, label: "Wi-Fi AP" }
    Hardware.Unifi@{ shape: rectangle, label: "UniFi OS Server" }
  end
  subgraph Home["\`自宅 / home-k8s\`"]
    subgraph Home.Dns["\`内部DNS / MetalLB\`"]
      Home.Dns.Coredns@{ shape: rectangle, label: "CoreDNS / miutaku.internal" }
      Home.Dns.Metallb@{ shape: rectangle, label: "MetalLB / LANのService IP" }
    end
    Home.PlatformCloudflared@{ shape: rectangle, label: "cloudflared / 自宅connector" }
  end
  subgraph Oke["\`OCI / STG OKE共通基盤\`"]
    Oke.Workers@{ shape: rectangle, label: "base / burst node pool" }
    subgraph Oke.Network["\`OCI network\`"]
      Oke.Network.Private_workers@{ shape: rectangle, label: "private worker subnet" }
      Oke.Network.Nat@{ shape: rectangle, label: "NAT gateway / reserved IP" }
      Oke.Network.Service_gateway@{ shape: rectangle, label: "Service Gateway / Oracle Services" }
      Oke.Network.Igw@{ shape: rectangle, label: "Internet gateway" }
      Oke.Network.Public_api@{ shape: rectangle, label: "公開API・LB subnet" }
    end
  end
  subgraph Edge["\`Cloudflare\`"]
    Edge.Access@{ shape: rectangle, label: "Access / 認証" }
    Edge.Tunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
    Edge.Warp@{ shape: rectangle, label: "WARP / private CIDR routes" }
    Edge.Routes@{ shape: rectangle, label: "公開hostname / 設定から抽出" }
  end
  subgraph External["\`外部サービス\`"]
    External.Internet@{ shape: rectangle, label: "Internet" }
    External.Oracle@{ shape: rectangle, label: "Oracle Services Network" }
  end
  subgraph Lan["\`LAN / VLAN・経路\`"]
    Lan.Server@{ shape: rectangle, label: "VLAN20 / 192.168.20.0/24" }
    Lan.Native@{ shape: rectangle, label: "native / 192.168.0.0/24" }
    Lan.Management@{ shape: rectangle, label: "VLAN10 / 192.168.10.0/24" }
    Lan.Client@{ shape: rectangle, label: "VLAN30 / 192.168.30.0/24" }
    Lan.Guest@{ shape: rectangle, label: "VLAN31 / guest" }
    Lan.Iot@{ shape: rectangle, label: "VLAN40 / 192.168.40.0/24" }
  end
  Operator -. "\`管理認証\`" .-> Edge.Access
  Edge.Tunnel -. "\`hostname転送\`" .-> Edge.Routes
  Edge.Access -. "\`Access policy\`" .-> Edge.Routes
  Edge.Warp -. "\`private CIDR routes / WARP policy\`" .-> Lan.Server
  Edge.Routes -. "\`認証後の内部接続\`" .-> Hardware.Router
  Hardware.Router -. "\`native IF\`" .-> Lan.Native
  Hardware.Router -. "\`BVI10\`" .-> Lan.Management
  Hardware.Router -. "\`BVI20\`" .-> Lan.Server
  Hardware.Router -. "\`BVI30\`" .-> Lan.Client
  Hardware.Router -. "\`BVI31 / 他VLAN拒否\`" .-> Lan.Guest
  Hardware.Router -. "\`BVI40\`" .-> Lan.Iot
  Edge.Routes -. "\`認証後の内部接続\`" .-> Hardware.Wifi
  Edge.Routes -. "\`認証後の内部接続\`" .-> Hardware.Unifi
  Home.PlatformCloudflared -. "\`外向きTunnel接続\`" .-> Edge.Tunnel
  Oke.Workers -. "\`private subnet / 10.0.2.0/24\`" .-> Oke.Network.Private_workers
  Oke.Network.Igw -. "\`public route table\`" .-> Oke.Network.Public_api
  Oke.Network.Private_workers -. "\`default route\`" .-> Oke.Network.Nat
  Oke.Network.Private_workers -. "\`Oracle service CIDR route\`" .-> Oke.Network.Service_gateway
  Oke.Network.Nat -. "\`NAT / reserved IPv4\`" .-> External.Internet
  External.Internet -. "\`公開API・LBへの到達\`" .-> Oke.Network.Igw
  Oke.Network.Service_gateway -. "\`Oracle Services Network\`" .-> External.Oracle
  Hardware.Router -. "\`LAN / 内部DNS\`" .-> Home.Dns
`;case`storage`:return`---
title: "復元元の区別"
---
graph LR
  subgraph Home["\`自宅 / home-k8s\`"]
    Home.Recording@{ shape: rectangle, label: "録画・配信" }
    Home.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
    Home.AgentLocal_store@{ shape: disk, label: "VictoriaMetrics / 自宅" }
  end
  subgraph Data["\`保存・バックアップ\`"]
    subgraph Data.Nas["\`TrueNAS / NFS\`"]
      Data.Nas.Nas01@{ shape: disk, label: "nas-01 / ZFS・NFS" }
      Data.Nas.Nas02@{ shape: disk, label: "nas-02 / ZFS・NFS" }
    end
    Data.Shared@{ shape: rectangle, label: "共有PV / runner cache・状態" }
    subgraph Data.Databases["\`DB / アプリ共有基盤\`"]
      Data.Databases.Mariadb@{ shape: disk, label: "MariaDB" }
      Data.Databases.Postgres@{ shape: disk, label: "PostgreSQL / 本番・STG" }
    end
    subgraph Data.Backups["\`バックアップ処理\`"]
      Data.Backups.Db@{ shape: rectangle, label: "MariaDB・PostgreSQL / logical dump" }
      Data.Backups.Recordings@{ shape: rectangle, label: "録画ファイル用 / 別job" }
      Data.Backups.Metrics@{ shape: rectangle, label: "VictoriaMetrics / consistent snapshot" }
      Data.Backups.Nas@{ shape: rectangle, label: "NAS restic / CronJob" }
    end
    Data.Pbs@{ shape: disk, label: "Proxmox Backup Server" }
  end
  subgraph Hardware["\`物理・ネットワーク\`"]
    Hardware.X570@{ shape: rectangle, label: "Proxmox / x570" }
    Hardware.B550m@{ shape: rectangle, label: "Proxmox / b550m" }
  end
  subgraph External["\`外部サービス\`"]
    External.Idrive@{ shape: disk, label: "IDrive e2 / S3" }
  end
  Home.Recording -. "\`録画・thumbnail・drop / NFS\`" .-> Data.Nas.Nas02
  Home.Nextcloud -. "\`MYSQL_HOST / MariaDB\`" .-> Data.Databases.Mariadb
  Home.Recording -. "\`EPGStation DB\`" .-> Data.Databases.Mariadb
  Home.Recording -. "\`[...]\`" .-> Data.Databases.Postgres
  Home.Recording -. "\`録画ファイル専用job\`" .-> Data.Backups.Recordings
  Home.AgentLocal_store -. "\`snapshot / vmbackup\`" .-> Data.Backups.Metrics
  Data.Pbs -. "\`S3 datastore / VM backup\`" .-> External.Idrive
  Hardware.X570 -. "\`VM backup\`" .-> Data.Pbs
  Hardware.B550m -. "\`VM backup\`" .-> Data.Pbs
  Home.Nextcloud -. "\`NFS / PVC\`" .-> Data.Nas
  Home.AgentLocal_store -. "\`metrics用NFS PVC\`" .-> Data.Nas
  Data.Databases -. "\`DB用NFS PVC\`" .-> Data.Nas
  Data.Nas -. "\`対象dataset / restic\`" .-> Data.Backups.Nas
  Data.Databases -. "\`整合性あるlogical dump\`" .-> Data.Backups.Db
  Data.Backups -. "\`用途別prefix / 暗号化・retention\`" .-> External.Idrive
`;case`placement`:return`---
title: "所有境界"
---
graph LR
  HomeSite@{ shape: rectangle, label: "自宅 / Proxmox2ホスト・RPi" }
  Stg@{ shape: rectangle, label: "OCI / STG OKE共通基盤" }
  Prd@{ shape: rectangle, label: "PRD OKE / 本体reventer所有・共通アドオンmy-infra" }
`;case`media`:return`---
title: "制御・変換・保存"
---
graph LR
  subgraph HomeRecording["\`録画・配信\`"]
    HomeRecording.Epgstation@{ shape: rectangle, label: "EPGStation" }
    HomeRecording.Annict_sync@{ shape: rectangle, label: "Annict録画同期 / CronJob" }
    HomeRecording.Mirakurun_staging@{ shape: rectangle, label: "Mirakurun Service / STG LXCへの中継" }
    subgraph HomeRecording.Tnlastation["\`TNLaStation / 共通モデル\`"]
      HomeRecording.Tnlastation.Gateway@{ shape: rectangle, label: "Gateway" }
      HomeRecording.Tnlastation.Frontend@{ shape: rectangle, label: "Frontend" }
      HomeRecording.Tnlastation.Backend@{ shape: rectangle, label: "Backend / API・録画制御" }
      HomeRecording.Tnlastation.Encode@{ shape: rectangle, label: "ffmpeg encode worker" }
      HomeRecording.Tnlastation.Streaming@{ shape: rectangle, label: "ffmpeg streaming worker" }
      HomeRecording.Tnlastation.Mediamtx@{ shape: rectangle, label: "MediaMTX / HLS配信" }
    end
    HomeRecording.Mirakurun@{ shape: rectangle, label: "Mirakurun Service / 本番LXCへの中継" }
  end
  HomeAppsAnnict_scraper@{ shape: rectangle, label: "Annict scraper" }
  HardwareTuner_stg@{ shape: rectangle, label: "Mirakurun STG LXC / CT12904・PX-S1UD" }
  ExternalAnnict@{ shape: rectangle, label: "Annict API" }
  HardwareTuner_prod@{ shape: rectangle, label: "Mirakurun LXC / CT12901・PT3" }
  DataDatabases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
  DataNas@{ shape: disk, label: "TrueNAS / NFS" }
  HomeRecording.Epgstation -. "\`tuner API\`" .-> HomeRecording.Mirakurun
  HomeRecording.Annict_sync -. "\`録画登録API\`" .-> HomeRecording.Tnlastation.Backend
  HomeRecording.Tnlastation.Backend -. "\`tuner API\`" .-> HomeRecording.Mirakurun
  HomeRecording.Tnlastation.Gateway -. "\`Web\`" .-> HomeRecording.Tnlastation.Frontend
  HomeRecording.Tnlastation.Gateway -. "\`API\`" .-> HomeRecording.Tnlastation.Backend
  HomeRecording.Tnlastation.Gateway -. "\`HLS\`" .-> HomeRecording.Tnlastation.Mediamtx
  HomeRecording.Tnlastation.Backend -. "\`encode制御\`" .-> HomeRecording.Tnlastation.Encode
  HomeRecording.Tnlastation.Backend -. "\`streaming制御\`" .-> HomeRecording.Tnlastation.Streaming
  HomeRecording.Tnlastation.Streaming -. "\`配信\`" .-> HomeRecording.Tnlastation.Mediamtx
  HomeRecording.Mirakurun -. "\`EndpointSlice / 外部LXC\`" .-> HardwareTuner_prod
  HomeRecording.Mirakurun_staging -. "\`EndpointSlice / 外部LXC\`" .-> HardwareTuner_stg
  HardwareTuner_stg -. "\`BS/CS TCP fallback\`" .-> HardwareTuner_prod
  HomeRecording.Annict_sync -. "\`番組照合\`" .-> HomeAppsAnnict_scraper
  HomeAppsAnnict_scraper -. "\`Annict API\`" .-> ExternalAnnict
  HomeRecording.Epgstation -. "\`EPGStation DB\`" .-> DataDatabases
  HomeRecording.Tnlastation.Backend -. "\`PostgreSQL\`" .-> DataDatabases
  HomeRecording.Tnlastation.Encode -. "\`encode状態\`" .-> DataDatabases
  DataDatabases -. "\`DB用NFS PVC\`" .-> DataNas
  HomeRecording -. "\`メディア保存\`" .-> DataNas
`;case`power`:return'---\ntitle: "UPS・NUTのcross-power"\n---\ngraph LR\n  subgraph HardwareUps["`UPS / NUT`"]\n    HardwareUps.Mains@{ shape: rectangle, label: "商用AC" }\n    HardwareUps.Surge_a@{ shape: rectangle, label: "UPS A / サージのみ口・非backup" }\n    HardwareUps.Ups_a@{ shape: rectangle, label: "UPS A / APC RS550S 2020" }\n    HardwareUps.Ups_b@{ shape: rectangle, label: "UPS B / APC RS550S 2025" }\n    HardwareUps.Pi_a@{ shape: rectangle, label: "NUT Pi .112 / 監視A・給電B" }\n    HardwareUps.Pi_b@{ shape: rectangle, label: "NUT Pi .113 / 監視B・給電A" }\n  end\n  HardwareX570@{ shape: rectangle, label: "Proxmox / x570" }\n  HardwareB550m@{ shape: rectangle, label: "Proxmox / b550m" }\n  HardwareUps.Mains -. "`非バックアップ出力`" .-> HardwareUps.Surge_a\n  HardwareUps.Mains -. "`AC入力`" .-> HardwareUps.Ups_a\n  HardwareUps.Surge_a -. "`UPS BのAC入力`" .-> HardwareUps.Ups_b\n  HardwareUps.Ups_a -. "`USB監視 / ups-a`" .-> HardwareUps.Pi_a\n  HardwareUps.Ups_a -. "`cross-power / PiBの給電元`" .-> HardwareUps.Pi_b\n  HardwareUps.Ups_b -. "`cross-power / PiAの給電元`" .-> HardwareUps.Pi_a\n  HardwareUps.Ups_b -. "`USB監視 / ups-b`" .-> HardwareUps.Pi_b\n  HardwareUps.Pi_a -. "`ups-b監視 / LOWBATT10%で自身停止`" .-> HardwareUps.Pi_b\n  HardwareUps.Pi_b -. "`ups-a監視 / LOWBATT10%で自身停止`" .-> HardwareUps.Pi_a\n  HardwareUps.Ups_a -. "`バッテリー給電`" .-> HardwareX570\n  HardwareX570 -. "`charge-guard監視 / 80%で自身停止`" .-> HardwareUps.Pi_a\n  HardwareUps.Ups_b -. "`バッテリー給電`" .-> HardwareB550m\n  HardwareB550m -. "`charge-guard監視 / 80%で自身停止`" .-> HardwareUps.Pi_b\n';default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};