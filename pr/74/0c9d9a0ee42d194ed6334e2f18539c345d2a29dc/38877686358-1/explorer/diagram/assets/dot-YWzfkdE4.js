var e=e=>{switch(e){case`index`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=index,
        nodesep=0.834,
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
            network [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.hardware",
                height=1.389,
                label=<<FONT POINT-SIZE="20">ネットワーク機器</FONT>>,
                likec4_id="premises.hardware.network",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            x570 [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.hardware",
                height=1.389,
                label=<<FONT POINT-SIZE="20">pve-x570 / Proxmox</FONT>>,
                likec4_id="premises.hardware.x570",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            b550m [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.hardware",
                height=1.389,
                label=<<FONT POINT-SIZE="20">pve-b550m / Proxmox</FONT>>,
                likec4_id="premises.hardware.b550m",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            rpi_workers [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.hardware",
                height=1.389,
                label=<<FONT POINT-SIZE="20">RPi worker ×2</FONT>>,
                likec4_id="premises.hardware.rpi_workers",
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
        "edge" [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Cloudflare</FONT>>,
            likec4_id="external.edge",
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
        bws [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Bitwarden Secrets Manager</FONT>>,
            likec4_id="external.bws",
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
    user [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">利用者</FONT>>,
        likec4_id=user,
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    user -> "edge" [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS / 利用時の認証</FONT></TD></TR></TABLE>>,
        likec4_id="1pv2rwr",
        minlen=1,
        style=dashed,
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
    operator -> "edge" [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HTTPS / 管理時の認証</FONT></TD></TR></TABLE>>,
        likec4_id="1ooiwka",
        style=dashed,
        weight=2];
    operator -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">照会</FONT></TD></TR></TABLE>>,
        likec4_id=p6u0p1,
        style=dashed,
        weight=2];
    network -> x570 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1管理 / ゲストtag20・30 / 配線ポート未確定</FONT></TD></TR></TABLE>>,
        likec4_id=jutk7y,
        style=dotted,
        weight=3];
    network -> b550m [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1管理 / ゲストtag20・40 / 配線ポート未確定</FONT></TD></TR></TABLE>>,
        likec4_id=g5h963,
        style=dotted,
        weight=3];
    network -> rpi_workers [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VLAN10 / arm64 worker</FONT></TD></TR></TABLE>>,
        likec4_id="3g0rk5",
        style=dotted,
        weight=2];
    network -> home [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">LAN / 内部DNS</FONT></TD></TR></TABLE>>,
        likec4_id="4534y3",
        style=dashed,
        weight=2];
    x570 -> nas [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">TrueNAS VM69001 / USB disk passthrough</FONT></TD></TR></TABLE>>,
        likec4_id="8mw36a",
        style=solid];
    x570 -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="8mwp67",
        style=dashed,
        weight=2];
    x570 -> home [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Talos VM13001・13004 / CP1・worker1</FONT></TD></TR></TABLE>>,
        likec4_id="12ha9un",
        style=solid,
        weight=2];
    b550m -> nas [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">TrueNAS VM69002 / USB disk passthrough</FONT></TD></TR></TABLE>>,
        likec4_id=jabx9j,
        style=solid];
    b550m -> pbs [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">VM backup</FONT></TD></TR></TABLE>>,
        likec4_id=jablne,
        style=dashed,
        weight=2];
    b550m -> home [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Talos VM13002・13003・13005 / CP2・worker1</FONT></TD></TR></TABLE>>,
        likec4_id="8j6vvu",
        style=solid,
        weight=2];
    rpi_workers -> home [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Talos worker03・04 / arm64</FONT></TD></TR></TABLE>>,
        likec4_id="1j562mc",
        style=solid,
        weight=2];
    rpi_workers -> home [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        likec4_id="1upxsuz",
        ltail=cluster_hardware,
        style=dotted,
        weight=3,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">exporter収集</FONT></TD></TR></TABLE>>];
    nas -> home [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">NFSストレージを提供</FONT></TD></TR></TABLE>>,
        likec4_id="1ne3xl3",
        style=dashed,
        weight=2];
    pbs -> idrive [arrowhead=normal,
        color="#b45309",
        fontcolor="#FFE0C2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">S3 datastore / VM backup</FONT></TD></TR></TABLE>>,
        likec4_id="1tvga97",
        minlen=1,
        style=dashed];
    "edge" -> home [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">認証済みHTTP / Access・mTLS → 内部Service</FONT></TD></TR></TABLE>>,
        likec4_id=yr0r25,
        style=dashed];
    grafana -> home [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PDC経由の検索</FONT></TD></TR></TABLE>>,
        likec4_id="1h72jm",
        style=dashed];
    bws -> home [arrowhead=normal,
        color="#AC4D39",
        fontcolor="#fcd9d2",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Secret注入</FONT></TD></TR></TABLE>>,
        likec4_id=c0a5so,
        minlen=1,
        style=dotted];
    home -> grafana [arrowhead=normal,
        color="#0ea5e9",
        fontcolor="#d4f2ff",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">外向きPDC接続</FONT></TD></TR></TABLE>>,
        likec4_id="12x4ww2",
        style=dashed];
    home -> reventer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">共有ArgoCD・ARCを提供 / 専用構成は利用側へ</FONT></TD></TR></TABLE>>,
        likec4_id=mykrfr,
        minlen=1,
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
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>生活サービス / LOOCKIT・COUPON・WOL</B></FONT>>,
                likec4_depth=1,
                likec4_id="premises.home.apps",
                likec4_level=1,
                margin=40,
                style=filled
            ];
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
            wol [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">Wake-on-LAN</FONT>>,
                likec4_id="premises.home.apps.wol",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            annict_scraper [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                group="premises.home",
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
        platform [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home",
            height=1.389,
            label=<<FONT POINT-SIZE="20">クラスタ基盤 / Talos</FONT>>,
            likec4_id="premises.home.platform",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        nextcloud [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Nextcloud</FONT>>,
            likec4_id="premises.home.nextcloud",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        recording [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home",
            height=1.389,
            label=<<FONT POINT-SIZE="20">録画・配信 / EPGStation・TNLaStation</FONT>>,
            likec4_id="premises.home.recording",
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
    "edge" -> nextcloud [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">nextcloud / 80 / Access</FONT></TD></TR></TABLE>>,
        likec4_id="7ftmxx",
        style=dashed,
        weight=2];
    "edge" -> recording [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="3srpa",
        style=dashed,
        weight=2];
    "edge" -> loockit [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">loockit-api / 8080 / mTLS</FONT></TD></TR></TABLE>>,
        likec4_id="1883sxi",
        style=dashed];
    "edge" -> coupon_manager [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">coupon-manager / 80 / Access</FONT></TD></TR></TABLE>>,
        likec4_id=d7p9l7,
        style=dashed];
    "edge" -> wol [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">wol / 5000 / Access</FONT></TD></TR></TABLE>>,
        likec4_id="1pvgwl7",
        minlen=1,
        style=dashed];
    kiosk [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">MagicMirror表示 / VM5000</FONT>>,
        likec4_id="premises.hardware.kiosk",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    kiosk -> magic_mirror [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">表示</FONT></TD></TR></TABLE>>,
        likec4_id="1u5mwhh",
        style=dashed,
        weight=4];
    platform -> nextcloud [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Nextcloud Pod</FONT></TD></TR></TABLE>>,
        likec4_id=ssbq03,
        style=solid,
        weight=4];
    platform -> recording [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画・配信Pod</FONT></TD></TR></TABLE>>,
        likec4_id=yipnp4,
        style=solid,
        weight=4];
    platform -> loockit [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        lhead=cluster_apps,
        likec4_id="157jybr",
        style=solid,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">アプリPod / HAProxy・Web・API</FONT></TD></TR></TABLE>>];
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
        weight=2];
    nas02 [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">TrueNAS VM69002 / nas-02</FONT>>,
        likec4_id="premises.data.nas.nas02",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    nextcloud -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="1sydo1b",
        style=dashed,
        weight=2];
    recording -> annict_scraper [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">番組照合</FONT></TD></TR></TABLE>>,
        likec4_id=qsn8db,
        style=dashed,
        weight=4];
    recording -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=rhcxgu,
        style=dashed,
        weight=2];
    recording -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">録画・thumbnail・drop / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="1q41438",
        style=dashed,
        weight=2];
    coupon_manager -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="4aapwb",
        style=dashed,
        weight=2];
    ai [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Gemini API / OpenAI互換</FONT>>,
        likec4_id="external.ai",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    coupon_manager -> ai [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">AI API</FONT></TD></TR></TABLE>>,
        likec4_id=vnvvfk,
        minlen=1,
        style=dashed];
    coupon_manager -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">images・Data Protection keys / PVC</FONT></TD></TR></TABLE>>,
        likec4_id=i12jup,
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
    databases -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id="15gqzio",
        minlen=0,
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
                group=premises,
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
        home [group=premises,
            height=1.389,
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
        style=dashed,
        weight=3];
    runner -> home [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">runner Podの作成・削除</FONT></TD></TR></TABLE>>,
        likec4_id="12c37mw",
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
  "x570" [
    likec4_id = "homeSite.x570";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">pve-x570</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c2f0c2">192.168.0.115 / native1。Talos<BR/>VM2・TrueNAS・PBS・UniFi・Windows・LXC2。</FONT></TD></TR></TABLE>>;
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
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">pve-b550m</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c2f0c2">192.168.0.119 / native1。Talos<BR/>VM3・TrueNAS・Docker開発・表示VM・LXC2。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#428a4f";
    fontcolor = "#f8fafc";
    color = "#2d5d39";
  ];
  "talos" [
    likec4_id = "homeSite.talos";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">home-k8s</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">3 CP VM・2 worker VM・2<BR/>RPiで構成。namespace/Podの配置は動的。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
  ];
  "lan" [
    likec4_id = "homeSite.lan";
    likec4_level = 1;
    label = <<FONT POINT-SIZE="20">LAN / VLAN・経路</FONT>>;
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
    likec4_depth = 1;
    fillcolor = "#454545";
    color = "#313131";
    style = "filled";
    margin = 50;
    label = <<FONT POINT-SIZE="11" COLOR="#d4d4d4b3"><B>自宅 / PROXMOX2ホスト・RPI</B></FONT>>;
    "worker_pi1";
    "worker_pi2";
    "network";
    "x570";
    "b550m";
    "talos";
    "lan";
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
    arrowtail = "normal";
    dir = "both";
  ];
  "b550m" -> "talos" [
    likec4_id = "1a3tikm";
    style = "dashed";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    color = "#3b82f6";
    fontcolor = "#eff5fd";
    arrowhead = "normal";
    arrowtail = "normal";
    dir = "both";
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
  "talos" -> "worker_pi1" [
    likec4_id = "z2zxnc";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos" -> "worker_pi2" [
    likec4_id = "z2zxnf";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "network" -> "x570" [
    likec4_id = "1jgj494";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1管理 / ゲストtag20・30 / 配線ポート未確定</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "network" -> "b550m" [
    likec4_id = "1hw0m9p";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1管理 / ゲストtag20・40 / 配線ポート未確定</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "x570" -> "lan" [
    likec4_id = "85estx";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "b550m" -> "lan" [
    likec4_id = "166ervk";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos" -> "lan" [
    likec4_id = "dvw5ui";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">L2広告 / Service IP .200-.226</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "network" -> "lan" [
    likec4_id = "vtbsv5";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
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
  "bluez" [
    likec4_id = "homeSite.x570.bluez";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">BlueZ / USB Bluetooth</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
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
  "app" [
    likec4_id = "homeSite.x570.loockit.app";
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
    likec4_id = "homeSite.x570.tuner.app";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Docker / Mirakurun / PT3</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "app_2" [
    likec4_id = "homeSite.x570.unifi.app";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Podman / UniFi OS・Network</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "talos_2" [
    likec4_id = "homeSite.talos";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">home-k8s</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">3 CP VM・2 worker VM・2<BR/>RPiで構成。namespace/Podの配置は動的。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
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
  "lan" [
    likec4_id = "homeSite.lan";
    likec4_level = 1;
    label = <<FONT POINT-SIZE="20">LAN / VLAN・経路</FONT>>;
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
    "lan";
    subgraph "cluster_x570" {
      likec4_id = "homeSite.x570";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#29472f";
      color = "#1c3021";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PVE-X570</B></FONT>>;
      "bluez";
      "pbs";
      "nas1";
      "lb";
      "windows";
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
      subgraph "cluster_loockit" {
        likec4_id = "homeSite.x570.loockit";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>LOOCKIT 01 / CT12902</B></FONT>>;
        "app";
      }
      subgraph "cluster_unifi" {
        likec4_id = "homeSite.x570.unifi";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>UNIFI OS VM13201</B></FONT>>;
        "app_2";
      }
      subgraph "cluster_tuner" {
        likec4_id = "homeSite.x570.tuner";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>MIRAKURUN本番 / CT12901・PT3</B></FONT>>;
        "app_1";
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
  "talos_2" -> "talos_1" [
    likec4_id = "9j166p";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "pbs" -> "lan" [
    likec4_id = "11mbnoa";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "nas1" -> "lan" [
    likec4_id = "1lkeg7q";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "lb" -> "lan" [
    likec4_id = "1qdc579";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "windows" -> "lan" [
    likec4_id = "ns3fyc";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 30</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos_2" -> "lan" [
    likec4_id = "dvw5ui";
    style = "dotted";
    weight = 3;
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">L2広告 / Service IP .200-.226</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "app" -> "lan" [
    likec4_id = "b7qixu";
    style = "dotted";
    ltail = "cluster_loockit";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos" -> "lan" [
    likec4_id = "oupik9";
    style = "dotted";
    ltail = "cluster_cp1";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos_1" -> "lan" [
    likec4_id = "1hx89p8";
    style = "dotted";
    ltail = "cluster_worker1";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "app_2" -> "lan" [
    likec4_id = "5m6k7a";
    style = "dotted";
    ltail = "cluster_unifi";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / native 1</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "app_1" -> "lan" [
    likec4_id = "ay0nmr";
    style = "dotted";
    ltail = "cluster_tuner";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
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
  "bluez" [
    likec4_id = "homeSite.b550m.bluez";
    likec4_level = 2;
    label = <<FONT POINT-SIZE="20">BlueZ / USB Bluetooth</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
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
  "app" [
    likec4_id = "homeSite.b550m.loockit.app";
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
    likec4_id = "homeSite.b550m.tuner.app";
    likec4_level = 3;
    label = <<FONT POINT-SIZE="20">Docker / Mirakurun / PX-S1UD</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "talos_3" [
    likec4_id = "homeSite.talos";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">home-k8s</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">3 CP VM・2 worker VM・2<BR/>RPiで構成。namespace/Podの配置は動的。</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
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
    label = <<FONT POINT-SIZE="20">開発用Docker / VM40000</FONT>>;
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
    label = <<FONT POINT-SIZE="20">MagicMirror表示 / VM5000</FONT>>;
    margin = "0.139,0.139";
    width = 2.5;
    height = 1.389;
    fillcolor = "#64748b";
    fontcolor = "#f8fafc";
    color = "#475569";
  ];
  "lan" [
    likec4_id = "homeSite.lan";
    likec4_level = 1;
    label = <<FONT POINT-SIZE="20">LAN / VLAN・経路</FONT>>;
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
    "lan";
    subgraph "cluster_b550m" {
      likec4_id = "homeSite.b550m";
      likec4_level = 1;
      likec4_depth = 2;
      fillcolor = "#29472f";
      color = "#1c3021";
      style = "filled";
      margin = 50;
      label = <<FONT POINT-SIZE="11" COLOR="#c2f0c2b3"><B>PVE-B550M</B></FONT>>;
      "bluez";
      "nas2";
      "lb";
      "dev";
      "kiosk";
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
      subgraph "cluster_loockit" {
        likec4_id = "homeSite.b550m.loockit";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>LOOCKIT 02 / CT12903</B></FONT>>;
        "app";
      }
      subgraph "cluster_tuner" {
        likec4_id = "homeSite.b550m.tuner";
        likec4_level = 2;
        likec4_depth = 1;
        fillcolor = "#3e4651";
        color = "#2d333d";
        style = "filled";
        margin = 32;
        label = <<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>MIRAKURUN STG / CT12904・PX-S1UD</B></FONT>>;
        "app_1";
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
  "talos_3" -> "talos_2" [
    likec4_id = "1wfcumf";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "nas2" -> "lan" [
    likec4_id = "1bf2o1s";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "lb" -> "lan" [
    likec4_id = "14qmuu8";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "dev" -> "lan" [
    likec4_id = "1itph6h";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "kiosk" -> "lan" [
    likec4_id = "45w5ej";
    style = "dotted";
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 40</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos_3" -> "lan" [
    likec4_id = "dvw5ui";
    style = "dotted";
    weight = 3;
    label = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">L2広告 / Service IP .200-.226</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "app" -> "lan" [
    likec4_id = "wvav1z";
    style = "dotted";
    ltail = "cluster_loockit";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos" -> "lan" [
    likec4_id = "1abwjv3";
    style = "dotted";
    ltail = "cluster_cp2";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos_1" -> "lan" [
    likec4_id = "1gxilri";
    style = "dotted";
    ltail = "cluster_cp3";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "talos_2" -> "lan" [
    likec4_id = "1yvoru2";
    style = "dotted";
    ltail = "cluster_worker2";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "app_1" -> "lan" [
    likec4_id = "jxe3cm";
    style = "dotted";
    ltail = "cluster_tuner";
    xlabel = <<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">vmbr0 / tag 20</FONT></TD></TR></TABLE>>;
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
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>PVE-X570 / PROXMOX</B></FONT>>,
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
                label=<<FONT POINT-SIZE="11" COLOR="#cbd5e1b3"><B>PVE-B550M / PROXMOX</B></FONT>>,
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
            label=<<FONT POINT-SIZE="20">UniFi OS / VM13201</FONT>>,
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
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1管理 / ゲストtag20・30 / 配線ポート未確定</FONT></TD></TR></TABLE>>,
        likec4_id="18wjci8",
        style=dotted];
    ethernet -> bridge_1 [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">native1管理 / ゲストtag20・40 / 配線ポート未確定</FONT></TD></TR></TABLE>>,
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
        weight=4];
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
        weight=4];
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
        weight=4];
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
        likec4_id="premises.management.argo",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    argo -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">manifest同期 / Kubernetes API</FONT></TD></TR></TABLE>>,
        likec4_id="1nm8rvo",
        minlen=1,
        style=dashed];
    runner [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">ARC / 共用のrunner制御基盤</FONT>>,
        likec4_id="premises.management.runner",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    runner -> api [arrowhead=normal,
        color="#6366f1",
        fontcolor="#cbd0fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">runner Podの作成・削除</FONT></TD></TR></TABLE>>,
        likec4_id=cnx9gv,
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
    cloudflared [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">cloudflared / 自宅connector</FONT>>,
        likec4_id="premises.home.platform.cloudflared",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    worker -> cloudflared [arrowhead=normal,
        color="#3b82f6",
        fontcolor="#eff5fd",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">connector Pod</FONT></TD></TR></TABLE>>,
        likec4_id="1jzgihh",
        style=solid,
        weight=5];
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
        style=dashed];
    "edge" -> server [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">private CIDR routes / WARP policy</FONT></TD></TR></TABLE>>,
        likec4_id="1rt66xm",
        style=dotted,
        weight=2];
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
        likec4_id="premises.hardware.loockit_a",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    proxy -> loockit_a [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">readyz / leaderのみ</FONT></TD></TR></TABLE>>,
        likec4_id="13wrurf",
        style=dashed,
        weight=3];
    loockit_b [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Loockit 02 / CT12903</FONT>>,
        likec4_id="premises.hardware.loockit_b",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    proxy -> loockit_b [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">readyz / leaderのみ</FONT></TD></TR></TABLE>>,
        likec4_id="13wrurc",
        style=dashed,
        weight=3];
    ble_a [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">x570 BlueZ / Bluetooth</FONT>>,
        likec4_id="premises.hardware.ble_a",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    loockit_a -> ble_a [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">read-only D-Bus / org.bluez</FONT></TD></TR></TABLE>>,
        likec4_id=y8dw3c,
        minlen=1,
        style=dashed,
        weight=5];
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
        likec4_id="4292et",
        style=dashed,
        weight=2];
    ble_b [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">b550m BlueZ / Bluetooth</FONT>>,
        likec4_id="premises.hardware.ble_b",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    loockit_b -> ble_b [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">read-only D-Bus / org.bluez</FONT></TD></TR></TABLE>>,
        likec4_id="1jw288o",
        minlen=1,
        style=dashed,
        weight=5];
    loockit_b -> api [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Lease leader election</FONT></TD></TR></TABLE>>,
        likec4_id=oo52ae,
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
        nodesep=0.625,
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
    subgraph cluster_tnlastation {
        graph [color="#1b3d88",
            fillcolor="#194b9e",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>TNLASTATION / 共通モデル</B></FONT>>,
            likec4_depth=1,
            likec4_id="premises.home.recording.tnlastation",
            likec4_level=0,
            margin=40,
            style=filled
        ];
        resources [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            height=1.389,
            label=<<FONT POINT-SIZE="20">リソース定義</FONT>>,
            likec4_id="premises.home.recording.tnlastation.resources",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        gateway [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home.recording.tnlastation",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Gateway</FONT>>,
            likec4_id="premises.home.recording.tnlastation.gateway",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        frontend [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home.recording.tnlastation",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Frontend</FONT>>,
            likec4_id="premises.home.recording.tnlastation.frontend",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        backend [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home.recording.tnlastation",
            height=1.389,
            label=<<FONT POINT-SIZE="20">Backend / API・録画制御</FONT>>,
            likec4_id="premises.home.recording.tnlastation.backend",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        encode [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home.recording.tnlastation",
            height=1.389,
            label=<<FONT POINT-SIZE="20">ffmpeg encode worker</FONT>>,
            likec4_id="premises.home.recording.tnlastation.encode",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        streaming [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home.recording.tnlastation",
            height=1.389,
            label=<<FONT POINT-SIZE="20">ffmpeg streaming worker</FONT>>,
            likec4_id="premises.home.recording.tnlastation.streaming",
            likec4_level=1,
            margin="0.139,0.139",
            width=2.5];
        mediamtx [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group="premises.home.recording.tnlastation",
            height=1.389,
            label=<<FONT POINT-SIZE="20">MediaMTX / HLS配信</FONT>>,
            likec4_id="premises.home.recording.tnlastation.mediamtx",
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
    epgstation [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">EPGStation</FONT>>,
        likec4_id="premises.home.recording.epgstation",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    "edge" -> epgstation [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">epgstation / 8888 / Access</FONT></TD></TR></TABLE>>,
        likec4_id="1pipgjc",
        style=dashed,
        weight=2];
    "edge" -> gateway [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="1kkbo5n",
        style=dashed];
    mirakurun [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun Service / 本番LXCへの中継</FONT>>,
        likec4_id="premises.home.recording.mirakurun",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    epgstation -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id="12e7e0y",
        style=dashed,
        weight=5];
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
    gateway -> frontend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">Web</FONT></TD></TR></TABLE>>,
        likec4_id="179whfg",
        minlen=1,
        style=dashed,
        weight=6];
    gateway -> backend [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">API</FONT></TD></TR></TABLE>>,
        likec4_id="1ngsxrq",
        style=dashed,
        weight=6];
    gateway -> mediamtx [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">HLS</FONT></TD></TR></TABLE>>,
        likec4_id="9nm3vb",
        style=dashed,
        weight=6];
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
    backend -> mirakurun [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tuner API</FONT></TD></TR></TABLE>>,
        likec4_id=wrafbh,
        style=dashed,
        weight=4];
    mirakurun_staging [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun Service / STG</FONT>>,
        likec4_id="premises.home.recording.mirakurun_staging",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    backend -> mirakurun_staging [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">STG環境のチューナーAPI</FONT></TD></TR></TABLE>>,
        likec4_id="1k7p1v7",
        style=dashed,
        weight=4];
    backend -> databases [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="1khz12f",
        style=dashed];
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
    tuner_prod [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun本番 / CT12901・PT3</FONT>>,
        likec4_id="premises.hardware.tuner_prod",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    mirakurun -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EndpointSlice / 外部LXC</FONT></TD></TR></TABLE>>,
        likec4_id="14dnauu",
        style=dashed];
    tuner_stg [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Mirakurun STG /</FONT>>,
        likec4_id="premises.hardware.tuner_stg",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    mirakurun_staging -> tuner_stg [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">EndpointSlice / 外部LXC</FONT></TD></TR></TABLE>>,
        likec4_id=zjh6qp,
        style=dashed];
    nas02 [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">TrueNAS VM69002 / nas-02</FONT>>,
        likec4_id="premises.data.nas.nas02",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    databases -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">DB用NFS PVC</FONT></TD></TR></TABLE>>,
        likec4_id="15gqzio",
        minlen=1,
        style=dashed,
        weight=4];
    tuner_stg -> tuner_prod [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">BS/CS TCP fallback</FONT></TD></TR></TABLE>>,
        likec4_id="1yul8eb",
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
        likec4_id="premises.data.databases.mariadb",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    web -> mariadb [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">MYSQL_HOST / MariaDB</FONT></TD></TR></TABLE>>,
        likec4_id=zdotw5,
        minlen=1,
        style=dashed];
    nas02 [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">TrueNAS VM69002 / nas-02</FONT>>,
        likec4_id="premises.data.nas.nas02",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    web -> nas02 [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">html・data / NFS</FONT></TD></TR></TABLE>>,
        likec4_id="1o5tgb5",
        minlen=1,
        style=dashed];
}
`;case`coupon`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=coupon,
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
    "edge" [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Cloudflare</FONT>>,
        likec4_id="external.edge",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    web [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Web / :80</FONT>>,
        likec4_id="premises.home.apps.coupon_manager.web",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    "edge" -> web [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">coupon-manager / 80 / Access</FONT></TD></TR></TABLE>>,
        likec4_id="1rii5o5",
        minlen=1,
        style=dashed];
    resources [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">リソース定義</FONT>>,
        likec4_id="premises.home.apps.coupon_manager.resources",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    nas02 [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">TrueNAS VM69002 / nas-02</FONT>>,
        likec4_id="premises.data.nas.nas02",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    resources -> nas02 [style=invis];
    api [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">API / :8080</FONT>>,
        likec4_id="premises.home.apps.coupon_manager.api",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    web -> api [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">内部API</FONT></TD></TR></TABLE>>,
        likec4_id="15v9co2",
        style=dashed,
        weight=6];
    postgres [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=1.389,
        label=<<FONT POINT-SIZE="20">PostgreSQL / 本番・STG</FONT>>,
        likec4_id="premises.data.databases.postgres",
        likec4_level=0,
        margin="0.139,0",
        penwidth=2,
        shape=cylinder,
        width=2.5];
    api -> postgres [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">PostgreSQL</FONT></TD></TR></TABLE>>,
        likec4_id="1se5r3s",
        minlen=1,
        style=dashed];
    ai [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=1.389,
        label=<<FONT POINT-SIZE="20">Gemini API / OpenAI互換</FONT>>,
        likec4_id="external.ai",
        likec4_level=0,
        margin="0.139,0.139",
        width=2.5];
    api -> ai [arrowhead=normal,
        color="#15803d",
        fontcolor="#bbfcd3",
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">AI API</FONT></TD></TR></TABLE>>,
        likec4_id=eadjli,
        minlen=1,
        style=dashed];
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
                label=<<FONT POINT-SIZE="20">録画・配信 / EPGStation・TNLaStation</FONT>>,
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
                label=<<FONT POINT-SIZE="20">pve-x570 / Proxmox</FONT>>,
                likec4_id="premises.hardware.x570",
                likec4_level=2,
                margin="0.139,0.139",
                width=2.5];
            b550m [color="#475569",
                fillcolor="#64748b",
                fontcolor="#f8fafc",
                height=1.389,
                label=<<FONT POINT-SIZE="20">pve-b550m / Proxmox</FONT>>,
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
        label=<<FONT POINT-SIZE="20">pve-x570 / Proxmox</FONT>>,
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
        label=<<FONT POINT-SIZE="20">pve-b550m / Proxmox</FONT>>,
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
<svg width="2653pt" height="1710pt"
 viewBox="0.00 0.00 2653.00 1710.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1695.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-697 8,-1672 2082.8,-1672 2082.8,-697 8,-697"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1659.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="48,-1054 48,-1575 882.1,-1575 882.1,-1054 48,-1054"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-1562.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_data</title>
<polygon fill="#454545" stroke="#313131" points="1177.13,-860 1177.13,-1221 1533.86,-1221 1533.86,-860 1177.13,-860"/>
<text xml:space="preserve" text-anchor="start" x="1185.13" y="-1208.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="1182.09,-8 1182.09,-689 1528.89,-689 1528.89,-8 1182.09,-8"/>
<text xml:space="preserve" text-anchor="start" x="1190.09" y="-676.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_consumers</title>
<polygon fill="#3e4651" stroke="#2d333d" points="2370.85,-1239 2370.85,-1424 2614.85,-1424 2614.85,-1239 2370.85,-1239"/>
<text xml:space="preserve" text-anchor="start" x="2378.85" y="-1411.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">基盤の利用側 / 別リポジトリ</text>
</g>
<!-- network -->
<g id="node1" class="node">
<title>network</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="268,-1354 88,-1354 88,-1254 268,-1254 268,-1354"/>
<text xml:space="preserve" text-anchor="start" x="111.32" y="-1296" font-family="Arial" font-size="20.00" fill="#f8fafc">ネットワーク機器</text>
</g>
<!-- x570 -->
<g id="node2" class="node">
<title>x570</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="833.21,-1194 635.35,-1194 635.35,-1094 833.21,-1094 833.21,-1194"/>
<text xml:space="preserve" text-anchor="start" x="645.35" y="-1136" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;x570 / Proxmox</text>
</g>
<!-- b550m -->
<g id="node3" class="node">
<title>b550m</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="842.1,-1354 626.45,-1354 626.45,-1254 842.1,-1254 842.1,-1354"/>
<text xml:space="preserve" text-anchor="start" x="636.46" y="-1296" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;b550m / Proxmox</text>
</g>
<!-- rpi_workers -->
<g id="node4" class="node">
<title>rpi_workers</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="824.28,-1514 644.28,-1514 644.28,-1414 824.28,-1414 824.28,-1514"/>
<text xml:space="preserve" text-anchor="start" x="671.49" y="-1456" font-family="Arial" font-size="20.00" fill="#f8fafc">RPi worker ×2</text>
</g>
<!-- nas -->
<g id="node5" class="node">
<title>nas</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1493.86,-1150.91C1493.86,-1155.93 1431.84,-1160 1355.49,-1160 1279.15,-1160 1217.13,-1155.93 1217.13,-1150.91 1217.13,-1150.91 1217.13,-1069.09 1217.13,-1069.09 1217.13,-1064.07 1279.15,-1060 1355.49,-1060 1431.84,-1060 1493.86,-1064.07 1493.86,-1069.09 1493.86,-1069.09 1493.86,-1150.91 1493.86,-1150.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1493.86,-1150.91C1493.86,-1145.9 1431.84,-1141.82 1355.49,-1141.82 1279.15,-1141.82 1217.13,-1145.9 1217.13,-1150.91"/>
<text xml:space="preserve" text-anchor="start" x="1227.14" y="-1102" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM ×2 / ZFS・NFS</text>
</g>
<!-- pbs -->
<g id="node6" class="node">
<title>pbs</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1473.32,-990.91C1473.32,-995.93 1420.51,-1000 1355.49,-1000 1290.48,-1000 1237.67,-995.93 1237.67,-990.91 1237.67,-990.91 1237.67,-909.09 1237.67,-909.09 1237.67,-904.07 1290.48,-900 1355.49,-900 1420.51,-900 1473.32,-904.07 1473.32,-909.09 1473.32,-909.09 1473.32,-990.91 1473.32,-990.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1473.32,-990.91C1473.32,-985.9 1420.51,-981.82 1355.49,-981.82 1290.48,-981.82 1237.67,-985.9 1237.67,-990.91"/>
<text xml:space="preserve" text-anchor="start" x="1247.68" y="-942" font-family="Arial" font-size="20.00" fill="#ffe0c2">Proxmox Backup Server</text>
</g>
<!-- home -->
<g id="node7" class="node">
<title>home</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2042.8,-1371 1862.8,-1371 1862.8,-1271 2042.8,-1271 2042.8,-1371"/>
<text xml:space="preserve" text-anchor="start" x="1876.1" y="-1313" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
</g>
<!-- edge -->
<g id="node8" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1445.49,-148 1265.49,-148 1265.49,-48 1445.49,-48 1445.49,-148"/>
<text xml:space="preserve" text-anchor="start" x="1309.91" y="-90" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- grafana -->
<g id="node9" class="node">
<title>grafana</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1459.99,-308 1251,-308 1251,-208 1459.99,-208 1459.99,-308"/>
<text xml:space="preserve" text-anchor="start" x="1261.01" y="-250" font-family="Arial" font-size="20.00" fill="#f8fafc">Grafana Cloud / PDC</text>
</g>
<!-- bws -->
<g id="node10" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1488.89,-468 1222.09,-468 1222.09,-368 1488.89,-368 1488.89,-468"/>
<text xml:space="preserve" text-anchor="start" x="1232.1" y="-410" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- idrive -->
<g id="node11" class="node">
<title>idrive</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1445.49,-618.91C1445.49,-623.93 1405.15,-628 1355.49,-628 1305.83,-628 1265.49,-623.93 1265.49,-618.91 1265.49,-618.91 1265.49,-537.09 1265.49,-537.09 1265.49,-532.07 1305.83,-528 1355.49,-528 1405.15,-528 1445.49,-532.07 1445.49,-537.09 1445.49,-537.09 1445.49,-618.91 1445.49,-618.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1445.49,-618.91C1445.49,-613.9 1405.15,-609.82 1355.49,-609.82 1305.83,-609.82 1265.49,-613.9 1265.49,-618.91"/>
<text xml:space="preserve" text-anchor="start" x="1294.91" y="-570" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2 / S3</text>
</g>
<!-- reventer -->
<g id="node12" class="node">
<title>reventer</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2582.85,-1371 2402.85,-1371 2402.85,-1271 2582.85,-1271 2582.85,-1371"/>
<text xml:space="preserve" text-anchor="start" x="2447.83" y="-1313" font-family="Arial" font-size="20.00" fill="#eff6ff">Re:Venter</text>
</g>
<!-- user -->
<g id="node13" class="node">
<title>user</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="824.28,-132 644.28,-132 644.28,-32 824.28,-32 824.28,-132"/>
<text xml:space="preserve" text-anchor="start" x="709.27" y="-74" font-family="Arial" font-size="20.00" fill="#f8fafc">利用者</text>
</g>
<!-- operator -->
<g id="node14" class="node">
<title>operator</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="824.28,-300 644.28,-300 644.28,-200 824.28,-200 824.28,-300"/>
<text xml:space="preserve" text-anchor="start" x="709.27" y="-242" font-family="Arial" font-size="20.00" fill="#f8fafc">管理者</text>
</g>
<!-- network&#45;&gt;x570 -->
<g id="edge4" class="edge">
<title>network&#45;&gt;x570</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M267.67,-1276.74C279.54,-1273.16 291.56,-1269.57 303,-1266.2 412.75,-1233.89 538.68,-1198.3 625.82,-1173.9"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="626.29,-1176.5 632.8,-1171.95 624.87,-1171.44 626.29,-1176.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="303,-1266.2 303,-1289 591.45,-1289 591.45,-1266.2 303,-1266.2"/>
<text xml:space="preserve" text-anchor="start" x="306" y="-1272" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1管理 / ゲストtag20・30 / 配線ポート未確定</text>
</g>
<!-- network&#45;&gt;b550m -->
<g id="edge5" class="edge">
<title>network&#45;&gt;b550m</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M267.75,-1304C362.31,-1304 512.44,-1304 616.54,-1304"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="616.25,-1306.63 623.75,-1304 616.25,-1301.38 616.25,-1306.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="303,-1304 303,-1326.8 591.45,-1326.8 591.45,-1304 303,-1304"/>
<text xml:space="preserve" text-anchor="start" x="306" y="-1309.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1管理 / ゲストtag20・40 / 配線ポート未確定</text>
</g>
<!-- network&#45;&gt;rpi_workers -->
<g id="edge6" class="edge">
<title>network&#45;&gt;rpi_workers</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M267.91,-1331.82C279.69,-1335.34 291.62,-1338.81 303,-1342 430.37,-1377.65 464.71,-1377.38 591.45,-1415.2 605.44,-1419.37 620.11,-1424.06 634.48,-1428.83"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="633.55,-1431.29 641.5,-1431.19 635.22,-1426.31 633.55,-1431.29"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="369.53,-1415.2 369.53,-1438 524.92,-1438 524.92,-1415.2 369.53,-1415.2"/>
<text xml:space="preserve" text-anchor="start" x="372.53" y="-1421" font-family="Arial" font-size="14.00" fill="#c9c9c9">VLAN10 / arm64 worker</text>
</g>
<!-- network&#45;&gt;home -->
<g id="edge7" class="edge">
<title>network&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M208.92,-1353.68C231.05,-1386.4 264.04,-1427.72 303,-1453 428.28,-1534.28 478.52,-1523.59 626.45,-1544 1027.01,-1599.27 1133.44,-1534.29 1533.86,-1478 1665.31,-1459.52 1707.59,-1481.32 1827.8,-1425 1852.62,-1413.37 1876.53,-1395.5 1896.62,-1377.84"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1898.34,-1379.82 1902.16,-1372.86 1894.83,-1375.92 1898.34,-1379.82"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="979.99,-1565.01 979.99,-1587.81 1077.79,-1587.81 1077.79,-1565.01 979.99,-1565.01"/>
<text xml:space="preserve" text-anchor="start" x="982.99" y="-1570.81" font-family="Arial" font-size="14.00" fill="#bbfcd3">LAN / 内部DNS</text>
</g>
<!-- x570&#45;&gt;nas -->
<g id="edge8" class="edge">
<title>x570&#45;&gt;nas</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M833.05,-1138.63C933.29,-1133.13 1090.44,-1124.5 1206.04,-1118.15"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1206.02,-1120.78 1213.36,-1117.75 1205.73,-1115.54 1206.02,-1120.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="890.1,-1134.88 890.1,-1157.68 1167.68,-1157.68 1167.68,-1134.88 890.1,-1134.88"/>
<text xml:space="preserve" text-anchor="start" x="893.1" y="-1140.68" font-family="Arial" font-size="14.00" fill="#eff5fd">TrueNAS VM69001 / USB disk passthrough</text>
</g>
<!-- x570&#45;&gt;pbs -->
<g id="edge9" class="edge">
<title>x570&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M757.74,-1094.06C782.46,-1045.91 827.22,-975.93 890.1,-945.2 994.88,-894 1129.49,-902.18 1226.78,-919"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1226.15,-921.55 1233.99,-920.28 1227.07,-916.38 1226.15,-921.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="990.88,-945.2 990.88,-968 1066.91,-968 1066.91,-945.2 990.88,-945.2"/>
<text xml:space="preserve" text-anchor="start" x="993.88" y="-951" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- x570&#45;&gt;home -->
<g id="edge10" class="edge">
<title>x570&#45;&gt;home</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M741.12,-1094.12C753.24,-1016.05 789.05,-867.18 890.1,-802 942.84,-767.98 1510.63,-810.99 1533.86,-822.2 1729.85,-916.81 1867.53,-1151.47 1923.68,-1261.84"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1921.3,-1262.95 1927.02,-1268.46 1925.99,-1260.58 1921.3,-1262.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1227.98,-822.2 1227.98,-845 1483,-845 1483,-822.2 1227.98,-822.2"/>
<text xml:space="preserve" text-anchor="start" x="1230.98" y="-828" font-family="Arial" font-size="14.00" fill="#eff5fd">Talos VM13001・13004 / CP1・worker1</text>
</g>
<!-- b550m&#45;&gt;nas -->
<g id="edge11" class="edge">
<title>b550m&#45;&gt;nas</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M841.97,-1265.11C858.03,-1259.58 874.46,-1254.11 890.1,-1249.2 1012.17,-1210.9 1056.32,-1235.96 1167.68,-1173 1172.73,-1170.15 1172.12,-1166.92 1177.13,-1164 1186.49,-1158.53 1196.47,-1153.57 1206.72,-1149.07"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1207.53,-1151.58 1213.42,-1146.25 1205.49,-1146.74 1207.53,-1151.58"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="890.1,-1249.2 890.1,-1272 1167.68,-1272 1167.68,-1249.2 890.1,-1249.2"/>
<text xml:space="preserve" text-anchor="start" x="893.1" y="-1255" font-family="Arial" font-size="14.00" fill="#eff5fd">TrueNAS VM69002 / USB disk passthrough</text>
</g>
<!-- b550m&#45;&gt;pbs -->
<g id="edge12" class="edge">
<title>b550m&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M842.03,-1263.23C857.8,-1252.75 872.09,-1239.82 882.1,-1224 898.87,-1197.52 870.54,-1107.68 890.1,-1083.2 932.15,-1030.58 1104.22,-991.56 1226.62,-969.78"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1226.91,-972.4 1233.84,-968.51 1226,-967.23 1226.91,-972.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="990.88,-1083.2 990.88,-1106 1066.91,-1106 1066.91,-1083.2 990.88,-1083.2"/>
<text xml:space="preserve" text-anchor="start" x="993.88" y="-1089" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- b550m&#45;&gt;home -->
<g id="edge13" class="edge">
<title>b550m&#45;&gt;home</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M841.91,-1305.49C1074.88,-1308.75 1626.52,-1316.45 1852.57,-1319.61"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1852.52,-1322.24 1860.06,-1319.72 1852.6,-1316.99 1852.52,-1322.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1202.68,-1315.15 1202.68,-1337.95 1508.3,-1337.95 1508.3,-1315.15 1202.68,-1315.15"/>
<text xml:space="preserve" text-anchor="start" x="1205.68" y="-1320.95" font-family="Arial" font-size="14.00" fill="#eff5fd">Talos VM13002・13003・13005 / CP2・worker1</text>
</g>
<!-- rpi_workers&#45;&gt;home -->
<g id="edge14" class="edge">
<title>rpi_workers&#45;&gt;home</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M824.24,-1453.54C1045.68,-1427.51 1620.45,-1359.95 1852.48,-1332.67"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1852.79,-1335.28 1859.93,-1331.8 1852.18,-1330.07 1852.79,-1335.28"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1265.34,-1411.37 1265.34,-1434.17 1445.64,-1434.17 1445.64,-1411.37 1265.34,-1411.37"/>
<text xml:space="preserve" text-anchor="start" x="1268.34" y="-1417.17" font-family="Arial" font-size="14.00" fill="#eff5fd">Talos worker03・04 / arm64</text>
</g>
<!-- rpi_workers&#45;&gt;home -->
<g id="edge15" class="edge">
<title>rpi_workers&#45;&gt;home</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="1,5" d="M882.1,-1472.16C1042.98,-1478.57 1308.21,-1481.68 1533.86,-1449 1646.19,-1432.73 1769.94,-1391.77 1853.41,-1360.53"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1854.2,-1363.04 1860.3,-1357.94 1852.35,-1358.13 1854.2,-1363.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1296.06,-1443.23 1296.06,-1466.03 1376.75,-1466.03 1376.75,-1443.23 1296.06,-1443.23"/>
<text xml:space="preserve" text-anchor="start" x="1299.06" y="-1449.03" font-family="Arial" font-size="14.00" fill="#ffe0c2">exporter収集</text>
</g>
<!-- nas&#45;&gt;home -->
<g id="edge16" class="edge">
<title>nas&#45;&gt;home</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1494.74,-1151.15C1508,-1155.38 1521.21,-1159.7 1533.86,-1164 1644.27,-1201.51 1769.26,-1249.15 1853.55,-1282.07"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1852.36,-1284.42 1860.3,-1284.71 1854.27,-1279.53 1852.36,-1284.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1621.87,-1270.15 1621.87,-1292.95 1749.23,-1292.95 1749.23,-1270.15 1621.87,-1270.15"/>
<text xml:space="preserve" text-anchor="start" x="1624.87" y="-1275.95" font-family="Arial" font-size="14.00" fill="#c9c9c9">NFSストレージを提供</text>
</g>
<!-- pbs&#45;&gt;idrive -->
<g id="edge17" class="edge">
<title>pbs&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1236.68,-945.84C1155.24,-935.98 1052.71,-908.21 999.78,-833.4 921.68,-723.01 1123.82,-642.73 1254.49,-604"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1255.18,-606.53 1261.64,-601.91 1253.71,-601.5 1255.18,-606.53"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="945.35,-810.6 945.35,-833.4 1112.44,-833.4 1112.44,-810.6 945.35,-810.6"/>
<text xml:space="preserve" text-anchor="start" x="948.35" y="-816.4" font-family="Arial" font-size="14.00" fill="#ffe0c2">S3 datastore / VM backup</text>
</g>
<!-- home&#45;&gt;grafana -->
<g id="edge21" class="edge">
<title>home&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1950.77,-1271.21C1946.55,-1118.29 1925.83,-659.45 1827.8,-555.2 1739,-460.77 1627.33,-589.7 1543.3,-491 1521.22,-465.06 1553.21,-366.03 1533.86,-338 1518.13,-315.22 1494.3,-298.83 1469.16,-287.07"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1470.55,-284.81 1462.62,-284.17 1468.42,-289.61 1470.55,-284.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1638.6,-555.2 1638.6,-578 1732.5,-578 1732.5,-555.2 1638.6,-555.2"/>
<text xml:space="preserve" text-anchor="start" x="1641.6" y="-561" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きPDC接続</text>
</g>
<!-- home&#45;&gt;reventer -->
<g id="edge22" class="edge">
<title>home&#45;&gt;reventer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M2042.65,-1321C2138.93,-1321 2292.21,-1321 2392.44,-1321"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2392.35,-1323.63 2399.85,-1321 2392.35,-1318.38 2392.35,-1323.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2090.8,-1321 2090.8,-1343.8 2362.85,-1343.8 2362.85,-1321 2090.8,-1321"/>
<text xml:space="preserve" text-anchor="start" x="2093.8" y="-1326.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">共有ArgoCD・ARCを提供 / 専用構成は利用側へ</text>
</g>
<!-- edge&#45;&gt;home -->
<g id="edge18" class="edge">
<title>edge&#45;&gt;home</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1445.2,-100.48C1553.65,-108.68 1734.24,-140.06 1827.8,-255.2 1891.62,-333.75 1936.45,-1047.07 1948.53,-1260.77"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1945.91,-1260.8 1948.95,-1268.14 1951.15,-1260.5 1945.91,-1260.8"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1543.3,-255.2 1543.3,-278 1827.8,-278 1827.8,-255.2 1543.3,-255.2"/>
<text xml:space="preserve" text-anchor="start" x="1546.3" y="-261" font-family="Arial" font-size="14.00" fill="#bbfcd3">認証済みHTTP / Access・mTLS → 内部Service</text>
</g>
<!-- grafana&#45;&gt;home -->
<g id="edge19" class="edge">
<title>grafana&#45;&gt;home</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1459.89,-271.8C1569.42,-292.22 1738.58,-341.47 1827.8,-457.2 1925.19,-583.53 1946.26,-1086.47 1950.67,-1260.99"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1948.04,-1260.81 1950.85,-1268.24 1953.29,-1260.68 1948.04,-1260.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1638.6,-457.2 1638.6,-480 1732.5,-480 1732.5,-457.2 1638.6,-457.2"/>
<text xml:space="preserve" text-anchor="start" x="1641.6" y="-463" font-family="Arial" font-size="14.00" fill="#d4f2ff">PDC経由の検索</text>
</g>
<!-- bws&#45;&gt;home -->
<g id="edge20" class="edge">
<title>bws&#45;&gt;home</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M1488.83,-458.19C1506.27,-468.62 1522.13,-481.68 1533.86,-498 1558.62,-532.46 1520.34,-557.32 1543.3,-593 1622.44,-715.95 1741.56,-640.12 1827.8,-758.2 1886.41,-838.46 1928.73,-1133.09 1944.75,-1261.03"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1942.13,-1261.3 1945.66,-1268.41 1947.34,-1260.65 1942.13,-1261.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1650.65,-758.2 1650.65,-781 1720.45,-781 1720.45,-758.2 1650.65,-758.2"/>
<text xml:space="preserve" text-anchor="start" x="1653.65" y="-764" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- user&#45;&gt;edge -->
<g id="edge1" class="edge">
<title>user&#45;&gt;edge</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M824.07,-75.41C845.66,-74.08 868.7,-72.88 890.1,-72.2 1013.41,-68.3 1044.61,-63.74 1167.68,-72.2 1196.34,-74.17 1227.29,-77.82 1255.6,-81.77"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1255.11,-84.35 1262.91,-82.8 1255.85,-79.15 1255.11,-84.35"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="962.11,-72.2 962.11,-95 1095.68,-95 1095.68,-72.2 962.11,-72.2"/>
<text xml:space="preserve" text-anchor="start" x="965.11" y="-78" font-family="Arial" font-size="14.00" fill="#bbfcd3">HTTPS / 利用時の認証</text>
</g>
<!-- operator&#45;&gt;edge -->
<g id="edge2" class="edge">
<title>operator&#45;&gt;edge</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M824,-228.22C938.3,-200.17 1136.4,-151.54 1255.48,-122.3"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1256.09,-124.86 1262.75,-120.52 1254.84,-119.76 1256.09,-124.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="962.11,-209.23 962.11,-232.03 1095.68,-232.03 1095.68,-209.23 962.11,-209.23"/>
<text xml:space="preserve" text-anchor="start" x="965.11" y="-215.03" font-family="Arial" font-size="14.00" fill="#cbd0fd">HTTPS / 管理時の認証</text>
</g>
<!-- operator&#45;&gt;grafana -->
<g id="edge3" class="edge">
<title>operator&#45;&gt;grafana</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M824,-251.15C933.75,-252.56 1120.76,-254.98 1240.9,-256.53"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1240.67,-259.15 1248.2,-256.63 1240.74,-253.9 1240.67,-259.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1014.22,-255.41 1014.22,-278.21 1043.56,-278.21 1043.56,-255.41 1014.22,-255.41"/>
<text xml:space="preserve" text-anchor="start" x="1017.22" y="-261.21" font-family="Arial" font-size="14.00" fill="#d4f2ff">照会</text>
</g>
</g>
</svg>
`;case`home_apps`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1837pt" height="1551pt"
 viewBox="0.00 0.00 1837.00 1551.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1536.3)">
<g id="clust1" class="cluster">
<title>cluster_home</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-226.81 8,-1217.81 1265.56,-1217.81 1265.56,-226.81 8,-226.81"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1204.91" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_apps</title>
<polygon fill="#3e4651" stroke="#2d333d" points="886.63,-266.81 886.63,-1067.81 1225.56,-1067.81 1225.56,-266.81 886.63,-266.81"/>
<text xml:space="preserve" text-anchor="start" x="894.63" y="-1054.91" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">生活サービス / LOOCKIT・COUPON・WOL</text>
</g>
<!-- loockit -->
<g id="node1" class="node">
<title>loockit</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1183.37,-856.81 928.82,-856.81 928.82,-756.8 1183.37,-756.8 1183.37,-856.81"/>
<text xml:space="preserve" text-anchor="start" x="938.83" y="-798.81" font-family="Arial" font-size="20.00" fill="#eff6ff">Loockit / BLEスマートロック</text>
</g>
<!-- coupon_manager -->
<g id="node2" class="node">
<title>coupon_manager</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1146.1,-406.81 966.1,-406.81 966.1,-306.8 1146.1,-306.8 1146.1,-406.81"/>
<text xml:space="preserve" text-anchor="start" x="978.82" y="-348.81" font-family="Arial" font-size="20.00" fill="#eff6ff">Coupon Manager</text>
</g>
<!-- wol -->
<g id="node3" class="node">
<title>wol</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1146.1,-706.81 966.1,-706.81 966.1,-606.8 1146.1,-606.8 1146.1,-706.81"/>
<text xml:space="preserve" text-anchor="start" x="993.3" y="-648.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Wake&#45;on&#45;LAN</text>
</g>
<!-- annict_scraper -->
<g id="node4" class="node">
<title>annict_scraper</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1171.7,-1006.81 940.5,-1006.81 940.5,-906.8 1171.7,-906.8 1171.7,-1006.81"/>
<text xml:space="preserve" text-anchor="start" x="950.51" y="-948.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict scraper / 番組照合</text>
</g>
<!-- magic_mirror -->
<g id="node5" class="node">
<title>magic_mirror</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1185.56,-556.81 926.63,-556.81 926.63,-456.8 1185.56,-456.8 1185.56,-556.81"/>
<text xml:space="preserve" text-anchor="start" x="936.64" y="-498.81" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror / ダッシュボード</text>
</g>
<!-- platform -->
<g id="node6" class="node">
<title>platform</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="233.61,-1006.81 48,-1006.81 48,-906.8 233.61,-906.8 233.61,-1006.81"/>
<text xml:space="preserve" text-anchor="start" x="58.01" y="-948.81" font-family="Arial" font-size="20.00" fill="#f8fafc">クラスタ基盤 / Talos</text>
</g>
<!-- nextcloud -->
<g id="node7" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="709.77,-1156.81 529.77,-1156.81 529.77,-1056.8 709.77,-1056.8 709.77,-1156.81"/>
<text xml:space="preserve" text-anchor="start" x="575.3" y="-1098.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node8" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="795.96,-1006.81 443.58,-1006.81 443.58,-906.8 795.96,-906.8 795.96,-1006.81"/>
<text xml:space="preserve" text-anchor="start" x="453.58" y="-948.81" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信 / EPGStation・TNLaStation</text>
</g>
<!-- edge -->
<g id="node9" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="230.81,-186.81 50.81,-186.81 50.81,-86.8 230.81,-86.8 230.81,-186.81"/>
<text xml:space="preserve" text-anchor="start" x="95.22" y="-128.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- kiosk -->
<g id="node10" class="node">
<title>kiosk</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="744.8,-186.81 494.73,-186.81 494.73,-86.8 744.8,-86.8 744.8,-186.81"/>
<text xml:space="preserve" text-anchor="start" x="504.74" y="-128.81" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror表示 / VM5000</text>
</g>
<!-- databases -->
<g id="node11" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1762.2,-1453.81 1581.04,-1453.81 1581.04,-1353.8 1762.2,-1353.8 1762.2,-1453.81"/>
<text xml:space="preserve" text-anchor="start" x="1591.05" y="-1395.81" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- nas02 -->
<g id="node12" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1807.25,-1271.72C1807.25,-1276.74 1746.46,-1280.81 1671.62,-1280.81 1596.78,-1280.81 1535.99,-1276.74 1535.99,-1271.72 1535.99,-1271.72 1535.99,-1189.89 1535.99,-1189.89 1535.99,-1184.88 1596.78,-1180.8 1671.62,-1180.8 1746.46,-1180.8 1807.25,-1184.88 1807.25,-1189.89 1807.25,-1189.89 1807.25,-1271.72 1807.25,-1271.72"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1807.25,-1271.72C1807.25,-1266.7 1746.46,-1262.63 1671.62,-1262.63 1596.78,-1262.63 1535.99,-1266.7 1535.99,-1271.72"/>
<text xml:space="preserve" text-anchor="start" x="1546" y="-1222.81" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM69002 / nas&#45;02</text>
</g>
<!-- ai -->
<g id="node13" class="node">
<title>ai</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1791.11,-406.81 1552.12,-406.81 1552.12,-306.8 1791.11,-306.8 1791.11,-406.81"/>
<text xml:space="preserve" text-anchor="start" x="1562.13" y="-348.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Gemini API / OpenAI互換</text>
</g>
<!-- annict -->
<g id="node14" class="node">
<title>annict</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1761.62,-1006.81 1581.62,-1006.81 1581.62,-906.8 1761.62,-906.8 1761.62,-1006.81"/>
<text xml:space="preserve" text-anchor="start" x="1624.93" y="-948.81" font-family="Arial" font-size="20.00" fill="#f8fafc">Annict API</text>
</g>
<!-- coupon_manager&#45;&gt;databases -->
<g id="edge15" class="edge">
<title>coupon_manager&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1145.98,-365.49C1189.48,-374.71 1238.25,-393.53 1265.56,-431.81 1283.64,-457.13 1262.74,-962.63 1273.56,-991.81 1331.98,-1149.27 1486.42,-1278.45 1584.57,-1348.02"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1582.89,-1350.05 1590.53,-1352.21 1585.9,-1345.75 1582.89,-1350.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1348.65,-1287.22 1348.65,-1310.02 1430.91,-1310.02 1430.91,-1287.22 1348.65,-1287.22"/>
<text xml:space="preserve" text-anchor="start" x="1351.65" y="-1293.02" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- coupon_manager&#45;&gt;nas02 -->
<g id="edge17" class="edge">
<title>coupon_manager&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1145.86,-372.8C1186.2,-383.78 1232.25,-401.99 1265.56,-431.81 1446.38,-593.64 1420.2,-695.02 1505.99,-922.01 1523.88,-969.33 1514.87,-985.84 1535.99,-1031.81 1559.16,-1082.23 1594.61,-1133.99 1623.31,-1172.08"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1620.87,-1173.2 1627.5,-1177.58 1625.05,-1170.02 1620.87,-1173.2"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1273.56,-922.01 1273.56,-944.81 1505.99,-944.81 1505.99,-922.01 1273.56,-922.01"/>
<text xml:space="preserve" text-anchor="start" x="1276.56" y="-927.81" font-family="Arial" font-size="14.00" fill="#bbfcd3">images・Data Protection keys / PVC</text>
</g>
<!-- coupon_manager&#45;&gt;ai -->
<g id="edge16" class="edge">
<title>coupon_manager&#45;&gt;ai</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1145.98,-356.81C1250.05,-356.81 1423.26,-356.81 1541.99,-356.81"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1541.7,-359.43 1549.2,-356.81 1541.7,-354.18 1541.7,-359.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1366.94,-356.81 1366.94,-379.61 1412.62,-379.61 1412.62,-356.81 1366.94,-356.81"/>
<text xml:space="preserve" text-anchor="start" x="1369.94" y="-362.61" font-family="Arial" font-size="14.00" fill="#bbfcd3">AI API</text>
</g>
<!-- annict_scraper&#45;&gt;annict -->
<g id="edge18" class="edge">
<title>annict_scraper&#45;&gt;annict</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1171.42,-956.81C1286.44,-956.81 1462.03,-956.81 1571.38,-956.81"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1571.22,-959.43 1578.72,-956.81 1571.22,-954.18 1571.22,-959.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1354.09,-956.81 1354.09,-979.61 1425.46,-979.61 1425.46,-956.81 1354.09,-956.81"/>
<text xml:space="preserve" text-anchor="start" x="1357.09" y="-962.61" font-family="Arial" font-size="14.00" fill="#bbfcd3">Annict API</text>
</g>
<!-- platform&#45;&gt;loockit -->
<g id="edge9" class="edge">
<title>platform&#45;&gt;loockit</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M233.29,-930.99C292.8,-914.96 372.31,-894.98 443.58,-881.81 588.25,-855.06 754,-835.4 876.42,-822.94"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="876.43,-825.58 883.62,-822.21 875.9,-820.35 876.43,-825.58"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="350.18,-839.87 350.18,-862.67 557.69,-862.67 557.69,-839.87 350.18,-839.87"/>
<text xml:space="preserve" text-anchor="start" x="353.18" y="-845.67" font-family="Arial" font-size="14.00" fill="#eff5fd">アプリPod / HAProxy・Web・API</text>
</g>
<!-- platform&#45;&gt;nextcloud -->
<g id="edge7" class="edge">
<title>platform&#45;&gt;nextcloud</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M233.49,-985.64C315.61,-1011.47 435.74,-1049.25 519.97,-1075.74"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="518.97,-1078.17 526.92,-1077.92 520.55,-1073.17 518.97,-1078.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="290.07,-1040.79 290.07,-1063.59 387.12,-1063.59 387.12,-1040.79 290.07,-1040.79"/>
<text xml:space="preserve" text-anchor="start" x="293.07" y="-1046.59" font-family="Arial" font-size="14.00" fill="#eff5fd">Nextcloud Pod</text>
</g>
<!-- platform&#45;&gt;recording -->
<g id="edge8" class="edge">
<title>platform&#45;&gt;recording</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M233.49,-956.81C290.11,-956.81 364.81,-956.81 433.35,-956.81"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="433.32,-959.43 440.82,-956.81 433.32,-954.18 433.32,-959.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="293.97,-956.81 293.97,-979.61 383.22,-979.61 383.22,-956.81 293.97,-956.81"/>
<text xml:space="preserve" text-anchor="start" x="296.97" y="-962.61" font-family="Arial" font-size="14.00" fill="#eff5fd">録画・配信Pod</text>
</g>
<!-- nextcloud&#45;&gt;databases -->
<g id="edge10" class="edge">
<title>nextcloud&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M643.02,-1156.75C680.52,-1233.94 764.39,-1379.5 886.63,-1438.81 1111.39,-1547.84 1416.35,-1482.74 1571.34,-1437.01"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1571.99,-1439.55 1578.43,-1434.89 1570.49,-1434.52 1571.99,-1439.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="972.19,-1498.45 972.19,-1521.25 1140,-1521.25 1140,-1498.45 972.19,-1498.45"/>
<text xml:space="preserve" text-anchor="start" x="975.19" y="-1504.25" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- nextcloud&#45;&gt;nas02 -->
<g id="edge11" class="edge">
<title>nextcloud&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M709.73,-1151.72C745.11,-1167.9 786.69,-1184.84 825.96,-1195.81 1118.22,-1277.43 1203.47,-1280.55 1505.99,-1256.81 1512.24,-1256.32 1518.61,-1255.72 1525.03,-1255.05"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1524.99,-1257.69 1532.15,-1254.26 1524.41,-1252.48 1524.99,-1257.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1000.58,-1269.68 1000.58,-1292.48 1111.61,-1292.48 1111.61,-1269.68 1000.58,-1269.68"/>
<text xml:space="preserve" text-anchor="start" x="1003.58" y="-1275.48" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- recording&#45;&gt;annict_scraper -->
<g id="edge12" class="edge">
<title>recording&#45;&gt;annict_scraper</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M795.86,-956.81C840.82,-956.81 888.27,-956.81 930.12,-956.81"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="930.11,-959.43 937.61,-956.81 930.11,-954.18 930.11,-959.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="825.96,-956.81 825.96,-979.61 878.63,-979.61 878.63,-956.81 825.96,-956.81"/>
<text xml:space="preserve" text-anchor="start" x="828.96" y="-962.61" font-family="Arial" font-size="14.00" fill="#bbfcd3">番組照合</text>
</g>
<!-- recording&#45;&gt;databases -->
<g id="edge13" class="edge">
<title>recording&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M766.17,-1006.64C777.08,-1013.96 787.22,-1022.31 795.96,-1031.81 839.22,-1078.86 837.24,-1264.22 886.63,-1304.81 989.03,-1388.96 1383.48,-1402.48 1570.78,-1404.05"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1570.63,-1406.67 1578.15,-1404.1 1570.67,-1401.42 1570.63,-1406.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1042.6,-1391.01 1042.6,-1413.81 1069.59,-1413.81 1069.59,-1391.01 1042.6,-1391.01"/>
<text xml:space="preserve" text-anchor="start" x="1045.6" y="-1399.21" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- recording&#45;&gt;nas02 -->
<g id="edge14" class="edge">
<title>recording&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M741.04,-1006.74C759.54,-1014.87 778.34,-1023.39 795.96,-1031.81 837.1,-1051.46 843.42,-1065.25 886.63,-1079.81 1151,-1168.9 1234.12,-1119.22 1505.99,-1181.81 1512.28,-1183.26 1518.69,-1184.81 1525.15,-1186.44"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1524.47,-1188.98 1532.39,-1188.31 1525.78,-1183.89 1524.47,-1188.98"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="965.56,-1145.87 965.56,-1168.67 1146.63,-1168.67 1146.63,-1145.87 965.56,-1145.87"/>
<text xml:space="preserve" text-anchor="start" x="968.56" y="-1151.67" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画・thumbnail・drop / NFS</text>
</g>
<!-- edge&#45;&gt;loockit -->
<g id="edge3" class="edge">
<title>edge&#45;&gt;loockit</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M200.63,-186.69C287.93,-260.7 441.78,-391.02 443.58,-391.81 624.17,-470.98 773.5,-311.99 878.63,-478.81 893.63,-502.6 870.94,-708.46 886.63,-731.81 895.42,-744.88 907.06,-755.71 920.12,-764.66"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="918.62,-766.81 926.35,-768.64 921.45,-762.39 918.62,-766.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="539.34,-415.5 539.34,-438.3 700.19,-438.3 700.19,-415.5 539.34,-415.5"/>
<text xml:space="preserve" text-anchor="start" x="542.34" y="-421.3" font-family="Arial" font-size="14.00" fill="#bbfcd3">loockit&#45;api / 8080 / mTLS</text>
</g>
<!-- edge&#45;&gt;coupon_manager -->
<g id="edge4" class="edge">
<title>edge&#45;&gt;coupon_manager</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M230.62,-92.86C361.01,-34.95 608.99,49.78 795.96,-39.01 908.73,-92.56 988.61,-221.88 1027.73,-298.03"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1025.2,-298.84 1030.93,-304.34 1029.88,-296.47 1025.2,-298.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="521.83,-39.01 521.83,-61.81 717.71,-61.81 717.71,-39.01 521.83,-39.01"/>
<text xml:space="preserve" text-anchor="start" x="524.83" y="-44.81" font-family="Arial" font-size="14.00" fill="#bbfcd3">coupon&#45;manager / 80 / Access</text>
</g>
<!-- edge&#45;&gt;wol -->
<g id="edge5" class="edge">
<title>edge&#45;&gt;wol</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M230.55,-163.12C418.63,-219.82 843.12,-353.04 878.63,-410.81 898.56,-443.21 865.17,-550.4 886.63,-581.81 903.27,-606.16 929.76,-622.7 956.84,-633.9"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="955.67,-636.26 963.61,-636.54 957.58,-631.37 955.67,-636.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="556.46,-357.43 556.46,-380.23 683.07,-380.23 683.07,-357.43 556.46,-357.43"/>
<text xml:space="preserve" text-anchor="start" x="559.46" y="-363.23" font-family="Arial" font-size="14.00" fill="#bbfcd3">wol / 5000 / Access</text>
</g>
<!-- edge&#45;&gt;nextcloud -->
<g id="edge1" class="edge">
<title>edge&#45;&gt;nextcloud</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M213.19,-186.53C221.28,-195.06 228.46,-204.52 233.61,-214.81 281.58,-310.56 229.53,-594.28 263.61,-695.81 302,-810.16 363.72,-812.17 413.58,-922.01 434.49,-968.07 410.35,-993.66 443.58,-1031.81 463.68,-1054.89 492.15,-1071.09 520.3,-1082.36"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="519.05,-1084.69 526.99,-1084.92 520.92,-1079.79 519.05,-1084.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="263.61,-922.01 263.61,-944.81 413.58,-944.81 413.58,-922.01 263.61,-922.01"/>
<text xml:space="preserve" text-anchor="start" x="266.61" y="-927.81" font-family="Arial" font-size="14.00" fill="#bbfcd3">nextcloud / 80 / Access</text>
</g>
<!-- edge&#45;&gt;recording -->
<g id="edge2" class="edge">
<title>edge&#45;&gt;recording</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M212.74,-186.76C220.9,-195.25 228.22,-204.65 233.61,-214.81 290.66,-322.22 215.72,-375.01 263.61,-486.81 304.37,-581.96 350.42,-582.99 413.58,-665.01 474.26,-743.81 539.56,-838.58 579.8,-898.27"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="577.5,-899.55 583.86,-904.31 581.85,-896.62 577.5,-899.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="325.1,-665.01 325.1,-687.81 352.09,-687.81 352.09,-665.01 325.1,-665.01"/>
<text xml:space="preserve" text-anchor="start" x="328.1" y="-673.21" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- kiosk&#45;&gt;magic_mirror -->
<g id="edge6" class="edge">
<title>kiosk&#45;&gt;magic_mirror</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M744.75,-162.17C794.75,-179.01 847.8,-206.71 878.63,-252.01 901.13,-285.07 864.11,-398.76 886.63,-431.81 895.05,-444.17 906.01,-454.51 918.3,-463.17"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="916.77,-465.3 924.48,-467.23 919.66,-460.92 916.77,-465.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="837.62,-252.01 837.62,-274.81 866.96,-274.81 866.96,-252.01 837.62,-252.01"/>
<text xml:space="preserve" text-anchor="start" x="840.62" y="-257.81" font-family="Arial" font-size="14.00" fill="#bbfcd3">表示</text>
</g>
<!-- databases&#45;&gt;nas02 -->
<g id="edge19" class="edge">
<title>databases&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1671.62,-1354.09C1671.62,-1334.79 1671.62,-1312.47 1671.62,-1292.18"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1674.24,-1292.3 1671.62,-1284.8 1668.99,-1292.3 1674.24,-1292.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1608.32,-1305.91 1608.32,-1328.71 1706.11,-1328.71 1706.11,-1305.91 1608.32,-1305.91"/>
<text xml:space="preserve" text-anchor="start" x="1611.32" y="-1311.71" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
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
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2161,-180.01 1981,-180.01 1981,-80 2161,-80 2161,-180.01"/>
<text xml:space="preserve" text-anchor="start" x="1994.31" y="-122" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos / home&#45;k8s</text>
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
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1962.27,-312.23C1983.95,-276.1 2013.57,-226.73 2036.42,-188.64"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2038.61,-190.09 2040.22,-182.31 2034.11,-187.39 2038.61,-190.09"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2002,-241.21 2002,-264.01 2084.25,-264.01 2084.25,-241.21 2002,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="2005" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期</text>
</g>
<!-- runner&#45;&gt;home -->
<g id="edge10" class="edge">
<title>runner&#45;&gt;home</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M2180.52,-312.23C2158.68,-276.1 2128.85,-226.73 2105.83,-188.64"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="2108.13,-187.36 2102,-182.3 2103.63,-190.08 2108.13,-187.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2148.82,-241.21 2148.82,-264.01 2294.1,-264.01 2294.1,-241.21 2148.82,-241.21"/>
<text xml:space="preserve" text-anchor="start" x="2151.82" y="-247.01" font-family="Arial" font-size="14.00" fill="#cbd0fd">runner Podの作成・削除</text>
</g>
<!-- tfc_agents&#45;&gt;network -->
<g id="edge11" class="edge">
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
<svg width="2462pt" height="1129pt"
 viewBox="0.00 0.00 2462.00 1129.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1114.05)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#454545" stroke="#313131" points="8,-8 8,-1091 2424.06,-1091 2424.06,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1078.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅 / PROXMOX2ホスト・RPI</text>
</g>
<!-- worker_pi1 -->
<g id="node1" class="node">
<title>worker_pi1</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="1224.01,-238 897.09,-238 897.09,-58 1224.01,-58 1224.01,-238"/>
<text xml:space="preserve" text-anchor="start" x="949.39" y="-160" font-family="Arial" font-size="20.00" fill="#fafafa">RPi / worker03 / VLAN10</text>
<text xml:space="preserve" text-anchor="start" x="917.15" y="-137" font-family="Arial" font-size="15.00" fill="#d4d4d4">Talos OS上のkubelet・containerd。2 VMと2</text>
<text xml:space="preserve" text-anchor="start" x="935.1" y="-119" font-family="Arial" font-size="15.00" fill="#d4d4d4">RPi。アプリPodの固定配置を意味しない。</text>
</g>
<!-- worker_pi2 -->
<g id="node2" class="node">
<title>worker_pi2</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="1224.01,-478 897.09,-478 897.09,-298 1224.01,-298 1224.01,-478"/>
<text xml:space="preserve" text-anchor="start" x="949.39" y="-400" font-family="Arial" font-size="20.00" fill="#fafafa">RPi / worker04 / VLAN10</text>
<text xml:space="preserve" text-anchor="start" x="917.15" y="-377" font-family="Arial" font-size="15.00" fill="#d4d4d4">Talos OS上のkubelet・containerd。2 VMと2</text>
<text xml:space="preserve" text-anchor="start" x="935.1" y="-359" font-family="Arial" font-size="15.00" fill="#d4d4d4">RPi。アプリPodの固定配置を意味しない。</text>
</g>
<!-- network -->
<g id="node3" class="node">
<title>network</title>
<polygon fill="#737373" stroke="#525252" stroke-width="0" points="506.58,-958 58,-958 58,-778 506.58,-778 506.58,-958"/>
<text xml:space="preserve" text-anchor="start" x="129.46" y="-880" font-family="Arial" font-size="20.00" fill="#fafafa">ネットワーク機器 / IX2215・SW・AP</text>
<text xml:space="preserve" text-anchor="start" x="201.43" y="-857" font-family="Arial" font-size="15.00" fill="#d4d4d4">IX2215・US&#45;8&#45;60W・FS</text>
<text xml:space="preserve" text-anchor="start" x="78.06" y="-839" font-family="Arial" font-size="15.00" fill="#d4d4d4">AP。機器を開くとEthernet・VLAN・PVEのトランクを確認できる。</text>
</g>
<!-- x570 -->
<g id="node4" class="node">
<title>x570</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="1246.07,-718 875.03,-718 875.03,-538 1246.07,-538 1246.07,-718"/>
<text xml:space="preserve" text-anchor="start" x="1019.41" y="-640" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;x570</text>
<text xml:space="preserve" text-anchor="start" x="957.56" y="-617" font-family="Arial" font-size="15.00" fill="#c2f0c2">192.168.0.115 / native1。Talos</text>
<text xml:space="preserve" text-anchor="start" x="895.09" y="-599" font-family="Arial" font-size="15.00" fill="#c2f0c2">VM2・TrueNAS・PBS・UniFi・Windows・LXC2。</text>
</g>
<!-- b550m -->
<g id="node5" class="node">
<title>b550m</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="1236.9,-958 884.2,-958 884.2,-778 1236.9,-778 1236.9,-958"/>
<text xml:space="preserve" text-anchor="start" x="1010.52" y="-880" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;b550m</text>
<text xml:space="preserve" text-anchor="start" x="957.56" y="-857" font-family="Arial" font-size="15.00" fill="#c2f0c2">192.168.0.119 / native1。Talos</text>
<text xml:space="preserve" text-anchor="start" x="904.26" y="-839" font-family="Arial" font-size="15.00" fill="#c2f0c2">VM3・TrueNAS・Docker開発・表示VM・LXC2。</text>
</g>
<!-- talos -->
<g id="node6" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1790.6,-566 1470.56,-566 1470.56,-386 1790.6,-386 1790.6,-566"/>
<text xml:space="preserve" text-anchor="start" x="1586.67" y="-488" font-family="Arial" font-size="20.00" fill="#eff6ff">home&#45;k8s</text>
<text xml:space="preserve" text-anchor="start" x="1541.8" y="-465" font-family="Arial" font-size="15.00" fill="#bfdbfe">3 CP VM・2 worker VM・2</text>
<text xml:space="preserve" text-anchor="start" x="1495.52" y="-447" font-family="Arial" font-size="15.00" fill="#bfdbfe">RPiで構成。namespace/Podの配置は動的。</text>
</g>
<!-- lan -->
<g id="node7" class="node">
<title>lan</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2374.06,-862 2054.02,-862 2054.02,-682 2374.06,-682 2374.06,-862"/>
<text xml:space="preserve" text-anchor="start" x="2135.13" y="-764" font-family="Arial" font-size="20.00" fill="#eff6ff">LAN / VLAN・経路</text>
</g>
<!-- worker_pi1&#45;&gt;talos -->
<g id="edge3" class="edge">
<title>worker_pi1&#45;&gt;talos</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M1223.79,-126.81C1291.78,-125.48 1369.12,-134.45 1430.56,-170.2 1509.02,-215.86 1562.01,-306.23 1593.45,-376.95"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1590.94,-377.75 1596.34,-383.58 1595.75,-375.65 1590.94,-377.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1286.07,-170.2 1286.07,-193 1430.56,-193 1430.56,-170.2 1286.07,-170.2"/>
<text xml:space="preserve" text-anchor="start" x="1289.07" y="-176" font-family="Arial" font-size="14.00" fill="#eff5fd">worker / home&#45;k8s所属</text>
</g>
<!-- worker_pi2&#45;&gt;talos -->
<g id="edge4" class="edge">
<title>worker_pi2&#45;&gt;talos</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M1223.63,-366.1C1288.69,-361.84 1363.92,-362.71 1430.56,-378.2 1440.64,-380.54 1450.81,-383.48 1460.92,-386.85"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1459.8,-389.23 1467.74,-389.21 1461.52,-384.27 1459.8,-389.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1286.07,-378.2 1286.07,-401 1430.56,-401 1430.56,-378.2 1286.07,-378.2"/>
<text xml:space="preserve" text-anchor="start" x="1289.07" y="-384" font-family="Arial" font-size="14.00" fill="#eff5fd">worker / home&#45;k8s所属</text>
</g>
<!-- network&#45;&gt;x570 -->
<g id="edge7" class="edge">
<title>network&#45;&gt;x570</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M506.51,-798.98C619.89,-763.93 756.33,-721.75 865.31,-688.05"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="865.82,-690.64 872.21,-685.92 864.27,-685.63 865.82,-690.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="546.58,-783.52 546.58,-806.32 835.03,-806.32 835.03,-783.52 546.58,-783.52"/>
<text xml:space="preserve" text-anchor="start" x="549.58" y="-789.32" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1管理 / ゲストtag20・30 / 配線ポート未確定</text>
</g>
<!-- network&#45;&gt;b550m -->
<g id="edge8" class="edge">
<title>network&#45;&gt;b550m</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M506.51,-868C622.92,-868 763.65,-868 874.01,-868"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="873.72,-870.63 881.22,-868 873.72,-865.38 873.72,-870.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="546.58,-868 546.58,-890.8 835.03,-890.8 835.03,-868 546.58,-868"/>
<text xml:space="preserve" text-anchor="start" x="549.58" y="-873.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1管理 / ゲストtag20・40 / 配線ポート未確定</text>
</g>
<!-- network&#45;&gt;lan -->
<g id="edge12" class="edge">
<title>network&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M506.47,-924.25C616.62,-949.19 751.96,-975.65 875.03,-988 1298.41,-1030.5 1791.29,-905.18 2044.23,-827.92"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2044.94,-830.45 2051.34,-825.74 2043.4,-825.43 2044.94,-830.45"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1344.82,-984.85 1344.82,-1007.65 1371.81,-1007.65 1371.81,-984.85 1344.82,-984.85"/>
<text xml:space="preserve" text-anchor="start" x="1347.82" y="-993.05" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- x570&#45;&gt;talos -->
<g id="edge1" class="edge">
<title>x570&#45;&gt;talos</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M1255.81,-576.02C1322.5,-558.17 1396.55,-538.36 1461.02,-521.1"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1255.46,-573.39 1248.9,-577.87 1256.82,-578.46 1255.46,-573.39"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1461.39,-523.72 1467.95,-519.25 1460.03,-518.65 1461.39,-523.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1344.82,-565.61 1344.82,-588.41 1371.81,-588.41 1371.81,-565.61 1344.82,-565.61"/>
<text xml:space="preserve" text-anchor="start" x="1347.82" y="-573.81" font-family="Arial" font-weight="bold" font-size="14.00" fill="#eff5fd">[...]</text>
</g>
<!-- x570&#45;&gt;lan -->
<g id="edge9" class="edge">
<title>x570&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1245.92,-651.06C1465.96,-678.57 1830.82,-724.2 2043.91,-750.85"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2043.48,-753.44 2051.25,-751.77 2044.13,-748.23 2043.48,-753.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1617.08,-719 1617.08,-741.8 1644.07,-741.8 1644.07,-719 1617.08,-719"/>
<text xml:space="preserve" text-anchor="start" x="1620.08" y="-727.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- b550m&#45;&gt;talos -->
<g id="edge2" class="edge">
<title>b550m&#45;&gt;talos</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M1209.57,-772.49C1221.96,-764.27 1234.26,-756.03 1246.07,-748 1330.43,-690.69 1423.79,-624.54 1497.27,-571.82"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1208.32,-770.17 1203.51,-776.5 1211.21,-774.55 1208.32,-770.17"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1498.65,-574.06 1503.22,-567.55 1495.59,-569.79 1498.65,-574.06"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1344.82,-719.2 1344.82,-742 1371.81,-742 1371.81,-719.2 1344.82,-719.2"/>
<text xml:space="preserve" text-anchor="start" x="1347.82" y="-727.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#eff5fd">[...]</text>
</g>
<!-- b550m&#45;&gt;lan -->
<g id="edge10" class="edge">
<title>b550m&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1236.75,-853.39C1455.65,-835.14 1827.66,-804.13 2043.76,-786.11"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2043.98,-788.73 2051.23,-785.49 2043.54,-783.5 2043.98,-788.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1617.08,-832.67 1617.08,-855.47 1644.07,-855.47 1644.07,-832.67 1617.08,-832.67"/>
<text xml:space="preserve" text-anchor="start" x="1620.08" y="-840.87" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- talos&#45;&gt;worker_pi1 -->
<g id="edge5" class="edge">
<title>talos&#45;&gt;worker_pi1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1518.07,-386.09C1490.22,-365.33 1459.91,-344.1 1430.56,-326.2 1368.17,-288.16 1296.46,-251.97 1232.94,-222.25"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1234.28,-219.98 1226.37,-219.2 1232.06,-224.74 1234.28,-219.98"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1344.82,-326.2 1344.82,-349 1371.81,-349 1371.81,-326.2 1344.82,-326.2"/>
<text xml:space="preserve" text-anchor="start" x="1347.82" y="-334.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- talos&#45;&gt;worker_pi2 -->
<g id="edge6" class="edge">
<title>talos&#45;&gt;worker_pi2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1470.98,-451.43C1397.25,-440.01 1309.4,-426.4 1234.02,-414.72"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1234.75,-412.18 1226.94,-413.62 1233.95,-417.36 1234.75,-412.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1344.82,-445.02 1344.82,-467.82 1371.81,-467.82 1371.81,-445.02 1344.82,-445.02"/>
<text xml:space="preserve" text-anchor="start" x="1347.82" y="-453.22" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- talos&#45;&gt;lan -->
<g id="edge11" class="edge">
<title>talos&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1790.22,-547.67C1859.56,-579.89 1941.47,-619.16 2014.02,-657.2 2026.1,-663.53 2038.51,-670.22 2050.94,-677.06"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2049.5,-679.27 2057.34,-680.6 2052.04,-674.67 2049.5,-679.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1830.6,-657.2 1830.6,-680 2014.02,-680 2014.02,-657.2 1830.6,-657.2"/>
<text xml:space="preserve" text-anchor="start" x="1833.6" y="-663" font-family="Arial" font-size="14.00" fill="#c9c9c9">L2広告 / Service IP .200&#45;.226</text>
</g>
</g>
</svg>
`;case`pve_x570`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2945pt" height="937pt"
 viewBox="0.00 0.00 2945.00 937.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 922.26)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#393939" stroke="#292929" points="8,-8 8,-899.21 2907,-899.21 2907,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-886.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅 / PROXMOX2ホスト・RPI</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_x570</title>
<polygon fill="#29472f" stroke="#1c3021" points="58,-293.8 58,-828.01 2445,-828.01 2445,-293.8 58,-293.8"/>
<text xml:space="preserve" text-anchor="start" x="66" y="-815.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PVE&#45;X570</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_cp1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1577,-571.6 1577,-756.81 1835,-756.81 1835,-571.6 1577,-571.6"/>
<text xml:space="preserve" text-anchor="start" x="1585" y="-743.91" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS CONTROLPLANE01 / VM13001</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_worker1</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1885,-571.6 1885,-756.81 2143,-756.81 2143,-571.6 1885,-571.6"/>
<text xml:space="preserve" text-anchor="start" x="1893" y="-743.91" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS WORKER01 / VM13004</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_loockit</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1287,-343.8 1287,-529.01 1643,-529.01 1643,-343.8 1287,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="1295" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">LOOCKIT 01 / CT12902</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_unifi</title>
<polygon fill="#3e4651" stroke="#2d333d" points="2049,-343.8 2049,-529.01 2395,-529.01 2395,-343.8 2049,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="2057" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">UNIFI OS VM13201</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_tuner</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1693,-343.8 1693,-529.01 1999,-529.01 1999,-343.8 1693,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="1701" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">MIRAKURUN本番 / CT12901・PT3</text>
</g>
<!-- bluez -->
<g id="node1" class="node">
<title>bluez</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2395.06,-703.61 2174.94,-703.61 2174.94,-603.6 2395.06,-603.6 2395.06,-703.61"/>
<text xml:space="preserve" text-anchor="start" x="2184.95" y="-645.61" font-family="Arial" font-size="20.00" fill="#f8fafc">BlueZ / USB Bluetooth</text>
</g>
<!-- talos -->
<g id="node2" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1803.27,-703.61 1608.73,-703.61 1608.73,-603.6 1803.27,-603.6 1803.27,-703.61"/>
<text xml:space="preserve" text-anchor="start" x="1618.74" y="-645.61" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- talos_1 -->
<g id="node3" class="node">
<title>talos_1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2111.27,-703.61 1916.73,-703.61 1916.73,-603.6 2111.27,-603.6 2111.27,-703.61"/>
<text xml:space="preserve" text-anchor="start" x="1926.74" y="-645.61" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- app -->
<g id="node4" class="node">
<title>app</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1611.16,-475.81 1318.84,-475.81 1318.84,-375.8 1611.16,-375.8 1611.16,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1328.85" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Loockit REST・gRPC</text>
</g>
<!-- app_1 -->
<g id="node5" class="node">
<title>app_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1967.15,-475.81 1724.85,-475.81 1724.85,-375.8 1967.15,-375.8 1967.15,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1734.86" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Mirakurun / PT3</text>
</g>
<!-- app_2 -->
<g id="node6" class="node">
<title>app_2</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2363.16,-475.81 2080.84,-475.81 2080.84,-375.8 2363.16,-375.8 2363.16,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="2090.85" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Podman / UniFi OS・Network</text>
</g>
<!-- talos_2 -->
<g id="node7" class="node">
<title>talos_2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2815.02,-515.8 2494.98,-515.8 2494.98,-335.8 2815.02,-335.8 2815.02,-515.8"/>
<text xml:space="preserve" text-anchor="start" x="2611.09" y="-437.8" font-family="Arial" font-size="20.00" fill="#eff6ff">home&#45;k8s</text>
<text xml:space="preserve" text-anchor="start" x="2566.23" y="-414.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">3 CP VM・2 worker VM・2</text>
<text xml:space="preserve" text-anchor="start" x="2519.95" y="-396.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">RPiで構成。namespace/Podの配置は動的。</text>
</g>
<!-- pbs -->
<g id="node8" class="node">
<title>pbs</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M288,-466.72C288,-471.73 247.66,-475.81 198,-475.81 148.34,-475.81 108,-471.73 108,-466.72 108,-466.72 108,-384.89 108,-384.89 108,-379.88 148.34,-375.8 198,-375.8 247.66,-375.8 288,-379.88 288,-384.89 288,-384.89 288,-466.72 288,-466.72"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M288,-466.72C288,-461.7 247.66,-457.62 198,-457.62 148.34,-457.62 108,-461.7 108,-466.72"/>
<text xml:space="preserve" text-anchor="start" x="132.4" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">PBS VM14001</text>
</g>
<!-- nas1 -->
<g id="node9" class="node">
<title>nas1</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M599.63,-466.72C599.63,-471.73 538.84,-475.81 464,-475.81 389.16,-475.81 328.37,-471.73 328.37,-466.72 328.37,-466.72 328.37,-384.89 328.37,-384.89 328.37,-379.88 389.16,-375.8 464,-375.8 538.84,-375.8 599.63,-379.88 599.63,-384.89 599.63,-384.89 599.63,-466.72 599.63,-466.72"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M599.63,-466.72C599.63,-461.7 538.84,-457.62 464,-457.62 389.16,-457.62 328.37,-461.7 328.37,-466.72"/>
<text xml:space="preserve" text-anchor="start" x="338.38" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">TrueNAS VM69001 / nas&#45;01</text>
</g>
<!-- lb -->
<g id="node10" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="944.86,-475.81 639.14,-475.81 639.14,-375.8 944.86,-375.8 944.86,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="649.14" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived VM10001</text>
</g>
<!-- windows -->
<g id="node11" class="node">
<title>windows</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1255.08,-475.81 984.92,-475.81 984.92,-375.8 1255.08,-375.8 1255.08,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="994.93" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Windows / VM60000 / tag30</text>
</g>
<!-- lan -->
<g id="node12" class="node">
<title>lan</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2148.02,-238 1827.98,-238 1827.98,-58 2148.02,-58 2148.02,-238"/>
<text xml:space="preserve" text-anchor="start" x="1909.08" y="-140" font-family="Arial" font-size="20.00" fill="#eff6ff">LAN / VLAN・経路</text>
</g>
<!-- talos&#45;&gt;talos_2 -->
<g id="edge1" class="edge">
<title>talos&#45;&gt;talos_2</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M1789.77,-603.72C1816.17,-590.74 1846.02,-578.44 1875,-571.6 1927.67,-559.18 2309.18,-575.38 2362,-563.6 2398.62,-555.44 2404.93,-544.72 2439,-529.01 2454.19,-522 2469.96,-514.66 2485.75,-507.28"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="2486.62,-509.77 2492.3,-504.21 2484.39,-505.01 2486.62,-509.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2415.64,-540.8 2415.64,-563.6 2599.05,-563.6 2599.05,-540.8 2415.64,-540.8"/>
<text xml:space="preserve" text-anchor="start" x="2418.64" y="-546.6" font-family="Arial" font-size="14.00" fill="#eff5fd">control&#45;plane / home&#45;k8s所属</text>
</g>
<!-- talos&#45;&gt;lan -->
<g id="edge10" class="edge">
<title>talos&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1835,-584C1848.24,-579.03 1861.71,-574.74 1875,-571.6 1926.91,-559.35 2304.22,-579.93 2355,-563.6 2380.73,-555.34 2392.46,-552.94 2405,-529.01 2453.53,-436.42 2465.59,-378.98 2405,-293.8 2349.02,-215.1 2247.11,-178.8 2158.05,-162.22"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2158.64,-159.66 2150.79,-160.92 2157.71,-164.82 2158.64,-159.66"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1869.26,-567.48 1869.26,-590.28 1964.75,-590.28 1964.75,-567.48 1869.26,-567.48"/>
<text xml:space="preserve" text-anchor="start" x="1872.26" y="-573.28" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- talos_1&#45;&gt;talos_2 -->
<g id="edge2" class="edge">
<title>talos_1&#45;&gt;talos_2</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M2061.81,-603.69C2077.44,-590.79 2095.76,-578.55 2115,-571.6 2139.82,-562.64 2567.81,-577.89 2590,-563.6 2604.79,-554.08 2616.28,-540.2 2625.2,-524.89"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="2627.45,-526.24 2628.71,-518.39 2622.84,-523.74 2627.45,-526.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2613.63,-540.8 2613.63,-563.6 2758.11,-563.6 2758.11,-540.8 2613.63,-540.8"/>
<text xml:space="preserve" text-anchor="start" x="2616.63" y="-546.6" font-family="Arial" font-size="14.00" fill="#eff5fd">worker / home&#45;k8s所属</text>
</g>
<!-- talos_1&#45;&gt;lan -->
<g id="edge11" class="edge">
<title>talos_1&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2115,-571.6C2134.25,-564.72 2836.62,-578.14 2851,-563.6 2864.02,-550.44 2970.83,-447.14 2835,-293.8 2747.85,-195.42 2379.41,-163.87 2158.18,-153.76"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2158.39,-151.14 2150.78,-153.43 2158.16,-156.39 2158.39,-151.14"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2041.41,-570.17 2041.41,-592.97 2136.9,-592.97 2136.9,-570.17 2041.41,-570.17"/>
<text xml:space="preserve" text-anchor="start" x="2044.41" y="-575.97" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- app&#45;&gt;lan -->
<g id="edge9" class="edge">
<title>app&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1579.43,-343.8C1611.61,-324.5 1647.54,-305.98 1683,-293.8 1710.95,-284.2 1720.95,-295.1 1749,-285.8 1781.53,-275.01 1814.57,-259.54 1845.3,-242.86"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1846.37,-245.26 1851.68,-239.34 1843.84,-240.66 1846.37,-245.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1621.36,-289.72 1621.36,-312.52 1716.85,-312.52 1716.85,-289.72 1621.36,-289.72"/>
<text xml:space="preserve" text-anchor="start" x="1624.36" y="-295.52" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- app_1&#45;&gt;lan -->
<g id="edge13" class="edge">
<title>app_1&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1887.7,-343.8C1903.29,-313.52 1921.17,-278.81 1937.47,-247.15"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1939.73,-248.5 1940.83,-240.63 1935.06,-246.09 1939.73,-248.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1819.41,-290.99 1819.41,-313.79 1914.9,-313.79 1914.9,-290.99 1819.41,-290.99"/>
<text xml:space="preserve" text-anchor="start" x="1822.41" y="-296.79" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- app_2&#45;&gt;lan -->
<g id="edge12" class="edge">
<title>app_2&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2153.28,-343.8C2127.22,-313.09 2097.28,-277.81 2070.11,-245.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2072.27,-244.26 2065.41,-240.24 2068.26,-247.66 2072.27,-244.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2002.86,-290.98 2002.86,-313.78 2108.46,-313.78 2108.46,-290.98 2002.86,-290.98"/>
<text xml:space="preserve" text-anchor="start" x="2005.86" y="-296.78" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / native 1</text>
</g>
<!-- talos_2&#45;&gt;talos_1 -->
<g id="edge3" class="edge">
<title>talos_2&#45;&gt;talos_1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2782.87,-515.78C2792.81,-531.92 2793.98,-548.44 2779,-563.6 2766.04,-576.73 2132.37,-565.38 2115,-571.6 2098.9,-577.37 2083.45,-586.86 2069.69,-597.36"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2068.4,-595.03 2064.16,-601.75 2071.67,-599.14 2068.4,-595.03"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2790.15,-540.8 2790.15,-563.6 2817.14,-563.6 2817.14,-540.8 2790.15,-540.8"/>
<text xml:space="preserve" text-anchor="start" x="2793.15" y="-549" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- talos_2&#45;&gt;lan -->
<g id="edge8" class="edge">
<title>talos_2&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2553.55,-335.85C2519.06,-309.25 2479.07,-282.12 2439,-263 2350.75,-220.88 2245.09,-193.11 2158.23,-175.52"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2158.84,-172.97 2150.97,-174.08 2157.81,-178.12 2158.84,-172.97"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2477.76,-263 2477.76,-285.8 2661.19,-285.8 2661.19,-263 2477.76,-263"/>
<text xml:space="preserve" text-anchor="start" x="2480.76" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">L2広告 / Service IP .200&#45;.226</text>
</g>
<!-- pbs&#45;&gt;lan -->
<g id="edge4" class="edge">
<title>pbs&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M226.64,-374.93C245.84,-346.3 273.85,-312.43 308,-293.8 403.38,-241.78 442.44,-274.14 550.51,-263 1007.82,-215.85 1548.73,-177.69 1817.99,-159.87"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1817.91,-162.51 1825.22,-159.4 1817.56,-157.27 1817.91,-162.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="550.51,-263 550.51,-285.8 646,-285.8 646,-263 550.51,-263"/>
<text xml:space="preserve" text-anchor="start" x="553.51" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- nas1&#45;&gt;lan -->
<g id="edge5" class="edge">
<title>nas1&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M508.15,-375.03C536.73,-346.25 576.47,-312.18 619,-293.8 830.54,-202.37 1500.22,-166.52 1817.77,-154.4"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1817.57,-157.03 1824.96,-154.13 1817.37,-151.79 1817.57,-157.03"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="700.93,-263 700.93,-285.8 796.42,-285.8 796.42,-263 700.93,-263"/>
<text xml:space="preserve" text-anchor="start" x="703.93" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- lb&#45;&gt;lan -->
<g id="edge6" class="edge">
<title>lb&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M842.13,-375.82C874.53,-347.14 919.09,-312.91 965,-293.8 1115.53,-231.15 1568.15,-184.46 1817.9,-162.66"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1817.91,-165.29 1825.16,-162.03 1817.46,-160.06 1817.91,-165.29"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1064.75,-263 1064.75,-285.8 1160.24,-285.8 1160.24,-263 1064.75,-263"/>
<text xml:space="preserve" text-anchor="start" x="1067.75" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- windows&#45;&gt;lan -->
<g id="edge7" class="edge">
<title>windows&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1163.4,-376.05C1192.44,-346.89 1233.26,-312.04 1277,-293.8 1311.61,-279.36 1323.95,-291.59 1361,-285.8 1517.08,-261.43 1692.6,-222.09 1818.15,-191.84"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1818.62,-194.43 1825.3,-190.11 1817.39,-189.32 1818.62,-194.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1481.97,-263 1481.97,-285.8 1577.45,-285.8 1577.45,-263 1481.97,-263"/>
<text xml:space="preserve" text-anchor="start" x="1484.97" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 30</text>
</g>
</g>
</svg>
`;case`pve_b550m`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2651pt" height="937pt"
 viewBox="0.00 0.00 2651.00 937.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 922.26)">
<g id="clust1" class="cluster">
<title>cluster_homesite</title>
<polygon fill="#393939" stroke="#292929" points="8,-8 8,-899.21 2613,-899.21 2613,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-886.31" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">自宅 / PROXMOX2ホスト・RPI</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_b550m</title>
<polygon fill="#29472f" stroke="#1c3021" points="58,-293.8 58,-828.01 2127,-828.01 2127,-293.8 58,-293.8"/>
<text xml:space="preserve" text-anchor="start" x="66" y="-815.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c2f0c2" fill-opacity="0.701961">PVE&#45;B550M</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_cp2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="951,-571.6 951,-756.81 1209,-756.81 1209,-571.6 951,-571.6"/>
<text xml:space="preserve" text-anchor="start" x="959" y="-743.91" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS CONTROLPLANE02 / VM13002</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_cp3</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1259,-571.6 1259,-756.81 1517,-756.81 1517,-571.6 1259,-571.6"/>
<text xml:space="preserve" text-anchor="start" x="1267" y="-743.91" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS CONTROLPLANE03 / VM13003</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_worker2</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1567,-571.6 1567,-756.81 1825,-756.81 1825,-571.6 1567,-571.6"/>
<text xml:space="preserve" text-anchor="start" x="1575" y="-743.91" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">TALOS WORKER02 / VM13005</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_loockit</title>
<polygon fill="#3e4651" stroke="#2d333d" points="666,-343.8 666,-529.01 1022,-529.01 1022,-343.8 666,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="674" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">LOOCKIT 02 / CT12903</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_tuner</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1072,-343.8 1072,-529.01 1428,-529.01 1428,-343.8 1072,-343.8"/>
<text xml:space="preserve" text-anchor="start" x="1080" y="-516.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">MIRAKURUN STG / CT12904・PX&#45;S1UD</text>
</g>
<!-- bluez -->
<g id="node1" class="node">
<title>bluez</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2077.06,-703.61 1856.94,-703.61 1856.94,-603.6 2077.06,-603.6 2077.06,-703.61"/>
<text xml:space="preserve" text-anchor="start" x="1866.95" y="-645.61" font-family="Arial" font-size="20.00" fill="#f8fafc">BlueZ / USB Bluetooth</text>
</g>
<!-- talos -->
<g id="node2" class="node">
<title>talos</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1177.27,-703.61 982.73,-703.61 982.73,-603.6 1177.27,-603.6 1177.27,-703.61"/>
<text xml:space="preserve" text-anchor="start" x="992.74" y="-645.61" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- talos_1 -->
<g id="node3" class="node">
<title>talos_1</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1485.27,-703.61 1290.73,-703.61 1290.73,-603.6 1485.27,-603.6 1485.27,-703.61"/>
<text xml:space="preserve" text-anchor="start" x="1300.74" y="-645.61" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- talos_2 -->
<g id="node4" class="node">
<title>talos_2</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1793.27,-703.61 1598.73,-703.61 1598.73,-603.6 1793.27,-603.6 1793.27,-703.61"/>
<text xml:space="preserve" text-anchor="start" x="1608.74" y="-645.61" font-family="Arial" font-size="20.00" fill="#eff6ff">Talos OS / VLAN20</text>
</g>
<!-- app -->
<g id="node5" class="node">
<title>app</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="990.16,-475.81 697.84,-475.81 697.84,-375.8 990.16,-375.8 990.16,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="707.85" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Loockit REST・gRPC</text>
</g>
<!-- app_1 -->
<g id="node6" class="node">
<title>app_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1396.16,-475.81 1103.84,-475.81 1103.84,-375.8 1396.16,-375.8 1396.16,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1113.85" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Docker / Mirakurun / PX&#45;S1UD</text>
</g>
<!-- talos_3 -->
<g id="node7" class="node">
<title>talos_3</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2521.02,-515.8 2200.98,-515.8 2200.98,-335.8 2521.02,-335.8 2521.02,-515.8"/>
<text xml:space="preserve" text-anchor="start" x="2317.09" y="-437.8" font-family="Arial" font-size="20.00" fill="#eff6ff">home&#45;k8s</text>
<text xml:space="preserve" text-anchor="start" x="2272.23" y="-414.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">3 CP VM・2 worker VM・2</text>
<text xml:space="preserve" text-anchor="start" x="2225.95" y="-396.8" font-family="Arial" font-size="15.00" fill="#bfdbfe">RPiで構成。namespace/Podの配置は動的。</text>
</g>
<!-- nas2 -->
<g id="node8" class="node">
<title>nas2</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M1731.63,-466.72C1731.63,-471.73 1670.84,-475.81 1596,-475.81 1521.16,-475.81 1460.37,-471.73 1460.37,-466.72 1460.37,-466.72 1460.37,-384.89 1460.37,-384.89 1460.37,-379.88 1521.16,-375.8 1596,-375.8 1670.84,-375.8 1731.63,-379.88 1731.63,-384.89 1731.63,-384.89 1731.63,-466.72 1731.63,-466.72"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M1731.63,-466.72C1731.63,-461.7 1670.84,-457.62 1596,-457.62 1521.16,-457.62 1460.37,-461.7 1460.37,-466.72"/>
<text xml:space="preserve" text-anchor="start" x="1470.38" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">TrueNAS VM69002 / nas&#45;02</text>
</g>
<!-- lb -->
<g id="node9" class="node">
<title>lb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2076.86,-475.81 1771.14,-475.81 1771.14,-375.8 2076.86,-375.8 2076.86,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="1781.14" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / Keepalived VM10002</text>
</g>
<!-- dev -->
<g id="node10" class="node">
<title>dev</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="343.83,-475.81 108.17,-475.81 108.17,-375.8 343.83,-375.8 343.83,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="118.18" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">開発用Docker / VM40000</text>
</g>
<!-- kiosk -->
<g id="node11" class="node">
<title>kiosk</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="634.04,-475.81 383.96,-475.81 383.96,-375.8 634.04,-375.8 634.04,-475.81"/>
<text xml:space="preserve" text-anchor="start" x="393.97" y="-417.8" font-family="Arial" font-size="20.00" fill="#f8fafc">MagicMirror表示 / VM5000</text>
</g>
<!-- lan -->
<g id="node12" class="node">
<title>lan</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2204.02,-238 1883.98,-238 1883.98,-58 2204.02,-58 2204.02,-238"/>
<text xml:space="preserve" text-anchor="start" x="1965.08" y="-140" font-family="Arial" font-size="20.00" fill="#eff6ff">LAN / VLAN・経路</text>
</g>
<!-- talos&#45;&gt;talos_3 -->
<g id="edge1" class="edge">
<title>talos&#45;&gt;talos_3</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M1163.76,-603.67C1190.16,-590.69 1220.02,-578.4 1249,-571.6 1312.18,-556.79 1770.25,-580.14 1833,-563.6 1853.38,-558.23 1854.29,-546.51 1874.59,-540.8 1983.56,-510.18 2018.8,-554.88 2129,-529.01 2149.62,-524.17 2170.69,-517.53 2191.31,-509.95"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="2192.14,-512.44 2198.23,-507.35 2190.29,-507.53 2192.14,-512.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1874.59,-540.8 1874.59,-563.6 2058,-563.6 2058,-540.8 1874.59,-540.8"/>
<text xml:space="preserve" text-anchor="start" x="1877.59" y="-546.6" font-family="Arial" font-size="14.00" fill="#eff5fd">control&#45;plane / home&#45;k8s所属</text>
</g>
<!-- talos&#45;&gt;lan -->
<g id="edge11" class="edge">
<title>talos&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1209,-583.96C1222.24,-578.99 1235.71,-574.72 1249,-571.6 1311.42,-556.96 1762.03,-567.89 1826,-563.6 1834.01,-563.07 2107.67,-535.02 2113,-529.01 2130.34,-509.45 2118.76,-319.29 2113,-293.8 2109.49,-278.28 2104.11,-262.47 2097.87,-247.28"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2100.42,-246.57 2095.07,-240.7 2095.59,-248.63 2100.42,-246.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1555.1,-564.27 1555.1,-587.07 1650.59,-587.07 1650.59,-564.27 1555.1,-564.27"/>
<text xml:space="preserve" text-anchor="start" x="1558.1" y="-570.07" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- talos_1&#45;&gt;talos_3 -->
<g id="edge2" class="edge">
<title>talos_1&#45;&gt;talos_3</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M1471.77,-603.71C1498.17,-590.72 1528.02,-578.43 1557,-571.6 1612.27,-558.59 2012.03,-573.2 2068,-563.6 2115.6,-555.44 2126.69,-548.2 2171,-529.01 2177.79,-526.07 2184.67,-522.97 2191.58,-519.76"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="2192.61,-522.17 2198.27,-516.6 2190.37,-517.42 2192.61,-522.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2143.87,-540.8 2143.87,-563.6 2327.28,-563.6 2327.28,-540.8 2143.87,-540.8"/>
<text xml:space="preserve" text-anchor="start" x="2146.87" y="-546.6" font-family="Arial" font-size="14.00" fill="#eff5fd">control&#45;plane / home&#45;k8s所属</text>
</g>
<!-- talos_1&#45;&gt;lan -->
<g id="edge12" class="edge">
<title>talos_1&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1517,-583.99C1530.24,-579.02 1543.71,-574.74 1557,-571.6 1611.51,-558.76 2006.64,-577.09 2061,-563.6 2093.91,-555.44 2111.27,-557.91 2129,-529.01 2190.8,-428.22 2166.23,-375.21 2129,-263 2127.23,-257.65 2125.09,-252.36 2122.68,-247.14"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2125.09,-246.1 2119.4,-240.56 2120.4,-248.44 2125.09,-246.1"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1720.15,-567.92 1720.15,-590.72 1815.64,-590.72 1815.64,-567.92 1720.15,-567.92"/>
<text xml:space="preserve" text-anchor="start" x="1723.15" y="-573.72" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- talos_2&#45;&gt;talos_3 -->
<g id="edge3" class="edge">
<title>talos_2&#45;&gt;talos_3</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,2" d="M1743.8,-603.65C1759.42,-590.76 1777.75,-578.52 1797,-571.6 1811.93,-566.24 2356.86,-574.9 2368,-563.6 2378.21,-553.25 2383.14,-540.03 2384.74,-525.92"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="2387.35,-526.17 2385.16,-518.53 2382.11,-525.86 2387.35,-526.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2380.91,-540.8 2380.91,-563.6 2525.39,-563.6 2525.39,-540.8 2380.91,-540.8"/>
<text xml:space="preserve" text-anchor="start" x="2383.91" y="-546.6" font-family="Arial" font-size="14.00" fill="#eff5fd">worker / home&#45;k8s所属</text>
</g>
<!-- talos_2&#45;&gt;lan -->
<g id="edge13" class="edge">
<title>talos_2&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1797,-571.6C1816.88,-564.5 2542.15,-578.61 2557,-563.6 2569.37,-551.11 2669.76,-454.34 2541,-293.8 2499.56,-242.14 2341.11,-201.97 2214.11,-177.18"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2214.69,-174.62 2206.83,-175.77 2213.7,-179.77 2214.69,-174.62"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1904.25,-569.71 1904.25,-592.51 1999.74,-592.51 1999.74,-569.71 1904.25,-569.71"/>
<text xml:space="preserve" text-anchor="start" x="1907.25" y="-575.51" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- app&#45;&gt;lan -->
<g id="edge10" class="edge">
<title>app&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M955.7,-343.8C988.45,-323.99 1025.35,-305.22 1062,-293.8 1089,-285.39 1160.9,-288.93 1189,-285.8 1427.96,-259.22 1702.06,-212.45 1874.12,-181.1"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1874.4,-183.72 1881.31,-179.79 1873.46,-178.56 1874.4,-183.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1324,-256 1324,-278.8 1419.49,-278.8 1419.49,-256 1324,-256"/>
<text xml:space="preserve" text-anchor="start" x="1327" y="-261.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- app_1&#45;&gt;lan -->
<g id="edge14" class="edge">
<title>app_1&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1323.75,-343.8C1346.21,-324.06 1372.34,-305.32 1400,-293.8 1423.03,-284.21 1487.37,-289.81 1512,-285.8 1634.76,-265.8 1770.51,-230.67 1874.16,-201.02"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1874.69,-203.6 1881.18,-199.01 1873.24,-198.56 1874.69,-203.6"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1508.09,-268.75 1508.09,-291.55 1603.58,-291.55 1603.58,-268.75 1508.09,-268.75"/>
<text xml:space="preserve" text-anchor="start" x="1511.09" y="-274.55" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- talos_3&#45;&gt;talos_2 -->
<g id="edge4" class="edge">
<title>talos_3&#45;&gt;talos_2</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2336.16,-515.74C2326.67,-534.6 2313.69,-552.22 2296,-563.6 2272.68,-578.6 1823.08,-562.2 1797,-571.6 1780.91,-577.4 1765.47,-586.91 1751.71,-597.4"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1750.42,-595.08 1746.18,-601.8 1753.68,-599.19 1750.42,-595.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2319.63,-540.8 2319.63,-563.6 2346.63,-563.6 2346.63,-540.8 2319.63,-540.8"/>
<text xml:space="preserve" text-anchor="start" x="2322.63" y="-549" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- talos_3&#45;&gt;lan -->
<g id="edge9" class="edge">
<title>talos_3&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2258.95,-336.02C2225.38,-306.81 2187.93,-274.22 2153.81,-244.54"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2155.79,-242.78 2148.41,-239.84 2152.34,-246.74 2155.79,-242.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2193,-263 2193,-285.8 2376.42,-285.8 2376.42,-263 2193,-263"/>
<text xml:space="preserve" text-anchor="start" x="2196" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">L2広告 / Service IP .200&#45;.226</text>
</g>
<!-- nas2&#45;&gt;lan -->
<g id="edge5" class="edge">
<title>nas2&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1648.34,-375.02C1677.26,-348.99 1714.61,-317.66 1751,-293.8 1789.6,-268.49 1833.25,-244.65 1874.85,-223.89"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1875.98,-226.26 1881.54,-220.58 1873.65,-221.55 1875.98,-226.26"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1796.51,-263 1796.51,-285.8 1892,-285.8 1892,-263 1796.51,-263"/>
<text xml:space="preserve" text-anchor="start" x="1799.51" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- lb&#45;&gt;lan -->
<g id="edge6" class="edge">
<title>lb&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1945.32,-375.81C1960.78,-340.26 1982.23,-290.97 2001.18,-247.42"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2003.51,-248.64 2004.1,-240.71 1998.7,-246.54 2003.51,-248.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1991.18,-263 1991.18,-285.8 2086.67,-285.8 2086.67,-263 1991.18,-263"/>
<text xml:space="preserve" text-anchor="start" x="1994.18" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- dev&#45;&gt;lan -->
<g id="edge7" class="edge">
<title>dev&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M263.82,-375.99C288.96,-347.18 324.55,-312.75 364,-293.8 454.78,-250.19 488.37,-273.78 588.51,-263 1052.38,-213.06 1601.67,-176 1873.72,-159.11"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1873.73,-161.74 1881.05,-158.66 1873.4,-156.5 1873.73,-161.74"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="588.51,-263 588.51,-285.8 684,-285.8 684,-263 588.51,-263"/>
<text xml:space="preserve" text-anchor="start" x="591.51" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 20</text>
</g>
<!-- kiosk&#45;&gt;lan -->
<g id="edge8" class="edge">
<title>kiosk&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M549.39,-375.86C576.36,-346.81 614.41,-312.17 656,-293.8 870.24,-199.17 1552.55,-164.88 1873.74,-153.77"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1873.64,-156.4 1881.05,-153.52 1873.46,-151.15 1873.64,-156.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="738.85,-263 738.85,-285.8 834.34,-285.8 834.34,-263 738.85,-263"/>
<text xml:space="preserve" text-anchor="start" x="741.85" y="-268.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">vmbr0 / tag 40</text>
</g>
</g>
</svg>
`;case`network`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1409pt" height="1126pt"
 viewBox="0.00 0.00 1409.00 1126.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1110.69)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-924.83 1371,-924.83 1371,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-911.93" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_network</title>
<polygon fill="#3e4651" stroke="#2d333d" points="48,-218.81 48,-863.63 598,-863.63 598,-218.81 48,-218.81"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-850.73" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">ネットワーク機器</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_x570</title>
<polygon fill="#3e4651" stroke="#2d333d" points="665,-226.81 665,-412.02 909,-412.02 909,-226.81 665,-226.81"/>
<text xml:space="preserve" text-anchor="start" x="673" y="-399.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">PVE&#45;X570 / PROXMOX</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_b550m</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1001,-226.81 1001,-412.02 1245,-412.02 1245,-226.81 1001,-226.81"/>
<text xml:space="preserve" text-anchor="start" x="1009" y="-399.12" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">PVE&#45;B550M / PROXMOX</text>
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
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="877,-358.82 697,-358.82 697,-258.81 877,-258.81 877,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="718.07" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">enp7s0 / vmbr0</text>
</g>
<!-- bridge_1 -->
<g id="node6" class="node">
<title>bridge_1</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1213,-358.82 1033,-358.82 1033,-258.81 1213,-258.81 1213,-358.82"/>
<text xml:space="preserve" text-anchor="start" x="1054.07" y="-300.81" font-family="Arial" font-size="20.00" fill="#f8fafc">enp6s0 / vmbr0</text>
</g>
<!-- unifi -->
<g id="node7" class="node">
<title>unifi</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="304.71,-148.01 101.29,-148.01 101.29,-48 304.71,-48 304.71,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="111.3" y="-90" font-family="Arial" font-size="20.00" fill="#f8fafc">UniFi OS / VM13201</text>
</g>
<!-- lan -->
<g id="node8" class="node">
<title>lan</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1331,-148.01 1151,-148.01 1151,-48 1331,-48 1331,-148.01"/>
<text xml:space="preserve" text-anchor="start" x="1162.08" y="-90" font-family="Arial" font-size="20.00" fill="#eff6ff">LAN / VLAN・経路</text>
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
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M513.54,-729.6C698.9,-695.62 1021.34,-615.17 1240,-442.82 1323.17,-377.26 1291.54,-237.44 1264.29,-157.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1266.78,-156.96 1261.83,-150.75 1261.83,-158.7 1266.78,-156.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1261.61,-420.02 1261.61,-442.82 1288.6,-442.82 1288.6,-420.02 1261.61,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="1264.61" y="-428.22" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
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
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M455.89,-482.83C495.42,-461.9 543.1,-438.17 587.55,-420.02 598.52,-415.53 602.16,-416.83 613,-412.02 643.48,-398.48 675.36,-380.88 703.37,-364.11"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="704.67,-366.39 709.73,-360.27 701.96,-361.9 704.67,-366.39"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="587.55,-420.02 587.55,-442.82 876,-442.82 876,-420.02 587.55,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="590.55" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1管理 / ゲストtag20・30 / 配線ポート未確定</text>
</g>
<!-- ethernet&#45;&gt;bridge_1 -->
<g id="edge7" class="edge">
<title>ethernet&#45;&gt;bridge_1</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M491.82,-483.84C493.22,-483.49 494.61,-483.15 496,-482.82 665.93,-442.35 720.51,-495.7 887,-442.82 943.2,-424.96 1000.97,-392.69 1045.28,-364.41"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1046.54,-366.72 1051.42,-360.45 1043.69,-362.31 1046.54,-366.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="942.06,-420.02 942.06,-442.82 1230.51,-442.82 1230.51,-420.02 942.06,-420.02"/>
<text xml:space="preserve" text-anchor="start" x="945.06" y="-425.82" font-family="Arial" font-size="14.00" fill="#c9c9c9">native1管理 / ゲストtag20・40 / 配線ポート未確定</text>
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
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M876.97,-266.43C953.35,-231.3 1062.82,-180.95 1141.74,-144.66"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1142.74,-147.08 1148.46,-141.57 1140.55,-142.31 1142.74,-147.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1041.18,-188.01 1041.18,-210.81 1068.18,-210.81 1068.18,-188.01 1041.18,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1044.18" y="-196.21" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- bridge_1&#45;&gt;lan -->
<g id="edge10" class="edge">
<title>bridge_1&#45;&gt;lan</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M1150.67,-258.86C1167.98,-228.23 1190.35,-188.62 1208.51,-156.5"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1210.61,-158.11 1212.02,-150.29 1206.04,-155.53 1210.61,-158.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1189.06,-188.01 1189.06,-210.81 1216.06,-210.81 1216.06,-188.01 1189.06,-188.01"/>
<text xml:space="preserve" text-anchor="start" x="1192.06" y="-196.21" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
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
<svg width="3030pt" height="1678pt"
 viewBox="0.00 0.00 3030.00 1678.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1663.06)">
<!-- descheduler -->
<g id="node1" class="node">
<title>descheduler</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="230.62,-850.01 50.62,-850.01 50.62,-750 230.62,-750 230.62,-850.01"/>
<text xml:space="preserve" text-anchor="start" x="86.14" y="-792" font-family="Arial" font-size="20.00" fill="#f8fafc">descheduler</text>
</g>
<!-- api -->
<g id="node2" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1126.58,-1000.01 895.32,-1000.01 895.32,-900 1126.58,-900 1126.58,-1000.01"/>
<text xml:space="preserve" text-anchor="start" x="905.33" y="-942" font-family="Arial" font-size="20.00" fill="#f8fafc">Kubernetes API / Lease</text>
</g>
<!-- controlplane -->
<g id="node3" class="node">
<title>controlplane</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="255.12,-1300.01 26.11,-1300.01 26.11,-1200 255.12,-1200 255.12,-1300.01"/>
<text xml:space="preserve" text-anchor="start" x="36.12" y="-1242" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s control&#45;plane</text>
</g>
<!-- cert_approver -->
<g id="node4" class="node">
<title>cert_approver</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="281.24,-1150.01 0,-1150.01 0,-1050 281.24,-1050 281.24,-1150.01"/>
<text xml:space="preserve" text-anchor="start" x="10.01" y="-1092" font-family="Arial" font-size="20.00" fill="#f8fafc">kubelet&#45;serving&#45;cert&#45;approver</text>
</g>
<!-- flannel -->
<g id="node5" class="node">
<title>flannel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="230.62,-400.01 50.62,-400.01 50.62,-300 230.62,-300 230.62,-400.01"/>
<text xml:space="preserve" text-anchor="start" x="82.26" y="-342" font-family="Arial" font-size="20.00" fill="#f8fafc">Flannel / CNI</text>
</g>
<!-- worker -->
<g id="node6" class="node">
<title>worker</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1629.83,-661.01 1449.83,-661.01 1449.83,-561 1629.83,-561 1629.83,-661.01"/>
<text xml:space="preserve" text-anchor="start" x="1463.14" y="-603" font-family="Arial" font-size="20.00" fill="#f8fafc">home&#45;k8s worker</text>
</g>
<!-- kube_proxy -->
<g id="node7" class="node">
<title>kube_proxy</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="275.13,-250.01 6.11,-250.01 6.11,-150 275.13,-150 275.13,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="16.12" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">kube&#45;proxy / Service routing</text>
</g>
<!-- metrics_server -->
<g id="node8" class="node">
<title>metrics_server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="273.41,-100.01 7.82,-100.01 7.82,0 273.41,0 273.41,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="17.83" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">metrics&#45;server / Metrics API</text>
</g>
<!-- metallb -->
<g id="node9" class="node">
<title>metallb</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="269.01,-1648.01 12.23,-1648.01 12.23,-1548 269.01,-1548 269.01,-1648.01"/>
<text xml:space="preserve" text-anchor="start" x="22.24" y="-1590" font-family="Arial" font-size="20.00" fill="#f8fafc">MetalLB / LANのService IP</text>
</g>
<!-- coredns -->
<g id="node10" class="node">
<title>coredns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1142.67,-1648.01 879.23,-1648.01 879.23,-1548 1142.67,-1548 1142.67,-1648.01"/>
<text xml:space="preserve" text-anchor="start" x="889.24" y="-1590" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / miutaku.internal</text>
</g>
<!-- server -->
<g id="node11" class="node">
<title>server</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="3000.07,-1212.01 2744.31,-1212.01 2744.31,-1112 3000.07,-1112 3000.07,-1212.01"/>
<text xml:space="preserve" text-anchor="start" x="2754.32" y="-1154" font-family="Arial" font-size="20.00" fill="#f8fafc">VLAN20 / 192.168.20.0/24</text>
</g>
<!-- bws -->
<g id="node12" class="node">
<title>bws</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="274.02,-1000.01 7.22,-1000.01 7.22,-900 274.02,-900 274.02,-1000.01"/>
<text xml:space="preserve" text-anchor="start" x="17.22" y="-942" font-family="Arial" font-size="20.00" fill="#ffe0c2">Bitwarden Secrets Manager</text>
</g>
<!-- eso -->
<g id="node13" class="node">
<title>eso</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="662.26,-1000.01 411.04,-1000.01 411.04,-900 662.26,-900 662.26,-1000.01"/>
<text xml:space="preserve" text-anchor="start" x="421.04" y="-942" font-family="Arial" font-size="20.00" fill="#f8fafc">External Secrets Operator</text>
</g>
<!-- argo -->
<g id="node14" class="node">
<title>argo</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="230.62,-700.01 50.62,-700.01 50.62,-600 230.62,-600 230.62,-700.01"/>
<text xml:space="preserve" text-anchor="start" x="88.38" y="-642" font-family="Arial" font-size="20.00" fill="#f8fafc">自宅ArgoCD</text>
</g>
<!-- runner -->
<g id="node15" class="node">
<title>runner</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="267.33,-550.01 13.91,-550.01 13.91,-450 267.33,-450 267.33,-550.01"/>
<text xml:space="preserve" text-anchor="start" x="23.92" y="-492" font-family="Arial" font-size="20.00" fill="#f8fafc">ARC / 共用のrunner制御基盤</text>
</g>
<!-- public_dns -->
<g id="node16" class="node">
<title>public_dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1678.79,-1648.01 1400.86,-1648.01 1400.86,-1548 1678.79,-1548 1678.79,-1648.01"/>
<text xml:space="preserve" text-anchor="start" x="1410.87" y="-1590" font-family="Arial" font-size="20.00" fill="#f8fafc">Public DNS / 1.1.1.1・8.8.8.8</text>
</g>
<!-- cloudflared -->
<g id="node17" class="node">
<title>cloudflared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2114.88,-661.01 1859.18,-661.01 1859.18,-561 2114.88,-561 2114.88,-661.01"/>
<text xml:space="preserve" text-anchor="start" x="1869.19" y="-603" font-family="Arial" font-size="20.00" fill="#f8fafc">cloudflared / 自宅connector</text>
</g>
<!-- nd_cluster_dns -->
<g id="node18" class="node">
<title>nd_cluster_dns</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2100.96,-511.01 1873.1,-511.01 1873.1,-411 2100.96,-411 2100.96,-511.01"/>
<text xml:space="preserve" text-anchor="start" x="1883.11" y="-453" font-family="Arial" font-size="20.00" fill="#f8fafc">CoreDNS / cluster.local</text>
</g>
<!-- edge -->
<g id="node19" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="2462.03,-1212.01 2282.03,-1212.01 2282.03,-1112 2462.03,-1112 2462.03,-1212.01"/>
<text xml:space="preserve" text-anchor="start" x="2326.45" y="-1154" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- descheduler&#45;&gt;api -->
<g id="edge1" class="edge">
<title>descheduler&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M230.26,-804.18C334.42,-810.17 512.09,-823.78 662.26,-852.2 737.42,-866.43 819.9,-889.3 885.66,-909.36"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="884.81,-911.84 892.75,-911.53 886.35,-906.82 884.81,-911.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="456.62,-852.2 456.62,-875 616.68,-875 616.68,-852.2 456.62,-852.2"/>
<text xml:space="preserve" text-anchor="start" x="459.62" y="-858" font-family="Arial" font-size="14.00" fill="#cbd0fd">Podのeviction / 配置再調整</text>
</g>
<!-- api&#45;&gt;worker -->
<g id="edge15" class="edge">
<title>api&#45;&gt;worker</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1058.54,-900.07C1089.12,-869 1131.04,-829.53 1172.67,-800.2 1257.84,-740.22 1364.55,-687.28 1440.77,-652.76"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1441.38,-655.36 1447.14,-649.89 1439.23,-650.57 1441.38,-655.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1221.3,-800.2 1221.3,-823 1322.23,-823 1322.23,-800.2 1221.3,-800.2"/>
<text xml:space="preserve" text-anchor="start" x="1224.3" y="-806" font-family="Arial" font-size="14.00" fill="#cbd0fd">Podの実行を制御</text>
</g>
<!-- controlplane&#45;&gt;api -->
<g id="edge2" class="edge">
<title>controlplane&#45;&gt;api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M254.83,-1225.26C397.04,-1192.2 646.92,-1127.47 849.23,-1040 872.58,-1029.91 896.93,-1017.4 919.41,-1004.95"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="920.69,-1007.24 925.95,-1001.29 918.12,-1002.66 920.69,-1007.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="462.45,-1183.78 462.45,-1206.58 610.85,-1206.58 610.85,-1183.78 462.45,-1183.78"/>
<text xml:space="preserve" text-anchor="start" x="465.45" y="-1189.58" font-family="Arial" font-size="14.00" fill="#c9c9c9">API server :6443 / etcd</text>
</g>
<!-- cert_approver&#45;&gt;api -->
<g id="edge3" class="edge">
<title>cert_approver&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M280.97,-1082.54C386.06,-1068.73 533.6,-1048.01 662.26,-1025 745.91,-1010.05 766.17,-1002.93 849.23,-985 860.9,-982.49 873.04,-979.86 885.19,-977.22"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="885.66,-979.8 892.43,-975.65 884.54,-974.67 885.66,-979.8"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="452.34,-1063.84 452.34,-1086.64 620.96,-1086.64 620.96,-1063.84 452.34,-1063.84"/>
<text xml:space="preserve" text-anchor="start" x="455.34" y="-1069.64" font-family="Arial" font-size="14.00" fill="#cbd0fd">kubelet serving CSRの承認</text>
</g>
<!-- flannel&#45;&gt;worker -->
<g id="edge4" class="edge">
<title>flannel&#45;&gt;worker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M230.61,-366.63C479.15,-413.05 1179.44,-543.87 1439.75,-592.5"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1439.12,-595.05 1446.97,-593.85 1440.08,-589.89 1439.12,-595.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="702.39,-480.5 702.39,-503.3 839.1,-503.3 839.1,-480.5 702.39,-480.5"/>
<text xml:space="preserve" text-anchor="start" x="705.39" y="-486.3" font-family="Arial" font-size="14.00" fill="#c9c9c9">CNI / Podネットワーク</text>
</g>
<!-- worker&#45;&gt;api -->
<g id="edge16" class="edge">
<title>worker&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M1512.62,-660.85C1484.05,-710.65 1433.85,-786.09 1370.86,-831 1301.3,-880.6 1209.72,-910.52 1136.48,-927.96"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="1135.93,-925.39 1129.22,-929.65 1137.12,-930.5 1135.93,-925.39"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1174.61,-917.7 1174.61,-940.5 1368.92,-940.5 1368.92,-917.7 1174.61,-917.7"/>
<text xml:space="preserve" text-anchor="start" x="1177.61" y="-923.5" font-family="Arial" font-size="14.00" fill="#cbd0fd">kubelet / Pod・Serviceのwatch</text>
</g>
<!-- worker&#45;&gt;cloudflared -->
<g id="edge17" class="edge">
<title>worker&#45;&gt;cloudflared</title>
<path fill="none" stroke="#3b82f6" stroke-width="2" d="M1629.58,-611C1692.32,-611 1777.63,-611 1849.06,-611"/>
<polygon fill="#3b82f6" stroke="#3b82f6" stroke-width="2" points="1848.96,-613.63 1856.46,-611 1848.96,-608.38 1848.96,-613.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1720.85,-611 1720.85,-633.8 1817.13,-633.8 1817.13,-611 1720.85,-611"/>
<text xml:space="preserve" text-anchor="start" x="1723.85" y="-616.8" font-family="Arial" font-size="14.00" fill="#eff5fd">connector Pod</text>
</g>
<!-- worker&#45;&gt;nd_cluster_dns -->
<g id="edge18" class="edge">
<title>worker&#45;&gt;nd_cluster_dns</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1629.58,-581.1C1696.59,-558.52 1789.33,-527.28 1863.41,-502.32"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1864.14,-504.84 1870.41,-499.96 1862.46,-499.87 1864.14,-504.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1708.79,-553.85 1708.79,-576.65 1829.18,-576.65 1829.18,-553.85 1708.79,-553.85"/>
<text xml:space="preserve" text-anchor="start" x="1711.79" y="-559.65" font-family="Arial" font-size="14.00" fill="#bbfcd3">Podの名前解決 / :53</text>
</g>
<!-- kube_proxy&#45;&gt;worker -->
<g id="edge5" class="edge">
<title>kube_proxy&#45;&gt;worker</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M274.97,-227.92C503.21,-277.49 981.75,-389.21 1370.86,-532 1393.86,-540.44 1418.01,-550.84 1440.6,-561.28"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1439.2,-563.52 1447.1,-564.32 1441.42,-558.77 1439.2,-563.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="698.12,-367.31 698.12,-390.11 843.38,-390.11 843.38,-367.31 698.12,-367.31"/>
<text xml:space="preserve" text-anchor="start" x="701.12" y="-373.11" font-family="Arial" font-size="14.00" fill="#c9c9c9">Service / ClusterIP転送</text>
</g>
<!-- metrics_server&#45;&gt;worker -->
<g id="edge6" class="edge">
<title>metrics_server&#45;&gt;worker</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M273.41,-71.82C508.58,-115.25 1009.66,-228.46 1370.86,-455 1414.27,-482.23 1456.5,-521.54 1487.76,-553.88"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="1485.49,-555.3 1492.57,-558.9 1489.28,-551.67 1485.49,-555.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="693.43,-215.55 693.43,-238.35 848.06,-238.35 848.06,-215.55 693.43,-215.55"/>
<text xml:space="preserve" text-anchor="start" x="696.43" y="-221.35" font-family="Arial" font-size="14.00" fill="#d4f2ff">kubelet metrics / :10250</text>
</g>
<!-- metallb&#45;&gt;api -->
<g id="edge8" class="edge">
<title>metallb&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M187.29,-1548.37C220.05,-1514.18 266.19,-1468.82 311.24,-1434 532.81,-1262.74 627.83,-1277.48 849.23,-1106 887.79,-1076.14 927.16,-1038.08 957.27,-1007.04"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="958.92,-1009.11 962.23,-1001.89 955.14,-1005.47 958.92,-1009.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="451.57,-1362.15 451.57,-1384.95 621.73,-1384.95 621.73,-1362.15 451.57,-1362.15"/>
<text xml:space="preserve" text-anchor="start" x="454.57" y="-1367.95" font-family="Arial" font-size="14.00" fill="#cbd0fd">ServiceのIP割当 / controller</text>
</g>
<!-- metallb&#45;&gt;coredns -->
<g id="edge7" class="edge">
<title>metallb&#45;&gt;coredns</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M268.81,-1598C428.92,-1598 703.06,-1598 869.28,-1598"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="869.05,-1600.63 876.55,-1598 869.05,-1595.38 869.05,-1600.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="420.42,-1598 420.42,-1620.8 652.88,-1620.8 652.88,-1598 420.42,-1598"/>
<text xml:space="preserve" text-anchor="start" x="423.42" y="-1603.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">LAN向けDNS / LoadBalancer IP .201</text>
</g>
<!-- metallb&#45;&gt;server -->
<g id="edge9" class="edge">
<title>metallb&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M239.67,-1548.02C317.76,-1512.85 430.97,-1472 535.65,-1472 535.65,-1472 535.65,-1472 2373.03,-1472 2562.08,-1472 2738.84,-1309.08 2821.77,-1219.45"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2823.6,-1221.34 2826.74,-1214.04 2819.73,-1217.8 2823.6,-1221.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1448.11,-1472 1448.11,-1494.8 1631.54,-1494.8 1631.54,-1472 1448.11,-1472"/>
<text xml:space="preserve" text-anchor="start" x="1451.11" y="-1477.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">L2広告 / Service IP .200&#45;.226</text>
</g>
<!-- coredns&#45;&gt;public_dns -->
<g id="edge13" class="edge">
<title>coredns&#45;&gt;public_dns</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1142.53,-1598C1217.77,-1598 1312.61,-1598 1390.64,-1598"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1390.52,-1600.63 1398.02,-1598 1390.52,-1595.38 1390.52,-1600.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1172.67,-1598 1172.67,-1620.8 1370.86,-1620.8 1370.86,-1598 1172.67,-1598"/>
<text xml:space="preserve" text-anchor="start" x="1175.67" y="-1603.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">非internal名をforward / DNS :53</text>
</g>
<!-- bws&#45;&gt;eso -->
<g id="edge10" class="edge">
<title>bws&#45;&gt;eso</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M273.92,-950C314.83,-950 359.93,-950 401,-950"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="400.83,-952.63 408.33,-950 400.83,-947.38 400.83,-952.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="311.24,-950 311.24,-972.8 381.04,-972.8 381.04,-950 311.24,-950"/>
<text xml:space="preserve" text-anchor="start" x="314.24" y="-955.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">Secret注入</text>
</g>
<!-- eso&#45;&gt;api -->
<g id="edge14" class="edge">
<title>eso&#45;&gt;api</title>
<path fill="none" stroke="#ac4d39" stroke-width="2" stroke-dasharray="1,5" d="M662.05,-950C730.81,-950 816,-950 884.86,-950"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="884.81,-952.63 892.31,-950 884.81,-947.38 884.81,-952.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="692.26,-950 692.26,-972.8 849.23,-972.8 849.23,-950 692.26,-950"/>
<text xml:space="preserve" text-anchor="start" x="695.26" y="-955.8" font-family="Arial" font-size="14.00" fill="#fcd9d2">Kubernetes Secretを同期</text>
</g>
<!-- argo&#45;&gt;api -->
<g id="edge11" class="edge">
<title>argo&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M230.37,-664.37C367.99,-688.89 638.94,-746.2 849.23,-847 877.29,-860.45 906.38,-877.89 931.98,-894.58"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="930.28,-896.61 937.99,-898.54 933.17,-892.23 930.28,-896.61"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="440.66,-768.75 440.66,-791.55 632.64,-791.55 632.64,-768.75 440.66,-768.75"/>
<text xml:space="preserve" text-anchor="start" x="443.66" y="-774.55" font-family="Arial" font-size="14.00" fill="#cbd0fd">manifest同期 / Kubernetes API</text>
</g>
<!-- runner&#45;&gt;api -->
<g id="edge12" class="edge">
<title>runner&#45;&gt;api</title>
<path fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,2" d="M267,-523.71C418.19,-557.41 673.84,-631.2 849.23,-771 893.74,-806.49 936.42,-854.93 966.59,-892.47"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="964.23,-893.71 970.95,-897.94 968.33,-890.44 964.23,-893.71"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="464.01,-652.15 464.01,-674.95 609.29,-674.95 609.29,-652.15 464.01,-652.15"/>
<text xml:space="preserve" text-anchor="start" x="467.01" y="-657.95" font-family="Arial" font-size="14.00" fill="#cbd0fd">runner Podの作成・削除</text>
</g>
<!-- cloudflared&#45;&gt;edge -->
<g id="edge19" class="edge">
<title>cloudflared&#45;&gt;edge</title>
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M2022.69,-660.87C2093.6,-762.88 2254.88,-994.91 2330.49,-1103.69"/>
<polygon fill="#0ea5e9" stroke="#0ea5e9" stroke-width="2" points="2328.28,-1105.1 2334.72,-1109.76 2332.59,-1102.11 2328.28,-1105.1"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2144.88,-983.78 2144.88,-1006.58 2252.03,-1006.58 2252.03,-983.78 2144.88,-983.78"/>
<text xml:space="preserve" text-anchor="start" x="2147.88" y="-989.58" font-family="Arial" font-size="14.00" fill="#d4f2ff">外向きTunnel接続</text>
</g>
<!-- edge&#45;&gt;server -->
<g id="edge20" class="edge">
<title>edge&#45;&gt;server</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="1,5" d="M2461.8,-1162C2537.34,-1162 2647.07,-1162 2733.91,-1162"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="2733.86,-1164.63 2741.36,-1162 2733.86,-1159.38 2733.86,-1164.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2492.03,-1162 2492.03,-1184.8 2714.31,-1184.8 2714.31,-1162 2492.03,-1162"/>
<text xml:space="preserve" text-anchor="start" x="2495.03" y="-1167.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">private CIDR routes / WARP policy</text>
</g>
</g>
</svg>
`;case`loockit`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2342pt" height="430pt"
 viewBox="0.00 0.00 2342.00 430.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 415.06)">
<!-- client -->
<g id="node1" class="node">
<title>client</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="180,-244.01 0,-244.01 0,-144 180,-144 180,-244.01"/>
<text xml:space="preserve" text-anchor="start" x="23.32" y="-186" font-family="Arial" font-size="20.00" fill="#f8fafc">専用クライアント</text>
</g>
<!-- mtls -->
<g id="node2" class="node">
<title>mtls</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="556.63,-244.01 351.02,-244.01 351.02,-144 556.63,-144 556.63,-244.01"/>
<text xml:space="preserve" text-anchor="start" x="361.03" y="-186" font-family="Arial" font-size="20.00" fill="#f8fafc">mTLS / 専用APIの例外</text>
</g>
<!-- tunnel -->
<g id="node3" class="node">
<title>tunnel</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="979.22,-244.01 799.22,-244.01 799.22,-144 979.22,-144 979.22,-244.01"/>
<text xml:space="preserve" text-anchor="start" x="810.29" y="-186" font-family="Arial" font-size="20.00" fill="#f8fafc">Cloudflare Tunnel</text>
</g>
<!-- proxy -->
<g id="node4" class="node">
<title>proxy</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1443.56,-244.01 1200.07,-244.01 1200.07,-144 1443.56,-144 1443.56,-244.01"/>
<text xml:space="preserve" text-anchor="start" x="1210.08" y="-186" font-family="Arial" font-size="20.00" fill="#f8fafc">HAProxy / :8080・:50051</text>
</g>
<!-- loockit_a -->
<g id="node5" class="node">
<title>loockit_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1835.63,-346.01 1625.5,-346.01 1625.5,-246 1835.63,-246 1835.63,-346.01"/>
<text xml:space="preserve" text-anchor="start" x="1635.51" y="-288" font-family="Arial" font-size="20.00" fill="#f8fafc">Loockit 01 / CT12902</text>
</g>
<!-- loockit_b -->
<g id="node6" class="node">
<title>loockit_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1835.63,-169.01 1625.5,-169.01 1625.5,-69 1835.63,-69 1835.63,-169.01"/>
<text xml:space="preserve" text-anchor="start" x="1635.51" y="-111" font-family="Arial" font-size="20.00" fill="#f8fafc">Loockit 02 / CT12903</text>
</g>
<!-- ble_a -->
<g id="node7" class="node">
<title>ble_a</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2303.31,-400.01 2080.94,-400.01 2080.94,-300 2303.31,-300 2303.31,-400.01"/>
<text xml:space="preserve" text-anchor="start" x="2090.95" y="-342" font-family="Arial" font-size="20.00" fill="#f8fafc">x570 BlueZ / Bluetooth</text>
</g>
<!-- api -->
<g id="node8" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2307.76,-250.01 2076.49,-250.01 2076.49,-150 2307.76,-150 2307.76,-250.01"/>
<text xml:space="preserve" text-anchor="start" x="2086.5" y="-192" font-family="Arial" font-size="20.00" fill="#f8fafc">Kubernetes API / Lease</text>
</g>
<!-- ble_b -->
<g id="node9" class="node">
<title>ble_b</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2312.2,-100.01 2072.05,-100.01 2072.05,0 2312.2,0 2312.2,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="2082.05" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">b550m BlueZ / Bluetooth</text>
</g>
<!-- client&#45;&gt;mtls -->
<g id="edge1" class="edge">
<title>client&#45;&gt;mtls</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.98,-194C228.53,-194 289.11,-194 340.85,-194"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="340.55,-196.63 348.05,-194 340.55,-191.38 340.55,-196.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="210,-194 210,-216.8 321.02,-216.8 321.02,-194 210,-194"/>
<text xml:space="preserve" text-anchor="start" x="213" y="-199.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">クライアント証明書</text>
</g>
<!-- mtls&#45;&gt;tunnel -->
<g id="edge2" class="edge">
<title>mtls&#45;&gt;tunnel</title>
<path fill="none" stroke="#6366f1" stroke-width="2" d="M556.44,-194C626.67,-194 719.61,-194 789.26,-194"/>
<polygon fill="#6366f1" stroke="#6366f1" stroke-width="2" points="788.84,-196.63 796.34,-194 788.84,-191.38 788.84,-196.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="586.63,-194 586.63,-216.8 769.22,-216.8 769.22,-194 586.63,-194"/>
<text xml:space="preserve" text-anchor="start" x="589.63" y="-199.8" font-family="Arial" font-size="14.00" fill="#cbd0fd">mTLS検証済みのAPIリクエスト</text>
</g>
<!-- tunnel&#45;&gt;proxy -->
<g id="edge3" class="edge">
<title>tunnel&#45;&gt;proxy</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M979.18,-194C1039.97,-194 1121.54,-194 1189.74,-194"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1189.6,-196.63 1197.1,-194 1189.6,-191.38 1189.6,-196.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1009.22,-194 1009.22,-216.8 1170.07,-216.8 1170.07,-194 1009.22,-194"/>
<text xml:space="preserve" text-anchor="start" x="1012.22" y="-199.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">loockit&#45;api / 8080 / mTLS</text>
</g>
<!-- proxy&#45;&gt;loockit_a -->
<g id="edge4" class="edge">
<title>proxy&#45;&gt;loockit_a</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1443.48,-224.26C1498.05,-237.95 1562.2,-254.03 1615.91,-267.5"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1614.96,-269.97 1622.88,-269.25 1616.24,-264.88 1614.96,-269.97"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1473.56,-260.1 1473.56,-282.9 1595.5,-282.9 1595.5,-260.1 1473.56,-260.1"/>
<text xml:space="preserve" text-anchor="start" x="1476.56" y="-265.9" font-family="Arial" font-size="14.00" fill="#bbfcd3">readyz / leaderのみ</text>
</g>
<!-- proxy&#45;&gt;loockit_b -->
<g id="edge5" class="edge">
<title>proxy&#45;&gt;loockit_b</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1443.48,-171.76C1497.94,-161.71 1561.93,-149.91 1615.58,-140.02"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1615.94,-142.63 1622.84,-138.68 1614.98,-137.46 1615.94,-142.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1473.56,-165.43 1473.56,-188.23 1595.5,-188.23 1595.5,-165.43 1473.56,-165.43"/>
<text xml:space="preserve" text-anchor="start" x="1476.56" y="-171.23" font-family="Arial" font-size="14.00" fill="#bbfcd3">readyz / leaderのみ</text>
</g>
<!-- loockit_a&#45;&gt;ble_a -->
<g id="edge6" class="edge">
<title>loockit_a&#45;&gt;ble_a</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1835.56,-308.22C1905.48,-316.44 1997.86,-327.3 2070.94,-335.88"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2070.35,-338.46 2078.11,-336.72 2070.97,-333.24 2070.35,-338.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1865.63,-331 1865.63,-353.8 2042.05,-353.8 2042.05,-331 1865.63,-331"/>
<text xml:space="preserve" text-anchor="start" x="1868.63" y="-336.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">read&#45;only D&#45;Bus / org.bluez</text>
</g>
<!-- loockit_a&#45;&gt;api -->
<g id="edge7" class="edge">
<title>loockit_a&#45;&gt;api</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1835.56,-274.28C1904.09,-259.96 1994.2,-241.14 2066.55,-226.03"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2066.87,-228.64 2073.68,-224.54 2065.8,-223.5 2066.87,-228.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1884.29,-267.64 1884.29,-290.44 2023.39,-290.44 2023.39,-267.64 1884.29,-267.64"/>
<text xml:space="preserve" text-anchor="start" x="1887.29" y="-273.44" font-family="Arial" font-size="14.00" fill="#bbfcd3">Lease leader election</text>
</g>
<!-- loockit_b&#45;&gt;api -->
<g id="edge9" class="edge">
<title>loockit_b&#45;&gt;api</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1835.57,-135.25C1895.94,-144.91 1973.39,-157.68 2042.05,-170.2 2050.08,-171.67 2058.34,-173.21 2066.67,-174.8"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2066.01,-177.35 2073.87,-176.18 2067,-172.19 2066.01,-177.35"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1884.29,-170.2 1884.29,-193 2023.39,-193 2023.39,-170.2 1884.29,-170.2"/>
<text xml:space="preserve" text-anchor="start" x="1887.29" y="-176" font-family="Arial" font-size="14.00" fill="#bbfcd3">Lease leader election</text>
</g>
<!-- loockit_b&#45;&gt;ble_b -->
<g id="edge8" class="edge">
<title>loockit_b&#45;&gt;ble_b</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1835.62,-83.25C1845.69,-80.56 1855.8,-78.14 1865.63,-76.2 1929.65,-63.58 2001.89,-57.01 2062.03,-53.61"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2061.97,-56.24 2069.31,-53.21 2061.68,-51 2061.97,-56.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1865.63,-76.2 1865.63,-99 2042.05,-99 2042.05,-76.2 1865.63,-76.2"/>
<text xml:space="preserve" text-anchor="start" x="1868.63" y="-82" font-family="Arial" font-size="14.00" fill="#bbfcd3">read&#45;only D&#45;Bus / org.bluez</text>
</g>
</g>
</svg>
`;case`recording`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2275pt" height="1025pt"
 viewBox="0.00 0.00 2275.00 1025.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1009.48)">
<g id="clust1" class="cluster">
<title>cluster_tnlastation</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="242.99,-316.42 242.99,-854.42 1782.83,-854.42 1782.83,-316.42 242.99,-316.42"/>
<text xml:space="preserve" text-anchor="start" x="250.99" y="-841.52" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TNLASTATION / 共通モデル</text>
</g>
<!-- resources -->
<g id="node1" class="node">
<title>resources</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="462.99,-504.43 282.99,-504.43 282.99,-404.42 462.99,-404.42 462.99,-504.43"/>
<text xml:space="preserve" text-anchor="start" x="322.98" y="-446.42" font-family="Arial" font-size="20.00" fill="#f8fafc">リソース定義</text>
</g>
<!-- gateway -->
<g id="node2" class="node">
<title>gateway</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="462.99,-697.43 282.99,-697.43 282.99,-597.42 462.99,-597.42 462.99,-697.43"/>
<text xml:space="preserve" text-anchor="start" x="333.53" y="-639.42" font-family="Arial" font-size="20.00" fill="#f8fafc">Gateway</text>
</g>
<!-- frontend -->
<g id="node3" class="node">
<title>frontend</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="758.83,-793.43 578.83,-793.43 578.83,-693.42 758.83,-693.42 758.83,-793.43"/>
<text xml:space="preserve" text-anchor="start" x="628.81" y="-735.42" font-family="Arial" font-size="20.00" fill="#f8fafc">Frontend</text>
</g>
<!-- backend -->
<g id="node4" class="node">
<title>backend</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="783.88,-601.43 553.78,-601.43 553.78,-501.42 783.88,-501.42 783.88,-601.43"/>
<text xml:space="preserve" text-anchor="start" x="563.79" y="-543.42" font-family="Arial" font-size="20.00" fill="#f8fafc">Backend / API・録画制御</text>
</g>
<!-- encode -->
<g id="node5" class="node">
<title>encode</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1267.91,-456.43 1050.02,-456.43 1050.02,-356.42 1267.91,-356.42 1267.91,-456.43"/>
<text xml:space="preserve" text-anchor="start" x="1060.03" y="-398.42" font-family="Arial" font-size="20.00" fill="#f8fafc">ffmpeg encode worker</text>
</g>
<!-- streaming -->
<g id="node6" class="node">
<title>streaming</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1279.01,-601.43 1038.92,-601.43 1038.92,-501.42 1279.01,-501.42 1279.01,-601.43"/>
<text xml:space="preserve" text-anchor="start" x="1048.93" y="-543.42" font-family="Arial" font-size="20.00" fill="#f8fafc">ffmpeg streaming worker</text>
</g>
<!-- mediamtx -->
<g id="node7" class="node">
<title>mediamtx</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1742.83,-697.43 1537.21,-697.43 1537.21,-597.42 1742.83,-597.42 1742.83,-697.43"/>
<text xml:space="preserve" text-anchor="start" x="1547.22" y="-639.42" font-family="Arial" font-size="20.00" fill="#f8fafc">MediaMTX / HLS配信</text>
</g>
<!-- edge -->
<g id="node8" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="180,-276.43 0,-276.43 0,-176.42 180,-176.42 180,-276.43"/>
<text xml:space="preserve" text-anchor="start" x="44.42" y="-218.42" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- epgstation -->
<g id="node9" class="node">
<title>epgstation</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="758.83,-276.43 578.83,-276.43 578.83,-176.42 758.83,-176.42 758.83,-276.43"/>
<text xml:space="preserve" text-anchor="start" x="616.58" y="-218.42" font-family="Arial" font-size="20.00" fill="#f8fafc">EPGStation</text>
</g>
<!-- mirakurun -->
<g id="node10" class="node">
<title>mirakurun</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1327.35,-276.43 990.58,-276.43 990.58,-176.42 1327.35,-176.42 1327.35,-276.43"/>
<text xml:space="preserve" text-anchor="start" x="1000.59" y="-218.42" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun Service / 本番LXCへの中継</text>
</g>
<!-- databases -->
<g id="node11" class="node">
<title>databases</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1730.6,-104.43 1549.44,-104.43 1549.44,-4.42 1730.6,-4.42 1730.6,-104.43"/>
<text xml:space="preserve" text-anchor="start" x="1559.45" y="-46.42" font-family="Arial" font-size="20.00" fill="#f8fafc">DB / アプリ共有基盤</text>
</g>
<!-- mirakurun_staging -->
<g id="node12" class="node">
<title>mirakurun_staging</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1278.45,-994.43 1039.49,-994.43 1039.49,-894.42 1278.45,-894.42 1278.45,-994.43"/>
<text xml:space="preserve" text-anchor="start" x="1049.49" y="-936.42" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun Service / STG</text>
</g>
<!-- tuner_prod -->
<g id="node13" class="node">
<title>tuner_prod</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2244.66,-994.43 1950.09,-994.43 1950.09,-894.42 2244.66,-894.42 2244.66,-994.43"/>
<text xml:space="preserve" text-anchor="start" x="1960.1" y="-936.42" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun本番 / CT12901・PT3</text>
</g>
<!-- tuner_stg -->
<g id="node14" class="node">
<title>tuner_stg</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1730.02,-994.43 1550.02,-994.43 1550.02,-894.42 1730.02,-894.42 1730.02,-994.43"/>
<text xml:space="preserve" text-anchor="start" x="1566.67" y="-936.42" font-family="Arial" font-size="20.00" fill="#f8fafc">Mirakurun STG /</text>
</g>
<!-- nas02 -->
<g id="node15" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2233,-95.34C2233,-100.35 2172.21,-104.43 2097.37,-104.43 2022.54,-104.43 1961.75,-100.35 1961.75,-95.34 1961.75,-95.34 1961.75,-13.51 1961.75,-13.51 1961.75,-8.5 2022.54,-4.42 2097.37,-4.42 2172.21,-4.42 2233,-8.5 2233,-13.51 2233,-13.51 2233,-95.34 2233,-95.34"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2233,-95.34C2233,-90.32 2172.21,-86.24 2097.37,-86.24 2022.54,-86.24 1961.75,-90.32 1961.75,-95.34"/>
<text xml:space="preserve" text-anchor="start" x="1971.75" y="-46.42" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM69002 / nas&#45;02</text>
</g>
<!-- gateway&#45;&gt;frontend -->
<g id="edge5" class="edge">
<title>gateway&#45;&gt;frontend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M462.95,-676.49C496.53,-687.46 534.93,-700 569.33,-711.24"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="568.1,-713.6 576.04,-713.44 569.73,-708.61 568.1,-713.6"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="490.99,-695.42 490.99,-718.22 525.78,-718.22 525.78,-695.42 490.99,-695.42"/>
<text xml:space="preserve" text-anchor="start" x="493.99" y="-701.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">Web</text>
</g>
<!-- gateway&#45;&gt;backend -->
<g id="edge6" class="edge">
<title>gateway&#45;&gt;backend</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M462.95,-618.36C488.45,-610.03 516.72,-600.79 543.92,-591.91"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="544.69,-594.42 551.01,-589.59 543.06,-589.43 544.69,-594.42"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="494.1,-608.02 494.1,-630.82 522.67,-630.82 522.67,-608.02 494.1,-608.02"/>
<text xml:space="preserve" text-anchor="start" x="497.1" y="-613.82" font-family="Arial" font-size="14.00" fill="#bbfcd3">API</text>
</g>
<!-- gateway&#45;&gt;mediamtx -->
<g id="edge7" class="edge">
<title>gateway&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M462.95,-647.42C687.91,-647.42 1279.2,-647.42 1527.11,-647.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1527.05,-650.05 1534.55,-647.42 1527.05,-644.8 1527.05,-650.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="870.61,-647.42 870.61,-670.22 903.85,-670.22 903.85,-647.42 870.61,-647.42"/>
<text xml:space="preserve" text-anchor="start" x="873.61" y="-653.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">HLS</text>
</g>
<!-- backend&#45;&gt;encode -->
<g id="edge8" class="edge">
<title>backend&#45;&gt;encode</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M783.66,-517.61C860.79,-494.7 962.47,-464.5 1040.38,-441.35"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1040.9,-443.94 1047.34,-439.29 1039.4,-438.91 1040.9,-443.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="849.6,-508.58 849.6,-531.38 924.87,-531.38 924.87,-508.58 849.6,-508.58"/>
<text xml:space="preserve" text-anchor="start" x="852.6" y="-514.38" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode制御</text>
</g>
<!-- backend&#45;&gt;streaming -->
<g id="edge9" class="edge">
<title>backend&#45;&gt;streaming</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M783.66,-551.42C857.13,-551.42 952.87,-551.42 1029.13,-551.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1028.75,-554.05 1036.25,-551.42 1028.75,-548.8 1028.75,-554.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="841.83,-551.42 841.83,-574.22 932.63,-574.22 932.63,-551.42 841.83,-551.42"/>
<text xml:space="preserve" text-anchor="start" x="844.83" y="-557.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">streaming制御</text>
</g>
<!-- backend&#45;&gt;mirakurun -->
<g id="edge10" class="edge">
<title>backend&#45;&gt;mirakurun</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M725.85,-501.48C787.56,-448.19 891.27,-363.59 990.58,-305.42 1004.95,-297.01 1020.36,-288.76 1035.81,-280.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1036.65,-283.47 1042.19,-277.77 1034.31,-278.78 1036.65,-283.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="855.05,-424.78 855.05,-447.58 919.41,-447.58 919.41,-424.78 855.05,-424.78"/>
<text xml:space="preserve" text-anchor="start" x="858.05" y="-430.58" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- backend&#45;&gt;databases -->
<g id="edge12" class="edge">
<title>backend&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M689.43,-501.48C712.05,-449.48 753.74,-368.61 811.88,-317.42 866.9,-269 915.87,-306.91 962.58,-250.42 997.43,-208.29 949.8,-167.05 990.58,-130.62 1030.68,-94.8 1367.58,-70.22 1539.27,-59.9"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1539.23,-62.53 1546.56,-59.46 1538.91,-57.29 1539.23,-62.53"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1117.84,-130.62 1117.84,-153.42 1200.1,-153.42 1200.1,-130.62 1117.84,-130.62"/>
<text xml:space="preserve" text-anchor="start" x="1120.84" y="-136.42" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- backend&#45;&gt;mirakurun_staging -->
<g id="edge11" class="edge">
<title>backend&#45;&gt;mirakurun_staging</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M719.01,-601.36C801.2,-684.54 960.47,-844.48 990.58,-865.42 1003.13,-874.16 1016.8,-882.37 1030.73,-889.96"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1029.39,-892.22 1037.25,-893.43 1031.86,-887.59 1029.39,-892.22"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="811.88,-839.84 811.88,-862.64 962.58,-862.64 962.58,-839.84 811.88,-839.84"/>
<text xml:space="preserve" text-anchor="start" x="814.88" y="-845.64" font-family="Arial" font-size="14.00" fill="#bbfcd3">STG環境のチューナーAPI</text>
</g>
<!-- encode&#45;&gt;databases -->
<g id="edge13" class="edge">
<title>encode&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1241.48,-356.56C1269.12,-339.05 1299.94,-318.89 1327.35,-299.42 1413.86,-237.99 1509.2,-161.71 1571.36,-110.73"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1572.68,-113.04 1576.81,-106.25 1569.35,-108.99 1572.68,-113.04"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1394.65,-274.25 1394.65,-297.05 1469.91,-297.05 1469.91,-274.25 1394.65,-274.25"/>
<text xml:space="preserve" text-anchor="start" x="1397.65" y="-280.05" font-family="Arial" font-size="14.00" fill="#bbfcd3">encode状態</text>
</g>
<!-- streaming&#45;&gt;mediamtx -->
<g id="edge14" class="edge">
<title>streaming&#45;&gt;mediamtx</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1278.89,-569.59C1346.67,-580.61 1433.03,-595.77 1509.21,-612.62 1515.26,-613.96 1521.46,-615.4 1527.7,-616.9"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1526.69,-619.35 1534.6,-618.58 1527.94,-614.25 1526.69,-619.35"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1417.61,-612.62 1417.61,-635.42 1446.95,-635.42 1446.95,-612.62 1417.61,-612.62"/>
<text xml:space="preserve" text-anchor="start" x="1420.61" y="-618.42" font-family="Arial" font-size="14.00" fill="#bbfcd3">配信</text>
</g>
<!-- edge&#45;&gt;gateway -->
<g id="edge2" class="edge">
<title>edge&#45;&gt;gateway</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M109.81,-276.38C134.68,-338.73 182.49,-446.94 242.99,-527.42 259.94,-549.97 281.42,-571.85 301.96,-590.61"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="300.2,-592.55 307.53,-595.62 303.71,-588.65 300.2,-592.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="208,-512.77 208,-535.57 234.99,-535.57 234.99,-512.77 208,-512.77"/>
<text xml:space="preserve" text-anchor="start" x="211" y="-520.97" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- edge&#45;&gt;epgstation -->
<g id="edge1" class="edge">
<title>edge&#45;&gt;epgstation</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.87,-226.42C284.88,-226.42 459.11,-226.42 568.49,-226.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="568.34,-229.05 575.84,-226.42 568.34,-223.8 568.34,-229.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="287.89,-226.42 287.89,-249.22 458.1,-249.22 458.1,-226.42 287.89,-226.42"/>
<text xml:space="preserve" text-anchor="start" x="290.89" y="-232.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">epgstation / 8888 / Access</text>
</g>
<!-- epgstation&#45;&gt;mirakurun -->
<g id="edge3" class="edge">
<title>epgstation&#45;&gt;mirakurun</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M758.8,-226.42C820.64,-226.42 905.17,-226.42 980.53,-226.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="980.1,-229.05 987.6,-226.42 980.1,-223.8 980.1,-229.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="855.05,-226.42 855.05,-249.22 919.41,-249.22 919.41,-226.42 855.05,-226.42"/>
<text xml:space="preserve" text-anchor="start" x="858.05" y="-232.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">tuner API</text>
</g>
<!-- epgstation&#45;&gt;databases -->
<g id="edge4" class="edge">
<title>epgstation&#45;&gt;databases</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M728.31,-176.59C789.21,-128.24 889.67,-58.11 990.58,-29.62 1178.87,23.54 1410.12,-6.85 1539.38,-31.88"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1538.82,-34.45 1546.69,-33.32 1539.84,-29.3 1538.82,-34.45"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1107.72,-29.62 1107.72,-52.42 1210.21,-52.42 1210.21,-29.62 1107.72,-29.62"/>
<text xml:space="preserve" text-anchor="start" x="1110.72" y="-35.42" font-family="Arial" font-size="14.00" fill="#bbfcd3">EPGStation DB</text>
</g>
<!-- mirakurun&#45;&gt;tuner_prod -->
<g id="edge15" class="edge">
<title>mirakurun&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1327.27,-199.03C1462.19,-186.23 1650.6,-190.37 1782.83,-282.62 1991.66,-428.32 2065.65,-751.12 2087.96,-884.73"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="2085.31,-884.81 2089.11,-891.79 2090.49,-883.97 2085.31,-884.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1563.09,-282.62 1563.09,-305.42 1716.95,-305.42 1716.95,-282.62 1563.09,-282.62"/>
<text xml:space="preserve" text-anchor="start" x="1566.09" y="-288.42" font-family="Arial" font-size="14.00" fill="#bbfcd3">EndpointSlice / 外部LXC</text>
</g>
<!-- databases&#45;&gt;nas02 -->
<g id="edge17" class="edge">
<title>databases&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1730.44,-54.42C1793.15,-54.42 1878.38,-54.42 1950.81,-54.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1950.41,-57.05 1957.91,-54.42 1950.41,-51.8 1950.41,-57.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1807.56,-54.42 1807.56,-77.22 1905.36,-77.22 1905.36,-54.42 1807.56,-54.42"/>
<text xml:space="preserve" text-anchor="start" x="1810.56" y="-60.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
<!-- mirakurun_staging&#45;&gt;tuner_stg -->
<g id="edge16" class="edge">
<title>mirakurun_staging&#45;&gt;tuner_stg</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1278.38,-944.42C1358.7,-944.42 1463.66,-944.42 1539.63,-944.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1539.62,-947.05 1547.12,-944.42 1539.62,-941.8 1539.62,-947.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1355.35,-944.42 1355.35,-967.22 1509.21,-967.22 1509.21,-944.42 1355.35,-944.42"/>
<text xml:space="preserve" text-anchor="start" x="1358.35" y="-950.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">EndpointSlice / 外部LXC</text>
</g>
<!-- tuner_stg&#45;&gt;tuner_prod -->
<g id="edge18" class="edge">
<title>tuner_stg&#45;&gt;tuner_prod</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1729.9,-944.42C1789.6,-944.42 1869.88,-944.42 1940.09,-944.42"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1939.85,-947.05 1947.35,-944.42 1939.85,-941.8 1939.85,-947.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1790.83,-944.42 1790.83,-967.22 1922.09,-967.22 1922.09,-944.42 1790.83,-944.42"/>
<text xml:space="preserve" text-anchor="start" x="1793.83" y="-950.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">BS/CS TCP fallback</text>
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
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1148.4,-363.91C1148.4,-368.93 1108.06,-373 1058.4,-373 1008.74,-373 968.4,-368.93 968.4,-363.91 968.4,-363.91 968.4,-282.09 968.4,-282.09 968.4,-277.07 1008.74,-273 1058.4,-273 1108.06,-273 1148.4,-277.07 1148.4,-282.09 1148.4,-282.09 1148.4,-363.91 1148.4,-363.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1148.4,-363.91C1148.4,-358.9 1108.06,-354.82 1058.4,-354.82 1008.74,-354.82 968.4,-358.9 968.4,-363.91"/>
<text xml:space="preserve" text-anchor="start" x="1019.5" y="-315" font-family="Arial" font-size="20.00" fill="#ffe0c2">MariaDB</text>
</g>
<!-- nas02 -->
<g id="node6" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1194.03,-213.91C1194.03,-218.93 1133.23,-223 1058.4,-223 983.56,-223 922.77,-218.93 922.77,-213.91 922.77,-213.91 922.77,-132.09 922.77,-132.09 922.77,-127.07 983.56,-123 1058.4,-123 1133.23,-123 1194.03,-127.07 1194.03,-132.09 1194.03,-132.09 1194.03,-213.91 1194.03,-213.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1194.03,-213.91C1194.03,-208.9 1133.23,-204.82 1058.4,-204.82 983.56,-204.82 922.77,-208.9 922.77,-213.91"/>
<text xml:space="preserve" text-anchor="start" x="932.78" y="-165" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM69002 / nas&#45;02</text>
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
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M676.81,-267.46C764.52,-280.26 877.44,-296.74 957.44,-308.41"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="956.73,-310.96 964.53,-309.45 957.49,-305.77 956.73,-310.96"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="724.96,-298.74 724.96,-321.54 892.77,-321.54 892.77,-298.74 724.96,-298.74"/>
<text xml:space="preserve" text-anchor="start" x="727.96" y="-304.54" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- web&#45;&gt;nas02 -->
<g id="edge4" class="edge">
<title>web&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M676.81,-228.54C748.82,-218.03 837.83,-205.04 911.66,-194.27"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="911.94,-196.88 918.98,-193.2 911.18,-191.69 911.94,-196.88"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="753.35,-219.42 753.35,-242.22 864.38,-242.22 864.38,-219.42 753.35,-219.42"/>
<text xml:space="preserve" text-anchor="start" x="756.35" y="-225.22" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
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
`;case`coupon`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="1410pt" height="355pt"
 viewBox="0.00 0.00 1410.00 355.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 340.06)">
<!-- edge -->
<g id="node1" class="node">
<title>edge</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="180,-175.01 0,-175.01 0,-75 180,-75 180,-175.01"/>
<text xml:space="preserve" text-anchor="start" x="44.42" y="-117" font-family="Arial" font-size="20.00" fill="#ffe0c2">Cloudflare</text>
</g>
<!-- web -->
<g id="node2" class="node">
<title>web</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="661.51,-175.01 481.51,-175.01 481.51,-75 661.51,-75 661.51,-175.01"/>
<text xml:space="preserve" text-anchor="start" x="528.71" y="-117" font-family="Arial" font-size="20.00" fill="#f8fafc">Web / :80</text>
</g>
<!-- resources -->
<g id="node3" class="node">
<title>resources</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="180,-325.01 0,-325.01 0,-225 180,-225 180,-325.01"/>
<text xml:space="preserve" text-anchor="start" x="39.99" y="-267" font-family="Arial" font-size="20.00" fill="#f8fafc">リソース定義</text>
</g>
<!-- nas02 -->
<g id="node4" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M707.14,-315.92C707.14,-320.93 646.35,-325.01 571.51,-325.01 496.67,-325.01 435.88,-320.93 435.88,-315.92 435.88,-315.92 435.88,-234.09 435.88,-234.09 435.88,-229.08 496.67,-225 571.51,-225 646.35,-225 707.14,-229.08 707.14,-234.09 707.14,-234.09 707.14,-315.92 707.14,-315.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M707.14,-315.92C707.14,-310.9 646.35,-306.82 571.51,-306.82 496.67,-306.82 435.88,-310.9 435.88,-315.92"/>
<text xml:space="preserve" text-anchor="start" x="445.89" y="-267" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM69002 / nas&#45;02</text>
</g>
<!-- api -->
<g id="node5" class="node">
<title>api</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="999.04,-175.01 819.04,-175.01 819.04,-75 999.04,-75 999.04,-175.01"/>
<text xml:space="preserve" text-anchor="start" x="859.56" y="-117" font-family="Arial" font-size="20.00" fill="#f8fafc">API / :8080</text>
</g>
<!-- postgres -->
<g id="node6" class="node">
<title>postgres</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1379.18,-240.92C1379.18,-245.93 1326.12,-250.01 1260.8,-250.01 1195.48,-250.01 1142.42,-245.93 1142.42,-240.92 1142.42,-240.92 1142.42,-159.09 1142.42,-159.09 1142.42,-154.08 1195.48,-150 1260.8,-150 1326.12,-150 1379.18,-154.08 1379.18,-159.09 1379.18,-159.09 1379.18,-240.92 1379.18,-240.92"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1379.18,-240.92C1379.18,-235.9 1326.12,-231.82 1260.8,-231.82 1195.48,-231.82 1142.42,-235.9 1142.42,-240.92"/>
<text xml:space="preserve" text-anchor="start" x="1152.43" y="-192" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL / 本番・STG</text>
</g>
<!-- ai -->
<g id="node7" class="node">
<title>ai</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1380.29,-100.01 1141.3,-100.01 1141.3,0 1380.29,0 1380.29,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="1151.31" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">Gemini API / OpenAI互換</text>
</g>
<!-- edge&#45;&gt;web -->
<g id="edge1" class="edge">
<title>edge&#45;&gt;web</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M179.79,-125C262.52,-125 385.67,-125 471.53,-125"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="471.29,-127.63 478.79,-125 471.29,-122.38 471.29,-127.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="210,-125 210,-147.8 405.88,-147.8 405.88,-125 210,-125"/>
<text xml:space="preserve" text-anchor="start" x="213" y="-130.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">coupon&#45;manager / 80 / Access</text>
</g>
<!-- web&#45;&gt;api -->
<g id="edge3" class="edge">
<title>web&#45;&gt;api</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M661.11,-125C706.5,-125 761.94,-125 808.77,-125"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="808.71,-127.63 816.21,-125 808.71,-122.38 808.71,-127.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="737.14,-125 737.14,-147.8 789.04,-147.8 789.04,-125 737.14,-125"/>
<text xml:space="preserve" text-anchor="start" x="740.14" y="-130.8" font-family="Arial" font-size="14.00" fill="#bbfcd3">内部API</text>
</g>
<!-- resources&#45;&gt;nas02 -->
<!-- api&#45;&gt;postgres -->
<g id="edge4" class="edge">
<title>api&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M998.75,-144.03C1038.93,-152.64 1087.2,-162.99 1131.25,-172.44"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1130.61,-174.99 1138.5,-173.99 1131.71,-169.85 1130.61,-174.99"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1029.04,-166.99 1029.04,-189.79 1111.3,-189.79 1111.3,-166.99 1029.04,-166.99"/>
<text xml:space="preserve" text-anchor="start" x="1032.04" y="-172.79" font-family="Arial" font-size="14.00" fill="#bbfcd3">PostgreSQL</text>
</g>
<!-- api&#45;&gt;ai -->
<g id="edge5" class="edge">
<title>api&#45;&gt;ai</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M998.75,-105.98C1038.93,-97.37 1087.2,-87.01 1131.25,-77.57"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1131.71,-80.15 1138.5,-76.02 1130.61,-75.02 1131.71,-80.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1047.33,-98.6 1047.33,-121.4 1093.01,-121.4 1093.01,-98.6 1047.33,-98.6"/>
<text xml:space="preserve" text-anchor="start" x="1050.33" y="-104.4" font-family="Arial" font-size="14.00" fill="#bbfcd3">AI API</text>
</g>
</g>
</svg>
`;case`storage`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 15.0.0 (0)
 -->
<!-- Pages: 1 -->
<svg width="2469pt" height="1381pt"
 viewBox="0.00 0.00 2469.00 1381.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1366.05)">
<g id="clust1" class="cluster">
<title>cluster_premises</title>
<polygon fill="#1c417d" stroke="#1c356c" points="8,-8 8,-1343 2169.48,-1343 2169.48,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-1330.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">自宅</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_home</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="48,-745 48,-1266 480.38,-1266 480.38,-745 48,-745"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-1253.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">TALOS / HOME&#45;K8S</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_hardware</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="116.36,-48 116.36,-409 412.02,-409 412.02,-48 116.36,-48"/>
<text xml:space="preserve" text-anchor="start" x="124.36" y="-396.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">物理・ネットワーク</text>
</g>
<g id="clust4" class="cluster">
<title>cluster_data</title>
<polygon fill="#3f3f3f" stroke="#2d2d2d" points="664.19,-48 664.19,-1282 2129.48,-1282 2129.48,-48 664.19,-48"/>
<text xml:space="preserve" text-anchor="start" x="672.19" y="-1269.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#d4d4d4" fill-opacity="0.701961">保存・バックアップ</text>
</g>
<g id="clust5" class="cluster">
<title>cluster_databases</title>
<polygon fill="#3e4651" stroke="#2d333d" points="704.19,-228 704.19,-589 1020.95,-589 1020.95,-228 704.19,-228"/>
<text xml:space="preserve" text-anchor="start" x="712.19" y="-576.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">DB / アプリ共有基盤</text>
</g>
<g id="clust6" class="cluster">
<title>cluster_backups</title>
<polygon fill="#3e4651" stroke="#2d333d" points="1714.94,-540 1714.94,-1221 2089.48,-1221 2089.48,-540 1714.94,-540"/>
<text xml:space="preserve" text-anchor="start" x="1722.94" y="-1208.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#cbd5e1" fill-opacity="0.701961">バックアップ処理</text>
</g>
<g id="clust7" class="cluster">
<title>cluster_nas</title>
<polygon fill="#5a3620" stroke="#462a17" points="1180.59,-540 1180.59,-901 1531.85,-901 1531.85,-540 1180.59,-540"/>
<text xml:space="preserve" text-anchor="start" x="1188.59" y="-888.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#f9b27c" fill-opacity="0.701961">TRUENAS VM ×2 / ZFS・NFS</text>
</g>
<g id="clust8" class="cluster">
<title>cluster_external</title>
<polygon fill="#194b9e" stroke="#1b3d88" points="2186.48,-360 2186.48,-545 2430.48,-545 2430.48,-360 2186.48,-360"/>
<text xml:space="preserve" text-anchor="start" x="2194.48" y="-532.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">外部サービス / SAAS・公開サービス</text>
</g>
<!-- nextcloud -->
<g id="node1" class="node">
<title>nextcloud</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="354.19,-885 174.19,-885 174.19,-785 354.19,-785 354.19,-885"/>
<text xml:space="preserve" text-anchor="start" x="219.72" y="-827" font-family="Arial" font-size="20.00" fill="#f8fafc">Nextcloud</text>
</g>
<!-- recording -->
<g id="node2" class="node">
<title>recording</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="440.38,-1045 88,-1045 88,-945 440.38,-945 440.38,-1045"/>
<text xml:space="preserve" text-anchor="start" x="98.01" y="-987" font-family="Arial" font-size="20.00" fill="#f8fafc">録画・配信 / EPGStation・TNLaStation</text>
</g>
<!-- local_store -->
<g id="node3" class="node">
<title>local_store</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M364.77,-1195.91C364.77,-1200.93 319.69,-1205 264.19,-1205 208.69,-1205 163.61,-1200.93 163.61,-1195.91 163.61,-1195.91 163.61,-1114.09 163.61,-1114.09 163.61,-1109.07 208.69,-1105 264.19,-1105 319.69,-1105 364.77,-1109.07 364.77,-1114.09 364.77,-1114.09 364.77,-1195.91 364.77,-1195.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M364.77,-1195.91C364.77,-1190.9 319.69,-1186.82 264.19,-1186.82 208.69,-1186.82 163.61,-1190.9 163.61,-1195.91"/>
<text xml:space="preserve" text-anchor="start" x="173.62" y="-1147" font-family="Arial" font-size="20.00" fill="#ffe0c2">VictoriaMetrics / 自宅</text>
</g>
<!-- x570 -->
<g id="node4" class="node">
<title>x570</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="363.12,-188 165.26,-188 165.26,-88 363.12,-88 363.12,-188"/>
<text xml:space="preserve" text-anchor="start" x="175.26" y="-130" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;x570 / Proxmox</text>
</g>
<!-- b550m -->
<g id="node5" class="node">
<title>b550m</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="372.02,-348 156.36,-348 156.36,-248 372.02,-248 372.02,-348"/>
<text xml:space="preserve" text-anchor="start" x="166.37" y="-290" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;b550m / Proxmox</text>
</g>
<!-- mariadb -->
<g id="node6" class="node">
<title>mariadb</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M952.57,-358.91C952.57,-363.93 912.23,-368 862.57,-368 812.91,-368 772.57,-363.93 772.57,-358.91 772.57,-358.91 772.57,-277.09 772.57,-277.09 772.57,-272.07 812.91,-268 862.57,-268 912.23,-268 952.57,-272.07 952.57,-277.09 952.57,-277.09 952.57,-358.91 952.57,-358.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M952.57,-358.91C952.57,-353.9 912.23,-349.82 862.57,-349.82 812.91,-349.82 772.57,-353.9 772.57,-358.91"/>
<text xml:space="preserve" text-anchor="start" x="823.67" y="-310" font-family="Arial" font-size="20.00" fill="#ffe0c2">MariaDB</text>
</g>
<!-- postgres -->
<g id="node7" class="node">
<title>postgres</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M980.95,-518.91C980.95,-523.93 927.89,-528 862.57,-528 797.25,-528 744.19,-523.93 744.19,-518.91 744.19,-518.91 744.19,-437.09 744.19,-437.09 744.19,-432.07 797.25,-428 862.57,-428 927.89,-428 980.95,-432.07 980.95,-437.09 980.95,-437.09 980.95,-518.91 980.95,-518.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M980.95,-518.91C980.95,-513.9 927.89,-509.82 862.57,-509.82 797.25,-509.82 744.19,-513.9 744.19,-518.91"/>
<text xml:space="preserve" text-anchor="start" x="754.2" y="-470" font-family="Arial" font-size="20.00" fill="#ffe0c2">PostgreSQL / 本番・STG</text>
</g>
<!-- db -->
<g id="node8" class="node">
<title>db</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2034.49,-680 1769.93,-680 1769.93,-580 2034.49,-580 2034.49,-680"/>
<text xml:space="preserve" text-anchor="start" x="1779.94" y="-622" font-family="Arial" font-size="20.00" fill="#f8fafc">DB logical dump / 自宅Talos</text>
</g>
<!-- recordings -->
<g id="node9" class="node">
<title>recordings</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2018.92,-1000 1785.5,-1000 1785.5,-900 2018.92,-900 2018.92,-1000"/>
<text xml:space="preserve" text-anchor="start" x="1795.51" y="-942" font-family="Arial" font-size="20.00" fill="#f8fafc">録画 / 自宅Talos CronJob</text>
</g>
<!-- metrics -->
<g id="node10" class="node">
<title>metrics</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2037.26,-1160 1767.16,-1160 1767.16,-1060 2037.26,-1060 2037.26,-1160"/>
<text xml:space="preserve" text-anchor="start" x="1777.17" y="-1102" font-family="Arial" font-size="20.00" fill="#f8fafc">metrics snapshot / 自宅Talos</text>
</g>
<!-- nas -->
<g id="node11" class="node">
<title>nas</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="2049.48,-840 1754.94,-840 1754.94,-740 2049.48,-740 2049.48,-840"/>
<text xml:space="preserve" text-anchor="start" x="1764.95" y="-782" font-family="Arial" font-size="20.00" fill="#f8fafc">NAS restic / 自宅Talos CronJob</text>
</g>
<!-- nas02 -->
<g id="node12" class="node">
<title>nas02</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1491.85,-830.91C1491.85,-835.93 1431.06,-840 1356.22,-840 1281.38,-840 1220.59,-835.93 1220.59,-830.91 1220.59,-830.91 1220.59,-749.09 1220.59,-749.09 1220.59,-744.07 1281.38,-740 1356.22,-740 1431.06,-740 1491.85,-744.07 1491.85,-749.09 1491.85,-749.09 1491.85,-830.91 1491.85,-830.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1491.85,-830.91C1491.85,-825.9 1431.06,-821.82 1356.22,-821.82 1281.38,-821.82 1220.59,-825.9 1220.59,-830.91"/>
<text xml:space="preserve" text-anchor="start" x="1230.6" y="-782" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM69002 / nas&#45;02</text>
</g>
<!-- nas01 -->
<g id="node13" class="node">
<title>nas01</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M1491.85,-670.91C1491.85,-675.93 1431.06,-680 1356.22,-680 1281.38,-680 1220.59,-675.93 1220.59,-670.91 1220.59,-670.91 1220.59,-589.09 1220.59,-589.09 1220.59,-584.07 1281.38,-580 1356.22,-580 1431.06,-580 1491.85,-584.07 1491.85,-589.09 1491.85,-589.09 1491.85,-670.91 1491.85,-670.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M1491.85,-670.91C1491.85,-665.9 1431.06,-661.82 1356.22,-661.82 1281.38,-661.82 1220.59,-665.9 1220.59,-670.91"/>
<text xml:space="preserve" text-anchor="start" x="1230.6" y="-622" font-family="Arial" font-size="20.00" fill="#ffe0c2">TrueNAS VM69001 / nas&#45;01</text>
</g>
<!-- shared -->
<g id="node14" class="node">
<title>shared</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="994.3,-729 730.84,-729 730.84,-629 994.3,-629 994.3,-729"/>
<text xml:space="preserve" text-anchor="start" x="740.85" y="-671" font-family="Arial" font-size="20.00" fill="#f8fafc">共有PV / runner cache・状態</text>
</g>
<!-- pbs -->
<g id="node15" class="node">
<title>pbs</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M980.4,-178.91C980.4,-183.93 927.58,-188 862.57,-188 797.56,-188 744.74,-183.93 744.74,-178.91 744.74,-178.91 744.74,-97.09 744.74,-97.09 744.74,-92.07 797.56,-88 862.57,-88 927.58,-88 980.4,-92.07 980.4,-97.09 980.4,-97.09 980.4,-178.91 980.4,-178.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M980.4,-178.91C980.4,-173.9 927.58,-169.82 862.57,-169.82 797.56,-169.82 744.74,-173.9 744.74,-178.91"/>
<text xml:space="preserve" text-anchor="start" x="754.75" y="-130" font-family="Arial" font-size="20.00" fill="#ffe0c2">Proxmox Backup Server</text>
</g>
<!-- idrive -->
<g id="node16" class="node">
<title>idrive</title>
<path fill="#a35829" stroke="#7e451d" stroke-width="2" d="M2398.48,-482.91C2398.48,-487.93 2358.15,-492 2308.48,-492 2258.82,-492 2218.48,-487.93 2218.48,-482.91 2218.48,-482.91 2218.48,-401.09 2218.48,-401.09 2218.48,-396.07 2258.82,-392 2308.48,-392 2358.15,-392 2398.48,-396.07 2398.48,-401.09 2398.48,-401.09 2398.48,-482.91 2398.48,-482.91"/>
<path fill="none" stroke="#7e451d" stroke-width="2" d="M2398.48,-482.91C2398.48,-477.9 2358.15,-473.82 2308.48,-473.82 2258.82,-473.82 2218.48,-477.9 2218.48,-482.91"/>
<text xml:space="preserve" text-anchor="start" x="2247.9" y="-434" font-family="Arial" font-size="20.00" fill="#ffe0c2">IDrive e2 / S3</text>
</g>
<!-- nextcloud&#45;&gt;mariadb -->
<g id="edge1" class="edge">
<title>nextcloud&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M299.13,-785.07C361.79,-696.21 503.97,-509.49 664.19,-398 693.75,-377.43 729.38,-360.94 762.19,-348.39"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="762.88,-350.94 768.98,-345.85 761.04,-346.02 762.88,-350.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="488.38,-547.01 488.38,-569.81 656.19,-569.81 656.19,-547.01 488.38,-547.01"/>
<text xml:space="preserve" text-anchor="start" x="491.38" y="-552.81" font-family="Arial" font-size="14.00" fill="#bbfcd3">MYSQL_HOST / MariaDB</text>
</g>
<!-- nextcloud&#45;&gt;nas02 -->
<g id="edge2" class="edge">
<title>nextcloud&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M353.97,-832.07C394.89,-830.85 444.1,-829.6 488.38,-829 562.96,-828 581.62,-827.52 656.19,-829 824.34,-832.33 866.15,-840.67 1034.3,-844 1095.75,-845.22 1111.76,-852.8 1172.59,-844 1184.79,-842.23 1197.31,-839.84 1209.8,-837.03"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1210.15,-839.65 1216.85,-835.38 1208.95,-834.53 1210.15,-839.65"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="807.05,-843.65 807.05,-866.45 918.09,-866.45 918.09,-843.65 807.05,-843.65"/>
<text xml:space="preserve" text-anchor="start" x="810.05" y="-849.45" font-family="Arial" font-size="14.00" fill="#bbfcd3">html・data / NFS</text>
</g>
<!-- recording&#45;&gt;mariadb -->
<g id="edge3" class="edge">
<title>recording&#45;&gt;mariadb</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M440.19,-948.44C455.21,-939.23 468.99,-928.2 480.38,-915 491.59,-902 482.25,-893.24 488.38,-877.2 541.83,-737.3 614.51,-728.84 656.19,-585 661.98,-565.02 652.21,-415 664.19,-398 686.98,-365.69 725.18,-346.41 761.93,-334.92"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="762.38,-337.52 768.83,-332.88 760.89,-332.48 762.38,-337.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="521.04,-877.2 521.04,-900 623.53,-900 623.53,-877.2 521.04,-877.2"/>
<text xml:space="preserve" text-anchor="start" x="524.04" y="-883" font-family="Arial" font-size="14.00" fill="#bbfcd3">EPGStation DB</text>
</g>
<!-- recording&#45;&gt;postgres -->
<g id="edge4" class="edge">
<title>recording&#45;&gt;postgres</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M440.13,-968.96C537.28,-952.73 641.51,-931.66 656.19,-914 669.77,-897.68 651.14,-548.74 664.19,-532 681.36,-509.98 706.6,-496.39 733.32,-488.13"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="733.81,-490.72 740.31,-486.15 732.38,-485.67 733.81,-490.72"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="558.79,-959.32 558.79,-982.12 585.78,-982.12 585.78,-959.32 558.79,-959.32"/>
<text xml:space="preserve" text-anchor="start" x="561.79" y="-967.52" font-family="Arial" font-weight="bold" font-size="14.00" fill="#bbfcd3">[...]</text>
</g>
<!-- recording&#45;&gt;recordings -->
<g id="edge6" class="edge">
<title>recording&#45;&gt;recordings</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M440.23,-1015.3C509.83,-1022.42 590.69,-1029.51 664.19,-1033 1071.01,-1052.33 1552.24,-997.74 1775.64,-967.94"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1775.67,-970.59 1782.75,-966.99 1774.97,-965.39 1775.67,-970.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1044.43,-1033.02 1044.43,-1055.82 1162.46,-1055.82 1162.46,-1033.02 1044.43,-1033.02"/>
<text xml:space="preserve" text-anchor="start" x="1047.43" y="-1038.82" font-family="Arial" font-size="14.00" fill="#ffe0c2">録画ファイル専用job</text>
</g>
<!-- recording&#45;&gt;nas02 -->
<g id="edge5" class="edge">
<title>recording&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M440.33,-996.72C456.57,-996.83 472.78,-996.93 488.38,-997 562.96,-997.33 582.22,-1006.51 656.19,-997 891.48,-966.75 947.09,-935.64 1172.59,-862 1191.3,-855.89 1210.86,-848.88 1229.94,-841.67"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1230.65,-844.21 1236.73,-839.09 1228.79,-839.3 1230.65,-844.21"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="772.04,-994.98 772.04,-1017.78 953.1,-1017.78 953.1,-994.98 772.04,-994.98"/>
<text xml:space="preserve" text-anchor="start" x="775.04" y="-1000.78" font-family="Arial" font-size="14.00" fill="#bbfcd3">録画・thumbnail・drop / NFS</text>
</g>
<!-- local_store&#45;&gt;metrics -->
<g id="edge8" class="edge">
<title>local_store&#45;&gt;metrics</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M365.68,-1190.64C445.41,-1216.54 560.34,-1248.63 664.19,-1258 1060.85,-1293.8 1526.89,-1201.53 1757.28,-1146.9"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1757.76,-1149.49 1764.45,-1145.19 1756.55,-1144.38 1757.76,-1149.49"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1034.3,-1259.3 1034.3,-1282.1 1172.59,-1282.1 1172.59,-1259.3 1034.3,-1259.3"/>
<text xml:space="preserve" text-anchor="start" x="1037.3" y="-1265.1" font-family="Arial" font-size="14.00" fill="#ffe0c2">snapshot / vmbackup</text>
</g>
<!-- local_store&#45;&gt;nas02 -->
<g id="edge7" class="edge">
<title>local_store&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M365.54,-1179.83C543.14,-1217.79 918.04,-1270.54 1172.59,-1114 1268.13,-1055.25 1318.1,-927.06 1340.35,-850.71"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1342.83,-851.59 1342.36,-843.66 1337.78,-850.16 1342.83,-851.59"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="800.84,-1219.94 800.84,-1242.74 924.3,-1242.74 924.3,-1219.94 800.84,-1219.94"/>
<text xml:space="preserve" text-anchor="start" x="803.84" y="-1225.74" font-family="Arial" font-size="14.00" fill="#bbfcd3">metrics用NFS PVC</text>
</g>
<!-- x570&#45;&gt;pbs -->
<g id="edge9" class="edge">
<title>x570&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M363,-138C464.18,-138 622.65,-138 733.7,-138"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="733.44,-140.63 740.94,-138 733.44,-135.38 733.44,-140.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="534.27,-138 534.27,-160.8 610.3,-160.8 610.3,-138 534.27,-138"/>
<text xml:space="preserve" text-anchor="start" x="537.27" y="-143.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- b550m&#45;&gt;pbs -->
<g id="edge10" class="edge">
<title>b550m&#45;&gt;pbs</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M371.81,-269.4C473.26,-242.18 626.01,-201.2 733.9,-172.25"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="734.38,-174.84 740.95,-170.36 733.02,-169.77 734.38,-174.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="534.27,-237.04 534.27,-259.84 610.3,-259.84 610.3,-237.04 534.27,-237.04"/>
<text xml:space="preserve" text-anchor="start" x="537.27" y="-242.84" font-family="Arial" font-size="14.00" fill="#ffe0c2">VM backup</text>
</g>
<!-- postgres&#45;&gt;db -->
<g id="edge11" class="edge">
<title>postgres&#45;&gt;db</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1020.94,-484.41C1069.59,-486.72 1123.33,-489.61 1172.59,-493 1332.52,-504 1374.22,-495.84 1531.85,-525 1543.74,-527.2 1660.92,-560.67 1760.15,-589.24"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1759.15,-591.68 1767.09,-591.23 1760.61,-586.64 1759.15,-591.68"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1255.77,-482.86 1255.77,-505.66 1398.72,-505.66 1398.72,-482.86 1255.77,-482.86"/>
<text xml:space="preserve" text-anchor="start" x="1258.77" y="-488.66" font-family="Arial" font-size="14.00" fill="#ffe0c2">整合性あるlogical dump</text>
</g>
<!-- postgres&#45;&gt;nas02 -->
<g id="edge12" class="edge">
<title>postgres&#45;&gt;nas02</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M1020.95,-504.81C1094.41,-518.07 1167.06,-532.58 1172.59,-539 1185.01,-553.41 1169.95,-694.24 1180.59,-710 1188.86,-722.24 1199.49,-732.63 1211.42,-741.46"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1209.73,-743.48 1217.38,-745.6 1212.72,-739.17 1209.73,-743.48"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1079.47,-601.13 1079.47,-623.93 1177.26,-623.93 1177.26,-601.13 1079.47,-601.13"/>
<text xml:space="preserve" text-anchor="start" x="1082.47" y="-606.93" font-family="Arial" font-size="14.00" fill="#bbfcd3">DB用NFS PVC</text>
</g>
<!-- nas&#45;&gt;idrive -->
<g id="edge16" class="edge">
<title>nas&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M2089.48,-755.18C2118.3,-744.05 2146.19,-729.37 2169.48,-710 2234.39,-656.04 2272.28,-563.71 2291.44,-502.77"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="2293.89,-503.73 2293.58,-495.79 2288.87,-502.19 2293.89,-503.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="2037.44,-623.32 2037.44,-646.12 2225.5,-646.12 2225.5,-623.32 2037.44,-623.32"/>
<text xml:space="preserve" text-anchor="start" x="2040.44" y="-629.12" font-family="Arial" font-size="14.00" fill="#ffe0c2">用途別prefix / 暗号化・retention</text>
</g>
<!-- nas02&#45;&gt;nas -->
<g id="edge15" class="edge">
<title>nas02&#45;&gt;nas</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M1492.74,-790C1569.24,-790 1665.18,-790 1744.86,-790"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="1744.46,-792.63 1751.96,-790 1744.46,-787.38 1744.46,-792.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1563.2,-790 1563.2,-812.8 1683.58,-812.8 1683.58,-790 1563.2,-790"/>
<text xml:space="preserve" text-anchor="start" x="1566.2" y="-795.8" font-family="Arial" font-size="14.00" fill="#ffe0c2">対象dataset / restic</text>
</g>
<!-- shared&#45;&gt;nas01 -->
<g id="edge13" class="edge">
<title>shared&#45;&gt;nas01</title>
<path fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="5,2" d="M994.03,-666C1060.33,-659.39 1141.1,-651.34 1209.43,-644.53"/>
<polygon fill="#15803d" stroke="#15803d" stroke-width="2" points="1209.64,-647.15 1216.84,-643.79 1209.12,-641.92 1209.64,-647.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1039.75,-661.75 1039.75,-684.55 1167.14,-684.55 1167.14,-661.75 1039.75,-661.75"/>
<text xml:space="preserve" text-anchor="start" x="1042.75" y="-667.55" font-family="Arial" font-size="14.00" fill="#bbfcd3">runner cache / NFS</text>
</g>
<!-- pbs&#45;&gt;idrive -->
<g id="edge14" class="edge">
<title>pbs&#45;&gt;idrive</title>
<path fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5,2" d="M981.12,-162.75C1258.34,-221.11 1949.01,-366.53 2207.62,-420.97"/>
<polygon fill="#b45309" stroke="#b45309" stroke-width="2" points="2206.91,-423.51 2214.79,-422.48 2207.99,-418.37 2206.91,-423.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1539.85,-314.46 1539.85,-337.26 1706.94,-337.26 1706.94,-314.46 1539.85,-314.46"/>
<text xml:space="preserve" text-anchor="start" x="1542.85" y="-320.26" font-family="Arial" font-size="14.00" fill="#ffe0c2">S3 datastore / VM backup</text>
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
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1681.37,-260.01 1483.51,-260.01 1483.51,-160 1681.37,-160 1681.37,-260.01"/>
<text xml:space="preserve" text-anchor="start" x="1493.51" y="-202" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;x570 / Proxmox</text>
</g>
<!-- b550m -->
<g id="node8" class="node">
<title>b550m</title>
<polygon fill="#64748b" stroke="#475569" stroke-width="0" points="1690.27,-100.01 1474.62,-100.01 1474.62,0 1690.27,0 1690.27,-100.01"/>
<text xml:space="preserve" text-anchor="start" x="1484.62" y="-42" font-family="Arial" font-size="20.00" fill="#f8fafc">pve&#45;b550m / Proxmox</text>
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
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1119.53,-526.12C1136.01,-513.72 1151.84,-499.26 1163.97,-483 1197.56,-438.02 1165.56,-404.13 1203.97,-363.2 1275.25,-287.26 1389.43,-248 1473.57,-228.34"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1473.99,-230.94 1480.72,-226.71 1472.83,-225.82 1473.99,-230.94"/>
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
<path fill="none" stroke="#ac4d39" stroke-width="2" d="M1060.48,-353.05C1090.95,-305.27 1142.64,-234.17 1203.97,-190.2 1282.43,-133.96 1386.08,-97.6 1464.91,-76.04"/>
<polygon fill="#ac4d39" stroke="#ac4d39" stroke-width="2" points="1465.41,-78.62 1471.97,-74.14 1464.04,-73.55 1465.41,-78.62"/>
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
<path fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,2" d="M1483.69,-231.01C1361.81,-261.63 1178.81,-325.72 1249.5,-423.4 1293.95,-484.84 1374.03,-512.44 1444.51,-524.58"/>
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