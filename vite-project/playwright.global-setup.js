export default async () => {
  try {
    // Remove qualquer expect injetado previamente (ex.: vitest) para evitar conflito
    if (globalThis.expect && globalThis.expect._expectVitest) {
      delete globalThis.expect;
    }
    // Também remove símbolo interno se existir
    const sym = Object.getOwnPropertySymbols(globalThis).find(s => String(s).includes('$$jest-matchers-object'));
    if (sym) {
      try { delete globalThis[sym]; } catch {}
    }
  } catch {}
};
