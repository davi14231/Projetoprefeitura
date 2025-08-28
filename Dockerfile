FROM node:20-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY vite-project/package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY vite-project/ ./

# Build da aplicação para produção
RUN npm run build

# Instalar serve globalmente
RUN npm install -g serve

# Expor porta
EXPOSE 8004

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production

# Comando para servir a aplicação buildada
CMD ["serve", "-s", "dist", "-l", "8004"]
