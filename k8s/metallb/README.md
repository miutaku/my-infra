# helmでmetallbを入れる(Loadbalancer)

## helmでmetallbのインストールする。
```shell
$ kubectl create ns metallb-system
namespace/metallb-system created

$ helm repo add metallb https://metallb.github.io/metallb
$ helm install metallb metallb/metallb -n metallb-system
NAME: metallb
LAST DEPLOYED: Sun Jun  8 17:50:04 2025
NAMESPACE: metallb-system
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
MetalLB is now running in the cluster.

Now you can configure it via its CRs. Please refer to the metallb official docs
on how to use the CRs.
```

## 設定適用
```
$ kubectl apply -f metallb.yaml 
```

## 動作確認
```shell
$ kubectl get pods -n metallb-system --kubeconfig=/tmp/kubeconfig
NAME                                  READY   STATUS              RESTARTS   AGE
metallb-controller-5754956df6-zjqsj   1/1     Running             0          110s
metallb-speaker-2cvbt                 4/4     Running             0          110s
metallb-speaker-wqxqc                 4/4     Running             0          110s
```

```shell
kubectl get all -n app-gptwol
NAME                                    READY   STATUS    RESTARTS   AGE
pod/gptwol-deployment-6f5ccd7bf-q2k5g   1/1     Running   0          2m22s

NAME                     TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)          AGE
service/gptwol-service   LoadBalancer   10.43.54.213   192.168.0.200   5000:30000/TCP   33m

NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/gptwol-deployment   1/1     1            1           33m

NAME                                           DESIRED   CURRENT   READY   AGE
replicaset.apps/gptwol-deployment-56fc956766   0         0         0       33m
replicaset.apps/gptwol-deployment-6f5ccd7bf    1         1         1       2m22s
```
