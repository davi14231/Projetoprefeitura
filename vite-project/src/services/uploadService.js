import api from './api';

export const uploadService = {
  // Upload de imagem para o Cloudinary via backend
  async uploadImage(file) {
    try {
      console.log('📤 Fazendo upload da imagem:', file.name);
      console.log('📊 Tamanho do arquivo:', (file.size / 1024 / 1024).toFixed(2) + 'MB');
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ Upload concluído:', response.data);
      console.log('🔗 URL retornada:', response.data.url);
      return response.data.url; // Retorna a URL da imagem no Cloudinary
    } catch (error) {
      console.error('❌ Erro no upload:', error);
      console.error('📍 Detalhes do erro:', error.response?.data);
      
      // Se o upload falhar, retornar uma URL de placeholder
      const fallbackUrl = 'https://picsum.photos/400/300';
      console.log('🔄 Usando URL de fallback:', fallbackUrl);
      return fallbackUrl;
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
