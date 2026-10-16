var e=e=>{switch(e){case`index`:return`digraph {
  likec4_viewId = "index";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 0.625;
  ranksep = 0.834;
  pad = 0.209;
  fontname = "Arial";
  newrank = true;
  clusterrank = "global";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "cp1" [
    likec4_id = "homeSite.pve.x570.cp1";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">home-k8s CP01 / VM13001 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "worker1" [
    likec4_id = "homeSite.pve.x570.worker1";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">home-k8s worker01 / VM13004 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "cp2" [
    likec4_id = "homeSite.pve.b550m.cp2";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">home-k8s CP02 / VM13002 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "cp3" [
    likec4_id = "homeSite.pve.b550m.cp3";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">home-k8s CP03 / VM13003 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "worker2" [
    likec4_id = "homeSite.pve.b550m.worker2";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">home-k8s worker02 / VM13005 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "nas1" [
    likec4_id = "homeSite.pve.x570.nas1";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">nas-01 / TrueNAS VM69001 /</FONT>>;
    margin = "0.139,0";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "nas2" [
    likec4_id = "homeSite.pve.b550m.nas2";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002 /</FONT>>;
    margin = "0.139,0";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "pbs" [
    likec4_id = "homeSite.pve.x570.pbs";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">PBS VM14001 / VLAN20</FONT>>;
    margin = "0.139,0";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "cloudflare" [
    likec4_id = "providers.cloudflare";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Cloudflare</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Cloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS<BR/>APIとWARPも提供。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "bitwarden" [
    likec4_id = "providers.bitwarden";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Bitwarden Secrets Manager</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Terraform・GitHub Actions・External<BR/>Secretsへ秘密情報を配布。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "network" [
    likec4_id = "homeSite.network";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">ネットワーク機器 / IX2215・SW・AP</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">IX2215・US-8-60W・FS<BR/>AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "idrive" [
    likec4_id = "providers.idrive";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">IDrive e2（S3互換）</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">S3互換の保存先。PBS・DB・NAS・録画・監視のバックアップを保存。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#A35829";
    fontcolor = "#FFE0C2";
    color = "#7E451D";
    penwidth = 2;
    shape = "cylinder";
  ];
  "worker_pi1" [
    likec4_id = "homeSite.worker_pi1";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Raspberry Pi / home-k8s worker03 /<BR/>VLAN10</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">Raspberry Pi / Talos Linux（arm64）</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "worker_pi2" [
    likec4_id = "homeSite.worker_pi2";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Raspberry Pi / home-k8s worker04 /<BR/>VLAN10</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">Raspberry Pi / Talos Linux（arm64）</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  subgraph "cluster_homesite" {
    likec4_id = "homeSite";
    likec4_level = 0;
    likec4_depth = 2;
    fillcolor = "#3f3f3f";
    color = "#2d2d2d";
    style = "filled";
    margin = 50;
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>自宅</B></FONT>>;
    "network";
    "worker_pi1";
    "worker_pi2";
    subgraph "cluster_pve" {
      likec4_id = "homeSite.pve";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#194b9e";
      color = "#1b3d88";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>PROXMOX VEクラスタ</B></FONT>>;
      "cp1";
      "worker1";
      "cp2";
      "cp3";
      "worker2";
      "nas1";
      "nas2";
      "pbs";
    }
  }
  subgraph "cluster_providers" {
    likec4_id = "providers";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#454545";
    color = "#313131";
    style = "filled";
    margin = 50;
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>外部サービス</B></FONT>>;
    "cloudflare";
    "bitwarden";
    "idrive";
  }
  subgraph {
    rank = "same";
    "cp1";
    "cp2";
    "cp3";
  }
  subgraph {
    rank = "same";
    "worker1";
    "worker2";
    "worker_pi1";
    "worker_pi2";
  }
  "network" -> "worker_pi1" [
    likec4_id = "cchqpv";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VLAN10</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "network" -> "worker_pi2" [
    likec4_id = "cchqps";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VLAN10</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "network" -> "cp1" [
    likec4_id = "vtbvsx";
    style = "dotted";
    lhead = "cluster_pve";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">宅内LAN</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "worker_pi2" -> "idrive" [
    likec4_id = "1g32zb5";
    style = "dashed";
    ltail = "cluster_homesite";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">バックアップ</FONT></TD></TR></TABLE>>;
    color = "#b45309";
    fontcolor = "#FFE0C2";
    arrowhead = "normal";
  ];
  "cloudflare" -> "cp1" [
    likec4_id = "1pl9sp5";
    style = "dashed";
    lhead = "cluster_homesite";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access・Tunnel</FONT></TD></TR></TABLE>>;
    color = "#15803d";
    fontcolor = "#bbfcd3";
    arrowhead = "normal";
  ];
  "bitwarden" -> "cp1" [
    likec4_id = "kcdx80";
    style = "dotted";
    lhead = "cluster_homesite";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret同期</FONT></TD></TR></TABLE>>;
    color = "#AC4D39";
    fontcolor = "#fcd9d2";
    arrowhead = "normal";
  ];
}`;case`home_apps`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=home_apps,
        nodesep=0.556,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=0.764,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_home {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
            likec4_depth=2,
            likec4_id="premises.home",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_apps {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>生活サービス / LOOCKIT・COUPON・WOL</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home.apps",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            {
                graph [rank=same];
                loockit [height=1.389,
                    label=<<FONT POINT-SIZE="20">Loockit / BLEスマートロック</FONT>>,
                    likec4_id="premises.home.apps.loockit",
                    likec4_level=2,
                    margin="0.139,0.139",
                    width=2.5];
                coupon_manager [height=1.389,
                    label=<<FONT POINT-SIZE="20">Coupon Manager</FONT>>,
                    likec4_id="premises.home.apps.coupon_manager",
                    likec4_level=2,
                    margin="0.139,0.139",
                    width=2.5];
            }
            wol [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Wake-on-LAN</FONT>>,
                likec4_id="premises.home.apps.wol",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            loockit -> wol [style=invis];
            annict_scraper [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Annict scraper / 番組照合</FONT>>,
                likec4_id="premises.home.apps.annict_scraper",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            magic_mirror [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MagicMirror / ダッシュボード</FONT>>,
                likec4_id="premises.home.apps.magic_mirror",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        {
            graph [rank=same];
            platform [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">home-k8s クラスタ基盤</FONT>>,
                likec4_id="premises.home.platform",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
            agent [color="#2d5d39",
                fillcolor="#428a4f",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">自宅監視基盤</FONT>>,
                likec4_id="premises.home.agent",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
            management [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">クラスタ運用</FONT>>,
                likec4_id="premises.home.management",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
        }
        {
            graph [rank=same];
            eso [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
                likec4_id="premises.home.eso",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
            dns [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">内部DNS / MetalLB</FONT>>,
                likec4_id="premises.home.dns",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
            nextcloud [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
                likec4_id="premises.home.nextcloud",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
        }
        {
            graph [rank=same];
            recording [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">録画・配信 / EPGStation・TNLaStation</FONT>>,
                likec4_id="premises.home.recording",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
            databases [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
                likec4_id="premises.home.databases",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
        }
        platform -> eso [style=invis];
        eso -> recording [minlen=1,
            style=invis];
    }
    agent -> management [style=invis];
    management -> dns [style=invis];
    dns -> nextcloud [style=invis];
    coupon_manager -> databases [style=invis];
    kiosk [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">MagicMirror表示 / VM5000</FONT>>,
        likec4_id="premises.pve.kiosk",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    kiosk -> magic_mirror [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">表示</FONT></TD></TR></TABLE>>,
        likec4_id="1l0gwrs",
        style=dashed,
        weight=4];
    "edge" [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare</FONT>>,
        likec4_id="external.edge",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    "edge" -> platform [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_home,
        likec4_id=yr0r25,
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証済みHTTP / Access・mTLS → 内部Service</FONT></TD></TR></TABLE>>];
    nas02 [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
        likec4_id="premises.pve.nas02",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    nas02 -> platform [arrowhead=normal,
        lhead=cluster_home,
        likec4_id=u5t59y,
        minlen=1,
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">アプリ・DB・監視のNFS</FONT></TD></TR></TABLE>>];
    annict [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Annict API</FONT>>,
        likec4_id="external.annict",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    annict_scraper -> annict [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Annict API</FONT></TD></TR></TABLE>>,
        likec4_id=gqwqgn,
        style=dashed,
        weight=5];
}
`;case`access`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=access,
        nodesep=1.112,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.389,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_external {
        graph [color="#1c356c",
            fillcolor="#1c417d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス / SAAS・公開サービス</B></FONT>>,
            likec4_depth=3,
            likec4_id=external,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        subgraph cluster_edge {
            graph [color="#3f2717",
                fillcolor="#51321f",
                label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>CLOUDFLARE</B></FONT>>,
                likec4_depth=2,
                likec4_id="external.edge",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            subgraph cluster_routes {
                graph [color="#2d333d",
                    fillcolor="#3e4651",
                    label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>公開HOSTNAME / 設定から抽出</B></FONT>>,
                    likec4_depth=1,
                    likec4_id="external.edge.routes",
                    likec4_level=2,
                    margin=40,
                    style=filled
                ];
                protected [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="external.edge",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">Access保護のhostname</FONT>>,
                    likec4_id="external.edge.routes.protected",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                exceptions [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="external.edge",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">例外 / mTLS専用API</FONT>>,
                    likec4_id="external.edge.routes.exceptions",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
            }
            access [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="external.edge",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Cloudflare Access / 共通の認証入口</FONT>>,
                likec4_id="external.edge.access",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            mtls [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="external.edge",
                height=1.389,
                label=<<FONT POINT-SIZE="20">mTLS / 専用APIの例外</FONT>>,
                likec4_id="external.edge.mtls",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tunnel [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="external.edge",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
                likec4_id="external.edge.tunnel",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
    }
    subgraph cluster_consumers {
        graph [color="#2d333d",
            fillcolor="#3e4651",
            label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>基盤の利用側 / 別リポジトリ</B></FONT>>,
            likec4_depth=1,
            likec4_id=consumers,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        reventer [height=1.389,
            label=<<FONT POINT-SIZE="20">Re:Venter</FONT>>,
            likec4_id="consumers.reventer",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_premises {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅</B></FONT>>,
            likec4_depth=2,
            likec4_id=premises,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_home {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            argo [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
                likec4_id="premises.home.management.argo",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_hardware {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>物理・ネットワーク</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.hardware",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            network [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ネットワーク機器</FONT>>,
                likec4_id="premises.hardware.network",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        pve [color="#2d5d39",
            fillcolor="#428a4f",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Proxmox VEクラスタ</FONT>>,
            likec4_id="premises.pve",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    user [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">利用者</FONT>>,
        likec4_id=user,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    user -> access [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS / 利用時の認証</FONT></TD></TR></TABLE>>,
        likec4_id="34i5b5",
        minlen=1,
        style=dashed];
    operator [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">管理者</FONT>>,
        likec4_id=operator,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    operator -> access [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS / 管理時の認証</FONT></TD></TR></TABLE>>,
        likec4_id="1mzdjyo",
        minlen=1,
        style=dashed];
    client [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">専用クライアント</FONT>>,
        likec4_id=client,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    client -> mtls [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">クライアント証明書</FONT></TD></TR></TABLE>>,
        likec4_id="1ligfsb",
        minlen=1,
        style=dashed];
    access -> tunnel [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後の転送</FONT></TD></TR></TABLE>>,
        likec4_id="163m3wm",
        style=solid,
        weight=4];
    mtls -> tunnel [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">mTLS検証済みのAPIリクエスト</FONT></TD></TR></TABLE>>,
        likec4_id=advadg,
        style=solid,
        weight=4];
    tunnel -> protected [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">hostname転送</FONT></TD></TR></TABLE>>,
        likec4_id=ozucx8,
        style=dashed,
        weight=6];
    tunnel -> exceptions [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">hostname転送</FONT></TD></TR></TABLE>>,
        likec4_id=vlxw4i,
        minlen=1,
        style=dashed,
        weight=3];
    tunnel -> reventer [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">hostname転送</FONT></TD></TR></TABLE>>,
        likec4_id="1yznw3a",
        minlen=1,
        style=dashed];
    protected -> pve [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="17gztw1",
        minlen=1,
        style=dashed,
        weight=3];
    protected -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="1cptj9x",
        minlen=1,
        style=dashed];
    protected -> network [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="6cs9r0",
        minlen=1,
        style=dashed,
        weight=2];
}
`;case`delivery`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=delivery,
        nodesep=0.834,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.112,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_premises {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅</B></FONT>>,
            likec4_depth=2,
            likec4_id=premises,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_home {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            images [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Image Updater</FONT>>,
                likec4_id="premises.home.management.images",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            argo [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
                likec4_id="premises.home.management.argo",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            runner [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ARC / 共用のrunner制御基盤</FONT>>,
                likec4_id="premises.home.management.runner",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tfc_agents [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">Terraform Cloud agents / 自宅</FONT>>,
                likec4_id="premises.home.management.tfc_agents",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_management {
            graph [color="#462a17",
                fillcolor="#5a3620",
                label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>自宅基盤の構成管理</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.management",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            ansible [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">Ansible</FONT>>,
                likec4_id="premises.management.ansible",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            packer [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">Packer / VM template</FONT>>,
                likec4_id="premises.management.packer",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_hardware {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>物理・ネットワーク</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.hardware",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            network [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ネットワーク機器</FONT>>,
                likec4_id="premises.hardware.network",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        pve [color="#2d5d39",
            fillcolor="#428a4f",
            fontcolor="#f8fafc",
            group=premises,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Proxmox VEクラスタ</FONT>>,
            likec4_id="premises.pve",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_external {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス / SAAS・公開サービス</B></FONT>>,
            likec4_depth=1,
            likec4_id=external,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        github [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=external,
            height=1.389,
            label=<<FONT POINT-SIZE="20">GitHub / コード・Actions</FONT>>,
            likec4_id="external.github",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        terraform_cloud [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=external,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Terraform Cloud</FONT>>,
            likec4_id="external.terraform_cloud",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        github_pages [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=external,
            height=1.389,
            label=<<FONT POINT-SIZE="20">GitHub Pages / my-infra図・レビュー</FONT>>,
            likec4_id="external.github_pages",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        "edge" [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            group=external,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Cloudflare</FONT>>,
            likec4_id="external.edge",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    github -> terraform_cloud [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Terraform実行</FONT></TD></TR></TABLE>>,
        likec4_id="1w081l3",
        style=dashed,
        weight=5];
    github -> github_pages [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">構成図・PR比較を公開</FONT></TD></TR></TABLE>>,
        likec4_id="149xiol",
        minlen=1,
        style=dashed,
        weight=5];
    github -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GitOps</FONT></TD></TR></TABLE>>,
        likec4_id="1x23hwz",
        minlen=1,
        style=dashed];
    github -> runner [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Actions job</FONT></TD></TR></TABLE>>,
        likec4_id="1vyt6mw",
        minlen=1,
        style=dashed];
    ansible -> pve [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM・NAS・LXC設定</FONT></TD></TR></TABLE>>,
        likec4_id="1lkbk22",
        style=dashed,
        weight=2];
    ansible -> network [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        lhead=cluster_hardware,
        likec4_id=cpv5vb,
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NW・UPS機器設定</FONT></TD></TR></TABLE>>];
    packer -> pve [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM template</FONT></TD></TR></TABLE>>,
        likec4_id="1yk330a",
        minlen=1,
        style=dashed,
        weight=2];
    terraform_cloud -> "edge" [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DNS / Access / Tunnel</FONT></TD></TR></TABLE>>,
        likec4_id=y0ry4h,
        minlen=1,
        style=dashed,
        weight=5];
    terraform_cloud -> tfc_agents [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">workspace runを自宅agentで実行</FONT></TD></TR></TABLE>>,
        likec4_id="1nwo5cx",
        style=dashed];
    tfc_agents -> pve [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM / ネットワーク</FONT></TD></TR></TABLE>>,
        likec4_id="7gm8up",
        style=dashed,
        weight=3];
}
`;case`secrets`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=secrets,
        nodesep=0.834,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.112,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_external {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス / SAAS・公開サービス</B></FONT>>,
            likec4_depth=1,
            likec4_id=external,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        bws [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            group=external,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Bitwarden Secrets Manager</FONT>>,
            likec4_id="external.bws",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        github [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=external,
            height=1.389,
            label=<<FONT POINT-SIZE="20">GitHub / コード・Actions</FONT>>,
            likec4_id="external.github",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        terraform_cloud [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=external,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Terraform Cloud</FONT>>,
            likec4_id="external.terraform_cloud",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_premises {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅</B></FONT>>,
            likec4_depth=1,
            likec4_id=premises,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        eso [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
            likec4_id="premises.home.eso",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        ansible [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Ansible</FONT>>,
            likec4_id="premises.management.ansible",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        backups [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">バックアップ処理</FONT>>,
            likec4_id="premises.home.backups",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    bws -> github [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">CI credential</FONT></TD></TR></TABLE>>,
        likec4_id="1fho0bt",
        minlen=1,
        style=dotted,
        weight=4];
    bws -> terraform_cloud [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Terraform変数</FONT></TD></TR></TABLE>>,
        likec4_id="58qzk4",
        minlen=1,
        style=dotted,
        weight=4];
    bws -> eso [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="2swi7j",
        minlen=1,
        style=dotted];
    bws -> ansible [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器・PBS用credential</FONT></TD></TR></TABLE>>,
        likec4_id="1s9i20k",
        minlen=1,
        style=dotted];
    bws -> backups [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO経由 / backup credential</FONT></TD></TR></TABLE>>,
        likec4_id="3i5sb",
        minlen=1,
        style=dotted];
}
`;case`observability`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=observability,
        nodesep=0.834,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.112,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_external {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス / SAAS・公開サービス</B></FONT>>,
            likec4_depth=1,
            likec4_id=external,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        grafana [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Grafana Cloud / PDC</FONT>>,
            likec4_id="external.grafana",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_premises {
        graph [color="#1c356c",
            fillcolor="#1c417d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅</B></FONT>>,
            likec4_depth=3,
            likec4_id=premises,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_home {
            graph [color="#1c3979",
                fillcolor="#1a468d",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
                likec4_depth=2,
                likec4_id="premises.home",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            subgraph cluster_agent {
                graph [color="#1e3524",
                    fillcolor="#2c4e32",
                    label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>自宅監視基盤</B></FONT>>,
                    likec4_depth=1,
                    likec4_id="premises.home.agent",
                    likec4_level=2,
                    margin=40,
                    style=filled
                ];
                exporters [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.home.agent",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">exporter群</FONT>>,
                    likec4_id="premises.home.agent.exporters",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                pdc [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.home.agent",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">PDC agent / 自宅</FONT>>,
                    likec4_id="premises.home.agent.pdc",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                collector [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.home.agent",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">vmagent / scrape・remoteWrite</FONT>>,
                    likec4_id="premises.home.agent.collector",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                local_store [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    group="premises.home.agent",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">VictoriaMetrics / 自宅</FONT>>,
                    likec4_id="premises.home.agent.local_store",
                    likec4_level=3,
                    margin="0.139,0",
                    penwidth=2,
                    shape=cylinder,
                    width=2.5];
            }
        }
        hardware [height=1.389,
            label=<<FONT POINT-SIZE="20">物理・ネットワーク</FONT>>,
            likec4_id="premises.hardware",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    operator [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">管理者</FONT>>,
        likec4_id=operator,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    operator -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">照会</FONT></TD></TR></TABLE>>,
        likec4_id=p6u0p1,
        minlen=1,
        style=dashed,
        weight=4];
    grafana -> pdc [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由の検索</FONT></TD></TR></TABLE>>,
        likec4_id="6v83w",
        style=dashed];
    hardware -> collector [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">exporter収集</FONT></TD></TR></TABLE>>,
        likec4_id=pnjytd,
        minlen=1,
        style=dotted];
    exporters -> collector [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">scrape</FONT></TD></TR></TABLE>>,
        likec4_id="17zgcax",
        minlen=1,
        style=dotted,
        weight=3];
    pdc -> local_store [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private query / :8428</FONT></TD></TR></TABLE>>,
        likec4_id=j9vno0,
        style=dashed,
        weight=5];
    collector -> local_store [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">remoteWrite / :8428</FONT></TD></TR></TABLE>>,
        likec4_id="1x0rz1g",
        style=dotted,
        weight=3];
}
`;case`placement`:return`digraph {
  likec4_viewId = "placement";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "TB";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 0.487;
  ranksep = 0.625;
  pad = 0.209;
  fontname = "Arial";
  newrank = true;
  clusterrank = "global";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "lb" [
    likec4_id = "homeSite.pve.x570.lb";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">HAProxy / Keepalived VM10001 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "pbs" [
    likec4_id = "homeSite.pve.x570.pbs";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">PBS VM14001 / VLAN20</FONT>>;
    margin = "0.139,0";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "windows" [
    likec4_id = "homeSite.pve.x570.windows";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">Windows / VM60000 / VLAN30</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "nas1" [
    likec4_id = "homeSite.pve.x570.nas1";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">nas-01 / TrueNAS VM69001 /</FONT>>;
    margin = "0.139,0";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "lb_1" [
    likec4_id = "homeSite.pve.b550m.lb";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">HAProxy / Keepalived VM10002 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "dev" [
    likec4_id = "homeSite.pve.b550m.dev";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">開発用Docker / VM40000 / VLAN20</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "kiosk" [
    likec4_id = "homeSite.pve.b550m.kiosk";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">MagicMirror表示 / VM5000 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "nas2" [
    likec4_id = "homeSite.pve.b550m.nas2";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002 /</FONT>>;
    margin = "0.139,0";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "talos" [
    likec4_id = "homeSite.pve.x570.cp1.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos Linux</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_1" [
    likec4_id = "homeSite.pve.x570.worker1.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos Linux</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_2" [
    likec4_id = "homeSite.pve.b550m.cp2.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos Linux</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_3" [
    likec4_id = "homeSite.pve.b550m.cp3.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos Linux</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_4" [
    likec4_id = "homeSite.pve.b550m.worker2.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos Linux</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "app" [
    likec4_id = "homeSite.pve.x570.loockit.app";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Docker / Loockit REST・gRPC</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "app_1" [
    likec4_id = "homeSite.pve.b550m.loockit.app";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Docker / Loockit REST・gRPC</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "app_2" [
    likec4_id = "homeSite.pve.x570.tuner.app";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Docker / Mirakurun / PT3</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "app_3" [
    likec4_id = "homeSite.pve.b550m.tuner.app";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Docker / Mirakurun / PX-S1UD</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "app_4" [
    likec4_id = "homeSite.pve.x570.unifi.app";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Podman / UniFi OS・Network</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  subgraph "cluster_pve" {
    likec4_id = "homeSite.pve";
    likec4_level = 0;
    likec4_depth = 3;
    fillcolor = "#1c417d";
    color = "#1c356c";
    style = "filled";
    margin = 50;
    label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>PROXMOX VEクラスタ</B></FONT>>;
    subgraph "cluster_b550m" {
      likec4_id = "homeSite.pve.b550m";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#29472f";
      color = "#1c3021";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PVE-B550M</B></FONT>>;
      "lb_1";
      "dev";
      "kiosk";
      "nas2";
      subgraph "cluster_cp2" {
        likec4_id = "homeSite.pve.b550m.cp2";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>HOME-K8S CP02 / VM13002 / VLAN20</B></FONT>>;
        "talos_2";
      }
      subgraph "cluster_cp3" {
        likec4_id = "homeSite.pve.b550m.cp3";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>HOME-K8S CP03 / VM13003 / VLAN20</B></FONT>>;
        "talos_3";
      }
      subgraph "cluster_worker2" {
        likec4_id = "homeSite.pve.b550m.worker2";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>HOME-K8S WORKER02 / VM13005 / VLAN20</B></FONT>>;
        "talos_4";
      }
      subgraph "cluster_loockit" {
        likec4_id = "homeSite.pve.b550m.loockit";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>LOOCKIT 02 / CT12903 / VLAN20</B></FONT>>;
        "app_1";
      }
      subgraph "cluster_tuner" {
        likec4_id = "homeSite.pve.b550m.tuner";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>MIRAKURUN STG / CT12904・PX-S1UD / VLAN20</B></FONT>>;
        "app_3";
      }
    }
    subgraph "cluster_x570" {
      likec4_id = "homeSite.pve.x570";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#29472f";
      color = "#1c3021";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PVE-X570</B></FONT>>;
      "lb";
      "pbs";
      "windows";
      "nas1";
      subgraph "cluster_cp1" {
        likec4_id = "homeSite.pve.x570.cp1";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>HOME-K8S CP01 / VM13001 / VLAN20</B></FONT>>;
        "talos";
      }
      subgraph "cluster_worker1" {
        likec4_id = "homeSite.pve.x570.worker1";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>HOME-K8S WORKER01 / VM13004 / VLAN20</B></FONT>>;
        "talos_1";
      }
      subgraph "cluster_unifi" {
        likec4_id = "homeSite.pve.x570.unifi";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>UNIFI OS VM13201 / NATIVE1</B></FONT>>;
        "app_4";
      }
      subgraph "cluster_loockit_1" {
        likec4_id = "homeSite.pve.x570.loockit";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>LOOCKIT 01 / CT12902 / VLAN20</B></FONT>>;
        "app";
      }
      subgraph "cluster_tuner_1" {
        likec4_id = "homeSite.pve.x570.tuner";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>MIRAKURUN本番 / CT12901・PT3 / VLAN20</B></FONT>>;
        "app_2";
      }
    }
  }
  subgraph {
    rank = "same";
    "lb";
    "lb_1";
  }
  subgraph {
    rank = "same";
    "talos";
    "talos_2";
    "talos_3";
  }
  subgraph {
    rank = "same";
    "talos_1";
    "talos_4";
  }
}`;case`network`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=network,
        nodesep=0.834,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.112,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_premises {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅</B></FONT>>,
            likec4_depth=2,
            likec4_id=premises,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_network {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>ネットワーク機器</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.hardware.network",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            router [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.hardware.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">IX2215 / ルーター・VLAN間ACL</FONT>>,
                likec4_id="premises.hardware.network.router",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            ethernet [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.hardware.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">宅内Ethernet / VLAN trunk</FONT>>,
                likec4_id="premises.hardware.network.ethernet",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            switch [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.hardware.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">US-8-60W / 管理スイッチ</FONT>>,
                likec4_id="premises.hardware.network.switch",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            ap [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.hardware.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">FS Wi-Fi AP</FONT>>,
                likec4_id="premises.hardware.network.ap",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_x570 {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>PVE-X570 / PROXMOX</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.pve.x570",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            bridge [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">enp7s0 / vmbr0</FONT>>,
                likec4_id="premises.pve.x570.bridge",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_b550m {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>PVE-B550M / PROXMOX</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.pve.b550m",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            bridge_1 [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">enp6s0 / vmbr0</FONT>>,
                likec4_id="premises.pve.b550m.bridge",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        unifi [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UniFi OS / VM13201</FONT>>,
            likec4_id="premises.pve.unifi",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        lan [height=1.389,
            label=<<FONT POINT-SIZE="20">LAN / VLAN・経路</FONT>>,
            likec4_id="premises.lan",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    internet [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Internet</FONT>>,
        likec4_id="external.internet",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    internet -> router [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">WAN / GigaEthernet0</FONT></TD></TR></TABLE>>,
        likec4_id=o1getd,
        minlen=1,
        style=dotted];
    unifi -> switch [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">構成・監視を管理</FONT></TD></TR></TABLE>>,
        likec4_id=xblt3c,
        minlen=1,
        style=dashed];
    router -> ethernet [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GigaEthernet2 / native1 +<BR/>tag10,20,30,31,40</FONT></TD></TR></TABLE>>,
        likec4_id="29g374",
        style=dotted,
        weight=5];
    router -> lan [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=dshqsi,
        style=dotted,
        weight=3];
    ethernet -> switch [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">802.1Q / uplink</FONT></TD></TR></TABLE>>,
        likec4_id="1qjazex",
        style=dotted,
        weight=5];
    ethernet -> ap [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">AP trunk</FONT></TD></TR></TABLE>>,
        likec4_id=t2w7re,
        minlen=1,
        style=dotted,
        weight=5];
    ethernet -> bridge [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1管理 / ゲストtag20・30</FONT></TD></TR></TABLE>>,
        likec4_id="19wktf1",
        style=dotted];
    ethernet -> bridge_1 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1管理 / ゲストtag20・40</FONT></TD></TR></TABLE>>,
        likec4_id="1d02vzs",
        style=dotted];
    bridge -> lan [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="1nnzli7",
        style=dotted,
        weight=3];
    bridge_1 -> lan [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=t07hca,
        style=dotted,
        weight=3];
}
`;case`vlans`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=vlans,
        nodesep=0.834,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.112,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_premises {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅</B></FONT>>,
            likec4_depth=2,
            likec4_id=premises,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_lan {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>LAN / VLAN・経路</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.lan",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            native [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">native / 192.168.0.0/24</FONT>>,
                likec4_id="premises.lan.native",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            management [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN10 / 192.168.10.0/24</FONT>>,
                likec4_id="premises.lan.management",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            server [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN20 / 192.168.20.0/24</FONT>>,
                likec4_id="premises.lan.server",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            client [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN30 / 192.168.30.0/24</FONT>>,
                likec4_id="premises.lan.client",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            guest [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN31 / guest</FONT>>,
                likec4_id="premises.lan.guest",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            iot [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN40 / 192.168.40.0/24</FONT>>,
                likec4_id="premises.lan.iot",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        switch [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">US-8-60W / 管理スイッチ</FONT>>,
            likec4_id="premises.hardware.network.switch",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        router [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">IX2215 / ルーター・VLAN間ACL</FONT>>,
            likec4_id="premises.hardware.network.router",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        bridge [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">enp7s0 / vmbr0</FONT>>,
            likec4_id="premises.pve.x570.bridge",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        bridge_1 [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">enp6s0 / vmbr0</FONT>>,
            likec4_id="premises.pve.b550m.bridge",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        dns [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">内部DNS / MetalLB</FONT>>,
            likec4_id="premises.home.dns",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    warp [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">WARP / private CIDR routes</FONT>>,
        likec4_id="external.edge.warp",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    warp -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private CIDR routes / WARP policy</FONT></TD></TR></TABLE>>,
        likec4_id="1nzidds",
        minlen=1,
        style=dotted];
    router -> native [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native IF</FONT></TD></TR></TABLE>>,
        likec4_id="1jm75al",
        minlen=1,
        style=dotted];
    router -> management [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI10</FONT></TD></TR></TABLE>>,
        likec4_id=cmbk3j,
        minlen=1,
        style=dotted];
    router -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI20</FONT></TD></TR></TABLE>>,
        likec4_id="1vv615",
        style=dotted,
        weight=2];
    router -> client [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI30</FONT></TD></TR></TABLE>>,
        likec4_id="1qjtmdx",
        style=dotted];
    router -> guest [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI31 / 他VLAN拒否</FONT></TD></TR></TABLE>>,
        likec4_id=cldszg,
        minlen=1,
        style=dotted];
    router -> iot [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI4 / tag40</FONT></TD></TR></TABLE>>,
        likec4_id=gihowu,
        style=dotted];
    bridge -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM・LXC tag20</FONT></TD></TR></TABLE>>,
        likec4_id="1ipkp3o",
        style=dotted,
        weight=2];
    bridge -> client [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Windows VM tag30</FONT></TD></TR></TABLE>>,
        likec4_id="1t2nb2g",
        style=dotted];
    bridge_1 -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM・LXC tag20</FONT></TD></TR></TABLE>>,
        likec4_id=cmxt0h,
        style=dotted,
        weight=2];
    bridge_1 -> iot [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">kiosk VM tag40</FONT></TD></TR></TABLE>>,
        likec4_id="1qyy6ie",
        style=dotted];
    dns -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">L2広告 / Service IP .200-.226</FONT></TD></TR></TABLE>>,
        likec4_id="9o3n5m",
        minlen=1,
        style=dotted,
        weight=3];
}
`;case`platform`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=platform,
        nodesep=0.695,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=0.834,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    descheduler [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">descheduler</FONT>>,
        likec4_id="premises.home.platform.descheduler",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    api [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Kubernetes API / Lease</FONT>>,
        likec4_id="premises.home.platform.api",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    descheduler -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Podのeviction / 配置再調整</FONT></TD></TR></TABLE>>,
        likec4_id=uh0kx0,
        minlen=1,
        style=dashed,
        weight=3];
    controlplane [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">home-k8s control-plane</FONT>>,
        likec4_id="premises.home.platform.controlplane",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    controlplane -> api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">API server :6443 / etcd</FONT></TD></TR></TABLE>>,
        likec4_id="1p39x5v",
        minlen=1,
        style=dashed,
        weight=3];
    cert_approver [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">kubelet-serving-cert-approver</FONT>>,
        likec4_id="premises.home.platform.cert_approver",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    cert_approver -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">kubelet serving CSRの承認</FONT></TD></TR></TABLE>>,
        likec4_id="6zt180",
        minlen=1,
        style=dashed,
        weight=3];
    flannel [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Flannel / CNI</FONT>>,
        likec4_id="premises.home.platform.flannel",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    worker [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">home-k8s worker</FONT>>,
        likec4_id="premises.home.platform.worker",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    flannel -> worker [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">CNI / Podネットワーク</FONT></TD></TR></TABLE>>,
        likec4_id=vb6pni,
        minlen=1,
        style=dotted];
    kube_proxy [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">kube-proxy / Service routing</FONT>>,
        likec4_id="premises.home.platform.kube_proxy",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    kube_proxy -> worker [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Service / ClusterIP転送</FONT></TD></TR></TABLE>>,
        likec4_id=yflo6u,
        minlen=1,
        style=dotted];
    metrics_server [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">metrics-server / Metrics API</FONT>>,
        likec4_id="premises.home.platform.metrics_server",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    metrics_server -> worker [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">kubelet metrics / :10250</FONT></TD></TR></TABLE>>,
        likec4_id=jffmkx,
        minlen=1,
        style=dashed];
    metallb [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">MetalLB / LANのService IP</FONT>>,
        likec4_id="premises.home.dns.metallb",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    coredns [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">CoreDNS / miutaku.internal</FONT>>,
        likec4_id="premises.home.dns.coredns",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    metallb -> coredns [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">LAN向けDNS / LoadBalancer IP .201</FONT></TD></TR></TABLE>>,
        likec4_id="1etd40n",
        style=dashed,
        weight=5];
    metallb -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ServiceのIP割当 / controller</FONT></TD></TR></TABLE>>,
        likec4_id=v1e5l7,
        style=dashed,
        weight=2];
    server [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">VLAN20 / 192.168.20.0/24</FONT>>,
        likec4_id="premises.lan.server",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    metallb -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">L2広告 / Service IP .200-.226</FONT></TD></TR></TABLE>>,
        likec4_id="17ftzfv",
        style=dotted];
    bws [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Bitwarden Secrets Manager</FONT>>,
        likec4_id="external.bws",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    eso [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
        likec4_id="premises.home.eso",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    bws -> eso [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="2swi7j",
        minlen=1,
        style=dotted];
    argo [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
        likec4_id="premises.home.management.argo",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    argo -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">manifest同期 / Kubernetes API</FONT></TD></TR></TABLE>>,
        likec4_id="125ro91",
        minlen=1,
        style=dashed];
    runner [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">ARC / 共用のrunner制御基盤</FONT>>,
        likec4_id="premises.home.management.runner",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    runner -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">runner Podの作成・削除</FONT></TD></TR></TABLE>>,
        likec4_id=pat8u,
        minlen=1,
        style=dashed];
    cloudflared [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">cloudflared / 自宅connector</FONT>>,
        likec4_id="premises.home.platform.cloudflared",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    "edge" [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare</FONT>>,
        likec4_id="external.edge",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    cloudflared -> "edge" [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きTunnel接続</FONT></TD></TR></TABLE>>,
        likec4_id="1xsdy97",
        minlen=1,
        style=dashed];
    public_dns [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Public DNS / 1.1.1.1・8.8.8.8</FONT>>,
        likec4_id="external.public_dns",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    coredns -> public_dns [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">非internal名をforward / DNS :53</FONT></TD></TR></TABLE>>,
        likec4_id=dbe742,
        minlen=1,
        style=dashed];
    eso -> api [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Kubernetes Secretを同期</FONT></TD></TR></TABLE>>,
        likec4_id="111xfyy",
        style=dotted,
        weight=3];
    "edge" -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private CIDR routes / WARP policy</FONT></TD></TR></TABLE>>,
        likec4_id="1rt66xm",
        style=dotted,
        weight=2];
    api -> worker [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Podの実行を制御</FONT></TD></TR></TABLE>>,
        likec4_id="16net0k",
        style=dashed];
    worker -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">kubelet / Pod・Serviceのwatch</FONT></TD></TR></TABLE>>,
        likec4_id=hhu290,
        style=dashed];
    nd_cluster_dns [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">CoreDNS / cluster.local</FONT>>,
        likec4_id="premises.home.platform.cluster_dns",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    worker -> nd_cluster_dns [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Podの名前解決 / :53</FONT></TD></TR></TABLE>>,
        likec4_id="1luvto0",
        minlen=1,
        style=dashed];
}
`;case`loockit`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=loockit,
        nodesep=0.695,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=0.834,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    client [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">専用クライアント</FONT>>,
        likec4_id=client,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    mtls [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">mTLS / 専用APIの例外</FONT>>,
        likec4_id="external.edge.mtls",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    client -> mtls [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">クライアント証明書</FONT></TD></TR></TABLE>>,
        likec4_id="1ligfsb",
        minlen=1,
        style=dashed];
    tunnel [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
        likec4_id="external.edge.tunnel",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    mtls -> tunnel [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">mTLS検証済みのAPIリクエスト</FONT></TD></TR></TABLE>>,
        likec4_id=advadg,
        style=solid,
        weight=7];
    proxy [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">HAProxy / :8080・:50051</FONT>>,
        likec4_id="premises.home.apps.loockit.proxy",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    tunnel -> proxy [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">loockit-api / 8080 / mTLS</FONT></TD></TR></TABLE>>,
        likec4_id=u13do2,
        style=dashed];
    loockit_a [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Loockit 01 / CT12902</FONT>>,
        likec4_id="premises.pve.loockit_a",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    proxy -> loockit_a [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">readyz / leaderのみ</FONT></TD></TR></TABLE>>,
        likec4_id="10k2q3q",
        style=dashed,
        weight=3];
    loockit_b [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Loockit 02 / CT12903</FONT>>,
        likec4_id="premises.pve.loockit_b",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    proxy -> loockit_b [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">readyz / leaderのみ</FONT></TD></TR></TABLE>>,
        likec4_id="10k2q3p",
        style=dashed,
        weight=3];
    bluez [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">BlueZ / USB Bluetooth</FONT>>,
        likec4_id="premises.pve.x570.bluez",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    loockit_a -> bluez [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">read-only D-Bus / org.bluez</FONT></TD></TR></TABLE>>,
        likec4_id=hrrast,
        minlen=1,
        style=dashed,
        weight=4];
    api [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Kubernetes API / Lease</FONT>>,
        likec4_id="premises.home.platform.api",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    loockit_a -> api [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Lease leader election</FONT></TD></TR></TABLE>>,
        likec4_id="1a72uo8",
        style=dashed,
        weight=2];
    bluez_1 [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">BlueZ / USB Bluetooth</FONT>>,
        likec4_id="premises.pve.b550m.bluez",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    loockit_b -> bluez_1 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">read-only D-Bus / org.bluez</FONT></TD></TR></TABLE>>,
        likec4_id=mrzajf,
        minlen=1,
        style=dashed,
        weight=4];
    loockit_b -> api [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Lease leader election</FONT></TD></TR></TABLE>>,
        likec4_id="164717v",
        style=dashed,
        weight=2];
}
`;case`recording`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=recording,
        nodesep=0.556,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=0.764,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_home {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
            likec4_depth=2,
            likec4_id="premises.home",
            likec4_level=0,
            margin=32,
            style=filled
        ];
        subgraph cluster_recording {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>録画・配信 / EPGSTATION・TNLASTATION</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home.recording",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            epgstation [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording",
                height=1.389,
                label=<<FONT POINT-SIZE="20">EPGStation</FONT>>,
                likec4_id="premises.home.recording.epgstation",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tnlastation [group="premises.home.recording",
                height=1.389,
                label=<<FONT POINT-SIZE="20">TNLaStation PRD</FONT>>,
                likec4_id="premises.home.recording.tnlastation",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tnlastation_staging [group="premises.home.recording",
                height=1.389,
                label=<<FONT POINT-SIZE="20">TNLaStation STG</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            mirakurun [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Mirakurun Service / 本番LXCへの中継</FONT>>,
                likec4_id="premises.home.recording.mirakurun",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            mirakurun_staging [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Mirakurun Service / STG</FONT>>,
                likec4_id="premises.home.recording.mirakurun_staging",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
    }
    epgstation -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id="12e7e0y",
        minlen=1,
        style=dashed,
        weight=4];
    tnlastation -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id="1ihrm13",
        minlen=1,
        style=dashed,
        weight=4];
    tnlastation_staging -> mirakurun_staging [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id="1bdzrd3",
        minlen=1,
        style=dashed,
        weight=4];
    tuner_prod [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun本番 / CT12901・PT3</FONT>>,
        likec4_id="premises.pve.tuner_prod",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    mirakurun -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EndpointSlice / 外部LXC</FONT></TD></TR></TABLE>>,
        likec4_id="1u44e17",
        style=dashed];
    tuner_stg [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun STG /</FONT>>,
        likec4_id="premises.pve.tuner_stg",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    mirakurun_staging -> tuner_stg [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EndpointSlice / 外部LXC</FONT></TD></TR></TABLE>>,
        likec4_id="14j0tmk",
        style=dashed];
    tuner_stg -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BS/CS TCP fallback</FONT></TD></TR></TABLE>>,
        likec4_id="1wjvo77",
        minlen=0,
        style=dashed,
        weight=4];
}
`;case`nextcloud`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=nextcloud,
        nodesep=0.695,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=0.834,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_nextcloud {
        graph [color="#2d333d",
            fillcolor="#3e4651",
            label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>NEXTCLOUD</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.home.nextcloud",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        resources [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">リソース定義</FONT>>,
            likec4_id="premises.home.nextcloud.resources",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        web [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Nextcloud / PHP・HTTP :80</FONT>>,
            likec4_id="premises.home.nextcloud.web",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        redis [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Redis / locking・cache</FONT>>,
            likec4_id="premises.home.nextcloud.redis",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    "edge" [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare</FONT>>,
        likec4_id="external.edge",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    "edge" -> web [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">nextcloud / 80 / Access</FONT></TD></TR></TABLE>>,
        likec4_id=mvawd7,
        minlen=1,
        style=dashed];
    web -> redis [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Redis :6379 / locking・cache</FONT></TD></TR></TABLE>>,
        likec4_id="1q2tz03",
        minlen=0,
        style=dashed,
        weight=5];
    mariadb [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">MariaDB</FONT>>,
        likec4_id="premises.home.databases.mariadb",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    web -> mariadb [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">MYSQL_HOST / MariaDB</FONT></TD></TR></TABLE>>,
        likec4_id=hbls8a,
        minlen=1,
        style=dashed,
        weight=3];
    nas02 [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
        likec4_id="premises.pve.nas02",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    web -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="5r36i8",
        minlen=1,
        style=dashed,
        weight=2];
}
`;case`storage`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=storage,
        nodesep=0.834,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.112,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_premises {
        graph [color="#1c356c",
            fillcolor="#1c417d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅</B></FONT>>,
            likec4_depth=3,
            likec4_id=premises,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_home {
            graph [color="#1c3979",
                fillcolor="#1a468d",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
                likec4_depth=2,
                likec4_id="premises.home",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            subgraph cluster_agent {
                graph [color="#1e3524",
                    fillcolor="#2c4e32",
                    label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>自宅監視基盤</B></FONT>>,
                    likec4_depth=1,
                    likec4_id="premises.home.agent",
                    likec4_level=2,
                    margin=32,
                    style=filled
                ];
                local_store [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">VictoriaMetrics / 自宅</FONT>>,
                    likec4_id="premises.home.agent.local_store",
                    likec4_level=3,
                    margin="0.139,0",
                    penwidth=2,
                    shape=cylinder,
                    width=2.5];
            }
            subgraph cluster_databases {
                graph [color="#2d333d",
                    fillcolor="#3e4651",
                    label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>DB / アプリ共有基盤</B></FONT>>,
                    likec4_depth=1,
                    likec4_id="premises.home.databases",
                    likec4_level=2,
                    margin=40,
                    style=filled
                ];
                mariadb [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">MariaDB</FONT>>,
                    likec4_id="premises.home.databases.mariadb",
                    likec4_level=3,
                    margin="0.139,0",
                    penwidth=2,
                    shape=cylinder,
                    width=2.5];
                postgres_staging [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">PostgreSQL STG</FONT>>,
                    likec4_id="premises.home.databases.postgres_staging",
                    likec4_level=3,
                    margin="0.139,0",
                    penwidth=2,
                    shape=cylinder,
                    width=2.5];
                postgres [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">PostgreSQL PRD</FONT>>,
                    likec4_id="premises.home.databases.postgres",
                    likec4_level=3,
                    margin="0.139,0",
                    penwidth=2,
                    shape=cylinder,
                    width=2.5];
            }
            subgraph cluster_backups {
                graph [color="#2d333d",
                    fillcolor="#3e4651",
                    label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>バックアップ処理</B></FONT>>,
                    likec4_depth=1,
                    likec4_id="premises.home.backups",
                    likec4_level=2,
                    margin=40,
                    style=filled
                ];
                db [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">DB logical dump / 自宅Talos</FONT>>,
                    likec4_id="premises.home.backups.db",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                recordings [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">録画 / 自宅Talos CronJob</FONT>>,
                    likec4_id="premises.home.backups.recordings",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                metrics [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">metrics snapshot / 自宅Talos</FONT>>,
                    likec4_id="premises.home.backups.metrics",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                nas [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">NAS restic / 自宅Talos CronJob</FONT>>,
                    likec4_id="premises.home.backups.nas",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
            }
            nextcloud [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
                likec4_id="premises.home.nextcloud",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            recording [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home",
                height=1.389,
                label=<<FONT POINT-SIZE="20">録画・配信 / EPGStation・TNLaStation</FONT>>,
                likec4_id="premises.home.recording",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            shared [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">共有PV / runner cache・状態</FONT>>,
                likec4_id="premises.home.shared",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_pve {
            graph [color="#1e3524",
                fillcolor="#2c4e32",
                label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.pve",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            nas02 [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
                likec4_id="premises.pve.nas02",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
            nas01 [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">nas-01 / TrueNAS VM69001</FONT>>,
                likec4_id="premises.pve.nas01",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
            x570 [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.pve",
                height=1.389,
                label=<<FONT POINT-SIZE="20">pve-x570 / Proxmox</FONT>>,
                likec4_id="premises.pve.x570",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            b550m [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.pve",
                height=1.389,
                label=<<FONT POINT-SIZE="20">pve-b550m / Proxmox</FONT>>,
                likec4_id="premises.pve.b550m",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            pbs [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                group="premises.pve",
                height=1.389,
                label=<<FONT POINT-SIZE="20">PBS / VM14001</FONT>>,
                likec4_id="premises.pve.pbs",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
        }
    }
    subgraph cluster_external {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス / SAAS・公開サービス</B></FONT>>,
            likec4_depth=1,
            likec4_id=external,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        idrive [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">IDrive e2（S3互換）</FONT>>,
            likec4_id="external.idrive",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    nextcloud -> mariadb [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">MYSQL_HOST / MariaDB</FONT></TD></TR></TABLE>>,
        likec4_id=e8q310,
        style=dashed,
        weight=2];
    nextcloud -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id=ksuxfy,
        style=dashed,
        weight=2];
    recording -> mariadb [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EPGStation DB</FONT></TD></TR></TABLE>>,
        likec4_id="1xbrtov",
        style=dashed,
        weight=2];
    recording -> postgres_staging [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="1bor4wq",
        minlen=1,
        style=dashed,
        weight=2];
    recording -> postgres [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="1cgv8bo",
        style=dashed,
        weight=2];
    recording -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=epi9yt,
        style=dashed,
        weight=2];
    recording -> recordings [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画ファイル専用job</FONT></TD></TR></TABLE>>,
        likec4_id=cd7hvu,
        minlen=1,
        style=dashed,
        weight=2];
    shared -> nas01 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">runner cache / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="2sct8y",
        style=dashed,
        weight=3];
    local_store -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id=ploa02,
        style=dashed];
    local_store -> metrics [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">snapshot / vmbackup</FONT></TD></TR></TABLE>>,
        likec4_id="10vd0fo",
        minlen=1,
        style=dashed,
        weight=2];
    postgres -> db [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id="1xl7x3d",
        ltail=cluster_databases,
        minlen=1,
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">整合性あるlogical dump</FONT></TD></TR></TABLE>>];
    postgres -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        likec4_id="15s5gge",
        ltail=cluster_databases,
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>];
    nas02 -> nas [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">対象dataset / restic</FONT></TD></TR></TABLE>>,
        likec4_id="57bcif",
        style=dashed];
    x570 -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="5imke9",
        minlen=1,
        style=dashed,
        weight=4];
    b550m -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="17bvchg",
        minlen=1,
        style=dashed,
        weight=4];
    pbs -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">S3 datastore / VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="1huvye0",
        style=dashed];
    nas -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id="1pdf96w",
        ltail=cluster_backups,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">用途別prefix / 暗号化・retention</FONT></TD></TR></TABLE>>];
}
`;case`power`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=power,
        nodesep=0.834,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.112,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_hardware {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>物理・ネットワーク</B></FONT>>,
            likec4_depth=2,
            likec4_id="premises.hardware",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_ups {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>UPS / NUT</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.hardware.ups",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            mains [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">商用AC</FONT>>,
                likec4_id="premises.hardware.ups.mains",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            surge_a [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">UPS A / サージのみ口・非backup</FONT>>,
                likec4_id="premises.hardware.ups.surge_a",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            ups_a [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">UPS A / APC RS550S 2020</FONT>>,
                likec4_id="premises.hardware.ups.ups_a",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            ups_b [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">UPS B / APC RS550S 2025</FONT>>,
                likec4_id="premises.hardware.ups.ups_b",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            pi_a [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">NUT Pi 01 / 192.168.10.112</FONT>>,
                likec4_id="premises.hardware.ups.pi_a",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            pi_b [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">NUT Pi 02 / 192.168.10.113</FONT>>,
                likec4_id="premises.hardware.ups.pi_b",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        network [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">ネットワーク機器</FONT>>,
            likec4_id="premises.hardware.network",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_pve {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.pve",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        x570 [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">pve-x570 / Proxmox</FONT>>,
            likec4_id="premises.pve.x570",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        b550m [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">pve-b550m / Proxmox</FONT>>,
            likec4_id="premises.pve.b550m",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    mains -> surge_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">非バックアップ出力</FONT></TD></TR></TABLE>>,
        likec4_id=lwrhh6,
        style=solid];
    mains -> ups_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">AC入力</FONT></TD></TR></TABLE>>,
        likec4_id=ue5q7u,
        style=solid,
        weight=4];
    surge_a -> ups_b [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">UPS BのAC入力</FONT></TD></TR></TABLE>>,
        likec4_id=db3f0p,
        style=solid,
        weight=4];
    ups_a -> x570 [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">バッテリー給電</FONT></TD></TR></TABLE>>,
        likec4_id="1ievdrh",
        style=solid];
    ups_a -> pi_a [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">USB / ups-a</FONT></TD></TR></TABLE>>,
        likec4_id="1m1irtx",
        style=dotted,
        weight=4];
    ups_a -> pi_b [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Pi 02へ給電</FONT></TD></TR></TABLE>>,
        likec4_id="1m1irty",
        style=solid,
        weight=4];
    ups_b -> network [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NW機器へ給電</FONT></TD></TR></TABLE>>,
        likec4_id=irlqrr,
        minlen=1,
        style=solid,
        weight=3];
    ups_b -> b550m [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">バッテリー給電</FONT></TD></TR></TABLE>>,
        likec4_id="21ro2j",
        style=solid];
    ups_b -> pi_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Pi 01へ給電</FONT></TD></TR></TABLE>>,
        likec4_id="1j2zwm",
        style=solid,
        weight=4];
    ups_b -> pi_b [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">USB / ups-b</FONT></TD></TR></TABLE>>,
        likec4_id="1j2zwl",
        style=dotted,
        weight=4];
    x570 -> pi_a [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">charge-guard監視 / 80%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id=jofl7m,
        style=dashed];
    b550m -> pi_b [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">charge-guard監視 / 80%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id="9w9dck",
        style=dashed];
    pi_a -> pi_b [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ups-b@192.168.10.113 / 給電元Bを監視</FONT></TD></TR></TABLE>>,
        likec4_id="1dsjysp",
        style=dashed];
    pi_b -> pi_a [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ups-a@192.168.10.112 / 給電元Aを監視</FONT></TD></TR></TABLE>>,
        likec4_id=qhaemh,
        style=dashed];
}
`;case`recording_prd`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=recording_prd,
        nodesep=0.556,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=0.764,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_home {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
            likec4_depth=2,
            likec4_id="premises.home",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_tnlastation {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TNLASTATION PRD</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home.recording.tnlastation",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            resources [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">リソース定義</FONT>>,
                likec4_id="premises.home.recording.tnlastation.resources",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            gateway [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Gateway</FONT>>,
                likec4_id="premises.home.recording.tnlastation.gateway",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            frontend [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Frontend</FONT>>,
                likec4_id="premises.home.recording.tnlastation.frontend",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            backend [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Backend / API・録画制御</FONT>>,
                likec4_id="premises.home.recording.tnlastation.backend",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            encode [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ffmpeg encode worker</FONT>>,
                likec4_id="premises.home.recording.tnlastation.encode",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            streaming [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ffmpeg streaming worker</FONT>>,
                likec4_id="premises.home.recording.tnlastation.streaming",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            mediamtx [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MediaMTX / HLS配信</FONT>>,
                likec4_id="premises.home.recording.tnlastation.mediamtx",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        mirakurun [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun Service / 本番LXCへの中継</FONT>>,
            likec4_id="premises.home.recording.mirakurun",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        postgres [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">PostgreSQL PRD</FONT>>,
            likec4_id="premises.home.databases.postgres",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    gateway -> frontend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Web</FONT></TD></TR></TABLE>>,
        likec4_id="179whfg",
        minlen=1,
        style=dashed];
    gateway -> backend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">API</FONT></TD></TR></TABLE>>,
        likec4_id="1ngsxrq",
        style=dashed,
        weight=4];
    gateway -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HLS</FONT></TD></TR></TABLE>>,
        likec4_id="9nm3vb",
        style=dashed];
    nas02 [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
        likec4_id="premises.pve.nas02",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    backend -> encode [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode制御</FONT></TD></TR></TABLE>>,
        likec4_id="1nmvcfc",
        style=dashed,
        weight=4];
    backend -> streaming [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">streaming制御</FONT></TD></TR></TABLE>>,
        likec4_id="1tqocwi",
        style=dashed,
        weight=4];
    backend -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id=wrafbh,
        minlen=1,
        style=dashed,
        weight=3];
    backend -> postgres [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="12fvb9p",
        style=dashed];
    encode -> postgres [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode状態</FONT></TD></TR></TABLE>>,
        likec4_id=hyc7gv,
        style=dashed];
    streaming -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">配信</FONT></TD></TR></TABLE>>,
        likec4_id="4f19o3",
        style=dashed];
    mediamtx -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        likec4_id=dcutp2,
        ltail=cluster_tnlastation,
        minlen=1,
        style=dashed,
        weight=4,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">recorded・tnlastation / NFS</FONT></TD></TR></TABLE>>];
}
`;case`recording_stg`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=recording_stg,
        nodesep=0.556,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=0.764,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_home {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
            likec4_depth=2,
            likec4_id="premises.home",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_tnlastation_staging {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TNLASTATION STG</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home.recording.tnlastation_staging",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            resources [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">リソース定義</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging.resources",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            gateway [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation_staging",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Gateway</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging.gateway",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            frontend [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation_staging",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Frontend</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging.frontend",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            backend [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation_staging",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Backend / API・録画制御</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging.backend",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            encode [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation_staging",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ffmpeg encode worker</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging.encode",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            streaming [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation_staging",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ffmpeg streaming worker</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging.streaming",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            mediamtx [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home.recording.tnlastation_staging",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MediaMTX / HLS配信</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging.mediamtx",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        mirakurun_staging [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun Service / STG</FONT>>,
            likec4_id="premises.home.recording.mirakurun_staging",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        postgres_staging [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">PostgreSQL STG</FONT>>,
            likec4_id="premises.home.databases.postgres_staging",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    gateway -> frontend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Web</FONT></TD></TR></TABLE>>,
        likec4_id="19qsj7g",
        minlen=1,
        style=dashed];
    gateway -> backend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">API</FONT></TD></TR></TABLE>>,
        likec4_id="1njhwqe",
        style=dashed,
        weight=4];
    gateway -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HLS</FONT></TD></TR></TABLE>>,
        likec4_id=c4i5nb,
        style=dashed];
    nas02 [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
        likec4_id="premises.pve.nas02",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    backend -> encode [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode制御</FONT></TD></TR></TABLE>>,
        likec4_id=r6x27c,
        style=dashed,
        weight=4];
    backend -> streaming [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">streaming制御</FONT></TD></TR></TABLE>>,
        likec4_id="1ducx3m",
        style=dashed,
        weight=4];
    backend -> mirakurun_staging [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id="1ec6m19",
        minlen=1,
        style=dashed,
        weight=3];
    backend -> postgres_staging [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id=s3iggd,
        style=dashed];
    encode -> postgres_staging [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode状態</FONT></TD></TR></TABLE>>,
        likec4_id="1k7udzj",
        style=dashed];
    streaming -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">配信</FONT></TD></TR></TABLE>>,
        likec4_id="121k19v",
        style=dashed];
    mediamtx -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        likec4_id="4iskx4",
        ltail=cluster_tnlastation_staging,
        minlen=1,
        style=dashed,
        weight=4,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">recorded-staging・tnlastation-staging /<BR/>NFS</FONT></TD></TR></TABLE>>];
}
`;default:throw Error(`Unknown viewId: `+e)}},t=e=>{switch(e){case`index`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1651pt" height="1957pt"
 viewBox="0.00 0.00 1651.00 1957.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1942.05)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#3f3f3f" stroke="#2d2d2d" points="8,-8 8,-1385 1058.8,-1385 1058.8,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1372.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_pve</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="91.1,-58 91.1,-859 1008.8,-859 1008.8,-58 91.1,-58"/>
<text xml:space="preserve" text-anchor="start" x="99.1" y="-846.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">PROXMOX VEクラスタ</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_providers</title>
<polygon fill="#454545" stroke="#313131" points="8.83,-1393 8.83,-1919 1613.02,-1919 1613.02,-1393 8.83,-1393"/>
<text xml:space="preserve" text-anchor="start" x="16.83" y="-1906.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">外部サービス</text>
</g>
<!-- cp1 -->
<g id="node1" class="node">
<title>cp1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="942.69,-208 665.87,-208 665.87,-108 942.69,-108 942.69,-208"/>
<text xml:space="preserve" text-anchor="start" x="675.88" y="-150" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s CP01 / VM13001 /</text>
</g>
<!-- worker1 -->
<g id="node2" class="node">
<title>worker1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="958.8,-353 649.76,-353 649.76,-253 958.8,-253 958.8,-353"/>
<text xml:space="preserve" text-anchor="start" x="659.77" y="-295" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s worker01 / VM13004 /</text>
</g>
<!-- cp2 -->
<g id="node3" class="node">
<title>cp2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="942.69,-498 665.87,-498 665.87,-398 942.69,-398 942.69,-498"/>
<text xml:space="preserve" text-anchor="start" x="675.88" y="-440" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s CP02 / VM13002 /</text>
</g>
<!-- cp3 -->
<g id="node4" class="node">
<title>cp3</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="942.69,-643 665.87,-643 665.87,-543 942.69,-543 942.69,-643"/>
<text xml:space="preserve" text-anchor="start" x="675.88" y="-585" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s CP03 / VM13003 /</text>
</g>
<!-- worker2 -->
<g id="node5" class="node">
<title>worker2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="958.8,-788 649.76,-788 649.76,-688 958.8,-688 958.8,-788"/>
<text xml:space="preserve" text-anchor="start" x="659.77" y="-730" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s worker02 / VM13005 /</text>
</g>
<!-- nas1 -->
<g id="node6" class="node">
<title>nas1</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M423.47,-343.91C423.47,-348.93 360.19,-353 282.29,-353 204.38,-353 141.1,-348.93 141.1,-343.91 141.1,-343.91 141.1,-262.09 141.1,-262.09 141.1,-257.07 204.38,-253 282.29,-253 360.19,-253 423.47,-257.07 423.47,-262.09 423.47,-262.09 423.47,-343.91 423.47,-343.91"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M423.47,-343.91C423.47,-338.9 360.19,-334.82 282.29,-334.82 204.38,-334.82 141.1,-338.9 141.1,-343.91"/>
<text xml:space="preserve" text-anchor="start" x="151.11" y="-295" font-family="Arial" font-size="20.00" fill="#f8fafc">nas&#45;01 / TrueNAS VM69001 /</text>
</g>
<!-- nas2 -->
<g id="node7" class="node">
<title>nas2</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M423.47,-560.91C423.47,-565.93 360.19,-570 282.29,-570 204.38,-570 141.1,-565.93 141.1,-560.91 141.1,-560.91 141.1,-479.09 141.1,-479.09 141.1,-474.07 204.38,-470 282.29,-470 360.19,-470 423.47,-474.07 423.47,-479.09 423.47,-479.09 423.47,-560.91 423.47,-560.91"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M423.47,-560.91C423.47,-555.9 360.19,-551.82 282.29,-551.82 204.38,-551.82 141.1,-555.9 141.1,-560.91"/>
<text xml:space="preserve" text-anchor="start" x="151.11" y="-512" font-family="Arial" font-size="20.00" fill="#f8fafc">nas&#45;02 / TrueNAS VM69002 /</text>
</g>
<!-- pbs -->
<g id="node8" class="node">
<title>pbs</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M403.47,-741.91C403.47,-746.93 349.16,-751 282.29,-751 215.42,-751 161.1,-746.93 161.1,-741.91 161.1,-741.91 161.1,-660.09 161.1,-660.09 161.1,-655.07 215.42,-651 282.29,-651 349.16,-651 403.47,-655.07 403.47,-660.09 403.47,-660.09 403.47,-741.91 403.47,-741.91"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M403.47,-741.91C403.47,-736.9 349.16,-732.82 282.29,-732.82 215.42,-732.82 161.1,-736.9 161.1,-741.91"/>
<text xml:space="preserve" text-anchor="start" x="171.11" y="-693" font-family="Arial" font-size="20.00" fill="#f8fafc">PBS VM14001 / VLAN20</text>
</g>
<!-- cloudflare -->
<g id="node9" class="node">
<title>cloudflare</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="505.74,-1848 58.83,-1848 58.83,-1668 505.74,-1668 505.74,-1848"/>
<text xml:space="preserve" text-anchor="start" x="236.71" y="-1770" font-family="Arial" font-size="20.00" fill="#eff6ff">Cloudflare</text>
<text xml:space="preserve" text-anchor="start" x="78.89" y="-1747" font-family="Arial" font-size="15.00" fill="#bfdbfe">Cloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS</text>
<text xml:space="preserve" text-anchor="start" x="216.44" y="-1729" font-family="Arial" font-size="15.00" fill="#bfdbfe">APIとWARPも提供。</text>
</g>
<!-- bitwarden -->
<g id="node10" class="node">
<title>bitwarden</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="442.31,-1623 122.27,-1623 122.27,-1443 442.31,-1443 442.31,-1623"/>
<text xml:space="preserve" text-anchor="start" x="158.89" y="-1545" font-family="Arial" font-size="20.00" fill="#eff6ff">Bitwarden Secrets Manager</text>
<text xml:space="preserve" text-anchor="start" x="159.33" y="-1522" font-family="Arial" font-size="15.00" fill="#bfdbfe">Terraform・GitHub Actions・External</text>
<text xml:space="preserve" text-anchor="start" x="200.6" y="-1504" font-family="Arial" font-size="15.00" fill="#bfdbfe">Secretsへ秘密情報を配布。</text>
</g>
<!-- network -->
<g id="node11" class="node">
<title>network</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="506.58,-1089 58,-1089 58,-909 506.58,-909 506.58,-1089"/>
<text xml:space="preserve" text-anchor="start" x="129.46" y="-1011" font-family="Arial" font-size="20.00" fill="#fafafa">ネットワーク機器 / IX2215・SW・AP</text>
<text xml:space="preserve" text-anchor="start" x="201.43" y="-988" font-family="Arial" font-size="15.00" fill="#d4d4d4">IX2215・US&#45;8&#45;60W・FS</text>
<text xml:space="preserve" text-anchor="start" x="78.06" y="-970" font-family="Arial" font-size="15.00" fill="#d4d4d4">AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。</text>
</g>
<!-- idrive -->
<g id="node12" class="node">
<title>idrive</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1563.02,-1606.64C1563.02,-1615.67 1458.76,-1623 1330.41,-1623 1202.06,-1623 1097.8,-1615.67 1097.8,-1606.64 1097.8,-1606.64 1097.8,-1459.36 1097.8,-1459.36 1097.8,-1450.33 1202.06,-1443 1330.41,-1443 1458.76,-1443 1563.02,-1450.33 1563.02,-1459.36 1563.02,-1459.36 1563.02,-1606.64 1563.02,-1606.64"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1563.02,-1606.64C1563.02,-1597.61 1458.76,-1590.27 1330.41,-1590.27 1202.06,-1590.27 1097.8,-1597.61 1097.8,-1606.64"/>
<text xml:space="preserve" text-anchor="start" x="1244.82" y="-1536" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2（S3互換）</text>
<text xml:space="preserve" text-anchor="start" x="1117.85" y="-1513" font-family="Arial" font-size="15.00" fill="#f9b27c">S3互換の保存先。PBS・DB・NAS・録画・監視のバックアップを保存。</text>
</g>
<!-- worker_pi1 -->
<g id="node13" class="node">
<title>worker_pi1</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="983.84,-1089 624.72,-1089 624.72,-909 983.84,-909 983.84,-1089"/>
<text xml:space="preserve" text-anchor="start" x="644.78" y="-1014" font-family="Arial" font-size="20.00" fill="#fafafa">Raspberry Pi / home&#45;k8s worker03 /</text>
<text xml:space="preserve" text-anchor="start" x="767.03" y="-990" font-family="Arial" font-size="20.00" fill="#fafafa">VLAN10</text>
<text xml:space="preserve" text-anchor="start" x="682.56" y="-967" font-family="Arial" font-size="15.00" fill="#d4d4d4">Raspberry Pi / Talos Linux（arm64）</text>
</g>
<!-- worker_pi2 -->
<g id="node14" class="node">
<title>worker_pi2</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="983.84,-1314 624.72,-1314 624.72,-1134 983.84,-1134 983.84,-1314"/>
<text xml:space="preserve" text-anchor="start" x="644.78" y="-1239" font-family="Arial" font-size="20.00" fill="#fafafa">Raspberry Pi / home&#45;k8s worker04 /</text>
<text xml:space="preserve" text-anchor="start" x="767.03" y="-1215" font-family="Arial" font-size="20.00" fill="#fafafa">VLAN10</text>
<text xml:space="preserve" text-anchor="start" x="682.56" y="-1192" font-family="Arial" font-size="15.00" fill="#d4d4d4">Raspberry Pi / Talos Linux（arm64）</text>
</g>
<!-- cloudflare&#45;&gt;cp1 -->
<g id="edge5" class="edge">
<title>cloudflare&#45;&gt;cp1</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M485.11,-1668.01C492.83,-1661.15 500.04,-1653.82 506.58,-1646 584.22,-1553.04 577.04,-1498.51 588.24,-1395.16"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="590.82,-1395.75 589.05,-1388.01 585.6,-1395.16 590.82,-1395.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="463.62,-1513.28 463.62,-1536.08 569.22,-1536.08 569.22,-1513.28 463.62,-1513.28"/>
<text xml:space="preserve" text-anchor="start" x="466.62" y="-1519.08" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access・Tunnel</text>
</g>
<!-- bitwarden&#45;&gt;cp1 -->
<g id="edge6" class="edge">
<title>bitwarden&#45;&gt;cp1</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M442.09,-1448.5C465.06,-1432.7 487.39,-1415.09 506.58,-1396 507.78,-1394.8 508.97,-1393.62 510.13,-1392.45"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="511.99,-1394.31 515.41,-1387.14 508.26,-1390.61 511.99,-1394.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="411.51,-1396.13 411.51,-1418.93 481.31,-1418.93 481.31,-1396.13 411.51,-1396.13"/>
<text xml:space="preserve" text-anchor="start" x="414.51" y="-1401.93" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret同期</text>
</g>
<!-- network&#45;&gt;cp1 -->
<g id="edge3" class="edge">
<title>network&#45;&gt;cp1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M469.5,-909.04C483.36,-897.32 496.02,-884.33 506.58,-870 507.26,-869.07 507.94,-868.15 508.61,-867.22"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="510.5,-869.09 512.72,-861.46 506.23,-866.04 510.5,-869.09"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="437.01,-863.07 437.01,-885.87 493.58,-885.87 493.58,-863.07 437.01,-863.07"/>
<text xml:space="preserve" text-anchor="start" x="440.01" y="-868.87" font-family="Arial" font-size="14.00" fill="#c9c9c9">宅内LAN</text>
</g>
<!-- network&#45;&gt;worker_pi1 -->
<g id="edge1" class="edge">
<title>network&#45;&gt;worker_pi1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M506.45,-999C542.43,-999 579.37,-999 614.43,-999"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="614.23,-1001.63 621.73,-999 614.23,-996.38 614.23,-1001.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="536.58,-999 536.58,-1021.8 594.72,-1021.8 594.72,-999 536.58,-999"/>
<text xml:space="preserve" text-anchor="start" x="539.58" y="-1004.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">VLAN10</text>
</g>
<!-- network&#45;&gt;worker_pi2 -->
<g id="edge2" class="edge">
<title>network&#45;&gt;worker_pi2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M491.04,-1088.9C532.03,-1106.63 574.82,-1125.15 615.12,-1142.58"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="614.05,-1144.98 621.98,-1145.55 616.14,-1140.16 614.05,-1144.98"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="536.58,-1131.65 536.58,-1154.45 594.72,-1154.45 594.72,-1131.65 536.58,-1131.65"/>
<text xml:space="preserve" text-anchor="start" x="539.58" y="-1137.45" font-family="Arial" font-size="14.00" fill="#c9c9c9">VLAN10</text>
</g>
<!-- worker_pi2&#45;&gt;idrive -->
<g id="edge4" class="edge">
<title>worker_pi2&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1058.79,-1373.46C1096.43,-1395.65 1134.3,-1417.97 1169.29,-1438.6"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1167.88,-1440.82 1175.67,-1442.36 1170.54,-1436.29 1167.88,-1440.82"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1042.49,-1385.86 1042.49,-1408.66 1118.51,-1408.66 1118.51,-1385.86 1042.49,-1385.86"/>
<text xml:space="preserve" text-anchor="start" x="1045.49" y="-1391.66" font-family="Arial" font-size="14.00" fill="#ffe0c2">バックアップ</text>
</g>
</g>
</svg>
`;case`home_apps`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1520pt" height="1360pt"
 viewBox="0.00 0.00 1520.00 1360.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1345.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="325.78,-140 325.78,-1322 1481.54,-1322 1481.54,-140 325.78,-140"/>
<text xml:space="preserve" text-anchor="start" x="333.78" y="-1309.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_apps</title>
<polygon fill="#3e4651" stroke="#2d333d" points="662.86,-180 662.86,-801 1395.35,-801 1395.35,-180 662.86,-180"/>
<text xml:space="preserve" text-anchor="start" x="670.86" y="-788.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">生活サービス / LOOCKIT・COUPON・WOL</text>
</g>
<!-- loockit -->
<g id="node1" class="node">
<title>loockit</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="959.6,-460.01 705.05,-460.01 705.05,-360 959.6,-360 959.6,-460.01"/>
<text xml:space="preserve" text-anchor="start" x="715.06" y="-402" font-family="Arial" font-size="20.00" fill="#eff6ff">Loockit / BLEスマートロック</text>
</g>
<!-- coupon_manager -->
<g id="node2" class="node">
<title>coupon_manager</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="922.33,-600.01 742.33,-600.01 742.33,-500 922.33,-500 922.33,-600.01"/>
<text xml:space="preserve" text-anchor="start" x="755.05" y="-542" font-family="Arial" font-size="20.00" fill="#eff6ff">Coupon Manager</text>
</g>
<!-- wol -->
<g id="node3" class="node">
<title>wol</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1355.35,-460.01 1175.35,-460.01 1175.35,-360 1355.35,-360 1355.35,-460.01"/>
<text xml:space="preserve" text-anchor="start" x="1202.55" y="-402" font-family="Arial" font-size="20.00" fill="#f8fafc">Wake&#45;on&#45;LAN</text>
</g>
<!-- annict_scraper -->
<g id="node4" class="node">
<title>annict_scraper</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="947.93,-320.01 716.73,-320.01 716.73,-220 947.93,-220 947.93,-320.01"/>
<text xml:space="preserve" text-anchor="start" x="726.74" y="-262" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict scraper / 番組照合</text>
</g>
<!-- magic_mirror -->
<g id="node5" class="node">
<title>magic_mirror</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="961.79,-740.01 702.86,-740.01 702.86,-640 961.79,-640 961.79,-740.01"/>
<text xml:space="preserve" text-anchor="start" x="712.87" y="-682" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror / ダッシュボード</text>
</g>
<!-- platform -->
<g id="node6" class="node">
<title>platform</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="579.19,-829.01 365.78,-829.01 365.78,-729 579.19,-729 579.19,-829.01"/>
<text xml:space="preserve" text-anchor="start" x="375.79" y="-771" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s クラスタ基盤</text>
</g>
<!-- agent -->
<g id="node7" class="node">
<title>agent</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="562.49,-969.01 382.49,-969.01 382.49,-869 562.49,-869 562.49,-969.01"/>
<text xml:space="preserve" text-anchor="start" x="422.48" y="-911" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅監視基盤</text>
</g>
<!-- management -->
<g id="node8" class="node">
<title>management</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="562.49,-1149.01 382.49,-1149.01 382.49,-1049 562.49,-1049 562.49,-1149.01"/>
<text xml:space="preserve" text-anchor="start" x="422.48" y="-1091" font-family="Arial" font-size="20.00" fill="#f8fafc">クラスタ運用</text>
</g>
<!-- eso -->
<g id="node9" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="957.94,-941.01 706.71,-941.01 706.71,-841 957.94,-841 957.94,-941.01"/>
<text xml:space="preserve" text-anchor="start" x="716.72" y="-883" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- dns -->
<g id="node10" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="925.14,-1081.01 739.52,-1081.01 739.52,-981 925.14,-981 925.14,-1081.01"/>
<text xml:space="preserve" text-anchor="start" x="749.53" y="-1023" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- nextcloud -->
<g id="node11" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="922.33,-1261.01 742.33,-1261.01 742.33,-1161 922.33,-1161 922.33,-1261.01"/>
<text xml:space="preserve" text-anchor="start" x="787.86" y="-1203" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node12" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1441.54,-1081.01 1089.16,-1081.01 1089.16,-981 1441.54,-981 1441.54,-1081.01"/>
<text xml:space="preserve" text-anchor="start" x="1099.17" y="-1023" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信 / EPGStation・TNLaStation</text>
</g>
<!-- databases -->
<g id="node13" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1355.93,-941.01 1174.77,-941.01 1174.77,-841 1355.93,-841 1355.93,-941.01"/>
<text xml:space="preserve" text-anchor="start" x="1184.78" y="-883" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- kiosk -->
<g id="node14" class="node">
<title>kiosk</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="597.52,-100.01 347.45,-100.01 347.45,0 597.52,0 597.52,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="357.46" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror表示 / VM5000</text>
</g>
<!-- edge -->
<g id="node15" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="243.16,-969.01 63.16,-969.01 63.16,-869 243.16,-869 243.16,-969.01"/>
<text xml:space="preserve" text-anchor="start" x="107.58" y="-911" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- nas02 -->
<g id="node16" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M288.78,-819.92C288.78,-824.93 227.99,-829.01 153.16,-829.01 78.32,-829.01 17.53,-824.93 17.53,-819.92 17.53,-819.92 17.53,-738.09 17.53,-738.09 17.53,-733.08 78.32,-729 153.16,-729 227.99,-729 288.78,-733.08 288.78,-738.09 288.78,-738.09 288.78,-819.92 288.78,-819.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M288.78,-819.92C288.78,-814.9 227.99,-810.82 153.16,-810.82 78.32,-810.82 17.53,-814.9 17.53,-819.92"/>
<text xml:space="preserve" text-anchor="start" x="27.54" y="-771" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- annict -->
<g id="node17" class="node">
<title>annict</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1355.35,-100.01 1175.35,-100.01 1175.35,0 1355.35,0 1355.35,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="1218.66" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict API</text>
</g>
<!-- loockit&#45;&gt;wol -->
<!-- coupon_manager&#45;&gt;databases -->
<!-- annict_scraper&#45;&gt;annict -->
<g id="edge11" class="edge">
<title>annict_scraper&#45;&gt;annict</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M931.13,-220.08C1001.38,-184.23 1095.68,-136.09 1166.04,-100.18"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1167.18,-102.55 1172.67,-96.8 1164.8,-97.87 1167.18,-102.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="989.79,-186.18 989.79,-208.98 1061.16,-208.98 1061.16,-186.18 989.79,-186.18"/>
<text xml:space="preserve" text-anchor="start" x="992.79" y="-191.98" font-family="Arial" font-size="14.00" fill="#bbfcd3">Annict API</text>
</g>
<!-- platform&#45;&gt;eso -->
<!-- agent&#45;&gt;management -->
<!-- management&#45;&gt;dns -->
<!-- eso&#45;&gt;recording -->
<!-- dns&#45;&gt;nextcloud -->
<!-- kiosk&#45;&gt;magic_mirror -->
<g id="edge8" class="edge">
<title>kiosk&#45;&gt;magic_mirror</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M597.41,-66.45C619.81,-75.1 640.56,-88.01 654.86,-107.2 671.89,-130.05 646.86,-596.43 662.86,-620 671.17,-632.25 682.06,-642.35 694.31,-650.69"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="692.69,-652.78 700.43,-654.57 695.5,-648.34 692.69,-652.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="625.52,-107.2 625.52,-130 654.86,-130 654.86,-107.2 625.52,-107.2"/>
<text xml:space="preserve" text-anchor="start" x="628.52" y="-113" font-family="Arial" font-size="14.00" fill="#bbfcd3">表示</text>
</g>
<!-- edge&#45;&gt;platform -->
<g id="edge9" class="edge">
<title>edge&#45;&gt;platform</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M242.97,-879.82C265.8,-869.75 291.04,-858.61 316.17,-847.53"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="317.22,-849.93 323.02,-844.51 315.1,-845.13 317.22,-849.93"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="0,-838.7 0,-861.5 284.5,-861.5 284.5,-838.7 0,-838.7"/>
<text xml:space="preserve" text-anchor="start" x="3" y="-844.5" font-family="Arial" font-size="14.00" fill="#bbfcd3">認証済みHTTP / Access・mTLS → 内部Service</text>
</g>
<!-- nas02&#45;&gt;platform -->
<g id="edge10" class="edge">
<title>nas02&#45;&gt;platform</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M289.65,-779C298.16,-779 306.75,-779 315.33,-779"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="315.26,-781.63 322.76,-779 315.26,-776.38 315.26,-781.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="307.69,-767.6 307.69,-790.4 454.49,-790.4 454.49,-767.6 307.69,-767.6"/>
<text xml:space="preserve" text-anchor="start" x="310.69" y="-773.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">アプリ・DB・監視のNFS</text>
</g>
</g>
</svg>
`;case`access`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2223pt" height="881pt"
 viewBox="0.00 0.00 2223.00 881.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 866.05)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#1c417d" stroke="#1c356c" points="371.57,-201 371.57,-768 1745.86,-768 1745.86,-201 371.57,-201"/>
<text xml:space="preserve" text-anchor="start" x="379.57" y="-755.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_edge</title>
<polygon fill="#51321f" stroke="#3f2717" points="403.57,-233 403.57,-715 1713.86,-715 1713.86,-233 403.57,-233"/>
<text xml:space="preserve" text-anchor="start" x="411.57" y="-702.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_routes</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1371.54,-273 1371.54,-654 1673.86,-654 1673.86,-273 1371.54,-273"/>
<text xml:space="preserve" text-anchor="start" x="1379.54" y="-641.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">公開HOSTNAME / 設定から抽出</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1400.7,-8 1400.7,-193 1644.7,-193 1644.7,-8 1400.7,-8"/>
<text xml:space="preserve" text-anchor="start" x="1408.7" y="-180.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1861.21,-184 1861.21,-843 2185.21,-843 2185.21,-184 1861.21,-184"/>
<text xml:space="preserve" text-anchor="start" x="1869.21" y="-830.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1901.21,-597 1901.21,-782 2145.21,-782 2145.21,-597 1901.21,-597"/>
<text xml:space="preserve" text-anchor="start" x="1909.21" y="-769.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1901.21,-372 1901.21,-557 2145.21,-557 2145.21,-372 1901.21,-372"/>
<text xml:space="preserve" text-anchor="start" x="1909.21" y="-544.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<!-- protected -->
<g id="node1" class="node">
<title>protected</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1633.86,-413 1411.54,-413 1411.54,-313 1633.86,-313 1633.86,-413"/>
<text xml:space="preserve" text-anchor="start" x="1421.55" y="-355" font-family="Arial" font-size="20.00" fill="#f8fafc">Access保護のhostname</text>
</g>
<!-- exceptions -->
<g id="node2" class="node">
<title>exceptions</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1617.17,-593 1428.23,-593 1428.23,-493 1617.17,-493 1617.17,-593"/>
<text xml:space="preserve" text-anchor="start" x="1438.24" y="-535" font-family="Arial" font-size="20.00" fill="#f8fafc">例外 / mTLS専用API</text>
</g>
<!-- access -->
<g id="node3" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="758.13,-573 443.57,-573 443.57,-473 758.13,-473 758.13,-573"/>
<text xml:space="preserve" text-anchor="start" x="453.58" y="-515" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- mtls -->
<g id="node4" class="node">
<title>mtls</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="703.66,-393 498.04,-393 498.04,-293 703.66,-293 703.66,-393"/>
<text xml:space="preserve" text-anchor="start" x="508.05" y="-335" font-family="Arial" font-size="20.00" fill="#f8fafc">mTLS / 専用APIの例外</text>
</g>
<!-- tunnel -->
<g id="node5" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1220.72,-413 1040.72,-413 1040.72,-313 1220.72,-313 1220.72,-413"/>
<text xml:space="preserve" text-anchor="start" x="1051.79" y="-355" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- reventer -->
<g id="node6" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1612.7,-140 1432.7,-140 1432.7,-40 1612.7,-40 1612.7,-140"/>
<text xml:space="preserve" text-anchor="start" x="1477.68" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- argo -->
<g id="node7" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2113.21,-729 1933.21,-729 1933.21,-629 2113.21,-629 2113.21,-729"/>
<text xml:space="preserve" text-anchor="start" x="1970.98" y="-671" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- network -->
<g id="node8" class="node">
<title>network</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2113.21,-504 1933.21,-504 1933.21,-404 2113.21,-404 2113.21,-504"/>
<text xml:space="preserve" text-anchor="start" x="1956.53" y="-446" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- pve -->
<g id="node9" class="node">
<title>pve</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="2122.13,-324 1924.3,-324 1924.3,-224 2122.13,-224 2122.13,-324"/>
<text xml:space="preserve" text-anchor="start" x="1934.3" y="-266" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox VEクラスタ</text>
</g>
<!-- user -->
<g id="node10" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-753 0,-753 0,-653 180,-653 180,-753"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-695" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- operator -->
<g id="node11" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-573 0,-573 0,-473 180,-473 180,-573"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-515" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- client -->
<g id="node12" class="node">
<title>client</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-393 0,-393 0,-293 180,-293 180,-393"/>
<text xml:space="preserve" text-anchor="start" x="23.32" y="-335" font-family="Arial" font-size="20.00" fill="#f8fafc">専用クライアント</text>
</g>
<!-- protected&#45;&gt;argo -->
<g id="edge10" class="edge">
<title>protected&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.86,-392.93C1672.04,-406.93 1713.36,-426.51 1745.86,-453 1750.83,-457.05 1749.85,-460 1753.86,-465 1797.01,-518.78 1807.85,-533.34 1861.21,-577 1881.34,-593.46 1904.27,-609.43 1926.4,-623.65"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1924.87,-625.79 1932.61,-627.59 1927.69,-621.36 1924.87,-625.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-569.44 1753.86,-592.24 1853.21,-592.24 1853.21,-569.44 1753.86,-569.44"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-575.24" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;network -->
<g id="edge11" class="edge">
<title>protected&#45;&gt;network</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.72,-383.08C1720.15,-398.86 1839.46,-420.64 1922.99,-435.89"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1922.42,-438.45 1930.27,-437.22 1923.36,-433.29 1922.42,-438.45"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-421.97 1753.86,-444.77 1853.21,-444.77 1853.21,-421.97 1753.86,-421.97"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-427.77" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;pve -->
<g id="edge9" class="edge">
<title>protected&#45;&gt;pve</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.8,-329.57C1671.57,-319.13 1714.29,-308.47 1753.86,-301.2 1806.21,-291.58 1864.98,-285.14 1914.14,-280.96"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1914.21,-283.59 1921.47,-280.35 1913.77,-278.35 1914.21,-283.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-301.2 1753.86,-324 1853.21,-324 1853.21,-301.2 1753.86,-301.2"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-307" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge4" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M758.09,-475.64C846.57,-448.82 954.55,-416.1 1031.26,-392.84"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1031.62,-395.48 1038.03,-390.79 1030.1,-390.45 1031.62,-395.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="838.86,-457.33 838.86,-480.13 959.99,-480.13 959.99,-457.33 838.86,-457.33"/>
<text xml:space="preserve" text-anchor="start" x="841.86" y="-463.13" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- mtls&#45;&gt;tunnel -->
<g id="edge5" class="edge">
<title>mtls&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M703.63,-346.86C797.91,-350.43 937.27,-355.71 1030.67,-359.25"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1030.36,-361.86 1037.95,-359.52 1030.56,-356.62 1030.36,-361.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="808.13,-357.64 808.13,-380.44 990.72,-380.44 990.72,-357.64 808.13,-357.64"/>
<text xml:space="preserve" text-anchor="start" x="811.13" y="-363.44" font-family="Arial" font-size="14.00" fill="#cbd0fd">mTLS検証済みのAPIリクエスト</text>
</g>
<!-- tunnel&#45;&gt;protected -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;protected</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1220.7,-363C1274.25,-363 1343.12,-363 1401.47,-363"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1401.33,-365.63 1408.83,-363 1401.33,-360.38 1401.33,-365.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-363 1270.72,-385.8 1361.54,-385.8 1361.54,-363 1270.72,-363"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-368.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">hostname転送</text>
</g>
<!-- tunnel&#45;&gt;exceptions -->
<g id="edge7" class="edge">
<title>tunnel&#45;&gt;exceptions</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1220.7,-404.07C1279.72,-431.31 1357.35,-467.14 1418.99,-495.59"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1417.69,-497.88 1425.6,-498.64 1419.89,-493.12 1417.69,-497.88"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-463.78 1270.72,-486.58 1361.54,-486.58 1361.54,-463.78 1270.72,-463.78"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-469.58" font-family="Arial" font-size="14.00" fill="#bbfcd3">hostname転送</text>
</g>
<!-- tunnel&#45;&gt;reventer -->
<g id="edge8" class="edge">
<title>tunnel&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1202.8,-313.25C1270.35,-265.95 1371.79,-194.94 1442.05,-145.76"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1443.34,-148.06 1447.98,-141.61 1440.33,-143.76 1443.34,-148.06"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-258.98 1270.72,-281.78 1361.54,-281.78 1361.54,-258.98 1270.72,-258.98"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-264.78" font-family="Arial" font-size="14.00" fill="#cbd0fd">hostname転送</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-671.54C254.07,-645.32 361.33,-607.37 448.89,-576.4"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="449.6,-578.93 455.79,-573.96 447.85,-573.99 449.6,-578.93"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-652.28 230,-675.08 363.57,-675.08 363.57,-652.28 230,-652.28"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-658.08" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-523C249.73,-523 348.9,-523 433.34,-523"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="433.3,-525.63 440.8,-523 433.3,-520.38 433.3,-525.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-523 230,-545.8 363.57,-545.8 363.57,-523 230,-523"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-528.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
<!-- client&#45;&gt;mtls -->
<g id="edge3" class="edge">
<title>client&#45;&gt;mtls</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-343C265.6,-343 395.5,-343 488.12,-343"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="487.84,-345.63 495.34,-343 487.84,-340.38 487.84,-345.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="241.28,-343 241.28,-365.8 352.3,-365.8 352.3,-343 241.28,-343"/>
<text xml:space="preserve" text-anchor="start" x="244.28" y="-348.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">クライアント証明書</text>
</g>
</g>
</svg>
`;case`delivery`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2516pt" height="1007pt"
 viewBox="0.00 0.00 2516.00 1007.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 992.28)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="670,-8 670,-534.42 2478,-534.42 2478,-8 670,-8"/>
<text xml:space="preserve" text-anchor="start" x="678" y="-521.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="710,-272.01 710,-473.22 1866,-473.22 1866,-272.01 710,-272.01"/>
<text xml:space="preserve" text-anchor="start" x="718" y="-460.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_management</title>
<polygon fill="#5a3620" stroke="#462a17" points="1906,-272.01 1906,-473.22 2438,-473.22 2438,-272.01 1906,-272.01"/>
<text xml:space="preserve" text-anchor="start" x="1914" y="-460.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">自宅基盤の構成管理</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2167,-48 2167,-233.21 2411,-233.21 2411,-48 2167,-48"/>
<text xml:space="preserve" text-anchor="start" x="2175" y="-220.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-272.01 8,-969.23 662,-969.23 662,-272.01 8,-272.01"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-956.33" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<!-- images -->
<g id="node1" class="node">
<title>images</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="930,-412.02 750,-412.02 750,-312.01 930,-312.01 930,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="773.85" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Image Updater</text>
</g>
<!-- argo -->
<g id="node2" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1512,-412.02 1332,-412.02 1332,-312.01 1512,-312.01 1512,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="1369.76" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- runner -->
<g id="node3" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1825.71,-412.02 1572.29,-412.02 1572.29,-312.01 1825.71,-312.01 1825.71,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="1582.3" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 共用のrunner制御基盤</text>
</g>
<!-- tfc_agents -->
<g id="node4" class="node">
<title>tfc_agents</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1271.61,-412.02 990.39,-412.02 990.39,-312.01 1271.61,-312.01 1271.61,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="1000.39" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud agents / 自宅</text>
</g>
<!-- ansible -->
<g id="node5" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2126,-412.02 1946,-412.02 1946,-312.01 2126,-312.01 2126,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="2003.2" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- packer -->
<g id="node6" class="node">
<title>packer</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2397.6,-412.02 2186.4,-412.02 2186.4,-312.01 2397.6,-312.01 2397.6,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="2196.41" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Packer / VM template</text>
</g>
<!-- network -->
<g id="node7" class="node">
<title>network</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2379,-180.01 2199,-180.01 2199,-80 2379,-80 2379,-180.01"/>
<text xml:space="preserve" text-anchor="start" x="2222.32" y="-122" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- pve -->
<g id="node8" class="node">
<title>pve</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="2134.92,-180.01 1937.08,-180.01 1937.08,-80 2134.92,-80 2134.92,-180.01"/>
<text xml:space="preserve" text-anchor="start" x="1947.09" y="-122" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox VEクラスタ</text>
</g>
<!-- github -->
<g id="node9" class="node">
<title>github</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="570.6,-908.03 339.4,-908.03 339.4,-808.02 570.6,-808.02 570.6,-908.03"/>
<text xml:space="preserve" text-anchor="start" x="349.41" y="-850.03" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- terraform_cloud -->
<g id="node10" class="node">
<title>terraform_cloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="228,-705.22 48,-705.22 48,-605.22 228,-605.22 228,-705.22"/>
<text xml:space="preserve" text-anchor="start" x="65.2" y="-647.22" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- github_pages -->
<g id="node11" class="node">
<title>github_pages</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="621.72,-705.22 288.28,-705.22 288.28,-605.22 621.72,-605.22 621.72,-705.22"/>
<text xml:space="preserve" text-anchor="start" x="298.29" y="-647.22" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub Pages / my&#45;infra図・レビュー</text>
</g>
<!-- edge -->
<g id="node12" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="228,-412.02 48,-412.02 48,-312.01 228,-312.01 228,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="92.42" y="-354.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- tfc_agents&#45;&gt;pve -->
<g id="edge10" class="edge">
<title>tfc_agents&#45;&gt;pve</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1213.2,-312.08C1240.68,-297.41 1271.97,-282.46 1302,-272.01 1516.68,-197.31 1781.23,-158.82 1926.89,-141.96"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1927.01,-144.59 1934.16,-141.13 1926.41,-139.37 1927.01,-144.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1398.79,-241.21 1398.79,-264.01 1507.47,-264.01 1507.47,-241.21 1398.79,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="1401.79" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM / ネットワーク</text>
</g>
<!-- ansible&#45;&gt;network -->
<g id="edge6" class="edge">
<title>ansible&#45;&gt;network</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2093.89,-312.1C2112.83,-297.77 2134.54,-283.02 2156,-272.01 2166.38,-266.68 2172.33,-271.82 2181,-264.01 2187.61,-258.05 2186.19,-252.95 2191.27,-242.16"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2193.43,-243.67 2194.83,-235.84 2188.86,-241.09 2193.43,-243.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2039.56,-272 2039.56,-294.8 2156.02,-294.8 2156.02,-272 2039.56,-272"/>
<text xml:space="preserve" text-anchor="start" x="2042.56" y="-277.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">NW・UPS機器設定</text>
</g>
<!-- ansible&#45;&gt;pve -->
<g id="edge5" class="edge">
<title>ansible&#45;&gt;pve</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2036,-312.23C2036,-276.55 2036,-227.98 2036,-190.09"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2038.63,-190.24 2036,-182.74 2033.38,-190.24 2038.63,-190.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2036,-241.21 2036,-264.01 2165.7,-264.01 2165.7,-241.21 2036,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="2039" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM・NAS・LXC設定</text>
</g>
<!-- packer&#45;&gt;pve -->
<g id="edge7" class="edge">
<title>packer&#45;&gt;pve</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2257.38,-312.27C2237.59,-287.69 2210.8,-259.33 2181,-241.21 2169.58,-234.26 2163.76,-239.57 2152,-233.21 2129.39,-220.98 2107.45,-203.59 2088.86,-186.62"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2091.13,-185.15 2083.85,-181.96 2087.56,-188.99 2091.13,-185.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2209.62,-241.21 2209.62,-264.01 2294.21,-264.01 2294.21,-241.21 2209.62,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="2212.62" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM template</text>
</g>
<!-- github&#45;&gt;argo -->
<g id="edge3" class="edge">
<title>github&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M570.49,-835.72C744.22,-799 1076.41,-710.21 1302,-534.42 1340.83,-504.16 1372.18,-457.9 1393.08,-421.07"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1395.35,-422.4 1396.7,-414.57 1390.76,-419.84 1395.35,-422.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1189.27,-643.82 1189.27,-666.62 1238.83,-666.62 1238.83,-643.82 1189.27,-643.82"/>
<text xml:space="preserve" text-anchor="start" x="1192.27" y="-649.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- github&#45;&gt;runner -->
<g id="edge4" class="edge">
<title>github&#45;&gt;runner</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M570.53,-847.74C729.01,-832.19 1020.73,-793.44 1254,-705.22 1393.2,-652.59 1426.5,-628.26 1542,-534.42 1583.93,-500.35 1624.94,-455.04 1654.53,-419.56"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1656.35,-421.47 1659.11,-414.02 1652.31,-418.13 1656.35,-421.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1449.66,-643.82 1449.66,-666.62 1524.14,-666.62 1524.14,-643.82 1449.66,-643.82"/>
<text xml:space="preserve" text-anchor="start" x="1452.66" y="-649.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">Actions job</text>
</g>
<!-- github&#45;&gt;terraform_cloud -->
<g id="edge1" class="edge">
<title>github&#45;&gt;terraform_cloud</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M377.86,-808.16C331.36,-778.71 272.05,-741.14 224.04,-710.72"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="225.51,-708.55 217.77,-706.75 222.7,-712.98 225.51,-708.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="306,-745.22 306,-768.02 396.79,-768.02 396.79,-745.22 306,-745.22"/>
<text xml:space="preserve" text-anchor="start" x="309" y="-751.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">Terraform実行</text>
</g>
<!-- github&#45;&gt;github_pages -->
<g id="edge2" class="edge">
<title>github&#45;&gt;github_pages</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M455,-808.16C455,-780.12 455,-744.73 455,-715.15"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="457.63,-715.48 455,-707.98 452.38,-715.48 457.63,-715.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="455,-745.22 455,-768.02 585.47,-768.02 585.47,-745.22 455,-745.22"/>
<text xml:space="preserve" text-anchor="start" x="458" y="-751.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">構成図・PR比較を公開</text>
</g>
<!-- terraform_cloud&#45;&gt;tfc_agents -->
<g id="edge9" class="edge">
<title>terraform_cloud&#45;&gt;tfc_agents</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M227.84,-614.41C237.89,-610.9 248.07,-607.73 258,-605.22 507.59,-541.97 577.38,-564.53 833.91,-542.42 861.88,-540 934.42,-545.99 960,-534.42 1014.34,-509.82 1060.98,-459.83 1091.76,-420.15"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1093.79,-421.81 1096.25,-414.26 1089.62,-418.63 1093.79,-421.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="833.91,-542.42 833.91,-565.22 1036,-565.22 1036,-542.42 833.91,-542.42"/>
<text xml:space="preserve" text-anchor="start" x="836.91" y="-548.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">workspace runを自宅agentで実行</text>
</g>
<!-- terraform_cloud&#45;&gt;edge -->
<g id="edge8" class="edge">
<title>terraform_cloud&#45;&gt;edge</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M138,-605.48C138,-555.08 138,-476.35 138,-422.37"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="140.63,-422.44 138,-414.94 135.38,-422.44 140.63,-422.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="138,-542.42 138,-565.22 284.83,-565.22 284.83,-542.42 138,-542.42"/>
<text xml:space="preserve" text-anchor="start" x="141" y="-548.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">DNS / Access / Tunnel</text>
</g>
</g>
</svg>
`;case`secrets`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="912pt" height="936pt"
 viewBox="0.00 0.00 912.00 936.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 921.05)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-537 8,-898 864.32,-898 864.32,-537 8,-537"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-885.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_premises</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="543.11,-8 543.11,-529 874.34,-529 874.34,-8 543.11,-8"/>
<text xml:space="preserve" text-anchor="start" x="551.11" y="-516.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<!-- bws -->
<g id="node1" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="314.8,-687 48,-687 48,-587 314.8,-587 314.8,-687"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-629" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- github -->
<g id="node2" class="node">
<title>github</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="824.32,-677 593.13,-677 593.13,-577 824.32,-577 824.32,-677"/>
<text xml:space="preserve" text-anchor="start" x="603.14" y="-619" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- terraform_cloud -->
<g id="node3" class="node">
<title>terraform_cloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="798.73,-837 618.73,-837 618.73,-737 798.73,-737 798.73,-837"/>
<text xml:space="preserve" text-anchor="start" x="635.93" y="-779" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- eso -->
<g id="node4" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="834.34,-468 583.11,-468 583.11,-368 834.34,-368 834.34,-468"/>
<text xml:space="preserve" text-anchor="start" x="593.12" y="-410" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- ansible -->
<g id="node5" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="798.73,-308 618.73,-308 618.73,-208 798.73,-208 798.73,-308"/>
<text xml:space="preserve" text-anchor="start" x="675.93" y="-250" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- backups -->
<g id="node6" class="node">
<title>backups</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="798.73,-148 618.73,-148 618.73,-48 798.73,-48 798.73,-148"/>
<text xml:space="preserve" text-anchor="start" x="642.05" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">バックアップ処理</text>
</g>
<!-- bws&#45;&gt;github -->
<g id="edge1" class="edge">
<title>bws&#45;&gt;github</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M314.62,-634.48C396.97,-632.92 502.23,-630.91 583.1,-629.37"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="582.87,-632 590.31,-629.24 582.77,-626.75 582.87,-632"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="402.66,-633.48 402.66,-656.28 487.25,-656.28 487.25,-633.48 402.66,-633.48"/>
<text xml:space="preserve" text-anchor="start" x="405.66" y="-639.28" font-family="Arial" font-size="14.00" fill="#fcd9d2">CI credential</text>
</g>
<!-- bws&#45;&gt;terraform_cloud -->
<g id="edge2" class="edge">
<title>bws&#45;&gt;terraform_cloud</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M314.62,-674.75C406.04,-700.86 525.71,-735.03 608.89,-758.78"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="608.01,-761.26 615.94,-760.79 609.45,-756.21 608.01,-761.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="399.56,-734.2 399.56,-757 490.35,-757 490.35,-734.2 399.56,-734.2"/>
<text xml:space="preserve" text-anchor="start" x="402.56" y="-740" font-family="Arial" font-size="14.00" fill="#fcd9d2">Terraform変数</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge3" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M302.26,-587.03C384.64,-552.69 493.93,-507.13 578.29,-471.96"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="579.22,-474.42 585.13,-469.11 577.2,-469.57 579.22,-474.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.06,-559.91 410.06,-582.71 479.86,-582.71 479.86,-559.91 410.06,-559.91"/>
<text xml:space="preserve" text-anchor="start" x="413.06" y="-565.71" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;ansible -->
<g id="edge4" class="edge">
<title>bws&#45;&gt;ansible</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M224.15,-587.29C257.39,-549.3 306.26,-496.89 354.8,-457.2 431.49,-394.5 456.59,-386.21 543.11,-338 564.24,-326.23 587.36,-314.38 609.42,-303.55"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="610.49,-305.95 616.08,-300.3 608.19,-301.23 610.49,-305.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="374.26,-457.2 374.26,-480 515.65,-480 515.65,-457.2 374.26,-457.2"/>
<text xml:space="preserve" text-anchor="start" x="377.26" y="-463" font-family="Arial" font-size="14.00" fill="#fcd9d2">機器・PBS用credential</text>
</g>
<!-- bws&#45;&gt;backups -->
<g id="edge5" class="edge">
<title>bws&#45;&gt;backups</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M199.44,-587.29C224.93,-518.27 278.32,-392.23 354.8,-306.2 424.75,-227.53 531.76,-170.24 609.61,-135.9"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="610.36,-138.44 616.18,-133.04 608.26,-133.63 610.36,-138.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="354.8,-306.2 354.8,-329 535.11,-329 535.11,-306.2 354.8,-306.2"/>
<text xml:space="preserve" text-anchor="start" x="357.8" y="-312" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO経由 / backup credential</text>
</g>
</g>
</svg>
`;case`observability`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1952pt" height="735pt"
 viewBox="0.00 0.00 1952.00 735.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 720.05)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="257.34,-258 257.34,-443 530.33,-443 530.33,-258 257.34,-258"/>
<text xml:space="preserve" text-anchor="start" x="265.34" y="-430.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1c417d" stroke="#1c356c" points="640.23,-8 640.23,-697 1914.02,-697 1914.02,-8 640.23,-8"/>
<text xml:space="preserve" text-anchor="start" x="648.23" y="-684.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="680.23,-48 680.23,-504 1874.02,-504 1874.02,-48 680.23,-48"/>
<text xml:space="preserve" text-anchor="start" x="688.23" y="-491.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_agent</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="712.23,-80 712.23,-451 1842.02,-451 1842.02,-80 712.23,-80"/>
<text xml:space="preserve" text-anchor="start" x="720.23" y="-438.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">自宅監視基盤</text>
</g>
<!-- grafana -->
<g id="node1" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="498.33,-390 289.34,-390 289.34,-290 498.33,-290 498.33,-390"/>
<text xml:space="preserve" text-anchor="start" x="299.35" y="-332" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- exporters -->
<g id="node2" class="node">
<title>exporters</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="932.23,-230 752.23,-230 752.23,-130 932.23,-130 932.23,-230"/>
<text xml:space="preserve" text-anchor="start" x="797.21" y="-172" font-family="Arial" font-size="20.00" fill="#f8fafc">exporter群</text>
</g>
<!-- pdc -->
<g id="node3" class="node">
<title>pdc</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="932.23,-390 752.23,-390 752.23,-290 932.23,-290 932.23,-390"/>
<text xml:space="preserve" text-anchor="start" x="768.31" y="-332" font-family="Arial" font-size="20.00" fill="#f8fafc">PDC agent / 自宅</text>
</g>
<!-- collector -->
<g id="node4" class="node">
<title>collector</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1391.93,-220 1092.93,-220 1092.93,-120 1391.93,-120 1391.93,-220"/>
<text xml:space="preserve" text-anchor="start" x="1102.94" y="-162" font-family="Arial" font-size="20.00" fill="#f8fafc">vmagent / scrape・remoteWrite</text>
</g>
<!-- local_store -->
<g id="node5" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1802.02,-380.91C1802.02,-385.93 1756.94,-390 1701.45,-390 1645.95,-390 1600.87,-385.93 1600.87,-380.91 1600.87,-380.91 1600.87,-299.09 1600.87,-299.09 1600.87,-294.07 1645.95,-290 1701.45,-290 1756.94,-290 1802.02,-294.07 1802.02,-299.09 1802.02,-299.09 1802.02,-380.91 1802.02,-380.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1802.02,-380.91C1802.02,-375.9 1756.94,-371.82 1701.45,-371.82 1645.95,-371.82 1600.87,-375.9 1600.87,-380.91"/>
<text xml:space="preserve" text-anchor="start" x="1610.87" y="-332" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- hardware -->
<g id="node6" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="932.23,-636 752.23,-636 752.23,-536 932.23,-536 932.23,-636"/>
<text xml:space="preserve" text-anchor="start" x="767.22" y="-578" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- operator -->
<g id="node7" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-390 0,-390 0,-290 180,-290 180,-390"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-332" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- grafana&#45;&gt;pdc -->
<g id="edge2" class="edge">
<title>grafana&#45;&gt;pdc</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M498.09,-340C571.48,-340 669.48,-340 741.96,-340"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="741.93,-342.63 749.43,-340 741.93,-337.38 741.93,-342.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="538.33,-340 538.33,-362.8 632.23,-362.8 632.23,-340 538.33,-340"/>
<text xml:space="preserve" text-anchor="start" x="541.33" y="-345.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由の検索</text>
</g>
<!-- exporters&#45;&gt;collector -->
<g id="edge4" class="edge">
<title>exporters&#45;&gt;collector</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M932.1,-177.77C976.47,-176.65 1031.52,-175.27 1082.81,-173.98"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1082.56,-176.62 1089.99,-173.8 1082.43,-171.37 1082.56,-176.62"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="988.57,-176.48 988.57,-199.28 1036.59,-199.28 1036.59,-176.48 988.57,-176.48"/>
<text xml:space="preserve" text-anchor="start" x="991.57" y="-182.28" font-family="Arial" font-size="14.00" fill="#ffe0c2">scrape</text>
</g>
<!-- pdc&#45;&gt;local_store -->
<g id="edge5" class="edge">
<title>pdc&#45;&gt;local_store</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M932.14,-340C1089.75,-340 1417.67,-340 1589.69,-340"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1589.5,-342.63 1597,-340 1589.5,-337.38 1589.5,-342.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1175.61,-340 1175.61,-362.8 1309.25,-362.8 1309.25,-340 1175.61,-340"/>
<text xml:space="preserve" text-anchor="start" x="1178.61" y="-345.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">private query / :8428</text>
</g>
<!-- collector&#45;&gt;local_store -->
<g id="edge6" class="edge">
<title>collector&#45;&gt;local_store</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M1377.77,-219.97C1445.4,-245.13 1526.37,-275.25 1590.28,-299.02"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1589.2,-301.42 1597.14,-301.57 1591.03,-296.5 1589.2,-301.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1431.93,-285.01 1431.93,-307.81 1560.87,-307.81 1560.87,-285.01 1431.93,-285.01"/>
<text xml:space="preserve" text-anchor="start" x="1434.93" y="-290.81" font-family="Arial" font-size="14.00" fill="#ffe0c2">remoteWrite / :8428</text>
</g>
<!-- hardware&#45;&gt;collector -->
<g id="edge3" class="edge">
<title>hardware&#45;&gt;collector</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M880.52,-536.17C943.93,-451.73 1068.28,-287.48 1092.93,-265 1108.38,-250.91 1126.16,-237.57 1143.92,-225.59"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1145.31,-227.83 1150.11,-221.5 1142.41,-223.45 1145.31,-227.83"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="972.23,-409.35 972.23,-432.15 1052.93,-432.15 1052.93,-409.35 972.23,-409.35"/>
<text xml:space="preserve" text-anchor="start" x="975.23" y="-415.15" font-family="Arial" font-size="14.00" fill="#ffe0c2">exporter収集</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge1" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-340C211.05,-340 246.43,-340 279.29,-340"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="278.87,-342.63 286.37,-340 278.87,-337.38 278.87,-342.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-340 220,-362.8 249.34,-362.8 249.34,-340 220,-340"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-345.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">照会</text>
</g>
</g>
</svg>
`;case`placement`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="6338pt" height="474pt"
 viewBox="0.00 0.00 6338.00 474.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 458.66)">
<g id="clust1" class="cluster">
<title>cluster_pve</title>
<polygon fill="#1c417d" stroke="#1c356c" points="8,-8 8,-435.61 6300,-435.61 6300,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-422.71" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">PROXMOX VEクラスタ</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_b550m</title>
<polygon fill="#29472f" stroke="#1c3021" points="58,-58 58,-364.41 3129,-364.41 3129,-58 58,-58"/>
<text xml:space="preserve" text-anchor="start" x="66" y="-351.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PVE&#45;B550M</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_cp2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="108,-108 108,-293.21 352,-293.21 352,-108 108,-108"/>
<text xml:space="preserve" text-anchor="start" x="116" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">HOME&#45;K8S CP02 / VM13002 / VLAN20</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_cp3</title>
<polygon fill="#3e4651" stroke="#2d333d" points="402,-108 402,-293.21 646,-293.21 646,-108 402,-108"/>
<text xml:space="preserve" text-anchor="start" x="410" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">HOME&#45;K8S CP03 / VM13003 / VLAN20</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_worker2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="696,-108 696,-293.21 943,-293.21 943,-108 696,-108"/>
<text xml:space="preserve" text-anchor="start" x="704" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">HOME&#45;K8S WORKER02 / VM13005 / VLAN20</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_loockit</title>
<polygon fill="#3e4651" stroke="#2d333d" points="993,-108 993,-293.21 1349,-293.21 1349,-108 993,-108"/>
<text xml:space="preserve" text-anchor="start" x="1001" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">LOOCKIT 02 / CT12903 / VLAN20</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_tuner</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1399,-108 1399,-293.21 1755,-293.21 1755,-108 1399,-108"/>
<text xml:space="preserve" text-anchor="start" x="1407" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">MIRAKURUN STG / CT12904・PX&#45;S1UD / VLAN20</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_x570</title>
<polygon fill="#29472f" stroke="#1c3021" points="3179,-58 3179,-364.41 6250,-364.41 6250,-58 3179,-58"/>
<text xml:space="preserve" text-anchor="start" x="3187" y="-351.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PVE&#45;X570</text>
</g>
<g id="clust9" class="cluster">
<title>cluster_cp1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="3229,-108 3229,-293.21 3473,-293.21 3473,-108 3229,-108"/>
<text xml:space="preserve" text-anchor="start" x="3237" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">HOME&#45;K8S CP01 / VM13001 / VLAN20</text>
</g>
<g id="clust10" class="cluster">
<title>cluster_worker1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="3523,-108 3523,-293.21 3770,-293.21 3770,-108 3523,-108"/>
<text xml:space="preserve" text-anchor="start" x="3531" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">HOME&#45;K8S WORKER01 / VM13004 / VLAN20</text>
</g>
<g id="clust11" class="cluster">
<title>cluster_unifi</title>
<polygon fill="#3e4651" stroke="#2d333d" points="3820,-108 3820,-293.21 4166,-293.21 4166,-108 3820,-108"/>
<text xml:space="preserve" text-anchor="start" x="3828" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">UNIFI OS VM13201 / NATIVE1</text>
</g>
<g id="clust12" class="cluster">
<title>cluster_loockit_1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="4216,-108 4216,-293.21 4572,-293.21 4572,-108 4216,-108"/>
<text xml:space="preserve" text-anchor="start" x="4224" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">LOOCKIT 01 / CT12902 / VLAN20</text>
</g>
<g id="clust13" class="cluster">
<title>cluster_tuner_1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="4622,-108 4622,-293.21 4928,-293.21 4928,-108 4622,-108"/>
<text xml:space="preserve" text-anchor="start" x="4630" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">MIRAKURUN本番 / CT12901・PT3 / VLAN20</text>
</g>
<!-- lb -->
<g id="node1" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="5276.42,-240.01 4959.58,-240.01 4959.58,-140 5276.42,-140 5276.42,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="4969.59" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived VM10001 /</text>
</g>
<!-- pbs -->
<g id="node2" class="node">
<title>pbs</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M5554.18,-230.92C5554.18,-235.93 5499.87,-240.01 5433,-240.01 5366.13,-240.01 5311.82,-235.93 5311.82,-230.92 5311.82,-230.92 5311.82,-149.09 5311.82,-149.09 5311.82,-144.08 5366.13,-140 5433,-140 5499.87,-140 5554.18,-144.08 5554.18,-149.09 5554.18,-149.09 5554.18,-230.92 5554.18,-230.92"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M5554.18,-230.92C5554.18,-225.9 5499.87,-221.82 5433,-221.82 5366.13,-221.82 5311.82,-225.9 5311.82,-230.92"/>
<text xml:space="preserve" text-anchor="start" x="5321.82" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">PBS VM14001 / VLAN20</text>
</g>
<!-- windows -->
<g id="node3" class="node">
<title>windows</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="5883.3,-240.01 5588.7,-240.01 5588.7,-140 5883.3,-140 5883.3,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="5598.71" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Windows / VM60000 / VLAN30</text>
</g>
<!-- nas1 -->
<g id="node4" class="node">
<title>nas1</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M6200.18,-230.92C6200.18,-235.93 6136.9,-240.01 6059,-240.01 5981.1,-240.01 5917.82,-235.93 5917.82,-230.92 5917.82,-230.92 5917.82,-149.09 5917.82,-149.09 5917.82,-144.08 5981.1,-140 6059,-140 6136.9,-140 6200.18,-144.08 6200.18,-149.09 6200.18,-149.09 6200.18,-230.92 6200.18,-230.92"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M6200.18,-230.92C6200.18,-225.9 6136.9,-221.82 6059,-221.82 5981.1,-221.82 5917.82,-225.9 5917.82,-230.92"/>
<text xml:space="preserve" text-anchor="start" x="5927.82" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">nas&#45;01 / TrueNAS VM69001 /</text>
</g>
<!-- lb_1 -->
<g id="node5" class="node">
<title>lb_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2103.42,-240.01 1786.58,-240.01 1786.58,-140 2103.42,-140 2103.42,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="1796.59" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived VM10002 /</text>
</g>
<!-- dev -->
<g id="node6" class="node">
<title>dev</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2465.41,-240.01 2138.59,-240.01 2138.59,-140 2465.41,-140 2465.41,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="2148.6" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">開発用Docker / VM40000 / VLAN20</text>
</g>
<!-- kiosk -->
<g id="node7" class="node">
<title>kiosk</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2761.59,-240.01 2500.41,-240.01 2500.41,-140 2761.59,-140 2761.59,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="2510.41" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror表示 / VM5000 /</text>
</g>
<!-- nas2 -->
<g id="node8" class="node">
<title>nas2</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M3079.18,-230.92C3079.18,-235.93 3015.9,-240.01 2938,-240.01 2860.1,-240.01 2796.82,-235.93 2796.82,-230.92 2796.82,-230.92 2796.82,-149.09 2796.82,-149.09 2796.82,-144.08 2860.1,-140 2938,-140 3015.9,-140 3079.18,-144.08 3079.18,-149.09 3079.18,-149.09 3079.18,-230.92 3079.18,-230.92"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M3079.18,-230.92C3079.18,-225.9 3015.9,-221.82 2938,-221.82 2860.1,-221.82 2796.82,-225.9 2796.82,-230.92"/>
<text xml:space="preserve" text-anchor="start" x="2806.82" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">nas&#45;02 / TrueNAS VM69002 /</text>
</g>
<!-- talos -->
<g id="node9" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="3441,-240.01 3261,-240.01 3261,-140 3441,-140 3441,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="3299.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- talos_1 -->
<g id="node10" class="node">
<title>talos_1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="3736,-240.01 3556,-240.01 3556,-140 3736,-140 3736,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="3594.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- talos_2 -->
<g id="node11" class="node">
<title>talos_2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="320,-240.01 140,-240.01 140,-140 320,-140 320,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="178.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- talos_3 -->
<g id="node12" class="node">
<title>talos_3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="614,-240.01 434,-240.01 434,-140 614,-140 614,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="472.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- talos_4 -->
<g id="node13" class="node">
<title>talos_4</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="909,-240.01 729,-240.01 729,-140 909,-140 909,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="767.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- app -->
<g id="node14" class="node">
<title>app</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="4540.16,-240.01 4247.84,-240.01 4247.84,-140 4540.16,-140 4540.16,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="4257.85" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Loockit REST・gRPC</text>
</g>
<!-- app_1 -->
<g id="node15" class="node">
<title>app_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1317.16,-240.01 1024.84,-240.01 1024.84,-140 1317.16,-140 1317.16,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="1034.85" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Loockit REST・gRPC</text>
</g>
<!-- app_2 -->
<g id="node16" class="node">
<title>app_2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="4896.15,-240.01 4653.85,-240.01 4653.85,-140 4896.15,-140 4896.15,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="4663.86" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Mirakurun / PT3</text>
</g>
<!-- app_3 -->
<g id="node17" class="node">
<title>app_3</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1723.16,-240.01 1430.84,-240.01 1430.84,-140 1723.16,-140 1723.16,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="1440.85" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Mirakurun / PX&#45;S1UD</text>
</g>
<!-- app_4 -->
<g id="node18" class="node">
<title>app_4</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="4134.16,-240.01 3851.84,-240.01 3851.84,-140 4134.16,-140 4134.16,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="3861.85" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Podman / UniFi OS・Network</text>
</g>
</g>
</svg>
`;case`network`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1550pt" height="1126pt"
 viewBox="0.00 0.00 1550.00 1126.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1110.69)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-924.83 1512,-924.83 1512,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-911.93" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_network</title>
<polygon fill="#3e4651" stroke="#2d333d" points="616,-218.81 616,-863.63 1166,-863.63 1166,-218.81 616,-218.81"/>
<text xml:space="preserve" text-anchor="start" x="624" y="-850.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">ネットワーク機器</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_x570</title>
<polygon fill="#3e4651" stroke="#2d333d" points="332,-226.81 332,-412.02 576,-412.02 576,-226.81 332,-226.81"/>
<text xml:space="preserve" text-anchor="start" x="340" y="-399.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">PVE&#45;X570 / PROXMOX</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_b550m</title>
<polygon fill="#3e4651" stroke="#2d333d" points="48,-226.81 48,-412.02 292,-412.02 292,-226.81 48,-226.81"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-399.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">PVE&#45;B550M / PROXMOX</text>
</g>
<!-- router -->
<g id="node1" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1106.62,-802.43 815.38,-802.43 815.38,-702.42 1106.62,-702.42 1106.62,-802.43"/>
<text xml:space="preserve" text-anchor="start" x="825.38" y="-744.43" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / ルーター・VLAN間ACL</text>
</g>
<!-- ethernet -->
<g id="node2" class="node">
<title>ethernet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1084.95,-582.82 837.05,-582.82 837.05,-482.82 1084.95,-482.82 1084.95,-582.82"/>
<text xml:space="preserve" text-anchor="start" x="847.06" y="-524.82" font-family="Arial" font-size="20.00" fill="#f8fafc">宅内Ethernet / VLAN trunk</text>
</g>
<!-- switch -->
<g id="node3" class="node">
<title>switch</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1126.03,-358.82 895.97,-358.82 895.97,-258.81 1126.03,-258.81 1126.03,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="905.98" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">US&#45;8&#45;60W / 管理スイッチ</text>
</g>
<!-- ap -->
<g id="node4" class="node">
<title>ap</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="836,-358.82 656,-358.82 656,-258.81 836,-258.81 836,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="691" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">FS Wi&#45;Fi AP</text>
</g>
<!-- bridge -->
<g id="node5" class="node">
<title>bridge</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="544,-358.82 364,-358.82 364,-258.81 544,-258.81 544,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="385.07" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">enp7s0 / vmbr0</text>
</g>
<!-- bridge_1 -->
<g id="node6" class="node">
<title>bridge_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="260,-358.82 80,-358.82 80,-258.81 260,-258.81 260,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="101.07" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">enp6s0 / vmbr0</text>
</g>
<!-- unifi -->
<g id="node7" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1409.71,-582.82 1206.29,-582.82 1206.29,-482.82 1409.71,-482.82 1409.71,-582.82"/>
<text xml:space="preserve" text-anchor="start" x="1216.3" y="-524.82" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS / VM13201</text>
</g>
<!-- lan -->
<g id="node8" class="node">
<title>lan</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="544,-148.01 364,-148.01 364,-48 544,-48 544,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="375.08" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">LAN / VLAN・経路</text>
</g>
<!-- internet -->
<g id="node9" class="node">
<title>internet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1051,-1095.64 871,-1095.64 871,-995.63 1051,-995.63 1051,-1095.64"/>
<text xml:space="preserve" text-anchor="start" x="927.09" y="-1037.64" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet</text>
</g>
<!-- router&#45;&gt;ethernet -->
<g id="edge3" class="edge">
<title>router&#45;&gt;ethernet</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M843.08,-702.59C828.21,-691.55 815.02,-678.28 805.84,-662.42 789.24,-633.77 806.13,-608.72 834.01,-588.53"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="835.35,-590.79 840.07,-584.4 832.39,-586.46 835.35,-590.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="805.84,-622.82 805.84,-662.42 971,-662.42 971,-622.82 805.84,-622.82"/>
<text xml:space="preserve" text-anchor="start" x="808.84" y="-645.42" font-family="Arial" font-size="14.00" fill="#c9c9c9">GigaEthernet2 / native1 +</text>
<text xml:space="preserve" text-anchor="start" x="808.84" y="-628.62" font-family="Arial" font-size="14.00" fill="#c9c9c9">tag10,20,30,31,40</text>
</g>
<!-- router&#45;&gt;lan -->
<g id="edge4" class="edge">
<title>router&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1106.55,-743.32C1218.03,-728.55 1365.04,-688.68 1440,-582.82 1465.69,-546.55 1457.76,-523.56 1440,-482.82 1371.16,-324.83 1310.5,-295.16 1156,-218.81 1051.77,-167.3 721.84,-126.82 554.06,-108.96"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="554.48,-106.36 546.75,-108.18 553.93,-111.58 554.48,-106.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1421.06,-420.02 1421.06,-442.82 1448.06,-442.82 1448.06,-420.02 1421.06,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="1424.06" y="-428.22" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- ethernet&#45;&gt;switch -->
<g id="edge5" class="edge">
<title>ethernet&#45;&gt;switch</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M909.45,-482.83C895.6,-463.77 886.69,-441.4 895.83,-420.02 904.5,-399.71 918.95,-381.36 934.74,-365.72"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="936.27,-367.89 939.88,-360.81 932.65,-364.09 936.27,-367.89"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="895.83,-420.02 895.83,-442.82 996,-442.82 996,-420.02 895.83,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="898.83" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">802.1Q / uplink</text>
</g>
<!-- ethernet&#45;&gt;ap -->
<g id="edge6" class="edge">
<title>ethernet&#45;&gt;ap</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M865.94,-482.85C848.49,-471.23 831.37,-457.79 817.31,-442.82 797.11,-421.31 780.88,-392.99 769.04,-368.01"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="771.5,-367.08 765.98,-361.37 766.74,-369.28 771.5,-367.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="817.31,-420.02 817.31,-442.82 877,-442.82 877,-420.02 817.31,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="820.31" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">AP trunk</text>
</g>
<!-- ethernet&#45;&gt;bridge -->
<g id="edge7" class="edge">
<title>ethernet&#45;&gt;bridge</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M837.08,-516.7C764.9,-504.21 673.95,-481.91 600.57,-442.82 564.12,-423.4 529.58,-392.89 503.2,-365.99"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="505.18,-364.26 498.09,-360.69 501.41,-367.91 505.18,-364.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="600.57,-420.02 600.57,-442.82 784,-442.82 784,-420.02 600.57,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="603.57" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1管理 / ゲストtag20・30</text>
</g>
<!-- ethernet&#45;&gt;bridge_1 -->
<g id="edge8" class="edge">
<title>ethernet&#45;&gt;bridge_1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M837.1,-526.5C715.37,-518.2 525.82,-496.99 370.57,-442.82 321.24,-425.6 272.25,-393.47 235.03,-365.11"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="236.73,-363.1 229.19,-360.59 233.52,-367.26 236.73,-363.1"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="370.57,-420.02 370.57,-442.82 554,-442.82 554,-420.02 370.57,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="373.57" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1管理 / ゲストtag20・40</text>
</g>
<!-- bridge&#45;&gt;lan -->
<g id="edge9" class="edge">
<title>bridge&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M454,-258.86C454,-228.75 454,-189.98 454,-158.16"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="456.63,-158.18 454,-150.68 451.38,-158.18 456.63,-158.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="454,-188.01 454,-210.81 480.99,-210.81 480.99,-188.01 454,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="457" y="-196.21" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- bridge_1&#45;&gt;lan -->
<g id="edge10" class="edge">
<title>bridge_1&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M236.59,-258.86C279.4,-227.37 335.11,-186.42 379.41,-153.84"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="380.91,-156 385.39,-149.45 377.8,-151.77 380.91,-156"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="329,-188.01 329,-210.81 356,-210.81 356,-188.01 329,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="332" y="-196.21" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- unifi&#45;&gt;switch -->
<g id="edge2" class="edge">
<title>unifi&#45;&gt;switch</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1231.28,-483.02C1199.36,-461.99 1162.3,-436.62 1130,-412.02 1110.95,-397.5 1090.95,-380.9 1072.89,-365.36"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1074.96,-363.68 1067.57,-360.75 1071.52,-367.65 1074.96,-363.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1167.9,-420.02 1167.9,-442.82 1267.26,-442.82 1267.26,-420.02 1167.9,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="1170.9" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">構成・監視を管理</text>
</g>
<!-- internet&#45;&gt;router -->
<g id="edge1" class="edge">
<title>internet&#45;&gt;router</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M961,-995.89C961,-945.5 961,-866.77 961,-812.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="963.63,-812.86 961,-805.36 958.38,-812.86 963.63,-812.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="961,-932.83 961,-955.63 1101.61,-955.63 1101.61,-932.83 961,-932.83"/>
<text xml:space="preserve" text-anchor="start" x="964" y="-938.63" font-family="Arial" font-size="14.00" fill="#c9c9c9">WAN / GigaEthernet0</text>
</g>
</g>
</svg>
`;case`vlans`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1023pt" height="1280pt"
 viewBox="0.00 0.00 1023.00 1280.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1265.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-140 8,-1242 985.29,-1242 985.29,-140 8,-140"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1229.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_lan</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="609.53,-180 609.53,-1181 945.29,-1181 945.29,-180 609.53,-180"/>
<text xml:space="preserve" text-anchor="start" x="617.53" y="-1168.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">LAN / VLAN・経路</text>
</g>
<!-- native -->
<g id="node1" class="node">
<title>native</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="889.16,-320.01 665.65,-320.01 665.65,-220 889.16,-220 889.16,-320.01"/>
<text xml:space="preserve" text-anchor="start" x="675.66" y="-262" font-family="Arial" font-size="20.00" fill="#f8fafc">native / 192.168.0.0/24</text>
</g>
<!-- management -->
<g id="node2" class="node">
<title>management</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="905.29,-480.01 649.53,-480.01 649.53,-380 905.29,-380 905.29,-480.01"/>
<text xml:space="preserve" text-anchor="start" x="659.54" y="-422" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN10 / 192.168.10.0/24</text>
</g>
<!-- server -->
<g id="node3" class="node">
<title>server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="905.29,-960.01 649.53,-960.01 649.53,-860 905.29,-860 905.29,-960.01"/>
<text xml:space="preserve" text-anchor="start" x="659.54" y="-902" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN20 / 192.168.20.0/24</text>
</g>
<!-- client -->
<g id="node4" class="node">
<title>client</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="905.29,-800.01 649.53,-800.01 649.53,-700 905.29,-700 905.29,-800.01"/>
<text xml:space="preserve" text-anchor="start" x="659.54" y="-742" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN30 / 192.168.30.0/24</text>
</g>
<!-- guest -->
<g id="node5" class="node">
<title>guest</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="867.41,-640.01 687.41,-640.01 687.41,-540 867.41,-540 867.41,-640.01"/>
<text xml:space="preserve" text-anchor="start" x="707.36" y="-582" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN31 / guest</text>
</g>
<!-- iot -->
<g id="node6" class="node">
<title>iot</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="905.29,-1120.01 649.53,-1120.01 649.53,-1020 905.29,-1020 905.29,-1120.01"/>
<text xml:space="preserve" text-anchor="start" x="659.54" y="-1062" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN40 / 192.168.40.0/24</text>
</g>
<!-- switch -->
<g id="node7" class="node">
<title>switch</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="308.65,-356.01 78.6,-356.01 78.6,-256 308.65,-256 308.65,-356.01"/>
<text xml:space="preserve" text-anchor="start" x="88.6" y="-298" font-family="Arial" font-size="20.00" fill="#f8fafc">US&#45;8&#45;60W / 管理スイッチ</text>
</g>
<!-- router -->
<g id="node8" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="339.25,-592.01 48,-592.01 48,-492 339.25,-492 339.25,-592.01"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-534" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / ルーター・VLAN間ACL</text>
</g>
<!-- bridge -->
<g id="node9" class="node">
<title>bridge</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="283.62,-784.01 103.62,-784.01 103.62,-684 283.62,-684 283.62,-784.01"/>
<text xml:space="preserve" text-anchor="start" x="124.7" y="-726" font-family="Arial" font-size="20.00" fill="#f8fafc">enp7s0 / vmbr0</text>
</g>
<!-- bridge_1 -->
<g id="node10" class="node">
<title>bridge_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="283.62,-1120.01 103.62,-1120.01 103.62,-1020 283.62,-1020 283.62,-1120.01"/>
<text xml:space="preserve" text-anchor="start" x="124.7" y="-1062" font-family="Arial" font-size="20.00" fill="#f8fafc">enp6s0 / vmbr0</text>
</g>
<!-- dns -->
<g id="node11" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="286.43,-944.01 100.81,-944.01 100.81,-844 286.43,-844 286.43,-944.01"/>
<text xml:space="preserve" text-anchor="start" x="110.82" y="-886" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- warp -->
<g id="node12" class="node">
<title>warp</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="329.77,-100.01 57.47,-100.01 57.47,0 329.77,0 329.77,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="67.48" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">WARP / private CIDR routes</text>
</g>
<!-- router&#45;&gt;native -->
<g id="edge2" class="edge">
<title>router&#45;&gt;native</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M246.96,-492.12C276.11,-462.81 311.91,-424.12 339.25,-386 360.99,-355.69 348.25,-332.96 379.25,-312.2 460,-258.14 571.37,-250.62 655.64,-254.89"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="655.37,-257.51 663.01,-255.31 655.67,-252.27 655.37,-257.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="460.54,-312.2 460.54,-335 520.23,-335 520.23,-312.2 460.54,-312.2"/>
<text xml:space="preserve" text-anchor="start" x="463.54" y="-318" font-family="Arial" font-size="14.00" fill="#c9c9c9">native IF</text>
</g>
<!-- router&#45;&gt;management -->
<g id="edge3" class="edge">
<title>router&#45;&gt;management</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M230.22,-492.17C263.38,-450.41 316.98,-393.8 379.25,-369.2 464.66,-335.47 567.25,-352.51 646.77,-377.02"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="645.52,-379.38 653.47,-379.14 647.1,-374.38 645.52,-379.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="468.32,-369.2 468.32,-392 512.46,-392 512.46,-369.2 468.32,-369.2"/>
<text xml:space="preserve" text-anchor="start" x="471.32" y="-375" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI10</text>
</g>
<!-- router&#45;&gt;server -->
<g id="edge4" class="edge">
<title>router&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M339.19,-566.88C442.4,-587.84 568.57,-621.14 601.53,-663.2 612.97,-677.81 599.27,-814.54 609.53,-830 617.98,-842.74 629.06,-853.51 641.49,-862.6"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.67,-864.53 647.34,-866.61 642.64,-860.21 639.67,-864.53"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="468.32,-663.2 468.32,-686 512.46,-686 512.46,-663.2 468.32,-663.2"/>
<text xml:space="preserve" text-anchor="start" x="471.32" y="-669" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI20</text>
</g>
<!-- router&#45;&gt;client -->
<g id="edge5" class="edge">
<title>router&#45;&gt;client</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M338.82,-492.72C426.02,-472.87 533.17,-467.7 601.53,-532.2 612.68,-542.73 600.98,-657.27 609.53,-670 617.89,-682.47 628.76,-693.05 640.94,-702.02"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.41,-704.15 647.08,-706.25 642.39,-699.83 639.41,-704.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="468.32,-532.2 468.32,-555 512.46,-555 512.46,-532.2 468.32,-532.2"/>
<text xml:space="preserve" text-anchor="start" x="471.32" y="-538" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI30</text>
</g>
<!-- router&#45;&gt;guest -->
<g id="edge6" class="edge">
<title>router&#45;&gt;guest</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M264.76,-492.04C353.81,-435.25 507.17,-360.62 601.53,-444.2 612.55,-453.97 600.94,-498.04 609.53,-510 626.38,-533.49 651.99,-550.34 678.13,-562.33"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="677.06,-564.73 684.99,-565.32 679.16,-559.92 677.06,-564.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="426.69,-444.2 426.69,-467 554.08,-467 554.08,-444.2 426.69,-444.2"/>
<text xml:space="preserve" text-anchor="start" x="429.69" y="-450" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI31 / 他VLAN拒否</text>
</g>
<!-- router&#45;&gt;iot -->
<g id="edge7" class="edge">
<title>router&#45;&gt;iot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M281.06,-591.98C303.33,-608.91 325.01,-629.77 339.25,-654 399.35,-756.33 298.58,-830.96 379.25,-918 448.16,-992.36 524.98,-902.74 601.53,-969.2 609.01,-975.7 602.81,-982.73 609.53,-990 618.82,-1000.07 629.65,-1009.01 641.25,-1016.9"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.56,-1018.94 647.28,-1020.82 642.42,-1014.53 639.56,-1018.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="448.86,-969.2 448.86,-992 531.91,-992 531.91,-969.2 448.86,-969.2"/>
<text xml:space="preserve" text-anchor="start" x="451.86" y="-975" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI4 / tag40</text>
</g>
<!-- bridge&#45;&gt;server -->
<g id="edge8" class="edge">
<title>bridge&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M283.55,-754.66C366.54,-774.64 493.45,-807 601.53,-842.2 615.11,-846.63 629.18,-851.53 643.16,-856.61"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="642.03,-858.99 649.98,-859.11 643.84,-854.06 642.03,-858.99"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="437.97,-842.2 437.97,-865 542.8,-865 542.8,-842.2 437.97,-842.2"/>
<text xml:space="preserve" text-anchor="start" x="440.97" y="-848" font-family="Arial" font-size="14.00" fill="#c9c9c9">VM・LXC tag20</text>
</g>
<!-- bridge&#45;&gt;client -->
<g id="edge9" class="edge">
<title>bridge&#45;&gt;client</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M283.57,-719.03C313.84,-714.61 347.93,-710.38 379.25,-708.2 477.8,-701.35 503.42,-696.64 601.53,-708.2 614,-709.67 626.88,-711.72 639.72,-714.11"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.17,-716.68 647.03,-715.53 640.17,-711.52 639.17,-716.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="427.08,-708.2 427.08,-731 553.69,-731 553.69,-708.2 427.08,-708.2"/>
<text xml:space="preserve" text-anchor="start" x="430.08" y="-714" font-family="Arial" font-size="14.00" fill="#c9c9c9">Windows VM tag30</text>
</g>
<!-- bridge_1&#45;&gt;server -->
<g id="edge10" class="edge">
<title>bridge_1&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M283.47,-1060.38C395.4,-1047.6 576.28,-1024.48 601.53,-1006 607.95,-1001.31 603.86,-995.58 609.53,-990 618.93,-980.76 629.6,-972.42 640.9,-964.94"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="642.18,-967.24 647.1,-961 639.36,-962.81 642.18,-967.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="437.97,-1048.14 437.97,-1070.94 542.8,-1070.94 542.8,-1048.14 437.97,-1048.14"/>
<text xml:space="preserve" text-anchor="start" x="440.97" y="-1053.94" font-family="Arial" font-size="14.00" fill="#c9c9c9">VM・LXC tag20</text>
</g>
<!-- bridge_1&#45;&gt;iot -->
<g id="edge11" class="edge">
<title>bridge_1&#45;&gt;iot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M283.61,-1083.93C313.88,-1088.04 347.96,-1091.98 379.25,-1094 477.83,-1100.38 502.97,-1100.74 601.53,-1094 613.83,-1093.16 626.59,-1091.99 639.35,-1090.62"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.41,-1093.26 646.57,-1089.81 638.83,-1088.04 639.41,-1093.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="439.53,-1098.92 439.53,-1121.72 541.24,-1121.72 541.24,-1098.92 439.53,-1098.92"/>
<text xml:space="preserve" text-anchor="start" x="442.53" y="-1104.72" font-family="Arial" font-size="14.00" fill="#c9c9c9">kiosk VM tag40</text>
</g>
<!-- dns&#45;&gt;server -->
<g id="edge12" class="edge">
<title>dns&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M286.06,-886.73C368.61,-881.37 493.35,-876.27 601.53,-884.2 613.85,-885.11 626.61,-886.36 639.38,-887.84"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="638.85,-890.42 646.61,-888.71 639.48,-885.21 638.85,-890.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="398.67,-884.2 398.67,-907 582.1,-907 582.1,-884.2 398.67,-884.2"/>
<text xml:space="preserve" text-anchor="start" x="401.67" y="-890" font-family="Arial" font-size="14.00" fill="#c9c9c9">L2広告 / Service IP .200&#45;.226</text>
</g>
<!-- warp&#45;&gt;server -->
<g id="edge1" class="edge">
<title>warp&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M329.7,-26.48C420.59,-19.14 535.49,-27.98 601.53,-102.2 614.97,-117.31 598.66,-812.95 609.53,-830 617.81,-843.01 628.86,-853.95 641.33,-863.14"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.57,-865.11 647.23,-867.21 642.55,-860.79 639.57,-865.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="379.25,-102.2 379.25,-125 601.53,-125 601.53,-102.2 379.25,-102.2"/>
<text xml:space="preserve" text-anchor="start" x="382.25" y="-108" font-family="Arial" font-size="14.00" fill="#c9c9c9">private CIDR routes / WARP policy</text>
</g>
</g>
</svg>
`;case`platform`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2220pt" height="1834pt"
 viewBox="0.00 0.00 2220.00 1834.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1819.06)">
<!-- descheduler -->
<g id="node1" class="node">
<title>descheduler</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="230.62,-754.01 50.62,-754.01 50.62,-654 230.62,-654 230.62,-754.01"/>
<text xml:space="preserve" text-anchor="start" x="86.14" y="-696" font-family="Arial" font-size="20.00" fill="#f8fafc">descheduler</text>
</g>
<!-- api -->
<g id="node2" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1229.25,-991.01 997.99,-991.01 997.99,-891 1229.25,-891 1229.25,-991.01"/>
<text xml:space="preserve" text-anchor="start" x="1007.99" y="-933" font-family="Arial" font-size="20.00" fill="#f8fafc">Kubernetes API / Lease</text>
</g>
<!-- controlplane -->
<g id="node3" class="node">
<title>controlplane</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="255.12,-1204.01 26.11,-1204.01 26.11,-1104 255.12,-1104 255.12,-1204.01"/>
<text xml:space="preserve" text-anchor="start" x="36.12" y="-1146" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s control&#45;plane</text>
</g>
<!-- cert_approver -->
<g id="node4" class="node">
<title>cert_approver</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="281.24,-1054.01 0,-1054.01 0,-954 281.24,-954 281.24,-1054.01"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-996" font-family="Arial" font-size="20.00" fill="#f8fafc">kubelet&#45;serving&#45;cert&#45;approver</text>
</g>
<!-- flannel -->
<g id="node5" class="node">
<title>flannel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="230.62,-1504.01 50.62,-1504.01 50.62,-1404 230.62,-1404 230.62,-1504.01"/>
<text xml:space="preserve" text-anchor="start" x="82.26" y="-1446" font-family="Arial" font-size="20.00" fill="#f8fafc">Flannel / CNI</text>
</g>
<!-- worker -->
<g id="node6" class="node">
<title>worker</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1732.49,-1504.01 1552.49,-1504.01 1552.49,-1404 1732.49,-1404 1732.49,-1504.01"/>
<text xml:space="preserve" text-anchor="start" x="1565.81" y="-1446" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s worker</text>
</g>
<!-- kube_proxy -->
<g id="node7" class="node">
<title>kube_proxy</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="275.13,-1804.01 6.11,-1804.01 6.11,-1704 275.13,-1704 275.13,-1804.01"/>
<text xml:space="preserve" text-anchor="start" x="16.12" y="-1746" font-family="Arial" font-size="20.00" fill="#f8fafc">kube&#45;proxy / Service routing</text>
</g>
<!-- metrics_server -->
<g id="node8" class="node">
<title>metrics_server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="273.41,-1654.01 7.82,-1654.01 7.82,-1554 273.41,-1554 273.41,-1654.01"/>
<text xml:space="preserve" text-anchor="start" x="17.83" y="-1596" font-family="Arial" font-size="20.00" fill="#f8fafc">metrics&#45;server / Metrics API</text>
</g>
<!-- metallb -->
<g id="node9" class="node">
<title>metallb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="269.01,-250.01 12.23,-250.01 12.23,-150 269.01,-150 269.01,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="22.24" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">MetalLB / LANのService IP</text>
</g>
<!-- coredns -->
<g id="node10" class="node">
<title>coredns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1245.34,-250.01 981.9,-250.01 981.9,-150 1245.34,-150 1245.34,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="991.91" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / miutaku.internal</text>
</g>
<!-- server -->
<g id="node11" class="node">
<title>server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1241.5,-400.01 985.74,-400.01 985.74,-300 1241.5,-300 1241.5,-400.01"/>
<text xml:space="preserve" text-anchor="start" x="995.75" y="-342" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN20 / 192.168.20.0/24</text>
</g>
<!-- bws -->
<g id="node12" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="274.02,-904.01 7.22,-904.01 7.22,-804 274.02,-804 274.02,-904.01"/>
<text xml:space="preserve" text-anchor="start" x="17.22" y="-846" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- eso -->
<g id="node13" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="699.62,-904.01 448.39,-904.01 448.39,-804 699.62,-804 699.62,-904.01"/>
<text xml:space="preserve" text-anchor="start" x="458.4" y="-846" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- argo -->
<g id="node14" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="230.62,-604.01 50.62,-604.01 50.62,-504 230.62,-504 230.62,-604.01"/>
<text xml:space="preserve" text-anchor="start" x="88.38" y="-546" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- runner -->
<g id="node15" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="267.33,-1354.01 13.91,-1354.01 13.91,-1254 267.33,-1254 267.33,-1354.01"/>
<text xml:space="preserve" text-anchor="start" x="23.92" y="-1296" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 共用のrunner制御基盤</text>
</g>
<!-- cloudflared -->
<g id="node16" class="node">
<title>cloudflared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268.47,-100.01 12.77,-100.01 12.77,0 268.47,0 268.47,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="22.78" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">cloudflared / 自宅connector</text>
</g>
<!-- edge -->
<g id="node17" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="664,-100.01 484,-100.01 484,0 664,0 664,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="528.42" y="-42" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- public_dns -->
<g id="node18" class="node">
<title>public_dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1781.46,-250.01 1503.53,-250.01 1503.53,-150 1781.46,-150 1781.46,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="1513.53" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">Public DNS / 1.1.1.1・8.8.8.8</text>
</g>
<!-- nd_cluster_dns -->
<g id="node19" class="node">
<title>nd_cluster_dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2189.71,-1504.01 1961.85,-1504.01 1961.85,-1404 2189.71,-1404 2189.71,-1504.01"/>
<text xml:space="preserve" text-anchor="start" x="1971.86" y="-1446" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / cluster.local</text>
</g>
<!-- descheduler&#45;&gt;api -->
<g id="edge1" class="edge">
<title>descheduler&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M230.61,-703.54C342.03,-704.94 537.92,-714.02 699.62,-756.2 818.28,-787.17 840,-817.8 951.9,-868 965.54,-874.13 979.83,-880.57 994.02,-886.99"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="992.64,-889.24 1000.56,-889.95 994.81,-884.46 992.64,-889.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="493.97,-756.2 493.97,-779 654.03,-779 654.03,-756.2 493.97,-756.2"/>
<text xml:space="preserve" text-anchor="start" x="496.97" y="-762" font-family="Arial" font-size="14.00" fill="#cbd0fd">Podのeviction / 配置再調整</text>
</g>
<!-- api&#45;&gt;worker -->
<g id="edge17" class="edge">
<title>api&#45;&gt;worker</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1165.62,-990.66C1263.97,-1086.43 1479.32,-1296.1 1583.19,-1397.23"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1581.09,-1398.86 1588.3,-1402.21 1584.76,-1395.1 1581.09,-1398.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1323.97,-1288.07 1323.97,-1310.87 1424.9,-1310.87 1424.9,-1288.07 1323.97,-1288.07"/>
<text xml:space="preserve" text-anchor="start" x="1326.97" y="-1293.87" font-family="Arial" font-size="14.00" fill="#cbd0fd">Podの実行を制御</text>
</g>
<!-- controlplane&#45;&gt;api -->
<g id="edge2" class="edge">
<title>controlplane&#45;&gt;api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M254.86,-1137.34C412.58,-1112.94 706.67,-1063.11 951.9,-997 963.83,-993.79 976.15,-990.13 988.42,-986.25"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="989.01,-988.82 995.35,-984.03 987.41,-983.82 989.01,-988.82"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="499.8,-1103.75 499.8,-1126.55 648.2,-1126.55 648.2,-1103.75 499.8,-1103.75"/>
<text xml:space="preserve" text-anchor="start" x="502.8" y="-1109.55" font-family="Arial" font-size="14.00" fill="#c9c9c9">API server :6443 / etcd</text>
</g>
<!-- cert_approver&#45;&gt;api -->
<g id="edge3" class="edge">
<title>cert_approver&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M281,-994.96C470.37,-982.67 806.12,-960.89 987.69,-949.11"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="987.75,-951.74 995.07,-948.63 987.41,-946.5 987.75,-951.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="489.69,-983.82 489.69,-1006.62 658.31,-1006.62 658.31,-983.82 489.69,-983.82"/>
<text xml:space="preserve" text-anchor="start" x="492.69" y="-989.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">kubelet serving CSRの承認</text>
</g>
<!-- flannel&#45;&gt;worker -->
<g id="edge4" class="edge">
<title>flannel&#45;&gt;worker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M230.4,-1454C493.21,-1454 1266.14,-1454 1542.14,-1454"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1542.01,-1456.63 1549.51,-1454 1542.01,-1451.38 1542.01,-1456.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="772.4,-1454 772.4,-1476.8 909.11,-1476.8 909.11,-1454 772.4,-1454"/>
<text xml:space="preserve" text-anchor="start" x="775.4" y="-1459.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">CNI / Podネットワーク</text>
</g>
<!-- worker&#45;&gt;api -->
<g id="edge18" class="edge">
<title>worker&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1632.65,-1404.32C1615.8,-1323.72 1571.64,-1164.23 1473.53,-1072.2 1409.16,-1011.83 1314.77,-978.77 1238.95,-960.95"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1239.7,-958.42 1231.8,-959.31 1238.53,-963.54 1239.7,-958.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1277.28,-1072.2 1277.28,-1095 1471.59,-1095 1471.59,-1072.2 1277.28,-1072.2"/>
<text xml:space="preserve" text-anchor="start" x="1280.28" y="-1078" font-family="Arial" font-size="14.00" fill="#cbd0fd">kubelet / Pod・Serviceのwatch</text>
</g>
<!-- worker&#45;&gt;nd_cluster_dns -->
<g id="edge19" class="edge">
<title>worker&#45;&gt;nd_cluster_dns</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1732.33,-1454C1795.79,-1454 1881.97,-1454 1952,-1454"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1951.68,-1456.63 1959.18,-1454 1951.68,-1451.38 1951.68,-1456.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1811.46,-1454 1811.46,-1476.8 1931.85,-1476.8 1931.85,-1454 1811.46,-1454"/>
<text xml:space="preserve" text-anchor="start" x="1814.46" y="-1459.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">Podの名前解決 / :53</text>
</g>
<!-- kube_proxy&#45;&gt;worker -->
<g id="edge5" class="edge">
<title>kube_proxy&#45;&gt;worker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M275.01,-1747.4C518.81,-1732.17 1050.2,-1684.32 1473.53,-1543 1499.76,-1534.25 1526.81,-1521.69 1551.34,-1508.75"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1552.57,-1511.07 1557.94,-1505.21 1550.09,-1506.44 1552.57,-1511.07"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="768.13,-1702.8 768.13,-1725.6 913.39,-1725.6 913.39,-1702.8 768.13,-1702.8"/>
<text xml:space="preserve" text-anchor="start" x="771.13" y="-1708.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">Service / ClusterIP転送</text>
</g>
<!-- metrics_server&#45;&gt;worker -->
<g id="edge6" class="edge">
<title>metrics_server&#45;&gt;worker</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M273.25,-1598.99C513.12,-1588.5 1036.93,-1559.41 1473.53,-1492 1495.95,-1488.54 1519.83,-1483.79 1542.35,-1478.83"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1542.89,-1481.4 1549.63,-1477.19 1541.74,-1476.27 1542.89,-1481.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="763.44,-1571.57 763.44,-1594.37 918.07,-1594.37 918.07,-1571.57 763.44,-1571.57"/>
<text xml:space="preserve" text-anchor="start" x="766.44" y="-1577.37" font-family="Arial" font-size="14.00" fill="#d4f2ff">kubelet metrics / :10250</text>
</g>
<!-- metallb&#45;&gt;api -->
<g id="edge8" class="edge">
<title>metallb&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M241.27,-249.91C445.34,-352.68 896.32,-583.01 951.9,-639 1021.34,-708.97 1068.3,-815.16 1092.74,-881.19"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1090.25,-882.04 1095.29,-888.19 1095.18,-880.24 1090.25,-882.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="488.92,-486.36 488.92,-509.16 659.08,-509.16 659.08,-486.36 488.92,-486.36"/>
<text xml:space="preserve" text-anchor="start" x="491.92" y="-492.16" font-family="Arial" font-size="14.00" fill="#cbd0fd">ServiceのIP割当 / controller</text>
</g>
<!-- metallb&#45;&gt;coredns -->
<g id="edge7" class="edge">
<title>metallb&#45;&gt;coredns</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M268.56,-200C450.15,-200 782.96,-200 971.88,-200"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="971.63,-202.63 979.13,-200 971.63,-197.38 971.63,-202.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="457.77,-200 457.77,-222.8 690.23,-222.8 690.23,-200 457.77,-200"/>
<text xml:space="preserve" text-anchor="start" x="460.77" y="-205.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">LAN向けDNS / LoadBalancer IP .201</text>
</g>
<!-- metallb&#45;&gt;server -->
<g id="edge9" class="edge">
<title>metallb&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M268.74,-229.66C283.04,-232.65 297.43,-235.5 311.24,-238 543.19,-280.12 815.41,-315.15 975.43,-334.28"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="975.04,-336.88 982.8,-335.16 975.66,-331.67 975.04,-336.88"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="482.29,-297.25 482.29,-320.05 665.71,-320.05 665.71,-297.25 482.29,-297.25"/>
<text xml:space="preserve" text-anchor="start" x="485.29" y="-303.05" font-family="Arial" font-size="14.00" fill="#c9c9c9">L2広告 / Service IP .200&#45;.226</text>
</g>
<!-- coredns&#45;&gt;public_dns -->
<g id="edge14" class="edge">
<title>coredns&#45;&gt;public_dns</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1245.2,-200C1320.44,-200 1415.28,-200 1493.31,-200"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1493.19,-202.63 1500.69,-200 1493.19,-197.38 1493.19,-202.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1275.34,-200 1275.34,-222.8 1473.53,-222.8 1473.53,-200 1275.34,-200"/>
<text xml:space="preserve" text-anchor="start" x="1278.34" y="-205.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">非internal名をforward / DNS :53</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge10" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M273.98,-854C326.11,-854 385.91,-854 438.26,-854"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="438.1,-856.63 445.6,-854 438.1,-851.38 438.1,-856.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="329.91,-854 329.91,-876.8 399.71,-876.8 399.71,-854 329.91,-854"/>
<text xml:space="preserve" text-anchor="start" x="332.91" y="-859.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- eso&#45;&gt;api -->
<g id="edge15" class="edge">
<title>eso&#45;&gt;api</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M699.35,-874.13C786.02,-888.15 901.19,-906.79 987.93,-920.83"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="987.28,-923.38 995.1,-921.99 988.12,-918.2 987.28,-923.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="762.27,-912.86 762.27,-935.66 919.24,-935.66 919.24,-912.86 762.27,-912.86"/>
<text xml:space="preserve" text-anchor="start" x="765.27" y="-918.66" font-family="Arial" font-size="14.00" fill="#fcd9d2">Kubernetes Secretを同期</text>
</g>
<!-- argo&#45;&gt;api -->
<g id="edge11" class="edge">
<title>argo&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M230.47,-557.31C387.87,-566.96 720.85,-604.79 951.9,-753 1003.46,-786.08 1047.47,-840.68 1076.33,-882.54"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1073.99,-883.77 1080.38,-888.5 1078.33,-880.82 1073.99,-883.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="478.01,-635.59 478.01,-658.39 669.99,-658.39 669.99,-635.59 478.01,-635.59"/>
<text xml:space="preserve" text-anchor="start" x="481.01" y="-641.39" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期 / Kubernetes API</text>
</g>
<!-- runner&#45;&gt;api -->
<g id="edge12" class="edge">
<title>runner&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M267.31,-1280.92C431.24,-1247.59 723.97,-1176.96 951.9,-1061 985.65,-1043.83 1019.74,-1019.59 1047.78,-997.39"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1049.33,-999.51 1053.54,-992.77 1046.04,-995.41 1049.33,-999.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="501.36,-1238.26 501.36,-1261.06 646.64,-1261.06 646.64,-1238.26 501.36,-1238.26"/>
<text xml:space="preserve" text-anchor="start" x="504.36" y="-1244.06" font-family="Arial" font-size="14.00" fill="#cbd0fd">runner Podの作成・削除</text>
</g>
<!-- cloudflared&#45;&gt;edge -->
<g id="edge13" class="edge">
<title>cloudflared&#45;&gt;edge</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M268.42,-50C333.98,-50 412.82,-50 473.86,-50"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="473.74,-52.63 481.24,-50 473.74,-47.38 473.74,-52.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="311.24,-50 311.24,-72.8 418.39,-72.8 418.39,-50 311.24,-50"/>
<text xml:space="preserve" text-anchor="start" x="314.24" y="-55.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きTunnel接続</text>
</g>
<!-- edge&#45;&gt;server -->
<g id="edge16" class="edge">
<title>edge&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M663.78,-99.54C760.33,-153.42 914.22,-239.3 1014.35,-295.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1012.79,-297.3 1020.62,-298.67 1015.35,-292.72 1012.79,-297.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="729.62,-252.97 729.62,-275.77 951.9,-275.77 951.9,-252.97 729.62,-252.97"/>
<text xml:space="preserve" text-anchor="start" x="732.62" y="-258.77" font-family="Arial" font-size="14.00" fill="#c9c9c9">private CIDR routes / WARP policy</text>
</g>
</g>
</svg>
`;case`loockit`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2333pt" height="430pt"
 viewBox="0.00 0.00 2333.00 430.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 415.06)">
<!-- client -->
<g id="node1" class="node">
<title>client</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-250.01 0,-250.01 0,-150 180,-150 180,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="23.32" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">専用クライアント</text>
</g>
<!-- mtls -->
<g id="node2" class="node">
<title>mtls</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="556.63,-250.01 351.02,-250.01 351.02,-150 556.63,-150 556.63,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="361.03" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">mTLS / 専用APIの例外</text>
</g>
<!-- tunnel -->
<g id="node3" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="979.22,-250.01 799.22,-250.01 799.22,-150 979.22,-150 979.22,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="810.29" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- proxy -->
<g id="node4" class="node">
<title>proxy</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1443.56,-250.01 1200.07,-250.01 1200.07,-150 1443.56,-150 1443.56,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="1210.08" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / :8080・:50051</text>
</g>
<!-- loockit_a -->
<g id="node5" class="node">
<title>loockit_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1835.63,-325.01 1625.5,-325.01 1625.5,-225 1835.63,-225 1835.63,-325.01"/>
<text xml:space="preserve" text-anchor="start" x="1635.51" y="-267" font-family="Arial" font-size="20.00" fill="#f8fafc">Loockit 01 / CT12902</text>
</g>
<!-- loockit_b -->
<g id="node6" class="node">
<title>loockit_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1835.63,-175.01 1625.5,-175.01 1625.5,-75 1835.63,-75 1835.63,-175.01"/>
<text xml:space="preserve" text-anchor="start" x="1635.51" y="-117" font-family="Arial" font-size="20.00" fill="#f8fafc">Loockit 02 / CT12903</text>
</g>
<!-- bluez -->
<g id="node7" class="node">
<title>bluez</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2297.74,-400.01 2077.62,-400.01 2077.62,-300 2297.74,-300 2297.74,-400.01"/>
<text xml:space="preserve" text-anchor="start" x="2087.63" y="-342" font-family="Arial" font-size="20.00" fill="#f8fafc">BlueZ / USB Bluetooth</text>
</g>
<!-- api -->
<g id="node8" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2303.31,-250.01 2072.05,-250.01 2072.05,-150 2303.31,-150 2303.31,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="2082.05" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">Kubernetes API / Lease</text>
</g>
<!-- bluez_1 -->
<g id="node9" class="node">
<title>bluez_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2297.74,-100.01 2077.62,-100.01 2077.62,0 2297.74,0 2297.74,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="2087.63" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">BlueZ / USB Bluetooth</text>
</g>
<!-- client&#45;&gt;mtls -->
<g id="edge1" class="edge">
<title>client&#45;&gt;mtls</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.98,-200C228.53,-200 289.11,-200 340.85,-200"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="340.55,-202.63 348.05,-200 340.55,-197.38 340.55,-202.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="210,-200 210,-222.8 321.02,-222.8 321.02,-200 210,-200"/>
<text xml:space="preserve" text-anchor="start" x="213" y="-205.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">クライアント証明書</text>
</g>
<!-- mtls&#45;&gt;tunnel -->
<g id="edge2" class="edge">
<title>mtls&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M556.44,-200C626.67,-200 719.61,-200 789.26,-200"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="788.84,-202.63 796.34,-200 788.84,-197.38 788.84,-202.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="586.63,-200 586.63,-222.8 769.22,-222.8 769.22,-200 586.63,-200"/>
<text xml:space="preserve" text-anchor="start" x="589.63" y="-205.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">mTLS検証済みのAPIリクエスト</text>
</g>
<!-- tunnel&#45;&gt;proxy -->
<g id="edge3" class="edge">
<title>tunnel&#45;&gt;proxy</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M979.18,-200C1039.97,-200 1121.54,-200 1189.74,-200"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1189.6,-202.63 1197.1,-200 1189.6,-197.38 1189.6,-202.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1009.22,-200 1009.22,-222.8 1170.07,-222.8 1170.07,-200 1009.22,-200"/>
<text xml:space="preserve" text-anchor="start" x="1012.22" y="-205.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">loockit&#45;api / 8080 / mTLS</text>
</g>
<!-- proxy&#45;&gt;loockit_a -->
<g id="edge4" class="edge">
<title>proxy&#45;&gt;loockit_a</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1443.48,-222.25C1497.94,-232.29 1561.93,-244.09 1615.58,-253.99"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1614.98,-256.55 1622.84,-255.32 1615.94,-251.38 1614.98,-256.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1473.56,-248.6 1473.56,-271.4 1595.5,-271.4 1595.5,-248.6 1473.56,-248.6"/>
<text xml:space="preserve" text-anchor="start" x="1476.56" y="-254.4" font-family="Arial" font-size="14.00" fill="#bbfcd3">readyz / leaderのみ</text>
</g>
<!-- proxy&#45;&gt;loockit_b -->
<g id="edge5" class="edge">
<title>proxy&#45;&gt;loockit_b</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1443.48,-177.76C1497.94,-167.71 1561.93,-155.91 1615.58,-146.02"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1615.94,-148.63 1622.84,-144.68 1614.98,-143.46 1615.94,-148.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1473.56,-171.43 1473.56,-194.23 1595.5,-194.23 1595.5,-171.43 1473.56,-171.43"/>
<text xml:space="preserve" text-anchor="start" x="1476.56" y="-177.23" font-family="Arial" font-size="14.00" fill="#bbfcd3">readyz / leaderのみ</text>
</g>
<!-- loockit_a&#45;&gt;bluez -->
<g id="edge6" class="edge">
<title>loockit_a&#45;&gt;bluez</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1835.41,-292.12C1904.56,-303.51 1995.62,-318.52 2067.7,-330.4"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2066.92,-332.93 2074.75,-331.56 2067.78,-327.75 2066.92,-332.93"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1865.63,-325.74 1865.63,-348.54 2042.05,-348.54 2042.05,-325.74 1865.63,-325.74"/>
<text xml:space="preserve" text-anchor="start" x="1868.63" y="-331.54" font-family="Arial" font-size="14.00" fill="#bbfcd3">read&#45;only D&#45;Bus / org.bluez</text>
</g>
<!-- loockit_a&#45;&gt;api -->
<g id="edge7" class="edge">
<title>loockit_a&#45;&gt;api</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1835.41,-257.89C1902.67,-246.81 1990.65,-232.31 2061.74,-220.59"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2062.14,-223.19 2069.11,-219.38 2061.29,-218.01 2062.14,-223.19"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1884.29,-252.84 1884.29,-275.64 2023.39,-275.64 2023.39,-252.84 1884.29,-252.84"/>
<text xml:space="preserve" text-anchor="start" x="1887.29" y="-258.64" font-family="Arial" font-size="14.00" fill="#bbfcd3">Lease leader election</text>
</g>
<!-- loockit_b&#45;&gt;api -->
<g id="edge9" class="edge">
<title>loockit_b&#45;&gt;api</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1835.41,-142.12C1902.67,-153.2 1990.65,-167.7 2061.74,-179.41"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2061.29,-182 2069.11,-180.63 2062.14,-176.82 2061.29,-182"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1884.29,-175.74 1884.29,-198.54 2023.39,-198.54 2023.39,-175.74 1884.29,-175.74"/>
<text xml:space="preserve" text-anchor="start" x="1887.29" y="-181.54" font-family="Arial" font-size="14.00" fill="#bbfcd3">Lease leader election</text>
</g>
<!-- loockit_b&#45;&gt;bluez_1 -->
<g id="edge8" class="edge">
<title>loockit_b&#45;&gt;bluez_1</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1821.98,-75.1C1836.23,-69.07 1851.07,-63.78 1865.63,-60.2 1931.03,-44.13 2006.17,-40.95 2067.31,-42.08"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2067.19,-44.7 2074.75,-42.25 2067.31,-39.45 2067.19,-44.7"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1865.63,-60.2 1865.63,-83 2042.05,-83 2042.05,-60.2 1865.63,-60.2"/>
<text xml:space="preserve" text-anchor="start" x="1868.63" y="-66" font-family="Arial" font-size="14.00" fill="#bbfcd3">read&#45;only D&#45;Bus / org.bluez</text>
</g>
</g>
</svg>
`;case`recording`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1304pt" height="612pt"
 viewBox="0.00 0.00 1304.00 612.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 597.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-574 789.14,-574 789.14,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-561.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_recording</title>
<polygon fill="#3e4651" stroke="#2d333d" points="40,-40 40,-521 757.14,-521 757.14,-40 40,-40"/>
<text xml:space="preserve" text-anchor="start" x="48" y="-508.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">録画・配信 / EPGSTATION・TNLASTATION</text>
</g>
<!-- epgstation -->
<g id="node1" class="node">
<title>epgstation</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="260,-180 80,-180 80,-80 260,-80 260,-180"/>
<text xml:space="preserve" text-anchor="start" x="117.75" y="-122" font-family="Arial" font-size="20.00" fill="#f8fafc">EPGStation</text>
</g>
<!-- tnlastation -->
<g id="node2" class="node">
<title>tnlastation</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="260,-320 80,-320 80,-220 260,-220 260,-320"/>
<text xml:space="preserve" text-anchor="start" x="90.52" y="-262" font-family="Arial" font-size="20.00" fill="#eff6ff">TNLaStation PRD</text>
</g>
<!-- tnlastation_staging -->
<g id="node3" class="node">
<title>tnlastation_staging</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="260,-460 80,-460 80,-360 260,-360 260,-460"/>
<text xml:space="preserve" text-anchor="start" x="91.08" y="-402" font-family="Arial" font-size="20.00" fill="#eff6ff">TNLaStation STG</text>
</g>
<!-- mirakurun -->
<g id="node4" class="node">
<title>mirakurun</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="717.14,-297 380.37,-297 380.37,-197 717.14,-197 717.14,-297"/>
<text xml:space="preserve" text-anchor="start" x="390.37" y="-239" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun Service / 本番LXCへの中継</text>
</g>
<!-- mirakurun_staging -->
<g id="node5" class="node">
<title>mirakurun_staging</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="668.23,-460 429.27,-460 429.27,-360 668.23,-360 668.23,-460"/>
<text xml:space="preserve" text-anchor="start" x="439.28" y="-402" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun Service / STG</text>
</g>
<!-- tuner_prod -->
<g id="node6" class="node">
<title>tuner_prod</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1273.56,-297 978.99,-297 978.99,-197 1273.56,-197 1273.56,-297"/>
<text xml:space="preserve" text-anchor="start" x="989" y="-239" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun本番 / CT12901・PT3</text>
</g>
<!-- tuner_stg -->
<g id="node7" class="node">
<title>tuner_stg</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1216.28,-460 1036.28,-460 1036.28,-360 1216.28,-360 1216.28,-460"/>
<text xml:space="preserve" text-anchor="start" x="1052.93" y="-402" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun STG /</text>
</g>
<!-- epgstation&#45;&gt;mirakurun -->
<g id="edge1" class="edge">
<title>epgstation&#45;&gt;mirakurun</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M259.81,-157.58C294.88,-168.47 336.41,-181.37 376.86,-193.93"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="376,-196.41 383.95,-196.13 377.56,-191.4 376,-196.41"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="288,-184.99 288,-207.79 352.37,-207.79 352.37,-184.99 288,-184.99"/>
<text xml:space="preserve" text-anchor="start" x="291" y="-190.79" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- tnlastation&#45;&gt;mirakurun -->
<g id="edge2" class="edge">
<title>tnlastation&#45;&gt;mirakurun</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M259.81,-264.58C292.96,-262.55 331.88,-260.18 370.21,-257.84"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="370.11,-260.47 377.44,-257.4 369.79,-255.23 370.11,-260.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="288,-262.56 288,-285.36 352.37,-285.36 352.37,-262.56 288,-262.56"/>
<text xml:space="preserve" text-anchor="start" x="291" y="-268.36" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- tnlastation_staging&#45;&gt;mirakurun_staging -->
<g id="edge3" class="edge">
<title>tnlastation_staging&#45;&gt;mirakurun_staging</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M259.81,-410C307.33,-410 366.71,-410 419.19,-410"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="419.06,-412.63 426.56,-410 419.06,-407.38 419.06,-412.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="288,-410 288,-432.8 352.37,-432.8 352.37,-410 288,-410"/>
<text xml:space="preserve" text-anchor="start" x="291" y="-415.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- mirakurun&#45;&gt;tuner_prod -->
<g id="edge4" class="edge">
<title>mirakurun&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M716.99,-247C796.4,-247 890.75,-247 968.74,-247"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="968.61,-249.63 976.11,-247 968.61,-244.38 968.61,-249.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="797.14,-247 797.14,-269.8 950.99,-269.8 950.99,-247 797.14,-247"/>
<text xml:space="preserve" text-anchor="start" x="800.14" y="-252.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">EndpointSlice / 外部LXC</text>
</g>
<!-- mirakurun_staging&#45;&gt;tuner_stg -->
<g id="edge5" class="edge">
<title>mirakurun_staging&#45;&gt;tuner_stg</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M667.96,-410C773.6,-410 926.63,-410 1026.04,-410"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1025.87,-412.63 1033.37,-410 1025.87,-407.38 1025.87,-412.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="797.14,-410 797.14,-432.8 950.99,-432.8 950.99,-410 797.14,-410"/>
<text xml:space="preserve" text-anchor="start" x="800.14" y="-415.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">EndpointSlice / 外部LXC</text>
</g>
<!-- tuner_stg&#45;&gt;tuner_prod -->
<g id="edge6" class="edge">
<title>tuner_stg&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1126.28,-360.23C1126.28,-343.41 1126.28,-324.45 1126.28,-306.92"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1128.9,-307.32 1126.28,-299.82 1123.65,-307.32 1128.9,-307.32"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1046.25,-317.1 1046.25,-339.9 1177.51,-339.9 1177.51,-317.1 1046.25,-317.1"/>
<text xml:space="preserve" text-anchor="start" x="1049.25" y="-322.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">BS/CS TCP fallback</text>
</g>
</g>
</svg>
`;case`nextcloud`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1224pt" height="570pt"
 viewBox="0.00 0.00 1224.00 570.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 555.05)">
<g id="clust1" class="cluster">
<title>cluster_nextcloud</title>
<polygon fill="#3e4651" stroke="#2d333d" points="367.96,-8 367.96,-532 716.96,-532 716.96,-8 367.96,-8"/>
<text xml:space="preserve" text-anchor="start" x="375.96" y="-519.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">NEXTCLOUD</text>
</g>
<!-- resources -->
<g id="node1" class="node">
<title>resources</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="632.46,-148 452.46,-148 452.46,-48 632.46,-48 632.46,-148"/>
<text xml:space="preserve" text-anchor="start" x="492.45" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">リソース定義</text>
</g>
<!-- web -->
<g id="node2" class="node">
<title>web</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="676.96,-298 407.96,-298 407.96,-198 676.96,-198 676.96,-298"/>
<text xml:space="preserve" text-anchor="start" x="417.97" y="-240" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud / PHP・HTTP :80</text>
</g>
<!-- redis -->
<g id="node3" class="node">
<title>redis</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M652.52,-461.91C652.52,-466.93 603.19,-471 542.46,-471 481.73,-471 432.4,-466.93 432.4,-461.91 432.4,-461.91 432.4,-380.09 432.4,-380.09 432.4,-375.07 481.73,-371 542.46,-371 603.19,-371 652.52,-375.07 652.52,-380.09 652.52,-380.09 652.52,-461.91 652.52,-461.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M652.52,-461.91C652.52,-456.9 603.19,-452.82 542.46,-452.82 481.73,-452.82 432.4,-456.9 432.4,-461.91"/>
<text xml:space="preserve" text-anchor="start" x="442.41" y="-413" font-family="Arial" font-size="20.00" fill="#ffe0c2">Redis / locking・cache</text>
</g>
<!-- edge -->
<g id="node4" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="180,-298 0,-298 0,-198 180,-198 180,-298"/>
<text xml:space="preserve" text-anchor="start" x="44.42" y="-240" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- mariadb -->
<g id="node5" class="node">
<title>mariadb</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1148.4,-288.91C1148.4,-293.93 1108.06,-298 1058.4,-298 1008.74,-298 968.4,-293.93 968.4,-288.91 968.4,-288.91 968.4,-207.09 968.4,-207.09 968.4,-202.07 1008.74,-198 1058.4,-198 1108.06,-198 1148.4,-202.07 1148.4,-207.09 1148.4,-207.09 1148.4,-288.91 1148.4,-288.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1148.4,-288.91C1148.4,-283.9 1108.06,-279.82 1058.4,-279.82 1008.74,-279.82 968.4,-283.9 968.4,-288.91"/>
<text xml:space="preserve" text-anchor="start" x="1019.5" y="-240" font-family="Arial" font-size="20.00" fill="#ffe0c2">MariaDB</text>
</g>
<!-- nas02 -->
<g id="node6" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1194.03,-138.91C1194.03,-143.93 1133.23,-148 1058.4,-148 983.56,-148 922.77,-143.93 922.77,-138.91 922.77,-138.91 922.77,-57.09 922.77,-57.09 922.77,-52.07 983.56,-48 1058.4,-48 1133.23,-48 1194.03,-52.07 1194.03,-57.09 1194.03,-57.09 1194.03,-138.91 1194.03,-138.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1194.03,-138.91C1194.03,-133.9 1133.23,-129.82 1058.4,-129.82 983.56,-129.82 922.77,-133.9 922.77,-138.91"/>
<text xml:space="preserve" text-anchor="start" x="932.78" y="-90" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- web&#45;&gt;redis -->
<g id="edge2" class="edge">
<title>web&#45;&gt;redis</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M542.46,-297.57C542.46,-316.96 542.46,-339.39 542.46,-359.77"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="539.84,-359.69 542.46,-367.19 545.09,-359.69 539.84,-359.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="435.56,-323.1 435.56,-345.9 620.56,-345.9 620.56,-323.1 435.56,-323.1"/>
<text xml:space="preserve" text-anchor="start" x="438.56" y="-328.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">Redis :6379 / locking・cache</text>
</g>
<!-- web&#45;&gt;mariadb -->
<g id="edge3" class="edge">
<title>web&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M676.81,-248C764.52,-248 877.44,-248 957.44,-248"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="957,-250.63 964.5,-248 957,-245.38 957,-250.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="724.96,-248 724.96,-270.8 892.77,-270.8 892.77,-248 724.96,-248"/>
<text xml:space="preserve" text-anchor="start" x="727.96" y="-253.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- web&#45;&gt;nas02 -->
<g id="edge4" class="edge">
<title>web&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M676.81,-209.08C748.97,-188.02 838.2,-161.98 912.11,-140.4"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="912.6,-142.99 919.07,-138.37 911.13,-137.95 912.6,-142.99"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="753.35,-190.85 753.35,-213.65 864.38,-213.65 864.38,-190.85 753.35,-190.85"/>
<text xml:space="preserve" text-anchor="start" x="756.35" y="-196.65" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- edge&#45;&gt;web -->
<g id="edge1" class="edge">
<title>edge&#45;&gt;web</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M180,-248C242.07,-248 326.26,-248 397.77,-248"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="397.69,-250.63 405.19,-248 397.69,-245.38 397.69,-250.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="210,-248 210,-270.8 359.96,-270.8 359.96,-248 210,-248"/>
<text xml:space="preserve" text-anchor="start" x="213" y="-253.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">nextcloud / 80 / Access</text>
</g>
</g>
</svg>
`;case`storage`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2411pt" height="1981pt"
 viewBox="0.00 0.00 2411.00 1981.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1966.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1c417d" stroke="#1c356c" points="8,-8 8,-1943 1934.41,-1943 1934.41,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1930.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="48,-48 48,-1490 1070.74,-1490 1070.74,-48 48,-48"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-1477.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_agent</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="131.61,-96 131.61,-281 396.77,-281 396.77,-96 131.61,-96"/>
<text xml:space="preserve" text-anchor="start" x="139.61" y="-268.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">自宅監視基盤</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_databases</title>
<polygon fill="#3e4651" stroke="#2d333d" points="713.47,-809 713.47,-1330 973.47,-1330 973.47,-809 713.47,-809"/>
<text xml:space="preserve" text-anchor="start" x="721.47" y="-1317.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">DB / アプリ共有基盤</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_backups</title>
<polygon fill="#3e4651" stroke="#2d333d" points="656.19,-88 656.19,-769 1030.74,-769 1030.74,-88 656.19,-88"/>
<text xml:space="preserve" text-anchor="start" x="664.19" y="-756.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">バックアップ処理</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="1207.12,-1201 1207.12,-1882 1894.41,-1882 1894.41,-1201 1207.12,-1201"/>
<text xml:space="preserve" text-anchor="start" x="1215.12" y="-1869.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2117.5,-631 2117.5,-816 2372.69,-816 2372.69,-631 2117.5,-631"/>
<text xml:space="preserve" text-anchor="start" x="2125.5" y="-803.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<!-- local_store -->
<g id="node1" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M364.77,-218.91C364.77,-223.93 319.69,-228 264.19,-228 208.69,-228 163.61,-223.93 163.61,-218.91 163.61,-218.91 163.61,-137.09 163.61,-137.09 163.61,-132.07 208.69,-128 264.19,-128 319.69,-128 364.77,-132.07 364.77,-137.09 364.77,-137.09 364.77,-218.91 364.77,-218.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M364.77,-218.91C364.77,-213.9 319.69,-209.82 264.19,-209.82 208.69,-209.82 163.61,-213.9 163.61,-218.91"/>
<text xml:space="preserve" text-anchor="start" x="173.62" y="-170" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- mariadb -->
<g id="node2" class="node">
<title>mariadb</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M933.47,-1259.91C933.47,-1264.93 893.13,-1269 843.47,-1269 793.81,-1269 753.47,-1264.93 753.47,-1259.91 753.47,-1259.91 753.47,-1178.09 753.47,-1178.09 753.47,-1173.07 793.81,-1169 843.47,-1169 893.13,-1169 933.47,-1173.07 933.47,-1178.09 933.47,-1178.09 933.47,-1259.91 933.47,-1259.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M933.47,-1259.91C933.47,-1254.9 893.13,-1250.82 843.47,-1250.82 793.81,-1250.82 753.47,-1254.9 753.47,-1259.91"/>
<text xml:space="preserve" text-anchor="start" x="804.57" y="-1211" font-family="Arial" font-size="20.00" fill="#ffe0c2">MariaDB</text>
</g>
<!-- postgres_staging -->
<g id="node3" class="node">
<title>postgres_staging</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M933.47,-939.91C933.47,-944.93 893.13,-949 843.47,-949 793.81,-949 753.47,-944.93 753.47,-939.91 753.47,-939.91 753.47,-858.09 753.47,-858.09 753.47,-853.07 793.81,-849 843.47,-849 893.13,-849 933.47,-853.07 933.47,-858.09 933.47,-858.09 933.47,-939.91 933.47,-939.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M933.47,-939.91C933.47,-934.9 893.13,-930.82 843.47,-930.82 793.81,-930.82 753.47,-934.9 753.47,-939.91"/>
<text xml:space="preserve" text-anchor="start" x="765.66" y="-891" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL STG</text>
</g>
<!-- postgres -->
<g id="node4" class="node">
<title>postgres</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M933.47,-1099.91C933.47,-1104.93 893.13,-1109 843.47,-1109 793.81,-1109 753.47,-1104.93 753.47,-1099.91 753.47,-1099.91 753.47,-1018.09 753.47,-1018.09 753.47,-1013.07 793.81,-1009 843.47,-1009 893.13,-1009 933.47,-1013.07 933.47,-1018.09 933.47,-1018.09 933.47,-1099.91 933.47,-1099.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M933.47,-1099.91C933.47,-1094.9 893.13,-1090.82 843.47,-1090.82 793.81,-1090.82 753.47,-1094.9 753.47,-1099.91"/>
<text xml:space="preserve" text-anchor="start" x="765.1" y="-1051" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL PRD</text>
</g>
<!-- db -->
<g id="node5" class="node">
<title>db</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="975.74,-708 711.19,-708 711.19,-608 975.74,-608 975.74,-708"/>
<text xml:space="preserve" text-anchor="start" x="721.2" y="-650" font-family="Arial" font-size="20.00" fill="#f8fafc">DB logical dump / 自宅Talos</text>
</g>
<!-- recordings -->
<g id="node6" class="node">
<title>recordings</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="960.18,-388 726.75,-388 726.75,-288 960.18,-288 960.18,-388"/>
<text xml:space="preserve" text-anchor="start" x="736.76" y="-330" font-family="Arial" font-size="20.00" fill="#f8fafc">録画 / 自宅Talos CronJob</text>
</g>
<!-- metrics -->
<g id="node7" class="node">
<title>metrics</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="978.52,-228 708.41,-228 708.41,-128 978.52,-128 978.52,-228"/>
<text xml:space="preserve" text-anchor="start" x="718.42" y="-170" font-family="Arial" font-size="20.00" fill="#f8fafc">metrics snapshot / 自宅Talos</text>
</g>
<!-- nas -->
<g id="node8" class="node">
<title>nas</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="990.74,-548 696.19,-548 696.19,-448 990.74,-448 990.74,-548"/>
<text xml:space="preserve" text-anchor="start" x="706.2" y="-490" font-family="Arial" font-size="20.00" fill="#f8fafc">NAS restic / 自宅Talos CronJob</text>
</g>
<!-- nextcloud -->
<g id="node9" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="354.19,-1269 174.19,-1269 174.19,-1169 354.19,-1169 354.19,-1269"/>
<text xml:space="preserve" text-anchor="start" x="219.72" y="-1211" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node10" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="440.38,-1093 88,-1093 88,-993 440.38,-993 440.38,-1093"/>
<text xml:space="preserve" text-anchor="start" x="98.01" y="-1035" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信 / EPGStation・TNLaStation</text>
</g>
<!-- shared -->
<g id="node11" class="node">
<title>shared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="395.92,-1429 132.46,-1429 132.46,-1329 395.92,-1329 395.92,-1429"/>
<text xml:space="preserve" text-anchor="start" x="142.47" y="-1371" font-family="Arial" font-size="20.00" fill="#f8fafc">共有PV / runner cache・状態</text>
</g>
<!-- nas02 -->
<g id="node12" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1518.38,-1331.91C1518.38,-1336.93 1457.58,-1341 1382.75,-1341 1307.91,-1341 1247.12,-1336.93 1247.12,-1331.91 1247.12,-1331.91 1247.12,-1250.09 1247.12,-1250.09 1247.12,-1245.07 1307.91,-1241 1382.75,-1241 1457.58,-1241 1518.38,-1245.07 1518.38,-1250.09 1518.38,-1250.09 1518.38,-1331.91 1518.38,-1331.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1518.38,-1331.91C1518.38,-1326.9 1457.58,-1322.82 1382.75,-1322.82 1307.91,-1322.82 1247.12,-1326.9 1247.12,-1331.91"/>
<text xml:space="preserve" text-anchor="start" x="1257.13" y="-1283" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- nas01 -->
<g id="node13" class="node">
<title>nas01</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1518.38,-1491.91C1518.38,-1496.93 1457.58,-1501 1382.75,-1501 1307.91,-1501 1247.12,-1496.93 1247.12,-1491.91 1247.12,-1491.91 1247.12,-1410.09 1247.12,-1410.09 1247.12,-1405.07 1307.91,-1401 1382.75,-1401 1457.58,-1401 1518.38,-1405.07 1518.38,-1410.09 1518.38,-1410.09 1518.38,-1491.91 1518.38,-1491.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1518.38,-1491.91C1518.38,-1486.9 1457.58,-1482.82 1382.75,-1482.82 1307.91,-1482.82 1247.12,-1486.9 1247.12,-1491.91"/>
<text xml:space="preserve" text-anchor="start" x="1257.13" y="-1443" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;01 / TrueNAS VM69001</text>
</g>
<!-- x570 -->
<g id="node14" class="node">
<title>x570</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1481.68,-1661 1283.81,-1661 1283.81,-1561 1481.68,-1561 1481.68,-1661"/>
<text xml:space="preserve" text-anchor="start" x="1293.82" y="-1603" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;x570 / Proxmox</text>
</g>
<!-- b550m -->
<g id="node15" class="node">
<title>b550m</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1490.57,-1821 1274.92,-1821 1274.92,-1721 1490.57,-1721 1490.57,-1821"/>
<text xml:space="preserve" text-anchor="start" x="1284.93" y="-1763" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;b550m / Proxmox</text>
</g>
<!-- pbs -->
<g id="node16" class="node">
<title>pbs</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1854.41,-1651.91C1854.41,-1656.93 1814.07,-1661 1764.41,-1661 1714.75,-1661 1674.41,-1656.93 1674.41,-1651.91 1674.41,-1651.91 1674.41,-1570.09 1674.41,-1570.09 1674.41,-1565.07 1714.75,-1561 1764.41,-1561 1814.07,-1561 1854.41,-1565.07 1854.41,-1570.09 1854.41,-1570.09 1854.41,-1651.91 1854.41,-1651.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1854.41,-1651.91C1854.41,-1646.9 1814.07,-1642.82 1764.41,-1642.82 1714.75,-1642.82 1674.41,-1646.9 1674.41,-1651.91"/>
<text xml:space="preserve" text-anchor="start" x="1693.26" y="-1603" font-family="Arial" font-size="20.00" fill="#ffe0c2">PBS / VM14001</text>
</g>
<!-- idrive -->
<g id="node17" class="node">
<title>idrive</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2340.69,-753.91C2340.69,-758.93 2297.84,-763 2245.09,-763 2192.34,-763 2149.5,-758.93 2149.5,-753.91 2149.5,-753.91 2149.5,-672.09 2149.5,-672.09 2149.5,-667.07 2192.34,-663 2245.09,-663 2297.84,-663 2340.69,-667.07 2340.69,-672.09 2340.69,-672.09 2340.69,-753.91 2340.69,-753.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2340.69,-753.91C2340.69,-748.9 2297.84,-744.82 2245.09,-744.82 2192.34,-744.82 2149.5,-748.9 2149.5,-753.91"/>
<text xml:space="preserve" text-anchor="start" x="2159.51" y="-705" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2（S3互換）</text>
</g>
<!-- local_store&#45;&gt;metrics -->
<g id="edge10" class="edge">
<title>local_store&#45;&gt;metrics</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M365.58,-170.79C401.75,-168.52 442.88,-166.31 480.38,-165.2 554.93,-162.98 573.65,-162.75 648.19,-165.2 664.35,-165.73 681.25,-166.51 698.05,-167.43"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="697.83,-170.04 705.47,-167.85 698.13,-164.8 697.83,-170.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="495.14,-165.2 495.14,-188 633.43,-188 633.43,-165.2 495.14,-165.2"/>
<text xml:space="preserve" text-anchor="start" x="498.14" y="-171" font-family="Arial" font-size="14.00" fill="#ffe0c2">snapshot / vmbackup</text>
</g>
<!-- local_store&#45;&gt;nas02 -->
<g id="edge9" class="edge">
<title>local_store&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M365.5,-187.07C394.07,-194.78 422.31,-208.36 440.38,-232 520.93,-337.37 385.04,-1332.8 480.38,-1425 493.78,-1437.96 629.62,-1426.68 648.19,-1425 854.26,-1406.33 1088.95,-1358.74 1236.2,-1325.62"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1236.52,-1328.24 1243.26,-1324.03 1235.36,-1323.12 1236.52,-1328.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="781.74,-1423.98 781.74,-1446.78 905.19,-1446.78 905.19,-1423.98 781.74,-1423.98"/>
<text xml:space="preserve" text-anchor="start" x="784.74" y="-1429.78" font-family="Arial" font-size="14.00" fill="#bbfcd3">metrics用NFS PVC</text>
</g>
<!-- postgres&#45;&gt;db -->
<g id="edge11" class="edge">
<title>postgres&#45;&gt;db</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M713.47,-1044.42C652.71,-1030.36 585.66,-1002.82 548.29,-949 516.59,-903.37 520.24,-871.95 548.29,-824 581.96,-766.43 643.74,-727.29 702.12,-701.55"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="702.82,-704.1 708.67,-698.73 700.74,-699.28 702.82,-704.1"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="480.33,-722.69 480.33,-745.49 623.27,-745.49 623.27,-722.69 480.33,-722.69"/>
<text xml:space="preserve" text-anchor="start" x="483.33" y="-728.49" font-family="Arial" font-size="14.00" fill="#ffe0c2">整合性あるlogical dump</text>
</g>
<!-- postgres&#45;&gt;nas02 -->
<g id="edge12" class="edge">
<title>postgres&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M973.47,-1101.73C1005.52,-1113.14 1039.61,-1125.94 1070.74,-1139 1141.24,-1168.58 1218.48,-1206.3 1278.35,-1236.76"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1276.85,-1238.95 1284.73,-1240.02 1279.24,-1234.27 1276.85,-1238.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1034.77,-1143.32 1034.77,-1166.12 1132.56,-1166.12 1132.56,-1143.32 1034.77,-1143.32"/>
<text xml:space="preserve" text-anchor="start" x="1037.77" y="-1149.12" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
<!-- nas&#45;&gt;idrive -->
<g id="edge17" class="edge">
<title>nas&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1030.74,-526.61C1328.65,-572.38 1902.76,-660.57 2138.81,-696.83"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="2138.07,-699.37 2145.88,-697.91 2138.86,-694.18 2138.07,-699.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1419.92,-592.49 1419.92,-615.29 1607.98,-615.29 1607.98,-592.49 1419.92,-592.49"/>
<text xml:space="preserve" text-anchor="start" x="1422.92" y="-598.29" font-family="Arial" font-size="14.00" fill="#ffe0c2">用途別prefix / 暗号化・retention</text>
</g>
<!-- nextcloud&#45;&gt;mariadb -->
<g id="edge1" class="edge">
<title>nextcloud&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M354.12,-1219C458.91,-1219 632.57,-1219 742.09,-1219"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="741.95,-1221.63 749.45,-1219 741.95,-1216.38 741.95,-1221.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="480.38,-1219 480.38,-1241.8 648.19,-1241.8 648.19,-1219 480.38,-1219"/>
<text xml:space="preserve" text-anchor="start" x="483.38" y="-1224.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- nextcloud&#45;&gt;nas02 -->
<g id="edge2" class="edge">
<title>nextcloud&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M353.81,-1240.1C385.87,-1252.14 419.32,-1270.7 440.38,-1299 518.05,-1403.38 387.8,-1497.58 480.38,-1589 536.41,-1644.33 577.6,-1606.1 656.19,-1611 897.22,-1626.02 1040.08,-1770.74 1199.12,-1589 1215.08,-1570.76 1193.65,-1391.15 1207.12,-1371 1215.32,-1358.72 1225.91,-1348.3 1237.82,-1339.45"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1239.12,-1341.75 1243.77,-1335.31 1236.12,-1337.44 1239.12,-1341.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="787.95,-1679.79 787.95,-1702.59 898.98,-1702.59 898.98,-1679.79 787.95,-1679.79"/>
<text xml:space="preserve" text-anchor="start" x="790.95" y="-1685.59" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- recording&#45;&gt;mariadb -->
<g id="edge3" class="edge">
<title>recording&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M429.07,-1092.96C530.07,-1123.76 656.31,-1162.25 742.54,-1188.54"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="741.76,-1191.04 749.7,-1190.72 743.29,-1186.02 741.76,-1191.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="513.04,-1157.05 513.04,-1179.85 615.53,-1179.85 615.53,-1157.05 513.04,-1157.05"/>
<text xml:space="preserve" text-anchor="start" x="516.04" y="-1162.85" font-family="Arial" font-size="14.00" fill="#bbfcd3">EPGStation DB</text>
</g>
<!-- recording&#45;&gt;postgres_staging -->
<g id="edge4" class="edge">
<title>recording&#45;&gt;postgres_staging</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M440.35,-999.31C539.24,-974.64 659.28,-944.7 742.32,-923.98"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="742.93,-926.53 749.57,-922.17 741.66,-921.44 742.93,-926.53"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="550.79,-988.13 550.79,-1010.93 577.78,-1010.93 577.78,-988.13 550.79,-988.13"/>
<text xml:space="preserve" text-anchor="start" x="553.79" y="-996.33" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- recording&#45;&gt;postgres -->
<g id="edge5" class="edge">
<title>recording&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M440.26,-1031.79C505.58,-1029.37 580.33,-1028.71 648.19,-1033.2 679,-1035.24 712.38,-1039.07 742.63,-1043.17"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="741.97,-1045.73 749.76,-1044.16 742.69,-1040.53 741.97,-1045.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="550.79,-1033.2 550.79,-1056 577.78,-1056 577.78,-1033.2 550.79,-1033.2"/>
<text xml:space="preserve" text-anchor="start" x="553.79" y="-1041.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- recording&#45;&gt;recordings -->
<g id="edge7" class="edge">
<title>recording&#45;&gt;recordings</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M284.01,-993.34C330.26,-877.41 460.15,-586.07 656.19,-418 674.2,-402.57 695.62,-389.72 717.43,-379.16"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="718.37,-381.61 724.05,-376.05 716.14,-376.86 718.37,-381.61"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="505.27,-613.87 505.27,-636.67 623.3,-636.67 623.3,-613.87 505.27,-613.87"/>
<text xml:space="preserve" text-anchor="start" x="508.27" y="-619.67" font-family="Arial" font-size="14.00" fill="#ffe0c2">録画ファイル専用job</text>
</g>
<!-- recording&#45;&gt;nas02 -->
<g id="edge6" class="edge">
<title>recording&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M391.43,-1092.78C410.37,-1105.28 427.76,-1120.53 440.38,-1139 518.02,-1252.6 382.84,-1348.95 480.38,-1446 593.6,-1558.65 1089.82,-1562.46 1199.12,-1446 1210.59,-1433.78 1197.33,-1384.61 1207.12,-1371 1215.59,-1359.23 1226.21,-1349.16 1238.02,-1340.53"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1239.18,-1342.92 1243.88,-1336.51 1236.21,-1338.59 1239.18,-1342.92"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="829.97,-1531.92 829.97,-1554.72 856.96,-1554.72 856.96,-1531.92 829.97,-1531.92"/>
<text xml:space="preserve" text-anchor="start" x="832.97" y="-1540.12" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- shared&#45;&gt;nas01 -->
<g id="edge8" class="edge">
<title>shared&#45;&gt;nas01</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M298.46,-1428.72C358.12,-1512.17 492.5,-1675.46 656.19,-1718 834.51,-1764.34 892.48,-1764.57 1070.74,-1718 1134.03,-1701.46 1164.12,-1701.27 1199.12,-1646 1212.83,-1624.36 1192.54,-1552.07 1207.12,-1531 1215.44,-1518.97 1226.05,-1508.71 1237.9,-1499.97"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1239.13,-1502.31 1243.8,-1495.89 1236.14,-1498 1239.13,-1502.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="779.77,-1752.84 779.77,-1775.64 907.16,-1775.64 907.16,-1752.84 779.77,-1752.84"/>
<text xml:space="preserve" text-anchor="start" x="782.77" y="-1758.64" font-family="Arial" font-size="14.00" fill="#bbfcd3">runner cache / NFS</text>
</g>
<!-- nas02&#45;&gt;nas -->
<g id="edge13" class="edge">
<title>nas02&#45;&gt;nas</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1345.6,-1240.16C1278.72,-1142.92 1137.16,-921.45 1078.74,-711 1074.78,-696.73 1079.65,-589.83 1070.74,-578 1052.97,-554.41 1027.69,-537.74 1000.42,-525.98"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1001.44,-523.57 993.51,-523.17 999.46,-528.43 1001.44,-523.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1078.74,-991.07 1078.74,-1013.87 1199.12,-1013.87 1199.12,-991.07 1078.74,-991.07"/>
<text xml:space="preserve" text-anchor="start" x="1081.74" y="-996.87" font-family="Arial" font-size="14.00" fill="#ffe0c2">対象dataset / restic</text>
</g>
<!-- x570&#45;&gt;pbs -->
<g id="edge14" class="edge">
<title>x570&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1481.52,-1611C1537.26,-1611 1606.98,-1611 1663.13,-1611"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1662.92,-1613.63 1670.42,-1611 1662.92,-1608.38 1662.92,-1613.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1558.38,-1611 1558.38,-1633.8 1634.41,-1633.8 1634.41,-1611 1558.38,-1611"/>
<text xml:space="preserve" text-anchor="start" x="1561.38" y="-1616.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- b550m&#45;&gt;pbs -->
<g id="edge15" class="edge">
<title>b550m&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1490.51,-1726.01C1544.93,-1703.07 1610.69,-1675.36 1664.02,-1652.89"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1664.8,-1655.4 1670.7,-1650.07 1662.77,-1650.57 1664.8,-1655.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1558.38,-1695.8 1558.38,-1718.6 1634.41,-1718.6 1634.41,-1695.8 1558.38,-1695.8"/>
<text xml:space="preserve" text-anchor="start" x="1561.38" y="-1701.6" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- pbs&#45;&gt;idrive -->
<g id="edge16" class="edge">
<title>pbs&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1792.52,-1560.15C1875.11,-1405.2 2123.39,-939.44 2212.13,-772.97"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="2214.35,-774.38 2215.56,-766.52 2209.72,-771.91 2214.35,-774.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1942.41,-1268.84 1942.41,-1291.64 2109.5,-1291.64 2109.5,-1268.84 1942.41,-1268.84"/>
<text xml:space="preserve" text-anchor="start" x="1945.41" y="-1274.64" font-family="Arial" font-size="14.00" fill="#ffe0c2">S3 datastore / VM backup</text>
</g>
</g>
</svg>
`;case`power`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2472pt" height="1143pt"
 viewBox="0.00 0.00 2472.00 1143.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1128.05)">
<g id="clust1" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-377 8,-1105 2434.1,-1105 2434.1,-377 8,-377"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1092.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_ups</title>
<polygon fill="#3e4651" stroke="#2d333d" points="48,-417 48,-904 2394.1,-904 2394.1,-417 48,-417"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-891.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">UPS / NUT</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="1480.77,-8 1480.77,-369 1776.42,-369 1776.42,-8 1480.77,-8"/>
<text xml:space="preserve" text-anchor="start" x="1488.77" y="-356.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ</text>
</g>
<!-- mains -->
<g id="node1" class="node">
<title>mains</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268,-843 88,-843 88,-743 268,-743 268,-843"/>
<text xml:space="preserve" text-anchor="start" x="147.44" y="-785" font-family="Arial" font-size="20.00" fill="#f8fafc">商用AC</text>
</g>
<!-- surge_a -->
<g id="node2" class="node">
<title>surge_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="753.58,-673 459.02,-673 459.02,-573 753.58,-573 753.58,-673"/>
<text xml:space="preserve" text-anchor="start" x="469.03" y="-615" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS A / サージのみ口・非backup</text>
</g>
<!-- ups_a -->
<g id="node3" class="node">
<title>ups_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1203.97,-843 936.05,-843 936.05,-743 1203.97,-743 1203.97,-843"/>
<text xml:space="preserve" text-anchor="start" x="946.05" y="-785" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS A / APC RS550S 2020</text>
</g>
<!-- ups_b -->
<g id="node4" class="node">
<title>ups_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1203.97,-673 936.05,-673 936.05,-573 1203.97,-573 1203.97,-673"/>
<text xml:space="preserve" text-anchor="start" x="946.05" y="-615" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS B / APC RS550S 2025</text>
</g>
<!-- pi_a -->
<g id="node5" class="node">
<title>pi_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1762.58,-700 1494.62,-700 1494.62,-600 1762.58,-600 1762.58,-700"/>
<text xml:space="preserve" text-anchor="start" x="1504.63" y="-642" font-family="Arial" font-size="20.00" fill="#f8fafc">NUT Pi 01 / 192.168.10.112</text>
</g>
<!-- pi_b -->
<g id="node6" class="node">
<title>pi_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2354.1,-633 2086.14,-633 2086.14,-533 2354.1,-533 2354.1,-633"/>
<text xml:space="preserve" text-anchor="start" x="2096.15" y="-575" font-family="Arial" font-size="20.00" fill="#f8fafc">NUT Pi 02 / 192.168.10.113</text>
</g>
<!-- network -->
<g id="node7" class="node">
<title>network</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1718.6,-1044 1538.6,-1044 1538.6,-944 1718.6,-944 1718.6,-1044"/>
<text xml:space="preserve" text-anchor="start" x="1561.92" y="-986" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- x570 -->
<g id="node8" class="node">
<title>x570</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1727.53,-308 1529.66,-308 1529.66,-208 1727.53,-208 1727.53,-308"/>
<text xml:space="preserve" text-anchor="start" x="1539.67" y="-250" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;x570 / Proxmox</text>
</g>
<!-- b550m -->
<g id="node9" class="node">
<title>b550m</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1736.42,-148 1520.77,-148 1520.77,-48 1736.42,-48 1736.42,-148"/>
<text xml:space="preserve" text-anchor="start" x="1530.78" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;b550m / Proxmox</text>
</g>
<!-- mains&#45;&gt;surge_a -->
<g id="edge1" class="edge">
<title>mains&#45;&gt;surge_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M267.85,-757.57C326.46,-734.2 404.34,-703.14 470.52,-676.75"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="471.38,-679.23 477.38,-674.01 469.44,-674.35 471.38,-679.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="308,-738.01 308,-760.81 419.02,-760.81 419.02,-738.01 308,-738.01"/>
<text xml:space="preserve" text-anchor="start" x="311" y="-743.81" font-family="Arial" font-size="14.00" fill="#fcd9d2">非バックアップ出力</text>
</g>
<!-- mains&#45;&gt;ups_a -->
<g id="edge2" class="edge">
<title>mains&#45;&gt;ups_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M267.59,-793C421.65,-793 740.16,-793 925.9,-793"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="925.76,-795.63 933.26,-793 925.76,-790.38 925.76,-795.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="581.91,-793 581.91,-815.8 630.69,-815.8 630.69,-793 581.91,-793"/>
<text xml:space="preserve" text-anchor="start" x="584.91" y="-798.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">AC入力</text>
</g>
<!-- surge_a&#45;&gt;ups_b -->
<g id="edge3" class="edge">
<title>surge_a&#45;&gt;ups_b</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M753.39,-623C808.49,-623 871.07,-623 925.89,-623"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="925.87,-625.63 933.37,-623 925.87,-620.38 925.87,-625.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="793.58,-623 793.58,-645.8 896.05,-645.8 896.05,-623 793.58,-623"/>
<text xml:space="preserve" text-anchor="start" x="796.58" y="-628.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">UPS BのAC入力</text>
</g>
<!-- ups_a&#45;&gt;pi_a -->
<g id="edge5" class="edge">
<title>ups_a&#45;&gt;pi_a</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1203.97,-758.84C1288.57,-737.1 1398.08,-708.97 1484.56,-686.75"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1485.18,-689.3 1491.79,-684.89 1483.87,-684.22 1485.18,-689.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1308.56,-746.75 1308.56,-769.55 1390.03,-769.55 1390.03,-746.75 1308.56,-746.75"/>
<text xml:space="preserve" text-anchor="start" x="1311.56" y="-752.55" font-family="Arial" font-size="14.00" fill="#c9c9c9">USB / ups&#45;a</text>
</g>
<!-- ups_a&#45;&gt;pi_b -->
<g id="edge6" class="edge">
<title>ups_a&#45;&gt;pi_b</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1203.55,-795.07C1277.58,-795.01 1371.4,-792.94 1454.62,-785 1721.15,-759.59 1794,-761.04 2046.14,-671 2071.61,-661.91 2098.11,-649.87 2122.49,-637.62"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="2123.53,-640.04 2129.02,-634.3 2121.15,-635.36 2123.53,-640.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1592.14,-781.76 1592.14,-804.56 1665.06,-804.56 1665.06,-781.76 1592.14,-781.76"/>
<text xml:space="preserve" text-anchor="start" x="1595.14" y="-787.56" font-family="Arial" font-size="14.00" fill="#fcd9d2">Pi 02へ給電</text>
</g>
<!-- ups_a&#45;&gt;x570 -->
<g id="edge4" class="edge">
<title>ups_a&#45;&gt;x570</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1165.78,-743.09C1180.45,-731.67 1194.02,-718.31 1203.97,-703 1258.83,-618.67 1186.2,-562.56 1243.97,-480.2 1310.54,-385.3 1431.56,-325.16 1519.92,-291.72"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1520.76,-294.21 1526.87,-289.13 1518.93,-289.29 1520.76,-294.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1305.45,-480.2 1305.45,-503 1393.14,-503 1393.14,-480.2 1305.45,-480.2"/>
<text xml:space="preserve" text-anchor="start" x="1308.45" y="-486" font-family="Arial" font-size="14.00" fill="#fcd9d2">バッテリー給電</text>
</g>
<!-- ups_b&#45;&gt;pi_a -->
<g id="edge9" class="edge">
<title>ups_b&#45;&gt;pi_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1203.97,-629.45C1288.49,-633.55 1397.86,-638.86 1484.3,-643.05"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1484.08,-645.67 1491.7,-643.41 1484.34,-640.42 1484.08,-645.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1312.84,-641.27 1312.84,-664.07 1385.75,-664.07 1385.75,-641.27 1312.84,-641.27"/>
<text xml:space="preserve" text-anchor="start" x="1315.84" y="-647.07" font-family="Arial" font-size="14.00" fill="#fcd9d2">Pi 01へ給電</text>
</g>
<!-- ups_b&#45;&gt;pi_b -->
<g id="edge10" class="edge">
<title>ups_b&#45;&gt;pi_b</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1133.54,-573.08C1164.78,-551.29 1204.31,-528.19 1243.97,-517 1297.97,-501.77 1874.47,-519.58 2046.14,-543 2055.99,-544.34 2066.11,-545.98 2076.26,-547.82"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2075.59,-550.37 2083.44,-549.17 2076.56,-545.21 2075.59,-550.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1587.86,-522.47 1587.86,-545.27 1669.34,-545.27 1669.34,-522.47 1587.86,-522.47"/>
<text xml:space="preserve" text-anchor="start" x="1590.86" y="-528.27" font-family="Arial" font-size="14.00" fill="#c9c9c9">USB / ups&#45;b</text>
</g>
<!-- ups_b&#45;&gt;network -->
<g id="edge7" class="edge">
<title>ups_b&#45;&gt;network</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1157.68,-672.96C1174.2,-684.79 1190.51,-698.3 1203.97,-713 1228.69,-740 1218.19,-759.01 1243.97,-785 1329.14,-870.84 1374.28,-861.7 1480.77,-919 1496.51,-927.47 1513.31,-936.27 1529.71,-944.73"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1528.21,-946.91 1536.08,-948.01 1530.61,-942.24 1528.21,-946.91"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1305.46,-903.64 1305.46,-926.44 1393.13,-926.44 1393.13,-903.64 1305.46,-903.64"/>
<text xml:space="preserve" text-anchor="start" x="1308.46" y="-909.44" font-family="Arial" font-size="14.00" fill="#fcd9d2">NW機器へ給電</text>
</g>
<!-- ups_b&#45;&gt;b550m -->
<g id="edge8" class="edge">
<title>ups_b&#45;&gt;b550m</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1083.85,-573.26C1105.37,-498.83 1155.33,-358.07 1243.97,-272.2 1318.44,-200.07 1428.05,-154.41 1511.05,-128.02"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1511.78,-130.54 1518.15,-125.8 1510.21,-125.53 1511.78,-130.54"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1305.45,-272.2 1305.45,-295 1393.14,-295 1393.14,-272.2 1305.45,-272.2"/>
<text xml:space="preserve" text-anchor="start" x="1308.45" y="-278" font-family="Arial" font-size="14.00" fill="#fcd9d2">バッテリー給電</text>
</g>
<!-- pi_a&#45;&gt;pi_b -->
<g id="edge13" class="edge">
<title>pi_a&#45;&gt;pi_b</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1722.81,-600.13C1748,-589.04 1775.74,-578.89 1802.58,-573.2 1892.15,-554.21 1994.99,-556.39 2076.07,-563.46"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="2075.63,-566.05 2083.34,-564.12 2076.11,-560.83 2075.63,-566.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1802.58,-573.2 1802.58,-596 2046.14,-596 2046.14,-573.2 1802.58,-573.2"/>
<text xml:space="preserve" text-anchor="start" x="1805.58" y="-579" font-family="Arial" font-size="14.00" fill="#d4f2ff">ups&#45;b@192.168.10.113 / 給電元Bを監視</text>
</g>
<!-- pi_b&#45;&gt;pi_a -->
<g id="edge14" class="edge">
<title>pi_b&#45;&gt;pi_a</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M2086.5,-601.88C2072.88,-603.68 2059.24,-605.42 2046.14,-607 1955.3,-617.99 1853.09,-628.57 1772.65,-636.48"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1772.68,-633.84 1765.47,-637.19 1773.19,-639.07 1772.68,-633.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1802.58,-632.86 1802.58,-655.66 2046.14,-655.66 2046.14,-632.86 1802.58,-632.86"/>
<text xml:space="preserve" text-anchor="start" x="1805.58" y="-638.66" font-family="Arial" font-size="14.00" fill="#d4f2ff">ups&#45;a@192.168.10.112 / 給電元Aを監視</text>
</g>
<!-- x570&#45;&gt;pi_a -->
<g id="edge11" class="edge">
<title>x570&#45;&gt;pi_a</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1529.68,-290.6C1403.55,-337.57 1210.81,-430.76 1290.52,-540.4 1334.87,-601.4 1413.95,-629.14 1484.48,-641.47"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1484,-644.05 1491.83,-642.68 1484.86,-638.87 1484,-644.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1243.97,-517.6 1243.97,-540.4 1454.62,-540.4 1454.62,-517.6 1243.97,-517.6"/>
<text xml:space="preserve" text-anchor="start" x="1246.97" y="-523.4" font-family="Arial" font-size="14.00" fill="#d4f2ff">charge&#45;guard監視 / 80%で自身停止</text>
</g>
<!-- b550m&#45;&gt;pi_b -->
<g id="edge12" class="edge">
<title>b550m&#45;&gt;pi_b</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1729.13,-147.96C1745.35,-157.3 1761.66,-167.46 1776.42,-178 1928.94,-286.86 2085.7,-442.7 2165.43,-525.75"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="2163.5,-527.53 2170.58,-531.13 2167.29,-523.89 2163.5,-527.53"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1819.04,-397.98 1819.04,-420.78 2029.68,-420.78 2029.68,-397.98 1819.04,-397.98"/>
<text xml:space="preserve" text-anchor="start" x="1822.04" y="-403.78" font-family="Arial" font-size="14.00" fill="#d4f2ff">charge&#45;guard監視 / 80%で自身停止</text>
</g>
</g>
</svg>
`;case`recording_prd`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1828pt" height="913pt"
 viewBox="0.00 0.00 1828.00 913.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 898.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-875 1489.36,-875 1489.36,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-862.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_tnlastation</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="48,-48 48,-571 1449.36,-571 1449.36,-48 48,-48"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-558.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TNLASTATION PRD</text>
</g>
<!-- resources -->
<g id="node1" class="node">
<title>resources</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268,-209 88,-209 88,-109 268,-109 268,-209"/>
<text xml:space="preserve" text-anchor="start" x="127.99" y="-151" font-family="Arial" font-size="20.00" fill="#f8fafc">リソース定義</text>
</g>
<!-- gateway -->
<g id="node2" class="node">
<title>gateway</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268,-370 88,-370 88,-270 268,-270 268,-370"/>
<text xml:space="preserve" text-anchor="start" x="138.54" y="-312" font-family="Arial" font-size="20.00" fill="#f8fafc">Gateway</text>
</g>
<!-- frontend -->
<g id="node3" class="node">
<title>frontend</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="563.84,-188 383.84,-188 383.84,-88 563.84,-88 563.84,-188"/>
<text xml:space="preserve" text-anchor="start" x="433.81" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">Frontend</text>
</g>
<!-- backend -->
<g id="node4" class="node">
<title>backend</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="588.89,-370 358.79,-370 358.79,-270 588.89,-270 588.89,-370"/>
<text xml:space="preserve" text-anchor="start" x="368.79" y="-312" font-family="Arial" font-size="20.00" fill="#f8fafc">Backend / API・録画制御</text>
</g>
<!-- encode -->
<g id="node5" class="node">
<title>encode</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1013.03,-510 795.14,-510 795.14,-410 1013.03,-410 1013.03,-510"/>
<text xml:space="preserve" text-anchor="start" x="805.14" y="-452" font-family="Arial" font-size="20.00" fill="#f8fafc">ffmpeg encode worker</text>
</g>
<!-- streaming -->
<g id="node6" class="node">
<title>streaming</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1024.13,-370 784.04,-370 784.04,-270 1024.13,-270 1024.13,-370"/>
<text xml:space="preserve" text-anchor="start" x="794.04" y="-312" font-family="Arial" font-size="20.00" fill="#f8fafc">ffmpeg streaming worker</text>
</g>
<!-- mediamtx -->
<g id="node7" class="node">
<title>mediamtx</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1409.36,-314 1203.74,-314 1203.74,-214 1409.36,-214 1409.36,-314"/>
<text xml:space="preserve" text-anchor="start" x="1213.75" y="-256" font-family="Arial" font-size="20.00" fill="#f8fafc">MediaMTX / HLS配信</text>
</g>
<!-- mirakurun -->
<g id="node8" class="node">
<title>mirakurun</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1072.47,-711 735.7,-711 735.7,-611 1072.47,-611 1072.47,-711"/>
<text xml:space="preserve" text-anchor="start" x="745.7" y="-653" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun Service / 本番LXCへの中継</text>
</g>
<!-- postgres -->
<g id="node9" class="node">
<title>postgres</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1396.55,-753.91C1396.55,-758.93 1356.21,-763 1306.55,-763 1256.89,-763 1216.55,-758.93 1216.55,-753.91 1216.55,-753.91 1216.55,-672.09 1216.55,-672.09 1216.55,-667.07 1256.89,-663 1306.55,-663 1356.21,-663 1396.55,-667.07 1396.55,-672.09 1396.55,-672.09 1396.55,-753.91 1396.55,-753.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1396.55,-753.91C1396.55,-748.9 1356.21,-744.82 1306.55,-744.82 1256.89,-744.82 1216.55,-748.9 1216.55,-753.91"/>
<text xml:space="preserve" text-anchor="start" x="1228.19" y="-705" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL PRD</text>
</g>
<!-- nas02 -->
<g id="node10" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1797.62,-304.91C1797.62,-309.93 1736.83,-314 1661.99,-314 1587.15,-314 1526.36,-309.93 1526.36,-304.91 1526.36,-304.91 1526.36,-223.09 1526.36,-223.09 1526.36,-218.07 1587.15,-214 1661.99,-214 1736.83,-214 1797.62,-218.07 1797.62,-223.09 1797.62,-223.09 1797.62,-304.91 1797.62,-304.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1797.62,-304.91C1797.62,-299.9 1736.83,-295.82 1661.99,-295.82 1587.15,-295.82 1526.36,-299.9 1526.36,-304.91"/>
<text xml:space="preserve" text-anchor="start" x="1536.37" y="-256" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- gateway&#45;&gt;frontend -->
<g id="edge1" class="edge">
<title>gateway&#45;&gt;frontend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M229.19,-270.17C242.06,-256.99 255.73,-242.63 268,-229 281.05,-214.5 279.86,-206.15 296,-195.2 319.43,-179.31 347.57,-167.6 374.43,-159.06"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="374.96,-161.64 381.37,-156.94 373.43,-156.62 374.96,-161.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="296,-195.2 296,-218 330.79,-218 330.79,-195.2 296,-195.2"/>
<text xml:space="preserve" text-anchor="start" x="299" y="-201" font-family="Arial" font-size="14.00" fill="#bbfcd3">Web</text>
</g>
<!-- gateway&#45;&gt;backend -->
<g id="edge2" class="edge">
<title>gateway&#45;&gt;backend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M267.96,-320C293.35,-320 321.48,-320 348.57,-320"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="348.36,-322.63 355.86,-320 348.36,-317.38 348.36,-322.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="299.11,-320 299.11,-342.8 327.68,-342.8 327.68,-320 299.11,-320"/>
<text xml:space="preserve" text-anchor="start" x="302.11" y="-325.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">API</text>
</g>
<!-- gateway&#45;&gt;mediamtx -->
<g id="edge3" class="edge">
<title>gateway&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M267.61,-278C296.07,-266.56 328.17,-255.75 358.79,-250 656.14,-194.15 1015.31,-225.85 1193.7,-248.07"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1193.11,-250.64 1200.88,-248.98 1193.77,-245.43 1193.11,-250.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="645.68,-221.18 645.68,-243.98 678.91,-243.98 678.91,-221.18 645.68,-221.18"/>
<text xml:space="preserve" text-anchor="start" x="648.68" y="-226.98" font-family="Arial" font-size="14.00" fill="#bbfcd3">HLS</text>
</g>
<!-- backend&#45;&gt;encode -->
<g id="edge4" class="edge">
<title>backend&#45;&gt;encode</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M588.76,-357.24C649.56,-377.12 724.27,-401.54 785.6,-421.59"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="784.51,-424 792.45,-423.83 786.14,-419.01 784.51,-424"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="624.66,-394.2 624.66,-417 699.93,-417 699.93,-394.2 624.66,-394.2"/>
<text xml:space="preserve" text-anchor="start" x="627.66" y="-400" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode制御</text>
</g>
<!-- backend&#45;&gt;streaming -->
<g id="edge5" class="edge">
<title>backend&#45;&gt;streaming</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M588.76,-320C645.67,-320 714.79,-320 773.7,-320"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="773.67,-322.63 781.17,-320 773.67,-317.38 773.67,-322.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="616.89,-320 616.89,-342.8 707.7,-342.8 707.7,-320 616.89,-320"/>
<text xml:space="preserve" text-anchor="start" x="619.89" y="-325.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">streaming制御</text>
</g>
<!-- backend&#45;&gt;mirakurun -->
<g id="edge6" class="edge">
<title>backend&#45;&gt;mirakurun</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M515.4,-369.79C563.46,-426.41 648.1,-519.02 735.7,-581 748.31,-589.93 762.08,-598.32 776.13,-606.06"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="774.88,-608.37 782.72,-609.62 777.37,-603.75 774.88,-608.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="630.11,-557.01 630.11,-579.81 694.48,-579.81 694.48,-557.01 630.11,-557.01"/>
<text xml:space="preserve" text-anchor="start" x="633.11" y="-562.81" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- backend&#45;&gt;postgres -->
<g id="edge7" class="edge">
<title>backend&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M487.59,-369.93C514.64,-463.54 587.8,-662.22 735.7,-731 887.44,-801.57 1087.31,-771.07 1205.55,-742.23"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1206.09,-744.8 1212.73,-740.44 1204.82,-739.7 1206.09,-744.8"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="862.95,-774.23 862.95,-797.03 945.21,-797.03 945.21,-774.23 862.95,-774.23"/>
<text xml:space="preserve" text-anchor="start" x="865.95" y="-780.03" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- encode&#45;&gt;postgres -->
<g id="edge8" class="edge">
<title>encode&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1012.66,-487.74C1033.14,-494.94 1053.94,-503.65 1072.47,-514 1140.24,-551.85 1206.45,-611.18 1250.89,-655.22"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1248.8,-656.85 1255.96,-660.29 1252.51,-653.13 1248.8,-656.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1100.47,-586.28 1100.47,-609.08 1175.74,-609.08 1175.74,-586.28 1100.47,-586.28"/>
<text xml:space="preserve" text-anchor="start" x="1103.47" y="-592.08" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode状態</text>
</g>
<!-- streaming&#45;&gt;mediamtx -->
<g id="edge9" class="edge">
<title>streaming&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1023.94,-297.4C1049.15,-293 1075.65,-288.69 1100.47,-285.2 1130.64,-280.96 1163.43,-277.19 1193.75,-274.06"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1193.72,-276.7 1200.92,-273.33 1193.19,-271.48 1193.72,-276.7"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1123.44,-285.2 1123.44,-308 1152.77,-308 1152.77,-285.2 1123.44,-285.2"/>
<text xml:space="preserve" text-anchor="start" x="1126.44" y="-291" font-family="Arial" font-size="14.00" fill="#bbfcd3">配信</text>
</g>
<!-- mediamtx&#45;&gt;nas02 -->
<g id="edge10" class="edge">
<title>mediamtx&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1449.36,-264C1470.96,-264 1493.28,-264 1514.97,-264"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1514.9,-266.63 1522.4,-264 1514.9,-261.38 1514.9,-266.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1310.87,-241.2 1310.87,-264 1487.28,-264 1487.28,-241.2 1310.87,-241.2"/>
<text xml:space="preserve" text-anchor="start" x="1313.87" y="-247" font-family="Arial" font-size="14.00" fill="#bbfcd3">recorded・tnlastation / NFS</text>
</g>
</g>
</svg>
`;case`recording_stg`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1731pt" height="913pt"
 viewBox="0.00 0.00 1731.00 913.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 898.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-875 1392.68,-875 1392.68,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-862.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_tnlastation_staging</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="48,-48 48,-571 1352.68,-571 1352.68,-48 48,-48"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-558.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TNLASTATION STG</text>
</g>
<!-- resources -->
<g id="node1" class="node">
<title>resources</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268,-209 88,-209 88,-109 268,-109 268,-209"/>
<text xml:space="preserve" text-anchor="start" x="127.99" y="-151" font-family="Arial" font-size="20.00" fill="#f8fafc">リソース定義</text>
</g>
<!-- gateway -->
<g id="node2" class="node">
<title>gateway</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268,-370 88,-370 88,-270 268,-270 268,-370"/>
<text xml:space="preserve" text-anchor="start" x="138.54" y="-312" font-family="Arial" font-size="20.00" fill="#f8fafc">Gateway</text>
</g>
<!-- frontend -->
<g id="node3" class="node">
<title>frontend</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="563.84,-188 383.84,-188 383.84,-88 563.84,-88 563.84,-188"/>
<text xml:space="preserve" text-anchor="start" x="433.81" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">Frontend</text>
</g>
<!-- backend -->
<g id="node4" class="node">
<title>backend</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="588.89,-370 358.79,-370 358.79,-270 588.89,-270 588.89,-370"/>
<text xml:space="preserve" text-anchor="start" x="368.79" y="-312" font-family="Arial" font-size="20.00" fill="#f8fafc">Backend / API・録画制御</text>
</g>
<!-- encode -->
<g id="node5" class="node">
<title>encode</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="964.69,-510 746.8,-510 746.8,-410 964.69,-410 964.69,-510"/>
<text xml:space="preserve" text-anchor="start" x="756.8" y="-452" font-family="Arial" font-size="20.00" fill="#f8fafc">ffmpeg encode worker</text>
</g>
<!-- streaming -->
<g id="node6" class="node">
<title>streaming</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="975.79,-370 735.7,-370 735.7,-270 975.79,-270 975.79,-370"/>
<text xml:space="preserve" text-anchor="start" x="745.7" y="-312" font-family="Arial" font-size="20.00" fill="#f8fafc">ffmpeg streaming worker</text>
</g>
<!-- mediamtx -->
<g id="node7" class="node">
<title>mediamtx</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1312.68,-314 1107.06,-314 1107.06,-214 1312.68,-214 1312.68,-314"/>
<text xml:space="preserve" text-anchor="start" x="1117.07" y="-256" font-family="Arial" font-size="20.00" fill="#f8fafc">MediaMTX / HLS配信</text>
</g>
<!-- mirakurun_staging -->
<g id="node8" class="node">
<title>mirakurun_staging</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="975.22,-711 736.26,-711 736.26,-611 975.22,-611 975.22,-711"/>
<text xml:space="preserve" text-anchor="start" x="746.27" y="-653" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun Service / STG</text>
</g>
<!-- postgres_staging -->
<g id="node9" class="node">
<title>postgres_staging</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1299.87,-753.91C1299.87,-758.93 1259.53,-763 1209.87,-763 1160.21,-763 1119.87,-758.93 1119.87,-753.91 1119.87,-753.91 1119.87,-672.09 1119.87,-672.09 1119.87,-667.07 1160.21,-663 1209.87,-663 1259.53,-663 1299.87,-667.07 1299.87,-672.09 1299.87,-672.09 1299.87,-753.91 1299.87,-753.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1299.87,-753.91C1299.87,-748.9 1259.53,-744.82 1209.87,-744.82 1160.21,-744.82 1119.87,-748.9 1119.87,-753.91"/>
<text xml:space="preserve" text-anchor="start" x="1132.06" y="-705" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL STG</text>
</g>
<!-- nas02 -->
<g id="node10" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1700.94,-304.91C1700.94,-309.93 1640.15,-314 1565.31,-314 1490.47,-314 1429.68,-309.93 1429.68,-304.91 1429.68,-304.91 1429.68,-223.09 1429.68,-223.09 1429.68,-218.07 1490.47,-214 1565.31,-214 1640.15,-214 1700.94,-218.07 1700.94,-223.09 1700.94,-223.09 1700.94,-304.91 1700.94,-304.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1700.94,-304.91C1700.94,-299.9 1640.15,-295.82 1565.31,-295.82 1490.47,-295.82 1429.68,-299.9 1429.68,-304.91"/>
<text xml:space="preserve" text-anchor="start" x="1439.69" y="-256" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- gateway&#45;&gt;frontend -->
<g id="edge1" class="edge">
<title>gateway&#45;&gt;frontend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M229.19,-270.17C242.06,-256.99 255.73,-242.63 268,-229 281.05,-214.5 279.86,-206.15 296,-195.2 319.43,-179.31 347.57,-167.6 374.43,-159.06"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="374.96,-161.64 381.37,-156.94 373.43,-156.62 374.96,-161.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="296,-195.2 296,-218 330.79,-218 330.79,-195.2 296,-195.2"/>
<text xml:space="preserve" text-anchor="start" x="299" y="-201" font-family="Arial" font-size="14.00" fill="#bbfcd3">Web</text>
</g>
<!-- gateway&#45;&gt;backend -->
<g id="edge2" class="edge">
<title>gateway&#45;&gt;backend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M267.96,-320C293.35,-320 321.48,-320 348.57,-320"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="348.36,-322.63 355.86,-320 348.36,-317.38 348.36,-322.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="299.11,-320 299.11,-342.8 327.68,-342.8 327.68,-320 299.11,-320"/>
<text xml:space="preserve" text-anchor="start" x="302.11" y="-325.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">API</text>
</g>
<!-- gateway&#45;&gt;mediamtx -->
<g id="edge3" class="edge">
<title>gateway&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M267.61,-278C296.07,-266.56 328.17,-255.75 358.79,-250 619.7,-201 933.6,-227.76 1097.25,-248.02"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1096.55,-250.58 1104.32,-248.9 1097.21,-245.37 1096.55,-250.58"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="645.68,-223.32 645.68,-246.12 678.91,-246.12 678.91,-223.32 645.68,-223.32"/>
<text xml:space="preserve" text-anchor="start" x="648.68" y="-229.12" font-family="Arial" font-size="14.00" fill="#bbfcd3">HLS</text>
</g>
<!-- backend&#45;&gt;encode -->
<g id="edge4" class="edge">
<title>backend&#45;&gt;encode</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M588.82,-362C635.75,-379.3 690.08,-399.32 737.36,-416.74"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="736.24,-419.13 744.18,-419.26 738.05,-414.2 736.24,-419.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="624.66,-402.54 624.66,-425.34 699.93,-425.34 699.93,-402.54 624.66,-402.54"/>
<text xml:space="preserve" text-anchor="start" x="627.66" y="-408.34" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode制御</text>
</g>
<!-- backend&#45;&gt;streaming -->
<g id="edge5" class="edge">
<title>backend&#45;&gt;streaming</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M588.82,-320C631.91,-320 681.24,-320 725.62,-320"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="725.37,-322.63 732.87,-320 725.37,-317.38 725.37,-322.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="616.89,-320 616.89,-342.8 707.7,-342.8 707.7,-320 616.89,-320"/>
<text xml:space="preserve" text-anchor="start" x="619.89" y="-325.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">streaming制御</text>
</g>
<!-- backend&#45;&gt;mirakurun_staging -->
<g id="edge6" class="edge">
<title>backend&#45;&gt;mirakurun_staging</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M518.9,-369.53C568.79,-424.28 653.84,-513.62 735.7,-581 745.66,-589.2 756.46,-597.35 767.35,-605.15"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="765.58,-607.11 773.22,-609.29 768.61,-602.82 765.58,-607.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="630.11,-555.08 630.11,-577.88 694.48,-577.88 694.48,-555.08 630.11,-555.08"/>
<text xml:space="preserve" text-anchor="start" x="633.11" y="-560.88" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- backend&#45;&gt;postgres_staging -->
<g id="edge7" class="edge">
<title>backend&#45;&gt;postgres_staging</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M487.63,-369.83C514.76,-463.29 588.04,-661.71 735.7,-731 854.59,-786.8 1009.38,-765.94 1108.95,-742.37"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1109.39,-744.97 1116.06,-740.65 1108.16,-739.86 1109.39,-744.97"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="814.61,-766.54 814.61,-789.34 896.87,-789.34 896.87,-766.54 814.61,-766.54"/>
<text xml:space="preserve" text-anchor="start" x="817.61" y="-772.34" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- encode&#45;&gt;postgres_staging -->
<g id="edge8" class="edge">
<title>encode&#45;&gt;postgres_staging</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M964.56,-507.2C968.4,-509.42 972.15,-511.69 975.79,-514 1040.1,-554.88 1105.4,-612.3 1150.46,-654.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1148.64,-656.85 1155.88,-660.12 1152.26,-653.05 1148.64,-656.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1003.79,-589.21 1003.79,-612.01 1079.06,-612.01 1079.06,-589.21 1003.79,-589.21"/>
<text xml:space="preserve" text-anchor="start" x="1006.79" y="-595.01" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode状態</text>
</g>
<!-- streaming&#45;&gt;mediamtx -->
<g id="edge9" class="edge">
<title>streaming&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M975.65,-290.48C985.14,-288.55 994.61,-286.75 1003.79,-285.2 1033.83,-280.11 1066.57,-276.07 1096.89,-272.93"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1096.87,-275.57 1104.06,-272.2 1096.34,-270.35 1096.87,-275.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1026.76,-285.2 1026.76,-308 1056.09,-308 1056.09,-285.2 1026.76,-285.2"/>
<text xml:space="preserve" text-anchor="start" x="1029.76" y="-291" font-family="Arial" font-size="14.00" fill="#bbfcd3">配信</text>
</g>
<!-- mediamtx&#45;&gt;nas02 -->
<g id="edge10" class="edge">
<title>mediamtx&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1352.68,-264C1374.28,-264 1396.6,-264 1418.29,-264"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1418.22,-266.63 1425.72,-264 1418.22,-261.38 1418.22,-266.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1146.47,-224.4 1146.47,-264 1390.6,-264 1390.6,-224.4 1146.47,-224.4"/>
<text xml:space="preserve" text-anchor="start" x="1149.47" y="-247" font-family="Arial" font-size="14.00" fill="#bbfcd3">recorded&#45;staging・tnlastation&#45;staging /</text>
<text xml:space="preserve" text-anchor="start" x="1149.47" y="-230.2" font-family="Arial" font-size="14.00" fill="#bbfcd3">NFS</text>
</g>
</g>
</svg>
`;default:throw Error(`Unknown viewId: `+e)}};export{e as dotSource,t as svgSource};