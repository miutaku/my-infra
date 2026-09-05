# Talos production Green

Blue RKE2と並行して構築する本番クラスタ。API endpointはTalos内蔵L2 VIP
`https://192.168.20.228:6443`、nodeは`.137`–`.141`である。machine config、PKI、kubeconfigは
`.generated`だけへ生成し、GitやBSMへ平文保存しない。
installerはv1.13.9 amd64 manifestのdigestを`green.env.example`で固定し、version更新時は
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
7. 5 node Ready、etcd 3 member、VIP failoverを確認後にISOよりdiskを優先する。
8. `scripts/label-nodes`でIPからnodeを解決し、Proxmox failure domainとrole labelを付与する。

2台のProxmox上へ3 control planeを配置するため、control plane VM 1台停止には耐えるが、2台の
control planeを持つ`pve-b550m`全損時はetcd quorumを失う。第三failure domain追加までは物理host障害を
HA合格条件に含めない。
