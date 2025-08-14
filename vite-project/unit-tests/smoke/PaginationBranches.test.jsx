import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/ui/Pagination.jsx';

// Testar cenários: poucas páginas, ellipsis início, meio, fim

describe('Pagination branches', () => {
  it('esconde quando totalPages <=1', () => {
    const { container } = render(<MemoryRouter><Pagination currentPage={1} totalPages={1} /></MemoryRouter>);
    expect(container.firstChild).toBeNull();
  });
  it('renderiza todas quando <=7', () => {
    render(<MemoryRouter><Pagination currentPage={3} totalPages={5} baseUrl="/x" /></MemoryRouter>);
    expect(screen.getByText('3')).toHaveClass('bg-blue-600');
  });
  it('ellipsis final quando no início', () => {
    render(<MemoryRouter initialEntries={['/x?page=2']}><Pagination currentPage={2} totalPages={12} baseUrl="/x" /></MemoryRouter>);
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });
  it('ellipsis início e fim quando meio', () => {
    render(<MemoryRouter initialEntries={['/x?page=6']}><Pagination currentPage={6} totalPages={12} baseUrl="/x" /></MemoryRouter>);
    expect(screen.getAllByText('...').length).toBe(2);
  });
  it('ellipsis início quando perto do fim', () => {
    render(<MemoryRouter initialEntries={['/x?page=11']}><Pagination currentPage={11} totalPages={12} baseUrl="/x" /></MemoryRouter>);
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });
  it('botões anterior/próximo desabilitados nos limites', () => {
    render(<MemoryRouter><Pagination currentPage={1} totalPages={9} baseUrl="/x" /></MemoryRouter>);
    expect(screen.getByText('‹ Anterior')).toBeDisabled();
  });
});
