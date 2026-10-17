export const HOSTS = ['dev-app-server', 'pve-x570', 'pve-b550m'] as const;
export type Host = typeof HOSTS[number];
export const isHost = (value: string): value is Host => HOSTS.some(host => host === value);
export const isPve = (host: Host) => host.startsWith('pve-');
export interface Snapshot {
  bootId: string;
  required: boolean;
  updates: number;
  fingerprint: string;
  healthy: boolean;
  observedAt: number;
}
export interface Plan {
  revision: string;
  target: number;
  phase: 'scheduled' | 'approval' | 'held' | 'running' | 'failed';
  notifiedRevision?: string;
  bootId: string;
  fingerprint: string;
  messageId?: string;
  lastReminder?: string;
  reason?: string;
  executionId?: string;
}
export interface RecordState {
  snapshot?: Snapshot;
  plan?: Plan;
}
export function jstDate(now: number): string {
  return new Date(now + 9 * 3600_000).toISOString().slice(0, 10);
}
export function nextMorning(now: number): number {
  return Date.parse(`${jstDate(now)}T05:00:00+09:00`) + 86400_000;
}
export function formatJst(target: number): string {
  return new Date(target + 9 * 3600_000).toISOString().slice(0, 16).replace('T', ' ');
}
export function parseJst(text: string, now: number): number {
  if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(text)) throw new Error('YYYY-MM-DD HH:mm（日本時間）で入力してください。');
  const target = Date.parse(text.replace(' ', 'T') + ':00+09:00');
  if (!Number.isFinite(target) || formatJst(target) !== text || target < now + 10 * 60_000 || target > now + 90 * 86400_000) {
    throw new Error('10分以上先、90日以内の有効な日時を指定してください。');
  }
  return target;
}
export function due(host: Host, state: RecordState, now: number): boolean {
  const { plan, snapshot } = state;
  return !!plan && !!snapshot && plan.phase === 'scheduled' &&
    plan.notifiedRevision === plan.revision && snapshot.healthy &&
    now - snapshot.observedAt < 120_000 && now >= plan.target && now < plan.target + 5 * 60_000 &&
    snapshot.bootId === plan.bootId && snapshot.required;
}
