import { describe, it, expect } from 'vitest';
import { formatDate } from '@/utils/dataMapper';

describe('formatDate catch path', () => {
  it('retorna input se Date lançar erro', () => {
    const originalDate = global.Date;
    class FakeDate extends originalDate { constructor(v){ if(v==='explode') throw new Error('boom'); super(v);} }
    // @ts-ignore
    global.Date = FakeDate;
    const r = formatDate('explode');
    expect(r).toBe('explode');
    global.Date = originalDate;
  });
});
