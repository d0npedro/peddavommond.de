# Infrastruktur & Zugänge — Steuerzentrale

*Stand: 2026-07-26 · Projekt: `peddavommond.de` steuert Websites / Vercel / Domains*

Dieses Dokument ist die **Source of Truth** für Remote-Zugänge. Erneut prüfen mit Workflow:

```text
/workflow access-audit
```

oder:

```text
workflow name=access-audit
```

---

## Ampel (nach Audit + Follow-up 2026-07-26)

| System | Status | Wie | Notizen |
|---|---|---|---|
| **Vercel CLI + MCP** | ✅ OK | `vercel whoami` → `d0npedro`; MCP `vercel__list_*` | Team: `Peter's projects` (`team_lhLhDMJHyq99lepMLa3LtNIR` / slug `peters-projects-1631d4ab`) |
| **GitHub CLI + MCP** | ✅ OK | `gh auth status` → `d0npedro`; scopes `repo, workflow, read:org, gist` | 50+ Repos unter `d0npedro` |
| **All-Inkl KAS API (DNS)** | ✅ OK | `KASSERVER_USER`/`PASSWORD` in `~/.openclaw/.env`; Python-Modul `kasserver` | Server `w016ffed.kasserver.com`, Shared IP `85.13.134.158`; `dns_manager.py` gefixt |
| **All-Inkl Mail (IMAP/SMTP)** | ⚠️ Credentials da | `EMAIL_ALLINKL_PASSWORD`, Tools `allinkl_mail.py` / `email_client.py` | Hosts: `w016ffed.kasserver.com` |
| **All-Inkl SSH Webspace** | ⚠️ Key lokal, Panel offen | Key `~/.ssh/id_ed25519_allinkl` + Host `allinkl` | **Public Key im KAS-Panel eintragen** → `docs/SSH-ALLINKL.md` |
| **All-Inkl FTP** | ⚠️ Port offen | Port 21 erreichbar | Keine FTP-Credentials; SSH bevorzugen |
| **Resend** | ✅ OK | Key aus `prisma-postgres/.env` → openclaw | Domain `verschenke-musik.de` verified; siehe `docs/SECRETS-INVENTORY.md` |
| **Gmail MCP** | ✅ Verbunden | MCP Server `gmail` | |
| **peddabot.de** | ✅ OK | A `216.198.79.1`, www project-CNAME, LE-Cert | `https://www.peddabot.de` → 200 (Cert `cert_…` erstellt + Redeploy) |
| **Supabase / Stripe / Ably** | ⚠️ Projekt-lokal | elmechanico / nepa / vermietertool | |

---

## Wichtige Pfade

| Was | Pfad |
|---|---|
| Lokale Projekte | `/mnt/d/Projects` (= `D:\Projects`) |
| **Ops-Secrets** | **Homelab Secretstore** `http://192.168.2.50:8787` — siehe `docs/SECRETSTORE.md` |
| Env laden | `source scripts/load-ops-env.sh` (holt frisch aus dem Store) |
| Secret CLI | `./scripts/secretstore.sh names\|get\|export\|health` |
| DNS Manager | `~/.openclaw/workspace/tools/dns_manager.py` |
| Domain-Doku (älter) | `~/.openclaw/workspace/DOMAINS.md` |
| KAS CLI | `kasserver-dns` (braucht **system** Python 3.12: `/usr/bin/python3`) |
| Archivierte All-Inkl Creds | `~/.openclaw/_archived_credentials/.allinkl_credentials.*.bak` |

### Python-Falle

- Default-Shell-Python ist oft **Homebrew 3.14** → `import kasserver` schlägt fehl.
- KAS-Tools laufen mit **`/usr/bin/python3` (3.12)** wo `kasserver` installiert ist.
- Env laden: `set -a; . ~/.openclaw/.env; set +a` — Achtung: Datei enthält ggf. Zeilen die nicht als Shell-Env taugen.

---

## Domains (All-Inkl DNS)

Nameserver typisch: `ns5.kasserver.com` / `ns6.kasserver.com`.

| Domain | A / Ziel | Hosting |
|---|---|---|
| peddavommond.de | `216.198.79.1` + www → Vercel CNAME | **Vercel** `peddavommond-router` → https://www.peddavommond.de |
| verschenke-musik.de | `216.198.79.1` | **Vercel** `prisma-postgres` → https://verschenke-musik.de |
| peddabot.de | `216.198.79.1` + www → `acb86c32faa05df8.vercel-dns-017.com` | **Vercel** `peddabot.de` → https://www.peddabot.de **200** |
| d0npedro.com | `85.13.134.158` | All-Inkl + Mail |
| medienvommond.de | `85.13.134.158` | All-Inkl |
| ramhenrichs.de | `85.13.134.158` | All-Inkl |
| gulasch-records.de | `85.13.134.158` | All-Inkl |
| bau-v.com | Squarespace IPs | Squarespace |
| hibll.de | Render | Render |
| jahreszeitenfasten.de | Render | Render |
| dysifu.de / fasdfasdf.de | All-Inkl | lt. DOMAINS.md |

**Vercel Domains (Registrar third-party):** `peddavommond.de`, `peddabot.de`, `verschenke-musik.de`.

---

## Vercel-Projekte (Team Peter's projects)

| Vercel-Projekt | Production URL | Lokaler Ordner | GitHub |
|---|---|---|---|
| peddavommond-router | https://www.peddavommond.de | `peddavommond.de` | d0npedro/peddavommond.de |
| prisma-postgres | https://verschenke-musik.de | `prisma-postgres` | d0npedro/prisma-postgres |
| peddabot.de | https://peddabotde.vercel.app | `peddabot.de` | (kein git remote lokal) |
| zum-fuchs | https://zum-fuchs.vercel.app | `zum-fuchs` | d0npedro/zum-fuchs |
| elmechanico | https://elmechanico.vercel.app | `elmechanico` | d0npedro/elmechanico |
| nepa-kreuzschleiftechnik-shop | …vercel.app | `nepa-kreuzschleiftechnik-shop` | d0npedro/nepa-kreuzschleiftechnik-shop |
| spotaccess | …vercel.app | `randomSpot` | d0npedro/spotaccess |
| technotool | …vercel.app | `technotool` | — |
| vermietertool | …vercel.app | `vermietertool` | d0npedro/mietklar |
| zeitfindung | …vercel.app | `zeitfindung` | d0npedro/zeitFindung |
| megamidi / slotmachine / open-state / … | siehe `vercel project ls` | diverse | diverse |

Weitere ohne starkes lokales Mapping: `dtc-lookup`, `elm327-obd-scanner`, `trafficforge`, `configgl`, `henrichs-verwaltung`, `freyascatering`, `hibll`, `mia-toolbox`, `justice-future-platform`, `nemoclaw-deployment.com`, `trenddna`.

---

## Autonome Follow-ups

Nach jedem Audit (oder manuell):

```bash
/mnt/d/Projects/peddavommond.de/scripts/execute-access-followups.sh
```

Schreibt `docs/FOLLOWUP-*.md` und repariert, was ohne Panel-Login geht (DNS-Re-Point, Checks).

Workflow: `/workflow access-audit` → danach Follow-up-Script.

## Lücken (noch manuell)

1. **SSH Public Key im KAS-Panel** — siehe `docs/SSH-ALLINKL.md` (Key ist lokal fertig).
2. Optional: Vercel Production `RESEND_API_KEY` an den gültigen Key aus `prisma-postgres/.env` anpassen (`.env.ops`/Production-Pull war ungültig; lokales `.env` ist OK).
3. Optional: `kasserver` für Default-Python 3.14 installieren; Follow-ups nutzen bereits `/usr/bin/python3`.

## Weitere API-Keys

Siehe **`docs/SECRETS-INVENTORY.md`** (Groq, Stripe test/live, Suno, Blob, Meta, E2E-Mailbox).

---

## Standard-Befehle

```bash
# Vercel
vercel whoami
vercel project ls
vercel domains ls

# GitHub
gh auth status
gh repo list d0npedro --limit 30

# All-Inkl DNS (wichtig: system python + env)
set -a; source <(grep -E '^(KASSERVER_USER|KASSERVER_PASSWORD)=' ~/.openclaw/.env); set +a
/usr/bin/python3 ~/.openclaw/workspace/tools/dns_manager.py list
/usr/bin/python3 ~/.openclaw/workspace/tools/dns_manager.py records peddavommond.de
kasserver-dns list d0npedro.com

# HTTP-Smoke
curl -sI -L --max-time 10 https://www.peddavommond.de | head -5
```

---

## Workflow

Siehe `.grok/workflows/access-audit.rhai` — paralleler Live-Check aller Zugänge, schreibt Report nach `docs/ACCESS-AUDIT-LATEST.md` wenn gewünscht.
