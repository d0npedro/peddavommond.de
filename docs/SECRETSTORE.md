# Homelab Secretstore — Pflicht für Credentials

Die Steuerzentrale **hat keinen dauerhaften Secret-Vorrat**.  
API-Keys, Tokens und Passwörter kommen **immer frisch** aus dem LAN-Secretstore.

| | |
|---|---|
| **Base** | `http://192.168.2.50:8787` |
| **Alt.** | `http://secrets.home.arpa:8787` · `http://hub.home.arpa:8787` (DNS im LAN) |
| **Auth** | HTTP Basic `admin` / (siehe Store bzw. Hub) |
| **Host** | VM 110 `core-services`, systemd `secretstore.service` |
| **Doku** | `homesupervisor/homelab/secretstore/README.md` |

## Agent-Regeln (kurz)

1. Vor Nutzung: `GET /v1/secrets` → passenden **Namen** wählen (Liste ändert sich).
2. Nur **einen** benötigten Secret laden — nicht den Store dumpen.
3. Werte **nie** in Git, README, Issues, Screenshots oder lange Chat-Logs.
4. Name fehlt → melden + PUT-Vorschlag; **nicht raten**.
5. Außerhalb LAN / Timeout → melden, keine Fake-Keys.
6. **PUT nur** nach expliziter Anweisung.
7. Hub-UI: http://192.168.2.50:8787/

## In diesem Repo

```bash
# erreichbar?
./scripts/secretstore.sh health

# Namen (keine Werte)
./scripts/secretstore.sh names

# ein Secret in die Shell
eval "$(./scripts/secretstore.sh export resend_api_key RESEND_API_KEY)"

# Standard-Web-Ops-Set (nur vorhandene Namen)
source ./scripts/load-ops-env.sh
```

## Stand LAN-Check

- `GET /v1/health` → ok (wenn im Heimnetz).
- `secrets.home.arpa` / `hub.home.arpa` ggf. ohne Windows-Hosts-Eintrag nicht auflösbar → IP nutzen.

## Typische Lücken für Web/Hosting

Im Store können fehlen (Stand je `./scripts/secretstore.sh names` prüfen):

- `kasserver_user` / `kasserver_password` (All-Inkl KAS DNS API)

Setzen (nur wenn gewünscht):

```bash
printf '%s' "$VALUE" | curl -fsS -u admin:'…' -X PUT \
  --data-binary @- http://192.168.2.50:8787/v1/secrets/kasserver_user
```

## Was nicht mehr gilt

- `~/.openclaw/.env` ist **keine** Secret-Quelle für dieses Projekt.
- Lokale `.env.ops` im Repo höchstens temporär/offline — **Secretstore hat Vorrang**.
