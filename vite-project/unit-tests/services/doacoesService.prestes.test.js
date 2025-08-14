import { describe, it, expect, vi } from 'vitest';
import { doacoesService } from '@/services/doacoesService';
import api from '@/services/api';
vi.mock('@/services/api');
import { mapDoacoesFromBackend } from '@/utils/dataMapper';
vi.mock('@/utils/dataMapper', () => ({ mapDoacoesFromBackend: vi.fn(x=>x) }));

describe('doacoesService listarDoacoesPrestesVencer extra', () => {
  it('retorna [] após tentativas sem sucesso', async () => {
    api.get.mockRejectedValueOnce({ response:{ status:500 } });
    api.get.mockRejectedValueOnce({ response:{ status:500 } });
    const r = await doacoesService.listarDoacoesPrestesVencer();
    expect(r).toEqual([]);
  });
});
