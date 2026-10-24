#!/usr/bin/env python3
"""Deployment guard and post-apply verification tests, without network or writes."""
import copy
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location("deploy", Path(__file__).with_name("deploy-grafana-monitoring.py"))
deploy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deploy)


def state():
    return {"lineage": "existing-lineage", "resources": [
        {"mode": "managed", "type": "grafana_folder", "instances": [{"attributes": {"uid": "my-infra-home"}}]},
        {"mode": "managed", "type": "grafana_rule_group", "instances": []},
    ]}


def applied_values():
    return {"root_module": {"resources": [
        {"type": "grafana_message_template", "values": {"name": "my-infra.notifications", "template": "shared template\n"}},
        *[{"type": "terraform_data", "name": "discord_format", "values": {"input": {
            "name": severity, "uid": severity, "title": "shared title", "message": "shared message"}}} for severity in ("warn", "critical")],
    ], "child_modules": [{"resources": [{"type": "grafana_rule_group", "values": {"rule": [
        {"uid": "stable-rule", "labels": {"severity": "critical"}, "annotations": {"summary": "human summary", "display_target": ""}, "is_paused": False},
    ]}}]}]}}


class FakeGrafana:
    def __init__(self):
        self.calls = []
        self.template = {"template": "shared template\n"}
        self.contacts = [{"uid": s, "name": s, "type": "discord", "disableResolveMessage": False,
                          "settings": {"title": "shared title", "message": "shared message"}} for s in ("warn", "critical")]
        self.rules = [{"uid": "stable-rule", "labels": {"severity": "critical"}, "annotations": {"summary": "human summary"}, "isPaused": False}]

    def request(self, method, path, body=None):
        self.calls.append((method, path))
        assert method == "GET", "Verification must never mutate production"
        if "/templates/" in path:
            return copy.deepcopy(self.template)
        if path.endswith("contact-points"):
            return copy.deepcopy(self.contacts)
        if path.endswith("alert-rules"):
            return copy.deepcopy(self.rules)
        raise AssertionError("Unexpected endpoint")


class DeploymentChecks(unittest.TestCase):
    def test_existing_state_accepted(self):
        deploy.require_existing_state(state())

    def test_empty_and_wrong_state_rejected(self):
        for candidate in ({}, {"lineage": "other", "resources": []}):
            with self.assertRaises(RuntimeError):
                deploy.require_existing_state(candidate)
        candidate = state()
        candidate["resources"][0]["instances"][0]["attributes"]["uid"] = "another-team"
        with self.assertRaises(RuntimeError):
            deploy.require_existing_state(candidate)

    def test_post_apply_verification_is_read_only(self):
        client = FakeGrafana()
        self.assertEqual(deploy.verify_deployment(client, applied_values()), 1)
        self.assertTrue(all(method == "GET" for method, _ in client.calls))

    def test_template_drift_is_rejected(self):
        client = FakeGrafana()
        client.template["template"] = "wrong"
        with self.assertRaisesRegex(RuntimeError, "template does not match"):
            deploy.verify_deployment(client, applied_values())

    def test_receiver_drift_is_rejected(self):
        client = FakeGrafana()
        client.contacts[0]["settings"]["message"] = "old default"
        with self.assertRaisesRegex(RuntimeError, "Receiver formatting drift"):
            deploy.verify_deployment(client, applied_values())

    def test_rule_drift_is_rejected(self):
        for field, value in [("annotations", {}), ("labels", {}), ("isPaused", True)]:
            client = FakeGrafana()
            client.rules[0][field] = value
            with self.assertRaises(RuntimeError):
                deploy.verify_deployment(client, applied_values())
        client = FakeGrafana()
        client.rules = []
        with self.assertRaises(RuntimeError):
            deploy.verify_deployment(client, applied_values())


def load_tests(loader, tests, pattern):
    # Existing CI invokes this entry point. Include the Re:Venter safety suite
    # without changing workflow permissions or requiring live credentials.
    spec = importlib.util.spec_from_file_location("test_reventer", Path(__file__).with_name("test-reventer-grafana.py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    tests.addTests(loader.loadTestsFromModule(module))
    return tests


if __name__ == "__main__":
    unittest.main(verbosity=2)
