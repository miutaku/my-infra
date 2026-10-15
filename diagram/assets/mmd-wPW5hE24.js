var e=e=>{switch(e){case`index`:return`---
title: "全体構成"
---
graph TB
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Home["\`Talos / home-k8s\`"]
      Premises.Home.Agent@{ shape: rectangle, label: "自宅監視基盤" }
      Premises.Home.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
      Premises.Home.Eso@{ shape: rectangle, label: "External Secrets Operator" }
    end
    subgraph Premises.Data["\`保存・バックアップ\`"]
      Premises.Data.Pbs@{ shape: disk, label: "Proxmox Backup Server" }
      Premises.Data.Nas@{ shape: disk, label: "TrueNAS VM ×2 / ZFS・NFS" }
      Premises.Data.Backups@{ shape: rectangle, label: "バックアップ処理" }
    end
  end
  subgraph Monitoring["\`監視\`"]
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
  end
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    subgraph External.Edge["\`Cloudflare\`"]
      External.Edge.Tunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
      External.Edge.Access@{ shape: rectangle, label: "Access / 認証" }
    end
    External.Bws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
    External.Grafana@{ shape: rectangle, label: "Grafana Cloud / PDC" }
    External.Idrive@{ shape: disk, label: "IDrive e2 / S3" }
  end
  subgraph Control["\`変更・運用\`"]
    Control.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
  end
  Oke@{ shape: rectangle, label: "OCI / STG OKE共通基盤" }
  Operator -. "\`管理認証\`" .-> External.Edge.Access
  External.Edge.Tunnel -. "\`公開hostname / 内部HTTP\`" .-> Premises.Home.Nextcloud
  External.Edge.Access -. "\`Tunnel / 管理UI\`" .-> Control.Argo
  External.Edge.Tunnel -. "\`Access後 / 管理UI\`" .-> Control.Argo
  External.Bws -. "\`Secret注入\`" .-> Premises.Home.Eso
  External.Bws -. "\`Secret注入\`" .-> Oke
  Operator -. "\`照会\`" .-> External.Grafana
  Premises.Home.Agent -. "\`外向きPDC接続\`" .-> External.Grafana
  Monitoring.Vms -. "\`VM側PDC agentから外向き接続\`" .-> External.Grafana
  External.Grafana -. "\`PDC経由の検索\`" .-> Premises.Home.Agent
  External.Grafana -. "\`PDC経由\`" .-> Monitoring.Vms
  Premises.Home.Nextcloud -. "\`html・data / NFS\`" .-> Premises.Data.Nas
  Premises.Home.Agent -. "\`metrics用NFS PVC\`" .-> Premises.Data.Nas
  Premises.Home.Agent -. "\`snapshot / vmbackup\`" .-> Premises.Data.Backups
  External.Bws -. "\`ESO経由 / backup credential\`" .-> Premises.Data.Backups
  Premises.Data.Nas -. "\`対象dataset / restic\`" .-> Premises.Data.Backups
  Premises.Data.Pbs -. "\`S3 datastore / VM backup\`" .-> External.Idrive
  Premises.Data.Backups -. "\`用途別prefix / 暗号化・retention\`" .-> External.Idrive
  User -. "\`HTTPS\`" .-> External.Edge
`;case`home_apps`:return`---
title: "自宅のサービス・保存"
---
graph LR
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  ExternalEdge@{ shape: rectangle, label: "Cloudflare" }
  subgraph PremisesHome["\`Talos / home-k8s\`"]
    PremisesHome.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
    PremisesHome.Recording@{ shape: rectangle, label: "録画・配信" }
    subgraph PremisesHome.Apps["\`宅内アプリ\`"]
      PremisesHome.Apps.Coupon_manager@{ shape: rectangle, label: "Coupon Manager" }
      PremisesHome.Apps.Loockit@{ shape: rectangle, label: "Loockit" }
      PremisesHome.Apps.Annict_scraper@{ shape: rectangle, label: "Annict scraper" }
      PremisesHome.Apps.Magic_mirror@{ shape: rectangle, label: "MagicMirror" }
      PremisesHome.Apps.Wol@{ shape: rectangle, label: "Wake-on-LAN" }
    end
    PremisesHome.Dns@{ shape: rectangle, label: "内部DNS / MetalLB" }
  end
  subgraph PremisesData["\`保存・バックアップ\`"]
    PremisesData.Databases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
    PremisesData.Nas@{ shape: disk, label: "TrueNAS VM ×2 / ZFS・NFS" }
  end
  User -. "\`HTTPS\`" .-> ExternalEdge
  ExternalEdge -. "\`公開hostname / 内部HTTP\`" .-> PremisesHome.Nextcloud
  ExternalEdge -. "\`公開hostname / 内部HTTP\`" .-> PremisesHome.Recording
  ExternalEdge -. "\`公開hostname / 内部HTTP\`" .-> PremisesHome.Apps.Coupon_manager
  ExternalEdge -. "\`内部接続\`" .-> PremisesHome.Apps.Loockit
  PremisesHome.Recording -. "\`番組照合\`" .-> PremisesHome.Apps.Annict_scraper
  PremisesHome.Nextcloud -. "\`html・data / NFS\`" .-> PremisesData.Nas
  PremisesHome.Recording -. "\`録画・thumbnail・drop / NFS\`" .-> PremisesData.Nas
  PremisesHome.Apps.Coupon_manager -. "\`images・Data Protection keys / PVC\`" .-> PremisesData.Nas
  PremisesHome.Nextcloud -. "\`MYSQL_HOST / MariaDB\`" .-> PremisesData.Databases
  PremisesHome.Recording -. "\`[...]\`" .-> PremisesData.Databases
  PremisesHome.Apps.Coupon_manager -. "\`PostgreSQL\`" .-> PremisesData.Databases
  PremisesData.Databases -. "\`DB用NFS PVC\`" .-> PremisesData.Nas
`;case`delivery`:return`---
title: "変更・デプロイ"
---
graph TB
  subgraph Control["\`変更・運用\`"]
    Control.Reviews@{ shape: rectangle, label: "Re:Venterの一時レビュー" }
    Control.Images@{ shape: rectangle, label: "Image Updater" }
    Control.Runner@{ shape: rectangle, label: "ARC / 専用runner" }
    Control.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
    Control.Tfc_agents@{ shape: rectangle, label: "Terraform Cloud agents / 自宅" }
    Control.Packer@{ shape: rectangle, label: "Packer / VM template" }
    Control.Ansible@{ shape: rectangle, label: "Ansible" }
  end
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.Github@{ shape: rectangle, label: "GitHub / コード・Actions" }
    External.Terraform_cloud@{ shape: rectangle, label: "Terraform Cloud" }
    External.Edge@{ shape: rectangle, label: "Cloudflare" }
  end
  subgraph Monitoring["\`監視\`"]
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
  end
  subgraph Oke["\`OCI / STG OKE共通基盤\`"]
    Oke.Argo@{ shape: rectangle, label: "OKE ArgoCD" }
    Oke.Scale@{ shape: rectangle, label: "Cluster Autoscaler" }
    Oke.Api@{ shape: rectangle, label: "OKE API / Node pools" }
  end
  Reventer@{ shape: rectangle, label: "Re:Venter / STG・PRD" }
  subgraph Premises["\`自宅\`"]
    Premises.Home@{ shape: rectangle, label: "Talos / home-k8s" }
    Premises.Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
  end
  External.Github -. "\`Actions job\`" .-> Control.Runner
  External.Github -. "\`GitOps\`" .-> Control.Argo
  External.Github -. "\`Terraform実行\`" .-> External.Terraform_cloud
  External.Terraform_cloud -. "\`workspace runを自宅agentで実行\`" .-> Control.Tfc_agents
  Control.Argo -. "\`manifest同期\`" .-> Premises.Home
  External.Github -. "\`GitOps\`" .-> Oke.Argo
  Oke.Argo -. "\`共通基盤同期\`" .-> Oke.Api
  Oke.Scale -. "\`burst pool増減\`" .-> Oke.Api
  Control.Argo -. "\`STG・PRDアプリ同期\`" .-> Reventer
  Control.Tfc_agents -. "\`VM / ネットワーク\`" .-> Premises.Hardware
  Control.Packer -. "\`VM template\`" .-> Premises.Hardware
  Control.Ansible -. "\`機器設定\`" .-> Premises.Hardware
  External.Terraform_cloud -. "\`DNS / Access / Tunnel\`" .-> External.Edge
  External.Terraform_cloud -. "\`監視VM\`" .-> Monitoring.Vms
  External.Terraform_cloud -. "\`OCI / OKE\`" .-> Oke
`;case`secrets`:return`---
title: "秘密情報の管理・注入"
---
graph LR
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.Bws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
    External.Github@{ shape: rectangle, label: "GitHub / コード・Actions" }
    External.Terraform_cloud@{ shape: rectangle, label: "Terraform Cloud" }
  end
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Home["\`Talos / home-k8s\`"]
      Premises.Home.Eso@{ shape: rectangle, label: "External Secrets Operator" }
    end
    subgraph Premises.Data["\`保存・バックアップ\`"]
      Premises.Data.Backups@{ shape: rectangle, label: "バックアップ処理" }
    end
  end
  subgraph Oke["\`OCI / STG OKE共通基盤\`"]
    Oke.Eso@{ shape: rectangle, label: "External Secrets Operator" }
  end
  subgraph Reventer["\`Re:Venter / STG・PRD\`"]
    Reventer.PlatformExternal_secrets@{ shape: rectangle, label: "ESO / PRD共通基盤" }
  end
  subgraph Control["\`変更・運用\`"]
    Control.Ansible@{ shape: rectangle, label: "Ansible" }
  end
  External.Bws -. "\`Secret注入\`" .-> Premises.Home.Eso
  External.Bws -. "\`Secret注入\`" .-> Oke.Eso
  External.Bws -. "\`ESO / PRD Secret注入\`" .-> Reventer.PlatformExternal_secrets
  External.Bws -. "\`CI credential\`" .-> External.Github
  External.Bws -. "\`Terraform変数\`" .-> External.Terraform_cloud
  External.Bws -. "\`機器・PBS用credential\`" .-> Control.Ansible
  External.Bws -. "\`ESO経由 / backup credential\`" .-> Premises.Data.Backups
`;case`observability`:return`---
title: "監視の収集・保存・照会"
---
graph LR
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph Reventer["\`Re:Venter / STG・PRD\`"]
    Reventer.Collectors@{ shape: rectangle, label: "STG・PRD監視collector" }
  end
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.Grafana@{ shape: rectangle, label: "Grafana Cloud / PDC" }
  end
  subgraph Premises["\`自宅\`"]
    Premises.Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
    subgraph Premises.Home["\`Talos / home-k8s\`"]
      subgraph Premises.Home.Agent["\`自宅監視基盤\`"]
        Premises.Home.Agent.Exporters@{ shape: rectangle, label: "exporter群" }
        Premises.Home.Agent.Pdc@{ shape: rectangle, label: "PDC agent / 自宅" }
        Premises.Home.Agent.Collector@{ shape: rectangle, label: "vmagent / scrape・remoteWrite" }
        Premises.Home.Agent.Local_store@{ shape: disk, label: "VictoriaMetrics / 自宅" }
      end
    end
  end
  subgraph Monitoring["\`監視\`"]
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
  end
  Operator -. "\`照会\`" .-> External.Grafana
  Premises.Hardware -. "\`exporter収集\`" .-> Premises.Home.Agent.Collector
  Premises.Home.Agent.Collector -. "\`remoteWrite / :8428\`" .-> Premises.Home.Agent.Local_store
  External.Grafana -. "\`PDC経由の検索\`" .-> Premises.Home.Agent.Pdc
  Premises.Home.Agent.Pdc -. "\`外向きPDC接続\`" .-> External.Grafana
  Premises.Home.Agent.Pdc -. "\`private query / :8428\`" .-> Premises.Home.Agent.Local_store
  Premises.Home.Agent.Exporters -. "\`scrape\`" .-> Premises.Home.Agent.Collector
  External.Grafana -. "\`PDC経由\`" .-> Monitoring.Vms
  Reventer.Collectors -. "\`[...]\`" .-> Monitoring.Vms
  Monitoring.Vms -. "\`VM側PDC agentから外向き接続\`" .-> External.Grafana
`;case`network`:return`---
title: "LAN・Tunnel・WARP・OCI"
---
graph LR
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Hardware["\`物理・ネットワーク\`"]
      Premises.Hardware.Lb@{ shape: rectangle, label: "HAProxy / Keepalived ×2" }
      Premises.Hardware.Router@{ shape: rectangle, label: "IX2215 / VLAN" }
      Premises.Hardware.Wifi@{ shape: rectangle, label: "Wi-Fi AP" }
      Premises.Hardware.Unifi@{ shape: rectangle, label: "UniFi OS Server" }
    end
    subgraph Premises.Home["\`Talos / home-k8s\`"]
      subgraph Premises.Home.Dns["\`内部DNS / MetalLB\`"]
        Premises.Home.Dns.Coredns@{ shape: rectangle, label: "CoreDNS / miutaku.internal" }
        Premises.Home.Dns.Metallb@{ shape: rectangle, label: "MetalLB / LANのService IP" }
      end
      Premises.Home.PlatformCloudflared@{ shape: rectangle, label: "cloudflared / 自宅connector" }
    end
    subgraph Premises.Lan["\`LAN / VLAN・経路\`"]
      Premises.Lan.Server@{ shape: rectangle, label: "VLAN20 / 192.168.20.0/24" }
      Premises.Lan.Native@{ shape: rectangle, label: "native / 192.168.0.0/24" }
      Premises.Lan.Management@{ shape: rectangle, label: "VLAN10 / 192.168.10.0/24" }
      Premises.Lan.Client@{ shape: rectangle, label: "VLAN30 / 192.168.30.0/24" }
      Premises.Lan.Guest@{ shape: rectangle, label: "VLAN31 / guest" }
      Premises.Lan.Iot@{ shape: rectangle, label: "VLAN40 / 192.168.40.0/24" }
    end
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
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    subgraph External.Edge["\`Cloudflare\`"]
      External.Edge.Warp@{ shape: rectangle, label: "WARP / private CIDR routes" }
      External.Edge.Access@{ shape: rectangle, label: "Access / 認証" }
      External.Edge.Tunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
      External.Edge.Routes@{ shape: rectangle, label: "公開hostname / 設定から抽出" }
    end
    External.Internet@{ shape: rectangle, label: "Internet" }
    External.Oracle@{ shape: rectangle, label: "Oracle Services Network" }
  end
  Operator -. "\`管理認証\`" .-> External.Edge.Access
  External.Edge.Tunnel -. "\`hostname転送\`" .-> External.Edge.Routes
  External.Edge.Access -. "\`Access policy\`" .-> External.Edge.Routes
  External.Edge.Warp -. "\`private CIDR routes / WARP policy\`" .-> Premises.Lan.Server
  External.Edge.Routes -. "\`認証後の内部接続\`" .-> Premises.Hardware.Router
  Premises.Hardware.Router -. "\`native IF\`" .-> Premises.Lan.Native
  Premises.Hardware.Router -. "\`BVI10\`" .-> Premises.Lan.Management
  Premises.Hardware.Router -. "\`BVI20\`" .-> Premises.Lan.Server
  Premises.Hardware.Router -. "\`BVI30\`" .-> Premises.Lan.Client
  Premises.Hardware.Router -. "\`BVI31 / 他VLAN拒否\`" .-> Premises.Lan.Guest
  Premises.Hardware.Router -. "\`BVI40\`" .-> Premises.Lan.Iot
  External.Edge.Routes -. "\`認証後の内部接続\`" .-> Premises.Hardware.Wifi
  External.Edge.Routes -. "\`認証後の内部接続\`" .-> Premises.Hardware.Unifi
  Premises.Home.PlatformCloudflared -. "\`外向きTunnel接続\`" .-> External.Edge.Tunnel
  Oke.Workers -. "\`private subnet / 10.0.2.0/24\`" .-> Oke.Network.Private_workers
  Oke.Network.Igw -. "\`public route table\`" .-> Oke.Network.Public_api
  Oke.Network.Private_workers -. "\`default route\`" .-> Oke.Network.Nat
  Oke.Network.Private_workers -. "\`Oracle service CIDR route\`" .-> Oke.Network.Service_gateway
  Oke.Network.Nat -. "\`NAT / reserved IPv4\`" .-> External.Internet
  External.Internet -. "\`公開API・LBへの到達\`" .-> Oke.Network.Igw
  Oke.Network.Service_gateway -. "\`Oracle Services Network\`" .-> External.Oracle
  Premises.Hardware.Router -. "\`LAN / 内部DNS\`" .-> Premises.Home.Dns
`;case`storage`:return`---
title: "復元元の区別"
---
graph LR
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Home["\`Talos / home-k8s\`"]
      Premises.Home.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
      Premises.Home.Recording@{ shape: rectangle, label: "録画・配信" }
      Premises.Home.AgentLocal_store@{ shape: disk, label: "VictoriaMetrics / 自宅" }
    end
    subgraph Premises.Hardware["\`物理・ネットワーク\`"]
      Premises.Hardware.X570@{ shape: rectangle, label: "Proxmox / x570" }
      Premises.Hardware.B550m@{ shape: rectangle, label: "Proxmox / b550m" }
    end
    subgraph Premises.Data["\`保存・バックアップ\`"]
      subgraph Premises.Data.Databases["\`DB / アプリ共有基盤\`"]
        Premises.Data.Databases.Mariadb@{ shape: disk, label: "MariaDB" }
        Premises.Data.Databases.Postgres@{ shape: disk, label: "PostgreSQL / 本番・STG" }
      end
      subgraph Premises.Data.Backups["\`バックアップ処理\`"]
        Premises.Data.Backups.Db@{ shape: rectangle, label: "DB logical dump / 自宅Talos CronJob" }
        Premises.Data.Backups.Recordings@{ shape: rectangle, label: "録画 / 自宅Talos CronJob" }
        Premises.Data.Backups.Metrics@{ shape: rectangle, label: "metrics snapshot / 自宅Talos CronJob" }
        Premises.Data.Backups.Nas@{ shape: rectangle, label: "NAS restic / 自宅Talos CronJob" }
      end
      Premises.Data.Shared@{ shape: rectangle, label: "共有PV / runner cache・状態" }
      Premises.Data.Pbs@{ shape: disk, label: "Proxmox Backup Server" }
      subgraph Premises.Data.Nas["\`TrueNAS VM ×2 / ZFS・NFS\`"]
        Premises.Data.Nas.Nas02@{ shape: disk, label: "TrueNAS VM69002 / nas-02" }
        Premises.Data.Nas.Nas01@{ shape: disk, label: "TrueNAS VM69001 / nas-01" }
      end
    end
  end
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.Idrive@{ shape: disk, label: "IDrive e2 / S3" }
  end
  Premises.Home.Nextcloud -. "\`html・data / NFS\`" .-> Premises.Data.Nas.Nas02
  Premises.Home.Recording -. "\`録画・thumbnail・drop / NFS\`" .-> Premises.Data.Nas.Nas02
  Premises.Home.AgentLocal_store -. "\`metrics用NFS PVC\`" .-> Premises.Data.Nas.Nas02
  Premises.Home.Nextcloud -. "\`MYSQL_HOST / MariaDB\`" .-> Premises.Data.Databases.Mariadb
  Premises.Home.Recording -. "\`EPGStation DB\`" .-> Premises.Data.Databases.Mariadb
  Premises.Home.Recording -. "\`[...]\`" .-> Premises.Data.Databases.Postgres
  Premises.Data.Shared -. "\`runner cache / NFS\`" .-> Premises.Data.Nas.Nas01
  Premises.Home.Recording -. "\`録画ファイル専用job\`" .-> Premises.Data.Backups.Recordings
  Premises.Home.AgentLocal_store -. "\`snapshot / vmbackup\`" .-> Premises.Data.Backups.Metrics
  Premises.Data.Nas.Nas02 -. "\`対象dataset / restic\`" .-> Premises.Data.Backups.Nas
  Premises.Data.Pbs -. "\`S3 datastore / VM backup\`" .-> External.Idrive
  Premises.Hardware.X570 -. "\`VM backup\`" .-> Premises.Data.Pbs
  Premises.Hardware.B550m -. "\`VM backup\`" .-> Premises.Data.Pbs
  Premises.Data.Databases -. "\`DB用NFS PVC\`" .-> Premises.Data.Nas.Nas02
  Premises.Data.Databases -. "\`整合性あるlogical dump\`" .-> Premises.Data.Backups.Db
  Premises.Data.Backups -. "\`用途別prefix / 暗号化・retention\`" .-> External.Idrive
`;case`placement`:return`---
title: "所有境界"
---
graph TB
  subgraph HomeSite["\`自宅 / Proxmox2ホスト・RPi\`"]
    subgraph HomeSite.X570["\`pve-x570\`"]
      HomeSite.X570.Nas1@{ shape: disk, label: "TrueNAS VM69001 / nas-01" }
      HomeSite.X570.Pbs@{ shape: disk, label: "PBS VM14001 / 手動退避" }
    end
    subgraph HomeSite.B550m["\`pve-b550m\`"]
      HomeSite.B550m.Nas2@{ shape: disk, label: "TrueNAS VM69002 / nas-02" }
    end
    HomeSite.Talos@{ shape: rectangle, label: "home-k8s" }
  end
  Stg@{ shape: rectangle, label: "OCI / STG OKE共通基盤" }
  Prd@{ shape: rectangle, label: "PRD OKE / 本体reventer所有・共通アドオンmy-infra" }
`;case`media`:return`---
title: "制御・変換・保存"
---
graph LR
  subgraph PremisesHomeRecording["\`録画・配信\`"]
    PremisesHomeRecording.Epgstation@{ shape: rectangle, label: "EPGStation" }
    PremisesHomeRecording.Annict_sync@{ shape: rectangle, label: "Annict録画同期 / CronJob" }
    PremisesHomeRecording.Mirakurun_staging@{ shape: rectangle, label: "Mirakurun Service / STG LXCへの中継" }
    subgraph PremisesHomeRecording.Tnlastation["\`TNLaStation / 共通モデル\`"]
      PremisesHomeRecording.Tnlastation.Gateway@{ shape: rectangle, label: "Gateway" }
      PremisesHomeRecording.Tnlastation.Frontend@{ shape: rectangle, label: "Frontend" }
      PremisesHomeRecording.Tnlastation.Backend@{ shape: rectangle, label: "Backend / API・録画制御" }
      PremisesHomeRecording.Tnlastation.Encode@{ shape: rectangle, label: "ffmpeg encode worker" }
      PremisesHomeRecording.Tnlastation.Streaming@{ shape: rectangle, label: "ffmpeg streaming worker" }
      PremisesHomeRecording.Tnlastation.Mediamtx@{ shape: rectangle, label: "MediaMTX / HLS配信" }
    end
    PremisesHomeRecording.Mirakurun@{ shape: rectangle, label: "Mirakurun Service / 本番LXCへの中継" }
  end
  PremisesHomeAppsAnnict_scraper@{ shape: rectangle, label: "Annict scraper" }
  PremisesHardwareTuner_stg@{ shape: rectangle, label: "Mirakurun STG LXC / CT12904・PX-S1UD" }
  ExternalAnnict@{ shape: rectangle, label: "Annict API" }
  PremisesHardwareTuner_prod@{ shape: rectangle, label: "Mirakurun LXC / CT12901・PT3" }
  PremisesDataDatabases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
  PremisesDataNas@{ shape: disk, label: "TrueNAS VM ×2 / ZFS・NFS" }
  PremisesHomeRecording.Epgstation -. "\`tuner API\`" .-> PremisesHomeRecording.Mirakurun
  PremisesHomeRecording.Annict_sync -. "\`録画登録API\`" .-> PremisesHomeRecording.Tnlastation.Backend
  PremisesHomeRecording.Tnlastation.Backend -. "\`tuner API\`" .-> PremisesHomeRecording.Mirakurun
  PremisesHomeRecording.Tnlastation.Gateway -. "\`Web\`" .-> PremisesHomeRecording.Tnlastation.Frontend
  PremisesHomeRecording.Tnlastation.Gateway -. "\`API\`" .-> PremisesHomeRecording.Tnlastation.Backend
  PremisesHomeRecording.Tnlastation.Gateway -. "\`HLS\`" .-> PremisesHomeRecording.Tnlastation.Mediamtx
  PremisesHomeRecording.Tnlastation.Backend -. "\`encode制御\`" .-> PremisesHomeRecording.Tnlastation.Encode
  PremisesHomeRecording.Tnlastation.Backend -. "\`streaming制御\`" .-> PremisesHomeRecording.Tnlastation.Streaming
  PremisesHomeRecording.Tnlastation.Streaming -. "\`配信\`" .-> PremisesHomeRecording.Tnlastation.Mediamtx
  PremisesHomeRecording.Mirakurun -. "\`EndpointSlice / 外部LXC\`" .-> PremisesHardwareTuner_prod
  PremisesHomeRecording.Mirakurun_staging -. "\`EndpointSlice / 外部LXC\`" .-> PremisesHardwareTuner_stg
  PremisesHardwareTuner_stg -. "\`BS/CS TCP fallback\`" .-> PremisesHardwareTuner_prod
  PremisesHomeRecording.Annict_sync -. "\`番組照合\`" .-> PremisesHomeAppsAnnict_scraper
  PremisesHomeAppsAnnict_scraper -. "\`Annict API\`" .-> ExternalAnnict
  PremisesHomeRecording.Epgstation -. "\`EPGStation DB\`" .-> PremisesDataDatabases
  PremisesHomeRecording.Tnlastation.Backend -. "\`PostgreSQL\`" .-> PremisesDataDatabases
  PremisesHomeRecording.Tnlastation.Encode -. "\`encode状態\`" .-> PremisesDataDatabases
  PremisesDataDatabases -. "\`DB用NFS PVC\`" .-> PremisesDataNas
  PremisesHomeRecording -. "\`録画・thumbnail・drop / NFS\`" .-> PremisesDataNas
`;case`power`:return'---\ntitle: "UPS・NUTのcross-power"\n---\ngraph LR\n  subgraph PremisesHardwareUps["`UPS / NUT`"]\n    PremisesHardwareUps.Mains@{ shape: rectangle, label: "商用AC" }\n    PremisesHardwareUps.Surge_a@{ shape: rectangle, label: "UPS A / サージのみ口・非backup" }\n    PremisesHardwareUps.Ups_a@{ shape: rectangle, label: "UPS A / APC RS550S 2020" }\n    PremisesHardwareUps.Ups_b@{ shape: rectangle, label: "UPS B / APC RS550S 2025" }\n    PremisesHardwareUps.Pi_a@{ shape: rectangle, label: "NUT Pi .112 / 監視A・給電B" }\n    PremisesHardwareUps.Pi_b@{ shape: rectangle, label: "NUT Pi .113 / 監視B・給電A" }\n  end\n  PremisesHardwareX570@{ shape: rectangle, label: "Proxmox / x570" }\n  PremisesHardwareB550m@{ shape: rectangle, label: "Proxmox / b550m" }\n  PremisesHardwareUps.Mains -. "`非バックアップ出力`" .-> PremisesHardwareUps.Surge_a\n  PremisesHardwareUps.Mains -. "`AC入力`" .-> PremisesHardwareUps.Ups_a\n  PremisesHardwareUps.Surge_a -. "`UPS BのAC入力`" .-> PremisesHardwareUps.Ups_b\n  PremisesHardwareUps.Ups_a -. "`USB監視 / ups-a`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_a -. "`cross-power / PiBの給電元`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Ups_b -. "`cross-power / PiAの給電元`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_b -. "`USB監視 / ups-b`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Pi_a -. "`ups-b監視 / LOWBATT10%で自身停止`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Pi_b -. "`ups-a監視 / LOWBATT10%で自身停止`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_a -. "`バッテリー給電`" .-> PremisesHardwareX570\n  PremisesHardwareX570 -. "`charge-guard監視 / 80%で自身停止`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_b -. "`バッテリー給電`" .-> PremisesHardwareB550m\n  PremisesHardwareB550m -. "`charge-guard監視 / 80%で自身停止`" .-> PremisesHardwareUps.Pi_b\n';default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};