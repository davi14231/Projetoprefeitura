import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async (orig) => {
  const actual = await orig();
  return { ...actual, useNavigate: () => vi.fn() };
});

const mockLogout = vi.fn();
vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ logout: mockLogout, user: { nome: 'Minha ONG' } }) }));

import TelaFlutuante from '@/components/ui/TelaFlutuante.jsx';

beforeAll(() => {
  // Mock alert para evitar erro do jsdom
  global.alert = vi.fn();
});

describe('TelaFlutuante', () => {
  it('não renderiza quando invisível', () => {
    const { container } = render(<MemoryRouter><TelaFlutuante isVisible={false} /></MemoryRouter>);
    expect(container.firstChild).toBeNull();
  });
  it('renderiza e aciona logout', () => {
    const onClose = vi.fn();
    render(<MemoryRouter><TelaFlutuante isVisible={true} onClose={onClose} /></MemoryRouter>);
    expect(screen.getByText('Minha ONG')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Sair'));
    expect(mockLogout).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalled();
  expect(onClose).toHaveBeenCalled();
  });
});
