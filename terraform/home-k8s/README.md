# home-k8s の Proxmox VM 管理

VM・ディスク・インストールISOは、[terraform/pve](../pve/) の `home_k8s` モジュールで管理する。
Terraform state は HCP Terraform の `miutaku/pve-home` に保管する。

VM ID、MACアドレス、DHCP予約は次のコマンドで確認できる。

```bash
terraform -chdir=terraform/pve output -json home_k8s_nodes
```

稼働中のTalosのCPU・メモリを変更する場合は、VMを1台ずつ正常停止・起動し、Nodeが
Readyに戻り、KubernetesのNode Allocatableへ反映されたことを確認してから次のVMへ進む。
Talosの構築と設定は [talos/home-k8s](../../talos/home-k8s/) を参照。

既存VMの `ide2` にあるインストールISOは Proxmox 側で確認する。BPG provider は
インポート時に `ide3` を参照するため、既存VMのCD-ROM構成は差分適用の対象に含めない。
ISOを更新する場合は新しいファイルとして追加し、必要なVMのマウント先を切り替える。
