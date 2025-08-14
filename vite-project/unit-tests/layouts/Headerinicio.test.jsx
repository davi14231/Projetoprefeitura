import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Headerinicio } from '@/components/ui/layouts/Headerinicio.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

vi.mock('@/components/ui/TelaFlutuante.jsx', () => ({
  default: () => <div data-testid="tela-flutuante">Tela</div>
}));
vi.mock('@/components/ui/SearchDropdown.jsx', () => ({
  SearchDropdown: ({ searchTerm }) => <div data-testid="search-dd">DD:{searchTerm}</div>
}));

describe('Headerinicio', () => {
  it('renderiza e ativa dropdown de busca', () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <Headerinicio />
        </DataProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Pesquisar necessidades/i);
    fireEvent.change(input, { target: { value: 'ong' } });
    expect(screen.getByTestId('search-dd')).toBeInTheDocument();
  });
});
