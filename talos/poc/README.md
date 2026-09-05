# Talos Green PoC

このディレクトリは、現行RKE2（Blue）へ接続せずにTalos（Green）のmachine configを生成する
ための雛形である。VM、IP、MAC、Proxmox capacityがGate 0で確定するまでは設定生成までとし、
VM作成、`apply-config`、`bootstrap`は行わない。

## 含まれるもの

| ファイル | 用途 |
|---|---|
| `schematic.yaml` | QEMU Guest Agent入りImage Factory schematic |
| `patches/cluster.yaml` | Flannel NetworkPolicyを有効化する共通patch |
| `patches/worker-storage.yaml` | PoC workerの16 GiB非system diskに15 GiBの試験volumeを作るpatch |
| `poc.env.example` | Gitへ保存してよい変数の例。実値は`poc.env`へコピーする |
| `scripts/generate-configs` | credentialを含むmachine configを`.generated`へ生成する |
| `kubernetes/local-path` | 固定版manifestからUserVolumeだけを使うlocal-path-provisioner v0.0.36 |
| `kubernetes/smoke` | DNS、Service、NetworkPolicy、local volume保持の試験manifest |
| `kubernetes/nfs-smoke` | production NFSをread-onlyでmountする試験manifest |
| `scripts/run-smoke-tests` | Green API endpointを確認してから基本試験を実行する |
| `scripts/test-local-volume-reboot` | PVCの配置先workerをrebootし、同じsentinelが残ることを確認する |
| `scripts/test-nfs-read-only` | NFSv4.1の実mountが`ro`であることを確認し、一時資源を削除する |
| `scripts/test-nfs-write` | 専用NFS exportでcreate/fsync/deleteし、一時Kubernetes資源を削除する |
| `scripts/truenas-poc-nfs.mjs` | POC-06専用dataset/exportのstatus/create/deleteだけを行うTrueNAS API client |
| `scripts/reboot-soak` | Green endpointを強制しworker/control planeを3回ずつreboot検証 |
| `kubernetes/metallb` / `scripts/test-metallb` | `.228/32`だけのL2 poolを導入しVLAN 20から疎通確認 |
| `kubernetes/metrics-server` / `scripts/test-metrics-server` | Metrics APIとCPU HPAの値取得を検証 |
| `kubernetes/argocd` / `scripts/test-argocd` | source/destination限定AppProjectでGitOps同期を検証 |
| `kubernetes/external-secrets` / `scripts/test-external-secrets` | 専用sourceだけを読むSecretStore同期を検証 |
| `kubernetes/node-exporter` / `scripts/test-node-exporter` | Talos hostのCPU/memory/filesystem/温度collectorを検証 |
| `scripts/test-upgrade-rollback` | workerだけで隣接patchのupgrade/A-B rollbackを検証 |
| `hardware-baseline.md` | PT3/BLEの現割当、開始条件、Blue原状復帰baseline |

`.generated`と`poc.env`はGit管理外である。`controlplane.yaml`、`worker.yaml`、`talosconfig`
には秘密情報が含まれるため、Pull Request、ログ、チャットへ貼り付けない。

## 前提

- `talosctl`は採用済みのTalos `v1.13.9`と同じversionを使用する。
- `poc.env`のIP、VM ID、MACはBlueと重複しない予約済みの値を使う。
- Proxmox VMはOS disk `/dev/sda`と、workerだけに付ける空のdata diskを分ける。
- data diskを付ける前後に`talosctl get disks --insecure --nodes <IP> -o yaml`で識別する。
- `patches/worker-storage.yaml`のstable `drive-scsi1` symlinkがdata diskだけに存在することをレビューする。
- QEMU Guest Agentはschematic入りISO/installerを使う場合だけProxmox側で有効化する。
- 適用前にImage Factory installerのdigestを取得し、tag参照からdigest参照へ固定する。

## 設定生成

1. 基本PoCでは`poc.env.example`に記録したvanilla schematicを使う。custom schematicは別試験とする。
2. `poc.env.example`を`poc.env`へコピーする。
3. 次を実行する。

```bash
cd talos/poc
./scripts/generate-configs
```

この処理はローカルファイルを生成するだけで、Blue/GreenどちらにもAPI操作を行わない。
生成後は少なくとも次を確認する。

```bash
talosctl validate --config .generated/controlplane.yaml --mode metal
talosctl validate --config .generated/worker.yaml --mode metal
```

## 空状態からのresetと再構築

この手順はPoC専用VM `13001`/`13002`だけを対象にする。開始前にkubeconfigのAPI serverが
`https://192.168.20.137:6443`、Talos nodeが`.137`/`.138`、Terraform stateがPoCの4資源だけで
あることを確認する。resetはdisk上のデータと既存PKIを消去するため、旧`talosconfig`は作業中だけ
mode `0600`の一時領域へ退避し、再構築確認後に削除する。

1. Terraformで両VMをISO優先起動にする。planはboot orderのin-place更新2件、追加/削除0件でなければ
   適用しない。
2. 旧credentialでworkerを先に全disk resetする。

   ```bash
   talosctl --talosconfig /secure/old-talosconfig \
     --nodes 192.168.20.138 --endpoints 192.168.20.137 reset \
     --graceful=true --reboot --wipe-mode=all --wait
   ```

3. このPoCはcontrol plane/etcdが1台だけなので、最後のetcd memberはgraceful resetで自分自身を
   clusterから削除できない。control planeは最初から非gracefulでresetする。

   ```bash
   talosctl --talosconfig /secure/old-talosconfig \
     --nodes 192.168.20.137 --endpoints 192.168.20.137 reset \
     --graceful=false --reboot --wipe-mode=all --wait
   ```

   API停止後などでreset RPCを再実行できない場合に限り、Proxmox consoleでISO boot menuの
   `Talos (v1.13.9) (Reset system disk)`を選ぶ。このfallbackはcontrol planeにuser diskがない
   現在のPoC構成だけで全disk初期化と同等になる。
4. `.137`/`.138`の両方が`talosctl version --insecure`へ応答することを確認し、Terraformでdisk優先へ
   戻す。ここでもboot orderのin-place更新2件、追加/削除0件だけを許可する。
5. `./scripts/generate-configs`でfresh PKIを生成し、両nodeへ`apply-config --insecure`する。
6. 新しいtalosconfigで両nodeを認証できた後、`.137`へ`talosctl bootstrap`を**1回だけ**実行する。
7. kubeconfigを取得し、2 node Ready、`talosctl health`、基本smoke test、worker reboot後のsentinel保持、
   Terraform live plan `No changes`を確認する。
8. smoke Namespace/PVC/PV、旧credential、plan file、一時CLI/provider cacheを削除する。後続Phaseで使う
   local-path provisionerとPoC VMは資源台帳の期限まで残す。

2026-08-30にこの手順をfresh PKIと全disk初期化で再実行し、Talos 1.13.9 / Kubernetes 1.35.7の
2 node Ready、health全項目、UserVolume、smoke test、worker reboot後の保持、Terraform no-opを確認した。

## 基本smoke test

`run-smoke-tests`は明示context（既定`talos-poc`）のAPI endpointがPoCの`.137`と完全一致しなければ停止するため、Blueへ
誤適用しない。local-path-provisionerは2026-08-30時点の安定版`v0.0.36`へ固定し、Talos UserVolume
`/var/mnt/local-path-provisioner`だけを保存先にする。公式`v0.0.36` manifestをvendoringしているため、
Kustomizeの実行時にGitHubへ接続しない。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  ./scripts/run-smoke-tests

KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  PATH=/path/to/talosctl:$PATH \
  ./scripts/test-local-volume-reboot

KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  ./scripts/cleanup-smoke-tests
```

試験はworkerからcontrol plane上のPodへのDNS/ClusterIP Service通信、NetworkPolicyの許可/拒否、
Pod再作成後とworker再起動後のPVC sentinel保持を確認する。単体PodはTalosのgraceful shutdownで
終了するため、再起動後に同じPVCを参照するPodを再作成し、controller管理workload相当の復旧を確認する。
結果を移行文書へ記録してからcleanupする。cleanupは`talos-poc-smoke`namespaceだけを削除し、後続試験で
使うlocal-path-provisionerは残す。PoC終了時にはprovisionerもGreen clusterとともに削除する。

POC-01のreboot試験は、PoC専用kubeconfigを指定して実行する。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  PATH=/path/to/talosctl:$PATH \
  ./scripts/reboot-soak
```

POC-05はproduction録画exportをPV、Pod、mount optionの3箇所でread-onlyにして試験する。
ファイル名や内容は出力せず、終了時に一時Namespace/PVを削除する。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  ./scripts/test-nfs-read-only
```

POC-06は既存exportへ書き込まない。TrueNAS上に1 GiB quota、Green 2 IPだけ許可した
`raid1_case/talos-poc`を作成し、試験直後にshareとdatasetを削除する。API clientは対象名、path、commentと
確認文字列が一致しない削除を拒否する。nas-02のTrueNAS SCALE 23.10 legacy WebSocket APIに合わせており、
upgrade後はAPI互換性を再確認する。`TRUENAS_PASSWORD`はBWSから一時取得し、ログやfileへ保存しない。
write Podは使い捨てexportのrootへfsyncするためbaseline policy内でroot実行し、production exportには使わない。

```bash
export TRUENAS_PASSWORD="$(bws secret list | jq -r \
  '.[] | select(.key == "PACKER_TRUENAS_ADMIN_PASSWORD") | .value' | head -n1)"
export TALOS_POC_NFS_CONFIRM='raid1_case/talos-poc@192.168.20.192'
export NODE_TLS_REJECT_UNAUTHORIZED=0  # 宅内nas-02の自己署名証明書だけを対象にする

node ./scripts/truenas-poc-nfs.mjs status
node ./scripts/truenas-poc-nfs.mjs create
KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  ./scripts/test-nfs-write
node ./scripts/truenas-poc-nfs.mjs delete
node ./scripts/truenas-poc-nfs.mjs status

unset TRUENAS_PASSWORD TALOS_POC_NFS_CONFIRM NODE_TLS_REJECT_UNAUTHORIZED
```

途中失敗時もKubernetes一時PV/Namespaceを削除してからTrueNASの`delete`を実行し、最後の`status`が
`dataset=0; share=0`になるまでPOC-06を完了扱いにしない。

## Kubernetes基盤PoC

POC-08はMetalLB chart `0.16.1`をL2専用で導入し、Blue pool外に予約した`.228/32`だけを
`autoAssign: false`で公開する。BGPを使わないためFRR/FRR-K8sは無効化する。speakerに必要な権限のため
`metallb-system`だけをPod Security `privileged`とし、test workloadは`restricted`を強制する。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  ./scripts/test-metallb
```

POC-09はmetrics-server chart `3.13.0`（app `0.8.0`）を使う。Talos既定のkubelet serving certificateは
IP SANを持たないため、公式手順どおり全nodeで`rotate-server-certificates=true`を有効化し、version固定した
Kubelet Serving Certificate Approver `v0.11.0`でCSRを承認する。kubeletのcertificate検証を無効化する
`--kubelet-insecure-tls`は指定しない。`kubectl top nodes`とCPU負荷Podを参照するHPAの
`current.averageUtilization`が数値になることを確認する。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOSCONFIG=.generated/talosconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  PATH=/path/to/talosctl:$PATH \
  ./scripts/test-metrics-server
```

両scriptは対象API endpointを`.137`へ固定し、成功時にtest Namespaceを削除する。MetalLBと
metrics-server本体は後続Phase 2試験で使うため残し、PoC終了時にclusterとともに削除する。

POC-10はArgo CD `v3.3.10`をversion固定で導入する。PoC用AppProjectはsourceを公式example repo、
destinationを`talos-poc-argocd`だけに制限し、`master/guestbook`の自動同期が`Synced/Healthy`になることを
確認する。Blueの`my-infra` root app、Secret、Tunnelには接続しない。成功後はApplication、AppProject、
test Namespaceを削除し、Argo CD本体だけを後続試験のため残す。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  ./scripts/test-argocd
```

POC-11はExternal Secrets chart `0.14.3`をBlueと同versionで導入し、Kubernetes providerを使って
専用source Namespaceから専用target Namespaceへ非機密markerだけを同期する。reader ServiceAccountは
source NamespaceのSecret読取権限だけを持つ。現在の`BWS_ACCESS_TOKEN`やBlueのprovider tokenはGreenへ
コピーしない。Bitwarden SDK接続はTalos固有機能ではなくBlueで稼働実績があるため、本番Greenでは専用の
Machine Accountを発行してから別途接続する。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  ./scripts/test-external-secrets
```

POC-12はBlueと同じprometheus-node-exporter chart `4.56.1`（app `1.12.1`）を使う。Talos hostの
CPU、memory、filesystem metricに加え、`hwmon`と`thermal_zone` collectorが成功することを確認する。
QEMU VMが物理温度sensorを公開しない場合、温度sample自体が0件でもcollector成功を合格条件とし、実機/Piの
温度sampleはHardware/ARM PoCで確認する。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  ./scripts/test-node-exporter
```

POC-13はPVCが0件のGreen worker `.138`だけを対象にし、同じImage Factory schematicで
`v1.13.8 -> v1.13.9`のpatch upgrade、A-B `rollback`で`v1.13.8`へ復帰、最後に宣言値
`v1.13.9`へ戻す。最初にA-B slotへbaselineを作るため、現在値`v1.13.9`から`v1.13.8`を一度
installする。各段階でworker versionとKubernetes Readyを確認し、control planeは変更しない。

```bash
KUBECONFIG=.generated/kubeconfig \
  TALOSCONFIG=.generated/talosconfig \
  TALOS_POC_KUBE_CONTEXT=admin@talos-green-poc \
  PATH=/path/to/talosctl:$PATH \
  ./scripts/test-upgrade-rollback
```

診断時はcontrol planeを接続nodeにし、全nodeのroleを明示する。support bundleにはログや構成情報が
含まれるためGitへ保存せず、`umask 077`で作成して転送または確認後に削除する。

```bash
talosctl --talosconfig .generated/talosconfig \
  --nodes 192.168.20.137 --endpoints 192.168.20.137 health \
  --control-plane-nodes 192.168.20.137 \
  --worker-nodes 192.168.20.138 \
  --k8s-endpoint https://192.168.20.137:6443

umask 077
talosctl --talosconfig .generated/talosconfig \
  --nodes 192.168.20.137,192.168.20.138 --endpoints 192.168.20.137 \
  support --output /tmp/talos-poc-support.zip
```

## 適用前Gate

予約値の読み取り専用再確認を実行する。既定ではProxmoxを`root@192.168.0.115`、VLAN 20を
`miutaku@192.168.20.129`経由で検査する。必要なら`PVE_CHECK_HOST`と`VLAN20_PROBE_HOST`で変更する。

```bash
./scripts/preflight-reservations
```

この検査のIP無応答は未使用の十分条件ではない。IX2215の固定lease、近隣テーブル、live Terraform
planも併せてレビューする。

```text
[ ] docs/talos-migration-project.md のGate 0がすべて合格
[ ] Proxmox planで既存RKE2 VMのdelete/replace/updateが0
[ ] endpointが192.168.20.227ではない
[ ] VM/MAC/IP/MetalLB IPがBlueと重複しない
[ ] installerと起動ISOのschematic IDが一致
[ ] /dev/sdaがPoC VMの空OS diskである
[ ] worker storage selectorが空のdata diskだけに一致
[ ] PoC資源台帳へ所有者、作成日、失効日、削除条件を記録
```

## 終了と削除

PoCが不要になった時点、Gate不合格で中止した時点、または本移行完了後に、台帳に記録した
VM、disk、ISO、DHCP lease、IP/DNS/MetalLB予約、PoC credential、NFS test dataを削除する。
削除前に試験結果だけを移行文書へ転記し、削除後に資源不存在を確認して台帳の`削除証跡`を埋める。

PT3を使うHardware PoCでは、TNLAStationの録画中/予約が0であることを確認し、PT3をBlueとGreenへ
同時attachしない。試験終了時にGreenから外してBlueへ戻し、MirakurunとTNLAStationの復旧確認までを
同じ作業枠内で完了する。具体的なbaselineは`hardware-baseline.md`を使う。

## 公式資料

- [Talos on Proxmox](https://docs.siderolabs.com/talos/v1.13/platform-specific-installations/virtualized-platforms/proxmox)
- [Configuration patches](https://docs.siderolabs.com/talos/v1.13/configure-your-talos-cluster/system-configuration/patching)
- [Flannel NetworkPolicy](https://docs.siderolabs.com/talos/v1.13/getting-started/what%27s-new-in-talos)
- [Local storage](https://docs.siderolabs.com/kubernetes-guides/csi/local-storage)
- [Local Path Provisioner v0.0.36](https://github.com/rancher/local-path-provisioner/releases/tag/v0.0.36)
- [Image Factory](https://docs.siderolabs.com/talos/v1.13/learn-more/image-factory)
- [Resetting a machine](https://docs.siderolabs.com/talos/v1.13/configure-your-talos-cluster/lifecycle-management/resetting-a-machine)
- [MetalLB installation](https://metallb.io/installation/)
- [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
- [Talos: Deploy the Metrics Server](https://docs.siderolabs.com/kubernetes-guides/monitoring-and-observability/deploy-metrics-server)
- [Argo CD releases](https://github.com/argoproj/argo-cd/releases)
- [External Secrets Kubernetes provider](https://external-secrets.io/latest/provider/kubernetes/)
- [Prometheus node_exporter](https://github.com/prometheus/node_exporter/releases)
- [Upgrading Talos Linux](https://docs.siderolabs.com/talos/v1.13/configure-your-talos-cluster/lifecycle-management/upgrading-talos)
