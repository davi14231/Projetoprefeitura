import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Headerrealocacao } from '@/components/ui/layouts/Headerrealocacao.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

vi.useFakeTimers();

vi.mock('@/components/ui/TelaFlutuante.jsx', () => ({
  default: ({ isVisible }) => isVisible ? <div data-testid="tela-flutuante">Tela</div> : null
}));
vi.mock('@/components/ui/SearchDropdown.jsx', () => ({
  SearchDropdown: ({ searchTerm }) => <div data-testid="search-dd">DD:{searchTerm}</div>
}));

describe('Headerrealocacao interações hover', () => {
  it('abre e fecha TelaFlutuante via hover (timeout)', () => {
    render(
      <MemoryRouter initialEntries={['/realocacao-listagem']}>
        <DataProvider>
          <Headerrealocacao />
        </DataProvider>
      </MemoryRouter>
    );
    const ongTrigger = screen.getByText('Minha ONG');
    const container = ongTrigger.parentElement && ongTrigger.parentElement.parentElement;
    fireEvent.mouseEnter(container);
    expect(screen.getByTestId('tela-flutuante')).toBeInTheDocument();
    fireEvent.mouseLeave(container);
    act(() => { vi.advanceTimersByTime(310); });
    expect(screen.queryByTestId('tela-flutuante')).toBeNull();
  });
});
