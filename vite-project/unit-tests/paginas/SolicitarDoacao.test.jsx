import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SolicitarDoacao } from '@/components/ui/paginas/SolicitarDoacao';
import { MemoryRouter } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import React from 'react';

vi.mock('@/context/DataContext', () => ({
  useData: vi.fn()
}));

vi.mock('@/services/uploadService', () => ({
  uploadService: {
    uploadImage: vi.fn().mockResolvedValue('http://uploaded.example/img.png')
  }
}));

describe('SolicitarDoacao', () => {
  const addDoacao = vi.fn();
  const updateDoacao = vi.fn();
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useData.mockReturnValue({ addDoacao, updateDoacao });
    global.alert = vi.fn();
  });

  function preencherCamposBasicos() {
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { name: 'titulo', value: 'Campanha Cobertores' } });
    fireEvent.change(screen.getByLabelText(/Categoria/i), { target: { name: 'categoria', value: 'Roupas e Calçados' } });
    fireEvent.change(screen.getByLabelText(/Email para contato/i), { target: { name: 'email', value: 'ong@exemplo.org' } });
    fireEvent.change(screen.getByLabelText(/WhatsApp para contato/i), { target: { name: 'whatsapp', value: '(81) 98888-7777' } });
    fireEvent.change(screen.getByLabelText(/Descrição e propósito/i), { target: { name: 'descricao', value: 'Precisamos de cobertores para o inverno.' } });
  }

  test('valida whatsapp mínimo e mostra alerta de whatsapp inválido', async () => {
    render(<MemoryRouter><SolicitarDoacao onClose={onClose} /></MemoryRouter>);
    // Preencher campos obrigatórios com whatsapp insuficiente (2 dígitos -> falha na validação custom)
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { name: 'titulo', value: 'Campanha Cobertores' } });
    fireEvent.change(screen.getByLabelText(/Categoria/i), { target: { name: 'categoria', value: 'Roupas e Calçados' } });
    fireEvent.change(screen.getByLabelText(/Email para contato/i), { target: { name: 'email', value: 'ong@exemplo.org' } });
    fireEvent.change(screen.getByLabelText(/Descrição e propósito/i), { target: { name: 'descricao', value: 'Precisamos de cobertores.' } });
    fireEvent.change(screen.getByLabelText(/WhatsApp para contato/i), { target: { name: 'whatsapp', value: '81' } });
    fireEvent.click(screen.getByRole('button', { name: /Publicar Solicitação/i }));
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
    expect(global.alert.mock.calls[0][0]).toMatch(/whatsapp inválido/i);
    expect(addDoacao).not.toHaveBeenCalled();
  });

  test('envia com sucesso usando imagem padrão (sem upload)', async () => {
  render(<MemoryRouter><SolicitarDoacao onClose={onClose} /></MemoryRouter>);
    preencherCamposBasicos();
    fireEvent.click(screen.getByRole('button', { name: /Publicar Solicitação/i }));
    await waitFor(() => expect(addDoacao).toHaveBeenCalledTimes(1));
    const payload = addDoacao.mock.calls[0][0];
    expect(payload.titulo).toBe('Campanha Cobertores');
    expect(payload.categoria).toBe('Roupas e Calçados');
    expect(payload.imageUrl).toMatch(/imagens/); // imagem default
    expect(global.alert).toHaveBeenCalledWith(expect.stringMatching(/criada com sucesso/i));
    expect(onClose).toHaveBeenCalled();
  });

  test('normaliza whatsapp para somente dígitos', async () => {
  render(<MemoryRouter><SolicitarDoacao onClose={onClose} /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText(/WhatsApp para contato/i), { target: { name: 'whatsapp', value: 'https://wa.me/5581999998888' } });
    // Preencher restantes para envio
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { name: 'titulo', value: 'Campanha' } });
    fireEvent.change(screen.getByLabelText(/Categoria/i), { target: { name: 'categoria', value: 'Outros' } });
    fireEvent.change(screen.getByLabelText(/Email para contato/i), { target: { name: 'email', value: 'a@a.com' } });
    fireEvent.change(screen.getByLabelText(/Descrição e propósito/i), { target: { name: 'descricao', value: 'Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /Publicar Solicitação/i }));
    await waitFor(() => expect(addDoacao).toHaveBeenCalled());
    const payload = addDoacao.mock.calls[0][0];
    expect(payload.whatsapp).toBe('81999998888'); // sem 55 e apenas dígitos
  });
});
