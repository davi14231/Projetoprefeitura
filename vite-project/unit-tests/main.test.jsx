import { it, expect, vi } from 'vitest';

it('monta aplicação sem erros', async () => {
  const renderSpy = vi.fn();
  const createRootMock = vi.fn(() => ({ render: renderSpy }));
  vi.doMock('react-dom/client', () => ({
    createRoot: createRootMock
  }));
  // preparar root
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
  await import('@/main.jsx');
  expect(createRootMock).toHaveBeenCalled();
  expect(renderSpy).toHaveBeenCalled();
  document.body.removeChild(div);
});
