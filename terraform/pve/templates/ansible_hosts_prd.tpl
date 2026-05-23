# このファイルは terraform/pve によって自動生成されます。直接編集しないでください。
# 更新: terraform apply

[rke2-lb]
%{ for host in lb_hosts ~}
${host.ip} keepalived_priority=${host.priority} hostname=${host.hostname}
%{ endfor ~}

[rke2-server-primary]
%{ for host in server_primary ~}
${host.ip} hostname=${host.hostname}
%{ endfor ~}

[rke2-server-secondary]
%{ for host in server_secondary ~}
${host.ip} hostname=${host.hostname}
%{ endfor ~}

[rke2-agent]
%{ for host in agent_hosts ~}
${host.ip} hostname=${host.hostname}
%{ endfor ~}

# DVB 専用ワーカー (PT3 パススルー付き) — Mirakurun Pod 専用ノード
[rke2-dvb-worker]
${dvb_worker.ip} hostname=${dvb_worker.hostname}

[rke2-server:children]
rke2-server-primary
rke2-server-secondary

[rke2-node-all:children]
rke2-server
rke2-agent
rke2-dvb-worker

[prd-all:children]
rke2-lb
rke2-server
rke2-agent
rke2-dvb-worker
