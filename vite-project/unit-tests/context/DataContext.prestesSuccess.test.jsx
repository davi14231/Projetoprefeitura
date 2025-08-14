import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { DataProvider, useData } from '@/context/DataContext';

// Mock services com sucesso no endpoint prestes a vencer
vi.mock('@/services/doacoesService', () => ({
  doacoesService: {
    listarDoacoes: vi.fn().mockResolvedValue([{ id:1, titulo:'A', categoria:'Cat' }]),
    listarDoacoesPrestesVencer: vi.fn().mockResolvedValue([{ id:99, titulo:'PV', categoria:'Cat', validade_raw:new Date(Date.now()+86400000).toISOString() }]),
    listarMinhasDoacoes: vi.fn().mockResolvedValue([]),
    criarDoacao: vi.fn(), editarDoacao: vi.fn(), deletarDoacao: vi.fn(), alterarStatus: vi.fn()
  }
}));
vi.mock('@/services/realocacoesService', () => ({
  realocacoesService: { listarRealocacoes: vi.fn().mockResolvedValue([]), listarMinhasRealocacoes: vi.fn().mockResolvedValue([]), criarRealocacao: vi.fn(), editarRealocacao: vi.fn(), deletarRealocacao: vi.fn(), alterarStatus: vi.fn() }
}));

const Consumer = () => {
  const { doacoesPrestesVencer } = useData();
  return <div data-testid='pv-success'>{doacoesPrestesVencer.map(d=>d.id).join(',')}</div>;
};

describe('DataContext listarDoacoesPrestesVencer sucesso', () => {
  it('usa lista do endpoint sem fallback', async () => {
    const { getByTestId } = render(<DataProvider><Consumer /></DataProvider>);
    await waitFor(()=> expect(getByTestId('pv-success').textContent).toBe('99'));
  });
});
