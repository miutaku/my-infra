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
            access [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Cloudflare Access / 共通の認証入口</FONT>>,
                likec4_id="external.edge.access",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tunnel [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
                likec4_id="external.edge.tunnel",
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
            nas [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">TrueNAS VM ×2 / ZFS・NFS</FONT>>,
                likec4_id="premises.data.nas",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
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
            runner [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ARC / 共用のrunner制御基盤</FONT>>,
                likec4_id="premises.management.runner",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            argo [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
                likec4_id="premises.management.argo",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        home [height=1.389,
            label=<<FONT POINT-SIZE="20">Talos / home-k8s</FONT>>,
            likec4_id="premises.home",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
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
    {
        graph [rank=source];
        user [color="#2d5d39",
            fillcolor="#428a4f",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">利用者</FONT>>,
            likec4_id=user,
            likec4_level=0,
            margin="0.139,0.139",
            width=2.5];
        operator [color="#2d5d39",
            fillcolor="#428a4f",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">管理者</FONT>>,
            likec4_id=operator,
            likec4_level=0,
            margin="0.139,0.139",
            width=2.5];
    }
    user -> access [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS / 利用時の認証</FONT></TD></TR></TABLE>>,
        likec4_id="34i5b5",
        minlen=1,
        style=dashed];
    operator -> access [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS / 管理時の認証</FONT></TD></TR></TABLE>>,
        likec4_id="1mzdjyo",
        minlen=1,
        style=dashed];
    access -> tunnel [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後の転送</FONT></TD></TR></TABLE>>,
        likec4_id="163m3wm",
        minlen=0,
        style=solid,
        weight=5];
    bws -> home [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id=c0a5so,
        minlen=1,
        style=dotted,
        weight=2];
    tunnel -> nas [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / NAS管理UI</FONT></TD></TR></TABLE>>,
        likec4_id="1xrgwdy",
        style=dashed];
    tunnel -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id=fboz3m,
        style=dashed];
    tunnel -> home [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 公開UI・サービス</FONT></TD></TR></TABLE>>,
        likec4_id="18hfz23",
        style=dashed,
        weight=2];
    runner -> reventer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">専用runner向けの共用制御基盤</FONT></TD></TR></TABLE>>,
        likec4_id="18tpc1x",
        minlen=1,
        style=dashed];
    nas -> home [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NFSストレージを提供</FONT></TD></TR></TABLE>>,
        likec4_id="1ne3xl3",
        style=dashed,
        weight=4];
    argo -> reventer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">共用ArgoCDの同期インターフェース</FONT></TD></TR></TABLE>>,
        likec4_id=zkvij2,
        style=dashed,
        weight=2];
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
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TALOS / HOME-K8S</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.home",
            likec4_level=0,
            margin=40,
            style=filled
        ];
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
        recording [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">録画・配信</FONT>>,
            likec4_id="premises.home.recording",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        apps [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">自宅ワークロード / 基盤の利用側</FONT>>,
            likec4_id="premises.home.apps",
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
    access [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare Access / 共通の認証入口</FONT>>,
        likec4_id="external.edge.access",
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
    tunnel [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
        likec4_id="external.edge.tunnel",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    access -> tunnel [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後の転送</FONT></TD></TR></TABLE>>,
        likec4_id="163m3wm",
        style=solid,
        weight=5];
    argo [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
        likec4_id="premises.management.argo",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    tunnel -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id=fboz3m,
        minlen=1,
        style=dashed];
    tunnel -> nextcloud [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 公開UI・サービス</FONT></TD></TR></TABLE>>,
        likec4_id="19w70gz",
        style=dashed];
    tunnel -> recording [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 公開UI・サービス</FONT></TD></TR></TABLE>>,
        likec4_id=n4ibco,
        style=dashed];
    tunnel -> apps [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 公開UI・サービス</FONT></TD></TR></TABLE>>,
        likec4_id="18vop1j",
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
    tunnel -> nas [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / NAS管理UI</FONT></TD></TR></TABLE>>,
        likec4_id="1xrgwdy",
        style=dashed];
    databases [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
        likec4_id="premises.data.databases",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    nextcloud -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">MYSQL_HOST / MariaDB</FONT></TD></TR></TABLE>>,
        likec4_id=yowqnp,
        style=dashed,
        weight=3];
    nextcloud -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="115zv4v",
        style=dashed,
        weight=3];
    recording -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=rhcxgu,
        style=dashed,
        weight=3];
    recording -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画・thumbnail・drop / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="1qfucxw",
        style=dashed,
        weight=3];
    apps -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="23blch",
        style=dashed,
        weight=3];
    apps -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">images・Data Protection keys / PVC</FONT></TD></TR></TABLE>>,
        likec4_id="1vyudkr",
        style=dashed,
        weight=3];
    databases -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id=mpfl5s,
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
            nas [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=1.389,
                label=<<FONT POINT-SIZE="20">TrueNAS VM ×2 / ZFS・NFS</FONT>>,
                likec4_id="premises.data.nas",
                likec4_level=2,
                margin="0.139,0",
                penwidth=2,
                shape=cylinder,
                width=2.5];
        }
        subgraph cluster_management {
            graph [color="#462a17",
                fillcolor="#5a3620",
                label=<<FONT POINT-SIZE="11" COLOR="#f9b27cb3"><B>自宅基盤の構成管理</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.management",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            argo [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
                likec4_id="premises.management.argo",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
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
        weight=5];
    tunnel -> exceptions [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">hostname転送</FONT></TD></TR></TABLE>>,
        likec4_id=vlxw4i,
        style=dashed,
        weight=4];
    tunnel -> reventer [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">hostname転送</FONT></TD></TR></TABLE>>,
        likec4_id="1yznw3a",
        minlen=1,
        style=dashed];
    protected -> home [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">内部接続</FONT></TD></TR></TABLE>>,
        likec4_id=dz3dzx,
        style=dashed,
        weight=2];
    protected -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id=chxxak,
        minlen=1,
        style=dashed,
        weight=2];
    protected -> nas [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id=zj2f9s,
        minlen=1,
        style=dashed];
    protected -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="1uffcic",
        minlen=1,
        style=dashed];
    exceptions -> home [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="9xfbdf",
        style=dashed];
    home -> tunnel [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きTunnel接続</FONT></TD></TR></TABLE>>,
        likec4_id="1q2lymz",
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
            images [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Image Updater</FONT>>,
                likec4_id="premises.management.images",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
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
            argo [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
                likec4_id="premises.management.argo",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            runner [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ARC / 共用のrunner制御基盤</FONT>>,
                likec4_id="premises.management.runner",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            tfc_agents [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">Terraform Cloud agents / 自宅</FONT>>,
                likec4_id="premises.management.tfc_agents",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        home [group=premises,
            height=1.389,
            label=<<FONT POINT-SIZE="20">Talos / home-k8s</FONT>>,
            likec4_id="premises.home",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        hardware [group=premises,
            height=1.389,
            label=<<FONT POINT-SIZE="20">物理・ネットワーク</FONT>>,
            likec4_id="premises.hardware",
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
        weight=4];
    github -> github_pages [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">構成図・PR比較を公開</FONT></TD></TR></TABLE>>,
        likec4_id="149xiol",
        minlen=1,
        style=dashed,
        weight=4];
    github -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GitOps</FONT></TD></TR></TABLE>>,
        likec4_id="2xc9te",
        style=dashed];
    github -> runner [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Actions job</FONT></TD></TR></TABLE>>,
        likec4_id="32jtnd",
        minlen=1,
        style=dashed];
    terraform_cloud -> "edge" [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DNS / Access / Tunnel</FONT></TD></TR></TABLE>>,
        likec4_id=y0ry4h,
        minlen=1,
        style=dashed,
        weight=4];
    terraform_cloud -> tfc_agents [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">workspace runを自宅agentで実行</FONT></TD></TR></TABLE>>,
        likec4_id="19b8igw",
        style=dashed];
    ansible -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器設定</FONT></TD></TR></TABLE>>,
        likec4_id=cpv5vb,
        minlen=1,
        style=dashed];
    packer -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM template</FONT></TD></TR></TABLE>>,
        likec4_id="1xk3yrr",
        minlen=1,
        style=dashed];
    argo -> home [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">manifest同期</FONT></TD></TR></TABLE>>,
        likec4_id="4jorwj",
        minlen=1,
        style=dashed,
        weight=3];
    tfc_agents -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM / ネットワーク</FONT></TD></TR></TABLE>>,
        likec4_id=mixl1p,
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
            likec4_id="premises.data.backups",
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
            margin=32,
            style=filled
        ];
        warp [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">WARP / private CIDR routes</FONT>>,
            likec4_id="external.edge.warp",
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
            {
                graph [rank=same];
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
            router [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">IX2215 / VLAN</FONT>>,
                likec4_id="premises.hardware.router",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            lb [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">HAProxy / Keepalived ×2</FONT>>,
                likec4_id="premises.hardware.lb",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            wifi -> lb [style=invis];
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
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN20 / 192.168.20.0/24</FONT>>,
                likec4_id="premises.lan.server",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            native [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">native / 192.168.0.0/24</FONT>>,
                likec4_id="premises.lan.native",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            management [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN10 / 192.168.10.0/24</FONT>>,
                likec4_id="premises.lan.management",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            client [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN30 / 192.168.30.0/24</FONT>>,
                likec4_id="premises.lan.client",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            guest [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN31 / guest</FONT>>,
                likec4_id="premises.lan.guest",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            iot [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group=premises,
                height=1.389,
                label=<<FONT POINT-SIZE="20">VLAN40 / 192.168.40.0/24</FONT>>,
                likec4_id="premises.lan.iot",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_dns {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>内部DNS / METALLB</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home.dns",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            coredns [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">CoreDNS / miutaku.internal</FONT>>,
                likec4_id="premises.home.dns.coredns",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            metallb [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">MetalLB / LANのService IP</FONT>>,
                likec4_id="premises.home.dns.metallb",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
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
    operator -> unifi [style=invis];
    warp -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private CIDR routes / WARP policy</FONT></TD></TR></TABLE>>,
        likec4_id="1nzidds",
        minlen=1,
        style=dotted];
    router -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI20</FONT></TD></TR></TABLE>>,
        likec4_id=vatnfd,
        style=dotted,
        weight=3];
    router -> native [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native IF</FONT></TD></TR></TABLE>>,
        likec4_id=yoavq5,
        minlen=1,
        style=dotted];
    router -> management [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI10</FONT></TD></TR></TABLE>>,
        likec4_id=nbp3vz,
        minlen=1,
        style=dotted];
    router -> client [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI30</FONT></TD></TR></TABLE>>,
        likec4_id="15mlzb9",
        minlen=1,
        style=dotted];
    router -> guest [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI31 / 他VLAN拒否</FONT></TD></TR></TABLE>>,
        likec4_id=xgr9m4,
        minlen=1,
        style=dotted];
    router -> iot [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI40</FONT></TD></TR></TABLE>>,
        likec4_id="10y59se",
        minlen=1,
        style=dotted];
    unifi -> coredns [style=invis];
    coredns -> metallb [style=invis];
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
<svg width="2215pt" height="1019pt"
 viewBox="0.00 0.00 2215.00 1019.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1003.48)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1322,-242.01 1322,-807.62 2177,-807.62 2177,-242.01 1322,-242.01"/>
<text xml:space="preserve" text-anchor="start" x="1330" y="-794.72" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_edge</title>
<polygon fill="#5a3620" stroke="#462a17" points="1362,-545.22 1362,-746.42 2137,-746.42 2137,-545.22 1362,-545.22"/>
<text xml:space="preserve" text-anchor="start" x="1370" y="-733.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="260,-8 260,-504.42 1314,-504.42 1314,-8 260,-8"/>
<text xml:space="preserve" text-anchor="start" x="268" y="-491.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="934,-250.01 934,-435.22 1274,-435.22 1274,-250.01 934,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="942" y="-422.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_management</title>
<polygon fill="#5a3620" stroke="#462a17" points="300,-242.01 300,-443.22 894,-443.22 894,-242.01 300,-242.01"/>
<text xml:space="preserve" text-anchor="start" x="308" y="-430.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">自宅基盤の構成管理</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="8,-16 8,-201.21 252,-201.21 252,-16 8,-16"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-188.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<!-- access -->
<g id="node1" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1716.28,-685.22 1401.72,-685.22 1401.72,-585.22 1716.28,-585.22 1716.28,-685.22"/>
<text xml:space="preserve" text-anchor="start" x="1411.73" y="-627.22" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- tunnel -->
<g id="node2" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2097,-685.22 1917,-685.22 1917,-585.22 2097,-585.22 2097,-685.22"/>
<text xml:space="preserve" text-anchor="start" x="1928.06" y="-627.22" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- bws -->
<g id="node3" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1628.4,-382.02 1361.6,-382.02 1361.6,-282.01 1628.4,-282.01 1628.4,-382.02"/>
<text xml:space="preserve" text-anchor="start" x="1371.61" y="-324.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- nas -->
<g id="node4" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1242.36,-372.92C1242.36,-377.94 1180.35,-382.02 1104,-382.02 1027.65,-382.02 965.64,-377.94 965.64,-372.92 965.64,-372.92 965.64,-291.1 965.64,-291.1 965.64,-286.08 1027.65,-282.01 1104,-282.01 1180.35,-282.01 1242.36,-286.08 1242.36,-291.1 1242.36,-291.1 1242.36,-372.92 1242.36,-372.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1242.36,-372.92C1242.36,-367.91 1180.35,-363.83 1104,-363.83 1027.65,-363.83 965.64,-367.91 965.64,-372.92"/>
<text xml:space="preserve" text-anchor="start" x="975.65" y="-324.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- runner -->
<g id="node5" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="593.71,-382.02 340.29,-382.02 340.29,-282.01 593.71,-282.01 593.71,-382.02"/>
<text xml:space="preserve" text-anchor="start" x="350.3" y="-324.01" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 共用のrunner制御基盤</text>
</g>
<!-- argo -->
<g id="node6" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="854,-382.02 674,-382.02 674,-282.01 854,-282.01 854,-382.02"/>
<text xml:space="preserve" text-anchor="start" x="711.76" y="-324.01" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- home -->
<g id="node7" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1254,-148.01 1074,-148.01 1074,-48 1254,-48 1254,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1087.31" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- reventer -->
<g id="node8" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="220,-148.01 40,-148.01 40,-48 220,-48 220,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="84.98" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- user -->
<g id="node9" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="1519,-988.43 1339,-988.43 1339,-888.42 1519,-888.42 1519,-988.43"/>
<text xml:space="preserve" text-anchor="start" x="1404" y="-930.43" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- operator -->
<g id="node10" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="1779,-988.43 1599,-988.43 1599,-888.42 1779,-888.42 1779,-988.43"/>
<text xml:space="preserve" text-anchor="start" x="1664" y="-930.43" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge3" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M1716,-635.22C1779.4,-635.22 1850.68,-635.22 1906.83,-635.22"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1906.61,-637.85 1914.11,-635.22 1906.61,-632.6 1906.61,-637.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1756.07,-638.22 1756.07,-661.02 1877.21,-661.02 1877.21,-638.22 1756.07,-638.22"/>
<text xml:space="preserve" text-anchor="start" x="1759.07" y="-644.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- tunnel&#45;&gt;nas -->
<g id="edge5" class="edge">
<title>tunnel&#45;&gt;nas</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1917.1,-596.15C1869.96,-577.78 1810.77,-557.19 1756,-545.22 1657.04,-523.59 1395.24,-544.01 1302,-504.42 1242.95,-479.34 1188.85,-429.84 1152.17,-390.45"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1154.13,-388.7 1147.12,-384.95 1150.26,-392.25 1154.13,-388.7"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1651.61,-512.42 1651.61,-535.22 1815.54,-535.22 1815.54,-512.42 1651.61,-512.42"/>
<text xml:space="preserve" text-anchor="start" x="1654.61" y="-518.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後 / NAS管理UI</text>
</g>
<!-- tunnel&#45;&gt;argo -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1917.14,-594.38C1870.14,-575.6 1811.05,-555.17 1756,-545.22 1692.12,-533.66 1236.63,-539.63 1171.86,-535.22 1056.71,-527.37 1016.09,-558.27 914,-504.42 864.9,-478.52 824.54,-429.48 798.11,-390.47"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="800.36,-389.12 794.02,-384.32 795.99,-392.02 800.36,-389.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1171.86,-512.42 1171.86,-535.22 1307,-535.22 1307,-512.42 1171.86,-512.42"/>
<text xml:space="preserve" text-anchor="start" x="1174.86" y="-518.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後 / 管理UI</text>
</g>
<!-- tunnel&#45;&gt;home -->
<g id="edge7" class="edge">
<title>tunnel&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1997.25,-585.54C1977.78,-501.66 1925.91,-330.39 1813,-242.01 1728.55,-175.9 1424.46,-130.39 1264.3,-110.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1264.73,-107.83 1256.96,-109.52 1264.08,-113.04 1264.73,-107.83"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1973.04,-320.61 1973.04,-343.41 2166.53,-343.41 2166.53,-320.61 1973.04,-320.61"/>
<text xml:space="preserve" text-anchor="start" x="1976.04" y="-326.41" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- bws&#45;&gt;home -->
<g id="edge4" class="edge">
<title>bws&#45;&gt;home</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1425.21,-282.09C1371.63,-244.54 1297.65,-192.68 1242.1,-153.75"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1243.82,-151.75 1236.18,-149.59 1240.81,-156.05 1243.82,-151.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1349.32,-209.21 1349.32,-232.01 1419.12,-232.01 1419.12,-209.21 1349.32,-209.21"/>
<text xml:space="preserve" text-anchor="start" x="1352.32" y="-215.01" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- nas&#45;&gt;home -->
<g id="edge9" class="edge">
<title>nas&#45;&gt;home</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1116.87,-281.24C1126.23,-245.06 1138.93,-195.96 1148.79,-157.84"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1151.26,-158.75 1150.6,-150.83 1146.18,-157.43 1151.26,-158.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1134,-209.21 1134,-232.01 1261.35,-232.01 1261.35,-209.21 1134,-209.21"/>
<text xml:space="preserve" text-anchor="start" x="1137" y="-215.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">NFSストレージを提供</text>
</g>
<!-- runner&#45;&gt;reventer -->
<g id="edge8" class="edge">
<title>runner&#45;&gt;reventer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M370.37,-282.14C328.88,-259.56 280.69,-231.13 240,-201.21 221.24,-187.41 202.18,-170.8 185.32,-155.02"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="187.18,-153.17 179.93,-149.92 183.57,-156.98 187.18,-153.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="281.19,-209.21 281.19,-232.01 456.01,-232.01 456.01,-209.21 281.19,-209.21"/>
<text xml:space="preserve" text-anchor="start" x="284.19" y="-215.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">専用runner向けの共用制御基盤</text>
</g>
<!-- argo&#45;&gt;reventer -->
<g id="edge10" class="edge">
<title>argo&#45;&gt;reventer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M703.44,-282.22C682.48,-267.38 658.16,-252.29 634,-242.01 568.01,-213.91 547.21,-217.74 476,-209.21 449.95,-206.09 264.25,-211.21 240,-201.21 215.75,-191.2 193.56,-173.27 175.57,-155.19"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="177.83,-153.75 170.73,-150.17 174.05,-157.39 177.83,-153.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="608.68,-209.21 608.68,-232.01 816.17,-232.01 816.17,-209.21 608.68,-209.21"/>
<text xml:space="preserve" text-anchor="start" x="611.68" y="-215.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">共用ArgoCDの同期インターフェース</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1436.01,-888.7C1440.16,-866.01 1446.42,-838.94 1455.43,-815.62 1472.03,-772.63 1497.96,-727.73 1519.73,-693.6"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1521.67,-695.44 1523.52,-687.71 1517.25,-692.59 1521.67,-695.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1455.43,-815.62 1455.43,-838.42 1589,-838.42 1589,-815.62 1455.43,-815.62"/>
<text xml:space="preserve" text-anchor="start" x="1458.43" y="-821.42" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1667.97,-888.7C1645.08,-835.66 1608.48,-750.88 1584.1,-694.39"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1586.58,-693.5 1581.2,-687.66 1581.76,-695.58 1586.58,-693.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1643.24,-815.62 1643.24,-838.42 1776.81,-838.42 1776.81,-815.62 1643.24,-815.62"/>
<text xml:space="preserve" text-anchor="start" x="1646.24" y="-821.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
</g>
</svg>
`;case`home_apps`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2614pt" height="931pt"
 viewBox="0.00 0.00 2614.00 931.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 916.12)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1330.75,-212.07 1330.75,-893.07 1680.81,-893.07 1680.81,-212.07 1330.75,-212.07"/>
<text xml:space="preserve" text-anchor="start" x="1338.75" y="-880.17" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<!-- dns -->
<g id="node1" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1598.59,-352.07 1412.97,-352.07 1412.97,-252.06 1598.59,-252.06 1598.59,-352.07"/>
<text xml:space="preserve" text-anchor="start" x="1422.98" y="-294.07" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- nextcloud -->
<g id="node2" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1595.78,-832.07 1415.78,-832.07 1415.78,-732.06 1595.78,-732.06 1595.78,-832.07"/>
<text xml:space="preserve" text-anchor="start" x="1461.31" y="-774.07" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node3" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1595.78,-672.07 1415.78,-672.07 1415.78,-572.06 1595.78,-572.06 1595.78,-672.07"/>
<text xml:space="preserve" text-anchor="start" x="1464.11" y="-614.07" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信</text>
</g>
<!-- apps -->
<g id="node4" class="node">
<title>apps</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1640.81,-512.07 1370.75,-512.07 1370.75,-412.06 1640.81,-412.06 1640.81,-512.07"/>
<text xml:space="preserve" text-anchor="start" x="1380.76" y="-454.07" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ワークロード / 基盤の利用側</text>
</g>
<!-- user -->
<g id="node5" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-592.07 0,-592.07 0,-492.06 180,-492.06 180,-592.07"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-534.07" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- access -->
<g id="node6" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="708.13,-512.07 393.57,-512.07 393.57,-412.06 708.13,-412.06 708.13,-512.07"/>
<text xml:space="preserve" text-anchor="start" x="403.58" y="-454.07" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- operator -->
<g id="node7" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-432.07 0,-432.07 0,-332.06 180,-332.06 180,-432.07"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-374.07" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- tunnel -->
<g id="node8" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1089.27,-512.07 909.27,-512.07 909.27,-412.06 1089.27,-412.06 1089.27,-512.07"/>
<text xml:space="preserve" text-anchor="start" x="920.33" y="-454.07" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- argo -->
<g id="node9" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1595.78,-172.07 1415.78,-172.07 1415.78,-72.06 1595.78,-72.06 1595.78,-172.07"/>
<text xml:space="preserve" text-anchor="start" x="1453.55" y="-114.07" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- nas -->
<g id="node10" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2583.57,-694.98C2583.57,-700 2521.56,-704.07 2445.21,-704.07 2368.86,-704.07 2306.85,-700 2306.85,-694.98 2306.85,-694.98 2306.85,-613.16 2306.85,-613.16 2306.85,-608.14 2368.86,-604.06 2445.21,-604.06 2521.56,-604.06 2583.57,-608.14 2583.57,-613.16 2583.57,-613.16 2583.57,-694.98 2583.57,-694.98"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2583.57,-694.98C2583.57,-689.96 2521.56,-685.89 2445.21,-685.89 2368.86,-685.89 2306.85,-689.96 2306.85,-694.98"/>
<text xml:space="preserve" text-anchor="start" x="2316.86" y="-646.07" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- databases -->
<g id="node11" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2103.42,-704.07 1922.26,-704.07 1922.26,-604.06 2103.42,-604.06 2103.42,-704.07"/>
<text xml:space="preserve" text-anchor="start" x="1932.27" y="-646.07" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- nextcloud&#45;&gt;nas -->
<g id="edge10" class="edge">
<title>nextcloud&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1595.72,-781.81C1666.51,-780.99 1768.06,-778.46 1856.63,-771.07 1978.4,-760.91 2009.1,-757.36 2129.05,-734.07 2183.98,-723.4 2243.61,-709.01 2296.08,-695.36"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2296.61,-697.94 2303.2,-693.5 2295.28,-692.86 2296.61,-697.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1957.32,-767.59 1957.32,-790.39 2068.36,-790.39 2068.36,-767.59 1957.32,-767.59"/>
<text xml:space="preserve" text-anchor="start" x="1960.32" y="-773.39" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- nextcloud&#45;&gt;databases -->
<g id="edge9" class="edge">
<title>nextcloud&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1595.62,-759.55C1684.29,-737.08 1820.26,-702.62 1912.47,-679.25"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1913.09,-681.8 1919.71,-677.42 1911.8,-676.72 1913.09,-681.8"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1688.81,-733.3 1688.81,-756.1 1856.63,-756.1 1856.63,-733.3 1688.81,-733.3"/>
<text xml:space="preserve" text-anchor="start" x="1691.81" y="-739.1" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- recording&#45;&gt;nas -->
<g id="edge12" class="edge">
<title>recording&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1595.74,-596.85C1716.81,-565.95 1940.06,-521.22 2129.05,-551.27 2192.46,-561.35 2260.44,-582.16 2316.98,-602.44"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2315.88,-604.83 2323.83,-604.92 2317.67,-599.9 2315.88,-604.83"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1922.31,-551.27 1922.31,-574.07 2103.38,-574.07 2103.38,-551.27 1922.31,-551.27"/>
<text xml:space="preserve" text-anchor="start" x="1925.31" y="-557.07" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画・thumbnail・drop / NFS</text>
</g>
<!-- recording&#45;&gt;databases -->
<g id="edge11" class="edge">
<title>recording&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1595.63,-625.79C1666.37,-628.97 1767.9,-634.02 1856.63,-640.27 1874.53,-641.53 1893.58,-643.06 1911.98,-644.65"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1911.71,-647.26 1919.41,-645.29 1912.16,-642.03 1911.71,-647.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1759.22,-640.27 1759.22,-663.07 1786.22,-663.07 1786.22,-640.27 1759.22,-640.27"/>
<text xml:space="preserve" text-anchor="start" x="1762.22" y="-648.47" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- apps&#45;&gt;nas -->
<g id="edge14" class="edge">
<title>apps&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1640.63,-452.38C1797.74,-446.36 2062.72,-453.23 2266.85,-545.07 2299.4,-559.71 2333.23,-579.28 2362.5,-597.79"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2360.75,-599.78 2368.48,-601.61 2363.57,-595.36 2360.75,-599.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1896.63,-496.15 1896.63,-518.95 2129.05,-518.95 2129.05,-496.15 1896.63,-496.15"/>
<text xml:space="preserve" text-anchor="start" x="1899.63" y="-501.95" font-family="Arial" font-size="14.00" fill="#bbfcd3">images・Data Protection keys / PVC</text>
</g>
<!-- apps&#45;&gt;databases -->
<g id="edge13" class="edge">
<title>apps&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1640.78,-511.13C1706.04,-535.23 1785.57,-564.9 1856.63,-592.27 1874.84,-599.28 1894.19,-606.88 1912.84,-614.26"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1911.76,-616.66 1919.7,-616.98 1913.7,-611.78 1911.76,-616.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1731.59,-592.27 1731.59,-615.07 1813.85,-615.07 1813.85,-592.27 1731.59,-592.27"/>
<text xml:space="preserve" text-anchor="start" x="1734.59" y="-598.07" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.74,-526.6C237.6,-516.51 314.9,-503.03 383.88,-491"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="384.08,-493.64 391.02,-489.76 383.18,-488.46 384.08,-493.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-518.43 220,-541.23 353.57,-541.23 353.57,-518.43 220,-518.43"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-524.23" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge3" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M707.99,-462.07C771.54,-462.07 843.09,-462.07 899.25,-462.07"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="899.03,-464.69 906.53,-462.07 899.03,-459.44 899.03,-464.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="748.13,-462.07 748.13,-484.87 869.27,-484.87 869.27,-462.07 748.13,-462.07"/>
<text xml:space="preserve" text-anchor="start" x="751.13" y="-467.87" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M179.74,-397.54C237.6,-407.63 314.9,-421.1 383.88,-433.13"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="383.18,-435.67 391.02,-434.38 384.08,-430.5 383.18,-435.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-426.86 220,-449.66 353.57,-449.66 353.57,-426.86 220,-426.86"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-432.66" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
<!-- tunnel&#45;&gt;nextcloud -->
<g id="edge5" class="edge">
<title>tunnel&#45;&gt;nextcloud</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1039.97,-512.07C1063.83,-539.98 1095.96,-574.06 1129.27,-599.07 1215.09,-663.51 1327.17,-714.6 1406.48,-746.24"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1405.23,-748.57 1413.17,-748.89 1407.16,-743.69 1405.23,-748.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1129.27,-707.11 1129.27,-729.91 1322.75,-729.91 1322.75,-707.11 1129.27,-707.11"/>
<text xml:space="preserve" text-anchor="start" x="1132.27" y="-712.91" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- tunnel&#45;&gt;recording -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;recording</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1089.01,-490.21C1177.81,-518.37 1314.11,-561.6 1406.22,-590.81"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1405.28,-593.27 1413.22,-593.03 1406.87,-588.26 1405.28,-593.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1129.27,-561.1 1129.27,-583.9 1322.75,-583.9 1322.75,-561.1 1129.27,-561.1"/>
<text xml:space="preserve" text-anchor="start" x="1132.27" y="-566.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- tunnel&#45;&gt;apps -->
<g id="edge7" class="edge">
<title>tunnel&#45;&gt;apps</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1089.01,-462.07C1164.08,-462.07 1273.09,-462.07 1360.65,-462.07"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1360.42,-464.69 1367.92,-462.07 1360.42,-459.44 1360.42,-464.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1129.27,-462.07 1129.27,-484.87 1322.75,-484.87 1322.75,-462.07 1129.27,-462.07"/>
<text xml:space="preserve" text-anchor="start" x="1132.27" y="-467.87" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- tunnel&#45;&gt;argo -->
<g id="edge4" class="edge">
<title>tunnel&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1053.04,-412.23C1115.63,-354.97 1224.87,-260.74 1330.75,-197.07 1354.38,-182.86 1381.18,-169.92 1406.55,-158.94"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1407.54,-161.37 1413.41,-156.01 1405.48,-156.54 1407.54,-161.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1158.44,-339.16 1158.44,-361.96 1293.58,-361.96 1293.58,-339.16 1158.44,-339.16"/>
<text xml:space="preserve" text-anchor="start" x="1161.44" y="-344.96" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後 / 管理UI</text>
</g>
<!-- tunnel&#45;&gt;nas -->
<g id="edge8" class="edge">
<title>tunnel&#45;&gt;nas</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1015.28,-412.09C1034.63,-353.7 1072.66,-256.39 1129.27,-188.07 1291.04,7.2 1440.8,39.74 1680.81,-42.07 2002.87,-151.84 2288.31,-464.51 2397.27,-595.36"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2395.14,-596.91 2401.94,-601.01 2399.18,-593.56 2395.14,-596.91"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1690.76,-122.31 1690.76,-145.11 1854.68,-145.11 1854.68,-122.31 1690.76,-122.31"/>
<text xml:space="preserve" text-anchor="start" x="1693.76" y="-128.11" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後 / NAS管理UI</text>
</g>
<!-- databases&#45;&gt;nas -->
<g id="edge15" class="edge">
<title>databases&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M2103.28,-654.07C2158.91,-654.07 2231.83,-654.07 2295.94,-654.07"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2295.63,-656.69 2303.13,-654.07 2295.63,-651.44 2295.63,-656.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2169.05,-654.07 2169.05,-676.87 2266.85,-676.87 2266.85,-654.07 2169.05,-654.07"/>
<text xml:space="preserve" text-anchor="start" x="2172.05" y="-659.87" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
</g>
</svg>
`;case`access`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2320pt" height="1210pt"
 viewBox="0.00 0.00 2320.00 1210.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1194.68)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#1c417d" stroke="#1c356c" points="371.57,-296.63 371.57,-863.63 1745.86,-863.63 1745.86,-296.63 371.57,-296.63"/>
<text xml:space="preserve" text-anchor="start" x="379.57" y="-850.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_edge</title>
<polygon fill="#51321f" stroke="#3f2717" points="403.57,-328.63 403.57,-810.63 1713.86,-810.63 1713.86,-328.63 403.57,-328.63"/>
<text xml:space="preserve" text-anchor="start" x="411.57" y="-797.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_routes</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1371.54,-368.63 1371.54,-749.63 1673.86,-749.63 1673.86,-368.63 1371.54,-368.63"/>
<text xml:space="preserve" text-anchor="start" x="1379.54" y="-736.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">公開HOSTNAME / 設定から抽出</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1400.7,-103.63 1400.7,-288.63 1644.7,-288.63 1644.7,-103.63 1400.7,-103.63"/>
<text xml:space="preserve" text-anchor="start" x="1408.7" y="-275.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1861.21,-332.63 1861.21,-1171.63 2281.94,-1171.63 2281.94,-332.63 1861.21,-332.63"/>
<text xml:space="preserve" text-anchor="start" x="1869.21" y="-1158.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1901.21,-925.63 1901.21,-1110.63 2241.94,-1110.63 2241.94,-925.63 1901.21,-925.63"/>
<text xml:space="preserve" text-anchor="start" x="1909.21" y="-1097.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_management</title>
<polygon fill="#5a3620" stroke="#462a17" points="1949.58,-700.63 1949.58,-885.63 2193.58,-885.63 2193.58,-700.63 1949.58,-700.63"/>
<text xml:space="preserve" text-anchor="start" x="1957.58" y="-872.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">自宅基盤の構成管理</text>
</g>
<!-- protected -->
<g id="node1" class="node">
<title>protected</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1633.86,-688.63 1411.54,-688.63 1411.54,-588.63 1633.86,-588.63 1633.86,-688.63"/>
<text xml:space="preserve" text-anchor="start" x="1421.55" y="-630.63" font-family="Arial" font-size="20.00" fill="#f8fafc">Access保護のhostname</text>
</g>
<!-- exceptions -->
<g id="node2" class="node">
<title>exceptions</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1617.17,-508.63 1428.23,-508.63 1428.23,-408.63 1617.17,-408.63 1617.17,-508.63"/>
<text xml:space="preserve" text-anchor="start" x="1438.24" y="-450.63" font-family="Arial" font-size="20.00" fill="#f8fafc">例外 / mTLS専用API</text>
</g>
<!-- access -->
<g id="node3" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="758.13,-728.63 443.57,-728.63 443.57,-628.63 758.13,-628.63 758.13,-728.63"/>
<text xml:space="preserve" text-anchor="start" x="453.58" y="-670.63" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- mtls -->
<g id="node4" class="node">
<title>mtls</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="703.66,-548.63 498.04,-548.63 498.04,-448.63 703.66,-448.63 703.66,-548.63"/>
<text xml:space="preserve" text-anchor="start" x="508.05" y="-490.63" font-family="Arial" font-size="20.00" fill="#f8fafc">mTLS / 専用APIの例外</text>
</g>
<!-- tunnel -->
<g id="node5" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1220.72,-688.63 1040.72,-688.63 1040.72,-588.63 1220.72,-588.63 1220.72,-688.63"/>
<text xml:space="preserve" text-anchor="start" x="1051.79" y="-630.63" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- reventer -->
<g id="node6" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1612.7,-235.63 1432.7,-235.63 1432.7,-135.63 1612.7,-135.63 1612.7,-235.63"/>
<text xml:space="preserve" text-anchor="start" x="1477.68" y="-177.63" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- nas -->
<g id="node7" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2209.94,-1048.54C2209.94,-1053.56 2147.92,-1057.63 2071.58,-1057.63 1995.23,-1057.63 1933.21,-1053.56 1933.21,-1048.54 1933.21,-1048.54 1933.21,-966.72 1933.21,-966.72 1933.21,-961.7 1995.23,-957.63 2071.58,-957.63 2147.92,-957.63 2209.94,-961.7 2209.94,-966.72 2209.94,-966.72 2209.94,-1048.54 2209.94,-1048.54"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2209.94,-1048.54C2209.94,-1043.53 2147.92,-1039.45 2071.58,-1039.45 1995.23,-1039.45 1933.21,-1043.53 1933.21,-1048.54"/>
<text xml:space="preserve" text-anchor="start" x="1943.22" y="-999.63" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- argo -->
<g id="node8" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2161.58,-832.63 1981.58,-832.63 1981.58,-732.63 2161.58,-732.63 2161.58,-832.63"/>
<text xml:space="preserve" text-anchor="start" x="2019.34" y="-774.63" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- home -->
<g id="node9" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2161.58,-472.63 1981.58,-472.63 1981.58,-372.63 2161.58,-372.63 2161.58,-472.63"/>
<text xml:space="preserve" text-anchor="start" x="1994.88" y="-414.63" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- hardware -->
<g id="node10" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2161.58,-652.63 1981.58,-652.63 1981.58,-552.63 2161.58,-552.63 2161.58,-652.63"/>
<text xml:space="preserve" text-anchor="start" x="1996.56" y="-594.63" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- user -->
<g id="node11" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-728.63 0,-728.63 0,-628.63 180,-628.63 180,-728.63"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-670.63" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- operator -->
<g id="node12" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-908.63 0,-908.63 0,-808.63 180,-808.63 180,-908.63"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-850.63" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- client -->
<g id="node13" class="node">
<title>client</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-548.63 0,-548.63 0,-448.63 180,-448.63 180,-548.63"/>
<text xml:space="preserve" text-anchor="start" x="23.32" y="-490.63" font-family="Arial" font-size="20.00" fill="#f8fafc">専用クライアント</text>
</g>
<!-- protected&#45;&gt;nas -->
<g id="edge11" class="edge">
<title>protected&#45;&gt;nas</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1578.84,-688.41C1643.47,-745.27 1755.27,-839.02 1861.21,-905.63 1889.13,-923.18 1920.51,-939.91 1950.31,-954.55"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1948.89,-956.77 1956.79,-957.7 1951.19,-952.05 1948.89,-956.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-899.45 1753.86,-922.25 1853.21,-922.25 1853.21,-899.45 1753.86,-899.45"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-905.25" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;argo -->
<g id="edge12" class="edge">
<title>protected&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.85,-668.24C1699.77,-685.91 1785.25,-708.71 1861.21,-728.63 1897.15,-738.06 1936.6,-748.27 1971.47,-757.24"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1970.8,-759.78 1978.72,-759.11 1972.11,-754.7 1970.8,-759.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-726.25 1753.86,-749.05 1853.21,-749.05 1853.21,-726.25 1753.86,-726.25"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-732.05" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;home -->
<g id="edge9" class="edge">
<title>protected&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1633.71,-595.18C1732.77,-556.05 1877.03,-499.08 1972.3,-461.45"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1973.11,-463.95 1979.12,-458.75 1971.18,-459.07 1973.11,-463.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1777.2,-546.78 1777.2,-569.58 1829.88,-569.58 1829.88,-546.78 1777.2,-546.78"/>
<text xml:space="preserve" text-anchor="start" x="1780.2" y="-552.58" font-family="Arial" font-size="14.00" fill="#bbfcd3">内部接続</text>
</g>
<!-- protected&#45;&gt;hardware -->
<g id="edge10" class="edge">
<title>protected&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.71,-631.39C1732.57,-624.88 1876.45,-615.41 1971.72,-609.14"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1971.61,-611.78 1978.92,-608.66 1971.26,-606.54 1971.61,-611.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-623.32 1753.86,-646.12 1853.21,-646.12 1853.21,-623.32 1753.86,-623.32"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-629.12" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- exceptions&#45;&gt;home -->
<g id="edge13" class="edge">
<title>exceptions&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1617.06,-434.21C1658.62,-424.54 1708.36,-414.6 1753.86,-409.83 1797.78,-405.23 1809.08,-408.53 1853.21,-409.83 1891.9,-410.97 1934.4,-413.24 1971.49,-415.56"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1971.12,-418.17 1978.77,-416.03 1971.46,-412.93 1971.12,-418.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1777.2,-409.83 1777.2,-432.63 1829.88,-432.63 1829.88,-409.83 1777.2,-409.83"/>
<text xml:space="preserve" text-anchor="start" x="1780.2" y="-415.63" font-family="Arial" font-size="14.00" fill="#bbfcd3">内部接続</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge4" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M758.09,-666.79C846.39,-660.1 954.11,-651.94 1030.79,-646.13"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1030.63,-648.77 1037.91,-645.59 1030.24,-643.54 1030.63,-648.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="838.86,-662.21 838.86,-685.01 959.99,-685.01 959.99,-662.21 838.86,-662.21"/>
<text xml:space="preserve" text-anchor="start" x="841.86" y="-668.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- mtls&#45;&gt;tunnel -->
<g id="edge5" class="edge">
<title>mtls&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M703.63,-525.62C798.01,-550.66 937.55,-587.66 1030.96,-612.44"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1030.13,-614.93 1038.05,-614.32 1031.48,-609.86 1030.13,-614.93"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="808.13,-601.08 808.13,-623.88 990.72,-623.88 990.72,-601.08 808.13,-601.08"/>
<text xml:space="preserve" text-anchor="start" x="811.13" y="-606.88" font-family="Arial" font-size="14.00" fill="#cbd0fd">mTLS検証済みのAPIリクエスト</text>
</g>
<!-- tunnel&#45;&gt;protected -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;protected</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1220.7,-638.63C1274.25,-638.63 1343.12,-638.63 1401.47,-638.63"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1401.33,-641.26 1408.83,-638.63 1401.33,-636.01 1401.33,-641.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-638.63 1270.72,-661.43 1361.54,-661.43 1361.54,-638.63 1270.72,-638.63"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-644.43" font-family="Arial" font-size="14.00" fill="#c9c9c9">hostname転送</text>
</g>
<!-- tunnel&#45;&gt;exceptions -->
<g id="edge7" class="edge">
<title>tunnel&#45;&gt;exceptions</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1220.7,-597.56C1279.72,-570.32 1357.35,-534.49 1418.99,-506.04"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1419.89,-508.51 1425.6,-502.99 1417.69,-503.75 1419.89,-508.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-570.05 1270.72,-592.85 1361.54,-592.85 1361.54,-570.05 1270.72,-570.05"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-575.85" font-family="Arial" font-size="14.00" fill="#bbfcd3">hostname転送</text>
</g>
<!-- tunnel&#45;&gt;reventer -->
<g id="edge8" class="edge">
<title>tunnel&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1171.67,-588.7C1218.63,-530.37 1299.36,-431.31 1371.54,-348.63 1402.68,-312.96 1438.59,-273.91 1467.48,-242.98"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1469.39,-244.78 1472.6,-237.51 1465.56,-241.19 1469.39,-244.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-466.83 1270.72,-489.63 1361.54,-489.63 1361.54,-466.83 1270.72,-466.83"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-472.63" font-family="Arial" font-size="14.00" fill="#cbd0fd">hostname転送</text>
</g>
<!-- home&#45;&gt;tunnel -->
<g id="edge14" class="edge">
<title>home&#45;&gt;tunnel</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M2044.31,-372.63C1997.39,-289.42 1890.38,-125.31 1745.86,-60.83 1593.94,6.96 1509.9,31.55 1371.54,-60.83 1194.03,-179.35 1147.73,-456.41 1135.8,-578.75"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1133.2,-578.32 1135.12,-586.03 1138.43,-578.8 1133.2,-578.32"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1469.13,-60.83 1469.13,-83.63 1576.28,-83.63 1576.28,-60.83 1469.13,-60.83"/>
<text xml:space="preserve" text-anchor="start" x="1472.13" y="-66.63" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きTunnel接続</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-678.63C249.73,-678.63 348.9,-678.63 433.34,-678.63"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="433.3,-681.26 440.8,-678.63 433.3,-676.01 433.3,-681.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-678.63 230,-701.43 363.57,-701.43 363.57,-678.63 230,-678.63"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-684.43" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-827.17C254.07,-800.95 361.33,-763.01 448.89,-732.03"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="449.6,-734.57 455.79,-729.59 447.85,-729.62 449.6,-734.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-807.92 230,-830.72 363.57,-830.72 363.57,-807.92 230,-807.92"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-813.72" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
<!-- client&#45;&gt;mtls -->
<g id="edge3" class="edge">
<title>client&#45;&gt;mtls</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-498.63C265.6,-498.63 395.5,-498.63 488.12,-498.63"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="487.84,-501.26 495.34,-498.63 487.84,-496.01 487.84,-501.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="241.28,-498.63 241.28,-521.43 352.3,-521.43 352.3,-498.63 241.28,-498.63"/>
<text xml:space="preserve" text-anchor="start" x="244.28" y="-504.43" font-family="Arial" font-size="14.00" fill="#bbfcd3">クライアント証明書</text>
</g>
</g>
</svg>
`;case`delivery`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2455pt" height="954pt"
 viewBox="0.00 0.00 2455.00 954.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 939.08)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="670,-8 670,-481.22 2417,-481.22 2417,-8 670,-8"/>
<text xml:space="preserve" text-anchor="start" x="678" y="-468.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_management</title>
<polygon fill="#5a3620" stroke="#462a17" points="710,-218.81 710,-420.02 2377,-420.02 2377,-218.81 710,-218.81"/>
<text xml:space="preserve" text-anchor="start" x="718" y="-407.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">自宅基盤の構成管理</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-218.81 8,-916.03 662,-916.03 662,-218.81 8,-218.81"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-903.13" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<!-- images -->
<g id="node1" class="node">
<title>images</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="930,-358.82 750,-358.82 750,-258.81 930,-258.81 930,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="773.85" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Image Updater</text>
</g>
<!-- ansible -->
<g id="node2" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1170,-358.82 990,-358.82 990,-258.81 1170,-258.81 1170,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="1047.2" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- packer -->
<g id="node3" class="node">
<title>packer</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1441.6,-358.82 1230.4,-358.82 1230.4,-258.81 1441.6,-258.81 1441.6,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="1240.41" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Packer / VM template</text>
</g>
<!-- argo -->
<g id="node4" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2023,-358.82 1843,-358.82 1843,-258.81 2023,-258.81 2023,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="1880.76" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- runner -->
<g id="node5" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2336.71,-358.82 2083.29,-358.82 2083.29,-258.81 2336.71,-258.81 2336.71,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="2093.3" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 共用のrunner制御基盤</text>
</g>
<!-- tfc_agents -->
<g id="node6" class="node">
<title>tfc_agents</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1782.61,-358.82 1501.39,-358.82 1501.39,-258.81 1782.61,-258.81 1782.61,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="1511.39" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud agents / 自宅</text>
</g>
<!-- home -->
<g id="node7" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2023,-148.01 1843,-148.01 1843,-48 2023,-48 2023,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1856.31" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- hardware -->
<g id="node8" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1732,-148.01 1552,-148.01 1552,-48 1732,-48 1732,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1566.99" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- github -->
<g id="node9" class="node">
<title>github</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="570.6,-854.83 339.4,-854.83 339.4,-754.82 570.6,-754.82 570.6,-854.83"/>
<text xml:space="preserve" text-anchor="start" x="349.41" y="-796.83" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- terraform_cloud -->
<g id="node10" class="node">
<title>terraform_cloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="228,-652.02 48,-652.02 48,-552.02 228,-552.02 228,-652.02"/>
<text xml:space="preserve" text-anchor="start" x="65.2" y="-594.02" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- github_pages -->
<g id="node11" class="node">
<title>github_pages</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="621.72,-652.02 288.28,-652.02 288.28,-552.02 621.72,-552.02 621.72,-652.02"/>
<text xml:space="preserve" text-anchor="start" x="298.29" y="-594.02" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub Pages / my&#45;infra図・レビュー</text>
</g>
<!-- edge -->
<g id="node12" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="228,-358.82 48,-358.82 48,-258.81 228,-258.81 228,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="92.42" y="-300.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- ansible&#45;&gt;hardware -->
<g id="edge7" class="edge">
<title>ansible&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1136.68,-259.01C1155.82,-244.43 1177.94,-229.5 1200,-218.81 1311.02,-164.98 1449.86,-132.39 1541.99,-115.07"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1542.28,-117.68 1549.18,-113.74 1541.33,-112.52 1542.28,-117.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1268.62,-188.01 1268.62,-210.81 1321.3,-210.81 1321.3,-188.01 1268.62,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1271.62" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">機器設定</text>
</g>
<!-- packer&#45;&gt;hardware -->
<g id="edge8" class="edge">
<title>packer&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1407.74,-258.86C1453.99,-227.3 1514.18,-186.22 1561.97,-153.61"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1563.23,-155.94 1567.94,-149.54 1560.27,-151.6 1563.23,-155.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1507.32,-188.01 1507.32,-210.81 1591.91,-210.81 1591.91,-188.01 1507.32,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1510.32" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM template</text>
</g>
<!-- argo&#45;&gt;home -->
<g id="edge9" class="edge">
<title>argo&#45;&gt;home</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1933,-258.86C1933,-228.75 1933,-189.98 1933,-158.16"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1935.63,-158.18 1933,-150.68 1930.38,-158.18 1935.63,-158.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1933,-188.01 1933,-210.81 2015.25,-210.81 2015.25,-188.01 1933,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1936" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期</text>
</g>
<!-- tfc_agents&#45;&gt;hardware -->
<g id="edge10" class="edge">
<title>tfc_agents&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1642,-258.86C1642,-228.75 1642,-189.98 1642,-158.16"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1644.63,-158.18 1642,-150.68 1639.38,-158.18 1644.63,-158.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1642,-188.01 1642,-210.81 1750.68,-210.81 1750.68,-188.01 1642,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1645" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM / ネットワーク</text>
</g>
<!-- github&#45;&gt;argo -->
<g id="edge3" class="edge">
<title>github&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M570.47,-803.19C819.28,-796.47 1415.59,-751.13 1813,-481.22 1854.45,-453.06 1886.07,-405.48 1906.42,-367.59"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1908.53,-369.22 1909.69,-361.36 1903.88,-366.78 1908.53,-369.22"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1687.79,-590.62 1687.79,-613.42 1737.36,-613.42 1737.36,-590.62 1687.79,-590.62"/>
<text xml:space="preserve" text-anchor="start" x="1690.79" y="-596.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- github&#45;&gt;runner -->
<g id="edge4" class="edge">
<title>github&#45;&gt;runner</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M570.56,-796.76C846.05,-778.87 1534.64,-727.78 1752,-652.02 1897.25,-601.4 1932.69,-577.06 2053,-481.22 2095.25,-447.55 2136.25,-402.22 2165.75,-366.64"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2167.58,-368.54 2170.32,-361.08 2163.53,-365.2 2167.58,-368.54"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1959.49,-590.62 1959.49,-613.42 2033.98,-613.42 2033.98,-590.62 1959.49,-590.62"/>
<text xml:space="preserve" text-anchor="start" x="1962.49" y="-596.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">Actions job</text>
</g>
<!-- github&#45;&gt;terraform_cloud -->
<g id="edge1" class="edge">
<title>github&#45;&gt;terraform_cloud</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M377.86,-754.96C331.36,-725.51 272.05,-687.94 224.04,-657.52"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="225.51,-655.35 217.77,-653.55 222.7,-659.78 225.51,-655.35"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="306,-692.02 306,-714.82 396.79,-714.82 396.79,-692.02 306,-692.02"/>
<text xml:space="preserve" text-anchor="start" x="309" y="-697.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">Terraform実行</text>
</g>
<!-- github&#45;&gt;github_pages -->
<g id="edge2" class="edge">
<title>github&#45;&gt;github_pages</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M455,-754.96C455,-726.92 455,-691.53 455,-661.95"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="457.63,-662.28 455,-654.78 452.38,-662.28 457.63,-662.28"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="455,-692.02 455,-714.82 585.47,-714.82 585.47,-692.02 455,-692.02"/>
<text xml:space="preserve" text-anchor="start" x="458" y="-697.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">構成図・PR比較を公開</text>
</g>
<!-- terraform_cloud&#45;&gt;tfc_agents -->
<g id="edge6" class="edge">
<title>terraform_cloud&#45;&gt;tfc_agents</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M227.76,-560.88C237.82,-557.43 248.03,-554.37 258,-552.02 618.46,-467.02 718.99,-507.04 1088.91,-489.22 1110.17,-488.19 1452.44,-489.61 1472,-481.22 1527.02,-457.62 1573.57,-406.99 1603.97,-366.84"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1606.03,-368.46 1608.4,-360.88 1601.82,-365.33 1606.03,-368.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1088.91,-489.22 1088.91,-512.02 1291,-512.02 1291,-489.22 1088.91,-489.22"/>
<text xml:space="preserve" text-anchor="start" x="1091.91" y="-495.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">workspace runを自宅agentで実行</text>
</g>
<!-- terraform_cloud&#45;&gt;edge -->
<g id="edge5" class="edge">
<title>terraform_cloud&#45;&gt;edge</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M138,-552.28C138,-501.88 138,-423.15 138,-369.17"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="140.63,-369.24 138,-361.74 135.38,-369.24 140.63,-369.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="138,-489.22 138,-512.02 284.83,-512.02 284.83,-489.22 138,-489.22"/>
<text xml:space="preserve" text-anchor="start" x="141" y="-495.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">DNS / Access / Tunnel</text>
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
<text xml:space="preserve" text-anchor="start" x="688.23" y="-491.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
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
<!-- pdc&#45;&gt;grafana -->
<g id="edge5" class="edge">
<title>pdc&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M752.4,-317.05C692.02,-304.36 610.33,-292.88 538.33,-302.2 528.46,-303.48 518.3,-305.23 508.17,-307.29"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="507.81,-304.68 501.02,-308.81 508.9,-309.81 507.81,-304.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="538.33,-302.2 538.33,-325 632.23,-325 632.23,-302.2 538.33,-302.2"/>
<text xml:space="preserve" text-anchor="start" x="541.33" y="-308" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きPDC接続</text>
</g>
<!-- pdc&#45;&gt;local_store -->
<g id="edge6" class="edge">
<title>pdc&#45;&gt;local_store</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M932.14,-340C1089.75,-340 1417.67,-340 1589.69,-340"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1589.5,-342.63 1597,-340 1589.5,-337.38 1589.5,-342.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1175.61,-340 1175.61,-362.8 1309.25,-362.8 1309.25,-340 1175.61,-340"/>
<text xml:space="preserve" text-anchor="start" x="1178.61" y="-345.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">private query / :8428</text>
</g>
<!-- collector&#45;&gt;local_store -->
<g id="edge7" class="edge">
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
<svg width="2119pt" height="468pt"
 viewBox="0.00 0.00 2119.00 468.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
</g>
</svg>
`;case`network`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1569pt" height="2143pt"
 viewBox="0.00 0.00 1569.00 2143.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 2128.05)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="230.85,-1920 230.85,-2105 567.15,-2105 567.15,-1920 230.85,-1920"/>
<text xml:space="preserve" text-anchor="start" x="238.85" y="-2092.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="229,-8 229,-1912 1530.81,-1912 1530.81,-8 229,-8"/>
<text xml:space="preserve" text-anchor="start" x="237" y="-1899.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="269,-48 269,-569 1138.33,-569 1138.33,-48 269,-48"/>
<text xml:space="preserve" text-anchor="start" x="277" y="-556.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_lan</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="809.28,-850 809.28,-1851 1145.03,-1851 1145.03,-850 809.28,-850"/>
<text xml:space="preserve" text-anchor="start" x="817.28" y="-1838.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">LAN / VLAN・経路</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_dns</title>
<polygon fill="#3e4651" stroke="#2d333d" points="805.43,-609 805.43,-810 1490.81,-810 1490.81,-609 805.43,-609"/>
<text xml:space="preserve" text-anchor="start" x="813.43" y="-797.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">内部DNS / METALLB</text>
</g>
<!-- warp -->
<g id="node1" class="node">
<title>warp</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="535.15,-2052 262.85,-2052 262.85,-1952 535.15,-1952 535.15,-2052"/>
<text xml:space="preserve" text-anchor="start" x="272.86" y="-1994" font-family="Arial" font-size="20.00" fill="#f8fafc">WARP / private CIDR routes</text>
</g>
<!-- wifi -->
<g id="node2" class="node">
<title>wifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="489,-188 309,-188 309,-88 489,-88 489,-188"/>
<text xml:space="preserve" text-anchor="start" x="359.56" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">Wi&#45;Fi AP</text>
</g>
<!-- unifi -->
<g id="node3" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="489,-348 309,-348 309,-248 489,-248 489,-348"/>
<text xml:space="preserve" text-anchor="start" x="326.21" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS Server</text>
</g>
<!-- router -->
<g id="node4" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="489,-508 309,-508 309,-408 489,-408 489,-508"/>
<text xml:space="preserve" text-anchor="start" x="332.85" y="-450" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / VLAN</text>
</g>
<!-- lb -->
<g id="node5" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1098.33,-188 855.98,-188 855.98,-88 1098.33,-88 1098.33,-188"/>
<text xml:space="preserve" text-anchor="start" x="865.99" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived ×2</text>
</g>
<!-- server -->
<g id="node6" class="node">
<title>server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1105.03,-1630 849.28,-1630 849.28,-1530 1105.03,-1530 1105.03,-1630"/>
<text xml:space="preserve" text-anchor="start" x="859.28" y="-1572" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN20 / 192.168.20.0/24</text>
</g>
<!-- native -->
<g id="node7" class="node">
<title>native</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1088.91,-990 865.4,-990 865.4,-890 1088.91,-890 1088.91,-990"/>
<text xml:space="preserve" text-anchor="start" x="875.41" y="-932" font-family="Arial" font-size="20.00" fill="#f8fafc">native / 192.168.0.0/24</text>
</g>
<!-- management -->
<g id="node8" class="node">
<title>management</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1105.03,-1150 849.28,-1150 849.28,-1050 1105.03,-1050 1105.03,-1150"/>
<text xml:space="preserve" text-anchor="start" x="859.28" y="-1092" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN10 / 192.168.10.0/24</text>
</g>
<!-- client -->
<g id="node9" class="node">
<title>client</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1105.03,-1310 849.28,-1310 849.28,-1210 1105.03,-1210 1105.03,-1310"/>
<text xml:space="preserve" text-anchor="start" x="859.28" y="-1252" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN30 / 192.168.30.0/24</text>
</g>
<!-- guest -->
<g id="node10" class="node">
<title>guest</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1067.15,-1470 887.15,-1470 887.15,-1370 1067.15,-1370 1067.15,-1470"/>
<text xml:space="preserve" text-anchor="start" x="907.11" y="-1412" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN31 / guest</text>
</g>
<!-- iot -->
<g id="node11" class="node">
<title>iot</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1105.03,-1790 849.28,-1790 849.28,-1690 1105.03,-1690 1105.03,-1790"/>
<text xml:space="preserve" text-anchor="start" x="859.28" y="-1732" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN40 / 192.168.40.0/24</text>
</g>
<!-- coredns -->
<g id="node12" class="node">
<title>coredns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1108.88,-749 845.43,-749 845.43,-649 1108.88,-649 1108.88,-749"/>
<text xml:space="preserve" text-anchor="start" x="855.44" y="-691" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / miutaku.internal</text>
</g>
<!-- metallb -->
<g id="node13" class="node">
<title>metallb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1450.81,-749 1194.03,-749 1194.03,-649 1450.81,-649 1450.81,-749"/>
<text xml:space="preserve" text-anchor="start" x="1204.04" y="-691" font-family="Arial" font-size="20.00" fill="#f8fafc">MetalLB / LANのService IP</text>
</g>
<!-- operator -->
<g id="node14" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-348 0,-348 0,-248 180,-248 180,-348"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- warp&#45;&gt;server -->
<g id="edge3" class="edge">
<title>warp&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M449.99,-1952.21C523.31,-1881.04 666.42,-1749 805.43,-1660 819.49,-1651 834.72,-1642.41 850.1,-1634.43"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="850.98,-1636.92 856.47,-1631.18 848.59,-1632.25 850.98,-1636.92"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="575.15,-1835.29 575.15,-1858.09 797.43,-1858.09 797.43,-1835.29 575.15,-1835.29"/>
<text xml:space="preserve" text-anchor="start" x="578.15" y="-1841.09" font-family="Arial" font-size="14.00" fill="#c9c9c9">private CIDR routes / WARP policy</text>
</g>
<!-- wifi&#45;&gt;lb -->
<!-- unifi&#45;&gt;coredns -->
<!-- router&#45;&gt;server -->
<g id="edge4" class="edge">
<title>router&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M403.77,-507.77C417.53,-678.45 469.92,-1237.3 575.15,-1378 641.67,-1466.94 707.27,-1427.33 797.43,-1492.2 801.46,-1495.1 801.35,-1497.17 805.43,-1500 818.47,-1509.03 832.69,-1517.5 847.17,-1525.31"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="845.68,-1527.49 853.54,-1528.67 848.13,-1522.85 845.68,-1527.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="664.22,-1492.2 664.22,-1515 708.36,-1515 708.36,-1492.2 664.22,-1492.2"/>
<text xml:space="preserve" text-anchor="start" x="667.22" y="-1498" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI20</text>
</g>
<!-- router&#45;&gt;native -->
<g id="edge5" class="edge">
<title>router&#45;&gt;native</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M488.69,-490.4C583.07,-530.02 728.15,-606.8 797.43,-725.2 819.91,-763.61 782.98,-786.58 805.43,-825 819.11,-848.39 839.65,-868.01 861.8,-884.05"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="860.23,-886.15 867.88,-888.29 863.23,-881.84 860.23,-886.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="656.45,-725.2 656.45,-748 716.14,-748 716.14,-725.2 656.45,-725.2"/>
<text xml:space="preserve" text-anchor="start" x="659.45" y="-731" font-family="Arial" font-size="14.00" fill="#c9c9c9">native IF</text>
</g>
<!-- router&#45;&gt;management -->
<g id="edge6" class="edge">
<title>router&#45;&gt;management</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M422.62,-507.83C452.35,-570.28 508.67,-678.84 575.15,-759 658.53,-859.52 736.34,-835.77 797.43,-951.2 811.83,-978.41 787.44,-995.02 805.43,-1020 814.94,-1033.2 827.18,-1044.29 840.75,-1053.59"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="839.09,-1055.64 846.81,-1057.5 841.94,-1051.23 839.09,-1055.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="664.22,-951.2 664.22,-974 708.36,-974 708.36,-951.2 664.22,-951.2"/>
<text xml:space="preserve" text-anchor="start" x="667.22" y="-957" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI10</text>
</g>
<!-- router&#45;&gt;client -->
<g id="edge7" class="edge">
<title>router&#45;&gt;client</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M407.28,-507.73C423.58,-606.15 470.12,-829.65 575.15,-985 643.03,-1085.4 760.9,-1159.68 851.33,-1205.56"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="849.97,-1207.81 857.85,-1208.83 852.32,-1203.12 849.97,-1207.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="664.22,-1171.98 664.22,-1194.78 708.36,-1194.78 708.36,-1171.98 664.22,-1171.98"/>
<text xml:space="preserve" text-anchor="start" x="667.22" y="-1177.78" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI30</text>
</g>
<!-- router&#45;&gt;guest -->
<g id="edge8" class="edge">
<title>router&#45;&gt;guest</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M406.33,-507.98C426.06,-657.27 490.17,-1096.54 575.15,-1210 614.42,-1262.43 772.62,-1335.64 878.18,-1380.32"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="876.87,-1382.62 884.8,-1383.11 878.91,-1377.78 876.87,-1382.62"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="622.6,-1340.05 622.6,-1362.85 749.98,-1362.85 749.98,-1340.05 622.6,-1340.05"/>
<text xml:space="preserve" text-anchor="start" x="625.6" y="-1345.85" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI31 / 他VLAN拒否</text>
</g>
<!-- router&#45;&gt;iot -->
<g id="edge9" class="edge">
<title>router&#45;&gt;iot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M402.13,-507.87C411.05,-696.21 450.98,-1361.81 575.15,-1526 640.96,-1613.02 727.36,-1546.56 797.43,-1630.2 806.24,-1640.71 796.63,-1649.49 805.43,-1660 815.43,-1671.94 827.62,-1682.2 840.82,-1691"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="839.33,-1693.16 847.07,-1694.96 842.14,-1688.73 839.33,-1693.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="664.22,-1630.2 664.22,-1653 708.36,-1653 708.36,-1630.2 664.22,-1630.2"/>
<text xml:space="preserve" text-anchor="start" x="667.22" y="-1636" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI40</text>
</g>
<!-- coredns&#45;&gt;metallb -->
<!-- operator&#45;&gt;unifi -->
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