import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Configuração CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());

// Mock de usuários para teste
const mockUsers = [
  {
    id: 1,
    email: 'ong1@gmail.com',
    password: '123456',
    type: 'ong',
    name: 'ONG Exemplo'
  },
  {
    id: 2,
    email: 'admin@prefeitura.com',
    password: 'admin123',
    type: 'admin',
    name: 'Admin Prefeitura'
  }
];

// Rota de login
app.post('/auth/login', (req, res) => {
  console.log('📧 Tentativa de login:', req.body);
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email e senha são obrigatórios'
    });
  }
  
  // Buscar usuário
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Email ou senha inválidos'
    });
  }
  
  // Simular token JWT
  const token = `mock-jwt-token-${user.id}-${Date.now()}`;
  
  res.json({
    success: true,
    message: 'Login realizado com sucesso',
    token,
    user: {
      id: user.id,
      email: user.email,
      type: user.type,
      name: user.name
    }
  });
});

// Rota para verificar token
app.get('/auth/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !token.startsWith('mock-jwt-token')) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
  
  res.json({
    success: true,
    message: 'Token válido'
  });
});

// Rotas de exemplo para outras funcionalidades
app.get('/doacoes', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, titulo: 'Doação Exemplo 1', status: 'ativo' },
      { id: 2, titulo: 'Doação Exemplo 2', status: 'finalizado' }
    ]
  });
});

app.get('/realocacoes', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, titulo: 'Realocação Exemplo 1', status: 'ativo' }
    ]
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  console.log(`❌ Rota não encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Rota não encontrada: ${req.method} ${req.originalUrl}`
  });
});

app.listen(PORT, () => {
  console.log('🚀 Mock Backend rodando na porta', PORT);
  console.log('📧 Usuários de teste:');
  console.log('   - ong1@gmail.com / 123456');
  console.log('   - admin@prefeitura.com / admin123');
  console.log('🌐 CORS configurado para localhost:5173 e localhost:5174');
});
