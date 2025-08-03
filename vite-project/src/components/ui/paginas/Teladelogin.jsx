import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Botao } from "@/components/ui/botao";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useData } from "@/context/DataContext";

export function Teladelogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useData();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || "/edit-doacoes";
  const message = location.state?.message || "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        console.log("✅ Login bem-sucedido! Redirecionando para:", from);
        navigate(from);
      } else {
        setError(result.error || "Credenciais inválidas");
      }
    } catch (err) {
      console.error("❌ Erro no login:", err);
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  const handleCriarConta = () => {
    alert("Redirecionar para cadastro de conta/workspace.");
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
            {message && (
              <div className="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}
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
              <Botao type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5">
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