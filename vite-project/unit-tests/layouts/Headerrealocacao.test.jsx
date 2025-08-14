import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Headerrealocacao } from '@/components/ui/layouts/Headerrealocacao.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

vi.mock('@/components/ui/TelaFlutuante.jsx', () => ({
  default: () => <div data-testid="tela-flutuante">Tela</div>
}));
vi.mock('@/components/ui/SearchDropdown.jsx', () => ({
  SearchDropdown: ({ searchTerm }) => <div data-testid="search-dd">DD:{searchTerm}</div>
}));

describe('Headerrealocacao', () => {
  it('renderiza e ativa dropdown de busca', () => {
    render(
      <MemoryRouter initialEntries={['/realocacao-listagem']}> 
        <DataProvider>
          <Headerrealocacao />
        </DataProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Pesquisar necessidades/i);
    fireEvent.change(input, { target: { value: 'rel' } });
    expect(screen.getByTestId('search-dd')).toBeInTheDocument();
  });
});
