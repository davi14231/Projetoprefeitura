import React from 'react';
import { render } from '@testing-library/react';

// Wrapper simples sem providers complexos para evitar conflitos
const SimpleWrapper = ({ children }) => {
  return <div>{children}</div>;
};

// Re-export da função render com wrapper simples
const customRender = (ui, options) =>
  render(ui, { wrapper: SimpleWrapper, ...options });

// Re-export de tudo do testing-library
export * from '@testing-library/react';

// Override da função render
export { customRender as render };