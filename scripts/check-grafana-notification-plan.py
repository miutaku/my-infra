#!/usr/bin/env python3
"""Check terraform show -json output without printing sensitive plan data."""
import json
import sys

plan = json.load(sys.stdin)
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
            assert a == b, f"Evaluation/labels/routing changed: {uid}"
            checked += 1
    elif kind == "terraform_data":
        assert resource["name"] == "discord_format" and actions in (["create"], ["no-op"], ["delete", "create"])
    elif kind == "grafana_message_template":
        assert resource["name"] == "monitoring" and actions in (["create"], ["update"], ["no-op"])
    else:
        assert actions == ["no-op"], f"Unexpected change: {resource['address']}"
print(f"Plan verified: {checked} rules preserve UIDs, evaluation, labels, routing and timings; actions={counts}")
