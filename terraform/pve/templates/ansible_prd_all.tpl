# このファイルは terraform/pve によって自動生成されます。直接編集しないでください。
# 更新: terraform apply
lb:
  vip: ${lb_vip}

haproxy:
  bind: "{{ lb.vip }}"
  servers:
%{ for host in server_hosts ~}
    - name: "${host.hostname}"
      ip: ${host.ip}
%{ endfor ~}
