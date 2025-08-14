import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('@/components/ui/botao', () => ({ Botao: (p) => <button {...p} /> }));
vi.mock('@/components/ui/card', () => ({
  Card: ({ children }) => <div>{children}</div>,
  CardContent: ({ children }) => <div>{children}</div>,
  CardDescription: ({ children }) => <div>{children}</div>,
  CardHeader: ({ children }) => <div>{children}</div>,
  CardTitle: ({ children }) => <div>{children}</div>
}));
vi.mock('@/components/ui/input', () => ({ Input: (p) => <input {...p} /> }));
vi.mock('@/components/ui/label', () => ({ Label: (p) => <label {...p} /> }));
vi.mock('@/components/ui/checkbox', () => ({ Checkbox: (p) => <input type="checkbox" {...p} /> }));
vi.mock('@/components/NetworkDiagnostic', () => ({ default: () => <div data-testid="network" /> }));

const loginMock = vi.fn();
vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ login: loginMock }) }));

const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => navigateMock };
});

const alertMock = vi.fn();
global.alert = alertMock;

import { Teladelogin } from '@/components/ui/paginas/Teladelogin.jsx';

const renderLogin = () => render(
  <MemoryRouter initialEntries={['/login']}>
    <Routes>
      <Route path="/login" element={<Teladelogin />} />
    </Routes>
  </MemoryRouter>
);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Teladelogin', () => {
  it('realiza login com sucesso e navega', async () => {
    loginMock.mockResolvedValueOnce({ token: 'ok' });
    renderLogin();
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@test.com' }});
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '123456' }});
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    await waitFor(() => expect(loginMock).toHaveBeenCalled());
    expect(navigateMock).toHaveBeenCalledWith('/home-ong');
  });

  it('exibe erro quando login falha', async () => {
    loginMock.mockRejectedValueOnce(new Error('Credenciais inválidas'));
    renderLogin();
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@test.com' }});
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'err' }});
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    await waitFor(() => expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument());
  });

  it('botao de teste preenche credenciais', () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: /credenciais de teste/i }));
    expect(screen.getByLabelText('Email').value).toBe('ong1@gmail.com');
    expect(screen.getByLabelText('Senha').value).toBe('123456');
  });

  it('botao criar conta dispara alert', () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: 'Criar Conta' }));
    expect(alertMock).toHaveBeenCalled();
  });
});
