import { describe, expect, it } from 'vitest';
import { datePickerInteraction } from '../src/date-picker';
import { formatJst, parseJst, ScheduleInputError } from '../src/policy';

const now = Date.parse('2026-10-22T17:08:12+09:00');
const root = 'pve-x570:revision:date';
function view(id = root, values: string[] = [], time = now) {
  const result = datePickerInteraction(id, values, time);
  if (!result.data) throw new Error('Expected picker view');
  return { type: result.type, data: result.data };
}

describe('date selection without text input', () => {
  it('opens privately with a valid default and fits Discord component limits', () => {
    const result = view();
    expect(result.type).toBe(4);
    expect(result.data.flags).toBe(64);
    expect(result.data.content).toContain('2026-10-22 20:00');
    expect(result.data.components).toHaveLength(4);
    for (const row of result.data.components) for (const component of row.components) {
      expect(component.custom_id.length).toBeLessThanOrEqual(100);
      if ('options' in component) expect(component.options.length).toBeLessThanOrEqual(25);
    }
  });
  it('retains day, hour and minute selections until confirmation', () => {
    let result = view();
    result = view(result.data.components[0].components[0].custom_id, ['2026-10-23']);
    result = view(result.data.components[1].components[0].custom_id, ['21']);
    result = view(result.data.components[2].components[0].custom_id, ['35']);
    expect(result.type).toBe(7);
    expect(result.data.content).toContain('2026-10-23 21:35');
    expect(datePickerInteraction(result.data.components[3].components[2].custom_id, [], now)).toEqual({
      customId: 'pve-x570:revision:date-submit', target: '2026-10-23 21:35',
    });
  });
  it('pages through the entire 90-day date range without losing the draft', () => {
    let result = view();
    const days: string[] = [];
    for (let page = 0; page < 4; page++) {
      const menu = result.data.components[0].components[0];
      if (!('options' in menu)) throw new Error('Expected date menu');
      days.push(...menu.options.map(option => option.value));
      expect(result.data.content).toContain('2026-10-22 20:00');
      result = view(result.data.components[3].components[1].custom_id);
    }
    expect(days).toHaveLength(91);
    expect(new Set(days).size).toBe(91);
    expect(days[0]).toBe('2026-10-22');
    expect(days.at(-1)).toBe('2027-01-20');
    result = view(result.data.components[3].components[0].custom_id);
    expect(result.data.components[0].components[0]).toMatchObject({ placeholder: '日付を選択（3/4ページ）' });
  });
  it('explains too-soon times, disables confirmation, and rechecks after time passes', () => {
    const evening = Date.parse('2026-10-22T20:08:12+09:00');
    let result = view(root, [], evening);
    result = view(result.data.components[2].components[0].custom_id, ['10'], evening);
    expect(result.data.content).toContain('2026-10-22 20:19 以降');
    expect(result.data.components[3].components[2]).toMatchObject({ disabled: true });
    expect(() => datePickerInteraction(result.data.components[3].components[2].custom_id, [], evening)).toThrow(ScheduleInputError);
    result = view(root, [], evening);
    expect(() => datePickerInteraction(result.data.components[3].components[2].custom_id, [], evening + 10 * 60_000)).toThrow('10分以上先');
  });
  it('handles midnight and year changes and rejects manipulated selections', () => {
    expect(view(root, [], Date.parse('2026-12-31T23:55:00+09:00')).data.content).toContain('2027-01-01 20:00');
    for (const suffix of ['pick-day:NaN:0', 'pick-next:0:99', 'pick-hour:0:-1']) {
      expect(() => view(`pve-x570:revision:${suffix}`)).toThrow(ScheduleInputError);
    }
    const result = view();
    expect(() => view(result.data.components[1].components[0].custom_id, ['24'])).toThrow(ScheduleInputError);
  });
});

describe('schedule validation details', () => {
  it('accepts exactly ten minutes and explains the next available minute after the boundary', () => {
    const boundary = Date.parse('2026-10-22T17:00:00+09:00');
    expect(formatJst(parseJst('2026-10-22 17:10', boundary))).toBe('2026-10-22 17:10');
    expect(() => parseJst('2026-10-22 17:10', boundary + 1)).toThrow('2026-10-22 17:11 以降');
    expect(() => parseJst('2026-10-22 17:10', now)).toThrow('2026-10-22 17:19 以降');
    expect(() => parseJst('2027-02-01 05:00', now)).toThrow('90日以内');
  });
});
