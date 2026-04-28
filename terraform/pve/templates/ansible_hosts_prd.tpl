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

[rke2-server:children]
rke2-server-primary
rke2-server-secondary

[rke2-node-all:children]
rke2-server
rke2-agent

[prd-all:children]
rke2-lb
rke2-server
rke2-agent
