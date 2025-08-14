import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ListagemHome from '@/components/ui/ListagemHome.jsx';

// Mock CardHome to reduce noise
vi.mock('@/components/ui/CardHome.jsx', () => ({ CardHome: ({titulo,onClick}) => <div data-testid='card' onClick={onClick}>{titulo}</div> }));

describe('ListagemHome edge cases', () => {
  it('renderiza fallback quando itens não é array', () => {
    // @ts-ignore passing invalid type intentionally
    render(<ListagemHome itens={null} carrosselId='c1' />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it('executa scroll buttons', () => {
    // Provide items and mock scrollBy
    const items = Array.from({length:2}).map((_,i)=>({id:i+1, titulo:'T'+i}));
    const div = document.createElement('div');
    div.id='c2';
    div.scrollBy = vi.fn();
    document.body.appendChild(div);
    render(<ListagemHome itens={items} carrosselId='c2' />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(div.scrollBy).toHaveBeenCalledTimes(2);
  });
});
