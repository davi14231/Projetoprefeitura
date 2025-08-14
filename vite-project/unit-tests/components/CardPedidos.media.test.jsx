import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardPedidos } from '@/components/ui/CardPedidos.jsx';

const baseProps = { imageUrl:'img', categoria:'Cat', ong:'ONG', titulo:'Titulo', quantidade:1, descricao:'Desc', publicado:'01/01/2025', validade:'2025-01-31T00:00:00.000Z' };

describe('CardPedidos urgencia MEDIA classes', () => {
  it('aplica classes de urgencia MEDIA/Média', () => {
    render(<CardPedidos {...baseProps} urgencia='Média' />);
    const badge = screen.getByText(/Média|Media/);
    expect(badge.className).toMatch(/yellow-100/);
  });
});
