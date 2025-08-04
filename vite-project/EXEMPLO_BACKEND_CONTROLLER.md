# 🔧 EXEMPLO DE CONTROLLER PARA SEU BACKEND

Baseado no seu arquivo `auth.service.js`, você precisa criar um **controller** e uma **rota** para receber as requisições do frontend.

## 📂 **Arquivo: `controllers/authController.js`**

```javascript
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service.js');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Tentativa de login:', { email });
    
    // 1. Autenticar na API da prefeitura
    const apiResponse = await authService.loginNaApiPrefeitura(email, password);
    console.log('✅ Autenticado na API da prefeitura');
    
    // 2. Sincronizar dados da ONG no banco local
    const ong = await authService.sincronizarOng(apiResponse.ong, apiResponse.user);
    console.log('✅ ONG sincronizada no banco local');
    
    // 3. Gerar token JWT próprio (opcional)
    const token = jwt.sign(
      { 
        id_ong: ong.id_ong,
        email_ong: ong.email_ong,
        nome: ong.nome 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // 4. Responder para o frontend
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token: token, // Token JWT próprio
      // OU use o token da API da prefeitura:
      // token: apiResponse.access_token,
      user: {
        id: ong.id_ong,
        nome: ong.nome,
        email: ong.email_ong,
        logo_url: ong.logo_url
      },
      // Dados originais da API (opcional)
      apiData: apiResponse
    });
    
  } catch (error) {
    console.error('❌ Erro no login:', error);
    
    // Retornar erro específico
    if (error.message === 'Credenciais inválidas') {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Erro interno do servidor'
    });
  }
};
```

## 📂 **Arquivo: `routes/auth.js`**

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
```

## 📂 **Arquivo: `app.js` ou `server.js`**

```javascript
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// CORS para permitir frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL do seu frontend
  credentials: true
}));

app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('🚀 Backend rodando na porta 3000');
});
```

## 🧪 **Como testar:**

1. **Crie os arquivos acima no seu backend**
2. **Instale dependências:**
   ```bash
   npm install jsonwebtoken cors
   ```
3. **Execute o backend:**
   ```bash
   npm start
   ```
4. **Teste no frontend com as credenciais:**
   - Email: `ong1@gmail.com`
   - Senha: `123456`

---

**💡 O fluxo completo será:**
Frontend → Seu Backend → API da Prefeitura → Banco Local → Frontend
