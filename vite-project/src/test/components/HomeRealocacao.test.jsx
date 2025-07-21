import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

// Teste simples dos componentes de input
describe("Input Components", () => {
  it("renderiza um input simples", () => {
    render(<Input placeholder="Digite aqui" />);
    const input = screen.getByPlaceholderText("Digite aqui");
    expect(input).toBeInTheDocument();
  });
  
  it("renderiza um label", () => {
    render(<Label>Nome do Campo</Label>);
    expect(screen.getByText("Nome do Campo")).toBeInTheDocument();
  });
  
  it("renderiza input com label", () => {
    render(
      <div>
        <Label htmlFor="test-input">Campo de Teste</Label>
        <Input id="test-input" placeholder="Valor de teste" />
      </div>
    );
    expect(screen.getByText("Campo de Teste")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Valor de teste")).toBeInTheDocument();
  });
});