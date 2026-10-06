#!/usr/bin/env python3
"""Register OCI clusters and copy the existing Re:Venter repository deploy key.
Secrets stay in memory and are never printed or written to this repository.
Run with access to ~/.kube/{home-k8s,oke,oke-prd}.yaml.
"""
import argparse
import base64
import json
from pathlib import Path
import subprocess
import time

KUBE = Path.home() / '.kube'

def command(config, *args, obj=None):
    result = subprocess.run(['kubectl', '--kubeconfig', str(KUBE / config), '--request-timeout=20s', *args], input=json.dumps(obj) if obj is not None else None, text=True, capture_output=True)
    if result.returncode:
        # API errors may contain submitted secret material; omit command output.
        raise RuntimeError(f'kubectl failed: {config} {args[0]} (exit {result.returncode})')
    return result.stdout

def apply(config, obj):
    command(config, 'apply', '--server-side', '--field-manager=reventer-talos-bootstrap', '-f', '-', obj=obj)

def read(config, kind, name, namespace):
    return json.loads(command(config, 'get', kind, name, '-n', namespace, '-o', 'json'))

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--approve-cluster-admin', action='store_true', help='Explicitly approve persistent cluster-admin access in both OCI clusters')
    parser.add_argument('--approve-deploy-key-transfer', action='store_true', help='Explicitly approve copying the writable Re:Venter SSH deploy key into Talos')
    args = parser.parse_args()
    if not (args.approve_cluster_admin and args.approve_deploy_key_transfer):
        parser.error('Both approval flags are required; no cluster resources were changed')
    for config, cluster in [('oke.yaml', 'oke-stg'), ('oke-prd.yaml', 'oke-prd')]:
        sa = 'talos-reventer-argocd'
        apply(config, {'apiVersion': 'v1', 'kind': 'ServiceAccount', 'metadata': {'name': sa, 'namespace': 'kube-system'}})
        apply(config, {'apiVersion': 'rbac.authorization.k8s.io/v1', 'kind': 'ClusterRoleBinding', 'metadata': {'name': sa}, 'roleRef': {'apiGroup': 'rbac.authorization.k8s.io', 'kind': 'ClusterRole', 'name': 'cluster-admin'}, 'subjects': [{'kind': 'ServiceAccount', 'name': sa, 'namespace': 'kube-system'}]})
        apply(config, {'apiVersion': 'v1', 'kind': 'Secret', 'metadata': {'name': sa, 'namespace': 'kube-system', 'annotations': {'kubernetes.io/service-account.name': sa}}, 'type': 'kubernetes.io/service-account-token'})
        for attempt in range(10):
            secret = read(config, 'secret', sa, 'kube-system')
            if 'token' in secret.get('data', {}):
                break
            time.sleep(1)
        else:
            raise RuntimeError(f'{cluster}: service account token not populated')
        view = json.loads(command(config, 'config', 'view', '--minify', '-o', 'json'))
        connection = {'bearerToken': base64.b64decode(secret['data']['token']).decode(), 'tlsClientConfig': {'insecure': False, 'caData': secret['data']['ca.crt']}}
        apply('home-k8s.yaml', {'apiVersion': 'v1', 'kind': 'Secret', 'metadata': {'name': f'reventer-{cluster}-cluster', 'namespace': 'argocd', 'labels': {'argocd.argoproj.io/secret-type': 'cluster'}}, 'type': 'Opaque', 'stringData': {'name': cluster, 'server': view['clusters'][0]['cluster']['server'], 'config': json.dumps(connection)}})
        print(f'Registered {cluster} with a dedicated ServiceAccount', flush=True)
    source = read('oke.yaml', 'secret', 'argocd-repo-reventer', 'argocd-reventer')
    apply('home-k8s.yaml', {'apiVersion': 'v1', 'kind': 'Secret', 'metadata': {'name': 'argocd-repo-reventer', 'namespace': 'argocd', 'labels': {'argocd.argoproj.io/secret-type': 'repository'}}, 'type': source.get('type', 'Opaque'), 'data': source['data']})
    print('Copied repository credentials without exposing their values', flush=True)

if __name__ == '__main__':
    main()
