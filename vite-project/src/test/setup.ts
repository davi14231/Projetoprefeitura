// Setup compartilhado sem jest-dom (evita conflito com Playwright)

// Silence resize observer missing in jsdom for components that might use it later
class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}
// @ts-ignore
global.ResizeObserver = global.ResizeObserver || ResizeObserverMock;

// Mock scrollTo to avoid errors
// @ts-ignore
window.scrollTo = window.scrollTo || (() => {});
