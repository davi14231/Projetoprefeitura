import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from '@/components/ui/Pagination.jsx';

describe('Pagination single page early return', () => {
  it('retorna null quando totalPages=1', () => {
    const { container } = render(
      <MemoryRouter>
        <Pagination totalPages={1} currentPage={1} onPageChange={() => {}} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });
});
