import { describe, it, expect, vi, beforeEach } from 'vitest';
import { realocacoesService } from '@/services/realocacoesService';
import api from '@/services/api';
import * as mapper from '@/utils/dataMapper';

vi.mock('@/services/api');

beforeEach(() => {
  vi.resetAllMocks();
});

describe('realocacoesService', () => {
  it('listarRealocacoes aplica filtros e mapeia', async () => {
    const spy = vi.spyOn(mapper, 'mapRealocacoesFromBackend').mockReturnValue([{ id: 1 }]);
    api.get.mockResolvedValue({ data: [{ raw: true }] });
    const r = await realocacoesService.listarRealocacoes({ categoria: 'Eletronicos' });
    expect(api.get).toHaveBeenCalledWith(expect.stringContaining('/realocacoes/catalogo?'));
    expect(r).toEqual([{ id: 1 }]);
    expect(spy).toHaveBeenCalled();
  });

  it('listarMinhasRealocacoes mapeia', async () => {
    const spy = vi.spyOn(mapper, 'mapRealocacoesFromBackend').mockReturnValue([{ id: 2 }]);
    api.get.mockResolvedValue({ data: [{ a: 1 }] });
    const r = await realocacoesService.listarMinhasRealocacoes();
    expect(api.get).toHaveBeenCalledWith('/realocacoes/minhas/ativas');
    expect(r).toEqual([{ id: 2 }]);
    expect(spy).toHaveBeenCalled();
  });

  it('obterRealocacao retorna data', async () => {
    api.get.mockResolvedValue({ data: { id: 10 } });
    const r = await realocacoesService.obterRealocacao(10);
    expect(api.get).toHaveBeenCalledWith('/realocacoes/catalogo/10');
    expect(r).toEqual({ id: 10 });
  });

  it('criarRealocacao formata e envia dados', async () => {
    api.post.mockResolvedValue({ data: { ok: true } });
    const r = await realocacoesService.criarRealocacao({ titulo:'R', descricao:'D', categoria:'Cat', urgencia:'ALTA', quantidade:'3', email:'e', whatsapp:'w', prazo:'2025-01-01', imageUrl:'/relativa.png' });
    expect(api.post).toHaveBeenCalledWith('/realocacoes', expect.objectContaining({ tipo_item: 'Cat', url_imagem: expect.stringContaining('https://') }));
    expect(r).toEqual({ ok: true });
  });

  it('editarRealocacao upper-case urgencia', async () => {
    api.put.mockResolvedValue({ data: { edited: true } });
    const r = await realocacoesService.editarRealocacao(3, { titulo:'X', descricao:'Y', categoria:'C', urgencia:'baixa', quantidade:'1', email:'e', whatsapp:'w', prazo:'2025-01-01', imageUrl:'http://img' });
    expect(api.put).toHaveBeenCalledWith('/realocacoes/3', expect.objectContaining({ urgencia:'BAIXA' }));
    expect(r).toEqual({ edited: true });
  });

  it('alterarStatus realocacao', async () => {
    api.patch.mockResolvedValue({ data: { status:'FINALIZADA' } });
    const r = await realocacoesService.alterarStatus(4, 'FINALIZADA');
    expect(api.patch).toHaveBeenCalledWith('/realocacoes/4/status', { status:'FINALIZADA' });
    expect(r).toEqual({ status:'FINALIZADA' });
  });

  it('deletarRealocacao chama delete', async () => {
    api.delete.mockResolvedValue({ data: { ok:true } });
    const r = await realocacoesService.deletarRealocacao(9);
    expect(api.delete).toHaveBeenCalledWith('/realocacoes/9');
    expect(r).toEqual({ ok:true });
  });

  // ==== Casos adicionais de erro e finalizadas ====
  it('listarRealocacoes erro', async () => {
    api.get.mockRejectedValue({ response: { data: {} } });
    await expect(realocacoesService.listarRealocacoes()).rejects.toThrow('Erro ao carregar realocações');
  });

  it('listarMinhasRealocacoes erro', async () => {
    api.get.mockRejectedValue({ response: { data: {} } });
    await expect(realocacoesService.listarMinhasRealocacoes()).rejects.toThrow('Erro ao carregar suas realocações');
  });

  it('listarMinhasRealocacoesFinalizadas sucesso', async () => {
    const spy = vi.spyOn(mapper, 'mapRealocacoesFromBackend').mockReturnValue([{ id: 70 }]);
    api.get.mockResolvedValue({ data: [{ raw:true }] });
    const r = await realocacoesService.listarMinhasRealocacoesFinalizadas();
    expect(api.get).toHaveBeenCalledWith('/realocacoes/minhas/finalizadas');
    expect(r).toEqual([{ id: 70 }]);
    expect(spy).toHaveBeenCalled();
  });

  it('listarMinhasRealocacoesFinalizadas erro', async () => {
    api.get.mockRejectedValue({ response: { data: {} } });
    await expect(realocacoesService.listarMinhasRealocacoesFinalizadas()).rejects.toThrow('Erro ao carregar realocações finalizadas');
  });

  it('obterRealocacao erro', async () => {
    api.get.mockRejectedValue({ response: { data: {} } });
    await expect(realocacoesService.obterRealocacao(3)).rejects.toThrow('Erro ao carregar realocação');
  });

  it('criarRealocacao erro', async () => {
    api.post.mockRejectedValue({ response: { data: { message:'X' } } });
    await expect(realocacoesService.criarRealocacao({ titulo:'R' })).rejects.toThrow('X');
  });

  it('editarRealocacao erro', async () => {
    api.put.mockRejectedValue({ response: { data: {} } });
    await expect(realocacoesService.editarRealocacao(1, { titulo:'A' })).rejects.toThrow('Erro ao editar realocação');
  });

  it('alterarStatus erro', async () => {
    api.patch.mockRejectedValue({ response: { data: {} } });
    await expect(realocacoesService.alterarStatus(1, 'FINALIZADA')).rejects.toThrow('Erro ao alterar status');
  });

  it('deletarRealocacao erro', async () => {
    api.delete.mockRejectedValue({ response: { data: {} } });
    await expect(realocacoesService.deletarRealocacao(1)).rejects.toThrow('Erro ao deletar realocação');
  });
});
