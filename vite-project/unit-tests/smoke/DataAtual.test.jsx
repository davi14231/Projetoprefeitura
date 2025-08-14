import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { DataAtual } from '@/components/ui/TempoRestante.jsx';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('DataAtual', () => {
  it('atualiza segundos após avanço de tempo', () => {
    const { container } = render(<DataAtual />);
    const span = container.querySelector('span');
    const inicial = span.textContent;
    act(() => {
      vi.advanceTimersByTime(2000); // 2 ticks de 1s garantem alteração
    });
    const atualizado = span.textContent;
    expect(atualizado).not.toBe(inicial);
  });
});
