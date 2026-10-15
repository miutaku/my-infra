var e=e=>{switch(e){case`index`:return`---
title: "インフラ基盤の全体"
---
graph TB
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    subgraph External.Edge["\`Cloudflare\`"]
      External.Edge.Access@{ shape: rectangle, label: "Cloudflare Access / 共通の認証入口" }
      External.Edge.Tunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
    end
    External.Bws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
  end
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Data["\`保存・バックアップ\`"]
      Premises.Data.Nas@{ shape: disk, label: "TrueNAS VM ×2 / ZFS・NFS" }
    end
    subgraph Premises.Management["\`自宅基盤の構成管理\`"]
      Premises.Management.Runner@{ shape: rectangle, label: "ARC / 共用のrunner制御基盤" }
      Premises.Management.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
    end
    Premises.Home@{ shape: rectangle, label: "Talos / home-k8s" }
  end
  subgraph Consumers["\`基盤の利用側 / 別リポジトリ\`"]
    Consumers.Reventer@{ shape: rectangle, label: "Re:Venter" }
  end
  User -. "\`HTTPS / 利用時の認証\`" .-> External.Edge.Access
  Operator -. "\`HTTPS / 管理時の認証\`" .-> External.Edge.Access
  External.Edge.Access -. "\`Access認証後の転送\`" .-> External.Edge.Tunnel
  External.Edge.Tunnel -. "\`Access認証後 / 公開UI・サービス\`" .-> Premises.Home
  External.Bws -. "\`Secret注入\`" .-> Premises.Home
  External.Edge.Tunnel -. "\`Access認証後 / NAS管理UI\`" .-> Premises.Data.Nas
  Premises.Data.Nas -. "\`NFSストレージを提供\`" .-> Premises.Home
  External.Edge.Tunnel -. "\`Access認証後 / 管理UI\`" .-> Premises.Management.Argo
  Premises.Management.Argo -. "\`共用ArgoCDの同期インターフェース\`" .-> Consumers.Reventer
  Premises.Management.Runner -. "\`専用runner向けの共用制御基盤\`" .-> Consumers.Reventer
`;case`home_apps`:return`---
title: "自宅基盤・利用するサービス"
---
graph LR
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  ExternalEdgeAccess@{ shape: rectangle, label: "Cloudflare Access / 共通の認証入口" }
  ExternalEdgeTunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
  subgraph PremisesHome["\`Talos / home-k8s\`"]
    PremisesHome.Dns@{ shape: rectangle, label: "内部DNS / MetalLB" }
    PremisesHome.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
    PremisesHome.Recording@{ shape: rectangle, label: "録画・配信" }
    PremisesHome.Apps@{ shape: rectangle, label: "自宅ワークロード / 基盤の利用側" }
  end
  PremisesManagementArgo@{ shape: rectangle, label: "自宅ArgoCD" }
  PremisesDataDatabases@{ shape: rectangle, label: "DB / アプリ共有基盤" }
  PremisesDataNas@{ shape: disk, label: "TrueNAS VM ×2 / ZFS・NFS" }
  User -. "\`HTTPS / 利用時の認証\`" .-> ExternalEdgeAccess
  Operator -. "\`HTTPS / 管理時の認証\`" .-> ExternalEdgeAccess
  ExternalEdgeAccess -. "\`Access認証後の転送\`" .-> ExternalEdgeTunnel
  ExternalEdgeTunnel -. "\`Access認証後 / 公開UI・サービス\`" .-> PremisesHome.Nextcloud
  ExternalEdgeTunnel -. "\`Access認証後 / 公開UI・サービス\`" .-> PremisesHome.Recording
  ExternalEdgeTunnel -. "\`Access認証後 / 公開UI・サービス\`" .-> PremisesHome.Apps
  ExternalEdgeTunnel -. "\`Access認証後 / NAS管理UI\`" .-> PremisesDataNas
  PremisesHome.Nextcloud -. "\`html・data / NFS\`" .-> PremisesDataNas
  PremisesHome.Recording -. "\`録画・thumbnail・drop / NFS\`" .-> PremisesDataNas
  PremisesHome.Apps -. "\`images・Data Protection keys / PVC\`" .-> PremisesDataNas
  PremisesHome.Nextcloud -. "\`MYSQL_HOST / MariaDB\`" .-> PremisesDataDatabases
  PremisesHome.Recording -. "\`[...]\`" .-> PremisesDataDatabases
  PremisesHome.Apps -. "\`PostgreSQL\`" .-> PremisesDataDatabases
  PremisesDataDatabases -. "\`DB用NFS PVC\`" .-> PremisesDataNas
  ExternalEdgeTunnel -. "\`Access認証後 / 管理UI\`" .-> PremisesManagementArgo
`;case`delivery`:return`---
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
    Premises.Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
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
  Premises.Management.Tfc_agents -. "\`VM / ネットワーク\`" .-> Premises.Hardware
  Premises.Management.Ansible -. "\`機器設定\`" .-> Premises.Hardware
  Premises.Management.Packer -. "\`VM template\`" .-> Premises.Hardware
  External.Terraform_cloud -. "\`DNS / Access / Tunnel\`" .-> External.Edge
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
`;case`network`:return`---
title: "LAN・WARP"
---
graph LR
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph External["\`外部サービス / SaaS・公開サービス\`"]
    External.EdgeWarp@{ shape: rectangle, label: "WARP / private CIDR routes" }
  end
  subgraph Premises["\`自宅\`"]
    subgraph Premises.Hardware["\`物理・ネットワーク\`"]
      Premises.Hardware.Router@{ shape: rectangle, label: "IX2215 / VLAN" }
      Premises.Hardware.Wifi@{ shape: rectangle, label: "Wi-Fi AP" }
      Premises.Hardware.Unifi@{ shape: rectangle, label: "UniFi OS Server" }
      Premises.Hardware.Lb@{ shape: rectangle, label: "HAProxy / Keepalived ×2" }
    end
    subgraph Premises.Lan["\`LAN / VLAN・経路\`"]
      Premises.Lan.Server@{ shape: rectangle, label: "VLAN20 / 192.168.20.0/24" }
      Premises.Lan.Native@{ shape: rectangle, label: "native / 192.168.0.0/24" }
      Premises.Lan.Management@{ shape: rectangle, label: "VLAN10 / 192.168.10.0/24" }
      Premises.Lan.Client@{ shape: rectangle, label: "VLAN30 / 192.168.30.0/24" }
      Premises.Lan.Guest@{ shape: rectangle, label: "VLAN31 / guest" }
      Premises.Lan.Iot@{ shape: rectangle, label: "VLAN40 / 192.168.40.0/24" }
    end
    subgraph Premises.HomeDns["\`内部DNS / MetalLB\`"]
      Premises.HomeDns.Coredns@{ shape: rectangle, label: "CoreDNS / miutaku.internal" }
      Premises.HomeDns.Metallb@{ shape: rectangle, label: "MetalLB / LANのService IP" }
    end
  end
  External.EdgeWarp -. "\`private CIDR routes / WARP policy\`" .-> Premises.Lan.Server
  Premises.Hardware.Router -. "\`native IF\`" .-> Premises.Lan.Native
  Premises.Hardware.Router -. "\`BVI10\`" .-> Premises.Lan.Management
  Premises.Hardware.Router -. "\`BVI20\`" .-> Premises.Lan.Server
  Premises.Hardware.Router -. "\`BVI30\`" .-> Premises.Lan.Client
  Premises.Hardware.Router -. "\`BVI31 / 他VLAN拒否\`" .-> Premises.Lan.Guest
  Premises.Hardware.Router -. "\`BVI40\`" .-> Premises.Lan.Iot
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
    Premises.Home@{ shape: rectangle, label: "Talos / home-k8s" }
    Premises.Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
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
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Hardware
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Data.Nas
  External.Edge.Routes.Protected -. "\`認証後の内部接続\`" .-> Premises.Management.Argo
  External.Edge.Tunnel -. "\`hostname転送\`" .-> Consumers.Reventer
`;case`placement`:return`---
title: "管理範囲"
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
`;case`power`:return'---\ntitle: "UPS・NUTのcross-power"\n---\ngraph LR\n  subgraph PremisesHardwareUps["`UPS / NUT`"]\n    PremisesHardwareUps.Mains@{ shape: rectangle, label: "商用AC" }\n    PremisesHardwareUps.Surge_a@{ shape: rectangle, label: "UPS A / サージのみ口・非backup" }\n    PremisesHardwareUps.Ups_a@{ shape: rectangle, label: "UPS A / APC RS550S 2020" }\n    PremisesHardwareUps.Ups_b@{ shape: rectangle, label: "UPS B / APC RS550S 2025" }\n    PremisesHardwareUps.Pi_a@{ shape: rectangle, label: "NUT Pi .112 / 監視A・給電B" }\n    PremisesHardwareUps.Pi_b@{ shape: rectangle, label: "NUT Pi .113 / 監視B・給電A" }\n  end\n  PremisesHardwareX570@{ shape: rectangle, label: "Proxmox / x570" }\n  PremisesHardwareB550m@{ shape: rectangle, label: "Proxmox / b550m" }\n  PremisesHardwareUps.Mains -. "`非バックアップ出力`" .-> PremisesHardwareUps.Surge_a\n  PremisesHardwareUps.Mains -. "`AC入力`" .-> PremisesHardwareUps.Ups_a\n  PremisesHardwareUps.Surge_a -. "`UPS BのAC入力`" .-> PremisesHardwareUps.Ups_b\n  PremisesHardwareUps.Ups_a -. "`USB監視 / ups-a`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_a -. "`cross-power / PiBの給電元`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Ups_b -. "`cross-power / PiAの給電元`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_b -. "`USB監視 / ups-b`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Pi_a -. "`ups-b監視 / LOWBATT10%で自身停止`" .-> PremisesHardwareUps.Pi_b\n  PremisesHardwareUps.Pi_b -. "`ups-a監視 / LOWBATT10%で自身停止`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_a -. "`バッテリー給電`" .-> PremisesHardwareX570\n  PremisesHardwareX570 -. "`charge-guard監視 / 80%で自身停止`" .-> PremisesHardwareUps.Pi_a\n  PremisesHardwareUps.Ups_b -. "`バッテリー給電`" .-> PremisesHardwareB550m\n  PremisesHardwareB550m -. "`charge-guard監視 / 80%で自身停止`" .-> PremisesHardwareUps.Pi_b\n';default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};