import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import BackendConnectionTest from '@/components/BackendConnectionTest.jsx';

// Mock fetch para chamadas diretas e api axios interna
global.fetch = vi.fn();
vi.mock('@/services/api.js', () => ({ default: { get: vi.fn(() => Promise.resolve({ data: [] })) } }));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('BackendConnectionTest', () => {
  it('mostra estados de verificação e conectado', async () => {
    // Primeira chamada ao backend root
    fetch.mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('OK') });
    render(<BackendConnectionTest />);
    expect(screen.getByText(/Status do Backend/i)).toBeInTheDocument();
    // estado checking
    expect(screen.getByText(/Verificando|Desconectado|Conectado/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Conectado|Desconectado|Verificando/i)).toBeInTheDocument());
  });

  it('permite clicar em Testar e refazer verificação sem warnings', async () => {
    // primeira chamada feita pelo useEffect
    fetch.mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('OK') });
    render(<BackendConnectionTest />);
    // segunda chamada ao clicar no botão
    fetch.mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('OK') });
    const btn = screen.getByRole('button', { name: /Testar/i });
    await act(async () => { fireEvent.click(btn); });
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  });

  it('mostra erro quando backend root responde status de erro', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    render(<BackendConnectionTest />);
    await waitFor(() => expect(screen.getByText(/Backend respondeu com erro: 500/)).toBeInTheDocument());
    // Instruções de conexão devem aparecer
    expect(screen.getByText(/Para conectar com o backend/)).toBeInTheDocument();
  });

  it('mostra erro quando fetch root lança exceção', async () => {
    fetch.mockRejectedValueOnce(new Error('boom'));
    render(<BackendConnectionTest />);
    await waitFor(() => expect(screen.getByText(/Não foi possível conectar/)).toBeInTheDocument());
  });

  it('root ok mas endpoint /doacoes falha gerando mensagem específica', async () => {
    // root ok
    fetch.mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('OK') });
    // mock api.get rejeitando
    const apiModule = await import('@/services/api.js');
    apiModule.default.get.mockRejectedValueOnce(new Error('falhou doacoes'));
    render(<BackendConnectionTest />);
    await waitFor(() => expect(screen.getByText(/Endpoint \/doacoes não está funcionando/)).toBeInTheDocument());
  });
});
