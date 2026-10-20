#!/usr/bin/env python3
"""Check terraform show -json output without printing sensitive plan data."""
import json
from pathlib import Path
import sys

plan = json.load(sys.stdin)
catalog = {r["id"]: r for r in json.loads((Path(__file__).resolve().parents[1] / "terraform/grafana-cloud/rules.json").read_text())}
counts = {}
checked = 0
for resource in plan["resource_changes"]:
    change = resource["change"]
    actions = change["actions"]
    counts["/".join(actions)] = counts.get("/".join(actions), 0) + 1
    kind = resource["type"]
    assert kind == "terraform_data" or "delete" not in actions, f"Unexpected deletion: {resource['address']}"
    if kind == "grafana_rule_group":
        before, after = change["before"].copy(), change["after"].copy()
        old = {r["uid"]: r for r in before.pop("rule")}
        new = {r["uid"]: r for r in after.pop("rule")}
        assert before == after, "Rule group metadata changed"
        assert old.keys() == new.keys(), "Rule UID inventory changed"
        for uid in old:
            a, b = old[uid].copy(), new[uid].copy()
            a.pop("annotations"); b.pop("annotations")
            # Allow only catalog-declared informational queries. The original
            # A/B condition, labels, UIDs and routing must remain identical.
            context = catalog.get(b["labels"]["rule_id"], {}).get("context_queries", {})
            for ref, expression in context.items():
                assert ref not in ("A", "B"), "Context query overlaps condition"
                query = next(q for q in b["data"] if q["ref_id"] == ref)
                model = json.loads(query["model"])
                assert model["expr"] == expression and model["instant"] and not model["range"]
                assert query["datasource_uid"] == next(q for q in b["data"] if q["ref_id"] == "A")["datasource_uid"]
            a["data"] = [q for q in a["data"] if q["ref_id"] not in context]
            b["data"] = [q for q in b["data"] if q["ref_id"] not in context]
            assert a == b, f"Evaluation/labels/routing changed: {uid}"
            checked += 1
    elif kind == "terraform_data":
        assert resource["name"] == "discord_format" and actions in (["create"], ["no-op"], ["delete", "create"])
    elif kind == "grafana_message_template":
        assert resource["name"] == "monitoring" and actions in (["create"], ["update"], ["no-op"])
    else:
        assert actions == ["no-op"], f"Unexpected change: {resource['address']}"
print(f"Plan verified: {checked} rules preserve UIDs, A/B conditions, labels, routing and timings; actions={counts}")
