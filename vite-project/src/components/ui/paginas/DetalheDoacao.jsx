// src/paginas/DetalheDoacao.jsx
import React from "react";

// Componentes reutilizáveis do seu projeto
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Ícones
import { VscClose } from "react-icons/vsc";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";

// Dados temporários (simulação de backend)
const dadosDaDoacao = {
  instituto: "Instituto Viver Mais",
  publicadoEm: "07/04/25",
  titulo: "Kits de toalhas de banho",
  categoria: "Roupas e Calçados",
  diasRestantes: 17,
  imagemUrl: "https://i.imgur.com/gE2x9s8.png",
  descricao:
    "Solicitamos a doação de toalhas para atender uma demanda urgente em nossos abrigos temporários, que acolhem famílias em situação de vulnerabilidade.",
  email: "kellysayonara854@gmail.com",
  telefone: "(81) 8446-5009",
};

export default function DetalheDoacao() {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden">
        {/* Cabeçalho */}
        <CardHeader className="bg-slate-800 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                {dadosDaDoacao.instituto}
              </CardTitle>
              <CardDescription className="text-slate-300 pt-1">
                Publicado: {dadosDaDoacao.publicadoEm}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-slate-700 rounded-full"
            >
              <VscClose size={24} />
            </Button>
          </div>
        </CardHeader>

        {/* Conteúdo */}
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {dadosDaDoacao.titulo}
          </h1>

          <div className="flex flex-wrap gap-3 my-4">
            <Badge variant="default" className="bg-blue-100 text-blue-800">
              {dadosDaDoacao.categoria}
            </Badge>
            <Badge
              variant="outline"
              className="border-orange-500 text-orange-600"
            >
              {dadosDaDoacao.diasRestantes} dias restantes
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-start">
            <img
              src={dadosDaDoacao.imagemUrl}
              alt={dadosDaDoacao.titulo}
              className="col-span-1 rounded-lg object-cover w-full h-auto"
            />
            <p className="md:col-span-2 text-slate-700 text-base leading-relaxed">
              {dadosDaDoacao.descricao}
            </p>
          </div>
        </CardContent>

        {/* Rodapé com contatos e redes */}
        <CardFooter className="flex-col items-start gap-4 p-6 border-t">
          <h3 className="text-lg font-semibold text-slate-900">
            Informações de Contato
          </h3>

          <div className="w-full flex justify-between items-center flex-wrap gap-y-4 gap-x-2">
            {/* Email */}
            <a
              href={`mailto:${dadosDaDoacao.email}`}
              className="flex items-center gap-2 text-blue-700 hover:underline"
            >
              <MdOutlineMailOutline size={20} />
              {dadosDaDoacao.email}
            </a>

            {/* Redes Sociais */}
            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-500 mb-1">
                Divulgue essa doação
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <FaWhatsapp className="text-green-600" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <FaInstagram className="text-pink-600" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <FaFacebookF className="text-blue-800" size={18} />
                </Button>
              </div>
            </div>

            {/* Telefone */}
            <div className="flex items-center gap-2 text-green-700 font-bold">
              <MdOutlinePhone size={20} />
              {dadosDaDoacao.telefone}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
