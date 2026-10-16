var e=e=>{switch(e){case`index`:return`direction: right

User: {
  label: "利用者"
  shape: c4-person
}
Operator: {
  label: "管理者"
  shape: c4-person
}
Premises: {
  label: "自宅"

  Hardware: {
    label: "物理・ネットワーク"

    Network: {
      label: "ネットワーク機器"
    }
    X570: {
      label: "pve-x570 / Proxmox"
    }
    B550m: {
      label: "pve-b550m / Proxmox"
    }
    Rpi_workers: {
      label: "RPi worker ×2"
    }
  }
  Data: {
    label: "保存・バックアップ"

    Nas: {
      label: "TrueNAS VM ×2 / ZFS・NFS"
      shape: stored_data
    }
    Pbs: {
      label: "Proxmox Backup Server"
      shape: stored_data
    }
  }
  Home: {
    label: "Talos / home-k8s"
  }
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Edge: {
    label: "Cloudflare"
  }
  Grafana: {
    label: "Grafana Cloud / PDC"
  }
  Bws: {
    label: "Bitwarden Secrets Manager"
  }
  Idrive: {
    label: "IDrive e2 / S3"
    shape: stored_data
  }
}
Consumers: {
  label: "基盤の利用側 / 別リポジトリ"

  Reventer: {
    label: "Re:Venter"
  }
}

User -> External.Edge: "HTTPS / 利用時の認証"
Operator -> External.Edge: "HTTPS / 管理時の認証"
Operator -> External.Grafana: "照会"
Premises.Hardware.Network -> Premises.Hardware.X570: "native1管理 / ゲストtag20・30 / 配線ポート未確定"
Premises.Hardware.Network -> Premises.Hardware.B550m: "native1管理 / ゲストtag20・40 / 配線ポート未確定"
Premises.Hardware.Network -> Premises.Hardware.Rpi_workers: "VLAN10 / arm64 worker"
External.Edge -> Premises.Home: "認証済みHTTP / Access・mTLS → 内部Service"
External.Bws -> Premises.Home: "Secret注入"
External.Grafana -> Premises.Home: "PDC経由の検索"
Premises.Hardware.Network -> Premises.Home: "LAN / 内部DNS"
Premises.Hardware.X570 -> Premises.Home: "Talos VM13001・13004 / CP1・worker1"
Premises.Hardware.B550m -> Premises.Home: "Talos VM13002・13003・13005 / CP2・worker1"
Premises.Hardware.Rpi_workers -> Premises.Home: "Talos worker03・04 / arm64"
Premises.Home -> External.Grafana: "外向きPDC接続"
Premises.Hardware.X570 -> Premises.Data.Nas: "TrueNAS VM69001 / USB disk passthrough"
Premises.Hardware.B550m -> Premises.Data.Nas: "TrueNAS VM69002 / USB disk passthrough"
Premises.Data.Nas -> Premises.Home: "NFSストレージを提供"
Premises.Hardware.X570 -> Premises.Data.Pbs: "VM backup"
Premises.Hardware.B550m -> Premises.Data.Pbs: "VM backup"
Premises.Data.Pbs -> External.Idrive: "S3 datastore / VM backup"
Premises.Home -> Consumers.Reventer: "共有ArgoCD・ARCを提供 / 専用構成は利用側へ"
Premises.Hardware -> Premises.Home: "exporter収集"
`;case`home_apps`:return`direction: right

ExternalEdge: {
  label: "Cloudflare"
}
PremisesHardwareKiosk: {
  label: "MagicMirror表示 / VM5000"
}
PremisesHome: {
  label: "Talos / home-k8s"

  Platform: {
    label: "クラスタ基盤 / Talos"
  }
  Nextcloud: {
    label: "Nextcloud"
  }
  Recording: {
    label: "録画・配信 / EPGStation・TNLaStation"
  }
  Apps: {
    label: "生活サービス / Loockit・Coupon・WOL"

    Loockit: {
      label: "Loockit / BLEスマートロック"
    }
    Coupon_manager: {
      label: "Coupon Manager"
    }
    Wol: {
      label: "Wake-on-LAN"
    }
    Annict_scraper: {
      label: "Annict scraper / 番組照合"
    }
    Magic_mirror: {
      label: "MagicMirror / ダッシュボード"
    }
  }
}
PremisesDataDatabases: {
  label: "DB / アプリ共有基盤"
}
ExternalAi: {
  label: "Gemini API / OpenAI互換"
}
ExternalAnnict: {
  label: "Annict API"
}
PremisesDataNasNas02: {
  label: "TrueNAS VM69002 / nas-02"
  shape: stored_data
}

ExternalEdge -> PremisesHome.Nextcloud: "nextcloud / 80 / Access"
PremisesHome.Platform -> PremisesHome.Nextcloud: "Nextcloud Pod"
ExternalEdge -> PremisesHome.Recording: "[...]"
PremisesHome.Platform -> PremisesHome.Recording: "録画・配信Pod"
ExternalEdge -> PremisesHome.Apps.Loockit: "loockit-api / 8080 / mTLS"
ExternalEdge -> PremisesHome.Apps.Coupon_manager: "coupon-manager / 80 / Access"
ExternalEdge -> PremisesHome.Apps.Wol: "wol / 5000 / Access"
PremisesHome.Recording -> PremisesHome.Apps.Annict_scraper: "番組照合"
PremisesHome.Nextcloud -> PremisesDataDatabases: "MYSQL_HOST / MariaDB"
PremisesHome.Recording -> PremisesDataDatabases: "[...]"
PremisesHome.Apps.Coupon_manager -> PremisesDataDatabases: "PostgreSQL"
PremisesHome.Nextcloud -> PremisesDataNasNas02: "html・data / NFS"
PremisesHome.Recording -> PremisesDataNasNas02: "録画・thumbnail・drop / NFS"
PremisesHome.Apps.Coupon_manager -> PremisesDataNasNas02: "images・Data Protection keys / PVC"
PremisesDataDatabases -> PremisesDataNasNas02: "DB用NFS PVC"
PremisesHardwareKiosk -> PremisesHome.Apps.Magic_mirror: "表示"
PremisesHome.Apps.Annict_scraper -> ExternalAnnict: "Annict API"
PremisesHome.Apps.Coupon_manager -> ExternalAi: "AI API"
PremisesHome.Platform -> PremisesHome.Apps: "アプリPod / HAProxy・Web・API"
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

    Network: {
      label: "ネットワーク機器"
    }
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
Premises.Management.Runner -> Premises.Home: "runner Podの作成・削除"
External.Terraform_cloud -> External.Edge: "DNS / Access / Tunnel"
Premises.Management.Tfc_agents -> Premises.Hardware: "VM / ネットワーク"
Premises.Management.Ansible -> Premises.Hardware: "機器設定"
Premises.Management.Packer -> Premises.Hardware: "VM template"
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
`;case`coupon`:return`direction: right

ExternalEdge: {
  label: "Cloudflare"
}
PremisesHomeAppsCoupon_managerResources: {
  label: "リソース定義"
}
PremisesHomeAppsCoupon_managerWeb: {
  label: "Web / :80"
}
PremisesHomeAppsCoupon_managerApi: {
  label: "API / :8080"
}
PremisesDataDatabasesPostgres: {
  label: "PostgreSQL / 本番・STG"
  shape: stored_data
}
PremisesDataNasNas02: {
  label: "TrueNAS VM69002 / nas-02"
  shape: stored_data
}
ExternalAi: {
  label: "Gemini API / OpenAI互換"
}

ExternalEdge -> PremisesHomeAppsCoupon_managerWeb: "coupon-manager / 80 / Access"
PremisesHomeAppsCoupon_managerWeb -> PremisesHomeAppsCoupon_managerApi: "内部API"
PremisesHomeAppsCoupon_managerApi -> PremisesDataDatabasesPostgres: "PostgreSQL"
PremisesHomeAppsCoupon_managerApi -> ExternalAi: "AI API"
`;case`loockit`:return`direction: right

Client: {
  label: "専用クライアント"
  shape: c4-person
}
ExternalEdgeMtls: {
  label: "mTLS / 専用APIの例外"
}
ExternalEdgeTunnel: {
  label: "Cloudflare Tunnel"
}
PremisesHomeAppsLoockitProxy: {
  label: "HAProxy / :8080・:50051"
}
PremisesHardwareLoockit_a: {
  label: "Loockit 01 / CT12902"
}
PremisesHardwareLoockit_b: {
  label: "Loockit 02 / CT12903"
}
PremisesHardwareBle_a: {
  label: "x570 BlueZ / Bluetooth"
}
PremisesHardwareBle_b: {
  label: "b550m BlueZ / Bluetooth"
}
PremisesHomePlatformApi: {
  label: "Kubernetes API / Lease"
}

Client -> ExternalEdgeMtls: "クライアント証明書"
ExternalEdgeMtls -> ExternalEdgeTunnel: "mTLS検証済みのAPIリクエスト"
ExternalEdgeTunnel -> PremisesHomeAppsLoockitProxy: "loockit-api / 8080 / mTLS"
PremisesHomeAppsLoockitProxy -> PremisesHardwareLoockit_a: "readyz / leaderのみ"
PremisesHomeAppsLoockitProxy -> PremisesHardwareLoockit_b: "readyz / leaderのみ"
PremisesHardwareLoockit_a -> PremisesHardwareBle_a: "read-only D-Bus / org.bluez"
PremisesHardwareLoockit_b -> PremisesHardwareBle_b: "read-only D-Bus / org.bluez"
PremisesHardwareLoockit_a -> PremisesHomePlatformApi: "Lease leader election"
PremisesHardwareLoockit_b -> PremisesHomePlatformApi: "Lease leader election"
`;case`nextcloud`:return`direction: right

ExternalEdge: {
  label: "Cloudflare"
}
PremisesHomeNextcloud: {
  label: "Nextcloud"

  Resources: {
    label: "リソース定義"
  }
  Web: {
    label: "Nextcloud / PHP・HTTP :80"
  }
  Redis: {
    label: "Redis / locking・cache"
    shape: stored_data
  }
}
PremisesDataDatabasesMariadb: {
  label: "MariaDB"
  shape: stored_data
}
PremisesDataNasNas02: {
  label: "TrueNAS VM69002 / nas-02"
  shape: stored_data
}

ExternalEdge -> PremisesHomeNextcloud.Web: "nextcloud / 80 / Access"
PremisesHomeNextcloud.Web -> PremisesHomeNextcloud.Redis: "Redis :6379 / locking・cache"
PremisesHomeNextcloud.Web -> PremisesDataDatabasesMariadb: "MYSQL_HOST / MariaDB"
PremisesHomeNextcloud.Web -> PremisesDataNasNas02: "html・data / NFS"
`;case`platform`:return`direction: right

PremisesHomePlatformDescheduler: {
  label: "descheduler"
}
PremisesHomePlatformControlplane: {
  label: "home-k8s control-plane"
}
PremisesHomePlatformCert_approver: {
  label: "kubelet-serving-cert-approver"
}
PremisesHomePlatformFlannel: {
  label: "Flannel / CNI"
}
PremisesHomePlatformKube_proxy: {
  label: "kube-proxy / Service routing"
}
PremisesHomePlatformMetrics_server: {
  label: "metrics-server / Metrics API"
}
PremisesHomeDnsMetallb: {
  label: "MetalLB / LANのService IP"
}
ExternalBws: {
  label: "Bitwarden Secrets Manager"
}
PremisesManagementArgo: {
  label: "自宅ArgoCD"
}
PremisesManagementRunner: {
  label: "ARC / 共用のrunner制御基盤"
}
PremisesHomeDnsCoredns: {
  label: "CoreDNS / miutaku.internal"
}
PremisesHomeEso: {
  label: "External Secrets Operator"
}
ExternalPublic_dns: {
  label: "Public DNS / 1.1.1.1・8.8.8.8"
}
PremisesHomePlatformApi: {
  label: "Kubernetes API / Lease"
}
PremisesHomePlatformWorker: {
  label: "home-k8s worker"
}
PremisesHomePlatformCloudflared: {
  label: "cloudflared / 自宅connector"
}
PremisesHomePlatformCluster_dns: {
  label: "CoreDNS / cluster.local"
}
ExternalEdge: {
  label: "Cloudflare"
}
PremisesLanServer: {
  label: "VLAN20 / 192.168.20.0/24"
}

PremisesHomePlatformDescheduler -> PremisesHomePlatformApi: "Podのeviction / 配置再調整"
PremisesHomePlatformWorker -> PremisesHomePlatformCloudflared: "connector Pod"
PremisesHomePlatformApi -> PremisesHomePlatformWorker: "Podの実行を制御"
PremisesHomePlatformControlplane -> PremisesHomePlatformApi: "API server :6443 / etcd"
PremisesHomePlatformWorker -> PremisesHomePlatformApi: "kubelet / Pod・Serviceのwatch"
PremisesHomePlatformCert_approver -> PremisesHomePlatformApi: "kubelet serving CSRの承認"
PremisesHomePlatformWorker -> PremisesHomePlatformCluster_dns: "Podの名前解決 / :53"
PremisesHomePlatformFlannel -> PremisesHomePlatformWorker: "CNI / Podネットワーク"
PremisesHomePlatformKube_proxy -> PremisesHomePlatformWorker: "Service / ClusterIP転送"
PremisesHomePlatformMetrics_server -> PremisesHomePlatformWorker: "kubelet metrics / :10250"
PremisesHomeDnsMetallb -> PremisesHomePlatformApi: "ServiceのIP割当 / controller"
PremisesHomeDnsMetallb -> PremisesHomeDnsCoredns: "LAN向けDNS / LoadBalancer IP .201"
PremisesHomeDnsCoredns -> ExternalPublic_dns: "非internal名をforward / DNS :53"
PremisesHomeEso -> PremisesHomePlatformApi: "Kubernetes Secretを同期"
ExternalBws -> PremisesHomeEso: "Secret注入"
PremisesManagementArgo -> PremisesHomePlatformApi: "manifest同期 / Kubernetes API"
PremisesManagementRunner -> PremisesHomePlatformApi: "runner Podの作成・削除"
PremisesHomePlatformCloudflared -> ExternalEdge: "外向きTunnel接続"
PremisesHomeDnsMetallb -> PremisesLanServer: "L2広告 / Service IP .200-.226"
ExternalEdge -> PremisesLanServer: "private CIDR routes / WARP policy"
`;case`vlans`:return`direction: right

Premises: {
  label: "自宅"

  HardwareNetworkSwitch: {
    label: "US-8-60W / 管理スイッチ"
  }
  HardwareNetworkRouter: {
    label: "IX2215 / ルーター・VLAN間ACL"
  }
  HardwareX570Bridge: {
    label: "enp7s0 / vmbr0"
  }
  HardwareB550mBridge: {
    label: "enp6s0 / vmbr0"
  }
  HomeDns: {
    label: "内部DNS / MetalLB"
  }
  Lan: {
    label: "LAN / VLAN・経路"

    Native: {
      label: "native / 192.168.0.0/24"
    }
    Management: {
      label: "VLAN10 / 192.168.10.0/24"
    }
    Server: {
      label: "VLAN20 / 192.168.20.0/24"
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
ExternalEdgeWarp: {
  label: "WARP / private CIDR routes"
}

Premises.HardwareNetworkRouter -> Premises.Lan.Native: "native IF"
Premises.HardwareNetworkRouter -> Premises.Lan.Management: "BVI10"
Premises.HardwareNetworkRouter -> Premises.Lan.Server: "BVI20"
Premises.HardwareNetworkRouter -> Premises.Lan.Client: "BVI30"
Premises.HardwareNetworkRouter -> Premises.Lan.Guest: "BVI31 / 他VLAN拒否"
Premises.HardwareNetworkRouter -> Premises.Lan.Iot: "BVI4 / tag40"
Premises.HardwareX570Bridge -> Premises.Lan.Server: "VM・LXC tag20"
Premises.HardwareX570Bridge -> Premises.Lan.Client: "Windows VM tag30"
Premises.HardwareB550mBridge -> Premises.Lan.Server: "VM・LXC tag20"
Premises.HardwareB550mBridge -> Premises.Lan.Iot: "kiosk VM tag40"
ExternalEdgeWarp -> Premises.Lan.Server: "private CIDR routes / WARP policy"
Premises.HomeDns -> Premises.Lan.Server: "L2広告 / Service IP .200-.226"
`;case`pve_b550m`:return`direction: down

HomeSite: {
  label: "自宅 / Proxmox2ホスト・RPi"

  B550m: {
    label: "pve-b550m"

    Bluez: {
      label: "BlueZ / USB Bluetooth"
    }
    Cp2: {
      label: "Talos controlplane02 / VM13002"

      Talos: {
        label: "Talos OS / VLAN20"
      }
    }
    Cp3: {
      label: "Talos controlplane03 / VM13003"

      Talos: {
        label: "Talos OS / VLAN20"
      }
    }
    Worker2: {
      label: "Talos worker02 / VM13005"

      Talos: {
        label: "Talos OS / VLAN20"
      }
    }
    Loockit: {
      label: "Loockit 02 / CT12903"

      App: {
        label: "Docker / Loockit REST・gRPC"
      }
    }
    Tuner: {
      label: "Mirakurun STG / CT12904・PX-S1UD"

      App: {
        label: "Docker / Mirakurun / PX-S1UD"
      }
    }
    Nas2: {
      label: "TrueNAS VM69002 / nas-02"
      shape: stored_data
    }
    Lb: {
      label: "HAProxy / Keepalived VM10002"
    }
    Dev: {
      label: "開発用Docker / VM40000"
    }
    Kiosk: {
      label: "MagicMirror表示 / VM5000"
    }
  }
  Talos: {
    label: "home-k8s"
  }
  Lan: {
    label: "LAN / VLAN・経路"
  }
}

HomeSite.B550m.Cp2.Talos -> HomeSite.Talos: "control-plane / home-k8s所属"
HomeSite.B550m.Cp3.Talos -> HomeSite.Talos: "control-plane / home-k8s所属"
HomeSite.B550m.Worker2.Talos -> HomeSite.Talos: "worker / home-k8s所属"
HomeSite.Talos -> HomeSite.B550m.Worker2.Talos: "[...]"
HomeSite.B550m.Nas2 -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.B550m.Lb -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.B550m.Dev -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.B550m.Kiosk -> HomeSite.Lan: "vmbr0 / tag 40"
HomeSite.Talos -> HomeSite.Lan: "L2広告 / Service IP .200-.226"
HomeSite.B550m.Loockit -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.B550m.Cp2 -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.B550m.Cp3 -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.B550m.Worker2 -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.B550m.Tuner -> HomeSite.Lan: "vmbr0 / tag 20"
`;case`pve_x570`:return`direction: down

HomeSite: {
  label: "自宅 / Proxmox2ホスト・RPi"

  X570: {
    label: "pve-x570"

    Bluez: {
      label: "BlueZ / USB Bluetooth"
    }
    Cp1: {
      label: "Talos controlplane01 / VM13001"

      Talos: {
        label: "Talos OS / VLAN20"
      }
    }
    Worker1: {
      label: "Talos worker01 / VM13004"

      Talos: {
        label: "Talos OS / VLAN20"
      }
    }
    Loockit: {
      label: "Loockit 01 / CT12902"

      App: {
        label: "Docker / Loockit REST・gRPC"
      }
    }
    Unifi: {
      label: "UniFi OS VM13201"

      App: {
        label: "Podman / UniFi OS・Network"
      }
    }
    Tuner: {
      label: "Mirakurun本番 / CT12901・PT3"

      App: {
        label: "Docker / Mirakurun / PT3"
      }
    }
    Pbs: {
      label: "PBS VM14001"
      shape: stored_data
    }
    Nas1: {
      label: "TrueNAS VM69001 / nas-01"
      shape: stored_data
    }
    Lb: {
      label: "HAProxy / Keepalived VM10001"
    }
    Windows: {
      label: "Windows / VM60000 / tag30"
    }
  }
  Talos: {
    label: "home-k8s"
  }
  Lan: {
    label: "LAN / VLAN・経路"
  }
}

HomeSite.X570.Cp1.Talos -> HomeSite.Talos: "control-plane / home-k8s所属"
HomeSite.X570.Worker1.Talos -> HomeSite.Talos: "worker / home-k8s所属"
HomeSite.Talos -> HomeSite.X570.Worker1.Talos: "[...]"
HomeSite.X570.Pbs -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.X570.Nas1 -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.X570.Lb -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.X570.Windows -> HomeSite.Lan: "vmbr0 / tag 30"
HomeSite.Talos -> HomeSite.Lan: "L2広告 / Service IP .200-.226"
HomeSite.X570.Loockit -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.X570.Cp1 -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.X570.Worker1 -> HomeSite.Lan: "vmbr0 / tag 20"
HomeSite.X570.Unifi -> HomeSite.Lan: "vmbr0 / native 1"
HomeSite.X570.Tuner -> HomeSite.Lan: "vmbr0 / tag 20"
`;case`network`:return`direction: down

ExternalInternet: {
  label: "Internet"
}
Premises: {
  label: "自宅"

  HardwareNetwork: {
    label: "ネットワーク機器"

    Router: {
      label: "IX2215 / ルーター・VLAN間ACL"
    }
    Ethernet: {
      label: "宅内Ethernet / VLAN trunk"
    }
    Switch: {
      label: "US-8-60W / 管理スイッチ"
    }
    Ap: {
      label: "FS Wi-Fi AP"
    }
  }
  HardwareX570: {
    label: "pve-x570 / Proxmox"

    Bridge: {
      label: "enp7s0 / vmbr0"
    }
  }
  HardwareB550m: {
    label: "pve-b550m / Proxmox"

    Bridge: {
      label: "enp6s0 / vmbr0"
    }
  }
  HardwareUnifi: {
    label: "UniFi OS / VM13201"
  }
  Lan: {
    label: "LAN / VLAN・経路"
  }
}

ExternalInternet -> Premises.HardwareNetwork.Router: "WAN / GigaEthernet0"
Premises.HardwareNetwork.Router -> Premises.HardwareNetwork.Ethernet: "GigaEthernet2 / native1 + tag10,20,30,31,40"
Premises.HardwareNetwork.Ethernet -> Premises.HardwareNetwork.Switch: "802.1Q / uplink"
Premises.HardwareNetwork.Ethernet -> Premises.HardwareNetwork.Ap: "AP trunk / 接続ポート未確定"
Premises.HardwareNetwork.Ethernet -> Premises.HardwareX570.Bridge: "native1管理 / ゲストtag20・30 / 配線ポート未確定"
Premises.HardwareNetwork.Ethernet -> Premises.HardwareB550m.Bridge: "native1管理 / ゲストtag20・40 / 配線ポート未確定"
Premises.HardwareNetwork.Switch -> Premises.HardwareUnifi: "UniFiで管理"
Premises.HardwareNetwork.Router -> Premises.Lan: "[...]"
Premises.HardwareX570.Bridge -> Premises.Lan: "[...]"
Premises.HardwareB550m.Bridge -> Premises.Lan: "[...]"
`;case`storage`:return`direction: right

Premises: {
  label: "自宅"

  Home: {
    label: "Talos / home-k8s"

    Nextcloud: {
      label: "Nextcloud"
    }
    Recording: {
      label: "録画・配信 / EPGStation・TNLaStation"
    }
    AgentLocal_store: {
      label: "VictoriaMetrics / 自宅"
      shape: stored_data
    }
  }
  Hardware: {
    label: "物理・ネットワーク"

    X570: {
      label: "pve-x570 / Proxmox"
    }
    B550m: {
      label: "pve-b550m / Proxmox"
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
  Hardware: {
    label: "物理・ネットワーク"

    Network: {
      label: "ネットワーク機器"
    }
  }
  Home: {
    label: "Talos / home-k8s"
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
External.Edge.Routes.Protected -> Premises.Data.Nas: "認証後の内部接続"
External.Edge.Routes.Protected -> Premises.Management.Argo: "認証後の内部接続"
External.Edge.Tunnel -> Consumers.Reventer: "hostname転送"
External.Edge.Routes.Protected -> Premises.Hardware.Network: "認証後の内部接続"
`;case`placement`:return`direction: right

HomeSite: {
  label: "自宅 / Proxmox2ホスト・RPi"

  Worker_pi1: {
    label: "RPi / worker03 / VLAN10"
  }
  Worker_pi2: {
    label: "RPi / worker04 / VLAN10"
  }
  Network: {
    label: "ネットワーク機器 / IX2215・SW・AP"
  }
  X570: {
    label: "pve-x570"
  }
  B550m: {
    label: "pve-b550m"
  }
  Talos: {
    label: "home-k8s"
  }
  Lan: {
    label: "LAN / VLAN・経路"
  }
}

HomeSite.X570 -> HomeSite.Talos: "[...]"
HomeSite.B550m -> HomeSite.Talos: "[...]"
HomeSite.Worker_pi1 -> HomeSite.Talos: "worker / home-k8s所属"
HomeSite.Worker_pi2 -> HomeSite.Talos: "worker / home-k8s所属"
HomeSite.Talos -> HomeSite.Worker_pi1: "[...]"
HomeSite.Talos -> HomeSite.Worker_pi2: "[...]"
HomeSite.Network -> HomeSite.X570: "native1管理 / ゲストtag20・30 / 配線ポート未確定"
HomeSite.Network -> HomeSite.B550m: "native1管理 / ゲストtag20・40 / 配線ポート未確定"
HomeSite.X570 -> HomeSite.Lan: "[...]"
HomeSite.B550m -> HomeSite.Lan: "[...]"
HomeSite.Talos -> HomeSite.Lan: "L2広告 / Service IP .200-.226"
HomeSite.Network -> HomeSite.Lan: "[...]"
`;case`recording`:return`direction: right

ExternalEdge: {
  label: "Cloudflare"
}
PremisesHomeRecordingEpgstation: {
  label: "EPGStation"
}
PremisesHomeRecordingTnlastation: {
  label: "TNLaStation / 共通モデル"

  Resources: {
    label: "リソース定義"
  }
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
PremisesHomeRecordingMirakurun: {
  label: "Mirakurun Service / 本番LXCへの中継"
}
PremisesHomeRecordingMirakurun_staging: {
  label: "Mirakurun Service / STG LXCへの中継"
}
PremisesDataDatabases: {
  label: "DB / アプリ共有基盤"
}
PremisesHardwareTuner_stg: {
  label: "Mirakurun STG / CT12904・PX-S1UD"
}
PremisesDataNasNas02: {
  label: "TrueNAS VM69002 / nas-02"
  shape: stored_data
}
PremisesHardwareTuner_prod: {
  label: "Mirakurun本番 / CT12901・PT3"
}

ExternalEdge -> PremisesHomeRecordingEpgstation: "epgstation / 8888 / Access"
ExternalEdge -> PremisesHomeRecordingTnlastation.Gateway: "[...]"
PremisesHomeRecordingTnlastation.Gateway -> PremisesHomeRecordingTnlastation.Frontend: "Web"
PremisesHomeRecordingTnlastation.Gateway -> PremisesHomeRecordingTnlastation.Backend: "API"
PremisesHomeRecordingTnlastation.Gateway -> PremisesHomeRecordingTnlastation.Mediamtx: "HLS"
PremisesHomeRecordingTnlastation.Backend -> PremisesHomeRecordingTnlastation.Encode: "encode制御"
PremisesHomeRecordingTnlastation.Backend -> PremisesHomeRecordingTnlastation.Streaming: "streaming制御"
PremisesHomeRecordingTnlastation.Streaming -> PremisesHomeRecordingTnlastation.Mediamtx: "配信"
PremisesHomeRecordingEpgstation -> PremisesHomeRecordingMirakurun: "tuner API"
PremisesHomeRecordingTnlastation.Backend -> PremisesHomeRecordingMirakurun: "tuner API"
PremisesHomeRecordingTnlastation.Backend -> PremisesHomeRecordingMirakurun_staging: "STG環境のチューナーAPI"
PremisesHomeRecordingMirakurun -> PremisesHardwareTuner_prod: "EndpointSlice / 外部LXC"
PremisesHomeRecordingMirakurun_staging -> PremisesHardwareTuner_stg: "EndpointSlice / 外部LXC"
PremisesHardwareTuner_stg -> PremisesHardwareTuner_prod: "BS/CS TCP fallback"
PremisesHomeRecordingEpgstation -> PremisesDataDatabases: "EPGStation DB"
PremisesHomeRecordingTnlastation.Backend -> PremisesDataDatabases: "PostgreSQL"
PremisesHomeRecordingTnlastation.Encode -> PremisesDataDatabases: "encode状態"
PremisesDataDatabases -> PremisesDataNasNas02: "DB用NFS PVC"
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
  label: "pve-x570 / Proxmox"
}
PremisesHardwareB550m: {
  label: "pve-b550m / Proxmox"
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