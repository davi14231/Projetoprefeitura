import React, { useState } from 'react';
import { Botao } from "@/components/ui/botao";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function TelaLoginHub() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login enviado!\nE-mail: ${email}\nSenha: ${senha}`);
  };

  const handleCriarConta = () => {
    alert("Redirecionar para cadastro de conta/workspace.");
    // Exemplo: window.location.href = "/cadastro";
  };

  return (
    <div className="bg-sky-100 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <img src="/logo-hub-doacoes.png" alt="Logo do Hub de Doações" className="w-28 h-auto mb-4" />
          <CardTitle className="text-2xl font-bold">Entrar como ONG</CardTitle>
          <CardDescription>Acesse sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="lembrar" />
                <Label htmlFor="lembrar" className="text-sm font-medium leading-none">
                  Lembrar de mim
                </Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Esqueceu a senha?
              </a>
            </div>
            <Botao type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Entrar
            </Botao>
            {/* Divisor "ou" */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  ou
                </span>
              </div>
            </div>
            <Botao variant="outline" type="button" className="w-full" onClick={handleCriarConta}>
              Criar Conta
            </Botao>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            © 2025 Hub de Doações. Todos os direitos reservados.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}