# ネットワーク構成

構成モデルのネットワーク設定と表現上の制約。

| 対象 | 構成 |
| --- | --- |
| IX2215 Ansible `ansible/ix2215/group_vars/all.yml` | GigaEthernet2.0はnative、dot1q 10/20/30/31/40。IoTはGigaEthernet2.4/BVI4でタグ40。guest ACLで他VLAN横断を拒否 |
| UniFi OS VM内のNetwork DB | US-8-60W、管理IP 192.168.0.252。VLAN10/20/30/31/40のnetwork定義。Port4 native30 / tagged auto。Port5/6/7 native10 / tagged block_all |
| PVE interfaces / bridge vlan / ゲストconfig | 管理はnative 192.168.0.115 / .119。vmbr0とvmbr0v20/v30/v40、物理NICのVLAN subinterface。`bridge-vlan-aware yes` の構成ではない |
| IX2215 DHCP宣言 | FS AP管理 192.168.0.253、native VLAN1。SWのVLAN10向け予約も存在するが、それを実際の管理IPと断定しない |

図の「宅内Ethernet」は共有LAN接続を表す。SWとAPの線は共有LANへの参加を表し、SWとAPが直接結線されているとは断定しない。ケーブルポートは未確認としている。

未確認: ルーター各LANポートとPVE/SW間の正確な結線、FS APの型番と現在のSSID/VLAN割当。SSID名・パスワードは取得・掲載しない。設定上のトランクと無線側の割当を混同しない。

## VLANビューの所属情報

所属はVLAN枠への包含で表す。PVEゲストは`deployment.c4`のNICメタデータからVLAN別に集約し、元のVM/LXC IDへ対応付ける。VMの配置階層は変更しない。物理端末・IoT機器はIX2215の固定割当から機能別に要約し、予約の全IPを各セグメントのmetadataに残す。DHCP予約の存在は現在の接続・稼働を保証しない。

- VLAN10: home-k8s RPi worker03/04、NUT Pi、NanoKVM、NUCBox等の管理端末。RPiの`.107/.109`はTalos設定と既存のTalos設定を優先し、DHCPコメントのretired表記を図へ転記しない。
- VLAN30: 物理PC・クライアントNIC、WoL用Pi、Windows作業環境。
- VLAN40: TV・ゲーム機、照明・リモコン・カメラ・SESAME・プラグ・センサー、MagicMirror表示端末。
- VLAN20: サーバ群に加え、MetalLB Service IP poolとAPI/LBのVIP。

APの管理IPと各SSIDのVLAN所属は別。未取得のSSID割当を推測して描かない。MACアドレス・無線パスワード等は生成モデルへ含めない。
