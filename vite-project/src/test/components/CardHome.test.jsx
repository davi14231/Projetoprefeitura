import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardHome } from '@/components/ui/CardHome.jsx';

// Minimal props based on typical usage (ajuste se necessário)
const props = {
  imageUrl: 'http://example.com/img.jpg',
  categoria: 'Roupas',
  urgencia: 'Alta',
  ong: 'ONG Exemplo',
  titulo: 'Doação de Roupas',
  validade: new Date().toISOString(),
  descricao: 'Roupas infantis em bom estado',
  quantidade: 10,
};

describe('CardHome', () => {
  it('renderiza titulo e badge de urgencia', () => {
  render(<CardHome {...props} />);
  expect(screen.getByText('Doação de Roupas')).toBeInTheDocument();
  expect(screen.getByText('Alta')).toBeInTheDocument();
  });
});
