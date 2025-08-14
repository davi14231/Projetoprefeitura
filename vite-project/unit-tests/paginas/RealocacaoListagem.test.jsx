import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RealocacaoListagem } from '@/components/ui/paginas/RealocacaoListagem';
import { useData } from '@/context/DataContext';

vi.mock('@/context/DataContext', () => ({ useData: vi.fn() }));

// Capturar props passadas ao modal de detalhe
let lastDetalheProps = null;
vi.mock('@/components/ui/paginas/DetalheDoacao', () => ({
  __esModule: true,
  default: (props) => { lastDetalheProps = props; return <div data-testid="detalhe-modal">{props.dados.titulo}</div>; }
}));

vi.mock('@/components/ui/paginas/PostagemRealocacao', () => ({
  PostagemRealocacao: (props) => <div data-testid="postagem-modal">Formulario Realocacao</div>
}));

// Mock Header e Footer para simplificar
vi.mock('@/components/ui/layouts/Headerrealocacao', () => ({ Headerrealocacao: () => <div data-testid="header-realocacao"/> }));
vi.mock('@/components/ui/layouts/Footer', () => ({ Footer: () => <div data-testid="footer"/> }));

// Mock Pagination para não depender de implementação
vi.mock('@/components/ui/Pagination', () => ({ Pagination: ({ currentPage, totalPages }) => <div data-testid="pagination">Pag {currentPage}/{totalPages}</div> }));

describe('RealocacaoListagem', () => {
  const getRealocacoesPaginadas = vi.fn();
  const loadRealocacoes = vi.fn().mockResolvedValue();
  beforeEach(() => {
    vi.clearAllMocks();
    lastDetalheProps = null;
    getRealocacoesPaginadas.mockReturnValue({
      items: [
        {
          id: 1,
          ong: 'ONG Luz',
          publicado: '2025-01-01',
          titulo: 'Cadeiras de Rodas',
          categoria: 'Itens de Inclusão e Mobilidade',
          quantidade: 3,
          descricao: 'Cadeiras em bom estado',
          imageUrl: 'http://img/1.jpg',
          facebook: 'http://fb.com/ongluz',
          email: 'contato@ongluz.org',
          whatsapp: '81999998888'
        }
      ],
      total: 1,
      totalPages: 1
    });
    useData.mockReturnValue({
      getRealocacoesPaginadas,
      loadRealocacoes,
      realocacoes: [{ id: 1 }],
      forceUpdate: 0
    });
  });

  function renderPage(initial='/realocacao-listagem') {
    return render(
      <MemoryRouter initialEntries={[initial]}>
        <RealocacaoListagem />
      </MemoryRouter>
    );
  }

  test('renderiza item e contador', () => {
    renderPage();
    expect(screen.getByText('Cadeiras de Rodas')).toBeInTheDocument();
    expect(screen.getByText(/1 itens encontrados/i)).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toHaveTextContent('Pag 1/1');
  });

  test('abre modal de detalhe ao clicar no card', () => {
    renderPage();
    fireEvent.click(screen.getByText('Cadeiras de Rodas'));
    expect(screen.getByTestId('detalhe-modal')).toBeInTheDocument();
    expect(lastDetalheProps?.dados?.titulo).toBe('Cadeiras de Rodas');
    expect(lastDetalheProps?.dados?.quantidade).toBe(3);
  });

  test('abre modal de postagem ao clicar em Cadastrar Itens', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Cadastrar Itens/i }));
    expect(screen.getByTestId('postagem-modal')).toBeInTheDocument();
  });

  test('aplica filtro de busca e categoria chamando getRealocacoesPaginadas', async () => {
    renderPage();
    const buscaInput = screen.getByPlaceholderText(/Buscar itens/i);
    fireEvent.change(buscaInput, { target: { value: 'cadeiras' } });
    const categoriaSelect = screen.getByDisplayValue('Categorias');
    fireEvent.change(categoriaSelect, { target: { value: 'Itens de Inclusão e Mobilidade' } });
    await waitFor(() => {
      const lastCall = getRealocacoesPaginadas.mock.calls.at(-1)[0];
      expect(lastCall.filters.termo).toBe('cadeiras');
      expect(lastCall.filters.categoria).toBe('Itens de Inclusão e Mobilidade');
    });
  });
});
