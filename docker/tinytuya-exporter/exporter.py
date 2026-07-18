import logging
import os
import time

import tinytuya
from prometheus_client import Gauge, start_http_server

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
log = logging.getLogger("tinytuya-exporter")

DEVICE_ID = os.environ["TUYA_DEVICE_ID"]
DEVICE_IP = os.environ["TUYA_DEVICE_IP"]
LOCAL_KEY = os.environ["TUYA_LOCAL_KEY"]
VERSION = float(os.getenv("TUYA_VERSION", "3.3"))
INTERVAL = float(os.getenv("POLL_INTERVAL_SECONDS", "15"))
LABEL = os.getenv("TUYA_DEVICE_NAME", "tuya-16a")

CURRENT_DPS = os.getenv("TUYA_CURRENT_DPS", "18")
POWER_DPS = os.getenv("TUYA_POWER_DPS", "19")
VOLTAGE_DPS = os.getenv("TUYA_VOLTAGE_DPS", "20")
SWITCH_DPS = os.getenv("TUYA_SWITCH_DPS", "1")
REQUEST_UPDATEDPS = os.getenv("TUYA_REQUEST_UPDATEDPS", "false").lower() in {"1", "true", "yes"}

labels = ["device"]
current = Gauge("tuya_current_amperes", "Measured RMS current", labels)
power = Gauge("tuya_power_watts", "Measured active power", labels)
voltage = Gauge("tuya_voltage_volts", "Measured RMS voltage", labels)
apparent = Gauge("tuya_apparent_power_volt_amperes", "Calculated apparent power", labels)
switch_on = Gauge("tuya_switch_on", "Whether the outlet relay is on", labels)
up = Gauge("tuya_up", "Whether the latest device poll succeeded", labels)
last_success = Gauge("tuya_last_success_timestamp_seconds", "Unix timestamp of the latest successful poll", labels)


def number(dps, key):
    value = dps.get(key)
    if not isinstance(value, (int, float)):
        raise ValueError(f"DPS {key} is absent or non-numeric; available DPS: {sorted(dps)}")
    return float(value)


def main():
    device = tinytuya.OutletDevice(DEVICE_ID, DEVICE_IP, LOCAL_KEY, version=VERSION)
    device.set_socketTimeout(min(10.0, INTERVAL))
    while True:
        started = time.monotonic()
        try:
            # Some energy-monitoring plugs do not refresh telemetry until UPDATEDPS is sent.
            if REQUEST_UPDATEDPS:
                device.updatedps([CURRENT_DPS, POWER_DPS, VOLTAGE_DPS])
            result = device.status()
            if not isinstance(result, dict) or "dps" not in result:
                raise RuntimeError(f"unexpected TinyTuya response: {result!r}")
            dps = result["dps"]
            amps = number(dps, CURRENT_DPS) / 1000.0
            watts = number(dps, POWER_DPS) / 10.0
            volts = number(dps, VOLTAGE_DPS) / 10.0
            current.labels(LABEL).set(amps)
            power.labels(LABEL).set(watts)
            voltage.labels(LABEL).set(volts)
            apparent.labels(LABEL).set(volts * amps)
            if isinstance(dps.get(SWITCH_DPS), bool):
                switch_on.labels(LABEL).set(1 if dps[SWITCH_DPS] else 0)
            up.labels(LABEL).set(1)
            last_success.labels(LABEL).set_to_current_time()
        except Exception:
            up.labels(LABEL).set(0)
            log.exception("poll failed for %s (%s)", LABEL, DEVICE_IP)
        time.sleep(max(0.1, INTERVAL - (time.monotonic() - started)))


if __name__ == "__main__":
    start_http_server(int(os.getenv("LISTEN_PORT", "9123")))
    main()
