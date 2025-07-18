import { Header } from "@/components/ui/layouts/Header";
import { Footer } from "@/components/ui/layouts/Footer";
import { CardPedidos } from "@/components/ui/CardPedidos";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockDoacoes = [
	{
		id: 1,
		imageUrl: "/imagens/alimentos.jpg",
		categoria: "Alimentos",
		urgencia: "",
		ong: "Instituto Criança Feliz",
		titulo: "Cestas Básicas Completas",
		quantidade: "25 unidades",
		descricao:
			"Cestas básicas completas com arroz, feijão, macarrão, óleo, açúcar, café e outros itens essenciais. Para famílias em situação de vulnerabilidade.",
		publicado: "10/07/2024",
		validade: "15/07/2024",
	},
	{
		id: 2,
		imageUrl: "/imagens/roupas infantil.jpg",
		categoria: "Roupas",
		urgencia: "",
		ong: "Casa do Menor São Miguel",
		titulo: "Roupas Infantis Variadas",
		quantidade: "50 peças",
		descricao:
			"Roupas infantis para crianças de 2 a 12 anos, incluindo camisetas, calças, shorts e uniformes escolares.",
		publicado: "12/06/2024",
		validade: "20/07/2024",
	},
	{
		id: 3,
		imageUrl: "/imagens/equipamento.jpg",
		categoria: "Equipamento",
		urgencia: "",
		ong: "Fundação Recife Solidário",
		titulo: "Laptops para Educação",
		quantidade: "8 unidades",
		descricao:
			"Laptops para programas de inclusão digital e educação. Itens em funcionamento e em bom estado de conservação.",
		publicado: "09/06/2024",
		validade: "30/07/2024",
	},
	{
		id: 4,
		imageUrl: "/imagens/moveis.jpg",
		categoria: "Móveis",
		urgencia: "",
		ong: "ONG Esperança Verde",
		titulo: "Mobilia de Escritório",
		quantidade: "12 peças",
		descricao:
			"Conjunto de móveis de escritório incluindo mesas, cadeiras, armários e estantes.",
		publicado: "05/06/2024",
		validade: "25/07/2024",
	},
	{
		id: 5,
		imageUrl: "/imagens/brinquedos.jpg",
		categoria: "Brinquedos",
		urgencia: "",
		ong: "Associação Mãos Amigas",
		titulo: "Brinquedos Educativos",
		quantidade: "30 unidades",
		descricao:
			"Brinquedos educativos para crianças de 3 a 10 anos, incluem jogos de montar, quebra-cabeças, livros de colorir e material pedagógico.",
		publicado: "19/06/2024",
		validade: "30/07/2024",
	},
	{
		id: 6,
		imageUrl: "/imagens/medicamentos.jpg",
		categoria: "Medicamentos",
		urgencia: "Urgente",
		ong: "Centro Social São José",
		titulo: "Medicamentos Diversos",
		quantidade: "100 unidades",
		descricao:
			"Medicamentos diversos incluindo analgésicos, antitérmicos, vitaminas e suplementos.",
		publicado: "14/06/2024",
		validade: "20/07/2024",
	},
	{
		id: 7,
		imageUrl: "/imagens/materiais.jpg",
		categoria: "Material Escolar",
		urgencia: "",
		ong: "Instituto Recife Educação",
		titulo: "Material Escolar Completo",
		quantidade: "40 kits",
		descricao:
			"Kits de material escolar completo com cadernos, lápis, canetas, borrachas, cola e mochilas.",
		publicado: "11/06/2024",
		validade: "25/07/2024",
	},
	{
		id: 8,
		imageUrl: "/imagens/livro.jpg",
		categoria: "Livros",
		urgencia: "",
		ong: "Biblioteca Comunitária Recife",
		titulo: "Livros Didáticos e Literatura",
		quantidade: "200 exemplares",
		descricao:
			"Coleção de livros didáticos do ensino fundamental e médio, além de literatura infantil e juvenil.",
		publicado: "09/06/2024",
		validade: "30/07/2024",
	},
	{
		id: 9,
		imageUrl: "/imagens/livro.jpg",
		categoria: "Livros",
		urgencia: "",
		ong: "Biblioteca Comunitária Recife",
		titulo: "Livros Didáticos e Literatura",
		quantidade: "200 exemplares",
		descricao:
			"Coleção de livros didáticos do ensino fundamental e médio, além de literatura infantil e juvenil.",
		publicado: "09/06/2024",
		validade: "30/07/2024",
	},
];

// Função para cor do badge por categoria
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
	return (
		<div className="bg-[#F7F9FB] min-h-screen flex flex-col font-sans">
			<Header />
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
				<section className="max-w-[900px] mx-auto bg-white rounded-xl shadow border px-6 py-5 mb-8">
					<form className="flex gap-4 items-center w-full">
						<div className="flex flex-1 gap-4 w-full">
							<div className="flex-1">
								<Label htmlFor="busca" className="sr-only">
									Buscar itens
								</Label>
								<div className="relative w-full">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
										<img
											src="/imagens/lupa.png"
											alt="Buscar"
											className="w-5 h-5 opacity-60"
											draggable={false}
										/>
									</span>
									<input
										id="busca"
										type="text"
										placeholder="Pesquisar necessidades ou itens das ONGs"
										className="pl-10 pr-4 py-2 rounded-lg text-gray-800 text-sm bg-white border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
										style={{
											fontFamily: "Inter, sans-serif",
											height: "40px",
											boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
										}}
									/>
								</div>
							</div>
							<div className="w-[180px]">
								<Label htmlFor="categoria" className="sr-only">
									Categoria
								</Label>
								<select
									id="categoria"
									className="border rounded-md px-3 py-2 bg-white text-gray-700 w-full text-[0.97rem]"
									style={{ fontFamily: "Inter, sans-serif" }}
								>
									<option>Categoria</option>
									<option>Alimentos</option>
									<option>Roupas</option>
									<option>Brinquedos</option>
									<option>Livros</option>
									<option>Medicamentos</option>
								</select>
							</div>
						</div>
					</form>
				</section>

				{/* Contador de itens */}
				<div
					className="max-w-[900px] mx-auto mb-4 px-2 text-gray-400 text-xs text-left"
					style={{ fontFamily: "Inter, sans-serif" }}
				>
					{mockDoacoes.length} itens encontrados
				</div>

				{/* Grid de cards */}
				<section className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-2">
					{mockDoacoes.map((item) => (
						<div
							key={item.id}
							className="w-full max-w-[400px] mx-auto h-[370px] flex"
						>
							<div className="relative flex flex-col bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition overflow-hidden h-full cursor-pointer">
								{/* Imagem */}
								<div className="relative">
									<img
										src={item.imageUrl}
										alt={item.titulo}
										className="w-full h-40 object-contain object-center bg-white"
										style={{
											imageRendering: "auto",
											borderBottom: "1px solid #f3f4f6",
											backgroundColor: "#fff",
											padding: "12px",
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
									{/* Badge urgência */}
									{item.urgencia && (
										<span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#FF3B30] text-white shadow">
											{item.urgencia}
										</span>
									)}
								</div>
								{/* Conteúdo */}
								<div className="flex flex-col flex-1 px-5 py-4">
									<a
										href="#"
										className="text-[#007AFF] text-xs font-semibold mb-1 hover:underline"
										style={{ fontFamily: "Inter, sans-serif" }}
									>
										{item.ong}
									</a>
									<div
										className="text-lg font-bold mb-1 leading-tight"
										style={{ fontFamily: "Inter, sans-serif" }}
									>
										{item.titulo}
									</div>
									<div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
										<span role="img" aria-label="Quantidade">📦</span>
										<span className="font-medium">{item.quantidade}</span>
									</div>
									<div
										className="text-gray-600 text-xs mb-2 line-clamp-3"
										style={{ fontFamily: "Inter, sans-serif" }}
									>
										{item.descricao}
									</div>
									<div className="mt-auto flex flex-col gap-1 text-[11px] text-gray-400">
										<div className="flex items-center gap-1">
											<span role="img" aria-label="Publicado em">🕒</span>
											<span>Publicado em {item.publicado}</span>
										</div>
										{(item.categoria === "Alimentos" || item.categoria === "Medicamentos") && (
											<div className="flex items-center gap-1 text-[#FF3B30] font-semibold">
												<span role="img" aria-label="Validade">📅</span>
												<span>Válido até {item.validade}</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</section>

				{/* Paginação */}
				<div className="max-w-[1200px] mx-auto flex justify-center mb-12">
					<nav className="flex gap-2">
						<button className="w-8 h-8 rounded bg-blue-600 text-white font-semibold text-[0.97rem]">
							1
						</button>
						<button className="w-8 h-8 rounded bg-white border text-gray-700 hover:bg-gray-100 text-[0.97rem]">
							2
						</button>
						<button className="w-8 h-8 rounded bg-white border text-gray-700 hover:bg-gray-100 text-[0.97rem]">
							3
						</button>
						<span className="w-8 h-8 flex items-center justify-center text-[0.97rem]">
							...
						</span>
						<button className="w-8 h-8 rounded bg-white border text-gray-700 hover:bg-gray-100 text-[0.97rem]">
							67
						</button>
						<button className="w-8 h-8 rounded bg-white border text-gray-700 hover:bg-gray-100 text-[0.97rem]">
							68
						</button>
					</nav>
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
		</div>
	);
}