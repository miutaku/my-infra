#!/usr/bin/env bash
set -euo pipefail

read -r operation image extra <<<"${SSH_ORIGINAL_COMMAND:-}"
if [[ "$operation" != "deploy" || -n "${extra:-}" || ! "$image" =~ ^ghcr\.io/miutaku/loockit:[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Only 'deploy ghcr.io/miutaku/loockit:<semver>' is allowed" >&2
  exit 64
fi

name=loockit
rollback_name=loockit-rollback
docker pull "$image"
docker rm -f "$rollback_name" >/dev/null 2>&1 || true

has_rollback=false
if docker inspect "$name" >/dev/null 2>&1; then
  docker stop "$name" >/dev/null
  docker rename "$name" "$rollback_name"
  has_rollback=true
fi

rollback() {
  docker rm -f "$name" >/dev/null 2>&1 || true
  if [[ "$has_rollback" == true ]]; then
    docker rename "$rollback_name" "$name"
    docker start "$name" >/dev/null
  fi
}
trap rollback ERR

docker run -d \
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

# BlueZ discovery is not guaranteed to be active immediately after replacing
# the client. Seed a bounded, read-only scan so Loockit receives advertisements.
timeout 35 env \
  DBUS_SYSTEM_BUS_ADDRESS=unix:path=/mnt/host-dbus/system_bus_socket \
  bluetoothctl --timeout 30 scan on >/dev/null 2>&1 &

for attempt in $(seq 1 36); do
  devices="$(curl -fsS --max-time 5 http://127.0.0.1:8080/devices 2>/dev/null || true)"
  if grep -q '"device_id":"intercom-bot".*"online":true' <<<"$devices"; then
    trap - ERR
    docker rm -f "$rollback_name" >/dev/null 2>&1 || true
    echo "Loockit ${image} is ready"
    exit 0
  fi
  sleep 5
done

echo "Loockit ${image} did not bring the intercom device online; rolling back" >&2
false
