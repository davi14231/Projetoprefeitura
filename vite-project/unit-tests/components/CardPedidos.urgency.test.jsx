import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CardPedidos } from '@/components/ui/CardPedidos';

const baseProps = { imageUrl:'img', categoria:'Cat', ong:'ONG', titulo:'Titulo', quantidade:1, descricao:'Desc', publicado:'01/01/2025' };

describe('CardPedidos urgencia e validade', () => {
  it('formata validade ISO', () => {
    const { getByText } = render(<CardPedidos {...baseProps} urgencia='baixa' validade='2025-01-31T00:00:00Z' />);
    expect(getByText(/Válido até/).textContent).toMatch(/2025/);
  });
  it('renderiza badge Media', () => {
    const { getByText } = render(<CardPedidos {...baseProps} urgencia='MEDIA' validade='2025-02-01T00:00:00Z' />);
    expect(getByText('Media')).toBeTruthy();
  });
  it('renderiza badge Alta', () => {
    const { getByText } = render(<CardPedidos {...baseProps} urgencia='ALTA' validade='2025-03-01T00:00:00Z' />);
    expect(getByText('Alta')).toBeTruthy();
  });
});
