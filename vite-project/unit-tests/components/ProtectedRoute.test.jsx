import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
// Mock dinâmico para alterar estados entre testes
let mockAuth = { isAuthenticated: true, loading: false };
vi.mock('@/context/AuthContext', () => ({
  useAuth: () => mockAuth
}));

describe('ProtectedRoute', () => {
  it('renderiza children quando autenticado', () => {
    mockAuth = { isAuthenticated: true, loading: false };
    render(
      <MemoryRouter initialEntries={['/privada']}>
        <Routes>
          <Route path="/privada" element={<ProtectedRoute><div>Conteudo Protegido</div></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Conteudo Protegido')).toBeInTheDocument();
  });

  it('mostra loader enquanto loading é true', () => {
    mockAuth = { isAuthenticated: true, loading: true };
    render(
      <MemoryRouter initialEntries={['/privada']}>
        <Routes>
          <Route path="/privada" element={<ProtectedRoute><div>Privado</div></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    // spinner é um div com classe animate-spin; checar presença
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).not.toBeNull();
    expect(screen.queryByText('Privado')).toBeNull();
  });

  it('redireciona para / quando não autenticado', () => {
    mockAuth = { isAuthenticated: false, loading: false };
    render(
      <MemoryRouter initialEntries={['/privada']}>
        <Routes>
          <Route path="/" element={<div>Public Home</div>} />
          <Route path="/privada" element={<ProtectedRoute><div>Privado</div></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Public Home')).toBeInTheDocument();
    expect(screen.queryByText('Privado')).toBeNull();
  });
});
