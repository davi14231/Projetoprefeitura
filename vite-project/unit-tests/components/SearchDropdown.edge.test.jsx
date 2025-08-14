import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SearchDropdown } from '@/components/ui/SearchDropdown';
import { DataProvider } from '@/context/DataContext';
import { BrowserRouter } from 'react-router-dom';

describe('SearchDropdown early return', () => {
  it('não renderiza com termo curto', () => {
    const { container } = render(<BrowserRouter><DataProvider><SearchDropdown searchTerm='a' onClose={()=>{}} /></DataProvider></BrowserRouter>);
    expect(container.firstChild).toBeNull();
  });
});
