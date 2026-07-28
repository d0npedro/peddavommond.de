#!/usr/bin/env bash
# Autonomer Follow-up nach access-audit: behebt, was ohne manuelle Secrets geht.
set -euo pipefail

ROOT="${ROOT:-/mnt/d/Projects/peddavommond.de}"
PROJECTS="${PROJECTS:-/mnt/d/Projects}"
DOCS="$ROOT/docs"
DNS_MANAGER="${DNS_MANAGER:-$HOME/.openclaw/workspace/tools/dns_manager.py}"
PY="${PY:-/usr/bin/python3}"

log() { printf '[followup] %s\n' "$*"; }

# Credentials: Homelab Secretstore only (fresh fetch)
if [[ -f "$ROOT/scripts/load-ops-env.sh" ]]; then
  # shellcheck disable=SC1091
  source "$ROOT/scripts/load-ops-env.sh" 2>/dev/null || echo "[followup] secretstore load failed" >&2
fi

mkdir -p "$DOCS"
REPORT="$DOCS/FOLLOWUP-$(date -u +%Y%m%dT%H%M%SZ).md"
{
  echo "# Access follow-up"
  echo
  echo "UTC: $(date -u -Iseconds)"
  echo
} >"$REPORT"

# 1) peddabot HTTP/HTTPS
log "Check peddabot.de"
PB_IP=$(getent hosts peddabot.de 2>/dev/null | awk '{print $1}' | head -1 || true)
HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 15 http://www.peddabot.de/ || echo err)
HTTPS_CODE=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 15 https://www.peddabot.de/ || echo err)
{
  echo "## peddabot.de"
  echo "- A: \`${PB_IP:-?}\` (expect 216.198.79.1)"
  echo "- HTTP www: $HTTP_CODE"
  echo "- HTTPS www: $HTTPS_CODE"
  echo
} >>"$REPORT"

if [[ "${PB_IP:-}" != "216.198.79.1" && -n "${KASSERVER_USER:-}" ]]; then
  log "Re-point peddabot.de to Vercel"
  "$PY" "$DNS_MANAGER" point peddabot.de vercel >>"$REPORT" 2>&1 || true
fi

# 2) Resend key presence (not validity of third-party)
if [[ -n "${RESEND_API_KEY:-}" ]] || grep -q '^RESEND_API_KEY=' "$ROOT/.env.ops" 2>/dev/null; then
  KEY="${RESEND_API_KEY:-$(grep -E '^RESEND_API_KEY=' "$ROOT/.env.ops" | head -1 | cut -d= -f2-)}"
  CODE=$(curl -s -o /tmp/resend_check.json -w '%{http_code}' -H "Authorization: Bearer $KEY" -H "User-Agent: GrokOps/1.0" -H "Accept: application/json" https://api.resend.com/domains || echo err)
  echo "## Resend" >>"$REPORT"
  echo "- openclaw has RESEND_API_KEY; /domains HTTP $CODE" >>"$REPORT"
  if [[ "$CODE" != "200" ]]; then
    echo "- **Action needed:** API key invalid/revoked — create new key at resend.com and replace in ~/.openclaw/.env + Vercel prisma-postgres" >>"$REPORT"
  fi
  echo >>"$REPORT"
else
  echo "## Resend" >>"$REPORT"
  echo "- missing RESEND_API_KEY in openclaw .env" >>"$REPORT"
  echo >>"$REPORT"
fi

# 3) SSH all-inkl
echo "## All-Inkl SSH" >>"$REPORT"
if [[ -f "$HOME/.ssh/id_ed25519_allinkl.pub" ]]; then
  if ssh -o BatchMode=yes -o ConnectTimeout=8 allinkl 'echo OK' 2>/dev/null; then
    echo "- SSH allinkl: **OK**" >>"$REPORT"
  else
    echo "- SSH allinkl: **blocked** — Public Key im KAS-Panel hinterlegen:" >>"$REPORT"
    echo '```' >>"$REPORT"
    cat "$HOME/.ssh/id_ed25519_allinkl.pub" >>"$REPORT"
    echo '```' >>"$REPORT"
    echo "- See docs/SSH-ALLINKL.md" >>"$REPORT"
  fi
else
  echo "- no allinkl key; run keygen" >>"$REPORT"
fi
echo >>"$REPORT"

# 4) Local project links
echo "## Local projects" >>"$REPORT"
if [[ -d "$PROJECTS/prisma-postgres/prisma-postgres/.vercel" ]]; then
  echo "- prisma-postgres nested project OK (\`prisma-postgres/prisma-postgres\`)" >>"$REPORT"
else
  echo "- prisma-postgres missing nested project" >>"$REPORT"
fi
if git -C "$PROJECTS/nemoclaw-deployment.com" remote get-url origin >/dev/null 2>&1; then
  echo "- nemoclaw origin: $(git -C "$PROJECTS/nemoclaw-deployment.com" remote get-url origin)" >>"$REPORT"
else
  echo "- nemoclaw missing origin" >>"$REPORT"
fi
echo >>"$REPORT"

log "Wrote $REPORT"
cat "$REPORT"
