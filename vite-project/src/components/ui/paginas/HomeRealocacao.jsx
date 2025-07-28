import React, { useState, useEffect } from "react";
import { Headeredicao } from "@/components/ui/layouts/Headeredicao";
import { Footer } from "@/components/ui/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, X, Facebook, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmacaoEncerrarRealocacao from "./ConfirmacaoEncerrarRealocacao";
import ConfirmacaoDeletar from "./ConfirmacaoDeletar";
import { PostagemRealocacao } from "./PostagemRealocacao";
import { useData } from "@/context/DataContext";
import { Pagination } from "@/components/ui/Pagination";

const footerColor = "#172233";

function HomeRealocacao() {
	const navigate = useNavigate();
	const location = useLocation();
const [showConfirmacaoDeletar, setShowConfirmacaoDeletar] = useState(false);
const [showConfirmacaoEncerrar, setShowConfirmacaoEncerrar] = useState(false);
const [showPostagemModal, setShowPostagemModal] = useState(false);
const [editId, setEditId] = useState(null);
const [editData, setEditData] = useState({});
const [currentPage, setCurrentPage] = useState(1);
const [carouselIndex, setCarouselIndex] = useState(0);
const { getRealocacoesPaginadas, removeRealocacao, updateRealocacao } = useData();
const [idParaExcluir, setIdParaExcluir] = useState(null);

// Itens já realocados para outras ONGs
const itensRealocados = [
	{
		id: 1,
		nome: "Kits de toalhas de banho",
		imagem: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 2,
		nome: "Alimentos não perecíveis",
		imagem: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 3,
		nome: "Utensílios de cozinha",
		imagem: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 4,
		nome: "Kits de fraldas",
		imagem: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 5,
		nome: "Cadeiras de escritório",
		imagem: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 6,
		nome: "Termômetros digitais",
		imagem: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 7,
		nome: "Computadores portáteis",
		imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 8,
		nome: "Material de limpeza",
		imagem: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 9,
		nome: "Roupas de cama",
		imagem: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop&crop=center"
	},
	{
		id: 10,
		nome: "Equipamentos médicos",
		imagem: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center"
	}
];

const itemsPerPage = 6;
const carouselItemsPerView = 6;

	// Navegação do carousel
	const handlePrevCarousel = () => {
		setCarouselIndex(prev => Math.max(0, prev - 1));
	};

	const handleNextCarousel = () => {
		const maxIndex = Math.max(0, itensRealocados.length - carouselItemsPerView);
		setCarouselIndex(prev => Math.min(maxIndex, prev + 1));
	};

	const canGoPrev = carouselIndex > 0;
	const canGoNext = carouselIndex < itensRealocados.length - carouselItemsPerView;

	const visibleItems = itensRealocados.slice(carouselIndex, carouselIndex + carouselItemsPerView);

// Abrir modal de confirmação para deletar
const handleDelete = (id) => {
  setIdParaExcluir(id);
  setShowConfirmacaoDeletar(true);
};

// Confirma exclusão no modal
const handleConfirmDelete = () => {
  if (idParaExcluir) {
	removeRealocacao(idParaExcluir);
	setIdParaExcluir(null);
  }
  setShowConfirmacaoDeletar(false);
};

// Função para editar realocação
const handleEdit = (pedido) => {
	setEditId(pedido.id);
	setEditData(pedido);
	setShowPostagemModal(true); // Abrir o modal para edição
};

// Abrir modal de confirmação de encerramento
const handleOpenConfirmacaoEncerrar = () => {
  setShowConfirmacaoEncerrar(true);
};

// Fechar modal de confirmação de encerramento
const handleCloseConfirmacaoEncerrar = () => {
  setShowConfirmacaoEncerrar(false);
};

// Confirmar encerramento da realocação
const handleConfirmEncerramento = () => {
  // Aqui você pode adicionar a lógica para encerrar a realocação
  setShowConfirmacaoEncerrar(false);
  // Exemplo: remover o item da lista ou atualizar status
};

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

// Prevent background scroll when any modal is open
React.useEffect(() => {
  if (showConfirmacaoDeletar || showConfirmacaoEncerrar || showPostagemModal) {
	document.body.style.overflow = "hidden";
  } else {
	document.body.style.overflow = "auto";
  }
  return () => {
	document.body.style.overflow = "auto";
  };
}, [showConfirmacaoDeletar, showConfirmacaoEncerrar, showPostagemModal]);

// ...existing code...

	// Abrir modal PostagemRealocacao
	const handleOpenPostagemModal = () => {
		setShowPostagemModal(true);
	};

	// Fechar modal PostagemRealocacao
	const handleClosePostagemModal = () => {
		setShowPostagemModal(false);
		setEditData(null); // Limpar dados de edição
		setEditId(null); // Limpar ID de edição
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
											</div>
											<div className="text-sm text-gray-500 mt-1 flex items-center gap-4">
												<span>Publicado: {pedido.publicado}</span>
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
													onClick={handleOpenConfirmacaoEncerrar}
												>
													Realocação Concluída
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

				{/* Confira os itens já realocados para outras ONGs */}
				<section className="max-w-6xl mx-auto px-4 py-8 mb-8">
					{/* Título alinhado com a primeira coluna de itens */}
					<h2 className="text-xl font-bold text-gray-800 mb-6" style={{ marginLeft: 'calc(2.5rem + 1rem)' }}>
						Confira os itens já realocados para outras ONGs
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

			{/* Modal ConfirmacaoEncerrarRealocacao */}

	  {/* Modal ConfirmacaoDeletar */}
	  {showConfirmacaoDeletar && (
		<ConfirmacaoDeletar
		  onCancel={() => setShowConfirmacaoDeletar(false)}
		  onConfirm={handleConfirmDelete}
		  tipo="realocacao"
		/>
	  )}
	  {/* Modal ConfirmacaoEncerrarRealocacao */}
	  {showConfirmacaoEncerrar && (
		<ConfirmacaoEncerrarRealocacao
		  onCancel={handleCloseConfirmacaoEncerrar}
		  onConfirm={handleConfirmEncerramento}
		/>
	  )}

			{/* Modal PostagemRealocacao */}
			{showPostagemModal && (
				<PostagemRealocacao 
					onClose={handleClosePostagemModal}
					editData={editData}
				/>
			)}
		</div>
	);
}

export { HomeRealocacao };
export default HomeRealocacao;