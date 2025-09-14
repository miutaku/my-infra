# helmでmetallbを入れる(Loadbalancer)

## helmでmetallbのインストールする。
```shell
$ kubectl create ns metallb-system
namespace/metallb-system created

$ helm repo add metallb https://metallb.github.io/metallb
$ helm install metallb metallb/metallb -n metallb-system
```

## 設定適用
```
$ kubectl apply -f metallb.yaml 
```

## 動作確認
```shell
$ kubectl get pods -n metallb-system --kubeconfig=/tmp/kubeconfig
```

```shell
kubectl get all -n app-gptwol
```
