#!/usr/bin/env python3
"""Exercise the production Alloy filters against local metrics/log fixtures.

Requires Docker and libsnappy. No cluster, cloud credentials or external endpoint
is used. The real v1.7.0 component graph is run with fixture discovery/readers.
"""
import ctypes
import ctypes.util
import http.server
import json
import os
from pathlib import Path
import socket
import subprocess
import tempfile
import threading
import time
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parents[1]
IMAGE = 'grafana/alloy:v1.7.0@sha256:afcc9d32975dd567b2e7c87f0c2f0e4ebf9385ecc36e1c0d44ba42de6dcf291c'


def fields(data):
    def number(pos):
        result = shift = 0
        while True:
            byte = data[pos]
            pos += 1
            result |= (byte & 127) << shift
            if byte < 128:
                return result, pos
            shift += 7
    pos = 0
    while pos < len(data):
        tag, pos = number(pos)
        wire = tag & 7
        if wire == 2:
            length, pos = number(pos)
            value, pos = data[pos:pos + length], pos + length
        elif wire == 0:
            value, pos = number(pos)
        elif wire in (1, 5):
            length = 8 if wire == 1 else 4
            value, pos = data[pos:pos + length], pos + length
        else:
            raise ValueError('Unexpected protobuf wire type')
        yield tag >> 3, value


def decompress(data):
    lib = ctypes.CDLL(ctypes.util.find_library('snappy'))
    length = ctypes.c_size_t()
    assert lib.snappy_uncompressed_length(data, len(data), ctypes.byref(length)) == 0
    output = ctypes.create_string_buffer(length.value)
    assert lib.snappy_uncompress(data, len(data), output, ctypes.byref(length)) == 0
    return output.raw[:length.value]


def free_port():
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        return sock.getsockname()[1]


def main():
    received = {'/cloud': [], '/local01': [], '/local02': [], '/loki': [], '/logs01': [], '/logs02': []}
    failures = []
    fixtures = {
        '/app': '''http_requests_total{method="GET",path="/health",status="200"} 5
http_request_duration_seconds_bucket{le="0.1"} 1
http_request_duration_seconds_bucket{le="0.25"} 2
http_request_duration_seconds_bucket{le="0.5"} 3
http_request_duration_seconds_bucket{le="1"} 4
http_request_duration_seconds_bucket{le="5"} 5
http_request_duration_seconds_bucket{le="+Inf"} 5
http_request_duration_seconds_count 5
http_request_duration_seconds_sum 2
go_goroutines 8
unapproved_application_metric 1
''',
        '/controller': '''controller_runtime_reconcile_errors_total{controller="gateway"} 1
controller_runtime_terminal_reconcile_errors_total{controller="gateway"} 1
controller_runtime_reconcile_time_seconds_bucket{controller="gateway",le="+Inf"} 10
workqueue_work_duration_seconds_bucket{name="gateway",le="+Inf"} 10
workqueue_depth{name="gateway"} 1
''',
        '/node': '''node_memory_MemAvailable_bytes 123456
node_filesystem_avail_bytes{mountpoint="/",fstype="xfs",device="/dev/root"} 123
node_filesystem_avail_bytes{mountpoint="/var/lib/kubelet/pods/x/volumes/y",fstype="xfs",device="/dev/root"} 123
node_filesystem_avail_bytes{mountpoint="/run",fstype="tmpfs",device="tmpfs"} 123
node_network_receive_bytes_total{device="enp0s6"} 100
node_network_receive_bytes_total{device="veth123"} 100
node_network_info{device="veth123"} 1
''',
    }

    class Handler(http.server.BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def do_GET(self):
            body = fixtures.get(self.path, '').encode()
            self.send_response(200)
            self.end_headers()
            self.wfile.write(body)

        def do_POST(self):
            try:
                body = self.rfile.read(int(self.headers['Content-Length']))
                raw = decompress(body)
                if self.path in ('/loki', '/logs01', '/logs02'):
                    for field, stream in fields(raw):
                        if field == 1:
                            for key, entry in fields(stream):
                                if key == 2:
                                    received[self.path] += [line.decode() for number, line in fields(entry) if number == 2]
                else:
                    for field, series in fields(raw):
                        if field == 1:
                            labels = {}
                            for key, label in fields(series):
                                if key == 1:
                                    pair = dict(fields(label))
                                    labels[pair[1].decode()] = pair[2].decode()
                            received[self.path].append(labels)
                self.send_response(204)
            except Exception as error:
                failures.append(repr(error))
                self.send_response(500)
            self.end_headers()

    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    port, listen = server.server_port, free_port()
    source = (ROOT / 'k8s/observability/alloy/base/config.alloy').read_text()
    name = 'alloy-policy-test-' + uuid.uuid4().hex[:10]
    with tempfile.TemporaryDirectory(prefix='alloy-policy-') as directory:
        temporary = Path(directory)
        # Preserve every production filter/writer. Replace only discovery and
        # log transport, so graph type checking and filtering run in real Alloy.
        start = source.index('discovery.kubernetes "pods"')
        end = source.index('discovery.relabel "metrics"')
        source = source[:start] + source[end:]
        targets = []
        for namespace, path, app in [('app-reventer-stg', '/app', 'backend'), ('nginx-gateway', '/controller', 'nginx-gateway-fabric'), ('reventer-monitoring', '/node', 'node-exporter')]:
            targets.append({'__address__': f'127.0.0.1:{port}', '__metrics_path__': path,
                            '__meta_kubernetes_pod_ip': '127.0.0.1', '__meta_kubernetes_namespace': namespace,
                            '__meta_kubernetes_pod_name': app, '__meta_kubernetes_pod_node_name': 'test-node',
                            '__meta_kubernetes_pod_container_name': app, '__meta_kubernetes_pod_container_port_name': 'metrics',
                            '__meta_kubernetes_pod_label_app': app,
                            '__meta_kubernetes_pod_annotation_prometheus_io_scrape': 'false' if app == 'node-exporter' else 'true',
                            '__meta_kubernetes_pod_annotation_prometheus_io_port': str(port),
                            '__meta_kubernetes_pod_annotation_prometheus_io_path': path})
        literal = '[' + ','.join('{' + ','.join(json.dumps(k) + '=' + json.dumps(v) for k, v in t.items()) + '}' for t in targets) + ']'
        source = source.replace('discovery.kubernetes.pods.targets', literal).replace('scrape_interval = "60s"', 'scrape_interval = "1s"\n scrape_timeout = "1s"')
        start = source.index('loki.source.kubernetes "critical"')
        end = source.index('loki.process "critical"')
        source = source[:start] + '''loki.source.file "critical" {
          targets = [
            {__path__ = "/test/logs.jsonl", namespace = "app-reventer-stg", pod = "fixture", container = "fixture"},
            {__path__ = "/test/system.jsonl", namespace = "nginx-gateway", pod = "fixture", container = "fixture"},
          ]
          forward_to = [loki.process.critical.receiver]
        }
        ''' + source[end:]
        (temporary / 'config.alloy').write_text(source)
        logs = [json.dumps({'level': 'info', 'msg': 'critical mentioned in ordinary info'}),
                json.dumps({'level': 'error', 'msg': 'ordinary error'}),
                json.dumps({'level': 'CRITICAL', 'msg': 'keep-critical'}),
                json.dumps({'severity': 'fatal', 'msg': 'keep-fatal'}),
                json.dumps({'severity_text': 'PANIC', 'msg': 'keep-otel'}),
                json.dumps({'level': 'error', 'severity': 'fatal', 'msg': 'keep-backend-fatal'}),
                json.dumps({'level': 'error', 'msg': 'panic recovered', 'stack': 'fixture-stack'}),
                json.dumps({'level': 'error', 'msg': 'CRITICAL: keep-explicit-prefix'}),
                'panic: keep-native-panic', 'unclassified log']
        (temporary / 'logs.jsonl').write_text('\n'.join(logs) + '\n')
        (temporary / 'system.jsonl').write_text('\n'.join(logs) + '\n')
        env = {'HOSTNAME': 'test-node', 'METRICS_CLUSTER': 'oke-stg', 'ENVIRONMENT': 'stg',
               'LOCAL_METRICS_01': f'http://127.0.0.1:{port}/local01', 'LOCAL_METRICS_02': f'http://127.0.0.1:{port}/local02',
               'GRAFANA_CLOUD_METRICS_URL': f'http://127.0.0.1:{port}/cloud', 'GRAFANA_CLOUD_LOGS_URL': f'http://127.0.0.1:{port}/loki',
               'LOCAL_LOGS_01': f'http://127.0.0.1:{port}/logs01', 'LOCAL_LOGS_02': f'http://127.0.0.1:{port}/logs02',
               'GRAFANA_CLOUD_METRICS_USERNAME': 'fixture', 'GRAFANA_CLOUD_METRICS_PASSWORD': 'fixture',
               'GRAFANA_CLOUD_LOGS_USERNAME': 'fixture', 'GRAFANA_CLOUD_LOGS_PASSWORD': 'fixture'}
        args = ['docker', 'run', '-d', '--name', name, '--network', 'host', '-v', f'{temporary}:/test:ro']
        for key, value in env.items():
            args += ['-e', key + '=' + value]
        args += [IMAGE, 'run', '--disable-reporting', f'--server.http.listen-addr=127.0.0.1:{listen}', '/test/config.alloy']
        try:
            subprocess.run(args, check=True, capture_output=True, text=True)
            deadline = time.monotonic() + 45
            while time.monotonic() < deadline:
                if all(received.values()) and len(received['/loki']) >= 14:
                    break
                time.sleep(1)
            assert not failures, failures
            assert all(received.values()), {k: len(v) for k, v in received.items()}
            cloud = received['/cloud']
            names = {m.get('__name__') for m in cloud}
            assert {'http_requests_total', 'go_goroutines', 'workqueue_depth', 'controller_runtime_reconcile_errors_total', 'controller_runtime_terminal_reconcile_errors_total', 'node_memory_MemAvailable_bytes'} <= names, names
            assert 'controller_runtime_reconcile_time_seconds_bucket' not in names
            assert 'unapproved_application_metric' not in names
            assert 'node_network_info' not in names
            assert {m['le'] for m in cloud if m.get('__name__') == 'http_request_duration_seconds_bucket'} == {'0.1', '0.5', '1', '5', '+Inf'}
            assert not any(m.get('device', '').startswith('veth') or m.get('fstype') == 'tmpfs' or '/kubelet/pods/' in m.get('mountpoint', '') for m in cloud)
            for path in ['/local01', '/local02']:
                local = received[path]
                assert any(m.get('__name__') == 'controller_runtime_reconcile_time_seconds_bucket' for m in local)
                assert not any(m.get('namespace') == 'app-reventer-stg' for m in local)
            lines = received['/loki']
            assert len(lines) == 14, lines
            assert len(received['/logs01']) == len(received['/logs02']) == 7
            assert not any('ordinary' in line or 'unclassified' in line for line in lines), lines
            print('PASS: real Alloy graph; Cloud allowlist; SLO buckets; filesystem/network exclusions; full controller metrics to both local replicas; critical-only logs')
        except Exception:
            logs = subprocess.run(['docker', 'logs', name], capture_output=True, text=True)
            print(logs.stdout[-6000:] + logs.stderr[-6000:])
            raise
        finally:
            subprocess.run(['docker', 'rm', '-f', name], capture_output=True)
            server.shutdown()


if __name__ == '__main__':
    main()
