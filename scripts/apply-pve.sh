#!/usr/bin/env bash
# terraform/pve を BWS 経由でシークレットを注入して apply する。
# 使い方: BWS_ACCESS_TOKEN=xxx ./scripts/apply-pve.sh [terraform apply オプション]
set -euo pipefail

if [[ -z "${BWS_ACCESS_TOKEN:-}" ]]; then
  echo "BWS_ACCESS_TOKEN is not set"
  exit 1
fi

bws_get() {
  bws secret list | jq -r --arg key "$1" '.[] | select(.key == $key) | .value'
}

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TF_DIR="${SCRIPT_DIR}/../terraform/pve"

echo "Fetching secrets from BWS..."
PROXMOX_TOKEN_ID=$(bws_get PACKER_PROXMOX_TOKEN_ID)
PROXMOX_TOKEN_SECRET=$(bws_get PACKER_PROXMOX_TOKEN_SECRET)
MM_OW_API_KEY=$(bws_get MM_OW_API_KEY)
MM_CALENDAR_URL=$(bws_get MM_CALENDAR_URL)

export TF_VAR_pm_api_token_id="${PROXMOX_TOKEN_ID}"
export TF_VAR_pm_api_token_secret="${PROXMOX_TOKEN_SECRET}"

# --- mm-server cloud-init snippet: render locally and upload to pve-b550m ---
SNIPPET_NAME="mm-server-user-data.yaml"
SNIPPET_TEMPLATE="${TF_DIR}/templates/mm-server-user-data.tftpl"
SNIPPET_TMP="${TF_DIR}/.tmp/${SNIPPET_NAME}"

mkdir -p "${TF_DIR}/.tmp"

echo "Rendering mm-server cloud-init snippet..."
ow_api_key="${MM_OW_API_KEY}" calendar_url="${MM_CALENDAR_URL}" \
  envsubst '${ow_api_key} ${calendar_url}' < "${SNIPPET_TEMPLATE}" > "${SNIPPET_TMP}"

echo "Uploading snippet to pve-b550m local:snippets..."
scp "${SNIPPET_TMP}" root@192.168.0.119:/var/lib/vz/snippets/"${SNIPPET_NAME}"
echo "[mm-server] snippet uploaded: ${SNIPPET_NAME}"

# Clean up temp file (contains secrets)
rm -f "${SNIPPET_TMP}"

# --- Terraform apply ---
cd "${TF_DIR}"
terraform init -upgrade
terraform apply -auto-approve "$@"
