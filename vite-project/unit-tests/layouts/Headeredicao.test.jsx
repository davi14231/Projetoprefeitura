import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Headeredicao } from '@/components/ui/layouts/Headeredicao.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

vi.mock('@/components/ui/TelaFlutuante.jsx', () => ({
  default: () => <div data-testid="tela-flutuante">Tela</div>
}));
vi.mock('@/components/ui/SearchDropdown.jsx', () => ({
  SearchDropdown: ({ searchTerm }) => <div data-testid="search-dd">DD:{searchTerm}</div>
}));

describe('Headeredicao', () => {
  it('mostra dropdown de busca após digitar', () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <Headeredicao />
        </DataProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Pesquisar necessidades/i);
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByTestId('search-dd')).toBeInTheDocument();
  });
});
