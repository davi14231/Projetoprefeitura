import DetalheDoacao from "./components/ui/paginas/DetalheDoacao";

const dadosDaDoacao = {
  instituto: 'Instituto Viver Mais',
  publicadoEm: '07/04/25',
  titulo: 'Kits de toalhas de banho',
  categoria: 'Roupas e Calçados',
  diasRestantes: 17,
  imagemUrl: 'https://placehold.co/600x400/E2E8F0/475569?text=Imagem+da+Doação',
  descricao: 'Solicitamos a doação de toalhas para atender uma demanda urgente em nossos abrigos temporários...',
  email: 'kellysayonara854@gmail.com',
  telefone: '(81) 8446-5009'
};

function App() {
  return <DetalheDoacao dados={dadosDaDoacao} />;
}

export default App;
