import React, { useState } from "react";
import { Headeredicao } from "@/components/ui/layouts/Headeredicao";
import { Footer } from "@/components/ui/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmacaoEncerrarRealocacao from "./ConfirmacaoEncerrarRealocacao";

const footerColor = "#172233";

const destaques = [
	{ id: 1, titulo: "", img: "/imagens/medicamentos.jpg" },
	{ id: 2, titulo: "", img: "/imagens/roupas.jpg" },
	{ id: 3, titulo: "", img: "/imagens/moveis.jpg" },
	{ id: 4, titulo: "", img: "/imagens/ferramentas.jpg" },
	{ id: 5, titulo: "", img: "/imagens/alimentos.jpg" },
	{ id: 6, titulo: "", img: "/imagens/outros.jpg" },
];

const pedidos = [
	{
		id: 1,
		imageUrl: "/imagens/medf.jpg",
		titulo: "Medicamentos e Fraldas",
		publicado: "19/12/24",
		tempoRestante: "1 dia",
		descricao: "Possuímos medicamentos e fraldas disponíveis para realocar.",
		botao: "Encerrar Solicitação",
		editar: true,
		excluir: false,
	},
	{
		id: 2,
		imageUrl: "/imagens/prodhig.jpg",
		titulo: "Produtos de Higiene",
		publicado: "11/03/24",
		tempoRestante: "30 dias",
		descricao: "Temos diversos produtos de higiene prontos para realocação.",
		botao: "Encerrar Solicitação",
		editar: true,
		excluir: false,
	},
	{
		id: 3,
		imageUrl: "/imagens/roupas.jpg",
		titulo: "Camisetas",
		publicado: "12/06/24",
		tempoRestante: "47 dias",
		descricao: "Possuímos camisetas para doar.",
		botao: "Encerrar Solicitação",
		editar: false,
		excluir: true,
	},
];

function HomeRealocacao(props) {
	const navigate = useNavigate();
	const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);

	// Prevent background scroll when modal is open
	React.useEffect(() => {
		if (showConfirmacaoModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [showConfirmacaoModal]);

	// Abrir modal ConfirmacaoEncerrarRealocacao
	const handleOpenConfirmacaoModal = () => {
		setShowConfirmacaoModal(true);
	};

	// Fechar modal ConfirmacaoEncerrarRealocacao
	const handleCloseConfirmacaoModal = () => {
		setShowConfirmacaoModal(false);
	};

	// Confirmar encerramento da realocação
	const handleConfirmEncerramento = () => {
		// Aqui você pode adicionar a lógica para encerrar a realocação
		setShowConfirmacaoModal(false);
		// Exemplo: remover o item da lista ou atualizar status
	};

	return (
		<div className="bg-[#fafbfc] min-h-screen flex flex-col">
		<Headeredicao />
			<main className="flex-1">
				{/* Título e CTA */}
				<section className="max-w-6xl mx-auto py-10 px-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
						Doe itens para outras ONGs
					</h1>
					<p className="text-gray-700 mb-8 text-lg">
						Tem um item sobrando? Anuncie aqui e ajude outra organização parceira
						que está precisando.
					</p>
					<button
						className="bg-[#172233] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#22304d] transition"
						style={{ backgroundColor: footerColor }}
						onClick={() => navigate("/realocacao-listagem")}
					>
						Ver todos os itens para realocação
					</button>
				</section>

				{/* Destaques */}
				<section className="max-w-6xl mx-auto px-4 mb-2">
					<div className="flex flex-col">
						<div className="flex gap-6 justify-between pb-2">
							{destaques.map((item) => (
								<div
									key={item.id}
									className="flex flex-col items-center flex-1"
								>
									<img
										src={item.img}
										alt={item.titulo}
										className="w-52 h-32 object-contain rounded-lg"
									/>
									<span className="mt-2 text-sm font-medium text-gray-700 text-center">
										{item.titulo}
									</span>
								</div>
							))}
						</div>
						<div className="flex justify-between items-center mt-2">
							<button
								className="w-1/2 text-center text-sm font-medium bg-neutral-100 py-2 rounded-l-lg hover:bg-neutral-200 transition cursor-pointer"
								onClick={() => navigate("/edit-doacoes")}
							>
								Solicitações postadas
							</button>
							<button
								className="w-1/2 text-center text-sm font-medium bg-neutral-100 py-2 rounded-r-lg hover:bg-neutral-200 transition"
								onClick={props.onRealocacoesClick}
							>
								Realocações postadas
							</button>
						</div>
					</div>
				</section>

				{/* Bloco informativo */}
				<section className="max-w-6xl mx-auto px-4 mb-6">
					<Card className="w-full bg-white border">
						<CardContent className="py-6 px-8">
							<h2 className="text-lg font-bold text-gray-800 mb-2">
								Otimize Seu Estoque: Doe Excedentes!
							</h2>
							<p className="text-gray-700 mb-4 text-base">
								Se sua ONG possui itens que podem beneficiar outras instituições,
								utilize nossa plataforma para ampliar o impacto da sua
								solidariedade.
							</p>
							<button
								className="bg-[#172233] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22304d] transition flex items-center gap-2"
								style={{ backgroundColor: footerColor }}
								onClick={() => navigate("/postagem-realocacao")}
							>
								+ Adicionar Nova Realocação
							</button>
						</CardContent>
					</Card>
				</section>

				{/* Listagem de pedidos */}
				<section className="max-w-6xl mx-auto px-4 mb-8">
					<Card className="w-full bg-white border">
						<CardContent className="py-6 px-8">
							<div className="flex flex-col gap-6">
								{pedidos.map((pedido) => (
									<div
										key={pedido.id}
										className="flex items-start gap-4 border-b pb-6 last:border-b-0 last:pb-0"
									>
										<img
											src={pedido.imageUrl}
											alt={pedido.titulo}
											className="w-16 h-16 object-cover rounded-lg border mt-1"
										/>
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<span className="font-semibold text-lg text-gray-800">
													{pedido.titulo}
												</span>
												<button className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-neutral-100">
													<Edit2 className="w-4 h-4" /> Editar
												</button>
											</div>
											<div className="text-sm text-gray-500 mt-1 flex items-center gap-4">
												<span>Publicado: {pedido.publicado}</span>
												<span className="flex items-center gap-1">
													<svg
														width="16"
														height="16"
														fill="none"
														stroke="currentColor"
														strokeWidth="1.5"
														className="inline-block"
													>
														<circle cx="8" cy="8" r="7" />
														<path d="M8 4v4l2 2" />
													</svg>
													Tempo restante: {pedido.tempoRestante}
												</span>
											</div>
											<div className="mt-2 text-gray-700 text-base flex items-center justify-between">
												<span>{pedido.descricao}</span>
					<button
						className="bg-[#172233] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22304d] transition ml-4"
						style={{ backgroundColor: footerColor }}
						onClick={handleOpenConfirmacaoModal}
					>
						{pedido.botao}
					</button>
											</div>
										</div>
									</div>
								))}
							</div>
							{/* Paginação */}
							<div className="flex justify-center items-center gap-2 mt-8">
								<button
									className="w-8 h-8 rounded bg-[#172233] text-white font-bold"
									style={{ backgroundColor: footerColor }}
								>
									1
								</button>
								<button className="w-8 h-8 rounded text-neutral-900 font-bold hover:bg-neutral-200">
									2
								</button>
								<button className="w-8 h-8 rounded text-neutral-900 font-bold hover:bg-neutral-200">
									3
								</button>
								<span className="px-2 text-neutral-500 font-bold">...</span>
								<button className="w-8 h-8 rounded text-neutral-900 font-bold hover:bg-neutral-200">
									7
								</button>
								<button className="w-8 h-8 rounded text-neutral-900 font-bold hover:bg-neutral-200">
									8
								</button>
							</div>
						</CardContent>
					</Card>
				</section>
			</main>
			<Footer />

			{/* Modal ConfirmacaoEncerrarRealocacao */}
			{showConfirmacaoModal && (
				<ConfirmacaoEncerrarRealocacao 
					onCancel={handleCloseConfirmacaoModal}
					onConfirm={handleConfirmEncerramento}
				/>
			)}
		</div>
	);
}

export { HomeRealocacao };
export default HomeRealocacao;