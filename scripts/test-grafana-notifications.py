#!/usr/bin/env python3
"""Offline updater safety tests; --live also renders via Grafana's preview API.

The live tests POST synthetic templates only. No receiver test/send API is used.
"""
import argparse
import copy
from concurrent.futures import ThreadPoolExecutor
import importlib.util
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("notifications", ROOT / "scripts/grafana-notifications.py")
notifications = importlib.util.module_from_spec(spec)
spec.loader.exec_module(notifications)
CONFIG = {"name": "existing", "uid": "stable-uid", "title": '{{ template "my-infra.title" . }}',
          "message": '{{ template "my-infra.message" . }}'}


class FakeGrafana:
    def __init__(self):
        self.calls = []
        self.receiver = {"uid": "stable-uid", "name": "existing", "type": "discord",
                         "disableResolveMessage": False,
                         "settings": {"url": "https://example.com/secret-placeholder", "title": "old", "message": "old",
                                      "avatar_url": "https://example.com/avatar.png", "use_discord_username": True,
                                      "future_setting": "preserve this too"}}

    def request(self, method, path, body=None):
        self.calls.append((method, path))
        if method == "PUT":
            assert path.endswith("/stable-uid")
            self.receiver = copy.deepcopy(body)
            return {}
        if "export?" in path:
            return {"contactPoints": [{"name": "existing", "receivers": [copy.deepcopy(self.receiver)]}]}
        return [copy.deepcopy(self.receiver)]


class UpdaterSafety(unittest.TestCase):
    def test_default_is_read_only(self):
        client = FakeGrafana()
        notifications.configure(client, CONFIG)
        self.assertEqual([m for m, _ in client.calls], ["GET"])

    def test_only_existing_uid_is_put_and_other_settings_survive(self):
        client = FakeGrafana()
        before = copy.deepcopy(client.receiver)
        notifications.configure(client, CONFIG, apply=True)
        expected = before
        expected["settings"].update({key: CONFIG[key] for key in ("title", "message")})
        self.assertEqual(client.receiver, expected)
        self.assertEqual([m for m, _ in client.calls], ["GET", "GET", "PUT", "GET"])
        # A second approved apply performs no write.
        client.calls.clear()
        notifications.configure(client, CONFIG, apply=True)
        self.assertEqual([m for m, _ in client.calls], ["GET"])

    def test_rejects_identity_change_or_disabled_recovery(self):
        for field, value in [("uid", "other"), ("name", "other"), ("type", "email"), ("disableResolveMessage", True)]:
            client = FakeGrafana()
            client.receiver[field] = value
            with self.assertRaises(ValueError):
                notifications.configure(client, CONFIG, apply=True)
            self.assertTrue(all(m == "GET" for m, _ in client.calls))

    def test_redacted_secret_never_overwrites_webhook(self):
        client = FakeGrafana()
        client.receiver["settings"]["url"] = "[REDACTED]"
        with self.assertRaises(ValueError):
            notifications.configure(client, CONFIG, apply=True)
        self.assertTrue(all(m == "GET" for m, _ in client.calls))

    def test_catalog_keeps_monitoring_identity_and_logic(self):
        catalog = json.loads((ROOT / "terraform/grafana-cloud/rules.json").read_text())
        self.assertTrue(all(r["description"] and r["description"] != r["title"] for r in catalog))
        self.assertTrue(all(r["severity"] in {"warn", "warning", "critical", "info"} for r in catalog))


def alert(labels=None, annotations=None, resolved=False):
    return {"labels": {"alertname": "Example alert", "severity": "critical", "environment": "home", "cluster": "home-k8s"} | (labels or {}),
            "annotations": {"summary": "Example summary", "description": "Example failure; inspect target health.",
                            "runbook_url": "https://example.com/runbook"} if annotations is None else annotations,
            "startsAt": "2026-10-01T00:00:00Z", "endsAt": "2026-10-02T00:00:00Z" if resolved else "2099-01-01T00:00:00Z",
            "generatorURL": "https://example.com/alerting/grafana/example/view"}


def live_tests():
    client = notifications.Grafana()
    cases = []
    # This endpoint uses Grafana's real rule evaluator and annotation expander
    # with a noop state persister. It neither saves rules nor sends alerts.
    catalog = json.loads((ROOT / "terraform/grafana-cloud/rules.json").read_text())
    pbs = next(r for r in catalog if r["id"] == "pbs-unverified")

    def rule_preview(config, expressions):
        data = [{"refId": ref, "datasourceUid": "cfkolv57kzn5sd",
                 "relativeTimeRange": {"from": 600, "to": 0},
                 "model": {"refId": ref, "expr": expression, "instant": True, "range": False,
                           "datasource": {"type": "prometheus", "uid": "cfkolv57kzn5sd"}}}
                for ref, expression in expressions.items()]
        data.append({"refId": "B", "datasourceUid": "__expr__", "relativeTimeRange": {"from": 0, "to": 0},
                     "model": {"refId": "B", "type": "math", "expression": "$A > 0"}})
        return client.request("POST", "/api/v1/rule/test/grafana", {
            "folderUid": "my-infra-home", "ruleGroup": "annotation-preview",
            "rule": {"for": "0s", "labels": {"severity": "warn", "target": "pbs"},
                     "annotations": {"description": config["description"], "details": config["details"],
                                     **({"display_target": config["display_target"]} if config.get("display_target") else {})},
                     "grafana_alert": {"title": "Annotation preview only", "condition": "B", "data": data,
                                       "no_data_state": "OK", "exec_err_state": "Error"}}})

    def vm_value(value):
        return f'label_replace(vector({value}), "vm", "13201", "", "")'

    for name, latest, verified, expected in [
        ("no-snapshots", 0, 0, ["完了snapshotなし", "検証済みsnapshotなし"]),
        ("no-verified", 1792364670, 0, ["最新 vm/13201/2026-10-18T23:04:30Z", "検証済みsnapshotなし"]),
        ("old-verified", 1792364670, 1791763200, ["最新 vm/13201/", "検証済み vm/13201/"]),
    ]:
        rendered = rule_preview(pbs, {"A": vm_value(1), "C": vm_value(latest), "D": vm_value(verified)})
        rows = [r for r in rendered if r["labels"].get("vm") == "13201"]
        assert len(rows) == 1, (name, "VM identity lost")
        detail = rows[0]["annotations"]["details"]
        assert all(word in detail for word in expected), (name, detail)
        assert "{{" not in detail and "<no value>" not in detail, (name, detail)
        cases.append((name, [alert({"target": "pbs", "vm": "13201"}, rows[0]["annotations"])],
                      ["VM 13201", *expected], []))
    for name in ("unifi-os-server", ""):
        expression = vm_value(1)
        if name:
            expression = f'label_replace({expression}, "vm_name", "{name}", "", "")'
        rendered = rule_preview(pbs, {"A": vm_value(1), "C": vm_value(1792364670), "D": vm_value(0), "E": expression})
        row = next(r for r in rendered if r["labels"].get("vm") == "13201")
        target = row["annotations"]["display_target"]
        assert "(VM 13201)" in target and "<no value>" not in target
        assert "vm_name" not in row["labels"], "VM rename must not change alert identity"
        if name:
            assert name in target, target
        cases.append(("pbs-vm-name-" + (name or "missing"), [alert({"target": "pbs", "vm": "13201"}, row["annotations"])],
                      ["(VM 13201)", name] if name else ["(VM 13201)"], ["<no value>"]))
    ids = {"13201": "unifi-os-server", "60000": "work-windows"}
    expressions = {ref: " or ".join(f'label_replace(vector({value}), "vm", "{vm}", "", "")' for vm in ids)
                   for ref, value in {"A": 1, "C": 1792364670, "D": 0}.items()}
    expressions["E"] = " or ".join(
        f'label_replace(label_replace(vector(1), "vm", "{vm}", "", ""), "vm_name", "{name}", "", "")'
        for vm, name in ids.items())
    named = rule_preview(pbs, expressions)
    assert len(named) == len(ids)
    for row in named:
        vm = row["labels"]["vm"]
        assert ids[vm] in row["annotations"]["display_target"], "VM name joined to wrong instance"
        assert "vm_name" not in row["labels"]
    cases.append(("pbs-named-group", [alert({"target": "pbs", "vm": row["labels"]["vm"]}, row["annotations"]) for row in named],
                  [*ids.values(), "2/2件"], []))
    cases.append(("pbs-snapshot-group", [
        alert({"target": "pbs", "vm": vm},
              {k: v.replace("13201", vm) for k, v in rows[0]["annotations"].items()})
        for vm in ("13201", "40000", "60000")
    ], ["vm/13201/", "vm/40000/", "vm/60000/", "3/3件"], []))
    for status, expected in [(503, "HTTP応答: 503"), (0, "HTTP応答なし")]:
        http = next(r for r in catalog if r["id"] == "http-service")
        rendered = rule_preview(http, {"A": 'label_replace(vector(1), "instance", "loockit", "", "")',
                                       "C": f'label_replace(vector({status}), "instance", "loockit", "", "")'})
        assert any(expected in r["annotations"]["details"] for r in rendered), (status, rendered)
    for config in [r for r in catalog if r.get("context_queries")]:
        # Execute the actual production expressions without saving them. Extra
        # informational queries must not change any alert instance's labels.
        baseline = rule_preview(config, {"A": config["expression"]})
        contextual = rule_preview(config, {"A": config["expression"], **config["context_queries"]})
        identities = lambda rows: sorted(tuple(sorted(row["labels"].items())) for row in rows)
        assert identities(baseline) == identities(contextual), (config["id"], "Identity changed")
        for row in contextual:
            detail = row["annotations"].get("details", "")
            assert "{{" not in detail and "<no value>" not in detail, (config["id"], detail)
    for severity, word in [("critical", "CRITICAL"), ("warn", "WARNING"), ("warning", "WARNING"), ("info", "INFO")]:
        cases.append((severity, [alert({"severity": severity, "node": "node-1"})], ["FIRING", word, "node=node-1"], []))
    cases.extend([
        ("resolved", [alert({"pod": "recovered-pod"}, resolved=True)], ["RESOLVED", "復旧:", "pod=recovered-pod"], ["概要:"]),
        ("multiple", [alert({"node": "node-1"}), alert({"node": "node-2"})], ["node=node-1", "node=node-2", "2/2件"], []),
        ("mixed", [alert({"pod": "bad"}), alert({"pod": "good"}, resolved=True)], ["FIRING", "RESOLVED", "pod=bad", "pod=good"], []),
        ("no-runbook-description", [alert(annotations={"summary": "summary fallback"})], ["summary fallback"], ["対処手順", "<no value>"]),
        ("no-annotations", [alert(annotations={})], ["Example alert"], ["概要:", "対処手順", "<no value>"]),
        ("many-labels", [alert({"target": "database", "managed_by": "HIDE_ME", "rule_id": "HIDE_ME", "grafana_folder": "HIDE_ME",
                               "scope": "HIDE_ME", "job": "HIDE_ME", "instance": "HIDE_ME", "random": "HIDE_ME"})], ["target=database"], ["HIDE_ME", "A=1"]),
        ("tuner", [alert({"service": "recording", "target": "mirakurun", "tuner": "PT3-S0"})], ["tuner=PT3-S0"], []),
        ("pbs-multiple", [alert({"target": "pbs", "vm": vm}) for vm in ("13201", "60000", "40000")],
         ["vm=13201", "vm=60000", "vm=40000", "3/3件"], []),
        ("instance", [alert({"instance": "host-1", "mountpoint": "/data"})], ["instance=host-1", "mountpoint=/data"], []),
        ("job-fallback", [{"labels": {"job": "collector"}, "annotations": {}, "generatorURL": "https://example.com/view"}], ["job=collector"], ["<no value>"]),
        ("long-untrusted-text", [alert({"target": "長" * 1000, "pod": "*" * 1000}, {"description": "詳" * 4000, "runbook_url": "https://example.com/" + "a" * 1000})], ["FIRING"], ["対処手順"]),
        ("overflow", [alert({"node": f"node-{i}"}) for i in range(40)], ["一部省略", "40件", "全アラート"], []),
        ("priority", [alert({"severity": "warn", "node": "warning-node"}), alert({"node": "critical-node"})], ["CRITICAL", "WARNING"], []),
    ])
    for state, word in [("DatasourceError", "評価エラー"), ("DatasourceNoData", "データなし")]:
        for resolved in (False, True):
            cases.append((state + str(resolved), [alert({"alertname": state, "datasource_uid": "metrics", "ref_id": "A"}, resolved=resolved)],
                          [word, "RESOLVED" if resolved else "判定できません"], []))
    cases.append(("maximum-row", [alert({"alertname": "名" * 300, "environment": "環" * 200,
                      "target": "対" * 500}, {"description": "詳" * 500, "runbook_url": "https://example.com/" + "r" * 275})
                 | {"generatorURL": "https://example.com/" + "u" * 300}], ["本文表示 1/1件", "Grafanaで詳細", "対処手順"], []))
    sparse = alert(annotations={})
    sparse["labels"] = {}
    cases.append(("sparse", [sparse], ["UNKNOWN", "Alert"], ["環境:", "対象:", "<no value>"]))
    # Every managed catalog and generated missing-series rule is rendered singly,
    # so a broken description cannot hide behind the grouping overflow fallback.
    catalog = json.loads((ROOT / "terraform/grafana-cloud/rules.json").read_text())
    targets = json.loads((ROOT / "terraform/grafana-cloud/targets.json").read_text())
    for r in catalog:
        cases.append((r["id"], [alert({"alertname": r["title"], "severity": r["severity"], "service": r["service"]},
                                           {"summary": r["title"], "description": r["description"]})], ["本文表示 1/1件", "概要:"], []))
    for target in targets:
        cases.append(("missing-" + target["id"], [alert({"alertname": "Required telemetry missing: " + target["id"], "severity": target["severity"]},
                      {"display_target": target["id"], "description": "必須の監視データが途絶しています。collectorと接続を確認してください。"})], [target["id"], "概要:"], []))

    def check(case):
        name, alerts, includes, excludes = case
        rendered = notifications.preview(client, alerts)
        message, title = rendered["my-infra.message"], rendered["my-infra.title"]
        assert len(message) <= 2000, (name, "Discord body too long", len(message))
        assert len(title) <= 256, (name, "Discord title too long")
        for text in includes:
            assert text in message, (name, "missing", text)
        for text in excludes:
            assert text not in message, (name, "unexpected", text)
        if name == "priority":
            assert message.index("critical-node") < message.index("warning-node")
        return name

    with ThreadPoolExecutor(max_workers=6) as pool:
        passed = list(pool.map(check, cases))
    print(f"Grafana live engine: {len(passed)} rendering cases passed; no configuration changes or notifications sent.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--live", action="store_true")
    args = parser.parse_args()
    result = unittest.TextTestRunner(verbosity=2).run(unittest.defaultTestLoader.loadTestsFromTestCase(UpdaterSafety))
    if not result.wasSuccessful():
        raise SystemExit(1)
    if args.live:
        live_tests()
