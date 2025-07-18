import ConfirmacaoEncerrarRealocacao from "@/components/ui/paginas/ConfirmacaoEncerrarRealocacao";

function App() {
  return (
    <ConfirmacaoEncerrarRealocacao
      onCancel={() => alert("Cancelado!")}
      onConfirm={() => alert("Encerrado!")}
    />
  );
}

export default App;
