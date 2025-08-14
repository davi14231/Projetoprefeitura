import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ListagemHome2 from '@/components/ui/ListagemHome2.jsx';

vi.mock('@/components/ui/CardHome.jsx', () => ({ CardHome: ({titulo,onClick}) => <div data-testid='card2' onClick={onClick}>{titulo}</div> }));

describe('ListagemHome2 edge cases', () => {
  it('fallback quando itens invalido', () => {
    // null para disparar caminho não-array antes do default
    // @ts-ignore
    render(<ListagemHome2 itens={null} carrosselId='c3' />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });
  it('scroll buttons funcionam', () => {
    const items = Array.from({length:3}).map((_,i)=>({id:i+10, titulo:'X'+i}));
    const div = document.createElement('div');
    div.id='c4';
    div.scrollBy = vi.fn();
    document.body.appendChild(div);
    render(<ListagemHome2 itens={items} carrosselId='c4' />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(div.scrollBy).toHaveBeenCalledTimes(2);
  });
});
