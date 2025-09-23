# Terraform Tips

## 特定のVMを再作成（作り直し）する方法

VMが不安定になった場合など、特定の一台だけをTerraformで再作成したい場合があります。
`terraform apply -replace` コマンドを使用することで、他のリソースに影響を与えることなく、対象のVMを安全に破棄・再作成できます。

### 手順

#### 1. 再作成したいVMのリソースアドレスを特定する

まず、Terraformが管理しているリソースの一覧から、対象VMの正確なアドレスを見つけます。

`terraform state list` コマンドを実行すると、管理下にある全リソースのアドレスが表示されます。

```bash
# /home/miutaku/my-infra/terraform/pve ディレクトリで実行
terraform state list
```

リソースが多い場合は `grep` などで絞り込むと便利です。
例えば、`prd_rec_server` を再作成したい場合は、以下のように絞り込めます。

```bash
terraform state list | grep prd_rec_server
```

実行すると、以下のようなアドレスが見つかります。これがリソースアドレスです。

`module.prd_rec_server.proxmox_vm_qemu.vm["prd-rec-server-01-docker-ubuntu-24-04-home-amd64"]`

#### 2. `apply -replace` コマンドを実行する

特定したリソースアドレスを `-replace` オプションに指定して `terraform apply` を実行します。
**注意:** アドレスはシングルクォート (`'`) で囲むことを推奨します（シェルの解釈によるエラーを防ぐため）。

```bash
# テンプレート
terraform apply -replace='<手順1で特定したリソースアドレス>'

# prd_rec_server の例
terraform apply -replace='module.prd_rec_server.proxmox_vm_qemu.vm["prd-rec-server-01-docker-ubuntu-24-04-home-amd64"]'
```

コマンドを実行すると、Terraformは対象のVMを一度破棄し、すぐに同じ設定で新しいVMを作成します。

---

この手順を覚えておくと、インフラの一部だけをクリーンな状態に戻したい場合に非常に役立ちます。