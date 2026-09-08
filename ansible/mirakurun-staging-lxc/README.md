# Mirakurun staging LXC

This playbook configures PX-S1UD on `pve-b550m`, deploys Mirakurun to CT 12904,
and exposes one local GR tuner plus one production-backed BS/CS tuner. The TCP
command explicitly sets `X-Mirakurun-Priority: 0`, the minimum accepted by the
production Mirakurun 4.1.3 API. Values below 0 are rejected with HTTP 400.
Do not install Debian `firmware-siano` on Proxmox: it conflicts with
`pve-firmware`. The playbook verifies the existing `isdbt_rio.inp` instead.
