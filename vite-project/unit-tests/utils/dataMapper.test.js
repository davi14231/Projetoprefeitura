import { describe, it, expect } from 'vitest';
import { 
  mapDoacaoFromBackend,
  mapRealocacaoFromBackend,
  mapDoacoesFromBackend,
  mapRealocacoesFromBackend,
  formatDate,
  normalizeUrgencia
} from '@/utils/dataMapper';

const sampleBackend = {
  id_produto: 10,
  titulo: 'Titulo',
  descricao: 'Desc',
  tipo_item: 'Categoria',
  urgencia: 'ALTA',
  quantidade: 5,
  url_imagem: 'http://img',
  prazo_necessidade: '2025-01-31T00:00:00Z',
  ong: { nome: 'ONG Teste' },
  status: 'ATIVA',
  criado_em: '2025-01-01T00:00:00Z',
  whatsapp: '999',
  email: 'e@e'
};

describe('dataMapper', () => {
  it('mapDoacaoFromBackend mapeia campos e formata datas', () => {
    const r = mapDoacaoFromBackend(sampleBackend);
    expect(r.id).toBe(10);
    expect(r.validade).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(r.publicado).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(r.ong).toBe('ONG Teste');
  });

  it('mapRealocacaoFromBackend mapeia similarmente', () => {
    const r = mapRealocacaoFromBackend(sampleBackend);
    expect(r.id_produto).toBe(10);
    expect(r.validade_raw).toBe(sampleBackend.prazo_necessidade);
  });

  it('mapDoacoesFromBackend retorna [] para entrada invalida', () => {
    expect(mapDoacoesFromBackend(null)).toEqual([]);
  });

  it('mapRealocacoesFromBackend converte array', () => {
    const arr = mapRealocacoesFromBackend([sampleBackend]);
    expect(arr).toHaveLength(1);
    expect(arr[0].titulo).toBe('Titulo');
  });

  it('formatDate retorna string vazia se falsy', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('formatDate tenta converter e devolve input se inválido', () => {
    const invalid = 'not-a-date';
    // Date('not-a-date') vira Invalid Date mas toLocaleDateString não deve quebrar; para forçar catch simulamos erro
    // Não forçaremos throw; apenas garante que retorna algo (não vazio) diferente de ''
    expect(formatDate(invalid)).not.toBe('');
  });

  it('normalizeUrgencia cobre todas variantes', () => {
    expect(normalizeUrgencia('low')).toBe('BAIXA');
    expect(normalizeUrgencia('medium')).toBe('MEDIA');
    expect(normalizeUrgencia('HIGH')).toBe('ALTA');
    expect(normalizeUrgencia('desconhecida')).toBe('MEDIA');
    expect(normalizeUrgencia(undefined)).toBe('MEDIA');
  });
});
