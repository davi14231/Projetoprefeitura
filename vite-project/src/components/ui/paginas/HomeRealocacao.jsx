import React, { useState, useEffect } from "react";
import { Headeredicao } from "../layouts/Headeredicao";
import { Footer } from "../layouts/Footer";
import { Card, CardContent } from "../card";
import { Edit2, X, Facebook } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmacaoEncerrarRealocacao from "./ConfirmacaoEncerrarRealocacao";
import { PostagemRealocacao } from "./PostagemRealocacao";
import { useData } from "../../../context/DataContext";
import { Pagination } from "../Pagination";

const footerColor = "#172233";

const destaques = [
	{ id: 1, titulo: "Medicamentos", img: "/imagens/medicamentos.jpg", categoria: "Medicamentos" },
	{ id: 2, titulo: "Roupas", img: "/imagens/roupas.jpg", categoria: "Roupas" },
	{ id: 3, titulo: "Móveis", img: "/imagens/moveis.jpg", categoria: "Móveis" },
	{ id: 4, titulo: "Equipamento", img: "/imagens/ferramentas.jpg", categoria: "Equipamento" },
	{ id: 5, titulo: "Alimentos", img: "/imagens/alimentos.jpg", categoria: "Alimentos" },
	{ id: 6, titulo: "Outros", img: "/imagens/outros.jpg", categoria: "Outros" },
];

function HomeRealocacao() {
	const navigate = useNavigate();
	const location = useLocation();
	const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
	const [showPostagemModal, setShowPostagemModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const { getRealocacoesPaginadas } = useData();

	const itemsPerPage = 6;

	// Efeito para ler parâmetros da URL e definir página atual
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const page = parseInt(searchParams.get('page')) || 1;
		setCurrentPage(page);
	}, [location.search]);

	// Obter dados paginados usando Context
	const paginatedData = getRealocacoesPaginadas({
		page: currentPage,
		limit: itemsPerPage,
		filters: {}
	});

	// Prevent background scroll when modal is open
	React.useEffect(() => {
		if (showConfirmacaoModal || showPostagemModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [showConfirmacaoModal, showPostagemModal]);

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

	// Abrir modal PostagemRealocacao
	const handleOpenPostagemModal = () => {
		setShowPostagemModal(true);
	};

	// Fechar modal PostagemRealocacao
	const handleClosePostagemModal = () => {
		setShowPostagemModal(false);
	};

	// Função para navegar para RealocacaoListagem com filtro de categoria
	const navigateToCategory = (categoria) => {
		navigate(`/realocacao-listagem?categoria=${encodeURIComponent(categoria)}`);
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
						className="bg-[#172233] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#22304d] transition cursor-pointer shadow-md hover:scale-[1.03]"
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
								<button
									key={item.id}
									className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity"
									onClick={() => navigateToCategory(item.categoria)}
								>
									<img
										src={item.img}
										alt={item.titulo}
										className="w-52 h-32 object-contain rounded-lg"
									/>
									<span className="mt-2 text-sm font-medium text-gray-700 text-center">
										{item.titulo}
									</span>
								</button>
							))}
						</div>
						<div className="flex justify-between items-center mt-2">
							<button
								className={`w-1/2 text-center text-sm font-medium py-2 rounded-l-lg transition cursor-pointer ${
									location.pathname === "/edit-doacoes"
										? "bg-[#22304d] text-white"
										: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
								}`}
								onClick={() => navigate("/edit-doacoes")}
							>
								Solicitações postadas
							</button>
							<button
								className={`w-1/2 text-center text-sm font-medium py-2 rounded-r-lg transition cursor-pointer ${
									location.pathname === "/home-realocacao"
										? "bg-[#22304d] text-white"
										: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
								}`}
								onClick={() => navigate("/home-realocacao")}
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
								className="bg-[#172233] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22304d] transition flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.03]"
								style={{ backgroundColor: footerColor }}
								onClick={handleOpenPostagemModal}
							>
								+ Adicionar Nova Realocação
							</button>
						</CardContent>
					</Card>
				</section>

				{/* Listagem de pedidos */}
				<section className="max-w-6xl mx-auto px-4 mb-8">
					{/* Contador de itens */}
					<div className="mb-4 text-sm text-gray-600 font-medium">
						{paginatedData.total} itens encontrados - Página {currentPage} de {paginatedData.totalPages}
					</div>
					<Card className="w-full bg-white border">
						<CardContent className="py-6 px-8">
							<div className="flex flex-col gap-6">
								{paginatedData.items.map((pedido) => (
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
												<span className="px-3 py-1 rounded-full text-xs font-semibold shadow bg-blue-500 text-white">
													{pedido.categoria}
												</span>
												<button
													className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-neutral-100 cursor-pointer shadow hover:scale-[1.03]"
												>
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
											<div className="mt-2 text-gray-700 text-base">
												<span className="block w-full break-words">
													{pedido.descricao}
												</span>
											</div>
											
											{/* Parte inferior: redes sociais e encerrar solicitação */}
											<div className="mt-4 flex items-center justify-between">
												<div className="flex items-center gap-3">
													{/* Redes sociais */}
													{pedido.facebook && (
														<div className="flex items-center gap-2">
															<a 
																href={pedido.facebook} 
																target="_blank" 
																rel="noopener noreferrer"
																className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
															>
																<Facebook className="w-3 h-3" />
																Facebook
															</a>
														</div>
													)}
												</div>
												
												{/* Botão Encerrar Solicitação */}
												<button
													className="bg-[#172233] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#22304d] transition cursor-pointer shadow-md hover:scale-[1.03]"
													style={{ backgroundColor: footerColor }}
													onClick={handleOpenConfirmacaoModal}
												>
													Encerrar Solicitação
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</section>

				{/* Paginação */}
				<Pagination 
					currentPage={currentPage}
					totalPages={paginatedData.totalPages}
					baseUrl="/home-realocacao"
				/>
			</main>
			<Footer />

			{/* Modal ConfirmacaoEncerrarRealocacao */}
			{showConfirmacaoModal && (
				<ConfirmacaoEncerrarRealocacao 
					onCancel={handleCloseConfirmacaoModal}
					onConfirm={handleConfirmEncerramento}
				/>
			)}

			{/* Modal PostagemRealocacao */}
			{showPostagemModal && (
				<PostagemRealocacao 
					onClose={handleClosePostagemModal}
				/>
			)}
		</div>
	);
}

export { HomeRealocacao };
export default HomeRealocacao;