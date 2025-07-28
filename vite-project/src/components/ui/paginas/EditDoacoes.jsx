import React from "react";
import { Headeredicao } from "@/components/ui/layouts/Headeredicao";
import { Footer } from "@/components/ui/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Save, X, Facebook, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SolicitarDoacao } from "./SolicitarDoacao";
import ConfirmacaoEncerrarSolicitacao from "./ConfirmacaoEncerrarSolicitacao";
// import removido: duplicado
import { useData } from "@/context/DataContext";
import { Pagination } from "@/components/ui/Pagination";
import ConfirmacaoDeletar from "./ConfirmacaoDeletar";

const footerColor = "#172233";

const statusColors = {
	alta: "bg-orange-400 text-white",
	baixa: "bg-green-500 text-white",
	média: "bg-yellow-400 text-white",
};

export function EditDoacoes() {
	const location = useLocation();
	const [editId, setEditId] = useState(null);
	const [editData, setEditData] = useState({});
	const [showSolicitarModal, setShowSolicitarModal] = useState(false);
	const [showConfirmacaoDeletar, setShowConfirmacaoDeletar] = useState(false);
	const [showConfirmacaoEncerrar, setShowConfirmacaoEncerrar] = useState(false);
	const [idParaExcluir, setIdParaExcluir] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [carouselIndex, setCarouselIndex] = useState(0);
	const { getDoacoesPaginadas, updateDoacao, removeDoacao } = useData();
	const navigate = useNavigate();

	// Itens recebidos por voluntários
	const itensRecebidos = [
		{
			id: 1,
			nome: "Cesta básica",
			imagem: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 2,
			nome: "Roupas infantis",
			imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 3,
			nome: "Material escolar",
			imagem: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 4,
			nome: "Livros didáticos",
			imagem: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 5,
			nome: "Brinquedos educativos",
			imagem: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 6,
			nome: "Produtos de higiene",
			imagem: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 7,
			nome: "Medicamentos básicos",
			imagem: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 8,
			nome: "Cobertores e mantas",
			imagem: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 9,
			nome: "Produtos de limpeza",
			imagem: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop&crop=center"
		},
		{
			id: 10,
			nome: "Equipamentos esportivos",
			imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"
		}
	];

	const itemsPerPage = 6;
	const carouselItemsPerView = 6;

	// Navegação do carousel
	const handlePrevCarousel = () => {
		setCarouselIndex(prev => Math.max(0, prev - 1));
	};

	const handleNextCarousel = () => {
		const maxIndex = Math.max(0, itensRecebidos.length - carouselItemsPerView);
		setCarouselIndex(prev => Math.min(maxIndex, prev + 1));
	};

	const canGoPrev = carouselIndex > 0;
	const canGoNext = carouselIndex < itensRecebidos.length - carouselItemsPerView;

	const visibleItems = itensRecebidos.slice(carouselIndex, carouselIndex + carouselItemsPerView);

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

	// Prevent background scroll when any modal is open
	React.useEffect(() => {
		if (showSolicitarModal || showConfirmacaoDeletar || showConfirmacaoEncerrar) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [showSolicitarModal, showConfirmacaoDeletar, showConfirmacaoEncerrar]);

	const handleEdit = (pedido) => {
		setEditId(pedido.id);
		setEditData(pedido);
		setShowSolicitarModal(true); // Abrir o modal para edição
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
		setEditData(null); // Limpar dados de edição
		setEditId(null); // Limpar ID de edição
	};

	// Abrir modal ConfirmacaoEncerrarSolicitacao
	const handleOpenConfirmacaoModal = () => {
		setShowConfirmacaoModal(true);
	};

	// Fechar modal ConfirmacaoEncerrarSolicitacao
	const handleCloseConfirmacaoModal = () => {
		setShowConfirmacaoModal(false);
	};


// Abrir modal de confirmação para deletar
const handleDelete = (id) => {
  setIdParaExcluir(id);
  setShowConfirmacaoDeletar(true);
};

// Confirma exclusão no modal
const handleConfirmDelete = () => {
  if (idParaExcluir) {
	removeDoacao(idParaExcluir);
	setIdParaExcluir(null);
  }
  setShowConfirmacaoDeletar(false);
};

// Abrir modal de confirmação de encerramento
const handleOpenConfirmacaoEncerrar = () => {
  setShowConfirmacaoEncerrar(true);
};

// Fechar modal de confirmação de encerramento
const handleCloseConfirmacaoEncerrar = () => {
  setShowConfirmacaoEncerrar(false);
};

// Confirmar encerramento da solicitação
const handleConfirmEncerramento = () => {
  // Aqui você pode adicionar a lógica para encerrar a solicitação
  setShowConfirmacaoEncerrar(false);
  // Exemplo: remover o pedido da lista ou atualizar status
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

				{/* Seção de botões de navegação */}
				<section className="max-w-6xl mx-auto px-4 mb-6">
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
<div className="flex items-center gap-2 w-full">
  <span className="font-semibold text-lg text-gray-800">
	{pedido.titulo}
  </span>
  <span className="px-3 py-1 rounded-full text-xs font-semibold shadow bg-blue-500 text-white">
	{pedido.categoria}
  </span>
  <button
	className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-neutral-100 cursor-pointer shadow hover:scale-[1.03]"
	onClick={() => handleEdit(pedido)}
  >
	<Edit2 className="w-4 h-4" /> Editar
  </button>
  <div className="flex-1"></div>
  <button
	className="flex items-center justify-center p-2 rounded-full hover:bg-red-100 transition-colors cursor-pointer ml-2"
	title="Excluir"
	onClick={() => handleDelete(pedido.id)}
	style={{ color: '#e3342f' }}
  >
	<Trash2 className="w-5 h-5" />
  </button>
</div>
																<div className="text-sm text-gray-500 mt-1 flex items-center gap-4">
																	<span>Publicado: {pedido.publicado}</span>
																</div>
																<div className="mt-2 text-gray-700 text-base">
																	<span className="block w-full break-words">
																		{pedido.descricao}
																	</span>
																</div>										
											{/* Parte inferior: botões de urgência, redes sociais e encerrar solicitação */}
											<div className="mt-4 flex items-center justify-between">
												<div className="flex items-center gap-3">
													{/* Botões de urgência */}
													<div className="flex gap-2">
														<button 
															className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
																pedido.urgencia === 'Baixa' || pedido.status === 'baixa'
																	? 'bg-green-100 border-green-200 text-green-700' 
																	: 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
															}`}
														>
															Baixa
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
																	? 'bg-red-100 border-red-200 text-red-700' 
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
												
												{/* Botão Encerrar Solicitação */}
  <button
	className="bg-[#172233] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#22304d] transition cursor-pointer shadow-md hover:scale-[1.03]"
	style={{ backgroundColor: footerColor }}
	onClick={handleOpenConfirmacaoEncerrar}
  >
	Doação Recebida
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

				{/* Confira os itens recebidos por voluntários */}
				<section className="max-w-6xl mx-auto px-4 py-8 mb-8">
					{/* Título alinhado com a primeira coluna de itens */}
					<h2 className="text-xl font-bold text-gray-800 mb-6" style={{ marginLeft: 'calc(2.5rem + 1rem)' }}>
						Confira os itens recebidos por voluntários
					</h2>
					
					<div className="flex items-center gap-4">
						{/* Seta esquerda */}
						<button 
							className={`flex-shrink-0 p-2 rounded-full transition ${
								canGoPrev 
									? 'hover:bg-gray-100 text-gray-700 cursor-pointer' 
									: 'text-gray-300 cursor-not-allowed'
							}`}
							onClick={handlePrevCarousel}
							disabled={!canGoPrev}
						>
							<ChevronLeft className="w-6 h-6" />
						</button>

						{/* Cards dos itens */}
						<div className="flex gap-4 flex-1 justify-center">
							{visibleItems.map((item) => (
								<div key={item.id} className="flex flex-col items-center">
									<div className="w-32 h-32 bg-white rounded-lg border shadow-sm overflow-hidden mb-2">
										<img 
											src={item.imagem} 
											alt={item.nome}
											className="w-full h-full object-cover"
										/>
									</div>
									<span className="text-xs text-blue-600 font-medium px-3 py-1 bg-blue-50 rounded-full border border-blue-200 text-center">
										{item.nome}
									</span>
								</div>
							))}
						</div>

						{/* Seta direita */}
						<button 
							className={`flex-shrink-0 p-2 rounded-full transition ${
								canGoNext 
									? 'hover:bg-gray-100 text-gray-700 cursor-pointer' 
									: 'text-gray-300 cursor-not-allowed'
							}`}
							onClick={handleNextCarousel}
							disabled={!canGoNext}
						>
							<ChevronRight className="w-6 h-6" />
						</button>
					</div>
				</section>
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
								<SolicitarDoacao 
									onClose={handleCloseSolicitarModal} 
									editData={editData}
								/>
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

	  {/* Modal ConfirmacaoDeletar */}
	  {showConfirmacaoDeletar && (
		<ConfirmacaoDeletar
		  onCancel={() => setShowConfirmacaoDeletar(false)}
		  onConfirm={handleConfirmDelete}
		  tipo="doacao"
		/>
	  )}
	  {/* Modal ConfirmacaoEncerrarSolicitacao */}
	  {showConfirmacaoEncerrar && (
		<ConfirmacaoEncerrarSolicitacao
		  onCancel={handleCloseConfirmacaoEncerrar}
		  onConfirm={handleConfirmEncerramento}
		/>
	  )}
		</div>
	);
}