import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataSourceIndicator } from '@/components/DataSourceIndicator.jsx';

// Mock configurável do hook useData
const mockUseData = vi.fn();
vi.mock('@/context/DataContext', () => ({
  useData: () => mockUseData()
}));

beforeEach(() => {
  mockUseData.mockReset();
});

describe('DataSourceIndicator', () => {
  it('exibe status conectado', () => {
    mockUseData.mockReturnValue({ apiConnected: true, checkApiConnection: vi.fn() });
    render(<DataSourceIndicator />);
    expect(screen.getByText(/API Conectada/)).toBeInTheDocument();
  });
  it('aciona verificação ao clicar botão', () => {
    const mockFn = vi.fn();
    mockUseData.mockReturnValue({ apiConnected: false, checkApiConnection: mockFn });
    render(<DataSourceIndicator />);
    fireEvent.click(screen.getByRole('button', { name: /Verificar Conexão/i }));
    expect(mockFn).toHaveBeenCalled();
  });
});
