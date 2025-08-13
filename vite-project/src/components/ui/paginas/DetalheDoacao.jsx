import React from 'react';
import { X, Share, Mail, Phone } from 'lucide-react';

export default function DetalheDoacao({ dados, onClose }) {
  // 🐛 Debug: Verificar dados recebidos
  console.log('🔍 DetalheDoacao - dados completos:', dados);
  console.log('🔍 DetalheDoacao - WhatsApp:', dados?.whatsapp);
  console.log('🔍 DetalheDoacao - Email:', dados?.email);

  // Função para compartilhar nas redes sociais
  const handleShare = async () => {
    const url = window.location.href;
    const text = `Confira esta doação: ${dados.titulo}`;
    
    // Tentar usar a Web Share API nativa primeiro (funciona melhor em dispositivos móveis)
    if (navigator.share) {
      try {
        await navigator.share({
          title: dados.titulo || 'Doação',
          text: text,
          url: url
        });
        return;
      } catch (error) {
        // Se o usuário cancelar ou houver erro, continua para as opções manuais
        console.log('Compartilhamento cancelado');
      }
    }
    
    // Fallback: mostrar opções de compartilhamento manual
    const shareText = encodeURIComponent(text + ' ' + url);
    const whatsappUrl = `https://wa.me/?text=${shareText}`;
    
    // Abrir WhatsApp como opção principal de fallback
    window.open(whatsappUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white text-slate-900 flex flex-col rounded-xl shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden">
        
        {/* Cabeçalho */}
  <header className="text-white px-6 py-4 flex justify-between items-start" style={{backgroundColor: 'var(--brand-color, #00A5F4)'}}>
          <div>
            <h2 className="text-lg font-medium leading-none">{dados.instituto || dados.ong || "Instituto Viver Mais"}</h2>
            <p className="text-sm text-white/95 pt-1">Publicado em {dados.publicadoEm || dados.publicado || "07/04/25"}</p>
          </div>
          <button 
            className="inline-flex items-center justify-center rounded-full w-8 h-8 text-white hover:bg-slate-600 cursor-pointer"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>

        {/* Conteúdo */}
        <main className="p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">{dados.titulo}</h1>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full font-medium text-sm bg-blue-100 text-blue-800">
              {dados.categoria}
            </span>
            <span className="px-3 py-1 rounded-full font-medium text-sm bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1">
              <img src="/imagens/quant.jpg" alt="Quantidade" className="w-4 h-4" />
              {dados.quantidade || "5"}
            </span>
            <span className="px-3 py-1 rounded-full font-medium text-sm bg-orange-50 text-orange-600 border border-orange-200 flex items-center gap-1">
              <img src="/imagens/relogio.jpg" alt="Tempo" className="w-4 h-4" />
              {dados.diasRestantes || dados.tempoRestante || "17 dias restantes"}
            </span>
          </div>

          {/* Layout principal com imagem e descrição */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Imagem */}
            <div className="lg:col-span-1">
              <img 
                src={dados.imagemUrl || dados.imageUrl} 
                alt="Imagem da Doação" 
                className="w-full h-48 rounded-lg object-cover border"
              />
            </div>

            {/* Descrição */}
            <div className="lg:col-span-3">
              <p className="text-slate-700 text-base leading-relaxed">
                {dados.descricao}
              </p>
            </div>
          </div>

          {/* Linha divisória sutil */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Botões de ação - layout com alinhamento exato */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            {/* Botão de compartilhar - mesma largura da foto */}
            <div className="lg:col-span-1">
              <button 
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                onClick={handleShare}
              >
                <Share size={16} />
                Compartilhar
              </button>
            </div>

            {/* Email centralizado na área da descrição */}
            <div className="lg:col-span-2 flex justify-center">
              <a 
                href={`mailto:${dados.email || 'contato@example.com'}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
              >
                <Mail size={18} />
                <span className="font-medium">{dados.email || 'Sem email cadastrado'}</span>
              </a>
            </div>

            {/* Telefone alinhado à direita */}
            <div className="lg:col-span-1 flex justify-end">
              <a 
                href={`https://wa.me/55${dados.whatsapp?.replace(/\D/g, '') || '81999999999'}?text=${encodeURIComponent(`Olá! Vi sua doação "${dados.titulo}" e tenho interesse.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
              >
                <Phone size={18} />
                <span className="font-medium">{dados.whatsapp || 'Sem WhatsApp cadastrado'}</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
