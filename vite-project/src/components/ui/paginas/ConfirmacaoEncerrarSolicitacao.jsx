import { Card } from "../card";
import { Botao } from "../botao";
import { AlertTriangle } from "lucide-react";

export default function ConfirmacaoEncerrarSolicitacao({ onCancel, onConfirm }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        zIndex: 50,
      }}
    >
      <Card className="w-full max-w-xs sm:max-w-sm bg-white rounded-xl shadow-xl p-8 text-center border-2 border-blue-400">
        <div className="flex flex-col items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-gray-700 mb-2" />
          <h2 className="text-2xl font-semibold mb-2">Tem certeza?</h2>
          <p className="text-gray-600 mb-6">Você realmente deseja encerrar esta solicitação</p>
          <div className="flex gap-4 justify-center">
            <Botao variant="outline" className="px-6 py-2 text-gray-700 border-gray-300 cursor-pointer" onClick={onCancel}>
              Cancelar
            </Botao>
            <Botao variant="destructive" className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 cursor-pointer" onClick={onConfirm}>
              Encerrar
            </Botao>
          </div>
        </div>
      </Card>
    </div>
  );
}
