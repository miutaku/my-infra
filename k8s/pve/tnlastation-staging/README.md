# TNLAStation staging

`main`へpushされたbackend/frontendは、それぞれのCI成功後に次のimageを発行します。

- `ghcr.io/miutaku/tnlastation-backend:staging`
- `ghcr.io/miutaku/tnlastation-ffmpeg-worker:staging`
- `ghcr.io/miutaku/tnlastation-frontend:staging`

同時に`staging-<commit SHA先頭12文字>`というimmutable tagも残すため、原因調査とrollbackに
利用できます。一般releaseのSemVer tagと`latest`は変更しません。

Argo CD Image Updaterはmutableな`staging` tagをdigest strategyで監視し、
`tnlastation-staging` ApplicationのKustomize image overrideだけを更新します。

## productionとの分離

| 項目 | staging |
| --- | --- |
| application namespace | `app-tnlastation-staging` |
| PostgreSQL namespace | `infra-db-staging` |
| PostgreSQL PVC | staging専用StatefulSetのPVC |
| application data | `/mnt/raid1_case/tnlastation-staging` |
| 録画領域 | `/mnt/raid1_case/recorded-staging` |
| URL | `https://tnlastation-staging.miutaku.work` |

Mirakurunだけはproductionと同じServiceを参照します。staging DBは空で開始するため、
productionの予約や録画情報は共有されません。

TrueNAS側で次のdirectoryを事前に作成してください。

```text
/mnt/raid1_case/tnlastation-staging
/mnt/raid1_case/recorded-staging
```

## 確認

```bash
kubectl kustomize k8s/pve/postgres-staging
kubectl kustomize k8s/pve/tnlastation-staging
kubectl get application,imageupdater -n argocd
kubectl get pods -n infra-db-staging
kubectl get pods -n app-tnlastation-staging
```
