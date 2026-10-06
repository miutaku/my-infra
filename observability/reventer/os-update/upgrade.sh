#!/bin/bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a
state=/var/lib/reventer-os-update/upgrade.json
trap 'echo '\''{"state":"failed"}'\'' > "$state"' ERR
apt-get update
# Stay on the supported LTS release. Refuse package removals; a distribution
# migration needs separate application, boot and restoration validation.
apt-get -y --no-remove -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold full-upgrade
printf '{"state":"succeeded"}\n' > "$state"
sync
systemctl reboot
