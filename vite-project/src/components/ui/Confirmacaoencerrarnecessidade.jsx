import { Botao } from "@/components/ui/botao";
import { Card } from "@/components/ui/card";
import { ExclamationTriangle } from "lucide-react";

export default function ConfirmacaoEncerrarNecessidade({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <Card className="w-full max-w-sm bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <ExclamationTriangle className="w-12 h-12 text-gray-700 mb-2" />
          <h2 className="text-2xl font-semibold mb-2">Tem certeza?</h2>
          <p className="text-gray-600 mb-6">Você realmente deseja encerrar esta realocação</p>
          <div className="flex gap-4 justify-center">
            <Botao variant="outline" className="px-6 py-2 text-gray-700 border-gray-300" onClick={onCancel}>
              Cancelar
            </Botao>
            <Botao variant="destructive" className="px-6 py-2 text-white bg-red-600 hover:bg-red-700" onClick={onConfirm}>
              Encerrar
            </Botao>
          </div>
        </div>
      </Card>
    </div>
  );
}
