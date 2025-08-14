import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmacaoDeletar from '@/components/ui/paginas/ConfirmacaoDeletar.jsx';

describe('ConfirmacaoDeletar', () => {
  it('aciona callbacks ao confirmar e cancelar', () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    const onDelete = vi.fn();
    render(<ConfirmacaoDeletar tipo="doacao" onCancel={onCancel} onConfirm={onConfirm} onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId('cancelar-excluir'));
    fireEvent.click(screen.getByTestId('confirmar-excluir'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
