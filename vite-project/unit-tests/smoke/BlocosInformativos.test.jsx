import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BlocoDoador } from '@/components/ui/BlocoInformativoDoador.jsx';
import { BlocoONG } from '@/components/ui/BlocoInformativoONG.jsx';
import { BlocoONG2 } from '@/components/ui/BlocoInformativoONG2.jsx';

vi.mock('lucide-react', () => ({ Search: () => <svg data-testid="icon-search" />, Phone: () => <svg data-testid="icon-phone" />, ShieldCheck: () => <svg data-testid="icon-shield" /> }));

describe('Blocos informativos', () => {
  it('renderiza BlocoDoador com ícones mockados', () => {
    render(<BlocoDoador />);
    expect(screen.getByText(/Como o Doador Ajuda/)).toBeInTheDocument();
    // Verifica presença dos três ícones mockados
    expect(screen.getByTestId('icon-search')).toBeInTheDocument();
    expect(screen.getByTestId('icon-phone')).toBeInTheDocument();
    expect(screen.getByTestId('icon-shield')).toBeInTheDocument();
  });
  it('renderiza BlocoONG com link login', () => {
    render(<MemoryRouter><BlocoONG /></MemoryRouter>);
    expect(screen.getByText(/Como a ONG solicita itens/)).toBeInTheDocument();
    expect(screen.getByText('Solicite Itens').getAttribute('href')).toBe('/login');
  });
  it('renderiza BlocoONG2 com link edit-doacoes', () => {
    render(<MemoryRouter><BlocoONG2 /></MemoryRouter>);
    expect(screen.getByText(/Como a ONG solicita itens/)).toBeInTheDocument();
    expect(screen.getByText('Solicite Itens').getAttribute('href')).toBe('/edit-doacoes');
  });
});
