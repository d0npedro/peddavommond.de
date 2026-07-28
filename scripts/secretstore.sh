#!/usr/bin/env bash
# Homelab Secretstore client for this control-center project.
# Values are NEVER printed by list/names. get prints raw value to stdout only
# (for shell capture). Prefer --export for scripts.
#
# Usage:
#   ./scripts/secretstore.sh health
#   ./scripts/secretstore.sh names
#   ./scripts/secretstore.sh get resend_api_key          # raw → stdout
#   eval "$(./scripts/secretstore.sh export resend_api_key RESEND_API_KEY)"
#   ./scripts/secretstore.sh has resend_api_key          # exit 0/1
set -euo pipefail

URL="${SECRETSTORE_URL:-http://192.168.2.50:8787}"
USER="${SECRETSTORE_USER:-admin}"
PASS="${SECRETSTORE_PASSWORD:-ficker123}"
AUTH=(-u "${USER}:${PASS}")

cmd="${1:-}"
shift || true

case "$cmd" in
  health)
    curl -fsS --max-time 5 "${URL}/v1/health"
    echo
    ;;
  names|list)
    curl -fsS --max-time 10 "${AUTH[@]}" "${URL}/v1/secrets" | python3 -c '
import sys, json
d = json.load(sys.stdin)
if isinstance(d, list):
    names = d
elif isinstance(d, dict):
    names = d.get("secrets") or d.get("names") or list(d.keys())
else:
    names = []
out = []
for n in names:
    out.append(n.get("name", n) if isinstance(n, dict) else str(n))
for n in sorted(set(out)):
    print(n)
'
    ;;
  get)
    name="${1:?secret name required}"
    curl -fsS --max-time 10 "${AUTH[@]}" "${URL}/v1/secrets/${name}"
    ;;
  export)
    name="${1:?secret name required}"
    envname="${2:-$name}"
    value="$(curl -fsS --max-time 10 "${AUTH[@]}" "${URL}/v1/secrets/${name}")"
    printf 'export %s=%q\n' "$envname" "$value"
    ;;
  has)
    name="${1:?secret name required}"
    curl -fsS --max-time 10 "${AUTH[@]}" "${URL}/v1/secrets" | python3 -c '
import sys, json
want = sys.argv[1]
d = json.load(sys.stdin)
if isinstance(d, list):
    names = d
elif isinstance(d, dict):
    names = d.get("secrets") or d.get("names") or list(d.keys())
else:
    names = []
out = set()
for n in names:
    out.add(n.get("name", n) if isinstance(n, dict) else str(n))
sys.exit(0 if want in out else 1)
' "$name"
    ;;
  check)
    curl -fsS --max-time 15 "${AUTH[@]}" "${URL}/v1/check" | python3 -c '
import sys, json
d = json.load(sys.stdin)
print("ok=", d.get("ok"), "total=", d.get("total_secrets"), "failed=", d.get("failed"), "ts=", d.get("ts"))
'
    ;;
  ""|-h|--help|help)
    sed -n '2,12p' "$0"
    ;;
  *)
    echo "unknown command: $cmd" >&2
    exit 2
    ;;
esac
