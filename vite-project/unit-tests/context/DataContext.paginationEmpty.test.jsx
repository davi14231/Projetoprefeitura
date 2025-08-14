import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext.jsx';

vi.mock('@/services/doacoesService', () => ({
  doacoesService: {
    listarDoacoes: vi.fn().mockResolvedValue([]),
    listarDoacoesPrestesVencer: vi.fn().mockResolvedValue([]),
    listarMinhasDoacoes: vi.fn().mockResolvedValue([]),
    criarDoacao: vi.fn(), editarDoacao: vi.fn(), deletarDoacao: vi.fn(), alterarStatus: vi.fn()
  }
}));
vi.mock('@/services/realocacoesService', () => ({
  realocacoesService: {
    listarRealocacoes: vi.fn().mockResolvedValue([]),
    listarMinhasRealocacoes: vi.fn().mockResolvedValue([]),
    criarRealocacao: vi.fn(), editarRealocacao: vi.fn(), deletarRealocacao: vi.fn(), alterarStatus: vi.fn()
  }
}));

// Usa getDoacoesPaginadas diretamente para arrays vazios (retorna items=[], totalPages=0)
describe('DataContext getDoacoesPaginadas vazio', () => {
  it('retorna estrutura vazia', async () => {
    const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;
    const { result } = renderHook(() => useData(), { wrapper });
    // página 1
    const { items, totalPages, totalItems, hasNextPage, hasPrevPage } = result.current.getDoacoesPaginadas({ page:1, limit:6 });
    expect(items).toEqual([]);
    expect(totalPages).toBe(0);
    expect(totalItems).toBe(0);
    expect(hasNextPage).toBe(false);
    expect(hasPrevPage).toBe(false);
  });
});
