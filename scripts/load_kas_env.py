#!/usr/bin/env python3
"""Load KASSERVER_* from Homelab Secretstore (preferred) into os.environ."""
from __future__ import annotations

import os
import urllib.request
from base64 import b64encode
from pathlib import Path

URL = os.environ.get("SECRETSTORE_URL", "http://192.168.2.50:8787")
USER = os.environ.get("SECRETSTORE_USER", "admin")
PASS = os.environ.get("SECRETSTORE_PASSWORD", "ficker123")

# Possible store names for All-Inkl KAS API
CANDIDATES = [
    ("kasserver_user", "KASSERVER_USER"),
    ("kasserver_password", "KASSERVER_PASSWORD"),
    ("allinkl_kas_user", "KASSERVER_USER"),
    ("allinkl_kas_password", "KASSERVER_PASSWORD"),
]


def _auth_header() -> str:
    token = b64encode(f"{USER}:{PASS}".encode()).decode()
    return f"Basic {token}"


def _get(name: str) -> str | None:
    req = urllib.request.Request(
        f"{URL}/v1/secrets/{name}",
        headers={"Authorization": _auth_header()},
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            return resp.read().decode().strip()
    except Exception:
        return None


def _list_names() -> set[str]:
    req = urllib.request.Request(
        f"{URL}/v1/secrets",
        headers={"Authorization": _auth_header()},
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            import json

            d = json.loads(resp.read().decode())
    except Exception:
        return set()
    if isinstance(d, list):
        raw = d
    elif isinstance(d, dict):
        raw = d.get("secrets") or d.get("names") or list(d.keys())
    else:
        raw = []
    out = set()
    for n in raw:
        out.add(n.get("name", n) if isinstance(n, dict) else str(n))
    return out


def load() -> dict:
    """Returns {env_var: loaded_bool} without revealing values."""
    names = _list_names()
    status = {}
    for store_name, env_name in CANDIDATES:
        if store_name not in names:
            status[env_name] = False
            continue
        if env_name in os.environ and os.environ[env_name]:
            status[env_name] = True
            continue
        val = _get(store_name)
        if val:
            os.environ[env_name] = val
            status[env_name] = True
        else:
            status[env_name] = False
    return status


if __name__ == "__main__":
    st = load()
    print("KASSERVER_USER", "ok" if st.get("KASSERVER_USER") else "MISSING")
    print("KASSERVER_PASSWORD", "ok" if st.get("KASSERVER_PASSWORD") else "MISSING")
    if not all(st.values()):
        print(
            "Hint: put kasserver_user + kasserver_password into secretstore "
            "(PUT only when user asks)."
        )
