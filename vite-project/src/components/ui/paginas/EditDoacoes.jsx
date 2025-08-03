import React from "react";
import { Headeredicao } from "@/components/ui/layouts/Headeredicao";
import { Footer } from "@/components/ui/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Facebook, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SolicitarDoacao } from "./SolicitarDoacao";
import ConfirmacaoEncerrarSolicitacao from "./ConfirmacaoEncerrarSolicitacao";
import { useData } from "@/context/DataContext";
import { Pagination } from "@/components/ui/Pagination";
import ConfirmacaoDeletar from "./ConfirmacaoDeletar";
import { TempoRestante } from "@/components/ui/TempoRestante";

const footerColor = "#172233";

export function EditDoacoes() {
	const location = useLocation();
	const [editId, setEditId] = useState(null);
	const [editData, setEditData] = useState({});
	const [showSolicitarModal, setShowSolicitarModal] = useState(false);
	const [showConfirmacaoDeletar, setShowConfirmacaoDeletar] = useState(false);
	const [showConfirmacaoEncerrar, setShowConfirmacaoEncerrar] = useState(false);
	const [idParaExcluir, setIdParaExcluir] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [idParaEncerrar, setIdParaEncerrar] = useState(null);
	const { getDoacoesPaginadas, removeDoacao, encerrarDoacao, forceUpdate } = useData();
	const navigate = useNavigate();

	const itemsPerPage = 6;

	// Efeito para ler parâmetros da URL e definir página atual
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const page = parseInt(searchParams.get('page')) || 1;
		setCurrentPage(page);
	}, [location.search]);

	// Efeito para forçar re-renderização quando forceUpdate muda (nova doação adicionada)
	useEffect(() => {
		// Este useEffect garante que o componente re-renderize quando uma nova doação é adicionada
	}, [forceUpdate]);

	// Garantir que os dados sejam sempre atualizados
	const refreshedData = React.useMemo(() => {
		return getDoacoesPaginadas({
			page: currentPage,
			limit: itemsPerPage,
			filters: {}
		});
	}, [currentPage, forceUpdate, getDoacoesPaginadas]);

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

	// Abrir modal SolicitarDoacao
	const handleOpenSolicitarModal = () => {
		setEditData(null); // Limpar dados para nova solicitação
		setEditId(null); // Limpar ID para nova solicitação
		setShowSolicitarModal(true);
	};

	// Fechar modal SolicitarDoacao
	const handleCloseSolicitarModal = () => {
		setShowSolicitarModal(false);
		setEditData(null); // Limpar dados de edição
		setEditId(null); // Limpar ID de edição
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
const handleOpenConfirmacaoEncerrar = (id) => {
  setIdParaEncerrar(id);
  setShowConfirmacaoEncerrar(true);
};

// Fechar modal de confirmação de encerramento
const handleCloseConfirmacaoEncerrar = () => {
  setShowConfirmacaoEncerrar(false);
  setIdParaEncerrar(null);
};

// Confirmar encerramento da solicitação
const handleConfirmEncerramento = () => {
  if (idParaEncerrar) {
    encerrarDoacao(idParaEncerrar);
    setIdParaEncerrar(null);
  }
  setShowConfirmacaoEncerrar(false);
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
					<button
						className="bg-[#172233] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#22304d] transition cursor-pointer shadow-md hover:scale-[1.03]"
						style={{ backgroundColor: footerColor }}
						onClick={() => navigate("/todas-doacoes")}
					>
						Ver todas as necessidades
					</button>
				</section>

				{/* Navegação entre seções */}
				<section className="max-w-6xl mx-auto px-4 mb-2">
					<div className="flex justify-between items-center">
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
											{refreshedData.total} itens encontrados - Página {currentPage} de {refreshedData.totalPages}
										</div>
										<Card className="w-full bg-white border">
											<CardContent className="py-6 px-8">
												<div className="flex flex-col gap-6">
													{refreshedData.items.map((pedido) => (
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
																	<TempoRestante prazo={pedido.prazo || pedido.validade} publicado={pedido.publicado} />
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
	onClick={() => handleOpenConfirmacaoEncerrar(pedido.id)}
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
				<div className="mb-8">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={refreshedData.totalPages}
                        baseUrl="/edit-doacoes"
                    />
                </div>

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
									editData={editId ? editData : null}
									editId={editId}
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