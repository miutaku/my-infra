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
    subgraph cluster_edge {
        graph [color="#462a17",
            fillcolor="#5a3620",
            label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>CLOUDFLARE</B></FONT>>,
            likec4_depth=1,
            likec4_id="edge",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        access [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Access / 認証</FONT>>,
            likec4_id="edge.access",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        tunnel [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
            likec4_id="edge.tunnel",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_home {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅 / HOME-K8S</B></FONT>>,
            likec4_depth=1,
            likec4_id=home,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        nextcloud [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
            likec4_id="home.nextcloud",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        eso [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
            likec4_id="home.eso",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        agent [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">自宅監視基盤</FONT>>,
            likec4_id="home.agent",
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
    subgraph cluster_monitoring {
        graph [color="#1e3524",
            fillcolor="#2c4e32",
            label=<<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>監視</B></FONT>>,
            likec4_depth=1,
            likec4_id=monitoring,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        vms [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            group=monitoring,
            height=1.389,
            label=<<FONT POINT-SIZE="20">OCI監視VM / STG・PRD</FONT>>,
            likec4_id="monitoring.vms",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
        grafana [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=monitoring,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Grafana Cloud / PDC</FONT>>,
            likec4_id="monitoring.grafana",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_data {
        graph [color="#313131",
            fillcolor="#454545",
            label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>保存・バックアップ</B></FONT>>,
            likec4_depth=1,
            likec4_id=data,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        nas [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">TrueNAS / NFS</FONT>>,
            likec4_id="data.nas",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
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
        bws [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Bitwarden Secrets Manager</FONT>>,
            likec4_id=bws,
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
    }
    operator -> access [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">管理認証</FONT></TD></TR></TABLE>>,
        likec4_id="1uo7iw3",
        style=dashed,
        weight=2];
    operator -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">照会</FONT></TD></TR></TABLE>>,
        likec4_id="1f3471w",
        style=dashed,
        weight=2];
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
        likec4_id="1wgwgi5",
        minlen=0,
        style=dotted,
        weight=2];
    bws -> eso [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1cy8kgk",
        minlen=1,
        style=dotted];
    user -> access [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_edge,
        likec4_id="1ykqzp4",
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS</FONT></TD></TR></TABLE>>];
    access -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Tunnel / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id="1afxkvl",
        style=dashed];
    tunnel -> nextcloud [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開hostname / 内部HTTP</FONT></TD></TR></TABLE>>,
        likec4_id="1bpt5fc",
        style=dashed];
    tunnel -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access後 / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id=r9t8zh,
        style=dashed];
    nextcloud -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NFS / PVC</FONT></TD></TR></TABLE>>,
        likec4_id="8i3da7",
        style=dashed];
    agent -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id="9aq6k0",
        style=dashed];
    agent -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きPDC接続</FONT></TD></TR></TABLE>>,
        likec4_id="1vwfq24",
        style=dashed];
    vms -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM側PDC agentから外向き接続</FONT></TD></TR></TABLE>>,
        likec4_id=lis1q,
        minlen=0,
        style=dashed];
    grafana -> agent [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由の検索</FONT></TD></TR></TABLE>>,
        likec4_id=i1lqcs,
        style=dashed];
    grafana -> vms [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由</FONT></TD></TR></TABLE>>,
        likec4_id="1xca7cu",
        minlen=0,
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
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅 / HOME-K8S</B></FONT>>,
            likec4_depth=2,
            likec4_id=home,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_apps {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>宅内アプリ</B></FONT>>,
                likec4_depth=1,
                likec4_id="home.apps",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            coupon_manager [height=1.389,
                label=<<FONT POINT-SIZE="20">Coupon Manager</FONT>>,
                likec4_id="home.apps.coupon_manager",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            loockit [height=1.389,
                label=<<FONT POINT-SIZE="20">Loockit</FONT>>,
                likec4_id="home.apps.loockit",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            annict_scraper [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Annict scraper</FONT>>,
                likec4_id="home.apps.annict_scraper",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            magic_mirror [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MagicMirror</FONT>>,
                likec4_id="home.apps.magic_mirror",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            wol [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Wake-on-LAN</FONT>>,
                likec4_id="home.apps.wol",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        nextcloud [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
            likec4_id="home.nextcloud",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        recording [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">録画・配信</FONT>>,
            likec4_id="home.recording",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        dns [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">内部DNS / MetalLB</FONT>>,
            likec4_id="home.dns",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_data {
        graph [color="#313131",
            fillcolor="#454545",
            label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>保存・バックアップ</B></FONT>>,
            likec4_depth=1,
            likec4_id=data,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        databases [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
            likec4_id="data.databases",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        nas [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">TrueNAS / NFS</FONT>>,
            likec4_id="data.nas",
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
        likec4_id="edge",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    user -> "edge" [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS</FONT></TD></TR></TABLE>>,
        likec4_id="1ykqzp4",
        minlen=0,
        style=dashed,
        weight=3];
    "edge" -> nextcloud [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開hostname / 内部HTTP</FONT></TD></TR></TABLE>>,
        likec4_id=rqx926,
        style=dashed,
        weight=2];
    "edge" -> recording [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開hostname / 内部HTTP</FONT></TD></TR></TABLE>>,
        likec4_id=a784lh,
        style=dashed,
        weight=2];
    "edge" -> coupon_manager [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開hostname / 内部HTTP</FONT></TD></TR></TABLE>>,
        likec4_id="15mk73k",
        style=dashed,
        weight=2];
    "edge" -> loockit [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">内部接続</FONT></TD></TR></TABLE>>,
        likec4_id=j4b10t,
        minlen=1,
        style=dashed];
    nextcloud -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">MYSQL_HOST / MariaDB</FONT></TD></TR></TABLE>>,
        likec4_id="1xcy36d",
        style=dashed,
        weight=2];
    nextcloud -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NFS / PVC</FONT></TD></TR></TABLE>>,
        likec4_id="8i3da7",
        style=dashed,
        weight=2];
    recording -> annict_scraper [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">番組照合</FONT></TD></TR></TABLE>>,
        likec4_id=xovp3z,
        minlen=1,
        style=dashed,
        weight=2];
    recording -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="10fy5ym",
        style=dashed,
        weight=2];
    recording -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">メディア保存</FONT></TD></TR></TABLE>>,
        likec4_id=tx5cuc,
        style=dashed,
        weight=2];
    coupon_manager -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id=tt5l17,
        style=dashed];
    coupon_manager -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">images・Data Protection keys / PVC</FONT></TD></TR></TABLE>>,
        likec4_id="1kp3ymp",
        style=dashed];
    magic_mirror -> wol [style=invis];
    wol -> dns [style=invis];
    databases -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id="7doeow",
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
        git [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=control,
            height=1.389,
            label=<<FONT POINT-SIZE="20">GitHub / コード・Actions</FONT>>,
            likec4_id="control.git",
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
        runner [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=control,
            height=1.389,
            label=<<FONT POINT-SIZE="20">ARC / 専用runner</FONT>>,
            likec4_id="control.runner",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        tfc [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=control,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Terraform Cloud</FONT>>,
            likec4_id="control.tfc",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        argo [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=control,
            height=1.389,
            label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
            likec4_id="control.argo",
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
    reviews -> images [style=invis];
    git -> runner [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Actions job</FONT></TD></TR></TABLE>>,
        likec4_id="1ejrb1c",
        minlen=1,
        style=dashed,
        weight=3];
    git -> tfc [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Terraform実行</FONT></TD></TR></TABLE>>,
        likec4_id=bhe2ht,
        style=dashed,
        weight=3];
    git -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GitOps</FONT></TD></TR></TABLE>>,
        likec4_id=nsq897,
        style=dashed,
        weight=3];
    git -> argo_1 [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GitOps</FONT></TD></TR></TABLE>>,
        likec4_id="1yd5z3h",
        style=dashed];
    hardware [height=1.389,
        label=<<FONT POINT-SIZE="20">物理・ネットワーク</FONT>>,
        likec4_id=hardware,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    packer -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM template</FONT></TD></TR></TABLE>>,
        likec4_id="1gw16er",
        minlen=1,
        style=dashed];
    ansible -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器設定</FONT></TD></TR></TABLE>>,
        likec4_id="1oj2pvn",
        minlen=1,
        style=dashed];
    tfc -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM / ネットワーク</FONT></TD></TR></TABLE>>,
        likec4_id=wo6dos,
        style=dashed,
        weight=2];
    "edge" [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare</FONT>>,
        likec4_id="edge",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    tfc -> "edge" [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DNS / Access / Tunnel</FONT></TD></TR></TABLE>>,
        likec4_id=p8qt69,
        minlen=1,
        style=dashed,
        weight=2];
    tfc -> vms [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">監視VM</FONT></TD></TR></TABLE>>,
        likec4_id="13bbtko",
        minlen=1,
        style=dashed];
    tfc -> argo_1 [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        lhead=cluster_oke,
        likec4_id=maf6er,
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">OCI / OKE</FONT></TD></TR></TABLE>>];
    home [height=1.389,
        label=<<FONT POINT-SIZE="20">自宅 / home-k8s</FONT>>,
        likec4_id=home,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    argo -> home [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">manifest同期</FONT></TD></TR></TABLE>>,
        likec4_id=c9daqf,
        minlen=1,
        style=dashed];
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
    subgraph cluster_home {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅 / HOME-K8S</B></FONT>>,
            likec4_depth=1,
            likec4_id=home,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        eso [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
            likec4_id="home.eso",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
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
            margin=40,
            style=filled
        ];
        git [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">GitHub / コード・Actions</FONT>>,
            likec4_id="control.git",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        tfc [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Terraform Cloud</FONT>>,
            likec4_id="control.tfc",
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
    subgraph cluster_data {
        graph [color="#313131",
            fillcolor="#454545",
            label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>保存・バックアップ</B></FONT>>,
            likec4_depth=1,
            likec4_id=data,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        backups [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">バックアップ処理</FONT>>,
            likec4_id="data.backups",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    bws [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Bitwarden Secrets Manager</FONT>>,
        likec4_id=bws,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    bws -> eso [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1cy8kgk",
        minlen=1,
        style=dotted,
        weight=2];
    bws -> eso_1 [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1xij4my",
        minlen=1,
        style=dotted,
        weight=2];
    bws -> external_secrets [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO / PRD Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="9hxuu5",
        minlen=1,
        style=dotted];
    bws -> git [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">CI credential</FONT></TD></TR></TABLE>>,
        likec4_id="1d2gkgv",
        minlen=1,
        style=dotted,
        weight=2];
    bws -> tfc [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Terraform変数</FONT></TD></TR></TABLE>>,
        likec4_id="1d2gyr8",
        minlen=1,
        style=dotted,
        weight=2];
    bws -> ansible [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器・PBS用credential</FONT></TD></TR></TABLE>>,
        likec4_id=d9stjv,
        minlen=1,
        style=dotted,
        weight=2];
    bws -> backups [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO経由 / backup credential</FONT></TD></TR></TABLE>>,
        likec4_id="1c22pjj",
        minlen=1,
        style=dotted,
        weight=2];
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
    subgraph cluster_home {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅 / HOME-K8S</B></FONT>>,
            likec4_depth=2,
            likec4_id=home,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        subgraph cluster_agent {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>自宅監視基盤</B></FONT>>,
                likec4_depth=1,
                likec4_id="home.agent",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            pdc [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.agent",
                height=1.389,
                label=<<FONT POINT-SIZE="20">PDC agent / 自宅</FONT>>,
                likec4_id="home.agent.pdc",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            exporters [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.agent",
                height=1.389,
                label=<<FONT POINT-SIZE="20">exporter群</FONT>>,
                likec4_id="home.agent.exporters",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            collector [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.agent",
                height=1.389,
                label=<<FONT POINT-SIZE="20">vmagent / scrape・remoteWrite</FONT>>,
                likec4_id="home.agent.collector",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            local_store [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                group="home.agent",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VictoriaMetrics / 自宅</FONT>>,
                likec4_id="home.agent.local_store",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
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
            margin=40,
            style=filled
        ];
        vms [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            group=monitoring,
            height=1.389,
            label=<<FONT POINT-SIZE="20">OCI監視VM / STG・PRD</FONT>>,
            likec4_id="monitoring.vms",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
        grafana [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=monitoring,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Grafana Cloud / PDC</FONT>>,
            likec4_id="monitoring.grafana",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    hardware [height=1.389,
        label=<<FONT POINT-SIZE="20">物理・ネットワーク</FONT>>,
        likec4_id=hardware,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    hardware -> collector [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">exporter収集</FONT></TD></TR></TABLE>>,
        likec4_id="1x5zdkx",
        minlen=1,
        style=dotted];
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
        likec4_id="1f3471w",
        minlen=1,
        style=dashed,
        weight=3];
    collectors -> vms [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=zr9riv,
        minlen=1,
        style=dotted];
    pdc -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きPDC接続</FONT></TD></TR></TABLE>>,
        likec4_id="1r2tpat",
        style=dashed];
    pdc -> local_store [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private query / :8428</FONT></TD></TR></TABLE>>,
        likec4_id=v6d78w,
        style=dashed,
        weight=4];
    exporters -> collector [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">scrape</FONT></TD></TR></TABLE>>,
        likec4_id="8kvg7d",
        minlen=1,
        style=dotted,
        weight=3];
    vms -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM側PDC agentから外向き接続</FONT></TD></TR></TABLE>>,
        likec4_id=lis1q,
        minlen=0,
        style=dashed];
    grafana -> pdc [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由の検索</FONT></TD></TR></TABLE>>,
        likec4_id="1vacp11",
        style=dashed];
    grafana -> vms [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由</FONT></TD></TR></TABLE>>,
        likec4_id="1xca7cu",
        minlen=0,
        style=dashed];
    collector -> local_store [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">remoteWrite / :8428</FONT></TD></TR></TABLE>>,
        likec4_id="1apxv0k",
        style=dotted,
        weight=3];
}
`;case`placement`:return`digraph {
  likec4_viewId = "placement";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
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
  "homesite" [
    likec4_id = "homeSite";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">自宅 / Proxmox2ホスト・RPi</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">CP VM3台とworker<BR/>VM2台はPVE2ホストへ配置。Podの配置は動的。配置詳細はホスト・クラスタをクリックして辿る。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
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
            likec4_id="home.recording",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_tnlastation {
            graph [color="#1b3d88",
                fillcolor="#194b9e",
                label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TNLASTATION / 共通モデル</B></FONT>>,
                likec4_depth=1,
                likec4_id="home.recording.tnlastation",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            gateway [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Gateway</FONT>>,
                likec4_id="home.recording.tnlastation.gateway",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            frontend [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Frontend</FONT>>,
                likec4_id="home.recording.tnlastation.frontend",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            backend [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Backend / API・録画制御</FONT>>,
                likec4_id="home.recording.tnlastation.backend",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            encode [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ffmpeg encode worker</FONT>>,
                likec4_id="home.recording.tnlastation.encode",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            streaming [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ffmpeg streaming worker</FONT>>,
                likec4_id="home.recording.tnlastation.streaming",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            mediamtx [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="home.recording.tnlastation",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MediaMTX / HLS配信</FONT>>,
                likec4_id="home.recording.tnlastation.mediamtx",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        epgstation [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">EPGStation</FONT>>,
            likec4_id="home.recording.epgstation",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        annict_sync [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Annict録画同期 / CronJob</FONT>>,
            likec4_id="home.recording.annict_sync",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        mirakurun_staging [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun Service / STG</FONT>>,
            likec4_id="home.recording.mirakurun_staging",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        mirakurun [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Mirakurun Service / 本番LXCへの中継</FONT>>,
            likec4_id="home.recording.mirakurun",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    epgstation -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id="1wd6s3m",
        style=dashed,
        weight=4];
    databases [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
        likec4_id="data.databases",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    epgstation -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EPGStation DB</FONT></TD></TR></TABLE>>,
        likec4_id=yel6aw,
        style=dashed,
        weight=2];
    annict_scraper [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Annict scraper</FONT>>,
        likec4_id="home.apps.annict_scraper",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    annict_sync -> annict_scraper [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">番組照合</FONT></TD></TR></TABLE>>,
        likec4_id="1xtxnx2",
        style=dashed,
        weight=2];
    annict_sync -> backend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画登録API</FONT></TD></TR></TABLE>>,
        likec4_id=mhe0ne,
        style=dashed,
        weight=4];
    tuner_stg [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun STG LXC /</FONT>>,
        likec4_id="hardware.tuner_stg",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    mirakurun_staging -> tuner_stg [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EndpointSlice / 外部LXC</FONT></TD></TR></TABLE>>,
        likec4_id="137mnvl",
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
        likec4_id=xxx1mn,
        minlen=1,
        style=dashed];
    tuner_prod [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun LXC / CT12901・PT3</FONT>>,
        likec4_id="hardware.tuner_prod",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    tuner_stg -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BS/CS TCP fallback</FONT></TD></TR></TABLE>>,
        likec4_id="1c08t43",
        style=dashed,
        weight=4];
    gateway -> frontend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Web</FONT></TD></TR></TABLE>>,
        likec4_id=iq4pzw,
        minlen=1,
        style=dashed];
    gateway -> backend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">API</FONT></TD></TR></TABLE>>,
        likec4_id="7s2x06",
        style=dashed,
        weight=5];
    gateway -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HLS</FONT></TD></TR></TABLE>>,
        likec4_id="8qmvsn",
        style=dashed];
    backend -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id="1lks7zh",
        style=dashed,
        weight=4];
    backend -> encode [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode制御</FONT></TD></TR></TABLE>>,
        likec4_id="1v45qdk",
        style=dashed,
        weight=5];
    backend -> streaming [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">streaming制御</FONT></TD></TR></TABLE>>,
        likec4_id=wndmpe,
        style=dashed,
        weight=5];
    backend -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="2nbt6v",
        style=dashed];
    mirakurun -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EndpointSlice / 外部LXC</FONT></TD></TR></TABLE>>,
        likec4_id="1be6mra",
        style=dashed];
    nas [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">TrueNAS / NFS</FONT>>,
        likec4_id="data.nas",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    mirakurun -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        likec4_id=tx5cuc,
        ltail=cluster_recording,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">メディア保存</FONT></TD></TR></TABLE>>];
    encode -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">encode状態</FONT></TD></TR></TABLE>>,
        likec4_id="152qc1x",
        style=dashed];
    streaming -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">配信</FONT></TD></TR></TABLE>>,
        likec4_id=msxx03,
        style=dashed];
    databases -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id="7doeow",
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
    subgraph cluster_hardware {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>物理・ネットワーク</B></FONT>>,
            likec4_depth=1,
            likec4_id=hardware,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        lb [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">HAProxy / Keepalived ×2</FONT>>,
            likec4_id="hardware.lb",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        router [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">IX2215 / VLAN</FONT>>,
            likec4_id="hardware.router",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        wifi [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Wi-Fi AP</FONT>>,
            likec4_id="hardware.wifi",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        unifi [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UniFi OS Server</FONT>>,
            likec4_id="hardware.unifi",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_home {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅 / HOME-K8S</B></FONT>>,
            likec4_depth=2,
            likec4_id=home,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_dns {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>内部DNS / METALLB</B></FONT>>,
                likec4_depth=1,
                likec4_id="home.dns",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            coredns [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">CoreDNS / miutaku.internal</FONT>>,
                likec4_id="home.dns.coredns",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            metallb [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MetalLB / LANのService IP</FONT>>,
                likec4_id="home.dns.metallb",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        cloudflared [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">cloudflared / 自宅connector</FONT>>,
            likec4_id="home.platform.cloudflared",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
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
    subgraph cluster_edge {
        graph [color="#462a17",
            fillcolor="#5a3620",
            label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>CLOUDFLARE</B></FONT>>,
            likec4_depth=1,
            likec4_id="edge",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        access [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="edge",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Access / 認証</FONT>>,
            likec4_id="edge.access",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        tunnel [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="edge",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
            likec4_id="edge.tunnel",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        warp [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">WARP / private CIDR routes</FONT>>,
            likec4_id="edge.warp",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        routes [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="edge",
            height=1.389,
            label=<<FONT POINT-SIZE="20">公開hostname / 設定から抽出</FONT>>,
            likec4_id="edge.routes",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_external {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス</B></FONT>>,
            likec4_depth=1,
            likec4_id=external,
            likec4_level=0,
            margin=40,
            style=filled
        ];
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
    subgraph cluster_lan {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>LAN / VLAN・経路</B></FONT>>,
            likec4_depth=1,
            likec4_id=lan,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        server [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">VLAN20 / 192.168.20.0/24</FONT>>,
            likec4_id="lan.server",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        native [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">native / 192.168.0.0/24</FONT>>,
            likec4_id="lan.native",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        management [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">VLAN10 / 192.168.10.0/24</FONT>>,
            likec4_id="lan.management",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        client [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">VLAN30 / 192.168.30.0/24</FONT>>,
            likec4_id="lan.client",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        guest [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">VLAN31 / guest</FONT>>,
            likec4_id="lan.guest",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        iot [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">VLAN40 / 192.168.40.0/24</FONT>>,
            likec4_id="lan.iot",
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
        likec4_id="1uo7iw3",
        minlen=1,
        style=dashed];
    lb -> metallb [style=invis];
    cloudflared -> tunnel [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きTunnel接続</FONT></TD></TR></TABLE>>,
        likec4_id="1pqph7a",
        minlen=1,
        style=dashed];
    workers -> private_workers [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private subnet / 10.0.2.0/24</FONT></TD></TR></TABLE>>,
        likec4_id=a3omiw,
        minlen=1,
        style=dotted];
    access -> routes [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access policy</FONT></TD></TR></TABLE>>,
        likec4_id=bibfok,
        style=dashed,
        weight=3];
    tunnel -> routes [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">hostname転送</FONT></TD></TR></TABLE>>,
        likec4_id="12yx620",
        style=dashed,
        weight=4];
    warp -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private CIDR routes / WARP policy</FONT></TD></TR></TABLE>>,
        likec4_id="17481wb",
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
    routes -> router [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id=hpgye,
        style=dashed];
    routes -> wifi [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="13l9pws",
        minlen=1,
        style=dashed];
    routes -> unifi [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id=rz9zeo,
        minlen=1,
        style=dashed];
    nat -> internet [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NAT / reserved IPv4</FONT></TD></TR></TABLE>>,
        likec4_id="1o5fuau",
        style=dotted];
    service_gateway -> oracle [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Oracle Services Network</FONT></TD></TR></TABLE>>,
        likec4_id=u7it0q,
        minlen=1,
        style=dotted];
    router -> coredns [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_dns,
        likec4_id="1wjy9e1",
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">LAN / 内部DNS</FONT></TD></TR></TABLE>>];
    router -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI20</FONT></TD></TR></TABLE>>,
        likec4_id="1usecop",
        style=dotted];
    router -> native [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native IF</FONT></TD></TR></TABLE>>,
        likec4_id="1y5venx",
        minlen=1,
        style=dotted];
    router -> management [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI10</FONT></TD></TR></TABLE>>,
        likec4_id=y0zs27,
        minlen=1,
        style=dotted];
    router -> client [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI30</FONT></TD></TR></TABLE>>,
        likec4_id="5xlg4l",
        minlen=1,
        style=dotted];
    router -> guest [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI31 / 他VLAN拒否</FONT></TD></TR></TABLE>>,
        likec4_id="12ugbd8",
        minlen=1,
        style=dotted];
    router -> iot [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI40</FONT></TD></TR></TABLE>>,
        likec4_id="8ijfu6",
        minlen=1,
        style=dotted];
    internet -> igw [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">公開API・LBへの到達</FONT></TD></TR></TABLE>>,
        likec4_id="1deydus",
        style=dotted];
    igw -> public_api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">public route table</FONT></TD></TR></TABLE>>,
        likec4_id="1x2lbth",
        minlen=1,
        style=dotted,
        weight=4];
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
    subgraph cluster_home {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>自宅 / HOME-K8S</B></FONT>>,
            likec4_depth=1,
            likec4_id=home,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        recording [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">録画・配信</FONT>>,
            likec4_id="home.recording",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        nextcloud [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
            likec4_id="home.nextcloud",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        local_store [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">VictoriaMetrics / 自宅</FONT>>,
            likec4_id="home.agent.local_store",
            likec4_level=1,
            margin="0.139,0",
            penwidth=2,
            shape=cylinder,
            width=2.5];
    }
    subgraph cluster_data {
        graph [color="#2d2d2d",
            fillcolor="#3f3f3f",
            label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>保存・バックアップ</B></FONT>>,
            likec4_depth=2,
            likec4_id=data,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_nas {
            graph [color="#462a17",
                fillcolor="#5a3620",
                label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>TRUENAS / NFS</B></FONT>>,
                likec4_depth=1,
                likec4_id="data.nas",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            nas01 [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">nas-01 / ZFS・NFS</FONT>>,
                likec4_id="data.nas.nas01",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
            nas02 [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">nas-02 / ZFS・NFS</FONT>>,
                likec4_id="data.nas.nas02",
                likec4_level=2,
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
                likec4_id="data.databases",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            mariadb [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MariaDB</FONT>>,
                likec4_id="data.databases.mariadb",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
            postgres [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">PostgreSQL / 本番・STG</FONT>>,
                likec4_id="data.databases.postgres",
                likec4_level=2,
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
                likec4_id="data.backups",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            db [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MariaDB・PostgreSQL / logical</FONT>>,
                likec4_id="data.backups.db",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            recordings [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">録画ファイル用 / 別job</FONT>>,
                likec4_id="data.backups.recordings",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            metrics [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">VictoriaMetrics / consistent</FONT>>,
                likec4_id="data.backups.metrics",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            nas [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">NAS restic / CronJob</FONT>>,
                likec4_id="data.backups.nas",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        shared [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">共有PV / runner cache・状態</FONT>>,
            likec4_id="data.shared",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        pbs [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Proxmox Backup Server</FONT>>,
            likec4_id="data.pbs",
            likec4_level=1,
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
            likec4_id=hardware,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        x570 [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Proxmox / x570</FONT>>,
            likec4_id="hardware.x570",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        b550m [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Proxmox / b550m</FONT>>,
            likec4_id="hardware.b550m",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    subgraph cluster_external {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス</B></FONT>>,
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
    recording -> mariadb [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EPGStation DB</FONT></TD></TR></TABLE>>,
        likec4_id=gijq9c,
        style=dashed];
    recording -> postgres [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="991zsr",
        style=dashed];
    recording -> recordings [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画ファイル専用job</FONT></TD></TR></TABLE>>,
        likec4_id="1o5qhzp",
        minlen=1,
        style=dashed];
    recording -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画・thumbnail・drop / NFS</FONT></TD></TR></TABLE>>,
        likec4_id=tyr4xg,
        style=dashed];
    nextcloud -> nas01 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_nas,
        likec4_id="8i3da7",
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NFS / PVC</FONT></TD></TR></TABLE>>];
    nextcloud -> mariadb [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">MYSQL_HOST / MariaDB</FONT></TD></TR></TABLE>>,
        likec4_id=vogfwr,
        style=dashed];
    local_store -> nas01 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_nas,
        likec4_id="1b3zxw3",
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics用NFS PVC</FONT></TD></TR></TABLE>>];
    local_store -> metrics [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">snapshot / vmbackup</FONT></TD></TR></TABLE>>,
        likec4_id=vb09gr,
        minlen=1,
        style=dashed];
    x570 -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup</FONT></TD></TR></TABLE>>,
        likec4_id=h52jjj,
        minlen=1,
        style=dashed];
    b550m -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="1k0issa",
        minlen=1,
        style=dashed];
    postgres -> nas01 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_nas,
        likec4_id="7doeow",
        ltail=cluster_databases,
        style=dashed,
        weight=4,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>];
    postgres -> db [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id=zuv5ah,
        ltail=cluster_databases,
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">整合性あるlogical dump</FONT></TD></TR></TABLE>>];
    pbs -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">S3 datastore / VM backup</FONT></TD></TR></TABLE>>,
        likec4_id=acnwwz,
        style=dashed];
    nas02 -> nas [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id=y6s5w9,
        ltail=cluster_nas,
        style=dashed,
        weight=3,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">対象dataset / restic</FONT></TD></TR></TABLE>>];
    nas -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id="1gf1jy7",
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
            likec4_id="hardware.ups",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        mains [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">商用AC</FONT>>,
            likec4_id="hardware.ups.mains",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        surge_a [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UPS A / サージのみ口・非backup</FONT>>,
            likec4_id="hardware.ups.surge_a",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        ups_a [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UPS A / APC RS550S 2020</FONT>>,
            likec4_id="hardware.ups.ups_a",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        ups_b [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UPS B / APC RS550S 2025</FONT>>,
            likec4_id="hardware.ups.ups_b",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        pi_a [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">NUT Pi .112 / 監視A・給電B</FONT>>,
            likec4_id="hardware.ups.pi_a",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        pi_b [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">NUT Pi .113 / 監視B・給電A</FONT>>,
            likec4_id="hardware.ups.pi_b",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    mains -> surge_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">非バックアップ出力</FONT></TD></TR></TABLE>>,
        likec4_id=a7rr96,
        style=solid];
    mains -> ups_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">AC入力</FONT></TD></TR></TABLE>>,
        likec4_id="6wg22i",
        style=solid,
        weight=2];
    surge_a -> ups_b [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">UPS BのAC入力</FONT></TD></TR></TABLE>>,
        likec4_id=yafojt,
        style=solid,
        weight=2];
    x570 [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Proxmox / x570</FONT>>,
        likec4_id="hardware.x570",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    ups_a -> x570 [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">バッテリー給電</FONT></TD></TR></TABLE>>,
        likec4_id="4l4m34",
        style=solid];
    ups_a -> pi_a [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">USB監視 / ups-a</FONT></TD></TR></TABLE>>,
        likec4_id="1uw2ujp",
        style=dotted,
        weight=2];
    ups_a -> pi_b [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">cross-power / PiBの給電元</FONT></TD></TR></TABLE>>,
        likec4_id="1uw2ujq",
        style=solid,
        weight=2];
    b550m [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Proxmox / b550m</FONT>>,
        likec4_id="hardware.b550m",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    ups_b -> b550m [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">バッテリー給電</FONT></TD></TR></TABLE>>,
        likec4_id=pj2myu,
        style=solid];
    ups_b -> pi_a [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">cross-power / PiAの給電元</FONT></TD></TR></TABLE>>,
        likec4_id="1hm5pt2",
        style=solid,
        weight=2];
    ups_b -> pi_b [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">USB監視 / ups-b</FONT></TD></TR></TABLE>>,
        likec4_id="1hm5pt1",
        style=dotted,
        weight=2];
    x570 -> pi_a [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">charge-guard監視 / 80%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id="12vj3en",
        style=dashed];
    b550m -> pi_b [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">charge-guard監視 / 80%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id=yl70cp,
        style=dashed];
    pi_a -> pi_b [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ups-b監視 / LOWBATT10%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id="1nk5y6h",
        style=dashed];
    pi_b -> pi_a [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ups-a監視 / LOWBATT10%で自身停止</FONT></TD></TR></TABLE>>,
        likec4_id="1eqmjyh",
        style=dashed];
}
`;default:throw Error(`Unknown viewId: `+e)}},t=e=>{switch(e){case`index`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2758pt" height="957pt"
 viewBox="0.00 0.00 2758.00 957.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 942.28)">
<g id="clust1" class="cluster">
<title>cluster_edge</title>
<polygon fill="#5a3620" stroke="#462a17" points="8,-234.01 8,-919.23 268,-919.23 268,-234.01 8,-234.01"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-906.33" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1329,-234.01 1329,-677.22 1849,-677.22 1849,-234.01 1329,-234.01"/>
<text xml:space="preserve" text-anchor="start" x="1337" y="-664.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="2069,-8 2069,-193.21 2313,-193.21 2313,-8 2069,-8"/>
<text xml:space="preserve" text-anchor="start" x="2077" y="-180.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="276,-234.01 276,-435.22 1069,-435.22 1069,-234.01 276,-234.01"/>
<text xml:space="preserve" text-anchor="start" x="284" y="-422.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1077,-242.01 1077,-427.22 1321,-427.22 1321,-242.01 1077,-242.01"/>
<text xml:space="preserve" text-anchor="start" x="1085" y="-414.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<!-- access -->
<g id="node1" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="228,-374.02 48,-374.02 48,-274.01 228,-274.01 228,-374.02"/>
<text xml:space="preserve" text-anchor="start" x="80.76" y="-316.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Access / 認証</text>
</g>
<!-- tunnel -->
<g id="node2" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="228,-858.03 48,-858.03 48,-758.02 228,-758.02 228,-858.03"/>
<text xml:space="preserve" text-anchor="start" x="59.06" y="-800.03" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- nextcloud -->
<g id="node3" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1809,-616.02 1629,-616.02 1629,-516.02 1809,-516.02 1809,-616.02"/>
<text xml:space="preserve" text-anchor="start" x="1674.53" y="-558.02" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- eso -->
<g id="node4" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1808.61,-374.02 1557.39,-374.02 1557.39,-274.01 1808.61,-274.01 1808.61,-374.02"/>
<text xml:space="preserve" text-anchor="start" x="1567.39" y="-316.01" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- agent -->
<g id="node5" class="node">
<title>agent</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1549,-616.02 1369,-616.02 1369,-516.02 1549,-516.02 1549,-616.02"/>
<text xml:space="preserve" text-anchor="start" x="1408.99" y="-558.02" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅監視基盤</text>
</g>
<!-- argo -->
<g id="node6" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2281,-140.01 2101,-140.01 2101,-40 2281,-40 2281,-140.01"/>
<text xml:space="preserve" text-anchor="start" x="2138.76" y="-82" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- vms -->
<g id="node7" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M551.8,-364.92C551.8,-369.94 499,-374.02 434,-374.02 369,-374.02 316.2,-369.94 316.2,-364.92 316.2,-364.92 316.2,-283.1 316.2,-283.1 316.2,-278.08 369,-274.01 434,-274.01 499,-274.01 551.8,-278.08 551.8,-283.1 551.8,-283.1 551.8,-364.92 551.8,-364.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M551.8,-364.92C551.8,-359.91 499,-355.83 434,-355.83 369,-355.83 316.2,-359.91 316.2,-364.92"/>
<text xml:space="preserve" text-anchor="start" x="326.21" y="-316.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- grafana -->
<g id="node8" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1029.5,-374.02 820.5,-374.02 820.5,-274.01 1029.5,-274.01 1029.5,-374.02"/>
<text xml:space="preserve" text-anchor="start" x="830.51" y="-316.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- nas -->
<g id="node9" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1289,-364.92C1289,-369.94 1248.66,-374.02 1199,-374.02 1149.34,-374.02 1109,-369.94 1109,-364.92 1109,-364.92 1109,-283.1 1109,-283.1 1109,-278.08 1149.34,-274.01 1199,-274.01 1248.66,-274.01 1289,-278.08 1289,-283.1 1289,-283.1 1289,-364.92 1289,-364.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1289,-364.92C1289,-359.91 1248.66,-355.83 1199,-355.83 1149.34,-355.83 1109,-359.91 1109,-364.92"/>
<text xml:space="preserve" text-anchor="start" x="1129.54" y="-316.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS / NFS</text>
</g>
<!-- operator -->
<g id="node10" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="807,-616.02 627,-616.02 627,-516.02 807,-516.02 807,-616.02"/>
<text xml:space="preserve" text-anchor="start" x="692" y="-558.02" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- bws -->
<g id="node11" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="2155.4,-616.02 1888.6,-616.02 1888.6,-516.02 2155.4,-516.02 2155.4,-616.02"/>
<text xml:space="preserve" text-anchor="start" x="1898.61" y="-558.02" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- user -->
<g id="node12" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="488,-616.02 308,-616.02 308,-516.02 488,-516.02 488,-616.02"/>
<text xml:space="preserve" text-anchor="start" x="373" y="-558.02" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- oke -->
<g id="node13" class="node">
<title>oke</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2532.91,-616.02 2305.09,-616.02 2305.09,-516.02 2532.91,-516.02 2532.91,-616.02"/>
<text xml:space="preserve" text-anchor="start" x="2315.09" y="-558.02" font-family="Arial" font-size="20.00" fill="#eff6ff">OCI / STG OKE共通基盤</text>
</g>
<!-- access&#45;&gt;argo -->
<g id="edge6" class="edge">
<title>access&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M189.3,-274.21C208.73,-258.61 231.98,-243.05 256,-234.01 597.07,-105.63 1743.92,-92.1 2090.79,-90.99"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2090.54,-93.62 2098.03,-90.97 2090.53,-88.37 2090.54,-93.62"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="340.24,-201.21 340.24,-224.01 438.06,-224.01 438.06,-201.21 340.24,-201.21"/>
<text xml:space="preserve" text-anchor="start" x="343.24" y="-207.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">Tunnel / 管理UI</text>
</g>
<!-- tunnel&#45;&gt;nextcloud -->
<g id="edge7" class="edge">
<title>tunnel&#45;&gt;nextcloud</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M227.77,-803.15C530.33,-789.53 1500.79,-741.23 1625,-677.22 1648.48,-665.13 1668.51,-644.4 1683.98,-624.17"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1685.97,-625.89 1688.31,-618.3 1681.75,-622.78 1685.97,-625.89"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1601.75,-685.22 1601.75,-708.02 1764.13,-708.02 1764.13,-685.22 1601.75,-685.22"/>
<text xml:space="preserve" text-anchor="start" x="1604.75" y="-691.02" font-family="Arial" font-size="14.00" fill="#bbfcd3">公開hostname / 内部HTTP</text>
</g>
<!-- tunnel&#45;&gt;argo -->
<g id="edge8" class="edge">
<title>tunnel&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M227.67,-806.87C661.45,-805.69 2524.92,-795.54 2609,-708.02 2785.31,-524.51 2443.98,-258.78 2276.33,-145.48"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2278.19,-143.57 2270.5,-141.56 2275.26,-147.93 2278.19,-143.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2616.16,-443.22 2616.16,-466.02 2727.96,-466.02 2727.96,-443.22 2616.16,-443.22"/>
<text xml:space="preserve" text-anchor="start" x="2619.16" y="-449.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access後 / 管理UI</text>
</g>
<!-- nextcloud&#45;&gt;nas -->
<g id="edge9" class="edge">
<title>nextcloud&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1629.24,-518.12C1627.82,-517.41 1626.4,-516.71 1625,-516.02 1556.39,-482.15 1543.26,-461.65 1469,-443.22 1434.45,-434.64 1341.53,-449.67 1309,-435.22 1283.04,-423.68 1259.86,-403.05 1241.55,-382.73"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1243.68,-381.18 1236.77,-377.26 1239.73,-384.63 1243.68,-381.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1533.57,-443.22 1533.57,-466.02 1608.03,-466.02 1608.03,-443.22 1533.57,-443.22"/>
<text xml:space="preserve" text-anchor="start" x="1536.57" y="-449.02" font-family="Arial" font-size="14.00" fill="#bbfcd3">NFS / PVC</text>
</g>
<!-- agent&#45;&gt;grafana -->
<g id="edge11" class="edge">
<title>agent&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1369.14,-517.65C1367.75,-517.09 1366.37,-516.55 1365,-516.02 1232.98,-465.03 1182.78,-500.08 1057,-435.22 1029.59,-421.08 1002.8,-400.4 980.6,-380.77"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="982.53,-378.97 975.19,-375.9 979.01,-382.87 982.53,-378.97"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1130.72,-443.22 1130.72,-466.02 1224.62,-466.02 1224.62,-443.22 1130.72,-443.22"/>
<text xml:space="preserve" text-anchor="start" x="1133.72" y="-449.02" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きPDC接続</text>
</g>
<!-- agent&#45;&gt;nas -->
<g id="edge10" class="edge">
<title>agent&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1400.44,-516.06C1372.35,-492.15 1338.49,-462.68 1309,-435.22 1290.91,-418.37 1271.71,-399.5 1254.5,-382.2"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1256.53,-380.52 1249.39,-377.04 1252.8,-384.21 1256.53,-380.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1341.14,-443.22 1341.14,-466.02 1464.6,-466.02 1464.6,-443.22 1341.14,-443.22"/>
<text xml:space="preserve" text-anchor="start" x="1344.14" y="-449.02" font-family="Arial" font-size="14.00" fill="#bbfcd3">metrics用NFS PVC</text>
</g>
<!-- vms&#45;&gt;grafana -->
<g id="edge12" class="edge">
<title>vms&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M552.54,-324.01C630.9,-324.01 733.06,-324.01 810.56,-324.01"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="810.32,-326.64 817.82,-324.01 810.32,-321.39 810.32,-326.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="591.73,-327.01 591.73,-349.81 780.57,-349.81 780.57,-327.01 591.73,-327.01"/>
<text xml:space="preserve" text-anchor="start" x="594.73" y="-332.81" font-family="Arial" font-size="14.00" fill="#d4f2ff">VM側PDC agentから外向き接続</text>
</g>
<!-- grafana&#45;&gt;agent -->
<g id="edge13" class="edge">
<title>grafana&#45;&gt;agent</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M972.94,-373.88C996.49,-395.44 1026.35,-419.41 1057,-435.22 1179.71,-498.49 1230.49,-466.68 1359.32,-513.95"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1358.36,-516.39 1366.3,-516.58 1360.21,-511.48 1358.36,-516.39"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1130.72,-443.22 1130.72,-466.02 1224.62,-466.02 1224.62,-443.22 1130.72,-443.22"/>
<text xml:space="preserve" text-anchor="start" x="1133.72" y="-449.02" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由の検索</text>
</g>
<!-- grafana&#45;&gt;vms -->
<g id="edge14" class="edge">
<title>grafana&#45;&gt;vms</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M820.58,-308.59C787.13,-304.34 749.87,-300.32 715.6,-298.21 665.72,-295.15 611,-298.6 563.16,-303.87"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="562.9,-301.26 555.75,-304.72 563.5,-306.47 562.9,-301.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="656.7,-298.21 656.7,-321.01 715.6,-321.01 715.6,-298.21 656.7,-298.21"/>
<text xml:space="preserve" text-anchor="start" x="659.7" y="-304.01" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge1" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M654.69,-516.18C616.42,-489.21 565.07,-458.22 514,-443.22 486.48,-435.13 282.51,-446.15 256,-435.22 228.07,-423.7 202.75,-402.35 182.78,-381.49"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="184.77,-379.76 177.74,-376.06 180.92,-383.34 184.77,-379.76"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="568.02,-443.22 568.02,-466.02 620.69,-466.02 620.69,-443.22 568.02,-443.22"/>
<text xml:space="preserve" text-anchor="start" x="571.02" y="-449.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">管理認証</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M759.34,-516.16C793.15,-477.15 840.57,-422.43 876.02,-381.53"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="877.81,-383.48 880.73,-376.09 873.84,-380.04 877.81,-383.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="821,-443.22 821,-466.02 850.34,-466.02 850.34,-443.22 821,-443.22"/>
<text xml:space="preserve" text-anchor="start" x="824" y="-449.02" font-family="Arial" font-size="14.00" fill="#d4f2ff">照会</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge4" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1952.99,-516.16C1897.17,-476.64 1818.6,-421.02 1760.61,-379.96"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1762.31,-377.95 1754.67,-375.76 1759.28,-382.23 1762.31,-377.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1872.8,-443.22 1872.8,-466.02 1942.6,-466.02 1942.6,-443.22 1872.8,-443.22"/>
<text xml:space="preserve" text-anchor="start" x="1875.8" y="-449.02" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;oke -->
<g id="edge3" class="edge">
<title>bws&#45;&gt;oke</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M2155.3,-566.02C2200.44,-566.02 2250.64,-566.02 2295.02,-566.02"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="2294.76,-568.65 2302.26,-566.02 2294.76,-563.4 2294.76,-568.65"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2195.34,-569.02 2195.34,-591.82 2265.14,-591.82 2265.14,-569.02 2195.34,-569.02"/>
<text xml:space="preserve" text-anchor="start" x="2198.34" y="-574.82" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge5" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M392.54,-516.29C386.96,-490.41 375.71,-460.47 353,-443.22 340.3,-433.57 304.35,-438.56 278.41,-438.34"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="278.64,-435.72 271.02,-438 278.4,-440.96 278.64,-435.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="287.81,-438.43 287.81,-461.23 339.7,-461.23 339.7,-438.43 287.81,-438.43"/>
<text xml:space="preserve" text-anchor="start" x="290.81" y="-444.23" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS</text>
</g>
</g>
</svg>
`;case`home_apps`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1785pt" height="1220pt"
 viewBox="0.00 0.00 1785.00 1220.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1205.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="390.38,-8 390.38,-790 1747.26,-790 1747.26,-8 390.38,-8"/>
<text xml:space="preserve" text-anchor="start" x="398.38" y="-777.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_apps</title>
<polygon fill="#3e4651" stroke="#2d333d" points="711.05,-48 711.05,-729 1472.06,-729 1472.06,-48 711.05,-48"/>
<text xml:space="preserve" text-anchor="start" x="719.05" y="-716.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">宅内アプリ</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1211.48,-798 1211.48,-1182 1472.64,-1182 1472.64,-798 1211.48,-798"/>
<text xml:space="preserve" text-anchor="start" x="1219.48" y="-1169.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
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
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1432.06,-348 1252.06,-348 1252.06,-248 1432.06,-248 1432.06,-348"/>
<text xml:space="preserve" text-anchor="start" x="1279.26" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">Wake&#45;on&#45;LAN</text>
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
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1707.26,-348 1521.64,-348 1521.64,-248 1707.26,-248 1707.26,-348"/>
<text xml:space="preserve" text-anchor="start" x="1531.65" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- databases -->
<g id="node9" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1432.64,-1121 1251.48,-1121 1251.48,-1021 1432.64,-1021 1432.64,-1121"/>
<text xml:space="preserve" text-anchor="start" x="1261.49" y="-1063" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- nas -->
<g id="node10" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1432.06,-928.91C1432.06,-933.93 1391.72,-938 1342.06,-938 1292.4,-938 1252.06,-933.93 1252.06,-928.91 1252.06,-928.91 1252.06,-847.09 1252.06,-847.09 1252.06,-842.07 1292.4,-838 1342.06,-838 1391.72,-838 1432.06,-842.07 1432.06,-847.09 1432.06,-847.09 1432.06,-928.91 1432.06,-928.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1432.06,-928.91C1432.06,-923.9 1391.72,-919.82 1342.06,-919.82 1292.4,-919.82 1252.06,-923.9 1252.06,-928.91"/>
<text xml:space="preserve" text-anchor="start" x="1272.6" y="-880" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS / NFS</text>
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
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M908.25,-507.59C917.09,-516.81 925.13,-527.03 931.05,-538 986.66,-640.85 910.55,-697.96 971.05,-798 1005.54,-855.03 1152.43,-953.79 1250.43,-1015.59"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1248.86,-1017.7 1256.6,-1019.47 1251.65,-1013.26 1248.86,-1017.7"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1046.14,-980.82 1046.14,-1003.62 1128.4,-1003.62 1128.4,-980.82 1046.14,-980.82"/>
<text xml:space="preserve" text-anchor="start" x="1049.14" y="-986.62" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- coupon_manager&#45;&gt;nas -->
<g id="edge12" class="edge">
<title>coupon_manager&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M903.63,-507.84C976.22,-566.98 1100.09,-669.07 1203.48,-760.2 1229.08,-782.76 1256.75,-808.24 1280.51,-830.48"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1278.6,-832.29 1285.87,-835.51 1282.19,-828.46 1278.6,-832.29"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="971.05,-760.2 971.05,-783 1203.48,-783 1203.48,-760.2 971.05,-760.2"/>
<text xml:space="preserve" text-anchor="start" x="974.05" y="-766" font-family="Arial" font-size="14.00" fill="#bbfcd3">images・Data Protection keys / PVC</text>
</g>
<!-- magic_mirror&#45;&gt;wol -->
<!-- wol&#45;&gt;dns -->
<!-- nextcloud&#45;&gt;databases -->
<g id="edge6" class="edge">
<title>nextcloud&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M586.29,-568.61C595.41,-577.89 603.87,-588.13 610.38,-599 648.71,-662.99 619.07,-694.29 650.38,-762 669.71,-803.8 676.83,-815.18 711.05,-846 794.83,-921.43 844.28,-900.26 931.05,-972.2 952.12,-989.66 947.06,-1005.84 971.05,-1019 1054.34,-1064.67 1163.4,-1075.11 1241.5,-1075.68"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1241.3,-1078.3 1248.8,-1075.69 1241.31,-1073.05 1241.3,-1078.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="757.15,-972.2 757.15,-995 924.96,-995 924.96,-972.2 757.15,-972.2"/>
<text xml:space="preserve" text-anchor="start" x="760.15" y="-978" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- nextcloud&#45;&gt;nas -->
<g id="edge7" class="edge">
<title>nextcloud&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M583.85,-568.72C593.48,-578.12 602.75,-588.37 610.38,-599 636.61,-635.56 623.72,-655.76 650.38,-692 671.42,-720.61 679.34,-728.02 711.05,-744 803.13,-790.38 1087.68,-844.38 1240.91,-871.16"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1240.44,-873.74 1248.28,-872.44 1241.34,-868.57 1240.44,-873.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="803.83,-807.91 803.83,-830.71 878.28,-830.71 878.28,-807.91 803.83,-807.91"/>
<text xml:space="preserve" text-anchor="start" x="806.83" y="-813.71" font-family="Arial" font-size="14.00" fill="#bbfcd3">NFS / PVC</text>
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
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M525.11,-728.98C535.34,-823.53 573.13,-1024.43 711.05,-1084 912.19,-1170.88 986.18,-1134.96 1203.48,-1107 1215.94,-1105.4 1228.89,-1103.01 1241.63,-1100.21"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1242.12,-1102.79 1248.85,-1098.56 1240.95,-1097.67 1242.12,-1102.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="827.56,-1138.55 827.56,-1161.35 854.55,-1161.35 854.55,-1138.55 827.56,-1138.55"/>
<text xml:space="preserve" text-anchor="start" x="830.56" y="-1146.75" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- recording&#45;&gt;nas -->
<g id="edge10" class="edge">
<title>recording&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M533.1,-728.94C554.04,-805.42 605.9,-949.06 711.05,-1010 795.65,-1059.03 846.33,-1058.81 931.05,-1010 961.77,-992.3 941.68,-960.83 971.05,-941 1050.48,-887.37 1161.41,-877.98 1241.05,-879.63"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1240.5,-882.25 1248.07,-879.82 1240.64,-877 1240.5,-882.25"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="803.05,-1046.69 803.05,-1069.49 879.06,-1069.49 879.06,-1046.69 803.05,-1046.69"/>
<text xml:space="preserve" text-anchor="start" x="806.05" y="-1052.49" font-family="Arial" font-size="14.00" fill="#bbfcd3">メディア保存</text>
</g>
<!-- databases&#45;&gt;nas -->
<g id="edge15" class="edge">
<title>databases&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1342.06,-1021.25C1342.06,-999.11 1342.06,-972.82 1342.06,-949.47"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1344.69,-949.5 1342.06,-942 1339.44,-949.5 1344.69,-949.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1278.76,-968.1 1278.76,-990.9 1376.56,-990.9 1376.56,-968.1 1278.76,-968.1"/>
<text xml:space="preserve" text-anchor="start" x="1281.76" y="-973.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
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
<svg width="1823pt" height="893pt"
 viewBox="0.00 0.00 1823.00 893.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 877.88)">
<g id="clust1" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="310.37,-450.82 310.37,-854.83 1587.37,-854.83 1587.37,-450.82 310.37,-450.82"/>
<text xml:space="preserve" text-anchor="start" x="318.37" y="-841.93" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="498.37,-218.81 498.37,-404.02 798.37,-404.02 798.37,-218.81 498.37,-218.81"/>
<text xml:space="preserve" text-anchor="start" x="506.37" y="-391.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_oke</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1050.37,-8 1050.37,-412.02 1573.37,-412.02 1573.37,-8 1050.37,-8"/>
<text xml:space="preserve" text-anchor="start" x="1058.37" y="-399.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<!-- reviews -->
<g id="node1" class="node">
<title>reviews</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="576.75,-793.63 350,-793.63 350,-693.62 576.75,-693.62 576.75,-793.63"/>
<text xml:space="preserve" text-anchor="start" x="360" y="-735.63" font-family="Arial" font-size="20.00" fill="#f8fafc">Re:Venterの一時レビュー</text>
</g>
<!-- images -->
<g id="node2" class="node">
<title>images</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="530.37,-590.82 350.37,-590.82 350.37,-490.82 530.37,-490.82 530.37,-590.82"/>
<text xml:space="preserve" text-anchor="start" x="374.22" y="-532.82" font-family="Arial" font-size="20.00" fill="#f8fafc">Image Updater</text>
</g>
<!-- git -->
<g id="node3" class="node">
<title>git</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1035.97,-793.63 804.77,-793.63 804.77,-693.62 1035.97,-693.62 1035.97,-793.63"/>
<text xml:space="preserve" text-anchor="start" x="814.78" y="-735.63" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- packer -->
<g id="node4" class="node">
<title>packer</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1306.97,-793.63 1095.77,-793.63 1095.77,-693.62 1306.97,-693.62 1306.97,-793.63"/>
<text xml:space="preserve" text-anchor="start" x="1105.78" y="-735.63" font-family="Arial" font-size="20.00" fill="#f8fafc">Packer / VM template</text>
</g>
<!-- ansible -->
<g id="node5" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1547.37,-793.63 1367.37,-793.63 1367.37,-693.62 1547.37,-693.62 1547.37,-793.63"/>
<text xml:space="preserve" text-anchor="start" x="1424.57" y="-735.63" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- runner -->
<g id="node6" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1250.37,-590.82 1070.37,-590.82 1070.37,-490.82 1250.37,-490.82 1250.37,-590.82"/>
<text xml:space="preserve" text-anchor="start" x="1085.35" y="-532.82" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 専用runner</text>
</g>
<!-- tfc -->
<g id="node7" class="node">
<title>tfc</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1010.37,-590.82 830.37,-590.82 830.37,-490.82 1010.37,-490.82 1010.37,-590.82"/>
<text xml:space="preserve" text-anchor="start" x="847.57" y="-532.82" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- argo -->
<g id="node8" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="770.37,-590.82 590.37,-590.82 590.37,-490.82 770.37,-490.82 770.37,-590.82"/>
<text xml:space="preserve" text-anchor="start" x="628.14" y="-532.82" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- vms -->
<g id="node9" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M766.17,-341.72C766.17,-346.74 713.37,-350.82 648.37,-350.82 583.37,-350.82 530.58,-346.74 530.58,-341.72 530.58,-341.72 530.58,-259.9 530.58,-259.9 530.58,-254.88 583.37,-250.81 648.37,-250.81 713.37,-250.81 766.17,-254.88 766.17,-259.9 766.17,-259.9 766.17,-341.72 766.17,-341.72"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M766.17,-341.72C766.17,-336.71 713.37,-332.63 648.37,-332.63 583.37,-332.63 530.58,-336.71 530.58,-341.72"/>
<text xml:space="preserve" text-anchor="start" x="540.58" y="-292.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- argo_1 -->
<g id="node10" class="node">
<title>argo_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1289.37,-350.82 1109.37,-350.82 1109.37,-250.81 1289.37,-250.81 1289.37,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="1139.91" y="-292.81" font-family="Arial" font-size="20.00" fill="#f8fafc">OKE ArgoCD</text>
</g>
<!-- scale -->
<g id="node11" class="node">
<title>scale</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1533.08,-350.82 1349.67,-350.82 1349.67,-250.81 1533.08,-250.81 1533.08,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="1359.67" y="-292.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Cluster Autoscaler</text>
</g>
<!-- api -->
<g id="node12" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1308.32,-148.01 1090.42,-148.01 1090.42,-48 1308.32,-48 1308.32,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1100.43" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">OKE API / Node pools</text>
</g>
<!-- hardware -->
<g id="node13" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1793.37,-350.82 1613.37,-350.82 1613.37,-250.81 1793.37,-250.81 1793.37,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="1628.36" y="-292.81" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- edge -->
<g id="node14" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1010.37,-350.82 830.37,-350.82 830.37,-250.81 1010.37,-250.81 1010.37,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="874.79" y="-292.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- home -->
<g id="node15" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="466.37,-350.82 286.37,-350.82 286.37,-250.81 466.37,-250.81 466.37,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="307.46" y="-292.81" font-family="Arial" font-size="20.00" fill="#eff6ff">自宅 / home&#45;k8s</text>
</g>
<!-- reventer -->
<g id="node16" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="226.74,-350.82 0,-350.82 0,-250.81 226.74,-250.81 226.74,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-292.81" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter / STG・PRD</text>
</g>
<!-- reviews&#45;&gt;images -->
<!-- git&#45;&gt;runner -->
<g id="edge2" class="edge">
<title>git&#45;&gt;runner</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M978.78,-693.76C1013.6,-664.62 1057.93,-627.53 1094.07,-597.29"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1095.73,-599.33 1099.8,-592.5 1092.36,-595.3 1095.73,-599.33"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1047.57,-630.82 1047.57,-653.62 1122.05,-653.62 1122.05,-630.82 1047.57,-630.82"/>
<text xml:space="preserve" text-anchor="start" x="1050.57" y="-636.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">Actions job</text>
</g>
<!-- git&#45;&gt;tfc -->
<g id="edge3" class="edge">
<title>git&#45;&gt;tfc</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M920.37,-693.76C920.37,-665.72 920.37,-630.33 920.37,-600.75"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="923,-601.08 920.37,-593.58 917.75,-601.08 923,-601.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="920.37,-630.82 920.37,-653.62 1011.16,-653.62 1011.16,-630.82 920.37,-630.82"/>
<text xml:space="preserve" text-anchor="start" x="923.37" y="-636.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">Terraform実行</text>
</g>
<!-- git&#45;&gt;argo -->
<g id="edge4" class="edge">
<title>git&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M861.97,-693.76C827.14,-664.62 782.81,-627.53 746.67,-597.29"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="748.38,-595.3 740.94,-592.5 745.01,-599.33 748.38,-595.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="807.57,-630.82 807.57,-653.62 857.13,-653.62 857.13,-630.82 807.57,-630.82"/>
<text xml:space="preserve" text-anchor="start" x="810.57" y="-636.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- git&#45;&gt;argo_1 -->
<g id="edge5" class="edge">
<title>git&#45;&gt;argo_1</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1035.84,-699.31C1134.17,-661.56 1262.33,-609.94 1280.37,-590.82 1335.11,-532.82 1377.3,-487.86 1335.37,-420.02 1331.19,-413.25 1325.92,-416.53 1319.37,-412.02 1296.45,-396.22 1273.41,-376.28 1253.74,-357.72"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1255.8,-356.05 1248.56,-352.77 1252.17,-359.85 1255.8,-356.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1352.37,-529.42 1352.37,-552.22 1401.94,-552.22 1401.94,-529.42 1352.37,-529.42"/>
<text xml:space="preserve" text-anchor="start" x="1355.37" y="-535.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- packer&#45;&gt;hardware -->
<g id="edge6" class="edge">
<title>packer&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1280.15,-693.75C1322.62,-665.84 1374.87,-628.9 1417.37,-590.82 1479.16,-535.48 1481.02,-508.33 1540.79,-450.82 1560.45,-431.89 1567.93,-430.09 1588.37,-412.02 1607.85,-394.79 1628.53,-375.36 1646.91,-357.65"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1648.35,-359.91 1651.92,-352.81 1644.7,-356.14 1648.35,-359.91"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1540.79,-529.42 1540.79,-552.22 1625.37,-552.22 1625.37,-529.42 1540.79,-529.42"/>
<text xml:space="preserve" text-anchor="start" x="1543.79" y="-535.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM template</text>
</g>
<!-- ansible&#45;&gt;hardware -->
<g id="edge7" class="edge">
<title>ansible&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1543.49,-693.87C1580.12,-668.26 1619.2,-633.31 1640.37,-590.82 1677.3,-516.75 1692.7,-421.39 1699.04,-360.9"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1701.62,-361.5 1699.75,-353.78 1696.4,-360.98 1701.62,-361.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1685.45,-529.42 1685.45,-552.22 1738.12,-552.22 1738.12,-529.42 1685.45,-529.42"/>
<text xml:space="preserve" text-anchor="start" x="1688.45" y="-535.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">機器設定</text>
</g>
<!-- tfc&#45;&gt;vms -->
<g id="edge10" class="edge">
<title>tfc&#45;&gt;vms</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M864.67,-491.08C820.74,-452.64 759.4,-398.96 713.25,-358.58"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="715.05,-356.67 707.68,-353.71 711.6,-360.62 715.05,-356.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="808.73,-420.02 808.73,-442.82 859.07,-442.82 859.07,-420.02 808.73,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="811.73" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">監視VM</text>
</g>
<!-- tfc&#45;&gt;argo_1 -->
<g id="edge11" class="edge">
<title>tfc&#45;&gt;argo_1</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M975.4,-490.99C994.78,-476.05 1017.47,-460.92 1040.37,-450.82 1057.36,-443.32 1065.38,-452.26 1081.37,-442.82 1092.65,-436.16 1103.34,-428.02 1113.34,-419.03"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1114.96,-421.12 1118.64,-414.08 1111.37,-417.28 1114.96,-421.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="975.28,-448.45 975.28,-471.25 1047.4,-471.25 1047.4,-448.45 975.28,-448.45"/>
<text xml:space="preserve" text-anchor="start" x="978.28" y="-454.25" font-family="Arial" font-size="14.00" fill="#cbd0fd">OCI / OKE</text>
</g>
<!-- tfc&#45;&gt;hardware -->
<g id="edge8" class="edge">
<title>tfc&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M972.99,-490.86C992.7,-475.34 1016.21,-459.87 1040.37,-450.82 1061.45,-442.91 1118.94,-444.75 1141.37,-442.82 1250.03,-433.44 1276.87,-427.24 1385.69,-420.02 1408.18,-418.52 1567.63,-420.83 1588.37,-412.02 1615.69,-400.41 1640.31,-379.17 1659.7,-358.41"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1661.47,-360.36 1664.57,-353.04 1657.58,-356.83 1661.47,-360.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1385.69,-420.02 1385.69,-442.82 1494.37,-442.82 1494.37,-420.02 1385.69,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="1388.69" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM / ネットワーク</text>
</g>
<!-- tfc&#45;&gt;edge -->
<g id="edge9" class="edge">
<title>tfc&#45;&gt;edge</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M920.37,-491.08C920.37,-453.38 920.37,-401.02 920.37,-360.92"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="923,-361.01 920.37,-353.51 917.75,-361.01 923,-361.01"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="920.37,-420.02 920.37,-442.82 1067.2,-442.82 1067.2,-420.02 920.37,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="923.37" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">DNS / Access / Tunnel</text>
</g>
<!-- argo&#45;&gt;home -->
<g id="edge12" class="edge">
<title>argo&#45;&gt;home</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M618.58,-490.84C600.28,-477.22 579.91,-462.86 560.37,-450.82 527.75,-430.71 514.26,-434.7 483.37,-412.02 462.22,-396.48 441.51,-376.6 424.03,-358.01"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="426.33,-356.63 419.31,-352.91 422.48,-360.19 426.33,-356.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="546.03,-420.02 546.03,-442.82 628.28,-442.82 628.28,-420.02 546.03,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="549.03" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期</text>
</g>
<!-- argo&#45;&gt;reventer -->
<g id="edge13" class="edge">
<title>argo&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M628.85,-490.99C608.98,-475.18 585.09,-459.5 560.37,-450.82 515.4,-435.02 392.88,-451.54 346.02,-442.82 304.6,-435.1 293.47,-431.98 256.37,-412.02 228.23,-396.87 199.82,-376.3 175.81,-357.04"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="177.68,-355.17 170.2,-352.47 174.36,-359.24 177.68,-355.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="346.02,-420.02 346.02,-442.82 480.37,-442.82 480.37,-420.02 346.02,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="349.02" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">STG・PRDアプリ同期</text>
</g>
<!-- argo_1&#45;&gt;api -->
<g id="edge14" class="edge">
<title>argo_1&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1199.37,-250.95C1199.37,-222.91 1199.37,-187.51 1199.37,-157.94"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1202,-158.27 1199.37,-150.77 1196.75,-158.27 1202,-158.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1199.37,-188.01 1199.37,-210.81 1275.39,-210.81 1275.39,-188.01 1199.37,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1202.37" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">共通基盤同期</text>
</g>
<!-- scale&#45;&gt;api -->
<g id="edge15" class="edge">
<title>scale&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1382.48,-250.95C1347.22,-221.68 1302.29,-184.4 1265.77,-154.1"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1267.88,-152.44 1260.44,-149.67 1264.53,-156.48 1267.88,-152.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1327.63,-188.01 1327.63,-210.81 1418.45,-210.81 1418.45,-188.01 1327.63,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1330.63" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">burst pool増減</text>
</g>
</g>
</svg>
`;case`secrets`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="848pt" height="1339pt"
 viewBox="0.00 0.00 848.00 1339.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1324.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="495.11,-1116 495.11,-1301 810.34,-1301 810.34,-1116 495.11,-1116"/>
<text xml:space="preserve" text-anchor="start" x="503.11" y="-1288.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_oke</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="495.11,-923 495.11,-1108 810.34,-1108 810.34,-923 495.11,-923"/>
<text xml:space="preserve" text-anchor="start" x="503.11" y="-1095.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_reventer</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="526.81,-730 526.81,-915 778.64,-915 778.64,-730 526.81,-730"/>
<text xml:space="preserve" text-anchor="start" x="534.81" y="-902.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">RE:VENTER / STG・PRD</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="497.13,-201 497.13,-722 808.32,-722 808.32,-201 497.13,-201"/>
<text xml:space="preserve" text-anchor="start" x="505.13" y="-709.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="530.73,-8 530.73,-193 774.73,-193 774.73,-8 530.73,-8"/>
<text xml:space="preserve" text-anchor="start" x="538.73" y="-180.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<!-- eso -->
<g id="node1" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="778.34,-1248 527.11,-1248 527.11,-1148 778.34,-1148 778.34,-1248"/>
<text xml:space="preserve" text-anchor="start" x="537.12" y="-1190" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- eso_1 -->
<g id="node2" class="node">
<title>eso_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="778.34,-1055 527.11,-1055 527.11,-955 778.34,-955 778.34,-1055"/>
<text xml:space="preserve" text-anchor="start" x="537.12" y="-997" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- external_secrets -->
<g id="node3" class="node">
<title>external_secrets</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="746.64,-862 558.81,-862 558.81,-762 746.64,-762 746.64,-862"/>
<text xml:space="preserve" text-anchor="start" x="568.82" y="-804" font-family="Arial" font-size="20.00" fill="#f8fafc">ESO / PRD共通基盤</text>
</g>
<!-- git -->
<g id="node4" class="node">
<title>git</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="768.32,-661 537.13,-661 537.13,-561 768.32,-561 768.32,-661"/>
<text xml:space="preserve" text-anchor="start" x="547.14" y="-603" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- tfc -->
<g id="node5" class="node">
<title>tfc</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="742.73,-501 562.73,-501 562.73,-401 742.73,-401 742.73,-501"/>
<text xml:space="preserve" text-anchor="start" x="579.93" y="-443" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- ansible -->
<g id="node6" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="742.73,-341 562.73,-341 562.73,-241 742.73,-241 742.73,-341"/>
<text xml:space="preserve" text-anchor="start" x="619.93" y="-283" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- backups -->
<g id="node7" class="node">
<title>backups</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="742.73,-140 562.73,-140 562.73,-40 742.73,-40 742.73,-140"/>
<text xml:space="preserve" text-anchor="start" x="586.05" y="-82" font-family="Arial" font-size="20.00" fill="#f8fafc">バックアップ処理</text>
</g>
<!-- bws -->
<g id="node8" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="266.8,-661 0,-661 0,-561 266.8,-561 266.8,-661"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-603" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge1" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M151.66,-660.93C177.85,-732.22 232.56,-865.14 306.8,-961 374.41,-1048.28 402.68,-1062.63 495.11,-1123 505.87,-1130.03 517.39,-1136.79 529.12,-1143.19"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="527.6,-1145.36 535.45,-1146.58 530.08,-1140.73 527.6,-1145.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="362.06,-1115.97 362.06,-1138.77 431.86,-1138.77 431.86,-1115.97 362.06,-1115.97"/>
<text xml:space="preserve" text-anchor="start" x="365.06" y="-1121.77" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;eso_1 -->
<g id="edge2" class="edge">
<title>bws&#45;&gt;eso_1</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M179.97,-660.95C244.54,-729.31 368.89,-852.37 495.11,-930 506.58,-937.05 518.81,-943.93 531.2,-950.47"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="529.68,-952.64 537.55,-953.78 532.11,-947.99 529.68,-952.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="362.06,-923.16 362.06,-945.96 431.86,-945.96 431.86,-923.16 362.06,-923.16"/>
<text xml:space="preserve" text-anchor="start" x="365.06" y="-928.96" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;external_secrets -->
<g id="edge3" class="edge">
<title>bws&#45;&gt;external_secrets</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M262.94,-660.94C351.4,-695.31 467.31,-740.35 549.49,-772.28"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="548.08,-774.54 556.02,-774.81 549.98,-769.65 548.08,-774.54"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="324.72,-746.99 324.72,-769.79 469.2,-769.79 469.2,-746.99 324.72,-746.99"/>
<text xml:space="preserve" text-anchor="start" x="327.72" y="-752.79" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO / PRD Secret注入</text>
</g>
<!-- bws&#45;&gt;git -->
<g id="edge4" class="edge">
<title>bws&#45;&gt;git</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M266.62,-611C346.69,-611 448.21,-611 526.91,-611"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="526.85,-613.63 534.35,-611 526.85,-608.38 526.85,-613.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="354.66,-611 354.66,-633.8 439.25,-633.8 439.25,-611 354.66,-611"/>
<text xml:space="preserve" text-anchor="start" x="357.66" y="-616.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">CI credential</text>
</g>
<!-- bws&#45;&gt;tfc -->
<g id="edge5" class="edge">
<title>bws&#45;&gt;tfc</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M266.62,-570.11C355.94,-542.48 471.94,-506.6 553.19,-481.48"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="553.64,-484.08 560.03,-479.36 552.09,-479.07 553.64,-484.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="351.56,-556.97 351.56,-579.77 442.35,-579.77 442.35,-556.97 351.56,-556.97"/>
<text xml:space="preserve" text-anchor="start" x="354.56" y="-562.77" font-family="Arial" font-size="14.00" fill="#fcd9d2">Terraform変数</text>
</g>
<!-- bws&#45;&gt;ansible -->
<g id="edge6" class="edge">
<title>bws&#45;&gt;ansible</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M186.57,-561.28C219.51,-531.35 263.82,-493.66 306.8,-465.2 385.76,-412.92 482.52,-365.33 553.44,-333.15"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="554.32,-335.64 560.07,-330.16 552.16,-330.85 554.32,-335.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="326.26,-465.2 326.26,-488 467.65,-488 467.65,-465.2 326.26,-465.2"/>
<text xml:space="preserve" text-anchor="start" x="329.26" y="-471" font-family="Arial" font-size="14.00" fill="#fcd9d2">機器・PBS用credential</text>
</g>
<!-- bws&#45;&gt;backups -->
<g id="edge7" class="edge">
<title>bws&#45;&gt;backups</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M157.7,-561.19C187.02,-501.78 241.53,-401.43 306.8,-329.2 377.3,-251.19 408.34,-245.37 495.11,-186 515.15,-172.29 537.12,-158.25 558.1,-145.28"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="559.43,-147.54 564.44,-141.38 556.68,-143.07 559.43,-147.54"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="306.8,-329.2 306.8,-352 487.11,-352 487.11,-329.2 306.8,-329.2"/>
<text xml:space="preserve" text-anchor="start" x="309.8" y="-335" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO経由 / backup credential</text>
</g>
</g>
</svg>
`;case`observability`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1277pt" height="1008pt"
 viewBox="0.00 0.00 1277.00 1008.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 993.05)">
<g id="clust1" class="cluster">
<title>cluster_reventer</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="24.08,-777 24.08,-962 315.92,-962 315.92,-777 24.08,-777"/>
<text xml:space="preserve" text-anchor="start" x="32.08" y="-949.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">RE:VENTER / STG・PRD</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-132 8,-578 1238.92,-578 1238.92,-132 8,-132"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-565.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_agent</title>
<polygon fill="#3e4651" stroke="#2d333d" points="40,-164 40,-525 1206.92,-525 1206.92,-164 40,-164"/>
<text xml:space="preserve" text-anchor="start" x="48" y="-512.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">自宅監視基盤</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="449.53,-586 449.53,-970 765.12,-970 765.12,-586 449.53,-586"/>
<text xml:space="preserve" text-anchor="start" x="457.53" y="-957.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<!-- collectors -->
<g id="node1" class="node">
<title>collectors</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="283.92,-909.01 56.08,-909.01 56.08,-809 283.92,-809 283.92,-909.01"/>
<text xml:space="preserve" text-anchor="start" x="66.09" y="-851" font-family="Arial" font-size="20.00" fill="#f8fafc">STG・PRD監視collector</text>
</g>
<!-- pdc -->
<g id="node2" class="node">
<title>pdc</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="260,-304.01 80,-304.01 80,-204 260,-204 260,-304.01"/>
<text xml:space="preserve" text-anchor="start" x="96.08" y="-246" font-family="Arial" font-size="20.00" fill="#f8fafc">PDC agent / 自宅</text>
</g>
<!-- exporters -->
<g id="node3" class="node">
<title>exporters</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="260,-464.01 80,-464.01 80,-364 260,-364 260,-464.01"/>
<text xml:space="preserve" text-anchor="start" x="124.98" y="-406" font-family="Arial" font-size="20.00" fill="#f8fafc">exporter群</text>
</g>
<!-- collector -->
<g id="node4" class="node">
<title>collector</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="756.82,-447.01 457.82,-447.01 457.82,-347 756.82,-347 756.82,-447.01"/>
<text xml:space="preserve" text-anchor="start" x="467.83" y="-389" font-family="Arial" font-size="20.00" fill="#f8fafc">vmagent / scrape・remoteWrite</text>
</g>
<!-- local_store -->
<g id="node5" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1166.92,-304.92C1166.92,-309.93 1121.84,-314.01 1066.34,-314.01 1010.84,-314.01 965.76,-309.93 965.76,-304.92 965.76,-304.92 965.76,-223.09 965.76,-223.09 965.76,-218.08 1010.84,-214 1066.34,-214 1121.84,-214 1166.92,-218.08 1166.92,-223.09 1166.92,-223.09 1166.92,-304.92 1166.92,-304.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1166.92,-304.92C1166.92,-299.9 1121.84,-295.82 1066.34,-295.82 1010.84,-295.82 965.76,-299.9 965.76,-304.92"/>
<text xml:space="preserve" text-anchor="start" x="975.77" y="-256" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- vms -->
<g id="node6" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M725.12,-899.92C725.12,-904.93 672.32,-909.01 607.32,-909.01 542.32,-909.01 489.53,-904.93 489.53,-899.92 489.53,-899.92 489.53,-818.09 489.53,-818.09 489.53,-813.08 542.32,-809 607.32,-809 672.32,-809 725.12,-813.08 725.12,-818.09 725.12,-818.09 725.12,-899.92 725.12,-899.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M725.12,-899.92C725.12,-894.9 672.32,-890.82 607.32,-890.82 542.32,-890.82 489.53,-894.9 489.53,-899.92"/>
<text xml:space="preserve" text-anchor="start" x="499.53" y="-851" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- grafana -->
<g id="node7" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="711.82,-726.01 502.83,-726.01 502.83,-626 711.82,-626 711.82,-726.01"/>
<text xml:space="preserve" text-anchor="start" x="512.84" y="-668" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- hardware -->
<g id="node8" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="260,-100.01 80,-100.01 80,0 260,0 260,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="94.99" y="-42" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- operator -->
<g id="node9" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="260,-726.01 80,-726.01 80,-626 260,-626 260,-726.01"/>
<text xml:space="preserve" text-anchor="start" x="145" y="-668" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- collectors&#45;&gt;vms -->
<g id="edge3" class="edge">
<title>collectors&#45;&gt;vms</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M283.67,-859C343.33,-859 416.83,-859 478.6,-859"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="478.28,-861.63 485.78,-859 478.28,-856.38 478.28,-861.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="357.37,-859 357.37,-881.8 384.37,-881.8 384.37,-859 357.37,-859"/>
<text xml:space="preserve" text-anchor="start" x="360.37" y="-867.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#ffe0c2">[...]</text>
</g>
<!-- pdc&#45;&gt;local_store -->
<g id="edge5" class="edge">
<title>pdc&#45;&gt;local_store</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M259.94,-257.3C280.92,-257.97 303.2,-258.6 323.92,-259 547.79,-263.42 809.74,-264.14 954.66,-264.15"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="954.37,-266.78 961.87,-264.15 954.37,-261.53 954.37,-266.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="540.51,-263.72 540.51,-286.52 674.14,-286.52 674.14,-263.72 540.51,-263.72"/>
<text xml:space="preserve" text-anchor="start" x="543.51" y="-269.52" font-family="Arial" font-size="14.00" fill="#d4f2ff">private query / :8428</text>
</g>
<!-- pdc&#45;&gt;grafana -->
<g id="edge4" class="edge">
<title>pdc&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M259.87,-284.77C281.8,-296.7 302.76,-312.75 315.92,-334 337.93,-369.55 301.81,-486.51 323.92,-522 361.68,-582.63 432.21,-621.12 493.33,-644.46"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="492.27,-646.87 500.22,-647.02 494.1,-641.95 492.27,-646.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="323.92,-604.31 323.92,-627.11 417.82,-627.11 417.82,-604.31 323.92,-604.31"/>
<text xml:space="preserve" text-anchor="start" x="326.92" y="-610.11" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きPDC接続</text>
</g>
<!-- exporters&#45;&gt;collector -->
<g id="edge6" class="edge">
<title>exporters&#45;&gt;collector</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M259.8,-401.91C280.78,-399.54 303.11,-397.41 323.92,-396.2 363.88,-393.89 407.08,-393.13 447.38,-393.17"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="447.3,-395.8 454.81,-393.19 447.31,-390.55 447.3,-395.8"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="346.86,-396.2 346.86,-419 394.88,-419 394.88,-396.2 346.86,-396.2"/>
<text xml:space="preserve" text-anchor="start" x="349.86" y="-402" font-family="Arial" font-size="14.00" fill="#ffe0c2">scrape</text>
</g>
<!-- collector&#45;&gt;local_store -->
<g id="edge10" class="edge">
<title>collector&#45;&gt;local_store</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M756.7,-353.82C821.27,-335.03 895.6,-313.4 955.14,-296.08"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="955.56,-298.68 962.03,-294.07 954.1,-293.64 955.56,-298.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="796.82,-338.47 796.82,-361.27 925.76,-361.27 925.76,-338.47 796.82,-338.47"/>
<text xml:space="preserve" text-anchor="start" x="799.82" y="-344.27" font-family="Arial" font-size="14.00" fill="#ffe0c2">remoteWrite / :8428</text>
</g>
<!-- vms&#45;&gt;grafana -->
<g id="edge7" class="edge">
<title>vms&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M607.32,-808.17C607.32,-785.79 607.32,-759.34 607.32,-736"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="609.95,-736.05 607.32,-728.55 604.7,-736.05 609.95,-736.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="498.51,-756.1 498.51,-778.9 687.34,-778.9 687.34,-756.1 498.51,-756.1"/>
<text xml:space="preserve" text-anchor="start" x="501.51" y="-761.9" font-family="Arial" font-size="14.00" fill="#d4f2ff">VM側PDC agentから外向き接続</text>
</g>
<!-- grafana&#45;&gt;pdc -->
<g id="edge8" class="edge">
<title>grafana&#45;&gt;pdc</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M539.15,-626.22C509.51,-602.22 475.56,-571.78 449.53,-540 431.45,-517.94 437.92,-504.44 417.82,-484.2 383.86,-450.01 349.73,-470.7 323.92,-430 300.99,-393.85 339.19,-369.94 315.92,-334 304.25,-315.99 287.06,-301.68 268.56,-290.44"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="270.12,-288.31 262.31,-286.85 267.5,-292.86 270.12,-288.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="323.92,-484.2 323.92,-507 417.82,-507 417.82,-484.2 323.92,-484.2"/>
<text xml:space="preserve" text-anchor="start" x="326.92" y="-490" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由の検索</text>
</g>
<!-- grafana&#45;&gt;vms -->
<g id="edge9" class="edge">
<title>grafana&#45;&gt;vms</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M630.02,-725.94C631.26,-729.98 632.32,-734.05 633.12,-738.06 638.25,-763.73 638.25,-771.28 633.12,-796.95 633.05,-797.3 632.98,-797.64 632.91,-797.98"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="630.41,-797.18 631.09,-805.1 635.49,-798.48 630.41,-797.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="592.27,-756.1 592.27,-778.9 651.17,-778.9 651.17,-756.1 592.27,-756.1"/>
<text xml:space="preserve" text-anchor="start" x="595.27" y="-761.9" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由</text>
</g>
<!-- hardware&#45;&gt;collector -->
<g id="edge1" class="edge">
<title>hardware&#45;&gt;collector</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M251.92,-99.97C273.54,-114.72 296.33,-131.6 315.92,-149 383.42,-208.95 380.41,-243.93 449.53,-302 466.33,-316.12 485.45,-329.52 504.42,-341.57"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="502.81,-343.66 510.56,-345.41 505.59,-339.21 502.81,-343.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="330.52,-269.54 330.52,-292.34 411.22,-292.34 411.22,-269.54 330.52,-269.54"/>
<text xml:space="preserve" text-anchor="start" x="333.52" y="-275.34" font-family="Arial" font-size="14.00" fill="#ffe0c2">exporter収集</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M259.88,-676C327.21,-676 420.22,-676 492.91,-676"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="492.5,-678.63 500,-676 492.5,-673.38 492.5,-678.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="356.2,-676 356.2,-698.8 385.54,-698.8 385.54,-676 356.2,-676"/>
<text xml:space="preserve" text-anchor="start" x="359.2" y="-681.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">照会</text>
</g>
</g>
</svg>
`;case`placement`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="654pt" height="690pt"
 viewBox="0.00 0.00 654.00 690.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 675.05)">
<!-- homesite -->
<g id="node1" class="node">
<title>homesite</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="623.6,-180 0,-180 0,0 623.6,0 623.6,-180"/>
<text xml:space="preserve" text-anchor="start" x="192.33" y="-102" font-family="Arial" font-size="20.00" fill="#fafafa">自宅 / Proxmox2ホスト・RPi</text>
<text xml:space="preserve" text-anchor="start" x="248.87" y="-79" font-family="Arial" font-size="15.00" fill="#d4d4d4">CP VM3台とworker</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-61" font-family="Arial" font-size="15.00" fill="#d4d4d4">VM2台はPVE2ホストへ配置。Podの配置は動的。配置詳細はホスト・クラスタをクリックして辿る。</text>
</g>
<!-- stg -->
<g id="node2" class="node">
<title>stg</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="471.82,-420 151.78,-420 151.78,-240 471.82,-240 471.82,-420"/>
<text xml:space="preserve" text-anchor="start" x="207.89" y="-322" font-family="Arial" font-size="20.00" fill="#eff6ff">OCI / STG OKE共通基盤</text>
</g>
<!-- prd -->
<g id="node3" class="node">
<title>prd</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="549.68,-660 73.91,-660 73.91,-480 549.68,-480 549.68,-660"/>
<text xml:space="preserve" text-anchor="start" x="93.97" y="-573" font-family="Arial" font-size="20.00" fill="#eff6ff">PRD OKE / 本体reventer所有・共通アドオンmy&#45;infra</text>
<text xml:space="preserve" text-anchor="start" x="168.02" y="-550" font-family="Arial" font-size="15.00" fill="#bfdbfe">別リポジトリ管理。モデルで所有境界を維持する。</text>
</g>
</g>
</svg>
`;case`media`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2118pt" height="1524pt"
 viewBox="0.00 0.00 2118.00 1524.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2087.74,-1361.92C2087.74,-1366.93 2047.4,-1371.01 1997.74,-1371.01 1948.08,-1371.01 1907.74,-1366.93 1907.74,-1361.92 1907.74,-1361.92 1907.74,-1280.09 1907.74,-1280.09 1907.74,-1275.08 1948.08,-1271 1997.74,-1271 2047.4,-1271 2087.74,-1275.08 2087.74,-1280.09 2087.74,-1280.09 2087.74,-1361.92 2087.74,-1361.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2087.74,-1361.92C2087.74,-1356.9 2047.4,-1352.82 1997.74,-1352.82 1948.08,-1352.82 1907.74,-1356.9 1907.74,-1361.92"/>
<text xml:space="preserve" text-anchor="start" x="1928.29" y="-1313" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS / NFS</text>
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
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1304.99,-1156C1434.7,-1205.38 1666.95,-1213.85 1759.92,-1241 1805.33,-1254.27 1855.01,-1270.74 1897.08,-1285.28"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1895.97,-1287.68 1903.91,-1287.65 1897.69,-1282.72 1895.97,-1287.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1530.91,-1192.08 1530.91,-1214.88 1606.92,-1214.88 1606.92,-1192.08 1530.91,-1192.08"/>
<text xml:space="preserve" text-anchor="start" x="1533.91" y="-1197.88" font-family="Arial" font-size="14.00" fill="#bbfcd3">メディア保存</text>
</g>
<!-- databases&#45;&gt;nas -->
<g id="edge19" class="edge">
<title>databases&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1667.66,-1321C1734.96,-1321 1827.17,-1321 1896.86,-1321"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1896.45,-1323.63 1903.95,-1321 1896.45,-1318.38 1896.45,-1323.63"/>
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
<svg width="2556pt" height="2064pt"
 viewBox="0.00 0.00 2556.00 2064.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 2049.05)">
<g id="clust1" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1628.57,-376 1628.57,-1057 1950.92,-1057 1950.92,-376 1628.57,-376"/>
<text xml:space="preserve" text-anchor="start" x="1636.57" y="-1044.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="2094.31,-1017 2094.31,-1619 2517.75,-1619 2517.75,-1017 2094.31,-1017"/>
<text xml:space="preserve" text-anchor="start" x="2102.31" y="-1606.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_dns</title>
<polygon fill="#3e4651" stroke="#2d333d" points="2134.31,-1057 2134.31,-1418 2477.75,-1418 2477.75,-1057 2134.31,-1057"/>
<text xml:space="preserve" text-anchor="start" x="2142.31" y="-1405.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">内部DNS / METALLB</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_oke</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-1404 8,-2026 1390.29,-2026 1390.29,-1404 8,-1404"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-2013.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_network</title>
<polygon fill="#3e4651" stroke="#2d333d" points="520.15,-1444 520.15,-1965 1350.29,-1965 1350.29,-1444 520.15,-1444"/>
<text xml:space="preserve" text-anchor="start" x="528.15" y="-1952.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">OCI NETWORK</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_edge</title>
<polygon fill="#5a3620" stroke="#462a17" points="489.61,-696 489.61,-1217 1349.73,-1217 1349.73,-696 489.61,-696"/>
<text xml:space="preserve" text-anchor="start" x="497.61" y="-1204.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1629.71,-1444 1629.71,-1805 1949.79,-1805 1949.79,-1444 1629.71,-1444"/>
<text xml:space="preserve" text-anchor="start" x="1637.71" y="-1792.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_lan</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2138.15,-8 2138.15,-1009 2473.91,-1009 2473.91,-8 2138.15,-8"/>
<text xml:space="preserve" text-anchor="start" x="2146.15" y="-996.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">LAN / VLAN・経路</text>
</g>
<!-- lb -->
<g id="node1" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1910.92,-836 1668.57,-836 1668.57,-736 1910.92,-736 1910.92,-836"/>
<text xml:space="preserve" text-anchor="start" x="1678.58" y="-778" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived ×2</text>
</g>
<!-- router -->
<g id="node2" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1879.75,-676 1699.75,-676 1699.75,-576 1879.75,-576 1879.75,-676"/>
<text xml:space="preserve" text-anchor="start" x="1723.6" y="-618" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / VLAN</text>
</g>
<!-- wifi -->
<g id="node3" class="node">
<title>wifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1879.75,-516 1699.75,-516 1699.75,-416 1879.75,-416 1879.75,-516"/>
<text xml:space="preserve" text-anchor="start" x="1750.31" y="-458" font-family="Arial" font-size="20.00" fill="#f8fafc">Wi&#45;Fi AP</text>
</g>
<!-- unifi -->
<g id="node4" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1879.75,-996 1699.75,-996 1699.75,-896 1879.75,-896 1879.75,-996"/>
<text xml:space="preserve" text-anchor="start" x="1716.96" y="-938" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS Server</text>
</g>
<!-- coredns -->
<g id="node5" class="node">
<title>coredns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2437.75,-1197 2174.31,-1197 2174.31,-1097 2437.75,-1097 2437.75,-1197"/>
<text xml:space="preserve" text-anchor="start" x="2184.32" y="-1139" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / miutaku.internal</text>
</g>
<!-- metallb -->
<g id="node6" class="node">
<title>metallb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2434.42,-1357 2177.64,-1357 2177.64,-1257 2434.42,-1257 2434.42,-1357"/>
<text xml:space="preserve" text-anchor="start" x="2187.65" y="-1299" font-family="Arial" font-size="20.00" fill="#f8fafc">MetalLB / LANのService IP</text>
</g>
<!-- cloudflared -->
<g id="node7" class="node">
<title>cloudflared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2433.88,-1558 2178.18,-1558 2178.18,-1458 2433.88,-1458 2433.88,-1558"/>
<text xml:space="preserve" text-anchor="start" x="2188.19" y="-1500" font-family="Arial" font-size="20.00" fill="#f8fafc">cloudflared / 自宅connector</text>
</g>
<!-- private_workers -->
<g id="node8" class="node">
<title>private_workers</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="771.37,-1661 560.15,-1661 560.15,-1561 771.37,-1561 771.37,-1661"/>
<text xml:space="preserve" text-anchor="start" x="570.16" y="-1603" font-family="Arial" font-size="20.00" fill="#f8fafc">private worker subnet</text>
</g>
<!-- nat -->
<g id="node9" class="node">
<title>nat</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1310.29,-1584 1051.29,-1584 1051.29,-1484 1310.29,-1484 1310.29,-1584"/>
<text xml:space="preserve" text-anchor="start" x="1061.3" y="-1526" font-family="Arial" font-size="20.00" fill="#f8fafc">NAT gateway / reserved IP</text>
</g>
<!-- service_gateway -->
<g id="node10" class="node">
<title>service_gateway</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1304.17,-1744 1057.41,-1744 1057.41,-1644 1304.17,-1644 1304.17,-1744"/>
<text xml:space="preserve" text-anchor="start" x="1067.42" y="-1686" font-family="Arial" font-size="20.00" fill="#f8fafc">Service Gateway / Oracle</text>
</g>
<!-- igw -->
<g id="node11" class="node">
<title>igw</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="755.76,-1904 575.76,-1904 575.76,-1804 755.76,-1804 755.76,-1904"/>
<text xml:space="preserve" text-anchor="start" x="591.83" y="-1846" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet gateway</text>
</g>
<!-- public_api -->
<g id="node12" class="node">
<title>public_api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1276.96,-1904 1084.63,-1904 1084.63,-1804 1276.96,-1804 1276.96,-1904"/>
<text xml:space="preserve" text-anchor="start" x="1094.63" y="-1846" font-family="Arial" font-size="20.00" fill="#f8fafc">公開API・LB subnet</text>
</g>
<!-- workers -->
<g id="node13" class="node">
<title>workers</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="265.94,-1661 48,-1661 48,-1561 265.94,-1561 265.94,-1661"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-1603" font-family="Arial" font-size="20.00" fill="#f8fafc">base / burst node pool</text>
</g>
<!-- access -->
<g id="node14" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="755.76,-836 575.76,-836 575.76,-736 755.76,-736 755.76,-836"/>
<text xml:space="preserve" text-anchor="start" x="608.52" y="-778" font-family="Arial" font-size="20.00" fill="#f8fafc">Access / 認証</text>
</g>
<!-- tunnel -->
<g id="node15" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="755.76,-996 575.76,-996 575.76,-896 755.76,-896 755.76,-996"/>
<text xml:space="preserve" text-anchor="start" x="586.83" y="-938" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- warp -->
<g id="node16" class="node">
<title>warp</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="801.91,-1156 529.61,-1156 529.61,-1056 801.91,-1056 801.91,-1156"/>
<text xml:space="preserve" text-anchor="start" x="539.62" y="-1098" font-family="Arial" font-size="20.00" fill="#f8fafc">WARP / private CIDR routes</text>
</g>
<!-- routes -->
<g id="node17" class="node">
<title>routes</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1309.73,-996 1051.85,-996 1051.85,-896 1309.73,-896 1309.73,-996"/>
<text xml:space="preserve" text-anchor="start" x="1061.86" y="-938" font-family="Arial" font-size="20.00" fill="#f8fafc">公開hostname / 設定から抽出</text>
</g>
<!-- internet -->
<g id="node18" class="node">
<title>internet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1879.75,-1584 1699.75,-1584 1699.75,-1484 1879.75,-1484 1879.75,-1584"/>
<text xml:space="preserve" text-anchor="start" x="1755.84" y="-1526" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet</text>
</g>
<!-- oracle -->
<g id="node19" class="node">
<title>oracle</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1909.79,-1744 1669.71,-1744 1669.71,-1644 1909.79,-1644 1909.79,-1744"/>
<text xml:space="preserve" text-anchor="start" x="1679.72" y="-1686" font-family="Arial" font-size="20.00" fill="#f8fafc">Oracle Services Network</text>
</g>
<!-- server -->
<g id="node20" class="node">
<title>server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2433.91,-948 2178.15,-948 2178.15,-848 2433.91,-848 2433.91,-948"/>
<text xml:space="preserve" text-anchor="start" x="2188.16" y="-890" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN20 / 192.168.20.0/24</text>
</g>
<!-- native -->
<g id="node21" class="node">
<title>native</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2417.79,-468 2194.27,-468 2194.27,-368 2417.79,-368 2417.79,-468"/>
<text xml:space="preserve" text-anchor="start" x="2204.28" y="-410" font-family="Arial" font-size="20.00" fill="#f8fafc">native / 192.168.0.0/24</text>
</g>
<!-- management -->
<g id="node22" class="node">
<title>management</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2433.91,-308 2178.15,-308 2178.15,-208 2433.91,-208 2433.91,-308"/>
<text xml:space="preserve" text-anchor="start" x="2188.16" y="-250" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN10 / 192.168.10.0/24</text>
</g>
<!-- client -->
<g id="node23" class="node">
<title>client</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2433.91,-148 2178.15,-148 2178.15,-48 2433.91,-48 2433.91,-148"/>
<text xml:space="preserve" text-anchor="start" x="2188.16" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN30 / 192.168.30.0/24</text>
</g>
<!-- guest -->
<g id="node24" class="node">
<title>guest</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2396.03,-788 2216.03,-788 2216.03,-688 2396.03,-688 2396.03,-788"/>
<text xml:space="preserve" text-anchor="start" x="2235.99" y="-730" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN31 / guest</text>
</g>
<!-- iot -->
<g id="node25" class="node">
<title>iot</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2433.91,-628 2178.15,-628 2178.15,-528 2433.91,-528 2433.91,-628"/>
<text xml:space="preserve" text-anchor="start" x="2188.16" y="-570" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN40 / 192.168.40.0/24</text>
</g>
<!-- operator -->
<g id="node26" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="246.97,-836 66.97,-836 66.97,-736 246.97,-736 246.97,-836"/>
<text xml:space="preserve" text-anchor="start" x="131.96" y="-778" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- lb&#45;&gt;metallb -->
<!-- router&#45;&gt;coredns -->
<g id="edge15" class="edge">
<title>router&#45;&gt;coredns</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1879.35,-650.72C1906.8,-662.86 1934.19,-680.55 1950.92,-706 1968.53,-732.78 1947.33,-820.12 1958.92,-850 1991.3,-933.45 2039.41,-929.76 2086.31,-1006 2090.9,-1013.46 2088.47,-1017.48 2094.31,-1024 2103.95,-1034.76 2114.75,-1044.84 2126.25,-1054.22"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2124.43,-1056.13 2131.94,-1058.73 2127.69,-1052.01 2124.43,-1056.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1874.02,-854.83 1874.02,-877.63 1971.82,-877.63 1971.82,-854.83 1874.02,-854.83"/>
<text xml:space="preserve" text-anchor="start" x="1877.02" y="-860.63" font-family="Arial" font-size="14.00" fill="#bbfcd3">LAN / 内部DNS</text>
</g>
<!-- router&#45;&gt;server -->
<g id="edge16" class="edge">
<title>router&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1879.68,-656.13C1905.36,-668.33 1931.63,-684.69 1950.92,-706 1957.63,-713.4 1952.71,-719.18 1958.92,-727 2004.03,-783.76 2029.91,-784.69 2094.31,-818 2117.73,-830.11 2143.43,-841.39 2168.57,-851.44"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2167.42,-853.81 2175.36,-854.12 2169.35,-848.92 2167.42,-853.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2000.55,-812.34 2000.55,-835.14 2044.69,-835.14 2044.69,-812.34 2000.55,-812.34"/>
<text xml:space="preserve" text-anchor="start" x="2003.55" y="-818.14" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI20</text>
</g>
<!-- router&#45;&gt;native -->
<g id="edge17" class="edge">
<title>router&#45;&gt;native</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1879.72,-587.48C1940.04,-561.62 2021.7,-527.08 2094.31,-498 2123.48,-486.32 2155.09,-474.09 2184.73,-462.81"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2185.37,-465.38 2191.45,-460.26 2183.51,-460.47 2185.37,-465.38"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1992.77,-553.1 1992.77,-575.9 2052.46,-575.9 2052.46,-553.1 1992.77,-553.1"/>
<text xml:space="preserve" text-anchor="start" x="1995.77" y="-558.9" font-family="Arial" font-size="14.00" fill="#c9c9c9">native IF</text>
</g>
<!-- router&#45;&gt;management -->
<g id="edge18" class="edge">
<title>router&#45;&gt;management</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1879.6,-600.51C1906.72,-588.36 1933.85,-570.85 1950.92,-546 1971.86,-515.53 1942.5,-496.32 1958.92,-463.2 1995.34,-389.78 2024.64,-381.16 2094.31,-338 2117.17,-323.84 2142.94,-311.52 2168.41,-301.06"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2169.37,-303.51 2175.35,-298.28 2167.41,-298.64 2169.37,-303.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2000.55,-463.2 2000.55,-486 2044.69,-486 2044.69,-463.2 2000.55,-463.2"/>
<text xml:space="preserve" text-anchor="start" x="2003.55" y="-469" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI10</text>
</g>
<!-- router&#45;&gt;client -->
<g id="edge19" class="edge">
<title>router&#45;&gt;client</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1879.68,-601.49C1907.15,-589.37 1934.47,-571.64 1950.92,-546 1965.38,-523.47 1947.89,-329.59 1958.92,-305.2 1992.96,-229.98 2024.29,-221.75 2094.31,-178 2117.29,-163.64 2143.25,-151.2 2168.91,-140.68"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2169.55,-143.25 2175.53,-138.02 2167.59,-138.38 2169.55,-143.25"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2000.55,-305.2 2000.55,-328 2044.69,-328 2044.69,-305.2 2000.55,-305.2"/>
<text xml:space="preserve" text-anchor="start" x="2003.55" y="-311" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI30</text>
</g>
<!-- router&#45;&gt;guest -->
<g id="edge20" class="edge">
<title>router&#45;&gt;guest</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1879.74,-645.38C1970.72,-665.19 2111.72,-695.9 2206.13,-716.46"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2205.42,-718.99 2213.31,-718.02 2206.54,-713.86 2205.42,-718.99"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1958.92,-688.71 1958.92,-711.51 2086.31,-711.51 2086.31,-688.71 1958.92,-688.71"/>
<text xml:space="preserve" text-anchor="start" x="1961.92" y="-694.51" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI31 / 他VLAN拒否</text>
</g>
<!-- router&#45;&gt;iot -->
<g id="edge21" class="edge">
<title>router&#45;&gt;iot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1879.74,-617.69C1959.19,-610.28 2076.77,-599.3 2168.18,-590.77"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2168.39,-593.39 2175.61,-590.08 2167.9,-588.16 2168.39,-593.39"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2000.55,-609.1 2000.55,-631.9 2044.69,-631.9 2044.69,-609.1 2000.55,-609.1"/>
<text xml:space="preserve" text-anchor="start" x="2003.55" y="-614.9" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI40</text>
</g>
<!-- cloudflared&#45;&gt;tunnel -->
<g id="edge3" class="edge">
<title>cloudflared&#45;&gt;tunnel</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M2178.29,-1467.51C2150.21,-1457.27 2120.9,-1445.57 2094.31,-1433 1872.21,-1328 1849.21,-1238.08 1620.57,-1148.2 1579.43,-1132.03 885.14,-993.25 841.91,-984 817.17,-978.71 790.49,-972.95 765.58,-967.54"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="766.24,-965 758.35,-965.98 765.12,-970.13 766.24,-965"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1455.86,-1148.2 1455.86,-1171 1563.01,-1171 1563.01,-1148.2 1455.86,-1148.2"/>
<text xml:space="preserve" text-anchor="start" x="1458.86" y="-1154" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きTunnel接続</text>
</g>
<!-- private_workers&#45;&gt;nat -->
<g id="edge8" class="edge">
<title>private_workers&#45;&gt;nat</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M771.27,-1580.69C794.38,-1574.82 818.85,-1569.25 841.91,-1565.2 907.04,-1553.76 980.02,-1546.35 1041.44,-1541.64"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1041.28,-1544.28 1048.56,-1541.11 1040.89,-1539.05 1041.28,-1544.28"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="884.68,-1565.2 884.68,-1588 968.52,-1588 968.52,-1565.2 884.68,-1565.2"/>
<text xml:space="preserve" text-anchor="start" x="887.68" y="-1571" font-family="Arial" font-size="14.00" fill="#c9c9c9">default route</text>
</g>
<!-- private_workers&#45;&gt;service_gateway -->
<g id="edge9" class="edge">
<title>private_workers&#45;&gt;service_gateway</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M771.2,-1627.9C850.87,-1640.79 961.18,-1658.63 1047.1,-1672.53"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1046.64,-1675.12 1054.47,-1673.72 1047.48,-1669.94 1046.64,-1675.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="841.91,-1664.78 841.91,-1687.58 1011.29,-1687.58 1011.29,-1664.78 841.91,-1664.78"/>
<text xml:space="preserve" text-anchor="start" x="844.91" y="-1670.58" font-family="Arial" font-size="14.00" fill="#c9c9c9">Oracle service CIDR route</text>
</g>
<!-- nat&#45;&gt;internet -->
<g id="edge13" class="edge">
<title>nat&#45;&gt;internet</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1310.14,-1534C1423.32,-1534 1585.9,-1534 1689.41,-1534"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1689.34,-1536.63 1696.84,-1534 1689.34,-1531.38 1689.34,-1536.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1443.41,-1534 1443.41,-1556.8 1575.45,-1556.8 1575.45,-1534 1443.41,-1534"/>
<text xml:space="preserve" text-anchor="start" x="1446.41" y="-1539.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">NAT / reserved IPv4</text>
</g>
<!-- service_gateway&#45;&gt;oracle -->
<g id="edge14" class="edge">
<title>service_gateway&#45;&gt;oracle</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1303.89,-1694C1407.07,-1694 1554.45,-1694 1659.59,-1694"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1659.42,-1696.63 1666.92,-1694 1659.42,-1691.38 1659.42,-1696.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1429.41,-1694 1429.41,-1716.8 1589.45,-1716.8 1589.45,-1694 1429.41,-1694"/>
<text xml:space="preserve" text-anchor="start" x="1432.41" y="-1699.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">Oracle Services Network</text>
</g>
<!-- igw&#45;&gt;public_api -->
<g id="edge23" class="edge">
<title>igw&#45;&gt;public_api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M755.54,-1854C844.13,-1854 980.26,-1854 1074.32,-1854"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1074.19,-1856.63 1081.69,-1854 1074.19,-1851.38 1074.19,-1856.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="870.29,-1854 870.29,-1876.8 982.91,-1876.8 982.91,-1854 870.29,-1854"/>
<text xml:space="preserve" text-anchor="start" x="873.29" y="-1859.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">public route table</text>
</g>
<!-- workers&#45;&gt;private_workers -->
<g id="edge4" class="edge">
<title>workers&#45;&gt;private_workers</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M265.76,-1611C349.17,-1611 464.46,-1611 549.67,-1611"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="549.64,-1613.63 557.14,-1611 549.64,-1608.38 549.64,-1613.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="305.94,-1611 305.94,-1633.8 481.61,-1633.8 481.61,-1611 305.94,-1611"/>
<text xml:space="preserve" text-anchor="start" x="308.94" y="-1616.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">private subnet / 10.0.2.0/24</text>
</g>
<!-- access&#45;&gt;routes -->
<g id="edge5" class="edge">
<title>access&#45;&gt;routes</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M755.54,-813.69C834.54,-838.33 951.34,-874.75 1042.39,-903.15"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1041.41,-905.59 1049.35,-905.32 1042.97,-900.58 1041.41,-905.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="881.2,-889.68 881.2,-912.48 972,-912.48 972,-889.68 881.2,-889.68"/>
<text xml:space="preserve" text-anchor="start" x="884.2" y="-895.48" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access policy</text>
</g>
<!-- tunnel&#45;&gt;routes -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;routes</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M755.54,-946C834.38,-946 950.86,-946 1041.84,-946"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1041.71,-948.63 1049.21,-946 1041.71,-943.38 1041.71,-948.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="881.19,-946 881.19,-968.8 972.01,-968.8 972.01,-946 881.19,-946"/>
<text xml:space="preserve" text-anchor="start" x="884.19" y="-951.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">hostname転送</text>
</g>
<!-- warp&#45;&gt;server -->
<g id="edge7" class="edge">
<title>warp&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M777.07,-1155.89C798.2,-1163.4 820.43,-1169.98 841.91,-1174 1328.43,-1265.13 1488.91,-1249.59 1950.92,-1072 2039.5,-1037.95 2135.9,-989.8 2205.73,-952.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2206.91,-955.13 2212.29,-949.29 2204.44,-950.49 2206.91,-955.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1398.29,-1223.77 1398.29,-1246.57 1620.57,-1246.57 1620.57,-1223.77 1398.29,-1223.77"/>
<text xml:space="preserve" text-anchor="start" x="1401.29" y="-1229.57" font-family="Arial" font-size="14.00" fill="#c9c9c9">private CIDR routes / WARP policy</text>
</g>
<!-- routes&#45;&gt;router -->
<g id="edge10" class="edge">
<title>routes&#45;&gt;router</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1272.93,-896.02C1362.92,-846.91 1504.66,-770.21 1628.57,-706 1648.56,-695.64 1670.05,-684.75 1690.6,-674.44"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1691.73,-676.81 1697.26,-671.11 1689.38,-672.12 1691.73,-676.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1459.76,-822.79 1459.76,-845.59 1559.11,-845.59 1559.11,-822.79 1459.76,-822.79"/>
<text xml:space="preserve" text-anchor="start" x="1462.76" y="-828.59" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- routes&#45;&gt;wifi -->
<g id="edge11" class="edge">
<title>routes&#45;&gt;wifi</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1212.86,-896C1251.08,-837.46 1320.51,-740.12 1398.29,-674.2 1487.65,-598.46 1524.98,-600.67 1628.57,-546 1648.48,-535.49 1669.94,-524.53 1690.48,-514.21"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1691.61,-516.58 1697.14,-510.87 1689.26,-511.89 1691.61,-516.58"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1459.76,-674.2 1459.76,-697 1559.11,-697 1559.11,-674.2 1459.76,-674.2"/>
<text xml:space="preserve" text-anchor="start" x="1462.76" y="-680" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- routes&#45;&gt;unifi -->
<g id="edge12" class="edge">
<title>routes&#45;&gt;unifi</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1309.4,-946C1422.69,-946 1585.9,-946 1689.63,-946"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1689.57,-948.63 1697.07,-946 1689.57,-943.38 1689.57,-948.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1459.76,-946 1459.76,-968.8 1559.11,-968.8 1559.11,-946 1459.76,-946"/>
<text xml:space="preserve" text-anchor="start" x="1462.76" y="-951.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- internet&#45;&gt;igw -->
<g id="edge22" class="edge">
<title>internet&#45;&gt;igw</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1699.96,-1501.37C1560.6,-1454.69 1282.54,-1379.85 1051.29,-1431.2 951.02,-1453.46 907.13,-1449.65 841.91,-1529 794.82,-1586.29 835.31,-1624.78 801.91,-1691 782.46,-1729.57 752.39,-1767.07 725.55,-1796.36"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="723.69,-1794.51 720.5,-1801.79 727.53,-1798.08 723.69,-1794.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1117.1,-1431.2 1117.1,-1454 1244.48,-1454 1244.48,-1431.2 1117.1,-1431.2"/>
<text xml:space="preserve" text-anchor="start" x="1120.1" y="-1437" font-family="Arial" font-size="14.00" fill="#c9c9c9">公開API・LBへの到達</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge1" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M246.82,-786C335.93,-786 472.87,-786 565.5,-786"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="565.48,-788.63 572.98,-786 565.48,-783.38 565.48,-788.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="367.44,-786 367.44,-808.8 420.11,-808.8 420.11,-786 367.44,-786"/>
<text xml:space="preserve" text-anchor="start" x="370.44" y="-791.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">管理認証</text>
</g>
</g>
</svg>
`;case`storage`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2161pt" height="1329pt"
 viewBox="0.00 0.00 2161.00 1329.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1314.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-770 8,-1291 289.16,-1291 289.16,-770 8,-770"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1278.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_data</title>
<polygon fill="#3f3f3f" stroke="#2d2d2d" points="472.97,-47 472.97,-829 1861.54,-829 1861.54,-47 472.97,-47"/>
<text xml:space="preserve" text-anchor="start" x="480.97" y="-816.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_nas</title>
<polygon fill="#5a3620" stroke="#462a17" points="989.37,-407 989.37,-768 1261.65,-768 1261.65,-407 989.37,-407"/>
<text xml:space="preserve" text-anchor="start" x="997.37" y="-755.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">TRUENAS / NFS</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_databases</title>
<polygon fill="#3e4651" stroke="#2d333d" points="512.97,-387 512.97,-748 829.73,-748 829.73,-387 512.97,-387"/>
<text xml:space="preserve" text-anchor="start" x="520.97" y="-735.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">DB / アプリ共有基盤</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_backups</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1444.74,-87 1444.74,-768 1821.54,-768 1821.54,-87 1444.74,-87"/>
<text xml:space="preserve" text-anchor="start" x="1452.74" y="-755.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">バックアップ処理</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="18.58,-8 18.58,-369 278.58,-369 278.58,-8 18.58,-8"/>
<text xml:space="preserve" text-anchor="start" x="26.58" y="-356.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1878.54,-9 1878.54,-194 2122.54,-194 2122.54,-9 1878.54,-9"/>
<text xml:space="preserve" text-anchor="start" x="1886.54" y="-181.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス</text>
</g>
<!-- recording -->
<g id="node1" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="238.58,-1070 58.58,-1070 58.58,-970 238.58,-970 238.58,-1070"/>
<text xml:space="preserve" text-anchor="start" x="106.9" y="-1012" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信</text>
</g>
<!-- nextcloud -->
<g id="node2" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="238.58,-910 58.58,-910 58.58,-810 238.58,-810 238.58,-910"/>
<text xml:space="preserve" text-anchor="start" x="104.11" y="-852" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- local_store -->
<g id="node3" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M249.16,-1220.91C249.16,-1225.93 204.08,-1230 148.58,-1230 93.08,-1230 48,-1225.93 48,-1220.91 48,-1220.91 48,-1139.09 48,-1139.09 48,-1134.07 93.08,-1130 148.58,-1130 204.08,-1130 249.16,-1134.07 249.16,-1139.09 249.16,-1139.09 249.16,-1220.91 249.16,-1220.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M249.16,-1220.91C249.16,-1215.9 204.08,-1211.82 148.58,-1211.82 93.08,-1211.82 48,-1215.9 48,-1220.91"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-1172" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- nas01 -->
<g id="node4" class="node">
<title>nas01</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1221.65,-537.91C1221.65,-542.93 1178.56,-547 1125.51,-547 1072.46,-547 1029.37,-542.93 1029.37,-537.91 1029.37,-537.91 1029.37,-456.09 1029.37,-456.09 1029.37,-451.07 1072.46,-447 1125.51,-447 1178.56,-447 1221.65,-451.07 1221.65,-456.09 1221.65,-456.09 1221.65,-537.91 1221.65,-537.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1221.65,-537.91C1221.65,-532.9 1178.56,-528.82 1125.51,-528.82 1072.46,-528.82 1029.37,-532.9 1029.37,-537.91"/>
<text xml:space="preserve" text-anchor="start" x="1039.38" y="-489" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;01 / ZFS・NFS</text>
</g>
<!-- nas02 -->
<g id="node5" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1221.65,-697.91C1221.65,-702.93 1178.56,-707 1125.51,-707 1072.46,-707 1029.37,-702.93 1029.37,-697.91 1029.37,-697.91 1029.37,-616.09 1029.37,-616.09 1029.37,-611.07 1072.46,-607 1125.51,-607 1178.56,-607 1221.65,-611.07 1221.65,-616.09 1221.65,-616.09 1221.65,-697.91 1221.65,-697.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1221.65,-697.91C1221.65,-692.9 1178.56,-688.82 1125.51,-688.82 1072.46,-688.82 1029.37,-692.9 1029.37,-697.91"/>
<text xml:space="preserve" text-anchor="start" x="1039.38" y="-649" font-family="Arial" font-size="20.00" fill="#ffe0c2">nas&#45;02 / ZFS・NFS</text>
</g>
<!-- mariadb -->
<g id="node6" class="node">
<title>mariadb</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M761.35,-517.91C761.35,-522.93 721.01,-527 671.35,-527 621.69,-527 581.35,-522.93 581.35,-517.91 581.35,-517.91 581.35,-436.09 581.35,-436.09 581.35,-431.07 621.69,-427 671.35,-427 721.01,-427 761.35,-431.07 761.35,-436.09 761.35,-436.09 761.35,-517.91 761.35,-517.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M761.35,-517.91C761.35,-512.9 721.01,-508.82 671.35,-508.82 621.69,-508.82 581.35,-512.9 581.35,-517.91"/>
<text xml:space="preserve" text-anchor="start" x="632.45" y="-469" font-family="Arial" font-size="20.00" fill="#ffe0c2">MariaDB</text>
</g>
<!-- postgres -->
<g id="node7" class="node">
<title>postgres</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M789.73,-677.91C789.73,-682.93 736.67,-687 671.35,-687 606.03,-687 552.97,-682.93 552.97,-677.91 552.97,-677.91 552.97,-596.09 552.97,-596.09 552.97,-591.07 606.03,-587 671.35,-587 736.67,-587 789.73,-591.07 789.73,-596.09 789.73,-596.09 789.73,-677.91 789.73,-677.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M789.73,-677.91C789.73,-672.9 736.67,-668.82 671.35,-668.82 606.03,-668.82 552.97,-672.9 552.97,-677.91"/>
<text xml:space="preserve" text-anchor="start" x="562.98" y="-629" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL / 本番・STG</text>
</g>
<!-- db -->
<g id="node8" class="node">
<title>db</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1781.54,-227 1484.74,-227 1484.74,-127 1781.54,-127 1781.54,-227"/>
<text xml:space="preserve" text-anchor="start" x="1494.75" y="-169" font-family="Arial" font-size="20.00" fill="#f8fafc">MariaDB・PostgreSQL / logical</text>
</g>
<!-- recordings -->
<g id="node9" class="node">
<title>recordings</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1731.51,-547 1534.77,-547 1534.77,-447 1731.51,-447 1731.51,-547"/>
<text xml:space="preserve" text-anchor="start" x="1544.78" y="-489" font-family="Arial" font-size="20.00" fill="#f8fafc">録画ファイル用 / 別job</text>
</g>
<!-- metrics -->
<g id="node10" class="node">
<title>metrics</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1762.07,-707 1504.21,-707 1504.21,-607 1762.07,-607 1762.07,-707"/>
<text xml:space="preserve" text-anchor="start" x="1514.21" y="-649" font-family="Arial" font-size="20.00" fill="#f8fafc">VictoriaMetrics / consistent</text>
</g>
<!-- nas -->
<g id="node11" class="node">
<title>nas</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1736.51,-387 1529.77,-387 1529.77,-287 1736.51,-287 1736.51,-387"/>
<text xml:space="preserve" text-anchor="start" x="1539.77" y="-329" font-family="Arial" font-size="20.00" fill="#f8fafc">NAS restic / CronJob</text>
</g>
<!-- shared -->
<g id="node12" class="node">
<title>shared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="803.08,-347 539.62,-347 539.62,-247 803.08,-247 803.08,-347"/>
<text xml:space="preserve" text-anchor="start" x="549.63" y="-289" font-family="Arial" font-size="20.00" fill="#f8fafc">共有PV / runner cache・状態</text>
</g>
<!-- pbs -->
<g id="node13" class="node">
<title>pbs</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M789.17,-177.91C789.17,-182.93 736.36,-187 671.35,-187 606.34,-187 553.52,-182.93 553.52,-177.91 553.52,-177.91 553.52,-96.09 553.52,-96.09 553.52,-91.07 606.34,-87 671.35,-87 736.36,-87 789.17,-91.07 789.17,-96.09 789.17,-96.09 789.17,-177.91 789.17,-177.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M789.17,-177.91C789.17,-172.9 736.36,-168.82 671.35,-168.82 606.34,-168.82 553.52,-172.9 553.52,-177.91"/>
<text xml:space="preserve" text-anchor="start" x="563.53" y="-129" font-family="Arial" font-size="20.00" fill="#ffe0c2">Proxmox Backup Server</text>
</g>
<!-- x570 -->
<g id="node14" class="node">
<title>x570</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="238.58,-148 58.58,-148 58.58,-48 238.58,-48 238.58,-148"/>
<text xml:space="preserve" text-anchor="start" x="79.11" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox / x570</text>
</g>
<!-- b550m -->
<g id="node15" class="node">
<title>b550m</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="238.58,-308 58.58,-308 58.58,-208 238.58,-208 238.58,-308"/>
<text xml:space="preserve" text-anchor="start" x="70.22" y="-250" font-family="Arial" font-size="20.00" fill="#f8fafc">Proxmox / b550m</text>
</g>
<!-- idrive -->
<g id="node16" class="node">
<title>idrive</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2090.54,-131.91C2090.54,-136.93 2050.2,-141 2000.54,-141 1950.88,-141 1910.54,-136.93 1910.54,-131.91 1910.54,-131.91 1910.54,-50.09 1910.54,-50.09 1910.54,-45.07 1950.88,-41 2000.54,-41 2050.2,-41 2090.54,-45.07 2090.54,-50.09 2090.54,-50.09 2090.54,-131.91 2090.54,-131.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2090.54,-131.91C2090.54,-126.9 2050.2,-122.82 2000.54,-122.82 1950.88,-122.82 1910.54,-126.9 1910.54,-131.91"/>
<text xml:space="preserve" text-anchor="start" x="1939.95" y="-83" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2 / S3</text>
</g>
<!-- recording&#45;&gt;nas02 -->
<g id="edge4" class="edge">
<title>recording&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M238.48,-1030.16C301.96,-1035.43 389.18,-1038.61 464.97,-1027 702.74,-990.58 787.87,-1007.88 981.37,-865 1033.28,-826.67 1072.81,-763.66 1097.05,-717.02"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1099.24,-718.49 1100.31,-710.62 1094.57,-716.1 1099.24,-718.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="580.82,-1024.65 580.82,-1047.45 761.88,-1047.45 761.88,-1024.65 580.82,-1024.65"/>
<text xml:space="preserve" text-anchor="start" x="583.82" y="-1030.45" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画・thumbnail・drop / NFS</text>
</g>
<!-- recording&#45;&gt;mariadb -->
<g id="edge1" class="edge">
<title>recording&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M238.49,-983.95C257.67,-972.47 276.09,-957.95 289.16,-940 299.27,-926.12 289.05,-917.34 297.16,-902.2 347.49,-808.29 422.44,-828.69 464.97,-731 472.7,-713.26 461.79,-572.8 472.97,-557 495.81,-524.72 534.02,-505.45 570.76,-493.95"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="571.21,-496.56 577.66,-491.91 569.72,-491.52 571.21,-496.56"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="329.82,-902.2 329.82,-925 432.31,-925 432.31,-902.2 329.82,-902.2"/>
<text xml:space="preserve" text-anchor="start" x="332.82" y="-908" font-family="Arial" font-size="14.00" fill="#bbfcd3">EPGStation DB</text>
</g>
<!-- recording&#45;&gt;postgres -->
<g id="edge2" class="edge">
<title>recording&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M238.4,-1002.29C326.08,-984 449.3,-955.84 464.97,-939 478.52,-924.45 464.93,-913.18 472.97,-895 506.65,-818.87 567.1,-744.76 612.27,-695.65"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="614.14,-697.49 617.32,-690.21 610.29,-693.92 614.14,-697.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="367.57,-989.43 367.57,-1012.23 394.56,-1012.23 394.56,-989.43 367.57,-989.43"/>
<text xml:space="preserve" text-anchor="start" x="370.57" y="-997.63" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- recording&#45;&gt;recordings -->
<g id="edge3" class="edge">
<title>recording&#45;&gt;recordings</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M238.57,-1060.39C257.54,-1067.28 277.72,-1073.38 297.16,-1077 398.96,-1095.98 772.33,-1080.22 829.73,-1062 1047.55,-992.87 1088.17,-931.77 1261.65,-783 1354.64,-703.26 1345.32,-648.55 1444.74,-577 1469.01,-559.53 1497.69,-544.88 1525.21,-533.08"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1526.19,-535.52 1532.1,-530.2 1524.17,-530.67 1526.19,-535.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="853.21,-1057.23 853.21,-1080.03 971.24,-1080.03 971.24,-1057.23 853.21,-1057.23"/>
<text xml:space="preserve" text-anchor="start" x="856.21" y="-1063.03" font-family="Arial" font-size="14.00" fill="#ffe0c2">録画ファイル専用job</text>
</g>
<!-- nextcloud&#45;&gt;nas01 -->
<g id="edge5" class="edge">
<title>nextcloud&#45;&gt;nas01</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M238.28,-855.09C398.67,-844.95 729.59,-817.91 829.73,-763 922.26,-712.26 907.01,-650.98 981.84,-583.54"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="983.15,-585.89 987.09,-578.99 979.7,-581.92 983.15,-585.89"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="629.37,-792.65 629.37,-815.45 703.82,-815.45 703.82,-792.65 629.37,-792.65"/>
<text xml:space="preserve" text-anchor="start" x="632.37" y="-798.45" font-family="Arial" font-size="14.00" fill="#bbfcd3">NFS / PVC</text>
</g>
<!-- nextcloud&#45;&gt;mariadb -->
<g id="edge6" class="edge">
<title>nextcloud&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M191.9,-810.26C249.76,-744.82 359.38,-629.64 472.97,-557 503.02,-537.78 538.46,-521.69 570.95,-509.09"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="571.57,-511.66 577.65,-506.54 569.7,-506.76 571.57,-511.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="297.16,-693.47 297.16,-716.27 464.97,-716.27 464.97,-693.47 297.16,-693.47"/>
<text xml:space="preserve" text-anchor="start" x="300.16" y="-699.27" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- local_store&#45;&gt;nas01 -->
<g id="edge7" class="edge">
<title>local_store&#45;&gt;nas01</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M249.79,-1157.66C321.16,-1136.35 413.27,-1096.82 464.97,-1027 478.63,-1008.56 458.42,-993.74 472.97,-976 580.13,-845.43 684.02,-930.43 829.73,-845 906.31,-800.1 941.96,-794.55 981.37,-715 993.62,-690.27 977.42,-619.76 985.59,-586.67"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="987.98,-587.76 988.27,-579.82 983.09,-585.85 987.98,-587.76"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="499.36,-872.33 499.36,-895.13 622.82,-895.13 622.82,-872.33 499.36,-872.33"/>
<text xml:space="preserve" text-anchor="start" x="502.36" y="-878.13" font-family="Arial" font-size="14.00" fill="#bbfcd3">metrics用NFS PVC</text>
</g>
<!-- local_store&#45;&gt;metrics -->
<g id="edge8" class="edge">
<title>local_store&#45;&gt;metrics</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M249.87,-1184.72C409.58,-1188.98 729.37,-1184.06 981.37,-1095 1224.01,-1009.25 1463.02,-811.44 1571.55,-713.73"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1573.09,-715.88 1576.9,-708.9 1569.57,-711.98 1573.09,-715.88"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="843.08,-1133.7 843.08,-1156.5 981.37,-1156.5 981.37,-1133.7 843.08,-1133.7"/>
<text xml:space="preserve" text-anchor="start" x="846.08" y="-1139.5" font-family="Arial" font-size="14.00" fill="#ffe0c2">snapshot / vmbackup</text>
</g>
<!-- nas02&#45;&gt;nas -->
<g id="edge14" class="edge">
<title>nas02&#45;&gt;nas</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1261.65,-577C1349.21,-513.65 1353.23,-474.48 1444.74,-417 1468.22,-402.25 1494.89,-389.04 1520.59,-377.8"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1521.37,-380.32 1527.23,-374.94 1519.3,-375.49 1521.37,-380.32"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1263.78,-439.6 1263.78,-462.4 1384.16,-462.4 1384.16,-439.6 1263.78,-439.6"/>
<text xml:space="preserve" text-anchor="start" x="1266.78" y="-445.4" font-family="Arial" font-size="14.00" fill="#ffe0c2">対象dataset / restic</text>
</g>
<!-- postgres&#45;&gt;nas01 -->
<g id="edge11" class="edge">
<title>postgres&#45;&gt;nas01</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M829.72,-588.27C878.43,-573.19 931.84,-556.66 979.66,-541.85"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="980.1,-544.46 986.48,-539.74 978.54,-539.45 980.1,-544.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="811.4,-540.87 811.4,-563.67 909.19,-563.67 909.19,-540.87 811.4,-540.87"/>
<text xml:space="preserve" text-anchor="start" x="814.4" y="-546.67" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
<!-- postgres&#45;&gt;db -->
<g id="edge12" class="edge">
<title>postgres&#45;&gt;db</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M829.73,-557C839.78,-546.42 834.57,-538.86 843.08,-527 894.63,-455.1 913.22,-437.03 989.37,-392 1142.78,-301.28 1339.65,-242.65 1474.87,-209.89"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1475.28,-212.5 1481.96,-208.19 1474.05,-207.39 1475.28,-212.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="988.31,-298.21 988.31,-321.01 1131.26,-321.01 1131.26,-298.21 988.31,-298.21"/>
<text xml:space="preserve" text-anchor="start" x="991.31" y="-304.01" font-family="Arial" font-size="14.00" fill="#ffe0c2">整合性あるlogical dump</text>
</g>
<!-- nas&#45;&gt;idrive -->
<g id="edge15" class="edge">
<title>nas&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1821.53,-280.55C1835.54,-273.51 1849.06,-265.68 1861.54,-257 1902.12,-228.77 1937.53,-185.55 1962.31,-150.29"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1964.23,-152.12 1966.34,-144.46 1959.92,-149.14 1964.23,-152.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1904.3,-197.75 1904.3,-220.55 2092.37,-220.55 2092.37,-197.75 1904.3,-197.75"/>
<text xml:space="preserve" text-anchor="start" x="1907.3" y="-203.55" font-family="Arial" font-size="14.00" fill="#ffe0c2">用途別prefix / 暗号化・retention</text>
</g>
<!-- pbs&#45;&gt;idrive -->
<g id="edge13" class="edge">
<title>pbs&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M790.15,-120.96C1003.78,-94.02 1469.34,-45.13 1861.54,-72 1873.91,-72.85 1886.87,-74.12 1899.67,-75.61"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1899.13,-78.19 1906.89,-76.48 1899.76,-72.98 1899.13,-78.19"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1269.65,-75.35 1269.65,-98.15 1436.74,-98.15 1436.74,-75.35 1269.65,-75.35"/>
<text xml:space="preserve" text-anchor="start" x="1272.65" y="-81.15" font-family="Arial" font-size="14.00" fill="#ffe0c2">S3 datastore / VM backup</text>
</g>
<!-- x570&#45;&gt;pbs -->
<g id="edge9" class="edge">
<title>x570&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M238.51,-104.66C322.09,-110.92 448.1,-120.36 542.47,-127.42"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="542.25,-130.04 549.92,-127.98 542.64,-124.8 542.25,-130.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="343.05,-120.99 343.05,-143.79 419.08,-143.79 419.08,-120.99 343.05,-120.99"/>
<text xml:space="preserve" text-anchor="start" x="346.05" y="-126.79" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- b550m&#45;&gt;pbs -->
<g id="edge10" class="edge">
<title>b550m&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M238.51,-237.34C322.18,-217.9 448.36,-188.58 542.75,-166.65"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="543.28,-169.22 549.99,-164.96 542.09,-164.11 543.28,-169.22"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="343.05,-222.25 343.05,-245.05 419.08,-245.05 419.08,-222.25 343.05,-222.25"/>
<text xml:space="preserve" text-anchor="start" x="346.05" y="-228.05" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
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