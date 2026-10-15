var e=e=>{switch(e){case`index`:return`direction: down

Operator: {
  label: "管理者"
  shape: c4-person
}
Premises: {
  label: "自宅"

  Home: {
    label: "Talos / home-k8s"

    Agent: {
      label: "自宅監視基盤"
    }
    Nextcloud: {
      label: "Nextcloud"
    }
    Eso: {
      label: "External Secrets Operator"
    }
  }
  Data: {
    label: "保存・バックアップ"

    Pbs: {
      label: "Proxmox Backup Server"
      shape: stored_data
    }
    Nas: {
      label: "TrueNAS VM ×2 / ZFS・NFS"
      shape: stored_data
    }
    Backups: {
      label: "バックアップ処理"
    }
  }
}
Monitoring: {
  label: "監視"

  Vms: {
    label: "OCI監視VM / STG・PRD"
    shape: stored_data
  }
}
User: {
  label: "利用者"
  shape: c4-person
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Edge: {
    label: "Cloudflare"

    Tunnel: {
      label: "Cloudflare Tunnel"
    }
    Access: {
      label: "Access / 認証"
    }
  }
  Bws: {
    label: "Bitwarden Secrets Manager"
  }
  Grafana: {
    label: "Grafana Cloud / PDC"
  }
  Idrive: {
    label: "IDrive e2 / S3"
    shape: stored_data
  }
}
Control: {
  label: "変更・運用"

  Argo: {
    label: "自宅ArgoCD"
  }
}
Oke: {
  label: "OCI / STG OKE共通基盤"
}

Operator -> External.Edge.Access: "管理認証"
External.Edge.Tunnel -> Premises.Home.Nextcloud: "公開hostname / 内部HTTP"
External.Edge.Access -> Control.Argo: "Tunnel / 管理UI"
External.Edge.Tunnel -> Control.Argo: "Access後 / 管理UI"
External.Bws -> Premises.Home.Eso: "Secret注入"
External.Bws -> Oke: "Secret注入"
Operator -> External.Grafana: "照会"
Premises.Home.Agent -> External.Grafana: "外向きPDC接続"
Monitoring.Vms -> External.Grafana: "VM側PDC agentから外向き接続"
External.Grafana -> Premises.Home.Agent: "PDC経由の検索"
External.Grafana -> Monitoring.Vms: "PDC経由"
Premises.Home.Nextcloud -> Premises.Data.Nas: "html・data / NFS"
Premises.Home.Agent -> Premises.Data.Nas: "metrics用NFS PVC"
Premises.Home.Agent -> Premises.Data.Backups: "snapshot / vmbackup"
External.Bws -> Premises.Data.Backups: "ESO経由 / backup credential"
Premises.Data.Nas -> Premises.Data.Backups: "対象dataset / restic"
Premises.Data.Pbs -> External.Idrive: "S3 datastore / VM backup"
Premises.Data.Backups -> External.Idrive: "用途別prefix / 暗号化・retention"
User -> External.Edge: "HTTPS"
`;case`home_apps`:return`direction: right

User: {
  label: "利用者"
  shape: c4-person
}
ExternalEdge: {
  label: "Cloudflare"
}
PremisesHome: {
  label: "Talos / home-k8s"

  Nextcloud: {
    label: "Nextcloud"
  }
  Recording: {
    label: "録画・配信"
  }
  Apps: {
    label: "宅内アプリ"

    Coupon_manager: {
      label: "Coupon Manager"
    }
    Loockit: {
      label: "Loockit"
    }
    Annict_scraper: {
      label: "Annict scraper"
    }
    Magic_mirror: {
      label: "MagicMirror"
    }
    Wol: {
      label: "Wake-on-LAN"
    }
  }
  Dns: {
    label: "内部DNS / MetalLB"
  }
}
PremisesData: {
  label: "保存・バックアップ"

  Databases: {
    label: "DB / アプリ共有基盤"
  }
  Nas: {
    label: "TrueNAS VM ×2 / ZFS・NFS"
    shape: stored_data
  }
}

User -> ExternalEdge: "HTTPS"
ExternalEdge -> PremisesHome.Nextcloud: "公開hostname / 内部HTTP"
ExternalEdge -> PremisesHome.Recording: "公開hostname / 内部HTTP"
ExternalEdge -> PremisesHome.Apps.Coupon_manager: "公開hostname / 内部HTTP"
ExternalEdge -> PremisesHome.Apps.Loockit: "内部接続"
PremisesHome.Recording -> PremisesHome.Apps.Annict_scraper: "番組照合"
PremisesHome.Nextcloud -> PremisesData.Nas: "html・data / NFS"
PremisesHome.Recording -> PremisesData.Nas: "録画・thumbnail・drop / NFS"
PremisesHome.Apps.Coupon_manager -> PremisesData.Nas: "images・Data Protection keys / PVC"
PremisesHome.Nextcloud -> PremisesData.Databases: "MYSQL_HOST / MariaDB"
PremisesHome.Recording -> PremisesData.Databases: "[...]"
PremisesHome.Apps.Coupon_manager -> PremisesData.Databases: "PostgreSQL"
PremisesData.Databases -> PremisesData.Nas: "DB用NFS PVC"
`;case`delivery`:return`direction: down

Control: {
  label: "変更・運用"

  Reviews: {
    label: "Re:Venterの一時レビュー"
  }
  Images: {
    label: "Image Updater"
  }
  Runner: {
    label: "ARC / 専用runner"
  }
  Argo: {
    label: "自宅ArgoCD"
  }
  Tfc_agents: {
    label: "Terraform Cloud agents / 自宅"
  }
  Packer: {
    label: "Packer / VM template"
  }
  Ansible: {
    label: "Ansible"
  }
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Github: {
    label: "GitHub / コード・Actions"
  }
  Terraform_cloud: {
    label: "Terraform Cloud"
  }
  Edge: {
    label: "Cloudflare"
  }
}
Monitoring: {
  label: "監視"

  Vms: {
    label: "OCI監視VM / STG・PRD"
    shape: stored_data
  }
}
Oke: {
  label: "OCI / STG OKE共通基盤"

  Argo: {
    label: "OKE ArgoCD"
  }
  Scale: {
    label: "Cluster Autoscaler"
  }
  Api: {
    label: "OKE API / Node pools"
  }
}
Reventer: {
  label: "Re:Venter / STG・PRD"
}
Premises: {
  label: "自宅"

  Home: {
    label: "Talos / home-k8s"
  }
  Hardware: {
    label: "物理・ネットワーク"
  }
}

External.Github -> Control.Runner: "Actions job"
External.Github -> Control.Argo: "GitOps"
External.Github -> External.Terraform_cloud: "Terraform実行"
External.Terraform_cloud -> Control.Tfc_agents: "workspace runを自宅agentで実行"
Control.Argo -> Premises.Home: "manifest同期"
External.Github -> Oke.Argo: "GitOps"
Oke.Argo -> Oke.Api: "共通基盤同期"
Oke.Scale -> Oke.Api: "burst pool増減"
Control.Argo -> Reventer: "STG・PRDアプリ同期"
Control.Tfc_agents -> Premises.Hardware: "VM / ネットワーク"
Control.Packer -> Premises.Hardware: "VM template"
Control.Ansible -> Premises.Hardware: "機器設定"
External.Terraform_cloud -> External.Edge: "DNS / Access / Tunnel"
External.Terraform_cloud -> Monitoring.Vms: "監視VM"
External.Terraform_cloud -> Oke: "OCI / OKE"
`;case`secrets`:return`direction: right

External: {
  label: "外部サービス / SaaS・公開サービス"

  Bws: {
    label: "Bitwarden Secrets Manager"
  }
  Github: {
    label: "GitHub / コード・Actions"
  }
  Terraform_cloud: {
    label: "Terraform Cloud"
  }
}
Premises: {
  label: "自宅"

  Home: {
    label: "Talos / home-k8s"

    Eso: {
      label: "External Secrets Operator"
    }
  }
  Data: {
    label: "保存・バックアップ"

    Backups: {
      label: "バックアップ処理"
    }
  }
}
Oke: {
  label: "OCI / STG OKE共通基盤"

  Eso: {
    label: "External Secrets Operator"
  }
}
Reventer: {
  label: "Re:Venter / STG・PRD"

  PlatformExternal_secrets: {
    label: "ESO / PRD共通基盤"
  }
}
Control: {
  label: "変更・運用"

  Ansible: {
    label: "Ansible"
  }
}

External.Bws -> Premises.Home.Eso: "Secret注入"
External.Bws -> Oke.Eso: "Secret注入"
External.Bws -> Reventer.PlatformExternal_secrets: "ESO / PRD Secret注入"
External.Bws -> External.Github: "CI credential"
External.Bws -> External.Terraform_cloud: "Terraform変数"
External.Bws -> Control.Ansible: "機器・PBS用credential"
External.Bws -> Premises.Data.Backups: "ESO経由 / backup credential"
`;case`observability`:return`direction: right

Operator: {
  label: "管理者"
  shape: c4-person
}
Reventer: {
  label: "Re:Venter / STG・PRD"

  Collectors: {
    label: "STG・PRD監視collector"
  }
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Grafana: {
    label: "Grafana Cloud / PDC"
  }
}
Premises: {
  label: "自宅"

  Hardware: {
    label: "物理・ネットワーク"
  }
  Home: {
    label: "Talos / home-k8s"

    Agent: {
      label: "自宅監視基盤"

      Exporters: {
        label: "exporter群"
      }
      Pdc: {
        label: "PDC agent / 自宅"
      }
      Collector: {
        label: "vmagent / scrape・remoteWrite"
      }
      Local_store: {
        label: "VictoriaMetrics / 自宅"
        shape: stored_data
      }
    }
  }
}
Monitoring: {
  label: "監視"

  Vms: {
    label: "OCI監視VM / STG・PRD"
    shape: stored_data
  }
}

Operator -> External.Grafana: "照会"
Premises.Hardware -> Premises.Home.Agent.Collector: "exporter収集"
Premises.Home.Agent.Collector -> Premises.Home.Agent.Local_store: "remoteWrite / :8428"
External.Grafana -> Premises.Home.Agent.Pdc: "PDC経由の検索"
Premises.Home.Agent.Pdc -> External.Grafana: "外向きPDC接続"
Premises.Home.Agent.Pdc -> Premises.Home.Agent.Local_store: "private query / :8428"
Premises.Home.Agent.Exporters -> Premises.Home.Agent.Collector: "scrape"
External.Grafana -> Monitoring.Vms: "PDC経由"
Reventer.Collectors -> Monitoring.Vms: "[...]"
Monitoring.Vms -> External.Grafana: "VM側PDC agentから外向き接続"
`;case`network`:return`direction: right

Operator: {
  label: "管理者"
  shape: c4-person
}
Premises: {
  label: "自宅"

  Hardware: {
    label: "物理・ネットワーク"

    Lb: {
      label: "HAProxy / Keepalived ×2"
    }
    Router: {
      label: "IX2215 / VLAN"
    }
    Wifi: {
      label: "Wi-Fi AP"
    }
    Unifi: {
      label: "UniFi OS Server"
    }
  }
  Home: {
    label: "Talos / home-k8s"

    Dns: {
      label: "内部DNS / MetalLB"

      Coredns: {
        label: "CoreDNS / miutaku.internal"
      }
      Metallb: {
        label: "MetalLB / LANのService IP"
      }
    }
    PlatformCloudflared: {
      label: "cloudflared / 自宅connector"
    }
  }
  Lan: {
    label: "LAN / VLAN・経路"

    Server: {
      label: "VLAN20 / 192.168.20.0/24"
    }
    Native: {
      label: "native / 192.168.0.0/24"
    }
    Management: {
      label: "VLAN10 / 192.168.10.0/24"
    }
    Client: {
      label: "VLAN30 / 192.168.30.0/24"
    }
    Guest: {
      label: "VLAN31 / guest"
    }
    Iot: {
      label: "VLAN40 / 192.168.40.0/24"
    }
  }
}
Oke: {
  label: "OCI / STG OKE共通基盤"

  Workers: {
    label: "base / burst node pool"
  }
  Network: {
    label: "OCI network"

    Private_workers: {
      label: "private worker subnet"
    }
    Nat: {
      label: "NAT gateway / reserved IP"
    }
    Service_gateway: {
      label: "Service Gateway / Oracle Services"
    }
    Igw: {
      label: "Internet gateway"
    }
    Public_api: {
      label: "公開API・LB subnet"
    }
  }
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Edge: {
    label: "Cloudflare"

    Warp: {
      label: "WARP / private CIDR routes"
    }
    Access: {
      label: "Access / 認証"
    }
    Tunnel: {
      label: "Cloudflare Tunnel"
    }
    Routes: {
      label: "公開hostname / 設定から抽出"
    }
  }
  Internet: {
    label: "Internet"
  }
  Oracle: {
    label: "Oracle Services Network"
  }
}

Operator -> External.Edge.Access: "管理認証"
External.Edge.Tunnel -> External.Edge.Routes: "hostname転送"
External.Edge.Access -> External.Edge.Routes: "Access policy"
External.Edge.Warp -> Premises.Lan.Server: "private CIDR routes / WARP policy"
External.Edge.Routes -> Premises.Hardware.Router: "認証後の内部接続"
Premises.Hardware.Router -> Premises.Lan.Native: "native IF"
Premises.Hardware.Router -> Premises.Lan.Management: "BVI10"
Premises.Hardware.Router -> Premises.Lan.Server: "BVI20"
Premises.Hardware.Router -> Premises.Lan.Client: "BVI30"
Premises.Hardware.Router -> Premises.Lan.Guest: "BVI31 / 他VLAN拒否"
Premises.Hardware.Router -> Premises.Lan.Iot: "BVI40"
External.Edge.Routes -> Premises.Hardware.Wifi: "認証後の内部接続"
External.Edge.Routes -> Premises.Hardware.Unifi: "認証後の内部接続"
Premises.Home.PlatformCloudflared -> External.Edge.Tunnel: "外向きTunnel接続"
Oke.Workers -> Oke.Network.Private_workers: "private subnet / 10.0.2.0/24"
Oke.Network.Igw -> Oke.Network.Public_api: "public route table"
Oke.Network.Private_workers -> Oke.Network.Nat: "default route"
Oke.Network.Private_workers -> Oke.Network.Service_gateway: "Oracle service CIDR route"
Oke.Network.Nat -> External.Internet: "NAT / reserved IPv4"
External.Internet -> Oke.Network.Igw: "公開API・LBへの到達"
Oke.Network.Service_gateway -> External.Oracle: "Oracle Services Network"
Premises.Hardware.Router -> Premises.Home.Dns: "LAN / 内部DNS"
`;case`storage`:return`direction: right

Premises: {
  label: "自宅"

  Home: {
    label: "Talos / home-k8s"

    Nextcloud: {
      label: "Nextcloud"
    }
    Recording: {
      label: "録画・配信"
    }
    AgentLocal_store: {
      label: "VictoriaMetrics / 自宅"
      shape: stored_data
    }
  }
  Hardware: {
    label: "物理・ネットワーク"

    X570: {
      label: "Proxmox / x570"
    }
    B550m: {
      label: "Proxmox / b550m"
    }
  }
  Data: {
    label: "保存・バックアップ"

    Databases: {
      label: "DB / アプリ共有基盤"

      Mariadb: {
        label: "MariaDB"
        shape: stored_data
      }
      Postgres: {
        label: "PostgreSQL / 本番・STG"
        shape: stored_data
      }
    }
    Backups: {
      label: "バックアップ処理"

      Db: {
        label: "DB logical dump / 自宅Talos CronJob"
      }
      Recordings: {
        label: "録画 / 自宅Talos CronJob"
      }
      Metrics: {
        label: "metrics snapshot / 自宅Talos CronJob"
      }
      Nas: {
        label: "NAS restic / 自宅Talos CronJob"
      }
    }
    Shared: {
      label: "共有PV / runner cache・状態"
    }
    Pbs: {
      label: "Proxmox Backup Server"
      shape: stored_data
    }
    Nas: {
      label: "TrueNAS VM ×2 / ZFS・NFS"
      shape: stored_data

      Nas02: {
        label: "TrueNAS VM69002 / nas-02"
        shape: stored_data
      }
      Nas01: {
        label: "TrueNAS VM69001 / nas-01"
        shape: stored_data
      }
    }
  }
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Idrive: {
    label: "IDrive e2 / S3"
    shape: stored_data
  }
}

Premises.Home.Nextcloud -> Premises.Data.Nas.Nas02: "html・data / NFS"
Premises.Home.Recording -> Premises.Data.Nas.Nas02: "録画・thumbnail・drop / NFS"
Premises.Home.AgentLocal_store -> Premises.Data.Nas.Nas02: "metrics用NFS PVC"
Premises.Home.Nextcloud -> Premises.Data.Databases.Mariadb: "MYSQL_HOST / MariaDB"
Premises.Home.Recording -> Premises.Data.Databases.Mariadb: "EPGStation DB"
Premises.Home.Recording -> Premises.Data.Databases.Postgres: "[...]"
Premises.Data.Shared -> Premises.Data.Nas.Nas01: "runner cache / NFS"
Premises.Home.Recording -> Premises.Data.Backups.Recordings: "録画ファイル専用job"
Premises.Home.AgentLocal_store -> Premises.Data.Backups.Metrics: "snapshot / vmbackup"
Premises.Data.Nas.Nas02 -> Premises.Data.Backups.Nas: "対象dataset / restic"
Premises.Data.Pbs -> External.Idrive: "S3 datastore / VM backup"
Premises.Hardware.X570 -> Premises.Data.Pbs: "VM backup"
Premises.Hardware.B550m -> Premises.Data.Pbs: "VM backup"
Premises.Data.Databases -> Premises.Data.Nas.Nas02: "DB用NFS PVC"
Premises.Data.Databases -> Premises.Data.Backups.Db: "整合性あるlogical dump"
Premises.Data.Backups -> External.Idrive: "用途別prefix / 暗号化・retention"
`;case`placement`:return`direction: down

HomeSite: {
  label: "自宅 / Proxmox2ホスト・RPi"

  X570: {
    label: "pve-x570"

    Nas1: {
      label: "TrueNAS VM69001 / nas-01"
      shape: stored_data
    }
    Pbs: {
      label: "PBS VM14001 / 手動退避"
      shape: stored_data
    }
  }
  B550m: {
    label: "pve-b550m"

    Nas2: {
      label: "TrueNAS VM69002 / nas-02"
      shape: stored_data
    }
  }
  Talos: {
    label: "home-k8s"
  }
}
Stg: {
  label: "OCI / STG OKE共通基盤"
}
Prd: {
  label: "PRD OKE / 本体reventer所有・共通アドオンmy-infra"
}
`;case`media`:return`direction: right

PremisesHomeRecording: {
  label: "録画・配信"

  Epgstation: {
    label: "EPGStation"
  }
  Annict_sync: {
    label: "Annict録画同期 / CronJob"
  }
  Mirakurun_staging: {
    label: "Mirakurun Service / STG LXCへの中継"
  }
  Tnlastation: {
    label: "TNLaStation / 共通モデル"

    Gateway: {
      label: "Gateway"
    }
    Frontend: {
      label: "Frontend"
    }
    Backend: {
      label: "Backend / API・録画制御"
    }
    Encode: {
      label: "ffmpeg encode worker"
    }
    Streaming: {
      label: "ffmpeg streaming worker"
    }
    Mediamtx: {
      label: "MediaMTX / HLS配信"
    }
  }
  Mirakurun: {
    label: "Mirakurun Service / 本番LXCへの中継"
  }
}
PremisesHomeAppsAnnict_scraper: {
  label: "Annict scraper"
}
PremisesHardwareTuner_stg: {
  label: "Mirakurun STG LXC / CT12904・PX-S1UD"
}
ExternalAnnict: {
  label: "Annict API"
}
PremisesHardwareTuner_prod: {
  label: "Mirakurun LXC / CT12901・PT3"
}
PremisesDataDatabases: {
  label: "DB / アプリ共有基盤"
}
PremisesDataNas: {
  label: "TrueNAS VM ×2 / ZFS・NFS"
  shape: stored_data
}

PremisesHomeRecording.Epgstation -> PremisesHomeRecording.Mirakurun: "tuner API"
PremisesHomeRecording.Annict_sync -> PremisesHomeRecording.Tnlastation.Backend: "録画登録API"
PremisesHomeRecording.Tnlastation.Backend -> PremisesHomeRecording.Mirakurun: "tuner API"
PremisesHomeRecording.Tnlastation.Gateway -> PremisesHomeRecording.Tnlastation.Frontend: "Web"
PremisesHomeRecording.Tnlastation.Gateway -> PremisesHomeRecording.Tnlastation.Backend: "API"
PremisesHomeRecording.Tnlastation.Gateway -> PremisesHomeRecording.Tnlastation.Mediamtx: "HLS"
PremisesHomeRecording.Tnlastation.Backend -> PremisesHomeRecording.Tnlastation.Encode: "encode制御"
PremisesHomeRecording.Tnlastation.Backend -> PremisesHomeRecording.Tnlastation.Streaming: "streaming制御"
PremisesHomeRecording.Tnlastation.Streaming -> PremisesHomeRecording.Tnlastation.Mediamtx: "配信"
PremisesHomeRecording.Mirakurun -> PremisesHardwareTuner_prod: "EndpointSlice / 外部LXC"
PremisesHomeRecording.Mirakurun_staging -> PremisesHardwareTuner_stg: "EndpointSlice / 外部LXC"
PremisesHardwareTuner_stg -> PremisesHardwareTuner_prod: "BS/CS TCP fallback"
PremisesHomeRecording.Annict_sync -> PremisesHomeAppsAnnict_scraper: "番組照合"
PremisesHomeAppsAnnict_scraper -> ExternalAnnict: "Annict API"
PremisesHomeRecording.Epgstation -> PremisesDataDatabases: "EPGStation DB"
PremisesHomeRecording.Tnlastation.Backend -> PremisesDataDatabases: "PostgreSQL"
PremisesHomeRecording.Tnlastation.Encode -> PremisesDataDatabases: "encode状態"
PremisesDataDatabases -> PremisesDataNas: "DB用NFS PVC"
PremisesHomeRecording -> PremisesDataNas: "録画・thumbnail・drop / NFS"
`;case`power`:return`direction: right

PremisesHardwareUps: {
  label: "UPS / NUT"

  Mains: {
    label: "商用AC"
  }
  Surge_a: {
    label: "UPS A / サージのみ口・非backup"
  }
  Ups_a: {
    label: "UPS A / APC RS550S 2020"
  }
  Ups_b: {
    label: "UPS B / APC RS550S 2025"
  }
  Pi_a: {
    label: "NUT Pi .112 / 監視A・給電B"
  }
  Pi_b: {
    label: "NUT Pi .113 / 監視B・給電A"
  }
}
PremisesHardwareX570: {
  label: "Proxmox / x570"
}
PremisesHardwareB550m: {
  label: "Proxmox / b550m"
}

PremisesHardwareUps.Mains -> PremisesHardwareUps.Surge_a: "非バックアップ出力"
PremisesHardwareUps.Mains -> PremisesHardwareUps.Ups_a: "AC入力"
PremisesHardwareUps.Surge_a -> PremisesHardwareUps.Ups_b: "UPS BのAC入力"
PremisesHardwareUps.Ups_a -> PremisesHardwareUps.Pi_a: "USB監視 / ups-a"
PremisesHardwareUps.Ups_a -> PremisesHardwareUps.Pi_b: "cross-power / PiBの給電元"
PremisesHardwareUps.Ups_b -> PremisesHardwareUps.Pi_a: "cross-power / PiAの給電元"
PremisesHardwareUps.Ups_b -> PremisesHardwareUps.Pi_b: "USB監視 / ups-b"
PremisesHardwareUps.Pi_a -> PremisesHardwareUps.Pi_b: "ups-b監視 / LOWBATT10%で自身停止"
PremisesHardwareUps.Pi_b -> PremisesHardwareUps.Pi_a: "ups-a監視 / LOWBATT10%で自身停止"
PremisesHardwareUps.Ups_a -> PremisesHardwareX570: "バッテリー給電"
PremisesHardwareX570 -> PremisesHardwareUps.Pi_a: "charge-guard監視 / 80%で自身停止"
PremisesHardwareUps.Ups_b -> PremisesHardwareB550m: "バッテリー給電"
PremisesHardwareB550m -> PremisesHardwareUps.Pi_b: "charge-guard監視 / 80%で自身停止"
`;default:throw Error(`Unknown viewId: `+e)}};export{e as d2Source};