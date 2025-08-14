import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Pagination } from '@/components/ui/Pagination';

function setup(startUrl='/base?page=2', props) {
  const onPageChange = vi.fn();
  const ui = render(
    <MemoryRouter initialEntries={[startUrl]}>
      <Routes>
        <Route path="/base" element={<Pagination {...props} onPageChange={onPageChange} baseUrl="/base" />} />
      </Routes>
    </MemoryRouter>
  );
  return { ...ui, onPageChange };
}

describe('Pagination extra branches', () => {
  it('não renderiza se totalPages <= 1', () => {
    const { container } = render(<MemoryRouter><Pagination currentPage={1} totalPages={1} /></MemoryRouter>);
    expect(container.firstChild).toBeNull();
  });

  it('não chama onPageChange ao clicar Anterior na página 1', () => {
    const { getByText, onPageChange } = setup('/base?page=1', { currentPage:1, totalPages:5 });
    fireEvent.click(getByText('‹ Anterior'));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('gera elipses quando muitas páginas (meio)', () => {
    const { getByText, queryAllByText } = setup('/base?page=6', { currentPage:6, totalPages:12 });
    expect(queryAllByText('...').length).toBe(2);
    fireEvent.click(getByText('7'));
  });
});
