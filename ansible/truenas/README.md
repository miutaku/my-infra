# TrueNAS Scale ストレージ管理 (Ansible)

nas-01 (192.168.20.191) / nas-02 (192.168.20.192) の **ZFS データセットと NFS share** を
コードで宣言的に管理する。UI での手作業 ([docs/truenas-nfs-setup.md](../../docs/truenas-nfs-setup.md)) を置き換えるもの。

[arensb.truenas](https://github.com/arensb/ansible-truenas) コレクションを使用し、
SSH 経由で TrueNAS の middleware API を叩く (REST API 非依存なので TrueNAS 25.x 以降でも動く)。

## データセットの追加方法

`host_vars/<nas>.yml` の `truenas_datasets` に要素を1つ足して playbook を流すだけ:

```yaml
truenas_datasets:
  - name: raid1_case/myapp   # /mnt/raid1_case/myapp に作成される
    owner: "1000"            # 省略時 root
    mode: "0770"             # 省略時 0755
    nfs:                     # NFS export する場合のみ
      comment: myapp
      networks:              # 省略時 192.168.20.0/24 (group_vars)
        - 192.168.20.0/24
```

既存の UI 作成済み share もそのまま取り込める
(share はパスで同定されるため重複作成されず、networks 等が宣言に収束する)。

## 事前準備 (各 NAS で一度だけ、UI で実施)

1. **System > Services > SSH** を有効化 (Start Automatically ✓)
2. **Credentials > Local Users > admin**: SSH パスワードログイン許可
   (鍵を使う場合は Authorized Keys に公開鍵を登録) + `Allow all sudo commands` ✓

## 実行

```bash
cd ansible/truenas
ansible-galaxy collection install -r requirements.yml

# dry-run (差分確認)
ansible-playbook site.yml --check --diff -k -K

# 適用
ansible-playbook site.yml -k -K

# 特定 NAS のみ
ansible-playbook site.yml -l nas-01 -k -K
```

SSH 鍵を登録済みなら `-k` は不要。`-K` は become (sudo) パスワード。

## 注意

- パーミッション設定はマウントポイント直下のみ (非再帰)。既存データの所有権は変更しない。
- データセットの削除はこの playbook では行わない (`truenas_datasets` から消しても NAS には残る)。
  削除は UI から手動で行う。
- k8s 側の PV 定義: [epgstation/pvc.yaml](../../k8s/pve/epgstation/pvc.yaml) /
  [nextcloud/pvc.yaml](../../k8s/pve/nextcloud/pvc.yaml)
