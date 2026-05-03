#!/bin/bash
# Reads the VM name from the Proxmox cloud-init drive (cidata) and applies it
# as the system hostname. Runs on every boot so that renaming a VM in PVE is
# automatically reflected inside the guest — similar to GCP's guest agent.
set -euo pipefail

CIDATA_DEV=$(blkid --label cidata 2>/dev/null || true)
[ -z "$CIDATA_DEV" ] && exit 0

TMPDIR=$(mktemp -d)
trap 'umount "$TMPDIR" 2>/dev/null; rmdir "$TMPDIR"' EXIT

mount -o ro,noatime "$CIDATA_DEV" "$TMPDIR"

META="$TMPDIR/meta-data"
[ -f "$META" ] || exit 0

NEW_HOSTNAME=$(awk '/^local-hostname:/ { print $2 }' "$META")
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
