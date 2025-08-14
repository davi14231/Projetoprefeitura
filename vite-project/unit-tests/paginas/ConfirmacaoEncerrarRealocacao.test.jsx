import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmacaoEncerrarRealocacao from '@/components/ui/paginas/ConfirmacaoEncerrarRealocacao.jsx';

describe('ConfirmacaoEncerrarRealocacao', () => {
  it('aciona callbacks encerrar e cancelar', () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    render(<ConfirmacaoEncerrarRealocacao onCancel={onCancel} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText('Cancelar'));
    fireEvent.click(screen.getByText('Encerrar'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
