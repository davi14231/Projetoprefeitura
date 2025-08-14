import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useData } from '@/context/DataContext.jsx';

// Cobre linhas 43-45: erro ao usar fora do provider

describe('useData fora do provider', () => {
  it('lança erro explicativo', () => {
    const { result } = renderHook(() => {
      try {
        useData();
        return { error: null };
      } catch (e) {
        return { error: e };
      }
    });
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toMatch(/DataProvider/);
  });
});
