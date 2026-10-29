import { formatJst, isHost, jstDate, parseJst, ScheduleInputError } from './policy';

// Draft selections live in the component IDs; only confirmation changes the plan.
export function datePickerInteraction(id: string, values: string[] = [], now = Date.now()) {
  const [host, revision, action, encodedTarget, encodedPage] = id.split(':');
  if (!isHost(host) || !revision) throw new ScheduleInputError('不明な予定です。最新の通知を使ってください。');
  let target = action === 'date' ? Math.ceil((now + 15 * 60_000) / 300_000) * 300_000 : Number(encodedTarget);
  let page = action === 'date' ? 0 : Number(encodedPage);
  if (!Number.isSafeInteger(target) || Math.abs(target) > 8.64e15 || !Number.isInteger(page) || page < 0 || page > 3) {
    throw new ScheduleInputError('日時の選択を開き直してください。');
  }
  const selected = values[0];
  let text = formatJst(target);
  if (action === 'pick-day') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(selected ?? '')) throw new ScheduleInputError('日付を選択してください。');
    text = `${selected} ${text.slice(11)}`;
  } else if (action === 'pick-hour') {
    if (!/^(0\d|1\d|2[0-3])$/.test(selected ?? '')) throw new ScheduleInputError('時を選択してください。');
    text = `${text.slice(0, 11)}${selected}${text.slice(13)}`;
  } else if (action === 'pick-minute') {
    if (!/^[0-5][05]$/.test(selected ?? '')) throw new ScheduleInputError('分を選択してください。');
    text = `${text.slice(0, 14)}${selected}`;
  } else if (action === 'pick-prev') page = Math.max(0, page - 1);
  else if (action === 'pick-next') page = Math.min(3, page + 1);
  else if (action === 'pick-submit') {
    parseJst(text, now);
    return { customId: `${host}:${revision}:date-submit`, target: text };
  } else if (action !== 'date') throw new ScheduleInputError('不明な操作です。');
  target = Date.parse(text.replace(' ', 'T') + ':00+09:00');
  if (!Number.isFinite(target) || formatJst(target) !== text) throw new ScheduleInputError('存在する日付・時刻を選択してください。');
  const componentId = (part: string) => `${host}:${revision}:pick-${part}:${target}:${page}`;
  const option = (label: string, value: string, current: string) => ({ label, value, default: value === current });
  const select = (part: string, placeholder: string, options: ReturnType<typeof option>[]) => ({
    type: 1, components: [{ type: 3, custom_id: componentId(part), placeholder, min_values: 1, max_values: 1, options }],
  });
  const today = Date.parse(`${jstDate(now)}T00:00:00+09:00`);
  const days = Array.from({ length: Math.min(25, 91 - page * 25) }, (_, index) => {
    const day = jstDate(today + (page * 25 + index) * 86400_000);
    const weekday = new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', weekday: 'short' }).format(new Date(`${day}T00:00:00+09:00`));
    return option(`${day}（${weekday}）`, day, text.slice(0, 10));
  });
  let error = '';
  try { parseJst(text, now); } catch (cause) {
    if (!(cause instanceof ScheduleInputError)) throw cause;
    error = cause.message;
  }
  const button = (part: string, label: string, style: number, disabled = false) => ({
    type: 2, custom_id: componentId(part), label, style, disabled,
  });
  return { type: action === 'date' ? 4 : 7, data: {
    ...(action === 'date' ? { flags: 64 } : {}),
    content: `${host}: 再起動日時を選択（日本時間）\n選択中: ${text}\n日付・時・分を選び「この日時に設定」を押してください。分は5分刻みです。\n` +
      (error || '10分以上先・90日以内、他ホストの予定から1時間以上空けてください。PVEは設定後に承認が必要です。'),
    allowed_mentions: { parse: [] },
    components: [
      select('day', `日付を選択（${page + 1}/4ページ）`, days),
      select('hour', '時を選択', Array.from({ length: 24 }, (_, hour) => option(`${hour}時`, String(hour).padStart(2, '0'), text.slice(11, 13)))),
      select('minute', '分を選択（5分刻み）', Array.from({ length: 12 }, (_, index) => option(`${index * 5}分`, String(index * 5).padStart(2, '0'), text.slice(14)))),
      { type: 1, components: [button('prev', '前の日付', 2, page === 0), button('next', '先の日付', 2, page === 3), button('submit', 'この日時に設定', 1, !!error)] },
    ],
  } };
}
