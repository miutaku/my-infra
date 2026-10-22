# home-k8sの配置方針

2026-10-22更新。特定のPVE・RPi・platformを既定の配置先にしない。性能が必要な重いrunnerはPVE workerを使う。
RPiの一律なNoSchedule taintを撤去し、リソース要求に合うworkerからKubernetesが選択する。
既存Podを一斉に退避させる操作は行わない。再作成・スケール・既存deschedulerの対象だけが順次配置される。
この方針はPodの配置に適用する。PVE上のVM・LXCの物理デバイスやディスクは移動しない。

## 変更

- Argo CD全コンポーネントのPVE限定とRedisのノード名allowlistを撤去。HAは物理failure-domainで分散する。
- home-service-monitor、MagicMirror、Terraform agentsの不要なCPU・control-plane限定を撤去。
- descheduler・バックアップ検証CronJobのPVE限定を撤去。
- TNLAStationのencode/streamingのCPU限定・ホスト優先、staging encodeの4GB RPi固定を撤去。
- ARCの特定PVE優先とCPUアーキテクチャ固定を撤去。BWSはCPUに応じて同じ版を取得する。
- runnerのnativeなhome/toolキャッシュはPod内へ分離する。共有NFSの既存キャッシュは削除しない。
- その他のCoreDNS、Metrics Server、Secret管理、vmagent等もRPiを標準の配置候補に含む。

## 維持する制約

| 対象 | 条件と理由 |
| --- | --- |
| Reventer汎用 / Codex実行用runner | CPU性能・メモリを要するためPVE workerに限定。片方のPVEを優先する指定はしない。 |
| MetalLB speaker / L2Advertisement | VLAN20に接続したnode。VLAN10からVLAN20のVIPをL2広告しない。 |
| WoL | hostNetworkの既存LAN区間（VLAN20）を維持。特定PVEは指定しない。 |
| home-vip-monitor | control-plane上のVIPを観測するDaemonSetなのでcontrol-planeを指定。 |
| Mirakurun / LoockitのLXCと旧Mirakurun定義 | PT3・DVB・USB Bluetooth・BlueZへの物理依存。 |

Kubernetesの配置判定は`requests`を使い、`limits`の値でノードを選別しない。
[公式のリソース管理仕様](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-requests-are-scheduled)を参照。
重いrunnerのrequestsは1 CPU / 1Gi（Codex runnerは補助container分を加算）、limitsは2 CPU / 4Giなので、
RPi 4GBにも配置され得る。同じコア数でもRPiとPVEの処理性能の差は判定されないため、
この2種類だけはPVE workerを明示する。軽量なreader・review・配備runnerは自由配置を維持する。

共有NFSへのアクセスは特定nodeのローカルディスクではないため、それだけでPVEに固定しない。
アプリのCPU・メモリ要求、対応image、PDBやHA制約は引き続き守る。
配置の自由度を広げても、etcd quorum、NAS停止や単一replicaアプリの無停止を保証するものではない。

## 検証と反映

`ruby scripts/check-home-placement.rb`はhome-k8sのYAMLと埋込Helm valuesを検査し、
不要なplatform/hostname固定・PVE専用topology・未登録のCPU制約をCIで拒否する。
OCIへ配備するreventer-gitopsの設定は別クラスタなので検査対象外。

イメージのmanifestを全container/initContainerについて確認した。Docker Hubの取得制限時は
公式タグAPI、非公開EPGStationは既存imagePullSecretによる認証でamd64/arm64対応を確認した。
資格情報は保存・表示しない。

通常のアプリはGitOpsで反映する。Argo CD本体はbootstrap管理なので、検証後に
`kubectl --context home-k8s apply --server-side -k k8s/pve/argocd`を実行する。
nodeラベルと古いRPi taintの除去は`talos/home-k8s/scripts/label-nodes`で反映する。
