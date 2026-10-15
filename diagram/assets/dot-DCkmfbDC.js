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
    vms -> reventer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">監視データの保存先を提供</FONT></TD></TR></TABLE>>,
        likec4_id=qez0fe,
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
        style=dotted,
        weight=2];
    shared_prd [color="#525252",
        fillcolor="#737373",
        fontcolor="#fafafa",
        height=1.389,
        label=<<FONT POINT-SIZE="20">PRDクラスタへ提供する共通アドオン</FONT>>,
        likec4_id=shared_prd,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    bws -> shared_prd [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO / PRD Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="2hl52n",
        style=dotted,
        weight=2];
    control [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">変更・運用</FONT>>,
        likec4_id=control,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    bws -> control [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器・PBS用credential</FONT></TD></TR></TABLE>>,
        likec4_id=lvxqoo,
        style=dotted,
        weight=2];
    bws -> home [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id=c0a5so,
        style=dotted,
        weight=2];
    tunnel -> control [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id="1dis8fv",
        style=dashed,
        weight=3];
    tunnel -> nas [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / NAS管理UI</FONT></TD></TR></TABLE>>,
        likec4_id="1xrgwdy",
        style=dashed];
    tunnel -> home [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 公開UI・サービス</FONT></TD></TR></TABLE>>,
        likec4_id="18hfz23",
        style=dashed,
        weight=2];
    oke -> reventer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">STGの実行基盤を提供</FONT></TD></TR></TABLE>>,
        likec4_id="145s2wx",
        style=dashed,
        weight=2];
    shared_prd -> reventer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">共有Gateway Controllerを提供</FONT></TD></TR></TABLE>>,
        likec4_id="16putg0",
        style=dashed,
        weight=2];
    control -> reventer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GitOps・CI・Terraformの実行基盤を提供</FONT></TD></TR></TABLE>>,
        likec4_id=s1uo6f,
        style=dashed,
        weight=2];
    nas -> home [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NFSストレージを提供</FONT></TD></TR></TABLE>>,
        likec4_id="1ne3xl3",
        minlen=0,
        style=dashed,
        weight=4];
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
        likec4_id="control.argo",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    tunnel -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Access認証後 / 管理UI</FONT></TD></TR></TABLE>>,
        likec4_id="1qazy7i",
        minlen=1,
        style=dashed,
        weight=2];
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
        argo [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">自宅ArgoCD</FONT>>,
            likec4_id="control.argo",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        reviews [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Re:Venterの一時レビュー</FONT>>,
            likec4_id="control.reviews",
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
    protected -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id="1t7gfk8",
        minlen=1,
        style=dashed,
        weight=2];
    protected -> reviews [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証後の内部接続</FONT></TD></TR></TABLE>>,
        likec4_id=dncsze,
        minlen=1,
        style=dashed,
        weight=2];
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
        images [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Image Updater</FONT>>,
            likec4_id="control.images",
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
        runner [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">ARC / 専用runner</FONT>>,
            likec4_id="control.runner",
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
        ansible [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Ansible</FONT>>,
            likec4_id="control.ansible",
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
            height=1.389,
            label=<<FONT POINT-SIZE="20">OKE ArgoCD</FONT>>,
            likec4_id="oke.argo",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        api [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">OKE API / Node pools</FONT>>,
            likec4_id="oke.api",
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
    shared_prd [color="#525252",
        fillcolor="#737373",
        fontcolor="#fafafa",
        height=1.389,
        label=<<FONT POINT-SIZE="20">PRDクラスタへ提供する共通アドオン</FONT>>,
        likec4_id=shared_prd,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    images -> shared_prd [style=invis];
    github -> terraform_cloud [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Terraform実行</FONT></TD></TR></TABLE>>,
        likec4_id="1w081l3",
        style=dashed,
        weight=3];
    github -> github_pages [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">構成図・PR比較を公開</FONT></TD></TR></TABLE>>,
        likec4_id="149xiol",
        minlen=1,
        style=dashed,
        weight=3];
    github -> argo [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">GitOps</FONT></TD></TR></TABLE>>,
        likec4_id=r8wn3i,
        style=dashed];
    github -> runner [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Actions job</FONT></TD></TR></TABLE>>,
        likec4_id="19u87wl",
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
    argo -> reventer [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">STG・PRDアプリ同期</FONT></TD></TR></TABLE>>,
        likec4_id="10x7aky",
        style=dashed];
    argo -> home [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">manifest同期</FONT></TD></TR></TABLE>>,
        likec4_id="1vrjl0f",
        minlen=1,
        style=dashed];
    runner -> reventer [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">利用側のCI jobを実行</FONT></TD></TR></TABLE>>,
        likec4_id=nrog0p,
        style=dashed];
    tfc_agents -> reventer [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">利用側workspaceの実行を受託</FONT></TD></TR></TABLE>>,
        likec4_id="1v8qlil",
        style=dashed];
    tfc_agents -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM / ネットワーク</FONT></TD></TR></TABLE>>,
        likec4_id=olxe35,
        style=dashed];
    ansible -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器設定</FONT></TD></TR></TABLE>>,
        likec4_id=f03odn,
        minlen=1,
        style=dashed];
    packer -> hardware [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM template</FONT></TD></TR></TABLE>>,
        likec4_id="1j020ez",
        minlen=1,
        style=dashed];
    argo_1 -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">共通基盤同期</FONT></TD></TR></TABLE>>,
        likec4_id="177ll8p",
        minlen=0,
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
    subgraph cluster_shared_prd {
        graph [color="#313131",
            fillcolor="#454545",
            label=<<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>PRDクラスタへ提供する共通アドオン</B></FONT>>,
            likec4_depth=1,
            likec4_id=shared_prd,
            likec4_level=0,
            margin=32,
            style=filled
        ];
        eso_2 [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">External Secrets Operator</FONT>>,
            likec4_id="shared_prd.eso",
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
    bws -> backups [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO経由 / backup credential</FONT></TD></TR></TABLE>>,
        likec4_id="159f6d0",
        minlen=1,
        style=dotted];
    bws -> eso_1 [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id="1qfyatl",
        style=dotted,
        weight=2];
    bws -> eso_2 [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">ESO / PRD Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id=dfbe3c,
        style=dotted,
        weight=2];
    bws -> ansible [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">機器・PBS用credential</FONT></TD></TR></TABLE>>,
        likec4_id="7mk1uw",
        minlen=1,
        style=dotted,
        weight=2];
    eso_1 -> reventer [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">利用側Secretへ注入 / STG</FONT></TD></TR></TABLE>>,
        likec4_id=hudsd2,
        style=dotted];
    eso_2 -> reventer [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">利用側Secretへ注入 / PRD</FONT></TD></TR></TABLE>>,
        likec4_id="98df9j",
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
    reventer -> vms [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">metrics / logs / 環境別</FONT></TD></TR></TABLE>>,
        likec4_id=h60zze,
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
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">外部所有PRDクラスタ / 共通アドオンの配置先</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">この図が管理対象として示すのは共通アドオンとApplication登録。クラスタ本体・アプリ実装はreventerが所有。</FONT></TD></TR></TABLE>>;
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
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>外部サービス / SAAS・公開サービス</B></FONT>>,
            likec4_depth=1,
            likec4_id=external,
            likec4_level=0,
            margin=40,
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
    operator -> unifi [style=invis];
    unifi -> coredns [style=invis];
    coredns -> metallb [style=invis];
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
    router -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BVI20</FONT></TD></TR></TABLE>>,
        likec4_id=vatnfd,
        style=dotted,
        weight=3];
    workers -> private_workers [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private subnet / 10.0.2.0/24</FONT></TD></TR></TABLE>>,
        likec4_id=a3omiw,
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
    warp -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private CIDR routes / WARP policy</FONT></TD></TR></TABLE>>,
        likec4_id="1nzidds",
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
<svg width="2078pt" height="1071pt"
 viewBox="0.00 0.00 2078.00 1071.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1055.48)">
<g id="clust1" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="8,-272.01 8,-457.22 308,-457.22 308,-272.01 8,-272.01"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-444.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_external</title>
<polygon fill="#1a468d" stroke="#1c3979" points="434,-557.22 434,-859.62 1595,-859.62 1595,-557.22 434,-557.22"/>
<text xml:space="preserve" text-anchor="start" x="442" y="-846.72" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_edge</title>
<polygon fill="#5a3620" stroke="#462a17" points="474,-597.22 474,-798.42 1249,-798.42 1249,-597.22 474,-597.22"/>
<text xml:space="preserve" text-anchor="start" x="482" y="-785.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="316,-232.01 316,-518.42 1091,-518.42 1091,-232.01 316,-232.01"/>
<text xml:space="preserve" text-anchor="start" x="324" y="-505.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="356,-272.01 356,-457.22 696,-457.22 696,-272.01 356,-272.01"/>
<text xml:space="preserve" text-anchor="start" x="364" y="-444.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1426,-8 1426,-193.21 1670,-193.21 1670,-8 1426,-8"/>
<text xml:space="preserve" text-anchor="start" x="1434" y="-180.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<!-- vms -->
<g id="node1" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M275.8,-394.92C275.8,-399.94 223,-404.02 158,-404.02 93,-404.02 40.2,-399.94 40.2,-394.92 40.2,-394.92 40.2,-313.1 40.2,-313.1 40.2,-308.08 93,-304.01 158,-304.01 223,-304.01 275.8,-308.08 275.8,-313.1 275.8,-313.1 275.8,-394.92 275.8,-394.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M275.8,-394.92C275.8,-389.91 223,-385.83 158,-385.83 93,-385.83 40.2,-389.91 40.2,-394.92"/>
<text xml:space="preserve" text-anchor="start" x="50.21" y="-346.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- access -->
<g id="node2" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="828.28,-737.22 513.72,-737.22 513.72,-637.22 828.28,-637.22 828.28,-737.22"/>
<text xml:space="preserve" text-anchor="start" x="523.73" y="-679.22" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- tunnel -->
<g id="node3" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1209,-737.22 1029,-737.22 1029,-637.22 1209,-637.22 1209,-737.22"/>
<text xml:space="preserve" text-anchor="start" x="1040.06" y="-679.22" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- bws -->
<g id="node4" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1555.4,-737.22 1288.6,-737.22 1288.6,-637.22 1555.4,-637.22 1555.4,-737.22"/>
<text xml:space="preserve" text-anchor="start" x="1298.61" y="-679.22" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- nas -->
<g id="node5" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M664.36,-394.92C664.36,-399.94 602.35,-404.02 526,-404.02 449.65,-404.02 387.64,-399.94 387.64,-394.92 387.64,-394.92 387.64,-313.1 387.64,-313.1 387.64,-308.08 449.65,-304.01 526,-304.01 602.35,-304.01 664.36,-308.08 664.36,-313.1 664.36,-313.1 664.36,-394.92 664.36,-394.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M664.36,-394.92C664.36,-389.91 602.35,-385.83 526,-385.83 449.65,-385.83 387.64,-389.91 387.64,-394.92"/>
<text xml:space="preserve" text-anchor="start" x="397.65" y="-346.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- home -->
<g id="node6" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1051,-404.02 871,-404.02 871,-304.01 1051,-304.01 1051,-404.02"/>
<text xml:space="preserve" text-anchor="start" x="884.31" y="-346.01" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- reventer -->
<g id="node7" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1638,-140.01 1458,-140.01 1458,-40 1638,-40 1638,-140.01"/>
<text xml:space="preserve" text-anchor="start" x="1502.98" y="-82" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- user -->
<g id="node8" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="631,-1040.43 451,-1040.43 451,-940.42 631,-940.42 631,-1040.43"/>
<text xml:space="preserve" text-anchor="start" x="516" y="-982.43" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- operator -->
<g id="node9" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="891,-1040.43 711,-1040.43 711,-940.42 891,-940.42 891,-1040.43"/>
<text xml:space="preserve" text-anchor="start" x="776" y="-982.43" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- oke -->
<g id="node10" class="node">
<title>oke</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1655.91,-404.02 1428.09,-404.02 1428.09,-304.01 1655.91,-304.01 1655.91,-404.02"/>
<text xml:space="preserve" text-anchor="start" x="1438.09" y="-346.01" font-family="Arial" font-size="20.00" fill="#eff6ff">OCI / STG OKE共通基盤</text>
</g>
<!-- shared_prd -->
<g id="node11" class="node">
<title>shared_prd</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="2048.15,-404.02 1735.85,-404.02 1735.85,-304.01 2048.15,-304.01 2048.15,-404.02"/>
<text xml:space="preserve" text-anchor="start" x="1745.86" y="-346.01" font-family="Arial" font-size="20.00" fill="#fafafa">PRDクラスタへ提供する共通アドオン</text>
</g>
<!-- control -->
<g id="node12" class="node">
<title>control</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1311,-404.02 1131,-404.02 1131,-304.01 1311,-304.01 1311,-404.02"/>
<text xml:space="preserve" text-anchor="start" x="1179.33" y="-346.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">変更・運用</text>
</g>
<!-- vms&#45;&gt;reventer -->
<g id="edge3" class="edge">
<title>vms&#45;&gt;reventer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M215.74,-303.19C248.76,-277.54 292.23,-248.31 336,-232.01 539.76,-156.14 1196.06,-111.28 1448.12,-96.48"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1448.01,-99.12 1455.34,-96.06 1447.7,-93.88 1448.01,-99.12"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="431.68,-201.21 431.68,-224.01 577.71,-224.01 577.71,-201.21 431.68,-201.21"/>
<text xml:space="preserve" text-anchor="start" x="434.68" y="-207.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">監視データの保存先を提供</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge4" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M828,-687.22C891.4,-687.22 962.68,-687.22 1018.83,-687.22"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1018.61,-689.85 1026.11,-687.22 1018.61,-684.6 1018.61,-689.85"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="868.07,-690.22 868.07,-713.02 989.21,-713.02 989.21,-690.22 868.07,-690.22"/>
<text xml:space="preserve" text-anchor="start" x="871.07" y="-696.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- tunnel&#45;&gt;nas -->
<g id="edge10" class="edge">
<title>tunnel&#45;&gt;nas</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1044.73,-637.27C996.5,-608.28 931.09,-574.01 868,-557.22 830.4,-547.2 728.06,-566.25 693.08,-549.22 633.65,-520.29 586.92,-459.51 558.17,-413.61"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="560.41,-412.23 554.25,-407.22 555.94,-414.98 560.41,-412.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="693.08,-526.42 693.08,-549.22 857,-549.22 857,-526.42 693.08,-526.42"/>
<text xml:space="preserve" text-anchor="start" x="696.08" y="-532.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後 / NAS管理UI</text>
</g>
<!-- tunnel&#45;&gt;home -->
<g id="edge11" class="edge">
<title>tunnel&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1029.06,-658.92C976.87,-637.93 915.5,-603.19 884.52,-549.22 859.48,-505.59 884.08,-452.17 911.85,-412.41"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="913.97,-413.96 916.23,-406.34 909.71,-410.89 913.97,-413.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="884.52,-526.42 884.52,-549.22 1078,-549.22 1078,-526.42 884.52,-526.42"/>
<text xml:space="preserve" text-anchor="start" x="887.52" y="-532.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- tunnel&#45;&gt;control -->
<g id="edge9" class="edge">
<title>tunnel&#45;&gt;control</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1103.33,-637.5C1095.51,-605.03 1090.31,-561.96 1103.86,-526.42 1105.56,-521.96 1108.08,-522.18 1111,-518.42 1137.37,-484.47 1164.36,-444.47 1185.01,-412.55"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1187.17,-414.04 1189.02,-406.31 1182.75,-411.2 1187.17,-414.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1103.86,-526.42 1103.86,-549.22 1239,-549.22 1239,-526.42 1103.86,-526.42"/>
<text xml:space="preserve" text-anchor="start" x="1106.86" y="-532.22" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後 / 管理UI</text>
</g>
<!-- bws&#45;&gt;home -->
<g id="edge8" class="edge">
<title>bws&#45;&gt;home</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1387.04,-637.42C1356.85,-599.62 1309.56,-549.87 1255,-526.42 1221.48,-512 1123.47,-535.06 1091,-518.42 1046.5,-495.6 1012.21,-449.93 990.05,-412.66"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="992.51,-411.66 986.48,-406.49 987.97,-414.3 992.51,-411.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1293.22,-526.42 1293.22,-549.22 1363.02,-549.22 1363.02,-526.42 1293.22,-526.42"/>
<text xml:space="preserve" text-anchor="start" x="1296.22" y="-532.22" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;oke -->
<g id="edge5" class="edge">
<title>bws&#45;&gt;oke</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1542.5,-637.25C1579.21,-615.96 1615.3,-587.05 1636,-549.22 1660.86,-503.78 1631.44,-450.76 1599.12,-411.62"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1601.45,-410.3 1594.59,-406.28 1597.45,-413.7 1601.45,-410.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1643.64,-526.42 1643.64,-549.22 1713.44,-549.22 1713.44,-526.42 1643.64,-526.42"/>
<text xml:space="preserve" text-anchor="start" x="1646.64" y="-532.22" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;shared_prd -->
<g id="edge6" class="edge">
<title>bws&#45;&gt;shared_prd</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1555.02,-643.49C1613.1,-620.98 1679.92,-589.56 1733,-549.22 1782.98,-511.23 1827.07,-454.49 1856.06,-412.14"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1858.11,-413.79 1860.14,-406.11 1853.76,-410.85 1858.11,-413.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1759.03,-526.42 1759.03,-549.22 1903.52,-549.22 1903.52,-526.42 1759.03,-526.42"/>
<text xml:space="preserve" text-anchor="start" x="1762.03" y="-532.22" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO / PRD Secret注入</text>
</g>
<!-- bws&#45;&gt;control -->
<g id="edge7" class="edge">
<title>bws&#45;&gt;control</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1431.25,-637.38C1434.93,-602.98 1433.69,-557.68 1410,-526.42 1403.72,-518.12 1396.81,-523.96 1388,-518.42 1342.2,-489.6 1298.78,-446.44 1267.7,-411.71"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1269.81,-410.13 1262.87,-406.25 1265.87,-413.61 1269.81,-410.13"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1422.47,-526.42 1422.47,-549.22 1563.86,-549.22 1563.86,-526.42 1422.47,-526.42"/>
<text xml:space="preserve" text-anchor="start" x="1425.47" y="-532.22" font-family="Arial" font-size="14.00" fill="#fcd9d2">機器・PBS用credential</text>
</g>
<!-- nas&#45;&gt;home -->
<g id="edge15" class="edge">
<title>nas&#45;&gt;home</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M665.13,-354.01C728.8,-354.01 802.81,-354.01 860.88,-354.01"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="860.63,-356.64 868.13,-354.01 860.63,-351.39 860.63,-356.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="704.01,-357.01 704.01,-379.81 831.36,-379.81 831.36,-357.01 704.01,-357.01"/>
<text xml:space="preserve" text-anchor="start" x="707.01" y="-362.81" font-family="Arial" font-size="14.00" fill="#c9c9c9">NFSストレージを提供</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M548.01,-940.7C552.16,-918.01 558.42,-890.94 567.43,-867.62 584.03,-824.63 609.96,-779.73 631.73,-745.6"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="633.67,-747.44 635.52,-739.71 629.25,-744.59 633.67,-747.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="567.43,-867.62 567.43,-890.42 701,-890.42 701,-867.62 567.43,-867.62"/>
<text xml:space="preserve" text-anchor="start" x="570.43" y="-873.42" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M779.97,-940.7C757.08,-887.66 720.48,-802.88 696.1,-746.39"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="698.58,-745.5 693.2,-739.66 693.76,-747.58 698.58,-745.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="755.24,-867.62 755.24,-890.42 888.81,-890.42 888.81,-867.62 755.24,-867.62"/>
<text xml:space="preserve" text-anchor="start" x="758.24" y="-873.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
<!-- oke&#45;&gt;reventer -->
<g id="edge12" class="edge">
<title>oke&#45;&gt;reventer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1543.12,-304.04C1544.12,-260.48 1545.58,-196.67 1546.64,-150.25"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1549.27,-150.32 1546.81,-142.76 1544.02,-150.2 1549.27,-150.32"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1545.36,-201.21 1545.36,-224.01 1673.49,-224.01 1673.49,-201.21 1545.36,-201.21"/>
<text xml:space="preserve" text-anchor="start" x="1548.36" y="-207.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">STGの実行基盤を提供</text>
</g>
<!-- shared_prd&#45;&gt;reventer -->
<g id="edge13" class="edge">
<title>shared_prd&#45;&gt;reventer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1827.94,-304.1C1788.95,-274.34 1738.12,-235.56 1693,-201.21 1669.37,-183.22 1643.56,-163.59 1620.35,-145.95"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1622.23,-144.08 1614.67,-141.64 1619.05,-148.26 1622.23,-144.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1720.08,-201.21 1720.08,-224.01 1904.25,-224.01 1904.25,-201.21 1720.08,-201.21"/>
<text xml:space="preserve" text-anchor="start" x="1723.08" y="-207.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">共有Gateway Controllerを提供</text>
</g>
<!-- control&#45;&gt;reventer -->
<g id="edge14" class="edge">
<title>control&#45;&gt;reventer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1230.74,-304.11C1239.52,-271.32 1255.47,-229.18 1283.3,-201.21 1327.92,-156.36 1393.47,-128.88 1448.18,-112.58"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1448.88,-115.11 1455.35,-110.5 1447.42,-110.07 1448.88,-115.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1283.3,-201.21 1283.3,-224.01 1525,-224.01 1525,-201.21 1283.3,-201.21"/>
<text xml:space="preserve" text-anchor="start" x="1286.3" y="-207.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">GitOps・CI・Terraformの実行基盤を提供</text>
</g>
</g>
</svg>
`;case`home_apps`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2614pt" height="915pt"
 viewBox="0.00 0.00 2614.00 915.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 899.65)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1330.75,-195.61 1330.75,-876.61 1680.81,-876.61 1680.81,-195.61 1330.75,-195.61"/>
<text xml:space="preserve" text-anchor="start" x="1338.75" y="-863.71" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<!-- dns -->
<g id="node1" class="node">
<title>dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1598.59,-335.61 1412.97,-335.61 1412.97,-235.6 1598.59,-235.6 1598.59,-335.61"/>
<text xml:space="preserve" text-anchor="start" x="1422.98" y="-277.61" font-family="Arial" font-size="20.00" fill="#f8fafc">内部DNS / MetalLB</text>
</g>
<!-- nextcloud -->
<g id="node2" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1595.78,-815.61 1415.78,-815.61 1415.78,-715.6 1595.78,-715.6 1595.78,-815.61"/>
<text xml:space="preserve" text-anchor="start" x="1461.31" y="-757.61" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node3" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1595.78,-655.61 1415.78,-655.61 1415.78,-555.6 1595.78,-555.6 1595.78,-655.61"/>
<text xml:space="preserve" text-anchor="start" x="1464.11" y="-597.61" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信</text>
</g>
<!-- apps -->
<g id="node4" class="node">
<title>apps</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1640.81,-495.61 1370.75,-495.61 1370.75,-395.6 1640.81,-395.6 1640.81,-495.61"/>
<text xml:space="preserve" text-anchor="start" x="1380.76" y="-437.61" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ワークロード / 基盤の利用側</text>
</g>
<!-- user -->
<g id="node5" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-279.61 0,-279.61 0,-179.6 180,-179.6 180,-279.61"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-221.61" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- access -->
<g id="node6" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="708.13,-199.61 393.57,-199.61 393.57,-99.6 708.13,-99.6 708.13,-199.61"/>
<text xml:space="preserve" text-anchor="start" x="403.58" y="-141.61" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- operator -->
<g id="node7" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-119.61 0,-119.61 0,-19.6 180,-19.6 180,-119.61"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-61.61" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- tunnel -->
<g id="node8" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1089.27,-199.61 909.27,-199.61 909.27,-99.6 1089.27,-99.6 1089.27,-199.61"/>
<text xml:space="preserve" text-anchor="start" x="920.33" y="-141.61" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- argo -->
<g id="node9" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1595.78,-155.61 1415.78,-155.61 1415.78,-55.6 1595.78,-55.6 1595.78,-155.61"/>
<text xml:space="preserve" text-anchor="start" x="1453.55" y="-97.61" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- nas -->
<g id="node10" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2583.57,-678.52C2583.57,-683.53 2521.56,-687.61 2445.21,-687.61 2368.86,-687.61 2306.85,-683.53 2306.85,-678.52 2306.85,-678.52 2306.85,-596.69 2306.85,-596.69 2306.85,-591.68 2368.86,-587.6 2445.21,-587.6 2521.56,-587.6 2583.57,-591.68 2583.57,-596.69 2583.57,-596.69 2583.57,-678.52 2583.57,-678.52"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2583.57,-678.52C2583.57,-673.5 2521.56,-669.43 2445.21,-669.43 2368.86,-669.43 2306.85,-673.5 2306.85,-678.52"/>
<text xml:space="preserve" text-anchor="start" x="2316.86" y="-629.61" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- databases -->
<g id="node11" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2103.42,-687.61 1922.26,-687.61 1922.26,-587.6 2103.42,-587.6 2103.42,-687.61"/>
<text xml:space="preserve" text-anchor="start" x="1932.27" y="-629.61" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- nextcloud&#45;&gt;nas -->
<g id="edge10" class="edge">
<title>nextcloud&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1595.72,-765.35C1666.51,-764.53 1768.06,-761.99 1856.63,-754.61 1978.4,-744.45 2009.1,-740.9 2129.05,-717.61 2183.98,-706.94 2243.61,-692.54 2296.08,-678.9"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2296.61,-681.47 2303.2,-677.04 2295.28,-676.4 2296.61,-681.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1957.32,-751.13 1957.32,-773.93 2068.36,-773.93 2068.36,-751.13 1957.32,-751.13"/>
<text xml:space="preserve" text-anchor="start" x="1960.32" y="-756.93" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- nextcloud&#45;&gt;databases -->
<g id="edge9" class="edge">
<title>nextcloud&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1595.62,-743.09C1684.29,-720.62 1820.26,-686.16 1912.47,-662.79"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1913.09,-665.34 1919.71,-660.95 1911.8,-660.25 1913.09,-665.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1688.81,-716.83 1688.81,-739.63 1856.63,-739.63 1856.63,-716.83 1688.81,-716.83"/>
<text xml:space="preserve" text-anchor="start" x="1691.81" y="-722.63" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- recording&#45;&gt;nas -->
<g id="edge12" class="edge">
<title>recording&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1595.74,-580.38C1716.81,-549.49 1940.06,-504.76 2129.05,-534.81 2192.46,-544.88 2260.44,-565.7 2316.98,-585.98"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2315.88,-588.37 2323.83,-588.46 2317.67,-583.43 2315.88,-588.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1922.31,-534.81 1922.31,-557.61 2103.38,-557.61 2103.38,-534.81 1922.31,-534.81"/>
<text xml:space="preserve" text-anchor="start" x="1925.31" y="-540.61" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画・thumbnail・drop / NFS</text>
</g>
<!-- recording&#45;&gt;databases -->
<g id="edge11" class="edge">
<title>recording&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1595.63,-609.33C1666.37,-612.51 1767.9,-617.55 1856.63,-623.81 1874.53,-625.07 1893.58,-626.6 1911.98,-628.18"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1911.71,-630.79 1919.41,-628.83 1912.16,-625.56 1911.71,-630.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1759.22,-623.81 1759.22,-646.61 1786.22,-646.61 1786.22,-623.81 1759.22,-623.81"/>
<text xml:space="preserve" text-anchor="start" x="1762.22" y="-632.01" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- apps&#45;&gt;nas -->
<g id="edge14" class="edge">
<title>apps&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1640.63,-435.92C1797.74,-429.9 2062.72,-436.76 2266.85,-528.61 2299.4,-543.25 2333.23,-562.82 2362.5,-581.33"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2360.75,-583.32 2368.48,-585.14 2363.57,-578.9 2360.75,-583.32"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1896.63,-479.68 1896.63,-502.48 2129.05,-502.48 2129.05,-479.68 1896.63,-479.68"/>
<text xml:space="preserve" text-anchor="start" x="1899.63" y="-485.48" font-family="Arial" font-size="14.00" fill="#bbfcd3">images・Data Protection keys / PVC</text>
</g>
<!-- apps&#45;&gt;databases -->
<g id="edge13" class="edge">
<title>apps&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1640.78,-494.67C1706.04,-518.77 1785.57,-548.44 1856.63,-575.81 1874.84,-582.82 1894.19,-590.41 1912.84,-597.8"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1911.76,-600.19 1919.7,-600.52 1913.7,-595.31 1911.76,-600.19"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1731.59,-575.81 1731.59,-598.61 1813.85,-598.61 1813.85,-575.81 1731.59,-575.81"/>
<text xml:space="preserve" text-anchor="start" x="1734.59" y="-581.61" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.74,-214.13C237.6,-204.05 314.9,-190.57 383.88,-178.54"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="384.08,-181.17 391.02,-177.3 383.18,-176 384.08,-181.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-205.97 220,-228.77 353.57,-228.77 353.57,-205.97 220,-205.97"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-211.77" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge3" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M707.99,-149.61C771.54,-149.61 843.09,-149.61 899.25,-149.61"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="899.03,-152.23 906.53,-149.61 899.03,-146.98 899.03,-152.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="748.13,-149.61 748.13,-172.41 869.27,-172.41 869.27,-149.61 748.13,-149.61"/>
<text xml:space="preserve" text-anchor="start" x="751.13" y="-155.41" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M179.74,-85.08C237.6,-95.16 314.9,-108.64 383.88,-120.67"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="383.18,-123.21 391.02,-121.91 384.08,-118.04 383.18,-123.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="220,-114.39 220,-137.19 353.57,-137.19 353.57,-114.39 220,-114.39"/>
<text xml:space="preserve" text-anchor="start" x="223" y="-120.19" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
<!-- tunnel&#45;&gt;nextcloud -->
<g id="edge5" class="edge">
<title>tunnel&#45;&gt;nextcloud</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1003.84,-199.37C1012.27,-284 1039.97,-457.64 1129.27,-569.61 1199.61,-657.82 1320.52,-710.7 1406.11,-738.91"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1405.29,-741.4 1413.23,-741.21 1406.9,-736.4 1405.29,-741.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1129.27,-706.67 1129.27,-729.47 1322.75,-729.47 1322.75,-706.67 1129.27,-706.67"/>
<text xml:space="preserve" text-anchor="start" x="1132.27" y="-712.47" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- tunnel&#45;&gt;recording -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;recording</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1016.97,-199.2C1037.03,-253.11 1074.91,-339.46 1129.27,-398.61 1205.58,-481.65 1323.08,-538.9 1406.3,-571.8"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1405.26,-574.21 1413.2,-574.49 1407.17,-569.32 1405.26,-574.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1129.27,-532.09 1129.27,-554.89 1322.75,-554.89 1322.75,-532.09 1129.27,-532.09"/>
<text xml:space="preserve" text-anchor="start" x="1132.27" y="-537.89" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- tunnel&#45;&gt;apps -->
<g id="edge7" class="edge">
<title>tunnel&#45;&gt;apps</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1069.94,-199.5C1135.57,-245.43 1237.46,-314.05 1330.75,-365.61 1346.59,-374.36 1363.56,-383.01 1380.46,-391.2"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1379.21,-393.51 1387.11,-394.39 1381.48,-388.78 1379.21,-393.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1129.27,-360.46 1129.27,-383.26 1322.75,-383.26 1322.75,-360.46 1129.27,-360.46"/>
<text xml:space="preserve" text-anchor="start" x="1132.27" y="-366.26" font-family="Arial" font-size="14.00" fill="#bbfcd3">Access認証後 / 公開UI・サービス</text>
</g>
<!-- tunnel&#45;&gt;argo -->
<g id="edge4" class="edge">
<title>tunnel&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1089.01,-141.87C1177.63,-134.14 1313.55,-122.28 1405.66,-114.25"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1405.85,-116.87 1413.09,-113.6 1405.39,-111.64 1405.85,-116.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1158.44,-137.8 1158.44,-160.6 1293.58,-160.6 1293.58,-137.8 1158.44,-137.8"/>
<text xml:space="preserve" text-anchor="start" x="1161.44" y="-143.6" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後 / 管理UI</text>
</g>
<!-- tunnel&#45;&gt;nas -->
<g id="edge8" class="edge">
<title>tunnel&#45;&gt;nas</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1089.12,-105.49C1221.11,-46.12 1475.49,44.38 1680.81,-25.61 2002.87,-135.38 2288.31,-448.05 2397.27,-578.9"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2395.14,-580.44 2401.94,-584.54 2399.18,-577.09 2395.14,-580.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1690.76,-105.85 1690.76,-128.65 1854.68,-128.65 1854.68,-105.85 1690.76,-105.85"/>
<text xml:space="preserve" text-anchor="start" x="1693.76" y="-111.65" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後 / NAS管理UI</text>
</g>
<!-- databases&#45;&gt;nas -->
<g id="edge15" class="edge">
<title>databases&#45;&gt;nas</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M2103.28,-637.61C2158.91,-637.61 2231.83,-637.61 2295.94,-637.61"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2295.63,-640.23 2303.13,-637.61 2295.63,-634.98 2295.63,-640.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2169.05,-637.61 2169.05,-660.41 2266.85,-660.41 2266.85,-637.61 2169.05,-637.61"/>
<text xml:space="preserve" text-anchor="start" x="2172.05" y="-643.41" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
</g>
</svg>
`;case`access`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2320pt" height="1061pt"
 viewBox="0.00 0.00 2320.00 1061.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1045.91)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#1c417d" stroke="#1c356c" points="371.57,-19.86 371.57,-586.86 1745.86,-586.86 1745.86,-19.86 371.57,-19.86"/>
<text xml:space="preserve" text-anchor="start" x="379.57" y="-573.96" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_edge</title>
<polygon fill="#51321f" stroke="#3f2717" points="403.57,-51.86 403.57,-533.86 1713.86,-533.86 1713.86,-51.86 403.57,-51.86"/>
<text xml:space="preserve" text-anchor="start" x="411.57" y="-520.96" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">CLOUDFLARE</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_routes</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1371.54,-91.86 1371.54,-472.86 1673.86,-472.86 1673.86,-91.86 1371.54,-91.86"/>
<text xml:space="preserve" text-anchor="start" x="1379.54" y="-459.96" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">公開HOSTNAME / 設定から抽出</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1861.21,-19.86 1861.21,-633.86 2281.94,-633.86 2281.94,-19.86 1861.21,-19.86"/>
<text xml:space="preserve" text-anchor="start" x="1869.21" y="-620.96" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1901.21,-387.86 1901.21,-572.86 2241.94,-572.86 2241.94,-387.86 1901.21,-387.86"/>
<text xml:space="preserve" text-anchor="start" x="1909.21" y="-559.96" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="1918.2,-641.86 1918.2,-1022.86 2224.95,-1022.86 2224.95,-641.86 1918.2,-641.86"/>
<text xml:space="preserve" text-anchor="start" x="1926.2" y="-1009.96" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<!-- protected -->
<g id="node1" class="node">
<title>protected</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1633.86,-411.86 1411.54,-411.86 1411.54,-311.85 1633.86,-311.85 1633.86,-411.86"/>
<text xml:space="preserve" text-anchor="start" x="1421.55" y="-353.86" font-family="Arial" font-size="20.00" fill="#f8fafc">Access保護のhostname</text>
</g>
<!-- exceptions -->
<g id="node2" class="node">
<title>exceptions</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1617.17,-231.86 1428.23,-231.86 1428.23,-131.85 1617.17,-131.85 1617.17,-231.86"/>
<text xml:space="preserve" text-anchor="start" x="1438.24" y="-173.86" font-family="Arial" font-size="20.00" fill="#f8fafc">例外 / mTLS専用API</text>
</g>
<!-- access -->
<g id="node3" class="node">
<title>access</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="758.13,-451.86 443.57,-451.86 443.57,-351.85 758.13,-351.85 758.13,-451.86"/>
<text xml:space="preserve" text-anchor="start" x="453.58" y="-393.86" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Access / 共通の認証入口</text>
</g>
<!-- mtls -->
<g id="node4" class="node">
<title>mtls</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="703.66,-271.86 498.04,-271.86 498.04,-171.85 703.66,-171.85 703.66,-271.86"/>
<text xml:space="preserve" text-anchor="start" x="508.05" y="-213.86" font-family="Arial" font-size="20.00" fill="#f8fafc">mTLS / 専用APIの例外</text>
</g>
<!-- tunnel -->
<g id="node5" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1220.72,-411.86 1040.72,-411.86 1040.72,-311.85 1220.72,-311.85 1220.72,-411.86"/>
<text xml:space="preserve" text-anchor="start" x="1051.79" y="-353.86" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- nas -->
<g id="node6" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2209.94,-510.77C2209.94,-515.79 2147.92,-519.86 2071.58,-519.86 1995.23,-519.86 1933.21,-515.79 1933.21,-510.77 1933.21,-510.77 1933.21,-428.95 1933.21,-428.95 1933.21,-423.93 1995.23,-419.85 2071.58,-419.85 2147.92,-419.85 2209.94,-423.93 2209.94,-428.95 2209.94,-428.95 2209.94,-510.77 2209.94,-510.77"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2209.94,-510.77C2209.94,-505.75 2147.92,-501.68 2071.58,-501.68 1995.23,-501.68 1933.21,-505.75 1933.21,-510.77"/>
<text xml:space="preserve" text-anchor="start" x="1943.22" y="-461.86" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- home -->
<g id="node7" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2161.58,-159.86 1981.58,-159.86 1981.58,-59.85 2161.58,-59.85 2161.58,-159.86"/>
<text xml:space="preserve" text-anchor="start" x="1994.88" y="-101.86" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- hardware -->
<g id="node8" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2161.58,-339.86 1981.58,-339.86 1981.58,-239.85 2161.58,-239.85 2161.58,-339.86"/>
<text xml:space="preserve" text-anchor="start" x="1996.56" y="-281.86" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- argo -->
<g id="node9" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2161.58,-781.86 1981.58,-781.86 1981.58,-681.85 2161.58,-681.85 2161.58,-781.86"/>
<text xml:space="preserve" text-anchor="start" x="2019.34" y="-723.86" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- reviews -->
<g id="node10" class="node">
<title>reviews</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2184.95,-961.86 1958.2,-961.86 1958.2,-861.85 2184.95,-861.85 2184.95,-961.86"/>
<text xml:space="preserve" text-anchor="start" x="1968.21" y="-903.86" font-family="Arial" font-size="20.00" fill="#f8fafc">Re:Venterの一時レビュー</text>
</g>
<!-- user -->
<g id="node11" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-631.86 0,-631.86 0,-531.85 180,-531.85 180,-631.86"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-573.86" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- operator -->
<g id="node12" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-451.86 0,-451.86 0,-351.85 180,-351.85 180,-451.86"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-393.86" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- client -->
<g id="node13" class="node">
<title>client</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-271.86 0,-271.86 0,-171.85 180,-171.85 180,-271.86"/>
<text xml:space="preserve" text-anchor="start" x="23.32" y="-213.86" font-family="Arial" font-size="20.00" fill="#f8fafc">専用クライアント</text>
</g>
<!-- protected&#45;&gt;nas -->
<g id="edge12" class="edge">
<title>protected&#45;&gt;nas</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.71,-383.58C1716.61,-399.95 1831.17,-422.58 1922.18,-440.55"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1921.47,-443.09 1929.34,-441.96 1922.49,-437.94 1921.47,-443.09"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-425.53 1753.86,-448.33 1853.21,-448.33 1853.21,-425.53 1753.86,-425.53"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-431.33" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;home -->
<g id="edge10" class="edge">
<title>protected&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1633.86,-321.6C1670.13,-307.19 1710.27,-290 1745.86,-271.86 1799.7,-244.41 1807.67,-227.87 1861.21,-199.86 1896.61,-181.34 1936.66,-163.43 1972.18,-148.52"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1972.88,-151.08 1978.79,-145.77 1970.86,-146.23 1972.88,-151.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1777.2,-267.03 1777.2,-289.83 1829.88,-289.83 1829.88,-267.03 1777.2,-267.03"/>
<text xml:space="preserve" text-anchor="start" x="1780.2" y="-272.83" font-family="Arial" font-size="14.00" fill="#bbfcd3">内部接続</text>
</g>
<!-- protected&#45;&gt;hardware -->
<g id="edge11" class="edge">
<title>protected&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1633.71,-347.37C1732.57,-334.36 1876.45,-315.42 1971.72,-302.87"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1971.84,-305.5 1978.94,-301.92 1971.16,-300.3 1971.84,-305.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-331.24 1753.86,-354.04 1853.21,-354.04 1853.21,-331.24 1753.86,-331.24"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-337.04" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;argo -->
<g id="edge8" class="edge">
<title>protected&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1595.92,-411.72C1664.13,-458.71 1769.37,-530.94 1861.21,-592.86 1902.25,-620.52 1948.02,-650.95 1986.27,-676.28"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1984.59,-678.31 1992.29,-680.26 1987.49,-673.93 1984.59,-678.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-586.73 1753.86,-609.53 1853.21,-609.53 1853.21,-586.73 1753.86,-586.73"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-592.53" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- protected&#45;&gt;reviews -->
<g id="edge9" class="edge">
<title>protected&#45;&gt;reviews</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1548.53,-411.54C1596.94,-503.92 1712.37,-703.48 1861.21,-821.86 1887.1,-842.45 1918.41,-859.19 1948.83,-872.39"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1947.53,-874.69 1955.45,-875.2 1949.57,-869.86 1947.53,-874.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1753.86,-812.22 1753.86,-835.02 1853.21,-835.02 1853.21,-812.22 1753.86,-812.22"/>
<text xml:space="preserve" text-anchor="start" x="1756.86" y="-818.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">認証後の内部接続</text>
</g>
<!-- exceptions&#45;&gt;home -->
<g id="edge13" class="edge">
<title>exceptions&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1616.98,-159.07C1658.63,-149.68 1708.47,-139.5 1753.86,-133.06 1826.38,-122.76 1908.93,-116.9 1971.57,-113.65"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1971.46,-116.28 1978.81,-113.28 1971.19,-111.04 1971.46,-116.28"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1777.2,-133.06 1777.2,-155.86 1829.88,-155.86 1829.88,-133.06 1777.2,-133.06"/>
<text xml:space="preserve" text-anchor="start" x="1780.2" y="-138.86" font-family="Arial" font-size="14.00" fill="#bbfcd3">内部接続</text>
</g>
<!-- access&#45;&gt;tunnel -->
<g id="edge4" class="edge">
<title>access&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M758.09,-390.02C846.39,-383.33 954.11,-375.16 1030.79,-369.35"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1030.63,-372 1037.91,-368.81 1030.24,-366.76 1030.63,-372"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="838.86,-385.44 838.86,-408.24 959.99,-408.24 959.99,-385.44 838.86,-385.44"/>
<text xml:space="preserve" text-anchor="start" x="841.86" y="-391.24" font-family="Arial" font-size="14.00" fill="#cbd0fd">Access認証後の転送</text>
</g>
<!-- mtls&#45;&gt;tunnel -->
<g id="edge5" class="edge">
<title>mtls&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M703.63,-248.85C798.01,-273.88 937.55,-310.89 1030.96,-335.66"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1030.13,-338.16 1038.05,-337.54 1031.48,-333.08 1030.13,-338.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="808.13,-324.31 808.13,-347.11 990.72,-347.11 990.72,-324.31 808.13,-324.31"/>
<text xml:space="preserve" text-anchor="start" x="811.13" y="-330.11" font-family="Arial" font-size="14.00" fill="#cbd0fd">mTLS検証済みのAPIリクエスト</text>
</g>
<!-- tunnel&#45;&gt;protected -->
<g id="edge6" class="edge">
<title>tunnel&#45;&gt;protected</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1220.7,-361.86C1274.25,-361.86 1343.12,-361.86 1401.47,-361.86"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1401.33,-364.48 1408.83,-361.86 1401.33,-359.23 1401.33,-364.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-361.86 1270.72,-384.66 1361.54,-384.66 1361.54,-361.86 1270.72,-361.86"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-367.66" font-family="Arial" font-size="14.00" fill="#c9c9c9">hostname転送</text>
</g>
<!-- tunnel&#45;&gt;exceptions -->
<g id="edge7" class="edge">
<title>tunnel&#45;&gt;exceptions</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1220.7,-320.79C1279.72,-293.55 1357.35,-257.72 1418.99,-229.27"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1419.89,-231.74 1425.6,-226.21 1417.69,-226.97 1419.89,-231.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1270.72,-293.27 1270.72,-316.07 1361.54,-316.07 1361.54,-293.27 1270.72,-293.27"/>
<text xml:space="preserve" text-anchor="start" x="1273.72" y="-299.07" font-family="Arial" font-size="14.00" fill="#bbfcd3">hostname転送</text>
</g>
<!-- home&#45;&gt;tunnel -->
<g id="edge14" class="edge">
<title>home&#45;&gt;tunnel</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1981.81,-73.99C1843.51,-24.07 1571.73,49.72 1371.54,-49.06 1264.58,-101.83 1192.1,-227.74 1156.73,-302.74"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1154.45,-301.42 1153.67,-309.32 1159.21,-303.63 1154.45,-301.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1469.13,-49.06 1469.13,-71.86 1576.28,-71.86 1576.28,-49.06 1469.13,-49.06"/>
<text xml:space="preserve" text-anchor="start" x="1472.13" y="-54.86" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きTunnel接続</text>
</g>
<!-- user&#45;&gt;access -->
<g id="edge1" class="edge">
<title>user&#45;&gt;access</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-550.4C254.07,-524.17 361.33,-486.23 448.89,-455.26"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="449.6,-457.79 455.79,-452.82 447.85,-452.84 449.6,-457.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-531.14 230,-553.94 363.57,-553.94 363.57,-531.14 230,-531.14"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-536.94" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- operator&#45;&gt;access -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;access</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-401.86C249.73,-401.86 348.9,-401.86 433.34,-401.86"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="433.3,-404.48 440.8,-401.86 433.3,-399.23 433.3,-404.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="230,-401.86 230,-424.66 363.57,-424.66 363.57,-401.86 230,-401.86"/>
<text xml:space="preserve" text-anchor="start" x="233" y="-407.66" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
<!-- client&#45;&gt;mtls -->
<g id="edge3" class="edge">
<title>client&#45;&gt;mtls</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-221.86C265.6,-221.86 395.5,-221.86 488.12,-221.86"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="487.84,-224.48 495.34,-221.86 487.84,-219.23 487.84,-224.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="241.28,-221.86 241.28,-244.66 352.3,-244.66 352.3,-221.86 241.28,-221.86"/>
<text xml:space="preserve" text-anchor="start" x="244.28" y="-227.66" font-family="Arial" font-size="14.00" fill="#bbfcd3">クライアント証明書</text>
</g>
</g>
</svg>
`;case`delivery`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="3249pt" height="922pt"
 viewBox="0.00 0.00 3249.00 922.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 907.08)">
<g id="clust1" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="26.15,-248.01 26.15,-449.22 1620.15,-449.22 1620.15,-248.01 26.15,-248.01"/>
<text xml:space="preserve" text-anchor="start" x="34.15" y="-436.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1628.15,-248.01 1628.15,-884.03 2282.15,-884.03 2282.15,-248.01 1628.15,-248.01"/>
<text xml:space="preserve" text-anchor="start" x="1636.15" y="-871.13" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="2290.15,-256.01 2290.15,-441.22 2590.15,-441.22 2590.15,-256.01 2290.15,-256.01"/>
<text xml:space="preserve" text-anchor="start" x="2298.15" y="-428.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_oke</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2598.15,-248.01 2598.15,-449.22 3211.15,-449.22 3211.15,-248.01 2598.15,-248.01"/>
<text xml:space="preserve" text-anchor="start" x="2606.15" y="-436.32" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="459.15,-16 459.15,-201.21 703.15,-201.21 703.15,-16 459.15,-16"/>
<text xml:space="preserve" text-anchor="start" x="467.15" y="-188.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_premises</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="887.15,-8 887.15,-209.21 1387.15,-209.21 1387.15,-8 887.15,-8"/>
<text xml:space="preserve" text-anchor="start" x="895.15" y="-196.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<!-- images -->
<g id="node1" class="node">
<title>images</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="246.15,-388.02 66.15,-388.02 66.15,-288.01 246.15,-288.01 246.15,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="90" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Image Updater</text>
</g>
<!-- argo -->
<g id="node2" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="726.15,-388.02 546.15,-388.02 546.15,-288.01 726.15,-288.01 726.15,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="583.91" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- runner -->
<g id="node3" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="486.15,-388.02 306.15,-388.02 306.15,-288.01 486.15,-288.01 486.15,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="321.12" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 専用runner</text>
</g>
<!-- tfc_agents -->
<g id="node4" class="node">
<title>tfc_agents</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1067.76,-388.02 786.53,-388.02 786.53,-288.01 1067.76,-288.01 1067.76,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="796.54" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud agents / 自宅</text>
</g>
<!-- ansible -->
<g id="node5" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1308.15,-388.02 1128.15,-388.02 1128.15,-288.01 1308.15,-288.01 1308.15,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="1185.35" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- packer -->
<g id="node6" class="node">
<title>packer</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1579.74,-388.02 1368.55,-388.02 1368.55,-288.01 1579.74,-288.01 1579.74,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="1378.55" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">Packer / VM template</text>
</g>
<!-- github -->
<g id="node7" class="node">
<title>github</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1899.74,-822.83 1668.55,-822.83 1668.55,-722.82 1899.74,-722.82 1899.74,-822.83"/>
<text xml:space="preserve" text-anchor="start" x="1678.55" y="-764.83" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- terraform_cloud -->
<g id="node8" class="node">
<title>terraform_cloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1848.15,-620.02 1668.15,-620.02 1668.15,-520.02 1848.15,-520.02 1848.15,-620.02"/>
<text xml:space="preserve" text-anchor="start" x="1685.35" y="-562.02" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- github_pages -->
<g id="node9" class="node">
<title>github_pages</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2241.87,-620.02 1908.42,-620.02 1908.42,-520.02 2241.87,-520.02 2241.87,-620.02"/>
<text xml:space="preserve" text-anchor="start" x="1918.43" y="-562.02" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub Pages / my&#45;infra図・レビュー</text>
</g>
<!-- edge -->
<g id="node10" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1848.15,-388.02 1668.15,-388.02 1668.15,-288.01 1848.15,-288.01 1848.15,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="1712.56" y="-330.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- vms -->
<g id="node11" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2557.94,-378.92C2557.94,-383.94 2505.14,-388.02 2440.15,-388.02 2375.15,-388.02 2322.35,-383.94 2322.35,-378.92 2322.35,-378.92 2322.35,-297.1 2322.35,-297.1 2322.35,-292.08 2375.15,-288.01 2440.15,-288.01 2505.14,-288.01 2557.94,-292.08 2557.94,-297.1 2557.94,-297.1 2557.94,-378.92 2557.94,-378.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2557.94,-378.92C2557.94,-373.91 2505.14,-369.83 2440.15,-369.83 2375.15,-369.83 2322.35,-373.91 2322.35,-378.92"/>
<text xml:space="preserve" text-anchor="start" x="2332.36" y="-330.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- argo_1 -->
<g id="node12" class="node">
<title>argo_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2818.15,-388.02 2638.15,-388.02 2638.15,-288.01 2818.15,-288.01 2818.15,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="2668.68" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">OKE ArgoCD</text>
</g>
<!-- api -->
<g id="node13" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3171.09,-388.02 2953.2,-388.02 2953.2,-288.01 3171.09,-288.01 3171.09,-388.02"/>
<text xml:space="preserve" text-anchor="start" x="2963.21" y="-330.01" font-family="Arial" font-size="20.00" fill="#f8fafc">OKE API / Node pools</text>
</g>
<!-- reventer -->
<g id="node14" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="671.15,-148.01 491.15,-148.01 491.15,-48 671.15,-48 671.15,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="536.12" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- home -->
<g id="node15" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1107.15,-148.01 927.15,-148.01 927.15,-48 1107.15,-48 1107.15,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="940.45" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- hardware -->
<g id="node16" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1347.15,-148.01 1167.15,-148.01 1167.15,-48 1347.15,-48 1347.15,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1182.13" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- shared_prd -->
<g id="node17" class="node">
<title>shared_prd</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="312.29,-148.01 0,-148.01 0,-48 312.29,-48 312.29,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-90" font-family="Arial" font-size="20.00" fill="#fafafa">PRDクラスタへ提供する共通アドオン</text>
</g>
<!-- images&#45;&gt;shared_prd -->
<!-- argo&#45;&gt;reventer -->
<g id="edge11" class="edge">
<title>argo&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M595.05,-288.09C585.16,-273.52 575.95,-256.9 570.79,-240.01 562.82,-213.91 563.73,-183.88 567.3,-158.26"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="569.88,-158.75 568.45,-150.94 564.7,-157.94 569.88,-158.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="570.79,-217.21 570.79,-240.01 705.15,-240.01 705.15,-217.21 570.79,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="573.79" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">STG・PRDアプリ同期</text>
</g>
<!-- argo&#45;&gt;home -->
<g id="edge12" class="edge">
<title>argo&#45;&gt;home</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M682.15,-288.02C705.72,-264.68 735.76,-237.5 765.9,-217.21 813.04,-185.46 870.04,-157.89 917.83,-137.38"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="918.6,-139.9 924.47,-134.55 916.54,-135.07 918.6,-139.9"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="765.9,-217.21 765.9,-240.01 848.15,-240.01 848.15,-217.21 765.9,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="768.9" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期</text>
</g>
<!-- runner&#45;&gt;reventer -->
<g id="edge13" class="edge">
<title>runner&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M401.19,-288.24C405.36,-265.22 412.98,-238.26 426.89,-217.21 442.95,-192.91 465.72,-171.56 488.85,-153.93"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="490.14,-156.24 494.6,-149.66 487.01,-152.02 490.14,-156.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="426.89,-217.21 426.89,-240.01 551.15,-240.01 551.15,-217.21 426.89,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="429.89" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">利用側のCI jobを実行</text>
</g>
<!-- tfc_agents&#45;&gt;reventer -->
<g id="edge14" class="edge">
<title>tfc_agents&#45;&gt;reventer</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M910.13,-288.23C899.7,-264.23 884.24,-236.42 863.15,-217.21 811.94,-170.59 739.69,-140.79 681.14,-122.77"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="681.97,-120.27 674.03,-120.63 680.45,-125.3 681.97,-120.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="882.66,-217.21 882.66,-240.01 1060.59,-240.01 1060.59,-217.21 882.66,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="885.66" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">利用側workspaceの実行を受託</text>
</g>
<!-- tfc_agents&#45;&gt;hardware -->
<g id="edge15" class="edge">
<title>tfc_agents&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1027.88,-288.23C1054.16,-273.96 1081.9,-257.46 1106.15,-240.01 1141.02,-214.91 1176.32,-182.42 1204.01,-154.96"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1205.66,-157.02 1209.11,-149.87 1201.95,-153.31 1205.66,-157.02"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1132.92,-217.21 1132.92,-240.01 1241.61,-240.01 1241.61,-217.21 1132.92,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="1135.92" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM / ネットワーク</text>
</g>
<!-- ansible&#45;&gt;hardware -->
<g id="edge16" class="edge">
<title>ansible&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1256.99,-288.08C1266.44,-273.44 1275.24,-256.79 1280.15,-240.01 1287.89,-213.53 1284.56,-183.44 1278.32,-157.87"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1280.92,-157.46 1276.47,-150.88 1275.85,-158.8 1280.92,-157.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1284.2,-217.21 1284.2,-240.01 1336.87,-240.01 1336.87,-217.21 1284.2,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="1287.2" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">機器設定</text>
</g>
<!-- packer&#45;&gt;hardware -->
<g id="edge17" class="edge">
<title>packer&#45;&gt;hardware</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1429.71,-288.27C1394.53,-249.69 1345.35,-195.75 1308.49,-155.32"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1310.56,-153.69 1303.56,-149.91 1306.68,-157.23 1310.56,-153.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1385.08,-217.21 1385.08,-240.01 1469.67,-240.01 1469.67,-217.21 1385.08,-217.21"/>
<text xml:space="preserve" text-anchor="start" x="1388.08" y="-223.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">VM template</text>
</g>
<!-- github&#45;&gt;argo -->
<g id="edge4" class="edge">
<title>github&#45;&gt;argo</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1668.76,-752.7C1471.26,-716.35 1060.31,-624.78 756.15,-449.22 731.27,-434.86 707.25,-414.56 687.32,-395.28"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="689.23,-393.48 682.05,-390.08 685.55,-397.22 689.23,-393.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1145.72,-558.62 1145.72,-581.42 1195.28,-581.42 1195.28,-558.62 1145.72,-558.62"/>
<text xml:space="preserve" text-anchor="start" x="1148.72" y="-564.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- github&#45;&gt;runner -->
<g id="edge5" class="edge">
<title>github&#45;&gt;runner</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1668.75,-767.58C1483,-757.73 1108.37,-725.38 810.66,-620.02 668.01,-569.54 638.04,-538.88 516.15,-449.22 494.12,-433.01 471.62,-413.33 452.14,-395.11"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="454.01,-393.27 446.75,-390.02 450.4,-397.08 454.01,-393.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="810.66,-558.62 810.66,-581.42 885.15,-581.42 885.15,-558.62 810.66,-558.62"/>
<text xml:space="preserve" text-anchor="start" x="813.66" y="-564.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">Actions job</text>
</g>
<!-- github&#45;&gt;terraform_cloud -->
<g id="edge2" class="edge">
<title>github&#45;&gt;terraform_cloud</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1777.82,-722.96C1774.19,-694.92 1769.61,-659.53 1765.78,-629.95"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1768.41,-629.86 1764.84,-622.76 1763.2,-630.53 1768.41,-629.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1771.93,-660.02 1771.93,-682.82 1862.71,-682.82 1862.71,-660.02 1771.93,-660.02"/>
<text xml:space="preserve" text-anchor="start" x="1774.93" y="-665.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">Terraform実行</text>
</g>
<!-- github&#45;&gt;github_pages -->
<g id="edge3" class="edge">
<title>github&#45;&gt;github_pages</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1854.96,-722.96C1897.47,-693.63 1951.64,-656.25 1995.61,-625.9"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1997.09,-628.07 2001.77,-621.65 1994.11,-623.75 1997.09,-628.07"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1938.37,-660.02 1938.37,-682.82 2068.84,-682.82 2068.84,-660.02 1938.37,-660.02"/>
<text xml:space="preserve" text-anchor="start" x="1941.37" y="-665.82" font-family="Arial" font-size="14.00" fill="#cbd0fd">構成図・PR比較を公開</text>
</g>
<!-- github&#45;&gt;argo_1 -->
<g id="edge6" class="edge">
<title>github&#45;&gt;argo_1</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1899.59,-744.34C2066.12,-700.9 2378.62,-604.95 2605.15,-449.22 2628.3,-433.3 2651.74,-413.42 2671.87,-394.95"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2673.48,-397.04 2677.19,-390.01 2669.91,-393.19 2673.48,-397.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2480.08,-558.62 2480.08,-581.42 2529.64,-581.42 2529.64,-558.62 2480.08,-558.62"/>
<text xml:space="preserve" text-anchor="start" x="2483.08" y="-564.42" font-family="Arial" font-size="14.00" fill="#cbd0fd">GitOps</text>
</g>
<!-- terraform_cloud&#45;&gt;tfc_agents -->
<g id="edge8" class="edge">
<title>terraform_cloud&#45;&gt;tfc_agents</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1668.38,-563.86C1538.49,-553.96 1292.44,-525.93 1098.15,-449.22 1063.16,-435.4 1027.7,-414.01 998.2,-393.74"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="999.78,-391.64 992.13,-389.51 996.78,-395.95 999.78,-391.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1184.01,-457.22 1184.01,-480.02 1386.1,-480.02 1386.1,-457.22 1184.01,-457.22"/>
<text xml:space="preserve" text-anchor="start" x="1187.01" y="-463.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">workspace runを自宅agentで実行</text>
</g>
<!-- terraform_cloud&#45;&gt;edge -->
<g id="edge7" class="edge">
<title>terraform_cloud&#45;&gt;edge</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1758.15,-520.24C1758.15,-484.56 1758.15,-435.98 1758.15,-398.1"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1760.77,-398.25 1758.15,-390.75 1755.52,-398.25 1760.77,-398.25"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1758.15,-457.22 1758.15,-480.02 1904.97,-480.02 1904.97,-457.22 1758.15,-457.22"/>
<text xml:space="preserve" text-anchor="start" x="1761.15" y="-463.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">DNS / Access / Tunnel</text>
</g>
<!-- terraform_cloud&#45;&gt;vms -->
<g id="edge9" class="edge">
<title>terraform_cloud&#45;&gt;vms</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1847.82,-529.92C1857.94,-526.25 1868.19,-522.85 1878.15,-520.02 2059.78,-468.27 2124.09,-524.84 2297.15,-449.22 2327.08,-436.14 2356.34,-415.44 2380.51,-395.5"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2382.14,-397.56 2386.19,-390.72 2378.76,-393.54 2382.14,-397.56"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2276.89,-457.22 2276.89,-480.02 2327.22,-480.02 2327.22,-457.22 2276.89,-457.22"/>
<text xml:space="preserve" text-anchor="start" x="2279.89" y="-463.02" font-family="Arial" font-size="14.00" fill="#cbd0fd">監視VM</text>
</g>
<!-- terraform_cloud&#45;&gt;argo_1 -->
<g id="edge10" class="edge">
<title>terraform_cloud&#45;&gt;argo_1</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1847.93,-528.98C1857.99,-525.51 1868.19,-522.42 1878.15,-520.02 2079.35,-471.45 2136.53,-503.79 2342.15,-480.02 2412.19,-471.92 2429.06,-464.94 2499.15,-457.22 2519.69,-454.95 2568.8,-457.62 2595.32,-452.11"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2595.79,-454.71 2602.24,-450.07 2594.31,-449.67 2595.79,-454.71"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2154.24,-488.96 2154.24,-511.76 2226.36,-511.76 2226.36,-488.96 2154.24,-488.96"/>
<text xml:space="preserve" text-anchor="start" x="2157.24" y="-494.76" font-family="Arial" font-size="14.00" fill="#cbd0fd">OCI / OKE</text>
</g>
<!-- argo_1&#45;&gt;api -->
<g id="edge18" class="edge">
<title>argo_1&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2818.09,-338.01C2856.48,-338.01 2901.82,-338.01 2942.94,-338.01"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2942.77,-340.64 2950.27,-338.01 2942.77,-335.39 2942.77,-340.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2847.66,-341.01 2847.66,-363.81 2923.68,-363.81 2923.68,-341.01 2847.66,-341.01"/>
<text xml:space="preserve" text-anchor="start" x="2850.66" y="-346.81" font-family="Arial" font-size="14.00" fill="#cbd0fd">共通基盤同期</text>
</g>
</g>
</svg>
`;case`secrets`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1330pt" height="1355pt"
 viewBox="0.00 0.00 1330.00 1355.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1340.05)">
<g id="clust1" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="8,-956 8,-1317 864.32,-1317 864.32,-956 8,-956"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1304.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_premises</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="543.11,-587 543.11,-948 874.34,-948 874.34,-587 543.11,-587"/>
<text xml:space="preserve" text-anchor="start" x="551.11" y="-935.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_oke</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="551.11,-394 551.11,-579 866.34,-579 866.34,-394 551.11,-394"/>
<text xml:space="preserve" text-anchor="start" x="559.11" y="-566.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_shared_prd</title>
<polygon fill="#454545" stroke="#313131" points="551.11,-201 551.11,-386 866.34,-386 866.34,-201 551.11,-201"/>
<text xml:space="preserve" text-anchor="start" x="559.11" y="-373.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">PRDクラスタへ提供する共通アドオン</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_control</title>
<polygon fill="#5a3620" stroke="#462a17" points="586.73,-8 586.73,-193 830.73,-193 830.73,-8 586.73,-8"/>
<text xml:space="preserve" text-anchor="start" x="594.73" y="-180.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">変更・運用</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1048.04,-310 1048.04,-495 1292.04,-495 1292.04,-310 1048.04,-310"/>
<text xml:space="preserve" text-anchor="start" x="1056.04" y="-482.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<!-- bws -->
<g id="node1" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="314.8,-1106 48,-1106 48,-1006 314.8,-1006 314.8,-1106"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-1048" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- github -->
<g id="node2" class="node">
<title>github</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="824.32,-1096 593.13,-1096 593.13,-996 824.32,-996 824.32,-1096"/>
<text xml:space="preserve" text-anchor="start" x="603.14" y="-1038" font-family="Arial" font-size="20.00" fill="#f8fafc">GitHub / コード・Actions</text>
</g>
<!-- terraform_cloud -->
<g id="node3" class="node">
<title>terraform_cloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="798.73,-1256 618.73,-1256 618.73,-1156 798.73,-1156 798.73,-1256"/>
<text xml:space="preserve" text-anchor="start" x="635.93" y="-1198" font-family="Arial" font-size="20.00" fill="#f8fafc">Terraform Cloud</text>
</g>
<!-- eso -->
<g id="node4" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="834.34,-887 583.11,-887 583.11,-787 834.34,-787 834.34,-887"/>
<text xml:space="preserve" text-anchor="start" x="593.12" y="-829" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- backups -->
<g id="node5" class="node">
<title>backups</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="798.73,-727 618.73,-727 618.73,-627 798.73,-627 798.73,-727"/>
<text xml:space="preserve" text-anchor="start" x="642.05" y="-669" font-family="Arial" font-size="20.00" fill="#f8fafc">バックアップ処理</text>
</g>
<!-- eso_1 -->
<g id="node6" class="node">
<title>eso_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="834.34,-526 583.11,-526 583.11,-426 834.34,-426 834.34,-526"/>
<text xml:space="preserve" text-anchor="start" x="593.12" y="-468" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- eso_2 -->
<g id="node7" class="node">
<title>eso_2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="834.34,-333 583.11,-333 583.11,-233 834.34,-233 834.34,-333"/>
<text xml:space="preserve" text-anchor="start" x="593.12" y="-275" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- ansible -->
<g id="node8" class="node">
<title>ansible</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="798.73,-140 618.73,-140 618.73,-40 798.73,-40 798.73,-140"/>
<text xml:space="preserve" text-anchor="start" x="675.93" y="-82" font-family="Arial" font-size="20.00" fill="#f8fafc">Ansible</text>
</g>
<!-- reventer -->
<g id="node9" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1260.04,-442 1080.04,-442 1080.04,-342 1260.04,-342 1260.04,-442"/>
<text xml:space="preserve" text-anchor="start" x="1125.02" y="-384" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- bws&#45;&gt;github -->
<g id="edge1" class="edge">
<title>bws&#45;&gt;github</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M314.62,-1053.48C396.97,-1051.92 502.23,-1049.91 583.1,-1048.37"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="582.87,-1051 590.31,-1048.24 582.77,-1045.75 582.87,-1051"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="402.66,-1052.48 402.66,-1075.28 487.25,-1075.28 487.25,-1052.48 402.66,-1052.48"/>
<text xml:space="preserve" text-anchor="start" x="405.66" y="-1058.28" font-family="Arial" font-size="14.00" fill="#fcd9d2">CI credential</text>
</g>
<!-- bws&#45;&gt;terraform_cloud -->
<g id="edge2" class="edge">
<title>bws&#45;&gt;terraform_cloud</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M314.62,-1093.75C406.04,-1119.86 525.71,-1154.03 608.89,-1177.78"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="608.01,-1180.26 615.94,-1179.79 609.45,-1175.21 608.01,-1180.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="399.56,-1153.2 399.56,-1176 490.35,-1176 490.35,-1153.2 399.56,-1153.2"/>
<text xml:space="preserve" text-anchor="start" x="402.56" y="-1159" font-family="Arial" font-size="14.00" fill="#fcd9d2">Terraform変数</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge3" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M302.26,-1006.03C384.64,-971.69 493.93,-926.13 578.29,-890.96"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="579.22,-893.42 585.13,-888.11 577.2,-888.57 579.22,-893.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.06,-978.91 410.06,-1001.71 479.86,-1001.71 479.86,-978.91 410.06,-978.91"/>
<text xml:space="preserve" text-anchor="start" x="413.06" y="-984.71" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;backups -->
<g id="edge4" class="edge">
<title>bws&#45;&gt;backups</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M224.15,-1006.29C257.39,-968.3 306.26,-915.89 354.8,-876.2 431.49,-813.5 456.59,-805.21 543.11,-757 564.24,-745.23 587.36,-733.38 609.42,-722.55"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="610.49,-724.95 616.08,-719.3 608.19,-720.23 610.49,-724.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="354.8,-876.2 354.8,-899 535.11,-899 535.11,-876.2 354.8,-876.2"/>
<text xml:space="preserve" text-anchor="start" x="357.8" y="-882" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO経由 / backup credential</text>
</g>
<!-- bws&#45;&gt;eso_1 -->
<g id="edge5" class="edge">
<title>bws&#45;&gt;eso_1</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M200.94,-1006.03C227.83,-937.81 282.46,-813.91 354.8,-725.2 422.24,-642.5 523.72,-574.76 600.58,-530.89"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="601.48,-533.39 606.72,-527.41 598.9,-528.82 601.48,-533.39"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.06,-725.2 410.06,-748 479.86,-748 479.86,-725.2 410.06,-725.2"/>
<text xml:space="preserve" text-anchor="start" x="413.06" y="-731" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- bws&#45;&gt;eso_2 -->
<g id="edge6" class="edge">
<title>bws&#45;&gt;eso_2</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M189.51,-1006.01C205.34,-908.2 250.63,-687.8 354.8,-535.2 414.29,-448.06 514.37,-380.77 592.79,-337.69"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="593.76,-340.15 599.1,-334.26 591.26,-335.54 593.76,-340.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="372.72,-535.2 372.72,-558 517.2,-558 517.2,-535.2 372.72,-535.2"/>
<text xml:space="preserve" text-anchor="start" x="375.72" y="-541" font-family="Arial" font-size="14.00" fill="#fcd9d2">ESO / PRD Secret注入</text>
</g>
<!-- bws&#45;&gt;ansible -->
<g id="edge7" class="edge">
<title>bws&#45;&gt;ansible</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M183.71,-1006.28C189.08,-883.67 216.35,-560.79 354.8,-340.2 415.36,-243.73 528.02,-173.75 609.8,-132.73"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="610.85,-135.14 616.41,-129.46 608.52,-130.44 610.85,-135.14"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="374.26,-340.2 374.26,-363 515.65,-363 515.65,-340.2 374.26,-340.2"/>
<text xml:space="preserve" text-anchor="start" x="377.26" y="-346" font-family="Arial" font-size="14.00" fill="#fcd9d2">機器・PBS用credential</text>
</g>
<!-- eso_1&#45;&gt;reventer -->
<g id="edge8" class="edge">
<title>eso_1&#45;&gt;reventer</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M834.33,-453.21C908.39,-439.67 1001.04,-422.72 1070.07,-410.1"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1070.2,-412.75 1077.1,-408.81 1069.25,-407.58 1070.2,-412.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="882.73,-443.99 882.73,-466.79 1039.65,-466.79 1039.65,-443.99 882.73,-443.99"/>
<text xml:space="preserve" text-anchor="start" x="885.73" y="-449.79" font-family="Arial" font-size="14.00" fill="#fcd9d2">利用側Secretへ注入 / STG</text>
</g>
<!-- eso_2&#45;&gt;reventer -->
<g id="edge9" class="edge">
<title>eso_2&#45;&gt;reventer</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M834.33,-312.57C908.39,-330.15 1001.04,-352.13 1070.07,-368.51"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1069.23,-371.01 1077.14,-370.19 1070.44,-365.9 1069.23,-371.01"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="882.34,-361.29 882.34,-384.09 1040.04,-384.09 1040.04,-361.29 882.34,-361.29"/>
<text xml:space="preserve" text-anchor="start" x="885.34" y="-367.09" font-family="Arial" font-size="14.00" fill="#fcd9d2">利用側Secretへ注入 / PRD</text>
</g>
</g>
</svg>
`;case`observability`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2075pt" height="928pt"
 viewBox="0.00 0.00 2075.00 928.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 913.05)">
<g id="clust1" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="271.83,-705 271.83,-890 515.83,-890 515.83,-705 271.83,-705"/>
<text xml:space="preserve" text-anchor="start" x="279.83" y="-877.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="257.34,-455 257.34,-640 530.33,-640 530.33,-455 257.34,-455"/>
<text xml:space="preserve" text-anchor="start" x="265.34" y="-627.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1c417d" stroke="#1c356c" points="735.16,-8 735.16,-697 2036.75,-697 2036.75,-8 735.16,-8"/>
<text xml:space="preserve" text-anchor="start" x="743.16" y="-684.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="775.16,-48 775.16,-504 1996.75,-504 1996.75,-48 775.16,-48"/>
<text xml:space="preserve" text-anchor="start" x="783.16" y="-491.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_agent</title>
<polygon fill="#3e4651" stroke="#2d333d" points="807.16,-80 807.16,-451 1964.75,-451 1964.75,-80 807.16,-80"/>
<text xml:space="preserve" text-anchor="start" x="815.16" y="-438.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">自宅監視基盤</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_monitoring</title>
<polygon fill="#2c4e32" stroke="#1e3524" points="787.37,-705 787.37,-890 1086.96,-890 1086.96,-705 787.37,-705"/>
<text xml:space="preserve" text-anchor="start" x="795.37" y="-877.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">監視</text>
</g>
<!-- reventer -->
<g id="node1" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="483.83,-837 303.83,-837 303.83,-737 483.83,-737 483.83,-837"/>
<text xml:space="preserve" text-anchor="start" x="348.81" y="-779" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- grafana -->
<g id="node2" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="498.33,-587 289.34,-587 289.34,-487 498.33,-487 498.33,-587"/>
<text xml:space="preserve" text-anchor="start" x="299.35" y="-529" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- exporters -->
<g id="node3" class="node">
<title>exporters</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1027.16,-230 847.16,-230 847.16,-130 1027.16,-130 1027.16,-230"/>
<text xml:space="preserve" text-anchor="start" x="892.14" y="-172" font-family="Arial" font-size="20.00" fill="#f8fafc">exporter群</text>
</g>
<!-- pdc -->
<g id="node4" class="node">
<title>pdc</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1027.16,-390 847.16,-390 847.16,-290 1027.16,-290 1027.16,-390"/>
<text xml:space="preserve" text-anchor="start" x="863.24" y="-332" font-family="Arial" font-size="20.00" fill="#f8fafc">PDC agent / 自宅</text>
</g>
<!-- collector -->
<g id="node5" class="node">
<title>collector</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1514.66,-220 1215.65,-220 1215.65,-120 1514.66,-120 1514.66,-220"/>
<text xml:space="preserve" text-anchor="start" x="1225.66" y="-162" font-family="Arial" font-size="20.00" fill="#f8fafc">vmagent / scrape・remoteWrite</text>
</g>
<!-- local_store -->
<g id="node6" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1924.75,-380.91C1924.75,-385.93 1879.67,-390 1824.17,-390 1768.67,-390 1723.59,-385.93 1723.59,-380.91 1723.59,-380.91 1723.59,-299.09 1723.59,-299.09 1723.59,-294.07 1768.67,-290 1824.17,-290 1879.67,-290 1924.75,-294.07 1924.75,-299.09 1924.75,-299.09 1924.75,-380.91 1924.75,-380.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1924.75,-380.91C1924.75,-375.9 1879.67,-371.82 1824.17,-371.82 1768.67,-371.82 1723.59,-375.9 1723.59,-380.91"/>
<text xml:space="preserve" text-anchor="start" x="1733.6" y="-332" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- hardware -->
<g id="node7" class="node">
<title>hardware</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1027.16,-636 847.16,-636 847.16,-536 1027.16,-536 1027.16,-636"/>
<text xml:space="preserve" text-anchor="start" x="862.15" y="-578" font-family="Arial" font-size="20.00" fill="#eff6ff">物理・ネットワーク</text>
</g>
<!-- vms -->
<g id="node8" class="node">
<title>vms</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1054.96,-827.91C1054.96,-832.93 1002.16,-837 937.16,-837 872.16,-837 819.37,-832.93 819.37,-827.91 819.37,-827.91 819.37,-746.09 819.37,-746.09 819.37,-741.07 872.16,-737 937.16,-737 1002.16,-737 1054.96,-741.07 1054.96,-746.09 1054.96,-746.09 1054.96,-827.91 1054.96,-827.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1054.96,-827.91C1054.96,-822.9 1002.16,-818.82 937.16,-818.82 872.16,-818.82 819.37,-822.9 819.37,-827.91"/>
<text xml:space="preserve" text-anchor="start" x="829.37" y="-779" font-family="Arial" font-size="20.00" fill="#ffe0c2">OCI監視VM / STG・PRD</text>
</g>
<!-- operator -->
<g id="node9" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-587 0,-587 0,-487 180,-487 180,-587"/>
<text xml:space="preserve" text-anchor="start" x="65" y="-529" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- reventer&#45;&gt;vms -->
<g id="edge2" class="edge">
<title>reventer&#45;&gt;vms</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M483.62,-787C571.83,-787 708.01,-787 807.96,-787"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="807.9,-789.63 815.4,-787 807.9,-784.38 807.9,-789.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="565.18,-787 565.18,-809.8 700.31,-809.8 700.31,-787 565.18,-787"/>
<text xml:space="preserve" text-anchor="start" x="568.18" y="-792.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">metrics / logs / 環境別</text>
</g>
<!-- grafana&#45;&gt;pdc -->
<g id="edge4" class="edge">
<title>grafana&#45;&gt;pdc</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M498.06,-489.32C564.82,-459.57 654.07,-421.79 735.16,-394 768,-382.75 804.49,-372.34 837.28,-363.72"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="837.8,-366.3 844.4,-361.87 836.48,-361.22 837.8,-366.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="585.79,-471.03 585.79,-493.83 679.7,-493.83 679.7,-471.03 585.79,-471.03"/>
<text xml:space="preserve" text-anchor="start" x="588.79" y="-476.83" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由の検索</text>
</g>
<!-- grafana&#45;&gt;vms -->
<g id="edge3" class="edge">
<title>grafana&#45;&gt;vms</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M467.5,-586.99C489.75,-601.37 514.63,-616.52 538.33,-629 625.69,-674.99 729.52,-715.8 809.2,-744.42"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="807.99,-746.78 815.94,-746.83 809.76,-741.83 807.99,-746.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="603.3,-710.75 603.3,-733.55 662.19,-733.55 662.19,-710.75 603.3,-710.75"/>
<text xml:space="preserve" text-anchor="start" x="606.3" y="-716.55" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由</text>
</g>
<!-- exporters&#45;&gt;collector -->
<g id="edge7" class="edge">
<title>exporters&#45;&gt;collector</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M1026.95,-177.92C1078.58,-176.7 1145.18,-175.14 1205.54,-173.72"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1205.49,-176.35 1212.92,-173.55 1205.36,-171.1 1205.49,-176.35"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1111.3,-176.19 1111.3,-198.99 1159.32,-198.99 1159.32,-176.19 1111.3,-176.19"/>
<text xml:space="preserve" text-anchor="start" x="1114.3" y="-181.99" font-family="Arial" font-size="14.00" fill="#ffe0c2">scrape</text>
</g>
<!-- pdc&#45;&gt;grafana -->
<g id="edge8" class="edge">
<title>pdc&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M847.52,-324.38C763.23,-313.96 635.27,-309.96 538.33,-359.2 487.92,-384.81 449.16,-437.02 424.7,-478.27"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="422.56,-476.74 421.07,-484.54 427.1,-479.37 422.56,-476.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="585.79,-359.2 585.79,-382 679.7,-382 679.7,-359.2 585.79,-359.2"/>
<text xml:space="preserve" text-anchor="start" x="588.79" y="-365" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きPDC接続</text>
</g>
<!-- pdc&#45;&gt;local_store -->
<g id="edge9" class="edge">
<title>pdc&#45;&gt;local_store</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1027.07,-340C1189.74,-340 1534.84,-340 1712.45,-340"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1712.34,-342.63 1719.84,-340 1712.34,-337.38 1712.34,-342.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1298.34,-340 1298.34,-362.8 1431.97,-362.8 1431.97,-340 1298.34,-340"/>
<text xml:space="preserve" text-anchor="start" x="1301.34" y="-345.8" font-family="Arial" font-size="14.00" fill="#d4f2ff">private query / :8428</text>
</g>
<!-- collector&#45;&gt;local_store -->
<g id="edge10" class="edge">
<title>collector&#45;&gt;local_store</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M1500.5,-219.97C1568.13,-245.13 1649.09,-275.25 1713.01,-299.02"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1711.93,-301.42 1719.87,-301.57 1713.76,-296.5 1711.93,-301.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1554.66,-285.01 1554.66,-307.81 1683.59,-307.81 1683.59,-285.01 1554.66,-285.01"/>
<text xml:space="preserve" text-anchor="start" x="1557.66" y="-290.81" font-family="Arial" font-size="14.00" fill="#ffe0c2">remoteWrite / :8428</text>
</g>
<!-- hardware&#45;&gt;collector -->
<g id="edge5" class="edge">
<title>hardware&#45;&gt;collector</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M1009.25,-536.21C1035.32,-516.09 1064.03,-491.58 1086.96,-466 1157.76,-387.01 1140.63,-339.99 1215.65,-265 1229.98,-250.68 1246.82,-237.42 1263.92,-225.62"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1265.07,-228.01 1269.81,-221.64 1262.13,-223.66 1265.07,-228.01"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1094.96,-456.67 1094.96,-479.47 1175.65,-479.47 1175.65,-456.67 1094.96,-456.67"/>
<text xml:space="preserve" text-anchor="start" x="1097.96" y="-462.47" font-family="Arial" font-size="14.00" fill="#ffe0c2">exporter収集</text>
</g>
<!-- vms&#45;&gt;grafana -->
<g id="edge6" class="edge">
<title>vms&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M818.52,-767.58C786.65,-756.52 755.4,-739.19 735.16,-712 719.1,-690.42 745.26,-611.11 727.16,-591.2 673.28,-531.91 581.84,-520.57 508.5,-522.83"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="508.69,-520.19 501.3,-523.11 508.9,-525.44 508.69,-520.19"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="538.33,-591.2 538.33,-614 727.16,-614 727.16,-591.2 538.33,-591.2"/>
<text xml:space="preserve" text-anchor="start" x="541.33" y="-597" font-family="Arial" font-size="14.00" fill="#d4f2ff">VM側PDC agentから外向き接続</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge1" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M179.93,-537C211.05,-537 246.43,-537 279.29,-537"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="278.87,-539.63 286.37,-537 278.87,-534.38 278.87,-539.63"/>
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
<svg width="3235pt" height="468pt"
 viewBox="0.00 0.00 3235.00 468.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="3204.81,-288 2511.19,-288 2511.19,-108 3204.81,-108 3204.81,-288"/>
<text xml:space="preserve" text-anchor="start" x="2678.52" y="-201" font-family="Arial" font-size="20.00" fill="#eff6ff">外部所有PRDクラスタ / 共通アドオンの配置先</text>
<text xml:space="preserve" text-anchor="start" x="2531.24" y="-178" font-family="Arial" font-size="15.00" fill="#bfdbfe">この図が管理対象として示すのは共通アドオンとApplication登録。クラスタ本体・アプリ実装はreventerが所有。</text>
</g>
</g>
</svg>
`;case`network`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2859pt" height="2833pt"
 viewBox="0.00 0.00 2859.00 2833.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 2818.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="1511.4,-8 1511.4,-1912 2821.21,-1912 2821.21,-8 1511.4,-8"/>
<text xml:space="preserve" text-anchor="start" x="1519.4" y="-1899.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1551.4,-48 1551.4,-569 2428.73,-569 2428.73,-48 1551.4,-48"/>
<text xml:space="preserve" text-anchor="start" x="1559.4" y="-556.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_dns</title>
<polygon fill="#3e4651" stroke="#2d333d" points="2095.83,-609 2095.83,-810 2781.21,-810 2781.21,-609 2095.83,-609"/>
<text xml:space="preserve" text-anchor="start" x="2103.83" y="-797.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">内部DNS / METALLB</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_lan</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2099.67,-850 2099.67,-1851 2435.43,-1851 2435.43,-850 2099.67,-850"/>
<text xml:space="preserve" text-anchor="start" x="2107.67" y="-1838.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">LAN / VLAN・経路</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_oke</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-2173 8,-2795 1329.21,-2795 1329.21,-2173 8,-2173"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-2782.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">OCI / STG OKE共通基盤</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_network</title>
<polygon fill="#3e4651" stroke="#2d333d" points="489.61,-2213 489.61,-2734 1289.21,-2734 1289.21,-2213 489.61,-2213"/>
<text xml:space="preserve" text-anchor="start" x="497.61" y="-2721.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">OCI NETWORK</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1505.25,-1920 1505.25,-2441 1857.55,-2441 1857.55,-1920 1505.25,-1920"/>
<text xml:space="preserve" text-anchor="start" x="1513.25" y="-2428.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<!-- wifi -->
<g id="node1" class="node">
<title>wifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1771.4,-188 1591.4,-188 1591.4,-88 1771.4,-88 1771.4,-188"/>
<text xml:space="preserve" text-anchor="start" x="1641.96" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">Wi&#45;Fi AP</text>
</g>
<!-- unifi -->
<g id="node2" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1771.4,-348 1591.4,-348 1591.4,-248 1771.4,-248 1771.4,-348"/>
<text xml:space="preserve" text-anchor="start" x="1608.61" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS Server</text>
</g>
<!-- lb -->
<g id="node3" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2388.73,-188 2146.38,-188 2146.38,-88 2388.73,-88 2388.73,-188"/>
<text xml:space="preserve" text-anchor="start" x="2156.39" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived ×2</text>
</g>
<!-- router -->
<g id="node4" class="node">
<title>router</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1771.4,-508 1591.4,-508 1591.4,-408 1771.4,-408 1771.4,-508"/>
<text xml:space="preserve" text-anchor="start" x="1615.25" y="-450" font-family="Arial" font-size="20.00" fill="#f8fafc">IX2215 / VLAN</text>
</g>
<!-- coredns -->
<g id="node5" class="node">
<title>coredns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2399.28,-749 2135.83,-749 2135.83,-649 2399.28,-649 2399.28,-749"/>
<text xml:space="preserve" text-anchor="start" x="2145.84" y="-691" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / miutaku.internal</text>
</g>
<!-- metallb -->
<g id="node6" class="node">
<title>metallb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2741.21,-749 2484.43,-749 2484.43,-649 2741.21,-649 2741.21,-749"/>
<text xml:space="preserve" text-anchor="start" x="2494.44" y="-691" font-family="Arial" font-size="20.00" fill="#f8fafc">MetalLB / LANのService IP</text>
</g>
<!-- native -->
<g id="node7" class="node">
<title>native</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2379.31,-990 2155.8,-990 2155.8,-890 2379.31,-890 2379.31,-990"/>
<text xml:space="preserve" text-anchor="start" x="2165.81" y="-932" font-family="Arial" font-size="20.00" fill="#f8fafc">native / 192.168.0.0/24</text>
</g>
<!-- management -->
<g id="node8" class="node">
<title>management</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2395.43,-1150 2139.67,-1150 2139.67,-1050 2395.43,-1050 2395.43,-1150"/>
<text xml:space="preserve" text-anchor="start" x="2149.68" y="-1092" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN10 / 192.168.10.0/24</text>
</g>
<!-- client -->
<g id="node9" class="node">
<title>client</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2395.43,-1310 2139.67,-1310 2139.67,-1210 2395.43,-1210 2395.43,-1310"/>
<text xml:space="preserve" text-anchor="start" x="2149.68" y="-1252" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN30 / 192.168.30.0/24</text>
</g>
<!-- guest -->
<g id="node10" class="node">
<title>guest</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2357.55,-1470 2177.55,-1470 2177.55,-1370 2357.55,-1370 2357.55,-1470"/>
<text xml:space="preserve" text-anchor="start" x="2197.51" y="-1412" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN31 / guest</text>
</g>
<!-- iot -->
<g id="node11" class="node">
<title>iot</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2395.43,-1630 2139.67,-1630 2139.67,-1530 2395.43,-1530 2395.43,-1630"/>
<text xml:space="preserve" text-anchor="start" x="2149.68" y="-1572" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN40 / 192.168.40.0/24</text>
</g>
<!-- server -->
<g id="node12" class="node">
<title>server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2395.43,-1790 2139.67,-1790 2139.67,-1690 2395.43,-1690 2395.43,-1790"/>
<text xml:space="preserve" text-anchor="start" x="2149.68" y="-1732" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN20 / 192.168.20.0/24</text>
</g>
<!-- private_workers -->
<g id="node13" class="node">
<title>private_workers</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="740.83,-2446 529.61,-2446 529.61,-2346 740.83,-2346 740.83,-2446"/>
<text xml:space="preserve" text-anchor="start" x="539.62" y="-2388" font-family="Arial" font-size="20.00" fill="#f8fafc">private worker subnet</text>
</g>
<!-- nat -->
<g id="node14" class="node">
<title>nat</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1249.21,-2513 990.21,-2513 990.21,-2413 1249.21,-2413 1249.21,-2513"/>
<text xml:space="preserve" text-anchor="start" x="1000.21" y="-2455" font-family="Arial" font-size="20.00" fill="#f8fafc">NAT gateway / reserved IP</text>
</g>
<!-- service_gateway -->
<g id="node15" class="node">
<title>service_gateway</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1243.09,-2353 996.32,-2353 996.32,-2253 1243.09,-2253 1243.09,-2353"/>
<text xml:space="preserve" text-anchor="start" x="1006.33" y="-2295" font-family="Arial" font-size="20.00" fill="#f8fafc">Service Gateway / Oracle</text>
</g>
<!-- igw -->
<g id="node16" class="node">
<title>igw</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="725.22,-2673 545.22,-2673 545.22,-2573 725.22,-2573 725.22,-2673"/>
<text xml:space="preserve" text-anchor="start" x="561.28" y="-2615" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet gateway</text>
</g>
<!-- public_api -->
<g id="node17" class="node">
<title>public_api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1215.87,-2673 1023.54,-2673 1023.54,-2573 1215.87,-2573 1215.87,-2673"/>
<text xml:space="preserve" text-anchor="start" x="1033.55" y="-2615" font-family="Arial" font-size="20.00" fill="#f8fafc">公開API・LB subnet</text>
</g>
<!-- workers -->
<g id="node18" class="node">
<title>workers</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="265.94,-2446 48,-2446 48,-2346 265.94,-2346 265.94,-2446"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-2388" font-family="Arial" font-size="20.00" fill="#f8fafc">base / burst node pool</text>
</g>
<!-- warp -->
<g id="node19" class="node">
<title>warp</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1817.55,-2060 1545.25,-2060 1545.25,-1960 1817.55,-1960 1817.55,-2060"/>
<text xml:space="preserve" text-anchor="start" x="1555.26" y="-2002" font-family="Arial" font-size="20.00" fill="#f8fafc">WARP / private CIDR routes</text>
</g>
<!-- internet -->
<g id="node20" class="node">
<title>internet</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1771.4,-2220 1591.4,-2220 1591.4,-2120 1771.4,-2120 1771.4,-2220"/>
<text xml:space="preserve" text-anchor="start" x="1647.49" y="-2162" font-family="Arial" font-size="20.00" fill="#f8fafc">Internet</text>
</g>
<!-- oracle -->
<g id="node21" class="node">
<title>oracle</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1801.44,-2380 1561.36,-2380 1561.36,-2280 1801.44,-2280 1801.44,-2380"/>
<text xml:space="preserve" text-anchor="start" x="1571.37" y="-2322" font-family="Arial" font-size="20.00" fill="#f8fafc">Oracle Services Network</text>
</g>
<!-- operator -->
<g id="node22" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="1209.71,-348 1029.71,-348 1029.71,-248 1209.71,-248 1209.71,-348"/>
<text xml:space="preserve" text-anchor="start" x="1094.7" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- wifi&#45;&gt;lb -->
<!-- unifi&#45;&gt;coredns -->
<!-- router&#45;&gt;native -->
<g id="edge5" class="edge">
<title>router&#45;&gt;native</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1771.08,-489.19C1867.28,-528.16 2016.6,-604.75 2087.83,-725.2 2110.48,-763.5 2073.38,-786.58 2095.83,-825 2109.5,-848.39 2130.05,-868.01 2152.2,-884.05"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2150.63,-886.15 2158.28,-888.29 2153.63,-881.84 2150.63,-886.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1946.85,-725.2 1946.85,-748 2006.54,-748 2006.54,-725.2 1946.85,-725.2"/>
<text xml:space="preserve" text-anchor="start" x="1949.85" y="-731" font-family="Arial" font-size="14.00" fill="#c9c9c9">native IF</text>
</g>
<!-- router&#45;&gt;management -->
<g id="edge6" class="edge">
<title>router&#45;&gt;management</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1708.25,-507.88C1741.16,-569.44 1801.46,-676.14 1865.55,-759 1952.37,-871.25 2018.77,-864.23 2087.83,-988.2 2094.92,-1000.93 2086.56,-1008.76 2095.83,-1020 2105.74,-1032.02 2117.86,-1042.33 2131.03,-1051.16"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2129.53,-1053.31 2137.27,-1055.12 2132.35,-1048.88 2129.53,-1053.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1954.62,-988.2 1954.62,-1011 1998.76,-1011 1998.76,-988.2 1954.62,-988.2"/>
<text xml:space="preserve" text-anchor="start" x="1957.62" y="-994" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI10</text>
</g>
<!-- router&#45;&gt;client -->
<g id="edge7" class="edge">
<title>router&#45;&gt;client</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1687.7,-507.78C1701.03,-612.5 1744,-859.33 1865.55,-1022 1931.94,-1110.85 2042.13,-1172.77 2130.21,-1211.13"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2129.04,-1213.49 2136.97,-1214.04 2131.12,-1208.66 2129.04,-1213.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1954.62,-1188.41 1954.62,-1211.21 1998.76,-1211.21 1998.76,-1188.41 1954.62,-1188.41"/>
<text xml:space="preserve" text-anchor="start" x="1957.62" y="-1194.21" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI30</text>
</g>
<!-- router&#45;&gt;guest -->
<g id="edge8" class="edge">
<title>router&#45;&gt;guest</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1688.71,-507.92C1708.75,-659.71 1774.97,-1112.28 1865.55,-1226 1941.44,-1321.28 2075.75,-1372.76 2167.86,-1398.26"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2166.91,-1400.72 2174.84,-1400.15 2168.29,-1395.66 2166.91,-1400.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1913,-1369.73 1913,-1392.53 2040.38,-1392.53 2040.38,-1369.73 1913,-1369.73"/>
<text xml:space="preserve" text-anchor="start" x="1916" y="-1375.53" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI31 / 他VLAN拒否</text>
</g>
<!-- router&#45;&gt;iot -->
<g id="edge9" class="edge">
<title>router&#45;&gt;iot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1685.92,-507.85C1699.18,-682.83 1751.3,-1266.15 1865.55,-1408 1930.75,-1488.95 2041.26,-1532.54 2129.77,-1555.56"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2129.06,-1558.08 2136.97,-1557.38 2130.35,-1552.99 2129.06,-1558.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1954.62,-1541.11 1954.62,-1563.91 1998.76,-1563.91 1998.76,-1541.11 1954.62,-1541.11"/>
<text xml:space="preserve" text-anchor="start" x="1957.62" y="-1546.91" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI40</text>
</g>
<!-- router&#45;&gt;server -->
<g id="edge10" class="edge">
<title>router&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1684.19,-507.89C1692.1,-702.7 1729.84,-1409.62 1865.55,-1579 1930.03,-1659.47 2040.87,-1699.95 2129.7,-1720.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2129.02,-1722.71 2136.91,-1721.77 2130.16,-1717.58 2129.02,-1722.71"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1954.62,-1707.12 1954.62,-1729.92 1998.76,-1729.92 1998.76,-1707.12 1954.62,-1707.12"/>
<text xml:space="preserve" text-anchor="start" x="1957.62" y="-1712.92" font-family="Arial" font-size="14.00" fill="#c9c9c9">BVI20</text>
</g>
<!-- coredns&#45;&gt;metallb -->
<!-- private_workers&#45;&gt;nat -->
<g id="edge12" class="edge">
<title>private_workers&#45;&gt;nat</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M740.61,-2410.5C810.76,-2420.24 903.96,-2433.18 980.28,-2443.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="979.66,-2446.34 987.45,-2444.77 980.39,-2441.14 979.66,-2446.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="823.6,-2439.42 823.6,-2462.22 907.43,-2462.22 907.43,-2439.42 823.6,-2439.42"/>
<text xml:space="preserve" text-anchor="start" x="826.6" y="-2445.22" font-family="Arial" font-size="14.00" fill="#c9c9c9">default route</text>
</g>
<!-- private_workers&#45;&gt;service_gateway -->
<g id="edge13" class="edge">
<title>private_workers&#45;&gt;service_gateway</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M740.61,-2375.88C812.61,-2362 908.91,-2343.44 986.3,-2328.52"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="986.77,-2331.11 993.63,-2327.11 985.77,-2325.95 986.77,-2331.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="780.83,-2365.92 780.83,-2388.72 950.21,-2388.72 950.21,-2365.92 780.83,-2365.92"/>
<text xml:space="preserve" text-anchor="start" x="783.83" y="-2371.72" font-family="Arial" font-size="14.00" fill="#c9c9c9">Oracle service CIDR route</text>
</g>
<!-- nat&#45;&gt;internet -->
<g id="edge14" class="edge">
<title>nat&#45;&gt;internet</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1249.13,-2462.82C1333.11,-2455.3 1437.89,-2430.45 1497.25,-2358 1512.5,-2339.38 1491.5,-2269.75 1505.25,-2250 1523.6,-2223.63 1552.86,-2205.79 1582.25,-2193.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1582.91,-2196.34 1588.96,-2191.18 1581.01,-2191.45 1582.91,-2196.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1351.21,-2448.48 1351.21,-2471.28 1483.25,-2471.28 1483.25,-2448.48 1351.21,-2448.48"/>
<text xml:space="preserve" text-anchor="start" x="1354.21" y="-2454.28" font-family="Arial" font-size="14.00" fill="#c9c9c9">NAT / reserved IPv4</text>
</g>
<!-- service_gateway&#45;&gt;oracle -->
<g id="edge15" class="edge">
<title>service_gateway&#45;&gt;oracle</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1242.84,-2308.89C1333.99,-2313.29 1458.28,-2319.28 1551.1,-2323.76"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1550.76,-2326.37 1558.38,-2324.11 1551.02,-2321.13 1550.76,-2326.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1337.21,-2320.5 1337.21,-2343.3 1497.25,-2343.3 1497.25,-2320.5 1337.21,-2320.5"/>
<text xml:space="preserve" text-anchor="start" x="1340.21" y="-2326.3" font-family="Arial" font-size="14.00" fill="#c9c9c9">Oracle Services Network</text>
</g>
<!-- igw&#45;&gt;public_api -->
<g id="edge18" class="edge">
<title>igw&#45;&gt;public_api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M725,-2623C806.47,-2623 927.24,-2623 1013.52,-2623"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1013.34,-2625.63 1020.84,-2623 1013.34,-2620.38 1013.34,-2625.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="809.2,-2623 809.2,-2645.8 921.83,-2645.8 921.83,-2623 809.2,-2623"/>
<text xml:space="preserve" text-anchor="start" x="812.2" y="-2628.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">public route table</text>
</g>
<!-- workers&#45;&gt;private_workers -->
<g id="edge11" class="edge">
<title>workers&#45;&gt;private_workers</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M265.74,-2396C341.37,-2396 442.36,-2396 519.48,-2396"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="519.2,-2398.63 526.7,-2396 519.2,-2393.38 519.2,-2398.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="305.94,-2396 305.94,-2418.8 481.61,-2418.8 481.61,-2396 305.94,-2396"/>
<text xml:space="preserve" text-anchor="start" x="308.94" y="-2401.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">private subnet / 10.0.2.0/24</text>
</g>
<!-- warp&#45;&gt;server -->
<g id="edge16" class="edge">
<title>warp&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1790.56,-1960.01C1892.37,-1912.95 2044.43,-1842.67 2149.15,-1794.26"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2150.04,-1796.74 2155.75,-1791.21 2147.84,-1791.98 2150.04,-1796.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1865.55,-1922.67 1865.55,-1945.47 2087.83,-1945.47 2087.83,-1922.67 1865.55,-1922.67"/>
<text xml:space="preserve" text-anchor="start" x="1868.55" y="-1928.47" font-family="Arial" font-size="14.00" fill="#c9c9c9">private CIDR routes / WARP policy</text>
</g>
<!-- internet&#45;&gt;igw -->
<g id="edge17" class="edge">
<title>internet&#45;&gt;igw</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1591.61,-2160.67C1458.07,-2149.55 1198.92,-2139.39 990.21,-2200.2 887.06,-2230.25 845.85,-2235.48 780.83,-2321 737.77,-2377.64 770.84,-2411.5 740.83,-2476 726.22,-2507.39 704.72,-2539.08 685.01,-2564.96"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="683.04,-2563.21 680.54,-2570.75 687.2,-2566.42 683.04,-2563.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1056.02,-2200.2 1056.02,-2223 1183.39,-2223 1183.39,-2200.2 1056.02,-2200.2"/>
<text xml:space="preserve" text-anchor="start" x="1059.02" y="-2206" font-family="Arial" font-size="14.00" fill="#c9c9c9">公開API・LBへの到達</text>
</g>
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