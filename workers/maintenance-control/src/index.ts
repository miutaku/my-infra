import { DurableObject } from 'cloudflare:workers';
import { timingSafeEqual } from 'node:crypto';
import { LEASE_PATH, LEASE_NAME } from './loockit-lease';
export { LoockitLease } from './loockit-lease';
import { HOSTS, isHost, isPve, nextMorning, jstDate, formatJst, parseJst, due,
  type Host, type Plan, type Snapshot, type RecordState } from './policy';

type Interaction = {
  id: string; type: number; token: string; application_id: string; guild_id?: string; channel_id?: string;
  member?: { user?: { id: string } };
  data?: { custom_id?: string; components?: { components: { custom_id: string; value: string }[] }[] };
};
const reply = (content: string) => ({ type: 4, data: { content, flags: 64, allowed_mentions: { parse: [] } } });

// These three hosts share a maintenance group: its object serializes PVE execution.
export class MaintenanceFleet extends DurableObject<Env> {
  private delivering = new Set<Host>();
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS hosts (host TEXT PRIMARY KEY, data TEXT NOT NULL)');
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS notifications (id TEXT PRIMARY KEY, host TEXT NOT NULL, message TEXT, content TEXT NOT NULL)');
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, created INTEGER NOT NULL)');
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS package_update (id INTEGER PRIMARY KEY CHECK(id=1), host TEXT NOT NULL, execution TEXT NOT NULL, failed INTEGER NOT NULL DEFAULT 0)');
  }
  private read(host: Host): RecordState {
    const row = this.ctx.storage.sql.exec<{ data: string }>('SELECT data FROM hosts WHERE host=?', host).toArray()[0];
    return row ? JSON.parse(row.data) : {};
  }
  private write(host: Host, state: RecordState): void {
    this.ctx.storage.sql.exec('INSERT INTO hosts VALUES (?,?) ON CONFLICT(host) DO UPDATE SET data=excluded.data', host, JSON.stringify(state));
  }
  private audit(host: Host, action: string, actor?: string): void {
    console.log(JSON.stringify({ event: 'maintenance', host, action, actor }));
  }
  private async discord(path: string, method: string, payload: object): Promise<{ id: string }> {
    const response = await fetch(`https://discord.com/api/v10${path}`, {
      method, headers: { Authorization: `Bot ${this.env.DISCORD_BOT_TOKEN}`, 'Content-Type': 'application/json',
        'User-Agent': 'DiscordBot (https://github.com/miutaku/my-infra, 1.0)' },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Discord request failed (${response.status})`);
    return response.json();
  }
  private message(host: Host, plan: Plan) {
    const labels = { scheduled: '実行予定', approval: '承認待ち', held: '保留', running: '実行中', failed: '失敗・要確認' };
    const running = plan.phase === 'running' || plan.phase === 'failed';
    const button = (action: string, label: string, style = 2) => ({
      type: 2, custom_id: `${host}:${plan.revision}:${action}`, label, style, disabled: running,
    });
    return {
      content: `【${labels[plan.phase]}】${host}\n${formatJst(plan.target)}（日本時間）\n` +
        (isPve(host) ? 'パッケージは自動更新します。OS再起動は指定日時での承認と事前確認が必要です。' : 'パッケージ更新に伴う再起動です。作業を保存してください。') +
        (plan.reason ? `\n${plan.reason}` : ''),
      allowed_mentions: { parse: [] },
      components: [{ type: 1, components: [
        button('defer', '翌日に延期'), button('date', '日時を指定'), button('hold', '保留'),
        ...(isPve(host) ? [button('approve', 'この日時で承認', 3)] : []),
      ] }],
    };
  }
  private async publish(host: Host): Promise<void> {
    const state = this.read(host);
    const plan = state.plan;
    if (!plan) return;
    const message = await this.discord(`/channels/${this.env.DISCORD_CHANNEL_ID}/messages${plan.messageId ? `/${plan.messageId}` : ''}`,
      plan.messageId ? 'PATCH' : 'POST', this.message(host, plan));
    // A concurrent button/report may invalidate this notification while Discord is responding.
    const current = this.read(host);
    if (current.plan?.revision !== plan.revision) return;
    current.plan.messageId = message.id;
    current.plan.notifiedRevision = plan.revision;
    current.plan.lastReminder = jstDate(Date.now());
    this.write(host, current);
  }
  private queueCompletion(host: Host, plan: Plan, recoveredAt: number): void {
    const content = `【再起動完了】${host}\n正常復帰確認: ${formatJst(recoveredAt)}（日本時間）\n` +
      (isPve(host) ? '起動IDの変更、両PVEノードのonline・quorum・管理サービス・dpkgの健全性を確認しました。' :
        '起動IDの変更とパッケージ管理の健全性を確認しました。') +
      '\nVM・アプリケーション個別の正常性は、この確認には含みません。';
    // Persist delivery separately from the plan so a Discord failure cannot lose it.
    const id = crypto.randomUUID().replaceAll('-', '').slice(0, 25);
    this.ctx.storage.sql.exec('INSERT INTO notifications VALUES (?,?,?,?)', id, host, null, content);
    if (plan.messageId) this.ctx.storage.sql.exec('INSERT INTO notifications VALUES (?,?,?,?)',
      `${id}-edit`, host, plan.messageId, content);
  }
  private async deliverCompletions(host: Host): Promise<void> {
    if (this.delivering.has(host)) return;
    this.delivering.add(host);
    try {
      const pending = this.ctx.storage.sql.exec<{ id: string; message: string | null; content: string }>(
        'SELECT id,message,content FROM notifications WHERE host=? ORDER BY rowid', host).toArray();
      for (const item of pending) {
        try {
          await this.discord(`/channels/${this.env.DISCORD_CHANNEL_ID}/messages${item.message ? `/${item.message}` : ''}`,
            item.message ? 'PATCH' : 'POST', {
              content: item.content, allowed_mentions: { parse: [] },
              ...(item.message ? { components: [] } : { nonce: item.id, enforce_nonce: true }),
            });
          this.ctx.storage.sql.exec('DELETE FROM notifications WHERE id=?', item.id);
        } catch { console.error(JSON.stringify({ event: 'completion-notification-failed', host })); }
      }
    } finally { this.delivering.delete(host); }
  }
  async report(host: Host, snapshot: Snapshot): Promise<void> {
    const state = this.read(host);
    snapshot.observedAt = Date.now();
    state.snapshot = snapshot;
    const plan = state.plan;
    const recovered = plan?.phase === 'running' && plan.bootId !== snapshot.bootId && snapshot.healthy;
    if (recovered) {
      this.queueCompletion(host, plan!, snapshot.observedAt);
      state.plan = undefined;
      this.audit(host, 'reboot-recovered');
    } else if (plan && plan.phase !== 'running' && plan.phase !== 'failed') {
      if (plan.bootId !== snapshot.bootId || !snapshot.required) {
        state.plan = undefined;
        this.audit(host, 'obsolete-plan-cleared');
      }
    }
    this.write(host, state);
    await this.deliverCompletions(host);
    if (plan && !state.plan && !recovered && plan.messageId) {
      try {
        await this.discord(`/channels/${this.env.DISCORD_CHANNEL_ID}/messages/${plan.messageId}`, 'PATCH', {
          content: `【予定解除】${host}\n起動セッションの変更、または再起動不要を確認しました。予約した再起動の正常完了を示す通知ではありません。`,
          components: [], allowed_mentions: { parse: [] },
        });
      } catch { console.error(JSON.stringify({ event: 'completion-notification-failed', host })); }
    }
  }
  async tick(): Promise<void> {
    const now = Date.now();
    for (const host of HOSTS) {
      await this.deliverCompletions(host);
      const state = this.read(host);
      const snapshot = state.snapshot;
      if (!state.plan && snapshot && now - snapshot.observedAt <= 10 * 60_000 &&
          snapshot.required) {
        state.plan = {
          revision: crypto.randomUUID(), target: nextMorning(now),
          phase: isPve(host) ? 'approval' : 'scheduled', bootId: snapshot.bootId,
          fingerprint: snapshot.fingerprint,
        };
        this.write(host, state);
      }
      if (!state.plan || ['running', 'failed'].includes(state.plan.phase)) continue;
      if (state.plan.phase === 'scheduled' && now >= state.plan.target + 5 * 60_000) {
        state.plan.phase = isPve(host) ? 'approval' : 'scheduled';
        state.plan.target = nextMorning(now);
        state.plan.revision = crypto.randomUUID();
        state.plan.notifiedRevision = undefined;
        state.plan.reason = '実行枠を過ぎたため、次の候補日時へ持ち越しました。';
        this.write(host, state);
      }
      try {
        // Edit the prior message, and send a fresh reminder once daily for visibility.
        if (state.plan.messageId && state.plan.lastReminder !== jstDate(now)) {
          await this.discord(`/channels/${this.env.DISCORD_CHANNEL_ID}/messages`, 'POST', {
            content: `${host} のメンテナンスは${state.plan.phase === 'held' ? '保留中' : '未完了'}です。\nhttps://discord.com/channels/${this.env.DISCORD_GUILD_ID}/${this.env.DISCORD_CHANNEL_ID}/${state.plan.messageId}`,
            allowed_mentions: { parse: [] },
          });
        }
        await this.publish(host);
      } catch { console.error(JSON.stringify({ event: 'notification-failed', host })); }
    }
  }
  async claim(host: Host): Promise<{ executionId: string; target: number; fingerprint: string } | null> {
    const state = this.read(host);
    if (!due(host, state, Date.now())) return null;
    if (isPve(host) && this.ctx.storage.sql.exec('SELECT id FROM package_update').toArray().length) return null;
    if (isPve(host) && HOSTS.some(other => isPve(other) && other !== host &&
      ['running', 'failed'].includes(this.read(other).plan?.phase ?? ''))) return null;
    const plan = state.plan!;
    plan.phase = 'running';
    plan.executionId = crypto.randomUUID();
    this.write(host, state);
    this.audit(host, 'execution-claimed');
    return { executionId: plan.executionId, target: plan.target, fingerprint: plan.fingerprint };
  }
  async claimUpdate(host: Host): Promise<{ executionId: string } | null> {
    const snapshot = this.read(host).snapshot;
    if (!isPve(host) || !snapshot?.healthy || Date.now() - snapshot.observedAt > 120_000 ||
        this.ctx.storage.sql.exec('SELECT id FROM package_update').toArray().length ||
        HOSTS.some(other => isPve(other) && ['running', 'failed'].includes(this.read(other).plan?.phase ?? ''))) return null;
    const executionId = crypto.randomUUID();
    this.ctx.storage.sql.exec('INSERT INTO package_update (id,host,execution) VALUES (1,?,?)', host, executionId);
    this.audit(host, 'automatic-update-claimed');
    return { executionId };
  }
  async updateResult(host: Host, executionId: string, outcome: string): Promise<void> {
    const eventId = `update:${host}:${executionId}`;
    if (this.ctx.storage.sql.exec('SELECT id FROM events WHERE id=?', eventId).toArray().length) return;
    const lock = this.ctx.storage.sql.exec<{ host: string; execution: string }>('SELECT host,execution FROM package_update').toArray()[0];
    if (lock?.host !== host || lock.execution !== executionId) throw new Error('Update execution mismatch');
    if (outcome === 'failed') this.ctx.storage.sql.exec('UPDATE package_update SET failed=1 WHERE id=1');
    else this.ctx.storage.sql.exec('DELETE FROM package_update WHERE id=1');
    this.ctx.storage.sql.exec('INSERT INTO events VALUES (?,?)', eventId, Date.now());
    this.audit(host, `automatic-update-${outcome}`);
    if (outcome !== 'complete') await this.discord(`/channels/${this.env.DISCORD_CHANNEL_ID}/messages`, 'POST', {
      content: `【PVEパッケージ更新${outcome === 'blocked' ? '見送り' : '失敗'}】${host}\nホストのjournalを確認してください。OS再起動は行っていません。` +
        (outcome === 'failed' ? '\n他のPVE処理も手動確認まで停止します。' : ''), allowed_mentions: { parse: [] },
    });
  }
  async result(host: Host, executionId: string, outcome: string, reason?: string): Promise<void> {
    const eventId = `result:${host}:${executionId}`;
    if (this.ctx.storage.sql.exec('SELECT id FROM events WHERE id=?', eventId).toArray().length) return;
    const state = this.read(host);
    if (state.plan?.phase !== 'running' || state.plan.executionId !== executionId) throw new Error('Execution mismatch');
    if (outcome === 'complete') state.plan = undefined;
    else {
      state.plan.phase = outcome === 'blocked' ? 'held' : 'failed';
      state.plan.reason = outcome === 'blocked' ?
        (reason === 'availability' ? 'Kubernetes・共有ストレージの退避、またはLoockit待機系の正常性を確認できないため、再起動を保留しました。ホストのjournalを確認してください。' :
          '事前確認で停止しました。ホストのjournalを確認してください。') :
        '処理に失敗しました。他のPVEも停止しています。手動確認が必要です。';
      state.plan.revision = crypto.randomUUID();
      state.plan.notifiedRevision = undefined;
    }
    this.write(host, state);
    this.ctx.storage.sql.exec('INSERT INTO events VALUES (?,?)', eventId, Date.now());
    this.audit(host, outcome);
    if (state.plan) await this.publish(host);
    else await this.discord(`/channels/${this.env.DISCORD_CHANNEL_ID}/messages`, 'POST', {
      content: `【完了】${host} のメンテナンスが完了しました。`, allowed_mentions: { parse: [] },
    });
  }
  async recover(host: Host): Promise<void> {
    const state = this.read(host);
    if (!state.snapshot?.healthy || Date.now() - state.snapshot.observedAt > 120_000) throw new Error('Fresh healthy report required');
    this.ctx.storage.sql.exec('DELETE FROM package_update WHERE host=?', host);
    if (!state.plan) { this.audit(host, 'manual-update-recovery'); return; }
    state.plan.phase = 'held';
    state.plan.revision = crypto.randomUUID();
    state.plan.notifiedRevision = undefined;
    state.plan.reason = 'ホスト上で手動確認後に解除しました。次の実行には日時指定が必要です。';
    this.write(host, state);
    this.audit(host, 'manual-recovery');
    await this.publish(host);
  }
  async interaction(input: Interaction) {
    try {
      const content = await this.applyInteraction(input);
      const [host] = (input.data?.custom_id ?? '').split(':');
      const plan = isHost(host) ? this.read(host).plan : undefined;
      return { ok: true, content, components: isHost(host) && plan &&
        plan.notifiedRevision === plan.revision && !['running', 'failed'].includes(plan.phase)
        ? this.message(host, plan).components : [] };
    }
    catch { return { ok: false, content: '操作を完了できませんでした。古い通知・実行中・日時の入力を確認してください。通知更新に失敗した予定は実行されません。', components: [] }; }
  }
  private async applyInteraction(input: Interaction): Promise<string> {
    const now = Date.now();
    const [name, revision, action] = (input.data?.custom_id ?? '').split(':');
    if (!isHost(name)) throw new Error('不明なホストです。');
    const state = this.read(name);
    const plan = state.plan;
    if (!plan || plan.revision !== revision) throw new Error('この通知は古くなっています。最新の通知を使ってください。');
    if (['running', 'failed'].includes(plan.phase)) throw new Error('実行中または要確認のため変更できません。');
    if (this.ctx.storage.sql.exec('SELECT id FROM events WHERE id=?', input.id).toArray().length) return '処理済みです。';
    if (action === 'hold') plan.phase = 'held';
    else if (action === 'defer') {
      plan.target = Math.max(plan.target, nextMorning(now) - 86400_000) + 86400_000;
      plan.phase = isPve(name) ? 'approval' : 'scheduled';
    } else if (action === 'date-submit') {
      const text = input.data?.components?.flatMap(row => row.components).find(item => item.custom_id === 'target')?.value ?? '';
      plan.target = parseJst(text, now);
      plan.phase = isPve(name) ? 'approval' : 'scheduled';
    } else if (action === 'approve' && isPve(name)) {
      if (plan.target < now + 10 * 60_000) throw new Error('10分以上先の日時を指定してから承認してください。');
      plan.phase = 'scheduled';
    } else throw new Error('不明な操作です。');
    plan.revision = crypto.randomUUID();
    plan.notifiedRevision = undefined;
    plan.reason = undefined;
    this.ctx.storage.sql.exec('DELETE FROM events WHERE created < ?', now - 86400_000);
    this.ctx.storage.sql.exec('INSERT INTO events VALUES (?,?)', input.id, now);
    this.write(name, state);
    this.audit(name, action, input.member?.user?.id);
    await this.publish(name);
    if (action === 'approve') return `${name}: ${formatJst(plan.target)}（日本時間）のOS再起動を承認しました。事前確認を通った場合に実行します。`;
    return `${name}: ${plan.phase === 'held' ? '保留しました' : `${formatJst(plan.target)}（日本時間）へ変更しました`}。` +
      (plan.phase === 'approval' ? '\nまだ承認されていません。下の「この日時で承認」を押してください。' : '');
  }
}

async function boundedText(request: Request, limit = 16384): Promise<string> {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > limit) { await reader.cancel(); throw new Error('Body too large'); }
    chunks.push(value);
  }
  const joined = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { joined.set(chunk, offset); offset += chunk.length; }
  return new TextDecoder().decode(joined);
}
async function validSignature(request: Request, body: string, publicKey: string): Promise<boolean> {
  const timestamp = request.headers.get('X-Signature-Timestamp') ?? '';
  const signature = request.headers.get('X-Signature-Ed25519') ?? '';
  if (!/^\d+$/.test(timestamp) || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300 ||
    !/^[\da-f]{128}$/i.test(signature) || !/^[\da-f]{64}$/i.test(publicKey)) return false;
  const bytes = (hex: string) => Uint8Array.from(hex.match(/../g) ?? [], byte => parseInt(byte, 16));
  const key = await crypto.subtle.importKey('raw', bytes(publicKey), 'Ed25519', false, ['verify']);
  return crypto.subtle.verify('Ed25519', key, bytes(signature), new TextEncoder().encode(timestamp + body));
}
async function authorized(request: Request, expected: string): Promise<boolean> {
  const actual = request.headers.get('Authorization') ?? '';
  const digest = (text: string) => crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return timingSafeEqual(new Uint8Array(await digest(actual)), new Uint8Array(await digest(`Bearer ${expected}`)));
}
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const path = new URL(request.url).pathname;
    if (path === LEASE_PATH || path === `${LEASE_PATH}/${LEASE_NAME}`) {
      const secret = (env as Env & { LOOCKIT_LEASE_TOKENS_JSON?: string }).LOOCKIT_LEASE_TOKENS_JSON;
      if (!secret) return new Response('Unavailable', { status: 503 });
      const tokens: Record<string, string> = JSON.parse(secret);
      let identity: string | undefined;
      for (const name of ['loockit-x570', 'loockit-b550m']) {
        if (tokens[name]?.length >= 32 && await authorized(request, tokens[name])) identity = name;
      }
      if (!identity) return new Response('Forbidden', { status: 403 });
      if (!(request.method === 'GET' && path.endsWith(`/${LEASE_NAME}`)) &&
          !(request.method === 'POST' && path === LEASE_PATH) &&
          !(request.method === 'PUT' && path.endsWith(`/${LEASE_NAME}`))) return new Response('Not allowed', { status: 405 });
      try {
        const data = request.method === 'GET' ? null : JSON.parse(await boundedText(request, 4096));
        const result = await env.LOOCKIT_LEASE.getByName('loockit-ble-leader').operate(request.method, data, identity);
        return Response.json(result.body, { status: result.status, headers: { 'Cache-Control': 'no-store' } });
      } catch { return new Response('Invalid request', { status: 400 }); }
    }
    if (request.method !== 'POST') return new Response('Not found', { status: 404 });
    const fleet = env.FLEET.getByName('home-pve');
    if (path.startsWith('/agent/')) {
      const host = request.headers.get('X-Maintenance-Host') ?? '';
      const tokens: Record<string, string> = JSON.parse(env.AGENT_TOKENS_JSON);
      if (!isHost(host) || !tokens[host] || !await authorized(request, tokens[host])) return new Response('Forbidden', { status: 403 });
      try {
        const data = JSON.parse(await boundedText(request));
        if (path === '/agent/report') {
          if (typeof data.bootId !== 'string' || !/^[\da-f-]{36}$/.test(data.bootId) ||
            typeof data.required !== 'boolean' || typeof data.healthy !== 'boolean' ||
            !Number.isInteger(data.updates) || data.updates < 0 || !/^[\da-f]{64}$/.test(data.fingerprint)) throw new Error('Invalid report');
          await fleet.report(host, data);
          return Response.json({ ok: true });
        }
        if (path === '/agent/claim') return Response.json(await fleet.claim(host));
        if (path === '/agent/update-claim') return Response.json(await fleet.claimUpdate(host));
        if (path === '/agent/update-result' && ['blocked', 'failed', 'complete'].includes(data.outcome)) {
          await fleet.updateResult(host, data.executionId, data.outcome);
          return Response.json({ ok: true });
        }
        if (path === '/agent/recover') {
          await fleet.recover(host);
          return Response.json({ ok: true });
        }
        if (path === '/agent/result' && ['blocked', 'failed', 'complete'].includes(data.outcome)) {
          await fleet.result(host, data.executionId, data.outcome, data.reason === 'availability' ? 'availability' : undefined);
          return Response.json({ ok: true });
        }
      } catch { return new Response('Request failed', { status: 400 }); }
      return new Response('Not found', { status: 404 });
    }
    if (path !== '/discord/interactions') return new Response('Not found', { status: 404 });
    let body: string;
    try { body = await boundedText(request); } catch { return new Response('Too large', { status: 413 }); }
    if (!await validSignature(request, body, env.DISCORD_PUBLIC_KEY)) return new Response('Invalid signature', { status: 401 });
    let input: Interaction;
    try { input = JSON.parse(body); } catch { return new Response('Invalid JSON', { status: 400 }); }
    if (input.type === 1) return Response.json({ type: 1 });
    if (!env.DISCORD_OPERATOR_IDS.split(',').map(id => id.trim()).includes(input.member?.user?.id ?? '') ||
      input.guild_id !== env.DISCORD_GUILD_ID || input.channel_id !== env.DISCORD_CHANNEL_ID) return Response.json(reply('この操作を実行する権限がありません。'));
    if (input.type === 3 && input.data?.custom_id === 'maintenance-test') return Response.json(reply('操作を受信しました。認証・署名検証は正常です。再起動予定は変更していません。'));
    if (input.type === 3 && input.data?.custom_id?.endsWith(':date')) {
      const id = input.data.custom_id.replace(/:date$/, ':date-submit');
      return Response.json({ type: 9, data: {
        custom_id: id, title: '実行日時を指定（日本時間）', components: [{ type: 1, components: [{
          type: 4, custom_id: 'target', label: 'YYYY-MM-DD HH:mm', style: 1, required: true, min_length: 16, max_length: 16,
        }] }],
      } });
    }
    if (![3, 5].includes(input.type)) return Response.json(reply('未対応の操作です。'));
    ctx.waitUntil((async () => {
      let result: { content: string; components: unknown[] };
      try { result = await fleet.interaction(input); }
      catch { result = { content: '操作を完了できませんでした。古い通知・実行中・日時の入力を確認してください。通知更新に失敗した予定は実行されません。', components: [] }; }
      const response = await fetch(`https://discord.com/api/v10/webhooks/${input.application_id}/${input.token}/messages/@original`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json', 'User-Agent': 'DiscordBot (https://github.com/miutaku/my-infra, 1.0)' }, body: JSON.stringify({ content: result.content, components: result.components, allowed_mentions: { parse: [] } }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) console.error(JSON.stringify({ event: 'interaction-response-failed', status: response.status }));
    })());
    return Response.json({ type: 5, data: { flags: 64 } });
  },
  async scheduled(_event, env): Promise<void> { await env.FLEET.getByName('home-pve').tick(); },
} satisfies ExportedHandler<Env>;
