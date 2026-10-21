import { DurableObject } from 'cloudflare:workers';

export const LEASE_PATH = '/apis/coordination.k8s.io/v1/namespaces/app-loockit/leases';
export const LEASE_NAME = 'loockit-ble-leader';
export interface Lease {
  apiVersion: 'coordination.k8s.io/v1'; kind: 'Lease';
  metadata: { name: string; namespace: string; resourceVersion: string };
  spec: { holderIdentity: string; leaseDurationSeconds: number; acquireTime: string; renewTime: string; leaseTransitions: number };
}

// A single BLE controller pair is one coordination atom. Only this Lease API
// is implemented; there is no dependency on, or general proxy to, Kubernetes.
export class LoockitLease extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS lease (id INTEGER PRIMARY KEY CHECK(id=1), data TEXT NOT NULL)');
  }
  async operate(method: string, candidate: Partial<Lease> | null, identity: string): Promise<{ status: number; body: object }> {
    const row = this.ctx.storage.sql.exec<{ data: string }>('SELECT data FROM lease WHERE id=1').toArray()[0];
    const current: Lease | undefined = row ? JSON.parse(row.data) : undefined;
    const error = (status: number, reason: string) => ({ status, body: { kind: 'Status', status: 'Failure', reason, code: status } });
    if (method === 'GET') return current ? { status: 200, body: current } : error(404, 'NotFound');
    if (candidate?.metadata?.name !== LEASE_NAME || candidate.spec?.holderIdentity !== identity ||
        candidate.spec?.leaseDurationSeconds !== 15) return error(400, 'Invalid');
    if (method === 'POST' && current) return error(409, 'AlreadyExists');
    if (method === 'PUT' && (!current || candidate.metadata.resourceVersion !== current.metadata.resourceVersion)) {
      return error(409, 'Conflict');
    }
    const now = Date.now();
    if (current && current.spec.holderIdentity !== identity &&
        now < Date.parse(current.spec.renewTime) + current.spec.leaseDurationSeconds * 1000) return error(409, 'Conflict');
    const changed = current?.spec.holderIdentity !== identity;
    const stamp = new Date(now).toISOString();
    const lease: Lease = {
      apiVersion: 'coordination.k8s.io/v1', kind: 'Lease',
      metadata: { name: LEASE_NAME, namespace: 'app-loockit', resourceVersion: String(Number(current?.metadata.resourceVersion ?? 0) + 1) },
      spec: { holderIdentity: identity, leaseDurationSeconds: 15, renewTime: stamp,
        acquireTime: changed ? stamp : current!.spec.acquireTime,
        leaseTransitions: (current?.spec.leaseTransitions ?? 0) + (current && changed ? 1 : 0) },
    };
    this.ctx.storage.sql.exec('INSERT INTO lease VALUES (1,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data', JSON.stringify(lease));
    return { status: method === 'POST' ? 201 : 200, body: lease };
  }
}
