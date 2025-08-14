import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Headernecessidade } from '@/components/ui/layouts/Headernecessidade.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

vi.mock('@/components/ui/TelaFlutuante.jsx', () => ({
  default: () => <div data-testid="tela-flutuante">Tela</div>
}));
vi.mock('@/components/ui/SearchDropdown.jsx', () => ({
  SearchDropdown: ({ searchTerm }) => <div data-testid="search-dd">DD:{searchTerm}</div>
}));

describe('Headernecessidade', () => {
  it('renderiza e ativa dropdown de busca', () => {
    render(
      <MemoryRouter initialEntries={['/todas-doacoes']}> 
        <DataProvider>
          <Headernecessidade />
        </DataProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Pesquisar necessidades/i);
    fireEvent.change(input, { target: { value: 'doa' } });
    expect(screen.getByTestId('search-dd')).toBeInTheDocument();
  });
});
