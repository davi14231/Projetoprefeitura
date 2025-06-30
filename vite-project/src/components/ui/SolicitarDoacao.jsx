import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Botao } from "@/components/ui/botao";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Facebook, Instagram } from "lucide-react";

export function SolicitarDoacao() {
  const [facebook, setFacebook] = useState(false);
  const [instagram, setInstagram] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg">
        <CardContent className="p-10">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Imagem */}
              <div className="col-span-1">
                <Label className="mb-2 block text-base font-medium">Imagem</Label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg h-36 cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
                  <Upload className="w-9 h-9 text-neutral-400 mb-2" />
                  <span className="text-neutral-400 text-sm">Clique para upload</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
              {/* Campos principais */}
              <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="titulo" className="text-base font-medium">Título</Label>
                  <Input id="titulo" placeholder="Nome" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="categoria" className="text-base font-medium">Categoria</Label>
                  <select id="categoria" className="w-full border rounded-md px-3 py-2 bg-white text-neutral-700 mt-1">
                    <option>Categoria x</option>
                    <option>Alimentos</option>
                    <option>Roupas</option>
                    <option>Brinquedos</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-medium">Email para contato</Label>
                  <Input id="email" type="email" placeholder="email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="urgencia" className="text-base font-medium">Urgência</Label>
                  <select id="urgencia" className="w-full border rounded-md px-3 py-2 bg-white text-neutral-700 mt-1">
                    <option>Alta</option>
                    <option>Média</option>
                    <option>Baixa</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="whatsapp" className="text-base font-medium">WhatsApp para contato</Label>
                  <Input id="whatsapp" placeholder="(xx) xxxxx-xxxx" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="prazo" className="text-base font-medium">Prazo (opcional)</Label>
                  <Input id="prazo" placeholder="Digite o prazo" className="mt-1" />
                </div>
              </div>
            </div>
            {/* Redes sociais */}
            <div>
              <Label className="block mb-2 text-base font-medium">Redes Sociais (opcional)</Label>
              <div className="flex flex-row items-center gap-8">
                {/* Facebook */}
                <div className="flex items-center gap-1">
                  <Facebook className="w-5 h-5 text-neutral-500" />
                  <Label htmlFor="facebook" className="text-neutral-700 text-base font-medium ml-1">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="Nome do Facebook"
                    className="w-44 ml-2"
                    style={{ marginTop: 0 }}
                  />
                </div>
                {/* Instagram */}
                <div className="flex items-center gap-1 ml-6">
                  <Instagram className="w-5 h-5 text-neutral-500" />
                  <Label htmlFor="instagram" className="text-neutral-700 text-base font-medium ml-1">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="Nome do Instagram"
                    className="w-44 ml-2"
                    style={{ marginTop: 0 }}
                  />
                </div>
              </div>
            </div>
            {/* Descrição */}
            <div>
              <Label htmlFor="descricao" className="mb-1 block text-base font-medium">
                Descrição (características e quantidade) e Propósito do Item (para que fim o item vai ser utilizado):
              </Label>
              <textarea
                id="descricao"
                className="w-full min-h-28 rounded-md border border-input bg-neutral-50 px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                placeholder="Descreva detalhadamente o(s) item(s) e diga o propósito deles"
              />
            </div>
            {/* Botões */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-6 py-2 rounded-lg bg-neutral-200 text-neutral-700 font-medium hover:bg-neutral-300 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Publicar
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}