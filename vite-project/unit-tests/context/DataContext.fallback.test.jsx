import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { DataProvider, useData } from '@/context/DataContext';

vi.mock('@/services/doacoesService', () => ({
  doacoesService: {
    listarDoacoes: vi.fn().mockResolvedValue([
      { id:1, titulo:'A', categoria:'Cat', validade_raw:new Date(Date.now()+2*86400000).toISOString(), descricao:'d' },
      { id:2, titulo:'B', categoria:'Cat', validade_raw:new Date(Date.now()+10*86400000).toISOString(), descricao:'d' }
    ]),
    listarDoacoesPrestesVencer: vi.fn().mockRejectedValue(new Error('fail pv'))
  }
}));
vi.mock('@/services/realocacoesService', () => ({
  realocacoesService: { listarRealocacoes: vi.fn().mockResolvedValue([]) }
}));

// Consumer que força segunda chamada ao fallback após as doações terem sido carregadas
const Consumer = () => {
  const { doacoesPrestesVencer, loadDoacoesPrestesVencer } = useData();
  useEffect(() => {
    // Próximo tick para garantir que setDoacoes já causou re-render antes do fallback manual
    const t = setTimeout(() => {
      loadDoacoesPrestesVencer();
    }, 0);
    return () => clearTimeout(t);
  }, [loadDoacoesPrestesVencer]);
  return <div data-testid='pv-count'>{doacoesPrestesVencer.length}</div>;
};

describe('DataContext fallback prestes a vencer', () => {
  it('calcula localmente quando endpoint falha', async () => {
    const { getByTestId } = render(<DataProvider><Consumer /></DataProvider>);
    // Espera até que a segunda chamada (manual) atualize o fallback
    await waitFor(() => {
      expect(Number(getByTestId('pv-count').textContent)).toBe(1);
    }, { timeout: 3000 });
  });

  it('useData fora do provider lança erro', () => {
    const Broken = () => { useData(); return null; };
    expect(()=>render(<Broken />)).toThrow(/deve ser usado dentro/);
  });
});
