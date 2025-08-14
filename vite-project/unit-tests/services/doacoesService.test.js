import { describe, it, expect, vi, beforeEach } from 'vitest';
import { doacoesService } from '@/services/doacoesService';
import api from '@/services/api';
import * as mapper from '@/utils/dataMapper';

vi.mock('@/services/api');

beforeEach(() => {
  vi.resetAllMocks();
});

describe('doacoesService', () => {
  it('listarDoacoes monta query e mapeia', async () => {
    const spy = vi.spyOn(mapper, 'mapDoacoesFromBackend').mockReturnValue([{ id: 1 }]);
    api.get.mockResolvedValue({ data: [{ any: 'x' }] });
    const res = await doacoesService.listarDoacoes({ categoria: 'Roupas', termo: 'a' });
    expect(api.get).toHaveBeenCalledWith(expect.stringContaining('/doacoes?'));
    expect(spy).toHaveBeenCalled();
    expect(res).toEqual([{ id: 1 }]);
  });

  it('listarDoacoes erro propaga mensagem amigável', async () => {
    api.get.mockRejectedValue({ response: { data: { message: 'Falha' } } });
    await expect(doacoesService.listarDoacoes()).rejects.toThrow('Falha');
  });

  it('listarDoacoesPrestesVencer retorna primeira lista válida mapeada', async () => {
    const spy = vi.spyOn(mapper, 'mapDoacoesFromBackend').mockReturnValue([{ id: 9 }]);
    api.get
      .mockRejectedValueOnce({ response: { status: 404 } })
      .mockResolvedValueOnce({ data: [{ raw: 1 }] });
    const res = await doacoesService.listarDoacoesPrestesVencer();
    expect(res).toEqual([{ id: 9 }]);
    expect(api.get).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalled();
  });

  it('listarMinhasDoacoes mapeia', async () => {
    const spy = vi.spyOn(mapper, 'mapDoacoesFromBackend').mockReturnValue([{ id: 3 }]);
    api.get.mockResolvedValue({ data: [{ r: 1 }] });
    const r = await doacoesService.listarMinhasDoacoes();
    expect(api.get).toHaveBeenCalledWith('/doacoes/minhas/ativas');
    expect(r).toEqual([{ id: 3 }]);
    expect(spy).toHaveBeenCalled();
  });

  it('obterDoacao usa mapDoacaoFromBackend', async () => {
    const spy = vi.spyOn(mapper, 'mapDoacaoFromBackend').mockReturnValue({ id: 77 });
    api.get.mockResolvedValue({ data: { raw: true } });
    const r = await doacoesService.obterDoacao(7);
    expect(api.get).toHaveBeenCalledWith('/doacoes/7');
    expect(r).toEqual({ id: 77 });
    expect(spy).toHaveBeenCalled();
  });

  it('criarDoacao envia dados formatados e retorna resposta', async () => {
    api.post.mockResolvedValue({ data: { ok: true } });
    const r = await doacoesService.criarDoacao({
      titulo: 'T', descricao: 'D', categoria: 'Cat', urgencia: 'BAIXA', quantidade: '5', email: 'e', whatsapp: 'w', prazo: '2025-01-01', imageUrl: '/relativa.png'
    });
    expect(api.post).toHaveBeenCalledWith('/doacoes', expect.objectContaining({ tipo_item: 'Cat', url_imagem: expect.stringContaining('https://') }));
    expect(r).toEqual({ ok: true });
  });

  it('editarDoacao formata dados e retorna resposta', async () => {
    api.put.mockResolvedValue({ data: { edited: true } });
    const r = await doacoesService.editarDoacao(9, { titulo: 'X', descricao: 'Y', categoria: 'Cat', urgencia: 'media', quantidade: '2', email: 'e', whatsapp: 'w', prazo: '2025-01-01', imageUrl: 'http://img' });
    expect(api.put).toHaveBeenCalledWith('/doacoes/9', expect.objectContaining({ urgencia: 'MEDIA' }));
    expect(r).toEqual({ edited: true });
  });

  it('alterarStatus chama patch e retorna data', async () => {
    api.patch.mockResolvedValue({ data: { status: 'FINALIZADA' } });
    const r = await doacoesService.alterarStatus(5, 'FINALIZADA');
    expect(api.patch).toHaveBeenCalledWith('/doacoes/5/status', { status: 'FINALIZADA' });
    expect(r).toEqual({ status: 'FINALIZADA' });
  });

  it('deletarDoacao chama delete', async () => {
    api.delete.mockResolvedValue({ data: { ok: true } });
    const r = await doacoesService.deletarDoacao(8);
    expect(api.delete).toHaveBeenCalledWith('/doacoes/8');
    expect(r).toEqual({ ok: true });
  });

  // ==== Casos adicionais para cobrir ramos de erro e endpoints não testados ====
  it('listarDoacoesPrestesVencer fallback retorna [] quando nenhum endpoint responde', async () => {
    api.get.mockRejectedValue({ response: { status: 404 } });
    const res = await doacoesService.listarDoacoesPrestesVencer();
    expect(res).toEqual([]);
    // Chamado duas vezes (dois caminhos) ou mais dependendo da implementação
    expect(api.get).toHaveBeenCalled();
  });

  it('listarMinhasDoacoes erro propaga mensagem padrão', async () => {
    api.get.mockRejectedValue({ response: { data: {} } });
    await expect(doacoesService.listarMinhasDoacoes()).rejects.toThrow('Erro ao carregar suas doações');
  });

  it('listarMinhasDoacoesFinalizadas sucesso', async () => {
    const spy = vi.spyOn(mapper, 'mapDoacoesFromBackend').mockReturnValue([{ id: 40 }]);
    api.get.mockResolvedValue({ data: [{ raw: true }] });
    const r = await doacoesService.listarMinhasDoacoesFinalizadas();
    expect(api.get).toHaveBeenCalledWith('/doacoes/minhas/finalizadas');
    expect(r).toEqual([{ id: 40 }]);
    expect(spy).toHaveBeenCalled();
  });

  it('listarMinhasDoacoesFinalizadas erro', async () => {
    api.get.mockRejectedValue({ response: { data: { message: 'X' } } });
    await expect(doacoesService.listarMinhasDoacoesFinalizadas()).rejects.toThrow('X');
  });

  it('obterDoacao erro', async () => {
    api.get.mockRejectedValue({ response: { data: {} } });
    await expect(doacoesService.obterDoacao(99)).rejects.toThrow('Erro ao carregar doação');
  });

  it('criarDoacao erro lança mensagem amigável', async () => {
    api.post.mockRejectedValue({ response: { data: { message: 'Falhou criar' } } });
    await expect(doacoesService.criarDoacao({ titulo: 'T' })).rejects.toThrow('Falhou criar');
  });

  it('editarDoacao erro', async () => {
    api.put.mockRejectedValue({ response: { data: {} } });
    await expect(doacoesService.editarDoacao(1, { titulo: 'Z' })).rejects.toThrow('Erro ao editar doação');
  });

  it('alterarStatus erro', async () => {
    api.patch.mockRejectedValue({ response: { data: {} } });
    await expect(doacoesService.alterarStatus(1, 'FINALIZADA')).rejects.toThrow('Erro ao alterar status');
  });

  it('deletarDoacao erro', async () => {
    api.delete.mockRejectedValue({ response: { data: {} } });
    await expect(doacoesService.deletarDoacao(2)).rejects.toThrow('Erro ao deletar doação');
  });
});
