import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { SolicitarDoacao } from '@/components/ui/paginas/SolicitarDoacao';
import { useData } from '@/context/DataContext';

vi.mock('@/context/DataContext', () => ({
  useData: vi.fn()
}));

vi.mock('@/services/uploadService', () => ({
  uploadService: {
    uploadImage: vi.fn().mockResolvedValue('http://upload/cdn.png')
  }
}));

const mockAdd = vi.fn();
const mockUpdate = vi.fn();

// Mock FileReader para preview instantâneo
class MockFileReader {
  constructor(){ this.onload = null; }
  readAsDataURL(file){
    if(this.onload){
      // fornecer string simulada
      this.onload({ target: { result: 'data:image/png;base64,AAA' } });
    }
  }
}
// aplicar mock global
global.FileReader = MockFileReader;

function fillBasic() {
  fireEvent.change(screen.getByLabelText(/Título/i), { target: { name: 'titulo', value: 'Kits Escolares' } });
  fireEvent.change(screen.getByLabelText(/Categoria/i), { target: { name: 'categoria', value: 'Eletrônicos' } });
  fireEvent.change(screen.getByLabelText(/Email para contato/i), { target: { name: 'email', value: 'contato@ong.org' } });
  fireEvent.change(screen.getByLabelText(/WhatsApp para contato/i), { target: { name: 'whatsapp', value: '(81) 98888-7777' } });
  fireEvent.change(screen.getByLabelText(/Descrição e propósito/i), { target: { name: 'descricao', value: 'Desc longa' } });
}

describe('SolicitarDoacao extras', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.alert = vi.fn();
  });

  test('modo edição mantém prazo ISO e chama updateDoacao', async () => {
    const editData = {
      id: 55,
      titulo: 'Antigo',
      categoria: 'Outros',
      quantidade: 3,
      urgencia: 'BAIXA',
      prazo: '2025-12-25',
      whatsapp: '81999998888',
      email: 'a@a.com',
      descricao: 'Texto',
      imageUrl: 'http://old.png'
    };
    useData.mockReturnValue({ addDoacao: mockAdd, updateDoacao: mockUpdate });
    render(<MemoryRouter><SolicitarDoacao onClose={vi.fn()} editData={editData} editId={55} /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { name: 'titulo', value: 'Antigo Editado' } });
    fireEvent.click(screen.getByRole('button', { name: /Publicar Solicitação/i }));
    await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
    const payload = mockUpdate.mock.calls[0][1];
    expect(payload.prazo).toBe('2025-12-25');
    expect(payload.titulo).toBe('Antigo Editado');
  });

  test('calcula prazo relativo (15 dias) e faz upload de imagem', async () => {
    const now = new Date();
    useData.mockReturnValue({ addDoacao: mockAdd, updateDoacao: mockUpdate });
    render(<MemoryRouter><SolicitarDoacao onClose={vi.fn()} /></MemoryRouter>);
    fillBasic();
    fireEvent.change(screen.getByLabelText(/Prazo/i), { target: { name: 'prazo', value: '15 dias' } });
    const file = new File(['abc'], 'foto.png', { type: 'image/png' });
  const inputWrapper = screen.getByText(/Clique para upload/i).closest('label');
  const input = inputWrapper.querySelector('input[type="file"]');
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => expect(screen.getByAltText(/Preview/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /Publicar Solicitação/i }));
    await waitFor(() => expect(mockAdd).toHaveBeenCalled());
    const payload = mockAdd.mock.calls[0][0];
    expect(payload.imageUrl).toBe('http://upload/cdn.png');
    // validar formato e intervalo ~15 dias
    expect(payload.prazo).toMatch(/\d{4}-\d{2}-\d{2}/);
    const prazoDate = new Date(payload.prazo + 'T00:00:00Z');
    const diffDias = Math.round((prazoDate - now) / (1000*60*60*24));
    expect(diffDias).toBeGreaterThanOrEqual(14);
    expect(diffDias).toBeLessThanOrEqual(16);
  });

  test('remove imagem após upload', async () => {
    useData.mockReturnValue({ addDoacao: mockAdd, updateDoacao: mockUpdate });
    render(<MemoryRouter><SolicitarDoacao onClose={vi.fn()} /></MemoryRouter>);
    fillBasic();
  const file = new File(['abc'], 'foto.png', { type: 'image/png' });
  const inputWrapper = screen.getByText(/Clique para upload/i).closest('label');
  const input = inputWrapper.querySelector('input[type="file"]');
  fireEvent.change(input, { target: { files: [file] } });
  await waitFor(() => expect(screen.getByAltText(/Preview/i)).toBeInTheDocument());
  // botão remover é o único com background vermelho (classe bg-red-500)
  const removeBtn = document.querySelector('button.bg-red-500');
  expect(removeBtn).toBeTruthy();
  fireEvent.click(removeBtn);
    expect(screen.queryByAltText(/Preview/i)).not.toBeInTheDocument();
  });

  test('caminho de erro ao adicionar dispara alert de erro', async () => {
    useData.mockReturnValue({ addDoacao: vi.fn().mockRejectedValue(new Error('falhou')), updateDoacao: mockUpdate });
    render(<MemoryRouter><SolicitarDoacao onClose={vi.fn()} /></MemoryRouter>);
    fillBasic();
    fireEvent.click(screen.getByRole('button', { name: /Publicar Solicitação/i }));
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
    expect(global.alert.mock.calls[0][0]).toMatch(/Erro ao processar/);
  });
});
