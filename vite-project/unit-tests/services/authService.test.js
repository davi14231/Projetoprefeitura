import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '@/services/authService';
import api from '@/services/api';
import Cookies from 'js-cookie';

vi.mock('@/services/api');
vi.mock('js-cookie', () => ({
  default: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
  }
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe('authService', () => {
  it('login salva token e user nos cookies', async () => {
    api.post.mockResolvedValue({ data: { token:'abc', user:{ email:'a@a' } } });
    const r = await authService.login({ email:'a@a', password:'x' });
    expect(api.post).toHaveBeenCalledWith('/auth/login', { email_ong:'a@a', password:'x' });
    expect(Cookies.set).toHaveBeenCalledWith('auth_token','abc', expect.any(Object));
    expect(Cookies.set).toHaveBeenCalledWith('user_data', JSON.stringify({ email:'a@a' }), expect.any(Object));
    expect(r.token).toBe('abc');
  });

  it('login 401 gera mensagem específica', async () => {
    api.post.mockRejectedValue({ response:{ status:401 } });
    await expect(authService.login({ email:'e', password:'p'})).rejects.toThrow('Email ou senha incorretos');
  });

  it('login 400 gera mensagem específica', async () => {
    api.post.mockRejectedValue({ response:{ status:400 } });
    await expect(authService.login({ email:'', password:''})).rejects.toThrow('Email e senha são obrigatórios');
  });

  it('login 404 gera mensagem específica', async () => {
    api.post.mockRejectedValue({ response:{ status:404 } });
    await expect(authService.login({ email:'x', password:'y'})).rejects.toThrow('Endpoint de login não encontrado');
  });

  it('login ECONNREFUSED gera mensagem específica', async () => {
    api.post.mockRejectedValue({ code:'ECONNREFUSED' });
    await expect(authService.login({ email:'x', password:'y'})).rejects.toThrow('Não foi possível conectar ao servidor backend');
  });

  it('login sem token apenas avisa e retorna', async () => {
    api.post.mockResolvedValue({ data: { auth:true } });
    const r = await authService.login({ email:'n@a', password:'1'});
    expect(r).toEqual({ auth:true });
    // Nenhum token salvo
    expect(Cookies.set).not.toHaveBeenCalledWith('auth_token', expect.anything(), expect.anything());
  });

  it('logout remove cookies', () => {
    authService.logout();
    expect(Cookies.remove).toHaveBeenCalledWith('auth_token');
    expect(Cookies.remove).toHaveBeenCalledWith('user_data');
  });

  it('isAuthenticated retorna boolean', () => {
    Cookies.get.mockReturnValueOnce('tok');
    expect(authService.isAuthenticated()).toBe(true);
    Cookies.get.mockReturnValueOnce(undefined);
    expect(authService.isAuthenticated()).toBe(false);
  });

  it('getCurrentUser parseia user_data', () => {
    Cookies.get.mockReturnValueOnce(JSON.stringify({ x:1 }));
    expect(authService.getCurrentUser()).toEqual({ x:1 });
    Cookies.get.mockReturnValueOnce(undefined);
    expect(authService.getCurrentUser()).toBeNull();
  });

  it('getToken retorna token', () => {
    Cookies.get.mockReturnValueOnce('tt');
    expect(authService.getToken()).toBe('tt');
  });
});
