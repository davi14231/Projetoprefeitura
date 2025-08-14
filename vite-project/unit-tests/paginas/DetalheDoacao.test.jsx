import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DetalheDoacao from '@/components/ui/paginas/DetalheDoacao.jsx';

describe('DetalheDoacao', () => {
  it('renderiza titulo e botao compartilhar', () => {
    const onClose = vi.fn();
    const dados = {
      titulo: 'Doação de Roupas',
      categoria: 'Roupas',
      descricao: 'Roupas infantis em bom estado',
      quantidade: 10,
      imagemUrl: 'http://example.com/img.jpg',
      email: 'contato@ong.org',
      whatsapp: '81999999999'
    };
    render(<DetalheDoacao dados={dados} onClose={onClose} />);
    expect(screen.getByText('Doação de Roupas')).toBeInTheDocument();
    expect(screen.getByText(/Compartilhar/)).toBeInTheDocument();
  // Clica no botão de fechar identificado por aria-label
  fireEvent.click(screen.getByRole('button', { name: /fechar/i }));
  });
});
