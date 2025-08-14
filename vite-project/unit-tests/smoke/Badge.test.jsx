import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge.jsx';

describe('Badge', () => {
  it('renderiza children e classes extras', () => {
    render(<Badge className="extra">Texto</Badge>);
    const el = screen.getByText('Texto');
    expect(el).toBeInTheDocument();
    expect(el.className).toContain('extra');
  });
});
