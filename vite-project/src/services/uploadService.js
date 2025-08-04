import api from './api';

export const uploadService = {
  // Upload de imagem para o Cloudinary via backend
  async uploadImage(file) {
    try {
      console.log('📤 Fazendo upload da imagem:', file.name);
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ Upload concluído:', response.data);
      return response.data.url; // Retorna a URL da imagem no Cloudinary
    } catch (error) {
      console.error('❌ Erro no upload:', error);
      
      // Se o upload falhar, retornar uma URL de placeholder
      return 'https://picsum.photos/400/300';
    }
  },
  
  // Converter base64 para File object se necessário
  base64ToFile(base64, filename) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
};
