# RKE2 クラスタ ローリングアップグレード手順書

宅内 Proxmox 上の RKE2 HA クラスタを、サービス停止を最小化しながら手動で
ローリングアップグレードするための手順書。

## 対象構成

| 役割 | ノード | IP アドレス |
|---|---|---|
| server / etcd | `master-01-rke2-server-ubuntu-26-04-home-amd64` | `192.168.20.126` |
| server / etcd | `master-02-rke2-server-ubuntu-26-04-home-amd64` | `192.168.20.127` |
| server / etcd | `master-03-rke2-server-ubuntu-26-04-home-amd64` | `192.168.20.128` |
| agent | `worker-01-rke2-agent-ubuntu-26-04-home-amd64` | `192.168.20.129` |
| agent | `worker-02-rke2-agent-ubuntu-26-04-home-amd64` | `192.168.20.130` |
| DVB 専用 agent | `dvb-worker-01-rke2-agent-ubuntu-26-04-home-amd64` | `192.168.20.131` |

HAProxy / Keepalived の LB 2 台は RKE2 を実行していないため、本手順の更新対象外。

## 更新方針

- 実行のたびに日付入りのチェックリストを作成し、各確認・操作・結果を記録しながら進める。
- チェックリストの未完了項目を飛ばさず、異常時は次のノードへ進まない。
- server を先に、agent を後に更新する。
- server は etcd quorum を維持するため、必ず 1 台ずつ更新する。
- 各ノードが `Ready` に復帰し、API の正常性を確認してから次へ進む。
- Kubernetes の minor version は飛ばさない。
- `stable` channelを直接追従せず、実行時に確認したバージョンを明示的に固定する。
- local-path PVC はノードに固定されるため、drainしても別ノードへ退避できない。
- MariaDBが停止するとEPGStationにも影響するため、通常workerを含めて録画予定のない
  メンテナンス時間に更新する。
- DVB worker は録画への影響を避けるため、最後に更新する。

RKE2 公式手順:

- <https://docs.rke2.io/upgrades/manual>
- <https://docs.rke2.io/upgrades/roll-back>

## 実施チェックリスト

作業開始前に、この手順書と同じディレクトリへ
`rke2-upgrade-checklist-YYYYMMDD.md`を作成する。最低限、次をチェック項目に含める。

- current / target versionと公式channelの確認
- 破壊的変更の確認(リリースノート、同梱コンポーネント、廃止・削除API)
- クラスタ、Pod、API、PDB、自動再起動、録画予定の事前確認
- etcd snapshot、クラスタ外コピー、checksum、token保全
- 各serverのinstall、service、Ready、kubeletVersion、etcd全メンバーhealth
- 各agentの停止影響確認、drain、install、service、Ready、kubeletVersion、uncordon
- 全ノード、全Pod、API、主要サービスの完了確認

コマンドを実行する前に対象項目を確認し、成功後にチェックを付ける。失敗した場合は
チェックを付けず、結果と調査内容を記録して作業を停止する。

## 1. 対象バージョンの決定

RKE2 公式 channel API で現在値を確認する。

```bash
curl -fsSL https://update.rke2.io/v1-release/channels \
  | jq '.data[] | select(.name == "stable" or .name == "latest" or .name == "v1.35") | {name, latest}'
```

2026-07-19 時点では次のとおり。

| channel | バージョン | 用途 |
|---|---|---|
| `stable` | `v1.35.6+rke2r1` | 本番環境向け推奨 |
| `v1.35` | `v1.35.6+rke2r1` | v1.35 系の最新 patch |
| `latest` | `v1.36.2+rke2r1` | 新機能の評価向け |

このクラスタは現在 v1.35 系のため、まず `v1.35.6+rke2r1` へ統一する。
v1.36 への更新は minor upgrade として、v1.35 の更新完了後にリリースノートと
Ingress NGINX / Traefik の移行影響を確認して別作業で実施する。

作業端末で対象バージョンを設定する。

```bash
export RKE2_TARGET_VERSION="$(
  sed -n 's/^rke2_version: *"\([^"]*\)"/\1/p' \
    ansible/rke2/group_vars/rke2-node-all.yml
)"
```

### 1.1 破壊的変更の確認

対象バージョンを固定したら、現行から対象までの間に破壊的変更がないか確認する。
patch更新でもRKE2は同梱コンポーネント(CoreDNS、Canal、containerd、etcd等)の
versionを上げることがあるため、確認を省略しない。

#### RKE2 リリースノート

現行と対象の間の**すべてのリリース**(中間patchを含む)を確認する。

```bash
# 例: v1.35.4+rke2r1 → v1.35.6+rke2r1 の場合は v1.35.5+rke2r1 も確認する
gh release view 'v1.35.6+rke2r1' --repo rancher/rke2 --json body --jq .body
gh release view 'v1.35.5+rke2r1' --repo rancher/rke2 --json body --jq .body
```

確認ポイント:

- 「Important Notes」に手動対応が必要な変更・既知の問題がないか。
- 「Packaged Component Versions」でCoreDNS / Canal / containerd / etcdの
  versionが上がっていないか。上がっている場合は該当コンポーネントの変更点を確認する。
- rke2-coredns chartのversionが上がる場合、
  `k8s/pve/rke2-coredns-config/helmchartconfig.yaml` の `valuesContent` のkey
  (`affinity`、`tolerations`、`resources`)が新chartでも有効か、chartの
  changelogで確認する。無効なkeyは黙って無視され、意図した配置制御が失われる。

#### Kubernetes 本体の changelog

<https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.35.md>
の対象patchの節を確認する。minor更新の場合は「Urgent Upgrade Notes」と
「Deprecation」を必ず読む。

#### 廃止・削除APIの使用確認

minor更新時は必須。patch更新ではAPIは削除されないため省略できる。

apiserverのメトリクスで、廃止予定APIへの実際のアクセスを確認する。

```bash
kubectl get --raw /metrics | grep apiserver_requested_deprecated_apis
```

出力が空なら廃止予定APIは使われていない。出力がある場合は該当resourceの
利用元を特定し、[deprecation guide](https://kubernetes.io/docs/reference/using-api/deprecation-guide/)
に従って移行してから更新する。

GitOps repoのmanifestも静的スキャンする。このクラスタのworkloadはArgo CDが
`k8s/pve` から同期しているため、repoのスキャンでほぼ網羅できる。

```bash
# https://github.com/FairwindsOps/pluto
pluto detect-files -d k8s/pve --target-versions "k8s=${RKE2_TARGET_VERSION%+*}"
```

ただしHelm chart(victoria-metrics、external-secrets等)がrenderするmanifestは
このスキャンの対象外のため、chart側は各chartのrelease notesで対象k8s versionへの
対応を確認する。

#### 判断基準

次のいずれかに該当する場合、解消するまで更新を開始しない。

- 削除されるAPIを使用しているmanifest・chartがある。
- 「Important Notes」に未対応の手動手順がある。
- Argo CD、MetalLB、external-secretsなど主要addonのサポート対象に
  対象k8s versionが含まれない(minor更新時に各projectの互換性表で確認)。
- 影響を判断できない変更がある。

## 2. 事前確認

正しい context を選択し、全ノードとAPIが正常であることを確認する。

```bash
kubectl config use-context rke2-pve

kubectl get nodes \
  -o custom-columns='NAME:.metadata.name,VERSION:.status.nodeInfo.kubeletVersion,READY:.status.conditions[?(@.type=="Ready")].status'

kubectl get pods -A \
  --field-selector=status.phase!=Running,status.phase!=Succeeded

kubectl get pdb -A
kubectl get --raw='/readyz?verbose'
```

現在 `k8s/pve` にはPodDisruptionBudgetが定義されていない。`kubectl get pdb` は、
将来追加されたPDBがdrainをブロックしないか確認するために実行する。現状は多くの
アプリが1 replicaなので、local-pathを使わないPodも再スケジュール中は瞬断する。

次の場合は更新を開始しない。

- `NotReady` のノードがある。
- 原因不明の `Pending`、`Error`、`CrashLoopBackOff` Pod がある。
- `/readyz` に失敗項目がある。
- Proxmox ホスト、NAS、ネットワークに障害またはメンテナンス作業がある。
- `/var/run/reboot-required` が存在するノードがある。
- unattended-upgradesの自動再起動時刻と作業時間が重なる。

全ノードの再起動要求と、設定されている自動再起動時刻を確認する。

```bash
for ip in 192.168.20.126 192.168.20.127 192.168.20.128 \
          192.168.20.129 192.168.20.130 192.168.20.131; do
  ssh "miutaku@${ip}" \
    'hostname; test ! -e /var/run/reboot-required || echo REBOOT_REQUIRED; sudo grep -E "Automatic-Reboot(|-Time)" /etc/apt/apt.conf.d/50unattended-upgrades'
done
```

`Automatic-Reboot "true"` が設定されている。作業は表示された時刻を避け、
`REBOOT_REQUIRED` が1台も表示されない状態で開始する。特にserver更新中に別serverが
自動再起動すると、etcd quorumを失う危険がある。

現在の RKE2 binary と systemd service も確認する。

```bash
for ip in 192.168.20.126 192.168.20.127 192.168.20.128 \
          192.168.20.129 192.168.20.130 192.168.20.131; do
  ssh "miutaku@${ip}" 'hostname; sudo rke2 --version | head -n 1'
done
```

server 3台のversionが同一であることを確認したら、primary serverの現在versionを変数へ
保存する。ファイル名で扱いやすいよう、`+`は`_`へ置換する。

```bash
export RKE2_CURRENT_VERSION="$(
  kubectl get node master-01-rke2-server-ubuntu-26-04-home-amd64 \
    -o jsonpath='{.status.nodeInfo.kubeletVersion}'
)"
export RKE2_CURRENT_VERSION_FS="${RKE2_CURRENT_VERSION//+/_}"

printf 'current=%s\ntarget=%s\n' \
  "${RKE2_CURRENT_VERSION}" "${RKE2_TARGET_VERSION}"
```

`current`が空でないこと、事前確認で得たserver 3台のversionと一致すること、`target`が
意図した更新先であることを確認する。

## 3. etcd バックアップ

primary server でスナップショットを取得する。名前には、restore時に判別できるよう
アップグレード前のversionを含める。

```bash
ssh miutaku@192.168.20.126 \
  "sudo rke2 etcd-snapshot save --name pre-upgrade-from-${RKE2_CURRENT_VERSION_FS}"

ssh miutaku@192.168.20.126 \
  'sudo ls -lh /var/lib/rancher/rke2/server/db/snapshots/'
```

最新スナップショットが存在し、サイズが 0 byte でないことを確認する。

続けて、master-01を変更する前にスナップショットを作業端末へ必ずコピーする。
この手順ではsnapshotディレクトリ全体をアーカイブする。

```bash
mkdir -p ./rke2-backups
export ETCD_BACKUP_FILE="./rke2-backups/etcd-pre-upgrade-from-${RKE2_CURRENT_VERSION_FS}-$(date +%Y%m%d-%H%M%S).tar.gz"

ssh miutaku@192.168.20.126 \
  'sudo tar -C /var/lib/rancher/rke2/server/db -czf - snapshots' \
  > "${ETCD_BACKUP_FILE}"

gzip -t "${ETCD_BACKUP_FILE}"
sha256sum "${ETCD_BACKUP_FILE}"
ls -lh "${ETCD_BACKUP_FILE}"
```

`gzip -t`が成功し、ファイルサイズが0 byteでないことを確認する。可能ならさらにNASなど
別のクラスタ外ストレージへコピーする。クラスタ外コピーが完了するまでは更新へ進まない。

クラスタ復元に必要な`/var/lib/rancher/rke2/server/token`も既存のパスワードマネージャへ
保存する。平文を標準出力へ表示するコマンドは端末ログやscrollbackに残るため、使用中の
パスワードマネージャのCLIへ直接渡すか、端末ログを無効にした安全な方法で登録する。
登録後、秘密値そのものを表示せずにエントリの存在と更新日時を確認する。

この環境での登録先はBitwarden Secrets Managerのプロジェクト`my-infra`、キー名は
`RKE2_SERVER_TOKEN`とする。

## 4. server の更新

更新順序は `master-01`、`master-02`、`master-03` とする。server には
`CriticalAddonsOnly=true:NoExecute` taintが設定されているため、通常workloadのdrainは不要。

### 4.1 master-01

```bash
export NODE='master-01-rke2-server-ubuntu-26-04-home-amd64'
export NODE_IP='192.168.20.126'

kubectl cordon "${NODE}"

ssh "miutaku@${NODE_IP}" \
  "curl -sfL https://get.rke2.io | sudo env INSTALL_RKE2_TYPE=server INSTALL_RKE2_VERSION='${RKE2_TARGET_VERSION}' sh -"

ssh "miutaku@${NODE_IP}" 'sudo systemctl restart rke2-server'
ssh "miutaku@${NODE_IP}" 'sudo systemctl --no-pager --full status rke2-server'

kubectl wait --for=condition=Ready "node/${NODE}" --timeout=10m
kubectl wait \
  --for="jsonpath={.status.nodeInfo.kubeletVersion}=${RKE2_TARGET_VERSION}" \
  "node/${NODE}" --timeout=10m
kubectl get node "${NODE}" -o wide
kubectl get --raw='/readyz?verbose'
```

`VERSION` が対象バージョンになり、`Ready` であることを確認する。

```bash
kubectl get node "${NODE}" \
  -o custom-columns='NAME:.metadata.name,VERSION:.status.nodeInfo.kubeletVersion,READY:.status.conditions[?(@.type=="Ready")].status'
```

`Ready=True`と`VERSION=${RKE2_TARGET_VERSION}`の両方を確認する。restart直後は古いNode
leaseによって`Ready`が一度もFalseにならず、最初のwaitが即座に成功する場合があるため、
kubeletVersionの一致を必須ゲートとする。

さらに、更新済みserverのetcd static Pod内にある`etcdctl`で、全メンバーのhealthと
statusを確認する。

```bash
kubectl -n kube-system exec "etcd-${NODE}" -- \
  etcdctl \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/var/lib/rancher/rke2/server/tls/etcd/server-ca.crt \
  --cert=/var/lib/rancher/rke2/server/tls/etcd/server-client.crt \
  --key=/var/lib/rancher/rke2/server/tls/etcd/server-client.key \
  endpoint health --cluster

kubectl -n kube-system exec "etcd-${NODE}" -- \
  etcdctl \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/var/lib/rancher/rke2/server/tls/etcd/server-ca.crt \
  --cert=/var/lib/rancher/rke2/server/tls/etcd/server-client.crt \
  --key=/var/lib/rancher/rke2/server/tls/etcd/server-client.key \
  endpoint status --cluster --write-out=table

kubectl uncordon "${NODE}"
```

3 endpointすべてがhealthyであり、statusに3メンバーが表示されるまで次のserverへ進まない。
server restart直後はHAProxyのhealth check反映までVIP経由の`kubectl`が一時的に失敗する
ことがある。数秒待って再試行し、継続する場合のみ異常として調査する。

### 4.2 master-02

4.1 と同じコマンドを、次の変数で実行する。

```bash
export NODE='master-02-rke2-server-ubuntu-26-04-home-amd64'
export NODE_IP='192.168.20.127'
```

### 4.3 master-03

4.1 と同じコマンドを、次の変数で実行する。

```bash
export NODE='master-03-rke2-server-ubuntu-26-04-home-amd64'
export NODE_IP='192.168.20.128'
```

3 台すべての更新が終わるまでagentの更新へ進まない。

```bash
kubectl get nodes -l node-role.kubernetes.io/control-plane \
  -o custom-columns='NAME:.metadata.name,VERSION:.status.nodeInfo.kubeletVersion,READY:.status.conditions[?(@.type=="Ready")].status'
```

## 5. 通常 agent の更新

agent上のPodをevictしてから更新する。ただしlocal-path PVはnode affinityで作成元ノードに
固定されるため、Podは別ノードへ退避できず、uncordonするまで`Pending`となる。
`--delete-emptydir-data` により対象ノードの`emptyDir`データも削除されるため、drainの警告と
対象Podを確認してから続行する。

### 停止影響の確認

作業直前に、Podの現在配置とlocal-path PVの固定先を確認する。配置は将来変わり得るため、
下表だけで判断しない。

```bash
kubectl get pods -A -o wide

kubectl get pv \
  -o custom-columns='PV:.metadata.name,CLAIM_NS:.spec.claimRef.namespace,CLAIM:.spec.claimRef.name,SC:.spec.storageClassName,NODE:.spec.nodeAffinity.required.nodeSelectorTerms[0].matchExpressions[0].values[0]'
```

2026-07-19時点で確実に停止するlocal-path workloadは次のとおり。

| 更新ノード | 停止するworkload | 波及影響 |
|---|---|---|
| worker-01 | MariaDB、VictoriaMetrics | EPGStationのDB利用、録画予約・録画動作、監視データ収集に影響 |
| worker-02 | Nextcloud | Nextcloudが停止 |
| DVB worker | Mirakurun | チューナー利用、EPGStationの録画・番組取得が停止 |

このほかPDBなし・1 replicaのPodは、別ノードで再起動するまで瞬断する。worker-01と
DVB workerの更新は必ず録画中および直近に予約録画がない時間帯に行う。worker-02も
Nextcloudの停止を許容できる時間帯に行う。

### 5.1 worker-01

```bash
export NODE='worker-01-rke2-agent-ubuntu-26-04-home-amd64'
export NODE_IP='192.168.20.129'

kubectl get pods -A --field-selector "spec.nodeName=${NODE}" -o wide
kubectl cordon "${NODE}"
kubectl drain "${NODE}" \
  --ignore-daemonsets \
  --delete-emptydir-data \
  --timeout=10m

ssh "miutaku@${NODE_IP}" \
  "curl -sfL https://get.rke2.io | sudo env INSTALL_RKE2_TYPE=agent INSTALL_RKE2_VERSION='${RKE2_TARGET_VERSION}' sh -"

ssh "miutaku@${NODE_IP}" 'sudo systemctl restart rke2-agent'
ssh "miutaku@${NODE_IP}" 'sudo systemctl --no-pager --full status rke2-agent'

kubectl wait --for=condition=Ready "node/${NODE}" --timeout=10m
kubectl wait \
  --for="jsonpath={.status.nodeInfo.kubeletVersion}=${RKE2_TARGET_VERSION}" \
  "node/${NODE}" --timeout=10m
kubectl get node "${NODE}" -o wide
kubectl uncordon "${NODE}"
```

退避されたPodが再び正常になったことを確認してから次へ進む。

```bash
kubectl get pods -A \
  --field-selector=status.phase!=Running,status.phase!=Succeeded
```

### 5.2 worker-02

5.1 と同じコマンドを、次の変数で実行する。

```bash
export NODE='worker-02-rke2-agent-ubuntu-26-04-home-amd64'
export NODE_IP='192.168.20.130'
```

## 6. DVB 専用 agent の更新

DVB workerはPT3をPCIパススルーしており、Mirakurunを他ノードへ退避できない。
録画中および直近に予約録画がないことを確認し、停止を許容できる時間帯に実施する。

```bash
export NODE='dvb-worker-01-rke2-agent-ubuntu-26-04-home-amd64'
export NODE_IP='192.168.20.131'

kubectl get pods -A --field-selector "spec.nodeName=${NODE}" -o wide
kubectl cordon "${NODE}"
kubectl drain "${NODE}" \
  --ignore-daemonsets \
  --delete-emptydir-data \
  --timeout=10m

ssh "miutaku@${NODE_IP}" \
  "curl -sfL https://get.rke2.io | sudo env INSTALL_RKE2_TYPE=agent INSTALL_RKE2_VERSION='${RKE2_TARGET_VERSION}' sh -"

ssh "miutaku@${NODE_IP}" 'sudo systemctl restart rke2-agent'
ssh "miutaku@${NODE_IP}" 'sudo systemctl --no-pager --full status rke2-agent'

kubectl wait --for=condition=Ready "node/${NODE}" --timeout=10m
kubectl wait \
  --for="jsonpath={.status.nodeInfo.kubeletVersion}=${RKE2_TARGET_VERSION}" \
  "node/${NODE}" --timeout=10m
kubectl get node "${NODE}" \
  -o custom-columns='NAME:.metadata.name,VERSION:.status.nodeInfo.kubeletVersion,READY:.status.conditions[?(@.type=="Ready")].status'
kubectl uncordon "${NODE}"
```

Mirakurun、EPGStation、チューナーデバイスの認識と録画機能を確認する。

## 7. 完了確認

```bash
kubectl get nodes \
  -o custom-columns='NAME:.metadata.name,VERSION:.status.nodeInfo.kubeletVersion,READY:.status.conditions[?(@.type=="Ready")].status'

kubectl get pods -A \
  --field-selector=status.phase!=Running,status.phase!=Succeeded

kubectl get --raw='/readyz?verbose'
kubectl get events -A --sort-by='.lastTimestamp'
```

完了条件:

- 全6ノードが対象バージョンで `Ready`。
- `SchedulingDisabled` のまま残ったノードがない。
- 原因不明の異常Podがない。
- Argo CD、CoreDNS、Cloudflare Tunnel、ストレージ利用アプリが正常。
- Mirakurun / EPGStationでチューナーと録画が正常。

## 8. 異常時

次のいずれかが発生したら次のノードへ進まず、作業を停止する。

- ノードが10分以内に `Ready` へ戻らない。
- kubeletVersionが対象バージョンにならない。
- API `/readyz` が失敗する。
- etcdの3 endpointがすべてhealthyにならない。
- etcdまたはapiserverに継続的なエラーがある。
- 重要なworkloadが復旧しない。

対象ノードのログを確認する。

```bash
# server
ssh "miutaku@${NODE_IP}" \
  'sudo journalctl -u rke2-server --since "30 minutes ago" --no-pager'

# agent
ssh "miutaku@${NODE_IP}" \
  'sudo journalctl -u rke2-agent --since "30 minutes ago" --no-pager'
```

同一minor内のbinary差し戻しであっても、自己判断で複数ノードを一斉に操作しない。
minor versionを戻す場合はbinaryだけでなく、旧versionで取得したetcdスナップショットの
restoreが必要になる。公式のrollback手順を確認してから実施する。

## Ansibleに関する注意

現在の `rke2_server_node` / `rke2_agent_node` roleは新規インストール用で、既存ノードの
version更新処理を持たない。`site.yml` をアップグレード目的でそのまま実行しないこと。
