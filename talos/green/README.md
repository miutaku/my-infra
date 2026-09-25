# Talos production Green

home-k8sの本番クラスタ。API endpointはTalos内蔵L2 VIP
`https://192.168.20.228:6443`。VLAN 20にVM 5台（`.137`–`.141`）、VLAN 10にRaspberry Pi 4
worker 2台（`.107`、`.109`）を置く。machine config、PKI、kubeconfigは
`.generated`だけへ生成し、GitやBSMへ平文保存しない。
installerはv1.14.1 amd64 manifestのdigestを`green.env.example`で固定し、version更新時は
Image Factory registryから新digestを再取得する。

1. `scripts/preflight-reservations`を実行する。
2. IX2215の固定DHCP 5件を反映する。
3. `terraform/talos-green`を停止状態で作成する。
4. `green.env.example`をGit外`green.env`へ複製し、同versionの`talosctl`で
   `scripts/generate-configs`を実行する。
5. 各nodeがmaintenance APIへ応答した後、control plane 3台へ`controlplane.yaml`、worker 2台へ
   `worker.yaml`を`apply-config --insecure`する。
   Proxmox VirtIO NICは`ens18`であり、VIP patchのlink名を変更してはならない。
6. `.137`だけで`bootstrap`を一度実行する。VIPはetcd bootstrap後にだけ有効になるため、Talos APIの
   `talosconfig` endpointには各control plane実IPを使い、VIPを復旧用endpointにしない。
7. VM 5 node Ready、etcd 3 member、VIP failoverを確認後にISOよりdiskを優先する。
8. `scripts/label-nodes`でIPからnodeを解決し、Proxmox failure domainとrole labelを付与する。

## Raspberry Pi 4 worker

| hostname | IP | RAM | architecture | install disk |
|---|---|---:|---|---|
| `worker-03-talos-home-rpi4-arm64` | `192.168.10.107` | 2 GB | arm64 | `/dev/sda` |
| `worker-04-talos-home-rpi4-arm64` | `192.168.10.109` | 4 GB | arm64 | `/dev/sda` |

Piは`rpi_generic` schematic `ee21ef4a5ef808a9b7484cc0dda0f25075021691c8c09a276591eedb638ea1f9`
のTalos v1.14.1 raw imageから起動する。machine configには`patches/worker-rpi4.yaml`と各hostname patchを
適用し、VM専用`worker-storage.yaml`および`qemu-guest-agent`を含めない。両nodeはVLAN 10のDHCP予約を
維持し、API VIP `192.168.20.228`へroutingする。

`scripts/label-nodes`はPiへ`hardware.miutaku/model=raspberry-pi-4b`、RAM容量、agent roleを付ける。
標準の`kubernetes.io/arch=arm64`と合わせ、arm64対応を確認したworkloadの配置制御に利用する。

RPiには`workload.miutaku/arm64=reviewed:NoSchedule`を付け、arm64 manifestを確認したworkloadだけが
明示的なtolerationで配置されるようにする。全nodeへ`node.miutaku/platform=pve|rpi`と
`network.miutaku/l2=vlan20|vlan10`を付ける。VLAN 20のMetalLB speakerはPVE workerだけに限定する。
HA workloadは`node.miutaku/platform`のtopology spreadでPVE/RPiへ分散し、単体の軽量exporterは
RPiをpreferred、PVEをfallbackとする。DB、映像処理、GitOps/Secret基盤、local PV利用PodはPVEへ残す。

管理端末では資格情報そのものをshell設定へ埋め込まず、次のパスだけを環境変数に設定する。

```bash
export TALOSCONFIG="$HOME/my-infra/talos/green/.generated/talosconfig"
export KUBECONFIG="$HOME/my-infra/talos/green/.generated/kubeconfig"
```

`.generated`は既存clusterのPKIと管理者資格情報を含むため、GitやSecrets Managerの通常Secretへ
保存しない。端末故障に備え、ディレクトリ一式を暗号化したオフホストバックアップとして保管する。
External Secrets Operatorのbootstrap credentialはBSMの`HOME_K8S_BWS_ACCESS_TOKEN`を原本とする。

2台のProxmox上へ3 control planeを配置するため、control plane VM 1台停止には耐えるが、2台の
control planeを持つ`pve-b550m`全損時はetcd quorumを失う。第三failure domain追加までは物理host障害を
HA合格条件に含めない。

## QEMU Guest Agent / hostname

本番VMは`schematic.yaml`の公式`qemu-guest-agent` extensionを含むImage Factory installerを使い、
Proxmox側もagent channelを有効にする。schematic IDとamd64 installer digestは
`green.env.example`およびTerraformで固定する。extension追加後にVirtIO portを生成するには、Talosの
kexecだけでなく一度QEMU VMを完全停止・起動する必要がある。

各node固有hostnameは`patches/*-hostname.yaml`で管理する。worker-01のKubernetes Node名も正規名とし、
状態データは共有NFSへ移行し、Nodeの`kubernetes.io/hostname`はTalosの正式hostnameと一致させる。
旧local-path PVの`talos-ayb-pmi`互換ラベルへ依存してはならない。
