import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmacaoEncerrarSolicitacao from '@/components/ui/paginas/ConfirmacaoEncerrarSolicitacao.jsx';

describe('ConfirmacaoEncerrarSolicitacao', () => {
  it('aciona callbacks encerrar e cancelar', () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    render(<ConfirmacaoEncerrarSolicitacao onCancel={onCancel} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText('Cancelar'));
    fireEvent.click(screen.getByText('Encerrar'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
