#!/usr/bin/env python3
"""Deploy the monitoring compose bundle using encrypted Terraform outputs and BSM.
Secrets are copied in mode-0600 files over SSH; never printed or committed.
"""
import argparse
import json
import os
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / 'observability/reventer'
SSH = ['-c', 'aes128-gcm@openssh.com', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', '-o', 'UserKnownHostsFile=/tmp/reventer-observability-known-hosts', '-o', 'ConnectTimeout=15', '-i', str(Path.home()/'.ssh/id_ed25519')]

def run(args, **kwargs):
    result = subprocess.run(args, capture_output=True, text=True, **kwargs)
    if result.returncode:
        raise RuntimeError(f'{args[0]} failed (exit {result.returncode}); sensitive output omitted')
    return result.stdout

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--enable-pdc', action='store_true', help='Enable only after history backfill and dual ingestion are validated')
    parser.add_argument('--environment', choices=['stg', 'prd'], default='prd')
    parser.add_argument('--replica', choices=['01', '02'])
    args = parser.parse_args()
    tf = ROOT / ('terraform/oci-observability-stg' if args.environment == 'stg' else 'terraform/oci-observability')
    outputs = json.loads(run(['terraform', 'output', '-json'], cwd=tf))
    secrets = {x['key']: x['value'] for x in json.loads(run(['bws', 'secret', 'list']))}
    for name, instance in sorted(outputs['instances']['value'].items()):
        if args.replica and name[-2:] != args.replica:
            continue
        replica = name[-2:]; peer = '02' if replica == '01' else '01';host = 'ubuntu@'+instance['public_ip']
        run(['ssh', *SSH, host, 'sudo flock --nonblock /run/reventer-os-update.lock true'])
        run(['ssh', *SSH, host, 'test "$(systemctl show -p ActiveState --value reventer-os-update.service 2>/dev/null)" != activating && test "$(systemctl show -p ActiveState --value reventer-os-update.service 2>/dev/null)" != active'])
        peer_instance = outputs['instances']['value']['reventer-observability-' + peer]
        token_key = args.environment.upper() + '_REVENTER_GRAFANA_PDC_TOKEN'
        if args.enable_pdc and not secrets.get(token_key):
            raise RuntimeError('Missing environment-specific PDC token: ' + token_key)
        settings = {
            'ENVIRONMENT': args.environment,
            'PRIVATE_IP': instance['private_ip'],
            'PEER_METRICS_URL': 'http://' + peer_instance['private_ip'] + ':18428/',
            'PEER_LOGS_URL': 'http://' + peer_instance['private_ip'] + ':19428/',
            'PDC_TOKEN': secrets.get(token_key, ''),
            'PDC_CLUSTER': secrets['GRAFANA_PDC_CLUSTER'],
            'PDC_HOSTED_GRAFANA_ID': secrets['GRAFANA_PDC_HOSTED_GRAFANA_ID'],
            'PDC_VERSION': 'latest@sha256:1d14309386ed2852150f8254d342d0ae9f9ee940ee7a86d03137075892147ae0',
        }
        with tempfile.TemporaryDirectory(prefix='reventer-monitoring-env-') as tmp:
            os.chmod(tmp,0o700);env=Path(tmp)/'.env'
            # Compose .env single quotes preserve literal $, # and spaces.
            assert all('\n' not in v and "'" not in v for v in settings.values())
            env.write_text(''.join(k+"='"+v+"'\n" for k,v in settings.items()));env.chmod(0o600)
            run(['ssh', *SSH, host, 'mkdir -p -m 700 /tmp/reventer-observability-stage/config'])
            run(['scp', *SSH, str(env), str(BUNDLE/'docker-compose.yaml'), str(BUNDLE/'reventer-observability.service'), host+':/tmp/reventer-observability-stage/'])
            run(['scp', *SSH, str(BUNDLE/'config/metrics.yaml'), str(BUNDLE/'config/logs.yaml'), host+':/tmp/reventer-observability-stage/config/'])
        run(['ssh', *SSH, host, 'sudo install -d -m 700 /opt/reventer-observability /opt/reventer-observability/config /opt/reventer-observability/data/metrics /opt/reventer-observability/data/logs && sudo cp /tmp/reventer-observability-stage/docker-compose.yaml /opt/reventer-observability/ && sudo install -m 600 /tmp/reventer-observability-stage/.env /opt/reventer-observability/.env && sudo cp /tmp/reventer-observability-stage/config/*.yaml /opt/reventer-observability/config/ && sudo rm -f /opt/reventer-observability/config/metrics-remote.yaml /opt/reventer-observability/config/logs-remote.yaml && sudo install -m 644 /tmp/reventer-observability-stage/reventer-observability.service /etc/systemd/system/ && rm -rf /tmp/reventer-observability-stage && sudo chown -R 1000:1000 /opt/reventer-observability/config /opt/reventer-observability/data && sudo systemctl daemon-reload && sudo sh -c \'cd /opt/reventer-observability && docker compose config --quiet && docker compose pull\''])
        services = 'metrics logs metrics-query logs-query' + (' pdc' if args.enable_pdc else '')
        run(['ssh', *SSH, host, "sudo sh -c 'cd /opt/reventer-observability && docker compose up -d --remove-orphans "+services+"'"])
        if not args.enable_pdc:
            run(['ssh', *SSH, host, "sudo sh -c 'cd /opt/reventer-observability && docker compose --profile grafana stop pdc; rm -f /etc/systemd/system/reventer-observability.service.d/grafana.conf'"])
        if args.enable_pdc:
            dropin="[Service]\nExecStart=\nExecStart=/usr/bin/docker compose --profile grafana up -d\n"
            run(['ssh',*SSH,host,"sudo mkdir -p /etc/systemd/system/reventer-observability.service.d && sudo tee /etc/systemd/system/reventer-observability.service.d/grafana.conf >/dev/null"],input=dropin)
        run(['ssh',*SSH,host,'sudo systemctl daemon-reload && sudo systemctl enable reventer-observability.service'])
        print(name+': storage and private same-environment query gateways deployed'+('; PDC enabled' if args.enable_pdc else '; PDC withheld pending validation'),flush=True)

if __name__ == '__main__':
    main()
