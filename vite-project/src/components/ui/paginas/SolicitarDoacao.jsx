import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Botao } from "@/components/ui/botao";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useData } from "@/context/DataContext";

export function SolicitarDoacao({ onClose, editData = null }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editData?.imageUrl || null);
  const [formData, setFormData] = useState({
    titulo: editData?.titulo || "",
    categoria: editData?.categoria || "",
    quantidade: editData?.quantidade || "",
    urgencia: editData?.urgencia || "",
    prazo: editData?.prazo || "",
    whatsapp: editData?.whatsapp || "",
    email: editData?.email || "",
    descricao: editData?.descricao || "",
    imageUrl: editData?.imageUrl || ""
  });
  
  const navigate = useNavigate();
  const { addDoacao, updateDoacao } = useData();
  const isEditing = editData !== null;

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
        "Roupas e Calçados": "/imagens/roupas.jpg",
        "Materiais Educativos e Culturais": "/imagens/MatEsc.jpg",
        "Saúde e Higiene": "/imagens/med.jpg",
        "Utensílios Gerais": "/imagens/alimentos.jpg",
        "Itens de Inclusão e Mobilidade": "/imagens/outros.jpg",
        "Eletrodomésticos e Móveis": "/imagens/moveis.jpg",
        "Itens Pet": "/imagens/outros.jpg",
        "Roupas e Calçados": "/imagens/roupas.jpg",
        "Materiais Educativos e Culturais": "/imagens/MatEsc.jpg",
        "Saúde e Higiene": "/imagens/med.jpg",
        "Utensílios Gerais": "/imagens/alimentos.jpg",
        "Itens de Inclusão e Mobilidade": "/imagens/outros.jpg",
        "Eletrodomésticos e Móveis": "/imagens/moveis.jpg",
        "Itens Pet": "/imagens/outros.jpg",
        "Eletrônicos": "/imagens/Laptops.jpg",
        "Outros": "/imagens/outros.jpg"
      };
      finalImageUrl = defaultImages[formData.categoria] || defaultImages["Outros"];
      finalImageUrl = defaultImages[formData.categoria] || defaultImages["Outros"];
    }

    // Criar dados da doação
    const dadosDoacao = {
      titulo: formData.titulo,
      categoria: formData.categoria,
      quantidade: formData.quantidade,
      email: formData.email,
      whatsapp: formData.whatsapp,
      urgencia: formData.urgencia || "Baixa",
      prazo: formData.prazo,
      descricao: formData.descricao,
      ong: "Sua ONG", // Seria pego do usuário logado
      imageUrl: finalImageUrl, // Usar a imagem enviada ou padrão
      validade: formData.prazo
    };

    if (isEditing) {
      // Atualizar doação existente
      updateDoacao(editData.id, dadosDoacao);
      alert("Doação atualizada com sucesso!");
    } else {
      // Adicionar nova doação
      addDoacao(dadosDoacao);
      alert("Solicitação de doação criada com sucesso!");
    }
    
    // Fechar modal
    if (onClose) {
      onClose();
    }
  }

  function handleBackdropClick(e) {
    // Fechar modal se clicar no backdrop (fundo escuro)
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={handleBackdropClick}
    >
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
                    placeholder="Nome" 
                    className="mt-1"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quantidade" className="text-base font-medium">Quantidade</Label>
                  <Input 
                    id="quantidade" 
                    name="quantidade"
                    placeholder="xx" 
                    className="mt-1"
                    value={formData.quantidade}
                    onChange={handleInputChange}
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
                    <option value="Roupas e Calçados">Roupas e Calçados</option>
                    <option value="Materiais Educativos e Culturais">Materiais Educativos e Culturais</option>
                    <option value="Saúde e Higiene">Saúde e Higiene</option>
                    <option value="Utensílios Gerais">Utensílios Gerais</option>
                    <option value="Itens de Inclusão e Mobilidade">Itens de Inclusão e Mobilidade</option>
                    <option value="Eletrodomésticos e Móveis">Eletrodomésticos e Móveis</option>
                    <option value="Itens Pet">Itens Pet</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Outros">Outros</option>
                  </select>
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
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="prazo" className="text-base font-medium">Prazo</Label>
                  <select 
                    id="prazo" 
                    name="prazo"
                    className="w-full border rounded-md px-3 py-2 bg-white text-neutral-700 mt-1"
                    value={formData.prazo}
                    onChange={handleInputChange}
                  >
                    <option value="">60 dias</option>
                    <option value="15 dias">15 dias</option>
                    <option value="30 dias">30 dias</option>
                    <option value="45 dias">45 dias</option>
                    <option value="60 dias">60 dias</option>
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
                <div className="col-span-2">
                  <Label htmlFor="email" className="text-base font-medium">Email para contato</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    className="mt-1"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Upload de imagem */}

            {/* Upload de imagem */}
            <div>
              <Label htmlFor="descricao" className="mb-1 block text-base font-medium">
                Descrição e propósito do Item (para que fim o item vai ser utilizado):
              </Label>
              <textarea
                id="descricao"
                name="descricao"
                className="w-full min-h-28 rounded-md border border-input bg-neutral-50 px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                placeholder="Descreva detalhadamente o(s) item(s) e diga o propósito deles"
                value={formData.descricao}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Se não inserir uma imagem, usaremos uma imagem padrão da categoria
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Se não inserir uma imagem, usaremos uma imagem padrão da categoria
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#172233] text-white rounded-md hover:bg-[#22304d] transition"
                className="flex-1 px-4 py-2 bg-[#172233] text-white rounded-md hover:bg-[#22304d] transition"
              >
                Publicar Solicitação
                Publicar Solicitação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
