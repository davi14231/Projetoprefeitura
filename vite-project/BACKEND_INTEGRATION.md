# 🌟 Frontend Hub de Doações - Integração com Backend Real

Este frontend foi configurado para se conectar com o backend real do Hub de Doações.

## 🚀 Como executar

### 1. Frontend (este projeto)
```bash
cd vite-project
npm install
npm run dev
```
O frontend rodará em: http://localhost:5173

### 2. Backend (repositório separado)
```bash
# Clone o repositório do backend
git clone https://github.com/Pedrocavalcantip/projeto-prefeitura-backend.git

# Entre na pasta e instale as dependências
cd projeto-prefeitura-backend
npm install

# Configure as variáveis de ambiente (se necessário)
# Crie um arquivo .env baseado no .env.example

# Execute o backend
npm start
```
O backend rodará em: http://localhost:3000

## 🔗 Integração

- **Proxy configurado**: O Vite redireciona `/api/*` para `http://localhost:3000/*`
- **CORS habilitado**: O backend já está configurado para aceitar requisições do frontend
- **Monitor de conexão**: Um componente no canto inferior direito mostra o status da conexão

## 📋 Endpoints utilizados

### Doações
- `GET /doacoes` - Lista doações públicas
- `GET /doacoes/:id` - Detalhes de uma doação
- `GET /doacoes/minhas/ativas` - Doações da ONG logada
- `POST /doacoes` - Criar nova doação
- `PUT /doacoes/:id` - Atualizar doação
- `DELETE /doacoes/:id` - Deletar doação

### Realocações
- `GET /realocacoes/catalogo` - Lista realocações públicas
- `GET /realocacoes/catalogo/:id` - Detalhes de uma realocação
- `GET /realocacoes/minhas/ativas` - Realocações da ONG logada
- `POST /realocacoes` - Criar nova realocação

### Autenticação
- `POST /auth/login` - Login da ONG

## 🛠️ Estrutura de dados

O frontend foi configurado para mapear automaticamente os dados do backend:

**Backend** → **Frontend**
- `id_produto` → `id`
- `url_imagem` → `imageUrl`
- `tipo_item` → `categoria`
- `ong.nome` → `ong`
- `prazo_necessidade` → `validade`

## ⚠️ Troubleshooting

1. **Backend não conecta**: Verifique se o backend está rodando na porta 3000
2. **CORS errors**: O backend já está configurado, mas certifique-se que está usando a porta 5173 para o frontend
3. **Dados não aparecem**: Verifique o console do navegador e o monitor de conexão
4. **Erro 401**: Problema de autenticação - verifique se o token está válido

## 📝 Próximos passos

- [ ] Implementar autenticação completa
- [ ] Adicionar sistema de upload de imagens
- [ ] Implementar filtros avançados
- [ ] Adicionar sistema de notificações
- [ ] Testes automatizados
