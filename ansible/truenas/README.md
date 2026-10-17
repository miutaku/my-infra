# TrueNAS Scale ストレージ管理 (Ansible)

監視用ユーザー・APIキーは、ストレージ変更を含まない`monitoring.yml`で管理する。
`midclt`をSSH経由で実行する。実機23.10では、`CALL pool.query`と`CALL alert.list`だけを許可するallowlist付きキーを作成し、ユーザーは追加しない。25.10では専用group/userと`READONLY_ADMIN` privilegeを作成する。
adminへのSSH公開鍵登録とsudo利用は事前に設定する。25.10で作るAPI専用ユーザーにはSSH・SMB・passwordログインを許可しない。

```bash
cd ansible/truenas
ansible-playbook monitoring.yml --check -K
ansible-playbook monitoring.yml -K
```

sudoがpassword不要なら`-K`は省略できる。SSH鍵を指定する場合は`--private-key /path/to/key`を付ける。
APIキーは各NASの`/data/home-monitoring/api-key.json`へ保存し、実行端末の
`.local/home-monitoring/nas-01.json`・`nas-02.json`へ取得する。保存先directoryは0700、ファイルは0600。
JSON内にBWSキー名と値が入るため、`HOME_MONITORING_NAS_01_API_KEY`・`HOME_MONITORING_NAS_02_API_KEY`として手動登録する。
これらのローカルファイルはGitに追加しない。`.local/home-monitoring/`を実行端末の`.git/info/exclude`へ登録しておく。

再実行では既存APIキーを維持する。NAS側の保存ファイルが失われた場合・キーが失効していた場合は停止し、勝手に再発行しない。
既存の同名ユーザー/groupに別の権限や利用者がある場合も変更せず停止する。
リポジトリrootでのローカル検証は`python3 -m unittest discover -s ansible/truenas/tests -v`で実行できる。


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

worker03・04はNFS接続元がVLAN10のため、`truenas_nfs_additional_networks`で
`192.168.10.107/32`・`192.168.10.109/32`を各共有の許可先へ追加する。
既存のVLAN10全体の許可がある録画用共有は`nfs.additional_networks: []`で
重複する/32追加を省略し、既存の許可ネットワークを維持する。
共有アクセスだけの更新は`ansible-playbook nfs-access.yml -K`で実行できる。
このplaybookはデータセット作成、所有権・モード変更、NFSサービス再起動を行わない。

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
