import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('@/components/ui/layouts/Headernecessidade', () => ({
  Headernecessidade: () => <div data-testid="header-necessidade">Header Necessidade</div>
}));
vi.mock('@/components/ui/layouts/Headertelainicial', () => ({
  HeaderTelainicial: () => <div data-testid="header-inicial">Header Inicial</div>
}));
vi.mock('@/components/ui/layouts/Footer', () => ({
  Footer: () => <div data-testid="footer" />
}));

vi.mock('@/components/ui/paginas/DetalheDoacao', () => ({
  default: ({ dados, onClose }) => (
    <div data-testid="detalhe-modal">
      <pre data-testid="modal-json">{JSON.stringify(dados)}</pre>
      <button onClick={onClose}>Fechar</button>
    </div>
  )
}));

let capturedPaginationProps = null;
vi.mock('@/components/ui/Pagination', () => ({
  Pagination: (props) => {
    capturedPaginationProps = props;
    return (
      <div data-testid="pagination">
        <span>Pagina {props.currentPage} / {props.totalPages}</span>
        <button onClick={() => props.onPageChange(props.currentPage + 1)} disabled={props.currentPage >= props.totalPages}>Next</button>
      </div>
    );
  }
}));

const getDoacoesPaginadasMock = vi.fn();
vi.mock('@/context/DataContext', () => ({
  useData: () => ({ getDoacoesPaginadas: getDoacoesPaginadasMock })
}));

const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

import TodasDoacoes from '@/components/ui/paginas/TodasDoacoes.jsx';

const renderWithRoute = (initial = '/todas-doacoes') => {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route path="/todas-doacoes" element={<TodasDoacoes />} />
      </Routes>
    </MemoryRouter>
  );
};

const baseItem = {
  id: 1,
  ong: 'ONG Teste',
  publicado: '2025-01-01',
  titulo: 'Item Teste',
  categoria: 'Roupas e Calçados',
  quantidade: 5,
  validade: '2025-02-01',
  descricao: 'Descricao teste',
  imageUrl: 'http://img/1.jpg'
};

beforeEach(() => {
  capturedPaginationProps = null;
  navigateMock.mockReset();
  getDoacoesPaginadasMock.mockReset();
  getDoacoesPaginadasMock.mockImplementation(() => ({
    items: [baseItem],
    totalPages: 3,
    totalItems: 1
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('TodasDoacoes', () => {
  it('renderiza itens e abre modal com dados formatados ao clicar', () => {
    renderWithRoute();
    expect(screen.getByText('Item Teste')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Item Teste'));
    const modal = screen.getByTestId('detalhe-modal');
    expect(modal).toBeInTheDocument();
    const dados = JSON.parse(screen.getByTestId('modal-json').textContent);
    expect(dados.instituto).toBe('ONG Teste');
    expect(dados.email).toBe('contato@ongteste.org.br');
    expect(dados.whatsapp).toBe('(81) 9999-9999');
    expect(dados.diasRestantes).toContain('Válido até');
  });

  it('aplica filtro de categoria e reseta pagina para 1', () => {
    renderWithRoute();
    const select = screen.getByDisplayValue('Categorias');
    fireEvent.change(select, { target: { value: 'Eletrônicos' }});
    const lastCall = getDoacoesPaginadasMock.mock.calls.at(-1)[0];
    expect(lastCall.filters.categoria).toBe('Eletrônicos');
    expect(lastCall.page).toBe(1);
  });

  it('aplica busca e chama contexto com termo correto', () => {
    renderWithRoute();
    const input = screen.getByPlaceholderText('Buscar itens...');
    fireEvent.change(input, { target: { value: 'laptop' }});
    const lastCall = getDoacoesPaginadasMock.mock.calls.at(-1)[0];
    expect(lastCall.filters.termo).toBe('laptop');
  });

  it('navega para proxima pagina via componente de paginacao', () => {
    renderWithRoute('/todas-doacoes?page=1');
    expect(capturedPaginationProps).not.toBeNull();
    fireEvent.click(screen.getByText('Next'));
    expect(navigateMock).toHaveBeenCalled();
    const calledUrl = navigateMock.mock.calls[0][0];
    expect(calledUrl).toContain('page=2');
  });

  it('exibe header inicial quando from=home na URL', () => {
    renderWithRoute('/todas-doacoes?from=home');
    expect(screen.getByTestId('header-inicial')).toBeInTheDocument();
  });

  it('exibe estado vazio com mensagem de filtros quando não há itens e há filtro', () => {
    getDoacoesPaginadasMock.mockImplementation(() => ({
      items: [],
      totalPages: 1,
      totalItems: 0
    }));
    renderWithRoute();
    fireEvent.change(screen.getByPlaceholderText('Buscar itens...'), { target: { value: 'xyz' }});
    expect(screen.getByText('Nenhuma doação encontrada')).toBeInTheDocument();
    expect(screen.getByText('Tente ajustar os filtros de busca.')).toBeInTheDocument();
  });
});
