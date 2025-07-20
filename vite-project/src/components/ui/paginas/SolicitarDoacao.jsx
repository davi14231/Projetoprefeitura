import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Botao } from "@/components/ui/botao";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Facebook, Instagram, X } from "lucide-react";
import { useData } from "@/context/DataContext";

export function SolicitarDoacao({ onClose }) {
  const [facebook, setFacebook] = useState(false);
  const [instagram, setInstagram] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    email: "",
    whatsapp: "",
    urgencia: "",
    prazo: "",
    descricao: "",
    facebook: "",
    instagram: "",
    imageUrl: ""
  });
  
  const navigate = useNavigate();
  const { addDoacao } = useData();

  function handleCancel() {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          imageUrl: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      imageUrl: ""
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validação básica
    if (!formData.titulo || !formData.categoria || !formData.email || !formData.whatsapp || !formData.descricao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Se não há imagem enviada, usar uma imagem padrão baseada na categoria
    let finalImageUrl = formData.imageUrl;
    if (!finalImageUrl) {
      const defaultImages = {
        "Alimentos": "/imagens/alimentos.jpg",
        "Roupas": "/imagens/roupas.jpg",
        "Medicamentos": "/imagens/medicamentos.jpg",
        "Material Escolar": "/imagens/MatEsc.jpg",
        "Brinquedos": "/imagens/BrinquedosEdu.jpg",
        "Livros": "/imagens/Livrosdid.jpg",
        "Móveis": "/imagens/moveis.jpg",
        "Eletrônicos": "/imagens/Laptops.jpg",
        "Outros": "/imagens/outros.jpg"
      };
      finalImageUrl = defaultImages[formData.categoria] || "/imagens/outros.jpg";
    }

    // Criar nova doação
    const novaDoacao = {
      titulo: formData.titulo,
      categoria: formData.categoria,
      email: formData.email,
      whatsapp: formData.whatsapp,
      urgencia: formData.urgencia || "Baixa",
      prazo: formData.prazo,
      descricao: formData.descricao,
      facebook: formData.facebook,
      instagram: formData.instagram,
      ong: "Sua ONG", // Seria pego do usuário logado
      imageUrl: finalImageUrl, // Usar a imagem enviada ou padrão
      validade: formData.prazo
    };

    // Adicionar ao store
    addDoacao(novaDoacao);
    
    // Mostrar mensagem de sucesso
    alert("Solicitação de doação criada com sucesso!");
    
    // Fechar modal
    if (onClose) {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg bg-white max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18M6 18L18 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <CardContent className="p-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Imagem */}
              <div className="col-span-1">
                <Label className="mb-2 block text-base font-medium">Imagem</Label>
                {!imagePreview ? (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg h-36 cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <Upload className="w-9 h-9 text-neutral-400 mb-2" />
                    <span className="text-neutral-400 text-sm">Clique para upload</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden" 
                    />
                  </label>
                ) : (
                  <div className="relative h-36 border-2 border-dashed border-neutral-300 rounded-lg overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              {/* Campos principais */}
              <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="titulo" className="text-base font-medium">Título</Label>
                  <Input 
                    id="titulo" 
                    name="titulo"
                    placeholder="Nome do item" 
                    className="mt-1"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="categoria" className="text-base font-medium">Categoria</Label>
                  <select 
                    id="categoria" 
                    name="categoria"
                    className="w-full border rounded-md px-3 py-2 bg-white text-neutral-700 mt-1"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Roupas">Roupas</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Móveis">Móveis</option>
                    <option value="Brinquedos">Brinquedos</option>
                    <option value="Medicamentos">Medicamentos</option>
                    <option value="Material Escolar">Material Escolar</option>
                    <option value="Livros">Livros</option>
                    <option value="Equipamento">Equipamento</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-base font-medium">Email para contato</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="email@exemplo.com" 
                    className="mt-1"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="urgencia" className="text-base font-medium">Urgência</Label>
                  <select 
                    id="urgencia" 
                    name="urgencia"
                    className="w-full border rounded-md px-3 py-2 bg-white text-neutral-700 mt-1"
                    value={formData.urgencia}
                    onChange={handleInputChange}
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="whatsapp" className="text-base font-medium">WhatsApp para contato</Label>
                  <Input 
                    id="whatsapp" 
                    name="whatsapp"
                    placeholder="(xx) xxxxx-xxxx" 
                    className="mt-1"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prazo" className="text-base font-medium">Prazo (opcional)</Label>
                  <Input 
                    id="prazo" 
                    name="prazo"
                    type="date"
                    className="mt-1"
                    value={formData.prazo}
                    onChange={handleInputChange}
                  />
                </div>
                
                {/* Campos de redes sociais */}
                <div>
                  <Label htmlFor="facebook" className="text-base font-medium">Facebook (opcional)</Label>
                  <Input 
                    id="facebook" 
                    name="facebook"
                    placeholder="https://facebook.com/suapage" 
                    className="mt-1"
                    value={formData.facebook}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="instagram" className="text-base font-medium">Instagram (opcional)</Label>
                  <Input 
                    id="instagram" 
                    name="instagram"
                    placeholder="https://instagram.com/seuusuario" 
                    className="mt-1"
                    value={formData.instagram}
                    onChange={handleInputChange}
                  />
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
                    name="facebook"
                    placeholder="Nome do Facebook"
                    className="w-44 ml-2"
                    style={{ marginTop: 0 }}
                    value={formData.facebook}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Instagram */}
                <div className="flex items-center gap-1 ml-6">
                  <Instagram className="w-5 h-5 text-neutral-500" />
                  <Label htmlFor="instagram" className="text-neutral-700 text-base font-medium ml-1">Instagram</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    placeholder="Nome do Instagram"
                    className="w-44 ml-2"
                    style={{ marginTop: 0 }}
                    value={formData.instagram}
                    onChange={handleInputChange}
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
                name="descricao"
                className="w-full min-h-28 rounded-md border border-input bg-neutral-50 px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                placeholder="Descreva detalhadamente o(s) item(s) e diga o propósito deles"
                value={formData.descricao}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Botões */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-6 py-2 rounded-lg bg-neutral-200 text-neutral-700 font-medium hover:bg-neutral-300 transition"
                onClick={handleCancel}
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
