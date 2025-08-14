import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardPedidos } from '@/components/ui/CardPedidos.jsx';

// Exercita normalização (lowercase + acentos) da urgência

describe('CardPedidos urgency normalization lowercase + accent', () => {
  it('mapeia "média" para classe de média', () => {
    render(<CardPedidos id={1} titulo="Teste" urgencia="média" categoria="alimentos" quantidade={1} unidade="un" />);
  const badge = screen.getByText(/Média|média/);
  // Deve usar classe de média (amarelo) conforme lógica (MEDIA)
  expect(badge.className).toMatch(/yellow|amarelo/i);
  });
});
