import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Headeredicao } from '@/components/ui/layouts/Headeredicao';
import { AuthProvider } from '@/context/AuthContext';

vi.mock('@/components/ui/SearchDropdown', () => ({
  SearchDropdown: ({ onClose }) => <div data-testid='sd' onClick={onClose}>SD</div>
}));

describe('Headeredicao interações', () => {
  it('abre e fecha dropdown da ONG por hover', async () => {
  const { getByText, queryByText } = render(<MemoryRouter><AuthProvider><Headeredicao /></AuthProvider></MemoryRouter>);
    const trigger = getByText('Minha ONG');
    fireEvent.mouseEnter(trigger.parentElement.parentElement);
    expect(queryByText('Instituto Beneficente')).toBeTruthy();
    fireEvent.mouseLeave(trigger.parentElement.parentElement);
    await waitFor(()=>{ expect(queryByText('Instituto Beneficente')).toBeNull(); });
  });
  it('mostra SearchDropdown ao digitar >=2 e fecha ao clicar nele', () => {
  const { getByPlaceholderText, getByTestId, queryByTestId } = render(<MemoryRouter><AuthProvider><Headeredicao /></AuthProvider></MemoryRouter>);
    const input = getByPlaceholderText(/Pesquisar necessidades/);
    fireEvent.change(input, { target:{ value:'ab' } });
    expect(getByTestId('sd')).toBeTruthy();
    fireEvent.click(getByTestId('sd'));
    expect(queryByTestId('sd')).toBeNull();
  });
});
