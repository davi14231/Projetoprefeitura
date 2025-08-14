import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DataProvider } from '@/context/DataContext.jsx';
import { SearchDropdown } from '@/components/ui/SearchDropdown.jsx';

vi.mock('@/services/doacoesService', () => ({
  doacoesService: {
    listarDoacoes: vi.fn().mockResolvedValue([
      { id: 1, titulo: 'Kit de Alimentos', categoria: 'Alimentos', descricao: 'Desc', ong: 'ONG A', imageUrl: 'a.jpg' }
    ]),
    listarDoacoesPrestesVencer: vi.fn().mockResolvedValue([]),
    listarMinhasDoacoes: vi.fn().mockResolvedValue([]),
    criarDoacao: vi.fn(), editarDoacao: vi.fn(), deletarDoacao: vi.fn(), alterarStatus: vi.fn()
  }
}));

vi.mock('@/services/realocacoesService', () => ({
  realocacoesService: {
    listarRealocacoes: vi.fn().mockResolvedValue([
      { id: 10, titulo: 'Cadeiras', categoria: 'Mobilidade', descricao: 'Desc', ong: 'ONG B', imageUrl: 'b.jpg' }
    ]),
    listarMinhasRealocacoes: vi.fn().mockResolvedValue([]),
    criarRealocacao: vi.fn(), editarRealocacao: vi.fn(), deletarRealocacao: vi.fn(), alterarStatus: vi.fn()
  }
}));

function Wrapper({ children }) {
  return <MemoryRouter initialEntries={['/home-ong']}><DataProvider>{children}<Routes>
    <Route path="/todas-doacoes" element={<div data-testid="page-doacoes">Doações</div>} />
    <Route path="/realocacao-listagem" element={<div data-testid="page-realocacoes">Realocações</div>} />
    <Route path="/home-ong" element={<div />} />
  </Routes></DataProvider></MemoryRouter>;
}

describe('SearchDropdown results navigation', () => {
  it('mostra itens e navega ao clicar', async () => {
    render(<Wrapper><SearchDropdown searchTerm="al" onClose={() => {}} /></Wrapper>);
    await waitFor(() => expect(screen.getAllByTestId('search-result-item').length).toBeGreaterThan(0));
    const labels = screen.getAllByText(/Necessidade|Realocação/);
    expect(labels.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(screen.getAllByTestId('search-result-item')[0]);
    await waitFor(() => expect(screen.getByTestId('page-doacoes')).toBeInTheDocument());
  });
});
