import { Header } from "@/components/ui/layouts/Header";
import { Footer } from "@/components/ui/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Save, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const footerColor = "#172233";

const initialPedidos = [
	{
		id: 1,
		imageUrl: "/imagens/medf.jpg",
		titulo: "Remédios",
		publicado: "19/12/24",
		tempoRestante: "1 dia",
		descricao: "Solicitamos doação de medicamentos para atender uma demanda urgente em nosso abrigo temporário, que acolhem famílias em situação de vulnerabilidade.",
		status: "alta",
	},
	{
		id: 2,
		imageUrl: "/imagens/roupas.jpg",
		titulo: "Cobertores",
		publicado: "11/03/24",
		tempoRestante: "30 dias",
		descricao: "Necessitamos urgentemente de cobertores para o período de inverno. Famílias estão precisando de aquecimento.",
		status: "urgente",
	},
	{
		id: 3,
		imageUrl: "/imagens/roupas.jpg",
		titulo: "Camisetas",
		publicado: "12/06/24",
		tempoRestante: "47 dias",
		descricao: "Doação de camisetas em diversos tamanhos para distribuição nas comunidades carentes.",
		status: "média",
	},
];

const statusColors = {
	alta: "bg-orange-400 text-white",
	urgente: "bg-red-500 text-white",
	média: "bg-yellow-400 text-white",
};

export function EditDoacoes(props) {
	const [pedidos, setPedidos] = useState(initialPedidos);
	const [editId, setEditId] = useState(null);
	const [editData, setEditData] = useState({});
	const navigate = useNavigate();

	const handleEdit = (pedido) => {
		setEditId(pedido.id);
		setEditData(pedido);
	};

	const handleChange = (e) => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		setPedidos(
			pedidos.map((p) => (p.id === editId ? { ...editData } : p))
		);
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

	return (
		<div className="bg-[#fafbfc] min-h-screen flex flex-col">
			<Header />
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
							<div className="flex flex-col items-center flex-1">
								<img
									src="/imagens/medicamentos.jpg"
									alt="Medicamentos"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center"></span>
							</div>
							<div className="flex flex-col items-center flex-1">
								<img
									src="/imagens/roupas.jpg"
									alt="Roupas"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center"></span>
							</div>
							<div className="flex flex-col items-center flex-1">
								<img
									src="/imagens/moveis.jpg"
									alt="Móveis"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center"></span>
							</div>
							<div className="flex flex-col items-center flex-1">
								<img
									src="/imagens/ferramentas.jpg"
									alt="Ferramentas"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center"></span>
							</div>
							<div className="flex flex-col items-center flex-1">
								<img
									src="/imagens/alimentos.jpg"
									alt="Alimentos"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center"></span>
							</div>
							<div className="flex flex-col items-center flex-1">
								<img
									src="/imagens/outros.jpg"
									alt="Outros"
									className="w-52 h-32 object-contain rounded-lg"
								/>
								<span className="mt-2 text-sm font-medium text-gray-700 text-center"></span>
							</div>
						</div>
						<div className="flex justify-between items-center mt-2">
							<button
								className="w-1/2 text-center text-sm font-medium bg-neutral-100 py-2 rounded-l-lg hover:bg-neutral-200 transition"
								onClick={props.onSolicitacoesClick}
							>
								Solicitações postadas
							</button>
							<button
								className="w-1/2 text-center text-sm font-medium bg-neutral-100 py-2 rounded-r-lg hover:bg-neutral-200 transition cursor-pointer"
								onClick={handleRealocacoesClick}
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
								className="bg-[#172233] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22304d] transition flex items-center gap-2"
								style={{ backgroundColor: footerColor }}
							>
								+ Adicionar Nova Necessidade
							</button>
						</CardContent>
					</Card>
				</section>

				{/* Listagem de pedidos editáveis */}
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
											<div className="mt-2 text-gray-700 text-base flex items-center justify-between">
												<div className="w-[500px]">
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
<button
	className="bg-[#172233] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#22304d] transition ml-4 w-56 cursor-pointer shadow-md hover:scale-[1.03]"
	style={{ backgroundColor: footerColor, minWidth: "14rem" }}
>
	Encerrar Solicitação
</button>
											</div>
										</div>
									</div>
								))}
							</div>
							{/* Paginação */}
							<div className="flex justify-center items-center gap-2 mt-8">
<button className="w-8 h-8 rounded bg-[#172233] text-white font-bold cursor-pointer shadow hover:scale-[1.08]" style={{ backgroundColor: footerColor }}>
									1
								</button>
<button className="w-8 h-8 rounded text-neutral-900 font-bold hover:bg-neutral-200 cursor-pointer shadow hover:scale-[1.08]">
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
		</div>
	);
}