import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppRoutes } from '@/App.jsx';

// Mock dos providers para isolar
vi.mock('@/context/DataContext', () => ({ DataProvider: ({ children }) => <div>{children}</div> }));
vi.mock('@/context/AuthContext', () => ({ AuthProvider: ({ children }) => <div>{children}</div>, useAuth: () => ({ isAuthenticated: true, loading: false }) }));

// Mock de páginas pesadas
vi.mock('@/components/ui/paginas/Tela_Home', () => ({ default: () => <div>Tela Home</div> }));
vi.mock('@/components/ui/paginas/Teladelogin', () => ({ Teladelogin: () => <div>Login</div> }));

import { MemoryRouter } from 'react-router-dom';

describe('App roteamento', () => {
  it('renderiza tela home na rota raiz', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes imagensCarrossel={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('Tela Home')).toBeInTheDocument();
  });
  it('renderiza login na rota /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRoutes imagensCarrossel={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
