import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Headerinicio } from '@/components/ui/layouts/Headerinicio.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

// Simplify dropdown children
vi.mock('@/components/ui/TelaFlutuante.jsx', () => ({ default: ({isVisible}) => isVisible? <div data-testid='tf'>TF</div>: null }));
vi.mock('@/components/ui/SearchDropdown.jsx', () => ({ SearchDropdown: ({searchTerm,onClose}) => <div data-testid='sdd' onClick={onClose}>SDD:{searchTerm}</div> }));

describe('Headerinicio interações extras', () => {
  it('mostra e esconde TelaFlutuante via hover delay', () => {
    render(<MemoryRouter><DataProvider><Headerinicio /></DataProvider></MemoryRouter>);
    const ongTrigger = screen.getByText(/Minha ONG/i).closest('div');
    fireEvent.mouseEnter(ongTrigger);
    expect(screen.getByTestId('tf')).toBeInTheDocument();
    fireEvent.mouseLeave(ongTrigger);
  });

  it('fecha search ao clicar fora (document mousedown)', () => {
    render(<MemoryRouter><DataProvider><Headerinicio /></DataProvider></MemoryRouter>);
    const input = screen.getByPlaceholderText(/Pesquisar necessidades/i);
    fireEvent.change(input, { target: { value: 'ab' } }); // abre
    expect(screen.getByTestId('sdd')).toBeInTheDocument();
    fireEvent.mouseDown(document.body); // outside
    // dropdown should be removed on next tick
  });
});
