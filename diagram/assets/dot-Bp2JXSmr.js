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
        tunnel [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Cloudflare Tunnel</FONT>>,
            likec4_id="edge.tunnel",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        access [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Access / 認証</FONT>>,
            likec4_id="edge.access",
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
            label=<<FONT POINT-SIZE="20">収集agent</FONT>>,
            likec4_id="home.agent",
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
        grafana [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Grafana Cloud / PDC</FONT>>,
            likec4_id="monitoring.grafana",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
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
        likec4_id="1wgwgi5",
        minlen=0,
        style=dotted,
        weight=2];
    bws -> eso [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1cy8kgk",
        style=dotted];
    user -> tunnel [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_edge,
        likec4_id="1ykqzp4",
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS</FONT></TD></TR></TABLE>>];
    oke -> vms [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics / logs</FONT></TD></TR></TABLE>>,
        likec4_id="1ajjbq9",
        style=dotted,
        weight=2];
    access -> eso [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_home,
        likec4_id="1d72sg6",
        ltail=cluster_edge,
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Tunnel / 内部HTTP</FONT></TD></TR></TABLE>>];
    access -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Tunnel / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id="1afxkvl",
        minlen=1,
        style=dashed];
    agent -> vms [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics / logs</FONT></TD></TR></TABLE>>,
        likec4_id=otym6w,
        minlen=1,
        style=dotted];
    nextcloud -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NFS / PVC</FONT></TD></TR></TABLE>>,
        likec4_id="8i3da7",
        style=dashed,
        weight=3];
    grafana -> vms [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由</FONT></TD></TR></TABLE>>,
        likec4_id="1xca7cu",
        minlen=0,
        style=dashed,
        weight=3];
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
        recording [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">録画・配信</FONT>>,
            likec4_id="home.recording",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        apps [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">宅内アプリ</FONT>>,
            likec4_id="home.apps",
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
        style=dashed];
    "edge" -> nextcloud [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        lhead=cluster_home,
        likec4_id="1d72sg6",
        style=dashed,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Tunnel / 内部HTTP</FONT></TD></TR></TABLE>>];
    nextcloud -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NFS / PVC</FONT></TD></TR></TABLE>>,
        likec4_id="8i3da7",
        style=dashed];
    recording -> nas [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">メディア保存</FONT></TD></TR></TABLE>>,
        likec4_id=tx5cuc,
        minlen=1,
        style=dashed];
    apps -> dns [style=invis];
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
            group=control,
            height=1.389,
            label=<<FONT POINT-SIZE="20">GitHub / コード・Actions</FONT>>,
            likec4_id="control.git",
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
    git -> runner [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Actions job</FONT></TD></TR></TABLE>>,
        likec4_id="1ejrb1c",
        minlen=1,
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
        style=dotted];
    bws -> eso_1 [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1xij4my",
        minlen=1,
        style=dotted];
    bws -> git [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">CI credential</FONT></TD></TR></TABLE>>,
        likec4_id="1d2gkgv",
        minlen=1,
        style=dotted];
    bws -> tfc [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Terraform変数</FONT></TD></TR></TABLE>>,
        likec4_id="1d2gyr8",
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
        agent [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">収集agent</FONT>>,
            likec4_id="home.agent",
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
        grafana [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Grafana Cloud / PDC</FONT>>,
            likec4_id="monitoring.grafana",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
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
    hardware [height=1.389,
        label=<<FONT POINT-SIZE="20">物理・ネットワーク</FONT>>,
        likec4_id=hardware,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    hardware -> agent [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">exporter収集</FONT></TD></TR></TABLE>>,
        likec4_id="2sc9t8",
        minlen=1,
        style=dotted,
        weight=2];
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
        style=dashed];
    oke [height=1.389,
        label=<<FONT POINT-SIZE="20">OCI / STG OKE共通基盤</FONT>>,
        likec4_id=oke,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    oke -> vms [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics / logs</FONT></TD></TR></TABLE>>,
        likec4_id="1ajjbq9",
        minlen=1,
        style=dotted,
        weight=2];
    agent -> vms [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics / logs</FONT></TD></TR></TABLE>>,
        likec4_id=otym6w,
        style=dotted];
    grafana -> vms [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由</FONT></TD></TR></TABLE>>,
        likec4_id="1xca7cu",
        minlen=0,
        style=dashed,
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
  "application" [
    likec4_id = "application";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">reventer所有 / STG・PRDアプリ・PRD OKE</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#d4d4d4">別リポジトリ管理。モデルで所有境界を維持する。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#737373";
    fontcolor = "#fafafa";
    color = "#525252";
  ];
}`;default:throw Error(`Unknown viewId: `+e)}},t=e=>{switch(e){case`index`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2224pt" height="918pt"
 viewBox="0.00 0.00 2224.00 918.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 902.48)">
<g id="clust1" class="cluster">
<title>cluster_edge</title>
<polygon fill="#5a3620" stroke="#462a17" points="886.4,-263.21 886.4,-485.62 1406.4,-485.62 1406.4,-263.21 886.4,-263.21"/>
<text xml:space="preserve" text-anchor="start" x="894.4" y="-472.72" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1666.4,-8 1666.4,-748.82 2186.4,-748.82 2186.4,-8 1666.4,-8"/>
<text xml:space="preserve" text-anchor="start" x="1674.4" y="-735.92" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="894.4,-16 894.4,-222.41 1138.4,-222.41 1138.4,-16 894.4,-16"/>
<text xml:space="preserve" text-anchor="start" x="902.4" y="-209.51" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="215.4,-263.21 215.4,-485.62 878.4,-485.62 878.4,-263.21 215.4,-263.21"/>
<text xml:space="preserve" text-anchor="start" x="223.4" y="-472.72" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1414.4,-271.21 1414.4,-477.62 1658.4,-477.62 1658.4,-271.21 1414.4,-271.21"/>
<text xml:space="preserve" text-anchor="start" x="1422.4" y="-464.72" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<!-- tunnel -->
<g id="node1" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1366.4,-403.22 1186.4,-403.22 1186.4,-303.21 1366.4,-303.21 1366.4,-403.22"/>
<text xml:space="preserve" text-anchor="start" x="1197.47" y="-345.21" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- access -->
<g id="node2" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1106.4,-403.22 926.4,-403.22 926.4,-303.21 1106.4,-303.21 1106.4,-403.22"/>
<text xml:space="preserve" text-anchor="start" x="959.17" y="-345.21" font-family="Arial" font-size="20.00" fill="#f8fafc">Access / 認証</text>
</g>
<!-- eso -->
<g id="node3" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1958.02,-148.01 1706.79,-148.01 1706.79,-48 1958.02,-48 1958.02,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1716.8" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- agent -->
<g id="node4" class="node">
<title>agent</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1886.4,-666.42 1706.4,-666.42 1706.4,-566.42 1886.4,-566.42 1886.4,-666.42"/>
<text xml:space="preserve" text-anchor="start" x="1754.71" y="-608.42" font-family="Arial" font-size="20.00" fill="#f8fafc">収集agent</text>
</g>
<!-- nextcloud -->
<g id="node5" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2146.4,-666.42 1966.4,-666.42 1966.4,-566.42 2146.4,-566.42 2146.4,-666.42"/>
<text xml:space="preserve" text-anchor="start" x="2011.93" y="-608.42" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- argo -->
<g id="node6" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1106.4,-148.01 926.4,-148.01 926.4,-48 1106.4,-48 1106.4,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="964.17" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- grafana -->
<g id="node7" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="463.9,-403.22 254.91,-403.22 254.91,-303.21 463.9,-303.21 463.9,-403.22"/>
<text xml:space="preserve" text-anchor="start" x="264.91" y="-345.21" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- vms -->
<g id="node8" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M838.2,-394.12C838.2,-399.14 785.4,-403.22 720.4,-403.22 655.4,-403.22 602.61,-399.14 602.61,-394.12 602.61,-394.12 602.61,-312.3 602.61,-312.3 602.61,-307.28 655.4,-303.21 720.4,-303.21 785.4,-303.21 838.2,-307.28 838.2,-312.3 838.2,-312.3 838.2,-394.12 838.2,-394.12"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M838.2,-394.12C838.2,-389.11 785.4,-385.03 720.4,-385.03 655.4,-385.03 602.61,-389.11 602.61,-394.12"/>
<text xml:space="preserve" text-anchor="start" x="612.61" y="-345.21" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- nas -->
<g id="node9" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1626.4,-394.12C1626.4,-399.14 1586.06,-403.22 1536.4,-403.22 1486.74,-403.22 1446.4,-399.14 1446.4,-394.12 1446.4,-394.12 1446.4,-312.3 1446.4,-312.3 1446.4,-307.28 1486.74,-303.21 1536.4,-303.21 1586.06,-303.21 1626.4,-307.28 1626.4,-312.3 1626.4,-312.3 1626.4,-394.12 1626.4,-394.12"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1626.4,-394.12C1626.4,-389.11 1586.06,-385.03 1536.4,-385.03 1486.74,-385.03 1446.4,-389.11 1446.4,-394.12"/>
<text xml:space="preserve" text-anchor="start" x="1466.94" y="-345.21" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS / NFS</text>
</g>
<!-- operator -->
<g id="node10" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="526.4,-666.42 346.4,-666.42 346.4,-566.42 526.4,-566.42 526.4,-666.42"/>
<text xml:space="preserve" text-anchor="start" x="411.4" y="-608.42" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- bws -->
<g id="node11" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="266.8,-666.42 0,-666.42 0,-566.42 266.8,-566.42 266.8,-666.42"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-608.42" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- user -->
<g id="node12" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="1366.4,-666.42 1186.4,-666.42 1186.4,-566.42 1366.4,-566.42 1366.4,-666.42"/>
<text xml:space="preserve" text-anchor="start" x="1251.4" y="-608.42" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- oke -->
<g id="node13" class="node">
<title>oke</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="834.32,-666.42 606.49,-666.42 606.49,-566.42 834.32,-566.42 834.32,-666.42"/>
<text xml:space="preserve" text-anchor="start" x="616.5" y="-608.42" font-family="Arial" font-size="20.00" fill="#eff6ff">OCI / STG OKE共通基盤</text>
</g>
<!-- access&#45;&gt;eso -->
<g id="edge7" class="edge">
<title>access&#45;&gt;eso</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1146.4,-263.21C1311.56,-189.92 1514.21,-146.57 1656.28,-122.99"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1656.44,-125.62 1663.42,-121.81 1655.59,-120.44 1656.44,-125.62"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1289.65,-174.45 1289.65,-197.25 1410.02,-197.25 1410.02,-174.45 1289.65,-174.45"/>
<text xml:space="preserve" text-anchor="start" x="1292.65" y="-180.25" font-family="Arial" font-size="14.00" fill="#bbfcd3">Tunnel / 内部HTTP</text>
</g>
<!-- access&#45;&gt;argo -->
<g id="edge8" class="edge">
<title>access&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1016.4,-303.39C1016.4,-261.88 1016.4,-202.16 1016.4,-157.98"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1019.03,-158.2 1016.4,-150.7 1013.78,-158.2 1019.03,-158.2"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1016.4,-230.41 1016.4,-253.21 1114.22,-253.21 1114.22,-230.41 1016.4,-230.41"/>
<text xml:space="preserve" text-anchor="start" x="1019.4" y="-236.21" font-family="Arial" font-size="14.00" fill="#cbd0fd">Tunnel / 管理UI</text>
</g>
<!-- agent&#45;&gt;vms -->
<g id="edge9" class="edge">
<title>agent&#45;&gt;vms</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M1706.49,-600.71C1553.01,-575.98 1230.47,-525.64 956.4,-493.62 936.46,-491.29 884.81,-493.63 866.4,-485.62 828.68,-469.19 794.08,-439.05 768.04,-411.79"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="770.04,-410.08 763,-406.39 766.21,-413.66 770.04,-410.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1117.57,-493.62 1117.57,-516.42 1206.04,-516.42 1206.04,-493.62 1117.57,-493.62"/>
<text xml:space="preserve" text-anchor="start" x="1120.57" y="-499.42" font-family="Arial" font-size="14.00" fill="#ffe0c2">metrics / logs</text>
</g>
<!-- nextcloud&#45;&gt;nas -->
<g id="edge10" class="edge">
<title>nextcloud&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1966.42,-570.22C1874.43,-524.01 1731.87,-452.4 1636.4,-404.45"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1637.61,-402.11 1629.73,-401.09 1635.25,-406.81 1637.61,-402.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1858.27,-493.62 1858.27,-516.42 1932.72,-516.42 1932.72,-493.62 1858.27,-493.62"/>
<text xml:space="preserve" text-anchor="start" x="1861.27" y="-499.42" font-family="Arial" font-size="14.00" fill="#bbfcd3">NFS / PVC</text>
</g>
<!-- grafana&#45;&gt;vms -->
<g id="edge11" class="edge">
<title>grafana&#45;&gt;vms</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M463.82,-353.21C503.64,-353.21 549.51,-353.21 591.35,-353.21"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="591.09,-355.84 598.59,-353.21 591.09,-350.59 591.09,-355.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="503.8,-356.21 503.8,-379.01 562.7,-379.01 562.7,-356.21 503.8,-356.21"/>
<text xml:space="preserve" text-anchor="start" x="506.8" y="-362.01" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge1" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M526.3,-579.25C539.62,-574.56 553.28,-570.11 566.4,-566.42 712.58,-525.25 775.41,-574.69 898.4,-485.62 926.97,-464.92 953.69,-436.29 974.46,-411.03"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="976.41,-412.8 979.08,-405.32 972.33,-409.5 976.41,-412.8"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="883.92,-493.62 883.92,-516.42 936.6,-516.42 936.6,-493.62 883.92,-493.62"/>
<text xml:space="preserve" text-anchor="start" x="886.92" y="-499.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">管理認証</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M422.01,-566.6C409.15,-522.99 390.3,-459.02 376.64,-412.7"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="379.22,-412.15 374.58,-405.7 374.18,-413.64 379.22,-412.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="407.06,-493.62 407.06,-516.42 436.4,-516.42 436.4,-493.62 407.06,-493.62"/>
<text xml:space="preserve" text-anchor="start" x="410.06" y="-499.42" font-family="Arial" font-size="14.00" fill="#d4f2ff">照会</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge4" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M113.28,-566.45C85.66,-490.4 47.72,-344.23 125.6,-263.21 165.4,-221.81 1101.33,-228.73 1158.4,-222.41 1346.57,-201.57 1561.25,-158.95 1696.77,-129.68"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1697.06,-132.31 1703.83,-128.15 1695.95,-127.18 1697.06,-132.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="125.6,-341.81 125.6,-364.61 195.4,-364.61 195.4,-341.81 125.6,-341.81"/>
<text xml:space="preserve" text-anchor="start" x="128.6" y="-347.61" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;oke -->
<g id="edge3" class="edge">
<title>bws&#45;&gt;oke</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M184.62,-666.35C216.75,-694.08 260.65,-725.87 306.4,-740.59 416.4,-775.98 457.43,-779.05 566.4,-740.59 604.89,-727.01 640.82,-699.28 668.29,-673.47"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="670.03,-675.44 673.62,-668.35 666.39,-671.65 670.03,-675.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="401.5,-756.82 401.5,-779.62 471.3,-779.62 471.3,-756.82 401.5,-756.82"/>
<text xml:space="preserve" text-anchor="start" x="404.5" y="-762.62" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- user&#45;&gt;tunnel -->
<g id="edge5" class="edge">
<title>user&#45;&gt;tunnel</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1276.4,-566.6C1276.4,-546.25 1276.4,-521.47 1276.4,-496.11"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1279.03,-496.14 1276.4,-488.64 1273.78,-496.14 1279.03,-496.14"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1224.51,-525.9 1224.51,-548.7 1276.4,-548.7 1276.4,-525.9 1224.51,-525.9"/>
<text xml:space="preserve" text-anchor="start" x="1227.51" y="-531.7" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS</text>
</g>
<!-- oke&#45;&gt;vms -->
<g id="edge6" class="edge">
<title>oke&#45;&gt;vms</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M720.4,-566.6C720.4,-523.58 720.4,-460.76 720.4,-414.6"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="723.03,-414.66 720.4,-407.16 717.78,-414.66 723.03,-414.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="720.4,-493.62 720.4,-516.42 808.86,-516.42 808.86,-493.62 720.4,-493.62"/>
<text xml:space="preserve" text-anchor="start" x="723.4" y="-499.42" font-family="Arial" font-size="14.00" fill="#ffe0c2">metrics / logs</text>
</g>
</g>
</svg>
`;case`home_apps`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="869pt" height="760pt"
 viewBox="0.00 0.00 869.00 760.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 745.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="229,-201 229,-722 830.64,-722 830.64,-201 229,-201"/>
<text xml:space="preserve" text-anchor="start" x="237" y="-709.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="575.82,-8 575.82,-193 819.82,-193 819.82,-8 575.82,-8"/>
<text xml:space="preserve" text-anchor="start" x="583.82" y="-180.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<!-- nextcloud -->
<g id="node1" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="449,-501 269,-501 269,-401 449,-401 449,-501"/>
<text xml:space="preserve" text-anchor="start" x="314.53" y="-443" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node2" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="449,-341 269,-341 269,-241 449,-241 449,-341"/>
<text xml:space="preserve" text-anchor="start" x="317.33" y="-283" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信</text>
</g>
<!-- apps -->
<g id="node3" class="node">
<title>apps</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="449,-661 269,-661 269,-561 449,-561 449,-661"/>
<text xml:space="preserve" text-anchor="start" x="317.33" y="-603" font-family="Arial" font-size="20.00" fill="#f8fafc">宅内アプリ</text>
</g>
<!-- dns -->
<g id="node4" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="790.64,-661 605.01,-661 605.01,-561 790.64,-561 790.64,-661"/>
<text xml:space="preserve" text-anchor="start" x="615.02" y="-603" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- nas -->
<g id="node5" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M787.82,-130.91C787.82,-135.93 747.48,-140 697.82,-140 648.16,-140 607.82,-135.93 607.82,-130.91 607.82,-130.91 607.82,-49.09 607.82,-49.09 607.82,-44.07 648.16,-40 697.82,-40 747.48,-40 787.82,-44.07 787.82,-49.09 787.82,-49.09 787.82,-130.91 787.82,-130.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M787.82,-130.91C787.82,-125.9 747.48,-121.82 697.82,-121.82 648.16,-121.82 607.82,-125.9 607.82,-130.91"/>
<text xml:space="preserve" text-anchor="start" x="628.37" y="-82" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS / NFS</text>
</g>
<!-- user -->
<g id="node6" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-684 0,-684 0,-584 180,-584 180,-684"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-626" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- edge -->
<g id="node7" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="180,-501 0,-501 0,-401 180,-401 180,-501"/>
<text xml:space="preserve" text-anchor="start" x="44.42" y="-443" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- nextcloud&#45;&gt;nas -->
<g id="edge3" class="edge">
<title>nextcloud&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M416.73,-401.4C427.61,-391.5 438.78,-381.06 449,-371 503.02,-317.83 531.15,-313.81 565.01,-246 577.12,-221.76 561.91,-209.25 575.82,-186 585.06,-170.56 597.76,-156.63 611.48,-144.46"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="612.89,-146.72 616.89,-139.85 609.48,-142.72 612.89,-146.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="489.78,-333.37 489.78,-356.17 564.23,-356.17 564.23,-333.37 489.78,-333.37"/>
<text xml:space="preserve" text-anchor="start" x="492.78" y="-339.17" font-family="Arial" font-size="14.00" fill="#bbfcd3">NFS / PVC</text>
</g>
<!-- recording&#45;&gt;nas -->
<g id="edge4" class="edge">
<title>recording&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M443.69,-241.06C493.59,-211.28 556.91,-173.49 607.74,-143.16"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="609.06,-145.43 614.15,-139.33 606.37,-140.92 609.06,-145.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="489,-208.5 489,-231.3 565.01,-231.3 565.01,-208.5 489,-208.5"/>
<text xml:space="preserve" text-anchor="start" x="492" y="-214.3" font-family="Arial" font-size="14.00" fill="#bbfcd3">メディア保存</text>
</g>
<!-- apps&#45;&gt;dns -->
<!-- user&#45;&gt;edge -->
<g id="edge1" class="edge">
<title>user&#45;&gt;edge</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M90,-584.12C90,-561.48 90,-534.53 90,-510.81"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="92.63,-511.05 90,-503.55 87.38,-511.05 92.63,-511.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="49.66,-531.1 49.66,-553.9 101.54,-553.9 101.54,-531.1 49.66,-531.1"/>
<text xml:space="preserve" text-anchor="start" x="52.66" y="-536.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS</text>
</g>
<!-- edge&#45;&gt;nextcloud -->
<g id="edge2" class="edge">
<title>edge&#45;&gt;nextcloud</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.91,-451C192.35,-451 205.38,-451 218.48,-451"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="218.47,-453.63 225.97,-451 218.47,-448.38 218.47,-453.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="204.41,-439.6 204.41,-462.4 324.77,-462.4 324.77,-439.6 204.41,-439.6"/>
<text xml:space="preserve" text-anchor="start" x="207.41" y="-445.4" font-family="Arial" font-size="14.00" fill="#bbfcd3">Tunnel / 内部HTTP</text>
</g>
</g>
</svg>
`;case`delivery`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1847pt" height="893pt"
 viewBox="0.00 0.00 1847.00 893.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 877.88)">
<g id="clust1" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="591,-450.82 591,-854.83 1357,-854.83 1357,-450.82 591,-450.82"/>
<text xml:space="preserve" text-anchor="start" x="599" y="-841.93" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="539,-218.81 539,-404.02 839,-404.02 839,-218.81 539,-218.81"/>
<text xml:space="preserve" text-anchor="start" x="547" y="-391.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_oke</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-8 8,-412.02 531,-412.02 531,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-399.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<!-- git -->
<g id="node1" class="node">
<title>git</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1076.6,-793.63 845.4,-793.63 845.4,-693.62 1076.6,-693.62 1076.6,-793.63"/>
<text xml:space="preserve" text-anchor="start" x="855.41" y="-735.63" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- ansible -->
<g id="node2" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1317,-793.63 1137,-793.63 1137,-693.62 1317,-693.62 1317,-793.63"/>
<text xml:space="preserve" text-anchor="start" x="1194.2" y="-735.63" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- tfc -->
<g id="node3" class="node">
<title>tfc</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1051,-590.82 871,-590.82 871,-490.82 1051,-490.82 1051,-590.82"/>
<text xml:space="preserve" text-anchor="start" x="888.2" y="-532.82" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- argo -->
<g id="node4" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1291,-590.82 1111,-590.82 1111,-490.82 1291,-490.82 1291,-590.82"/>
<text xml:space="preserve" text-anchor="start" x="1148.76" y="-532.82" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- runner -->
<g id="node5" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="811,-590.82 631,-590.82 631,-490.82 811,-490.82 811,-590.82"/>
<text xml:space="preserve" text-anchor="start" x="645.98" y="-532.82" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 専用runner</text>
</g>
<!-- vms -->
<g id="node6" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M806.8,-341.72C806.8,-346.74 754,-350.82 689,-350.82 624,-350.82 571.2,-346.74 571.2,-341.72 571.2,-341.72 571.2,-259.9 571.2,-259.9 571.2,-254.88 624,-250.81 689,-250.81 754,-250.81 806.8,-254.88 806.8,-259.9 806.8,-259.9 806.8,-341.72 806.8,-341.72"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M806.8,-341.72C806.8,-336.71 754,-332.63 689,-332.63 624,-332.63 571.2,-336.71 571.2,-341.72"/>
<text xml:space="preserve" text-anchor="start" x="581.21" y="-292.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- argo_1 -->
<g id="node7" class="node">
<title>argo_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="247,-350.82 67,-350.82 67,-250.81 247,-250.81 247,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="97.54" y="-292.81" font-family="Arial" font-size="20.00" fill="#f8fafc">OKE ArgoCD</text>
</g>
<!-- scale -->
<g id="node8" class="node">
<title>scale</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="490.71,-350.82 307.29,-350.82 307.29,-250.81 490.71,-250.81 490.71,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="317.3" y="-292.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Cluster Autoscaler</text>
</g>
<!-- api -->
<g id="node9" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="265.95,-148.01 48.05,-148.01 48.05,-48 265.95,-48 265.95,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="58.06" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">OKE API / Node pools</text>
</g>
<!-- hardware -->
<g id="node10" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1531,-350.82 1351,-350.82 1351,-250.81 1531,-250.81 1531,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="1365.99" y="-292.81" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- edge -->
<g id="node11" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1051,-350.82 871,-350.82 871,-250.81 1051,-250.81 1051,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="915.42" y="-292.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- home -->
<g id="node12" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1291,-350.82 1111,-350.82 1111,-250.81 1291,-250.81 1291,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="1132.09" y="-292.81" font-family="Arial" font-size="20.00" fill="#eff6ff">自宅 / home&#45;k8s</text>
</g>
<!-- reventer -->
<g id="node13" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1817.37,-350.82 1590.63,-350.82 1590.63,-250.81 1817.37,-250.81 1817.37,-350.82"/>
<text xml:space="preserve" text-anchor="start" x="1600.64" y="-292.81" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter / STG・PRD</text>
</g>
<!-- git&#45;&gt;tfc -->
<g id="edge1" class="edge">
<title>git&#45;&gt;tfc</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M961,-693.76C961,-665.72 961,-630.33 961,-600.75"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="963.63,-601.08 961,-593.58 958.38,-601.08 963.63,-601.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="961,-630.82 961,-653.62 1051.79,-653.62 1051.79,-630.82 961,-630.82"/>
<text xml:space="preserve" text-anchor="start" x="964" y="-636.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">Terraform実行</text>
</g>
<!-- git&#45;&gt;argo -->
<g id="edge2" class="edge">
<title>git&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1019.4,-693.76C1054.23,-664.62 1098.56,-627.53 1134.7,-597.29"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1136.36,-599.33 1140.43,-592.5 1132.99,-595.3 1136.36,-599.33"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1088.2,-630.82 1088.2,-653.62 1137.76,-653.62 1137.76,-630.82 1088.2,-630.82"/>
<text xml:space="preserve" text-anchor="start" x="1091.2" y="-636.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- git&#45;&gt;runner -->
<g id="edge3" class="edge">
<title>git&#45;&gt;runner</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M902.6,-693.76C867.77,-664.62 823.44,-627.53 787.3,-597.29"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="789.01,-595.3 781.57,-592.5 785.64,-599.33 789.01,-595.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="848.2,-630.82 848.2,-653.62 922.68,-653.62 922.68,-630.82 848.2,-630.82"/>
<text xml:space="preserve" text-anchor="start" x="851.2" y="-636.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">Actions job</text>
</g>
<!-- git&#45;&gt;argo_1 -->
<g id="edge4" class="edge">
<title>git&#45;&gt;argo_1</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M845.57,-707.49C761.9,-680.2 647.12,-638.97 551.43,-590.82 421.39,-525.39 391.99,-501.29 277,-412.02 255.6,-395.4 233.41,-375.79 214.03,-357.75"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="215.94,-355.95 208.67,-352.73 212.35,-359.78 215.94,-355.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="551.43,-529.42 551.43,-552.22 601,-552.22 601,-529.42 551.43,-529.42"/>
<text xml:space="preserve" text-anchor="start" x="554.43" y="-535.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- ansible&#45;&gt;hardware -->
<g id="edge5" class="edge">
<title>ansible&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1316.66,-709.91C1420.27,-666.67 1585.64,-579.57 1657,-442.82 1661.69,-433.83 1663.86,-427.47 1657,-420.02 1642.5,-404.26 1580.61,-420.61 1561,-412.02 1533.31,-399.88 1507.83,-378.67 1487.53,-358.08"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1489.48,-356.32 1482.39,-352.72 1485.69,-359.95 1489.48,-356.32"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1649.5,-529.42 1649.5,-552.22 1702.18,-552.22 1702.18,-529.42 1649.5,-529.42"/>
<text xml:space="preserve" text-anchor="start" x="1652.5" y="-535.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">機器設定</text>
</g>
<!-- tfc&#45;&gt;vms -->
<g id="edge8" class="edge">
<title>tfc&#45;&gt;vms</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M905.3,-491.08C861.37,-452.64 800.02,-398.96 753.88,-358.58"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="755.68,-356.67 748.31,-353.71 752.22,-360.62 755.68,-356.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="849.36,-420.02 849.36,-442.82 899.7,-442.82 899.7,-420.02 849.36,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="852.36" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">監視VM</text>
</g>
<!-- tfc&#45;&gt;argo_1 -->
<g id="edge9" class="edge">
<title>tfc&#45;&gt;argo_1</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M908.74,-490.95C888.97,-475.34 865.34,-459.79 841,-450.82 837.6,-449.56 364.22,-418.96 287.45,-412.98"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="287.72,-410.36 280.01,-412.29 287.24,-415.59 287.72,-410.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="521.87,-433.82 521.87,-456.62 593.99,-456.62 593.99,-433.82 521.87,-433.82"/>
<text xml:space="preserve" text-anchor="start" x="524.87" y="-439.62" font-family="Arial" font-size="14.00" fill="#cbd0fd">OCI / OKE</text>
</g>
<!-- tfc&#45;&gt;hardware -->
<g id="edge6" class="edge">
<title>tfc&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1012.53,-491.02C1032.4,-475.21 1056.29,-459.52 1081,-450.82 1123.58,-435.81 1241.86,-459.01 1284,-442.82 1303.97,-435.14 1304.89,-426.1 1321,-412.02 1340.93,-394.59 1362.32,-375.18 1381.44,-357.56"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1382.98,-359.72 1386.71,-352.7 1379.41,-355.86 1382.98,-359.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1312.21,-420.02 1312.21,-442.82 1420.89,-442.82 1420.89,-420.02 1312.21,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="1315.21" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM / ネットワーク</text>
</g>
<!-- tfc&#45;&gt;edge -->
<g id="edge7" class="edge">
<title>tfc&#45;&gt;edge</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M961,-491.08C961,-453.38 961,-401.02 961,-360.92"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="963.63,-361.01 961,-353.51 958.38,-361.01 963.63,-361.01"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="961,-420.02 961,-442.82 1107.83,-442.82 1107.83,-420.02 961,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="964" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">DNS / Access / Tunnel</text>
</g>
<!-- argo&#45;&gt;home -->
<g id="edge10" class="edge">
<title>argo&#45;&gt;home</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1194.83,-491.05C1193.16,-475.65 1191.58,-458.54 1190.75,-442.82 1189.33,-415.89 1191.02,-386.1 1193.41,-360.87"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1195.99,-361.46 1194.13,-353.74 1190.76,-360.94 1195.99,-361.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1190.75,-420.02 1190.75,-442.82 1273,-442.82 1273,-420.02 1190.75,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="1193.75" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期</text>
</g>
<!-- argo&#45;&gt;reventer -->
<g id="edge11" class="edge">
<title>argo&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1290.87,-516.5C1365.78,-495.07 1473.93,-459.45 1561,-412.02 1588.94,-396.79 1617.21,-376.31 1641.16,-357.14"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1642.58,-359.36 1646.75,-352.6 1639.27,-355.28 1642.58,-359.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1542.83,-420.02 1542.83,-442.82 1677.18,-442.82 1677.18,-420.02 1542.83,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="1545.83" y="-425.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">STG・PRDアプリ同期</text>
</g>
<!-- argo_1&#45;&gt;api -->
<g id="edge12" class="edge">
<title>argo_1&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M157,-250.95C157,-222.91 157,-187.51 157,-157.94"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="159.63,-158.27 157,-150.77 154.38,-158.27 159.63,-158.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="157,-188.01 157,-210.81 233.01,-210.81 233.01,-188.01 157,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="160" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">共通基盤同期</text>
</g>
<!-- scale&#45;&gt;api -->
<g id="edge13" class="edge">
<title>scale&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M340.11,-250.95C304.84,-221.68 259.92,-184.4 223.39,-154.1"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="225.51,-152.44 218.06,-149.67 222.16,-156.48 225.51,-152.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="285.26,-188.01 285.26,-210.81 376.08,-210.81 376.08,-188.01 285.26,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="288.26" y="-193.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">burst pool増減</text>
</g>
</g>
</svg>
`;case`secrets`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="759pt" height="793pt"
 viewBox="0.00 0.00 759.00 793.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 778.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="405.59,-570 405.59,-755 720.82,-755 720.82,-570 405.59,-570"/>
<text xml:space="preserve" text-anchor="start" x="413.59" y="-742.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_oke</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="405.59,-377 405.59,-562 720.82,-562 720.82,-377 405.59,-377"/>
<text xml:space="preserve" text-anchor="start" x="413.59" y="-549.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="407.6,-8 407.6,-369 718.8,-369 718.8,-8 407.6,-8"/>
<text xml:space="preserve" text-anchor="start" x="415.6" y="-356.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<!-- eso -->
<g id="node1" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="688.82,-702 437.59,-702 437.59,-602 688.82,-602 688.82,-702"/>
<text xml:space="preserve" text-anchor="start" x="447.6" y="-644" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- eso_1 -->
<g id="node2" class="node">
<title>eso_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="688.82,-509 437.59,-509 437.59,-409 688.82,-409 688.82,-509"/>
<text xml:space="preserve" text-anchor="start" x="447.6" y="-451" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- git -->
<g id="node3" class="node">
<title>git</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="678.8,-308 447.6,-308 447.6,-208 678.8,-208 678.8,-308"/>
<text xml:space="preserve" text-anchor="start" x="457.61" y="-250" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- tfc -->
<g id="node4" class="node">
<title>tfc</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="653.2,-148 473.2,-148 473.2,-48 653.2,-48 653.2,-148"/>
<text xml:space="preserve" text-anchor="start" x="490.4" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- bws -->
<g id="node5" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="266.8,-380 0,-380 0,-280 266.8,-280 266.8,-380"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-322" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge1" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M180.27,-379.68C231.5,-433.18 318.7,-518.48 405.59,-577 416.05,-584.04 427.27,-590.79 438.72,-597.14"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="437.44,-599.43 445.29,-600.7 439.95,-594.82 437.44,-599.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="317.3,-571.46 317.3,-594.26 387.1,-594.26 387.1,-571.46 317.3,-571.46"/>
<text xml:space="preserve" text-anchor="start" x="320.3" y="-577.26" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;eso_1 -->
<g id="edge2" class="edge">
<title>bws&#45;&gt;eso_1</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M266.54,-369.84C317.84,-385.32 376.54,-403.01 428.04,-418.54"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="427.06,-420.99 435,-420.64 428.58,-415.96 427.06,-420.99"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="317.3,-406.05 317.3,-428.85 387.1,-428.85 387.1,-406.05 317.3,-406.05"/>
<text xml:space="preserve" text-anchor="start" x="320.3" y="-411.85" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;git -->
<g id="edge3" class="edge">
<title>bws&#45;&gt;git</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M266.54,-307.76C321.07,-298.58 383.95,-288 437.67,-278.96"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="437.99,-281.57 444.95,-277.73 437.12,-276.39 437.99,-281.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="309.9,-300.45 309.9,-323.25 394.49,-323.25 394.49,-300.45 309.9,-300.45"/>
<text xml:space="preserve" text-anchor="start" x="312.9" y="-306.25" font-family="Arial" font-size="14.00" fill="#fcd9d2">CI credential</text>
</g>
<!-- bws&#45;&gt;tfc -->
<g id="edge4" class="edge">
<title>bws&#45;&gt;tfc</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M221.56,-280.02C274.5,-249.95 343.61,-211.18 405.59,-178 424.41,-167.92 444.64,-157.38 464.09,-147.38"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="465.1,-149.82 470.58,-144.06 462.7,-145.14 465.1,-149.82"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="306.8,-231.34 306.8,-254.14 397.59,-254.14 397.59,-231.34 306.8,-231.34"/>
<text xml:space="preserve" text-anchor="start" x="309.8" y="-237.14" font-family="Arial" font-size="14.00" fill="#fcd9d2">Terraform変数</text>
</g>
</g>
</svg>
`;case`observability`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1059pt" height="607pt"
 viewBox="0.00 0.00 1059.00 607.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 592.05)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="332.61,-8 332.61,-193 576.61,-193 576.61,-8 332.61,-8"/>
<text xml:space="preserve" text-anchor="start" x="340.61" y="-180.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅 / HOME&#45;K8S</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="704.99,-185 704.99,-569 1020.58,-569 1020.58,-185 704.99,-185"/>
<text xml:space="preserve" text-anchor="start" x="712.99" y="-556.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<!-- agent -->
<g id="node1" class="node">
<title>agent</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="544.61,-140 364.61,-140 364.61,-40 544.61,-40 544.61,-140"/>
<text xml:space="preserve" text-anchor="start" x="412.92" y="-82" font-family="Arial" font-size="20.00" fill="#f8fafc">収集agent</text>
</g>
<!-- grafana -->
<g id="node2" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="967.28,-508 758.29,-508 758.29,-408 967.28,-408 967.28,-508"/>
<text xml:space="preserve" text-anchor="start" x="768.3" y="-450" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- vms -->
<g id="node3" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M980.58,-315.91C980.58,-320.93 927.78,-325 862.78,-325 797.78,-325 744.99,-320.93 744.99,-315.91 744.99,-315.91 744.99,-234.09 744.99,-234.09 744.99,-229.07 797.78,-225 862.78,-225 927.78,-225 980.58,-229.07 980.58,-234.09 980.58,-234.09 980.58,-315.91 980.58,-315.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M980.58,-315.91C980.58,-310.9 927.78,-306.82 862.78,-306.82 797.78,-306.82 744.99,-310.9 744.99,-315.91"/>
<text xml:space="preserve" text-anchor="start" x="754.99" y="-267" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- hardware -->
<g id="node4" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="180,-140 0,-140 0,-40 180,-40 180,-140"/>
<text xml:space="preserve" text-anchor="start" x="14.99" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- operator -->
<g id="node5" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="544.61,-508 364.61,-508 364.61,-408 544.61,-408 544.61,-508"/>
<text xml:space="preserve" text-anchor="start" x="429.61" y="-450" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- oke -->
<g id="node6" class="node">
<title>oke</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="568.52,-325 340.7,-325 340.7,-225 568.52,-225 568.52,-325"/>
<text xml:space="preserve" text-anchor="start" x="350.7" y="-267" font-family="Arial" font-size="20.00" fill="#eff6ff">OCI / STG OKE共通基盤</text>
</g>
<!-- agent&#45;&gt;vms -->
<g id="edge4" class="edge">
<title>agent&#45;&gt;vms</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M544.5,-130.48C604.13,-157.65 683.24,-193.68 747.54,-222.97"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="746.25,-225.26 754.16,-225.98 748.43,-220.48 746.25,-225.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="608.52,-199.07 608.52,-221.87 696.99,-221.87 696.99,-199.07 608.52,-199.07"/>
<text xml:space="preserve" text-anchor="start" x="611.52" y="-204.87" font-family="Arial" font-size="14.00" fill="#ffe0c2">metrics / logs</text>
</g>
<!-- grafana&#45;&gt;vms -->
<g id="edge5" class="edge">
<title>grafana&#45;&gt;vms</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M862.78,-408.25C862.78,-386.11 862.78,-359.82 862.78,-336.47"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="865.41,-336.5 862.78,-329 860.16,-336.5 865.41,-336.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="818.93,-355.1 818.93,-377.9 877.83,-377.9 877.83,-355.1 818.93,-355.1"/>
<text xml:space="preserve" text-anchor="start" x="821.93" y="-360.9" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由</text>
</g>
<!-- hardware&#45;&gt;agent -->
<g id="edge1" class="edge">
<title>hardware&#45;&gt;agent</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M179.7,-90C232.59,-90 299.85,-90 354.48,-90"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="354.35,-92.63 361.85,-90 354.35,-87.38 354.35,-92.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-90 220,-112.8 300.7,-112.8 300.7,-90 220,-90"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-95.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">exporter収集</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M544.5,-458C604.33,-458 683.77,-458 748.18,-458"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="747.86,-460.63 755.36,-458 747.86,-455.38 747.86,-460.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="638.09,-458 638.09,-480.8 667.42,-480.8 667.42,-458 638.09,-458"/>
<text xml:space="preserve" text-anchor="start" x="641.09" y="-463.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">照会</text>
</g>
<!-- oke&#45;&gt;vms -->
<g id="edge3" class="edge">
<title>oke&#45;&gt;vms</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M568.48,-275C619.76,-275 680.67,-275 733.66,-275"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="733.62,-277.63 741.12,-275 733.62,-272.38 733.62,-277.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="608.52,-275 608.52,-297.8 696.99,-297.8 696.99,-275 608.52,-275"/>
<text xml:space="preserve" text-anchor="start" x="611.52" y="-280.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">metrics / logs</text>
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
<!-- application -->
<g id="node3" class="node">
<title>application</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="521.9,-660 101.7,-660 101.7,-480 521.9,-480 521.9,-660"/>
<text xml:space="preserve" text-anchor="start" x="121.75" y="-573" font-family="Arial" font-size="20.00" fill="#fafafa">reventer所有 / STG・PRDアプリ・PRD OKE</text>
<text xml:space="preserve" text-anchor="start" x="168.02" y="-550" font-family="Arial" font-size="15.00" fill="#d4d4d4">別リポジトリ管理。モデルで所有境界を維持する。</text>
</g>
</g>
</svg>
`;default:throw Error(`Unknown viewId: `+e)}};export{e as dotSource,t as svgSource};