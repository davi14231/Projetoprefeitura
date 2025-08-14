import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Headernecessidade } from '@/components/ui/layouts/Headernecessidade.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

vi.useFakeTimers();

vi.mock('@/components/ui/TelaFlutuante.jsx', () => ({
  default: ({ isVisible }) => isVisible ? <div data-testid="tela-flutuante">Tela</div> : null
}));
vi.mock('@/components/ui/SearchDropdown.jsx', () => ({
  SearchDropdown: ({ searchTerm }) => <div data-testid="search-dd">DD:{searchTerm}</div>
}));

describe('Headernecessidade interações hover', () => {
  it('abre e fecha TelaFlutuante via hover (timeout coberto)', () => {
    render(
      <MemoryRouter initialEntries={['/todas-doacoes']}>
        <DataProvider>
          <Headernecessidade />
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
