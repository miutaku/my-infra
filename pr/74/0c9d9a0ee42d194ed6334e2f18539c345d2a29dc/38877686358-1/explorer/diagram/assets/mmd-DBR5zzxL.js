var e=e=>{switch(e){case`index`:return'---\ntitle: "自宅インフラの全体"\n---\ngraph LR\n  User@{ icon: "fa:user", shape: rounded, label: "利用者" }\n  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }\n  subgraph Premises["`自宅`"]\n    subgraph Premises.Hardware["`物理・ネットワーク`"]\n      Premises.Hardware.Network@{ shape: rectangle, label: "ネットワーク機器" }\n      Premises.Hardware.X570@{ shape: rectangle, label: "pve-x570 / Proxmox" }\n      Premises.Hardware.B550m@{ shape: rectangle, label: "pve-b550m / Proxmox" }\n      Premises.Hardware.Rpi_workers@{ shape: rectangle, label: "RPi worker ×2" }\n    end\n    subgraph Premises.Data["`保存・バックアップ`"]\n      Premises.Data.Nas@{ shape: disk, label: "TrueNAS VM ×2 / ZFS・NFS" }\n      Premises.Data.Pbs@{ shape: disk, label: "Proxmox Backup Server" }\n    end\n    Premises.Home@{ shape: rectangle, label: "Talos / home-k8s" }\n  end\n  subgraph External["`外部サービス / SaaS・公開サービス`"]\n    External.Edge@{ shape: rectangle, label: "Cloudflare" }\n    External.Grafana@{ shape: rectangle, label: "Grafana Cloud / PDC" }\n    External.Bws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }\n    External.Idrive@{ shape: disk, label: "IDrive e2 / S3" }\n  end\n  subgraph Consumers["`基盤の利用側 / 別リポジトリ`"]\n    Consumers.Reventer@{ shape: rectangle, label: "Re:Venter" }\n  end\n  User -. "`HTTPS / 利用時の認証`" .-> External.Edge\n  Operator -. "`HTTPS / 管理時の認証`" .-> External.Edge\n  Operator -. "`照会`" .-> External.Grafana\n  Premises.Hardware.Network -. "`native1管理 / ゲストtag20・30 / 配線ポート未確定`" .-> Premises.Hardware.X570\n  Premises.Hardware.Network -. "`native1管理 / ゲストtag20・40 / 配線ポート未確定`" .-> Premises.Hardware.B550m\n  Premises.Hardware.Network -. "`VLAN10 / arm64 worker`" .-> Premises.Hardware.Rpi_workers\n  External.Edge -. "`認証済みHTTP / Access・mTLS → 内部Service`" .-> Premises.Home\n  External.Bws -. "`Secret注入`" .-> Premises.Home\n  External.Grafana -. "`PDC経由の検索`" .-> Premises.Home\n  Premises.Hardware.Network -. "`LAN / 内部DNS`" .-> Premises.Home\n  Premises.Hardware.X570 -. "`Talos VM13001・13004 / CP1・worker1`" .-> Premises.Home\n  Premises.Hardware.B550m -. "`Talos VM13002・13003・13005 / CP2・worker1`" .-> Premises.Home\n  Premises.Hardware.Rpi_workers -. "`Talos worker03・04 / arm64`" .-> Premises.Home\n  Premises.Home -. "`外向きPDC接続`" .-> External.Grafana\n  Premises.Hardware.X570 -. "`TrueNAS VM69001 / USB disk passthrough`" .-> Premises.Data.Nas\n  Premises.Hardware.B550m -. "`TrueNAS VM69002 / USB disk passthrough`" .-> Premises.Data.Nas\n  Premises.Data.Nas -. "`NFSストレージを提供`" .-> Premises.Home\n  Premises.Hardware.X570 -. "`VM backup`" .-> Premises.Data.Pbs\n  Premises.Hardware.B550m -. "`VM backup`" .-> Premises.Data.Pbs\n  Premises.Data.Pbs -. "`S3 datastore / VM backup`" .-> External.Idrive\n  Premises.Home -. "`共有ArgoCD・ARCを提供 / 専用構成は利用側へ`" .-> Consumers.Reventer\n  Premises.Hardware -. "`exporter収集`" .-> Premises.Home\n';case`home_apps`:return'---\ntitle: "home-k8sのサービスと接続"\n---\ngraph LR\n  ExternalEdge@{ shape: rectangle, label: "Cloudflare" }\n  PremisesHardwareKiosk@{ shape: rectangle, label: "MagicMirror表示 / VM5000" }\n  subgraph PremisesHome["`Talos / home-k8s`"]\n    PremisesHome.Platform@{ shape: rectangle, label: "クラスタ基盤 / Talos" }\n    PremisesHome.Nextcloud@{ shape: rectangle, label: "Nextcloud" }\n    PremisesHome.Recording@{ shape: rectangle, label: "録画・配信 / EPGStation・TNLaStation" }\n    subgraph PremisesHome.Apps["`生活サービス / Loockit・Coupon・WOL`"]\n      PremisesHome.Apps.Loockit@{ shape: rectangle, label: "Loockit / BLEスマートロック" }\n      PremisesHome.Apps.Coupon_manager@{ shape: rectangle, label: "Coupon Manager" }\n      PremisesHome.Apps.Wol@{ shape: rectangle, label: "Wake-on-LAN" }\n      PremisesHome.Apps.Annict_scraper@{ shape: rectangle, label: "Annict scraper / 番組照合" }\n      PremisesHome.Apps.Magic_mirror@{ shape: rectangle, label: "MagicMirror / ダッシュボード" }\n    end\n  end\n  PremisesDataDatabases@{ shape: rectangle, label: "DB / アプリ共有基盤" }\n  ExternalAi@{ shape: rectangle, label: "Gemini API / OpenAI互換" }\n  ExternalAnnict@{ shape: rectangle, label: "Annict API" }\n  PremisesDataNasNas02@{ shape: disk, label: "TrueNAS VM69002 / nas-02" }\n  ExternalEdge -. "`nextcloud / 80 / Access`" .-> PremisesHome.Nextcloud\n  PremisesHome.Platform -. "`Nextcloud Pod`" .-> PremisesHome.Nextcloud\n  ExternalEdge -. "`[...]`" .-> PremisesHome.Recording\n  PremisesHome.Platform -. "`録画・配信Pod`" .-> PremisesHome.Recording\n  ExternalEdge -. "`loockit-api / 8080 / mTLS`" .-> PremisesHome.Apps.Loockit\n  ExternalEdge -. "`coupon-manager / 80 / Access`" .-> PremisesHome.Apps.Coupon_manager\n  ExternalEdge -. "`wol / 5000 / Access`" .-> PremisesHome.Apps.Wol\n  PremisesHome.Recording -. "`番組照合`" .-> PremisesHome.Apps.Annict_scraper\n  PremisesHome.Nextcloud -. "`MYSQL_HOST / MariaDB`" .-> PremisesDataDatabases\n  PremisesHome.Recording -. "`[...]`" .-> PremisesDataDatabases\n  PremisesHome.Apps.Coupon_manager -. "`PostgreSQL`" .-> PremisesDataDatabases\n  PremisesHome.Nextcloud -. "`html・data / NFS`" .-> PremisesDataNasNas02\n  PremisesHome.Recording -. "`録画・thumbnail・drop / NFS`" .-> PremisesDataNasNas02\n  PremisesHome.Apps.Coupon_manager -. "`images・Data Protection keys / PVC`" .-> PremisesDataNasNas02\n  PremisesDataDatabases -. "`DB用NFS PVC`" .-> PremisesDataNasNas02\n  PremisesHardwareKiosk -. "`表示`" .-> PremisesHome.Apps.Magic_mirror\n  PremisesHome.Apps.Annict_scraper -. "`Annict API`" .-> ExternalAnnict\n  PremisesHome.Apps.Coupon_manager -. "`AI API`" .-> ExternalAi\n  PremisesHome.Platform -. "`アプリPod / HAProxy・Web・API`" .-> PremisesHome.Apps\n';case`delivery`:return`---
title: "自宅基盤の変更・同期"
---
graph TB
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Management["\`自宅基盤の構成管理\`"]
      Premises.Management.Images@{ shape: rectangle, label: "Image Updater" }
      Premises.Management.Ansible@{ shape: rectangle, label: "Ansible" }
      Premises.Management.Packer@{ shape: rectangle, label: "Packer / VM template" }
      Premises.Management.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
      Premises.Management.Runner@{ shape: rectangle, label: "ARC / 共用のrunner制御基盤" }
      Premises.Management.Tfc_agents@{ shape: rectangle, label: "Terraform Cloud agents / 自宅" }
    end
    Premises.Home@{ shape: rectangle, label: "Talos / home-k8s" }
    subgraph Premises.Hardware["\`物理・ネットワーク\`"]
      Premises.Hardware.Network@{ shape: rectangle, label: "ネットワーク機器" }
    end
  end
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.Github@{ shape: rectangle, label: "GitHub / コード・Actions" }
    External.Terraform_cloud@{ shape: rectangle, label: "Terraform Cloud" }
    External.Github_pages@{ shape: rectangle, label: "GitHub Pages / my-infra図・レビュー" }
    External.Edge@{ shape: rectangle, label: "Cloudflare" }
  end
  External.Github -. "\`GitOps\`" .-> Premises.Management.Argo
  External.Github -. "\`Actions job\`" .-> Premises.Management.Runner
  External.Github -. "\`Terraform実行\`" .-> External.Terraform_cloud
  External.Terraform_cloud -. "\`workspace runを自宅agentで実行\`" .-> Premises.Management.Tfc_agents
  External.Github -. "\`構成図・PR比較を公開\`" .-> External.Github_pages
  Premises.Management.Argo -. "\`manifest同期\`" .-> Premises.Home
  Premises.Management.Runner -. "\`runner Podの作成・削除\`" .-> Premises.Home
  External.Terraform_cloud -. "\`DNS / Access / Tunnel\`" .-> External.Edge
  Premises.Management.Tfc_agents -. "\`VM / ネットワーク\`" .-> Premises.Hardware
  Premises.Management.Ansible -. "\`機器設定\`" .-> Premises.Hardware
  Premises.Management.Packer -. "\`VM template\`" .-> Premises.Hardware
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
    Premises.DataBackups@{ shape: rectangle, label: "バックアップ処理" }
  end
  External.Bws -. "\`Secret注入\`" .-> Premises.HomeEso
  External.Bws -. "\`CI credential\`" .-> External.Github
  External.Bws -. "\`Terraform変数\`" .-> External.Terraform_cloud
  External.Bws -. "\`機器・PBS用credential\`" .-> Premises.ManagementAnsible
  External.Bws -. "\`ESO経由 / backup credential\`" .-> Premises.DataBackups
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
    subgraph Premises.Home["\`Talos / home-k8s\`"]
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
  Premises.Home.Agent.Pdc -. "\`外向きPDC接続\`" .-> External.Grafana
  Premises.Home.Agent.Pdc -. "\`private query / :8428\`" .-> Premises.Home.Agent.Local_store
  Premises.Home.Agent.Exporters -. "\`scrape\`" .-> Premises.Home.Agent.Collector
`;case`coupon`:return`---
title: "Web・API・DB・AI"
---
graph LR
  ExternalEdge@{ shape: rectangle, label: "Cloudflare" }
  PremisesHomeAppsCoupon_managerResources@{ shape: rectangle, label: "リソース定義" }
  PremisesHomeAppsCoupon_managerWeb@{ shape: rectangle, label: "Web / :80" }
  PremisesHomeAppsCoupon_managerApi@{ shape: rectangle, label: "API / :8080" }
  PremisesDataDatabasesPostgres@{ shape: disk, label: "PostgreSQL / 本番・STG" }
  PremisesDataNasNas02@{ shape: disk, label: "TrueNAS VM69002 / nas-02" }
  ExternalAi@{ shape: rectangle, label: "Gemini API / OpenAI互換" }
  ExternalEdge -. "\`coupon-manager / 80 / Access\`" .-> PremisesHomeAppsCoupon_managerWeb
  PremisesHomeAppsCoupon_managerWeb -. "\`内部API\`" .-> PremisesHomeAppsCoupon_managerApi
  PremisesHomeAppsCoupon_managerApi -. "\`PostgreSQL\`" .-> PremisesDataDatabasesPostgres
  PremisesHomeAppsCoupon_managerApi -. "\`AI API\`" .-> ExternalAi
`;case`loockit`:return`---
title: "HAProxy → LXC → Bluetooth"
---
graph LR
  Client@{ icon: "fa:user", shape: rounded, label: "専用クライアント" }
  ExternalEdgeMtls@{ shape: rectangle, label: "mTLS / 専用APIの例外" }
  ExternalEdgeTunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
  PremisesHomeAppsLoockitProxy@{ shape: rectangle, label: "HAProxy / :8080・:50051" }
  PremisesHardwareLoockit_a@{ shape: rectangle, label: "Loockit 01 / CT12902" }
  PremisesHardwareLoockit_b@{ shape: rectangle, label: "Loockit 02 / CT12903" }
  PremisesHardwareBle_a@{ shape: rectangle, label: "x570 BlueZ / Bluetooth" }
  PremisesHardwareBle_b@{ shape: rectangle, label: "b550m BlueZ / Bluetooth" }
  PremisesHomePlatformApi@{ shape: rectangle, label: "Kubernetes API / Lease" }
  Client -. "\`クライアント証明書\`" .-> ExternalEdgeMtls
  ExternalEdgeMtls -. "\`mTLS検証済みのAPIリクエスト\`" .-> ExternalEdgeTunnel
  ExternalEdgeTunnel -. "\`loockit-api / 8080 / mTLS\`" .-> PremisesHomeAppsLoockitProxy
  PremisesHomeAppsLoockitProxy -. "\`readyz / leaderのみ\`" .-> PremisesHardwareLoockit_a
  PremisesHomeAppsLoockitProxy -. "\`readyz / leaderのみ\`" .-> PremisesHardwareLoockit_b
  PremisesHardwareLoockit_a -. "\`read-only D-Bus / org.bluez\`" .-> PremisesHardwareBle_a
  PremisesHardwareLoockit_b -. "\`read-only D-Bus / org.bluez\`" .-> PremisesHardwareBle_b
  PremisesHardwareLoockit_a -. "\`Lease leader election\`" .-> PremisesHomePlatformApi
  PremisesHardwareLoockit_b -. "\`Lease leader election\`" .-> PremisesHomePlatformApi
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
  PremisesDataDatabasesMariadb@{ shape: disk, label: "MariaDB" }
  PremisesDataNasNas02@{ shape: disk, label: "TrueNAS VM69002 / nas-02" }
  ExternalEdge -. "\`nextcloud / 80 / Access\`" .-> PremisesHomeNextcloud.Web
  PremisesHomeNextcloud.Web -. "\`Redis :6379 / locking・cache\`" .-> PremisesHomeNextcloud.Redis
  PremisesHomeNextcloud.Web -. "\`MYSQL_HOST / MariaDB\`" .-> PremisesDataDatabasesMariadb
  PremisesHomeNextcloud.Web -. "\`html・data / NFS\`" .-> PremisesDataNasNas02
`;case`platform`:return`---
title: "Kubernetesの動作と支援サービス"
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
  PremisesManagementArgo@{ shape: rectangle, label: "自宅ArgoCD" }
  PremisesManagementRunner@{ shape: rectangle, label: "ARC / 共用のrunner制御基盤" }
  PremisesHomeDnsCoredns@{ shape: rectangle, label: "CoreDNS / miutaku.internal" }
  PremisesHomeEso@{ shape: rectangle, label: "External Secrets Operator" }
  ExternalPublic_dns@{ shape: rectangle, label: "Public DNS / 1.1.1.1・8.8.8.8" }
  PremisesHomePlatformApi@{ shape: rectangle, label: "Kubernetes API / Lease" }
  PremisesHomePlatformWorker@{ shape: rectangle, label: "home-k8s worker" }
  PremisesHomePlatformCloudflared@{ shape: rectangle, label: "cloudflared / 自宅connector" }
  PremisesHomePlatformCluster_dns@{ shape: rectangle, label: "CoreDNS / cluster.local" }
  ExternalEdge@{ shape: rectangle, label: "Cloudflare" }
  PremisesLanServer@{ shape: rectangle, label: "VLAN20 / 192.168.20.0/24" }
  PremisesHomePlatformDescheduler -. "\`Podのeviction / 配置再調整\`" .-> PremisesHomePlatformApi
  PremisesHomePlatformWorker -. "\`connector Pod\`" .-> PremisesHomePlatformCloudflared
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
  PremisesManagementArgo -. "\`manifest同期 / Kubernetes API\`" .-> PremisesHomePlatformApi
  PremisesManagementRunner -. "\`runner Podの作成・削除\`" .-> PremisesHomePlatformApi
  PremisesHomePlatformCloudflared -. "\`外向きTunnel接続\`" .-> ExternalEdge
  PremisesHomeDnsMetallb -. "\`L2広告 / Service IP .200-.226\`" .-> PremisesLanServer
  ExternalEdge -. "\`private CIDR routes / WARP policy\`" .-> PremisesLanServer
`;case`vlans`:return`---
title: "native・タグ・経路"
---
graph LR
  subgraph Premises["\`自宅\`"]
    Premises.HardwareNetworkSwitch@{ shape: rectangle, label: "US-8-60W / 管理スイッチ" }
    Premises.HardwareNetworkRouter@{ shape: rectangle, label: "IX2215 / ルーター・VLAN間ACL" }
    Premises.HardwareX570Bridge@{ shape: rectangle, label: "enp7s0 / vmbr0" }
    Premises.HardwareB550mBridge@{ shape: rectangle, label: "enp6s0 / vmbr0" }
    Premises.HomeDns@{ shape: rectangle, label: "内部DNS / MetalLB" }
    subgraph Premises.Lan["\`LAN / VLAN・経路\`"]
      Premises.Lan.Native@{ shape: rectangle, label: "native / 192.168.0.0/24" }
      Premises.Lan.Management@{ shape: rectangle, label: "VLAN10 / 192.168.10.0/24" }
      Premises.Lan.Server@{ shape: rectangle, label: "VLAN20 / 192.168.20.0/24" }
      Premises.Lan.Client@{ shape: rectangle, label: "VLAN30 / 192.168.30.0/24" }
      Premises.Lan.Guest@{ shape: rectangle, label: "VLAN31 / guest" }
      Premises.Lan.Iot@{ shape: rectangle, label: "VLAN40 / 192.168.40.0/24" }
    end
  end
  ExternalEdgeWarp@{ shape: rectangle, label: "WARP / private CIDR routes" }
  Premises.HardwareNetworkRouter -. "\`native IF\`" .-> Premises.Lan.Native
  Premises.HardwareNetworkRouter -. "\`BVI10\`" .-> Premises.Lan.Management
  Premises.HardwareNetworkRouter -. "\`BVI20\`" .-> Premises.Lan.Server
  Premises.HardwareNetworkRouter -. "\`BVI30\`" .-> Premises.Lan.Client
  Premises.HardwareNetworkRouter -. "\`BVI31 / 他VLAN拒否\`" .-> Premises.Lan.Guest
  Premises.HardwareNetworkRouter -. "\`BVI4 / tag40\`" .-> Premises.Lan.Iot
  Premises.HardwareX570Bridge -. "\`VM・LXC tag20\`" .-> Premises.Lan.Server
  Premises.HardwareX570Bridge -. "\`Windows VM tag30\`" .-> Premises.Lan.Client
  Premises.HardwareB550mBridge -. "\`VM・LXC tag20\`" .-> Premises.Lan.Server
  Premises.HardwareB550mBridge -. "\`kiosk VM tag40\`" .-> Premises.Lan.Iot
  ExternalEdgeWarp -. "\`private CIDR routes / WARP policy\`" .-> Premises.Lan.Server
  Premises.HomeDns -. "\`L2広告 / Service IP .200-.226\`" .-> Premises.Lan.Server
`;case`pve_b550m`:return`---
title: "VM・LXC・Talos OS"
---
graph TB
  subgraph HomeSite["\`自宅 / Proxmox2ホスト・RPi\`"]
    subgraph HomeSite.B550m["\`pve-b550m\`"]
      HomeSite.B550m.Bluez@{ shape: rectangle, label: "BlueZ / USB Bluetooth" }
      subgraph HomeSite.B550m.Cp2["\`Talos controlplane02 / VM13002\`"]
        HomeSite.B550m.Cp2.Talos@{ shape: rectangle, label: "Talos OS / VLAN20" }
      end
      subgraph HomeSite.B550m.Cp3["\`Talos controlplane03 / VM13003\`"]
        HomeSite.B550m.Cp3.Talos@{ shape: rectangle, label: "Talos OS / VLAN20" }
      end
      subgraph HomeSite.B550m.Worker2["\`Talos worker02 / VM13005\`"]
        HomeSite.B550m.Worker2.Talos@{ shape: rectangle, label: "Talos OS / VLAN20" }
      end
      subgraph HomeSite.B550m.Loockit["\`Loockit 02 / CT12903\`"]
        HomeSite.B550m.Loockit.App@{ shape: rectangle, label: "Docker / Loockit REST・gRPC" }
      end
      subgraph HomeSite.B550m.Tuner["\`Mirakurun STG / CT12904・PX-S1UD\`"]
        HomeSite.B550m.Tuner.App@{ shape: rectangle, label: "Docker / Mirakurun / PX-S1UD" }
      end
      HomeSite.B550m.Nas2@{ shape: disk, label: "TrueNAS VM69002 / nas-02" }
      HomeSite.B550m.Lb@{ shape: rectangle, label: "HAProxy / Keepalived VM10002" }
      HomeSite.B550m.Dev@{ shape: rectangle, label: "開発用Docker / VM40000" }
      HomeSite.B550m.Kiosk@{ shape: rectangle, label: "MagicMirror表示 / VM5000" }
    end
    HomeSite.Talos@{ shape: rectangle, label: "home-k8s" }
    HomeSite.Lan@{ shape: rectangle, label: "LAN / VLAN・経路" }
  end
  HomeSite.B550m.Cp2.Talos -. "\`control-plane / home-k8s所属\`" .-> HomeSite.Talos
  HomeSite.B550m.Cp3.Talos -. "\`control-plane / home-k8s所属\`" .-> HomeSite.Talos
  HomeSite.B550m.Worker2.Talos -. "\`worker / home-k8s所属\`" .-> HomeSite.Talos
  HomeSite.Talos -. "\`[...]\`" .-> HomeSite.B550m.Worker2.Talos
  HomeSite.B550m.Nas2 -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.B550m.Lb -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.B550m.Dev -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.B550m.Kiosk -. "\`vmbr0 / tag 40\`" .-> HomeSite.Lan
  HomeSite.Talos -. "\`L2広告 / Service IP .200-.226\`" .-> HomeSite.Lan
  HomeSite.B550m.Loockit -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.B550m.Cp2 -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.B550m.Cp3 -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.B550m.Worker2 -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.B550m.Tuner -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
`;case`pve_x570`:return`---
title: "VM・LXC・Talos OS"
---
graph TB
  subgraph HomeSite["\`自宅 / Proxmox2ホスト・RPi\`"]
    subgraph HomeSite.X570["\`pve-x570\`"]
      HomeSite.X570.Bluez@{ shape: rectangle, label: "BlueZ / USB Bluetooth" }
      subgraph HomeSite.X570.Cp1["\`Talos controlplane01 / VM13001\`"]
        HomeSite.X570.Cp1.Talos@{ shape: rectangle, label: "Talos OS / VLAN20" }
      end
      subgraph HomeSite.X570.Worker1["\`Talos worker01 / VM13004\`"]
        HomeSite.X570.Worker1.Talos@{ shape: rectangle, label: "Talos OS / VLAN20" }
      end
      subgraph HomeSite.X570.Loockit["\`Loockit 01 / CT12902\`"]
        HomeSite.X570.Loockit.App@{ shape: rectangle, label: "Docker / Loockit REST・gRPC" }
      end
      subgraph HomeSite.X570.Unifi["\`UniFi OS VM13201\`"]
        HomeSite.X570.Unifi.App@{ shape: rectangle, label: "Podman / UniFi OS・Network" }
      end
      subgraph HomeSite.X570.Tuner["\`Mirakurun本番 / CT12901・PT3\`"]
        HomeSite.X570.Tuner.App@{ shape: rectangle, label: "Docker / Mirakurun / PT3" }
      end
      HomeSite.X570.Pbs@{ shape: disk, label: "PBS VM14001" }
      HomeSite.X570.Nas1@{ shape: disk, label: "TrueNAS VM69001 / nas-01" }
      HomeSite.X570.Lb@{ shape: rectangle, label: "HAProxy / Keepalived VM10001" }
      HomeSite.X570.Windows@{ shape: rectangle, label: "Windows / VM60000 / tag30" }
    end
    HomeSite.Talos@{ shape: rectangle, label: "home-k8s" }
    HomeSite.Lan@{ shape: rectangle, label: "LAN / VLAN・経路" }
  end
  HomeSite.X570.Cp1.Talos -. "\`control-plane / home-k8s所属\`" .-> HomeSite.Talos
  HomeSite.X570.Worker1.Talos -. "\`worker / home-k8s所属\`" .-> HomeSite.Talos
  HomeSite.Talos -. "\`[...]\`" .-> HomeSite.X570.Worker1.Talos
  HomeSite.X570.Pbs -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.X570.Nas1 -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.X570.Lb -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.X570.Windows -. "\`vmbr0 / tag 30\`" .-> HomeSite.Lan
  HomeSite.Talos -. "\`L2広告 / Service IP .200-.226\`" .-> HomeSite.Lan
  HomeSite.X570.Loockit -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.X570.Cp1 -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.X570.Worker1 -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
  HomeSite.X570.Unifi -. "\`vmbr0 / native 1\`" .-> HomeSite.Lan
  HomeSite.X570.Tuner -. "\`vmbr0 / tag 20\`" .-> HomeSite.Lan
`;case`network`:return`---
title: "ルーター・SW・AP"
---
graph TB
  ExternalInternet@{ shape: rectangle, label: "Internet" }
  subgraph Premises["\`自宅\`"]
    subgraph Premises.HardwareNetwork["\`ネットワーク機器\`"]
      Premises.HardwareNetwork.Router@{ shape: rectangle, label: "IX2215 / ルーター・VLAN間ACL" }
      Premises.HardwareNetwork.Ethernet@{ shape: rectangle, label: "宅内Ethernet / VLAN trunk" }
      Premises.HardwareNetwork.Switch@{ shape: rectangle, label: "US-8-60W / 管理スイッチ" }
      Premises.HardwareNetwork.Ap@{ shape: rectangle, label: "FS Wi-Fi AP" }
    end
    subgraph Premises.HardwareX570["\`pve-x570 / Proxmox\`"]
      Premises.HardwareX570.Bridge@{ shape: rectangle, label: "enp7s0 / vmbr0" }
    end
    subgraph Premises.HardwareB550m["\`pve-b550m / Proxmox\`"]
      Premises.HardwareB550m.Bridge@{ shape: rectangle, label: "enp6s0 / vmbr0" }
    end
    Premises.HardwareUnifi@{ shape: rectangle, label: "UniFi OS / VM13201" }
    Premises.Lan@{ shape: rectangle, label: "LAN / VLAN・経路" }
  end
  ExternalInternet -. "\`WAN / GigaEthernet0\`" .-> Premises.HardwareNetwork.Router
  Premises.HardwareNetwork.Router -. "\`GigaEthernet2 / native1 + tag10,20,30,31,40\`" .-> Premises.HardwareNetwork.Ethernet
  Premises.HardwareNetwork.Ethernet -. "\`802.1Q / uplink\`" .-> Premises.HardwareNetwork.Switch
  Premises.HardwareNetwork.Ethernet -. "\`AP trunk / 接続ポート未確定\`" .-> Premises.HardwareNetwork.Ap
  Premises.HardwareNetwork.Ethernet -. "\`native1管理 / ゲストtag20・30 / 配線ポート未確定\`" .-> Premises.HardwareX570.Bridge
  Premises.HardwareNetwork.Ethernet -. "\`native1管理 / ゲストtag20・40 / 配線ポート未確定\`" .-> Premises.HardwareB550m.Bridge
  Premises.HardwareNetwork.Switch -. "\`UniFiで管理\`" .-> Premises.HardwareUnifi
  Premises.HardwareNetwork.Router -. "\`[...]\`" .-> Premises.Lan
  Premises.HardwareX570.Bridge -. "\`[...]\`" .-> Premises.Lan
  Premises.HardwareB550m.Bridge -. "\`[...]\`" .-> Premises.Lan
`;case`storage`:return`---
title: "復元元の区別"
---
graph LR
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Home["\`Talos / home-k8s\`"]
      Premises.Home.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
      Premises.Home.Recording@{ shape: rectangle, label: "録画・配信 / EPGStation・TNLaStation" }
      Premises.Home.AgentLocal_store@{ shape: disk, label: "VictoriaMetrics / 自宅" }
    end
    subgraph Premises.Hardware["\`物理・ネットワーク\`"]
      Premises.Hardware.X570@{ shape: rectangle, label: "pve-x570 / Proxmox" }
      Premises.Hardware.B550m@{ shape: rectangle, label: "pve-b550m / Proxmox" }
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
    subgraph Premises.Data["\`保存・バックアップ\`"]
      Premises.Data.Nas@{ shape: disk, label: "TrueNAS VM ×2 / ZFS・NFS" }
    end
    subgraph Premises.Management["\`自宅基盤の構成管理\`"]
      Premises.Management.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
    end
    subgraph Premises.Hardware["\`物理・ネットワーク\`"]
      Premises.Hardware.Network@{ shape: rectangle, label: "ネットワーク機器" }
    end
    Premises.Home@{ shape: rectangle, label: "Talos / home-k8s" }
  end
  User -. "\`HTTPS / 利用時の認証\`" .-> External.Edge.Access
  Operator -. "\`HTTPS / 管理時の認証\`" .-> External.Edge.Access
  Client -. "\`クライアント証明書\`" .-> External.Edge.Mtls
  External.Edge.Access -. "\`Access認証後の転送\`" .-> External.Edge.Tunnel
  External.Edge.Mtls -. "\`mTLS検証済みのAPIリクエスト\`" .-> External.Edge.Tunnel
  External.Edge.Tunnel -. "\`hostname転送\`" .-> External.Edge.Routes.Protected
  External.Edge.Tunnel -. "\`hostname転送\`" .-> External.Edge.Routes.Exceptions
  External.Edge.Routes.Protected -. "\`内部接続\`" .-> Premises.Home
  External.Edge.Routes.Exceptions -. "\`内部接続\`" .-> Premises.Home
  Premises.Home -. "\`外向きTunnel接続\`" .-> External.Edge.Tunnel
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Data.Nas
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Management.Argo
  External.Edge.Tunnel -. "\`hostname転送\`" .-> Consumers.Reventer
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Hardware.Network
`;case`placement`:return'---\ntitle: "PVE → VM → Talos"\n---\ngraph LR\n  subgraph HomeSite["`自宅 / Proxmox2ホスト・RPi`"]\n    HomeSite.Worker_pi1@{ shape: rectangle, label: "RPi / worker03 / VLAN10" }\n    HomeSite.Worker_pi2@{ shape: rectangle, label: "RPi / worker04 / VLAN10" }\n    HomeSite.Network@{ shape: rectangle, label: "ネットワーク機器 / IX2215・SW・AP" }\n    HomeSite.X570@{ shape: rectangle, label: "pve-x570" }\n    HomeSite.B550m@{ shape: rectangle, label: "pve-b550m" }\n    HomeSite.Talos@{ shape: rectangle, label: "home-k8s" }\n    HomeSite.Lan@{ shape: rectangle, label: "LAN / VLAN・経路" }\n  end\n  HomeSite.X570 -. "`[...]`" .-> HomeSite.Talos\n  HomeSite.B550m -. "`[...]`" .-> HomeSite.Talos\n  HomeSite.Worker_pi1 -. "`worker / home-k8s所属`" .-> HomeSite.Talos\n  HomeSite.Worker_pi2 -. "`worker / home-k8s所属`" .-> HomeSite.Talos\n  HomeSite.Talos -. "`[...]`" .-> HomeSite.Worker_pi1\n  HomeSite.Talos -. "`[...]`" .-> HomeSite.Worker_pi2\n  HomeSite.Network -. "`native1管理 / ゲストtag20・30 / 配線ポート未確定`" .-> HomeSite.X570\n  HomeSite.Network -. "`native1管理 / ゲストtag20・40 / 配線ポート未確定`" .-> HomeSite.B550m\n  HomeSite.X570 -. "`[...]`" .-> HomeSite.Lan\n  HomeSite.B550m -. "`[...]`" .-> HomeSite.Lan\n  HomeSite.Talos -. "`L2広告 / Service IP .200-.226`" .-> HomeSite.Lan\n  HomeSite.Network -. "`[...]`" .-> HomeSite.Lan\n';case`recording`:return`---
title: "チューナー・制御・エンコード・保存"
---
graph LR
  ExternalEdge@{ shape: rectangle, label: "Cloudflare" }
  PremisesHomeRecordingEpgstation@{ shape: rectangle, label: "EPGStation" }
  subgraph PremisesHomeRecordingTnlastation["\`TNLaStation / 共通モデル\`"]
    PremisesHomeRecordingTnlastation.Resources@{ shape: rectangle, label: "リソース定義" }
    PremisesHomeRecordingTnlastation.Gateway@{ shape: rectangle, label: "Gateway" }
    PremisesHomeRecordingTnlastation.Frontend@{ shape: rectangle, label: "Frontend" }
    PremisesHomeRecordingTnlastation.Backend@{ shape: rectangle, label: "Backend / API・録画制御" }
    PremisesHomeRecordingTnlastation.Encode@{ shape: rectangle, label: "ffmpeg encode worker" }
    PremisesHomeRecordingTnlastation.Streaming@{ shape: rectangle, label: "ffmpeg streaming worker" }
    PremisesHomeRecordingTnlastation.Mediamtx@{ shape: rectangle, label: "MediaMTX / HLS配信" }
  end
  PremisesHomeRecordingMirakurun@{ shape: rectangle, label: "Mirakurun Service / 本番LXCへの中継" }
  PremisesHomeRecordingMirakurun_staging@{ shape: rectangle, label: "Mirakurun Service / STG LXCへの中継" }
  PremisesDataDatabases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
  PremisesHardwareTuner_stg@{ shape: rectangle, label: "Mirakurun STG / CT12904・PX-S1UD" }
  PremisesDataNasNas02@{ shape: disk, label: "TrueNAS VM69002 / nas-02" }
  PremisesHardwareTuner_prod@{ shape: rectangle, label: "Mirakurun本番 / CT12901・PT3" }
  ExternalEdge -. "\`epgstation / 8888 / Access\`" .-> PremisesHomeRecordingEpgstation
  ExternalEdge -. "\`[...]\`" .-> PremisesHomeRecordingTnlastation.Gateway
  PremisesHomeRecordingTnlastation.Gateway -. "\`Web\`" .-> PremisesHomeRecordingTnlastation.Frontend
  PremisesHomeRecordingTnlastation.Gateway -. "\`API\`" .-> PremisesHomeRecordingTnlastation.Backend
  PremisesHomeRecordingTnlastation.Gateway -. "\`HLS\`" .-> PremisesHomeRecordingTnlastation.Mediamtx
  PremisesHomeRecordingTnlastation.Backend -. "\`encode制御\`" .-> PremisesHomeRecordingTnlastation.Encode
  PremisesHomeRecordingTnlastation.Backend -. "\`streaming制御\`" .-> PremisesHomeRecordingTnlastation.Streaming
  PremisesHomeRecordingTnlastation.Streaming -. "\`配信\`" .-> PremisesHomeRecordingTnlastation.Mediamtx
  PremisesHomeRecordingEpgstation -. "\`tuner API\`" .-> PremisesHomeRecordingMirakurun
  PremisesHomeRecordingTnlastation.Backend -. "\`tuner API\`" .-> PremisesHomeRecordingMirakurun
  PremisesHomeRecordingTnlastation.Backend -. "\`STG環境のチューナーAPI\`" .-> PremisesHomeRecordingMirakurun_staging
  PremisesHomeRecordingMirakurun -. "\`EndpointSlice / 外部LXC\`" .-> PremisesHardwareTuner_prod
  PremisesHomeRecordingMirakurun_staging -. "\`EndpointSlice / 外部LXC\`" .-> PremisesHardwareTuner_stg
  PremisesHardwareTuner_stg -. "\`BS/CS TCP fallback\`" .-> PremisesHardwareTuner_prod
  PremisesHomeRecordingEpgstation -. "\`EPGStation DB\`" .-> PremisesDataDatabases
  PremisesHomeRecordingTnlastation.Backend -. "\`PostgreSQL\`" .-> PremisesDataDatabases
  PremisesHomeRecordingTnlastation.Encode -. "\`encode状態\`" .-> PremisesDataDatabases
  PremisesDataDatabases -. "\`DB用NFS PVC\`" .-> PremisesDataNasNas02
`;case`power`:return'---\ntitle: "UPS・NUTのcross-power"\n---\ngraph LR\n  subgraph PremisesHardwareUps["`UPS / NUT`"]\n    PremisesHardwareUps.Mains@{ shape: rectangle, label: "商用AC" }\n    PremisesHardwareUps.Surge_a@{ shape: rectangle, label: "UPS A / サージのみ口・非backup" }\n    PremisesHardwareUps.Ups_a@{ shape: rectangle, label: "UPS A / APC RS550S 2020" }\n    PremisesHardwareUps.Ups_b@{ shape: rectangle, label: "UPS B / APC RS550S 2025" }\n    PremisesHardwareUps.Pi_a@{ shape: rectangle, label: "NUT Pi .112 / 監視A・給電B" }\n    PremisesHardwareUps.Pi_b@{ shape: rectangle, label: "NUT Pi .113 / 監視B・給電A" }\n  end\n  PremisesHardwareX570@{ shape: rectangle, label: "pve-x570 / Proxmox" }\n  PremisesHardwareB550m@{ shape: rectangle, label: "pve-b550m / Proxmox" }\n  PremisesHardwareUps.Mains -. "`非バックアップ出力`" .-> PremisesHardwareUps.Surge_a\n  PremisesHardwareUps.Mains -. "`AC入力`" .-> PremisesHardwareUps.Ups_a\n  PremisesHardwareUps.Surge_a -. "`UPS BのAC入力`" .-> PremisesHardwareUps.Ups_b\n  PremisesHardwareUps.Ups_a -. "`USB監視 / ups-a`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_a -. "`cross-power / PiBの給電元`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Ups_b -. "`cross-power / PiAの給電元`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_b -. "`USB監視 / ups-b`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Pi_a -. "`ups-b監視 / LOWBATT10%で自身停止`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Pi_b -. "`ups-a監視 / LOWBATT10%で自身停止`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_a -. "`バッテリー給電`" .-> PremisesHardwareX570\n  PremisesHardwareX570 -. "`charge-guard監視 / 80%で自身停止`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_b -. "`バッテリー給電`" .-> PremisesHardwareB550m\n  PremisesHardwareB550m -. "`charge-guard監視 / 80%で自身停止`" .-> PremisesHardwareUps.Pi_b\n';default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};