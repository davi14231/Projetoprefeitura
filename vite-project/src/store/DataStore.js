// Store temporário para gerenciar dados de doações e realocações
class DataStore {
  constructor() {
    this.doacoes = this.getDoacoesIniciais();
    this.realocacoes = this.getRealocacoesIniciais();
    this.listeners = [];
  }

  // Dados iniciais de doações
  getDoacoesIniciais() {
    return [
      {
        id: 1,
        titulo: "Cestas Básicas para Famílias",
        categoria: "Utensílios Gerais",
        categoria: "Utensílios Gerais",
        ong: "Casa da Esperança",
        imageUrl: "/imagens/CestasBasicas.jpg",
        descricao: "Necessitamos de cestas básicas para 50 famílias em situação de vulnerabilidade",
        publicado: "15/01/2025",
        validade: "30/01/2025",
        quantidade: 50,
        email: "contato@casadaesperanca.org.br",
        whatsapp: "(81) 99999-1111",
        urgencia: "Alta",
        prazo: "30/01/2025"
      },
      {
        id: 2,
        titulo: "Roupas de Inverno",
        categoria: "Roupas e Calçados",
        categoria: "Roupas e Calçados",
        ong: "Aquecendo Vidas",
        imageUrl: "/imagens/roupas.jpg",
        descricao: "Precisamos de roupas de inverno para crianças e adultos",
        publicado: "12/01/2025",
        validade: "28/01/2025",
        quantidade: 120,
        email: "contato@aquecendovidas.org.br",
        whatsapp: "(81) 99999-2222",
        urgencia: "Média",
        prazo: "28/01/2025"
      },
      {
        id: 3,
        titulo: "Computadores para Educação",
        categoria: "Eletrônicos",
        ong: "Futuro Digital",
        imageUrl: "/imagens/Laptops.jpg",
        descricao: "Computadores para projeto de inclusão digital",
        publicado: "10/01/2025",
        validade: "30/04/2025",
        quantidade: 15,
        email: "contato@futurodigital.org.br",
        whatsapp: "(81) 99999-3333",
        urgencia: "Baixa"
      },
      {
        id: 4,
        titulo: "Móveis para Casa de Apoio",
        categoria: "Eletrodomésticos e Móveis",
        categoria: "Eletrodomésticos e Móveis",
        ong: "Lar Solidário",
        imageUrl: "/imagens/moveis.jpg",
        descricao: "Móveis para casa de apoio a idosos",
        publicado: "08/01/2025",
        validade: "08/04/2025",
        quantidade: 25,
        email: "contato@larsolidario.org.br",
        whatsapp: "(81) 99999-4444",
        urgencia: "Média"
      },
      {
        id: 5,
        titulo: "Brinquedos para Creche",
        categoria: "Materiais Educativos e Culturais",
        categoria: "Materiais Educativos e Culturais",
        ong: "Alegria Infantil",
        imageUrl: "/imagens/BrinquedosEdu.jpg",
        descricao: "Brinquedos educativos para nossa creche comunitária",
        publicado: "05/01/2025",
        validade: "20/01/2025",
        quantidade: 80,
        email: "contato@alegriainfantil.org.br",
        whatsapp: "(81) 99999-5555",
        urgencia: "Alta",
        prazo: "20/01/2025"
      },
      {
        id: 6,
        titulo: "Medicamentos para Idosos",
        categoria: "Saúde e Higiene",
        categoria: "Saúde e Higiene",
        ong: "Cuidar com Amor",
        imageUrl: "/imagens/med.jpg",
        descricao: "Medicamentos para tratamento de idosos carentes",
        publicado: "03/01/2025",
        validade: "15/01/2025",
        quantidade: 200,
        email: "contato@cuidarcomamor.org.br",
        whatsapp: "(81) 99999-6666",
        urgencia: "Alta",
        prazo: "15/01/2025"
      },
      {
        id: 7,
        titulo: "Material para Escola",
        categoria: "Materiais Educativos e Culturais",
        categoria: "Materiais Educativos e Culturais",
        ong: "Educar É Transformar",
        imageUrl: "/imagens/MatEsc.jpg",
        descricao: "Material escolar para crianças carentes",
        descricao: "Material escolar para crianças carentes",
        publicado: "01/01/2025",
        quantidade: 300,
        email: "contato@educaretransformar.org.br",
        whatsapp: "(81) 99999-7777",
        urgencia: "Baixa"
        urgencia: "Baixa"
      },
      {
        id: 8,
        titulo: "Livros para Biblioteca",
        categoria: "Livros",
        ong: "Saber Popular",
        imageUrl: "/imagens/Livrosdid.jpg",
        descricao: "Livros para nossa biblioteca comunitária",
        publicado: "28/12/2024",
        quantidade: 150,
        email: "contato@saberpopular.org.br",
        whatsapp: "(81) 99999-8888",
        urgencia: "Baixa"
      },
      // Dados adicionais para paginação
      {
        id: 9,
        titulo: "Produtos de Higiene",
        categoria: "Outros",
        ong: "Higiene Solidária",
        imageUrl: "/imagens/prodhig.jpg",
        descricao: "Produtos de higiene pessoal para famílias carentes",
        publicado: "25/12/2024",
        quantidade: 500,
        email: "contato@higienesolidaria.org.br",
        whatsapp: "(81) 99999-9999",
        urgencia: "Média"
      },
      {
        id: 10,
        titulo: "Equipamentos Médicos",
        categoria: "Medicamentos",
        ong: "Saúde Para Todos",
        imageUrl: "/imagens/medicamentos.jpg",
        descricao: "Equipamentos médicos básicos para nossa clínica popular",
        publicado: "20/12/2024",
        quantidade: 10,
        email: "contato@saudeparatodos.org.br",
        whatsapp: "(81) 99999-0000",
        urgencia: "Alta"
      }
    ];
  }

  // Dados iniciais de realocações
  getRealocacoesIniciais() {
    return [
      {
        id: 1,
        titulo: "Cestas Básicas",
        categoria: "Utensílios Gerais",
        categoria: "Utensílios Gerais",
        ong: "Instituto Beneficente",
        imageUrl: "/imagens/CestasBasicas.jpg",
        descricao: "Cestas básicas completas para famílias em situação de vulnerabilidade",
        publicado: "15/01/2025",
        quantidade: 100,
        validade: "30/01/2025",
        email: "contato@institutobeneficente.org.br",
        whatsapp: "(81) 99999-1111",
        tempoRestante: "15 dias"
        whatsapp: "(81) 99999-1111",
        tempoRestante: "15 dias"
      },
      {
        id: 2,
        titulo: "Roupas Infantis",
        categoria: "Roupas e Calçados",
        categoria: "Roupas e Calçados",
        ong: "Casa da Criança",
        imageUrl: "/imagens/roupas.jpg",
        descricao: "Roupas infantis em bom estado, tamanhos variados de 2 a 12 anos",
        imageUrl: "/imagens/roupas.jpg",
        descricao: "Roupas infantis em bom estado, tamanhos variados de 2 a 12 anos",
        publicado: "12/01/2025",
        quantidade: 250,
        validade: "28/01/2025",
        email: "contato@casadacrianca.org.br",
        whatsapp: "(81) 99999-2222",
        tempoRestante: "12 dias"
        whatsapp: "(81) 99999-2222",
        tempoRestante: "12 dias"
      },
      {
        id: 3,
        titulo: "Laptops Educacionais",
        categoria: "Eletrônicos",
        ong: "Educação Digital",
        imageUrl: "/imagens/Laptops.jpg",
        descricao: "Laptops para programas educacionais e inclusão digital em bom funcionamento",
        descricao: "Laptops para programas educacionais e inclusão digital em bom funcionamento",
        publicado: "10/01/2025",
        quantidade: 20,
        validade: "30/03/2025",
        email: "contato@educacaodigital.org.br",
        whatsapp: "(81) 99999-3333",
        tempoRestante: "Sem prazo"
        whatsapp: "(81) 99999-3333",
        tempoRestante: "Sem prazo"
      },
      {
        id: 4,
        titulo: "Móveis de Escritório",
        categoria: "Eletrodomésticos e Móveis",
        categoria: "Eletrodomésticos e Móveis",
        ong: "Reciclando Vidas",
        imageUrl: "/imagens/moveis.jpg",
        descricao: "Mesas, cadeiras e armários de escritório em bom estado de conservação",
        imageUrl: "/imagens/moveis.jpg",
        descricao: "Mesas, cadeiras e armários de escritório em bom estado de conservação",
        publicado: "08/01/2025",
        quantidade: 35,
        validade: "28/02/2025",
        email: "contato@reciclandovidas.org.br",
        whatsapp: "(81) 99999-4444",
        tempoRestante: "Sem prazo"
        whatsapp: "(81) 99999-4444",
        tempoRestante: "Sem prazo"
      },
      {
        id: 5,
        titulo: "Material Escolar",
        categoria: "Materiais Educativos e Culturais",
        ong: "Futuro Brilhante",
        imageUrl: "/imagens/MatEsc.jpg",
        descricao: "Cadernos, lápis, canetas e materiais escolares diversos para crianças",
        titulo: "Material Escolar",
        categoria: "Materiais Educativos e Culturais",
        ong: "Futuro Brilhante",
        imageUrl: "/imagens/MatEsc.jpg",
        descricao: "Cadernos, lápis, canetas e materiais escolares diversos para crianças",
        publicado: "05/01/2025",
        quantidade: 180,
        validade: "20/01/2025",
        email: "contato@futurobrilhante.org.br",
        whatsapp: "(81) 99999-5555",
        tempoRestante: "4 dias"
        email: "contato@futurobrilhante.org.br",
        whatsapp: "(81) 99999-5555",
        tempoRestante: "4 dias"
      },
      {
        id: 6,
        titulo: "Produtos de Higiene",
        categoria: "Saúde e Higiene",
        ong: "Cuidar com Amor",
        imageUrl: "/imagens/med.jpg",
        descricao: "Sabonetes, shampoos, produtos de higiene pessoal e medicamentos básicos",
        titulo: "Produtos de Higiene",
        categoria: "Saúde e Higiene",
        ong: "Cuidar com Amor",
        imageUrl: "/imagens/med.jpg",
        descricao: "Sabonetes, shampoos, produtos de higiene pessoal e medicamentos básicos",
        publicado: "03/01/2025",
        quantidade: 60,
        validade: "15/01/2025",
        email: "contato@saudeparatodos.org.br",
        whatsapp: "(81) 99999-6666"
      },
      {
        id: 7,
        titulo: "Cadeiras de Rodas",
        categoria: "Itens de Inclusão e Mobilidade",
        ong: "Inclusão Para Todos",
        imageUrl: "/imagens/outros.jpg",
        descricao: "Cadeiras de rodas e equipamentos de mobilidade em bom estado",
        titulo: "Cadeiras de Rodas",
        categoria: "Itens de Inclusão e Mobilidade",
        ong: "Inclusão Para Todos",
        imageUrl: "/imagens/outros.jpg",
        descricao: "Cadeiras de rodas e equipamentos de mobilidade em bom estado",
        publicado: "01/01/2025",
        quantidade: 300,
        validade: "31/03/2025",
        email: "contato@educandoofuturo.org.br",
        whatsapp: "(81) 99999-7777"
      },
      {
        id: 8,
        titulo: "Ração e Acessórios Pet",
        categoria: "Itens Pet",
        ong: "Amigos dos Animais",
        imageUrl: "/imagens/outros.jpg",
        descricao: "Ração, comedouros, bebedouros e brinquedos para cães e gatos",
        titulo: "Ração e Acessórios Pet",
        categoria: "Itens Pet",
        ong: "Amigos dos Animais",
        imageUrl: "/imagens/outros.jpg",
        descricao: "Ração, comedouros, bebedouros e brinquedos para cães e gatos",
        publicado: "28/12/2024",
        quantidade: 120,
        validade: "30/06/2025",
        email: "contato@bibliotecacomunitaria.org.br",
        whatsapp: "(81) 99999-8888"
      },
      // Dados adicionais para paginação
      {
        id: 9,
        titulo: "Produtos de Limpeza",
        categoria: "Outros",
        ong: "Limpeza Solidária",
        imageUrl: "/imagens/prodhig.jpg",
        descricao: "Produtos de limpeza para manutenção de abrigos",
        publicado: "25/12/2024",
        quantidade: 90,
        validade: "25/06/2025",
        email: "contato@limpezasolidaria.org.br",
        whatsapp: "(81) 99999-9999"
      },
      {
        id: 10,
        titulo: "Equipamentos de Cozinha",
        categoria: "Equipamento",
        ong: "Cozinha Comunitária",
        imageUrl: "/imagens/ferramentas.jpg",
        descricao: "Equipamentos de cozinha para nossa cozinha comunitária",
        publicado: "20/12/2024",
        quantidade: 40,
        validade: "20/06/2025",
        email: "contato@cozinhacomunitaria.org.br",
        whatsapp: "(81) 99999-0000"
      }
    ];
  }

  // Adicionar listener para mudanças
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remover listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notificar listeners sobre mudanças
  notifyListeners() {
    this.listeners.forEach(callback => callback());
  }

  // Métodos para doações
  getDoacoes() {
    return this.doacoes;
  }

  getDoacoesPaginadas(page = 1, itemsPerPage = 6) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = this.doacoes.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.doacoes.length / itemsPerPage);
    
    return {
      items,
      currentPage: page,
      totalPages,
      totalItems: this.doacoes.length,
      itemsPerPage
    };
  }

  addDoacao(doacao) {
    const newId = Math.max(...this.doacoes.map(d => d.id), 0) + 1;
    const newDoacao = {
      ...doacao,
      id: newId,
      publicado: new Date().toLocaleDateString('pt-BR'),
    };
    this.doacoes.unshift(newDoacao); // Adiciona no início da lista
    this.notifyListeners();
    return newDoacao;
  }

  removeDoacao(id) {
    this.doacoes = this.doacoes.filter(d => d.id !== id);
    this.notifyListeners();
  }

  updateDoacao(id, updates) {
    this.doacoes = this.doacoes.map(d => 
      d.id === id ? { ...d, ...updates } : d
    );
    this.notifyListeners();
  }

  // Métodos para realocações
  getRealocacoes() {
    return this.realocacoes;
  }

  getRealocacoesPaginadas(page = 1, itemsPerPage = 6) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = this.realocacoes.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.realocacoes.length / itemsPerPage);
    
    return {
      items,
      currentPage: page,
      totalPages,
      totalItems: this.realocacoes.length,
      itemsPerPage
    };
  }

  addRealocacao(realocacao) {
    const newId = Math.max(...this.realocacoes.map(r => r.id), 0) + 1;
    const newRealocacao = {
      ...realocacao,
      id: newId,
      publicado: new Date().toLocaleDateString('pt-BR'),
    };
    this.realocacoes.unshift(newRealocacao); // Adiciona no início da lista
    this.notifyListeners();
    return newRealocacao;
  }

  removeRealocacao(id) {
    this.realocacoes = this.realocacoes.filter(r => r.id !== id);
    this.notifyListeners();
  }

  updateRealocacao(id, updates) {
    this.realocacoes = this.realocacoes.map(r => 
      r.id === id ? { ...r, ...updates } : r
    );
    this.notifyListeners();
  }

  // Métodos de filtro
  filterDoacoes(filters = {}) {
    let filtered = [...this.doacoes];

    if (filters.categoria) {
      filtered = filtered.filter(item => item.categoria === filters.categoria);
    }

    if (filters.busca) {
      const searchTerm = filters.busca.toLowerCase();
      filtered = filtered.filter(item => 
        item.titulo.toLowerCase().includes(searchTerm) ||
        item.ong.toLowerCase().includes(searchTerm) ||
        item.descricao.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.urgencia) {
      filtered = filtered.filter(item => item.urgencia === filters.urgencia);
    }

    return filtered;
  }

  filterRealocacoes(filters = {}) {
    let filtered = [...this.realocacoes];

    if (filters.categoria) {
      filtered = filtered.filter(item => item.categoria === filters.categoria);
    }

    if (filters.busca) {
      const searchTerm = filters.busca.toLowerCase();
      filtered = filtered.filter(item => 
        item.titulo.toLowerCase().includes(searchTerm) ||
        item.ong.toLowerCase().includes(searchTerm) ||
        item.descricao.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }
}

// Instância única do store
const dataStore = new DataStore();

export default dataStore;
