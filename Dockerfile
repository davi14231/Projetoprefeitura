FROM node:20-alpine
WORKDIR /app

COPY vite-project/package*.json ./
RUN npm install

COPY vite-project/ ./

EXPOSE 8004

ENV HOST=0.0.0.0 \
    PORT=8004 \
    NODE_ENV=development

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8004"]
