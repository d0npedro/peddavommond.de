# All-Inkl SSH-Zugang (Webspace)

## Status

- Host: `w016ffed.kasserver.com`
- User: `w016ffed`
- Port 22 erreichbar
- **SSH-Key lokal vorbereitet**, aber **noch nicht im KAS-Panel freigeschaltet**
  → `ssh allinkl` schlägt mit `Permission denied` fehl, bis der Public Key hinterlegt ist

## Lokal erzeugt

| Datei | Zweck |
|---|---|
| `~/.ssh/id_ed25519_allinkl` | Private Key (nie teilen) |
| `~/.ssh/id_ed25519_allinkl.pub` | Public Key → ins KAS |
| `~/.ssh/config` Host `allinkl` | `ssh allinkl` |

## Public Key (in KAS eintragen)

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDheSpTL6DYFg+auT1eHsmr6oOF8ulpsvr/BFnQLZ/J1 grok-allinkl-deploy@peet
```

### Im KAS (all-inkl.com)

1. Login → **Tools** → **SSH** / **SSH-Zugang**
2. SSH aktivieren falls nötig
3. Public Key oben hinzufügen (authorized_keys)
4. Test:

```bash
ssh -o BatchMode=yes allinkl 'pwd && ls'
```

KAS-API (`kasserver` Python) kann **nur DNS**, keine SSH-Keys verwalten.

## Nach Freischaltung

Dateiablage / klassische Websites deployen z. B.:

```bash
rsync -avz --delete ./dist/ allinkl:~/html/example/
```
