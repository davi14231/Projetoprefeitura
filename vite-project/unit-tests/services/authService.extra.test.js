import { describe, it, expect } from 'vitest';
import { authService } from '@/services/authService';
import Cookies from 'js-cookie';

describe('authService utilitários', () => {
  it('isAuthenticated false sem cookie', () => {
    Cookies.remove('auth_token');
    expect(authService.isAuthenticated()).toBe(false);
  });
  it('getCurrentUser null sem cookie', () => {
    Cookies.remove('user_data');
    expect(authService.getCurrentUser()).toBeNull();
  });
});
