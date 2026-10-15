var e=e=>{switch(e){case`index`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_rankBlocks=1,
        likec4_viewId=index,
        newrank=true,
        nodesep=1.112,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
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
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TALOS / HOME-K8S</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            agent [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">自宅監視基盤</FONT>>,
                likec4_id="premises.home.agent",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            nextcloud [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
                likec4_id="premises.home.nextcloud",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            eso [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
                likec4_id="premises.home.eso",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_data {
            graph [color="#313131",
                fillcolor="#454545",
                label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>保存・バックアップ</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.data",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            pbs [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Proxmox Backup Server</FONT>>,
                likec4_id="premises.data.pbs",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
            nas [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">TrueNAS VM ×2 / ZFS・NFS</FONT>>,
                likec4_id="premises.data.nas",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
            backups [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">バックアップ処理</FONT>>,
                likec4_id="premises.data.backups",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
    }
    subgraph cluster_monitoring {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>監視</B></FONT>>,
            likec4_depth=1,
            likec4_id=monitoring,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        vms [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">OCI監視VM / STG・PRD</FONT>>,
            likec4_id="monitoring.vms",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    subgraph cluster_external {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス / SAAS・公開サービス</B></FONT>>,
            likec4_depth=2,
            likec4_id=external,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_edge {
            graph [color="#462a17",
                fillcolor="#5a3620",
                label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>CLOUDFLARE</B></FONT>>,
                likec4_depth=1,
                likec4_id="external.edge",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            tunnel [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
                likec4_id="external.edge.tunnel",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            access [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Access / 認証</FONT>>,
                likec4_id="external.edge.access",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        bws [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Bitwarden Secrets Manager</FONT>>,
            likec4_id="external.bws",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        grafana [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Grafana Cloud / PDC</FONT>>,
            likec4_id="external.grafana",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        idrive [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">IDrive e2 / S3</FONT>>,
            likec4_id="external.idrive",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    subgraph cluster_control {
        graph [color="#462a17",
            fillcolor="#5a3620",
            label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>変更・運用</B></FONT>>,
            likec4_depth=1,
            likec4_id=control,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        argo [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
            likec4_id="control.argo",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    {
        graph [rank=source];
        operator [color="#2d5d39",
            fillcolor="#428a4f",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">管理者</FONT>>,
            likec4_id=operator,
            likec4_level=0,
            margin="0.139,0.139",
            width=2.5];
        user [color="#2d5d39",
            fillcolor="#428a4f",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">利用者</FONT>>,
            likec4_id=user,
            likec4_level=0,
            margin="0.139,0.139",
            width=2.5];
        bws;
    }
    operator -> access [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">管理認証</FONT></TD></TR></TABLE>>,
        likec4_id="1mzdjyo",
        style=dashed,
        weight=2];
    operator -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">照会</FONT></TD></TR></TABLE>>,
        likec4_id=p6u0p1,
        style=dashed,
        weight=3];
    agent -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きPDC接続</FONT></TD></TR></TABLE>>,
        likec4_id="9a23kl",
        style=dashed];
    agent -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id=cemlv4,
        style=dashed,
        weight=2];
    agent -> backups [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">snapshot / vmbackup</FONT></TD></TR></TABLE>>,
        likec4_id="1lqv64x",
        style=dashed,
        weight=2];
    pbs -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">S3 datastore / VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="1tvga97",
        minlen=1,
        style=dashed];
    user -> tunnel [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_edge,
        likec4_id="1pv2rwr",
        minlen=1,
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS</FONT></TD></TR></TABLE>>];
    vms -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM側PDC agentから外向き接続</FONT></TD></TR></TABLE>>,
        likec4_id=pq9psf,
        style=dashed];
    tunnel -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access後 / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id="1qazy7i",
        style=dashed,
        weight=2];
    tunnel -> nextcloud [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開hostname / 内部HTTP</FONT></TD></TR></TABLE>>,
        likec4_id="19w70gz",
        style=dashed];
    access -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Tunnel / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id=vki3z6,
        style=dashed];
    oke [height=1.389,
        label=<<FONT POINT-SIZE="20">OCI / STG OKE共通基盤</FONT>>,
        likec4_id=oke,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    bws -> oke [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1dmhyta",
        minlen=1,
        style=dotted,
        weight=3];
    bws -> eso [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="2swi7j",
        minlen=1,
        style=dotted];
    bws -> backups [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO経由 / backup credential</FONT></TD></TR></TABLE>>,
        likec4_id="159f6d0",
        style=dotted];
    grafana -> agent [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由の検索</FONT></TD></TR></TABLE>>,
        likec4_id="1q9jm1h",
        style=dashed];
    grafana -> vms [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由</FONT></TD></TR></TABLE>>,
        likec4_id="10b8yen",
        style=dashed];
    nextcloud -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="115zv4v",
        style=dashed,
        weight=3];
    nas -> backups [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">対象dataset / restic</FONT></TD></TR></TABLE>>,
        likec4_id="1s4ctyj",
        minlen=0,
        style=dashed,
        weight=4];
    backups -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">用途別prefix / 暗号化・retention</FONT></TD></TR></TABLE>>,
        likec4_id="1h6a1mf",
        style=dashed];
}
`;case`home_apps`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=home_apps,
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
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TALOS / HOME-K8S</B></FONT>>,
            likec4_depth=2,
            likec4_id="premises.home",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_apps {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>宅内アプリ</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home.apps",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            coupon_manager [height=1.389,
                label=<<FONT POINT-SIZE="20">Coupon Manager</FONT>>,
                likec4_id="premises.home.apps.coupon_manager",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            loockit [height=1.389,
                label=<<FONT POINT-SIZE="20">Loockit</FONT>>,
                likec4_id="premises.home.apps.loockit",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            annict_scraper [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Annict scraper</FONT>>,
                likec4_id="premises.home.apps.annict_scraper",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            magic_mirror [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MagicMirror</FONT>>,
                likec4_id="premises.home.apps.magic_mirror",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            wol [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Wake-on-LAN</FONT>>,
                likec4_id="premises.home.apps.wol",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        nextcloud [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
            likec4_id="premises.home.nextcloud",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        recording [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">録画・配信</FONT>>,
            likec4_id="premises.home.recording",
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
    subgraph cluster_data {
        graph [color="#313131",
            fillcolor="#454545",
            label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>保存・バックアップ</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.data",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        databases [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
            likec4_id="premises.data.databases",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        nas [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">TrueNAS VM ×2 / ZFS・NFS</FONT>>,
            likec4_id="premises.data.nas",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
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
    "edge" [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare</FONT>>,
        likec4_id="external.edge",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    user -> "edge" [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS</FONT></TD></TR></TABLE>>,
        likec4_id="1pv2rwr",
        minlen=0,
        style=dashed,
        weight=4];
    "edge" -> nextcloud [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開hostname / 内部HTTP</FONT></TD></TR></TABLE>>,
        likec4_id="7ftmxx",
        style=dashed,
        weight=2];
    "edge" -> recording [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開hostname / 内部HTTP</FONT></TD></TR></TABLE>>,
        likec4_id="3srpa",
        style=dashed,
        weight=2];
    "edge" -> coupon_manager [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開hostname / 内部HTTP</FONT></TD></TR></TABLE>>,
        likec4_id=d7p9l7,
        style=dashed];
    "edge" -> loockit [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="1883sxi",
        minlen=1,
        style=dashed];
    nextcloud -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">MYSQL_HOST / MariaDB</FONT></TD></TR></TABLE>>,
        likec4_id=yowqnp,
        style=dashed,
        weight=2];
    nextcloud -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="115zv4v",
        style=dashed,
        weight=2];
    recording -> annict_scraper [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">番組照合</FONT></TD></TR></TABLE>>,
        likec4_id=qsn8db,
        minlen=1,
        style=dashed,
        weight=3];
    recording -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=rhcxgu,
        style=dashed,
        weight=2];
    recording -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画・thumbnail・drop / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="1qfucxw",
        style=dashed,
        weight=2];
    coupon_manager -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="4aapwb",
        style=dashed,
        weight=2];
    coupon_manager -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">images・Data Protection keys / PVC</FONT></TD></TR></TABLE>>,
        likec4_id=a9xpt,
        style=dashed,
        weight=2];
    magic_mirror -> wol [style=invis];
    wol -> dns [style=invis];
    databases -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id=mpfl5s,
        minlen=0,
        style=dashed,
        weight=4];
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
    subgraph cluster_control {
        graph [color="#462a17",
            fillcolor="#5a3620",
            label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>変更・運用</B></FONT>>,
            likec4_depth=1,
            likec4_id=control,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        reviews [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Re:Venterの一時レビュー</FONT>>,
            likec4_id="control.reviews",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        images [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Image Updater</FONT>>,
            likec4_id="control.images",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        runner [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">ARC / 専用runner</FONT>>,
            likec4_id="control.runner",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        argo [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
            likec4_id="control.argo",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        tfc_agents [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Terraform Cloud agents / 自宅</FONT>>,
            likec4_id="control.tfc_agents",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        packer [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Packer / VM template</FONT>>,
            likec4_id="control.packer",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        ansible [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Ansible</FONT>>,
            likec4_id="control.ansible",
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
    subgraph cluster_monitoring {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>監視</B></FONT>>,
            likec4_depth=1,
            likec4_id=monitoring,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        vms [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">OCI監視VM / STG・PRD</FONT>>,
            likec4_id="monitoring.vms",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    subgraph cluster_oke {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>OCI / STG OKE共通基盤</B></FONT>>,
            likec4_depth=1,
            likec4_id=oke,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        argo_1 [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=oke,
            height=1.389,
            label=<<FONT POINT-SIZE="20">OKE ArgoCD</FONT>>,
            likec4_id="oke.argo",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        scale [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=oke,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Cluster Autoscaler</FONT>>,
            likec4_id="oke.scale",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        api [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=oke,
            height=1.389,
            label=<<FONT POINT-SIZE="20">OKE API / Node pools</FONT>>,
            likec4_id="oke.api",
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
        home [height=1.389,
            label=<<FONT POINT-SIZE="20">Talos / home-k8s</FONT>>,
            likec4_id="premises.home",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        hardware [height=1.389,
            label=<<FONT POINT-SIZE="20">物理・ネットワーク</FONT>>,
            likec4_id="premises.hardware",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    reviews -> images [style=invis];
    github -> terraform_cloud [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Terraform実行</FONT></TD></TR></TABLE>>,
        likec4_id="1w081l3",
        style=dashed,
        weight=3];
    github -> runner [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Actions job</FONT></TD></TR></TABLE>>,
        likec4_id="19u87wl",
        minlen=1,
        style=dashed];
    github -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GitOps</FONT></TD></TR></TABLE>>,
        likec4_id=r8wn3i,
        style=dashed];
    github -> argo_1 [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GitOps</FONT></TD></TR></TABLE>>,
        likec4_id=abuczs,
        style=dashed];
    terraform_cloud -> "edge" [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DNS / Access / Tunnel</FONT></TD></TR></TABLE>>,
        likec4_id=y0ry4h,
        minlen=1,
        style=dashed,
        weight=3];
    terraform_cloud -> tfc_agents [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">workspace runを自宅agentで実行</FONT></TD></TR></TABLE>>,
        likec4_id="93vroc",
        style=dashed];
    terraform_cloud -> vms [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">監視VM</FONT></TD></TR></TABLE>>,
        likec4_id="1vdem0r",
        minlen=1,
        style=dashed];
    terraform_cloud -> argo_1 [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        lhead=cluster_oke,
        likec4_id="1s9ysuo",
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">OCI / OKE</FONT></TD></TR></TABLE>>];
    reventer [height=1.389,
        label=<<FONT POINT-SIZE="20">Re:Venter / STG・PRD</FONT>>,
        likec4_id=reventer,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    argo -> reventer [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">STG・PRDアプリ同期</FONT></TD></TR></TABLE>>,
        likec4_id="1li9qmp",
        minlen=1,
        style=dashed,
        weight=2];
    argo -> home [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">manifest同期</FONT></TD></TR></TABLE>>,
        likec4_id="1vrjl0f",
        minlen=1,
        style=dashed];
    tfc_agents -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM / ネットワーク</FONT></TD></TR></TABLE>>,
        likec4_id=olxe35,
        style=dashed];
    packer -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM template</FONT></TD></TR></TABLE>>,
        likec4_id="1j020ez",
        minlen=1,
        style=dashed];
    ansible -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器設定</FONT></TD></TR></TABLE>>,
        likec4_id=f03odn,
        minlen=1,
        style=dashed];
    argo_1 -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">共通基盤同期</FONT></TD></TR></TABLE>>,
        likec4_id="177ll8p",
        style=dashed,
        weight=3];
    scale -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">burst pool増減</FONT></TD></TR></TABLE>>,
        likec4_id="1jjf86i",
        minlen=1,
        style=dashed];
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
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TALOS / HOME-K8S</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            eso [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
                likec4_id="premises.home.eso",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_data {
            graph [color="#313131",
                fillcolor="#454545",
                label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>保存・バックアップ</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.data",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            backups [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">バックアップ処理</FONT>>,
                likec4_id="premises.data.backups",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
    }
    subgraph cluster_oke {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>OCI / STG OKE共通基盤</B></FONT>>,
            likec4_depth=1,
            likec4_id=oke,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        eso_1 [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
            likec4_id="oke.eso",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_reventer {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>RE:VENTER / STG・PRD</B></FONT>>,
            likec4_depth=1,
            likec4_id=reventer,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        external_secrets [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">ESO / PRD共通基盤</FONT>>,
            likec4_id="reventer.platform.external_secrets",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_control {
        graph [color="#462a17",
            fillcolor="#5a3620",
            label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>変更・運用</B></FONT>>,
            likec4_depth=1,
            likec4_id=control,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        ansible [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Ansible</FONT>>,
            likec4_id="control.ansible",
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
    bws -> eso_1 [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1qfyatl",
        minlen=1,
        style=dotted,
        weight=2];
    bws -> external_secrets [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO / PRD Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1viy8um",
        minlen=1,
        style=dotted];
    bws -> ansible [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器・PBS用credential</FONT></TD></TR></TABLE>>,
        likec4_id="7mk1uw",
        minlen=1,
        style=dotted,
        weight=2];
    bws -> backups [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO経由 / backup credential</FONT></TD></TR></TABLE>>,
        likec4_id="159f6d0",
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
    subgraph cluster_reventer {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>RE:VENTER / STG・PRD</B></FONT>>,
            likec4_depth=1,
            likec4_id=reventer,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        collectors [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">STG・PRD監視collector</FONT>>,
            likec4_id="reventer.collectors",
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
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TALOS / HOME-K8S</B></FONT>>,
                likec4_depth=2,
                likec4_id="premises.home",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            subgraph cluster_agent {
                graph [color="#2d333d",
                    fillcolor="#3e4651",
                    label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>自宅監視基盤</B></FONT>>,
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
    subgraph cluster_monitoring {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>監視</B></FONT>>,
            likec4_depth=1,
            likec4_id=monitoring,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        vms [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">OCI監視VM / STG・PRD</FONT>>,
            likec4_id="monitoring.vms",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
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
    collectors -> vms [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=zr9riv,
        minlen=1,
        style=dotted];
    grafana -> vms [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由</FONT></TD></TR></TABLE>>,
        likec4_id="10b8yen",
        style=dashed];
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
    vms -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM側PDC agentから外向き接続</FONT></TD></TR></TABLE>>,
        likec4_id=pq9psf,
        style=dashed];
    exporters -> collector [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">scrape</FONT></TD></TR></TABLE>>,
        likec4_id="17zgcax",
        minlen=1,
        style=dotted,
        weight=3];
    pdc -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きPDC接続</FONT></TD></TR></TABLE>>,
        likec4_id="68wei4",
        style=dashed];
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
  nodesep = 0.834;
  ranksep = 1.112;
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
  "nas1" [
    likec4_id = "homeSite.x570.nas1";
    likec4_level = 2;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">TrueNAS VM69001 / nas-01</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">pve-x570のVM。USB disk passthrough上のZFS<BR/>datasetをNFS公開。runner cacheを保存。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "pbs" [
    likec4_id = "homeSite.x570.pbs";
    likec4_level = 2;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">PBS VM14001 / 手動退避</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">VMバックアップ。NFSのオンライン利用経路とは別。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "nas2" [
    likec4_id = "homeSite.b550m.nas2";
    likec4_level = 2;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">TrueNAS VM69002 / nas-02</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">pve-b550mのVM。USB disk passthrough上のZFS<BR/>datasetをNFS公開。アプリ・DB・監視のデータを保存。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "talos" [
    likec4_id = "homeSite.talos";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">home-k8s</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">VMとRPiにまたがるクラスタ。PVEホストとクラスタを入れ子にしてPod配置を固定しない。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "stg" [
    likec4_id = "stg";
    likec4_level = 0;
    label = <<FONT POINT-SIZE="20">OCI / STG OKE共通基盤</FONT>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "prd" [
    likec4_id = "prd";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">PRD OKE / 本体reventer所有・共通アドオンmy-infra</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">別リポジトリ管理。モデルで所有境界を維持する。</FONT></TD></TR></TABLE>>;
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
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>自宅 / PROXMOX2ホスト・RPI</B></FONT>>;
    "talos";
    subgraph "cluster_x570" {
      likec4_id = "homeSite.x570";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#2c4e32";
      color = "#1e3524";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PVE-X570</B></FONT>>;
      "nas1";
      "pbs";
    }
    subgraph "cluster_b550m" {
      likec4_id = "homeSite.b550m";
      likec4_level = 1;
      likec4_depth = 1;
      fillcolor = "#2c4e32";
      color = "#1e3524";
      style = "filled";
      margin = 32;
      label = <<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PVE-B550M</B></FONT>>;
      "nas2";
    }
  }
}`;case`media`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=media,
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
    subgraph cluster_recording {
        graph [color="#292f37",
            fillcolor="#3a404a",
            label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>録画・配信</B></FONT>>,
            likec4_depth=2,
            likec4_id="premises.home.recording",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_tnlastation {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TNLASTATION / 共通モデル</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home.recording.tnlastation",
                likec4_level=1,
                margin=40,
                style=filled
            ];
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
        epgstation [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">EPGStation</FONT>>,
            likec4_id="premises.home.recording.epgstation",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        annict_sync [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Annict録画同期 / CronJob</FONT>>,
            likec4_id="premises.home.recording.annict_sync",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        mirakurun_staging [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun Service / STG</FONT>>,
            likec4_id="premises.home.recording.mirakurun_staging",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        mirakurun [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun Service / 本番LXCへの中継</FONT>>,
            likec4_id="premises.home.recording.mirakurun",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    epgstation -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id="12e7e0y",
        style=dashed,
        weight=4];
    databases [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
        likec4_id="premises.data.databases",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    epgstation -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EPGStation DB</FONT></TD></TR></TABLE>>,
        likec4_id=ofhu08,
        style=dashed,
        weight=2];
    annict_scraper [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Annict scraper</FONT>>,
        likec4_id="premises.home.apps.annict_scraper",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    annict_sync -> annict_scraper [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">番組照合</FONT></TD></TR></TABLE>>,
        likec4_id="1m8za0m",
        style=dashed,
        weight=3];
    annict_sync -> backend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画登録API</FONT></TD></TR></TABLE>>,
        likec4_id="1hs4xpm",
        style=dashed,
        weight=4];
    tuner_stg [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun STG LXC /</FONT>>,
        likec4_id="premises.hardware.tuner_stg",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    mirakurun_staging -> tuner_stg [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EndpointSlice / 外部LXC</FONT></TD></TR></TABLE>>,
        likec4_id=zjh6qp,
        minlen=1,
        style=dashed];
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
        minlen=1,
        style=dashed];
    tuner_prod [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun LXC / CT12901・PT3</FONT>>,
        likec4_id="premises.hardware.tuner_prod",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    tuner_stg -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BS/CS TCP fallback</FONT></TD></TR></TABLE>>,
        likec4_id="1yul8eb",
        style=dashed,
        weight=4];
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
    backend -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id=wrafbh,
        style=dashed,
        weight=4];
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
    backend -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="1khz12f",
        style=dashed];
    mirakurun -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EndpointSlice / 外部LXC</FONT></TD></TR></TABLE>>,
        likec4_id="14dnauu",
        style=dashed];
    nas [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">TrueNAS VM ×2 / ZFS・NFS</FONT>>,
        likec4_id="premises.data.nas",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    mirakurun -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        likec4_id="1qfucxw",
        ltail=cluster_recording,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画・thumbnail・drop / NFS</FONT></TD></TR></TABLE>>];
    encode -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode状態</FONT></TD></TR></TABLE>>,
        likec4_id=c9cbmt,
        style=dashed];
    streaming -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">配信</FONT></TD></TR></TABLE>>,
        likec4_id="4f19o3",
        style=dashed];
    databases -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id=mpfl5s,
        style=dashed,
        weight=5];
}
`;case`network`:return`digraph {
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
        subgraph cluster_hardware {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>物理・ネットワーク</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.hardware",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            lb [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">HAProxy / Keepalived ×2</FONT>>,
                likec4_id="premises.hardware.lb",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            router [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">IX2215 / VLAN</FONT>>,
                likec4_id="premises.hardware.router",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            wifi [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Wi-Fi AP</FONT>>,
                likec4_id="premises.hardware.wifi",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            unifi [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">UniFi OS Server</FONT>>,
                likec4_id="premises.hardware.unifi",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_home {
            graph [color="#1c3979",
                fillcolor="#1a468d",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TALOS / HOME-K8S</B></FONT>>,
                likec4_depth=2,
                likec4_id="premises.home",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            subgraph cluster_dns {
                graph [color="#2d333d",
                    fillcolor="#3e4651",
                    label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>内部DNS / METALLB</B></FONT>>,
                    likec4_depth=1,
                    likec4_id="premises.home.dns",
                    likec4_level=2,
                    margin=40,
                    style=filled
                ];
                coredns [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">CoreDNS / miutaku.internal</FONT>>,
                    likec4_id="premises.home.dns.coredns",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                metallb [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">MetalLB / LANのService IP</FONT>>,
                    likec4_id="premises.home.dns.metallb",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
            }
            cloudflared [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">cloudflared / 自宅connector</FONT>>,
                likec4_id="premises.home.platform.cloudflared",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
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
            server [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN20 / 192.168.20.0/24</FONT>>,
                likec4_id="premises.lan.server",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
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
    }
    subgraph cluster_oke {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>OCI / STG OKE共通基盤</B></FONT>>,
            likec4_depth=2,
            likec4_id=oke,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_network {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>OCI NETWORK</B></FONT>>,
                likec4_depth=1,
                likec4_id="oke.network",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            private_workers [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="oke.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">private worker subnet</FONT>>,
                likec4_id="oke.network.private_workers",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            nat [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="oke.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">NAT gateway / reserved IP</FONT>>,
                likec4_id="oke.network.nat",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            service_gateway [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="oke.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Service Gateway / Oracle</FONT>>,
                likec4_id="oke.network.service_gateway",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            igw [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="oke.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Internet gateway</FONT>>,
                likec4_id="oke.network.igw",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            public_api [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="oke.network",
                height=1.389,
                label=<<FONT POINT-SIZE="20">公開API・LB subnet</FONT>>,
                likec4_id="oke.network.public_api",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        workers [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">base / burst node pool</FONT>>,
            likec4_id="oke.workers",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_external {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス / SAAS・公開サービス</B></FONT>>,
            likec4_depth=2,
            likec4_id=external,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_edge {
            graph [color="#462a17",
                fillcolor="#5a3620",
                label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>CLOUDFLARE</B></FONT>>,
                likec4_depth=1,
                likec4_id="external.edge",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            warp [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">WARP / private CIDR routes</FONT>>,
                likec4_id="external.edge.warp",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            access [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="external.edge",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Access / 認証</FONT>>,
                likec4_id="external.edge.access",
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
            routes [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="external.edge",
                height=1.389,
                label=<<FONT POINT-SIZE="20">公開hostname / 設定から抽出</FONT>>,
                likec4_id="external.edge.routes",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        internet [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Internet</FONT>>,
            likec4_id="external.internet",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        oracle [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Oracle Services Network</FONT>>,
            likec4_id="external.oracle",
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
    operator -> access [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">管理認証</FONT></TD></TR></TABLE>>,
        likec4_id="1mzdjyo",
        minlen=1,
        style=dashed];
    lb -> metallb [style=invis];
    cloudflared -> tunnel [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きTunnel接続</FONT></TD></TR></TABLE>>,
        likec4_id=zdvozx,
        minlen=1,
        style=dashed];
    workers -> private_workers [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private subnet / 10.0.2.0/24</FONT></TD></TR></TABLE>>,
        likec4_id=a3omiw,
        minlen=1,
        style=dotted];
    warp -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private CIDR routes / WARP policy</FONT></TD></TR></TABLE>>,
        likec4_id="1nzidds",
        minlen=1,
        style=dotted];
    private_workers -> nat [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">default route</FONT></TD></TR></TABLE>>,
        likec4_id=d5yl2e,
        style=dotted,
        weight=4];
    private_workers -> service_gateway [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Oracle service CIDR route</FONT></TD></TR></TABLE>>,
        likec4_id="1q0t6ef",
        style=dotted,
        weight=4];
    nat -> internet [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NAT / reserved IPv4</FONT></TD></TR></TABLE>>,
        likec4_id="1o5fuau",
        style=dotted];
    service_gateway -> oracle [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Oracle Services Network</FONT></TD></TR></TABLE>>,
        likec4_id=u7it0q,
        minlen=1,
        style=dotted];
    access -> routes [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access policy</FONT></TD></TR></TABLE>>,
        likec4_id="1501tic",
        style=dashed,
        weight=5];
    tunnel -> routes [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">hostname転送</FONT></TD></TR></TABLE>>,
        likec4_id="1uhyhyg",
        style=dashed,
        weight=6];
    internet -> igw [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開API・LBへの到達</FONT></TD></TR></TABLE>>,
        likec4_id="1deydus",
        style=dotted];
    routes -> router [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="16iutd9",
        style=dashed];
    routes -> wifi [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="175ew9j",
        minlen=1,
        style=dashed];
    routes -> unifi [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="3ghfq3",
        minlen=1,
        style=dashed];
    igw -> public_api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">public route table</FONT></TD></TR></TABLE>>,
        likec4_id="1x2lbth",
        minlen=1,
        style=dotted,
        weight=4];
    router -> coredns [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_dns,
        likec4_id="1q6rtex",
        minlen=1,
        style=dashed,
        weight=3,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">LAN / 内部DNS</FONT></TD></TR></TABLE>>];
    router -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI20</FONT></TD></TR></TABLE>>,
        likec4_id=vatnfd,
        style=dotted,
        weight=3];
    router -> native [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native IF</FONT></TD></TR></TABLE>>,
        likec4_id=yoavq5,
        minlen=1,
        style=dotted,
        weight=3];
    router -> management [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI10</FONT></TD></TR></TABLE>>,
        likec4_id=nbp3vz,
        minlen=1,
        style=dotted,
        weight=3];
    router -> client [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI30</FONT></TD></TR></TABLE>>,
        likec4_id="15mlzb9",
        minlen=1,
        style=dotted,
        weight=3];
    router -> guest [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI31 / 他VLAN拒否</FONT></TD></TR></TABLE>>,
        likec4_id=xgr9m4,
        minlen=1,
        style=dotted,
        weight=3];
    router -> iot [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI40</FONT></TD></TR></TABLE>>,
        likec4_id="10y59se",
        minlen=1,
        style=dotted,
        weight=3];
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
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TALOS / HOME-K8S</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            nextcloud [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
                likec4_id="premises.home.nextcloud",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            recording [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">録画・配信</FONT>>,
                likec4_id="premises.home.recording",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            local_store [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VictoriaMetrics / 自宅</FONT>>,
                likec4_id="premises.home.agent.local_store",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
        }
        subgraph cluster_hardware {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>物理・ネットワーク</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.hardware",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            x570 [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Proxmox / x570</FONT>>,
                likec4_id="premises.hardware.x570",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            b550m [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Proxmox / b550m</FONT>>,
                likec4_id="premises.hardware.b550m",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_data {
            graph [color="#2d2d2d",
                fillcolor="#3f3f3f",
                label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>保存・バックアップ</B></FONT>>,
                likec4_depth=2,
                likec4_id="premises.data",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            subgraph cluster_databases {
                graph [color="#2d333d",
                    fillcolor="#3e4651",
                    label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>DB / アプリ共有基盤</B></FONT>>,
                    likec4_depth=1,
                    likec4_id="premises.data.databases",
                    likec4_level=2,
                    margin=40,
                    style=filled
                ];
                mariadb [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">MariaDB</FONT>>,
                    likec4_id="premises.data.databases.mariadb",
                    likec4_level=3,
                    margin="0.139,0",
                    penwidth=2,
                    shape=cylinder,
                    width=2.5];
                postgres [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">PostgreSQL / 本番・STG</FONT>>,
                    likec4_id="premises.data.databases.postgres",
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
                    likec4_id="premises.data.backups",
                    likec4_level=2,
                    margin=40,
                    style=filled
                ];
                db [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">DB logical dump / 自宅Talos</FONT>>,
                    likec4_id="premises.data.backups.db",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                recordings [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">録画 / 自宅Talos CronJob</FONT>>,
                    likec4_id="premises.data.backups.recordings",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                metrics [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">metrics snapshot / 自宅Talos</FONT>>,
                    likec4_id="premises.data.backups.metrics",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
                nas [color="#475569",
                    fillcolor="#64748b",
                    fontcolor="#f8fafc",
                    group="premises.data",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">NAS restic / 自宅Talos CronJob</FONT>>,
                    likec4_id="premises.data.backups.nas",
                    likec4_level=3,
                    margin="0.139,0.139",
                    width=2.5];
            }
            subgraph cluster_nas {
                graph [color="#462a17",
                    fillcolor="#5a3620",
                    label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>TRUENAS VM ×2 / ZFS・NFS</B></FONT>>,
                    likec4_depth=1,
                    likec4_id="premises.data.nas",
                    likec4_level=2,
                    margin=40,
                    style=filled
                ];
                nas02 [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    group="premises.data",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">TrueNAS VM69002 / nas-02</FONT>>,
                    likec4_id="premises.data.nas.nas02",
                    likec4_level=3,
                    margin="0.139,0",
                    penwidth=2,
                    shape=cylinder,
                    width=2.5];
                nas01 [color="#7E451D",
                    fillcolor="#A35829",
                    fontcolor="#FFE0C2",
                    group="premises.data",
                    height=1.389,
                    label=<<FONT POINT-SIZE="20">TrueNAS VM69001 / nas-01</FONT>>,
                    likec4_id="premises.data.nas.nas01",
                    likec4_level=3,
                    margin="0.139,0",
                    penwidth=2,
                    shape=cylinder,
                    width=2.5];
            }
            shared [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.data",
                height=1.389,
                label=<<FONT POINT-SIZE="20">共有PV / runner cache・状態</FONT>>,
                likec4_id="premises.data.shared",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            pbs [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Proxmox Backup Server</FONT>>,
                likec4_id="premises.data.pbs",
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
            label=<<FONT POINT-SIZE="20">IDrive e2 / S3</FONT>>,
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
        likec4_id="16fnca3",
        style=dashed];
    nextcloud -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="1sydo1b",
        style=dashed,
        weight=2];
    recording -> mariadb [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EPGStation DB</FONT></TD></TR></TABLE>>,
        likec4_id="1fao6wg",
        style=dashed];
    recording -> postgres [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=r00jln,
        style=dashed];
    recording -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画・thumbnail・drop / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="1q41438",
        style=dashed,
        weight=2];
    recording -> recordings [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画ファイル専用job</FONT></TD></TR></TABLE>>,
        likec4_id=danrdh,
        minlen=1,
        style=dashed];
    local_store -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id=zsud1f,
        style=dashed];
    local_store -> metrics [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">snapshot / vmbackup</FONT></TD></TR></TABLE>>,
        likec4_id="1y16q6j",
        minlen=1,
        style=dashed];
    x570 -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="8mwp67",
        minlen=1,
        style=dashed,
        weight=2];
    b550m -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup</FONT></TD></TR></TABLE>>,
        likec4_id=jablne,
        minlen=1,
        style=dashed,
        weight=2];
    postgres -> db [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id=xc5qtl,
        ltail=cluster_databases,
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">整合性あるlogical dump</FONT></TD></TR></TABLE>>];
    postgres -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        likec4_id="15gqzio",
        ltail=cluster_databases,
        style=dashed,
        weight=4,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>];
    shared -> nas01 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">runner cache / NFS</FONT></TD></TR></TABLE>>,
        likec4_id=vrk5l8,
        style=dashed,
        weight=2];
    pbs -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">S3 datastore / VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="1tvga97",
        style=dashed];
    nas02 -> nas [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">対象dataset / restic</FONT></TD></TR></TABLE>>,
        likec4_id="12do0bt",
        style=dashed,
        weight=3];
    nas -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id="1h6a1mf",
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
    subgraph cluster_ups {
        graph [color="#2d333d",
            fillcolor="#3e4651",
            label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>UPS / NUT</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.hardware.ups",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        mains [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">商用AC</FONT>>,
            likec4_id="premises.hardware.ups.mains",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        surge_a [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UPS A / サージのみ口・非backup</FONT>>,
            likec4_id="premises.hardware.ups.surge_a",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        ups_a [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UPS A / APC RS550S 2020</FONT>>,
            likec4_id="premises.hardware.ups.ups_a",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        ups_b [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UPS B / APC RS550S 2025</FONT>>,
            likec4_id="premises.hardware.ups.ups_b",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        pi_a [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">NUT Pi .112 / 監視A・給電B</FONT>>,
            likec4_id="premises.hardware.ups.pi_a",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        pi_b [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">NUT Pi .113 / 監視B・給電A</FONT>>,
            likec4_id="premises.hardware.ups.pi_b",
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
        weight=2];
    surge_a -> ups_b [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">UPS BのAC入力</FONT></TD></TR></TABLE>>,
        likec4_id=db3f0p,
        style=solid,
        weight=2];
    x570 [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Proxmox / x570</FONT>>,
        likec4_id="premises.hardware.x570",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    ups_a -> x570 [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">バッテリー給電</FONT></TD></TR></TABLE>>,
        likec4_id="8hllw0",
        style=solid];
    ups_a -> pi_a [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">USB監視 / ups-a</FONT></TD></TR></TABLE>>,
        likec4_id="1m1irtx",
        style=dotted,
        weight=2];
    ups_a -> pi_b [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">cross-power / PiBの給電元</FONT></TD></TR></TABLE>>,
        likec4_id="1m1irty",
        style=solid,
        weight=2];
    b550m [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Proxmox / b550m</FONT>>,
        likec4_id="premises.hardware.b550m",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    ups_b -> b550m [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">バッテリー給電</FONT></TD></TR></TABLE>>,
        likec4_id=oifd46,
        style=solid];
    ups_b -> pi_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">cross-power / PiAの給電元</FONT></TD></TR></TABLE>>,
        likec4_id="1j2zwm",
        style=solid,
        weight=2];
    ups_b -> pi_b [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">USB監視 / ups-b</FONT></TD></TR></TABLE>>,
        likec4_id="1j2zwl",
        style=dotted,
        weight=2];
    x570 -> pi_a [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">charge-guard監視 / 80%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id=cfwrun,
        style=dashed];
    b550m -> pi_b [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">charge-guard監視 / 80%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id="7jtlih",
        style=dashed];
    pi_a -> pi_b [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ups-b監視 / LOWBATT10%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id="1dsjysp",
        style=dashed];
    pi_b -> pi_a [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ups-a監視 / LOWBATT10%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id=qhaemh,
        style=dashed];
}
`;default:throw Error(`Unknown viewId: `+e)}},t=e=>{switch(e){case`index`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="3041pt" height="1372pt"
 viewBox="0.00 0.00 3041.00 1372.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1357.09)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1396,-228.81 1396,-1070.83 2719,-1070.83 2719,-228.81 1396,-228.81"/>
<text xml:space="preserve" text-anchor="start" x="1404" y="-1057.93" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2007,-532.02 2007,-1009.63 2527,-1009.63 2527,-532.02 2007,-532.02"/>
<text xml:space="preserve" text-anchor="start" x="2015" y="-996.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1436,-268.81 1436,-491.22 2368,-491.22 2368,-268.81 1436,-268.81"/>
<text xml:space="preserve" text-anchor="start" x="1444" y="-478.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="1088,-540.02 1088,-746.42 1388,-746.42 1388,-540.02 1088,-540.02"/>
<text xml:space="preserve" text-anchor="start" x="1096" y="-733.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_external</title>
<polygon fill="#1a468d" stroke="#1c3979" points="480,-8 480,-1334.04 1080,-1334.04 1080,-8 480,-8"/>
<text xml:space="preserve" text-anchor="start" x="488" y="-1321.14" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_edge</title>
<polygon fill="#5a3620" stroke="#462a17" points="520,-787.22 520,-1009.63 1040,-1009.63 1040,-787.22 520,-787.22"/>
<text xml:space="preserve" text-anchor="start" x="528" y="-996.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="228,-540.02 228,-746.42 472,-746.42 472,-540.02 228,-540.02"/>
<text xml:space="preserve" text-anchor="start" x="236" y="-733.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<!-- agent -->
<g id="node1" class="node">
<title>agent</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2487,-672.02 2307,-672.02 2307,-572.02 2487,-572.02 2487,-672.02"/>
<text xml:space="preserve" text-anchor="start" x="2346.99" y="-614.02" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅監視基盤</text>
</g>
<!-- nextcloud -->
<g id="node2" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2227,-672.02 2047,-672.02 2047,-572.02 2227,-572.02 2227,-672.02"/>
<text xml:space="preserve" text-anchor="start" x="2092.53" y="-614.02" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- eso -->
<g id="node3" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2298.61,-927.23 2047.39,-927.23 2047.39,-827.22 2298.61,-827.22 2298.61,-927.23"/>
<text xml:space="preserve" text-anchor="start" x="2057.39" y="-869.23" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- pbs -->
<g id="node4" class="node">
<title>pbs</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2067.83,-399.72C2067.83,-404.74 2015.01,-408.82 1950,-408.82 1884.99,-408.82 1832.17,-404.74 1832.17,-399.72 1832.17,-399.72 1832.17,-317.9 1832.17,-317.9 1832.17,-312.88 1884.99,-308.81 1950,-308.81 2015.01,-308.81 2067.83,-312.88 2067.83,-317.9 2067.83,-317.9 2067.83,-399.72 2067.83,-399.72"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2067.83,-399.72C2067.83,-394.71 2015.01,-390.63 1950,-390.63 1884.99,-390.63 1832.17,-394.71 1832.17,-399.72"/>
<text xml:space="preserve" text-anchor="start" x="1842.18" y="-350.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">Proxmox Backup Server</text>
</g>
<!-- nas -->
<g id="node5" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1752.36,-399.72C1752.36,-404.74 1690.35,-408.82 1614,-408.82 1537.65,-408.82 1475.64,-404.74 1475.64,-399.72 1475.64,-399.72 1475.64,-317.9 1475.64,-317.9 1475.64,-312.88 1537.65,-308.81 1614,-308.81 1690.35,-308.81 1752.36,-312.88 1752.36,-317.9 1752.36,-317.9 1752.36,-399.72 1752.36,-399.72"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1752.36,-399.72C1752.36,-394.71 1690.35,-390.63 1614,-390.63 1537.65,-390.63 1475.64,-394.71 1475.64,-399.72"/>
<text xml:space="preserve" text-anchor="start" x="1485.65" y="-350.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- backups -->
<g id="node6" class="node">
<title>backups</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2328,-408.82 2148,-408.82 2148,-308.81 2328,-308.81 2328,-408.82"/>
<text xml:space="preserve" text-anchor="start" x="2171.32" y="-350.81" font-family="Arial" font-size="20.00" fill="#f8fafc">バックアップ処理</text>
</g>
<!-- vms -->
<g id="node7" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1355.8,-662.93C1355.8,-667.95 1303,-672.02 1238,-672.02 1173,-672.02 1120.2,-667.95 1120.2,-662.93 1120.2,-662.93 1120.2,-581.11 1120.2,-581.11 1120.2,-576.09 1173,-572.02 1238,-572.02 1303,-572.02 1355.8,-576.09 1355.8,-581.11 1355.8,-581.11 1355.8,-662.93 1355.8,-662.93"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1355.8,-662.93C1355.8,-657.92 1303,-653.84 1238,-653.84 1173,-653.84 1120.2,-657.92 1120.2,-662.93"/>
<text xml:space="preserve" text-anchor="start" x="1130.21" y="-614.02" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- tunnel -->
<g id="node8" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1000,-927.23 820,-927.23 820,-827.22 1000,-827.22 1000,-927.23"/>
<text xml:space="preserve" text-anchor="start" x="831.06" y="-869.23" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- access -->
<g id="node9" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="740,-927.23 560,-927.23 560,-827.22 740,-827.22 740,-927.23"/>
<text xml:space="preserve" text-anchor="start" x="592.76" y="-869.23" font-family="Arial" font-size="20.00" fill="#f8fafc">Access / 認証</text>
</g>
<!-- bws -->
<g id="node10" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1040.4,-1251.64 773.6,-1251.64 773.6,-1151.63 1040.4,-1151.63 1040.4,-1251.64"/>
<text xml:space="preserve" text-anchor="start" x="783.61" y="-1193.64" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- grafana -->
<g id="node11" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1040.5,-408.82 831.5,-408.82 831.5,-308.81 1040.5,-308.81 1040.5,-408.82"/>
<text xml:space="preserve" text-anchor="start" x="841.51" y="-350.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- idrive -->
<g id="node12" class="node">
<title>idrive</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1040,-138.92C1040,-143.93 999.66,-148.01 950,-148.01 900.34,-148.01 860,-143.93 860,-138.92 860,-138.92 860,-57.09 860,-57.09 860,-52.08 900.34,-48 950,-48 999.66,-48 1040,-52.08 1040,-57.09 1040,-57.09 1040,-138.92 1040,-138.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1040,-138.92C1040,-133.9 999.66,-129.82 950,-129.82 900.34,-129.82 860,-133.9 860,-138.92"/>
<text xml:space="preserve" text-anchor="start" x="889.42" y="-90" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2 / S3</text>
</g>
<!-- argo -->
<g id="node13" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="440,-672.02 260,-672.02 260,-572.02 440,-572.02 440,-672.02"/>
<text xml:space="preserve" text-anchor="start" x="297.76" y="-614.02" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- operator -->
<g id="node14" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-1251.64 0,-1251.64 0,-1151.63 180,-1151.63 180,-1251.64"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-1193.64" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- user -->
<g id="node15" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="440,-1251.64 260,-1251.64 260,-1151.63 440,-1151.63 440,-1251.64"/>
<text xml:space="preserve" text-anchor="start" x="325" y="-1193.64" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- oke -->
<g id="node16" class="node">
<title>oke</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="3010.91,-927.23 2783.09,-927.23 2783.09,-827.22 3010.91,-827.22 3010.91,-927.23"/>
<text xml:space="preserve" text-anchor="start" x="2793.09" y="-869.23" font-family="Arial" font-size="20.00" fill="#eff6ff">OCI / STG OKE共通基盤</text>
</g>
<!-- agent&#45;&gt;nas -->
<g id="edge4" class="edge">
<title>agent&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M2356.78,-572.2C2329.8,-543.91 2291.51,-511.52 2249,-499.22 2200.22,-485.1 1840.1,-507.51 1792,-491.22 1746.87,-475.92 1703.68,-444.59 1671.15,-416.36"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1673.16,-414.64 1665.8,-411.65 1669.69,-418.58 1673.16,-414.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2295.82,-499.22 2295.82,-522.02 2419.27,-522.02 2419.27,-499.22 2295.82,-499.22"/>
<text xml:space="preserve" text-anchor="start" x="2298.82" y="-505.02" font-family="Arial" font-size="14.00" fill="#bbfcd3">metrics用NFS PVC</text>
</g>
<!-- agent&#45;&gt;backups -->
<g id="edge5" class="edge">
<title>agent&#45;&gt;backups</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M2443.63,-572.21C2459.35,-549.74 2469.99,-522.88 2457,-499.22 2431.23,-452.27 2382.21,-418.87 2337.07,-396.56"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="2338.43,-394.3 2330.53,-393.42 2336.15,-399.03 2338.43,-394.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2462.71,-499.22 2462.71,-522.02 2601.01,-522.02 2601.01,-499.22 2462.71,-499.22"/>
<text xml:space="preserve" text-anchor="start" x="2465.71" y="-505.02" font-family="Arial" font-size="14.00" fill="#ffe0c2">snapshot / vmbackup</text>
</g>
<!-- agent&#45;&gt;grafana -->
<g id="edge3" class="edge">
<title>agent&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M2358.45,-572.1C2343.07,-556.28 2324.01,-540.61 2303,-532.02 2275.29,-520.68 1794,-523.61 1764.1,-522.02 1609,-513.73 1568.87,-518.68 1416,-491.22 1288.77,-468.36 1146.31,-427.34 1049.88,-397.19"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1050.94,-394.77 1042.99,-395.03 1049.36,-399.78 1050.94,-394.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1764.1,-499.22 1764.1,-522.02 1858,-522.02 1858,-499.22 1764.1,-499.22"/>
<text xml:space="preserve" text-anchor="start" x="1767.1" y="-505.02" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きPDC接続</text>
</g>
<!-- nextcloud&#45;&gt;nas -->
<g id="edge17" class="edge">
<title>nextcloud&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M2116.82,-572.23C2103.04,-545.64 2081.99,-515.01 2053,-499.22 2027.52,-485.34 1819.42,-500.71 1792,-491.22 1747.14,-475.69 1704.11,-444.52 1671.59,-416.44"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1673.62,-414.73 1666.25,-411.76 1670.16,-418.68 1673.62,-414.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2081.15,-499.22 2081.15,-522.02 2192.19,-522.02 2192.19,-499.22 2081.15,-499.22"/>
<text xml:space="preserve" text-anchor="start" x="2084.15" y="-505.02" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- pbs&#45;&gt;idrive -->
<g id="edge6" class="edge">
<title>pbs&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1903.08,-308.11C1873.84,-280.25 1833.9,-247.46 1792,-228.81 1660.98,-170.48 1245.26,-126.03 1051.38,-107.91"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1051.63,-105.3 1043.92,-107.22 1051.15,-110.52 1051.63,-105.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1768.94,-198.01 1768.94,-220.81 1936.03,-220.81 1936.03,-198.01 1768.94,-198.01"/>
<text xml:space="preserve" text-anchor="start" x="1771.94" y="-203.81" font-family="Arial" font-size="14.00" fill="#ffe0c2">S3 datastore / VM backup</text>
</g>
<!-- nas&#45;&gt;backups -->
<g id="edge18" class="edge">
<title>nas&#45;&gt;backups</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1648.78,-409.56C1673.64,-441.05 1710.15,-478.76 1752.81,-496.32 1797.11,-514.54 2044.18,-518.81 2108,-491.22 2144.06,-475.62 2175.27,-444.84 2198.06,-416.87"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="2200.07,-418.56 2202.68,-411.06 2195.96,-415.3 2200.07,-418.56"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1752.81,-499.22 1752.81,-522.02 1873.19,-522.02 1873.19,-499.22 1752.81,-499.22"/>
<text xml:space="preserve" text-anchor="start" x="1755.81" y="-505.02" font-family="Arial" font-size="14.00" fill="#ffe0c2">対象dataset / restic</text>
</g>
<!-- backups&#45;&gt;idrive -->
<g id="edge19" class="edge">
<title>backups&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M2202.69,-309.09C2179.23,-280.67 2145.85,-246.93 2108,-228.81 1921.94,-139.71 1297.38,-110.19 1051.09,-101.87"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1051.32,-99.25 1043.74,-101.63 1051.14,-104.5 1051.32,-99.25"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2076.76,-198.01 2076.76,-220.81 2264.83,-220.81 2264.83,-198.01 2076.76,-198.01"/>
<text xml:space="preserve" text-anchor="start" x="2079.76" y="-203.81" font-family="Arial" font-size="14.00" fill="#ffe0c2">用途別prefix / 暗号化・retention</text>
</g>
<!-- vms&#45;&gt;grafana -->
<g id="edge8" class="edge">
<title>vms&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1180.49,-571.27C1129.02,-526.76 1053.67,-461.59 1000.25,-415.38"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1002.21,-413.61 994.82,-410.69 998.78,-417.58 1002.21,-413.61"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1122.93,-499.22 1122.93,-522.02 1311.76,-522.02 1311.76,-499.22 1122.93,-499.22"/>
<text xml:space="preserve" text-anchor="start" x="1125.93" y="-505.02" font-family="Arial" font-size="14.00" fill="#d4f2ff">VM側PDC agentから外向き接続</text>
</g>
<!-- tunnel&#45;&gt;nextcloud -->
<g id="edge10" class="edge">
<title>tunnel&#45;&gt;nextcloud</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M999.91,-874.9C1235.55,-870.01 1865.07,-847.58 2043,-746.42 2069.69,-731.25 2091.25,-705.12 2106.96,-680.8"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2109.13,-682.27 2110.87,-674.51 2104.68,-679.49 2109.13,-682.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2013.34,-754.42 2013.34,-777.22 2175.72,-777.22 2175.72,-754.42 2013.34,-754.42"/>
<text xml:space="preserve" text-anchor="start" x="2016.34" y="-760.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">公開hostname / 内部HTTP</text>
</g>
<!-- tunnel&#45;&gt;argo -->
<g id="edge9" class="edge">
<title>tunnel&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M845.08,-827.36C824.85,-813.36 802.05,-798.77 780,-787.22 671.52,-730.39 538.82,-682.76 449.77,-653.68"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="450.77,-651.24 442.82,-651.42 449.15,-656.23 450.77,-651.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="757.95,-754.42 757.95,-777.22 869.75,-777.22 869.75,-754.42 757.95,-754.42"/>
<text xml:space="preserve" text-anchor="start" x="760.95" y="-760.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access後 / 管理UI</text>
</g>
<!-- access&#45;&gt;argo -->
<g id="edge11" class="edge">
<title>access&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M575.08,-827.31C552.98,-811.99 529.13,-794.54 508.19,-777.22 471.25,-746.67 432.68,-709.2 402.87,-678.84"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="405.11,-677.38 397.99,-673.85 401.35,-681.05 405.11,-677.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="508.19,-754.42 508.19,-777.22 606,-777.22 606,-754.42 508.19,-754.42"/>
<text xml:space="preserve" text-anchor="start" x="511.19" y="-760.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">Tunnel / 管理UI</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge13" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1040.39,-1166.67C1282.86,-1104.92 1793.31,-974.92 2037.4,-912.76"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="2037.84,-915.36 2044.46,-910.96 2036.55,-910.27 2037.84,-915.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1352.63,-1078.83 1352.63,-1101.63 1422.43,-1101.63 1422.43,-1078.83 1352.63,-1078.83"/>
<text xml:space="preserve" text-anchor="start" x="1355.63" y="-1084.63" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;backups -->
<g id="edge14" class="edge">
<title>bws&#45;&gt;backups</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1040.24,-1197.55C1432.57,-1187.84 2559.76,-1155.39 2617,-1101.63 2715.11,-1009.48 2759.59,-607.77 2680,-499.22 2639.26,-443.65 2455.22,-400.04 2337.84,-377.26"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="2338.59,-374.73 2330.73,-375.89 2337.59,-379.89 2338.59,-374.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2719.42,-754.42 2719.42,-777.22 2899.73,-777.22 2899.73,-754.42 2719.42,-754.42"/>
<text xml:space="preserve" text-anchor="start" x="2722.42" y="-760.22" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO経由 / backup credential</text>
</g>
<!-- bws&#45;&gt;oke -->
<g id="edge12" class="edge">
<title>bws&#45;&gt;oke</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1040.14,-1197.7C1461.38,-1187.89 2741.56,-1153.88 2813,-1101.63 2864.89,-1063.68 2884.74,-989.67 2892.32,-937.25"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="2894.89,-937.85 2893.28,-930.07 2889.69,-937.15 2894.89,-937.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2836.16,-1078.83 2836.16,-1101.63 2905.96,-1101.63 2905.96,-1078.83 2836.16,-1078.83"/>
<text xml:space="preserve" text-anchor="start" x="2839.16" y="-1084.63" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- grafana&#45;&gt;agent -->
<g id="edge15" class="edge">
<title>grafana&#45;&gt;agent</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1040.22,-396.47C1136.39,-428.34 1283.86,-472.28 1416,-491.22 1516.76,-505.66 1772.35,-493.9 1874,-499.22 1990.33,-505.3 2018.92,-513.49 2135.1,-522.02 2172.37,-524.75 2268.7,-517.16 2303,-532.02 2320.4,-539.55 2336.54,-551.79 2350.36,-564.81"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="2348.44,-566.6 2355.64,-569.98 2352.12,-562.86 2348.44,-566.6"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2135.1,-499.22 2135.1,-522.02 2229,-522.02 2229,-499.22 2135.1,-499.22"/>
<text xml:space="preserve" text-anchor="start" x="2138.1" y="-505.02" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由の検索</text>
</g>
<!-- grafana&#45;&gt;vms -->
<g id="edge16" class="edge">
<title>grafana&#45;&gt;vms</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M992.53,-408.71C1043.69,-452.96 1119.02,-518.11 1172.72,-564.56"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1170.81,-566.37 1178.2,-569.29 1174.24,-562.4 1170.81,-566.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1122.93,-499.22 1122.93,-522.02 1181.83,-522.02 1181.83,-499.22 1122.93,-499.22"/>
<text xml:space="preserve" text-anchor="start" x="1125.93" y="-505.02" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge1" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M142.47,-1151.64C169.33,-1127.97 203.27,-1100.15 236.32,-1078.83 338.15,-1013.15 464.68,-954.83 550.81,-918.23"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="551.65,-920.72 557.53,-915.38 549.6,-915.89 551.65,-920.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="236.32,-1078.83 236.32,-1101.63 289,-1101.63 289,-1078.83 236.32,-1078.83"/>
<text xml:space="preserve" text-anchor="start" x="239.32" y="-1084.63" font-family="Arial" font-size="14.00" fill="#cbd0fd">管理認証</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M82.37,-1152.08C66.18,-1029.99 42.33,-707.52 208,-532.02 290.96,-444.13 638.05,-393.02 821.39,-371.66"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="821.45,-374.29 828.6,-370.83 820.85,-369.08 821.45,-374.29"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="94.25,-754.42 94.25,-777.22 123.59,-777.22 123.59,-754.42 94.25,-754.42"/>
<text xml:space="preserve" text-anchor="start" x="97.25" y="-760.22" font-family="Arial" font-size="14.00" fill="#d4f2ff">照会</text>
</g>
<!-- user&#45;&gt;tunnel -->
<g id="edge7" class="edge">
<title>user&#45;&gt;tunnel</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M439.84,-1159.12C446.61,-1156.45 453.38,-1153.92 460,-1151.63 598.62,-1103.65 659.95,-1155.13 780,-1070.83 800.36,-1056.53 818.46,-1037.94 834.2,-1017.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="836.26,-1019.59 838.73,-1012.04 832.09,-1016.4 836.26,-1019.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="592.32,-1123.27 592.32,-1146.07 644.21,-1146.07 644.21,-1123.27 592.32,-1123.27"/>
<text xml:space="preserve" text-anchor="start" x="595.32" y="-1129.07" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS</text>
</g>
</g>
</svg>
`;case`home_apps`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1881pt" height="1220pt"
 viewBox="0.00 0.00 1881.00 1220.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1205.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="390.38,-8 390.38,-790 1843.36,-790 1843.36,-8 390.38,-8"/>
<text xml:space="preserve" text-anchor="start" x="398.38" y="-777.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_apps</title>
<polygon fill="#3e4651" stroke="#2d333d" points="711.05,-48 711.05,-729 1520.38,-729 1520.38,-48 711.05,-48"/>
<text xml:space="preserve" text-anchor="start" x="719.05" y="-716.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">宅内アプリ</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1212.02,-798 1212.02,-1182 1568.74,-1182 1568.74,-798 1212.02,-798"/>
<text xml:space="preserve" text-anchor="start" x="1220.02" y="-1169.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<!-- coupon_manager -->
<g id="node1" class="node">
<title>coupon_manager</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="931.05,-508 751.05,-508 751.05,-408 931.05,-408 931.05,-508"/>
<text xml:space="preserve" text-anchor="start" x="763.78" y="-450" font-family="Arial" font-size="20.00" fill="#eff6ff">Coupon Manager</text>
</g>
<!-- loockit -->
<g id="node2" class="node">
<title>loockit</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="931.05,-188 751.05,-188 751.05,-88 931.05,-88 931.05,-188"/>
<text xml:space="preserve" text-anchor="start" x="809.37" y="-130" font-family="Arial" font-size="20.00" fill="#eff6ff">Loockit</text>
</g>
<!-- annict_scraper -->
<g id="node3" class="node">
<title>annict_scraper</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="931.05,-668 751.05,-668 751.05,-568 931.05,-568 931.05,-668"/>
<text xml:space="preserve" text-anchor="start" x="777.14" y="-610" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict scraper</text>
</g>
<!-- magic_mirror -->
<g id="node4" class="node">
<title>magic_mirror</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="931.05,-348 751.05,-348 751.05,-248 931.05,-248 931.05,-348"/>
<text xml:space="preserve" text-anchor="start" x="788.28" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror</text>
</g>
<!-- wol -->
<g id="node5" class="node">
<title>wol</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1480.38,-348 1300.38,-348 1300.38,-248 1480.38,-248 1480.38,-348"/>
<text xml:space="preserve" text-anchor="start" x="1327.58" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">Wake&#45;on&#45;LAN</text>
</g>
<!-- nextcloud -->
<g id="node6" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="610.38,-569 430.38,-569 430.38,-469 610.38,-469 610.38,-569"/>
<text xml:space="preserve" text-anchor="start" x="475.91" y="-511" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node7" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="610.38,-729 430.38,-729 430.38,-629 610.38,-629 610.38,-729"/>
<text xml:space="preserve" text-anchor="start" x="478.7" y="-671" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信</text>
</g>
<!-- dns -->
<g id="node8" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1803.36,-348 1617.74,-348 1617.74,-248 1803.36,-248 1803.36,-348"/>
<text xml:space="preserve" text-anchor="start" x="1627.75" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- databases -->
<g id="node9" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1480.96,-1121 1299.8,-1121 1299.8,-1021 1480.96,-1021 1480.96,-1121"/>
<text xml:space="preserve" text-anchor="start" x="1309.81" y="-1063" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- nas -->
<g id="node10" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1528.74,-928.91C1528.74,-933.93 1466.72,-938 1390.38,-938 1314.03,-938 1252.02,-933.93 1252.02,-928.91 1252.02,-928.91 1252.02,-847.09 1252.02,-847.09 1252.02,-842.07 1314.03,-838 1390.38,-838 1466.72,-838 1528.74,-842.07 1528.74,-847.09 1528.74,-847.09 1528.74,-928.91 1528.74,-928.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1528.74,-928.91C1528.74,-923.9 1466.72,-919.82 1390.38,-919.82 1314.03,-919.82 1252.02,-923.9 1252.02,-928.91"/>
<text xml:space="preserve" text-anchor="start" x="1262.02" y="-880" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- user -->
<g id="node11" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-752 0,-752 0,-652 180,-652 180,-752"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-694" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- edge -->
<g id="node12" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="180,-569 0,-569 0,-469 180,-469 180,-569"/>
<text xml:space="preserve" text-anchor="start" x="44.42" y="-511" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- coupon_manager&#45;&gt;databases -->
<g id="edge11" class="edge">
<title>coupon_manager&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M908.5,-507.62C917.41,-516.84 925.54,-527.05 931.59,-538 983.03,-631.12 917.82,-682.2 971.59,-774 1044.36,-898.23 1192.01,-984.06 1290.83,-1030.41"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1289.58,-1032.72 1297.49,-1033.49 1291.79,-1027.96 1289.58,-1032.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1046.67,-983.82 1046.67,-1006.62 1128.93,-1006.62 1128.93,-983.82 1046.67,-983.82"/>
<text xml:space="preserve" text-anchor="start" x="1049.67" y="-989.62" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- coupon_manager&#45;&gt;nas -->
<g id="edge12" class="edge">
<title>coupon_manager&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M905.64,-507.96C1007.91,-588.3 1208.36,-745.78 1316.34,-830.62"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1314.68,-832.66 1322.2,-835.23 1317.93,-828.53 1314.68,-832.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="971.59,-736.64 971.59,-759.44 1204.02,-759.44 1204.02,-736.64 971.59,-736.64"/>
<text xml:space="preserve" text-anchor="start" x="974.59" y="-742.44" font-family="Arial" font-size="14.00" fill="#bbfcd3">images・Data Protection keys / PVC</text>
</g>
<!-- magic_mirror&#45;&gt;wol -->
<!-- wol&#45;&gt;dns -->
<!-- nextcloud&#45;&gt;databases -->
<g id="edge6" class="edge">
<title>nextcloud&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M586.29,-568.61C595.41,-577.89 603.87,-588.13 610.38,-599 648.71,-662.99 618.88,-694.38 650.38,-762 669.67,-803.42 677.05,-814.48 711.05,-845 795.27,-920.57 845.68,-898.56 931.59,-972.2 953.14,-990.68 946.75,-1008.25 971.59,-1022 1069.78,-1076.34 1200.62,-1083.1 1289.54,-1079.82"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1289.49,-1082.45 1296.88,-1079.51 1289.27,-1077.2 1289.49,-1082.45"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="757.15,-972.2 757.15,-995 924.96,-995 924.96,-972.2 757.15,-972.2"/>
<text xml:space="preserve" text-anchor="start" x="760.15" y="-978" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- nextcloud&#45;&gt;nas -->
<g id="edge7" class="edge">
<title>nextcloud&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M583.85,-568.72C593.48,-578.12 602.75,-588.37 610.38,-599 636.61,-635.56 623.72,-655.76 650.38,-692 671.42,-720.61 679.21,-728.27 711.05,-744 802.55,-789.2 1070.36,-837.69 1240.82,-865.29"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1240.33,-867.87 1248.16,-866.47 1241.17,-862.68 1240.33,-867.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="785.54,-807.37 785.54,-830.17 896.57,-830.17 896.57,-807.37 785.54,-807.37"/>
<text xml:space="preserve" text-anchor="start" x="788.54" y="-813.17" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- recording&#45;&gt;annict_scraper -->
<g id="edge8" class="edge">
<title>recording&#45;&gt;annict_scraper</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M610.15,-662.01C650.81,-654.22 699.16,-644.97 741,-636.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="741.36,-639.56 748.24,-635.58 740.38,-634.41 741.36,-639.56"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="650.38,-653.96 650.38,-676.76 703.05,-676.76 703.05,-653.96 650.38,-653.96"/>
<text xml:space="preserve" text-anchor="start" x="653.38" y="-659.76" font-family="Arial" font-size="14.00" fill="#bbfcd3">番組照合</text>
</g>
<!-- recording&#45;&gt;databases -->
<g id="edge9" class="edge">
<title>recording&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M525.05,-728.68C535.19,-823.2 572.83,-1024.87 711.05,-1085 902.18,-1168.14 1153.17,-1129.66 1289.95,-1097.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1290.36,-1100.57 1297.06,-1096.29 1289.16,-1095.46 1290.36,-1100.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="827.56,-1133.25 827.56,-1156.05 854.55,-1156.05 854.55,-1133.25 827.56,-1133.25"/>
<text xml:space="preserve" text-anchor="start" x="830.56" y="-1141.45" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- recording&#45;&gt;nas -->
<g id="edge10" class="edge">
<title>recording&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M533.1,-728.94C554.04,-805.42 605.9,-949.06 711.05,-1010 795.86,-1059.15 846.66,-1058.93 931.59,-1010 962.3,-992.3 942.05,-960.6 971.59,-941 1050.18,-888.85 1155.66,-875.8 1240.97,-875.69"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1240.73,-878.31 1248.24,-875.72 1240.75,-873.06 1240.73,-878.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="750.52,-1046.78 750.52,-1069.58 931.59,-1069.58 931.59,-1046.78 750.52,-1046.78"/>
<text xml:space="preserve" text-anchor="start" x="753.52" y="-1052.58" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画・thumbnail・drop / NFS</text>
</g>
<!-- databases&#45;&gt;nas -->
<g id="edge15" class="edge">
<title>databases&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1390.38,-1021.25C1390.38,-999.11 1390.38,-972.82 1390.38,-949.47"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1393,-949.5 1390.38,-942 1387.75,-949.5 1393,-949.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1327.08,-968.1 1327.08,-990.9 1424.87,-990.9 1424.87,-968.1 1327.08,-968.1"/>
<text xml:space="preserve" text-anchor="start" x="1330.08" y="-973.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
<!-- user&#45;&gt;edge -->
<g id="edge1" class="edge">
<title>user&#45;&gt;edge</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M90,-652.12C90,-629.48 90,-602.53 90,-578.81"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="92.63,-579.05 90,-571.55 87.38,-579.05 92.63,-579.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="49.66,-599.1 49.66,-621.9 101.54,-621.9 101.54,-599.1 49.66,-599.1"/>
<text xml:space="preserve" text-anchor="start" x="52.66" y="-604.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS</text>
</g>
<!-- edge&#45;&gt;coupon_manager -->
<g id="edge4" class="edge">
<title>edge&#45;&gt;coupon_manager</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M168.33,-469.17C226.73,-434.64 310.24,-391.68 390.38,-373.2 485.66,-351.23 514.13,-356 610.38,-373.2 654.74,-381.13 701.74,-397.03 741.59,-412.94"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="740.56,-415.36 748.5,-415.74 742.53,-410.49 740.56,-415.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="439.19,-373.2 439.19,-396 601.57,-396 601.57,-373.2 439.19,-373.2"/>
<text xml:space="preserve" text-anchor="start" x="442.19" y="-379" font-family="Arial" font-size="14.00" fill="#bbfcd3">公開hostname / 内部HTTP</text>
</g>
<!-- edge&#45;&gt;loockit -->
<g id="edge5" class="edge">
<title>edge&#45;&gt;loockit</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M121.28,-469.08C144.49,-434.52 179.38,-389.73 220,-361 382.88,-245.78 611.61,-184.05 740.87,-156.41"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="741.39,-158.98 748.19,-154.86 740.31,-153.84 741.39,-158.98"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="494.04,-264.65 494.04,-287.45 546.72,-287.45 546.72,-264.65 494.04,-264.65"/>
<text xml:space="preserve" text-anchor="start" x="497.04" y="-270.45" font-family="Arial" font-size="14.00" fill="#bbfcd3">内部接続</text>
</g>
<!-- edge&#45;&gt;nextcloud -->
<g id="edge2" class="edge">
<title>edge&#45;&gt;nextcloud</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.76,-519C249.98,-519 347.96,-519 420.65,-519"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="420.21,-521.63 427.71,-519 420.21,-516.38 420.21,-521.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-519 220,-541.8 382.38,-541.8 382.38,-519 220,-519"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-524.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">公開hostname / 内部HTTP</text>
</g>
<!-- edge&#45;&gt;recording -->
<g id="edge3" class="edge">
<title>edge&#45;&gt;recording</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.76,-552.15C250.12,-578.43 348.37,-615.13 421.1,-642.29"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="419.95,-644.67 427.9,-644.83 421.79,-639.75 419.95,-644.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-627.25 220,-650.05 382.38,-650.05 382.38,-627.25 220,-627.25"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-633.05" font-family="Arial" font-size="14.00" fill="#bbfcd3">公開hostname / 内部HTTP</text>
</g>
</g>
</svg>
`;case`delivery`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="3023pt" height="922pt"
 viewBox="0.00 0.00 3023.00 922.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 907.08)">
<g id="clust1" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="8,-8 8,-449.22 1648,-449.22 1648,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-436.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1729,-248.01 1729,-884.03 2072,-884.03 2072,-248.01 1729,-248.01"/>
<text xml:space="preserve" text-anchor="start" x="1737" y="-871.13" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="2080,-256.01 2080,-441.22 2380,-441.22 2380,-256.01 2080,-256.01"/>
<text xml:space="preserve" text-anchor="start" x="2088" y="-428.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_oke</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2462,-8 2462,-449.22 2985,-449.22 2985,-8 2462,-8"/>
<text xml:space="preserve" text-anchor="start" x="2470" y="-436.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_premises</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1656,-8 1656,-209.21 2156,-209.21 2156,-8 1656,-8"/>
<text xml:space="preserve" text-anchor="start" x="1664" y="-196.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<!-- reviews -->
<g id="node1" class="node">
<title>reviews</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="274.38,-388.02 47.62,-388.02 47.62,-288.01 274.38,-288.01 274.38,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="57.63" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Re:Venterの一時レビュー</text>
</g>
<!-- images -->
<g id="node2" class="node">
<title>images</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="251,-148.01 71,-148.01 71,-48 251,-48 251,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="94.85" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">Image Updater</text>
</g>
<!-- runner -->
<g id="node3" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="514,-388.02 334,-388.02 334,-288.01 514,-288.01 514,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="348.98" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 専用runner</text>
</g>
<!-- argo -->
<g id="node4" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1608,-388.02 1428,-388.02 1428,-288.01 1608,-288.01 1608,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="1465.76" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- tfc_agents -->
<g id="node5" class="node">
<title>tfc_agents</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1367.61,-388.02 1086.39,-388.02 1086.39,-288.01 1367.61,-288.01 1367.61,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="1096.39" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud agents / 自宅</text>
</g>
<!-- packer -->
<g id="node6" class="node">
<title>packer</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="785.6,-388.02 574.4,-388.02 574.4,-288.01 785.6,-288.01 785.6,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="584.41" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Packer / VM template</text>
</g>
<!-- ansible -->
<g id="node7" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1026,-388.02 846,-388.02 846,-288.01 1026,-288.01 1026,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="903.2" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- github -->
<g id="node8" class="node">
<title>github</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2000.6,-822.83 1769.4,-822.83 1769.4,-722.82 2000.6,-722.82 2000.6,-822.83"/>
<text xml:space="preserve" text-anchor="start" x="1779.41" y="-764.83" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- terraform_cloud -->
<g id="node9" class="node">
<title>terraform_cloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1975,-620.02 1795,-620.02 1795,-520.02 1975,-520.02 1975,-620.02"/>
<text xml:space="preserve" text-anchor="start" x="1812.2" y="-562.02" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- edge -->
<g id="node10" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1975,-388.02 1795,-388.02 1795,-288.01 1975,-288.01 1975,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="1839.42" y="-330.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- vms -->
<g id="node11" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2347.8,-378.92C2347.8,-383.94 2295,-388.02 2230,-388.02 2165,-388.02 2112.2,-383.94 2112.2,-378.92 2112.2,-378.92 2112.2,-297.1 2112.2,-297.1 2112.2,-292.08 2165,-288.01 2230,-288.01 2295,-288.01 2347.8,-292.08 2347.8,-297.1 2347.8,-297.1 2347.8,-378.92 2347.8,-378.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2347.8,-378.92C2347.8,-373.91 2295,-369.83 2230,-369.83 2165,-369.83 2112.2,-373.91 2112.2,-378.92"/>
<text xml:space="preserve" text-anchor="start" x="2122.21" y="-330.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- argo_1 -->
<g id="node12" class="node">
<title>argo_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2701,-388.02 2521,-388.02 2521,-288.01 2701,-288.01 2701,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="2551.54" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">OKE ArgoCD</text>
</g>
<!-- scale -->
<g id="node13" class="node">
<title>scale</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2944.71,-388.02 2761.29,-388.02 2761.29,-288.01 2944.71,-288.01 2944.71,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="2771.3" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Cluster Autoscaler</text>
</g>
<!-- api -->
<g id="node14" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2719.95,-148.01 2502.05,-148.01 2502.05,-48 2719.95,-48 2719.95,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="2512.06" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">OKE API / Node pools</text>
</g>
<!-- home -->
<g id="node15" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2116,-148.01 1936,-148.01 1936,-48 2116,-48 2116,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1949.31" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- hardware -->
<g id="node16" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1876,-148.01 1696,-148.01 1696,-48 1876,-48 1876,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1710.99" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- reventer -->
<g id="node17" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2422.37,-148.01 2195.63,-148.01 2195.63,-48 2422.37,-48 2422.37,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="2205.64" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter / STG・PRD</text>
</g>
<!-- reviews&#45;&gt;images -->
<!-- argo&#45;&gt;home -->
<g id="edge11" class="edge">
<title>argo&#45;&gt;home</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1607.54,-291.18C1640.38,-275.77 1678.26,-259.57 1714,-248.01 1796.83,-221.22 1828.43,-248.72 1906,-209.21 1932.26,-195.83 1957.03,-175.08 1977.16,-155.18"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1978.83,-157.23 1982.24,-150.06 1975.1,-153.54 1978.83,-157.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1888.22,-217.21 1888.22,-240.01 1970.46,-240.01 1970.46,-217.21 1888.22,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="1891.22" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期</text>
</g>
<!-- argo&#45;&gt;reventer -->
<g id="edge10" class="edge">
<title>argo&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1606.11,-288.02C1638.97,-272.19 1677.23,-256.54 1714,-248.01 1772.69,-234.4 1925.03,-245.83 1985,-240.01 2068.4,-231.91 2094.46,-243.3 2171,-209.21 2200.57,-196.04 2229.22,-174.99 2252.68,-154.8"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2254.25,-156.92 2258.15,-150 2250.78,-152.97 2254.25,-156.92"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2149.44,-217.21 2149.44,-240.01 2283.8,-240.01 2283.8,-217.21 2149.44,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="2152.44" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">STG・PRDアプリ同期</text>
</g>
<!-- tfc_agents&#45;&gt;hardware -->
<g id="edge12" class="edge">
<title>tfc_agents&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1307.2,-288.21C1335.08,-273.19 1367.11,-257.99 1398,-248.01 1412.16,-243.43 1649.53,-215.52 1663,-209.21 1690.4,-196.37 1716.12,-175.39 1736.88,-155.16"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1738.7,-157.05 1742.15,-149.9 1734.99,-153.34 1738.7,-157.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1614.94,-217.21 1614.94,-240.01 1723.63,-240.01 1723.63,-217.21 1614.94,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="1617.94" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM / ネットワーク</text>
</g>
<!-- packer&#45;&gt;hardware -->
<g id="edge13" class="edge">
<title>packer&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M743.52,-288.01C765.46,-273.16 790.87,-258.11 816,-248.01 884.98,-220.27 906.43,-224.52 980.41,-217.21 1018.15,-213.48 1627.66,-222.96 1663,-209.21 1692.04,-197.91 1718.59,-176.34 1739.53,-155.26"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1741.28,-157.23 1744.6,-150.01 1737.5,-153.58 1741.28,-157.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="980.41,-217.21 980.41,-240.01 1065,-240.01 1065,-217.21 980.41,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="983.41" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM template</text>
</g>
<!-- ansible&#45;&gt;hardware -->
<g id="edge14" class="edge">
<title>ansible&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M988.69,-288.24C1008.4,-272.74 1031.9,-257.24 1056,-248.01 1193.28,-195.44 1238.59,-226.17 1385.32,-217.21 1416.13,-215.33 1634.33,-220.65 1663,-209.21 1691.82,-197.71 1718.26,-176.23 1739.18,-155.27"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1740.89,-157.27 1744.23,-150.07 1737.12,-153.62 1740.89,-157.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1385.32,-217.21 1385.32,-240.01 1438,-240.01 1438,-217.21 1385.32,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="1388.32" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">機器設定</text>
</g>
<!-- github&#45;&gt;runner -->
<g id="edge3" class="edge">
<title>github&#45;&gt;runner</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1769.57,-763.58C1528.57,-742.31 959.81,-670.72 544,-449.22 518.21,-435.48 493.69,-414.88 473.62,-395.19"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="475.73,-393.59 468.57,-390.14 472.01,-397.3 475.73,-393.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="971.7,-558.62 971.7,-581.42 1046.19,-581.42 1046.19,-558.62 971.7,-558.62"/>
<text xml:space="preserve" text-anchor="start" x="974.7" y="-564.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">Actions job</text>
</g>
<!-- github&#45;&gt;argo -->
<g id="edge4" class="edge">
<title>github&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1823.82,-722.94C1790.1,-694.59 1748.51,-657.24 1715.43,-620.02 1651.67,-548.28 1590.03,-455.64 1553.05,-396.76"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1555.36,-395.5 1549.16,-390.53 1550.91,-398.28 1555.36,-395.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1715.43,-558.62 1715.43,-581.42 1765,-581.42 1765,-558.62 1715.43,-558.62"/>
<text xml:space="preserve" text-anchor="start" x="1718.43" y="-564.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- github&#45;&gt;terraform_cloud -->
<g id="edge2" class="edge">
<title>github&#45;&gt;terraform_cloud</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1885,-722.96C1885,-694.92 1885,-659.53 1885,-629.95"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1887.63,-630.28 1885,-622.78 1882.38,-630.28 1887.63,-630.28"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1885,-660.02 1885,-682.82 1975.79,-682.82 1975.79,-660.02 1885,-660.02"/>
<text xml:space="preserve" text-anchor="start" x="1888" y="-665.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">Terraform実行</text>
</g>
<!-- github&#45;&gt;argo_1 -->
<g id="edge5" class="edge">
<title>github&#45;&gt;argo_1</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1971.26,-722.92C2071.7,-665.68 2242.32,-567.57 2387,-480.02 2433.25,-452.03 2484.29,-419.99 2525.95,-393.53"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2527.22,-395.84 2532.14,-389.6 2524.41,-391.41 2527.22,-395.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2319.29,-558.62 2319.29,-581.42 2368.86,-581.42 2368.86,-558.62 2319.29,-558.62"/>
<text xml:space="preserve" text-anchor="start" x="2322.29" y="-564.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- terraform_cloud&#45;&gt;tfc_agents -->
<g id="edge7" class="edge">
<title>terraform_cloud&#45;&gt;tfc_agents</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1795.03,-548.58C1664.55,-518.68 1434.33,-464.87 1398,-449.22 1364.05,-434.59 1329.28,-413.5 1300.03,-393.68"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1301.7,-391.64 1294.03,-389.56 1298.73,-395.97 1301.7,-391.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1501.5,-457.22 1501.5,-480.02 1703.59,-480.02 1703.59,-457.22 1501.5,-457.22"/>
<text xml:space="preserve" text-anchor="start" x="1504.5" y="-463.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">workspace runを自宅agentで実行</text>
</g>
<!-- terraform_cloud&#45;&gt;edge -->
<g id="edge6" class="edge">
<title>terraform_cloud&#45;&gt;edge</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1885,-520.24C1885,-484.56 1885,-435.98 1885,-398.1"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1887.63,-398.25 1885,-390.75 1882.38,-398.25 1887.63,-398.25"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1885,-457.22 1885,-480.02 2031.83,-480.02 2031.83,-457.22 1885,-457.22"/>
<text xml:space="preserve" text-anchor="start" x="1888" y="-463.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">DNS / Access / Tunnel</text>
</g>
<!-- terraform_cloud&#45;&gt;vms -->
<g id="edge8" class="edge">
<title>terraform_cloud&#45;&gt;vms</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1974.73,-522.92C1998.65,-509.78 2024.17,-494.95 2047,-480.02 2086.62,-454.1 2128.61,-422.11 2162.36,-395.15"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2163.74,-397.4 2167.95,-390.66 2160.46,-393.31 2163.74,-397.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2078.23,-457.22 2078.23,-480.02 2128.57,-480.02 2128.57,-457.22 2078.23,-457.22"/>
<text xml:space="preserve" text-anchor="start" x="2081.23" y="-463.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">監視VM</text>
</g>
<!-- terraform_cloud&#45;&gt;argo_1 -->
<g id="edge9" class="edge">
<title>terraform_cloud&#45;&gt;argo_1</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1974.89,-554.68C2078.29,-536.64 2252.17,-501.56 2395,-449.22 2414.02,-442.25 2433.52,-434 2452.65,-425.21"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2453.57,-427.68 2459.26,-422.14 2451.35,-422.92 2453.57,-427.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2150,-501.98 2150,-524.78 2222.12,-524.78 2222.12,-501.98 2150,-501.98"/>
<text xml:space="preserve" text-anchor="start" x="2153" y="-507.78" font-family="Arial" font-size="14.00" fill="#cbd0fd">OCI / OKE</text>
</g>
<!-- argo_1&#45;&gt;api -->
<g id="edge15" class="edge">
<title>argo_1&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2611,-288.27C2611,-250.57 2611,-198.21 2611,-158.11"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2613.63,-158.2 2611,-150.7 2608.38,-158.2 2613.63,-158.2"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2611,-217.21 2611,-240.01 2687.01,-240.01 2687.01,-217.21 2611,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="2614" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">共通基盤同期</text>
</g>
<!-- scale&#45;&gt;api -->
<g id="edge16" class="edge">
<title>scale&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2803.44,-288.27C2764.05,-249.53 2708.91,-195.3 2667.75,-154.81"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2669.84,-153.19 2662.65,-149.8 2666.15,-156.93 2669.84,-153.19"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2753.68,-217.21 2753.68,-240.01 2844.5,-240.01 2844.5,-217.21 2753.68,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="2756.68" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">burst pool増減</text>
</g>
</g>
</svg>
`;case`secrets`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="976pt" height="1505pt"
 viewBox="0.00 0.00 976.00 1505.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1490.05)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-1106 8,-1467 896.32,-1467 896.32,-1106 8,-1106"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1454.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="543.11,-587 543.11,-1098 938.34,-1098 938.34,-587 543.11,-587"/>
<text xml:space="preserve" text-anchor="start" x="551.11" y="-1085.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="583.11,-852 583.11,-1037 898.34,-1037 898.34,-852 583.11,-852"/>
<text xml:space="preserve" text-anchor="start" x="591.11" y="-1024.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="618.73,-627 618.73,-812 862.73,-812 862.73,-627 618.73,-627"/>
<text xml:space="preserve" text-anchor="start" x="626.73" y="-799.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_oke</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="583.11,-394 583.11,-579 898.34,-579 898.34,-394 583.11,-394"/>
<text xml:space="preserve" text-anchor="start" x="591.11" y="-566.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_reventer</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="614.81,-201 614.81,-386 866.64,-386 866.64,-201 614.81,-201"/>
<text xml:space="preserve" text-anchor="start" x="622.81" y="-373.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">RE:VENTER / STG・PRD</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="618.73,-8 618.73,-193 862.73,-193 862.73,-8 618.73,-8"/>
<text xml:space="preserve" text-anchor="start" x="626.73" y="-180.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<!-- bws -->
<g id="node1" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="314.8,-1256 48,-1256 48,-1156 314.8,-1156 314.8,-1256"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-1198" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- github -->
<g id="node2" class="node">
<title>github</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="856.32,-1246 625.13,-1246 625.13,-1146 856.32,-1146 856.32,-1246"/>
<text xml:space="preserve" text-anchor="start" x="635.14" y="-1188" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- terraform_cloud -->
<g id="node3" class="node">
<title>terraform_cloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="830.73,-1406 650.73,-1406 650.73,-1306 830.73,-1306 830.73,-1406"/>
<text xml:space="preserve" text-anchor="start" x="667.93" y="-1348" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- eso -->
<g id="node4" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="866.34,-984 615.11,-984 615.11,-884 866.34,-884 866.34,-984"/>
<text xml:space="preserve" text-anchor="start" x="625.12" y="-926" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- backups -->
<g id="node5" class="node">
<title>backups</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="830.73,-759 650.73,-759 650.73,-659 830.73,-659 830.73,-759"/>
<text xml:space="preserve" text-anchor="start" x="674.05" y="-701" font-family="Arial" font-size="20.00" fill="#f8fafc">バックアップ処理</text>
</g>
<!-- eso_1 -->
<g id="node6" class="node">
<title>eso_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="866.34,-526 615.11,-526 615.11,-426 866.34,-426 866.34,-526"/>
<text xml:space="preserve" text-anchor="start" x="625.12" y="-468" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- external_secrets -->
<g id="node7" class="node">
<title>external_secrets</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="834.64,-333 646.81,-333 646.81,-233 834.64,-233 834.64,-333"/>
<text xml:space="preserve" text-anchor="start" x="656.82" y="-275" font-family="Arial" font-size="20.00" fill="#f8fafc">ESO / PRD共通基盤</text>
</g>
<!-- ansible -->
<g id="node8" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="830.73,-140 650.73,-140 650.73,-40 830.73,-40 830.73,-140"/>
<text xml:space="preserve" text-anchor="start" x="707.93" y="-82" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- bws&#45;&gt;github -->
<g id="edge1" class="edge">
<title>bws&#45;&gt;github</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M314.48,-1203.63C405.51,-1202 525.72,-1199.84 615.1,-1198.24"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="615.09,-1200.86 622.54,-1198.1 614.99,-1195.61 615.09,-1200.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="402.66,-1202.91 402.66,-1225.71 487.25,-1225.71 487.25,-1202.91 402.66,-1202.91"/>
<text xml:space="preserve" text-anchor="start" x="405.66" y="-1208.71" font-family="Arial" font-size="14.00" fill="#fcd9d2">CI credential</text>
</g>
<!-- bws&#45;&gt;terraform_cloud -->
<g id="edge2" class="edge">
<title>bws&#45;&gt;terraform_cloud</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M314.48,-1241.55C414.54,-1268.48 549.85,-1304.9 640.72,-1329.35"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="639.9,-1331.85 647.83,-1331.27 641.27,-1326.78 639.9,-1331.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="399.56,-1298.85 399.56,-1321.65 490.35,-1321.65 490.35,-1298.85 399.56,-1298.85"/>
<text xml:space="preserve" text-anchor="start" x="402.56" y="-1304.65" font-family="Arial" font-size="14.00" fill="#fcd9d2">Terraform変数</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge3" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M284.62,-1156.11C381.99,-1108.59 528.17,-1037.25 628.43,-988.32"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="629.37,-990.78 634.96,-985.13 627.07,-986.06 629.37,-990.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.06,-1121.84 410.06,-1144.64 479.86,-1144.64 479.86,-1121.84 410.06,-1121.84"/>
<text xml:space="preserve" text-anchor="start" x="413.06" y="-1127.64" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;backups -->
<g id="edge7" class="edge">
<title>bws&#45;&gt;backups</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M220.38,-1156.29C254,-1113.38 305.29,-1050.55 354.8,-1000.2 432.46,-921.23 454.65,-903.64 543.11,-837 576.7,-811.7 615.18,-785.98 649.14,-764.31"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="650.19,-766.75 655.12,-760.51 647.38,-762.32 650.19,-766.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="354.8,-1000.2 354.8,-1023 535.11,-1023 535.11,-1000.2 354.8,-1000.2"/>
<text xml:space="preserve" text-anchor="start" x="357.8" y="-1006" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO経由 / backup credential</text>
</g>
<!-- bws&#45;&gt;eso_1 -->
<g id="edge4" class="edge">
<title>bws&#45;&gt;eso_1</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M197.48,-1156.2C222.6,-1077.77 277.95,-922.54 354.8,-807.2 421.64,-706.88 451.25,-690.05 543.11,-612 576.79,-583.39 616.47,-555.05 651.33,-531.71"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="652.77,-533.9 657.56,-527.56 649.86,-529.53 652.77,-533.9"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.06,-807.2 410.06,-830 479.86,-830 479.86,-807.2 410.06,-807.2"/>
<text xml:space="preserve" text-anchor="start" x="413.06" y="-813" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;external_secrets -->
<g id="edge5" class="edge">
<title>bws&#45;&gt;external_secrets</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M188.1,-1156.14C202.31,-1046.43 246.3,-778.32 354.8,-583.2 414.8,-475.3 444.09,-452.73 543.11,-379 571.81,-357.63 606.01,-338.99 637.78,-323.96"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="638.67,-326.44 644.37,-320.89 636.46,-321.68 638.67,-326.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="372.72,-583.2 372.72,-606 517.2,-606 517.2,-583.2 372.72,-583.2"/>
<text xml:space="preserve" text-anchor="start" x="375.72" y="-589" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO / PRD Secret注入</text>
</g>
<!-- bws&#45;&gt;ansible -->
<g id="edge6" class="edge">
<title>bws&#45;&gt;ansible</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M181.61,-1156.27C181.58,-1018.33 196.27,-623.12 354.8,-350.2 418.68,-240.23 549.89,-167.02 641.26,-127"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="642.18,-129.46 648.03,-124.08 640.1,-124.64 642.18,-129.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="374.26,-350.2 374.26,-373 515.65,-373 515.65,-350.2 374.26,-350.2"/>
<text xml:space="preserve" text-anchor="start" x="377.26" y="-356" font-family="Arial" font-size="14.00" fill="#fcd9d2">機器・PBS用credential</text>
</g>
</g>
</svg>
`;case`observability`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2094pt" height="928pt"
 viewBox="0.00 0.00 2094.00 928.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 913.05)">
<g id="clust1" class="cluster">
<title>cluster_reventer</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="257.34,-705 257.34,-890 549.18,-890 549.18,-705 257.34,-705"/>
<text xml:space="preserve" text-anchor="start" x="265.34" y="-877.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">RE:VENTER / STG・PRD</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="266.76,-455 266.76,-640 539.75,-640 539.75,-455 266.76,-455"/>
<text xml:space="preserve" text-anchor="start" x="274.76" y="-627.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1c417d" stroke="#1c356c" points="754.01,-8 754.01,-697 2055.6,-697 2055.6,-8 754.01,-8"/>
<text xml:space="preserve" text-anchor="start" x="762.01" y="-684.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="794.01,-48 794.01,-504 2015.6,-504 2015.6,-48 794.01,-48"/>
<text xml:space="preserve" text-anchor="start" x="802.01" y="-491.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_agent</title>
<polygon fill="#3e4651" stroke="#2d333d" points="826.01,-80 826.01,-451 1983.6,-451 1983.6,-80 826.01,-80"/>
<text xml:space="preserve" text-anchor="start" x="834.01" y="-438.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">自宅監視基盤</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="806.21,-705 806.21,-890 1105.81,-890 1105.81,-705 806.21,-705"/>
<text xml:space="preserve" text-anchor="start" x="814.21" y="-877.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<!-- collectors -->
<g id="node1" class="node">
<title>collectors</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="517.18,-837 289.34,-837 289.34,-737 517.18,-737 517.18,-837"/>
<text xml:space="preserve" text-anchor="start" x="299.35" y="-779" font-family="Arial" font-size="20.00" fill="#f8fafc">STG・PRD監視collector</text>
</g>
<!-- grafana -->
<g id="node2" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="507.75,-587 298.76,-587 298.76,-487 507.75,-487 507.75,-587"/>
<text xml:space="preserve" text-anchor="start" x="308.77" y="-529" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- exporters -->
<g id="node3" class="node">
<title>exporters</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1046.01,-230 866.01,-230 866.01,-130 1046.01,-130 1046.01,-230"/>
<text xml:space="preserve" text-anchor="start" x="910.99" y="-172" font-family="Arial" font-size="20.00" fill="#f8fafc">exporter群</text>
</g>
<!-- pdc -->
<g id="node4" class="node">
<title>pdc</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1046.01,-390 866.01,-390 866.01,-290 1046.01,-290 1046.01,-390"/>
<text xml:space="preserve" text-anchor="start" x="882.09" y="-332" font-family="Arial" font-size="20.00" fill="#f8fafc">PDC agent / 自宅</text>
</g>
<!-- collector -->
<g id="node5" class="node">
<title>collector</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1533.5,-220 1234.5,-220 1234.5,-120 1533.5,-120 1533.5,-220"/>
<text xml:space="preserve" text-anchor="start" x="1244.51" y="-162" font-family="Arial" font-size="20.00" fill="#f8fafc">vmagent / scrape・remoteWrite</text>
</g>
<!-- local_store -->
<g id="node6" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1943.6,-380.91C1943.6,-385.93 1898.52,-390 1843.02,-390 1787.52,-390 1742.44,-385.93 1742.44,-380.91 1742.44,-380.91 1742.44,-299.09 1742.44,-299.09 1742.44,-294.07 1787.52,-290 1843.02,-290 1898.52,-290 1943.6,-294.07 1943.6,-299.09 1943.6,-299.09 1943.6,-380.91 1943.6,-380.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1943.6,-380.91C1943.6,-375.9 1898.52,-371.82 1843.02,-371.82 1787.52,-371.82 1742.44,-375.9 1742.44,-380.91"/>
<text xml:space="preserve" text-anchor="start" x="1752.45" y="-332" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- hardware -->
<g id="node7" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1046.01,-636 866.01,-636 866.01,-536 1046.01,-536 1046.01,-636"/>
<text xml:space="preserve" text-anchor="start" x="881" y="-578" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- vms -->
<g id="node8" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1073.81,-827.91C1073.81,-832.93 1021.01,-837 956.01,-837 891.01,-837 838.21,-832.93 838.21,-827.91 838.21,-827.91 838.21,-746.09 838.21,-746.09 838.21,-741.07 891.01,-737 956.01,-737 1021.01,-737 1073.81,-741.07 1073.81,-746.09 1073.81,-746.09 1073.81,-827.91 1073.81,-827.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1073.81,-827.91C1073.81,-822.9 1021.01,-818.82 956.01,-818.82 891.01,-818.82 838.21,-822.9 838.21,-827.91"/>
<text xml:space="preserve" text-anchor="start" x="848.22" y="-779" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- operator -->
<g id="node9" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-587 0,-587 0,-487 180,-487 180,-587"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-529" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- collectors&#45;&gt;vms -->
<g id="edge2" class="edge">
<title>collectors&#45;&gt;vms</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M517.04,-787C607.13,-787 733.39,-787 827.22,-787"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="827.1,-789.63 834.6,-787 827.1,-784.38 827.1,-789.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="638.1,-787 638.1,-809.8 665.09,-809.8 665.09,-787 638.1,-787"/>
<text xml:space="preserve" text-anchor="start" x="641.1" y="-795.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#ffe0c2">[...]</text>
</g>
<!-- grafana&#45;&gt;pdc -->
<g id="edge4" class="edge">
<title>grafana&#45;&gt;pdc</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M507.42,-490.82C576.39,-460.95 669.63,-422.46 754.01,-394 786.9,-382.91 823.41,-372.54 856.19,-363.91"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="856.71,-366.48 863.31,-362.05 855.39,-361.4 856.71,-366.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="604.64,-467.52 604.64,-490.32 698.54,-490.32 698.54,-467.52 604.64,-467.52"/>
<text xml:space="preserve" text-anchor="start" x="607.64" y="-473.32" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由の検索</text>
</g>
<!-- grafana&#45;&gt;vms -->
<g id="edge3" class="edge">
<title>grafana&#45;&gt;vms</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M482.41,-586.94C506.04,-601.24 532.32,-616.36 557.18,-629 645.03,-673.66 748.61,-714.45 828.06,-743.39"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="826.84,-745.74 834.78,-745.83 828.63,-740.81 826.84,-745.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="622.14,-709.68 622.14,-732.48 681.04,-732.48 681.04,-709.68 622.14,-709.68"/>
<text xml:space="preserve" text-anchor="start" x="625.14" y="-715.48" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由</text>
</g>
<!-- exporters&#45;&gt;collector -->
<g id="edge7" class="edge">
<title>exporters&#45;&gt;collector</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M1045.79,-177.92C1097.43,-176.7 1164.03,-175.14 1224.39,-173.72"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1224.33,-176.35 1231.77,-173.55 1224.21,-171.1 1224.33,-176.35"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1130.14,-176.19 1130.14,-198.99 1178.16,-198.99 1178.16,-176.19 1130.14,-176.19"/>
<text xml:space="preserve" text-anchor="start" x="1133.14" y="-181.99" font-family="Arial" font-size="14.00" fill="#ffe0c2">scrape</text>
</g>
<!-- pdc&#45;&gt;grafana -->
<g id="edge8" class="edge">
<title>pdc&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M866.3,-325.02C782.26,-315.13 654.73,-311.55 557.18,-359.2 505.03,-384.67 463.54,-436.9 437.01,-478.19"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="434.8,-476.78 433.03,-484.53 439.25,-479.58 434.8,-476.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="604.64,-359.2 604.64,-382 698.54,-382 698.54,-359.2 604.64,-359.2"/>
<text xml:space="preserve" text-anchor="start" x="607.64" y="-365" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きPDC接続</text>
</g>
<!-- pdc&#45;&gt;local_store -->
<g id="edge9" class="edge">
<title>pdc&#45;&gt;local_store</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1045.92,-340C1208.59,-340 1553.69,-340 1731.3,-340"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1731.18,-342.63 1738.68,-340 1731.18,-337.38 1731.18,-342.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1317.19,-340 1317.19,-362.8 1450.82,-362.8 1450.82,-340 1317.19,-340"/>
<text xml:space="preserve" text-anchor="start" x="1320.19" y="-345.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">private query / :8428</text>
</g>
<!-- collector&#45;&gt;local_store -->
<g id="edge10" class="edge">
<title>collector&#45;&gt;local_store</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M1519.34,-219.97C1586.97,-245.13 1667.94,-275.25 1731.85,-299.02"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1730.77,-301.42 1738.72,-301.57 1732.61,-296.5 1730.77,-301.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1573.5,-285.01 1573.5,-307.81 1702.44,-307.81 1702.44,-285.01 1573.5,-285.01"/>
<text xml:space="preserve" text-anchor="start" x="1576.5" y="-290.81" font-family="Arial" font-size="14.00" fill="#ffe0c2">remoteWrite / :8428</text>
</g>
<!-- hardware&#45;&gt;collector -->
<g id="edge5" class="edge">
<title>hardware&#45;&gt;collector</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M1028.1,-536.21C1054.17,-516.09 1082.88,-491.58 1105.81,-466 1176.61,-387.01 1159.48,-339.99 1234.5,-265 1248.83,-250.68 1265.67,-237.42 1282.77,-225.62"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1283.91,-228.01 1288.66,-221.64 1280.98,-223.66 1283.91,-228.01"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1113.81,-456.67 1113.81,-479.47 1194.5,-479.47 1194.5,-456.67 1113.81,-456.67"/>
<text xml:space="preserve" text-anchor="start" x="1116.81" y="-462.47" font-family="Arial" font-size="14.00" fill="#ffe0c2">exporter収集</text>
</g>
<!-- vms&#45;&gt;grafana -->
<g id="edge6" class="edge">
<title>vms&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M837.37,-767.58C805.5,-756.52 774.25,-739.19 754.01,-712 737.95,-690.42 764.15,-611.07 746.01,-591.2 689.62,-529.42 593.46,-518.81 517.48,-521.99"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="517.75,-519.34 510.4,-522.34 518.02,-524.59 517.75,-519.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="557.18,-591.2 557.18,-614 746.01,-614 746.01,-591.2 557.18,-591.2"/>
<text xml:space="preserve" text-anchor="start" x="560.18" y="-597" font-family="Arial" font-size="14.00" fill="#d4f2ff">VM側PDC agentから外向き接続</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge1" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M179.78,-537C213.55,-537 252.51,-537 288.29,-537"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="288.26,-539.63 295.76,-537 288.26,-534.38 288.26,-539.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-537 220,-559.8 249.34,-559.8 249.34,-537 220,-537"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-542.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">照会</text>
</g>
</g>
</svg>
`;case`placement`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="3017pt" height="468pt"
 viewBox="0.00 0.00 3017.00 468.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 453.45)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#3f3f3f" stroke="#2d2d2d" points="8,-8 8,-430.4 2081,-430.4 2081,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-417.5" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅 / PROXMOX2ホスト・RPI</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_x570</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="58,-58 58,-359.2 925,-359.2 925,-58 58,-58"/>
<text xml:space="preserve" text-anchor="start" x="66" y="-346.3" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PVE&#45;X570</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_b550m</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="975,-76 975,-341.2 1417,-341.2 1417,-76 975,-76"/>
<text xml:space="preserve" text-anchor="start" x="983" y="-328.3" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PVE&#45;B550M</text>
</g>
<!-- nas1 -->
<g id="node1" class="node">
<title>nas1</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M459.53,-271.64C459.53,-280.67 380.86,-288 284,-288 187.14,-288 108.47,-280.67 108.47,-271.64 108.47,-271.64 108.47,-124.36 108.47,-124.36 108.47,-115.33 187.14,-108 284,-108 380.86,-108 459.53,-115.33 459.53,-124.36 459.53,-124.36 459.53,-271.64 459.53,-271.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M459.53,-271.64C459.53,-262.61 380.86,-255.27 284,-255.27 187.14,-255.27 108.47,-262.61 108.47,-271.64"/>
<text xml:space="preserve" text-anchor="start" x="158.38" y="-210" font-family="Arial" font-size="20.00" fill="#f8fafc">TrueNAS VM69001 / nas&#45;01</text>
<text xml:space="preserve" text-anchor="start" x="128.52" y="-187" font-family="Arial" font-size="15.00" fill="#cbd5e1">pve&#45;x570のVM。USB disk passthrough上のZFS</text>
<text xml:space="preserve" text-anchor="start" x="150.61" y="-169" font-family="Arial" font-size="15.00" fill="#cbd5e1">datasetをNFS公開。runner cacheを保存。</text>
</g>
<!-- pbs -->
<g id="node2" class="node">
<title>pbs</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M874.58,-271.64C874.58,-280.67 794.99,-288 697,-288 599.01,-288 519.42,-280.67 519.42,-271.64 519.42,-271.64 519.42,-124.36 519.42,-124.36 519.42,-115.33 599.01,-108 697,-108 794.99,-108 874.58,-115.33 874.58,-124.36 874.58,-124.36 874.58,-271.64 874.58,-271.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M874.58,-271.64C874.58,-262.61 794.99,-255.27 697,-255.27 599.01,-255.27 519.42,-262.61 519.42,-271.64"/>
<text xml:space="preserve" text-anchor="start" x="589.73" y="-201" font-family="Arial" font-size="20.00" fill="#f8fafc">PBS VM14001 / 手動退避</text>
<text xml:space="preserve" text-anchor="start" x="539.47" y="-178" font-family="Arial" font-size="15.00" fill="#cbd5e1">VMバックアップ。NFSのオンライン利用経路とは別。</text>
</g>
<!-- nas2 -->
<g id="node3" class="node">
<title>nas2</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M1384.85,-271.64C1384.85,-280.67 1300.2,-288 1196,-288 1091.8,-288 1007.15,-280.67 1007.15,-271.64 1007.15,-271.64 1007.15,-124.36 1007.15,-124.36 1007.15,-115.33 1091.8,-108 1196,-108 1300.2,-108 1384.85,-115.33 1384.85,-124.36 1384.85,-124.36 1384.85,-271.64 1384.85,-271.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M1384.85,-271.64C1384.85,-262.61 1300.2,-255.27 1196,-255.27 1091.8,-255.27 1007.15,-262.61 1007.15,-271.64"/>
<text xml:space="preserve" text-anchor="start" x="1070.38" y="-210" font-family="Arial" font-size="20.00" fill="#f8fafc">TrueNAS VM69002 / nas&#45;02</text>
<text xml:space="preserve" text-anchor="start" x="1033.85" y="-187" font-family="Arial" font-size="15.00" fill="#cbd5e1">pve&#45;b550mのVM。USB disk passthrough上のZFS</text>
<text xml:space="preserve" text-anchor="start" x="1027.21" y="-169" font-family="Arial" font-size="15.00" fill="#cbd5e1">datasetをNFS公開。アプリ・DB・監視のデータを保存。</text>
</g>
<!-- talos -->
<g id="node4" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2030.54,-288 1449.46,-288 1449.46,-108 2030.54,-108 2030.54,-288"/>
<text xml:space="preserve" text-anchor="start" x="1696.09" y="-201" font-family="Arial" font-size="20.00" fill="#eff6ff">home&#45;k8s</text>
<text xml:space="preserve" text-anchor="start" x="1469.52" y="-178" font-family="Arial" font-size="15.00" fill="#bfdbfe">VMとRPiにまたがるクラスタ。PVEホストとクラスタを入れ子にしてPod配置を固定しない。</text>
</g>
<!-- stg -->
<g id="node5" class="node">
<title>stg</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2451.02,-288 2130.98,-288 2130.98,-108 2451.02,-108 2451.02,-288"/>
<text xml:space="preserve" text-anchor="start" x="2187.09" y="-190" font-family="Arial" font-size="20.00" fill="#eff6ff">OCI / STG OKE共通基盤</text>
</g>
<!-- prd -->
<g id="node6" class="node">
<title>prd</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2986.88,-288 2511.12,-288 2511.12,-108 2986.88,-108 2986.88,-288"/>
<text xml:space="preserve" text-anchor="start" x="2531.17" y="-201" font-family="Arial" font-size="20.00" fill="#eff6ff">PRD OKE / 本体reventer所有・共通アドオンmy&#45;infra</text>
<text xml:space="preserve" text-anchor="start" x="2605.22" y="-178" font-family="Arial" font-size="15.00" fill="#bfdbfe">別リポジトリ管理。モデルで所有境界を維持する。</text>
</g>
</g>
</svg>
`;case`media`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2215pt" height="1524pt"
 viewBox="0.00 0.00 2215.00 1524.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1508.95)">
<g id="clust1" class="cluster">
<title>cluster_recording</title>
<polygon fill="#3a404a" stroke="#292f37" points="8,-300 8,-1156 1759.92,-1156 1759.92,-300 8,-300"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1143.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">録画・配信</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_tnlastation</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="48,-640 48,-1095 1719.92,-1095 1719.92,-640 48,-640"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-1082.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TNLASTATION / 共通モデル</text>
</g>
<!-- gateway -->
<g id="node1" class="node">
<title>gateway</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268,-790.01 88,-790.01 88,-690 268,-690 268,-790.01"/>
<text xml:space="preserve" text-anchor="start" x="138.54" y="-732" font-family="Arial" font-size="20.00" fill="#f8fafc">Gateway</text>
</g>
<!-- frontend -->
<g id="node2" class="node">
<title>frontend</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="657.77,-950.01 477.77,-950.01 477.77,-850 657.77,-850 657.77,-950.01"/>
<text xml:space="preserve" text-anchor="start" x="527.75" y="-892" font-family="Arial" font-size="20.00" fill="#f8fafc">Frontend</text>
</g>
<!-- backend -->
<g id="node3" class="node">
<title>backend</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="682.83,-790.01 452.72,-790.01 452.72,-690 682.83,-690 682.83,-790.01"/>
<text xml:space="preserve" text-anchor="start" x="462.73" y="-732" font-family="Arial" font-size="20.00" fill="#f8fafc">Backend / API・録画制御</text>
</g>
<!-- encode -->
<g id="node4" class="node">
<title>encode</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1130.97,-950.01 913.07,-950.01 913.07,-850 1130.97,-850 1130.97,-950.01"/>
<text xml:space="preserve" text-anchor="start" x="923.08" y="-892" font-family="Arial" font-size="20.00" fill="#f8fafc">ffmpeg encode worker</text>
</g>
<!-- streaming -->
<g id="node5" class="node">
<title>streaming</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1142.07,-790.01 901.97,-790.01 901.97,-690 1142.07,-690 1142.07,-790.01"/>
<text xml:space="preserve" text-anchor="start" x="911.98" y="-732" font-family="Arial" font-size="20.00" fill="#f8fafc">ffmpeg streaming worker</text>
</g>
<!-- mediamtx -->
<g id="node6" class="node">
<title>mediamtx</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1679.92,-972.01 1474.29,-972.01 1474.29,-872 1679.92,-872 1679.92,-972.01"/>
<text xml:space="preserve" text-anchor="start" x="1484.3" y="-914" font-family="Arial" font-size="20.00" fill="#f8fafc">MediaMTX / HLS配信</text>
</g>
<!-- epgstation -->
<g id="node7" class="node">
<title>epgstation</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="657.77,-600.01 477.77,-600.01 477.77,-500 657.77,-500 657.77,-600.01"/>
<text xml:space="preserve" text-anchor="start" x="515.52" y="-542" font-family="Arial" font-size="20.00" fill="#f8fafc">EPGStation</text>
</g>
<!-- annict_sync -->
<g id="node8" class="node">
<title>annict_sync</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="295.27,-600.01 60.73,-600.01 60.73,-500 295.27,-500 295.27,-600.01"/>
<text xml:space="preserve" text-anchor="start" x="70.73" y="-542" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict録画同期 / CronJob</text>
</g>
<!-- mirakurun_staging -->
<g id="node9" class="node">
<title>mirakurun_staging</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="297.48,-440.01 58.52,-440.01 58.52,-340 297.48,-340 297.48,-440.01"/>
<text xml:space="preserve" text-anchor="start" x="68.53" y="-382" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun Service / STG</text>
</g>
<!-- mirakurun -->
<g id="node10" class="node">
<title>mirakurun</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1190.41,-600.01 853.63,-600.01 853.63,-500 1190.41,-500 1190.41,-600.01"/>
<text xml:space="preserve" text-anchor="start" x="863.64" y="-542" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun Service / 本番LXCへの中継</text>
</g>
<!-- databases -->
<g id="node11" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1667.68,-1371.01 1486.53,-1371.01 1486.53,-1271 1667.68,-1271 1667.68,-1371.01"/>
<text xml:space="preserve" text-anchor="start" x="1496.53" y="-1313" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- annict_scraper -->
<g id="node12" class="node">
<title>annict_scraper</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="657.77,-260.01 477.77,-260.01 477.77,-160 657.77,-160 657.77,-260.01"/>
<text xml:space="preserve" text-anchor="start" x="503.86" y="-202" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict scraper</text>
</g>
<!-- tuner_stg -->
<g id="node13" class="node">
<title>tuner_stg</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1127.61,-100.01 916.43,-100.01 916.43,0 1127.61,0 1127.61,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="926.44" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun STG LXC /</text>
</g>
<!-- annict -->
<g id="node14" class="node">
<title>annict</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1112.02,-260.01 932.02,-260.01 932.02,-160 1112.02,-160 1112.02,-260.01"/>
<text xml:space="preserve" text-anchor="start" x="975.33" y="-202" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict API</text>
</g>
<!-- tuner_prod -->
<g id="node15" class="node">
<title>tuner_prod</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1729.95,-100.01 1424.26,-100.01 1424.26,0 1729.95,0 1729.95,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="1434.27" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun LXC / CT12901・PT3</text>
</g>
<!-- nas -->
<g id="node16" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2184.47,-1361.92C2184.47,-1366.93 2122.45,-1371.01 2046.11,-1371.01 1969.76,-1371.01 1907.74,-1366.93 1907.74,-1361.92 1907.74,-1361.92 1907.74,-1280.09 1907.74,-1280.09 1907.74,-1275.08 1969.76,-1271 2046.11,-1271 2122.45,-1271 2184.47,-1275.08 2184.47,-1280.09 2184.47,-1280.09 2184.47,-1361.92 2184.47,-1361.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2184.47,-1361.92C2184.47,-1356.9 2122.45,-1352.82 2046.11,-1352.82 1969.76,-1352.82 1907.74,-1356.9 1907.74,-1361.92"/>
<text xml:space="preserve" text-anchor="start" x="1917.75" y="-1313" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- gateway&#45;&gt;frontend -->
<g id="edge8" class="edge">
<title>gateway&#45;&gt;frontend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M267.96,-776.71C327.83,-801.41 406.8,-834 468.53,-859.47"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="467.16,-861.74 475.09,-862.17 469.16,-856.89 467.16,-861.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="357.71,-834.33 357.71,-857.13 392.49,-857.13 392.49,-834.33 357.71,-834.33"/>
<text xml:space="preserve" text-anchor="start" x="360.71" y="-840.13" font-family="Arial" font-size="14.00" fill="#bbfcd3">Web</text>
</g>
<!-- gateway&#45;&gt;backend -->
<g id="edge9" class="edge">
<title>gateway&#45;&gt;backend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M267.96,-740C319.64,-740 385.55,-740 442.31,-740"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="442.27,-742.63 449.77,-740 442.27,-737.38 442.27,-742.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="360.82,-740 360.82,-762.8 389.38,-762.8 389.38,-740 360.82,-740"/>
<text xml:space="preserve" text-anchor="start" x="363.82" y="-745.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">API</text>
</g>
<!-- gateway&#45;&gt;mediamtx -->
<g id="edge10" class="edge">
<title>gateway&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M216.66,-789.99C264.2,-848.47 352.02,-942.11 452.72,-980 802.5,-1111.63 1257.08,-1014.06 1464.33,-956.4"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1464.88,-958.97 1471.39,-954.42 1463.46,-953.92 1464.88,-958.97"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="751.61,-1044.74 751.61,-1067.54 784.85,-1067.54 784.85,-1044.74 751.61,-1044.74"/>
<text xml:space="preserve" text-anchor="start" x="754.61" y="-1050.54" font-family="Arial" font-size="14.00" fill="#bbfcd3">HLS</text>
</g>
<!-- backend&#45;&gt;encode -->
<g id="edge12" class="edge">
<title>backend&#45;&gt;encode</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M682.6,-780.28C750.06,-804.14 835.4,-834.33 903.49,-858.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="902.61,-860.9 910.56,-860.92 904.36,-855.95 902.61,-860.9"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="730.59,-824.8 730.59,-847.6 805.86,-847.6 805.86,-824.8 730.59,-824.8"/>
<text xml:space="preserve" text-anchor="start" x="733.59" y="-830.6" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode制御</text>
</g>
<!-- backend&#45;&gt;streaming -->
<g id="edge13" class="edge">
<title>backend&#45;&gt;streaming</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M682.6,-740C746.19,-740 825.64,-740 891.59,-740"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="891.52,-742.63 899.02,-740 891.52,-737.38 891.52,-742.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="722.83,-740 722.83,-762.8 813.63,-762.8 813.63,-740 722.83,-740"/>
<text xml:space="preserve" text-anchor="start" x="725.83" y="-745.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">streaming制御</text>
</g>
<!-- backend&#45;&gt;mirakurun -->
<g id="edge11" class="edge">
<title>backend&#45;&gt;mirakurun</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M682.6,-692.18C746.45,-665.36 826.3,-631.81 892.4,-604.04"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="893.36,-606.48 899.26,-601.16 891.33,-601.64 893.36,-606.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="736.05,-673.12 736.05,-695.92 800.41,-695.92 800.41,-673.12 736.05,-673.12"/>
<text xml:space="preserve" text-anchor="start" x="739.05" y="-678.92" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- backend&#45;&gt;databases -->
<g id="edge14" class="edge">
<title>backend&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M657.98,-789.86C667.74,-798.71 676.44,-808.75 682.83,-820 742.97,-926.01 633.56,-1284.02 722.83,-1367 929.55,-1559.16 1300.27,-1440.31 1477.07,-1366.58"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1477.94,-1369.06 1483.84,-1363.73 1475.91,-1364.22 1477.94,-1369.06"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="980.89,-1471.1 980.89,-1493.9 1063.15,-1493.9 1063.15,-1471.1 980.89,-1471.1"/>
<text xml:space="preserve" text-anchor="start" x="983.89" y="-1476.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- encode&#45;&gt;databases -->
<g id="edge17" class="edge">
<title>encode&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1045.53,-949.99C1077.59,-1015.81 1142.39,-1130.99 1230.41,-1198 1288.09,-1241.92 1315.95,-1227.92 1384.26,-1252.2 1414.5,-1262.95 1447.38,-1274.72 1477.25,-1285.43"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1476.04,-1287.79 1483.99,-1287.85 1477.81,-1282.84 1476.04,-1287.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1269.7,-1252.2 1269.7,-1275 1344.97,-1275 1344.97,-1252.2 1269.7,-1252.2"/>
<text xml:space="preserve" text-anchor="start" x="1272.7" y="-1258" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode状態</text>
</g>
<!-- streaming&#45;&gt;mediamtx -->
<g id="edge18" class="edge">
<title>streaming&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1142.01,-779.16C1237.68,-810.64 1371.1,-854.55 1464.7,-885.34"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1463.66,-887.77 1471.61,-887.62 1465.31,-882.78 1463.66,-887.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1292.66,-857.94 1292.66,-880.74 1322,-880.74 1322,-857.94 1292.66,-857.94"/>
<text xml:space="preserve" text-anchor="start" x="1295.66" y="-863.74" font-family="Arial" font-size="14.00" fill="#bbfcd3">配信</text>
</g>
<!-- epgstation&#45;&gt;mirakurun -->
<g id="edge1" class="edge">
<title>epgstation&#45;&gt;mirakurun</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M657.58,-550C710.57,-550 779.74,-550 843.51,-550"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="843.16,-552.63 850.66,-550 843.16,-547.38 843.16,-552.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="736.05,-550 736.05,-572.8 800.41,-572.8 800.41,-550 736.05,-550"/>
<text xml:space="preserve" text-anchor="start" x="739.05" y="-555.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- epgstation&#45;&gt;databases -->
<g id="edge2" class="edge">
<title>epgstation&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M657.54,-595.85C667.44,-604.3 676.29,-614 682.83,-625 738.03,-718 656.55,-1024.55 722.83,-1110 902.29,-1341.41 1292.17,-1344.45 1476.16,-1331.47"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1476.33,-1334.09 1483.62,-1330.92 1475.95,-1328.85 1476.33,-1334.09"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="970.77,-1326.53 970.77,-1349.33 1073.26,-1349.33 1073.26,-1326.53 970.77,-1326.53"/>
<text xml:space="preserve" text-anchor="start" x="973.77" y="-1332.33" font-family="Arial" font-size="14.00" fill="#bbfcd3">EPGStation DB</text>
</g>
<!-- annict_sync&#45;&gt;backend -->
<g id="edge4" class="edge">
<title>annict_sync&#45;&gt;backend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M278.24,-599.88C327.68,-624.59 388.69,-654.87 451.78,-685.53"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="450.49,-687.82 458.38,-688.74 452.78,-683.1 450.49,-687.82"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="337.48,-664.07 337.48,-686.87 412.72,-686.87 412.72,-664.07 337.48,-664.07"/>
<text xml:space="preserve" text-anchor="start" x="340.48" y="-669.87" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画登録API</text>
</g>
<!-- annict_sync&#45;&gt;annict_scraper -->
<g id="edge3" class="edge">
<title>annict_sync&#45;&gt;annict_scraper</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M259.36,-500.22C272.58,-490.79 285.77,-480.55 297.48,-470 377.23,-398.16 372.54,-356.36 452.72,-285 460.09,-278.45 468.08,-272.04 476.29,-265.91"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="477.61,-268.19 482.12,-261.65 474.51,-263.95 477.61,-268.19"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="348.76,-426.32 348.76,-449.12 401.44,-449.12 401.44,-426.32 348.76,-426.32"/>
<text xml:space="preserve" text-anchor="start" x="351.76" y="-432.12" font-family="Arial" font-size="14.00" fill="#bbfcd3">番組照合</text>
</g>
<!-- mirakurun_staging&#45;&gt;tuner_stg -->
<g id="edge5" class="edge">
<title>mirakurun_staging&#45;&gt;tuner_stg</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M210.59,-340.05C255.45,-273.96 344.33,-159.7 452.72,-107.2 597.43,-37.12 786.82,-32.87 906.23,-39.17"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="905.83,-41.78 913.47,-39.58 906.13,-36.54 905.83,-41.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="490.85,-107.2 490.85,-130 644.7,-130 644.7,-107.2 490.85,-107.2"/>
<text xml:space="preserve" text-anchor="start" x="493.85" y="-113" font-family="Arial" font-size="14.00" fill="#bbfcd3">EndpointSlice / 外部LXC</text>
</g>
<!-- mirakurun&#45;&gt;tuner_prod -->
<g id="edge15" class="edge">
<title>mirakurun&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1078.33,-500C1181.86,-406.41 1404.27,-205.35 1513.28,-106.8"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1514.88,-108.89 1518.68,-101.92 1511.36,-105 1514.88,-108.89"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1230.41,-359.49 1230.41,-382.29 1384.26,-382.29 1384.26,-359.49 1230.41,-359.49"/>
<text xml:space="preserve" text-anchor="start" x="1233.41" y="-365.29" font-family="Arial" font-size="14.00" fill="#bbfcd3">EndpointSlice / 外部LXC</text>
</g>
<!-- mirakurun&#45;&gt;nas -->
<g id="edge16" class="edge">
<title>mirakurun&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1304.14,-1156C1433.5,-1206.32 1666.09,-1216.24 1759.92,-1241 1804.52,-1252.78 1852.89,-1266.12 1896.9,-1278.49"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1895.97,-1280.96 1903.9,-1280.46 1897.39,-1275.9 1895.97,-1280.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1424.63,-1193.32 1424.63,-1216.12 1605.7,-1216.12 1605.7,-1193.32 1424.63,-1193.32"/>
<text xml:space="preserve" text-anchor="start" x="1427.63" y="-1199.12" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画・thumbnail・drop / NFS</text>
</g>
<!-- databases&#45;&gt;nas -->
<g id="edge19" class="edge">
<title>databases&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1667.6,-1321C1732.22,-1321 1821,-1321 1896.23,-1321"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1896.22,-1323.63 1903.72,-1321 1896.22,-1318.38 1896.22,-1323.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1769.95,-1321 1769.95,-1343.8 1867.74,-1343.8 1867.74,-1321 1769.95,-1321"/>
<text xml:space="preserve" text-anchor="start" x="1772.95" y="-1326.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
<!-- annict_scraper&#45;&gt;annict -->
<g id="edge6" class="edge">
<title>annict_scraper&#45;&gt;annict</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M657.58,-210C733.53,-210 842.74,-210 921.6,-210"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="921.5,-212.63 929,-210 921.5,-207.38 921.5,-212.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="732.55,-210 732.55,-232.8 803.91,-232.8 803.91,-210 732.55,-210"/>
<text xml:space="preserve" text-anchor="start" x="735.55" y="-215.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">Annict API</text>
</g>
<!-- tuner_stg&#45;&gt;tuner_prod -->
<g id="edge7" class="edge">
<title>tuner_stg&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1127.38,-50C1208.17,-50 1321.52,-50 1414.08,-50"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1413.88,-52.63 1421.38,-50 1413.88,-47.38 1413.88,-52.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1241.7,-50 1241.7,-72.8 1372.96,-72.8 1372.96,-50 1241.7,-50"/>
<text xml:space="preserve" text-anchor="start" x="1244.7" y="-55.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">BS/CS TCP fallback</text>
</g>
</g>
</svg>
`;case`network`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="3612pt" height="1790pt"
 viewBox="0.00 0.00 3612.00 1790.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1775.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1c417d" stroke="#1c356c" points="2604.53,-8 2604.53,-1752 3573.71,-1752 3573.71,-8 2604.53,-8"/>
<text xml:space="preserve" text-anchor="start" x="2612.53" y="-1739.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2644.53,-690 2644.53,-1371 2966.88,-1371 2966.88,-690 2644.53,-690"/>
<text xml:space="preserve" text-anchor="start" x="2652.53" y="-1358.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="3110.26,-48 3110.26,-650 3533.71,-650 3533.71,-48 3110.26,-48"/>
<text xml:space="preserve" text-anchor="start" x="3118.26" y="-637.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_dns</title>
<polygon fill="#3e4651" stroke="#2d333d" points="3150.26,-228 3150.26,-589 3493.71,-589 3493.71,-228 3150.26,-228"/>
<text xml:space="preserve" text-anchor="start" x="3158.26" y="-576.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">内部DNS / METALLB</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_lan</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="3154.11,-690 3154.11,-1691 3489.87,-1691 3489.87,-690 3154.11,-690"/>
<text xml:space="preserve" text-anchor="start" x="3162.11" y="-1678.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">LAN / VLAN・経路</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_oke</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-1011 8,-1633 1329.21,-1633 1329.21,-1011 8,-1011"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1620.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_network</title>
<polygon fill="#3e4651" stroke="#2d333d" points="489.61,-1051 489.61,-1572 1289.21,-1572 1289.21,-1051 489.61,-1051"/>
<text xml:space="preserve" text-anchor="start" x="497.61" y="-1559.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">OCI NETWORK</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_external</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1505.25,-490 1505.25,-1412 2366.25,-1412 2366.25,-490 1505.25,-490"/>
<text xml:space="preserve" text-anchor="start" x="1513.25" y="-1399.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust9" class="cluster">
<title>cluster_edge</title>
<polygon fill="#5a3620" stroke="#462a17" points="1545.25,-530 1545.25,-1051 2326.25,-1051 2326.25,-530 1545.25,-530"/>
<text xml:space="preserve" text-anchor="start" x="1553.25" y="-1038.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<!-- lb -->
<g id="node1" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2926.88,-830 2684.53,-830 2684.53,-730 2926.88,-730 2926.88,-830"/>
<text xml:space="preserve" text-anchor="start" x="2694.54" y="-772" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived ×2</text>
</g>
<!-- router -->
<g id="node2" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2895.7,-1150 2715.7,-1150 2715.7,-1050 2895.7,-1050 2895.7,-1150"/>
<text xml:space="preserve" text-anchor="start" x="2739.55" y="-1092" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / VLAN</text>
</g>
<!-- wifi -->
<g id="node3" class="node">
<title>wifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2895.7,-990 2715.7,-990 2715.7,-890 2895.7,-890 2895.7,-990"/>
<text xml:space="preserve" text-anchor="start" x="2766.27" y="-932" font-family="Arial" font-size="20.00" fill="#f8fafc">Wi&#45;Fi AP</text>
</g>
<!-- unifi -->
<g id="node4" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2895.7,-1310 2715.7,-1310 2715.7,-1210 2895.7,-1210 2895.7,-1310"/>
<text xml:space="preserve" text-anchor="start" x="2732.91" y="-1252" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS Server</text>
</g>
<!-- coredns -->
<g id="node5" class="node">
<title>coredns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3453.71,-528 3190.26,-528 3190.26,-428 3453.71,-428 3453.71,-528"/>
<text xml:space="preserve" text-anchor="start" x="3200.27" y="-470" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / miutaku.internal</text>
</g>
<!-- metallb -->
<g id="node6" class="node">
<title>metallb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3450.37,-368 3193.6,-368 3193.6,-268 3450.37,-268 3450.37,-368"/>
<text xml:space="preserve" text-anchor="start" x="3203.61" y="-310" font-family="Arial" font-size="20.00" fill="#f8fafc">MetalLB / LANのService IP</text>
</g>
<!-- cloudflared -->
<g id="node7" class="node">
<title>cloudflared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3449.84,-188 3194.14,-188 3194.14,-88 3449.84,-88 3449.84,-188"/>
<text xml:space="preserve" text-anchor="start" x="3204.15" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">cloudflared / 自宅connector</text>
</g>
<!-- server -->
<g id="node8" class="node">
<title>server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3449.87,-830 3194.11,-830 3194.11,-730 3449.87,-730 3449.87,-830"/>
<text xml:space="preserve" text-anchor="start" x="3204.12" y="-772" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN20 / 192.168.20.0/24</text>
</g>
<!-- native -->
<g id="node9" class="node">
<title>native</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3433.74,-1630 3210.23,-1630 3210.23,-1530 3433.74,-1530 3433.74,-1630"/>
<text xml:space="preserve" text-anchor="start" x="3220.24" y="-1572" font-family="Arial" font-size="20.00" fill="#f8fafc">native / 192.168.0.0/24</text>
</g>
<!-- management -->
<g id="node10" class="node">
<title>management</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3449.87,-990 3194.11,-990 3194.11,-890 3449.87,-890 3449.87,-990"/>
<text xml:space="preserve" text-anchor="start" x="3204.12" y="-932" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN10 / 192.168.10.0/24</text>
</g>
<!-- client -->
<g id="node11" class="node">
<title>client</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3449.87,-1150 3194.11,-1150 3194.11,-1050 3449.87,-1050 3449.87,-1150"/>
<text xml:space="preserve" text-anchor="start" x="3204.12" y="-1092" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN30 / 192.168.30.0/24</text>
</g>
<!-- guest -->
<g id="node12" class="node">
<title>guest</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3411.99,-1310 3231.99,-1310 3231.99,-1210 3411.99,-1210 3411.99,-1310"/>
<text xml:space="preserve" text-anchor="start" x="3251.94" y="-1252" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN31 / guest</text>
</g>
<!-- iot -->
<g id="node13" class="node">
<title>iot</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3449.87,-1470 3194.11,-1470 3194.11,-1370 3449.87,-1370 3449.87,-1470"/>
<text xml:space="preserve" text-anchor="start" x="3204.12" y="-1412" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN40 / 192.168.40.0/24</text>
</g>
<!-- private_workers -->
<g id="node14" class="node">
<title>private_workers</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="740.83,-1284 529.61,-1284 529.61,-1184 740.83,-1184 740.83,-1284"/>
<text xml:space="preserve" text-anchor="start" x="539.62" y="-1226" font-family="Arial" font-size="20.00" fill="#f8fafc">private worker subnet</text>
</g>
<!-- nat -->
<g id="node15" class="node">
<title>nat</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1249.21,-1191 990.21,-1191 990.21,-1091 1249.21,-1091 1249.21,-1191"/>
<text xml:space="preserve" text-anchor="start" x="1000.21" y="-1133" font-family="Arial" font-size="20.00" fill="#f8fafc">NAT gateway / reserved IP</text>
</g>
<!-- service_gateway -->
<g id="node16" class="node">
<title>service_gateway</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1243.09,-1351 996.32,-1351 996.32,-1251 1243.09,-1251 1243.09,-1351"/>
<text xml:space="preserve" text-anchor="start" x="1006.33" y="-1293" font-family="Arial" font-size="20.00" fill="#f8fafc">Service Gateway / Oracle</text>
</g>
<!-- igw -->
<g id="node17" class="node">
<title>igw</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="725.22,-1511 545.22,-1511 545.22,-1411 725.22,-1411 725.22,-1511"/>
<text xml:space="preserve" text-anchor="start" x="561.28" y="-1453" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet gateway</text>
</g>
<!-- public_api -->
<g id="node18" class="node">
<title>public_api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1215.87,-1511 1023.54,-1511 1023.54,-1411 1215.87,-1411 1215.87,-1511"/>
<text xml:space="preserve" text-anchor="start" x="1033.55" y="-1453" font-family="Arial" font-size="20.00" fill="#f8fafc">公開API・LB subnet</text>
</g>
<!-- workers -->
<g id="node19" class="node">
<title>workers</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="265.94,-1284 48,-1284 48,-1184 265.94,-1184 265.94,-1284"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-1226" font-family="Arial" font-size="20.00" fill="#f8fafc">base / burst node pool</text>
</g>
<!-- warp -->
<g id="node20" class="node">
<title>warp</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1857.55,-670 1585.25,-670 1585.25,-570 1857.55,-570 1857.55,-670"/>
<text xml:space="preserve" text-anchor="start" x="1595.26" y="-612" font-family="Arial" font-size="20.00" fill="#f8fafc">WARP / private CIDR routes</text>
</g>
<!-- access -->
<g id="node21" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1811.4,-830 1631.4,-830 1631.4,-730 1811.4,-730 1811.4,-830"/>
<text xml:space="preserve" text-anchor="start" x="1664.16" y="-772" font-family="Arial" font-size="20.00" fill="#f8fafc">Access / 認証</text>
</g>
<!-- tunnel -->
<g id="node22" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1811.4,-990 1631.4,-990 1631.4,-890 1811.4,-890 1811.4,-990"/>
<text xml:space="preserve" text-anchor="start" x="1642.46" y="-932" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- routes -->
<g id="node23" class="node">
<title>routes</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2286.25,-990 2028.37,-990 2028.37,-890 2286.25,-890 2286.25,-990"/>
<text xml:space="preserve" text-anchor="start" x="2038.38" y="-932" font-family="Arial" font-size="20.00" fill="#f8fafc">公開hostname / 設定から抽出</text>
</g>
<!-- internet -->
<g id="node24" class="node">
<title>internet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1811.4,-1191 1631.4,-1191 1631.4,-1091 1811.4,-1091 1811.4,-1191"/>
<text xml:space="preserve" text-anchor="start" x="1687.49" y="-1133" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet</text>
</g>
<!-- oracle -->
<g id="node25" class="node">
<title>oracle</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1841.44,-1351 1601.36,-1351 1601.36,-1251 1841.44,-1251 1841.44,-1351"/>
<text xml:space="preserve" text-anchor="start" x="1611.37" y="-1293" font-family="Arial" font-size="20.00" fill="#f8fafc">Oracle Services Network</text>
</g>
<!-- operator -->
<g id="node26" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="1209.71,-830 1029.71,-830 1029.71,-730 1209.71,-730 1209.71,-830"/>
<text xml:space="preserve" text-anchor="start" x="1094.7" y="-772" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- lb&#45;&gt;metallb -->
<!-- router&#45;&gt;coredns -->
<g id="edge17" class="edge">
<title>router&#45;&gt;coredns</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M2895.43,-1075.36C2922.88,-1063.23 2950.25,-1045.52 2966.88,-1020 2977.08,-1004.34 2968.47,-869.55 2974.88,-852 3011.75,-751.09 3091.53,-661.75 3165.21,-595.72"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="3166.64,-597.95 3170.51,-591.01 3163.16,-594.02 3166.64,-597.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2992,-789.06 2992,-811.86 3089.8,-811.86 3089.8,-789.06 2992,-789.06"/>
<text xml:space="preserve" text-anchor="start" x="2995" y="-794.86" font-family="Arial" font-size="14.00" fill="#bbfcd3">LAN / 内部DNS</text>
</g>
<!-- router&#45;&gt;server -->
<g id="edge18" class="edge">
<title>router&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2895.41,-1073.43C2922.18,-1061.24 2949.14,-1043.99 2966.88,-1020 2979.69,-1002.68 2964.13,-990.87 2974.88,-972.2 3013.87,-904.47 3042.74,-899.33 3110.26,-860 3133.35,-846.55 3159.11,-834.59 3184.48,-824.27"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3185.37,-826.74 3191.37,-821.52 3183.43,-821.86 3185.37,-826.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3016.5,-972.2 3016.5,-995 3060.64,-995 3060.64,-972.2 3016.5,-972.2"/>
<text xml:space="preserve" text-anchor="start" x="3019.5" y="-978" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI20</text>
</g>
<!-- router&#45;&gt;native -->
<g id="edge19" class="edge">
<title>router&#45;&gt;native</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2895.51,-1124.59C2922.97,-1136.72 2950.32,-1154.43 2966.88,-1180 2978.43,-1197.83 2966.11,-1351.65 2974.88,-1371 3009.2,-1446.69 3039.94,-1455.71 3110.26,-1500 3138.02,-1517.48 3170.2,-1532.09 3200.92,-1543.84"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3199.62,-1546.15 3207.56,-1546.33 3201.46,-1541.24 3199.62,-1546.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3008.73,-1494.85 3008.73,-1517.65 3068.42,-1517.65 3068.42,-1494.85 3008.73,-1494.85"/>
<text xml:space="preserve" text-anchor="start" x="3011.73" y="-1500.65" font-family="Arial" font-size="14.00" fill="#c9c9c9">native IF</text>
</g>
<!-- router&#45;&gt;management -->
<g id="edge20" class="edge">
<title>router&#45;&gt;management</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2895.7,-1072.31C2975.31,-1047.55 3093.2,-1010.87 3184.69,-982.4"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3185.31,-984.96 3191.69,-980.23 3183.75,-979.95 3185.31,-984.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3016.5,-1043.68 3016.5,-1066.48 3060.64,-1066.48 3060.64,-1043.68 3016.5,-1043.68"/>
<text xml:space="preserve" text-anchor="start" x="3019.5" y="-1049.48" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI10</text>
</g>
<!-- router&#45;&gt;client -->
<g id="edge21" class="edge">
<title>router&#45;&gt;client</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2895.7,-1100C2975.15,-1100 3092.73,-1100 3184.13,-1100"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3184.05,-1102.63 3191.55,-1100 3184.05,-1097.38 3184.05,-1102.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3016.5,-1100 3016.5,-1122.8 3060.64,-1122.8 3060.64,-1100 3016.5,-1100"/>
<text xml:space="preserve" text-anchor="start" x="3019.5" y="-1105.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI30</text>
</g>
<!-- router&#45;&gt;guest -->
<g id="edge22" class="edge">
<title>router&#45;&gt;guest</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2895.7,-1127.69C2986.77,-1156.02 3127.96,-1199.95 3222.38,-1229.32"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3221.39,-1231.76 3229.33,-1231.48 3222.95,-1226.75 3221.39,-1231.76"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2974.88,-1189.58 2974.88,-1212.38 3102.26,-1212.38 3102.26,-1189.58 2974.88,-1189.58"/>
<text xml:space="preserve" text-anchor="start" x="2977.88" y="-1195.38" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI31 / 他VLAN拒否</text>
</g>
<!-- router&#45;&gt;iot -->
<g id="edge23" class="edge">
<title>router&#45;&gt;iot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2895.37,-1126.6C2922.14,-1138.79 2949.1,-1156.03 2966.88,-1180 2979.5,-1197.02 2964.32,-1208.63 2974.88,-1227 3013.95,-1294.94 3042.61,-1300.43 3110.26,-1340 3133.33,-1353.49 3159.08,-1365.47 3184.44,-1375.79"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3183.39,-1378.2 3191.33,-1378.55 3185.34,-1373.32 3183.39,-1378.2"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="3016.5,-1333.23 3016.5,-1356.03 3060.64,-1356.03 3060.64,-1333.23 3016.5,-1333.23"/>
<text xml:space="preserve" text-anchor="start" x="3019.5" y="-1339.03" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI40</text>
</g>
<!-- cloudflared&#45;&gt;tunnel -->
<g id="edge3" class="edge">
<title>cloudflared&#45;&gt;tunnel</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M3194.36,-177.38C3166.13,-187.71 3136.74,-199.73 3110.26,-213 2865.05,-335.91 2839.61,-427.92 2596.53,-555 2300.54,-709.74 2190.39,-670.38 1897.55,-831 1878.3,-841.56 1875.91,-847.95 1857.55,-860 1844.93,-868.29 1831.44,-876.73 1818.06,-884.87"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1816.94,-882.49 1811.88,-888.61 1819.66,-886.98 1816.94,-882.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2431.81,-650.78 2431.81,-673.58 2538.96,-673.58 2538.96,-650.78 2431.81,-650.78"/>
<text xml:space="preserve" text-anchor="start" x="2434.81" y="-656.58" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きTunnel接続</text>
</g>
<!-- private_workers&#45;&gt;nat -->
<g id="edge6" class="edge">
<title>private_workers&#45;&gt;nat</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M740.61,-1213.88C810.76,-1200.36 903.96,-1182.39 980.28,-1167.68"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="980.61,-1170.29 987.48,-1166.29 979.62,-1165.14 980.61,-1170.29"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="823.6,-1203.92 823.6,-1226.72 907.43,-1226.72 907.43,-1203.92 823.6,-1203.92"/>
<text xml:space="preserve" text-anchor="start" x="826.6" y="-1209.72" font-family="Arial" font-size="14.00" fill="#c9c9c9">default route</text>
</g>
<!-- private_workers&#45;&gt;service_gateway -->
<g id="edge7" class="edge">
<title>private_workers&#45;&gt;service_gateway</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M740.61,-1248.5C812.61,-1258.49 908.91,-1271.87 986.3,-1282.61"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="985.82,-1285.2 993.61,-1283.63 986.54,-1280 985.82,-1285.2"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="780.83,-1277.42 780.83,-1300.22 950.21,-1300.22 950.21,-1277.42 780.83,-1277.42"/>
<text xml:space="preserve" text-anchor="start" x="783.83" y="-1283.22" font-family="Arial" font-size="14.00" fill="#c9c9c9">Oracle service CIDR route</text>
</g>
<!-- nat&#45;&gt;internet -->
<g id="edge8" class="edge">
<title>nat&#45;&gt;internet</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1248.99,-1141C1360.43,-1141 1519.51,-1141 1621.37,-1141"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1621.13,-1143.63 1628.63,-1141 1621.13,-1138.38 1621.13,-1143.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1351.21,-1141 1351.21,-1163.8 1483.25,-1163.8 1483.25,-1141 1351.21,-1141"/>
<text xml:space="preserve" text-anchor="start" x="1354.21" y="-1146.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">NAT / reserved IPv4</text>
</g>
<!-- service_gateway&#45;&gt;oracle -->
<g id="edge9" class="edge">
<title>service_gateway&#45;&gt;oracle</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1242.79,-1301C1344.1,-1301 1487.79,-1301 1591.06,-1301"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1591.03,-1303.63 1598.53,-1301 1591.03,-1298.38 1591.03,-1303.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1337.21,-1301 1337.21,-1323.8 1497.25,-1323.8 1497.25,-1301 1337.21,-1301"/>
<text xml:space="preserve" text-anchor="start" x="1340.21" y="-1306.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">Oracle Services Network</text>
</g>
<!-- igw&#45;&gt;public_api -->
<g id="edge16" class="edge">
<title>igw&#45;&gt;public_api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M725,-1461C806.47,-1461 927.24,-1461 1013.52,-1461"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1013.34,-1463.63 1020.84,-1461 1013.34,-1458.38 1013.34,-1463.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="809.2,-1461 809.2,-1483.8 921.83,-1483.8 921.83,-1461 809.2,-1461"/>
<text xml:space="preserve" text-anchor="start" x="812.2" y="-1466.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">public route table</text>
</g>
<!-- workers&#45;&gt;private_workers -->
<g id="edge4" class="edge">
<title>workers&#45;&gt;private_workers</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M265.74,-1234C341.37,-1234 442.36,-1234 519.48,-1234"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="519.2,-1236.63 526.7,-1234 519.2,-1231.38 519.2,-1236.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="305.94,-1234 305.94,-1256.8 481.61,-1256.8 481.61,-1234 305.94,-1234"/>
<text xml:space="preserve" text-anchor="start" x="308.94" y="-1239.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">private subnet / 10.0.2.0/24</text>
</g>
<!-- warp&#45;&gt;server -->
<g id="edge5" class="edge">
<title>warp&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1857.5,-581.07C2029.85,-536.81 2336.76,-476.19 2596.53,-521.2 2821.01,-560.09 3067.99,-662.06 3207.82,-725.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="3206.62,-728.12 3214.53,-728.85 3208.8,-723.34 3206.62,-728.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2374.25,-521.2 2374.25,-544 2596.53,-544 2596.53,-521.2 2374.25,-521.2"/>
<text xml:space="preserve" text-anchor="start" x="2377.25" y="-527" font-family="Arial" font-size="14.00" fill="#c9c9c9">private CIDR routes / WARP policy</text>
</g>
<!-- access&#45;&gt;routes -->
<g id="edge10" class="edge">
<title>access&#45;&gt;routes</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1811.25,-812.76C1871.05,-834.81 1951.06,-864.32 2018.99,-889.36"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2017.7,-891.69 2025.65,-891.82 2019.52,-886.76 2017.7,-891.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1897.56,-874.33 1897.56,-897.13 1988.36,-897.13 1988.36,-874.33 1897.56,-874.33"/>
<text xml:space="preserve" text-anchor="start" x="1900.56" y="-880.13" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access policy</text>
</g>
<!-- tunnel&#45;&gt;routes -->
<g id="edge11" class="edge">
<title>tunnel&#45;&gt;routes</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1811.25,-940C1870.8,-940 1950.41,-940 2018.15,-940"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2017.96,-942.63 2025.46,-940 2017.96,-937.38 2017.96,-942.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1897.55,-940 1897.55,-962.8 1988.37,-962.8 1988.37,-940 1897.55,-940"/>
<text xml:space="preserve" text-anchor="start" x="1900.55" y="-945.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">hostname転送</text>
</g>
<!-- routes&#45;&gt;router -->
<g id="edge13" class="edge">
<title>routes&#45;&gt;router</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2286.02,-971.61C2409.41,-1002.15 2593.7,-1047.77 2706.17,-1075.61"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2705.3,-1078.1 2713.21,-1077.35 2706.56,-1073 2705.3,-1078.1"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2435.71,-1048.25 2435.71,-1071.05 2535.06,-1071.05 2535.06,-1048.25 2435.71,-1048.25"/>
<text xml:space="preserve" text-anchor="start" x="2438.71" y="-1054.05" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- routes&#45;&gt;wifi -->
<g id="edge14" class="edge">
<title>routes&#45;&gt;wifi</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2286.02,-940C2409.29,-940 2593.33,-940 2705.83,-940"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2705.62,-942.63 2713.12,-940 2705.62,-937.38 2705.62,-942.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2435.71,-940 2435.71,-962.8 2535.06,-962.8 2535.06,-940 2435.71,-940"/>
<text xml:space="preserve" text-anchor="start" x="2438.71" y="-945.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- routes&#45;&gt;unifi -->
<g id="edge15" class="edge">
<title>routes&#45;&gt;unifi</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2224.14,-989.75C2265.8,-1019.9 2321.57,-1057.83 2374.25,-1086 2471.73,-1138.13 2502.03,-1138.6 2604.53,-1180 2637.69,-1193.4 2673.99,-1207.94 2706.46,-1220.9"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2705.21,-1223.23 2713.15,-1223.57 2707.16,-1218.36 2705.21,-1223.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2435.71,-1175.22 2435.71,-1198.02 2535.06,-1198.02 2535.06,-1175.22 2435.71,-1175.22"/>
<text xml:space="preserve" text-anchor="start" x="2438.71" y="-1181.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- internet&#45;&gt;igw -->
<g id="edge12" class="edge">
<title>internet&#45;&gt;igw</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1631.63,-1106.01C1492.78,-1056.28 1216.66,-977.56 990.21,-1038.2 886.43,-1065.99 845.85,-1073.48 780.83,-1159 737.77,-1215.64 770.84,-1249.5 740.83,-1314 726.22,-1345.39 704.72,-1377.08 685.01,-1402.96"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="683.04,-1401.21 680.54,-1408.75 687.2,-1404.42 683.04,-1401.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1056.02,-1038.2 1056.02,-1061 1183.39,-1061 1183.39,-1038.2 1056.02,-1038.2"/>
<text xml:space="preserve" text-anchor="start" x="1059.02" y="-1044" font-family="Arial" font-size="14.00" fill="#c9c9c9">公開API・LBへの到達</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge1" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1209.52,-780C1319.55,-780 1506.47,-780 1621.13,-780"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1621.13,-782.63 1628.63,-780 1621.13,-777.38 1621.13,-782.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1390.89,-780 1390.89,-802.8 1443.57,-802.8 1443.57,-780 1390.89,-780"/>
<text xml:space="preserve" text-anchor="start" x="1393.89" y="-785.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">管理認証</text>
</g>
</g>
</svg>
`;case`storage`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2317pt" height="1381pt"
 viewBox="0.00 0.00 2317.00 1381.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1366.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1c417d" stroke="#1c356c" points="8,-8 8,-1343 2018.26,-1343 2018.26,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1330.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="48,-745 48,-1266 329.16,-1266 329.16,-745 48,-745"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-1253.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="58.58,-48 58.58,-409 318.58,-409 318.58,-48 58.58,-48"/>
<text xml:space="preserve" text-anchor="start" x="66.58" y="-396.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_data</title>
<polygon fill="#3f3f3f" stroke="#2d2d2d" points="512.97,-48 512.97,-1282 1978.26,-1282 1978.26,-48 512.97,-48"/>
<text xml:space="preserve" text-anchor="start" x="520.97" y="-1269.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_databases</title>
<polygon fill="#3e4651" stroke="#2d333d" points="552.97,-228 552.97,-589 869.73,-589 869.73,-228 552.97,-228"/>
<text xml:space="preserve" text-anchor="start" x="560.97" y="-576.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">DB / アプリ共有基盤</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_backups</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1563.72,-540 1563.72,-1221 1938.26,-1221 1938.26,-540 1563.72,-540"/>
<text xml:space="preserve" text-anchor="start" x="1571.72" y="-1208.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">バックアップ処理</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_nas</title>
<polygon fill="#5a3620" stroke="#462a17" points="1029.37,-540 1029.37,-901 1380.63,-901 1380.63,-540 1029.37,-540"/>
<text xml:space="preserve" text-anchor="start" x="1037.37" y="-888.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">TRUENAS VM ×2 / ZFS・NFS</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2035.26,-360 2035.26,-545 2279.26,-545 2279.26,-360 2035.26,-360"/>
<text xml:space="preserve" text-anchor="start" x="2043.26" y="-532.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<!-- nextcloud -->
<g id="node1" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="278.58,-885 98.58,-885 98.58,-785 278.58,-785 278.58,-885"/>
<text xml:space="preserve" text-anchor="start" x="144.11" y="-827" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node2" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="278.58,-1045 98.58,-1045 98.58,-945 278.58,-945 278.58,-1045"/>
<text xml:space="preserve" text-anchor="start" x="146.9" y="-987" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信</text>
</g>
<!-- local_store -->
<g id="node3" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M289.16,-1195.91C289.16,-1200.93 244.08,-1205 188.58,-1205 133.08,-1205 88,-1200.93 88,-1195.91 88,-1195.91 88,-1114.09 88,-1114.09 88,-1109.07 133.08,-1105 188.58,-1105 244.08,-1105 289.16,-1109.07 289.16,-1114.09 289.16,-1114.09 289.16,-1195.91 289.16,-1195.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M289.16,-1195.91C289.16,-1190.9 244.08,-1186.82 188.58,-1186.82 133.08,-1186.82 88,-1190.9 88,-1195.91"/>
<text xml:space="preserve" text-anchor="start" x="98.01" y="-1147" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- x570 -->
<g id="node4" class="node">
<title>x570</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="278.58,-188 98.58,-188 98.58,-88 278.58,-88 278.58,-188"/>
<text xml:space="preserve" text-anchor="start" x="119.11" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox / x570</text>
</g>
<!-- b550m -->
<g id="node5" class="node">
<title>b550m</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="278.58,-348 98.58,-348 98.58,-248 278.58,-248 278.58,-348"/>
<text xml:space="preserve" text-anchor="start" x="110.22" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox / b550m</text>
</g>
<!-- mariadb -->
<g id="node6" class="node">
<title>mariadb</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M801.35,-358.91C801.35,-363.93 761.01,-368 711.35,-368 661.69,-368 621.35,-363.93 621.35,-358.91 621.35,-358.91 621.35,-277.09 621.35,-277.09 621.35,-272.07 661.69,-268 711.35,-268 761.01,-268 801.35,-272.07 801.35,-277.09 801.35,-277.09 801.35,-358.91 801.35,-358.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M801.35,-358.91C801.35,-353.9 761.01,-349.82 711.35,-349.82 661.69,-349.82 621.35,-353.9 621.35,-358.91"/>
<text xml:space="preserve" text-anchor="start" x="672.45" y="-310" font-family="Arial" font-size="20.00" fill="#ffe0c2">MariaDB</text>
</g>
<!-- postgres -->
<g id="node7" class="node">
<title>postgres</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M829.73,-518.91C829.73,-523.93 776.67,-528 711.35,-528 646.03,-528 592.97,-523.93 592.97,-518.91 592.97,-518.91 592.97,-437.09 592.97,-437.09 592.97,-432.07 646.03,-428 711.35,-428 776.67,-428 829.73,-432.07 829.73,-437.09 829.73,-437.09 829.73,-518.91 829.73,-518.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M829.73,-518.91C829.73,-513.9 776.67,-509.82 711.35,-509.82 646.03,-509.82 592.97,-513.9 592.97,-518.91"/>
<text xml:space="preserve" text-anchor="start" x="602.98" y="-470" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL / 本番・STG</text>
</g>
<!-- db -->
<g id="node8" class="node">
<title>db</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1883.27,-680 1618.71,-680 1618.71,-580 1883.27,-580 1883.27,-680"/>
<text xml:space="preserve" text-anchor="start" x="1628.72" y="-622" font-family="Arial" font-size="20.00" fill="#f8fafc">DB logical dump / 自宅Talos</text>
</g>
<!-- recordings -->
<g id="node9" class="node">
<title>recordings</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1867.7,-1000 1634.28,-1000 1634.28,-900 1867.7,-900 1867.7,-1000"/>
<text xml:space="preserve" text-anchor="start" x="1644.29" y="-942" font-family="Arial" font-size="20.00" fill="#f8fafc">録画 / 自宅Talos CronJob</text>
</g>
<!-- metrics -->
<g id="node10" class="node">
<title>metrics</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1886.04,-1160 1615.94,-1160 1615.94,-1060 1886.04,-1060 1886.04,-1160"/>
<text xml:space="preserve" text-anchor="start" x="1625.95" y="-1102" font-family="Arial" font-size="20.00" fill="#f8fafc">metrics snapshot / 自宅Talos</text>
</g>
<!-- nas -->
<g id="node11" class="node">
<title>nas</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1898.26,-840 1603.72,-840 1603.72,-740 1898.26,-740 1898.26,-840"/>
<text xml:space="preserve" text-anchor="start" x="1613.72" y="-782" font-family="Arial" font-size="20.00" fill="#f8fafc">NAS restic / 自宅Talos CronJob</text>
</g>
<!-- nas02 -->
<g id="node12" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1340.63,-830.91C1340.63,-835.93 1279.84,-840 1205,-840 1130.16,-840 1069.37,-835.93 1069.37,-830.91 1069.37,-830.91 1069.37,-749.09 1069.37,-749.09 1069.37,-744.07 1130.16,-740 1205,-740 1279.84,-740 1340.63,-744.07 1340.63,-749.09 1340.63,-749.09 1340.63,-830.91 1340.63,-830.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1340.63,-830.91C1340.63,-825.9 1279.84,-821.82 1205,-821.82 1130.16,-821.82 1069.37,-825.9 1069.37,-830.91"/>
<text xml:space="preserve" text-anchor="start" x="1079.38" y="-782" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM69002 / nas&#45;02</text>
</g>
<!-- nas01 -->
<g id="node13" class="node">
<title>nas01</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1340.63,-670.91C1340.63,-675.93 1279.84,-680 1205,-680 1130.16,-680 1069.37,-675.93 1069.37,-670.91 1069.37,-670.91 1069.37,-589.09 1069.37,-589.09 1069.37,-584.07 1130.16,-580 1205,-580 1279.84,-580 1340.63,-584.07 1340.63,-589.09 1340.63,-589.09 1340.63,-670.91 1340.63,-670.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1340.63,-670.91C1340.63,-665.9 1279.84,-661.82 1205,-661.82 1130.16,-661.82 1069.37,-665.9 1069.37,-670.91"/>
<text xml:space="preserve" text-anchor="start" x="1079.38" y="-622" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM69001 / nas&#45;01</text>
</g>
<!-- shared -->
<g id="node14" class="node">
<title>shared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="843.08,-729 579.62,-729 579.62,-629 843.08,-629 843.08,-729"/>
<text xml:space="preserve" text-anchor="start" x="589.63" y="-671" font-family="Arial" font-size="20.00" fill="#f8fafc">共有PV / runner cache・状態</text>
</g>
<!-- pbs -->
<g id="node15" class="node">
<title>pbs</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M829.17,-178.91C829.17,-183.93 776.36,-188 711.35,-188 646.34,-188 593.52,-183.93 593.52,-178.91 593.52,-178.91 593.52,-97.09 593.52,-97.09 593.52,-92.07 646.34,-88 711.35,-88 776.36,-88 829.17,-92.07 829.17,-97.09 829.17,-97.09 829.17,-178.91 829.17,-178.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M829.17,-178.91C829.17,-173.9 776.36,-169.82 711.35,-169.82 646.34,-169.82 593.52,-173.9 593.52,-178.91"/>
<text xml:space="preserve" text-anchor="start" x="603.53" y="-130" font-family="Arial" font-size="20.00" fill="#ffe0c2">Proxmox Backup Server</text>
</g>
<!-- idrive -->
<g id="node16" class="node">
<title>idrive</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2247.26,-482.91C2247.26,-487.93 2206.92,-492 2157.26,-492 2107.6,-492 2067.26,-487.93 2067.26,-482.91 2067.26,-482.91 2067.26,-401.09 2067.26,-401.09 2067.26,-396.07 2107.6,-392 2157.26,-392 2206.92,-392 2247.26,-396.07 2247.26,-401.09 2247.26,-401.09 2247.26,-482.91 2247.26,-482.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2247.26,-482.91C2247.26,-477.9 2206.92,-473.82 2157.26,-473.82 2107.6,-473.82 2067.26,-477.9 2067.26,-482.91"/>
<text xml:space="preserve" text-anchor="start" x="2096.68" y="-434" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2 / S3</text>
</g>
<!-- nextcloud&#45;&gt;mariadb -->
<g id="edge1" class="edge">
<title>nextcloud&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M214.53,-785.1C261.46,-695.86 371.05,-508.01 512.97,-398 541.7,-375.73 577.46,-358.77 610.63,-346.32"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="611.38,-348.85 617.52,-343.81 609.58,-343.91 611.38,-348.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="337.16,-580.97 337.16,-603.77 504.97,-603.77 504.97,-580.97 337.16,-580.97"/>
<text xml:space="preserve" text-anchor="start" x="340.16" y="-586.77" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- nextcloud&#45;&gt;nas02 -->
<g id="edge2" class="edge">
<title>nextcloud&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M278.53,-830.8C297.85,-830.05 318.19,-829.39 337.16,-829 579.83,-824.07 640.4,-839.19 883.08,-844 944.53,-845.22 960.54,-852.8 1021.37,-844 1033.57,-842.23 1046.09,-839.84 1058.58,-837.03"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1058.93,-839.65 1065.63,-835.38 1057.73,-834.53 1058.93,-839.65"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="655.83,-843.66 655.83,-866.46 766.87,-866.46 766.87,-843.66 655.83,-843.66"/>
<text xml:space="preserve" text-anchor="start" x="658.83" y="-849.46" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- recording&#45;&gt;mariadb -->
<g id="edge3" class="edge">
<title>recording&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M278.49,-958.95C297.67,-947.47 316.09,-932.95 329.16,-915 339.27,-901.12 330.59,-893.07 337.16,-877.2 389.5,-750.74 463.71,-749.49 504.97,-619 512.38,-595.57 498.88,-418.13 512.97,-398 535.66,-365.61 573.83,-346.32 610.6,-334.84"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="611.05,-337.44 617.51,-332.8 609.57,-332.41 611.05,-337.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="369.82,-877.2 369.82,-900 472.31,-900 472.31,-877.2 369.82,-877.2"/>
<text xml:space="preserve" text-anchor="start" x="372.82" y="-883" font-family="Arial" font-size="14.00" fill="#bbfcd3">EPGStation DB</text>
</g>
<!-- recording&#45;&gt;postgres -->
<g id="edge4" class="edge">
<title>recording&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M278.54,-977.85C366.71,-959.96 490.66,-932.05 504.97,-914 518.16,-897.36 499.92,-548.74 512.97,-532 530.14,-509.98 555.38,-496.39 582.1,-488.13"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="582.59,-490.72 589.09,-486.15 581.16,-485.67 582.59,-490.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="407.57,-965.13 407.57,-987.93 434.56,-987.93 434.56,-965.13 407.57,-965.13"/>
<text xml:space="preserve" text-anchor="start" x="410.57" y="-973.33" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- recording&#45;&gt;recordings -->
<g id="edge6" class="edge">
<title>recording&#45;&gt;recordings</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M278.37,-1011.8C297.7,-1015.13 318.08,-1018.4 337.16,-1021 414.94,-1031.6 434.56,-1034.22 512.97,-1038 919.89,-1057.63 1401.07,-1000.17 1624.44,-968.85"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1624.49,-971.49 1631.56,-967.85 1623.76,-966.29 1624.49,-971.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="893.21,-1037.54 893.21,-1060.34 1011.24,-1060.34 1011.24,-1037.54 893.21,-1037.54"/>
<text xml:space="preserve" text-anchor="start" x="896.21" y="-1043.34" font-family="Arial" font-size="14.00" fill="#ffe0c2">録画ファイル専用job</text>
</g>
<!-- recording&#45;&gt;nas02 -->
<g id="edge5" class="edge">
<title>recording&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M278.35,-1004.24C341.77,-1009.08 428.97,-1012.12 504.97,-1002 711.06,-974.56 939.87,-895.32 1077.78,-841.88"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1078.69,-844.34 1084.73,-839.18 1076.78,-839.45 1078.69,-844.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="620.82,-1000.53 620.82,-1023.33 801.88,-1023.33 801.88,-1000.53 620.82,-1000.53"/>
<text xml:space="preserve" text-anchor="start" x="623.82" y="-1006.33" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画・thumbnail・drop / NFS</text>
</g>
<!-- local_store&#45;&gt;metrics -->
<g id="edge8" class="edge">
<title>local_store&#45;&gt;metrics</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M289.89,-1198.73C305.54,-1204.7 321.66,-1210.35 337.16,-1215 413.47,-1237.88 433.68,-1242.18 512.97,-1250 909.03,-1289.04 1375.33,-1199.49 1605.91,-1146.13"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1606.38,-1148.72 1613.09,-1144.46 1605.19,-1143.6 1606.38,-1148.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="883.08,-1254.13 883.08,-1276.93 1021.37,-1276.93 1021.37,-1254.13 883.08,-1254.13"/>
<text xml:space="preserve" text-anchor="start" x="886.08" y="-1259.93" font-family="Arial" font-size="14.00" fill="#ffe0c2">snapshot / vmbackup</text>
</g>
<!-- local_store&#45;&gt;nas02 -->
<g id="edge7" class="edge">
<title>local_store&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M290.15,-1179.05C456.25,-1212.82 792.28,-1255.53 1021.37,-1114 1116.79,-1055.05 1166.8,-926.93 1189.1,-850.65"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1191.57,-851.54 1191.1,-843.61 1186.52,-850.1 1191.57,-851.54"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="649.62,-1212.54 649.62,-1235.34 773.08,-1235.34 773.08,-1212.54 649.62,-1212.54"/>
<text xml:space="preserve" text-anchor="start" x="652.62" y="-1218.34" font-family="Arial" font-size="14.00" fill="#bbfcd3">metrics用NFS PVC</text>
</g>
<!-- x570&#45;&gt;pbs -->
<g id="edge9" class="edge">
<title>x570&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M278.51,-138C362.09,-138 488.1,-138 582.47,-138"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="582.41,-140.63 589.91,-138 582.41,-135.38 582.41,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="383.05,-138 383.05,-160.8 459.08,-160.8 459.08,-138 383.05,-138"/>
<text xml:space="preserve" text-anchor="start" x="386.05" y="-143.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- b550m&#45;&gt;pbs -->
<g id="edge10" class="edge">
<title>b550m&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M278.51,-270.68C362.26,-244.95 488.62,-206.13 583.04,-177.11"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="583.65,-179.67 590.05,-174.96 582.11,-174.66 583.65,-179.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="383.05,-250.72 383.05,-273.52 459.08,-273.52 459.08,-250.72 383.05,-250.72"/>
<text xml:space="preserve" text-anchor="start" x="386.05" y="-256.52" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- postgres&#45;&gt;db -->
<g id="edge11" class="edge">
<title>postgres&#45;&gt;db</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M869.72,-484.41C918.37,-486.72 972.1,-489.61 1021.37,-493 1181.3,-504 1223,-495.84 1380.63,-525 1392.52,-527.2 1509.7,-560.67 1608.93,-589.24"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1607.93,-591.68 1615.87,-591.23 1609.39,-586.64 1607.93,-591.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1104.55,-482.86 1104.55,-505.66 1247.5,-505.66 1247.5,-482.86 1104.55,-482.86"/>
<text xml:space="preserve" text-anchor="start" x="1107.55" y="-488.66" font-family="Arial" font-size="14.00" fill="#ffe0c2">整合性あるlogical dump</text>
</g>
<!-- postgres&#45;&gt;nas02 -->
<g id="edge12" class="edge">
<title>postgres&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M869.73,-504.81C943.19,-518.07 1015.84,-532.58 1021.37,-539 1033.79,-553.41 1018.73,-694.24 1029.37,-710 1037.64,-722.24 1048.27,-732.63 1060.2,-741.46"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1058.5,-743.48 1066.16,-745.6 1061.5,-739.17 1058.5,-743.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="928.24,-601.13 928.24,-623.93 1026.04,-623.93 1026.04,-601.13 928.24,-601.13"/>
<text xml:space="preserve" text-anchor="start" x="931.24" y="-606.93" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
<!-- nas&#45;&gt;idrive -->
<g id="edge16" class="edge">
<title>nas&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1938.26,-755.18C1967.08,-744.05 1994.96,-729.37 2018.26,-710 2083.16,-656.04 2121.06,-563.71 2140.22,-502.77"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="2142.67,-503.73 2142.36,-495.79 2137.65,-502.19 2142.67,-503.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1886.21,-623.32 1886.21,-646.12 2074.28,-646.12 2074.28,-623.32 1886.21,-623.32"/>
<text xml:space="preserve" text-anchor="start" x="1889.21" y="-629.12" font-family="Arial" font-size="14.00" fill="#ffe0c2">用途別prefix / 暗号化・retention</text>
</g>
<!-- nas02&#45;&gt;nas -->
<g id="edge15" class="edge">
<title>nas02&#45;&gt;nas</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1341.52,-790C1418.02,-790 1513.96,-790 1593.64,-790"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1593.24,-792.63 1600.74,-790 1593.24,-787.38 1593.24,-792.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1411.98,-790 1411.98,-812.8 1532.36,-812.8 1532.36,-790 1411.98,-790"/>
<text xml:space="preserve" text-anchor="start" x="1414.98" y="-795.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">対象dataset / restic</text>
</g>
<!-- shared&#45;&gt;nas01 -->
<g id="edge13" class="edge">
<title>shared&#45;&gt;nas01</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M842.81,-666C909.11,-659.39 989.88,-651.34 1058.21,-644.53"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1058.42,-647.15 1065.62,-643.79 1057.9,-641.92 1058.42,-647.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="888.53,-661.75 888.53,-684.55 1015.92,-684.55 1015.92,-661.75 888.53,-661.75"/>
<text xml:space="preserve" text-anchor="start" x="891.53" y="-667.55" font-family="Arial" font-size="14.00" fill="#bbfcd3">runner cache / NFS</text>
</g>
<!-- pbs&#45;&gt;idrive -->
<g id="edge14" class="edge">
<title>pbs&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M829.9,-162.75C1107.11,-221.11 1797.79,-366.53 2056.4,-420.97"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="2055.69,-423.51 2063.57,-422.48 2056.77,-418.37 2055.69,-423.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1388.63,-314.46 1388.63,-337.26 1555.72,-337.26 1555.72,-314.46 1388.63,-314.46"/>
<text xml:space="preserve" text-anchor="start" x="1391.63" y="-320.26" font-family="Arial" font-size="14.00" fill="#ffe0c2">S3 datastore / VM backup</text>
</g>
</g>
</svg>
`;case`power`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2354pt" height="825pt"
 viewBox="0.00 0.00 2354.00 825.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 810.05)">
<g id="clust1" class="cluster">
<title>cluster_ups</title>
<polygon fill="#3e4651" stroke="#2d333d" points="8,-300 8,-787 2315.96,-787 2315.96,-300 8,-300"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-774.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">UPS / NUT</text>
</g>
<!-- mains -->
<g id="node1" class="node">
<title>mains</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="228,-626.01 48,-626.01 48,-526 228,-526 228,-626.01"/>
<text xml:space="preserve" text-anchor="start" x="107.44" y="-568" font-family="Arial" font-size="20.00" fill="#f8fafc">商用AC</text>
</g>
<!-- surge_a -->
<g id="node2" class="node">
<title>surge_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="713.58,-453.01 419.02,-453.01 419.02,-353 713.58,-353 713.58,-453.01"/>
<text xml:space="preserve" text-anchor="start" x="429.03" y="-395" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS A / サージのみ口・非backup</text>
</g>
<!-- ups_a -->
<g id="node3" class="node">
<title>ups_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1163.97,-626.01 896.05,-626.01 896.05,-526 1163.97,-526 1163.97,-626.01"/>
<text xml:space="preserve" text-anchor="start" x="906.05" y="-568" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS A / APC RS550S 2020</text>
</g>
<!-- ups_b -->
<g id="node4" class="node">
<title>ups_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1163.97,-453.01 896.05,-453.01 896.05,-353 1163.97,-353 1163.97,-453.01"/>
<text xml:space="preserve" text-anchor="start" x="906.05" y="-395" font-family="Arial" font-size="20.00" fill="#f8fafc">UPS B / APC RS550S 2025</text>
</g>
<!-- pi_a -->
<g id="node5" class="node">
<title>pi_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1710.26,-583.01 1454.62,-583.01 1454.62,-483 1710.26,-483 1710.26,-583.01"/>
<text xml:space="preserve" text-anchor="start" x="1464.63" y="-525" font-family="Arial" font-size="20.00" fill="#f8fafc">NUT Pi .112 / 監視A・給電B</text>
</g>
<!-- pi_b -->
<g id="node6" class="node">
<title>pi_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2275.96,-516.01 2020.32,-516.01 2020.32,-416 2275.96,-416 2275.96,-516.01"/>
<text xml:space="preserve" text-anchor="start" x="2030.33" y="-458" font-family="Arial" font-size="20.00" fill="#f8fafc">NUT Pi .113 / 監視B・給電A</text>
</g>
<!-- x570 -->
<g id="node7" class="node">
<title>x570</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1672.44,-260.01 1492.44,-260.01 1492.44,-160 1672.44,-160 1672.44,-260.01"/>
<text xml:space="preserve" text-anchor="start" x="1512.97" y="-202" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox / x570</text>
</g>
<!-- b550m -->
<g id="node8" class="node">
<title>b550m</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1672.44,-100.01 1492.44,-100.01 1492.44,0 1672.44,0 1672.44,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="1504.08" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox / b550m</text>
</g>
<!-- mains&#45;&gt;surge_a -->
<g id="edge1" class="edge">
<title>mains&#45;&gt;surge_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M227.85,-539.95C287.04,-515.93 365.89,-483.93 432.48,-456.9"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="433.45,-459.35 439.41,-454.09 431.47,-454.48 433.45,-459.35"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="268,-520.05 268,-542.85 379.02,-542.85 379.02,-520.05 268,-520.05"/>
<text xml:space="preserve" text-anchor="start" x="271" y="-525.85" font-family="Arial" font-size="14.00" fill="#fcd9d2">非バックアップ出力</text>
</g>
<!-- mains&#45;&gt;ups_a -->
<g id="edge2" class="edge">
<title>mains&#45;&gt;ups_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M227.59,-576C381.65,-576 700.16,-576 885.9,-576"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="885.76,-578.63 893.26,-576 885.76,-573.38 885.76,-578.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="541.91,-576 541.91,-598.8 590.69,-598.8 590.69,-576 541.91,-576"/>
<text xml:space="preserve" text-anchor="start" x="544.91" y="-581.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">AC入力</text>
</g>
<!-- surge_a&#45;&gt;ups_b -->
<g id="edge3" class="edge">
<title>surge_a&#45;&gt;ups_b</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M713.39,-403C768.49,-403 831.07,-403 885.89,-403"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="885.87,-405.63 893.37,-403 885.87,-400.38 885.87,-405.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="753.58,-403 753.58,-425.8 856.05,-425.8 856.05,-403 753.58,-403"/>
<text xml:space="preserve" text-anchor="start" x="756.58" y="-408.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">UPS BのAC入力</text>
</g>
<!-- ups_a&#45;&gt;pi_a -->
<g id="edge5" class="edge">
<title>ups_a&#45;&gt;pi_a</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1163.9,-565.62C1248.89,-558.98 1358.86,-550.39 1444.6,-543.69"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1444.65,-546.32 1451.92,-543.12 1444.24,-541.09 1444.65,-546.32"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1256.89,-562.1 1256.89,-584.9 1361.7,-584.9 1361.7,-562.1 1256.89,-562.1"/>
<text xml:space="preserve" text-anchor="start" x="1259.89" y="-567.9" font-family="Arial" font-size="14.00" fill="#c9c9c9">USB監視 / ups&#45;a</text>
</g>
<!-- ups_a&#45;&gt;pi_b -->
<g id="edge6" class="edge">
<title>ups_a&#45;&gt;pi_b</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1163.74,-598.99C1351.93,-625.88 1704.11,-654.91 1980.32,-554 2005.03,-544.98 2030.66,-532.95 2054.2,-520.69"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="2055.37,-523.04 2060.78,-517.22 2052.92,-518.4 2055.37,-523.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1501.25,-624.6 1501.25,-647.4 1663.63,-647.4 1663.63,-624.6 1501.25,-624.6"/>
<text xml:space="preserve" text-anchor="start" x="1504.25" y="-630.4" font-family="Arial" font-size="14.00" fill="#fcd9d2">cross&#45;power / PiBの給電元</text>
</g>
<!-- ups_a&#45;&gt;x570 -->
<g id="edge4" class="edge">
<title>ups_a&#45;&gt;x570</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1119.53,-526.12C1136.01,-513.72 1151.84,-499.26 1163.97,-483 1197.56,-438.02 1165.56,-404.13 1203.97,-363.2 1277.81,-284.54 1397.68,-245.23 1482.51,-226.3"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1482.94,-228.89 1489.72,-224.73 1481.83,-223.76 1482.94,-228.89"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1265.45,-363.2 1265.45,-386 1353.14,-386 1353.14,-363.2 1265.45,-363.2"/>
<text xml:space="preserve" text-anchor="start" x="1268.45" y="-369" font-family="Arial" font-size="14.00" fill="#fcd9d2">バッテリー給電</text>
</g>
<!-- ups_b&#45;&gt;pi_a -->
<g id="edge8" class="edge">
<title>ups_b&#45;&gt;pi_a</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1163.9,-434.39C1248.98,-454.48 1359.08,-480.49 1444.87,-500.75"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1444.09,-503.26 1451.99,-502.43 1445.3,-498.15 1444.09,-503.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1228.11,-490.95 1228.11,-513.75 1390.48,-513.75 1390.48,-490.95 1228.11,-490.95"/>
<text xml:space="preserve" text-anchor="start" x="1231.11" y="-496.75" font-family="Arial" font-size="14.00" fill="#fcd9d2">cross&#45;power / PiAの給電元</text>
</g>
<!-- ups_b&#45;&gt;pi_b -->
<g id="edge9" class="edge">
<title>ups_b&#45;&gt;pi_b</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1163.86,-396.93C1348.14,-390.64 1691.31,-386.67 1980.32,-427 1990.15,-428.38 2000.26,-430.05 2010.39,-431.93"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2009.7,-434.47 2017.56,-433.31 2010.69,-429.32 2009.7,-434.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1530.03,-401.25 1530.03,-424.05 1634.85,-424.05 1634.85,-401.25 1530.03,-401.25"/>
<text xml:space="preserve" text-anchor="start" x="1533.03" y="-407.05" font-family="Arial" font-size="14.00" fill="#c9c9c9">USB監視 / ups&#45;b</text>
</g>
<!-- ups_b&#45;&gt;b550m -->
<g id="edge7" class="edge">
<title>ups_b&#45;&gt;b550m</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1060.48,-353.05C1090.95,-305.27 1142.64,-234.17 1203.97,-190.2 1288.42,-129.66 1402.06,-92.16 1482.52,-71.35"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1483.11,-73.91 1489.73,-69.52 1481.81,-68.82 1483.11,-73.91"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1265.45,-190.2 1265.45,-213 1353.14,-213 1353.14,-190.2 1265.45,-190.2"/>
<text xml:space="preserve" text-anchor="start" x="1268.45" y="-196" font-family="Arial" font-size="14.00" fill="#fcd9d2">バッテリー給電</text>
</g>
<!-- pi_a&#45;&gt;pi_b -->
<g id="edge12" class="edge">
<title>pi_a&#45;&gt;pi_b</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1673.17,-483.15C1697.47,-472.05 1724.26,-461.9 1750.26,-456.2 1835.31,-437.57 1933.07,-439.71 2010.28,-446.66"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="2009.83,-449.26 2017.54,-447.34 2010.32,-444.03 2009.83,-449.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1750.26,-456.2 1750.26,-479 1980.32,-479 1980.32,-456.2 1750.26,-456.2"/>
<text xml:space="preserve" text-anchor="start" x="1753.26" y="-462" font-family="Arial" font-size="14.00" fill="#d4f2ff">ups&#45;b監視 / LOWBATT10%で自身停止</text>
</g>
<!-- pi_b&#45;&gt;pi_a -->
<g id="edge13" class="edge">
<title>pi_b&#45;&gt;pi_a</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M2020.6,-484.68C2007.01,-486.55 1993.39,-488.36 1980.32,-490 1893.95,-500.89 1796.79,-511.45 1720.22,-519.38"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1720.23,-516.74 1713.04,-520.12 1720.77,-521.96 1720.23,-516.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1750.26,-515.79 1750.26,-538.59 1980.32,-538.59 1980.32,-515.79 1750.26,-515.79"/>
<text xml:space="preserve" text-anchor="start" x="1753.26" y="-521.59" font-family="Arial" font-size="14.00" fill="#d4f2ff">ups&#45;a監視 / LOWBATT10%で自身停止</text>
</g>
<!-- x570&#45;&gt;pi_a -->
<g id="edge10" class="edge">
<title>x570&#45;&gt;pi_a</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1492.68,-228.79C1371.08,-258.46 1177.05,-323.28 1249.5,-423.4 1293.95,-484.84 1374.03,-512.44 1444.51,-524.58"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1444.02,-527.16 1451.84,-525.77 1444.86,-521.98 1444.02,-527.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1203.97,-400.6 1203.97,-423.4 1414.62,-423.4 1414.62,-400.6 1203.97,-400.6"/>
<text xml:space="preserve" text-anchor="start" x="1206.97" y="-406.4" font-family="Arial" font-size="14.00" fill="#d4f2ff">charge&#45;guard監視 / 80%で自身停止</text>
</g>
<!-- b550m&#45;&gt;pi_b -->
<g id="edge11" class="edge">
<title>b550m&#45;&gt;pi_b</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1665.02,-99.9C1680.22,-109.64 1695.85,-119.95 1710.26,-130 1843.87,-223.22 1993,-341.07 2077.91,-409.55"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="2076.08,-411.45 2083.57,-414.12 2079.38,-407.36 2076.08,-411.45"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1759.97,-325.93 1759.97,-348.73 1970.62,-348.73 1970.62,-325.93 1759.97,-325.93"/>
<text xml:space="preserve" text-anchor="start" x="1762.97" y="-331.73" font-family="Arial" font-size="14.00" fill="#d4f2ff">charge&#45;guard監視 / 80%で自身停止</text>
</g>
</g>
</svg>
`;default:throw Error(`Unknown viewId: `+e)}};export{e as dotSource,t as svgSource};