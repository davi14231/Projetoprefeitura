import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '@/components/ui/layouts/Footer.jsx';
import { AuthProvider } from '@/context/AuthContext.jsx';

// Smoke test simples

describe('Footer', () => {
  it('renderiza logo e links básicos', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Footer />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByAltText(/Recife Prefeitura/i)).toBeInTheDocument();
    expect(screen.getByText('Portal')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
  });
});
