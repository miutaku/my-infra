#!/usr/bin/env python3
"""Validate inactive GitOps cutover definitions and environment boundaries."""
import pathlib
import subprocess
import unittest

import yaml

ROOT = pathlib.Path(__file__).resolve().parents[1]
LEGACY = ROOT / 'k8s/pve/reventer-gitops'
SPLIT = ROOT / 'k8s/pve/reventer-gitops-split'


def load(path):
    return yaml.safe_load(path.read_text())


class GitOpsCutover(unittest.TestCase):
    def test_active_bootstrap_does_not_include_standby_or_new_updaters(self):
        for path in (ROOT / 'k8s').rglob('kustomization.yaml'):
            if SPLIT in path.parents:
                continue
            self.assertNotIn('reventer-gitops-split', path.read_text())
        objects = list(yaml.safe_load_all(subprocess.check_output(['kubectl', 'kustomize', str(SPLIT)], text=True)))
        self.assertNotIn('ImageUpdater', [o['kind'] for o in objects])
        for obj in objects:
            if obj['kind'] == 'Application':
                self.assertEqual(obj['spec']['syncPolicy']['automated'], {'enabled': False, 'prune': False, 'selfHeal': False})

    def test_app_projects_reject_other_cluster_and_cluster_resources(self):
        for project in yaml.safe_load_all((SPLIT / 'projects.yaml').read_text()):
            name = project['metadata']['name']
            env = name.rsplit('-', 1)[1]
            self.assertTrue(all(d['name'] == 'oke-' + env for d in project['spec']['destinations']))
            if '-apps-' in name:
                self.assertEqual(project['spec']['destinations'], [{'name': 'oke-' + env, 'namespace': 'app-reventer-' + env}])
                self.assertEqual(project['spec']['clusterResourceWhitelist'], [])

    def test_inline_overrides_survive_transfer_to_foundation(self):
        for name in ('reventer-stg', 'reventer-prd', 'reventer-admin-prd'):
            before = load(LEGACY / (name + '.yaml'))['spec']['source']['kustomize']['patches']
            app = load(SPLIT / (name + '.yaml'))['spec']
            after = app['source']['kustomize']['patches']
            env = name.rsplit('-', 1)[1]
            self.assertEqual(app['source']['targetRevision'], 'staging' if env == 'stg' else 'main')
            if name != 'reventer-admin-prd':
                foundation = load(SPLIT / ('reventer-foundation-' + env + '.yaml'))['spec']
                self.assertEqual(foundation['source']['targetRevision'], 'main')
                after = after + foundation['source']['kustomize']['patches']
            self.assertCountEqual(before, after)

    def test_updaters_use_exact_environment_tag_branch_and_application(self):
        for env, apps in [('stg', {'reventer-stg'}), ('prd', {'reventer-prd', 'reventer-admin-prd'})]:
            obj = load(SPLIT / 'activate-updater' / ('image-updater-' + env + '.yaml'))
            self.assertEqual(obj['spec']['commonUpdateSettings']['updateStrategy'], 'digest')
            refs = obj['spec']['applicationRefs']
            self.assertEqual({ref['namePattern'] for ref in refs}, apps)
            for ref in refs:
                config = ref['writeBackConfig']
                self.assertEqual(config['method'], 'git:secret:argocd/reventer-image-writeback-' + env)
                self.assertEqual(config['gitConfig']['branch'], 'staging' if env == 'stg' else 'main')
                for image in ref['images']:
                    self.assertEqual(image['imageName'], 'ghcr.io/miutaku/reventer-release-' + image['alias'] + ':' + env)
                    self.assertNotIn('*', image['imageName'])
                    self.assertIn('kustomize', image['manifestTargets'])


if __name__ == '__main__':
    unittest.main()
