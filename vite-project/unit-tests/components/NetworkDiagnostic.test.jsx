import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NetworkDiagnostic from '@/components/NetworkDiagnostic.jsx';

describe('NetworkDiagnostic', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('cobre falhas em todas as baseUrls e diferentes respostas de login (404,401,400) e CORS sucesso', async () => {
    const fetchSequence = [];
    // 4 falhas de baseUrls
    fetchSequence.push(...Array(4).fill(() => Promise.reject(new Error('fail base'))));
    // 3 endpoints login: 404, 401, 400
    fetchSequence.push(
      () => Promise.resolve({ status: 404, text: () => Promise.resolve('nf') }),
      () => Promise.resolve({ status: 401, text: () => Promise.resolve('unauth') }),
      () => Promise.resolve({ status: 400, text: () => Promise.resolve('bad') }),
    );
    // CORS sucesso 204
    fetchSequence.push(() => Promise.resolve({ status: 204 }));

    global.fetch = vi.fn().mockImplementation(() => {
      const impl = fetchSequence.shift();
      return impl ? impl() : Promise.resolve({ status: 200, text: () => Promise.resolve('ok') });
    });

    render(<NetworkDiagnostic />);
    fireEvent.click(screen.getByRole('button', { name: /Testar Conexão/i }));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4 + 3 + 1));
    // Verifica presença de mensagens de cada status
    await waitFor(() => {
      expect(screen.getByText(/404 - Endpoint não existe/)).toBeInTheDocument();
      expect(screen.getByText(/401 = credenciais inválidas/)).toBeInTheDocument();
      expect(screen.getByText(/400 = dados inválidos/)).toBeInTheDocument();
      expect(screen.getByText(/CORS: 204/)).toBeInTheDocument();
    });
  });

  it('cobre sucesso rápido em baseUrl, login 200 e status desconhecido + CORS falha', async () => {
    const fetchSequence = [];
    // baseUrls: primeira sucesso (200) - não chama restantes
    fetchSequence.push(() => Promise.resolve({ status: 200 }));
    // login endpoints (3): 200, 500, 401 (para reutilizar branch 401 novamente sem problema)
    fetchSequence.push(
      () => Promise.resolve({ status: 200, text: () => Promise.resolve('TOKEN') }),
      () => Promise.resolve({ status: 500, text: () => Promise.resolve('err interno grande texto aqui') }),
      () => Promise.resolve({ status: 401, text: () => Promise.resolve('unauth') }),
    );
    // CORS falha
    fetchSequence.push(() => Promise.reject(new Error('cors blocked')));

    global.fetch = vi.fn().mockImplementation(() => {
      const impl = fetchSequence.shift();
      return impl ? impl() : Promise.resolve({ status: 200, text: () => Promise.resolve('ok') });
    });

    render(<NetworkDiagnostic />);
    fireEvent.click(screen.getByRole('button', { name: /Testar Conexão/i }));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1 + 3 + 1));
    await waitFor(() => {
      expect(screen.getByText(/Login funcionou/)).toBeInTheDocument();
      expect(screen.getByText(/⚠️ Status 500/)).toBeInTheDocument();
      expect(screen.getByText(/CORS problema/)).toBeInTheDocument();
    });
  });

  it('força erro geral antes dos testes internos', async () => {
    global.fetch = vi.fn(() => { throw new Error('general boom'); });
    render(<NetworkDiagnostic />);
    fireEvent.click(screen.getByRole('button', { name: /Testar Conexão/i }));
    await waitFor(() => {
      // Deve registrar falhas para todas as baseUrls
      expect(screen.getByText(/http:\/\/localhost:3000: general boom/)).toBeInTheDocument();
      expect(screen.getByText(/CORS problema: general boom/)).toBeInTheDocument();
    });
  });
});
