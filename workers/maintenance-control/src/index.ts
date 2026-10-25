import { DurableObject } from 'cloudflare:workers';
import { timingSafeEqual } from 'node:crypto';
import { LEASE_PATH, LEASE_NAME } from './loockit-lease';
import { datePickerInteraction } from './date-picker';
export { LoockitLease } from './loockit-lease';
import { HOSTS, isHost, isPve, nextMorning, jstDate, formatJst, parseJst, due, ScheduleInputError, validateLeadTime,
  type Host, type Plan, type Snapshot, type RecordState } from './policy';

type Interaction = {
  id: string; type: number; token: string; application_id: string; guild_id?: string; channel_id?: string;
  member?: { user?: { id: string } };
  data?: { custom_id?: string; values?: string[]; components?: { components: { custom_id: string; value: string }[] }[] };
};
const reply = (content: string) => ({ type: 4, data: { content, flags: 64, allowed_mentions: { parse: [] } } });

// These three hosts share a maintenance group: its object serializes PVE execution.
export class MaintenanceFleet extends DurableObject<Env> {
  private delivering = new Set<Host>();
  private reminding = new Set<Host>();
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
  private async notifyUpcoming(host: Host): Promise<void> {
    const state = this.read(host);
    const plan = state.plan;
    const now = Date.now();
    if (!plan || plan.phase !== 'scheduled' || plan.notifiedRevision !== plan.revision ||
        now < plan.target - 5 * 60_000 || now >= plan.target || this.reminding.has(host) ||
        (plan.advanceNotice?.target === plan.target && plan.advanceNotice.sent)) return;
    if (plan.advanceNotice?.target !== plan.target) {
      plan.advanceNotice = { target: plan.target, nonce: crypto.randomUUID().replaceAll('-', '').slice(0, 25), sent: false };
      this.write(host, state);
    }
    this.reminding.add(host);
    try {
      await this.discord(`/channels/${this.env.DISCORD_CHANNEL_ID}/messages`, 'POST', {
        content: `【再起動5分前】${host}\n予定: ${formatJst(plan.target)}（日本時間）\n` +
          '再起動予定時刻が近づいています。作業を保存してください。事前確認を通った場合に再起動します。\n' +
          '予定の変更・保留は下のボタンから操作できます。',
        components: this.message(host, plan).components,
        allowed_mentions: { parse: [] }, nonce: plan.advanceNotice!.nonce, enforce_nonce: true,
      });
      // Do not overwrite a hold, changed schedule or host report received during delivery.
      const current = this.read(host);
      if (current.plan?.revision === plan.revision && current.plan.advanceNotice?.nonce === plan.advanceNotice!.nonce) {
        current.plan.advanceNotice.sent = true;
        this.write(host, current);
      }
      this.audit(host, 'five-minute-notice-sent');
    } catch { console.error(JSON.stringify({ event: 'five-minute-notice-failed', host })); }
    finally { this.reminding.delete(host); }
  }
  async remindUpcoming(): Promise<void> {
    for (const host of HOSTS) await this.notifyUpcoming(host);
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
    await this.notifyUpcoming(host);
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
            content: `${host} のメンテナンスは${state.plan.phase === 'held' ? '保留中' : '未完了'}です。\n予定: ${formatJst(state.plan.target)}（日本時間）\n` +
              `理由: ${state.plan.reason ?? (state.plan.phase === 'held' ? '操作により保留されています。' : state.plan.phase === 'approval' ? 'この日時での承認を待っています。' : '予約した処理の完了を待っています。')}\n` +
              (state.plan.phase === 'held' ? '再実行するには原因を確認した上で日時を指定し、改めて承認してください。\n' : '') +
              `https://discord.com/channels/${this.env.DISCORD_GUILD_ID}/${this.env.DISCORD_CHANNEL_ID}/${state.plan.messageId}`,
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
  async result(host: Host, executionId: string, outcome: string, reason?: string, detail?: string): Promise<void> {
    const eventId = `result:${host}:${executionId}`;
    if (this.ctx.storage.sql.exec('SELECT id FROM events WHERE id=?', eventId).toArray().length) return;
    const state = this.read(host);
    if (state.plan?.phase !== 'running' || state.plan.executionId !== executionId) throw new Error('Execution mismatch');
    if (outcome === 'complete') state.plan = undefined;
    else {
      state.plan.phase = outcome === 'blocked' ? 'held' : 'failed';
      const safeDetail = typeof detail === 'string' ? detail.replace(/[\x00-\x1f\x7f]/g, ' ').slice(0, 600).trim() : '';
      state.plan.reason = outcome === 'blocked' ?
        (safeDetail || (reason === 'availability' ? 'Loockitの相手側への切替、または再起動対象外のCloudflare Tunnelの正常性を確認できませんでした。ホストのjournalを確認してください。' :
          '事前確認で停止しました。ホストのjournalを確認してください。')) :
        '処理に失敗しました。他のPVEも停止しています。手動確認が必要です。';
      if (outcome === 'blocked') state.plan.reason += '\nOS再起動は行っていません。原因を確認後、日時指定と承認をやり直してください。';
      state.plan.revision = crypto.randomUUID();
      state.plan.notifiedRevision = undefined;
    }
    this.write(host, state);
    if (outcome === 'blocked') {
      this.ctx.storage.sql.exec('INSERT INTO notifications VALUES (?,?,?,?)',
        crypto.randomUUID().replaceAll('-', '').slice(0, 25), host, null,
        `【再起動保留】${host}\n予定: ${formatJst(state.plan!.target)}（日本時間）\n理由: ${state.plan!.reason}` +
        (state.plan!.messageId ? `\nhttps://discord.com/channels/${this.env.DISCORD_GUILD_ID}/${this.env.DISCORD_CHANNEL_ID}/${state.plan!.messageId}` : ''));
    }
    this.ctx.storage.sql.exec('INSERT INTO events VALUES (?,?)', eventId, Date.now());
    this.audit(host, outcome);
    await this.deliverCompletions(host);
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
  async canPickDate(customId: string): Promise<boolean> {
    const [host, revision] = customId.split(':');
    const plan = isHost(host) ? this.read(host).plan : undefined;
    return !!plan && plan.revision === revision && !['running', 'failed'].includes(plan.phase);
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
    catch (error) {
      const [host] = (input.data?.custom_id ?? '').split(':');
      const plan = isHost(host) ? this.read(host).plan : undefined;
      const content = error instanceof ScheduleInputError ? error.message :
        '通知の更新に失敗しました。この予定は実行されません。';
      // Old reminders and ephemeral replies retain their original revision.
      // Show the current target before asking for another explicit action;
      // never apply an old approval to a changed schedule automatically.
      if (isHost(host) && plan && !['running', 'failed'].includes(plan.phase)) {
        const current = this.message(host, plan);
        return { ok: false, content: `${content}\n\n最新の予定を表示します。下のボタンから操作してください。\n${current.content}`,
          components: current.components };
      }
      return { ok: false, content, components: [] };
    }
  }
  private async applyInteraction(input: Interaction): Promise<string> {
    const now = Date.now();
    const [name, revision, action] = (input.data?.custom_id ?? '').split(':');
    if (!isHost(name)) throw new ScheduleInputError('不明なホストです。');
    const state = this.read(name);
    const plan = state.plan;
    if (!plan) throw new ScheduleInputError('現在、操作できる再起動予定はありません。');
    if (plan.revision !== revision) throw new ScheduleInputError('この通知は古くなっています。操作は適用していません。');
    if (['running', 'failed'].includes(plan.phase)) throw new ScheduleInputError('実行中または要確認のため変更できません。');
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
      validateLeadTime(plan.target, now);
      plan.phase = 'scheduled';
    } else throw new ScheduleInputError('不明な操作です。');
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
    const { pathname: path, hostname } = new URL(request.url);
    // Access protects the machine hostnames. Never expose their APIs through
    // the public Discord hostname or another alias of this Worker.
    const permitted = (hostname === 'maintenance-discord.miutaku.work' && path === '/discord/interactions') ||
      (hostname === 'maintenance.miutaku.work' && path.startsWith('/agent/')) ||
      (hostname === 'loockit-lease.miutaku.work' && (path === LEASE_PATH || path === `${LEASE_PATH}/${LEASE_NAME}`));
    if (!permitted) return new Response('Not found', { status: 404 });
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
      if (path === '/agent/auth-check') return Response.json({ ok: true, host });
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
          await fleet.result(host, data.executionId, data.outcome, data.reason === 'availability' ? 'availability' : undefined,
            typeof data.detail === 'string' ? data.detail : undefined);
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
    if (input.type === 3 && /^(date|pick-)/.test(input.data?.custom_id?.split(':')[2] ?? '') &&
        await fleet.canPickDate(input.data!.custom_id!)) {
      try {
        const selection = datePickerInteraction(input.data!.custom_id!, input.data?.values);
        if ('type' in selection) return Response.json(selection);
        input = { ...input, data: { custom_id: selection.customId,
          components: [{ components: [{ custom_id: 'target', value: selection.target }] }] } };
      } catch (error) {
        return Response.json(reply(error instanceof ScheduleInputError ? error.message : '日時の選択を開き直してください。'));
      }
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
  async scheduled(event, env): Promise<void> {
    const fleet = env.FLEET.getByName('home-pve');
    if (event.cron === '0 10 * * *') await fleet.tick();
    await fleet.remindUpcoming();
  },
} satisfies ExportedHandler<Env>;
