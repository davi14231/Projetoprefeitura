import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Pagination } from '@/components/ui/Pagination.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('Pagination null render', () => {
  it('não renderiza quando totalPages <= 1', () => {
    const { container } = render(<MemoryRouter><Pagination currentPage={1} totalPages={1} /></MemoryRouter>);
    expect(container.firstChild).toBeNull();
  });
});
