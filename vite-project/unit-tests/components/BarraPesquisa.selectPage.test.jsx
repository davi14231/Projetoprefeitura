import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DataProvider } from '@/context/DataContext.jsx';
import BarraPesquisa from '@/components/ui/BarraPesquisa.jsx';

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

describe('BarraPesquisa select page closes dropdown (covers handleSearchClose)', () => {
  it('clica em página e fecha', async () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <BarraPesquisa />
        </DataProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Pesquisar/);
    fireEvent.change(input, { target: { value: 'ini' } }); // corresponde a "Início"
    await waitFor(() => expect(screen.queryAllByTestId('search-page-item').length).toBeGreaterThan(0));
    const first = screen.getAllByTestId('search-page-item')[0];
    fireEvent.click(first);
    await waitFor(() => expect(screen.queryByTestId('search-dropdown')).toBeNull());
  });
});
