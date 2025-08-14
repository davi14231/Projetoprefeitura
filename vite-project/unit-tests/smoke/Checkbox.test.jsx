import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Checkbox } from '@/components/ui/checkbox.jsx';

// Radix usa data-state="checked" – testamos render básico e prop disabled

describe('Checkbox', () => {
  it('renderiza desabilitado', () => {
    const { container } = render(<Checkbox disabled />);
    const root = container.querySelector('[data-slot="checkbox"]');
    expect(root).toBeInTheDocument();
    expect(root?.getAttribute('disabled')).not.toBeNull();
  });
});
