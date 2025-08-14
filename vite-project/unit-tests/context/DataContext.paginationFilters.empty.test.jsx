import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext.jsx';

vi.mock('@/services/doacoesService', () => {
  const base = [
    { id:1, titulo:'Arroz', categoria:'Alimentos', ong:'ONG A' },
    { id:2, titulo:'Livro', categoria:'Educação', ong:'ONG B' }
  ];
  return {
    doacoesService: {
      listarDoacoes: vi.fn().mockResolvedValue(base),
      listarDoacoesPrestesVencer: vi.fn().mockResolvedValue([]),
      listarMinhasDoacoes: vi.fn().mockResolvedValue([]),
      criarDoacao: vi.fn(), editarDoacao: vi.fn(), deletarDoacao: vi.fn(), alterarStatus: vi.fn()
    }
  };
});
vi.mock('@/services/realocacoesService', () => ({
  realocacoesService: {
    listarRealocacoes: vi.fn().mockResolvedValue([]),
    listarMinhasRealocacoes: vi.fn().mockResolvedValue([]),
    criarRealocacao: vi.fn(), editarRealocacao: vi.fn(), deletarRealocacao: vi.fn(), alterarStatus: vi.fn()
  }
}));

describe('DataContext getDoacoesPaginadas filtros vazios', () => {
  it('aplica termo e categoria que não batem resultando vazio', () => {
    const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;
    const { result } = renderHook(() => useData(), { wrapper });
    const filtered = result.current.getDoacoesPaginadas({ page:1, limit:6, filters:{ categoria:'X', termo:'zzz' } });
    expect(filtered.items).toEqual([]);
    expect(filtered.totalPages).toBe(0);
  });
  it('sem filtros retorna itens completos', async () => {
    const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;
    const { result } = renderHook(() => useData(), { wrapper });
    await act(async () => { await result.current.loadDoacoes(); });
    const all = result.current.getDoacoesPaginadas({ page:1, limit:6, filters:{} });
    expect(all.items.length).toBe(2);
    expect(all.totalPages).toBe(1);
  });
});
