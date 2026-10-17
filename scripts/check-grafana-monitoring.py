#!/usr/bin/env python3
"""Read-only validation of catalog queries against VictoriaMetrics through Kubernetes.

Exits nonzero for query errors or missing required telemetry. Does not apply any
configuration or send notifications. Only enable features after deploying them.
"""
import argparse
import json
import os
from pathlib import Path
import subprocess
import urllib.parse
import urllib.request
import urllib.error


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--context", default="home-k8s")
    parser.add_argument("--namespace", default="monitoring")
    parser.add_argument("--service", default="victoria-metrics:8428")
    parser.add_argument("--profile", choices=("home", "oke"), default="home")
    parser.add_argument("--features", default="", help="Comma-separated deployed features: kubernetes,probes,backups")
    parser.add_argument("--grafana-uid", help="Query this data source through Grafana/PDC instead of the Kubernetes proxy")
    args = parser.parse_args()
    features = set(filter(None, args.features.split(",")))
    config = Path(__file__).resolve().parents[1] / "terraform/grafana-cloud"
    catalog = json.loads((config / "rules.json").read_text())
    targets = json.loads((config / "targets.json").read_text()) if args.profile == "home" else []
    base = f"/api/v1/namespaces/{args.namespace}/services/{args.service}/proxy/api/v1/query?"

    if args.grafana_uid:
        env = os.environ
        secrets = {}
        if not env.get("GRAFANA_URL") or not env.get("GRAFANA_AUTH"):
            result = subprocess.run(["bws", "secret", "list"], capture_output=True, text=True, check=True)
            secrets = {item["key"]: item["value"] for item in json.loads(result.stdout)}
        grafana_url = env.get("GRAFANA_URL") or secrets.get("GRAFANA_URL", "")
        grafana_token = env.get("GRAFANA_AUTH") or secrets.get("GRAFANA_SERVICE_ACCOUNT_TOKEN", "")
        if not grafana_url.startswith("https://") or not grafana_token:
            raise SystemExit("Provide HTTPS GRAFANA_URL and GRAFANA_AUTH, or the matching BSM secrets.")

        class NoRedirect(urllib.request.HTTPRedirectHandler):
            def redirect_request(self, req, fp, code, msg, headers, newurl):
                return None

        opener = urllib.request.build_opener(NoRedirect)

    def query(expression):
        if args.grafana_uid:
            url = (grafana_url.rstrip("/") + "/api/datasources/proxy/uid/" + urllib.parse.quote(args.grafana_uid, safe="")
                   + "/api/v1/query?" + urllib.parse.urlencode({"query": expression}))
            request = urllib.request.Request(url, headers={"Authorization": "Bearer " + grafana_token})
            with opener.open(request, timeout=30) as result:
                response = json.load(result)
        else:
            result = subprocess.run([
                "kubectl", "--context", args.context, "get", "--raw",
                base + urllib.parse.urlencode({"query": expression}),
            ], capture_output=True, text=True, check=True, timeout=45)
            response = json.loads(result.stdout)
        if response.get("status") != "success":
            raise ValueError(response.get("error", "unknown query error"))
        return response["data"]["result"]

    try:
        query("vector(1)")
    except (subprocess.SubprocessError, OSError, ValueError, KeyError):
        raise SystemExit("Data source query failed. Fix its connection/PDC path before checking alert expressions.") from None

    failed = []
    checked = 0
    for rule in catalog:
        if rule["profile"] not in ("all", args.profile) or (rule["feature"] and rule["feature"] not in features):
            continue
        try:
            result = query(rule["expression"])
            firing = sum(float(sample["value"][1]) > 0 for sample in result)
            if firing:
                print(f'{rule["id"]}: {firing} condition(s) currently true (pending time not evaluated)')
            checked += 1
        except (subprocess.SubprocessError, OSError, ValueError, KeyError) as error:
            failed.append(rule["id"])
            print(f'{rule["id"]}: query failed: {error}')
    for target in targets:
        if target["feature"] and target["feature"] not in features:
            continue
        window = '1m' if target['service'] == 'power' else '3m'
        result = query(f'absent_over_time({target["selector"]}[{window}])')
        if result:
            failed.append(target["id"])
            print(f'{target["id"]}: required telemetry missing')
    print(f"Checked {checked} queries; {len(failed)} errors/missing targets")
    raise SystemExit(bool(failed))


if __name__ == "__main__":
    main()
