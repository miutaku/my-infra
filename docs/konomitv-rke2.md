# KonomiTV on RKE2

KonomiTV と EDCB-Wine を宅内 RKE2 に配置し、既存 Mirakurun と TrueNAS の録画領域を共用する。
移行期間中は EPGStation も継続稼働する。

## 構成

```text
PT3 -> Mirakurun ----> EPGStation（既存）
          |                 |
          +-> EDCB-Wine ----+--> TrueNAS /mnt/raid1_case/recorded
                  |
                  +-> KonomiTV -> cloudflared -> Cloudflare Access
```

- KonomiTV: 安定版 `0.14.1`、FFmpeg、1 replica
- KonomiTV は最大2本のCPUエンコードに備えて、12 vCPUの `pve-x570` workerに固定する
- EDCB-Wine: upstream commit `bb0b4005a9d9c7a6b67411dbb9e9b6255af34b0c`を同梱したimage tag `bb0b400-r2`、1 replica
- EDCB は番組情報、録画予約、録画を担当する
- KonomiTV のライブ受信は `always_receive_tv_from_mirakurun: true` で Mirakurun を直接利用する
- KonomiTV本体はinitContainerでEDCBのTCP 4510番を待ち、EDCB起動前のCrashLoopを防ぐ
- 録画領域は EDCB から読み書き、KonomiTV から読み取り専用でマウントする
- RKE2/containerdではKonomiTVが通常Linuxとして動作するため、録画領域は`/mnt/recorded`へ直接マウントする
- `https://konomitv.miutaku.work` は Cloudflare Tunnel と Access で保護する

EPGStation と EDCB は互いの予約を認識しない。移行期間中のチューナー競合は許容し、最終的には
録画予約を EDCB に一本化する。

### KonomiTV設定ファイルのマウント方式

`config.yaml` は ConfigMap の `subPath` を使って `/code/config.yaml` へ直接マウントしない。
KonomiTV公式イメージには `/code/config.yaml` があらかじめ存在せず、RKE2/containerdでは
存在しないファイルをmount targetにした `subPath` bind mountがコンテナ初期化時に失敗するためである。

代わりにConfigMap全体を読み取り専用で `/config-src` へマウントし、コンテナ起動コマンドで
`/config-src/config.yaml` を `/code/config.yaml` へコピーしてからKonomiTVを起動する。
設定変更を反映するにはDeploymentのPod再作成が必要となる。

### Cloudflare Tunnelからのorigin接続

KonomiTVの7000番はAkebi HTTPS Serverである。AkebiはKonomiTV用のホスト名を前提にTLSを処理するため、
cloudflaredがKubernetes ServiceのDNS名をSNIとして接続すると`tls: internal error`になる。

同じPodのnginx sidecarが`0.0.0.0:7001`で待ち受け、KonomiTV内部のUvicorn
`127.0.0.77:7010`へHTTPプロキシする。Serviceの7000番はこのsidecarへ転送し、cloudflaredは
`http://konomitv.app-konomitv.svc.cluster.local:7000`へ接続する。外部TLSと認証はCloudflareが担当する。
ライブ配信とWebSocketのため、nginxではbufferingを無効にし、長いread timeoutを設定している。

## 初回デプロイ

イメージは公式ソースから GitHub Actions で GHCR に作成する。先に次の workflow が成功していることを確認する。

- `.github/workflows/edcb_wine.yml`
- `.github/workflows/konomitv.yml`

両イメージの作成後、Argo CD の `edcb-wine`、`konomitv` Application を同期する。
KonomiTV の GHCR pull secret は Bitwarden Secrets Manager 項目 `KONOMITV_GHCR_PAT` を利用する。
EDCB-Wine は既存の `EPGSTATION_GHCR_PAT` を暫定的に再利用する。

## EDCB 初期設定

EDCB のデータは `edcb-wine-data` PVC に初回だけコピーされる。設定変更後も Pod 再作成では失われない。

初期設定時は noVNC を一時的に port-forward する。

```bash
kubectl -n app-edcb-wine port-forward service/edcb-wine 6510:6510
```

ブラウザで `http://127.0.0.1:6510` を開き、次を実施する。

1. EpgDataCap_Bon で `BonDriver_mirakc.dll` を使ってチャンネルスキャンする。
2. PT3 に合わせて `BonDriver_mirakc_T.dll` を2、`BonDriver_mirakc_S.dll` を2に設定する。
3. 録画先が `D:\TV-Record` であることを確認する。
4. EpgTimerSrv のTCP APIがポート4510で有効であることを確認する。
5. EPG取得を実行し、KonomiTV Podを再起動する。

`D:` はコンテナ内の `/mnt/hdd-record`、すなわちTrueNASのrecorded datasetに対応する。

## 確認

```bash
kubectl -n app-edcb-wine get pod,pvc,service
kubectl -n app-konomitv get pod,pvc,service
kubectl -n app-edcb-wine logs deployment/edcb-wine
kubectl -n app-konomitv logs deployment/konomitv
```

KonomiTV で次を確認する。

- 地デジ、BS/CSの番組表を取得できる
- ライブ視聴を開始できる
- KonomiTVから予約を登録できる
- `D:\TV-Record` に録画される
- 既存録画とEDCB録画を再生できる
- Cloudflare Access認証後もライブ視聴と録画再生が継続する

## 運用上の注意

- EDCB-Wine は停止時に EpgTimerSrv が強制終了する場合がある。録画中の手動同期、Pod削除、ノード保守を避ける。
- KonomiTV はCPUエンコードを最大2本想定し、CPU limitを8コアにしている。実測後に調整する。
- バージョン更新では workflow の固定バージョンまたはcommitと、Deploymentのimage tagを同時に変更する。
- EPGStationを削除するまでは、既存Annict同期とOCIエンコード連携を変更しない。
