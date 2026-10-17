#!/usr/bin/env python3
"""Preview or configure notification formatting. Default is read-only.

Only `configure --apply` writes: PUT two formatting fields on one verified UID.
Never creates/deletes receivers or sends notifications. Secrets remain in memory.
"""
import argparse
import json
import os
from pathlib import Path
import re
import subprocess
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]


class Grafana:
    def __init__(self):
        secrets = {}
        if not os.getenv("GRAFANA_URL") or not os.getenv("GRAFANA_AUTH"):
            result = subprocess.run(["bws", "secret", "list"], capture_output=True, text=True)
            if result.returncode:
                raise RuntimeError("BSM lookup failed; provide Grafana credentials.")
            secrets = {item["key"]: item["value"] for item in json.loads(result.stdout)}
        self.url = (os.getenv("GRAFANA_URL") or secrets.get("GRAFANA_URL", "")).rstrip("/")
        self.token = os.getenv("GRAFANA_AUTH") or secrets.get("GRAFANA_SERVICE_ACCOUNT_TOKEN", "")
        if not self.url.startswith("https://") or not self.token:
            raise RuntimeError("HTTPS GRAFANA_URL and Grafana service account credentials are required.")

        class NoRedirect(urllib.request.HTTPRedirectHandler):
            def redirect_request(self, *args):
                return None

        self.opener = urllib.request.build_opener(NoRedirect)

    def request(self, method, path, body=None):
        headers = {"Authorization": "Bearer " + self.token, "Content-Type": "application/json"}
        if method == "PUT":
            headers["X-Disable-Provenance"] = "true"
        request = urllib.request.Request(self.url + path, method=method, headers=headers,
                                         data=None if body is None else json.dumps(body).encode())
        try:
            with self.opener.open(request, timeout=45) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            raise RuntimeError(f"Grafana request failed: HTTP {error.code}") from None
        except urllib.error.URLError:
            raise RuntimeError("Grafana connection failed.") from None


def configure(client, config, apply=False):
    """Preserve every setting, including secrets, by exporting immediately before PUT."""
    uid, name = config["uid"], config["name"]
    if not re.fullmatch(r"[A-Za-z0-9_-]+", uid):
        raise ValueError("Invalid integration UID.")
    contacts = client.request("GET", "/api/v1/provisioning/contact-points")
    matches = [c for c in contacts if c["name"] == name]
    if len(matches) != 1 or matches[0]["uid"] != uid or matches[0]["type"] != "discord":
        raise ValueError("Receiver name/UID/type mismatch; refusing to change routing.")
    if matches[0].get("disableResolveMessage"):
        raise ValueError("Recovery messages are disabled; review before adoption.")
    current = matches[0]["settings"]
    changed = any(current.get(field) != config[field] for field in ("title", "message"))
    if not apply or not changed:
        return {"name": name, "uid": uid, "format_change": changed, "applied": False}
    exported = client.request("GET", "/api/v1/provisioning/contact-points/export?format=json&decrypt=true")
    receivers = [r for cp in exported["contactPoints"] if cp["name"] == name for r in cp["receivers"]]
    if len(receivers) != 1 or receivers[0]["uid"] != uid or receivers[0]["type"] != "discord":
        raise ValueError("Receiver changed during export; refusing to update.")
    receiver = receivers[0]
    if receiver.get("disableResolveMessage") or not receiver["settings"].get("url", "").startswith("https://"):
        raise ValueError("Receiver export is disabled or secrets are redacted; refusing to update.")
    payload = {key: receiver[key] for key in ("uid", "type", "settings", "disableResolveMessage") if key in receiver}
    payload["name"] = name
    payload["settings"] = receiver["settings"] | {field: config[field] for field in ("title", "message")}
    client.request("PUT", "/api/v1/provisioning/contact-points/" + uid, payload)
    # Verify only public formatting and identity; do not print the response.
    verified = client.request("GET", "/api/v1/provisioning/contact-points")
    found = [r for r in verified if r["uid"] == uid and r["name"] == name and r["type"] == "discord"]
    if len(found) != 1 or any(found[0]["settings"].get(f) != config[f] for f in ("title", "message")):
        raise RuntimeError("Receiver formatting verification failed; inspect privately before retrying.")
    return {"name": name, "uid": uid, "format_change": True, "applied": True}


def preview(client, alerts):
    result = client.request("POST", "/api/alertmanager/grafana/config/api/v1/templates/test", {
        "name": "my-infra.notifications",
        "template": (ROOT / "terraform/grafana-cloud/templates/notifications.tmpl").read_text(),
        "alerts": alerts,
    })
    expected = {"my-infra.message", "my-infra.title"}
    errors = [e for e in result.get("errors", []) if not e.get("name") or e["name"] in expected]
    if errors:
        raise RuntimeError("Grafana template parse/render failed: " + json.dumps(errors))
    rendered = {r["name"]: r["text"] for r in result.get("results", []) if r.get("scope") == "."}
    if not expected <= rendered.keys():
        raise RuntimeError("Grafana did not render both notification entry points at root scope.")
    return rendered


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["configure", "preview"])
    parser.add_argument("--apply", action="store_true", help="PUT formatting only; requires explicit approval")
    parser.add_argument("--alerts", type=Path, help="Synthetic PostableAlert JSON array for preview")
    args = parser.parse_args()
    if args.command == "preview" and args.apply:
        parser.error("preview never writes or sends notifications")
    client = Grafana()
    if args.command == "configure":
        print(json.dumps(configure(client, json.loads(os.environ["GRAFANA_NOTIFICATION_CONFIG"]), args.apply)))
    else:
        print(json.dumps(preview(client, json.loads(args.alerts.read_text())), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, ValueError, KeyError) as error:
        raise SystemExit(str(error)) from None
