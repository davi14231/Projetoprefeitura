import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '@/components/ui/layouts/Header.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

vi.mock('@/components/ui/SearchDropdown.jsx', () => ({
  SearchDropdown: ({ searchTerm }) => <div data-testid="search-dd">DD:{searchTerm}</div>
}));

describe('Header', () => {
  it('renderiza logo e navegação e ativa dropdown', () => {
    render(
      <MemoryRouter initialEntries={['/']}> 
        <DataProvider>
          <Header />
        </DataProvider>
      </MemoryRouter>
    );
    expect(screen.getByAltText(/Recife Prefeitura/i)).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/Pesquisar necessidades/i);
    fireEvent.change(input, { target: { value: 'on' } });
    expect(screen.getByTestId('search-dd')).toHaveTextContent('on');
  });
});
