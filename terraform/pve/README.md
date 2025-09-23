# Proxmox VE: PCI/PCIeパススルーのためのIOMMUグループ分離設定

## 前提条件: IOMMUの有効化

PCIパススルーを行うには、まずホストシステムでIOMMUが有効になっている必要があります。

1.  **BIOS/UEFI設定の確認**
    マザーボードのBIOS/UEFI設定で、以下の項目が `Enabled` (有効) になっていることを確認してください。
    - Intel CPUの場合: `Intel VT-d`
    - AMD CPUの場合: `AMD-V`, `IOMMU`, `SVM` など (名称はマザーボードメーカーによって異なります)

2.  **基本的なカーネルパラメータの追加**
    CPUに応じて、以下のカーネルパラメータを追記することでIOMMUを有効化します。これらのパラメータは、後述する `pcie_acs_override` と同じ場所に追加します。
    - Intel CPUの場合: `intel_iommu=on`
    - AMD CPUの場合: `amd_iommu=on`
    - パフォーマンス向上のため、`iommu=pt` (パススルーモード) も併せて追加することを推奨します。

## 概要

Proxmox VE環境で特定のPCI/PCIeデバイス（TVチューナーカード、GPUなど）をVMにパススルーする際、IOMMUグループが適切に分離されていないことが原因でホストOSがクラッシュしたり、不安定になったりすることがあります。

これは特にコンシューマ向けのマザーボードで発生しやすく、パススルーしたいデバイスが、ホストの動作に不可欠な他のデバイス（オンボードNIC、SATAコントローラ、USBコントローラなど）と同じIOMMUグループにまとめられてしまうために起こります。

このドキュメントでは、カーネルパラメータ `pcie_acs_override` を使ってIOMMUグループを強制的に分離し、安全にPCI/PCIeパススルーを行うための手順を整理します。

## 1. 現状のIOMMUグループを確認する

まず、Proxmoxホストのシェルで以下のコマンドを実行し、現在のIOMMUグループの構成を確認します。

```bash
pvesh get /nodes/$(hostname)/hardware/pci --pci-class-blacklist ""
```

出力結果の `iommugroup` カラムを確認し、パススルーしたいデバイスが、他の重要なデバイスと同じグループ番号に属していないかを確認します。
もし同じグループに含まれている場合、次の手順に進みます。

## 2. ブートローダーの種類を確認する

カーネルパラメータの編集方法は、Proxmoxホストが使用しているブートローダーによって異なります。

- **systemd-boot の場合:** (UEFIブートでZFSをルートファイルシステムとしてインストールした場合のデフォルト)
  - `/etc/kernel/cmdline` ファイルが存在します。
- **GRUB の場合:** (Legacy BIOSブートや、ext4/xfsファイルシステムでインストールした場合のデフォルト)
  - `/etc/default/grub` ファイルが存在します。

以下の手順では、今回の環境(`pve-b550m`)で利用されていた `systemd-boot` の方法を先に説明します。

## 3. カーネルパラメータを設定する

### 3-1. systemd-boot の場合

1.  `/etc/kernel/cmdline` ファイルを編集します。

    ```bash
    sudo vim.tiny /etc/kernel/cmdline
    ```

2.  既存の行の末尾に、スペース区切りで必要なカーネルパラメータを追記します。
    (例: AMD CPUの場合)
    ```diff
    - root=ZFS=rpool/ROOT/pve-1 boot=zfs nomodeset
    + root=ZFS=rpool/ROOT/pve-1 boot=zfs nomodeset amd_iommu=on iommu=pt pcie_acs_override=downstream,multifunction
    ```

3.  設定をブートローダーに反映させます。

    ```bash
    sudo proxmox-boot-tool refresh
    ```

### 3-2. GRUB の場合

1.  `/etc/default/grub` ファイルを編集します。

    ```bash
    sudo vim.tiny /etc/default/grub
    ```

2.  `GRUB_CMDLINE_LINUX_DEFAULT` の行を探し、`quiet` の後ろなどに必要なカーネルパラメータを追記します。

    ```diff
    - GRUB_CMDLINE_LINUX_DEFAULT="quiet"
    + GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt pcie_acs_override=downstream,multifunction"
    ```

3.  設定をGRUBに反映させます。

    ```bash
    sudo update-grub
    ```

## 4. 再起動と確認

1.  設定を反映させるためにホストを再起動します。

    ```bash
    sudo reboot
    ```

2.  再起動後、カーネルパラメータが正しく適用されていることを確認します。

    ```bash
    cat /proc/cmdline
    ```
    出力に `pcie_acs_override=...` が含まれていることを確認してください。

3.  再度IOMMUグループの構成を確認し、目的のデバイスが単独のグループに分離されていることを確認します。

    ```bash
    pvesh get /nodes/$(hostname)/hardware/pci --pci-class-blacklist ""
    ```

## 5. Terraformでの設定

IOMMUグループの分離が完了したら、Terraform側でPCIパススルーを有効にします。

```terraform
# main.tf
module "prd_rec_server" {
  # ... (省略) ...
  machine        = "q35" # pcie = trueの場合のみ
  pcis = {
    pci0 = {
      mapping = {
        mapping_id = "earthsoft_pt3"
        pcie       = true # q35の場合のみtrueにできる
      }
    }
  }
}
```

`machine = "q35"` はPCIeパススルーを行う際に必要となることが多い設定です。もしこの設定でエラーが出る場合は、ホストのBIOS/UEFIでVT-d (Intel) や AMD-V (AMD) が有効になっているかを確認してください。