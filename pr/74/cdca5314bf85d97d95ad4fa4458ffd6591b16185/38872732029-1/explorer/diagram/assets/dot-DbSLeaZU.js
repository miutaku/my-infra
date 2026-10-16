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
        nodesep=0.695,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
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
    agent [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">自宅監視基盤</FONT>>,
        likec4_id="premises.home.agent",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    platform [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">クラスタ基盤 / Talos</FONT>>,
        likec4_id="premises.home.platform",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    agent -> platform [style=invis];
    recording [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">録画・配信</FONT>>,
        likec4_id="premises.home.recording",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    platform -> recording [style=invis];
    apps [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">自宅ワークロード / 基盤の利用側</FONT>>,
        likec4_id="premises.home.apps",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    recording -> apps [style=invis];
    dns [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">内部DNS / MetalLB</FONT>>,
        likec4_id="premises.home.dns",
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
    dns -> eso [style=invis];
    nextcloud [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
        likec4_id="premises.home.nextcloud",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    eso -> nextcloud [style=invis];
    databases [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">DB / アプリ共有基盤</FONT>>,
        likec4_id="premises.data.databases",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    nextcloud -> databases [style=invis];
    backups [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">バックアップ処理</FONT>>,
        likec4_id="premises.data.backups",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    management [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">自宅基盤の構成管理</FONT>>,
        likec4_id="premises.management",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    backups -> management [style=invis];
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
        home [height=1.389,
            label=<<FONT POINT-SIZE="20">Talos / home-k8s</FONT>>,
            likec4_id="premises.home",
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
    protected -> network [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="6cs9r0",
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
                height=1.389,
                label=<<FONT POINT-SIZE="20">Ansible</FONT>>,
                likec4_id="premises.management.ansible",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            packer [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Packer / VM template</FONT>>,
                likec4_id="premises.management.packer",
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
                height=1.389,
                label=<<FONT POINT-SIZE="20">Terraform Cloud agents / 自宅</FONT>>,
                likec4_id="premises.management.tfc_agents",
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
        home [height=1.389,
            label=<<FONT POINT-SIZE="20">Talos / home-k8s</FONT>>,
            likec4_id="premises.home",
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
    ansible -> network [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        lhead=cluster_hardware,
        likec4_id=cpv5vb,
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器設定</FONT></TD></TR></TABLE>>];
    packer -> network [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        lhead=cluster_hardware,
        likec4_id="1xk3yrr",
        minlen=1,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM template</FONT></TD></TR></TABLE>>];
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
    argo -> home [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">manifest同期</FONT></TD></TR></TABLE>>,
        likec4_id="4jorwj",
        minlen=1,
        style=dashed,
        weight=3];
    tfc_agents -> network [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        lhead=cluster_hardware,
        likec4_id=mixl1p,
        style=dashed,
        weight=3,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM / ネットワーク</FONT></TD></TR></TABLE>>];
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
  "x570" [
    likec4_id = "homeSite.x570";
    likec4_level = 1;
    label = <<FONT POINT-SIZE="20">pve-x570</FONT>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#428a4f";
    fontcolor = "#f8fafc";
    color = "#2d5d39";
  ];
  "b550m" [
    likec4_id = "homeSite.b550m";
    likec4_level = 1;
    label = <<FONT POINT-SIZE="20">pve-b550m</FONT>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#428a4f";
    fontcolor = "#f8fafc";
    color = "#2d5d39";
  ];
  "worker_pi1" [
    likec4_id = "homeSite.worker_pi1";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">RPi / worker03 / VLAN10</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">Talos OS上のkubelet・containerd。2 VMと2<BR/>RPi。アプリPodの固定配置を意味しない。</FONT></TD></TR></TABLE>>;
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
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">RPi / worker04 / VLAN10</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">Talos OS上のkubelet・containerd。2 VMと2<BR/>RPi。アプリPodの固定配置を意味しない。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
  "talos" [
    likec4_id = "homeSite.talos";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">home-k8s</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">左のPVE → VM → Talos OSとRPi上のTalos<BR/>OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。</FONT></TD></TR></TABLE>>;
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
  subgraph "cluster_homesite" {
    likec4_id = "homeSite";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#454545";
    color = "#313131";
    style = "filled";
    margin = 50;
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>自宅 / PROXMOX2ホスト・RPI</B></FONT>>;
    "x570";
    "b550m";
    "worker_pi1";
    "worker_pi2";
    "talos";
    "network";
  }
  subgraph {
    rank = "same";
    "worker_pi1";
    "worker_pi2";
  }
  "x570" -> "talos" [
    likec4_id = "1vdtoib";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
  "b550m" -> "talos" [
    likec4_id = "1a3tikm";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
  "worker_pi1" -> "talos" [
    likec4_id = "10vlfzs";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">worker / home-k8s所属</FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
  "worker_pi2" -> "talos" [
    likec4_id = "8vd123";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">worker / home-k8s所属</FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
}`;case`pve_x570`:return`digraph {
  likec4_viewId = "pve_x570";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "TB";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 0.556;
  ranksep = 0.695;
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
  "pbs" [
    likec4_id = "homeSite.x570.pbs";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">PBS VM14001</FONT>>;
    margin = "0.139,0";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
    penwidth = 2;
    shape = "cylinder";
  ];
  "lb" [
    likec4_id = "homeSite.x570.lb";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">HAProxy / Keepalived VM10001</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "unifi" [
    likec4_id = "homeSite.x570.unifi";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">UniFi OS VM13201</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "loockit" [
    likec4_id = "homeSite.x570.loockit";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">LXC CT12902</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "tuner" [
    likec4_id = "homeSite.x570.tuner";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">Mirakurun LXC CT12901</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "windows" [
    likec4_id = "homeSite.x570.windows";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">Windows / VM60000 / tag30</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "nas1" [
    likec4_id = "homeSite.x570.nas1";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">TrueNAS VM69001 / nas-01</FONT>>;
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
    likec4_id = "homeSite.x570.cp1.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos OS / VLAN20</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_1" [
    likec4_id = "homeSite.x570.worker1.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos OS / VLAN20</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_2" [
    likec4_id = "homeSite.talos";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">home-k8s</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">左のPVE → VM → Talos OSとRPi上のTalos<BR/>OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。</FONT></TD></TR></TABLE>>;
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
    likec4_depth = 3;
    fillcolor = "#393939";
    color = "#292929";
    style = "filled";
    margin = 50;
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>自宅 / PROXMOX2ホスト・RPI</B></FONT>>;
    "talos_2";
    subgraph "cluster_x570" {
      likec4_id = "homeSite.x570";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#29472f";
      color = "#1c3021";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PVE-X570</B></FONT>>;
      "pbs";
      "lb";
      "unifi";
      "loockit";
      "tuner";
      "windows";
      "nas1";
      subgraph "cluster_cp1" {
        likec4_id = "homeSite.x570.cp1";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>TALOS CONTROLPLANE01 / VM13001</B></FONT>>;
        "talos";
      }
      subgraph "cluster_worker1" {
        likec4_id = "homeSite.x570.worker1";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>TALOS WORKER01 / VM13004</B></FONT>>;
        "talos_1";
      }
    }
  }
  "talos" -> "talos_2" [
    likec4_id = "4sdkok";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">control-plane / home-k8s所属</FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
  "talos_1" -> "talos_2" [
    likec4_id = "gbmqmp";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">worker / home-k8s所属</FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
}`;case`pve_b550m`:return`digraph {
  likec4_viewId = "pve_b550m";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "TB";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 0.556;
  ranksep = 0.695;
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
    likec4_id = "homeSite.b550m.lb";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">HAProxy / Keepalived VM10002</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "dev" [
    likec4_id = "homeSite.b550m.dev";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">開発アプリVM40000</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "kiosk" [
    likec4_id = "homeSite.b550m.kiosk";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">DisplayLink kiosk VM5000</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "loockit" [
    likec4_id = "homeSite.b550m.loockit";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">LXC CT12903</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "tuner" [
    likec4_id = "homeSite.b550m.tuner";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">Mirakurun STG LXC CT12904</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "nas2" [
    likec4_id = "homeSite.b550m.nas2";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">TrueNAS VM69002 / nas-02</FONT>>;
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
    likec4_id = "homeSite.b550m.cp2.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos OS / VLAN20</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_1" [
    likec4_id = "homeSite.b550m.cp3.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos OS / VLAN20</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_2" [
    likec4_id = "homeSite.b550m.worker2.talos";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Talos OS / VLAN20</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "talos_3" [
    likec4_id = "homeSite.talos";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">home-k8s</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">左のPVE → VM → Talos OSとRPi上のTalos<BR/>OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。</FONT></TD></TR></TABLE>>;
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
    likec4_depth = 3;
    fillcolor = "#393939";
    color = "#292929";
    style = "filled";
    margin = 50;
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>自宅 / PROXMOX2ホスト・RPI</B></FONT>>;
    "talos_3";
    subgraph "cluster_b550m" {
      likec4_id = "homeSite.b550m";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#29472f";
      color = "#1c3021";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PVE-B550M</B></FONT>>;
      "lb";
      "dev";
      "kiosk";
      "loockit";
      "tuner";
      "nas2";
      subgraph "cluster_cp2" {
        likec4_id = "homeSite.b550m.cp2";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>TALOS CONTROLPLANE02 / VM13002</B></FONT>>;
        "talos";
      }
      subgraph "cluster_cp3" {
        likec4_id = "homeSite.b550m.cp3";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>TALOS CONTROLPLANE03 / VM13003</B></FONT>>;
        "talos_1";
      }
      subgraph "cluster_worker2" {
        likec4_id = "homeSite.b550m.worker2";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>TALOS WORKER02 / VM13005</B></FONT>>;
        "talos_2";
      }
    }
  }
  subgraph {
    rank = "same";
    "talos";
    "talos_1";
  }
  "talos" -> "talos_3" [
    likec4_id = "15rdao2";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">control-plane / home-k8s所属</FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
  "talos_1" -> "talos_3" [
    likec4_id = "v3ens3";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">control-plane / home-k8s所属</FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
  "talos_2" -> "talos_3" [
    likec4_id = "2cmug7";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">worker / home-k8s所属</FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
  ];
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
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>PROXMOX / X570</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.hardware.x570",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            bridge [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">enp7s0 / vmbr0</FONT>>,
                likec4_id="premises.hardware.x570.bridge",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        subgraph cluster_b550m {
            graph [color="#2d333d",
                fillcolor="#3e4651",
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>PROXMOX / B550M</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.hardware.b550m",
                likec4_level=1,
                margin=32,
                style=filled
            ];
            bridge_1 [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">enp6s0 / vmbr0</FONT>>,
                likec4_id="premises.hardware.b550m.bridge",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
        }
        unifi [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">UniFi OS Server</FONT>>,
            likec4_id="premises.hardware.unifi",
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
        weight=3];
    ethernet -> ap [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">AP trunk / 接続ポート未確定</FONT></TD></TR></TABLE>>,
        likec4_id=t2w7re,
        minlen=1,
        style=dotted,
        weight=3];
    ethernet -> bridge [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1 + taggedゲスト / 配線ポート未確定</FONT></TD></TR></TABLE>>,
        likec4_id="18wjci8",
        style=dotted];
    ethernet -> bridge_1 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1 + taggedゲスト / 配線ポート未確定</FONT></TD></TR></TABLE>>,
        likec4_id="1twtm5h",
        style=dotted];
    switch -> unifi [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">UniFiで管理</FONT></TD></TR></TABLE>>,
        likec4_id="7xo2xh",
        minlen=1,
        style=dashed];
    bridge -> lan [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=dvixeq,
        style=dotted];
    bridge_1 -> lan [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=yjffyv,
        style=dotted];
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
            likec4_id="premises.hardware.x570.bridge",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        bridge_1 [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">enp6s0 / vmbr0</FONT>>,
            likec4_id="premises.hardware.b550m.bridge",
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
    switch -> dns [style=invis];
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
        likec4_id="1vhqdqh",
        style=dotted,
        weight=2];
    bridge -> client [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Windows VM tag30</FONT></TD></TR></TABLE>>,
        likec4_id="1kz3ln9",
        style=dotted];
    bridge_1 -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM・LXC tag20</FONT></TD></TR></TABLE>>,
        likec4_id=b24en0,
        style=dotted,
        weight=2];
    bridge_1 -> iot [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">kiosk VM tag40</FONT></TD></TR></TABLE>>,
        likec4_id=qptpuz,
        style=dotted];
}
`;case`home_workloads`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=home_workloads,
        nodesep=0.695,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=0.973,
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
    coupon_manager [height=1.389,
        label=<<FONT POINT-SIZE="20">Coupon Manager</FONT>>,
        likec4_id="premises.home.apps.coupon_manager",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    loockit [height=1.389,
        label=<<FONT POINT-SIZE="20">Loockit</FONT>>,
        likec4_id="premises.home.apps.loockit",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    coupon_manager -> loockit [style=invis];
    magic_mirror [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">MagicMirror</FONT>>,
        likec4_id="premises.home.apps.magic_mirror",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    loockit -> magic_mirror [style=invis];
    wol [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Wake-on-LAN</FONT>>,
        likec4_id="premises.home.apps.wol",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    magic_mirror -> wol [style=invis];
    access [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare Access / 共通の認証入口</FONT>>,
        likec4_id="external.edge.access",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
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
        minlen=1,
        style=solid,
        weight=5];
    nextcloud [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
        likec4_id="premises.home.nextcloud",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    tunnel -> nextcloud [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 公開UI・サービス</FONT></TD></TR></TABLE>>,
        likec4_id="19w70gz",
        minlen=1,
        style=dashed];
    recording [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">録画・配信</FONT>>,
        likec4_id="premises.home.recording",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    tunnel -> recording [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 公開UI・サービス</FONT></TD></TR></TABLE>>,
        likec4_id=n4ibco,
        style=dashed];
    annict_scraper [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Annict scraper</FONT>>,
        likec4_id="premises.home.apps.annict_scraper",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    recording -> annict_scraper [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">番組照合</FONT></TD></TR></TABLE>>,
        likec4_id=qsn8db,
        minlen=1,
        style=dashed,
        weight=4];
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
        rankdir=TB,
        ranksep=0.973,
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
    subgraph cluster_dns {
        graph [color="#2d333d",
            fillcolor="#3e4651",
            label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>内部DNS / METALLB</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.home.dns",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        coredns [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">CoreDNS / miutaku.internal</FONT>>,
            likec4_id="premises.home.dns.coredns",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        metallb [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">MetalLB / LANのService IP</FONT>>,
            likec4_id="premises.home.dns.metallb",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
    }
    descheduler [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">descheduler</FONT>>,
        likec4_id="premises.home.platform.descheduler",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    cloudflared [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">cloudflared / 自宅connector</FONT>>,
        likec4_id="premises.home.platform.cloudflared",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    descheduler -> cloudflared [style=invis];
    api [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Kubernetes API / Lease</FONT>>,
        likec4_id="premises.home.platform.api",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    cloudflared -> api [style=invis];
    controlplane [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">home-k8s control-plane</FONT>>,
        likec4_id="premises.home.platform.controlplane",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    api -> controlplane [style=invis];
    worker [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">home-k8s worker</FONT>>,
        likec4_id="premises.home.platform.worker",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    nd_cluster_dns [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">CoreDNS / cluster.local</FONT>>,
        likec4_id="premises.home.platform.cluster_dns",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    worker -> nd_cluster_dns [style=invis];
    flannel [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Flannel / CNI</FONT>>,
        likec4_id="premises.home.platform.flannel",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    nd_cluster_dns -> flannel [style=invis];
    kube_proxy [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">kube-proxy / Service routing</FONT>>,
        likec4_id="premises.home.platform.kube_proxy",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    flannel -> kube_proxy [style=invis];
    metrics_server [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">metrics-server / Metrics API</FONT>>,
        likec4_id="premises.home.platform.metrics_server",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    cert_approver [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">kubelet-serving-cert-approver</FONT>>,
        likec4_id="premises.home.platform.cert_approver",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    metrics_server -> cert_approver [style=invis];
    cert_approver -> coredns [style=invis];
    coredns -> metallb [style=invis];
    eso [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
        likec4_id="premises.home.eso",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    argo [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
        likec4_id="premises.management.argo",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    eso -> argo [style=invis];
    runner [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">ARC / 共用のrunner制御基盤</FONT>>,
        likec4_id="premises.management.runner",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    argo -> runner [style=invis];
    tfc_agents [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Terraform Cloud agents / 自宅</FONT>>,
        likec4_id="premises.management.tfc_agents",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    runner -> tfc_agents [style=invis];
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
<svg width="797pt" height="610pt"
 viewBox="0.00 0.00 797.00 610.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 595.08)">
<!-- agent -->
<g id="node1" class="node">
<title>agent</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="225.03,-580.03 45.03,-580.03 45.03,-480.02 225.03,-480.02 225.03,-580.03"/>
<text xml:space="preserve" text-anchor="start" x="85.02" y="-522.03" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅監視基盤</text>
</g>
<!-- platform -->
<g id="node2" class="node">
<title>platform</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="227.84,-420.02 42.23,-420.02 42.23,-320.02 227.84,-320.02 227.84,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="52.23" y="-362.02" font-family="Arial" font-size="20.00" fill="#f8fafc">クラスタ基盤 / Talos</text>
</g>
<!-- recording -->
<g id="node3" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="225.03,-260.02 45.03,-260.02 45.03,-160.01 225.03,-160.01 225.03,-260.02"/>
<text xml:space="preserve" text-anchor="start" x="93.36" y="-202.01" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信</text>
</g>
<!-- apps -->
<g id="node4" class="node">
<title>apps</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="270.06,-100.01 0,-100.01 0,0 270.06,0 270.06,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ワークロード / 基盤の利用側</text>
</g>
<!-- dns -->
<g id="node5" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="503.84,-580.03 318.22,-580.03 318.22,-480.02 503.84,-480.02 503.84,-580.03"/>
<text xml:space="preserve" text-anchor="start" x="328.23" y="-522.03" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- eso -->
<g id="node6" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="536.65,-420.02 285.42,-420.02 285.42,-320.02 536.65,-320.02 536.65,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="295.43" y="-362.02" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- nextcloud -->
<g id="node7" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="501.03,-260.02 321.03,-260.02 321.03,-160.01 501.03,-160.01 501.03,-260.02"/>
<text xml:space="preserve" text-anchor="start" x="366.56" y="-202.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- databases -->
<g id="node8" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="501.61,-100.01 320.45,-100.01 320.45,0 501.61,0 501.61,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="330.46" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- backups -->
<g id="node9" class="node">
<title>backups</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="767.03,-580.03 587.03,-580.03 587.03,-480.02 767.03,-480.02 767.03,-580.03"/>
<text xml:space="preserve" text-anchor="start" x="610.35" y="-522.03" font-family="Arial" font-size="20.00" fill="#f8fafc">バックアップ処理</text>
</g>
<!-- management -->
<g id="node10" class="node">
<title>management</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="767.03,-420.02 587.03,-420.02 587.03,-320.02 767.03,-320.02 767.03,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="602.02" y="-362.02" font-family="Arial" font-size="20.00" fill="#ffe0c2">自宅基盤の構成管理</text>
</g>
<!-- agent&#45;&gt;platform -->
<!-- platform&#45;&gt;recording -->
<!-- recording&#45;&gt;apps -->
<!-- dns&#45;&gt;eso -->
<!-- eso&#45;&gt;nextcloud -->
<!-- nextcloud&#45;&gt;databases -->
<!-- backups&#45;&gt;management -->
</g>
</svg>
`;case`access`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2320pt" height="1125pt"
 viewBox="0.00 0.00 2320.00 1125.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1110.3)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#1c417d" stroke="#1c356c" points="371.57,-291.25 371.57,-858.25 1745.86,-858.25 1745.86,-291.25 371.57,-291.25"/>
<text xml:space="preserve" text-anchor="start" x="379.57" y="-845.35" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_edge</title>
<polygon fill="#51321f" stroke="#3f2717" points="403.57,-323.25 403.57,-805.25 1713.86,-805.25 1713.86,-323.25 403.57,-323.25"/>
<text xml:space="preserve" text-anchor="start" x="411.57" y="-792.35" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_routes</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1371.54,-363.25 1371.54,-744.25 1673.86,-744.25 1673.86,-363.25 1371.54,-363.25"/>
<text xml:space="preserve" text-anchor="start" x="1379.54" y="-731.35" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">公開HOSTNAME / 設定から抽出</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1400.7,-98.25 1400.7,-283.25 1644.7,-283.25 1644.7,-98.25 1400.7,-98.25"/>
<text xml:space="preserve" text-anchor="start" x="1408.7" y="-270.35" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1861.21,-203.25 1861.21,-1087.25 2281.94,-1087.25 2281.94,-203.25 1861.21,-203.25"/>
<text xml:space="preserve" text-anchor="start" x="1869.21" y="-1074.35" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1901.21,-841.25 1901.21,-1026.25 2241.94,-1026.25 2241.94,-841.25 1901.21,-841.25"/>
<text xml:space="preserve" text-anchor="start" x="1909.21" y="-1013.35" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_management</title>
<polygon fill="#5a3620" stroke="#462a17" points="1949.58,-616.25 1949.58,-801.25 2193.58,-801.25 2193.58,-616.25 1949.58,-616.25"/>
<text xml:space="preserve" text-anchor="start" x="1957.58" y="-788.35" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">自宅基盤の構成管理</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1949.58,-391.25 1949.58,-576.25 2193.58,-576.25 2193.58,-391.25 1949.58,-391.25"/>
<text xml:space="preserve" text-anchor="start" x="1957.58" y="-563.35" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<!-- protected -->
<g id="node1" class="node">
<title>protected</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1633.86,-683.25 1411.54,-683.25 1411.54,-583.24 1633.86,-583.24 1633.86,-683.25"/>
<text xml:space="preserve" text-anchor="start" x="1421.55" y="-625.25" font-family="Arial" font-size="20.00" fill="#f8fafc">Access保護のhostname</text>
</g>
<!-- exceptions -->
<g id="node2" class="node">
<title>exceptions</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1617.17,-503.25 1428.23,-503.25 1428.23,-403.24 1617.17,-403.24 1617.17,-503.25"/>
<text xml:space="preserve" text-anchor="start" x="1438.24" y="-445.25" font-family="Arial" font-size="20.00" fill="#f8fafc">例外 / mTLS専用API</text>
</g>
<!-- access -->
<g id="node3" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="758.13,-723.25 443.57,-723.25 443.57,-623.24 758.13,-623.24 758.13,-723.25"/>
<text xml:space="preserve" text-anchor="start" x="453.58" y="-665.25" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- mtls -->
<g id="node4" class="node">
<title>mtls</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="703.66,-543.25 498.04,-543.25 498.04,-443.24 703.66,-443.24 703.66,-543.25"/>
<text xml:space="preserve" text-anchor="start" x="508.05" y="-485.25" font-family="Arial" font-size="20.00" fill="#f8fafc">mTLS / 専用APIの例外</text>
</g>
<!-- tunnel -->
<g id="node5" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1220.72,-683.25 1040.72,-683.25 1040.72,-583.24 1220.72,-583.24 1220.72,-683.25"/>
<text xml:space="preserve" text-anchor="start" x="1051.79" y="-625.25" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- reventer -->
<g id="node6" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1612.7,-230.25 1432.7,-230.25 1432.7,-130.24 1612.7,-130.24 1612.7,-230.25"/>
<text xml:space="preserve" text-anchor="start" x="1477.68" y="-172.25" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- nas -->
<g id="node7" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2209.94,-964.16C2209.94,-969.18 2147.92,-973.25 2071.58,-973.25 1995.23,-973.25 1933.21,-969.18 1933.21,-964.16 1933.21,-964.16 1933.21,-882.34 1933.21,-882.34 1933.21,-877.32 1995.23,-873.24 2071.58,-873.24 2147.92,-873.24 2209.94,-877.32 2209.94,-882.34 2209.94,-882.34 2209.94,-964.16 2209.94,-964.16"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2209.94,-964.16C2209.94,-959.14 2147.92,-955.07 2071.58,-955.07 1995.23,-955.07 1933.21,-959.14 1933.21,-964.16"/>
<text xml:space="preserve" text-anchor="start" x="1943.22" y="-915.25" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- argo -->
<g id="node8" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2161.58,-748.25 1981.58,-748.25 1981.58,-648.24 2161.58,-648.24 2161.58,-748.25"/>
<text xml:space="preserve" text-anchor="start" x="2019.34" y="-690.25" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- network -->
<g id="node9" class="node">
<title>network</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2161.58,-523.25 1981.58,-523.25 1981.58,-423.24 2161.58,-423.24 2161.58,-523.25"/>
<text xml:space="preserve" text-anchor="start" x="2004.9" y="-465.25" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- home -->
<g id="node10" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2161.58,-343.25 1981.58,-343.25 1981.58,-243.24 2161.58,-243.24 2161.58,-343.25"/>
<text xml:space="preserve" text-anchor="start" x="1994.88" y="-285.25" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- user -->
<g id="node11" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-723.25 0,-723.25 0,-623.24 180,-623.24 180,-723.25"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-665.25" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- operator -->
<g id="node12" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-903.25 0,-903.25 0,-803.24 180,-803.24 180,-903.25"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-845.25" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- client -->
<g id="node13" class="node">
<title>client</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-543.25 0,-543.25 0,-443.24 180,-443.24 180,-543.25"/>
<text xml:space="preserve" text-anchor="start" x="23.32" y="-485.25" font-family="Arial" font-size="20.00" fill="#f8fafc">専用クライアント</text>
</g>
<!-- protected&#45;&gt;nas -->
<g id="edge10" class="edge">
<title>protected&#45;&gt;nas</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1610.05,-683.06C1677.82,-721.74 1774.84,-776.19 1861.21,-821.25 1892.29,-837.46 1926.33,-854.39 1957.76,-869.69"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1956.37,-871.93 1964.26,-872.85 1958.67,-867.21 1956.37,-871.93"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-816.45 1753.86,-839.25 1853.21,-839.25 1853.21,-816.45 1753.86,-816.45"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-822.25" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;argo -->
<g id="edge11" class="edge">
<title>protected&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.71,-646.32C1732.57,-658.07 1876.45,-675.17 1971.72,-686.5"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1971.18,-689.08 1978.93,-687.36 1971.79,-683.86 1971.18,-689.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-671.57 1753.86,-694.37 1853.21,-694.37 1853.21,-671.57 1753.86,-671.57"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-677.37" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;network -->
<g id="edge12" class="edge">
<title>protected&#45;&gt;network</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.71,-601.06C1732.67,-572.11 1876.74,-529.96 1972.01,-502.09"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1972.57,-504.66 1979.03,-500.03 1971.1,-499.62 1972.57,-504.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-565.21 1753.86,-588.01 1853.21,-588.01 1853.21,-565.21 1753.86,-565.21"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-571.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;home -->
<g id="edge9" class="edge">
<title>protected&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1633.79,-612.44C1674.76,-599.25 1718.01,-577.86 1745.86,-543.25 1759.09,-526.81 1744.89,-515.55 1753.86,-496.45 1785.02,-430.1 1801.11,-413.2 1861.21,-371.25 1894.36,-348.12 1935.2,-330.9 1971.99,-318.6"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1972.55,-321.18 1978.86,-316.36 1970.92,-316.19 1972.55,-321.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1777.2,-496.45 1777.2,-519.25 1829.88,-519.25 1829.88,-496.45 1777.2,-496.45"/>
<text xml:space="preserve" text-anchor="start" x="1780.2" y="-502.25" font-family="Arial" font-size="14.00" fill="#bbfcd3">内部接続</text>
</g>
<!-- exceptions&#45;&gt;home -->
<g id="edge13" class="edge">
<title>exceptions&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1593.98,-403.34C1637.83,-374.89 1696.64,-341.42 1753.86,-323.45 1824.37,-301.31 1907.7,-294.06 1971.18,-292.19"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1971.13,-294.81 1978.56,-292 1971,-289.57 1971.13,-294.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1777.2,-323.45 1777.2,-346.25 1829.88,-346.25 1829.88,-323.45 1777.2,-323.45"/>
<text xml:space="preserve" text-anchor="start" x="1780.2" y="-329.25" font-family="Arial" font-size="14.00" fill="#bbfcd3">内部接続</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge4" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M758.09,-661.41C846.39,-654.72 954.11,-646.56 1030.79,-640.74"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1030.63,-643.39 1037.91,-640.21 1030.24,-638.15 1030.63,-643.39"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="838.86,-656.83 838.86,-679.63 959.99,-679.63 959.99,-656.83 838.86,-656.83"/>
<text xml:space="preserve" text-anchor="start" x="841.86" y="-662.63" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- mtls&#45;&gt;tunnel -->
<g id="edge5" class="edge">
<title>mtls&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M703.63,-520.24C798.01,-545.27 937.55,-582.28 1030.96,-607.05"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1030.13,-609.55 1038.05,-608.94 1031.48,-604.48 1030.13,-609.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="808.13,-595.7 808.13,-618.5 990.72,-618.5 990.72,-595.7 808.13,-595.7"/>
<text xml:space="preserve" text-anchor="start" x="811.13" y="-601.5" font-family="Arial" font-size="14.00" fill="#cbd0fd">mTLS検証済みのAPIリクエスト</text>
</g>
<!-- tunnel&#45;&gt;protected -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;protected</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1220.7,-633.25C1274.25,-633.25 1343.12,-633.25 1401.47,-633.25"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1401.33,-635.87 1408.83,-633.25 1401.33,-630.62 1401.33,-635.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-633.25 1270.72,-656.05 1361.54,-656.05 1361.54,-633.25 1270.72,-633.25"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-639.05" font-family="Arial" font-size="14.00" fill="#c9c9c9">hostname転送</text>
</g>
<!-- tunnel&#45;&gt;exceptions -->
<g id="edge7" class="edge">
<title>tunnel&#45;&gt;exceptions</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1220.7,-592.18C1279.72,-564.94 1357.35,-529.11 1418.99,-500.66"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1419.89,-503.13 1425.6,-497.6 1417.69,-498.36 1419.89,-503.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-564.66 1270.72,-587.46 1361.54,-587.46 1361.54,-564.66 1270.72,-564.66"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-570.46" font-family="Arial" font-size="14.00" fill="#bbfcd3">hostname転送</text>
</g>
<!-- tunnel&#45;&gt;reventer -->
<g id="edge8" class="edge">
<title>tunnel&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1171.67,-583.32C1218.63,-524.99 1299.36,-425.93 1371.54,-343.25 1402.68,-307.58 1438.59,-268.53 1467.48,-237.6"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1469.39,-239.4 1472.6,-232.13 1465.56,-235.81 1469.39,-239.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-461.45 1270.72,-484.25 1361.54,-484.25 1361.54,-461.45 1270.72,-461.45"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-467.25" font-family="Arial" font-size="14.00" fill="#cbd0fd">hostname転送</text>
</g>
<!-- home&#45;&gt;tunnel -->
<g id="edge14" class="edge">
<title>home&#45;&gt;tunnel</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M2023.49,-243.27C1964.91,-185.12 1858.77,-92.37 1745.86,-55.45 1587.74,-3.74 1509.9,36.93 1371.54,-55.45 1194.03,-173.97 1147.73,-451.02 1135.8,-573.37"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1133.2,-572.94 1135.12,-580.65 1138.43,-573.42 1133.2,-572.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1469.13,-55.45 1469.13,-78.25 1576.28,-78.25 1576.28,-55.45 1469.13,-55.45"/>
<text xml:space="preserve" text-anchor="start" x="1472.13" y="-61.25" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きTunnel接続</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-673.25C249.73,-673.25 348.9,-673.25 433.34,-673.25"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="433.3,-675.87 440.8,-673.25 433.3,-670.62 433.3,-675.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-673.25 230,-696.05 363.57,-696.05 363.57,-673.25 230,-673.25"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-679.05" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-821.79C254.07,-795.57 361.33,-757.62 448.89,-726.65"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="449.6,-729.18 455.79,-724.21 447.85,-724.23 449.6,-729.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-802.53 230,-825.33 363.57,-825.33 363.57,-802.53 230,-802.53"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-808.33" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
<!-- client&#45;&gt;mtls -->
<g id="edge3" class="edge">
<title>client&#45;&gt;mtls</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-493.25C265.6,-493.25 395.5,-493.25 488.12,-493.25"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="487.84,-495.87 495.34,-493.25 487.84,-490.62 487.84,-495.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="241.28,-493.25 241.28,-516.05 352.3,-516.05 352.3,-493.25 241.28,-493.25"/>
<text xml:space="preserve" text-anchor="start" x="244.28" y="-499.05" font-family="Arial" font-size="14.00" fill="#bbfcd3">クライアント証明書</text>
</g>
</g>
</svg>
`;case`delivery`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2455pt" height="1007pt"
 viewBox="0.00 0.00 2455.00 1007.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 992.28)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="670,-8 670,-534.42 2417,-534.42 2417,-8 670,-8"/>
<text xml:space="preserve" text-anchor="start" x="678" y="-521.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_management</title>
<polygon fill="#5a3620" stroke="#462a17" points="710,-272.01 710,-473.22 2377,-473.22 2377,-272.01 710,-272.01"/>
<text xml:space="preserve" text-anchor="start" x="718" y="-460.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">自宅基盤の構成管理</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1520,-48 1520,-233.21 1764,-233.21 1764,-48 1520,-48"/>
<text xml:space="preserve" text-anchor="start" x="1528" y="-220.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust4" class="cluster">
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
<!-- ansible -->
<g id="node2" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1170,-412.02 990,-412.02 990,-312.01 1170,-312.01 1170,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="1047.2" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- packer -->
<g id="node3" class="node">
<title>packer</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1441.6,-412.02 1230.4,-412.02 1230.4,-312.01 1441.6,-312.01 1441.6,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="1240.41" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Packer / VM template</text>
</g>
<!-- argo -->
<g id="node4" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2023,-412.02 1843,-412.02 1843,-312.01 2023,-312.01 2023,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="1880.76" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- runner -->
<g id="node5" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2336.71,-412.02 2083.29,-412.02 2083.29,-312.01 2336.71,-312.01 2336.71,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="2093.3" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 共用のrunner制御基盤</text>
</g>
<!-- tfc_agents -->
<g id="node6" class="node">
<title>tfc_agents</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1782.61,-412.02 1501.39,-412.02 1501.39,-312.01 1782.61,-312.01 1782.61,-412.02"/>
<text xml:space="preserve" text-anchor="start" x="1511.39" y="-354.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud agents / 自宅</text>
</g>
<!-- network -->
<g id="node7" class="node">
<title>network</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1732,-180.01 1552,-180.01 1552,-80 1732,-80 1732,-180.01"/>
<text xml:space="preserve" text-anchor="start" x="1575.32" y="-122" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- home -->
<g id="node8" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2023,-180.01 1843,-180.01 1843,-80 2023,-80 2023,-180.01"/>
<text xml:space="preserve" text-anchor="start" x="1856.31" y="-122" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
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
<!-- ansible&#45;&gt;network -->
<g id="edge1" class="edge">
<title>ansible&#45;&gt;network</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1137.89,-312.09C1156.82,-297.76 1178.53,-283.01 1200,-272.01 1298.96,-221.31 1419.71,-184.29 1509.98,-160.93"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1510.46,-163.52 1517.07,-159.12 1509.16,-158.44 1510.46,-163.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.47,-218.74 1270.47,-241.54 1323.14,-241.54 1323.14,-218.74 1270.47,-218.74"/>
<text xml:space="preserve" text-anchor="start" x="1273.47" y="-224.54" font-family="Arial" font-size="14.00" fill="#cbd0fd">機器設定</text>
</g>
<!-- packer&#45;&gt;network -->
<g id="edge2" class="edge">
<title>packer&#45;&gt;network</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1400.89,-312.23C1433.23,-287.93 1473.52,-257.64 1511.85,-228.83"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1513.16,-231.13 1517.58,-224.52 1510.01,-226.93 1513.16,-231.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1375.77,-267.54 1375.77,-290.34 1460.35,-290.34 1460.35,-267.54 1375.77,-267.54"/>
<text xml:space="preserve" text-anchor="start" x="1378.77" y="-273.34" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM template</text>
</g>
<!-- argo&#45;&gt;home -->
<g id="edge9" class="edge">
<title>argo&#45;&gt;home</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1933,-312.23C1933,-276.55 1933,-227.98 1933,-190.09"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1935.63,-190.24 1933,-182.74 1930.38,-190.24 1935.63,-190.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1933,-241.21 1933,-264.01 2015.25,-264.01 2015.25,-241.21 1933,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="1936" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期</text>
</g>
<!-- tfc_agents&#45;&gt;network -->
<g id="edge10" class="edge">
<title>tfc_agents&#45;&gt;network</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1642,-312.23C1642,-292.04 1642,-267.72 1642,-243.55"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1644.63,-243.73 1642,-236.23 1639.38,-243.73 1644.63,-243.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1533.32,-272.8 1533.32,-295.6 1642,-295.6 1642,-272.8 1533.32,-272.8"/>
<text xml:space="preserve" text-anchor="start" x="1536.32" y="-278.6" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM / ネットワーク</text>
</g>
<!-- github&#45;&gt;argo -->
<g id="edge5" class="edge">
<title>github&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M570.47,-856.39C819.28,-849.67 1415.59,-804.33 1813,-534.42 1854.45,-506.26 1886.07,-458.68 1906.42,-420.79"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1908.53,-422.42 1909.69,-414.56 1903.88,-419.98 1908.53,-422.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1687.79,-643.82 1687.79,-666.62 1737.36,-666.62 1737.36,-643.82 1687.79,-643.82"/>
<text xml:space="preserve" text-anchor="start" x="1690.79" y="-649.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- github&#45;&gt;runner -->
<g id="edge6" class="edge">
<title>github&#45;&gt;runner</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M570.56,-849.96C846.05,-832.07 1534.64,-780.98 1752,-705.22 1897.25,-654.6 1932.69,-630.26 2053,-534.42 2095.25,-500.75 2136.25,-455.42 2165.75,-419.84"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2167.58,-421.74 2170.32,-414.28 2163.53,-418.4 2167.58,-421.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1959.49,-643.82 1959.49,-666.62 2033.98,-666.62 2033.98,-643.82 1959.49,-643.82"/>
<text xml:space="preserve" text-anchor="start" x="1962.49" y="-649.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">Actions job</text>
</g>
<!-- github&#45;&gt;terraform_cloud -->
<g id="edge3" class="edge">
<title>github&#45;&gt;terraform_cloud</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M377.86,-808.16C331.36,-778.71 272.05,-741.14 224.04,-710.72"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="225.51,-708.55 217.77,-706.75 222.7,-712.98 225.51,-708.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="306,-745.22 306,-768.02 396.79,-768.02 396.79,-745.22 306,-745.22"/>
<text xml:space="preserve" text-anchor="start" x="309" y="-751.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">Terraform実行</text>
</g>
<!-- github&#45;&gt;github_pages -->
<g id="edge4" class="edge">
<title>github&#45;&gt;github_pages</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M455,-808.16C455,-780.12 455,-744.73 455,-715.15"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="457.63,-715.48 455,-707.98 452.38,-715.48 457.63,-715.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="455,-745.22 455,-768.02 585.47,-768.02 585.47,-745.22 455,-745.22"/>
<text xml:space="preserve" text-anchor="start" x="458" y="-751.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">構成図・PR比較を公開</text>
</g>
<!-- terraform_cloud&#45;&gt;tfc_agents -->
<g id="edge8" class="edge">
<title>terraform_cloud&#45;&gt;tfc_agents</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M227.76,-614.08C237.82,-610.63 248.03,-607.57 258,-605.22 618.46,-520.22 718.99,-560.24 1088.91,-542.42 1110.17,-541.39 1452.44,-542.81 1472,-534.42 1527.02,-510.82 1573.57,-460.19 1603.97,-420.04"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1606.03,-421.66 1608.4,-414.08 1601.82,-418.53 1606.03,-421.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1088.91,-542.42 1088.91,-565.22 1291,-565.22 1291,-542.42 1088.91,-542.42"/>
<text xml:space="preserve" text-anchor="start" x="1091.91" y="-548.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">workspace runを自宅agentで実行</text>
</g>
<!-- terraform_cloud&#45;&gt;edge -->
<g id="edge7" class="edge">
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
<svg width="1454pt" height="1307pt"
 viewBox="0.00 0.00 1454.00 1307.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1292.05)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#454545" stroke="#313131" points="8,-8 8,-1269 1416.33,-1269 1416.33,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1256.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅 / PROXMOX2ホスト・RPI</text>
</g>
<!-- x570 -->
<g id="node1" class="node">
<title>x570</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="442.31,-238 122.27,-238 122.27,-58 442.31,-58 442.31,-238"/>
<text xml:space="preserve" text-anchor="start" x="241.15" y="-140" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;x570</text>
</g>
<!-- b550m -->
<g id="node2" class="node">
<title>b550m</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="442.31,-478 122.27,-478 122.27,-298 442.31,-298 442.31,-478"/>
<text xml:space="preserve" text-anchor="start" x="232.26" y="-380" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;b550m</text>
</g>
<!-- worker_pi1 -->
<g id="node3" class="node">
<title>worker_pi1</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="445.75,-718 118.83,-718 118.83,-538 445.75,-538 445.75,-718"/>
<text xml:space="preserve" text-anchor="start" x="171.13" y="-640" font-family="Arial" font-size="20.00" fill="#fafafa">RPi / worker03 / VLAN10</text>
<text xml:space="preserve" text-anchor="start" x="138.89" y="-617" font-family="Arial" font-size="15.00" fill="#d4d4d4">Talos OS上のkubelet・containerd。2 VMと2</text>
<text xml:space="preserve" text-anchor="start" x="156.84" y="-599" font-family="Arial" font-size="15.00" fill="#d4d4d4">RPi。アプリPodの固定配置を意味しない。</text>
</g>
<!-- worker_pi2 -->
<g id="node4" class="node">
<title>worker_pi2</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="445.75,-958 118.83,-958 118.83,-778 445.75,-778 445.75,-958"/>
<text xml:space="preserve" text-anchor="start" x="171.13" y="-880" font-family="Arial" font-size="20.00" fill="#fafafa">RPi / worker04 / VLAN10</text>
<text xml:space="preserve" text-anchor="start" x="138.89" y="-857" font-family="Arial" font-size="15.00" fill="#d4d4d4">Talos OS上のkubelet・containerd。2 VMと2</text>
<text xml:space="preserve" text-anchor="start" x="156.84" y="-839" font-family="Arial" font-size="15.00" fill="#d4d4d4">RPi。アプリPodの固定配置を意味しない。</text>
</g>
<!-- talos -->
<g id="node5" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1366.33,-598 731.06,-598 731.06,-418 1366.33,-418 1366.33,-598"/>
<text xml:space="preserve" text-anchor="start" x="1004.79" y="-520" font-family="Arial" font-size="20.00" fill="#eff6ff">home&#45;k8s</text>
<text xml:space="preserve" text-anchor="start" x="908.66" y="-497" font-family="Arial" font-size="15.00" fill="#bfdbfe">左のPVE → VM → Talos OSとRPi上のTalos</text>
<text xml:space="preserve" text-anchor="start" x="751.11" y="-479" font-family="Arial" font-size="15.00" fill="#bfdbfe">OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。</text>
</g>
<!-- network -->
<g id="node6" class="node">
<title>network</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="506.58,-1198 58,-1198 58,-1018 506.58,-1018 506.58,-1198"/>
<text xml:space="preserve" text-anchor="start" x="129.46" y="-1120" font-family="Arial" font-size="20.00" fill="#fafafa">ネットワーク機器 / IX2215・SW・AP</text>
<text xml:space="preserve" text-anchor="start" x="201.43" y="-1097" font-family="Arial" font-size="15.00" fill="#d4d4d4">IX2215・US&#45;8&#45;60W・FS</text>
<text xml:space="preserve" text-anchor="start" x="78.06" y="-1079" font-family="Arial" font-size="15.00" fill="#d4d4d4">AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。</text>
</g>
<!-- x570&#45;&gt;talos -->
<g id="edge1" class="edge">
<title>x570&#45;&gt;talos</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M442.14,-222.81C559.81,-278.23 721.01,-354.15 847.5,-413.72"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="846.29,-416.05 854.19,-416.87 848.52,-411.3 846.29,-416.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="605.32,-338.79 605.32,-361.59 632.31,-361.59 632.31,-338.79 605.32,-338.79"/>
<text xml:space="preserve" text-anchor="start" x="608.32" y="-346.99" font-family="Arial" font-weight="bold" font-size="14.00" fill="#eff5fd">[...]</text>
</g>
<!-- b550m&#45;&gt;talos -->
<g id="edge2" class="edge">
<title>b550m&#45;&gt;talos</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M442.14,-412.94C523.04,-425.64 624.52,-441.57 721.14,-456.74"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="720.57,-459.3 728.39,-457.87 721.39,-454.12 720.57,-459.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="605.32,-451.6 605.32,-474.4 632.31,-474.4 632.31,-451.6 605.32,-451.6"/>
<text xml:space="preserve" text-anchor="start" x="608.32" y="-459.8" font-family="Arial" font-weight="bold" font-size="14.00" fill="#eff5fd">[...]</text>
</g>
<!-- worker_pi1&#45;&gt;talos -->
<g id="edge3" class="edge">
<title>worker_pi1&#45;&gt;talos</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M445.4,-602.55C525.63,-589.96 625.5,-574.28 720.7,-559.33"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="721.09,-561.93 728.09,-558.17 720.27,-556.74 721.09,-561.93"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="546.58,-585.76 546.58,-608.56 691.06,-608.56 691.06,-585.76 546.58,-585.76"/>
<text xml:space="preserve" text-anchor="start" x="549.58" y="-591.56" font-family="Arial" font-size="14.00" fill="#eff5fd">worker / home&#45;k8s所属</text>
</g>
<!-- worker_pi2&#45;&gt;talos -->
<g id="edge4" class="edge">
<title>worker_pi2&#45;&gt;talos</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M445.4,-791.65C562.76,-736.38 722.13,-661.33 847.45,-602.31"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="848.38,-604.77 854.05,-599.2 846.15,-600.02 848.38,-604.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="546.58,-741.28 546.58,-764.08 691.06,-764.08 691.06,-741.28 546.58,-741.28"/>
<text xml:space="preserve" text-anchor="start" x="549.58" y="-747.08" font-family="Arial" font-size="14.00" fill="#eff5fd">worker / home&#45;k8s所属</text>
</g>
</g>
</svg>
`;case`pve_x570`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2726pt" height="710pt"
 viewBox="0.00 0.00 2726.00 710.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 694.46)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#393939" stroke="#292929" points="8,-8 8,-671.41 2688,-671.41 2688,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-658.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅 / PROXMOX2ホスト・RPI</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_x570</title>
<polygon fill="#29472f" stroke="#1c3021" points="58,-293.8 58,-600.21 2638,-600.21 2638,-293.8 58,-293.8"/>
<text xml:space="preserve" text-anchor="start" x="66" y="-587.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PVE&#45;X570</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_cp1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="108,-343.8 108,-529.01 366,-529.01 366,-343.8 108,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="116" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS CONTROLPLANE01 / VM13001</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_worker1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="416,-343.8 416,-529.01 674,-529.01 674,-343.8 416,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="424" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS WORKER01 / VM13004</text>
</g>
<!-- pbs -->
<g id="node1" class="node">
<title>pbs</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M886,-466.72C886,-471.73 845.66,-475.81 796,-475.81 746.34,-475.81 706,-471.73 706,-466.72 706,-466.72 706,-384.89 706,-384.89 706,-379.88 746.34,-375.8 796,-375.8 845.66,-375.8 886,-379.88 886,-384.89 886,-384.89 886,-466.72 886,-466.72"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M886,-466.72C886,-461.7 845.66,-457.62 796,-457.62 746.34,-457.62 706,-461.7 706,-466.72"/>
<text xml:space="preserve" text-anchor="start" x="730.4" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">PBS VM14001</text>
</g>
<!-- lb -->
<g id="node2" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1231.86,-475.81 926.14,-475.81 926.14,-375.8 1231.86,-375.8 1231.86,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="936.14" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived VM10001</text>
</g>
<!-- unifi -->
<g id="node3" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1464.16,-475.81 1271.84,-475.81 1271.84,-375.8 1464.16,-375.8 1464.16,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1281.85" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS VM13201</text>
</g>
<!-- loockit -->
<g id="node4" class="node">
<title>loockit</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1684,-475.81 1504,-475.81 1504,-375.8 1684,-375.8 1684,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1530.63" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">LXC CT12902</text>
</g>
<!-- tuner -->
<g id="node5" class="node">
<title>tuner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1965.61,-475.81 1724.39,-475.81 1724.39,-375.8 1965.61,-375.8 1965.61,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1734.39" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun LXC CT12901</text>
</g>
<!-- windows -->
<g id="node6" class="node">
<title>windows</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2276.08,-475.81 2005.92,-475.81 2005.92,-375.8 2276.08,-375.8 2276.08,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="2015.93" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Windows / VM60000 / tag30</text>
</g>
<!-- nas1 -->
<g id="node7" class="node">
<title>nas1</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M2587.63,-466.72C2587.63,-471.73 2526.84,-475.81 2452,-475.81 2377.16,-475.81 2316.37,-471.73 2316.37,-466.72 2316.37,-466.72 2316.37,-384.89 2316.37,-384.89 2316.37,-379.88 2377.16,-375.8 2452,-375.8 2526.84,-375.8 2587.63,-379.88 2587.63,-384.89 2587.63,-384.89 2587.63,-466.72 2587.63,-466.72"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M2587.63,-466.72C2587.63,-461.7 2526.84,-457.62 2452,-457.62 2377.16,-457.62 2316.37,-461.7 2316.37,-466.72"/>
<text xml:space="preserve" text-anchor="start" x="2326.38" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">TrueNAS VM69001 / nas&#45;01</text>
</g>
<!-- talos -->
<g id="node8" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="334.27,-475.81 139.73,-475.81 139.73,-375.8 334.27,-375.8 334.27,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="149.74" y="-417.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- talos_1 -->
<g id="node9" class="node">
<title>talos_1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="642.27,-475.81 447.73,-475.81 447.73,-375.8 642.27,-375.8 642.27,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="457.74" y="-417.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- talos_2 -->
<g id="node10" class="node">
<title>talos_2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="768.64,-238 133.36,-238 133.36,-58 768.64,-58 768.64,-238"/>
<text xml:space="preserve" text-anchor="start" x="407.09" y="-160" font-family="Arial" font-size="20.00" fill="#eff6ff">home&#45;k8s</text>
<text xml:space="preserve" text-anchor="start" x="310.96" y="-137" font-family="Arial" font-size="15.00" fill="#bfdbfe">左のPVE → VM → Talos OSとRPi上のTalos</text>
<text xml:space="preserve" text-anchor="start" x="153.42" y="-119" font-family="Arial" font-size="15.00" fill="#bfdbfe">OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。</text>
</g>
<!-- talos&#45;&gt;talos_2 -->
<g id="edge1" class="edge">
<title>talos&#45;&gt;talos_2</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M247.87,-375.94C257.21,-341.84 273.25,-296.6 298.59,-263 303.1,-257.01 308.01,-251.19 313.21,-245.56"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="315.08,-247.4 318.38,-240.17 311.3,-243.77 315.08,-247.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="298.59,-263 298.59,-285.8 482,-285.8 482,-263 298.59,-263"/>
<text xml:space="preserve" text-anchor="start" x="301.59" y="-268.8" font-family="Arial" font-size="14.00" fill="#eff5fd">control&#45;plane / home&#45;k8s所属</text>
</g>
<!-- talos_1&#45;&gt;talos_2 -->
<g id="edge2" class="edge">
<title>talos_1&#45;&gt;talos_2</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M528.3,-375.81C516.21,-340.34 499.46,-291.18 484.64,-247.7"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="487.19,-247.05 482.29,-240.8 482.22,-248.75 487.19,-247.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="495.18,-263 495.18,-285.8 639.66,-285.8 639.66,-263 495.18,-263"/>
<text xml:space="preserve" text-anchor="start" x="498.18" y="-268.8" font-family="Arial" font-size="14.00" fill="#eff5fd">worker / home&#45;k8s所属</text>
</g>
</g>
</svg>
`;case`pve_b550m`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2840pt" height="710pt"
 viewBox="0.00 0.00 2840.00 710.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 694.46)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#393939" stroke="#292929" points="8,-8 8,-671.41 2802,-671.41 2802,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-658.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅 / PROXMOX2ホスト・RPI</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_b550m</title>
<polygon fill="#29472f" stroke="#1c3021" points="58,-293.8 58,-600.21 2752,-600.21 2752,-293.8 58,-293.8"/>
<text xml:space="preserve" text-anchor="start" x="66" y="-587.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PVE&#45;B550M</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_cp2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="108,-343.8 108,-529.01 366,-529.01 366,-343.8 108,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="116" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS CONTROLPLANE02 / VM13002</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_cp3</title>
<polygon fill="#3e4651" stroke="#2d333d" points="416,-343.8 416,-529.01 674,-529.01 674,-343.8 416,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="424" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS CONTROLPLANE03 / VM13003</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_worker2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="724,-343.8 724,-529.01 982,-529.01 982,-343.8 724,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="732" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS WORKER02 / VM13005</text>
</g>
<!-- lb -->
<g id="node1" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1319.86,-475.81 1014.14,-475.81 1014.14,-375.8 1319.86,-375.8 1319.86,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1024.14" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived VM10002</text>
</g>
<!-- dev -->
<g id="node2" class="node">
<title>dev</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1548.49,-475.81 1359.51,-475.81 1359.51,-375.8 1548.49,-375.8 1548.49,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1369.52" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">開発アプリVM40000</text>
</g>
<!-- kiosk -->
<g id="node3" class="node">
<title>kiosk</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1841.73,-475.81 1588.27,-475.81 1588.27,-375.8 1841.73,-375.8 1841.73,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1598.28" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">DisplayLink kiosk VM5000</text>
</g>
<!-- loockit -->
<g id="node4" class="node">
<title>loockit</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2062,-475.81 1882,-475.81 1882,-375.8 2062,-375.8 2062,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1908.63" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">LXC CT12903</text>
</g>
<!-- tuner -->
<g id="node5" class="node">
<title>tuner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2389.95,-475.81 2102.05,-475.81 2102.05,-375.8 2389.95,-375.8 2389.95,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="2112.06" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun STG LXC CT12904</text>
</g>
<!-- nas2 -->
<g id="node6" class="node">
<title>nas2</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M2701.63,-466.72C2701.63,-471.73 2640.84,-475.81 2566,-475.81 2491.16,-475.81 2430.37,-471.73 2430.37,-466.72 2430.37,-466.72 2430.37,-384.89 2430.37,-384.89 2430.37,-379.88 2491.16,-375.8 2566,-375.8 2640.84,-375.8 2701.63,-379.88 2701.63,-384.89 2701.63,-384.89 2701.63,-466.72 2701.63,-466.72"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M2701.63,-466.72C2701.63,-461.7 2640.84,-457.62 2566,-457.62 2491.16,-457.62 2430.37,-461.7 2430.37,-466.72"/>
<text xml:space="preserve" text-anchor="start" x="2440.38" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">TrueNAS VM69002 / nas&#45;02</text>
</g>
<!-- talos -->
<g id="node7" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="334.27,-475.81 139.73,-475.81 139.73,-375.8 334.27,-375.8 334.27,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="149.74" y="-417.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- talos_1 -->
<g id="node8" class="node">
<title>talos_1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="642.27,-475.81 447.73,-475.81 447.73,-375.8 642.27,-375.8 642.27,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="457.74" y="-417.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- talos_2 -->
<g id="node9" class="node">
<title>talos_2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="950.27,-475.81 755.73,-475.81 755.73,-375.8 950.27,-375.8 950.27,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="765.74" y="-417.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- talos_3 -->
<g id="node10" class="node">
<title>talos_3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="862.64,-238 227.36,-238 227.36,-58 862.64,-58 862.64,-238"/>
<text xml:space="preserve" text-anchor="start" x="501.09" y="-160" font-family="Arial" font-size="20.00" fill="#eff6ff">home&#45;k8s</text>
<text xml:space="preserve" text-anchor="start" x="404.96" y="-137" font-family="Arial" font-size="15.00" fill="#bfdbfe">左のPVE → VM → Talos OSとRPi上のTalos</text>
<text xml:space="preserve" text-anchor="start" x="247.42" y="-119" font-family="Arial" font-size="15.00" fill="#bfdbfe">OSの計7ノードで構成。namespaceはクラスタ所属であり、物理ホストへ固定配置するものではない。</text>
</g>
<!-- talos&#45;&gt;talos_3 -->
<g id="edge1" class="edge">
<title>talos&#45;&gt;talos_3</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M263.97,-376.07C284.73,-341.6 315.86,-295.86 351.59,-263 358.69,-256.47 366.22,-250.14 374.04,-244.02"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="375.18,-246.46 379.55,-239.82 371.99,-242.29 375.18,-246.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="351.59,-263 351.59,-285.8 535,-285.8 535,-263 351.59,-263"/>
<text xml:space="preserve" text-anchor="start" x="354.59" y="-268.8" font-family="Arial" font-size="14.00" fill="#eff5fd">control&#45;plane / home&#45;k8s所属</text>
</g>
<!-- talos_1&#45;&gt;talos_3 -->
<g id="edge2" class="edge">
<title>talos_1&#45;&gt;talos_3</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M545,-375.81C545,-340.49 545,-291.59 545,-248.24"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="547.63,-248.46 545,-240.96 542.38,-248.46 547.63,-248.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="545,-263 545,-285.8 728.41,-285.8 728.41,-263 545,-263"/>
<text xml:space="preserve" text-anchor="start" x="548" y="-268.8" font-family="Arial" font-size="14.00" fill="#eff5fd">control&#45;plane / home&#45;k8s所属</text>
</g>
<!-- talos_2&#45;&gt;talos_3 -->
<g id="edge3" class="edge">
<title>talos_2&#45;&gt;talos_3</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M825.89,-376.09C805.03,-341.63 773.78,-295.88 738,-263 730.8,-256.38 723.16,-249.97 715.22,-243.78"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="717.16,-241.96 709.6,-239.5 713.98,-246.13 717.16,-241.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="757.01,-263 757.01,-285.8 901.49,-285.8 901.49,-263 757.01,-263"/>
<text xml:space="preserve" text-anchor="start" x="760.01" y="-268.8" font-family="Arial" font-size="14.00" fill="#eff5fd">worker / home&#45;k8s所属</text>
</g>
</g>
</svg>
`;case`network`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1333pt" height="1126pt"
 viewBox="0.00 0.00 1333.00 1126.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1110.69)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-924.83 1295,-924.83 1295,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-911.93" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_network</title>
<polygon fill="#3e4651" stroke="#2d333d" points="48,-218.81 48,-863.63 598,-863.63 598,-218.81 48,-218.81"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-850.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">ネットワーク機器</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_x570</title>
<polygon fill="#3e4651" stroke="#2d333d" points="652,-226.81 652,-412.02 896,-412.02 896,-226.81 652,-226.81"/>
<text xml:space="preserve" text-anchor="start" x="660" y="-399.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">PROXMOX / X570</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_b550m</title>
<polygon fill="#3e4651" stroke="#2d333d" points="943,-226.81 943,-412.02 1187,-412.02 1187,-226.81 943,-226.81"/>
<text xml:space="preserve" text-anchor="start" x="951" y="-399.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">PROXMOX / B550M</text>
</g>
<!-- router -->
<g id="node1" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="513.62,-802.43 222.38,-802.43 222.38,-702.42 513.62,-702.42 513.62,-802.43"/>
<text xml:space="preserve" text-anchor="start" x="232.38" y="-744.43" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / ルーター・VLAN間ACL</text>
</g>
<!-- ethernet -->
<g id="node2" class="node">
<title>ethernet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="491.95,-582.82 244.05,-582.82 244.05,-482.82 491.95,-482.82 491.95,-582.82"/>
<text xml:space="preserve" text-anchor="start" x="254.06" y="-524.82" font-family="Arial" font-size="20.00" fill="#f8fafc">宅内Ethernet / VLAN trunk</text>
</g>
<!-- switch -->
<g id="node3" class="node">
<title>switch</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="318.03,-358.82 87.97,-358.82 87.97,-258.81 318.03,-258.81 318.03,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="97.98" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">US&#45;8&#45;60W / 管理スイッチ</text>
</g>
<!-- ap -->
<g id="node4" class="node">
<title>ap</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="558,-358.82 378,-358.82 378,-258.81 558,-258.81 558,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="413" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">FS Wi&#45;Fi AP</text>
</g>
<!-- bridge -->
<g id="node5" class="node">
<title>bridge</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="864,-358.82 684,-358.82 684,-258.81 864,-258.81 864,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="705.07" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">enp7s0 / vmbr0</text>
</g>
<!-- bridge_1 -->
<g id="node6" class="node">
<title>bridge_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1155,-358.82 975,-358.82 975,-258.81 1155,-258.81 1155,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="996.07" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">enp6s0 / vmbr0</text>
</g>
<!-- unifi -->
<g id="node7" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="293,-148.01 113,-148.01 113,-48 293,-48 293,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="130.21" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS Server</text>
</g>
<!-- lan -->
<g id="node8" class="node">
<title>lan</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1255,-148.01 1075,-148.01 1075,-48 1255,-48 1255,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1086.08" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">LAN / VLAN・経路</text>
</g>
<!-- internet -->
<g id="node9" class="node">
<title>internet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="458,-1095.64 278,-1095.64 278,-995.63 458,-995.63 458,-1095.64"/>
<text xml:space="preserve" text-anchor="start" x="334.09" y="-1037.64" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet</text>
</g>
<!-- router&#45;&gt;ethernet -->
<g id="edge2" class="edge">
<title>router&#45;&gt;ethernet</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M250.08,-702.59C235.21,-691.55 222.02,-678.28 212.84,-662.42 196.24,-633.77 213.13,-608.72 241.01,-588.53"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="242.35,-590.79 247.07,-584.4 239.39,-586.46 242.35,-590.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="212.84,-622.82 212.84,-662.42 378,-662.42 378,-622.82 212.84,-622.82"/>
<text xml:space="preserve" text-anchor="start" x="215.84" y="-645.42" font-family="Arial" font-size="14.00" fill="#c9c9c9">GigaEthernet2 / native1 +</text>
<text xml:space="preserve" text-anchor="start" x="215.84" y="-628.62" font-family="Arial" font-size="14.00" fill="#c9c9c9">tag10,20,30,31,40</text>
</g>
<!-- router&#45;&gt;lan -->
<g id="edge3" class="edge">
<title>router&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M513.3,-746.1C717.42,-729.45 1078.02,-663.96 1202,-412.02 1242.1,-330.52 1214.65,-223.12 1190.38,-157.67"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1192.88,-156.84 1187.76,-150.76 1187.97,-158.7 1192.88,-156.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1197.84,-420.02 1197.84,-442.82 1224.83,-442.82 1224.83,-420.02 1197.84,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="1200.84" y="-428.22" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- ethernet&#45;&gt;switch -->
<g id="edge4" class="edge">
<title>ethernet&#45;&gt;switch</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M277.85,-482.94C262.76,-471.45 248.55,-458.04 237.83,-442.82 222.62,-421.21 214.05,-393.43 209.22,-368.84"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="211.81,-368.43 207.91,-361.51 206.65,-369.36 211.81,-368.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="237.83,-420.02 237.83,-442.82 338,-442.82 338,-420.02 237.83,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="240.83" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">802.1Q / uplink</text>
</g>
<!-- ethernet&#45;&gt;ap -->
<g id="edge5" class="edge">
<title>ethernet&#45;&gt;ap</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M354.05,-482.98C350.74,-462.83 350.19,-439.65 358.29,-420.02 366.6,-399.89 380.56,-381.51 395.79,-365.77"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="397.25,-368.02 400.72,-360.86 393.55,-364.3 397.25,-368.02"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="358.29,-420.02 358.29,-442.82 523,-442.82 523,-420.02 358.29,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="361.29" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">AP trunk / 接続ポート未確定</text>
</g>
<!-- ethernet&#45;&gt;bridge -->
<g id="edge6" class="edge">
<title>ethernet&#45;&gt;bridge</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M456.42,-482.82C496,-461.95 543.67,-438.27 588.05,-420.02 598.82,-415.59 602.46,-416.95 613,-412.02 641.55,-398.64 671.14,-381.08 697.05,-364.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="698.32,-366.59 703.15,-360.29 695.44,-362.2 698.32,-366.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="588.05,-420.02 588.05,-442.82 838,-442.82 838,-420.02 588.05,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="591.05" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1 + taggedゲスト / 配線ポート未確定</text>
</g>
<!-- ethernet&#45;&gt;bridge_1 -->
<g id="edge7" class="edge">
<title>ethernet&#45;&gt;bridge_1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M491.82,-483.86C493.22,-483.5 494.61,-483.15 496,-482.82 649.4,-445.4 697.56,-487.5 849,-442.82 878.51,-434.11 884.35,-427.4 911,-412.02 936.12,-397.52 962.71,-380.51 986.58,-364.58"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="987.97,-366.81 992.74,-360.45 985.05,-362.45 987.97,-366.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="897.15,-420.02 897.15,-442.82 1147.1,-442.82 1147.1,-420.02 897.15,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="900.15" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1 + taggedゲスト / 配線ポート未確定</text>
</g>
<!-- switch&#45;&gt;unifi -->
<g id="edge8" class="edge">
<title>switch&#45;&gt;unifi</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M203,-258.86C203,-228.75 203,-189.98 203,-158.16"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="205.63,-158.18 203,-150.68 200.38,-158.18 205.63,-158.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="203,-188.01 203,-210.81 276.68,-210.81 276.68,-188.01 203,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="206" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">UniFiで管理</text>
</g>
<!-- bridge&#45;&gt;lan -->
<g id="edge9" class="edge">
<title>bridge&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M856.64,-258.91C879.6,-245.64 904.64,-231.45 928,-218.81 972.86,-194.53 1023.21,-168.86 1065.92,-147.54"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1066.95,-149.96 1072.49,-144.27 1064.6,-145.26 1066.95,-149.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="985.96,-188.01 985.96,-210.81 1012.95,-210.81 1012.95,-188.01 985.96,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="988.96" y="-196.21" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- bridge_1&#45;&gt;lan -->
<g id="edge10" class="edge">
<title>bridge_1&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1088.45,-258.86C1103.05,-228.36 1121.92,-188.96 1137.27,-156.91"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1139.52,-158.28 1140.39,-150.38 1134.79,-156.01 1139.52,-158.28"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1120.99,-188.01 1120.99,-210.81 1147.98,-210.81 1147.98,-188.01 1120.99,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1123.99" y="-196.21" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- internet&#45;&gt;router -->
<g id="edge1" class="edge">
<title>internet&#45;&gt;router</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M368,-995.89C368,-945.5 368,-866.77 368,-812.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="370.63,-812.86 368,-805.36 365.38,-812.86 370.63,-812.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="368,-932.83 368,-955.63 508.61,-955.63 508.61,-932.83 368,-932.83"/>
<text xml:space="preserve" text-anchor="start" x="371" y="-938.63" font-family="Arial" font-size="14.00" fill="#c9c9c9">WAN / GigaEthernet0</text>
</g>
</g>
</svg>
`;case`vlans`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1023pt" height="1420pt"
 viewBox="0.00 0.00 1023.00 1420.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1405.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-140 8,-1382 985.29,-1382 985.29,-140 8,-140"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1369.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_lan</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="609.53,-320 609.53,-1321 945.29,-1321 945.29,-320 609.53,-320"/>
<text xml:space="preserve" text-anchor="start" x="617.53" y="-1308.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">LAN / VLAN・経路</text>
</g>
<!-- native -->
<g id="node1" class="node">
<title>native</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="889.16,-780.01 665.65,-780.01 665.65,-680 889.16,-680 889.16,-780.01"/>
<text xml:space="preserve" text-anchor="start" x="675.66" y="-722" font-family="Arial" font-size="20.00" fill="#f8fafc">native / 192.168.0.0/24</text>
</g>
<!-- management -->
<g id="node2" class="node">
<title>management</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="905.29,-460.01 649.53,-460.01 649.53,-360 905.29,-360 905.29,-460.01"/>
<text xml:space="preserve" text-anchor="start" x="659.54" y="-402" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN10 / 192.168.10.0/24</text>
</g>
<!-- server -->
<g id="node3" class="node">
<title>server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="905.29,-1100.01 649.53,-1100.01 649.53,-1000 905.29,-1000 905.29,-1100.01"/>
<text xml:space="preserve" text-anchor="start" x="659.54" y="-1042" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN20 / 192.168.20.0/24</text>
</g>
<!-- client -->
<g id="node4" class="node">
<title>client</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="905.29,-1260.01 649.53,-1260.01 649.53,-1160 905.29,-1160 905.29,-1260.01"/>
<text xml:space="preserve" text-anchor="start" x="659.54" y="-1202" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN30 / 192.168.30.0/24</text>
</g>
<!-- guest -->
<g id="node5" class="node">
<title>guest</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="867.41,-620.01 687.41,-620.01 687.41,-520 867.41,-520 867.41,-620.01"/>
<text xml:space="preserve" text-anchor="start" x="707.36" y="-562" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN31 / guest</text>
</g>
<!-- iot -->
<g id="node6" class="node">
<title>iot</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="905.29,-940.01 649.53,-940.01 649.53,-840 905.29,-840 905.29,-940.01"/>
<text xml:space="preserve" text-anchor="start" x="659.54" y="-882" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN40 / 192.168.40.0/24</text>
</g>
<!-- switch -->
<g id="node7" class="node">
<title>switch</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="308.65,-280.01 78.6,-280.01 78.6,-180 308.65,-180 308.65,-280.01"/>
<text xml:space="preserve" text-anchor="start" x="88.6" y="-222" font-family="Arial" font-size="20.00" fill="#f8fafc">US&#45;8&#45;60W / 管理スイッチ</text>
</g>
<!-- router -->
<g id="node8" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="339.25,-820.01 48,-820.01 48,-720 339.25,-720 339.25,-820.01"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-762" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / ルーター・VLAN間ACL</text>
</g>
<!-- bridge -->
<g id="node9" class="node">
<title>bridge</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="283.62,-1260.01 103.62,-1260.01 103.62,-1160 283.62,-1160 283.62,-1260.01"/>
<text xml:space="preserve" text-anchor="start" x="124.7" y="-1202" font-family="Arial" font-size="20.00" fill="#f8fafc">enp7s0 / vmbr0</text>
</g>
<!-- bridge_1 -->
<g id="node10" class="node">
<title>bridge_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="283.62,-1084.01 103.62,-1084.01 103.62,-984 283.62,-984 283.62,-1084.01"/>
<text xml:space="preserve" text-anchor="start" x="124.7" y="-1026" font-family="Arial" font-size="20.00" fill="#f8fafc">enp6s0 / vmbr0</text>
</g>
<!-- dns -->
<g id="node11" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="870.22,-280.01 684.6,-280.01 684.6,-180 870.22,-180 870.22,-280.01"/>
<text xml:space="preserve" text-anchor="start" x="694.61" y="-222" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- warp -->
<g id="node12" class="node">
<title>warp</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="329.77,-100.01 57.47,-100.01 57.47,0 329.77,0 329.77,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="67.48" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">WARP / private CIDR routes</text>
</g>
<!-- switch&#45;&gt;dns -->
<!-- router&#45;&gt;native -->
<g id="edge3" class="edge">
<title>router&#45;&gt;native</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M268.5,-720.25C300.99,-701.24 340.52,-681.83 379.25,-672.2 475.12,-648.38 503.99,-656.5 601.53,-672.2 619.38,-675.08 637.87,-679.5 655.85,-684.65"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="654.94,-687.12 662.88,-686.72 656.43,-682.08 654.94,-687.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="460.54,-672.2 460.54,-695 520.23,-695 520.23,-672.2 460.54,-672.2"/>
<text xml:space="preserve" text-anchor="start" x="463.54" y="-678" font-family="Arial" font-size="14.00" fill="#c9c9c9">native IF</text>
</g>
<!-- router&#45;&gt;management -->
<g id="edge4" class="edge">
<title>router&#45;&gt;management</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M221.2,-720.05C252.24,-666.34 308.48,-582.1 379.25,-533.2 456.71,-479.68 558.32,-448.71 639.38,-431.22"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.91,-433.79 646.7,-429.67 638.82,-428.65 639.91,-433.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="468.32,-533.2 468.32,-556 512.46,-556 512.46,-533.2 468.32,-533.2"/>
<text xml:space="preserve" text-anchor="start" x="471.32" y="-539" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI10</text>
</g>
<!-- router&#45;&gt;server -->
<g id="edge5" class="edge">
<title>router&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M339.1,-795.87C441.88,-817.37 567.52,-851.06 601.53,-892.2 623.68,-919 589.53,-941.58 609.53,-970 618.09,-982.17 629.02,-992.56 641.17,-1001.41"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.6,-1003.51 647.27,-1005.58 642.56,-999.18 639.6,-1003.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="468.32,-892.2 468.32,-915 512.46,-915 512.46,-892.2 468.32,-892.2"/>
<text xml:space="preserve" text-anchor="start" x="471.32" y="-898" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI20</text>
</g>
<!-- router&#45;&gt;client -->
<g id="edge6" class="edge">
<title>router&#45;&gt;client</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M240.49,-819.79C271.4,-855.23 311.45,-905.08 339.25,-954 363.71,-997.06 341.85,-1025.54 379.25,-1058 455.8,-1124.47 524.98,-1042.74 601.53,-1109.2 609.01,-1115.7 602.81,-1122.73 609.53,-1130 618.82,-1140.07 629.65,-1149.01 641.25,-1156.9"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.56,-1158.94 647.28,-1160.82 642.42,-1154.53 639.56,-1158.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="468.32,-1109.2 468.32,-1132 512.46,-1132 512.46,-1109.2 468.32,-1109.2"/>
<text xml:space="preserve" text-anchor="start" x="471.32" y="-1115" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI30</text>
</g>
<!-- router&#45;&gt;guest -->
<g id="edge7" class="edge">
<title>router&#45;&gt;guest</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M240.07,-720.31C274.68,-685.87 325.4,-642.23 379.25,-619.2 474.82,-578.34 594.32,-568.43 677.15,-567.26"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="677.07,-569.88 684.54,-567.18 677.01,-564.63 677.07,-569.88"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="426.69,-619.2 426.69,-642 554.08,-642 554.08,-619.2 426.69,-619.2"/>
<text xml:space="preserve" text-anchor="start" x="429.69" y="-625" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI31 / 他VLAN拒否</text>
</g>
<!-- router&#45;&gt;iot -->
<g id="edge8" class="edge">
<title>router&#45;&gt;iot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M339.06,-722.65C424.97,-704.18 530.67,-699.82 601.53,-760.2 618.59,-774.74 596.11,-792.04 609.53,-810 618.28,-821.72 629.19,-831.79 641.21,-840.44"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.52,-842.47 647.2,-844.51 642.47,-838.12 639.52,-842.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="448.86,-760.2 448.86,-783 531.91,-783 531.91,-760.2 448.86,-760.2"/>
<text xml:space="preserve" text-anchor="start" x="451.86" y="-766" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI4 / tag40</text>
</g>
<!-- bridge&#45;&gt;server -->
<g id="edge9" class="edge">
<title>bridge&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M283.47,-1200.38C395.4,-1187.6 576.28,-1164.48 601.53,-1146 607.95,-1141.31 603.86,-1135.58 609.53,-1130 618.93,-1120.76 629.6,-1112.42 640.9,-1104.94"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="642.18,-1107.24 647.1,-1101 639.36,-1102.81 642.18,-1107.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="437.97,-1188.14 437.97,-1210.94 542.8,-1210.94 542.8,-1188.14 437.97,-1188.14"/>
<text xml:space="preserve" text-anchor="start" x="440.97" y="-1193.94" font-family="Arial" font-size="14.00" fill="#c9c9c9">VM・LXC tag20</text>
</g>
<!-- bridge&#45;&gt;client -->
<g id="edge10" class="edge">
<title>bridge&#45;&gt;client</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M283.61,-1223.93C313.88,-1228.04 347.96,-1231.98 379.25,-1234 477.83,-1240.38 502.97,-1240.74 601.53,-1234 613.83,-1233.16 626.59,-1231.99 639.35,-1230.62"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.41,-1233.26 646.57,-1229.81 638.83,-1228.04 639.41,-1233.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="427.08,-1238.92 427.08,-1261.72 553.69,-1261.72 553.69,-1238.92 427.08,-1238.92"/>
<text xml:space="preserve" text-anchor="start" x="430.08" y="-1244.72" font-family="Arial" font-size="14.00" fill="#c9c9c9">Windows VM tag30</text>
</g>
<!-- bridge_1&#45;&gt;server -->
<g id="edge11" class="edge">
<title>bridge_1&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M283.25,-1026.92C365.76,-1021.49 492.12,-1016.18 601.53,-1024.2 613.85,-1025.11 626.61,-1026.36 639.38,-1027.84"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="638.85,-1030.42 646.61,-1028.71 639.48,-1025.21 638.85,-1030.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="437.97,-1024.2 437.97,-1047 542.8,-1047 542.8,-1024.2 437.97,-1024.2"/>
<text xml:space="preserve" text-anchor="start" x="440.97" y="-1030" font-family="Arial" font-size="14.00" fill="#c9c9c9">VM・LXC tag20</text>
</g>
<!-- bridge_1&#45;&gt;iot -->
<g id="edge12" class="edge">
<title>bridge_1&#45;&gt;iot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M283.61,-1008.15C313.88,-999.6 347.97,-990.22 379.25,-982.2 465.54,-960.09 562.97,-937.44 639.74,-920.12"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="640.26,-922.69 647,-918.49 639.1,-917.57 640.26,-922.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="439.53,-982.2 439.53,-1005 541.24,-1005 541.24,-982.2 439.53,-982.2"/>
<text xml:space="preserve" text-anchor="start" x="442.53" y="-988" font-family="Arial" font-size="14.00" fill="#c9c9c9">kiosk VM tag40</text>
</g>
<!-- warp&#45;&gt;server -->
<g id="edge2" class="edge">
<title>warp&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M329.74,-26.44C420.65,-19.09 535.55,-27.92 601.53,-102.2 617.54,-120.23 596.59,-949.66 609.53,-970 617.8,-983.01 628.84,-993.96 641.31,-1003.15"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="639.55,-1005.12 647.21,-1007.23 642.53,-1000.8 639.55,-1005.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="379.25,-102.2 379.25,-125 601.53,-125 601.53,-102.2 379.25,-102.2"/>
<text xml:space="preserve" text-anchor="start" x="382.25" y="-108" font-family="Arial" font-size="14.00" fill="#c9c9c9">private CIDR routes / WARP policy</text>
</g>
</g>
</svg>
`;case`home_workloads`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1462pt" height="467pt"
 viewBox="0.00 0.00 1462.00 467.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 452.06)">
<!-- coupon_manager -->
<g id="node1" class="node">
<title>coupon_manager</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="247.28,-100.01 67.28,-100.01 67.28,0 247.28,0 247.28,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="80" y="-42" font-family="Arial" font-size="20.00" fill="#eff6ff">Coupon Manager</text>
</g>
<!-- loockit -->
<g id="node2" class="node">
<title>loockit</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="685.69,-100.01 505.69,-100.01 505.69,0 685.69,0 685.69,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="564.01" y="-42" font-family="Arial" font-size="20.00" fill="#eff6ff">Loockit</text>
</g>
<!-- magic_mirror -->
<g id="node3" class="node">
<title>magic_mirror</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1129.18,-100.01 949.18,-100.01 949.18,0 1129.18,0 1129.18,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="986.4" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror</text>
</g>
<!-- wol -->
<g id="node4" class="node">
<title>wol</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1431.85,-100.01 1251.85,-100.01 1251.85,0 1431.85,0 1431.85,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="1279.06" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">Wake&#45;on&#45;LAN</text>
</g>
<!-- access -->
<g id="node5" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="314.56,-325.01 0,-325.01 0,-225 314.56,-225 314.56,-325.01"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-267" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- tunnel -->
<g id="node6" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="685.69,-325.01 505.69,-325.01 505.69,-225 685.69,-225 685.69,-325.01"/>
<text xml:space="preserve" text-anchor="start" x="516.76" y="-267" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- nextcloud -->
<g id="node7" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1129.18,-437.01 949.18,-437.01 949.18,-337 1129.18,-337 1129.18,-437.01"/>
<text xml:space="preserve" text-anchor="start" x="994.71" y="-379" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node8" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1129.18,-287.01 949.18,-287.01 949.18,-187 1129.18,-187 1129.18,-287.01"/>
<text xml:space="preserve" text-anchor="start" x="997.5" y="-229" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信</text>
</g>
<!-- annict_scraper -->
<g id="node9" class="node">
<title>annict_scraper</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1431.85,-287.01 1251.85,-287.01 1251.85,-187 1431.85,-187 1431.85,-287.01"/>
<text xml:space="preserve" text-anchor="start" x="1277.94" y="-229" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict scraper</text>
</g>
<!-- coupon_manager&#45;&gt;loockit -->
<!-- loockit&#45;&gt;magic_mirror -->
<!-- magic_mirror&#45;&gt;wol -->
<!-- access&#45;&gt;tunnel -->
<g id="edge4" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M314.29,-275C374.62,-275 441.88,-275 495.39,-275"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="495.38,-277.63 502.88,-275 495.38,-272.38 495.38,-277.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="349.56,-275 349.56,-297.8 470.69,-297.8 470.69,-275 349.56,-275"/>
<text xml:space="preserve" text-anchor="start" x="352.56" y="-280.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- tunnel&#45;&gt;nextcloud -->
<g id="edge5" class="edge">
<title>tunnel&#45;&gt;nextcloud</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M685.5,-297.53C759,-316.18 863.32,-342.65 939.43,-361.95"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="938.66,-364.47 946.58,-363.77 939.95,-359.38 938.66,-364.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="720.69,-353.91 720.69,-376.71 914.18,-376.71 914.18,-353.91 720.69,-353.91"/>
<text xml:space="preserve" text-anchor="start" x="723.69" y="-359.71" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- tunnel&#45;&gt;recording -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;recording</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M685.5,-267.36C759,-261.03 863.32,-252.05 939.43,-245.5"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="939.25,-248.15 946.49,-244.9 938.8,-242.92 939.25,-248.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="720.69,-263.78 720.69,-286.58 914.18,-286.58 914.18,-263.78 720.69,-263.78"/>
<text xml:space="preserve" text-anchor="start" x="723.69" y="-269.58" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- recording&#45;&gt;annict_scraper -->
<g id="edge7" class="edge">
<title>recording&#45;&gt;annict_scraper</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1129.17,-237C1164.63,-237 1205.58,-237 1241.96,-237"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1241.56,-239.63 1249.06,-237 1241.56,-234.38 1241.56,-239.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1164.18,-237 1164.18,-259.8 1216.85,-259.8 1216.85,-237 1164.18,-237"/>
<text xml:space="preserve" text-anchor="start" x="1167.18" y="-242.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">番組照合</text>
</g>
</g>
</svg>
`;case`platform`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1303pt" height="688pt"
 viewBox="0.00 0.00 1303.00 688.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 673.08)">
<g id="clust1" class="cluster">
<title>cluster_dns</title>
<polygon fill="#3e4651" stroke="#2d333d" points="8,-8 8,-379.22 352,-379.22 352,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-366.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">内部DNS / METALLB</text>
</g>
<!-- coredns -->
<g id="node1" class="node">
<title>coredns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="311.72,-318.02 48.28,-318.02 48.28,-218.01 311.72,-218.01 311.72,-318.02"/>
<text xml:space="preserve" text-anchor="start" x="58.29" y="-260.01" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / miutaku.internal</text>
</g>
<!-- metallb -->
<g id="node2" class="node">
<title>metallb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="308.39,-148.01 51.61,-148.01 51.61,-48 308.39,-48 308.39,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="61.62" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">MetalLB / LANのService IP</text>
</g>
<!-- descheduler -->
<g id="node3" class="node">
<title>descheduler</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="598,-658.03 418,-658.03 418,-558.02 598,-558.02 598,-658.03"/>
<text xml:space="preserve" text-anchor="start" x="453.52" y="-600.03" font-family="Arial" font-size="20.00" fill="#f8fafc">descheduler</text>
</g>
<!-- cloudflared -->
<g id="node4" class="node">
<title>cloudflared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="635.85,-488.02 380.15,-488.02 380.15,-388.02 635.85,-388.02 635.85,-488.02"/>
<text xml:space="preserve" text-anchor="start" x="390.16" y="-430.02" font-family="Arial" font-size="20.00" fill="#f8fafc">cloudflared / 自宅connector</text>
</g>
<!-- api -->
<g id="node5" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="623.63,-318.02 392.37,-318.02 392.37,-218.01 623.63,-218.01 623.63,-318.02"/>
<text xml:space="preserve" text-anchor="start" x="402.38" y="-260.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Kubernetes API / Lease</text>
</g>
<!-- controlplane -->
<g id="node6" class="node">
<title>controlplane</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="622.51,-148.01 393.49,-148.01 393.49,-48 622.51,-48 622.51,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="403.5" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s control&#45;plane</text>
</g>
<!-- worker -->
<g id="node7" class="node">
<title>worker</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="897,-658.03 717,-658.03 717,-558.02 897,-558.02 897,-658.03"/>
<text xml:space="preserve" text-anchor="start" x="730.31" y="-600.03" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s worker</text>
</g>
<!-- nd_cluster_dns -->
<g id="node8" class="node">
<title>nd_cluster_dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="920.93,-488.02 693.07,-488.02 693.07,-388.02 920.93,-388.02 920.93,-488.02"/>
<text xml:space="preserve" text-anchor="start" x="703.08" y="-430.02" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / cluster.local</text>
</g>
<!-- flannel -->
<g id="node9" class="node">
<title>flannel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="897,-318.02 717,-318.02 717,-218.01 897,-218.01 897,-318.02"/>
<text xml:space="preserve" text-anchor="start" x="748.65" y="-260.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Flannel / CNI</text>
</g>
<!-- kube_proxy -->
<g id="node10" class="node">
<title>kube_proxy</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="941.51,-148.01 672.49,-148.01 672.49,-48 941.51,-48 941.51,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="682.5" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">kube&#45;proxy / Service routing</text>
</g>
<!-- metrics_server -->
<g id="node11" class="node">
<title>metrics_server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="312.8,-658.03 47.2,-658.03 47.2,-558.02 312.8,-558.02 312.8,-658.03"/>
<text xml:space="preserve" text-anchor="start" x="57.21" y="-600.03" font-family="Arial" font-size="20.00" fill="#f8fafc">metrics&#45;server / Metrics API</text>
</g>
<!-- cert_approver -->
<g id="node12" class="node">
<title>cert_approver</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="320.62,-488.02 39.38,-488.02 39.38,-388.02 320.62,-388.02 320.62,-488.02"/>
<text xml:space="preserve" text-anchor="start" x="49.39" y="-430.02" font-family="Arial" font-size="20.00" fill="#f8fafc">kubelet&#45;serving&#45;cert&#45;approver</text>
</g>
<!-- eso -->
<g id="node13" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1257.61,-658.03 1006.39,-658.03 1006.39,-558.02 1257.61,-558.02 1257.61,-658.03"/>
<text xml:space="preserve" text-anchor="start" x="1016.39" y="-600.03" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- argo -->
<g id="node14" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1222,-488.02 1042,-488.02 1042,-388.02 1222,-388.02 1222,-488.02"/>
<text xml:space="preserve" text-anchor="start" x="1079.76" y="-430.02" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- runner -->
<g id="node15" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1258.71,-318.02 1005.29,-318.02 1005.29,-218.01 1258.71,-218.01 1258.71,-318.02"/>
<text xml:space="preserve" text-anchor="start" x="1015.3" y="-260.01" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 共用のrunner制御基盤</text>
</g>
<!-- tfc_agents -->
<g id="node16" class="node">
<title>tfc_agents</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1272.61,-148.01 991.39,-148.01 991.39,-48 1272.61,-48 1272.61,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1001.39" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud agents / 自宅</text>
</g>
<!-- coredns&#45;&gt;metallb -->
<!-- descheduler&#45;&gt;cloudflared -->
<!-- cloudflared&#45;&gt;api -->
<!-- api&#45;&gt;controlplane -->
<!-- worker&#45;&gt;nd_cluster_dns -->
<!-- nd_cluster_dns&#45;&gt;flannel -->
<!-- flannel&#45;&gt;kube_proxy -->
<!-- metrics_server&#45;&gt;cert_approver -->
<!-- cert_approver&#45;&gt;coredns -->
<!-- eso&#45;&gt;argo -->
<!-- argo&#45;&gt;runner -->
<!-- runner&#45;&gt;tfc_agents -->
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