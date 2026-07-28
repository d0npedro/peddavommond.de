# Secrets — Quelle der Wahrheit

**Primär: Homelab Secretstore** (`docs/SECRETSTORE.md`)  
**App-Kopien:** `D:\Projects\prisma-postgres\prisma-postgres\.env*` (nur app-lokal; nicht Agent-Vault)

## Pflicht-Workflow

```bash
./scripts/secretstore.sh health
./scripts/secretstore.sh names          # Namen wählen
# ein Key:
eval "$(./scripts/secretstore.sh export resend_api_key RESEND_API_KEY)"
# oder Batch (nur vorhandene):
source ./scripts/load-ops-env.sh
```

Antworten im Chat: nur „geholt: `resend_api_key` (ok)“ — **nie den Wert**.

## Mapping Store-Name → typische Env-Var

| Store-Name (Beispiel) | Env |
|---|---|
| `resend_api_key` | `RESEND_API_KEY` |
| `groq_api_key` | `GROQ_API_KEY` |
| `stripe_secret_key_test` / `_live` | `STRIPE_SECRET_KEY_TEST` / `_LIVE` |
| `suno_api_token` / `suno_api_url` | `SUNO_*` |
| `e2e_mailbox_*` | `E2E_MAILBOX_*` |
| `ha_token` / `ha_url` | `HA_*` |
| `paperless_token` / `paperless_url` | `PAPERLESS_*` |
| `openai_api_key` | `OPENAI_API_KEY` |
| `kasserver_user` / `kasserver_password` | `KASSERVER_*` (falls im Store) |

Liste ist unvollständig — **`./scripts/secretstore.sh names` ist Wahrheit**.

## Bekannte Lücke (Web/DNS)

All-Inkl KAS (`kasserver_user` / `kasserver_password`) war beim letzten Check **nicht** im Store.  
Für DNS-Änderungen: Secret im Store anlegen (PUT auf Anweisung) oder temporär nur lokal halten — nicht in Git.

## Verboten

- Secrets nach `~/.openclaw/.env` „syncen“ als dauerhafter Vault
- Werte in Docs/Commits/Chat
- Keys erfinden wenn Store offline
