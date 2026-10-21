# Loockit LXC host configuration

Loockit LXC 12902/12903は非特権・bridge networkで動かす。Bluetooth kernel moduleとBlueZは
各Proxmox hostが所有し、このunitが`org.bluez`だけを許可したD-Bus socketを作る。

両instanceはCloudflare Durable Objectsの単一Leaseへ参加する。leaderだけがBLEへ接続して
`/readyz`を200にし、standbyは503を返す。各LXCのHAProxyと専用Cloudflare Tunnelが
leaderへ公開REST APIを転送する。KubernetesのAPI・etcd・Pod・Service・クラスタDNSを
公開APIの実行経路から外す。LAN内の旧Kubernetes Serviceは互換用に残す。

Leaseは`workers/maintenance-control`の`LoockitLease`が永続化し、メンテナンス制御用DOとは
分離する。現行Loockit imageのLeaseクライアントを変更せず使うため、固定した1個の
Kubernetes Lease形式のAPIだけを提供する。これはKubernetesのproxyではない。
認証tokenごとにholder identityを固定し、resourceVersionによるCAS、サーバー時刻、
15秒の期限で競合を防ぐ。通信断時のBLE fencing・activation timeout・不健全時の譲渡は
Loockit側の既存実装を維持する。外部コーディネータやインターネットの障害時はfail closedになる。

`/etc/loockit/coordinator`にはhost・namespace・専用token・公開CA bundleだけを置く。
旧変数名`KUBERNETES_SERVICE_HOST/PORT_HTTPS`は互換用で、接続先は独立Workerの専用ドメイン`loockit-lease.miutaku.work:443`。
機械クライアントのUser-AgentがBrowser Integrity Checkで拒否されないよう、
この専用hostnameだけBIC/UAチェックを除外する。Workerのtoken認証と他のWAFルールは維持する。
Tunnel tokenは別ファイル`/etc/loockit/tunnel-token`へ置き、BLE containerへは渡さない。
DockerのDNSは公開resolverを指定してクラスタDNSへの依存も除く。
操作履歴は従来どおり無効。IDrive e2へのデータ移行は行わない。

```bash
sudo install -m 0644 loockit-dbus-proxy.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now loockit-dbus-proxy.service
```

CTには次のread-only bind mountが必要。

```text
mp0: /run/loockit-dbus,mp=/mnt/host-dbus,ro=1
```

Loockitの鍵はGitへ保存せず、BWS/ExternalSecretから`/etc/loockit/loockit.env`へmode 0600で
materializeする。OCIは同socketを`/run/dbus/system_bus_socket`へread-only mountする。

`image.env`がproduction imageの唯一のversion指定である。日次の
`loockit-version-watch.yml`がupstream releaseを検出してPRを作成し、merge後にLAN内runner上の
`loockit-lxc-deploy.yml`がこのplaybookを実行する。新containerが120秒以内にreadyにならなければ、
deploy scriptは直前containerへ自動rollbackする。

BLE接続の観測ログは`LOOCKIT_LOG_LEVEL`で制御する。LXCデプロイ時の既定は`INFO`で、
scan、GATT接続、ログイン待機の開始・終了と経過時間だけを接続試行時に記録する。
定常時のログ量をさらに抑える場合は`WARNING`、一時的な詳細調査では`DEBUG`を指定する。

CIのSSH accountはshellを公開しない。`authorized_keys`のforced commandとsudoersを組み合わせ、
root所有の`deploy-loockit-local`だけを実行できる。script自身もimageを
`ghcr.io/miutaku/loockit:<semver>`へ制限する。accountを`docker` groupへ所属させてはならない。

公開APIはintercom-botのclickだけを公開するため、productionは
`LOOCKIT_REQUIRED_DEVICES=intercom-bot`を指定する。この機器がofflineなら
`/readyz`を503にし、leaderは接続回復を待った後に待機系へ譲る。玄関錠だけが
onlineの状態で、インターホンAPIを使えないleaderが残り続けることを防ぐ。
BLE接続・login・切断とactivationはそれぞれ時間制限を持つ。


## 独立構成への初回移行

1. Workerの`npm run check && npm test`、Ansible syntax check、Terraform validate/Planを確認する。
2. Terraformで専用Tunnelとingressを作成する。初回準備時は一時的に
   `loockit_independent_tunnel_enabled=false`として既存DNSを変更しない。
3. BSM認証済み端末で`python3 workers/maintenance-control/setup-loockit.py --deploy`を実行する。
   ホスト別tokenをBSMの`LOOCKIT_COORDINATOR_TOKENS_JSON`に作り、Worker secretへ標準入力で渡す。
   token値はログに出さない。既存のBot/maintenance secretsは維持する。
4. `ansible-playbook -i hosts.yml independent.yml --check`を確認後、同じplaybookを適用する。
   これは既存のBLE containerを再起動せず、資格情報・proxy・Tunnel・将来のdeploy scriptだけを準備する。
5. `python3 scripts/migrate-loockit-coordinator.py`で状態を確認し、`--execute`で切り替える。
   旧standbyを停止→旧activeを新coordinatorへ変更→その接続先を確認→standbyも新系で起動する。
   **旧Kubernetes Leaseと新DO Leaseのownerを同時に起動しない。** 切替中はBLE再接続・交代に数分かかる場合がある。確認の上限は480秒。
   個別deploy scriptだけで初回移行してはならない。通常のimage更新では両者は同じDOを使う。
6. 両connectorがCloudflareへ接続し、両LXCの`http://127.0.0.1:18080/readyz`が200であること、
   BLE leaderが1台であることを確認する。
7. `loockit_independent_tunnel_enabled=true`へ変更し、Planが既存Loockit DNSのcontent変更だけで
   あることを確認してmainへpushする。既存DNS resourceの削除・再作成は行わない。
   他のhome-k8sサービスのDNSやTunnelは移さない。mTLS・clickのみの公開・rate limitを維持する。
8. 両Loockitプロセスのnetwork namespaceでKubernetes VIPへの経路を一時遮断し、
   Lease更新・leader readiness・LXC内proxyが維持されることを確認して遮断を解除する。
   本番Kubernetesの停止や実際のclick/unlockはテストで実行しない。

`independent.yml`を含む通常の`site.yml`による再構築も可能。
資格情報はAnsibleのメモリとroot専用の実行先ファイルだけで扱い、ローカル一時メモに保存しない。
将来のrelease CIはKubernetes ServiceではなくLXCのreadinessで完了を判定する。
image.envの更新だけで自動再deployし、文書・構成準備の変更で不要なBLE再接続を起こさない。
構成変更はAnsibleで配備し、手動のimage再deployはworkflow_dispatchを使う。

## ロールバックと限界

DNSだけのロールバックは`loockit_independent_tunnel_enabled=false`としてTerraformで適用する。
その場合もBLE側はDO Leaseを使い続けるので、旧Kubernetes経路が必要になるだけで
二重leaderは生まれない。旧Kubernetes SAとServiceは切替確認中は削除しない。

選出方式をKubernetesへ戻す場合は、両BLE containerを停止してから、両者の接続先とcredentialを
旧系へ揃えて再開する。片側だけ旧選出方式へ戻す操作は禁止。初回切替中に個別deployがrollback
した場合、もう一方を新系で起動せず状態を調べる。

BLEの電波干渉、物理機器、LAN/ルーター・インターネット・Cloudflareの障害は残る。
PVE同時停止には対応しない。KubernetesとNASの保護条件を外す変更ではないため、
PVEの再起動には別途Kubernetes VM・共有ストレージの保護が必要。
