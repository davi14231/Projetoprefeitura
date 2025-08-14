import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ListagemHome2 from '@/components/ui/ListagemHome2.jsx';

describe('ListagemHome2', () => {
  it('renderiza cards a partir dos itens', () => {
    const itens = [
      { id: 11, titulo: 'Item A', categoria: 'Cat', urgencia: 'Média', quantidade: 5, descricao: 'Desc A' }
    ];
    render(<ListagemHome2 itens={itens} carrosselId="carousel-smoke-2" />);
    expect(screen.getByText('Item A')).toBeInTheDocument();
  });
});
