# 🚀 TUTORIAL - Integração Frontend React com Backend PostgreSQL

## ⚙️ **CONFIGURAÇÕES INICIAIS NECESSÁRIAS**

### 1. **URL do Backend**
📍 **IMPORTANTE**: Configure a URL do seu backend no arquivo:
```javascript
// src/services/api.js (linha 4)
const API_BASE_URL = 'http://localhost:3001/api'; // ⚠️ ALTERE PARA SUA URL
```

### 2. **Dependências Instaladas**
✅ Axios (requisições HTTP)  
✅ js-cookie (gerenciamento de cookies)

### 3. **Estrutura Criada**
```
src/
├── services/
│   ├── api.js                 # ✅ Configuração do Axios
│   ├── authService.js         # ✅ Serviços de autenticação  
│   ├── doacoesService.js      # ✅ Serviços de doações
│   └── realocacoesService.js  # ✅ Serviços de realocações
├── context/
│   ├── AuthContext.jsx       # ✅ Context de autenticação
│   └── DataContext.jsx       # ✅ Modificado para usar API real
```

## 🔄 **MODO HÍBRIDO IMPLEMENTADO**

O sistema agora funciona em **modo híbrido**:
- **Dados Locais**: Usa o DataStore.js (funcionando agora)
- **Dados da API**: Quando `useLocalData = false` no DataContext

### **Como alternar entre local e API:**
```javascript
// No DataContext.jsx, linha 22:
const [useLocalData, setUseLocalData] = useState(true); // true = local, false = API
```

## 📋 **PRÓXIMOS PASSOS PARA INTEGRAÇÃO COMPLETA**

### **Passo 1: Testar Conexão com Backend**
1. Certifique-se que seu backend está rodando
2. Altere a URL em `src/services/api.js`
3. No DataContext, mude `useLocalData` para `false`

### **Passo 2: Campos que podem precisar de ajuste**

#### **🔍 Campos de Doação - Backend vs Frontend:**
```javascript
// Frontend atual (DataStore.js):
{
  id, titulo, categoria, ong, imageUrl, descricao, 
  publicado, validade, quantidade, email, whatsapp, 
  urgencia, prazo
}

// ⚠️ VERIFIQUE se seu backend usa estes mesmos nomes
// Caso use nomes diferentes, ajuste em:
// - src/services/doacoesService.js
// - src/context/DataContext.jsx
```

#### **🔍 Campos de Realocação - Backend vs Frontend:**
```javascript
// Frontend atual:
{
  id, titulo, categoria, ong, imageUrl, descricao,
  publicado, quantidade, validade, email, whatsapp, prazo
}
```

### **Passo 3: Autenticação**
O sistema de login está preparado para:
```javascript
// Endpoint esperado: POST /auth/login
// Resposta esperada:
{
  "token": "jwt_token_aqui",
  "user": { /* dados do usuário */ },
  // OU
  "ong": { /* dados da ONG */ }
}
```

## 🛠️ **FUNCIONALIDADES IMPLEMENTADAS**

### **✅ Autenticação**
- Login com token JWT
- Logout automático
- Proteção de rotas privadas
- Gerenciamento de cookies

### **✅ Doações**
- Listar doações públicas ✅
- Listar minhas doações ✅
- Criar doação ✅
- Editar doação ✅
- Alterar status ✅
- Deletar doação ✅

### **✅ Realocações**
- Listar realocações públicas ✅
- Listar minhas realocações ✅
- Criar realocação ✅
- Editar realocação ✅
- Alterar status ✅
- Deletar realocação ✅

## 🔧 **EXEMPLO DE USO**

### **Para usar a API real:**
```javascript
// 1. Configure a URL do backend
// 2. No DataContext.jsx, altere:
const [useLocalData, setUseLocalData] = useState(false);

// 3. O sistema automaticamente começará a usar a API
```

### **Para fazer login:**
```javascript
import { useAuth } from './context/AuthContext';

function LoginComponent() {
  const { login } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login({ email: 'test@test.com', password: '123456' });
      // Usuário logado com sucesso
    } catch (error) {
      console.error('Erro no login:', error.message);
    }
  };
}
```

## ⚠️ **POSSÍVEIS AJUSTES NECESSÁRIOS**

1. **Nomes dos campos**: Verifique se os nomes dos campos no backend coincidem
2. **Estrutura da resposta**: Ajuste os services se a resposta da API for diferente
3. **Paginação**: A API pode retornar dados paginados de forma diferente
4. **Upload de imagens**: Não implementado ainda (usando URLs estáticas)

## 🚀 **TESTANDO A INTEGRAÇÃO**

1. **Teste com dados locais primeiro** (useLocalData = true)
2. **Configure a URL do backend**
3. **Execute o backend**
4. **Mude para useLocalData = false**
5. **Teste as funcionalidades**

---

**STATUS ATUAL**: ✅ Integração base completa - Ready to test with real backend!

## 📝 **CHECKLIST FINAL**

- ✅ Axios instalado
- ✅ js-cookie instalado
- ✅ Services criados (api, auth, doações, realocações)
- ✅ AuthContext implementado
- ✅ DataContext modificado para modo híbrido
- ✅ App.jsx integrado com AuthProvider
- ✅ Zero erros de compilação
- ⚠️ **FALTA**: Configurar URL do backend
- ⚠️ **FALTA**: Testar com backend real
- ⚠️ **FALTA**: Ajustar campos se necessário
