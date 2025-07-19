import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Botao } from "@/components/ui/botao";
import { Upload, Facebook, Instagram } from "lucide-react";

export function SolicitarDoacao(props) {
  const [facebook, setFacebook] = useState(false);
  const [instagram, setInstagram] = useState(false);
  const navigate = useNavigate();
  const { onClose } = props;

  function handleCancel() {
    if (onClose) onClose();
    navigate(-1);
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative p-4">
      {/* Botão de fechar */}
      <button
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-3xl font-bold z-20"
        onClick={onClose}
        aria-label="Fechar"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="w-full max-w-4xl bg-white rounded-[32px] shadow-2xl p-12 border-0">
        <form className="space-y-8">
            {/* Layout principal com imagem à esquerda e campos à direita */}
            <div className="grid grid-cols-12 gap-8">
              {/* Imagem - ocupa 3 colunas */}
              <div className="col-span-3 flex flex-col">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-xl h-48 w-full cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
                  <Upload className="w-12 h-12 text-neutral-400 mb-3" />
                  <span className="text-neutral-400 text-sm text-center">Clique para upload</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
              
              {/* Campos principais - ocupa 9 colunas */}
              <div className="col-span-9">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="titulo" className="text-sm font-medium text-gray-700 mb-1 block">Título</Label>
                    <Input id="titulo" placeholder="Nome" className="h-10" />
                  </div>
                  <div>
                    <Label htmlFor="categoria" className="text-sm font-medium text-gray-700 mb-1 block">Categoria</Label>
                    <select id="categoria" className="w-full h-10 border border-gray-300 rounded-md px-3 bg-white text-gray-700 text-sm">
                      <option>Categoria x</option>
                      <option>Alimentos</option>
                      <option>Roupas</option>
                      <option>Brinquedos</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="urgencia" className="text-sm font-medium text-gray-700 mb-1 block">Urgência</Label>
                    <select id="urgencia" className="w-full h-10 border border-gray-300 rounded-md px-3 bg-white text-gray-700 text-sm">
                      <option>Alta</option>
                      <option>Média</option>
                      <option>Baixa</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">Email para contato</Label>
                    <Input id="email" type="email" placeholder="Email" className="h-10" />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp para contato</Label>
                    <Input id="whatsapp" placeholder="(xx) xxxxx-xxxx" className="h-10" />
                  </div>
                  <div>
                    <Label htmlFor="prazo" className="text-sm font-medium text-gray-700 mb-1 block">Prazo (opcional)</Label>
                    <Input id="prazo" placeholder="Digite o prazo" className="h-10" />
                  </div>
                </div>
                
                {/* Redes sociais */}
                <div className="mt-6">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Redes Sociais (opcional)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <Label htmlFor="facebook" className="text-sm font-medium text-gray-700 min-w-[70px]">Facebook</Label>
                      <Input
                        id="facebook"
                        placeholder="Nome do Facebook"
                        className="h-10 flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="w-5 h-5 text-pink-600" />
                      <Label htmlFor="instagram" className="text-sm font-medium text-gray-700 min-w-[70px]">Instagram</Label>
                      <Input
                        id="instagram"
                        placeholder="Nome do Instagram"
                        className="h-10 flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Descrição */}
            <div className="mt-8">
              <Label htmlFor="descricao" className="text-sm font-medium text-gray-700 mb-2 block">
                Descrição (características e quantidade) e Propósito do Item (para que fim o item vai ser utilizado):
              </Label>
              <textarea
                id="descricao"
                className="w-full h-32 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Descreva detalhadamente o(s) item(s) e diga o propósito deles"
              />
            </div>
            
            {/* Botões */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <Botao
                variant="outline"
                className="px-8 py-3 text-gray-600 border-gray-300 hover:bg-gray-50 rounded-lg font-medium"
                onClick={handleCancel}
                type="button"
              >
                Cancelar
              </Botao>
              <Botao
                variant="primary"
                className="px-8 py-3 text-white bg-[#172233] hover:bg-[#22304d] rounded-lg font-medium shadow-sm"
                type="submit"
              >
                Publicar
              </Botao>
            </div>
          </form>
        </div>
    </div>
  );
}
