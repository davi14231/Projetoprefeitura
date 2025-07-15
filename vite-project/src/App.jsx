import { BlocoDoador, BlocoONG } from "@/components/ui/BlocoInformativo";

function App() {
  return (
    <div>
      <BlocoDoador />
      {/* Aqui você pode colocar qualquer conteúdo entre os blocos */}
      <div className="max-w-5xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Conteúdo entre os blocos
        </h2>
        <p className="text-center text-gray-600">
          Este conteúdo aparece entre "Como o Doador Ajuda?" e "Como a ONG Solicita Itens?".
        </p>
      </div>
      <BlocoONG />
    </div>
  );
}

export default App;