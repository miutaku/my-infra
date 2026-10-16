# ネットワーク構成

構成モデルのネットワーク設定と表現上の制約。

| 対象 | 構成 |
| --- | --- |
| IX2215 Ansible `ansible/ix2215/group_vars/all.yml` | GigaEthernet2.0はnative、dot1q 10/20/30/31/40。IoTはGigaEthernet2.4/BVI4でタグ40。guest ACLで他VLAN横断を拒否 |
| UniFi OS VM内のNetwork DB | US-8-60W、管理IP 192.168.0.252。VLAN10/20/30/31/40のnetwork定義。Port4 native30 / tagged auto。Port5/6/7 native10 / tagged block_all |
| PVE interfaces / bridge vlan / ゲストconfig | 管理はnative 192.168.0.115 / .119。vmbr0とvmbr0v20/v30/v40、物理NICのVLAN subinterface。`bridge-vlan-aware yes` の構成ではない |
| IX2215 DHCP宣言 | FS AP管理 192.168.0.253、native VLAN1。SWのVLAN10向け予約も存在するが、それを実際の管理IPと断定しない |

図の「宅内Ethernet」は共有LAN接続を表す。SW/APの接続関係は構成上の役割を表し、ケーブルポートは未確認としている。

未確認: ルーター各LANポートとPVE/SW間の正確な結線、FS APの型番と現在のSSID/VLAN割当。SSID名・パスワードは取得・掲載しない。設定上のトランクと無線側の割当を混同しない。
