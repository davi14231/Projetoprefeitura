/**
 * Utilitários para mapear dados entre o formato do backend e frontend
 */

// Mapear dados de doação do backend para o formato esperado pelo frontend
export const mapDoacaoFromBackend = (backendData) => {
  if (!backendData) return null;
  
  return {
    id: backendData.id_produto,
    id_produto: backendData.id_produto,
    titulo: backendData.titulo,
    descricao: backendData.descricao,
    categoria: backendData.tipo_item,
    tipo_item: backendData.tipo_item,
    urgencia: backendData.urgencia,
    quantidade: backendData.quantidade,
    imageUrl: backendData.url_imagem,
    url_imagem: backendData.url_imagem,
    validade: backendData.prazo_necessidade,
    prazo_necessidade: backendData.prazo_necessidade,
    prazo: backendData.prazo_necessidade,
    ong: backendData.ong?.nome || backendData.ong,
    ongData: backendData.ong,
    status: backendData.status,
    criado_em: backendData.criado_em,
    whatsapp: backendData.whatsapp,
    email: backendData.email
  };
};

// Mapear dados de realocação do backend para o formato esperado pelo frontend
export const mapRealocacaoFromBackend = (backendData) => {
  if (!backendData) return null;
  
  return {
    id: backendData.id_produto,
    id_produto: backendData.id_produto,
    titulo: backendData.titulo,
    descricao: backendData.descricao,
    categoria: backendData.tipo_item,
    tipo_item: backendData.tipo_item,
    quantidade: backendData.quantidade,
    imageUrl: backendData.url_imagem,
    url_imagem: backendData.url_imagem,
    validade: backendData.prazo_necessidade,
    prazo_necessidade: backendData.prazo_necessidade,
    ong: backendData.ong?.nome || backendData.ong,
    ongData: backendData.ong,
    status: backendData.status,
    criado_em: backendData.criado_em,
    whatsapp: backendData.whatsapp,
    email: backendData.email
  };
};

// Mapear array de dados do backend
export const mapDoacoesFromBackend = (backendArray) => {
  if (!Array.isArray(backendArray)) return [];
  return backendArray.map(mapDoacaoFromBackend);
};

export const mapRealocacoesFromBackend = (backendArray) => {
  if (!Array.isArray(backendArray)) return [];
  return backendArray.map(mapRealocacaoFromBackend);
};

// Formatar data para exibição
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch (error) {
    return dateString;
  }
};

// Normalizar urgência para exibição consistente
export const normalizeUrgencia = (urgencia) => {
  if (!urgencia) return 'MEDIA';
  
  const normalizada = urgencia.toString().toUpperCase();
  
  switch (normalizada) {
    case 'BAIXA':
    case 'LOW':
      return 'BAIXA';
    case 'MEDIA':
    case 'MEDIUM':
      return 'MEDIA';
    case 'ALTA':
    case 'HIGH':
      return 'ALTA';
    default:
      return 'MEDIA';
  }
};
