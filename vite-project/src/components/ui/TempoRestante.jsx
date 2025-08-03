import React, { useState, useEffect } from 'react';

export function TempoRestante({ prazo, publicado, className = "" }) {
  const [tempoRestante, setTempoRestante] = useState("");
  const [status, setStatus] = useState("normal");

  useEffect(() => {
    const calcularTempoRestante = () => {
      if (!prazo) {
        setTempoRestante("Sem prazo definido");
        setStatus("normal");
        return;
      }

      const agora = new Date();
      const dataPrazo = new Date(prazo.split('/').reverse().join('-')); // Converte DD/MM/YYYY para YYYY-MM-DD
      const diferencaTempo = dataPrazo.getTime() - agora.getTime();

      if (diferencaTempo <= 0) {
        setTempoRestante("Expirado");
        setStatus("expirado");
        return;
      }

      const dias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencaTempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencaTempo % (1000 * 60 * 60)) / (1000 * 60));

      let tempoTexto = "";
      
      if (dias > 0) {
        tempoTexto = `${dias}d ${horas}h`;
      } else if (horas > 0) {
        tempoTexto = `${horas}h ${minutos}m`;
      } else {
        tempoTexto = `${minutos}m`;
      }

      setTempoRestante(tempoTexto);

      // Definir status baseado no tempo restante
      if (dias <= 1) {
        setStatus("urgente");
      } else if (dias <= 7) {
        setStatus("atencao");
      } else {
        setStatus("normal");
      }
    };

    // Calcular imediatamente
    calcularTempoRestante();

    // Atualizar a cada minuto
    const intervalo = setInterval(calcularTempoRestante, 60000);

    return () => clearInterval(intervalo);
  }, [prazo]);

  return (
    <span className={`flex items-center gap-1 text-sm text-gray-500 ${className}`}>
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="inline-block"
      >
        <circle cx="8" cy="8" r="7" />
        <path d="M8 4v4l2 2" />
      </svg>
      Tempo restante: {tempoRestante}
    </span>
  );
}

export function DataAtual({ className = "" }) {
  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const atualizarData = () => {
      const agora = new Date();
      const opcoes = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Recife'
      };
      
      const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
      setDataAtual(dataFormatada);
    };

    // Atualizar imediatamente
    atualizarData();

    // Atualizar a cada segundo
    const intervalo = setInterval(atualizarData, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className={`inline-flex items-center gap-2 text-sm text-gray-600 ${className}`}>
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="inline-block"
      >
        <circle cx="8" cy="8" r="7" />
        <path d="M8 4v4l2 2" />
      </svg>
      <span>{dataAtual}</span>
    </div>
  );
}
