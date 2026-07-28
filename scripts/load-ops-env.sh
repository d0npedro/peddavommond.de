#!/usr/bin/env bash
# Load ops credentials for this control-center session FROM the Homelab Secretstore.
# Not openclaw. Not a long-lived local vault — always fetch fresh.
#
#   source scripts/load-ops-env.sh
#   source scripts/load-ops-env.sh resend_api_key groq_api_key
#
# With no args: loads a sensible default set for web/hosting work (only names that exist).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SS="${ROOT}/scripts/secretstore.sh"
URL="${SECRETSTORE_URL:-http://192.168.2.50:8787}"

if ! curl -fsS --max-time 4 "${URL}/v1/health" >/dev/null 2>&1; then
  echo "secretstore unreachable at ${URL} (LAN 192.168.2.0/24 required)" >&2
  return 1 2>/dev/null || exit 1
fi

# name_in_store -> ENV_VAR
# Keep mapping explicit; store names are source of truth for existence.
map_default=(
  "resend_api_key:RESEND_API_KEY"
  "from_email:FROM_EMAIL"
  "groq_api_key:GROQ_API_KEY"
  "suno_api_token:SUNO_API_TOKEN"
  "suno_api_url:SUNO_API_URL"
  "stripe_secret_key_test:STRIPE_SECRET_KEY_TEST"
  "stripe_secret_key_live:STRIPE_SECRET_KEY_LIVE"
  "stripe_webhook_secret:STRIPE_WEBHOOK_SECRET"
  "blob_read_write_token:BLOB_READ_WRITE_TOKEN"
  "e2e_mailbox_host:E2E_MAILBOX_HOST"
  "e2e_mailbox_user:E2E_MAILBOX_USER"
  "e2e_mailbox_password:E2E_MAILBOX_PASSWORD"
  "meta_conversions_api_token:META_CONVERSIONS_API_TOKEN"
  "meta_pixel_id:NEXT_PUBLIC_META_PIXEL_ID"
  "cron_secret:CRON_SECRET"
  "neon_project_id:NEON_PROJECT_ID"
  "ha_token:HA_TOKEN"
  "ha_url:HA_URL"
  "paperless_token:PAPERLESS_TOKEN"
  "paperless_url:PAPERLESS_URL"
  "openai_api_key:OPENAI_API_KEY"
  # All-Inkl KAS — only if present in store (currently often missing)
  "kasserver_user:KASSERVER_USER"
  "kasserver_password:KASSERVER_PASSWORD"
  "kasserver_user:KASSERVER_USER"
  "allinkl_kas_user:KASSERVER_USER"
  "allinkl_kas_password:KASSERVER_PASSWORD"
)

wanted=("$@")
if [[ ${#wanted[@]} -eq 0 ]]; then
  # default: all mapped names
  for pair in "${map_default[@]}"; do
    wanted+=("${pair%%:*}")
  done
fi

# unique preserve order
declare -A seen=()
names=()
for n in "${wanted[@]}"; do
  [[ -n "${seen[$n]:-}" ]] && continue
  seen[$n]=1
  names+=("$n")
done

# fetch store name list once
store_names="$("$SS" names 2>/dev/null || true)"
if [[ -z "$store_names" ]]; then
  echo "secretstore: could not list names" >&2
  return 1 2>/dev/null || exit 1
fi

loaded=()
missing=()

env_for_name() {
  local n="$1"
  for pair in "${map_default[@]}"; do
    if [[ "${pair%%:*}" == "$n" ]]; then
      echo "${pair#*:}"
      return 0
    fi
  done
  # fallback: upper snake
  echo "$n" | tr '[:lower:]-' '[:upper:]_'
}

for n in "${names[@]}"; do
  if ! grep -qxF "$n" <<<"$store_names"; then
    missing+=("$n")
    continue
  fi
  envn="$(env_for_name "$n")"
  # shellcheck disable=SC1090
  eval "$("$SS" export "$n" "$envn")"
  loaded+=("$n→$envn")
done

if [[ ${#loaded[@]} -gt 0 ]]; then
  echo "secretstore loaded: ${loaded[*]}" >&2
fi
if [[ ${#missing[@]} -gt 0 ]]; then
  echo "secretstore missing (not loaded): ${missing[*]}" >&2
fi
