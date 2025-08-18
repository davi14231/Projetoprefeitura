FROM node:20-alpine AS build
WORKDIR /app

COPY vite-project/package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY vite-project/ ./

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL \
    NODE_ENV=production

RUN npm run build

FROM nginx:1.27-alpine AS runner
LABEL maintainer="Projeto Prefeitura" \
      description="Frontend Vite em produção"

# Criar configuração do Nginx corretamente
RUN rm /etc/nginx/conf.d/default.conf
COPY <<EOF /etc/nginx/conf.d/app.conf
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;
  
  gzip on;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;
  
  location / {
    try_files \$uri /index.html;
  }
  
  # Proxy para backend
  location /api/ {
    proxy_pass http://backend:3004/;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
EOF

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENV NODE_ENV=production

CMD ["nginx", "-g", "daemon off;"]
