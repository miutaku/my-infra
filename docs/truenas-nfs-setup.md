# TrueNAS Scale NFS セットアップ手順

EPGStation (録画/サムネイル) および OKE エンコードワーカーが使用する NFS 共有の設定手順。

## 前提

| 項目 | 値 |
|------|-----|
| TrueNAS IP | 192.168.20.192 (nas-02) |
| NFS Pool | `pool > raid1_case` |
| アクセス元 | 192.168.20.0/24 (RKE2), 10.0.0.0/16 (OCI VCN) |
| NFS バージョン | NFSv4.1 |

## 1. Dataset 作成

**Datasets > pool > raid1_case > Add Dataset** を2回実行:

| 設定項目 | recorded | thumbnail |
|---------|----------|-----------|
| Name | `recorded` | `thumbnail` |
| Dataset Preset | Generic | Generic |
| ACL Type | POSIX | POSIX |
| Compression | lz4 | lz4 |

## 2. パーミッション設定

各 Dataset: **Datasets > pool > raid1_case > (dataset名) > Edit Permissions**

```
User:  root
Group: root
Mode:  755
Apply permissions recursively: ✓
```

## 3. NFS サービス設定

**Services > NFS > Configure**:

```
Enable NFSv4:        ON   ← nfsvers=4.1 のため必須
NFSv3 ownership model for NFSv4: OFF
Start Automatically: ON
```

**Start** ボタンでサービス起動。

## 4. NFS Share 作成

**Shares > NFS > Add** を2回実行:

### recorded

```
Path:    /mnt/raid1_case/recorded
Enabled: ✓
```

Advanced Options:
```
Maproot User:  root
Maproot Group: root
Networks:
  192.168.20.0/24
  10.0.0.0/16
```

### thumbnail

```
Path:    /mnt/raid1_case/thumbnail
Enabled: ✓
```

Advanced Options:
```
Maproot User:  root
Maproot Group: root
Networks:
  192.168.20.0/24
  10.0.0.0/16
```

## 5. 動作確認

RKE2 worker または OKE ノードから:

```bash
# エクスポート一覧確認
showmount -e 192.168.20.192

# マウントテスト
sudo mount -t nfs -o nfsvers=4.1 192.168.20.192:/mnt/raid1_case/recorded /mnt/test
df -h /mnt/test
sudo umount /mnt/test
```

## K8s 側の設定

[epgstation/pvc.yaml](../k8s/pve/epgstation/pvc.yaml) 参照。

| PV                      | NFS Path                  | PVC                      |
|-------------------------|---------------------------|--------------------------|
| epgstation-recorded-pv  | /mnt/raid1_case/recorded  | epgstation-recorded-pvc  |
| epgstation-thumbnail-pv | /mnt/raid1_case/thumbnail | epgstation-thumbnail-pvc |

mountOptions: `nfsvers=4.1, hard, timeo=600, retrans=3`
