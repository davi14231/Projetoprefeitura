## Produção: build estático + Nginx (multi-stage)

# Etapa 1: dependências e build
FROM node:20-alpine AS build
WORKDIR /app

COPY vite-project/package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY vite-project/ ./

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL \
    NODE_ENV=production

RUN npm run build

# Etapa 2: imagem final enxuta
FROM nginx:1.27-alpine AS runner
LABEL maintainer="Projeto Prefeitura" \
      description="Frontend Vite em produção"

RUN rm /etc/nginx/conf.d/default.conf && echo '\
server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  gzip on;\n\
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;\n\
  location / {\n\
    try_files $uri /index.html;\n\
  }\n\
  # Proxy opcional para backend:\n\
  # location /api/ {\n\
  #   proxy_pass http://localhost:3004/api/;\n\
  #   proxy_set_header Host $host;\n\
  # }\n\
}' > /etc/nginx/conf.d/app.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENV NODE_ENV=production

CMD ["nginx","-g","daemon off;"]
