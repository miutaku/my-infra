#!/usr/bin/env bash
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN is required}"
: "${CLOUDFLARE_ZONE_ID:?CLOUDFLARE_ZONE_ID is required}"

hostname="${1:?hostname is required}"
fingerprint="${2:?client certificate fingerprint is required}"
api="https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/rulesets"
auth_header="Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"

ruleset_id() {
  curl -fsS -H "${auth_header}" "${api}" | jq -r --arg phase "${1}" \
    '.result[]? | select(.kind == "zone" and .phase == $phase) | .id' | head -n1
}

upsert_rule() {
  local phase="$1"
  local ref="$2"
  local payload="$3"
  local ruleset
  local rule_id

  ruleset="$(ruleset_id "${phase}")"
  if [[ -z "${ruleset}" ]]; then
    local ruleset_payload
    ruleset_payload="$(jq -cn \
      --arg phase "${phase}" \
      --argjson rule "${payload}" \
      '{name:("Terraform-managed " + $phase + " rules"),description:"Rules managed by my-infra",kind:"zone",phase:$phase,rules:[$rule]}')"
    curl -fsS -o /dev/null -X POST \
      -H "${auth_header}" -H 'Content-Type: application/json' \
      --data "${ruleset_payload}" "${api}"
    return
  fi

  rule_id="$(curl -fsS -H "${auth_header}" "${api}/${ruleset}" | \
    jq -r --arg ref "${ref}" '.result.rules[]? | select(.ref == $ref) | .id' | head -n1)"

  if [[ -n "${rule_id}" ]]; then
    curl -fsS -o /dev/null -X PATCH \
      -H "${auth_header}" -H 'Content-Type: application/json' \
      --data "${payload}" "${api}/${ruleset}/rules/${rule_id}"
  else
    curl -fsS -o /dev/null -X POST \
      -H "${auth_header}" -H 'Content-Type: application/json' \
      --data "${payload}" "${api}/${ruleset}/rules"
  fi
}

mtls_expression="(http.host eq \"${hostname}\" and (not cf.tls_client_auth.cert_verified or cf.tls_client_auth.cert_revoked or cf.tls_client_auth.cert_fingerprint_sha256 ne \"${fingerprint}\"))"
mtls_payload="$(jq -cn --arg expression "${mtls_expression}" '{ref:"loockit_api_require_exact_client_certificate",description:"Require the active Android client certificate",expression:$expression,action:"block",enabled:true}')"
upsert_rule http_request_firewall_custom loockit_api_require_exact_client_certificate "${mtls_payload}"

surface_expression="(http.host eq \"${hostname}\" and not (http.request.method eq \"POST\" and http.request.uri.path eq \"/devices/intercom-bot/click\"))"
surface_payload="$(jq -cn --arg expression "${surface_expression}" '{ref:"loockit_api_allow_click_only",description:"Expose only the intercom Bot click operation",expression:$expression,action:"block",enabled:true}')"
upsert_rule http_request_firewall_custom loockit_api_allow_click_only "${surface_payload}"

rate_expression="(http.host eq \"${hostname}\" and http.request.method eq \"POST\" and http.request.uri.path eq \"/devices/intercom-bot/click\")"
rate_payload="$(jq -cn --arg expression "${rate_expression}" '{ref:"loockit_api_click_rate_limit",description:"Rate limit intercom Bot click requests",expression:$expression,action:"block",enabled:true,ratelimit:{characteristics:["cf.colo.id","ip.src"],period:10,requests_per_period:5,mitigation_timeout:10}}')"
upsert_rule http_ratelimit loockit_api_click_rate_limit "${rate_payload}"

for phase_and_ref in \
  'http_request_firewall_custom loockit_api_require_exact_client_certificate' \
  'http_request_firewall_custom loockit_api_allow_click_only' \
  'http_ratelimit loockit_api_click_rate_limit'; do
  read -r phase ref <<<"${phase_and_ref}"
  current_ruleset="$(ruleset_id "${phase}")"
  [[ -n "${current_ruleset}" ]]
  curl -fsS -H "${auth_header}" "${api}/${current_ruleset}" | \
    jq -e --arg ref "${ref}" '.result.rules[]? | select(.ref == $ref and .enabled == true)' >/dev/null
done

echo "loockit API edge rules are configured"
