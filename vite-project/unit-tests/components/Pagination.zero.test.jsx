import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from '@/components/ui/Pagination.jsx';

// totalPages = 0 deve acionar retorno null (linha de guarda ainda descoberta)

describe('Pagination totalPages=0 early return', () => {
  it('não renderiza nada quando totalPages=0', () => {
    const { container } = render(
      <MemoryRouter>
        <Pagination totalPages={0} currentPage={1} onPageChange={() => {}} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });
});
