import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext.jsx';

vi.mock('@/services/doacoesService', () => {
  const base = [
    { id: 11, titulo: 'A', validade_raw: new Date(Date.now()+86400000).toISOString() },
    { id: 12, titulo: 'B', validade_raw: new Date(Date.now()+2*86400000).toISOString() }
  ];
  return {
    doacoesService: {
      listarDoacoes: vi.fn().mockResolvedValue(base),
      listarDoacoesPrestesVencer: vi.fn().mockResolvedValue([base[0]]),
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

describe('DataContext endpoint prestes a vencer success path extra', () => {
  it('usa lista retornada pelo endpoint sem fallback', async () => {
    const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.doacoesPrestesVencer.length).toBe(1));
    expect(result.current.doacoesPrestesVencer[0].id).toBe(11);
  });
});
