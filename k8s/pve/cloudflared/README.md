# Cloudflare Tunnel

2レプリカを `topology.miutaku/failure-domain` の異なる物理ホストに分散する。
PVEのworkerと物理RPiを候補とし、特定ノードには固定しない。ラベルは
`talos/home-k8s/scripts/label-nodes` で設定する。PDBは自発的な退避時に最低1接続を維持する。
Cloudflareは同じTunnelの残存レプリカへ接続を振り分ける。

hostNetworkの2000番 `/ready` をPVEの保守エージェントから確認する。
再起動対象PVE以外の接続が確認できない場合は再起動を保留する。
workerの増減・IP・PVE所属変更時はAnsibleのavailability-policy.jsonも更新する。
監視基盤や個々のKubernetesサービスの継続稼働はこの保護の対象外。
