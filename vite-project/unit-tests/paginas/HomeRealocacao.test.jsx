import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HomeRealocacao } from '@/components/ui/paginas/HomeRealocacao.jsx';

const mockGetPaginadas = vi.fn();
const mockRemove = vi.fn();
const mockEncerrar = vi.fn();
const mockLoad = vi.fn();
const mockAdd = vi.fn();

vi.mock('@/context/DataContext', () => ({
  useData: () => ({
    getMinhasRealocacoesPaginadas: mockGetPaginadas,
    removeRealocacao: mockRemove,
    encerrarRealocacao: mockEncerrar,
    forceUpdate: 0,
    loadMinhasRealocacoes: mockLoad
  })
}));

vi.mock('@/components/ui/layouts/Headeredicao', () => ({ Headeredicao: () => <div data-testid="header-edicao" /> }));
vi.mock('@/components/ui/layouts/Footer', () => ({ Footer: () => <div data-testid="footer" /> }));
vi.mock('@/components/ui/card', () => ({ Card: ({children}) => <div>{children}</div>, CardContent: ({children}) => <div>{children}</div> }));
vi.mock('@/components/ui/Pagination', () => ({ Pagination: () => <div data-testid="paginacao" /> }));
vi.mock('@/components/ui/paginas/PostagemRealocacao', () => ({ PostagemRealocacao: () => <div>Formulario Realocacao</div> }));
vi.mock('@/components/ui/paginas/ConfirmacaoDeletar', () => ({ __esModule: true, default: ({ onCancel, onConfirm }) => (
  <div>
    <button onClick={onCancel}>Cancel Del</button>
    <button onClick={onConfirm}>Conf Del</button>
  </div>) }));
vi.mock('@/components/ui/paginas/ConfirmacaoEncerrarRealocacao', () => ({ __esModule: true, default: ({ onCancel, onConfirm }) => (
  <div>
    <button onClick={onCancel}>Cancel End</button>
    <button onClick={onConfirm}>Conf End</button>
  </div>) }));

beforeEach(() => {
  mockGetPaginadas.mockReturnValue({ total: 1, totalPages: 1, items: [{
    id: 10,
    imageUrl: 'img2.jpg',
    titulo: 'Realocacao Teste',
    categoria: 'Eletrônicos',
    publicado: '2025-01-02',
    descricao: 'Desc R',
    facebook: 'http://fb.com'
  }]});
  globalThis.alert = vi.fn();
});

describe('HomeRealocacao', () => {
  it('renderiza item e abre modal de postagem', async () => {
    render(<MemoryRouter initialEntries={['/home-realocacao']}><HomeRealocacao /></MemoryRouter>);
    expect(screen.getByText(/Realocacao Teste/)).toBeInTheDocument();
    await act(async () => { fireEvent.click(screen.getByText('+ Adicionar Nova Realocação')); });
    expect(screen.getByText('Formulario Realocacao')).toBeInTheDocument();
  });
  it('abre modal de deletar e confirma', async () => {
    render(<MemoryRouter initialEntries={['/home-realocacao']}><HomeRealocacao /></MemoryRouter>);
    await act(async () => { fireEvent.click(screen.getByTitle('Excluir')); });
    await act(async () => { fireEvent.click(screen.getByText('Conf Del')); });
    await waitFor(() => expect(mockRemove).toHaveBeenCalled());
  });
  it('abre modal encerrar e confirma', async () => {
    render(<MemoryRouter initialEntries={['/home-realocacao']}><HomeRealocacao /></MemoryRouter>);
    await act(async () => { fireEvent.click(screen.getByText('Realocação Concluída')); });
    await act(async () => { fireEvent.click(screen.getByText('Conf End')); });
    await waitFor(() => expect(mockEncerrar).toHaveBeenCalled());
  });
});
