# TNLAStation

TNLAStationを宅内RKE2へdeployするmanifestです。EPGStationとは別の
`app-tnlastation` namespaceで動作します。

## 構成

- backend、frontend、gatewayを個別Deploymentとして実行
- 録画TSエンコード用WorkerをDeployment、ストリーミング用WorkerをStatefulSetで実行
- PostgreSQLは汎用の`postgres` Argo CD appとして`infra-db` namespaceで実行
- 録画領域とapplication共有領域をTrueNAS NFSのRWX PVCで共有
- SecretはExternal Secrets OperatorでBitwarden Secrets Managerから取得
- `tnlastation.miutaku.work`をCloudflare Tunnel経由でgatewayへ接続

## 事前準備

Bitwarden Secrets Managerへ`TNLASTATION_POSTGRES_PASSWORD`を登録してください。

backendとFFmpeg Workerは、用途別poolとHLSの担当Pod追跡を含む`1.1.0` imageを参照します。
TNLAStation-backendで`v1.1.0`をreleaseしてからArgo CDで同期してください。

TrueNAS `192.168.20.192`へ次のdirectoryが必要です。

```text
/mnt/raid1_case/tnlastation
```

backendとFFmpeg Workerは、このdirectoryを`/var/lib/tnlastation`として共有します。
HLS segment、thumbnail、drop log、upload一時fileが保存されます。

録画先は既存EPGStationと同じ`/mnt/raid1_case/recorded`です。移行確認中に両applicationを
同時稼働させる場合は、同じ番組の二重録画と容量自動削除の競合に注意してください。

## PostgreSQL

`k8s/pve/argocd-apps/postgres.yaml`がDBを先に同期し、TNLAStation本体は
`postgres.infra-db.svc.cluster.local`へ接続します。
DBのPVC、更新、障害範囲はapplication本体から分離されています。

## FFmpeg Workerとautoscaling

Workerにnode selectorは設定していないため、resourceを満たす任意のnodeで動作します。
CPU使用率60%を目標にHPAが次の範囲でscaleします。

| pool | controller | replicas | requests | limits |
| --- | --- | --- | --- | --- |
| 録画TSエンコード | Deployment | 1–4 | CPU 1、memory 1 GiB | CPU 8、memory 4 GiB |
| ストリーミング | StatefulSet | 1–3 | CPU 500m、memory 512 MiB | CPU 4、memory 2 GiB |

録画TS WorkerはHTTP LBでjobを受けず、各PodがPostgreSQLの共有queueから1件ずつ
原子的にclaimします。30秒のleaseを10秒ごとに更新し、Pod消失時は期限切れjobを
別Podが再取得します。claimごとに固有の一時fileを使うため、古いPodは完了を確定できません。

probeとthumbnailだけは`ffmpeg-worker-encode` Service経由です。ライブ・録画視聴は
`ffmpeg-worker-streaming`へ送られます。ストリーミング開始後はbackendが担当Podの
stable DNSを保持し、状態確認と停止を同じPodへ送ります。scale downは再生中Podを
急に落としにくいよう1時間安定後に1Podずつ行います。

HPAにはclusterのMetrics API（通常はmetrics-server）が必要です。

## 確認

```bash
kubectl kustomize k8s/pve/tnlastation
kubectl kustomize k8s/pve/postgres
kubectl diff -k k8s/pve/tnlastation
kubectl get pods,pvc,externalsecret -n infra-db
kubectl get pods,pvc,externalsecret -n app-tnlastation
```

Argo CDでは`k8s/pve/argocd-apps/tnlastation.yaml`から自動同期します。
