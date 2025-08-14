import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext.jsx';

vi.mock('@/services/doacoesService', () => ({
  doacoesService: {
    listarDoacoes: vi.fn().mockResolvedValue([
      { id: 1, titulo: 'Item 1', categoria: 'Alimentos', validade_raw: new Date(Date.now() + 24*60*60*1000).toISOString() },
      { id: 2, titulo: 'Item 2', categoria: 'Alimentos', validade_raw: new Date(Date.now() + 2*24*60*60*1000).toISOString() },
      { id: 3, titulo: 'Item 3', categoria: 'Alimentos', validade_raw: new Date(Date.now() + 10*24*60*60*1000).toISOString() }
    ]),
    listarDoacoesPrestesVencer: vi.fn().mockRejectedValue(new Error('endpoint down')),
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

describe('DataContext fallback local doacoesPrestesVencer extra', () => {
  it('calcula localmente doacoesPrestesVencer quando endpoint falha', async () => {
    const wrapper = ({ children }) => <DataProvider>{children}</DataProvider>;
  const { result } = renderHook(() => useData(), { wrapper });
  // aguarda primeiro carregamento de doacoes
  await waitFor(() => expect(result.current.doacoes.length).toBeGreaterThan(0));
  // chama explicitamente fallback agora (já ocorre no efeito inicial, mas garantimos)
  await act(async () => { await result.current.loadDoacoesPrestesVencer(); });
  await waitFor(() => expect(result.current.doacoesPrestesVencer.length).toBeGreaterThan(0));
    expect(result.current.doacoesPrestesVencer.every(d => {
      const diff = (new Date(d.validade_raw) - Date.now())/(1000*60*60*24);
      return diff >= 0 && diff <= 3;
    })).toBe(true);
  });
});
