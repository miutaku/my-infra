import { env } from 'cloudflare:workers';
import { runInDurableObject } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import worker from '../src/index';
import { LEASE_NAME, LEASE_PATH, type Lease } from '../src/loockit-lease';
const stub = () => env.LOOCKIT_LEASE.getByName(crypto.randomUUID());
const candidate = (identity: string, version = '') => ({
  metadata: { name: LEASE_NAME, namespace: 'app-loockit', resourceVersion: version },
  spec: { holderIdentity: identity, leaseDurationSeconds: 15, acquireTime: '2099-01-01T00:00:00Z',
    renewTime: '2099-01-01T00:00:00Z', leaseTransitions: 999 },
}) as Lease;
const get = async (target: ReturnType<typeof stub>) => (await target.operate('GET', null, 'loockit-x570')).body as Lease;

describe('independent BLE Lease', () => {
  it('serializes competing creates and refuses takeover before server-side expiry', async () => {
    const target = stub();
    const results = await Promise.all(['loockit-x570', 'loockit-b550m'].map(name => target.operate('POST', candidate(name), name)));
    expect(results.map(result => result.status).sort()).toEqual([201, 409]);
    const current = await get(target);
    const other = current.spec.holderIdentity === 'loockit-x570' ? 'loockit-b550m' : 'loockit-x570';
    expect((await target.operate('PUT', candidate(other, current.metadata.resourceVersion), other)).status).toBe(409);
    expect(current.spec.renewTime).not.toContain('2099');
    expect(current.spec.leaseTransitions).toBe(0);
  });
  it('requires compare-and-swap for renewals and prevents token identity spoofing', async () => {
    const target = stub();
    await target.operate('POST', candidate('loockit-x570'), 'loockit-x570');
    const current = await get(target);
    expect((await target.operate('PUT', candidate('loockit-x570', 'stale'), 'loockit-x570')).status).toBe(409);
    expect((await target.operate('PUT', candidate('loockit-x570', current.metadata.resourceVersion), 'loockit-b550m')).status).toBe(400);
    expect((await target.operate('PUT', current, 'loockit-x570')).status).toBe(200);
    expect((await get(target)).metadata.resourceVersion).toBe('2');
  });
  it('allows one peer after expiry and fences stale former-holder renewals', async () => {
    const target = stub();
    await target.operate('POST', candidate('loockit-x570'), 'loockit-x570');
    const current = await get(target);
    current.spec.renewTime = '2000-01-01T00:00:00Z';
    await runInDurableObject(target, (_instance, ctx) => {
      ctx.storage.sql.exec('UPDATE lease SET data=? WHERE id=1', JSON.stringify(current));
    });
    expect((await target.operate('PUT', candidate('loockit-b550m', '1'), 'loockit-b550m')).status).toBe(200);
    expect((await target.operate('PUT', candidate('loockit-x570', '1'), 'loockit-x570')).status).toBe(409);
    expect((await target.operate('PUT', candidate('loockit-x570', '2'), 'loockit-x570')).status).toBe(409);
    expect((await get(target)).spec.leaseTransitions).toBe(1);
  });
  it('keeps a durable lease across request instances', async () => {
    const target = stub();
    await target.operate('POST', candidate('loockit-x570'), 'loockit-x570');
    const same = env.LOOCKIT_LEASE.getByName(target.id.name!);
    expect(((await same.operate('GET', null, 'loockit-b550m')).body as Lease).spec.holderIdentity).toBe('loockit-x570');
  });
  it('restricts public API auth, paths, methods and oversized bodies', async () => {
    const config = { ...env, LOOCKIT_LEASE_TOKENS_JSON: JSON.stringify({ 'loockit-x570': 'x'.repeat(48), 'loockit-b550m': 'b'.repeat(48) }) };
    const send = (method: string, path: string, token = 'x'.repeat(48), body?: string) => worker.fetch(new Request(`https://test${path}`, {
      method, headers: { Authorization: `Bearer ${token}` }, body,
    }), config, {} as ExecutionContext);
    expect((await send('GET', `${LEASE_PATH}/${LEASE_NAME}`, 'wrong')).status).toBe(403);
    expect((await send('DELETE', `${LEASE_PATH}/${LEASE_NAME}`)).status).toBe(405);
    expect((await send('PUT', `${LEASE_PATH}/${LEASE_NAME}`, undefined, 'x'.repeat(5000))).status).toBe(400);
    const response = await send('GET', `${LEASE_PATH}/${LEASE_NAME}`);
    expect(response.status).toBe(404);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });
});
