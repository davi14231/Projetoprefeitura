import { Headernecessidade } from "@/components/ui/layouts/Headernecessidade";
import { Footer } from "@/components/ui/layouts/Footer";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DetalheDoacao from "./DetalheDoacao";
import { useData } from "@/context/DataContext";
import { Pagination } from "@/components/ui/Pagination";
import { Facebook } from "lucide-react";

const badgeColors = {
	Alimentos: "bg-[#34C759] text-white", // verde
	Roupas: "bg-[#007AFF] text-white", // azul
	Equipamento: "bg-[#5856D6] text-white", // roxo
	Móveis: "bg-[#FF9500] text-white", // laranja
	Brinquedos: "bg-[#FFCC00] text-gray-900", // amarelo
	Medicamentos: "bg-[#FF3B30] text-white", // vermelho
	"Material Escolar": "bg-[#8E8E93] text-white", // cinza
	Livros: "bg-[#AF52DE] text-white", // lilás
	default: "bg-gray-300 text-gray-800",
};

export default function TodasDoacoes() {
	const [busca, setBusca] = useState("");
	const [categoria, setCategoria] = useState("");
	const [showDetalheModal, setShowDetalheModal] = useState(false);
	const [dadosDetalhe, setDadosDetalhe] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const location = useLocation();
	const { filterDoacoes, getDoacoesPaginadas } = useData();

	const itemsPerPage = 6;

	// Lista completa de categorias disponíveis
	const todasCategorias = [
		"Alimentos",
		"Roupas", 
		"Eletrônicos",
		"Equipamento",
		"Móveis",
		"Brinquedos",
		"Medicamentos",
		"Material Escolar",
		"Livros",
		"Educação"
	];

	// Ler parâmetros da URL
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const categoriaParam = urlParams.get('categoria');
		const pageParam = urlParams.get('page');
		
		if (categoriaParam) {
			console.log('Categoria da URL em TodasDoacoes:', categoriaParam);
			setCategoria(categoriaParam);
		}
		
		if (pageParam) {
			setCurrentPage(parseInt(pageParam, 10));
		}
	}, [location.search]);

	// Aplicar filtros aos dados
	const filteredDoacoes = filterDoacoes({
		categoria,
		busca
	});

	// Obter dados paginados dos itens filtrados
	const getPaginatedData = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const items = filteredDoacoes.slice(startIndex, endIndex);
		const totalPages = Math.ceil(filteredDoacoes.length / itemsPerPage);
		
		return {
			items,
			currentPage,
			totalPages,
			totalItems: filteredDoacoes.length,
			itemsPerPage
		};
	};

	const paginatedData = getPaginatedData();

	// Função para mudar página
	const handlePageChange = (page) => {
		setCurrentPage(page);
		const urlParams = new URLSearchParams(location.search);
		urlParams.set('page', page);
		navigate(`/todas-doacoes?${urlParams.toString()}`);
	};

	// Prevent background scroll when modal is open
	React.useEffect(() => {
		if (showDetalheModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [showDetalheModal]);

	// Abrir modal DetalheDoacao
	const handleOpenDetalheModal = (item) => {
		const dadosFormatados = {
			instituto: item.ong,
			publicadoEm: item.publicado,
			titulo: item.titulo,
			categoria: item.categoria,
			diasRestantes: item.validade ? `Válido até ${item.validade}` : "Sem prazo definido",
			imagemUrl: item.imageUrl,
			descricao: item.descricao,
			email: item.email || "contato@" + item.ong.toLowerCase().replace(/\s+/g, '') + ".org.br",
			telefone: item.whatsapp || "(81) 9999-9999"
		};
		setDadosDetalhe(dadosFormatados);
		setShowDetalheModal(true);
	};

	// Fechar modal DetalheDoacao
	const handleCloseDetalheModal = () => {
		setShowDetalheModal(false);
		setDadosDetalhe(null);
	};

	// Use a lista completa de categorias ao invés das categorias dos itens
	const categoriasUnicas = todasCategorias;

	return (
		<div className="bg-[#F7F9FB] min-h-screen flex flex-col font-sans">
			<Headernecessidade />
			<main className="flex-1">
				{/* Título e subtítulo */}
				<section className="max-w-[900px] mx-auto text-center mt-10 mb-6 px-2">
					<h1
						className="text-[1.45rem] md:text-[1.7rem] font-extrabold mb-2 leading-tight"
						style={{
							fontFamily: "Inter, sans-serif",
							letterSpacing: "-0.5px",
						}}
					>
						Doe com Propósito
					</h1>
					<p
						className="text-gray-600 text-[0.97rem] md:text-[1.08rem] leading-relaxed"
						style={{ fontFamily: "Inter, sans-serif" }}
					>
						Cada item solicitado por uma ONG representa uma vida que pode ser
						melhorada.
						<br />
						Navegue pelas necessidades da nossa gente e seja a conexão que faz a
						solidariedade acontecer em nossa cidade.
					</p>
				</section>

				{/* Filtros */}
				<div className="bg-white rounded-xl shadow p-4 flex flex-col gap-4 mb-8 max-w-[900px] mx-auto border">
					<span className="flex items-center gap-2 text-gray-700 font-semibold text-[1rem]">
						<img
							src="/imagens/Emoji Filtro.png"
							alt="Filtro"
							className="w-5 h-5"
							draggable={false}
						/>
						Filtros
					</span>
					<div style={{ display: "flex", gap: 16, width: "100%" }}>
						{/* Campo de busca */}
						<div style={{ flex: 1 }}>
							<input
								type="text"
								placeholder="Buscar itens..."
								value={busca}
								onChange={(e) => setBusca(e.target.value)}
								className="pl-4 pr-4 py-2 rounded-lg text-gray-800 text-sm bg-white border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
								style={{
									fontFamily: "Inter, sans-serif",
									height: "40px",
									boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
								}}
							/>
						</div>
						{/* Campo de categorias */}
						<div style={{ flex: 1 }}>
							<select
								value={categoria}
								onChange={(e) => setCategoria(e.target.value)}
								className="border rounded-md px-3 py-2 bg-white text-gray-700 w-full text-[0.97rem]"
								style={{ fontFamily: "Inter, sans-serif", height: "40px" }}
							>
								<option value="">Categorias</option>
								{categoriasUnicas.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Contador de itens */}
				<div
					className="max-w-[900px] mx-auto mb-4 px-2 text-gray-400 text-xs text-left"
					style={{ fontFamily: "Inter, sans-serif" }}
				>
					{paginatedData.totalItems} itens encontrados - Página {currentPage} de {paginatedData.totalPages}
				</div>

				{/* Grid de cards */}
				<section className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-2">
					{paginatedData.items.map((item) => (
						<div key={item.id}>
							<div
								className="relative flex flex-col bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition overflow-hidden h-full cursor-pointer"
								onClick={() => handleOpenDetalheModal(item)}
							>
								{/* Imagem */}
								<div className="relative">
									<img
										src={item.imageUrl}
										alt={item.titulo}
										className="w-full h-40 object-cover object-center bg-white rounded-t-2xl"
										style={{
											imageRendering: "auto",
											borderBottom: "1px solid #f3f4f6",
											backgroundColor: "#fff",
										}}
										loading="lazy"
										draggable={false}
									/>
									{/* Badge categoria */}
									<span
										className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow ${
											badgeColors[item.categoria] || badgeColors.default
										}`}
									>
										{item.categoria}
									</span>
								</div>
								{/* Conteúdo */}
								<div className="flex flex-col flex-1 px-5 py-4">
									<a
										href="#"
										className="text-[#007AFF] text-xs font-semibold mb-1 hover:underline"
										style={{ fontFamily: "Inter, sans-serif" }}
										onClick={e => e.preventDefault()}
									>
										{item.ong}
									</a>
									<div
										className="text-[1.15rem] font-bold mb-1 leading-tight text-[#222]"
										style={{ fontFamily: "Inter, sans-serif" }}
									>
										{item.titulo}
									</div>
									<div
										className="text-[#666] text-xs mb-2 line-clamp-3"
										style={{ fontFamily: "Inter, sans-serif" }}
									>
										{item.descricao}
									</div>
									
									{/* Redes sociais */}
									{item.facebook && (
										<div className="flex items-center gap-2 mb-2">
											<a 
												href={item.facebook} 
												target="_blank" 
												rel="noopener noreferrer"
												className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
												onClick={e => e.stopPropagation()}
											>
												<Facebook className="w-3 h-3" />
												Facebook
											</a>
										</div>
									)}

									<div className="mt-auto flex flex-col gap-1 text-[11px] text-[#888]">
										<div className="flex items-center gap-1">
											<img
												src="/imagens/Emoji relogio.png"
												alt="Publicado em"
												className="w-4 h-4"
												style={{ filter: "grayscale(60%)" }}
												draggable={false}
											/>
											<span>Publicado em {item.publicado || "Data não informada"}</span>
										</div>
										{item.validade && (
											<div className="flex items-center gap-1 text-[#FF3B30] font-semibold">
												<img
													src="/imagens/Emoji Calendario.png"
													alt="Validade"
													className="w-4 h-4"
													style={{ filter: "grayscale(0%)" }}
													draggable={false}
												/>
												<span>Válido até {item.validade}</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</section>
				<div className="max-w-[900px] mx-auto flex justify-center mb-12">
					<Pagination
						currentPage={currentPage}
						totalPages={paginatedData.totalPages}
						onPageChange={handlePageChange}
						baseUrl="/todas-doacoes"
					/>
				</div>

				{/* "Você sabia?" */}
				<section className="max-w-[900px] mx-auto mb-20 px-2">
					<h2
						className="text-[1rem] font-semibold mb-2"
						style={{ fontFamily: "Inter, sans-serif" }}
					>
						Você sabia?
					</h2>
					<p
						className="text-gray-600 text-[0.97rem]"
						style={{ fontFamily: "Inter, sans-serif" }}
					>
						Milhares de ONGs no Brasil enfrentam dificuldades para captar doações e
						divulgar suas necessidades.
					</p>
				</section>
			</main>
			<Footer />

			{/* Modal DetalheDoacao */}
			{showDetalheModal && dadosDetalhe && (
				<DetalheDoacao 
					dados={dadosDetalhe}
					onClose={handleCloseDetalheModal}
				/>
			)}
		</div>
	);
}




/* App.jsx



import TodasDoacoes from "./components/ui/paginas/TodasDoacoes";

const mockDoacoes = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", // Laptop
    categoria: "Equipamento",
    urgencia: "",
    ong: "Fundação Recife Solidário",
    titulo: "Laptops para Educação",
    quantidade: "8 unidades",
    descricao:
      "Laptops para programas de inclusão digital e educação. Itens em funcionamento e em bom estado de uso.",
    publicado: "09/06/2024",
    validade: "",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", // Alimentos
    categoria: "Alimentos",
    urgencia: "Urgente",
    ong: "Instituto Criança Feliz",
    titulo: "Cestas Básicas Completas",
    quantidade: "25 unidades",
    descricao:
      "Cestas básicas completas com arroz, feijão, macarrão, óleo, açúcar, café e outros itens essenciais. Para famílias em situação de vulnerabilidade.",
    publicado: "10/07/2024",
    validade: "15/07/2024",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80", // Roupas
    categoria: "Roupas",
    urgencia: "",
    ong: "Lar Esperança",
    titulo: "Roupas Adulto e Infantil",
    quantidade: "50 peças",
    descricao:
      "Roupas em bom estado para adultos e crianças. Aceitamos roupas de inverno e verão.",
    publicado: "08/07/2024",
    validade: "",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80", // Móveis
    categoria: "Móveis",
    urgencia: "",
    ong: "Casa Nova ONG",
    titulo: "Camas e Colchões",
    quantidade: "6 unidades",
    descricao:
      "Camas e colchões para famílias que perderam seus pertences em enchentes. Itens limpos e em bom estado.",
    publicado: "07/07/2024",
    validade: "",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80", // Brinquedos
    categoria: "Brinquedos",
    urgencia: "",
    ong: "Projeto Sorriso",
    titulo: "Brinquedos Educativos",
    quantidade: "30 unidades",
    descricao:
      "Brinquedos educativos para crianças de 3 a 10 anos. Preferência por brinquedos novos ou seminovos.",
    publicado: "05/07/2024",
    validade: "",
  },
  {
    id: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-ec7e1b3c1b6b?auto=format&fit=crop&w=600&q=80", // Medicamentos
    categoria: "Medicamentos",
    urgencia: "Urgente",
    ong: "Saúde para Todos",
    titulo: "Medicamentos Básicos",
    quantidade: "100 caixas",
    descricao:
      "Medicamentos básicos como dipirona, paracetamol, soro fisiológico, entre outros. Apenas dentro do prazo de validade.",
    publicado: "04/07/2024",
    validade: "30/07/2024",
  },
  {
    id: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80", // Material Escolar
    categoria: "Material Escolar",
    urgencia: "",
    ong: "Educa Brasil",
    titulo: "Kits de Material Escolar",
    quantidade: "40 kits",
    descricao:
      "Kits com cadernos, lápis, borracha, régua, cola, tesoura e mochila. Para crianças do ensino fundamental.",
    publicado: "03/07/2024",
    validade: "",
  },
  {
    id: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80", // Livros
    categoria: "Livros",
    urgencia: "",
    ong: "Biblioteca Comunitária",
    titulo: "Livros Infantis",
    quantidade: "60 livros",
    descricao:
      "Livros infantis para incentivar a leitura em comunidades carentes. Aceitamos livros novos e usados em bom estado.",
    publicado: "02/07/2024",
    validade: "",
  },
  {
    id: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", // Alimentos (Leite)
    categoria: "Alimentos",
    urgencia: "",
    ong: "ONG Bem Viver",
    titulo: "Leite em Pó",
    quantidade: "20 latas",
    descricao:
      "Leite em pó para crianças e idosos. Preferência por embalagens fechadas e dentro do prazo de validade.",
    publicado: "01/07/2024",
    validade: "20/07/2024",
  },
];

function App() {
  return <TodasDoacoes itens={mockDoacoes} />;
}

export default App;*/