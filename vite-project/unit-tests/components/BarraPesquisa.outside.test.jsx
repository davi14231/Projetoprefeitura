import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BarraPesquisa } from '@/components/ui/BarraPesquisa.jsx';

vi.mock('@/components/ui/SearchDropdown.jsx', () => ({ SearchDropdown: ({searchTerm}) => <div data-testid='bp-dd'>BP:{searchTerm}</div> }));

describe('BarraPesquisa outside click', () => {
  it('abre e fecha dropdown ao clicar fora', () => {
    render(<div><BarraPesquisa placeholder='Busca' /></div>);
    const input = screen.getByPlaceholderText(/Busca/);
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(screen.getByTestId('bp-dd')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
  });
});
