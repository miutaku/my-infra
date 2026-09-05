#!/usr/bin/env bash
set -euo pipefail

ct_id="${LOOCKIT_CT_ID:-12902}"
image="${LOOCKIT_IMAGE:?LOOCKIT_IMAGE is required}"
name=loockit
rollback_name=loockit-rollback

pct exec "$ct_id" -- docker pull "$image"
pct exec "$ct_id" -- docker rm -f "$rollback_name" >/dev/null 2>&1 || true

old_image=""
if pct exec "$ct_id" -- docker inspect "$name" >/dev/null 2>&1; then
  old_image="$(pct exec "$ct_id" -- docker inspect --format '{{.Config.Image}}' "$name")"
  pct exec "$ct_id" -- docker stop "$name" >/dev/null
  pct exec "$ct_id" -- docker rename "$name" "$rollback_name"
fi

rollback() {
  pct exec "$ct_id" -- docker rm -f "$name" >/dev/null 2>&1 || true
  if [[ -n "$old_image" ]]; then
    pct exec "$ct_id" -- docker rename "$rollback_name" "$name"
    pct exec "$ct_id" -- docker start "$name" >/dev/null
  fi
}
trap rollback ERR

pct exec "$ct_id" -- docker run -d \
  --name "$name" \
  --restart unless-stopped \
  --env-file /etc/loockit/loockit.env \
  -e LOOCKIT_LEADER_ELECTION=false \
  -e DBUS_SYSTEM_BUS_ADDRESS=unix:path=/run/dbus/system_bus_socket \
  -p 8080:8080 \
  -p 50051:50051 \
  -v /etc/loockit/config.toml:/config/config.toml:ro \
  -v /mnt/host-dbus/system_bus_socket:/run/dbus/system_bus_socket:ro \
  "$image" run --config /config/config.toml >/dev/null

for attempt in $(seq 1 24); do
  if curl -fsS --max-time 5 http://192.168.20.133:8080/readyz >/dev/null; then
    trap - ERR
    pct exec "$ct_id" -- docker rm -f "$rollback_name" >/dev/null 2>&1 || true
    echo "Loockit ${image} is ready"
    exit 0
  fi
  sleep 5
done

echo "Loockit ${image} did not become ready; rolling back" >&2
false
