[displaylink_kiosk]
%{ for host in kiosk_hosts ~}
${host.ip} hostname=${host.hostname}
%{ endfor ~}

[prd_all:children]
displaylink_kiosk
