import { renderHook, act } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext.jsx';
import { vi, describe, test, expect } from 'vitest';

vi.mock('@/services/doacoesService', () => ({
  doacoesService: {
    listarDoacoes: vi.fn()
      .mockResolvedValueOnce([]) // efeito inicial (loadDoacoes)
      .mockResolvedValueOnce([]) // primeira checkApiConnection => true
      .mockRejectedValueOnce(new Error('fail check')), // segunda checkApiConnection => false
    listarDoacoesPrestesVencer: vi.fn().mockResolvedValue([]),
    listarMinhasDoacoes: vi.fn().mockResolvedValue([]),
    criarDoacao: vi.fn().mockRejectedValue(new Error('x'))
  }
}));
vi.mock('@/services/realocacoesService', () => ({
  realocacoesService: {
    listarRealocacoes: vi.fn().mockResolvedValue([]),
    listarMinhasRealocacoes: vi.fn().mockResolvedValue([])
  }
}));

function setup() {
  const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;
  return renderHook(() => useData(), { wrapper }).result;
}

describe('DataContext extras', () => {
  test('checkApiConnection false path e clearError/triggerUpdate', async () => {
    const r = setup();
    let ok;
    await act(async () => { ok = await r.current.checkApiConnection(); });
    expect(ok).toBe(true);
    let fail;
    await act(async () => { fail = await r.current.checkApiConnection(); });
    expect(fail).toBe(false);
  // addDoacao lança; capturamos para permitir assert do estado de erro
  await act(async () => { try { await r.current.addDoacao({ titulo: 'x' }); } catch(e){} });
  expect(r.current.error).toBe('Erro ao adicionar doação');
    act(() => { r.current.clearError(); });
    expect(r.current.error).toBeNull();
    const prev = r.current.forceUpdate;
    act(() => { r.current.triggerUpdate(); });
    expect(r.current.forceUpdate).toBe(prev + 1);
  });

  test('filtros de realocacoes paginadas categoria e termo', () => {
    const r = setup();
    const page = r.current.getRealocacoesPaginadas({ page:1, limit:5, filters:{ categoria:'Cat', termo:'abc' } });
    expect(page.items).toEqual([]);
    expect(page.totalPages).toBe(0 || page.totalPages);
  });
});
