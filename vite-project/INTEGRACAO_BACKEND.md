# 🔗 Integração Frontend-Backend

Este documento detalha como o frontend React se conecta com o backend Node.js/Express.

## 📋 Configurações Realizadas

### 1. API Base URL
- **Backend URL**: `http://localhost:3000`
- **Frontend URL**: `http://localhost:5174`
- **Arquivo**: `src/services/api.js`

### 2. Rotas da API

#### Autenticação
- **POST** `/auth/login` - Login da ONG
  - Body: `{ "email_ong": "email", "password": "senha" }`
  - Response: `{ "auth": true, "token": "jwt_token" }`

#### Doações
- **GET** `/doacoes` - Listar doações públicas
- **GET** `/doacoes/minhas/ativas` - Doações ativas da ONG logada
- **GET** `/doacoes/minhas/finalizadas` - Doações finalizadas da ONG logada
- **POST** `/doacoes` - Criar nova doação
- **PUT** `/doacoes/{id}` - Atualizar doação
- **PATCH** `/doacoes/{id}/status` - Atualizar status da doação
- **DELETE** `/doacoes/{id}` - Deletar doação

#### Realocações
- **GET** `/realocacoes/catalogo` - Listar realocações públicas
- **GET** `/realocacoes/catalogo/{id}` - Buscar realocação por ID
- **GET** `/realocacoes/minhas/ativas` - Realocações ativas da ONG logada
- **GET** `/realocacoes/minhas/finalizadas` - Realocações finalizadas da ONG logada
- **POST** `/realocacoes` - Criar nova realocação
- **PUT** `/realocacoes/{id}` - Atualizar realocação
- **PATCH** `/realocacoes/{id}/status` - Atualizar status da realocação
- **DELETE** `/realocacoes/{id}` - Deletar realocação

### 3. Estrutura de Dados

#### Campos obrigatórios para doações/realocações:
```json
{
  "titulo": "string",
  "descricao": "string", 
  "tipo_item": "string", // Categoria válida
  "urgencia": "string", // BAIXA, MEDIA, ALTA
  "quantidade": "number",
  "email": "string",
  "whatsapp": "string", // Só números
  "prazo_necessidade": "date", // yyyy-mm-dd
  "foto": "file", // Upload de arquivo
  "url_imagem": "string" // URL alternativa à foto
}
```

#### Categorias válidas para `tipo_item`:
- "Eletrodomésticos e Móveis"
- "Utensílios Gerais"  
- "Roupas e Calçados"
- "Saúde e Higiene"
- "Materiais Educativos e Culturais"
- "Itens de Inclusão e Mobilidade"
- "Eletrônicos"
- "Itens Pet"
- "Outros"

### 4. Autenticação JWT

O backend usa tokens JWT para autenticação:
- Header: `Authorization: Bearer <token>`
- Todas as rotas protegidas precisam do token
- Token é salvo nos cookies do frontend

### 5. Upload de Imagens

O backend aceita duas formas de imagem:
1. **Upload de arquivo**: Campo `foto` no form multipart
2. **URL externa**: Campo `url_imagem` no JSON

### 6. CORS

O backend está configurado para aceitar requests de:
- `http://localhost:5173` (porta padrão do Vite)
- ⚠️ **Atenção**: Frontend está rodando na porta **5174**

## 🔧 Diagnóstico de Rede

Use o componente `NetworkDiagnostic` na tela de login para testar a conectividade:
- Testa se o backend está respondendo
- Testa endpoints de login
- Verifica problemas de CORS

## 🚀 Como Iniciar

### Backend:
1. Clone: `git clone https://github.com/Pedrocavalcantip/projeto-prefeitura-backend.git`
2. Instale: `npm install`
3. Configure `.env` com as variáveis necessárias
4. Execute: `npm start` (porta 3000)

### Frontend:
1. Execute: `npm run dev` (porta 5174)
2. Acesse: `http://localhost:5174`
3. Use o diagnóstico na tela de login para testar conectividade

## ⚠️ Problemas Conhecidos

1. **CORS**: Backend configurado para porta 5173, mas frontend roda na 5174
2. **Autenticação**: Backend valida credenciais na API externa da prefeitura
3. **Upload**: Verificar se middleware de upload está funcionando corretamente

## 📚 Documentação Completa

Para detalhes completos da API, consulte:
- Notion: https://www.notion.so/1c2185f940bc8060a4abe65ce13c2545
- Repositório Backend: https://github.com/Pedrocavalcantip/projeto-prefeitura-backend
