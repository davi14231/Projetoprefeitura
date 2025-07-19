import React from 'react';
import { VscClose } from 'react-icons/vsc';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { MdOutlineMailOutline, MdOutlinePhone } from 'react-icons/md';

export default function DetalheDoacao({ dados, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white text-slate-900 flex flex-col rounded-xl border shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden">
        
        {/* Cabeçalho */}
        <header className="bg-slate-800 text-white p-5 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold leading-none">{dados.instituto}</h2>
            <p className="text-sm text-slate-300 pt-1">Publicado: {dados.publicadoEm}</p>
          </div>
          <button 
            className="inline-flex items-center justify-center rounded-full size-9 text-white hover:bg-slate-700"
            onClick={onClose}
          >
            <VscClose size={24} />
          </button>
        </header>

        {/* Conteúdo */}
        <main className="p-6">
          <h1 className="text-3xl font-bold text-slate-900">{dados.titulo}</h1>
          <div className="flex flex-wrap items-center gap-3 my-4">
            <span className="px-3 py-1 rounded-full font-semibold text-sm bg-blue-100 text-blue-800 hover:bg-blue-200">
              {dados.categoria}
            </span>
            <span className="px-3 py-1 rounded-full font-semibold text-sm border border-orange-500 text-orange-600">
              {dados.diasRestantes} dias restantes
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-start">
            <img src={dados.imagemUrl} alt="Imagem da Doação" className="col-span-1 rounded-lg object-cover w-full h-auto" />
            <p className="md:col-span-2 text-slate-700 text-base leading-relaxed">
              {dados.descricao}
            </p>
          </div>
        </main>

        {/* Rodapé */}
        <footer className="flex-col items-start gap-4 p-6 border-t">
          <h3 className="text-lg font-semibold text-slate-900">Informações de Contato</h3>
          <div className="w-full flex justify-between items-center flex-wrap gap-y-4 gap-x-2">
            <a href={`mailto:${dados.email}`} className="flex items-center gap-2 text-blue-700 hover:underline">
              <MdOutlineMailOutline size={20} />
              {dados.email}
            </a>
            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-500 mb-1">Divulgue essa doação</span>
              <div className="flex gap-2">
                <button className="inline-flex items-center justify-center size-9 border rounded-md hover:bg-accent">
                  <FaWhatsapp className="text-green-600" size={18} />
                </button>
                <button className="inline-flex items-center justify-center size-9 border rounded-md hover:bg-accent">
                  <FaInstagram className="text-pink-600" size={18} />
                </button>
                <button className="inline-flex items-center justify-center size-9 border rounded-md hover:bg-accent">
                  <FaFacebookF className="text-blue-800" size={18} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-700 font-bold">
              <MdOutlinePhone size={20} />
              {dados.telefone}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
