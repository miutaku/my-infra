import { env } from 'cloudflare:workers';
import { runInDurableObject } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import worker from '../src/index';
import { due, parseJst, nextMorning, formatJst, type Host, type RecordState } from '../src/policy';

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
    expect((await target.interaction(interaction('dev-app-server', 'defer'))).ok).toBe(false);
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
    expect((await target.interaction(interaction('dev-app-server', 'defer'))).ok).toBe(false);
    expect((await read(target, 'dev-app-server')).plan!.notifiedRevision).toBeUndefined();
    expect(await target.claim('dev-app-server')).toBeNull();
  });
  it('changed PVE packages revoke approval', async () => {
    const target = stub();
    const data = fixture();
    await seed(target, 'pve-x570', data);
    await target.report('pve-x570', { ...data.snapshot!, fingerprint: 'b'.repeat(64) });
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('approval');
    expect(await target.claim('pve-x570')).toBeNull();
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
  it('new update candidates do not release an operator hold', async () => {
    const target = stub();
    const data = fixture('held');
    await seed(target, 'pve-x570', data);
    await target.report('pve-x570', { ...data.snapshot!, fingerprint: 'b'.repeat(64) });
    expect((await read(target, 'pve-x570')).plan!.phase).toBe('held');
    expect(await target.claim('pve-x570')).toBeNull();
  });
});

describe('public ingress', () => {
  it('rejects unsigned Discord interactions', async () => {
    const response = await worker.fetch(new Request('https://test/discord/interactions', {
      method: 'POST', body: JSON.stringify({ type: 1 }),
    }), env, {} as ExecutionContext);
    expect(response.status).toBe(401);
  });
  it('rejects incorrect per-host tokens', async () => {
    const response = await worker.fetch(new Request('https://test/agent/claim', {
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
  return { request: new Request('https://test/discord/interactions', { method: 'POST', body,
    headers: { 'X-Signature-Timestamp': timestamp, 'X-Signature-Ed25519': hex(signature) } }),
    config: { ...env, DISCORD_PUBLIC_KEY: hex(publicKey), DISCORD_OPERATOR_IDS: 'operator', DISCORD_GUILD_ID: 'guild', DISCORD_CHANNEL_ID: 'channel' } };
}
describe('Discord signature and operator authorization', () => {
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
