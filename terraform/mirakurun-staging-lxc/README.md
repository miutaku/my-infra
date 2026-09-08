# Mirakurun staging LXC

CT 12904 (`192.168.20.142`) runs on `pve-b550m`. It uses the mapped
PX-S1UD (`plex_s1ud`, USB `3275:0080`) only for GR. Its single BS/CS tuner is
a TCP stream from production Mirakurun with `X-Mirakurun-Priority: 0`, the
minimum value accepted by Mirakurun 4.1.3. Production recording requests with
higher priority preempt staging.

The host must load `smsusb`/`smsdvb` with `isdbt_rio.inp` from the existing
Proxmox `pve-firmware` package and create
`/dev/dvb/adapter0` before CT 12904 starts. Ansible validates the USB ID,
driver, firmware, and all three DVB nodes.
