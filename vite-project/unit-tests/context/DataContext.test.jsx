import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react';

vi.mock('@/services/doacoesService', () => ({
  doacoesService: {
    listarDoacoes: vi.fn(),
    listarMinhasDoacoes: vi.fn(),
    listarDoacoesPrestesVencer: vi.fn(),
    criarDoacao: vi.fn(),
    deletarDoacao: vi.fn(),
    editarDoacao: vi.fn(),
    alterarStatus: vi.fn(),
  }
}));

vi.mock('@/services/realocacoesService', () => ({
  realocacoesService: {
    listarRealocacoes: vi.fn(),
    listarMinhasRealocacoes: vi.fn(),
    criarRealocacao: vi.fn(),
    deletarRealocacao: vi.fn(),
    editarRealocacao: vi.fn(),
    alterarStatus: vi.fn(),
  }
}));

// Importar após mocks
import { DataProvider, useData } from '@/context/DataContext.jsx';
import { doacoesService } from '@/services/doacoesService';
import { realocacoesService } from '@/services/realocacoesService';

const Probe = ({ onReady }) => {
  const ctx = useData();
  React.useEffect(() => { onReady(ctx); }, [ctx, onReady]);
  return null;
};

const renderWithProvider = (onReady) => {
  render(<DataProvider><Probe onReady={onReady} /></DataProvider>);
};

const sampleDoacoes = [
  { id: 1, titulo: 'Laptop', categoria: 'Eletrônicos', ong: 'ONG A', validade_raw: new Date(Date.now()+2*86400000).toISOString() },
  { id: 2, titulo: 'Roupas', categoria: 'Roupas', ong: 'ONG B', prazo: new Date(Date.now()+10*86400000).toISOString() },
  { id: 3, titulo: 'Cadeiras', categoria: 'Móveis', ong: 'ONG C', prazo_necessidade: new Date(Date.now()+1*86400000).toISOString() },
];

const sampleRealoc = [
  { id: 10, titulo: 'Realoc 1', categoria: 'Eletrônicos', ong: 'ONG A' },
  { id: 11, titulo: 'Realoc 2', categoria: 'Roupas', ong: 'ONG B' },
];

beforeEach(() => {
  vi.clearAllMocks();
  doacoesService.listarDoacoes.mockResolvedValue(sampleDoacoes);
  realocacoesService.listarRealocacoes.mockResolvedValue(sampleRealoc);
  // Usar caminho "feliz" do endpoint para simplificar sincronização (evita timing do fallback)
  doacoesService.listarDoacoesPrestesVencer.mockResolvedValue([
    { id: 1 }, { id: 3 }
  ]);
});

describe('DataContext', () => {
  it('carrega doacoes, realocacoes e lista de prestes a vencer do endpoint', async () => {
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => {
      expect(ctxRef.doacoes.length).toBe(3);
      expect(ctxRef.realocacoes.length).toBe(2);
    });
    // Agora deve vir diretamente do endpoint mockado
    await waitFor(() => expect(ctxRef.doacoesPrestesVencer.length).toBe(2)); // ids 1 e 3
  });

  it('filtros e busca em getDoacoesPaginadas funcionam', async () => {
    let ctxRef; renderWithProvider(r => ctxRef = r);
    await waitFor(() => expect(ctxRef.doacoes.length).toBe(3));
    const page = ctxRef.getDoacoesPaginadas({ filters: { categoria: 'Roupas' }, limit: 10 });
    expect(page.items.map(i=>i.id)).toEqual([2]);
    const busca = ctxRef.getDoacoesPaginadas({ filters: { termo: 'lAp' }, limit: 10 });
    expect(busca.items.map(i=>i.id)).toEqual([1]);
  });

  it('adiciona doacao e recarrega listas', async () => {
  doacoesService.criarDoacao.mockResolvedValue({ id: 99 });
  doacoesService.listarMinhasDoacoes.mockResolvedValue([ { id: 50 } ]);
    let ctxRef; renderWithProvider(r => ctxRef = r);
    await waitFor(() => expect(ctxRef.doacoes.length).toBe(3));
  await act(async () => { await ctxRef.addDoacao({ titulo: 'Nova' }); });
  expect(doacoesService.criarDoacao).toHaveBeenCalled();
  expect(doacoesService.listarMinhasDoacoes).toHaveBeenCalled();
  });

  it('trata erro ao adicionar doacao', async () => {
  doacoesService.criarDoacao.mockRejectedValueOnce(new Error('falha'));
    let ctxRef; renderWithProvider(r => ctxRef = r);
    await waitFor(() => expect(ctxRef.doacoes.length).toBe(3));
    await act(async () => {
      await expect(ctxRef.addDoacao({ titulo: 'X' })).rejects.toThrow('falha');
    });
  await waitFor(() => expect(ctxRef.error).toBe('Erro ao adicionar doação'));
  });

  it('remove e atualiza doacoes', async () => {
  doacoesService.deletarDoacao.mockResolvedValue({});
  doacoesService.listarMinhasDoacoes.mockResolvedValue([]);
    let ctxRef; renderWithProvider(r => ctxRef = r);
    await waitFor(() => expect(ctxRef.doacoes.length).toBe(3));
  await act(async () => { await ctxRef.removeDoacao(1); });
  expect(doacoesService.deletarDoacao).toHaveBeenCalledWith(1);
  });

  it('update e encerrar realocacao disparam recarregamento', async () => {
  realocacoesService.editarRealocacao.mockResolvedValue({});
  realocacoesService.alterarStatus.mockResolvedValue({});
  realocacoesService.listarMinhasRealocacoes.mockResolvedValue([]);
    let ctxRef; renderWithProvider(r => ctxRef = r);
    await waitFor(() => expect(ctxRef.realocacoes.length).toBe(2));
  await act(async () => { await ctxRef.updateRealocacao(10, { titulo: 'Novo' }); });
  expect(realocacoesService.editarRealocacao).toHaveBeenCalledWith(10, { titulo: 'Novo' });
  await act(async () => { await ctxRef.encerrarRealocacao(11); });
  expect(realocacoesService.alterarStatus).toHaveBeenCalledWith(11, 'FINALIZADA');
  });

  it('fallback de prestes a vencer calcula a partir das doacoes carregadas quando endpoint falha', async () => {
  // Forçar rejeição persistente para o endpoint
  doacoesService.listarDoacoesPrestesVencer.mockRejectedValue(new Error('off'));
  let ctxRef; renderWithProvider(c => ctxRef = c);
  // Aguarda carregamento inicial de doações
  await waitFor(() => expect(ctxRef.doacoes.length).toBe(3));
  // Chama novamente após estado consolidado para acionar fallback com dados já presentes
  await act(async () => { await ctxRef.loadDoacoesPrestesVencer(); });
  await waitFor(() => expect(ctxRef.doacoesPrestesVencer.length).toBe(2));
    const ids = ctxRef.doacoesPrestesVencer.map(d => d.id).sort();
    expect(ids).toEqual([1,3]);
  });

  it('updateDoacao e encerrarDoacao recarregam listas e chamam serviços', async () => {
    doacoesService.editarDoacao.mockResolvedValue({});
    doacoesService.alterarStatus.mockResolvedValue({});
    doacoesService.listarMinhasDoacoes.mockResolvedValue([]);
    doacoesService.listarDoacoesPrestesVencer.mockResolvedValue([{ id: 1 }, { id: 3 }]);
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => expect(ctxRef.doacoes.length).toBe(3));
  await act(async () => { await ctxRef.updateDoacao(2, { titulo: 'Editado' }); });
    expect(doacoesService.editarDoacao).toHaveBeenCalledWith(2, { titulo: 'Editado' });
  await act(async () => { await ctxRef.encerrarDoacao(3); });
    expect(doacoesService.alterarStatus).toHaveBeenCalledWith(3, 'FINALIZADA');
  });

  it('paginacao de minhas doacoes e minhas realocacoes funciona (hasNext/Prev)', async () => {
    const minhasDoacoesMock = Array.from({ length: 7 }).map((_,i) => ({ id: 200+i }));
    const minhasRealocMock = Array.from({ length: 5 }).map((_,i) => ({ id: 300+i }));
    doacoesService.listarMinhasDoacoes.mockResolvedValue(minhasDoacoesMock);
    realocacoesService.listarMinhasRealocacoes.mockResolvedValue(minhasRealocMock);
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => expect(ctxRef.doacoes.length).toBe(3));
    await act(async () => { await ctxRef.loadMinhasDoacoes(); });
    await act(async () => { await ctxRef.loadMinhasRealocacoes(); });
    const page1 = ctxRef.getMinhasDoacoesPaginadas({ page:1, limit:5 });
    const page2 = ctxRef.getMinhasDoacoesPaginadas({ page:2, limit:5 });
    expect(page1.items.length).toBe(5);
    expect(page1.hasNextPage).toBe(true);
    expect(page1.hasPrevPage).toBe(false);
    expect(page2.items.length).toBe(2);
    expect(page2.hasNextPage).toBe(false);
    expect(page2.hasPrevPage).toBe(true);
    const rpage = ctxRef.getMinhasRealocacoesPaginadas({ page:1, limit:3 });
    expect(rpage.items.length).toBe(3);
    expect(rpage.hasNextPage).toBe(true);
  });

  it('searchRealocacoes e getRealocacoesPorCategoria aplicam filtros corretos', async () => {
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(() => expect(ctxRef.realocacoes.length).toBe(2));
    const cat = ctxRef.getRealocacoesPorCategoria('Roupas');
    expect(cat.map(r=>r.id)).toEqual([11]);
    const termo = ctxRef.searchRealocacoes('realoc 1');
    expect(termo.map(r=>r.id)).toEqual([10]);
  });

  // Novos testes para cobrir ramos de erro e utilitários
  it('addRealocacao recarrega listas', async () => {
    realocacoesService.criarRealocacao.mockResolvedValue({ id: 500 });
    realocacoesService.listarMinhasRealocacoes.mockResolvedValue([{ id: 500 }]);
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(()=>expect(ctxRef.realocacoes.length).toBe(2));
    await act(async () => { await ctxRef.addRealocacao({ titulo:'R Nova' }); });
    expect(realocacoesService.criarRealocacao).toHaveBeenCalled();
    expect(realocacoesService.listarMinhasRealocacoes).toHaveBeenCalled();
  });

  it('erros em remove/update/encerrar doacao definem mensagens', async () => {
    doacoesService.deletarDoacao.mockRejectedValueOnce(new Error('x'));
    doacoesService.editarDoacao.mockRejectedValueOnce(new Error('y'));
    doacoesService.alterarStatus.mockRejectedValueOnce(new Error('z'));
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(()=>expect(ctxRef.doacoes.length).toBe(3));
    await act(async () => { await expect(ctxRef.removeDoacao(1)).rejects.toThrow('x'); });
    expect(ctxRef.error).toBe('Erro ao remover doação');
  await act(async () => { ctxRef.clearError(); });
  await waitFor(()=>expect(ctxRef.error).toBeNull());
    await act(async () => { await expect(ctxRef.updateDoacao(2,{ titulo:'Z'})).rejects.toThrow('y'); });
    expect(ctxRef.error).toBe('Erro ao atualizar doação');
  await act(async () => { ctxRef.clearError(); });
    await act(async () => { await expect(ctxRef.encerrarDoacao(3)).rejects.toThrow('z'); });
    expect(ctxRef.error).toBe('Erro ao encerrar doação');
  });

  it('erros em remove/update/encerrar realocacao definem mensagens', async () => {
    realocacoesService.deletarRealocacao.mockRejectedValueOnce(new Error('r1'));
    realocacoesService.editarRealocacao.mockRejectedValueOnce(new Error('r2'));
    realocacoesService.alterarStatus.mockRejectedValueOnce(new Error('r3'));
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(()=>expect(ctxRef.realocacoes.length).toBe(2));
    await act(async () => { await expect(ctxRef.removeRealocacao(10)).rejects.toThrow('r1'); });
    expect(ctxRef.error).toBe('Erro ao remover realocação');
  await act(async () => { ctxRef.clearError(); });
    await act(async () => { await expect(ctxRef.updateRealocacao(11,{ titulo:'AA'})).rejects.toThrow('r2'); });
    expect(ctxRef.error).toBe('Erro ao atualizar realocação');
  await act(async () => { ctxRef.clearError(); });
    await act(async () => { await expect(ctxRef.encerrarRealocacao(11)).rejects.toThrow('r3'); });
    expect(ctxRef.error).toBe('Erro ao encerrar realocação');
  });

  it('loadMinhasDoacoes e loadMinhasRealocacoes tratam erro', async () => {
    doacoesService.listarMinhasDoacoes.mockRejectedValueOnce(new Error('md'));    
    realocacoesService.listarMinhasRealocacoes.mockRejectedValueOnce(new Error('mr'));
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(()=>expect(ctxRef.doacoes.length).toBe(3));
    await act(async () => { await ctxRef.loadMinhasDoacoes(); });
    expect(ctxRef.error).toBe('Erro ao carregar suas doações da API');
  await act(async () => { ctxRef.clearError(); });
    await act(async () => { await ctxRef.loadMinhasRealocacoes(); });
    expect(ctxRef.error).toBe('Erro ao carregar suas realocações da API');
  });

  it('checkApiConnection retorna true e false conforme resultado e refreshData chama loaders', async () => {
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(()=>expect(ctxRef.doacoes.length).toBe(3));
    // sucesso
  doacoesService.listarDoacoes.mockResolvedValueOnce([]);
  let ok; await act(async () => { ok = await ctxRef.checkApiConnection(); });
    expect(ok).toBe(true);
    // falha
  doacoesService.listarDoacoes.mockRejectedValueOnce(new Error('fail'));    
  let fail; await act(async () => { fail = await ctxRef.checkApiConnection(); });
    expect(fail).toBe(false);
    // refreshData executa ambos
    doacoesService.listarDoacoes.mockResolvedValueOnce(sampleDoacoes);
    realocacoesService.listarRealocacoes.mockResolvedValueOnce(sampleRealoc);
  await act(async () => { await ctxRef.refreshData(); });
    expect(doacoesService.listarDoacoes).toHaveBeenCalled();
    expect(realocacoesService.listarRealocacoes).toHaveBeenCalled();
  });

  it('searchDoacoes e getDoacoesPorCategoria funcionam', async () => {
    let ctxRef; renderWithProvider(c => ctxRef = c);
    await waitFor(()=>expect(ctxRef.doacoes.length).toBe(3));
    const cat = ctxRef.getDoacoesPorCategoria('Roupas');
    expect(cat.map(d=>d.id)).toEqual([2]);
    const termo = ctxRef.searchDoacoes('cadeiras');
    expect(termo.map(d=>d.id)).toEqual([3]);
    const all = ctxRef.searchDoacoes('');
    expect(all.length).toBe(3);
  });
});
