import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react';

// Mocks do authService
const loginMock = vi.fn();
const logoutMock = vi.fn();
const isAuthenticatedMock = vi.fn();
const getCurrentUserMock = vi.fn();

vi.mock('@/services/authService', () => ({
  authService: {
    login: (...args) => loginMock(...args),
    logout: (...args) => logoutMock(...args),
    isAuthenticated: () => isAuthenticatedMock(),
    getCurrentUser: () => getCurrentUserMock()
  }
}));

import { AuthProvider, useAuth } from '@/context/AuthContext.jsx';

const Probe = ({ onReady }) => {
  const ctx = useAuth();
  React.useEffect(() => { onReady(ctx); }, [ctx, onReady]);
  return null;
};

const renderWithProvider = (onReady) => {
  render(<AuthProvider><Probe onReady={onReady} /></AuthProvider>);
};

beforeEach(() => {
  vi.clearAllMocks();
  // Defaults
  isAuthenticatedMock.mockReturnValue(false);
  getCurrentUserMock.mockReturnValue(null);
});

describe('AuthContext', () => {
  it('lança erro ao usar useAuth fora do provider', () => {
    const Orphan = () => { useAuth(); return null; };
    expect(() => render(<Orphan />)).toThrow('useAuth deve ser usado dentro de um AuthProvider');
  });

  it('estado inicial sem autenticação define loading=false e user=null', async () => {
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => expect(ctxRef.loading).toBe(false));
    expect(ctxRef.isAuthenticated).toBe(false);
    expect(ctxRef.user).toBeNull();
  });

  it('carrega usuário inicial quando isAuthenticated retorna true', async () => {
    isAuthenticatedMock.mockReturnValue(true);
    getCurrentUserMock.mockReturnValue({ id: 1, name: 'User Inicial' });
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => expect(ctxRef.loading).toBe(false));
    expect(ctxRef.isAuthenticated).toBe(true);
    expect(ctxRef.user).toEqual({ id: 1, name: 'User Inicial' });
  });

  it('login sucesso atualiza estado com user', async () => {
    loginMock.mockResolvedValue({ user: { id: 2, name: 'Logado' } });
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => expect(ctxRef.loading).toBe(false));
    await act(async () => { await ctxRef.login({ email: 'a', senha: 'b' }); });
    expect(loginMock).toHaveBeenCalled();
    expect(ctxRef.isAuthenticated).toBe(true);
    expect(ctxRef.user).toEqual({ id: 2, name: 'Logado' });
  });

  it('login erro propaga exceção e não autentica', async () => {
    loginMock.mockRejectedValueOnce(new Error('bad'));
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => expect(ctxRef.loading).toBe(false));
    await expect(ctxRef.login({ email: 'x', senha: 'y' })).rejects.toThrow('bad');
    expect(ctxRef.isAuthenticated).toBe(false);
    expect(ctxRef.user).toBeNull();
  });

  it('logout limpa estado após login', async () => {
    loginMock.mockResolvedValue({ ong: { id: 3, nome: 'ONGX' } });
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => expect(ctxRef.loading).toBe(false));
    await act(async () => { await ctxRef.login({}); });
    expect(ctxRef.isAuthenticated).toBe(true);
    await act(async () => { ctxRef.logout(); });
    expect(logoutMock).toHaveBeenCalled();
    expect(ctxRef.isAuthenticated).toBe(false);
    expect(ctxRef.user).toBeNull();
  });
});
