export const HEALTH_STABLE_MS = 10 * 60_000;
export const HEALTH_TIMEOUT_MS = 60 * 60_000;
export const HEALTH_FRESH_MS = 120_000;
export interface Alarm { key: string; name: string; severity: string; state: string }
export interface Signal { key: string; name: string; kind: string; value: number; age: number }
export interface Inspection { at: number; error?: string; alarms: Alarm[]; signals: Signal[]; rules: string[] }
export interface HealthGate {
  host: string; executionId: string; kind: 'update' | 'reboot'; startedAt: number;
  baseline: Inspection; completedAt?: number; stableSince?: number; lastObservationAt?: number;
  held?: boolean; reason?: string;
}
const SCRAPES = 'up{job=~"home-service-monitor|home-vip-monitor|kube-state-metrics|vmagent|victoria-metrics|node_kubernetes|node_vm|etcd|pve|blackbox_.*"}';
const PROBES = 'probe_success{job=~"blackbox_.*"}';
const parts = (age: boolean) => [
  ['scrape', age ? 'time()-timestamp(' + SCRAPES + ')' : SCRAPES],
  ['probe', age ? 'time()-max without(replica)(timestamp(' + PROBES + '))' : 'max without(replica)(' + PROBES + ')'],
  ['functional', age ? 'time()-timestamp(home_monitor_success)' : 'home_monitor_success'],
].map(([kind, expr]) => 'label_replace((' + expr + '),"maintenance_check","' + kind + '","job",".*")').join(' or ');
export const SIGNAL_QUERY = parts(false);
export const SIGNAL_AGE_QUERY = parts(true);
const object = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid object');
  return value as Record<string, unknown>;
};
const array = (value: unknown): unknown[] => {
  if (!Array.isArray(value)) throw new Error('Invalid array');
  return value;
};
const labels = (value: unknown): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, entry] of Object.entries(object(value))) if (typeof entry === 'string') result[key] = entry;
  return result;
};
const identity = (value: Record<string, string>) => JSON.stringify(Object.entries(value)
  .filter(([key]) => key !== '__name__').sort(([a], [b]) => a.localeCompare(b)));
const sampleRows = (value: unknown) => {
  const response = object(value);
  if (response.status !== 'success') throw new Error('Metrics query failed');
  return array(object(response.data).result).map(row => {
    const entry = object(row), metric = labels(entry.metric), sample = array(entry.value), number = Number(sample[1]);
    if (!Number.isFinite(number)) throw new Error('Non-finite metric');
    return { metric, number, key: identity(metric) };
  });
};
export function parseInspection(ruleResponse: unknown, samples: unknown, ages: unknown, now: number, activeAlerts: unknown = []): Inspection {
  const alarms: Alarm[] = [], rules: string[] = [];
  for (const group of array(object(object(ruleResponse).data).groups)) {
    for (const entry of array(object(group).rules)) {
      const rule = object(entry);
      if (rule.type !== 'alerting') continue;
      const common = labels(rule.labels ?? {});
      if (common.environment !== 'home' || common.managed_by !== 'terraform') continue;
      if (typeof rule.uid !== 'string' || typeof rule.name !== 'string' || rule.health !== 'ok' ||
          !Number.isFinite(Date.parse(String(rule.lastEvaluation))) ||
          now - Date.parse(String(rule.lastEvaluation)) > HEALTH_FRESH_MS ||
          Date.parse(String(rule.lastEvaluation)) > now + 30_000) throw new Error('Alert evaluations unavailable or stale');
      rules.push(rule.uid);
      for (const active of array(rule.alerts ?? [])) {
        const alert = object(active), state = String(alert.state).toLowerCase();
        if (!(state.includes('alerting') || state.includes('firing') || state === 'pending' || state === 'recovering')) continue;
        const tags = { ...common, ...labels(alert.labels) };
        const severity = tags.severity === 'warning' ? 'warn' : ['critical', 'warn', 'info'].includes(tags.severity) ? tags.severity : 'critical';
        const abnormal = /Datasource(NoData|Error)/.test(tags.alertname ?? '');
        alarms.push({ key: rule.uid + ':' + identity(tags), severity: abnormal ? 'critical' : severity,
          state: state === 'pending' ? 'pending' : 'firing',
          name: rule.name + (tags.instance || tags.target ? ' / ' + (tags.instance || tags.target) : '') });
      }
    }
  }
  if (!rules.length) throw new Error('Home alert rules missing');
  for (const entry of array(activeAlerts)) {
    const alert = object(entry), tags = labels(alert.labels);
    if (/Datasource(NoData|Error)/.test(tags.alertname ?? '') &&
        (tags.environment === 'home' || rules.includes(tags.__alert_rule_uid__)) && Date.parse(String(alert.endsAt)) > now) {
      alarms.push({ key: 'synthetic:' + identity(tags), name: tags.alertname + ' / ' + (tags.rulename || tags.datasource_uid || ''),
        severity: 'critical', state: 'firing' });
    }
  }
  const ageMap = new Map(sampleRows(ages).map(row => [row.key, row.number]));
  const signals = sampleRows(samples).map(row => ({
    key: row.key, name: (row.metric.job ?? '') + ' / ' + (row.metric.instance || row.metric.target || row.metric.name || ''),
    kind: row.metric.maintenance_check, value: row.number, age: ageMap.get(row.key) ?? Infinity,
  }));
  for (const job of ['home-service-monitor', 'kube-state-metrics', 'vmagent', 'victoria-metrics', 'node_kubernetes', 'etcd', 'blackbox_http']) {
    if (!signals.some(row => row.kind === 'scrape' && row.name.startsWith(job + ' / '))) throw new Error('Required monitoring job missing');
  }
  return { at: now, alarms, signals, rules };
}
export function healthProblems(inspection: Inspection | undefined, now: number, baseline?: Inspection): string[] {
  if (!inspection || now - inspection.at > HEALTH_FRESH_MS || inspection.at > now + 30_000) return ['監視情報が未取得または古くなっています。'];
  if (inspection.error) return [inspection.error];
  const problems: string[] = [];
  const prior = new Map(baseline?.alarms.map(alarm => [alarm.key, alarm]) ?? []);
  for (const alarm of inspection.alarms) {
    const previous = prior.get(alarm.key);
    if (alarm.severity === 'critical' || (baseline && alarm.severity === 'warn' &&
        (!previous || (previous.state === 'pending' && alarm.state === 'firing')))) {
      problems.push(alarm.severity.toUpperCase() + ' ' + alarm.name + ' (' + alarm.state + ')');
    }
  }
  for (const signal of inspection.signals) {
    if (!Number.isFinite(signal.value)) problems.push('監視値が不正: ' + signal.name);
    if (!Number.isFinite(signal.age) || signal.age > 180 || signal.age < -30) problems.push('監視データの鮮度不足: ' + signal.name);
    if (signal.kind === 'scrape' && signal.value !== 1) problems.push('収集停止: ' + signal.name);
  }
  if (baseline) {
    const current = new Map(inspection.signals.map(signal => [signal.key, signal]));
    for (const before of baseline.signals) {
      if (!current.has(before.key) || (before.value === 1 && current.get(before.key)!.value !== 1)) {
        problems.push('欠測または異常: ' + before.name);
      }
    }
    if (baseline.rules.some(uid => !inspection.rules.includes(uid))) problems.push('作業前に存在したAlert Ruleが見つかりません。');
  }
  return problems;
}
export function observeGate(gate: HealthGate, inspection: Inspection, now: number): 'waiting' | 'passed' | 'held' {
  if (gate.held) return 'held';
  const problems = healthProblems(inspection, now, gate.baseline);
  if (problems.length || (gate.lastObservationAt !== undefined && now - gate.lastObservationAt > HEALTH_FRESH_MS)) gate.stableSince = undefined;
  gate.lastObservationAt = now;
  gate.reason = problems.slice(0, 4).join('\n') || undefined;
  if (gate.completedAt === undefined) {
    if (now - gate.startedAt >= HEALTH_TIMEOUT_MS) {
      gate.held = true;
      gate.reason = '処理完了またはホストの正常復帰を60分以内に確認できませんでした。';
      return 'held';
    }
    return 'waiting';
  }
  if (!problems.length) {
    gate.stableSince ??= now;
    if (now - gate.stableSince >= HEALTH_STABLE_MS) return 'passed';
  }
  if (now - gate.completedAt >= HEALTH_TIMEOUT_MS) {
    gate.held = true;
    gate.reason ??= '環境の安定継続を制限時間内に確認できませんでした。';
    return 'held';
  }
  return 'waiting';
}
class ObservationError extends Error {}
async function readJson(url: URL, token: string, label: string): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(url, { headers: { Authorization: 'Bearer ' + token, Accept: 'application/json',
      'User-Agent': 'my-infra-maintenance-observer/1.0' }, redirect: 'manual',
    signal: AbortSignal.timeout(30_000) });
  } catch (error) {
    const reason = (error instanceof Error ? error.message : '外部への接続失敗')
      .replaceAll(token, '[redacted]').replace(/https?:\/\/\S+/g, '[URL]').replace(/[\r\n]/g, ' ').slice(0, 160);
    throw new ObservationError(label + ': ' + reason);
  }
  if (!response.ok) throw new ObservationError(label + ': HTTP ' + response.status);
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Empty Grafana response');
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 4 * 1024 * 1024) { await reader.cancel(); throw new ObservationError(label + ': 応答サイズの上限超過'); }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(body)); }
  catch { throw new ObservationError(label + ': JSON以外、または不完全な応答'); }
}
export async function inspectEnvironment(config: { GRAFANA_URL: string; GRAFANA_READ_TOKEN: string; HOME_METRICS_UID: string }): Promise<Inspection> {
  try {
    const base = new URL(config.GRAFANA_URL);
    if (base.protocol !== 'https:' || base.username || base.password || !config.GRAFANA_READ_TOKEN ||
        !/^[a-zA-Z0-9_-]+$/.test(config.HOME_METRICS_UID)) throw new Error('Missing monitor configuration');
    const query = (expression: string) => {
      const url = new URL('/api/datasources/proxy/uid/' + config.HOME_METRICS_UID + '/api/v1/query', base);
      url.searchParams.set('query', expression); return url;
    };
    const [rules, signals, ages, alerts] = await Promise.all([
      readJson(new URL('/api/prometheus/grafana/api/v1/rules', base), config.GRAFANA_READ_TOKEN, 'Alert Rule'),
      readJson(query(SIGNAL_QUERY), config.GRAFANA_READ_TOKEN, '監視値'),
      readJson(query(SIGNAL_AGE_QUERY), config.GRAFANA_READ_TOKEN, '監視値の鮮度'),
      readJson(new URL('/api/alertmanager/grafana/api/v2/alerts', base), config.GRAFANA_READ_TOKEN, 'Alertmanager'),
    ]);
    return parseInspection(rules, signals, ages, Date.now(), alerts);
  } catch (error) {
    const reason = error instanceof Error ? error.message : '';
    const known: Record<string, string> = {
      'Alert evaluations unavailable or stale': 'アラート評価エラー、または評価の鮮度不足',
      'Home alert rules missing': 'home環境のAlert Ruleがありません',
      'Required monitoring job missing': '必須の収集対象が欠測しています',
      'Metrics query failed': 'メトリクスのクエリ失敗',
      'Missing monitor configuration': '監視接続設定が不完全です',
    };
    const detail = error instanceof ObservationError ? reason : known[reason] || '接続または応答形式の異常';
    return { at: Date.now(), error: 'Grafanaの環境確認ができません: ' + detail + '。監視設定、権限、接続、データの鮮度を確認してください。',
      alarms: [], signals: [], rules: [] };
  }
}
