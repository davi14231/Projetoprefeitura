import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ListagemHome from '@/components/ui/ListagemHome.jsx';

describe('ListagemHome', () => {
  it('renderiza cards a partir dos itens', () => {
    const itens = [
      { id: 1, titulo: 'Item 1', categoria: 'Cat', urgencia: 'Alta', quantidade: 2, descricao: 'Desc 1' },
      { id: 2, titulo: 'Item 2', categoria: 'Cat', urgencia: 'Baixa', quantidade: 1, descricao: 'Desc 2' }
    ];
    render(<ListagemHome itens={itens} carrosselId="carousel-smoke" />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
