# Loockit

本番のBLEコントローラはLXC 12902/12903で稼働する。
leader選出はCloudflare Durable Object、公開REST APIは専用Tunnelを使う。
[Loockit LXC](../../../ansible/loockit-lxc/README.md)を参照。

Kubernetes側のREST/gRPCプロキシ、旧BLE Deployment、ServiceAccountとRBACは撤去した。
監視はLXC 2台の `/readyz` に直接接続し、待機系503だけでは障害判定しない。
旧共用Tunnelのloockit-apiルートは404にし、DNSは引き続き専用Tunnelを指す。
公開APIに必要なLXC内のHAProxyは維持する。

Argo CDによるNamespaceの巻き添え削除を防ぐため、Namespace定義とApplicationは維持する。
