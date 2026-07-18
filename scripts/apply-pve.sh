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

export TF_VAR_pm_api_token_id="${PROXMOX_TOKEN_ID}"
export TF_VAR_pm_api_token_secret="${PROXMOX_TOKEN_SECRET}"

# --- Terraform apply ---
cd "${TF_DIR}"
terraform init -upgrade
terraform apply -auto-approve "$@"
