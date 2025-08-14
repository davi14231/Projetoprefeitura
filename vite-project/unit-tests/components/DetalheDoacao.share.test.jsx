import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import DetalheDoacao from '@/components/ui/paginas/DetalheDoacao';

const baseDados = { titulo:'Kit', categoria:'Cat', quantidade:1, diasRestantes:'1 dia', descricao:'Desc', imagemUrl:'img', email:'e@e', whatsapp:'8199' };

describe('DetalheDoacao share', () => {
  it('usa navigator.share quando disponível', async () => {
    const share = vi.fn().mockResolvedValue();
    Object.assign(navigator, { share });
    const { getByText } = render(<DetalheDoacao dados={baseDados} onClose={()=>{}} />);
    fireEvent.click(getByText('Compartilhar'));
    await Promise.resolve();
    expect(share).toHaveBeenCalled();
  });
  it('fallback abre janela quando share indisponível', () => {
    Object.assign(navigator, { share: undefined });
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const { getByText } = render(<DetalheDoacao dados={baseDados} onClose={()=>{}} />);
    fireEvent.click(getByText('Compartilhar'));
    expect(openSpy).toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
