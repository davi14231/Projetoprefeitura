import React, { useState, useEffect } from "react";
import { Headeredicao } from "@/components/ui/layouts/Headeredicao";
import { Footer } from "@/components/ui/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, X, Facebook, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmacaoEncerrarRealocacao from "./ConfirmacaoEncerrarRealocacao";
import ConfirmacaoDeletar from "./ConfirmacaoDeletar";
import { PostagemRealocacao } from "./PostagemRealocacao";
import { useData } from "@/context/DataContext";
import { Pagination } from "@/components/ui/Pagination";

const footerColor = "#172233";

// Badge colors for categories
const badgeColors = {
  "Roupas e Calçados": "bg-[#007AFF] text-white", // azul
  "Materiais Educativos e Culturais": "bg-[#34C759] text-white", // verde
  "Saúde e Higiene": "bg-[#FF3B30] text-white", // vermelho
  "Utensílios Gerais": "bg-[#FF9500] text-white", // laranja
  "Itens de Inclusão e Mobilidade": "bg-[#5856D6] text-white", // roxo
  "Eletrodomésticos e Móveis": "bg-[#8E8E93] text-white", // cinza
  "Itens Pet": "bg-[#FFCC00] text-gray-900", // amarelo
  "Eletrônicos": "bg-[#AF52DE] text-white", // lilás
  "Outros": "bg-gray-300 text-gray-800",
  default: "bg-gray-300 text-gray-800",
};

// Badge colors for categories
const badgeColors = {
  "Roupas e Calçados": "bg-[#007AFF] text-white", // azul
  "Materiais Educativos e Culturais": "bg-[#34C759] text-white", // verde
  "Saúde e Higiene": "bg-[#FF3B30] text-white", // vermelho
  "Utensílios Gerais": "bg-[#FF9500] text-white", // laranja
  "Itens de Inclusão e Mobilidade": "bg-[#5856D6] text-white", // roxo
  "Eletrodomésticos e Móveis": "bg-[#8E8E93] text-white", // cinza
  "Itens Pet": "bg-[#FFCC00] text-gray-900", // amarelo
  "Eletrônicos": "bg-[#AF52DE] text-white", // lilás
  "Outros": "bg-gray-300 text-gray-800",
  default: "bg-gray-300 text-gray-800",
};

const destaques = [
    { id: 1, titulo: "Roupas e Calçados", img: "/imagens/roupas.jpg", categoria: "Roupas e Calçados" },
    { id: 2, titulo: "Eletrônicos", img: "/imagens/Laptops.jpg", categoria: "Eletrônicos" },
    { id: 3, titulo: "Móveis", img: "/imagens/moveis.jpg", categoria: "Eletrodomésticos e Móveis" },
    { id: 4, titulo: "Utensílios", img: "/imagens/ferramentas.jpg", categoria: "Utensílios Gerais" },
    { id: 5, titulo: "Material Educativo", img: "/imagens/alimentos.jpg", categoria: "Materiais Educativos e Culturais" },
    { id: 6, titulo: "Outros", img: "/imagens/outros.jpg", categoria: "Outros" },
    { id: 1, titulo: "Roupas e Calçados", img: "/imagens/roupas.jpg", categoria: "Roupas e Calçados" },
    { id: 2, titulo: "Eletrônicos", img: "/imagens/Laptops.jpg", categoria: "Eletrônicos" },
    { id: 3, titulo: "Móveis", img: "/imagens/moveis.jpg", categoria: "Eletrodomésticos e Móveis" },
    { id: 4, titulo: "Utensílios", img: "/imagens/ferramentas.jpg", categoria: "Utensílios Gerais" },
    { id: 5, titulo: "Material Educativo", img: "/imagens/alimentos.jpg", categoria: "Materiais Educativos e Culturais" },
    { id: 6, titulo: "Outros", img: "/imagens/outros.jpg", categoria: "Outros" },
];

function HomeRealocacao() {
	// Adicionar estado editData para edição de realocação
	const [editData, setEditData] = useState(null);
	const [encerrados, setEncerrados] = useState([]);
	const [idParaEncerrar, setIdParaEncerrar] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [showConfirmacaoDeletar, setShowConfirmacaoDeletar] = useState(false);
	const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
	const [showPostagemModal, setShowPostagemModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const { getRealocacoesPaginadas, removeRealocacao } = useData();
	const [idParaExcluir, setIdParaExcluir] = useState(null);

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

	// Abrir modal de confirmação de encerramento
	const handleOpenConfirmacaoModal = (id) => {
		setIdParaEncerrar(id);
		setShowConfirmacaoModal(true);
	};

	// Fechar modal de confirmação de encerramento
	const handleCloseConfirmacaoModal = () => {
		setShowConfirmacaoModal(false);
		setIdParaEncerrar(null);
	};

	// Confirmar encerramento da realocação
	const handleConfirmEncerramento = () => {
		if (idParaEncerrar) {
			setEncerrados([...encerrados, idParaEncerrar]);
			setIdParaEncerrar(null);
		}
		setShowConfirmacaoModal(false);
	};

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

	// Prevent background scroll when any modal is open
	React.useEffect(() => {
		if (showConfirmacaoDeletar || showConfirmacaoModal || showPostagemModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [showConfirmacaoDeletar, showConfirmacaoModal, showPostagemModal]);

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
								{paginatedData.items.filter(pedido => !encerrados.includes(pedido.id)).map((pedido) => (
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
				<div className="mb-8">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={paginatedData.totalPages}
                        baseUrl="/home-realocacao"
                    />
                </div>
            </main>
            <Footer />
				<div className="mb-8">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={paginatedData.totalPages}
                        baseUrl="/home-realocacao"
                    />
                </div>
            </main>
            <Footer />

			{/* Modal ConfirmacaoEncerrarRealocacao */}
	  {showConfirmacaoDeletar && (
		<ConfirmacaoDeletar
		  onCancel={() => setShowConfirmacaoDeletar(false)}
		  onConfirm={handleConfirmDelete}
		  tipo="realocacao"
		/>
	  )}
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
					editData={editData}
				/>
			)}
		</div>
	);
}

export { HomeRealocacao };
export default HomeRealocacao;