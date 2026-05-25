#!/usr/bin/env bash
set -euo pipefail

TEMPLATE="${1:-}"
if [[ -z "$TEMPLATE" ]]; then
  echo "Usage: $0 <ubuntu-26-04|truenas-scale|mm-server> [--node <proxmox_node>] [--vmid <vmid>]"
  exit 1
fi
shift

NODE_VAR=""
VMID_VAR=""
URL_VAR=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --node)
      case "$2" in
        pve-x570)  URL_VAR="-var proxmox_url=https://192.168.0.115:8006/api2/json" ;;
        pve-b550m) URL_VAR="-var proxmox_url=https://192.168.0.119:8006/api2/json" ;;
      esac
      NODE_VAR="-var proxmox_node=${2}"
      shift 2 ;;
    --vmid) VMID_VAR="-var vmid=${2}"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

if [[ -z "${BWS_ACCESS_TOKEN:-}" ]]; then
  echo "BWS_ACCESS_TOKEN is not set"
  exit 1
fi

bws_get() {
  bws secret list | jq -r --arg key "$1" '.[] | select(.key == $key) | .value'
}

PROXMOX_TOKEN_ID=$(bws_get PACKER_PROXMOX_TOKEN_ID)
PROXMOX_TOKEN_SECRET=$(bws_get PACKER_PROXMOX_TOKEN_SECRET)

cd "$(dirname "$0")/$TEMPLATE"

packer init .

case "$TEMPLATE" in
  ubuntu-26-04)
    SSH_PASSWORD=$(bws_get PACKER_SSH_PASSWORD)
    SSH_PASSWORD_HASH=$(mkpasswd -m sha-512 "$SSH_PASSWORD")
    packer build \
      -var "proxmox_token_id=${PROXMOX_TOKEN_ID}" \
      -var "proxmox_token_secret=${PROXMOX_TOKEN_SECRET}" \
      -var "ssh_password=${SSH_PASSWORD}" \
      -var "ssh_password_hash=${SSH_PASSWORD_HASH}" \
      -var "ssh_public_key=$(cat ~/.ssh/id_rsa.pub)" \
      -var "memory=4096" \
      ${URL_VAR} ${NODE_VAR} ${VMID_VAR} \
      .
    ;;
  truenas-scale)
    TRUENAS_ADMIN_PASSWORD=$(bws_get PACKER_TRUENAS_ADMIN_PASSWORD)
    packer build \
      -var "proxmox_token_id=${PROXMOX_TOKEN_ID}" \
      -var "proxmox_token_secret=${PROXMOX_TOKEN_SECRET}" \
      -var "admin_password=${TRUENAS_ADMIN_PASSWORD}" \
      ${NODE_VAR} ${VMID_VAR} \
      .
    ;;
  mm-server)
    # proxmox-clone ベース: ISO不要、SSH鍵で接続
    packer build \
      -var "proxmox_token_id=${PROXMOX_TOKEN_ID}" \
      -var "proxmox_token_secret=${PROXMOX_TOKEN_SECRET}" \
      -var "ssh_private_key_file=${HOME}/.ssh/id_rsa" \
      ${URL_VAR} ${NODE_VAR} ${VMID_VAR} \
      .
    ;;
esac
