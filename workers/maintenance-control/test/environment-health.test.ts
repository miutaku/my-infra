import { describe, it, expect, vi, afterEach } from 'vitest';
import { parseInspection, healthProblems, observeGate, inspectEnvironment, HEALTH_STABLE_MS, HEALTH_TIMEOUT_MS,
  type Inspection, type HealthGate } from '../src/environment-health';
const now = Date.parse('2026-10-29T20:10:00+09:00');
export const healthy = (at = now): Inspection => ({ at, alarms: [], rules: ['rule'], signals: [
  { key: 'scrape', name: 'vmagent', kind: 'scrape', value: 1, age: 10 },
  { key: 'service', name: 'service', kind: 'functional', value: 1, age: 10 },
] });
const gate = (): HealthGate => ({ host: 'pve-x570', executionId: 'execution', kind: 'update', startedAt: now - 60_000,
  completedAt: now, baseline: healthy() });
afterEach(() => vi.restoreAllMocks());

describe('post-maintenance observation', () => {
  it('waits for warning duration but rejects new firing warnings and escalation from pending', () => {
    const baseline = healthy();
    baseline.alarms.push({ key: 'old', name: 'existing', severity: 'warn', state: 'firing' });
    expect(healthProblems({ ...baseline }, now, baseline)).toEqual([]);
    const changed = { ...baseline, alarms: [...baseline.alarms, { key: 'new', name: 'new failure', severity: 'warn', state: 'pending' }] };
    expect(healthProblems(changed, now, baseline)).toEqual([]);
    changed.alarms[1].state = 'firing';
    expect(healthProblems(changed, now, baseline)).toContain('WARN new failure (firing)');
    baseline.alarms[0].state = 'pending';
    expect(healthProblems({ ...baseline, alarms: [{ ...baseline.alarms[0], state: 'firing' }] }, now, baseline)).not.toEqual([]);
  });
  it('never accepts critical alerts, even if present before the operation', () => {
    const baseline = healthy();
    baseline.alarms.push({ key: 'critical', name: 'broken', severity: 'critical', state: 'pending' });
    expect(healthProblems(baseline, now)).not.toEqual([]);
    expect(healthProblems(baseline, now, baseline)).not.toEqual([]);
  });
  it('reports advisory freshness alarms without blocking update completion while retaining monitoring failures', () => {
    const current = healthy();
    current.alarms.push({ key: 'old-snapshot', name: 'backup freshness', severity: 'critical', state: 'firing', blocking: false });
    expect(healthProblems(current, now, healthy())).toEqual([]);
    current.signals[0].value = 0;
    expect(healthProblems(current, now, healthy())).not.toEqual([]);
    current.error = 'DatasourceError';
    expect(healthProblems(current, now, healthy())).toEqual(['DatasourceError']);
  });
  it('detects disappearance even when Grafana clears an alert through MissingSeries', () => {
    const current = healthy();
    current.signals.pop();
    expect(healthProblems(current, now, healthy())).toContain('欠測または異常: service');
    current.rules = [];
    expect(healthProblems(current, now, healthy()).join()).toContain('Alert Rule');
  });
  it.each(['error', 'stale', 'down', 'lost', 'nonfinite-age'])('cannot pass with %s monitoring', kind => {
    const current = healthy();
    if (kind === 'error') current.error = 'DatasourceError';
    if (kind === 'stale') current.signals[0].age = 181;
    if (kind === 'down') current.signals[0].value = 0;
    if (kind === 'lost') current.at -= 121_000;
    if (kind === 'nonfinite-age') current.signals[0].age = Infinity;
    expect(healthProblems(current, now, healthy()).length).toBeGreaterThan(0);
  });
  it('waits for ten minutes of consecutive successful observations', () => {
    const state = gate();
    for (let minute = 0; minute < 10; minute++) {
      const at = now + minute * 60_000;
      expect(observeGate(state, healthy(at), at)).toBe('waiting');
    }
    expect(observeGate(state, healthy(now + HEALTH_STABLE_MS), now + HEALTH_STABLE_MS)).toBe('passed');
  });
  it('resets stability on a transient alert and on a gap in observations', () => {
    const state = gate();
    observeGate(state, healthy(), now);
    const broken = healthy(now + 60_000);
    broken.alarms.push({ key: 'new', name: 'transient', severity: 'warn', state: 'firing' });
    expect(observeGate(state, broken, now + 60_000)).toBe('waiting');
    expect(state.stableSince).toBeUndefined();
    observeGate(state, healthy(now + 120_000), now + 120_000);
    expect(observeGate(state, healthy(now + 15 * 60_000), now + 15 * 60_000)).toBe('waiting');
    expect(state.stableSince).toBe(now + 15 * 60_000);
  });
  it('allows alert resolution delays within the recovery timeout and then starts stabilization', () => {
    const state = gate();
    for (let minute = 0; minute < 25; minute++) {
      const current = healthy(now + minute * 60_000);
      current.alarms.push({ key: 'new', name: 'recovering', severity: 'warn', state: 'firing' });
      expect(observeGate(state, current, current.at)).toBe('waiting');
    }
    for (let minute = 25; minute <= 35; minute++) {
      const at = now + minute * 60_000;
      expect(observeGate(state, healthy(at), at)).toBe(minute === 35 ? 'passed' : 'waiting');
    }
  });
  it('can stabilize while short-lived warning Pending instances recur on a schedule', () => {
    const state = gate();
    for (let minute = 0; minute <= 10; minute++) {
      const current = healthy(now + minute * 60_000);
      if (minute % 5 === 0) current.alarms.push({ key: 'job-' + minute, name: 'new job starting', severity: 'warn', state: 'pending' });
      expect(observeGate(state, current, current.at)).toBe(minute === 10 ? 'passed' : 'waiting');
    }
  });
  it('does not release a stabilization timeout on the first healthy observation', () => {
    const state = gate(), current = healthy(now + HEALTH_TIMEOUT_MS);
    current.error = 'DatasourceError';
    expect(observeGate(state, current, current.at)).toBe('held');
    expect(state.reason).toContain('DatasourceError');
    expect(observeGate(state, healthy(current.at + 60_000), current.at + 60_000)).toBe('held');
    expect(state.stableSince).toBe(current.at + 60_000);
  });
  it('does not treat successful monitoring as proof that an unfinished host operation completed', () => {
    const state = gate(); state.completedAt = undefined;
    expect(observeGate(state, healthy(now + HEALTH_STABLE_MS), now + HEALTH_STABLE_MS)).toBe('waiting');
    expect(observeGate(state, healthy(now + HEALTH_TIMEOUT_MS), now + HEALTH_TIMEOUT_MS)).toBe('held');
    expect(state.holdCause).toBe('operation');
    expect(observeGate(state, healthy(now + HEALTH_TIMEOUT_MS + 60_000), now + HEALTH_TIMEOUT_MS + 60_000)).toBe('held');
  });
  it('continues observing after a stabilization timeout and resumes only after ten fresh stable minutes', () => {
    const state = gate();
    const failed = healthy(now + HEALTH_TIMEOUT_MS);
    failed.error = 'DatasourceError';
    expect(observeGate(state, failed, failed.at)).toBe('held');
    expect(state.holdCause).toBe('timeout');
    for (let minute = 1; minute <= 11; minute++) {
      const current = healthy(failed.at + minute * 60_000);
      expect(observeGate(state, current, current.at)).toBe(minute === 11 ? 'passed' : 'held');
    }
  });
});

describe('Grafana inspection adapter', () => {
  function response() {
    const jobs = ['home-service-monitor', 'kube-state-metrics', 'vmagent', 'victoria-metrics', 'node_kubernetes', 'etcd', 'blackbox_http'];
    const samples = { status: 'success', data: { result: jobs.map(job => ({
      metric: { job, instance: job, maintenance_check: 'scrape' }, value: [now / 1000, '1'],
    })) } };
    const ages = structuredClone(samples);
    for (const row of ages.data.result) row.value[1] = '10';
    const rule = { uid: 'rule', type: 'alerting', name: 'test', labels: { environment: 'home', managed_by: 'terraform', severity: 'warn' },
      health: 'ok', lastEvaluation: new Date(now).toISOString(), alerts: [] as object[] };
    const rules = { data: { groups: [{ rules: [rule] }] } };
    return { samples, ages, rules, rule };
  }
  it('parses healthy metrics and home alert rules and detects pending alerts', () => {
    const data = response();
    data.rule.alerts.push({ state: 'Pending', labels: { instance: 'target' } });
    const result = parseInspection(data.rules, data.samples, data.ages, now);
    expect(result.rules).toEqual(['rule']);
    expect(result.signals).toHaveLength(7);
    expect(result.alarms[0]).toMatchObject({ severity: 'warn', state: 'pending', name: 'test / target' });
  });
  it.each(['evaluation', 'old-evaluation', 'missing-job', 'query-error', 'invalid-value'])('rejects %s results', kind => {
    const data = response();
    if (kind === 'evaluation') data.rule.health = 'error';
    if (kind === 'old-evaluation') data.rule.lastEvaluation = new Date(now - 180_000).toISOString();
    if (kind === 'missing-job') data.samples.data.result.pop();
    if (kind === 'query-error') data.samples.status = 'error';
    if (kind === 'invalid-value') data.samples.data.result[0].value[1] = 'NaN';
    expect(() => parseInspection(data.rules, data.samples, data.ages, now)).toThrow();
  });
  it('identifies individual VMs by display annotations and falls back to resource labels', () => {
    const data = response();
    data.rule.alerts.push({ state: 'Alerting', labels: { vm: '100', instance: 'shared-exporter' },
      annotations: { display_target: 'application (VM 100) / PBS' } },
    { state: 'Alerting', labels: { namespace: 'apps', pod: 'api-abc', instance: 'shared-exporter' } },
    { state: 'Alerting', labels: { vm: '200', instance: 'shared-exporter' } });
    const result = parseInspection(data.rules, data.samples, data.ages, now);
    expect(result.alarms.map(alarm => alarm.name)).toEqual([
      'test / application (VM 100) / PBS', 'test / namespace=apps / pod=api-abc', 'test / vm=200',
    ]);
    expect(new Set(result.alarms.map(alarm => alarm.key)).size).toBe(3);
  });
  it('recognizes synthetic No Data alerts even when evaluation health is ok', () => {
    const data = response();
    const result = parseInspection(data.rules, data.samples, data.ages, now, [{
      labels: { alertname: 'DatasourceNoData', __alert_rule_uid__: 'rule' }, endsAt: new Date(now + 60_000).toISOString(),
    }]);
    expect(result.alarms[0]).toMatchObject({ severity: 'critical', state: 'firing' });
    expect(healthProblems(result, now)).not.toEqual([]);
  });
  it('defaults to blocking and never treats a datasource failure as advisory', () => {
    const data = response();
    data.rule.alerts.push({ state: 'Alerting', labels: { vm: '100' }, annotations: { maintenance_gate: 'advisory' } },
      { state: 'Alerting', labels: { vm: '200' }, annotations: { maintenance_gate: 'typo' } },
      { state: 'Alerting', labels: { alertname: 'DatasourceError' }, annotations: { maintenance_gate: 'advisory' } });
    const result = parseInspection(data.rules, data.samples, data.ages, now);
    expect(result.alarms.map(alarm => alarm.blocking)).toEqual([false, true, true]);
  });
  it('uses only bounded GETs, refuses redirects and never returns credential-bearing errors', async () => {
    const requests: RequestInit[] = [];
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
      requests.push(init!); return new Response('', { status: 403 });
    });
    const result = await inspectEnvironment({ GRAFANA_URL: 'https://grafana.invalid', GRAFANA_READ_TOKEN: 'secret-value', HOME_METRICS_UID: 'home' });
    expect(requests).toHaveLength(4);
    expect(requests.every(init => init.redirect === 'manual' && init.method === undefined && init.body === undefined)).toBe(true);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('HTTP 403');
    expect(JSON.stringify(result)).not.toContain('secret-value');
  });
  it('redacts network exception tokens and URLs before reporting a connection error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network secret-value https://grafana.invalid/private?token=secret-value'));
    const result = await inspectEnvironment({ GRAFANA_URL: 'https://grafana.invalid', GRAFANA_READ_TOKEN: 'secret-value', HOME_METRICS_UID: 'home' });
    expect(result.error).toContain('network');
    expect(result.error).not.toContain('secret-value');
    expect(result.error).not.toContain('grafana.invalid');
  });
  it('rejects redirects without issuing an authenticated request to the destination', async () => {
    const request = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', {
      status: 302, headers: { Location: 'https://untrusted.invalid' },
    }));
    const result = await inspectEnvironment({ GRAFANA_URL: 'https://grafana.invalid', GRAFANA_READ_TOKEN: 'secret-value', HOME_METRICS_UID: 'home' });
    expect(result.error).toContain('HTTP 302');
    expect(request.mock.calls.every(([url]) => new URL(String(url)).hostname === 'grafana.invalid')).toBe(true);
    expect(request).toHaveBeenCalledTimes(4);
  });
});
