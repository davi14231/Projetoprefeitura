import { Card } from "../card";
import { Botao } from "../botao";
import { AlertTriangle } from "lucide-react";

// tipo: 'doacao' | 'realocacao'
// onDelete: função para remover do banco
export default function ConfirmacaoDeletar({ onCancel, onConfirm, onDelete, tipo = 'realocacao' }) {
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    if (onDelete) onDelete();
    if (onConfirm) onConfirm();
  };
  
  // Textos dinâmicos
  const isDoacao = tipo === 'doacao';
  const titulo = isDoacao ? 'Excluir Solicitação?' : 'Exclusão Permanente';
  const subtitulo = isDoacao
    ? 'Você tem certeza de que deseja excluir esta solicitação?'
    : 'Deseja realmente excluir esta realocação do seu histórico? Esta ação não pode ser desfeita.';
  const info = isDoacao
    ? 'A solicitação será removida para sempre do seu histórico de pedidos.'
    : '';
  const botao = isDoacao ? 'Excluir' : 'Excluir';

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
  <Card data-testid="confirmacao-deletar" className="w-full max-w-xs sm:max-w-sm bg-white rounded-xl shadow-xl p-8 text-center border-2">
        <div className="flex flex-col items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-gray-700 mb-2" />
          <h2 className="text-2xl font-semibold mb-2">{titulo}</h2>
          <p className="text-gray-600 mb-2">{subtitulo}</p>
          {info && <p className="text-gray-500 text-xs mb-4">{info}</p>}
          <div className="flex gap-4 justify-center mt-2">
            <Botao data-testid="cancelar-excluir" variant="outline" className="px-6 py-2 text-gray-700 border-gray-300 cursor-pointer" onClick={handleCancel}>
              Cancelar
            </Botao>
            <Botao data-testid="confirmar-excluir" variant="destructive" className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 cursor-pointer" onClick={handleConfirm}>
              {botao}
            </Botao>
          </div>
        </div>
      </Card>
    </div>
  );
}
