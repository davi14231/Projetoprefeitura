import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BarraPesquisa } from '@/components/ui/BarraPesquisa.jsx';
import { MemoryRouter } from 'react-router-dom';
import { DataProvider } from '@/context/DataContext.jsx';

describe('BarraPesquisa refocus path', () => {
  it('reabre via focus após fechar por clique fora', () => {
  render(<MemoryRouter><DataProvider><BarraPesquisa /></DataProvider></MemoryRouter>);
    const input = screen.getByPlaceholderText('Pesquisar...');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('search-dropdown')).toBeNull();
    fireEvent.focus(input);
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
  });
});
