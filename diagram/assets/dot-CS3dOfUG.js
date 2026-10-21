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
    likec4_id = "homeSite.pve.controlplanes.cp1";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">コントロールプレーン01 / VM13001 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "worker1" [
    likec4_id = "homeSite.pve.workers.worker1";
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
    likec4_id = "homeSite.pve.controlplanes.cp2";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">コントロールプレーン02 / VM13002 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "cp3" [
    likec4_id = "homeSite.pve.controlplanes.cp3";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">コントロールプレーン03 / VM13003 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "worker2" [
    likec4_id = "homeSite.pve.workers.worker2";
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
    likec4_id = "homeSite.pve.storage.nas1";
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
    likec4_id = "homeSite.pve.storage.nas2";
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
    likec4_id = "homeSite.pve.storage.pbs";
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
  "workers" [
    likec4_id = "homeSite.workers";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Raspberry Pi / home-k8s worker03・04 /<BR/>VLAN10</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Talos Linux（arm64）/ 2台</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
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
    "workers";
    subgraph "cluster_pve" {
      likec4_id = "homeSite.pve";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#194b9e";
      color = "#1b3d88";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>;
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
  }
  "network" -> "workers" [
    likec4_id = "r8ocp3";
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
  "workers" -> "idrive" [
    likec4_id = "1g32zb5";
    style = "dashed";
    ltail = "cluster_homesite";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">バックアップ</FONT></TD></TR></TABLE>>;
    color = "#b45309";
    fontcolor = "#FFE0C2";
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
    subgraph cluster_pve {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.pve",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        nas02 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
            likec4_id="premises.pve.nas02",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
        kiosk [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">MagicMirror表示 / VM5000</FONT>>,
            likec4_id="premises.pve.kiosk",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_home {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S（TALOS LINUX）</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.home",
            likec4_level=0,
            margin=40,
            style=filled
        ];
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
            loockit [height=1.389,
                label=<<FONT POINT-SIZE="20">Loockit / BLEスマートロック</FONT>>,
                likec4_id="premises.home.loockit",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
            coupon_manager [height=1.389,
                label=<<FONT POINT-SIZE="20">Coupon Manager</FONT>>,
                likec4_id="premises.home.coupon_manager",
                likec4_level=1,
                margin="0.139,0.139",
                width=2.5];
        }
        {
            graph [rank=same];
            wol [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Wake-on-LAN</FONT>>,
                likec4_id="premises.home.wol",
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
        eso -> recording [style=invis];
        recording -> wol [minlen=1,
            style=invis];
        magic_mirror [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">MagicMirror / ダッシュボード</FONT>>,
            likec4_id="premises.home.magic_mirror",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        annict_scraper [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Annict scraper / 番組照合</FONT>>,
            likec4_id="premises.home.annict_scraper",
            likec4_level=1,
            margin="0.139,0.139",
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
    "edge" -> platform [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_home,
        likec4_id=yr0r25,
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証済みHTTP / Access・mTLS → 内部Service</FONT></TD></TR></TABLE>>];
    agent -> management [style=invis];
    management -> dns [style=invis];
    dns -> nextcloud [style=invis];
    loockit -> coupon_manager [style=invis];
    coupon_manager -> databases [style=invis];
    nas02 -> platform [arrowhead=normal,
        lhead=cluster_home,
        likec4_id=u5t59y,
        minlen=1,
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">アプリ・DB・監視のNFS</FONT></TD></TR></TABLE>>];
    kiosk -> magic_mirror [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">表示</FONT></TD></TR></TABLE>>,
        likec4_id="1dmzal0",
        style=dashed,
        weight=3];
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
        likec4_id=an6idn,
        style=dashed,
        weight=4];
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
            label=<<FONT POINT-SIZE="20">Proxmox VEクラスタ（2ノード構成）</FONT>>,
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
        style=dashed,
        weight=3];
    access -> tunnel [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後の転送</FONT></TD></TR></TABLE>>,
        likec4_id="163m3wm",
        style=solid,
        weight=4];
    tunnel -> protected [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">hostname転送</FONT></TD></TR></TABLE>>,
        likec4_id=ozucx8,
        style=dashed,
        weight=6];
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
    exceptions -> pve [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">独立LXC proxy / ready leader</FONT></TD></TR></TABLE>>,
        likec4_id=ufnten,
        minlen=1,
        style=dashed];
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
            label=<<FONT POINT-SIZE="20">Proxmox VEクラスタ（2ノード構成）</FONT>>,
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
  "lb1" [
    likec4_id = "homeSite.pve.loadbalancers.lb1";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">HAProxy / Keepalived VM10001 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "lb2" [
    likec4_id = "homeSite.pve.loadbalancers.lb2";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">HAProxy / Keepalived VM10002 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "nas1" [
    likec4_id = "homeSite.pve.storage.nas1";
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
    likec4_id = "homeSite.pve.storage.nas2";
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
    likec4_id = "homeSite.pve.storage.pbs";
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
  "dev" [
    likec4_id = "homeSite.pve.development.dev";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">開発用Docker / VM40000 / VLAN20</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "windows" [
    likec4_id = "homeSite.pve.desktop.windows";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">Windows / VM60000 / VLAN30</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "kiosk" [
    likec4_id = "homeSite.pve.display.kiosk";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">MagicMirror表示 / VM5000 /</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "talos" [
    likec4_id = "homeSite.pve.controlplanes.cp1.talos";
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
    likec4_id = "homeSite.pve.controlplanes.cp2.talos";
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
    likec4_id = "homeSite.pve.controlplanes.cp3.talos";
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
    likec4_id = "homeSite.pve.workers.worker1.talos";
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
    likec4_id = "homeSite.pve.workers.worker2.talos";
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
    likec4_id = "homeSite.pve.smartlocks.loockit1.app";
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
    likec4_id = "homeSite.pve.smartlocks.loockit2.app";
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
    likec4_id = "homeSite.pve.tuners.tuner_prod.app";
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
    likec4_id = "homeSite.pve.tuners.tuner_stg.app";
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
    likec4_id = "homeSite.pve.network_management.unifi.app";
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
    label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>;
    subgraph "cluster_controlplanes" {
      likec4_id = "homeSite.pve.controlplanes";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#1a468d";
      color = "#1c3979";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S コントロールプレーン</B></FONT>>;
      subgraph "cluster_cp1" {
        likec4_id = "homeSite.pve.controlplanes.cp1";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>コントロールプレーン01 / VM13001 / VLAN20</B></FONT>>;
        "talos";
      }
      subgraph "cluster_cp2" {
        likec4_id = "homeSite.pve.controlplanes.cp2";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>コントロールプレーン02 / VM13002 / VLAN20</B></FONT>>;
        "talos_1";
      }
      subgraph "cluster_cp3" {
        likec4_id = "homeSite.pve.controlplanes.cp3";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>コントロールプレーン03 / VM13003 / VLAN20</B></FONT>>;
        "talos_2";
      }
    }
    subgraph "cluster_workers" {
      likec4_id = "homeSite.pve.workers";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#1a468d";
      color = "#1c3979";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>HOME-K8S ワーカー</B></FONT>>;
      subgraph "cluster_worker1" {
        likec4_id = "homeSite.pve.workers.worker1";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>HOME-K8S WORKER01 / VM13004 / VLAN20</B></FONT>>;
        "talos_3";
      }
      subgraph "cluster_worker2" {
        likec4_id = "homeSite.pve.workers.worker2";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>HOME-K8S WORKER02 / VM13005 / VLAN20</B></FONT>>;
        "talos_4";
      }
    }
    subgraph "cluster_loadbalancers" {
      likec4_id = "homeSite.pve.loadbalancers";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#194b9e";
      color = "#1b3d88";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>ロードバランサー</B></FONT>>;
      "lb1";
      "lb2";
    }
    subgraph "cluster_storage" {
      likec4_id = "homeSite.pve.storage";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#194b9e";
      color = "#1b3d88";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>ストレージ・バックアップ</B></FONT>>;
      "nas1";
      "nas2";
      "pbs";
    }
    subgraph "cluster_smartlocks" {
      likec4_id = "homeSite.pve.smartlocks";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#1a468d";
      color = "#1c3979";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>LOOCKIT / BLUETOOTH制御</B></FONT>>;
      subgraph "cluster_loockit1" {
        likec4_id = "homeSite.pve.smartlocks.loockit1";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>LOOCKIT 01 / CT12902 / VLAN20</B></FONT>>;
        "app";
      }
      subgraph "cluster_loockit2" {
        likec4_id = "homeSite.pve.smartlocks.loockit2";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>LOOCKIT 02 / CT12903 / VLAN20</B></FONT>>;
        "app_1";
      }
    }
    subgraph "cluster_tuners" {
      likec4_id = "homeSite.pve.tuners";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#1a468d";
      color = "#1c3979";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>MIRAKURUN / チューナー</B></FONT>>;
      subgraph "cluster_tuner_prod" {
        likec4_id = "homeSite.pve.tuners.tuner_prod";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>MIRAKURUN本番 / CT12901・PT3 / VLAN20</B></FONT>>;
        "app_2";
      }
      subgraph "cluster_tuner_stg" {
        likec4_id = "homeSite.pve.tuners.tuner_stg";
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
    subgraph "cluster_network_management" {
      likec4_id = "homeSite.pve.network_management";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#1a468d";
      color = "#1c3979";
      style = "filled";
      margin = 32;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>ネットワーク管理</B></FONT>>;
      subgraph "cluster_unifi" {
        likec4_id = "homeSite.pve.network_management.unifi";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>UNIFI OS VM13201 / NATIVE1</B></FONT>>;
        "app_4";
      }
    }
    subgraph "cluster_development" {
      likec4_id = "homeSite.pve.development";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#194b9e";
      color = "#1b3d88";
      style = "filled";
      margin = 32;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>開発環境</B></FONT>>;
      "dev";
    }
    subgraph "cluster_desktop" {
      likec4_id = "homeSite.pve.desktop";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#194b9e";
      color = "#1b3d88";
      style = "filled";
      margin = 32;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>デスクトップ</B></FONT>>;
      "windows";
    }
    subgraph "cluster_display" {
      likec4_id = "homeSite.pve.display";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#194b9e";
      color = "#1b3d88";
      style = "filled";
      margin = 32;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>表示端末</B></FONT>>;
      "kiosk";
    }
  }
  subgraph {
    rank = "same";
    "lb1";
    "lb2";
  }
  subgraph {
    rank = "same";
    "talos";
    "talos_1";
    "talos_2";
  }
  subgraph {
    rank = "same";
    "talos_3";
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
        subgraph cluster_pve {
            graph [color="#1e3524",
                fillcolor="#2c4e32",
                label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.pve",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            unifi [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">UniFi OS / VM13201</FONT>>,
                likec4_id="premises.pve.unifi",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
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
        style=dashed];
    router -> ethernet [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GigaEthernet2 / native1 +<BR/>tag10,20,30,31,40</FONT></TD></TR></TABLE>>,
        likec4_id="29g374",
        style=dotted,
        weight=5];
    ethernet -> unifi [arrowhead=normal,
        lhead=cluster_pve,
        likec4_id=rj0gew,
        style=dotted,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1 / tag20・30・40</FONT></TD></TR></TABLE>>];
    ethernet -> switch [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">802.1Q / uplink</FONT></TD></TR></TABLE>>,
        likec4_id="1qjazex",
        style=dotted,
        weight=4];
    ethernet -> ap [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">AP trunk</FONT></TD></TR></TABLE>>,
        likec4_id=t2w7re,
        minlen=1,
        style=dotted,
        weight=3];
}
`;case`vlans`:return`digraph {
  likec4_viewId = "vlans";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "TB";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 0.556;
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
  "pve" [
    likec4_id = "homeSite.lan.native.pve";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">UniFi OS</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">ネットワーク管理</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "pve_management" [
    likec4_id = "homeSite.lan.native.pve_management";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Proxmox VE / 2ノード管理</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">192.168.0.115 / 192.168.0.119</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "switch" [
    likec4_id = "homeSite.lan.native.switch";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">US-8-60W / 管理IP</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">192.168.0.252</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "ap" [
    likec4_id = "homeSite.lan.native.ap";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">FS AP / 管理IP</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">192.168.0.253</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "rpi_workers" [
    likec4_id = "homeSite.lan.management.rpi_workers";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Raspberry Pi / worker03・04</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">192.168.10.107 / 192.168.10.109</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "nut" [
    likec4_id = "homeSite.lan.management.nut";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">NUT Pi / UPS監視</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">192.168.10.112 / 192.168.10.113</FONT></TD></TR></TABLE>>;
    margin = "0.139,0.139";
    width = 3.334;
    height = 1.875;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "kvm" [
    likec4_id = "homeSite.lan.management.kvm";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">NanoKVM ×2</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">192.168.10.240 / 192.168.10.241</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "management_clients" [
    likec4_id = "homeSite.lan.management.management_clients";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">管理端末 / NUCBox・NIC</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">192.168.10.117 / 192.168.10.118 /<BR/>192.168.10.140</FONT></TD></TR></TABLE>>;
    margin = "0.139,0.139";
    width = 3.334;
    height = 1.875;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "pve_1" [
    likec4_id = "homeSite.lan.server.pve";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Proxmox / サーバ基盤</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">home-k8s・LB・NAS・PBS<BR/>Loockit・Mirakurun・開発</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "service_ips" [
    likec4_id = "homeSite.lan.server.service_ips";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">MetalLB / Service IP</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">192.168.20.200-192.168.20.226</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "vips" [
    likec4_id = "homeSite.lan.server.vips";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">API・ロードバランサー VIP</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">Kubernetes API: 192.168.20.228<BR/>HAProxy: 192.168.20.227</FONT></TD></TR></TABLE>>;
    margin = "0.139,0.139";
    width = 3.334;
    height = 1.875;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "pve_2" [
    likec4_id = "homeSite.lan.client.pve";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Windows / 作業環境</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">デスクトップ</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "physical_clients" [
    likec4_id = "homeSite.lan.client.physical_clients";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">PC・クライアント端末</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">192.168.30.210 / 192.168.30.222 /<BR/>192.168.30.223 / 192.168.30.224</FONT></TD></TR></TABLE>>;
    margin = "0.139,0.139";
    width = 3.334;
    height = 1.875;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "wol" [
    likec4_id = "homeSite.lan.client.wol";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">WoL relay / Raspberry Pi</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">192.168.30.250</FONT></TD></TR></TABLE>>;
    margin = "0.139,0.139";
    width = 3.334;
    height = 1.875;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "clients" [
    likec4_id = "homeSite.lan.guest.clients";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">来客端末 / DHCP</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">他VLANへの横断を拒否</FONT></TD></TR></TABLE>>;
    margin = "0.139,0.139";
    width = 3.334;
    height = 1.875;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "pve_3" [
    likec4_id = "homeSite.lan.iot.pve";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">MagicMirror / 表示端末</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">表示端末</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "av" [
    likec4_id = "homeSite.lan.iot.av";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">TV・ゲーム機</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">192.168.40.111 / 192.168.40.120 /<BR/>192.168.40.121 / 192.168.40.141</FONT></TD></TR></TABLE>>;
    margin = "0.139,0.139";
    width = 3.334;
    height = 1.875;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "smart_home" [
    likec4_id = "homeSite.lan.iot.smart_home";
    likec4_level = 3;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">スマートホーム</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">照明・リモコン・カメラ<BR/>SESAME・プラグ・センサー</FONT></TD></TR></TABLE>>;
    margin = "0.139,0.139";
    width = 3.334;
    height = 1.875;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "ix2215" [
    likec4_id = "homeSite.ix2215";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">IX2215 / ルーター・VLAN間ACL</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">GigaEthernet2:<BR/>native1、tagged10/20/30/31/40。guestの他VLAN横断は拒否。IoTのIF名はGigaEthernet2.4/BVI4だがタグは40。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "warp" [
    likec4_id = "providers.warp";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Cloudflare WARP</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">Cloudflare One Clientからprivate<BR/>CIDRへ。公開hostnameのTunnel/Accessとは別。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  subgraph "cluster_homesite" {
    likec4_id = "homeSite";
    likec4_level = 0;
    likec4_depth = 3;
    fillcolor = "#393939";
    color = "#292929";
    style = "filled";
    margin = 50;
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>自宅</B></FONT>>;
    "ix2215";
    subgraph "cluster_lan" {
      likec4_id = "homeSite.lan";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#1a468d";
      color = "#1c3979";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>VLANセグメント</B></FONT>>;
      subgraph "cluster_native" {
        likec4_id = "homeSite.lan.native";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#194b9e";
        color = "#1b3d88";
        style = "filled";
        margin = 50;
        label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>NATIVE1 / 192.168.0.0/24</B></FONT>>;
        "pve";
        "pve_management";
        "switch";
        "ap";
      }
      subgraph "cluster_management" {
        likec4_id = "homeSite.lan.management";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#194b9e";
        color = "#1b3d88";
        style = "filled";
        margin = 50;
        label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>VLAN10 / 192.168.10.0/24</B></FONT>>;
        "rpi_workers";
        "nut";
        "kvm";
        "management_clients";
      }
      subgraph "cluster_server" {
        likec4_id = "homeSite.lan.server";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#194b9e";
        color = "#1b3d88";
        style = "filled";
        margin = 50;
        label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>VLAN20 / 192.168.20.0/24</B></FONT>>;
        "pve_1";
        "service_ips";
        "vips";
      }
      subgraph "cluster_client" {
        likec4_id = "homeSite.lan.client";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#194b9e";
        color = "#1b3d88";
        style = "filled";
        margin = 50;
        label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>VLAN30 / 192.168.30.0/24</B></FONT>>;
        "pve_2";
        "physical_clients";
        "wol";
      }
      subgraph "cluster_guest" {
        likec4_id = "homeSite.lan.guest";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#194b9e";
        color = "#1b3d88";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>VLAN31 / 192.168.31.0/24</B></FONT>>;
        "clients";
      }
      subgraph "cluster_iot" {
        likec4_id = "homeSite.lan.iot";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#194b9e";
        color = "#1b3d88";
        style = "filled";
        margin = 50;
        label = <<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>VLAN40 / 192.168.40.0/24</B></FONT>>;
        "pve_3";
        "av";
        "smart_home";
      }
    }
  }
  subgraph "cluster_providers" {
    likec4_id = "providers";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#454545";
    color = "#313131";
    style = "filled";
    margin = 32;
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>外部サービス</B></FONT>>;
    "warp";
  }
  subgraph {
    rank = "same";
    "pve";
    "pve_management";
    "pve_1";
    "pve_2";
    "pve_3";
  }
  "ix2215" -> "pve_1" [
    likec4_id = "mx7hoh";
    style = "dotted";
    lhead = "cluster_server";
    weight = 3;
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "ix2215" -> "pve" [
    likec4_id = "fz7yit";
    style = "dotted";
    lhead = "cluster_native";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native IF</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "ix2215" -> "pve_2" [
    likec4_id = "cv09st";
    style = "dotted";
    lhead = "cluster_client";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI30</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "ix2215" -> "pve_3" [
    likec4_id = "6c0192";
    style = "dotted";
    lhead = "cluster_iot";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI4 / tag40</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "ix2215" -> "rpi_workers" [
    likec4_id = "1ut1wfr";
    style = "dotted";
    lhead = "cluster_management";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI10</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "ix2215" -> "clients" [
    likec4_id = "6rv9is";
    style = "dotted";
    lhead = "cluster_guest";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI31</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "warp" -> "pve_1" [
    likec4_id = "13e5hkm";
    style = "dotted";
    lhead = "cluster_server";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">WARP / private CIDR routes・policy</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
}`;case`platform`:return`digraph {
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
    subgraph cluster_pve {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.pve",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        loockit_a [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.pve",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Loockit 01 / CT12902</FONT>>,
            likec4_id="premises.pve.loockit_a",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        loockit_b [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.pve",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Loockit 02 / CT12903</FONT>>,
            likec4_id="premises.pve.loockit_b",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        bluez [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.pve",
            height=1.389,
            label=<<FONT POINT-SIZE="20">BlueZ / Bluetooth（2ノード）</FONT>>,
            likec4_id="premises.pve.bluez",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
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
        minlen=0,
        style=dashed,
        weight=3];
    tunnel [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
        likec4_id="external.edge.tunnel",
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
    tunnel -> api [style=invis];
    proxy [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">互換HAProxy / :8080・:50051</FONT>>,
        likec4_id="premises.home.loockit.proxy",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    proxy -> loockit_a [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">readyz / leaderのみ</FONT></TD></TR></TABLE>>,
        likec4_id="176ivh6",
        style=dashed];
    proxy -> loockit_b [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">readyz / leaderのみ</FONT></TD></TR></TABLE>>,
        likec4_id="176ivh5",
        style=dashed];
    loockit_a -> bluez [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">pve-x570 / read-only D-Bus</FONT></TD></TR></TABLE>>,
        likec4_id=iicjgp,
        style=dashed,
        weight=4];
    loockit_b -> bluez [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">pve-b550m / read-only D-Bus</FONT></TD></TR></TABLE>>,
        likec4_id="1ps4mne",
        style=dashed,
        weight=4];
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
                height=1.389,
                label=<<FONT POINT-SIZE="20">EPGStation</FONT>>,
                likec4_id="premises.home.recording.epgstation",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tnlastation [height=1.389,
                label=<<FONT POINT-SIZE="20">TNLaStation PRD</FONT>>,
                likec4_id="premises.home.recording.tnlastation",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tnlastation_staging [height=1.389,
                label=<<FONT POINT-SIZE="20">TNLaStation STG</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
    }
    subgraph cluster_pve {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.pve",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        tuner_stg [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun STG / LXC12904</FONT>>,
            likec4_id="premises.pve.tuner_stg",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        tuner_prod [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun PRD / LXC12901</FONT>>,
            likec4_id="premises.pve.tuner_prod",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    epgstation -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Service名で接続 / PRD :40772</FONT></TD></TR></TABLE>>,
        likec4_id=kfwk77,
        minlen=1,
        style=dashed];
    tnlastation -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Service名で接続 / PRD :40772</FONT></TD></TR></TABLE>>,
        likec4_id="1kmwao6",
        minlen=1,
        style=dashed];
    tnlastation_staging -> tuner_stg [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Service名で接続 / STG :40772</FONT></TD></TR></TABLE>>,
        likec4_id="1v2uymp",
        minlen=1,
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
    subgraph cluster_pve {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.pve",
            likec4_level=0,
            margin=32,
            style=filled
        ];
        nas02 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
            likec4_id="premises.pve.nas02",
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
        subgraph cluster_pve {
            graph [color="#1e3524",
                fillcolor="#2c4e32",
                label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.pve",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            backup_sources [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">VMバックアップ対象 / 2ノード</FONT>>,
                likec4_id="premises.pve.backup_sources",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            nas02 [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
                likec4_id="premises.pve.nas02",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
            pbs [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">PBS / VM14001</FONT>>,
                likec4_id="premises.pve.pbs",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
        }
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
                nas [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group=premises,
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">NAS restic / home-k8s CronJob</FONT>>,
                    likec4_id="premises.home.backups.nas",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                recordings [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">録画 / home-k8s CronJob</FONT>>,
                    likec4_id="premises.home.backups.recordings",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                db [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">DB logical dump / home-k8s</FONT>>,
                    likec4_id="premises.home.backups.db",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                metrics [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.home",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">metrics snapshot / home-k8s</FONT>>,
                    likec4_id="premises.home.backups.metrics",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
            }
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
            databases [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home",
                height=1.389,
                label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
                likec4_id="premises.home.databases",
                likec4_level=2,
                margin="0.139,0.139",
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
    backup_sources -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup / 2ノード</FONT></TD></TR></TABLE>>,
        likec4_id="1glpe6s",
        minlen=0,
        style=dashed,
        weight=4];
    nas02 -> nas [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">対象dataset / restic</FONT></TD></TR></TABLE>>,
        likec4_id="57bcif",
        style=dashed,
        weight=4];
    local_store -> metrics [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">snapshot / vmbackup</FONT></TD></TR></TABLE>>,
        likec4_id="10vd0fo",
        minlen=1,
        style=dashed,
        weight=3];
    pbs -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">S3 datastore / VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="1huvye0",
        style=dashed];
    recording -> recordings [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画ファイル専用job</FONT></TD></TR></TABLE>>,
        likec4_id=cd7hvu,
        style=dashed,
        weight=2];
    databases -> db [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">整合性あるlogical dump</FONT></TD></TR></TABLE>>,
        likec4_id="1xl7x3d",
        style=dashed,
        weight=2];
    metrics -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id="1pdf96w",
        ltail=cluster_backups,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">用途別prefix / 暗号化・retention</FONT></TD></TR></TABLE>>];
}
`;case`nfs`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=nfs,
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
                height=1.389,
                label=<<FONT POINT-SIZE="20">EPGStation</FONT>>,
                likec4_id="premises.home.recording.epgstation",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tnlastation [height=1.389,
                label=<<FONT POINT-SIZE="20">TNLaStation PRD</FONT>>,
                likec4_id="premises.home.recording.tnlastation",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tnlastation_staging [height=1.389,
                label=<<FONT POINT-SIZE="20">TNLaStation STG</FONT>>,
                likec4_id="premises.home.recording.tnlastation_staging",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        shared [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">共有PV / runner cache・状態</FONT>>,
            likec4_id="premises.home.shared",
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
        databases [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
            likec4_id="premises.home.databases",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        local_store [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">VictoriaMetrics / 自宅</FONT>>,
            likec4_id="premises.home.agent.local_store",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
        coupon_manager [height=1.389,
            label=<<FONT POINT-SIZE="20">Coupon Manager</FONT>>,
            likec4_id="premises.home.coupon_manager",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_pve {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.pve",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        nas01 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">nas-01 / TrueNAS VM69001</FONT>>,
            likec4_id="premises.pve.nas01",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
        nas02 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
            likec4_id="premises.pve.nas02",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    shared -> nas01 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">runner cache / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="2sct8y",
        style=dashed,
        weight=3];
    nextcloud -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id=ksuxfy,
        minlen=1,
        style=dashed,
        weight=2];
    databases -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id="15s5gge",
        minlen=1,
        style=dashed,
        weight=2];
    local_store -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id=ploa02,
        minlen=1,
        style=dashed];
    coupon_manager -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">images・Data Protection keys / PVC</FONT></TD></TR></TABLE>>,
        likec4_id=nfyfrw,
        minlen=1,
        style=dashed,
        weight=2];
    epgstation -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">recorded・thumbnail・drop / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="19ree7n",
        minlen=1,
        style=dashed];
    tnlastation -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">recorded・tnlastation / NFS</FONT></TD></TR></TABLE>>,
        likec4_id=dcutp2,
        minlen=1,
        style=dashed];
    tnlastation_staging -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">recorded-staging・tnlastation-staging /<BR/>NFS</FONT></TD></TR></TABLE>>,
        likec4_id="4iskx4",
        minlen=1,
        style=dashed];
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
    pve [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Proxmox VEクラスタ（2ノード構成）</FONT>>,
        likec4_id="premises.pve",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    ups_a -> pve [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">pve-x570へ給電</FONT></TD></TR></TABLE>>,
        likec4_id=ci8eh,
        style=solid];
    ups_a -> pi_a [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">USB / ups-a</FONT></TD></TR></TABLE>>,
        likec4_id="1m1irtx",
        style=dotted,
        weight=3];
    ups_a -> pi_b [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Pi 02へ給電</FONT></TD></TR></TABLE>>,
        likec4_id="1m1irty",
        style=solid,
        weight=3];
    ups_b -> pve [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">pve-b550mへ給電</FONT></TD></TR></TABLE>>,
        likec4_id="1usxv1m",
        style=solid];
    ups_b -> network [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NW機器へ給電</FONT></TD></TR></TABLE>>,
        likec4_id=irlqrr,
        minlen=1,
        style=solid,
        weight=2];
    ups_b -> pi_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Pi 01へ給電</FONT></TD></TR></TABLE>>,
        likec4_id="1j2zwm",
        style=solid,
        weight=3];
    ups_b -> pi_b [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">USB / ups-b</FONT></TD></TR></TABLE>>,
        likec4_id="1j2zwl",
        style=dotted,
        weight=3];
    pve -> pi_a [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">pve-x570 / 残量80%で停止</FONT></TD></TR></TABLE>>,
        likec4_id="1rm8gw6",
        style=dashed];
    pve -> pi_b [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">pve-b550m / 残量80%で停止</FONT></TD></TR></TABLE>>,
        likec4_id="1rm8gw5",
        style=dashed];
    mains -> ups_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">AC入力</FONT></TD></TR></TABLE>>,
        likec4_id=ue5q7u,
        style=solid,
        weight=3];
    mains -> surge_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">非バックアップ出力</FONT></TD></TR></TABLE>>,
        likec4_id=lwrhh6,
        style=solid];
    surge_a -> ups_b [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">UPS BのAC入力</FONT></TD></TR></TABLE>>,
        likec4_id=db3f0p,
        style=solid,
        weight=3];
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
    subgraph cluster_pve {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.pve",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        nas02 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
            likec4_id="premises.pve.nas02",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
        tuner_prod [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun PRD / LXC12901</FONT>>,
            likec4_id="premises.pve.tuner_prod",
            likec4_level=1,
            margin="0.139,0.139",
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
        weight=5];
    gateway -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HLS</FONT></TD></TR></TABLE>>,
        likec4_id="9nm3vb",
        style=dashed];
    backend -> encode [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode制御</FONT></TD></TR></TABLE>>,
        likec4_id="1nmvcfc",
        style=dashed,
        weight=5];
    backend -> streaming [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">streaming制御</FONT></TD></TR></TABLE>>,
        likec4_id="1tqocwi",
        style=dashed,
        weight=5];
    backend -> postgres [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="12fvb9p",
        style=dashed,
        weight=2];
    backend -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Service名で接続 / PRD :40772</FONT></TD></TR></TABLE>>,
        likec4_id=dc4p1o,
        minlen=1,
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
    subgraph cluster_pve {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PROXMOX VEクラスタ（2ノード構成）</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.pve",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        nas02 [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">nas-02 / TrueNAS VM69002</FONT>>,
            likec4_id="premises.pve.nas02",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
        tuner_stg [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun STG / LXC12904</FONT>>,
            likec4_id="premises.pve.tuner_stg",
            likec4_level=1,
            margin="0.139,0.139",
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
        weight=5];
    gateway -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HLS</FONT></TD></TR></TABLE>>,
        likec4_id=c4i5nb,
        style=dashed];
    backend -> encode [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode制御</FONT></TD></TR></TABLE>>,
        likec4_id=r6x27c,
        style=dashed,
        weight=5];
    backend -> streaming [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">streaming制御</FONT></TD></TR></TABLE>>,
        likec4_id="1ducx3m",
        style=dashed,
        weight=5];
    backend -> postgres_staging [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id=s3iggd,
        style=dashed,
        weight=2];
    backend -> tuner_stg [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Service名で接続 / STG :40772</FONT></TD></TR></TABLE>>,
        likec4_id="1ozkziz",
        minlen=1,
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
<svg width="1677pt" height="1732pt"
 viewBox="0.00 0.00 1677.00 1732.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1717.05)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#3f3f3f" stroke="#2d2d2d" points="8,-8 8,-1160 1084.92,-1160 1084.92,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1147.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_pve</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="77.77,-58 77.77,-859 1034.92,-859 1034.92,-58 77.77,-58"/>
<text xml:space="preserve" text-anchor="start" x="85.77" y="-846.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_providers</title>
<polygon fill="#454545" stroke="#313131" points="8.83,-1168 8.83,-1694 1639.13,-1694 1639.13,-1168 8.83,-1168"/>
<text xml:space="preserve" text-anchor="start" x="16.83" y="-1681.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">外部サービス</text>
</g>
<!-- cp1 -->
<g id="node1" class="node">
<title>cp1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="984.92,-498 662.56,-498 662.56,-398 984.92,-398 984.92,-498"/>
<text xml:space="preserve" text-anchor="start" x="672.56" y="-440" font-family="Arial" font-size="20.00" fill="#f8fafc">コントロールプレーン01 / VM13001 /</text>
</g>
<!-- worker1 -->
<g id="node2" class="node">
<title>worker1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="436.81,-208 127.77,-208 127.77,-108 436.81,-108 436.81,-208"/>
<text xml:space="preserve" text-anchor="start" x="137.78" y="-150" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s worker01 / VM13004 /</text>
</g>
<!-- cp2 -->
<g id="node3" class="node">
<title>cp2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="984.92,-643 662.56,-643 662.56,-543 984.92,-543 984.92,-643"/>
<text xml:space="preserve" text-anchor="start" x="672.56" y="-585" font-family="Arial" font-size="20.00" fill="#f8fafc">コントロールプレーン02 / VM13002 /</text>
</g>
<!-- cp3 -->
<g id="node4" class="node">
<title>cp3</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="984.92,-788 662.56,-788 662.56,-688 984.92,-688 984.92,-788"/>
<text xml:space="preserve" text-anchor="start" x="672.56" y="-730" font-family="Arial" font-size="20.00" fill="#f8fafc">コントロールプレーン03 / VM13003 /</text>
</g>
<!-- worker2 -->
<g id="node5" class="node">
<title>worker2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="436.81,-353 127.77,-353 127.77,-253 436.81,-253 436.81,-353"/>
<text xml:space="preserve" text-anchor="start" x="137.78" y="-295" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s worker02 / VM13005 /</text>
</g>
<!-- nas1 -->
<g id="node6" class="node">
<title>nas1</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M423.47,-488.91C423.47,-493.93 360.19,-498 282.29,-498 204.38,-498 141.1,-493.93 141.1,-488.91 141.1,-488.91 141.1,-407.09 141.1,-407.09 141.1,-402.07 204.38,-398 282.29,-398 360.19,-398 423.47,-402.07 423.47,-407.09 423.47,-407.09 423.47,-488.91 423.47,-488.91"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M423.47,-488.91C423.47,-483.9 360.19,-479.82 282.29,-479.82 204.38,-479.82 141.1,-483.9 141.1,-488.91"/>
<text xml:space="preserve" text-anchor="start" x="151.11" y="-440" font-family="Arial" font-size="20.00" fill="#f8fafc">nas&#45;01 / TrueNAS VM69001 /</text>
</g>
<!-- nas2 -->
<g id="node7" class="node">
<title>nas2</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M423.47,-633.91C423.47,-638.93 360.19,-643 282.29,-643 204.38,-643 141.1,-638.93 141.1,-633.91 141.1,-633.91 141.1,-552.09 141.1,-552.09 141.1,-547.07 204.38,-543 282.29,-543 360.19,-543 423.47,-547.07 423.47,-552.09 423.47,-552.09 423.47,-633.91 423.47,-633.91"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M423.47,-633.91C423.47,-628.9 360.19,-624.82 282.29,-624.82 204.38,-624.82 141.1,-628.9 141.1,-633.91"/>
<text xml:space="preserve" text-anchor="start" x="151.11" y="-585" font-family="Arial" font-size="20.00" fill="#f8fafc">nas&#45;02 / TrueNAS VM69002 /</text>
</g>
<!-- pbs -->
<g id="node8" class="node">
<title>pbs</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M403.47,-778.91C403.47,-783.93 349.16,-788 282.29,-788 215.42,-788 161.1,-783.93 161.1,-778.91 161.1,-778.91 161.1,-697.09 161.1,-697.09 161.1,-692.07 215.42,-688 282.29,-688 349.16,-688 403.47,-692.07 403.47,-697.09 403.47,-697.09 403.47,-778.91 403.47,-778.91"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M403.47,-778.91C403.47,-773.9 349.16,-769.82 282.29,-769.82 215.42,-769.82 161.1,-773.9 161.1,-778.91"/>
<text xml:space="preserve" text-anchor="start" x="171.11" y="-730" font-family="Arial" font-size="20.00" fill="#f8fafc">PBS VM14001 / VLAN20</text>
</g>
<!-- cloudflare -->
<g id="node9" class="node">
<title>cloudflare</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="505.74,-1623 58.83,-1623 58.83,-1443 505.74,-1443 505.74,-1623"/>
<text xml:space="preserve" text-anchor="start" x="236.71" y="-1545" font-family="Arial" font-size="20.00" fill="#eff6ff">Cloudflare</text>
<text xml:space="preserve" text-anchor="start" x="78.89" y="-1522" font-family="Arial" font-size="15.00" fill="#bfdbfe">Cloudflare Accessで認証し、Tunnelで自宅サービスへ転送。mTLS</text>
<text xml:space="preserve" text-anchor="start" x="216.44" y="-1504" font-family="Arial" font-size="15.00" fill="#bfdbfe">APIとWARPも提供。</text>
</g>
<!-- bitwarden -->
<g id="node10" class="node">
<title>bitwarden</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="442.31,-1398 122.27,-1398 122.27,-1218 442.31,-1218 442.31,-1398"/>
<text xml:space="preserve" text-anchor="start" x="158.89" y="-1320" font-family="Arial" font-size="20.00" fill="#eff6ff">Bitwarden Secrets Manager</text>
<text xml:space="preserve" text-anchor="start" x="159.33" y="-1297" font-family="Arial" font-size="15.00" fill="#bfdbfe">Terraform・GitHub Actions・External</text>
<text xml:space="preserve" text-anchor="start" x="200.6" y="-1279" font-family="Arial" font-size="15.00" fill="#bfdbfe">Secretsへ秘密情報を配布。</text>
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
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1589.13,-1381.64C1589.13,-1390.67 1484.87,-1398 1356.53,-1398 1228.18,-1398 1123.92,-1390.67 1123.92,-1381.64 1123.92,-1381.64 1123.92,-1234.36 1123.92,-1234.36 1123.92,-1225.33 1228.18,-1218 1356.53,-1218 1484.87,-1218 1589.13,-1225.33 1589.13,-1234.36 1589.13,-1234.36 1589.13,-1381.64 1589.13,-1381.64"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1589.13,-1381.64C1589.13,-1372.61 1484.87,-1365.27 1356.53,-1365.27 1228.18,-1365.27 1123.92,-1372.61 1123.92,-1381.64"/>
<text xml:space="preserve" text-anchor="start" x="1270.94" y="-1311" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2（S3互換）</text>
<text xml:space="preserve" text-anchor="start" x="1143.97" y="-1288" font-family="Arial" font-size="15.00" fill="#f9b27c">S3互換の保存先。PBS・DB・NAS・録画・監視のバックアップを保存。</text>
</g>
<!-- workers -->
<g id="node13" class="node">
<title>workers</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1022.75,-1089 624.72,-1089 624.72,-909 1022.75,-909 1022.75,-1089"/>
<text xml:space="preserve" text-anchor="start" x="644.78" y="-1014" font-family="Arial" font-size="20.00" fill="#eff6ff">Raspberry Pi / home&#45;k8s worker03・04 /</text>
<text xml:space="preserve" text-anchor="start" x="786.49" y="-990" font-family="Arial" font-size="20.00" fill="#eff6ff">VLAN10</text>
<text xml:space="preserve" text-anchor="start" x="737.03" y="-967" font-family="Arial" font-size="15.00" fill="#bfdbfe">Talos Linux（arm64）/ 2台</text>
</g>
<!-- cloudflare&#45;&gt;cp1 -->
<g id="edge3" class="edge">
<title>cloudflare&#45;&gt;cp1</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M484.44,-1443.3C492.39,-1436.35 499.83,-1428.93 506.58,-1421 584.43,-1329.48 574.3,-1277.78 589.85,-1170.24"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="592.42,-1170.8 590.94,-1162.99 587.23,-1170.02 592.42,-1170.8"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="463.69,-1287.66 463.69,-1310.46 569.28,-1310.46 569.28,-1287.66 463.69,-1287.66"/>
<text xml:space="preserve" text-anchor="start" x="466.69" y="-1293.46" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access・Tunnel</text>
</g>
<!-- bitwarden&#45;&gt;cp1 -->
<g id="edge4" class="edge">
<title>bitwarden&#45;&gt;cp1</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M441.99,-1232.02C470.69,-1213.75 499.59,-1192.14 525.13,-1167.14"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="526.67,-1169.31 530.11,-1162.14 522.95,-1165.61 526.67,-1169.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="419.53,-1175.73 419.53,-1198.53 489.33,-1198.53 489.33,-1175.73 419.53,-1175.73"/>
<text xml:space="preserve" text-anchor="start" x="422.53" y="-1181.53" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret同期</text>
</g>
<!-- network&#45;&gt;cp1 -->
<g id="edge2" class="edge">
<title>network&#45;&gt;cp1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M462.13,-909.03C478.16,-897.13 493.31,-884.11 506.58,-870 507.69,-868.82 508.78,-867.65 509.85,-866.49"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="511.51,-868.56 514.6,-861.24 507.62,-865.04 511.51,-868.56"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="434,-862.92 434,-885.72 490.57,-885.72 490.57,-862.92 434,-862.92"/>
<text xml:space="preserve" text-anchor="start" x="437" y="-868.72" font-family="Arial" font-size="14.00" fill="#c9c9c9">宅内LAN</text>
</g>
<!-- network&#45;&gt;workers -->
<g id="edge1" class="edge">
<title>network&#45;&gt;workers</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M506.21,-999C541.98,-999 578.88,-999 614.29,-999"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="614.21,-1001.63 621.71,-999 614.21,-996.38 614.21,-1001.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="536.58,-999 536.58,-1021.8 594.72,-1021.8 594.72,-999 536.58,-999"/>
<text xml:space="preserve" text-anchor="start" x="539.58" y="-1004.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">VLAN10</text>
</g>
<!-- workers&#45;&gt;idrive -->
<g id="edge5" class="edge">
<title>workers&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1084.91,-1150.46C1122.04,-1172.08 1159.3,-1193.77 1193.79,-1213.85"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1192.06,-1215.87 1199.86,-1217.38 1194.7,-1211.34 1192.06,-1215.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1067.32,-1161.67 1067.32,-1184.47 1143.34,-1184.47 1143.34,-1161.67 1067.32,-1161.67"/>
<text xml:space="preserve" text-anchor="start" x="1070.32" y="-1167.47" font-family="Arial" font-size="14.00" fill="#ffe0c2">バックアップ</text>
</g>
</g>
</svg>
`;case`home_apps`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1808pt" height="979pt"
 viewBox="0.00 0.00 1808.00 979.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 964.05)">
<g id="clust1" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="8,-468 8,-809 359.26,-809 359.26,-468 8,-468"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-796.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="404.59,-140 404.59,-941 1769.66,-941 1769.66,-140 404.59,-140"/>
<text xml:space="preserve" text-anchor="start" x="412.59" y="-928.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<!-- nas02 -->
<g id="node1" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M319.26,-738.92C319.26,-743.93 258.47,-748.01 183.63,-748.01 108.79,-748.01 48,-743.93 48,-738.92 48,-738.92 48,-657.09 48,-657.09 48,-652.08 108.79,-648 183.63,-648 258.47,-648 319.26,-652.08 319.26,-657.09 319.26,-657.09 319.26,-738.92 319.26,-738.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M319.26,-738.92C319.26,-733.9 258.47,-729.82 183.63,-729.82 108.79,-729.82 48,-733.9 48,-738.92"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-690" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- kiosk -->
<g id="node2" class="node">
<title>kiosk</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="308.67,-608.01 58.59,-608.01 58.59,-508 308.67,-508 308.67,-608.01"/>
<text xml:space="preserve" text-anchor="start" x="68.6" y="-550" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror表示 / VM5000</text>
</g>
<!-- platform -->
<g id="node3" class="node">
<title>platform</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="680.76,-880.01 467.36,-880.01 467.36,-780 680.76,-780 680.76,-880.01"/>
<text xml:space="preserve" text-anchor="start" x="477.37" y="-822" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s クラスタ基盤</text>
</g>
<!-- agent -->
<g id="node4" class="node">
<title>agent</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="664.06,-560.01 484.06,-560.01 484.06,-460 664.06,-460 664.06,-560.01"/>
<text xml:space="preserve" text-anchor="start" x="524.05" y="-502" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅監視基盤</text>
</g>
<!-- management -->
<g id="node5" class="node">
<title>management</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="664.06,-740.01 484.06,-740.01 484.06,-640 664.06,-640 664.06,-740.01"/>
<text xml:space="preserve" text-anchor="start" x="524.05" y="-682" font-family="Arial" font-size="20.00" fill="#f8fafc">クラスタ運用</text>
</g>
<!-- eso -->
<g id="node6" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1082.12,-880.01 830.89,-880.01 830.89,-780 1082.12,-780 1082.12,-880.01"/>
<text xml:space="preserve" text-anchor="start" x="840.9" y="-822" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- dns -->
<g id="node7" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1049.32,-560.01 863.69,-560.01 863.69,-460 1049.32,-460 1049.32,-560.01"/>
<text xml:space="preserve" text-anchor="start" x="873.7" y="-502" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- nextcloud -->
<g id="node8" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1046.5,-740.01 866.5,-740.01 866.5,-640 1046.5,-640 1046.5,-740.01"/>
<text xml:space="preserve" text-anchor="start" x="912.04" y="-682" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node9" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1491.5,-560.01 1139.12,-560.01 1139.12,-460 1491.5,-460 1491.5,-560.01"/>
<text xml:space="preserve" text-anchor="start" x="1149.13" y="-502" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信 / EPGStation・TNLaStation</text>
</g>
<!-- loockit -->
<g id="node10" class="node">
<title>loockit</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1442.58,-700.01 1188.03,-700.01 1188.03,-600 1442.58,-600 1442.58,-700.01"/>
<text xml:space="preserve" text-anchor="start" x="1198.04" y="-642" font-family="Arial" font-size="20.00" fill="#eff6ff">Loockit / BLEスマートロック</text>
</g>
<!-- coupon_manager -->
<g id="node11" class="node">
<title>coupon_manager</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1405.31,-880.01 1225.31,-880.01 1225.31,-780 1405.31,-780 1405.31,-880.01"/>
<text xml:space="preserve" text-anchor="start" x="1238.03" y="-822" font-family="Arial" font-size="20.00" fill="#eff6ff">Coupon Manager</text>
</g>
<!-- wol -->
<g id="node12" class="node">
<title>wol</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1729.08,-560.01 1549.08,-560.01 1549.08,-460 1729.08,-460 1729.08,-560.01"/>
<text xml:space="preserve" text-anchor="start" x="1576.28" y="-502" font-family="Arial" font-size="20.00" fill="#f8fafc">Wake&#45;on&#45;LAN</text>
</g>
<!-- databases -->
<g id="node13" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1729.66,-880.01 1548.5,-880.01 1548.5,-780 1729.66,-780 1729.66,-880.01"/>
<text xml:space="preserve" text-anchor="start" x="1558.51" y="-822" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- magic_mirror -->
<g id="node14" class="node">
<title>magic_mirror</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="703.53,-420.01 444.59,-420.01 444.59,-320 703.53,-320 703.53,-420.01"/>
<text xml:space="preserve" text-anchor="start" x="454.6" y="-362" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror / ダッシュボード</text>
</g>
<!-- annict_scraper -->
<g id="node15" class="node">
<title>annict_scraper</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="689.66,-280.01 458.46,-280.01 458.46,-180 689.66,-180 689.66,-280.01"/>
<text xml:space="preserve" text-anchor="start" x="468.47" y="-222" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict scraper / 番組照合</text>
</g>
<!-- edge -->
<g id="node16" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="273.63,-428.01 93.63,-428.01 93.63,-328 273.63,-328 273.63,-428.01"/>
<text xml:space="preserve" text-anchor="start" x="138.05" y="-370" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- annict -->
<g id="node17" class="node">
<title>annict</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1046.5,-100.01 866.5,-100.01 866.5,0 1046.5,0 1046.5,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="909.82" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict API</text>
</g>
<!-- nas02&#45;&gt;platform -->
<g id="edge10" class="edge">
<title>nas02&#45;&gt;platform</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M320.21,-744.08C344.26,-752.25 369.63,-760.87 394.65,-769.38"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="393.78,-771.85 401.73,-771.78 395.47,-766.88 393.78,-771.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="215.54,-758.39 215.54,-781.19 362.34,-781.19 362.34,-758.39 215.54,-758.39"/>
<text xml:space="preserve" text-anchor="start" x="218.54" y="-764.19" font-family="Arial" font-size="14.00" fill="#c9c9c9">アプリ・DB・監視のNFS</text>
</g>
<!-- kiosk&#45;&gt;magic_mirror -->
<g id="edge11" class="edge">
<title>kiosk&#45;&gt;magic_mirror</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M272.97,-508.04C312.74,-486.23 360.55,-460.91 404.59,-440 415.88,-434.65 427.69,-429.28 439.6,-424.03"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="440.56,-426.47 446.38,-421.06 438.46,-421.66 440.56,-426.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="367.26,-457.95 367.26,-480.75 396.59,-480.75 396.59,-457.95 367.26,-457.95"/>
<text xml:space="preserve" text-anchor="start" x="370.26" y="-463.75" font-family="Arial" font-size="14.00" fill="#bbfcd3">表示</text>
</g>
<!-- platform&#45;&gt;eso -->
<!-- agent&#45;&gt;management -->
<!-- management&#45;&gt;dns -->
<!-- eso&#45;&gt;recording -->
<!-- dns&#45;&gt;nextcloud -->
<!-- recording&#45;&gt;wol -->
<!-- loockit&#45;&gt;coupon_manager -->
<!-- coupon_manager&#45;&gt;databases -->
<!-- annict_scraper&#45;&gt;annict -->
<g id="edge12" class="edge">
<title>annict_scraper&#45;&gt;annict</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M680.53,-180.1C735.83,-153.94 803.13,-122.1 857.31,-96.46"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="858.19,-98.95 863.84,-93.37 855.94,-94.21 858.19,-98.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="731.53,-150.78 731.53,-173.58 802.89,-173.58 802.89,-150.78 731.53,-150.78"/>
<text xml:space="preserve" text-anchor="start" x="734.53" y="-156.58" font-family="Arial" font-size="14.00" fill="#bbfcd3">Annict API</text>
</g>
<!-- edge&#45;&gt;platform -->
<g id="edge4" class="edge">
<title>edge&#45;&gt;platform</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M273.39,-378.78C317.6,-384.22 367.67,-399.05 396.59,-436 417.23,-462.37 388.81,-694.08 401.08,-750.4"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="398.51,-751.02 403.55,-757.16 403.44,-749.22 398.51,-751.02"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="402.41,-572 402.41,-594.8 686.9,-594.8 686.9,-572 402.41,-572"/>
<text xml:space="preserve" text-anchor="start" x="405.41" y="-577.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">認証済みHTTP / Access・mTLS → 内部Service</text>
</g>
</g>
</svg>
`;case`access`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2330pt" height="1006pt"
 viewBox="0.00 0.00 2330.00 1006.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 991.05)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#1c417d" stroke="#1c356c" points="371.57,-201 371.57,-768 1684.41,-768 1684.41,-201 371.57,-201"/>
<text xml:space="preserve" text-anchor="start" x="379.57" y="-755.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_edge</title>
<polygon fill="#51321f" stroke="#3f2717" points="403.57,-233 403.57,-715 1652.41,-715 1652.41,-233 403.57,-233"/>
<text xml:space="preserve" text-anchor="start" x="411.57" y="-702.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_routes</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1310.09,-273 1310.09,-654 1612.41,-654 1612.41,-273 1310.09,-273"/>
<text xml:space="preserve" text-anchor="start" x="1318.09" y="-641.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">公開HOSTNAME / 設定から抽出</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1339.25,-8 1339.25,-193 1583.25,-193 1583.25,-8 1339.25,-8"/>
<text xml:space="preserve" text-anchor="start" x="1347.25" y="-180.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1886.6,-309 1886.6,-968 2292.25,-968 2292.25,-309 1886.6,-309"/>
<text xml:space="preserve" text-anchor="start" x="1894.6" y="-955.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1967.43,-722 1967.43,-907 2211.43,-907 2211.43,-722 1967.43,-722"/>
<text xml:space="preserve" text-anchor="start" x="1975.43" y="-894.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1967.43,-497 1967.43,-682 2211.43,-682 2211.43,-497 1967.43,-497"/>
<text xml:space="preserve" text-anchor="start" x="1975.43" y="-669.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<!-- protected -->
<g id="node1" class="node">
<title>protected</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1572.41,-593 1350.09,-593 1350.09,-493 1572.41,-493 1572.41,-593"/>
<text xml:space="preserve" text-anchor="start" x="1360.1" y="-535" font-family="Arial" font-size="20.00" fill="#f8fafc">Access保護のhostname</text>
</g>
<!-- exceptions -->
<g id="node2" class="node">
<title>exceptions</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1555.72,-413 1366.78,-413 1366.78,-313 1555.72,-313 1555.72,-413"/>
<text xml:space="preserve" text-anchor="start" x="1376.78" y="-355" font-family="Arial" font-size="20.00" fill="#f8fafc">例外 / mTLS専用API</text>
</g>
<!-- access -->
<g id="node3" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="758.13,-593 443.57,-593 443.57,-493 758.13,-493 758.13,-593"/>
<text xml:space="preserve" text-anchor="start" x="453.58" y="-535" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
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
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1159.27,-593 979.27,-593 979.27,-493 1159.27,-493 1159.27,-593"/>
<text xml:space="preserve" text-anchor="start" x="990.33" y="-535" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- reventer -->
<g id="node6" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1551.25,-140 1371.25,-140 1371.25,-40 1551.25,-40 1551.25,-140"/>
<text xml:space="preserve" text-anchor="start" x="1416.22" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- argo -->
<g id="node7" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2179.43,-854 1999.43,-854 1999.43,-754 2179.43,-754 2179.43,-854"/>
<text xml:space="preserve" text-anchor="start" x="2037.19" y="-796" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- network -->
<g id="node8" class="node">
<title>network</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2179.43,-629 1999.43,-629 1999.43,-529 2179.43,-529 2179.43,-629"/>
<text xml:space="preserve" text-anchor="start" x="2022.75" y="-571" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- pve -->
<g id="node9" class="node">
<title>pve</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="2252.25,-449 1926.6,-449 1926.6,-349 2252.25,-349 2252.25,-449"/>
<text xml:space="preserve" text-anchor="start" x="1936.61" y="-391" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox VEクラスタ（2ノード構成）</text>
</g>
<!-- user -->
<g id="node10" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-763 0,-763 0,-663 180,-663 180,-763"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-705" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- operator -->
<g id="node11" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-583 0,-583 0,-483 180,-483 180,-583"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-525" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- client -->
<g id="node12" class="node">
<title>client</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-393 0,-393 0,-293 180,-293 180,-393"/>
<text xml:space="preserve" text-anchor="start" x="23.32" y="-335" font-family="Arial" font-size="20.00" fill="#f8fafc">専用クライアント</text>
</g>
<!-- protected&#45;&gt;argo -->
<g id="edge8" class="edge">
<title>protected&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1572.39,-588.91C1690.67,-638.21 1876.83,-715.8 1990.25,-763.08"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1988.92,-765.37 1996.85,-765.83 1990.94,-760.52 1988.92,-765.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1734.83,-712.13 1734.83,-734.93 1834.18,-734.93 1834.18,-712.13 1734.83,-712.13"/>
<text xml:space="preserve" text-anchor="start" x="1737.83" y="-717.93" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;network -->
<g id="edge9" class="edge">
<title>protected&#45;&gt;network</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1572.39,-549.33C1690.31,-556.11 1875.71,-566.77 1989.23,-573.3"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1988.98,-575.91 1996.62,-573.72 1989.29,-570.67 1988.98,-575.91"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1734.83,-566.33 1734.83,-589.13 1834.18,-589.13 1834.18,-566.33 1734.83,-566.33"/>
<text xml:space="preserve" text-anchor="start" x="1737.83" y="-572.13" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;pve -->
<g id="edge7" class="edge">
<title>protected&#45;&gt;pve</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1572.39,-517.67C1667.59,-495.78 1806.78,-463.77 1916.62,-438.51"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1917.14,-441.08 1923.86,-436.84 1915.97,-435.97 1917.14,-441.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1734.83,-488.13 1734.83,-510.93 1834.18,-510.93 1834.18,-488.13 1734.83,-488.13"/>
<text xml:space="preserve" text-anchor="start" x="1737.83" y="-493.93" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- exceptions&#45;&gt;pve -->
<g id="edge10" class="edge">
<title>exceptions&#45;&gt;pve</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1555.54,-352.48C1639.73,-344.81 1766.83,-337.72 1876.6,-350.2 1889.67,-351.69 1903.11,-353.67 1916.58,-356"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1916.05,-358.57 1923.9,-357.3 1916.97,-353.4 1916.05,-358.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1692.41,-350.2 1692.41,-373 1876.6,-373 1876.6,-350.2 1692.41,-350.2"/>
<text xml:space="preserve" text-anchor="start" x="1695.41" y="-356" font-family="Arial" font-size="14.00" fill="#bbfcd3">独立LXC proxy / ready leader</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge4" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M757.81,-543C827.53,-543 907.63,-543 969.01,-543"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="968.94,-545.63 976.44,-543 968.94,-540.38 968.94,-545.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="808.13,-543 808.13,-565.8 929.27,-565.8 929.27,-543 808.13,-543"/>
<text xml:space="preserve" text-anchor="start" x="811.13" y="-548.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- tunnel&#45;&gt;protected -->
<g id="edge5" class="edge">
<title>tunnel&#45;&gt;protected</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1159.25,-543C1212.8,-543 1281.67,-543 1340.01,-543"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1339.88,-545.63 1347.38,-543 1339.88,-540.38 1339.88,-545.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1209.27,-543 1209.27,-565.8 1300.09,-565.8 1300.09,-543 1209.27,-543"/>
<text xml:space="preserve" text-anchor="start" x="1212.27" y="-548.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">hostname転送</text>
</g>
<!-- tunnel&#45;&gt;reventer -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1110.21,-493.07C1157.18,-434.74 1237.9,-335.68 1310.09,-253 1341.23,-217.33 1377.13,-178.28 1406.02,-147.35"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1407.93,-149.15 1411.14,-141.88 1404.1,-145.56 1407.93,-149.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1209.27,-371.2 1209.27,-394 1300.09,-394 1300.09,-371.2 1209.27,-371.2"/>
<text xml:space="preserve" text-anchor="start" x="1212.27" y="-377" font-family="Arial" font-size="14.00" fill="#cbd0fd">hostname転送</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-683.29C251.73,-659.3 354.6,-624.94 440.54,-596.22"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="441.25,-598.75 447.53,-593.89 439.59,-593.77 441.25,-598.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-665.1 230,-687.9 363.57,-687.9 363.57,-665.1 230,-665.1"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-670.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-534.75C249.73,-536.12 348.9,-538.07 433.34,-539.73"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="433.25,-542.35 440.8,-539.87 433.35,-537.1 433.25,-542.35"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-538.3 230,-561.1 363.57,-561.1 363.57,-538.3 230,-538.3"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-544.1" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
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
<polygon fill="#194b9e" stroke="#1b3d88" points="2194,-48 2194,-233.21 2438,-233.21 2438,-48 2194,-48"/>
<text xml:space="preserve" text-anchor="start" x="2202" y="-220.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
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
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2406,-180.01 2226,-180.01 2226,-80 2406,-80 2406,-180.01"/>
<text xml:space="preserve" text-anchor="start" x="2249.32" y="-122" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- pve -->
<g id="node8" class="node">
<title>pve</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="2161.83,-180.01 1836.17,-180.01 1836.17,-80 2161.83,-80 2161.83,-180.01"/>
<text xml:space="preserve" text-anchor="start" x="1846.18" y="-122" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox VEクラスタ（2ノード構成）</text>
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
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1213.7,-312.02C1241.08,-297.43 1272.18,-282.55 1302,-272.01 1475.35,-210.73 1682.89,-173.03 1826.18,-152.21"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1826.34,-154.84 1833.39,-151.18 1825.59,-149.65 1826.34,-154.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1393.93,-241.21 1393.93,-264.01 1502.61,-264.01 1502.61,-241.21 1393.93,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="1396.93" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM / ネットワーク</text>
</g>
<!-- ansible&#45;&gt;network -->
<g id="edge6" class="edge">
<title>ansible&#45;&gt;network</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2093.07,-312.15C2112.15,-297.66 2134.13,-282.79 2156,-272.01 2167.61,-266.28 2174.25,-272.52 2184,-264.01 2192.33,-256.73 2185.67,-248.49 2194,-241.21 2200.55,-235.49 2205.97,-236.91 2212.16,-236.4"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2212.8,-238.95 2219.12,-234.14 2211.18,-233.96 2212.8,-238.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2040.62,-271.51 2040.62,-294.31 2157.07,-294.31 2157.07,-271.51 2040.62,-271.51"/>
<text xml:space="preserve" text-anchor="start" x="2043.62" y="-277.31" font-family="Arial" font-size="14.00" fill="#cbd0fd">NW・UPS機器設定</text>
</g>
<!-- ansible&#45;&gt;pve -->
<g id="edge5" class="edge">
<title>ansible&#45;&gt;pve</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2028.15,-312.23C2022.41,-276.55 2014.6,-227.98 2008.51,-190.09"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2011.1,-189.69 2007.32,-182.7 2005.92,-190.52 2011.1,-189.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2019.72,-241.21 2019.72,-264.01 2149.41,-264.01 2149.41,-241.21 2019.72,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="2022.72" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM・NAS・LXC設定</text>
</g>
<!-- packer&#45;&gt;pve -->
<g id="edge7" class="edge">
<title>packer&#45;&gt;pve</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2243.54,-312.11C2220.29,-289.58 2191.54,-263.06 2164,-241.21 2139.63,-221.88 2111.93,-202.47 2086.27,-185.45"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2087.89,-183.38 2080.18,-181.44 2085,-187.76 2087.89,-183.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2189.79,-241.21 2189.79,-264.01 2274.37,-264.01 2274.37,-241.21 2189.79,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="2192.79" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM template</text>
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
<svg width="7074pt" height="474pt"
 viewBox="0.00 0.00 7074.00 474.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 458.66)">
<g id="clust1" class="cluster">
<title>cluster_pve</title>
<polygon fill="#1c417d" stroke="#1c356c" points="8,-8 8,-435.61 7036,-435.61 7036,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-422.71" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_controlplanes</title>
<polygon fill="#1a468d" stroke="#1c3979" points="58,-58 58,-364.41 990,-364.41 990,-58 58,-58"/>
<text xml:space="preserve" text-anchor="start" x="66" y="-351.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S コントロールプレーン</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_cp1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="108,-108 108,-293.21 352,-293.21 352,-108 108,-108"/>
<text xml:space="preserve" text-anchor="start" x="116" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">コントロールプレーン01 / VM13001 / VLAN20</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_cp2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="402,-108 402,-293.21 646,-293.21 646,-108 402,-108"/>
<text xml:space="preserve" text-anchor="start" x="410" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">コントロールプレーン02 / VM13002 / VLAN20</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_cp3</title>
<polygon fill="#3e4651" stroke="#2d333d" points="696,-108 696,-293.21 940,-293.21 940,-108 696,-108"/>
<text xml:space="preserve" text-anchor="start" x="704" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">コントロールプレーン03 / VM13003 / VLAN20</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_workers</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1040,-58 1040,-364.41 1684,-364.41 1684,-58 1040,-58"/>
<text xml:space="preserve" text-anchor="start" x="1048" y="-351.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S ワーカー</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_worker1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1090,-108 1090,-293.21 1337,-293.21 1337,-108 1090,-108"/>
<text xml:space="preserve" text-anchor="start" x="1098" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">HOME&#45;K8S WORKER01 / VM13004 / VLAN20</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_worker2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1387,-108 1387,-293.21 1634,-293.21 1634,-108 1387,-108"/>
<text xml:space="preserve" text-anchor="start" x="1395" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">HOME&#45;K8S WORKER02 / VM13005 / VLAN20</text>
</g>
<g id="clust9" class="cluster">
<title>cluster_loadbalancers</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1734,-90 1734,-311.21 2502,-311.21 2502,-90 1734,-90"/>
<text xml:space="preserve" text-anchor="start" x="1742" y="-298.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">ロードバランサー</text>
</g>
<g id="clust10" class="cluster">
<title>cluster_storage</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2552,-90 2552,-311.21 3528,-311.21 3528,-90 2552,-90"/>
<text xml:space="preserve" text-anchor="start" x="2560" y="-298.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">ストレージ・バックアップ</text>
</g>
<g id="clust11" class="cluster">
<title>cluster_smartlocks</title>
<polygon fill="#1a468d" stroke="#1c3979" points="3578,-58 3578,-364.41 4440,-364.41 4440,-58 3578,-58"/>
<text xml:space="preserve" text-anchor="start" x="3586" y="-351.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">LOOCKIT / BLUETOOTH制御</text>
</g>
<g id="clust12" class="cluster">
<title>cluster_loockit1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="3628,-108 3628,-293.21 3984,-293.21 3984,-108 3628,-108"/>
<text xml:space="preserve" text-anchor="start" x="3636" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">LOOCKIT 01 / CT12902 / VLAN20</text>
</g>
<g id="clust13" class="cluster">
<title>cluster_loockit2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="4034,-108 4034,-293.21 4390,-293.21 4390,-108 4034,-108"/>
<text xml:space="preserve" text-anchor="start" x="4042" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">LOOCKIT 02 / CT12903 / VLAN20</text>
</g>
<g id="clust14" class="cluster">
<title>cluster_tuners</title>
<polygon fill="#1a468d" stroke="#1c3979" points="4490,-58 4490,-364.41 5302,-364.41 5302,-58 4490,-58"/>
<text xml:space="preserve" text-anchor="start" x="4498" y="-351.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">MIRAKURUN / チューナー</text>
</g>
<g id="clust15" class="cluster">
<title>cluster_tuner_prod</title>
<polygon fill="#3e4651" stroke="#2d333d" points="4540,-108 4540,-293.21 4846,-293.21 4846,-108 4540,-108"/>
<text xml:space="preserve" text-anchor="start" x="4548" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">MIRAKURUN本番 / CT12901・PT3 / VLAN20</text>
</g>
<g id="clust16" class="cluster">
<title>cluster_tuner_stg</title>
<polygon fill="#3e4651" stroke="#2d333d" points="4896,-108 4896,-293.21 5252,-293.21 5252,-108 4896,-108"/>
<text xml:space="preserve" text-anchor="start" x="4904" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">MIRAKURUN STG / CT12904・PX&#45;S1UD / VLAN20</text>
</g>
<g id="clust17" class="cluster">
<title>cluster_network_management</title>
<polygon fill="#1a468d" stroke="#1c3979" points="5352,-76 5352,-346.41 5762,-346.41 5762,-76 5352,-76"/>
<text xml:space="preserve" text-anchor="start" x="5360" y="-333.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">ネットワーク管理</text>
</g>
<g id="clust18" class="cluster">
<title>cluster_unifi</title>
<polygon fill="#3e4651" stroke="#2d333d" points="5384,-108 5384,-293.21 5730,-293.21 5730,-108 5384,-108"/>
<text xml:space="preserve" text-anchor="start" x="5392" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">UNIFI OS VM13201 / NATIVE1</text>
</g>
<g id="clust19" class="cluster">
<title>cluster_development</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="5812,-108 5812,-293.21 6202,-293.21 6202,-108 5812,-108"/>
<text xml:space="preserve" text-anchor="start" x="5820" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">開発環境</text>
</g>
<g id="clust20" class="cluster">
<title>cluster_desktop</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="6252,-108 6252,-293.21 6610,-293.21 6610,-108 6252,-108"/>
<text xml:space="preserve" text-anchor="start" x="6260" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">デスクトップ</text>
</g>
<g id="clust21" class="cluster">
<title>cluster_display</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="6660,-108 6660,-293.21 6986,-293.21 6986,-108 6660,-108"/>
<text xml:space="preserve" text-anchor="start" x="6668" y="-280.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">表示端末</text>
</g>
<!-- lb1 -->
<g id="node1" class="node">
<title>lb1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2100.42,-240.01 1783.58,-240.01 1783.58,-140 2100.42,-140 2100.42,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="1793.59" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived VM10001 /</text>
</g>
<!-- lb2 -->
<g id="node2" class="node">
<title>lb2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2452.42,-240.01 2135.58,-240.01 2135.58,-140 2452.42,-140 2452.42,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="2145.59" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived VM10002 /</text>
</g>
<!-- nas1 -->
<g id="node3" class="node">
<title>nas1</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M2884.18,-230.92C2884.18,-235.93 2820.9,-240.01 2743,-240.01 2665.1,-240.01 2601.82,-235.93 2601.82,-230.92 2601.82,-230.92 2601.82,-149.09 2601.82,-149.09 2601.82,-144.08 2665.1,-140 2743,-140 2820.9,-140 2884.18,-144.08 2884.18,-149.09 2884.18,-149.09 2884.18,-230.92 2884.18,-230.92"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M2884.18,-230.92C2884.18,-225.9 2820.9,-221.82 2743,-221.82 2665.1,-221.82 2601.82,-225.9 2601.82,-230.92"/>
<text xml:space="preserve" text-anchor="start" x="2611.82" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">nas&#45;01 / TrueNAS VM69001 /</text>
</g>
<!-- nas2 -->
<g id="node4" class="node">
<title>nas2</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M3201.18,-230.92C3201.18,-235.93 3137.9,-240.01 3060,-240.01 2982.1,-240.01 2918.82,-235.93 2918.82,-230.92 2918.82,-230.92 2918.82,-149.09 2918.82,-149.09 2918.82,-144.08 2982.1,-140 3060,-140 3137.9,-140 3201.18,-144.08 3201.18,-149.09 3201.18,-149.09 3201.18,-230.92 3201.18,-230.92"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M3201.18,-230.92C3201.18,-225.9 3137.9,-221.82 3060,-221.82 2982.1,-221.82 2918.82,-225.9 2918.82,-230.92"/>
<text xml:space="preserve" text-anchor="start" x="2928.82" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">nas&#45;02 / TrueNAS VM69002 /</text>
</g>
<!-- pbs -->
<g id="node5" class="node">
<title>pbs</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M3478.18,-230.92C3478.18,-235.93 3423.87,-240.01 3357,-240.01 3290.13,-240.01 3235.82,-235.93 3235.82,-230.92 3235.82,-230.92 3235.82,-149.09 3235.82,-149.09 3235.82,-144.08 3290.13,-140 3357,-140 3423.87,-140 3478.18,-144.08 3478.18,-149.09 3478.18,-149.09 3478.18,-230.92 3478.18,-230.92"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M3478.18,-230.92C3478.18,-225.9 3423.87,-221.82 3357,-221.82 3290.13,-221.82 3235.82,-225.9 3235.82,-230.92"/>
<text xml:space="preserve" text-anchor="start" x="3245.82" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">PBS VM14001 / VLAN20</text>
</g>
<!-- dev -->
<g id="node6" class="node">
<title>dev</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="6170.41,-240.01 5843.59,-240.01 5843.59,-140 6170.41,-140 6170.41,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="5853.6" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">開発用Docker / VM40000 / VLAN20</text>
</g>
<!-- windows -->
<g id="node7" class="node">
<title>windows</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="6578.3,-240.01 6283.7,-240.01 6283.7,-140 6578.3,-140 6578.3,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="6293.71" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Windows / VM60000 / VLAN30</text>
</g>
<!-- kiosk -->
<g id="node8" class="node">
<title>kiosk</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="6953.59,-240.01 6692.41,-240.01 6692.41,-140 6953.59,-140 6953.59,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="6702.41" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror表示 / VM5000 /</text>
</g>
<!-- talos -->
<g id="node9" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="320,-240.01 140,-240.01 140,-140 320,-140 320,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="178.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- talos_1 -->
<g id="node10" class="node">
<title>talos_1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="614,-240.01 434,-240.01 434,-140 614,-140 614,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="472.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- talos_2 -->
<g id="node11" class="node">
<title>talos_2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="908,-240.01 728,-240.01 728,-140 908,-140 908,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="766.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- talos_3 -->
<g id="node12" class="node">
<title>talos_3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1303,-240.01 1123,-240.01 1123,-140 1303,-140 1303,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="1161.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- talos_4 -->
<g id="node13" class="node">
<title>talos_4</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1600,-240.01 1420,-240.01 1420,-140 1600,-140 1600,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="1458.86" y="-182" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos Linux</text>
</g>
<!-- app -->
<g id="node14" class="node">
<title>app</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3952.16,-240.01 3659.84,-240.01 3659.84,-140 3952.16,-140 3952.16,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="3669.85" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Loockit REST・gRPC</text>
</g>
<!-- app_1 -->
<g id="node15" class="node">
<title>app_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="4358.16,-240.01 4065.84,-240.01 4065.84,-140 4358.16,-140 4358.16,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="4075.85" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Loockit REST・gRPC</text>
</g>
<!-- app_2 -->
<g id="node16" class="node">
<title>app_2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="4814.15,-240.01 4571.85,-240.01 4571.85,-140 4814.15,-140 4814.15,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="4581.86" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Mirakurun / PT3</text>
</g>
<!-- app_3 -->
<g id="node17" class="node">
<title>app_3</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="5220.16,-240.01 4927.84,-240.01 4927.84,-140 5220.16,-140 5220.16,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="4937.85" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Mirakurun / PX&#45;S1UD</text>
</g>
<!-- app_4 -->
<g id="node18" class="node">
<title>app_4</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="5698.16,-240.01 5415.84,-240.01 5415.84,-140 5698.16,-140 5698.16,-240.01"/>
<text xml:space="preserve" text-anchor="start" x="5425.85" y="-182" font-family="Arial" font-size="20.00" fill="#f8fafc">Podman / UniFi OS・Network</text>
</g>
</g>
</svg>
`;case`network`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1059pt" height="997pt"
 viewBox="0.00 0.00 1059.00 997.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 982.28)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-796.42 1021,-796.42 1021,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-783.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="713,-56 713,-262.41 981,-262.41 981,-56 713,-56"/>
<text xml:space="preserve" text-anchor="start" x="721" y="-249.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_network</title>
<polygon fill="#3e4651" stroke="#2d333d" points="48,-48 48,-735.22 673,-735.22 673,-48 48,-48"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-722.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">ネットワーク機器</text>
</g>
<!-- unifi -->
<g id="node1" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="948.71,-188.01 745.29,-188.01 745.29,-88 948.71,-88 948.71,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="755.3" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS / VM13201</text>
</g>
<!-- router -->
<g id="node2" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="379.62,-652.82 88.38,-652.82 88.38,-552.82 379.62,-552.82 379.62,-652.82"/>
<text xml:space="preserve" text-anchor="start" x="98.38" y="-594.82" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / ルーター・VLAN間ACL</text>
</g>
<!-- ethernet -->
<g id="node3" class="node">
<title>ethernet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="357.95,-433.22 110.05,-433.22 110.05,-333.21 357.95,-333.21 357.95,-433.22"/>
<text xml:space="preserve" text-anchor="start" x="120.06" y="-375.21" font-family="Arial" font-size="20.00" fill="#f8fafc">宅内Ethernet / VLAN trunk</text>
</g>
<!-- switch -->
<g id="node4" class="node">
<title>switch</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="318.03,-188.01 87.97,-188.01 87.97,-88 318.03,-88 318.03,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="97.98" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">US&#45;8&#45;60W / 管理スイッチ</text>
</g>
<!-- ap -->
<g id="node5" class="node">
<title>ap</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="633,-188.01 453,-188.01 453,-88 633,-88 633,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="488" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">FS Wi&#45;Fi AP</text>
</g>
<!-- internet -->
<g id="node6" class="node">
<title>internet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="324,-967.23 144,-967.23 144,-867.22 324,-867.22 324,-967.23"/>
<text xml:space="preserve" text-anchor="start" x="200.09" y="-909.23" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet</text>
</g>
<!-- unifi&#45;&gt;switch -->
<g id="edge2" class="edge">
<title>unifi&#45;&gt;switch</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M800.13,-187.7C770.82,-215.17 730.63,-246.83 688,-262.41 631.39,-283.1 424.41,-285.6 378.32,-270.17 333.15,-255.05 290.29,-223.19 258.26,-194.54"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="260.32,-192.87 253.01,-189.76 256.79,-196.75 260.32,-192.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="378.32,-270.41 378.32,-293.21 477.68,-293.21 477.68,-270.41 378.32,-270.41"/>
<text xml:space="preserve" text-anchor="start" x="381.32" y="-276.21" font-family="Arial" font-size="14.00" fill="#cbd0fd">構成・監視を管理</text>
</g>
<!-- router&#45;&gt;ethernet -->
<g id="edge3" class="edge">
<title>router&#45;&gt;ethernet</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M234,-552.98C234,-520.51 234,-477.66 234,-443.27"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="236.63,-443.41 234,-435.91 231.38,-443.41 236.63,-443.41"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="234,-473.22 234,-512.82 399.16,-512.82 399.16,-473.22 234,-473.22"/>
<text xml:space="preserve" text-anchor="start" x="237" y="-495.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">GigaEthernet2 / native1 +</text>
<text xml:space="preserve" text-anchor="start" x="237" y="-479.02" font-family="Arial" font-size="14.00" fill="#c9c9c9">tag10,20,30,31,40</text>
</g>
<!-- ethernet&#45;&gt;unifi -->
<g id="edge4" class="edge">
<title>ethernet&#45;&gt;unifi</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M357.74,-363.44C451.82,-345.93 582.58,-314.51 688,-262.41 693.37,-259.76 698.73,-256.9 704.06,-253.89"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="705.23,-256.25 710.39,-250.21 702.59,-251.72 705.23,-256.25"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="387.27,-319.69 387.27,-342.49 539.6,-342.49 539.6,-319.69 387.27,-319.69"/>
<text xml:space="preserve" text-anchor="start" x="390.27" y="-325.49" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1 / tag20・30・40</text>
</g>
<!-- ethernet&#45;&gt;switch -->
<g id="edge5" class="edge">
<title>ethernet&#45;&gt;switch</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M227.76,-333.29C222.79,-294.29 215.81,-239.53 210.53,-198.08"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="213.16,-197.96 209.61,-190.85 207.95,-198.62 213.16,-197.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="222.19,-270.41 222.19,-293.21 322.36,-293.21 322.36,-270.41 222.19,-270.41"/>
<text xml:space="preserve" text-anchor="start" x="225.19" y="-276.21" font-family="Arial" font-size="14.00" fill="#c9c9c9">802.1Q / uplink</text>
</g>
<!-- ethernet&#45;&gt;ap -->
<g id="edge6" class="edge">
<title>ethernet&#45;&gt;ap</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M357.72,-358.77C400.41,-345.51 445.8,-324.95 479,-293.21 505.56,-267.81 521.51,-229.75 530.85,-197.8"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="533.37,-198.51 532.84,-190.58 528.31,-197.11 533.37,-198.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="496.5,-270.41 496.5,-293.21 556.19,-293.21 556.19,-270.41 496.5,-270.41"/>
<text xml:space="preserve" text-anchor="start" x="499.5" y="-276.21" font-family="Arial" font-size="14.00" fill="#c9c9c9">AP trunk</text>
</g>
<!-- internet&#45;&gt;router -->
<g id="edge1" class="edge">
<title>internet&#45;&gt;router</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M234,-867.41C234,-812.21 234,-722.32 234,-663.12"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="236.63,-663.33 234,-655.83 231.38,-663.33 236.63,-663.33"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="234,-804.42 234,-827.22 374.61,-827.22 374.61,-804.42 234,-804.42"/>
<text xml:space="preserve" text-anchor="start" x="237" y="-810.22" font-family="Arial" font-size="14.00" fill="#c9c9c9">WAN / GigaEthernet0</text>
</g>
</g>
</svg>
`;case`vlans`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="5814pt" height="840pt"
 viewBox="0.00 0.00 5814.00 840.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 825.35)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#393939" stroke="#292929" points="8,-8 8,-802.3 5340,-802.3 5340,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-789.4" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_lan</title>
<polygon fill="#1a468d" stroke="#1c3979" points="58,-58 58,-731.1 4494,-731.1 4494,-58 58,-58"/>
<text xml:space="preserve" text-anchor="start" x="66" y="-718.2" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">VLANセグメント</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_native</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="108,-108 108,-659.9 888,-659.9 888,-108 108,-108"/>
<text xml:space="preserve" text-anchor="start" x="116" y="-647" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">NATIVE1 / 192.168.0.0/24</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_management</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="938,-108 938,-659.9 1946,-659.9 1946,-108 938,-108"/>
<text xml:space="preserve" text-anchor="start" x="946" y="-647" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">VLAN10 / 192.168.10.0/24</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_server</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="3382,-108 3382,-659.9 4090,-659.9 4090,-108 3382,-108"/>
<text xml:space="preserve" text-anchor="start" x="3390" y="-647" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">VLAN20 / 192.168.20.0/24</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_client</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1996,-108 1996,-637.4 2644,-637.4 2644,-108 1996,-108"/>
<text xml:space="preserve" text-anchor="start" x="2004" y="-624.5" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">VLAN30 / 192.168.30.0/24</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_guest</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="4140,-148.5 4140,-368.7 4444,-368.7 4444,-148.5 4140,-148.5"/>
<text xml:space="preserve" text-anchor="start" x="4148" y="-355.8" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">VLAN31 / 192.168.31.0/24</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_iot</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2694,-108 2694,-637.4 3332,-637.4 3332,-108 2694,-108"/>
<text xml:space="preserve" text-anchor="start" x="2702" y="-624.5" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">VLAN40 / 192.168.40.0/24</text>
</g>
<g id="clust9" class="cluster">
<title>cluster_providers</title>
<polygon fill="#454545" stroke="#313131" points="5358,-376.7 5358,-641.9 5776,-641.9 5776,-376.7 5358,-376.7"/>
<text xml:space="preserve" text-anchor="start" x="5366" y="-629" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">外部サービス</text>
</g>
<!-- pve -->
<g id="node1" class="node">
<title>pve</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="478.02,-338 157.98,-338 157.98,-158 478.02,-158 478.02,-338"/>
<text xml:space="preserve" text-anchor="start" x="277.44" y="-251" font-family="Arial" font-size="20.00" fill="#eff6ff">UniFi OS</text>
<text xml:space="preserve" text-anchor="start" x="267.99" y="-228" font-family="Arial" font-size="15.00" fill="#bfdbfe">ネットワーク管理</text>
</g>
<!-- pve_management -->
<g id="node2" class="node">
<title>pve_management</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="838.02,-338 517.98,-338 517.98,-158 838.02,-158 838.02,-338"/>
<text xml:space="preserve" text-anchor="start" x="566.86" y="-251" font-family="Arial" font-size="20.00" fill="#eff6ff">Proxmox VE / 2ノード管理</text>
<text xml:space="preserve" text-anchor="start" x="575.82" y="-228" font-family="Arial" font-size="15.00" fill="#bfdbfe">192.168.0.115 / 192.168.0.119</text>
</g>
<!-- switch -->
<g id="node3" class="node">
<title>switch</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="478.02,-588.7 157.98,-588.7 157.98,-408.7 478.02,-408.7 478.02,-588.7"/>
<text xml:space="preserve" text-anchor="start" x="236.87" y="-501.7" font-family="Arial" font-size="20.00" fill="#f8fafc">US&#45;8&#45;60W / 管理IP</text>
<text xml:space="preserve" text-anchor="start" x="270.04" y="-478.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">192.168.0.252</text>
</g>
<!-- ap -->
<g id="node4" class="node">
<title>ap</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="838.02,-588.7 517.98,-588.7 517.98,-408.7 838.02,-408.7 838.02,-588.7"/>
<text xml:space="preserve" text-anchor="start" x="614.65" y="-501.7" font-family="Arial" font-size="20.00" fill="#f8fafc">FS AP / 管理IP</text>
<text xml:space="preserve" text-anchor="start" x="630.04" y="-478.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">192.168.0.253</text>
</g>
<!-- rpi_workers -->
<g id="node5" class="node">
<title>rpi_workers</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1896.02,-338 1575.98,-338 1575.98,-158 1896.02,-158 1896.02,-338"/>
<text xml:space="preserve" text-anchor="start" x="1609.28" y="-251" font-family="Arial" font-size="20.00" fill="#f8fafc">Raspberry Pi / worker03・04</text>
<text xml:space="preserve" text-anchor="start" x="1625.48" y="-228" font-family="Arial" font-size="15.00" fill="#cbd5e1">192.168.10.107 / 192.168.10.109</text>
</g>
<!-- nut -->
<g id="node6" class="node">
<title>nut</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="1237.53,-566.2 988.47,-566.2 988.47,-431.2 1237.53,-431.2 1237.53,-566.2"/>
<text xml:space="preserve" text-anchor="start" x="1035.21" y="-501.7" font-family="Arial" font-size="20.00" fill="#fafafa">NUT Pi / UPS監視</text>
<text xml:space="preserve" text-anchor="start" x="1002.48" y="-478.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">192.168.10.112 / 192.168.10.113</text>
</g>
<!-- kvm -->
<g id="node7" class="node">
<title>kvm</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1598.02,-588.7 1277.98,-588.7 1277.98,-408.7 1598.02,-408.7 1598.02,-588.7"/>
<text xml:space="preserve" text-anchor="start" x="1378.53" y="-501.7" font-family="Arial" font-size="20.00" fill="#f8fafc">NanoKVM ×2</text>
<text xml:space="preserve" text-anchor="start" x="1327.48" y="-478.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">192.168.10.240 / 192.168.10.241</text>
</g>
<!-- management_clients -->
<g id="node8" class="node">
<title>management_clients</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="1895.69,-566.2 1638.31,-566.2 1638.31,-431.2 1895.69,-431.2 1895.69,-566.2"/>
<text xml:space="preserve" text-anchor="start" x="1660.87" y="-510.7" font-family="Arial" font-size="20.00" fill="#fafafa">管理端末 / NUCBox・NIC</text>
<text xml:space="preserve" text-anchor="start" x="1652.31" y="-487.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">192.168.10.117 / 192.168.10.118 /</text>
<text xml:space="preserve" text-anchor="start" x="1714.87" y="-469.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">192.168.10.140</text>
</g>
<!-- pve_1 -->
<g id="node9" class="node">
<title>pve_1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="4040.02,-338 3719.98,-338 3719.98,-158 4040.02,-158 4040.02,-338"/>
<text xml:space="preserve" text-anchor="start" x="3790.54" y="-260" font-family="Arial" font-size="20.00" fill="#eff6ff">Proxmox / サーバ基盤</text>
<text xml:space="preserve" text-anchor="start" x="3788.71" y="-237" font-family="Arial" font-size="15.00" fill="#bfdbfe">home&#45;k8s・LB・NAS・PBS</text>
<text xml:space="preserve" text-anchor="start" x="3797.89" y="-219" font-family="Arial" font-size="15.00" fill="#bfdbfe">Loockit・Mirakurun・開発</text>
</g>
<!-- service_ips -->
<g id="node10" class="node">
<title>service_ips</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3752.02,-588.7 3431.98,-588.7 3431.98,-408.7 3752.02,-408.7 3752.02,-588.7"/>
<text xml:space="preserve" text-anchor="start" x="3501.41" y="-501.7" font-family="Arial" font-size="20.00" fill="#f8fafc">MetalLB / Service IP</text>
<text xml:space="preserve" text-anchor="start" x="3485.23" y="-478.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">192.168.20.200&#45;192.168.20.226</text>
</g>
<!-- vips -->
<g id="node11" class="node">
<title>vips</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="4040.04,-566.2 3791.96,-566.2 3791.96,-431.2 4040.04,-431.2 4040.04,-566.2"/>
<text xml:space="preserve" text-anchor="start" x="3805.97" y="-510.7" font-family="Arial" font-size="20.00" fill="#fafafa">API・ロードバランサー VIP</text>
<text xml:space="preserve" text-anchor="start" x="3807.17" y="-487.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">Kubernetes API: 192.168.20.228</text>
<text xml:space="preserve" text-anchor="start" x="3830.11" y="-469.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">HAProxy: 192.168.20.227</text>
</g>
<!-- pve_2 -->
<g id="node12" class="node">
<title>pve_2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2594.02,-338 2273.98,-338 2273.98,-158 2594.02,-158 2594.02,-338"/>
<text xml:space="preserve" text-anchor="start" x="2351.76" y="-251" font-family="Arial" font-size="20.00" fill="#eff6ff">Windows / 作業環境</text>
<text xml:space="preserve" text-anchor="start" x="2396.49" y="-228" font-family="Arial" font-size="15.00" fill="#bfdbfe">デスクトップ</text>
</g>
<!-- physical_clients -->
<g id="node13" class="node">
<title>physical_clients</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="2303.69,-566.2 2046.31,-566.2 2046.31,-431.2 2303.69,-431.2 2303.69,-566.2"/>
<text xml:space="preserve" text-anchor="start" x="2086.09" y="-510.7" font-family="Arial" font-size="20.00" fill="#fafafa">PC・クライアント端末</text>
<text xml:space="preserve" text-anchor="start" x="2060.31" y="-487.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">192.168.30.210 / 192.168.30.222 /</text>
<text xml:space="preserve" text-anchor="start" x="2064.48" y="-469.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">192.168.30.223 / 192.168.30.224</text>
</g>
<!-- wol -->
<g id="node14" class="node">
<title>wol</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="2594.16,-566.2 2343.84,-566.2 2343.84,-431.2 2594.16,-431.2 2594.16,-566.2"/>
<text xml:space="preserve" text-anchor="start" x="2357.85" y="-501.7" font-family="Arial" font-size="20.00" fill="#fafafa">WoL relay / Raspberry Pi</text>
<text xml:space="preserve" text-anchor="start" x="2416.87" y="-478.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">192.168.30.250</text>
</g>
<!-- clients -->
<g id="node15" class="node">
<title>clients</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="4412.02,-315.5 4171.98,-315.5 4171.98,-180.5 4412.02,-180.5 4412.02,-315.5"/>
<text xml:space="preserve" text-anchor="start" x="4221.99" y="-251" font-family="Arial" font-size="20.00" fill="#fafafa">来客端末 / DHCP</text>
<text xml:space="preserve" text-anchor="start" x="4222.4" y="-228" font-family="Arial" font-size="15.00" fill="#d4d4d4">他VLANへの横断を拒否</text>
</g>
<!-- pve_3 -->
<g id="node16" class="node">
<title>pve_3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="3282.02,-338 2961.98,-338 2961.98,-158 3282.02,-158 3282.02,-338"/>
<text xml:space="preserve" text-anchor="start" x="3027.55" y="-251" font-family="Arial" font-size="20.00" fill="#eff6ff">MagicMirror / 表示端末</text>
<text xml:space="preserve" text-anchor="start" x="3097" y="-228" font-family="Arial" font-size="15.00" fill="#bfdbfe">表示端末</text>
</g>
<!-- av -->
<g id="node17" class="node">
<title>av</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="3001.69,-566.2 2744.31,-566.2 2744.31,-431.2 3001.69,-431.2 3001.69,-566.2"/>
<text xml:space="preserve" text-anchor="start" x="2818.55" y="-510.7" font-family="Arial" font-size="20.00" fill="#fafafa">TV・ゲーム機</text>
<text xml:space="preserve" text-anchor="start" x="2758.31" y="-487.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">192.168.40.111 / 192.168.40.120 /</text>
<text xml:space="preserve" text-anchor="start" x="2762.48" y="-469.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">192.168.40.121 / 192.168.40.141</text>
</g>
<!-- smart_home -->
<g id="node18" class="node">
<title>smart_home</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="3282.02,-566.2 3041.98,-566.2 3041.98,-431.2 3282.02,-431.2 3282.02,-566.2"/>
<text xml:space="preserve" text-anchor="start" x="3103.66" y="-510.7" font-family="Arial" font-size="20.00" fill="#fafafa">スマートホーム</text>
<text xml:space="preserve" text-anchor="start" x="3093.24" y="-487.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">照明・リモコン・カメラ</text>
<text xml:space="preserve" text-anchor="start" x="3074.48" y="-469.7" font-family="Arial" font-size="15.00" fill="#d4d4d4">SESAME・プラグ・センサー</text>
</g>
<!-- ix2215 -->
<g id="node19" class="node">
<title>ix2215</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="5289.75,-588.7 4544.25,-588.7 4544.25,-408.7 5289.75,-408.7 5289.75,-588.7"/>
<text xml:space="preserve" text-anchor="start" x="4781.38" y="-510.7" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / ルーター・VLAN間ACL</text>
<text xml:space="preserve" text-anchor="start" x="4866.55" y="-487.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">GigaEthernet2:</text>
<text xml:space="preserve" text-anchor="start" x="4564.31" y="-469.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">native1、tagged10/20/30/31/40。guestの他VLAN横断は拒否。IoTのIF名はGigaEthernet2.4/BVI4だがタグは40。</text>
</g>
<!-- warp -->
<g id="node20" class="node">
<title>warp</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="5743.78,-588.7 5390.22,-588.7 5390.22,-408.7 5743.78,-408.7 5743.78,-588.7"/>
<text xml:space="preserve" text-anchor="start" x="5488.64" y="-510.7" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare WARP</text>
<text xml:space="preserve" text-anchor="start" x="5460.28" y="-487.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">Cloudflare One Clientからprivate</text>
<text xml:space="preserve" text-anchor="start" x="5410.28" y="-469.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">CIDRへ。公開hostnameのTunnel/Accessとは別。</text>
</g>
<!-- ix2215&#45;&gt;pve -->
<g id="edge2" class="edge">
<title>ix2215&#45;&gt;pve</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M4544.34,-430.9C4405.37,-409.05 4245.94,-387.61 4100,-376.7 4080.18,-375.22 1832.67,-375.62 898.25,-372.21"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="898.54,-369.59 891.03,-372.18 898.52,-374.84 898.54,-369.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2782.43,-375.18 2782.43,-397.98 2842.11,-397.98 2842.11,-375.18 2782.43,-375.18"/>
<text xml:space="preserve" text-anchor="start" x="2785.43" y="-380.98" font-family="Arial" font-size="14.00" fill="#c9c9c9">native IF</text>
</g>
<!-- ix2215&#45;&gt;rpi_workers -->
<g id="edge5" class="edge">
<title>ix2215&#45;&gt;rpi_workers</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M4544.33,-431.02C4405.36,-409.19 4245.93,-387.73 4100,-376.7 4041.44,-372.28 2043.24,-381.81 1986,-368.7 1976.04,-366.42 1966.02,-363.69 1956,-360.61"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1956.82,-358.12 1948.88,-358.34 1955.23,-363.12 1956.82,-358.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3201.31,-375.83 3201.31,-398.63 3245.45,-398.63 3245.45,-375.83 3201.31,-375.83"/>
<text xml:space="preserve" text-anchor="start" x="3204.31" y="-381.63" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI10</text>
</g>
<!-- ix2215&#45;&gt;pve_1 -->
<g id="edge1" class="edge">
<title>ix2215&#45;&gt;pve_1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M4544.58,-458.77C4411.81,-439.12 4262.42,-410.32 4130,-368.7 4119.99,-365.55 4109.86,-362.07 4099.72,-358.34"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="4100.78,-355.93 4092.83,-355.75 4098.93,-360.85 4100.78,-355.93"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="4270.72,-417.18 4270.72,-439.98 4314.86,-439.98 4314.86,-417.18 4270.72,-417.18"/>
<text xml:space="preserve" text-anchor="start" x="4273.72" y="-422.98" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI20</text>
</g>
<!-- ix2215&#45;&gt;pve_2 -->
<g id="edge3" class="edge">
<title>ix2215&#45;&gt;pve_2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M4544.32,-431.17C4405.35,-409.36 4245.92,-387.86 4100,-376.7 4060.78,-373.7 2722.33,-377.52 2684,-368.7 2674.04,-366.41 2664.02,-363.68 2654,-360.59"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2654.82,-358.09 2646.88,-358.31 2653.22,-363.09 2654.82,-358.09"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3550.27,-375.13 3550.27,-397.93 3594.4,-397.93 3594.4,-375.13 3550.27,-375.13"/>
<text xml:space="preserve" text-anchor="start" x="3553.27" y="-380.93" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI30</text>
</g>
<!-- ix2215&#45;&gt;clients -->
<g id="edge6" class="edge">
<title>ix2215&#45;&gt;clients</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M4693.57,-408.79C4614.36,-377.27 4526.83,-342.44 4453.75,-313.36"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="4454.75,-310.94 4446.81,-310.6 4452.81,-315.81 4454.75,-310.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="4524.83,-359.21 4524.83,-382.01 4568.96,-382.01 4568.96,-359.21 4524.83,-359.21"/>
<text xml:space="preserve" text-anchor="start" x="4527.83" y="-365.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI31</text>
</g>
<!-- ix2215&#45;&gt;pve_3 -->
<g id="edge4" class="edge">
<title>ix2215&#45;&gt;pve_3</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M4544.29,-431.59C4405.31,-409.82 4245.89,-388.25 4100,-376.7 4059.68,-373.51 3411.39,-377.87 3372,-368.7 3362.04,-366.38 3352.02,-363.62 3342.01,-360.52"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3342.82,-358.02 3334.88,-358.22 3341.21,-363.02 3342.82,-358.02"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3891.73,-375.39 3891.73,-398.19 3974.79,-398.19 3974.79,-375.39 3891.73,-375.39"/>
<text xml:space="preserve" text-anchor="start" x="3894.73" y="-381.19" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI4 / tag40</text>
</g>
<!-- warp&#45;&gt;pve_1 -->
<g id="edge7" class="edge">
<title>warp&#45;&gt;pve_1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M5431.62,-408.82C5405.5,-395.6 5377.63,-383.98 5350,-376.7 5284.46,-359.43 4196.05,-383.92 4130,-368.7 4120.04,-366.4 4110.02,-363.67 4100,-360.58"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="4100.82,-358.08 4092.88,-358.29 4099.22,-363.08 4100.82,-358.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="4760.9,-371.79 4760.9,-394.59 4990.96,-394.59 4990.96,-371.79 4760.9,-371.79"/>
<text xml:space="preserve" text-anchor="start" x="4763.9" y="-377.59" font-family="Arial" font-size="14.00" fill="#c9c9c9">WARP / private CIDR routes・policy</text>
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
<svg width="1292pt" height="744pt"
 viewBox="0.00 0.00 1292.00 744.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 729.05)">
<g id="clust1" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="436.77,-8 436.77,-359 1254.24,-359 1254.24,-8 436.77,-8"/>
<text xml:space="preserve" text-anchor="start" x="444.77" y="-346.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
</g>
<!-- loockit_a -->
<g id="node1" class="node">
<title>loockit_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="686.9,-298 476.77,-298 476.77,-198 686.9,-198 686.9,-298"/>
<text xml:space="preserve" text-anchor="start" x="486.77" y="-240" font-family="Arial" font-size="20.00" fill="#f8fafc">Loockit 01 / CT12902</text>
</g>
<!-- loockit_b -->
<g id="node2" class="node">
<title>loockit_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="686.9,-148 476.77,-148 476.77,-48 686.9,-48 686.9,-148"/>
<text xml:space="preserve" text-anchor="start" x="486.77" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">Loockit 02 / CT12903</text>
</g>
<!-- bluez -->
<g id="node3" class="node">
<title>bluez</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1214.24,-205 946.33,-205 946.33,-105 1214.24,-105 1214.24,-205"/>
<text xml:space="preserve" text-anchor="start" x="956.34" y="-147" font-family="Arial" font-size="20.00" fill="#f8fafc">BlueZ / Bluetooth（2ノード）</text>
</g>
<!-- client -->
<g id="node4" class="node">
<title>client</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="228.41,-564 48.41,-564 48.41,-464 228.41,-464 228.41,-564"/>
<text xml:space="preserve" text-anchor="start" x="71.73" y="-506" font-family="Arial" font-size="20.00" fill="#f8fafc">専用クライアント</text>
</g>
<!-- mtls -->
<g id="node5" class="node">
<title>mtls</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="241.22,-391 35.61,-391 35.61,-291 241.22,-291 241.22,-391"/>
<text xml:space="preserve" text-anchor="start" x="45.61" y="-333" font-family="Arial" font-size="20.00" fill="#f8fafc">mTLS / 専用APIの例外</text>
</g>
<!-- tunnel -->
<g id="node6" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="228.41,-714 48.41,-714 48.41,-614 228.41,-614 228.41,-714"/>
<text xml:space="preserve" text-anchor="start" x="59.48" y="-656" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- api -->
<g id="node7" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="697.47,-714 466.2,-714 466.2,-614 697.47,-614 697.47,-714"/>
<text xml:space="preserve" text-anchor="start" x="476.21" y="-656" font-family="Arial" font-size="20.00" fill="#f8fafc">Kubernetes API / Lease</text>
</g>
<!-- proxy -->
<g id="node8" class="node">
<title>proxy</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="276.82,-241 0,-241 0,-141 276.82,-141 276.82,-241"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-183" font-family="Arial" font-size="20.00" fill="#f8fafc">互換HAProxy / :8080・:50051</text>
</g>
<!-- loockit_a&#45;&gt;bluez -->
<g id="edge5" class="edge">
<title>loockit_a&#45;&gt;bluez</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M686.6,-228.56C758.98,-215 856.48,-196.74 936.22,-181.8"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="936.48,-184.42 943.37,-180.46 935.52,-179.26 936.48,-184.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="733.69,-220.52 733.69,-243.32 910.1,-243.32 910.1,-220.52 733.69,-220.52"/>
<text xml:space="preserve" text-anchor="start" x="736.69" y="-226.32" font-family="Arial" font-size="14.00" fill="#bbfcd3">pve&#45;x570 / read&#45;only D&#45;Bus</text>
</g>
<!-- loockit_b&#45;&gt;bluez -->
<g id="edge6" class="edge">
<title>loockit_b&#45;&gt;bluez</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M686.72,-104.9C752.64,-109.83 839.66,-117.32 916.33,-127.2 922.93,-128.05 929.67,-128.97 936.47,-129.95"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="935.67,-132.49 943.47,-130.98 936.43,-127.29 935.67,-132.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="727.47,-127.2 727.47,-150 916.33,-150 916.33,-127.2 727.47,-127.2"/>
<text xml:space="preserve" text-anchor="start" x="730.47" y="-133" font-family="Arial" font-size="14.00" fill="#bbfcd3">pve&#45;b550m / read&#45;only D&#45;Bus</text>
</g>
<!-- client&#45;&gt;mtls -->
<g id="edge1" class="edge">
<title>client&#45;&gt;mtls</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M138.41,-464.12C138.41,-444.35 138.41,-421.46 138.41,-400.82"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="141.04,-401.1 138.41,-393.6 135.79,-401.1 141.04,-401.1"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="68.5,-416.1 68.5,-438.9 179.52,-438.9 179.52,-416.1 68.5,-416.1"/>
<text xml:space="preserve" text-anchor="start" x="71.5" y="-421.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">クライアント証明書</text>
</g>
<!-- tunnel&#45;&gt;api -->
<!-- proxy&#45;&gt;loockit_a -->
<g id="edge3" class="edge">
<title>proxy&#45;&gt;loockit_a</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M276.66,-208.72C337.66,-216.6 408.64,-225.76 466.68,-233.26"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="466.21,-235.85 473.99,-234.2 466.88,-230.64 466.21,-235.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="306.82,-227.94 306.82,-250.74 428.77,-250.74 428.77,-227.94 306.82,-227.94"/>
<text xml:space="preserve" text-anchor="start" x="309.82" y="-233.74" font-family="Arial" font-size="14.00" fill="#bbfcd3">readyz / leaderのみ</text>
</g>
<!-- proxy&#45;&gt;loockit_b -->
<g id="edge4" class="edge">
<title>proxy&#45;&gt;loockit_b</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M276.66,-162.08C337.79,-149.21 408.93,-134.22 467.04,-121.97"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="467.23,-124.62 474.03,-120.5 466.15,-119.48 467.23,-124.62"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="306.82,-155.56 306.82,-178.36 428.77,-178.36 428.77,-155.56 306.82,-155.56"/>
<text xml:space="preserve" text-anchor="start" x="309.82" y="-161.36" font-family="Arial" font-size="14.00" fill="#bbfcd3">readyz / leaderのみ</text>
</g>
</g>
</svg>
`;case`recording`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="921pt" height="612pt"
 viewBox="0.00 0.00 921.00 612.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 597.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-574 332,-574 332,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-561.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_recording</title>
<polygon fill="#3e4651" stroke="#2d333d" points="40,-40 40,-521 300,-521 300,-40 40,-40"/>
<text xml:space="preserve" text-anchor="start" x="48" y="-508.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">録画・配信 / EPGSTATION・TNLASTATION</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="535.3,-40 535.3,-404 883.2,-404 883.2,-40 535.3,-40"/>
<text xml:space="preserve" text-anchor="start" x="543.3" y="-391.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
</g>
<!-- epgstation -->
<g id="node1" class="node">
<title>epgstation</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="260,-460 80,-460 80,-360 260,-360 260,-460"/>
<text xml:space="preserve" text-anchor="start" x="117.75" y="-402" font-family="Arial" font-size="20.00" fill="#f8fafc">EPGStation</text>
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
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="260,-180 80,-180 80,-80 260,-80 260,-180"/>
<text xml:space="preserve" text-anchor="start" x="91.08" y="-122" font-family="Arial" font-size="20.00" fill="#eff6ff">TNLaStation STG</text>
</g>
<!-- tuner_stg -->
<g id="node4" class="node">
<title>tuner_stg</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="842.65,-180 575.85,-180 575.85,-80 842.65,-80 842.65,-180"/>
<text xml:space="preserve" text-anchor="start" x="585.86" y="-122" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun STG / LXC12904</text>
</g>
<!-- tuner_prod -->
<g id="node5" class="node">
<title>tuner_prod</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="843.2,-343 575.3,-343 575.3,-243 843.2,-243 843.2,-343"/>
<text xml:space="preserve" text-anchor="start" x="585.3" y="-285" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun PRD / LXC12901</text>
</g>
<!-- epgstation&#45;&gt;tuner_prod -->
<g id="edge1" class="edge">
<title>epgstation&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M259.72,-390.68C342.69,-372.61 468.04,-345.31 565.16,-324.16"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="565.63,-326.75 572.4,-322.58 564.51,-321.62 565.63,-326.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="340,-372.16 340,-394.96 527.3,-394.96 527.3,-372.16 340,-372.16"/>
<text xml:space="preserve" text-anchor="start" x="343" y="-377.96" font-family="Arial" font-size="14.00" fill="#bbfcd3">Service名で接続 / PRD :40772</text>
</g>
<!-- tnlastation&#45;&gt;tuner_prod -->
<g id="edge2" class="edge">
<title>tnlastation&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M259.72,-273.8C342.6,-277.35 467.79,-282.71 564.86,-286.86"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="564.73,-289.48 572.33,-287.18 564.95,-284.24 564.73,-289.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="340,-285.23 340,-308.03 527.3,-308.03 527.3,-285.23 340,-285.23"/>
<text xml:space="preserve" text-anchor="start" x="343" y="-291.03" font-family="Arial" font-size="14.00" fill="#bbfcd3">Service名で接続 / PRD :40772</text>
</g>
<!-- tnlastation_staging&#45;&gt;tuner_stg -->
<g id="edge3" class="edge">
<title>tnlastation_staging&#45;&gt;tuner_stg</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M259.72,-130C342.75,-130 468.22,-130 565.37,-130"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="565.34,-132.63 572.84,-130 565.34,-127.38 565.34,-132.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="340.39,-130 340.39,-152.8 526.91,-152.8 526.91,-130 340.39,-130"/>
<text xml:space="preserve" text-anchor="start" x="343.39" y="-135.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">Service名で接続 / STG :40772</text>
</g>
<!-- tuner_stg&#45;&gt;tuner_prod -->
<g id="edge4" class="edge">
<title>tuner_stg&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M709.25,-179.79C709.25,-196.62 709.25,-215.58 709.25,-233.11"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="706.62,-232.71 709.25,-240.21 711.87,-232.71 706.62,-232.71"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="629.22,-200.1 629.22,-222.9 760.48,-222.9 760.48,-200.1 629.22,-200.1"/>
<text xml:space="preserve" text-anchor="start" x="632.22" y="-205.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">BS/CS TCP fallback</text>
</g>
</g>
</svg>
`;case`nextcloud`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1274pt" height="570pt"
 viewBox="0.00 0.00 1274.00 570.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 555.05)">
<g id="clust1" class="cluster">
<title>cluster_nextcloud</title>
<polygon fill="#3e4651" stroke="#2d333d" points="367.96,-8 367.96,-532 716.96,-532 716.96,-8 367.96,-8"/>
<text xml:space="preserve" text-anchor="start" x="375.96" y="-519.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">NEXTCLOUD</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="900.77,-330 900.77,-515 1236.03,-515 1236.03,-330 900.77,-330"/>
<text xml:space="preserve" text-anchor="start" x="908.77" y="-502.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
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
<!-- nas02 -->
<g id="node4" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1204.03,-452.91C1204.03,-457.93 1143.23,-462 1068.4,-462 993.56,-462 932.77,-457.93 932.77,-452.91 932.77,-452.91 932.77,-371.09 932.77,-371.09 932.77,-366.07 993.56,-362 1068.4,-362 1143.23,-362 1204.03,-366.07 1204.03,-371.09 1204.03,-371.09 1204.03,-452.91 1204.03,-452.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1204.03,-452.91C1204.03,-447.9 1143.23,-443.82 1068.4,-443.82 993.56,-443.82 932.77,-447.9 932.77,-452.91"/>
<text xml:space="preserve" text-anchor="start" x="942.78" y="-404" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- edge -->
<g id="node5" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="180,-298 0,-298 0,-198 180,-198 180,-298"/>
<text xml:space="preserve" text-anchor="start" x="44.42" y="-240" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- mariadb -->
<g id="node6" class="node">
<title>mariadb</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1158.4,-288.91C1158.4,-293.93 1118.06,-298 1068.4,-298 1018.74,-298 978.4,-293.93 978.4,-288.91 978.4,-288.91 978.4,-207.09 978.4,-207.09 978.4,-202.07 1018.74,-198 1068.4,-198 1118.06,-198 1158.4,-202.07 1158.4,-207.09 1158.4,-207.09 1158.4,-288.91 1158.4,-288.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1158.4,-288.91C1158.4,-283.9 1118.06,-279.82 1068.4,-279.82 1018.74,-279.82 978.4,-283.9 978.4,-288.91"/>
<text xml:space="preserve" text-anchor="start" x="1029.5" y="-240" font-family="Arial" font-size="20.00" fill="#ffe0c2">MariaDB</text>
</g>
<!-- web&#45;&gt;redis -->
<g id="edge2" class="edge">
<title>web&#45;&gt;redis</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M542.46,-297.57C542.46,-316.96 542.46,-339.39 542.46,-359.77"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="539.84,-359.69 542.46,-367.19 545.09,-359.69 539.84,-359.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="435.56,-323.1 435.56,-345.9 620.56,-345.9 620.56,-323.1 435.56,-323.1"/>
<text xml:space="preserve" text-anchor="start" x="438.56" y="-328.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">Redis :6379 / locking・cache</text>
</g>
<!-- web&#45;&gt;nas02 -->
<g id="edge4" class="edge">
<title>web&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M676.69,-289.7C751.7,-313.18 845.45,-342.53 922.32,-366.59"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="921.25,-369.01 929.19,-368.74 922.82,-363.99 921.25,-369.01"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="753.35,-356.62 753.35,-379.42 864.38,-379.42 864.38,-356.62 753.35,-356.62"/>
<text xml:space="preserve" text-anchor="start" x="756.35" y="-362.42" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- web&#45;&gt;mariadb -->
<g id="edge3" class="edge">
<title>web&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M676.69,-248C767.11,-248 884.76,-248 967.24,-248"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="967.1,-250.63 974.6,-248 967.1,-245.38 967.1,-250.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="724.96,-248 724.96,-270.8 892.77,-270.8 892.77,-248 724.96,-248"/>
<text xml:space="preserve" text-anchor="start" x="727.96" y="-253.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
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
<svg width="1402pt" height="1513pt"
 viewBox="0.00 0.00 1402.00 1513.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1498.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1c417d" stroke="#1c356c" points="8,-8 8,-1475 1091.44,-1475 1091.44,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1462.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="88.56,-48 88.56,-592 439.82,-592 439.82,-48 88.56,-48"/>
<text xml:space="preserve" text-anchor="start" x="96.56" y="-579.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="48,-632 48,-1414 1051.44,-1414 1051.44,-632 48,-632"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-1401.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_agent</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="131.61,-815 131.61,-1000 396.77,-1000 396.77,-815 131.61,-815"/>
<text xml:space="preserve" text-anchor="start" x="139.61" y="-987.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">自宅監視基盤</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_backups</title>
<polygon fill="#3e4651" stroke="#2d333d" points="631.32,-672 631.32,-1353 1011.44,-1353 1011.44,-672 631.32,-672"/>
<text xml:space="preserve" text-anchor="start" x="639.32" y="-1340.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">バックアップ処理</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1108.44,-466 1108.44,-651 1363.63,-651 1363.63,-466 1108.44,-466"/>
<text xml:space="preserve" text-anchor="start" x="1116.44" y="-638.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<!-- backup_sources -->
<g id="node1" class="node">
<title>backup_sources</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="394.78,-188 133.6,-188 133.6,-88 394.78,-88 394.78,-188"/>
<text xml:space="preserve" text-anchor="start" x="143.61" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">VMバックアップ対象 / 2ノード</text>
</g>
<!-- nas02 -->
<g id="node2" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M399.82,-521.91C399.82,-526.93 339.03,-531 264.19,-531 189.35,-531 128.56,-526.93 128.56,-521.91 128.56,-521.91 128.56,-440.09 128.56,-440.09 128.56,-435.07 189.35,-431 264.19,-431 339.03,-431 399.82,-435.07 399.82,-440.09 399.82,-440.09 399.82,-521.91 399.82,-521.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M399.82,-521.91C399.82,-516.9 339.03,-512.82 264.19,-512.82 189.35,-512.82 128.56,-516.9 128.56,-521.91"/>
<text xml:space="preserve" text-anchor="start" x="138.57" y="-473" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- pbs -->
<g id="node3" class="node">
<title>pbs</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M354.19,-361.91C354.19,-366.93 313.85,-371 264.19,-371 214.53,-371 174.19,-366.93 174.19,-361.91 174.19,-361.91 174.19,-280.09 174.19,-280.09 174.19,-275.07 214.53,-271 264.19,-271 313.85,-271 354.19,-275.07 354.19,-280.09 354.19,-280.09 354.19,-361.91 354.19,-361.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M354.19,-361.91C354.19,-356.9 313.85,-352.82 264.19,-352.82 214.53,-352.82 174.19,-356.9 174.19,-361.91"/>
<text xml:space="preserve" text-anchor="start" x="193.04" y="-313" font-family="Arial" font-size="20.00" fill="#ffe0c2">PBS / VM14001</text>
</g>
<!-- local_store -->
<g id="node4" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M364.77,-937.91C364.77,-942.93 319.69,-947 264.19,-947 208.69,-947 163.61,-942.93 163.61,-937.91 163.61,-937.91 163.61,-856.09 163.61,-856.09 163.61,-851.07 208.69,-847 264.19,-847 319.69,-847 364.77,-851.07 364.77,-856.09 364.77,-856.09 364.77,-937.91 364.77,-937.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M364.77,-937.91C364.77,-932.9 319.69,-928.82 264.19,-928.82 208.69,-928.82 163.61,-932.9 163.61,-937.91"/>
<text xml:space="preserve" text-anchor="start" x="173.62" y="-889" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- nas -->
<g id="node5" class="node">
<title>nas</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="971.44,-812 671.32,-812 671.32,-712 971.44,-712 971.44,-812"/>
<text xml:space="preserve" text-anchor="start" x="681.33" y="-754" font-family="Arial" font-size="20.00" fill="#f8fafc">NAS restic / home&#45;k8s CronJob</text>
</g>
<!-- recordings -->
<g id="node6" class="node">
<title>recordings</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="940.88,-1132 701.89,-1132 701.89,-1032 940.88,-1032 940.88,-1132"/>
<text xml:space="preserve" text-anchor="start" x="711.89" y="-1074" font-family="Arial" font-size="20.00" fill="#f8fafc">録画 / home&#45;k8s CronJob</text>
</g>
<!-- db -->
<g id="node7" class="node">
<title>db</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="956.44,-1292 686.32,-1292 686.32,-1192 956.44,-1192 956.44,-1292"/>
<text xml:space="preserve" text-anchor="start" x="696.33" y="-1234" font-family="Arial" font-size="20.00" fill="#f8fafc">DB logical dump / home&#45;k8s</text>
</g>
<!-- metrics -->
<g id="node8" class="node">
<title>metrics</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="959.22,-972 683.55,-972 683.55,-872 959.22,-872 959.22,-972"/>
<text xml:space="preserve" text-anchor="start" x="693.55" y="-914" font-family="Arial" font-size="20.00" fill="#f8fafc">metrics snapshot / home&#45;k8s</text>
</g>
<!-- recording -->
<g id="node9" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="440.38,-1132 88,-1132 88,-1032 440.38,-1032 440.38,-1132"/>
<text xml:space="preserve" text-anchor="start" x="98.01" y="-1074" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信 / EPGStation・TNLaStation</text>
</g>
<!-- databases -->
<g id="node10" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="354.77,-1292 173.61,-1292 173.61,-1192 354.77,-1192 354.77,-1292"/>
<text xml:space="preserve" text-anchor="start" x="183.62" y="-1234" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- idrive -->
<g id="node11" class="node">
<title>idrive</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1331.63,-588.91C1331.63,-593.93 1288.78,-598 1236.03,-598 1183.28,-598 1140.44,-593.93 1140.44,-588.91 1140.44,-588.91 1140.44,-507.09 1140.44,-507.09 1140.44,-502.07 1183.28,-498 1236.03,-498 1288.78,-498 1331.63,-502.07 1331.63,-507.09 1331.63,-507.09 1331.63,-588.91 1331.63,-588.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1331.63,-588.91C1331.63,-583.9 1288.78,-579.82 1236.03,-579.82 1183.28,-579.82 1140.44,-583.9 1140.44,-588.91"/>
<text xml:space="preserve" text-anchor="start" x="1150.45" y="-540" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2（S3互換）</text>
</g>
<!-- backup_sources&#45;&gt;pbs -->
<g id="edge1" class="edge">
<title>backup_sources&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M264.19,-187.52C264.19,-209.84 264.19,-236.4 264.19,-259.94"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="261.56,-259.64 264.19,-267.14 266.81,-259.64 261.56,-259.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="184.54,-218.1 184.54,-240.9 315.04,-240.9 315.04,-218.1 184.54,-218.1"/>
<text xml:space="preserve" text-anchor="start" x="187.54" y="-223.9" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup / 2ノード</text>
</g>
<!-- nas02&#45;&gt;nas -->
<g id="edge2" class="edge">
<title>nas02&#45;&gt;nas</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M362.53,-530.27C460.39,-579.8 610.91,-655.98 712.39,-707.34"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="711.17,-709.67 719.05,-710.71 713.54,-704.98 711.17,-709.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="491.66,-654.93 491.66,-677.73 612.04,-677.73 612.04,-654.93 491.66,-654.93"/>
<text xml:space="preserve" text-anchor="start" x="494.66" y="-660.73" font-family="Arial" font-size="14.00" fill="#ffe0c2">対象dataset / restic</text>
</g>
<!-- pbs&#45;&gt;idrive -->
<g id="edge4" class="edge">
<title>pbs&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M355.12,-342.05C534.93,-384.13 937.91,-478.46 1129.71,-523.35"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1128.95,-525.87 1136.85,-525.02 1130.14,-520.75 1128.95,-525.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="737.84,-514.29 737.84,-537.09 904.92,-537.09 904.92,-514.29 737.84,-514.29"/>
<text xml:space="preserve" text-anchor="start" x="740.84" y="-520.09" font-family="Arial" font-size="14.00" fill="#ffe0c2">S3 datastore / VM backup</text>
</g>
<!-- local_store&#45;&gt;metrics -->
<g id="edge3" class="edge">
<title>local_store&#45;&gt;metrics</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M365.64,-893.17C437.5,-891.31 536.46,-890.54 623.32,-896.2 639.5,-897.25 656.39,-898.79 673.16,-900.6"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="672.84,-903.2 680.58,-901.42 673.42,-897.99 672.84,-903.2"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="482.7,-896.2 482.7,-919 621,-919 621,-896.2 482.7,-896.2"/>
<text xml:space="preserve" text-anchor="start" x="485.7" y="-902" font-family="Arial" font-size="14.00" fill="#ffe0c2">snapshot / vmbackup</text>
</g>
<!-- metrics&#45;&gt;idrive -->
<g id="edge7" class="edge">
<title>metrics&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1011.44,-887.67C1040.34,-876.49 1068.23,-861.66 1091.44,-842 1163.38,-781.06 1202.4,-675.56 1220.94,-608.89"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1223.42,-609.79 1222.84,-601.86 1218.35,-608.42 1223.42,-609.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1154.76,-743.47 1154.76,-766.27 1342.83,-766.27 1342.83,-743.47 1154.76,-743.47"/>
<text xml:space="preserve" text-anchor="start" x="1157.76" y="-749.27" font-family="Arial" font-size="14.00" fill="#ffe0c2">用途別prefix / 暗号化・retention</text>
</g>
<!-- recording&#45;&gt;recordings -->
<g id="edge5" class="edge">
<title>recording&#45;&gt;recordings</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M440.09,-1082C521.6,-1082 616.86,-1082 691.65,-1082"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="691.53,-1084.63 699.03,-1082 691.53,-1079.38 691.53,-1084.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="492.83,-1082 492.83,-1104.8 610.87,-1104.8 610.87,-1082 492.83,-1082"/>
<text xml:space="preserve" text-anchor="start" x="495.83" y="-1087.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">録画ファイル専用job</text>
</g>
<!-- databases&#45;&gt;db -->
<g id="edge6" class="edge">
<title>databases&#45;&gt;db</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M354.7,-1242C441.43,-1242 574.42,-1242 676.1,-1242"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="675.94,-1244.63 683.44,-1242 675.94,-1239.38 675.94,-1244.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="480.38,-1242 480.38,-1264.8 623.32,-1264.8 623.32,-1242 480.38,-1242"/>
<text xml:space="preserve" text-anchor="start" x="483.38" y="-1247.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">整合性あるlogical dump</text>
</g>
</g>
</svg>
`;case`nfs`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1001pt" height="1448pt"
 viewBox="0.00 0.00 1001.00 1448.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1433.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-1410 351.45,-1410 351.45,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1397.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_recording</title>
<polygon fill="#3e4651" stroke="#2d333d" points="49.73,-828 49.73,-1349 309.73,-1349 309.73,-828 49.73,-828"/>
<text xml:space="preserve" text-anchor="start" x="57.73" y="-1336.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">録画・配信 / EPGSTATION・TNLASTATION</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="611.59,-367 611.59,-728 962.85,-728 962.85,-367 611.59,-367"/>
<text xml:space="preserve" text-anchor="start" x="619.59" y="-715.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
</g>
<!-- epgstation -->
<g id="node1" class="node">
<title>epgstation</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="269.73,-1288 89.73,-1288 89.73,-1188 269.73,-1188 269.73,-1288"/>
<text xml:space="preserve" text-anchor="start" x="127.48" y="-1230" font-family="Arial" font-size="20.00" fill="#f8fafc">EPGStation</text>
</g>
<!-- tnlastation -->
<g id="node2" class="node">
<title>tnlastation</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="269.73,-1128 89.73,-1128 89.73,-1028 269.73,-1028 269.73,-1128"/>
<text xml:space="preserve" text-anchor="start" x="100.25" y="-1070" font-family="Arial" font-size="20.00" fill="#eff6ff">TNLaStation PRD</text>
</g>
<!-- tnlastation_staging -->
<g id="node3" class="node">
<title>tnlastation_staging</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="269.73,-968 89.73,-968 89.73,-868 269.73,-868 269.73,-968"/>
<text xml:space="preserve" text-anchor="start" x="100.81" y="-910" font-family="Arial" font-size="20.00" fill="#eff6ff">TNLaStation STG</text>
</g>
<!-- shared -->
<g id="node4" class="node">
<title>shared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="311.45,-788 48,-788 48,-688 311.45,-688 311.45,-788"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-730" font-family="Arial" font-size="20.00" fill="#f8fafc">共有PV / runner cache・状態</text>
</g>
<!-- nextcloud -->
<g id="node5" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="269.73,-308 89.73,-308 89.73,-208 269.73,-208 269.73,-308"/>
<text xml:space="preserve" text-anchor="start" x="135.26" y="-250" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- databases -->
<g id="node6" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="270.31,-148 89.15,-148 89.15,-48 270.31,-48 270.31,-148"/>
<text xml:space="preserve" text-anchor="start" x="99.16" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- local_store -->
<g id="node7" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M280.31,-618.91C280.31,-623.93 235.22,-628 179.73,-628 124.23,-628 79.15,-623.93 79.15,-618.91 79.15,-618.91 79.15,-537.09 79.15,-537.09 79.15,-532.07 124.23,-528 179.73,-528 235.22,-528 280.31,-532.07 280.31,-537.09 280.31,-537.09 280.31,-618.91 280.31,-618.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M280.31,-618.91C280.31,-613.9 235.22,-609.82 179.73,-609.82 124.23,-609.82 79.15,-613.9 79.15,-618.91"/>
<text xml:space="preserve" text-anchor="start" x="89.16" y="-570" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- coupon_manager -->
<g id="node8" class="node">
<title>coupon_manager</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="269.73,-468 89.73,-468 89.73,-368 269.73,-368 269.73,-468"/>
<text xml:space="preserve" text-anchor="start" x="102.45" y="-410" font-family="Arial" font-size="20.00" fill="#eff6ff">Coupon Manager</text>
</g>
<!-- nas01 -->
<g id="node9" class="node">
<title>nas01</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M922.85,-657.91C922.85,-662.93 862.06,-667 787.22,-667 712.38,-667 651.59,-662.93 651.59,-657.91 651.59,-657.91 651.59,-576.09 651.59,-576.09 651.59,-571.07 712.38,-567 787.22,-567 862.06,-567 922.85,-571.07 922.85,-576.09 922.85,-576.09 922.85,-657.91 922.85,-657.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M922.85,-657.91C922.85,-652.9 862.06,-648.82 787.22,-648.82 712.38,-648.82 651.59,-652.9 651.59,-657.91"/>
<text xml:space="preserve" text-anchor="start" x="661.6" y="-609" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;01 / TrueNAS VM69001</text>
</g>
<!-- nas02 -->
<g id="node10" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M922.85,-497.91C922.85,-502.93 862.06,-507 787.22,-507 712.38,-507 651.59,-502.93 651.59,-497.91 651.59,-497.91 651.59,-416.09 651.59,-416.09 651.59,-411.07 712.38,-407 787.22,-407 862.06,-407 922.85,-411.07 922.85,-416.09 922.85,-416.09 922.85,-497.91 922.85,-497.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M922.85,-497.91C922.85,-492.9 862.06,-488.82 787.22,-488.82 712.38,-488.82 651.59,-492.9 651.59,-497.91"/>
<text xml:space="preserve" text-anchor="start" x="661.6" y="-449" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- epgstation&#45;&gt;nas02 -->
<g id="edge6" class="edge">
<title>epgstation&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M269.44,-1207.94C297.75,-1195.48 327.82,-1178.96 351.45,-1158 509.8,-1017.56 541.57,-956.36 603.59,-754 610.66,-730.93 598.19,-557.06 611.59,-537 619.79,-524.72 630.38,-514.3 642.29,-505.45"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="643.59,-507.75 648.25,-501.31 640.59,-503.44 643.59,-507.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="375.03,-1149.67 375.03,-1172.47 588.01,-1172.47 588.01,-1149.67 375.03,-1149.67"/>
<text xml:space="preserve" text-anchor="start" x="378.03" y="-1155.47" font-family="Arial" font-size="14.00" fill="#bbfcd3">recorded・thumbnail・drop / NFS</text>
</g>
<!-- tnlastation&#45;&gt;nas02 -->
<g id="edge7" class="edge">
<title>tnlastation&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M269.72,-1057.22C300.91,-1045.25 332.78,-1026.66 351.45,-998 362.4,-981.2 346.64,-652.62 359.45,-637.2 430.29,-551.92 526.98,-666.13 603.59,-586 618.84,-570.05 598.21,-554.55 611.59,-537 620.13,-525.8 630.61,-516.11 642.16,-507.75"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="643.52,-510 648.24,-503.6 640.56,-505.66 643.52,-510"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="393.32,-637.2 393.32,-660 569.73,-660 569.73,-637.2 393.32,-637.2"/>
<text xml:space="preserve" text-anchor="start" x="396.32" y="-643" font-family="Arial" font-size="14.00" fill="#bbfcd3">recorded・tnlastation / NFS</text>
</g>
<!-- tnlastation_staging&#45;&gt;nas02 -->
<g id="edge8" class="edge">
<title>tnlastation_staging&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M269.72,-910.73C300.52,-903.47 332.13,-889.72 351.45,-864 362.42,-849.4 347.6,-549.29 359.45,-535.4 368.84,-524.41 520.45,-498.4 640.33,-479.34"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="640.74,-481.94 647.74,-478.17 639.92,-476.75 640.74,-481.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="359.45,-535.4 359.45,-575 603.59,-575 603.59,-535.4 359.45,-535.4"/>
<text xml:space="preserve" text-anchor="start" x="362.45" y="-558" font-family="Arial" font-size="14.00" fill="#bbfcd3">recorded&#45;staging・tnlastation&#45;staging /</text>
<text xml:space="preserve" text-anchor="start" x="362.45" y="-541.2" font-family="Arial" font-size="14.00" fill="#bbfcd3">NFS</text>
</g>
<!-- shared&#45;&gt;nas01 -->
<g id="edge1" class="edge">
<title>shared&#45;&gt;nas01</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M311.24,-723.46C395.32,-712.82 506.63,-696.33 603.59,-674 615.72,-671.21 628.22,-668.01 640.71,-664.58"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="641.28,-667.15 647.8,-662.61 639.87,-662.09 641.28,-667.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="417.83,-716.47 417.83,-739.27 545.21,-739.27 545.21,-716.47 417.83,-716.47"/>
<text xml:space="preserve" text-anchor="start" x="420.83" y="-722.27" font-family="Arial" font-size="14.00" fill="#bbfcd3">runner cache / NFS</text>
</g>
<!-- nextcloud&#45;&gt;nas02 -->
<g id="edge2" class="edge">
<title>nextcloud&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M269.47,-253.4C357.71,-252.1 495.18,-259.07 603.59,-305.2 653.14,-326.29 699.68,-365.37 733.37,-398.6"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="731.49,-400.44 738.65,-403.89 735.21,-396.73 731.49,-400.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="426,-305.2 426,-328 537.04,-328 537.04,-305.2 426,-305.2"/>
<text xml:space="preserve" text-anchor="start" x="429" y="-311" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- databases&#45;&gt;nas02 -->
<g id="edge3" class="edge">
<title>databases&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M270.23,-106.82C360.94,-119.36 502,-149.08 603.59,-218.2 671.04,-264.09 724.2,-342.96 755.38,-397.43"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="752.92,-398.42 758.9,-403.66 757.5,-395.83 752.92,-398.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="432.63,-218.2 432.63,-241 530.42,-241 530.42,-218.2 432.63,-218.2"/>
<text xml:space="preserve" text-anchor="start" x="435.63" y="-224" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
<!-- local_store&#45;&gt;nas02 -->
<g id="edge4" class="edge">
<title>local_store&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M281.11,-550.22C307.69,-538.24 333.86,-521.42 351.45,-498 365.18,-479.73 342.08,-462.05 359.45,-447.2 435.33,-382.33 549.52,-388.44 640.68,-408.79"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="639.99,-411.33 647.89,-410.46 641.17,-406.21 639.99,-411.33"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="419.79,-447.2 419.79,-470 543.25,-470 543.25,-447.2 419.79,-447.2"/>
<text xml:space="preserve" text-anchor="start" x="422.79" y="-453" font-family="Arial" font-size="14.00" fill="#bbfcd3">metrics用NFS PVC</text>
</g>
<!-- coupon_manager&#45;&gt;nas02 -->
<g id="edge5" class="edge">
<title>coupon_manager&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M269.35,-382.69C297.67,-373.08 329.46,-364.01 359.45,-359.2 466.59,-342.03 498.35,-332.79 603.59,-359.2 637.73,-367.77 672.46,-384.08 702.34,-400.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="701.02,-403.23 708.83,-404.7 703.64,-398.68 701.02,-403.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="365.31,-359.2 365.31,-382 597.74,-382 597.74,-359.2 365.31,-359.2"/>
<text xml:space="preserve" text-anchor="start" x="368.31" y="-365" font-family="Arial" font-size="14.00" fill="#bbfcd3">images・Data Protection keys / PVC</text>
</g>
</g>
</svg>
`;case`power`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2430pt" height="825pt"
 viewBox="0.00 0.00 2430.00 825.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 810.05)">
<g id="clust1" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-140 8,-787 2392.2,-787 2392.2,-140 8,-140"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-774.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_ups</title>
<polygon fill="#3e4651" stroke="#2d333d" points="48,-180 48,-586 2352.2,-586 2352.2,-180 48,-180"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-573.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">UPS / NUT</text>
</g>
<!-- ups_a -->
<g id="node1" class="node">
<title>ups_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="740.26,-348.01 472.34,-348.01 472.34,-248 740.26,-248 740.26,-348.01"/>
<text xml:space="preserve" text-anchor="start" x="482.34" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS A / APC RS550S 2020</text>
</g>
<!-- ups_b -->
<g id="node2" class="node">
<title>ups_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1203.97,-525.01 936.05,-525.01 936.05,-425 1203.97,-425 1203.97,-525.01"/>
<text xml:space="preserve" text-anchor="start" x="946.05" y="-467" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS B / APC RS550S 2025</text>
</g>
<!-- mains -->
<g id="node3" class="node">
<title>mains</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268,-348.01 88,-348.01 88,-248 268,-248 268,-348.01"/>
<text xml:space="preserve" text-anchor="start" x="147.44" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">商用AC</text>
</g>
<!-- surge_a -->
<g id="node4" class="node">
<title>surge_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="753.58,-525.01 459.02,-525.01 459.02,-425 753.58,-425 753.58,-525.01"/>
<text xml:space="preserve" text-anchor="start" x="469.03" y="-467" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS A / サージのみ口・非backup</text>
</g>
<!-- pi_a -->
<g id="node5" class="node">
<title>pi_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1691.82,-382.01 1423.87,-382.01 1423.87,-282 1691.82,-282 1691.82,-382.01"/>
<text xml:space="preserve" text-anchor="start" x="1433.88" y="-324" font-family="Arial" font-size="20.00" fill="#f8fafc">NUT Pi 01 / 192.168.10.112</text>
</g>
<!-- pi_b -->
<g id="node6" class="node">
<title>pi_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2312.2,-337.01 2044.24,-337.01 2044.24,-237 2312.2,-237 2312.2,-337.01"/>
<text xml:space="preserve" text-anchor="start" x="2054.25" y="-279" font-family="Arial" font-size="20.00" fill="#f8fafc">NUT Pi 02 / 192.168.10.113</text>
</g>
<!-- network -->
<g id="node7" class="node">
<title>network</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1647.85,-726.01 1467.85,-726.01 1467.85,-626 1647.85,-626 1647.85,-726.01"/>
<text xml:space="preserve" text-anchor="start" x="1491.17" y="-668" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- pve -->
<g id="node8" class="node">
<title>pve</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="1720.67,-100.01 1395.02,-100.01 1395.02,0 1720.67,0 1720.67,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="1405.03" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox VEクラスタ（2ノード構成）</text>
</g>
<!-- ups_a&#45;&gt;pi_a -->
<g id="edge2" class="edge">
<title>ups_a&#45;&gt;pi_a</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M740.08,-302.76C917.5,-309.11 1230.7,-320.33 1413.38,-326.87"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1413.26,-329.49 1420.85,-327.13 1413.45,-324.24 1413.26,-329.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1029.27,-318.94 1029.27,-341.74 1110.75,-341.74 1110.75,-318.94 1029.27,-318.94"/>
<text xml:space="preserve" text-anchor="start" x="1032.27" y="-324.74" font-family="Arial" font-size="14.00" fill="#c9c9c9">USB / ups&#45;a</text>
</g>
<!-- ups_a&#45;&gt;pi_b -->
<g id="edge3" class="edge">
<title>ups_a&#45;&gt;pi_b</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M739.96,-288.11C896.44,-276.94 1164.48,-259.36 1395.02,-252 1557.45,-246.82 1598.16,-250.45 1760.67,-250 1868.92,-249.71 1896.59,-238.62 2004.24,-250 2014.09,-251.05 2024.2,-252.41 2034.36,-254"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="2033.7,-256.56 2041.53,-255.18 2034.55,-251.38 2033.7,-256.56"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1263.04,-257.85 1263.04,-280.65 1335.95,-280.65 1335.95,-257.85 1263.04,-257.85"/>
<text xml:space="preserve" text-anchor="start" x="1266.04" y="-263.65" font-family="Arial" font-size="14.00" fill="#fcd9d2">Pi 02へ給電</text>
</g>
<!-- ups_a&#45;&gt;pve -->
<g id="edge1" class="edge">
<title>ups_a&#45;&gt;pve</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M695.8,-248.14C726.1,-232.61 760.67,-216.56 793.58,-205 990.67,-135.82 1227.84,-93.69 1384.94,-71.16"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1385.12,-73.78 1392.18,-70.13 1384.38,-68.58 1385.12,-73.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1020.71,-159.87 1020.71,-182.67 1119.31,-182.67 1119.31,-159.87 1020.71,-159.87"/>
<text xml:space="preserve" text-anchor="start" x="1023.71" y="-165.67" font-family="Arial" font-size="14.00" fill="#fcd9d2">pve&#45;x570へ給電</text>
</g>
<!-- ups_b&#45;&gt;pi_a -->
<g id="edge6" class="edge">
<title>ups_b&#45;&gt;pi_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1203.77,-435.93C1269.11,-416.7 1347.93,-393.49 1414.52,-373.9"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1414.89,-376.52 1421.35,-371.89 1413.41,-371.49 1414.89,-376.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1263.04,-420.52 1263.04,-443.32 1335.95,-443.32 1335.95,-420.52 1263.04,-420.52"/>
<text xml:space="preserve" text-anchor="start" x="1266.04" y="-426.32" font-family="Arial" font-size="14.00" fill="#fcd9d2">Pi 01へ給電</text>
</g>
<!-- ups_b&#45;&gt;pi_b -->
<g id="edge7" class="edge">
<title>ups_b&#45;&gt;pi_b</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1203.79,-473.67C1387.48,-468.59 1727.77,-447.48 2004.24,-364 2024.89,-357.77 2046.31,-349.67 2066.76,-341.08"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2067.75,-343.51 2073.61,-338.15 2065.68,-338.68 2067.75,-343.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1517.11,-463.91 1517.11,-486.71 1598.58,-486.71 1598.58,-463.91 1517.11,-463.91"/>
<text xml:space="preserve" text-anchor="start" x="1520.11" y="-469.71" font-family="Arial" font-size="14.00" fill="#c9c9c9">USB / ups&#45;b</text>
</g>
<!-- ups_b&#45;&gt;network -->
<g id="edge5" class="edge">
<title>ups_b&#45;&gt;network</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1191.73,-524.95C1273.93,-558.95 1381.37,-603.4 1458.38,-635.27"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1457.36,-637.69 1465.3,-638.13 1459.37,-632.83 1457.36,-637.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1255.66,-587.54 1255.66,-610.34 1343.33,-610.34 1343.33,-587.54 1255.66,-587.54"/>
<text xml:space="preserve" text-anchor="start" x="1258.66" y="-593.34" font-family="Arial" font-size="14.00" fill="#fcd9d2">NW機器へ給電</text>
</g>
<!-- ups_b&#45;&gt;pve -->
<g id="edge4" class="edge">
<title>ups_b&#45;&gt;pve</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1160.78,-425.15C1177.27,-412.37 1192.79,-397.27 1203.97,-380 1252.75,-304.74 1187.21,-251.65 1243.97,-182.2 1265.09,-156.37 1328.7,-127.53 1393.09,-103.41"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1393.63,-106 1399.75,-100.93 1391.81,-101.08 1393.63,-106"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1243.97,-182.2 1243.97,-205 1355.02,-205 1355.02,-182.2 1243.97,-182.2"/>
<text xml:space="preserve" text-anchor="start" x="1246.97" y="-188" font-family="Arial" font-size="14.00" fill="#fcd9d2">pve&#45;b550mへ給電</text>
</g>
<!-- mains&#45;&gt;ups_a -->
<g id="edge10" class="edge">
<title>mains&#45;&gt;ups_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M267.85,-298C324.02,-298 397.89,-298 462.19,-298"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="461.9,-300.63 469.4,-298 461.9,-295.38 461.9,-300.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="339.12,-298 339.12,-320.8 387.9,-320.8 387.9,-298 339.12,-298"/>
<text xml:space="preserve" text-anchor="start" x="342.12" y="-303.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">AC入力</text>
</g>
<!-- mains&#45;&gt;surge_a -->
<g id="edge11" class="edge">
<title>mains&#45;&gt;surge_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M267.85,-334.89C327.98,-359.86 408.39,-393.25 475.63,-421.17"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="474.3,-423.46 482.24,-423.91 476.32,-418.61 474.3,-423.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="308,-397.1 308,-419.9 419.02,-419.9 419.02,-397.1 308,-397.1"/>
<text xml:space="preserve" text-anchor="start" x="311" y="-402.9" font-family="Arial" font-size="14.00" fill="#fcd9d2">非バックアップ出力</text>
</g>
<!-- surge_a&#45;&gt;ups_b -->
<g id="edge12" class="edge">
<title>surge_a&#45;&gt;ups_b</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M753.39,-475C808.49,-475 871.07,-475 925.89,-475"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="925.87,-477.63 933.37,-475 925.87,-472.38 925.87,-477.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="793.58,-475 793.58,-497.8 896.05,-497.8 896.05,-475 793.58,-475"/>
<text xml:space="preserve" text-anchor="start" x="796.58" y="-480.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">UPS BのAC入力</text>
</g>
<!-- pi_a&#45;&gt;pi_b -->
<g id="edge13" class="edge">
<title>pi_a&#45;&gt;pi_b</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1691.59,-328.9C1780.26,-326.05 1899.41,-320.73 2004.24,-311 2014.09,-310.09 2024.24,-309.02 2034.45,-307.85"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="2034.52,-310.48 2041.67,-307 2033.91,-305.27 2034.52,-310.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1760.67,-326.3 1760.67,-349.1 2004.24,-349.1 2004.24,-326.3 1760.67,-326.3"/>
<text xml:space="preserve" text-anchor="start" x="1763.67" y="-332.1" font-family="Arial" font-size="14.00" fill="#d4f2ff">ups&#45;b@192.168.10.113 / 給電元Bを監視</text>
</g>
<!-- pi_b&#45;&gt;pi_a -->
<g id="edge14" class="edge">
<title>pi_b&#45;&gt;pi_a</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M2044.34,-271.48C1962.22,-264.72 1854.89,-260.98 1760.67,-274.2 1741.46,-276.9 1721.51,-280.97 1701.97,-285.74"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1701.36,-283.18 1694.73,-287.55 1702.64,-288.27 1701.36,-283.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1760.67,-274.2 1760.67,-297 2004.24,-297 2004.24,-274.2 1760.67,-274.2"/>
<text xml:space="preserve" text-anchor="start" x="1763.67" y="-280" font-family="Arial" font-size="14.00" fill="#d4f2ff">ups&#45;a@192.168.10.112 / 給電元Aを監視</text>
</g>
<!-- pve&#45;&gt;pi_a -->
<g id="edge8" class="edge">
<title>pve&#45;&gt;pi_a</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1557.85,-99.77C1557.85,-147.85 1557.85,-220.72 1557.85,-271.99"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1555.22,-271.73 1557.85,-279.23 1560.47,-271.73 1555.22,-271.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1462.63,-179.6 1462.63,-202.4 1624.26,-202.4 1624.26,-179.6 1462.63,-179.6"/>
<text xml:space="preserve" text-anchor="start" x="1465.63" y="-185.4" font-family="Arial" font-size="14.00" fill="#d4f2ff">pve&#45;x570 / 残量80%で停止</text>
</g>
<!-- pve&#45;&gt;pi_b -->
<g id="edge9" class="edge">
<title>pve&#45;&gt;pi_b</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1720.6,-87.33C1806.72,-109.84 1913.33,-141.97 2004.24,-182.2 2035.23,-195.92 2067.44,-214.19 2095.55,-231.63"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="2093.82,-233.64 2101.56,-235.4 2096.6,-229.19 2093.82,-233.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1795.42,-182.2 1795.42,-205 1969.49,-205 1969.49,-182.2 1795.42,-182.2"/>
<text xml:space="preserve" text-anchor="start" x="1798.42" y="-188" font-family="Arial" font-size="14.00" fill="#d4f2ff">pve&#45;b550m / 残量80%で停止</text>
</g>
</g>
</svg>
`;case`recording_prd`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1911pt" height="810pt"
 viewBox="0.00 0.00 1911.00 810.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 795.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-772 1504.71,-772 1504.71,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-759.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_tnlastation</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="48,-48 48,-571 1464.71,-571 1464.71,-48 48,-48"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-558.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TNLASTATION PRD</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="1521.71,-73 1521.71,-414 1872.96,-414 1872.96,-73 1521.71,-73"/>
<text xml:space="preserve" text-anchor="start" x="1529.71" y="-401.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
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
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1424.71,-353 1219.09,-353 1219.09,-253 1424.71,-253 1424.71,-353"/>
<text xml:space="preserve" text-anchor="start" x="1229.09" y="-295" font-family="Arial" font-size="20.00" fill="#f8fafc">MediaMTX / HLS配信</text>
</g>
<!-- postgres -->
<g id="node8" class="node">
<title>postgres</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1411.9,-701.91C1411.9,-706.93 1371.56,-711 1321.9,-711 1272.24,-711 1231.9,-706.93 1231.9,-701.91 1231.9,-701.91 1231.9,-620.09 1231.9,-620.09 1231.9,-615.07 1272.24,-611 1321.9,-611 1371.56,-611 1411.9,-615.07 1411.9,-620.09 1411.9,-620.09 1411.9,-701.91 1411.9,-701.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1411.9,-701.91C1411.9,-696.9 1371.56,-692.82 1321.9,-692.82 1272.24,-692.82 1231.9,-696.9 1231.9,-701.91"/>
<text xml:space="preserve" text-anchor="start" x="1243.53" y="-653" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL PRD</text>
</g>
<!-- nas02 -->
<g id="node9" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1832.96,-343.91C1832.96,-348.93 1772.17,-353 1697.34,-353 1622.5,-353 1561.71,-348.93 1561.71,-343.91 1561.71,-343.91 1561.71,-262.09 1561.71,-262.09 1561.71,-257.07 1622.5,-253 1697.34,-253 1772.17,-253 1832.96,-257.07 1832.96,-262.09 1832.96,-262.09 1832.96,-343.91 1832.96,-343.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1832.96,-343.91C1832.96,-338.9 1772.17,-334.82 1697.34,-334.82 1622.5,-334.82 1561.71,-338.9 1561.71,-343.91"/>
<text xml:space="preserve" text-anchor="start" x="1571.72" y="-295" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- tuner_prod -->
<g id="node10" class="node">
<title>tuner_prod</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1831.29,-213 1563.38,-213 1563.38,-113 1831.29,-113 1831.29,-213"/>
<text xml:space="preserve" text-anchor="start" x="1573.39" y="-155" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun PRD / LXC12901</text>
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
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M267.61,-278C296.07,-266.56 328.17,-255.75 358.79,-250 662.2,-193.02 1028.13,-245.73 1208.78,-279.6"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1208.26,-282.17 1216.11,-280.99 1209.23,-277.01 1208.26,-282.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="645.68,-225.16 645.68,-247.96 678.91,-247.96 678.91,-225.16 645.68,-225.16"/>
<text xml:space="preserve" text-anchor="start" x="648.68" y="-230.96" font-family="Arial" font-size="14.00" fill="#bbfcd3">HLS</text>
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
<!-- backend&#45;&gt;postgres -->
<g id="edge6" class="edge">
<title>backend&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M525.27,-369.87C575.09,-416.78 655.3,-486.16 735.7,-530 891.46,-614.93 1099.16,-644.84 1220.63,-655.34"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1220.32,-657.95 1228.01,-655.96 1220.75,-652.72 1220.32,-657.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="814.61,-616.66 814.61,-639.46 896.87,-639.46 896.87,-616.66 814.61,-616.66"/>
<text xml:space="preserve" text-anchor="start" x="817.61" y="-622.46" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- backend&#45;&gt;tuner_prod -->
<g id="edge7" class="edge">
<title>backend&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M526.74,-270.03C551.91,-249.04 583.81,-226.79 616.89,-215 935.97,-101.29 1341.88,-122.1 1553.44,-144.25"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1552.93,-146.84 1560.67,-145.02 1553.49,-141.62 1552.93,-146.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1003.79,-136.18 1003.79,-158.98 1191.09,-158.98 1191.09,-136.18 1003.79,-136.18"/>
<text xml:space="preserve" text-anchor="start" x="1006.79" y="-141.98" font-family="Arial" font-size="14.00" fill="#bbfcd3">Service名で接続 / PRD :40772</text>
</g>
<!-- encode&#45;&gt;postgres -->
<g id="edge8" class="edge">
<title>encode&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M964.64,-498.6C1030.82,-523.2 1116.82,-556.81 1191.09,-591.2 1202.93,-596.68 1215.2,-602.75 1227.27,-608.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1225.89,-611.2 1233.76,-612.32 1228.31,-606.54 1225.89,-611.2"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1059.8,-591.2 1059.8,-614 1135.07,-614 1135.07,-591.2 1059.8,-591.2"/>
<text xml:space="preserve" text-anchor="start" x="1062.8" y="-597" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode状態</text>
</g>
<!-- streaming&#45;&gt;mediamtx -->
<g id="edge9" class="edge">
<title>streaming&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M975.77,-301.72C985.23,-300.71 994.66,-299.84 1003.79,-299.2 1086.83,-293.36 1107.85,-297.98 1191.09,-299.2 1196.94,-299.29 1202.93,-299.39 1208.99,-299.52"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1208.63,-302.13 1216.19,-299.67 1208.75,-296.89 1208.63,-302.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1082.77,-299.2 1082.77,-322 1112.11,-322 1112.11,-299.2 1082.77,-299.2"/>
<text xml:space="preserve" text-anchor="start" x="1085.77" y="-305" font-family="Arial" font-size="14.00" fill="#bbfcd3">配信</text>
</g>
<!-- mediamtx&#45;&gt;nas02 -->
<g id="edge10" class="edge">
<title>mediamtx&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1464.71,-303C1492.76,-303 1522.26,-303 1550.45,-303"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1550.28,-305.63 1557.78,-303 1550.28,-300.38 1550.28,-305.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1336.18,-280.2 1336.18,-303 1512.59,-303 1512.59,-280.2 1336.18,-280.2"/>
<text xml:space="preserve" text-anchor="start" x="1339.18" y="-286" font-family="Arial" font-size="14.00" fill="#bbfcd3">recorded・tnlastation / NFS</text>
</g>
</g>
</svg>
`;case`recording_stg`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1910pt" height="810pt"
 viewBox="0.00 0.00 1910.00 810.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 795.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-772 1503.93,-772 1503.93,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-759.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">HOME&#45;K8S（TALOS LINUX）</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_tnlastation_staging</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="48,-48 48,-571 1463.93,-571 1463.93,-48 48,-48"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-558.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TNLASTATION STG</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_pve</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="1520.93,-73 1520.93,-414 1872.19,-414 1872.19,-73 1520.93,-73"/>
<text xml:space="preserve" text-anchor="start" x="1528.93" y="-401.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PROXMOX VEクラスタ（2ノード構成）</text>
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
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1423.93,-353 1218.31,-353 1218.31,-253 1423.93,-253 1423.93,-353"/>
<text xml:space="preserve" text-anchor="start" x="1228.32" y="-295" font-family="Arial" font-size="20.00" fill="#f8fafc">MediaMTX / HLS配信</text>
</g>
<!-- postgres_staging -->
<g id="node8" class="node">
<title>postgres_staging</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1411.12,-701.91C1411.12,-706.93 1370.78,-711 1321.12,-711 1271.46,-711 1231.12,-706.93 1231.12,-701.91 1231.12,-701.91 1231.12,-620.09 1231.12,-620.09 1231.12,-615.07 1271.46,-611 1321.12,-611 1370.78,-611 1411.12,-615.07 1411.12,-620.09 1411.12,-620.09 1411.12,-701.91 1411.12,-701.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1411.12,-701.91C1411.12,-696.9 1370.78,-692.82 1321.12,-692.82 1271.46,-692.82 1231.12,-696.9 1231.12,-701.91"/>
<text xml:space="preserve" text-anchor="start" x="1243.31" y="-653" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL STG</text>
</g>
<!-- nas02 -->
<g id="node9" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1832.19,-343.91C1832.19,-348.93 1771.39,-353 1696.56,-353 1621.72,-353 1560.93,-348.93 1560.93,-343.91 1560.93,-343.91 1560.93,-262.09 1560.93,-262.09 1560.93,-257.07 1621.72,-253 1696.56,-253 1771.39,-253 1832.19,-257.07 1832.19,-262.09 1832.19,-262.09 1832.19,-343.91 1832.19,-343.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1832.19,-343.91C1832.19,-338.9 1771.39,-334.82 1696.56,-334.82 1621.72,-334.82 1560.93,-338.9 1560.93,-343.91"/>
<text xml:space="preserve" text-anchor="start" x="1570.94" y="-295" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / TrueNAS VM69002</text>
</g>
<!-- tuner_stg -->
<g id="node10" class="node">
<title>tuner_stg</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1829.95,-213 1563.16,-213 1563.16,-113 1829.95,-113 1829.95,-213"/>
<text xml:space="preserve" text-anchor="start" x="1573.17" y="-155" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun STG / LXC12904</text>
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
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M267.61,-278C296.07,-266.56 328.17,-255.75 358.79,-250 661.95,-193.06 1027.59,-245.76 1208.09,-279.61"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1207.56,-282.18 1215.42,-280.99 1208.54,-277.02 1207.56,-282.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="645.68,-225.18 645.68,-247.98 678.91,-247.98 678.91,-225.18 645.68,-225.18"/>
<text xml:space="preserve" text-anchor="start" x="648.68" y="-230.98" font-family="Arial" font-size="14.00" fill="#bbfcd3">HLS</text>
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
<!-- backend&#45;&gt;postgres_staging -->
<g id="edge6" class="edge">
<title>backend&#45;&gt;postgres_staging</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M525.27,-369.87C575.09,-416.78 655.3,-486.16 735.7,-530 891.26,-614.82 1098.68,-644.77 1219.98,-655.31"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1219.66,-657.91 1227.35,-655.93 1220.1,-652.68 1219.66,-657.91"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="814.61,-616.59 814.61,-639.39 896.87,-639.39 896.87,-616.59 814.61,-616.59"/>
<text xml:space="preserve" text-anchor="start" x="817.61" y="-622.39" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- backend&#45;&gt;tuner_stg -->
<g id="edge7" class="edge">
<title>backend&#45;&gt;tuner_stg</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M526.74,-270.03C551.91,-249.04 583.81,-226.79 616.89,-215 935.96,-101.29 1341.91,-122.18 1553.2,-144.32"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1552.67,-146.9 1560.41,-145.09 1553.23,-141.68 1552.67,-146.9"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1003.79,-136.22 1003.79,-159.02 1190.31,-159.02 1190.31,-136.22 1003.79,-136.22"/>
<text xml:space="preserve" text-anchor="start" x="1006.79" y="-142.02" font-family="Arial" font-size="14.00" fill="#bbfcd3">Service名で接続 / STG :40772</text>
</g>
<!-- encode&#45;&gt;postgres_staging -->
<g id="edge8" class="edge">
<title>encode&#45;&gt;postgres_staging</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M964.38,-498.63C1030.41,-523.24 1116.21,-556.85 1190.31,-591.2 1202.15,-596.69 1214.42,-602.76 1226.49,-608.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1225.11,-611.21 1232.98,-612.33 1227.53,-606.55 1225.11,-611.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1059.41,-591.2 1059.41,-614 1134.68,-614 1134.68,-591.2 1059.41,-591.2"/>
<text xml:space="preserve" text-anchor="start" x="1062.41" y="-597" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode状態</text>
</g>
<!-- streaming&#45;&gt;mediamtx -->
<g id="edge9" class="edge">
<title>streaming&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M975.77,-301.72C985.23,-300.71 994.66,-299.84 1003.79,-299.2 1086.48,-293.38 1107.42,-297.99 1190.31,-299.2 1196.16,-299.29 1202.15,-299.39 1208.21,-299.52"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1207.85,-302.13 1215.41,-299.67 1207.97,-296.89 1207.85,-302.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1082.38,-299.2 1082.38,-322 1111.72,-322 1111.72,-299.2 1082.38,-299.2"/>
<text xml:space="preserve" text-anchor="start" x="1085.38" y="-305" font-family="Arial" font-size="14.00" fill="#bbfcd3">配信</text>
</g>
<!-- mediamtx&#45;&gt;nas02 -->
<g id="edge10" class="edge">
<title>mediamtx&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1463.93,-303C1491.98,-303 1521.48,-303 1549.67,-303"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1549.5,-305.63 1557,-303 1549.5,-300.38 1549.5,-305.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1267.68,-263.4 1267.68,-303 1511.81,-303 1511.81,-263.4 1267.68,-263.4"/>
<text xml:space="preserve" text-anchor="start" x="1270.68" y="-286" font-family="Arial" font-size="14.00" fill="#bbfcd3">recorded&#45;staging・tnlastation&#45;staging /</text>
<text xml:space="preserve" text-anchor="start" x="1270.68" y="-269.2" font-family="Arial" font-size="14.00" fill="#bbfcd3">NFS</text>
</g>
</g>
</svg>
`;default:throw Error(`Unknown viewId: `+e)}};export{e as dotSource,t as svgSource};