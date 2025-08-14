import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext.jsx';

// Mock básico – funções serão ajustadas dinamicamente depois (evita problema de hoist)
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

describe('DataContext loadDoacoes error path', () => {
  it('define error e apiConnected false', async () => {
    const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;
    const { result } = renderHook(() => useData(), { wrapper });

    // Aguarda sucesso inicial
    await waitFor(() => expect(result.current.apiConnected).toBe(true));

    // Importa serviço mockado e injeta falha na próxima chamada
    const { doacoesService } = await import('@/services/doacoesService');
    doacoesService.listarDoacoes.mockRejectedValueOnce(new Error('falha api'));

    await act(async () => { await result.current.loadDoacoes(); });
    await waitFor(() => expect(result.current.error).toBe('Erro ao carregar doações da API'));
    expect(result.current.apiConnected).toBe(false);
    expect(result.current.doacoes).toEqual([]);
  });
});
