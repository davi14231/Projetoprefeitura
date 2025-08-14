import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testarBackend } from '@/utils/testeConectividade';

// Mock fetch
const mockFetch = vi.fn();

// Helper para criar Response-like
const res = (status, body, opts={}) => ({
  status,
  text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
  json: () => Promise.resolve(body),
  headers: opts.headers || new Map()
});

describe('testeConectividade', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = mockFetch;
  });

  it('fluxo completo com sucesso parcial', async () => {
    mockFetch
      // baseUrl
      .mockResolvedValueOnce(res(200, 'OK'))
      // login 401
      .mockResolvedValueOnce(res(401, { message: 'Unauthorized'}))
      // doacoes 200
      .mockResolvedValueOnce(res(200, [{ id:1 }]))
      // CORS OPTIONS
      .mockResolvedValueOnce(res(204, '', { headers: new Map([['Access-Control-Allow-Origin','*']]) }));

    await testarBackend();
    expect(mockFetch).toHaveBeenCalledTimes(4);
    expect(mockFetch.mock.calls[1][0]).toMatch(/auth\/login/);
    expect(mockFetch.mock.calls[2][0]).toMatch(/\/doacoes$/);
  });

  it('interrompe se backend base falha', async () => {
    mockFetch.mockRejectedValueOnce(new Error('fail base'));
    await testarBackend();
    // Não deve tentar endpoints seguintes
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
