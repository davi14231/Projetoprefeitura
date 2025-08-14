import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tela_Home from '@/components/ui/paginas/Tela_Home';
import TelahomeONG from '@/components/ui/paginas/TelahomeONG';
import { useData } from '@/context/DataContext';

// Mocks
vi.mock('@/context/DataContext', () => ({ useData: vi.fn() }));

// Capturar navegação
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

let lastListagemHomeProps = null;
let lastListagemHome2Props = null;

vi.mock('@/components/ui/ListagemHome', () => ({
  __esModule: true,
  default: ({ itens, onCardClick, carrosselId }) => {
    lastListagemHomeProps = { itens, carrosselId };
    return (
      <div data-testid={`listagem-home-${carrosselId}`}>
        {itens && itens[0] && (
          <button onClick={() => onCardClick(itens[0])}>{itens[0].titulo}</button>
        )}
      </div>
    );
  }
}));

vi.mock('@/components/ui/ListagemHome2', () => ({
  __esModule: true,
  default: ({ itens, onCardClick, carrosselId }) => {
    lastListagemHome2Props = { itens, carrosselId };
    return (
      <div data-testid={`listagem-home2-${carrosselId}`}>
        {itens && itens[0] && (
          <button onClick={() => onCardClick(itens[0])}>{itens[0].titulo}</button>
        )}
      </div>
    );
  }
}));

vi.mock('@/components/ui/BlocoInformativoDoador', () => ({ BlocoDoador: () => <div data-testid="bloco-doador"/> }));
vi.mock('@/components/ui/BlocoInformativoONG', () => ({ BlocoONG: () => <div data-testid="bloco-ong"/> }));
vi.mock('@/components/ui/BlocoInformativoONG2', () => ({ BlocoONG2: () => <div data-testid="bloco-ong2"/> }));
vi.mock('@/components/ui/layouts/Footer', () => ({ __esModule: true, default: () => <div data-testid="footer"/> }));
vi.mock('@/components/ui/layouts/Headertelainicial', () => ({ HeaderTelainicial: () => <div data-testid="header-inicial"/> }));
vi.mock('@/components/ui/layouts/Headerinicio', () => ({ Headerinicio: () => <div data-testid="header-inicio"/> }));

let detalheDados = null;
vi.mock('@/components/ui/paginas/DetalheDoacao', () => ({
  __esModule: true,
  default: ({ dados }) => { detalheDados = dados; return <div data-testid="detalhe-modal">{dados.titulo}</div>; }
}));

describe('Tela_Home', () => {
  const baseItem = {
    id: 1,
    ong: 'Instituto Teste',
    publicado: '2025-01-10',
    titulo: 'Kits Escolares',
    categoria: 'Materiais Educativos e Culturais',
    validade: '2025-02-01',
    descricao: 'Material escolar completo',
    imageUrl: 'http://img/kit.jpg',
    email: 'contato@teste.org',
    whatsapp: '81999999999'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockReset();
    detalheDados = null;
  });

  function setup(doacoesPrestes=[]) {
    useData.mockReturnValue({
      doacoes: [baseItem],
      doacoesPrestesVencer: doacoesPrestes,
      loading: false,
      loadDoacoesPrestesVencer: vi.fn()
    });
    render(
      <MemoryRouter>
        <Tela_Home imagensCarrossel={["/img1.jpg","/img2.jpg"]} />
      </MemoryRouter>
    );
  }

  test('renderiza carrossel e permite trocar imagem', () => {
    setup();
    const firstImg = screen.getByAltText('Banner');
    expect(firstImg).toHaveAttribute('src','/img1.jpg');
    fireEvent.click(screen.getByLabelText('Selecionar imagem 2'));
    expect(screen.getByAltText('Banner')).toHaveAttribute('src','/img2.jpg');
  });

  test('usa fallback para doacoes quando doacoesPrestesVencer vazio', () => {
    setup([]);
    expect(lastListagemHomeProps.itens[0].titulo).toBe('Kits Escolares');
  });

  test('abre modal de detalhe ao clicar em item', () => {
    setup();
    const btn = screen.getAllByText('Kits Escolares')[0];
    fireEvent.click(btn);
    expect(screen.getByTestId('detalhe-modal')).toBeInTheDocument();
    expect(detalheDados.titulo).toBe('Kits Escolares');
    expect(detalheDados.diasRestantes).toMatch(/Válido até/);
  });

  test('navega ao clicar em Ver Todas as Necessidades', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Ver Todas as Necessidades/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/todas-doacoes');
  });
});

describe('TelahomeONG', () => {
  const baseItem = {
    id: 2,
    ong: 'ONG Segunda',
    publicado: '2025-01-11',
    titulo: 'Roupas Inverno',
    categoria: 'Roupas e Calçados',
    validade: '2025-02-10',
    descricao: 'Roupas quentes variadas',
    imageUrl: 'http://img/roupas.jpg'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockReset();
    detalheDados = null;
  });

  function setup(doacoesPrestes=[baseItem]) {
    useData.mockReturnValue({
      doacoes: [baseItem],
      doacoesPrestesVencer: doacoesPrestes,
    });
    render(
      <MemoryRouter>
        <TelahomeONG imagensCarrossel={['/a.jpg','/b.jpg']} />
      </MemoryRouter>
    );
  }

  test('renderiza carrossel TelahomeONG e troca imagem', () => {
    setup();
    expect(screen.getByAltText('Banner')).toHaveAttribute('src','/a.jpg');
    fireEvent.click(screen.getByLabelText('Selecionar imagem 2'));
    expect(screen.getByAltText('Banner')).toHaveAttribute('src','/b.jpg');
  });

  test('abre modal de detalhe com dados formatados', () => {
    setup();
    const btn = screen.getAllByText('Roupas Inverno')[0];
    fireEvent.click(btn);
    expect(screen.getByTestId('detalhe-modal')).toBeInTheDocument();
    expect(detalheDados.titulo).toBe('Roupas Inverno');
    expect(detalheDados.diasRestantes).toMatch(/Válido até/);
  });

  test('navega ao clicar Ver Todas as Necessidades', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Ver Todas as Necessidades/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/todas-doacoes');
  });
});
