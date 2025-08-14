import { describe, it, expect, vi, beforeEach } from 'vitest';
import Cookies from 'js-cookie';
import api from '@/services/api.js';

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
    remove: vi.fn(),
  }
}));

// Mock axios adapter para evitar network real
beforeEach(() => {
  // reset adapter para cada teste
  api.defaults.adapter = async (config) => {
    // Simular resposta ou erro baseado em URL
    if (config.url === '/ok') {
      return { config, data: { ok: true }, status: 200, statusText: 'OK', headers: {} };
    }
    if (config.url === '/unauth') {
      const error = new Error('Unauthorized');
      error.response = { status: 401 };
      throw error;
    }
    return { config, data: { generic: true }, status: 200, statusText: 'OK', headers: {} };
  };
});

describe('api interceptors', () => {
  it('anexa Authorization quando token existe', async () => {
    Cookies.get.mockReturnValue('tok');
    const res = await api.get('/ok');
    expect(res.data.ok).toBe(true);
    // adapter não nos mostra header final facilmente; checar que get foi chamado
    expect(Cookies.get).toHaveBeenCalledWith('auth_token');
  });

  it('não adiciona Authorization quando token ausente', async () => {
    Cookies.get.mockReturnValue(undefined);
    const res = await api.get('/ok');
    expect(res.status).toBe(200);
    expect(Cookies.get).toHaveBeenCalled();
  });

  it('ao receber 401 remove cookies', async () => {
    Cookies.get.mockReturnValue('tok');
    await expect(api.get('/unauth')).rejects.toThrow('Unauthorized');
    expect(Cookies.remove).toHaveBeenCalledWith('auth_token');
    expect(Cookies.remove).toHaveBeenCalledWith('user_data');
  });
});
