#!/bin/bash
# Reads the VM name from the Proxmox cloud-init drive (cidata) and applies it
# as the system hostname. Runs on every boot so that renaming a VM in PVE is
# automatically reflected inside the guest — similar to GCP's guest agent.
set -euo pipefail

# The cidata drive is a CD-ROM (/dev/sr0) that can appear a few seconds after
# boot; poll briefly so this does not no-op on early boot (seen on Debian).
CIDATA_DEV=""
for _ in $(seq 1 30); do
    CIDATA_DEV=$(blkid --label cidata 2>/dev/null || true)
    [ -n "$CIDATA_DEV" ] && break
    sleep 1
done
[ -z "$CIDATA_DEV" ] && exit 0

TMPDIR=$(mktemp -d)
trap 'umount "$TMPDIR" 2>/dev/null; rmdir "$TMPDIR"' EXIT

mount -o ro,noatime "$CIDATA_DEV" "$TMPDIR"

META="$TMPDIR/meta-data"
USERDATA="$TMPDIR/user-data"

# Proxmox writes the VM name into the cloud-init user-data as `hostname:`
# (its meta-data only carries instance-id). Prefer user-data; fall back to the
# meta-data `local-hostname:` for setups that provide it.
NEW_HOSTNAME=""
[ -f "$USERDATA" ] && NEW_HOSTNAME=$(awk '/^hostname:/ { print $2; exit }' "$USERDATA")
[ -z "$NEW_HOSTNAME" ] && [ -f "$META" ] && NEW_HOSTNAME=$(awk '/^local-hostname:/ { print $2; exit }' "$META")
[ -z "$NEW_HOSTNAME" ] && exit 0

CURRENT=$(hostname)
[ "$CURRENT" = "$NEW_HOSTNAME" ] && exit 0

hostnamectl set-hostname "$NEW_HOSTNAME"

if grep -q '^127\.0\.1\.1' /etc/hosts; then
    sed -i "s/^127\.0\.1\.1.*/127.0.1.1\t${NEW_HOSTNAME}/" /etc/hosts
else
    printf '127.0.1.1\t%s\n' "$NEW_HOSTNAME" >> /etc/hosts
fi

logger -t sync-hostname-from-pve "hostname updated: ${CURRENT} -> ${NEW_HOSTNAME}"
