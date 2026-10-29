import { env } from 'cloudflare:workers';
import { createExecutionContext, runInDurableObject, waitOnExecutionContext } from 'cloudflare:test';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { HEALTH_STABLE_MS, type Inspection } from '../src/environment-health';
import worker from '../src/index';
import { due, parseJst, nextMorning, formatJst, HOSTS, REBOOT_GAP, type Host, type RecordState } from '../src/policy';

type DiscordPayload = { content: string; nonce?: string; enforce_nonce?: boolean; components?: unknown[] };
beforeEach(() => vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-29T21:00:00+09:00')));
afterEach(() => vi.restoreAllMocks());
const healthyEnvironment = (): Inspection => ({ at: Date.now(), alarms: [], signals: [], rules: ['rule'] });

function fixture(phase: 'scheduled' | 'approval' | 'held' = 'scheduled'): RecordState {
  const now = Date.now();
  return {
    snapshot: { bootId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', required: true, updates: 2,
      fingerprint: 'a'.repeat(64), healthy: true, observedAt: now },
    plan: { revision: 'rev', notifiedRevision: 'rev', target: now - 1000, phase, eveningWindow: true,
      bootId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', fingerprint: 'a'.repeat(64) },
  };
}
const stub = () => env.FLEET.getByName(crypto.randomUUID());
async function seed(target: ReturnType<typeof stub>, host: Host, data: RecordState) {
  await runInDurableObject(target, (instance, ctx) => {
    ctx.storage.sql.exec('INSERT INTO hosts VALUES (?,?) ON CONFLICT(host) DO UPDATE SET data=excluded.data', host, JSON.stringify(data));
    ctx.storage.sql.exec('INSERT OR IGNORE INTO environment VALUES (1,?)', JSON.stringify({ inspection: healthyEnvironment() }));
    Object.defineProperty(instance, 'discord', { configurable: true, value: async () => ({ id: 'test-message' }) });
  });
}
async function settleEnvironment(target: ReturnType<typeof stub>) {
  await runInDurableObject(target, (_instance, ctx) => {
    const state = JSON.parse(ctx.storage.sql.exec<{ data: string }>('SELECT data FROM environment WHERE id=1').one().data);
    if (!state.gate?.completedAt) throw new Error('Host operation must complete before environment verification');
    state.gate.stableSince = Date.now() - HEALTH_STABLE_MS;
    state.gate.lastObservationAt = Date.now() - 60_000;
    ctx.storage.sql.exec('UPDATE environment SET data=? WHERE id=1', JSON.stringify(state));
  });
  await target.observeEnvironment(healthyEnvironment());
}
async function read(target: ReturnType<typeof stub>, host: Host): Promise<RecordState> {
  return runInDurableObject(target, (_instance, ctx) => JSON.parse(ctx.storage.sql.exec<{ data: string }>('SELECT data FROM hosts WHERE host=?', host).one().data));
}
function interaction(host: Host, action: string, revision = 'rev') {
  return { id: crypto.randomUUID(), type: 3, token: 'test', application_id: 'app',
    member: { user: { id: 'operator' } }, data: { custom_id: `${host}:${revision}:${action}` } };
}

describe('five-minute reboot notices', () => {
  async function capture(target: ReturnType<typeof stub>, failFirst = false) {
    const deliveries: { path: string; method: string; payload: DiscordPayload }[] = [];
    await runInDurableObject(target, instance => Object.defineProperty(instance, 'discord', {
      configurable: true, value: async (path: string, method: string, payload: DiscordPayload) => {
        deliveries.push({ path, method, payload });
        if (failFirst && deliveries.length === 1) throw new Error('response lost');
        return { id: 'notice' };
      },
    }));
    return deliveries;
  }
  it.each(['pve-x570', 'pve-b550m', 'dev-app-server'] as const)('notifies %s once and keeps the executable plan intact', async host => {
    const target = stub();
    const state = fixture();
    state.plan!.target = Date.now() + 5 * 60_000 - 1000;
    await seed(target, host, state);
    const deliveries = await capture(target);
    await Promise.all([target.remindUpcoming(), target.remindUpcoming()]);
    await target.remindUpcoming();
    await target.report(host, state.snapshot!);
    expect(deliveries).toHaveLength(1);
    expect(deliveries[0]).toMatchObject({ method: 'POST', payload: {
      content: expect.stringContaining(`【再起動5分前】${host}`), enforce_nonce: true,
    } });
    expect(deliveries[0].payload.content).toContain(formatJst(state.plan!.target));
    expect(deliveries[0].payload.components).toBeDefined();
    expect((await read(target, host)).plan).toMatchObject({
      revision: 'rev', notifiedRevision: 'rev', phase: 'scheduled', advanceNotice: { sent: true },
    });
  });
  it.each(['approval', 'held', 'running', 'failed', 'unpublished', 'early', 'expired', 'cancelled'] as const)('does not notify a %s plan', async condition => {
    const target = stub();
    const state = fixture();
    state.plan!.target = Date.now() + 4 * 60_000;
    if (['approval', 'held', 'running', 'failed'].includes(condition)) {
      state.plan!.phase = condition as 'approval' | 'held' | 'running' | 'failed';
    }
    if (condition === 'unpublished') state.plan!.notifiedRevision = undefined;
    if (condition === 'early') state.plan!.target = Date.now() + 6 * 60_000;
    if (condition === 'expired') state.plan!.target = Date.now() - 1000;
    if (condition === 'cancelled') state.plan = undefined;
    await seed(target, 'pve-x570', state);
    const deliveries = await capture(target);
    await target.remindUpcoming();
    expect(deliveries).toHaveLength(0);
  });
  it('retries a failed delivery with the same nonce and stops after success', async () => {
    const target = stub();
    const state = fixture();
    state.plan!.target = Date.now() + 4 * 60_000;
    await seed(target, 'pve-x570', state);
    const deliveries = await capture(target, true);
    await target.remindUpcoming();
    expect((await read(target, 'pve-x570')).plan!.advanceNotice!.sent).toBe(false);
    await target.remindUpcoming();
    await target.remindUpcoming();
    expect(deliveries).toHaveLength(2);
    expect(deliveries[0].payload.nonce).toBe(deliveries[1].payload.nonce);
    expect((await read(target, 'pve-x570')).plan!.advanceNotice!.sent).toBe(true);
  });
  it('sends on host reports as well as cron and notifies again for a changed target', async () => {
    const target = stub();
    const state = fixture();
    state.plan!.target = Date.now() + 4 * 60_000;
    await seed(target, 'dev-app-server', state);
    let deliveries = await capture(target);
    await target.report('dev-app-server', state.snapshot!);
    expect(deliveries).toHaveLength(1);
    const previousNonce = deliveries[0].payload.nonce;
    const updated = await read(target, 'dev-app-server');
    updated.plan!.target += 30_000;
    updated.plan!.revision = updated.plan!.notifiedRevision = 'new-date';
    await seed(target, 'dev-app-server', updated);
    deliveries = await capture(target);
    await target.remindUpcoming();
    expect(deliveries).toHaveLength(1);
    expect(deliveries[0].payload.nonce).not.toBe(previousNonce);
  });
  it('does not retry a failed notice after the operator postpones or holds the plan', async () => {
    for (const action of ['defer', 'hold']) {
      const target = stub();
      const state = fixture();
      state.plan!.target = Date.now() + 4 * 60_000;
      await seed(target, 'pve-x570', state);
      await capture(target, true);
      await target.remindUpcoming();
      await target.interaction(interaction('pve-x570', action));
      const deliveries = await capture(target);
      await target.remindUpcoming();
      expect(deliveries).toHaveLength(0);
    }
  });
  it('does not overwrite a concurrent hold while delivering', async () => {
    const target = stub();
    const state = fixture();
    state.plan!.target = Date.now() + 4 * 60_000;
    await seed(target, 'pve-x570', state);
    await runInDurableObject(target, (instance, ctx) => Object.defineProperty(instance, 'discord', {
      configurable: true, value: async () => {
        const current: RecordState = JSON.parse(ctx.storage.sql.exec<{ data: string }>('SELECT data FROM hosts WHERE host=?', 'pve-x570').one().data);
        current.plan!.phase = 'held';
        current.plan!.revision = 'concurrent-hold';
        ctx.storage.sql.exec('UPDATE hosts SET data=? WHERE host=?', JSON.stringify(current), 'pve-x570');
        return { id: 'notice' };
      },
    }));
    await target.remindUpcoming();
    expect((await read(target, 'pve-x570')).plan).toMatchObject({ phase: 'held', revision: 'concurrent-hold' });
  });
  it('keeps daily plan creation separate from the every-minute reminder cron', async () => {
    const target = env.FLEET.getByName('home-pve');
    for (const host of ['pve-x570', 'pve-b550m', 'dev-app-server'] as const) {
      const state = fixture('held');
      if (host === 'dev-app-server') state.plan = undefined;
      await seed(target, host, state);
    }
    await worker.scheduled({ cron: '* * * * *', scheduledTime: Date.now(), noRetry() {} }, env);
    expect((await read(target, 'dev-app-server')).plan).toBeUndefined();
    await worker.scheduled({ cron: '0 10 * * *', scheduledTime: Date.now(), noRetry() {} }, env);
    expect((await read(target, 'dev-app-server')).plan).toMatchObject({ phase: 'scheduled' });
  });
});

describe('maintenance scheduling', () => {
  it('requires a fresh report, successful notification and matching boot session', () => {
    const state = fixture();
    const now = Date.now();
    expect(due('dev-app-server', state, now)).toBe(true);
    state.plan!.notifiedRevision = undefined;
    expect(due('dev-app-server', state, now)).toBe(false);
    state.plan!.notifiedRevision = 'rev';
    state.snapshot!.bootId = 'different';
    expect(due('dev-app-server', state, now)).toBe(false);
    state.snapshot!.bootId = state.plan!.bootId;
    state.snapshot!.observedAt = now - 121_000;
    expect(due('dev-app-server', state, now)).toBe(false);
  });
  it('rejects past dates, malformed dates and impossible dates', () => {
    const now = Date.parse('2026-10-17T19:00:00+09:00');
    expect(parseJst('2026-10-18 05:00', now)).toBe(nextMorning(now));
    for (const value of ['2026-10-17 19:05', '2026-02-30 05:00', 'tomorrow']) {
      expect(() => parseJst(value, now)).toThrow();
    }
    expect(formatJst(nextMorning(Date.parse('2026-12-31T19:00:00+09:00')))).toBe('2027-01-01 05:00');
  });
  it('an unapproved PVE plan cannot execute', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture('approval'));
    expect(await target.claim('pve-x570')).toBeNull();
  });
  it('returns distinct validation errors without changing the plan', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture('approval'));
    const old = await read(target, 'pve-x570');
    const result = await target.interaction({ ...interaction('pve-x570', 'date-submit'), data: {
      custom_id: 'pve-x570:rev:date-submit', components: [{ components: [{ custom_id: 'target', value: formatJst(Date.now()) }] }],
    } });
    expect(result).toMatchObject({ ok: false, content: expect.stringContaining('10分以上先') });
    expect(result.components[0].components.find(button => button.label === '日時を指定')?.custom_id).toBe('pve-x570:rev:date');
    expect(await read(target, 'pve-x570')).toEqual(old);
    expect((await target.interaction(interaction('pve-x570', 'approve'))).content).toContain('10分以上先');
    expect((await target.interaction(interaction('pve-x570', 'hold', 'stale'))).content).toContain('この通知は古くなっています');
  });
  it.each(['date-submit', 'defer'])('returns usable approval buttons after %s and rejects stale buttons', async action => {
    const target = stub();
    await seed(target, 'pve-x570', fixture('approval'));
    const input = { ...interaction('pve-x570', action), data: {
      custom_id: `pve-x570:rev:${action}`,
      components: [{ components: [{ custom_id: 'target', value: formatJst(nextMorning(Date.now(), 'pve-x570')) }] }],
    } };
    const changed = await target.interaction(input);
    expect(changed.ok).toBe(true);
    expect(changed.content).toContain('下の「この日時で承認」');
    const plan = (await read(target, 'pve-x570')).plan!;
    expect(plan.phase).toBe('approval');
    const approve = changed.components[0].components.find(button => button.label === 'この日時で承認')!;
    expect(approve.custom_id).toBe(`pve-x570:${plan.revision}:approve`);
    expect(approve.disabled).toBe(false);
    const approved = await target.interaction({ ...interaction('pve-x570', 'approve'), data: { custom_id: approve.custom_id } });
    expect(approved.ok).toBe(true);
    expect(approved.content).toContain('OS再起動を承認しました');
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('scheduled');
    const stale = await target.interaction({ ...interaction('pve-x570', 'approve'), data: { custom_id: approve.custom_id } });
    expect(stale.ok).toBe(false);
    expect(stale.content).toContain(formatJst(plan.target));
    expect(stale.components[0].components.find(button => button.label === 'この日時で承認')?.custom_id)
      .toBe(`pve-x570:${(await read(target, 'pve-x570')).plan!.revision}:approve`);
  });
  it.each(['approve', 'hold', 'defer', 'date-submit'])('offers current controls for stale %s without applying it', async action => {
    const target = stub();
    const state = fixture('held');
    state.plan!.target = nextMorning(Date.now(), 'pve-x570');
    await seed(target, 'pve-x570', state);
    const result = await target.interaction(interaction('pve-x570', action, 'old-five-minute-notice'));
    expect(result.ok).toBe(false);
    expect(result.content).toContain('操作は適用していません');
    expect(result.content).toContain(`【保留】pve-x570\n${formatJst(state.plan!.target)}`);
    expect(result.components[0].components.find(button => button.label === 'この日時で承認')?.custom_id)
      .toBe('pve-x570:rev:approve');
    expect(await read(target, 'pve-x570')).toEqual(state);
    expect(await target.claim('pve-x570')).toBeNull();
    const approved = await target.interaction(interaction('pve-x570', 'approve'));
    expect(approved.ok).toBe(true);
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('scheduled');
  });
  it.each(['running', 'failed', 'completed'] as const)('does not offer controls for a stale %s plan', async phase => {
    const target = stub();
    const state = fixture();
    if (phase === 'completed') state.plan = undefined;
    else state.plan!.phase = phase;
    await seed(target, 'pve-x570', state);
    const result = await target.interaction(interaction('pve-x570', 'approve', 'old'));
    expect(result.ok).toBe(false);
    expect(result.components).toEqual([]);
    if (phase === 'completed') expect(result.content).toContain('操作できる再起動予定はありません');
    expect(await read(target, 'pve-x570')).toEqual(state);
  });
  it('returns VM controls without a PVE approval button', async () => {
    const target = stub();
    await seed(target, 'dev-app-server', fixture());
    const result = await target.interaction(interaction('dev-app-server', 'defer'));
    expect(result.components[0].components.map(button => button.label)).toEqual(['翌日に延期', '日時を指定', '保留']);
  });
  it('serializes PVE claims and does not release an interrupted execution with time', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture());
    await seed(target, 'pve-b550m', fixture());
    const claims = await Promise.all([target.claim('pve-x570'), target.claim('pve-b550m')]);
    expect(claims.filter(Boolean)).toHaveLength(1);
    const first = claims[0] ? 'pve-x570' : 'pve-b550m';
    const other = first === 'pve-x570' ? 'pve-b550m' : 'pve-x570';
    expect((await read(target, first)).plan!.phase).toBe('running');
    expect(await target.claim(other)).toBeNull();
  });
  it('postponement wins before a claim and stale buttons cannot change the new plan', async () => {
    const target = stub();
    await seed(target, 'dev-app-server', fixture());
    await target.interaction(interaction('dev-app-server', 'defer'));
    expect(await target.claim('dev-app-server')).toBeNull();
    expect((await target.interaction(interaction('dev-app-server', 'hold'))).ok).toBe(false);
    expect((await read(target, 'dev-app-server')).plan!.phase).toBe('scheduled');
  });
  it('a claimed execution refuses subsequent postponement', async () => {
    const target = stub();
    await seed(target, 'dev-app-server', fixture());
    expect(await target.claim('dev-app-server')).not.toBeNull();
    expect(await target.interaction(interaction('dev-app-server', 'defer'))).toMatchObject({ ok: false, components: [] });
  });
  it('holding a plan prevents execution', async () => {
    const target = stub();
    await seed(target, 'dev-app-server', fixture());
    await target.interaction(interaction('dev-app-server', 'hold'));
    expect(await target.claim('dev-app-server')).toBeNull();
    expect((await read(target, 'dev-app-server')).plan!.phase).toBe('held');
  });
  it('notification failure leaves the changed schedule unexecutable', async () => {
    const target = stub();
    await seed(target, 'dev-app-server', fixture());
    await runInDurableObject(target, instance => Object.defineProperty(instance, 'discord', {
      configurable: true, value: async () => { throw new Error('delivery failed'); },
    }));
    expect(await target.interaction(interaction('dev-app-server', 'defer'))).toMatchObject({
      ok: false, content: expect.stringContaining('通知の更新に失敗しました'),
    });
    expect((await read(target, 'dev-app-server')).plan!.notifiedRevision).toBeUndefined();
    expect(await target.claim('dev-app-server')).toBeNull();
  });
  it('allows explicit approval to be retried after a notification failure', async () => {
    const target = stub();
    const state = fixture('approval');
    state.plan!.target = nextMorning(Date.now(), 'pve-x570');
    await seed(target, 'pve-x570', state);
    await runInDurableObject(target, instance => Object.defineProperty(instance, 'discord', {
      configurable: true, value: async () => { throw new Error('delivery failed'); },
    }));
    const failed = await target.interaction(interaction('pve-x570', 'approve'));
    expect(failed.ok).toBe(false);
    expect((await read(target, 'pve-x570')).plan!.notifiedRevision).toBeUndefined();
    const approve = failed.components[0].components.find(button => button.label === 'この日時で承認')!;
    await runInDurableObject(target, instance => Object.defineProperty(instance, 'discord', {
      configurable: true, value: async () => ({ id: 'recovered-message' }),
    }));
    expect((await target.interaction({ ...interaction('pve-x570', 'approve'), data: { custom_id: approve.custom_id } })).ok).toBe(true);
    const plan = (await read(target, 'pve-x570')).plan!;
    expect(plan.notifiedRevision).toBe(plan.revision);
    expect(plan.phase).toBe('scheduled');
  });
  it('automatic package changes do not change reboot approval', async () => {
    const target = stub();
    const data = fixture();
    await seed(target, 'pve-x570', data);
    await target.report('pve-x570', { ...data.snapshot!, fingerprint: 'b'.repeat(64) });
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('scheduled');
    expect(await target.claim('pve-x570')).not.toBeNull();
  });
  it('only a healthy reboot report completes a running PVE execution', async () => {
    const target = stub();
    const data = fixture();
    await seed(target, 'pve-x570', data);
    await target.claim('pve-x570');
    const rebooted = { ...data.snapshot!, bootId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', healthy: false };
    await target.report('pve-x570', rebooted);
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('running');
    await target.report('pve-x570', { ...rebooted, healthy: true });
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('running');
    await settleEnvironment(target);
    expect((await read(target, 'pve-x570')).plan).toBeUndefined();
  });
  it('posts a distinct reboot success only after changed boot ID and healthy report, once', async () => {
    const target = stub();
    const data = fixture();
    data.plan!.messageId = 'original';
    await seed(target, 'pve-x570', data);
    await target.claim('pve-x570');
    const deliveries: { method: string; payload: DiscordPayload }[] = [];
    await runInDurableObject(target, instance => Object.defineProperty(instance, 'discord', {
      configurable: true, value: async (_path: string, method: string, payload: DiscordPayload) => {
        if (payload.content.startsWith('【再起動完了】')) deliveries.push({ method, payload }); return { id: 'sent' };
      },
    }));
    await target.report('pve-x570', data.snapshot!);
    const rebooted = { ...data.snapshot!, bootId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' };
    await target.report('pve-x570', { ...rebooted, healthy: false });
    expect(deliveries).toHaveLength(0);
    await target.report('pve-x570', rebooted);
    await settleEnvironment(target);
    await target.report('pve-x570', rebooted);
    expect(deliveries.map(item => item.method)).toEqual(['POST', 'PATCH']);
    expect(deliveries[0].payload.content).toContain('【再起動完了】pve-x570');
    expect(deliveries[0].payload.content).toContain('quorum');
    expect(deliveries[0].payload.enforce_nonce).toBe(true);
    expect(deliveries[1].payload.components).toEqual([]);
  });
  it('persists a failed completion delivery and retries without another reboot', async () => {
    const target = stub();
    const data = fixture();
    await seed(target, 'pve-x570', data);
    await target.claim('pve-x570');
    const payloads: DiscordPayload[] = [];
    await runInDurableObject(target, instance => Object.defineProperty(instance, 'discord', {
      configurable: true, value: async (_path: string, _method: string, payload: DiscordPayload) => {
        if (payload.content.startsWith('【再起動完了】')) {
          payloads.push(payload);
          if (payloads.length === 1) throw new Error('timeout after sending');
        }
        return { id: 'sent' };
      },
    }));
    const rebooted = { ...data.snapshot!, required: false, bootId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' };
    await target.report('pve-x570', rebooted);
    await settleEnvironment(target);
    expect((await read(target, 'pve-x570')).plan).toBeUndefined();
    expect(await runInDurableObject(target, (_instance, ctx) =>
      ctx.storage.sql.exec('SELECT id FROM notifications').toArray().length)).toBe(1);
    await target.report('pve-x570', rebooted);
    await target.report('pve-x570', rebooted);
    expect(payloads).toHaveLength(2);
    expect(payloads[1].nonce).toBe(payloads[0].nonce);
    expect(await runInDurableObject(target, (_instance, ctx) =>
      ctx.storage.sql.exec('SELECT id FROM notifications').toArray().length)).toBe(0);
  });
  it('never calls a cancelled or unnecessary plan a successful reboot', async () => {
    for (const changedBoot of [false, true]) {
      const target = stub();
      const data = fixture('held');
      data.plan!.messageId = 'original';
      await seed(target, 'pve-x570', data);
      const deliveries: { method: string; content: string }[] = [];
      await runInDurableObject(target, instance => Object.defineProperty(instance, 'discord', {
        configurable: true, value: async (_path: string, method: string, payload: DiscordPayload) => {
          deliveries.push({ method, content: payload.content }); return { id: 'sent' };
        },
      }));
      await target.report('pve-x570', { ...data.snapshot!, required: false,
        bootId: changedBoot ? 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' : data.snapshot!.bootId });
      expect(deliveries).toHaveLength(1);
      expect(deliveries[0].method).toBe('PATCH');
      expect(deliveries[0].content).toContain('【予定解除】');
      expect(deliveries[0].content).not.toContain('【再起動完了】');
    }
  });
  it('new update candidates do not release an operator hold', async () => {
    const target = stub();
    const data = fixture('held');
    await seed(target, 'pve-x570', data);
    await target.report('pve-x570', { ...data.snapshot!, fingerprint: 'b'.repeat(64) });
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('held');
    expect(await target.claim('pve-x570')).toBeNull();
  });
  it('holds an approved reboot with an explicit service availability reason', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture());
    const claim = await target.claim('pve-x570');
    await target.result('pve-x570', claim!.executionId, 'blocked', 'availability');
    const state = await read(target, 'pve-x570');
    expect(state.plan!.phase).toBe('held');
    expect(state.plan!.reason).toContain('OS再起動は行っていません');
    expect(state.plan!.reason).toContain('Loockit');
    expect(await target.claim('pve-x570')).toBeNull();
  });
  it('automatic updates need no reboot approval and serialize both PVE hosts', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture('held'));
    await seed(target, 'pve-b550m', fixture('approval'));
    const first = await target.claimUpdate('pve-x570');
    expect(first).not.toBeNull();
    expect(await target.claimUpdate('pve-b550m')).toBeNull();
    await target.updateResult('pve-x570', first!.executionId, 'complete');
    expect(await target.claimUpdate('pve-b550m')).toBeNull();
    await settleEnvironment(target);
    expect(await target.claimUpdate('pve-b550m')).not.toBeNull();
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('held');
  });
  it('a running automatic update prevents an approved OS reboot', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture());
    await seed(target, 'pve-b550m', fixture());
    expect(await target.claimUpdate('pve-x570')).not.toBeNull();
    expect(await target.claim('pve-x570')).toBeNull();
    expect(await target.claim('pve-b550m')).toBeNull();
  });
  it('failed automatic updates keep the group blocked until manual recovery', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture('held'));
    await seed(target, 'pve-b550m', fixture());
    const claim = await target.claimUpdate('pve-x570');
    await target.updateResult('pve-x570', claim!.executionId, 'failed');
    expect(await target.claim('pve-b550m')).toBeNull();
    expect(await target.claimUpdate('pve-b550m')).toBeNull();
    await target.recover('pve-x570');
    expect(await target.claimUpdate('pve-b550m')).not.toBeNull();
  });
  it('pending package upgrades without a reboot requirement do not create a reboot plan', async () => {
    const target = stub();
    const state = fixture();
    state.plan = undefined;
    state.snapshot!.required = false;
    await seed(target, 'pve-x570', state);
    await target.tick();
    expect((await read(target, 'pve-x570')).plan).toBeUndefined();
  });
});

describe('staggered maintenance', () => {
  it.each(['2026-10-29', '2026-12-31'])('uses distinct next-day slots after %s', day => {
    const now = Date.parse(`${day}T19:00:00+09:00`);
    const targets = HOSTS.map(host => nextMorning(now, host));
    expect(targets.map(value => formatJst(value).slice(11))).toEqual(['05:00', '20:00', '21:00']);
    expect(formatJst(targets[1]).slice(0, 10)).toBe(day);
    expect(targets[2] - targets[1]).toBe(REBOOT_GAP);
    expect(formatJst(targets[0]).slice(0, 10)).not.toBe(day);
  });
  it('creates separated default plans and keeps both PVE hosts unapproved', async () => {
    const target = stub();
    for (const host of HOSTS) await seed(target, host, { snapshot: fixture().snapshot });
    await target.tick();
    const plans = await Promise.all(HOSTS.map(async host => (await read(target, host)).plan!));
    expect(plans.map(p => formatJst(p.target).slice(11))).toEqual(['05:00', '20:00', '21:00']);
    expect(plans.map(p => p.phase)).toEqual(['scheduled', 'approval', 'approval']);
  });
  it('finds a free automatic slot around an existing custom date', async () => {
    const target = stub();
    const vm = fixture();
    vm.plan!.target = nextMorning(Date.now(), 'pve-x570') + REBOOT_GAP / 2;
    vm.plan!.defaultSlot = false;
    await seed(target, 'dev-app-server', vm);
    for (const host of ['pve-x570', 'pve-b550m'] as const) await seed(target, host, { snapshot: fixture().snapshot });
    await target.tick();
    const plans = await Promise.all(HOSTS.map(async host => (await read(target, host)).plan!));
    for (let i = 0; i < plans.length; i++) for (let j = i + 1; j < plans.length; j++) {
      expect(Math.abs(plans[i].target - plans[j].target)).toBeGreaterThanOrEqual(REBOOT_GAP);
    }
    expect(plans[0].target).toBe(vm.plan!.target);
  });
  it.each([0, 59, -59])('rejects custom dates %i minutes from another host without changing state', async minutes => {
    const target = stub();
    const vm = fixture();
    vm.plan!.target = nextMorning(Date.now(), 'pve-x570');
    await seed(target, 'dev-app-server', vm);
    const pve = fixture('approval');
    await seed(target, 'pve-x570', pve);
    const result = await target.interaction({ ...interaction('pve-x570', 'date-submit'), data: {
      custom_id: 'pve-x570:rev:date-submit', components: [{ components: [{ custom_id: 'target',
        value: formatJst(vm.plan!.target + minutes * 60_000) }] }],
    } });
    expect(result).toMatchObject({ ok: false, content: expect.stringContaining('1時間以上') });
    expect(await read(target, 'pve-x570')).toEqual(pve);
  });
  it('accepts a custom date exactly one hour away and preserves it on reports', async () => {
    const target = stub();
    const vm = fixture();
    vm.plan!.target = nextMorning(Date.now(), 'pve-x570');
    await seed(target, 'dev-app-server', vm);
    await seed(target, 'pve-x570', fixture('approval'));
    const result = await target.interaction({ ...interaction('pve-x570', 'date-submit'), data: {
      custom_id: 'pve-x570:rev:date-submit', components: [{ components: [{ custom_id: 'target',
        value: formatJst(vm.plan!.target + REBOOT_GAP) }] }],
    } });
    expect(result.ok).toBe(true);
    const state = await read(target, 'pve-x570');
    await target.report('pve-x570', state.snapshot!);
    expect((await read(target, 'pve-x570')).plan).toEqual(state.plan);
  });
  it('checks separation again at approval and postponement', async () => {
    for (const action of ['approve', 'defer'] as const) {
      const target = stub();
      const pve = fixture('approval');
      pve.plan!.target = nextMorning(Date.now(), 'pve-x570');
      const vm = fixture();
      vm.plan!.target = pve.plan!.target + (action === 'defer' ? 86400_000 : 0);
      await seed(target, 'dev-app-server', vm);
      await seed(target, 'pve-x570', pve);
      expect(await target.interaction(interaction('pve-x570', action))).toMatchObject({ ok: false,
        content: expect.stringContaining('1時間以上') });
      expect(await read(target, 'pve-x570')).toEqual(pve);
    }
  });
  it.each(['scheduled', 'approval', 'held'] as const)('realigns legacy 05:00 PVE plans while preserving a %s hold or requiring new approval', async phase => {
    const target = stub();
    const state = fixture(phase);
    state.plan!.target = nextMorning(Date.now());
    await seed(target, 'pve-x570', state);
    await target.report('pve-x570', state.snapshot!);
    const plan = (await read(target, 'pve-x570')).plan!;
    expect(formatJst(plan.target).slice(11)).toBe('20:00');
    expect(plan.phase).toBe(phase === 'held' ? 'held' : 'approval');
    expect(plan.revision).not.toBe('rev');
    expect(plan.notifiedRevision).toBe(plan.revision);
    expect((await target.interaction(interaction('pve-x570', 'approve'))).ok).toBe(false);
  });
  it('also realigns legacy dates through the daily tick and rolls expired dates forward', async () => {
    const target = stub();
    const state = fixture('approval');
    state.plan!.target = nextMorning(Date.now()) - 2 * 86400_000;
    await seed(target, 'pve-b550m', state);
    await target.tick();
    const plan = (await read(target, 'pve-b550m')).plan!;
    expect(plan.target).toBe(nextMorning(Date.now(), 'pve-b550m'));
    expect(plan.phase).toBe('approval');
  });
  it('preserves explicit and existing custom dates within the evening window', async () => {
    for (const explicit of [true, false]) {
      const target = stub();
      const state = fixture('approval');
      state.plan!.target = nextMorning(Date.now(), 'pve-b550m') + (explicit ? 0 : REBOOT_GAP);
      if (explicit) state.plan!.defaultSlot = false;
      await seed(target, 'pve-b550m', state);
      await target.report('pve-b550m', state.snapshot!);
      expect((await read(target, 'pve-b550m')).plan!.target).toBe(state.plan!.target);
    }
  });
  it('serializes VM and PVE starts and keeps a one-hour gap after recovery', async () => {
    const target = stub();
    await seed(target, 'dev-app-server', fixture());
    await seed(target, 'pve-x570', fixture());
    const claims = await Promise.all([target.claim('dev-app-server'), target.claim('pve-x570')]);
    expect(claims.filter(Boolean)).toHaveLength(1);
    const first = claims[0] ? 'dev-app-server' : 'pve-x570';
    const other = first === 'dev-app-server' ? 'pve-x570' : 'dev-app-server';
    const state = await read(target, first);
    await target.report(first, { ...state.snapshot!, bootId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' });
    if (first.startsWith('pve-')) await settleEnvironment(target);
    expect((await read(target, first)).plan).toBeUndefined();
    expect(await target.claim(other)).toBeNull();
    const recovered = await read(target, first);
    recovered.lastRebootStartedAt = Date.now() - REBOOT_GAP - 1000;
    await seed(target, first, recovered);
    expect(await target.claim(other)).not.toBeNull();
  });
  it('rejects manual dates near a completed reboot even after its plan was removed', async () => {
    const target = stub();
    await seed(target, 'dev-app-server', { snapshot: fixture().snapshot, lastRebootStartedAt: Date.now() });
    const pve = fixture('approval');
    await seed(target, 'pve-x570', pve);
    const result = await target.interaction({ ...interaction('pve-x570', 'date-submit'), data: {
      custom_id: 'pve-x570:rev:date-submit', components: [{ components: [{ custom_id: 'target',
        value: formatJst(Date.now() + 30 * 60_000) }] }],
    } });
    expect(result).toMatchObject({ ok: false, content: expect.stringContaining('実行開始') });
    expect(await read(target, 'pve-x570')).toEqual(pve);
  });
  it('never releases a running VM or PVE merely because one hour passed', async () => {
    for (const first of ['dev-app-server', 'pve-x570'] as const) {
      const target = stub();
      const active = fixture();
      active.plan!.phase = 'running';
      active.plan!.target = Date.now() - 2 * REBOOT_GAP;
      active.lastRebootStartedAt = active.plan!.target;
      await seed(target, first, active);
      const other = first === 'dev-app-server' ? 'pve-x570' : 'dev-app-server';
      await seed(target, other, fixture());
      await seed(target, 'pve-b550m', { snapshot: fixture().snapshot });
      expect(await target.claim(other)).toBeNull();
      expect(await target.claimUpdate('pve-b550m')).toBeNull();
    }
  });
});

describe('PVE environment gates', () => {
  it('requires reapproval before widening an existing evening approval', async () => {
    const target = stub(), state = fixture();
    state.plan!.eveningWindow = undefined;
    await seed(target, 'pve-x570', state);
    expect(await target.claim('pve-x570')).toBeNull();
    await target.report('pve-x570', state.snapshot!);
    const plan = (await read(target, 'pve-x570')).plan!;
    expect(plan.phase).toBe('approval');
    expect(plan.target).toBe(state.plan!.target);
    expect(plan.revision).not.toBe(state.plan!.revision);
    expect(await target.claim('pve-x570')).toBeNull();
  });
  it('fails closed when no fresh observer result is available', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture());
    await runInDurableObject(target, (_instance, ctx) => ctx.storage.sql.exec('DELETE FROM environment'));
    expect(await target.claimUpdate('pve-x570')).toBeNull();
    expect(await target.claim('pve-x570')).toBeNull();
  });
  it('does not advance after host completion while new alerts or missing data remain', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture('held'));
    await seed(target, 'pve-b550m', fixture('approval'));
    const claim = await target.claimUpdate('pve-x570');
    await target.updateResult('pve-x570', claim!.executionId, 'complete');
    const broken = healthyEnvironment();
    broken.alarms.push({ key: 'new', severity: 'warn', name: 'service unavailable', state: 'pending' });
    await target.observeEnvironment(broken);
    expect(await target.claimUpdate('pve-b550m')).toBeNull();
    await target.observeEnvironment({ ...healthyEnvironment(), error: 'DatasourceError' });
    expect(await target.claimUpdate('pve-b550m')).toBeNull();
    await settleEnvironment(target);
    expect(await target.claimUpdate('pve-b550m')).not.toBeNull();
  });
  it('keeps timeout holds persistent and requires a healthy manual recovery', async () => {
    const target = stub();
    await seed(target, 'pve-x570', fixture('held'));
    await seed(target, 'pve-b550m', fixture('approval'));
    const claim = await target.claimUpdate('pve-x570');
    await target.updateResult('pve-x570', claim!.executionId, 'complete');
    vi.mocked(Date.now).mockReturnValue(Date.now() + 60 * 60_000);
    for (const host of ['pve-x570', 'pve-b550m'] as const) {
      await target.report(host, (await read(target, host)).snapshot!);
    }
    await target.observeEnvironment({ ...healthyEnvironment(), error: 'DatasourceError' });
    expect(await target.claimUpdate('pve-b550m')).toBeNull();
    expect(await runInDurableObject(target, async instance => {
      try { await instance.recover('pve-x570'); return false; } catch { return true; }
    })).toBe(true);
    await target.observeEnvironment(healthyEnvironment());
    expect(await target.claimUpdate('pve-b550m')).toBeNull();
    await target.recover('pve-x570');
    expect(await target.claimUpdate('pve-b550m')).not.toBeNull();
  });
  it('waits past the second target while recovering, then executes within the same evening', async () => {
    vi.mocked(Date.now).mockReturnValue(Date.parse('2026-10-29T20:00:00+09:00'));
    const target = stub();
    const first = fixture();
    first.plan!.target = Date.now();
    await seed(target, 'pve-x570', first);
    const second = fixture();
    second.plan!.target = Date.parse('2026-10-29T21:00:00+09:00');
    await seed(target, 'pve-b550m', second);
    expect(await target.claim('pve-x570')).not.toBeNull();
    vi.mocked(Date.now).mockReturnValue(Date.parse('2026-10-29T20:30:00+09:00'));
    await target.report('pve-x570', { ...fixture().snapshot!, bootId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' });
    vi.mocked(Date.now).mockReturnValue(Date.parse('2026-10-29T21:10:00+09:00'));
    for (const host of ['pve-x570', 'pve-b550m'] as const) await target.report(host, (await read(target, host)).snapshot!);
    expect(await target.claim('pve-b550m')).toBeNull();
    await settleEnvironment(target);
    expect(await target.claim('pve-b550m')).not.toBeNull();
  });
  it.each(['19:59', '00:00'])('cannot reboot a PVE host at %s even with an old approval', async time => {
    const day = time === '00:00' ? '2026-10-30' : '2026-10-29';
    vi.mocked(Date.now).mockReturnValue(Date.parse(day + 'T' + time + ':00+09:00'));
    const target = stub(), state = fixture();
    state.plan!.target = Date.parse('2026-10-29T20:00:00+09:00');
    await seed(target, 'pve-x570', state);
    expect(await target.claim('pve-x570')).toBeNull();
  });
  it('rejects approving a morning PVE date', async () => {
    const target = stub(), state = fixture('approval');
    state.plan!.target = nextMorning(Date.now());
    await seed(target, 'pve-x570', state);
    expect(await target.interaction(interaction('pve-x570', 'approve'))).toMatchObject({
      ok: false, content: expect.stringContaining('20:00'),
    });
  });
});

describe('public ingress', () => {
  it.each([
    ['maintenance-discord.miutaku.work', '/agent/auth-check'],
    ['maintenance-discord.miutaku.work', '/apis/coordination.k8s.io/v1/namespaces/app-loockit/leases'],
    ['maintenance.miutaku.work', '/discord/interactions'],
    ['loockit-lease.miutaku.work', '/agent/auth-check'],
    ['home-maintenance-control.mtakumi-0925.workers.dev', '/agent/auth-check'],
    ['unrecognized.example', '/discord/interactions'],
  ])('rejects cross-host and legacy routes on %s%s', async (host, path) => {
    const response = await worker.fetch(new Request(`https://${host}${path}`, {
      method: 'POST', body: '{}', headers: { 'X-Maintenance-Host': 'pve-x570', Authorization: 'Bearer correct-token' },
    }), { ...env, AGENT_TOKENS_JSON: JSON.stringify({ 'pve-x570': 'correct-token' }) }, {} as ExecutionContext);
    expect(response.status).toBe(404);
  });
  it('provides a read-only per-host authentication check', async () => {
    const response = await worker.fetch(new Request('https://maintenance.miutaku.work/agent/auth-check', {
      method: 'POST', body: '{}', headers: { 'X-Maintenance-Host': 'pve-x570', Authorization: 'Bearer correct-token' },
    }), { ...env, AGENT_TOKENS_JSON: JSON.stringify({ 'pve-x570': 'correct-token' }) }, {} as ExecutionContext);
    expect(await response.json()).toEqual({ ok: true, host: 'pve-x570' });
  });
  it('rejects unsigned Discord interactions', async () => {
    const response = await worker.fetch(new Request('https://maintenance-discord.miutaku.work/discord/interactions', {
      method: 'POST', body: JSON.stringify({ type: 1 }),
    }), env, {} as ExecutionContext);
    expect(response.status).toBe(401);
  });
  it('rejects incorrect per-host tokens', async () => {
    const response = await worker.fetch(new Request('https://maintenance.miutaku.work/agent/claim', {
      method: 'POST', headers: { 'X-Maintenance-Host': 'pve-x570', Authorization: 'Bearer wrong' }, body: '{}',
    }), env, {} as ExecutionContext);
    expect(response.status).toBe(403);
  });
});

async function signedRequest(payload: object, timestamp = String(Math.floor(Date.now() / 1000))) {
  const keys = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']) as CryptoKeyPair;
  const body = JSON.stringify(payload);
  const signature = new Uint8Array(await crypto.subtle.sign('Ed25519', keys.privateKey,
    new TextEncoder().encode(timestamp + body)));
  const publicKey = new Uint8Array(await crypto.subtle.exportKey('raw', keys.publicKey));
  const hex = (bytes: Uint8Array) => [...bytes].map(value => value.toString(16).padStart(2, '0')).join('');
  return { request: new Request('https://maintenance-discord.miutaku.work/discord/interactions', { method: 'POST', body,
    headers: { 'X-Signature-Timestamp': timestamp, 'X-Signature-Ed25519': hex(signature) } }),
    config: { ...env, DISCORD_PUBLIC_KEY: hex(publicKey), DISCORD_OPERATOR_IDS: 'operator', DISCORD_GUILD_ID: 'guild', DISCORD_CHANNEL_ID: 'channel' } };
}
describe('Discord signature and operator authorization', () => {
  it.each(['date', 'pick-submit:0:0'])('returns current buttons instead of opening a stale %s picker', async action => {
    const target = env.FLEET.getByName('home-pve');
    await seed(target, 'pve-x570', fixture('held'));
    const before = await read(target, 'pve-x570');
    const { request, config } = await signedRequest({
      ...interaction('pve-x570', action, 'old'), guild_id: 'guild', channel_id: 'channel',
    });
    const outgoing = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'));
    try {
      const ctx = createExecutionContext();
      expect(await (await worker.fetch(request, config, ctx)).json()).toEqual({ type: 5, data: { flags: 64 } });
      await waitOnExecutionContext(ctx);
      expect(outgoing).toHaveBeenCalledTimes(1);
      const payload = JSON.parse(String(outgoing.mock.calls[0][1]!.body));
      expect(payload.content).toContain('最新の予定を表示します');
      expect(payload.components[0].components).toContainEqual(expect.objectContaining({
        label: '日時を指定', custom_id: 'pve-x570:rev:date',
      }));
      expect(await read(target, 'pve-x570')).toEqual(before);
    } finally { outgoing.mockRestore(); }
  });
  it('opens and updates the picker without changing the stored schedule', async () => {
    const target = env.FLEET.getByName('home-pve');
    await seed(target, 'pve-x570', fixture('approval'));
    const old = await read(target, 'pve-x570');
    const open = await signedRequest({ ...interaction('pve-x570', 'date'), guild_id: 'guild', channel_id: 'channel' });
    const opened = await worker.fetch(open.request, open.config, {} as ExecutionContext);
    const picker = await opened.json() as { type: number; data: { flags: number; components: { components: { custom_id: string }[] }[] } };
    expect(picker.type).toBe(4);
    expect(picker.data.flags).toBe(64);
    const update = await signedRequest({ ...interaction('pve-x570', 'date'), guild_id: 'guild', channel_id: 'channel',
      data: { custom_id: picker.data.components[1].components[0].custom_id, values: ['23'] },
    });
    expect(await (await worker.fetch(update.request, update.config, {} as ExecutionContext)).json()).toMatchObject({
      type: 7, data: { content: expect.stringContaining('23:') },
    });
    expect(await read(target, 'pve-x570')).toEqual(old);
  });
  it.each(['modal', 'picker'])('includes approval buttons after a deferred %s confirmation', async mode => {
    const target = env.FLEET.getByName('home-pve');
    await seed(target, 'pve-x570', fixture('approval'));
    const selectedTarget = nextMorning(Date.now(), 'pve-x570');
    const { request, config } = await signedRequest({
      ...interaction('pve-x570', 'date-submit'), type: mode === 'modal' ? 5 : 3, guild_id: 'guild', channel_id: 'channel',
      data: mode === 'picker' ? { custom_id: `pve-x570:rev:pick-submit:${selectedTarget}:0` } : { custom_id: 'pve-x570:rev:date-submit', components: [{ components: [{
        custom_id: 'target', value: formatJst(selectedTarget),
      }] }] },
    });
    const outgoing = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'));
    try {
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, config, ctx);
      expect(await response.json()).toEqual({ type: 5, data: { flags: 64 } });
      await waitOnExecutionContext(ctx);
      expect(outgoing).toHaveBeenCalledTimes(1);
      const [url, init] = outgoing.mock.calls[0];
      expect(url).toBe('https://discord.com/api/v10/webhooks/app/test/messages/@original');
      const payload = JSON.parse(String(init!.body));
      expect(payload.content).toContain('下の「この日時で承認」');
      expect(payload.components[0].components).toContainEqual(expect.objectContaining({
        label: 'この日時で承認', custom_id: `pve-x570:${(await read(target, 'pve-x570')).plan!.revision}:approve`,
      }));
      expect(payload.allowed_mentions).toEqual({ parse: [] });
      expect((await read(target, 'pve-x570')).plan).toMatchObject({ target: selectedTarget, phase: 'approval' });
    } finally { outgoing.mockRestore(); }
  });
  it('accepts a correctly signed endpoint verification ping', async () => {
    const { request, config } = await signedRequest({ type: 1 });
    const response = await worker.fetch(request, config, {} as ExecutionContext);
    expect(await response.json()).toEqual({ type: 1 });
  });
  it('rejects old signed requests', async () => {
    const { request, config } = await signedRequest({ type: 1 }, String(Math.floor(Date.now() / 1000) - 600));
    expect((await worker.fetch(request, config, {} as ExecutionContext)).status).toBe(401);
  });
  it('rejects a signed button from a different Discord user', async () => {
    const { request, config } = await signedRequest({ type: 3, guild_id: 'guild', channel_id: 'channel', member: { user: { id: 'other' } }, data: { custom_id: 'dev-app-server:rev:hold' } });
    const response = await worker.fetch(request, config, {} as ExecutionContext);
    expect(await response.json()).toMatchObject({ type: 4, data: { flags: 64, content: 'この操作を実行する権限がありません。' } });
  });
});

describe('actionable held maintenance notifications', () => {
  async function capture(target: ReturnType<typeof stub>, failPost = false) {
    const deliveries: { method: string; payload: DiscordPayload }[] = [];
    await runInDurableObject(target, instance => Object.defineProperty(instance, 'discord', {
      configurable: true, value: async (_path: string, method: string, payload: DiscordPayload) => {
        deliveries.push({ method, payload });
        if (failPost && method === 'POST') throw new Error('Discord unavailable');
        return { id: 'held-notice' };
      },
    }));
    return deliveries;
  }
  it('includes the concrete failure, schedule and next action in the immediate notice', async () => {
    const target = stub();
    const data = fixture();
    data.plan!.messageId = 'original';
    await seed(target, 'pve-b550m', data);
    const deliveries = await capture(target);
    const claim = await target.claim('pve-b550m');
    await target.result('pve-b550m', claim!.executionId, 'blocked', 'availability',
      'pve-x570: Loockitの切替が480秒以内に完了しませんでした。');
    const post = deliveries.find(item => item.method === 'POST')!.payload;
    expect(post.content).toContain('【再起動保留】pve-b550m');
    expect(post.content).toContain('予定:');
    expect(post.content).toContain('pve-x570: Loockitの切替が480秒');
    expect(post.content).toContain('OS再起動は行っていません');
    expect(post.content).toContain('日時指定と承認');
    await target.result('pve-b550m', claim!.executionId, 'blocked', 'availability', 'duplicate');
    expect(deliveries.filter(item => item.method === 'POST')).toHaveLength(1);
    expect(await target.claim('pve-b550m')).toBeNull();
  });
  it('includes the stored reason in daily reminders', async () => {
    const target = stub();
    const data = fixture('held');
    data.plan!.messageId = 'original';
    data.plan!.lastReminder = '2000-01-01';
    data.plan!.reason = 'pve-x570: Loockitに応答がありません。';
    await seed(target, 'pve-b550m', data);
    const deliveries = await capture(target);
    await target.tick();
    const post = deliveries.find(item => item.method === 'POST')!.payload.content;
    expect(post).toContain('理由: pve-x570: Loockitに応答がありません');
    expect(post).toContain('再実行するには');
    expect(post).toContain('/original');
  });
  it('retains and retries a failed immediate notice without enabling another reboot', async () => {
    const target = stub();
    const data = fixture();
    data.plan!.messageId = 'original';
    await seed(target, 'pve-b550m', data);
    await capture(target, true);
    const claim = await target.claim('pve-b550m');
    await target.result('pve-b550m', claim!.executionId, 'blocked', 'availability', 'peer offline');
    const deliveries = await capture(target);
    await target.report('pve-b550m', data.snapshot!);
    expect(deliveries.filter(item => item.method === 'POST')).toHaveLength(1);
    expect(deliveries[0].payload.content).toContain('peer offline');
    expect(await target.claim('pve-b550m')).toBeNull();
  });
  it('bounds host-provided detail and removes control characters', async () => {
    const target = stub();
    const data = fixture();
    data.plan!.messageId = 'original';
    await seed(target, 'pve-b550m', data);
    const claim = await target.claim('pve-b550m');
    await target.result('pve-b550m', claim!.executionId, 'blocked', 'availability', '\u0000\r\n' + 'x'.repeat(2000));
    const reason = (await read(target, 'pve-b550m')).plan!.reason!;
    expect(reason).not.toContain('\u0000');
    expect(reason.length).toBeLessThan(750);
  });
});
