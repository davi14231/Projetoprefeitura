import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardPedidos } from '@/components/ui/CardPedidos.jsx';

function makeProps(overrides = {}) {
	return {
		imageUrl: 'http://example.com/pedidos.jpg',
		categoria: 'Alimentos',
		urgencia: 'Alta',
		ong: 'ONG Teste',
		titulo: 'Cesta Básica',
		quantidade: 12,
		descricao: 'Itens de alimentação essenciais',
		publicado: '10/08/2025',
		validade: new Date('2025-09-01T12:00:00Z').toISOString(),
		...overrides,
	};
}

describe('CardPedidos', () => {
	it('renderiza campos principais', () => {
		render(<CardPedidos {...makeProps()} />);
		expect(screen.getByText('ONG Teste')).toBeInTheDocument();
		expect(screen.getByText('Cesta Básica')).toBeInTheDocument();
		expect(screen.getByText('12')).toBeInTheDocument();
		expect(screen.getByText(/Publicado em 10\/08\/2025/)).toBeInTheDocument();
	});

	it('exibe badge de categoria e urgência Alta com classe vermelha', () => {
		render(<CardPedidos {...makeProps({ urgencia: 'Alta' })} />);
		const urg = screen.getByText('Alta');
		expect(urg.className).toMatch(/bg-red-100/);
		expect(screen.getByText('Alimentos')).toBeInTheDocument();
	});

	it('mapeia cores corretas para urgencia Média e Baixa', () => {
		const { unmount } = render(<CardPedidos {...makeProps({ urgencia: 'Média' })} />);
		const media = screen.getByText('Média');
		expect(media.className).toMatch(/bg-yellow-100/);
		unmount();
		render(<CardPedidos {...makeProps({ urgencia: 'Baixa' })} />);
		const baixa = screen.getByText('Baixa');
		expect(baixa.className).toMatch(/bg-green-100/);
	});

	it('formata validade ISO para pt-BR', () => {
		render(<CardPedidos {...makeProps()} />);
		// A data convertida deve aparecer como dd/mm/aaaa em pt-BR
		const validadeNode = screen.getByText(/Válido até/);
		expect(validadeNode.textContent).toMatch(/Válido até \d{2}\/\d{2}\/\d{4}/);
	});
});
