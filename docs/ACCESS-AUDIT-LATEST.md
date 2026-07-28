# Access-Audit — Hosting & Zugänge

**Stand:** 2026-07-26  
**Projekt:** peddavommond.de (Control Center)  
**Projekte-Root:** `/mnt/d/Projects`  
**Gesamteinschätzung:** Core-Stack OK; Resend + SSH/Webspace unvollständig; peddabot.de down

---

## Headline

**Core-Stack OK (Vercel, GitHub, Mail, DNS); Resend + KAS-SSH fehlen; peddabot.de antwortet nicht**

---

## Systeme im Überblick

| System | Status | Kurzfassung |
|--------|--------|-------------|
| vercel | ok | CLI als `d0npedro` auf Peter's projects: 25 Projekte, 3 Domains; peddavommond.de → `peddavommond-router` |
| github | ok | CLI authentifiziert (`d0npedro`); Repo-Liste funktioniert; 15/16 lokale Repos mit Origin |
| all-inkl | degraded | KAS-DNS-API und Credentials OK; Host erreichbar (FTP/SSH-Ports), aber SSH ohne Key → Deploy-Pfad unvollständig |
| email | ok | Gmail + All-Inkl IMAP live OK; Resend fehlt im openclaw/Runtime-Setup |
| local-projects | ok | 32 Top-Level-Dirs; 12 fully-linked; wenige Orphans/Mismatches |
| http-health | degraded | peddavommond.de, verschenke-musik.de 200; **peddabot.de HTTP 000** |

---

## Kritische Lücken (actionable)

1. **peddabot.de ist down** — HTTP 000 trotz DNS (A → 85.13.134.158 / KAS). Domain zeigt auf All-Inkl-Shared-IP, während `peddabotde.vercel.app` 200 liefert.
2. **KAS-SSH ohne Private Key** — `w016ffed@w016ffed.kasserver.com` → `Permission denied (publickey,password)`. Kein BatchMode-Deploy per SSH/SFTP.
3. **Resend nicht angebunden** — Keine `RESEND_*` in `~/.openclaw/.env`, kein CLI/npm-global; nur in anderen Projekten (z. B. prisma-postgres).
4. **Kein Vercel-Projekt `control-center`** — Workspace mappt auf `peddavommond-router`; Mapping klar dokumentieren/benennen.
5. **prisma-postgres lokal unlinked** — Docs mappen verschenke-musik.de → prisma-postgres, aber lokal kein `.git`/`.vercel`.
6. **nemoclaw-deployment.com ohne git origin** — Lokales Repo ohne Remote.
7. **peddavommond.de Apex/www nicht auf KAS-IP** — A=216.198.79.1 / www=vercel-dns (bewusst Vercel); Webspace-Deploy über KAS betrifft nicht die Live-Site.

---

## Detail pro System

### 1. Vercel — `ok`

**Evidence**
- Login: `whoami=d0npedro`
- Team: 1 (`Peter's projects` / `peters-projects-1631d4ab`)
- Projekte: 25 (page1: 20 + page2: 5), u. a. `peddavommond-router` → https://www.peddavommond.de, `prisma-postgres` → https://verschenke-musik.de
- Domains: 3 (`peddavommond.de`, `peddabot.de`, `verschenke-musik.de`)
- Lokal: 15× `.vercel/project.json`, alle `orgId=team_lhLhDMJHyq99lepMLa3LtNIR`
- peddavommond.de verlinkt als `peddavommond-router` (`prj_H53a1dExQbERZ6K7Ni9BLGPyRQNr`)

**Gaps**
- MCP `list_teams` / `list_projects` hier nicht aufrufbar (Subagent-Interface)
- Kein Vercel-Projekt namens `control-center` (Workspace → `peddavommond-router`)
- 25 Remote-Projekte vs. 15 lokale Links (10 Remotes ohne lokales `project.json`)

**Nächste Schritte**
1. Entscheiden: Control Center = `peddavommond-router` belassen oder separates Vercel-Projekt anlegen und verlinken.
2. Optional: fehlende 10 Remote-Projekte per `vercel link` in die passenden lokalen Ordner binden (nur wo gewollt).
3. MCP-Vercel-Tools im Control-Center-Kontext prüfen, sobald `call_mcp_tool` verfügbar ist.

---

### 2. GitHub — `ok`

**Evidence**
- Login: `d0npedro` / Name „Pedda vom Mond“
- `gh repo list --limit 20` → 20 Repos (Limit erreicht)
- Lokal unter `/mnt/d/Projects`: 16 Git-Dirs, 15 mit Origin `d0npedro/*`, 1 ohne Remote

**Gaps**
- `nemoclaw-deployment.com` hat keinen `origin`
- Repo-Liste auf 20 begrenzt — Gesamtzahl remote ggf. höher
- Basename-Abweichungen lokal ↔ remote:  
  `homesupervisor`→`homeserver`, `randomSpot`→`spotaccess`, `vermietertool`→`mietklar`, `mailinvoice`→`mailinvoicegrabber`, `openState`→`open-state`, `zeitfindung`→`zeitFindung`

**Nächste Schritte**
1. Für `nemoclaw-deployment.com`: Remote setzen (`git remote add origin …`) oder Repo bewusst als lokal-only markieren.
2. Bei Bedarf `gh repo list --limit 100` für vollständige Inventur.
3. Basename-Mapping in Control-Center-Doku festhalten (keine Umbenennung nötig, solange Origins stimmen).

---

### 3. All-Inkl (KAS) — `degraded`

**Evidence**
- Keys: `KASSERVER_USER` / `KASSERVER_PASSWORD` vorhanden
- `dns_manager.py list` exit 0: 9 Domains  
  (`bau-v.com`, `d0npedro.com`, `gulasch-records.de`, `hibll.de`, `jahreszeitenfasten.de`, `medienvommond.de`, `peddavommond.de`, `ramhenrichs.de`, `verschenke-musik.de`)
- `peddavommond.de`: 6 DNS-Records; A=216.198.79.1, www=vercel-dns
- Host: `w016ffed.kasserver.com` → 85.13.134.158
- Port 21 OPEN, Port 22 OPEN
- SSH BatchMode: `Permission denied (publickey,password)` exit 255

**Gaps**
- SSH ohne Private Key (nur publickey/password angeboten)
- Kein verifizierter Webspace-Deploy-Pfad (SFTP/SSH-Key fehlt für BatchMode)
- FTP (21) erreichbar, aber in diesem Audit nicht authentifiziert
- peddavommond.de Apex/www **nicht** auf KAS-Shared-IP 85.13.134.158 (korrekt auf Vercel)

**Nächste Schritte**
1. SSH-Key für `w016ffed` im KAS-Panel hinterlegen und lokal unter `~/.ssh/` (BatchMode-fähig) einrichten; Test:  
   `ssh -o BatchMode=yes w016ffed@w016ffed.kasserver.com whoami`
2. Optional SFTP-Deploy-Script dokumentieren, falls Legacy-Webspace genutzt wird.
3. Für Live-Sites auf Vercel: KAS primär als DNS-Quelle behandeln; Deploy-Pfad klar trennen (Vercel vs. Webspace).
4. **peddabot.de:** DNS prüft A→85.13.134.158 — entweder KAS-Webspace-Inhalt bereitstellen **oder** A/CNAME auf Vercel umbiegen (siehe HTTP-Health).

---

### 4. E-Mail — `ok` (Resend-Lücke)

**Evidence**
- openclaw `.env`: `EMAIL_GMAIL_PASSWORD`, `EMAIL_WEBDE_PASSWORD`, `EMAIL_ALLINKL_PASSWORD`, `KASSERVER_USER`, `KASSERVER_PASSWORD` (kein `RESEND_*`)
- Tools: `email_client.py`, `allinkl_mail.py`
- Accounts: Gmail `peemakass@googlemail.com`, web.de `peter.henrichs@web.de`, All-Inkl `ph@d0npedro.com`
- Live read-only: Gmail inbox OK (msg 3519, 2026-07-26); All-Inkl inbox OK (msg 51400, 2026-07-26)
- Gmail-MCP-Schemas vorhanden; Invoke in diesem Subagent nicht genutzt
- Resend CLI/npm-global: abwesend
- `RESEND_API_KEY` nur in `prisma-postgres` `.env*` und `randomSpot` `.env.example`

**Gaps**
- Keine `RESEND_*` in `~/.openclaw/.env`
- Resend-CLI und npm-global-Package fehlen
- `INFRASTRUCTURE.md` erwähnt optionales Resend-Wiring — nicht für openclaw/peddavommond.de Runtime gebunden

**Nächste Schritte**
1. Falls Transaktionsmail nötig: `RESEND_API_KEY` in openclaw/.env setzen, Domain in Resend verifizieren, optional CLI installieren.
2. Falls nicht nötig: in `INFRASTRUCTURE.md` als „bewusst nicht angebunden“ markieren, um False Alarms zu vermeiden.
3. IMAP-Pfade (Gmail/All-Inkl) bleiben der verifizierte Primary-Path.

---

### 5. Local Projects — `ok`

**Evidence**
- 32 Top-Level-Dirs unter `/mnt/d/Projects`
- git=16, vercel=15, origin-remote=15, fully-linked (git+vercel+remote)=12

**Gaps / Orphans**
| Typ | Ordner |
|-----|--------|
| vercel-without-git | `euroPool`, `peddabot.de`, `technotool` |
| git-without-remote | `nemoclaw-deployment.com` |
| infra-mismatch | `prisma-postgres` — kein `.git`/`.vercel`, Docs mappen verschenke-musik.de → prisma-postgres |

**Nächste Schritte**
1. `prisma-postgres`: Repo klonen bzw. `.vercel` linken, oder Docs an den tatsächlichen lokalen Pfad anpassen.
2. Vercel-only-Ordner: entweder Git initialisieren + Remote oder als deploy-only Assets dokumentieren.
3. `nemoclaw-deployment.com`: Origin setzen oder aus Git-Inventur ausnehmen.

---

### 6. HTTP-Health — `degraded`

| URL | Ergebnis |
|-----|----------|
| https://www.peddavommond.de | 200 |
| https://peddavommond.de | 200 |
| https://verschenke-musik.de | 200 |
| https://peddabot.de | **000** |
| https://peddabotde.vercel.app | 200 |
| https://zum-fuchs.vercel.app | 200 |
| https://elmechanico.vercel.app | 200 |

**Gaps**
- `https://peddabot.de` antwortet nicht (HTTP 000); DNS zeigt auf KAS 85.13.134.158, während das Vercel-Preview `peddabotde.vercel.app` gesund ist.

**Nächste Schritte**
1. DNS für `peddabot.de` prüfen: A/CNAME auf Vercel (`cname.vercel-dns.com` bzw. Vercel-IPs) umstellen **oder** Webspace auf KAS mit gültigem vHost/SSL befüllen.
2. In Vercel Domains: `peddabot.de` dem richtigen Projekt zuweisen und SSL abwarten.
3. Erneut prüfen: `curl -sI https://peddabot.de` → erwartet 200/301.

---

## Priorisierte Next Steps (kurz)

| Prio | Aktion | System |
|------|--------|--------|
| P0 | peddabot.de DNS → Vercel oder KAS-Webspace fixen | http-health / all-inkl / vercel |
| P1 | SSH-Key für `w016ffed` einrichten (BatchMode) | all-inkl |
| P2 | Resend bewusst anbinden oder als optional streichen | email |
| P3 | prisma-postgres lokal linken oder Docs korrigieren | local-projects |
| P4 | nemoclaw-deployment.com Origin setzen | github |
| P5 | control-center vs. peddavommond-router Naming klären | vercel |

---

## Inventar-Notizen (nicht kritisch)

- 25 Vercel-Remotes vs. 15 lokale Links — erwartet bei Multi-Project-Account.
- GitHub-Listing limit 20 — bei Bedarf erhöhen.
- Lokale Ordnernamen weichen teils von Remote-Namen ab (Mapping oben).
- peddavommond.de Live-Traffic liegt auf Vercel (216.198.79.1), nicht auf KAS-Shared-Hosting — DNS-API bei All-Inkl bleibt steuert.

---

*Generiert aus Probe-JSON des Control-Center Access-Audits. Keine Systeme außerhalb der Probes erfunden.*

---

## Follow-up executed 2026-07-26 (autonomous)

| Item | Result |
|------|--------|
| peddabot.de DNS → Vercel | Done: A `76.76.21.21`, www CNAME `cname.vercel-dns.com` |
| peddabot HTTP | `http://www.peddabot.de` → **200** |
| peddabot HTTPS | Still TLS pending (`SSL_ERROR_SYSCALL`) — cert provisioning |
| prisma-postgres local | Nested path documented + `.git`/`.vercel` symlinks at outer |
| nemoclaw git origin | Created `d0npedro/nemoclaw-deployment.com` + remote set |
| Resend | Key present but **API invalid** — needs new key from resend.com |
| KAS SSH | Key generated `id_ed25519_allinkl`; **KAS panel still needs public key** |
| dns_manager.py | Fixed to match real kasserver API signatures |

See also: `docs/SSH-ALLINKL.md`, `docs/FOLLOWUP-*.md`, `scripts/execute-access-followups.sh`

### peddabot HTTPS fixed (same session)

- DNS aligned to Vercel rank-1: A `216.198.79.1`, www → `acb86c32faa05df8.vercel-dns-017.com`
- Issued cert via API: `cert_BEhYBwZ3M0DMQRweU1StUt69` (peddabot.de + www)
- Production redeploy aliased to www
- **https://www.peddabot.de → 200**, Let's Encrypt CN=www.peddabot.de
