import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostagemRealocacao } from '@/components/ui/paginas/PostagemRealocacao.jsx';

const mockAdd = vi.fn();
const mockUpdate = vi.fn();
vi.mock('@/context/DataContext', () => ({
  useData: () => ({ addRealocacao: mockAdd, updateRealocacao: mockUpdate })
}));
vi.mock('@/services/uploadService', () => ({ uploadService: { uploadImage: vi.fn(() => Promise.resolve('http://img.up/test.png')) } }));

beforeEach(() => {
  mockAdd.mockReset();
  mockUpdate.mockReset();
  globalThis.alert = vi.fn();
});

describe('PostagemRealocacao', () => {
  it('preenche e envia formulário criando nova realocação', async () => {
  render(<MemoryRouter><PostagemRealocacao onClose={() => {}} /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Item Novo' } });
    fireEvent.change(screen.getByLabelText('Categoria'), { target: { value: 'Eletrônicos' } });
    fireEvent.change(screen.getByLabelText('WhatsApp para contato'), { target: { value: '81999999999' } });
    fireEvent.change(screen.getByLabelText('Email para contato'), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText('Descrição:'), { target: { value: 'Descricao longa' } });
    fireEvent.click(screen.getByRole('button', { name: 'Publicar' }));
    // aguarda microtask flush
    await Promise.resolve();
    expect(mockAdd).toHaveBeenCalled();
  });

  it('quando editData presente usa updateRealocacao', async () => {
    const editData = { id: 5, titulo: 'Antigo', categoria: 'Outros', quantidade: 1, email: 'x@y.com', whatsapp: '8100000000', descricao: 'D', imageUrl: '' };
  render(<MemoryRouter><PostagemRealocacao onClose={() => {}} editData={editData} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Publicar' }));
    await Promise.resolve();
    expect(mockUpdate).toHaveBeenCalled();
  });
});
