import './setup';
import { expect } from 'vitest';

// Matcher mínimo substituindo toBeInTheDocument
expect.extend({
	toBeInTheDocument(received) {
		const pass = received !== null && received !== undefined;
		return {
			pass,
			message: () => pass ? 'element is in the document' : 'expected element to be in the document'
		};
	}
});
