#!/usr/bin/env python3
"""Validate the alert catalog, then evaluate regression cases with promtool.

Uses only Python's standard library. Never contacts Grafana or sends alerts.
"""
import argparse
import json
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "terraform/grafana-cloud"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--promtool", default="promtool")
    args = parser.parse_args()
    catalog = json.loads((CONFIG / "rules.json").read_text())
    targets = json.loads((CONFIG / "targets.json").read_text())
    rules = {r["id"]: r for r in catalog}
    assert len(rules) == len(catalog), "duplicate rule identifiers"
    assert len({t["id"] for t in targets}) == len(targets), "duplicate required targets"
    for r in catalog:
        assert r["severity"] in ("warn", "critical"), r
        assert r["feature"] in ("", "kubernetes", "probes", "backups"), r
        assert r["group"] in ("power", "availability", "capacity", "kubernetes", "backups", "observability"), r

    # Prometheus consumes the same expressions/for values as Grafana's A/B graph.
    exported = [{"alert": r["id"], "expr": f'({r["expression"]}) > 0', "for": r["duration"]} for r in catalog]
    exported += [{"alert": "missing-" + t["id"],
                  "expr": f'(absent_over_time({t["selector"]}[{"1m" if t["service"] == "power" else "3m"}]) or vector(0)) > 0',
                  "for": "1m" if t["service"] == "power" else "2m"} for t in targets]
    cases = []

    def case(name, series, expectations, at="10m", interval="15s"):
        cases.append({
            "name": name, "interval": interval,
            "input_series": [{"series": key, "values": value} for key, value in series.items()],
            "promql_expr_test": [
                {"expr": f'sum({rules[rid]["expression"]})', "eval_time": at,
                 "exp_samples": [{"labels": "{}", "value": value}]}
                for rid, value in expectations.items()
            ],
        })

    for charge, ob, warn, critical in [(100, 0, 0, 0), (90, 1, 1, 0), (85, 1, 0, 1), (20, 0, 0, 0)]:
        case(f"UPS charge={charge} OB={ob}", {
            'network_ups_tools_battery_charge{job="nut",instance="ups-a",ups="ups-a"}': f"{charge}+0x40",
            'network_ups_tools_ups_status{job="nut",instance="ups-a",ups="ups-a",flag="OB"}': f"{ob}+0x40",
        }, {"ups-on-battery": warn, "ups-shutdown-near": critical})

    for available, warn, critical in [(20, 0, 0), (10, 1, 0), (5, 1, 0), (4, 0, 1)]:
        case(f"memory {available}%", {
            'node_memory_MemAvailable_bytes{job="node_vm",instance="test"}': f"{available}+0x40",
            'node_memory_MemTotal_bytes{job="node_vm",instance="test"}': "100+0x40",
        }, {"memory-warn": warn, "memory-critical": critical})

    for used, warn, critical in [(75, 0, 0), (80, 1, 0), (85, 1, 0), (86, 0, 1)]:
        case(f"NAS capacity {used}%", {
            'hrStorageUsed{job="snmp_truenas",instance="nas-02",hrStorageDescr="/mnt/data",hrStorageIndex="1"}': f"{used}+0x40",
            'hrStorageSize{job="snmp_truenas",instance="nas-02",hrStorageDescr="/mnt/data",hrStorageIndex="1"}': "100+0x40",
        }, {"nas-capacity-warn": warn, "nas-capacity-critical": critical})

    case("desired zero is normal", {
        'kube_deployment_spec_replicas{namespace="monitoring",deployment="optional"}': "0+0x40",
        'kube_deployment_status_replicas_available{namespace="monitoring",deployment="optional"}': "0+0x40",
    }, {"deployment-down": 0, "deployment-degraded": 0})
    case("important service stopped", {
        'kube_deployment_spec_replicas{namespace="app-nextcloud",deployment="nextcloud"}': "1+0x40",
        'kube_deployment_status_replicas_available{namespace="app-nextcloud",deployment="nextcloud"}': "0+0x40",
    }, {"deployment-down": 1, "deployment-degraded": 0})
    case("IoT exporter stops without becoming critical", {
        'kube_deployment_spec_replicas{namespace="monitoring",deployment="tinytuya-exporter"}': "1+0x40",
        'kube_deployment_status_replicas_available{namespace="monitoring",deployment="tinytuya-exporter"}': "0+0x40",
    }, {"deployment-down": 0, "deployment-stopped-warn": 1})
    case("monitoring storage unavailable is critical", {
        'kube_statefulset_replicas{namespace="monitoring",statefulset="victoria-metrics"}': "1+0x40",
        'kube_statefulset_status_replicas_ready{namespace="monitoring",statefulset="victoria-metrics"}': "0+0x40",
    }, {"statefulset-down": 1, "statefulset-stopped-warn": 0})
    case("backup never succeeded", {
        'kube_cronjob_created{namespace="infra-db",cronjob="mariadb-backup"}': "1+0x17280",
    }, {"backup-db-critical": 1}, at="72h")
    case("backup deleted", {}, {"backup-db-deleted": 1})
    case("new backup gets a full initial schedule grace period", {
        'kube_cronjob_created{namespace="infra-db",cronjob="mariadb-backup"}': "599+0x40",
    }, {"backup-db-critical": 0, "backup-db-warn": 0})
    case("Talos immutable rootfs is intentionally read-only", {
        'node_filesystem_readonly{job="node_kubernetes",instance="controlplane-01-talos",fstype="rootfs",mountpoint="/.extra"}': "1+0x40",
    }, {"filesystem-readonly": 0})
    case("backup suspended", {
        'kube_cronjob_info{namespace="infra-db",cronjob="mariadb-backup"}': "1+0x40",
        'kube_cronjob_spec_suspend{namespace="infra-db",cronjob="mariadb-backup"}': "1+0x40",
    }, {"backup-db-deleted": 1})
    case("collector absent despite query succeeding", {}, {"freshness": 1})

    for direction in ("receive", "transmit"):
        rid = f"nic-{direction}-errors"
        for name, errors, packets, device, state, expected in [
            ("bad link", 30, 1500, "eth0", "up", 1),
            ("low traffic single errors", 1, 1, "eth0", "up", 0),
            ("below ratio threshold", 30, 6000, "eth0", "up", 0),
            ("container interface", 30, 1500, "veth1234", "up", 0),
            ("inactive interface", 30, 1500, "eth0", "down", 0),
        ]:
            labels = f'job="node_vm",instance="test",device="{device}"'
            case(f"NIC {direction}: {name}", {
                f'node_network_{direction}_errs_total{{{labels}}}': f"0+{errors}x40",
                f'node_network_{direction}_packets_total{{{labels}}}': f"0+{packets}x40",
                f'node_network_info{{{labels},operstate="{state}"}}': "1+0x40",
            }, {rid: expected})

    for metric, rid, step in [
        ("ifInErrors", "router-receive-errors", 30),
        ("ifOutErrors", "router-transmit-errors", 30),
        ("ifInDiscards", "router-receive-drops", 300),
        ("ifOutDiscards", "router-transmit-drops", 300),
    ]:
        for name, descr, state, expected in [
            ("active WAN", "GigaEthernet0.0", 1, 1),
            ("active tunnel", "Tunnel1.0", 1, 1),
            ("inactive LAN", "GigaEthernet2.20", 2, 0),
            ("unused port", "GigaEthernet1.0", 1, 0),
            ("loopback", "Loopback0.0", 1, 0),
        ]:
            labels = f'job="snmp",instance="ix2215",ifIndex="1",ifDescr="{descr}"'
            case(f"{rid}: {name}", {
                f'{metric}{{{labels}}}': f"0+{step}x40",
                f'ifOperStatus{{{labels}}}': f"{state}+0x40",
            }, {rid: expected})

    case("load normalized by cores", {
        'node_load5{job="node_vm",instance="test"}': "4+0x40",
        'node_cpu_seconds_total{job="node_vm",instance="test",cpu="0",mode="idle"}': "0+10x40",
        'node_cpu_seconds_total{job="node_vm",instance="test",cpu="1",mode="idle"}': "0+10x40",
    }, {"load-average": 1})
    case("normal multicore load", {
        'node_load5{job="node_vm",instance="test"}': "4+0x40",
        **{f'node_cpu_seconds_total{{job="node_vm",instance="test",cpu="{cpu}",mode="idle"}}': "0+10x40" for cpu in range(4)},
    }, {"load-average": 0})

    for direction, threshold in (("download", 25), ("upload", 20)):
        metric = f'speedtest_{direction}_speed_mbps{{job="speedtest",instance="speedtest"}}'
        for name, samples, at, expected in [
            ("three slow results", f"{threshold-1}+0x3", "10m", 1),
            ("one slow result", f"100 {threshold-1} 100", "10m", 0),
            ("only two results", f"{threshold-1}+0x1", "5m", 0),
            ("stale measurement", f"{threshold-1}+0x2", "21m", 0),
            ("measurement disappears", f"{threshold-1} {threshold-1} stale", "11m", 0),
            ("exact threshold", f"{threshold}+0x3", "10m", 0),
        ]:
            case(f"{direction}: {name}", {metric: samples}, {f"speedtest-{direction}-slow": expected}, at=at, interval="5m")

    # A target removed from discovery must still page, and a failed probe (value
    # zero) must not be confused with a missing series.
    selector = 'probe_success{job="blackbox_icmp",instance="nas-02"}'
    for name, samples, expected in [("target deleted", {}, 1), ("probe failing but present", {selector: "0+0x40"}, 0)]:
        cases.append({"name": name, "interval": "15s",
                      "input_series": [{"series": k, "values": v} for k, v in samples.items()],
                      "promql_expr_test": [{"expr": f"sum(absent_over_time({selector}[3m]) or vector(0))", "eval_time": "10m",
                                            "exp_samples": [{"labels": "{}", "value": expected}]}]})

    with tempfile.TemporaryDirectory(prefix="my-infra-alerts-") as directory:
        folder = Path(directory)
        rulefile = folder / "rules.json"
        rulefile.write_text(json.dumps({"groups": [{"name": "monitoring", "rules": exported}]}))
        testfile = folder / "tests.json"
        # The expression cases do not depend on recording rules. Avoid
        # reevaluating the entire catalog for every synthetic timestamp.
        testfile.write_text(json.dumps({"rule_files": [], "evaluation_interval": "15s", "tests": cases}))
        subprocess.run([args.promtool, "check", "rules", str(rulefile)], check=True)
        subprocess.run([args.promtool, "test", "rules", str(testfile)], check=True)

        # Verify the actual alert pending period as well as numeric expressions.
        powerfile = folder / "power.json"
        powerfile.write_text(json.dumps({"groups": [{"name": "power", "interval": "10s", "rules": [
            rule for rule in exported if rule["alert"] in ("ups-on-battery", "ups-shutdown-near")
        ]}]}))
        durationfile = folder / "duration-tests.json"
        durationfile.write_text(json.dumps({"rule_files": [str(powerfile)], "evaluation_interval": "10s", "tests": [
            {"interval": "15s", "input_series": [
                {"series": 'network_ups_tools_battery_charge{job="nut",instance="ups-a",ups="ups-a"}', "values": "90+0x8"},
                {"series": 'network_ups_tools_ups_status{job="nut",instance="ups-a",ups="ups-a",flag="OB"}', "values": "1+0x8"},
            ], "alert_rule_test": [
                {"eval_time": "15s", "alertname": "ups-on-battery", "exp_alerts": []},
                {"eval_time": "30s", "alertname": "ups-on-battery", "exp_alerts": [
                    {"exp_labels": {"job": "nut", "instance": "ups-a", "ups": "ups-a", "flag": "OB"}}
                ]},
            ]},
            {"interval": "15s", "input_series": [
                {"series": 'network_ups_tools_battery_charge{job="nut",instance="ups-a",ups="ups-a"}', "values": "85+0x8"},
                {"series": 'network_ups_tools_ups_status{job="nut",instance="ups-a",ups="ups-a",flag="OB"}', "values": "1+0x8"},
            ], "alert_rule_test": [
                {"eval_time": "0s", "alertname": "ups-on-battery", "exp_alerts": []},
                {"eval_time": "0s", "alertname": "ups-shutdown-near", "exp_alerts": [
                    {"exp_labels": {"job": "nut", "instance": "ups-a", "ups": "ups-a"}}
                ]},
            ]},
        ]}))
        subprocess.run([args.promtool, "test", "rules", str(durationfile)], check=True)
    print(f"Validated {len(catalog)} catalog rules, {len(targets)} required targets and {len(cases)} behavioral cases")


if __name__ == "__main__":
    main()
