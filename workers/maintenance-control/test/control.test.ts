import { env } from 'cloudflare:workers';
import { createExecutionContext, runInDurableObject, waitOnExecutionContext } from 'cloudflare:test';
import { describe, expect, it, vi } from 'vitest';
import worker from '../src/index';
import { due, parseJst, nextMorning, formatJst, type Host, type RecordState } from '../src/policy';

type DiscordPayload = { content: string; nonce?: string; enforce_nonce?: boolean; components?: unknown[] };

function fixture(phase: 'scheduled' | 'approval' | 'held' = 'scheduled'): RecordState {
  const now = Date.now();
  return {
    snapshot: { bootId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', required: true, updates: 2,
      fingerprint: 'a'.repeat(64), healthy: true, observedAt: now },
    plan: { revision: 'rev', notifiedRevision: 'rev', target: now - 1000, phase,
      bootId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', fingerprint: 'a'.repeat(64) },
  };
}
const stub = () => env.FLEET.getByName(crypto.randomUUID());
async function seed(target: ReturnType<typeof stub>, host: Host, data: RecordState) {
  await runInDurableObject(target, (instance, ctx) => {
    ctx.storage.sql.exec('INSERT INTO hosts VALUES (?,?) ON CONFLICT(host) DO UPDATE SET data=excluded.data', host, JSON.stringify(data));
    Object.defineProperty(instance, 'discord', { configurable: true, value: async () => ({ id: 'test-message' }) });
  });
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
      components: [{ components: [{ custom_id: 'target', value: formatJst(nextMorning(Date.now())) }] }],
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
    state.plan!.target = nextMorning(Date.now());
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
    state.plan!.target = nextMorning(Date.now());
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
        deliveries.push({ method, payload }); return { id: 'sent' };
      },
    }));
    await target.report('pve-x570', data.snapshot!);
    const rebooted = { ...data.snapshot!, bootId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' };
    await target.report('pve-x570', { ...rebooted, healthy: false });
    expect(deliveries).toHaveLength(0);
    await target.report('pve-x570', rebooted);
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
        payloads.push(payload);
        if (payloads.length === 1) throw new Error('timeout after sending');
        return { id: 'sent' };
      },
    }));
    const rebooted = { ...data.snapshot!, required: false, bootId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' };
    await target.report('pve-x570', rebooted);
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
    expect(state.plan!.reason).toContain('VM・NASの退避は不要');
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
    const selectedTarget = nextMorning(Date.now());
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
