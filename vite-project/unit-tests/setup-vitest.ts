// Vitest setup isolado fora de src para não ir ao bundle
// Matcher mínimo
import { expect } from 'vitest';

expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined;
    return { pass, message: () => pass ? 'element is in the document' : 'expected element to be in the document' };
  }
});

// Mocks utilitários
class ResizeObserverMock { observe(){} unobserve(){} disconnect(){} }
// @ts-ignore
global.ResizeObserver = global.ResizeObserver || ResizeObserverMock;
// @ts-ignore
global.window.scrollTo = global.window.scrollTo || (()=>{});
