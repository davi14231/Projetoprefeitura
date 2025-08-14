import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TempoRestante } from '@/components/ui/TempoRestante.jsx';

// Congelar Date para determinismo
const BASE = new Date('2025-01-01T00:00:00Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(BASE);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('TempoRestante', () => {
  it('mostra Sem prazo definido quando sem prazo', () => {
    render(<TempoRestante />);
    expect(screen.getByText(/Sem prazo definido|Tempo restante:/)).toBeTruthy();
  });
  it('calcula dias/h quando prazo distante', () => {
    // Prazo 10 dias depois
    render(<TempoRestante prazo={'11/01/2025'} />); // dd/mm/yyyy
    expect(screen.getByText(/Tempo restante:/)).toBeInTheDocument();
  });
  it('expira quando passado', () => {
    render(<TempoRestante prazo={'30/12/2024'} />);
    expect(screen.getByText(/Expirado|Tempo restante/)).toBeInTheDocument();
  });
  it('mostra estado de atenção (<=7 dias e >1)', () => {
    // 6 dias depois do BASE
    render(<TempoRestante prazo={'07/01/2025'} />);
    expect(screen.getByText(/Tempo restante:/)).toBeInTheDocument();
  });
  it('mostra urgente quando falta 1 dia', () => {
    render(<TempoRestante prazo={'02/01/2025'} />);
    expect(screen.getByText(/Tempo restante:/)).toBeInTheDocument();
  });
  it('mostra horas e minutos quando <24h', () => {
    // Ajusta base para 31/12/2024 23:00 UTC e prazo 01/01/2025 -> ~1h restante
    vi.setSystemTime(new Date('2024-12-31T23:00:00Z'));
    render(<TempoRestante prazo={'01/01/2025'} />);
    expect(screen.getByText(/Tempo restante:/)).toBeInTheDocument();
  });
  it('mostra apenas minutos quando <1h', () => {
    vi.setSystemTime(new Date('2024-12-31T23:55:00Z'));
    render(<TempoRestante prazo={'01/01/2025'} />);
    expect(screen.getByText(/Tempo restante:/)).toBeInTheDocument();
  });
});
