#!/usr/bin/env python3
"""Plan and apply Grafana from main CI using existing shared HCP state.

Writes only with --apply. HCP workspace miutaku/grafana-cloud must already hold
our migrated state in local execution mode. Never bootstraps an empty state.
"""
import argparse
import importlib.util
import json
import os
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
TF_ROOT = ROOT / "terraform/grafana-cloud"
spec = importlib.util.spec_from_file_location("notifications", ROOT / "scripts/grafana-notifications.py")
notifications = importlib.util.module_from_spec(spec)
spec.loader.exec_module(notifications)


def require_existing_state(state):
    resources = state.get("resources", [])
    folders = [r for r in resources if r.get("mode") == "managed" and r.get("type") == "grafana_folder"]
    groups = [r for r in resources if r.get("mode") == "managed" and r.get("type") == "grafana_rule_group"]
    if not state.get("lineage") or not folders or not groups:
        raise RuntimeError("Shared state is empty or incomplete; migrate the existing state before deployment.")
    if not any(i.get("attributes", {}).get("uid") == "my-infra-home" for r in folders for i in r.get("instances", [])):
        raise RuntimeError("Shared state belongs to a different Grafana folder; refusing to apply.")


def resources_in(module):
    yield from module.get("resources", [])
    for child in module.get("child_modules", []):
        yield from resources_in(child)


def verify_deployment(client, values):
    resources = list(resources_in(values["root_module"]))
    templates = [r["values"] for r in resources if r["type"] == "grafana_message_template"]
    if len(templates) != 1:
        raise RuntimeError("Expected one managed notification template.")
    expected = templates[0]
    actual = client.request("GET", "/api/v1/provisioning/templates/" + expected["name"])
    if actual.get("template", "").strip() != expected["template"].strip():
        raise RuntimeError("Grafana notification template does not match applied state.")
    receivers = [r["values"]["input"] for r in resources if r["type"] == "terraform_data" and r["name"] == "discord_format"]
    if len(receivers) != 2:
        raise RuntimeError("Expected two existing severity receivers.")
    for config in receivers:
        if notifications.configure(client, config)["format_change"]:
            raise RuntimeError("Receiver formatting drift detected; replan its terraform_data with -replace.")
    live_rules = {r["uid"]: r for r in client.request("GET", "/api/v1/provisioning/alert-rules")}
    count = 0
    for resource in resources:
        if resource["type"] != "grafana_rule_group":
            continue
        for rule in resource["values"]["rule"]:
            actual = live_rules.get(rule["uid"])
            if actual is None or any(actual.get("annotations", {}).get(k) != v for k, v in rule["annotations"].items() if v):
                raise RuntimeError("Managed rule annotations do not match applied state: " + rule["uid"])
            if actual.get("labels") != rule["labels"] or actual.get("isPaused") != rule["is_paused"]:
                raise RuntimeError("Managed rule labels/pause do not match applied state: " + rule["uid"])
            count += 1
    if not count:
        raise RuntimeError("No managed alert rules were verified.")
    return count


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Apply saved plan after validation (main CI)")
    args = parser.parse_args()
    client = notifications.Grafana()
    env = os.environ.copy()
    env.update(GRAFANA_URL=client.url, GRAFANA_AUTH=client.token, TF_IN_AUTOMATION="true")
    if os.getenv("GITHUB_ACTIONS") == "true":
        # Keep any provider errors and subprocess output from exposing credentials.
        for value in (client.token, client.url):
            escaped = value.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
            print("::add-mask::" + escaped, flush=True)
    private = TF_ROOT / ".state"
    private.mkdir(mode=0o700, exist_ok=True)

    def tf(*arguments, acceptable=(0,)):
        result = subprocess.run(["terraform", f"-chdir={TF_ROOT}", *arguments], env=env,
                                capture_output=True, text=True)
        if result.returncode not in acceptable:
            # State/show JSON is deliberately never written to workflow logs.
            if arguments[0] not in {"show", "state"}:
                error = result.stderr.replace(client.token, "[REDACTED]")
                print(error, flush=True)
            raise RuntimeError(f"Terraform {arguments[0]} failed with exit code {result.returncode}.")
        return result

    tf("init", "-input=false", "-lockfile=readonly", "-no-color")
    backend = json.loads((TF_ROOT / ".terraform/terraform.tfstate").read_text())["backend"]
    config = backend["config"]
    if backend["type"] != "remote" or config.get("organization") != "miutaku" or config.get("workspaces", {}).get("name") != "grafana-cloud":
        raise RuntimeError("Deployment requires the dedicated HCP remote backend.")
    state = json.loads(tf("state", "pull").stdout)
    require_existing_state(state)
    print("Verified existing shared state and dedicated backend", flush=True)
    subprocess.run(["python3", str(ROOT / "scripts/test-grafana-notifications.py"), "--live"], env=env, check=True)
    result = tf("plan", "-input=false", "-lock-timeout=5m", "-no-color", "-var-file=environments.tfvars", "-out=.state/deployment.tfplan")
    for line in result.stdout.splitlines():
        if re.match(r"^(Plan:|No changes\.)", line):
            print(line, flush=True)
    if not args.apply:
        print("Plan saved; no production changes made.")
        return
    # Contact point PUTs share Grafana's Alertmanager config; serialize writes
    # within a run as well as serializing runs through HCP/GitHub locks.
    tf("apply", "-input=false", "-lock-timeout=5m", "-parallelism=1", "-no-color", ".state/deployment.tfplan")
    values = json.loads(tf("show", "-json").stdout)["values"]
    count = verify_deployment(client, values)
    tf("plan", "-input=false", "-lock-timeout=5m", "-detailed-exitcode", "-no-color", "-var-file=environments.tfvars")
    print(f"Applied and verified {count} rules, shared template and both existing receivers; follow-up plan has no changes.")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, ValueError, subprocess.CalledProcessError) as error:
        raise SystemExit(str(error)) from None
