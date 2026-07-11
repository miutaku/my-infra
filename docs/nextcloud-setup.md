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
| 本体 (`/var/www/html`, データディレクトリ含む) | `local-path` PVC |
| 共有ストレージ | 既存 NAS export を External Storage として提供 (下記) |
| キャッシュ / file locking | 同 namespace の Redis (非永続) |

NextCloud 専用の NAS 領域は**作らない**。NextCloud が自前で必要とするのは
設定・アプリ・メタデータ用の小さな領域だけで、これは local-path PVC で足りる。
共有したいデータ (現状は EPGStation の録画) は、既存の NFS export を pod に
マウントして NextCloud の **External Storage** 機能で見せる。

| External Storage | NFS export | pod 内マウント先 |
| --- | --- | --- |
| recorded | nas-02 (192.168.20.192) `/mnt/raid1_case/recorded` | `/mnt/nas/recorded` (readOnly) |

録画の実体は EPGStation と同じ export なので、誤操作防止のため readOnly でマウントしている
(NAS 側パーミッションも root:755 のため uid 33 の NextCloud からはもともと書き込み不可)。

## 1. 共有ストレージの追加方法 (今後増やすとき)

1. [pvc.yaml](../k8s/pve/nextcloud/pvc.yaml) に PV/PVC を1組追加
   (NAS 側に export がなければ先に [ansible/truenas/](../ansible/truenas/) で dataset + share を追加)
2. [nextcloud-deployment.yaml](../k8s/pve/nextcloud/nextcloud-deployment.yaml) の
   nextcloud / cron 両コンテナに volume + volumeMount (`/mnt/nas/<名前>`) を追加
3. デプロイ後に External Storage として登録:

```bash
kubectl exec -n app-nextcloud deploy/nextcloud -c nextcloud -- \
  su -s /bin/sh www-data -c "php occ files_external:create <名前> local null::null -c datadir=/mnt/nas/<名前>"
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
| `NEXTCLOUD_MYSQL_PASSWORD` | 手順 2 で設定する DB パスワード |
| `NEXTCLOUD_ADMIN_PASSWORD` | 初期 admin ユーザーのパスワード |

CLI で登録する場合 (machine account に my-infra プロジェクトへの write 権限が必要):

```bash
PROJECT=$(bws project list | jq -r '.[] | select(.name == "my-infra") | .id')
bws secret create NEXTCLOUD_MYSQL_PASSWORD "$(openssl rand -base64 32 | tr -d '/+=' | cut -c1-32)" "$PROJECT"
bws secret create NEXTCLOUD_ADMIN_PASSWORD "$(openssl rand -base64 32 | tr -d '/+=' | cut -c1-32)" "$PROJECT"
```

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

## 6. External Storage の有効化 (初回のみ)

デプロイ完了後に一度だけ実行:

```bash
kubectl exec -n app-nextcloud deploy/nextcloud -c nextcloud -- \
  su -s /bin/sh www-data -c "php occ app:enable files_external"
kubectl exec -n app-nextcloud deploy/nextcloud -c nextcloud -- \
  su -s /bin/sh www-data -c "php occ files_external:create recorded local null::null -c datadir=/mnt/nas/recorded"
# 作成された Mount ID (上記の出力) に対してオプションを設定:
#   enable_sharing:           共有リンク発行を許可
#   readonly:                 読み取り専用
#   filesystem_check_changes: アクセス時に変更検知 (EPGStation が外部から録画を追加するため必須。
#                             既定の 0 だと NextCloud 外での追加/削除が反映されない)
kubectl exec -n app-nextcloud deploy/nextcloud -c nextcloud -- \
  su -s /bin/sh www-data -c "php occ files_external:option 1 enable_sharing true \
    && php occ files_external:option 1 readonly true \
    && php occ files_external:option 1 filesystem_check_changes 1 \
    && php occ files_external:verify 1"
```

Web UI のファイル一覧に `recorded` が現れ、EPGStation の録画を閲覧・ダウンロード・共有できる
(pod 側の NFS マウントも readOnly なので録画実体を壊すことはない)。

## 7. 監視 (初回のみ)

vmagent ([k8s/pve/vmagent/values.yaml](../k8s/pve/vmagent/values.yaml)) の `blackbox_http` ジョブが
`/status.php` を監視する。blackbox は Host ヘッダにターゲットの svc DNS 名を使うため、
trusted_domains に追加しておく (再インストール時も必要):

```bash
kubectl exec -n app-nextcloud deploy/nextcloud -c nextcloud -- \
  su -s /bin/sh www-data -c "php occ config:system:set trusted_domains 2 --value=nextcloud.app-nextcloud.svc.cluster.local"
```

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
