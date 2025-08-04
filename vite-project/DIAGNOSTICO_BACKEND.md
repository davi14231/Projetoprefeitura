# 🔧 VERIFICAÇÃO DO BACKEND

## ❌ **PROBLEMA IDENTIFICADO:**
Os endpoints estão retornando **404 Not Found**, o que significa:

1. **Backend não está rodando** OU
2. **Rotas não estão configuradas corretamente**

## 🔍 **COMO VERIFICAR:**

### **1. Backend está rodando?**
```bash
# Vá para o diretório do backend e execute:
npm start
# OU
node server.js
# OU
npm run dev
```

### **2. Teste manual no navegador:**
Abra: `http://localhost:3000`
- ✅ Se aparecer algo (mesmo que erro) = Backend rodando
- ❌ Se não carregar = Backend não está rodando

### **3. Teste as rotas manualmente:**
Use um cliente REST como Postman ou Insomnia:

```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email_ong": "ong1@gmail.com",
  "password": "123456"
}
```

## 🛠️ **POSSÍVEIS SOLUÇÕES:**

### **Cenário 1: Backend não está rodando**
```bash
cd /caminho/para/seu/backend
npm install
npm start
```

### **Cenário 2: Rotas sem prefixo /api**
As rotas podem ser:
- `http://localhost:3000/auth/login` (sem /api)
- `http://localhost:3000/api/auth/login` (com /api)

### **Cenário 3: Backend em porta diferente**
Verifique se está rodando em:
- `http://localhost:8000`
- `http://localhost:5000`
- `http://localhost:3001`

### **Cenário 4: CORS não configurado**
Adicione no backend:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

## 📋 **CHECKLIST:**

- [ ] Backend está rodando na porta 3000?
- [ ] Rota `/auth/login` existe no backend?
- [ ] CORS está configurado?
- [ ] As rotas têm prefixo `/api` ou não?

## 🧪 **TESTE AGORA:**

1. **Execute o diagnóstico** na página de login
2. **Verifique qual URL funciona**
3. **Ajuste a configuração** no `api.js`

---

**💡 TIP:** Se o backend estiver rodando em uma URL diferente, você pode mudar no arquivo `src/services/api.js`
