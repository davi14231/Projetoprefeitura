# ⚡ CONFIGURAÇÃO RÁPIDA - Backend Integration

## 🎯 **3 PASSOS PARA ATIVAR A API**

### **1. Configure a URL do Backend** 
Abra: `src/services/api.js`
```javascript
// Linha 5: Altere esta URL
const API_BASE_URL = 'SUA_URL_AQUI/'; // Ex: 'https://meubackend.com/'
```

### **2. Ative o Modo API**
Abra: `src/context/DataContext.jsx`
```javascript
// Linha 24: Mude de true para false
const [useLocalData, setUseLocalData] = useState(false); // ← MUDAR AQUI
```

### **3. Teste a Autenticação**
1. Execute o projeto: `npm run dev`
2. Acesse: `http://localhost:5173/login`
3. Tente fazer login com credenciais do seu backend
4. Verifique o console do navegador para possíveis erros

---

## 🔧 **ESTRUTURA DO BACKEND ESPERADA**

### **Endpoints que o frontend irá chamar:**

#### **✅ Autenticação (IMPLEMENTADO):**
- `POST /auth/login` - Login do usuário/ONG
  ```json
  // Request body esperado:
  {
    "email": "ong@example.com",
    "password": "senha123"
  }
  
  // Response esperada:
  {
    "token": "jwt_token_aqui",
    "user": { "id": 1, "nome": "ONG Exemplo", "email": "ong@example.com" }
    // OU
    "ong": { "id": 1, "nome": "ONG Exemplo", "email": "ong@example.com" }
  }
  ```

#### **✅ Doações (IMPLEMENTADO):**
- `GET /doacoes` - Listar doações públicas
- `GET /doacoes/minha` - Minhas doações (autenticado)
- `GET /doacoes/:id` - Ver doação específica
- `POST /doacoes` - Criar doação (autenticado)
- `PUT /doacoes/:id` - Editar doação (autenticado)
- `PATCH /doacoes/:id/status` - Alterar status (autenticado)
- `DELETE /doacoes/:id` - Deletar doação (autenticado)

#### **✅ Realocações (IMPLEMENTADO):**
- `GET /realocacoes` - Listar realocações públicas
- `GET /realocacoes/minha` - Minhas realocações (autenticado)
- `GET /realocacoes/:id` - Ver realocação específica
- `POST /realocacoes` - Criar realocação (autenticado)
- `PUT /realocacoes/:id` - Editar realocação (autenticado)
- `PATCH /realocacoes/:id/status` - Alterar status (autenticado)
- `DELETE /realocacoes/:id` - Deletar realocação (autenticado)

---

## �️ **SISTEMA DE AUTENTICAÇÃO IMPLEMENTADO**

### **✅ Funcionalidades:**
- ✅ Login integrado com backend
- ✅ Token JWT automático nos headers
- ✅ Rotas protegidas (requerem login)
- ✅ Logout automático
- ✅ Redirecionamento para login se não autenticado
- ✅ Mensagens de erro personalizadas

### **🔐 Rotas Protegidas:**
- `/edit-doacoes` - Gerenciar doações
- `/home-realocacao` - Realocações da ONG
- `/solicitar-doacao` - Criar nova doação
- `/postagem-realocacao` - Criar realocação
- `/home-ong` - Dashboard da ONG

### **🌐 Rotas Públicas:**
- `/` - Página inicial
- `/login` - Tela de login
- `/todas-doacoes` - Ver todas as doações
- `/realocacao-listagem` - Ver todas as realocações

---

## �🚨 **POSSÍVEIS PROBLEMAS E SOLUÇÕES**

### **Erro de CORS:**
Certifique-se que seu backend permite requisições do frontend:
```javascript
// No backend, configure CORS para aceitar: http://localhost:5173
```

### **Login não funciona:**
1. Verifique se o endpoint `/auth/login` existe
2. Verifique se retorna `token` e `user`/`ong`
3. Abra o console (F12) para ver erros detalhados

### **Token não é enviado:**
Verifique se o login retorna um token JWT:
```javascript
// Resposta esperada do POST /auth/login:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "nome": "ONG Teste" }
}
```

### **Campos não coincidem:**
Se o backend usa nomes diferentes, ajuste nos services:
```javascript
// Exemplo: se backend usa 'title' em vez de 'titulo'
// Modifique em src/services/doacoesService.js
```

---

## 🧪 **TESTANDO O SISTEMA**

### **1. Teste Login:**
1. Acesse `/login`
2. Digite credenciais válidas do seu backend
3. Deve redirecionar para `/home-ong`

### **2. Teste Rotas Protegidas:**
1. Sem fazer login, tente acessar `/edit-doacoes`
2. Deve redirecionar automaticamente para `/login`

### **3. Teste Logout:**
1. Faça login
2. Clique no menu "Minha ONG" → "Sair"
3. Deve voltar para página inicial

---

**🎉 Pronto! Seu frontend agora está 100% integrado com autenticação backend PostgreSQL!**
