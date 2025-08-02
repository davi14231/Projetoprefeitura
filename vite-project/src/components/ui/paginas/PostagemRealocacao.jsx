import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useData } from "@/context/DataContext";

export function PostagemRealocacao({ onClose, editData = null }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editData?.imageUrl || null);
  const [formData, setFormData] = useState({
    titulo: editData?.titulo || "",
    categoria: editData?.categoria || "",
    quantidade: editData?.quantidade || "",
    email: editData?.email || "",
    whatsapp: editData?.whatsapp || "",
    descricao: editData?.descricao || "",
    imageUrl: editData?.imageUrl || ""
  });
  
  const navigate = useNavigate();
  const { addRealocacao, updateRealocacao } = useData();
  const isEditing = !!editData;

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
        "Eletrônicos": "/imagens/Laptops.jpg",
        "Outros": "/imagens/outros.jpg"
      };
      finalImageUrl = defaultImages[formData.categoria] || defaultImages["Outros"];
    }

    // Criar dados da realocação
    const dadosRealocacao = {
      titulo: formData.titulo,
      categoria: formData.categoria,
      quantidade: formData.quantidade,
      email: formData.email,
      whatsapp: formData.whatsapp,
      descricao: formData.descricao,
      ong: "Sua ONG",
      imageUrl: finalImageUrl,
    };

    if (isEditing) {
      // Atualizar realocação existente
      updateRealocacao(editData.id, dadosRealocacao);
      alert("Realocação atualizada com sucesso!");
    } else {
      // Adicionar nova realocação
      addRealocacao(dadosRealocacao);
      alert("Postagem de realocação criada com sucesso!");
    }
    
    handleCancel(); // Fecha o modal ou navega para a página anterior
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
            {/* Descrição */}
            <div>
              <Label htmlFor="descricao" className="mb-1 block text-base font-medium">
                Descrição:
              </Label>
              <textarea
                id="descricao"
                name="descricao"
                className="w-full min-h-28 rounded-md border border-input bg-neutral-50 px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                placeholder="Descreva detalhadamente o(s) item(s)"
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