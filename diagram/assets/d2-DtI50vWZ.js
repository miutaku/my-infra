var e=e=>{switch(e){case`index`:return`direction: down

Operator: {
  label: "管理者"
  shape: c4-person
}
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
User: {
  label: "利用者"
  shape: c4-person
}
Oke: {
  label: "OCI / STG OKE共通基盤"
}
Home: {
  label: "自宅 / home-k8s"

  Eso: {
    label: "External Secrets Operator"
  }
  Agent: {
    label: "収集agent"
  }
  Nextcloud: {
    label: "Nextcloud"
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

  Grafana: {
    label: "Grafana Cloud / PDC"
  }
  Vms: {
    label: "OCI監視VM / STG・PRD"
    shape: stored_data
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
Edge.Access -> Control.Argo: "Tunnel / 管理UI"
Bws -> Home.Eso: "Secret注入"
Bws -> Oke: "Secret注入"
Home.Agent -> Monitoring.Vms: "metrics / logs"
Oke -> Monitoring.Vms: "metrics / logs"
Operator -> Monitoring.Grafana: "照会"
Monitoring.Grafana -> Monitoring.Vms: "PDC経由"
Home.Nextcloud -> Data.Nas: "NFS / PVC"
User -> Edge: "HTTPS"
Edge -> Home: "Tunnel / 内部HTTP"
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
  }
  Dns: {
    label: "内部DNS / MetalLB"
  }
}
Data: {
  label: "保存・バックアップ"

  Nas: {
    label: "TrueNAS / NFS"
    shape: stored_data
  }
}

User -> Edge: "HTTPS"
Home.Nextcloud -> Data.Nas: "NFS / PVC"
Home.Recording -> Data.Nas: "メディア保存"
Edge -> Home: "Tunnel / 内部HTTP"
`;case`delivery`:return`direction: down

Control: {
  label: "変更・運用"

  Git: {
    label: "GitHub / コード・Actions"
  }
  Ansible: {
    label: "Ansible"
  }
  Tfc: {
    label: "Terraform Cloud"
  }
  Argo: {
    label: "自宅ArgoCD"
  }
  Runner: {
    label: "ARC / 専用runner"
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

Control.Git -> Control.Tfc: "Terraform実行"
Control.Git -> Control.Argo: "GitOps"
Control.Git -> Control.Runner: "Actions job"
Control.Argo -> Home: "manifest同期"
Control.Git -> Oke.Argo: "GitOps"
Oke.Argo -> Oke.Api: "共通基盤同期"
Oke.Scale -> Oke.Api: "burst pool増減"
Control.Argo -> Reventer: "STG・PRDアプリ同期"
Control.Tfc -> Hardware: "VM / ネットワーク"
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
Control: {
  label: "変更・運用"

  Git: {
    label: "GitHub / コード・Actions"
  }
  Tfc: {
    label: "Terraform Cloud"
  }
}

Bws -> Home.Eso: "Secret注入"
Bws -> Oke.Eso: "Secret注入"
Bws -> Control.Git: "CI credential"
Bws -> Control.Tfc: "Terraform変数"
`;case`observability`:return`direction: right

Hardware: {
  label: "物理・ネットワーク"
}
Operator: {
  label: "管理者"
  shape: c4-person
}
Oke: {
  label: "OCI / STG OKE共通基盤"
}
Home: {
  label: "自宅 / home-k8s"

  Agent: {
    label: "収集agent"
  }
}
Monitoring: {
  label: "監視"

  Grafana: {
    label: "Grafana Cloud / PDC"
  }
  Vms: {
    label: "OCI監視VM / STG・PRD"
    shape: stored_data
  }
}

Hardware -> Home.Agent: "exporter収集"
Operator -> Monitoring.Grafana: "照会"
Home.Agent -> Monitoring.Vms: "metrics / logs"
Oke -> Monitoring.Vms: "metrics / logs"
Monitoring.Grafana -> Monitoring.Vms: "PDC経由"
`;case`placement`:return`direction: right

HomeSite: {
  label: "自宅 / Proxmox2ホスト・RPi"
}
Stg: {
  label: "OCI / STG OKE共通基盤"
}
Application: {
  label: "reventer所有 / STG・PRDアプリ・PRD OKE"
}
`;default:throw Error(`Unknown viewId: `+e)}};export{e as d2Source};