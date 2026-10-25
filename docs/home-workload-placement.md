# home-k8sの配置方針

2026-10-23更新。特定のPVE・RPi・platformを既定の配置先にしない。性能が必要な重いrunnerはPVE workerを使う。
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

TNLAStation backendは本番・stagingともメモリのrequestsを1Gi、limitsを2Giにする。
予約は特定nodeを除外する値から決めず、確認できる使用量の最大値に20%を加え、64Mi単位で切り上げる。
2026-10-23のOOMログではbackendのanon-rss 803184Ki + file-rss 108Ki + shmem 62288Ki = 845.3Mi。
`ceil(845.3 * 1.2 / 64) * 64 = 1024Mi`のため1Giとした。これは既存ログから確認できた最大の観測値で、
過去全期間の最大値ではない。ノードのOOMは他のPodとの合計使用量によるものであり、backend単体の2Gi超過を示さない。
以前の1536Miは2GB RPiの除外を目的にした値だったため撤回した。空きがあれば2GB RPiにも配置できる。

この変更以前はコンテナ別メモリ履歴を保存していなかった。VictoriaMetrics・Grafana Cloudの過去30日の照会も該当データなし。
vmagentの`kubelet-container-memory`で本番・staging backendのworking set・RSS・usage・cgroup peakを30秒ごとに保存する。
VictoriaMetricsの保持期間は30日。次回の見直しでは、例えば以下の式で取得できる期間の最大値を調べる。
`container_memory_max_usage_bytes`は稼働中cgroupの起動後ピークで、回収可能なcacheも含むためworking setと併せて確認する。

```promql
max by (namespace) (max_over_time(container_memory_working_set_bytes{job="kubelet-container-memory",container="backend"}[30d]))
max by (namespace) (max_over_time(container_memory_max_usage_bytes{job="kubelet-container-memory",container="backend"}[30d]))
```

共有NFSへのアクセスは特定nodeのローカルディスクではないため、それだけでPVEに固定しない。
アプリのCPU・メモリ要求、対応image、PDBやHA制約は引き続き守る。
配置の自由度を広げても、etcd quorum、NAS停止や単一replicaアプリの無停止を保証するものではない。

## メモリ不足時の退避と優先度

全node共通のkubelet設定は`talos/home-k8s/patches/cluster.yaml`で管理する。
`memory.available`が384Mi未満の状態が30秒続くとsoft evictionを開始し、終了猶予は最大30秒とする。
256Mi未満ではhard evictionにより終了猶予なしでメモリを回収する。
各閾値に対して128Miの追加回収余裕を設け、閾値付近での退避の繰り返しを抑える。
`mergeDefaultEvictionSettings: true`で既定のディスク・inode不足の閾値も維持する。
Talosの既定のOS用予約は維持し、hard eviction分もNode Allocatableから差し引かれる。

この判定はkubeletの`memory.available`を使い、ホストの`MemAvailable`とは同一ではない。
通常の検査周期は10秒であり、急激なメモリ増加やkubelet自体の停止ではOOMを完全には防げない。
退避されたDeployment等のPodはcontrollerにより再作成される。稼働中の処理を別nodeへ引き継ぐものではなく、
空き容量や配置条件を満たす退避先が必要になる。node-pressure evictionはPDBによる保護を受けない。

`home-observability` PriorityClassはroot Applicationから管理し、収集・保存・Grafana接続・主要な障害検知に使う
vmagent、VictoriaMetrics、PDC agent、kube-state-metrics、home-service-monitor、home-vip-monitor、
blackbox-exporter、Kubernetes node-exporterへ付与する。通常アプリより高い100000とし、
`preemptionPolicy: Never`で配置のために既存Podを強制排除しない。
メモリ退避順は、まずrequests超過の有無、次に優先度と超過量で決まるため、優先度だけで保護を保証しない。
バッチ・バックアップ処理へこのPriorityClassを一括付与しない。

EPGStationはメモリrequestsを768Mi、limitsを2Giとする。予約量は使用量に余裕を加えた値から決め、
特定nodeを除外するための値にはしない。`kubelet-container-memory`でEPGStationも30秒ごとに収集し、
working set・RSS・usage・起動後peakの履歴から予約量を見直す。

```promql
max(max_over_time(container_memory_working_set_bytes{job="kubelet-container-memory",namespace="app-epgstation",container="epgstation"}[30d]))
max(max_over_time(container_memory_max_usage_bytes{job="kubelet-container-memory",namespace="app-epgstation",container="epgstation"}[30d]))
```

### 反映・検証・ロールバック

Podの設定とPriorityClassはmainへのpush後にArgo CDが反映する。PriorityClassはsync wave 1、
利用するApplicationはwave 2で管理する。初回はPriorityClassの存在を確認してからPodを更新する。
Pod template変更によりPodが再作成されるため、単一replicaの停止と実行中処理への影響を確認する。

既存Talos nodeへの反映は自動ではない。各nodeの実IPを`NODE_IP`に指定し、1台ずつ実施する。
新規nodeでは共通patchを含めてmachine configを生成する。

```bash
talosctl --talosconfig talos/home-k8s/.generated/talosconfig \
  --endpoints "$NODE_IP" --nodes "$NODE_IP" patch machineconfig \
  --patch @talos/home-k8s/patches/cluster.yaml --dry-run
talosctl --talosconfig talos/home-k8s/.generated/talosconfig \
  --endpoints "$NODE_IP" --nodes "$NODE_IP" patch machineconfig \
  --patch @talos/home-k8s/patches/cluster.yaml --mode=no-reboot
kubectl --context home-k8s get nodes
kubectl --context home-k8s get --raw "/api/v1/nodes/$NODE_NAME/proxy/configz"
```

`configz`でsoft/hard閾値・猶予とディスク閾値の維持を確認し、全node Ready、MemoryPressureの有無、
対象PodのPriorityClass、メトリクスの鮮度を確認する。変更を戻す場合はGit上のPod設定を戻し、
Podの更新完了後に不要なPriorityClassを削除する。TalosはGitを戻すだけでは反映されないため、
`extraConfig`内の追加したeviction設定をJSON Patchで削除し、`--mode=no-reboot`で1台ずつ反映する。
既存の別の`extraConfig`項目は削除せず、既定値への復帰を`configz`で確認する。

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
