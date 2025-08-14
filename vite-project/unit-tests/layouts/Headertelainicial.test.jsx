import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeaderTelainicial } from '@/components/ui/layouts/Headertelainicial.jsx';

describe('HeaderTelainicial', () => {
  it('exibe logo e botao Entrar como ONG', () => {
    render(
      <MemoryRouter>
        <HeaderTelainicial />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/Recife Prefeitura/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar como ONG/i)).toBeInTheDocument();
  });
});
