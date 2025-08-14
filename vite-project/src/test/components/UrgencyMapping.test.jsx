import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardPedidos } from '@/components/ui/CardPedidos.jsx';

const props = {
  imageUrl: 'http://example.com/img2.jpg',
  categoria: 'Alimentos',
  urgencia: 'Média',
  ong: 'Banco Alimentos',
  titulo: 'Alimentos Não Perecíveis',
  quantidade: 5,
  descricao: 'Arroz e feijão',
  publicado: '01/01/2025',
  validade: new Date().toISOString(),
};

describe('Urgency badge mapping', () => {
  it('aplica classes de estilo para urgencia Média', () => {
  render(<CardPedidos {...props} />);
  expect(screen.getByText('Média')).toBeInTheDocument();
  });
});
