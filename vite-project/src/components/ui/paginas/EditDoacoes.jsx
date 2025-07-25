import React from "react";
import { Headeredicao } from "@/components/ui/layouts/Headeredicao";
import { Footer } from "@/components/ui/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Save, X, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SolicitarDoacao } from "./SolicitarDoacao";
import ConfirmacaoEncerrarSolicitacao from "./ConfirmacaoEncerrarSolicitacao";
import { useData } from "@/context/DataContext";
import { Pagination } from "@/components/ui/Pagination";

const footerColor = "#172233";

const statusColors = {
	alta: "bg-orange-400 text-white",
	urgente: "bg-red-500 text-white",
	média: "bg-yellow-400 text-white",
};

export function EditDoacoes() {
	const location = useLocation();
	const [editId, setEditId] = useState(null);
	const [editData, setEditData] = useState({});
	const [showSolicitarModal, setShowSolicitarModal] = useState(false);
	const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemToDelete, setItemToDelete] = useState(null);
	const { getDoacoesPaginadas, updateDoacao, deleteDoacao } = useData();
	const navigate = useNavigate();

	const itemsPerPage = 6;

	// Efeito para ler parâmetros da URL e definir página atual
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const page = parseInt(searchParams.get('page')) || 1;
		setCurrentPage(page);
	}, [location.search]);

	// Obter dados paginados usando Context
	const paginatedData = getDoacoesPaginadas({
		page: currentPage,
		limit: itemsPerPage,
		filters: {}
	});

	// Prevent background scroll when modal is open
	React.useEffect(() => {
		if (showSolicitarModal || showConfirmacaoModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [showSolicitarModal, showConfirmacaoModal]);

	const handleEdit = (pedido) => {
		setEditId(pedido.id);
		setEditData(pedido);
	};

	const handleChange = (e) => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		updateDoacao(editId, editData);
		setEditId(null);
		setEditData({});
	};

	const handleCancel = () => {
		setEditId(null);
		setEditData({});
	};

	// Navegação para HomeRealocacao
	const handleRealocacoesClick = () => {
		navigate("/home-realocacao");
	};

	// Abrir modal SolicitarDoacao
	const handleOpenSolicitarModal = () => {
		setShowSolicitarModal(true);
	};

	// Fechar modal SolicitarDoacao
	const handleCloseSolicitarModal = () => {
		setShowSolicitarModal(false);
	};

	// Abrir modal ConfirmacaoEncerrarSolicitacao com o ID do item
	const handleOpenConfirmacaoModal = (itemId) => {
		setItemToDelete(itemId);
		setShowConfirmacaoModal(true);
	};

	// Fechar modal ConfirmacaoEncerrarSolicitacao
	const handleCloseConfirmacaoModal = () => {
		setShowConfirmacaoModal(false);
		setItemToDelete(null);
	};

	// Confirmar encerramento da solicitação
	const handleConfirmEncerramento = () => {
		if (itemToDelete) {
			// Remove a doação usando o método do contexto
			deleteDoacao(itemToDelete);
			
			// Fechar o modal
			setShowConfirmacaoModal(false);
			setItemToDelete(null);
			
			// Feedback para o usuário
			alert("Solicitação encerrada com sucesso!");
		}
	};

	// Função para navegar para TodasDoacoes com filtro de categoria
	const navigateToCategory = (categoria) => {
		navigate(`/todas-doacoes?categoria=${encodeURIComponent(categoria)}`);
	};

	return (
		<div className="bg-[#fafbfc] min-h-screen flex flex-col relative">
			<Headeredicao />
			<main className="flex-1">
				{/* Título */}
				<section className="max-w-6xl mx-auto py-10 px-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
						O que sua ONG precisa?
					</h1>
					<p className="text-gray-700 mb-8 text-lg">
						Voluntários e outras ONGs podem ver seu pedido e contribuir com o que
						for possível.
					</p>
				</section>

				{/* Categorias */}
				<section className="max-w-6xl mx-auto px-4 mb-2">
					<div className="flex flex-col">
						<div className="flex gap-6 justify-between pb-2">
							<button 
								className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() => navigateToCategory("Medicamentos")}
							>
								<img
									src="/imagens/medicamentos.jpg"
									alt="Medicamentos"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center">Medicamentos</span>
							</button>
							<button 
								className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() => navigateToCategory("Roupas")}
							>
								<img
									src="/imagens/roupas.jpg"
									alt="Roupas"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center">Roupas</span>
							</button>
							<button 
								className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() => navigateToCategory("Móveis")}
							>
								<img
									src="/imagens/moveis.jpg"
									alt="Móveis"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center">Móveis</span>
							</button>
							<button 
								className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() => navigateToCategory("Equipamento")}
							>
								<img
									src="/imagens/ferramentas.jpg"
									alt="Ferramentas"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center">Equipamento</span>
							</button>
							<button 
								className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() => navigateToCategory("Alimentos")}
							>
								<img
									src="/imagens/alimentos.jpg"
									alt="Alimentos"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center">Alimentos</span>
							</button>
							<button 
								className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() => navigateToCategory("Outros")}
							>
								<img
									src="/imagens/outros.jpg"
									alt="Outros"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center">Outros</span>
							</button>
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
								Precisa de Doações?
							</h2>
							<p className="text-gray-700 mb-4 text-base">
								Sua ONG está enfrentando falta de recursos? Peça doações de todo tipo
								que estiver no seu Portal Voluntário e outras ONGs podem ver seu
								pedido e contribuir com o que for possível.
							</p>
							<button
								className="bg-[#172233] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22304d] transition flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.03]"
								style={{ backgroundColor: footerColor }}
								onClick={handleOpenSolicitarModal}
							>
								+ Adicionar Nova Necessidade
							</button>
						</CardContent>
					</Card>
				</section>

				{/* Listagem de pedidos editáveis */}
				<section className="max-w-6xl mx-auto px-4 mb-8">
					{/* Contador de itens */}
					<div className="mb-4 text-sm text-gray-600 font-medium">
						{paginatedData.totalItems} itens encontrados - Página {currentPage} de {paginatedData.totalPages}
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
												{editId === pedido.id ? (
													<input
														type="text"
														name="titulo"
														value={editData.titulo}
														onChange={handleChange}
														className="font-semibold text-lg text-gray-800 border rounded px-2 py-1"
													/>
												) : (
													<span className="font-semibold text-lg text-gray-800">
														{pedido.titulo}
													</span>
												)}
												<span
													className={`px-2 py-1 rounded text-xs font-bold ${statusColors[pedido.status]}`}
												>
													{pedido.status}
												</span>
												{editId === pedido.id ? (
													<>
<button
	className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-neutral-100 cursor-pointer shadow hover:scale-[1.03]"
	onClick={handleSave}
>
	<Save className="w-4 h-4" /> Salvar
</button>
<button
	className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-neutral-100 cursor-pointer shadow hover:scale-[1.03]"
	onClick={handleCancel}
>
	<X className="w-4 h-4" /> Cancelar
</button>
													</>
												) : (
<button
	className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-neutral-100 cursor-pointer shadow hover:scale-[1.03]"
	onClick={() => handleEdit(pedido)}
>
	<Edit2 className="w-4 h-4" /> Editar
</button>
												)}
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
												{editId === pedido.id ? (
													<textarea
														name="descricao"
														value={editData.descricao}
														onChange={handleChange}
														className="border rounded px-2 py-1 w-full"
														rows={3}
														style={{ minHeight: "3rem", maxHeight: "none" }}
													/>
												) : (
													<span className="block w-full break-words">
														{pedido.descricao}
													</span>
												)}
											</div>
											
											{/* Parte inferior: botões de urgência, redes sociais e encerrar solicitação */}
											<div className="mt-4 flex items-center justify-between">
												<div className="flex items-center gap-3">
													{/* Botões de urgência */}
													<div className="flex gap-2">
														<button 
															className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
																pedido.urgencia === 'Urgente' || pedido.status === 'urgente'
																	? 'bg-red-100 border-red-200 text-red-700' 
																	: 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
															}`}
														>
															Urgente
														</button>
														<button 
															className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
																pedido.urgencia === 'Média' || pedido.status === 'média'
																	? 'bg-yellow-100 border-yellow-200 text-yellow-700' 
																	: 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
															}`}
														>
															Média
														</button>
														<button 
															className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
																pedido.urgencia === 'Alta' || pedido.status === 'alta'
																	? 'bg-orange-100 border-orange-200 text-orange-700' 
																	: 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
															}`}
														>
															Alta
														</button>
													</div>
													
													{/* Redes sociais */}
													{pedido.facebook && (
														<div className="flex items-center gap-2 ml-4">
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
												
												{/* Botão Encerrar Solicitação - Modificado para passar o ID */}
												<button
													className="bg-[#172233] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#22304d] transition cursor-pointer shadow-md hover:scale-[1.03]"
													style={{ backgroundColor: footerColor }}
													onClick={() => handleOpenConfirmacaoModal(pedido.id)}
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
					baseUrl="/edit-doacoes"
				/>
			</main>
			<Footer />

			{/* Modal SolicitarDoacao */}
			{showSolicitarModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					{/* Overlay escurecido */}
					<div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300" onClick={handleCloseSolicitarModal}></div>
					{/* Modal */}
					<div className="relative z-10 bg-white rounded-2xl shadow-2xl p-0 w-full max-w-xl mx-2 animate-fadeIn">
						{/* Close button */}
						<button
							className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-20"
							onClick={handleCloseSolicitarModal}
							aria-label="Fechar"
						>
							<span aria-hidden="true">&times;</span>
						</button>
						<div className="p-6">
							{SolicitarDoacao ? (
								<SolicitarDoacao onClose={handleCloseSolicitarModal} />
							) : (
								<div>
									<h2 className="text-lg font-bold mb-4">Solicitar Doação</h2>
									<p>Conteúdo da tela de solicitação de doação não encontrado.</p>
									<button className="mt-4 px-4 py-2 bg-[#172233] text-white rounded" onClick={handleCloseSolicitarModal}>Fechar</button>
								</div>
							)}
						</div>
					</div>
					{/* Animation keyframes */}
					<style>{`
						@keyframes fadeIn {
							from { opacity: 0; transform: scale(0.95); }
							to { opacity: 1; transform: scale(1); }
						}
						.animate-fadeIn {
							animation: fadeIn 0.3s ease;
						}
					`}</style>
				</div>
			)}

			{/* Modal ConfirmacaoEncerrarSolicitacao */}
			{showConfirmacaoModal && (
				<ConfirmacaoEncerrarSolicitacao 
					onCancel={handleCloseConfirmacaoModal}
					onConfirm={handleConfirmEncerramento}
				/>
			)}
		</div>
	);
}