import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from '@/components/ui/Pagination.jsx';

describe('Pagination', () => {
  it('renderiza botoes de pagina quando totalPages > 1', () => {
    render(
      <MemoryRouter initialEntries={['/itens?page=2']}> 
        <Pagination currentPage={2} totalPages={5} />
      </MemoryRouter>
    );
    expect(screen.getByText('‹ Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próximo ›')).toBeInTheDocument();
  });
});
