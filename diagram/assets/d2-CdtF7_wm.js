var e=e=>{switch(e){case`index`:return`direction: down

Operator: {
  label: "管理者"
  shape: c4-person
}
Bws: {
  label: "Bitwarden Secrets Manager"
}
User: {
  label: "利用者"
  shape: c4-person
}
Oke: {
  label: "OCI / STG OKE共通基盤"
}
Edge: {
  label: "Cloudflare"

  Access: {
    label: "Access / 認証"
  }
  Tunnel: {
    label: "Cloudflare Tunnel"
  }
}
Home: {
  label: "自宅 / home-k8s"

  Nextcloud: {
    label: "Nextcloud"
  }
  Eso: {
    label: "External Secrets Operator"
  }
  Agent: {
    label: "自宅監視基盤"
  }
}
Control: {
  label: "変更・運用"

  Argo: {
    label: "自宅ArgoCD"
  }
}
Monitoring: {
  label: "監視"

  Vms: {
    label: "OCI監視VM / STG・PRD"
    shape: stored_data
  }
  Grafana: {
    label: "Grafana Cloud / PDC"
  }
}
Data: {
  label: "保存・バックアップ"

  Nas: {
    label: "TrueNAS / NFS"
    shape: stored_data
  }
}

Operator -> Edge.Access: "管理認証"
Edge.Tunnel -> Home.Nextcloud: "公開hostname / 内部HTTP"
Edge.Access -> Control.Argo: "Tunnel / 管理UI"
Edge.Tunnel -> Control.Argo: "Access後 / 管理UI"
Bws -> Home.Eso: "Secret注入"
Bws -> Oke: "Secret注入"
Operator -> Monitoring.Grafana: "照会"
Home.Agent -> Monitoring.Grafana: "外向きPDC接続"
Monitoring.Vms -> Monitoring.Grafana: "VM側PDC agentから外向き接続"
Monitoring.Grafana -> Home.Agent: "PDC経由の検索"
Monitoring.Grafana -> Monitoring.Vms: "PDC経由"
Home.Nextcloud -> Data.Nas: "NFS / PVC"
Home.Agent -> Data.Nas: "metrics用NFS PVC"
User -> Edge: "HTTPS"
`;case`home_apps`:return`direction: right

User: {
  label: "利用者"
  shape: c4-person
}
Edge: {
  label: "Cloudflare"
}
Home: {
  label: "自宅 / home-k8s"

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
Data: {
  label: "保存・バックアップ"

  Databases: {
    label: "DB / アプリ共有基盤"
  }
  Nas: {
    label: "TrueNAS / NFS"
    shape: stored_data
  }
}

User -> Edge: "HTTPS"
Edge -> Home.Nextcloud: "公開hostname / 内部HTTP"
Edge -> Home.Recording: "公開hostname / 内部HTTP"
Edge -> Home.Apps.Coupon_manager: "公開hostname / 内部HTTP"
Edge -> Home.Apps.Loockit: "内部接続"
Home.Recording -> Home.Apps.Annict_scraper: "番組照合"
Home.Nextcloud -> Data.Nas: "NFS / PVC"
Home.Recording -> Data.Nas: "メディア保存"
Home.Apps.Coupon_manager -> Data.Nas: "images・Data Protection keys / PVC"
Home.Nextcloud -> Data.Databases: "MYSQL_HOST / MariaDB"
Home.Recording -> Data.Databases: "[...]"
Home.Apps.Coupon_manager -> Data.Databases: "PostgreSQL"
Data.Databases -> Data.Nas: "DB用NFS PVC"
`;case`delivery`:return`direction: down

Control: {
  label: "変更・運用"

  Reviews: {
    label: "Re:Venterの一時レビュー"
  }
  Images: {
    label: "Image Updater"
  }
  Git: {
    label: "GitHub / コード・Actions"
  }
  Packer: {
    label: "Packer / VM template"
  }
  Ansible: {
    label: "Ansible"
  }
  Runner: {
    label: "ARC / 専用runner"
  }
  Tfc: {
    label: "Terraform Cloud"
  }
  Argo: {
    label: "自宅ArgoCD"
  }
}
Hardware: {
  label: "物理・ネットワーク"
}
Edge: {
  label: "Cloudflare"
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
Home: {
  label: "自宅 / home-k8s"
}
Reventer: {
  label: "Re:Venter / STG・PRD"
}

Control.Git -> Control.Runner: "Actions job"
Control.Git -> Control.Tfc: "Terraform実行"
Control.Git -> Control.Argo: "GitOps"
Control.Argo -> Home: "manifest同期"
Control.Git -> Oke.Argo: "GitOps"
Oke.Argo -> Oke.Api: "共通基盤同期"
Oke.Scale -> Oke.Api: "burst pool増減"
Control.Argo -> Reventer: "STG・PRDアプリ同期"
Control.Tfc -> Hardware: "VM / ネットワーク"
Control.Packer -> Hardware: "VM template"
Control.Ansible -> Hardware: "機器設定"
Control.Tfc -> Edge: "DNS / Access / Tunnel"
Control.Tfc -> Monitoring.Vms: "監視VM"
Control.Tfc -> Oke: "OCI / OKE"
`;case`secrets`:return`direction: right

Bws: {
  label: "Bitwarden Secrets Manager"
}
Home: {
  label: "自宅 / home-k8s"

  Eso: {
    label: "External Secrets Operator"
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

  Git: {
    label: "GitHub / コード・Actions"
  }
  Tfc: {
    label: "Terraform Cloud"
  }
  Ansible: {
    label: "Ansible"
  }
}
Data: {
  label: "保存・バックアップ"

  Backups: {
    label: "バックアップ処理"
  }
}

Bws -> Home.Eso: "Secret注入"
Bws -> Oke.Eso: "Secret注入"
Bws -> Reventer.PlatformExternal_secrets: "ESO / PRD Secret注入"
Bws -> Control.Git: "CI credential"
Bws -> Control.Tfc: "Terraform変数"
Bws -> Control.Ansible: "機器・PBS用credential"
Bws -> Data.Backups: "ESO経由 / backup credential"
`;case`observability`:return`direction: right

Hardware: {
  label: "物理・ネットワーク"
}
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
Home: {
  label: "自宅 / home-k8s"

  Agent: {
    label: "自宅監視基盤"

    Pdc: {
      label: "PDC agent / 自宅"
    }
    Exporters: {
      label: "exporter群"
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
Monitoring: {
  label: "監視"

  Vms: {
    label: "OCI監視VM / STG・PRD"
    shape: stored_data
  }
  Grafana: {
    label: "Grafana Cloud / PDC"
  }
}

Hardware -> Home.Agent.Collector: "exporter収集"
Home.Agent.Collector -> Home.Agent.Local_store: "remoteWrite / :8428"
Home.Agent.Pdc -> Home.Agent.Local_store: "private query / :8428"
Home.Agent.Exporters -> Home.Agent.Collector: "scrape"
Operator -> Monitoring.Grafana: "照会"
Home.Agent.Pdc -> Monitoring.Grafana: "外向きPDC接続"
Reventer.Collectors -> Monitoring.Vms: "[...]"
Monitoring.Grafana -> Home.Agent.Pdc: "PDC経由の検索"
Monitoring.Vms -> Monitoring.Grafana: "VM側PDC agentから外向き接続"
Monitoring.Grafana -> Monitoring.Vms: "PDC経由"
`;case`network`:return`direction: right

Operator: {
  label: "管理者"
  shape: c4-person
}
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
  label: "自宅 / home-k8s"

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
Edge: {
  label: "Cloudflare"

  Access: {
    label: "Access / 認証"
  }
  Tunnel: {
    label: "Cloudflare Tunnel"
  }
  Warp: {
    label: "WARP / private CIDR routes"
  }
  Routes: {
    label: "公開hostname / 設定から抽出"
  }
}
External: {
  label: "外部サービス"

  Internet: {
    label: "Internet"
  }
  Oracle: {
    label: "Oracle Services Network"
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

Operator -> Edge.Access: "管理認証"
Edge.Tunnel -> Edge.Routes: "hostname転送"
Edge.Access -> Edge.Routes: "Access policy"
Edge.Warp -> Lan.Server: "private CIDR routes / WARP policy"
Edge.Routes -> Hardware.Router: "認証後の内部接続"
Hardware.Router -> Lan.Native: "native IF"
Hardware.Router -> Lan.Management: "BVI10"
Hardware.Router -> Lan.Server: "BVI20"
Hardware.Router -> Lan.Client: "BVI30"
Hardware.Router -> Lan.Guest: "BVI31 / 他VLAN拒否"
Hardware.Router -> Lan.Iot: "BVI40"
Edge.Routes -> Hardware.Wifi: "認証後の内部接続"
Edge.Routes -> Hardware.Unifi: "認証後の内部接続"
Home.PlatformCloudflared -> Edge.Tunnel: "外向きTunnel接続"
Oke.Workers -> Oke.Network.Private_workers: "private subnet / 10.0.2.0/24"
Oke.Network.Igw -> Oke.Network.Public_api: "public route table"
Oke.Network.Private_workers -> Oke.Network.Nat: "default route"
Oke.Network.Private_workers -> Oke.Network.Service_gateway: "Oracle service CIDR route"
Oke.Network.Nat -> External.Internet: "NAT / reserved IPv4"
External.Internet -> Oke.Network.Igw: "公開API・LBへの到達"
Oke.Network.Service_gateway -> External.Oracle: "Oracle Services Network"
Hardware.Router -> Home.Dns: "LAN / 内部DNS"
`;case`storage`:return`direction: right

Home: {
  label: "自宅 / home-k8s"

  Recording: {
    label: "録画・配信"
  }
  Nextcloud: {
    label: "Nextcloud"
  }
  AgentLocal_store: {
    label: "VictoriaMetrics / 自宅"
    shape: stored_data
  }
}
Data: {
  label: "保存・バックアップ"

  Nas: {
    label: "TrueNAS / NFS"
    shape: stored_data

    Nas01: {
      label: "nas-01 / ZFS・NFS"
      shape: stored_data
    }
    Nas02: {
      label: "nas-02 / ZFS・NFS"
      shape: stored_data
    }
  }
  Shared: {
    label: "共有PV / runner cache・状態"
  }
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
      label: "MariaDB・PostgreSQL / logical dump"
    }
    Recordings: {
      label: "録画ファイル用 / 別job"
    }
    Metrics: {
      label: "VictoriaMetrics / consistent snapshot"
    }
    Nas: {
      label: "NAS restic / CronJob"
    }
  }
  Pbs: {
    label: "Proxmox Backup Server"
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
External: {
  label: "外部サービス"

  Idrive: {
    label: "IDrive e2 / S3"
    shape: stored_data
  }
}

Home.Recording -> Data.Nas.Nas02: "録画・thumbnail・drop / NFS"
Home.Nextcloud -> Data.Databases.Mariadb: "MYSQL_HOST / MariaDB"
Home.Recording -> Data.Databases.Mariadb: "EPGStation DB"
Home.Recording -> Data.Databases.Postgres: "[...]"
Home.Recording -> Data.Backups.Recordings: "録画ファイル専用job"
Home.AgentLocal_store -> Data.Backups.Metrics: "snapshot / vmbackup"
Data.Pbs -> External.Idrive: "S3 datastore / VM backup"
Hardware.X570 -> Data.Pbs: "VM backup"
Hardware.B550m -> Data.Pbs: "VM backup"
Home.Nextcloud -> Data.Nas: "NFS / PVC"
Home.AgentLocal_store -> Data.Nas: "metrics用NFS PVC"
Data.Databases -> Data.Nas: "DB用NFS PVC"
Data.Nas -> Data.Backups.Nas: "対象dataset / restic"
Data.Databases -> Data.Backups.Db: "整合性あるlogical dump"
Data.Backups -> External.Idrive: "用途別prefix / 暗号化・retention"
`;case`placement`:return`direction: right

HomeSite: {
  label: "自宅 / Proxmox2ホスト・RPi"
}
Stg: {
  label: "OCI / STG OKE共通基盤"
}
Prd: {
  label: "PRD OKE / 本体reventer所有・共通アドオンmy-infra"
}
`;case`media`:return`direction: right

HomeRecording: {
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
HomeAppsAnnict_scraper: {
  label: "Annict scraper"
}
HardwareTuner_stg: {
  label: "Mirakurun STG LXC / CT12904・PX-S1UD"
}
ExternalAnnict: {
  label: "Annict API"
}
HardwareTuner_prod: {
  label: "Mirakurun LXC / CT12901・PT3"
}
DataDatabases: {
  label: "DB / アプリ共有基盤"
}
DataNas: {
  label: "TrueNAS / NFS"
  shape: stored_data
}

HomeRecording.Epgstation -> HomeRecording.Mirakurun: "tuner API"
HomeRecording.Annict_sync -> HomeRecording.Tnlastation.Backend: "録画登録API"
HomeRecording.Tnlastation.Backend -> HomeRecording.Mirakurun: "tuner API"
HomeRecording.Tnlastation.Gateway -> HomeRecording.Tnlastation.Frontend: "Web"
HomeRecording.Tnlastation.Gateway -> HomeRecording.Tnlastation.Backend: "API"
HomeRecording.Tnlastation.Gateway -> HomeRecording.Tnlastation.Mediamtx: "HLS"
HomeRecording.Tnlastation.Backend -> HomeRecording.Tnlastation.Encode: "encode制御"
HomeRecording.Tnlastation.Backend -> HomeRecording.Tnlastation.Streaming: "streaming制御"
HomeRecording.Tnlastation.Streaming -> HomeRecording.Tnlastation.Mediamtx: "配信"
HomeRecording.Mirakurun -> HardwareTuner_prod: "EndpointSlice / 外部LXC"
HomeRecording.Mirakurun_staging -> HardwareTuner_stg: "EndpointSlice / 外部LXC"
HardwareTuner_stg -> HardwareTuner_prod: "BS/CS TCP fallback"
HomeRecording.Annict_sync -> HomeAppsAnnict_scraper: "番組照合"
HomeAppsAnnict_scraper -> ExternalAnnict: "Annict API"
HomeRecording.Epgstation -> DataDatabases: "EPGStation DB"
HomeRecording.Tnlastation.Backend -> DataDatabases: "PostgreSQL"
HomeRecording.Tnlastation.Encode -> DataDatabases: "encode状態"
DataDatabases -> DataNas: "DB用NFS PVC"
HomeRecording -> DataNas: "メディア保存"
`;case`power`:return`direction: right

HardwareUps: {
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
HardwareX570: {
  label: "Proxmox / x570"
}
HardwareB550m: {
  label: "Proxmox / b550m"
}

HardwareUps.Mains -> HardwareUps.Surge_a: "非バックアップ出力"
HardwareUps.Mains -> HardwareUps.Ups_a: "AC入力"
HardwareUps.Surge_a -> HardwareUps.Ups_b: "UPS BのAC入力"
HardwareUps.Ups_a -> HardwareUps.Pi_a: "USB監視 / ups-a"
HardwareUps.Ups_a -> HardwareUps.Pi_b: "cross-power / PiBの給電元"
HardwareUps.Ups_b -> HardwareUps.Pi_a: "cross-power / PiAの給電元"
HardwareUps.Ups_b -> HardwareUps.Pi_b: "USB監視 / ups-b"
HardwareUps.Pi_a -> HardwareUps.Pi_b: "ups-b監視 / LOWBATT10%で自身停止"
HardwareUps.Pi_b -> HardwareUps.Pi_a: "ups-a監視 / LOWBATT10%で自身停止"
HardwareUps.Ups_a -> HardwareX570: "バッテリー給電"
HardwareX570 -> HardwareUps.Pi_a: "charge-guard監視 / 80%で自身停止"
HardwareUps.Ups_b -> HardwareB550m: "バッテリー給電"
HardwareB550m -> HardwareUps.Pi_b: "charge-guard監視 / 80%で自身停止"
`;default:throw Error(`Unknown viewId: `+e)}};export{e as d2Source};