#!/usr/bin/env python3
"""Inventory Grafana or run a Terraform plan using credentials held in BSM.

Reads GRAFANA_URL and GRAFANA_SERVICE_ACCOUNT_TOKEN from BSM unless GRAFANA_URL
and GRAFANA_AUTH are already set. Never prints secret values or applies a plan.
"""
import argparse
import json
import os
from pathlib import Path
import subprocess
import urllib.error
import urllib.request


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("inventory", "plan"))
    parser.add_argument("--var-file", help="Terraform variable file (required for plan)")
    parser.add_argument("--datasource-uid", default="cfkolv57kzn5sd", help="Home Prometheus data source UID")
    args = parser.parse_args()
    env = os.environ.copy()
    if not env.get("GRAFANA_URL") or not env.get("GRAFANA_AUTH"):
        result = subprocess.run(["bws", "secret", "list"], capture_output=True, text=True)
        if result.returncode:
            raise SystemExit("BSM lookup failed; check BWS_ACCESS_TOKEN and network access.")
        secrets = {item["key"]: item["value"] for item in json.loads(result.stdout)}
        env["GRAFANA_URL"] = env.get("GRAFANA_URL") or secrets.get("GRAFANA_URL", "")
        env["GRAFANA_AUTH"] = env.get("GRAFANA_AUTH") or secrets.get("GRAFANA_SERVICE_ACCOUNT_TOKEN", "")
    if not env.get("GRAFANA_URL") or not env.get("GRAFANA_AUTH"):
        raise SystemExit("Register GRAFANA_URL and GRAFANA_SERVICE_ACCOUNT_TOKEN in BSM, or set GRAFANA_URL/GRAFANA_AUTH in the environment.")
    if not env["GRAFANA_URL"].startswith("https://"):
        raise SystemExit("GRAFANA_URL must use HTTPS.")

    # Credentials must not be forwarded to another host by an HTTP redirect.
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return None

    opener = urllib.request.build_opener(NoRedirect)

    def get(path):
        request = urllib.request.Request(env["GRAFANA_URL"].rstrip("/") + path,
                                         headers={"Authorization": "Bearer " + env["GRAFANA_AUTH"]})
        try:
            with opener.open(request, timeout=30) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            raise SystemExit(f"Grafana inventory request failed: HTTP {error.code}") from None

    datasource = get("/api/datasources/uid/" + args.datasource_uid)
    datasources = [datasource]
    contacts = get("/api/v1/provisioning/contact-points")
    # Explicit allowlist: API responses can contain receiver credentials.
    print(json.dumps({
        "datasources": [{k: ds.get(k) for k in ("uid", "name", "type", "url")} | {
            "pdc_network": ds.get("jsonData", {}).get("secureSocksProxyUsername")
        } for ds in datasources if ds.get("type") == "prometheus"],
        "contact_points": [{k: contact.get(k) for k in ("name", "uid", "type", "disableResolveMessage")} for contact in contacts],
    }, indent=2), flush=True)
    if args.command == "plan":
        if not args.var_file:
            parser.error("plan requires --var-file")
        variables = str(Path(args.var_file).resolve(strict=True))
        root = Path(__file__).resolve().parents[1] / "terraform/grafana-cloud"
        subprocess.run(["terraform", f"-chdir={root}", "init", "-input=false", "-lockfile=readonly"], env=env, check=True)
        subprocess.run(["terraform", f"-chdir={root}", "plan", "-input=false", f"-var-file={variables}", "-out=.state/notifications.tfplan"], env=env, check=True)


if __name__ == "__main__":
    main()
