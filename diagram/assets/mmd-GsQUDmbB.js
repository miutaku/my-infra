var e=e=>{switch(e){case`index`:return`---
title: "自宅インフラの全体"
---
graph LR
  subgraph HomeSite["\`自宅\`"]
    subgraph HomeSite.Pve["\`Proxmox VEクラスタ（2ノード構成）\`"]
      HomeSite.Pve.ControlplanesCp1@{ shape: rectangle, label: "コントロールプレーン01 / VM13001 / VLAN20" }
      HomeSite.Pve.WorkersWorker1@{ shape: rectangle, label: "home-k8s worker01 / VM13004 / VLAN20" }
      HomeSite.Pve.ControlplanesCp2@{ shape: rectangle, label: "コントロールプレーン02 / VM13002 / VLAN20" }
      HomeSite.Pve.ControlplanesCp3@{ shape: rectangle, label: "コントロールプレーン03 / VM13003 / VLAN20" }
      HomeSite.Pve.WorkersWorker2@{ shape: rectangle, label: "home-k8s worker02 / VM13005 / VLAN20" }
      HomeSite.Pve.StorageNas1@{ shape: disk, label: "nas-01 / TrueNAS VM69001 / VLAN20" }
      HomeSite.Pve.StorageNas2@{ shape: disk, label: "nas-02 / TrueNAS VM69002 / VLAN20" }
      HomeSite.Pve.StoragePbs@{ shape: disk, label: "PBS VM14001 / VLAN20" }
    end
    HomeSite.Network@{ shape: rectangle, label: "ネットワーク機器 / IX2215・SW・AP" }
    HomeSite.Workers@{ shape: rectangle, label: "Raspberry Pi / home-k8s worker03・04 / VLAN10" }
  end
  subgraph Providers["\`外部サービス\`"]
    Providers.Cloudflare@{ shape: rectangle, label: "Cloudflare" }
    Providers.Bitwarden@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
    Providers.Idrive@{ shape: disk, label: "IDrive e2（S3互換）" }
  end
  HomeSite.Network -. "\`VLAN10\`" .-> HomeSite.Workers
  HomeSite.Network -. "\`宅内LAN\`" .-> HomeSite.Pve
  Providers.Cloudflare -. "\`Access・Tunnel\`" .-> HomeSite
  Providers.Bitwarden -. "\`Secret同期\`" .-> HomeSite
  HomeSite -. "\`バックアップ\`" .-> Providers.Idrive
`;case`home_apps`:return`---
title: "home-k8sのサービスと接続"
---
graph LR
  subgraph PremisesPve["\`Proxmox VEクラスタ（2ノード構成）\`"]
    PremisesPve.Nas02@{ shape: disk, label: "nas-02 / TrueNAS VM69002" }
    PremisesPve.Kiosk@{ shape: rectangle, label: "MagicMirror表示 / VM5000" }
  end
  ExternalEdge@{ shape: rectangle, label: "Cloudflare" }
  subgraph PremisesHome["\`home-k8s（Talos Linux）\`"]
    PremisesHome.Platform@{ shape: rectangle, label: "home-k8s クラスタ基盤" }
    PremisesHome.Agent@{ shape: rectangle, label: "自宅監視基盤" }
    PremisesHome.Management@{ shape: rectangle, label: "クラスタ運用" }
    PremisesHome.Eso@{ shape: rectangle, label: "External Secrets Operator" }
    PremisesHome.Dns@{ shape: rectangle, label: "内部DNS / MetalLB" }
    PremisesHome.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
    PremisesHome.Recording@{ shape: rectangle, label: "録画・配信 / EPGStation・TNLaStation" }
    PremisesHome.Loockit@{ shape: rectangle, label: "Loockit / BLEスマートロック" }
    PremisesHome.Coupon_manager@{ shape: rectangle, label: "Coupon Manager" }
    PremisesHome.Wol@{ shape: rectangle, label: "Wake-on-LAN" }
    PremisesHome.Databases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
    PremisesHome.Magic_mirror@{ shape: rectangle, label: "MagicMirror / ダッシュボード" }
    PremisesHome.Annict_scraper@{ shape: rectangle, label: "Annict scraper / 番組照合" }
  end
  ExternalAnnict@{ shape: rectangle, label: "Annict API" }
  PremisesPve.Kiosk -. "\`表示\`" .-> PremisesHome.Magic_mirror
  PremisesHome.Annict_scraper -. "\`Annict API\`" .-> ExternalAnnict
  ExternalEdge -. "\`認証済みHTTP / Access・mTLS → 内部Service\`" .-> PremisesHome
  PremisesPve.Nas02 -. "\`アプリ・DB・監視のNFS\`" .-> PremisesHome
`;case`delivery`:return`---
title: "自宅基盤の変更・同期"
---
graph TB
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Home["\`home-k8s（Talos Linux）\`"]
      Premises.Home.ManagementImages@{ shape: rectangle, label: "Image Updater" }
      Premises.Home.ManagementArgo@{ shape: rectangle, label: "自宅ArgoCD" }
      Premises.Home.ManagementRunner@{ shape: rectangle, label: "ARC / 共用のrunner制御基盤" }
      Premises.Home.ManagementTfc_agents@{ shape: rectangle, label: "Terraform Cloud agents / 自宅" }
    end
    subgraph Premises.Management["\`自宅基盤の構成管理\`"]
      Premises.Management.Ansible@{ shape: rectangle, label: "Ansible" }
      Premises.Management.Packer@{ shape: rectangle, label: "Packer / VM template" }
    end
    subgraph Premises.Hardware["\`物理・ネットワーク\`"]
      Premises.Hardware.Network@{ shape: rectangle, label: "ネットワーク機器" }
    end
    Premises.Pve@{ shape: rectangle, label: "Proxmox VEクラスタ（2ノード構成）" }
  end
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.Github@{ shape: rectangle, label: "GitHub / コード・Actions" }
    External.Terraform_cloud@{ shape: rectangle, label: "Terraform Cloud" }
    External.Github_pages@{ shape: rectangle, label: "GitHub Pages / my-infra図・レビュー" }
    External.Edge@{ shape: rectangle, label: "Cloudflare" }
  end
  External.Github -. "\`GitOps\`" .-> Premises.Home.ManagementArgo
  External.Github -. "\`Actions job\`" .-> Premises.Home.ManagementRunner
  External.Github -. "\`Terraform実行\`" .-> External.Terraform_cloud
  External.Terraform_cloud -. "\`workspace runを自宅agentで実行\`" .-> Premises.Home.ManagementTfc_agents
  External.Github -. "\`構成図・PR比較を公開\`" .-> External.Github_pages
  Premises.Home.ManagementTfc_agents -. "\`VM / ネットワーク\`" .-> Premises.Pve
  Premises.Management.Ansible -. "\`VM・NAS・LXC設定\`" .-> Premises.Pve
  Premises.Management.Packer -. "\`VM template\`" .-> Premises.Pve
  External.Terraform_cloud -. "\`DNS / Access / Tunnel\`" .-> External.Edge
  Premises.Management.Ansible -. "\`NW・UPS機器設定\`" .-> Premises.Hardware
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
    Premises.HomeEso@{ shape: rectangle, label: "External Secrets Operator" }
    Premises.ManagementAnsible@{ shape: rectangle, label: "Ansible" }
    Premises.HomeBackups@{ shape: rectangle, label: "バックアップ処理" }
  end
  External.Bws -. "\`Secret注入\`" .-> Premises.HomeEso
  External.Bws -. "\`CI credential\`" .-> External.Github
  External.Bws -. "\`Terraform変数\`" .-> External.Terraform_cloud
  External.Bws -. "\`機器・PBS用credential\`" .-> Premises.ManagementAnsible
  External.Bws -. "\`ESO経由 / backup credential\`" .-> Premises.HomeBackups
`;case`observability`:return`---
title: "監視の収集・保存・照会"
---
graph LR
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.Grafana@{ shape: rectangle, label: "Grafana Cloud / PDC" }
  end
  subgraph Premises["\`自宅\`"]
    Premises.Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
    subgraph Premises.Home["\`home-k8s（Talos Linux）\`"]
      subgraph Premises.Home.Agent["\`自宅監視基盤\`"]
        Premises.Home.Agent.Exporters@{ shape: rectangle, label: "exporter群" }
        Premises.Home.Agent.Pdc@{ shape: rectangle, label: "PDC agent / 自宅" }
        Premises.Home.Agent.Collector@{ shape: rectangle, label: "vmagent / scrape・remoteWrite" }
        Premises.Home.Agent.Local_store@{ shape: disk, label: "VictoriaMetrics / 自宅" }
      end
    end
  end
  Operator -. "\`照会\`" .-> External.Grafana
  Premises.Hardware -. "\`exporter収集\`" .-> Premises.Home.Agent.Collector
  Premises.Home.Agent.Collector -. "\`remoteWrite / :8428\`" .-> Premises.Home.Agent.Local_store
  External.Grafana -. "\`PDC経由の検索\`" .-> Premises.Home.Agent.Pdc
  Premises.Home.Agent.Pdc -. "\`private query / :8428\`" .-> Premises.Home.Agent.Local_store
  Premises.Home.Agent.Exporters -. "\`scrape\`" .-> Premises.Home.Agent.Collector
`;case`loockit`:return`---
title: "HAProxy → LXC → Bluetooth"
---
graph LR
  Client@{ icon: "fa:user", shape: rounded, label: "専用クライアント" }
  ExternalEdgeMtls@{ shape: rectangle, label: "mTLS / 専用APIの例外" }
  ExternalEdgeLoockit_tunnel@{ shape: rectangle, label: "Loockit専用Tunnel / 2 LXC" }
  subgraph PremisesPve["\`Proxmox VEクラスタ（2ノード構成）\`"]
    PremisesPve.Loockit_a@{ shape: rectangle, label: "Loockit 01 / CT12902" }
    PremisesPve.Loockit_b@{ shape: rectangle, label: "Loockit 02 / CT12903" }
    PremisesPve.Bluez@{ shape: rectangle, label: "BlueZ / Bluetooth（2ノード）" }
  end
  ExternalEdgeLoockit_lease@{ shape: rectangle, label: "Loockit Lease / Durable Object" }
  Client -. "\`クライアント証明書\`" .-> ExternalEdgeMtls
  ExternalEdgeMtls -. "\`mTLS検証済みのAPIリクエスト\`" .-> ExternalEdgeLoockit_tunnel
  ExternalEdgeLoockit_tunnel -. "\`LXC内HAProxy / loopback :18080\`" .-> PremisesPve.Loockit_a
  PremisesPve.Loockit_a -. "\`HTTPS / BLE Lease\`" .-> ExternalEdgeLoockit_lease
  ExternalEdgeLoockit_tunnel -. "\`LXC内HAProxy / loopback :18080\`" .-> PremisesPve.Loockit_b
  PremisesPve.Loockit_b -. "\`HTTPS / BLE Lease\`" .-> ExternalEdgeLoockit_lease
  PremisesPve.Loockit_a -. "\`pve-x570 / read-only D-Bus\`" .-> PremisesPve.Bluez
  PremisesPve.Loockit_b -. "\`pve-b550m / read-only D-Bus\`" .-> PremisesPve.Bluez
`;case`nfs`:return`---
title: "nas-01・nas-02"
---
graph LR
  subgraph PremisesHome["\`home-k8s（Talos Linux）\`"]
    subgraph PremisesHome.Recording["\`録画・配信 / EPGStation・TNLaStation\`"]
      PremisesHome.Recording.Epgstation@{ shape: rectangle, label: "EPGStation" }
      PremisesHome.Recording.Tnlastation@{ shape: rectangle, label: "TNLaStation PRD" }
      PremisesHome.Recording.Tnlastation_staging@{ shape: rectangle, label: "TNLaStation STG" }
    end
    PremisesHome.Shared@{ shape: rectangle, label: "共有PV / runner cache・状態" }
    PremisesHome.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
    PremisesHome.Databases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
    PremisesHome.AgentLocal_store@{ shape: disk, label: "VictoriaMetrics / 自宅" }
    PremisesHome.Coupon_manager@{ shape: rectangle, label: "Coupon Manager" }
  end
  subgraph PremisesPve["\`Proxmox VEクラスタ（2ノード構成）\`"]
    PremisesPve.Nas01@{ shape: disk, label: "nas-01 / TrueNAS VM69001" }
    PremisesPve.Nas02@{ shape: disk, label: "nas-02 / TrueNAS VM69002" }
  end
  PremisesHome.Shared -. "\`runner cache / NFS\`" .-> PremisesPve.Nas01
  PremisesHome.Nextcloud -. "\`html・data / NFS\`" .-> PremisesPve.Nas02
  PremisesHome.Recording.Epgstation -. "\`recorded・thumbnail・drop / NFS\`" .-> PremisesPve.Nas02
  PremisesHome.Recording.Tnlastation -. "\`recorded・tnlastation / NFS\`" .-> PremisesPve.Nas02
  PremisesHome.Recording.Tnlastation_staging -. "\`recorded-staging・tnlastation-staging / NFS\`" .-> PremisesPve.Nas02
  PremisesHome.Databases -. "\`DB用NFS PVC\`" .-> PremisesPve.Nas02
  PremisesHome.AgentLocal_store -. "\`metrics用NFS PVC\`" .-> PremisesPve.Nas02
  PremisesHome.Coupon_manager -. "\`images・Data Protection keys / PVC\`" .-> PremisesPve.Nas02
`;case`nextcloud`:return`---
title: "DB・ロック・ファイル保存"
---
graph LR
  ExternalEdge@{ shape: rectangle, label: "Cloudflare" }
  subgraph PremisesHomeNextcloud["\`Nextcloud\`"]
    PremisesHomeNextcloud.Resources@{ shape: rectangle, label: "リソース定義" }
    PremisesHomeNextcloud.Web@{ shape: rectangle, label: "Nextcloud / PHP・HTTP :80" }
    PremisesHomeNextcloud.Redis@{ shape: disk, label: "Redis / locking・cache" }
  end
  PremisesHomeDatabasesMariadb@{ shape: disk, label: "MariaDB" }
  subgraph PremisesPve["\`Proxmox VEクラスタ（2ノード構成）\`"]
    PremisesPve.Nas02@{ shape: disk, label: "nas-02 / TrueNAS VM69002" }
  end
  ExternalEdge -. "\`nextcloud / 80 / Access\`" .-> PremisesHomeNextcloud.Web
  PremisesHomeNextcloud.Web -. "\`Redis :6379 / locking・cache\`" .-> PremisesHomeNextcloud.Redis
  PremisesHomeNextcloud.Web -. "\`MYSQL_HOST / MariaDB\`" .-> PremisesHomeDatabasesMariadb
  PremisesHomeNextcloud.Web -. "\`html・data / NFS\`" .-> PremisesPve.Nas02
`;case`placement`:return`---
title: "全VM・LXC"
---
graph TB
  subgraph HomeSitePve["\`Proxmox VEクラスタ（2ノード構成）\`"]
    subgraph HomeSitePve.Controlplanes["\`home-k8s コントロールプレーン\`"]
      subgraph HomeSitePve.Controlplanes.Cp1["\`コントロールプレーン01 / VM13001 / VLAN20\`"]
        HomeSitePve.Controlplanes.Cp1.Talos@{ shape: rectangle, label: "Talos Linux" }
      end
      subgraph HomeSitePve.Controlplanes.Cp2["\`コントロールプレーン02 / VM13002 / VLAN20\`"]
        HomeSitePve.Controlplanes.Cp2.Talos@{ shape: rectangle, label: "Talos Linux" }
      end
      subgraph HomeSitePve.Controlplanes.Cp3["\`コントロールプレーン03 / VM13003 / VLAN20\`"]
        HomeSitePve.Controlplanes.Cp3.Talos@{ shape: rectangle, label: "Talos Linux" }
      end
    end
    subgraph HomeSitePve.Workers["\`home-k8s ワーカー\`"]
      subgraph HomeSitePve.Workers.Worker1["\`home-k8s worker01 / VM13004 / VLAN20\`"]
        HomeSitePve.Workers.Worker1.Talos@{ shape: rectangle, label: "Talos Linux" }
      end
      subgraph HomeSitePve.Workers.Worker2["\`home-k8s worker02 / VM13005 / VLAN20\`"]
        HomeSitePve.Workers.Worker2.Talos@{ shape: rectangle, label: "Talos Linux" }
      end
    end
    subgraph HomeSitePve.Loadbalancers["\`ロードバランサー\`"]
      HomeSitePve.Loadbalancers.Lb1@{ shape: rectangle, label: "HAProxy / Keepalived VM10001 / VLAN20" }
      HomeSitePve.Loadbalancers.Lb2@{ shape: rectangle, label: "HAProxy / Keepalived VM10002 / VLAN20" }
    end
    subgraph HomeSitePve.Storage["\`ストレージ・バックアップ\`"]
      HomeSitePve.Storage.Nas1@{ shape: disk, label: "nas-01 / TrueNAS VM69001 / VLAN20" }
      HomeSitePve.Storage.Nas2@{ shape: disk, label: "nas-02 / TrueNAS VM69002 / VLAN20" }
      HomeSitePve.Storage.Pbs@{ shape: disk, label: "PBS VM14001 / VLAN20" }
    end
    subgraph HomeSitePve.Smartlocks["\`Loockit / Bluetooth制御\`"]
      subgraph HomeSitePve.Smartlocks.Loockit1["\`Loockit 01 / CT12902 / VLAN20\`"]
        HomeSitePve.Smartlocks.Loockit1.App@{ shape: rectangle, label: "Docker / Loockit REST・gRPC" }
      end
      subgraph HomeSitePve.Smartlocks.Loockit2["\`Loockit 02 / CT12903 / VLAN20\`"]
        HomeSitePve.Smartlocks.Loockit2.App@{ shape: rectangle, label: "Docker / Loockit REST・gRPC" }
      end
    end
    subgraph HomeSitePve.Tuners["\`Mirakurun / チューナー\`"]
      subgraph HomeSitePve.Tuners.Tuner_prod["\`Mirakurun本番 / CT12901・PT3 / VLAN20\`"]
        HomeSitePve.Tuners.Tuner_prod.App@{ shape: rectangle, label: "Docker / Mirakurun / PT3" }
      end
      subgraph HomeSitePve.Tuners.Tuner_stg["\`Mirakurun STG / CT12904・PX-S1UD / VLAN20\`"]
        HomeSitePve.Tuners.Tuner_stg.App@{ shape: rectangle, label: "Docker / Mirakurun / PX-S1UD" }
      end
    end
    subgraph HomeSitePve.Network_management["\`ネットワーク管理\`"]
      subgraph HomeSitePve.Network_management.Unifi["\`UniFi OS VM13201 / native1\`"]
        HomeSitePve.Network_management.Unifi.App@{ shape: rectangle, label: "Podman / UniFi OS・Network" }
      end
    end
    subgraph HomeSitePve.Development["\`開発環境\`"]
      HomeSitePve.Development.Dev@{ shape: rectangle, label: "開発用Docker / VM40000 / VLAN20" }
    end
    subgraph HomeSitePve.Desktop["\`デスクトップ\`"]
      HomeSitePve.Desktop.Windows@{ shape: rectangle, label: "Windows / VM60000 / VLAN30" }
    end
    subgraph HomeSitePve.Display["\`表示端末\`"]
      HomeSitePve.Display.Kiosk@{ shape: rectangle, label: "MagicMirror表示 / VM5000 / VLAN40" }
    end
  end
`;case`recording_prd`:return`---
title: "制御・エンコード・配信"
---
graph LR
  subgraph PremisesHome["\`home-k8s（Talos Linux）\`"]
    subgraph PremisesHome.RecordingTnlastation["\`TNLaStation PRD\`"]
      PremisesHome.RecordingTnlastation.Resources@{ shape: rectangle, label: "リソース定義" }
      PremisesHome.RecordingTnlastation.Gateway@{ shape: rectangle, label: "Gateway" }
      PremisesHome.RecordingTnlastation.Frontend@{ shape: rectangle, label: "Frontend" }
      PremisesHome.RecordingTnlastation.Backend@{ shape: rectangle, label: "Backend / API・録画制御" }
      PremisesHome.RecordingTnlastation.Encode@{ shape: rectangle, label: "ffmpeg encode worker" }
      PremisesHome.RecordingTnlastation.Streaming@{ shape: rectangle, label: "ffmpeg streaming worker" }
      PremisesHome.RecordingTnlastation.Mediamtx@{ shape: rectangle, label: "MediaMTX / HLS配信" }
    end
    PremisesHome.DatabasesPostgres@{ shape: disk, label: "PostgreSQL PRD" }
  end
  subgraph PremisesPve["\`Proxmox VEクラスタ（2ノード構成）\`"]
    PremisesPve.Nas02@{ shape: disk, label: "nas-02 / TrueNAS VM69002" }
    PremisesPve.Tuner_prod@{ shape: rectangle, label: "Mirakurun PRD / LXC12901" }
  end
  PremisesHome.RecordingTnlastation.Gateway -. "\`Web\`" .-> PremisesHome.RecordingTnlastation.Frontend
  PremisesHome.RecordingTnlastation.Gateway -. "\`API\`" .-> PremisesHome.RecordingTnlastation.Backend
  PremisesHome.RecordingTnlastation.Gateway -. "\`HLS\`" .-> PremisesHome.RecordingTnlastation.Mediamtx
  PremisesHome.RecordingTnlastation.Backend -. "\`encode制御\`" .-> PremisesHome.RecordingTnlastation.Encode
  PremisesHome.RecordingTnlastation.Backend -. "\`streaming制御\`" .-> PremisesHome.RecordingTnlastation.Streaming
  PremisesHome.RecordingTnlastation.Streaming -. "\`配信\`" .-> PremisesHome.RecordingTnlastation.Mediamtx
  PremisesHome.RecordingTnlastation.Backend -. "\`Service名で接続 / PRD :40772\`" .-> PremisesPve.Tuner_prod
  PremisesHome.RecordingTnlastation.Backend -. "\`PostgreSQL\`" .-> PremisesHome.DatabasesPostgres
  PremisesHome.RecordingTnlastation.Encode -. "\`encode状態\`" .-> PremisesHome.DatabasesPostgres
  PremisesHome.RecordingTnlastation -. "\`recorded・tnlastation / NFS\`" .-> PremisesPve.Nas02
`;case`recording_stg`:return`---
title: "制御・エンコード・配信"
---
graph LR
  subgraph PremisesHome["\`home-k8s（Talos Linux）\`"]
    subgraph PremisesHome.RecordingTnlastation_staging["\`TNLaStation STG\`"]
      PremisesHome.RecordingTnlastation_staging.Resources@{ shape: rectangle, label: "リソース定義" }
      PremisesHome.RecordingTnlastation_staging.Gateway@{ shape: rectangle, label: "Gateway" }
      PremisesHome.RecordingTnlastation_staging.Frontend@{ shape: rectangle, label: "Frontend" }
      PremisesHome.RecordingTnlastation_staging.Backend@{ shape: rectangle, label: "Backend / API・録画制御" }
      PremisesHome.RecordingTnlastation_staging.Encode@{ shape: rectangle, label: "ffmpeg encode worker" }
      PremisesHome.RecordingTnlastation_staging.Streaming@{ shape: rectangle, label: "ffmpeg streaming worker" }
      PremisesHome.RecordingTnlastation_staging.Mediamtx@{ shape: rectangle, label: "MediaMTX / HLS配信" }
    end
    PremisesHome.DatabasesPostgres_staging@{ shape: disk, label: "PostgreSQL STG" }
  end
  subgraph PremisesPve["\`Proxmox VEクラスタ（2ノード構成）\`"]
    PremisesPve.Nas02@{ shape: disk, label: "nas-02 / TrueNAS VM69002" }
    PremisesPve.Tuner_stg@{ shape: rectangle, label: "Mirakurun STG / LXC12904" }
  end
  PremisesHome.RecordingTnlastation_staging.Gateway -. "\`Web\`" .-> PremisesHome.RecordingTnlastation_staging.Frontend
  PremisesHome.RecordingTnlastation_staging.Gateway -. "\`API\`" .-> PremisesHome.RecordingTnlastation_staging.Backend
  PremisesHome.RecordingTnlastation_staging.Gateway -. "\`HLS\`" .-> PremisesHome.RecordingTnlastation_staging.Mediamtx
  PremisesHome.RecordingTnlastation_staging.Backend -. "\`encode制御\`" .-> PremisesHome.RecordingTnlastation_staging.Encode
  PremisesHome.RecordingTnlastation_staging.Backend -. "\`streaming制御\`" .-> PremisesHome.RecordingTnlastation_staging.Streaming
  PremisesHome.RecordingTnlastation_staging.Streaming -. "\`配信\`" .-> PremisesHome.RecordingTnlastation_staging.Mediamtx
  PremisesHome.RecordingTnlastation_staging.Backend -. "\`Service名で接続 / STG :40772\`" .-> PremisesPve.Tuner_stg
  PremisesHome.RecordingTnlastation_staging.Backend -. "\`PostgreSQL\`" .-> PremisesHome.DatabasesPostgres_staging
  PremisesHome.RecordingTnlastation_staging.Encode -. "\`encode状態\`" .-> PremisesHome.DatabasesPostgres_staging
  PremisesHome.RecordingTnlastation_staging -. "\`recorded-staging・tnlastation-staging / NFS\`" .-> PremisesPve.Nas02
`;case`vlans`:return`---
title: "native・タグ・経路"
---
graph TB
  subgraph HomeSite["\`自宅\`"]
    subgraph HomeSite.Lan["\`VLANセグメント\`"]
      subgraph HomeSite.Lan.Native["\`native1 / 192.168.0.0/24\`"]
        HomeSite.Lan.Native.Pve@{ shape: rectangle, label: "UniFi OS" }
        HomeSite.Lan.Native.Pve_management@{ shape: rectangle, label: "Proxmox VE / 2ノード管理" }
        HomeSite.Lan.Native.Switch@{ shape: rectangle, label: "US-8-60W / 管理IP" }
        HomeSite.Lan.Native.Ap@{ shape: rectangle, label: "FS AP / 管理IP" }
      end
      subgraph HomeSite.Lan.Management["\`VLAN10 / 192.168.10.0/24\`"]
        HomeSite.Lan.Management.Rpi_workers@{ shape: rectangle, label: "Raspberry Pi / worker03・04" }
        HomeSite.Lan.Management.Nut@{ shape: rectangle, label: "NUT Pi / UPS監視" }
        HomeSite.Lan.Management.Kvm@{ shape: rectangle, label: "NanoKVM ×2" }
        HomeSite.Lan.Management.Management_clients@{ shape: rectangle, label: "管理端末 / NUCBox・NIC" }
      end
      subgraph HomeSite.Lan.Server["\`VLAN20 / 192.168.20.0/24\`"]
        HomeSite.Lan.Server.Pve@{ shape: rectangle, label: "Proxmox / サーバ基盤" }
        HomeSite.Lan.Server.Service_ips@{ shape: rectangle, label: "MetalLB / Service IP" }
        HomeSite.Lan.Server.Vips@{ shape: rectangle, label: "API・ロードバランサー VIP" }
      end
      subgraph HomeSite.Lan.Client["\`VLAN30 / 192.168.30.0/24\`"]
        HomeSite.Lan.Client.Pve@{ shape: rectangle, label: "Windows / 作業環境" }
        HomeSite.Lan.Client.Physical_clients@{ shape: rectangle, label: "PC・クライアント端末" }
        HomeSite.Lan.Client.Wol@{ shape: rectangle, label: "WoL relay / Raspberry Pi" }
      end
      subgraph HomeSite.Lan.Guest["\`VLAN31 / 192.168.31.0/24\`"]
        HomeSite.Lan.Guest.Clients@{ shape: rectangle, label: "来客端末 / DHCP" }
      end
      subgraph HomeSite.Lan.Iot["\`VLAN40 / 192.168.40.0/24\`"]
        HomeSite.Lan.Iot.Pve@{ shape: rectangle, label: "MagicMirror / 表示端末" }
        HomeSite.Lan.Iot.Av@{ shape: rectangle, label: "TV・ゲーム機" }
        HomeSite.Lan.Iot.Smart_home@{ shape: rectangle, label: "スマートホーム" }
      end
    end
    HomeSite.Ix2215@{ shape: rectangle, label: "IX2215 / ルーター・VLAN間ACL" }
  end
  subgraph Providers["\`外部サービス\`"]
    Providers.Warp@{ shape: rectangle, label: "Cloudflare WARP" }
  end
  HomeSite.Ix2215 -. "\`BVI20\`" .-> HomeSite.Lan.Server
  HomeSite.Ix2215 -. "\`native IF\`" .-> HomeSite.Lan.Native
  HomeSite.Ix2215 -. "\`BVI30\`" .-> HomeSite.Lan.Client
  HomeSite.Ix2215 -. "\`BVI4 / tag40\`" .-> HomeSite.Lan.Iot
  HomeSite.Ix2215 -. "\`BVI10\`" .-> HomeSite.Lan.Management
  HomeSite.Ix2215 -. "\`BVI31\`" .-> HomeSite.Lan.Guest
  Providers.Warp -. "\`WARP / private CIDR routes・policy\`" .-> HomeSite.Lan.Server
`;case`platform`:return`---
title: "クラスタ基盤"
---
graph LR
  PremisesHomePlatformDescheduler@{ shape: rectangle, label: "descheduler" }
  PremisesHomePlatformControlplane@{ shape: rectangle, label: "home-k8s control-plane" }
  PremisesHomePlatformCert_approver@{ shape: rectangle, label: "kubelet-serving-cert-approver" }
  PremisesHomePlatformFlannel@{ shape: rectangle, label: "Flannel / CNI" }
  PremisesHomePlatformKube_proxy@{ shape: rectangle, label: "kube-proxy / Service routing" }
  PremisesHomePlatformMetrics_server@{ shape: rectangle, label: "metrics-server / Metrics API" }
  PremisesHomeDnsMetallb@{ shape: rectangle, label: "MetalLB / LANのService IP" }
  ExternalBws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
  PremisesHomeManagementArgo@{ shape: rectangle, label: "自宅ArgoCD" }
  PremisesHomeManagementRunner@{ shape: rectangle, label: "ARC / 共用のrunner制御基盤" }
  PremisesHomePlatformCloudflared@{ shape: rectangle, label: "cloudflared / 自宅connector" }
  PremisesHomeDnsCoredns@{ shape: rectangle, label: "CoreDNS / miutaku.internal" }
  PremisesHomeEso@{ shape: rectangle, label: "External Secrets Operator" }
  ExternalEdge@{ shape: rectangle, label: "Cloudflare" }
  ExternalPublic_dns@{ shape: rectangle, label: "Public DNS / 1.1.1.1・8.8.8.8" }
  PremisesHomePlatformApi@{ shape: rectangle, label: "Kubernetes API / Lease" }
  PremisesLanServer@{ shape: rectangle, label: "VLAN20 / 192.168.20.0/24" }
  PremisesHomePlatformWorker@{ shape: rectangle, label: "home-k8s worker" }
  PremisesHomePlatformCluster_dns@{ shape: rectangle, label: "CoreDNS / cluster.local" }
  PremisesHomePlatformDescheduler -. "\`Podのeviction / 配置再調整\`" .-> PremisesHomePlatformApi
  PremisesHomePlatformApi -. "\`Podの実行を制御\`" .-> PremisesHomePlatformWorker
  PremisesHomePlatformControlplane -. "\`API server :6443 / etcd\`" .-> PremisesHomePlatformApi
  PremisesHomePlatformWorker -. "\`kubelet / Pod・Serviceのwatch\`" .-> PremisesHomePlatformApi
  PremisesHomePlatformCert_approver -. "\`kubelet serving CSRの承認\`" .-> PremisesHomePlatformApi
  PremisesHomePlatformWorker -. "\`Podの名前解決 / :53\`" .-> PremisesHomePlatformCluster_dns
  PremisesHomePlatformFlannel -. "\`CNI / Podネットワーク\`" .-> PremisesHomePlatformWorker
  PremisesHomePlatformKube_proxy -. "\`Service / ClusterIP転送\`" .-> PremisesHomePlatformWorker
  PremisesHomePlatformMetrics_server -. "\`kubelet metrics / :10250\`" .-> PremisesHomePlatformWorker
  PremisesHomeDnsMetallb -. "\`ServiceのIP割当 / controller\`" .-> PremisesHomePlatformApi
  PremisesHomeDnsMetallb -. "\`LAN向けDNS / LoadBalancer IP .201\`" .-> PremisesHomeDnsCoredns
  PremisesHomeDnsCoredns -. "\`非internal名をforward / DNS :53\`" .-> ExternalPublic_dns
  PremisesHomeEso -. "\`Kubernetes Secretを同期\`" .-> PremisesHomePlatformApi
  ExternalBws -. "\`Secret注入\`" .-> PremisesHomeEso
  PremisesHomeManagementArgo -. "\`manifest同期 / Kubernetes API\`" .-> PremisesHomePlatformApi
  PremisesHomeManagementRunner -. "\`runner Podの作成・削除\`" .-> PremisesHomePlatformApi
  PremisesHomePlatformCloudflared -. "\`外向きTunnel接続\`" .-> ExternalEdge
  PremisesHomeDnsMetallb -. "\`L2広告 / Service IP .200-.226\`" .-> PremisesLanServer
  ExternalEdge -. "\`private CIDR routes / WARP policy\`" .-> PremisesLanServer
`;case`network`:return`---
title: "ルーター・SW・AP"
---
graph TB
  ExternalInternet@{ shape: rectangle, label: "Internet" }
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Pve["\`Proxmox VEクラスタ（2ノード構成）\`"]
      Premises.Pve.Unifi@{ shape: rectangle, label: "UniFi OS / VM13201" }
    end
    subgraph Premises.HardwareNetwork["\`ネットワーク機器\`"]
      Premises.HardwareNetwork.Router@{ shape: rectangle, label: "IX2215 / ルーター・VLAN間ACL" }
      Premises.HardwareNetwork.Ethernet@{ shape: rectangle, label: "宅内Ethernet / VLAN trunk" }
      Premises.HardwareNetwork.Switch@{ shape: rectangle, label: "US-8-60W / 管理スイッチ" }
      Premises.HardwareNetwork.Ap@{ shape: rectangle, label: "FS Wi-Fi AP" }
    end
  end
  ExternalInternet -. "\`WAN / GigaEthernet0\`" .-> Premises.HardwareNetwork.Router
  Premises.HardwareNetwork.Router -. "\`GigaEthernet2 / native1 + tag10,20,30,31,40\`" .-> Premises.HardwareNetwork.Ethernet
  Premises.HardwareNetwork.Ethernet -. "\`802.1Q / uplink\`" .-> Premises.HardwareNetwork.Switch
  Premises.HardwareNetwork.Ethernet -. "\`AP trunk\`" .-> Premises.HardwareNetwork.Ap
  Premises.Pve.Unifi -. "\`構成・監視を管理\`" .-> Premises.HardwareNetwork.Switch
  Premises.HardwareNetwork.Ethernet -. "\`native1 / tag20・30・40\`" .-> Premises.Pve
`;case`storage`:return`---
title: "復元元の区別"
---
graph LR
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Pve["\`Proxmox VEクラスタ（2ノード構成）\`"]
      Premises.Pve.Backup_sources@{ shape: rectangle, label: "VMバックアップ対象 / 2ノード" }
      Premises.Pve.Nas02@{ shape: disk, label: "nas-02 / TrueNAS VM69002" }
      Premises.Pve.Pbs@{ shape: disk, label: "PBS / VM14001" }
    end
    subgraph Premises.Home["\`home-k8s（Talos Linux）\`"]
      subgraph Premises.Home.Agent["\`自宅監視基盤\`"]
        Premises.Home.Agent.Local_store@{ shape: disk, label: "VictoriaMetrics / 自宅" }
      end
      Premises.Home.Recording@{ shape: rectangle, label: "録画・配信 / EPGStation・TNLaStation" }
      Premises.Home.Databases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
      subgraph Premises.Home.Backups["\`バックアップ処理\`"]
        Premises.Home.Backups.Nas@{ shape: rectangle, label: "NAS restic / home-k8s CronJob" }
        Premises.Home.Backups.Recordings@{ shape: rectangle, label: "録画 / home-k8s CronJob" }
        Premises.Home.Backups.Db@{ shape: rectangle, label: "DB logical dump / home-k8s CronJob" }
        Premises.Home.Backups.Metrics@{ shape: rectangle, label: "metrics snapshot / home-k8s CronJob" }
      end
    end
  end
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.Idrive@{ shape: disk, label: "IDrive e2（S3互換）" }
  end
  Premises.Pve.Backup_sources -. "\`VM backup / 2ノード\`" .-> Premises.Pve.Pbs
  Premises.Pve.Nas02 -. "\`対象dataset / restic\`" .-> Premises.Home.Backups.Nas
  Premises.Home.Recording -. "\`録画ファイル専用job\`" .-> Premises.Home.Backups.Recordings
  Premises.Home.Databases -. "\`整合性あるlogical dump\`" .-> Premises.Home.Backups.Db
  Premises.Home.Agent.Local_store -. "\`snapshot / vmbackup\`" .-> Premises.Home.Backups.Metrics
  Premises.Pve.Pbs -. "\`S3 datastore / VM backup\`" .-> External.Idrive
  Premises.Home.Backups -. "\`用途別prefix / 暗号化・retention\`" .-> External.Idrive
`;case`access`:return`---
title: "原則Access・例外mTLS"
---
graph LR
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  Client@{ icon: "fa:user", shape: rounded, label: "専用クライアント" }
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    subgraph External.Edge["\`Cloudflare\`"]
      External.Edge.Access@{ shape: rectangle, label: "Cloudflare Access / 共通の認証入口" }
      External.Edge.Mtls@{ shape: rectangle, label: "mTLS / 専用APIの例外" }
      External.Edge.Tunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
      subgraph External.Edge.Routes["\`公開hostname / 設定から抽出\`"]
        External.Edge.Routes.Protected@{ shape: rectangle, label: "Access保護のhostname" }
        External.Edge.Routes.Exceptions@{ shape: rectangle, label: "例外 / mTLS専用API" }
      end
    end
  end
  subgraph Consumers["\`基盤の利用側 / 別リポジトリ\`"]
    Consumers.Reventer@{ shape: rectangle, label: "Re:Venter" }
  end
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Home["\`home-k8s（Talos Linux）\`"]
      Premises.Home.ManagementArgo@{ shape: rectangle, label: "自宅ArgoCD" }
    end
    subgraph Premises.Hardware["\`物理・ネットワーク\`"]
      Premises.Hardware.Network@{ shape: rectangle, label: "ネットワーク機器" }
    end
    Premises.Pve@{ shape: rectangle, label: "Proxmox VEクラスタ（2ノード構成）" }
  end
  User -. "\`HTTPS / 利用時の認証\`" .-> External.Edge.Access
  Operator -. "\`HTTPS / 管理時の認証\`" .-> External.Edge.Access
  Client -. "\`クライアント証明書\`" .-> External.Edge.Mtls
  External.Edge.Access -. "\`Access認証後の転送\`" .-> External.Edge.Tunnel
  External.Edge.Tunnel -. "\`hostname転送\`" .-> External.Edge.Routes.Protected
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Pve
  External.Edge.Routes.Exceptions -. "\`独立LXC proxy / ready leader\`" .-> Premises.Pve
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Home.ManagementArgo
  External.Edge.Tunnel -. "\`hostname転送\`" .-> Consumers.Reventer
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Hardware.Network
`;case`recording`:return`---
title: "PRD・STG"
---
graph LR
  subgraph PremisesHome["\`home-k8s（Talos Linux）\`"]
    subgraph PremisesHome.Recording["\`録画・配信 / EPGStation・TNLaStation\`"]
      PremisesHome.Recording.Epgstation@{ shape: rectangle, label: "EPGStation" }
      PremisesHome.Recording.Tnlastation@{ shape: rectangle, label: "TNLaStation PRD" }
      PremisesHome.Recording.Tnlastation_staging@{ shape: rectangle, label: "TNLaStation STG" }
    end
  end
  subgraph PremisesPve["\`Proxmox VEクラスタ（2ノード構成）\`"]
    PremisesPve.Tuner_stg@{ shape: rectangle, label: "Mirakurun STG / LXC12904" }
    PremisesPve.Tuner_prod@{ shape: rectangle, label: "Mirakurun PRD / LXC12901" }
  end
  PremisesHome.Recording.Epgstation -. "\`Service名で接続 / PRD :40772\`" .-> PremisesPve.Tuner_prod
  PremisesHome.Recording.Tnlastation -. "\`Service名で接続 / PRD :40772\`" .-> PremisesPve.Tuner_prod
  PremisesHome.Recording.Tnlastation_staging -. "\`Service名で接続 / STG :40772\`" .-> PremisesPve.Tuner_stg
  PremisesPve.Tuner_stg -. "\`BS/CS TCP fallback\`" .-> PremisesPve.Tuner_prod
`;case`power`:return'---\ntitle: "UPS・NUTのcross-power"\n---\ngraph LR\n  subgraph PremisesHardware["`物理・ネットワーク`"]\n    subgraph PremisesHardware.Ups["`UPS / NUT`"]\n      PremisesHardware.Ups.Ups_a@{ shape: rectangle, label: "UPS A / APC RS550S 2020" }\n      PremisesHardware.Ups.Ups_b@{ shape: rectangle, label: "UPS B / APC RS550S 2025" }\n      PremisesHardware.Ups.Mains@{ shape: rectangle, label: "商用AC" }\n      PremisesHardware.Ups.Surge_a@{ shape: rectangle, label: "UPS A / サージのみ口・非backup" }\n      PremisesHardware.Ups.Pi_a@{ shape: rectangle, label: "NUT Pi 01 / 192.168.10.112" }\n      PremisesHardware.Ups.Pi_b@{ shape: rectangle, label: "NUT Pi 02 / 192.168.10.113" }\n    end\n    PremisesHardware.Network@{ shape: rectangle, label: "ネットワーク機器" }\n  end\n  PremisesPve@{ shape: rectangle, label: "Proxmox VEクラスタ（2ノード構成）" }\n  PremisesPve -. "`pve-x570 / 残量80%で停止`" .-> PremisesHardware.Ups.Pi_a\n  PremisesPve -. "`pve-b550m / 残量80%で停止`" .-> PremisesHardware.Ups.Pi_b\n  PremisesHardware.Ups.Ups_a -. "`pve-x570へ給電`" .-> PremisesPve\n  PremisesHardware.Ups.Ups_b -. "`pve-b550mへ給電`" .-> PremisesPve\n  PremisesHardware.Ups.Mains -. "`非バックアップ出力`" .-> PremisesHardware.Ups.Surge_a\n  PremisesHardware.Ups.Mains -. "`AC入力`" .-> PremisesHardware.Ups.Ups_a\n  PremisesHardware.Ups.Surge_a -. "`UPS BのAC入力`" .-> PremisesHardware.Ups.Ups_b\n  PremisesHardware.Ups.Ups_a -. "`USB / ups-a`" .-> PremisesHardware.Ups.Pi_a\n  PremisesHardware.Ups.Ups_a -. "`Pi 02へ給電`" .-> PremisesHardware.Ups.Pi_b\n  PremisesHardware.Ups.Ups_b -. "`Pi 01へ給電`" .-> PremisesHardware.Ups.Pi_a\n  PremisesHardware.Ups.Ups_b -. "`USB / ups-b`" .-> PremisesHardware.Ups.Pi_b\n  PremisesHardware.Ups.Pi_a -. "`ups-b@192.168.10.113 / 給電元Bを監視`" .-> PremisesHardware.Ups.Pi_b\n  PremisesHardware.Ups.Pi_b -. "`ups-a@192.168.10.112 / 給電元Aを監視`" .-> PremisesHardware.Ups.Pi_a\n  PremisesHardware.Ups.Ups_b -. "`NW機器へ給電`" .-> PremisesHardware.Network\n';default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};