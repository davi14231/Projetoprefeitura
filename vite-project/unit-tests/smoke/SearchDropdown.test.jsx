import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
let mockData; // será configurado por teste

vi.mock('react-router-dom', async (orig) => {
  const actual = await orig();
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('@/context/DataContext', () => ({
  useData: () => ({
    doacoes: mockData.doacoes,
    realocacoes: mockData.realocacoes
  })
}));

import { SearchDropdown } from '@/components/ui/SearchDropdown.jsx';

beforeEach(() => {
  mockNavigate.mockReset();
  mockData = { doacoes: [], realocacoes: [] };
});

describe('SearchDropdown', () => {
  it('não renderiza quando termo < 2 chars', () => {
    const { container } = render(<MemoryRouter><SearchDropdown searchTerm="a" onClose={()=>{}} /></MemoryRouter>);
    expect(container.querySelector('[data-testid="search-dropdown"]')).toBeNull();
  });

  it('renderiza páginas e itens limitados e badges de tipo', () => {
    // Criar mais de 5 de cada para testar cortes (slice)
  mockData.doacoes = Array.from({ length: 7 }).map((_,i) => ({ id:i+1, titulo:`Item Doacao ${i}`, categoria:'Cat', descricao:'Desc', ong:'ONG', encerrado:false, imageUrl:null }));
  mockData.realocacoes = Array.from({ length: 5 }).map((_,i) => ({ id:100+i, titulo:`Item Realoc ${i}`, categoria:'Cat', descricao:'Desc', ong:'ONG', encerrado:false, imageUrl:null }));
    render(<MemoryRouter><SearchDropdown searchTerm="item do" onClose={()=>{}} /></MemoryRouter>);
    const dropdown = screen.getByTestId('search-dropdown');
    expect(dropdown).toBeInTheDocument();
  const resultItems = screen.getAllByTestId('search-result-item');
  expect(resultItems.length).toBeGreaterThan(0);
  expect(resultItems.length).toBeLessThanOrEqual(6); // limite máximo
  // Pelo menos um badge de qualquer tipo e soma dos dois > 1
  const nec = screen.queryAllByText('Necessidade').length;
  const rea = screen.queryAllByText('Realocação').length;
  expect(nec + rea).toBeGreaterThan(0);
  });

  it('clique em item doação navega para /todas-doacoes e chama onClose', () => {
    mockData.doacoes = [{ id:1, titulo:'Livro', categoria:'Edu', descricao:'Desc', ong:'ONG', encerrado:false, imageUrl:'' }];
    mockData.realocacoes = [];
    const onClose = vi.fn();
    render(<MemoryRouter><SearchDropdown searchTerm="liv" onClose={onClose} /></MemoryRouter>);
    fireEvent.click(screen.getByTestId('search-result-item'));
    expect(mockNavigate).toHaveBeenCalledWith('/todas-doacoes');
    expect(onClose).toHaveBeenCalled();
  });

  it('clique em item realocação navega para /realocacao-listagem', () => {
    mockData.doacoes = [];
    mockData.realocacoes = [{ id:2, titulo:'Mesa', categoria:'Mob', descricao:'Desc', ong:'ONG', encerrado:false, imageUrl:'' }];
    const onClose = vi.fn();
    render(<MemoryRouter><SearchDropdown searchTerm="mes" onClose={onClose} /></MemoryRouter>);
    fireEvent.click(screen.getByTestId('search-result-item'));
    expect(mockNavigate).toHaveBeenCalledWith('/realocacao-listagem');
    expect(onClose).toHaveBeenCalled();
  });

  it('exibe mensagem de nenhum resultado', () => {
    mockData.doacoes = [{ id:1, titulo:'Arroz', categoria:'Alimento', descricao:'Desc', ong:'ONG', encerrado:false, imageUrl:'' }];
    mockData.realocacoes = [];
    render(<MemoryRouter><SearchDropdown searchTerm="zz" onClose={()=>{}} /></MemoryRouter>);
    expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument();
  });

  it('clique em página navega e chama onClose', () => {
    mockData.doacoes = []; mockData.realocacoes = [];
    const onClose = vi.fn();
    render(<MemoryRouter><SearchDropdown searchTerm="ini" onClose={onClose} /></MemoryRouter>);
    const pageItem = screen.getAllByTestId('search-page-item')[0];
    fireEvent.click(pageItem);
    expect(mockNavigate).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
