import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext.jsx';

vi.mock('@/services/doacoesService', () => ({
  doacoesService: {
    listarDoacoes: vi.fn().mockResolvedValue([]),
    listarDoacoesPrestesVencer: vi.fn().mockResolvedValue([]),
    listarMinhasDoacoes: vi.fn().mockResolvedValue([]),
    criarDoacao: vi.fn().mockRejectedValue(new Error('add fail')),
    editarDoacao: vi.fn(), deletarDoacao: vi.fn(), alterarStatus: vi.fn()
  }
}));
vi.mock('@/services/realocacoesService', () => ({
  realocacoesService: {
    listarRealocacoes: vi.fn().mockResolvedValue([]),
    listarMinhasRealocacoes: vi.fn().mockResolvedValue([]),
    criarRealocacao: vi.fn(), editarRealocacao: vi.fn(), deletarRealocacao: vi.fn(), alterarStatus: vi.fn()
  }
}));

describe('DataContext clearError cobre linhas finais', () => {
  it('define error e depois limpa', async () => {
    const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.apiConnected).toBe(true));

    const { doacoesService } = await import('@/services/doacoesService');
    doacoesService.listarDoacoes.mockRejectedValueOnce(new Error('e1'));

  await act(async () => { await result.current.loadDoacoes(); });
  await waitFor(() => expect(result.current.error).toBe('Erro ao carregar doações da API'));
  await act(async () => { result.current.clearError(); });
  await waitFor(() => expect(result.current.error).toBeNull());
  });
});
