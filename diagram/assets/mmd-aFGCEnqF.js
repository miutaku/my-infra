var e=e=>{switch(e){case`index`:return`---
title: "全体構成"
---
graph TB
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  subgraph Edge["\`Cloudflare\`"]
    Edge.Tunnel@{ shape: rectangle, label: "Cloudflare Tunnel" }
    Edge.Access@{ shape: rectangle, label: "Access / 認証" }
  end
  Bws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  Oke@{ shape: rectangle, label: "OCI / STG OKE共通基盤" }
  subgraph Home["\`自宅 / home-k8s\`"]
    Home.Eso@{ shape: rectangle, label: "External Secrets Operator" }
    Home.Agent@{ shape: rectangle, label: "収集agent" }
    Home.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
  end
  subgraph Control["\`変更・運用\`"]
    Control.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
  end
  subgraph Monitoring["\`監視\`"]
    Monitoring.Grafana@{ shape: rectangle, label: "Grafana Cloud / PDC" }
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
  end
  subgraph Data["\`保存・バックアップ\`"]
    Data.Nas@{ shape: disk, label: "TrueNAS / NFS" }
  end
  Operator -. "\`管理認証\`" .-> Edge.Access
  Edge.Access -. "\`Tunnel / 管理UI\`" .-> Control.Argo
  Bws -. "\`Secret注入\`" .-> Home.Eso
  Bws -. "\`Secret注入\`" .-> Oke
  Home.Agent -. "\`metrics / logs\`" .-> Monitoring.Vms
  Oke -. "\`metrics / logs\`" .-> Monitoring.Vms
  Operator -. "\`照会\`" .-> Monitoring.Grafana
  Monitoring.Grafana -. "\`PDC経由\`" .-> Monitoring.Vms
  Home.Nextcloud -. "\`NFS / PVC\`" .-> Data.Nas
  User -. "\`HTTPS\`" .-> Edge
  Edge -. "\`Tunnel / 内部HTTP\`" .-> Home
`;case`home_apps`:return`---
title: "自宅のサービス・保存"
---
graph LR
  User@{ icon: "fa:user", shape: rounded, label: "利用者" }
  Edge@{ shape: rectangle, label: "Cloudflare" }
  subgraph Home["\`自宅 / home-k8s\`"]
    Home.Nextcloud@{ shape: rectangle, label: "Nextcloud" }
    Home.Recording@{ shape: rectangle, label: "録画・配信" }
    Home.Apps@{ shape: rectangle, label: "宅内アプリ" }
    Home.Dns@{ shape: rectangle, label: "内部DNS / MetalLB" }
  end
  subgraph Data["\`保存・バックアップ\`"]
    Data.Nas@{ shape: disk, label: "TrueNAS / NFS" }
  end
  User -. "\`HTTPS\`" .-> Edge
  Home.Nextcloud -. "\`NFS / PVC\`" .-> Data.Nas
  Home.Recording -. "\`メディア保存\`" .-> Data.Nas
  Edge -. "\`Tunnel / 内部HTTP\`" .-> Home
`;case`delivery`:return`---
title: "変更・デプロイ"
---
graph TB
  subgraph Control["\`変更・運用\`"]
    Control.Git@{ shape: rectangle, label: "GitHub / コード・Actions" }
    Control.Ansible@{ shape: rectangle, label: "Ansible" }
    Control.Tfc@{ shape: rectangle, label: "Terraform Cloud" }
    Control.Argo@{ shape: rectangle, label: "自宅ArgoCD" }
    Control.Runner@{ shape: rectangle, label: "ARC / 専用runner" }
  end
  Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
  Edge@{ shape: rectangle, label: "Cloudflare" }
  subgraph Monitoring["\`監視\`"]
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
  end
  subgraph Oke["\`OCI / STG OKE共通基盤\`"]
    Oke.Argo@{ shape: rectangle, label: "OKE ArgoCD" }
    Oke.Scale@{ shape: rectangle, label: "Cluster Autoscaler" }
    Oke.Api@{ shape: rectangle, label: "OKE API / Node pools" }
  end
  Home@{ shape: rectangle, label: "自宅 / home-k8s" }
  Reventer@{ shape: rectangle, label: "Re:Venter / STG・PRD" }
  Control.Git -. "\`Terraform実行\`" .-> Control.Tfc
  Control.Git -. "\`GitOps\`" .-> Control.Argo
  Control.Git -. "\`Actions job\`" .-> Control.Runner
  Control.Argo -. "\`manifest同期\`" .-> Home
  Control.Git -. "\`GitOps\`" .-> Oke.Argo
  Oke.Argo -. "\`共通基盤同期\`" .-> Oke.Api
  Oke.Scale -. "\`burst pool増減\`" .-> Oke.Api
  Control.Argo -. "\`STG・PRDアプリ同期\`" .-> Reventer
  Control.Tfc -. "\`VM / ネットワーク\`" .-> Hardware
  Control.Ansible -. "\`機器設定\`" .-> Hardware
  Control.Tfc -. "\`DNS / Access / Tunnel\`" .-> Edge
  Control.Tfc -. "\`監視VM\`" .-> Monitoring.Vms
  Control.Tfc -. "\`OCI / OKE\`" .-> Oke
`;case`secrets`:return`---
title: "秘密情報の管理・注入"
---
graph LR
  Bws@{ shape: rectangle, label: "Bitwarden Secrets Manager" }
  subgraph Home["\`自宅 / home-k8s\`"]
    Home.Eso@{ shape: rectangle, label: "External Secrets Operator" }
  end
  subgraph Oke["\`OCI / STG OKE共通基盤\`"]
    Oke.Eso@{ shape: rectangle, label: "External Secrets Operator" }
  end
  subgraph Control["\`変更・運用\`"]
    Control.Git@{ shape: rectangle, label: "GitHub / コード・Actions" }
    Control.Tfc@{ shape: rectangle, label: "Terraform Cloud" }
  end
  Bws -. "\`Secret注入\`" .-> Home.Eso
  Bws -. "\`Secret注入\`" .-> Oke.Eso
  Bws -. "\`CI credential\`" .-> Control.Git
  Bws -. "\`Terraform変数\`" .-> Control.Tfc
`;case`observability`:return`---
title: "監視の収集・保存・照会"
---
graph LR
  Hardware@{ shape: rectangle, label: "物理・ネットワーク" }
  Operator@{ icon: "fa:user", shape: rounded, label: "管理者" }
  Oke@{ shape: rectangle, label: "OCI / STG OKE共通基盤" }
  subgraph Home["\`自宅 / home-k8s\`"]
    Home.Agent@{ shape: rectangle, label: "収集agent" }
  end
  subgraph Monitoring["\`監視\`"]
    Monitoring.Grafana@{ shape: rectangle, label: "Grafana Cloud / PDC" }
    Monitoring.Vms@{ shape: disk, label: "OCI監視VM / STG・PRD" }
  end
  Hardware -. "\`exporter収集\`" .-> Home.Agent
  Operator -. "\`照会\`" .-> Monitoring.Grafana
  Home.Agent -. "\`metrics / logs\`" .-> Monitoring.Vms
  Oke -. "\`metrics / logs\`" .-> Monitoring.Vms
  Monitoring.Grafana -. "\`PDC経由\`" .-> Monitoring.Vms
`;case`placement`:return`---
title: "所有境界"
---
graph LR
  HomeSite@{ shape: rectangle, label: "自宅 / Proxmox2ホスト・RPi" }
  Stg@{ shape: rectangle, label: "OCI / STG OKE共通基盤" }
  Application@{ shape: rectangle, label: "reventer所有 / STG・PRDアプリ・PRD OKE" }
`;default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};