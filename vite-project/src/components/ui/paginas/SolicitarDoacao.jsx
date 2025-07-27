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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Solicitar Doação</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                Categoria *
              </label>
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

            {/* Título */}
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título da necessidade *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                className="w-full border rounded-md px-3 py-2 mt-1"
                value={formData.titulo}
                onChange={handleInputChange}
                required
                placeholder="Ex: Cestas básicas para famílias carentes"
              />
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={4}
                className="w-full border rounded-md px-3 py-2 mt-1"
                value={formData.descricao}
                onChange={handleInputChange}
                required
                placeholder="Descreva em detalhes o que você precisa e como será usado..."
              />
            </div>

            {/* Urgência */}
            <div>
              <label htmlFor="urgencia" className="block text-sm font-medium text-gray-700">
                Nível de urgência *
              </label>
              <select 
                id="urgencia" 
                name="urgencia"
                className="w-full border rounded-md px-3 py-2 bg-white text-neutral-700 mt-1"
                value={formData.urgencia}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione a urgência</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            {/* Prazo */}
            <div>
              <label htmlFor="prazo" className="block text-sm font-medium text-gray-700">
                Prazo limite (opcional)
              </label>
              <input
                type="date"
                id="prazo"
                name="prazo"
                className="w-full border rounded-md px-3 py-2 mt-1"
                value={formData.prazo}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Contatos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email para contato *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border rounded-md px-3 py-2 mt-1"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="contato@ong.org.br"
                />
              </div>
              
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                  WhatsApp (opcional)
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  className="w-full border rounded-md px-3 py-2 mt-1"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            {/* Upload de imagem */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                URL da imagem (opcional)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="w-full border rounded-md px-3 py-2 mt-1"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Se não inserir uma imagem, usaremos uma imagem padrão da categoria
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#172233] text-white rounded-md hover:bg-[#22304d] transition"
              >
                Publicar Solicitação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
