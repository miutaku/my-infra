"""Exercise notification expressions/templates with the deployed Argo CD CLI.

ARGOCD_CLI=/path/to/argocd python3 tests/test_reventer_notifications.py
Only console rendering is used; no webhook is contacted.
"""
import copy
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

import yaml

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "k8s/pve/reventer-gitops/notifications.yaml"
CLI = os.environ.get("ARGOCD_CLI") or shutil.which("argocd")


def application():
    return {
        "apiVersion": "argoproj.io/v1alpha1",
        "kind": "Application",
        "metadata": {"name": "reventer-stg", "namespace": "argocd"},
        "status": {
            "sync": {"status": "Synced", "revision": "current"},
            "health": {"status": "Healthy"},
            "operationState": {
                "phase": "Succeeded", "syncResult": {"revision": "current"},
            },
            "summary": {"images": [
                f"ghcr.io/miutaku/reventer/{name}:latest@sha256:{name}"
                for name in ("backend", "frontend", "admin")
            ] + ["docker.io/valkey/valkey@sha256:other"]},
        },
    }


@unittest.skipUnless(CLI, "Set ARGOCD_CLI to the deployed Argo CD binary")
class NotificationTests(unittest.TestCase):
    def setUp(self):
        self.workspace = tempfile.TemporaryDirectory()
        self.addCleanup(self.workspace.cleanup)
        self.directory = Path(self.workspace.name)
        self.config = yaml.safe_load(CONFIG.read_text())
        # Avoid even resolving a real webhook or secret in the offline test.
        self.config["data"]["service.webhook.discord"] = "url: http://127.0.0.1:1\n"

    def run_cli(self, command, app, config=None):
        app_file = self.directory / "app.json"
        app_file.write_text(json.dumps(app))
        config_file = self.directory / "config.yaml"
        config_file.write_text(yaml.safe_dump(config or self.config))
        result = subprocess.run([
            CLI, "admin", "notifications", *command, str(app_file),
            "--config-map", str(config_file), "--secret", ":empty",
        ], capture_output=True, text=True, timeout=20)
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        self.assertNotIn("failed to", result.stderr.lower())
        return result.stdout

    def allowed(self, app):
        output = self.run_cli(["trigger", "run", "on-stg-image-deployed"], app)
        return output.strip().splitlines()[-1].rsplit(None, 1)[-1] == "true"

    def test_current_healthy_rollout_notifies(self):
        self.assertTrue(self.allowed(application()))

    def test_incomplete_or_stale_rollout_does_not_notify(self):
        for field, value in (("health", "Progressing"), ("health", "Degraded"),
                             ("sync", "OutOfSync")):
            with self.subTest(field=field, value=value):
                app = application()
                app["status"][field]["status"] = value
                self.assertFalse(self.allowed(app))
        for phase in ("Running", "Failed", "Error"):
            with self.subTest(phase=phase):
                app = application()
                app["status"]["operationState"]["phase"] = phase
                self.assertFalse(self.allowed(app))
        app = application()
        app["status"]["operationState"]["syncResult"]["revision"] = "previous"
        self.assertFalse(self.allowed(app))
        app = application()
        app["operation"] = {"sync": {"revision": "next"}}
        self.assertFalse(self.allowed(app))
        app = application()
        del app["status"]["operationState"]
        self.assertFalse(self.allowed(app))
        app = application()
        del app["status"]["summary"]
        self.assertFalse(self.allowed(app))
        app = application()
        app["status"] = {}
        self.assertFalse(self.allowed(app))

    def test_missing_or_mixed_images_do_not_notify(self):
        app = application()
        app["status"]["summary"]["images"].pop(2)
        self.assertFalse(self.allowed(app))
        app = application()
        app["status"]["summary"]["images"].append(
            "ghcr.io/miutaku/reventer/backend:latest@sha256:previous")
        self.assertFalse(self.allowed(app))

    def test_deduplication_tracks_only_sorted_app_images(self):
        expression = yaml.safe_load(
            self.config["data"]["trigger.on-stg-image-deployed"])[0]["oncePer"]
        expected = "|".join(sorted(application()["status"]["summary"]["images"][:3]))
        config = copy.deepcopy(self.config)
        config["data"]["trigger.test-key"] = yaml.safe_dump([{
            "when": f"({expression}) == {json.dumps(expected)}",
            "send": ["stg-image-deployed"],
        }])
        app = application()
        app["status"]["summary"]["images"].reverse()
        app["status"]["summary"]["images"][0] = "docker.io/valkey/valkey@sha256:new"
        app["status"]["sync"]["revision"] = "unrelated-commit"
        output = self.run_cli(["trigger", "run", "test-key"], app, config)
        self.assertEqual(output.strip().splitlines()[-1].rsplit(None, 1)[-1], "true")
        app["status"]["summary"]["images"][-1] += "-new"
        output = self.run_cli(["trigger", "run", "test-key"], app, config)
        self.assertEqual(output.strip().splitlines()[-1].rsplit(None, 1)[-1], "false")

    def test_discord_body_is_valid_and_contains_running_images(self):
        output = self.run_cli(["template", "notify", "stg-image-deployed"], application())
        body = json.loads(yaml.safe_load(output)["webhook"]["discord"]["body"])
        self.assertEqual(body["allowed_mentions"], {"parse": []})
        embed = body["embeds"][0]
        self.assertIn("STG", embed["title"])
        images = embed["fields"][1]["value"]
        self.assertNotIn("valkey", images)
        for name in ("backend", "frontend", "admin"):
            self.assertIn(f"/{name}:latest@sha256:{name}", images)
        self.assertLessEqual(len(images), 1024)

    def test_only_stg_uses_new_trigger(self):
        directory = CONFIG.parent
        for filename in ("reventer-stg.yaml", "reventer-prd.yaml", "reventer-admin-prd.yaml"):
            annotations = yaml.safe_load((directory / filename).read_text())["metadata"]["annotations"]
            trigger = "on-stg-image-deployed" if filename == "reventer-stg.yaml" else "on-deployed"
            self.assertIn(f"notifications.argoproj.io/subscribe.{trigger}.discord", annotations)


if __name__ == "__main__":
    unittest.main()
