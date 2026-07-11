# NextCloud セットアップ手順

RKE2 上で動かす NextCloud の初期セットアップ手順。
マニフェストは [k8s/pve/nextcloud/](../k8s/pve/nextcloud/)、公開は Cloudflare Access 経由
(`https://nextcloud.miutaku.work`)。

## 構成

| 項目 | 値 |
| ---- | --- |
| URL | `https://nextcloud.miutaku.work` (Cloudflare Access 必須) |
| Namespace | `app-nextcloud` |
| DB | `infra-db` の共有 MariaDB (`mariadb.infra-db.svc.cluster.local`) / DB名・ユーザー名 `nextcloud` |
| データディレクトリ | nas-01 (192.168.20.191) の NFS `/mnt/raid1_case/nextcloud` |
| 本体 (`/var/www/html`) | `local-path` PVC (config.php / apps) |
| キャッシュ / file locking | 同 namespace の Redis (非永続) |

## 1. nas-01 の Dataset / NFS Share 作成

nas-02 の手順 ([truenas-nfs-setup.md](truenas-nfs-setup.md)) と同様に nas-01 (192.168.20.191) で実施。

**Datasets > pool > raid1_case > Add Dataset**:

| 設定項目 | 値 |
| ------- | --- |
| Name | `nextcloud` |
| Dataset Preset | Generic |
| ACL Type | POSIX |
| Compression | lz4 |

> **Note**: nas-01 のプール名が `raid1_case` でない場合は、
> [k8s/pve/nextcloud/pvc.yaml](../k8s/pve/nextcloud/pvc.yaml) の `nfs.path` を実際のパスに合わせること。

**Edit Permissions** (NextCloud はデータディレクトリの所有者 `www-data` (uid/gid 33)・mode 770 を要求する):

```text
User:  33 (www-data)
Group: 33 (www-data)
Mode:  770
Apply permissions recursively: ✓
```

**Shares > NFS > Add**:

```text
Path:    /mnt/raid1_case/nextcloud
Enabled: ✓
```

Advanced Options:

```text
Maproot User:  root
Maproot Group: root
Networks:
  192.168.20.0/24
```

NFS サービス設定 (NFSv4.1 有効化) は nas-02 と同じ。動作確認:

```bash
showmount -e 192.168.20.191
sudo mount -t nfs -o nfsvers=4.1 192.168.20.191:/mnt/raid1_case/nextcloud /mnt/test
df -h /mnt/test
sudo umount /mnt/test
```

## 2. MariaDB に DB とユーザーを作成

共有 MariaDB (`infra-db`) に一度だけ手動で作成する
(StatefulSet の `MYSQL_DATABASE` 環境変数は初回 init 時のみ有効なため)。

```bash
kubectl exec -it -n infra-db mariadb-0 -- \
  mysql -uroot -p"$(kubectl get secret -n infra-db mariadb-credentials -o jsonpath='{.data.MYSQL_ROOT_PASSWORD}' | base64 -d)"
```

```sql
CREATE DATABASE nextcloud CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER 'nextcloud'@'%' IDENTIFIED BY '<NEXTCLOUD_MYSQL_PASSWORD>';
GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextcloud'@'%';
FLUSH PRIVILEGES;
```

日次バックアップは [mariadb/backup-cronjob.yaml](../k8s/pve/mariadb/backup-cronjob.yaml) の
`APPS` に `nextcloud:nextcloud` を追加済み (OCI S3 へ dump)。

## 3. Bitwarden Secrets Manager にシークレット登録

| BSM シークレット名 | 値 |
| --- | --- |
| `NEXTCLOUD_MYSQL_PASSWORD` | 手順 2 で設定した DB パスワード |
| `NEXTCLOUD_ADMIN_PASSWORD` | 初期 admin ユーザーのパスワード (`openssl rand -base64 24` 等で生成) |

ExternalSecret は [nextcloud-secret.yaml](../k8s/pve/nextcloud/nextcloud-secret.yaml)。

## 4. Cloudflare (Terraform) 反映

`terraform/cloudflare/locals.tf` に追加済み:

- `rke2_services["nextcloud"]` → DNS CNAME + Tunnel ingress が自動生成される
- `access_protected_subdomains` に `nextcloud` → Access Application (メール許可リスト) が作成される

```bash
cd terraform/cloudflare
terraform plan
terraform apply
```

## 5. デプロイ

ArgoCD Application ([argocd-apps/nextcloud.yaml](../k8s/pve/argocd-apps/nextcloud.yaml)) を
main に push すれば自動 sync される。初回起動時はコンテナの entrypoint が
DB スキーマ作成と admin ユーザー作成を自動で行う (数分かかる。startupProbe で最大 10 分待つ)。

初回ログイン: `admin` / `NEXTCLOUD_ADMIN_PASSWORD`。

## 運用メモ

- **アップロードサイズ**: Cloudflare 経由のリクエストボディは 100MB 上限だが、
  NextCloud の Web UI / クライアントはチャンクアップロード (デフォルト 10MB) を行うため大容量ファイルも可。
- **occ コマンド**:
  `kubectl exec -it -n app-nextcloud deploy/nextcloud -c nextcloud -- su -s /bin/sh www-data -c "php occ <cmd>"`
- **バージョンアップ**: NextCloud はメジャーバージョンのスキップ不可。
  [nextcloud-deployment.yaml](../k8s/pve/nextcloud/nextcloud-deployment.yaml) の
  イメージタグ (`nextcloud:34-apache`) を 1 つずつ上げる (cron サイドカーも同時に)。
  各メジャーのサポートは約1年 ([endoflife.date/nextcloud](https://endoflife.date/nextcloud) 参照)。
- **MariaDB リソース**: `infra-db` の MariaDB は limits 500m/512Mi と小さめ。
  NextCloud 利用が増えて詰まるようなら
  [mariadb-statefulset.yaml](../k8s/pve/mariadb/mariadb-statefulset.yaml) の limits を引き上げる。
