import { describe, it, expect, vi, beforeEach } from 'vitest';
import { uploadService } from '@/services/uploadService';
import api from '@/services/api';

vi.mock('@/services/api');

function makeFile(name='a.png', size=1024, type='image/png') {
  const blob = new Blob(['x'.repeat(size)], { type });
  return new File([blob], name, { type });
}

describe('uploadService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('uploadImage retorna url do backend', async () => {
    api.post.mockResolvedValue({ data: { url: 'http://cloud/img.png' } });
    const file = makeFile();
    const url = await uploadService.uploadImage(file);
    expect(api.post).toHaveBeenCalledWith('/upload/image', expect.any(FormData), expect.any(Object));
    expect(url).toBe('http://cloud/img.png');
  });

  it('uploadImage fallback em erro', async () => {
    api.post.mockRejectedValue(new Error('fail'));
    const url = await uploadService.uploadImage(makeFile());
    expect(url).toBe('https://picsum.photos/400/300');
  });

  it('base64ToFile converte corretamente', () => {
    // base64 simples de 'Hi' em texto/plain
    const base64 = 'data:text/plain;base64,SGk=';
    const f = uploadService.base64ToFile(base64, 'hi.txt');
    expect(f.name).toBe('hi.txt');
    expect(f.type).toBe('text/plain');
  });
});
