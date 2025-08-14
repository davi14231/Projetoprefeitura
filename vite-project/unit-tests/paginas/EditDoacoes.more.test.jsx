import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { EditDoacoes } from '@/components/ui/paginas/EditDoacoes.jsx';

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

vi.mock('@/components/ui/layouts/Headeredicao', () => ({ Headeredicao: () => <div /> }));
vi.mock('@/components/ui/layouts/Footer', () => ({ Footer: () => <div /> }));
vi.mock('@/components/ui/card', () => ({ Card: ({children}) => <div>{children}</div>, CardContent: ({children}) => <div>{children}</div> }));
vi.mock('@/components/ui/Pagination', () => ({ Pagination: () => <div /> }));
vi.mock('@/components/ui/paginas/SolicitarDoacao', () => ({ SolicitarDoacao: () => <div>Formulario Edit</div> }));
vi.mock('@/components/ui/paginas/ConfirmacaoDeletar', () => ({ __esModule:true, default: () => <div /> }));
vi.mock('@/components/ui/paginas/ConfirmacaoEncerrarSolicitacao', () => ({ __esModule:true, default: () => <div /> }));
vi.mock('@/components/ui/TempoRestante', () => ({ TempoRestante: () => <span /> }));

beforeEach(() => {
  document.body.style.overflow = 'auto';
  mockGetPaginadas.mockReturnValue({ total: 1, totalPages: 1, items: [{ id: 9, imageUrl:'i.png', titulo:'Editar Aqui', categoria:'Roupas', publicado:'2025-01-01', descricao:'D', urgencia:'BAIXA' }] });
});

describe('EditDoacoes edição', () => {
  test('clicar Editar abre modal solicitardoacao e controla overflow', async () => {
    render(<MemoryRouter initialEntries={['/edit-doacoes']}><EditDoacoes /></MemoryRouter>);
  const btn = screen.getAllByText(/Editar/i).find(el => el.tagName === 'BUTTON');
  expect(btn).toBeTruthy();
  fireEvent.click(btn);
    await waitFor(() => expect(screen.getByText(/Formulario Edit/)).toBeInTheDocument());
    expect(document.body.style.overflow).toBe('hidden');
  });
});
