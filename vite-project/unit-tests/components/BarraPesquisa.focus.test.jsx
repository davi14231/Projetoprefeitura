import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import BarraPesquisa from '@/components/ui/BarraPesquisa';

// Mock SearchDropdown to provide stable selector
vi.mock('@/components/ui/SearchDropdown', () => ({
  SearchDropdown: ({ searchTerm, onClose }) => <div data-testid="search-dropdown">Resultados para {searchTerm}</div>
}));

describe('BarraPesquisa focus/threshold', () => {
  test('não abre dropdown com menos de 2 caracteres e abre após atingir 2', () => {
    render(<BarraPesquisa placeholder="Buscar" />);
    const input = screen.getByPlaceholderText('Buscar');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(screen.queryByTestId('search-dropdown')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
  });
});
