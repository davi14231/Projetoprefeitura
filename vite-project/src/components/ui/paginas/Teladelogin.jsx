import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Botao } from "@/components/ui/botao";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import NetworkDiagnostic from "../../NetworkDiagnostic";

export function Teladelogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔑 Iniciando login...');
      console.log('📧 Email:', email);
      console.log('🔒 Senha:', senha ? '*'.repeat(senha.length) : 'vazia');
      
      await login({ email, password: senha });
      
      console.log('✅ Login bem-sucedido! Redirecionando...');
      // Login bem-sucedido, redirecionar para a página principal
      navigate('/home-ong');
    } catch (error) {
      console.error('❌ Erro capturado no componente:', error);
      setError(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleCriarConta = () => {
    alert("Redirecionar para cadastro de conta/workspace.");
    // Exemplo: window.location.href = "/cadastro";
  };

  return (
    <div className="bg-sky-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Recife */}
        <div className="text-center mb-8">
          <img 
            src="/imagens/logo_recife.png" 
            alt="Logo Recife" 
            className="mx-auto h-16 w-auto"
          />
        </div>
        
        <Card className="w-full">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Entrar como ONG</CardTitle>
            <CardDescription className="text-sm text-gray-600">Acesse sua conta e continue fazendo a diferença</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm text-gray-700">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox id="lembrar" />
                  <Label htmlFor="lembrar" className="text-gray-600">
                    Lembrar de mim
                  </Label>
                </div>
                <a href="#" className="text-blue-600 hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              
              {/* Exibir erro se houver */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <Botao 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Botao>
              
              {/* Divisor "ou" */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    ou
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">Não possui cadastro? </span>
                <button
                  type="button"
                  onClick={handleCriarConta}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Criar Conta
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}