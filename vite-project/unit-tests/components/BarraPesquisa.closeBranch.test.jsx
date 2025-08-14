import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataProvider } from '@/context/DataContext.jsx';
import { vi } from 'vitest';
import BarraPesquisa from '@/components/ui/BarraPesquisa.jsx';
import { MemoryRouter } from 'react-router-dom';

// Exercita ramo de fechamento quando já está fechado (linhas 22-23 remanescentes)

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

describe('BarraPesquisa close branch when already closed', () => {
  it('handleClose com searchVisible false não quebra', async () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <BarraPesquisa />
        </DataProvider>
      </MemoryRouter>
    );
  const input = screen.getByPlaceholderText(/Pesquisar/);
    // abre
    fireEvent.change(input, { target: { value: 'ab' } }); // >=2 ativa dropdown
    // garante que abriu (dropdown presente via testid interno)
    await waitFor(() => {
      expect(screen.queryByTestId('search-dropdown')).not.toBeNull();
    });
    // fecha clicando fora
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByTestId('search-dropdown')).toBeNull();
    });
    // chama novamente sem estar aberto (ramo redundante)
    fireEvent.mouseDown(document.body);
    expect(input.value).toBe('ab');
  });
});
