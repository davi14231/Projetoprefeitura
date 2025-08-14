import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { EditDoacoes } from '@/components/ui/paginas/EditDoacoes.jsx';

// Mock DataContext functions
const mockGetPaginadas = vi.fn();
const mockRemove = vi.fn();
const mockEncerrar = vi.fn();
const mockLoad = vi.fn();

vi.mock('@/context/DataContext', () => ({
  useData: () => ({
    getMinhasDoacoesPaginadas: mockGetPaginadas,
    removeDoacao: mockRemove,
    encerrarDoacao: mockEncerrar,
    forceUpdate: 0,
    loadMinhasDoacoes: mockLoad
  })
}));

// Mocks de componentes usados internamente para evitar complexidade
vi.mock('@/components/ui/layouts/Headeredicao', () => ({ Headeredicao: () => <div data-testid="header-edicao" /> }));
vi.mock('@/components/ui/layouts/Footer', () => ({ Footer: () => <div data-testid="footer" /> }));
vi.mock('@/components/ui/card', () => ({ Card: ({children}) => <div>{children}</div>, CardContent: ({children}) => <div>{children}</div> }));
vi.mock('@/components/ui/Pagination', () => ({ Pagination: () => <div data-testid="paginacao" /> }));
vi.mock('@/components/ui/paginas/SolicitarDoacao', () => ({ SolicitarDoacao: () => <div>Formulario Solicitar</div> }));
vi.mock('@/components/ui/paginas/ConfirmacaoDeletar', () => ({ __esModule: true, default: ({ onCancel, onConfirm }) => (
  <div>
    <button onClick={onCancel}>Cancelar Excluir</button>
    <button onClick={onConfirm}>Confirmar Excluir</button>
  </div>) }));
vi.mock('@/components/ui/paginas/ConfirmacaoEncerrarSolicitacao', () => ({ __esModule: true, default: ({ onCancel, onConfirm }) => (
  <div>
    <button onClick={onCancel}>Cancelar Encerrar</button>
    <button onClick={onConfirm}>Confirmar Encerrar</button>
  </div>) }));
vi.mock('@/components/ui/TempoRestante', () => ({ TempoRestante: () => <span>Tempo</span> }));

beforeEach(() => {
  mockGetPaginadas.mockReturnValue({ total: 1, totalPages: 1, items: [{
    id: 1,
    imageUrl: 'img.jpg',
    titulo: 'Pedido Teste',
    categoria: 'Roupas',
    publicado: '2025-01-01',
    descricao: 'Desc',
    urgencia: 'ALTA'
  }]});
  // mock alert
  globalThis.alert = vi.fn();
});

describe('EditDoacoes', () => {
  it('renderiza lista e permite abrir modal de nova necessidade', async () => {
    render(<MemoryRouter initialEntries={['/edit-doacoes']}><EditDoacoes /></MemoryRouter>);
    expect(screen.getByText(/Pedido Teste/)).toBeInTheDocument();
    const addBtn = screen.getByText('+ Adicionar Nova Necessidade');
  await act(async () => { fireEvent.click(addBtn); });
  await waitFor(() => expect(screen.getByText(/Formulario Solicitar/)).toBeInTheDocument());
    expect(screen.getByText(/Formulario Solicitar/)).toBeInTheDocument();
  });
  it('abre modal de deletar e confirma', async () => {
    render(<MemoryRouter initialEntries={['/edit-doacoes']}><EditDoacoes /></MemoryRouter>);
  await act(async () => { fireEvent.click(screen.getByTitle('Excluir')); });
  await act(async () => { fireEvent.click(screen.getByText('Confirmar Excluir')); });
    expect(mockRemove).toHaveBeenCalled();
  });
  it('abre modal encerrar e confirma', async () => {
    render(<MemoryRouter initialEntries={['/edit-doacoes']}><EditDoacoes /></MemoryRouter>);
  await act(async () => { fireEvent.click(screen.getByText('Doação Recebida')); });
  await act(async () => { fireEvent.click(screen.getByText('Confirmar Encerrar')); });
    expect(mockEncerrar).toHaveBeenCalled();
  });
});
