var e=e=>{switch(e){case`index`:return`direction: down

User: {
  label: "利用者"
  shape: c4-person
}
Operator: {
  label: "管理者"
  shape: c4-person
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Edge: {
    label: "Cloudflare"

    Access: {
      label: "Cloudflare Access / 共通の認証入口"
    }
    Tunnel: {
      label: "Cloudflare Tunnel"
    }
  }
  Bws: {
    label: "Bitwarden Secrets Manager"
  }
}
Premises: {
  label: "自宅"

  Data: {
    label: "保存・バックアップ"

    Nas: {
      label: "TrueNAS VM ×2 / ZFS・NFS"
      shape: stored_data
    }
  }
  Management: {
    label: "自宅基盤の構成管理"

    Runner: {
      label: "ARC / 共用のrunner制御基盤"
    }
    Argo: {
      label: "自宅ArgoCD"
    }
  }
  Home: {
    label: "Talos / home-k8s"
  }
}
Consumers: {
  label: "基盤の利用側 / 別リポジトリ"

  Reventer: {
    label: "Re:Venter"
  }
}

User -> External.Edge.Access: "HTTPS / 利用時の認証"
Operator -> External.Edge.Access: "HTTPS / 管理時の認証"
External.Edge.Access -> External.Edge.Tunnel: "Access認証後の転送"
External.Edge.Tunnel -> Premises.Home: "Access認証後 / 公開UI・サービス"
External.Bws -> Premises.Home: "Secret注入"
External.Edge.Tunnel -> Premises.Data.Nas: "Access認証後 / NAS管理UI"
Premises.Data.Nas -> Premises.Home: "NFSストレージを提供"
External.Edge.Tunnel -> Premises.Management.Argo: "Access認証後 / 管理UI"
Premises.Management.Argo -> Consumers.Reventer: "共用ArgoCDの同期インターフェース"
Premises.Management.Runner -> Consumers.Reventer: "専用runner向けの共用制御基盤"
`;case`home_apps`:return`direction: right

User: {
  label: "利用者"
  shape: c4-person
}
Operator: {
  label: "管理者"
  shape: c4-person
}
ExternalEdgeAccess: {
  label: "Cloudflare Access / 共通の認証入口"
}
ExternalEdgeTunnel: {
  label: "Cloudflare Tunnel"
}
PremisesHome: {
  label: "Talos / home-k8s"

  Dns: {
    label: "内部DNS / MetalLB"
  }
  Nextcloud: {
    label: "Nextcloud"
  }
  Recording: {
    label: "録画・配信"
  }
  Apps: {
    label: "自宅ワークロード / 基盤の利用側"
  }
}
PremisesManagementArgo: {
  label: "自宅ArgoCD"
}
PremisesDataDatabases: {
  label: "DB / アプリ共有基盤"
}
PremisesDataNas: {
  label: "TrueNAS VM ×2 / ZFS・NFS"
  shape: stored_data
}

User -> ExternalEdgeAccess: "HTTPS / 利用時の認証"
Operator -> ExternalEdgeAccess: "HTTPS / 管理時の認証"
ExternalEdgeAccess -> ExternalEdgeTunnel: "Access認証後の転送"
ExternalEdgeTunnel -> PremisesHome.Nextcloud: "Access認証後 / 公開UI・サービス"
ExternalEdgeTunnel -> PremisesHome.Recording: "Access認証後 / 公開UI・サービス"
ExternalEdgeTunnel -> PremisesHome.Apps: "Access認証後 / 公開UI・サービス"
ExternalEdgeTunnel -> PremisesDataNas: "Access認証後 / NAS管理UI"
PremisesHome.Nextcloud -> PremisesDataNas: "html・data / NFS"
PremisesHome.Recording -> PremisesDataNas: "録画・thumbnail・drop / NFS"
PremisesHome.Apps -> PremisesDataNas: "images・Data Protection keys / PVC"
PremisesHome.Nextcloud -> PremisesDataDatabases: "MYSQL_HOST / MariaDB"
PremisesHome.Recording -> PremisesDataDatabases: "[...]"
PremisesHome.Apps -> PremisesDataDatabases: "PostgreSQL"
PremisesDataDatabases -> PremisesDataNas: "DB用NFS PVC"
ExternalEdgeTunnel -> PremisesManagementArgo: "Access認証後 / 管理UI"
`;case`delivery`:return`direction: down

Premises: {
  label: "自宅"

  Management: {
    label: "自宅基盤の構成管理"

    Images: {
      label: "Image Updater"
    }
    Ansible: {
      label: "Ansible"
    }
    Packer: {
      label: "Packer / VM template"
    }
    Argo: {
      label: "自宅ArgoCD"
    }
    Runner: {
      label: "ARC / 共用のrunner制御基盤"
    }
    Tfc_agents: {
      label: "Terraform Cloud agents / 自宅"
    }
  }
  Home: {
    label: "Talos / home-k8s"
  }
  Hardware: {
    label: "物理・ネットワーク"
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
  Github_pages: {
    label: "GitHub Pages / my-infra図・レビュー"
  }
  Edge: {
    label: "Cloudflare"
  }
}

External.Github -> Premises.Management.Argo: "GitOps"
External.Github -> Premises.Management.Runner: "Actions job"
External.Github -> External.Terraform_cloud: "Terraform実行"
External.Terraform_cloud -> Premises.Management.Tfc_agents: "workspace runを自宅agentで実行"
External.Github -> External.Github_pages: "構成図・PR比較を公開"
Premises.Management.Argo -> Premises.Home: "manifest同期"
Premises.Management.Tfc_agents -> Premises.Hardware: "VM / ネットワーク"
Premises.Management.Ansible -> Premises.Hardware: "機器設定"
Premises.Management.Packer -> Premises.Hardware: "VM template"
External.Terraform_cloud -> External.Edge: "DNS / Access / Tunnel"
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

  HomeEso: {
    label: "External Secrets Operator"
  }
  ManagementAnsible: {
    label: "Ansible"
  }
  DataBackups: {
    label: "バックアップ処理"
  }
}

External.Bws -> Premises.HomeEso: "Secret注入"
External.Bws -> External.Github: "CI credential"
External.Bws -> External.Terraform_cloud: "Terraform変数"
External.Bws -> Premises.ManagementAnsible: "機器・PBS用credential"
External.Bws -> Premises.DataBackups: "ESO経由 / backup credential"
`;case`observability`:return`direction: right

Operator: {
  label: "管理者"
  shape: c4-person
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

Operator -> External.Grafana: "照会"
Premises.Hardware -> Premises.Home.Agent.Collector: "exporter収集"
Premises.Home.Agent.Collector -> Premises.Home.Agent.Local_store: "remoteWrite / :8428"
External.Grafana -> Premises.Home.Agent.Pdc: "PDC経由の検索"
Premises.Home.Agent.Pdc -> External.Grafana: "外向きPDC接続"
Premises.Home.Agent.Pdc -> Premises.Home.Agent.Local_store: "private query / :8428"
Premises.Home.Agent.Exporters -> Premises.Home.Agent.Collector: "scrape"
`;case`network`:return`direction: right

Operator: {
  label: "管理者"
  shape: c4-person
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  EdgeWarp: {
    label: "WARP / private CIDR routes"
  }
}
Premises: {
  label: "自宅"

  Hardware: {
    label: "物理・ネットワーク"

    Router: {
      label: "IX2215 / VLAN"
    }
    Wifi: {
      label: "Wi-Fi AP"
    }
    Unifi: {
      label: "UniFi OS Server"
    }
    Lb: {
      label: "HAProxy / Keepalived ×2"
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
  HomeDns: {
    label: "内部DNS / MetalLB"

    Coredns: {
      label: "CoreDNS / miutaku.internal"
    }
    Metallb: {
      label: "MetalLB / LANのService IP"
    }
  }
}

External.EdgeWarp -> Premises.Lan.Server: "private CIDR routes / WARP policy"
Premises.Hardware.Router -> Premises.Lan.Native: "native IF"
Premises.Hardware.Router -> Premises.Lan.Management: "BVI10"
Premises.Hardware.Router -> Premises.Lan.Server: "BVI20"
Premises.Hardware.Router -> Premises.Lan.Client: "BVI30"
Premises.Hardware.Router -> Premises.Lan.Guest: "BVI31 / 他VLAN拒否"
Premises.Hardware.Router -> Premises.Lan.Iot: "BVI40"
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
`;case`access`:return`direction: right

User: {
  label: "利用者"
  shape: c4-person
}
Operator: {
  label: "管理者"
  shape: c4-person
}
Client: {
  label: "専用クライアント"
  shape: c4-person
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Edge: {
    label: "Cloudflare"

    Access: {
      label: "Cloudflare Access / 共通の認証入口"
    }
    Mtls: {
      label: "mTLS / 専用APIの例外"
    }
    Tunnel: {
      label: "Cloudflare Tunnel"
    }
    Routes: {
      label: "公開hostname / 設定から抽出"

      Protected: {
        label: "Access保護のhostname"
      }
      Exceptions: {
        label: "例外 / mTLS専用API"
      }
    }
  }
}
Consumers: {
  label: "基盤の利用側 / 別リポジトリ"

  Reventer: {
    label: "Re:Venter"
  }
}
Premises: {
  label: "自宅"

  Data: {
    label: "保存・バックアップ"

    Nas: {
      label: "TrueNAS VM ×2 / ZFS・NFS"
      shape: stored_data
    }
  }
  Management: {
    label: "自宅基盤の構成管理"

    Argo: {
      label: "自宅ArgoCD"
    }
  }
  Home: {
    label: "Talos / home-k8s"
  }
  Hardware: {
    label: "物理・ネットワーク"
  }
}

User -> External.Edge.Access: "HTTPS / 利用時の認証"
Operator -> External.Edge.Access: "HTTPS / 管理時の認証"
Client -> External.Edge.Mtls: "クライアント証明書"
External.Edge.Access -> External.Edge.Tunnel: "Access認証後の転送"
External.Edge.Mtls -> External.Edge.Tunnel: "mTLS検証済みのAPIリクエスト"
External.Edge.Tunnel -> External.Edge.Routes.Protected: "hostname転送"
External.Edge.Tunnel -> External.Edge.Routes.Exceptions: "hostname転送"
External.Edge.Routes.Protected -> Premises.Home: "内部接続"
External.Edge.Routes.Exceptions -> Premises.Home: "内部接続"
Premises.Home -> External.Edge.Tunnel: "外向きTunnel接続"
External.Edge.Routes.Protected -> Premises.Hardware: "認証後の内部接続"
External.Edge.Routes.Protected -> Premises.Data.Nas: "認証後の内部接続"
External.Edge.Routes.Protected -> Premises.Management.Argo: "認証後の内部接続"
External.Edge.Tunnel -> Consumers.Reventer: "hostname転送"
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