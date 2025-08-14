import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BarraPesquisa } from '@/components/ui/BarraPesquisa.jsx';
import { DataProvider } from '@/context/DataContext.jsx';

describe('BarraPesquisa', () => {
  it('renderiza input e abre dropdown após 2 caracteres', () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <BarraPesquisa placeholder="Buscar itens" />
        </DataProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Buscar itens');
    expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: 'ro' } });
  expect(input.value).toBe('ro');
  // Verifica mock do dropdown
  // Dropdown original utiliza data-testid="search-dropdown"
  expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
  });

  it('não mostra dropdown com menos de 2 chars e mostra ao focar com 2', () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <BarraPesquisa placeholder="Busca" />
        </DataProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Busca');
    // 1 char não abre
    fireEvent.change(input, { target: { value: 'a' } });
    expect(screen.queryByTestId('search-dropdown')).toBeNull();
    // adiciona segundo char
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
  });

  it('fecha dropdown ao clicar fora', () => {
    render(
      <MemoryRouter>
        <div data-testid="outside" style={{ width: 1, height:1 }}></div>
        <DataProvider>
          <BarraPesquisa placeholder="Busca2" />
        </DataProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Busca2');
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByTestId('search-dropdown')).toBeNull();
  });
});
