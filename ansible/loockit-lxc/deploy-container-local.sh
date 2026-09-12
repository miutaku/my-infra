#!/usr/bin/env bash
set -euo pipefail

read -r operation image extra <<<"${SSH_ORIGINAL_COMMAND:-}"
if [[ "$operation" != "deploy" || -n "${extra:-}" || ! "$image" =~ ^ghcr\.io/miutaku/loockit:[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Only 'deploy ghcr.io/miutaku/loockit:<semver>' is allowed" >&2
  exit 64
fi

name=loockit
rollback_name=loockit-rollback
identity="$(cat /etc/loockit/identity)"
log_level="${LOOCKIT_LOG_LEVEL:-INFO}"
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
  -e LOOCKIT_LOG_LEVEL="$log_level" \
  -e LOOCKIT_LEADER_ELECTION=true \
  -e LOOCKIT_LEADER_LABEL_POD=false \
  -e POD_NAME="$identity" \
  -e KUBERNETES_SERVICE_HOST=192.168.20.228 \
  -e KUBERNETES_SERVICE_PORT_HTTPS=6443 \
  -e DBUS_SYSTEM_BUS_ADDRESS=unix:path=/run/dbus/system_bus_socket \
  -p 8080:8080 \
  -p 50051:50051 \
  -v /etc/loockit/config.toml:/config/config.toml:ro \
  -v /etc/loockit/kubernetes:/var/run/secrets/kubernetes.io/serviceaccount:ro \
  -v /mnt/host-dbus/system_bus_socket:/run/dbus/system_bus_socket:ro \
  "$image" run --config /config/config.toml >/dev/null

for attempt in $(seq 1 24); do
  if curl -fsS --max-time 5 http://127.0.0.1:8080/healthz >/dev/null; then
    trap - ERR
    docker rm -f "$rollback_name" >/dev/null 2>&1 || true
    echo "Loockit ${image} is ready"
    exit 0
  fi
  sleep 5
done

echo "Loockit ${image} did not become healthy; rolling back" >&2
false
