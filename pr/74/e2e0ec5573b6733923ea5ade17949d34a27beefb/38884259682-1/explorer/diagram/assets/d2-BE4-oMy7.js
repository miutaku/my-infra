var e=e=>{switch(e){case`index`:return`direction: right

HomeSite: {
  label: "自宅"

  Pve: {
    label: "Proxmox VEクラスタ"

    X570Cp1: {
      label: "home-k8s CP01 / VM13001 / VLAN20"
    }
    X570Worker1: {
      label: "home-k8s worker01 / VM13004 / VLAN20"
    }
    B550mCp2: {
      label: "home-k8s CP02 / VM13002 / VLAN20"
    }
    B550mCp3: {
      label: "home-k8s CP03 / VM13003 / VLAN20"
    }
    B550mWorker2: {
      label: "home-k8s worker02 / VM13005 / VLAN20"
    }
    X570Nas1: {
      label: "nas-01 / TrueNAS VM69001 / runner cache / VLAN20"
      shape: stored_data
    }
    B550mNas2: {
      label: "nas-02 / TrueNAS VM69002 / アプリ・録画データ / VLAN20"
      shape: stored_data
    }
    X570Pbs: {
      label: "PBS VM14001 / VLAN20"
      shape: stored_data
    }
  }
  Network: {
    label: "ネットワーク機器 / IX2215・SW・AP"
  }
  Worker_pi1: {
    label: "Raspberry Pi / home-k8s worker03 / VLAN10"
  }
  Worker_pi2: {
    label: "Raspberry Pi / home-k8s worker04 / VLAN10"
  }
}
Providers: {
  label: "外部サービス"

  Cloudflare: {
    label: "Cloudflare"
  }
  Bitwarden: {
    label: "Bitwarden Secrets Manager"
  }
  Idrive: {
    label: "IDrive e2（S3互換）"
    shape: stored_data
  }
}

HomeSite.Network -> HomeSite.Worker_pi1: "VLAN10"
HomeSite.Network -> HomeSite.Worker_pi2: "VLAN10"
HomeSite.Network -> HomeSite.Pve: "宅内LAN"
HomeSite -> Providers.Idrive: "バックアップ"
Providers.Cloudflare -> HomeSite: "Access・Tunnel"
Providers.Bitwarden -> HomeSite: "Secret同期"
`;case`home_apps`:return`direction: right

PremisesHome: {
  label: "home-k8s（Talos Linux）"

  Platform: {
    label: "home-k8s クラスタ基盤"
  }
  Agent: {
    label: "自宅監視基盤"
  }
  Management: {
    label: "クラスタ運用"
  }
  Eso: {
    label: "External Secrets Operator"
  }
  Dns: {
    label: "内部DNS / MetalLB"
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
  Databases: {
    label: "DB / アプリ共有基盤"
  }
}
PremisesPveKiosk: {
  label: "MagicMirror表示 / VM5000"
}
ExternalEdge: {
  label: "Cloudflare"
}
PremisesPveNas02: {
  label: "nas-02 / TrueNAS VM69002"
  shape: stored_data
}
ExternalAnnict: {
  label: "Annict API"
}

PremisesPveKiosk -> PremisesHome.Apps.Magic_mirror: "表示"
PremisesHome.Apps.Annict_scraper -> ExternalAnnict: "Annict API"
ExternalEdge -> PremisesHome: "認証済みHTTP / Access・mTLS → 内部Service"
PremisesPveNas02 -> PremisesHome: "アプリ・DB・監視のNFS"
`;case`delivery`:return`direction: down

Premises: {
  label: "自宅"

  Home: {
    label: "home-k8s（Talos Linux）"

    ManagementImages: {
      label: "Image Updater"
    }
    ManagementArgo: {
      label: "自宅ArgoCD"
    }
    ManagementRunner: {
      label: "ARC / 共用のrunner制御基盤"
    }
    ManagementTfc_agents: {
      label: "Terraform Cloud agents / 自宅"
    }
  }
  Management: {
    label: "自宅基盤の構成管理"

    Ansible: {
      label: "Ansible"
    }
    Packer: {
      label: "Packer / VM template"
    }
  }
  Hardware: {
    label: "物理・ネットワーク"

    Network: {
      label: "ネットワーク機器"
    }
  }
  Pve: {
    label: "Proxmox VEクラスタ"
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

External.Github -> Premises.Home.ManagementArgo: "GitOps"
External.Github -> Premises.Home.ManagementRunner: "Actions job"
External.Github -> External.Terraform_cloud: "Terraform実行"
External.Terraform_cloud -> Premises.Home.ManagementTfc_agents: "workspace runを自宅agentで実行"
External.Github -> External.Github_pages: "構成図・PR比較を公開"
Premises.Home.ManagementTfc_agents -> Premises.Pve: "VM / ネットワーク"
Premises.Management.Ansible -> Premises.Pve: "VM・NAS・LXC設定"
Premises.Management.Packer -> Premises.Pve: "VM template"
External.Terraform_cloud -> External.Edge: "DNS / Access / Tunnel"
Premises.Management.Ansible -> Premises.Hardware: "NW・UPS機器設定"
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
  HomeBackups: {
    label: "バックアップ処理"
  }
}

External.Bws -> Premises.HomeEso: "Secret注入"
External.Bws -> External.Github: "CI credential"
External.Bws -> External.Terraform_cloud: "Terraform変数"
External.Bws -> Premises.ManagementAnsible: "機器・PBS用credential"
External.Bws -> Premises.HomeBackups: "ESO経由 / backup credential"
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
    label: "home-k8s（Talos Linux）"

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
Premises.Home.Agent.Pdc -> Premises.Home.Agent.Local_store: "private query / :8428"
Premises.Home.Agent.Exporters -> Premises.Home.Agent.Collector: "scrape"
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
PremisesPveLoockit_a: {
  label: "Loockit 01 / CT12902"
}
PremisesPveLoockit_b: {
  label: "Loockit 02 / CT12903"
}
PremisesPveX570Bluez: {
  label: "BlueZ / USB Bluetooth"
}
PremisesPveB550mBluez: {
  label: "BlueZ / USB Bluetooth"
}
PremisesHomePlatformApi: {
  label: "Kubernetes API / Lease"
}

Client -> ExternalEdgeMtls: "クライアント証明書"
ExternalEdgeMtls -> ExternalEdgeTunnel: "mTLS検証済みのAPIリクエスト"
ExternalEdgeTunnel -> PremisesHomeAppsLoockitProxy: "loockit-api / 8080 / mTLS"
PremisesHomeAppsLoockitProxy -> PremisesPveLoockit_a: "readyz / leaderのみ"
PremisesHomeAppsLoockitProxy -> PremisesPveLoockit_b: "readyz / leaderのみ"
PremisesPveLoockit_a -> PremisesPveX570Bluez: "read-only D-Bus / org.bluez"
PremisesPveLoockit_b -> PremisesPveB550mBluez: "read-only D-Bus / org.bluez"
PremisesPveLoockit_a -> PremisesHomePlatformApi: "Lease leader election"
PremisesPveLoockit_b -> PremisesHomePlatformApi: "Lease leader election"
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
PremisesHomeDatabasesMariadb: {
  label: "MariaDB"
  shape: stored_data
}
PremisesPveNas02: {
  label: "nas-02 / TrueNAS VM69002"
  shape: stored_data
}

ExternalEdge -> PremisesHomeNextcloud.Web: "nextcloud / 80 / Access"
PremisesHomeNextcloud.Web -> PremisesHomeNextcloud.Redis: "Redis :6379 / locking・cache"
PremisesHomeNextcloud.Web -> PremisesHomeDatabasesMariadb: "MYSQL_HOST / MariaDB"
PremisesHomeNextcloud.Web -> PremisesPveNas02: "html・data / NFS"
`;case`placement`:return`direction: down

HomeSitePve: {
  label: "Proxmox VEクラスタ"

  X570: {
    label: "pve-x570"

    Cp1: {
      label: "home-k8s CP01 / VM13001 / VLAN20"

      Talos: {
        label: "Talos Linux"
      }
    }
    Worker1: {
      label: "home-k8s worker01 / VM13004 / VLAN20"

      Talos: {
        label: "Talos Linux"
      }
    }
    Lb: {
      label: "HAProxy / Keepalived VM10001 / VLAN20"
    }
    Pbs: {
      label: "PBS VM14001 / VLAN20"
      shape: stored_data
    }
    Unifi: {
      label: "UniFi OS VM13201 / native1"

      App: {
        label: "Podman / UniFi OS・Network"
      }
    }
    Loockit: {
      label: "Loockit 01 / CT12902 / VLAN20"

      App: {
        label: "Docker / Loockit REST・gRPC"
      }
    }
    Tuner: {
      label: "Mirakurun本番 / CT12901・PT3 / VLAN20"

      App: {
        label: "Docker / Mirakurun / PT3"
      }
    }
    Windows: {
      label: "Windows / VM60000 / VLAN30"
    }
    Nas1: {
      label: "nas-01 / TrueNAS VM69001 / runner cache / VLAN20"
      shape: stored_data
    }
  }
  B550m: {
    label: "pve-b550m"

    Cp2: {
      label: "home-k8s CP02 / VM13002 / VLAN20"

      Talos: {
        label: "Talos Linux"
      }
    }
    Cp3: {
      label: "home-k8s CP03 / VM13003 / VLAN20"

      Talos: {
        label: "Talos Linux"
      }
    }
    Worker2: {
      label: "home-k8s worker02 / VM13005 / VLAN20"

      Talos: {
        label: "Talos Linux"
      }
    }
    Lb: {
      label: "HAProxy / Keepalived VM10002 / VLAN20"
    }
    Dev: {
      label: "開発用Docker / VM40000 / VLAN20"
    }
    Kiosk: {
      label: "MagicMirror表示 / VM5000 / VLAN40"
    }
    Loockit: {
      label: "Loockit 02 / CT12903 / VLAN20"

      App: {
        label: "Docker / Loockit REST・gRPC"
      }
    }
    Tuner: {
      label: "Mirakurun STG / CT12904・PX-S1UD / VLAN20"

      App: {
        label: "Docker / Mirakurun / PX-S1UD"
      }
    }
    Nas2: {
      label: "nas-02 / TrueNAS VM69002 / アプリ・録画データ / VLAN20"
      shape: stored_data
    }
  }
}
`;case`recording_prd`:return`direction: right

PremisesHome: {
  label: "home-k8s（Talos Linux）"

  RecordingTnlastation: {
    label: "TNLaStation PRD"

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
  RecordingMirakurun: {
    label: "Mirakurun Service / 本番LXCへの中継"
  }
  DatabasesPostgres: {
    label: "PostgreSQL PRD"
    shape: stored_data
  }
}
PremisesPveNas02: {
  label: "nas-02 / TrueNAS VM69002"
  shape: stored_data
}

PremisesHome.RecordingTnlastation.Gateway -> PremisesHome.RecordingTnlastation.Frontend: "Web"
PremisesHome.RecordingTnlastation.Gateway -> PremisesHome.RecordingTnlastation.Backend: "API"
PremisesHome.RecordingTnlastation.Gateway -> PremisesHome.RecordingTnlastation.Mediamtx: "HLS"
PremisesHome.RecordingTnlastation.Backend -> PremisesHome.RecordingTnlastation.Encode: "encode制御"
PremisesHome.RecordingTnlastation.Backend -> PremisesHome.RecordingTnlastation.Streaming: "streaming制御"
PremisesHome.RecordingTnlastation.Streaming -> PremisesHome.RecordingTnlastation.Mediamtx: "配信"
PremisesHome.RecordingTnlastation.Backend -> PremisesHome.RecordingMirakurun: "tuner API"
PremisesHome.RecordingTnlastation.Backend -> PremisesHome.DatabasesPostgres: "PostgreSQL"
PremisesHome.RecordingTnlastation.Encode -> PremisesHome.DatabasesPostgres: "encode状態"
PremisesHome.RecordingTnlastation -> PremisesPveNas02: "recorded・tnlastation / NFS"
`;case`recording_stg`:return`direction: right

PremisesHome: {
  label: "home-k8s（Talos Linux）"

  RecordingTnlastation_staging: {
    label: "TNLaStation STG"

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
  RecordingMirakurun_staging: {
    label: "Mirakurun Service / STG LXCへの中継"
  }
  DatabasesPostgres_staging: {
    label: "PostgreSQL STG"
    shape: stored_data
  }
}
PremisesPveNas02: {
  label: "nas-02 / TrueNAS VM69002"
  shape: stored_data
}

PremisesHome.RecordingTnlastation_staging.Gateway -> PremisesHome.RecordingTnlastation_staging.Frontend: "Web"
PremisesHome.RecordingTnlastation_staging.Gateway -> PremisesHome.RecordingTnlastation_staging.Backend: "API"
PremisesHome.RecordingTnlastation_staging.Gateway -> PremisesHome.RecordingTnlastation_staging.Mediamtx: "HLS"
PremisesHome.RecordingTnlastation_staging.Backend -> PremisesHome.RecordingTnlastation_staging.Encode: "encode制御"
PremisesHome.RecordingTnlastation_staging.Backend -> PremisesHome.RecordingTnlastation_staging.Streaming: "streaming制御"
PremisesHome.RecordingTnlastation_staging.Streaming -> PremisesHome.RecordingTnlastation_staging.Mediamtx: "配信"
PremisesHome.RecordingTnlastation_staging.Backend -> PremisesHome.RecordingMirakurun_staging: "tuner API"
PremisesHome.RecordingTnlastation_staging.Backend -> PremisesHome.DatabasesPostgres_staging: "PostgreSQL"
PremisesHome.RecordingTnlastation_staging.Encode -> PremisesHome.DatabasesPostgres_staging: "encode状態"
PremisesHome.RecordingTnlastation_staging -> PremisesPveNas02: "recorded-staging・tnlastation-staging / NFS"
`;case`vlans`:return`direction: right

Premises: {
  label: "自宅"

  HardwareNetworkSwitch: {
    label: "US-8-60W / 管理スイッチ"
  }
  HardwareNetworkRouter: {
    label: "IX2215 / ルーター・VLAN間ACL"
  }
  PveX570Bridge: {
    label: "enp7s0 / vmbr0"
  }
  PveB550mBridge: {
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
Premises.PveX570Bridge -> Premises.Lan.Server: "VM・LXC tag20"
Premises.PveX570Bridge -> Premises.Lan.Client: "Windows VM tag30"
Premises.PveB550mBridge -> Premises.Lan.Server: "VM・LXC tag20"
Premises.PveB550mBridge -> Premises.Lan.Iot: "kiosk VM tag40"
ExternalEdgeWarp -> Premises.Lan.Server: "private CIDR routes / WARP policy"
Premises.HomeDns -> Premises.Lan.Server: "L2広告 / Service IP .200-.226"
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
PremisesHomeManagementArgo: {
  label: "自宅ArgoCD"
}
PremisesHomeManagementRunner: {
  label: "ARC / 共用のrunner制御基盤"
}
PremisesHomePlatformCloudflared: {
  label: "cloudflared / 自宅connector"
}
PremisesHomeDnsCoredns: {
  label: "CoreDNS / miutaku.internal"
}
PremisesHomeEso: {
  label: "External Secrets Operator"
}
ExternalEdge: {
  label: "Cloudflare"
}
ExternalPublic_dns: {
  label: "Public DNS / 1.1.1.1・8.8.8.8"
}
PremisesHomePlatformApi: {
  label: "Kubernetes API / Lease"
}
PremisesLanServer: {
  label: "VLAN20 / 192.168.20.0/24"
}
PremisesHomePlatformWorker: {
  label: "home-k8s worker"
}
PremisesHomePlatformCluster_dns: {
  label: "CoreDNS / cluster.local"
}

PremisesHomePlatformDescheduler -> PremisesHomePlatformApi: "Podのeviction / 配置再調整"
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
PremisesHomeManagementArgo -> PremisesHomePlatformApi: "manifest同期 / Kubernetes API"
PremisesHomeManagementRunner -> PremisesHomePlatformApi: "runner Podの作成・削除"
PremisesHomePlatformCloudflared -> ExternalEdge: "外向きTunnel接続"
PremisesHomeDnsMetallb -> PremisesLanServer: "L2広告 / Service IP .200-.226"
ExternalEdge -> PremisesLanServer: "private CIDR routes / WARP policy"
`;case`network`:return`direction: down

ExternalInternet: {
  label: "Internet"
}
Premises: {
  label: "自宅"

  PveUnifi: {
    label: "UniFi OS / VM13201"
  }
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
  PveX570: {
    label: "pve-x570 / Proxmox"

    Bridge: {
      label: "enp7s0 / vmbr0"
    }
  }
  PveB550m: {
    label: "pve-b550m / Proxmox"

    Bridge: {
      label: "enp6s0 / vmbr0"
    }
  }
  Lan: {
    label: "LAN / VLAN・経路"
  }
}

ExternalInternet -> Premises.HardwareNetwork.Router: "WAN / GigaEthernet0"
Premises.HardwareNetwork.Router -> Premises.HardwareNetwork.Ethernet: "GigaEthernet2 / native1 + tag10,20,30,31,40"
Premises.HardwareNetwork.Ethernet -> Premises.HardwareNetwork.Switch: "802.1Q / uplink"
Premises.HardwareNetwork.Ethernet -> Premises.HardwareNetwork.Ap: "AP trunk"
Premises.HardwareNetwork.Ethernet -> Premises.PveX570.Bridge: "native1管理 / ゲストtag20・30"
Premises.HardwareNetwork.Ethernet -> Premises.PveB550m.Bridge: "native1管理 / ゲストtag20・40"
Premises.PveUnifi -> Premises.HardwareNetwork.Switch: "構成・監視を管理"
Premises.HardwareNetwork.Router -> Premises.Lan: "[...]"
Premises.PveX570.Bridge -> Premises.Lan: "[...]"
Premises.PveB550m.Bridge -> Premises.Lan: "[...]"
`;case`storage`:return`direction: right

Premises: {
  label: "自宅"

  Home: {
    label: "home-k8s（Talos Linux）"

    Agent: {
      label: "自宅監視基盤"

      Local_store: {
        label: "VictoriaMetrics / 自宅"
        shape: stored_data
      }
    }
    Nextcloud: {
      label: "Nextcloud"
    }
    Recording: {
      label: "録画・配信 / EPGStation・TNLaStation"
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
      Postgres_staging: {
        label: "PostgreSQL STG"
        shape: stored_data
      }
      Postgres: {
        label: "PostgreSQL PRD"
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
  }
  Pve: {
    label: "Proxmox VEクラスタ"

    Nas02: {
      label: "nas-02 / TrueNAS VM69002"
      shape: stored_data
    }
    Nas01: {
      label: "nas-01 / TrueNAS VM69001"
      shape: stored_data
    }
    X570: {
      label: "pve-x570 / Proxmox"
    }
    B550m: {
      label: "pve-b550m / Proxmox"
    }
    Pbs: {
      label: "PBS / VM14001"
      shape: stored_data
    }
  }
}
External: {
  label: "外部サービス / SaaS・公開サービス"

  Idrive: {
    label: "IDrive e2（S3互換）"
    shape: stored_data
  }
}

Premises.Home.Nextcloud -> Premises.Pve.Nas02: "html・data / NFS"
Premises.Home.Recording -> Premises.Pve.Nas02: "[...]"
Premises.Home.Agent.Local_store -> Premises.Pve.Nas02: "metrics用NFS PVC"
Premises.Home.Nextcloud -> Premises.Home.Databases.Mariadb: "MYSQL_HOST / MariaDB"
Premises.Home.Recording -> Premises.Home.Databases.Mariadb: "EPGStation DB"
Premises.Home.Recording -> Premises.Home.Databases.Postgres_staging: "[...]"
Premises.Home.Recording -> Premises.Home.Databases.Postgres: "[...]"
Premises.Home.Shared -> Premises.Pve.Nas01: "runner cache / NFS"
Premises.Home.Recording -> Premises.Home.Backups.Recordings: "録画ファイル専用job"
Premises.Home.Agent.Local_store -> Premises.Home.Backups.Metrics: "snapshot / vmbackup"
Premises.Pve.Nas02 -> Premises.Home.Backups.Nas: "対象dataset / restic"
Premises.Pve.Pbs -> External.Idrive: "S3 datastore / VM backup"
Premises.Pve.X570 -> Premises.Pve.Pbs: "VM backup"
Premises.Pve.B550m -> Premises.Pve.Pbs: "VM backup"
Premises.Home.Databases -> Premises.Pve.Nas02: "DB用NFS PVC"
Premises.Home.Databases -> Premises.Home.Backups.Db: "整合性あるlogical dump"
Premises.Home.Backups -> External.Idrive: "用途別prefix / 暗号化・retention"
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

  Home: {
    label: "home-k8s（Talos Linux）"

    ManagementArgo: {
      label: "自宅ArgoCD"
    }
  }
  Hardware: {
    label: "物理・ネットワーク"

    Network: {
      label: "ネットワーク機器"
    }
  }
  Pve: {
    label: "Proxmox VEクラスタ"
  }
}

User -> External.Edge.Access: "HTTPS / 利用時の認証"
Operator -> External.Edge.Access: "HTTPS / 管理時の認証"
Client -> External.Edge.Mtls: "クライアント証明書"
External.Edge.Access -> External.Edge.Tunnel: "Access認証後の転送"
External.Edge.Mtls -> External.Edge.Tunnel: "mTLS検証済みのAPIリクエスト"
External.Edge.Tunnel -> External.Edge.Routes.Protected: "hostname転送"
External.Edge.Tunnel -> External.Edge.Routes.Exceptions: "hostname転送"
External.Edge.Routes.Protected -> Premises.Pve: "認証後の内部接続"
External.Edge.Routes.Protected -> Premises.Home.ManagementArgo: "認証後の内部接続"
External.Edge.Tunnel -> Consumers.Reventer: "hostname転送"
External.Edge.Routes.Protected -> Premises.Hardware.Network: "認証後の内部接続"
`;case`recording`:return`direction: right

PremisesHome: {
  label: "home-k8s（Talos Linux）"

  Recording: {
    label: "録画・配信 / EPGStation・TNLaStation"

    Epgstation: {
      label: "EPGStation"
    }
    Tnlastation: {
      label: "TNLaStation PRD"
    }
    Tnlastation_staging: {
      label: "TNLaStation STG"
    }
    Mirakurun: {
      label: "Mirakurun Service / 本番LXCへの中継"
    }
    Mirakurun_staging: {
      label: "Mirakurun Service / STG LXCへの中継"
    }
  }
}
PremisesPveTuner_stg: {
  label: "Mirakurun STG / CT12904・PX-S1UD"
}
PremisesPveTuner_prod: {
  label: "Mirakurun本番 / CT12901・PT3"
}

PremisesHome.Recording.Epgstation -> PremisesHome.Recording.Mirakurun: "tuner API"
PremisesHome.Recording.Tnlastation -> PremisesHome.Recording.Mirakurun: "tuner API"
PremisesHome.Recording.Tnlastation_staging -> PremisesHome.Recording.Mirakurun_staging: "tuner API"
PremisesHome.Recording.Mirakurun -> PremisesPveTuner_prod: "EndpointSlice / 外部LXC"
PremisesHome.Recording.Mirakurun_staging -> PremisesPveTuner_stg: "EndpointSlice / 外部LXC"
PremisesPveTuner_stg -> PremisesPveTuner_prod: "BS/CS TCP fallback"
`;case`power`:return`direction: right

PremisesHardware: {
  label: "物理・ネットワーク"

  Ups: {
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
      label: "NUT Pi 01 / 192.168.10.112"
    }
    Pi_b: {
      label: "NUT Pi 02 / 192.168.10.113"
    }
  }
  Network: {
    label: "ネットワーク機器"
  }
}
PremisesPve: {
  label: "Proxmox VEクラスタ"

  X570: {
    label: "pve-x570 / Proxmox"
  }
  B550m: {
    label: "pve-b550m / Proxmox"
  }
}

PremisesHardware.Ups.Mains -> PremisesHardware.Ups.Surge_a: "非バックアップ出力"
PremisesHardware.Ups.Mains -> PremisesHardware.Ups.Ups_a: "AC入力"
PremisesHardware.Ups.Surge_a -> PremisesHardware.Ups.Ups_b: "UPS BのAC入力"
PremisesHardware.Ups.Ups_a -> PremisesHardware.Ups.Pi_a: "USB / ups-a"
PremisesHardware.Ups.Ups_a -> PremisesHardware.Ups.Pi_b: "Pi 02へ給電"
PremisesHardware.Ups.Ups_b -> PremisesHardware.Ups.Pi_a: "Pi 01へ給電"
PremisesHardware.Ups.Ups_b -> PremisesHardware.Ups.Pi_b: "USB / ups-b"
PremisesHardware.Ups.Pi_a -> PremisesHardware.Ups.Pi_b: "ups-b@192.168.10.113 / 給電元Bを監視"
PremisesHardware.Ups.Pi_b -> PremisesHardware.Ups.Pi_a: "ups-a@192.168.10.112 / 給電元Aを監視"
PremisesHardware.Ups.Ups_a -> PremisesPve.X570: "バッテリー給電"
PremisesPve.X570 -> PremisesHardware.Ups.Pi_a: "charge-guard監視 / 80%で自身停止"
PremisesHardware.Ups.Ups_b -> PremisesPve.B550m: "バッテリー給電"
PremisesPve.B550m -> PremisesHardware.Ups.Pi_b: "charge-guard監視 / 80%で自身停止"
PremisesHardware.Ups.Ups_b -> PremisesHardware.Network: "NW機器へ給電"
`;default:throw Error(`Unknown viewId: `+e)}};export{e as d2Source};